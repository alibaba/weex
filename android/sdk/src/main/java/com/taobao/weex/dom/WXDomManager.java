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

import android.os.Handler;
import android.os.Message;

import com.alibaba.fastjson.JSONObject;
import com.taobao.weex.WXEnvironment;
import com.taobao.weex.WXSDKManager;
import com.taobao.weex.common.WXRuntimeException;
import com.taobao.weex.common.WXThread;
import com.taobao.weex.ui.WXRenderManager;
import com.taobao.weex.utils.WXUtils;

import java.util.Iterator;
import java.util.Map.Entry;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Class for managing dom operation. This class works as the client in the command pattern, it
 * will call {@link WXDomStatement} for creating command object and invoking corresponding
 * operation.
 * Methods in this class normally need to be invoked in dom thread, otherwise, {@link
 * WXRuntimeException} may be thrown.
 */
public final class WXDomManager {

  private WXThread mDomThread;
  private Handler mDomHandler;
  private WXRenderManager mWXRenderManager;
  private ConcurrentHashMap<String, WXDomStatement> mDomRegistries;

  public WXDomManager(WXRenderManager renderManager) {
    mWXRenderManager = renderManager;
    mDomRegistries = new ConcurrentHashMap<>();
    mDomThread = new WXThread("WXDomThread", new WXDomHandler(this));
    mDomHandler = mDomThread.getHandler();
  }

  public void sendEmptyMessageDelayed(int what, long delayMillis) {
    if (mDomHandler == null || mDomThread == null
        || !mDomThread.isWXThreadAlive() || mDomThread.getLooper() == null) {
      return;
    }
    mDomHandler.sendEmptyMessageDelayed(what, delayMillis);
  }

  public void sendMessage(Message msg) {
    if (msg == null || mDomHandler == null || mDomThread == null
        || !mDomThread.isWXThreadAlive() || mDomThread.getLooper() == null) {
      return;
    }
    mDomHandler.sendMessage(msg);
  }

  /**
   * Remove the specified dom statement. This is called when {@link WXSDKManager} destroy
   * instances.
   * @param instanceId {@link com.taobao.weex.WXSDKInstance#mInstanceId} for the instance
   */
  public void removeDomStatement(String instanceId) {
    if (!WXUtils.isUiThread()) {
      throw new WXRuntimeException("[WXDomManager] removeDomStatement");
    }
    final WXDomStatement statement = mDomRegistries.remove(instanceId);
    if (statement != null) {
      post(new Runnable() {

        @Override
        public void run() {
          statement.destroy();
        }
      });
    }
  }

  public void post(Runnable task) {
    if (mDomHandler == null || task == null || mDomThread == null || !mDomThread.isWXThreadAlive()
        || mDomThread.getLooper() == null) {
      return;
    }
    mDomHandler.post(task);
  }

  /**
   * Destroy current instance
   */
  public void destroy() {
    if (mDomThread != null && mDomThread.isWXThreadAlive()) {
      mDomThread.quit();
    }
    if (mDomRegistries != null) {
      mDomRegistries.clear();
    }
    mDomHandler = null;
    mDomThread = null;
  }

  /**
   * Invoke {@link WXDomStatement} for creating body according to the JSONObject.
   * @param instanceId {@link com.taobao.weex.WXSDKInstance#mInstanceId} for the instance
   * @param element the jsonObject according to which to create command object.
   */
  void createBody(String instanceId, JSONObject element) {
    if (!isDomThread()) {
      throw new WXRuntimeException("Create body operation must be done in dom thread");
    }
    WXDomStatement statement = new WXDomStatement(instanceId, mWXRenderManager);
    mDomRegistries.put(instanceId, statement);
    statement.createBody(element);
  }

  private boolean isDomThread() {
    return !WXEnvironment.isApkDebugable() || Thread.currentThread().getId() == mDomThread.getId();
  }

  /**
   * Batch the execution of {@link WXDomStatement}
   */
  void batch() {
    if (!isDomThread()) {
      throw new WXRuntimeException("Batch operation must be done in dom thread");
    }

    Iterator<Entry<String, WXDomStatement>> iterator = mDomRegistries.entrySet().iterator();
    while (iterator.hasNext()) {
      iterator.next().getValue().batch();
    }
  }

  /**
   * Invoke {@link WXDomStatement} for adding a dom node to its parent in a specific location.
   *
   * @param instanceId {@link com.taobao.weex.WXSDKInstance#mInstanceId} for the instance
   * @param element the dom object in the form of JSONObject
   * @param parentRef parent to which the dom is added.
   * @param index the location of which the dom is added.
   */
  void addDom(String instanceId, String parentRef, JSONObject element, int index) {
    if (!isDomThread()) {
      throw new WXRuntimeException("Add dom operation must be done in dom thread");
    }
    WXDomStatement statement = mDomRegistries.get(instanceId);
    if (statement == null) {
      return;
    }
    statement.addDom(element, parentRef, index);
  }

  /**
   * Invoke {@link WXDomStatement} for removing the specified {@link WXDomObject}.
   *
   * @param instanceId {@link com.taobao.weex.WXSDKInstance#mInstanceId} for the instance
   * @param ref {@link WXDomObject#ref} of the dom.
   */
  //removeElement(ref:String)
  void removeDom(String instanceId, String ref) {
    if (!isDomThread()) {
      throw new WXRuntimeException("Remove dom operation must be done in dom thread");
    }
    WXDomStatement statement = mDomRegistries.get(instanceId);
    if (statement == null) {
      return;
    }
    statement.removeDom(ref);
  }


