/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
package com.taobao.weex.websocket;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.squareup.okhttp.OkHttpClient;
import com.squareup.okhttp.Request;
import com.squareup.okhttp.Response;
import com.squareup.okhttp.ws.WebSocket;
import com.squareup.okhttp.ws.WebSocketCall;
import com.squareup.okhttp.ws.WebSocketListener;
import com.taobao.weex.common.IWXBridge;
import com.taobao.weex.utils.WXLogUtils;

import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;

import okio.Buffer;
import okio.BufferedSource;

public class WXWebsocket implements WebSocketListener {

    private final ConcurrentHashMap<Integer, JSDebuggerCallback> mCallbacks = new ConcurrentHashMap<>();
    private WebSocket mWebSocket;
    private OkHttpClient mHttpClient;
    private JSDebuggerCallback mConnectCallback;
    private IWXBridge mWBridge;

    public WXWebsocket(IWXBridge waBridge) {
        mWBridge = waBridge;
    }

    public void connect(String url, JSDebuggerCallback callback) {
        if (mHttpClient != null) {
            throw new IllegalStateException(
                    "JSDebuggerWebSocketClient is already initialized.");
        }
        mConnectCallback = callback;
        mHttpClient = new OkHttpClient();
        mHttpClient.setConnectTimeout(10, TimeUnit.SECONDS);
        mHttpClient.setWriteTimeout(10, TimeUnit.SECONDS);
        // Disable timeouts for read
        mHttpClient.setReadTimeout(0, TimeUnit.MINUTES);

        Request request = new Request.Builder().url(url).build();
        WebSocketCall call = WebSocketCall.create(mHttpClient, request);
        call.enqueue(this);
    }

    public void closeQuietly() {
        if (mWebSocket != null) {
            try {
                mWebSocket.close(1000, "End of session");
            } catch (IOException e) {
                // swallow, no need to handle it here
            }
            mWebSocket = null;
        }
    }

    public void sendMessage(int requestID, String message) {
        if (mWebSocket == null) {
            return;
        }
        Buffer messageBuffer = new Buffer();
        messageBuffer.writeUtf8(message);
        try {
            mWebSocket.sendMessage(WebSocket.PayloadType.TEXT, messageBuffer);
        } catch (IOException e) {
        }
    }

    @Override
    public void onMessage(BufferedSource payload, WebSocket.PayloadType type)
            throws IOException {
        if (type != WebSocket.PayloadType.TEXT) {
            WXLogUtils.w(
                    "Websocket received unexpected message with payload of type "
                            + type);
            return;
        }

        String message = null;
        try {
            message = payload.readUtf8();
            JSONObject jsonObject = JSONObject.parseObject(message);
            Object name = jsonObject.get("name");
            Object value = jsonObject.get("value");
            if (name == null || value == null) {
                return;
            }
            if (name.toString().equals("callNative")) {
                JSONArray jsonArray = JSONObject.parseArray(value.toString());
                mWBridge.callNative(jsonArray.getString(0), jsonArray.getString(1),
                        jsonArray.getString(2));
            }
        } catch (Exception e) {

        } finally {
            payload.close();
        }
    }

    @Override
    public void onClose(int code, String reason) {
        mWebSocket = null;
    }

    @Override
    public void onPong(Buffer payload) {
        // ignore
    }

    private void abort(String message, Throwable cause) {
        WXLogUtils.e(
                "Error occurred, shutting down websocket connection: "
                        + message);
        closeQuietly();

        // Trigger failure callbacks
        if (mConnectCallback != null) {
            mConnectCallback.onFailure(cause);
            mConnectCallback = null;
        }
        for (JSDebuggerCallback callback : mCallbacks.values()) {
            callback.onFailure(cause);
        }
        mCallbacks.clear();
    }

    @Override
    public void onFailure(IOException e) {
        abort("Websocket exception", e);
    }

    @Override
    public void onOpen(WebSocket webSocket, Request arg1, Response arg2)
            throws IOException {
        mWebSocket = webSocket;
        if (mConnectCallback != null) {
            mConnectCallback.onSuccess(null);
        }
        mConnectCallback = null;
    }

    public interface JSDebuggerCallback {
        void onSuccess(String response);

        void onFailure(Throwable cause);
    }
}
