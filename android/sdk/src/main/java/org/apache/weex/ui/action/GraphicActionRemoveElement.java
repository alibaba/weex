/**
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
package org.apache.weex.ui.action;

import android.text.TextUtils;

import org.apache.weex.WXSDKInstance;
import org.apache.weex.WXSDKManager;
import org.apache.weex.ui.component.WXComponent;
import org.apache.weex.ui.component.WXVContainer;

public class GraphicActionRemoveElement extends BasicGraphicAction {

  public GraphicActionRemoveElement(WXSDKInstance instance, String ref) {
    super(instance, ref);
  }

  @Override
  public void executeAction() {
    WXComponent component = WXSDKManager
        .getInstance().getWXRenderManager().getWXComponent(getPageId(), getRef());
    if (component == null || component.getParent() == null || component.getInstance() == null) {
      return;
    }
    clearRegistryForComponent(component);
    WXVContainer parent = component.getParent();

    if (component.getHostView() != null && !TextUtils.equals(component.getComponentType(), "video") && !TextUtils.equals(component.getComponentType(), "videoplus")) {
      int[] location = new  int[2];
      component.getHostView().getLocationInWindow(location);
      //component.getInstance().onChangeElement(parent, location[1] > component.getInstance().getWeexHeight() + 1);
    }

    parent.remove(component, true);
  }

  private void clearRegistryForComponent(WXComponent component) {
    WXComponent removedComponent = WXSDKManager.getInstance().getWXRenderManager().unregisterComponent(getPageId(), component.getRef());
    if (removedComponent != null) {
      removedComponent.removeAllEvent();
      removedComponent.removeStickyStyle();
    }
    if (component instanceof WXVContainer) {
      WXVContainer container = (WXVContainer) component;
      int count = container.childCount();
      for (int i = count - 1; i >= 0; --i) {
        clearRegistryForComponent(container.getChild(i));
      }
    }
  }
}
