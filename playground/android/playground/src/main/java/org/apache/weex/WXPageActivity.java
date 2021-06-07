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
package org.apache.weex;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.graphics.PixelFormat;
import android.graphics.Rect;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.support.annotation.NonNull;
import android.support.v4.util.ArrayMap;
import android.support.v7.app.ActionBar;
import android.support.v7.widget.Toolbar;
import android.text.TextUtils;
import android.util.Log;
import android.util.Pair;
import android.view.KeyEvent;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ProgressBar;
import android.widget.Toast;
import com.alibaba.fastjson.JSON;
import org.apache.weex.commons.WXAnalyzerDelegate;
import org.apache.weex.constants.Constants;
import org.apache.weex.https.HotRefreshManager;
import org.apache.weex.https.WXHttpManager;
import org.apache.weex.https.WXHttpTask;
import org.apache.weex.https.WXRequestListener;
import com.taobao.weex.IWXRenderListener;
import com.taobao.weex.RenderContainer;
import com.taobao.weex.WXSDKEngine;
import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.appfram.navigator.IActivityNavBarSetter;
import com.taobao.weex.common.RenderTypes;
import com.taobao.weex.common.WXRenderStrategy;
import com.taobao.weex.render.WXAbstractRenderContainer;
import com.taobao.weex.ui.component.NestedContainer;
import com.taobao.weex.ui.component.WXComponent;
import com.taobao.weex.ui.component.WXVContainer;
import com.taobao.weex.utils.WXFileUtils;
import com.taobao.weex.utils.WXLogUtils;
import java.io.File;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.Constructor;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


public class WXPageActivity extends WXBaseActivity implements IWXRenderListener, Handler.Callback, WXSDKInstance.NestedInstanceInterceptor {

  private static final String TAG = "WXPageActivity";
  public static final String WXPAGE = "wxpage";
  public static Activity wxPageActivityInstance;
  private ViewGroup mContainer;
  private ProgressBar mProgressBar;
  private WXSDKInstance mInstance;
  private Handler mWXHandler;
  private BroadcastReceiver mReceiver;
  private Uri mUri;
  private HashMap mConfigMap = new HashMap<String, Object>();

  @Override
  public void onCreateNestInstance(WXSDKInstance instance, NestedContainer container) {
    Log.d(TAG, "Nested Instance created.");
  }

