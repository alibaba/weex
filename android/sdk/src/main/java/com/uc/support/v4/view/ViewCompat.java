/*
 * Copyright (C) 2011 The Android Open Source Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.uc.support.v4.view;

import android.content.res.ColorStateList;
import android.graphics.Paint;
import android.graphics.PixelFormat;
import android.graphics.PorterDuff;
import android.graphics.Rect;
import android.graphics.drawable.Drawable;
import android.os.Build;
import android.os.Bundle;
import com.uc.support.annotation.FloatRange;
import com.uc.support.annotation.IdRes;
import com.uc.support.annotation.IntDef;
import com.uc.support.annotation.Nullable;
import android.support.v4.view.accessibility.AccessibilityNodeInfoCompat;
import android.support.v4.view.accessibility.AccessibilityNodeProviderCompat;
import android.util.Log;
import android.view.MotionEvent;
import android.view.VelocityTracker;
import android.view.View;
import android.view.ViewConfiguration;
import android.view.ViewGroup;
import android.view.ViewParent;
import android.view.accessibility.AccessibilityEvent;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.WeakHashMap;

/**
 * Helper for accessing features in {@link View} introduced after API
 * level 4 in a backwards compatible fashion.
 */
public class ViewCompat {
    private static final String TAG = "ViewCompat";


    /** @hide */
    @IntDef({OVER_SCROLL_ALWAYS, OVER_SCROLL_IF_CONTENT_SCROLLS, OVER_SCROLL_NEVER})
    @Retention(RetentionPolicy.SOURCE)
    private @interface OverScroll {}

    /**
     * Always allow a user to over-scroll this view, provided it is a
     * view that can scroll.
     */
    public static final int OVER_SCROLL_ALWAYS = 0;

    /**
     * Allow a user to over-scroll this view only if the content is large
     * enough to meaningfully scroll, provided it is a view that can scroll.
     */
    public static final int OVER_SCROLL_IF_CONTENT_SCROLLS = 1;

    /**
     * Never allow a user to over-scroll this view.
     */
    public static final int OVER_SCROLL_NEVER = 2;

    private static final long FAKE_FRAME_TIME = 10;

    /** @hide */
    @IntDef({
            IMPORTANT_FOR_ACCESSIBILITY_AUTO,
            IMPORTANT_FOR_ACCESSIBILITY_YES,
            IMPORTANT_FOR_ACCESSIBILITY_NO,
            IMPORTANT_FOR_ACCESSIBILITY_NO_HIDE_DESCENDANTS
    })
    @Retention(RetentionPolicy.SOURCE)
    private @interface ImportantForAccessibility {}

    /**
     * Automatically determine whether a view is important for accessibility.
     */
    public static final int IMPORTANT_FOR_ACCESSIBILITY_AUTO = 0x00000000;

    /**
     * The view is important for accessibility.
     */
    public static final int IMPORTANT_FOR_ACCESSIBILITY_YES = 0x00000001;

    /**
     * The view is not important for accessibility.
     */
    public static final int IMPORTANT_FOR_ACCESSIBILITY_NO = 0x00000002;

    /**
     * The view is not important for accessibility, nor are any of its
     * descendant views.
     */
    public static final int IMPORTANT_FOR_ACCESSIBILITY_NO_HIDE_DESCENDANTS = 0x00000004;

    /** @hide */
    @IntDef({
            ACCESSIBILITY_LIVE_REGION_NONE,
            ACCESSIBILITY_LIVE_REGION_POLITE,
            ACCESSIBILITY_LIVE_REGION_ASSERTIVE
    })
    @Retention(RetentionPolicy.SOURCE)
    private @interface AccessibilityLiveRegion {}

    /**
     * Live region mode specifying that accessibility services should not
     * automatically announce changes to this view. This is the default live
     * region mode for most views.
     * <p>
     * Use with {@link ViewCompat#setAccessibilityLiveRegion(View, int)}.
     */
    public static final int ACCESSIBILITY_LIVE_REGION_NONE = 0x00000000;

    /**
     * Live region mode specifying that accessibility services should announce
     * changes to this view.
     * <p>
     * Use with {@link ViewCompat#setAccessibilityLiveRegion(View, int)}.
     */
    public static final int ACCESSIBILITY_LIVE_REGION_POLITE = 0x00000001;

    /**
     * Live region mode specifying that accessibility services should interrupt
     * ongoing speech to immediately announce changes to this view.
     * <p>
     * Use with {@link ViewCompat#setAccessibilityLiveRegion(View, int)}.
     */
    public static final int ACCESSIBILITY_LIVE_REGION_ASSERTIVE = 0x00000002;

    /** @hide */
    @IntDef({LAYER_TYPE_NONE, LAYER_TYPE_SOFTWARE, LAYER_TYPE_HARDWARE})
    @Retention(RetentionPolicy.SOURCE)
    private @interface LayerType {}

    /**
     * Indicates that the view does not have a layer.
     */
    public static final int LAYER_TYPE_NONE = 0;

    /**
     * <p>Indicates that the view has a software layer. A software layer is backed
     * by a bitmap and causes the view to be rendered using Android's software
     * rendering pipeline, even if hardware acceleration is enabled.</p>
     *
     * <p>Software layers have various usages:</p>
     * <p>When the application is not using hardware acceleration, a software layer
     * is useful to apply a specific color filter and/or blending mode and/or
     * translucency to a view and all its children.</p>
     * <p>When the application is using hardware acceleration, a software layer
     * is useful to render drawing primitives not supported by the hardware
     * accelerated pipeline. It can also be used to cache a complex view tree
     * into a texture and reduce the complexity of drawing operations. For instance,
     * when animating a complex view tree with a translation, a software layer can
     * be used to render the view tree only once.</p>
     * <p>Software layers should be avoided when the affected view tree updates
     * often. Every update will require to re-render the software layer, which can
     * potentially be slow (particularly when hardware acceleration is turned on
     * since the layer will have to be uploaded into a hardware texture after every
     * update.)</p>
     */
    public static final int LAYER_TYPE_SOFTWARE = 1;

    /**
     * <p>Indicates that the view has a hardware layer. A hardware layer is backed
     * by a hardware specific texture (generally Frame Buffer Objects or FBO on
     * OpenGL hardware) and causes the view to be rendered using Android's hardware
     * rendering pipeline, but only if hardware acceleration is turned on for the
     * view hierarchy. When hardware acceleration is turned off, hardware layers
     * behave exactly as {@link #LAYER_TYPE_SOFTWARE software layers}.</p>
     *
     * <p>A hardware layer is useful to apply a specific color filter and/or
     * blending mode and/or translucency to a view and all its children.</p>
     * <p>A hardware layer can be used to cache a complex view tree into a
     * texture and reduce the complexity of drawing operations. For instance,
     * when animating a complex view tree with a translation, a hardware layer can
     * be used to render the view tree only once.</p>
     * <p>A hardware layer can also be used to increase the rendering quality when
     * rotation transformations are applied on a view. It can also be used to
     * prevent potential clipping issues when applying 3D transforms on a view.</p>
     */
    public static final int LAYER_TYPE_HARDWARE = 2;

    /** @hide */
    @IntDef({
            LAYOUT_DIRECTION_LTR,
            LAYOUT_DIRECTION_RTL,
            LAYOUT_DIRECTION_INHERIT,
            LAYOUT_DIRECTION_LOCALE})
    @Retention(RetentionPolicy.SOURCE)
    private @interface LayoutDirectionMode {}

    /** @hide */
    @IntDef({
            LAYOUT_DIRECTION_LTR,
            LAYOUT_DIRECTION_RTL
    })
    @Retention(RetentionPolicy.SOURCE)
    private @interface ResolvedLayoutDirectionMode {}

    /**
     * Horizontal layout direction of this view is from Left to Right.
     */
    public static final int LAYOUT_DIRECTION_LTR = 0;

    /**
     * Horizontal layout direction of this view is from Right to Left.
     */
    public static final int LAYOUT_DIRECTION_RTL = 1;

    /**
     * Horizontal layout direction of this view is inherited from its parent.
     * Use with {@link #setLayoutDirection}.
     */
    public static final int LAYOUT_DIRECTION_INHERIT = 2;

    /**
     * Horizontal layout direction of this view is from deduced from the default language
     * script for the locale. Use with {@link #setLayoutDirection}.
     */
    public static final int LAYOUT_DIRECTION_LOCALE = 3;

    /**
     * Bits of {@link #getMeasuredWidthAndState} and
     * {@link #getMeasuredWidthAndState} that provide the actual measured size.
     */
    public static final int MEASURED_SIZE_MASK = 0x00ffffff;

    /**
     * Bits of {@link #getMeasuredWidthAndState} and
     * {@link #getMeasuredWidthAndState} that provide the additional state bits.
     */
    public static final int MEASURED_STATE_MASK = 0xff000000;

    /**
     * Bit shift of {@link #MEASURED_STATE_MASK} to get to the height bits
     * for functions that combine both width and height into a single int,
     * such as {@link #getMeasuredState} and the childState argument of
     * {@link #resolveSizeAndState(int, int, int)}.
     */
    public static final int MEASURED_HEIGHT_STATE_SHIFT = 16;

    /**
     * Bit of {@link #getMeasuredWidthAndState} and
     * {@link #getMeasuredWidthAndState} that indicates the measured size
     * is smaller that the space the view would like to have.
     */
    public static final int MEASURED_STATE_TOO_SMALL = 0x01000000;

    /**
     * Indicates no axis of view scrolling.
     */
    public static final int SCROLL_AXIS_NONE = 0;

    /**
     * Indicates scrolling along the horizontal axis.
     */
    public static final int SCROLL_AXIS_HORIZONTAL = 1 << 0;

    /**
     * Indicates scrolling along the vertical axis.
     */
    public static final int SCROLL_AXIS_VERTICAL = 1 << 1;

    interface ViewCompatImpl {
        public boolean canScrollHorizontally(View v, int direction);
        public boolean canScrollVertically(View v, int direction);
        public int getOverScrollMode(View v);
        public void setOverScrollMode(View v, int mode);
        public void onInitializeAccessibilityEvent(View v, AccessibilityEvent event);
        public void onPopulateAccessibilityEvent(View v, AccessibilityEvent event);
        public void onInitializeAccessibilityNodeInfo(View v, AccessibilityNodeInfoCompat info);
        public void setAccessibilityDelegate(View v, @Nullable AccessibilityDelegateCompat delegate);
        public boolean hasAccessibilityDelegate(View v);
        public boolean hasTransientState(View view);
        public void setHasTransientState(View view, boolean hasTransientState);
        public void postInvalidateOnAnimation(View view);
        public void postInvalidateOnAnimation(View view, int left, int top, int right, int bottom);
        public void postOnAnimation(View view, Runnable action);
        public void postOnAnimationDelayed(View view, Runnable action, long delayMillis);
        public int getImportantForAccessibility(View view);
        public void setImportantForAccessibility(View view, int mode);
        public boolean isImportantForAccessibility(View view);
        public boolean performAccessibilityAction(View view, int action, Bundle arguments);
        public AccessibilityNodeProviderCompat getAccessibilityNodeProvider(View view);
        public float getAlpha(View view);
        public void setLayerType(View view, int layerType, Paint paint);
        public int getLayerType(View view);
        public int getLabelFor(View view);
        public void setLabelFor(View view, int id);
        public void setLayerPaint(View view, Paint paint);
        public int getLayoutDirection(View view);
        public void setLayoutDirection(View view, int layoutDirection);
        public ViewParent getParentForAccessibility(View view);
        public boolean isOpaque(View view);
        public int resolveSizeAndState(int size, int measureSpec, int childMeasuredState);
        public int getMeasuredWidthAndState(View view);
        public int getMeasuredHeightAndState(View view);
        public int getMeasuredState(View view);
        public int getAccessibilityLiveRegion(View view);
        public void setAccessibilityLiveRegion(View view, int mode);
        public int getPaddingStart(View view);
        public int getPaddingEnd(View view);
        public void setPaddingRelative(View view, int start, int top, int end, int bottom);
        public void dispatchStartTemporaryDetach(View view);
        public void dispatchFinishTemporaryDetach(View view);
        public float getX(View view);
        public float getY(View view);
        public float getRotation(View view);
        public float getRotationX(View view);
        public float getRotationY(View view);
        public float getScaleX(View view);
        public float getScaleY(View view);
        public float getTranslationX(View view);
        public float getTranslationY(View view);
        public int getMinimumWidth(View view);
        public int getMinimumHeight(View view);
        public ViewPropertyAnimatorCompat animate(View view);
        public void setRotation(View view, float value);
        public void setRotationX(View view, float value);
        public void setRotationY(View view, float value);
        public void setScaleX(View view, float value);
        public void setScaleY(View view, float value);
        public void setTranslationX(View view, float value);
        public void setTranslationY(View view, float value);
        public void setX(View view, float value);
        public void setY(View view, float value);
        public void setAlpha(View view, float value);
        public void setPivotX(View view, float value);
        public void setPivotY(View view, float value);
        public float getPivotX(View view);
        public float getPivotY(View view);
        public void setElevation(View view, float elevation);
        public float getElevation(View view);
        public void setTranslationZ(View view, float translationZ);
        public float getTranslationZ(View view);
        public void setClipBounds(View view, Rect clipBounds);
        public Rect getClipBounds(View view);
        public void setTransitionName(View view, String transitionName);
        public String getTransitionName(View view);
        public int getWindowSystemUiVisibility(View view);
        public void requestApplyInsets(View view);
        public void setChildrenDrawingOrderEnabled(ViewGroup viewGroup, boolean enabled);
        public boolean getFitsSystemWindows(View view);
        public boolean hasOverlappingRendering(View view);
        void setFitsSystemWindows(View view, boolean fitSystemWindows);
        void jumpDrawablesToCurrentState(View v);
        void setOnApplyWindowInsetsListener(View view, OnApplyWindowInsetsListener listener);
        WindowInsetsCompat onApplyWindowInsets(View v, WindowInsetsCompat insets);
        WindowInsetsCompat dispatchApplyWindowInsets(View v, WindowInsetsCompat insets);
        void setSaveFromParentEnabled(View view, boolean enabled);
        void setActivated(View view, boolean activated);
        boolean isPaddingRelative(View view);
        ColorStateList getBackgroundTintList(View view);
        void setBackgroundTintList(View view, ColorStateList tintList);
        PorterDuff.Mode getBackgroundTintMode(View view);
        void setBackgroundTintMode(View view, PorterDuff.Mode mode);
        void setNestedScrollingEnabled(View view, boolean enabled);
        boolean isNestedScrollingEnabled(View view);
        boolean startNestedScroll(View view, int axes);
        void stopNestedScroll(View view);
        boolean hasNestedScrollingParent(View view);
        boolean dispatchNestedScroll(View view, int dxConsumed, int dyConsumed, int dxUnconsumed,
                int dyUnconsumed, int[] offsetInWindow);
        boolean dispatchNestedPreScroll(View view, int dx, int dy, int[] consumed,
                int[] offsetInWindow);
        boolean dispatchNestedFling(View view, float velocityX, float velocityY, boolean consumed);
        boolean dispatchNestedPreFling(View view, float velocityX, float velocityY);
        boolean isLaidOut(View view);
        int combineMeasuredStates(int curState, int newState);
        public float getZ(View view);
        public boolean isAttachedToWindow(View view);
    }

