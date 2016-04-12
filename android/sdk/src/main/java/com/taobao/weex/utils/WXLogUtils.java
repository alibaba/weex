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

import android.util.Log;

import com.taobao.weex.WXEnvironment;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;

public class WXLogUtils {

  public static String WEEX_TAG = "weex";
  public static String WEEX_PERF_TAG = "weex_perf";

  private static StringBuilder builder = new StringBuilder(50);

  public static void renderPerformanceLog(String type, long time) {
    if (WXEnvironment.isApkDebugable() || WXEnvironment.isPerf()) {
      builder.setLength(0);
      builder.append("[render time]").append(type).append(":").append(time);
      Log.d(WEEX_PERF_TAG, builder.substring(0));
    }
  }

  public static void d(String msg) {
    if (WXEnvironment.isApkDebugable() && msg != null) {
      Log.d(WEEX_TAG, msg);
    }
  }

  public static void info(String msg) {
    if (WXEnvironment.isApkDebugable() && msg != null) {
      Log.i(WEEX_TAG, msg);
    }
  }

  public static void v(String msg) {
    if (WXEnvironment.isApkDebugable() && msg != null) {
      Log.v(WEEX_TAG, msg);
    }
  }

  public static void w(String msg) {
    if (WXEnvironment.isApkDebugable() && msg != null) {
      Log.w(WEEX_TAG, msg);
    }
  }

  public static void e(String msg) {
    if (WXEnvironment.isApkDebugable() && msg != null) {
      Log.e(WEEX_TAG, msg);
    }
  }

  public static void d(String tag, String msg) {
    if (WXEnvironment.isApkDebugable() && msg != null) {
      Log.d(tag, msg);
    }
  }

  public static void info(String tag, String msg) {
    if (WXEnvironment.isApkDebugable() && msg != null) {
      Log.i(tag, msg);
    }
  }

  public static void v(String tag, String msg) {
    if (WXEnvironment.isApkDebugable() && msg != null) {
      Log.v(tag, msg);
    }
  }

  public static void w(String tag, String msg) {
    if (WXEnvironment.isApkDebugable() && msg != null) {
      Log.w(tag, msg);
    }
  }

  public static void e(String tag, String msg) {
    if (WXEnvironment.isApkDebugable() && msg != null) {
      Log.e(tag, msg);
    }
  }

  public static void p(String msg) {
    if (WXEnvironment.isApkDebugable() && msg != null) {
      Log.d(WEEX_PERF_TAG, msg);
    }
  }

  public static String getStackTrace(Exception e) {
    if (e == null) {
      return "";
    }
    StringWriter sw = null;
    PrintWriter pw = null;
    try {
      sw = new StringWriter();
      pw = new PrintWriter(sw);
      e.printStackTrace(pw);
      pw.flush();
      sw.flush();
    } finally {
      if (sw != null) {
        try {
          sw.close();
        } catch (IOException e1) {
          e1.printStackTrace();
        }
      }
      if (pw != null) {
        pw.close();
      }
    }
    return sw.toString();
  }
}
