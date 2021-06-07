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

import android.graphics.Color;
import android.graphics.drawable.Animatable;
import android.net.Uri;
import android.support.annotation.Nullable;
import android.text.TextUtils;
import android.util.Log;
import android.widget.ImageView;

import com.facebook.common.executors.UiThreadImmediateExecutorService;
import com.facebook.common.internal.Preconditions;
import com.facebook.common.logging.FLog;
import com.facebook.common.references.CloseableReference;
import com.facebook.datasource.BaseDataSubscriber;
import com.facebook.datasource.DataSource;
import com.facebook.datasource.DataSubscriber;
import com.facebook.drawee.backends.pipeline.Fresco;
import com.facebook.drawee.controller.BaseControllerListener;
import com.facebook.drawee.controller.ControllerListener;
import com.facebook.drawee.interfaces.DraweeController;
import com.facebook.drawee.view.DraweeView;
import com.facebook.imagepipeline.common.ImageDecodeOptions;
import com.facebook.imagepipeline.core.ImagePipeline;
import com.facebook.imagepipeline.image.CloseableImage;
import com.facebook.imagepipeline.image.CloseableStaticBitmap;
import com.facebook.imagepipeline.image.ImageInfo;
import com.facebook.imagepipeline.image.QualityInfo;
import com.facebook.imagepipeline.request.ImageRequest;
import com.facebook.imagepipeline.request.ImageRequestBuilder;
import com.taobao.weex.WXSDKManager;
import com.taobao.weex.adapter.IWXImgLoaderAdapter;
import com.taobao.weex.common.WXImageStrategy;
import com.taobao.weex.dom.WXImageQuality;

public class FrescoImageAdapter implements IWXImgLoaderAdapter {

    public FrescoImageAdapter() {
    }

    @Override
    public void setImage(final String url, final ImageView view,
                         WXImageQuality quality, WXImageStrategy strategy) {

        WXSDKManager.getInstance().postOnUiThread(new Runnable() {

            @Override
            public void run() {
                if (view == null || view.getLayoutParams() == null) {
                    return;
                }
                if (TextUtils.isEmpty(url)) {
                    view.setImageBitmap(null);
                    return;
                }
                String temp = url;
                if (url.startsWith("//")) {
                    temp = "http:" + url;
                }
                if (view.getLayoutParams().width <= 0 || view.getLayoutParams().height <= 0) {
                    return;
                }

                Uri uri = Uri.parse(temp);

                ImageDecodeOptions decodeOptions = ImageDecodeOptions.newBuilder()
                        .setBackgroundColor(Color.GREEN)
                        .build();

                ImageRequest request = ImageRequestBuilder
                        .newBuilderWithSource(uri)
                        .setImageDecodeOptions(decodeOptions)
                        .setAutoRotateEnabled(true)
                        .setLocalThumbnailPreviewsEnabled(true)
                        .setLowestPermittedRequestLevel(ImageRequest.RequestLevel.FULL_FETCH)
                        .setProgressiveRenderingEnabled(false)
                        .build();

                if(view instanceof DraweeView){
                    Log.d("FrescoImageAdapter","load: "+url);
                    ControllerListener controllerListener = new BaseControllerListener<ImageInfo>() {
                        @Override
                        public void onFinalImageSet(
                            String id,
                            @Nullable ImageInfo imageInfo,
                            @Nullable Animatable anim) {
                            if (imageInfo == null) {
                                return;
                            }
                            QualityInfo qualityInfo = imageInfo.getQualityInfo();
                            FLog.d("Final image received! " +
                                    "Size %d x %d",
                                "Quality level %d, good enough: %s, full quality: %s",
                                imageInfo.getWidth(),
                                imageInfo.getHeight(),
                                qualityInfo.getQuality(),
                                qualityInfo.isOfGoodEnoughQuality(),
                                qualityInfo.isOfFullQuality());
                        }

                        @Override
                        public void onIntermediateImageSet(String id, @Nullable ImageInfo imageInfo) {
                            FLog.d("","Intermediate image received");
                        }

                        @Override
                        public void onFailure(String id, Throwable throwable) {
                            FLog.e(getClass(), throwable, "Error loading %s", id);
                        }
                    };
                    DraweeController controller = Fresco.newDraweeControllerBuilder()
                        .setAutoPlayAnimations(true)
                        .setControllerListener(controllerListener)
                        .setUri(uri)
                        .setImageRequest(request)
                        .build();
                    ((DraweeView)view).setController(controller);

                }else {
                    ImagePipeline imagePipeline = Fresco.getImagePipeline();
                    DataSource<CloseableReference<CloseableImage>>
                        dataSource = imagePipeline.fetchDecodedImage(request, new Object());
                    DataSubscriber dataSubscriber =
                        new BaseDataSubscriber<CloseableReference<CloseableImage>>() {
                            @Override
                            public void onNewResultImpl(DataSource<CloseableReference<CloseableImage>> dataSource) {

                                CloseableReference<CloseableImage> imageReference = dataSource.getResult();
                                if (imageReference != null) {
                                    try {
                                        // do something with the image
                                        Preconditions.checkState(CloseableReference.isValid(imageReference));
                                        CloseableImage closeableImage = imageReference.get();
                                        if (closeableImage instanceof CloseableStaticBitmap) {
                                            CloseableStaticBitmap closeableStaticBitmap = (CloseableStaticBitmap) closeableImage;
                                            view.setImageBitmap(closeableStaticBitmap.getUnderlyingBitmap());
                                            // boolean hasResult =  null != closeableStaticBitmap.getUnderlyingBitmap();
                                        } else {
                                            throw new UnsupportedOperationException("Unrecognized image class: " + closeableImage);
                                        }
                                    } finally {
                                        imageReference.close();
                                    }
                                }
                            }

                            @Override
                            public void onFailureImpl(DataSource dataSource) {
                            }
                        };

                    dataSource.subscribe(dataSubscriber, UiThreadImmediateExecutorService.getInstance());
                }
            }
        }, 0);
    }
}
