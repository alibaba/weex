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
package com.taobao.weex.ui.component;

import android.text.TextUtils;
import android.view.View;

import com.alibaba.fastjson.JSONArray;
import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.WXSDKManager;
import com.taobao.weex.dom.WXDomObject;

public class WXA extends WXDiv {

  public WXA(WXSDKInstance instance, WXDomObject dom, WXVContainer parent, String instanceId, boolean isLazy) {
    super(instance, dom, parent, instanceId, isLazy);
    if (mDomObj != null && mDomObj.attr != null && !TextUtils.isEmpty((String) mDomObj.attr.get("href"))) {

      mHost.setOnClickListener(new View.OnClickListener() {
        @Override
        public void onClick(View v) {
          JSONArray array = new JSONArray();
          array.add(mDomObj.attr.get("href"));
          WXSDKManager.getInstance().getWXBridgeManager().callModuleMethod(mInstanceId, "event", "openURL", array);
        }
      });
    }
  }
}
