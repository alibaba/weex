package com.alibaba.weex.fragment;

import com.google.zxing.client.android.CaptureActivity;

import android.Manifest;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Rect;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.text.TextUtils;
import android.view.LayoutInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import com.alibaba.weex.R;
import com.alibaba.weex.extend.ImageAdapter;
import com.taobao.weex.IWXRenderListener;
import com.taobao.weex.WXEnvironment;
import com.taobao.weex.WXRenderErrorCode;
import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.common.WXRenderStrategy;

import java.util.HashMap;
import java.util.Map;


public class IndexFragment extends BaseFragment implements IWXRenderListener {

  private static final int CAMARA_PERMISSION_REQUEST_CODE = 0x1;

  private static final String TAG = "IndexFragment";
  private static String CURRENT_IP="your_current_IP";
  private static final String WEEX_INDEX_URL = "http://"+CURRENT_IP+":12580/examples/build/index.js";
  private View mView;
  private ViewGroup mContainer;
  private ProgressBar mProgressBar;
  private TextView mTipView;
  private WXSDKInstance mInstance;

  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    mView = View.inflate(getActivity(), R.layout.fragment_index, null);
    mContainer = (ViewGroup) mView.findViewById(R.id.index_container);
    mProgressBar = (ProgressBar) mView.findViewById(R.id.index_progressBar);
    mTipView = (TextView) mView.findViewById(R.id.index_tip);
    if (!WXEnvironment.isSupport()) {
      return;
    }

    renderWX();
  }

  private void renderWX() {
    Activity ctx = getActivity();
    Rect outRect = new Rect();
    ctx.getWindow().getDecorView().getWindowVisibleDisplayFrame(outRect);

    if (mInstance != null) {
      mInstance.destroy();
      mInstance = null;
    }

    mInstance = new WXSDKInstance(getActivity());
    mInstance.setImgLoaderAdapter(new ImageAdapter(getActivity()));
    mInstance.registerRenderListener(this);

    Map<String, Object> options = new HashMap<>();
    options.put("bundleUrl", WEEX_INDEX_URL);

    mInstance.render(TAG, WEEX_INDEX_URL, new HashMap<String, Object>(), null, outRect.width(), outRect.height(), WXRenderStrategy.APPEND_ASYNC);
    //mInstance.render(TAG, WXFileUtils.loadFileContent("index.js",getActivity()),options,null,outRect.width(),outRect.height(), WXRenderStrategy.APPEND_ASYNC);
    mProgressBar.setVisibility(View.VISIBLE);
    mTipView.setVisibility(View.VISIBLE);
  }

  @Override
  public boolean onOptionsItemSelected(MenuItem item) {
    int id = item.getItemId();
    if (id == R.id.action_refresh) {
      renderWX();
      return true;
    } else if (id == R.id.action_scan) {
      if (ContextCompat.checkSelfPermission(getActivity(), Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED) {
        if (ActivityCompat.shouldShowRequestPermissionRationale(getActivity(), Manifest.permission.CAMERA)) {
          Toast.makeText(getActivity(), "please give me the permission", Toast.LENGTH_SHORT).show();
        } else {
//          FragmentCompat.requestPermissions(this,new String[]{Manifest.permission.CAMERA}, CAMARA_PERMISSION_REQUEST_CODE);
        }
      } else {
        startActivity(new Intent(getActivity(), CaptureActivity.class));
      }
      return true;
    }
    return super.onOptionsItemSelected(item);
  }

  @Override
  public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
    super.onRequestPermissionsResult(requestCode, permissions, grantResults);
    if (requestCode == CAMARA_PERMISSION_REQUEST_CODE && grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
      startActivity(new Intent(getActivity(), CaptureActivity.class));
    } else {
      Toast.makeText(getActivity(), "request camara permission fail!", Toast.LENGTH_SHORT).show();
    }
  }

  @Nullable
  @Override
  public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
    if (mView.getParent() != null) {
      ((ViewGroup) mView.getParent()).removeView(mView);
    }
    return mView;
  }

  @Override
  public void onStart() {
    super.onStart();
    mInstance.onActivityStart();
  }

  @Override
  public void onResume() {
    super.onResume();
    mInstance.onActivityResume();
  }

  @Override
  public void onPause() {
    super.onPause();
    mInstance.onActivityPause();
  }

  @Override
  public void onStop() {
    super.onStop();
    mInstance.onActivityStop();
  }

  @Override
  public void onDestroy() {
    super.onDestroy();
    mInstance.onActivityDestroy();
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
