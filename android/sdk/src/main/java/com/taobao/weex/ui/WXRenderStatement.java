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
package com.taobao.weex.ui;

import android.animation.Animator;
import android.view.ViewGroup;
import android.view.ViewGroup.LayoutParams;
import android.view.animation.Interpolator;
import android.widget.FrameLayout;
import android.widget.ScrollView;

import com.alibaba.fastjson.JSONObject;
import com.taobao.weex.WXEnvironment;
import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.common.WXRenderStrategy;
import com.taobao.weex.dom.WXDomObject;
import com.taobao.weex.dom.flex.Spacing;
import com.taobao.weex.ui.animation.WXAnimationBean;
import com.taobao.weex.ui.animation.WXAnimationModule;
import com.taobao.weex.ui.component.WXBasicComponentType;
import com.taobao.weex.ui.component.WXComponent;
import com.taobao.weex.ui.component.WXComponentFactory;
import com.taobao.weex.ui.component.WXScroller;
import com.taobao.weex.ui.component.WXVContainer;
import com.taobao.weex.utils.WXLogUtils;
import com.taobao.weex.utils.WXViewUtils;

import java.util.HashMap;
import java.util.Map;

/**
 * Class for rendering view. Method in this class should be run in main thread.
 * This class is also <strong>not</storng> thread safe.
 * This class is very similar to {@link com.taobao.weex.dom.WXDomStatement}
 * @see com.taobao.weex.dom.WXDomStatement
 */
class WXRenderStatement {

  private String mInstanceId;
  private Map<String, WXComponent> mRegistry;
  private WXSDKInstance mWXSDKInstance;
  /**
   * The container for weex root view.
   */
  private WXVContainer mGodComponent;

  public WXRenderStatement(WXSDKInstance instance, String instaceId) {
    mWXSDKInstance = instance;
    mInstanceId = instaceId;
    mRegistry = new HashMap<>();
  }

  /**
   * @see com.taobao.weex.dom.WXDomStatement#destroy()
   */
  public void destroy() {
    mWXSDKInstance = null;
    if (mGodComponent != null) {
      mGodComponent.destroy();
    }
    mRegistry.clear();
  }

  public WXSDKInstance getWXSDKInstance() {
    return mWXSDKInstance;
  }

  public void flushView(String ref) {
    WXComponent component = mRegistry.get(ref);
    if (component == null) {
      return;
    }
    component.flushView();
  }

  /**
   * create RootView ，every weex Instance View has a rootView;
   * @see com.taobao.weex.dom.WXDomStatement#createBody(JSONObject)
   */
  void createBody(WXComponent component) {
    long start = System.currentTimeMillis();
    component.createView(mGodComponent, -1);
    if (WXEnvironment.isApkDebugable()) {
      WXLogUtils.renderPerformanceLog("createView", (System.currentTimeMillis() - start));
    }
    start = System.currentTimeMillis();
    component.bind(null);
    if (WXEnvironment.isApkDebugable()) {
      WXLogUtils.renderPerformanceLog("bind", (System.currentTimeMillis() - start));
    }

    if (component instanceof WXScroller) {
      WXScroller scroller = (WXScroller) component;
      if (scroller.getView() instanceof ScrollView) {
        mWXSDKInstance.setRootScrollView((ScrollView) scroller.getView());
      }
    }
    mWXSDKInstance.setRootView(mGodComponent.getRealView());
    if (mWXSDKInstance.getRenderStrategy() != WXRenderStrategy.APPEND_ONCE) {
      mWXSDKInstance.onViewCreated(mGodComponent);
    }
  }

  WXComponent createBodyOnDomThread(WXDomObject dom) {
    if (mWXSDKInstance == null) {
      return null;
    }
    WXDomObject domObject = new WXDomObject();
    domObject.type = WXBasicComponentType.DIV;
    domObject.ref = "god";
    mGodComponent = (WXVContainer) WXComponentFactory.newInstance(mWXSDKInstance, domObject, null, mInstanceId);
    mGodComponent.createView(null, -1);
    if (mGodComponent == null) {
      if (WXEnvironment.isApkDebugable()) {
        WXLogUtils.e("rootView failed!");
      }
      //TODO error callback
      return null;
    }
    FrameLayout frameLayout = (FrameLayout) mGodComponent.getView();
    ViewGroup.LayoutParams layoutParams = new LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT);
    frameLayout.setLayoutParams(layoutParams);

