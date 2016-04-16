package com.alibaba.weex;

import android.app.Activity;
import android.app.AlertDialog;
import android.graphics.Rect;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.support.v7.app.ActionBar;
import android.support.v7.widget.Toolbar;
import android.text.TextUtils;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ProgressBar;
import android.widget.Toast;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.weex.constants.Constants;
import com.alibaba.weex.https.HotRefreshManager;
import com.alibaba.weex.https.WXHttpManager;
import com.alibaba.weex.https.WXHttpTask;
import com.alibaba.weex.https.WXRequestListener;
import com.alibaba.weex.util.ScreenUtil;
import com.taobao.weex.IWXRenderListener;
import com.taobao.weex.WXEnvironment;
import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.common.WXRenderStrategy;
import com.taobao.weex.utils.WXFileUtils;

import java.io.File;
import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;


public class WXPageActivity extends WXBaseActivity implements IWXRenderListener, android.os.Handler.Callback {

  private static final String TAG = "WXPageActivity";
  public static Activity wxPageActivityInstance;

  private ViewGroup mContainer;
  private ProgressBar mProgressBar;
  private View mWAView;

  private WXSDKInstance mInstance;
  private Handler mWXHandler;

  private Uri mUri;
  private HashMap mConfigMap = new HashMap<String, Object>();

  private Button mRefresh;
  private JSONArray mData;
  private int count = 0;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_wxpage);

    //        wxPageActivityInstance = this;
    setCurrentWxPageActivity(this);

    mUri = getIntent().getData();
    Bundle bundle = getIntent().getExtras();
    if (mUri == null && bundle == null) {
      mUri = Uri.parse(Constants.BUNDLE_URL + Constants.WEEX_SAMPLES_KEY);
    }
    if (bundle != null) {
      String bundleUrl = bundle.getString("bundleUrl");
      Log.e(TAG, "bundleUrl==" + bundleUrl);

      if (bundleUrl != null) {
        mConfigMap.put("bundleUrl", bundleUrl + Constants.WEEX_SAMPLES_KEY);
        mUri = Uri.parse(bundleUrl + Constants.WEEX_SAMPLES_KEY);

      }
    } else {
      mConfigMap.put("bundleUrl", mUri.toString() + Constants.WEEX_SAMPLES_KEY);
      //            mUri = Uri.parse(mUri.toString() + Constants.WEEX_SAMPLES_KEY)
    }

    if (!WXEnvironment.isSupport()) {
      return;
    }

    if (mUri == null) {
      Toast.makeText(this, "the uri is empty!", Toast.LENGTH_SHORT).show();
      finish();
      return;
    }

    Log.e("TestScript_Guide mUri==", mUri.toString());
//    mData = (JSONArray) JSONArray.parse(WXFileUtils.loadFileContent("mockShopMtop.json", this));

    //        mRefresh = (Button) findViewById(R.id.weex_refresh);

    //        mRefresh.setOnClickListener(new View.OnClickListener() {
    //            @Override
    //            public void onClick(View v) {
    //                if (count < mData.size()) {
    //                    mInstance.refreshInstance(((JSONObject) mData.get(count)).toJSONString());
    //                    count++;
    //                }
    //            }
    //        });

    initUIAndData();

    if (TextUtils.equals("http", mUri.getScheme()) || TextUtils.equals("https", mUri.getScheme())) {
      loadWXfromService(mUri.toString());
      startHotRefresh();
    } else {
      if (mInstance == null) {
        mInstance = new WXSDKInstance(this);
//        mInstance.setImgLoaderAdapter(new ImageAdapter(this));
        mInstance.registerRenderListener(this);
      }
      Activity ctx = this;
      Rect outRect = new Rect();
      ctx.getWindow().getDecorView().getWindowVisibleDisplayFrame(outRect);
      String path=mUri.getScheme().equals("file")?mUri.getLastPathSegment():mUri.toString();
      mInstance.render(TAG, WXFileUtils.loadFileContent(path, this), mConfigMap, null, ScreenUtil.getDisplayWidth(this), ScreenUtil.getDisplayHeight(this), WXRenderStrategy.APPEND_ASYNC);
    }
    mInstance.onActivityCreate();
  }

  private void initUIAndData() {

    Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
    setSupportActionBar(toolbar);

    ActionBar actionBar = getSupportActionBar();
    actionBar.setDisplayHomeAsUpEnabled(true);
    actionBar.setTitle(mUri.toString().substring(mUri.toString().lastIndexOf(File.separator) + 1));

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
    }

    mInstance = new WXSDKInstance(this);
