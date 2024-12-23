/*
 * Copyright (C) 2024. Huawei Device Co., Ltd. All rights reserved.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the Apache-2.0 license.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * Apache-2.0 license for more details.
 */

import { ApiOptions } from './apimodel/ApiOptions';
import http from '@ohos.net.http';
import { BusinessError } from '@ohos.base';
import { ResultStr, WeexProxyResult } from './apimodel/WeexResult';

export class StreamAPI {
  /**
   * Start a network request, use two callbacks to receive server's response data.
   *
   * @param method
   * @param url
   * @param headers
   * @param type
   * @param body
   * @param callback
   * @param progressCallback
   */
  fetch(options: ApiOptions){
    const args: FetchParams = JSON.parse(options.args);
    const completeCb = options.completeCb;
    let method: string = args.method;
    let url: string = args.url;
    let headers: Object = args.headers ?? '';
    let type: string = args.type;
    let body: string = args.body ?? '';

    type MethodMap = Record<string, http.RequestMethod>;
    const methodMap: MethodMap = {
      'OPTIONS': http.RequestMethod.OPTIONS,
      'GET': http.RequestMethod.GET,
      'HEAD': http.RequestMethod.HEAD,
      'POST': http.RequestMethod.POST,
      'PUT': http.RequestMethod.PUT,
      'DELETE': http.RequestMethod.DELETE,
      'TRACE': http.RequestMethod.TRACE,
      'CONNECT': http.RequestMethod.CONNECT
    };

    type TypeMap = Record<string, http.HttpDataType>;
    const typeMap: TypeMap = {
      'json': http.HttpDataType.OBJECT,
      'text': http.HttpDataType.STRING
    };

    // 每一个httpRequest对应一个HTTP请求任务，不可复用
    let httpRequest = http.createHttp();
    // 用于订阅HTTP响应头，此接口会比request请求先返回。可以根据业务需要订阅此消息
    // 从API 8开始，使用on('headersReceive', Callback)替代on('headerReceive', AsyncCallback)。 8+
    httpRequest.on('headersReceive', (header: Object) => {
      console.info('header: ' + JSON.stringify(header));
    });

    httpRequest.request(// 填写HTTP请求的URL地址，可以带参数也可以不带参数。URL地址需要开发者自定义。请求的参数可以在extraData中指定
      url,
      {
        method: methodMap[method], // 可选，默认为http.RequestMethod.GET
        // 当使用POST请求时此字段用于传递请求体内容，具体格式与服务端协商确定
        extraData: body,
        expectDataType:typeMap[type], // 可选，指定返回数据的类型
        usingCache: true, // 可选，默认为true
        priority: 1, // 可选，默认为1
        // 开发者根据自身业务需要添加header字段
        header: headers,
        readTimeout: 60000, // 可选，默认为60000ms
        connectTimeout: 60000, // 可选，默认为60000ms
        usingProtocol: http.HttpProtocol.HTTP1_1, // 可选，协议类型默认值由系统自动指定
        usingProxy: false, //可选，默认不使用网络代理，自API 10开始支持该属性
        caPath: '', // 可选，默认使用系统预设CA证书，自API 10开始支持该属性
        multiFormDataList: [ ]
      },
      (err: BusinessError, data: http.HttpResponse) => {
        if (!err) {
          // data.result为HTTP响应内容，可根据业务需要进行解析
          console.info('headers:' + JSON.stringify(headers));
          console.info('Result:' + JSON.stringify(data.result));
          console.info('code:' + JSON.stringify(data.responseCode));
          console.info('type:' + JSON.stringify(data.resultType));
          // data.header为HTTP响应头，可根据业务需要进行解析
          console.info('header:' + JSON.stringify(data.header));
          console.info('cookies:' + JSON.stringify(data.cookies)); // 自API version 8开始支持cookie
          completeCb(new WeexProxyResult(ResultStr.SUCCESS, JSON.stringify(data)))
          // 取消订阅HTTP响应头事件
          httpRequest.off('headersReceive');
          // 当该请求使用完毕时，开发者务必调用destroy方法主动销毁该JavaScript Object。
          httpRequest.destroy();
        } else {
          completeCb(new WeexProxyResult(ResultStr.FAIL, JSON.stringify(err)));
          console.info('error:' + JSON.stringify(err));
          // 取消订阅HTTP响应头事件
          httpRequest.off('headersReceive');
          // 当该请求使用完毕时，开发者务必调用destroy方法主动销毁该JavaScript Object。
          httpRequest.destroy();
        }
      });

  }
}

interface FetchParams{
  method: string
  url: string
  headers: Object
  type: string
  body: string
}