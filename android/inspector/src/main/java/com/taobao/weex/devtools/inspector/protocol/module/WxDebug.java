package com.taobao.weex.devtools.inspector.protocol.module;

import android.util.Log;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.taobao.weex.devtools.debug.DebugBridge;
import com.taobao.weex.devtools.inspector.jsonrpc.JsonRpcPeer;
import com.taobao.weex.devtools.inspector.protocol.ChromeDevtoolsDomain;
import com.taobao.weex.devtools.inspector.protocol.ChromeDevtoolsMethod;
import com.taobao.weex.devtools.json.ObjectMapper;
import com.taobao.weex.devtools.json.annotation.JsonProperty;

import org.json.JSONObject;

import java.lang.reflect.InvocationTargetException;
import java.util.List;

/**
 * Created by budao on 16/6/24.
 */
public class WxDebug implements ChromeDevtoolsDomain {
    private static final String TAG = "WxDebug";
    private final ObjectMapper mObjectMapper = new ObjectMapper();
    public WxDebug() {

    }

    @ChromeDevtoolsMethod
    public void callNative(JsonRpcPeer peer, JSONObject params) {
        if (params != null) {
            DebugBridge.getInstance().callNative(
                    params.optString("instance"),
                    params.optString("tasks"),
                    params.optString("callback"));
        }
        // another way to handle call native
//        CallNative callNative = mObjectMapper.convertValue(params, CallNative.class);
//        if (callNative != null) {
//            try {
//                String tasks = mObjectMapper.convertListToJsonArray(callNative.tasks).toString();
//                Log.v(TAG, "WxDebug.callNative tasks " + tasks);
//                DebugBridge.getInstance().callNative(callNative.instance,
//                        tasks,
//                        callNative.callback);
//            } catch (InvocationTargetException e) {
//                e.printStackTrace();
//            } catch (IllegalAccessException e) {
//                e.printStackTrace();
//            }
//        }
    }

    public static class CallNative {
        @JsonProperty(required = true)
        public String instance;
        @JsonProperty(required = true)
        public String callback;
        @JsonProperty(required = true)
        public List<Task> tasks;
    }

    public static class CallJS {
        @JsonProperty(required = true)
        public String method;
        @JsonProperty(required = true)
        public List<Object> args;
    }

    public static class Task {
        @JsonProperty(required = true)
        public String module;
        @JsonProperty(required = true)
        public String method;
        @JsonProperty(required = true)
        public List<String> args;
    }


}
