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
import com.taobao.weex.devtools.json.annotation.JsonValue;

import org.json.JSONObject;

import javax.annotation.Nullable;

@SuppressLint({ "UsingDefaultJsonDeserializer", "EmptyJsonPropertyUse" })
public class JsonRpcError {
  @JsonProperty(required = true)
  public ErrorCode code;

  @JsonProperty(required = true)
  public String message;

  @JsonProperty
  public JSONObject data;

  public JsonRpcError() {
  }

  public JsonRpcError(ErrorCode code, String message, @Nullable JSONObject data) {
    this.code = code;
    this.message = message;
    this.data = data;
  }

  public enum ErrorCode {
    PARSER_ERROR(-32700),
    INVALID_REQUEST(-32600),
    METHOD_NOT_FOUND(-32601),
    INVALID_PARAMS(-32602),
    INTERNAL_ERROR(-32603);

    private final int mProtocolValue;

    private ErrorCode(int protocolValue) {
      mProtocolValue = protocolValue;
    }

    @JsonValue
    public int getProtocolValue() {
      return mProtocolValue;
    }
  }
}
