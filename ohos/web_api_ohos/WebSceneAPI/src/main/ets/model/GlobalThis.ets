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

import common from '@ohos.app.ability.common';

const KEY: string = 'GlobalThis';

/**
 * The GlobalThis used to build global variables.
 */
export class GlobalThis {
  private constructor() {
  }

  private static instance: GlobalThis;
  private _uiContexts = new Map<string, common.UIAbilityContext>();

  /**
   * The singleton mode for GlobalThis.
   */
  public static getInstance(): GlobalThis {
    if (!GlobalThis.instance) {
      GlobalThis.instance = new GlobalThis();
    }
    return GlobalThis.instance;
  }

  /**
   * Get the context with the key,if the key is null or undefined that the key is 'GlobalThis'.
   *
   * @param key?: string
   * @return common.UIAbilityContext | undefined
   */
  getContext(key?: string): common.UIAbilityContext | undefined {
    if (key === null || key === undefined) {
      key = KEY;
    }
    return this._uiContexts.get(key);
  }

  /**
   * Set the context with the key and UIAbilityContext,if the key is null or undefined that the key is 'GlobalThis'.
   *
   * @param key: string
   * @param value: common.UIAbilityContext
   * @return common.UIAbilityContext | undefined
   */
  setContext(value: common.UIAbilityContext, key?: string): void {
    if (key === null || key === undefined) {
      key = KEY;
    }
    this._uiContexts.set(key, value);
  }
}
