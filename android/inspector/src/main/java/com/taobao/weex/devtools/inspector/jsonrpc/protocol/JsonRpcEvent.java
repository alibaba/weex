/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.inspector.jsonrpc.protocol;

import android.annotation.SuppressLint;

import com.taobao.weex.devtools.json.annotation.JsonProperty;

import org.json.JSONObject;

import javax.annotation.Nullable;

@SuppressLint({ "UsingDefaultJsonDeserializer", "EmptyJsonPropertyUse" })
public class JsonRpcEvent {
  @JsonProperty(required = true)
  public String method;

  @JsonProperty
  public JSONObject params;

  public JsonRpcEvent() {
  }

  public JsonRpcEvent(String method, @Nullable JSONObject params) {
    this.method = method;
    this.params = params;
  }
}
