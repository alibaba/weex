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
package com.taobao.weex;

import android.view.View;

public interface IWXRenderListener {

  /**
   * If {@link com.taobao.weex.common.WXRenderStrategy#APPEND_ASYNC} is applied, this method
   * will be invoked when the rendering of first view is finish.
   * If {@link com.taobao.weex.common.WXRenderStrategy#APPEND_ONCE} is applied, this method will
   * be invoked when the rendering of the view tree is finished.
   */
  void onViewCreated(WXSDKInstance instance, View view);

  /**
   * Called when the render view phase of weex has finished.
   * It can be invoked at most once in the entire life of a {@link WXSDKInstance}
   */
  void onRenderSuccess(WXSDKInstance instance, int width, int height);

  /**
   * Callback method, called when refresh is finished
   */
  void onRefreshSuccess(WXSDKInstance instance, int width, int height);

  /**
   * Report exception occurred when weex instance is running. Exception <strong>may not</strong>
   * cause user-noticeable failure of weex.
   */
  void onException(WXSDKInstance instance, String errCode, String msg);
}
