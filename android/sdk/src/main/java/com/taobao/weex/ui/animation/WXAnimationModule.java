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

import android.animation.Animator;
import android.animation.AnimatorListenerAdapter;
import android.animation.ArgbEvaluator;
import android.animation.ObjectAnimator;
import android.animation.PropertyValuesHolder;
import android.graphics.drawable.ColorDrawable;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.text.TextUtils;
import android.util.Pair;
import android.view.View;
import android.view.ViewGroup;
import android.view.animation.AccelerateDecelerateInterpolator;
import android.view.animation.AccelerateInterpolator;
import android.view.animation.DecelerateInterpolator;
import android.view.animation.Interpolator;
import android.view.animation.LinearInterpolator;

import com.alibaba.fastjson.JSONObject;
import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.WXSDKManager;
import com.taobao.weex.common.WXModule;
import com.taobao.weex.common.WXModuleAnno;
import com.taobao.weex.ui.component.WXComponent;
import com.taobao.weex.ui.view.WXBackgroundDrawable;
import com.taobao.weex.utils.FunctionParser;
import com.taobao.weex.utils.WXLogUtils;
import com.taobao.weex.utils.WXResourceUtils;
import com.taobao.weex.utils.WXViewUtils;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

public class WXAnimationModule extends WXModule {

  public static void applyTransformStyle(@Nullable Map<String, Object> style, WXComponent component) {
    if (component != null) {
      View target = component.getRealView();
      if (style != null && target != null) {
        Object transform = style.get("transform");
        if (transform instanceof String && !TextUtils.isEmpty((String) transform) && target.getLayoutParams() != null) {
          String transformOrigin;
          try {
            transformOrigin = (String) component.mDomObj.style.get(
                "transformOrigin");
          } catch (NullPointerException e) {
            transformOrigin = null;
          }
          WXAnimationBean animationBean = new WXAnimationBean();
          animationBean.styles = new WXAnimationBean.Style();
          animationBean.styles.setPivot(
              WXAnimationModule.parsePivot(transformOrigin, target.getLayoutParams()));
          animationBean.styles.setTransformMap(
              WXAnimationModule.parseTransForm((String) transform, target.getLayoutParams()));
          Animator animator = WXAnimationModule.createAnimator(animationBean, target);
          if (animator != null) {
            animator.setDuration(0);
            animator.start();
          }
        }
      }
    }
  }

  public static
  @Nullable
  WXAnimationBean parseAnimation(@Nullable String animation,
                                 ViewGroup.LayoutParams layoutParams) {
    try {
      WXAnimationBean animationBean =
          JSONObject.parseObject(animation, WXAnimationBean.class);
      if (animationBean != null && animationBean.styles != null) {
        WXAnimationBean.Style style = animationBean.styles;
        style.setTransformMap(parseTransForm(style.transform, layoutParams));
        style.setPivot(parsePivot(style.transformOrigin, layoutParams));
      }
      return animationBean;
    } catch (RuntimeException e) {
      WXLogUtils.e(WXLogUtils.getStackTrace(e));
      return null;
    }
  }

  public static
  @Nullable
  ObjectAnimator createAnimator(@NonNull WXAnimationBean animation, @NonNull View target) {
    WXAnimationBean.Style style = animation.styles;
    if (style != null) {
      ObjectAnimator animator;
      List<PropertyValuesHolder> holders = new LinkedList<>();
      if (style.getTransformMap() != null) {
        if (style.getTransformMap().isEmpty()) {
          holders.addAll(moveBackToOrigin());
        } else {
          for (Map.Entry<String, Float> entry : style.getTransformMap().entrySet()) {
            holders.add(PropertyValuesHolder.ofFloat(entry.getKey(), entry.getValue()));
          }
        }
      }
      if (!TextUtils.isEmpty(style.opacity)) {
        holders.add(PropertyValuesHolder.ofFloat(WXAnimationBean.Style.ALPHA,
                                                 Float.valueOf(style.opacity)));
      }
      //TODO add a wrapper class of view to not flush out the border
      if (!TextUtils.isEmpty(style.backgroundColor)) {
        if (target.getBackground() instanceof WXBackgroundDrawable) {
          holders.add(PropertyValuesHolder.ofObject(
              WXAnimationBean.Style.BACKGROUND_COLOR, new ArgbEvaluator(),
              ((WXBackgroundDrawable) target.getBackground()).getColor(),
              WXResourceUtils.getColor(style.backgroundColor)));
        } else if (target.getBackground() instanceof ColorDrawable) {
          holders.add(PropertyValuesHolder.ofObject(
              WXAnimationBean.Style.BACKGROUND_COLOR, new ArgbEvaluator(),
              ((ColorDrawable) target.getBackground()).getColor(),
              WXResourceUtils.getColor(style.backgroundColor)));
        }
      }
      if (style.getPivot() != null) {
        Pair<Float, Float> pair = style.getPivot();
        target.setPivotX(pair.first);
        target.setPivotY(pair.second);
      }
      animator = ObjectAnimator.ofPropertyValuesHolder(
          target, holders.toArray(new PropertyValuesHolder[holders.size()]));
      animator.setStartDelay(animation.delay);
      return animator;
    } else {
      return null;
    }
  }

