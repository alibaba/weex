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

import android.os.Handler;
import android.os.Handler.Callback;
import android.os.Looper;
import android.os.Message;
import android.text.TextUtils;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.taobao.weex.WXEnvironment;
import com.taobao.weex.WXRenderErrorCode;
import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.WXSDKManager;
import com.taobao.weex.common.IWXBridge;
import com.taobao.weex.common.WXErrorCode;
import com.taobao.weex.common.WXJSBridgeMsgType;
import com.taobao.weex.common.WXRefreshData;
import com.taobao.weex.common.WXRuntimeException;
import com.taobao.weex.common.WXThread;
import com.taobao.weex.utils.WXConst;
import com.taobao.weex.utils.WXFileUtils;
import com.taobao.weex.utils.WXHack;
import com.taobao.weex.utils.WXHack.HackDeclaration.HackAssertionException;
import com.taobao.weex.utils.WXHack.HackedClass;
import com.taobao.weex.utils.WXJsonUtils;
import com.taobao.weex.utils.WXLogUtils;
import com.taobao.weex.utils.WXViewUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Queue;
import java.util.Stack;
import java.util.concurrent.LinkedBlockingQueue;

/**
 * Manager class for communication between JavaScript and Android.
 * <ol>
 *   <li>
 *     Handle Android to JavaScript call, can be one of the following
 *     <ul>
 *       <li>{@link #createInstance(String, String, Map, String)}</li>
 *       <li>{@link #destroyInstance(String)}</li>
 *       <li>{@link #refreshInstance(String, WXRefreshData)}</li>
 *       <li>{@link #registerModules(Map)}</li>
 *       <li>{@link #registerComponents(ArrayList)}</li>
 *       <li>{@link #invokeCallJSBatch(Message)}</li>
 *     </ul>
 *   </li>
 *   <li>
 *     Handle JavaScript to Android call
 *   </li>
 *   <li>
 *     Handle next tick of message.
 *   </li>
 * </ol>
 */
public class WXBridgeManager implements Callback {

  public static final String METHOD_CREATE_INSTANCE = "createInstance";
  public static final String METHOD_DESTROY_INSTANCE = "destroyInstance";
  public static final String METHOD_CALL_JS = "callJS";
  public static final String METHOD_REGISTER_MODULES = "registerModules";
  public static final String METHOD_REGISTER_COMPONENTS = "registerComponents";
  public static final String METHOD_FIRE_EVENT = "fireEvent";
  public static final String METHOD_CALLBACK = "callback";
  public static final String METHOD_REFRESH_INSTANCE = "refreshInstance";
  private static final String UNDEFINED = "-1";
  private static WXBridgeManager mBridgeManager;
  /**
   * next tick tasks, can set priority
   */
  private WXHashMap<String, ArrayList<WXHashMap<String, Object>>> mNextTickTasks = new WXHashMap<>();

  /**
   * UI task (callback&&fire event)
   */
  private Queue<WXHashMap<String, Object>> mUITasks = new LinkedBlockingQueue<>();
  /**
   * JSThread
   */
  private WXThread mJSThread;
  private Handler mJSHandler;
  private IWXBridge mWXBridge;

  private boolean mMock = false;
  /**
   * Whether JS Framework(main.js) has been initialized.
   */
  private boolean mInit;

  private List<ArrayList<Map<String, String>>> mRegisterComponentFailList = new ArrayList<>(8);
  private List<Map<String, Object>> mRegisterModuleFailList = new ArrayList<>(8);

  private String mDestroyedInstanceId = "-1";

  private StringBuilder mLodBuilder = new StringBuilder(500);

  private WXBridgeManager() {
    if (WXEnvironment.sDebugMode) {
      HackedClass<Object> waBridge;
      try {
        waBridge = WXHack.into("com.taobao.weex.bridge.WXWebsocketBridge");
        mWXBridge = (IWXBridge) waBridge.constructor(
            WXBridgeManager.class)
            .getInstance(WXBridgeManager.this);
      } catch (HackAssertionException e) {
        e.printStackTrace();
      }
    } else {
      mWXBridge = new WXBridge();
    }
    mJSThread = new WXThread("JSBridgeThread", this);
    mJSHandler = mJSThread.getHandler();
  }

