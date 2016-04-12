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
package com.taobao.weex.ui.component;

import android.text.Spannable;
import android.text.TextUtils;
import android.text.TextUtils.TruncateAt;
import android.util.TypedValue;
import android.view.Gravity;
import android.view.View;
import android.widget.TextView;

import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.common.WXDomPropConstant;
import com.taobao.weex.common.WXException;
import com.taobao.weex.dom.WXDomObject;
import com.taobao.weex.dom.WXStyle;
import com.taobao.weex.ui.view.WXTextView;

/**
 * Text component
 */
public class WXText extends WXComponent implements IWXRecyclerViewChild {

  /**
   * The default text size
   **/
  public static final int sDEFAULT_SIZE = 32;
  private Object mPreExtra;

  public WXText(WXSDKInstance instance, WXDomObject node,
                WXVContainer parent, String instanceId, boolean lazy) {
    super(instance, node, parent, instanceId, lazy);
  }

  @Override
  protected void initView() {
    mHost = new WXTextView(mContext);
    getView().setEllipsize(TruncateAt.END);
    //Remove padding for ascents and descents
    getView().setIncludeFontPadding(false);
  }

  @Override
  public WXTextView getView() {
    return (WXTextView) super.getView();
  }

  @Override
  public void updateExtra(Object extra) {
    super.updateExtra(extra);
    if (mHost == null || extra == mPreExtra) {
      return;
    }
    Spannable spannable = (Spannable) extra;
    if (spannable == null) {
      return;
    }
    int fontSize = WXStyle.getFontSize(mDomObj.style);

    getView().setTextSize(TypedValue.COMPLEX_UNIT_PX, fontSize);

    mPreExtra = spannable;
    getView().setText(spannable);
  }

  @Override
  public View detachViewAndClearPreInfo() throws WXException {
    mPreExtra = null;
    return super.detachViewAndClearPreInfo();
  }

  @WXComponentProp(name = WXDomPropConstant.WX_TEXTALIGN)
  public void setTextAlign(String textAlign) {
    int iTextAlign = getTextAlign(textAlign);
    if (iTextAlign > 0) {
      getView().setGravity(iTextAlign | Gravity.CENTER_VERTICAL);
    }
  }

  private int getTextAlign(String textAlign) {
    int align = Gravity.LEFT;
    if (TextUtils.isEmpty(textAlign)) {
      return align;
    }
    if (textAlign.equals(WXDomPropConstant.WX_TEXTALIGN_LEFT)) {
      align = Gravity.LEFT;
    } else if (textAlign.equals(WXDomPropConstant.WX_TEXTALIGN_CENTER)) {
      align = Gravity.CENTER;
    } else if (textAlign.equals(WXDomPropConstant.WX_TEXTALIGN_RIGHT)) {
      align = Gravity.RIGHT;
    }
    return align;
  }

  @WXComponentProp(name = WXDomPropConstant.WX_LINES)
  public void setLines(int lines) {
    TextView temp = getView();
    if (lines > 1) {
      temp.setSingleLine(false);
      temp.setMaxLines(lines);
    } else if (lines == 1) {
      temp.setSingleLine(true);
    }
  }
}
