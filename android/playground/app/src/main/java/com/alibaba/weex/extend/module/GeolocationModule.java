package com.alibaba.weex.extend.module;

import android.Manifest;
import android.app.Activity;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageManager;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.LocalBroadcastManager;

import com.alibaba.weex.extend.module.location.ILocatable;
import com.alibaba.weex.extend.module.location.LocationFactory;
import com.taobao.weex.WXSDKManager;
import com.taobao.weex.common.Destroyable;
import com.taobao.weex.common.WXModule;
import com.taobao.weex.common.WXModuleAnno;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by lixinke on 16/9/10.
 */
public class GeolocationModule extends WXModule implements Destroyable {

  private ILocatable mILocatable;

  public GeolocationModule() {
    mILocatable = LocationFactory.getLocationProvider(mWXSDKInstance);
  }

  /**
   * 获取当前位置信息，只回调一次。
   *
   * @param successCallback 成功回调function id.
   * @param errorCallback   错误回调function id.(例如:没有权限)
   * @param params          JSON格式的参数(例如:准确度等).
   */
  @WXModuleAnno
  public void getCurrentPosition(String successCallback, String errorCallback, String params) {
    mILocatable.setWXSDKInstance(mWXSDKInstance);
    if (checkPermission()) {
      mILocatable.getCurrentPosition(successCallback, errorCallback, params);
    } else {
      requestPermission(successCallback, errorCallback, params, ILocatable.REQUEST_CUR_PERMISSION_CODE);
    }
  }


  /**
   * 注册监听全局定位
   *
   * @param successCallback 定位成功回调function id.
   * @param errorCallback   错误回调(例如:没有权限等).
   * @param params          SON格式的参数(例如:准确度等).
   */
  @WXModuleAnno
  public void watchPosition(String successCallback, String errorCallback, String params) {
    mILocatable.setWXSDKInstance(mWXSDKInstance);
    if (checkPermission()) {
      mILocatable.watchPosition(successCallback, errorCallback, params);
    } else {
      requestPermission(successCallback, errorCallback, params, ILocatable.REQUEST_WATCH_PERMISSION_CODE);
    }
  }

  /**
   * 注销监听全局定位
   *
   * @param registerID 注册时返回的唯一ID。
   */
  @WXModuleAnno
  public void clearWatch(String registerID) {
    mILocatable.setWXSDKInstance(mWXSDKInstance);
    mILocatable.clearWatch(registerID);
  }


  @Override
  public void destroy() {
    mILocatable.destroy();
  }

  private void requestPermission(String successCallback, String errorCallback, String params, int requestCurPermissionCode) {
    ActivityCompat.requestPermissions((Activity) mWXSDKInstance.getContext(),
                                      new String[]{Manifest.permission.ACCESS_FINE_LOCATION, Manifest.permission.ACCESS_COARSE_LOCATION}, requestCurPermissionCode);
    LocalBroadcastManager.getInstance(mWXSDKInstance.getContext())
        .registerReceiver(new PerReceiver(mWXSDKInstance.getInstanceId(), mILocatable, successCallback, errorCallback, params), new IntentFilter("actionRequestPermissionsResult"));
  }

  private boolean checkPermission() {
    return ActivityCompat.checkSelfPermission(mWXSDKInstance.getContext(), Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED
           && ActivityCompat.checkSelfPermission(mWXSDKInstance.getContext(), Manifest.permission.ACCESS_COARSE_LOCATION) == PackageManager.PERMISSION_GRANTED;
  }

  static class PerReceiver extends BroadcastReceiver {

    String mInstanceId;
    ILocatable mLocatable;
    String mSuccessCallback;
    String mErrorCallback;
    String mParams;

    PerReceiver(String instanceId, ILocatable locatable, String successCallback, String errorCallback, String params) {
      this.mLocatable = locatable;
      this.mSuccessCallback = successCallback;
      this.mErrorCallback = errorCallback;
      this.mParams = params;
      this.mInstanceId = instanceId;
    }

    @Override
    public void onReceive(Context context, Intent intent) {
      int code = intent.getIntExtra(ILocatable.REQUEST_PERMISSION_CODE, 0);
      int[] grantResults = intent.getIntArrayExtra("grantResults");
      if (code == ILocatable.REQUEST_CUR_PERMISSION_CODE) {
        if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
          mLocatable.getCurrentPosition(mSuccessCallback, mErrorCallback, mParams);
        } else {
          noPermission();
        }
      } else if (code == ILocatable.REQUEST_WATCH_PERMISSION_CODE) {
        if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
          mLocatable.watchPosition(mSuccessCallback, mErrorCallback, mParams);
        } else {
          noPermission();
        }
      }
      LocalBroadcastManager.getInstance(context).unregisterReceiver(this);
    }

    private void noPermission() {
      Map<String, Object> options = new HashMap<>();
      options.put(ILocatable.ERROR_CODE, ILocatable.ErrorCode.NO_PERMISSION_ERROR);
      options.put(ILocatable.ERROR_MSG, ILocatable.ErrorMsg.NO_PERMISSION_ERROR);
      WXSDKManager.getInstance().callback(mInstanceId, mErrorCallback, options);
    }
  }
}
