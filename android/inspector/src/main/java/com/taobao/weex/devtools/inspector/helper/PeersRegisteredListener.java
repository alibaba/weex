/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.inspector.helper;

import com.taobao.weex.devtools.inspector.jsonrpc.JsonRpcPeer;

import java.util.concurrent.atomic.AtomicInteger;

public abstract class PeersRegisteredListener implements PeerRegistrationListener {
  private AtomicInteger mPeers = new AtomicInteger(0);

  @Override
  public final void onPeerRegistered(JsonRpcPeer peer) {
    if (mPeers.incrementAndGet() == 1) {
      onFirstPeerRegistered();
    }
    onPeerAdded(peer);
  }

  @Override
  public final void onPeerUnregistered(JsonRpcPeer peer) {
    if (mPeers.decrementAndGet() == 0) {
      onLastPeerUnregistered();
    }
    onPeerRemoved(peer);
  }

  protected void onPeerAdded(JsonRpcPeer peer) {}
  protected void onPeerRemoved(JsonRpcPeer peer) {}

  protected abstract void onFirstPeerRegistered();
  protected abstract void onLastPeerUnregistered();
}
