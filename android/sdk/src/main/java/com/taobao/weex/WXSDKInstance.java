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
package com.taobao.weex;

import android.content.Context;
import android.text.TextUtils;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ScrollView;

import com.taobao.weex.adapter.DefaultWXHttpAdapter;
import com.taobao.weex.adapter.IWXHttpAdapter;
import com.taobao.weex.adapter.IWXImgLoaderAdapter;
import com.taobao.weex.adapter.IWXUserTrackAdapter;
import com.taobao.weex.common.WXErrorCode;
import com.taobao.weex.common.WXPerformance;
import com.taobao.weex.common.WXRefreshData;
import com.taobao.weex.common.WXRenderStrategy;
import com.taobao.weex.common.WXRequest;
import com.taobao.weex.common.WXResponse;
import com.taobao.weex.http.WXHttpUtil;
import com.taobao.weex.ui.WXRecycleImageManager;
import com.taobao.weex.ui.component.WXComponent;
import com.taobao.weex.ui.view.WXScrollView;
import com.taobao.weex.ui.view.WXScrollView.WXScrollViewListener;
import com.taobao.weex.utils.WXConst;
import com.taobao.weex.utils.WXJsonUtils;
import com.taobao.weex.utils.WXLogUtils;
import com.taobao.weex.utils.WXReflectionUtils;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentLinkedQueue;

/**
 * Each instance of WXSDKInstance represents an running weex instance.
 * It can be a pure weex view, or mixed with native view
 */
public class WXSDKInstance implements IWXActivityStateListener {

  public boolean mEnd = false;
  // adapters
  protected IWXImgLoaderAdapter mImgLoaderAdapter;
  protected IWXUserTrackAdapter mUserTrackAdapter;
  protected IWXHttpAdapter mWXHttpAdapter;
  private IWXRenderListener mRenderListener;
  private Context mContext;
  private volatile String mInstanceId;
  private WXComponent mRootCom;
  private boolean mRendered;
  private WXRefreshData mLastRefreshData;
  /**
   * Render strategy.
   */
  private WXRenderStrategy mRenderStrategy = WXRenderStrategy.APPEND_ASYNC;
  /**
   * Width of weex's root container.
   */
  private int mGodViewWidth = -1;
  /**
   * Height of weex's root container.
   */
  private int mGodViewHeight = -1;
  /**
   * Render start time
   */
  private long mRenderStartTime;
  /**
   * Refresh start time
   */
  private long mRefreshStartTime;
  private WXRecycleImageManager mRecycleImageManager;
  private ConcurrentLinkedQueue<IWXActivityStateListener> mActivityStateListeners;
  private WXPerformance mWXPerformance;
  private ScrollView mScrollView;
  private WXScrollViewListener mWXScrollViewListener;

  private ViewGroup rootView;

  public WXSDKInstance(Context context) {
    mContext = context;
    mActivityStateListeners = new ConcurrentLinkedQueue<>();
    mRecycleImageManager = new WXRecycleImageManager(this);

    mWXPerformance = new WXPerformance();
    mWXPerformance.WXSDKVersion = WXEnvironment.WXSDK_VERSION;
    mWXPerformance.JSLibInitTime = WXEnvironment.sJSLibInitTime;
  }

  public void setBizType(String bizType) {
    if (!TextUtils.isEmpty(bizType)) {
      mWXPerformance.bizType = bizType;
    }
  }

  public ScrollView getScrollView() {
    return mScrollView;
  }

  public void setRootScrollView(ScrollView scrollView) {
    mScrollView = scrollView;
    if (mWXScrollViewListener != null) {
      ((WXScrollView) mScrollView).addScrollViewListener(mWXScrollViewListener);
    }
  }

  public void registerScrollViewListener(WXScrollViewListener scrollViewListener) {
    mWXScrollViewListener = scrollViewListener;
  }

  public WXScrollViewListener getScrollViewListener() {
    return mWXScrollViewListener;
  }

  public void setIWXUserTrackAdapter(IWXUserTrackAdapter adapter) {
    mUserTrackAdapter = adapter;
  }

