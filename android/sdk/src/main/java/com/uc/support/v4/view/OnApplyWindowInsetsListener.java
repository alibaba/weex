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

import android.view.View;

/**
 * Listener for applying window insets on a view in a custom way.
 *
 * <p>Apps may choose to implement this interface if they want to apply custom policy
 * to the way that window insets are treated for a view. If an OnApplyWindowInsetsListener
 * is set, it's
 * {@link #onApplyWindowInsets(android.view.View, WindowInsetsCompat) onApplyWindowInsets}
 * method will be called instead of the View's own {@code onApplyWindowInsets} method.
 * The listener may optionally call the parameter View's <code>onApplyWindowInsets</code>
 * method to apply the View's normal behavior as part of its own.</p>
 */
public interface OnApplyWindowInsetsListener {
    /**
     * When {@link ViewCompat#setOnApplyWindowInsetsListener(View, OnApplyWindowInsetsListener) set}
     * on a View, this listener method will be called instead of the view's own
     * {@code onApplyWindowInsets} method.
     *
     * @param v The view applying window insets
     * @param insets The insets to apply
     * @return The insets supplied, minus any insets that were consumed
     */
    public WindowInsetsCompat onApplyWindowInsets(View v, WindowInsetsCompat insets);
}