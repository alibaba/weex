/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.common;

/**
 * Implemented by an object whose methods must be called on a specific thread. If a method is
 * called from a disallowed thread then {@link IllegalStateException} will be thrown.
 * To marshal a call to the correct thread, you can use {@link #postAndWait(UncheckedCallable)} or
 * {@link #postAndWait(Runnable)}, both of which complete synchronously.
 */
public interface ThreadBound {
  /**
   * Checks whether the current thread has access to this object.
   * @return true if this thread has access to this object; otherwise false
   */
  boolean checkThreadAccess();

  /**
   * Enforces that the current thread has access to this object.
   * @throws IllegalStateException if the current thread does not have access to this object
   */
  void verifyThreadAccess();

  /**
   * Synchronously executes an {@link UncheckedCallable} on the thread that this object is bound to,
   * and returns its result.
   * @param c the {@link UncheckedCallable} to execute
   * @param <V> the return type of the {@link UncheckedCallable}
   * @return the return value from {@link UncheckedCallable#call()}
   * @throws RuntimeException if the {@link UncheckedCallable} could not be executed (the cause
   * will be null), or if {@link UncheckedCallable#call()} threw an exception (the cause will be the
   * exception that it threw).
   */
  <V> V postAndWait(UncheckedCallable<V> c);

  /**
   * Synchronously executes a {@link Runnable} on the thread that this object is bound to.
   * @param r the {@link Runnable} to execute
   * @throws RuntimeException if the {@link Runnable} could not be executed (the cause will be
   * null), or if {@link Runnable#run()} threw an exception (the cause will be the exception that
   * it threw).
   */
  void postAndWait(Runnable r);

  /**
   * Asynchronously executes a {@link Runnable} on the thread that this object is bound to
   * after the specified delay.
   * @param r the {@link Runnable} to execute
   * @param delayMillis The delay (in milliseconds) until the {@link Runnable} will be executed.
   * @throws RuntimeException if the {@link Runnable} could not be enqueued.
   */
  void postDelayed(Runnable r, long delayMillis);

  /**
   * Removes any pending posts of the given {@link Runnable} that are in the queue.
   * @param r the {@link Runnable} to remove from the queue
   */
  void removeCallbacks(Runnable r);
}

