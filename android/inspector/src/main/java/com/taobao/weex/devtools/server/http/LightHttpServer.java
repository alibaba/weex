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
import android.support.annotation.Nullable;

import com.taobao.weex.devtools.server.LeakyBufferedInputStream;
import com.taobao.weex.devtools.server.SocketLike;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.EOFException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.io.StringWriter;

/**
 * Somewhat crude but very fast HTTP server designed exclusively to handle the
 * Chrome DevTools protocol, though sufficiently general to do other very basic things.
 * Performance is imperative here as Chrome aggressively polls WeexInspector asking for
 * meta data when the discovery window is open in Chrome.
 */
public class LightHttpServer {
  private static final String TAG = "LightHttpServer";

  private final HandlerRegistry mHandlerRegistry;

  public LightHttpServer(HandlerRegistry handlerRegistry) {
    mHandlerRegistry = handlerRegistry;
  }

  public void serve(SocketLike socket) throws IOException {
    LeakyBufferedInputStream input = new LeakyBufferedInputStream(socket.getInput(), 1024);
    OutputStream output = socket.getOutput();
    HttpMessageReader reader = new HttpMessageReader(input);
    HttpMessageWriter writer = new HttpMessageWriter(new BufferedOutputStream(output));

    SocketLike anotherSocketLike = new SocketLike(socket, input);
    LightHttpRequest scratchRequest = new LightHttpRequest();
    LightHttpResponse scratchResponse = new LightHttpResponse();
    LightHttpRequest request;

    // This loops assumes we are always using keep-alive connections.  If we're wrong, we
    // expect the client to just close the connection.
    while ((request = readRequestMessage(scratchRequest, reader)) != null) {
      final LightHttpResponse response = scratchResponse;
      response.reset();

      // Note, if we're upgrading to websockets, this will block for the lifetime of the
      // websocket session...
      boolean keepGoing = dispatchToHandler(anotherSocketLike, request, response);
      if (!keepGoing) {
        // Orderly shutdown, ignore response and break the loop.
        break;
      }

      writeFullResponse(response, writer, output);
    }
  }

  private boolean dispatchToHandler(
      SocketLike socketLike,
      LightHttpRequest request,
      LightHttpResponse response)
      throws IOException {
    HttpHandler handler = mHandlerRegistry.lookup(request.uri.getPath());
    if (handler == null) {
      response.code = HttpStatus.HTTP_NOT_FOUND;
      response.reasonPhrase = "Not found";
      response.body = LightHttpBody.create("No handler found\n", "text/plain");
      return true;
    } else {
      try {
        return handler.handleRequest(socketLike, request, response);
      } catch (RuntimeException e) {
        response.code = HttpStatus.HTTP_INTERNAL_SERVER_ERROR;
        response.reasonPhrase = "Internal Server Error";
        StringWriter stack = new StringWriter();
        PrintWriter stackWriter = new PrintWriter(stack);
        try {
          e.printStackTrace(stackWriter);
        } finally {
          stackWriter.close();
        }
        response.body = LightHttpBody.create(stack.toString(), "text/plain");
        return true;
      }
    }
  }

  @Nullable
  private static LightHttpRequest readRequestMessage(
      LightHttpRequest request,
      HttpMessageReader reader)
      throws IOException {
    request.reset();

    String requestLine = reader.readLine();
    if (requestLine == null) {
      return null;
    }

    // Zero tolerance on URI encoding, that URI better not have a space in it...
    String[] requestParts = requestLine.split(" ", 3);
    if (requestParts.length != 3) {
      throw new IOException("Invalid request line: " + requestLine);
    }

    request.method = requestParts[0];
    request.uri = Uri.parse(requestParts[1]);
    request.protocol = requestParts[2];

    readHeaders(request, reader);

    return request;
  }