  /**
   * Render template asynchronously, use {@link WXRenderStrategy#APPEND_ASYNC} as render strategy
   * @param template bundle js
   * @param options  os   iphone/android/ipad
   *                 weexversion    Weex version(like 1.0.0)
   *                 appversion     App version(like 1.0.0)
   *                 devid        Device id(like Aqh9z8dRJNBhmS9drLG5BKCmXhecHUXIZoXOctKwFebH)
   *                 sysversion    Device system version(like 5.4.4、7.0.4, should be used with os)
   *                 sysmodel     Device model(like iOS:"MGA82J/A", android:"MI NOTE LTE")
   *                 Time    UNIX timestamp, UTC+08:00
   *                 TTID(Optional)
   *                 MarkertId
   *                 Appname(Optional)  tm,tb,qa
   *                 Bundleurl(Optional)  template url
   * @param jsonInitData Initial data for rendering
   */
  public void render(String template, Map<String, Object> options, String jsonInitData) {
    render(template, options, jsonInitData, WXRenderStrategy.APPEND_ASYNC);
  }

  /**
   * Render template asynchronously
   * @param template bundle js
   * @param options  os   iphone/android/ipad
   *                 weexversion    Weex version(like 1.0.0)
   *                 appversion     App version(like 1.0.0)
   *                 devid        Device id(like Aqh9z8dRJNBhmS9drLG5BKCmXhecHUXIZoXOctKwFebH)
   *                 sysversion    Device system version(like 5.4.4、7.0.4, should be used with os)
   *                 sysmodel     Device model(like iOS:"MGA82J/A", android:"MI NOTE LTE")
   *                 Time    UNIX timestamp, UTC+08:00
   *                 TTID(Optional)
   *                 MarkertId
   *                 Appname(Optional)  tm,tb,qa
   *                 Bundleurl(Optional)  template url
   * @param jsonInitData Initial data for rendering
   * @param flag     RenderStrategy {@link WXRenderStrategy}
   */
  public void render(String template, Map<String, Object> options, String jsonInitData, WXRenderStrategy flag) {
    render(WXPerformance.DEFAULT, template, options, jsonInitData, -1, -1, flag);
  }

  /**
   * Render template asynchronously
   *
   * @param pageName, used for performance log.
   * @param template bundle js
   * @param options  os   iphone/android/ipad
   *                 weexversion    Weex version(like 1.0.0)
   *                 appversion     App version(like 1.0.0)
   *                 devid        Device id(like Aqh9z8dRJNBhmS9drLG5BKCmXhecHUXIZoXOctKwFebH)
   *                 sysversion    Device system version(like 5.4.4、7.0.4, should be used with os)
   *                 sysmodel     Device model(like iOS:"MGA82J/A", android:"MI NOTE LTE")
   *                 Time    UNIX timestamp, UTC+08:00
   *                 TTID(Optional)
   *                 MarkertId
   *                 Appname(Optional)  tm,tb,qa
   *                 Bundleurl(Optional)  template url
   * @param jsonInitData Initial data for rendering
   * @param width    Width of weex's root container, the default is match_parent
   * @param height   Height of weex's root container, the default is match_parent
   * @param flag     RenderStrategy {@link WXRenderStrategy}
   */
  public void render(String pageName, String template, Map<String, Object> options, String jsonInitData, int width, int height, WXRenderStrategy flag) {
    if (mRendered || TextUtils.isEmpty(template)) {
      return;
    }
    mWXPerformance.pageName = pageName;
    mWXPerformance.JSTemplateSize = template.length() / 1024;

    mRenderStartTime = System.currentTimeMillis();
    mRenderStrategy = flag;
    mGodViewWidth = width;
    mGodViewHeight = height;
    mInstanceId = WXSDKManager.getInstance().generateInstanceId();
    WXSDKManager.getInstance().createInstance(this, template, options, jsonInitData);
    mRendered = true;
  }

  /**
   * Render template asynchronously, use {@link WXRenderStrategy#APPEND_ASYNC} as render strategy
   * @param template bundle js
   * @param width    default match_parent
   * @param height   default match_parent
   */
  public void render(String template, int width, int height) {
    render(WXPerformance.DEFAULT, template, null, null, width, height, mRenderStrategy);
  }

