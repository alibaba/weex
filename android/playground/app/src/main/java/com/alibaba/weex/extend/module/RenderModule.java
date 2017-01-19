package com.alibaba.weex.extend.module;

import android.util.Log;

import com.taobao.weex.annotation.JSMethod;
import com.taobao.weex.common.WXModule;


public class RenderModule extends WXModule {

  @JSMethod
  public void performClick() {
    Log.d("Render", "Render");
  }
}
