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
package com.taobao.weex.adapter;


import com.taobao.weex.common.WXRequest;
import com.taobao.weex.common.WXResponse;

public interface IWXHttpAdapter {

  /**
   * http request method
   *
   * @param request weex assemble request
   * @param listener http response notify
   * @return
   */
  void sendRequest(WXRequest request, OnHttpListener listener);

  interface OnHttpListener {

    /**
     * start request
     */
    void onHttpStart();

    /**
     * post progress
     * @param uploadProgress
     */
    void onHttpUploadProgress(int uploadProgress);

    /**
     * response progress
     * @param responseProgress
     */
    void onHttpResponseProgress(int responseProgress);

    /**
     * http response finish
     * @param response
     */
    void onHttpFinish(WXResponse response);
  }
}
