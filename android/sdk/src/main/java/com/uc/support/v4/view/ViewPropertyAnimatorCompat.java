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
import android.view.animation.Interpolator;

import java.lang.ref.WeakReference;
import java.util.WeakHashMap;

public class ViewPropertyAnimatorCompat {
    private static final String TAG = "ViewAnimatorCompat";
    private WeakReference<View> mView;
    private Runnable mStartAction = null;
    private Runnable mEndAction = null;
    private int mOldLayerType = -1;
    // HACK ALERT! Choosing this id knowing that the framework does not use it anywhere
    // internally and apps should use ids higher than it
    static final int LISTENER_TAG_ID = 0x7e000000;


    ViewPropertyAnimatorCompat(View view) {
        mView = new WeakReference<View>(view);
    }

    interface ViewPropertyAnimatorCompatImpl {
        public void setDuration(ViewPropertyAnimatorCompat vpa, View view, long value);
        public long getDuration(ViewPropertyAnimatorCompat vpa, View view);
        public void setInterpolator(ViewPropertyAnimatorCompat vpa, View view, Interpolator value);
        public Interpolator getInterpolator(ViewPropertyAnimatorCompat vpa, View view);
        public void setStartDelay(ViewPropertyAnimatorCompat vpa, View view, long value);
        public long getStartDelay(ViewPropertyAnimatorCompat vpa, View view);
        public void alpha(ViewPropertyAnimatorCompat vpa, View view, float value);
        public void alphaBy(ViewPropertyAnimatorCompat vpa, View view, float value);
        public void rotation(ViewPropertyAnimatorCompat vpa, View view, float value);
        public void rotationBy(ViewPropertyAnimatorCompat vpa, View view, float value);
        public void rotationX(ViewPropertyAnimatorCompat vpa, View view, float value);
        public void rotationXBy(ViewPropertyAnimatorCompat vpa, View view, float value);
        public void rotationY(ViewPropertyAnimatorCompat vpa, View view, float value);
        public void rotationYBy(ViewPropertyAnimatorCompat vpa, View view, float value);
        public void scaleX(ViewPropertyAnimatorCompat vpa, View view, float value);
        public void scaleXBy(ViewPropertyAnimatorCompat vpa, View view, float value);
        public void scaleY(ViewPropertyAnimatorCompat vpa, View view, float value);
        public void scaleYBy(ViewPropertyAnimatorCompat vpa, View view, float value);
        public void cancel(ViewPropertyAnimatorCompat vpa, View view);
        public void x(ViewPropertyAnimatorCompat vpa, View view, float value);
        public void xBy(ViewPropertyAnimatorCompat vpa, View view, float value);
        public void y(ViewPropertyAnimatorCompat vpa, View view, float value);
        public void yBy(ViewPropertyAnimatorCompat vpa, View view, float value);
        public void z(ViewPropertyAnimatorCompat vpa, View view, float value);
        public void zBy(ViewPropertyAnimatorCompat vpa, View view, float value);
        public void translationX(ViewPropertyAnimatorCompat vpa, View view, float value);
        public void translationXBy(ViewPropertyAnimatorCompat vpa, View view, float value);
        public void translationY(ViewPropertyAnimatorCompat vpa, View view, float value);
        public void translationYBy(ViewPropertyAnimatorCompat vpa, View view, float value);
        public void translationZ(ViewPropertyAnimatorCompat vpa, View view, float value);
        public void translationZBy(ViewPropertyAnimatorCompat vpa, View view, float value);
        public void start(ViewPropertyAnimatorCompat vpa, View view);
        public void withLayer(ViewPropertyAnimatorCompat vpa, View view);
        public void withStartAction(ViewPropertyAnimatorCompat vpa, View view, Runnable runnable);
        public void withEndAction(ViewPropertyAnimatorCompat vpa, View view, Runnable runnable);
        public void setListener(ViewPropertyAnimatorCompat vpa, View view,
                ViewPropertyAnimatorListener listener);
        public void setUpdateListener(ViewPropertyAnimatorCompat vpa, View view,
                ViewPropertyAnimatorUpdateListener listener);
    };

    static class BaseViewPropertyAnimatorCompatImpl implements ViewPropertyAnimatorCompatImpl {
        WeakHashMap<View, Runnable> mStarterMap = null;

        @Override
        public void setDuration(ViewPropertyAnimatorCompat vpa, View view, long value) {
            // noop on versions prior to ICS
        }

        @Override
        public void alpha(ViewPropertyAnimatorCompat vpa, View view, float value) {
            // noop on versions prior to ICS
            postStartMessage(vpa, view);
        }

        @Override
        public void translationX(ViewPropertyAnimatorCompat vpa, View view, float value) {
            // noop on versions prior to ICS
            postStartMessage(vpa, view);
        }

        @Override
        public void translationY(ViewPropertyAnimatorCompat vpa, View view, float value) {
            // noop on versions prior to ICS
            postStartMessage(vpa, view);
        }

        @Override
        public void withEndAction(ViewPropertyAnimatorCompat vpa, View view, Runnable runnable) {
            vpa.mEndAction = runnable;
            postStartMessage(vpa, view);
        }

        @Override
        public long getDuration(ViewPropertyAnimatorCompat vpa, View view) {
            return 0;
        }

        @Override
        public void setInterpolator(ViewPropertyAnimatorCompat vpa, View view, Interpolator value) {
            // noop on versions prior to ICS
        }

        @Override
        public Interpolator getInterpolator(ViewPropertyAnimatorCompat vpa, View view) {
            return null;
        }

        @Override
        public void setStartDelay(ViewPropertyAnimatorCompat vpa, View view, long value) {
            // noop on versions prior to ICS
        }

