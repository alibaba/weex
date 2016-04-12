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
import android.graphics.Canvas;
import android.graphics.Rect;
import android.os.Handler;
import android.os.Handler.Callback;
import android.os.Message;
import android.util.AttributeSet;
import android.view.MotionEvent;
import android.view.View;
import android.widget.ScrollView;

import com.taobao.weex.ui.component.WXComponent;
import com.taobao.weex.ui.component.WXScroller;
import com.taobao.weex.ui.view.gesture.WXGesture;
import com.taobao.weex.ui.view.gesture.WXGestureObservable;
import com.taobao.weex.utils.WXLogUtils;
import com.taobao.weex.utils.WXReflectionUtils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;


/**
 * Custom-defined scrollView
 */
public class WXScrollView extends ScrollView implements Callback, IWXScroller, WXGestureObservable {

  int mScrollX;
  int mScrollY;
  private WXGesture wxGesture;
  private List<WXScrollViewListener> mScrollViewListeners;
  private WXScroller mWAScroller;
  //sticky
  private View mCurrentStickyView;
  private boolean mRedirectTouchToStickyView;
  private int mStickyOffset;
  private boolean mHasNotDoneActionDown = true;
  @SuppressLint("HandlerLeak")
  private Handler mScrollerTask;
  private int mInitialPosition;
  private int mCheckTime = 100;
  /**
   * The location of mCurrentStickyView
   */
  private int[] mStickyP = new int[2];
  /**
   * Location of the scrollView
   */
  private Rect mScrollRect;
  private int[] stickyScrollerP = new int[2];
  private int[] stickyViewP = new int[2];

  public WXScrollView(Context context, WXScroller waScroller) {
    super(context);
    mWAScroller = waScroller;
    mScrollViewListeners = new ArrayList<>();
    init();
    try {
      WXReflectionUtils.setValue(this, "mMinimumVelocity", 5);
    } catch (Exception e) {
      WXLogUtils.e("[WXScrollView] WXScrollView: " + WXLogUtils.getStackTrace(e));
    }
  }

  private void init() {
    setWillNotDraw(false);
    startScrollerTask();
    setOverScrollMode(View.OVER_SCROLL_NEVER);
  }

  public void startScrollerTask() {
    if (mScrollerTask == null) {
      mScrollerTask = new Handler(this);
    }
    mInitialPosition = getScrollY();
    mScrollerTask.sendEmptyMessageDelayed(0, mCheckTime);
  }

  public WXScrollView(Context context, AttributeSet attrs) {
    super(context, attrs);
    init();
  }

  public WXScrollView(Context context, AttributeSet attrs, int defStyle) {
    super(context, attrs, defStyle);
    setOverScrollMode(View.OVER_SCROLL_NEVER);
  }

  /**
   * Add listener for scrollView.
   */
  public void addScrollViewListener(WXScrollViewListener scrollViewListener) {
    if (!mScrollViewListeners.contains(scrollViewListener)) {
      mScrollViewListeners.add(scrollViewListener);
    }
  }

  public void removeScrollViewListener(WXScrollViewListener scrollViewListener) {
    mScrollViewListeners.remove(scrollViewListener);
  }

  @Override
  public boolean dispatchTouchEvent(MotionEvent ev) {
    if (ev.getAction() == MotionEvent.ACTION_DOWN) {
      mRedirectTouchToStickyView = true;
    }

    if (mRedirectTouchToStickyView) {
      mRedirectTouchToStickyView = mCurrentStickyView != null;

      if (mRedirectTouchToStickyView) {
        mRedirectTouchToStickyView = ev.getY() <= mCurrentStickyView.getHeight()
                                     && ev.getX() >= mCurrentStickyView.getLeft()
                                     && ev.getX() <= mCurrentStickyView.getRight();
      }
    }

    if (mRedirectTouchToStickyView) {
      if (mScrollRect == null) {
        mScrollRect = new Rect();
        getGlobalVisibleRect(mScrollRect);
      }
      mCurrentStickyView.getLocationOnScreen(stickyViewP);
      ev.offsetLocation(0, stickyViewP[1] - mScrollRect.top);
    }
    return super.dispatchTouchEvent(ev);
  }

  @Override
  protected void dispatchDraw(Canvas canvas) {
    super.dispatchDraw(canvas);
    if (mCurrentStickyView != null) {
      canvas.save();
      mCurrentStickyView.getLocationOnScreen(mStickyP);
      int realOffset = (mStickyOffset <= 0 ? mStickyOffset : 0);
      canvas.translate(mStickyP[0], getScrollY() + realOffset);
      canvas.clipRect(0, realOffset, mCurrentStickyView.getWidth(),
                      mCurrentStickyView.getHeight());
      mCurrentStickyView.draw(canvas);
      canvas.restore();
    }
  }

