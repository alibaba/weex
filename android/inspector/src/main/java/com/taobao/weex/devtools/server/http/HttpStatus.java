/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.server.http;

public interface HttpStatus {
  int HTTP_SWITCHING_PROTOCOLS = 101;
  int HTTP_OK = 200;
  int HTTP_NOT_FOUND = 404;
  int HTTP_INTERNAL_SERVER_ERROR = 500;
  int HTTP_NOT_IMPLEMENTED = 501;
}
