package com.alibaba.weex.extend.module;

import android.util.Log;

import com.taobao.weex.common.WXModule;
import com.taobao.weex.common.WXModuleAnno;


public class RenderModule extends WXModule {

  @WXModuleAnno
  public void performClick() {
    Log.d("Render", "Render");
  }
}