    WXComponent component = generateComponentTree(dom, mGodComponent);
    mGodComponent.addChild(component);
    mRegistry.put(component.getRef(), component);
    return component;
  }

  /**
   * set padding style of View
   */
  void setPadding(String ref, Spacing padding, Spacing border) {
    WXComponent component = mRegistry.get(ref);
    if (component == null) {
      return;
    }
    component.setPadding(padding, border);
  }

  /**
   * set layout information of View
   */
  void setLayout(String ref, WXDomObject domObject) {
    WXComponent component = mRegistry.get(ref);
    if (component == null) {
      return;
    }
    component.setLayout(domObject);
  }

  /**
   * set extra information of View
   */
  void setExtra(String ref, Object extra) {
    WXComponent component = mRegistry.get(ref);
    if (component == null) {
      return;
    }
    component.updateExtra(extra);
  }

  /**
   * @see com.taobao.weex.dom.WXDomStatement#addDom(JSONObject, String, int)
   */
  void addComponent(WXDomObject dom, String parentRef, int index) {
    WXVContainer parent = (WXVContainer) mRegistry.get(parentRef);
    WXComponent component = generateComponentTree(dom, parent);
    parent.addChild(component, index);
    WXAnimationModule.applyTransformStyle(dom.style, component);
  }

  WXComponent createComponentOnDomThread(WXDomObject dom, String parentRef, int index) {
    return generateComponentTree(dom, (WXVContainer) mRegistry.get(parentRef));
  }

  /**
   * @see com.taobao.weex.dom.WXDomStatement#addDom(JSONObject, String, int)
   */
  void addComponent(WXComponent component, String parentRef, int index) {
    WXVContainer parent = (WXVContainer) mRegistry.get(parentRef);
    if (parent == null || component == null) {
      return;
    }
    component.createView(parent, index);
    component.bind(null);
    parent.addChild(component, index);
    WXAnimationModule.applyTransformStyle(component.mDomObj.style, component);
  }

  /**
   *@see com.taobao.weex.dom.WXDomStatement#removeDom(String)
   */
  WXComponent removeComponent(String ref) {
    WXComponent component = mRegistry.get(ref);
    if (component == null || component.getParent() == null) {
      return component;
    }
    WXVContainer parent = component.getParent();
    parent.remove(component);
    clearRegistryForComponent(component);
    component.destroy();
    return component;
  }

  /**
   * Clear registry information that current instance contains.
   */
  private void clearRegistryForComponent(WXComponent component) {
    WXComponent removedComponent = mRegistry.remove(component.getDomObject().ref);
    if (removedComponent != null) {
      removedComponent.removeAllEvent();
      removedComponent.removeStickyStyle();
    }
    if (component instanceof WXVContainer) {
      WXVContainer container = (WXVContainer) component;
      int count = container.childCount();
      for (int i = count - 1; i >= 0; --i) {
        clearRegistryForComponent(container.getChild(i));
      }
    }

  }

  /**
   * @see com.taobao.weex.dom.WXDomStatement#moveDom(String, String, int)
   */
  void move(String ref, String parentRef, int index) {
    WXComponent component = mRegistry.get(ref);
    WXComponent newParent = mRegistry.get(parentRef);
    if (component == null || component.getParent() == null
        || newParent == null || !(newParent instanceof WXVContainer)) {
      return;
    }
    WXVContainer oldParent = component.getParent();
    oldParent.remove(component);
    ((WXVContainer) newParent).addChild(component, index);
  }

  /**
   * @see com.taobao.weex.dom.WXDomStatement#addEvent(String, String)
   */
  void addEvent(String ref, String type) {
    WXComponent component = mRegistry.get(ref);
    if (component == null) {
      return;
    }
    component.addEvent(type);
  }

  /**
   * @see WXDomObject#removeEvent(String)
   */
  void removeEvent(String ref, String type) {
    WXComponent component = mRegistry.get(ref);
    if (component == null) {
      return;
    }
    component.removeEvent(type);
  }

  /**
   * @see com.taobao.weex.dom.WXDomStatement#updateAttrs(String, JSONObject)
   */
  void updateAttrs(String ref, Map<String, Object> attrs) {
    WXComponent component = mRegistry.get(ref);
    if (component == null) {
      return;
    }

    component.updateProperties(attrs);
  }

  /**
   * @see com.taobao.weex.dom.WXDomStatement#updateStyle(String, JSONObject)
   */
  void updateStyle(String ref, Map<String, Object> style) {
    WXComponent component = mRegistry.get(ref);
    if (component == null) {
      return;
    }

    component.updateProperties(style);
    WXAnimationModule.applyTransformStyle(style, component);
  }

  /**
   * @see com.taobao.weex.dom.WXDomStatement#scrollToDom(String, JSONObject)
   */
  void scrollTo(String ref, Map<String, Object> options) {
    WXComponent component = mRegistry.get(ref);
    if (component == null) {
      return;
    }

    int offsetInt = 0;
    if (options != null) {
      String offset = options.get("offset") == null ? "0" : options.get("offset").toString();
      if (offset != null) {
        offsetInt = Integer.parseInt(offset);
      }
    }

    WXScroller scroller = component.getParentScroller();
    if (scroller == null) {
      return;
    }
    int offsetIntF = (int) WXViewUtils.getRealPxByWidth(offsetInt);
    int[] scrollerP = new int[2];
    scroller.getView().getLocationOnScreen(scrollerP);
    if (scrollerP[1] == component.getAbsoluteY()) {
      return;
    }

    scroller.scrollBy(0,
                      scroller.getView().getScrollY() - component.getAbsoluteY() - offsetIntF);
  }

  /**
   * weex render finish
   * @see  com.taobao.weex.dom.WXDomStatement#createFinish()
   */
  void createFinish(int width, int height) {
    if (mWXSDKInstance.getRenderStrategy() == WXRenderStrategy.APPEND_ONCE) {
      mWXSDKInstance.onViewCreated(mGodComponent);
    }
    mWXSDKInstance.onRenderSuccess(width, height);
  }

  /**
   * weex refresh finish
   * @see com.taobao.weex.dom.WXDomStatement#refreshFinish()
   */
  void refreshFinish(int width, int height) {
    mWXSDKInstance.onRefreshSuccess(width, height);
  }

  private WXComponent generateComponentTree(WXDomObject dom, WXVContainer parent) {
    if (dom == null || parent == null) {
      return null;
    }
    WXComponent component = WXComponentFactory.newInstance(mWXSDKInstance, dom,
                                                           parent, mInstanceId, parent.isLazy());

    mRegistry.put(dom.ref, component);
    if (component instanceof WXVContainer) {
      WXVContainer parentC = (WXVContainer) component;
      int count = dom.childCount();
      WXDomObject child = null;
      for (int i = 0; i < count; ++i) {
        child = dom.getChild(i);
        if (child != null) {
          parentC.addChild(generateComponentTree(child, parentC));
        }
      }
    }

    return component;
  }

  void startAnimation(String ref, String animation, String callBack) {
    WXComponent component = mRegistry.get(ref);
    if (component == null || component.getRealView() == null) {
      return;
    } else {
      try {
        WXAnimationBean animationBean = WXAnimationModule.parseAnimation(animation, component.getRealView().getLayoutParams());
        if (animationBean != null) {
          Animator animator = WXAnimationModule.createAnimator(animationBean, component.getRealView());
          if (animator != null) {
            Animator.AnimatorListener animatorListener = WXAnimationModule.createAnimatorListener(mWXSDKInstance, callBack);
            Interpolator interpolator = WXAnimationModule.createTimeInterpolator(animationBean);
            if (animatorListener != null) {
              animator.addListener(animatorListener);
            }
            if (interpolator != null) {
              animator.setInterpolator(interpolator);
            }
            animator.setDuration(animationBean.duration);
            animator.start();
          }
        }
      } catch (RuntimeException e) {
        WXLogUtils.e(WXLogUtils.getStackTrace(e));
      }
    }
  }

}
