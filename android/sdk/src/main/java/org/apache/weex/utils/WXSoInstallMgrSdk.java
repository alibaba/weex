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
package org.apache.weex.utils;

import android.annotation.SuppressLint;
import android.app.Application;
import android.content.Context;
import android.content.pm.ApplicationInfo;
import android.os.Build;
import android.text.TextUtils;
import org.apache.weex.IWXStatisticsListener;
import org.apache.weex.WXEnvironment;
import org.apache.weex.adapter.IWXSoLoaderAdapter;
import org.apache.weex.adapter.IWXUserTrackAdapter;
import org.apache.weex.common.WXErrorCode;
import dalvik.system.PathClassLoader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Field;
import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;
import java.util.Enumeration;
import java.util.Locale;
import java.util.zip.ZipEntry;
import java.util.zip.ZipException;
import java.util.zip.ZipFile;


/**
 * Utility class for managing so library, including load native library and version management.
 * <ol>
 *   <li>Load library<br>
 *     It Will try to use {@link System#loadLibrary(String)} to load native library. If it successes,
 *     the Android Framework will be responsible for managing library and library version.
 *     If it fails in case of some ceratin armebi-v7a architecture device, it will try to extract
 *     native library from apk and copy it the data directory of the app. Then load it using
 *     {@link System#load(String)}.
 *     </li>
 *  <li>
 *       Version control for extracting native library from apk.
 *  </li>
 * </ol>
 */
public class WXSoInstallMgrSdk {

  final static String LOGTAG = "INIT_SO";
  //below is the CPU string types
  private final static String ARMEABI = "armeabi"; //default
  private final static String X86 = "x86";
  private final static String MIPS = "mips";
  private final static String STARTUPSO = "/libweexjsb.so";
  private final static String STARTUPSOANDROID15 = "/libweexjst.so";

  static Application mContext = null;
  private static IWXSoLoaderAdapter mSoLoader = null;
  private static IWXStatisticsListener mStatisticsListener = null;

  private static String mAbi = null;

  public static void init(Application c,
                          IWXSoLoaderAdapter loader,
                          IWXStatisticsListener listener) {
    mContext = c;
    mSoLoader = loader;
    mStatisticsListener = listener;
  }

  public static boolean isX86(){
    String cpuType = _cpuType();
    return cpuType.equalsIgnoreCase(X86);
  }

  public static boolean isCPUSupport(){
    String cpuType = _cpuType();
    return !cpuType.equalsIgnoreCase(MIPS);
  }

  /**
   * Load so library.
   *
   * If a library loader adapter exists, use this adapter to load library,
   * otherwise use {@link System#loadLibrary(String)} to load library.
   * If failed to load library, try to extract the so library and load it
   * from arembi in the .apk
   *
   * @param libName library name, like webp, not necessary to be libwep.so
   * @param version the version of the so library
   */
  public static boolean initSo(String libName, int version, IWXUserTrackAdapter utAdapter) {
    String cpuType = _cpuType();
    if (cpuType.equalsIgnoreCase(MIPS) ) {
      WXExceptionUtils.commitCriticalExceptionRT(null,
              WXErrorCode.WX_KEY_EXCEPTION_SDK_INIT,
              "initSo", "[WX_KEY_EXCEPTION_SDK_INIT_CPU_NOT_SUPPORT] for android cpuType is MIPS",
              null);
      return false;
    }

    // copy startup so
    if (WXEnvironment.CORE_SO_NAME.equals(libName)) {
      copyStartUpSo();
    }


    boolean InitSuc = false;
      try {
        // If a library loader adapter exists, use this adapter to load library
        // instead of System.loadLibrary.
        if (mSoLoader != null) {
          mSoLoader.doLoadLibrary("c++_shared");
        } else {
          System.loadLibrary("c++_shared");
        }
      } catch (Exception | Error e) {
        WXExceptionUtils.commitCriticalExceptionRT(null,
                WXErrorCode.WX_KEY_EXCEPTION_SDK_INIT,
                "initSo",
                        "load c++_shared failed Detail Error is: " +e.getMessage(),
                null);

        if(WXEnvironment.isApkDebugable()) {
          throw e;
        }
      }

      /**
       * Load library with {@link System#loadLibrary(String)}
       */
      try {
        // If a library loader adapter exists, use this adapter to load library
        // instead of System.loadLibrary.
        if (mSoLoader != null) {
          mSoLoader.doLoadLibrary(libName);
        } else {
          System.loadLibrary(libName);
        }

        InitSuc = true;
      } catch (Exception | Error e2) {
        if (cpuType.contains(ARMEABI) || cpuType.contains(X86)) {
          WXExceptionUtils.commitCriticalExceptionRT(null,
                  WXErrorCode.WX_KEY_EXCEPTION_SDK_INIT,
                  "initSo", libName + "[WX_KEY_EXCEPTION_SDK_INIT_CPU_NOT_SUPPORT] for android cpuType is " +cpuType +
                          "\n Detail Error is: " +e2.getMessage(),
                  null);
        }

        if(WXEnvironment.isApkDebugable()) {
          throw e2;
        }
        InitSuc = false;
      }

//      try {

//        if (!InitSuc) {
//
//          //File extracted from apk already exists.
//          if (isExist(libName, version)) {
//            boolean res = _loadUnzipSo(libName, version, utAdapter);
//            if (res) {
//              return res;
//            } else {
//              //Delete the corrupt so library, and extract it again.
//              removeSoIfExit(libName, version);
//            }
//          }
//
//          //Fail for loading file from libs, extract so library from so and load it.
//          if (cpuType.equalsIgnoreCase(MIPS)) {
//            return false;
//          } else {
//            try {
//              InitSuc = unZipSelectedFiles(libName, version, utAdapter);
//            } catch (IOException e2) {
//              e2.printStackTrace();
//            }
//          }
//
//        }
//      } catch (Exception | Error e) {
//        InitSuc = false;
//        e.printStackTrace();
//      }
  //  }
    return InitSuc;
  }

