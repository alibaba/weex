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
import { StatusCode, WSMedia, ImagesConfig } from 'webSceneAPI';
import { WeexResult } from '../apimodel/WeexResult';
import { ApiOptions } from 'WebSceneKitHsp';

export class MediaAPI {
  saveVideoToPhotosAlbum(options: ApiOptions) {
    const completeCb = options.completeCb;
    const name = options.name;
    const args = options.args;
    let completeCB = (data: object) => {
      console.log("[websceneeadapter] saveVideoToPhotosAlbum completeCB data = " + JSON.stringify(data));
      let errCode: StatusCode = StatusCode.FAIL;
      if (data['errMsg'].indexOf(':ok') > 0) {
        errCode = StatusCode.SUCCESS;
      }
      completeCb(new WeexResult<void>(errCode, data['errMsg']));
    };

    let params: Array<MediaCallback> = new Array();
    params[0] = new MediaCallback();
    params[0].complete = completeCB;
    params[0].filePath = args['filePath'] ?? '';
    as[name].apply(null, params);
  }

  saveImgsToAlbum(options: ApiOptions) {
    const completeCb = options.completeCb;
    let imagesConfig: ImagesConfig = JSON.parse(options.args);
    imagesConfig.complete = (status: number, statusMessage: string) => {
      completeCb(new WeexResult<void>(status, statusMessage));
    };
    new WSMedia().saveImgsToAlbum(imagesConfig);
  }
}

class MediaCallback {
  success: Function = () => {
  };
  fail: Function = () => {
  };
  complete: Function = () => {
  };
  filePath: string = '';
}
