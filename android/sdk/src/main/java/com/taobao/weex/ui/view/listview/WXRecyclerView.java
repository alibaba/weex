/**
 * Licensed to the Apache Software Foundation (ASF) under one or more contributor license
 * agreements.  See the NOTICE file distributed with this work for additional information regarding
 * copyright ownership.  The ASF licenses this file to you under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with the License.  You may obtain
 * a copy of the License at http://www.apache.org/licenses/LICENSE-2.0 Unless required by applicable
 * law or agreed to in writing, software distributed under the License is distributed on an "AS IS"
 * BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  See the License
 * for the specific language governing permissions and limitations under the License.
 */
package com.taobao.weex.ui.view.listview;

import android.content.Context;
import android.support.v7.widget.GridLayoutManager;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.OrientationHelper;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.StaggeredGridLayoutManager;

public class WXRecyclerView extends RecyclerView {

  public static final int TYPE_LINEAR_LAYOUT = 1;
  public static final int TYPE_GRID_LAYOUT = 2;
  public static final int TYPE_STAGGERED_GRID_LAYOUT = 3;

  public WXRecyclerView(Context context) {
    super(context);
  }

  public void initView(Context context, int type) {

    if (type == TYPE_GRID_LAYOUT) {
      setLayoutManager(new GridLayoutManager(context, 2));
    } else if (type == TYPE_STAGGERED_GRID_LAYOUT) {
      setLayoutManager(new StaggeredGridLayoutManager(2, OrientationHelper.VERTICAL));
    } else if (type == TYPE_LINEAR_LAYOUT) {
      setLayoutManager(new LinearLayoutManager(context));
    }
  }

}
