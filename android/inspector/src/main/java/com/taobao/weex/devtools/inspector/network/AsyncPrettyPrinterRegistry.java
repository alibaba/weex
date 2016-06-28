/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.inspector.network;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;
import javax.annotation.concurrent.ThreadSafe;

@ThreadSafe
public class AsyncPrettyPrinterRegistry {

  private final Map<String, AsyncPrettyPrinterFactory> mRegistry = new HashMap<>();

  public synchronized void register(String headerName, AsyncPrettyPrinterFactory factory) {
    mRegistry.put(headerName, factory);
  }

  @Nullable
  public synchronized AsyncPrettyPrinterFactory lookup(String headerName) {
    return mRegistry.get(headerName);
  }

  public synchronized boolean unregister(String headerName) {
    return mRegistry.remove(headerName) != null;
  }
}