  public static WXBridgeManager getInstance() {
    if (mBridgeManager == null) {
      synchronized (WXBridgeManager.class) {
        if (mBridgeManager == null) {
          mBridgeManager = new WXBridgeManager();
        }
      }
    }
    return mBridgeManager;
  }

  public boolean callModuleMethod(String instanceId, String moduleStr, String methodStr, JSONArray args) {
    return WXModuleManager.callModuleMethod(instanceId, moduleStr, methodStr, args);
  }

  /**
   * Get Handler for JS Thread.
   * Be <storng> careful</storng> with this method, inappropriate using of JS handler may cause
   * significant <strong>performance penalty</strong>.
   * @return Handler the handler in JS thread.
   */
  public Handler getJSHandler() {
    return mJSHandler;
  }

  /**
   * Model switch. For now, debug model and release model are supported
   */
  public void restart() {
    mInit = false;
    if (WXEnvironment.sDebugMode) {
      HackedClass<Object> waBridge;
      try {
        waBridge = WXHack.into("com.taobao.weex.bridge.WXWebsocketBridge");
        mWXBridge = (IWXBridge) waBridge.constructor(
            WXBridgeManager.class)
            .getInstance(WXBridgeManager.this);
      } catch (HackAssertionException e) {
        e.printStackTrace();
      }
    } else {
      mWXBridge = new WXBridge();
    }
  }

  /**
   * Set current Instance
   * @param instanceId {@link WXSDKInstance#mInstanceId}
   */
  public synchronized void setStackTopInstance(final String instanceId) {
    post(new Runnable() {

      @Override
      public void run() {
        mNextTickTasks.setStackTopInstance(instanceId);
      }
    }, instanceId);
  }

  private void post(Runnable r, Object token) {
    if (mJSHandler == null) {
      return;
    }

    Message m = Message.obtain(mJSHandler, r);
    m.obj = token;
    m.sendToTarget();
  }

  void setTimeout(String callbackId, String time) {
    Message message = Message.obtain();
    message.what = WXJSBridgeMsgType.SET_TIMEOUT;
    TimerInfo timerInfo = new TimerInfo();
    timerInfo.callbackId = callbackId;
    timerInfo.time = (long) Float.parseFloat(time);
    message.obj = timerInfo;

    mJSHandler.sendMessageDelayed(message, timerInfo.time);
  }

  /**
   * Dispatch the native task to be executed.
   * @param instanceId {@link WXSDKInstance#mInstanceId}
   * @param tasks tasks to be executed
   * @param callback next tick id
   */
  void callNative(String instanceId, String tasks, String callback) {
    if (TextUtils.isEmpty(tasks)) {
      if (WXEnvironment.isApkDebugable()) {
        WXLogUtils.e("[WXBridgeManager] callNative: call Native tasks is null");
      }
      return;
    }

    if (WXEnvironment.isApkDebugable()) {
      mLodBuilder.append("[WXBridgeManager] callNative >>>> instanceId:").append(instanceId)
          .append(", tasks:").append(tasks).append(", callback:").append(callback);
      WXLogUtils.d(mLodBuilder.substring(0));
      mLodBuilder.setLength(0);
    }

    JSONArray array = JSON.parseArray(tasks);
    int size = array.size();
    if (size > 0) {
      try {
        JSONObject task;
        for (int i = 0; i < size; ++i) {
          task = (JSONObject) array.get(i);
          if (task != null && WXSDKManager.getInstance().getSDKInstance(instanceId) != null) {
            WXModuleManager.callModuleMethod(instanceId, (String) task.get("module"), (String) task.get("method"), (JSONArray) task.get("args"));
          }
        }
      } catch (Exception e) {
        WXLogUtils.e("[WXBridgeManager] callNative exception: " + WXLogUtils.getStackTrace(e));
      }
    }

    if (UNDEFINED.equals(callback)
        || mDestroyedInstanceId.equals(instanceId)) {
      return;
    }
    // get next tick
    getNextTick(instanceId, callback);
  }

  private void getNextTick(final String instanceId, final String callback) {
    addNextTickTask(instanceId, callback, "{}");
    sendMessage(instanceId, WXJSBridgeMsgType.CALL_JS_BATCH);
  }

