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

import android.graphics.Rect;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.FrameLayout.LayoutParams;

import com.taobao.weex.WXEnvironment;
import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.WXSDKManager;
import com.taobao.weex.common.WXDomPropConstant;
import com.taobao.weex.dom.WXDomObject;
import com.taobao.weex.ui.WXRecycleImageManager;
import com.taobao.weex.ui.view.IWXScroller;
import com.taobao.weex.ui.view.WXHorizontalScrollView;
import com.taobao.weex.ui.view.WXScrollView;
import com.taobao.weex.ui.view.WXScrollView.WXScrollViewListener;
import com.taobao.weex.utils.WXLogUtils;
import com.taobao.weex.utils.WXViewUtils;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Component for scroller. It also support features like
 * "appear", "disappear" and "sticky"
 */
public class WXScroller extends WXVContainer implements WXScrollViewListener {

  /**
   * Map for storing appear information
   **/
  private Map<String, ConcurrentHashMap<String, AppearData>> mAppearMap = new ConcurrentHashMap<>();
  /**
   * Map for storing component that is sticky.
   **/
  private Map<String, HashMap<String, WXComponent>> mStickyMap = new HashMap<>();
  private FrameLayout mRealView;
  /**
   * Location of scrollView
   **/
  private Rect mScrollRect;

  public WXScroller(WXSDKInstance instance, WXDomObject node,
                    WXVContainer parent, String instanceId, boolean lazy) {
    super(instance, node, parent, instanceId, lazy);
  }

  @Override
  protected void initView() {
    String scroll;
    if (mDomObj == null || mDomObj.attr == null) {
      scroll = "vertical";
    } else {
      scroll = mDomObj.attr.getScrollDirection();
    }
    if (scroll.equals("vertical")) {
      mOrientation = VERTICAL;
      mHost = new WXScrollView(mContext, this);
      mRealView = new FrameLayout(mContext);
      WXScrollView scrollView = (WXScrollView) getView();
      scrollView.addScrollViewListener(this);
      FrameLayout.LayoutParams layoutParams = new FrameLayout.LayoutParams(
          LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT);
      scrollView.addView(mRealView, layoutParams);
      mHost.setVerticalScrollBarEnabled(true);
    } else {
      mOrientation = HORIZONTAL;
      mHost = new WXHorizontalScrollView(mContext);
      mRealView = new FrameLayout(mContext);
      WXHorizontalScrollView scrollView = (WXHorizontalScrollView) getView();
      FrameLayout.LayoutParams layoutParams = new FrameLayout.LayoutParams(
          LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT);
      scrollView.addView(mRealView, layoutParams);
      mHost.setHorizontalScrollBarEnabled(true);
    }
  }

  @Override
  public ViewGroup getView() {
    return super.getView();
  }

  @Override
  public ViewGroup getRealView() {
    return mRealView;
  }

  @Override
  public void destroy() {
    super.destroy();
    if (mAppearMap != null) {
      mAppearMap.clear();
    }
    if (mStickyMap != null) {
      mStickyMap.clear();
    }
    if (getView() != null && getView() instanceof IWXScroller) {
      ((IWXScroller) getView()).destroy();
    }
  }

  @Override
  protected MeasureOutput measure(int width, int height) {
    MeasureOutput measureOutput = new MeasureOutput();
    if (this.mOrientation == WXVContainer.HORIZONTAL) {
      int screenW = WXViewUtils.getScreenWidth();
      int weexW = WXViewUtils.getWeexWidth(mInstanceId);
      measureOutput.width = width > (weexW >= screenW ? screenW : weexW) ? FrameLayout.LayoutParams.MATCH_PARENT
                                                                         : width;
      measureOutput.height = height;
    } else {
      int screenH = WXViewUtils.getScreenHeight();
      int weexH = WXViewUtils.getWeexHeight(mInstanceId);
      measureOutput.height = height > (weexH >= screenH ? screenH : weexH) ? FrameLayout.LayoutParams.MATCH_PARENT
                                                                           : height;
      measureOutput.width = width;
    }
    return measureOutput;
  }

  public int getScrollY() {
    return getView() == null ? 0 : getView().getScrollY();
  }

  public int getScrollX() {
    return getView() == null ? 0 : getView().getScrollX();
  }

  public Map<String, HashMap<String, WXComponent>> getStickMap() {
    return mStickyMap;
  }