  /**
   * Invoke {@link WXDomStatement} for moving the specific {@link WXDomObject} to a new parent.
   *
   * @param instanceId {@link com.taobao.weex.WXSDKInstance#mInstanceId} for the instance
   * @param ref {@link WXDomObject#ref} of the dom to be moved.
   * @param parentRef {@link WXDomObject#ref} of the new parent DOM node
   * @param index the index of the dom to be inserted in the new parent.
   */
  void moveDom(String instanceId, String ref, String parentRef, int index) {
    if (!isDomThread()) {
      throw new WXRuntimeException("Move dom operation must be done in dom thread");
    }
    WXDomStatement statement = mDomRegistries.get(instanceId);
    if (statement == null) {
      return;
    }
    statement.moveDom(ref, parentRef, index);
  }

  /**
   * Invoke {@link WXDomStatement} for updating the {@link WXDomObject#attr} according to the
   * given attribute.
   *
   * @param instanceId {@link com.taobao.weex.WXSDKInstance#mInstanceId} for the instance
   * @param ref {@link WXDomObject#ref} of the dom.
   * @param attr the new attribute. This attribute is only a part of the full attribute, and will be
   *             merged into {@link WXDomObject#attr}
   */
  void updateAttrs(String instanceId, String ref, JSONObject attr) {
    if (!isDomThread()) {
      throw new WXRuntimeException("UpdateAttrs operation must be done in dom thread");
    }
    WXDomStatement statement = mDomRegistries.get(instanceId);
    if (statement == null) {
      return;
    }
    statement.updateAttrs(ref, attr);
  }

  /**
   * Invoke {@link WXDomStatement} for updating style
   *
   * @param instanceId {@link com.taobao.weex.WXSDKInstance#mInstanceId} for the instance
   * @param ref the given dom object
   * @param style the given style.
   */
  void updateStyle(String instanceId, String ref, JSONObject style) {
    if (!isDomThread()) {
      throw new WXRuntimeException("UpdateStyle operation must be done in dom thread");
    }
    WXDomStatement statement = mDomRegistries.get(instanceId);
    if (statement == null) {
      return;
    }
    statement.updateStyle(ref, style);
  }

  /**
   * Invoke {@link WXDomStatement} for adding a default event listener to the corresponding {@link
   * WXDomObject}.
   *
   * @param instanceId {@link com.taobao.weex.WXSDKInstance#mInstanceId} for the instance
   * @param ref {@link WXDomObject#ref} of the dom.
   * @param type the type of the event, this may be a plain event defined in
   * {@link com.taobao.weex.ui.component.WXEventType} or a gesture defined in {@link com.taobao
   * .weex.ui.view.gesture.WXGestureType}
   */
  void addEvent(String instanceId, String ref, String type) {
    if (!isDomThread()) {
      throw new WXRuntimeException("AddEvent operation must be done in dom thread");
    }
    WXDomStatement statement = mDomRegistries.get(instanceId);
    if (statement == null) {
      return;
    }
    statement.addEvent(ref, type);
  }

  /**
   * Invoke the {@link WXDomStatement} for removing the event listener of the corresponding {@link
   * WXDomObject}.
   * @param instanceId {@link com.taobao.weex.WXSDKInstance#mInstanceId} for the instance
   * @param ref {@link WXDomObject#ref} of the dom.
   * @param type the type of the event, this may be a plain event defined in
   * {@link com.taobao.weex.ui.component.WXEventType} or a gesture defined in {@link com.taobao
   * .weex.ui.view.gesture.WXGestureType}
   */
  void removeEvent(String instanceId, String ref, String type) {
    if (!isDomThread()) {
      throw new WXRuntimeException("RemoveEvent operation must be done in dom thread");
    }
    WXDomStatement statement = mDomRegistries.get(instanceId);
    if (statement == null) {
      return;
    }
    statement.removeEvent(ref, type);
  }

  /**
   * Invoke the {@link WXDomStatement} for scrolling the given view to the specified position.
   * @param instanceId {@link com.taobao.weex.WXSDKInstance#mInstanceId} for the instance to
   *                                                                    scroll.
   * @param ref {@link WXDomObject#ref} of the dom.
   * @param options the specified position
   */
  void scrollToDom(String instanceId, String ref, JSONObject options) {
    if (!isDomThread()) {
      throw new WXRuntimeException("ScrollToDom operation must be done in dom thread");
    }
    WXDomStatement statement = mDomRegistries.get(instanceId);
    if (statement == null) {
      return;
    }
    statement.scrollToDom(ref, options);
  }

  /**
   * Notify the creating of whole dom tree has finished. This message is sent by JS.
   * @param instanceId {@link com.taobao.weex.WXSDKInstance#mInstanceId} for the instance to
   *                                                                    notify.
   */
  void createFinish(String instanceId) {
    if (!isDomThread()) {
      throw new WXRuntimeException("CreateFinish operation must be done in dom thread");
    }
    WXDomStatement statement = mDomRegistries.get(instanceId);
    if (statement == null) {
      return;
    }
    statement.createFinish();
  }

  /**
   * Notify the refreshing has finished.
   * @param instanceId {@link com.taobao.weex.WXSDKInstance#mInstanceId} for the instance to
   *                                                                    notify.
   */
  void refreshFinish(String instanceId) {
    if (!isDomThread()) {
      throw new WXRuntimeException("RefreshFinish operation must be done in dom thread");
    }
    WXDomStatement statement = mDomRegistries.get(instanceId);
    if (statement == null) {
      return;
    }
    statement.refreshFinish();
  }
}
