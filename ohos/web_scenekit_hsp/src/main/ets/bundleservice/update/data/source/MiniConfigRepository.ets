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

import { MiniConfig } from './bean/MiniConfig';
import { MiniConfigNetworkDataSource } from './network/MiniConfigNetworkDataSource';
import { NetworkTask } from './bean/NetworkTask';

export class MiniConfigRepository {
  private miniConfigNetworkDataSource: MiniConfigNetworkDataSource;

  constructor() {
    this.miniConfigNetworkDataSource = new MiniConfigNetworkDataSource();
  }

  async fetchMiniConfig(localVersion: string): Promise<MiniConfig> {
    const networkTask: NetworkTask<MiniConfig> = await this.miniConfigNetworkDataSource.fetchMiniConfig(localVersion);
    const miniConfig: MiniConfig = networkTask.data ?? new MiniConfig(false);
    if (!miniConfig.downloadUrl) {
      miniConfig.hasUpdate = false;
    }
    return miniConfig;
  }
}