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
package com.taobao.weex.dom;

import android.graphics.Paint;
import android.graphics.Typeface;
import android.text.TextPaint;
import android.text.style.MetricAffectingSpan;

import java.util.HashMap;
import java.util.Map;

class WXCustomStyleSpan extends MetricAffectingSpan {

  private static final Map<String, Typeface> sTypefaceCache = new HashMap<String, Typeface>();

  private final int mStyle;
  private final int mWeight;
  private final String mFontFamily;

  public WXCustomStyleSpan(int fontStyle, int fontWeight, String fontFamily) {
    mStyle = fontStyle;
    mWeight = fontWeight;
    mFontFamily = fontFamily;
  }

  @Override
  public void updateDrawState(TextPaint ds) {
    apply(ds, mStyle, mWeight, mFontFamily);
  }

  private static void apply(Paint paint, int style, int weight, String family) {
    int oldStyle;
    Typeface typeface = paint.getTypeface();
    if (typeface == null) {
      oldStyle = 0;
    } else {
      oldStyle = typeface.getStyle();
    }

    int want = 0;
    if ((weight == Typeface.BOLD)
        || ((oldStyle & Typeface.BOLD) != 0 && weight == WXTextDomObject.UNSET)) {
      want |= Typeface.BOLD;
    }

    if ((style == Typeface.ITALIC)
        || ((oldStyle & Typeface.ITALIC) != 0 && style == WXTextDomObject.UNSET)) {
      want |= Typeface.ITALIC;
    }

    if (family != null) {
      typeface = getOrCreateTypeface(family, want);
    }

    if (typeface != null) {
      paint.setTypeface(Typeface.create(typeface, want));
    } else {
      paint.setTypeface(Typeface.defaultFromStyle(want));
    }
  }

  private static Typeface getOrCreateTypeface(String family, int style) {
    if (sTypefaceCache.get(family) != null) {
      return sTypefaceCache.get(family);
    }

    Typeface typeface = Typeface.create(family, style);
    sTypefaceCache.put(family, typeface);
    return typeface;
  }

  @Override
  public void updateMeasureState(TextPaint paint) {
    apply(paint, mStyle, mWeight, mFontFamily);
  }

  /**
   * Returns {@link Typeface#NORMAL} or {@link Typeface#ITALIC}.
   */
  public int getStyle() {
    return (mStyle == WXTextDomObject.UNSET ? 0 : mStyle);
  }

  /**
   * Returns {@link Typeface#NORMAL} or {@link Typeface#BOLD}.
   */
  public int getWeight() {
    return (mWeight == WXTextDomObject.UNSET ? 0 : mWeight);
  }

  /**
   * Returns the font family set for this StyleSpan.
   */
  public String getFontFamily() {
    return mFontFamily;
  }
}
