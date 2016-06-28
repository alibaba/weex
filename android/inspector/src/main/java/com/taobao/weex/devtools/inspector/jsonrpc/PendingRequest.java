/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.inspector.jsonrpc;

import javax.annotation.Nullable;

/**
 * Represents an outstanding request to the peer (issued by us).  This callback will be
 * fired when the server responds.  Note that with JSON-RPC, there is a special kind of
 * request called a notification which does not require a callback (and thus won't use
 * this class).
 */
public class PendingRequest {
  public final long requestId;
  public final @Nullable PendingRequestCallback callback;

  public PendingRequest(long requestId, @Nullable PendingRequestCallback callback) {
    this.requestId = requestId;
    this.callback = callback;
  }
}