    static class BaseViewCompatImpl implements ViewCompatImpl {
        private Method mDispatchStartTemporaryDetach;
        private Method mDispatchFinishTemporaryDetach;
        private boolean mTempDetachBound;
        WeakHashMap<View, ViewPropertyAnimatorCompat> mViewPropertyAnimatorCompatMap = null;


        public boolean canScrollHorizontally(View v, int direction) {
            return (v instanceof ScrollingView) &&
                canScrollingViewScrollHorizontally((ScrollingView) v, direction);
        }
        public boolean canScrollVertically(View v, int direction) {
            return (v instanceof ScrollingView) &&
                    canScrollingViewScrollVertically((ScrollingView) v, direction);
        }
        public int getOverScrollMode(View v) {
            return OVER_SCROLL_NEVER;
        }
        public void setOverScrollMode(View v, int mode) {
            // Do nothing; API doesn't exist
        }
        public void setAccessibilityDelegate(View v, AccessibilityDelegateCompat delegate) {
            // Do nothing; API doesn't exist
        }

        @Override
        public boolean hasAccessibilityDelegate(View v) {
            return false;
        }

        public void onPopulateAccessibilityEvent(View v, AccessibilityEvent event) {
            // Do nothing; API doesn't exist
        }
        public void onInitializeAccessibilityEvent(View v, AccessibilityEvent event) {
         // Do nothing; API doesn't exist
        }
        public void onInitializeAccessibilityNodeInfo(View v, AccessibilityNodeInfoCompat info) {
            // Do nothing; API doesn't exist
        }
        public boolean hasTransientState(View view) {
            // A view can't have transient state if transient state wasn't supported.
            return false;
        }
        public void setHasTransientState(View view, boolean hasTransientState) {
            // Do nothing; API doesn't exist
        }
        public void postInvalidateOnAnimation(View view) {
            view.invalidate();
        }
        public void postInvalidateOnAnimation(View view, int left, int top, int right, int bottom) {
            view.invalidate(left, top, right, bottom);
        }
        public void postOnAnimation(View view, Runnable action) {
            view.postDelayed(action, getFrameTime());
        }
        public void postOnAnimationDelayed(View view, Runnable action, long delayMillis) {
            view.postDelayed(action, getFrameTime() + delayMillis);
        }
        long getFrameTime() {
            return FAKE_FRAME_TIME;
        }
        public int getImportantForAccessibility(View view) {
            return 0;
        }
        public void setImportantForAccessibility(View view, int mode) {

        }
        public boolean isImportantForAccessibility(View view) {
            return true;
        }
        public boolean performAccessibilityAction(View view, int action, Bundle arguments) {
            return false;
        }
        public AccessibilityNodeProviderCompat getAccessibilityNodeProvider(View view) {
            return null;
        }
        public float getAlpha(View view) {
            return 1.0f;
        }
        public void setLayerType(View view, int layerType, Paint paint) {
            // No-op until layers became available (HC)
        }
        public int getLayerType(View view) {
            return LAYER_TYPE_NONE;
        }
        public int getLabelFor(View view) {
            return 0;
        }
        public void setLabelFor(View view, int id) {

        }
        public void setLayerPaint(View view, Paint p) {
            // No-op until layers became available (HC)
        }

        @Override
        public int getLayoutDirection(View view) {
            return LAYOUT_DIRECTION_LTR;
        }

        @Override
        public void setLayoutDirection(View view, int layoutDirection) {
            // No-op
        }

        @Override
        public ViewParent getParentForAccessibility(View view) {
            return view.getParent();
        }

        @Override
        public boolean isOpaque(View view) {
            final Drawable bg = view.getBackground();
            if (bg != null) {
                return bg.getOpacity() == PixelFormat.OPAQUE;
            }
            return false;
        }

        public int resolveSizeAndState(int size, int measureSpec, int childMeasuredState) {
            return View.resolveSize(size, measureSpec);
        }

        @Override
        public int getMeasuredWidthAndState(View view) {
            return view.getMeasuredWidth();
        }

        @Override
        public int getMeasuredHeightAndState(View view) {
            return view.getMeasuredHeight();
        }

        @Override
        public int getMeasuredState(View view) {
            return 0;
        }

        @Override
        public int getAccessibilityLiveRegion(View view) {
            return ACCESSIBILITY_LIVE_REGION_NONE;
        }

        @Override
        public void setAccessibilityLiveRegion(View view, int mode) {
            // No-op
        }

        @Override
        public int getPaddingStart(View view) {
            return view.getPaddingLeft();
        }

        @Override
        public int getPaddingEnd(View view) {
            return view.getPaddingRight();
        }

        @Override
        public void setPaddingRelative(View view, int start, int top, int end, int bottom) {
            view.setPadding(start, top, end, bottom);
        }

        @Override
        public void dispatchStartTemporaryDetach(View view) {
            if (!mTempDetachBound) {
                bindTempDetach();
            }
            if (mDispatchStartTemporaryDetach != null) {
                try {
                    mDispatchStartTemporaryDetach.invoke(view);
                } catch (Exception e) {
                    Log.d(TAG, "Error calling dispatchStartTemporaryDetach", e);
                }
            } else {
                // Try this instead
                view.onStartTemporaryDetach();
            }
        }

        @Override
        public void dispatchFinishTemporaryDetach(View view) {
            if (!mTempDetachBound) {
                bindTempDetach();
            }
            if (mDispatchFinishTemporaryDetach != null) {
                try {
                    mDispatchFinishTemporaryDetach.invoke(view);
                } catch (Exception e) {
                    Log.d(TAG, "Error calling dispatchFinishTemporaryDetach", e);
                }
            } else {
                // Try this instead
                view.onFinishTemporaryDetach();
            }
        }

        @Override
        public boolean hasOverlappingRendering(View view) {
            return true;
        }

        private void bindTempDetach() {
            try {
                mDispatchStartTemporaryDetach = View.class.getDeclaredMethod(
                        "dispatchStartTemporaryDetach");
                mDispatchFinishTemporaryDetach = View.class.getDeclaredMethod(
                        "dispatchFinishTemporaryDetach");
            } catch (NoSuchMethodException e) {
                Log.e(TAG, "Couldn't find method", e);
            }
            mTempDetachBound = true;
        }

        @Override
        public float getTranslationX(View view) {
            return 0;
        }

        @Override
        public float getTranslationY(View view) {
            return 0;
        }

        @Override
        public float getX(View view) {
            return 0;
        }

        @Override
        public float getY(View view) {
            return 0;
        }

        @Override
        public float getRotation(View view) {
            return 0;
        }

        @Override
        public float getRotationX(View view) {
            return 0;
        }

        @Override
        public float getRotationY(View view) {
            return 0;
        }

        @Override
        public float getScaleX(View view) {
            return 0;
        }

        @Override
        public float getScaleY(View view) {
            return 0;
        }

        @Override
        public int getMinimumWidth(View view) {
            return ViewCompatBase.getMinimumWidth(view);
        }

        @Override
        public int getMinimumHeight(View view) {
            return ViewCompatBase.getMinimumHeight(view);
        }

        @Override
        public ViewPropertyAnimatorCompat animate(View view) {
            return new ViewPropertyAnimatorCompat(view);
        }

        @Override
        public void setRotation(View view, float value) {
            // noop
        }

        @Override
        public void setTranslationX(View view, float value) {
            // noop
        }

        @Override
        public void setTranslationY(View view, float value) {
            // noop
        }

        @Override
        public void setAlpha(View view, float value) {
            // noop
        }

        @Override
        public void setRotationX(View view, float value) {
            // noop
        }

        @Override
        public void setRotationY(View view, float value) {
            // noop
        }

        @Override
        public void setScaleX(View view, float value) {
            // noop
        }

        @Override
        public void setScaleY(View view, float value) {
            // noop
        }

        @Override
        public void setX(View view, float value) {
            // noop
        }

        @Override
        public void setY(View view, float value) {
            // noop
        }

        @Override
        public void setPivotX(View view, float value) {
            // noop
        }

        @Override
        public void setPivotY(View view, float value) {
            // noop
        }

        @Override
        public float getPivotX(View view) {
            return 0;
        }

        @Override
        public float getPivotY(View view) {
            return 0;
        }

        @Override
        public void setTransitionName(View view, String transitionName) {
        }

        @Override
        public String getTransitionName(View view) {
            return null;
        }

        @Override
        public int getWindowSystemUiVisibility(View view) {
            return 0;
        }

        @Override
        public void requestApplyInsets(View view) {
        }

        @Override
        public void setElevation(View view, float elevation) {
        }

        @Override
        public float getElevation(View view) {
            return 0f;
        }

        @Override
        public void setTranslationZ(View view, float translationZ) {
        }

        @Override
        public float getTranslationZ(View view) {
            return 0f;
        }

        @Override
        public void setClipBounds(View view, Rect clipBounds) {
        }

        @Override
        public Rect getClipBounds(View view) {
            return null;
        }

        @Override
        public void setChildrenDrawingOrderEnabled(ViewGroup viewGroup, boolean enabled) {
            // noop
        }

        @Override
        public boolean getFitsSystemWindows(View view) {
            return false;
        }

        @Override
        public void setFitsSystemWindows(View view, boolean fitSystemWindows) {
            // noop
        }

        @Override
        public void jumpDrawablesToCurrentState(View view) {
            // Do nothing; API didn't exist.
        }

        @Override
        public void setOnApplyWindowInsetsListener(View view,
                OnApplyWindowInsetsListener listener) {
            // noop
        }

        @Override
        public WindowInsetsCompat onApplyWindowInsets(View v, WindowInsetsCompat insets) {
            return insets;
        }

        @Override
        public WindowInsetsCompat dispatchApplyWindowInsets(View v, WindowInsetsCompat insets) {
            return insets;
        }

        @Override
        public void setSaveFromParentEnabled(View v, boolean enabled) {
            // noop
        }

        @Override
        public void setActivated(View view, boolean activated) {
            // noop
        }

        @Override
        public boolean isPaddingRelative(View view) {
            return false;
        }

        public void setNestedScrollingEnabled(View view, boolean enabled) {
            if (view instanceof NestedScrollingChild) {
                ((NestedScrollingChild) view).setNestedScrollingEnabled(enabled);
            }
        }

        @Override
        public boolean isNestedScrollingEnabled(View view) {
            if (view instanceof NestedScrollingChild) {
                return ((NestedScrollingChild) view).isNestedScrollingEnabled();
            }
            return false;
        }

        @Override
        public ColorStateList getBackgroundTintList(View view) {
            return ViewCompatBase.getBackgroundTintList(view);
        }

        @Override
        public void setBackgroundTintList(View view, ColorStateList tintList) {
            ViewCompatBase.setBackgroundTintList(view, tintList);
        }

        @Override
        public void setBackgroundTintMode(View view, PorterDuff.Mode mode) {
            ViewCompatBase.setBackgroundTintMode(view, mode);
        }

        @Override
        public PorterDuff.Mode getBackgroundTintMode(View view) {
            return ViewCompatBase.getBackgroundTintMode(view);
        }

        private boolean canScrollingViewScrollHorizontally(ScrollingView view, int direction) {
            final int offset = view.computeHorizontalScrollOffset();
            final int range = view.computeHorizontalScrollRange() -
                    view.computeHorizontalScrollExtent();
            if (range == 0) return false;
            if (direction < 0) {
                return offset > 0;
            } else {
                return offset < range - 1;
            }
        }

