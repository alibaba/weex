/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.common;

import java.io.UnsupportedEncodingException;
import java.nio.charset.Charset;

public class Utf8Charset {

  public static final String NAME = "UTF-8";
  public static final Charset INSTANCE = Charset.forName(NAME);

  public static byte[] encodeUTF8(String str) {
    try {
      return str.getBytes(NAME);
    } catch (UnsupportedEncodingException e) {
      throw new RuntimeException(e);
    }
  }

  public static String decodeUTF8(byte[] bytes) {
    return new String(bytes, INSTANCE);
  }
}
