package com.alibaba.weex.commons;

import android.graphics.Rect;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.view.ViewGroup;
import com.alibaba.weex.commons.util.ScreenUtil;
import com.alibaba.weex.commons.util.AssertUtil;
import com.taobao.weex.IWXRenderListener;
import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.common.WXRenderStrategy;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by sospartan on 5/30/16.
 */
public abstract class AbstractWeexActivity extends AppCompatActivity implements IWXRenderListener {
  private static final String TAG = "AbstractWeexActivity";

  private ViewGroup mContainer;
  private WXSDKInstance mInstance;

  @Override
  protected void onCreate(@Nullable Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    createWeexInstance();
    mInstance.onActivityCreate();
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
    mInstance.render(
      getPageName(),
      template,
      options,
      jsonInitData,
      ScreenUtil.getDisplayWidth(this),
      ScreenUtil.getDisplayHeight(this),
      WXRenderStrategy.APPEND_ASYNC);
  }

  protected void renderPageByURL(String url){
    renderPageByURL(url,null);
  }

  protected void renderPageByURL(String url,String jsonInitData){
    AssertUtil.throwIfNull(mContainer,new RuntimeException("Can't render page, container is null"));
    Map<String, Object> options = new HashMap<>();
    options.put(WXSDKInstance.BUNDLE_URL, url);
    mInstance.renderByUrl(
      getPageName(),
      url,
      options,
      jsonInitData,
      ScreenUtil.getDisplayWidth(this),
      ScreenUtil.getDisplayHeight(this),
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
  }

  @Override
  public void onResume() {
    super.onResume();
    if(mInstance!=null){
      mInstance.onActivityResume();
    }
  }

  @Override
  public void onPause() {
    super.onPause();
    if(mInstance!=null){
      mInstance.onActivityPause();
    }
  }

  @Override
  public void onStop() {
    super.onStop();
    if(mInstance!=null){
      mInstance.onActivityStop();
    }
  }

  @Override
  public void onDestroy() {
    super.onDestroy();
    if(mInstance!=null){
      mInstance.onActivityDestroy();
    }
  }

  @Override
  public void onViewCreated(WXSDKInstance wxsdkInstance, View view) {
    if (mContainer != null) {
      mContainer.addView(view);
    }
  }



  @Override
  public void onRefreshSuccess(WXSDKInstance wxsdkInstance, int i, int i1) {

  }
}
