/**
 * Licensed to the Apache Software Foundation (ASF) under one or more contributor license
 * agreements.  See the NOTICE file distributed with this work for additional information regarding
 * copyright ownership.  The ASF licenses this file to you under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with the License.  You may obtain
 * a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied.  See the License for the specific language governing permissions and limitations
 * under the License.
 */
package com.taobao.weex.adapter;

import android.text.TextUtils;

import com.taobao.weex.common.WXRequest;
import com.taobao.weex.common.WXResponse;
import com.taobao.weex.http.WXHttpManager;
import com.taobao.weex.utils.WXLogUtils;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Set;


public class DefaultWXHttpAdapter implements IWXHttpAdapter {

  @Override
  public void sendRequest(final WXRequest request, final OnHttpListener listener) {
    if (listener != null) {
      listener.onHttpStart();
    }
    WXHttpManager.getInstance().execute(new Runnable() {
      @Override
      public void run() {
        WXResponse response = new WXResponse();
        try {
          HttpURLConnection connection = openConnection(request, listener);
          int responseCode = connection.getResponseCode();
          response.statusCode = String.valueOf(responseCode);
          if (responseCode == 200 || responseCode == 202) {
            response.originalData = readInputStream(connection.getInputStream(), listener).getBytes();
          } else {
            response.errorMsg = readInputStream(connection.getErrorStream(), listener);
          }
          if (listener != null) {
            listener.onHttpFinish(response);
          }
        } catch (IOException e) {
          e.printStackTrace();
        }
      }
    });
  }


  /**
   * Opens an {@link HttpURLConnection} with parameters.
   *
   * @param request
   * @param listener
   * @return an open connection
   * @throws IOException
   */
  private HttpURLConnection openConnection(WXRequest request, OnHttpListener listener) throws IOException {
    URL url = new URL(request.url);
    HttpURLConnection connection = createConnection(url);
    connection.setConnectTimeout(request.timeoutMs);
    connection.setReadTimeout(request.timeoutMs);
    connection.setUseCaches(false);
    connection.setDoInput(true);
    if (!TextUtils.isEmpty(request.method)) {
      connection.setRequestMethod(request.method);
    }
    if (request.paramMap != null) {
      Set<String> keySets = request.paramMap.keySet();
      for (String key : keySets) {
        connection.addRequestProperty(key, request.paramMap.get(key).toString());
      }
    }
    if (request.body != null) {
      if (listener != null) {
        listener.onHttpUploadProgress(0);
      }
      connection.setDoOutput(true);
      connection.setRequestMethod("POST");
      DataOutputStream out = new DataOutputStream(connection.getOutputStream());
      out.write(request.body.getBytes());
      out.close();
      if (listener != null) {
        listener.onHttpUploadProgress(100);
      }
    }
    return connection;
  }

  private String readInputStream(InputStream inputStream, OnHttpListener listener) {
    StringBuilder builder = new StringBuilder();
    try {
      int fileLen = inputStream.available();
      BufferedReader localBufferedReader = new BufferedReader(new InputStreamReader(inputStream));
      char[] data = new char[2048];
      int len = -1;
      while ((len = localBufferedReader.read(data)) > 0) {
        builder.append(data, 0, len);
        if (listener != null && fileLen > 0) {
          listener.onHttpResponseProgress((builder.length() / fileLen) * 100);
        }
      }
      localBufferedReader.close();
      if (inputStream != null) {
        try {
          inputStream.close();
        } catch (IOException e) {
          WXLogUtils.e("DefaultWXHttpAdapter: " + WXLogUtils.getStackTrace(e));
        }
      }
    } catch (IOException e) {
      e.printStackTrace();
    }
    return builder.toString();
  }

  /**
   * Create an {@link HttpURLConnection} for the specified {@code url}.
   */
  protected HttpURLConnection createConnection(URL url) throws IOException {
    return (HttpURLConnection) url.openConnection();
  }


}
