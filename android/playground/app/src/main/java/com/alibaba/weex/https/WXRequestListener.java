package com.alibaba.weex.https;

public interface WXRequestListener {

  void onSuccess(WXHttpTask task);

  void onError(WXHttpTask task);
}
