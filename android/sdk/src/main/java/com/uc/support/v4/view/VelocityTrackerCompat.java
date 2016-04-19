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

import android.view.VelocityTracker;

/**
 * Helper for accessing features in {@link VelocityTracker}
 * introduced after API level 4 in a backwards compatible fashion.
 */
public class VelocityTrackerCompat {
    /**
     * Interface for the full API.
     */
    interface VelocityTrackerVersionImpl {
        public float getXVelocity(VelocityTracker tracker, int pointerId);
        public float getYVelocity(VelocityTracker tracker, int pointerId);
    }

    /**
     * Interface implementation that doesn't use anything about v4 APIs.
     */
    static class BaseVelocityTrackerVersionImpl implements VelocityTrackerVersionImpl {
        @Override
        public float getXVelocity(VelocityTracker tracker, int pointerId) {
            return tracker.getXVelocity();
        }
        @Override
        public float getYVelocity(VelocityTracker tracker, int pointerId) {
            return tracker.getYVelocity();
        }
    }

    /**
     * Interface implementation for devices with at least v11 APIs.
     */
    static class HoneycombVelocityTrackerVersionImpl implements VelocityTrackerVersionImpl {
        @Override
        public float getXVelocity(VelocityTracker tracker, int pointerId) {
            return VelocityTrackerCompatHoneycomb.getXVelocity(tracker, pointerId);
        }
        @Override
        public float getYVelocity(VelocityTracker tracker, int pointerId) {
            return VelocityTrackerCompatHoneycomb.getYVelocity(tracker, pointerId);
        }
    }

    /**
     * Select the correct implementation to use for the current platform.
     */
    static final VelocityTrackerVersionImpl IMPL;
    static {
        if (android.os.Build.VERSION.SDK_INT >= 11) {
            IMPL = new HoneycombVelocityTrackerVersionImpl();
        } else {
            IMPL = new BaseVelocityTrackerVersionImpl();
        }
    }

    // -------------------------------------------------------------------

    /**
     * Call {@link VelocityTracker#getXVelocity(int)}.
     * If running on a pre-{@link android.os.Build.VERSION_CODES#HONEYCOMB} device,
     * returns {@link VelocityTracker#getXVelocity()}.
     */
    public static float getXVelocity(VelocityTracker tracker, int pointerId) {
        return IMPL.getXVelocity(tracker, pointerId);
    }

    /**
     * Call {@link VelocityTracker#getYVelocity(int)}.
     * If running on a pre-{@link android.os.Build.VERSION_CODES#HONEYCOMB} device,
     * returns {@link VelocityTracker#getYVelocity()}.
     */
    public static float getYVelocity(VelocityTracker tracker, int pointerId) {
        return IMPL.getYVelocity(tracker, pointerId);
    }
}
