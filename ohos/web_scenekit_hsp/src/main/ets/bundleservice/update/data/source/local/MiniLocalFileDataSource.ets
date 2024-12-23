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
import fs from '@ohos.file.fs';
import zlib from '@ohos.zlib';
import { Constants } from '../../../../constants/Constants';
import { LocalVersionInfo } from '../bean/LocalVersionInfo';
import Logger from '../../../../../common/Logger';
import { UpdateConfig } from '../bean/UpdateConfig';

export class MiniLocalFileDataSource {
  constructor() {
  }

  getLastMiniVersion(context: Context): LocalVersionInfo {
    let miniPath = `${context.filesDir}/${Constants.UPDATE_STORAGE_PATH}`;
    let localVersionInfo = new LocalVersionInfo(UpdateConfig.getInstance().getInitialVersion());

    if (!fs.accessSync(miniPath) || !fs.statSync(miniPath).isDirectory()) {
      return localVersionInfo;
    }
    let filenames = fs.listFileSync(miniPath, { recursion: false, listNum: 0 });
    const versionCompareFunc = UpdateConfig.getInstance().getCompareVersionFunc();
    if (filenames.length > 0) {
      filenames.sort((a, b) => {
        if (versionCompareFunc(a, b)) {
          //正序排列
          return 1;
        }
        return -1;
      })
      if (filenames.length === 3) {
        //保证在下载前只有两个版本
        MiniLocalFileDataSource.delTempFile(`${miniPath}/${filenames[0]}`);
      }
      localVersionInfo.localVersion = filenames[filenames.length-1];
      localVersionInfo.path = `${miniPath}/${filenames[filenames.length-1]}`;
      return localVersionInfo;
    }
    return localVersionInfo;
  }

  static delTempFile(tempPath: string) {
    if (!fs.accessSync(tempPath)) {
      return;
    }
    fs.unlinkSync(tempPath);
  }

  getLocalPath(context: Context, version: number): string {
    let miniPath = `${context.filesDir}/${Constants.UPDATE_STORAGE_PATH}`;

    if (!fs.accessSync(miniPath) || !fs.statSync(miniPath).isDirectory()) {
      fs.mkdirSync(miniPath);
    }

    let versionPath = `${miniPath}/${version.toString()}`;
    if (!fs.accessSync(versionPath) || !fs.statSync(versionPath).isDirectory()) {
      fs.mkdirSync(versionPath);
    }

    return versionPath;
  }

  saveAndUnzip(context: Context, version: number, filePath: string): Promise<string> {
    return new Promise<string>((resolve: Function, reject: Function) => {
      try {
        let options: zlib.Options = {
          level: zlib.CompressLevel.COMPRESS_LEVEL_DEFAULT_COMPRESSION,
          memLevel: zlib.MemLevel.MEM_LEVEL_DEFAULT,
          strategy: zlib.CompressStrategy.COMPRESS_STRATEGY_DEFAULT_STRATEGY
        }

        let savePath = this.getLocalPath(context, version);

        zlib.decompressFile(filePath, savePath, options, (errData) => {
          if (errData !== null) {
            Logger.debug("UpdateManager", `${filePath} decompressFile failed. code is ${errData.code},
             message is ${errData.message}` );
          } else {
            Logger.debug("UpdateManager", `${filePath} decompressFile success. decompressPath is ${savePath}`);
          }
          MiniLocalFileDataSource.delTempFile(filePath);
          resolve(errData == null ? savePath : '');
        })
      } catch (errData) {
        let code = (errData as BusinessError).code;
        let message = (errData as BusinessError).message;
        Logger.debug("UpdateManager", `${filePath} decompressFile failed. code is ${code}, message is ${message}`);
        MiniLocalFileDataSource.delTempFile(filePath);
        resolve('');
      }
    })
  }
}