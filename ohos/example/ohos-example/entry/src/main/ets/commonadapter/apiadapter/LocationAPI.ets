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
import { ApiOptions } from 'WebSceneKitHsp';

export class LocationAPI {
  getLocation(options: ApiOptions) {
    const completeCb = options.completeCb;
    const name = options.name;
    let getLocationComplete = (data: LocationResult) => {
      console.info('WANG err:' + JSON.stringify(data));
      if (data.errCode === 0) {
        let weexSuccessData: WeexResultData = new WeexResultData(StatusCode.SUCCESS, data.errMsg,
          new LocationCallbackResult(data.latitude, data.longitude));
        completeCb(weexSuccessData);
      } else {
        let weexFailData: WeexResultData;
        if (data.errCode === 201) {
          weexFailData = new WeexResultData(StatusCode.UNAUTHORIZED, '权限被拒绝', new LocationCallbackResult(0, 0));
        } else {
          if (data.errMsg.includes('3301100')) {
            weexFailData = new WeexResultData(StatusCode.FAIL, '定位开关未开启', new LocationCallbackResult(0, 0));
          } else {
            weexFailData = new WeexResultData(StatusCode.FAIL, '获取地理位置失败', new LocationCallbackResult(0, 0));
          }
        }
        completeCb(weexFailData);
      }
    }

    let params: Array<CommonCallback> = new Array();
    params[0] = new CommonCallback();
    params[0].complete = getLocationComplete;
    as[name].apply(null, params);
  }
}

export class WeexResultData {
  status: number;
  statusMessage: string;
  data: LocationCallbackResult;

  constructor(status: number, statusMessage: string, data: LocationCallbackResult) {
    this.status = status;
    this.statusMessage = statusMessage;
    this.data = data;
  }
}

export class LocationCallbackResult {
  latitude: number;
  longitude: number;

  constructor(latitude: number, longitude: number) {
    this.latitude = latitude;
    this.longitude = longitude;
  }
}

class LocationResult {
  errCode: number;
  errMsg: string;
  latitude: number;
  longitude: number;
  altitude: number;
  accuracy: number;
  direction: number;

  constructor(errCode: number, errMsg: string, latitude: number, longitude: number,
              altitude: number, accuracy: number, direction: number) {
    this.errCode = errCode;
    this.errMsg = errMsg;
    this.latitude = latitude;
    this.longitude = longitude;
    this.altitude = altitude;
    this.accuracy = accuracy;
    this.direction = direction;
  }
}
