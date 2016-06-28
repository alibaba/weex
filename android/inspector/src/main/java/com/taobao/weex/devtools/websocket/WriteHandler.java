/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.websocket;

import java.io.BufferedOutputStream;
import java.io.IOException;
import java.io.OutputStream;

import javax.annotation.concurrent.ThreadSafe;

@ThreadSafe
class WriteHandler {
  private final BufferedOutputStream mBufferedOutput;

  public WriteHandler(OutputStream rawSocketOutput) {
    mBufferedOutput = new BufferedOutputStream(rawSocketOutput, 1024);
  }

  public synchronized void write(Frame frame, WriteCallback callback) {
    try {
      frame.writeTo(mBufferedOutput);
      mBufferedOutput.flush();
      callback.onSuccess();
    } catch (IOException e) {
      callback.onFailure(e);
    }
  }
}
