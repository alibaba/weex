/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.inspector.protocol.module;

import android.os.Build;

public interface DatabaseConstants {

  /**
   * Minimum API version required to use the {@link Database}.
   */
  public static final int MIN_API_LEVEL = Build.VERSION_CODES.HONEYCOMB;
}
