/*
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
package org.apache.weex.extend.adapter;

import android.text.TextUtils;

import com.taobao.weex.adapter.IWXAccessibilityRoleAdapter;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

/**
 * Created by moxun on 2017/11/13.
 */

public class DefaultAccessibilityRoleAdapter implements IWXAccessibilityRoleAdapter {
  private static Map<String, String> ENRoles = new HashMap<>();

  static {
    ENRoles.put("button", "Button");
    ENRoles.put("link", "HyperLink");
    ENRoles.put("img", "Picture");
    ENRoles.put("search", "Search");
    ENRoles.put("header", "Title");
  }

  @Override
  public String getRole(String key) {
    if (isEN()) {
      String enRole = ENRoles.get(key);
      if (!TextUtils.isEmpty(enRole)) {
        return enRole;
      }
    }
    return key;
  }

  private static boolean isEN() {
    try {
      return "EN".equals(Locale.getDefault().getCountry());
    } catch (Throwable t) {
    }
    return false;
  }
}
