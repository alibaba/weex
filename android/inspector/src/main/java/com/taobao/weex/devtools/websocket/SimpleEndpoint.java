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
 * Alternative to JSR-356's Endpoint class but with a less insane J2EE-style API.
 */
public interface SimpleEndpoint {

  /**
   * Invoked when a new WebSocket session is established.
   *
   * @param session Unique handle for this session.
   */
  void onOpen(SimpleSession session);

  /**
   * Invoked when a text-based message is received from the peer.  May have spanned multiple
   * WebSocket packets.
   *
   * @param session Unique handle for this session.
   * @param message Complete payload data.
   */
  void onMessage(SimpleSession session, String message);

  /**
   * Invoked when a binary message is received from the peer.  May have spanned multiple
   * WebSocket packets.
   *
   * @param session Unique handle for this session.
   * @param message Complete payload data.
   * @param messageLen Maximum number of bytes of {@code message} to read.
   */
  void onMessage(SimpleSession session, byte[] message, int messageLen);

  /**
   * Invoked when a remote peer closed the WebSocket session or if {@link SimpleSession#close}
   * is invoked on our side.
   *
   * @param session Unique handle for this session.
   * @param closeReasonCode Close reason code (see RFC6455)
   * @param closeReasonPhrase Possibly arbitrary text phrase associated with the reason code.
   */
  void onClose(SimpleSession session, int closeReasonCode, String closeReasonPhrase);

  /**
   * Invoked when errors occur out of the normal band of the WebSocket protocol.  This is
   * intended for debug purposes and is generally not actionable.  The {@link #onClose} method
   * will still be invoked in all cases, making it reasonable to simply log in this method.
   *
   * @param session Unique handle for this session.
   * @param t Exception that occurred.
   */
  void onError(SimpleSession session, Throwable t);
}
