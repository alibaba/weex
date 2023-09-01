/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
package org.apache.weex;

import static android.content.Context.MODE_PRIVATE;

import android.annotation.SuppressLint;
import android.app.Application;
import android.content.Context;
import android.content.SharedPreferences;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.graphics.Typeface;
import android.os.Build;
import android.os.Environment;
import android.support.annotation.RestrictTo;
import android.support.annotation.RestrictTo.Scope;
import android.telephony.TelephonyManager;
import android.text.TextUtils;
import android.system.Os;
import dalvik.system.PathClassLoader;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileDescriptor;
import java.io.FileReader;
import java.io.IOException;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.apache.weex.common.WXConfig;
import org.apache.weex.utils.FontDO;
import org.apache.weex.utils.LogLevel;
import org.apache.weex.utils.TypefaceUtil;
import org.apache.weex.utils.WXFileUtils;
import org.apache.weex.utils.WXLogUtils;
import org.apache.weex.utils.WXSoInstallMgrSdk;
import org.apache.weex.utils.WXUtils;
import org.apache.weex.utils.WXViewUtils;

public class WXEnvironment {

  public static final String OS = "android";
  public static String SYS_VERSION = android.os.Build.VERSION.RELEASE;
  static{
    if(SYS_VERSION != null && SYS_VERSION.toUpperCase(Locale.ROOT).equals("P")){
        SYS_VERSION = "9.0.0";
    }
    if(SYS_VERSION != null && SYS_VERSION.toUpperCase(Locale.ROOT).equals("Q")){
       SYS_VERSION = "10.0.0";
    }
  }
  public static final String SYS_MODEL = android.os.Build.MODEL;
  public static final String EAGLE = "eagle";
  public static final String ENVIRONMENT = "environment";
  public static final String WEEX_CURRENT_KEY = "wx_current_url";
  /*********************
   * Global config
   ***************************/

  public static String JS_LIB_SDK_VERSION = BuildConfig.buildJavascriptFrameworkVersion;

  public static String WXSDK_VERSION = BuildConfig.buildVersion;
  public static Application sApplication;
  public static final String DEV_Id = getDevId();
  @Deprecated
  public static int sDefaultWidth = 750;
  public volatile static boolean JsFrameworkInit = false;

  public static final String SETTING_EXCLUDE_X86SUPPORT = "env_exclude_x86";

  public static boolean SETTING_FORCE_VERTICAL_SCREEN = false;

  /**
   * auto adjust device width for when screen size change.
   * */
  public static boolean AUTO_ADJUST_ENV_DEVICE_WIDTH = true;

  public static boolean AUTO_UPDATE_APPLICATION_SCREEN_SIZE = true;

  @RestrictTo(Scope.LIBRARY)
  public static volatile boolean sUseRunTimeApi;

  /**
   * Debug model
   */
  public static boolean sDebugMode = false;
  public static final boolean sForceEnableDevTool = true;
  public static String sDebugWsUrl = "";
  public static boolean sDebugServerConnectable = false;
  public static boolean sRemoteDebugMode = false;
  public static String sRemoteDebugProxyUrl = "";
  public static boolean sDebugNetworkEventReporterEnable = false;//debugtool network switch
  public static long sJSLibInitTime = 0;

  public static long sSDKInitStart = 0;// init start timestamp
  public static long sSDKInitInvokeTime = 0;//time cost to invoke init method
  public static long sSDKInitExecuteTime = 0;//time cost to execute init job
  /** from init to sdk-ready **/
  public static long sSDKInitTime =0;

  public static long sJSFMStartListenerTime=0;

  public static volatile boolean isWsFixMode = true;

  /**
   * component and modules ready
   * */
  public static long sComponentsAndModulesReadyTime = 0;

  public static boolean sInAliWeex = false;

  public static LogLevel sLogLevel = LogLevel.DEBUG;
  private static boolean isApkDebug = true;
  public static boolean isPerf = false;
  private static boolean sDebugFlagInit = false;

  private static boolean openDebugLog = true;

  private static String sGlobalFontFamily;

  public static final String CORE_SO_NAME = "weexcore";
  public static final String CORE_JSS_SO_NAME = "weexjss";
  public static final String CORE_JSB_SO_NAME = "weexjsb";
  public static final String CORE_JST_SO_NAME = "weexjst";

  @RestrictTo(Scope.LIBRARY)
  public static String CORE_JSC_SO_NAME = BuildConfig.JSInterpolatorName;
  public static  String CORE_JSS_SO_PATH = null;