  @Override
  public boolean onTouchEvent(MotionEvent ev) {
    if (mRedirectTouchToStickyView) {

      if (mScrollRect == null) {
        mScrollRect = new Rect();
        getGlobalVisibleRect(mScrollRect);
      }
      mCurrentStickyView.getLocationOnScreen(stickyViewP);
      ev.offsetLocation(0, -(stickyViewP[1] - mScrollRect.top));
    }

    if (ev.getAction() == MotionEvent.ACTION_DOWN) {
      mHasNotDoneActionDown = false;
    }

    if (mHasNotDoneActionDown) {
      MotionEvent down = MotionEvent.obtain(ev);
      down.setAction(MotionEvent.ACTION_DOWN);
      super.onTouchEvent(down);
      mHasNotDoneActionDown = false;
    }

    if (ev.getAction() == MotionEvent.ACTION_UP || ev.getAction() == MotionEvent.ACTION_CANCEL) {
      mHasNotDoneActionDown = true;
    }
    boolean result = super.onTouchEvent(ev);
    if (wxGesture != null) {
      result |= wxGesture.onTouch(this, ev);
    }
    return result;
  }

  @Override
  public void fling(int velocityY) {
    super.fling(velocityY);
    if (mScrollerTask != null) {
      mScrollerTask.removeMessages(0);
    }
    startScrollerTask();
  }

  @Override
  protected void onScrollChanged(int x, int y, int oldx, int oldy) {
    mScrollX = getScrollX();
    mScrollY = getScrollY();
    onScroll(WXScrollView.this, mScrollX, mScrollY);
    View view = getChildAt(getChildCount() - 1);
    if (view == null) {
      return;
    }
    int d = view.getBottom();
    d -= (getHeight() + mScrollY);
    if (d == 0) {
      onScrollToBottom(mScrollX, mScrollY);
    }
    int count = mScrollViewListeners == null ? 0 : mScrollViewListeners.size();
    for (int i = 0; i < count; ++i) {
      mScrollViewListeners.get(i).onScrollChanged(this, x, y, oldx, oldy);
    }

    showStickyView();
  }

  protected void onScroll(WXScrollView scrollView, int x, int y) {
    int count = mScrollViewListeners == null ? 0 : mScrollViewListeners.size();
    for (int i = 0; i < count; ++i) {
      mScrollViewListeners.get(i).onScroll(this, x, y);
    }
  }

  protected void onScrollToBottom(int x, int y) {
    int count = mScrollViewListeners == null ? 0 : mScrollViewListeners.size();
    for (int i = 0; i < count; ++i) {
      mScrollViewListeners.get(i).onScrollToBottom(this, x, y);
    }
  }

  private void showStickyView() {
    View curStickyView = procSticky(mWAScroller.getStickMap());

    if (curStickyView != null) {
      mCurrentStickyView = curStickyView;
    } else {
      mCurrentStickyView = null;
    }
  }

  private View procSticky(Map<String, HashMap<String, WXComponent>> mStickyMap) {
    if (mStickyMap == null) {
      return null;
    }
    HashMap<String, WXComponent> stickyMap = mStickyMap.get(mWAScroller.getRef());
    if (stickyMap == null) {
      return null;
    }

    Iterator<Entry<String, WXComponent>> iterator = stickyMap.entrySet().iterator();
    Entry<String, WXComponent> entry = null;
    WXComponent stickyData;
    while (iterator.hasNext()) {
      entry = iterator.next();
      stickyData = entry.getValue();

      getLocationOnScreen(stickyScrollerP);
      stickyData.getView().getLocationOnScreen(stickyViewP);
      int parentH = stickyData.getParent().getRealView().getHeight();
      int stickyViewH = stickyData.getView().getHeight();
      int stickyShowPos = stickyScrollerP[1];
      int stickyStartHidePos = -parentH + stickyScrollerP[1] + stickyViewH;
      if (stickyViewP[1] <= stickyShowPos && stickyViewP[1] >= (stickyStartHidePos - stickyViewH)) {
        mStickyOffset = stickyViewP[1] - stickyStartHidePos;
        return stickyData.getView();
      }
    }
    return null;
  }

  @Override
  public boolean handleMessage(Message msg) {
    switch (msg.what) {
      case 0:
        if (mScrollerTask != null) {
          mScrollerTask.removeMessages(0);
        }
        int newPosition = getScrollY();
        if (mInitialPosition - newPosition == 0) {//has stopped
          onScrollStoped(WXScrollView.this, getScrollX(), getScrollY());
        } else {
          onScroll(WXScrollView.this, getScrollX(), getScrollY());
          mInitialPosition = getScrollY();
          if (mScrollerTask != null) {
            mScrollerTask.sendEmptyMessageDelayed(0, mCheckTime);
          }
        }
        break;
      default:
        break;
    }
    return true;
  }

  protected void onScrollStoped(WXScrollView scrollView, int x, int y) {
    int count = mScrollViewListeners == null ? 0 : mScrollViewListeners.size();
    for (int i = 0; i < count; ++i) {
      mScrollViewListeners.get(i).onScrollStopped(this, x, y);
    }
  }

  @Override
  public void destroy() {
    if (mScrollerTask != null) {
      mScrollerTask.removeCallbacksAndMessages(null);
    }
  }

  @Override
  public void registerGestureListener(WXGesture wxGesture) {
    this.wxGesture = wxGesture;
  }

  public interface WXScrollViewListener {

    void onScrollChanged(WXScrollView scrollView, int x, int y, int oldx, int oldy);

    void onScrollToBottom(WXScrollView scrollView, int x, int y);

    void onScrollStopped(WXScrollView scrollView, int x, int y);

    void onScroll(WXScrollView scrollView, int x, int y);
  }
}
