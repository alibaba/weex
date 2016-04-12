/**
 * Licensed to the Apache Software Foundation (ASF) under one or more contributor license
 * agreements.  See the NOTICE file distributed with this work for additional information regarding
 * copyright ownership.  The ASF licenses this file to you under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with the License.  You may obtain
 * a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied.  See the License for the specific language governing permissions and limitations
 * under the License.
 */
package com.taobao.weex.dom;

import android.os.Message;
import android.text.TextUtils;

import com.alibaba.fastjson.JSONObject;
import com.taobao.weex.WXSDKManager;
import com.taobao.weex.common.WXModule;
import com.taobao.weex.common.WXModuleAnno;

import java.util.ArrayList;


/**
 * Module class for dom operation. Methods in this class will run in dom thread by default.
 * Actually, methods in this class are wrapper classes, they just wrap method call info, and hand
 * the wrapped info to the {@link WXDomHandler} for further process. This class is also singleton
 * in the {@link com.taobao.weex.WXSDKInstance}
 */
public final class WXDomModule extends WXModule {

  /**
   * Create a body for the current {@link com.taobao.weex.WXSDKInstance} according to given
   * parameter.
   * @param element info about how to create a body
   */
  @WXModuleAnno(moduleMethod = true, runOnUIThread = false)
  public void createBody(JSONObject element) {
    if (element == null) {
      return;
    }
    Message msg = Message.obtain();
    WXDomTask task = new WXDomTask();
    task.instanceId = mWXSDKInstance.getInstanceId();
    task.args = new ArrayList<>();
    task.args.add(element);
    msg.what = WXDomHandler.MsgType.WX_DOM_CREATE_BODY;
    msg.obj = task;
    WXSDKManager.getInstance().getWXDomManager().sendMessage(msg);
  }

  /**
   * Update {@link WXDomObject#attr}
   * @param ref {@link WXDomObject#ref}
   * @param attr the expected attr
   */
  @WXModuleAnno(moduleMethod = true, runOnUIThread = false)
  public void updateAttrs(String ref, JSONObject attr) {
    if (TextUtils.isEmpty(ref) || attr == null || attr.size() < 1) {
      return;
    }
    Message msg = Message.obtain();
    WXDomTask task = new WXDomTask();
    task.instanceId = mWXSDKInstance.getInstanceId();
    task.args = new ArrayList<>();
    task.args.add(ref);
    task.args.add(attr);
    msg.what = WXDomHandler.MsgType.WX_DOM_UPDATE_ATTRS;
    msg.obj = task;
    WXSDKManager.getInstance().getWXDomManager().sendMessage(msg);
  }

  /**
   * Update {@link WXDomObject#style}
   * @param ref {@link WXDomObject#ref}
   * @param style the expected style
   */
  @WXModuleAnno(moduleMethod = true, runOnUIThread = false)
  public void updateStyle(String ref, JSONObject style) {
    if (TextUtils.isEmpty(ref) || style == null || style.size() < 1) {
      return;
    }
    Message msg = Message.obtain();
    WXDomTask task = new WXDomTask();
    task.instanceId = mWXSDKInstance.getInstanceId();
    task.args = new ArrayList<>();
    task.args.add(ref);
    task.args.add(style);
    msg.what = WXDomHandler.MsgType.WX_DOM_UPDATE_STYLE;
    msg.obj = task;
    WXSDKManager.getInstance().getWXDomManager().sendMessage(msg);
  }

  /**
   * Remove a node for the node tree.
   * @param ref {@link WXDomObject#ref} of the node to be removed.
   */
  @WXModuleAnno(moduleMethod = true, runOnUIThread = false)
  public void removeElement(String ref) {
    if (TextUtils.isEmpty(ref)) {
      return;
    }
    Message msg = Message.obtain();
    WXDomTask task = new WXDomTask();
    task.instanceId = mWXSDKInstance.getInstanceId();
    task.args = new ArrayList<>();
    task.args.add(ref);
    msg.what = WXDomHandler.MsgType.WX_DOM_REMOVE_DOM;
    msg.obj = task;
    WXSDKManager.getInstance().getWXDomManager().sendMessage(msg);
  }

  /**
   * Add a {@link WXDomObject} to the specified parent as its given n-th child.
   * @param parentRef {@link WXDomObject#ref} of the parent.
   * @param element the node to be added
   * @param index the expected index that the new dom in its new parent
   */
  @WXModuleAnno(moduleMethod = true, runOnUIThread = false)
  public void addElement(String parentRef, JSONObject element, Integer index) {
    if (element == null
        || TextUtils.isEmpty(parentRef)) {
      return;
    }
    Message msg = Message.obtain();
    WXDomTask task = new WXDomTask();
    task.instanceId = mWXSDKInstance.getInstanceId();
    task.args = new ArrayList<>();
    task.args.add(parentRef);
    task.args.add(element);
    task.args.add(index);
    msg.what = WXDomHandler.MsgType.WX_DOM_ADD_DOM;
    msg.obj = task;
    WXSDKManager.getInstance().getWXDomManager().sendMessage(msg);
  }

