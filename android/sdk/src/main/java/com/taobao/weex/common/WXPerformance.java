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
package com.taobao.weex.common;

import com.taobao.weex.WXEnvironment;

import java.util.Map;

public class WXPerformance {

  public static final String DEFAULT = "default";

  /**
   * Business unit, mandatory. If no business unit can be provided, set the field as default
   */
  public String bizType = "weex";

  /**
   * URL used for rendering view, optional
   */
  public String templateUrl;

  /**
   * Time spent for reading, time unit is ms.
   */
  public double localReadTime;

  /**
   * Name of the page
   */
  public String pageName = DEFAULT;

  /**
   * Size of JavaScript framework, the unit is KB
   */
  public double JSLibSize;

  /**
   * Time of initial JavaScript library
   */
  public long JSLibInitTime;

  /**
   * Size of JavaScript template
   */
  public double JSTemplateSize;

  public long templateLoadTime;

  /**
   * Time used for
   * {@link com.taobao.weex.bridge.WXBridgeManager#createInstance(String, String, Map, String)}
   */
  public double communicateTime;

  /**
   * Time spent when rendering first screen
   */
  public double screenRenderTime;

  /**
   * Time spent, the unit is micro second
   */
  public double totalTime;

  /**
   * load bundle js time, unite ms
   */
  public long networkTime;

  /**
   * Version of JavaScript libraray
   */
  public String JSLibVersion = WXEnvironment.JS_LIB_SDK_VERSION;

  /**
   * Version of Weex SDK
   */
  public String WXSDKVersion = WXEnvironment.WXSDK_VERSION;

  /**
   * The detail message of render failure
   */
  public String renderFailedDetail;

  /**
   * Error code
   */
  public String errCode;

  /**
   * Error message
   */
  public String errMsg;

  @Override
  public String toString() {
    if (WXEnvironment.isApkDebugable()) {
      return "bizType:" + bizType + ",pageName:" + pageName + ",templateLoadTime" + templateLoadTime
             + ",localReadTime:" + localReadTime + ",JSLibInitTime:" + JSLibInitTime
             + ",JSLibSize:" + JSLibSize + ",templateUrl" + templateUrl
             + ",JSTemplateSize:" + JSTemplateSize + ",communicateTime:" + communicateTime
             + ",screenRenderTime:" + screenRenderTime
             + ",totalTime:" + totalTime + ",JSLibVersion:" + JSLibVersion + ",WXSDKVersion:" + WXSDKVersion
             + ",errCode:" + errCode + ",renderFailedDetail:" + renderFailedDetail
             + ",errMsg:" + errMsg;
    }
    return super.toString();
  }
}