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
 * Interface for creating a factory for asynchronous pretty printers
 */
public interface AsyncPrettyPrinterFactory {

  /**
   * Creates an asynchronous pretty printer. This method must not be blocking.
   *
   * @param headerName header name of a response which is used to associate
   * with an asynchronous pretty printer
   * @param headerValue header value of a response which contains the URI for
   * the schema data needed to pretty print the response body
   * @return an asynchronous pretty printer to prettify the response body
   */
  public AsyncPrettyPrinter getInstance(String headerName, String headerValue);
}
