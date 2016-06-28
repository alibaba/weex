/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.server.http;

import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;

public abstract class LightHttpBody {
  public static LightHttpBody create(String body, String contentType) {
    try {
      return create(body.getBytes("UTF-8"), contentType);
    } catch (UnsupportedEncodingException e) {
      throw new RuntimeException(e);
    }
  }

  public static LightHttpBody create(final byte[] body, final String contentType) {
    return new LightHttpBody() {
      @Override
      public String contentType() {
        return contentType;
      }

      @Override
      public int contentLength() {
        return body.length;
      }

      @Override
      public void writeTo(OutputStream output) throws IOException {
        output.write(body);
      }
    };
  }

  public abstract String contentType();
  public abstract int contentLength();
  public abstract void writeTo(OutputStream output) throws IOException;
}
