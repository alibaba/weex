/**
 * Licensed to the Apache Software Foundation (ASF) under one or more contributor license
 * agreements.  See the NOTICE file distributed with this work for additional information regarding
 * copyright ownership.  The ASF licenses this file to you under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with the License.  You may obtain
 * a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied.  See the License for the specific language governing permissions and limitations
 * under the License.
 */
package com.taobao.weex.dom;

import android.text.TextUtils;

import com.taobao.weex.WXEnvironment;
import com.taobao.weex.dom.flex.CSSLayoutContext;
import com.taobao.weex.dom.flex.CSSNode;
import com.taobao.weex.ui.component.WXBasicComponentType;
import com.taobao.weex.utils.WXLogUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicBoolean;

/**
 * WXDomObject contains all the info about the given node, including style, attribute and event.
 * Unlike {@link com.taobao.weex.ui.component.WXComponent}, WXDomObject only contains info about
 * the dom, has nothing to do with rendering.
 * Actually, {@link com.taobao.weex.ui.component.WXComponent} hold references to
 * {@link android.view.View} and {@link WXDomObject}.
 */
public class WXDomObject extends CSSNode implements Cloneable {

  public static final String TAG = WXDomObject.class.getSimpleName();
  public static final String ROOT = "_root";
  public AtomicBoolean sDestroy = new AtomicBoolean();
  public String ref = ROOT;
  public String type = WXBasicComponentType.SCROLLER;
  public WXStyle style;
  public WXAttr attr;
  public WXEvent event;
  public List<WXDomObject> children;
  public WXDomObject parent;

  private ArrayList<String> fixedStyleRefs;

  private boolean mYoung = false;

  /**
   * Do pre staff before layout. Subclass may provide different implementation.
   */
  public void layoutBefore() {

  }

  /**
   * Tell whether this object need to be updated. This is usually called when
   * {@link CSSNode#calculateLayout(CSSLayoutContext)} finishes and new layout has been
   * calculated. This method is a simple wrapper method for {@link #hasNewLayout()} and
   * {@link #isDirty()}.
   * @return true for need update since last update.
   */
  public final boolean hasUpdate() {
    return hasNewLayout() || isDirty();
  }

  /**
   * Mark the current node is young and unconsumed.
   */
  void young() {
    mYoung = true;
  }

  /**
   * Mark the current node is old and consumed.
   */
  void old() {
    mYoung = false;
  }

  /**
   * Tell whether this node is consumed since last layout.
   * @return true for consumed, false for not.
   */
  boolean isYoung() {
    return mYoung;
  }

  /**
   * Mark the update has been seen. After this method call, following call for {@link
   * #hasUpdate()} will return false. This method is also a wrapper for {@link #markUpdateSeen()}
   */
  public final void markUpdateSeen() {
    if (hasNewLayout()) {
      markLayoutSeen();
    }
  }


  public boolean isSticky() {
    return style == null ? false : style.isSticky();
  }

  public boolean isFixed() {
    return style == null ? false : style.isFixed();
  }

  public Object getExtra() {
    return null;
  }

  public void remove(WXDomObject child) {
    if (child == null || children == null || sDestroy.get()) {
      return;
    }

    int index = children.indexOf(child);
    removeFromDom(child);
    if (index != -1) {
      super.removeChildAt(index);
    }
  }

  public void removeFromDom(WXDomObject child) {
    if (child == null || children == null || sDestroy.get()) {
      return;
    }

    int index = children.indexOf(child);
    if (index == -1) {
      if (WXEnvironment.isApkDebugable()) {
        WXLogUtils.e("[WXDomObject]" + "remove function error");
      }
      return;
    }
    children.remove(index).parent = null;
  }

  public int index(WXDomObject child) {
    if (child == null || children == null || sDestroy.get()) {
      return -1;
    }
    return children.indexOf(child);
  }