  private static String CORE_JSS_ICU_PATH = null;

  private static String CORE_JSC_SO_PATH = null;

  public static String CORE_JSB_SO_PATH = null;

  private static String COPY_SO_DES_DIR = null;

  private static String LIB_LD_PATH = null;

  private static Map<String, String> options = new ConcurrentHashMap<>();
  static {
    options.put(WXConfig.os, OS);
    options.put(WXConfig.osName, OS);
  }


  public static synchronized WXDefaultSettings getWXDefaultSettings() {
    if (mWXDefaultSettings == null && getApplication() != null) {
      mWXDefaultSettings = new WXDefaultSettings(getApplication());
    }
    return mWXDefaultSettings;
  }

  public static synchronized String getDefaultSettingValue(String key, String defaultValue) {
    WXDefaultSettings wxDefaultSettings = getWXDefaultSettings();
    if (wxDefaultSettings == null || TextUtils.isEmpty(key)) {
      return defaultValue;
    }
    return wxDefaultSettings.getValue(key, defaultValue);
  }

  public static synchronized void writeDefaultSettingsValue(String key, String value) {
    WXDefaultSettings wxDefaultSettings = getWXDefaultSettings();
    if (wxDefaultSettings == null
            || TextUtils.isEmpty(key)
            || TextUtils.isEmpty(value)) {
      return;
    }
    wxDefaultSettings.saveValue(key, value);
  }

  private static WXDefaultSettings mWXDefaultSettings;

  /**
   * dynamic
   */
  public static boolean sDynamicMode = false;
  public static String sDynamicUrl = "";

  /**
   * Fetch system information.
   * @return map contains system information.
   */
  public static Map<String, String> getConfig() {
    Map<String, String> configs = new HashMap<>();
    configs.put(WXConfig.os, OS);
    configs.put(WXConfig.appVersion, getAppVersionName());
    configs.put(WXConfig.cacheDir, getAppCacheFile());
    configs.put(WXConfig.devId, DEV_Id);
    configs.put(WXConfig.sysVersion, SYS_VERSION);
    configs.put(WXConfig.sysModel, SYS_MODEL);
    configs.put(WXConfig.weexVersion, String.valueOf(WXSDK_VERSION));

    try {
      configs.put(WXConfig.layoutDirection, isLayoutDirectionRTL() ? "rtl" : "ltr");
    } catch (Exception e) {
      configs.put(WXConfig.layoutDirection, "ltr");
    }

    try {
      if (isApkDebugable()) {
        addCustomOptions(WXConfig.debugMode, "true");
      }
      addCustomOptions(WXConfig.scale, Float.toString(sApplication.getResources().getDisplayMetrics().density));
      addCustomOptions(WXConfig.androidStatusBarHeight, Float.toString(WXViewUtils.getStatusBarHeight(sApplication)));
    }catch (NullPointerException e){
      //There is little chance of NullPointerException as sApplication may be null.
      WXLogUtils.e("WXEnvironment scale Exception: ", e);
    }
    configs.putAll(getCustomOptions());
    if(configs.get(WXConfig.appName)==null && sApplication!=null){
      configs.put(WXConfig.appName, sApplication.getPackageName());
    }
    return configs;
  }

  /**
   * Get the version of the current app.
   */
  public static String getAppVersionName() {
    String versionName = "";
    PackageManager manager;
    PackageInfo info = null;
    try {
      manager = sApplication.getPackageManager();
      info = manager.getPackageInfo(sApplication.getPackageName(), 0);
      versionName = info.versionName;
    } catch (Exception e) {
      WXLogUtils.e("WXEnvironment getAppVersionName Exception: ", e);
    }
    return versionName;
  }

  /**
   *
   * @return string cache file
   */
  private static String getAppCacheFile() {
    String cache = "";
    try {
      cache = sApplication.getApplicationContext().getCacheDir().getPath();
    } catch (Exception e) {
      WXLogUtils.e("WXEnvironment getAppCacheFile Exception: ", e);
    }
    return cache;
  }


  /**
   * Use {@link #addCustomOptions(String, String)} to add custom options.
   * Use {@link #getCustomOptions(String)} to get custom options
   * @return
   */
  @Deprecated
  public static Map<String, String> getCustomOptions() {
    return options;
  }

  public static void addCustomOptions(String key, String value) {
    options.put(key, value);
  }

  public static String getCustomOptions(String key){
    return options.get(key);
  }


