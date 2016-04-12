package com.taobao.weex.dom;

import android.text.TextUtils;

import com.taobao.weex.dom.flex.CSSWrap;

class CSSWrapConvert {

  public static CSSWrap convert(String s) {
    CSSWrap cssWrap = CSSWrap.NOWRAP;
    if (TextUtils.isEmpty(s)) {
      return cssWrap;
    } else if (s.equals("wrap")) {
      return CSSWrap.WRAP;
    }
    return cssWrap;
  }
}
