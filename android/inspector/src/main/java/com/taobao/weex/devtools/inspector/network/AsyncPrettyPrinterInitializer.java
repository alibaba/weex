/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.inspector.network;

/**
 * Interface that is called if AsyncPrettyPrinterRegistry is unpopulated when
 * the first peer connects to WeexInspector. It is responsible for registering header
 * names and their corresponding pretty printers
 */
public interface AsyncPrettyPrinterInitializer {

  /**
   * Populates AsyncPrettyPrinterRegistry with header names and their corresponding pretty
   * printers. This is responsible for registering all {@link AsyncPrettyPrinter} to the
   * provided registry.
   * @param registry
   */
  void populatePrettyPrinters(AsyncPrettyPrinterRegistry registry);

}