        private boolean canScrollingViewScrollVertically(ScrollingView view, int direction) {
            final int offset = view.computeVerticalScrollOffset();
            final int range = view.computeVerticalScrollRange() -
                    view.computeVerticalScrollExtent();
            if (range == 0) return false;
            if (direction < 0) {
                return offset > 0;
            } else {
                return offset < range - 1;
            }
        }

        public boolean startNestedScroll(View view, int axes) {
            if (view instanceof NestedScrollingChild) {
                return ((NestedScrollingChild) view).startNestedScroll(axes);
            }
            return false;
        }

        @Override
        public void stopNestedScroll(View view) {
            if (view instanceof NestedScrollingChild) {
                ((NestedScrollingChild) view).stopNestedScroll();
            }
        }

        @Override
        public boolean hasNestedScrollingParent(View view) {
            if (view instanceof NestedScrollingChild) {
                return ((NestedScrollingChild) view).hasNestedScrollingParent();
            }
            return false;
        }

        @Override
        public boolean dispatchNestedScroll(View view, int dxConsumed, int dyConsumed,
                int dxUnconsumed, int dyUnconsumed, int[] offsetInWindow) {
            if (view instanceof NestedScrollingChild) {
                return ((NestedScrollingChild) view).dispatchNestedScroll(dxConsumed, dyConsumed,
                        dxUnconsumed, dyUnconsumed, offsetInWindow);
            }
            return false;
        }

        @Override
        public boolean dispatchNestedPreScroll(View view, int dx, int dy,
                int[] consumed, int[] offsetInWindow) {
            if (view instanceof NestedScrollingChild) {
                return ((NestedScrollingChild) view).dispatchNestedPreScroll(dx, dy, consumed,
                        offsetInWindow);
            }
            return false;
        }

        @Override
        public boolean dispatchNestedFling(View view, float velocityX, float velocityY,
                boolean consumed) {
            if (view instanceof NestedScrollingChild) {
                return ((NestedScrollingChild) view).dispatchNestedFling(velocityX, velocityY,
                        consumed);
            }
            return false;
        }

        @Override
        public boolean dispatchNestedPreFling(View view, float velocityX, float velocityY) {
            if (view instanceof NestedScrollingChild) {
                return ((NestedScrollingChild) view).dispatchNestedPreFling(velocityX, velocityY);
            }
            return false;
        }

        @Override
        public boolean isLaidOut(View view) {
            return ViewCompatBase.isLaidOut(view);
        }

        @Override
        public int combineMeasuredStates(int curState, int newState) {
            return curState | newState;
        }

        @Override
        public float getZ(View view) {
            return getTranslationZ(view) + getElevation(view);
        }

        @Override
        public boolean isAttachedToWindow(View view) {
            return ViewCompatBase.isAttachedToWindow(view);
        }
    }

    static class EclairMr1ViewCompatImpl extends BaseViewCompatImpl {
        @Override
        public boolean isOpaque(View view) {
            return ViewCompatEclairMr1.isOpaque(view);
        }

        @Override
        public void setChildrenDrawingOrderEnabled(ViewGroup viewGroup, boolean enabled) {
            ViewCompatEclairMr1.setChildrenDrawingOrderEnabled(viewGroup, enabled);
        }
    }

    static class GBViewCompatImpl extends EclairMr1ViewCompatImpl {
        @Override
        public int getOverScrollMode(View v) {
            return ViewCompatGingerbread.getOverScrollMode(v);
        }
        @Override
        public void setOverScrollMode(View v, int mode) {
            ViewCompatGingerbread.setOverScrollMode(v, mode);
        }
    }

    static class HCViewCompatImpl extends GBViewCompatImpl {
        @Override
        long getFrameTime() {
            return ViewCompatHC.getFrameTime();
        }
        @Override
        public float getAlpha(View view) {
            return ViewCompatHC.getAlpha(view);
        }
        @Override
        public void setLayerType(View view, int layerType, Paint paint) {
            ViewCompatHC.setLayerType(view, layerType, paint);
        }
        @Override
        public int getLayerType(View view)  {
            return ViewCompatHC.getLayerType(view);
        }
        @Override
        public void setLayerPaint(View view, Paint paint) {
            // Make sure the paint is correct; this will be cheap if it's the same
            // instance as was used to call setLayerType earlier.
            setLayerType(view, getLayerType(view), paint);
            // This is expensive, but the only way to accomplish this before JB-MR1.
            view.invalidate();
        }
        @Override
        public int resolveSizeAndState(int size, int measureSpec, int childMeasuredState) {
            return ViewCompatHC.resolveSizeAndState(size, measureSpec, childMeasuredState);
        }
        @Override
        public int getMeasuredWidthAndState(View view) {
            return ViewCompatHC.getMeasuredWidthAndState(view);
        }
        @Override
        public int getMeasuredHeightAndState(View view) {
            return ViewCompatHC.getMeasuredHeightAndState(view);
        }
        @Override
        public int getMeasuredState(View view) {
            return ViewCompatHC.getMeasuredState(view);
        }
        @Override
        public float getTranslationX(View view) {
            return ViewCompatHC.getTranslationX(view);
        }
        @Override
        public float getTranslationY(View view) {
            return ViewCompatHC.getTranslationY(view);
        }
        @Override
        public void setTranslationX(View view, float value) {
            ViewCompatHC.setTranslationX(view, value);
        }
        @Override
        public void setTranslationY(View view, float value) {
            ViewCompatHC.setTranslationY(view, value);
        }
        @Override
        public void setAlpha(View view, float value) {
            ViewCompatHC.setAlpha(view, value);
        }
        @Override
        public void setX(View view, float value) {
            ViewCompatHC.setX(view, value);
        }
        @Override
        public void setY(View view, float value) {
            ViewCompatHC.setY(view, value);
        }
        @Override
        public void setRotation(View view, float value) {
            ViewCompatHC.setRotation(view, value);
        }
        @Override
        public void setRotationX(View view, float value) {
            ViewCompatHC.setRotationX(view, value);
        }
        @Override
        public void setRotationY(View view, float value) {
            ViewCompatHC.setRotationY(view, value);
        }
        @Override
        public void setScaleX(View view, float value) {
            ViewCompatHC.setScaleX(view, value);
        }
        @Override
        public void setScaleY(View view, float value) {
            ViewCompatHC.setScaleY(view, value);
        }
        @Override
        public void setPivotX(View view, float value) {
            ViewCompatHC.setPivotX(view, value);
        }
        @Override
        public void setPivotY(View view, float value) {
            ViewCompatHC.setPivotY(view, value);
        }
        @Override
        public float getX(View view) {
            return ViewCompatHC.getX(view);
        }

        @Override
        public float getY(View view) {
            return ViewCompatHC.getY(view);
        }

        @Override
        public float getRotation(View view) {
            return ViewCompatHC.getRotation(view);
        }

        @Override
        public float getRotationX(View view) {
            return ViewCompatHC.getRotationX(view);
        }

        @Override
        public float getRotationY(View view) {
            return ViewCompatHC.getRotationY(view);
        }

        @Override
        public float getScaleX(View view) {
            return ViewCompatHC.getScaleX(view);
        }

        @Override
        public float getScaleY(View view) {
            return ViewCompatHC.getScaleY(view);
        }

        @Override
        public float getPivotX(View view) {
            return ViewCompatHC.getPivotX(view);
        }
        @Override
        public float getPivotY(View view) {
            return ViewCompatHC.getPivotY(view);
        }
        @Override
        public void jumpDrawablesToCurrentState(View view) {
            ViewCompatHC.jumpDrawablesToCurrentState(view);
        }

        @Override
        public void setSaveFromParentEnabled(View view, boolean enabled) {
            ViewCompatHC.setSaveFromParentEnabled(view, enabled);
        }

        @Override
        public void setActivated(View view, boolean activated) {
            ViewCompatHC.setActivated(view, activated);
        }

        @Override
        public int combineMeasuredStates(int curState, int newState) {
            return ViewCompatHC.combineMeasuredStates(curState, newState);
        }
    }

    static class ICSViewCompatImpl extends HCViewCompatImpl {
        static Field mAccessibilityDelegateField;
        static boolean accessibilityDelegateCheckFailed = false;
        @Override
        public boolean canScrollHorizontally(View v, int direction) {
            return ViewCompatICS.canScrollHorizontally(v, direction);
        }
        @Override
        public boolean canScrollVertically(View v, int direction) {
            return ViewCompatICS.canScrollVertically(v, direction);
        }
        @Override
        public void onPopulateAccessibilityEvent(View v, AccessibilityEvent event) {
            ViewCompatICS.onPopulateAccessibilityEvent(v, event);
        }
        @Override
        public void onInitializeAccessibilityEvent(View v, AccessibilityEvent event) {
            ViewCompatICS.onInitializeAccessibilityEvent(v, event);
        }
        @Override
        public void onInitializeAccessibilityNodeInfo(View v, AccessibilityNodeInfoCompat info) {
            ViewCompatICS.onInitializeAccessibilityNodeInfo(v, info.getInfo());
        }
        @Override
        public void setAccessibilityDelegate(View v,
                @Nullable AccessibilityDelegateCompat delegate) {
            ViewCompatICS.setAccessibilityDelegate(v,
                    delegate == null ? null : delegate.getBridge());
        }

        @Override
        public boolean hasAccessibilityDelegate(View v) {
            if (accessibilityDelegateCheckFailed) {
                return false; // View implementation might have changed.
            }
            if (mAccessibilityDelegateField == null) {
                try {
                    mAccessibilityDelegateField = View.class
                            .getDeclaredField("mAccessibilityDelegate");
                    mAccessibilityDelegateField.setAccessible(true);
                } catch (Throwable t) {
                    accessibilityDelegateCheckFailed = true;
                    return false;
                }
            }
            try {
                return mAccessibilityDelegateField.get(v) != null;
            } catch (Throwable t) {
                accessibilityDelegateCheckFailed = true;
                return false;
            }
        }

        @Override
        public ViewPropertyAnimatorCompat animate(View view) {
            if (mViewPropertyAnimatorCompatMap == null) {
                mViewPropertyAnimatorCompatMap =
                        new WeakHashMap<View, ViewPropertyAnimatorCompat>();
            }
            ViewPropertyAnimatorCompat vpa = mViewPropertyAnimatorCompatMap.get(view);
            if (vpa == null) {
                vpa = new ViewPropertyAnimatorCompat(view);
                mViewPropertyAnimatorCompatMap.put(view, vpa);
            }
            return vpa;
        }

        @Override
        public void setFitsSystemWindows(View view, boolean fitSystemWindows) {
            ViewCompatICS.setFitsSystemWindows(view, fitSystemWindows);
        }
    }

    static class JBViewCompatImpl extends ICSViewCompatImpl {
        @Override
        public boolean hasTransientState(View view) {
            return ViewCompatJB.hasTransientState(view);
        }
        @Override
        public void setHasTransientState(View view, boolean hasTransientState) {
            ViewCompatJB.setHasTransientState(view, hasTransientState);
        }
        @Override
        public void postInvalidateOnAnimation(View view) {
            ViewCompatJB.postInvalidateOnAnimation(view);
        }
        @Override
        public void postInvalidateOnAnimation(View view, int left, int top, int right, int bottom) {
            ViewCompatJB.postInvalidateOnAnimation(view, left, top, right, bottom);
        }
        @Override
        public void postOnAnimation(View view, Runnable action) {
            ViewCompatJB.postOnAnimation(view, action);
        }
        @Override
        public void postOnAnimationDelayed(View view, Runnable action, long delayMillis) {
            ViewCompatJB.postOnAnimationDelayed(view, action, delayMillis);
        }
        @Override
        public int getImportantForAccessibility(View view) {
            return ViewCompatJB.getImportantForAccessibility(view);
        }
        @Override
        public void setImportantForAccessibility(View view, int mode) {
            // IMPORTANT_FOR_ACCESSIBILITY_NO_HIDE_DESCENDANTS is not available
            // on this platform so replace with IMPORTANT_FOR_ACCESSIBILITY_NO
            // which is closer semantically.
            if (mode == IMPORTANT_FOR_ACCESSIBILITY_NO_HIDE_DESCENDANTS) {
                mode = IMPORTANT_FOR_ACCESSIBILITY_NO;
            }
            ViewCompatJB.setImportantForAccessibility(view, mode);
        }
        @Override
        public boolean performAccessibilityAction(View view, int action, Bundle arguments) {
            return ViewCompatJB.performAccessibilityAction(view, action, arguments);
        }
        @Override
        public AccessibilityNodeProviderCompat getAccessibilityNodeProvider(View view) {
            Object compat = ViewCompatJB.getAccessibilityNodeProvider(view);
            if (compat != null) {
                return new AccessibilityNodeProviderCompat(compat);
            }
            return null;
        }

        @Override
        public ViewParent getParentForAccessibility(View view) {
            return ViewCompatJB.getParentForAccessibility(view);
        }

        @Override
        public int getMinimumWidth(View view) {
            return ViewCompatJB.getMinimumWidth(view);
        }

        @Override
        public int getMinimumHeight(View view) {
            return ViewCompatJB.getMinimumHeight(view);
        }

        @Override
        public void requestApplyInsets(View view) {
            ViewCompatJB.requestApplyInsets(view);
        }

