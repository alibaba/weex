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

import android.graphics.Color;
import android.support.annotation.Nullable;
import android.support.v4.view.ViewCompat;
import android.support.v7.widget.RecyclerView;
import android.text.TextUtils;
import android.view.View;
import android.view.animation.Animation;
import android.view.animation.AnimationSet;
import android.view.animation.RotateAnimation;
import android.view.animation.ScaleAnimation;
import android.view.animation.TranslateAnimation;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.taobao.weex.WXEnvironment;
import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.common.Constants;
import com.taobao.weex.common.ICheckBindingScroller;
import com.taobao.weex.common.OnWXScrollListener;
import com.taobao.weex.ui.action.BasicComponentData;
import com.taobao.weex.ui.animation.WXAnimationBean;
import com.taobao.weex.ui.component.Scrollable;
import com.taobao.weex.ui.component.WXComponent;
import com.taobao.weex.ui.component.WXDiv;
import com.taobao.weex.ui.component.WXVContainer;
import com.taobao.weex.ui.component.list.BasicListComponent;
import com.taobao.weex.ui.component.list.template.WXRecyclerTemplateList;
import com.taobao.weex.utils.WXLogUtils;
import com.taobao.weex.utils.WXResourceUtils;

import java.util.ArrayList;


/**
 * Created by zhengshihan on 2017/5/3.
 */

public class WXParallax extends WXDiv implements OnWXScrollListener, ICheckBindingScroller {

  public final static String WX_TRANSFORM = "transform";
  public final static String WX_OPACITY = "opacity";
  public static final String PARALLAX = "parallax";
  public static final String BINDING_SCROLLER = "bindingScroller";


  ArrayList<TransformCreator> mTransformPropArrayList = new ArrayList<>();
  BackgroundColorCreator mBackgroundColor;
  String mBindingRef = "";
  WXComponent mBindingComponent;

  private int mBackGroundColor = 0;
  private float mOffsetY = 0;

  public WXParallax(WXSDKInstance instance, WXVContainer parent, BasicComponentData basicComponentData) {
    super(instance, parent, basicComponentData);
    initTransform(getAttrs().get(WX_TRANSFORM));
    initOpacity(getAttrs().get(Constants.Name.OPACITY));
    initBackgroundColor(getAttrs().get(Constants.Name.BACKGROUND_COLOR));

    mBindingRef = (String) (getAttrs().get(BINDING_SCROLLER));
    instance.registerOnWXScrollListener(this);
  }

  private void initBackgroundColor(Object obj) {
    if (obj == null)
      return;

    if (obj instanceof JSONObject) {
      mBackgroundColor = new BackgroundColorCreator();
      JSONObject object = (JSONObject) obj;

      JSONArray in = object.getJSONArray("in");
      mBackgroundColor.input = new int[in.size()];
      for (int i = 0; i < in.size(); i++) {
        mBackgroundColor.input[i] = in.getInteger(i);
      }

      JSONArray out = object.getJSONArray("out");
      mBackgroundColor.output = new int[out.size()];
      for (int i = 0; i < out.size(); i++) {
        String colorStr = out.getString(i);
        mBackgroundColor.output[i] = WXResourceUtils.getColor(colorStr);
      }
    }
  }

  private void initOpacity(Object obj) {
    if (obj == null)
      return;

    if (obj instanceof JSONObject) {
      mTransformPropArrayList.add(new TransformCreator(WX_OPACITY, (JSONObject) obj));
    }

  }

  private void initTransform(Object propStr) {

    if (propStr == null) {
      WXLogUtils.w("WXParallax initAnimation propStr ==null");
      return;
    }
    JSONArray jsonObject;
    if (propStr instanceof JSONArray) {
      jsonObject = (JSONArray) propStr;
      for (int i = 0; i < jsonObject.size(); i++) {
        JSONObject object = jsonObject.getJSONObject(i);
        mTransformPropArrayList.add(i,
            new TransformCreator(object.getString("type"), object));
      }
    }
  }

