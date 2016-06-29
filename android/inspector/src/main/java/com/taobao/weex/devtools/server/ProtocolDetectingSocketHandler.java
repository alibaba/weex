/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.server;

import android.content.Context;
import android.net.LocalSocket;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;

/**
 * Socket handler which is designed to detect a difference in protocol signatures very early on
 * in the connection to figure out which real handler to route to.  This is used for performance
 * and backwards compatibility reasons to maintain WeexInspector having just one actual socket
 * connection despite dumpapp and DevTools now diverging in protocol.
 * <p />
 * Note this trick is only possible if the protocol requires that the client initiate the
 * conversation.  Otherwise, the server would be expected to say something before we know what
 * protocol the client is speaking.
 */
public class ProtocolDetectingSocketHandler extends SecureSocketHandler {
  private static final int SENSING_BUFFER_SIZE = 256;

  private final ArrayList<HandlerInfo> mHandlers = new ArrayList<>(2);

  public ProtocolDetectingSocketHandler(Context context) {
    super(context);
  }

  public void addHandler(MagicMatcher magicMatcher, SocketLikeHandler handler) {
    mHandlers.add(new HandlerInfo(magicMatcher, handler));
  }

  @Override
  protected void onSecured(LocalSocket socket) throws IOException {
    LeakyBufferedInputStream leakyIn = new LeakyBufferedInputStream(
        socket.getInputStream(),
        SENSING_BUFFER_SIZE);

    if (mHandlers.isEmpty()) {
      throw new IllegalStateException("No handlers added");
    }

    for (int i = 0, N = mHandlers.size(); i < N; i++) {
      HandlerInfo handlerInfo = mHandlers.get(i);
      leakyIn.mark(SENSING_BUFFER_SIZE);
      boolean matches = handlerInfo.magicMatcher.matches(leakyIn);
      leakyIn.reset();
      if (matches) {
        SocketLike socketLike = new SocketLike(socket, leakyIn);
        handlerInfo.handler.onAccepted(socketLike);
        return;
      }
    }

    throw new IOException("No matching handler, firstByte=" + leakyIn.read());
  }

  public interface MagicMatcher {
    boolean matches(InputStream in) throws IOException;
  }

  public static class ExactMagicMatcher implements MagicMatcher {
    private final byte[] mMagic;

    public ExactMagicMatcher(byte[] magic) {
      mMagic = magic;
    }

    @Override
    public boolean matches(InputStream in) throws IOException {
      byte[] buf = new byte[mMagic.length];
      int n = in.read(buf);
      return n == buf.length && Arrays.equals(buf, mMagic);
    }
  }

  public static class AlwaysMatchMatcher implements MagicMatcher {
    @Override
    public boolean matches(InputStream in) throws IOException {
      return true;
    }
  }

  private static class HandlerInfo {
    public final MagicMatcher magicMatcher;
    public final SocketLikeHandler handler;

    private HandlerInfo(MagicMatcher magicMatcher, SocketLikeHandler handler) {
      this.magicMatcher = magicMatcher;
      this.handler = handler;
    }
  }
}
