/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { BusinessError } from '@ohos.base';
import common from '@ohos.app.ability.common';
import fs from '@ohos.file.fs';
import { Permissions } from '@ohos.abilityAccessCtrl';
import photoAccessHelper from '@ohos.file.photoAccessHelper';
import taskPool from '@ohos.taskpool';
import { Base64 } from '../../common/js-base64/base64';
import BusinessConstants from '../../common/constants/BusinessConstants';
import { CallBackAdapter } from '../../model/CallBackAdapter';
import { CommonConfig } from '../../common/entity/CommonConfig';
import { GlobalThis } from '../../model/GlobalThis';
import Log from '../../common/log/Log';
import PermissionUtil from '../../common/utils/PermissionUtil';
import { StatusCode } from '../../common/entity/StatusCode';

const TAG: string = 'WSMedia';

/**
 * Media file management.
 */
export class WSMedia {
  /**
   * Save pictures to the photo album.
   * 
   * @param {ImagesConfig} ImagesEvent Result callback.
   */
  @CallBackAdapter
  public saveImgsToAlbum(imagesEvent: ImagesConfig) {
    const permissions: Permissions[] = ['ohos.permission.WRITE_IMAGEVIDEO'];
    PermissionUtil.RequestPermissions(permissions, (data: boolean) => {
      if (!data) {
        Log.error(TAG, 'The user is not authorized.');
        imagesEvent.complete(StatusCode.UNAUTHORIZED, StatusMsg.UNAUTHORIZED);
        return;
      }
      let context: common.UIAbilityContext | undefined = GlobalThis.getInstance().getContext();
      if (context === undefined) {
        Log.error(TAG, BusinessConstants.CONTEXT_UNDEFINED);
        imagesEvent.complete(StatusCode.FAIL, StatusMsg.FAIL);
        return;
      }
      let group: taskPool.TaskGroup = new taskPool.TaskGroup();
      for (let img of imagesEvent.imgArray) {
        group.addTask(saveImg, new SaveImgParam(context, img));
      }
      taskPool.execute(group, taskPool.Priority.HIGH).then((results: object[]) => {
        let successNum: number = 0;
        for (let result of results) {
          if (result) {
            successNum++;
          }
        }
        if (successNum !== results.length) {
          Log.error(TAG, 'Failed to save some photo, delete saved photos.');
          // TODO 需要增加删除逻辑
          imagesEvent.complete(StatusCode.FAIL, StatusMsg.FAIL);
        } else {
          Log.info(TAG, 'Save photos successfully.');
          imagesEvent.complete(StatusCode.SUCCESS, StatusMsg.SUCCESS);
        }
      }).catch((err: BusinessError) => {
        Log.error(TAG, 'taskPool catch an error: ' + err.message);
        imagesEvent.complete(StatusCode.FAIL, err.message);
      });
    });
  }
}

/**
 * Save image to the photo album with the taskPool.
 *
 * @param {param} include the context and base64 string.
 */
@Concurrent
async function saveImg(param: SaveImgParam) {
  const TAG: string = 'WSMedia';
  if (typeof param.value !== 'string') {
    Log.error(TAG, 'FilePath is not a string.');
    return '';
  }
  try {
    let uri: string = await photoAccessHelper.getPhotoAccessHelper(param.context)
      .createAsset(photoAccessHelper.PhotoType.IMAGE, 'png');
    let imageData: string = Base64.atob(param.value);
    let file: fs.File = fs.openSync(uri, fs.OpenMode.WRITE_ONLY);
    let arrayBuffer: ArrayBuffer = new ArrayBuffer(imageData.length);
    let ia: Uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < imageData.length; i++) {
      ia[i] = imageData.charCodeAt(i);
    }
    fs.writeSync(file.fd, ia.buffer);
    fs.closeSync(file);
    Log.info(TAG, uri + ' file save successfully.');
    return uri;
  } catch (err) {
    Log.error(TAG, 'File operation catch an error: ' + err.message);
    return '';
  }
}

/**
 * The param of saveImg.
 */
class SaveImgParam {
  context: common.UIAbilityContext;
  value: string;

  constructor(context: common.UIAbilityContext, value: string) {
    this.context = context;
    this.value = value;
  }
}

/**
 * ImagesConfig Information class.
 */
export class ImagesConfig extends CommonConfig<string> {
  imgArray: string[] = [];
}

enum StatusMsg {
  SUCCESS = '保存图片成功',
  FAIL = '保存图片失败',
  INVALID_PARAMS = '参数非法',
  UNAUTHORIZED = '权限未授权',
}