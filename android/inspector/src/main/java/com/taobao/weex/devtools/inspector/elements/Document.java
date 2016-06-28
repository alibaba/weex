/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.inspector.elements;

import android.os.SystemClock;

import com.taobao.weex.devtools.common.Accumulator;
import com.taobao.weex.devtools.common.ArrayListAccumulator;
import com.taobao.weex.devtools.common.LogUtil;
import com.taobao.weex.devtools.inspector.helper.ObjectIdMapper;
import com.taobao.weex.devtools.inspector.helper.ThreadBoundProxy;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Queue;
import java.util.regex.Pattern;

import javax.annotation.Nullable;
import javax.annotation.concurrent.GuardedBy;

public final class Document extends ThreadBoundProxy {
  private final DocumentProviderFactory mFactory;
  private final ObjectIdMapper mObjectIdMapper;
  private final Queue<Object> mCachedUpdateQueue;

  private DocumentProvider mDocumentProvider;
  private ShadowDocument mShadowDocument;
  private UpdateListenerCollection mUpdateListeners;
  private ChildEventingList mCachedChildEventingList;
  private ArrayListAccumulator<Object> mCachedChildrenAccumulator;
  private AttributeListAccumulator mCachedAttributeAccumulator;

  @GuardedBy("this")
  private int mReferenceCounter;

  public Document(DocumentProviderFactory factory) {
    super(factory);

    mFactory = factory;
    mObjectIdMapper = new DocumentObjectIdMapper();
    mReferenceCounter = 0;
    mUpdateListeners = new UpdateListenerCollection();
    mCachedUpdateQueue = new ArrayDeque<>();
  }

  public synchronized void addRef() {
    if (mReferenceCounter++ == 0) {
      init();
    }
  }

  public synchronized void release() {
    if (mReferenceCounter > 0) {
      if (--mReferenceCounter == 0) {
        cleanUp();
      }
    }
  }

  private void init() {
    mDocumentProvider = mFactory.create();

    mDocumentProvider.postAndWait(new Runnable() {
      @Override
      public void run() {
        mShadowDocument = new ShadowDocument(mDocumentProvider.getRootElement());
        createShadowDocumentUpdate().commit();
        mDocumentProvider.setListener(new ProviderListener());
      }
    });

  }

  private void cleanUp() {
    mDocumentProvider.postAndWait(new Runnable() {
      @Override
      public void run() {
        mDocumentProvider.setListener(null);
        mShadowDocument = null;
        mObjectIdMapper.clear();
        mDocumentProvider.dispose();
        mDocumentProvider = null;
      }
    });

    mUpdateListeners.clear();
  }

  public void addUpdateListener(UpdateListener updateListener) {
    mUpdateListeners.add(updateListener);
  }

  public void removeUpdateListener(UpdateListener updateListener) {
    mUpdateListeners.remove(updateListener);
  }

  public @Nullable NodeDescriptor getNodeDescriptor(Object element) {
    verifyThreadAccess();
    return mDocumentProvider.getNodeDescriptor(element);
  }

  public void highlightElement(Object element, int color) {
    verifyThreadAccess();
    mDocumentProvider.highlightElement(element, color);
  }

  public void hideHighlight() {
    verifyThreadAccess();
    mDocumentProvider.hideHighlight();
  }

  public void setInspectModeEnabled(boolean enabled) {
    verifyThreadAccess();
    mDocumentProvider.setInspectModeEnabled(enabled);
  }

  public @Nullable Integer getNodeIdForElement(Object element) {
    // We don't actually call verifyThreadAccess() for performance.
    //verifyThreadAccess();
    return mObjectIdMapper.getIdForObject(element);
  }

  public @Nullable Object getElementForNodeId(int id) {
    // We don't actually call verifyThreadAccess() for performance.
    //verifyThreadAccess();
    return mObjectIdMapper.getObjectForId(id);
  }

  public void setAttributesAsText(Object element, String text) {
    verifyThreadAccess();
    mDocumentProvider.setAttributesAsText(element, text);
  }

  public void getElementStyles(Object element, StyleAccumulator styleAccumulator) {
    NodeDescriptor nodeDescriptor = getNodeDescriptor(element);

    nodeDescriptor.getStyles(element, styleAccumulator);
  }

  public DocumentView getDocumentView() {
    verifyThreadAccess();
    return mShadowDocument;
  }

