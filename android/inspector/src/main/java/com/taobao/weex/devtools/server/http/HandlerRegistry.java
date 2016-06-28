/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.server.http;

import android.support.annotation.Nullable;

import java.util.ArrayList;

public class HandlerRegistry {
  private final ArrayList<PathMatcher> mPathMatchers = new ArrayList<>();
  private final ArrayList<HttpHandler> mHttpHandlers = new ArrayList<>();

  public synchronized void register(PathMatcher path, HttpHandler handler) {
    mPathMatchers.add(path);
    mHttpHandlers.add(handler);
  }

  public synchronized boolean unregister(PathMatcher path, HttpHandler handler) {
    int index = mPathMatchers.indexOf(path);
    if (index >= 0) {
      if (handler == mHttpHandlers.get(index)) {
        mPathMatchers.remove(index);
        mHttpHandlers.remove(index);
        return true;
      }
    }
    return false;
  }

  @Nullable
  public synchronized HttpHandler lookup(String path) {
    for (int i = 0, N = mPathMatchers.size(); i < N; i++) {
      if (mPathMatchers.get(i).match(path)) {
        return mHttpHandlers.get(i);
      }
    }
    return null;
  }
}
