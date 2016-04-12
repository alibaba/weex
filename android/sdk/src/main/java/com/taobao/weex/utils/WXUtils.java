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

import android.content.res.Configuration;
import android.os.Looper;

import com.taobao.weex.WXEnvironment;

public class WXUtils {

  /**
   * Tell whether current thread is UI(main) thread.
   * @return true for UI(main) thread
   */
  public static boolean isUiThread() {
    return Thread.currentThread().getId() == Looper.getMainLooper().getThread().getId();
  }

  public static boolean isUndefined(float value) {
    return Float.compare(value, Float.NaN) == 0;
  }

  public static float getFloat(Object value) {
    if (value == null) {
      return Float.NaN;
    }
    String temp = value.toString().trim();
    if (temp.endsWith("px")) {
      temp = temp.substring(0, temp.indexOf("px"));
    }
    float result = Float.NaN;
    try {
      result = Float.parseFloat(temp);
    } catch (NumberFormatException e) {
    }
    return result;
  }

  public static int getInt(Object value) {
    if (value == null) {
      return 0;
    }
    String temp = value.toString().trim();
    if (temp.endsWith("px")) {
      temp = temp.substring(0, temp.indexOf("px"));
    }
    int result = 0;
    try {
      result = Integer.parseInt(temp);
    } catch (NumberFormatException e) {

    }
    return result;
  }

  public static long getLong(Object value) {
    if (value == null) {
      return 0;
    }
    String temp = value.toString().trim();
    if (temp.endsWith("px")) {
      temp = temp.substring(0, temp.indexOf("px"));
    }
    long result = 0;
    try {
      result = Long.parseLong(temp);
    } catch (NumberFormatException e) {
      WXLogUtils.e("[WXUtils] getLong:" + WXLogUtils.getStackTrace(e));
    }
    return result;
  }

  public static double getDouble(Object value) {
    if (value == null) {
      return 0;
    }
    String temp = value.toString().trim();
    if (temp.endsWith("px")) {
      temp = temp.substring(0, temp.indexOf("px"));
    }
    double result = 0;
    try {
      result = Double.parseDouble(temp);
    } catch (NumberFormatException e) {
      WXLogUtils.e("[WXUtils] getDouble:" + WXLogUtils.getStackTrace(e));
    }
    return result;
  }

  public static boolean isTabletDevice() {
    return (WXEnvironment.getApplication().getResources().getConfiguration().screenLayout & Configuration.SCREENLAYOUT_SIZE_MASK) >= Configuration.SCREENLAYOUT_SIZE_LARGE;
  }
}
