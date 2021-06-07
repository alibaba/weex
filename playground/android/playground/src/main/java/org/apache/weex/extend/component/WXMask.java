/**
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
package org.apache.weex.extend.component;

import android.app.Activity;
import android.content.Context;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Build;
import android.support.annotation.NonNull;
import android.view.Gravity;
import android.view.View;
import android.view.WindowManager;
import android.widget.FrameLayout;
import android.widget.PopupWindow;

import org.apache.weex.extend.view.WXMaskView;
import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.dom.CSSShorthand;
import com.taobao.weex.dom.WXStyle;
import com.taobao.weex.ui.action.BasicComponentData;
import com.taobao.weex.ui.component.WXVContainer;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by lixinke on 2016/12/26.
 */

public class WXMask extends WXVContainer {

  private PopupWindow mPopupWindow;
  private WXMaskView mContainerView;

  public WXMask(WXSDKInstance instance, WXVContainer parent, BasicComponentData basicComponentData) {
    super(instance, parent, basicComponentData);
  }

  @Override
  protected View initComponentHostView(@NonNull Context context) {

    mContainerView = new WXMaskView(context);
    mPopupWindow = new PopupWindow(context);
    mPopupWindow.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));

    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP_MR1) {
      mPopupWindow.setAttachedInDecor(true);
    }

    //setClippingEnabled(false) will cause INPUT_ADJUST_PAN invalid.
    //mPopupWindow.setClippingEnabled(false);

    mPopupWindow.setContentView(mContainerView);
    mPopupWindow.setWidth(WindowManager.LayoutParams.WRAP_CONTENT);
    mPopupWindow.setHeight(WindowManager.LayoutParams.WRAP_CONTENT);
    mPopupWindow.setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_PAN |
        WindowManager.LayoutParams.SOFT_INPUT_ADJUST_RESIZE);
    mPopupWindow.setFocusable(true);

    mPopupWindow.setOnDismissListener(new PopupWindow.OnDismissListener() {
      @Override
      public void onDismiss() {
        fireVisibleChangedEvent(false);
      }
    });

    int y = 0;
    int statusBarHeight = 0;
    int resourceId = context.getResources().getIdentifier("status_bar_height", "dimen", "android");
    if (resourceId > 0) {
      statusBarHeight = context.getResources().getDimensionPixelSize(resourceId);
      y = statusBarHeight;
    }

    mPopupWindow.showAtLocation(((Activity) context).getWindow().getDecorView(),
        Gravity.TOP | Gravity.START,
        0,
        y);
    fireVisibleChangedEvent(true);

    return mContainerView;
  }

  @Override
  public boolean isVirtualComponent() {
    return true;
  }

  @Override
  public void removeVirtualComponent() {
    if (mPopupWindow.isShowing()) {
      mPopupWindow.dismiss();
    }
  }

  private void fireVisibleChangedEvent(boolean visible) {
    Map<String, Object> event = new HashMap<>(1);
    event.put("visible", visible);
    fireEvent("visiblechanged", event);
  }

  @Override
  protected void setHostLayoutParams(View host, int width, int height, int left, int right, int top, int bottom) {
    left = get(LEFT);
    right = get(RIGHT);
    top = get(TOP);
    bottom = get(BOTTOM);
    FrameLayout.LayoutParams params = new FrameLayout.LayoutParams(width, height);

    this.setMarginsSupportRTL(params, left, top, right, bottom);

    getHostView().setLayoutParams(params);
  }

  private static final int LEFT = 0;
  private static final int RIGHT = 1;
  private static final int TOP = 2;
  private static final int BOTTOM = 3;

  private int get(int type) {
    try {
      CSSShorthand margin = getMargin();
      WXStyle style = getStyles();
      switch (type) {
        case LEFT:
          return add(style.getLeft(), margin.get(CSSShorthand.EDGE.LEFT));
        case RIGHT:
          return add(style.getRight(), margin.get(CSSShorthand.EDGE.RIGHT));
        case TOP:
          return add(style.getTop(), margin.get(CSSShorthand.EDGE.TOP));
        case BOTTOM:
          return add(style.getBottom(), margin.get(CSSShorthand.EDGE.BOTTOM));
      }
    } catch (Throwable t) {
      //ignore
    }
    return 0;
  }

  private int add(float a, float b) {
    if (Float.isNaN(a)) {
      a = 0f;
    }

    if (Float.isNaN(b)) {
      b = 0f;
    }

    return (int) (a + b);
  }
}
