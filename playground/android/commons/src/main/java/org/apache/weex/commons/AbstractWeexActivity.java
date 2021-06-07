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
package org.apache.weex.commons;

import android.graphics.PixelFormat;
import android.graphics.Rect;
import android.os.Bundle;
import android.support.annotation.CallSuper;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.view.KeyEvent;
import android.view.View;
import android.view.ViewGroup;

import com.alibaba.fastjson.JSONObject;
import org.apache.weex.commons.util.AssertUtil;
import com.taobao.weex.IWXRenderListener;
import com.taobao.weex.WXEnvironment;
import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.common.Constants;
import com.taobao.weex.common.WXRenderStrategy;
import com.taobao.weex.utils.WXUtils;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by sospartan on 5/30/16.
 */
public abstract class AbstractWeexActivity extends AppCompatActivity implements IWXRenderListener {
  private static final String TAG = "AbstractWeexActivity";

  private ViewGroup mContainer;
  private WXSDKInstance mInstance;

  protected WXAnalyzerDelegate mWxAnalyzerDelegate;

  @Override
  protected void onCreate(@Nullable Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    createWeexInstance();
    mInstance.onActivityCreate();

    mWxAnalyzerDelegate = new WXAnalyzerDelegate(this);
    mWxAnalyzerDelegate.onCreate();
    getWindow().setFormat(PixelFormat.TRANSLUCENT);
  }

  protected final void setContainer(ViewGroup container){
    mContainer = container;
  }

  protected final ViewGroup getContainer(){
    return mContainer;
  }

  protected void destoryWeexInstance(){
    if(mInstance != null){
      mInstance.registerRenderListener(null);
      mInstance.destroy();
      mInstance = null;
    }
  }

  protected void createWeexInstance(){
    destoryWeexInstance();

    Rect outRect = new Rect();
    getWindow().getDecorView().getWindowVisibleDisplayFrame(outRect);

    mInstance = new WXSDKInstance(this);
    mInstance.registerRenderListener(this);
  }

  protected void renderPage(String template,String source){
    renderPage(template,source,null);
  }

  protected void renderPage(String template,String source,String jsonInitData){
    AssertUtil.throwIfNull(mContainer,new RuntimeException("Can't render page, container is null"));
    Map<String, Object> options = new HashMap<>();
    options.put(WXSDKInstance.BUNDLE_URL, source);
    // Set options.bundleDigest
    try {
      String banner = WXUtils.getBundleBanner(template);
      JSONObject jsonObj = JSONObject.parseObject(banner);
      String digest = null;
      if (jsonObj != null) {
        digest = jsonObj.getString(Constants.CodeCache.BANNER_DIGEST);
      }
      if (digest != null) {
        options.put(Constants.CodeCache.DIGEST, digest);
      }
    } catch (Throwable t) {}
    //Set options.codeCachePath
    String path = WXEnvironment.getFilesDir(getApplicationContext());
    path += File.separator;
    path += Constants.CodeCache.SAVE_PATH;
    path += File.separator;
    options.put(Constants.CodeCache.PATH, path);

    mInstance.setTrackComponent(true);
    mInstance.render(
      getPageName(),
      template,
      options,
      jsonInitData,
      WXRenderStrategy.APPEND_ASYNC);
  }

  protected void renderPageByURL(String url){
    renderPageByURL(url,null);
  }

  protected void renderPageByURL(String url,String jsonInitData){
    AssertUtil.throwIfNull(mContainer,new RuntimeException("Can't render page, container is null"));
    Map<String, Object> options = new HashMap<>();
    options.put(WXSDKInstance.BUNDLE_URL, url);
    mInstance.setTrackComponent(true);
    mInstance.renderByUrl(
      getPageName(),
      url,
      options,
      jsonInitData,
      WXRenderStrategy.APPEND_ASYNC);
  }

  protected String getPageName(){
    return TAG;
  }

  @Override
  public void onStart() {
    super.onStart();
    if(mInstance!=null){
      mInstance.onActivityStart();
    }
    if(mWxAnalyzerDelegate != null){
      mWxAnalyzerDelegate.onStart();
    }
  }

  @Override
  public void onResume() {
    super.onResume();
    if(mInstance!=null){
      mInstance.onActivityResume();
    }
    if(mWxAnalyzerDelegate != null){
      mWxAnalyzerDelegate.onResume();
    }
  }

  @Override
  public void onPause() {
    super.onPause();
    if(mInstance!=null){
      mInstance.onActivityPause();
    }
    if(mWxAnalyzerDelegate != null){
      mWxAnalyzerDelegate.onPause();
    }
  }

  @Override
  public void onStop() {
    super.onStop();
    if(mInstance!=null){
      mInstance.onActivityStop();
    }
    if(mWxAnalyzerDelegate != null){
      mWxAnalyzerDelegate.onStop();
    }
  }

  @Override
  public void onDestroy() {
    super.onDestroy();
    if(mInstance!=null){
      mInstance.onActivityDestroy();
    }
    if(mWxAnalyzerDelegate != null){
      mWxAnalyzerDelegate.onDestroy();
    }
  }

  @Override
  public void onViewCreated(WXSDKInstance wxsdkInstance, View view) {
    View wrappedView = null;
    if(mWxAnalyzerDelegate != null){
      wrappedView = mWxAnalyzerDelegate.onWeexViewCreated(wxsdkInstance,view);
    }
    if(wrappedView != null){
      view = wrappedView;
    }
    if (mContainer != null) {
      mContainer.removeAllViews();
      mContainer.addView(view);
    }
  }



  @Override
  public void onRefreshSuccess(WXSDKInstance wxsdkInstance, int i, int i1) {

  }

  @Override
  @CallSuper
  public void onRenderSuccess(WXSDKInstance instance, int width, int height) {
    if(mWxAnalyzerDelegate  != null){
      mWxAnalyzerDelegate.onWeexRenderSuccess(instance);
    }
  }

  @Override
  @CallSuper
  public void onException(WXSDKInstance instance, String errCode, String msg) {
    if(mWxAnalyzerDelegate != null){
      mWxAnalyzerDelegate.onException(instance,errCode,msg);
    }
  }

  @Override
  @CallSuper
  public boolean onKeyUp(int keyCode, KeyEvent event) {
    return (mWxAnalyzerDelegate != null && mWxAnalyzerDelegate.onKeyUp(keyCode,event)) || super.onKeyUp(keyCode, event);
  }

  @Override
  public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
    super.onRequestPermissionsResult(requestCode, permissions, grantResults);
    if (mInstance != null) {
      mInstance.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }
  }
}
