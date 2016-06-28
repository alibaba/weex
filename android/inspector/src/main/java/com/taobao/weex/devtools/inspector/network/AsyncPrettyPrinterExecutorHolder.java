/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.inspector.network;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import javax.annotation.Nullable;

/**
 * A holder class for the executor service used for pretty printing related tasks
 */
final class AsyncPrettyPrinterExecutorHolder {

  private static ExecutorService sExecutorService;

  private AsyncPrettyPrinterExecutorHolder() {
  }
  
  public static void ensureInitialized() {
    if (sExecutorService == null) {
      sExecutorService = Executors.newCachedThreadPool();
    }
  }

  @Nullable
  public static ExecutorService getExecutorService() {
    return sExecutorService;
  }

  public static void shutdown() {
    sExecutorService.shutdown();
    sExecutorService = null;
  }
}