        @Override
        public long getStartDelay(ViewPropertyAnimatorCompat vpa, View view) {
            return 0;
        }

        @Override
        public void alphaBy(ViewPropertyAnimatorCompat vpa, View view, float value) {
            // noop on versions prior to ICS
            postStartMessage(vpa, view);
        }

        @Override
        public void rotation(ViewPropertyAnimatorCompat vpa, View view, float value) {
            // noop on versions prior to ICS
            postStartMessage(vpa, view);
        }

        @Override
        public void rotationBy(ViewPropertyAnimatorCompat vpa, View view, float value) {
            // noop on versions prior to ICS
            postStartMessage(vpa, view);
        }

        @Override
        public void rotationX(ViewPropertyAnimatorCompat vpa, View view, float value) {
            // noop on versions prior to ICS
            postStartMessage(vpa, view);
        }

        @Override
        public void rotationXBy(ViewPropertyAnimatorCompat vpa, View view, float value) {
            // noop on versions prior to ICS
            postStartMessage(vpa, view);
        }

        @Override
        public void rotationY(ViewPropertyAnimatorCompat vpa, View view, float value) {
            // noop on versions prior to ICS
            postStartMessage(vpa, view);
        }

        @Override
        public void rotationYBy(ViewPropertyAnimatorCompat vpa, View view, float value) {
            // noop on versions prior to ICS
            postStartMessage(vpa, view);
        }

        @Override
        public void scaleX(ViewPropertyAnimatorCompat vpa, View view, float value) {
            // noop on versions prior to ICS
            postStartMessage(vpa, view);
        }

        @Override
        public void scaleXBy(ViewPropertyAnimatorCompat vpa, View view, float value) {
            // noop on versions prior to ICS
            postStartMessage(vpa, view);
        }

        @Override
        public void scaleY(ViewPropertyAnimatorCompat vpa, View view, float value) {
            // noop on versions prior to ICS
            postStartMessage(vpa, view);
        }

        @Override
        public void scaleYBy(ViewPropertyAnimatorCompat vpa, View view, float value) {
            // noop on versions prior to ICS
            postStartMessage(vpa, view);
        }

        @Override
        public void cancel(ViewPropertyAnimatorCompat vpa, View view) {
            // noop on versions prior to ICS
            postStartMessage(vpa, view);
        }

        @Override
        public void x(ViewPropertyAnimatorCompat vpa, View view, float value) {
            // noop on versions prior to ICS
            postStartMessage(vpa, view);
        }

        @Override
        public void xBy(ViewPropertyAnimatorCompat vpa, View view, float value) {
            // noop on versions prior to ICS
            postStartMessage(vpa, view);
        }

        @Override
        public void y(ViewPropertyAnimatorCompat vpa, View view, float value) {
            // noop on versions prior to ICS
            postStartMessage(vpa, view);
        }

        @Override
        public void yBy(ViewPropertyAnimatorCompat vpa, View view, float value) {
            // noop on versions prior to ICS
            postStartMessage(vpa, view);
        }

        @Override
        public void z(ViewPropertyAnimatorCompat vpa, View view, float value) {
            // noop on versions prior to Lollipop
        }

        @Override
        public void zBy(ViewPropertyAnimatorCompat vpa, View view, float value) {
            // noop on versions prior to Lollipop
        }

        @Override
        public void translationXBy(ViewPropertyAnimatorCompat vpa, View view, float value) {
            // noop on versions prior to ICS
            postStartMessage(vpa, view);
        }

        @Override
        public void translationYBy(ViewPropertyAnimatorCompat vpa, View view, float value) {
            // noop on versions prior to ICS
            postStartMessage(vpa, view);
        }

        @Override
        public void translationZ(ViewPropertyAnimatorCompat vpa, View view, float value) {
            // noop on versions prior to Lollipop
        }

        @Override
        public void translationZBy(ViewPropertyAnimatorCompat vpa, View view, float value) {
            // noop on versions prior to Lollipop
        }

        @Override
        public void start(ViewPropertyAnimatorCompat vpa, View view) {
            removeStartMessage(view);
            startAnimation(vpa, view);
        }

        @Override
        public void withLayer(ViewPropertyAnimatorCompat vpa, View view) {
            // noop on versions prior to ICS
        }

        @Override
        public void withStartAction(ViewPropertyAnimatorCompat vpa, View view, Runnable runnable) {
            vpa.mStartAction = runnable;
            postStartMessage(vpa, view);
        }

        @Override
        public void setListener(ViewPropertyAnimatorCompat vpa, View view, ViewPropertyAnimatorListener listener) {
            view.setTag(LISTENER_TAG_ID, listener);
        }

        @Override
        public void setUpdateListener(ViewPropertyAnimatorCompat vpa, View view, ViewPropertyAnimatorUpdateListener listener) {
            // noop
        }

        private void startAnimation(ViewPropertyAnimatorCompat vpa, View view) {
            Object listenerTag = view.getTag(LISTENER_TAG_ID);
            ViewPropertyAnimatorListener listener = null;
            if (listenerTag instanceof ViewPropertyAnimatorListener) {
                listener = (ViewPropertyAnimatorListener) listenerTag;
            }
            Runnable startAction = vpa.mStartAction;
            Runnable endAction = vpa.mEndAction;
            if (startAction != null) {
                startAction.run();
            }
            if (listener != null) {
                listener.onAnimationStart(view);
                listener.onAnimationEnd(view);
            }
            if (endAction != null) {
                endAction.run();
            }
            if (mStarterMap != null) {
                mStarterMap.remove(view);
            }
        }

        class Starter implements Runnable {
            WeakReference<View> mViewRef;
            ViewPropertyAnimatorCompat mVpa;

