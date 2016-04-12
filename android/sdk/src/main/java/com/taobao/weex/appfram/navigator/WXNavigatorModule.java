/**
 * Licensed to the Apache Software Foundation (ASF) under one or more contributor license
 * agreements.  See the NOTICE file distributed with this work for additional information regarding
 * copyright ownership.  The ASF licenses this file to you under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with the License.  You may obtain
 * a copy of the License at http://www.apache.org/licenses/LICENSE-2.0 Unless required by applicable
 * law or agreed to in writing, software distributed under the License is distributed on an "AS IS"
 * BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  See the License
 * for the specific language governing permissions and limitations under the License.
 */
package com.taobao.weex.appfram.navigator;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.text.TextUtils;

import com.alibaba.fastjson.JSONObject;
import com.taobao.weex.common.WXModule;
import com.taobao.weex.common.WXModuleAnno;
import com.taobao.weex.utils.WXLogUtils;

public class WXNavigatorModule extends WXModule {

  private final static String TAG = "Navigator";
  private final static String WEEX_NAVIGATOR_PUSH =
      "com.taobao.android.intent.category.Navigator.push";
  private final static String URL = "url";

  @WXModuleAnno
  public void push(String param) {
    try {
      JSONObject jsonObject = JSONObject.parseObject(param);
      String url = jsonObject.get(URL).toString();
      if (!TextUtils.isEmpty(url)) {
        Uri rawUri = Uri.parse(url);
        String scheme = rawUri.getScheme();
        Uri.Builder builder = rawUri.buildUpon();
        if (!TextUtils.equals(scheme, "http") && !TextUtils.equals(scheme, "https")) {
          builder.scheme("http");
        }
        Intent intent = new Intent(Intent.ACTION_VIEW, builder.build());
        intent.addCategory(WEEX_NAVIGATOR_PUSH);
        intent.putExtra(NavigatorActivity.INSTANCE_ID,mWXSDKInstance.getInstanceId());
        mWXSDKInstance.getContext().startActivity(intent);
      }
    } catch (RuntimeException e) {
      WXLogUtils.e(TAG, WXLogUtils.getStackTrace(e));
    }
  }

  @WXModuleAnno
  public void pop(String param) {
    if(mWXSDKInstance.getContext() instanceof Activity){
      ((Activity) mWXSDKInstance.getContext()).finish();
    }
  }

}
