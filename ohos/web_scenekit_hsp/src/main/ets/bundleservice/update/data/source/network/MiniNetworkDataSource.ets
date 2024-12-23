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

import request from '@ohos.request'
import Logger from '../../../../../common/Logger';
import { NetworkTask, NetworkTaskStatus } from '../bean/NetworkTask';
import { MiniLocalFileDataSource } from '../local/MiniLocalFileDataSource';

export class MiniNetworkDataSource {
  constructor() {
  }

  getDownloadTempPath(context: Context, version: number): string {
    return `${context.tempDir}/mini_${version.toString()}.zip`
  }

  async fetchMini(context: Context, version: number, url: string): Promise<string> {
    return new Promise<string>((resolve: Function, reject: Function) => {
      let tempPath = this.getDownloadTempPath(context, version)

      let downloadConfig: request.DownloadConfig = {
        url: url,
        filePath: tempPath,
        title: '小程序更新中...',
        background: true
      };
      request.downloadFile(context, downloadConfig)
        .then((downloadTask: request.DownloadTask) => {
          downloadTask.on('complete', () => {
            Logger.debug("UpdateManager", `${url} download succeed`)
            resolve(tempPath)
          })
          downloadTask.on('fail', (err: number) => {
            Logger.debug("UpdateManager", `${url}} download error, errCode is ${err.toString()}`)
            MiniLocalFileDataSource.delTempFile(tempPath)
            resolve(null)
          })
        })
        .catch((err: ESObject) => {
          Logger.debug("UpdateManager", `${url} download error, err is ${err.toString()}`)
          MiniLocalFileDataSource.delTempFile(tempPath)
          resolve(null)
        })
    })
  }
}