package com.alibaba.weex.commons;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.view.ViewGroup;
import com.taobao.weex.WXSDKInstance;

/**
 * Basic Weex powered Activity.
 * Created by sospartan on 5/31/16.
 */
public abstract class SimpleWeexActivity extends AbstractWeexActivity {

  @Override
  protected void onCreate(@Nullable Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContainer((ViewGroup) findViewById(android.R.id.content));
  }

  @Override
  public void onRenderSuccess(WXSDKInstance instance, int width, int height) {

  }

  @Override
  public void onException(WXSDKInstance instance, String errCode, String msg) {

  }
}
