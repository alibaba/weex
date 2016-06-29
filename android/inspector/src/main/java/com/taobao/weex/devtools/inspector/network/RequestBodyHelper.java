/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.inspector.network;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.zip.InflaterOutputStream;

import javax.annotation.Nullable;

/**
 * Helper which manages provides computed request sizes as well as transparent decompression.
 * Note that request compression is not officially part of the HTTP standard however it is
 * commonly in use and can be conveniently supported here.
 * <p />
 * To use, invoke {@link #createBodySink} to prepare an output stream where the raw body can be
 * written.  Then invoke {@link #getDisplayBody()} to retrieve the possibly decoded body.
 * Finally, {@link #reportDataSent()} can be called to report to WeexInspector the raw and decompressed
 * payload sizes.
 */
public class RequestBodyHelper {
  private final NetworkEventReporter mEventReporter;
  private final String mRequestId;

  private ByteArrayOutputStream mDeflatedOutput;
  private CountingOutputStream mDeflatingOutput;

  public RequestBodyHelper(NetworkEventReporter eventReporter, String requestId) {
    mEventReporter = eventReporter;
    mRequestId = requestId;
  }

  public OutputStream createBodySink(@Nullable String contentEncoding) throws IOException {
    OutputStream deflatingOutput;
    ByteArrayOutputStream deflatedOutput = new ByteArrayOutputStream();
    if (DecompressionHelper.GZIP_ENCODING.equals(contentEncoding)) {
      deflatingOutput = GunzippingOutputStream.create(deflatedOutput);
    } else if (DecompressionHelper.DEFLATE_ENCODING.equals(contentEncoding)) {
      deflatingOutput = new InflaterOutputStream(deflatedOutput);
    } else {
      deflatingOutput = deflatedOutput;
    }

    mDeflatingOutput = new CountingOutputStream(deflatingOutput);
    mDeflatedOutput = deflatedOutput;

    return mDeflatingOutput;
  }

  public byte[] getDisplayBody() {
    throwIfNoBody();
    return mDeflatedOutput.toByteArray();
  }

  public boolean hasBody() {
    return mDeflatedOutput != null;
  }

  public void reportDataSent() {
    throwIfNoBody();
    mEventReporter.dataSent(
        mRequestId,
        mDeflatedOutput.size(),
        (int)mDeflatingOutput.getCount());
  }

  private void throwIfNoBody() {
    if (!hasBody()) {
      throw new IllegalStateException("No body found; has createBodySink been called?");
    }
  }
}
