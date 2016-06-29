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

/**
 * Similar to {@link SocketHandler} but designed to operate on {@link SocketLike} instances
 * which allow for buffered "peeks" of data to decide which protocol handler to use.
 *
 * @see SocketHandler
 * @see SocketLike
 */
public interface SocketLikeHandler {
  /** @see SocketHandler#onAccepted(LocalSocket) */
  void onAccepted(SocketLike socket) throws IOException;
}