  private WXAnalyzerDelegate mWxAnalyzerDelegate;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_wxpage);
    setCurrentWxPageActivity(this);


    WXSDKEngine.setActivityNavBarSetter(new NavigatorAdapter());
    getWindow().setFormat(PixelFormat.TRANSLUCENT);
    mUri = getIntent().getData();
    Bundle bundle = getIntent().getExtras();
    if (mUri == null && bundle == null) {
      mUri = Uri.parse(Constants.BUNDLE_URL + Constants.WEEX_SAMPLES_KEY);
    }
    if (bundle != null) {
      String bundleUrl = bundle.getString("bundleUrl");
      Log.i(TAG, "bundleUrl==" + bundleUrl);

      if (bundleUrl != null) {
        mConfigMap.put("bundleUrl", bundleUrl + Constants.WEEX_SAMPLES_KEY);
        mUri = Uri.parse(bundleUrl + Constants.WEEX_SAMPLES_KEY);

      }
    } else {
      mConfigMap.put("bundleUrl", mUri.toString() + Constants.WEEX_SAMPLES_KEY);
      // mUri = Uri.parse(mUri.toString() + Constants.WEEX_SAMPLES_KEY)
    }

    if (mUri == null) {
      Toast.makeText(this, "the uri is empty!", Toast.LENGTH_SHORT).show();
      finish();
      return;
    }

    Log.e("TestScript_Guide mUri==", mUri.toString());
    initUIAndData();

    if(WXPAGE.equals(mUri.getScheme())||
       TextUtils.equals("true",mUri.getQueryParameter("_wxpage"))) {
      mUri = mUri.buildUpon().scheme("http").build();
      loadWXfromService(mUri.toString());
      startHotRefresh();
      mWXHandler.removeCallbacks(mCollectIDMap);
      mWXHandler.postDelayed(mCollectIDMap,2000);
    }else if (TextUtils.equals("http", mUri.getScheme()) || TextUtils.equals("https", mUri.getScheme())) {
      // if url has key "_wx_tpl" then get weex bundle js
      String weexTpl = mUri.getQueryParameter(Constants.WEEX_TPL_KEY);
      String url = TextUtils.isEmpty(weexTpl) ? mUri.toString() : weexTpl;
      loadWXfromService(url);
      startHotRefresh();
    } else {
      loadWXfromLocal(false);
    }
    mInstance.onActivityCreate();
    registerBroadcastReceiver();

    mWxAnalyzerDelegate = new WXAnalyzerDelegate(this);
    mWxAnalyzerDelegate.onCreate();

    //if (mInstance.isPreDownLoad() || mInstance.isPreInitMode()){
      mInstance.onInstanceReady();
    //}
  }

  @Override
  protected void onStart() {
    super.onStart();
    if(mWxAnalyzerDelegate != null){
      mWxAnalyzerDelegate.onStart();
    }
  }

  private void loadWXfromLocal(boolean reload) {
    if (reload && mInstance != null) {
      mInstance.destroy();
      mInstance = null;
    }
    if (mInstance == null) {
      RenderContainer renderContainer = new RenderContainer(this);

      mInstance = new WXSDKInstance(this);
      mInstance.setRenderContainer(renderContainer);
      mInstance.registerRenderListener(this);
      mInstance.setNestedInstanceInterceptor(this);
      mInstance.setTrackComponent(true);
    }
    mContainer.post(new Runnable() {
      @Override
      public void run() {
        Activity ctx = WXPageActivity.this;
        Rect outRect = new Rect();
        ctx.getWindow().getDecorView().getWindowVisibleDisplayFrame(outRect);
        mConfigMap.put("bundleUrl", mUri.toString());
        String path = "file".equals(mUri.getScheme()) ? assembleFilePath(mUri) : mUri.toString();
        mInstance.render(path, WXFileUtils.loadAsset(path, WXPageActivity.this),
            mConfigMap, null,
            WXRenderStrategy.APPEND_ASYNC);
      }
    });
  }

  private String assembleFilePath(Uri uri) {
    if (uri != null && uri.getPath() != null) {
      return uri.getPath().replaceFirst("/", "");
    }
    return "";
  }

  private void initUIAndData() {

    Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
    setSupportActionBar(toolbar);

    ActionBar actionBar = getSupportActionBar();
    if (actionBar != null) {
      actionBar.setDisplayHomeAsUpEnabled(true);
      String title = mUri.toString().substring(mUri.toString().lastIndexOf(File.separator) + 1);
      if (mUri.toString().startsWith("http://dotwe.org") || mUri.toString().startsWith("https://dotwe.org")) {
        title = "Weex Online Example";
      }
      actionBar.setTitle(title);
    }

    mContainer = (ViewGroup) findViewById(R.id.container);
    mProgressBar = (ProgressBar) findViewById(R.id.progress);
    mWXHandler = new Handler(this);
    HotRefreshManager.getInstance().setHandler(mWXHandler);
    addOnListener();
  }

  private void loadWXfromService(final String url) {
    mProgressBar.setVisibility(View.VISIBLE);

    if (mInstance != null) {
       mInstance.destroy();
       mContainer.removeAllViews();
    }

    WXAbstractRenderContainer renderContainer = null;
    if(url.contains(RenderTypes.RENDER_TYPE_HERON_URL_PARAM)){
      mInstance = new WXSDKInstance(this);
      mInstance.setRenderType(RenderTypes.RENDER_TYPE_HERON);
      renderContainer = getHeronContainer(mInstance);
      if(renderContainer == null){
          mInstance.destroy();
      }
    }
    if(renderContainer == null){
      renderContainer = new RenderContainer(this);
      mInstance = WXPreLoadManager.getInstance().offerPreInitInstance(url);
      if (null != mInstance){
        mInstance.init(this);
      }else {
        mInstance = new WXSDKInstance(this);
      }
    }
    mInstance.setWXAbstractRenderContainer(renderContainer);
    mInstance.registerRenderListener(this);
    mInstance.setNestedInstanceInterceptor(this);
    mInstance.setBundleUrl(url);
    mInstance.setTrackComponent(true);
    mContainer.addView(renderContainer);

    if (mInstance.isPreDownLoad()){
      return;
    }


    WXHttpTask httpTask = new WXHttpTask();
    httpTask.url = url;
    httpTask.requestListener = new WXRequestListener() {

      @Override
      public void onSuccess(WXHttpTask task) {
        Log.i(TAG, "into--[http:onSuccess] url:" + url);
        try {
          Uri uri = Uri.parse(url);
          mConfigMap.put("bundleUrl", url);
          if(TextUtils.equals(uri.getQueryParameter("__eagle"), Boolean.TRUE.toString())){
            mInstance.render(TAG, task.response.data, mConfigMap, null);
          }
          else if (TextUtils.equals(uri.getQueryParameter("__data_render"), Boolean.TRUE.toString())){
            mInstance.render(TAG, new String(task.response.data, "UTF-8"), mConfigMap, null, WXRenderStrategy.DATA_RENDER);
          }else if (TextUtils.equals(uri.getQueryParameter("__json_render"), Boolean.TRUE.toString())){
            mInstance.render(TAG, new String(task.response.data, "UTF-8"), mConfigMap, null, WXRenderStrategy.JSON_RENDER);
          } else {
            mInstance.render(TAG, new String(task.response.data, "utf-8"), mConfigMap, null, WXRenderStrategy.APPEND_ASYNC);
          }
        } catch (UnsupportedEncodingException e) {
          e.printStackTrace();
        }
      }

      @Override
      public void onError(WXHttpTask task) {
        Log.i(TAG, "into--[http:onError]");
        mProgressBar.setVisibility(View.GONE);
        Toast.makeText(getApplicationContext(), "network error!", Toast.LENGTH_SHORT).show();
      }
    };

    WXHttpManager.getInstance().sendRequest(httpTask);
  }


  private WXAbstractRenderContainer getHeronContainer(WXSDKInstance instance){
    try{
      Class containerClass =  getClassLoader().loadClass("com.taobao.weex.heron.container.WXHeronRenderContainer");
      Constructor constructor = containerClass.getConstructor(Context.class);
      WXAbstractRenderContainer container = (WXAbstractRenderContainer) constructor.newInstance(this);
      container.createInstanceRenderView(instance.getInstanceId());
      return container;
    }catch (Exception e){
      Log.e("Weex", "getHeronContainer Error Use Native Container", e);
      return null;
    }
  }


  /**
   * hot refresh
   */
  private void startHotRefresh() {
    try {
      URL url = new URL(mUri.toString());
      String host = url.getHost();
      String query = url.getQuery();
      String wsport = TextUtils.isEmpty(query)? "8082" : getUrlParam("wsport", query);
      String wsUrl = "ws://" + host + ":" + (wsport.equals("") ? "8082" : wsport) ;
      mWXHandler.obtainMessage(Constants.HOT_REFRESH_CONNECT, 0, 0, wsUrl).sendToTarget();
    } catch (MalformedURLException e) {
      e.printStackTrace();
    }
  }

  private String getUrlParam(String key, String queryString) {
    String regex = "[?|&]?" + key + "=([^&]+)";
    Pattern p = Pattern.compile(regex);
    Matcher matcher = p.matcher(queryString);
    if (matcher.find()) {
      return matcher.group(1);
    } else {
      return "";
    }
  }

  private void addOnListener() {

  }

  private Map<String,String> mIDMap = new ArrayMap<>();
  private final Runnable mCollectIDMap = new Runnable() {
    @Override
    public void run() {
      View container = findViewById(R.id.container);

      collectId(mInstance.getRootComponent(),mIDMap);
      container.setContentDescription(JSON.toJSONString(mIDMap));

      mWXHandler.removeCallbacks(this);
      mWXHandler.postDelayed(this,2000);
    }
  };

  /**
   *
   * @param map <weexid,viewId>
   */
  private static void collectId(WXComponent comp, Map<String,String> map){
    if(comp == null){
      return;
    }
    String id;
    View view;
    if((view = comp.getHostView())!=null &&
        (id = (String) comp.getAttrs().get("testId"))!=null &&
        !map.containsKey(id)){
      Pair<String,Integer> pair = Utility.nextID();
      view.setId(pair.second);
      map.put(id,pair.first);
    }
    if(comp instanceof WXVContainer){
      WXVContainer container = (WXVContainer) comp;
      for(int i = container.getChildCount()-1;i>=0;i--){
        collectId(container.getChild(i),map);
      }
    }
  }

  @Override
  protected void onDestroy() {
    super.onDestroy();
    if (mInstance != null) {
      mInstance.onActivityDestroy();
    }
    mContainer = null;
    // TopScrollHelper.getInstance(getApplicationContext()).onDestory();
    mWXHandler.obtainMessage(Constants.HOT_REFRESH_DISCONNECT).sendToTarget();
    unregisterBroadcastReceiver();

    if(wxPageActivityInstance == this){
      wxPageActivityInstance = null;
    }
    if(mWxAnalyzerDelegate != null){
      mWxAnalyzerDelegate.onDestroy();
    }
  }


  @Override
  public boolean onKeyUp(int keyCode, KeyEvent event) {
    return (mWxAnalyzerDelegate != null && mWxAnalyzerDelegate.onKeyUp(keyCode,event)) || super.onKeyUp(keyCode, event);
  }

  @Override
  protected void onResume() {
    super.onResume();
    if (mInstance != null) {
      mInstance.onActivityResume();
    }
    if(mWxAnalyzerDelegate != null){
      mWxAnalyzerDelegate.onResume();
    }
  }

  public static Activity getCurrentWxPageActivity() {
    return wxPageActivityInstance;
  }

  public static void setCurrentWxPageActivity(Activity activity) {
    wxPageActivityInstance = activity;
  }

  @Override
  public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
    super.onRequestPermissionsResult(requestCode, permissions, grantResults);
    if(mInstance!=null){
      mInstance.onRequestPermissionsResult(requestCode,permissions,grantResults);
    }
  }

  @Override
  protected void onActivityResult(int requestCode, int resultCode, Intent data) {
    super.onActivityResult(requestCode, resultCode, data);
    if(mInstance!=null){
      mInstance.onActivityResult(requestCode,resultCode,data);
    }
  }

  @Override
  public boolean handleMessage(Message msg) {

    switch (msg.what) {
      case Constants.HOT_REFRESH_CONNECT:
        HotRefreshManager.getInstance().connect(msg.obj.toString());
        break;
      case Constants.HOT_REFRESH_DISCONNECT:
        HotRefreshManager.getInstance().disConnect();
        break;
      case Constants.HOT_REFRESH_REFRESH:
        loadWXfromService(mUri.toString());
        break;
      case Constants.HOT_REFRESH_CONNECT_ERROR:
        Toast.makeText(this, "hot refresh connect error!", Toast.LENGTH_SHORT).show();
        break;
      default:
        break;
    }

    return false;
  }

  @Override
  public void onViewCreated(WXSDKInstance instance, View view) {
    WXLogUtils.e("into--[onViewCreated]");
    View wrappedView = null;
    if(mWxAnalyzerDelegate != null){
      wrappedView = mWxAnalyzerDelegate.onWeexViewCreated(instance,view);
    }
    if(wrappedView != null){
      view = wrappedView;
    }

    if(view.getParent() == null) {
      mContainer.addView(view);
    }
    mContainer.requestLayout();
    Log.d("WARenderListener", "renderSuccess");
  }

  @Override
  public void onRenderSuccess(WXSDKInstance instance, int width, int height) {
    if(mWxAnalyzerDelegate  != null){
      mWxAnalyzerDelegate.onWeexRenderSuccess(instance);
    }
    mProgressBar.setVisibility(View.INVISIBLE);
  }

  @Override
  public void onRefreshSuccess(WXSDKInstance instance, int width, int height) {
    mProgressBar.setVisibility(View.GONE);
  }

  @Override
  public void onException(WXSDKInstance instance, String errCode,
                          String msg) {
    if(mWxAnalyzerDelegate != null){
      mWxAnalyzerDelegate.onException(instance,errCode,msg);
    }
    mProgressBar.setVisibility(View.GONE);
    if (!TextUtils.isEmpty(errCode) && errCode.contains("|")) {
      String[] errCodeList = errCode.split("\\|");
      String code = errCodeList[1];
      String codeType = errCode.substring(0, errCode.indexOf("|"));

      if (TextUtils.equals("1", codeType)) {
        String errMsg = "codeType:" + codeType + "\n" + " errCode:" + code + "\n" + " ErrorInfo:" + msg;
        degradeAlert(errMsg);
        return;
      } else {
        Toast.makeText(getApplicationContext(), "errCode:" + errCode + " Render ERROR:" + msg, Toast.LENGTH_SHORT).show();
      }
    }
  }

  private void degradeAlert(String errMsg) {
    new AlertDialog.Builder(this)
        .setTitle("Downgrade success")
        .setMessage(errMsg)
        .setPositiveButton("OK", null)
        .show();

  }

  @Override
  public boolean onCreateOptionsMenu(Menu menu) {
    if (!TextUtils.equals("file", mUri.getScheme())) {
      getMenuInflater().inflate(R.menu.refresh, menu);
    }
    return true;
  }

  @Override
  public boolean onOptionsItemSelected(MenuItem item) {
    int id = item.getItemId();
    if (id == android.R.id.home) {
      finish();
      return true;
    } else if (id == R.id.action_refresh) {
      String scheme = mUri.getScheme();
      if (mUri.isHierarchical() && (TextUtils.equals(scheme, "http") || TextUtils.equals(scheme, "https"))) {
        String weexTpl = mUri.getQueryParameter(Constants.WEEX_TPL_KEY);
        String url = TextUtils.isEmpty(weexTpl) ? mUri.toString() : weexTpl;
        loadWXfromService(url);
        return true;
      }
    }
    return super.onOptionsItemSelected(item);
  }

  @Override
  protected void onPause() {
    super.onPause();
    if (mInstance != null) {
      mInstance.onActivityPause();
    }
    if(mWxAnalyzerDelegate != null){
      mWxAnalyzerDelegate.onPause();
    }
  }

  @Override
  protected void onStop() {
    super.onStop();
    if (mInstance != null) {
      mInstance.onActivityStop();
    }
    if(mWxAnalyzerDelegate != null){
      mWxAnalyzerDelegate.onStop();
    }
  }

  private void registerBroadcastReceiver() {
    mReceiver = new RefreshBroadcastReceiver();
    IntentFilter filter = new IntentFilter();
    filter.addAction(WXSDKInstance.ACTION_DEBUG_INSTANCE_REFRESH);
    filter.addAction(WXSDKInstance.ACTION_INSTANCE_RELOAD);

    registerReceiver(mReceiver, filter);
  }

  private void unregisterBroadcastReceiver() {
    if (mReceiver != null) {
      unregisterReceiver(mReceiver);
    }
    mReceiver = null;
  }

  @Override
  public void onBackPressed() {
    if (!mInstance.onBackPressed()) {
      super.onBackPressed();
    }
  }

  private static class NavigatorAdapter implements IActivityNavBarSetter {

    @Override
    public boolean push(String param) {
      return false;
    }

    @Override
    public boolean pop(String param) {
      return false;
    }

    @Override
    public boolean setNavBarRightItem(String param) {
      return false;
    }

    @Override
    public boolean clearNavBarRightItem(String param) {
      return false;
    }

    @Override
    public boolean setNavBarLeftItem(String param) {
      return false;
    }

    @Override
    public boolean clearNavBarLeftItem(String param) {
      return false;
    }

    @Override
    public boolean setNavBarMoreItem(String param) {
      return false;
    }

    @Override
    public boolean clearNavBarMoreItem(String param) {
      return false;
    }

    @Override
    public boolean setNavBarTitle(String param) {
      return false;
    }
  }

  public class RefreshBroadcastReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
      if (WXSDKInstance.ACTION_INSTANCE_RELOAD.equals(intent.getAction()) ||
              WXSDKInstance.ACTION_DEBUG_INSTANCE_REFRESH.equals(intent.getAction())) {
        // String myUrl = intent.getStringExtra("url");
        // Log.e("WXPageActivity", "RefreshBroadcastReceiver reload onReceive ACTION_DEBUG_INSTANCE_REFRESH mBundleUrl:" + myUrl + " mUri:" + mUri);

        Log.v(TAG, "connect to debug server success");
        if (mUri != null) {
          if (TextUtils.equals(mUri.getScheme(), "http") || TextUtils.equals(mUri.getScheme(), "https")) {
            String weexTpl = mUri.getQueryParameter(Constants.WEEX_TPL_KEY);
            String url = TextUtils.isEmpty(weexTpl) ? mUri.toString() : weexTpl;
            // Log.e("WXPageActivity", "loadWXfromService reload url:" + url);
            loadWXfromService(url);
          } else {
            // Log.e("WXPageActivity", "loadWXfromLocal reload from local url:" + mUri.toString());
            loadWXfromLocal(true);
          }
        }
      }
    }
  }
}
