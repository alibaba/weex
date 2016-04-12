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
package com.taobao.weex.utils;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import java.util.List;

/**
 * Tool for parse JSON
 */
public class WXJsonUtils {

  public static <T> T fromJson(String json, Class<T> responseClass) {
    return JSONObject.parseObject(json, responseClass);
  }

  public static <T> T fromJsonProtocolStr(String json, Class<T> responseClass) {
    return JSONObject.parseObject(json, responseClass);
  }

  public static <T> List<T> getList(String json, Class<T> clazz) {
    List<T> result = null;
    try {
      result = JSONObject.parseArray(json, clazz);
    } catch (Exception e) {
    }
    return result;
  }

  public static JSONArray parseArrayStr(String arrStr) {
    return JSONObject.parseArray(arrStr);
  }

  public static String fromObjectToJSONString(Object obj) {
    return JSONObject.toJSONString(obj);
  }

  public static String fromObject2JSONArrayString(Object obj) {
    if (obj == null) {
      return "";
    }
    try {
      return JSONArray.toJSON(obj).toString();
    } catch (Exception e) {
      e.printStackTrace();
    }

    return "";
  }
}
