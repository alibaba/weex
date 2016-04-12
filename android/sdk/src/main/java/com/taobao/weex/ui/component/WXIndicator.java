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

import com.taobao.weex.WXEnvironment;
import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.common.WXRuntimeException;
import com.taobao.weex.dom.WXDomObject;
import com.taobao.weex.ui.view.WXCircleIndicator;
import com.taobao.weex.utils.WXResourceUtils;
import com.taobao.weex.utils.WXViewUtils;

/**
 *
 * Slider indicator
 */
public class WXIndicator extends WXComponent {

  public WXIndicator(WXSDKInstance instance, WXDomObject dom, WXVContainer parent, String instanceId, boolean isLazy) {
    super(instance, dom, parent, instanceId, isLazy);
  }

  @Override
  protected void initView() {
    mHost = new WXCircleIndicator(mContext);
    if (mParent instanceof WXSlider) {
      ((WXSlider) mParent).addIndicator(this);
    } else {
      if (WXEnvironment.isApkDebugable()) {
        throw new WXRuntimeException("WXIndicator initView error.");
      }
    }
  }

  @Override
  public WXCircleIndicator getView() {
    return (WXCircleIndicator) super.getView();
  }

  @WXComponentProp(name = "itemColor")
  public void setItemColor(String itemColor) {
    if (!TextUtils.isEmpty(itemColor)) {
      int colorInt = WXResourceUtils.getColor(itemColor);
      if (colorInt != Integer.MIN_VALUE) {
        getView().setPageColor(colorInt);
        getView().forceLayout();
        getView().requestLayout();
      }
    }
  }

  @WXComponentProp(name = "itemSelectedColor")
  public void setItemSelectedColor(String itemSelectedColor) {
    if (!TextUtils.isEmpty(itemSelectedColor)) {
      int colorInt = WXResourceUtils.getColor(itemSelectedColor);
      if (colorInt != Integer.MIN_VALUE) {
        getView().setFillColor(colorInt);
        getView().forceLayout();
        getView().requestLayout();
      }
    }
  }

  @WXComponentProp(name = "itemSize")
  public void setItemSize(int itemSize) {
    if (itemSize < 0) {
      return;
    }
    getView().setRadius(WXViewUtils.getRealPxByWidth(itemSize) / 2.0f);
    getView().forceLayout();
    getView().requestLayout();
  }

  public void setShowIndicators(boolean show) {
    if (mHost == null) {
      return;
    }
    if (show) {
      mHost.setVisibility(View.VISIBLE);
    } else {
      mHost.setVisibility(View.GONE);
    }
  }
}
