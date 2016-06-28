/*
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

package com.taobao.weex.devtools.inspector.protocol.module;

import android.content.Context;
import android.support.annotation.Nullable;
import android.util.Log;

import com.taobao.weex.devtools.common.ProcessUtil;
import com.taobao.weex.devtools.inspector.domstorage.SharedPreferencesHelper;
import com.taobao.weex.devtools.inspector.jsonrpc.JsonRpcException;
import com.taobao.weex.devtools.inspector.jsonrpc.JsonRpcPeer;
import com.taobao.weex.devtools.inspector.jsonrpc.JsonRpcResult;
import com.taobao.weex.devtools.inspector.jsonrpc.protocol.JsonRpcError;
import com.taobao.weex.devtools.inspector.protocol.ChromeDevtoolsDomain;
import com.taobao.weex.devtools.inspector.protocol.ChromeDevtoolsMethod;
import com.taobao.weex.devtools.inspector.screencast.ScreencastDispatcher;
import com.taobao.weex.devtools.json.ObjectMapper;
import com.taobao.weex.devtools.json.annotation.JsonProperty;
import com.taobao.weex.devtools.json.annotation.JsonValue;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;

public class Page implements ChromeDevtoolsDomain {
  private final Context mContext;
  private final ObjectMapper mObjectMapper = new ObjectMapper();

  @Nullable
  private ScreencastDispatcher mScreencastDispatcher;

  public Page(Context context) {
    mContext = context;
  }

  @ChromeDevtoolsMethod
  public void enable(JsonRpcPeer peer, JSONObject params) {
    notifyExecutionContexts(peer);
    sendWelcomeMessage(peer);
  }

  @ChromeDevtoolsMethod
  public void disable(JsonRpcPeer peer, JSONObject params) {
  }

  private void notifyExecutionContexts(JsonRpcPeer peer) {
    ExecutionContextDescription context = new ExecutionContextDescription();
    context.frameId = "1";
    context.id = 1;
    ExecutionContextCreatedParams params = new ExecutionContextCreatedParams();
    params.context = context;
    peer.invokeMethod("Runtime.executionContextCreated", params, null /* callback */);
  }

  private void sendWelcomeMessage(JsonRpcPeer peer) {
    Console.ConsoleMessage message = new Console.ConsoleMessage();
    message.source = Console.MessageSource.JAVASCRIPT;
    message.level = Console.MessageLevel.LOG;
    message.text =
// Note: not using Android resources so we can maintain .jar distribution for now.
"_____/\\\\\\\\\\\\\\\\\\\\\\_______________________________________________/\\\\\\_______________________\n" +
" ___/\\\\\\/////////\\\\\\____________________________________________\\/\\\\\\_______________________\n" +
"  __\\//\\\\\\______\\///______/\\\\\\_________________________/\\\\\\______\\/\\\\\\_______________________\n" +
"   ___\\////\\\\\\__________/\\\\\\\\\\\\\\\\\\\\\\_____/\\\\\\\\\\\\\\\\___/\\\\\\\\\\\\\\\\\\\\\\_\\/\\\\\\_____________/\\\\\\\\\\____\n" +
"    ______\\////\\\\\\______\\////\\\\\\////____/\\\\\\/////\\\\\\_\\////\\\\\\////__\\/\\\\\\\\\\\\\\\\\\\\____/\\\\\\///\\\\\\__\n" +
"     _________\\////\\\\\\______\\/\\\\\\_______/\\\\\\\\\\\\\\\\\\\\\\_____\\/\\\\\\______\\/\\\\\\/////\\\\\\__/\\\\\\__\\//\\\\\\_\n" +
"      __/\\\\\\______\\//\\\\\\_____\\/\\\\\\_/\\\\__\\//\\\\///////______\\/\\\\\\_/\\\\__\\/\\\\\\___\\/\\\\\\_\\//\\\\\\__/\\\\\\__\n" +
"       _\\///\\\\\\\\\\\\\\\\\\\\\\/______\\//\\\\\\\\\\____\\//\\\\\\\\\\\\\\\\\\\\____\\//\\\\\\\\\\___\\/\\\\\\___\\/\\\\\\__\\///\\\\\\\\\\/___\n" +
"        ___\\///////////_________\\/////______\\//////////______\\/////____\\///____\\///_____\\/////_____\n" +
"         Welcome to WEEX!\n" +
"          Attached to " + ProcessUtil.getProcessName() + "\n";
    Console.MessageAddedRequest messageAddedRequest = new Console.MessageAddedRequest();
    messageAddedRequest.message = message;
    peer.invokeMethod("Console.messageAdded", messageAddedRequest, null /* callback */);
  }

  @ChromeDevtoolsMethod
  public JsonRpcResult getResourceContent(JsonRpcPeer peer, JSONObject params) throws JsonRpcException {
    try {
      String frameId = params.getString("frameId");
      String url = params.getString("url");
      return readResourceContent(frameId, "1");
    } catch (IOException e) {
      throw new JsonRpcException(new JsonRpcError(JsonRpcError.ErrorCode.INTERNAL_ERROR,
              e.toString(),
              null /* data */));
    } catch (JSONException e) {
      throw new JsonRpcException(new JsonRpcError(JsonRpcError.ErrorCode.INTERNAL_ERROR,
              e.toString(),
              null /* data */));
    }
  }

  // TODO:实现具体的读取ResourceContent
  private getResourceContentResponse readResourceContent(String frameId, String url)
          throws IOException, JsonRpcException {
    getResourceContentResponse response = new getResourceContentResponse();
//    ResponseBodyData bodyData;
//    try {
//      bodyData = mResponseBodyFileManager.readFile(url);
//    } catch (OutOfMemoryError e) {
//      throw new JsonRpcException(new JsonRpcError(JsonRpcError.ErrorCode.INTERNAL_ERROR,
//              e.toString(),
//              null /* data */));
//    }
//    response.content = bodyData.data;
//    response.base64Encoded = bodyData.base64Encoded;
    return response;
  }

  // Dog science...
  @ChromeDevtoolsMethod
  public JsonRpcResult getResourceTree(JsonRpcPeer peer, JSONObject params) {
    // The DOMStorage module expects one key/value store per "security origin" which has a 1:1
    // relationship with resource tree frames.
    List<String> prefsTags = SharedPreferencesHelper.getSharedPreferenceTags(mContext);
    Iterator<String> prefsTagsIter = prefsTags.iterator();

    FrameResourceTree tree = createSimpleFrameResourceTree(
        "1",
        null /* parentId */,
        "Weex",
        prefsTagsIter.hasNext() ? prefsTagsIter.next() : "");
    if (tree.childFrames == null) {
      tree.childFrames = new ArrayList<FrameResourceTree>();
    }

    int nextChildFrameId = 1;
    while (prefsTagsIter.hasNext()) {
      String frameId = "1." + (nextChildFrameId++);
      String prefsTag = prefsTagsIter.next();
      FrameResourceTree child = createSimpleFrameResourceTree(
          frameId,
          "1",
          "Child #" + frameId,
          prefsTag);
      tree.childFrames.add(child);
    }

    GetResourceTreeParams resultParams = new GetResourceTreeParams();
    resultParams.frameTree = tree;
    return resultParams;
  }

  private static FrameResourceTree createSimpleFrameResourceTree(
      String id,
      String parentId,
      String name,
      String securityOrigin) {
    Frame frame = new Frame();
    frame.id = id;
    frame.parentId = parentId;
    frame.loaderId = "1";
    frame.name = name;
    frame.url = "";
    frame.securityOrigin = securityOrigin;
    frame.mimeType = "text/plain";
    FrameResourceTree tree = new FrameResourceTree();
    tree.frame = frame;
    tree.resources = Collections.emptyList();
    tree.childFrames = null;
    return tree;
  }

  private static FrameResourceTree createMockFrameResourceTree(
          String id,
          String parentId,
          String name,
          String securityOrigin) {
    Frame frame = new Frame();
    frame.id = id;
    frame.parentId = parentId;
    frame.loaderId = "2";
    frame.name = name;
    frame.url = "http://www.sina.com";
    frame.securityOrigin = securityOrigin;
    frame.mimeType = "text/plain";
    FrameResourceTree tree = new FrameResourceTree();
    tree.frame = frame;
    tree.resources = createMockResource();// createMockResource();
    tree.childFrames = null;
    Log.v("FrameResourceTree", "frame : " + ", name : " + frame.name + ", mimeType : " + frame.mimeType);
    return tree;
  }

  private static List<Resource> createMockResource() {
    ArrayList<Resource> list = new ArrayList<Resource>();
    Resource resource = new Resource();
    resource.url="http://apod.nasa.gov/apod/ap160601.html";
    resource.type= ResourceType.DOCUMENT;
    resource.mimeType="text/HTML";

    Resource resource2 = new Resource();
    resource2.url="http://30.10.216.161:12580/examples/build/hello.js";
    resource2.type= ResourceType.SCRIPT;
    resource2.mimeType="text/javascript";
    list.add(resource);
    list.add(resource2);

    return list;
  }

  @ChromeDevtoolsMethod
  public JsonRpcResult canScreencast(JsonRpcPeer peer, JSONObject params) {
    return new SimpleBooleanResult(true);
  }

  @ChromeDevtoolsMethod
  public JsonRpcResult hasTouchInputs(JsonRpcPeer peer, JSONObject params) {
    return new SimpleBooleanResult(false);
  }

  @ChromeDevtoolsMethod
  public void setDeviceMetricsOverride(JsonRpcPeer peer, JSONObject params) {
  }

  @ChromeDevtoolsMethod
  public void clearDeviceOrientationOverride(JsonRpcPeer peer, JSONObject params) {
  }

  @ChromeDevtoolsMethod
  public void startScreencast(final JsonRpcPeer peer, JSONObject params) {
    final StartScreencastRequest request = mObjectMapper.convertValue(
        params, StartScreencastRequest.class);
    if (mScreencastDispatcher == null) {
      mScreencastDispatcher = new ScreencastDispatcher();
      mScreencastDispatcher.startScreencast(peer, request);
    }
  }

  @ChromeDevtoolsMethod
  public void stopScreencast(JsonRpcPeer peer, JSONObject params) {
    if (mScreencastDispatcher != null) {
      mScreencastDispatcher.stopScreencast();
      mScreencastDispatcher = null;
    }
  }

  @ChromeDevtoolsMethod
  public void screencastFrameAck(JsonRpcPeer peer, JSONObject params) {
    // Nothing to do here, just need to make sure Chrome doesn't get an error that this method
    // isn't implemented
  }

  @ChromeDevtoolsMethod
  public void clearGeolocationOverride(JsonRpcPeer peer, JSONObject params) {
  }

  @ChromeDevtoolsMethod
  public void setTouchEmulationEnabled(JsonRpcPeer peer, JSONObject params) {
  }

  @ChromeDevtoolsMethod
  public void setEmulatedMedia(JsonRpcPeer peer, JSONObject params) {
  }

  @ChromeDevtoolsMethod
  public void setShowViewportSizeOnResize(JsonRpcPeer peer, JSONObject params) {
  }

  private static class getResourceContentResponse implements JsonRpcResult {
    @JsonProperty(required = true)
    public String content;

    @JsonProperty(required = true)
    public boolean base64Encoded;
  }

  private static class GetResourceTreeParams implements JsonRpcResult {
    @JsonProperty(required = true)
    public FrameResourceTree frameTree;
  }

  private static class FrameResourceTree {
    @JsonProperty(required = true)
    public Frame frame;

    @JsonProperty
    public List<FrameResourceTree> childFrames;

    @JsonProperty(required = true)
    public List<Resource> resources;
  }

  private static class Frame {
    @JsonProperty(required = true)
    public String id;

    @JsonProperty
    public String parentId;

    @JsonProperty(required = true)
    public String loaderId;

    @JsonProperty
    public String name;

    @JsonProperty(required = true)
    public String url;

    @JsonProperty(required = true)
    public String securityOrigin;

    @JsonProperty(required = true)
    public String mimeType;
  }

  private static class Resource {
    @JsonProperty(required = true)
    public String url;
    @JsonProperty(required = true)
    public ResourceType type;
    @JsonProperty(required = true)
    public String mimeType;
    @JsonProperty
    public boolean failed;
    @JsonProperty
    public boolean canceled;
  }

  public enum ResourceType {
    DOCUMENT("Document"),
    STYLESHEET("Stylesheet"),
    IMAGE("Image"),
    FONT("Font"),
    SCRIPT("Script"),
    XHR("XHR"),
    WEBSOCKET("WebSocket"),
    OTHER("Other");

    private final String mProtocolValue;

    private ResourceType(String protocolValue) {
      mProtocolValue = protocolValue;
    }

    @JsonValue
    public String getProtocolValue() {
      return mProtocolValue;
    }
  }

  private static class ExecutionContextCreatedParams {
    @JsonProperty(required = true)
    public ExecutionContextDescription context;
  }

  private static class ExecutionContextDescription {
    @JsonProperty(required = true)
    public String frameId;

    @JsonProperty(required = true)
    public int id;
  }

  public static class ScreencastFrameEvent {
    @JsonProperty(required = true)
    public String data;

    @JsonProperty(required = true)
    public ScreencastFrameEventMetadata metadata;
  }

  public static class ScreencastFrameEventMetadata {
    @JsonProperty(required = true)
    public int pageScaleFactor;
    @JsonProperty(required = true)
    public int offsetTop;
    @JsonProperty(required = true)
    public int deviceWidth;
    @JsonProperty(required = true)
    public int deviceHeight;
    @JsonProperty(required = true)
    public int scrollOffsetX;
    @JsonProperty(required = true)
    public int scrollOffsetY;
  }

  public static class StartScreencastRequest {
    @JsonProperty
    public String format;
    @JsonProperty
    public int quality;
    @JsonProperty
    public int maxWidth;
    @JsonProperty
    public int maxHeight;
  }
}
