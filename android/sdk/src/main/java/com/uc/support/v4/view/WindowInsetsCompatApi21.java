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

import android.graphics.Rect;
import android.view.WindowInsets;

class WindowInsetsCompatApi21 extends WindowInsetsCompat {

    private final WindowInsets mSource;

    WindowInsetsCompatApi21(WindowInsets source) {
        mSource = source;
    }

    @Override
    public int getSystemWindowInsetLeft() {
        return mSource.getSystemWindowInsetLeft();
    }

    @Override
    public int getSystemWindowInsetTop() {
        return mSource.getSystemWindowInsetTop();
    }

    @Override
    public int getSystemWindowInsetRight() {
        return mSource.getSystemWindowInsetRight();
    }

    @Override
    public int getSystemWindowInsetBottom() {
        return mSource.getSystemWindowInsetBottom();
    }

    @Override
    public boolean hasSystemWindowInsets() {
        return mSource.hasSystemWindowInsets();
    }

    @Override
    public boolean hasInsets() {
        return mSource.hasInsets();
    }

    @Override
    public boolean isConsumed() {
        return mSource.isConsumed();
    }

    @Override
    public boolean isRound() {
        return mSource.isRound();
    }

    @Override
    public WindowInsetsCompat consumeSystemWindowInsets() {
        return new WindowInsetsCompatApi21(mSource.consumeSystemWindowInsets());
    }

    @Override
    public WindowInsetsCompat replaceSystemWindowInsets(int left, int top, int right, int bottom) {
        return new WindowInsetsCompatApi21(mSource.replaceSystemWindowInsets(left, top, right, bottom));
    }

    @Override
    public WindowInsetsCompat replaceSystemWindowInsets(Rect systemWindowInsets) {
        return new WindowInsetsCompatApi21(mSource.replaceSystemWindowInsets(systemWindowInsets));
    }

    @Override
    public int getStableInsetTop() {
        return mSource.getStableInsetTop();
    }

    @Override
    public int getStableInsetLeft() {
        return mSource.getStableInsetLeft();
    }

    @Override
    public int getStableInsetRight() {
        return mSource.getStableInsetRight();
    }

    @Override
    public int getStableInsetBottom() {
        return mSource.getStableInsetBottom();
    }

    @Override
    public boolean hasStableInsets() {
        return mSource.hasStableInsets();
    }

    @Override
    public WindowInsetsCompat consumeStableInsets() {
        return new WindowInsetsCompatApi21(mSource.consumeStableInsets());
    }

    WindowInsets unwrap() {
        return mSource;
    }
}
