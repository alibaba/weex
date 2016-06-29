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

@SuppressLint({ "UsingDefaultJsonDeserializer", "EmptyJsonPropertyUse" })
public class JsonRpcResponse {
  @JsonProperty(required = true)
  public long id;

  @JsonProperty
  public JSONObject result;

  @JsonProperty
  public JSONObject error;
}
