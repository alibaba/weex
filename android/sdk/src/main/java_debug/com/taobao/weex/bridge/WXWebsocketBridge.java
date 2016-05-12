/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
package com.taobao.weex.bridge;

import android.text.TextUtils;
import android.widget.Toast;

import com.alibaba.fastjson.JSON;
import com.taobao.weex.WXEnvironment;
import com.taobao.weex.WXSDKManager;
import com.taobao.weex.common.IWXBridge;
import com.taobao.weex.utils.WXLogUtils;
import com.taobao.weex.websocket.WXWebsocket;
import com.taobao.weex.websocket.WXWebsocket.JSDebuggerCallback;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/**
 * websocket bridge
 *
 * @author gulin
 */
public class WXWebsocketBridge implements IWXBridge {

    private WXBridgeManager mJsManager;
    private WXWebsocket mWaWebsocket;
    private volatile boolean mInit = false;

    public WXWebsocketBridge(WXBridgeManager jm) {
        mJsManager = jm;
        mWaWebsocket = new WXWebsocket(this);
        mWaWebsocket.connect(WXEnvironment.sDebugWsUrl,
                new JSDebuggerCallback() {

                    @Override
                    public void onSuccess(String response) {
                        mInit = true;
                        WXSDKManager.getInstance().postOnUiThread(
                                new Runnable() {

                                    @Override
                                    public void run() {
                                        Toast.makeText(
                                                WXEnvironment.sApplication,
                                                "切换到调试模式", Toast.LENGTH_SHORT)
                                                .show();
                                    }
                                }, 0);
                        WXLogUtils.d("connect websocket server success!");

                        mJsManager.initScriptsFramework(null);
                    }

                    @Override
                    public void onFailure(Throwable cause) {
                        WXLogUtils.d("connect websocket server failure!");
                    }

                });
    }

    @Override
    public int execJS(String instanceId, String namespace, String function,
                      WXJSObject[] args) {
        if (!mInit || TextUtils.isEmpty(instanceId)
                || TextUtils.isEmpty(function)) {
            return -1;
        }

        Map<String, Object> map = new HashMap<>();
        map.put("name", function);

        ArrayList<Object> array = new ArrayList<>();
        int argsCount = args == null ? 0 : args.length;
        for (int i = 0; i < argsCount; i++) {
            if (args[i].type != WXJSObject.String) {
                array.add(JSON.parse(args[i].data.toString()));
            } else {
                array.add(args[i].data);
            }
        }
        map.put("value", array);
        mWaWebsocket.sendMessage(0, JSON.toJSONString(map));
        return 0;
    }

    @Override
    public void callNative(String instanceId, String tasks, String callback) {
        if (!mInit || mJsManager == null)
            return;
        mJsManager.callNative(instanceId, tasks, callback);
    }

    @Override
    public int initFramework(String scriptsFramework) {
        if (!mInit) {
            return -1;
        }

        Map<String, Object> map = new HashMap<>();
        map.put("name", "evalFramework");
        ArrayList<String> args = new ArrayList<>();
        args.add(scriptsFramework);
        map.put("value", args);
        mWaWebsocket.sendMessage(0, JSON.toJSONString(map));
        return 0;
    }

    @Override
    public void reportJSException(String instanceId, String func, String exception) {
        if (mJsManager != null) {
            mJsManager.reportJSException(instanceId, func, exception);
        }
    }
}
