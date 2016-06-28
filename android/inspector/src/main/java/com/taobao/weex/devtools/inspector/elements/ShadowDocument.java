/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.inspector.elements;

import android.app.Activity;

import com.taobao.weex.devtools.common.Accumulator;
import com.taobao.weex.devtools.common.ListUtil;
import com.taobao.weex.devtools.common.Util;

import java.util.ArrayDeque;
import java.util.Collections;
import java.util.HashSet;
import java.util.IdentityHashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Queue;
import java.util.Set;

public final class ShadowDocument implements DocumentView {
  private final Object mRootElement;
  private final IdentityHashMap<Object, ElementInfo> mElementToInfoMap = new IdentityHashMap<>();
  private boolean mIsUpdating;

  public ShadowDocument(Object rootElement) {
    mRootElement = Util.throwIfNull(rootElement);
  }

  @Override
  public Object getRootElement() {
    return mRootElement;
  }

  @Override
  public ElementInfo getElementInfo(Object element) {
    return mElementToInfoMap.get(element);
  }

  public UpdateBuilder beginUpdate() {
    if (mIsUpdating) {
      throw new IllegalStateException();
    }

    mIsUpdating = true;

    return new UpdateBuilder();
  }

  public final class UpdateBuilder {
    /**
     * We use a {@link LinkedHashMap} to preserve ordering between
     * {@link UpdateBuilder#setElementChildren(Object, List)} and
     * {@link Update#getChangedElements(Accumulator)}. This isn't needed for correctness but it
     * significantly improves performance.<p/>
     *
     * Transmitting DOM updates to Chrome works best if we can do it in top-down order because it
     * allows us to skip processing (and, more importantly, transmission) of an element that was
     * already transmitted in a previous DOM.childNodeInserted event (i.o.w. we can skip
     * transmission of E2 if it was already bundled up in E1's event, where E2 is any element in
     * E1's sub-tree). DOM.childNodeInserted transmits the node being inserted by-value, so it takes
     * time and space proportional to the size of that node's sub-tree. This means the difference
     * between O(n^2) and O(n) time for transmitting updates to Chrome.<p/>
     *
     * We currently only have one implementation of {@link DocumentProvider},
     * {@link com.taobao.weex.devtools.inspector.elements.android.AndroidDocumentProvider}, and it
     * already supplies element changes in top-down order. Because of this, we can just use
     * {@link LinkedHashMap} instead of adding some kind of post-process sorting of the elements to
     * put them in that order. If we reach a point where we can't or shouldn't rely on elements
     * being forwarded to us in top-down order, then we should change this field to an
     * {@link IdentityHashMap} and sort them before relaying them via
     * {@link Update#getChangedElements(Accumulator)}.<p/>
     *
     * When a large sub-tree is added (e.g. starting a new {@link Activity}), the use of
     * {@link LinkedHashMap} instead of {@link IdentityHashMap} can mean the difference between an
     * update taking 500ms versus taking more than 30 seconds.<p/>
     *
     * Technically we actually want something like a LinkedIdentityHashMap because we do want
     * to key off of object identity instead of allowing for the possibility of value identity.
     * Given the difference in performance, however, the risk of potential protocol abuse seems
     * reasonable.<p/>
     */
    private final Map<Object, ElementInfo> mElementToInfoChangesMap = new LinkedHashMap<>();

    /**
     * This contains every element in {@link #mElementToInfoChangesMap} whose
     * {@link ElementInfo#parentElement} is null. {@link ShadowDocument} provides access to a tree, which
     * means it has a single root (only one element with a null parent). During an update, however,
     * the DOM can be conceptually thought of as being a forest. The true root is identified by
     * {@link #mRootElement}, and all other roots identify disconnected trees full of elements that
     * must be garbage collected.
     */
    private final HashSet<Object> mRootElementChanges = new HashSet<>();

    /**
     * This is used during {@link #setElementChildren}. We allocate 1 on-demand and reuse it.
     */
    private HashSet<Object> mCachedNotNewChildrenSet;