  @WXComponentProp(name = WXDomPropConstant.WX_ATTR_SHOWSCROLLBAR)
  public void setShowScrollbar(boolean show) {
    if (show) {
      if (mOrientation == VERTICAL) {
        mHost.setVerticalScrollBarEnabled(true);
      } else {
        mHost.setHorizontalScrollBarEnabled(true);
      }
    } else {
      if (mOrientation == VERTICAL) {
        mHost.setVerticalScrollBarEnabled(false);
      } else {
        mHost.setHorizontalScrollBarEnabled(false);
      }
    }
  }

  // TODO Need constrain, each container can only have one sticky child
  public void bindStickStyle(WXComponent component) {
    WXScroller scroller = component.getParentScroller();
    if (scroller == null) {
      return;
    }
    HashMap<String, WXComponent> stickyMap = mStickyMap.get(scroller
                                                                .getRef());
    if (stickyMap == null) {
      stickyMap = new HashMap<>();
    }
    if (stickyMap.containsKey(component.getRef())) {
      return;
    }
    stickyMap.put(component.getRef(), component);
    mStickyMap.put(scroller.getRef(), stickyMap);
  }

  public void unbindStickStyle(WXComponent component) {
    WXScroller scroller = component.getParentScroller();
    if (scroller == null) {
      return;
    }
    HashMap<String, WXComponent> stickyMap = mStickyMap.get(scroller
                                                                .getRef());
    if (stickyMap == null) {
      return;
    }
    stickyMap.remove(component.getRef());
  }

  /**
   * Bind appear event
   */
  public void bindAppearEvent(WXComponent component) {
    ConcurrentHashMap<String, AppearData> appearMap = mAppearMap
        .get(getRef());
    if (appearMap == null) {
      appearMap = new ConcurrentHashMap<>();
    }

    AppearData appearData = appearMap.get(component.getRef());
    if (appearData == null) {
      appearData = new AppearData();
    }
    appearData.mAppearComponent = component;
    appearData.hasAppear = true;
    appearMap.put(component.getRef(), appearData);
    mAppearMap.put(getRef(), appearMap);
  }

  /**
   * Bind disappear event
   */
  public void bindDisappearEvent(WXComponent component) {
    ConcurrentHashMap<String, AppearData> appearMap = mAppearMap
        .get(getRef());
    if (appearMap == null) {
      appearMap = new ConcurrentHashMap<>();
    }

    AppearData appearData = appearMap.get(component.getRef());
    if (appearData == null) {
      appearData = new AppearData();
    }
    appearData.mAppearComponent = component;
    appearData.hasDisappear = true;
    appearMap.put(component.getRef(), appearData);
    mAppearMap.put(getRef(), appearMap);
  }

  /**
   * Remove appear event
   */
  public void unbindAppearEvent(WXComponent component) {
    ConcurrentHashMap<String, AppearData> appearMap = mAppearMap
        .get(getView());
    if (appearMap == null) {
      return;
    }
    AppearData appearData = appearMap.get(component.getRef());
    if (appearData == null) {
      return;
    }
    appearData.hasAppear = false;
    if (!appearData.hasDisappear) {
      appearMap.remove(component.getRef());
    }
  }

  /**
   * Remove disappear event
   */
  public void unbindDisappearEvent(WXComponent component) {
    ConcurrentHashMap<String, AppearData> appearMap = mAppearMap
        .get(getView());
    if (appearMap == null) {
      return;
    }
    AppearData appearData = appearMap.get(component.getRef());
    if (appearData == null) {
      return;
    }
    appearData.hasDisappear = false;
    if (!appearData.hasAppear) {
      appearMap.remove(component.getRef());
    }
  }

  /**
   * Scroll by specified distance. Horizontal scroll is not supported now.
   * @param x horizontal distance, not support
   * @param y vertical distance. Negative for scroll to top
   */
  public void scrollBy(final int x, final int y) {
    if (getView() == null || mOrientation != VERTICAL) {
      return;
    }

    getView().postDelayed(new Runnable() {

      @Override
      public void run() {
        ((WXScrollView) getView()).smoothScrollBy(0, -y);
        getView().invalidate();
      }
    }, 16);
    getView().postDelayed(new Runnable() {

      @Override
      public void run() {
        WXRecycleImageManager recycleImageManager = mInstance.getRecycleImageManager();
        if (recycleImageManager != null) {
          recycleImageManager.loadImage();
        }
      }
    }, 250);

  }

  @Override
  public void onScrollChanged(WXScrollView scrollView, int x, int y,
                              int oldx, int oldy) {
    procAppear(scrollView, x, y, oldx, oldy);
  }

