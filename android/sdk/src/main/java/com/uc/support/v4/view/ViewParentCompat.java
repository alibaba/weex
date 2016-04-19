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

import android.content.Context;
import android.os.Build;
import android.view.MotionEvent;
import android.view.VelocityTracker;
import android.view.View;
import android.view.ViewConfiguration;
import android.view.ViewParent;
import android.view.accessibility.AccessibilityEvent;
import android.view.accessibility.AccessibilityManager;

/**
 * Helper for accessing features in {@link ViewParent}
 * introduced after API level 4 in a backwards compatible fashion.
 */
public class ViewParentCompat {

    interface ViewParentCompatImpl {
        public boolean requestSendAccessibilityEvent(
                ViewParent parent, View child, AccessibilityEvent event);
        boolean onStartNestedScroll(ViewParent parent, View child, View target,
                int nestedScrollAxes);
        void onNestedScrollAccepted(ViewParent parent, View child, View target,
                int nestedScrollAxes);
        void onStopNestedScroll(ViewParent parent, View target);
        void onNestedScroll(ViewParent parent, View target, int dxConsumed, int dyConsumed,
                int dxUnconsumed, int dyUnconsumed);
        void onNestedPreScroll(ViewParent parent, View target, int dx, int dy, int[] consumed);
        boolean onNestedFling(ViewParent parent, View target, float velocityX, float velocityY,
                boolean consumed);
        boolean onNestedPreFling(ViewParent parent, View target, float velocityX, float velocityY);
        void notifySubtreeAccessibilityStateChanged(ViewParent parent, View child,
                View source, int changeType);
    }

    static class ViewParentCompatStubImpl implements ViewParentCompatImpl {
        @Override
        public boolean requestSendAccessibilityEvent(
                ViewParent parent, View child, AccessibilityEvent event) {
            // Emulate what ViewRootImpl does in ICS and above.
            if (child == null) {
                return false;
            }
            final AccessibilityManager manager = (AccessibilityManager) child.getContext()
                    .getSystemService(Context.ACCESSIBILITY_SERVICE);
            manager.sendAccessibilityEvent(event);
            return true;
        }

        @Override
        public boolean onStartNestedScroll(ViewParent parent, View child, View target,
                int nestedScrollAxes) {
            if (parent instanceof NestedScrollingParent) {
                return ((NestedScrollingParent) parent).onStartNestedScroll(child, target,
                        nestedScrollAxes);
            }
            return false;
        }

        @Override
        public void onNestedScrollAccepted(ViewParent parent, View child, View target,
                int nestedScrollAxes) {
            if (parent instanceof NestedScrollingParent) {
                ((NestedScrollingParent) parent).onNestedScrollAccepted(child, target,
                        nestedScrollAxes);
            }
        }

        @Override
        public void onStopNestedScroll(ViewParent parent, View target) {
            if (parent instanceof NestedScrollingParent) {
                ((NestedScrollingParent) parent).onStopNestedScroll(target);
            }
        }

        @Override
        public void onNestedScroll(ViewParent parent, View target, int dxConsumed, int dyConsumed,
                int dxUnconsumed, int dyUnconsumed) {
            if (parent instanceof NestedScrollingParent) {
                ((NestedScrollingParent) parent).onNestedScroll(target, dxConsumed, dyConsumed,
                        dxUnconsumed, dyUnconsumed);
            }
        }

        @Override
        public void onNestedPreScroll(ViewParent parent, View target, int dx, int dy,
                int[] consumed) {
            if (parent instanceof NestedScrollingParent) {
                ((NestedScrollingParent) parent).onNestedPreScroll(target, dx, dy, consumed);
            }
        }

        @Override
        public boolean onNestedFling(ViewParent parent, View target, float velocityX,
                float velocityY, boolean consumed) {
            if (parent instanceof NestedScrollingParent) {
                return ((NestedScrollingParent) parent).onNestedFling(target, velocityX, velocityY,
                        consumed);
            }
            return false;
        }

        @Override
        public boolean onNestedPreFling(ViewParent parent, View target, float velocityX,
                float velocityY) {
            if (parent instanceof NestedScrollingParent) {
                return ((NestedScrollingParent) parent).onNestedPreFling(target, velocityX,
                        velocityY);
            }
            return false;
        }

        @Override
        public void notifySubtreeAccessibilityStateChanged(ViewParent parent, View child,
                View source, int changeType) {
        }
    }

