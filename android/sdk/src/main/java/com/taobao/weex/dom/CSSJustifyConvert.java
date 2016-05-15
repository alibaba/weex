package com.taobao.weex.dom;

import android.text.TextUtils;

import com.taobao.weex.dom.flex.CSSJustify;

class CSSJustifyConvert {

  public static CSSJustify convert(String s) {
    CSSJustify cssJustify = CSSJustify.FLEX_START;
    if (TextUtils.isEmpty(s) || s.equals("flex-start")) {
      cssJustify = CSSJustify.FLEX_START;
    } else if (s.equals("flex-end")) {
      cssJustify = CSSJustify.FLEX_END;
    } else if (s.equals("center")) {
      cssJustify = CSSJustify.CENTER;
    } else if (s.equals("space-between")) {
      cssJustify = CSSJustify.SPACE_BETWEEN;
    } else if (s.equals("space-around")) {
      cssJustify = CSSJustify.SPACE_AROUND;
    }
    return cssJustify;
  }
}
