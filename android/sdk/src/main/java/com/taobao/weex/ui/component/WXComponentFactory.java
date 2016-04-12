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

import com.taobao.weex.WXEnvironment;
import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.dom.WXDomObject;
import com.taobao.weex.ui.WXComponentRegistry;
import com.taobao.weex.utils.WXLogUtils;

/**
 * Component factory
 */
public class WXComponentFactory {

  public static WXComponent newInstance(WXSDKInstance instance, WXDomObject node, WXVContainer parent, String instanceId) {
    return newInstance(instance, node, parent, instanceId, false);
  }

  public static WXComponent newInstance(WXSDKInstance instance, WXDomObject node, WXVContainer parent, String instanceId, boolean lazy) {
    if (instance == null || node == null || TextUtils.isEmpty(node.type) || TextUtils.isEmpty(instanceId)) {
      return null;
    }

    Class<? extends WXComponent> clazz = WXComponentRegistry.getComponent(node.type);
    if (clazz == null) {
      if (WXEnvironment.isApkDebugable()) {
        StringBuilder tag = new StringBuilder();
        tag.append("WXComponentFactory error type:[");
        tag.append(node.type).append("]").append(" class not found");
        WXLogUtils.e(tag.toString());
      }
      //For compatible reason of JS framework, unregistered type will be treated as container.
      clazz = WXComponentRegistry.getComponent("container");
    }

    try {
      if (WXComponent.class.isAssignableFrom(clazz)) {
        WXComponent component = clazz.getConstructor(WXSDKInstance.class, WXDomObject.class, WXVContainer.class, String.class, boolean.class)
            .newInstance(instance, node, parent, instanceId, lazy);
        return component;
      }
    } catch (Exception e) {
      if (WXEnvironment.isApkDebugable()) {
        StringBuilder builder = new StringBuilder("WXComponentFactory Exception type:[");
        builder.append(node.type).append("] ");
        builder.append(WXLogUtils.getStackTrace(e));
        WXLogUtils.e(builder.toString());
      }
    }

    return null;
  }
}