    static class ViewParentCompatICSImpl extends ViewParentCompatStubImpl {
        @Override
        public boolean requestSendAccessibilityEvent(
                ViewParent parent, View child, AccessibilityEvent event) {
            return ViewParentCompatICS.requestSendAccessibilityEvent(parent, child, event);
        }
    }

    static class ViewParentCompatKitKatImpl extends ViewParentCompatICSImpl {

        @Override
        public void notifySubtreeAccessibilityStateChanged(ViewParent parent, View child,
                View source, int changeType) {
            ViewParentCompatKitKat.notifySubtreeAccessibilityStateChanged(parent, child,
                    source, changeType);
        }
    }

    static class ViewParentCompatLollipopImpl extends ViewParentCompatKitKatImpl {
        @Override
        public boolean onStartNestedScroll(ViewParent parent, View child, View target,
                int nestedScrollAxes) {
            return ViewParentCompatLollipop.onStartNestedScroll(parent, child, target,
                    nestedScrollAxes);
        }

        @Override
        public void onNestedScrollAccepted(ViewParent parent, View child, View target,
                int nestedScrollAxes) {
            ViewParentCompatLollipop.onNestedScrollAccepted(parent, child, target,
                    nestedScrollAxes);
        }

        @Override
        public void onStopNestedScroll(ViewParent parent, View target) {
            ViewParentCompatLollipop.onStopNestedScroll(parent, target);
        }

        @Override
        public void onNestedScroll(ViewParent parent, View target, int dxConsumed, int dyConsumed,
                int dxUnconsumed, int dyUnconsumed) {
            ViewParentCompatLollipop.onNestedScroll(parent, target, dxConsumed, dyConsumed,
                    dxUnconsumed, dyUnconsumed);
        }

        @Override
        public void onNestedPreScroll(ViewParent parent, View target, int dx, int dy,
                int[] consumed) {
            ViewParentCompatLollipop.onNestedPreScroll(parent, target, dx, dy, consumed);
        }

        @Override
        public boolean onNestedFling(ViewParent parent, View target, float velocityX,
                float velocityY, boolean consumed) {
            return ViewParentCompatLollipop.onNestedFling(parent, target, velocityX, velocityY,
                    consumed);
        }

        @Override
        public boolean onNestedPreFling(ViewParent parent, View target, float velocityX,
                float velocityY) {
            return ViewParentCompatLollipop.onNestedPreFling(parent, target, velocityX, velocityY);
        }
    }

    static final ViewParentCompatImpl IMPL;
    static {
        final int version = Build.VERSION.SDK_INT;
        if (version >= 21) {
            IMPL = new ViewParentCompatLollipopImpl();
        } else if (version >= 19) {
            IMPL = new ViewParentCompatKitKatImpl();
        } else if (version >= 14) {
            IMPL = new ViewParentCompatICSImpl();
        } else {
            IMPL = new ViewParentCompatStubImpl();
        }
    }

    /*
     * Hide the constructor.
     */
    private ViewParentCompat() {

    }

    /**
     * Called by a child to request from its parent to send an {@link AccessibilityEvent}.
     * The child has already populated a record for itself in the event and is delegating
     * to its parent to send the event. The parent can optionally add a record for itself.
     * <p>
     * Note: An accessibility event is fired by an individual view which populates the
     *       event with a record for its state and requests from its parent to perform
     *       the sending. The parent can optionally add a record for itself before
     *       dispatching the request to its parent. A parent can also choose not to
     *       respect the request for sending the event. The accessibility event is sent
     *       by the topmost view in the view tree.</p>
     *
     * @param parent The parent whose method to invoke.
     * @param child The child which requests sending the event.
     * @param event The event to be sent.
     * @return True if the event was sent.
     */
    public static boolean requestSendAccessibilityEvent(
            ViewParent parent, View child, AccessibilityEvent event) {
        return IMPL.requestSendAccessibilityEvent(parent, child, event);
    }

