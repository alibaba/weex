/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.dumpapp;

import com.taobao.weex.devtools.common.LogUtil;
import com.taobao.weex.devtools.server.SocketLike;
import com.taobao.weex.devtools.server.SocketLikeHandler;

import java.io.DataInputStream;
import java.io.IOException;
import java.util.Arrays;

/**
 * Provides a kind of CLI-over-HTTP support for the ./scripts/dumpapp tool.
 * <p>
 * This handler accepts a list of text-based arguments to a FAB endpoint and responds with
 * a stream as furnished by the Dumper implementation on the app side.  A special "exit code"
 * property is also returned that the dumpapp tool uses to pass along the exit code of the
 * script.
 */
public class DumpappSocketLikeHandler implements SocketLikeHandler {
  public static final byte[] PROTOCOL_MAGIC = new byte[] { 'D', 'U', 'M', 'P' };
  public static final int PROTOCOL_VERSION = 1;

  private final Dumper mDumper;

  public DumpappSocketLikeHandler(Dumper dumper) {
    mDumper = dumper;
  }

  @Override
  public void onAccepted(SocketLike socket) throws IOException {
    DataInputStream in = new DataInputStream(socket.getInput());

    // Get through the initial hello...
    establishConversation(in);

    Framer framer = new Framer(in, socket.getOutput());
    String[] args = readArgs(framer);

    dump(mDumper, framer, args);
  }

  static void dump(Dumper dumper, Framer framer, String[] args) throws IOException {
    try {
      // We intentionally do not catch-all and write an exit code here.
      //
      // The dumper catches all expected exceptions and translates
      // them to an exit code, so the normal case is all good.
      //
      // DumpappOutputBrokenException is thrown in cases where we know
      // we are unable to write any more, including possibly while
      // writing the error code itself.
      //
      // Because other unchecked exceptions could also be thrown in
      // cases where the underlying stream is broken, and making
      // further calls on the broken stream (to write an exit code)
      // can corrupt the stream and throw still more unchecked
      // exceptions, we cannot safely write an exit code in this case.
      int exitCode = dumper.dump(
          framer.getStdin(),
          framer.getStdout(),
          framer.getStderr(),
          args);
      framer.writeExitCode(exitCode);
    } catch (DumpappOutputBrokenException e) {
      // This exception indicates we must stop all writes to the underlying stream
      // because there was IOException.  We interpret this to mean that we should
      // also shutdown the whole pipeline, similar to how SIGPIPE would behave
      // for command-line apps.
    }
  }

  private void establishConversation(DataInputStream in) throws IOException {
    byte[] magic = new byte[4];
    in.readFully(magic);
    if (!Arrays.equals(PROTOCOL_MAGIC, magic)) {
      throw logAndThrowProtocolException(
          "Incompatible protocol, are you using an old dumpapp script?");
    }

    int version = in.readInt();
    if (version != PROTOCOL_VERSION) {
      throw logAndThrowProtocolException(
          "Expected version=" + PROTOCOL_VERSION + "; got=" + version);
    }
  }

  private static IOException logAndThrowProtocolException(String message) throws IOException {
    LogUtil.w(message);
    throw new IOException(message);
  }

  private String[] readArgs(Framer framer) throws IOException {
    synchronized (framer) {
      byte type = framer.readFrameType();
      switch (type) {
        case Framer.ENTER_FRAME_PREFIX:
          int argc = framer.readInt();
          String[] argv = new String[argc];
          for (int i = 0; i < argc; i++) {
            argv[i] = framer.readString();
          }
          return argv;
        default:
          throw new DumpappFramingException("Expected enter frame, got: " + type);
      }
    }
  }
}
