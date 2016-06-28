/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.inspector.network;

import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;

/**
 * Interface that callers need to implement in order to pretty print binary payload received by WeexInspector
 */
public interface AsyncPrettyPrinter {
  /**
   * Prints the prettified version of payload to output. This method can block
   * for a certain period of time. Note that WeexInspector may impose arbitrary
   * time out on this method.
   *
   * @param output Writes the prettified version of payload
   * @param payload Response stream that has the raw data to be prettified
   * @throws IOException
   */
  public void printTo(PrintWriter output, InputStream payload) throws IOException;

  /**
   * Specifies the type of pretty printed content. Note that this method is called
   * before the content is actually pretty printed. WeexInspector uses this
   * method to make a hopeful guess of the type of prettified content
   *
   * @return an enum defined by PrettyPrinterDisplayType class
   */
  public PrettyPrinterDisplayType getPrettifiedType();
}
