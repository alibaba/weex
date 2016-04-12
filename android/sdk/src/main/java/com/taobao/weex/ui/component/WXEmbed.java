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

import android.text.TextUtils;
import android.view.View;
import android.view.ViewGroup;

import com.taobao.weex.IWXRenderListener;
import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.adapter.DefaultWXHttpAdapter;
import com.taobao.weex.common.WXDomPropConstant;
import com.taobao.weex.common.WXPerformance;
import com.taobao.weex.common.WXRenderStrategy;
import com.taobao.weex.dom.WXDomObject;
import com.taobao.weex.utils.WXLogUtils;

public class WXEmbed extends WXDiv {

  private String src;
  private WXSDKInstance instance;

  public WXEmbed(WXSDKInstance instance, WXDomObject node, WXVContainer parent, String instanceId, boolean lazy) {
    super(instance, node, parent, instanceId, lazy);
  }

  @WXComponentProp(name = WXDomPropConstant.WX_ATTR_SRC)
  public void setSrc(String src) {
    this.src = src;
    if (TextUtils.equals(getVisibility(), WXDomPropConstant.WX_VISIBILITY_VISIBLE)) {
      if (instance != null) {
        instance.destroy();
      }
      instance = createInstance();
    }
  }

  private WXSDKInstance createInstance() {
    WXSDKInstance sdkInstance = new WXSDKInstance(mContext);
    sdkInstance.registerRenderListener(new IWXRenderListener() {
      @Override
      public void onViewCreated(WXSDKInstance instance, View view) {
        getView().removeAllViews();
        getView().addView(view);
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
    sdkInstance.setImgLoaderAdapter(mInstance.getImgLoaderAdapter());
    ViewGroup.LayoutParams layoutParams = getView().getLayoutParams();
    sdkInstance.render(WXPerformance.DEFAULT,
                       src, new DefaultWXHttpAdapter(),
                       null, null, layoutParams.width,
                       layoutParams.height,
                       WXRenderStrategy.APPEND_ASYNC);
    return sdkInstance;
  }

  @Override
  @WXComponentProp(name = WXDomPropConstant.WX_VISIBILITY)
  public void setVisibility(String visibility) {
    super.setVisibility(visibility);
    if (!TextUtils.isEmpty(src) && TextUtils.equals(getVisibility(), WXDomPropConstant.WX_VISIBILITY_VISIBLE)) {
      if (instance == null) {
        instance = createInstance();
      }
    }
  }

  @Override
  public void destroy() {
    super.destroy();
    if (instance != null) {
      instance.destroy();
      instance = null;
    }
    src = null;
  }
}
