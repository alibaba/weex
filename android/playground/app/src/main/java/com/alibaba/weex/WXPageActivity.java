package com.alibaba.weex;

import android.app.Activity;
import android.app.AlertDialog;
import android.graphics.Rect;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ProgressBar;
import android.widget.Toast;

import com.alibaba.weex.commons.util.ScreenUtil;
import com.alibaba.weex.constants.Constants;
import com.alibaba.weex.https.HotRefreshManager;
import com.alibaba.weex.https.WXHttpManager;
import com.alibaba.weex.https.WXHttpTask;
import com.alibaba.weex.https.WXRequestListener;
import com.alibaba.weex.navigator.WXBaseNavActivity;
import com.taobao.weex.IWXRenderListener;
import com.taobao.weex.WXEnvironment;
import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.common.WXRenderStrategy;
import com.taobao.weex.utils.WXFileUtils;
import com.taobao.weex.utils.WXLogUtils;

import java.io.File;
import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;

public class WXPageActivity extends WXBaseNavActivity implements IWXRenderListener, android.os.Handler.Callback {

    private static final String TAG = "WXPageActivity";
    public static Activity wxPageActivityInstance;

    private ViewGroup mContainer;
    private ProgressBar mProgressBar;
    private View mWAView;

    private Handler mWXHandler;

    private Uri mUri;
    private HashMap mConfigMap = new HashMap<String, Object>();

    /**
     * You should setContentView here and should not call setContentView in onCreate()
     */
    @Override
    public void getWXContentView() {
        setContentView(R.layout.activity_wxpage);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getUri();
        rendWXPage();
        setCurrentWxPageActivity(this);
        mInstance.onActivityCreate();
    }

    private void getUri() {
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
            // mUri = Uri.parse(mUri.toString() + Constants.WEEX_SAMPLES_KEY)
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

        setToolBarTitle(mUri.toString().substring(mUri.toString().lastIndexOf(File.separator) + 1));
    }

    private void rendWXPage() {
        if (TextUtils.equals("http", mUri.getScheme()) || TextUtils.equals("https", mUri.getScheme())) {
//      if url has key "_wx_tpl" then get weex bundle js
            String weexTpl = mUri.getQueryParameter(Constants.WEEX_TPL_KEY);
            String url = TextUtils.isEmpty(weexTpl) ? mUri.toString() : weexTpl;
            loadWXfromService(url);
            startHotRefresh();
        } else {
            if (mInstance == null) {
                mInstance = new WXSDKInstance(this);

//        mInstance.setImgLoaderAdapter(new ImageAdapter(this));
                mInstance.registerRenderListener(this);
            }
            mContainer.post(new Runnable() {
                @Override
                public void run() {
                    Activity ctx = WXPageActivity.this;
                    Rect outRect = new Rect();
                    ctx.getWindow().getDecorView().getWindowVisibleDisplayFrame(outRect);
                    mConfigMap.put("bundleUrl", mUri.toString());
                    String path = mUri.getScheme().equals("file") ? assembleFilePath(mUri) : mUri.toString();
                    mInstance.render(TAG, WXFileUtils.loadFileContent(path, WXPageActivity.this),
                            mConfigMap, null,
                            ScreenUtil.getDisplayWidth(WXPageActivity.this), ScreenUtil
                                    .getDisplayHeight(WXPageActivity.this),
                            WXRenderStrategy.APPEND_ASYNC);
                }
            });
        }
    }

    private String assembleFilePath(Uri uri) {
        if (uri != null && uri.getPath() != null) {
            return uri.getPath().replaceFirst("/", "");
        }
        return "";
    }

    @Override
    public void initUIAndData() {
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
        mInstance.registerRenderListener(this);

        WXHttpTask httpTask = new WXHttpTask();
        httpTask.url = url;
        httpTask.requestListener = new WXRequestListener() {

            @Override
            public void onSuccess(WXHttpTask task) {
                Log.e(TAG, "into--[http:onSuccess] url:" + url);
                try {
                    mConfigMap.put("bundleUrl", url + Constants.WEEX_SAMPLES_KEY);
                    mInstance.render(TAG, new String(task.response.data, "utf-8"), mConfigMap, null, ScreenUtil.getDisplayWidth(WXPageActivity.this), ScreenUtil.getDisplayHeight(WXPageActivity.this), WXRenderStrategy.APPEND_ASYNC);

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
    }

    @Override
    protected void onResume() {
        super.onResume();
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
        WXLogUtils.e("into--[onViewCreated]");
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
}
