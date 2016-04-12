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
package com.taobao.weex.common;

public class WXJSBridgeMsgType {

  public static final int SET_TIMEOUT = 0x01;
  public static final int NATIVE_CALL = 0x02;
  public static final int FIRE_EVENT = 0x03;
  public static final int CALLBACK = 0x04;
  public static final int CALL_JS = 0x05;
  public static final int CALL_JS_BATCH = 0x06;
  public static final int INIT_FRAMEWORK = 0x07;
  public static final int REGISTER_COMPONENTS = 0x08;
  public static final int REGISTER_MODULES = 0x09;
  public static final int REFRESH_INSTANCE = 0x0a;
}
