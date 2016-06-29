/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.common.android;

import android.annotation.TargetApi;
import android.app.Activity;
import android.content.Context;
import android.content.ContextWrapper;
import android.graphics.PointF;
import android.os.Build;
import android.view.View;
import android.view.ViewGroup;
import android.view.ViewParent;

import com.taobao.weex.devtools.common.Predicate;
import com.taobao.weex.devtools.common.Util;

import javax.annotation.Nullable;

public final class ViewUtil {
  private ViewUtil() {
  }

  private static boolean isHittable(View view) {
    if (view.getVisibility() != View.VISIBLE) {
      return false;
    }

    if (ViewCompat.getInstance().getAlpha(view) < 0.001f) {
      return false;
    }

    return true;
  }

  @Nullable
  public static View hitTest(View view, float x, float y) {
    return hitTest(view, x, y, null /* viewSelector */);
  }

  // x,y are in view's local coordinate space (relative to its own top/left)
  @Nullable
  public static View hitTest(
      View view,
      float x,
      float y,
      @Nullable Predicate<View> viewSelector) {
    View result = hitTestImpl(view, x, y, viewSelector, false);
    if (result == null) {
      result = hitTestImpl(view, x, y, viewSelector, true);
    }
    return result;
  }

  private static View hitTestImpl(
      View view,
      float x,
      float y,
      @Nullable Predicate<View> viewSelector,
      boolean allowViewGroupResult) {
    if (!isHittable(view)) {
      return null;
    }

    if (!ViewUtil.pointInView(view, x, y)) {
      return null;
    }

    if (viewSelector != null && !viewSelector.apply(view)) {
      return null;
    }

    if (!(view instanceof ViewGroup)) {
      return view;
    }

    final ViewGroup viewGroup = (ViewGroup)view;

    // TODO: get list of Views that are sorted in Z- and draw-order, e.g. buildOrderedChildList()
    if (viewGroup.getChildCount() > 0) {
      PointF localPoint = new PointF();

      for (int i = viewGroup.getChildCount() - 1; i >= 0; --i) {
        final View child = viewGroup.getChildAt(i);

        if (ViewUtil.isTransformedPointInView(viewGroup, child, x, y, localPoint)) {
          View childResult = hitTestImpl(
              child,
              localPoint.x,
              localPoint.y,
              viewSelector,
              allowViewGroupResult);

          if (childResult != null) {
            return childResult;
          }
        }
      }
    }

    return allowViewGroupResult ? viewGroup : null;
  }

  public static boolean pointInView(View view, float localX, float localY) {
    return localX >= 0 && localX < (view.getRight() - view.getLeft())
        && localY >= 0 && localY < (view.getBottom() - view.getTop());
  }

  public static boolean isTransformedPointInView(
      ViewGroup parent,
      View child,
      float x,
      float y,
      @Nullable PointF outLocalPoint) {
    Util.throwIfNull(parent);
    Util.throwIfNull(child);

    float localX = x + parent.getScrollX() - child.getLeft();
    float localY = y + parent.getScrollY() - child.getTop();

    // TODO: handle transforms
    /*Matrix childMatrix = child.getMatrix();
    if (!childMatrix.isIdentity()) {
      final float[] localXY = new float[2];
      localXY[0] = localX;
      localXY[1] = localY;
      child.getInverseMatrix
    }*/

    final boolean isInView = ViewUtil.pointInView(child, localX, localY);
    if (isInView && outLocalPoint != null) {
      outLocalPoint.set(localX, localY);
    }

    return isInView;
  }

  @Nullable
  public static Activity tryGetActivity(View view) {
    if (view == null) {
      return null;
    }

    Context context = view.getContext();

    Activity activityFromContext = tryGetActivity(context);
    if (activityFromContext != null) {
      return activityFromContext;
    }

    ViewParent parent = view.getParent();
    if (parent instanceof View) {
      View parentView = (View)parent;
      return tryGetActivity(parentView);
    }

    return null;
  }

  @Nullable
  private static Activity tryGetActivity(Context context) {
    while (context != null) {
      if (context instanceof Activity) {
        return (Activity) context;
      } else if (context instanceof ContextWrapper) {
        context = ((ContextWrapper) context).getBaseContext();
      } else {
        return null;
      }
    }

    return null;
  }

  private static class ViewCompat {
    private static final ViewCompat sInstance;
    static {
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.HONEYCOMB) {
        sInstance = new ViewCompatHoneycomb();
      } else {
        sInstance = new ViewCompat();
      }
    }

    public static ViewCompat getInstance() {
      return sInstance;
    }

    protected ViewCompat() {
    }

    public float getAlpha(View view) {
      return 1.0f;
    }

    @TargetApi(Build.VERSION_CODES.HONEYCOMB)
    private static class ViewCompatHoneycomb extends ViewCompat {
      @Override
      public float getAlpha(View view) {
        return view.getAlpha();
      }
    }
  }
}
