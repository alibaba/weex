package com.taobao.weex.devtools.debug;

import android.text.TextUtils;
import android.util.Log;

import com.squareup.okhttp.OkHttpClient;
import com.squareup.okhttp.Request;
import com.squareup.okhttp.Response;
import com.squareup.okhttp.ws.WebSocket;
import com.squareup.okhttp.ws.WebSocketCall;
import com.squareup.okhttp.ws.WebSocketListener;
import com.taobao.weex.devtools.websocket.SimpleSession;
import com.taobao.weex.utils.WXLogUtils;

import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;

import okio.Buffer;
import okio.BufferedSource;

public class DebugSocketClient implements WebSocketListener, SimpleSession {

    private static final String TAG = "DebugSocketClient";

    private final ConcurrentHashMap<Integer, Callback> mCallbacks = new ConcurrentHashMap<>();
    private WebSocket mWebSocket;
    private OkHttpClient mHttpClient;
    private Callback mConnectCallback;
    private DebugServerProxy mProxy;

    public DebugSocketClient(DebugServerProxy proxy) {
        mProxy = proxy;
    }

    public void connect(String url, Callback callback) {
        if (mHttpClient != null) {
            throw new IllegalStateException("DebugSocketClient is already initialized.");
        }
        mConnectCallback = callback;
        mHttpClient = new OkHttpClient();
        mHttpClient.setConnectTimeout(30, TimeUnit.SECONDS);
        mHttpClient.setWriteTimeout(30, TimeUnit.SECONDS);
        // Disable timeouts for read
        mHttpClient.setReadTimeout(0, TimeUnit.MINUTES);

        if (!TextUtils.isEmpty(url)) {
            Request request = new Request.Builder().url(url).build();
            WebSocketCall call = WebSocketCall.create(mHttpClient, request);
            call.enqueue(this);
        }
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
            Log.v(TAG, "sendMessage " + message);
            mWebSocket.sendMessage(WebSocket.PayloadType.TEXT, messageBuffer);
        } catch (IOException e) {
            Log.e(TAG, "sendMessage IOException " + e.toString());
        }
    }

    @Override
    public void onMessage(BufferedSource payload, WebSocket.PayloadType type)
            throws IOException {
        mProxy.handleMessage(payload, type);
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
        WXLogUtils.e("Error occurred, shutting down websocket connection: " + message);
        closeQuietly();

        // Trigger failure callbacks
        if (mConnectCallback != null) {
            mConnectCallback.onFailure(cause);
            mConnectCallback = null;
        }
        for (Callback callback : mCallbacks.values()) {
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
    }

    @Override
    public void sendText(String payload) {
        sendMessage(0, payload);
    }

    @Override
    public void sendBinary(byte[] payload) {
    }

    @Override
    public void close(int closeReason, String reasonPhrase) {
        closeQuietly();
    }

    @Override
    public boolean isOpen() {
        return mWebSocket != null;
    }

    public interface Callback {
        void onSuccess(String response);

        void onFailure(Throwable cause);
    }
}