  /**
   * Process event like appear and disappear
   */
  private void procAppear(WXScrollView scrollView, int x, int y, int oldx,
                          int oldy) {
    int[] appearComponentLoc = new int[2];
    Rect appearRect = new Rect();
    ConcurrentHashMap<String, AppearData> appearMap = mAppearMap
        .get(mDomObj.ref);
    if (appearMap == null) {
      return;
    }
    Iterator<Entry<String, AppearData>> iterator = appearMap.entrySet()
        .iterator();
    Entry<String, AppearData> entry = null;
    AppearData appearData;
    int appearComponentH;
    int appearComponentBottom;
    int appearComponentTop;
    if (mScrollRect == null) {
      mScrollRect = new Rect();
      getView().getGlobalVisibleRect(mScrollRect);
    }
    int scrollerCenterP = (mScrollRect.top + mScrollRect.bottom) / 2;
    while (iterator.hasNext()) {
      entry = iterator.next();
      appearData = entry.getValue();
      appearData.mAppearComponent.getView().getGlobalVisibleRect(
          appearRect);
      appearData.mAppearComponent.getView().getLocationOnScreen(
          appearComponentLoc);

      if (appearRect.left == 0 && appearRect.top == 0
          && appearRect.left == 0 && appearRect.bottom == 0) {
        continue;
      }

      appearComponentH = (int) appearData.mAppearComponent.getDomObject().getLayoutHeight();
      appearComponentBottom = appearComponentLoc[1] + appearComponentH;
      appearComponentTop = appearComponentLoc[1];

      // State of appear component doesn't change.
      if (appearData.mAppear
          && ((appearComponentTop > mScrollRect.top && appearComponentTop < mScrollRect.bottom) || (appearComponentBottom > mScrollRect.top && appearComponentBottom < mScrollRect.bottom))) {
        continue;
      }

      // appear up
      if (!appearData.mAppear && appearComponentTop < mScrollRect.bottom
          && appearComponentTop > scrollerCenterP) {
        if (WXEnvironment.isApkDebugable()) {
          WXLogUtils.d("procAppear",
                       appearData.mAppearComponent.getRef()
                       + "  appear up");
        }

        appearData.mAppear = true;
        // appear
        if (appearData.hasAppear) {
          Map<String, Object> params = new HashMap<>();
          params.put("direction", "up");
          WXSDKManager.getInstance().fireEvent(mInstanceId,
                                               appearData.mAppearComponent.getRef(),
                                               WXEventType.APPEAR, params);
        }
        continue;
      }

      // appear down
      if (!appearData.mAppear && appearComponentBottom > mScrollRect.top
          && appearComponentBottom < scrollerCenterP) {
        if (WXEnvironment.isApkDebugable()) {
          WXLogUtils.d("procAppear",
                       appearData.mAppearComponent.getRef()
                       + "  appear down");
        }

        appearData.mAppear = true;
        // appear
        if (appearData.hasAppear) {
          Map<String, Object> params = new HashMap<>();
          params.put("direction", "down");
          WXSDKManager.getInstance().fireEvent(mInstanceId,
                                               appearData.mAppearComponent.getRef(),
                                               WXEventType.APPEAR, params);
        }
        continue;
      }

      // disappear down
      if (appearData.mAppear && appearComponentTop > (mScrollRect.bottom)
          && appearComponentBottom > (mScrollRect.bottom)) {
        appearData.mAppear = false;
        // disappear
        if (appearData.hasDisappear) {
          Map<String, Object> params = new HashMap<>();
          params.put("direction", "down");
          WXSDKManager.getInstance().fireEvent(mInstanceId,
                                               appearData.mAppearComponent.getRef(),
                                               WXEventType.DISAPPEAR, params);
        }
        continue;
      }

      // disappear up
      if (appearData.mAppear && appearComponentBottom < mScrollRect.top
          && appearComponentTop < mScrollRect.top) {
        appearData.mAppear = false;
        // disappear
        if (appearData.hasDisappear) {
          Map<String, Object> params = new HashMap<>();
          params.put("direction", "up");
          WXSDKManager.getInstance().fireEvent(mInstanceId,
                                               appearData.mAppearComponent.getRef(),
                                               WXEventType.DISAPPEAR, params);
        }
        continue;
      }
    }
  }

  @Override
  public void onScrollToBottom(WXScrollView scrollView, int x, int y) {

  }

  @Override
  public void onScrollStopped(WXScrollView scrollView, int x, int y) {
    WXRecycleImageManager recycleImageManager = mInstance
        .getRecycleImageManager();
    if (recycleImageManager != null) {
      recycleImageManager.loadImage();
    }
  }

  @Override
  public void onScroll(WXScrollView scrollView, int x, int y) {
  }

  static class AppearData {

    public WXComponent mAppearComponent;
    public boolean hasAppear;
    public boolean hasDisappear;
    public boolean mAppear;
  }
}
