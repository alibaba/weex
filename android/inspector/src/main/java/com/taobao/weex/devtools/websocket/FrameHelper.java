/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.websocket;

import com.taobao.weex.devtools.common.Utf8Charset;

class FrameHelper {
  public static Frame createTextFrame(String payload) {
    return createSimpleFrame(Frame.OPCODE_TEXT_FRAME, Utf8Charset.encodeUTF8(payload));
  }

  public static Frame createBinaryFrame(byte[] payload) {
    return createSimpleFrame(Frame.OPCODE_BINARY_FRAME, payload);
  }

  public static Frame createCloseFrame(int closeCode, String reasonPhrase) {
    byte[] reasonPhraseEncoded = null;
    int payloadLen = 2;
    if (reasonPhrase != null) {
      reasonPhraseEncoded = Utf8Charset.encodeUTF8(reasonPhrase);
      payloadLen += reasonPhraseEncoded.length;
    }
    byte[] payload = new byte[payloadLen];
    payload[0] = (byte)((closeCode >> 8) & 0xff);
    payload[1] = (byte)((closeCode) & 0xff);
    if (reasonPhraseEncoded != null) {
      System.arraycopy(reasonPhraseEncoded, 0, payload, 2, reasonPhraseEncoded.length);
    }
    return createSimpleFrame(Frame.OPCODE_CONNECTION_CLOSE, payload);
  }

  public static Frame createPingFrame(byte[] payload, int payloadLen) {
    return createSimpleFrame(Frame.OPCODE_CONNECTION_PING, payload, payloadLen);
  }

  public static Frame createPongFrame(byte[] payload, int payloadLen) {
    return createSimpleFrame(Frame.OPCODE_CONNECTION_PONG, payload, payloadLen);
  }

  private static Frame createSimpleFrame(byte opcode, byte[] payload) {
    return createSimpleFrame(opcode, payload, payload.length);
  }

  private static Frame createSimpleFrame(byte opCode, byte[] payload, int payloadLen) {
    Frame frame = new Frame();
    frame.fin = true;
    frame.hasMask = false;
    frame.opcode = opCode;
    frame.payloadLen = payloadLen;
    frame.payloadData = payload;
    return frame;
  }
}
