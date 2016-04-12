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

/**
 * Handler for dom operations.
 */
class WXDomHandler implements Handler.Callback {

  /**
   * The batch operation in dom thread will run at most once in 16ms.
   */
  private static final int DELAY_TIME = 16;//ms
  private WXDomManager mWXDomManager;
  private boolean mHasBatch = false;

  public WXDomHandler(WXDomManager domManager) {
    mWXDomManager = domManager;
  }

  @Override
  public boolean handleMessage(Message msg) {
    if (msg == null) {
      return false;
    }
    int what = msg.what;
    Object obj = msg.obj;
    WXDomTask task = null;
    if (obj instanceof WXDomTask) {
      task = (WXDomTask) obj;
    }
    if (!mHasBatch) {
      mHasBatch = true;
      mWXDomManager.sendEmptyMessageDelayed(WXDomHandler.MsgType.WX_DOM_BATCH, DELAY_TIME);
    }

    switch (what) {
      case MsgType.WX_DOM_CREATE_BODY:
        mWXDomManager.createBody(task.instanceId, (JSONObject) task.args.get(0));
        break;
      case MsgType.WX_DOM_UPDATE_ATTRS:
        mWXDomManager.updateAttrs(task.instanceId, (String) task.args.get(0), (JSONObject) task.args.get(1));
        break;
      case MsgType.WX_DOM_UPDATE_STYLE:
        mWXDomManager.updateStyle(task.instanceId, (String) task.args.get(0), (JSONObject) task.args.get(1));
        break;
      case MsgType.WX_DOM_ADD_DOM:
        mWXDomManager.addDom(task.instanceId, (String) task.args.get(0), (JSONObject) task.args.get(1), (Integer) task.args.get(2));
        break;
      case MsgType.WX_DOM_REMOVE_DOM:
        mWXDomManager.removeDom(task.instanceId, (String) task.args.get(0));
        break;
      case MsgType.WX_DOM_MOVE_DOM:
        mWXDomManager.moveDom(task.instanceId, (String) task.args.get(0), (String) task.args.get(1), (Integer) task.args.get(2));
        break;
      case MsgType.WX_DOM_ADD_EVENT:
        mWXDomManager.addEvent(task.instanceId, (String) task.args.get(0), (String) task.args.get(1));
        break;
      case MsgType.WX_DOM_REMOVE_EVENT:
        mWXDomManager.removeEvent(task.instanceId, (String) task.args.get(0), (String) task.args.get(1));
        break;
      case MsgType.WX_DOM_CREATE_FINISH:
        mWXDomManager.createFinish(task.instanceId);
        break;
      case MsgType.WX_DOM_REFRESH_FINISH:
        mWXDomManager.refreshFinish(task.instanceId);
        break;
      case MsgType.WX_DOM_BATCH:
        mWXDomManager.batch();
        mHasBatch = false;
        break;

      case MsgType.WX_DOM_SCROLLTO:
        mWXDomManager.scrollToDom(task.instanceId, (String) task.args.get(0), (JSONObject) task.args.get(1));
        break;
      default:
        break;
    }
    return true;
  }


  public static class MsgType {

    public static final int WX_DOM_CREATE_BODY = 0x0;
    public static final int WX_DOM_UPDATE_ATTRS = 0x01;
    public static final int WX_DOM_UPDATE_STYLE = 0x02;
    public static final int WX_DOM_ADD_DOM = 0x03;
    public static final int WX_DOM_REMOVE_DOM = 0x04;
    public static final int WX_DOM_MOVE_DOM = 0x05;
    public static final int WX_DOM_ADD_EVENT = 0x06;
    public static final int WX_DOM_REMOVE_EVENT = 0x07;
    public static final int WX_DOM_SCROLLTO = 0x08;
    public static final int WX_DOM_CREATE_FINISH = 0x09;
    public static final int WX_DOM_REFRESH_FINISH = 0x0a;

    public static final int WX_DOM_BATCH = 0xff;
  }
}