        @Override
        public boolean getFitsSystemWindows(View view) {
            return ViewCompatJB.getFitsSystemWindows(view);
        }

        @Override
        public boolean hasOverlappingRendering(View view) {
            return ViewCompatJB.hasOverlappingRendering(view);
        }
    }

    static class JbMr1ViewCompatImpl extends JBViewCompatImpl {

        @Override
        public int getLabelFor(View view) {
            return ViewCompatJellybeanMr1.getLabelFor(view);
        }

        @Override
        public void setLabelFor(View view, int id) {
            ViewCompatJellybeanMr1.setLabelFor(view, id);
        }

        @Override
        public void setLayerPaint(View view, Paint paint) {
            ViewCompatJellybeanMr1.setLayerPaint(view, paint);
        }

        @Override
        public int getLayoutDirection(View view) {
            return ViewCompatJellybeanMr1.getLayoutDirection(view);
        }

        @Override
        public void setLayoutDirection(View view, int layoutDirection) {
            ViewCompatJellybeanMr1.setLayoutDirection(view, layoutDirection);
        }

        @Override
        public int getPaddingStart(View view) {
            return ViewCompatJellybeanMr1.getPaddingStart(view);
        }

        @Override
        public int getPaddingEnd(View view) {
            return ViewCompatJellybeanMr1.getPaddingEnd(view);
        }

        @Override
        public void setPaddingRelative(View view, int start, int top, int end, int bottom) {
            ViewCompatJellybeanMr1.setPaddingRelative(view, start, top, end, bottom);
        }

        @Override
        public int getWindowSystemUiVisibility(View view) {
            return ViewCompatJellybeanMr1.getWindowSystemUiVisibility(view);
        }

        @Override
        public boolean isPaddingRelative(View view) {
            return ViewCompatJellybeanMr1.isPaddingRelative(view);
        }
    }

    static class JbMr2ViewCompatImpl extends JbMr1ViewCompatImpl {
        @Override
        public void setClipBounds(View view, Rect clipBounds) {
            ViewCompatJellybeanMr2.setClipBounds(view, clipBounds);
        }

        @Override
        public Rect getClipBounds(View view) {
            return ViewCompatJellybeanMr2.getClipBounds(view);
        }
    }

    static class KitKatViewCompatImpl extends JbMr2ViewCompatImpl {
        @Override
        public int getAccessibilityLiveRegion(View view) {
            return ViewCompatKitKat.getAccessibilityLiveRegion(view);
        }

        @Override
        public void setAccessibilityLiveRegion(View view, int mode) {
            ViewCompatKitKat.setAccessibilityLiveRegion(view, mode);
        }

        @Override
        public void setImportantForAccessibility(View view, int mode) {
            ViewCompatJB.setImportantForAccessibility(view, mode);
        }

        @Override
        public boolean isLaidOut(View view) {
            return ViewCompatKitKat.isLaidOut(view);
        }

        @Override
        public boolean isAttachedToWindow(View view) {
            return ViewCompatKitKat.isAttachedToWindow(view);
        }
    }

    static class LollipopViewCompatImpl extends KitKatViewCompatImpl {
        @Override
        public void setTransitionName(View view, String transitionName) {
            ViewCompatLollipop.setTransitionName(view, transitionName);
        }

        @Override
        public String getTransitionName(View view) {
            return ViewCompatLollipop.getTransitionName(view);
        }

        @Override
        public void requestApplyInsets(View view) {
            ViewCompatLollipop.requestApplyInsets(view);
        }

        @Override
        public void setElevation(View view, float elevation) {
            ViewCompatLollipop.setElevation(view, elevation);
        }

        @Override
        public float getElevation(View view) {
            return ViewCompatLollipop.getElevation(view);
        }

        @Override
        public void setTranslationZ(View view, float translationZ) {
            ViewCompatLollipop.setTranslationZ(view, translationZ);
        }

        @Override
        public float getTranslationZ(View view) {
            return ViewCompatLollipop.getTranslationZ(view);
        }

        @Override
        public void setOnApplyWindowInsetsListener(View view, OnApplyWindowInsetsListener listener) {
            ViewCompatLollipop.setOnApplyWindowInsetsListener(view, listener);
        }

        @Override
        public void setNestedScrollingEnabled(View view, boolean enabled) {
            ViewCompatLollipop.setNestedScrollingEnabled(view, enabled);
        }

        @Override
        public boolean isNestedScrollingEnabled(View view) {
            return ViewCompatLollipop.isNestedScrollingEnabled(view);
        }

        @Override
        public boolean startNestedScroll(View view, int axes) {
            return ViewCompatLollipop.startNestedScroll(view, axes);
        }

        @Override
        public void stopNestedScroll(View view) {
            ViewCompatLollipop.stopNestedScroll(view);
        }

        @Override
        public boolean hasNestedScrollingParent(View view) {
            return ViewCompatLollipop.hasNestedScrollingParent(view);
        }

        @Override
        public boolean dispatchNestedScroll(View view, int dxConsumed, int dyConsumed,
                int dxUnconsumed, int dyUnconsumed, int[] offsetInWindow) {
            return ViewCompatLollipop.dispatchNestedScroll(view, dxConsumed, dyConsumed,
                    dxUnconsumed, dyUnconsumed, offsetInWindow);
        }

        @Override
        public boolean dispatchNestedPreScroll(View view, int dx, int dy,
                int[] consumed, int[] offsetInWindow) {
            return ViewCompatLollipop.dispatchNestedPreScroll(view, dx, dy, consumed,
                    offsetInWindow);
        }

        @Override
        public boolean dispatchNestedFling(View view, float velocityX, float velocityY,
                boolean consumed) {
            return ViewCompatLollipop.dispatchNestedFling(view, velocityX, velocityY, consumed);
        }

        @Override
        public boolean dispatchNestedPreFling(View view, float velocityX, float velocityY) {
            return ViewCompatLollipop.dispatchNestedPreFling(view, velocityX, velocityY);
        }

        @Override
        public boolean isImportantForAccessibility(View view) {
            return ViewCompatLollipop.isImportantForAccessibility(view);
        }

        @Override
        public ColorStateList getBackgroundTintList(View view) {
            return ViewCompatLollipop.getBackgroundTintList(view);
        }

        @Override
        public void setBackgroundTintList(View view, ColorStateList tintList) {
            ViewCompatLollipop.setBackgroundTintList(view, tintList);
        }

        @Override
        public void setBackgroundTintMode(View view, PorterDuff.Mode mode) {
            ViewCompatLollipop.setBackgroundTintMode(view, mode);
        }

        @Override
        public PorterDuff.Mode getBackgroundTintMode(View view) {
            return ViewCompatLollipop.getBackgroundTintMode(view);
        }

        @Override
        public WindowInsetsCompat onApplyWindowInsets(View v, WindowInsetsCompat insets) {
            return ViewCompatLollipop.onApplyWindowInsets(v, insets);
        }

        @Override
        public WindowInsetsCompat dispatchApplyWindowInsets(View v, WindowInsetsCompat insets) {
            return ViewCompatLollipop.dispatchApplyWindowInsets(v, insets);
        }

        @Override
        public float getZ(View view) {
            return ViewCompatLollipop.getZ(view);
        }
    }

    static final ViewCompatImpl IMPL;
    static {
        final int version = android.os.Build.VERSION.SDK_INT;
        if (version >= 21) {
            IMPL = new LollipopViewCompatImpl();
        } else if (version >= 19) {
            IMPL = new KitKatViewCompatImpl();
        } else if (version >= 17) {
            IMPL = new JbMr1ViewCompatImpl();
        } else if (version >= 16) {
            IMPL = new JBViewCompatImpl();
        } else if (version >= 14) {
            IMPL = new ICSViewCompatImpl();
        } else if (version >= 11) {
            IMPL = new HCViewCompatImpl();
        } else if (version >= 9) {
            IMPL = new GBViewCompatImpl();
        } else if (version >= 7) {
            IMPL = new EclairMr1ViewCompatImpl();
        } else {
            IMPL = new BaseViewCompatImpl();
        }
    }

    /**
     * Check if this view can be scrolled horizontally in a certain direction.
     *
     * @param v The View against which to invoke the method.
     * @param direction Negative to check scrolling left, positive to check scrolling right.
     * @return true if this view can be scrolled in the specified direction, false otherwise.
     */
    public static boolean canScrollHorizontally(View v, int direction) {
        return IMPL.canScrollHorizontally(v, direction);
    }

    /**
     * Check if this view can be scrolled vertically in a certain direction.
     *
     * @param v The View against which to invoke the method.
     * @param direction Negative to check scrolling up, positive to check scrolling down.
     * @return true if this view can be scrolled in the specified direction, false otherwise.
     */
    public static boolean canScrollVertically(View v, int direction) {
        return IMPL.canScrollVertically(v, direction);
    }

    /**
     * Returns the over-scroll mode for this view. The result will be
     * one of {@link #OVER_SCROLL_ALWAYS} (default), {@link #OVER_SCROLL_IF_CONTENT_SCROLLS}
     * (allow over-scrolling only if the view content is larger than the container),
     * or {@link #OVER_SCROLL_NEVER}.
     *
     * @param v The View against which to invoke the method.
     * @return This view's over-scroll mode.
     */
    @OverScroll
    public static int getOverScrollMode(View v) {
        return IMPL.getOverScrollMode(v);
    }

    /**
     * Set the over-scroll mode for this view. Valid over-scroll modes are
     * {@link #OVER_SCROLL_ALWAYS} (default), {@link #OVER_SCROLL_IF_CONTENT_SCROLLS}
     * (allow over-scrolling only if the view content is larger than the container),
     * or {@link #OVER_SCROLL_NEVER}.
     *
     * Setting the over-scroll mode of a view will have an effect only if the
     * view is capable of scrolling.
     *
     * @param v The View against which to invoke the method.
     * @param overScrollMode The new over-scroll mode for this view.
     */
    public static void setOverScrollMode(View v, @OverScroll int overScrollMode) {
        IMPL.setOverScrollMode(v, overScrollMode);
    }

    /**
     * Called from {@link View#dispatchPopulateAccessibilityEvent(AccessibilityEvent)}
     * giving a chance to this View to populate the accessibility event with its
     * text content. While this method is free to modify event
     * attributes other than text content, doing so should normally be performed in
     * {@link View#onInitializeAccessibilityEvent(AccessibilityEvent)}.
     * <p>
     * Example: Adding formatted date string to an accessibility event in addition
     *          to the text added by the super implementation:
     * <pre> public void onPopulateAccessibilityEvent(AccessibilityEvent event) {
     *     super.onPopulateAccessibilityEvent(event);
     *     final int flags = DateUtils.FORMAT_SHOW_DATE | DateUtils.FORMAT_SHOW_WEEKDAY;
     *     String selectedDateUtterance = DateUtils.formatDateTime(mContext,
     *         mCurrentDate.getTimeInMillis(), flags);
     *     event.getText().add(selectedDateUtterance);
     * }</pre>
     * <p>
     * If an {@link android.view.View.AccessibilityDelegate} has been specified via calling
     * {@link View#setAccessibilityDelegate(android.view.View.AccessibilityDelegate)} its
     * {@link android.view.View.AccessibilityDelegate#onPopulateAccessibilityEvent(View,
     *  AccessibilityEvent)}
     * is responsible for handling this call.
     * </p>
     * <p class="note"><strong>Note:</strong> Always call the super implementation before adding
     * information to the event, in case the default implementation has basic information to add.
     * </p>
     *
     * @param v The View against which to invoke the method.
     * @param event The accessibility event which to populate.
     *
     * @see View#sendAccessibilityEvent(int)
     * @see View#dispatchPopulateAccessibilityEvent(AccessibilityEvent)
     */
    public static void onPopulateAccessibilityEvent(View v, AccessibilityEvent event) {
        IMPL.onPopulateAccessibilityEvent(v, event);
    }

    /**
     * Initializes an {@link AccessibilityEvent} with information about
     * this View which is the event source. In other words, the source of
     * an accessibility event is the view whose state change triggered firing
     * the event.
     * <p>
     * Example: Setting the password property of an event in addition
     *          to properties set by the super implementation:
     * <pre> public void onInitializeAccessibilityEvent(AccessibilityEvent event) {
     *     super.onInitializeAccessibilityEvent(event);
     *     event.setPassword(true);
     * }</pre>
     * <p>
     * If an {@link android.view.View.AccessibilityDelegate} has been specified via calling
     * {@link View#setAccessibilityDelegate(android.view.View.AccessibilityDelegate)} its
     * {@link android.view.View.AccessibilityDelegate#onInitializeAccessibilityEvent(View,
     *  AccessibilityEvent)}
     * is responsible for handling this call.
     * </p>
     * <p class="note"><strong>Note:</strong> Always call the super implementation before adding
     * information to the event, in case the default implementation has basic information to add.
     * </p>
     *
     * @param v The View against which to invoke the method.
     * @param event The event to initialize.
     *
     * @see View#sendAccessibilityEvent(int)
     * @see View#dispatchPopulateAccessibilityEvent(AccessibilityEvent)
     */
    public static void onInitializeAccessibilityEvent(View v, AccessibilityEvent event) {
        IMPL.onInitializeAccessibilityEvent(v, event);
    }

