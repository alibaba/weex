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
import { StatusCode } from 'webSceneAPI/src/main/ets/common/entity/StatusCode';
import { CommonCallback } from '../apimodel/CommonCallback';
import { WeexResult } from '../apimodel/WeexResult';
import { ApiOptions } from 'WebSceneKitHsp';

export class AuthSettingAPI {
  authSetting(options: ApiOptions) {
    const completeCb = options.completeCb;
    let params: Array<CommonCallback> = new Array();
    params[0] = new CommonCallback();
    let ret: AuthSettingTaroResults = as['getAppAuthorizeSetting'].apply(null, params);
    completeCb(new WeexResult<AuthSettingTaroResults>(StatusCode.SUCCESS, '查询成功', ret));
  }
}

export class AuthSettingTaroResults {
  userLocation?: boolean;
  bluetooth?: boolean;
  addPhoneCalendar?: boolean;
  writePhotosAlbum?: boolean;
  camera?: boolean;
  notification?: boolean;
  errMsg?: string;
}
