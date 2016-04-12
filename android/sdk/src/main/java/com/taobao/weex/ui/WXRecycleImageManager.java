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
package com.taobao.weex.ui;

import android.view.View;
import android.widget.ImageView;

import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.common.WXImageSharpen;
import com.taobao.weex.common.WXImageStrategy;
import com.taobao.weex.dom.WXDomObject;
import com.taobao.weex.ui.component.WXComponent;
import com.taobao.weex.utils.WXLogUtils;
import com.taobao.weex.utils.WXViewUtils;

import java.util.ArrayList;
import java.util.List;

/**
 * Manager class for image
 */
public class WXRecycleImageManager {

  public static final int VISIBLE_TOP_SPACE = -WXViewUtils.getScreenHeight() * 3 / 5;
  public static final int VISIBLE_BOTTOM_SPACE = -VISIBLE_TOP_SPACE;
  /**
   * Location of imageView on the screen
   */
  int[] mImgPos = new int[2];
  private WXSDKInstance mInstance;
  private List<ImageInfo> mAllImages = new ArrayList<>();

  public WXRecycleImageManager(WXSDKInstance instance) {
    mInstance = instance;
  }

  public List<ImageInfo> getAllImages() {
    return mAllImages;
  }

  public boolean addImage(WXComponent view) {
    if (mAllImages != null && !mAllImages.contains(view) && mInstance != null) {
      ImageInfo imageInfo = new ImageInfo();
      imageInfo.image = view;
      imageInfo.isRecycle = true;
      mAllImages.add(imageInfo);
      return true;
    }
    return false;
  }

  public void loadImage() {
    ImageInfo imageInfo;
    WXComponent component;
    int count = mAllImages.size();

    View view;
    String src;
    int screenH = WXViewUtils.getScreenHeight();
    for (int i = 0; i < count; i++) {
      imageInfo = mAllImages.get(i);
      component = imageInfo.image;
      if (component == null || component.getDomObject() == null || component.getDomObject().attr == null) {
        continue;
      }
      view = component.getView();
      if (view == null) {
        continue;
      }

      view.getLocationOnScreen(mImgPos);
      boolean in = (((mImgPos[1] > VISIBLE_TOP_SPACE) && (mImgPos[1] - screenH < VISIBLE_BOTTOM_SPACE))
                    || (view.getHeight() + mImgPos[1] > 0 && mImgPos[1] <= 0));
      if (in && imageInfo.isRecycle) {
        imageInfo.isRecycle = false;
        src = component.getDomObject().attr.getImageSrc();
        setImage(src, component, true);
      } else if (!in && !imageInfo.isRecycle) {
        imageInfo.isRecycle = true;
        setImage(null, component, false);
      }
    }
  }

  private void setImage(Object url, WXComponent component, boolean isVisibleOnScreen) {
    try {
      if (component == null || component.getDomObject() == null
          || component.getDomObject().attr == null) {
        return;
      }
      if (isVisibleOnScreen) {
        WXImageStrategy waImageStrategy = new WXImageStrategy();
        waImageStrategy.isClipping = true;
        WXDomObject element = component.getDomObject();
        WXImageSharpen waImageSharpen = element.attr.getImageSharpen();
        waImageStrategy.isSharpen = waImageSharpen == WXImageSharpen.SHARPEN;
        mInstance.getImgLoaderAdapter().setImage(
            url == null ? null : url.toString(),
            (ImageView) component.getView(),
            element.attr.getImageQuality(),
            waImageStrategy);
      } else {
        mInstance.getImgLoaderAdapter().setImage(null, (ImageView) component.getView(),
                                                 null, null);
      }
    } catch (Exception e) {
      WXLogUtils.e("[WXRecycleImageManager] setImage error: " + WXLogUtils.getStackTrace(e));
    }
  }

  public void destroy() {
    if (mAllImages != null) {
      mAllImages.clear();
    }
    mAllImages = null;
    mInstance = null;
  }

  public static class ImageInfo {

    public WXComponent image;
    public boolean isRecycle;
  }
}
