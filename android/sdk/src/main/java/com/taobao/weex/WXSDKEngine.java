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

import com.taobao.weex.adapter.IWXUserTrackAdapter;
import com.taobao.weex.appfram.navigator.WXNavigatorModule;
import com.taobao.weex.bridge.WXModuleManager;
import com.taobao.weex.common.WXException;
import com.taobao.weex.common.WXModule;
import com.taobao.weex.dom.WXDomModule;
import com.taobao.weex.dom.WXDomObject;
import com.taobao.weex.dom.WXDomRegistry;
import com.taobao.weex.dom.WXTextDomObject;
import com.taobao.weex.dom.module.WXModalUIModule;
import com.taobao.weex.http.WXStreamModule;
import com.taobao.weex.ui.WXComponentRegistry;
import com.taobao.weex.ui.animation.WXAnimationModule;
import com.taobao.weex.ui.component.WXA;
import com.taobao.weex.ui.component.WXBasicComponentType;
import com.taobao.weex.ui.component.WXComponent;
import com.taobao.weex.ui.component.WXDiv;
import com.taobao.weex.ui.component.WXEmbed;
import com.taobao.weex.ui.component.WXImage;
import com.taobao.weex.ui.component.WXIndicator;
import com.taobao.weex.ui.component.WXInput;
import com.taobao.weex.ui.component.WXScroller;
import com.taobao.weex.ui.component.WXSlider;
import com.taobao.weex.ui.component.WXSwitch;
import com.taobao.weex.ui.component.WXText;
import com.taobao.weex.ui.component.WXVideo;
import com.taobao.weex.ui.component.list.WXCell;
import com.taobao.weex.ui.component.list.WXListComponent;
import com.taobao.weex.utils.WXLogUtils;
import com.taobao.weex.utils.WXSoInstallMgrSdk;

import java.util.Map;

public class WXSDKEngine {

  private static final String V8_SO_NAME = "weexcore";
  private volatile static boolean init;
  private static Object mLock = new Object();

  public static void init(Application application) {
    init(application, null);
  }

  public static void init(Application application, IWXUserTrackAdapter utAdapter) {
    init(application, utAdapter, null);
  }

  public static void init(Application application, IWXUserTrackAdapter utAdapter, String framework) {
    synchronized (mLock) {
      if (init) {
        return;
      }
      init = true;
      WXEnvironment.sApplication = application;
      WXEnvironment.JsFrameworkInit = false;
      WXSoInstallMgrSdk.init(application);
      WXEnvironment.sSupport = WXSoInstallMgrSdk.initSo(V8_SO_NAME, 1, utAdapter);
      if (!WXEnvironment.sSupport) {
        return;
      }

      WXSDKManager.getInstance().initScriptsFramework(framework);
      register();
    }
  }

  private static void register() {
    try {
      registerComponent(WXBasicComponentType.TEXT, WXText.class, false);
      registerComponent(WXBasicComponentType.IMG, WXImage.class, false);
      registerComponent(WXBasicComponentType.DIV, WXDiv.class, false);
      registerComponent(WXBasicComponentType.IMAGE, WXImage.class, false);
      registerComponent(WXBasicComponentType.CONTAINER, WXDiv.class, false);
      registerComponent(WXBasicComponentType.SCROLLER, WXScroller.class, false);
      registerComponent(WXBasicComponentType.SLIDER, WXSlider.class, true);

      registerComponent(WXBasicComponentType.LIST, WXListComponent.class, false);
      registerComponent(WXBasicComponentType.CELL, WXCell.class, true);
      registerComponent(WXBasicComponentType.HEADER, WXDiv.class, false);
      registerComponent(WXBasicComponentType.FOOTER, WXDiv.class, false);
      registerComponent(WXBasicComponentType.INDICATOR, WXIndicator.class, true);
      registerComponent(WXBasicComponentType.VIDEO, WXVideo.class, false);
      registerComponent(WXBasicComponentType.INPUT, WXInput.class, false);
      registerComponent(WXBasicComponentType.SWITCH, WXSwitch.class, false);
      registerComponent(WXBasicComponentType.A, WXA.class, false);
      registerComponent(WXBasicComponentType.EMBED, WXEmbed.class, true);

      WXModuleManager.registerModule("dom", WXDomModule.class, true);
      WXModuleManager.registerModule("modal", WXModalUIModule.class, true);
      WXModuleManager.registerModule("instanceWrap", WXInstanceWrap.class, true);
      WXModuleManager.registerModule("animation", WXAnimationModule.class, true);
      WXModuleManager.registerModule("navigator", WXNavigatorModule.class, false);
      WXSDKEngine.registerModule("stream", WXStreamModule.class);

      registerDomObject(WXBasicComponentType.TEXT, WXTextDomObject.class);
      registerDomObject(WXBasicComponentType.INPUT, WXTextDomObject.class);
    } catch (WXException e) {
      WXLogUtils.e("[WXSDKEngine] register:" + WXLogUtils.getStackTrace(e));
    }
  }

  /**
   *
   * Register component. The registration is singleton in {@link WXSDKEngine} level
   * @param type name of component. Same as type filed in the JS.
   * @param clazz the class of the {@link WXComponent} to be registered.
   * @param appendTree true for appendTree flag
   * @return true for registration success, false for otherwise.
   * @throws WXException Throws exception if type conflicts.
   */
  public static boolean registerComponent(String type, Class<? extends WXComponent> clazz, boolean appendTree) throws WXException {
    return WXComponentRegistry.registerComponent(type, clazz, appendTree);
  }

  /**
   * Register module. This is a wrapper method for
   * {@link WXModuleManager#registerModule(String, Class)}. The module register here only need to
   * be singleton in {@link WXSDKInstance} level.
   * @param moduleName  module name
   * @param moduleClass module to be registered.
   * @return true for registration success, false for otherwise.
   * @see {@link WXModuleManager#registerModule(String, Class, boolean)}
   */
  public static boolean registerModule(String moduleName, Class<? extends WXModule> moduleClass) throws WXException {
    return WXModuleManager.registerModule(moduleName, moduleClass);
  }

  public static boolean registerDomObject(String type, Class<? extends WXDomObject> clazz) throws WXException {
    return WXDomRegistry.registerDomObject(type, clazz);
  }

  public static void callback(String instanceId, String funcId, Map<String, Object> data) {
    WXSDKManager.getInstance().callback(instanceId, funcId, data);
  }

  /**
   * Model switch, only applicable for developer model
   * @param debug
   */
  public static void restartBridge(boolean debug) {
    WXEnvironment.sDebugMode = debug;
    WXSDKManager.getInstance().restartBridge();
  }

  public static boolean registerComponent(String type, Class<? extends WXComponent> clazz) throws WXException {
    return WXComponentRegistry.registerComponent(type, clazz, true);
  }

  public static boolean registerComponent(Map<String, String> componentInfo, Class<? extends WXComponent> clazz) throws WXException {
    return WXComponentRegistry.registerComponent(componentInfo, clazz);
  }

  public static void addCustomOptions(String key, String value) {
    WXEnvironment.addCustomOptions(key, value);
  }
}