    /**
     * React to a descendant view initiating a nestable scroll operation, claiming the
     * nested scroll operation if appropriate.
     *
     * <p>This method will be called in response to a descendant view invoking
     * {@link ViewCompat#startNestedScroll(View, int)}. Each parent up the view hierarchy will be
     * given an opportunity to respond and claim the nested scrolling operation by returning
     * <code>true</code>.</p>
     *
     * <p>This method may be overridden by ViewParent implementations to indicate when the view
     * is willing to support a nested scrolling operation that is about to begin. If it returns
     * true, this ViewParent will become the target view's nested scrolling parent for the duration
     * of the scroll operation in progress. When the nested scroll is finished this ViewParent
     * will receive a call to {@link #onStopNestedScroll(ViewParent, View)}.
     * </p>
     *
     * @param child Direct child of this ViewParent containing target
     * @param target View that initiated the nested scroll
     * @param nestedScrollAxes Flags consisting of {@link ViewCompat#SCROLL_AXIS_HORIZONTAL},
     *                         {@link ViewCompat#SCROLL_AXIS_VERTICAL} or both
     * @return true if this ViewParent accepts the nested scroll operation
     */
    public static boolean onStartNestedScroll(ViewParent parent, View child, View target,
            int nestedScrollAxes) {
        return IMPL.onStartNestedScroll(parent, child, target, nestedScrollAxes);
    }

    /**
     * React to the successful claiming of a nested scroll operation.
     *
     * <p>This method will be called after
     * {@link #onStartNestedScroll(ViewParent, View, View, int) onStartNestedScroll} returns true.
     * It offers an opportunity for the view and its superclasses to perform initial configuration
     * for the nested scroll. Implementations of this method should always call their superclass's
     * implementation of this method if one is present.</p>
     *
     * @param child Direct child of this ViewParent containing target
     * @param target View that initiated the nested scroll
     * @param nestedScrollAxes Flags consisting of {@link ViewCompat#SCROLL_AXIS_HORIZONTAL},
     *                         {@link ViewCompat#SCROLL_AXIS_VERTICAL} or both
     * @see #onStartNestedScroll(ViewParent, View, View, int)
     * @see #onStopNestedScroll(ViewParent, View)
     */
    public static void onNestedScrollAccepted(ViewParent parent, View child, View target,
            int nestedScrollAxes) {
        IMPL.onNestedScrollAccepted(parent, child, target, nestedScrollAxes);
    }

    /**
     * React to a nested scroll operation ending.
     *
     * <p>Perform cleanup after a nested scrolling operation.
     * This method will be called when a nested scroll stops, for example when a nested touch
     * scroll ends with a {@link MotionEvent#ACTION_UP} or {@link MotionEvent#ACTION_CANCEL} event.
     * Implementations of this method should always call their superclass's implementation of this
     * method if one is present.</p>
     *
     * @param target View that initiated the nested scroll
     */
    public static void onStopNestedScroll(ViewParent parent, View target) {
        IMPL.onStopNestedScroll(parent, target);
    }

    /**
     * React to a nested scroll in progress.
     *
     * <p>This method will be called when the ViewParent's current nested scrolling child view
     * dispatches a nested scroll event. To receive calls to this method the ViewParent must have
     * previously returned <code>true</code> for a call to
     * {@link #onStartNestedScroll(ViewParent, View, View, int)}.</p>
     *
     * <p>Both the consumed and unconsumed portions of the scroll distance are reported to the
     * ViewParent. An implementation may choose to use the consumed portion to match or chase scroll
     * position of multiple child elements, for example. The unconsumed portion may be used to
     * allow continuous dragging of multiple scrolling or draggable elements, such as scrolling
     * a list within a vertical drawer where the drawer begins dragging once the edge of inner
     * scrolling content is reached.</p>
     *
     * @param target The descendent view controlling the nested scroll
     * @param dxConsumed Horizontal scroll distance in pixels already consumed by target
     * @param dyConsumed Vertical scroll distance in pixels already consumed by target
     * @param dxUnconsumed Horizontal scroll distance in pixels not consumed by target
     * @param dyUnconsumed Vertical scroll distance in pixels not consumed by target
     */
    public static void onNestedScroll(ViewParent parent, View target, int dxConsumed,
            int dyConsumed, int dxUnconsumed, int dyUnconsumed) {
        IMPL.onNestedScroll(parent, target, dxConsumed, dyConsumed, dxUnconsumed, dyUnconsumed);
    }

