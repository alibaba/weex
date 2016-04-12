package com.taobao.weex.dom;

import android.text.TextUtils;

import com.taobao.weex.dom.flex.CSSFlexDirection;

class CSSFlexDirectionConvert {

  public static CSSFlexDirection convert(String s) {
    CSSFlexDirection cssFlexDirection = CSSFlexDirection.ROW;
    if (TextUtils.isEmpty(s)) {
      cssFlexDirection = CSSFlexDirection.ROW;
    } else if (s.equals("column")) {
      cssFlexDirection = CSSFlexDirection.COLUMN;
    } else if (s.equals("column-reverse")) {
      cssFlexDirection = CSSFlexDirection.COLUMN_REVERSE;
    } else if (s.equals("row")) {
      cssFlexDirection = CSSFlexDirection.ROW;
    } else if (s.equals("row-reverse")) {
      cssFlexDirection = CSSFlexDirection.ROW_REVERSE;
    }
    return cssFlexDirection;
  }
}
