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
 * Alternative to JSR-356's Session class but with a less insane J2EE-style API.
 */
public interface SimpleSession {
  void sendText(String payload);
  void sendBinary(byte[] payload);

  /**
   * Request that the session be closed.
   *
   * @param closeReason Close reason, as per RFC6455
   * @param reasonPhrase Possibly arbitrary close reason phrase.
   */
  void close(int closeReason, String reasonPhrase);

  boolean isOpen();
}