    /**
     * React to a nested scroll in progress before the target view consumes a portion of the scroll.
     *
     * <p>When working with nested scrolling often the parent view may want an opportunity
     * to consume the scroll before the nested scrolling child does. An example of this is a
     * drawer that contains a scrollable list. The user will want to be able to scroll the list
     * fully into view before the list itself begins scrolling.</p>
     *
     * <p><code>onNestedPreScroll</code> is called when a nested scrolling child invokes
     * {@link ViewCompat#dispatchNestedPreScroll(View, int, int, int[], int[])}. The implementation
     * should report how any pixels of the scroll reported by dx, dy were consumed in the
     * <code>consumed</code> array. Index 0 corresponds to dx and index 1 corresponds to dy.
     * This parameter will never be null. Initial values for consumed[0] and consumed[1]
     * will always be 0.</p>
     *
     * @param target View that initiated the nested scroll
     * @param dx Horizontal scroll distance in pixels
     * @param dy Vertical scroll distance in pixels
     * @param consumed Output. The horizontal and vertical scroll distance consumed by this parent
     */
    public static void onNestedPreScroll(ViewParent parent, View target, int dx, int dy,
            int[] consumed) {
        IMPL.onNestedPreScroll(parent, target, dx, dy, consumed);
    }

    /**
     * Request a fling from a nested scroll.
     *
     * <p>This method signifies that a nested scrolling child has detected suitable conditions
     * for a fling. Generally this means that a touch scroll has ended with a
     * {@link VelocityTracker velocity} in the direction of scrolling that meets or exceeds
     * the {@link ViewConfiguration#getScaledMinimumFlingVelocity() minimum fling velocity}
     * along a scrollable axis.</p>
     *
     * <p>If a nested scrolling child view would normally fling but it is at the edge of
     * its own content, it can use this method to delegate the fling to its nested scrolling
     * parent instead. The parent may optionally consume the fling or observe a child fling.</p>
     *
     * @param target View that initiated the nested scroll
     * @param velocityX Horizontal velocity in pixels per second
     * @param velocityY Vertical velocity in pixels per second
     * @param consumed true if the child consumed the fling, false otherwise
     * @return true if this parent consumed or otherwise reacted to the fling
     */
    public static boolean onNestedFling(ViewParent parent, View target, float velocityX,
            float velocityY, boolean consumed) {
        return IMPL.onNestedFling(parent, target, velocityX, velocityY, consumed);
    }

    /**
     * React to a nested fling before the target view consumes it.
     *
     * <p>This method siginfies that a nested scrolling child has detected a fling with the given
     * velocity along each axis. Generally this means that a touch scroll has ended with a
     * {@link VelocityTracker velocity} in the direction of scrolling that meets or exceeds
     * the {@link ViewConfiguration#getScaledMinimumFlingVelocity() minimum fling velocity}
     * along a scrollable axis.</p>
     *
     * <p>If a nested scrolling parent is consuming motion as part of a
     * {@link #onNestedPreScroll(ViewParent, View, int, int, int[]) pre-scroll}, it may be
     * appropriate for it to also consume the pre-fling to complete that same motion. By returning
     * <code>true</code> from this method, the parent indicates that the child should not
     * fling its own internal content as well.</p>
     *
     * @param target View that initiated the nested scroll
     * @param velocityX Horizontal velocity in pixels per second
     * @param velocityY Vertical velocity in pixels per second
     * @return true if this parent consumed the fling ahead of the target view
     */
    public static boolean onNestedPreFling(ViewParent parent, View target, float velocityX,
            float velocityY) {
        return IMPL.onNestedPreFling(parent, target, velocityX, velocityY);
    }

    /**
     * Notifies a view parent that the accessibility state of one of its
     * descendants has changed and that the structure of the subtree is
     * different.
     * @param child The direct child whose subtree has changed.
     * @param source The descendant view that changed.
     * @param changeType A bit mask of the types of changes that occurred. One
     *            or more of:
     *            <ul>
     *            <li>{@link AccessibilityEvent#CONTENT_CHANGE_TYPE_CONTENT_DESCRIPTION}
     *            <li>{@link AccessibilityEvent#CONTENT_CHANGE_TYPE_SUBTREE}
     *            <li>{@link AccessibilityEvent#CONTENT_CHANGE_TYPE_TEXT}
     *            <li>{@link AccessibilityEvent#CONTENT_CHANGE_TYPE_UNDEFINED}
     *            </ul>
     */
    public static void notifySubtreeAccessibilityStateChanged(ViewParent parent, View child,
            View source, int changeType) {
        IMPL.notifySubtreeAccessibilityStateChanged(parent, child, source, changeType);
    }

}