  private static File _desSoCopyFile(String soName) {
    String cpuType = _cpuType();
    String copyPath = WXEnvironment.copySoDesDir();
    if (TextUtils.isEmpty(copyPath)) {
      return null;
    }
    File desDir = new File(copyPath, soName + "/" + cpuType);
    return desDir;
  }

  /**
   * copyStartUpSo
   */
  @SuppressLint("SdCardPath")
  public static void copyStartUpSo() {
    try {
      // copy libjsb.so to cache/weex/jsb/cputype
      String pkgName = WXEnvironment.getApplication().getPackageName();
      String cacheFile = WXEnvironment.getApplication().getApplicationContext().getCacheDir().getPath();

      // cp weexjsb any way
      // if android api < 16 copy libweexjst.so else copy libweexjsb.so
      boolean pieSupport = true;
      File newfile;
      String startSoName = WXEnvironment.CORE_JSB_SO_NAME;
      String startSoPath = STARTUPSO;
      if (Build.VERSION.SDK_INT < Build.VERSION_CODES.JELLY_BEAN) {
        pieSupport = false;
        startSoName = WXEnvironment.CORE_JST_SO_NAME;
        startSoPath = STARTUPSOANDROID15;
      }

      final File copyPath = _desSoCopyFile(startSoName);
      if(!copyPath.exists()) {
        copyPath.mkdirs();
      }
      newfile = new File(copyPath, startSoPath);
      WXEnvironment.CORE_JSB_SO_PATH = newfile.getCanonicalPath();
      String jsb = WXEnvironment.getDefaultSettingValue(startSoName, "-1");
      if(newfile.exists() && TextUtils.equals(WXEnvironment.getAppVersionName(), jsb)) {
        // no update so skip copy
        return;
      }

      String path = "/data/data/" + pkgName + "/lib";
      if (cacheFile != null && cacheFile.indexOf("/cache") > 0) {
        path = cacheFile.replace("/cache", "/lib");
      }
      File oldfile = null;
      if (pieSupport) {
        oldfile = new File(path, STARTUPSO);
      } else {
        oldfile = new File(path , STARTUPSOANDROID15);
      }


      if (!oldfile.exists()) {
        try {
          String weexjsb = ((PathClassLoader) (WXSoInstallMgrSdk.class.getClassLoader())).findLibrary(startSoName);
          oldfile = new File(weexjsb);
        } catch (Throwable throwable) {
          // do nothing
        }
      }


      if(!oldfile.exists()) {
        String extractSoPath = WXEnvironment.extractSo();
        oldfile = new File(extractSoPath, STARTUPSO);
      }

      if (oldfile.exists()) {
        WXFileUtils.copyFile(oldfile, newfile);
      }
      WXEnvironment.writeDefaultSettingsValue(startSoName, WXEnvironment.getAppVersionName());
    } catch (Throwable e) {
      e.printStackTrace();
    }
  }

