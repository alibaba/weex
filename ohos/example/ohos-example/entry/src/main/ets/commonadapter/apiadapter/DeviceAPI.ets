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

import { as } from 'advancedApi';
import { CommonCallback } from '../apimodel/CommonCallback';
import { StatusCode } from 'webSceneAPI';
import { WeexResult } from '../apimodel/WeexResult';
import { ApiOptions } from 'WebSceneKitHsp';

export class DeviceAPI {
  getReqHeader(options: ApiOptions) {
    const completeCb = options.completeCb;
    const name = options.name;
    let successCB = (data: SystemInfoResult) => {
      console.info('WANG get taro ReqHeader:ok')
      completeCb(new WeexResult<CallbackData>(StatusCode.SUCCESS, '获取成功', new CallbackData('', '', data.brand ?? '', data.system ?? '')));
    };
    let failCB = (data: SystemInfoResult) => {
      console.info('WANG get taro ReqHeader:fail');
      completeCb(new WeexResult<CallbackData>(StatusCode.FAIL, '获取失败', new CallbackData('', '', data.brand ?? '', data.system ?? '')));
    };

    let params: Array<CommonCallback> = new Array();
    params[0] = new CommonCallback();
    params[0].success = successCB;
    params[0].fail = failCB;

    as[name].apply(null, params);
  }
}

class SystemInfoResult {
  deviceType?: string;
  deviceBrand?: string;
  brand?: string;
  deviceModel?: string;
  platform?: string;
  model?: string;
  deviceOrientation?: string;
  devicePixelRatio?: string;
  pixelRatio?: string;
  system?: string;
  osName?: string;
  osVersion?: string;
  version?: string;
  osLanguage?: string;
  language?: string;
  ohosAPILevel?: string;
  romName?: string;
  romVersion?: string;
  appId?: string;
  appName?: string;
  appVersion?: string;
  appVersionCode?: string;
  appLanguage?: string;
  screenWidth?: string;
  screenHeight?: string;
  windowWidth?: string;
  windowHeight?: string;
  windowTop?: string;
  windowBottom?: string;
  statusBarHeight?: string;
  errCode?: number;
  errMsg?: string;
}

class CallbackData {
  rcver?: string;
  rcid?: string;
  brand?: string;
  ostype?: string;
  errMsg?: string;

  constructor(rcver?: string, rcid?: string, brand?: string, ostype?: string, errMsg?: string) {
    this.rcver = rcver;
    this.rcid = rcid;
    this.brand = brand;
    this.ostype = ostype;
    this.errMsg = errMsg;
  }
}
