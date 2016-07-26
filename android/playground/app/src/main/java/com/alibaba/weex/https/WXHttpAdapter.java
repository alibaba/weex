package com.alibaba.weex.https;

import com.taobao.weex.adapter.IWXHttpAdapter;
import com.taobao.weex.common.WXRequest;
import com.taobao.weex.common.WXResponse;

/**
 * Created by lijie.cl on 16/7/27.
 */
public class WXHttpAdapter implements IWXHttpAdapter {
  @Override
  public void sendRequest(WXRequest request, final OnHttpListener listener) {
    WXHttpTask httpTask = new WXHttpTask();
    httpTask.url = request.url;
    httpTask.requestListener = new WXRequestListener() {
      @Override
      public void onSuccess(WXHttpTask task) {
        WXResponse response = new WXResponse();
        response.statusCode = String.valueOf(task.response.code);
        response.originalData = task.response.data;
        listener.onHttpFinish(response);
      }

      @Override
      public void onError(WXHttpTask task) {
        WXResponse response = new WXResponse();
        response.statusCode = String.valueOf(task.response.code);
        listener.onHttpFinish(response);
      }
    };

    WXHttpManager.getInstance().sendRequest(httpTask);
  }
}
