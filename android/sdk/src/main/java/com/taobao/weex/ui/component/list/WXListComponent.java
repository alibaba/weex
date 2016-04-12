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
package com.taobao.weex.ui.component.list;

import android.graphics.Color;
import android.graphics.PointF;
import android.support.v7.widget.RecyclerView;
import android.text.TextUtils;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;

import com.taobao.weex.WXEnvironment;
import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.WXSDKManager;
import com.taobao.weex.common.WXException;
import com.taobao.weex.common.WXRuntimeException;
import com.taobao.weex.dom.WXDomObject;
import com.taobao.weex.ui.component.WXComponent;
import com.taobao.weex.ui.component.WXEventType;
import com.taobao.weex.ui.component.WXVContainer;
import com.taobao.weex.ui.view.listview.WXRecyclerView;
import com.taobao.weex.ui.view.listview.adapter.IOnLoadMoreListener;
import com.taobao.weex.ui.view.listview.adapter.IRecyclerAdapterListener;
import com.taobao.weex.ui.view.listview.adapter.ListBaseViewHolder;
import com.taobao.weex.ui.view.listview.adapter.RecyclerViewBaseAdapter;
import com.taobao.weex.ui.view.listview.adapter.WXRecyclerViewOnScrollListener;
import com.taobao.weex.utils.WXLogUtils;
import com.taobao.weex.utils.WXViewUtils;

import java.util.ArrayList;
import java.util.HashMap;

/**
 * Unlike other components, there is immutable bi-directional association between View and ViewHolder,
 * while only mutable and temporal uni-directional association between view and components.
 * The association only exist from
 * {@link #onBindViewHolder(ListBaseViewHolder, int)} to {@link #onViewRecycled(ListBaseViewHolder)}.
 * In other situations, the association may not valid or not even exist.
 */
public class WXListComponent extends WXVContainer implements IRecyclerAdapterListener<ListBaseViewHolder>, IOnLoadMoreListener {

  private String TAG = "WXListComponent";
  private RecyclerViewBaseAdapter recyclerViewBaseAdapter;
  private HashMap<String, Integer> typeList = new HashMap<>();
  private ArrayList<Integer> indoreCells;


  public WXListComponent(WXSDKInstance instance, WXDomObject node, WXVContainer parent, String instanceId, boolean lazy) {
    super(instance, node, parent, instanceId, lazy);
  }

  /**
   * Measure the size of the recyclerView.
   * If the height of the recyclerView exceeds the height of
   * {@link com.taobao.weex.ui.WXRenderStatement#mGodComponent},
   * {@link WXViewUtils#getWeexHeight(String)}-{@link #mAbsoluteY} is returned.
   * @param width the expected width
   * @param height the expected height
   * @return the result of measurement
   */
  @Override
  protected MeasureOutput measure(int width, int height) {
    int screenH = WXViewUtils.getScreenHeight();
    int weexH = WXViewUtils.getWeexHeight(mInstanceId);
    int outHeight = height > (weexH >= screenH ? screenH : weexH) ? weexH - mAbsoluteY : height;
    return super.measure(width, outHeight);
  }

  @Override
  protected void initView() {
    mHost = new WXRecyclerView(mContext);
    recyclerViewBaseAdapter = new RecyclerViewBaseAdapter<>(this);
    getView().initView(mContext, WXRecyclerView.TYPE_LINEAR_LAYOUT);
    getView().setAdapter(recyclerViewBaseAdapter);
    getView().clearOnScrollListeners();
    getView().addOnScrollListener(new WXRecyclerViewOnScrollListener(this));
  }

  @Override
  public WXRecyclerView getView() {
    return (WXRecyclerView) super.getView();
  }

  /**
   * Append a child component to the end of WXListComponent.
   * This will not refresh the underlying view immediately.
   * The message of index of the inserted child is given to the adapter,
   * and the adapter will determine when to refresh.
   * The default implementation of adapter will push the message into a message
   * and refresh the view in a period of time.
   * @param child the inserted child
   */
  @Override
  public void addChild(WXComponent child) {
    super.addChild(child);
    int index = mChildren.indexOf(child);
    recyclerViewBaseAdapter.notifyItemInserted(index);
    if (WXEnvironment.isApkDebugable()) {
      WXLogUtils.d(TAG, "addChild child at " + index);
    }
  }

  /**
   * @see #addChild(WXComponent)
   * @param child the inserted child
   * @param index the index of the child to be inserted.
   */
  @Override
  public void addChild(WXComponent child, int index) {
    super.addChild(child, index);
    int adapterPosition = index == -1 ? recyclerViewBaseAdapter.getItemCount() - 1 : index;
    recyclerViewBaseAdapter.notifyItemInserted(adapterPosition);
    if (WXEnvironment.isApkDebugable()) {
      WXLogUtils.d(TAG, "addChild child at " + index);
    }
  }

  /**
   * RecyclerView manage its children in a way different from {@link WXVContainer}.
   * It doesn't need addSubView, this is just an empty implementation.
   * @param child
   * @param index
   */
  @Override
  protected void addSubView(View child, int index) {
  }

  /**
   * Remove the child from WXListComponent.
   * This method will use {@link java.util.List#indexOf(Object)} to retrieve the component to be deleted.
   * Like {@link #addChild(WXComponent)}, this method will not refresh the view immediately,
   * the adapter will decide when to refresh.
   * @param child the child to be removed
   */
  @Override
  public void remove(WXComponent child) {
    int index = mChildren.indexOf(child);
    try {
      child.detachViewAndClearPreInfo();
    } catch (WXException e) {
      throw new WXRuntimeException
          ("Customize components that will be used in RecyclerView must implement IWXRecyclerViewChild interface");
    }
    super.remove(child);
    recyclerViewBaseAdapter.notifyItemRemoved(index);
    if (WXEnvironment.isApkDebugable()) {
      WXLogUtils.d(TAG, "removeChild child at " + index);
    }
  }

