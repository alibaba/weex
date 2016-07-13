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

import com.taobao.weex.devtools.inspector.elements.Descriptor;

import javax.annotation.Nullable;

interface AndroidDescriptorHost extends Descriptor.Host {
  @Nullable
  View getHighlightingView(@Nullable Object element);
}