//    mInstance.setImgLoaderAdapter(new ImageAdapter(this));

    mInstance.registerRenderListener(this);

    WXHttpTask httpTask = new WXHttpTask();
    httpTask.url = url;
    httpTask.requestListener = new WXRequestListener() {

      @Override
      public void onSuccess(WXHttpTask task) {
        Log.e(TAG, "into--[http:onSuccess] url:" + url);
        try {
          mConfigMap.put("bundleUrl", url + Constants.WEEX_SAMPLES_KEY);
          mInstance.render(TAG, new String(task.response.data, "utf-8"), mConfigMap, null, mContainer.getWidth(), mContainer.getHeight(), WXRenderStrategy.APPEND_ASYNC);

          //                    mInstance.render(new String(task.response.data, "utf-8"), mContainer.getWidth(), mContainer.getHeight());
        } catch (UnsupportedEncodingException e) {
          e.printStackTrace();
        }
      }

      @Override
      public void onError(WXHttpTask task) {
        Log.e(TAG, "into--[http:onError]");
      }
    };

    WXHttpManager.getInstance().sendRequest(httpTask);
  }

  /**
   * hot refresh
   */
  private void startHotRefresh() {
    try {
      String host = new URL(mUri.toString()).getHost();
      String wsUrl = "ws://" + host + ":8082";
      mWXHandler.obtainMessage(Constants.HOT_REFRESH_CONNECT, 0, 0, wsUrl).sendToTarget();
    } catch (MalformedURLException e) {
      e.printStackTrace();
    }
  }

  private void addOnListener() {

  }

  @Override
  protected void onDestroy() {
    super.onDestroy();
    if (mInstance != null) {
      mInstance.onActivityDestroy();
    }
    //        TopScrollHelper.getInstance(getApplicationContext()).onDestory();
    mWXHandler.obtainMessage(Constants.HOT_REFRESH_DISCONNECT).sendToTarget();

  }

  @Override
  protected void onResume() {
    super.onResume();
    if (mInstance != null) {
      mInstance.onActivityResume();
    }
  }

  public Activity getCurrentWxPageActivity() {
    return wxPageActivityInstance;
  }

  public void setCurrentWxPageActivity(Activity activity) {
    wxPageActivityInstance = activity;
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
    }

    return false;
  }

  @Override
  public void onViewCreated(WXSDKInstance instance, View view) {

    if (mWAView != null && mContainer != null && mWAView.getParent() == mContainer) {
      mContainer.removeView(mWAView);
    }

    mWAView = view;
    //        TopScrollHelper.getInstance(getApplicationContext()).addTargetScrollView(mWAView);
    mContainer.addView(view);
    mContainer.requestLayout();
    Log.d("WARenderListener", "renderSuccess");
  }

  @Override
  public void onRenderSuccess(WXSDKInstance instance, int width, int height) {
    mProgressBar.setVisibility(View.INVISIBLE);
  }

  @Override
  public void onRefreshSuccess(WXSDKInstance instance, int width, int height) {
    mProgressBar.setVisibility(View.GONE);
  }

  @Override
  public void onException(WXSDKInstance instance, String errCode,
                          String msg) {
    mProgressBar.setVisibility(View.GONE);
    if (!TextUtils.isEmpty(errCode) && errCode.contains("|")) {
      String[] errCodeList = errCode.split("\\|");
      String code = errCodeList[1];
      String codeType = errCode.substring(0, errCode.indexOf("|"));

      if (TextUtils.equals("1", codeType)) {
        String errMsg = "codeType:" + codeType + "\n" + " errCode:" + code + "\n" + " ErrorInfo:" + msg;
        degradeAlert(errMsg);
        //                finish();
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
    if(!TextUtils.equals("file",mUri.getScheme())){
      getMenuInflater().inflate(R.menu.refresh, menu);
      return true;
    }
    return false;
  }

  @Override
  public boolean onOptionsItemSelected(MenuItem item) {
    int id = item.getItemId();
    if (id == android.R.id.home) {
      finish();
      return true;
    }else if(id==R.id.action_refresh){
      if(TextUtils.equals(mUri.getScheme(),"http") || TextUtils.equals(mUri.getScheme(),"https")){
        loadWXfromService(mUri.toString());
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
  }

}