  private void addNextTickTask(String instanceId, Object... args) {
    if (args == null || args.length == 0) {
      return;
    }

    ArrayList<Object> argsList = new ArrayList<>();
    for (Object arg : args) {
      argsList.add(arg);
    }

    WXHashMap<String, Object> task = new WXHashMap<>();
    task.put(WXConst.KEY_METHOD, METHOD_CALLBACK);
    task.put(WXConst.KEY_ARGS, args);

    if (mNextTickTasks.get(instanceId) == null) {
      ArrayList<WXHashMap<String, Object>> list = new ArrayList<WXHashMap<String, Object>>();
      list.add(task);
      mNextTickTasks.put(instanceId, list);
    } else {
      mNextTickTasks.get(instanceId).add(task);
    }

    //        mNextTickTasks.put(instanceId, task);
  }

  private void sendMessage(String instanceId, int what) {
    Message msg = Message.obtain(mJSHandler);
    msg.obj = instanceId;
    msg.what = what;
    msg.sendToTarget();
  }

  /**
   * Initialize JavaScript framework
   * @param framework String representation of the framework to be init.
   */
  public synchronized void initScriptsFramework(String framework) {
    if (!WXEnvironment.sSupport) {
      return;
    }

    Message msg = mJSHandler.obtainMessage();
    msg.obj = framework;
    msg.what = WXJSBridgeMsgType.INIT_FRAMEWORK;
    msg.setTarget(mJSHandler);
    msg.sendToTarget();
  }

  /**
   * Notify the JavaScript about the event happened on Android
   */
  public void fireEvent(final String instanceId, final String ref,
                        final String type, final Map<String, Object> data) {
    if (TextUtils.isEmpty(instanceId) || TextUtils.isEmpty(ref)
        || TextUtils.isEmpty(type) || mJSHandler == null) {
      return;
    }
    if (!checkMainThread()) {
      throw new WXRuntimeException(
          "fireEvent must be called by main thread");
    }
    addUITask(METHOD_FIRE_EVENT, instanceId, ref, type, data);
    sendMessage(instanceId, WXJSBridgeMsgType.CALL_JS_BATCH);
  }

  private boolean checkMainThread() {
    return Looper.myLooper() == Looper.getMainLooper();
  }

  private void addUITask(String method, String instanceId, Object... args) {
    ArrayList<Object> argsList = new ArrayList<>();
    for (Object arg : args) {
      argsList.add(arg);
    }

    WXHashMap<String, Object> task = new WXHashMap<>();
    task.put(WXConst.KEY_METHOD, method);
    task.put(WXConst.KEY_ARGS, argsList);
    task.setTag(instanceId);
    mUITasks.offer(task);
  }

  /**
   * Invoke JavaScript callback
   */
  public void callback(String instanceId, String callback,
                       Map<String, Object> data) {
    if (TextUtils.isEmpty(instanceId) || TextUtils.isEmpty(callback)
        || mJSHandler == null) {
      return;
    }
    callback(instanceId, callback,
             data == null ? "{}" : WXJsonUtils.fromObjectToJSONString(data));
  }

  public void callback(final String instanceId, final String callback,
                       final String data) {
    if (TextUtils.isEmpty(instanceId) || TextUtils.isEmpty(callback)
        || mJSHandler == null) {
      return;
    }

    if (!checkMainThread()) {
      throw new WXRuntimeException(
          "callback must be called by main thread");
    }
    addUITask(METHOD_CALLBACK, instanceId, callback, data);
    sendMessage(instanceId, WXJSBridgeMsgType.CALL_JS_BATCH);
  }

  /**
   * Refresh instance
   */
  public void refreshInstance(final String instanceId, final WXRefreshData jsonData) {
    if (TextUtils.isEmpty(instanceId) || jsonData == null) {
      return;
    }
    mJSHandler.postDelayed((new Runnable() {
      @Override
      public void run() {
        invokeRefreshInstance(instanceId, jsonData);
      }
    }), 0);
  }

