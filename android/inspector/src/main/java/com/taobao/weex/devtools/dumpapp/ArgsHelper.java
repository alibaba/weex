/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.dumpapp;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class ArgsHelper {
  public static String nextOptionalArg(Iterator<String> argsIter, String defaultValue) {
    return argsIter.hasNext() ? argsIter.next() : defaultValue;
  }

  public static String nextArg(Iterator<String> argsIter, String errorIfMissing)
      throws DumpUsageException {
    if (!argsIter.hasNext()) {
      throw new DumpUsageException(errorIfMissing);
    }
    return argsIter.next();
  }

  public static String[] drainToArray(Iterator<String> argsIter) {
    List<String> args = new ArrayList<>();
    while (argsIter.hasNext()) {
      args.add(argsIter.next());
    }
    return args.toArray(new String[args.size()]);
  }
}
