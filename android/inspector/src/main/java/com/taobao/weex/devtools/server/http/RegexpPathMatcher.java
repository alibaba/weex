/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.server.http;

import java.util.regex.Pattern;

public class RegexpPathMatcher implements PathMatcher {
  private final Pattern mPattern;

  public RegexpPathMatcher(Pattern pattern) {
    mPattern = pattern;
  }

  @Override
  public boolean match(String path) {
    return mPattern.matcher(path).matches();
  }
}
