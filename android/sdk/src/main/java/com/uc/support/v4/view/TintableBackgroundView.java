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
import com.uc.support.annotation.Nullable;

/**
 * Interface which allows a {@link android.view.View} to receive background tinting calls from
 * {@code ViewCompat} when running on API v20 devices or lower.
 */
public interface TintableBackgroundView {

    /**
     * Applies a tint to the background drawable. Does not modify the current tint
     * mode, which is {@link PorterDuff.Mode#SRC_IN} by default.
     * <p>
     * Subsequent calls to {@code View.setBackground(Drawable)} will automatically
     * mutate the drawable and apply the specified tint and tint mode.
     *
     * @param tint the tint to apply, may be {@code null} to clear tint
     *
     * @see #getSupportBackgroundTintList()
     */
    void setSupportBackgroundTintList(@Nullable ColorStateList tint);

    /**
     * Return the tint applied to the background drawable, if specified.
     *
     * @return the tint applied to the background drawable
     */
    @Nullable
    ColorStateList getSupportBackgroundTintList();

    /**
     * Specifies the blending mode used to apply the tint specified by
     * {@link #setSupportBackgroundTintList(ColorStateList)}} to the background
     * drawable. The default mode is {@link PorterDuff.Mode#SRC_IN}.
     *
     * @param tintMode the blending mode used to apply the tint, may be
     *                 {@code null} to clear tint
     * @see #getSupportBackgroundTintMode()
     */
    void setSupportBackgroundTintMode(@Nullable PorterDuff.Mode tintMode);

    /**
     * Return the blending mode used to apply the tint to the background
     * drawable, if specified.
     *
     * @return the blending mode used to apply the tint to the background
     *         drawable
     */
    @Nullable
    PorterDuff.Mode getSupportBackgroundTintMode();
}
