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
package org.apache.weex.extend.module;

import android.Manifest;
import android.app.Activity;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.text.TextUtils;
import android.widget.Toast;

import org.apache.weex.CustomCaptureActivity;
import org.apache.weex.WXPageActivity;
import com.google.zxing.integration.android.IntentIntegrator;
import com.taobao.weex.annotation.JSMethod;
import com.taobao.weex.bridge.JSCallback;
import com.taobao.weex.common.WXModule;

import java.util.HashMap;
import java.util.Map;


public class WXEventModule extends WXModule {

  private static final String WEEX_CATEGORY = "com.taobao.android.intent.category.WEEX";
  private static final String WEEX_ACTION = "com.taobao.android.intent.action.WEEX";

  private static final int CAMERA_PERMISSION_REQUEST_CODE = 0x9;


  @JSMethod(uiThread = true)
  public void openURL(String url) {
    if (TextUtils.isEmpty(url)) {
      return;
    }
    String scheme = Uri.parse(url).getScheme();
    StringBuilder builder = new StringBuilder();

    if ("weex://go/scan".equals(url)) {
      if (ContextCompat.checkSelfPermission(mWXSDKInstance.getContext(), Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED) {
        if (ActivityCompat.shouldShowRequestPermissionRationale((Activity) mWXSDKInstance.getContext(), Manifest.permission.CAMERA)) {
          showCameraPermissionRationale();
        } else{
          ActivityCompat.requestPermissions((Activity) mWXSDKInstance.getContext(), new String[]{Manifest.permission.CAMERA}, CAMERA_PERMISSION_REQUEST_CODE);
        }
      } else {
        new IntentIntegrator((Activity) mWXSDKInstance.getContext()).setDesiredBarcodeFormats(IntentIntegrator.QR_CODE)
                .setBeepEnabled(false).setCaptureActivity(CustomCaptureActivity.class)
                .initiateScan();
 //       mWXSDKInstance.getContext().startActivity(new Intent(mWXSDKInstance.getContext(), CaptureActivity.class));
      }
      return;
    }

    if (TextUtils.equals("http", scheme) || TextUtils.equals("https", scheme) || TextUtils.equals("file", scheme)) {
      builder.append(url);
    } else {
      builder.append("http:");
      builder.append(url);
    }

    Uri uri = Uri.parse(builder.toString());
    Intent intent = new Intent(mWXSDKInstance.getContext(),WXPageActivity.class);
    intent.setAction(WEEX_ACTION);
    intent.setData(uri);
    intent.addCategory(WEEX_CATEGORY);
    mWXSDKInstance.getContext().startActivity(intent);

    if (mWXSDKInstance.checkModuleEventRegistered("event", this)) {
      HashMap<String,Object> params=new HashMap<>();
      params.put("param1","param1");
      params.put("param2","param2");
      params.put("param3","param3");
      mWXSDKInstance.fireModuleEvent("event", this, params);
    }
  }

  private void showCameraPermissionRationale() {
    if (mWXSDKInstance.getContext() instanceof AppCompatActivity) {
      AlertDialog.Builder builder = new AlertDialog.Builder(((AppCompatActivity) mWXSDKInstance.getContext()));
      builder.setMessage("Weex playground need the camera permission to scan QR code");
      builder.setPositiveButton(android.R.string.ok, new DialogInterface.OnClickListener() {
        @Override
        public void onClick(DialogInterface dialog, int which) {
          ActivityCompat.requestPermissions((Activity) mWXSDKInstance.getContext(), new String[]{Manifest.permission.CAMERA}, CAMERA_PERMISSION_REQUEST_CODE);
        }
      });
      builder.create().show();
    }
  }

  /*
   * a test method for macaca case, you can fire globalEvent when download finish、device shaked and so on.
   * @param event event name
  * */
  @JSMethod(uiThread = true)
  public void fireNativeGlobalEvent(String event, JSCallback callback) {
    Map<String,Object> params=new HashMap<String,Object>();
    params.put("eventParam","value");

    mWXSDKInstance.fireGlobalEventCallback(event, params);
    if (null != callback) {
      Map<String, Boolean> result = new HashMap<String, Boolean>();
      result.put("ok",true);
      callback.invoke(result);
    }
  }

  @Override
  public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
      super.onRequestPermissionsResult(requestCode, permissions, grantResults);
      if (requestCode == CAMERA_PERMISSION_REQUEST_CODE) {
          if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
            new IntentIntegrator((Activity) mWXSDKInstance.getContext()).setDesiredBarcodeFormats(IntentIntegrator.QR_CODE)
                    .setBeepEnabled(false).setCaptureActivity(CustomCaptureActivity.class)
                    .initiateScan();
 //             mWXSDKInstance.getContext().startActivity(new Intent(mWXSDKInstance.getContext(), CaptureActivity.class));
          } else {
              Toast.makeText(mWXSDKInstance.getContext(), "request camara permission fail!", Toast.LENGTH_SHORT).show();
          }
      }
  }

}
