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
package org.apache.weex.extend;

import com.taobao.weex.IWXStatisticsListener;

import com.taobao.weex.utils.Trace;

public class WXInstanceStatisticsListener implements IWXStatisticsListener {
  /**
   * Called when weex sdk engine begin to initialize.
   */
  @Override
  public void onSDKEngineInitialize() {}

  /**
   * Called when begin to load js framework.
   */
  @Override
  public void onJsFrameworkStart() {}

  /**
   * Called when finish loading js framework.
   */
  @Override
  public void onJsFrameworkReady() {}

  /**
   * Called when the render view phase of first view reached.
   */
  @Override
  public void onFirstView() {}

  /**
   * Called when the render view phase of first screen reached.
   */
  @Override
  public void onFirstScreen() {
    Trace.beginSection("onFirstScreen done");
    Trace.endSection();
  }

  /**
   * Called when to start a http request.
   */
  @Override
  public void onHttpStart() {}

  /**
   * Called when received a http response header data.
   */
  @Override
  public void onHeadersReceived() {}

  /**
   * Called when to finish a http request.
   */
  @Override
  public void onHttpFinish() {}

  /**
   * Called when an exception occured.
   */
  @Override
  public void onException(String instanceid, String errCode, String msg) {}
}