  public Object getRootElement() {
    verifyThreadAccess();

    Object rootElement = mDocumentProvider.getRootElement();
    if (rootElement == null) {
      // null for rootElement is not allowed. We could support it, but our current
      // implementation won't ever run into this, so let's punt on it for now.
      throw new IllegalStateException();
    }

    if (rootElement != mShadowDocument.getRootElement()) {
      // We don't support changing the root element. This is handled differently by the
      // protocol than updates to an existing DOM, and we don't have any case in our
      // current implementation that causes this to happen, so let's punt on it for now.
      throw new IllegalStateException();
    }

    return rootElement;
  }

  public void findMatchingElements(String query, Accumulator<Integer> matchedIds) {
    verifyThreadAccess();

    final Pattern queryPattern = Pattern.compile(Pattern.quote(query), Pattern.CASE_INSENSITIVE);
    final Object rootElement = mDocumentProvider.getRootElement();

    findMatches(rootElement, queryPattern, matchedIds);
  }

  private void findMatches(Object element, Pattern queryPattern, Accumulator<Integer> matchedIds) {
    final ElementInfo info = mShadowDocument.getElementInfo(element);

    for (int i = 0, size = info.children.size(); i < size; i++) {
      final Object childElement = info.children.get(i);

      if (doesElementMatch(childElement, queryPattern)) {
        matchedIds.store(mObjectIdMapper.getIdForObject(childElement));
      }

      findMatches(childElement, queryPattern, matchedIds);
    }
  }

  private boolean doesElementMatch(Object element, Pattern queryPattern) {
    AttributeListAccumulator accumulator = acquireCachedAttributeAccumulator();
    NodeDescriptor descriptor = mDocumentProvider.getNodeDescriptor(element);

    descriptor.getAttributes(element, accumulator);

    for (int i = 0, N = accumulator.size(); i < N; i++) {
      if (queryPattern.matcher(accumulator.get(i)).find()) {
        releaseCachedAttributeAccumulator(accumulator);
        return true;
      }
    }

    releaseCachedAttributeAccumulator(accumulator);
    return queryPattern.matcher(descriptor.getNodeName(element)).find();
  }

  private ChildEventingList acquireChildEventingList(
      Object parentElement,
      DocumentView documentView) {
    ChildEventingList childEventingList = mCachedChildEventingList;

    if (childEventingList == null) {
      childEventingList = new ChildEventingList();
    }

    mCachedChildEventingList = null;

    childEventingList.acquire(parentElement, documentView);
    return childEventingList;
  }

  private void releaseChildEventingList(ChildEventingList childEventingList) {
    childEventingList.release();
    if (mCachedChildEventingList == null) {
      mCachedChildEventingList = childEventingList;
    }
  }

  private AttributeListAccumulator acquireCachedAttributeAccumulator() {
    AttributeListAccumulator accumulator = mCachedAttributeAccumulator;

    if (accumulator == null) {
      accumulator = new AttributeListAccumulator();
    }

    mCachedChildrenAccumulator = null;

    return accumulator;
  }

  private void releaseCachedAttributeAccumulator(AttributeListAccumulator accumulator) {
    accumulator.clear();

    if (mCachedAttributeAccumulator == null) {
      mCachedAttributeAccumulator = accumulator;
    }
  }

  private ArrayListAccumulator<Object> acquireChildrenAccumulator() {
    ArrayListAccumulator<Object> accumulator = mCachedChildrenAccumulator;
    if (accumulator == null) {
      accumulator = new ArrayListAccumulator<>();
    }
    mCachedChildrenAccumulator = null;
    return accumulator;
  }

  private void releaseChildrenAccumulator(ArrayListAccumulator<Object> accumulator) {
    accumulator.clear();
    if (mCachedChildrenAccumulator == null) {
      mCachedChildrenAccumulator = accumulator;
    }
  }