    /**
     * Initializes an {@link android.view.accessibility.AccessibilityNodeInfo} with information
     * about this view. The base implementation sets:
     * <ul>
     * <li>{@link android.view.accessibility.AccessibilityNodeInfo#setParent(View)},</li>
     * <li>{@link android.view.accessibility.AccessibilityNodeInfo#setBoundsInParent(Rect)},</li>
     * <li>{@link android.view.accessibility.AccessibilityNodeInfo#setBoundsInScreen(Rect)},</li>
     * <li>{@link android.view.accessibility.AccessibilityNodeInfo#setPackageName(CharSequence)},</li>
     * <li>{@link android.view.accessibility.AccessibilityNodeInfo#setClassName(CharSequence)},</li>
     * <li>{@link android.view.accessibility.AccessibilityNodeInfo#setContentDescription(CharSequence)},</li>
     * <li>{@link android.view.accessibility.AccessibilityNodeInfo#setEnabled(boolean)},</li>
     * <li>{@link android.view.accessibility.AccessibilityNodeInfo#setClickable(boolean)},</li>
     * <li>{@link android.view.accessibility.AccessibilityNodeInfo#setFocusable(boolean)},</li>
     * <li>{@link android.view.accessibility.AccessibilityNodeInfo#setFocused(boolean)},</li>
     * <li>{@link android.view.accessibility.AccessibilityNodeInfo#setLongClickable(boolean)},</li>
     * <li>{@link android.view.accessibility.AccessibilityNodeInfo#setSelected(boolean)},</li>
     * </ul>
     * <p>
     * Subclasses should override this method, call the super implementation,
     * and set additional attributes.
     * </p>
     * <p>
     * If an {@link android.view.View.AccessibilityDelegate} has been specified via calling
     * {@link View#setAccessibilityDelegate(android.view.View.AccessibilityDelegate)} its
     * {@link android.view.View.AccessibilityDelegate#onInitializeAccessibilityNodeInfo(View,
     *  android.view.accessibility.AccessibilityNodeInfo)}
     * is responsible for handling this call.
     * </p>
     *
     * @param v The View against which to invoke the method.
     * @param info The instance to initialize.
     */
    public static void onInitializeAccessibilityNodeInfo(View v, AccessibilityNodeInfoCompat info) {
        IMPL.onInitializeAccessibilityNodeInfo(v, info);
    }

    /**
     * Sets a delegate for implementing accessibility support via compositon as
     * opposed to inheritance. The delegate's primary use is for implementing
     * backwards compatible widgets. For more details see
     * {@link android.view.View.AccessibilityDelegate}.
     *
     * @param v The View against which to invoke the method.
     * @param delegate The delegate instance.
     *
     * @see android.view.View.AccessibilityDelegate
     */
    public static void setAccessibilityDelegate(View v, AccessibilityDelegateCompat delegate) {
        IMPL.setAccessibilityDelegate(v, delegate);
    }

    /**
     * Checks whether provided View has an accessibility delegate attached to it.
     *
     * @param v The View instance to check
     * @return True if the View has an accessibility delegate
     */
    public static boolean hasAccessibilityDelegate(View v) {
        return IMPL.hasAccessibilityDelegate(v);
    }

    /**
     * Indicates whether the view is currently tracking transient state that the
     * app should not need to concern itself with saving and restoring, but that
     * the framework should take special note to preserve when possible.
     *
     * @param view View to check for transient state
     * @return true if the view has transient state
     */
    public static boolean hasTransientState(View view) {
        return IMPL.hasTransientState(view);
    }

    /**
     * Set whether this view is currently tracking transient state that the
     * framework should attempt to preserve when possible.
     *
     * @param view View tracking transient state
     * @param hasTransientState true if this view has transient state
     */
    public static void setHasTransientState(View view, boolean hasTransientState) {
        IMPL.setHasTransientState(view, hasTransientState);
    }

    /**
     * <p>Cause an invalidate to happen on the next animation time step, typically the
     * next display frame.</p>
     *
     * <p>This method can be invoked from outside of the UI thread
     * only when this View is attached to a window.</p>
     *
     * @param view View to invalidate
     */
    public static void postInvalidateOnAnimation(View view) {
        IMPL.postInvalidateOnAnimation(view);
    }

    /**
     * <p>Cause an invalidate of the specified area to happen on the next animation
     * time step, typically the next display frame.</p>
     *
     * <p>This method can be invoked from outside of the UI thread
     * only when this View is attached to a window.</p>
     *
     * @param view View to invalidate
     * @param left The left coordinate of the rectangle to invalidate.
     * @param top The top coordinate of the rectangle to invalidate.
     * @param right The right coordinate of the rectangle to invalidate.
     * @param bottom The bottom coordinate of the rectangle to invalidate.
     */
    public static void postInvalidateOnAnimation(View view, int left, int top,
            int right, int bottom) {
        IMPL.postInvalidateOnAnimation(view, left, top, right, bottom);
    }

    /**
     * <p>Causes the Runnable to execute on the next animation time step.
     * The runnable will be run on the user interface thread.</p>
     *
     * <p>This method can be invoked from outside of the UI thread
     * only when this View is attached to a window.</p>
     *
     * @param view View to post this Runnable to
     * @param action The Runnable that will be executed.
     */
    public static void postOnAnimation(View view, Runnable action) {
        IMPL.postOnAnimation(view, action);
    }

    /**
     * <p>Causes the Runnable to execute on the next animation time step,
     * after the specified amount of time elapses.
     * The runnable will be run on the user interface thread.</p>
     *
     * <p>This method can be invoked from outside of the UI thread
     * only when this View is attached to a window.</p>
     *
     * @param view The view to post this Runnable to
     * @param action The Runnable that will be executed.
     * @param delayMillis The delay (in milliseconds) until the Runnable
     *        will be executed.
     */
    public static void postOnAnimationDelayed(View view, Runnable action, long delayMillis) {
        IMPL.postOnAnimationDelayed(view, action, delayMillis);
    }

    /**
     * Gets the mode for determining whether this View is important for accessibility
     * which is if it fires accessibility events and if it is reported to
     * accessibility services that query the screen.
     *
     * @param view The view whose property to get.
     * @return The mode for determining whether a View is important for accessibility.
     *
     * @see #IMPORTANT_FOR_ACCESSIBILITY_YES
     * @see #IMPORTANT_FOR_ACCESSIBILITY_NO
     * @see #IMPORTANT_FOR_ACCESSIBILITY_NO_HIDE_DESCENDANTS
     * @see #IMPORTANT_FOR_ACCESSIBILITY_AUTO
     */
    @ImportantForAccessibility
    public static int getImportantForAccessibility(View view) {
        return IMPL.getImportantForAccessibility(view);
    }

    /**
     * Sets how to determine whether this view is important for accessibility
     * which is if it fires accessibility events and if it is reported to
     * accessibility services that query the screen.
     * <p>
     * <em>Note:</em> If the current paltform version does not support the
     *  {@link #IMPORTANT_FOR_ACCESSIBILITY_NO_HIDE_DESCENDANTS} mode, then
     *  {@link #IMPORTANT_FOR_ACCESSIBILITY_NO} will be used as it is the
     *  closest terms of semantics.
     * </p>
     *
     * @param view The view whose property to set.
     * @param mode How to determine whether this view is important for accessibility.
     *
     * @see #IMPORTANT_FOR_ACCESSIBILITY_YES
     * @see #IMPORTANT_FOR_ACCESSIBILITY_NO
     * @see #IMPORTANT_FOR_ACCESSIBILITY_NO_HIDE_DESCENDANTS
     * @see #IMPORTANT_FOR_ACCESSIBILITY_AUTO
     */
    public static void setImportantForAccessibility(View view,
            @ImportantForAccessibility int mode) {
        IMPL.setImportantForAccessibility(view, mode);
    }

    /**
     * Performs the specified accessibility action on the view. For
     * possible accessibility actions look at {@link AccessibilityNodeInfoCompat}.
     * <p>
     * If an {@link AccessibilityDelegateCompat} has been specified via calling
     * {@link #setAccessibilityDelegate(View, AccessibilityDelegateCompat)} its
     * {@link AccessibilityDelegateCompat#performAccessibilityAction(View, int, Bundle)}
     * is responsible for handling this call.
     * </p>
     *
     * @param action The action to perform.
     * @param arguments Optional action arguments.
     * @return Whether the action was performed.
     */
    public static boolean performAccessibilityAction(View view, int action, Bundle arguments) {
        return IMPL.performAccessibilityAction(view, action, arguments);
    }

    /**
     * Gets the provider for managing a virtual view hierarchy rooted at this View
     * and reported to {@link android.accessibilityservice.AccessibilityService}s
     * that explore the window content.
     * <p>
     * If this method returns an instance, this instance is responsible for managing
     * {@link AccessibilityNodeInfoCompat}s describing the virtual sub-tree rooted at
     * this View including the one representing the View itself. Similarly the returned
     * instance is responsible for performing accessibility actions on any virtual
     * view or the root view itself.
     * </p>
     * <p>
     * If an {@link AccessibilityDelegateCompat} has been specified via calling
     * {@link #setAccessibilityDelegate(View, AccessibilityDelegateCompat)} its
     * {@link AccessibilityDelegateCompat#getAccessibilityNodeProvider(View)}
     * is responsible for handling this call.
     * </p>
     *
     * @param view The view whose property to get.
     * @return The provider.
     *
     * @see AccessibilityNodeProviderCompat
     */
    public static AccessibilityNodeProviderCompat getAccessibilityNodeProvider(View view) {
        return IMPL.getAccessibilityNodeProvider(view);
    }

    /**
     * The opacity of the view. This is a value from 0 to 1, where 0 means the view is
     * completely transparent and 1 means the view is completely opaque.
     *
     * <p>By default this is 1.0f. Prior to API 11, the returned value is always 1.0f.
     * @return The opacity of the view.
     */
    public static float getAlpha(View view) {
        return IMPL.getAlpha(view);
    }

    /**
     * <p>Specifies the type of layer backing this view. The layer can be
     * {@link #LAYER_TYPE_NONE disabled}, {@link #LAYER_TYPE_SOFTWARE software} or
     * {@link #LAYER_TYPE_HARDWARE hardware}.</p>
     *
     * <p>A layer is associated with an optional {@link android.graphics.Paint}
     * instance that controls how the layer is composed on screen. The following
     * properties of the paint are taken into account when composing the layer:</p>
     * <ul>
     * <li>{@link android.graphics.Paint#getAlpha() Translucency (alpha)}</li>
     * <li>{@link android.graphics.Paint#getXfermode() Blending mode}</li>
     * <li>{@link android.graphics.Paint#getColorFilter() Color filter}</li>
     * </ul>
     *
     * <p>If this view has an alpha value set to < 1.0 by calling
     * setAlpha(float), the alpha value of the layer's paint is replaced by
     * this view's alpha value. Calling setAlpha(float) is therefore
     * equivalent to setting a hardware layer on this view and providing a paint with
     * the desired alpha value.<p>
     *
     * <p>Refer to the documentation of {@link #LAYER_TYPE_NONE disabled},
     * {@link #LAYER_TYPE_SOFTWARE software} and {@link #LAYER_TYPE_HARDWARE hardware}
     * for more information on when and how to use layers.</p>
     *
     * @param layerType The ype of layer to use with this view, must be one of
     *        {@link #LAYER_TYPE_NONE}, {@link #LAYER_TYPE_SOFTWARE} or
     *        {@link #LAYER_TYPE_HARDWARE}
     * @param paint The paint used to compose the layer. This argument is optional
     *        and can be null. It is ignored when the layer type is
     *        {@link #LAYER_TYPE_NONE}
     *
     * @param view View to set the layer type for
     * @param layerType The type of layer to use with this view, must be one of
     *        {@link #LAYER_TYPE_NONE}, {@link #LAYER_TYPE_SOFTWARE} or
     *        {@link #LAYER_TYPE_HARDWARE}
     * @param paint The paint used to compose the layer. This argument is optional
     *        and can be null. It is ignored when the layer type is
     *        {@link #LAYER_TYPE_NONE}
     */
    public static void setLayerType(View view, @LayerType int layerType, Paint paint) {
        IMPL.setLayerType(view, layerType, paint);
    }

    /**
     * Indicates what type of layer is currently associated with this view. By default
     * a view does not have a layer, and the layer type is {@link #LAYER_TYPE_NONE}.
     * Refer to the documentation of
     * {@link #setLayerType(android.view.View, int, android.graphics.Paint)}
     * for more information on the different types of layers.
     *
     * @param view The view to fetch the layer type from
     * @return {@link #LAYER_TYPE_NONE}, {@link #LAYER_TYPE_SOFTWARE} or
     *         {@link #LAYER_TYPE_HARDWARE}
     *
     * @see #setLayerType(android.view.View, int, android.graphics.Paint)
     * @see #LAYER_TYPE_NONE
     * @see #LAYER_TYPE_SOFTWARE
     * @see #LAYER_TYPE_HARDWARE
     */
    @LayerType
    public static int getLayerType(View view) {
        return IMPL.getLayerType(view);
    }

    /**
     * Gets the id of a view for which a given view serves as a label for
     * accessibility purposes.
     *
     * @param view The view on which to invoke the corresponding method.
     * @return The labeled view id.
     */
    public static int getLabelFor(View view) {
        return IMPL.getLabelFor(view);
    }

