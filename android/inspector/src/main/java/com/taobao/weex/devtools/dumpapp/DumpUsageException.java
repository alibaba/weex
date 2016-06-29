/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.dumpapp;

/**
 * Usage error in a {@link DumperPlugin}.
 */
public class DumpUsageException extends DumpException {
  public DumpUsageException(String message) {
    super(message);
  }
}