            private Starter(ViewPropertyAnimatorCompat vpa, View view) {
                mViewRef = new WeakReference<View>(view);
                mVpa = vpa;
            }

            @Override
            public void run() {
                final View view = mViewRef.get();
                if (view != null) {
                    startAnimation(mVpa, view);
                }
            }
        };

        private void removeStartMessage(View view) {
            Runnable starter = null;
            if (mStarterMap != null) {
                starter = mStarterMap.get(view);
                if (starter != null) {
                    view.removeCallbacks(starter);
                }
            }
        }

        private void postStartMessage(ViewPropertyAnimatorCompat vpa, View view) {
            Runnable starter = null;
            if (mStarterMap != null) {
                starter = mStarterMap.get(view);
            }
            if (starter == null) {
                starter = new Starter(vpa, view);
                if (mStarterMap == null) {
                    mStarterMap = new WeakHashMap<View, Runnable>();
                }
                mStarterMap.put(view, starter);
            }
            view.removeCallbacks(starter);
            view.post(starter);
        }

    }

    static class ICSViewPropertyAnimatorCompatImpl extends BaseViewPropertyAnimatorCompatImpl {
        WeakHashMap<View, Integer> mLayerMap = null;

        @Override
        public void setDuration(ViewPropertyAnimatorCompat vpa, View view, long value) {
            ViewPropertyAnimatorCompatICS.setDuration(view, value);
        }

        @Override
        public void alpha(ViewPropertyAnimatorCompat vpa, View view, float value) {
            ViewPropertyAnimatorCompatICS.alpha(view, value);
        }

        @Override
        public void translationX(ViewPropertyAnimatorCompat vpa, View view, float value) {
            ViewPropertyAnimatorCompatICS.translationX(view, value);
        }

        @Override
        public void translationY(ViewPropertyAnimatorCompat vpa, View view, float value) {
            ViewPropertyAnimatorCompatICS.translationY(view, value);
        }

        @Override
        public long getDuration(ViewPropertyAnimatorCompat vpa, View view) {
            return ViewPropertyAnimatorCompatICS.getDuration(view);
        }

        @Override
        public void setInterpolator(ViewPropertyAnimatorCompat vpa, View view, Interpolator value) {
            ViewPropertyAnimatorCompatICS.setInterpolator(view, value);
        }

        @Override
        public void setStartDelay(ViewPropertyAnimatorCompat vpa, View view, long value) {
            ViewPropertyAnimatorCompatICS.setStartDelay(view, value);
        }

        @Override
        public long getStartDelay(ViewPropertyAnimatorCompat vpa, View view) {
            return ViewPropertyAnimatorCompatICS.getStartDelay(view);
        }

        @Override
        public void alphaBy(ViewPropertyAnimatorCompat vpa, View view, float value) {
            ViewPropertyAnimatorCompatICS.alphaBy(view, value);
        }

        @Override
        public void rotation(ViewPropertyAnimatorCompat vpa, View view, float value) {
            ViewPropertyAnimatorCompatICS.rotation(view, value);
        }

        @Override
        public void rotationBy(ViewPropertyAnimatorCompat vpa, View view, float value) {
            ViewPropertyAnimatorCompatICS.rotationBy(view, value);
        }

        @Override
        public void rotationX(ViewPropertyAnimatorCompat vpa, View view, float value) {
            ViewPropertyAnimatorCompatICS.rotationX(view, value);
        }

        @Override
        public void rotationXBy(ViewPropertyAnimatorCompat vpa, View view, float value) {
            ViewPropertyAnimatorCompatICS.rotationXBy(view, value);
        }

        @Override
        public void rotationY(ViewPropertyAnimatorCompat vpa, View view, float value) {
            ViewPropertyAnimatorCompatICS.rotationY(view, value);
        }

        @Override
        public void rotationYBy(ViewPropertyAnimatorCompat vpa, View view, float value) {
            ViewPropertyAnimatorCompatICS.rotationYBy(view, value);
        }

        @Override
        public void scaleX(ViewPropertyAnimatorCompat vpa, View view, float value) {
            ViewPropertyAnimatorCompatICS.scaleX(view, value);
        }

        @Override
        public void scaleXBy(ViewPropertyAnimatorCompat vpa, View view, float value) {
            ViewPropertyAnimatorCompatICS.scaleXBy(view, value);
        }

        @Override
        public void scaleY(ViewPropertyAnimatorCompat vpa, View view, float value) {
            ViewPropertyAnimatorCompatICS.scaleY(view, value);
        }

        @Override
        public void scaleYBy(ViewPropertyAnimatorCompat vpa, View view, float value) {
            ViewPropertyAnimatorCompatICS.scaleYBy(view, value);
        }

        @Override
        public void cancel(ViewPropertyAnimatorCompat vpa, View view) {
            ViewPropertyAnimatorCompatICS.cancel(view);
        }

        @Override
        public void x(ViewPropertyAnimatorCompat vpa, View view, float value) {
            ViewPropertyAnimatorCompatICS.x(view, value);
        }

        @Override
        public void xBy(ViewPropertyAnimatorCompat vpa, View view, float value) {
            ViewPropertyAnimatorCompatICS.xBy(view, value);
        }

        @Override
        public void y(ViewPropertyAnimatorCompat vpa, View view, float value) {
            ViewPropertyAnimatorCompatICS.y(view, value);
        }

        @Override
        public void yBy(ViewPropertyAnimatorCompat vpa, View view, float value) {
            ViewPropertyAnimatorCompatICS.yBy(view, value);
        }

        @Override
        public void translationXBy(ViewPropertyAnimatorCompat vpa, View view, float value) {
            ViewPropertyAnimatorCompatICS.translationXBy(view, value);
        }

