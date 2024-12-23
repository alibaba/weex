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

import AppContext from '@ohos.app.ability.common';
import { Constant } from '../../webrouterservice/common/constant/Constant';
import { FileUtils } from './FileUtils';
import { LocalVersionInfo } from './data/source/bean/LocalVersionInfo';
import { MiniConfigRepository } from './data/source/MiniConfigRepository';
import { MiniRepository } from './data/source/MiniRepository';
import { UpdateManager } from './UpdateManager';

class LocalUpdateManager extends UpdateManager {
  private miniConfigRepository: MiniConfigRepository;
  private miniRepository: MiniRepository;
  private localVersionInfo: LocalVersionInfo;

  constructor() {
    super();
    this.miniConfigRepository = new MiniConfigRepository();
    this.miniRepository = new MiniRepository();
    this.localVersionInfo = new LocalVersionInfo();
  }

  useSandboxCacheResource(url: string, fakeDomain: string): WebResourceResponse | null {
    const localLastPath = this.localVersionInfo.path;
    if (fakeDomain) {
      // This step is related to the hot update of the directory structure of the latest version.
      // If the entry file of the hot update resource is the same as that before the update,
      // the if statement is not required.
      let path: string | undefined = url?.replace(fakeDomain, '');
      path = path.replace(Constant.URL_HARD_RESOURCE, '');

      const position = path.indexOf(Constant.QUESTION_MARK);
      if (position !== -1) {
        path = path.substring(0, position);
      }

      // The local cache is used.
      if (path && FileUtils.fileExist(localLastPath, path)) {
        return FileUtils.getFileOnResponseWeb(localLastPath, path);
      }
    }
    return null;
  }

  getLastVersionPath() {
    return this.localVersionInfo.path;
  }

  gteLastVersion() {
    return this.localVersionInfo.localVersion;
  }

  async updateMiniOnLaunch(context: AppContext.UIAbilityContext) {
    this.reset(context);

    // Obtain the latest version number on the local host.
    let lastVersionInfo = this.miniRepository.getLastMiniVersion(context);
    this.localVersionInfo = lastVersionInfo;

    const miniConfig = await this.miniConfigRepository.fetchMiniConfig(this.localVersionInfo.localVersion);
    // Notify registered listeners
    this.notifyCheckForUpdate(miniConfig.hasUpdate);
    // The local path is returned if no update is performed.
    if (miniConfig.hasUpdate) {
      // Request applet resource.
      const unzipPath = await this.miniRepository.downloadMini(context, miniConfig.lastVersion, miniConfig.downloadUrl);
      if (unzipPath === '') {
        this.notifyUpdateFailed();
      } else {
        this.notifyUpdateReady(unzipPath);
      }
    }
  }
}

export const LocalUpdateManagerInstance: LocalUpdateManager = new LocalUpdateManager()