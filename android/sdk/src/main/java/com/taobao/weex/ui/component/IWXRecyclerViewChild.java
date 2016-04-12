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
package com.taobao.weex.ui.component;


/**
 * Customize Components that wish to be reused in RecyclerView must implement this interface.
 * Then, components must check whether it should override
 * {@link WXComponent#detachViewAndClearPreInfo()} in order to be used in RecyclerView.
 * This interface provides an empty body, {@link WXComponent#detachViewAndClearPreInfo() }
 * will check whether its subclass implement this interface and execute default implementation.
 */
public interface IWXRecyclerViewChild {

}