        @Override
        public void translationYBy(ViewPropertyAnimatorCompat vpa, View view, float value) {
            ViewPropertyAnimatorCompatICS.translationYBy(view, value);
        }

        @Override
        public void start(ViewPropertyAnimatorCompat vpa, View view) {
            ViewPropertyAnimatorCompatICS.start(view);
        }

        @Override
        public void setListener(ViewPropertyAnimatorCompat vpa, View view, ViewPropertyAnimatorListener listener) {
            view.setTag(LISTENER_TAG_ID, listener);
            ViewPropertyAnimatorCompatICS.setListener(view, new MyVpaListener(vpa));
        }

        @Override
        public void withEndAction(ViewPropertyAnimatorCompat vpa, View view, final Runnable runnable) {
            ViewPropertyAnimatorCompatICS.setListener(view, new MyVpaListener(vpa));
            vpa.mEndAction = runnable;
        }

        @Override
        public void withStartAction(ViewPropertyAnimatorCompat vpa, View view, final Runnable runnable) {
            ViewPropertyAnimatorCompatICS.setListener(view, new MyVpaListener(vpa));
            vpa.mStartAction = runnable;
        }

        @Override
        public void withLayer(ViewPropertyAnimatorCompat vpa, View view) {
            vpa.mOldLayerType = ViewCompat.getLayerType(view);
            ViewPropertyAnimatorCompatICS.setListener(view, new MyVpaListener(vpa));
        }

        static class MyVpaListener implements ViewPropertyAnimatorListener {

            ViewPropertyAnimatorCompat mVpa;

            MyVpaListener(ViewPropertyAnimatorCompat vpa) {
                mVpa = vpa;
            }

            @Override
            public void onAnimationStart(View view) {
                if (mVpa.mOldLayerType >= 0) {
                    ViewCompat.setLayerType(view, ViewCompat.LAYER_TYPE_HARDWARE, null);
                }
                if (mVpa.mStartAction != null) {
                    mVpa.mStartAction.run();
                }
                Object listenerTag = view.getTag(LISTENER_TAG_ID);
                ViewPropertyAnimatorListener listener = null;
                if (listenerTag instanceof ViewPropertyAnimatorListener) {
                    listener = (ViewPropertyAnimatorListener) listenerTag;
                }
                if (listener != null) {
                    listener.onAnimationStart(view);
                }
            }

            @Override
            public void onAnimationEnd(View view) {
                if (mVpa.mOldLayerType >= 0) {
                    ViewCompat.setLayerType(view, mVpa.mOldLayerType, null);
                    mVpa.mOldLayerType = -1;
                }
                if (mVpa.mEndAction != null) {
                    mVpa.mEndAction.run();
                }
                Object listenerTag = view.getTag(LISTENER_TAG_ID);
                ViewPropertyAnimatorListener listener = null;
                if (listenerTag instanceof ViewPropertyAnimatorListener) {
                    listener = (ViewPropertyAnimatorListener) listenerTag;
                }
                if (listener != null) {
                    listener.onAnimationEnd(view);
                }
            }

            @Override
            public void onAnimationCancel(View view) {
                Object listenerTag = view.getTag(LISTENER_TAG_ID);
                ViewPropertyAnimatorListener listener = null;
                if (listenerTag instanceof ViewPropertyAnimatorListener) {
                    listener = (ViewPropertyAnimatorListener) listenerTag;
                }
                if (listener != null) {
                    listener.onAnimationCancel(view);
                }
            }
        };
    }

    static class JBViewPropertyAnimatorCompatImpl extends ICSViewPropertyAnimatorCompatImpl {

        @Override
        public void setListener(ViewPropertyAnimatorCompat vpa, View view, ViewPropertyAnimatorListener listener) {
            ViewPropertyAnimatorCompatJB.setListener(view, listener);
        }

        @Override
        public void withStartAction(ViewPropertyAnimatorCompat vpa, View view, Runnable runnable) {
            ViewPropertyAnimatorCompatJB.withStartAction(view, runnable);
        }

        @Override
        public void withEndAction(ViewPropertyAnimatorCompat vpa, View view, Runnable runnable) {
            ViewPropertyAnimatorCompatJB.withEndAction(view, runnable);
        }

        @Override
        public void withLayer(ViewPropertyAnimatorCompat vpa, View view) {
            ViewPropertyAnimatorCompatJB.withLayer(view);
        }
    }

    static class JBMr2ViewPropertyAnimatorCompatImpl extends JBViewPropertyAnimatorCompatImpl {

        @Override
        public Interpolator getInterpolator(ViewPropertyAnimatorCompat vpa, View view) {
            return (Interpolator) ViewPropertyAnimatorCompatJellybeanMr2.getInterpolator(view);
        }
    }

    static class KitKatViewPropertyAnimatorCompatImpl extends JBMr2ViewPropertyAnimatorCompatImpl {
        @Override
        public void setUpdateListener(ViewPropertyAnimatorCompat vpa, View view, ViewPropertyAnimatorUpdateListener listener) {
            ViewPropertyAnimatorCompatKK.setUpdateListener(view, listener);
        }
    }

    static class LollipopViewPropertyAnimatorCompatImpl extends KitKatViewPropertyAnimatorCompatImpl {
        @Override
        public void translationZ(ViewPropertyAnimatorCompat vpa, View view, float value) {
            ViewPropertyAnimatorCompatLollipop.translationZ(view, value);
        }

        @Override
        public void translationZBy(ViewPropertyAnimatorCompat vpa, View view, float value) {
            ViewPropertyAnimatorCompatLollipop.translationZBy(view, value);
        }

        @Override
        public void z(ViewPropertyAnimatorCompat vpa, View view, float value) {
            ViewPropertyAnimatorCompatLollipop.z(view, value);
        }