  private static void readHeaders(
      LightHttpMessage message,
      HttpMessageReader reader) throws IOException {
    String headerLine;
    while (true) {
      headerLine = reader.readLine();
      if (headerLine == null) {
        throw new EOFException();
      } else if ("".equals(headerLine)) {
        break;
      } else {
        String[] headerParts = headerLine.split(": ", 2);
        if (headerParts.length != 2) {
          throw new IOException("Malformed header: " + headerLine);
        }
        String name = headerParts[0];
        String value = headerParts[1];

        message.headerNames.add(name);
        message.headerValues.add(value);
      }
    }
  }

  private static void writeFullResponse(
      LightHttpResponse response,
      HttpMessageWriter writer,
      OutputStream output)
      throws IOException {
    response.prepare();
    writeResponseMessage(response, writer);
    if (response.body != null) {
      response.body.writeTo(output);
    }
  }

  public static void writeResponseMessage(LightHttpResponse response, HttpMessageWriter writer)
      throws IOException {
    writer.writeLine("HTTP/1.1 " + response.code + " " + response.reasonPhrase);
    for (int i = 0, N = response.headerNames.size(); i < N; i++) {
      String name = response.headerNames.get(i);
      String value = response.headerValues.get(i);
      writer.writeLine(name + ": " + value);
    }
    writer.writeLine();
    writer.flush();
  }

  /**
   * Efficient, unbuffered variation of {@link InputStreamReader} which assumes the input is
   * always ASCII.  This is especially useful when you are certain that the client and server
   * are both mechanized and will not contain non-ASCII characters in the control messages upon
   * which this reader is applied.
   */
  private static class HttpMessageReader {
    private final BufferedInputStream mIn;
    private final StringBuilder mBuffer = new StringBuilder();
    private final NewLineDetector mNewLineDetector = new NewLineDetector();

    public HttpMessageReader(BufferedInputStream in) {
      mIn = in;
    }

    @Nullable
    public String readLine() throws IOException {
      while (true) {
        int b = mIn.read();
        if (b < 0) {
          return null;
        }

        char c = (char)b;
        mNewLineDetector.accept(c);

        switch (mNewLineDetector.state()) {
          case NewLineDetector.STATE_ON_CRLF:
            String result = mBuffer.toString();
            mBuffer.setLength(0);
            return result;
          case NewLineDetector.STATE_ON_CR:
            break;
          case NewLineDetector.STATE_ON_OTHER:
            mBuffer.append(c);
            break;
        }
      }
    }

    private static class NewLineDetector {
      private static final int STATE_ON_OTHER = 1;
      private static final int STATE_ON_CR = 2;
      private static final int STATE_ON_CRLF = 3;

      private int state = STATE_ON_OTHER;

      public void accept(char c) {
        switch (state) {
          case STATE_ON_OTHER:
            if (c == '\r') {
              state = STATE_ON_CR;
            }
            break;
          case STATE_ON_CR:
            if (c == '\n') {
              state = STATE_ON_CRLF;
            } else {
              state = STATE_ON_OTHER;
            }
            break;
          case STATE_ON_CRLF:
            if (c == '\r') {
              state = STATE_ON_CR;
            } else {
              state = STATE_ON_OTHER;
            }
            break;
          default:
            throw new IllegalArgumentException("Unknown state: " + state);
        }
      }

      public int state() {
        return state;
      }
    }
  }

  /**
   * Similar in spirit to {@link HttpMessageReader} which assumes ASCII for all messages as
   * a performance optimization.  Caller is responsible for flushing the writer.
   * <p />
   * Exposed publicly as a hack to support WebSocket upgrade.
   */
  public static class HttpMessageWriter {
    private final BufferedOutputStream mOut;
    private static final byte[] CRLF = "\r\n".getBytes();

    public HttpMessageWriter(BufferedOutputStream out) {
      mOut = out;
    }

    public void writeLine(String line) throws IOException {
      for (int i = 0, N = line.length(); i < N; i++) {
        char c = line.charAt(i);
        mOut.write((int)c);
      }
      mOut.write(CRLF);
    }

    public void writeLine() throws IOException {
      mOut.write(CRLF);
    }

    public void flush() throws IOException {
      mOut.flush();
    }
  }
}
