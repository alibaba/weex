package com.alibaba.weex.extend.module;

import android.content.Intent;
import android.net.Uri;
import android.text.TextUtils;

import com.taobao.weex.annotation.JSMethod;
import com.taobao.weex.common.WXModule;

import java.util.HashMap;


public class WXEventModule extends WXModule {

  private static final String WEEX_CATEGORY = "com.taobao.android.intent.category.WEEX";
  private static final String WEEX_ACTION = "com.taobao.android.intent.action.WEEX";


  @JSMethod(uiThread = true)
  public void openURL(String url) {
    if (TextUtils.isEmpty(url)) {
      return;
    }
    String scheme = Uri.parse(url).getScheme();
    StringBuilder builder = new StringBuilder();
    if (TextUtils.equals("http", scheme) || TextUtils.equals("https", scheme) || TextUtils.equals("file", scheme)) {
      builder.append(url);
    } else {
      builder.append("http:");
      builder.append(url);
    }

    Uri uri = Uri.parse(builder.toString());
    Intent intent = new Intent(WEEX_ACTION, uri);
    intent.addCategory(WEEX_CATEGORY);
    mWXSDKInstance.getContext().startActivity(intent);

    if (mWXSDKInstance.checkModuleEventRegistered("event", this)) {
      HashMap<String,Object> params=new HashMap<>();
      params.put("param1","param1");
      params.put("param2","param2");
      params.put("param3","param3");
      mWXSDKInstance.fireModuleEvent("event", this, params);
    }
  }
}
