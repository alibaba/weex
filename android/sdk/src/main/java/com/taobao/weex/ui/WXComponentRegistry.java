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
package com.taobao.weex.ui;

import android.text.TextUtils;

import com.taobao.weex.WXEnvironment;
import com.taobao.weex.WXSDKManager;
import com.taobao.weex.common.WXException;
import com.taobao.weex.ui.component.WXComponent;
import com.taobao.weex.ui.component.WXComponentPropCache;
import com.taobao.weex.utils.WXLogUtils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/**
 * All components must be registered within this class before used.
 */
public class WXComponentRegistry {

  private static Map<String, Class<? extends WXComponent>> sComponent = new HashMap<>();

  public static boolean registerComponent(String type, Class<? extends WXComponent> clazz, boolean appendTree) throws WXException {
    if (clazz == null || TextUtils.isEmpty(type)) {
      return false;
    }

    if (sComponent.containsKey(type)) {
      if (WXEnvironment.isApkDebugable()) {
        throw new WXException("Exist duplicate component :" + type);
      } else {
        WXLogUtils.e("WXComponentRegistry Exist duplicate component: " + type);
        return false;
      }
    }

    WXComponentPropCache.getMethods(clazz);

    Map<String, String> componentInfo = new HashMap<>();
    componentInfo.put("type", type);
    if (appendTree) {
      componentInfo.put("append", "tree");
    }

    return registerNativeComponent(type, clazz) && registerJSComponent(componentInfo);
  }

  public static boolean registerNativeComponent(String type, Class<? extends WXComponent> clazz) throws WXException {
    sComponent.put(type, clazz);
    return true;
  }

  private static boolean registerJSComponent(Map<String, String> componentInfo) throws WXException {
    ArrayList<Map<String, String>> coms = new ArrayList<>();
    coms.add(componentInfo);
    WXSDKManager.getInstance().registerComponents(coms);
    return true;
  }

  public static boolean registerComponent(Map<String, String> componentInfo, Class<? extends WXComponent> clazz) throws WXException {
    if (componentInfo == null || clazz == null) {
      return false;
    }

    String type = componentInfo.get("style");
    if (type == null) {
      return false;
    }
    if (sComponent.containsKey(type)) {
      if (WXEnvironment.isApkDebugable()) {
        throw new WXException("Exist duplicate component:" + type);
      } else {
        WXLogUtils.e("WXComponentRegistry Exist duplicate component: " + type);
        return false;
      }
    }

    WXComponentPropCache.getMethods(clazz);

    return registerNativeComponent(type, clazz) && registerJSComponent(componentInfo);
  }

  public static Class<? extends WXComponent> getComponent(String type) {
    return sComponent.get(type);
  }
}
