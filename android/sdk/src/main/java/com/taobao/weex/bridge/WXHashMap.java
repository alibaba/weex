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
package com.taobao.weex.bridge;

import android.text.TextUtils;

import java.util.HashMap;
import java.util.Stack;

/**
 * HashMap for Weex
 */
public class WXHashMap<K, V> extends HashMap<K, V> {

  private static final long serialVersionUID = 4294272345728974369L;

  private Stack<String> instancesStack = new Stack<String>();
  private String mTag;

  @Override
  public V put(K key, V value) {
    if (key != null && key.toString() != null) {
      if (instancesStack.contains(key)) {
        instancesStack.remove(key);
      }
      instancesStack.push(key.toString());
    }
    return super.put(key, value);
  }

  @Override
  public V remove(Object key) {
    return super.remove(key);
  }

  public V removeFromMapAndStack(Object key) {
    instancesStack.remove(key);
    return super.remove(key);
  }

  /**
   * Get instance Id of the top of the stack
   *
   * @return
   */
  public String getStackTopInstanceId() {
    return instancesStack.isEmpty() ? "" : instancesStack.pop();
  }

  /**
   * Move instanceId to the top of the stack
   *
   * @param id
   */
  public void setStackTopInstance(String id) {
    if (!TextUtils.isEmpty(id)) {
      instancesStack.remove(id);
      instancesStack.push(id);
    }
  }

  public Stack<String> getInstanceStack() {
    return instancesStack;
  }

  public String getTag() {
    return mTag;
  }

  public void setTag(String tag) {
    this.mTag = tag;
  }

}
