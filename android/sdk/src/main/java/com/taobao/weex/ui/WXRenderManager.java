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
package com.taobao.weex.ui;

import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.common.WXRuntimeException;
import com.taobao.weex.dom.WXDomObject;
import com.taobao.weex.dom.flex.Spacing;
import com.taobao.weex.ui.component.WXComponent;
import com.taobao.weex.utils.WXUtils;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Manager class for render operation, mainly for managing {@link WXRenderStatement}.
 * This is <strong>not</strong> a thread-safe class
 */
public class WXRenderManager {

  private ConcurrentHashMap<String, WXRenderStatement> mRegistries;
  private WXRenderHandler mWXRenderHandler;

  public WXRenderManager() {
    mRegistries = new ConcurrentHashMap<>();
    mWXRenderHandler = new WXRenderHandler();
  }

  public WXRenderStatement getWXRenderStatement(String instanceId) {
    return mRegistries.get(instanceId);
  }

  public WXSDKInstance getWXSDKInstance(String instanceId) {
    WXRenderStatement statement = mRegistries.get(instanceId);
    if (statement == null) {
      return null;
    }
    return statement.getWXSDKInstance();
  }

  public void postOnUiThread(Runnable runnable, long delayMillis) {
    mWXRenderHandler.postDelayed(runnable, delayMillis);
  }

  /**
   * Remove renderStatement, can only be invoked in UI thread.
   * @param instanceId {@link WXSDKInstance#mInstanceId}
   */
  public void removeRenderStatement(String instanceId) {
    if (!WXUtils.isUiThread()) {
      throw new WXRuntimeException("[WXRenderManager] removeRenderStatement can only be called in main thread");
    }
    WXRenderStatement statement = mRegistries.remove(instanceId);
    if (statement != null) {
      statement.destroy();
    }
  }

  //TODO Use runnable temporarily
  public void runOnThread(final String instanceId, final IWXRenderTask task) {
    mWXRenderHandler.post(new Runnable() {

      @Override
      public void run() {
        if (mRegistries.get(instanceId) == null) {
          return;
        }
        task.execute();
      }
    });
  }

  public void flushView(final String instanceId, final String ref) {
    mWXRenderHandler.post(new Runnable() {

      @Override
      public void run() {
        WXRenderStatement statement = mRegistries.get(instanceId);
        if (statement == null) {
          return;
        }
        statement.flushView(ref);
      }
    });
  }

  public void createInstance(WXSDKInstance instance, String instanceId) {
    mRegistries.put(instanceId, new WXRenderStatement(instance, instanceId));
  }

  public void createBody(String instanceId, WXComponent component) {
    WXRenderStatement statement = mRegistries.get(instanceId);
    if (statement == null) {
      return;
    }
    statement.createBody(component);
  }

  public WXComponent createBodyOnDomThread(String instanceId, WXDomObject domObject) {
    WXRenderStatement statement = mRegistries.get(instanceId);
    if (statement == null) {
      return null;
    }
    return statement.createBodyOnDomThread(domObject);
  }

  public void setLayout(String instanceId, String ref, WXDomObject domObject) {
    WXRenderStatement statement = mRegistries.get(instanceId);
    if (statement == null) {
      return;
    }
    statement.setLayout(ref, domObject);
  }

  /**
   * Set extra info, other than attribute and style
   */
  public void setExtra(String instanceId, String ref, Object extra) {
    WXRenderStatement statement = mRegistries.get(instanceId);
    if (statement == null) {
      return;
    }
    statement.setExtra(ref, extra);
  }

  public void setPadding(String instanceId, String ref, Spacing padding, Spacing border) {
    WXRenderStatement statement = mRegistries.get(instanceId);
    if (statement == null) {
      return;
    }
    statement.setPadding(ref, padding, border);
  }

  public void addComponent(String instanceId, WXDomObject dom, String parentRef, int index) {
    WXRenderStatement statement = mRegistries.get(instanceId);
    if (statement == null) {
      return;
    }
    statement.addComponent(dom, parentRef, index);
  }

  public WXComponent createComponentOnDomThread(String instanceId, WXDomObject dom, String parentRef, int index) {
    WXRenderStatement statement = mRegistries.get(instanceId);
    if (statement == null) {
      return null;
    }
    return statement.createComponentOnDomThread(dom, parentRef, index);
  }

  public void addComponent(String instanceId, WXComponent component, String parentRef, int index) {
    WXRenderStatement statement = mRegistries.get(instanceId);
    if (statement == null) {
      return;
    }
    statement.addComponent(component, parentRef, index);
  }

  public void removeComponent(String instanceId, String ref) {
    WXRenderStatement statement = mRegistries.get(instanceId);
    if (statement == null) {
      return;
    }
    statement.removeComponent(ref);
  }

  public void moveComponent(String instanceId, String ref, String parentRef, int index) {
    WXRenderStatement statement = mRegistries.get(instanceId);
    if (statement == null) {
      return;
    }
    statement.move(ref, parentRef, index);
  }

  public void updateAttrs(String instanceId, String ref, Map<String, Object> attrs) {
    WXRenderStatement statement = mRegistries.get(instanceId);
    if (statement == null) {
      return;
    }
    statement.updateAttrs(ref, attrs);
  }

  public void updateStyle(String instanceId, String ref, Map<String, Object> style) {
    WXRenderStatement statement = mRegistries.get(instanceId);
    if (statement == null) {
      return;
    }
    statement.updateStyle(ref, style);
  }

  public void addEvent(String instanceId, String ref, String type) {
    WXRenderStatement statement = mRegistries.get(instanceId);
    if (statement == null) {
      return;
    }
    statement.addEvent(ref, type);
  }

  public void removeEvent(String instanceId, String ref, String type) {
    WXRenderStatement statement = mRegistries.get(instanceId);
    if (statement == null) {
      return;
    }
    statement.removeEvent(ref, type);
  }

  public void scrollToComponent(String instanceId, String ref, Map<String, Object> options) {
    WXRenderStatement statement = mRegistries.get(instanceId);
    if (statement == null) {
      return;
    }
    statement.scrollTo(ref, options);
  }

  public void createFinish(String instanceId, int width, int height) {
    WXRenderStatement statement = mRegistries.get(instanceId);
    if (statement == null) {
      return;
    }
    statement.createFinish(width, height);
  }

  public void refreshFinish(String instanceId, int width, int height) {
    WXRenderStatement statement = mRegistries.get(instanceId);
    if (statement == null) {
      return;
    }
    statement.refreshFinish(width, height);
  }

  public void startAnimation(String instanceId, String ref, String animation, String callBack) {
    WXRenderStatement statement = mRegistries.get(instanceId);
    if (statement == null) {
      return;
    }
    statement.startAnimation(ref, animation, callBack);
  }
}
