/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.websocket;

/**
 * Close codes as defined by RFC6455.
 */
public interface CloseCodes {
  int NORMAL_CLOSURE = 1000;
  int PROTOCOL_ERROR = 1002;
  int CLOSED_ABNORMALLY = 1006;
  int UNEXPECTED_CONDITION = 1011;
}
