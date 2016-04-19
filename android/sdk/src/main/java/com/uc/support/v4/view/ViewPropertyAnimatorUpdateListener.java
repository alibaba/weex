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
 * Implementors of this interface can add themselves as update listeners
 * to an <code>ViewPropertyAnimatorCompat</code> instance to receive callbacks on every animation
 * frame, after the current frame's values have been calculated for that
 * <code>ViewPropertyAnimatorCompat</code>.
 */
public interface ViewPropertyAnimatorUpdateListener {

    /**
     * <p>Notifies the occurrence of another frame of the animation.</p>
     *
     * @param view The view associated with the ViewPropertyAnimatorCompat
     */
    void onAnimationUpdate(View view);

}
