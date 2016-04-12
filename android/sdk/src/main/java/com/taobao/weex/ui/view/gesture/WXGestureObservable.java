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
package com.taobao.weex.ui.view.gesture;

import android.support.annotation.Nullable;
import android.view.MotionEvent;
import android.view.View;

import com.taobao.weex.ui.view.WXFrameLayout;

/**
 * Views that want to receive Gesture Event must implement this interface. Besides,
 * those view must override their {@link android.view.View#onTouchEvent(MotionEvent)}
 * and add method invocation to {@link WXGesture#onTouch(View, MotionEvent)}.
 * Refer to {@link WXFrameLayout#onTouchEvent(MotionEvent)} for more info.
 *
 */
public interface WXGestureObservable {

  /**
   * Register a {@link WXGesture} for corresponding view.
   * @param wxGesture The Gesture to register, null for unregister.
   */
  void registerGestureListener(@Nullable WXGesture wxGesture);
}
