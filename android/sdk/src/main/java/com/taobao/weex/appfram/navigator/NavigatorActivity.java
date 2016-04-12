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
package com.taobao.weex.appfram.navigator;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Rect;
import android.os.Bundle;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;

import com.taobao.weex.IWXRenderListener;
import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.WXSDKManager;
import com.taobao.weex.adapter.DefaultWXHttpAdapter;
import com.taobao.weex.common.WXPerformance;
import com.taobao.weex.common.WXRenderStrategy;
import com.taobao.weex.utils.WXLogUtils;

public class NavigatorActivity extends Activity {

  public final static String INSTANCE_ID = "instanceId";
  private ViewGroup container;
  private WXSDKInstance instance;
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    container=new FrameLayout(this);
    setContentView(container,new FrameLayout.LayoutParams(
        ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
    if(getActionBar()!=null)
      getActionBar().hide();
    final Intent intent=getIntent();
    instance = new WXSDKInstance(NavigatorActivity.this);
    instance.setImgLoaderAdapter(
            WXSDKManager.getInstance().getSDKInstance(
                    intent.getStringExtra(INSTANCE_ID)).getImgLoaderAdapter());
    instance.registerRenderListener(new IWXRenderListener() {
      @Override
      public void onViewCreated(WXSDKInstance instance, View view) {
        container.addView(view);
        container.requestLayout();
      }

      @Override
      public void onRenderSuccess(WXSDKInstance instance, int width, int height) {

      }

      @Override
      public void onRefreshSuccess(WXSDKInstance instance, int width, int height) {

      }

      @Override
      public void onException(WXSDKInstance instance, String errCode, String msg) {
        WXLogUtils.e("WXEmbed", "Error code :" + errCode + ",\n error message :" + msg);
      }
    });
    container.post(new Runnable() {
      @Override
      public void run() {
        Rect outRect = new Rect();
        getWindow().getDecorView().getWindowVisibleDisplayFrame(outRect);
        instance.render(WXPerformance.DEFAULT,
                        intent.getData().toString(),
                        new DefaultWXHttpAdapter(),
                        null, null, outRect.width(),
                        outRect.height(),
                        WXRenderStrategy.APPEND_ASYNC);
      }
    });
    instance.onActivityCreate();
  }

  @Override
  protected void onDestroy() {
    if (instance != null) {
      instance.onActivityDestroy();
    }
    super.onDestroy();
  }

  @Override
  protected void onPause() {
    if (instance != null) {
      instance.onActivityPause();
    }
    super.onPause();
  }

  @Override
  protected void onResume() {
    super.onResume();
    if (instance != null) {
      instance.onActivityResume();
    }
  }

  @Override
  protected void onStart() {
    super.onStart();
    if(instance!=null){
      instance.onActivityStart();
    }
  }

  @Override
  protected void onStop() {
    if(instance!=null){
      instance.onActivityStop();
    }
    super.onStop();
  }

  @Override
  public void onBackPressed() {
    if(instance!=null){
      instance.onActivityBack();
    }
    super.onBackPressed();
  }
}
