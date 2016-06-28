/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.inspector.elements;

import com.taobao.weex.devtools.json.annotation.JsonValue;

public enum Origin {
  INJECTED("injected"),
  USER_AGENT("user-agent"),
  INSPECTOR("inspector"),
  REGULAR("regular");

  private final String mValue;

  Origin(String value) {
    mValue = value;
  }

  @JsonValue
  public String getProtocolValue() {
    return mValue;
  }
}
