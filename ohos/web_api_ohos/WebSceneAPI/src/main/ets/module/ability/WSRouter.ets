/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License,Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { BusinessError } from '@ohos.base';
import common from '@ohos.app.ability.common';
import Want from '@ohos.app.ability.Want';
import BusinessConstants from '../../common/constants/BusinessConstants';
import { CallBackAdapter } from '../../model/CallBackAdapter';
import { CommonConfig } from '../../common/entity/CommonConfig';
import { GlobalThis } from '../../model/GlobalThis';
import Log from '../../common/log/Log';
import { StatusCode } from '../../common/entity/StatusCode';

const TAG: string = 'WSRouter';

/**
 * Class for jump to the third app by startAbility.
 */
export class WSRouter {
  /**
   * Jump to the third app accord to the JumpThirdConfig.
   *
   * @param jumpThirdConfig.
   */
  @CallBackAdapter
  public jumpThirdApp(jumpThirdConfig: JumpThirdConfig) {
    let context: common.UIAbilityContext | undefined = GlobalThis.getInstance().getContext();
    if ( context === undefined) {
      Log.error(TAG, BusinessConstants.CONTEXT_UNDEFINED);
      jumpThirdConfig.complete(StatusCode.FAIL, BusinessConstants.CONTEXT_UNDEFINED);
      return;
    }
    let want: Want = {
      deviceId: jumpThirdConfig.deviceId ?? '',
      bundleName: jumpThirdConfig.bundleName ?? '',
      moduleName: jumpThirdConfig.moduleName ?? '',
      abilityName: jumpThirdConfig.abilityName ?? '',
      uri: jumpThirdConfig.scheme ?? ''
    }
    context.startAbility(want).then(() => {
      Log.info(TAG, StatusMsg.SUCCESS);
      jumpThirdConfig.complete(StatusCode.SUCCESS, StatusMsg.SUCCESS);
    }).catch((err: BusinessError) => {
      Log.error(TAG, err.message);
      jumpThirdConfig.complete(StatusCode.FAIL, StatusMsg.FAIL);
    })
  }
}

export class JumpThirdConfig extends CommonConfig<string> {
  deviceId?: string;
  bundleName?: string;
  moduleName?: string;
  abilityName?: string;
  action?: string;
  entities?: string;
  scheme?: string;
  type?: string;
  parameters?: [key: string];
  flags?: number;
}

enum StatusMsg {
  SUCCESS = '跳转三方应用成功',
  FAIL = '跳转三方应用失败'
}