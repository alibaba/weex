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

import android.content.Context;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

public class WXFileUtils {

  /**
   * Load file in asset directory.
   * @param path FilePath
   * @param context Weex Context
   * @return the Content of the file
   */
  public static String loadFileContent(String path, Context context) {
    StringBuilder builder = new StringBuilder();
    try {
      InputStream in = context.getAssets().open(path);
      BufferedReader localBufferedReader = new BufferedReader(new InputStreamReader(in));
      char[] data = new char[2048];
      int len = -1;
      while ((len = localBufferedReader.read(data)) > 0) {
        builder.append(data, 0, len);
      }
      localBufferedReader.close();
      if (in != null) {
        try {
          in.close();
        } catch (IOException e) {
          WXLogUtils.e("WXFileUtils loadFileContent: " + WXLogUtils.getStackTrace(e));
        }
      }
    } catch (IOException e) {
      e.printStackTrace();
    }
    return builder.toString();
  }
}
