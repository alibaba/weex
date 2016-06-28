/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.inspector.network;

import android.os.SystemClock;
import android.util.Log;

import com.taobao.weex.devtools.common.Utf8Charset;
import com.taobao.weex.devtools.inspector.console.CLog;
import com.taobao.weex.devtools.inspector.protocol.module.Console;
import com.taobao.weex.devtools.inspector.protocol.module.Network;
import com.taobao.weex.devtools.inspector.protocol.module.Page;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

/**
 * Implementation of {@link NetworkEventReporter} which allows callers to inform the WeexInspector
 * system of network traffic.  Callers can safely eagerly access this class and store a
 * reference if they wish.  When WebKit Inspector clients are connected, the internal
 * implementation will be automatically wired up to them.
 */
public class NetworkEventReporterImpl implements NetworkEventReporter {
  @Nullable
  private ResourceTypeHelper mResourceTypeHelper;

  private static NetworkEventReporter sInstance;

  private NetworkEventReporterImpl() {
  }

  /**
   * Static accessor allowing callers to easily hook into the WebKit Inspector system without
   * creating dependencies on the main WeexInspector initialization code path.
   */
  public static synchronized NetworkEventReporter get() {
    if (sInstance == null) {
      sInstance = new NetworkEventReporterImpl();
    }
    return sInstance;
  }

  @Override
  public boolean isEnabled() {
    NetworkPeerManager peerManager = getPeerManagerIfEnabled();
    return peerManager != null;
  }

  @Nullable
  private NetworkPeerManager getPeerManagerIfEnabled() {
    NetworkPeerManager peerManager = NetworkPeerManager.getInstanceOrNull();
    if (peerManager != null && peerManager.hasRegisteredPeers()) {
      return peerManager;
    }
    return null;
  }

  @Override
  public void requestWillBeSent(InspectorRequest request) {
    NetworkPeerManager peerManager = getPeerManagerIfEnabled();
    if (peerManager != null) {
      Network.Request requestJSON = new Network.Request();
      requestJSON.url = request.url();
      requestJSON.method = request.method();
      requestJSON.headers = formatHeadersAsJSON(request);
      requestJSON.postData = readBodyAsString(peerManager, request);

      // Hack to use the initiator of SCRIPT to generate a fake call stack that includes
      // the request's "friendly" name.
      String requestFriendlyName = request.friendlyName();
      Integer requestPriority = request.friendlyNameExtra();
      Network.Initiator initiatorJSON = new Network.Initiator();
      initiatorJSON.type = Network.InitiatorType.SCRIPT;
      initiatorJSON.stackTrace = new ArrayList<Console.CallFrame>();
      initiatorJSON.stackTrace.add(new Console.CallFrame(requestFriendlyName,
          requestFriendlyName,
          requestPriority != null ? requestPriority : 0 /* lineNumber */,
          0 /* columnNumber */));

      Network.RequestWillBeSentParams params = new Network.RequestWillBeSentParams();
      params.requestId = request.id();
      params.frameId = "1";
      params.loaderId = "1";
      params.documentURL = request.url();
      Log.v("requestWillBeSent", "params.documentURL " + params.documentURL);
      params.request = requestJSON;
      params.timestamp = stethoNow() / 1000.0;
      params.initiator = initiatorJSON;
      params.redirectResponse = null;

      // Type is now required as of at least WebKit Inspector rev @188492.  If you don't send
      // it, Chrome will refuse to draw the row in the Network tab until the response is
      // received (providing the type).  This delay is very noticable on slow networks.
      params.type = Page.ResourceType.OTHER;

      peerManager.sendNotificationToPeers("Network.requestWillBeSent", params);
    }
  }

  @Nullable
  private static String readBodyAsString(
      NetworkPeerManager peerManager,
      InspectorRequest request) {
    try {
      byte[] body = request.body();
      if (body != null) {
        return new String(body, Utf8Charset.INSTANCE);
      }
    } catch (IOException | OutOfMemoryError e) {
      CLog.writeToConsole(
          peerManager,
          Console.MessageLevel.WARNING,
          Console.MessageSource.NETWORK,
          "Could not reproduce POST body: " + e);
    }
    return null;
  }