  private void invokeRefreshInstance(String instanceId, WXRefreshData refreshData) {
    try {
      if (!mInit) {
        WXSDKInstance instance = WXSDKManager.getInstance().getSDKInstance(instanceId);
        if (instance != null) {
          instance.onRenderError(WXRenderErrorCode.WX_CREATE_INSTANCE_ERROR,
                                 "createInstance failed!");
        }
        String err = "[WXBridgeManager] invokeRefreshInstance: framework.js uninitialized.";
        WXErrorCode.WX_ERR_INVOKE_NATIVE.appendErrMsg(err);
        commitJSBridgeAlarmMonitor(instanceId, WXErrorCode.WX_ERR_INVOKE_NATIVE);
        WXLogUtils.e(err);
        return;
      }
      long start = System.currentTimeMillis();
      if (WXEnvironment.isApkDebugable()) {
        WXLogUtils.d("refreshInstance >>>> instanceId:" + instanceId
                     + ", data:" + refreshData.data + ", isDirty:" + refreshData.isDirty);
      }

      if (refreshData.isDirty) {
        return;
      }
      WXJSObject instanceIdObj = new WXJSObject(WXJSObject.String,
                                                instanceId);
      WXJSObject dataObj = new WXJSObject(WXJSObject.JSON,
                                          refreshData.data == null ? "{}" : refreshData.data);
      WXJSObject[] args = {instanceIdObj, dataObj};
      mWXBridge.execJS(instanceId, null, METHOD_REFRESH_INSTANCE, args);
      WXLogUtils.renderPerformanceLog("invokeRefreshInstance", System.currentTimeMillis() - start);
      commitJSBridgeAlarmMonitor(instanceId, WXErrorCode.WX_SUCCESS);
    } catch (Throwable e) {
      String err = "[WXBridgeManager] invokeRefreshInstance " + e.getCause();
      WXErrorCode.WX_ERR_INVOKE_NATIVE.appendErrMsg(err);
      commitJSBridgeAlarmMonitor(instanceId, WXErrorCode.WX_ERR_INVOKE_NATIVE);
      WXLogUtils.e(err);
    }
  }

  public void commitJSBridgeAlarmMonitor(String instanceId, WXErrorCode errCode) {
    WXSDKInstance instance = WXSDKManager.getInstance().getSDKInstance(instanceId);
    if (instance == null) {
      return;
    }
    instance.commitUTStab(WXConst.JS_BRIDGE, errCode);
  }

  /**
   * Create instance.
   */
  public void createInstance(final String instanceId, final String template,
                             final Map<String, Object> options, final String data) {
    if (!WXEnvironment.sSupport || TextUtils.isEmpty(instanceId)
        || TextUtils.isEmpty(template) || mJSHandler == null) {
      WXSDKInstance instance = WXSDKManager.getInstance().getSDKInstance(instanceId);
      if (instance != null) {
        instance.onRenderError(WXRenderErrorCode.WX_CREATE_INSTANCE_ERROR, "createInstance fail!");
      }
      return;
    }

    post(new Runnable() {
      @Override
      public void run() {
        long start = System.currentTimeMillis();
        invokeCreateInstance(instanceId, template, options, data);
        final long totalTime = System.currentTimeMillis() - start;
        WXSDKManager.getInstance().postOnUiThread(new Runnable() {

          @Override
          public void run() {
            WXSDKInstance instance = WXSDKManager.getInstance().getSDKInstance(instanceId);
            if (instance != null) {
              instance.createInstanceFinished(totalTime);
            }
          }
        }, 0);
        WXLogUtils.renderPerformanceLog("invokeCreateInstance", totalTime);
      }
    }, instanceId);
  }

