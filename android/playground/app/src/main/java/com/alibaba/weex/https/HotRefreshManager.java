package com.alibaba.weex.https;

import android.os.Handler;
import android.text.TextUtils;
import android.util.Log;

import com.alibaba.weex.constants.Constants;
import com.squareup.okhttp.OkHttpClient;
import com.squareup.okhttp.Request;
import com.squareup.okhttp.Response;
import com.squareup.okhttp.ws.WebSocket;
import com.squareup.okhttp.ws.WebSocketCall;
import com.squareup.okhttp.ws.WebSocketListener;

import java.io.IOException;

import okio.Buffer;
import okio.BufferedSource;

/**
 */
public class HotRefreshManager {

  private static final String TAG = "HotRefreshManager";

  private static HotRefreshManager hotRefreshInstance = new HotRefreshManager();
  private WebSocket mWebSocket = null;
  private Handler mHandler = null;

  private HotRefreshManager() {
  }

  public static HotRefreshManager getInstance() {
    return hotRefreshInstance;
  }

  public void setHandler(Handler handler) {
    mHandler = handler;
  }

  public boolean disConnect() {
    if (mWebSocket != null) {
      try {
        mWebSocket.close(1000, "activity finish!");
      } catch (IOException e) {
        e.printStackTrace();
      }
    }
    return true;
  }

  public boolean connect(String url) {
    OkHttpClient httpClient = new OkHttpClient();
    Request request = new Request.Builder().url(url).addHeader("sec-websocket-protocol", "echo-protocol").build();
    WebSocketCall.create(httpClient, request).enqueue(new WXWebSocketListener(url));

    return true;
  }

  class WXWebSocketListener implements WebSocketListener {

    private String mUrl;

    WXWebSocketListener(String url) {
      mUrl = url;
    }

    @Override
    public void onOpen(WebSocket webSocket, Request request, Response response) throws IOException {
      mWebSocket = webSocket;
    }

    @Override
    public void onMessage(BufferedSource payload, WebSocket.PayloadType type) throws IOException {
      if (type == WebSocket.PayloadType.TEXT) {
        String temp = payload.readUtf8();
        Log.e(TAG, "into--[onMessage] msg:" + temp);
        payload.close();

        if (TextUtils.equals("refresh", temp) && mHandler != null) {
          mHandler.obtainMessage(Constants.HOT_REFRESH_REFRESH, 0, 0, mUrl).sendToTarget();
        }
      }
    }

    @Override
    public void onPong(Buffer payload) {

    }

    @Override
    public void onClose(int code, String reason) {
      mWebSocket = null;
    }

    @Override
    public void onFailure(IOException e) {
      mWebSocket = null;
    }
  }
}
