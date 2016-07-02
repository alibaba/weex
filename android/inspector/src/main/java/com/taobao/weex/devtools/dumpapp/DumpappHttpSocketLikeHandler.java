/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.dumpapp;

import com.taobao.weex.devtools.server.SocketLike;
import com.taobao.weex.devtools.server.SocketLikeHandler;
import com.taobao.weex.devtools.server.http.ExactPathMatcher;
import com.taobao.weex.devtools.server.http.HandlerRegistry;
import com.taobao.weex.devtools.server.http.HttpHandler;
import com.taobao.weex.devtools.server.http.HttpStatus;
import com.taobao.weex.devtools.server.http.LightHttpBody;
import com.taobao.weex.devtools.server.http.LightHttpRequest;
import com.taobao.weex.devtools.server.http.LightHttpResponse;
import com.taobao.weex.devtools.server.http.LightHttpServer;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

/**
 * Provides a legacy hook to support old dumpapp scripts which have not been
 * updated to the new binary protocol.  Since the framing protocol is still compatible this
 * can be easily supported to reduce upgrade friction since so many developers forgot to
 * copy the {@code dumpapp} script on upgrade.
 *
 * <p>{@code stdin} is not supported with this legacy mode.  Streaming output is also not
 * supported.</p>
 *
 * <p>This script sends a warning to stderr informing the developer of its deprecated nature.</p>
 */
@Deprecated
public class DumpappHttpSocketLikeHandler implements SocketLikeHandler {
  private final LightHttpServer mServer;

  public DumpappHttpSocketLikeHandler(Dumper dumper) {
    HandlerRegistry registry = new HandlerRegistry();
    registry.register(
        new ExactPathMatcher("/dumpapp"),
        new DumpappLegacyHttpHandler(dumper));
    mServer = new LightHttpServer(registry);
  }

  @Override
  public void onAccepted(SocketLike socket) throws IOException {
    mServer.serve(socket);
  }

  private static class DumpappLegacyHttpHandler implements HttpHandler {
    private static final String QUERY_PARAM_ARGV = "argv";
    private static final String RESPONSE_HEADER_ALLOW_ORIGIN = "Access-Control-Allow-Origin";
    private static final String CONTENT_TYPE = "application/octet-stream";

    private final Dumper mDumper;

    public DumpappLegacyHttpHandler(Dumper dumper) {
      mDumper = dumper;
    }

    @Override
    public boolean handleRequest(
        SocketLike socket,
        LightHttpRequest request,
        LightHttpResponse response) throws IOException {
      boolean postMethod = "POST".equals(request.method);
      boolean getMethod = !postMethod && "GET".equals(request.method);

      if (getMethod || postMethod) {
        List<String> argv = request.uri.getQueryParameters(QUERY_PARAM_ARGV);

        ByteArrayOutputStream outputBuffer = new ByteArrayOutputStream();
        Framer framer = new Framer(
            new ByteArrayInputStream(new byte[0]),
            outputBuffer);

        String warningPrefix = postMethod ? "ERROR" : "WARNING";

        framer.getStderr().println(
            "*** " + warningPrefix + ": Using legacy HTTP protocol; update dumpapp script! ***");

        if (getMethod) {
          DumpappSocketLikeHandler.dump(mDumper, framer, argv.toArray(new String[argv.size()]));
        } else {
          // stdin access is completely unsupported, so we can't allow any dumper plugins
          // to run...
          framer.writeExitCode(1);
        }

        response.code = HttpStatus.HTTP_OK;
        response.reasonPhrase = "OK";
        response.addHeader(RESPONSE_HEADER_ALLOW_ORIGIN, "*");
        response.body = LightHttpBody.create(outputBuffer.toByteArray(), CONTENT_TYPE);
      } else {
        response.code = HttpStatus.HTTP_NOT_IMPLEMENTED;
        response.reasonPhrase = "Not implemented";
        response.body = LightHttpBody.create(request.method + " not implemented", "text/plain");
      }

      return true;
    }
  }
}
