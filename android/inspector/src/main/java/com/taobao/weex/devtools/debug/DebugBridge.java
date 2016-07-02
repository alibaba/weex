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
    private MyBroadcastReceiver mReceiver;

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
            mSession.sendText(getInitFrameworkMessage(framework));
            return 1;
        }

        return 0;
    }

    private String getInitFrameworkMessage(String framework) {
        Map<String, Object> func = new HashMap<>();
        func.put("source", framework);

        Map<String, Object> map = new HashMap<>();
        map.put("method", "WxDebug.initJSRuntime");
        map.put("params", func);

        return JSON.toJSONString(map);
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
        func.put("method", function);
        func.put("args", array);

        Log.v(TAG, "callJS: function is " + function + ", args " + array);
        Map<String, Object> map = new HashMap<>();
        map.put("method", "WxDebug.callJS");
        map.put("params", func);
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

    public class MyBroadcastReceiver extends BroadcastReceiver {
        @Override
        public void onReceive(Context context, Intent intent) {
            if (DebugServerProxy.ACTION_DEBUG_SERVER_CONNECTED.equals(intent.getAction())) {
                Log.v(TAG, "connect to debug server success");
                synchronized (mLock) {
                    mLock.notify();
                }
            } else if (DebugServerProxy.ACTION_DEBUG_SERVER_CONNECT_FAILED.equals(intent.getAction())) {
                Log.v(TAG, "connect to debug server failed");
                synchronized (mLock) {
                    mLock.notify();
                }
            }
        }
    }

    private void registerBroadcastReceiver() {
        mReceiver = new MyBroadcastReceiver();
        IntentFilter filter = new IntentFilter();
        filter.addAction(DebugServerProxy.ACTION_DEBUG_SERVER_CONNECTED);
        filter.addAction(DebugServerProxy.ACTION_DEBUG_SERVER_CONNECT_FAILED);
        WXEnvironment.getApplication().registerReceiver(mReceiver, filter);
    }

    private void unregisterBroadcastReceiver() {
        if (mReceiver != null) {
            WXEnvironment.getApplication().unregisterReceiver(mReceiver);
        }
    }
}
