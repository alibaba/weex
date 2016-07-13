/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.inspector;

import android.content.Context;

import com.taobao.weex.devtools.inspector.protocol.ChromeDevtoolsDomain;
import com.taobao.weex.devtools.server.SocketLike;
import com.taobao.weex.devtools.server.SocketLikeHandler;
import com.taobao.weex.devtools.server.http.ExactPathMatcher;
import com.taobao.weex.devtools.server.http.HandlerRegistry;
import com.taobao.weex.devtools.server.http.LightHttpServer;
import com.taobao.weex.devtools.websocket.WebSocketHandler;

import java.io.IOException;

public class DevtoolsSocketHandler implements SocketLikeHandler {
  private final Context mContext;
  private final Iterable<ChromeDevtoolsDomain> mModules;
  private final LightHttpServer mServer;

  public DevtoolsSocketHandler(Context context, Iterable<ChromeDevtoolsDomain> modules) {
    mContext = context;
    mModules = modules;
    mServer = createServer();
  }

  private LightHttpServer createServer() {
    HandlerRegistry registry = new HandlerRegistry();
    ChromeDiscoveryHandler discoveryHandler =
        new ChromeDiscoveryHandler(
            mContext,
            ChromeDevtoolsServer.PATH);
    discoveryHandler.register(registry);
    registry.register(
        new ExactPathMatcher(ChromeDevtoolsServer.PATH),
        new WebSocketHandler(new ChromeDevtoolsServer(mModules)));

    return new LightHttpServer(registry);
  }

  @Override
  public void onAccepted(SocketLike socket) throws IOException {
    mServer.serve(socket);
  }
}
