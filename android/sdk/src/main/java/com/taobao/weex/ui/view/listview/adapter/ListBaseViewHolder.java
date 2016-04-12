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
package com.taobao.weex.ui.view.listview.adapter;

import android.support.v7.widget.RecyclerView;
import android.view.View;

import java.lang.ref.WeakReference;


/**
 * There are bi-directional association between ViewHolder and View.
 * This is accomplished by weak-reference and final field from ViewHolder to View.
 * From View to ViewHolder, this is done by set {@link android.view.ViewGroup.LayoutParams} to View.
 */
public class ListBaseViewHolder extends RecyclerView.ViewHolder {

  private final WeakReference<View> viewWeakReference;

  public ListBaseViewHolder(View view) {
    super(view);
    viewWeakReference = new WeakReference<>(view);
  }

  public View getView() {
    if (viewWeakReference != null) {
      return viewWeakReference.get();
    } else {
      return null;
    }
  }

}
