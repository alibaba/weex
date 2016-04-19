package com.uc.support.v4.view;/*
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

import android.view.View;

/**
 * <p>An animation listener receives notifications from an animation.
 * Notifications indicate animation related events, such as the end or the
 * start of the animation.</p>
 */
public interface ViewPropertyAnimatorListener {
    /**
     * <p>Notifies the start of the animation.</p>
     *
     * @param view The view associated with the ViewPropertyAnimator
     */
    void onAnimationStart(View view);

    /**
     * <p>Notifies the end of the animation. This callback is not invoked
     * for animations with repeat count set to INFINITE.</p>
     *
     * @param view The view associated with the ViewPropertyAnimator
     */
    void onAnimationEnd(View view);

    /**
     * <p>Notifies the cancellation of the animation. This callback is not invoked
     * for animations with repeat count set to INFINITE.</p>
     *
     * @param view The view associated with the ViewPropertyAnimator
     */
    void onAnimationCancel(View view);
}