  private ShadowDocument.Update createShadowDocumentUpdate() {
    verifyThreadAccess();

    if (mDocumentProvider.getRootElement() != mShadowDocument.getRootElement()) {
      throw new IllegalStateException();
    }

    ArrayListAccumulator<Object> childrenAccumulator = acquireChildrenAccumulator();

    ShadowDocument.UpdateBuilder updateBuilder = mShadowDocument.beginUpdate();
    mCachedUpdateQueue.add(mDocumentProvider.getRootElement());

    while (!mCachedUpdateQueue.isEmpty()) {
      final Object element = mCachedUpdateQueue.remove();
      NodeDescriptor descriptor = mDocumentProvider.getNodeDescriptor(element);
      mObjectIdMapper.putObject(element);
      descriptor.getChildren(element, childrenAccumulator);

      for (int i = 0, size = childrenAccumulator.size(); i < size; ++i) {
        Object child = childrenAccumulator.get(i);
        if (child != null) {
          mCachedUpdateQueue.add(child);
        } else {
          // This could be indicative of a bug in WeexInspector code, but could also be caused by a
          // custom element of some kind, e.g. ViewGroup. Let's not allow it to kill the hosting
          // app.
          LogUtil.e(
              "%s.getChildren() emitted a null child at position %s for element %s",
              descriptor.getClass().getName(),
              Integer.toString(i),
              element);

          childrenAccumulator.remove(i);
          --i;
          --size;
        }
      }

      updateBuilder.setElementChildren(element, childrenAccumulator);
      childrenAccumulator.clear();
    }

    releaseChildrenAccumulator(childrenAccumulator);

    return updateBuilder.build();
  }

  private void updateTree() {
    long startTimeMs = SystemClock.elapsedRealtime();

    ShadowDocument.Update docUpdate = createShadowDocumentUpdate();
    boolean isEmpty = docUpdate.isEmpty();
    if (isEmpty) {
      docUpdate.abandon();
    } else {
      applyDocumentUpdate(docUpdate);
    }

    long deltaMs = SystemClock.elapsedRealtime() - startTimeMs;
    LogUtil.d(
        "Document.updateTree() completed in %s ms%s",
        Long.toString(deltaMs),
        isEmpty ? " (no changes)" : "");
  }
  
  private void applyDocumentUpdate(final ShadowDocument.Update docUpdate) {
    // TODO: it'd be nice if we could delegate our calls into mPeerManager.sendNotificationToPeers()
    //       to a background thread so as to offload the UI from JSON serialization stuff

    // First, any elements that have been disconnected from the tree, and any elements in those
    // sub-trees which have not been reconnected to the tree, should be garbage collected.
    // We do this first so that we can tag nodes as garbage by removing them from mObjectIdMapper
    // (which also unhooks them). We rely on this marking later.
    docUpdate.getGarbageElements(new Accumulator<Object>() {
      @Override
      public void store(Object element) {
        if (!mObjectIdMapper.containsObject(element)) {
          throw new IllegalStateException();
        }

        ElementInfo newElementInfo = docUpdate.getElementInfo(element);

        // Only raise onChildNodeRemoved for the root of a disconnected tree. The remainder of the
        // sub-tree is included automatically, so we don't need to send events for those.
        if (newElementInfo.parentElement == null) {
          ElementInfo oldElementInfo = mShadowDocument.getElementInfo(element);
          int parentNodeId = mObjectIdMapper.getIdForObject(oldElementInfo.parentElement);
          int nodeId = mObjectIdMapper.getIdForObject(element);
          mUpdateListeners.onChildNodeRemoved(parentNodeId, nodeId);
        }

        // All garbage elements should be unhooked.
        mObjectIdMapper.removeObject(element);
      }
    });

    // Second, remove all elements that have been reparented. Otherwise we get into trouble if we
    // transmit an event to insert under the new parent before we've transmitted an event to remove
    // it from the old parent. The removal event is ignored because the parent doesn't match the
    // listener's expectations, so we get ghost elements that are stuck and can't be exorcised.
    docUpdate.getChangedElements(new Accumulator<Object>() {
      @Override
      public void store(Object element) {
        // If this returns false then it means the element was garbage and has already been removed
        if (!mObjectIdMapper.containsObject(element)) {
          return;
        }

        final ElementInfo oldElementInfo = mShadowDocument.getElementInfo(element);
        if (oldElementInfo == null) {
          return;
        }

        final ElementInfo newElementInfo = docUpdate.getElementInfo(element);

        if (newElementInfo.parentElement != oldElementInfo.parentElement) {
          int parentNodeId = mObjectIdMapper.getIdForObject(oldElementInfo.parentElement);
          int nodeId = mObjectIdMapper.getIdForObject(element);
          mUpdateListeners.onChildNodeRemoved(parentNodeId, nodeId);
        }
      }
    });

    // Third, transmit all other changes to our listener. This includes inserting reparented
    // elements that we removed in the 2nd stage.
    docUpdate.getChangedElements(new Accumulator<Object>() {
      private final HashSet<Object> listenerInsertedElements = new HashSet<>();

      private Accumulator<Object> insertedElements = new Accumulator<Object>() {
        @Override
        public void store(Object element) {
          if (docUpdate.isElementChanged(element)) {
            // We only need to track changed elements because unchanged elements will never be
            // encountered by the code below, in store(), which uses this Set to skip elements that
            // don't need to be processed.
            listenerInsertedElements.add(element);
          }
        }
      };

      @Override
      public void store(Object element) {
        // If this returns false then it means the element was garbage and has already been removed
        if (!mObjectIdMapper.containsObject(element)) {
          return;
        }

        if (listenerInsertedElements.contains(element)) {
          // This element was already transmitted in its entirety by an onChildNodeInserted event.
          // Trying to send any further updates about it is both unnecessary and incorrect (we'd
          // end up with duplicated elements and really bad performance).
          return;
        }

        final ElementInfo oldElementInfo = mShadowDocument.getElementInfo(element);
        final ElementInfo newElementInfo = docUpdate.getElementInfo(element);

        final List<Object> oldChildren = (oldElementInfo != null)
            ? oldElementInfo.children
            : Collections.emptyList();

        final List<Object> newChildren = newElementInfo.children;

        // This list is representative of our listener's view of the Document (ultimately, this
        // means Chrome DevTools). We need to sync it up with newChildren.
        ChildEventingList listenerChildren = acquireChildEventingList(element, docUpdate);
        for (int i = 0, N = oldChildren.size(); i < N; ++i) {
          final Object childElement = oldChildren.get(i);
          if (mObjectIdMapper.containsObject(childElement)) {
            final ElementInfo newChildElementInfo = docUpdate.getElementInfo(childElement);
            if (newChildElementInfo != null &&
                newChildElementInfo.parentElement != element) {
              // This element was reparented, so we already told our listener to remove it.
            } else {
              listenerChildren.add(childElement);
            }
          }
        }

        updateListenerChildren(listenerChildren, newChildren, insertedElements);
        releaseChildEventingList(listenerChildren);
      }
    });

    docUpdate.commit();
  }