    public void setElementChildren(Object element, List<Object> children) {
      // If we receive redundant information, then nothing needs to be done.
      ElementInfo changesElementInfo = mElementToInfoChangesMap.get(element);
      if (changesElementInfo != null &&
          ListUtil.identityEquals(children, changesElementInfo.children)) {
        return;
      }

      ElementInfo oldElementInfo = mElementToInfoMap.get(element);
      if (changesElementInfo == null &&
          oldElementInfo != null &&
          ListUtil.identityEquals(children, oldElementInfo.children)) {
        return;
      }

      ElementInfo newElementInfo;
      if (changesElementInfo != null &&
          oldElementInfo != null &&
          oldElementInfo.parentElement == changesElementInfo.parentElement &&
          ListUtil.identityEquals(children, oldElementInfo.children)) {
        // setElementChildren() was already called for element with changes during this
        // transaction, but now we're being told that the children should match the old view.
        // So we should actually remove the change entry.
        newElementInfo = mElementToInfoMap.get(element);
        mElementToInfoChangesMap.remove(element);
      } else {
        Object parentElement = (changesElementInfo != null)
            ? changesElementInfo.parentElement
            : (oldElementInfo != null)
            ? oldElementInfo.parentElement
            : null;

        newElementInfo = new ElementInfo(element, parentElement, children);

        mElementToInfoChangesMap.put(element, newElementInfo);
      }

      // At this point, newElementInfo is either equal to oldElementInfo because we've reverted
      // back to the same data that's in the old view of the tree, or it's a brand new object with
      // brand new changes (it's different than both of oldElementInfo and changesElementInfo).

      // Next, set the parentElement to null for child elements that have been removed from
      // element's children. We must be careful not to set a parentElement to null if that child has
      // already been moved to be the child of a different element. e.g.,
      //     setElementChildren(E, { A, B, C})
      //     ...
      //     setElementChildren(F, { A })
      //     setElementChildren(E, { B, C })    (don't mark A's parent as null in this case)

      // notNewChildrenSet = (oldChildren + changesChildren) - newChildren
      HashSet<Object> notNewChildrenSet = acquireNotNewChildrenHashSet();

      if (oldElementInfo != null &&
          oldElementInfo.children != newElementInfo.children) {
        for (int i = 0, N = oldElementInfo.children.size(); i < N; ++i) {
          final Object childElement = oldElementInfo.children.get(i);
          notNewChildrenSet.add(childElement);
        }
      }

      if (changesElementInfo != null &&
          changesElementInfo.children != newElementInfo.children) {
        for (int i = 0, N = changesElementInfo.children.size(); i < N; ++i) {
          final Object childElement = changesElementInfo.children.get(i);
          notNewChildrenSet.add(childElement);
        }
      }

      for (int i = 0, N = newElementInfo.children.size(); i < N; ++i) {
        final Object childElement = newElementInfo.children.get(i);
        setElementParent(childElement, element);
        notNewChildrenSet.remove(childElement);
      }

      for (Object childElement : notNewChildrenSet) {
        final ElementInfo childChangesElementInfo = mElementToInfoChangesMap.get(childElement);
        if (childChangesElementInfo != null &&
            childChangesElementInfo.parentElement != element) {
          // do nothing. this childElement was moved to be the child of another element.
          continue;
        }

        final ElementInfo oldChangesElementInfo = mElementToInfoMap.get(childElement);
        if (oldChangesElementInfo != null &&
            oldChangesElementInfo.parentElement == element) {
          setElementParent(childElement, null);
        }
      }

      releaseNotNewChildrenHashSet(notNewChildrenSet);
    }

    private void setElementParent(Object element, Object parentElement) {
      ElementInfo changesElementInfo = mElementToInfoChangesMap.get(element);
      if (changesElementInfo != null &&
          parentElement == changesElementInfo.parentElement) {
        return;
      }

      ElementInfo oldElementInfo = mElementToInfoMap.get(element);
      if (changesElementInfo == null &&
          oldElementInfo != null &&
          parentElement == oldElementInfo.parentElement) {
        return;
      }

      if (changesElementInfo != null &&
          oldElementInfo != null &&
          parentElement == oldElementInfo.parentElement &&
          ListUtil.identityEquals(oldElementInfo.children, changesElementInfo.children)) {
        mElementToInfoChangesMap.remove(element);

        if (parentElement == null) {
          mRootElementChanges.remove(element);
        }

        return;
      }

      List<Object> children = (changesElementInfo != null)
          ? changesElementInfo.children
          : (oldElementInfo != null)
          ? oldElementInfo.children
          : Collections.emptyList();

      ElementInfo newElementInfo = new ElementInfo(element, parentElement, children);
      mElementToInfoChangesMap.put(element, newElementInfo);

      if (parentElement == null) {
        mRootElementChanges.add(element);
      } else {
        mRootElementChanges.remove(element);
      }
    }

    public Update build() {
      return new Update(mElementToInfoChangesMap, mRootElementChanges);
    }

