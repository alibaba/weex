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

import { LocalUpdateManagerInstance } from '../../bundleservice/update/LocalUpdateManager';
import { ResultStr, WeexProxyResult } from './apimodel/WeexResult';
import { ApiOptions } from './apimodel/ApiOptions';

export class UpdateApi {
  onCheckForUpdate(options: ApiOptions) {
    const completeCb = options.completeCb
    const listener = (hasUpdate: boolean) => {
      completeCb(new WeexProxyResult(ResultStr.SUCCESS, [hasUpdate, LocalUpdateManagerInstance.gteLastVersion()]));
    }
    LocalUpdateManagerInstance.onCheckForUpdate(listener);
  }

  applyUpdate(options: ApiOptions) {
    LocalUpdateManagerInstance.applyUpdate();
  }

  onUpdateReady(options: ApiOptions) {
    const completeCb = options.completeCb;
    const listener = (updatedPath: string) => {
      completeCb(new WeexProxyResult(ResultStr.SUCCESS, ''));
    }
    LocalUpdateManagerInstance.onUpdateReady(listener);
  }

  onUpdateFailed(options: ApiOptions) {
    const completeCb = options.completeCb;
    const listener = () => {
      completeCb(new WeexProxyResult(ResultStr.SUCCESS, ''));
    }
    LocalUpdateManagerInstance.onUpdateFailed(listener);
  }
}

