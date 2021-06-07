/**
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
package org.apache.weex.update;

import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.text.TextUtils;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.TextView;
import com.taobao.weex.WXEnvironment;
import com.taobao.weex.WXSDKManager;
import com.taobao.weex.adapter.IWXHttpAdapter;
import com.taobao.weex.common.WXRequest;
import com.taobao.weex.common.WXResponse;
import com.taobao.weex.utils.WXLogUtils;
import java.net.URL;
import java.util.List;
import java.util.Map;
import org.apache.weex.R;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by moxun on 2018/3/9.
 */

public class CheckForUpdateUtil {
  public static void checkForUpdate(final Context context) {
    PackageManager pm = context.getPackageManager();
    try {
      PackageInfo info = pm.getPackageInfo(context.getPackageName(), 0);
      if (info != null) {
        int versionCode = info.versionCode;
        String updateUrl = "http://dotwe.org/release/latest?v=" + versionCode;
        WXRequest request = new WXRequest();
        request.method = "GET";
        request.url = updateUrl;
        WXLogUtils.d("Update", "check for update: " + versionCode);
        WXSDKManager.getInstance().getIWXHttpAdapter().sendRequest(request, new IWXHttpAdapter.OnHttpListener() {
          @Override
          public void onHttpStart() {

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
          public void onHttpFinish(final WXResponse response) {
            if (!response.statusCode.equals("200")) {
              WXLogUtils.e("Update", "failed: " + response.statusCode);
              return;
            }
            WXSDKManager.getInstance().getWXRenderManager().postOnUiThread(new Runnable() {
              @Override
              public void run() {
                String s = new String(response.originalData);
                if (!TextUtils.isEmpty(s)) {
                  try {
                    WXLogUtils.d("Update", s);
                    JSONObject object = new JSONObject(s);
                    JSONObject params = object.optJSONObject("params");
                    if (params != null) {
                      boolean hasUpdate = params.optBoolean("hasUpdate", false);
                      if (hasUpdate) {
                        String version = params.optString("version", "latest");
                        String updateDate = params.optString("updateDate", "");
                        final String updateUrl = params.optString("updateUrl", "");

                        try {
                          new URL(updateUrl);
                        } catch (Throwable t) {
                          WXLogUtils.e("Update", "Invalid update url");
                          return;
                        }

                        String updateDescription = params.optString("updateDescription", null);

                        AlertDialog.Builder builder = new AlertDialog.Builder(context);

                        View view = LayoutInflater.from(context).inflate(R.layout.common_update_notify_dialog, null);
                        TextView textView = (TextView) view.findViewById(R.id.common_update_dialog_msg);
                        textView.setText(getMsg(version, updateDate, updateDescription));
                        builder.setCancelable(false)
                            .setView(view)
                            .setPositiveButton(R.string.update_now, new DialogInterface.OnClickListener() {
                              @Override
                              public void onClick(DialogInterface dialog, int which) {
                                UpdateService.startActionUpdate(context, updateUrl);
                                dialog.dismiss();
                              }
                            });

                        builder.setNegativeButton(R.string.update_remind_later, new DialogInterface.OnClickListener() {
                          @Override
                          public void onClick(DialogInterface dialog, int which) {
                            dialog.dismiss();
                          }
                        });

                        builder.create().show();
                      }
                    }
                  } catch (JSONException e) {
                    e.printStackTrace();
                  }
                }
              }
            }, 0);
          }
        });
      }
    } catch (PackageManager.NameNotFoundException e) {
      e.printStackTrace();
    }
  }

  private static String getMsg(String v, String date, String desc) {
    StringBuilder sb = new StringBuilder();
    sb.append(getStringRes(R.string.update_version)).append(v).append("\n")
        .append(getStringRes(R.string.update_date)).append(date).append("\n")
        .append(getStringRes(R.string.update_desc)).append(desc);
    return sb.toString();
  }

  public static String getStringRes(int id) {
    if (WXEnvironment.getApplication() != null) {
      return WXEnvironment.getApplication().getString(id);
    }
    return "";
  }
}
