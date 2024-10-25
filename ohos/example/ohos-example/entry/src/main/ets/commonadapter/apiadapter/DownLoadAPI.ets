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

import common from '@ohos.app.ability.common';
import { as } from 'advancedApi';
import { StatusCode } from 'webSceneAPI';
import { GlobalThis } from '../../utils/GlobalThis';
import { WeexResult } from '../apimodel/WeexResult';
import { ApiOptions } from 'WebSceneKitHsp';

export class DownLoadAPI {
  downloadTask(options: ApiOptions) {
    const args = options.args;
    const completeCb = options.completeCb;
    let context = GlobalThis.getInstance().getContext("GlobalContext") as common.UIAbilityContext;
    const argsObj: DownloadCallback = JSON.parse(args);
    const timestamp = new Date().getTime()
    let filename = 'Download_' + timestamp;
    let downloadTaskSuccessCB = (data: downloadTaskInfo) => {
      let weexResult: WeexResult<string> = new WeexResult<string>(StatusCode.SUCCESS, data.errMsg, data?.filePath ?? '');
      completeCb(weexResult);
    };

    let downloadTaskFailCB = (data: downloadTaskInfo) => {
      let weexResult: WeexResult<string> = new WeexResult<string>(StatusCode.FAIL, data.errMsg, data?.filePath ?? '');
      completeCb(weexResult);
    };

    let params: Array<DownloadCallback> = new Array();
    params[0] = new DownloadCallback();
    params[0].url = argsObj.url ?? '';
    params[0].filePath = context.filesDir + filename + (argsObj.fileType ? argsObj.fileType : '');
    params[0].success = downloadTaskSuccessCB;
    params[0].fail = downloadTaskFailCB;
    as['downloadFile'].apply(null, params)
  }
}

class downloadTaskInfo {
  filePath: string;
  statusCode?: number | undefined;
  errMsg: string;

  constructor(filePath: string, statusCode: number, errMsg: string) {
    this.filePath = filePath;
    this.statusCode = statusCode;
    this.errMsg = errMsg;
  }
}

class DownloadCallback {
  url: string = '';
  fileType: string = '';
  filePath: string = '';
  success: Function = () => {
  };
  fail: Function = () => {
  };
  complete: Function = () => {
  };
}