  private void invokeCreateInstance(String instanceId, String template,
                                    Map<String, Object> options, String data) {
    if (mMock) {
      mock(instanceId);
    } else {
      if (!mInit) {
        WXSDKInstance instance = WXSDKManager.getInstance().getSDKInstance(instanceId);
        if (instance != null) {
          instance.onRenderError(WXRenderErrorCode.WX_CREATE_INSTANCE_ERROR, "createInstance "
                                                                             + "fail!");
        }
        String err = "[WXBridgeManager] invokeCreateInstance: framework.js uninitialized.";
        WXErrorCode.WX_ERR_INVOKE_NATIVE.appendErrMsg(err);
        commitJSBridgeAlarmMonitor(instanceId, WXErrorCode.WX_ERR_INVOKE_NATIVE);
        WXLogUtils.e(err);
        return;
      }
      try {
        if (WXEnvironment.isApkDebugable()) {
          WXLogUtils.d("createInstance >>>> instanceId:" + instanceId
                       + ", options:"
                       + WXJsonUtils.fromObjectToJSONString(options)
                       + ", data:" + data);
        }
        WXJSObject instanceIdObj = new WXJSObject(WXJSObject.String,
                                                  instanceId);
        WXJSObject instanceObj = new WXJSObject(WXJSObject.String,
                                                template);
        WXJSObject optionsObj = new WXJSObject(WXJSObject.JSON,
                                               options == null ? "{}"
                                                               : WXJsonUtils.fromObjectToJSONString(options));
        WXJSObject dataObj = new WXJSObject(WXJSObject.JSON,
                                            data == null ? "{}" : data);
        WXJSObject[] args = {instanceIdObj, instanceObj, optionsObj,
            dataObj};
        mWXBridge.execJS(instanceId, null, METHOD_CREATE_INSTANCE, args);
        commitJSBridgeAlarmMonitor(instanceId, WXErrorCode.WX_SUCCESS);
      } catch (Throwable e) {
        WXSDKInstance instance = WXSDKManager.getInstance().getSDKInstance(instanceId);
        if (instance != null) {
          instance.onRenderError(WXRenderErrorCode.WX_CREATE_INSTANCE_ERROR,
                                 "createInstance failed!");
        }
        String err = "[WXBridgeManager] invokeCreateInstance " + e.getCause();
        WXErrorCode.WX_ERR_INVOKE_NATIVE.appendErrMsg(err);
        commitJSBridgeAlarmMonitor(instanceId, WXErrorCode.WX_ERR_INVOKE_NATIVE);
        WXLogUtils.e(err);
      }
    }
  }

  private void mock(String instanceId) {

  }

  public void destroyInstance(final String instanceId) {
    if (!WXEnvironment.sSupport || mJSHandler == null
        || TextUtils.isEmpty(instanceId)) {
      return;
    }
    mDestroyedInstanceId = instanceId;
    // clear message with instanceId
    mJSHandler.removeCallbacksAndMessages(instanceId);
    post(new Runnable() {
      @Override
      public void run() {
        mDestroyedInstanceId = "-1";
        removeTaskByInstance(instanceId);
        invokeDestroyInstance(instanceId);
      }
    }, instanceId);
  }

  private void removeTaskByInstance(String instanceId) {
    mNextTickTasks.removeFromMapAndStack(instanceId);
  }

  private void invokeDestroyInstance(String instanceId) {
    try {
      if (WXEnvironment.isApkDebugable()) {
        WXLogUtils.d("destroyInstance >>>> instanceId:" + instanceId);
      }
      WXJSObject instanceIdObj = new WXJSObject(WXJSObject.String,
                                                instanceId);
      WXJSObject[] args = {instanceIdObj};
      mWXBridge.execJS(instanceId, null, METHOD_DESTROY_INSTANCE, args);
      commitJSBridgeAlarmMonitor(instanceId, WXErrorCode.WX_SUCCESS);
    } catch (Throwable e) {
      String err = "[WXBridgeManager] invokeDestroyInstance " + e.getCause();
      WXErrorCode.WX_ERR_INVOKE_NATIVE.appendErrMsg(err);
      commitJSBridgeAlarmMonitor(instanceId, WXErrorCode.WX_ERR_INVOKE_NATIVE);
      WXLogUtils.e(err);
    }
  }

  @Override
  public boolean handleMessage(Message msg) {
    if (msg == null) {
      return false;
    }

    int what = msg.what;
    switch (what) {
      case WXJSBridgeMsgType.INIT_FRAMEWORK:
        invokeInitFramework(msg);
        break;
      case WXJSBridgeMsgType.CALL_JS_BATCH:
        invokeCallJSBatch(msg);
        break;
      case WXJSBridgeMsgType.SET_TIMEOUT:
        TimerInfo timerInfo = (TimerInfo) msg.obj;
        WXJSObject obj = new WXJSObject(WXJSObject.String, timerInfo.callbackId);
        WXJSObject[] args = {obj};
        mWXBridge.execJS("", null, "setTimeoutCallback", args);
        break;
      default:
        break;
    }
    return false;
  }

