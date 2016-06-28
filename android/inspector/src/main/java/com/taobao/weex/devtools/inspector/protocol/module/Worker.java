/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.inspector.protocol.module;

import com.taobao.weex.devtools.inspector.jsonrpc.JsonRpcPeer;
import com.taobao.weex.devtools.inspector.jsonrpc.JsonRpcResult;
import com.taobao.weex.devtools.inspector.protocol.ChromeDevtoolsDomain;
import com.taobao.weex.devtools.inspector.protocol.ChromeDevtoolsMethod;

import org.json.JSONObject;

public class Worker implements ChromeDevtoolsDomain {
  public Worker() {
  }

  @ChromeDevtoolsMethod
  public JsonRpcResult canInspectWorkers(JsonRpcPeer peer, JSONObject params) {
    return new SimpleBooleanResult(true);
  }
}
