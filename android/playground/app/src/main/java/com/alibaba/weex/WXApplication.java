package com.alibaba.weex;

import android.app.Application;

import com.alibaba.weex.commons.adapter.FrescoImageAdapter;
import com.alibaba.weex.extend.PlayDebugAdapter;
import com.alibaba.weex.extend.component.WTRichText;
import com.alibaba.weex.extend.module.RenderModule;
import com.alibaba.weex.extend.module.WXEventModule;
import com.facebook.drawee.backends.pipeline.Fresco;
import com.taobao.weex.InitConfig;
import com.taobao.weex.WXSDKEngine;
import com.taobao.weex.common.WXException;

public class WXApplication extends Application {

  @Override
  public void onCreate() {
    super.onCreate();
    WXSDKEngine.addCustomOptions("appName", "WXSample");
    WXSDKEngine.addCustomOptions("appGroup", "WXApp");
    WXSDKEngine.initialize(this,
                           new InitConfig.Builder()
                               .setImgAdapter(new FrescoImageAdapter())
                               .setDebugAdapter(new PlayDebugAdapter())
                               .build()
                          );

    try {
      Fresco.initialize(this);
      WXSDKEngine.registerComponent("wtRichText", WTRichText.class);
      WXSDKEngine.registerModule("render", RenderModule.class);
      WXSDKEngine.registerModule("event", WXEventModule.class);

    } catch (WXException e) {
      e.printStackTrace();
    }
  }
}
