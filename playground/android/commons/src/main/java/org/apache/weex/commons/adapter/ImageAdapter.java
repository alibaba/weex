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
package org.apache.weex.commons.adapter;

import android.net.Uri;
import android.os.Looper;
import android.text.TextUtils;
import android.widget.ImageView;

import com.squareup.picasso.Callback;
import com.squareup.picasso.Picasso;
import com.taobao.weex.WXEnvironment;
import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.WXSDKManager;
import com.taobao.weex.adapter.IWXImgLoaderAdapter;
import com.taobao.weex.common.WXImageStrategy;
import com.taobao.weex.dom.WXImageQuality;

public class ImageAdapter implements IWXImgLoaderAdapter {

  public ImageAdapter() {
  }

  @Override
  public void setImage(final String url, final ImageView view,
                       WXImageQuality quality, final WXImageStrategy strategy) {
    Runnable runnable = new Runnable() {

      @Override
      public void run() {
        if(view==null||view.getLayoutParams()==null){
          return;
        }
        if (TextUtils.isEmpty(url)) {
          view.setImageBitmap(null);
          return;
        }
        if (null != strategy){
          recordImgLoadAction(strategy.instanceId);
        }

        String temp = url;
        if (url.startsWith("//")) {
          temp = "http:" + url;
        }

        if(!TextUtils.isEmpty(strategy.placeHolder)){
          Picasso.Builder builder=new Picasso.Builder(WXEnvironment.getApplication());
          Picasso picasso=builder.build();
          picasso.load(Uri.parse(strategy.placeHolder)).into(view);

          view.setTag(strategy.placeHolder.hashCode(),picasso);
        }

        Picasso.with(WXEnvironment.getApplication())
                .load(temp)
                .transform(new BlurTransformation(strategy.blurRadius))
                .into(view, new Callback() {
                  @Override
                  public void onSuccess() {
                    if(strategy.getImageListener()!=null){
                      strategy.getImageListener().onImageFinish(url,view,true,null);
                    }
                    recordImgLoadResult(strategy.instanceId,true,null);

                    if(!TextUtils.isEmpty(strategy.placeHolder)){
                      ((Picasso) view.getTag(strategy.placeHolder.hashCode())).cancelRequest(view);
                    }
                  }

                  @Override
                  public void onError() {
                    if(strategy.getImageListener()!=null){
                      strategy.getImageListener().onImageFinish(url,view,false,null);
                    }
                    recordImgLoadResult(strategy.instanceId,false,null);
                  }
                });
      }
    };
    if(Thread.currentThread() == Looper.getMainLooper().getThread()){
      runnable.run();
    }else {
      WXSDKManager.getInstance().postOnUiThread(runnable, 0);
    }
  }
  private void recordImgLoadAction(String instanceId){
    WXSDKInstance instance = WXSDKManager.getInstance().getAllInstanceMap().get(instanceId);
    if (null == instance || instance.isDestroy()){
      return;
    }
    instance.getApmForInstance().actionLoadImg();
  }

  private void recordImgLoadResult(String instanceId,boolean succeed,String errorCode){
    WXSDKInstance instance = WXSDKManager.getInstance().getAllInstanceMap().get(instanceId);
    if (null == instance || instance.isDestroy()){
      return;
    }
    instance.getApmForInstance().actionLoadImgResult(succeed,errorCode);
  }
}