  /**
   * Move the DomElement to the specified parent as its given n-th child.
   * @param ref {@link WXDomObject#ref} of the node to be moved.
   * @param parentRef {@link WXDomObject#ref} of the parent.
   * @param index the expected index that the dom in its new parent
   */
  @WXModuleAnno(moduleMethod = true, runOnUIThread = false)
  public void moveElement(String ref, String parentRef, Integer index) {
    if (TextUtils.isEmpty(ref)
        || TextUtils.isEmpty(parentRef)) {
      return;
    }
    Message msg = Message.obtain();
    WXDomTask task = new WXDomTask();
    task.instanceId = mWXSDKInstance.getInstanceId();
    task.args = new ArrayList<>();
    task.args.add(ref);
    task.args.add(parentRef);
    task.args.add(index);
    msg.what = WXDomHandler.MsgType.WX_DOM_MOVE_DOM;
    msg.obj = task;
    WXSDKManager.getInstance().getWXDomManager().sendMessage(msg);
  }

  /**
   * Add eventListener for the specified {@link WXDomObject}
   * @param ref {@link WXDomObject#ref} of the node
   * @param type the type of the event listener to be added.
   */
  @WXModuleAnno(moduleMethod = true, runOnUIThread = false)
  public void addEvent(String ref, String type) {
    if (TextUtils.isEmpty(ref) || TextUtils.isEmpty(type)) {
      return;
    }
    Message msg = Message.obtain();
    WXDomTask task = new WXDomTask();
    task.instanceId = mWXSDKInstance.getInstanceId();
    task.args = new ArrayList<>();
    task.args.add(ref);
    task.args.add(type);
    msg.what = WXDomHandler.MsgType.WX_DOM_ADD_EVENT;
    msg.obj = task;
    WXSDKManager.getInstance().getWXDomManager().sendMessage(msg);
  }

  /**
   * Remove eventListener for the specified {@link WXDomObject}
   * @param ref {@link WXDomObject#ref} of the node
   * @param type the type of the event listener to be removed.
   */
  @WXModuleAnno(moduleMethod = true, runOnUIThread = false)
  public void removeEvent(String ref, String type) {
    if (TextUtils.isEmpty(ref) || TextUtils.isEmpty(type)) {
      return;
    }
    Message msg = Message.obtain();
    WXDomTask task = new WXDomTask();
    task.instanceId = mWXSDKInstance.getInstanceId();
    task.args = new ArrayList<>();
    task.args.add(ref);
    task.args.add(type);
    msg.what = WXDomHandler.MsgType.WX_DOM_REMOVE_EVENT;
    msg.obj = task;
    WXSDKManager.getInstance().getWXDomManager().sendMessage(msg);
  }

  /**
   * Notify the {@link WXDomManager} that creation of dom tree is finished.
   * This notify is given by JS.
   */
  @WXModuleAnno(moduleMethod = true, runOnUIThread = false)
  public void createFinish() {
    Message msg = Message.obtain();
    WXDomTask task = new WXDomTask();
    task.instanceId = mWXSDKInstance.getInstanceId();
    msg.what = WXDomHandler.MsgType.WX_DOM_CREATE_FINISH;
    msg.obj = task;
    WXSDKManager.getInstance().getWXDomManager().sendMessage(msg);
  }

  /**
   * Notify the {@link WXDomManager} that refreshing of dom tree is finished.
   * This notify is given by JS.
   */
  @WXModuleAnno(moduleMethod = true, runOnUIThread = false)
  public void refreshFinish() {
    Message msg = Message.obtain();
    WXDomTask task = new WXDomTask();
    task.instanceId = mWXSDKInstance.getInstanceId();
    msg.what = WXDomHandler.MsgType.WX_DOM_REFRESH_FINISH;
    msg.obj = task;
    WXSDKManager.getInstance().getWXDomManager().sendMessage(msg);
  }

  /**
   * Scroll the specified {@link WXDomObject} to given offset in given duration
   * @param ref {@link WXDomObject#ref} of specified dom object
   * @param options scroll option, like {offset:0, duration:300}
   */
  @WXModuleAnno(moduleMethod = true, runOnUIThread = false)
  public void scrollToElement(String ref, JSONObject options) {
    if (TextUtils.isEmpty(ref) || options == null || options.size() < 1) {
      return;
    }

    Message msg = Message.obtain();
    WXDomTask task = new WXDomTask();
    task.instanceId = mWXSDKInstance.getInstanceId();
    task.args = new ArrayList<>();
    task.args.add(ref);
    task.args.add(options);
    msg.what = WXDomHandler.MsgType.WX_DOM_SCROLLTO;
    msg.obj = task;
    WXSDKManager.getInstance().getWXDomManager().sendMessage(msg);
  }
}
