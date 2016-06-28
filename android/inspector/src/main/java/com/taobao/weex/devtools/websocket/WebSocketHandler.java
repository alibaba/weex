/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.websocket;

import android.util.Base64;

import com.taobao.weex.devtools.common.Utf8Charset;
import com.taobao.weex.devtools.server.SocketLike;
import com.taobao.weex.devtools.server.http.HttpHandler;
import com.taobao.weex.devtools.server.http.HttpStatus;
import com.taobao.weex.devtools.server.http.LightHttpBody;
import com.taobao.weex.devtools.server.http.LightHttpMessage;
import com.taobao.weex.devtools.server.http.LightHttpRequest;
import com.taobao.weex.devtools.server.http.LightHttpResponse;
import com.taobao.weex.devtools.server.http.LightHttpServer;

import java.io.BufferedOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import javax.annotation.Nullable;

/**
 * Crazy kludge to support upgrading to the WebSocket protocol while still using the
 * {@link HttpHandler} harness.
 * <p>
 * The way this works is that we pump the request directly into our WebSocket implementation and
 * force write the response out to the connection without returning.  Then, we extract the
 * remaining buffered input stream bytes from the socket and stitch them together with the
 * raw sockets input stream and pass everything onto the WebSocket engine which blocks
 * until WebSocket orderly shutdown.
 */
public class WebSocketHandler implements HttpHandler {
  private static final String HEADER_UPGRADE = "Upgrade";
  private static final String HEADER_CONNECTION = "Connection";
  private static final String HEADER_SEC_WEBSOCKET_KEY = "Sec-WebSocket-Key";
  private static final String HEADER_SEC_WEBSOCKET_ACCEPT = "Sec-WebSocket-Accept";
  private static final String HEADER_SEC_WEBSOCKET_PROTOCOL = "Sec-WebSocket-Protocol";
  private static final String HEADER_SEC_WEBSOCKET_VERSION = "Sec-WebSocket-Version";

  private static final String HEADER_UPGRADE_WEBSOCKET = "websocket";
  private static final String HEADER_CONNECTION_UPGRADE = "Upgrade";
  private static final String HEADER_SEC_WEBSOCKET_VERSION_13 = "13";

  // Are you kidding me?  The WebSocket spec requires that we append this weird hardcoded String
  // to the key we receive from the client, SHA-1 that, and base64 encode it back to the client.
  // I'm guessing this is to prevent replay attacks of some kind but given that there's no actual
  // security context here, I can only imagine that this is just security through obscurity in
  // some fashion.
  private static final String SERVER_KEY_GUID = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";

  private final SimpleEndpoint mEndpoint;

  public WebSocketHandler(SimpleEndpoint endpoint) {
    mEndpoint = endpoint;
  }

  @Override
  public boolean handleRequest(
      SocketLike socket,
      LightHttpRequest request,
      LightHttpResponse response) throws IOException {
    if (!isSupportableUpgradeRequest(request)) {
      response.code = HttpStatus.HTTP_NOT_IMPLEMENTED;
      response.reasonPhrase = "Not Implemented";
      response.body = LightHttpBody.create(
          "Not a supported WebSocket upgrade request\n",
          "text/plain");
      return true;
    }

    // This will not return on successful WebSocket upgrade, but rather block until the session is
    // shut down or a socket error occurs.
    doUpgrade(socket, request, response);
    return false;
  }

  private static boolean isSupportableUpgradeRequest(LightHttpRequest request) {
    return HEADER_UPGRADE_WEBSOCKET.equalsIgnoreCase(getFirstHeaderValue(request, HEADER_UPGRADE)) &&
        HEADER_CONNECTION_UPGRADE.equals(getFirstHeaderValue(request, HEADER_CONNECTION)) &&
        HEADER_SEC_WEBSOCKET_VERSION_13.equals(
            getFirstHeaderValue(request, HEADER_SEC_WEBSOCKET_VERSION));
  }

  private void doUpgrade(
      SocketLike socketLike,
      LightHttpRequest request,
      LightHttpResponse response)
      throws IOException {
    response.code = HttpStatus.HTTP_SWITCHING_PROTOCOLS;
    response.reasonPhrase = "Switching Protocols";
    response.addHeader(HEADER_UPGRADE, HEADER_UPGRADE_WEBSOCKET);
    response.addHeader(HEADER_CONNECTION, HEADER_CONNECTION_UPGRADE);
    response.body = null;

    String clientKey = getFirstHeaderValue(request, HEADER_SEC_WEBSOCKET_KEY);
    if (clientKey != null) {
      response.addHeader(HEADER_SEC_WEBSOCKET_ACCEPT, generateServerKey(clientKey));
    }

    InputStream in = socketLike.getInput();
    OutputStream out = socketLike.getOutput();
    LightHttpServer.writeResponseMessage(
        response,
        new LightHttpServer.HttpMessageWriter(new BufferedOutputStream(out)));

    WebSocketSession session = new WebSocketSession(in, out, mEndpoint);
    session.handle();
  }

  private static String generateServerKey(String clientKey) {
    try {
      String serverKey = clientKey + SERVER_KEY_GUID;
      MessageDigest sha1 = MessageDigest.getInstance("SHA-1");
      sha1.update(Utf8Charset.encodeUTF8(serverKey));
      return Base64.encodeToString(sha1.digest(), Base64.NO_WRAP);
    } catch (NoSuchAlgorithmException e) {
      throw new RuntimeException(e);
    }
  }

  @Nullable
  private static String getFirstHeaderValue(LightHttpMessage message, String headerName) {
    return message.getFirstHeaderValue(headerName);
  }
}
