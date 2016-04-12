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
package com.taobao.weex.ui.view.gesture;

public interface WXGestureType {

  enum LowLevelGesture implements WXGestureType {
    ACTION_DOWN("touchstart"),
    ACTION_MOVE("touchmove"),
    ACTION_UP("touchend"),
    ACTION_CANCEL("touchcancel");
    private String description;

    LowLevelGesture(String description) {
      this.description = description;
    }

    @Override
    public String toString() {
      return description;
    }
  }

  enum HighLevelGesture implements WXGestureType {
    SWIPE("swipe"),
    LONG_PRESS("longpress"),
    PAN_START("panstart"),
    PAN_MOVE("panmove"),
    PAN_END("panend");
    private String description;

    HighLevelGesture(String description) {
      this.description = description;
    }

    @Override
    public String toString() {
      return description;
    }
  }

  class GestureInfo {

    public static final String HISTORICAL_XY = "changedTouches";
    public static final String PAGE_X = "pageX";
    public static final String PAGE_Y = "pageY";
    public static final String SCREEN_X = "screenX";
    public static final String SCREEN_Y = "screenY";
    public static final String POINTER_ID = "identifier";
    public static final String DIRECTION = "direction";
  }
}
