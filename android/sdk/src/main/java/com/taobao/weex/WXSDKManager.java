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

import android.os.Looper;
import android.text.TextUtils;

import com.taobao.weex.bridge.WXBridgeManager;
import com.taobao.weex.bridge.WXModuleManager;
import com.taobao.weex.common.WXRefreshData;
import com.taobao.weex.common.WXRuntimeException;
import com.taobao.weex.dom.WXDomManager;
import com.taobao.weex.ui.WXRenderManager;
import com.taobao.weex.utils.WXUtils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Manger class for weex context.
 */
public class WXSDKManager {

  private static WXSDKManager sManager;
  private static AtomicInteger sInstanceId = new AtomicInteger(0);
  private final WXDomManager mWXDomManager;
  private WXBridgeManager mBridgeManager;
  private WXRenderManager mWXRenderManager;

  private WXSDKManager() {
    mWXRenderManager = new WXRenderManager();
    mWXDomManager = new WXDomManager(mWXRenderManager);
    mBridgeManager = WXBridgeManager.getInstance();
  }

  public static WXSDKManager getInstance() {
    if (sManager == null) {
      sManager = new WXSDKManager();
    }
    return sManager;
  }

  public void restartBridge() {
    mBridgeManager.restart();
  }

  public WXDomManager getWXDomManager() {
    return mWXDomManager;
  }

  public WXBridgeManager getWXBridgeManager() {
    return mBridgeManager;
  }

  public WXRenderManager getWXRenderManager() {
    return mWXRenderManager;
  }

  public WXSDKInstance getSDKInstance(String instanceId) {
    return mWXRenderManager.getWXSDKInstance(instanceId);
  }

  public void postOnUiThread(Runnable runnable, long delayMillis) {
    mWXRenderManager.postOnUiThread(runnable, delayMillis);
  }

  public void destroy() {
    if (mWXDomManager != null) {
      mWXDomManager.destroy();
    }
  }

  public void callback(String instanceId, String funcId, Map<String, Object> data) {
    mBridgeManager.callback(instanceId, funcId, data);
  }

  public void initScriptsFramework(String framework) {
    mBridgeManager.initScriptsFramework(framework);
  }

  public void registerComponents(ArrayList<Map<String, String>> components) {
    mBridgeManager.registerComponents(components);
  }

  public void registerModules(Map<String, Object> modules) {
    mBridgeManager.registerModules(modules);
  }

  public void fireEvent(final String instanceId, String ref, String type) {
    fireEvent(instanceId, ref, type, new HashMap<String, Object>());
  }

  /**
   * FireEvent back to JS
   */
  public void fireEvent(final String instanceId, String ref, String type, Map<String, Object> params) {
    if (WXEnvironment.isApkDebugable() && Looper.getMainLooper().getThread().getId() != Thread.currentThread().getId()) {
      throw new WXRuntimeException("[WXSDKManager]  fireEvent error");
    }
    mBridgeManager.fireEvent(instanceId, ref, type, params);
  }

  void createInstance(WXSDKInstance instance, String code, Map<String, Object> options, String jsonInitData) {
    mWXRenderManager.createInstance(instance, instance.getInstanceId());
    mBridgeManager.createInstance(instance.getInstanceId(), code, options, jsonInitData);
  }

  void refreshInstance(String instanceId, WXRefreshData jsonData) {
    mBridgeManager.refreshInstance(instanceId, jsonData);
  }

  void destroyInstance(String instanceId) {
    if (TextUtils.isEmpty(instanceId)) {
      return;
    }
    if (!WXUtils.isUiThread()) {
      throw new WXRuntimeException("[WXSDKManager] destroyInstance error");
    }
    mWXRenderManager.removeRenderStatement(instanceId);
    mWXDomManager.removeDomStatement(instanceId);
    mBridgeManager.destroyInstance(instanceId);
    WXModuleManager.destroyInstanceModules(instanceId);
  }

  String generateInstanceId() {
    return String.valueOf(sInstanceId.incrementAndGet());
  }
}