  /**
   * @param pageName, used for performance log.
   * @param url  template bound.js . Parameter about the request
   * @param adapter  Adapter for HTTP connection. Null for default adapter.
   * @param options  os   iphone/android/ipad
   *                 weexversion    Weex version(like 1.0.0)
   *                 appversion     App version(like 1.0.0)
   *                 devid        Device id(like Aqh9z8dRJNBhmS9drLG5BKCmXhecHUXIZoXOctKwFebH)
   *                 sysversion    Device system version(like 5.4.4、7.0.4, should be used with os)
   *                 sysmodel     Device model(like iOS:"MGA82J/A", android:"MI NOTE LTE")
   *                 Time    UNIX timestamp, UTC+08:00
   *                 TTID(Optional)
   *                 MarkertId
   *                 Appname(Optional)  tm,tb,qa
   *                 Bundleurl(Optional)  template url
   * @param jsonInitData Initial data for rendering
   * @param width    Width of weex's root container, the default is match_parent
   * @param height   Height of weex's root container, the default is match_parent
   * @param flag     RenderStrategy {@link WXRenderStrategy}
   */
  public void render(final String pageName, final String url, IWXHttpAdapter adapter, Map<String, Object> options, final String jsonInitData, final int width, final int height, final WXRenderStrategy flag) {
    if (adapter == null) {
      adapter = new DefaultWXHttpAdapter();
    }

    WXRequest wxRequest = new WXRequest();
    wxRequest.url = url;
    if (wxRequest.paramMap == null) {
      wxRequest.paramMap = new HashMap<String, Object>();
    }
    wxRequest.paramMap.put("user-agent", WXHttpUtil.assembleUserAgent());
    if (options == null) {
      options = new HashMap<String, Object>();
    }
    if (!options.containsKey("bundleUrl")) {
      options.put("bundleUrl", url);
    }
    adapter.sendRequest(wxRequest, new WXHttpListener(pageName, options, jsonInitData, width, height, flag, System.currentTimeMillis()));
    mWXHttpAdapter = adapter;
  }


  /**
   * Refresh instance asynchronously.
   * @param data the new data
   */
  public void refreshInstance(Map<String, Object> data) {
    if (data == null) {
      return;
    }
    refreshInstance(WXJsonUtils.fromObjectToJSONString(data));
  }

  /**
   * Refresh instance asynchronously.
   * @param jsonData the new data
   */
  public void refreshInstance(String jsonData) {
    if (jsonData == null) {
      return;
    }
    mRefreshStartTime = System.currentTimeMillis();
    //cancel last refresh message
    if (mLastRefreshData != null) {
      mLastRefreshData.isDirty = true;
    }

    mLastRefreshData = new WXRefreshData(jsonData, false);

    WXSDKManager.getInstance().refreshInstance(mInstanceId, mLastRefreshData);
  }

  public WXRenderStrategy getRenderStrategy() {
    return mRenderStrategy;
  }

  public String getInstanceId() {
    return mInstanceId;
  }

  public Context getContext() {
    return mContext;
  }

  public int getWeexHeight() {
    return mGodViewHeight;
  }

  public int getWeexWidth() {
    return mGodViewWidth;
  }

  public WXRecycleImageManager getRecycleImageManager() {
    return mRecycleImageManager;
  }

  public IWXImgLoaderAdapter getImgLoaderAdapter() {
    return mImgLoaderAdapter;
  }

  public void setImgLoaderAdapter(IWXImgLoaderAdapter adapter) {
    this.mImgLoaderAdapter = adapter;
  }

  public IWXHttpAdapter getWXHttpAdapter() {
    return mWXHttpAdapter;
  }

  public void setWXHttpAdapter(IWXHttpAdapter WXHttpAdapter) {
    mWXHttpAdapter = WXHttpAdapter;
  }

  public void reloadImages() {
    if (mScrollView == null) {
      return;
    }
    WXSDKManager.getInstance().postOnUiThread(new Runnable() {
      @Override
      public void run() {
        if (mRecycleImageManager != null) {
          mRecycleImageManager.loadImage();
        }
      }
    }, 250);
  }

  /********************************
   * begin register listener
   ********************************************************/
  public void registerRenderListener(IWXRenderListener listener) {
    mRenderListener = listener;
  }

  public void registerActivityStateListener(IWXActivityStateListener listener) {
    if (listener == null) {
      return;
    }

    if (!mActivityStateListeners.contains(listener)) {
      mActivityStateListeners.add(listener);
    }
  }

