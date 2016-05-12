package com.alibaba.weex.constants;

public class Constants {

  public static final String MOCK_FILE_NAME_KEY = "mock_file_name_key";
  public static final String BUNDLE_URL = "bundle_url";
  public static final String WEEX_SAMPLES_KEY = "?weex-samples";
  public static final String WEEX_TPL_KEY = "_wx_tpl";
  public static final String ASSETS_ROOT_FOLDER = "weex_js";


  //hot refresh
  public static final int HOT_REFRESH_CONNECT = 0x111;
  public static final int HOT_REFRESH_DISCONNECT = HOT_REFRESH_CONNECT + 1;
  public static final int HOT_REFRESH_REFRESH = HOT_REFRESH_DISCONNECT + 1;
  public static final int HOT_REFRESH_CONNECT_ERROR = HOT_REFRESH_REFRESH + 1;
  public static final String WX_ASSETS_FOLDER = "wx_assets_folder";
}
