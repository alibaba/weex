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
package com.taobao.weex.dom;

import android.text.TextUtils;

import com.taobao.weex.WXEnvironment;
import com.taobao.weex.common.WXException;
import com.taobao.weex.utils.WXLogUtils;

import java.util.HashMap;
import java.util.Map;

public class WXDomRegistry {

  public static Class<? extends WXDomObject> mDefaultClass = WXDomObject.class;
  private static Map<String, Class<? extends WXDomObject>> sDom = new HashMap<>();

  public static boolean registerDomObject(String type, Class<? extends WXDomObject> clazz) throws WXException {
    if (clazz == null || TextUtils.isEmpty(type)) {
      return false;
    }

    if (sDom.containsKey(type)) {
      if (WXEnvironment.isApkDebugable()) {
        throw new WXException("WXDomRegistry had duplicate Dom:" + type);
      } else {
        WXLogUtils.e("WXDomRegistry had duplicate Dom: " + type);
        return false;
      }
    }
    sDom.put(type, clazz);
    return true;
  }

  public static Class<? extends WXDomObject> getDomObjectClass(String type) {
    if (TextUtils.isEmpty(type)) {
      return mDefaultClass;
    }
    Class<? extends WXDomObject> clazz = sDom.get(type);
    return clazz == null ? mDefaultClass : clazz;
  }
}
