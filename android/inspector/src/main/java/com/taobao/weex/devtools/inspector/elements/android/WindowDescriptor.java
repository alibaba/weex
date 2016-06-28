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
import android.view.Window;

import com.taobao.weex.devtools.common.Accumulator;
import com.taobao.weex.devtools.inspector.elements.AbstractChainedDescriptor;

import javax.annotation.Nullable;

final class WindowDescriptor extends AbstractChainedDescriptor<Window>
    implements HighlightableDescriptor {
  @Override
  protected void onGetChildren(Window element, Accumulator<Object> children) {
    View decorView = element.peekDecorView();
    if (decorView != null) {
      children.store(decorView);
    }
  }

  @Override
  @Nullable
  public View getViewForHighlighting(Object element) {
    Window window = (Window) element;
    return window.peekDecorView();
  }
}
