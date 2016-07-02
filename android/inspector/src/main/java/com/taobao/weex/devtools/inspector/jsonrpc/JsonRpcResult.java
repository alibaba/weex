/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.inspector.jsonrpc;

import com.taobao.weex.devtools.inspector.jsonrpc.protocol.JsonRpcResponse;

/**
 * Marker interface used to denote a JSON-RPC result.  After conversion from Jackson,
 * this will be placed into {@link JsonRpcResponse#result}.
 */
public interface JsonRpcResult {
}