        @Override
        public void zBy(ViewPropertyAnimatorCompat vpa, View view, float value) {
            ViewPropertyAnimatorCompatLollipop.zBy(view, value);
        }
    }

    static final ViewPropertyAnimatorCompatImpl IMPL;
    static {
        final int version = android.os.Build.VERSION.SDK_INT;
        if (version >= 21) {
            IMPL = new LollipopViewPropertyAnimatorCompatImpl();
        } else if (version >= 19) {
            IMPL = new KitKatViewPropertyAnimatorCompatImpl();
        } else if (version >= 18) {
            IMPL = new JBMr2ViewPropertyAnimatorCompatImpl();
        } else if (version >= 16) {
            IMPL = new JBViewPropertyAnimatorCompatImpl();
        } else if (version >= 14) {
            IMPL = new ICSViewPropertyAnimatorCompatImpl();
        } else {
            IMPL = new BaseViewPropertyAnimatorCompatImpl();
        }
    }

    /**
     * Sets the duration for the underlying animator that animates the requested properties.
     * By default, the animator uses the default value for ValueAnimator. Calling this method
     * will cause the declared value to be used instead.
     *
     * <p>Prior to API 14, this method will do nothing.</p>
     *
     * @param value The length of ensuing property animations, in milliseconds. The value
     * cannot be negative.
     * @return This object, allowing calls to methods in this class to be chained.
     */
    public ViewPropertyAnimatorCompat setDuration(long value) {
        View view;
        if ((view = mView.get()) != null) {
            IMPL.setDuration(this, view, value);
        }
        return this;
    }

    /**
     * This method will cause the View's <code>alpha</code> property to be animated to the
     * specified value. Animations already running on the property will be canceled.
     *
     * <p>Prior to API 14, this method will do nothing.</p>
     *
     * @param value The value to be animated to.
     * @return This object, allowing calls to methods in this class to be chained.
     */
    public ViewPropertyAnimatorCompat alpha(float value) {
        View view;
        if ((view = mView.get()) != null) {
            IMPL.alpha(this, view, value);
        }
        return this;
    }

    /**
     * This method will cause the View's <code>alpha</code> property to be animated by the
     * specified value. Animations already running on the property will be canceled.
     *
     * <p>Prior to API 14, this method will do nothing.</p>
     *
     * @param value The amount to be animated by, as an offset from the current value.
     * @return This object, allowing calls to methods in this class to be chained.
     */
    public ViewPropertyAnimatorCompat alphaBy(float value) {
        View view;
        if ((view = mView.get()) != null) {
            IMPL.alphaBy(this, view, value);
        }
        return this;
    }

    /**
     * This method will cause the View's <code>translationX</code> property to be animated to the
     * specified value. Animations already running on the property will be canceled.
     *
     * <p>Prior to API 14, this method will do nothing.</p>
     *
     * @param value The value to be animated to.
     * @return This object, allowing calls to methods in this class to be chained.
     */
    public ViewPropertyAnimatorCompat translationX(float value) {
        View view;
        if ((view = mView.get()) != null) {
            IMPL.translationX(this, view, value);
        }
        return this;
    }

    /**
     * This method will cause the View's <code>translationY</code> property to be animated to the
     * specified value. Animations already running on the property will be canceled.
     *
     * <p>Prior to API 14, this method will do nothing.</p>
     *
     * @param value The value to be animated to.
     * @return This object, allowing calls to methods in this class to be chained.
     */
    public ViewPropertyAnimatorCompat translationY(float value) {
        View view;
        if ((view = mView.get()) != null) {
            IMPL.translationY(this, view, value);
        }
        return this;
    }

    /**
     * Specifies an action to take place when the next animation ends. The action is only
     * run if the animation ends normally; if the ViewPropertyAnimator is canceled during
     * that animation, the runnable will not run.
     * This method, along with {@link #withStartAction(Runnable)}, is intended to help facilitate
     * choreographing ViewPropertyAnimator animations with other animations or actions
     * in the application.
     *
     * <p>For example, the following code animates a view to x=200 and then back to 0:</p>
     * <pre>
     *     Runnable endAction = new Runnable() {
     *         public void run() {
     *             view.animate().x(0);
     *         }
     *     };
     *     view.animate().x(200).withEndAction(endAction);
     * </pre>
     *
     * <p>Prior to API 14, this method will run the action immediately.</p>
     *
     * <p>For API 14 and 15, this method will run by setting
     * a listener on the ViewPropertyAnimatorCompat object and running the action
     * in that listener's {@link ViewPropertyAnimatorListener#onAnimationEnd(View)} method.</p>
     *
     * @param runnable The action to run when the next animation ends.
     * @return This object, allowing calls to methods in this class to be chained.
     */
    public ViewPropertyAnimatorCompat withEndAction(Runnable runnable) {
        View view;
        if ((view = mView.get()) != null) {
            IMPL.withEndAction(this, view, runnable);
        }
        return this;
    }

    /**
     * Returns the current duration of property animations. If the duration was set on this
     * object, that value is returned. Otherwise, the default value of the underlying Animator
     * is returned.
     *
     * <p>Prior to API 14, this method will return 0.</p>
     *
     * @see #setDuration(long)
     * @return The duration of animations, in milliseconds.
     */
    public long getDuration() {
        View view;
        if ((view = mView.get()) != null) {
            return IMPL.getDuration(this, view);
        } else {
            return 0;
        }
    }

