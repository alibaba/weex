/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.server.http;

public class LightHttpResponse extends LightHttpMessage {
  public int code;
  public String reasonPhrase;
  public LightHttpBody body;

  public void prepare() {
    if (body != null) {
      addHeader(HttpHeaders.CONTENT_TYPE, body.contentType());
      addHeader(HttpHeaders.CONTENT_LENGTH, String.valueOf(body.contentLength()));
    }
  }

  @Override
  public void reset() {
    super.reset();
    this.code = -1;
    this.reasonPhrase = null;
    this.body = null;
  }
}
