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
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.net.Uri;
import android.os.Environment;
import android.os.Handler;
import android.os.Looper;
import android.provider.MediaStore;
import android.support.annotation.ColorInt;
import android.view.View;

import org.apache.weex.WXSDKManager;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

/**
 * Created by miomin on 7/25/17.
 */
public class WXViewToImageUtil {

    public static int mBackgroundColor = Color.TRANSPARENT;

    /**
     * Generate image and return path via callback
     */
    public static void generateImage(final View imageView, final int width,
                                     @ColorInt final int backgroundColor, final OnImageSavedCallback mOnImageSavedCallback) {

        mBackgroundColor = backgroundColor;

        // Only one save image task occurs at the same time
        WXSDKManager.getInstance().getWXWorkThreadManager().post(new Thread(new Runnable() {
            @Override
            public void run() {
                // Generate bitmap from ImageView
                Bitmap bitmap = getBitmapFromImageView(imageView, width);

                if (bitmap == null) {
                    if (mOnImageSavedCallback != null) {
                        mOnImageSavedCallback.onSaveFailed("Image is empty");
                    }
                    return;
                }

                // Sava bitmap to gallery
                final String destPath = saveBitmapToGallery(imageView.getContext(), bitmap, mOnImageSavedCallback);

                new Handler(Looper.getMainLooper()).post(new Runnable() {
                    @Override
                    public void run() {
                        if (mOnImageSavedCallback != null) {
                            mOnImageSavedCallback.onSaveSucceed(destPath);
                            imageView.getContext().sendBroadcast(new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE, Uri.parse(destPath)));
                        }
                    }
                });
            }
        }));
    }

    /**
     * Save bitmap to gallery
     * @return image save path
     */
    public static String saveBitmapToGallery(Context context, Bitmap bitmap, final OnImageSavedCallback mOnImageSavedCallback) {

        // Save image
        File appDir = new File(Environment.getExternalStorageDirectory(), "Weex");
        if (!appDir.exists()) {
            appDir.mkdir();
        }

        String fileName = System.currentTimeMillis() + ".jpg";
        File file = new File(appDir, fileName);

        try {
            FileOutputStream fos = new FileOutputStream(file);
            bitmap.compress(Bitmap.CompressFormat.JPEG, 100, fos);
            fos.flush();
            fos.close();
        } catch (FileNotFoundException e) {
            if (mOnImageSavedCallback != null)
                mOnImageSavedCallback.onSaveFailed("Image creation failed due to system reason");
            e.printStackTrace();
        } catch (IOException e) {
            if (mOnImageSavedCallback != null)
                mOnImageSavedCallback.onSaveFailed("Android IOException");
            e.printStackTrace();
        }

        // Insert the image file into the system gallery
        try {
            MediaStore.Images.Media.insertImage(context.getContentResolver(),
                    file.getCanonicalPath(), fileName, null);
        } catch (Exception e) {
            e.printStackTrace();
        }

        // Notify the system gallery update
        try {
            context.sendBroadcast(new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE, Uri.parse("file://" + appDir.getCanonicalPath() + "/" + fileName)));
        } catch (IOException e) {
            e.printStackTrace();
        }

        try {
            return file.getCanonicalPath();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "";
    }

    /**
     * Save state callback
     */
    public interface OnImageSavedCallback {
        void onSaveSucceed(String path);
        void onSaveFailed(String errorDesc);
    }

    /**
     * Get bitmap from imageview
     */
    public static Bitmap getBitmapFromImageView(final View view, int width) {
        if (view.getWidth() <= 0 || view.getHeight() <= 0) {
            view.measure(View.MeasureSpec.makeMeasureSpec(width, View.MeasureSpec.EXACTLY),
                    View.MeasureSpec.makeMeasureSpec(0, View.MeasureSpec.UNSPECIFIED));
            view.layout(0, 0, view.getMeasuredWidth(), view.getMeasuredHeight());
        }

        view.setDrawingCacheEnabled(true);
        Bitmap bitmap = view.getDrawingCache();
        return bitmap;
    }
}
