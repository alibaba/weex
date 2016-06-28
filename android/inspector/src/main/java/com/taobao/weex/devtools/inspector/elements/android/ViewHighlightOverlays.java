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
import android.graphics.Canvas;
import android.graphics.Rect;
import android.graphics.Region;
import android.graphics.drawable.ColorDrawable;
import android.os.Build;
import android.view.View;
import android.view.ViewGroup;
import android.view.ViewGroup.MarginLayoutParams;

abstract class ViewHighlightOverlays {

  abstract void highlightView(View view, int mainColor);

  abstract void removeHighlight(View view);

  static ViewHighlightOverlays newInstance() {
    // This may not be needed since ViewHighlighter.newInstance() is already instantiating a
    // NoopHighlighter for SDK_INT < JELLY_BEAN_MR2, but just to make sure...
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR2) {
      return new ViewHighlightOverlaysJellybeanMR2();
    }
    return new NoOpViewHighlightOverlays();
  }

  private static class NoOpViewHighlightOverlays extends ViewHighlightOverlays {

    @Override
    void highlightView(View view, int mainColor) {
    }

    @Override
    void removeHighlight(View view) {
    }
  }

  @TargetApi(Build.VERSION_CODES.JELLY_BEAN_MR2)
  private static class ViewHighlightOverlaysJellybeanMR2 extends ViewHighlightOverlays {
    private static final int MARGIN_OVERLAY_COLOR = 0xaaf4ca9e;
    private static final int PADDING_OVERLAY_COLOR = 0xaabedab6;
    private final MainHighlightDrawable mMainHighlightDrawable = new MainHighlightDrawable();
    private final HighlightDrawable[] mHighlightDrawables = {
        mMainHighlightDrawable,
        new PaddingTopHighlightDrawable(),
        new PaddingBottomHighlightDrawable(),
        new PaddingRightHighlightDrawable(),
        new PaddingLeftHighlightDrawable(),
        new MarginTopHighlightDrawable(),
        new MarginBottomHighlightDrawable(),
        new MarginRightHighlightDrawable(),
        new MarginLeftHighlightDrawable()
    };

    ViewHighlightOverlaysJellybeanMR2() {
    }

    @Override
    void highlightView(View view, int mainColor) {
      mMainHighlightDrawable.setColor(mainColor);

      int total = mHighlightDrawables.length;
      for (int i = 0; i < total; i++) {
        HighlightDrawable drawable = mHighlightDrawables[i];
        drawable.highlightView(view);
        view.getOverlay().add(drawable);
      }
    }

    @Override
    void removeHighlight(View view) {
      for (ColorDrawable drawable : mHighlightDrawables) {
        view.getOverlay().remove(drawable);
      }
    }

    static abstract class HighlightDrawable extends ColorDrawable {

      protected final Rect mMargins = new Rect();
      protected final Rect mPaddings = new Rect();

      HighlightDrawable(int color) {
        super(color);
      }

      public HighlightDrawable() {
      }

      void highlightView(View view) {
        ViewGroup.LayoutParams layoutParams = view.getLayoutParams();
        if (layoutParams instanceof MarginLayoutParams) {
          MarginLayoutParams marginLayoutParams = (MarginLayoutParams) layoutParams;
          mMargins.left = marginLayoutParams.leftMargin;
          mMargins.top = marginLayoutParams.topMargin;
          mMargins.right = marginLayoutParams.rightMargin;
          mMargins.bottom = marginLayoutParams.bottomMargin;
        } else {
          mMargins.left = 0;
          mMargins.top = 0;
          mMargins.right = 0;
          mMargins.bottom = 0;
        }
        mPaddings.left = view.getPaddingLeft();
        mPaddings.top = view.getPaddingTop();
        mPaddings.right = view.getPaddingRight();
        mPaddings.bottom = view.getPaddingBottom();
      }
    }

    static class MainHighlightDrawable extends HighlightDrawable {

      @Override
      void highlightView(View view) {
        super.highlightView(view);
        setBounds(0, 0, view.getWidth(), view.getHeight());
      }

      @Override
      public void draw(Canvas canvas) {
        // We don't have access to the OverlayViewGroup instance directly, but we can manipulate
        // its Canvas via the Drawables' draw(). This allows us to draw outside the View bounds,
        // so we can position the margin overlays correctly.
        Rect newRect = canvas.getClipBounds();
        // Make the Canvas Rect bigger according to the View margins.
        newRect.inset(-(mMargins.right + mMargins.left), -(mMargins.top + mMargins.bottom));
        canvas.clipRect(newRect, Region.Op.REPLACE);
        super.draw(canvas);
      }
    }

    static class PaddingTopHighlightDrawable extends HighlightDrawable {
      PaddingTopHighlightDrawable() {
        super(PADDING_OVERLAY_COLOR);
      }

      @Override
      void highlightView(View view) {
        super.highlightView(view);
        setBounds(mPaddings.left, 0, view.getWidth() - mPaddings.right, mPaddings.top);
      }
    }

    static class PaddingBottomHighlightDrawable extends HighlightDrawable {
      PaddingBottomHighlightDrawable() {
        super(PADDING_OVERLAY_COLOR);
      }

      @Override
      void highlightView(View view) {
        super.highlightView(view);
        setBounds(mPaddings.left, view.getHeight() - mPaddings.bottom,
            view.getWidth() - mPaddings.right, view.getHeight());
      }
    }

    static class PaddingRightHighlightDrawable extends HighlightDrawable {
      PaddingRightHighlightDrawable() {
        super(PADDING_OVERLAY_COLOR);
      }

      @Override
      void highlightView(View view) {
        super.highlightView(view);
        setBounds(view.getWidth() - mPaddings.right, 0, view.getWidth(), view.getHeight());
      }
    }

    static class PaddingLeftHighlightDrawable extends HighlightDrawable {
      PaddingLeftHighlightDrawable() {
        super(PADDING_OVERLAY_COLOR);
      }

      @Override
      void highlightView(View view) {
        super.highlightView(view);
        setBounds(0, 0, mPaddings.left, view.getHeight());
      }
    }

    static class MarginTopHighlightDrawable extends HighlightDrawable {

      MarginTopHighlightDrawable() {
        super(MARGIN_OVERLAY_COLOR);
      }

      @Override
      void highlightView(View view) {
        super.highlightView(view);
        setBounds(0, 0, view.getWidth(), mMargins.top);
      }

      @Override
      public void draw(Canvas canvas) {
        canvas.translate(0, -mMargins.top);
        super.draw(canvas);
      }
    }

    static class MarginBottomHighlightDrawable extends HighlightDrawable {

      MarginBottomHighlightDrawable() {
        super(MARGIN_OVERLAY_COLOR);
      }

      @Override
      void highlightView(View view) {
        super.highlightView(view);
        setBounds(0, view.getHeight() - mMargins.bottom, view.getWidth(), view.getHeight());
      }

      @Override
      public void draw(Canvas canvas) {
        canvas.translate(0, mMargins.bottom + mMargins.top);
        super.draw(canvas);
      }
    }

    static class MarginRightHighlightDrawable extends HighlightDrawable {

      MarginRightHighlightDrawable() {
        super(MARGIN_OVERLAY_COLOR);
      }

      @Override
      void highlightView(View view) {
        super.highlightView(view);
        setBounds(view.getWidth() - mMargins.right, 0, view.getWidth(),
            view.getHeight() + mMargins.top + mMargins.bottom);

      }

      @Override
      public void draw(Canvas canvas) {
        canvas.translate(mMargins.right, -(mMargins.top + mMargins.bottom));
        super.draw(canvas);
      }
    }

    static class MarginLeftHighlightDrawable extends HighlightDrawable {

      MarginLeftHighlightDrawable() {
        super(MARGIN_OVERLAY_COLOR);
      }

      @Override
      void highlightView(View view) {
        super.highlightView(view);
        setBounds(0, 0, mMargins.left, view.getHeight() + mMargins.top + mMargins.bottom);
      }

      @Override
      public void draw(Canvas canvas) {
        canvas.translate(-(mMargins.left + mMargins.right), 0);
        super.draw(canvas);
      }
    }
  }
}