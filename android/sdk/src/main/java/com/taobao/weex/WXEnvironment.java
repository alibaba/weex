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
package com.taobao.weex;

import android.app.Application;
import android.content.Context;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.telephony.TelephonyManager;

import com.taobao.weex.utils.WXLogUtils;
import com.taobao.weex.utils.WXUtils;

import java.util.HashMap;
import java.util.Map;

public class WXEnvironment {

  public static final String OS = "android";
  public static final String SYS_VERSION = android.os.Build.VERSION.RELEASE;
  public static final String SYS_MODEL = android.os.Build.MODEL;
  /*********************
   * Global config
   ***************************/

  public static String JS_LIB_SDK_VERSION = "v0.12.6";

  public static String WXSDK_VERSION = "1.4.1";
  public static Application sApplication;
  public static final String DEV_Id = getDevId();
  public static int sDeafultWidth = 750;
  public volatile static boolean sSupport = false;
  public volatile static boolean JsFrameworkInit = false;
  /**
   * Debug model
   */
  public static boolean sDebugMode = false;
  public static String sDebugWsUrl = "";
  public static long sJSLibInitTime = 0;
  private static boolean isApkDebug = true;

  private static boolean isPerf = false;

  private static Map<String, String> options = new HashMap<>();

  /**
   * Fetch system information.
   * @return map contains system information.
   */
  public static Map<String, String> getConfig() {
    Map<String, String> configs = new HashMap<>();
    configs.put("os", OS);
    configs.put("appversion", getAppVersionName());
    configs.put("devid", DEV_Id);
    configs.put("sysversion", SYS_VERSION);
    configs.put("sysmodel", SYS_MODEL);
    configs.put("weexversion", String.valueOf(WXSDK_VERSION));
    configs.putAll(options);
    return configs;
  }

  /**
   * Get the version of the current app.
   */
  private static String getAppVersionName() {
    String versionName = "";
    PackageManager manager;
    PackageInfo info = null;
    try {
      manager = sApplication.getPackageManager();
      info = manager.getPackageInfo(sApplication.getPackageName(), 0);
      versionName = info.versionName;
    } catch (Exception e) {
      WXLogUtils.e("WXEnvironment getAppVersionName Exception: " + WXLogUtils.getStackTrace(e));
    }
    return versionName;
  }

  public static void addCustomOptions(String key, String value) {
    options.put(key, value);
  }

  public static boolean isSupport() {
    if (WXEnvironment.isApkDebugable()) {
      WXLogUtils.d("WXEnvironment.sSupport:" + WXEnvironment.sSupport
                   + " WXEnvironment.JsFrameworkInit:" + WXEnvironment.JsFrameworkInit
                   + " !WXUtils.isTabletDevice():" + !WXUtils.isTabletDevice());
    }
    return WXEnvironment.sSupport && WXEnvironment.JsFrameworkInit && !WXUtils.isTabletDevice();
  }

  public static boolean isApkDebugable() {
    if (sApplication == null) {
      return false;
    }

    if (isPerf) {
      return false;
    }

    if (!isApkDebug) {
      return false;
    }
    try {
      ApplicationInfo info = sApplication.getApplicationInfo();
      isApkDebug = (info.flags & ApplicationInfo.FLAG_DEBUGGABLE) != 0;
      return isApkDebug;
    } catch (Exception e) {
      WXLogUtils.e("WXEnvironment isApkDebugable Exception: " + WXLogUtils.getStackTrace(e));
    }
    return false;
  }

  public static boolean isPerf() {
    return isPerf;
  }

  private static String getDevId() {
    return sApplication == null ? "" : ((TelephonyManager) sApplication
        .getSystemService(Context.TELEPHONY_SERVICE)).getDeviceId();
  }

  public static Application getApplication() {
    return sApplication;
  }

  public void initMetrics() {
    if (sApplication == null) {
      return;
    }
  }

}
