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

import android.annotation.SuppressLint;
import android.content.Context;
import android.os.Handler;
import android.os.Handler.Callback;
import android.os.Looper;
import android.os.Message;
import android.support.v4.view.PagerAdapter;
import android.support.v4.view.ViewPager;
import android.util.AttributeSet;
import android.view.MotionEvent;
import android.view.View;
import android.view.animation.Interpolator;

import com.taobao.weex.ui.view.gesture.WXGesture;
import com.taobao.weex.ui.view.gesture.WXGestureObservable;
import com.taobao.weex.utils.WXLogUtils;

import java.lang.reflect.Field;

/**
 */
@SuppressLint("HandlerLeak")
public class WXCircleViewPager extends ViewPager implements Callback, WXGestureObservable {

  private WXGesture wxGesture;
  private Handler mCircleHandler;
  private WXCircleViewPager mViewPager;
  private boolean isAutoScroll;
  private boolean isPause;
  private long intervalTime = 3 * 1000;
  private WXSmoothScroller mScroller;

  @SuppressLint("NewApi")
  public WXCircleViewPager(Context context) {
    super(context);
    initView();
    setOverScrollMode(View.OVER_SCROLL_NEVER);
    postInitViewPager();

  }

  private void initView() {
    mViewPager = this;
    mCircleHandler = new Handler(Looper.getMainLooper(), this);
  }

  /**
   * Override the Scroller instance with our own class so we can change the
   * duration
   */
  private void postInitViewPager() {
    if (isInEditMode()) {
      return;
    }
    try {
      Field scroller = ViewPager.class.getDeclaredField("mScroller");
      scroller.setAccessible(true);
      Field interpolator = ViewPager.class
          .getDeclaredField("sInterpolator");
      interpolator.setAccessible(true);

      mScroller = new WXSmoothScroller(getContext(),
                                       (Interpolator) interpolator.get(null));
      scroller.set(this, mScroller);
    } catch (Exception e) {
      WXLogUtils.e("[CircleViewPager] postInitViewPager: " + WXLogUtils.getStackTrace(e));
    }
  }

  @SuppressLint("NewApi")
  public WXCircleViewPager(Context context, AttributeSet attrs) {
    super(context, attrs);
    initView();
    setOverScrollMode(View.OVER_SCROLL_NEVER);
    postInitViewPager();
  }

  public boolean handleMessage(Message msg) {
    if (isAutoScroll && !isPause) {
      mViewPager.setCurrentItem(mViewPager.getCurrentItem() + 1);
      mCircleHandler.removeCallbacksAndMessages(null);
      mCircleHandler.sendEmptyMessageDelayed(0, intervalTime);
    }
    return true;
  }

  @Override
  public int getCurrentItem() {
    // TODO Auto-generated method stub
    return super.getCurrentItem();
  }

  @Override
  public boolean onTouchEvent(MotionEvent ev) {
    boolean result = super.onTouchEvent(ev);
    if (wxGesture != null) {
      result |= wxGesture.onTouch(this, ev);
    }
    return result;
  }

  /**
   * Start auto scroll. Must be called after {@link #setAdapter(PagerAdapter)}
   */
  public void startAutoScroll() {
    isAutoScroll = true;
    //		mViewPager.setCurrentItem(0);
    mCircleHandler.sendEmptyMessageDelayed(0, intervalTime);
  }

  /**
   * Stop auto scroll.
   */
  public void stopAutoScroll() {
    isAutoScroll = false;
    mCircleHandler.removeCallbacksAndMessages(null);
  }

  /**
   * get real item
   *
   * @return int real item
   */
  public int getRealCurrentItem() {
    return getCurrentItem() % getCirclePageAdapter().getRealCount();
  }

  /**
   * set real item
   *
   * @param realItem void real item
   */
  public void setRealCurrentItem(int realItem) {
    setCurrentItem(realItem);
  }

  /**
   * @return the circlePageAdapter
   */
  public WXCirclePageAdapter getCirclePageAdapter() {
    return (WXCirclePageAdapter) getAdapter();
  }

  /**
   * @param circlePageAdapter the circlePageAdapter to set
   */
  public void setCirclePageAdapter(WXCirclePageAdapter circlePageAdapter) {
    this.setAdapter(circlePageAdapter);
  }

  /**
   * Get auto scroll interval. The time unit is micro second.
   * The default time interval is 3000 micro second
   * @return the intervalTime
   */
  public long getIntervalTime() {
    return intervalTime;
  }

  /**
   * Set auto scroll interval. The time unit is micro second.
   * The default time interval is 3000 micro second
   * @param intervalTime the intervalTime to set
   */
  public void setIntervalTime(long intervalTime) {
    this.intervalTime = intervalTime;
  }

  @Override
  public boolean dispatchTouchEvent(MotionEvent ev) {
    // TODO Auto-generated method stub
    if (ev.getAction() == MotionEvent.ACTION_DOWN) {// Stop auto scroll
      isPause = true;
      if (mCircleHandler != null) {
        mCircleHandler.removeCallbacksAndMessages(null);
      }
    } else if (ev.getAction() == MotionEvent.ACTION_CANCEL) {// Restart auto scroll
      isPause = false;
      if (mCircleHandler != null) {
        mCircleHandler.sendEmptyMessageDelayed(0, intervalTime);
      }
    } else if (ev.getAction() == MotionEvent.ACTION_UP) {
      isPause = false;
      if (mCircleHandler != null) {
        mCircleHandler.sendEmptyMessageDelayed(0, intervalTime);
      }
    }

    return super.dispatchTouchEvent(ev);
  }

  public void destory() {
    if (mCircleHandler != null) {
      mCircleHandler.removeCallbacksAndMessages(null);
    }
  }

  @Override
  public void registerGestureListener(WXGesture wxGesture) {
    this.wxGesture = wxGesture;
  }
}
