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

import android.content.Context;
import android.graphics.PointF;
import android.support.annotation.Nullable;
import android.support.v4.view.ViewPager;
import android.support.v7.widget.RecyclerView;
import android.text.TextUtils;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.LinearLayout;
import android.widget.ScrollView;

import com.alibaba.fastjson.JSON;
import com.taobao.weex.IWXActivityStateListener;
import com.taobao.weex.WXEnvironment;
import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.WXSDKManager;
import com.taobao.weex.common.IWXObject;
import com.taobao.weex.common.WXDomPropConstant;
import com.taobao.weex.common.WXException;
import com.taobao.weex.common.WXRuntimeException;
import com.taobao.weex.dom.WXDomObject;
import com.taobao.weex.dom.flex.Spacing;
import com.taobao.weex.ui.component.list.WXListComponent;
import com.taobao.weex.ui.view.WXBackgroundDrawable;
import com.taobao.weex.ui.view.WXCircleIndicator;
import com.taobao.weex.ui.view.gesture.WXGesture;
import com.taobao.weex.ui.view.gesture.WXGestureObservable;
import com.taobao.weex.ui.view.gesture.WXGestureType;
import com.taobao.weex.utils.WXLogUtils;
import com.taobao.weex.utils.WXResourceUtils;
import com.taobao.weex.utils.WXUtils;
import com.taobao.weex.utils.WXViewUtils;

import java.lang.reflect.Method;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

/**
 * abstract component
 *
 */
public abstract class WXComponent implements IWXObject, IWXActivityStateListener {

  public static final int HORIZONTAL = 0;
  public static final int VERTICAL = 1;
  public static int mComponentNum = 0;
  public View mHost;
  public volatile WXVContainer mParent;
  public volatile WXDomObject mDomObj;
  public String mInstanceId;
  protected int mOrientation = VERTICAL;
  protected WXSDKInstance mInstance;
  protected Context mContext;
  protected int mAbsoluteY = 0;
  protected int mAbsoluteX = 0;
  protected Set<String> mGestureType;
  private WXBorder mBorder;
  private boolean mLazy;
  private int mPreRealWidth = 0;
  private int mPreRealHeight = 0;
  private int mPreRealLeft = 0;
  private int mPreRealTop = 0;
  private WXGesture wxGesture;

  public WXComponent(WXSDKInstance instance, WXDomObject dom, WXVContainer parent, String instanceId, boolean isLazy) {
    mInstance = instance;
    mContext = mInstance.getContext();
    mParent = parent;
    mDomObj = dom.clone();
    mInstanceId = instanceId;
    mLazy = isLazy;
    mGestureType = new HashSet<>();
    ++mComponentNum;
  }

  /**
   * The view is created as needed
   * @return true for lazy
   */
  public boolean isLazy() {
    return mLazy;
  }

  public void lazy(boolean lazy) {
    mLazy = lazy;
  }

  /**
   * bind view's prop
   *
   * @param view
   */
  public final void bind(View view) {
    if (!mLazy) {
      bindImpl(view);
    }
  }

  protected void bindImpl(View view) {
    if (view != null) {
      mHost = view;
      getOrCreateBorder().attachView(view);
    }

    setLayout(mDomObj);
    setPadding(mDomObj.getPadding(), mDomObj.getBorder());
    updateProperties();
    addEvents();
    updateExtra(mDomObj.getExtra());
  }

  protected WXBorder getOrCreateBorder() {
    if (mBorder == null) {
      mBorder = new WXBorder();
    }
    return mBorder;
  }

