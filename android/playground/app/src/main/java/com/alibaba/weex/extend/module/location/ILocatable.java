package com.alibaba.weex.extend.module.location;

import com.taobao.weex.WXSDKInstance;

/**
 */
public interface ILocatable {

  int REQUEST_CUR_PERMISSION_CODE = 0x12;
  int REQUEST_WATCH_PERMISSION_CODE = 0x13;


  String REQUEST_PERMISSION_CODE = "requestCode";
  String ERROR_CODE = "errorCode";
  String ERROR_MSG = "errorMsg";
  String COORDS = "coords";
  String ADDRESS = "address";
  String WATCH_ID = "watchId";

  interface ErrorCode {

    int SUCCESS = 90000;
    int NO_PERMISSION_ERROR = 90001;
    int PARAMS_ERROR = 90002;
    int LOCATION_ERROR = 9003;
    int LOCATION_TIME_OUT = 9004;
  }

  interface ErrorMsg {

    String NO_PERMISSION_ERROR = "NO PERMISSION";
    String PARAMS_ERROR = "PARAMS_ERROR";
    String LOCATION_ERROR = "LOCATION_FAIL";
    String LOCATION_TIME_OUT = "LOCATION_TIME_OUT";
    String SUCCESS = "SUCCESS";

  }

  /**
   * Get current location information, the callback only once
   *
   * @param successCallback success callback function id.
   * @param errorCallback   error callback function id.(example:no persimmon)
   * @param params          JSON parameter(example:address).
   */
  void getCurrentPosition(String successCallback, String errorCallback, String params);

  /**
   * register global location listener，if location change，you will be notify.
   *
   * @param successCallback location success callback function id.
   * @param errorCallback   location error callback (example:no persimmon).
   * @param params          JSON parameter(example:address).
   */
  void watchPosition(String successCallback, String errorCallback, String params);

  /**
   * remove global location listener.
   *
   * @param watchId register id,you can get from watchPosition method。
   */
  void clearWatch(String watchId);

  /**
   * set instance
   *
   * @param instance instance
   */
  void setWXSDKInstance(WXSDKInstance instance);

  /**
   * this method will call when module destroy.
   */
  void destroy();

}
