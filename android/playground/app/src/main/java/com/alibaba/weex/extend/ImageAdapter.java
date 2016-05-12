package com.alibaba.weex.extend;

import android.text.TextUtils;
import android.widget.ImageView;

import com.squareup.picasso.Picasso;
import com.taobao.weex.WXEnvironment;
import com.taobao.weex.WXSDKManager;
import com.taobao.weex.adapter.IWXImgLoaderAdapter;
import com.taobao.weex.common.WXImageStrategy;
import com.taobao.weex.dom.WXImageQuality;

public class ImageAdapter implements IWXImgLoaderAdapter {

  public ImageAdapter() {
  }

  @Override
  public void setImage(final String url, final ImageView view,
                       WXImageQuality quality, WXImageStrategy strategy) {
    //        if (TextUtils.isEmpty(url)) {
    //            view.setImageBitmap(null);
    //            return;
    //        }
    //        String temp = url;
    //        if (url.startsWith("//")){
    //            temp = "http:" + url;
    //        }
    //
    //        Uri uri = Uri.parse(temp);
    //
    //        ImageDecodeOptions decodeOptions = ImageDecodeOptions.newBuilder()
    //                .setBackgroundColor(Color.GREEN)
    //                .build();
    //
    //        ImageRequest request = ImageRequestBuilder
    //                .newBuilderWithSource(uri)
    //                .setImageDecodeOptions(decodeOptions)
    //                .setAutoRotateEnabled(true)
    //                .setLocalThumbnailPreviewsEnabled(true)
    //                .setLowestPermittedRequestLevel(ImageRequest.RequestLevel.FULL_FETCH)
    //                .setProgressiveRenderingEnabled(false)
    //                .build();
    //
    //
    //        ImagePipeline imagePipeline = Fresco.getImagePipeline();
    //        DataSource<CloseableReference<CloseableImage>>
    //                dataSource = imagePipeline.fetchDecodedImage(request, mContext);
    //
    //        DataSubscriber dataSubscriber =
    //                new BaseDataSubscriber<CloseableReference<CloseableImage>>() {
    //                    @Override
    //                    public void onNewResultImpl(DataSource<CloseableReference<CloseableImage>> dataSource) {
    //
    //                        CloseableReference<CloseableImage> imageReference = dataSource.getResult();
    //                        if (imageReference != null) {
    //                            try {
    //                                // do something with the image
    //                                Preconditions.checkState(CloseableReference.isValid(imageReference));
    //                                CloseableImage closeableImage = imageReference.get();
    //                                if (closeableImage instanceof CloseableStaticBitmap) {
    //                                    CloseableStaticBitmap closeableStaticBitmap = (CloseableStaticBitmap) closeableImage;
    //                                    view.setImageBitmap(closeableStaticBitmap.getUnderlyingBitmap());
    ////                                    boolean hasResult =  null != closeableStaticBitmap.getUnderlyingBitmap();
    //                                } else {
    //                                    throw new UnsupportedOperationException("Unrecognized image class: " + closeableImage);
    //                                }
    //                            } finally {
    //                                imageReference.close();
    //                            }
    //                        }
    //                    }
    //
    //                    @Override
    //                    public void onFailureImpl(DataSource dataSource) {
    //                        Throwable throwable = dataSource.getFailureCause();
    //                        // handle failure
    //                    }
    //                };
    //
    //        dataSource.subscribe(dataSubscriber, UiThreadImmediateExecutorService.getInstance());

    WXSDKManager.getInstance().postOnUiThread(new Runnable() {

      @Override
      public void run() {
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
        Picasso.with(WXEnvironment.getApplication())
            .load(temp)
            .into(view);
      }
    },0);
  }
}
