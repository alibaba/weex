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

import android.view.View;
import android.view.ViewGroup;

import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.common.WXException;
import com.taobao.weex.dom.WXDomObject;

import java.util.ArrayList;

/**
 * All container components must implement this class
 */
public abstract class WXVContainer extends WXComponent {

  protected ArrayList<WXComponent> mChildren;

  public WXVContainer(WXSDKInstance instance, WXDomObject node, WXVContainer parent, String instanceId, boolean lazy) {
    super(instance, node, parent, instanceId, lazy);
  }

  @Override
  protected void bindImpl(View view) {
    super.bindImpl(view);
    int count = childCount();
    for (int i = 0; i < count; ++i) {
      if (view == null) {
        getChild(i).bindImpl(null);
      } else {
        if (view instanceof ViewGroup) {
          getChild(i).bindImpl(((ViewGroup) view).getChildAt(i));
        }
      }
    }
  }

  /**
   * return real View
   */
  @Override
  public ViewGroup getRealView() {
    return (ViewGroup) super.getRealView();
  }

  @Override
  public void createViewImpl(WXVContainer parent, int index) {
    super.createViewImpl(parent, index);
    getOrCreateBorder().attachView(mHost);
    int count = childCount();
    for (int i = 0; i < count; ++i) {
      getChild(i).createViewImpl(this, i);
    }

    getView().setClipToPadding(false);
  }

  @Override
  public ViewGroup getView() {
    return (ViewGroup) super.getView();
  }

  @Override
  public void destroy() {
    super.destroy();
    if (mChildren != null) {
      int count = mChildren.size();
      for (int i = 0; i < count; ++i) {
        mChildren.get(i).destroy();
      }
      mChildren.clear();
    }
  }

  @Override
  public View detachViewAndClearPreInfo() throws WXException {
    View original = super.detachViewAndClearPreInfo();
    if (mChildren != null) {
      int count = childCount();
      for (int i = 0; i < count; ++i) {
        mChildren.get(i).detachViewAndClearPreInfo();
      }
    }
    return original;
  }

  public int childCount() {
    return mChildren == null ? 0 : mChildren.size();
  }

  public WXComponent getChild(int index) {
    return mChildren.get(index);
  }

  public void addChild(WXComponent child) {
    addChild(child, -1);
  }

  public void addChild(WXComponent child, int index) {
    if (child == null || index < -1) {
      return;
    }
    if (mChildren == null) {
      mChildren = new ArrayList<>();
    }
    int count = mChildren.size();
    index = index >= count ? -1 : index;
    if (index == -1) {
      mChildren.add(child);
    } else {
      mChildren.add(index, child);
    }
    mDomObj.add(child.getDomObject(), index);
  }

  protected void addSubView(View child, int index) {
    if (child == null || getRealView() == null) {
      return;
    }

    int count = getRealView().getChildCount();
    index = index >= count ? -1 : index;
    if (index == -1) {
      getRealView().addView(child);
    } else {
      getRealView().addView(child, index);
    }
  }

  public void remove(WXComponent child) {
    if (child == null || mChildren == null || mChildren.size() == 0) {
      return;
    }

    mChildren.remove(child);
    mDomObj.remove(child.mDomObj);
    if (getRealView() != null) {
      getRealView().removeView(child.getView());
    }
    child.destroy();
  }
}