    /**
     * Sets the interpolator for the underlying animator that animates the requested properties.
     * By default, the animator uses the default interpolator for ValueAnimator. Calling this method
     * will cause the declared object to be used instead.
     *
     * <p>Prior to API 14, this method will do nothing.</p>
     *
     * @param value The TimeInterpolator to be used for ensuing property animations.
     * @return This object, allowing calls to methods in this class to be chained.
     */
    public ViewPropertyAnimatorCompat setInterpolator(Interpolator value) {
        View view;
        if ((view = mView.get()) != null) {
            IMPL.setInterpolator(this, view, value);
        }
        return this;
    }

    /**
     * Returns the timing interpolator that this animation uses.
     *
     * <p>Prior to API 14, this method will return null.</p>
     *
     * @return The timing interpolator for this animation.
     */
    public Interpolator getInterpolator() {
        View view;
        if ((view = mView.get()) != null) {
            return IMPL.getInterpolator(this, view);
        }
        else return null;
    }

    /**
     * Sets the startDelay for the underlying animator that animates the requested properties.
     * By default, the animator uses the default value for ValueAnimator. Calling this method
     * will cause the declared value to be used instead.
     *
     * <p>Prior to API 14, this method will do nothing.</p>
     *
     * @param value The delay of ensuing property animations, in milliseconds. The value
     * cannot be negative.
     * @return This object, allowing calls to methods in this class to be chained.
     */
    public ViewPropertyAnimatorCompat setStartDelay(long value) {
        View view;
        if ((view = mView.get()) != null) {
            IMPL.setStartDelay(this, view, value);
        }
        return this;
    }

    /**
     * Returns the current startDelay of property animations. If the startDelay was set on this
     * object, that value is returned. Otherwise, the default value of the underlying Animator
     * is returned.
     *
     * <p>Prior to API 14, this method will return 0.</p>
     *
     * @see #setStartDelay(long)
     * @return The startDelay of animations, in milliseconds.
     */
    public long getStartDelay() {
        View view;
        if ((view = mView.get()) != null) {
            return IMPL.getStartDelay(this, view);
        } else {
            return 0;
        }
    }

    /**
     * This method will cause the View's <code>rotation</code> property to be animated to the
     * specified value. Animations already running on the property will be canceled.
     *
     * <p>Prior to API 14, this method will do nothing.</p>
     *
     * @param value The value to be animated to.
     * @return This object, allowing calls to methods in this class to be chained.
     */
    public ViewPropertyAnimatorCompat rotation(float value) {
        View view;
        if ((view = mView.get()) != null) {
            IMPL.rotation(this, view, value);
        }
        return this;
    }

    /**
     * This method will cause the View's <code>rotation</code> property to be animated by the
     * specified value. Animations already running on the property will be canceled.
     *
     * <p>Prior to API 14, this method will do nothing.</p>
     *
     * @param value The amount to be animated by, as an offset from the current value.
     * @return This object, allowing calls to methods in this class to be chained.
     */
    public ViewPropertyAnimatorCompat rotationBy(float value) {
        View view;
        if ((view = mView.get()) != null) {
            IMPL.rotationBy(this, view, value);
        }
        return this;
    }

    /**
     * This method will cause the View's <code>rotationX</code> property to be animated to the
     * specified value. Animations already running on the property will be canceled.
     *
     * <p>Prior to API 14, this method will do nothing.</p>
     *
     * @param value The value to be animated to.
     * @return This object, allowing calls to methods in this class to be chained.
     */
    public ViewPropertyAnimatorCompat rotationX(float value) {
        View view;
        if ((view = mView.get()) != null) {
            IMPL.rotationX(this, view, value);
        }
        return this;
    }

    /**
     * This method will cause the View's <code>rotationX</code> property to be animated by the
     * specified value. Animations already running on the property will be canceled.
     *
     * <p>Prior to API 14, this method will do nothing.</p>
     *
     * @param value The amount to be animated by, as an offset from the current value.
     * @return This object, allowing calls to methods in this class to be chained.
     */
    public ViewPropertyAnimatorCompat rotationXBy(float value) {
        View view;
        if ((view = mView.get()) != null) {
            IMPL.rotationXBy(this, view, value);
        }
        return this;
    }

    /**
     * This method will cause the View's <code>rotationY</code> property to be animated to the
     * specified value. Animations already running on the property will be canceled.
     *
     * <p>Prior to API 14, this method will do nothing.</p>
     *
     * @param value The value to be animated to.
     * @return This object, allowing calls to methods in this class to be chained.
     */
    public ViewPropertyAnimatorCompat rotationY(float value) {
        View view;
        if ((view = mView.get()) != null) {
            IMPL.rotationY(this, view, value);
        }
        return this;
    }

    /**
     * This method will cause the View's <code>rotationY</code> property to be animated by the
     * specified value. Animations already running on the property will be canceled.
     *
     * <p>Prior to API 14, this method will do nothing.</p>
     *
     * @param value The amount to be animated by, as an offset from the current value.
     * @return This object, allowing calls to methods in this class to be chained.
     */
    public ViewPropertyAnimatorCompat rotationYBy(float value) {
        View view;
        if ((view = mView.get()) != null) {
            IMPL.rotationYBy(this, view, value);
        }
        return this;
    }

    /**
     * This method will cause the View's <code>scaleX</code> property to be animated to the
     * specified value. Animations already running on the property will be canceled.
     *
     * <p>Prior to API 14, this method will do nothing.</p>
     *
     * @param value The value to be animated to.
     * @return This object, allowing calls to methods in this class to be chained.
     */
    public ViewPropertyAnimatorCompat scaleX(float value) {
        View view;
        if ((view = mView.get()) != null) {
            IMPL.scaleX(this, view, value);
        }
        return this;
    }