  @Override
  public boolean isNeedScroller(String ref, Object option) {

    mBindingRef = (String) (getAttrs().get(BINDING_SCROLLER));
    if (TextUtils.isEmpty(mBindingRef)) {
      WXComponent root = getInstance().getRootComponent();
      if (root != null && root instanceof WXVContainer) {
        Scrollable scrollable = root.getFirstScroller();
        if (scrollable != null) {
          mBindingRef = scrollable.getRef();
        }
      }
    }
    if (!TextUtils.isEmpty(mBindingRef)
        && !TextUtils.isEmpty(ref)
        && ref.equals(mBindingRef)) {
      return true;
    }
    return false;
  }

  @Override
  public void onScrolled(View view, int dx, int dy) {
    if(ViewCompat.isInLayout(view)){
      if(mBindingComponent == null && mBindingRef != null){
        mBindingComponent = findComponent(mBindingRef);
      }
      if(mBindingComponent instanceof BasicListComponent
              && view instanceof RecyclerView){
        BasicListComponent listComponent = (BasicListComponent) mBindingComponent;
        mOffsetY = Math.abs(listComponent.calcContentOffset((RecyclerView) view));
      }else if(mBindingComponent instanceof WXRecyclerTemplateList
              && view instanceof RecyclerView){
        WXRecyclerTemplateList listComponent = (WXRecyclerTemplateList) mBindingComponent;
        mOffsetY = Math.abs(listComponent.calcContentOffset((RecyclerView) view));
      }
    }else{
       mOffsetY = mOffsetY + dy;
    }

    AnimationSet animationSet = new AnimationSet(true);
    boolean hasAnimation = false;
    for (int i = 0; i < mTransformPropArrayList.size(); i++) {
      TransformCreator creator = mTransformPropArrayList.get(i);
      Animation animation = creator.getAnimation(dx, dy);
      if (animation != null) {
        animationSet.addAnimation(animation);
        hasAnimation = true;
      }
    }

    if (hasAnimation) {
      animationSet.setFillAfter(true);
      if (getHostView() != null) {
        getHostView().startAnimation(animationSet);
      }
    }

    if (mBackgroundColor != null) {
      int color = mBackgroundColor.getColor(dx, dy);
      if (mBackGroundColor != color) {
        getHostView().setBackgroundColor(color);
        mBackGroundColor = color;
      }
    }
  }

  @Override
  public void onScrollStateChanged(View view, int x, int y, int newState) {

  }


  private class BackgroundColorCreator {

    int[] input;
    int[] output;

    int getColor(int XDelta, int YDelta) {
      if (WXEnvironment.isApkDebugable()) {
        WXLogUtils.d("WXParallax:getColor: XDelta" + XDelta + " YDelta:" + YDelta + " mOffsetY" + mOffsetY);
      }
      int r1, g1, b1;

      if (mOffsetY > input[1]) {
        return output[1];
      }

      if (mOffsetY < input[0]) {
        return output[0];
      }

      r1 = Color.red(output[0]) + (int) (mOffsetY - input[0]) * (Color.red(output[1]) - Color.red(output[0])) / (input[1] - input[0]);
      g1 = Color.green(output[0]) + (int) (mOffsetY - input[0]) * (Color.green(output[1]) - Color.green(output[0])) / (input[1] - input[0]);
      b1 = Color.blue(output[0]) + (int) (mOffsetY - input[0]) * (Color.blue(output[1]) - Color.blue(output[0])) / (input[1] - input[0]);

      if (WXEnvironment.isApkDebugable()) {
        WXLogUtils.d("WXParallax:getColor: r1" + r1 + " g1:" + g1 + " b1:" + b1);
      }
      return Color.rgb(r1, g1, b1);
    }

  }

  private class TransformCreator {

    String transformType;
    float[] input, output;
    float fromTranslateX, fromTranslateY;
    float fromScaleX, fromScaleY;
    float fromRotate, fromOpacity;

