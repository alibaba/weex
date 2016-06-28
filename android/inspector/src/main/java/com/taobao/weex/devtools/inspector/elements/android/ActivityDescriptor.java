/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.inspector.elements.android;

import android.app.Activity;
import android.view.View;
import android.view.Window;

import com.taobao.weex.devtools.common.Accumulator;
import com.taobao.weex.devtools.common.StringUtil;
import com.taobao.weex.devtools.common.android.FragmentActivityAccessor;
import com.taobao.weex.devtools.common.android.FragmentCompat;
import com.taobao.weex.devtools.common.android.FragmentManagerAccessor;
import com.taobao.weex.devtools.inspector.elements.AbstractChainedDescriptor;
import com.taobao.weex.devtools.inspector.elements.Descriptor;

import java.util.List;

import javax.annotation.Nullable;

final class ActivityDescriptor
    extends AbstractChainedDescriptor<Activity> implements HighlightableDescriptor {
  @Override
  protected String onGetNodeName(Activity element) {
    String className = element.getClass().getName();
    return StringUtil.removePrefix(className, "android.app.");
  }

  @Override
  protected void onGetChildren(Activity element, Accumulator<Object> children) {
    getDialogFragments(FragmentCompat.getSupportLibInstance(), element, children);
    getDialogFragments(FragmentCompat.getFrameworkInstance(), element, children);

    Window window = element.getWindow();
    if (window != null) {
      children.store(window);
    }
  }

  @Override
  public View getViewForHighlighting(Object element) {
    final Descriptor.Host host = getHost();
    if (host instanceof AndroidDescriptorHost) {
      Activity activity = (Activity)element;
      Window window = activity.getWindow();
      return ((AndroidDescriptorHost) host).getHighlightingView(window);
    }

    return null;
  }

  private static void getDialogFragments(
      @Nullable FragmentCompat compat,
      Activity activity,
      Accumulator<Object> accumulator) {
    if (compat == null || !compat.getFragmentActivityClass().isInstance(activity)) {
      return;
    }

    FragmentActivityAccessor activityAccessor = compat.forFragmentActivity();
    Object fragmentManager = activityAccessor.getFragmentManager(activity);
    if (fragmentManager == null) {
      return;
    }

    FragmentManagerAccessor fragmentManagerAccessor = compat.forFragmentManager();
    List<Object> addedFragments = fragmentManagerAccessor.getAddedFragments(fragmentManager);
    if (addedFragments == null) {
      return;
    }

    for (int i = 0, N = addedFragments.size(); i < N; ++i) {
      final Object fragment = addedFragments.get(i);
      if (compat.getDialogFragmentClass().isInstance(fragment)) {
        accumulator.store(fragment);
      }
    }
  }
}