  private static void updateListenerChildren(
      ChildEventingList listenerChildren,
      List<Object> newChildren,
      Accumulator<Object> insertedElements) {
    int index = 0;
    while (index <= listenerChildren.size()) {
      // Insert new items that were added to the end of the list
      if (index == listenerChildren.size()) {
        if (index == newChildren.size()) {
          break;
        }

        final Object newElement = newChildren.get(index);
        listenerChildren.addWithEvent(index, newElement, insertedElements);
        ++index;
        continue;
      }

      // Remove old items that were removed from the end of the list
      if (index == newChildren.size()) {
        listenerChildren.removeWithEvent(index);
        continue;
      }

      final Object listenerElement = listenerChildren.get(index);
      final Object newElement = newChildren.get(index);

      // This slot has exactly what we need to have here.
      if (listenerElement == newElement) {
        ++index;
        continue;
      }

      int newElementListenerIndex = listenerChildren.indexOf(newElement);
      if (newElementListenerIndex == -1) {
        listenerChildren.addWithEvent(index, newElement, insertedElements);
        ++index;
        continue;
      }

      // TODO: use longest common substring to decide whether to
      //       1) remove(newElementListenerIndex)-then-add(index), or
      //       2) remove(index) and let a subsequent loop iteration do add() (that is, when index
      //          catches up the current value of newElementListenerIndex)
      //       Neither one of these is the best strategy -- it depends on context.

      listenerChildren.removeWithEvent(newElementListenerIndex);
      listenerChildren.addWithEvent(index, newElement, insertedElements);

      ++index;
    }
  }

  /**
   * A private implementation of {@link List} that transmits our changes to our listener (and,
   * ultimately, to the DevTools client).
   */
  private final class ChildEventingList extends ArrayList<Object> {
    private Object mParentElement = null;
    private int mParentNodeId = -1;
    private DocumentView mDocumentView;

    public void acquire(Object parentElement, DocumentView documentView) {
      mParentElement = parentElement;

      mParentNodeId = (mParentElement == null)
          ? -1
          : mObjectIdMapper.getIdForObject(mParentElement);

      mDocumentView = documentView;
    }

    public void release() {
      clear();

      mParentElement = null;
      mParentNodeId = -1;
      mDocumentView = null;
    }

