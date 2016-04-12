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

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.taobao.weex.WXEnvironment;
import com.taobao.weex.WXSDKManager;
import com.taobao.weex.common.IWXObject;
import com.taobao.weex.common.WXException;
import com.taobao.weex.common.WXModule;
import com.taobao.weex.common.WXModuleAnno;
import com.taobao.weex.dom.WXDomModule;
import com.taobao.weex.utils.WXLogUtils;

import java.lang.annotation.Annotation;
import java.lang.reflect.Method;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;

/**
 * Manager class for weex module. There are two types of modules in weex, one is instance-level module,
 * the other is global-level module. Instance-level module will be created every time an instance
 * is created, while global-level module will be singleton in {@link com.taobao.weex.WXSDKEngine}.
 */
public class WXModuleManager {

  /**
   * module class object dictionary
   */
  private static Map<String, Class<? extends WXModule>> sModuleClazzMap = new HashMap<>();
  private static Map<String, WXModule> sGlobalModuleMap = new HashMap<>();
  private static Map<WXModule, HashMap<String, Method>> sGlobalModuleMethodMap = new HashMap<>();

  /**
   * module object dictionary
   * K : instanceId, V : Modules
   */
  private static Map<String, HashMap<String, WXModule>> sInstanceModuleMap = new HashMap<>();

  /**
   * module object method dictionary
   * K : module object, V : Method list
   */
  private static Map<WXModule, HashMap<String, Method>> sInstanceModuleMethodMap = new HashMap<>();

  public static boolean registerModule(String moduleName, Class<? extends WXModule> moduleClass) throws WXException {
    return registerModule(moduleName, moduleClass, false);
  }

  /**
   * Register module to JavaScript and Android
   */
  public static boolean registerModule(String moduleName, Class<? extends WXModule> moduleClass, boolean global) throws WXException {
    if (moduleName == null || moduleClass == null) {
      return false;
    }

    if (sModuleClazzMap.containsKey(moduleName)) {
      if (WXEnvironment.isApkDebugable()) {
        throw new WXException("Duplicate the Module name:" + moduleName);
      } else {
        WXLogUtils.e("WXComponentRegistry Duplicate the Module name: " + moduleName);
        return false;
      }
    }

    if (WXEnvironment.isApkDebugable()) {
      try {
        moduleClass.getConstructor();
      } catch (NoSuchMethodException e) {
        throw new WXException("Module must have a default constructor");
      }
    }

    if (global) {
      try {
        WXModule wxModule = moduleClass.getConstructor().newInstance();
        sGlobalModuleMap.put(moduleName, wxModule);
        HashMap<String, Method> methodsMap = getModuleMethods2Map(moduleClass);
        sGlobalModuleMethodMap.put(wxModule, methodsMap);
      } catch (Exception e) {
        WXLogUtils.e(moduleClass + " class must have a default constructor without params. " + WXLogUtils.getStackTrace(e));
        return false;
      }
    }

    return registerNativeModule(moduleName, moduleClass) && registerJSModule(moduleName, moduleClass);
  }

  private static <T extends WXModule> HashMap<String, Method> getModuleMethods2Map(Class<T> moduleClass) {
    HashMap<String, Method> moduleMethods = new HashMap<>();
    try {
      for (Method method : moduleClass.getMethods()) {
        // iterates all the annotations available in the method
        for (Annotation anno : method.getDeclaredAnnotations()) {
          if (anno != null && anno instanceof WXModuleAnno && ((WXModuleAnno) anno).moduleMethod()) {
            moduleMethods.put(method.getName(), method);
          }
        }
      }
    } catch (Throwable e) {
      WXLogUtils.e("[WXModuleManager] getModuleMethods2Map:" + e.getCause());
    }
    return moduleMethods;
  }

  static <T extends WXModule> boolean registerNativeModule(String moduleName, Class<T> moduleClass) throws WXException {
    if (moduleClass == null) {
      return false;
    }

    sModuleClazzMap.put(moduleName, moduleClass);
    return true;
  }

  static <T extends WXModule> boolean registerJSModule(String moduleName, Class<T> moduleClass) {
    Map<String, Object> modules = new HashMap<String, Object>();
    modules.put(moduleName, getModuleMethods2Array(moduleClass));
    WXSDKManager.getInstance().registerModules(modules);
    return true;
  }

  private static <T extends WXModule> ArrayList<String> getModuleMethods2Array(Class<T> moduleClass) {
    ArrayList<String> methods = new ArrayList<>();
    try {
      for (Method method : moduleClass.getMethods()) {
        // iterates all the annotations available in the method
        for (Annotation anno : method.getDeclaredAnnotations()) {
          if (anno != null && anno instanceof WXModuleAnno && ((WXModuleAnno) anno).moduleMethod()) {
            methods.add(method.getName());
          }
        }
      }
    } catch (Throwable e) {
      WXLogUtils.e("[WXModuleManager] getModuleMethods2Array:" + e.getStackTrace());
    }
    return methods;
  }

