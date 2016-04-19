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

import android.animation.Animator;
import android.animation.AnimatorListenerAdapter;
import android.view.View;
import android.view.animation.Interpolator;

class ViewPropertyAnimatorCompatICS {

    public static void setDuration(View view, long value) {
        view.animate().setDuration(value);
    }

    public static void alpha(View view, float value) {
        view.animate().alpha(value);
    }

    public static void translationX(View view, float value) {
        view.animate().translationX(value);
    }

    public static void translationY(View view, float value) {
        view.animate().translationY(value);
    }

    public static long getDuration(View view) {
        return view.animate().getDuration();
    }

    public static void setInterpolator(View view, Interpolator value) {
        view.animate().setInterpolator(value);
    }

    public static void setStartDelay(View view, long value) {
        view.animate().setStartDelay(value);
    }

    public static long getStartDelay(View view) {
        return view.animate().getStartDelay();
    }

    public static void alphaBy(View view, float value) {
        view.animate().alphaBy(value);
    }

    public static void rotation(View view, float value) {
        view.animate().rotation(value);
    }

    public static void rotationBy(View view, float value) {
        view.animate().rotationBy(value);
    }

    public static void rotationX(View view, float value) {
        view.animate().rotationX(value);
    }

    public static void rotationXBy(View view, float value) {
        view.animate().rotationXBy(value);
    }

    public static void rotationY(View view, float value) {
        view.animate().rotationY(value);
    }

    public static void rotationYBy(View view, float value) {
        view.animate().rotationYBy(value);
    }

    public static void scaleX(View view, float value) {
        view.animate().scaleX(value);
    }

    public static void scaleXBy(View view, float value) {
        view.animate().scaleXBy(value);
    }

    public static void scaleY(View view, float value) {
        view.animate().scaleY(value);
    }

    public static void scaleYBy(View view, float value) {
        view.animate().scaleYBy(value);
    }

    public static void cancel(View view) {
        view.animate().cancel();
    }

    public static void x(View view, float value) {
        view.animate().x(value);
    }

    public static void xBy(View view, float value) {
        view.animate().xBy(value);
    }

    public static void y(View view, float value) {
        view.animate().y(value);
    }

    public static void yBy(View view, float value) {
        view.animate().yBy(value);
    }

    public static void translationXBy(View view, float value) {
        view.animate().translationXBy(value);
    }

    public static void translationYBy(View view, float value) {
        view.animate().translationYBy(value);
    }

    public static void start(View view) {
        view.animate().start();
    }

    public static void setListener(final View view,
            final ViewPropertyAnimatorListener listener) {
        if (listener != null) {
            view.animate().setListener(new AnimatorListenerAdapter() {
                @Override
                public void onAnimationCancel(Animator animation) {
                    listener.onAnimationCancel(view);
                }

                @Override
                public void onAnimationEnd(Animator animation) {
                    listener.onAnimationEnd(view);
                }

                @Override
                public void onAnimationStart(Animator animation) {
                    listener.onAnimationStart(view);
                }
            });
        } else {
            view.animate().setListener(null);
        }
    }
}
