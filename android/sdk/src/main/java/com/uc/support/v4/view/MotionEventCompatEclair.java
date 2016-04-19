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

import android.view.MotionEvent;

/**
 * Implementation of motion event compatibility that can call Eclair APIs.
 */
class MotionEventCompatEclair {
    public static int findPointerIndex(MotionEvent event, int pointerId) {
        return event.findPointerIndex(pointerId);
    }
    public static int getPointerId(MotionEvent event, int pointerIndex) {
        return event.getPointerId(pointerIndex);
    }
    public static float getX(MotionEvent event, int pointerIndex) {
        return event.getX(pointerIndex);
    }
    public static float getY(MotionEvent event, int pointerIndex) {
        return event.getY(pointerIndex);
    }
    public static int getPointerCount(MotionEvent event) {
        return event.getPointerCount();
    }
}
