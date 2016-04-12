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
package com.taobao.weex.http;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.taobao.weex.WXSDKManager;
import com.taobao.weex.adapter.IWXHttpAdapter;
import com.taobao.weex.bridge.WXBridgeManager;
import com.taobao.weex.common.WXModule;
import com.taobao.weex.common.WXModuleAnno;
import com.taobao.weex.common.WXRequest;
import com.taobao.weex.common.WXResponse;
import com.taobao.weex.utils.WXLogUtils;

import java.util.HashMap;

public class WXStreamModule extends WXModule {

  /**
   * send HTTP request
   *
   * @param params   {method:POST/GET,url:http://xxx,header:{key:value},
   *                 body:{key:value}}
   * @param callback formate：handler(err, response)
   */
  @WXModuleAnno
  public void sendHttp(String params, String callback) {

    JSONObject paramsObj = JSON.parseObject(params);
    String method = paramsObj.getString("method");
    String url = paramsObj.getString("url");
    JSONObject header = paramsObj.getJSONObject("header");
    final String body = paramsObj.getString("body");

    WXRequest wxRequest = new WXRequest();
    wxRequest.method = method;
    wxRequest.url = url;
    wxRequest.body = body;
    if (wxRequest.paramMap == null) {
      wxRequest.paramMap = new HashMap<String, Object>();
    }
    if (header != null) {
      for (String key : header.keySet()) {
        wxRequest.paramMap.put(key, header.get(key));
      }
    }

    if (mWXSDKInstance != null && mWXSDKInstance.getWXHttpAdapter() != null) {
      mWXSDKInstance.getWXHttpAdapter().sendRequest(wxRequest, new StreamHttpListener(mWXSDKInstance.getInstanceId(), callback));
    }
  }

  private class StreamHttpListener implements IWXHttpAdapter.OnHttpListener {

    private String mInstanceId;
    private String mCallback;

    private StreamHttpListener(String instanceId, String callbak) {
      mInstanceId = instanceId;
      mCallback = callbak;
    }


    @Override
    public void onHttpStart() {

    }

    @Override
    public void onHttpUploadProgress(int uploadProgress) {

    }

    @Override
    public void onHttpResponseProgress(int responseProgress) {

    }

    @Override
    public void onHttpFinish(final WXResponse response) {
      WXSDKManager.getInstance().postOnUiThread(new Runnable() {
        @Override
        public void run() {
          WXBridgeManager.getInstance().callback(mInstanceId, mCallback, (response == null || response.originalData == null) ? "{}" : new String(response.originalData));
        }
      },0);
      WXLogUtils.e("WXStreamModule", new String(response.originalData));
    }
  }

}