    /**
     * This method will cause the View's <code>scaleX</code> property to be animated by the
     * specified value. Animations already running on the property will be canceled.
     *
     * <p>Prior to API 14, this method will do nothing.</p>
     *
     * @param value The amount to be animated by, as an offset from the current value.
     * @return This object, allowing calls to methods in this class to be chained.
     */
    public ViewPropertyAnimatorCompat scaleXBy(float value) {
        View view;
        if ((view = mView.get()) != null) {
            IMPL.scaleXBy(this, view, value);
        }
        return this;
    }

    /**
     * This method will cause the View's <code>scaleY</code> property to be animated to the
     * specified value. Animations already running on the property will be canceled.
     *
     * <p>Prior to API 14, this method will do nothing.</p>
     *
     * @param value The value to be animated to.
     * @return This object, allowing calls to methods in this class to be chained.
     */
    public ViewPropertyAnimatorCompat scaleY(float value) {
        View view;
        if ((view = mView.get()) != null) {
            IMPL.scaleY(this, view, value);
        }
        return this;
    }

    /**
     * This method will cause the View's <code>scaleY</code> property to be animated by the
     * specified value. Animations already running on the property will be canceled.
     *
     * <p>Prior to API 14, this method will do nothing.</p>
     *
     * @param value The amount to be animated by, as an offset from the current value.
     * @return This object, allowing calls to methods in this class to be chained.
     */
    public ViewPropertyAnimatorCompat scaleYBy(float value) {
        View view;
        if ((view = mView.get()) != null) {
            IMPL.scaleYBy(this, view, value);
        }
        return this;
    }

    /**
     * Cancels all property animations that are currently running or pending.
     */
    public void cancel() {
        View view;
        if ((view = mView.get()) != null) {
            IMPL.cancel(this, view);
        }
    }

    /**
     * This method will cause the View's <code>x</code> property to be animated to the
     * specified value. Animations already running on the property will be canceled.
     *
     * <p>Prior to API 14, this method will do nothing.</p>
     *
     * @param value The value to be animated to.
     * @return This object, allowing calls to methods in this class to be chained.
     */
    public ViewPropertyAnimatorCompat x(float value) {
        View view;
        if ((view = mView.get()) != null) {
            IMPL.x(this, view, value);
        }
        return this;
    }

    /**
     * This method will cause the View's <code>x</code> property to be animated by the
     * specified value. Animations already running on the property will be canceled.
     *
     * <p>Prior to API 14, this method will do nothing.</p>
     *
     * @param value The amount to be animated by, as an offset from the current value.
     * @return This object, allowing calls to methods in this class to be chained.
     */
    public ViewPropertyAnimatorCompat xBy(float value) {
        View view;
        if ((view = mView.get()) != null) {
            IMPL.xBy(this, view, value);
        }
        return this;
    }

    /**
     * This method will cause the View's <code>y</code> property to be animated to the
     * specified value. Animations already running on the property will be canceled.
     *
     * <p>Prior to API 14, this method will do nothing.</p>
     *
     * @param value The value to be animated to.
     * @return This object, allowing calls to methods in this class to be chained.
     */
    public ViewPropertyAnimatorCompat y(float value) {
        View view;
        if ((view = mView.get()) != null) {
            IMPL.y(this, view, value);
        }
        return this;
    }

    /**
     * This method will cause the View's <code>y</code> property to be animated by the
     * specified value. Animations already running on the property will be canceled.
     *
     * <p>Prior to API 14, this method will do nothing.</p>
     *
     * @param value The amount to be animated by, as an offset from the current value.
     * @return This object, allowing calls to methods in this class to be chained.
     */
    public ViewPropertyAnimatorCompat yBy(float value) {
        View view;
        if ((view = mView.get()) != null) {
            IMPL.yBy(this, view, value);
        }
        return this;
    }

    /**
     * This method will cause the View's <code>translationX</code> property to be animated by the
     * specified value. Animations already running on the property will be canceled.
     *
     * <p>Prior to API 14, this method will do nothing.</p>
     *
     * @param value The amount to be animated by, as an offset from the current value.
     * @return This object, allowing calls to methods in this class to be chained.
     */
    public ViewPropertyAnimatorCompat translationXBy(float value) {
        View view;
        if ((view = mView.get()) != null) {
            IMPL.translationXBy(this, view, value);
        }
        return this;
    }

    /**
     * This method will cause the View's <code>translationY</code> property to be animated by the
     * specified value. Animations already running on the property will be canceled.
     *
     * <p>Prior to API 14, this method will do nothing.</p>
     *
     * @param value The amount to be animated by, as an offset from the current value.
     * @return This object, allowing calls to methods in this class to be chained.
     */
    public ViewPropertyAnimatorCompat translationYBy(float value) {
        View view;
        if ((view = mView.get()) != null) {
            IMPL.translationYBy(this, view, value);
        }
        return this;
    }

    /**
     * This method will cause the View's <code>translationZ</code> property to be animated by the
     * specified value. Animations already running on the property will be canceled.
     *
     * <p>Prior to API 21, this method will do nothing.</p>
     *
     * @param value The amount to be animated by, as an offset from the current value.
     * @return This object, allowing calls to methods in this class to be chained.
     */
    public ViewPropertyAnimatorCompat translationZBy(float value) {
        View view;
        if ((view = mView.get()) != null) {
            IMPL.translationZBy(this, view, value);
        }
        return this;
    }

    /**
     * This method will cause the View's <code>translationZ</code> property to be animated to the
     * specified value. Animations already running on the property will be canceled.
     *
     * <p>Prior to API 21, this method will do nothing.</p>
     *
     * @param value The amount to be animated by, as an offset from the current value.
     * @return This object, allowing calls to methods in this class to be chained.
     */
    public ViewPropertyAnimatorCompat translationZ(float value) {
        View view;
        if ((view = mView.get()) != null) {
            IMPL.translationZ(this, view, value);
        }
        return this;
    }