    public void addWithEvent(int index, Object element, Accumulator<Object> insertedElements) {
      Object previousElement = (index == 0) ? null : get(index - 1);

      int previousNodeId = (previousElement == null)
          ? -1
          : mObjectIdMapper.getIdForObject(previousElement);

      add(index, element);

      mUpdateListeners.onChildNodeInserted(
          mDocumentView,
          element,
          mParentNodeId,
          previousNodeId,
          insertedElements);
    }

    public void removeWithEvent(int index) {
      Object element = remove(index);
      int nodeId = mObjectIdMapper.getIdForObject(element);
      mUpdateListeners.onChildNodeRemoved(mParentNodeId, nodeId);
    }
  }

  private class UpdateListenerCollection implements UpdateListener {
    private final List<UpdateListener> mListeners;
    private volatile UpdateListener[] mListenersSnapshot;

    public UpdateListenerCollection() {
      mListeners = new ArrayList<>();
    }

    public synchronized void add(UpdateListener listener) {
      mListeners.add(listener);
      mListenersSnapshot = null;
    }

    public synchronized void remove(UpdateListener listener) {
      mListeners.remove(listener);
      mListenersSnapshot = null;
    }

    public synchronized void clear() {
      mListeners.clear();
      mListenersSnapshot = null;
    }

    private UpdateListener[] getListenersSnapshot() {
      while (true) {
        final UpdateListener[] listenersSnapshot = mListenersSnapshot;
        if (listenersSnapshot != null) {
          return listenersSnapshot;
        }
        synchronized (this) {
          if (mListenersSnapshot == null) {
            mListenersSnapshot = mListeners.toArray(new UpdateListener[mListeners.size()]);
            return mListenersSnapshot;
          }
        }
      }
    }

    @Override
    public void onAttributeModified(Object element, String name, String value) {
      for (UpdateListener listener : getListenersSnapshot()) {
        listener.onAttributeModified(element, name, value);
      }
    }

    @Override
    public void onAttributeRemoved(Object element, String name) {
      for (UpdateListener listener : getListenersSnapshot()) {
        listener.onAttributeRemoved(element, name);
      }
    }

    @Override
    public void onInspectRequested(Object element) {
      for (UpdateListener listener : getListenersSnapshot()) {
        listener.onInspectRequested(element);
      }
    }

    @Override
    public void onChildNodeRemoved(int parentNodeId, int nodeId) {
      for (UpdateListener listener : getListenersSnapshot()) {
        listener.onChildNodeRemoved(parentNodeId, nodeId);
      }
    }

    @Override
    public void onChildNodeInserted(
        DocumentView view,
        Object element,
        int parentNodeId,
        int previousNodeId,
        Accumulator<Object> insertedItems) {
      for (UpdateListener listener : getListenersSnapshot()) {
        listener.onChildNodeInserted(view, element, parentNodeId, previousNodeId, insertedItems);
      }
    }
  }

  public interface UpdateListener {
    void onAttributeModified(Object element, String name, String value);

    void onAttributeRemoved(Object element, String name);

    void onInspectRequested(Object element);

    void onChildNodeRemoved(
        int parentNodeId,
        int nodeId);

    void onChildNodeInserted(
        DocumentView view,
        Object element,
        int parentNodeId,
        int previousNodeId,
        Accumulator<Object> insertedItems);
  }

  private final class DocumentObjectIdMapper extends ObjectIdMapper {
    @Override
    protected void onMapped(Object object, int id) {
      verifyThreadAccess();

      NodeDescriptor descriptor = mDocumentProvider.getNodeDescriptor(object);
      descriptor.hook(object);
    }

    @Override
    protected void onUnmapped(Object object, int id) {
      verifyThreadAccess();

      NodeDescriptor descriptor = mDocumentProvider.getNodeDescriptor(object);
      descriptor.unhook(object);
    }
  }

  private final class ProviderListener implements DocumentProviderListener {
    @Override
    public void onPossiblyChanged() {
      updateTree();
    }

    @Override
    public void onAttributeModified(Object element, String name, String value) {
      verifyThreadAccess();
      mUpdateListeners.onAttributeModified(element, name, value);
    }

    @Override
    public void onAttributeRemoved(Object element, String name) {
      verifyThreadAccess();
      mUpdateListeners.onAttributeRemoved(element, name);
    }

    @Override
    public void onInspectRequested(Object element) {
      verifyThreadAccess();
      mUpdateListeners.onInspectRequested(element);
    }
  }

  public static final class AttributeListAccumulator
    extends ArrayList<String> implements AttributeAccumulator {

    @Override
    public void store(String name, String value) {
      add(name);
      add(value);
    }
  }
}