  public static void copyJssRuntimeSo(){
    boolean tryUseRunTimeApi = WXUtils.checkGreyConfig("wxapm","use_runtime_api","0");
    WXLogUtils.e("weex", "tryUseRunTimeApi ? "+ tryUseRunTimeApi);
    if (!tryUseRunTimeApi){
      return;
    }
    try {
      WXLogUtils.e("weex", "copyJssRuntimeSo: ");
      File toPath = _desSoCopyFile(WXEnvironment.CORE_JSS_SO_NAME);
      if(!toPath.exists()) {
        toPath.mkdirs();
      }
      File targetFile = new File(toPath,"libweexjss.so");

      /** 1. check so and versionCode. if update, then rm old jss.so(runtime) in pkg/libs, and copy new so from apk **/
      String keyVersionCode = "app_version_code_weex";
      String defaultSettingValue = WXEnvironment.getDefaultSettingValue(keyVersionCode, "-1");


      if (targetFile.exists()){
        if (!TextUtils.equals(WXEnvironment.getAppVersionName(),defaultSettingValue)){
          targetFile.delete();
        }else {
          WXEnvironment.CORE_JSS_SO_PATH= targetFile.getCanonicalPath();
          WXEnvironment.sUseRunTimeApi = true;
          WXLogUtils.e("weex", "copyJssRuntimeSo exist:  return");
          return;
        }
      }
      /** 2. copy jss(runtime) so **/
      String fromPath =  ((PathClassLoader) (WXSoInstallMgrSdk.class.getClassLoader())).findLibrary("weexjssr");
      if (TextUtils.isEmpty(fromPath)){
        return;
      }
      targetFile.createNewFile();
      WXFileUtils.copyFileWithException(new File(fromPath),targetFile);
      /**3. update flag **/
      WXEnvironment.CORE_JSS_SO_PATH= targetFile.getCanonicalPath();
      WXEnvironment.writeDefaultSettingsValue(keyVersionCode,WXEnvironment.getAppVersionName());
      WXEnvironment.sUseRunTimeApi = true;
      WXLogUtils.e("weex", "copyJssRuntimeSo: cp end and return ");
    }catch (Throwable e){
      e.printStackTrace();
      WXEnvironment.sUseRunTimeApi = false;
      WXLogUtils.e("weex", "copyJssRuntimeSo:  exception" + e);
    }
  }

  private static String _getFieldReflectively(Build build, String fieldName) {
    try {
      final Field field = Build.class.getField(fieldName);
      return field.get(build).toString();
    } catch (Exception ex) {
      return "Unknown";
    }
  }

  public static String _cpuType() {
    if(TextUtils.isEmpty(mAbi)) {
      try {
        mAbi = Build.CPU_ABI;
      }catch (Throwable e){
        e.printStackTrace();
        mAbi = ARMEABI;
      }
      if (TextUtils.isEmpty(mAbi)){
        mAbi = ARMEABI;
      }
      mAbi = mAbi.toLowerCase(Locale.ROOT);
    }
    return mAbi;
  }

  /**
   *
   * @param libName lib name
   * @param size  the right size of lib
   * @return true for valid  ; false for InValid
   */
  static boolean checkSoIsValid(String libName, long size) {
    Context context = mContext;
    if (null == context) {
      return false;
    }
    try{
      long start=System.currentTimeMillis();
      if(WXSoInstallMgrSdk.class.getClassLoader() instanceof PathClassLoader ) {

        String path = ((PathClassLoader) (WXSoInstallMgrSdk.class.getClassLoader())).findLibrary(libName);
        if(TextUtils.isEmpty(path) ){
          return false;
        }
        File file = new File(path);

        if (!file.exists() || size == file.length()) {
          WXLogUtils.w("weex so size check path :" + path+"   "+(System.currentTimeMillis() - start));
          return true;
        } else {
          return false;
        }
      }
    }catch(Throwable e ){
      WXExceptionUtils.commitCriticalExceptionRT(null,
              WXErrorCode.WX_KEY_EXCEPTION_SDK_INIT,
              "checkSoIsValid", "[WX_KEY_EXCEPTION_SDK_INIT_CPU_NOT_SUPPORT] for " +
                      "weex so size check fail exception :"+e.getMessage(),
              null);
      WXLogUtils.e("weex so size check fail exception :"+e.getMessage());
    }

    return true;
  }

  /**
   * Concatenate the path of the so library, including directory.
   * @param libName the raw name of the lib
   * @param version the version of the so library
   * @return the path of the so library
   */
  @SuppressLint("SdCardPath")
  static String _targetSoFile(String libName, int version) {
    Context context = mContext;
    if (null == context) {
      return "";
    }

    String path = "/data/data/" + context.getPackageName() + "/files";

    File f = context.getFilesDir();
    if (f != null) {
      path = f.getPath();
    }
    return path + "/lib" + libName + "bk" + version + ".so";

  }

  /**
   * Remove the so library if it had been extracted.
   * @param libName
   * @param version
   */
  static void removeSoIfExit(String libName, int version) {

    String file = _targetSoFile(libName, version);
    File a = new File(file);
    if (a.exists()) {
      a.delete();
    }

  }

