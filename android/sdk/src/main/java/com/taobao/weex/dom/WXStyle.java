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

import com.taobao.weex.common.WXDomPropConstant;
import com.taobao.weex.dom.flex.CSSAlign;
import com.taobao.weex.dom.flex.CSSFlexDirection;
import com.taobao.weex.dom.flex.CSSJustify;
import com.taobao.weex.dom.flex.CSSPositionType;
import com.taobao.weex.dom.flex.CSSWrap;
import com.taobao.weex.ui.component.WXText;
import com.taobao.weex.ui.component.WXTextDecoration;
import com.taobao.weex.utils.WXUtils;
import com.taobao.weex.utils.WXViewUtils;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Store value of component style
 *
 */
public class WXStyle extends ConcurrentHashMap<String, Object> {

  private static final long serialVersionUID = 611132641365274134L;

  /*
   * text-decoration
   **/
  public static WXTextDecoration getTextDecoration(Map<String, Object> style) {
    Object obj = style.get(WXDomPropConstant.WX_TEXTDECORATION);
    if (obj == null) {
      return WXTextDecoration.NONE;
    }
    String textDecoration = obj.toString();
    if (textDecoration.equals("underline")) {
      return WXTextDecoration.UNDERLINE;
    }
    if (textDecoration.equals("line-through")) {
      return WXTextDecoration.LINETHROUGH;
    }
    return WXTextDecoration.NONE;
  }

  public static String getTextColor(Map<String, Object> style) {
    if (style == null) {
      return "";
    }
    Object temp = style.get(WXDomPropConstant.WX_COLOR);
    return temp == null ? "" : temp.toString();
  }

  public static int getFontWeight(Map<String, Object> style) {
    int typeface = android.graphics.Typeface.NORMAL;
    if (style == null) {
      return typeface;
    }
    Object temp = style.get(WXDomPropConstant.WX_FONTWEIGHT);
    if (temp == null) {
      return typeface;
    }
    String fontWeight = temp.toString();
    if (fontWeight.equals(WXDomPropConstant.WX_FONTWEIGHT_BOLD)) {
      typeface = android.graphics.Typeface.BOLD;
    }
    return typeface;
  }

  public static int getFontStyle(Map<String, Object> style) {
    int typeface = android.graphics.Typeface.NORMAL;
    if (style == null) {
      return typeface;
    }
    Object temp = style.get(WXDomPropConstant.WX_FONTSTYLE);
    if (temp == null) {
      return typeface;
    }
    String fontWeight = temp.toString();
    if (fontWeight.equals(WXDomPropConstant.WX_FONTSTYLE_ITALIC)) {
      typeface = android.graphics.Typeface.ITALIC;
    }
    return typeface;
  }

  public static int getFontSize(Map<String, Object> style) {
    if (style == null) {
      return (int) WXViewUtils.getRealPxByWidth(WXText.sDEFAULT_SIZE);
    }
    int fontSize = WXUtils.getInt(style.get(WXDomPropConstant.WX_FONTSIZE));
    if (fontSize <= 0) {
      fontSize = WXText.sDEFAULT_SIZE;
    }
    return (int) WXViewUtils.getRealPxByWidth(fontSize);
  }

  public static String getFontFamily(Map<String, Object> style) {
    String fontFamily = null;
    if (style != null) {
      Object temp;
      temp = style.get(WXDomPropConstant.WX_FONTFAMILY);
      if (temp != null) {
        fontFamily = temp.toString();
      }
    }
    return fontFamily;
  }

  public static int getLines(Map<String, Object> style) {
    return WXUtils.getInt(style.get(WXDomPropConstant.WX_LINES));
  }

  /*
   * flexbox
   **/
  public CSSAlign getAlignItems() {
    Object alignItems = get(WXDomPropConstant.WX_ALIGNITEMS);
    if (alignItems == null) {
      return CSSAlign.STRETCH;
    }
    return CSSAlignConvert.convert2AlignItems(alignItems.toString().trim());
  }

  public CSSAlign getAlignSelf() {
    Object alignSelf = get(WXDomPropConstant.WX_ALIGNSELF);
    if (alignSelf == null) {
      return CSSAlign.AUTO;
    }
    return CSSAlignConvert.convert2AlignSelf(alignSelf.toString().trim());
  }

