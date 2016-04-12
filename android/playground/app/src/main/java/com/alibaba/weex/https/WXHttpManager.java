package com.alibaba.weex.https;

import android.os.Handler;
import android.os.Message;

public class WXHttpManager {

  private static WXHttpManager wxHttpManager;
  private WXOkHttpDispatcher mOkHttpDispatcher;
  private Handler mHandler = new Handler(new Handler.Callback() {

    @Override
    public boolean handleMessage(Message msg) {
      WXHttpTask httpTask = (WXHttpTask) msg.obj;
      if (httpTask == null || httpTask.requestListener == null) {
        return true;
      }
      WXHttpResponse response = httpTask.response;
      if (response == null || response.code >= 300) {
        httpTask.requestListener.onError(httpTask);
      } else {
        httpTask.requestListener.onSuccess(httpTask);
      }
      return true;
    }
  });

  private WXHttpManager() {
    mOkHttpDispatcher = new WXOkHttpDispatcher(mHandler);
  }

  public static WXHttpManager getInstance() {
    if (wxHttpManager == null) {
      wxHttpManager = new WXHttpManager();
    }
    return wxHttpManager;
  }

  public void sendRequest(WXHttpTask httpTask) {
    mOkHttpDispatcher.dispatchSubmit(httpTask);
  }
}