  /**
   * layout view
   */
  public final void setLayout(WXDomObject domObject) {
    if (mParent == null || domObject == null || TextUtils.isEmpty(mDomObj.ref)) {
      return;
    }

    mDomObj = domObject;
    Spacing parentPadding = mParent.getDomObject().getPadding();
    Spacing border = mDomObj.getBorder();
    Spacing margin = mDomObj.getMargin();
    int realWidth = (int) mDomObj.getLayoutWidth();
    int realHeight = (int) mDomObj.getLayoutHeight();
    int realLeft = (int) (mDomObj.getLayoutX() - parentPadding.get(Spacing.LEFT) - border.get(Spacing.LEFT));
    int realTop = (int) (mDomObj.getLayoutY() - parentPadding.get(Spacing.TOP) - border.get(Spacing.TOP));
    int realRight = (int) margin.get(Spacing.RIGHT);
    int realBottom = (int) margin.get(Spacing.BOTTOM);

    if (mPreRealWidth == realWidth && mPreRealHeight == realHeight && mPreRealLeft == realLeft && mPreRealTop == realTop) {
      return;
    }

    if (mParent != null) {
      mAbsoluteY = (int) (mParent.mAbsoluteY + mDomObj.getLayoutY());
      mAbsoluteX = (int) (mParent.mAbsoluteX + mDomObj.getLayoutX());
    }

    //calculate first screen time
    if (!mInstance.mEnd && mAbsoluteY >= WXViewUtils.getScreenHeight()) {
      mInstance.firstScreenRenderFinished(System.currentTimeMillis());
    }

    if (mHost == null) {
      return;
    }

    MeasureOutput measureOutput = measure(realWidth, realHeight);
    realWidth = measureOutput.width;
    realHeight = measureOutput.height;

    if (mHost instanceof WXCircleIndicator) {
      FrameLayout.LayoutParams params = new FrameLayout.LayoutParams(realWidth, realHeight);
      params.setMargins(realLeft, realTop, realRight, realBottom);
      mHost.setLayoutParams(params);
      return;
    }

    //fixed style
    if (mDomObj.isFixed()) {
      if (mInstance.getRootView() != null) {
        if (mHost.getParent() instanceof ViewGroup) {
          ViewGroup viewGroup = (ViewGroup) mHost.getParent();
          viewGroup.removeView(mHost);
        }
        FrameLayout.LayoutParams params = new FrameLayout.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT);

        params.width = realWidth;
        params.height = realHeight;
        params.setMargins(realLeft, realTop, realRight, realBottom);
        mHost.setLayoutParams(params);
        mInstance.getRootView().addView(mHost);

        if (WXEnvironment.isApkDebugable()) {
          WXLogUtils.d("Weex_Fixed_Style", "WXComponent:setLayout :" + realLeft + " " + realTop + " " + realWidth + " " + realHeight);
          WXLogUtils.d("Weex_Fixed_Style", "WXComponent:setLayout Left:" + mDomObj.style.getLeft() + " " + (int) mDomObj.style.getTop());
        }

      }
      return;
    }

    if (mParent.getRealView() instanceof ViewPager) {
      ViewPager.LayoutParams params = new ViewPager.LayoutParams();
      params.width = realWidth;
      params.height = realHeight;
      mHost.setLayoutParams(params);
    } else if (mParent.getRealView() instanceof FrameLayout) {
      FrameLayout.LayoutParams params = new FrameLayout.LayoutParams(realWidth, realHeight);
      params.setMargins(realLeft, realTop, realRight, realBottom);
      mHost.setLayoutParams(params);
    } else if (mParent.getRealView() instanceof LinearLayout) {
      LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(realWidth, realHeight);
      params.setMargins(realLeft, realTop, realRight, realBottom);
      mHost.setLayoutParams(params);
    } else if (mParent.getRealView() instanceof ScrollView) {
      ScrollView.LayoutParams params = new ScrollView.LayoutParams(realWidth, realHeight);
      params.setMargins(realLeft, realTop, realRight, realBottom);
      mHost.setLayoutParams(params);
    } else if (mParent.getRealView() instanceof RecyclerView) {

      //todo Nothing
    }

