package com.alibaba.weex.extend.module.location;

import android.Manifest;
import android.content.Context;
import android.content.pm.PackageManager;
import android.location.Address;
import android.location.Criteria;
import android.location.Geocoder;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.support.v4.app.ActivityCompat;
import android.text.TextUtils;

import com.taobao.weex.WXEnvironment;
import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.WXSDKManager;
import com.taobao.weex.utils.WXLogUtils;

import org.json.JSONException;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * Created by lixinke on 16/9/10.
 */
public class DefaultLocation implements ILocatable {

  private static final String TAG = "DefaultLocation";
  private static final int TIME_OUT_WHAT = 0x11;

  private Map<String, WXLocationListener> mRegisterSucCallbacks = new HashMap<>();
  private List<WXLocationListener> mWXLocationListeners = new ArrayList<>();
  private WXSDKInstance mWXSDKInstance;
  private LocationManager mLocationManager;

  private static final int GPS_TIMEOUT = 15000;
  private int MIN_TIME = 20000;
  private int MIN_DISTANCE = 5;

  public DefaultLocation(WXSDKInstance instance) {
    mWXSDKInstance = instance;
  }

  @Override
  public void setWXSDKInstance(WXSDKInstance WXSDKInstance) {
    mWXSDKInstance = WXSDKInstance;
  }

  @Override
  public void getCurrentPosition(final String successCallback, final String errorCallback, final String params) {
    if(WXEnvironment.isApkDebugable()) {
      WXLogUtils.d(TAG, "into--[getCurrentPosition] successCallback:" + successCallback + " \nerrorCallback:" + errorCallback + " \nparams:" + params);
    }
    if (!TextUtils.isEmpty(params)) {
      try {
        org.json.JSONObject jsObj = new org.json.JSONObject(params);
        boolean enableHighAccuracy = jsObj.optBoolean("enableHighAccuracy");
        boolean enableAddress = jsObj.optBoolean("address");
        WXLocationListener listener = findLocation(null, successCallback, errorCallback, enableHighAccuracy, enableAddress);
        if (listener != null) {
          mWXLocationListeners.add(listener);
        }
        return;
      } catch (JSONException e) {
        WXLogUtils.e(TAG, e);
      }
    }
    Map<String, Object> options = new HashMap<>();
    options.put(ERROR_CODE, ErrorCode.PARAMS_ERROR);
    options.put(ERROR_MSG, ErrorMsg.PARAMS_ERROR);
    WXSDKManager.getInstance().callback(mWXSDKInstance.getInstanceId(), errorCallback, options);
  }

