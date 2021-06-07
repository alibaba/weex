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

import com.squareup.okhttp.Callback;
import com.squareup.okhttp.OkHttpClient;
import com.squareup.okhttp.Request;
import com.squareup.okhttp.Response;
import com.taobao.weex.WXSDKManager;
import com.taobao.weex.utils.WXLogUtils;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

/**
 * Created by moxun on 2018/3/9.
 */

public class Downloader {

  public static void download(String url, final DownloadCallback callback) {
    OkHttpClient client = new OkHttpClient();
    Request request = new Request.Builder()
        .url(url)
        .get()
        .build();

    client.newCall(request).enqueue(new Callback() {
      @Override
      public void onFailure(Request request, IOException e) {
        callback.onError(e);
      }

      @Override
      public void onResponse(Response response) throws IOException {
        callback.handleResponse(response);
      }
    });
  }

  public abstract static class DownloadCallback {
    private String destDirPath;
    private String destFileName;

    public abstract void onProgress(float progress);

    public abstract void onResponse(File file);

    public abstract void onError(Exception e);

    public DownloadCallback(String destDirPath, String destFileName) {
      this.destDirPath = destDirPath;
      this.destFileName = destFileName;
    }

    private void handleResponse(Response response) throws IOException {
      final File file = saveToFile(response);
      if (file != null && file.exists() && file.length() > 0) {
        runOnUiThread(new Runnable() {
          @Override
          public void run() {
            onResponse(file);
          }
        });
      } else {
        onError(new RuntimeException("Failed to save file"));
      }
    }

    private File saveToFile(Response response) throws IOException {
      InputStream is = null;
      byte[] buf = new byte[40960];
      int len = 0;
      FileOutputStream fos = null;
      try {
        is = response.body().byteStream();
        final long total = response.body().contentLength();
        long sum = 0;

        WXLogUtils.e(total + "");

        File dir = new File(destDirPath);
        if (!dir.exists()) {
          dir.mkdirs();
        }
        File file = new File(dir, destFileName);
        fos = new FileOutputStream(file);
        while ((len = is.read(buf)) != -1) {
          sum += len;
          fos.write(buf, 0, len);
          final long finalSum = sum;

          runOnUiThread(new Runnable() {
            @Override
            public void run() {
              onProgress(finalSum * 1.0f / total);
            }
          });
        }
        fos.flush();
        return file;
      } finally {
        if (is != null) is.close();
        if (fos != null) fos.close();
      }
    }

    private void runOnUiThread(Runnable task) {
      WXSDKManager.getInstance().getWXRenderManager().postOnUiThread(task, 0);
    }
  }
}
