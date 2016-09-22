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
 */
public class GeolocationModule extends WXModule implements Destroyable {

  private ILocatable mILocatable;

  public GeolocationModule() {
    mILocatable = LocationFactory.getLocationProvider(mWXSDKInstance);
  }

  /**
   * Get current location information, the callback only once
   *
   * @param successCallback success callback function id.
   * @param errorCallback   error callback function id.(example:no persimmon)
   * @param params          JSON parameter(example:address).
   */
  @WXModuleAnno
  public void getCurrentPosition(String successCallback, String errorCallback, String params) {
    mILocatable.setWXSDKInstance(mWXSDKInstance);
    if (ActivityCompat.checkSelfPermission(mWXSDKInstance.getContext(), Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(mWXSDKInstance.getContext(), Manifest.permission.ACCESS_COARSE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
      mILocatable.getCurrentPosition(successCallback, errorCallback, params);
    } else {
      ActivityCompat.requestPermissions((Activity) mWXSDKInstance.getContext(), new String[]{Manifest.permission.ACCESS_FINE_LOCATION, Manifest.permission.ACCESS_COARSE_LOCATION}, ILocatable.REQUEST_CUR_PERMISSION_CODE);
      LocalBroadcastManager.getInstance(mWXSDKInstance.getContext()).registerReceiver(new PerReceiver(mWXSDKInstance.getInstanceId(), mILocatable, successCallback, errorCallback, params), new IntentFilter("requestPermission"));
    }
  }

  /**
   * register global location listener，if location change，you will be notify.
   *
   * @param successCallback location success callback function id.
   * @param errorCallback   location error callback (example:no persimmon).
   * @param params          JSON parameter(example:address).
   */
  @WXModuleAnno
  public void watchPosition(String successCallback, String errorCallback, String params) {
    mILocatable.setWXSDKInstance(mWXSDKInstance);
    if (ActivityCompat.checkSelfPermission(mWXSDKInstance.getContext(), Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(mWXSDKInstance.getContext(), Manifest.permission.ACCESS_COARSE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
      mILocatable.watchPosition(successCallback, errorCallback, params);
    } else {
      ActivityCompat.requestPermissions((Activity) mWXSDKInstance.getContext(), new String[]{Manifest.permission.ACCESS_FINE_LOCATION, Manifest.permission.ACCESS_COARSE_LOCATION}, ILocatable.REQUEST_WATCH_PERMISSION_CODE);
      LocalBroadcastManager.getInstance(mWXSDKInstance.getContext()).registerReceiver(new PerReceiver(mWXSDKInstance.getInstanceId(), mILocatable, successCallback, errorCallback, params), new IntentFilter("requestPermission"));
    }
  }

  /**
   * remove global location listener.
   *
   * @param registerID register id,you can get from watchPosition method。
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
