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

/**
 * Factory mechanism to dynamically construct the document provider.  This allows for lazy
 * initialization and memory cleanup when DevTools instances disconnect.
 */
public interface DocumentProviderFactory extends ThreadBound {
  DocumentProvider create();
}
