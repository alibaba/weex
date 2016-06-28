/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.server.http;

public class ExactPathMatcher implements PathMatcher {
  private final String mPath;

  public ExactPathMatcher(String path) {
    mPath = path;
  }

  @Override
  public boolean match(String path) {
    return mPath.equals(path);
  }
}