  /**
   * Tell whether the so is extracted.
   */
  static boolean isExist(String libName, int version) {

    String file = _targetSoFile(libName, version);
    File a = new File(file);
    return a.exists();

  }


  /**
   * Load .so library
   */
  @SuppressLint("UnsafeDynamicallyLoadedCode")
  static boolean _loadUnzipSo(String libName,
                              int version,
                              IWXUserTrackAdapter utAdapter) {
    boolean initSuc = false;
    try {
      if (isExist(libName, version)) {
        // If a library loader adapter exists, use this adapter to load library
        // instead of System.load.
        if (mSoLoader != null) {
          mSoLoader.doLoad(_targetSoFile(libName, version));
        } else {
          System.load(_targetSoFile(libName, version));
        }
      }
      initSuc = true;
    } catch (Throwable e) {
      initSuc = false;
      WXExceptionUtils.commitCriticalExceptionRT(null,
              WXErrorCode.WX_KEY_EXCEPTION_SDK_INIT_CPU_NOT_SUPPORT,
              "_loadUnzipSo", "[WX_KEY_EXCEPTION_SDK_INIT_WX_ERR_COPY_FROM_APK] " +
                      "\n Detail Msg is : " +  e.getMessage(),
              null);
      WXLogUtils.e("", e);
    }
    return initSuc;
  }

  static boolean unZipSelectedFiles(String libName,
                                    int version,
                                    IWXUserTrackAdapter utAdapter) throws ZipException, IOException {
    String sourcePath = "lib/armeabi/lib" + libName + ".so";

    String zipPath = "";
    Context context = mContext;
    if (context == null) {
      return false;
    }

    ApplicationInfo aInfo = context.getApplicationInfo();
    if (null != aInfo) {
      zipPath = aInfo.sourceDir;
    }

    ZipFile zf;
    zf = new ZipFile(zipPath);
    try {

      for (Enumeration<?> entries = zf.entries(); entries.hasMoreElements(); ) {
        ZipEntry entry = ((ZipEntry) entries.nextElement());
        if (entry.getName().startsWith(sourcePath)) {

          InputStream in = null;
          FileOutputStream os = null;
          FileChannel channel = null;
          int total = 0;
          try {

            //Make sure the old library is deleted.
            removeSoIfExit(libName, version);

            //Copy file
            in = zf.getInputStream(entry);
            os = context.openFileOutput("lib" + libName + "bk" + version + ".so",
                    Context.MODE_PRIVATE);
            channel = os.getChannel();

            byte[] buffers = new byte[1024];
            int realLength;

            while ((realLength = in.read(buffers)) > 0) {
              //os.write(buffers);
              channel.write(ByteBuffer.wrap(buffers, 0, realLength));
              total += realLength;

            }
          } finally {
            if (in != null) {
              try {
                in.close();
              } catch (Exception e) {
                e.printStackTrace();
              }
            }

            if (channel != null) {
              try {
                channel.close();
              } catch (Exception e) {
                e.printStackTrace();
              }
            }

            if (os != null) {
              try {
                os.close();
              } catch (Exception e) {
                e.printStackTrace();
              }
            }

            if (zf != null) {
              zf.close();
              zf = null;
            }
          }

          if (total > 0) {
            return _loadUnzipSo(libName, version, utAdapter);
          } else {
            return false;
          }
        }
      }
    } catch (java.io.IOException e) {
      e.printStackTrace();
      WXExceptionUtils.commitCriticalExceptionRT(null,
              WXErrorCode.WX_KEY_EXCEPTION_SDK_INIT_CPU_NOT_SUPPORT,
              "unZipSelectedFiles", "[WX_KEY_EXCEPTION_SDK_INIT_unZipSelectedFiles] " +
                      "\n Detail msg is: " + e.getMessage(),
              null);

    } finally {

      if (zf != null) {
        zf.close();
        zf = null;
      }
    }
    return false;
  }

  /**
   * Using {@Code WXExceptionUtils.commitCriticalExceptionRT}  insted
   */
//  static void commit(IWXUserTrackAdapter utAdapter, String errCode, String errMsg) {
//    if (mStatisticsListener != null) {
//      mStatisticsListener.onException("0", errCode, errMsg);
//    }
//
//    if (utAdapter == null) {
//      return;
//    }
//    if (errCode != null && errMsg != null) {
//      WXPerformance p = new WXPerformance();
//      p.errCode = errCode;
//      p.errMsg = errMsg;
//      utAdapter.commit(null, null, WXEnvironment.ENVIRONMENT, p, null);
//    } else {
//      utAdapter.commit(null, null, WXEnvironment.ENVIRONMENT, null, null);
//
//    }
//  }

}
