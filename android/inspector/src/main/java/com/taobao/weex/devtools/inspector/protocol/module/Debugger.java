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

public class Debugger implements ChromeDevtoolsDomain {
  public Debugger() {
  }

  @ChromeDevtoolsMethod
  public void enable(JsonRpcPeer peer, JSONObject params) {
  }

  @ChromeDevtoolsMethod
  public void disable(JsonRpcPeer peer, JSONObject params) {
  }

  @ChromeDevtoolsMethod
  public JsonRpcResult canSetScriptSource(JsonRpcPeer peer, JSONObject params) {
    return new SimpleBooleanResult(false);
  }

  @ChromeDevtoolsMethod
  public void setPauseOnExceptions(JsonRpcPeer peer, JSONObject params) {
  }
}
