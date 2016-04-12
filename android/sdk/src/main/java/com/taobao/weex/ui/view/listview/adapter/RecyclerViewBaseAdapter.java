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
import android.view.ViewGroup;


/**
 * Adapter for recyclerView
 */
public class RecyclerViewBaseAdapter<T extends RecyclerView.ViewHolder> extends RecyclerView.Adapter<T> {

  private String TAG = "RecyclerViewBaseAdapter";
  private IRecyclerAdapterListener iRecyclerAdapterListener;

  public RecyclerViewBaseAdapter(IRecyclerAdapterListener Listener) {
    this.iRecyclerAdapterListener = Listener;
  }

  public T onCreateViewHolder(ViewGroup parent, int viewType) {
    //        WXLogUtils.d(TAG, "onCreateViewHolder viewType:" + viewType);
    if (iRecyclerAdapterListener != null) {
      return (T) iRecyclerAdapterListener.onCreateViewHolder(parent, viewType);
    }

    return null;
  }

  @Override
  public void onBindViewHolder(T viewHolder, int i) {
    //        WXLogUtils.d(TAG, "onBindViewHolder position: " + i);
    if (iRecyclerAdapterListener != null) {
      iRecyclerAdapterListener.onBindViewHolder(viewHolder, i);
    }
  }

  @Override
  public int getItemViewType(int position) {
    //        WXLogUtils.d(TAG, "getItemViewType position:"+position);
    if (iRecyclerAdapterListener != null) {
      return iRecyclerAdapterListener.getItemViewType(position);
    }
    return position;
  }

  @Override
  public long getItemId(int position) {
    //        WXLogUtils.d(TAG, "getItemId position " + position);
    return super.getItemId(position);
  }

  @Override
  public int getItemCount() {
    if (iRecyclerAdapterListener != null) {
      return iRecyclerAdapterListener.getItemCount();
    }
    return 0;

  }

  @Override
  public void onViewRecycled(T holder) {
    //        WXLogUtils.d(TAG, "onViewRecycled position ");
    if (iRecyclerAdapterListener != null) {
      iRecyclerAdapterListener.onViewRecycled(holder);
    }
    super.onViewRecycled(holder);
  }

  @Override
  public boolean onFailedToRecycleView(T holder) {
    //        WXLogUtils.d(TAG, "onFailedToRecycleView ");
    if (iRecyclerAdapterListener != null) {
      return iRecyclerAdapterListener.onFailedToRecycleView(holder);
    }
    return super.onFailedToRecycleView(holder);
  }
}