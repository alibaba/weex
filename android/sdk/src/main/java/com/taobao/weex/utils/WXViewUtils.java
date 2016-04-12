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

import android.view.View;
import android.view.ViewGroup.LayoutParams;

import com.taobao.weex.WXEnvironment;
import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.WXSDKManager;

/**
 * Utility class for views
 */
public class WXViewUtils {

  /**
   * System chooses a format that supports translucency (many alpha bits)
   */
  public static final int TRANSLUCENT = -3;

  /**
   * System chooses a format that supports transparency (at least 1 alpha bit)
   */
  public static final int TRANSPARENT = -2;
  /**
   * System chooses an opaque format (no alpha bits required)
   */
  public static final int OPAQUE = -1;
  private static final boolean mUseWebPx = false;

  public static int getWeexHeight(String instanceId) {
    WXSDKInstance instance = WXSDKManager.getInstance().getSDKInstance(instanceId);
    if (instance != null) {
      int weexHeight = instance.getWeexHeight();
      if (weexHeight >= 0 || weexHeight == -2) {
        return weexHeight;
      }
      return getScreenHeight();
    }
    return -3;
  }

  public static int getScreenHeight() {
    return WXEnvironment.sApplication.getResources().getDisplayMetrics().heightPixels;
  }

  public static int getWeexWidth(String instanceId) {
    WXSDKInstance instance = WXSDKManager.getInstance().getSDKInstance(instanceId);
    if (instance != null) {
      int weexWidth = instance.getWeexWidth();
      if (weexWidth >= 0 || weexWidth == -2) {
        return weexWidth;
      }
      return getScreenWidth();
    }
    return -3;
  }

  public static int getScreenWidth() {
    return WXEnvironment.sApplication.getResources().getDisplayMetrics().widthPixels;
  }

  /**
   * Convert distance from JS,CSS to native. As the JS considers the width of the screen is 750px.
   * There must be a transform when accessing distance from JS,CSS and use it.
   * Basically, this method calculates a scale factor(ScreenWidth/750) and use apply this scale
   * factor to JS,CSS distance.
   * @param pxValue the raw distance from JS or CSS. The result will be rounded to a closet int.
   * @return the actual distance in the screen.
   */
  public static float getRealPxByWidth(float pxValue) {
    if (Float.isNaN(pxValue)) {
      return pxValue;
    }
    if (mUseWebPx) {
      return (float) Math.rint(pxValue);
    } else {
      float realPx = (pxValue * getScreenWidth() / WXEnvironment.sDeafultWidth);
      return realPx > 0.005 && realPx < 1 ? 1 : (float) Math.rint(realPx);
    }
  }

  public static int getRealPxByWidth2(float pxValue) {
    if (mUseWebPx) {
      return (int) pxValue;
    } else {
      float realPx = (pxValue * getScreenWidth() / WXEnvironment.sDeafultWidth);
      return realPx > 0.005 && realPx < 1 ? 1 : (int) realPx - 1;
    }
  }

  /**
   * Convert distance from native to JS,CSS. As the JS considers the width of the screen is 750px.
   * There must be a transform when return distance to JS,CSS.
   * Basically, this method calculates a scale factor(ScreenWidth/750) and use apply this scale
   * factor to native distance.
   * @param pxValue the raw distance of native. The result will be rounded to a closet int.
   * @return the distance in JS,CSS where the screenWidth is 750 px.
   */
  public static float getWebPxByWidth(float pxValue) {
    if (pxValue < -1.9999 && pxValue > -2.005) {
      return Float.NaN;
    }
    if (mUseWebPx) {
      return pxValue;
    } else {
      float realPx = (pxValue * WXEnvironment.sDeafultWidth / getScreenWidth());
      return realPx > 0.005 && realPx < 1 ? 1 : realPx;
    }
  }


  /**
   * Convert dp to px
   * @param dpValue the dp value to be converted
   * @return the px value
   */
  public static int dip2px(float dpValue) {
    float scale = 2;
    try {
      scale = WXEnvironment.getApplication().getResources()
          .getDisplayMetrics().density;
    } catch (Exception e) {
      WXLogUtils.e("[WXViewUtils] dip2px:" + WXLogUtils.getStackTrace(e));
    }
    float finalPx = (dpValue * scale + 0.5f);
    return finalPx > 0 && finalPx < 1 ? 1 : (int) finalPx;
  }

  public static boolean onScreenArea(View view) {
    if (view == null || view.getVisibility() != View.VISIBLE) {
      return false;
    }

    int[] p = new int[2];
    view.getLocationOnScreen(p);
    LayoutParams lp = view.getLayoutParams();
    int viewH = 0;
    if (lp != null) {
      viewH = lp.height;
    } else {
      viewH = view.getHeight();
    }

    return (p[1] > 0 && (p[1] - WXViewUtils.getScreenHeight() < 0))
           || (viewH + p[1] > 0 && p[1] <= 0);
  }

  /**
   * Multiplies the color with the given alpha.
   *
   * @param color color to be multiplied
   * @param alpha value between 0 and 255
   * @return multiplied color
   */
  public static int multiplyColorAlpha(int color, int alpha) {
    if (alpha == 255) {
      return color;
    }
    if (alpha == 0) {
      return color & 0x00FFFFFF;
    }
    alpha = alpha + (alpha >> 7); // make it 0..256
    int colorAlpha = color >>> 24;
    int multipliedAlpha = colorAlpha * alpha >> 8;
    return (multipliedAlpha << 24) | (color & 0x00FFFFFF);
  }

  public static int getOpacityFromColor(int color) {
    int colorAlpha = color >>> 24;
    if (colorAlpha == 255) {
      return OPAQUE;
    } else if (colorAlpha == 0) {
      return TRANSPARENT;
    } else {
      return TRANSLUCENT;
    }
  }
}
