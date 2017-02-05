package com.alibaba.weex;

import android.net.Uri;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.text.TextUtils;
import android.widget.TextView;
import android.widget.Toast;

import com.taobao.weex.WXEnvironment;
import com.taobao.weex.WXSDKEngine;
import com.taobao.weex.WXSDKManager;
import com.taobao.weex.adapter.IWXHttpAdapter;
import com.taobao.weex.common.WXRequest;
import com.taobao.weex.common.WXResponse;

import java.util.List;
import java.util.Map;

public class WXDebugActivity extends AppCompatActivity implements IWXHttpAdapter.OnHttpListener {

  private TextView mTipView;
  private TextView mResultView;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    if (!WXEnvironment.isApkDebugable()) {
      finish();
      return;
    }

    setContentView(R.layout.activity_dynamic);

    mTipView = (TextView) findViewById(R.id.dynamic_tip);
    mResultView = (TextView) findViewById(R.id.dynamic_result);

    Uri uri = getIntent().getData();
    if (uri != null && uri.isHierarchical()) {
      String frameworkUrl = uri.getQueryParameter("framework");
      String bundleUrl=uri.getQueryParameter("bundle");
      if (!TextUtils.isEmpty(frameworkUrl)) {
        mTipView.setText("Dynamically replaces the framework!");
        IWXHttpAdapter adapter = WXSDKManager.getInstance().getIWXHttpAdapter();
        final WXRequest wxRequest = new WXRequest();
        wxRequest.url = frameworkUrl;
        adapter.sendRequest(wxRequest, this);
      }else if(!TextUtils.isEmpty(bundleUrl)){
        mTipView.setText("Dynamically replaces the bundle!");
        WXEnvironment.sDynamicMode = uri.getBooleanQueryParameter("debug", false);
        WXEnvironment.sDynamicUrl = uri.getQueryParameter("bundle");
        String tip=WXEnvironment.sDynamicMode?"Has switched to Dynamic Mode":"Has switched to Normal Mode";
        Toast.makeText(this, tip, Toast.LENGTH_SHORT).show();
        finish();
      }
    }
  }

  @Override
  public void onHttpStart() {

  }

  @Override
  public void onHeadersReceived(int statusCode, Map<String, List<String>> headers) {

  }

  @Override
  public void onHttpUploadProgress(int uploadProgress) {

  }

  @Override
  public void onHttpResponseProgress(int loadedLength) {

  }

  @Override
  public void onHttpFinish(WXResponse response) {
    if ("200".equals(response.statusCode)) {
      String framework = new String(response.originalData);
      if (framework != null) {
        WXSDKEngine.reload(WXDebugActivity.this, framework, false);
        finish();
        return;
      }
    }
    mResultView.setText("动态替换失败，请重启手淘后重试!");
  }
}
