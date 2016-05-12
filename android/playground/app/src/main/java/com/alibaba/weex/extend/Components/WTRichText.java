/**
 * Copyright 1999-2015 Alibaba.com All right reserved. This software is the confidential and
 * proprietary information of Alibaba.com ("Confidential Information"). You shall not disclose such
 * Confidential Information and shall use it only in accordance with the terms of the license
 * agreement you entered into with Alibaba.com.
 */
package com.alibaba.weex.extend.Components;

import android.os.Parcel;
import android.text.Spannable;
import android.text.Spanned;
import android.text.TextPaint;
import android.text.TextUtils;
import android.text.method.LinkMovementMethod;
import android.text.style.ForegroundColorSpan;
import android.text.style.URLSpan;
import android.view.View;
import android.widget.TextView;

import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.dom.WXAttr;
import com.taobao.weex.dom.WXDomObject;
import com.taobao.weex.ui.component.WXComponentProp;
import com.taobao.weex.ui.component.WXText;
import com.taobao.weex.ui.component.WXVContainer;
import com.taobao.weex.utils.WXResourceUtils;

import java.util.ArrayList;
import java.util.HashMap;


public class WTRichText extends WXText {

  private ArrayList<HashMap<String, Object>> mTags;

  /**
   * @param instance
   * @param node
   * @param parent
   * @param instanceId
   * @param lazy
   */
  public WTRichText(WXSDKInstance instance, WXDomObject node,
                    WXVContainer parent, String instanceId, boolean lazy) {
    super(instance, node, parent, instanceId, lazy);
  }

  @WXComponentProp(name = "tags")
  public void setTags(ArrayList<HashMap<String, Object>> tags) {
    mTags = tags;
    if (tags == null || tags.size() == 0 || mDomObj == null) {
      return;
    }

    String value = WXAttr.getValue(mDomObj.attr);
    if (TextUtils.isEmpty(value)) {
      return;
    }

    int valueLength = value.length();
    Spannable sp = (Spannable) mDomObj.getExtra();//new SpannableString(value);
    //Set a hyperlink
    for (HashMap<String, Object> tag : tags) {
      int start = tag.get("start") == null ? 0 : Integer.parseInt(tag.get("start").toString());
      int end = tag.get("end") == null ? 0 : Integer.parseInt(tag.get("end").toString());
      String color = tag.get("color") == null ? "" : tag.get("color").toString();
      String href = tag.get("href") == null ? "" : tag.get("href").toString();

      if (start >= end) {
        return;
      }

      if (end > valueLength) {
        end = valueLength;
      }

      if (!TextUtils.isEmpty(href)) {
        sp.setSpan(new WTClickableURLSpan(href), start, end, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);
      }

      if (!TextUtils.isEmpty(color)) {
        sp.setSpan(new ForegroundColorSpan(getTextColor(color)), start, end, Spannable.SPAN_EXCLUSIVE_INCLUSIVE);
      }
    }

    //		((TextView)mHost).setText(sp);
    ((TextView) mHost).setMovementMethod(LinkMovementMethod.getInstance());
  }

  public int getTextColor(String textColor) {
    if (!TextUtils.isEmpty(textColor)) {
      int color = WXResourceUtils.getColor(textColor);
      if (color != Integer.MIN_VALUE) {
        return color;
      }
    }
    return 0;
  }

  public class WTClickableURLSpan extends URLSpan {

    /**
     * @param src
     */
    public WTClickableURLSpan(Parcel src) {
      super(src);
    }

    /**
     * @param href
     */
    public WTClickableURLSpan(String href) {
      super(href);
    }

    /* (non-Javadoc)
     * @see android.text.style.URLSpan#onClick(android.view.View)
     */
    @Override
    public void onClick(View widget) {
      WTRichText.this.setTags(mTags);
    }

    /* (non-Javadoc)
     * @see android.text.style.ClickableSpan#updateDrawState(android.text.TextPaint)
     */
    @Override
    public void updateDrawState(TextPaint ds) {
    }

  }

}
