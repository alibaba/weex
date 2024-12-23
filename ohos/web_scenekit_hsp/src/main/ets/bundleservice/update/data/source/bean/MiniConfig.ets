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

export class MiniConfig {
  hasUpdate: boolean;
  lastVersion: number;
  downloadUrl: string;

  constructor(hasUpdate: boolean = false, lastVersion: number = -1, downloadUrl: string = '') {
    this.hasUpdate = hasUpdate;
    this.lastVersion = lastVersion;
    this.downloadUrl = downloadUrl;
  }
}