    /**
     * This method will cause the View's <code>z</code> property to be animated to the
     * specified value. Animations already running on the property will be canceled.
     *
     * <p>Prior to API 21, this method will do nothing.</p>
     *
     * @param value The amount to be animated by, as an offset from the current value.
     * @return This object, allowing calls to methods in this class to be chained.
     */
    public ViewPropertyAnimatorCompat z(float value) {
        View view;
        if ((view = mView.get()) != null) {
            IMPL.z(this, view, value);
        }
        return this;
    }

    /**
     * This method will cause the View's <code>z</code> property to be animated by the
     * specified value. Animations already running on the property will be canceled.
     *
     * <p>Prior to API 21, this method will do nothing.</p>
     *
     * @param value The amount to be animated by, as an offset from the current value.
     * @return This object, allowing calls to methods in this class to be chained.
     */
    public ViewPropertyAnimatorCompat zBy(float value) {
        View view;
        if ((view = mView.get()) != null) {
            IMPL.zBy(this, view, value);
        }
        return this;
    }

    /**
     * Starts the currently pending property animations immediately. Calling <code>start()</code>
     * is optional because all animations start automatically at the next opportunity. However,
     * if the animations are needed to start immediately and synchronously (not at the time when
     * the next event is processed by the hierarchy, which is when the animations would begin
     * otherwise), then this method can be used.
     *
     * <p>Prior to API 14, this method will do nothing.</p>
     */
    public void start() {
        View view;
        if ((view = mView.get()) != null) {
            IMPL.start(this, view);
        }
    }

    /**
     * The View associated with this ViewPropertyAnimator will have its
     * {@link ViewCompat#setLayerType(View, int, android.graphics.Paint) layer type} set to
     * {@link ViewCompat#LAYER_TYPE_HARDWARE} for the duration of the next animation.
     * As stated in the documentation for {@link ViewCompat#LAYER_TYPE_HARDWARE},
     * the actual type of layer used internally depends on the runtime situation of the
     * view. If the activity and this view are hardware-accelerated, then the layer will be
     * accelerated as well. If the activity or the view is not accelerated, then the layer will
     * effectively be the same as {@link ViewCompat#LAYER_TYPE_SOFTWARE}.
     *
     * <p>This state is not persistent, either on the View or on this ViewPropertyAnimator: the
     * layer type of the View will be restored when the animation ends to what it was when this
     * method was called, and this setting on ViewPropertyAnimator is only valid for the next
     * animation. Note that calling this method and then independently setting the layer type of
     * the View (by a direct call to
     * {@link ViewCompat#setLayerType(View, int, android.graphics.Paint)}) will result in some
     * inconsistency, including having the layer type restored to its pre-withLayer()
     * value when the animation ends.</p>
     *
     * <p>Prior to API 14, this method will do nothing.</p>
     *
     * <p>For API 14 and 15, this method will run by setting
     * a listener on the ViewPropertyAnimatorCompat object, setting a hardware layer in
     * the listener's {@link ViewPropertyAnimatorListener#onAnimationStart(View)} method,
     * and then restoring the orignal layer type in the listener's
     * {@link ViewPropertyAnimatorListener#onAnimationEnd(View)} method.</p>
     *
     * @see View#setLayerType(int, android.graphics.Paint)
     * @return This object, allowing calls to methods in this class to be chained.
     */
    public ViewPropertyAnimatorCompat withLayer() {
        View view;
        if ((view = mView.get()) != null) {
            IMPL.withLayer(this, view);
        }
        return this;
    }

    /**
     * Specifies an action to take place when the next animation runs. If there is a
     * {@link #setStartDelay(long) startDelay} set on this ViewPropertyAnimator, then the
     * action will run after that startDelay expires, when the actual animation begins.
     * This method, along with {@link #withEndAction(Runnable)}, is intended to help facilitate
     * choreographing ViewPropertyAnimator animations with other animations or actions
     * in the application.
     *
     * <p>Prior to API 14, this method will run the action immediately.</p>
     *
     * <p>For API 14 and 15, this method will run by setting
     * a listener on the ViewPropertyAnimatorCompat object and running the action
     * in that listener's {@link ViewPropertyAnimatorListener#onAnimationStart(View)} method.</p>
     *
     * @param runnable The action to run when the next animation starts.
     * @return This object, allowing calls to methods in this class to be chained.
     */
    public ViewPropertyAnimatorCompat withStartAction(Runnable runnable) {
        View view;
        if ((view = mView.get()) != null) {
            IMPL.withStartAction(this, view, runnable);
        }
        return this;
    }

    /**
     * Sets a listener for events in the underlying Animators that run the property
     * animations.
     *
     * <p>Prior to API 14, this method will do nothing.</p>
     *
     * @param listener The listener to be called with AnimatorListener events. A value of
     * <code>null</code> removes any existing listener.
     * @return This object, allowing calls to methods in this class to be chained.
     */
    public ViewPropertyAnimatorCompat setListener(ViewPropertyAnimatorListener listener) {
        View view;
        if ((view = mView.get()) != null) {
            IMPL.setListener(this, view, listener);
        }
        return this;
    }

    /**
     * Sets a listener for update events in the underlying Animator that runs
     * the property animations.
     *
     * <p>Prior to API 19, this method will do nothing.</p>
     *
     * @param listener The listener to be called with update events. A value of
     * <code>null</code> removes any existing listener.
     * @return This object, allowing calls to methods in this class to be chained.
     */
    public ViewPropertyAnimatorCompat setUpdateListener(
            ViewPropertyAnimatorUpdateListener listener) {
        View view;
        if ((view = mView.get()) != null) {
            IMPL.setUpdateListener(this, view, listener);
        }
        return this;
    }
}