    /**
     * Sets the id of a view for which a given view serves as a label for
     * accessibility purposes.
     *
     * @param view The view on which to invoke the corresponding method.
     * @param labeledId The labeled view id.
     */
    public static void setLabelFor(View view, @IdRes int labeledId) {
        IMPL.setLabelFor(view, labeledId);
    }

    /**
     * Updates the {@link Paint} object used with the current layer (used only if the current
     * layer type is not set to {@link #LAYER_TYPE_NONE}). Changed properties of the Paint
     * provided to {@link #setLayerType(android.view.View, int, android.graphics.Paint)}
     * will be used the next time the View is redrawn, but
     * {@link #setLayerPaint(android.view.View, android.graphics.Paint)}
     * must be called to ensure that the view gets redrawn immediately.
     *
     * <p>A layer is associated with an optional {@link android.graphics.Paint}
     * instance that controls how the layer is composed on screen. The following
     * properties of the paint are taken into account when composing the layer:</p>
     * <ul>
     * <li>{@link android.graphics.Paint#getAlpha() Translucency (alpha)}</li>
     * <li>{@link android.graphics.Paint#getXfermode() Blending mode}</li>
     * <li>{@link android.graphics.Paint#getColorFilter() Color filter}</li>
     * </ul>
     *
     * <p>If this view has an alpha value set to < 1.0 by calling
     * View#setAlpha(float), the alpha value of the layer's paint is replaced by
     * this view's alpha value. Calling View#setAlpha(float) is therefore
     * equivalent to setting a hardware layer on this view and providing a paint with
     * the desired alpha value.</p>
     *
     * @param view View to set a layer paint for
     * @param paint The paint used to compose the layer. This argument is optional
     *        and can be null. It is ignored when the layer type is
     *        {@link #LAYER_TYPE_NONE}
     *
     * @see #setLayerType(View, int, android.graphics.Paint)
     */
    public static void setLayerPaint(View view, Paint paint) {
        IMPL.setLayerPaint(view, paint);
    }

    /**
     * Returns the resolved layout direction for this view.
     *
     * @param view View to get layout direction for
     * @return {@link #LAYOUT_DIRECTION_RTL} if the layout direction is RTL or returns
     * {@link #LAYOUT_DIRECTION_LTR} if the layout direction is not RTL.
     *
     * For compatibility, this will return {@link #LAYOUT_DIRECTION_LTR} if API version
     * is lower than Jellybean MR1 (API 17)
     */
    @ResolvedLayoutDirectionMode
    public static int getLayoutDirection(View view) {
        return IMPL.getLayoutDirection(view);
    }

    /**
     * Set the layout direction for this view. This will propagate a reset of layout direction
     * resolution to the view's children and resolve layout direction for this view.
     *
     * @param view View to set layout direction for
     * @param layoutDirection the layout direction to set. Should be one of:
     *
     * {@link #LAYOUT_DIRECTION_LTR},
     * {@link #LAYOUT_DIRECTION_RTL},
     * {@link #LAYOUT_DIRECTION_INHERIT},
     * {@link #LAYOUT_DIRECTION_LOCALE}.
     *
     * Resolution will be done if the value is set to LAYOUT_DIRECTION_INHERIT. The resolution
     * proceeds up the parent chain of the view to get the value. If there is no parent, then it
     * will return the default {@link #LAYOUT_DIRECTION_LTR}.
     */
    public static void setLayoutDirection(View view, @LayoutDirectionMode int layoutDirection) {
        IMPL.setLayoutDirection(view, layoutDirection);
    }

    /**
     * Gets the parent for accessibility purposes. Note that the parent for
     * accessibility is not necessary the immediate parent. It is the first
     * predecessor that is important for accessibility.
     *
     * @param view View to retrieve parent for
     * @return The parent for use in accessibility inspection
     */
    public static ViewParent getParentForAccessibility(View view) {
        return IMPL.getParentForAccessibility(view);
    }

    /**
     * Indicates whether this View is opaque. An opaque View guarantees that it will
     * draw all the pixels overlapping its bounds using a fully opaque color.
     *
     * On API 7 and above this will call View's true isOpaque method. On previous platform
     * versions it will check the opacity of the view's background drawable if present.
     *
     * @return True if this View is guaranteed to be fully opaque, false otherwise.
     */
    public static boolean isOpaque(View view) {
        return IMPL.isOpaque(view);
    }

    /**
     * Utility to reconcile a desired size and state, with constraints imposed
     * by a MeasureSpec.  Will take the desired size, unless a different size
     * is imposed by the constraints.  The returned value is a compound integer,
     * with the resolved size in the {@link #MEASURED_SIZE_MASK} bits and
     * optionally the bit {@link #MEASURED_STATE_TOO_SMALL} set if the resulting
     * size is smaller than the size the view wants to be.
     *
     * @param size How big the view wants to be
     * @param measureSpec Constraints imposed by the parent
     * @return Size information bit mask as defined by
     * {@link #MEASURED_SIZE_MASK} and {@link #MEASURED_STATE_TOO_SMALL}.
     */
    public static int resolveSizeAndState(int size, int measureSpec, int childMeasuredState) {
        return IMPL.resolveSizeAndState(size, measureSpec, childMeasuredState);
    }

    /**
     * Return the full width measurement information for this view as computed
     * by the most recent call to {@link android.view.View#measure(int, int)}.
     * This result is a bit mask as defined by {@link #MEASURED_SIZE_MASK} and
     * {@link #MEASURED_STATE_TOO_SMALL}.
     * This should be used during measurement and layout calculations only. Use
     * {@link android.view.View#getWidth()} to see how wide a view is after layout.
     *
     * @return The measured width of this view as a bit mask.
     */
    public static int getMeasuredWidthAndState(View view) {
        return IMPL.getMeasuredWidthAndState(view);
    }

    /**
     * Return the full height measurement information for this view as computed
     * by the most recent call to {@link android.view.View#measure(int, int)}.
     * This result is a bit mask as defined by {@link #MEASURED_SIZE_MASK} and
     * {@link #MEASURED_STATE_TOO_SMALL}.
     * This should be used during measurement and layout calculations only. Use
     * {@link android.view.View#getHeight()} to see how wide a view is after layout.
     *
     * @return The measured width of this view as a bit mask.
     */
    public static int getMeasuredHeightAndState(View view) {
        return IMPL.getMeasuredHeightAndState(view);
    }

    /**
     * Return only the state bits of {@link #getMeasuredWidthAndState}
     * and {@link #getMeasuredHeightAndState}, combined into one integer.
     * The width component is in the regular bits {@link #MEASURED_STATE_MASK}
     * and the height component is at the shifted bits
     * {@link #MEASURED_HEIGHT_STATE_SHIFT}>>{@link #MEASURED_STATE_MASK}.
     */
    public static int getMeasuredState(View view) {
        return IMPL.getMeasuredState(view);
    }

    /**
     * Merge two states as returned by {@link #getMeasuredState(View)}.
     * @param curState The current state as returned from a view or the result
     * of combining multiple views.
     * @param newState The new view state to combine.
     * @return Returns a new integer reflecting the combination of the two
     * states.
     */
    public static int combineMeasuredStates(int curState, int newState) {
        return IMPL.combineMeasuredStates(curState, newState);
    }

    /**
     * Gets the live region mode for the specified View.
     *
     * @param view The view from which to obtain the live region mode
     * @return The live region mode for the view.
     *
     * @see ViewCompat#setAccessibilityLiveRegion(View, int)
     */
    @AccessibilityLiveRegion
    public static int getAccessibilityLiveRegion(View view) {
        return IMPL.getAccessibilityLiveRegion(view);
    }

    /**
     * Sets the live region mode for the specified view. This indicates to
     * accessibility services whether they should automatically notify the user
     * about changes to the view's content description or text, or to the
     * content descriptions or text of the view's children (where applicable).
     * <p>
     * For example, in a login screen with a TextView that displays an "incorrect
     * password" notification, that view should be marked as a live region with
     * mode {@link #ACCESSIBILITY_LIVE_REGION_POLITE}.
     * <p>
     * To disable change notifications for this view, use
     * {@link #ACCESSIBILITY_LIVE_REGION_NONE}. This is the default live region
     * mode for most views.
     * <p>
     * To indicate that the user should be notified of changes, use
     * {@link #ACCESSIBILITY_LIVE_REGION_POLITE}.
     * <p>
     * If the view's changes should interrupt ongoing speech and notify the user
     * immediately, use {@link #ACCESSIBILITY_LIVE_REGION_ASSERTIVE}.
     *
     * @param view The view on which to set the live region mode
     * @param mode The live region mode for this view, one of:
     *        <ul>
     *        <li>{@link #ACCESSIBILITY_LIVE_REGION_NONE}
     *        <li>{@link #ACCESSIBILITY_LIVE_REGION_POLITE}
     *        <li>{@link #ACCESSIBILITY_LIVE_REGION_ASSERTIVE}
     *        </ul>
     */
    public static void setAccessibilityLiveRegion(View view, @AccessibilityLiveRegion int mode) {
        IMPL.setAccessibilityLiveRegion(view, mode);
    }

    /**
     * Returns the start padding of the specified view depending on its resolved layout direction.
     * If there are inset and enabled scrollbars, this value may include the space
     * required to display the scrollbars as well.
     *
     * @param view The view to get padding for
     * @return the start padding in pixels
     */
    public static int getPaddingStart(View view) {
        return IMPL.getPaddingStart(view);
    }

    /**
     * Returns the end padding of the specified view depending on its resolved layout direction.
     * If there are inset and enabled scrollbars, this value may include the space
     * required to display the scrollbars as well.
     *
     * @param view The view to get padding for
     * @return the end padding in pixels
     */
    public static int getPaddingEnd(View view) {
        return IMPL.getPaddingEnd(view);
    }

    /**
     * Sets the relative padding. The view may add on the space required to display
     * the scrollbars, depending on the style and visibility of the scrollbars.
     * So the values returned from {@link #getPaddingStart}, {@link View#getPaddingTop},
     * {@link #getPaddingEnd} and {@link View#getPaddingBottom} may be different
     * from the values set in this call.
     *
     * @param view The view on which to set relative padding
     * @param start the start padding in pixels
     * @param top the top padding in pixels
     * @param end the end padding in pixels
     * @param bottom the bottom padding in pixels
     */
    public static void setPaddingRelative(View view, int start, int top, int end, int bottom) {
        IMPL.setPaddingRelative(view, start, top, end, bottom);
    }

    /**
     * Notify a view that it is being temporarily detached.
     */
    public static void dispatchStartTemporaryDetach(View view) {
        IMPL.dispatchStartTemporaryDetach(view);
    }

    /**
     * Notify a view that its temporary detach has ended; the view is now reattached.
     */
    public static void dispatchFinishTemporaryDetach(View view) {
        IMPL.dispatchFinishTemporaryDetach(view);
    }

    /**
     * The horizontal location of this view relative to its {@link View#getLeft() left} position.
     * This position is post-layout, in addition to wherever the object's
     * layout placed it.
     *
     * <p>Prior to API 11 this will return 0.</p>
     *
     * @return The horizontal position of this view relative to its left position, in pixels.
     */
    public static float getTranslationX(View view) {
        return IMPL.getTranslationX(view);
    }

    /**
     * The vertical location of this view relative to its {@link View#getTop() left} position.
     * This position is post-layout, in addition to wherever the object's
     * layout placed it.
     *
     * <p>Prior to API 11 this will return 0.</p>
     *
     * @return The vertical position of this view relative to its top position, in pixels.
     */
    public static float getTranslationY(View view) {
        return IMPL.getTranslationY(view);
    }

    /**
     * Returns the minimum width of the view.
     *
     * <p>Prior to API 16 this will return 0.</p>
     *
     * @return the minimum width the view will try to be.
     */
    public static int getMinimumWidth(View view) {
        return IMPL.getMinimumWidth(view);
    }

    /**
     * Returns the minimum height of the view.
     *
     * <p>Prior to API 16 this will return 0.</p>
     *
     * @return the minimum height the view will try to be.
     */
    public static int getMinimumHeight(View view) {
        return IMPL.getMinimumHeight(view);
    }

    /**
     * This method returns a ViewPropertyAnimator object, which can be used to animate
     * specific properties on this View.
     *
     * <p>Prior to API 14, this method will do nothing.</p>
     *
     * @return ViewPropertyAnimator The ViewPropertyAnimator associated with this View.
     */
    public static ViewPropertyAnimatorCompat animate(View view) {
        return IMPL.animate(view);
    }

    /**
     * Sets the horizontal location of this view relative to its left position.
     * This effectively positions the object post-layout, in addition to wherever the object's
     * layout placed it.
     *
     * <p>Prior to API 11 this will have no effect.</p>
     *
     * @param value The horizontal position of this view relative to its left position,
     * in pixels.
     */
    public static void setTranslationX(View view, float value) {
        IMPL.setTranslationX(view, value);
    }

    /**
     * Sets the vertical location of this view relative to its top position.
     * This effectively positions the object post-layout, in addition to wherever the object's
     * layout placed it.
     *
     * <p>Prior to API 11 this will have no effect.</p>
     *
     * @param value The vertical position of this view relative to its top position,
     * in pixels.
     *
     * @attr ref android.R.styleable#View_translationY
     */
    public static void setTranslationY(View view, float value) {
        IMPL.setTranslationY(view, value);
    }

