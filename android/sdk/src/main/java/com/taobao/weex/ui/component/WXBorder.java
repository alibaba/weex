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

import android.graphics.Color;
import android.graphics.drawable.Drawable;
import android.graphics.drawable.LayerDrawable;
import android.view.View;

import com.taobao.weex.ui.view.WXBackgroundDrawable;

/**
 * Support the border
 */
public class WXBorder {

  private WXBackgroundDrawable mBackgroundDrawable;
  private View mHost;

  public WXBorder() {
  }

  public void attachView(View host) {
    mHost = host;
  }

  public void detachView() {
    mHost = null;
  }

  public void setBackgroundColor(int color) {
    if (mHost == null) {
      return;
    }
    if (color == Color.TRANSPARENT && mBackgroundDrawable == null) {
      // don't do anything, no need to allocate BackgroundDrawable
      // for transparent background
    } else {
      getOrCreateViewBackground().setColor(color);
    }
  }

  @SuppressWarnings("deprecation")
  private WXBackgroundDrawable getOrCreateViewBackground() {
    if (mBackgroundDrawable == null) {
      mBackgroundDrawable = new WXBackgroundDrawable();
      Drawable backgroundDrawable = mHost.getBackground();
      mHost.setBackgroundDrawable(null);
      if (backgroundDrawable == null) {
        mHost.setBackgroundDrawable(mBackgroundDrawable);
      } else {
        LayerDrawable layerDrawable = new LayerDrawable(new Drawable[]{
            mBackgroundDrawable, backgroundDrawable});
        mHost.setBackgroundDrawable(layerDrawable);
      }
    }
    return mBackgroundDrawable;
  }

  @SuppressWarnings("deprecation")
  public void setTranslucentBackgroundDrawable(Drawable background) {
    if (mHost == null) {
      return;
    }
    mHost.setBackgroundDrawable(null);
    if (mBackgroundDrawable != null && background != null) {
      LayerDrawable layerDrawable = new LayerDrawable(new Drawable[]{
          mBackgroundDrawable, background});
      mHost.setBackgroundDrawable(layerDrawable);
    } else if (background != null) {
      mHost.setBackgroundDrawable(background);
    }
  }

  public void setBorderWidth(int position, float width) {
    if (mHost == null) {
      return;
    }
    getOrCreateViewBackground().setBorderWidth(position, width);
  }

  public void setBorderColor(int position, float color) {
    if (mHost == null) {
      return;
    }
    getOrCreateViewBackground().setBorderColor(position, color);
  }

  public void setBorderRadius(int position, float borderRadius) {
    if (mHost == null) {
      return;
    }
    getOrCreateViewBackground().setRadius(borderRadius, position);
  }

  public void setBorderRadius(float borderRadius) {
    if (mHost == null) {
      return;
    }
    getOrCreateViewBackground().setRadius(borderRadius);
  }

  public void setBorderStyle(String style) {
    if (mHost == null) {
      return;
    }
    getOrCreateViewBackground().setBorderStyle(style);
  }
}
