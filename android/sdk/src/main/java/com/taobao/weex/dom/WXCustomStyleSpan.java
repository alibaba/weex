/**
 * Copyright (c) 2015-present, Facebook, Inc. All rights reserved.
 * <p/>
 * This source code is licensed under the BSD-style license found in the LICENSE file in the root
 * directory of this source tree. An additional grant of patent rights can be found in the PATENTS
 * file in the same directory.
 */
package com.taobao.weex.dom;

import android.graphics.Typeface;
import android.text.TextPaint;
import android.text.style.MetricAffectingSpan;
import com.taobao.weex.utils.TypefaceUtil;

public class WXCustomStyleSpan extends MetricAffectingSpan {

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
    TypefaceUtil.applyFontStyle(ds, mStyle, mWeight, mFontFamily);
  }

  @Override
  public void updateMeasureState(TextPaint paint) {
    TypefaceUtil.applyFontStyle(paint, mStyle, mWeight, mFontFamily);
  }

  /**
   * Returns {@link Typeface#NORMAL} or {@link Typeface#ITALIC}.
   */
  public int getStyle() {
    return (mStyle == WXStyle.UNSET ? 0 : mStyle);
  }

  /**
   * Returns {@link Typeface#NORMAL} or {@link Typeface#BOLD}.
   */
  public int getWeight() {
    return (mWeight == WXStyle.UNSET ? 0 : mWeight);
  }

  /**
   * Returns the font family set for this StyleSpan.
   */
  public String getFontFamily() {
    return mFontFamily;
  }
}
