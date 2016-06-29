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

import com.taobao.weex.devtools.common.Accumulator;
import com.taobao.weex.devtools.common.LogUtil;
import com.taobao.weex.devtools.common.android.FragmentAccessor;
import com.taobao.weex.devtools.common.android.FragmentCompat;
import com.taobao.weex.devtools.common.android.ResourcesUtil;
import com.taobao.weex.devtools.inspector.elements.AbstractChainedDescriptor;
import com.taobao.weex.devtools.inspector.elements.AttributeAccumulator;
import com.taobao.weex.devtools.inspector.elements.DescriptorMap;

import javax.annotation.Nullable;

final class FragmentDescriptor
    extends AbstractChainedDescriptor<Object> implements HighlightableDescriptor {
  private static final String ID_ATTRIBUTE_NAME = "id";
  private static final String TAG_ATTRIBUTE_NAME = "tag";

  private final FragmentAccessor mAccessor;

  public static DescriptorMap register(DescriptorMap map) {
    maybeRegister(map, FragmentCompat.getSupportLibInstance());
    maybeRegister(map, FragmentCompat.getFrameworkInstance());
    return map;
  }

  private static void maybeRegister(DescriptorMap map, @Nullable FragmentCompat compat) {
    if (compat != null) {
      Class<?> fragmentClass = compat.getFragmentClass();
      LogUtil.d("Adding support for %s", fragmentClass.getName());
      map.register(fragmentClass, new FragmentDescriptor(compat));
    }
  }

  private FragmentDescriptor(FragmentCompat compat) {
    mAccessor = compat.forFragment();
  }

  @Override
  protected void onGetAttributes(Object element, AttributeAccumulator attributes) {
    int id = mAccessor.getId(element);
    if (id != FragmentAccessor.NO_ID) {
      String value = ResourcesUtil.getIdStringQuietly(
          element,
          mAccessor.getResources(element),
          id);
      attributes.store(ID_ATTRIBUTE_NAME, value);
    }

    String tag = mAccessor.getTag(element);
    if (tag != null && tag.length() > 0) {
      attributes.store(TAG_ATTRIBUTE_NAME, tag);
    }
  }

  @Override
  protected void onGetChildren(Object element, Accumulator<Object> children) {
    View view = mAccessor.getView(element);
    if (view != null) {
      children.store(view);
    }
  }

  @Override
  public View getViewForHighlighting(Object element) {
    return mAccessor.getView(element);
  }
}
