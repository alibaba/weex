package com.alibaba.weex;

import android.Manifest;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.support.v4.content.LocalBroadcastManager;
import android.support.v7.widget.Toolbar;
import android.text.TextUtils;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import com.alibaba.weex.commons.AbstractWeexActivity;
import com.google.zxing.client.android.CaptureActivity;
import com.taobao.weex.WXRenderErrorCode;
import com.taobao.weex.WXSDKEngine;
import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.utils.WXFileUtils;
import com.taobao.weex.utils.WXSoInstallMgrSdk;

import java.util.ArrayList;
import java.util.List;

public class IndexActivity extends AbstractWeexActivity {

  private static final int PERMISSION_REQUEST_CODE = 0x1;
  private static final String TAG = "IndexActivity";
  private static final String DEFAULT_IP = "your_current_IP";
  private static String CURRENT_IP= DEFAULT_IP; // your_current_IP
  private static final String WEEX_INDEX_URL = "http://"+CURRENT_IP+":12580/examples/build/index.js";

  private ProgressBar mProgressBar;
  private TextView mTipView;

  private BroadcastReceiver mReloadReceiver;


  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_index);
    setContainer((ViewGroup) findViewById(R.id.index_container));
    Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
    toolbar.setTitle("WEEX");
    setSupportActionBar(toolbar);

    mProgressBar = (ProgressBar) findViewById(R.id.index_progressBar);
    mTipView = (TextView) findViewById(R.id.index_tip);
    mProgressBar.setVisibility(View.VISIBLE);
    mTipView.setVisibility(View.VISIBLE);


    if(!WXSoInstallMgrSdk.isCPUSupport()){
      mProgressBar.setVisibility(View.INVISIBLE);
      mTipView.setText(R.string.cpu_not_support_tip);
      return;
    }

    if(TextUtils.equals(CURRENT_IP,DEFAULT_IP)){
      renderPage(WXFileUtils.loadAsset("index.js", this),WEEX_INDEX_URL);
    }else{
      renderPageByURL(WEEX_INDEX_URL);
    }


    mReloadReceiver=new BroadcastReceiver() {
      @Override
      public void onReceive(Context context, Intent intent) {
        createWeexInstance();
        if(TextUtils.equals(CURRENT_IP,DEFAULT_IP)){
          renderPage(WXFileUtils.loadAsset("index.js", IndexActivity.this),WEEX_INDEX_URL);
        }else{
          renderPageByURL(WEEX_INDEX_URL);
        }
        mProgressBar.setVisibility(View.VISIBLE);
      }
    };

    LocalBroadcastManager.getInstance(this).registerReceiver(mReloadReceiver,new IntentFilter(WXSDKEngine.JS_FRAMEWORK_RELOAD));
  }

  @Override
  public boolean onCreateOptionsMenu(Menu menu) {
    if(TextUtils.equals(CURRENT_IP,DEFAULT_IP)){
      getMenuInflater().inflate(R.menu.main_scan,menu);
    }else{
      getMenuInflater().inflate(R.menu.main, menu);
    }
    return true;
  }

  @Override
  public boolean onOptionsItemSelected(MenuItem item) {
    int id = item.getItemId();
    if (id == R.id.action_refresh) {
      if(!TextUtils.equals(CURRENT_IP,DEFAULT_IP)){
        createWeexInstance();
        if(TextUtils.equals(CURRENT_IP,DEFAULT_IP)){
          renderPage(WXFileUtils.loadAsset("index.js", this),WEEX_INDEX_URL);
        }else{
          renderPageByURL(WEEX_INDEX_URL);
        }
        mProgressBar.setVisibility(View.VISIBLE);
        return true;
      }
    } else if (id == R.id.action_scan) {
      if (checkNecessaryPermission()) {
        startActivity(new Intent(this, CaptureActivity.class));
      }
      return true;
    }
    return super.onOptionsItemSelected(item);
  }

  private boolean checkNecessaryPermission() {
    if (Build.VERSION.SDK_INT < 23) {
      return true;
    }
    boolean hasCameraPermission = ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA) == PackageManager.PERMISSION_GRANTED;
    boolean hasPhoneStatePermission = ContextCompat.checkSelfPermission(this, Manifest.permission.READ_PHONE_STATE) == PackageManager.PERMISSION_GRANTED;
    boolean hasCompletePermission = hasCameraPermission && hasPhoneStatePermission;
    List<String> permissions = new ArrayList<>(2);
    if (!hasCameraPermission) {
      if (ActivityCompat.shouldShowRequestPermissionRationale(this, Manifest.permission.CAMERA)) {
        Toast.makeText(this, "please give me the permission", Toast.LENGTH_SHORT).show();
      }
      permissions.add(Manifest.permission.CAMERA);
    }
    if (!hasPhoneStatePermission) {
      if (ActivityCompat.shouldShowRequestPermissionRationale(this, Manifest.permission.READ_PHONE_STATE)) {
        Toast.makeText(this, "we need this permission for debugger", Toast.LENGTH_SHORT).show();
      }
      permissions.add(Manifest.permission.READ_PHONE_STATE);
    }
    if (!hasCompletePermission) {
      ActivityCompat.requestPermissions(this, permissions.toArray(new String[permissions.size()]), PERMISSION_REQUEST_CODE);
    }
    return hasCompletePermission;
  }

  @Override
  public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
    super.onRequestPermissionsResult(requestCode, permissions, grantResults);
    if (requestCode == PERMISSION_REQUEST_CODE) {
      boolean passed = true;
      for (int i = 0; i < permissions.length; i++) {
        if (grantResults[i] != PackageManager.PERMISSION_GRANTED) {
          passed = false;
          Toast.makeText(this, "Request permission " + permissions[i] + " failed!", Toast.LENGTH_SHORT).show();
        }
      }
      if (passed) {
        startActivity(new Intent(this, CaptureActivity.class));
      }
    }
  }

  @Override
  public void onRenderSuccess(WXSDKInstance wxsdkInstance, int i, int i1) {
    mProgressBar.setVisibility(View.GONE);
    mTipView.setVisibility(View.GONE);
  }

  @Override
  public void onException(WXSDKInstance wxsdkInstance, String s, String s1) {
    mProgressBar.setVisibility(View.GONE);
    mTipView.setVisibility(View.VISIBLE);
    if (TextUtils.equals(s, WXRenderErrorCode.WX_NETWORK_ERROR)) {
      mTipView.setText(R.string.index_tip);
    } else {
      mTipView.setText("render error:" + s1);
    }
  }

  @Override
  public void onDestroy() {
    super.onDestroy();
    LocalBroadcastManager.getInstance(this).unregisterReceiver(mReloadReceiver);
  }
}

