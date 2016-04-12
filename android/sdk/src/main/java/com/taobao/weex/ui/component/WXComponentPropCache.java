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

import com.taobao.weex.utils.WXLogUtils;

import java.lang.annotation.Annotation;
import java.lang.reflect.Method;
import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Map;

public class WXComponentPropCache {

  private static Map<Class<? extends WXComponent>, HashMap<String, Method>> sComponentPropSetterMethod =
      new HashMap<>();

  private static Map<Method, Type[]> sMethodGenericParameterTypes = new HashMap<>();

  public static HashMap<String, Method> getMethods(Class<? extends WXComponent> clazz) {

    HashMap<String, Method> methodMap = sComponentPropSetterMethod.get(clazz);
    if (methodMap != null) {
      return methodMap;
    }
    methodMap = new HashMap<>();
    try {
      Annotation[] annotations;
      int annotationsCount;
      Annotation anno;
      for (Method method : clazz.getMethods()) {
        annotations = method.getDeclaredAnnotations();
        annotationsCount = annotations.length;
        for (int i = 0; i < annotationsCount; ++i) {
          anno = annotations[i];
          if (anno != null && anno instanceof WXComponentProp) {
            methodMap.put(((WXComponentProp) anno).name(), method);
          }
        }
      }
    } catch (Exception e) {
      WXLogUtils.e("[WXComponentPropCache] getMethods: " + WXLogUtils.getStackTrace(e));
      return null;
    }
    sComponentPropSetterMethod.put(clazz, methodMap);
    return methodMap;
  }

  public static Type[] getMethodGenericParameterTypes(Method method) {
    Type[] types = sMethodGenericParameterTypes.get(method);
    try {
      if (types == null) {
        types = method.getGenericParameterTypes();
        sMethodGenericParameterTypes.put(method, types);
      }
    } catch (Exception e) {
      WXLogUtils.e("[WXComponentPropCache] getMethodGenericParameterTypes: " + WXLogUtils.getStackTrace(e));
      return null;
    }
    return types;
  }
}