  /********************************
   * end register listener
   ********************************************************/

  // WAActivityStateListener//////////////////////////////////////////////////////////////////////////////////
  @Override
  public void onActivityCreate() {
    for (IWXActivityStateListener listener : mActivityStateListeners) {
      listener.onActivityCreate();
    }
  }

  @Override
  public void onActivityStart() {
    for (IWXActivityStateListener listener : mActivityStateListeners) {
      listener.onActivityStart();
    }
  }

  @Override
  public void onActivityPause() {
    for (IWXActivityStateListener listener : mActivityStateListeners) {
      listener.onActivityPause();
    }
  }

  @Override
  public void onActivityResume() {
    for (IWXActivityStateListener listener : mActivityStateListeners) {
      listener.onActivityResume();
    }
  }

  @Override
  public void onActivityStop() {
    for (IWXActivityStateListener listener : mActivityStateListeners) {
      listener.onActivityStop();
    }
  }

  @Override
  public void onActivityDestroy() {
    for (IWXActivityStateListener listener : mActivityStateListeners) {
      listener.onActivityDestroy();
    }
    destroy();
  }

  @Override
  public boolean onActivityBack() {
    for (IWXActivityStateListener listener : mActivityStateListeners) {
      boolean isIntercept = listener.onActivityBack();
      if (isIntercept) {
        return true;
      }
    }
    return false;
  }

  public void onViewCreated(final WXComponent component) {
    if (mRenderListener != null && mContext != null) {
      runOnUiThread(new Runnable() {

        @Override
        public void run() {
          if (mRenderListener != null && mContext != null) {
            mRootCom = component;
            mRenderListener.onViewCreated(WXSDKInstance.this, component.getView());
          }
        }
      });
    }
  }

  public void runOnUiThread(Runnable action) {
    WXSDKManager.getInstance().postOnUiThread(action, 0);
  }

  public void onRenderSuccess(final int width, final int height) {
    long time = System.currentTimeMillis() - mRenderStartTime;
    WXLogUtils.renderPerformanceLog("onRenderSuccess", time);
    mWXPerformance.totalTime = time;
    WXLogUtils.d(WXLogUtils.WEEX_PERF_TAG, "mComponentNum:" + WXComponent.mComponentNum);
    WXComponent.mComponentNum = 0;
    if (mRenderListener != null && mContext != null) {
      runOnUiThread(new Runnable() {

        @Override
        public void run() {
          if (mRenderListener != null && mContext != null) {
            mRenderListener.onRenderSuccess(WXSDKInstance.this, width, height);

            if (WXEnvironment.isApkDebugable()) {
              WXLogUtils.d(WXLogUtils.WEEX_PERF_TAG, mWXPerformance.toString());
            }
            if (mUserTrackAdapter != null) {
              mUserTrackAdapter.commit(mContext, null, WXConst.LOAD, mWXPerformance, null);
            }
          }
        }
      });
    }
  }

  public void onRefreshSuccess(final int width, final int height) {
    WXLogUtils.renderPerformanceLog("onRefreshSuccess", (System.currentTimeMillis() - mRefreshStartTime));
    if (mRenderListener != null && mContext != null) {
      runOnUiThread(new Runnable() {

        @Override
        public void run() {
          if (mRenderListener != null && mContext != null) {
            mRenderListener.onRefreshSuccess(WXSDKInstance.this, width, height);
          }
        }
      });
    }
  }

  public void onRenderError(final String errCode, final String msg) {
    if (mRenderListener != null && mContext != null) {
      runOnUiThread(new Runnable() {

        @Override
        public void run() {
          if (mRenderListener != null && mContext != null) {
            mRenderListener.onException(WXSDKInstance.this, errCode, msg);
          }
        }
      });
    }
  }

  public void onJSException(final String errCode, final String function, final String exception) {
    if (mRenderListener != null && mContext != null) {
      runOnUiThread(new Runnable() {

        @Override
        public void run() {
          if (mRenderListener != null && mContext != null) {
            StringBuilder builder = new StringBuilder();
            builder.append(function);
            builder.append(exception);
            mRenderListener.onException(WXSDKInstance.this, errCode, builder.toString());
          }
        }
      });
    }
  }