  public static
  @Nullable
  Animator.AnimatorListener createAnimatorListener(final WXSDKInstance mWXSDKInstance, @Nullable final String callBack) {
    if (!TextUtils.isEmpty(callBack)) {
      return new AnimatorListenerAdapter() {
        @Override
        public void onAnimationEnd(Animator animation) {
          if (mWXSDKInstance == null) {
            WXLogUtils.e("WXRenderStatement-onAnimationEnd mWXSDKInstance == null NPE");
          } else {
            WXSDKManager.getInstance().callback(mWXSDKInstance.getInstanceId(),
                                                callBack,
                                                new HashMap<String, Object>());
          }
        }
      };
    } else {
      return null;
    }
  }

  public static
  @Nullable
  Interpolator createTimeInterpolator(@NonNull WXAnimationBean animation) {
    String interpolator = animation.timingFunction;
    if (!TextUtils.isEmpty(interpolator)) {
      switch (interpolator) {
        case WXAnimationBean.EASE_IN:
          return new AccelerateInterpolator();
        case WXAnimationBean.EASE_OUT:
          return new DecelerateInterpolator();
        case WXAnimationBean.EASE_IN_OUT:
          return new AccelerateDecelerateInterpolator();
        case WXAnimationBean.LINEAR:
          return new LinearInterpolator();
        //TODO Add PathInterpolator to support cubic-bezier curve
      }
    }
    return null;
  }

  private static Map<String, Float> parseTransForm(@Nullable String rawTransform, final ViewGroup.LayoutParams layoutParams) {
    if (!TextUtils.isEmpty(rawTransform)) {
      FunctionParser<Float> parser = new FunctionParser<>
          (rawTransform, new FunctionParser.Mapper<Float>() {
            @Override
            public Map<String, Float> map(String functionName, List<String> raw) {
              Map<String, Float> result = new HashMap<>();
              if (raw != null && !raw.isEmpty()) {
                if (WXAnimationBean.Style.wxToAndroidMap.containsKey(functionName)) {
                  result.putAll(convertParam(
                      layoutParams, WXAnimationBean.Style.wxToAndroidMap.get(functionName),
                      raw));
                }
              }
              return result;
            }

          });
      return parser.parse();
    }
    return new LinkedHashMap<>();
  }

  private static String parsePercentOrPx(String raw, int unit) {
    String lower = raw.toLowerCase();
    if (lower.endsWith("%")) {
      return parsePercent(raw, unit);
    } else if (lower.endsWith("px")) {
      return Float.toString(WXViewUtils.getRealPxByWidth(Float.parseFloat(raw.replace("px", ""))));
    }
    return Float.toString(WXViewUtils.getRealPxByWidth(Float.parseFloat(raw)));
  }

  private static String parsePercent(String percent, int unit) {
    return Float.toString(Float.parseFloat(percent.replace("%", "")) / 100 * unit);
  }

  private static Pair<Float, Float> parsePivot(@Nullable String transformOrigin,
                                               ViewGroup.LayoutParams layoutParams) {
    String[] split;
    List<String> list;
    if (!TextUtils.isEmpty(transformOrigin) &&
        ((split = transformOrigin.split("\\s+")).length >= 2)) {
      list = Arrays.asList(split).subList(0, 2);
      return parsePivot(list, layoutParams);
    } else {
      return parsePivot(Arrays.asList(WXAnimationBean.Style.CENTER,
                                      WXAnimationBean.Style.CENTER), layoutParams);
    }
  }

  private static Pair<Float, Float> parsePivot(@NonNull List<String> list, ViewGroup.LayoutParams layoutParams) {
    return new Pair<>(
        parsePivotX(list.get(0), layoutParams), parsePivotY(list.get(1), layoutParams));
  }

  private static float parsePivotX(String x, ViewGroup.LayoutParams layoutParams) {
    String value = x;
    if (TextUtils.equals(x, WXAnimationBean.Style.LEFT)) {
      value = "0%";
    } else if (TextUtils.equals(x, WXAnimationBean.Style.RIGHT)) {
      value = "100%";
    } else if (TextUtils.equals(x, WXAnimationBean.Style.CENTER)) {
      value = "50%";
    }
    value = parsePercentOrPx(value, layoutParams.width);
    return Float.parseFloat(value);
  }

