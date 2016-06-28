/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.inspector.elements.android;

import android.annotation.TargetApi;
import android.os.Build;
import android.os.Handler;
import android.os.Looper;
import android.view.View;

import com.taobao.weex.devtools.common.LogUtil;
import com.taobao.weex.devtools.common.Util;

import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicReference;

import javax.annotation.Nullable;

abstract class ViewHighlighter {

  public static ViewHighlighter newInstance() {
    // TODO: find ways to do highlighting on older versions too
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR2) {
      return new OverlayHighlighter();
    } else {
      LogUtil.w("Running on pre-JBMR2: View highlighting is not supported");
      return new NoopHighlighter();
    }
  }

  protected ViewHighlighter() {
  }

  public abstract void clearHighlight();

  public abstract void setHighlightedView(View view, int color);

  private static final class NoopHighlighter extends ViewHighlighter {
    @Override
    public void clearHighlight() {
    }

    @Override
    public void setHighlightedView(View view, int color) {
    }
  }

  @TargetApi(Build.VERSION_CODES.JELLY_BEAN_MR2)
  private static final class OverlayHighlighter extends ViewHighlighter {
    // TODO: use the top-level ViewGroupOverlay instead of ViewOverlay so that we don't end up
    //       causing every single view to allocate a ViewOverlay

    private final Handler mHandler;
    private final ViewHighlightOverlays mHighlightOverlays = ViewHighlightOverlays.newInstance();

    // Only assigned on the UI thread
    private View mHighlightedView;

    private AtomicReference<View> mViewToHighlight = new AtomicReference<View>();
    private AtomicInteger mContentColor = new AtomicInteger();

    private final Runnable mHighlightViewOnUiThreadRunnable = new Runnable() {
      @Override
      public void run() {
        highlightViewOnUiThread();
      }
    };

    public OverlayHighlighter() {
      mHandler = new Handler(Looper.getMainLooper());
    }

    @Override
    public void clearHighlight() {
      setHighlightedViewImpl(null, 0);
    }

    @Override
    public void setHighlightedView(View view, int color) {
      setHighlightedViewImpl(Util.throwIfNull(view), color);
    }

    private void setHighlightedViewImpl(@Nullable View view, int color) {
      mHandler.removeCallbacks(mHighlightViewOnUiThreadRunnable);
      mViewToHighlight.set(view);
      mContentColor.set(color);
      mHandler.postDelayed(mHighlightViewOnUiThreadRunnable, 100);
    }

    private void highlightViewOnUiThread() {
      final View viewToHighlight = mViewToHighlight.getAndSet(null);
      if (viewToHighlight == mHighlightedView) {
        return;
      }

      if (mHighlightedView != null) {
        mHighlightOverlays.removeHighlight(mHighlightedView);
      }

      if (viewToHighlight != null) {
        mHighlightOverlays.highlightView(viewToHighlight, mContentColor.get());
      }

      mHighlightedView = viewToHighlight;
    }
  }
}
