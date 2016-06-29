/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.inspector.elements.android;

import android.app.Application;

import com.taobao.weex.devtools.common.Accumulator;
import com.taobao.weex.devtools.common.Util;
import com.taobao.weex.devtools.inspector.elements.AbstractChainedDescriptor;
import com.taobao.weex.devtools.inspector.elements.NodeType;

// For the root, we use 1 object for both element and descriptor.

final class AndroidDocumentRoot extends AbstractChainedDescriptor<AndroidDocumentRoot> {
  private final Application mApplication;

  public AndroidDocumentRoot(Application application) {
    mApplication = Util.throwIfNull(application);
  }

  @Override
  protected NodeType onGetNodeType(AndroidDocumentRoot element) {
    return NodeType.DOCUMENT_NODE;
  }

  @Override
  protected String onGetNodeName(AndroidDocumentRoot element) {
    return "root";
  }

  @Override
  protected void onGetChildren(AndroidDocumentRoot element, Accumulator<Object> children) {
    children.store(mApplication);
  }
}
