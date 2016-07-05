package com.taobao.weex.devtools.debug;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.util.Log;

import com.alibaba.fastjson.JSON;
import com.taobao.weex.WXEnvironment;
import com.taobao.weex.bridge.WXBridgeManager;
import com.taobao.weex.bridge.WXJSObject;
import com.taobao.weex.bridge.WXParams;
import com.taobao.weex.common.IWXBridge;
import com.taobao.weex.common.IWXDebugProxy;
import com.taobao.weex.devtools.websocket.SimpleSession;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by budao on 16/6/25.
 */
public class DebugBridge implements IWXBridge {
    private static final String TAG = "DebugBridge";
    private static volatile DebugBridge sInstance;
    private Object mLock = new Object();
    private WXBridgeManager mJsManager;
    private SimpleSession mSession;
    private ConnectionBroadcastReceiver mReceiver;

    private DebugBridge() {

    }

    public static DebugBridge getInstance() {
        if (sInstance == null) {
            synchronized (DebugBridge.class) {
                if (sInstance == null) {
                    sInstance = new DebugBridge();
                }
            }
        }

        return sInstance;
    }

    public void setSession(SimpleSession session) {
        mSession = session;
        registerBroadcastReceiver();
    }

    public void setBridgeManager(WXBridgeManager bridgeManager) {
        mJsManager = bridgeManager;
    }

    @Override
    public int initFramework(String framework, WXParams params) {
        while (mSession == null || (mSession != null && !mSession.isOpen())) {
            synchronized (mLock) {
                try {
                    Log.v(TAG, "waiting for session now");
                    mLock.wait();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }
        unregisterBroadcastReceiver();

        if (mSession != null && mSession.isOpen()) {
            mSession.sendText(getInitFrameworkMessage(framework, params));
            return 1;
        }

        return 0;
    }

    private String getInitFrameworkMessage(String framework, WXParams params) {
        Map<String, Object> func = new HashMap<>();
        func.put(WXDebugConstants.PARAM_JS_SOURCE, framework);
        if (params != null) {
            Map<String, Object> environmentMap = getEnvironmentMap(params);
            if (environmentMap != null && environmentMap.size() > 0) {
                Map<String, Object> wxEnvironment = new HashMap<>();
                wxEnvironment.put(WXDebugConstants.ENV_WX_ENVIRONMENT, environmentMap);
                func.put(WXDebugConstants.PARAM_INIT_ENV, wxEnvironment);
            }
        }

        Map<String, Object> map = new HashMap<>();
        map.put(WXDebugConstants.METHOD, WXDebugConstants.METHOD_INIT_RUNTIME);
        map.put(WXDebugConstants.PARAMS, func);

        return JSON.toJSONString(map);
    }

    private Map<String, Object> getEnvironmentMap(WXParams params) {
        Map<String, Object> environment = new HashMap<>();
        environment.put(WXDebugConstants.ENV_APP_NAME, params.getAppName());
        environment.put(WXDebugConstants.ENV_APP_VERSION, params.getAppVersion());
        environment.put(WXDebugConstants.ENV_PLATFORM, params.getPlatform());
        environment.put(WXDebugConstants.ENV_OS_VERSION, params.getOsVersion());
        environment.put(WXDebugConstants.ENV_LOG_LEVEL, params.getLogLevel());
        environment.put(WXDebugConstants.ENV_WEEX_VERSION, params.getWeexVersion());
        environment.put(WXDebugConstants.ENV_DEVICE_MODEL, params.getDeviceModel());
        environment.put(WXDebugConstants.ENV_INFO_COLLECT, params.getShouldInfoCollect());
        environment.put(WXDebugConstants.ENV_DEVICE_WIDTH, params.getDeviceWidth());
        environment.put(WXDebugConstants.ENV_DEVICE_HEIGHT, params.getDeviceHeight());
        return environment;
    }

    @Override
    public int execJS(String instanceId, String namespace, String function, WXJSObject[] args) {
//        if (!mInit || (TextUtils.isEmpty(instanceId) && !WXBridgeManager.METHOD_REGISTER_MODULES.equals(function))
//                || TextUtils.isEmpty(function)) {
//            return -1;
//        }

        ArrayList<Object> array = new ArrayList<>();
        int argsCount = args == null ? 0 : args.length;
        for (int i = 0; i < argsCount; i++) {
            if (args[i].type != WXJSObject.String) {
                array.add(JSON.parse(args[i].data.toString()));
            } else {
                array.add(args[i].data);
            }
        }

        Map<String, Object> func = new HashMap<>();
        func.put(WXDebugConstants.METHOD, function);
        func.put(WXDebugConstants.ARGS, array);

        Log.v(TAG, "callJS: function is " + function + ", args " + array);
        Map<String, Object> map = new HashMap<>();
        map.put(WXDebugConstants.METHOD, WXDebugConstants.METHOD_CALL_JS);
        map.put(WXDebugConstants.PARAMS, func);
        if (mSession != null && mSession.isOpen()) {
            mSession.sendText(JSON.toJSONString(map));
        }

        return 0;
    }

    @Override
    public int callNative(String instanceId, String tasks, String callback) {
        if (mJsManager != null) {
            return  mJsManager.callNative(instanceId, tasks, callback);
        }else{
            return WXBridgeManager.INSTANCE_RENDERING_ERROR;
        }
    }

    @Override
    public void reportJSException(String instanceId, String func, String exception) {
        if (mJsManager != null) {
            mJsManager.reportJSException(instanceId, func, exception);
        }
    }

    public class ConnectionBroadcastReceiver extends BroadcastReceiver {
        @Override
        public void onReceive(Context context, Intent intent) {
            if (IWXDebugProxy.ACTION_DEBUG_SERVER_CONNECTED.equals(intent.getAction())) {
                Log.v(TAG, "connect to debug server success");
                synchronized (mLock) {
                    mLock.notify();
                }
            } else if (IWXDebugProxy.ACTION_DEBUG_SERVER_CONNECT_FAILED.equals(intent.getAction())) {
                Log.v(TAG, "connect to debug server failed");
                synchronized (mLock) {
                    mLock.notify();
                }
            }
        }
    }

    private void registerBroadcastReceiver() {
        mReceiver = new ConnectionBroadcastReceiver();
        IntentFilter filter = new IntentFilter();
        filter.addAction(IWXDebugProxy.ACTION_DEBUG_SERVER_CONNECTED);
        filter.addAction(IWXDebugProxy.ACTION_DEBUG_SERVER_CONNECT_FAILED);
        WXEnvironment.getApplication().registerReceiver(mReceiver, filter);
    }

    private void unregisterBroadcastReceiver() {
        if (mReceiver != null) {
            WXEnvironment.getApplication().unregisterReceiver(mReceiver);
        }
    }
}
