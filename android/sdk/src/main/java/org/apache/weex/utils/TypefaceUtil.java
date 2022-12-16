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

import android.content.Intent;
import android.graphics.Paint;
import android.graphics.Typeface;
import android.net.Uri;
import android.support.v4.content.LocalBroadcastManager;
import android.text.TextUtils;

import org.apache.weex.WXEnvironment;
import org.apache.weex.WXSDKManager;
import org.apache.weex.adapter.IWXHttpAdapter;
import org.apache.weex.common.WXRequest;
import org.apache.weex.common.WXResponse;
import org.apache.weex.dom.WXStyle;
import org.apache.weex.font.FontAdapter;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by sospartan on 7/13/16.
 */
public class TypefaceUtil {
  public static final String FONT_CACHE_DIR_NAME = "font-family";
  private final static String TAG = "TypefaceUtil";
  private final static Map<String, FontDO> sCacheMap = new HashMap<>(); //Key: fontFamilyName

  public static final String ACTION_TYPE_FACE_AVAILABLE = "type_face_available";

  public static void putFontDO(FontDO fontDO) {
    if (fontDO != null && !TextUtils.isEmpty(fontDO.getFontFamilyName())) {
      sCacheMap.put(fontDO.getFontFamilyName(), fontDO);
    }
  }

  public static void registerNativeFont(Map<String, Typeface> fonts) {
    if (fonts != null && fonts.size() > 0) {
      for (Map.Entry<String, Typeface> font : fonts.entrySet()) {
        FontDO fontDO = new FontDO(font.getKey(), font.getValue());
        putFontDO(fontDO);
        if (WXEnvironment.isApkDebugable()){
          WXLogUtils.d("TypefaceUtil", "register new typeface: " + font.getKey());
        }
      }
    }
  }

  public static FontDO getFontDO(String fontFamilyName) {
    return sCacheMap.get(fontFamilyName);
  }

  public static void removeFontDO(String fontFamilyName) {
    sCacheMap.remove(fontFamilyName);
  }

  public static void applyFontStyle(Paint paint, int style, int weight, String family) {
    int oldStyle;
    Typeface typeface = paint.getTypeface();
    if (typeface == null) {
      oldStyle = 0;
    } else {
      oldStyle = typeface.getStyle();
    }

    int want = 0;
    if ((weight == Typeface.BOLD)
            || ((oldStyle & Typeface.BOLD) != 0 && weight == WXStyle.UNSET)) {
      want |= Typeface.BOLD;
    }

    if ((style == Typeface.ITALIC)
            || ((oldStyle & Typeface.ITALIC) != 0 && style == WXStyle.UNSET)) {
      want |= Typeface.ITALIC;
    }

    if (family != null) {
      typeface = getOrCreateTypeface(family, want);
    }

    if (typeface != null) {
      paint.setTypeface(Typeface.create(typeface, want));
    } else {
      paint.setTypeface(Typeface.defaultFromStyle(want));
    }
  }

  public static Typeface getOrCreateTypeface(String family, int style) {
    FontDO fontDo = sCacheMap.get(family);
    if (fontDo != null && fontDo.getTypeface() != null) {
      return fontDo.getTypeface();
    }

    return Typeface.create(family, style);
  }

  private static void loadFromAsset(FontDO fontDo,String path){
    try {
      Typeface typeface = Typeface.createFromAsset(WXEnvironment.getApplication().getAssets(), path);
      if (typeface != null) {
        if(WXEnvironment.isApkDebugable()) {
          WXLogUtils.d(TAG, "load asset file success");
        }
        fontDo.setState(FontDO.STATE_SUCCESS);
        fontDo.setTypeface(typeface);
      } else {
        WXLogUtils.e(TAG, "Font asset file not found " + fontDo.getUrl());
      }
    } catch (Exception e) {
      WXLogUtils.e(TAG, e.toString());
    }
  }

  public static void loadTypeface(final FontDO fontDo, boolean notify) {
    if (fontDo != null && fontDo.getTypeface() == null &&
            (fontDo.getState() == FontDO.STATE_FAILED || fontDo.getState() == FontDO.STATE_INIT)) {
      fontDo.setState(FontDO.STATE_LOADING);
      if (fontDo.getType() == FontDO.TYPE_LOCAL) {
        Uri uri = Uri.parse(fontDo.getUrl());
        loadFromAsset(fontDo,uri.getPath().substring(1));//exclude slash
      } else if (fontDo.getType() == FontDO.TYPE_NETWORK) {
        final String url = fontDo.getUrl();
        final String fontFamily = fontDo.getFontFamilyName();
        final String fileName = WXFileUtils.md5(url);
        //url.replace('/', '_').replace(':', '_');
        File dir = new File(getFontCacheDir());
        if(!dir.exists()){
          dir.mkdirs();
        }
        final String fullPath;
        try {
          fullPath = dir.getCanonicalPath()+ File.separator +fileName;
          if (!loadLocalFontFile(fullPath, fontFamily, false)) {
            downloadFontByNetwork(url, fullPath, fontFamily);
          }
        } catch (IOException e) {
          e.printStackTrace();
        }
      } else if (fontDo.getType() == FontDO.TYPE_FILE || fontDo.getType() == FontDO.TYPE_BASE64) {
        boolean result = loadLocalFontFile(fontDo.getUrl(), fontDo.getFontFamilyName(), false);
        if (!result) {
          fontDo.setState(FontDO.STATE_FAILED);
        }
      }
      return;
    }
    if(notify){
         notifyFontAvailable(false, fontDo);
    }
  }

