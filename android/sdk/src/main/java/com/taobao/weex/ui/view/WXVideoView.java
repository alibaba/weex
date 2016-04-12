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
import android.view.MotionEvent;
import android.widget.VideoView;

import com.taobao.weex.ui.view.gesture.WXGesture;
import com.taobao.weex.ui.view.gesture.WXGestureObservable;


public class WXVideoView extends VideoView implements WXGestureObservable {

  private WXGesture wxGesture;
  private VideoPlayListener mVideoPauseListener;

  public WXVideoView(Context context) {
    super(context);
  }

  @Override
  public void registerGestureListener(WXGesture wxGesture) {
    this.wxGesture = wxGesture;
  }

  public void setOnVideoPauseListener(VideoPlayListener listener) {
    mVideoPauseListener = listener;
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
  public void start() {
    super.start();
    if (mVideoPauseListener != null) {
      mVideoPauseListener.onStart();
    }
  }

  @Override
  public void pause() {
    super.pause();
    if (mVideoPauseListener != null) {
      mVideoPauseListener.onPause();
    }
  }

  public interface VideoPlayListener {

    void onPause();

    void onStart();
  }
}