    private HashSet<Object> acquireNotNewChildrenHashSet() {
      HashSet<Object> notNewChildrenHashSet = mCachedNotNewChildrenSet;
      if (notNewChildrenHashSet == null) {
        notNewChildrenHashSet = new HashSet<>();
      }
      mCachedNotNewChildrenSet = null;
      return notNewChildrenHashSet;
    }

    private void releaseNotNewChildrenHashSet(HashSet<Object> notNewChildrenHashSet) {
      notNewChildrenHashSet.clear();
      if (mCachedNotNewChildrenSet == null) {
        mCachedNotNewChildrenSet = notNewChildrenHashSet;
      }
    }
  }

  public final class Update implements DocumentView {
    private final Map<Object, ElementInfo> mElementToInfoChangesMap;
    private final Set<Object> mRootElementChangesSet;

    public Update(
        Map<Object, ElementInfo> elementToInfoChangesMap,
        Set<Object> rootElementChangesSet) {
      mElementToInfoChangesMap = elementToInfoChangesMap;
      mRootElementChangesSet = rootElementChangesSet;
    }

    public boolean isEmpty() {
      return mElementToInfoChangesMap.isEmpty();
    }

    public boolean isElementChanged(Object element) {
      return mElementToInfoChangesMap.containsKey(element);
    }

    public Object getRootElement() {
      return ShadowDocument.this.getRootElement();
    }

    public ElementInfo getElementInfo(Object element) {
      // Return ElementInfo for the new (albeit uncommitted and pre-garbage collected) view of the
      // Document. If element is garbage then you'll still get its info (feature, not a bug :)).
      ElementInfo elementInfo = mElementToInfoChangesMap.get(element);
      if (elementInfo != null) {
        return elementInfo;
      }
      return mElementToInfoMap.get(element);
    }

    public void getChangedElements(Accumulator<Object> accumulator) {
      for (Object element : mElementToInfoChangesMap.keySet()) {
        accumulator.store(element);
      }
    }

    public void getGarbageElements(Accumulator<Object> accumulator) {
      // This queue stores pairs of elements, [element, expectedParent]
      // When we dequeue, we look at element's parentElement in the new view to see if it matches
      // expectedParent. If it does, then it's garbage. For enqueueing roots, whose parents are
      // null, since we can't enqueue null we instead enqueue the element twice.
      Queue<Object> queue = new ArrayDeque<>();

      // Initialize the queue with all disconnected tree roots (parentElement == null) which
      // aren't the DOM root.
      for (Object element : mRootElementChangesSet) {
        ElementInfo newElementInfo = getElementInfo(element);
        if (element != mRootElement && newElementInfo.parentElement == null) {
          queue.add(element);
          queue.add(element);
        }
      }

      // BFS traversal from those elements in the old view of the tree and test each element
      // to see if it's still within a disconnected sub-tree. We can tell if it's garbage if its
      // parent element in the new view of the tree hasn't changed.
      while (!queue.isEmpty()) {
        final Object element = queue.remove();
        final Object expectedParent0 = queue.remove();
        final Object expectedParent = (element == expectedParent0) ? null : expectedParent0;
        final ElementInfo newElementInfo = getElementInfo(element);

        if (newElementInfo.parentElement == expectedParent) {
          accumulator.store(element);

          ElementInfo oldElementInfo = ShadowDocument.this.getElementInfo(element);
          if (oldElementInfo != null) {
            for (int i = 0, N = oldElementInfo.children.size(); i < N; ++i) {
              queue.add(oldElementInfo.children.get(i));
              queue.add(element);
            }
          }
        }
      }
    }

    public void abandon() {
      if (!mIsUpdating) {
        throw new IllegalStateException();
      }

      mIsUpdating = false;
    }

    public void commit() {
      if (!mIsUpdating) {
        throw new IllegalStateException();
      }

      // Apply the changes to the tree
      mElementToInfoMap.putAll(mElementToInfoChangesMap);

      // Remove garbage elements: those that have a null parent (other than mRootElement), and
      // their entire sub-trees.
      for (Object element : mRootElementChangesSet) {
        removeSubTree(mElementToInfoMap, element);
      }

      mIsUpdating = false;
    }

    private void removeSubTree(Map<Object, ElementInfo> elementToInfoMap, Object element) {
      final ElementInfo elementInfo = elementToInfoMap.get(element);
      elementToInfoMap.remove(element);
      for (int i = 0, N = elementInfo.children.size(); i < N; ++i) {
        removeSubTree(elementToInfoMap, elementInfo.children.get(i));
      }
    }
  }
}