    mPreRealWidth = realWidth;
    mPreRealHeight = realHeight;
    mPreRealLeft = realLeft;
    mPreRealTop = realTop;
  }

  public void setPadding(Spacing padding, Spacing border) {
    int left = (int) (padding.get(Spacing.LEFT) + border.get(Spacing.LEFT));
    int top = (int) (padding.get(Spacing.TOP) + border.get(Spacing.TOP));
    int right = (int) (padding.get(Spacing.RIGHT) + border.get(Spacing.RIGHT));
    int bottom = (int) (padding.get(Spacing.BOTTOM) + border.get(Spacing.BOTTOM));

    if (mHost == null) {
      return;
    }
    mHost.setPadding(left, top, right, bottom);
  }

  private void updateProperties() {
    if (mDomObj.attr != null && mDomObj.attr.size() > 0) {
      updateProperties(mDomObj.attr);
    }
    if (mDomObj.style != null && mDomObj.style.size() > 0) {
      updateProperties(mDomObj.style);
    }
  }

  private void addEvents() {
    int count = mDomObj.event == null ? 0 : mDomObj.event.size();
    for (int i = 0; i < count; ++i) {
      addEvent(mDomObj.event.get(i));
    }
  }

  public void updateExtra(Object extra) {

  }

  public WXDomObject getDomObject() {
    return mDomObj;
  }

  /**
   * measure
   */
  protected MeasureOutput measure(int width, int height) {
    MeasureOutput measureOutput = new MeasureOutput();
    measureOutput.width = width;
    measureOutput.height = height;
    return measureOutput;
  }

  public final void updateProperties(Map<String, Object> props) {
    if (props.isEmpty() || mHost == null) {
      return;
    }
    Map<String, Method> methodMap = WXComponentPropCache.getMethods(getClass());

    Iterator<Entry<String, Object>> iterator = props.entrySet().iterator();
    while (iterator.hasNext()) {
      String key = iterator.next().getKey();
      Method method = methodMap.get(key);
      if (method != null) {
        try {
          Type[] paramClazzs = WXComponentPropCache.getMethodGenericParameterTypes(method);
          if (paramClazzs.length != 1) {
            WXLogUtils.e("[WXComponent] setX method only one parameter：" + method);
            return;
          }
          Object param;
          Type paramClazz = paramClazzs[0];
          Object value = props.get(key);
          String sValue;
          if (value instanceof String) {
            sValue = (String) value;
          } else {
            sValue = JSON.toJSONString(value);
          }

          if (paramClazz == int.class) {
            param = WXUtils.getInt(sValue);
          } else if (paramClazz == String.class) {
            param = sValue;
          } else if (paramClazz == long.class) {
            param = WXUtils.getLong(sValue);
          } else if (paramClazz == double.class) {
            param = WXUtils.getDouble(sValue);
          } else if (paramClazz == float.class) {
            param = WXUtils.getFloat(sValue);
          } else if (ParameterizedType.class.isAssignableFrom(paramClazz.getClass())) {
            param = JSON.parseObject(sValue, paramClazz);
          } else if (IWXObject.class.isAssignableFrom(paramClazz.getClass())) {
            param = JSON.parseObject(sValue, paramClazz);
          } else {
            param = JSON.parseObject(sValue, paramClazz);
          }

          method.invoke(this, param);
        } catch (Exception e) {
          WXLogUtils.e("[WXComponent] updateProperties :" + "class:" + getClass() + "method:" + method.getName() + " function " + WXLogUtils.getStackTrace(e));
        }
      }
    }
  }

  public void addEvent(String type) {
    if (TextUtils.isEmpty(type)) {
      return;
    }
    mDomObj.addEvent(type);
    if (type.equals(WXEventType.CLICK) && getRealView() != null) {
      mHost.setOnClickListener(new View.OnClickListener() {
        @Override
        public void onClick(View v) {
          Map<String, Object> params = new HashMap<>();
          WXSDKManager.getInstance().fireEvent(mInstanceId,
                                               mDomObj.ref,
                                               WXEventType.CLICK,
                                               params);
        }
      });
    } else if ((type.equals(WXEventType.FOCUS) || type.equals(WXEventType.BLUR)) && getRealView()
                                                                                    != null) {
      getRealView().setFocusable(true);
      getRealView().setOnFocusChangeListener(new View.OnFocusChangeListener() {
        @Override
        public void onFocusChange(View v, boolean hasFocus) {
          Map<String, Object> params = new HashMap<>();
          params.put("timeStamp", System.currentTimeMillis());
          WXSDKManager.getInstance().fireEvent(mInstanceId,
                                               mDomObj.ref,
                                               hasFocus ? WXEventType.FOCUS : WXEventType.BLUR, params);
        }
      });
    } else if (getRealView() != null &&
               needGestureDetector(type)) {
      if (getRealView() instanceof WXGestureObservable) {
        if (wxGesture == null) {
          wxGesture = new WXGesture(this, mContext);
        }
        mGestureType.add(type);
        ((WXGestureObservable) getRealView()).registerGestureListener(wxGesture);
      } else {
        WXLogUtils.e(getRealView().getClass().getSimpleName() + " don't implement " +
                     "WXGestureObservable, so no gesture is supported.");
      }
    } else {
      WXScroller scroller = getParentScroller();
      if (type.equals(WXEventType.APPEAR) && scroller != null) {
        scroller.bindAppearEvent(this);
      }
      if (type.equals(WXEventType.DISAPPEAR) && scroller != null) {
        scroller.bindDisappearEvent(this);
      }
    }
  }

  public View getRealView() {
    return mHost;
  }

  /**
   * Judge whether need to set an onTouchListener.<br>
   * As there is only one onTouchListener in each view, so all the gesture that use onTouchListener should put there.
   *
   * @param type eventType {@link WXEventType}
   * @return true for set an onTouchListener, otherwise false
   */
  private boolean needGestureDetector(String type) {
    if (mHost != null) {
      for (WXGestureType gesture : WXGestureType.LowLevelGesture.values()) {
        if (type.equals(gesture.toString())) {
          return true;
        }
      }
      for (WXGestureType gesture : WXGestureType.HighLevelGesture.values()) {
        if (type.equals(gesture.toString())) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * get Scroller components
   */
  public WXScroller getParentScroller() {
    WXComponent component = this;
    WXVContainer container;
    WXScroller scroller;
    for (; ; ) {
      container = component.getParent();
      if (container == null) {
        return null;
      }
      if (container instanceof WXScroller) {
        scroller = (WXScroller) container;
        return scroller;
      }
      if (container.getRef().equals(WXDomObject.ROOT)) {
        return null;
      }
      component = container;
    }
  }

  public WXVContainer getParent() {
    return mParent;
  }

  public String getRef() {
    if (mDomObj == null) {
      return null;
    }
    return mDomObj.ref;
  }

  /**
   * create view
   *
   * @param parent
   * @param index
   */
  public final void createView(WXVContainer parent, int index) {
    if (!mLazy) {
      createViewImpl(parent, index);
    }
  }

  protected void createViewImpl(WXVContainer parent, int index) {
    initView();
    if (parent != null) {
      parent.addSubView(mHost, index);
    }
    getOrCreateBorder().attachView(mHost);
  }

  protected void initView() {
    mHost = new FrameLayout(mContext);
  }

  public View getView() {
    return mHost;
  }

  public int getAbsoluteY() {
    return mAbsoluteY;
  }

  public int getAbsoluteX() {
    return mAbsoluteX;
  }

  public void updateDom(WXDomObject dom) {
    if (dom == null) {
      return;
    }
    mDomObj = dom;
  }

  /**
   * Flush the corresponding view.
   * If multiple property setter conflicts, this method can be called to resolve conflict.
   */
  public void flushView() {

  }

  public final void removeEvent(String type) {
    if (TextUtils.isEmpty(type)) {
      return;
    }
    mDomObj.removeEvent(type);
    mGestureType.remove(type);
    removeEventFromView(type);
  }

  protected void removeEventFromView(String type) {
    if (type.equals(WXEventType.CLICK) && getRealView() != null) {
      getRealView().setOnClickListener(null);
    }
    WXScroller scroller = getParentScroller();
    if (type.equals(WXEventType.APPEAR) && scroller != null) {
      scroller.unbindAppearEvent(this);
    }
    if (type.equals(WXEventType.DISAPPEAR) && scroller != null) {
      scroller.unbindDisappearEvent(this);
    }
  }

  public final void removeAllEvent() {
    if (mDomObj == null || mDomObj.event == null || mDomObj.event.size() < 1) {
      return;
    }
    for (String event : mDomObj.event) {
      removeEventFromView(event);
    }
    mDomObj.event.clear();
    mGestureType.clear();
    wxGesture = null;
    if (getRealView() != null &&
        getRealView() instanceof WXGestureObservable) {
      ((WXGestureObservable) getRealView()).registerGestureListener(null);
    }
  }

  public final void removeStickyStyle() {
    if (mDomObj == null || mDomObj.style == null) {
      return;
    }

    if (mDomObj.isSticky()) {
      WXScroller scroller = getParentScroller();
      if (scroller != null) {
        scroller.unbindStickStyle(this);
      }
    }
  }

  @WXComponentProp(name = WXDomPropConstant.WX_ATTR_DISABLED)
  public void setDisabled(boolean disabled) {
    if (mHost == null) {
      return;
    }
    mHost.setEnabled(!disabled);
  }

  @WXComponentProp(name = WXDomPropConstant.WX_POSITION)
  public void setSticky(String sticky) {
    if (!TextUtils.isEmpty(sticky) && sticky.equals(WXDomPropConstant.WX_POSITION_STICKY)) {
      WXScroller waScroller = getParentScroller();
      if (waScroller != null) {
        waScroller.bindStickStyle(this);
      }
    }
  }

  @WXComponentProp(name = WXDomPropConstant.WX_BACKGROUNDCOLOR)
  public void setBackgroundColor(String color) {
    if (!TextUtils.isEmpty(color)) {
      int colorInt = WXResourceUtils.getColor(color);
      if (colorInt != Integer.MIN_VALUE) {
        getOrCreateBorder().setBackgroundColor(colorInt);
      }
    }
  }

  @WXComponentProp(name = WXDomPropConstant.WX_OPACITY)
  public void setOpacity(float opacity) {
    if (opacity >= 0 && opacity <= 1 && mHost.getAlpha() != opacity) {
      mHost.setAlpha(opacity);
    }
  }

  @WXComponentProp(name = WXDomPropConstant.WX_BORDERRADIUS)
  public void setBorderRadius(float borderRadius) {
    if (borderRadius > 0) {
      getOrCreateBorder().setBorderRadius(WXViewUtils.getRealPxByWidth(borderRadius));
    }
  }

  @WXComponentProp(name = WXDomPropConstant.WX_BORDER_TOP_LEFT_RADIUS)
  public void setBorderTopLeftRadius(float borderRadius) {
    setBorderRadius(WXBackgroundDrawable.BORDER_TOP_LEFT_RADIUS, borderRadius);
  }

  private void setBorderRadius(int position, float borderRadius) {
    if (borderRadius > 0) {
      getOrCreateBorder().setBorderRadius(position, WXViewUtils.getRealPxByWidth(borderRadius));
    }
  }

  @WXComponentProp(name = WXDomPropConstant.WX_BORDER_TOP_RIGHT_RADIUS)
  public void setBorderTopRightRadius(float borderRadius) {
    setBorderRadius(WXBackgroundDrawable.BORDER_TOP_RIGHT_RADIUS, borderRadius);
  }

  @WXComponentProp(name = WXDomPropConstant.WX_BORDER_BOTTOM_RIGHT_RADIUS)
  public void setBorderBottomRightRadius(float borderRadius) {
    setBorderRadius(WXBackgroundDrawable.BORDER_BOTTOM_RIGHT_RADIUS, borderRadius);
  }

  @WXComponentProp(name = WXDomPropConstant.WX_BORDER_BOTTOM_LEFT_RADIUS)
  public void setBorderBottoLeftRadius(float borderRadius) {
    setBorderRadius(WXBackgroundDrawable.BORDER_BOTTOM_LEFT_RADIUS, borderRadius);
  }

  @WXComponentProp(name = WXDomPropConstant.WX_BORDERWIDTH)
  public void setBorderWidth(float borderWidth) {
    setBorderWidth(Spacing.ALL, borderWidth);
  }

  private void setBorderWidth(int position, float borderWidth) {
    if (borderWidth > 0) {
      getOrCreateBorder().setBorderWidth(position, WXViewUtils.getRealPxByWidth(borderWidth));
    }
  }

  @WXComponentProp(name = WXDomPropConstant.WX_BORDER_TOP_WIDTH)
  public void setBorderTopWidth(float borderWidth) {
    setBorderWidth(Spacing.TOP, borderWidth);
  }

  @WXComponentProp(name = WXDomPropConstant.WX_BORDER_RIGHT_WIDTH)
  public void setBorderRightWidth(float borderWidth) {
    setBorderWidth(Spacing.RIGHT, borderWidth);
  }

  @WXComponentProp(name = WXDomPropConstant.WX_BORDER_BOTTOM_WIDTH)
  public void setBorderBottomWidth(float borderWidth) {
    setBorderWidth(Spacing.BOTTOM, borderWidth);
  }

  @WXComponentProp(name = WXDomPropConstant.WX_BORDER_LEFT_WIDTH)
  public void setBorderLeftWidth(float borderWidth) {
    setBorderWidth(Spacing.LEFT, borderWidth);
  }

  @WXComponentProp(name = WXDomPropConstant.WX_BORDERSTYLE)
  public void setBorderStyle(String borderStyle) {
    getOrCreateBorder().setBorderStyle(borderStyle);
  }

  @WXComponentProp(name = WXDomPropConstant.WX_BORDERCOLOR)
  public void setBorderColor(String borderColor) {
    setBorderColor(Spacing.ALL, borderColor);
  }

  private void setBorderColor(int position, String borderColor) {
    if (!TextUtils.isEmpty(borderColor)) {
      int colorInt = WXResourceUtils.getColor(borderColor);
      if (colorInt != Integer.MIN_VALUE) {
        getOrCreateBorder().setBorderColor(position, colorInt);
      }
    }
  }

  @WXComponentProp(name = WXDomPropConstant.WX_BORDER_TOP_COLOR)
  public void setBorderTopColor(String borderColor) {
    setBorderColor(Spacing.TOP, borderColor);
  }

  @WXComponentProp(name = WXDomPropConstant.WX_BORDER_RIGHT_COLOR)
  public void setBorderRightColor(String borderColor) {
    setBorderColor(Spacing.RIGHT, borderColor);
  }

  @WXComponentProp(name = WXDomPropConstant.WX_BORDER_BOTTOM_COLOR)
  public void setBorderBottomColor(String borderColor) {
    setBorderColor(Spacing.BOTTOM, borderColor);
  }

  @WXComponentProp(name = WXDomPropConstant.WX_BORDER_LEFT_COLOR)
  public void setBorderLeftColor(String borderColor) {
    setBorderColor(Spacing.LEFT, borderColor);
  }

  public
  @Nullable
  String getVisibility() {
    try {
      return (String) getDomObject().style.get(WXDomPropConstant.WX_VISIBILITY);
    } catch (Exception e) {
      WXLogUtils.e(WXLogUtils.getStackTrace(e));
      return null;
    }
  }

  @WXComponentProp(name = WXDomPropConstant.WX_VISIBILITY)
  public void setVisibility(String visibility) {
    View view;
    if ((view = getRealView()) != null) {
      if (TextUtils.equals(visibility, WXDomPropConstant.WX_VISIBILITY_VISIBLE)) {
        view.setVisibility(View.VISIBLE);
      } else if (TextUtils.equals(visibility, WXDomPropConstant.WX_VISIBILITY_HIDDEN)) {
        view.setVisibility(View.GONE);
      }
    }
  }

  public void registerActivityStateListener() {
    if (mInstance != null) {
      mInstance.registerActivityStateListener(this);
    }
  }

  @Override
  public void onActivityCreate() {

  }

  @Override
  public void onActivityStart() {

  }

  @Override
  public void onActivityPause() {

  }

  @Override
  public void onActivityResume() {
  }

  @Override
  public void onActivityStop() {
  }

  @Override
  public void onActivityDestroy() {

  }

  @Override
  public boolean onActivityBack() {
    return false;
  }

  public void destroy() {
    if (WXEnvironment.isApkDebugable() && !WXUtils.isUiThread()) {
      throw new WXRuntimeException("[WXComponent] destroy can only be called in main thread");
    }
    removeAllEvent();
    removeStickyStyle();
    if (mDomObj != null) {
      mDomObj.destroy();
    }
  }

  /**
   * Detach view from its component. Components,
   * which have difference between getView and getRealView or have temp calculation results,
   * must<strong> override</strong>  this method with their own implementation.
   *
   * @return the original View
   */
  public View detachViewAndClearPreInfo() throws WXException {
    if (!(this instanceof IWXRecyclerViewChild)) {
      throw new WXException("Class " + getClass().getName() + " doesn't implement IWXRecyclerViewChild");
    } else {
      View original = mHost;
      if (mBorder != null) {
        mBorder.detachView();
      }
      mPreRealLeft = 0;
      mPreRealWidth = 0;
      mPreRealHeight = 0;
      mPreRealTop = 0;
      mHost = null;
      return original;
    }
  }

  /**
   * This method computes user visible left-top point in view's coordinate.
   * The default implementation uses the scrollX and scrollY of the view as the result,
   * and put the value in the parameter pointer.
   * Components with different computation algorithm
   * (e.g. {@link WXListComponent#computeVisiblePointInViewCoordinate(PointF)} )
   * <strong> should override </strong> this method.
   *
   * @param pointF the user visible left-top point in view's coordinate.
   */
  public void computeVisiblePointInViewCoordinate(PointF pointF) {
    View view = getRealView();
    pointF.set(view.getScrollX(), view.getScrollY());
  }

  public boolean containsGesture(WXGestureType WXGestureType) {
    return mGestureType != null && mGestureType.contains(WXGestureType.toString());
  }

  public static class MeasureOutput {

    public int width;
    public int height;
  }
}