  public float getFlex() {
    return WXUtils.getFloat(get(WXDomPropConstant.WX_FLEX));
  }

  public CSSFlexDirection getFlexDirection() {
    Object flexDirection = get(WXDomPropConstant.WX_FLEXDIRECTION);
    if (flexDirection == null) {
      return CSSFlexDirection.COLUMN;
    }
    return CSSFlexDirectionConvert.convert(flexDirection.toString().trim());
  }

  public CSSJustify getJustifyContent() {
    Object justifyContent = get(WXDomPropConstant.WX_JUSTIFYCONTENT);
    if (justifyContent == null) {
      return CSSJustify.FLEX_START;
    }
    return CSSJustifyConvert.convert(justifyContent.toString().trim());
  }

  public CSSWrap getCSSWrap() {
    Object cssWrap = get(WXDomPropConstant.WX_FLEXWRAP);
    if (cssWrap == null) {
      return CSSWrap.NOWRAP;
    }
    return CSSWrapConvert.convert(cssWrap.toString().trim());
  }

  /*
   * base
   **/
  public float getWidth() {
    return WXUtils.getFloat(get(WXDomPropConstant.WX_WIDTH));
  }

  public float getMinWidth() {
    return WXUtils.getFloat(get(WXDomPropConstant.WX_MINWIDTH));
  }

  public float getMaxWidth() {
    return WXUtils.getFloat(get(WXDomPropConstant.WX_MAXWIDTH));
  }

  public float getHeight() {
    return WXUtils.getFloat(get(WXDomPropConstant.WX_HEIGHT));
  }

  public float getMinHeight() {
    return WXUtils.getFloat(get(WXDomPropConstant.WX_MINHEIGHT));
  }

  public float getMaxHeight() {
    return WXUtils.getFloat(get(WXDomPropConstant.WX_MAXHEIGHT));
  }

  /*
   * border
   **/
  public float getBorderRadius() {
    float temp = WXUtils.getFloat(get(WXDomPropConstant.WX_BORDERRADIUS));
    if (WXUtils.isUndefined(temp)) {
      return Float.NaN;
    }
    return temp;
  }

  public float getBorderTopWidth() {
    return getBorderWidth(WXDomPropConstant.WX_BORDER_TOP_WIDTH);
  }

  private float getBorderWidth(String key) {
    float temp = WXUtils.getFloat(get(key));
    if (WXUtils.isUndefined(temp)) {
      return getBorderWidth();
    }
    return temp;
  }

  //TODO fix : only when set backgroundColor
  public float getBorderWidth() {
    float temp = WXUtils.getFloat(get(WXDomPropConstant.WX_BORDERWIDTH));
    if (WXUtils.isUndefined(temp)) {
      return Float.NaN;
    }
    return temp;
  }

  public float getBorderRightWidth() {
    return getBorderWidth(WXDomPropConstant.WX_BORDER_RIGHT_WIDTH);
  }

  public float getBorderBottomWidth() {
    return getBorderWidth(WXDomPropConstant.WX_BORDER_BOTTOM_WIDTH);
  }

  public float getBorderLeftWidth() {
    return getBorderWidth(WXDomPropConstant.WX_BORDER_LEFT_WIDTH);
  }

  public String getBorderColor() {
    Object color = get(WXDomPropConstant.WX_BORDERCOLOR);
    return color == null ? null : color.toString();
  }

  public String getBorderStyle() {
    Object borderStyle = get(WXDomPropConstant.WX_BORDERSTYLE);
    return borderStyle == null ? null : borderStyle.toString();
  }

  /*
   * margin
   **/
  public float getMarginTop() {
    float temp = WXUtils.getFloat(get(WXDomPropConstant.WX_MARGINTOP));
    if (WXUtils.isUndefined(temp)) {
      temp = WXUtils.getFloat(get(WXDomPropConstant.WX_MARGIN));
    }
    return temp;
  }

  public float getMarginLeft() {
    float temp = WXUtils.getFloat(get(WXDomPropConstant.WX_MARGINLEFT));
    if (WXUtils.isUndefined(temp)) {
      temp = WXUtils.getFloat(get(WXDomPropConstant.WX_MARGIN));
    }
    return temp;
  }

