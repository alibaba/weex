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

import { LocalVersionInfo } from './bean/LocalVersionInfo';
import { MiniLocalFileDataSource } from './local/MiniLocalFileDataSource';
import { MiniRawFileDataSource } from './local/MiniRawFileDataSource';
import { MiniNetworkDataSource } from './network/MiniNetworkDataSource';

export class MiniRepository {
  private miniNetworkDataSource: MiniNetworkDataSource;
  private miniLocalFileDataSource: MiniLocalFileDataSource;
  private miniRawFileDataSource: MiniRawFileDataSource;

  constructor() {
    this.miniNetworkDataSource = new MiniNetworkDataSource();
    this.miniLocalFileDataSource = new MiniLocalFileDataSource();
    this.miniRawFileDataSource = new MiniRawFileDataSource();
  }

  getLastMiniVersion(context: Context): LocalVersionInfo {
    return this.miniLocalFileDataSource.getLastMiniVersion(context);
  }

  async downloadMini(context: Context, version: number, miniDownloadUrl: string): Promise<string> {
    let tempPath = await this.miniNetworkDataSource.fetchMini(context, version, miniDownloadUrl);
    if (tempPath == null) {
      return '';
    }
    // Decompress and cache.
    let unzipPath = await this.miniLocalFileDataSource.saveAndUnzip(context, version, tempPath);
    return unzipPath;
  }
}