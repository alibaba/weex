/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 * 
 *   http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
package org.apache.weex.constants;

public class Constants {

//  public static final String BUNDLE_URL = "http://t.cn?_wx_tpl=http://h5.waptest.taobao.com/app/weextc031/build/TC__Home.js";
 public static final String BUNDLE_URL = "http://h5.m.taobao.com?_wx_tpl=http://g.tbcdn.cn/weex/weex-tc/0.1.2/build/TC__Home.js";
  public static final String WEEX_SAMPLES_KEY = "?weex-samples";
  public static final String WEEX_TPL_KEY = "_wx_tpl";


  //hot refresh
  public static final int HOT_REFRESH_CONNECT = 0x111;
  public static final int HOT_REFRESH_DISCONNECT = HOT_REFRESH_CONNECT + 1;
  public static final int HOT_REFRESH_REFRESH = HOT_REFRESH_DISCONNECT + 1;
  public static final int HOT_REFRESH_CONNECT_ERROR = HOT_REFRESH_REFRESH + 1;
}
