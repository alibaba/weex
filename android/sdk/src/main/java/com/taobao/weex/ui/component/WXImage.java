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
import android.widget.ImageView;
import android.widget.ImageView.ScaleType;

import com.taobao.weex.WXEnvironment;
import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.adapter.IWXImgLoaderAdapter;
import com.taobao.weex.common.WXDomPropConstant;
import com.taobao.weex.common.WXImageSharpen;
import com.taobao.weex.common.WXImageStrategy;
import com.taobao.weex.dom.WXDomObject;
import com.taobao.weex.ui.WXRecycleImageManager;
import com.taobao.weex.ui.view.WXImageView;
import com.taobao.weex.utils.WXLogUtils;
import com.taobao.weex.utils.WXResourceUtils;
import com.taobao.weex.utils.WXViewUtils;

/**
 * Image component
 */
public class WXImage extends WXComponent implements IWXRecyclerViewChild {

  public WXImage(WXSDKInstance instance, WXDomObject node,
                 WXVContainer parent, String instanceId, boolean lazy) {
    super(instance, node, parent, instanceId, lazy);
  }

  @Override
  protected void initView() {
    mHost = new WXImageView(mContext, mDomObj);
    ((ImageView) getView()).setScaleType(ScaleType.FIT_XY);
  }

  @Override
  public View getView() {
    return super.getView();
  }

  @Override
  public void flushView() {
    super.flushView();
    if (getView() != null) {
      if (WXEnvironment.isApkDebugable()) {
        WXLogUtils.w("WXImage instanceId: " + mInstanceId + " flushView---->ref: " + mDomObj.ref + " src: " + mDomObj.attr.get("src"));
      }
      if (getView() instanceof IWXUpdateComponent) {
        ((IWXUpdateComponent) getView()).updateDom(mDomObj);
      }

      if (mDomObj.attr != null) {
        if (getAbsoluteY() <= (WXViewUtils.getScreenHeight() + WXRecycleImageManager.VISIBLE_BOTTOM_SPACE)
            || WXViewUtils.onScreenArea(getView())) {
          setImage(mDomObj.attr.getImageSrc(), ((ImageView) getView()));
        }
      }
    }
  }

  @Override
  @WXComponentProp(name = WXDomPropConstant.WX_BACKGROUNDCOLOR)
  public void setBackgroundColor(String color) {
    if (!TextUtils.isEmpty(color)) {
      int colorInt = WXResourceUtils.getColor(color);
      if (colorInt != Integer.MIN_VALUE) {
        mHost.setBackgroundColor(colorInt);
      }
    }
  }

  @Override
  @WXComponentProp(name = WXDomPropConstant.WX_BORDERRADIUS)
  public void setBorderRadius(float borderRadius) {

  }

  @Override
  @WXComponentProp(name = WXDomPropConstant.WX_BORDERWIDTH)
  public void setBorderWidth(float borderWidth) {

  }

  @Override
  @WXComponentProp(name = WXDomPropConstant.WX_BORDERSTYLE)
  public void setBorderStyle(String borderStyle) {

  }

  @Override
  @WXComponentProp(name = WXDomPropConstant.WX_BORDERCOLOR)
  public void setBorderColor(String borderColor) {

  }

  private void setImage(String src, ImageView imageView) {
    WXImageStrategy imageStrategy = new WXImageStrategy();
    imageStrategy.isClipping = true;

    WXImageSharpen imageSharpen = mDomObj.attr.getImageSharpen();
    imageStrategy.isSharpen = imageSharpen == WXImageSharpen.SHARPEN;

    IWXImgLoaderAdapter imgLoaderAdapter = mInstance.getImgLoaderAdapter();
    if (imgLoaderAdapter != null) {
      imgLoaderAdapter.setImage(src, imageView,
                                mDomObj.attr.getImageQuality(), imageStrategy);
    }
  }

  @WXComponentProp(name = WXDomPropConstant.WX_RESIZE_MODE)
  public void setResizeMode(String resizeMode) {
    ((ImageView) getView()).setScaleType(getResizeMode(resizeMode));
  }

  private ScaleType getResizeMode(String resizeMode) {
    ScaleType scaleType = ScaleType.FIT_XY;
    if (TextUtils.isEmpty(resizeMode)) {
      return scaleType;
    }

    if (resizeMode.equals("cover")) {
      scaleType = ScaleType.CENTER_CROP;
    } else if (resizeMode.equals("contain")) {
      scaleType = ScaleType.CENTER_INSIDE;
    } else if (resizeMode.equals("stretch")) {
      scaleType = ScaleType.FIT_XY;
    }
    return scaleType;
  }

  @WXComponentProp(name = WXDomPropConstant.WX_RESIZE)
  public void setResize(String resize) {
    ((ImageView) getView()).setScaleType(getResizeMode(resize));
  }

  @WXComponentProp(name = WXDomPropConstant.WX_ATTR_SRC)
  public void setSrc(String src) {
    if (mInstance.getImgLoaderAdapter() == null) {
      return;
    }

    if (WXEnvironment.isApkDebugable()) {
      WXLogUtils.w("WXImage instanceId: " + mInstanceId + " setSrc---->ref: " + mDomObj.ref + " src: " + src);
    }

    if (mDomObj.attr != null) {
      mDomObj.attr.put("src", src);
    }

    WXRecycleImageManager recycleImageManager = mInstance
        .getRecycleImageManager();
    if (recycleImageManager != null
        && (mDomObj.style != null && !mDomObj.style.isSticky())) {
      recycleImageManager.addImage(this);
    }
  }
}
