package com.taobao.weex.dom;

import android.text.TextUtils;

import com.taobao.weex.dom.flex.CSSPositionType;

class CSSPositionTypeConvert {

  public static CSSPositionType convert(String s) {
    CSSPositionType position = CSSPositionType.RELATIVE;
    if (TextUtils.isEmpty(s) || s.equals("relative") || s.equals("sticky")) {
      position = CSSPositionType.RELATIVE;
    } else if (s.equals("absolute") || s.equals("fixed")) {
      position = CSSPositionType.ABSOLUTE;
    }
    return position;
  }
}
