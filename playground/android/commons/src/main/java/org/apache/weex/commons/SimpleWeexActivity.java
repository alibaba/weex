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
package org.apache.weex.commons;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.view.ViewGroup;
import com.taobao.weex.WXSDKInstance;

/**
 * Basic Weex powered Activity.
 * Created by sospartan on 5/31/16.
 */
public abstract class SimpleWeexActivity extends AbstractWeexActivity {

  @Override
  protected void onCreate(@Nullable Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContainer((ViewGroup) findViewById(android.R.id.content));
  }

  @Override
  public void onRenderSuccess(WXSDKInstance instance, int width, int height) {
    super.onRenderSuccess(instance,width,height);
  }

  @Override
  public void onException(WXSDKInstance instance, String errCode, String msg) {
    super.onException(instance,errCode,msg);
  }
}
