package com.alibaba.weex.constants;

public class Constants {

  public static final String BUNDLE_URL = "bundle_url";
  public static final String WEEX_SAMPLES_KEY = "?weex-samples";
  public static final String WEEX_TPL_KEY = "_wx_tpl";


  //hot refresh
  public static final int HOT_REFRESH_CONNECT = 0x111;
  public static final int HOT_REFRESH_DISCONNECT = HOT_REFRESH_CONNECT + 1;
  public static final int HOT_REFRESH_REFRESH = HOT_REFRESH_DISCONNECT + 1;
  public static final int HOT_REFRESH_CONNECT_ERROR = HOT_REFRESH_REFRESH + 1;
}