  @SuppressLint("SdCardPath")
  public static String copySoDesDir() {
    try {
      if (TextUtils.isEmpty(COPY_SO_DES_DIR)) {
        if (sApplication == null) {
          WXLogUtils.e("sApplication is null, so copy path will be null");
          return null;
        }

        String dirName = "/cache/weex/libs";
        File desDir = null;
        String cachePath = WXEnvironment.getApplication().getApplicationContext().getCacheDir().getPath();

        if (TextUtils.isEmpty(cachePath)) {
          desDir = new File(cachePath, dirName);
        } else {
          String pkgName = sApplication.getPackageName();
          String toPath = "/data/data/" + pkgName + dirName;
          desDir = new File(toPath);
        }

        if (!desDir.exists()) {
          desDir.mkdirs();
        }
        COPY_SO_DES_DIR = desDir.getCanonicalPath();
      }
    } catch (Throwable e) {
      WXLogUtils.e(WXLogUtils.getStackTrace(e));
    }
    return COPY_SO_DES_DIR;

  }

  @Deprecated
  /**
   * Use {@link #isHardwareSupport()} if you want to see whether current hardware support Weex.
   */
  public static boolean isSupport() {
    boolean isInitialized = WXSDKEngine.isInitialized();
    if(!isInitialized){
      WXLogUtils.e("WXSDKEngine.isInitialized():" + isInitialized);
    }
    return isHardwareSupport() && isInitialized;
  }

