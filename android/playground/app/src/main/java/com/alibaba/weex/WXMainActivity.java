package com.alibaba.weex;

import com.google.zxing.client.android.CaptureActivity;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Rect;
import android.os.Bundle;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.support.v7.widget.Toolbar;
import android.text.TextUtils;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import com.alibaba.weex.extend.ImageAdapter;
import com.alibaba.weex.util.ScreenUtil;
import com.taobao.weex.IWXRenderListener;
import com.taobao.weex.WXEnvironment;
import com.taobao.weex.WXRenderErrorCode;
import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.common.WXRenderStrategy;
import com.taobao.weex.utils.WXFileUtils;

import java.util.HashMap;
import java.util.Map;

public class WXMainActivity extends WXBaseActivity implements IWXRenderListener {

  private static final int CAMARA_PERMISSION_REQUEST_CODE = 0x1;

  private static final String TAG = "IndexFragment";
  private static String CURRENT_IP="30.10.192.232";
  private static final String WEEX_INDEX_URL = "http://"+CURRENT_IP+":12580/examples/build/index.js";

  private ViewGroup mContainer;
  private ProgressBar mProgressBar;
  private TextView mTipView;
  private WXSDKInstance mInstance;

  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_wx_main);
    Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
    toolbar.setTitle("WEEX");
    setSupportActionBar(toolbar);

    mContainer = (ViewGroup)findViewById(R.id.index_container);
    mProgressBar = (ProgressBar) findViewById(R.id.index_progressBar);
    mTipView = (TextView) findViewById(R.id.index_tip);
    if (!WXEnvironment.isSupport()) {
      Toast.makeText(this,"The current device does not support Weex!",Toast.LENGTH_SHORT).show();
      finish();
      return;
    }

    renderWX();
  }

  private void renderWX() {
    Rect outRect = new Rect();
    getWindow().getDecorView().getWindowVisibleDisplayFrame(outRect);

    if (mInstance != null) {
      mInstance.destroy();
      mInstance = null;
    }

    mInstance = new WXSDKInstance(this);
    mInstance.setImgLoaderAdapter(new ImageAdapter(this));
    mInstance.registerRenderListener(this);

    Map<String, Object> options = new HashMap<>();
    options.put("bundleUrl", WEEX_INDEX_URL);

    //use default assets/index.js
    if(TextUtils.equals(CURRENT_IP,"your_current_IP")){
      mInstance.render(TAG, WXFileUtils.loadFileContent("index.js", this), options, null, ScreenUtil.getDisplayWidth(this), ScreenUtil.getDisplayHeight(this), WXRenderStrategy.APPEND_ASYNC);
    }else{
      mInstance.render(TAG, WEEX_INDEX_URL, null, new HashMap<String, Object>(), null, ScreenUtil.getDisplayWidth(this), ScreenUtil.getDisplayHeight(this), WXRenderStrategy.APPEND_ASYNC);
    }
    mProgressBar.setVisibility(View.VISIBLE);
    mTipView.setVisibility(View.VISIBLE);
  }

  @Override
  public boolean onCreateOptionsMenu(Menu menu) {
    // Inflate the menu; this adds items to the action bar if it is present.
    getMenuInflater().inflate(R.menu.main, menu);
    return true;
  }

  @Override
  public boolean onOptionsItemSelected(MenuItem item) {
    int id = item.getItemId();
    if (id == R.id.action_refresh) {
      if(!TextUtils.equals(CURRENT_IP,"your_current_IP")){
        renderWX();
        return true;
      }
    } else if (id == R.id.action_scan) {
      if (ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED) {
        if (ActivityCompat.shouldShowRequestPermissionRationale(this, Manifest.permission.CAMERA)) {
          Toast.makeText(this, "please give me the permission", Toast.LENGTH_SHORT).show();
        } else {
          ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.CAMERA}, CAMARA_PERMISSION_REQUEST_CODE);
        }
      } else {
        startActivity(new Intent(this, CaptureActivity.class));
      }
      return true;
    }
    return super.onOptionsItemSelected(item);
  }

  @Override
  public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
    super.onRequestPermissionsResult(requestCode, permissions, grantResults);
    if (requestCode == CAMARA_PERMISSION_REQUEST_CODE && grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
      startActivity(new Intent(this, CaptureActivity.class));
    } else {
      Toast.makeText(this, "request camara permission fail!", Toast.LENGTH_SHORT).show();
    }
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
  public void onRenderSuccess(WXSDKInstance wxsdkInstance, int i, int i1) {
    mProgressBar.setVisibility(View.GONE);
    mTipView.setVisibility(View.GONE);
  }

  @Override
  public void onRefreshSuccess(WXSDKInstance wxsdkInstance, int i, int i1) {

  }

  @Override
  public void onException(WXSDKInstance wxsdkInstance, String s, String s1) {
    mProgressBar.setVisibility(View.GONE);
    mTipView.setVisibility(View.VISIBLE);
    if (TextUtils.equals(s, WXRenderErrorCode.WX_NETWORK_ERROR)) {
      mTipView.setText("network error!");
    } else {
      mTipView.setText("render error:" + s1);
    }
  }
}

