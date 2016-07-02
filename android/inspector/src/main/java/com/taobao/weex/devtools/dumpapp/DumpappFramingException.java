/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.dumpapp;

import java.io.IOException;

/**
 * Thrown to indicate an error in the dumpapp framing protocol as received from the remote
 * peer.
 */
class DumpappFramingException extends IOException {
  public DumpappFramingException(String message) {
    super(message);
  }
}
