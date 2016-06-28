/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.inspector;

import android.util.Log;

import com.taobao.weex.devtools.common.LogRedirector;
import com.taobao.weex.devtools.common.Util;
import com.taobao.weex.devtools.inspector.jsonrpc.JsonRpcException;
import com.taobao.weex.devtools.inspector.jsonrpc.JsonRpcPeer;
import com.taobao.weex.devtools.inspector.jsonrpc.PendingRequest;
import com.taobao.weex.devtools.inspector.jsonrpc.protocol.JsonRpcError;
import com.taobao.weex.devtools.inspector.jsonrpc.protocol.JsonRpcRequest;
import com.taobao.weex.devtools.inspector.jsonrpc.protocol.JsonRpcResponse;
import com.taobao.weex.devtools.inspector.protocol.ChromeDevtoolsDomain;
import com.taobao.weex.devtools.json.ObjectMapper;
import com.taobao.weex.devtools.websocket.CloseCodes;
import com.taobao.weex.devtools.websocket.SimpleEndpoint;
import com.taobao.weex.devtools.websocket.SimpleSession;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

/**
 * Implements a limited version of the Chrome Debugger WebSocket protocol (using JSON-RPC 2.0).
 * The most up-to-date documentation can be found in the Blink source code:
 * <a href="https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/Source/devtools/protocol.json&q=protocol.json&sq=package:chromium&type=cs">protocol.json</a>
 */
public class ChromeDevtoolsServer implements SimpleEndpoint {
  private static final String TAG = "ChromeDevtoolsServer";

  public static final String PATH = "/inspector";

  private final ObjectMapper mObjectMapper;
  private final MethodDispatcher mMethodDispatcher;
  private final Map<SimpleSession, JsonRpcPeer> mPeers =
      Collections.synchronizedMap(
          new HashMap<SimpleSession, JsonRpcPeer>());

  public ChromeDevtoolsServer(Iterable<ChromeDevtoolsDomain> domainModules) {
    mObjectMapper = new ObjectMapper();
    mMethodDispatcher = new MethodDispatcher(mObjectMapper, domainModules);
  }

  @Override
  public void onOpen(SimpleSession session) {
    LogRedirector.d(TAG, "onOpen");
    mPeers.put(session, new JsonRpcPeer(mObjectMapper, session));
  }

  @Override
  public void onClose(SimpleSession session, int code, String reasonPhrase) {
    LogRedirector.d(TAG, "onClose: reason=" + code + " " + reasonPhrase);

    JsonRpcPeer peer = mPeers.remove(session);
    if (peer != null) {
      peer.invokeDisconnectReceivers();
    }
  }

  @Override
  public void onMessage(SimpleSession session, byte[] message, int messageLen) {
    LogRedirector.d(TAG, "Ignoring binary message of length " + messageLen);
  }

  @Override
  public void onMessage(SimpleSession session, String message) {
    if (LogRedirector.isLoggable(TAG, Log.VERBOSE)) {
      LogRedirector.v(TAG, "onMessage: message=" + message);
    }
    try {
      JsonRpcPeer peer = mPeers.get(session);
      Util.throwIfNull(peer);

      handleRemoteMessage(peer, message);
    } catch (IOException e) {
      if (LogRedirector.isLoggable(TAG, Log.VERBOSE)) {
        LogRedirector.v(TAG, "Unexpected I/O exception processing message: " + e);
      }
      closeSafely(session, CloseCodes.UNEXPECTED_CONDITION, e.getClass().getSimpleName());
    } catch (MessageHandlingException e) {
      LogRedirector.i(TAG, "Message could not be processed by implementation: " + e);
      closeSafely(session, CloseCodes.UNEXPECTED_CONDITION, e.getClass().getSimpleName());
    } catch (JSONException e) {
      LogRedirector.v(TAG, "Unexpected JSON exception processing message", e);
      closeSafely(session, CloseCodes.UNEXPECTED_CONDITION, e.getClass().getSimpleName());
    }
  }

  private void closeSafely(SimpleSession session, int code, String reasonPhrase) {
    session.close(code, reasonPhrase);
  }

  private void handleRemoteMessage(JsonRpcPeer peer, String message)
      throws IOException, MessageHandlingException, JSONException {
    // Parse as a generic JSONObject first since we don't know if this is a request or response.
    Log.v(TAG, "handleRemoteMessage : " + message);
    JSONObject messageNode = new JSONObject(message);
    if (messageNode.has("method")) {
      handleRemoteRequest(peer, messageNode);
    } else if (messageNode.has("result")) {
      handleRemoteResponse(peer, messageNode);
    } else {
      throw new MessageHandlingException("Improper JSON-RPC message: " + message);
    }
  }

  private void handleRemoteRequest(JsonRpcPeer peer, JSONObject requestNode)
      throws MessageHandlingException {
    JsonRpcRequest request;
    request = mObjectMapper.convertValue(
        requestNode,
        JsonRpcRequest.class);

    JSONObject result = null;
    JSONObject error = null;
    try {
      result = mMethodDispatcher.dispatch(peer,
          request.method,
          request.params);
    } catch (JsonRpcException e) {
      logDispatchException(e);
      error = mObjectMapper.convertValue(e.getErrorMessage(), JSONObject.class);
    }
    if (request.id != null) {
      JsonRpcResponse response = new JsonRpcResponse();
      response.id = request.id;
      response.result = result;
      response.error = error;
      JSONObject jsonObject = mObjectMapper.convertValue(response, JSONObject.class);
      String responseString;
      try {
        responseString = jsonObject.toString();
      } catch (OutOfMemoryError e) {
        // JSONStringer can cause an OOM when the Json to handle is too big.
        response.result = null;
        response.error = mObjectMapper.convertValue(e.getMessage(), JSONObject.class);
        jsonObject = mObjectMapper.convertValue(response, JSONObject.class);
        responseString = jsonObject.toString();
      }
      Log.v(TAG, "handleRemoteRequest : " + responseString);
      peer.getWebSocket().sendText(responseString);
    }
  }

  private static void logDispatchException(JsonRpcException e) {
    JsonRpcError errorMessage = e.getErrorMessage();
    switch (errorMessage.code) {
      case METHOD_NOT_FOUND:
        LogRedirector.d(TAG, "Method not implemented: " + errorMessage.message);
        break;
      default:
        LogRedirector.w(TAG, "Error processing remote message", e);
    }
  }

  private void handleRemoteResponse(JsonRpcPeer peer, JSONObject responseNode)
      throws MismatchedResponseException {
    JsonRpcResponse response = mObjectMapper.convertValue(
        responseNode,
        JsonRpcResponse.class);
    PendingRequest pendingRequest = peer.getAndRemovePendingRequest(response.id);
    if (pendingRequest == null) {
      throw new MismatchedResponseException(response.id);
    }
    if (pendingRequest.callback != null) {
      pendingRequest.callback.onResponse(peer, response);
    }
    Log.v(TAG, "handleRemoteResponse : " + responseNode.toString());
  }

  @Override
  public void onError(SimpleSession session, Throwable ex) {
    LogRedirector.e(TAG, "onError: ex=" + ex.toString());
  }
}
