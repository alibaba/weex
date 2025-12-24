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

import android.content.Context;
import android.text.TextUtils;
import android.util.Base64;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.Closeable;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Locale;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;
import java.util.zip.ZipInputStream;
import org.apache.weex.WXEnvironment;

import static org.apache.weex.utils.WXSoInstallMgrSdk._cpuType;

public class WXFileUtils {

  /**
   * Load file in device directory, if not exist, load from asset directory.
   * @param path FilePath
   * @param context Weex Context
   * @return the Content of the file
   */
  public static String loadFileOrAsset(String path, Context context) {
    if (!TextUtils.isEmpty(path)) {
      File file = new File(path);
      if (file.exists()) {
        try {
          FileInputStream fis = new FileInputStream(file);
          return readStreamToString(fis);
        } catch (FileNotFoundException e) {
          e.printStackTrace();
        }
      } else {
        return loadAsset(path, context);
      }
    }
    return "";
  }

  /**
   * Load file in asset directory.
   * @param path FilePath
   * @param context Weex Context
   * @return the Content of the file
   */
  public static String loadAsset(String path, Context context) {
    if (context == null || TextUtils.isEmpty(path)) {
      return null;
    }
    InputStream inputStream = null;
    try {
      inputStream = context.getAssets().open(path);
      return readStreamToString(inputStream);
    } catch (IOException e) {
      e.printStackTrace();
    }
    return "";
  }

  public static String readStreamToString(InputStream inputStream) {
    BufferedReader bufferedReader = null;
    try {
      StringBuilder builder = new StringBuilder(inputStream.available() + 10);
      bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
      char[] data = new char[4096];
      int len = -1;
      while ((len = bufferedReader.read(data)) > 0) {
        builder.append(data, 0, len);
      }

      return builder.toString();
    } catch (IOException e) {
      e.printStackTrace();
      WXLogUtils.e("", e);
    } finally {
      try {
        if (bufferedReader != null)
          bufferedReader.close();
      } catch (IOException e) {
        WXLogUtils.e("WXFileUtils loadAsset: ", e);
      }
      try {
        if (inputStream != null)
          inputStream.close();
      } catch (IOException e) {
        WXLogUtils.e("WXFileUtils loadAsset: ", e);
      }
    }

    return "";
  }

  public static byte[] readBytesFromAssets(String path, Context context) {
    if (context == null || TextUtils.isEmpty(path)) {
      return null;
    }
    InputStream inputStream = null;
    try {
      inputStream = context.getAssets().open(path);
      byte[] data = new byte[4096];
      int length = inputStream.read(data);
      byte[] result = new byte[length];
      System.arraycopy(data, 0, result, 0, length);
      return result;
    } catch (IOException e) {
      e.printStackTrace();
    }
    return null;
  }

  public static boolean saveFile(String path, byte[] content, Context context) {
    if (TextUtils.isEmpty(path) || content == null || context == null) {
      return false;
    }
    FileOutputStream outStream = null;
    try {
      outStream = new FileOutputStream(path);
      outStream.write(content);
      return true;
    } catch (Exception e) {
      WXLogUtils.e("WXFileUtils saveFile: " + WXLogUtils.getStackTrace(e));
    } finally {
      if (outStream != null) {
        try {
          outStream.close();
        } catch (IOException e) {
          e.printStackTrace();
        }
      }
    }
    return false;
  }

  public static String md5(String  template){
    try {
      if(template == null){
        return  "";
      }
      return  md5(template.getBytes("UTF-8"));
    } catch (UnsupportedEncodingException e) {
      return  "";
    }
  }

  public static String md5(byte[] bts){
    try {
      MessageDigest digest = MessageDigest.getInstance("MD5");
      digest.update(bts);
      BigInteger bigInt = new BigInteger(1, digest.digest());
      return  bigInt.toString(16);
    } catch (NoSuchAlgorithmException e) {;
      return  "";
    }
  }

  public static String base64Md5(String  template){
    try {
      if(template == null){
        return  "";
      }
      return  base64Md5(template.getBytes("UTF-8"));
    } catch (UnsupportedEncodingException e) {
      return  "";
    }
  }

  public static String base64Md5(byte[] bts){
    try {
      MessageDigest digest = MessageDigest.getInstance("MD5");
      digest.update(bts);
      return Base64.encodeToString(digest.digest(), Base64.NO_WRAP);
    } catch (NoSuchAlgorithmException e) {;
      return  "";
    }
  }

  public static void extractSo(String apkFile, String path) throws IOException {
    ZipFile zip = new ZipFile(apkFile);
    InputStream zipInputStream = new BufferedInputStream(new FileInputStream(apkFile));
    ZipInputStream zin = new ZipInputStream(zipInputStream);
    ZipEntry zipEntry;
    while ((zipEntry = zin.getNextEntry()) != null) {
      if(zipEntry.isDirectory()){
        continue;
      }
      if(zipEntry.getName().contains("lib/" + _cpuType() + "/") &&
              (zipEntry.getName().contains("weex") || zipEntry.getName().equals(
                  String.format(Locale.ENGLISH, "lib%s.so", WXEnvironment.CORE_JSC_SO_NAME)))){
        String[] fileNames = zipEntry.getName().split("/");
        String fileName = fileNames[fileNames.length - 1];
        InputStream inputStream = zip.getInputStream(zipEntry);
        byte[] data = new byte[1024];
        File zipFile = new File(path + "/" + fileName);
        if(zipFile.exists()) {
          zipFile.delete();
        }

        zipFile.createNewFile();

        FileOutputStream outputStream =new FileOutputStream(zipFile);
        while (inputStream.read(data) != -1) {
          outputStream.write(data);
        }
        outputStream.close();

      }
    }
    zin.closeEntry();
  }

  public static void copyFile(File oldFile, File newFile) {
    FileInputStream inputStream = null;
    FileOutputStream outputStream = null;
    try {
      inputStream = new FileInputStream(oldFile);
      byte[] data = new byte[1024];
      outputStream = new FileOutputStream(newFile);
      while (inputStream.read(data) != -1) {
        outputStream.write(data);
      }
      inputStream.close();
      outputStream.close();
    } catch (Exception e) {
      try {
        WXLogUtils.e("copyFile " + e.getMessage() + ": " + oldFile.getCanonicalPath() + ": " + newFile.getCanonicalPath());
      } catch (IOException ioException) {
        ioException.printStackTrace();
      }
      if (inputStream != null) {
        try {
          inputStream.close();
        } catch (IOException e1) {
          e1.printStackTrace();
        }
      }

      if (outputStream != null) {
        try {
          outputStream.close();
        } catch (IOException e1) {
          e1.printStackTrace();
        }
      }
    }
  }

  public static void copyFileWithException(File oldFile,File newFile ) throws Exception{
    FileInputStream inputStream = null;
    FileOutputStream outputStream = null;
    try {
      inputStream = new FileInputStream(oldFile);
      byte[] data = new byte[1024];
      outputStream = new FileOutputStream(newFile);
      while (inputStream.read(data) != -1) {
        outputStream.write(data);
      }
    }catch (Exception e){
      throw e;
    }finally {
      closeIo(inputStream);
      closeIo(outputStream);
    }
  }

  public static void closeIo(Closeable c){
    if (null == c){
      return;
    }
    try {
      c.close();
    }catch (Throwable e){
      e.printStackTrace();
    }
  }

}