  @Override
  public void computeVisiblePointInViewCoordinate(PointF pointF) {
    RecyclerView view = getView();
    pointF.set(view.computeHorizontalScrollOffset(), view.computeVerticalScrollOffset());
  }

  /**
   * Recycle viewHolder and its underlying view.
   * This may because the view is removed or reused.
   * Either case, this method will be called.
   * @param holder The view holder to be recycled.
   */
  @Override
  public void onViewRecycled(ListBaseViewHolder holder) {
    for (WXComponent child : mChildren) {
      if (child.getRealView() == holder.getView()) {
        try {
          child.detachViewAndClearPreInfo();
        } catch (WXException e) {
          throw new WXRuntimeException
              ("Customize components that will be used in RecyclerView must implement IWXRecyclerViewChild interface");
        }
      }
    }
  }

  /**
   * Bind the component of the position to the holder. Then flush the view.
   * @param holder viewHolder, which holds reference to the view
   * @param position position of component in WXListComponent
   */
  @Override
  public void onBindViewHolder(ListBaseViewHolder holder, int position) {
    if (WXEnvironment.isApkDebugable()) {
      WXLogUtils.d(TAG, "OnBindViewHolder position:" + position);
    }
    if (holder != null) {
      //
      if (indoreCells != null && indoreCells.contains(position)) {
        return;
      }

      if (getChild(position) instanceof WXCell) {
        WXCell wxCell = (WXCell) getChild(position);
        try {
          wxCell.detachViewAndClearPreInfo();
        } catch (WXException e) {
          throw new WXRuntimeException
              ("Customize components that will be used in RecyclerView must implement IWXRecyclerViewChild interface");
        }
        wxCell.lazy(false);
        wxCell.bind(holder.getView());
        wxCell.flushView();
      }
    }
  }

  /**
   * Create an instance of {@link ListBaseViewHolder} for the given viewType (not for the given index).
   * This method will look up for the first component that fits the viewType requirement and doesn't be used.
   * Then create the certain type of view, detach the view from the component.
   *
   * @param parent the ViewGroup into which the new view will be inserted
   * @param viewType the type of the new view
   * @return the created view holder.
   */
  @Override
  public ListBaseViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {

    if (indoreCells != null && indoreCells.contains(viewType)) {
      FrameLayout view = new FrameLayout(mContext);
      view.setBackgroundColor(Color.BLUE);
      view.setLayoutParams(new FrameLayout.LayoutParams(1, 1));
      return new ListBaseViewHolder(view);
    }
    if (mChildren != null) {
      int count = childCount();

      for (int i = 0; i < count; i++) {

        if (getChild(i) instanceof WXCell) {
          WXCell wxComponent = (WXCell) getChild(i);
          if (wxComponent != null && getItemViewType(i) == viewType) {
            if (wxComponent.getRealView() == null) {
              //Shut down lazy load and force creating view.
              wxComponent.lazy(false);
              wxComponent.createView(this, -1);
              try {
                View view = wxComponent.detachViewAndClearPreInfo();
                if (WXEnvironment.isApkDebugable()) {
                  WXLogUtils.d(TAG, "OnCreateViewHolder viewType: " + viewType);
                }
                return new ListBaseViewHolder(view);
              } catch (WXException e) {
                throw new WXRuntimeException
                    ("Customize components that will be used in RecyclerView must implement IWXRecyclerViewChild interface");
              }
            }
          }
        }

      }
      throw new WXRuntimeException("Not find required WXComponent");
    }
    throw new NullPointerException("mChildren is null");
  }

  /**
   * Return the child component type. The type is defined by scopeValue in .we file.
   * @param position the position of the child component.
   * @return the type of certain component.
   */
  @Override
  public int getItemViewType(int position) {
    try {
      String type = mChildren.get(position).getDomObject().attr.getScope();
      if (mChildren.get(position).getDomObject().isFixed()) {
        if (indoreCells == null) {
          indoreCells = new ArrayList<Integer>();
        }
        if (!indoreCells.contains(position)) {
          indoreCells.add(position);
        }
      }
      if (!TextUtils.isEmpty(type)) {
        if (!typeList.containsKey(type)) {
          typeList.put(type, position);
        }
        return typeList.get(type);
      }
    } catch (Exception e) {
      WXLogUtils.e(TAG, "getItemViewType:" + WXLogUtils.getStackTrace(e));
    }
    return position;
  }

  /**
   * Get child component num.
   * @return return the size of {@link #mChildren} if mChildren is not empty,
   * otherwise, return 0;
   */
  @Override
  public int getItemCount() {
    if (mChildren != null) {
      return mChildren.size();
    }
    return 0;
  }

  @Override
  public boolean onFailedToRecycleView(ListBaseViewHolder holder) {
    return false;
  }

  @Override
  public void onLoadMore(int offScreenY) {
    try {
      if (offScreenY < Integer.parseInt(mDomObj.attr.getLoadMoreOffset())) {
        if (WXEnvironment.isApkDebugable()) {
          WXLogUtils.d(TAG, "offScreenY :" + offScreenY);
        }
        WXSDKManager.getInstance().fireEvent(mInstanceId, mDomObj.ref, WXEventType.LIST_LOAD_MORE);
      }
    } catch (Exception e) {
      WXLogUtils.d(TAG, "onLoadMore :" + WXLogUtils.getStackTrace(e));
    }
  }
}
