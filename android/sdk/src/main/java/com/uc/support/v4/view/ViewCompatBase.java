/*
 * Copyright (C) 2014 The Android Open Source Project
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
import android.graphics.PorterDuff;
import android.view.View;

import java.lang.reflect.Field;

class ViewCompatBase {

    private static final String TAG = "ViewCompatBase";

    private static Field sMinWidthField;
    private static boolean sMinWidthFieldFetched;
    private static Field sMinHeightField;
    private static boolean sMinHeightFieldFetched;

    static ColorStateList getBackgroundTintList(View view) {
        return (view instanceof TintableBackgroundView)
                ? ((TintableBackgroundView) view).getSupportBackgroundTintList()
                : null;
    }

    static void setBackgroundTintList(View view, ColorStateList tintList) {
        if (view instanceof TintableBackgroundView) {
            ((TintableBackgroundView) view).setSupportBackgroundTintList(tintList);
        }
    }

    static PorterDuff.Mode getBackgroundTintMode(View view) {
        return (view instanceof TintableBackgroundView)
                ? ((TintableBackgroundView) view).getSupportBackgroundTintMode()
                : null;
    }

    static void setBackgroundTintMode(View view, PorterDuff.Mode mode) {
        if (view instanceof TintableBackgroundView) {
            ((TintableBackgroundView) view).setSupportBackgroundTintMode(mode);
        }
    }

    static boolean isLaidOut(View view) {
        return view.getWidth() > 0 && view.getHeight() > 0;
    }

    static int getMinimumWidth(View view) {
        if (!sMinWidthFieldFetched) {
            try {
                sMinWidthField = View.class.getDeclaredField("mMinWidth");
                sMinWidthField.setAccessible(true);
            } catch (NoSuchFieldException e) {
                // Couldn't find the field. Abort!
            }
            sMinWidthFieldFetched = true;
        }

        if (sMinWidthField != null) {
            try {
                return (int) sMinWidthField.get(view);
            } catch (Exception e) {
                // Field get failed. Oh well...
            }
        }

        // We failed, return 0
        return 0;
    }

    static int getMinimumHeight(View view) {
        if (!sMinHeightFieldFetched) {
            try {
                sMinHeightField = View.class.getDeclaredField("mMinHeight");
                sMinHeightField.setAccessible(true);
            } catch (NoSuchFieldException e) {
                // Couldn't find the field. Abort!
            }
            sMinHeightFieldFetched = true;
        }

        if (sMinHeightField != null) {
            try {
                return (int) sMinHeightField.get(view);
            } catch (Exception e) {
                // Field get failed. Oh well...
            }
        }

        // We failed, return 0
        return 0;
    }

    static boolean isAttachedToWindow(View view) {
        return view.getWindowToken() != null;
    }
}
