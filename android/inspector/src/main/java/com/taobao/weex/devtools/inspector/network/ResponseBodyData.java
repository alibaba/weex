/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.inspector.network;

/**
 * Special file data necessary to comply with the Chrome DevTools instance which doesn't let
 * us just naively base64 encode everything.
 */
public class ResponseBodyData {
  public String data;
  public boolean base64Encoded;
}
