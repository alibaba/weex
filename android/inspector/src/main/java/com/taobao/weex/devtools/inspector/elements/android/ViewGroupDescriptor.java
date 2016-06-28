/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.inspector.elements.android;

import android.view.View;
import android.view.ViewGroup;

import com.taobao.weex.devtools.common.Accumulator;
import com.taobao.weex.devtools.common.android.FragmentCompatUtil;
import com.taobao.weex.devtools.inspector.elements.AbstractChainedDescriptor;

import java.lang.ref.WeakReference;
import java.util.Collections;
import java.util.Map;
import java.util.WeakHashMap;

final class ViewGroupDescriptor extends AbstractChainedDescriptor<ViewGroup> {

  /**
   * This is a cache that maps from a View to the Fragment that contains it. If the View isn't
   * contained by a Fragment, then this maps the View to itself. For Views contained by Fragments,
   * we emit the Fragment instead, and then let the Fragment's descriptor emit the View as its sole
   * child. This allows us to see Fragments in the inspector as part of the UI tree.
   */
  private final Map<View, Object> mViewToElementMap =
      Collections.synchronizedMap(new WeakHashMap<View, Object>());

  public ViewGroupDescriptor() {
  }

  @Override
  protected void onGetChildren(ViewGroup element, Accumulator<Object> children) {
    for (int i = 0, N = element.getChildCount(); i < N; ++i) {
      final View childView = element.getChildAt(i);
      if (isChildVisible(childView)) {
        final Object childElement = getElementForView(element, childView);
        children.store(childElement);
      }
    }
  }

  private boolean isChildVisible(View child) {
    return !(child instanceof DocumentHiddenView);
  }

  private Object getElementForView(ViewGroup parentView, View childView) {
    Object value = mViewToElementMap.get(childView);
    if (value != null) {
      Object element = getElement(childView, value);

      // The parent of a View may have changed since we stashed it into the cache.
      // If that's the case then we can't use the cache's answer.
      if (element != null && childView.getParent() == parentView) {
        return element;
      }
      mViewToElementMap.remove(childView);
    }

    /**
     * Note that we do NOT emit DialogFragments. Those get emitted via ActivityDescriptor.
     * We do the check here so that we can also cache the cost of calling
     * {@link FragmentCompatUtil#isDialogFragment(Object)}.
     */

    Object fragment = FragmentCompatUtil.findFragmentForView(childView);
    if (fragment != null && !FragmentCompatUtil.isDialogFragment(fragment)) {
      mViewToElementMap.put(childView, new WeakReference<>(fragment));
      return fragment;
    } else {
      // No need to store a strong reference to the childView in the value. We'll just store this
      // object and when pull the value out of the map we'll check for this object and just use the
      // key instead.
      mViewToElementMap.put(childView, this);
      return childView;
    }
  }

  @SuppressWarnings("unchecked")
  private Object getElement(View childView, Object value) {
    if (value == this) {
      return childView;
    } else {
      return ((WeakReference<Object>) value).get();
    }
  }
}
