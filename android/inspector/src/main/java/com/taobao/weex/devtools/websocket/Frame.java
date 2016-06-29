/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.websocket;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.EOFException;
import java.io.IOException;
import java.io.InputStream;

/**
 * WebSocket frame as per RFC6455.
 */
class Frame {
  public static final byte OPCODE_TEXT_FRAME = 0x1;
  public static final byte OPCODE_BINARY_FRAME = 0x2;
  public static final byte OPCODE_CONNECTION_CLOSE = 0x8;
  public static final byte OPCODE_CONNECTION_PING = 0x9;
  public static final byte OPCODE_CONNECTION_PONG = 0xA;

  public boolean fin;
  public boolean rsv1;
  public boolean rsv2;
  public boolean rsv3;
  public byte opcode;
  public boolean hasMask;
  public long payloadLen;
  public byte[] maskingKey;
  public byte[] payloadData;

  public void readFrom(BufferedInputStream input) throws IOException {
    decodeFirstByte(readByteOrThrow(input));
    byte maskAndFirstLengthBits = readByteOrThrow(input);
    hasMask = (maskAndFirstLengthBits & 0x80) != 0;
    payloadLen = decodeLength((byte)(maskAndFirstLengthBits & ~0x80), input);
    maskingKey = hasMask ? decodeMaskingKey(input) : null;
    payloadData = new byte[(int)payloadLen];
    readBytesOrThrow(input, payloadData, 0, (int)payloadLen);
    MaskingHelper.unmask(maskingKey, payloadData, 0, (int)payloadLen);
  }

  public void writeTo(BufferedOutputStream output) throws IOException {
    output.write(encodeFirstByte());
    byte[] lengthAndMaskBit = encodeLength(payloadLen);
    if (hasMask) {
      lengthAndMaskBit[0] |= 0x80;
    }
    output.write(lengthAndMaskBit, 0, lengthAndMaskBit.length);

    if (hasMask) {
      throw new UnsupportedOperationException("Writing masked data not implemented");
    }
    output.write(payloadData, 0, (int) payloadLen);
  }

  private void decodeFirstByte(byte b) {
    fin = (b & 0x80) != 0;
    rsv1 = (b & 0x40) != 0;
    rsv2 = (b & 0x20) != 0;
    rsv3 = (b & 0x10) != 0;
    opcode = (byte)(b & 0xf);
  }

  private byte encodeFirstByte() {
    byte b = 0;
    if (fin) {
      b |= 0x80;
    }
    if (rsv1) {
      b |= 0x40;
    }
    if (rsv2) {
      b |= 0x20;
    }
    if (rsv3) {
      b |= 0x10;
    }
    b |= (opcode & 0xf);
    return b;
  }

  private long decodeLength(byte firstLenByte, InputStream in) throws IOException {
    if (firstLenByte <= 125) {
      return firstLenByte;
    } else if (firstLenByte == 126) {
      return (readByteOrThrow(in) & 0xff) << 8 | (readByteOrThrow(in) & 0xff);
    } else if (firstLenByte == 127) {
      long len = 0;
      for (int i = 0; i < 8; i++) {
        len |= (readByteOrThrow(in) & 0xff);
        len <<= 8;
      }
      return len;
    } else {
      throw new IOException("Unexpected length byte: " + firstLenByte);
    }
  }

  private static byte[] encodeLength(long len) {
    if (len <= 125) {
      return new byte[] { (byte)len };
    } else if (len <= 0xffff) {
      return new byte[] {
          126,
          (byte)((len >> 8) & 0xff),
          (byte)((len) & 0xff)
      };
    } else {
      return new byte[] {
          127,
          (byte)((len >> 56) & 0xff),
          (byte)((len >> 48) & 0xff),
          (byte)((len >> 40) & 0xff),
          (byte)((len >> 32) & 0xff),
          (byte)((len >> 24) & 0xff),
          (byte)((len >> 16) & 0xff),
          (byte)((len >> 8) & 0xff),
          (byte)((len) & 0xff)
      };
    }
  }

  private static byte[] decodeMaskingKey(InputStream in) throws IOException {
    byte[] key = new byte[4];
    readBytesOrThrow(in, key, 0, key.length);
    return key;
  }

  private static void readBytesOrThrow(InputStream in, byte[] buf, int offset, int count)
      throws IOException {
    while (count > 0) {
      int n = in.read(buf, offset, count);
      if (n == -1) {
        throw new EOFException();
      }
      count -= n;
      offset += n;
    }
  }

  private static byte readByteOrThrow(InputStream in) throws IOException {
    int b = in.read();
    if (b == -1) {
      throw new EOFException();
    }
    return (byte)b;
  }
}