    /**
     * <p>Sets the opacity of the view. This is a value from 0 to 1, where 0 means the view is
     * completely transparent and 1 means the view is completely opaque.</p>
     *
     * <p> Note that setting alpha to a translucent value (0 < alpha < 1) can have significant
     * performance implications, especially for large views. It is best to use the alpha property
     * sparingly and transiently, as in the case of fading animations.</p>
     *
     * <p>Prior to API 11 this will have no effect.</p>
     *
     * @param value The opacity of the view.
     */
    public static void setAlpha(View view, @FloatRange(from=0.0, to=1.0) float value) {
        IMPL.setAlpha(view, value);
    }

    /**
     * Sets the visual x position of this view, in pixels. This is equivalent to setting the
     * {@link #setTranslationX(View, float) translationX} property to be the difference between
     * the x value passed in and the current left property of the view as determined
     * by the layout bounds.
     *
     * <p>Prior to API 11 this will have no effect.</p>
     *
     * @param value The visual x position of this view, in pixels.
     */
    public static void setX(View view, float value) {
        IMPL.setX(view, value);
    }

    /**
     * Sets the visual y position of this view, in pixels. This is equivalent to setting the
     * {@link #setTranslationY(View, float) translationY} property to be the difference between
     * the y value passed in and the current top property of the view as determined by the
     * layout bounds.
     *
     * <p>Prior to API 11 this will have no effect.</p>
     *
     * @param value The visual y position of this view, in pixels.
     */
    public static void setY(View view, float value) {
        IMPL.setY(view, value);
    }

    /**
     * Sets the degrees that the view is rotated around the pivot point. Increasing values
     * result in clockwise rotation.
     *
     * <p>Prior to API 11 this will have no effect.</p>
     *
     * @param value The degrees of rotation.
     */
    public static void setRotation(View view, float value) {
        IMPL.setRotation(view, value);
    }

    /**
     * Sets the degrees that the view is rotated around the horizontal axis through the pivot point.
     * Increasing values result in clockwise rotation from the viewpoint of looking down the
     * x axis.
     *
     * <p>Prior to API 11 this will have no effect.</p>
     *
     * @param value The degrees of X rotation.
     */
    public static void setRotationX(View view, float value) {
        IMPL.setRotationX(view, value);
    }

    /**
     * Sets the degrees that the view is rotated around the vertical axis through the pivot point.
     * Increasing values result in counter-clockwise rotation from the viewpoint of looking
     * down the y axis.
     *
     * <p>Prior to API 11 this will have no effect.</p>
     *
     * @param value The degrees of Y rotation.
     */
    public static void setRotationY(View view, float value) {
        IMPL.setRotationY(view, value);
    }

    /**
     * Sets the amount that the view is scaled in x around the pivot point, as a proportion of
     * the view's unscaled width. A value of 1 means that no scaling is applied.
     *
     * <p>Prior to API 11 this will have no effect.</p>
     *
     * @param value The scaling factor.
     */
    public static void setScaleX(View view, float value) {
        IMPL.setScaleX(view, value);
    }

    /**
     * Sets the amount that the view is scaled in Y around the pivot point, as a proportion of
     * the view's unscaled width. A value of 1 means that no scaling is applied.
     *
     * <p>Prior to API 11 this will have no effect.</p>
     *
     * @param value The scaling factor.
     */
    public static void setScaleY(View view, float value) {
        IMPL.setScaleY(view, value);
    }

    /**
     * The x location of the point around which the view is
     * {@link #setRotation(View, float) rotated} and {@link #setScaleX(View, float) scaled}.
     *
     * <p>Prior to API 11 this will have no effect.</p>
     *
     */
    public static float getPivotX(View view) {
        return IMPL.getPivotX(view);
    }

    /**
     * Sets the x location of the point around which the view is
     * {@link #setRotation(View, float) rotated} and {@link #setScaleX(View, float) scaled}.
     * By default, the pivot point is centered on the object.
     * Setting this property disables this behavior and causes the view to use only the
     * explicitly set pivotX and pivotY values.
     *
     * <p>Prior to API 11 this will have no effect.</p>
     *
     * @param value The x location of the pivot point.
     */
    public static void setPivotX(View view, float value) {
        IMPL.setPivotX(view, value);
    }

    /**
     * The y location of the point around which the view is {@link #setRotation(View,
     * float) rotated} and {@link #setScaleY(View, float) scaled}.
     *
     * <p>Prior to API 11 this will return 0.</p>
     *
     * @return The y location of the pivot point.
     */
    public static float getPivotY(View view) {
        return IMPL.getPivotY(view);
    }

    /**
     * Sets the y location of the point around which the view is
     * {@link #setRotation(View, float) rotated} and {@link #setScaleY(View, float) scaled}.
     * By default, the pivot point is centered on the object.
     * Setting this property disables this behavior and causes the view to use only the
     * explicitly set pivotX and pivotY values.
     *
     * <p>Prior to API 11 this will have no effect.</p>
     *
     * @param value The y location of the pivot point.
     */
    public static void setPivotY(View view, float value) {
        IMPL.setPivotX(view, value);
    }

    public static float getRotation(View view) {
        return IMPL.getRotation(view);
    }

    public static float getRotationX(View view) {
        return IMPL.getRotationX(view);
    }

    public static float getRotationY(View view) {
        return IMPL.getRotationY(view);
    }

    public static float getScaleX(View view) {
        return IMPL.getScaleX(view);
    }

    public static float getScaleY(View view) {
        return IMPL.getScaleY(view);
    }

    public static float getX(View view) {
        return IMPL.getX(view);
    }

    public static float getY(View view) {
        return IMPL.getY(view);
    }

    /**
     * Sets the base elevation of this view, in pixels.
     */
    public static void setElevation(View view, float elevation) {
        IMPL.setElevation(view, elevation);
    }

    /**
     * The base elevation of this view relative to its parent, in pixels.
     *
     * @return The base depth position of the view, in pixels.
     */
    public static float getElevation(View view) {
        return IMPL.getElevation(view);
    }

    /**
     * Sets the depth location of this view relative to its {@link #getElevation(View) elevation}.
     */
    public static void setTranslationZ(View view, float translationZ) {
        IMPL.setTranslationZ(view, translationZ);
    }

    /**
     * The depth location of this view relative to its {@link #getElevation(View) elevation}.
     *
     * @return The depth of this view relative to its elevation.
     */
    public static float getTranslationZ(View view) {
        return IMPL.getTranslationZ(view);
    }

    /**
     * Sets the name of the View to be used to identify Views in Transitions.
     * Names should be unique in the View hierarchy.
     *
     * @param view The View against which to invoke the method.
     * @param transitionName The name of the View to uniquely identify it for Transitions.
     */
    public static void setTransitionName(View view, String transitionName) {
        IMPL.setTransitionName(view, transitionName);
    }

    /**
     * Returns the name of the View to be used to identify Views in Transitions.
     * Names should be unique in the View hierarchy.
     *
     * <p>This returns null if the View has not been given a name.</p>
     *
     * @param view The View against which to invoke the method.
     * @return The name used of the View to be used to identify Views in Transitions or null
     * if no name has been given.
     */
    public static String getTransitionName(View view) {
        return IMPL.getTransitionName(view);
    }

    /**
     * Returns the current system UI visibility that is currently set for the entire window.
     */
    public static int getWindowSystemUiVisibility(View view) {
        return IMPL.getWindowSystemUiVisibility(view);
    }

    /**
     * Ask that a new dispatch of {@code View.onApplyWindowInsets(WindowInsets)} be performed. This
     * falls back to {@code View.requestFitSystemWindows()} where available.
     */
    public static void requestApplyInsets(View view) {
        IMPL.requestApplyInsets(view);
    }

    /**
     * Tells the ViewGroup whether to draw its children in the order defined by the method
     * {@code ViewGroup.getChildDrawingOrder(int, int)}.
     *
     * @param enabled true if the order of the children when drawing is determined by
     *        {@link ViewGroup#getChildDrawingOrder(int, int)}, false otherwise
     *
     * <p>Prior to API 7 this will have no effect.</p>
     */
    public static void setChildrenDrawingOrderEnabled(ViewGroup viewGroup, boolean enabled) {
       IMPL.setChildrenDrawingOrderEnabled(viewGroup, enabled);
    }

    /**
     * Returns true if this view should adapt to fit system window insets. This method will always
     * return false before API 16 (Jellybean).
     */
    public static boolean getFitsSystemWindows(View v) {
        return IMPL.getFitsSystemWindows(v);
    }

    /**
     * Sets whether or not this view should account for system screen decorations
     * such as the status bar and inset its content; that is, controlling whether
     * the default implementation of {@link View#fitSystemWindows(Rect)} will be
     * executed. See that method for more details.
     */
    public static void setFitsSystemWindows(View view, boolean fitSystemWindows) {
        IMPL.setFitsSystemWindows(view, fitSystemWindows);
    }

    /**
     * On API 11 devices and above, call <code>Drawable.jumpToCurrentState()</code>
     * on all Drawable objects associated with this view.
     * <p>
     * On API 21 and above, also calls <code>StateListAnimator#jumpToCurrentState()</code>
     * if there is a StateListAnimator attached to this view.
     */
    public static void jumpDrawablesToCurrentState(View v) {
        IMPL.jumpDrawablesToCurrentState(v);
    }

    /**
     * Set an {@link OnApplyWindowInsetsListener} to take over the policy for applying
     * window insets to this view. This will only take effect on devices with API 21 or above.
     */
    public static void setOnApplyWindowInsetsListener(View v,
            OnApplyWindowInsetsListener listener) {
        IMPL.setOnApplyWindowInsetsListener(v, listener);
    }

    /**
     * Called when the view should apply {@link WindowInsetsCompat} according to its internal policy.
     *
     * <p>Clients may supply an {@link OnApplyWindowInsetsListener} to a view. If one is set
     * it will be called during dispatch instead of this method. The listener may optionally
     * call this method from its own implementation if it wishes to apply the view's default
     * insets policy in addition to its own.</p>
     *
     * @param view The View against which to invoke the method.
     * @param insets Insets to apply
     * @return The supplied insets with any applied insets consumed
     */
    public static WindowInsetsCompat onApplyWindowInsets(View view, WindowInsetsCompat insets) {
        return IMPL.onApplyWindowInsets(view, insets);
    }

    /**
     * Request to apply the given window insets to this view or another view in its subtree.
     *
     * <p>This method should be called by clients wishing to apply insets corresponding to areas
     * obscured by window decorations or overlays. This can include the status and navigation bars,
     * action bars, input methods and more. New inset categories may be added in the future.
     * The method returns the insets provided minus any that were applied by this view or its
     * children.</p>
     *
     * @param insets Insets to apply
     * @return The provided insets minus the insets that were consumed
     */
    public static WindowInsetsCompat dispatchApplyWindowInsets(View view,
            WindowInsetsCompat insets) {
        return IMPL.dispatchApplyWindowInsets(view, insets);
    }

    /**
     * Controls whether the entire hierarchy under this view will save its
     * state when a state saving traversal occurs from its parent.
     *
     * @param enabled Set to false to <em>disable</em> state saving, or true
     * (the default) to allow it.
     */
    public static void setSaveFromParentEnabled(View v, boolean enabled) {
        IMPL.setSaveFromParentEnabled(v, enabled);
    }

    /**
     * Changes the activated state of this view. A view can be activated or not.
     * Note that activation is not the same as selection.  Selection is
     * a transient property, representing the view (hierarchy) the user is
     * currently interacting with.  Activation is a longer-term state that the
     * user can move views in and out of.
     *
     * @param activated true if the view must be activated, false otherwise
     */
    public static void setActivated(View view, boolean activated) {
        IMPL.setActivated(view, activated);
    }

    /**
     * Returns whether this View has content which overlaps.
     *
     * <p>This function, intended to be overridden by specific View types, is an optimization when
     * alpha is set on a view. If rendering overlaps in a view with alpha < 1, that view is drawn to
     * an offscreen buffer and then composited into place, which can be expensive. If the view has
     * no overlapping rendering, the view can draw each primitive with the appropriate alpha value
     * directly. An example of overlapping rendering is a TextView with a background image, such as
     * a Button. An example of non-overlapping rendering is a TextView with no background, or an
     * ImageView with only the foreground image. The default implementation returns true; subclasses
     * should override if they have cases which can be optimized.</p>
     *
     * @return true if the content in this view might overlap, false otherwise.
     */
    public static boolean hasOverlappingRendering(View view) {
        return IMPL.hasOverlappingRendering(view);
    }

    /**
     * Return if the padding as been set through relative values
     * {@code View.setPaddingRelative(int, int, int, int)} or thru
     *
     * @return true if the padding is relative or false if it is not.
     */
    public static boolean isPaddingRelative(View view) {
        return IMPL.isPaddingRelative(view);
    }

    /**
     * Return the tint applied to the background drawable, if specified.
     * <p>
     * Only returns meaningful info when running on API v21 or newer, or if {@code view}
     * implements the {@code TintableBackgroundView} interface.
     */
    public static ColorStateList getBackgroundTintList(View view) {
        return IMPL.getBackgroundTintList(view);
    }

    /**
     * Applies a tint to the background drawable.
     * <p>
     * This will always take effect when running on API v21 or newer. When running on platforms
     * previous to API v21, it will only take effect if {@code view} implement the
     * {@code TintableBackgroundView} interface.
     */
    public static void setBackgroundTintList(View view, ColorStateList tintList) {
        IMPL.setBackgroundTintList(view, tintList);
    }

