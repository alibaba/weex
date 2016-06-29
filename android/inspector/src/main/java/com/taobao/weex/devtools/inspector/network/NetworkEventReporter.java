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

import javax.annotation.Nullable;

/**
 * Interface that callers must invoke in order to supply data to the Network tab in
 * the WebKit Inspector.
 *
 * <pre>
 * requestWillBeSent +---> responseHeadersReceived +---> interpretResponseStream
 *                   |           |                 |
 *                   |           `---> dataSent    |
 *                   |                             |
 *                   `-----------------------------`--------> httpExchangeFailed
 * </pre>
 *
 * Note that {@link #interpretResponseStream} combined with {@link DefaultResponseHandler}
 * will automatically invoke {@link #dataReceived}, {@link #responseReadFailed} and
 * {@link #responseReadFinished}.  If you use your own custom {@link ResponseHandler} you
 * must be sure to invoke these methods manually.
 */
public interface NetworkEventReporter {
  /**
   * Returns true if there is at least one peer listening for network events; false otherwise.
   * This value is provided as an optimization to avoid expensive work when the WebKit Inspector is
   * not being used.  It is otherwise safe to invoke methods defined in this interface when
   * the value is false.
   */
  boolean isEnabled();

  /**
   * Indicates that a request is about to be sent, but has not yet been delivered over the wire.
   *
   * @param request Request descriptor.
   */
  void requestWillBeSent(InspectorRequest request);

  /**
   * Indicates that a response message was just received from the network, but the body
   * has not yet been read.
   *
   * @param response Response descriptor.
   */
  void responseHeadersReceived(InspectorResponse response);

 /**
  * Indicates that communication with the server has failed. You are expected to call this for any
  * exception before you call {@link #interpretResponseStream}. After
  * {@link #interpretResponseStream} is called we will reporting any
  * {@link IOException} during reading from the {@link InputStream}.
  *
  * @param requestId Unique identifier for the request as per {@link InspectorRequest#id()}
  * @param errorText Text to report for the error; using {@link IOException#toString()} is
  *     recommended.
   */
  void httpExchangeFailed(String requestId, String errorText);

  /**
   * Intercept the stream as given by the underlying HTTP library that contains the body of the
   * response. In order to have the response show up in inspector (and to have the request be
   * completed successfully) you need to call this AND read until exhaustion/EOF of the returned
   * stream.
   *
   * <p>
   * We will internally signal a failure if there is an {@link IOException} received while reading
   * from the stream.
   *
   * <p>
   * Do not invoke {@link #httpExchangeFailed(String, String)} after calling this method.
   *
   * @param requestId Unique identifier for the request as per {@link InspectorRequest#id()}
   * @param contentType The {@code Content-Type} header value that was specified in
   *     {@link InspectorResponse}.  This header is used to determine the appropriate
   *     storage format for the body.  For instance, {@code image/*} is necessary to cause
   *     images to appear in the Inspector UI.
   * @param contentEncoding The {@code Content-Encoding} header value that was specified in
   *     {@link InspectorResponse}.  This header is used to determine what type of decompression
   *     is to be applied when delivering the raw response stream to the debugging interface.
   *     If null, no decompression will be used.
   * @param inputStream Response stream if applicable ("HEAD" for instance does not have a body).
   *     {@code null} otherwise.
   * @param responseHandler Callback to forward stream events back to the relevant event reporter
   *     methods.  Recommend using {@link DefaultResponseHandler} for most callers.
   *
   * @return {@link InputStream} that has been intercepted if WebkitInspector is active and enabled
   *     otherwise it will return {@code inputStream}
   */
  @Nullable
  InputStream interpretResponseStream(
      String requestId,
      @Nullable String contentType,
      @Nullable String contentEncoding,
      @Nullable InputStream inputStream,
      ResponseHandler responseHandler);

  /**
   * Indicates that there was a failure while reading from response stream.  If you use
   * {@link #interpretResponseStream} with {@link DefaultResponseHandler} (as is recommended),
   * this method will be invoked automatically for you.
   *
   * @param requestId Unique identifier for the request as per {@link InspectorRequest#id()}
   * @param errorText Text to report for the error; using {@link IOException#toString()} is
   *     recommended.
   */
  void responseReadFailed(String requestId, String errorText);

  /**
   * Indicates that the response stream has been fully exhausted and the request is now
   * complete.  If you use {@link #interpretResponseStream} with {@link DefaultResponseHandler}
   * (as is recommended), this method will be invoked automatically for you.
   *
   * @param requestId Unique identifier for the request as per {@link InspectorRequest#id()}
   */
  void responseReadFinished(String requestId);

  /**
   * Indicates that raw data was sent over the network.  It is permissible to invoke this
   * method just once after the full size of the request is known.
   * <p>
   * Invoking this method is optional and merely provides additional timing metrics and actual
   * payload sizes to the Inspector UI.
   *
   * @param requestId Unique identifier for the request as per {@link InspectorRequest#id()}
   * @param dataLength Uncompressed data segment length
   * @param encodedDataLength Compressed data segment length
   */
  void dataSent(String requestId, int dataLength, int encodedDataLength);

  /**
   * Indicates that raw data was received from the network.
   *
   * @see #dataSent
   */
  void dataReceived(String requestId, int dataLength, int encodedDataLength);

  /**
   * Represents the request that will be sent over HTTP.  Note that for many implementations
   * of HTTP the request constructed may differ from the request actually sent over the wire.
   * For instance, additional headers like {@code Host}, {@code User-Agent}, {@code Content-Type},
   * etc may not be part of this request but should be injected if necessary.  Some stacks offer
   * inspection of the raw request about to be sent to the server which is preferable.
   */
  interface InspectorRequest extends InspectorHeaders {
    /**
     * Unique identifier for this request.  This identifier must be used in all other network
     * events corresponding to this request.  Identifiers may be re-used after
     * {@link NetworkEventReporter#httpExchangeFailed} or {@link NetworkEventReporter#loadingFinished}
     * are invoked.
     */
    String id();

    /**
     * Arbitrary debug-friendly name of the request.
     */
    String friendlyName();

    /**
     * Provide an extra integer to decorate the {@link #friendlyName()}.  This shows up next to
     * it in the WebKit Inspector UI and can be used to indicate things like request priority.
     */
    @Nullable
    Integer friendlyNameExtra();

    String url();

    /**
     * HTTP method ("GET", "POST", "DELETE", etc).
     */
    String method();

    /**
     * Provide the body if part of an entity-enclosing request (like "POST" or "PUT").  May
     * return null otherwise.
     */
    @Nullable
    byte[] body() throws IOException;
  }

  interface InspectorResponse extends InspectorHeaders {
    /** @see InspectorRequest#id() */
    String requestId();

    String url();

    int statusCode();
    String reasonPhrase();

    /**
     * True if the response was furnished on a re-used socket; false otherwise or if unknown.
     */
    boolean connectionReused();

    /**
     * Unique connection identifier representing the socket that was used to furnish the response.
     */
    int connectionId();

    /**
     * True if the response was furnished by disk cache; false otherwise or if unknown.
     */
    boolean fromDiskCache();
  }

  interface InspectorHeaders {
    int headerCount();
    String headerName(int index);
    String headerValue(int index);

    @Nullable
    String firstHeaderValue(String name);
  }
}
