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
import java.io.OutputStream;
import java.io.PrintStream;

/**
 * When streaming output, it is common for the user to just hit Ctrl-C
 * to terminate the stream.  When this happens, the underlying output
 * stream throws an {@link IOException} to indicate the pipe is broken.
 * Dumpapp uses a {@link PrintStream} to wrap the underlying {@link OutputStream}
 * though, and {@link PrintStream} silently swallows {@link IOException}.
 * <p/>
 * While streaming dumpers can/should check {@link PrintStream#checkError},
 * this is used in cases where we know the stream has gone bad to force flow
 * control out of the dumper and back into the calling machinery that controls
 * the stream framer.
 */
class DumpappOutputBrokenException extends RuntimeException {

  public DumpappOutputBrokenException() {
  }

  public DumpappOutputBrokenException(String detailMessage) {
    super(detailMessage);
  }

  public DumpappOutputBrokenException(String detailMessage, Throwable throwable) {
    super(detailMessage, throwable);
  }

  public DumpappOutputBrokenException(Throwable throwable) {
    super(throwable);
  }
}