  public static boolean isLayoutDirectionRTL() {
    // support RTL
    if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.JELLY_BEAN_MR1) {
      return sApplication.getApplicationContext().getResources().getBoolean(R.bool.weex_is_right_to_left);
    }
    return false;
  }
  /**
   * Tell whether Weex can run on current hardware.
   * @return true if weex can run on current hardware, otherwise false.
   * Weex has removed the restrictions on the tablet, please use {@link #isCPUSupport()}
   */
  @Deprecated
  public static boolean isHardwareSupport() {
    if (WXEnvironment.isApkDebugable()) {
      WXLogUtils.d("isTableDevice:" + WXUtils.isTabletDevice());
    }
    return isCPUSupport();
  }

  /**
   * Determine whether Weex supports the current CPU architecture
   * @return true when support
   */
  public static boolean isCPUSupport(){
    boolean excludeX86 = "true".equals(getCustomOptions().get(SETTING_EXCLUDE_X86SUPPORT));
    boolean isX86AndExcluded = WXSoInstallMgrSdk.isX86() && excludeX86;
    boolean isCPUSupport = WXSoInstallMgrSdk.isCPUSupport() && !isX86AndExcluded;
    if (WXEnvironment.isApkDebugable()) {
      WXLogUtils.d("WXEnvironment.sSupport:" + isCPUSupport
              + "isX86AndExclueded: "+ isX86AndExcluded);
    }
    return isCPUSupport;
  }

  public static boolean isApkDebugable() {
    return isApkDebugable(sApplication);
  }

  public static boolean isApkDebugable(Application application) {
    if (application == null) {
      return false;
    }

    if (isPerf) {
      return false;
    }

    if (sDebugFlagInit){
      return isApkDebug;
    }
    try {
      String debugModeConfig = getCustomOptions().get(WXConfig.debugMode);
      if (TextUtils.isEmpty(debugModeConfig)){
        ApplicationInfo info = application.getApplicationInfo();
        isApkDebug = (info.flags & ApplicationInfo.FLAG_DEBUGGABLE) != 0;
      }else {
        isApkDebug = Boolean.valueOf(debugModeConfig);
      }
    } catch (Exception e) {
      /**
       * Don't call WXLogUtils.e here,will cause stackoverflow
       */
      e.printStackTrace();
      isApkDebug = false;
    }
    sDebugFlagInit = true;
    return isApkDebug;
  }

  public static boolean isPerf() {
    return isPerf;
  }

  @SuppressLint("HardwareIds")
  private static String getDevId() {
    String ret = "";
    if(sApplication != null){
      try{
        ret = ((TelephonyManager) sApplication
            .getSystemService(Context.TELEPHONY_SERVICE)).getDeviceId();
      }catch (SecurityException | NullPointerException e){
        WXLogUtils.e(WXLogUtils.getStackTrace(e));
      }
    }
    return ret;
  }

  public static Application getApplication() {
    return sApplication;
  }

  public void initMetrics() {
    if (sApplication == null) {
      return;
    }
  }

  public static String getDiskCacheDir(Context context) {
    if (context == null) {
      return null;
    }
    String cachePath = null;
    try {
      if (Environment.MEDIA_MOUNTED.equals(Environment.getExternalStorageState())
              || !Environment.isExternalStorageRemovable()) {
        cachePath = context.getExternalCacheDir().getPath();
      } else {
        cachePath = context.getCacheDir().getPath();
      }
    } catch (Exception e) {
      e.printStackTrace();
    }
    return cachePath;
  }

  public static String getFilesDir(Context context) {
    if (context == null) {
      return "";
    }
    File filesDir = context.getFilesDir();
    String path = "";
    if (filesDir != null) {
      path = filesDir.getPath();
    } else {
      path = WXEnvironment.getApplication().getApplicationInfo().dataDir;
      path += File.separator;
      path += "files";
    }

    return path;
  }

  public static String getCrashFilePath(Context context) {
    if (context == null) {
        return "";
    }

    File dir = context.getDir("crash", Context.MODE_PRIVATE);
    if (dir == null)
        return "";

    String crashDir = null;
    try {
      crashDir = dir.getCanonicalPath();
    } catch (IOException e) {
      e.printStackTrace();
    }

    return crashDir;
  }

  public static String getGlobalFontFamilyName() {
    return sGlobalFontFamily;
  }

  public static void setGlobalFontFamily(String fontFamilyName, Typeface typeface) {
    WXLogUtils.d("GlobalFontFamily", "Set global font family: " + fontFamilyName);
    sGlobalFontFamily = fontFamilyName;
    if (!TextUtils.isEmpty(fontFamilyName)) {
      if (typeface == null) {
        TypefaceUtil.removeFontDO(fontFamilyName);
      } else {
        FontDO nativeFontDO = new FontDO(fontFamilyName, typeface);
        TypefaceUtil.putFontDO(nativeFontDO);
        WXLogUtils.d("TypefaceUtil", "Add new font: " + fontFamilyName);
      }
    }
  }

  public static boolean isOpenDebugLog() {
    return openDebugLog;
  }

  public static void setOpenDebugLog(boolean openDebugLog) {
    WXEnvironment.openDebugLog = openDebugLog;
  }

  public static void  setApkDebugable(boolean debugable){
    isApkDebug  = debugable;
    if(!isApkDebug){
      openDebugLog = false;
    }
  }

  public static String getCacheDir() {
    final Application application = getApplication();
    if (application == null || application.getApplicationContext() == null)
      return null;
    return application.getApplicationContext().getCacheDir().getPath();
  }

  public static String extractSo() {
    File sourceFile = new File(getApplication().getApplicationContext().getApplicationInfo().sourceDir);
    final String soDesPath = copySoDesDir();
    if (sourceFile.exists() && !TextUtils.isEmpty(soDesPath)) {
      try {
        WXFileUtils.extractSo(sourceFile.getCanonicalPath(), soDesPath);
      } catch (IOException e) {
        WXLogUtils.e("extractSo error " + e.getMessage());
//        e.printStackTrace();
        return null;
      }
      return soDesPath;
    }
    return null;
  }

  private static String findIcuPath() {
    File file = new File("/proc/self/maps");
    BufferedReader reader = null;
    try {
      reader = new BufferedReader(new FileReader(file));
      String tempString = null;
      while ((tempString = reader.readLine()) != null) {
        if (tempString.contains("icudt")) {

          int i = tempString.indexOf('/');

          String substring = tempString.substring(i);
          return substring.trim();
        }
      }
      reader.close();
    } catch (IOException e) {
      e.printStackTrace();
    } finally {
      if (reader != null) {
        try {
          reader.close();
        } catch (IOException e1) {
        }
      }
    }

    return null;
  }

  public static int memfd_create(String name, int size) {
    if (Build.VERSION.SDK_INT <= Build.VERSION_CODES.P) {
      return 0;
    }

    int fd = 0;
    try {
      Method memfd_create = Os.class.getMethod("memfd_create", String.class, int.class);
      Object fd_object = memfd_create.invoke(null, name, 0);
      if (fd_object instanceof FileDescriptor) {
        Field descriptor = FileDescriptor.class.getDeclaredField("descriptor");
        descriptor.setAccessible(true);
        Object fd_int_object = descriptor.get(fd_object);
        fd = Integer.parseInt(String.valueOf(fd_int_object));
        descriptor.setAccessible(false);
        Os.ftruncate((FileDescriptor) fd_object, size);
      }
    } catch (Throwable e) {
      // do Nothing
    }
    return fd;
  }

  public static String findSoPath(String libName) {
    String soPath = ((PathClassLoader) (WXEnvironment.class.getClassLoader())).findLibrary(libName);
    if (!TextUtils.isEmpty(soPath)) {
      File soFile = new File(soPath);
      if (soFile.exists()) {
        WXLogUtils.e(libName + "'s Path is" + soPath);
        try {
          return soFile.getCanonicalPath();
        } catch (IOException e) {
          e.printStackTrace();
        }
      } else {
        WXLogUtils.e(libName + "'s Path is " + soPath + " but file does not exist");
      }
    }

    String realName = "lib" + libName + ".so";
    String cacheDir = getCacheDir();
    if (TextUtils.isEmpty(cacheDir)) {
      WXLogUtils.e("cache dir is null");
      return "";
    }


    if (cacheDir.indexOf("/cache") > 0) {
      try {
        soPath = new File(cacheDir.replace("/cache", "/lib"), realName).getCanonicalPath();
      } catch (IOException e) {
        e.printStackTrace();
      }
    }
    final File soFile = new File(soPath);
    if (soFile.exists()) {
      WXLogUtils.e(libName + "use lib so");
      return soPath;
    } else {
      //unzip from apk file
      final String extractSoPath = extractSo();
      if (!TextUtils.isEmpty(extractSoPath)) {
        try {
          return new File(getCacheDir(), realName).getCanonicalPath();
        } catch (IOException e) {
          e.printStackTrace();
        }
      }
    }
    return soPath;
  }

  public static String getLibJScRealPath() {
    if(TextUtils.isEmpty(CORE_JSC_SO_PATH)) {
      CORE_JSC_SO_PATH = findSoPath(CORE_JSC_SO_NAME);
      WXLogUtils.e("findLibJscRealPath " + CORE_JSC_SO_PATH);
    }
    return CORE_JSC_SO_PATH;
  }

  public static String getLibJssRealPath() {
    if(TextUtils.isEmpty(CORE_JSS_SO_PATH)) {
      CORE_JSS_SO_PATH = findSoPath(CORE_JSS_SO_NAME);
      WXLogUtils.d("test-> findLibJssRealPath " + CORE_JSS_SO_PATH);
    }

    return CORE_JSS_SO_PATH;
  }

  public static String getLibJssIcuPath() {
    if(TextUtils.isEmpty(CORE_JSS_ICU_PATH)){
      CORE_JSS_ICU_PATH = findIcuPath();
    }

    return CORE_JSS_ICU_PATH;
  }

  public static String getLibLdPath() {
    if (TextUtils.isEmpty(LIB_LD_PATH)) {
      ClassLoader classLoader = WXEnvironment.class.getClassLoader();
      try {
        Method getLdLibraryPath = classLoader.getClass().getMethod("getLdLibraryPath", new Class[0]);
        LIB_LD_PATH = (String) getLdLibraryPath.invoke(classLoader, new Object[0]);
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      }
    }

    if(TextUtils.isEmpty(LIB_LD_PATH)) {
      try {
        String property = System.getProperty("java.library.path");
        String libJScRealPath = getLibJScRealPath();
        if(!TextUtils.isEmpty(libJScRealPath)) {
          LIB_LD_PATH = new File(libJScRealPath).getParent() + ":" + property;
        }
      } catch (Exception e) {
        e.printStackTrace();
      }
    }

    WXLogUtils.d("getLibLdPath is " + LIB_LD_PATH);
    return LIB_LD_PATH;
  }

  public static class WXDefaultSettings {
    private String configName = "weex_default_settings";
    private SharedPreferences sharedPreferences = null;
    public WXDefaultSettings(Application application) {
      if(application != null) {
        sharedPreferences = application.getSharedPreferences(configName, MODE_PRIVATE);
      }
    }

    public synchronized String getValue(String key, String defaultValue) {
      if(sharedPreferences == null || TextUtils.isEmpty(key)) {
        WXLogUtils.i("get default settings " + key + " return default value :" + defaultValue);
        return defaultValue;
      }

      String result = sharedPreferences.getString(key, defaultValue);
      WXLogUtils.i("get default settings " + key + " : " + result);
      return result;
    }

    public synchronized void saveValue(String key, String value) {
      if (sharedPreferences == null
              || TextUtils.isEmpty(key)
              || TextUtils.isEmpty(value)) {
        return;
      }
      WXLogUtils.i("save default settings " + key + ":" + value);
      SharedPreferences.Editor editor = sharedPreferences.edit();
      editor.putString(key, value);
      editor.apply();
    }
  }
}
