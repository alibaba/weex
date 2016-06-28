/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.inspector.helper;

import com.taobao.weex.devtools.common.ThreadBound;
import com.taobao.weex.devtools.common.UncheckedCallable;
import com.taobao.weex.devtools.common.Util;

/**
 * This class is for those cases when a class' threading
 * policy is determined by one of its member variables.
 */
public abstract class ThreadBoundProxy implements ThreadBound {
  private final ThreadBound mEnforcer;

  public ThreadBoundProxy(ThreadBound enforcer) {
    mEnforcer = Util.throwIfNull(enforcer);
  }

  @Override
  public final boolean checkThreadAccess() {
    return mEnforcer.checkThreadAccess();
  }

  @Override
  public final void verifyThreadAccess() {
    mEnforcer.verifyThreadAccess();
  }

  @Override
  public final <V> V postAndWait(UncheckedCallable<V> c) {
    return mEnforcer.postAndWait(c);
  }

  @Override
  public final void postAndWait(Runnable r) {
    mEnforcer.postAndWait(r);
  }

  @Override
  public final void postDelayed(Runnable r, long delayMillis) {
    mEnforcer.postDelayed(r, delayMillis);
  }

  @Override
  public final void removeCallbacks(Runnable r) {
    mEnforcer.removeCallbacks(r);
  }
}
