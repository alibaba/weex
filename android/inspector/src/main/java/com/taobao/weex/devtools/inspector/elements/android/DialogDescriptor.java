/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.inspector.elements.android;

import android.app.Dialog;
import android.view.View;
import android.view.Window;

import com.taobao.weex.devtools.common.Accumulator;
import com.taobao.weex.devtools.inspector.elements.AbstractChainedDescriptor;
import com.taobao.weex.devtools.inspector.elements.Descriptor;

import javax.annotation.Nullable;

final class DialogDescriptor
    extends AbstractChainedDescriptor<Dialog> implements HighlightableDescriptor {
  @Override
  protected void onGetChildren(Dialog element, Accumulator<Object> children) {
    Window window = element.getWindow();
    if (window != null) {
      children.store(window);
    }
  }

  @Nullable
  @Override
  public View getViewForHighlighting(Object element) {
    final Descriptor.Host host = getHost();
    if (host instanceof AndroidDescriptorHost) {
      final Dialog dialog = (Dialog) element;
      return ((AndroidDescriptorHost) host).getHighlightingView(dialog.getWindow());
    }

    return null;
  }
}
