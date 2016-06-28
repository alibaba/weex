/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.inspector.elements.android;

import android.os.Build;

public interface AndroidDocumentConstants {
  /**
   * Minimum API version required to make effective use of AndroidDocumentProvider. This can be
   * moved back significantly through manual APIs to discover {@link android.app.Activity}
   * instances.
   */
  int MIN_API_LEVEL = Build.VERSION_CODES.ICE_CREAM_SANDWICH;
}
