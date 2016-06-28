/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools;

import com.taobao.weex.devtools.dumpapp.DumperPlugin;

/**
 * Provider interface to lazily supply dumpers to be initialized on demand.  It is critical
 * that the main initialization flow of WeexInspector perform no actual work beyond simply
 * binding a socket and starting the listener thread.
 */
public interface DumperPluginsProvider {
  Iterable<DumperPlugin> get();
}