  /**
   * Add the given WXDomObject as this object's child at specified index.
   * @param child the child to be added
   * @param index the index of child to be added. If the index is -1, the child will be added
   *              as the last child of current dom object.
   */
  public void add(WXDomObject child, int index) {
    if (child == null || index < -1 || sDestroy.get()) {
      return;
    }
    if (children == null) {
      children = new ArrayList<>();
    }

    int count = children.size();
    index = index >= count ? -1 : index;
    if (index == -1) {
      children.add(child);
      super.addChildAt(child, super.getChildCount());
    } else {
      children.add(index, child);
      super.addChildAt(child, index);
    }
    child.parent = this;
  }

  public void add2Dom(WXDomObject child, int index) {
    if (child == null || index < -1 || sDestroy.get()) {
      return;
    }

    int count = super.getChildCount();
    index = index >= count ? -1 : index;
    if (index == -1) {
      super.addChildAt(child, super.getChildCount());
    } else {
      super.addChildAt(child, index);
    }
    child.parent = this;
  }

  public WXDomObject getChild(int index) {
    if (children == null || sDestroy.get()) {
      return null;
    }
    return children.get(index);
  }

  /**
   * Add the given event for current object.
   * @param e
   */
  public void addEvent(String e) {
    if (TextUtils.isEmpty(e)) {
      return;
    }
    if (event == null) {
      event = new WXEvent();
    }
    if (containsEvent(e)) {
      return;
    }
    event.add(e);
  }

  public boolean containsEvent(String e) {
    if (event == null) {
      return false;
    }
    return event.contains(e);
  }

  public void removeEvent(String e) {
    if (TextUtils.isEmpty(e)) {
      return;
    }
    if (event == null) {
      return;
    }
    event.remove(e);
  }

  public void updateAttr(Map<String, Object> attrs) {
    if (attrs == null || attrs.isEmpty()) {
      return;
    }
    if (attr == null) {
      attr = new WXAttr();
    }
    attr.putAll(attrs);
    super.dirty();
  }

  public void updateStyle(Map<String, Object> styles) {
    if (styles == null || styles.isEmpty()) {
      return;
    }
    if (style == null) {
      style = new WXStyle();
    }
    style.putAll(styles);
    super.dirty();
  }

  public int childCount() {
    return children == null ? 0 : children.size();
  }

  public void hide() {
    setVisible(false);
  }

  public void show() {
    setVisible(true);
  }

  public boolean isVisible() {
    return super.isShow();
  }

  /**
   * Clone the current object. This is not a deep copy, only shadow copy of some reference.
   * @return The result object of clone.
   */
  @Override
  public WXDomObject clone() {
    if (sDestroy.get()) {
      return null;
    }
    WXDomObject dom = null;
    try {
      dom = new WXDomObject();
      if (this.cssstyle != null) {
        dom.cssstyle.copy(this.cssstyle);
      }

      dom.ref = ref;
      dom.type = type;
      dom.style = style;//style == null ? null : style.clone();
      dom.attr = attr;//attr == null ? null : attr.clone();
      dom.event = event == null ? null : event.clone();
      if (this.csslayout != null) {
        dom.csslayout.copy(this.csslayout);
      }


    } catch (Exception e) {
      if (WXEnvironment.isApkDebugable()) {
        WXLogUtils.e("WXDomObject clone error: " + WXLogUtils.getStackTrace(e));
      }
    }

    return dom;
  }

  public void destroy() {
    sDestroy.set(true);
    if (style != null) {
      style.clear();
    }
    if (attr != null) {
      attr.clear();
    }
    if (event != null) {
      event.clear();
    }
    if (children != null) {
      int count = children.size();
      for (int i = 0; i < count; ++i) {
        children.get(i).destroy();
      }
      children.clear();
    }
  }

  public ArrayList<String> getFixedStyleRefs() {
    return fixedStyleRefs;
  }

  public void add2FixedDomList(String ref) {
    if (fixedStyleRefs == null) {
      fixedStyleRefs = new ArrayList<>();
    }
    fixedStyleRefs.add(ref);
  }
}
