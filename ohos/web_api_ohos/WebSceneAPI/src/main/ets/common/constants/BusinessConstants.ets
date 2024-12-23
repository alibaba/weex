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

import { Permissions } from '@ohos.abilityAccessCtrl';

/**
 * Business constants for all features.
 */
export default class BusinessConstants {
  /**
   * Context is undefined;
   */
  static readonly CONTEXT_UNDEFINED: string = 'Context is undefined.';

  // ability constant


  // telephony constant


  // bluetooth constant
  static readonly BLUETOOTH_PERMISSIONS: Permissions[] = ['ohos.permission.ACCESS_BLUETOOTH'];

  // calendar constant
  static readonly CALENDAR_PERMISSIONS: Permissions[] = ['ohos.permission.WRITE_CALENDAR'];

  // network constant
  static readonly WIFI_CLOSE_CODE: number = 2501001;
  static readonly WIFI: string = 'WIFI';
  static readonly SECOND_G: string = '2G';
  static readonly THIRD_G: string = '3G';
  static readonly FORTH_G: string = '4G';
  static readonly FIFTH_G: string = '5G';
  static readonly NO_NETWORK: string = '无网络';
  static readonly UNKNOWN_NETWORK: string = '网络状态未知';
  static readonly CONTACT_SUCCESS: string = '操作成功';
  static readonly IP_CODE: number = 256;
  static readonly DEFAULT_VALUE: number = 1;
  static readonly NUMBER_OF_CYCLES: number = 3;
}