/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.server.http;

import android.net.Uri;

public class LightHttpRequest extends LightHttpMessage {
  public String method;
  public Uri uri;
  public String protocol;

  @Override
  public void reset() {
    super.reset();
    this.method = null;
    this.uri = null;
    this.protocol = null;
  }
}
