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

import versionCompare from '../bean/CompareVersion';

export class UpdateConfig {
  private static instance: UpdateConfig;
  private urlFunc = (version: string) => {
    return '';
  }
  private initialVersion: string = '0';
  private compareVersionFunc: (a: string, b: string) => boolean = versionCompare;

  private constructor() {
  }

  public static getInstance(): UpdateConfig {
    if (!UpdateConfig.instance) {
      UpdateConfig.instance = new UpdateConfig();
    }
    return UpdateConfig.instance;
  }

  getInitialVersion(): string {
    return this.initialVersion;
  }

  getUrl(version: string): string {
    return this.urlFunc(version);
  }

  getCompareVersionFunc(): (a: string, b: string) => boolean {
    return this.compareVersionFunc;
  }

  setup(initialVersion: string, getUrlFunc: (version: string) => string, compareVersionFunc = versionCompare): void {
    this.urlFunc = getUrlFunc;
    this.initialVersion = initialVersion;
    this.compareVersionFunc = compareVersionFunc;
  }
}