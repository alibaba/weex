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

import android.support.v4.view.ViewPager.OnPageChangeListener;
import android.text.TextUtils;
import android.view.View;
import android.view.ViewGroup;
import android.view.ViewGroup.LayoutParams;
import android.widget.FrameLayout;

import com.taobao.weex.WXEnvironment;
import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.WXSDKManager;
import com.taobao.weex.dom.WXDomObject;
import com.taobao.weex.dom.WXEvent;
import com.taobao.weex.ui.view.WXCircleIndicator;
import com.taobao.weex.ui.view.WXCirclePageAdapter;
import com.taobao.weex.ui.view.WXCircleViewPager;
import com.taobao.weex.utils.WXLogUtils;
import com.taobao.weex.utils.WXViewUtils;

import java.util.HashMap;
import java.util.Map;

public class WXSlider extends WXVContainer implements OnPageChangeListener {

  Map<String, Object> params = new HashMap<>();
  /**
   * Scrollable sliderview
   */
  private WXCircleViewPager mViewPager;
  /**
   * Circle indicator
   */
  private WXIndicator mIndicator;

  /**
   * Adapter for sliderview
   */
  private WXCirclePageAdapter mAdapter;
  /**
   * Container for sliderview
   */
  private FrameLayout mRoot;

  private boolean mShowIndicators;

  public WXSlider(WXSDKInstance instance, WXDomObject node, WXVContainer parent,
                  String instanceId, boolean lazy) {
    super(instance, node, parent, instanceId, lazy);
  }

  @Override
  protected void initView() {
    mRoot = new FrameLayout(mContext);
    // init view pager
    FrameLayout.LayoutParams pagerParams = new FrameLayout.LayoutParams(
        LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT);
    mViewPager = new WXCircleViewPager(mContext);
    mViewPager.setLayoutParams(pagerParams);

    // init adapter
    mAdapter = new WXCirclePageAdapter();
    mViewPager.setAdapter(mAdapter);
    // add to parent
    mRoot.addView(mViewPager);
    mHost = mRoot;

    registerActivityStateListener();
  }

  //TODO Slider don't support any gesture for now.
  @Override
  public void addEvent(String type) {
    super.addEvent(type);
    if (getRealView() != null) {
      getRealView().setOnTouchListener(null);
    }
    mGestureType.clear();
  }

  @Override
  public ViewGroup getRealView() {
    return mViewPager;
  }

  @Override
  protected void addSubView(View view, int index) {
    if (view == null || mAdapter == null) {
      return;
    }

    if (view instanceof WXCircleIndicator) {
      return;
    }
    mAdapter.addPageView(view);
    mAdapter.notifyDataSetChanged();
    if (mIndicator != null) {
      mIndicator.getView().forceLayout();
      mIndicator.getView().requestLayout();
    }
  }

  @Override
  public void remove(WXComponent child) {
    if (child == null || child.getView() == null || mAdapter == null) {
      return;
    }

    mAdapter.removePageView(child.getView());
    mAdapter.notifyDataSetChanged();
  }

  @Override
  public void destroy() {
    super.destroy();
    if (mViewPager != null) {
      mViewPager.stopAutoScroll();
      mViewPager.removeAllViews();
      mViewPager.destory();
    }
  }

  @Override
  public void onActivityResume() {
    if (mViewPager != null) {
      mViewPager.startAutoScroll();
    }
  }

  @Override
  public void onActivityStop() {
    if (mViewPager != null) {
      mViewPager.stopAutoScroll();
    }
  }

  public void addIndicator(WXIndicator indicator) {
    mIndicator = indicator;
    mIndicator.getView().setCircleViewPager(mViewPager);
    mIndicator.getView().setOnPageChangeListener(this);
    mRoot.addView(mIndicator.getView());
  }

  @WXComponentProp(name = "autoPlay")
  public void setAutoPlay(String autoPlay) {
    if (TextUtils.isEmpty(autoPlay) || autoPlay.equals("false")) {
      mViewPager.stopAutoScroll();
    } else {
      mViewPager.stopAutoScroll();
      mViewPager.startAutoScroll();
    }
  }

  @WXComponentProp(name = "showIndicators")
  public void setShowIndicators(String show) {
    if (TextUtils.isEmpty(show) || show.equals("false")) {
      mShowIndicators = false;
    } else {
      mShowIndicators = true;
    }

    if (mIndicator == null) {
      return;
    }
    mIndicator.setShowIndicators(mShowIndicators);
  }

  @Override
  public void onPageScrolled(int arg0, float arg1, int arg2) {

  }

  @Override
  public void onPageSelected(int pos) {
    if (WXEnvironment.isApkDebugable()) {
      WXLogUtils.d("onPageSelected >>>>" + pos);
    }
    if (mAdapter == null || mAdapter.getRealCount() == 0) {
      return;
    }

    int realPosition = pos % mAdapter.getRealCount();
    if (mChildren == null || realPosition >= mChildren.size()) {
      return;
    }

    if (getDomObject().event == null || getDomObject().event.size() == 0) {
      return;
    }
    WXEvent event = getDomObject().event;
    String ref = getDomObject().ref;
    if (event.contains(WXEventType.SLIDER_CHANGE) && WXViewUtils.onScreenArea(mHost)) {
      params.put("index", realPosition);
      WXSDKManager.getInstance().fireEvent(mInstanceId, ref,
                                           WXEventType.SLIDER_CHANGE, params);
    }
  }

  @Override
  public void onPageScrollStateChanged(int arg0) {

  }
}
