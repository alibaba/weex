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
package com.taobao.weex.bridge;

import com.taobao.weex.common.IWXBridge;

/**
 * Communication interface for Java code and JavaScript code.
 */
class WXBridge implements IWXBridge {

  private static final String TAG = "WXBridge";

  /**
   * Init JSFrameWork
   *
   * @param framework assets/main.js
   */
  public native int initFramework(String framework, WXParams params);

  /**
   * Execute JavaScript function
   *
   * @param instanceId
   * @param namespace  default global
   * @param function   function string name
   * @param args       WXJSObject array
   */
  public native int execJS(String instanceId, String namespace, String function, WXJSObject[] args);

  /**
   * JavaScript uses this methods to call Android code
   *
   * @param instanceId
   * @param tasks
   * @param callback
   */
  public void callNative(String instanceId, String tasks, String callback) {
    WXBridgeManager.getInstance().callNative(instanceId, tasks, callback);
  }

  /**
   * Report JavaScript error.
   *
   * @param instanceId
   * @param func       exception function
   * @throws String exception
   */
  public void reportJSException(String instanceId, String func, String exception) {
    WXBridgeManager.getInstance().reportJSException(instanceId, func, exception);
  }

  public void setTimeoutNative(String callbackId, String time) {
    WXBridgeManager.getInstance().setTimeout(callbackId, time);
  }
}
