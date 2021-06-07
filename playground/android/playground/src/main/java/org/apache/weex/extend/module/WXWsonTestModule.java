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
package org.apache.weex.extend.module;

import android.util.Log;

import com.alibaba.fastjson.JSONObject;
import com.taobao.weex.annotation.JSMethod;
import com.taobao.weex.bridge.JSCallback;
import com.taobao.weex.bridge.WXBridgeManager;
import com.taobao.weex.common.WXModule;
import com.taobao.weex.utils.WXWsonJSONSwitch;

/**
 * Created by furture on 2018/1/18.
 */

public class WXWsonTestModule extends WXModule {

    @JSMethod(uiThread = false)
    public boolean callPass(JSONObject params) {
        if(params.get("refundId") != null){
            if(params.get("refundId").getClass() != Long.class){
                Log.e("Weex", "weex wson refundId failed case");
                return false;
            }
            return  ((Long)params.get("refundId")) == 6419458776149741l;
        }

        if(params.get("refundId2") != null){
            if(params.get("refundId2").getClass() != Long.class){
                Log.e("Weex", "weex wson refundId failed case");
                return false;
            }
            return ((Long)params.get("refundId2")) == 64194587761497416l;
        }




        return true;
    }

    @JSMethod(uiThread = false)
    public Object back(JSONObject params) {
        JSONObject back = new JSONObject(params);
        back.put("longMax", Long.MAX_VALUE);
        back.put("longMin", Long.MIN_VALUE);
        back.put("javaJSON", back.toJSONString());
        return back;
    }

    @JSMethod(uiThread = false)
    public void  backAsync(JSONObject params, JSCallback callback) {
        JSONObject back = new JSONObject(params);
        back.put("longMax", Long.MAX_VALUE);
        back.put("longMin", Long.MIN_VALUE);
        back.put("javaJSON", back.toJSONString());
        callback.invoke(back);
    }

    @JSMethod(uiThread = false)
    public Object  benchmark(JSONObject params) {
        if(params == null){
            throw new RuntimeException("params is null");
        }//do nothing
        return params;
    }

    @JSMethod(uiThread = false)
    public void switchTrans(JSCallback callback) {
        if(WXWsonJSONSwitch.USE_WSON){
            WXBridgeManager.updateGlobalConfig("wson_off");
            callback.invoke("wson off, use json");
        }else{
            WXBridgeManager.updateGlobalConfig("wson_on");
            callback.invoke("wson on, use wson");
        }
    }


}
