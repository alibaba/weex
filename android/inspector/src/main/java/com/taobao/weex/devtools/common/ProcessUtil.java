/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.common;

import java.io.FileInputStream;
import java.io.IOException;

import javax.annotation.Nullable;

public class ProcessUtil {
  /**
   * Maximum length allowed in {@code /proc/self/cmdline}.  Imposed to avoid a large buffer
   * allocation during the init path.
   */
  private static final int CMDLINE_BUFFER_SIZE = 64;

  private static String sProcessName;
  private static boolean sProcessNameRead;

  /**
   * Get process name by reading {@code /proc/self/cmdline}.
   *
   * @return Process name or null if there was an error reading from {@code /proc/self/cmdline}.
   *     It is unknown how this error can occur in practice and should be considered extremely
   *     rare.
   */
  @Nullable
  public static synchronized String getProcessName() {
    if (!sProcessNameRead) {
      sProcessNameRead = true;
      try {
        sProcessName = readProcessName();
      } catch (IOException e) {
      }
    }
    return sProcessName;
  }

  private static String readProcessName() throws IOException {
    byte[] cmdlineBuffer = new byte[CMDLINE_BUFFER_SIZE];

    // Avoid using a Reader to not pick up a forced 16K buffer.  Silly java.io...
    FileInputStream stream = new FileInputStream("/proc/self/cmdline");
    boolean success = false;
    try {
      int n = stream.read(cmdlineBuffer);
      success = true;
      int endIndex = indexOf(cmdlineBuffer, 0, n, (byte)0 /* needle */);
      return new String(cmdlineBuffer, 0, endIndex > 0 ? endIndex : n);
    } finally {
      Util.close(stream, !success);
    }
  }

  private static int indexOf(byte[] haystack, int offset, int length, byte needle) {
    for (int i = 0; i < haystack.length; i++) {
      if (haystack[i] == needle) {
        return i;
      }
    }
    return -1;
  }
}