    /**
     * Return the blending mode used to apply the tint to the background
     * drawable, if specified.
     * <p>
     * Only returns meaningful info when running on API v21 or newer, or if {@code view}
     * implements the {@code TintableBackgroundView} interface.
     */
    public static PorterDuff.Mode getBackgroundTintMode(View view) {
        return IMPL.getBackgroundTintMode(view);
    }

    /**
     * Specifies the blending mode used to apply the tint specified by
     * {@link #setBackgroundTintList(android.view.View, android.content.res.ColorStateList)} to
     * the background drawable. The default mode is {@link PorterDuff.Mode#SRC_IN}.
     * <p>
     * This will always take effect when running on API v21 or newer. When running on platforms
     * previous to API v21, it will only take effect if {@code view} implement the
     * {@code TintableBackgroundView} interface.
     */
    public static void setBackgroundTintMode(View view, PorterDuff.Mode mode) {
        IMPL.setBackgroundTintMode(view, mode);
    }
    // TODO: getters for various view properties (rotation, etc)

    /**
     * Enable or disable nested scrolling for this view.
     *
     * <p>If this property is set to true the view will be permitted to initiate nested
     * scrolling operations with a compatible parent view in the current hierarchy. If this
     * view does not implement nested scrolling this will have no effect. Disabling nested scrolling
     * while a nested scroll is in progress has the effect of
     * {@link #stopNestedScroll(View) stopping} the nested scroll.</p>
     *
     * @param enabled true to enable nested scrolling, false to disable
     *
     * @see #isNestedScrollingEnabled(View)
     */
    public static void setNestedScrollingEnabled(View view, boolean enabled) {
        IMPL.setNestedScrollingEnabled(view, enabled);
    }

    /**
     * Returns true if nested scrolling is enabled for this view.
     *
     * <p>If nested scrolling is enabled and this View class implementation supports it,
     * this view will act as a nested scrolling child view when applicable, forwarding data
     * about the scroll operation in progress to a compatible and cooperating nested scrolling
     * parent.</p>
     *
     * @return true if nested scrolling is enabled
     *
     * @see #setNestedScrollingEnabled(View, boolean)
     */
    public static boolean isNestedScrollingEnabled(View view) {
        return IMPL.isNestedScrollingEnabled(view);
    }

    /**
     * Begin a nestable scroll operation along the given axes.
     *
     * <p>A view starting a nested scroll promises to abide by the following contract:</p>
     *
     * <p>The view will call startNestedScroll upon initiating a scroll operation. In the case
     * of a touch scroll this corresponds to the initial {@link MotionEvent#ACTION_DOWN}.
     * In the case of touch scrolling the nested scroll will be terminated automatically in
     * the same manner as {@link ViewParent#requestDisallowInterceptTouchEvent(boolean)}.
     * In the event of programmatic scrolling the caller must explicitly call
     * {@link #stopNestedScroll(View)} to indicate the end of the nested scroll.</p>
     *
     * <p>If <code>startNestedScroll</code> returns true, a cooperative parent was found.
     * If it returns false the caller may ignore the rest of this contract until the next scroll.
     * Calling startNestedScroll while a nested scroll is already in progress will return true.</p>
     *
     * <p>At each incremental step of the scroll the caller should invoke
     * {@link #dispatchNestedPreScroll(View, int, int, int[], int[]) dispatchNestedPreScroll}
     * once it has calculated the requested scrolling delta. If it returns true the nested scrolling
     * parent at least partially consumed the scroll and the caller should adjust the amount it
     * scrolls by.</p>
     *
     * <p>After applying the remainder of the scroll delta the caller should invoke
     * {@link #dispatchNestedScroll(View, int, int, int, int, int[]) dispatchNestedScroll}, passing
     * both the delta consumed and the delta unconsumed. A nested scrolling parent may treat
     * these values differently. See
     * {@link NestedScrollingParent#onNestedScroll(View, int, int, int, int)}.
     * </p>
     *
     * @param axes Flags consisting of a combination of {@link ViewCompat#SCROLL_AXIS_HORIZONTAL}
     *             and/or {@link ViewCompat#SCROLL_AXIS_VERTICAL}.
     * @return true if a cooperative parent was found and nested scrolling has been enabled for
     *         the current gesture.
     *
     * @see #stopNestedScroll(View)
     * @see #dispatchNestedPreScroll(View, int, int, int[], int[])
     * @see #dispatchNestedScroll(View, int, int, int, int, int[])
     */
    public static boolean startNestedScroll(View view, int axes) {
        return IMPL.startNestedScroll(view, axes);
    }

    /**
     * Stop a nested scroll in progress.
     *
     * <p>Calling this method when a nested scroll is not currently in progress is harmless.</p>
     *
     * @see #startNestedScroll(View, int)
     */
    public static void stopNestedScroll(View view) {
        IMPL.stopNestedScroll(view);
    }

    /**
     * Returns true if this view has a nested scrolling parent.
     *
     * <p>The presence of a nested scrolling parent indicates that this view has initiated
     * a nested scroll and it was accepted by an ancestor view further up the view hierarchy.</p>
     *
     * @return whether this view has a nested scrolling parent
     */
    public static boolean hasNestedScrollingParent(View view) {
        return IMPL.hasNestedScrollingParent(view);
    }

    /**
     * Dispatch one step of a nested scroll in progress.
     *
     * <p>Implementations of views that support nested scrolling should call this to report
     * info about a scroll in progress to the current nested scrolling parent. If a nested scroll
     * is not currently in progress or nested scrolling is not
     * {@link #isNestedScrollingEnabled(View) enabled} for this view this method does nothing.</p>
     *
     * <p>Compatible View implementations should also call
     * {@link #dispatchNestedPreScroll(View, int, int, int[], int[]) dispatchNestedPreScroll} before
     * consuming a component of the scroll event themselves.</p>
     *
     * @param dxConsumed Horizontal distance in pixels consumed by this view during this scroll step
     * @param dyConsumed Vertical distance in pixels consumed by this view during this scroll step
     * @param dxUnconsumed Horizontal scroll distance in pixels not consumed by this view
     * @param dyUnconsumed Horizontal scroll distance in pixels not consumed by this view
     * @param offsetInWindow Optional. If not null, on return this will contain the offset
     *                       in local view coordinates of this view from before this operation
     *                       to after it completes. View implementations may use this to adjust
     *                       expected input coordinate tracking.
     * @return true if the event was dispatched, false if it could not be dispatched.
     * @see #dispatchNestedPreScroll(View, int, int, int[], int[])
     */
    public static boolean dispatchNestedScroll(View view, int dxConsumed, int dyConsumed,
            int dxUnconsumed, int dyUnconsumed, int[] offsetInWindow) {
        return IMPL.dispatchNestedScroll(view, dxConsumed, dyConsumed, dxUnconsumed, dyUnconsumed,
                offsetInWindow);
    }

    /**
     * Dispatch one step of a nested scroll in progress before this view consumes any portion of it.
     *
     * <p>Nested pre-scroll events are to nested scroll events what touch intercept is to touch.
     * <code>dispatchNestedPreScroll</code> offers an opportunity for the parent view in a nested
     * scrolling operation to consume some or all of the scroll operation before the child view
     * consumes it.</p>
     *
     * @param dx Horizontal scroll distance in pixels
     * @param dy Vertical scroll distance in pixels
     * @param consumed Output. If not null, consumed[0] will contain the consumed component of dx
     *                 and consumed[1] the consumed dy.
     * @param offsetInWindow Optional. If not null, on return this will contain the offset
     *                       in local view coordinates of this view from before this operation
     *                       to after it completes. View implementations may use this to adjust
     *                       expected input coordinate tracking.
     * @return true if the parent consumed some or all of the scroll delta
     * @see #dispatchNestedScroll(View, int, int, int, int, int[])
     */
    public static boolean dispatchNestedPreScroll(View view, int dx, int dy, int[] consumed,
            int[] offsetInWindow) {
        return IMPL.dispatchNestedPreScroll(view, dx, dy, consumed, offsetInWindow);
    }

    /**
     * Dispatch a fling to a nested scrolling parent.
     *
     * <p>This method should be used to indicate that a nested scrolling child has detected
     * suitable conditions for a fling. Generally this means that a touch scroll has ended with a
     * {@link VelocityTracker velocity} in the direction of scrolling that meets or exceeds
     * the {@link ViewConfiguration#getScaledMinimumFlingVelocity() minimum fling velocity}
     * along a scrollable axis.</p>
     *
     * <p>If a nested scrolling child view would normally fling but it is at the edge of
     * its own content, it can use this method to delegate the fling to its nested scrolling
     * parent instead. The parent may optionally consume the fling or observe a child fling.</p>
     *
     * @param velocityX Horizontal fling velocity in pixels per second
     * @param velocityY Vertical fling velocity in pixels per second
     * @param consumed true if the child consumed the fling, false otherwise
     * @return true if the nested scrolling parent consumed or otherwise reacted to the fling
     */
    public static boolean dispatchNestedFling(View view, float velocityX, float velocityY,
            boolean consumed) {
        return IMPL.dispatchNestedFling(view, velocityX, velocityY, consumed);
    }

    /**
     * Dispatch a fling to a nested scrolling parent before it is processed by this view.
     *
     * <p>Nested pre-fling events are to nested fling events what touch intercept is to touch
     * and what nested pre-scroll is to nested scroll. <code>dispatchNestedPreFling</code>
     * offsets an opportunity for the parent view in a nested fling to fully consume the fling
     * before the child view consumes it. If this method returns <code>true</code>, a nested
     * parent view consumed the fling and this view should not scroll as a result.</p>
     *
     * <p>For a better user experience, only one view in a nested scrolling chain should consume
     * the fling at a time. If a parent view consumed the fling this method will return false.
     * Custom view implementations should account for this in two ways:</p>
     *
     * <ul>
     *     <li>If a custom view is paged and needs to settle to a fixed page-point, do not
     *     call <code>dispatchNestedPreFling</code>; consume the fling and settle to a valid
     *     position regardless.</li>
     *     <li>If a nested parent does consume the fling, this view should not scroll at all,
     *     even to settle back to a valid idle position.</li>
     * </ul>
     *
     * <p>Views should also not offer fling velocities to nested parent views along an axis
     * where scrolling is not currently supported; a {@link android.widget.ScrollView ScrollView}
     * should not offer a horizontal fling velocity to its parents since scrolling along that
     * axis is not permitted and carrying velocity along that motion does not make sense.</p>
     *
     * @param velocityX Horizontal fling velocity in pixels per second
     * @param velocityY Vertical fling velocity in pixels per second
     * @return true if a nested scrolling parent consumed the fling
     */
    public static boolean dispatchNestedPreFling(View view, float velocityX, float velocityY) {
        return IMPL.dispatchNestedPreFling(view, velocityX, velocityY);
    }

    /**
     * Returns true if {@code view} has been through at least one layout since it
     * was last attached to or detached from a window.
     */
    public static boolean isLaidOut(View view) {
        return IMPL.isLaidOut(view);
    }

    /**
     * The visual z position of this view, in pixels. This is equivalent to the
     * {@link #setTranslationZ(View, float) translationZ} property plus the current
     * {@link #getElevation(View) elevation} property.
     *
     * @return The visual z position of this view, in pixels.
     */
    public static float getZ(View view) {
        return IMPL.getZ(view);
    }

    /**
     * Offset this view's vertical location by the specified number of pixels.
     *
     * @param offset the number of pixels to offset the view by
     */
    public static void offsetTopAndBottom(View view, int offset) {
        view.offsetTopAndBottom(offset);

        if (offset != 0 && Build.VERSION.SDK_INT < 11) {
            // We need to manually invalidate pre-honeycomb
            view.invalidate();
        }
    }
    /**
     * Offset this view's horizontal location by the specified amount of pixels.
     *
     * @param offset the number of pixels to offset the view by
     */
    public static void offsetLeftAndRight(View view, int offset) {
        view.offsetLeftAndRight(offset);

        if (offset != 0 && Build.VERSION.SDK_INT < 11) {
            // We need to manually invalidate pre-honeycomb
            view.invalidate();
        }
    }

    /**
     * Sets a rectangular area on this view to which the view will be clipped
     * when it is drawn. Setting the value to null will remove the clip bounds
     * and the view will draw normally, using its full bounds.
     *
     * <p>Prior to API 18 this does nothing.</p>
     *
     * @param view       The view to set clipBounds.
     * @param clipBounds The rectangular area, in the local coordinates of
     * this view, to which future drawing operations will be clipped.
     */
    public static void setClipBounds(View view, Rect clipBounds) {
        IMPL.setClipBounds(view, clipBounds);
    }

    /**
     * Returns a copy of the current {@link #setClipBounds(View, Rect)}.
     *
     * <p>Prior to API 18 this will return null.</p>
     *
     * @return A copy of the current clip bounds if clip bounds are set,
     * otherwise null.
     */
    public static Rect getClipBounds(View view) {
        return IMPL.getClipBounds(view);
    }

    /**
     * Returns true if the provided view is currently attached to a window.
     */
    public static boolean isAttachedToWindow(View view) {
        return IMPL.isAttachedToWindow(view);
    }
}
