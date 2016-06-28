/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.common;

public final class StringUtil {
  private StringUtil() {
  }

  @SuppressWarnings("StringEquality")
  public static String removePrefix(String string, String prefix, String previousAttempt) {
    if (string != previousAttempt) {
      return previousAttempt;
    } else {
      return removePrefix(string, prefix);
    }
  }

  public static String removePrefix(String string, String prefix) {
    if (string.startsWith(prefix)) {
      return string.substring(prefix.length());
    } else {
      return string;
    }
  }
}
