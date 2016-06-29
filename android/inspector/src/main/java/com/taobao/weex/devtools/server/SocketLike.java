/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.server;

import android.net.LocalSocket;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

/**
 * Utility to allow reading buffered data from a socket and then "unreading" the data
 * and combining it with the original unbuffered stream.  This is useful when
 * handing off from one logical protocol layer to the next, such as when upgrading an HTTP
 * connection to the websocket protocol.
 */
public class SocketLike {
  private final LocalSocket mSocket;
  private final LeakyBufferedInputStream mLeakyInput;

  public SocketLike(SocketLike socketLike, LeakyBufferedInputStream leakyInput) {
    this(socketLike.mSocket, leakyInput);
  }

  public SocketLike(LocalSocket socket, LeakyBufferedInputStream leakyInput) {
    mSocket = socket;
    mLeakyInput = leakyInput;
  }

  public InputStream getInput() throws IOException {
    return mLeakyInput.leakBufferAndStream();
  }

  public OutputStream getOutput() throws IOException {
    return mSocket.getOutputStream();
  }
}