  private static float parsePivotY(String y, ViewGroup.LayoutParams layoutParams) {
    String value = y;
    if (TextUtils.equals(y, WXAnimationBean.Style.TOP)) {
      value = "0%";
    } else if (TextUtils.equals(y, WXAnimationBean.Style.BOTTOM)) {
      value = "100%";
    } else if (TextUtils.equals(y, WXAnimationBean.Style.CENTER)) {
      value = "50%";
    }
    value = parsePercentOrPx(value, layoutParams.height);
    return Float.parseFloat(value);
  }

  private static Map<String, Float> convertParam(ViewGroup.LayoutParams layoutParams,
                                                 @NonNull List<String> nameSet,
                                                 @NonNull List<String> rawValue) {
    Map<String, Float> result = new HashMap<>();
    List<String> convertedList = new ArrayList<>();
    if (nameSet.contains(WXAnimationBean.Style.ANDROID_ROTATION)) {
      convertedList.addAll(parseRotation(rawValue));
    } else if (nameSet.contains(WXAnimationBean.Style.ANDROID_TRANSLATION_X) ||
               nameSet.contains(WXAnimationBean.Style.ANDROID_TRANSLATION_Y)) {
      convertedList.addAll(parseTranslation(nameSet, layoutParams, rawValue));
    } else if (nameSet.contains(WXAnimationBean.Style.ANDROID_SCALE_X) ||
               nameSet.contains(WXAnimationBean.Style.ANDROID_SCALE_Y)) {
      convertedList.addAll(parseScale(nameSet.size(), rawValue));
    }
    if (nameSet.size() == convertedList.size()) {
      for (int i = 0; i < nameSet.size(); i++) {
        result.put(nameSet.get(i), Float.parseFloat(convertedList.get(i)));
      }
    }
    return result;
  }

  private static List<String> parseTranslation(List<String> nameSet, ViewGroup.LayoutParams layoutParams,
                                               @NonNull List<String> rawValue) {
    List<String> convertedList = new ArrayList<>();
    String first = rawValue.get(0);
    if (nameSet.size() == 1) {
      parseSingleTranslation(nameSet, layoutParams, convertedList, first);
    } else {
      parseDoubleTranslation(layoutParams, rawValue, convertedList, first);
    }
    return convertedList;
  }

  private static void parseSingleTranslation(List<String> nameSet, ViewGroup.LayoutParams layoutParams,
                                             List<String> convertedList, String first) {
    if (nameSet.contains(WXAnimationBean.Style.ANDROID_TRANSLATION_X)) {
      convertedList.add(parsePercentOrPx(first, layoutParams.width));
    } else if (nameSet.contains(WXAnimationBean.Style.ANDROID_TRANSLATION_Y)) {
      convertedList.add(parsePercentOrPx(first, layoutParams.height));
    }
  }

  private static void parseDoubleTranslation(ViewGroup.LayoutParams layoutParams,
                                             @NonNull List<String> rawValue,
                                             List<String> convertedList, String first) {
    String second;
    if (rawValue.size() == 1) {
      second = first;
    } else {
      second = rawValue.get(1);
    }
    if (layoutParams != null) {
      convertedList.add(parsePercentOrPx(first, layoutParams.width));
      convertedList.add(parsePercentOrPx(second, layoutParams.height));
    }
  }

  private static List<String> parseScale(int size, @NonNull List<String> rawValue) {
    List<String> convertedList = new ArrayList<>();
    convertedList.addAll(rawValue);
    if (size != 1 && rawValue.size() == 1) {
      convertedList.addAll(rawValue);
    }
    return convertedList;
  }

  private static List<String> parseRotation(@NonNull List<String> rawValue) {
    List<String> convertedList = new ArrayList<>();
    String lower;
    for (String raw : rawValue) {
      lower = raw.toLowerCase();
      if (lower.endsWith("deg")) {
        convertedList.add(lower.replace("deg", ""));
      } else {
        convertedList.add(Double.valueOf(Math.toDegrees(Double.parseDouble(raw))).toString());
      }
    }
    return convertedList;
  }

  private static List<PropertyValuesHolder> moveBackToOrigin() {
    List<PropertyValuesHolder> holders = new LinkedList<>();
    holders.add(PropertyValuesHolder.ofFloat(WXAnimationBean.Style.ANDROID_TRANSLATION_X, 0));
    holders.add(PropertyValuesHolder.ofFloat(WXAnimationBean.Style.ANDROID_TRANSLATION_Y, 0));
    holders.add(PropertyValuesHolder.ofFloat(WXAnimationBean.Style.ANDROID_SCALE_X, 1));
    holders.add(PropertyValuesHolder.ofFloat(WXAnimationBean.Style.ANDROID_SCALE_Y, 1));
    holders.add(PropertyValuesHolder.ofFloat(WXAnimationBean.Style.ANDROID_ROTATION, 0));
    return holders;
  }

  @WXModuleAnno
  public void transition(String ref, String animation, String callBack) {
    WXSDKManager.getInstance().getWXRenderManager().
        startAnimation(mWXSDKInstance.getInstanceId(), ref, animation, callBack);
  }
}
