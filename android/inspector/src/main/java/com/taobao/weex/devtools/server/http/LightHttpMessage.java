/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.server.http;

import android.support.annotation.Nullable;

import java.util.ArrayList;

public class LightHttpMessage {
  public final ArrayList<String> headerNames = new ArrayList<>();
  public final ArrayList<String> headerValues = new ArrayList<>();

  public void addHeader(String name, String value) {
    headerNames.add(name);
    headerValues.add(value);
  }

  @Nullable
  public String getFirstHeaderValue(String name) {
    for (int i = 0, N = headerNames.size(); i < N; i++) {
      if (name.equals(headerNames.get(i))) {
        return headerValues.get(i);
      }
    }
    return null;
  }

  public void reset() {
    headerNames.clear();
    headerValues.clear();
  }
}