  private void invokeInitFramework(Message msg) {
    String framework = "";
    if (msg.obj != null) {
      framework = (String) msg.obj;
    }

    if (!mInit) {
      if (TextUtils.isEmpty(framework)) {
        if (WXEnvironment.isApkDebugable()) {
          WXLogUtils.d("framework from assets");
        }
        framework = WXFileUtils.loadFileContent("main.js", WXEnvironment.getApplication());
      }
      if (TextUtils.isEmpty(framework)) {
        mInit = false;
        return;
      }
      try {
        long start = System.currentTimeMillis();
        mWXBridge.initFramework(framework, assembleDefaultOptions());
        WXEnvironment.sJSLibInitTime = System.currentTimeMillis() - start;
        WXLogUtils.renderPerformanceLog("initFramework", WXEnvironment.sJSLibInitTime);
        mInit = true;
        execRegisterFailTask();
        WXEnvironment.JsFrameworkInit = true;
      } catch (Throwable e) {
        WXLogUtils.e("[WXBridgeManager] invokeInitFramework " + e.getCause());
      }
    }
  }

  @SuppressWarnings("unchecked")
  private void invokeCallJSBatch(Message message) {
    if ((mNextTickTasks.isEmpty() && mUITasks.isEmpty()) || !mInit) {
      if (!mInit) {
        WXLogUtils.e("[WXBridgeManager] invokeCallJSBatch: framework.js uninitialized.");
      }
      return;
    }
    try {
      Object task = null;

      Object instanceId = message.obj;
      // Execute UI task first
      task = mUITasks.poll();
      if (task != null) {
        instanceId = ((WXHashMap) task).getTag();
      }

      Object[] tasks = {task};

      //If UI task is empty, then next tick is executed
      if (task == null) {
        Stack<String> instanceStack = mNextTickTasks.getInstanceStack();
        int size = instanceStack.size();
        for (int i = size - 1; i >= 0; i--) {
          // Instance on the top of stack. The corresponding message of that instance will be
          // handled first
          instanceId = instanceStack.get(i);
          task = mNextTickTasks.remove(instanceId);
          if (task != null && !((ArrayList) task).isEmpty()) {
            break;
          }
        }
        tasks = ((ArrayList) task).toArray();
      }

      task = tasks;

      if (WXEnvironment.isApkDebugable()) {
        mLodBuilder.append("callJS >>>> instanceId:").append(instanceId).append(" tasks:").append(WXJsonUtils.fromObjectToJSONString(task));
        WXLogUtils.d(mLodBuilder.substring(0));
        mLodBuilder.setLength(0);
      }
      WXJSObject[] args = {
          new WXJSObject(WXJSObject.String, instanceId),
          new WXJSObject(WXJSObject.JSON,
                         WXJsonUtils.fromObjectToJSONString(task))};
      if (WXEnvironment.isApkDebugable()) {
        String ins = String.valueOf(instanceId);
        if (TextUtils.isEmpty(ins) || ins.equals("null") || args == null) {
          WXLogUtils.e("WXBridgeManager (TextUtils.isEmpty(ins) || ins.equals(\"null\") || args == null)");
        }
      }
      mWXBridge.execJS(String.valueOf(instanceId), null, METHOD_CALL_JS,
                       args);
      // If task is not empty, loop until it is empty
      if (!mNextTickTasks.isEmpty() && !mUITasks.isEmpty()) {
        mJSHandler.sendEmptyMessage(WXJSBridgeMsgType.CALL_JS_BATCH);
      }
    } catch (Throwable e) {
      WXLogUtils.e("WXBridgeManager" + e.getMessage());
    }
  }

  private WXParams assembleDefaultOptions() {
    Map<String, String> config = WXEnvironment.getConfig();
    WXParams wxParams = new WXParams();
    wxParams.setPlatform(config.get("os"));
    wxParams.setOsVersion(config.get("sysversion"));
    wxParams.setAppVersion(config.get("appversion"));
    wxParams.setWeexVersion(config.get("weexversion"));
    wxParams.setDeviceModel(config.get("sysmodel"));
    String appName = config.get("appName");
    if (!TextUtils.isEmpty(appName)) {
      wxParams.setAppName(appName);
    }
    wxParams.setDeviceWidth(TextUtils.isEmpty(config.get("deviceWidth")) ? String.valueOf(WXViewUtils.getScreenWidth()) : config.get("deviceWidth"));
    wxParams.setDeviceHeight(TextUtils.isEmpty(config.get("deviceHeight")) ? String.valueOf(WXViewUtils.getScreenHeight()) : config.get("deviceHeight"));
    return wxParams;
  }

