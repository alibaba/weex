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

import android.support.v4.view.PagerAdapter;
import android.view.View;
import android.view.ViewGroup;

import com.taobao.weex.WXEnvironment;
import com.taobao.weex.utils.WXLogUtils;

import java.util.ArrayList;
import java.util.List;

public class WXCirclePageAdapter extends PagerAdapter {

  /**
   * Number of sub item
   */
  private int realCount;
  /**
   * Subviews
   */
  private List<View> views;

  public WXCirclePageAdapter(List<View> views) {
    super();
    this.views = views;
    this.realCount = views.size();
  }

  public WXCirclePageAdapter() {
    super();
    this.views = new ArrayList<>();
    this.realCount = 0;
  }

  public void addPageView(View view) {
    if (WXEnvironment.isApkDebugable()) {
      WXLogUtils.d("onPageSelected >>>> addPageView");
    }
    if (views == null) {
      views = new ArrayList<>();
    }
    views.add(view);
    this.realCount = views.size();
  }

  public void removePageView(View view) {
    if (WXEnvironment.isApkDebugable()) {
      WXLogUtils.d("onPageSelected >>>> removePageView");
    }
    if (views == null) {
      views = new ArrayList<>();
    }
    views.remove(view);
    this.realCount = views.size();
  }

  public void replacePageView(View oldView, View newView) {
    if (WXEnvironment.isApkDebugable()) {
      WXLogUtils.d("onPageSelected >>>> replacePageView");
    }
    if (views == null) {
      views = new ArrayList<>();
    }

    int index = views.indexOf(oldView);
    views.remove(index);
    views.add(index, newView);
    this.realCount = views.size();
  }

  @Override
  public int getCount() {
    // TODO Auto-generated method stub
    if (getRealCount() > 1) {
      return Integer.MAX_VALUE;
    } else {
      return getRealCount();
    }

  }

  public int getRealCount() {
    return realCount;
  }

  @Override
  public Object instantiateItem(ViewGroup container, int position) {
    View pageView = null;
    try {
      pageView = views.get(position % getRealCount());
      if (WXEnvironment.isApkDebugable()) {
        WXLogUtils.d("onPageSelected >>>> instantiateItem >>>>> position:" + position + ",position % getRealCount()" + position % getRealCount());
      }
      if (pageView.getParent() == null) {
        container.addView(pageView);
      } else {
        ((ViewGroup) pageView.getParent()).removeView(pageView);
        container.addView(pageView);
      }
    } catch (Exception e) {
      WXLogUtils.e("[CirclePageAdapter] instantiateItem: " + WXLogUtils.getStackTrace(e));
    }
    return pageView;
  }

  @Override
  public void destroyItem(ViewGroup container, int position, Object object) {
    if (WXEnvironment.isApkDebugable()) {
      WXLogUtils.d("onPageSelected >>>> destroyItem >>>>> position:" + position);
    }
    // container.removeView((View) object);
  }

  @Override
  public boolean isViewFromObject(View view, Object object) {
    return view == object;
  }

}
