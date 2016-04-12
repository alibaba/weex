package com.taobao.weex.dom;

import android.text.TextUtils;

import com.taobao.weex.dom.flex.CSSAlign;

final class CSSAlignConvert {

  public static CSSAlign convert2AlignItems(String s) {
    CSSAlign align = CSSAlign.STRETCH;
    if (TextUtils.isEmpty(s)) {
      align = CSSAlign.STRETCH;
    } else if (s.equals("stretch")) {
      align = CSSAlign.STRETCH;
    } else if (s.equals("flex-end")) {
      align = CSSAlign.FLEX_END;
    } else if (s.equals("auto")) {
      align = CSSAlign.AUTO;
    } else if (s.equals("center")) {
      align = CSSAlign.CENTER;
    }

    return align;
  }

  public static CSSAlign convert2AlignSelf(String s) {
    CSSAlign align = CSSAlign.AUTO;
    if (TextUtils.isEmpty(s)) {
      align = CSSAlign.AUTO;
    } else if (s.equals("flex-start")) {
      align = CSSAlign.FLEX_START;
    } else if (s.equals("flex-end")) {
      align = CSSAlign.FLEX_END;
    } else if (s.equals("stretch")) {
      align = CSSAlign.STRETCH;
    } else if (s.equals("center")) {
      align = CSSAlign.CENTER;
    }

    return align;
  }
}
