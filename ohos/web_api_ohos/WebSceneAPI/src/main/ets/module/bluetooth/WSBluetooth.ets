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

import access from '@ohos.bluetooth.access';
import BusinessConstants from '../../common/constants/BusinessConstants';
import { CallBackAdapter } from '../../model/CallBackAdapter';
import { CommonConfig } from '../../common/entity/CommonConfig';
import Log from '../../common/log/Log';
import PermissionUtil from '../../common/utils/PermissionUtil';
import { StatusCode } from '../../common/entity/StatusCode';

/**
 * Class for managing Bluetooth Provides Bluetooth operation methods.
 */
export class WSBluetooth {
  /**
   * Get the Bluetooth status.
   *
   * @param {CommonConfig<BluetoothState>} bluetoothConfig Result callback.
   */
  @CallBackAdapter
  public getBluetoothState(bluetoothConfig: CommonConfig<BluetoothState>) {
    PermissionUtil.RequestPermissions(BusinessConstants.BLUETOOTH_PERMISSIONS, (data: boolean) => {
      if (data) {
        try {
          let state: boolean = access.getState() === access.BluetoothState.STATE_ON;
          bluetoothConfig.complete(StatusCode.SUCCESS, StatusMsg.SUCCESS, state ?
            BluetoothState.STATE_ON : BluetoothState.STATE_OFF);
        } catch (err) {
          Log.error(`WSBluetooth get state code-> ${err.code} , message->${err.message}`);
          bluetoothConfig.complete(StatusCode.FAIL, err.message);
        }
      } else {
        Log.error(`WSBluetooth permissions failed`);
        bluetoothConfig.complete(StatusCode.UNAUTHORIZED, StatusMsg.UNAUTHORIZED);
      }
    });
  }
}

/**
 * Bluetooth status enum class.
 */
export enum BluetoothState {
  STATE_ON = 0,
  STATE_OFF = 1
}

enum StatusMsg {
  SUCCESS = '获取蓝牙状态成功',
  UNAUTHORIZED = '权限未授权'
}