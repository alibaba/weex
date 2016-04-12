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

import android.text.TextUtils;

import com.taobao.weex.WXEnvironment;
import com.taobao.weex.utils.WXViewUtils;

import java.util.Map;

/**
 * Created by lixinke on 16/4/6.
 */
public class WXHttpUtil {

  private static String sDefautUA = null;

  public static String assembleUserAgent() {
    if (TextUtils.isEmpty(sDefautUA)) {
      Map<String, String> config = WXEnvironment.getConfig();
      StringBuilder builder = new StringBuilder();
      builder.append(config.get("sysmodel"))
          .append("(Android/")
          .append(config.get("sysversion"))
          .append(")")
          .append(" ")

          .append(TextUtils.isEmpty(config.get("appGroup")) ? "" : config.get("appGroup"))
          .append("(")
          .append(TextUtils.isEmpty("config.get(\"appName\")") ? "" : config.get("appName"))
          .append("/")
          .append(config.get("appversion"))
          .append(")")
          .append(" ")

          .append("Weex/")
          .append(config.get("weexversion"))
          .append(" ")

          .append(TextUtils.isEmpty(config.get("externalUserAgent")) ? "" : config.get("externalUserAgent"))
          .append(TextUtils.isEmpty(config.get("externalUserAgent")) ? "" : " ")

          .append(WXViewUtils.getScreenWidth() + "x" + WXViewUtils.getScreenHeight());
      sDefautUA = builder.toString();
    }
    return sDefautUA;
  }
}