  private void execRegisterFailTask() {
    int moduleCount = mRegisterModuleFailList.size();
    if (moduleCount > 0) {
      for (int i = 0; i < moduleCount; ++i) {
        registerModules(mRegisterModuleFailList.get(i));
      }
      mRegisterModuleFailList.clear();
      WXLogUtils.e("[WXBridgeManager] execRegisterFailTask register module fail");
    }
    int componentCount = mRegisterComponentFailList.size();
    if (componentCount > 0) {
      for (int i = 0; i < componentCount; ++i) {
        registerComponents(mRegisterComponentFailList.get(i));
      }
      mRegisterComponentFailList.clear();
      WXLogUtils.e("[WXBridgeManager] execRegisterFailTask register component fail");
    }
  }

  /**
   * Register Android module
   * @param modules the format is like
   *                {'dom':['updateAttrs','updateStyle'],'event':['openUrl']}
   */

  public void registerModules(final Map<String, Object> modules) {
    if (!WXEnvironment.sSupport || mJSHandler == null || modules == null
        || modules.size() == 0) {
      return;
    }
    post(new Runnable() {
      @Override
      public void run() {
        invokeRegisterModules(modules);
      }
    }, null);
  }

  /**
   * Registered component
   */
  public void registerComponents(final ArrayList<Map<String, String>> components) {
    if (!WXEnvironment.sSupport || mJSHandler == null || components == null
        || components.size() == 0) {
      return;
    }
    post(new Runnable() {
      @Override
      public void run() {
        invokeRegisterComponents(components);
      }
    }, null);
  }

  private void invokeRegisterModules(Map<String, Object> modules) {
    if (modules == null || !mInit) {
      if (!mInit) {
        WXLogUtils.e("[WXBridgeManager] invokeCallJSBatch: framework.js uninitialized.");
      }
      mRegisterModuleFailList.add(modules);
      return;
    }

    WXJSObject[] args = {new WXJSObject(WXJSObject.JSON,
                                        WXJsonUtils.fromObjectToJSONString(modules))};
    try {
      mWXBridge.execJS("", null, METHOD_REGISTER_MODULES, args);
    } catch (Throwable e) {
      WXLogUtils.e("[WXBridgeManager] invokeRegisterModules:" + (e == null ? "" : e.getStackTrace()));
    }
  }

  private void invokeRegisterComponents(ArrayList<Map<String, String>> components) {
    if (components == null || !mInit) {
      if (!mInit) {
        WXLogUtils.e("[WXBridgeManager] invokeCallJSBatch: framework.js uninitialized.");
      }
      mRegisterComponentFailList.add(components);
      return;
    }

    WXJSObject[] args = {new WXJSObject(WXJSObject.JSON,
                                        WXJsonUtils.fromObjectToJSONString(components))};
    try {
      mWXBridge.execJS("", null, METHOD_REGISTER_COMPONENTS, args);
    } catch (Throwable e) {
      WXLogUtils.e("[WXBridgeManager] invokeRegisterComponents " + (e == null ? "" : e.getCause()));
    }
  }

  public void destroy() {
    if (mJSThread != null) {
      mJSThread.quit();
    }
    mBridgeManager = null;
  }

  /**
   * Report JavaScript Exception
   */
  public void reportJSException(String instanceId, String function,
                                String exception) {
    if (WXEnvironment.isApkDebugable()) {
      WXLogUtils.e("reportJSException >>>> instanceId:" + instanceId
                   + ", exception function:" + function + ", exception:"
                   + exception);
    }
    WXSDKInstance instance = WXSDKManager.getInstance().getSDKInstance(
        instanceId);
    if (instance != null) {
      // TODO add errCode
      instance.onJSException(null, function, exception);
    }
    WXErrorCode.WX_ERR_JS_EXECUTE.appendErrMsg(exception);
    commitJSBridgeAlarmMonitor(instanceId, WXErrorCode.WX_ERR_JS_EXECUTE);
  }

  public static class TimerInfo {

    public String callbackId;
    public long time;
    public String instanceId;
  }

}
