/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 * 
 *   http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
package org.apache.weex.commons.adapter;

import android.content.Context;
import android.util.AttributeSet;
import android.view.MotionEvent;
import com.facebook.drawee.view.SimpleDraweeView;
import com.taobao.weex.ui.view.gesture.WXGesture;
import com.taobao.weex.ui.view.gesture.WXGestureObservable;

/**
 * Created by sospartan on 8/19/16.
 */
public class FrescoImageView extends SimpleDraweeView implements WXGestureObservable {
  public FrescoImageView(Context context) {
    super(context);
  }

  public FrescoImageView(Context context, AttributeSet attrs) {
    super(context, attrs);
  }

  public FrescoImageView(Context context, AttributeSet attrs, int defStyle) {
    super(context, attrs, defStyle);
  }

  public FrescoImageView(Context context, AttributeSet attrs, int defStyleAttr, int defStyleRes) {
    super(context, attrs, defStyleAttr, defStyleRes);
  }

  private WXGesture wxGesture;

  @Override
  public void registerGestureListener(WXGesture wxGesture) {
    this.wxGesture = wxGesture;
  }

  @Override
  public WXGesture getGestureListener() {
    return wxGesture;
  }

  @Override
  public boolean onTouchEvent(MotionEvent event) {
    boolean result = super.onTouchEvent(event);
    if (wxGesture != null) {
      result |= wxGesture.onTouch(this, event);
    }
    return result;
  }
}