  private static void downloadFontByNetwork(final String url, final String fullPath, final String fontFamily) {
    IWXHttpAdapter adapter = WXSDKManager.getInstance().getIWXHttpAdapter();
    if (adapter == null) {
      WXLogUtils.e(TAG, "downloadFontByNetwork() IWXHttpAdapter == null");
      return;
    }
    WXRequest request = new WXRequest();
    request.url = url;
    request.method = "GET";
    adapter.sendRequest(request, new IWXHttpAdapter.OnHttpListener() {
      @Override
      public void onHttpStart() {
        if(WXEnvironment.isApkDebugable()) {
          WXLogUtils.d(TAG, "downloadFontByNetwork begin url:" + url);
        }
      }

      @Override
      public void onHeadersReceived(int statusCode, Map<String, List<String>> headers) {

      }

      @Override
      public void onHttpUploadProgress(int uploadProgress) {

      }

      @Override
      public void onHttpResponseProgress(int loadedLength) {

      }

      @Override
      public void onHttpFinish(WXResponse response) {
        int statusCode = 0;
        if (!TextUtils.isEmpty(response.statusCode)) {
          try {
            statusCode = Integer.parseInt(response.statusCode);
          } catch (NumberFormatException e) {
            statusCode = 0;
            WXLogUtils.e(TAG, "IWXHttpAdapter onHttpFinish statusCode:" + response.statusCode);
          }
        }
        boolean result;
        if (statusCode >= 200 && statusCode <= 299 && response.originalData != null) {
          result = WXFileUtils.saveFile(fullPath, response.originalData, WXEnvironment.getApplication());
          if (result) {
            result = loadLocalFontFile(fullPath, fontFamily, true);
          } else {
            if(WXEnvironment.isApkDebugable()) {
              WXLogUtils.d(TAG, "downloadFontByNetwork() onHttpFinish success, but save file failed.");
            }
          }
        } else {
          result = false;
        }

        if (!result) {
          FontDO fontDO = sCacheMap.get(fontFamily);
          if (fontDO != null) {
            fontDO.setState(FontDO.STATE_FAILED);
          }
        }
      }
    });
  }

  private static boolean loadLocalFontFile(final String path, final String fontFamily, boolean hasNetworkDowload) {
    if (TextUtils.isEmpty(path) || TextUtils.isEmpty(fontFamily)) {
      return false;
    }
    try {
      File file = new File(path);
      if (!file.exists()) {
        return false;
      }
      Typeface typeface = Typeface.createFromFile(path);
      if (typeface != null) {
        final FontDO fontDo = sCacheMap.get(fontFamily);
        if (fontDo != null) {
          fontDo.setState(FontDO.STATE_SUCCESS);
          fontDo.setTypeface(typeface);
          fontDo.setFilePath(path);
          if(WXEnvironment.isApkDebugable()) {
            WXLogUtils.d(TAG, "load local font file success");
          }

          if(hasNetworkDowload) {
            /**
             * wxtext may be measured when font not load, when register broadcast receiver,
             * this broadcast has been send, which cause textview not rendered right.
             * delay broadcast ensure text will render right
             * */
            WXSDKManager.getInstance().getWXRenderManager().postOnUiThread(new Runnable() {
              @Override
              public void run() {
               notifyFontAvailable(true, fontDo);
              }
            }, 100);
          }else{
             notifyFontAvailable(true, fontDo);
          }
          return true;
        }
      } else {
        WXLogUtils.e(TAG, "load local font file failed, can't create font.");
      }
    } catch (Exception e) {
      WXLogUtils.e(TAG, e.toString());
    }
    return false;
  }

  private static void notifyFontAvailable(boolean sendBroadcast, FontDO fontDO){
    if(sendBroadcast){
      Intent intent = new Intent(ACTION_TYPE_FACE_AVAILABLE);
      intent.putExtra("fontFamily", fontDO.getFontFamilyName());
      intent.putExtra("filePath", fontDO.getFilePath());
      intent.putExtra("fontUrl", fontDO.getUrl());
      LocalBroadcastManager.getInstance(WXEnvironment.getApplication()).sendBroadcast(intent);
    }
    FontAdapter fontAdapter = WXSDKManager.getInstance().getFontAdapter();
    if(fontAdapter != null){
        fontAdapter.onFontLoad(fontDO.getFontFamilyName(), fontDO.getUrl(), fontDO.getFilePath());
    }
  }

  private static String getFontCacheDir() {
    return WXEnvironment.getApplication().getCacheDir() + "/" + FONT_CACHE_DIR_NAME;
  }
}
