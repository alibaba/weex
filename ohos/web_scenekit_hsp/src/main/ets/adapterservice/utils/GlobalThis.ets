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

/**
 * Stores global information and constructs singleton objects.
 */
export class GlobalThis {
  private constructor() {
  }

  private static instance: GlobalThis;
  private _uiContexts = new Map<string, Context>();

  public static getInstance(): GlobalThis {
    if (!GlobalThis.instance) {
      GlobalThis.instance = new GlobalThis();
    }
    return GlobalThis.instance;
  }

  getContext(key: string): Context | undefined {
    return this._uiContexts.get(key);
  }

  setContext(key: string, value: Context): void {
    this._uiContexts.set(key, value);
  }
}