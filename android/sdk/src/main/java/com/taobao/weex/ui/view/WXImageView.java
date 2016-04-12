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
package com.taobao.weex.ui.view;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.drawable.Drawable;
import android.view.MotionEvent;
import android.widget.ImageView;

import com.taobao.weex.dom.WXDomObject;
import com.taobao.weex.ui.component.IWXUpdateComponent;
import com.taobao.weex.ui.view.gesture.WXGesture;
import com.taobao.weex.ui.view.gesture.WXGestureObservable;

public class WXImageView extends ImageView implements IWXUpdateComponent, WXGestureObservable {

  private WXShapeFeature mImageShapeFeature;
  private WXGesture wxGesture;

  public WXImageView(Context context, WXDomObject element) {
    super(context);
    mImageShapeFeature = new WXShapeFeature(getContext(), this, element);
  }

  @Override
  public void updateDom(WXDomObject domObject) {
    mImageShapeFeature.updateDom(domObject);
  }

  @Override
  public void setImageResource(int resId) {
    Drawable drawable = getResources().getDrawable(resId);
    drawable = mImageShapeFeature.wrapDrawable(drawable);
    super.setImageDrawable(drawable);
  }

  @Override
  public void setImageDrawable(Drawable drawable) {
    drawable = mImageShapeFeature.wrapDrawable(drawable);
    super.setImageDrawable(drawable);
  }

  @Override
  protected void onDraw(Canvas canvas) {
    mImageShapeFeature.beforeOnDraw(canvas);
    super.onDraw(canvas);
    mImageShapeFeature.afterOnDraw(canvas);
  }

  @Override
  public void registerGestureListener(WXGesture wxGesture) {
    this.wxGesture = wxGesture;
  }

  @Override
  public boolean onTouchEvent(MotionEvent event) {
    boolean result = super.onTouchEvent(event);
    if (wxGesture != null) {
      result |= wxGesture.onTouch(this, event);
    }
    return result;
  }

  @Override
  protected void onLayout(boolean changed, int left, int top, int right,
                          int bottom) {
    mImageShapeFeature.beforeOnLayout(changed, left, top, right, bottom);
    super.onLayout(changed, left, top, right, bottom);
    mImageShapeFeature.afterOnLayout(changed, left, top, right, bottom);
  }

  @Override
  public void setBackgroundResource(int resid) {
    Drawable drawable = getResources().getDrawable(resid);
    drawable = mImageShapeFeature.wrapDrawable(drawable);
    super.setBackgroundDrawable(drawable);
  }

  @Override
  public void setBackgroundDrawable(Drawable d) {
    Drawable drawable = d;
    if (mImageShapeFeature != null) {
      mImageShapeFeature.wrapDrawable(d);
    }
    super.setBackgroundDrawable(drawable);
  }
}
