/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.inspector.network;

import android.content.Context;
import android.util.Base64;
import android.util.Base64OutputStream;

import com.taobao.weex.devtools.common.ExceptionUtil;
import com.taobao.weex.devtools.common.LogRedirector;
import com.taobao.weex.devtools.common.Util;

import java.io.ByteArrayOutputStream;
import java.io.EOFException;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

/**
 * Manages temporary files created by {@link ChromeHttpFlowObserver} to serve request bodies.
 */
public class ResponseBodyFileManager {
  private static final String TAG = "ResponseBodyFileManager";
  private static final String FILENAME_PREFIX = "network-response-body-";
  private static final int PRETTY_PRINT_TIMEOUT_SEC = 10;

  private final Context mContext;
  private final Map<String, AsyncPrettyPrinter> mRequestIdMap = Collections.synchronizedMap(
      new HashMap<String, AsyncPrettyPrinter>());

  public ResponseBodyFileManager(Context context) {
    mContext = context;
  }

  public void cleanupFiles() {
    for (File file : mContext.getFilesDir().listFiles()) {
      if (file.getName().startsWith(FILENAME_PREFIX)) {
        if (!file.delete()) {
          LogRedirector.w(TAG, "Failed to delete " + file.getAbsolutePath());
        }
      }
    }
    LogRedirector.i(TAG, "Cleaned up temporary network files.");
  }

  public ResponseBodyData readFile(String requestId) throws IOException {
    InputStream in = mContext.openFileInput(getFilename(requestId));
    try {
      int firstByte = in.read();
      if (firstByte == -1) {
        throw new EOFException("Failed to read base64Encode byte");
      }
      ResponseBodyData bodyData = new ResponseBodyData();
      bodyData.base64Encoded = firstByte != 0;

      AsyncPrettyPrinter asyncPrettyPrinter = mRequestIdMap.get(requestId);
      if (asyncPrettyPrinter != null) {
        // TODO: this line blocks for up to 10 seconds and create problems as described
        // in issue #243 allow asynchronous dispatch for MethodDispatcher
        bodyData.data = prettyPrintContentWithTimeOut(asyncPrettyPrinter, in);
      } else {
        bodyData.data = Util.readAsUTF8(in);
      }
      return bodyData;

    } finally {
      in.close();
    }
  }

  private String prettyPrintContentWithTimeOut(
      AsyncPrettyPrinter asyncPrettyPrinter,
      InputStream in) throws IOException {
    AsyncPrettyPrintingCallable prettyPrintingCallable = new AsyncPrettyPrintingCallable(
        in,
        asyncPrettyPrinter);
    ExecutorService executorService = AsyncPrettyPrinterExecutorHolder.getExecutorService();
    if (executorService == null) {
      //last peer is unregistered...
      return null;
    }
    Future<String> future = executorService.submit(prettyPrintingCallable);
    try {
      return Util.getUninterruptibly(future, PRETTY_PRINT_TIMEOUT_SEC, TimeUnit.SECONDS);
    } catch (TimeoutException e) {
      future.cancel(true);
      return "Time out after " + PRETTY_PRINT_TIMEOUT_SEC +
          " seconds of attempting to pretty print\n" + Util.readAsUTF8(in);
    }  catch (ExecutionException e) {
      Throwable cause = e.getCause();
      ExceptionUtil.propagateIfInstanceOf(cause, IOException.class);
      throw ExceptionUtil.propagate(cause);
    }
  }

  public OutputStream openResponseBodyFile(String requestId, boolean base64Encode)
      throws IOException {
    OutputStream out = mContext.openFileOutput(getFilename(requestId), Context.MODE_PRIVATE);
    out.write(base64Encode ? 1 : 0);
    if (base64Encode) {
      return new Base64OutputStream(out, Base64.DEFAULT);
    } else {
      return out;
    }
  }

  private static String getFilename(String requestId) {
    return FILENAME_PREFIX + requestId;
  }

  /**
   * Associates an asynchronous pretty printer with a response request id
   * The pretty printer will be used to pretty print the response body that has
   * the particular request id
   *
   * @param requestId Unique identifier for the response
   * as per {@link NetworkEventReporter.InspectorResponse#requestId()}
   * @param asyncPrettyPrinter Asynchronous Pretty Printer to pretty print the response body
   */
  public void associateAsyncPrettyPrinterWithId(
      String requestId,
      AsyncPrettyPrinter asyncPrettyPrinter) {
    if (mRequestIdMap.put(requestId, asyncPrettyPrinter) != null) {
      throw new IllegalArgumentException("cannot associate different " +
          "pretty printers with the same request id: "+requestId);
    }
  }

  private class AsyncPrettyPrintingCallable implements Callable<String> {
    private final InputStream mInputStream;
    private final AsyncPrettyPrinter mAsyncPrettyPrinter;

    public AsyncPrettyPrintingCallable(
        InputStream in,
        AsyncPrettyPrinter asyncPrettyPrinter) {
      mInputStream = in;
      mAsyncPrettyPrinter = asyncPrettyPrinter;
    }

    @Override
    public String call() throws IOException {
      return prettyPrintContent(mInputStream, mAsyncPrettyPrinter);
    }

    private String prettyPrintContent(InputStream in, AsyncPrettyPrinter asyncPrettyPrinter)
        throws IOException {
      ByteArrayOutputStream out = new ByteArrayOutputStream();
      PrintWriter writer = new PrintWriter(out);
      asyncPrettyPrinter.printTo(writer, in);
      writer.flush();
      return out.toString("UTF-8");
    }
  }
}