  public float getMarginRight() {
    float temp = WXUtils.getFloat(get(WXDomPropConstant.WX_MARGINRIGHT));
    if (WXUtils.isUndefined(temp)) {
      temp = WXUtils.getFloat(get(WXDomPropConstant.WX_MARGIN));
    }
    return temp;
  }

  public float getMarginBottom() {
    float temp = WXUtils.getFloat(get(WXDomPropConstant.WX_MARGINBOTTOM));
    if (WXUtils.isUndefined(temp)) {
      temp = WXUtils.getFloat(get(WXDomPropConstant.WX_MARGIN));
    }
    return temp;
  }

  /*
   * padding
   **/
  public float getPaddingTop() {
    float temp = WXUtils.getFloat(get(WXDomPropConstant.WX_PADDINGTOP));
    if (WXUtils.isUndefined(temp)) {
      temp = WXUtils.getFloat(get(WXDomPropConstant.WX_PADDING));
    }
    return temp;
  }

  public float getPaddingLeft() {
    float temp = WXUtils.getFloat(get(WXDomPropConstant.WX_PADDINGLEFT));
    if (WXUtils.isUndefined(temp)) {
      temp = WXUtils.getFloat(get(WXDomPropConstant.WX_PADDING));
    }
    return temp;
  }

  public float getPaddingRight() {
    float temp = WXUtils.getFloat(get(WXDomPropConstant.WX_PADDINGRIGHT));
    if (WXUtils.isUndefined(temp)) {
      temp = WXUtils.getFloat(get(WXDomPropConstant.WX_PADDING));
    }
    return temp;
  }

  public float getPaddingBottom() {
    float temp = WXUtils.getFloat(get(WXDomPropConstant.WX_PADDINGBOTTOM));
    if (WXUtils.isUndefined(temp)) {
      temp = WXUtils.getFloat(get(WXDomPropConstant.WX_PADDING));
    }
    return temp;
  }

  /*
   * position
   **/
  public CSSPositionType getPosition() {
    Object position = get(WXDomPropConstant.WX_POSITION);
    if (position == null) {
      return CSSPositionType.RELATIVE;
    }
    return CSSPositionTypeConvert.convert(position.toString().trim());
  }

  public boolean isSticky() {
    Object position = get(WXDomPropConstant.WX_POSITION);
    if (position == null) {
      return false;
    }
    return position.toString().equals(WXDomPropConstant.WX_POSITION_STICKY);
  }

  public boolean isFixed() {
    Object position = get(WXDomPropConstant.WX_POSITION);
    if (position == null) {
      return false;
    }
    return position.toString().equals(WXDomPropConstant.WX_POSITION_FIXED);
  }

  public float getLeft() {
    return WXUtils.getFloat(get(WXDomPropConstant.WX_POSITION_LFET));
  }

  public float getTop() {
    return WXUtils.getFloat(get(WXDomPropConstant.WX_POSITION_TOP));
  }

  public float getRight() {
    return WXUtils.getFloat(get(WXDomPropConstant.WX_POSITION_RIGHT));
  }

  public float getBottom() {
    return WXUtils.getFloat(get(WXDomPropConstant.WX_POSITION_BOTTOM));
  }

  /*
   * others
   **/
  public String getBackgroundColor() {
    Object temp = get(WXDomPropConstant.WX_BACKGROUNDCOLOR);
    return temp == null ? "" : temp.toString();
  }

  public int getTimeFontSize() {
    int fontSize = WXUtils.getInt(get("timeFontSize"));
    if (fontSize <= 0) {
      fontSize = WXText.sDEFAULT_SIZE;
    }
    return fontSize;
  }

  public float getOpacity() {
    Object object = get(WXDomPropConstant.WX_OPACITY);
    float opacity = 1;
    if (object == null) {
      return opacity;
    }
    return WXUtils.getFloat(object);
  }

  public String getOverflow() {
    Object obj = get(WXDomPropConstant.WX_OVERFLOW);
    return obj == null ? WXDomPropConstant.WX_OVERFLOW_VISIBLE : obj.toString();
  }
}
