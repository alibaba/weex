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

import { BusinessError } from '@ohos.base';
import window from '@ohos.window';
import { GlobalThis } from '../utils/GlobalThis';
import { WeexProxyResult, ResultStr } from './apimodel/WeexResult';
import { ApiOptions } from './apimodel/ApiOptions';

export class DeviceInfoAPI {
  enableFullScreenHeight(optoins: ApiOptions) {
    const completeCb = optoins.completeCb;
    window.getLastWindow(GlobalThis.getInstance().getContext("GlobalContext")).then((data: window.Window) => {
      let height: number = data.getWindowProperties().windowRect.height;
      console.info('[enableFullScreenHeight] success height is ' + height);
      completeCb(new WeexProxyResult(ResultStr.SUCCESS, height));
    }).catch((err: BusinessError) => {
      console.error('[enableFullScreenHeight] failed to get window data, errMsg: ' + err.message);
      completeCb(new WeexProxyResult(ResultStr.FAIL, ''));
    });
  }
}