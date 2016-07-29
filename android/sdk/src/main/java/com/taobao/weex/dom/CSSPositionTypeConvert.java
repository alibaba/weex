package com.taobao.weex.dom;

import com.taobao.weex.common.WXDomPropConstant;
import com.taobao.weex.dom.flex.CSSPositionType;

class CSSPositionTypeConvert {

  public static CSSPositionType convert(String s) {
    if (WXDomPropConstant.WX_POSITION_ABSOLUTE.equals(s) || WXDomPropConstant.WX_POSITION_FIXED.equals(s)) {
      return CSSPositionType.ABSOLUTE;
    }
    return CSSPositionType.RELATIVE;
  }
}
