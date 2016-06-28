/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.inspector.console;

import com.taobao.weex.devtools.inspector.helper.ChromePeerManager;

import javax.annotation.Nullable;

public class ConsolePeerManager extends ChromePeerManager {

  private static ConsolePeerManager sInstance;

  private ConsolePeerManager() {
    super();
  }

  @Nullable
  public static synchronized ConsolePeerManager getInstanceOrNull() {
    return sInstance;
  }

  public static synchronized ConsolePeerManager getOrCreateInstance() {
    if (sInstance == null) {
      sInstance = new ConsolePeerManager();
    }
    return sInstance;
  }
}
