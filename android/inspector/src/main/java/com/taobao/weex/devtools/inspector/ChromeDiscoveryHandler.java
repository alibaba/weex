/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.inspector;

import android.content.Context;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.net.Uri;

import com.taobao.weex.devtools.common.ProcessUtil;
import com.taobao.weex.devtools.server.SocketLike;
import com.taobao.weex.devtools.server.http.ExactPathMatcher;
import com.taobao.weex.devtools.server.http.HandlerRegistry;
import com.taobao.weex.devtools.server.http.HttpHandler;
import com.taobao.weex.devtools.server.http.HttpStatus;
import com.taobao.weex.devtools.server.http.LightHttpBody;
import com.taobao.weex.devtools.server.http.LightHttpRequest;
import com.taobao.weex.devtools.server.http.LightHttpResponse;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import javax.annotation.Nullable;

/**
 * Provides sufficient responses to convince Chrome's {@code chrome://inspect/devices} that we're
 * "one of them".  Note that we are being discovered automatically by the name of our socket
 * as defined in {@link LocalSocketHttpServer}.  After discovery, we're required to provide
 * some context on how exactly to display and inspect what we have.
 */
public class ChromeDiscoveryHandler implements HttpHandler {
  private static final String PAGE_ID = "1";

  private static final String PATH_PAGE_LIST = "/json";
  private static final String PATH_VERSION = "/json/version";
  private static final String PATH_ACTIVATE = "/json/activate/" + PAGE_ID;

  /**
   * Latest version of the WebKit Inspector UI that we've tested again (ideally).
   */
  private static final String WEBKIT_REV = "@188492";
  private static final String WEBKIT_VERSION = "537.36 (" + WEBKIT_REV + ")";

  private static final String USER_AGENT = "Weex";

  /**
   * Structured version of the WebKit Inspector protocol that we understand.
   */
  private static final String PROTOCOL_VERSION = "1.1";

  private final Context mContext;
  private final String mInspectorPath;

  @Nullable private LightHttpBody mVersionResponse;
  @Nullable private LightHttpBody mPageListResponse;

  public ChromeDiscoveryHandler(Context context, String inspectorPath) {
    mContext = context;
    mInspectorPath = inspectorPath;
  }

  public void register(HandlerRegistry registry) {
    registry.register(new ExactPathMatcher(PATH_PAGE_LIST), this);
    registry.register(new ExactPathMatcher(PATH_VERSION), this);
    registry.register(new ExactPathMatcher(PATH_ACTIVATE), this);
  }

  @Override
  public boolean handleRequest(SocketLike socket, LightHttpRequest request, LightHttpResponse response) {
    String path = request.uri.getPath();
    try {
      if (PATH_VERSION.equals(path)) {
        handleVersion(response);
      } else if (PATH_PAGE_LIST.equals(path)) {
        handlePageList(response);
      } else if (PATH_ACTIVATE.equals(path)) {
        handleActivate(response);
      } else {
        response.code = HttpStatus.HTTP_NOT_IMPLEMENTED;
        response.reasonPhrase = "Not implemented";
        response.body = LightHttpBody.create("No support for " + path + "\n", "text/plain");
      }
    } catch (JSONException e) {
      response.code = HttpStatus.HTTP_INTERNAL_SERVER_ERROR;
      response.reasonPhrase = "Internal server error";
      response.body = LightHttpBody.create(e.toString() + "\n", "text/plain");
    }
    return true;
  }

  private void handleVersion(LightHttpResponse response)
      throws JSONException {
    if (mVersionResponse == null) {
      JSONObject reply = new JSONObject();
      reply.put("WebKit-Version", WEBKIT_VERSION);
      reply.put("User-Agent", USER_AGENT);
      reply.put("Protocol-Version", PROTOCOL_VERSION);
      reply.put("Browser", getAppLabelAndVersion());
      reply.put("Android-Package", mContext.getPackageName());
      mVersionResponse = LightHttpBody.create(reply.toString(), "application/json");
    }
    setSuccessfulResponse(response, mVersionResponse);
  }

  private void handlePageList(LightHttpResponse response)
      throws JSONException {
    if (mPageListResponse == null) {
      JSONArray reply = new JSONArray();
      JSONObject page = new JSONObject();
      page.put("type", "app");
      page.put("title", makeTitle());
      page.put("id", PAGE_ID);
      page.put("description", "");

      page.put("webSocketDebuggerUrl", "ws://" + mInspectorPath);
      Uri chromeFrontendUrl = new Uri.Builder()
          .scheme("http")
          .authority("chrome-devtools-frontend.appspot.com")
          .appendEncodedPath("serve_rev")
          .appendEncodedPath(WEBKIT_REV)
          .appendEncodedPath("devtools.html")
          .appendQueryParameter("ws", mInspectorPath)
          .build();
      page.put("devtoolsFrontendUrl", chromeFrontendUrl.toString());

      reply.put(page);
      mPageListResponse = LightHttpBody.create(reply.toString(), "application/json");
    }
    setSuccessfulResponse(response, mPageListResponse);
  }

  private String makeTitle() {
    StringBuilder b = new StringBuilder();
    b.append(getAppLabel());

    b.append(" (powered by Weex)");

    String processName = ProcessUtil.getProcessName();
    int colonIndex = processName.indexOf(':');
    if (colonIndex >= 0) {
      String nonDefaultProcessName = processName.substring(colonIndex);
      b.append(nonDefaultProcessName);
    }

    return b.toString();
  }

  private void handleActivate(LightHttpResponse response) {
    // Arbitrary response seem acceptable :)
    setSuccessfulResponse(
        response,
        LightHttpBody.create("Target activation ignored\n", "text/plain"));
  }

  private static void setSuccessfulResponse(
      LightHttpResponse response,
      LightHttpBody body) {
    response.code = HttpStatus.HTTP_OK;
    response.reasonPhrase = "OK";
    response.body = body;
  }

  private String getAppLabelAndVersion() {
    StringBuilder b = new StringBuilder();
    PackageManager pm = mContext.getPackageManager();
    b.append(getAppLabel());
    b.append('/');
    try {
      PackageInfo info = pm.getPackageInfo(mContext.getPackageName(), 0 /* flags */);
      b.append(info.versionName);
    } catch (PackageManager.NameNotFoundException e) {
      throw new RuntimeException(e);
    }
    return b.toString();
  }

  private CharSequence getAppLabel() {
    PackageManager pm = mContext.getPackageManager();
    return pm.getApplicationLabel(mContext.getApplicationInfo());
  }
}
