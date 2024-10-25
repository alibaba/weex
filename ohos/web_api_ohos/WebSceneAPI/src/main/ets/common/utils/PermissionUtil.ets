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

import abilityAccessCtrl, { PermissionRequestResult, Permissions } from '@ohos.abilityAccessCtrl';
import { BusinessError } from '@ohos.base';
import common from '@ohos.app.ability.common';
import { GlobalThis } from '../../model/GlobalThis';
import Log from '../log/Log';

const TAG = 'PermissionUtil';

/**
 * The permission util.
 */
export default class PermissionUtil {
  /**
   * Request permissions.
   *
   * @param permissions: Permissions[]
   * @param callback: Function
   */
  public static RequestPermissions(permissions: Permissions[], callback: Function): void {
    let mContext: common.UIAbilityContext | undefined= GlobalThis.getInstance().getContext();
    if (mContext === undefined) {
      Log.error(TAG, 'context is null or undefined');
      callback(false);
      return;
    }
    const atManager = abilityAccessCtrl.createAtManager();
    atManager.requestPermissionsFromUser(mContext, permissions).then((data: PermissionRequestResult) => {
      let grantStatus: Array<number> = data.authResults;
      let length: number = grantStatus.length;
      for (let i = 0; i < length; i++) {
        if (grantStatus[i] !== 0) {
          callback(false);
          return;
        }
      }
      callback(true);
    }).catch((err: BusinessError) => {
      Log.error(TAG, err.message);
      callback(false);
    });
  }
}