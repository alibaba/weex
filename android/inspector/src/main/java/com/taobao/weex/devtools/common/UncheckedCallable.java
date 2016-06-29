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
 * A task that returns a result. Implementers define a single method with no arguments called
 * {@code call}.
 *
 * <p>This interface is identical to {@link java.util.concurrent.Callable} but without the checked
 * exception.
 *
 * @param <V> the result type of method {@code call}
 */
public interface UncheckedCallable<V> {
  V call();
}
