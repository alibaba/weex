package com.alibaba.weex;

import android.app.Application;

import com.alibaba.weex.extend.Components.WTRichText;
import com.alibaba.weex.extend.Modules.RenderModule;
import com.alibaba.weex.extend.Modules.WXEventModule;
import com.taobao.weex.WXSDKEngine;
import com.taobao.weex.common.WXException;

public class WXApplication extends Application {

  @Override
  public void onCreate() {
    super.onCreate();
    WXSDKEngine.init(this);
    WXSDKEngine.addCustomOptions("appName", "WXSample");
    WXSDKEngine.addCustomOptions("appGroup", "WXApp");
    try {

      WXSDKEngine.registerComponent("wtRichText", WTRichText.class);
      WXSDKEngine.registerModule("render", RenderModule.class);
      WXSDKEngine.registerModule("event", WXEventModule.class);

    } catch (WXException e) {
      e.printStackTrace();
    }
  }
}
