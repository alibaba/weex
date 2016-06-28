/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.inspector.elements;

import com.taobao.weex.devtools.common.ThreadBound;

import javax.annotation.Nullable;

/**
 * Provides a document that can be rendered in Chrome's Elements tab (conforming loosely to the
 * W3C DOM to the degree specified in this API).
 *
 * @see DocumentProviderFactory
 */
public interface DocumentProvider extends ThreadBound {
  void setListener(DocumentProviderListener listener);

  void dispose();

  @Nullable
  Object getRootElement();

  @Nullable
  NodeDescriptor getNodeDescriptor(@Nullable Object element);

  void highlightElement(Object element, int color);

  void hideHighlight();

  void setInspectModeEnabled(boolean enabled);

  void setAttributesAsText(Object element, String text);
}
