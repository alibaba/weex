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
package com.taobao.weex.ui.component.list;

import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.dom.WXDomObject;
import com.taobao.weex.ui.component.IWXRecyclerViewChild;
import com.taobao.weex.ui.component.WXComponent;
import com.taobao.weex.ui.component.WXVContainer;

/**
 * Root component for components in {@link WXListComponent}
 */
public class WXCell extends WXVContainer implements IWXRecyclerViewChild {

  public WXCell(WXSDKInstance instance, WXDomObject dom, WXVContainer parent, String instanceId, boolean isLazy) {
    super(instance, dom, parent, instanceId, true);
  }

  @Override
  public void flushView() {
    super.flushView();
    int size = childCount();
    for (int i = 0; i < size; i++) {
      flushViews(getChild(i));
    }
  }

  private void flushViews(WXComponent component) {
    component.flushView();
    if (component instanceof WXVContainer) {
      WXVContainer container = (WXVContainer) component;
      WXComponent child;
      for (int i = 0; i < container.childCount(); i++) {
        child = container.getChild(i);
        flushViews(child);
      }
    }
  }

}