  @Override
  public void responseHeadersReceived(InspectorResponse response) {
    NetworkPeerManager peerManager = getPeerManagerIfEnabled();
    if (peerManager != null) {
      Network.Response responseJSON = new Network.Response();
      responseJSON.url = response.url();
      responseJSON.status = response.statusCode();
      responseJSON.statusText = response.reasonPhrase();
      responseJSON.headers = formatHeadersAsJSON(response);
      String contentType = getContentType(response);
      responseJSON.mimeType = contentType != null ?
          getResourceTypeHelper().stripContentExtras(contentType) :
          "application/octet-stream";
      responseJSON.connectionReused = response.connectionReused();
      responseJSON.connectionId = response.connectionId();
      responseJSON.fromDiskCache = response.fromDiskCache();
      Network.ResponseReceivedParams receivedParams = new Network.ResponseReceivedParams();
      receivedParams.requestId = response.requestId();
      receivedParams.frameId = "1";
      receivedParams.loaderId = "1";
      receivedParams.timestamp = stethoNow() / 1000.0;
      receivedParams.response = responseJSON;
      AsyncPrettyPrinter asyncPrettyPrinter =
          initAsyncPrettyPrinterForResponse(response, peerManager);
      receivedParams.type =
          determineResourceType(asyncPrettyPrinter, contentType, getResourceTypeHelper());
      peerManager.sendNotificationToPeers("Network.responseReceived", receivedParams);
    }
  }

  @Nullable
  private static AsyncPrettyPrinter initAsyncPrettyPrinterForResponse(
      InspectorResponse response,
      NetworkPeerManager peerManager) {
    AsyncPrettyPrinterRegistry registry = peerManager.getAsyncPrettyPrinterRegistry();
    AsyncPrettyPrinter asyncPrettyPrinter = createPrettyPrinterForResponse(response, registry);
    if (asyncPrettyPrinter != null) {
      peerManager.getResponseBodyFileManager().associateAsyncPrettyPrinterWithId(
          response.requestId(),
          asyncPrettyPrinter);
    }
     return asyncPrettyPrinter;
  }

  private static Page.ResourceType determineResourceType(
      AsyncPrettyPrinter asyncPrettyPrinter,
      String contentType,
      ResourceTypeHelper resourceTypeHelper) {
    Log.v("determineResourceType", "determineResourceType : " + contentType);
    if (asyncPrettyPrinter != null) {
      return asyncPrettyPrinter.getPrettifiedType().getResourceType();
    } else {
      return contentType != null ?
          resourceTypeHelper.determineResourceType(contentType) :
          Page.ResourceType.OTHER;
    }
  }

  //@VisibleForTesting
  @Nullable
  static AsyncPrettyPrinter createPrettyPrinterForResponse(
      InspectorResponse response,
      @Nullable AsyncPrettyPrinterRegistry registry) {
    if (registry != null) {
      for (int i = 0, count = response.headerCount(); i < count; i++) {
        AsyncPrettyPrinterFactory factory = registry.lookup(response.headerName(i));
        if (factory != null) {
          AsyncPrettyPrinter asyncPrettyPrinter = factory.getInstance(
              response.headerName(i),
              response.headerValue(i));
          return asyncPrettyPrinter;
        }
      }
    }
    return null;
  }

  @Override
  public InputStream interpretResponseStream(
      String requestId,
      @Nullable String contentType,
      @Nullable String contentEncoding,
      @Nullable InputStream availableInputStream,
      ResponseHandler responseHandler) {
    NetworkPeerManager peerManager = getPeerManagerIfEnabled();
    if (peerManager != null) {
      if (availableInputStream == null) {
        responseHandler.onEOF();
        return null;
      }
      Page.ResourceType resourceType =
          contentType != null ?
              getResourceTypeHelper().determineResourceType(contentType) :
              null;

      // There's this weird logic at play that only knows how to base64 decode certain kinds of
      // resources.
      boolean base64Encode = false;
      if (resourceType != null && resourceType == Page.ResourceType.IMAGE) {
        base64Encode = true;
      }

      try {
        OutputStream fileOutputStream =
            peerManager.getResponseBodyFileManager().openResponseBodyFile(
                requestId,
                base64Encode);
        return DecompressionHelper.teeInputWithDecompression(
            peerManager,
            requestId,
            availableInputStream,
            fileOutputStream,
            contentEncoding,
            responseHandler);
      } catch (IOException e) {
        CLog.writeToConsole(
            peerManager,
            Console.MessageLevel.ERROR,
            Console.MessageSource.NETWORK,
            "Error writing response body data for request #" + requestId);
      }
    }
    return availableInputStream;
  }

