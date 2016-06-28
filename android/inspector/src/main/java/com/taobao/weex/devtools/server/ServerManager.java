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

public class ServerManager {
  private static final String THREAD_PREFIX = "WeexListener";
  private final LocalSocketServer mServer;

  private volatile boolean mStarted;

  public ServerManager(LocalSocketServer server) {
    mServer = server;
  }

  public void start() {
    if (mStarted) {
      throw new IllegalStateException("Already started");
    }
    mStarted = true;
    startServer(mServer);
  }

  private void startServer(final LocalSocketServer server) {
    Thread listener = new Thread(THREAD_PREFIX + "-" + server.getName()) {
      @Override
      public void run() {
        try {
          server.run();
        } catch (IOException e) {
          LogUtil.e(e, "Could not start WeexInspector server: %s", server.getName());
        }
      }
    };
    listener.start();
  }
}