    TransformCreator(String type, JSONObject object) {
      transformType = type;
      JSONArray in = object.getJSONArray("in");
      input = parseParamArray(in);
      JSONArray out = object.getJSONArray("out");
      output = parseParamArray(out);

      switch (transformType) {
        case WXAnimationBean.Style.WX_TRANSLATE:
          fromTranslateX = output[0];
          fromTranslateY = output[1];
          break;
        case WXAnimationBean.Style.WX_SCALE:
          fromScaleX = output[0];
          fromScaleY = output[1];
          break;
        case WXAnimationBean.Style.WX_ROTATE:
          fromRotate = output[0];
          break;
        case WX_OPACITY:
          fromOpacity = output[0];
          break;
      }
    }

    float[] parseParamArray(JSONArray in) {

      int size = in.size();
      float[] param = new float[size];
      for (int j = 0; j < size; j++) {
        param[j] = in.getFloatValue(j);
      }
      return param;
    }


    @Nullable
    Animation getAnimation(float XDelta, float YDelta) {

      float offset = mOffsetY;
      if (offset > input[1]) {
        offset = input[1];
      }
      if (offset < input[0]) {
        offset = input[0];
      }
      float toTranslateX, toTranslateY, toOpacity, toScaleX, toScaleY, toRotate;
      Animation animation = null;

      if (WXEnvironment.isApkDebugable()) {
        WXLogUtils.d("WXParallax", "type:" + transformType + " XDelta:" + XDelta + " YDelta:" + YDelta);
      }
      switch (transformType) {

        case WXAnimationBean.Style.WX_TRANSLATE:
          toTranslateX = output[0] + (output[2] - output[0]) * (offset - input[0]) / (input[1] - input[0]);
          toTranslateY = output[1] + (output[3] - output[1]) * (offset - input[0]) / (input[1] - input[0]);

          if (fromTranslateX == toTranslateX && fromTranslateY == toTranslateY) {
            return null;
          }
          animation = new TranslateAnimation(fromTranslateX, toTranslateX, fromTranslateY, toTranslateY);

          fromTranslateX = toTranslateX;
          fromTranslateY = toTranslateY;

          if (WXEnvironment.isApkDebugable()) {
            WXLogUtils.d("WXParallax", "XDelta:" + XDelta + " YDelta:" + YDelta);
            WXLogUtils.d("WXParallax", " fromTranslateX:" + fromTranslateX + " toTranslateX:" + toTranslateX + " fromTranslateY:" + fromTranslateY + " toTranslateY:" + toTranslateY);
          }

          break;
        case WXAnimationBean.Style.WX_SCALE:
          toScaleX = output[0] + (output[2] - output[0]) * (offset - input[0]) / (input[1] - input[0]);
          toScaleY = output[1] + (output[3] - output[1]) * (offset - input[0]) / (input[1] - input[0]);

          if (fromScaleX == toScaleX && fromScaleY == toScaleY) {
            return null;
          }
          animation = new ScaleAnimation(fromScaleX, toScaleX, fromScaleY, toScaleY);

          if (WXEnvironment.isApkDebugable()) {
            WXLogUtils.d("WXParallax", " fromScaleX:" + fromScaleX + " toScaleX:" + toScaleX + " fromScaleY:" + fromScaleY + " toScaleY:" + toScaleY);
          }

          fromScaleX = toScaleX;
          fromScaleY = toScaleY;
          break;

        case WXAnimationBean.Style.WX_ROTATE:
          toRotate = output[0] + (output[1] - output[0]) * (offset - input[0]) / (input[1] - input[0]);
          if (fromRotate == toRotate) {
            return null;
          }
          animation = new RotateAnimation(fromRotate, toRotate, output[2], output[3]);
          fromRotate = toRotate;
          break;

        case WX_OPACITY:
          toOpacity = output[0] + (output[1] - output[0]) * (offset - input[0]) / (input[1] - input[0]);
          if (fromOpacity == toOpacity) {
            return null;
          }
          setOpacity(toOpacity);
//        animation = new AlphaAnimation(fromOpacity, toOpacity);

          if (WXEnvironment.isApkDebugable()) {
            WXLogUtils.d("WXParallax", "opacity fromOpacity:" + fromOpacity + " toOpacity:" + toOpacity);
          }

          fromOpacity = toOpacity;
          break;
      }

      return animation;
    }
  }
}