  static boolean callModuleMethod(String instanceId, String moduleStr, String methodStr, JSONArray args) {
    final WXModule wxModule = findModule(instanceId, moduleStr, methodStr);
    if (wxModule == null) {
      return false;
    }
    wxModule.mWXSDKInstance = WXSDKManager.getInstance().getSDKInstance(instanceId);

    HashMap<String, Method> methodsMap = sGlobalModuleMethodMap.get(wxModule);
    methodsMap = methodsMap == null ? sInstanceModuleMethodMap.get(wxModule) : methodsMap;
    if (methodsMap == null) {
      WXLogUtils.e("[WXModuleManager] callModuleMethod methodsMap is null.");
      return false;
    }
    final Method moduleMethod = methodsMap.get(methodStr);
    try {
      Type[] paramClazzs = moduleMethod.getGenericParameterTypes();
      final Object[] params = new Object[paramClazzs.length];
      Object value;
      Type paramClazz;
      for (int i = 0; i < paramClazzs.length; i++) {
        paramClazz = paramClazzs[i];
        value = args.get(i);

        if (paramClazz == JSONObject.class) {
          params[i] = value;
        } else {
          String sValue;
          if (value instanceof String) {
            sValue = (String) value;
          } else {
            sValue = JSON.toJSONString(value);
          }

          if (paramClazz == int.class) {
            params[i] = Integer.parseInt(sValue);
          } else if (paramClazz == String.class) {
            params[i] = sValue;
          } else if (paramClazz == long.class) {
            params[i] = Long.parseLong(sValue);
          } else if (paramClazz == double.class) {
            params[i] = Double.parseDouble(sValue);
          } else if (paramClazz == float.class) {
            params[i] = Float.parseFloat(sValue);
          } else if (ParameterizedType.class.isAssignableFrom(paramClazz.getClass())) {
            params[i] = JSON.parseObject(sValue, paramClazz);
          } else if (IWXObject.class.isAssignableFrom(paramClazz.getClass())) {
            params[i] = JSON.parseObject(sValue, paramClazz);
          } else {
            params[i] = JSON.parseObject(sValue, paramClazz);
          }
        }
      }
      WXModuleAnno anno = moduleMethod.getAnnotation(WXModuleAnno.class);
      if (anno.runOnUIThread()) {
        WXSDKManager.getInstance().postOnUiThread(new Runnable() {
          @Override
          public void run() {
            try {
              moduleMethod.invoke(wxModule, params);
            } catch (Exception e) {
              WXLogUtils.e("callModuleMethod >>> invoke module:" + WXLogUtils.getStackTrace(e));
            }
          }
        }, 0);
      } else {
        moduleMethod.invoke(wxModule, params);
      }
    } catch (Exception e) {
      WXLogUtils.e("callModuleMethod >>> invoke module:" + moduleStr + ", method:" + methodStr + " failed. " + WXLogUtils.getStackTrace(e));
      return false;
    } finally {
      if (wxModule instanceof WXDomModule) {
        wxModule.mWXSDKInstance = null;
      }
    }
    return true;
  }

  private static WXModule findModule(String instanceId, String moduleStr, String methodStr) {
    // find WXModule
    WXModule wxModule = sGlobalModuleMap.get(moduleStr);
    Class<? extends WXModule> moduleClass = sModuleClazzMap.get(moduleStr);
    if (wxModule == null) {
      HashMap<String, WXModule> moduleMap = sInstanceModuleMap.get(instanceId);
      if (moduleMap == null) {
        moduleMap = new HashMap<>();
        sInstanceModuleMap.put(instanceId, moduleMap);
      }
      // if cannot find the Module, create a new Module and save it
      wxModule = moduleMap.get(moduleStr);
      if (wxModule == null) {
        try {
          wxModule = moduleClass.getConstructor().newInstance();
        } catch (Exception e) {
          WXLogUtils.e(moduleClass + " class must have a default constructor without params. " + WXLogUtils.getStackTrace(e));
          return null;
        }
        moduleMap.put(moduleStr, wxModule);
        // set instance
        wxModule.mWXSDKInstance = WXSDKManager.getInstance().getSDKInstance(instanceId);
      }
    }

    // find module method
    HashMap<String, Method> methodsMap = sGlobalModuleMethodMap.get(wxModule);
    methodsMap = methodsMap == null ? sInstanceModuleMethodMap.get(wxModule) : methodsMap;
    if (methodsMap == null) {
      methodsMap = getModuleMethods2Map(moduleClass);
      sInstanceModuleMethodMap.put(wxModule, methodsMap);
    }
    return wxModule;
  }

  public static void destroyInstanceModules(String instanceId) {
    HashMap<String, WXModule> moduleMap = sInstanceModuleMap.remove(instanceId);
    if (moduleMap == null || moduleMap.size() < 1) {
      return;
    }
    Iterator<Entry<String, WXModule>> iterator = moduleMap.entrySet().iterator();
    Entry<String, WXModule> entry;
    while (iterator.hasNext()) {
      entry = iterator.next();
      sInstanceModuleMethodMap.remove(entry.getValue());
    }
  }

}