  @Override
  public void httpExchangeFailed(String requestId, String errorText) {
    loadingFailed(requestId, errorText);
  }

  @Override
  public void responseReadFinished(String requestId) {
    loadingFinished(requestId);
  }

  private void loadingFinished(String requestId) {
    NetworkPeerManager peerManager = getPeerManagerIfEnabled();
    if (peerManager != null) {
      Network.LoadingFinishedParams finishedParams = new Network.LoadingFinishedParams();
      finishedParams.requestId = requestId;
      finishedParams.timestamp = stethoNow() / 1000.0;
      peerManager.sendNotificationToPeers("Network.loadingFinished", finishedParams);
    }
  }

  @Override
  public void responseReadFailed(String requestId, String errorText) {
    loadingFailed(requestId, errorText);
  }

  private void loadingFailed(String requestId, String errorText) {
    NetworkPeerManager peerManager = getPeerManagerIfEnabled();
    if (peerManager != null) {
      Network.LoadingFailedParams failedParams = new Network.LoadingFailedParams();
      failedParams.requestId = requestId;
      failedParams.timestamp = stethoNow() / 1000.0;
      failedParams.errorText = errorText;
      failedParams.type = Page.ResourceType.OTHER;
      peerManager.sendNotificationToPeers("Network.loadingFailed", failedParams);
    }
  }

  @Override
  public void dataSent(
      String requestId,
      int dataLength,
      int encodedDataLength) {
    // The inspector protocol only gives us the dataReceived event, but we can happily combine
    // upstream and downstream data into this to visualize the real size of the request, not
    // strictly the size of the "content" as reported in the UI.
    dataReceived(requestId, dataLength, encodedDataLength);
  }

  @Override
  public void dataReceived(
      String requestId,
      int dataLength,
      int encodedDataLength) {
    NetworkPeerManager peerManager = getPeerManagerIfEnabled();
    if (peerManager != null) {
      Network.DataReceivedParams dataReceivedParams = new Network.DataReceivedParams();
      dataReceivedParams.requestId = requestId;
      dataReceivedParams.timestamp = stethoNow() / 1000.0;
      dataReceivedParams.dataLength = dataLength;
      dataReceivedParams.encodedDataLength = encodedDataLength;
      peerManager.sendNotificationToPeers("Network.dataReceived", dataReceivedParams);
    }
  }

  @Nullable
  private String getContentType(InspectorHeaders headers) {
    // This may need to change in the future depending on how cumbersome header simulation
    // is for the various hooks we expose.
    return headers.firstHeaderValue("Content-Type");
  }

  private static JSONObject formatHeadersAsJSON(InspectorHeaders headers) {
    JSONObject json = new JSONObject();
    for (int i = 0; i < headers.headerCount(); i++) {
      String name = headers.headerName(i);
      String value = headers.headerValue(i);
      try {
        if (json.has(name)) {
          // Multiple headers are separated with a new line.
          json.put(name, json.getString(name) + "\n" + value);
        } else {
          json.put(name, value);
        }
      } catch (JSONException e) {
        throw new RuntimeException(e);
      }
    }
    return json;
  }

  @Nonnull
  private ResourceTypeHelper getResourceTypeHelper() {
    if (mResourceTypeHelper == null) {
      mResourceTypeHelper = new ResourceTypeHelper();
    }
    return mResourceTypeHelper;
  }

  private static long stethoNow() {
    return SystemClock.elapsedRealtime();
  }
}
