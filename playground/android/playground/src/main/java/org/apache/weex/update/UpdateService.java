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

import android.app.IntentService;
import android.app.Notification;
import android.app.NotificationManager;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.support.v4.content.FileProvider;
import android.support.v4.app.NotificationCompat;
import android.widget.Toast;
import com.taobao.weex.WXEnvironment;
import com.taobao.weex.WXSDKManager;
import com.taobao.weex.utils.WXLogUtils;
import java.io.File;
import org.apache.weex.R;
import org.apache.weex.BuildConfig;

public class UpdateService extends IntentService {

  private static final String ACTION_UPDATE = "com.taobao.weex.service.action.UPDATE";
  private static final String EXTRA_URL = "com.taobao.weex.service.extra.URL";
  private final int NOTIFY_ID = 10006024;

  private NotificationManager manager;
  private NotificationCompat.Builder builder;

  public static void startActionUpdate(Context context, String url) {
    Intent intent = new Intent(context, UpdateService.class);
    intent.setAction(ACTION_UPDATE);
    intent.putExtra(EXTRA_URL, url);
    context.startService(intent);
  }

  public UpdateService() {
    super("UpdateService");
  }

  @Override
  protected void onHandleIntent(Intent intent) {
    if (intent != null) {
      final String action = intent.getAction();
      if (ACTION_UPDATE.equals(action)) {
        final String url = intent.getStringExtra(EXTRA_URL);
        handleActionUpdate(url);
      }
    }
  }

  private void handleActionUpdate(String url) {
    manager = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
    builder = new NotificationCompat.Builder(this);
    builder.setContentTitle(CheckForUpdateUtil.getStringRes(R.string.update_downloading))
        .setContentText(CheckForUpdateUtil.getStringRes(R.string.update_progress) + " 0%")
        .setTicker(CheckForUpdateUtil.getStringRes(R.string.update_downloading))
        .setWhen(System.currentTimeMillis())
        .setPriority(Notification.PRIORITY_DEFAULT)
        .setSmallIcon(R.mipmap.ic_launcher)
        .setProgress(100, 0, false);
    manager.notify(NOTIFY_ID, builder.build());

    WXLogUtils.e("Update", "start download");
    Downloader.download(url, new Downloader.DownloadCallback(getCacheDir().getAbsolutePath(), "playground.apk") {

      @Override
      public void onProgress(float progress) {
        if (progress * 100 - progress >= 1) {
          int p = (int) (progress * 100);
          builder.setContentText(CheckForUpdateUtil.getStringRes(R.string.update_progress) + p + "%");
          builder.setProgress(100, p, false);
          manager.notify(NOTIFY_ID, builder.build());
          WXLogUtils.d("Update", "progress:" + p);
        }
      }

      @Override
      public void onResponse(File file) {
        WXLogUtils.d("Update", "success: " + file.getAbsolutePath());
        manager.cancel(NOTIFY_ID);
        Uri uri = Uri.fromFile(file);
        Intent installIntent = new Intent(Intent.ACTION_VIEW);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
          installIntent.setFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
          Uri contentUri = FileProvider.getUriForFile(WXEnvironment.getApplication(), BuildConfig.APPLICATION_ID + ".fileprovider", file);
          installIntent.setDataAndType(contentUri, "application/vnd.android.package-archive");
        } else {
          installIntent.setDataAndType(uri, "application/vnd.android.package-archive");
          installIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        }
        startActivity(installIntent);
      }

      @Override
      public void onError(final Exception e) {
        WXSDKManager.getInstance().getWXRenderManager().postOnUiThread(new Runnable() {
          @Override
          public void run() {
            Toast.makeText(UpdateService.this, "Failed to update:" + e.getMessage(), Toast.LENGTH_SHORT).show();
          }
        }, 0);
      }
    });
  }
}
