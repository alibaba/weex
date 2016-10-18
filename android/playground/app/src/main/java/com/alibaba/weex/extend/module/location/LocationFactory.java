package com.alibaba.weex.extend.module.location;

import com.taobao.weex.WXSDKInstance;

/**
 */
public class LocationFactory {

  public  static ILocatable getLocationProvider(WXSDKInstance context){
    return new DefaultLocation(context);
  }
}
