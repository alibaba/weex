/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.server;

import com.taobao.weex.devtools.common.LogUtil;

import java.io.IOException;
import java.io.InputStream;

import javax.annotation.concurrent.NotThreadSafe;

@NotThreadSafe
public class CompositeInputStream extends InputStream {
  private final InputStream[] mStreams;
  private int mCurrentIndex;

  public CompositeInputStream(InputStream[] streams) {
    if (streams == null || streams.length < 2) {
      throw new IllegalArgumentException("Streams must be non-null and have more than 1 entry");
    }
    mStreams = streams;
    mCurrentIndex = 0;
  }

  @Override
  public int available() throws IOException {
    return mStreams[mCurrentIndex].available();
  }

  @Override
  public void close() throws IOException {
    closeAll(mCurrentIndex);
  }

  private void closeAll(int mostImportantIndex) throws IOException {
    IOException exceptionToThrow = null;
    for (int i = 0; i < mStreams.length; i++) {
      try {
        mStreams[i].close();
      } catch (IOException e) {
        IOException previousException = exceptionToThrow;
        if (i == mostImportantIndex || exceptionToThrow == null) {
          exceptionToThrow = e;
        }
        if (previousException != null && previousException != exceptionToThrow) {
          LogUtil.w(previousException, "Suppressing exception");
        }
      }
    }
  }

  @Override
  public void mark(int readlimit) {
    throw new UnsupportedOperationException();
  }

  @Override
  public boolean markSupported() {
    return false;
  }

  @Override
  public void reset() throws IOException {
    throw new UnsupportedOperationException();
  }

  @Override
  public int read(byte[] buffer) throws IOException {
    return read(buffer, 0, buffer.length);
  }

  @Override
  public int read(byte[] buffer, int byteOffset, int byteCount) throws IOException {
    int n;
    while ((n = mStreams[mCurrentIndex].read(buffer, byteOffset, byteCount)) == -1) {
      if (!tryMoveToNextStream()) {
        break;
      }
    }
    return n;
  }

  @Override
  public int read() throws IOException {
    int b;
    while ((b = mStreams[mCurrentIndex].read()) == -1) {
      if (!tryMoveToNextStream()) {
        break;
      }
    }
    return b;
  }

  private boolean tryMoveToNextStream() {
    if (mCurrentIndex + 1 < mStreams.length) {
      mCurrentIndex++;
      return true;
    }
    return false;
  }

  @Override
  public long skip(long byteCount) throws IOException {
    byte[] buf = new byte[(int)byteCount];
    int n = read(buf);
    return n >= 0 ? n : -1;
  }
}
