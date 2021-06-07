/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
package org.apache.weex.extend.adapter;

import java.util.HashMap;
import java.util.Map;

import android.util.Log;
import com.taobao.weex.performance.IWXApmMonitorAdapter;
import com.taobao.weex.performance.WXInstanceApm;
import org.json.JSONException;
import org.json.JSONObject;

public class WXInstanceApmAdapter implements IWXApmMonitorAdapter {
    private final APMInfo mInstanceInfo;
    private final Map<String, APMInfo> mSubProcedureInfo;
    private boolean isAppear = true;

    WXInstanceApmAdapter() {
        mInstanceInfo = new APMInfo(WXInstanceApm.WEEX_PAGE_TOPIC);
        mSubProcedureInfo = new HashMap<>(1);
    }

    @Override
    public void onStart(String instanceId) {
    }

    @Override
    public void onEnd() {
        printVale();
    }

    @Override
    public void onEvent(String name, Object value) {
        if (!isAppear){
            return;
        }
        mInstanceInfo.eventMap.put(name, value);
    }

    @Override
    public void onStage(String name, long timestamp) {
        mInstanceInfo.stageMap.put(name, timestamp);
    }

    @Override
    public void addProperty(String key, Object value) {
        mInstanceInfo.propertyMap.put(key, value);
    }

    @Override
    public void addStats(String key, double value) {
        mInstanceInfo.statsMap.put(key, value);
    }

    @Override
    public void onSubProcedureStage(String procedureName, String stageName) {
        getAndCheckAndSubProcedureMap(procedureName).stageMap.put(stageName, System.currentTimeMillis());
    }

    @Override
    public void onSubProcedureEvent(String procedureName, String eventName) {
        getAndCheckAndSubProcedureMap(procedureName).eventMap.put(eventName, System.currentTimeMillis());
    }

    @Override
    public void setSubProcedureStats(String procedureName, String name, double value) {
        getAndCheckAndSubProcedureMap(procedureName).statsMap.put(name, value);
    }

    @Override
    public void setSubProcedureProperties(String procedureName, String name, Object value) {
        getAndCheckAndSubProcedureMap(procedureName).propertyMap.put(name, value);
    }

    @Override
    public void onAppear() {
        isAppear = true;
    }

    @Override
    public void onDisappear() {
        isAppear = false;
    }

    @Override
    public String parseReportUrl(String originUrl) {
        return originUrl;
    }

    private APMInfo getAndCheckAndSubProcedureMap(String procedureName) {
        APMInfo info = mSubProcedureInfo.get(procedureName);
        if (null != info) {
            return info;
        }
        synchronized (mSubProcedureInfo) {
            info = new APMInfo(procedureName);
            mSubProcedureInfo.put(procedureName, info);
        }
        return info;
    }

    private void printVale() {
        String val = "";
        try {
            JSONObject subProcedureJson = new JSONObject();
            for (Map.Entry<String, APMInfo> entry : mSubProcedureInfo.entrySet()) {
                subProcedureJson.put(entry.getKey(), entry.getValue().toJson());
            }
            val = mInstanceInfo.toJson()
                .put("subProcedures", subProcedureJson)
                .toString();
        } catch (JSONException e) {
            e.printStackTrace();
        }
        Log.i("wxApmInstance", val);
        //WXLogUtils.d("wxApmInstance", val);
    }

    private class APMInfo {
        private String infoName;
        private Map<String, Object> stageMap;
        private Map<String, Object> propertyMap;
        private Map<String, Object> eventMap;
        private Map<String, Object> statsMap;

        APMInfo(String name) {
            this.infoName = name;
            stageMap = new HashMap<>();
            propertyMap = new HashMap<>();
            eventMap = new HashMap<>();
            statsMap = new HashMap<>();
        }

        JSONObject toJson() throws JSONException {
            return new JSONObject()
                .put("stage", convertMapToJSON(stageMap))
                .put("property", convertMapToJSON(propertyMap))
                .put("event", convertMapToJSON(eventMap))
                .put("stats", convertMapToJSON(statsMap));
        }

        private JSONObject convertMapToJSON(Map<String, Object> params) throws JSONException {
            JSONObject json = new JSONObject();
            for (Map.Entry<String, Object> entry : params.entrySet()) {
                json.put(entry.getKey(), entry.getValue());
            }
            return json;
        }
    }
}
