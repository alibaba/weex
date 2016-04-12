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
package com.taobao.weex.ui.animation;

import android.util.Pair;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class WXAnimationBean {

  public final static String LINEAR = "linear";
  public final static String EASE_IN_OUT = "ease-in-out";
  public final static String EASE_IN = "ease-in";
  public final static String EASE_OUT = "ease-out";
  public long delay;
  public long duration;
  public String timingFunction;
  public Style styles;

  public static class Style {

    public final static String ANDROID_TRANSLATION_X = "translationX";
    public final static String ANDROID_TRANSLATION_Y = "translationY";
    public final static String ANDROID_ROTATION = "rotation";
    public final static String ANDROID_SCALE_X = "scaleX";
    public final static String ANDROID_SCALE_Y = "scaleY";
    public final static String WX_TRANSLATE = "translate";
    public final static String WX_TRANSLATE_X = "translateX";
    public final static String WX_TRANSLATE_Y = "translateY";
    public final static String WX_ROTATE = "rotate";
    public final static String WX_SCALE_X = "scaleX";
    public final static String WX_SCALE_Y = "scaleY";
    public final static String WX_SCALE = "scale";
    public final static String ALPHA = "alpha";
    public final static String BACKGROUND_COLOR = "backgroundColor";
    public final static String TOP = "top";
    public final static String BOTTOM = "bottom";
    public final static String RIGHT = "right";
    public final static String LEFT = "left";
    public final static String CENTER = "center";
    public static Map<String, List<String>> wxToAndroidMap = new HashMap<>();

    static {
      wxToAndroidMap.put(WX_TRANSLATE, Arrays.asList
          (ANDROID_TRANSLATION_X, ANDROID_TRANSLATION_Y));
      wxToAndroidMap.put(WX_TRANSLATE_X, Collections.singletonList(ANDROID_TRANSLATION_X));
      wxToAndroidMap.put(WX_TRANSLATE_Y, Collections.singletonList(ANDROID_TRANSLATION_Y));
      wxToAndroidMap.put(WX_ROTATE, Collections.singletonList(ANDROID_ROTATION));
      wxToAndroidMap.put(WX_SCALE, Arrays.asList(ANDROID_SCALE_X, ANDROID_SCALE_Y));
      wxToAndroidMap.put(WX_SCALE_X, Collections.singletonList(ANDROID_SCALE_X));
      wxToAndroidMap.put(WX_SCALE_Y, Collections.singletonList(ANDROID_SCALE_Y));
      wxToAndroidMap = Collections.unmodifiableMap(wxToAndroidMap);
    }

    public String opacity;
    public String backgroundColor;
    public String transform;
    public String transformOrigin;
    private Map<String, Float> transformMap = new HashMap<>();
    private Pair<Float, Float> pivot;

    public Map<String, Float> getTransformMap() {
      return transformMap;
    }

    public void setTransformMap(Map<String, Float> transformMap) {
      this.transformMap = transformMap;
    }

    public Pair<Float, Float> getPivot() {
      return pivot;
    }

    public void setPivot(Pair<Float, Float> pivot) {
      this.pivot = pivot;
    }
  }
}
