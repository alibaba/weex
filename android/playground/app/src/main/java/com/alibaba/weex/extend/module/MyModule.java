package com.alibaba.weex.extend.module;

import android.widget.Toast;

import com.taobao.weex.common.WXModule;
import com.taobao.weex.common.WXModuleAnno;

public class MyModule extends WXModule {

  @WXModuleAnno(runOnUIThread = true)
  public void printLog(String msg) {
    Toast.makeText(mWXSDKInstance.getContext(),msg,Toast.LENGTH_SHORT).show();
  }
}
