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

import ArrayList from '@ohos.util.ArrayList'
import AppContext from '@ohos.app.ability.common'
import Logger from '../../common/Logger';
import { BusinessError } from '@kit.BasicServicesKit';

export abstract class UpdateManager {
  protected onCheckForUpdateListeners: ArrayList<(hasUpdate: boolean) => void> =
    new ArrayList<(hasUpdate: boolean) => void>();
  protected onUpdateReadyListeners: ArrayList<(updatedPath: string) => void> = new ArrayList<() => void>();
  protected onUpdateFailedListeners: ArrayList<() => void> = new ArrayList<() => void>();
  protected hasUpdate: boolean | null = null;
  protected updatedPath: string | null = null;
  protected context: AppContext.UIAbilityContext | null = null;

  reset(context: AppContext.UIAbilityContext) {
    this.hasUpdate = null;
    this.updatedPath = null;
    this.context = context;
  }

  applyUpdate(): void {
    (this.context as AppContext.UIAbilityContext).terminateSelf((err: BusinessError) => {
      if (err.code) {
        Logger.error('UpdateManager', `terminateSelf failed, code is ${err.code}, message is ${err.message}`);
        return;
      }
      Logger.debug('UpdateManager', 'applyUpdate succeed');
    });
  }

  onCheckForUpdate(listener: (hasUpdate: boolean) => void): void {
    this.onCheckForUpdateListeners.add(listener);

    if (this.hasUpdate != null) {
      listener && listener(this.hasUpdate);
    }
  }

  onUpdateReady(listener: (updatedPath: string) => void): void {
    this.onUpdateReadyListeners.add(listener);

    if (this.updatedPath != null && this.updatedPath != '') {
      listener && listener(this.updatedPath);
    }
  }

  onUpdateFailed(listener: () => void): void {
    this.onUpdateFailedListeners.add(listener);

    if (this.updatedPath == '') {
      listener && listener();
    }
  }

  notifyCheckForUpdate(hasUpdate: boolean) {
    this.hasUpdate = hasUpdate;

    this.onCheckForUpdateListeners.forEach((listener: (hasUpdate: boolean) => void) => {
      listener && listener(hasUpdate);
    })
  }

  notifyUpdateFailed() {
    this.updatedPath = '';

    this.onUpdateFailedListeners.forEach((listener: () => void) => {
      listener && listener();
    })
  }

  notifyUpdateReady(updatedPath: string) {
    this.updatedPath = updatedPath;

    this.onUpdateReadyListeners.forEach((listener: (updatedPath: string) => void) => {
      listener && listener(updatedPath);
    })
  }
}