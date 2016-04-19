/*
 * Copyright (C) 2012 The Android Open Source Project
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

import android.os.Bundle;
import android.view.View;
import android.view.ViewParent;

/**
 * Jellybean-specific View API access
 */
class ViewCompatJB {

    public static boolean hasTransientState(View view) {
        return view.hasTransientState();
    }

    public static void setHasTransientState(View view, boolean hasTransientState) {
        view.setHasTransientState(hasTransientState);
    }

    public static void postInvalidateOnAnimation(View view) {
        view.postInvalidateOnAnimation();
    }

    public static void postInvalidateOnAnimation(View view, int left, int top,
            int right, int bottom) {
        view.postInvalidate(left, top, right, bottom);
    }

    public static void postOnAnimation(View view, Runnable action) {
        view.postOnAnimation(action);
    }

    public static void postOnAnimationDelayed(View view, Runnable action, long delayMillis) {
        view.postOnAnimationDelayed(action, delayMillis);
    }

    public static int getImportantForAccessibility(View view) {
        return view.getImportantForAccessibility();
    }

    public static void setImportantForAccessibility(View view, int mode) {
        view.setImportantForAccessibility(mode);
    }

    public static boolean performAccessibilityAction(View view, int action, Bundle arguments) {
        return view.performAccessibilityAction(action, arguments);
    }

    public static Object getAccessibilityNodeProvider(View view) {
        return view.getAccessibilityNodeProvider();
    }

    public static ViewParent getParentForAccessibility(View view) {
        return view.getParentForAccessibility();
    }

    public static int getMinimumWidth(View view) {
        return view.getMinimumWidth();
    }

    public static int getMinimumHeight(View view) {
        return view.getMinimumHeight();
    }

    public static void requestApplyInsets(View view) {
        view.requestFitSystemWindows();
    }

    public static boolean getFitsSystemWindows(View view) {
        return view.getFitsSystemWindows();
    }

    public static boolean hasOverlappingRendering(View view) {
        return view.hasOverlappingRendering();
    }
}