  public void firstScreenRenderFinished(long endTime) {
    mEnd = true;
    long time = endTime - mRenderStartTime;
    mWXPerformance.screenRenderTime = time;
    WXLogUtils.renderPerformanceLog("firstScreenRenderFinished", time);
  }

  public void createInstanceFinished(long time) {
    if (time > 0) {
      mWXPerformance.communicateTime = time;
    }
  }

  /**
   * UserTrack Log
   */
  public void commitUTStab(final String type, final WXErrorCode errorCode) {
    if (errorCode == WXErrorCode.WX_SUCCESS) {
      return;
    }
    runOnUiThread(new Runnable() {

      @Override
      public void run() {
        if (mUserTrackAdapter == null || TextUtils.isEmpty(type)) {
          return;
        }
        // Log for commit
        if (errorCode.getErrorCode() == null && errorCode.getErrorMsg() == null) {
          mUserTrackAdapter.commit(mContext, null, type, null, null);
          return;
        }

        WXPerformance perf = new WXPerformance();
        perf.errCode = errorCode.getErrorCode();
        perf.errMsg = errorCode.getErrorMsg();
        if (WXEnvironment.isApkDebugable()) {
          WXLogUtils.d(perf.toString());
        }
        mUserTrackAdapter.commit(mContext, null, type, perf, null);
      }
    });

  }

  private void destroyView(View rootView) {
    try {
      if (rootView instanceof ViewGroup) {
        ViewGroup cViewGroup = ((ViewGroup) rootView);
        for (int index = 0; index < cViewGroup.getChildCount(); index++) {
          destroyView(cViewGroup.getChildAt(index));
        }

        cViewGroup.removeViews(0, ((ViewGroup) rootView).getChildCount());
        // Ensure that the viewgroup's status to be normal
        WXReflectionUtils.setValue(rootView, "mChildrenCount", 0);

      }
    } catch (Exception e) {
      WXLogUtils.e("WXSDKInstance destroyView Exception: " + WXLogUtils.getStackTrace(e));
    }
  }

  public void destroy() {
    WXSDKManager.getInstance().destroyInstance(mInstanceId);
    if (mRecycleImageManager != null) {
      mRecycleImageManager.destroy();
      mRecycleImageManager = null;
    }

    if (mRootCom != null && mRootCom.getView() != null) {
      mRootCom.destroy();
      destroyView(mRootCom.getView());
      mRootCom = null;
    }

    if (mActivityStateListeners != null) {
      mActivityStateListeners.clear();
      mActivityStateListeners = null;
    }

    mContext = null;
    mRenderListener = null;
  }

  public ViewGroup getRootView() {
    return rootView;
  }

  public void setRootView(ViewGroup rootView) {
    this.rootView = rootView;
  }

  /**
   * load bundle js listener
   */
  class WXHttpListener implements IWXHttpAdapter.OnHttpListener {

    private String pageName;
    private Map<String, Object> options;
    private String jsonInitData;
    private int width;
    private int height;
    private WXRenderStrategy flag;
    private long startReqeustTime;

    private WXHttpListener(String pageName, Map<String, Object> options, String jsonInitData, int width, int height, WXRenderStrategy flag, long startRequestTime) {
      this.pageName = pageName;
      this.options = options;
      this.jsonInitData = jsonInitData;
      this.width = width;
      this.height = height;
      this.flag = flag;
      this.startReqeustTime = startRequestTime;
    }


    @Override
    public void onHttpStart() {

    }

    @Override
    public void onHttpUploadProgress(int uploadProgress) {

    }

    @Override
    public void onHttpResponseProgress(int responseProgress) {

    }

    @Override
    public void onHttpFinish(WXResponse response) {

      mWXPerformance.networkTime = System.currentTimeMillis() - startReqeustTime;

      if (TextUtils.equals("200", response.statusCode)) {
        String template = new String(response.originalData);
        render(pageName, template, options, jsonInitData, width, height, flag);
      } else if (TextUtils.equals(WXRenderErrorCode.WX_USER_INTERCEPT_ERROR, response.statusCode)) {
        WXLogUtils.d("user intercept");
        return;
      } else {
        onRenderError(WXRenderErrorCode.WX_NETWORK_ERROR, response.errorMsg);
      }

    }
  }
}