  private WXLocationListener findLocation(String watchId, String sucCallback, String errorCallback, boolean enableHighAccuracy, boolean enableAddress) {
//    WXLogUtils.d(TAG, "into--[findLocation] mWatchId:" + watchId + "\nsuccessCallback:" + sucCallback + "\nerrorCallback:" + errorCallback + "\nenableHighAccuracy:" + enableHighAccuracy + "\nmEnableAddress:" + enableAddress);

    if (mLocationManager == null) {
      mLocationManager = (LocationManager) mWXSDKInstance.getContext().getSystemService(Context.LOCATION_SERVICE);
    }
    Criteria criteria = new Criteria();
    if (enableHighAccuracy) {
      criteria.setAccuracy(Criteria.ACCURACY_COARSE);
    }
    //String provider = locationManager.getBestProvider(criteria, false);
    if (ActivityCompat.checkSelfPermission(mWXSDKInstance.getContext(), Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(mWXSDKInstance.getContext(), Manifest.permission.ACCESS_COARSE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
      WXLocationListener WXLocationListener = new WXLocationListener(mLocationManager, mWXSDKInstance, watchId, sucCallback, errorCallback, enableAddress);
      mLocationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, MIN_TIME, MIN_DISTANCE, WXLocationListener);
      mLocationManager.requestLocationUpdates(LocationManager.NETWORK_PROVIDER, MIN_TIME, MIN_DISTANCE, WXLocationListener);
      return WXLocationListener;
    } else {
      Map<String, Object> options = new HashMap<>();
      options.put(ERROR_CODE, ErrorCode.NO_PERMISSION_ERROR);
      options.put(ERROR_MSG, ErrorMsg.NO_PERMISSION_ERROR);
      WXSDKManager.getInstance().callback(mWXSDKInstance.getInstanceId(), errorCallback, options);
    }
    return null;
  }

  @Override
  public void watchPosition(final String successCallback, final String errorCallback, final String params) {
    WXLogUtils.d("into--[watchPosition] successCallback:" + successCallback + " errorCallback:" + errorCallback + "\nparams:" + params);
    if (!TextUtils.isEmpty(params)) {
      try {
        org.json.JSONObject jsObj = new org.json.JSONObject(params);
        boolean enableHighAccuracy = jsObj.optBoolean("enableHighAccuracy");
        boolean enableAddress = jsObj.optBoolean("address");

        String id = UUID.randomUUID().toString();
        WXLocationListener listener = findLocation(id, successCallback, errorCallback, enableHighAccuracy, enableAddress);
        if (listener != null) {
          mRegisterSucCallbacks.put(id, listener);
        }
        return;
      } catch (JSONException e) {
        WXLogUtils.e(TAG, e);
      }
    }
    Map<String, Object> options = new HashMap<>();
    options.put(ERROR_CODE, ErrorCode.PARAMS_ERROR);
    options.put(ERROR_MSG, ErrorMsg.PARAMS_ERROR);
    WXSDKManager.getInstance().callback(mWXSDKInstance.getInstanceId(), errorCallback, options);
  }

  @Override
  public void clearWatch(String watchId) {
    WXLogUtils.d("into--[clearWatch] mWatchId:" + watchId);
    if (mWXSDKInstance == null || mWXSDKInstance.isDestroy() || mLocationManager == null) {
      return;
    }
    if (ActivityCompat.checkSelfPermission(mWXSDKInstance.getContext(), Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(mWXSDKInstance.getContext(), Manifest.permission.ACCESS_COARSE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
      WXLocationListener listener = mRegisterSucCallbacks.get(watchId);
      if (listener != null) {
        listener.destroy();
        mLocationManager.removeUpdates(listener);
      }
      mRegisterSucCallbacks.remove(watchId);
    }
  }

  @Override
  public void destroy() {
    WXLogUtils.d("into--[destroy]");
    if (mWXSDKInstance == null || mWXSDKInstance.isDestroy() || mLocationManager == null) {
      return;
    }

    if (mWXLocationListeners != null && mWXLocationListeners.size() > 0) {
      if (ActivityCompat.checkSelfPermission(mWXSDKInstance.getContext(), Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(mWXSDKInstance.getContext(), Manifest.permission.ACCESS_COARSE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
        for (WXLocationListener listener : mWXLocationListeners) {
          if (listener != null) {
            listener.destroy();
            mLocationManager.removeUpdates(listener);
          }
        }
        mWXLocationListeners.clear();
      }
    }

    if (mRegisterSucCallbacks != null && mRegisterSucCallbacks.size() > 0) {
      Collection<WXLocationListener> values = mRegisterSucCallbacks.values();
      if (ActivityCompat.checkSelfPermission(mWXSDKInstance.getContext(), Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(mWXSDKInstance.getContext(), Manifest.permission.ACCESS_COARSE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
        for (WXLocationListener listener : values) {
          listener.destroy();
          mLocationManager.removeUpdates(listener);
        }
        mRegisterSucCallbacks.clear();
      }
    }
  }

  static class WXLocationListener implements LocationListener, Handler.Callback {

    private WXSDKInstance mWXSDKInstance;
    private String mWatchId;
    private String mSucCallback;
    private String mErrorCallback;
    private boolean mEnableAddress;
    private Handler mHandler;
    private LocationManager mLocationManager;

    private WXLocationListener(LocationManager locationManager, WXSDKInstance instance, String watchId, String sucCallback, String errorCallback, boolean enableAddress) {
      mWXSDKInstance = instance;
      this.mWatchId = watchId;
      this.mSucCallback = sucCallback;
      this.mErrorCallback = errorCallback;
      this.mEnableAddress = enableAddress;
      mHandler = new Handler(this);
      mLocationManager = locationManager;
//      WVThreadPool.getInstance().execute(new Runnable() {
//        public void run() {
          mHandler.sendEmptyMessageDelayed(TIME_OUT_WHAT, GPS_TIMEOUT);
//        }
//      });
    }

    @Override
    public void onLocationChanged(Location location) {
      mHandler.removeMessages(TIME_OUT_WHAT);
      if(WXEnvironment.isApkDebugable()) {
        WXLogUtils.d(TAG, "into--[onLocationChanged] location:" + location == null ? "Location is NULL!" : location.toString());
      }

      if (mWXSDKInstance == null || mWXSDKInstance.isDestroy()) {
        return;
      }

      if (location != null) {
        Map<String, Object> result = new HashMap<>();
        Map<String, Object> coords = new HashMap<>();
        double longitude = location.getLongitude();
        double latitude = location.getLatitude();
        coords.put("longitude", longitude);
        coords.put("latitude", latitude);
        coords.put("altitude", location.getAltitude());
        coords.put("accuracy", location.getAccuracy());
        coords.put("heading", location.getBearing());
        coords.put("speed", location.getSpeed());
        result.put(COORDS, coords);

        // 行政区域
        if (mEnableAddress) {
          Address addr = getAddress(latitude, longitude);
          Map<String, Object> address = new HashMap<>();
          if (addr != null) {
            address.put("country", addr.getCountryName());
            address.put("province", addr.getAdminArea());
            address.put("city", addr.getLocality());
            address.put("cityCode", addr.getPostalCode());
            address.put("area", addr.getSubLocality());
            address.put("road", addr.getThoroughfare());
            // 其中getAddressLine(0)表示国家，getAddressLine(1)表示精确到某个区，getAddressLine(2)表示精确到具体的街
            StringBuilder sb = new StringBuilder();
            for (int i = 1; i <= 2; i++) {
              if (!TextUtils.isEmpty(addr.getAddressLine(i))) { //防止null导致的拼接错误
                sb.append(addr.getAddressLine(i));
              }
            }
            address.put("addressLine", sb.toString());
          }
          result.put(ADDRESS, address);
        }
        result.put(ERROR_CODE, ErrorCode.SUCCESS);
        result.put(ERROR_MSG, ErrorMsg.SUCCESS);
        if (!TextUtils.isEmpty(mWatchId)) {
          result.put(WATCH_ID, mWatchId);
        }
        WXSDKManager.getInstance().callback(mWXSDKInstance.getInstanceId(), mSucCallback, result, TextUtils.isEmpty(mWatchId) ? false : true);
      } else {
        Map<String, Object> options = new HashMap<>();
        options.put(ERROR_CODE, ErrorCode.LOCATION_ERROR);
        options.put(ERROR_MSG, ErrorMsg.LOCATION_ERROR);
        if (!TextUtils.isEmpty(mWatchId)) {
          options.put(WATCH_ID, mWatchId);
        }
        WXSDKManager.getInstance().callback(mWXSDKInstance.getInstanceId(), mErrorCallback, options, TextUtils.isEmpty(mWatchId) ? false : true);
      }
      if (TextUtils.isEmpty(mWatchId)) {
        if (mLocationManager != null && ActivityCompat.checkSelfPermission(mWXSDKInstance.getContext(), Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(mWXSDKInstance.getContext(), Manifest.permission.ACCESS_COARSE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
          destroy();
          mLocationManager.removeUpdates(this);
        }
      }
    }

    @Override
    public void onStatusChanged(String provider, int status, Bundle extras) {
      WXLogUtils.i(TAG, "into--[onStatusChanged] provider:" + provider + " status:" + status);
    }

    @Override
    public void onProviderEnabled(String provider) {
      WXLogUtils.i(TAG, "into--[onProviderEnabled] provider:" + provider);
    }

    @Override
    public void onProviderDisabled(String provider) {
      WXLogUtils.i(TAG, "into--[onProviderDisabled] provider:" + provider);
    }

    @Override
    public boolean handleMessage(Message msg) {
      if (msg.what == TIME_OUT_WHAT) {
        if(WXEnvironment.isApkDebugable()) {
          WXLogUtils.d(TAG, "into--[handleMessage] Location Time Out!");
        }
        if (mWXSDKInstance == null || mWXSDKInstance.isDestroy() || mLocationManager == null) {
          return false;
        }
        if (ActivityCompat.checkSelfPermission(mWXSDKInstance.getContext(), Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(mWXSDKInstance.getContext(), Manifest.permission.ACCESS_COARSE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
          mLocationManager.removeUpdates(this);
        }
        Map<String, Object> options = new HashMap<>();
        options.put(ERROR_CODE, ErrorCode.LOCATION_TIME_OUT);
        options.put(ERROR_MSG, ErrorMsg.LOCATION_TIME_OUT);
        if (!TextUtils.isEmpty(mWatchId)) {
          options.put(WATCH_ID, mWatchId);
        }
        WXSDKManager.getInstance().callback(mWXSDKInstance.getInstanceId(), mErrorCallback, options);
        return true;
      }
      return false;
    }

    /**
     * get address info
     */
    private Address getAddress(double latitude, double longitude) {
      if(WXEnvironment.isApkDebugable()) {
        WXLogUtils.d(TAG, "into--[getAddress] latitude:" + latitude + " longitude:" + longitude);
      }
      try {
        if (mWXSDKInstance == null || mWXSDKInstance.isDestroy()) {
          return null;
        }
        Geocoder gc = new Geocoder(mWXSDKInstance.getContext());
        List<Address> list = gc.getFromLocation(latitude, longitude, 1);
        if (list != null && list.size() > 0) {
          return list.get(0);
        }
      } catch (Exception e) {
        WXLogUtils.e(TAG, e);
      }
      return null;
    }

    public void destroy() {
      if (mHandler != null) {
        mHandler.removeMessages(TIME_OUT_WHAT);
        mWXSDKInstance=null;
      }
    }
  }
}