/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.common.android;

import android.os.Handler;
import android.os.Looper;

import com.taobao.weex.devtools.common.UncheckedCallable;
import com.taobao.weex.devtools.common.Util;

public final class HandlerUtil {
  private HandlerUtil() {
  }

  /**
   * Checks whether the current thread is the same thread that the {@link Handler} is associated
   * with.
   * @return true if the current thread is the same thread that the {@link Handler} is associated
   * with; otherwise false.
   */
  public static boolean checkThreadAccess(Handler handler) {
    return Looper.myLooper() == handler.getLooper();
  }

  /**
   * Enforces that the current thread is the same thread that the {@link Handler} is associated
   * with.
   * @throws IllegalStateException if the current thread is not the same thread that the
   * {@link Handler} is associated with.
   */
  public static void verifyThreadAccess(Handler handler) {
    Util.throwIfNot(checkThreadAccess(handler));
  }

  /**
   * Synchronously executes an {@link UncheckedCallable} on the thread that this Handler is
   * associated with, and returns its result.
   * @param c the {@link UncheckedCallable} to execute
   * @param <V> the return type of the {@link UncheckedCallable}
   * @return the return value from {@link UncheckedCallable#call()}
   * @throws RuntimeException if the {@link UncheckedCallable} could not be executed (the cause
   * will be null), or if {@link UncheckedCallable#call()} threw an exception (the cause will be the
   * exception that it threw).
   */
  public static <V> V postAndWait(Handler handler, final UncheckedCallable<V> c) {
    if (checkThreadAccess(handler)) {
      try {
        return c.call();
      } catch (Exception e) {
        throw new RuntimeException(e);
      }
    }

    WaitableRunnable<V> wrapper = new WaitableRunnable<V>() {
      @Override
      protected V onRun() {
        return c.call();
      }
    };

    return wrapper.invoke(handler);
  }

  /**
   * Synchronously executes a {@link Runnable} on the thread that this Handler is associated with.
   * @param r the {@link Runnable} to execute
   * @throws RuntimeException if the {@link Runnable} could not be executed (the cause will be
   * null), or if {@link Runnable#run()} threw an exception (the cause will be the exception that
   * it threw).
   */
  public static void postAndWait(Handler handler, final Runnable r) {
    if (checkThreadAccess(handler)) {
      try {
        r.run();
        return;
      } catch (RuntimeException e) {
        throw new RuntimeException(e);
      }
    }

    WaitableRunnable<Void> wrapper = new WaitableRunnable<Void>() {
      @Override
      protected Void onRun() {
        r.run();
        return null;
      }
    };

    wrapper.invoke(handler);
  }

  private static abstract class WaitableRunnable<V> implements Runnable {
    private boolean mIsDone;
    private V mValue;
    private Exception mException;

    protected WaitableRunnable() {
    }

    @Override
    public final void run() {
      try {
        mValue = onRun();
        mException = null;
      } catch (Exception e) {
        mValue = null;
        mException = e;
      } finally {
        synchronized (this) {
          mIsDone = true;
          notifyAll();
        }
      }
    }

    protected abstract V onRun();

    public V invoke(Handler handler) {
      if (!handler.post(this)) {
        throw new RuntimeException("Handler.post() returned false");
      }

      join();

      if (mException != null) {
        throw new RuntimeException(mException);
      }

      return mValue;
    }

    private void join() {
      synchronized (this) {
        while (!mIsDone) {
          try {
            wait();
          } catch (InterruptedException e) {
          }
        }
      }
    }
  }
}
