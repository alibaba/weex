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
package org.apache.weex.commons.adapter;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.ColorFilter;
import android.graphics.PixelFormat;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;
import android.view.Gravity;

import com.squareup.picasso.Picasso;
import com.squareup.picasso.Target;
import com.taobao.weex.WXSDKManager;
import com.taobao.weex.adapter.DrawableStrategy;
import com.taobao.weex.adapter.IDrawableLoader;

public class PicassoBasedDrawableLoader implements IDrawableLoader {

  private Context mContext;

  public PicassoBasedDrawableLoader(Context context) {
    mContext = context;
  }

  @Override
  public void setDrawable(final String url,
                          final DrawableTarget drawableTarget,
                          final DrawableStrategy drawableStrategy) {
    WXSDKManager.getInstance().postOnUiThread(new Runnable() {
      @Override
      public void run() {
        String temp = url;
        if (url.startsWith("//")) {
          temp = "http:" + url;
        }

        /** This is a hack for picasso, as Picasso hold weakReference to Target.
         * http://stackoverflow.com/questions/24180805/onbitmaploaded-of-target-object-not-called-on-first-load
         */
        class PlaceHolderDrawableTarget extends Drawable implements Target {

          @Override
          public void onBitmapLoaded(Bitmap bitmap, Picasso.LoadedFrom from) {
            BitmapDrawable bitmapDrawable = new BitmapDrawable(mContext.getResources(), bitmap);
            bitmapDrawable.setGravity(Gravity.FILL);
            drawableTarget.setDrawable(bitmapDrawable, true);
          }

          @Override
          public void onBitmapFailed(Drawable errorDrawable) {

          }

          @Override
          public void onPrepareLoad(Drawable placeHolderDrawable) {
            drawableTarget.setDrawable(this, true);
          }

          @Override
          public void draw(Canvas canvas) {

          }

          @Override
          public void setAlpha(int alpha) {

          }

          @Override
          public void setColorFilter(ColorFilter colorFilter) {

          }

          @Override
          public int getOpacity() {
            return PixelFormat.UNKNOWN;
          }
        }
        Picasso.
                with(mContext).
                load(temp).
                resize(drawableStrategy.width, drawableStrategy.height).
                onlyScaleDown().
                into(new PlaceHolderDrawableTarget());
      }
    }, 0);

  }
}
