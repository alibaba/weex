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

import android.widget.CompoundButton;

import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.WXSDKManager;
import com.taobao.weex.common.WXDomPropConstant;
import com.taobao.weex.dom.WXDomObject;
import com.taobao.weex.ui.view.WXSwitchView;

import java.util.HashMap;
import java.util.Map;

public class WXSwitch extends WXComponent implements IWXRecyclerViewChild {

  public WXSwitch(WXSDKInstance instance, WXDomObject dom, WXVContainer parent, String instanceId, boolean isLazy) {
    super(instance, dom, parent, instanceId, isLazy);
  }

  @Override
  protected void initView() {
    super.initView();
    mHost = new WXSwitchView(mContext);
  }

  @Override
  public WXSwitchView getView() {
    return (WXSwitchView) super.getView();
  }

  @Override
  public void addEvent(String type) {
    super.addEvent(type);
    if (type != null && type.equals(WXEventType.CHANGE) && getView() != null) {
      getView().setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
        @Override
        public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
          Map<String, Object> params = new HashMap<>(2);
          params.put("value", isChecked);
          WXSDKManager.getInstance().fireEvent(mInstanceId, mDomObj.ref, WXEventType.CHANGE, params);
        }
      });
    }
  }

  @Override
  protected void removeEventFromView(String type) {
    super.removeEventFromView(type);
    if (getView() != null) {
      getView().setOnCheckedChangeListener(null);
    }
  }

  @WXComponentProp(name = WXDomPropConstant.WX_ATTR_SWITCH_CHECKED)
  public void setChecked(boolean checked) {
    getView().setChecked(checked);
  }
}
