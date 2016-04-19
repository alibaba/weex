/*
 * Copyright (C) 2013 The Android Open Source Project
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

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

import android.util.Log;
import android.view.View;
import android.view.ViewGroup;

class ViewCompatEclairMr1 {
    public static final String TAG = "ViewCompat";

    private static Method sChildrenDrawingOrderMethod;

    public static boolean isOpaque(View view) {
        return view.isOpaque();
    }

    public static void setChildrenDrawingOrderEnabled(ViewGroup viewGroup, boolean enabled) {
        if (sChildrenDrawingOrderMethod == null) {
            try {
                sChildrenDrawingOrderMethod = ViewGroup.class
                        .getDeclaredMethod("setChildrenDrawingOrderEnabled", boolean.class);
            } catch (NoSuchMethodException e) {
                Log.e(TAG, "Unable to find childrenDrawingOrderEnabled", e);
            }
            sChildrenDrawingOrderMethod.setAccessible(true);
        }
        try {
            sChildrenDrawingOrderMethod.invoke(viewGroup, enabled);
        } catch (IllegalAccessException e) {
            Log.e(TAG, "Unable to invoke childrenDrawingOrderEnabled", e);
        } catch (IllegalArgumentException e) {
            Log.e(TAG, "Unable to invoke childrenDrawingOrderEnabled", e);
        } catch (InvocationTargetException e) {
            Log.e(TAG, "Unable to invoke childrenDrawingOrderEnabled", e);
        }
    }
}
