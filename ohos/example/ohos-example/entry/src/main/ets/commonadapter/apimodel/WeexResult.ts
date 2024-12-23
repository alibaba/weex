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

export class WeexResult<T> {
  status: number;
  statusMessage: string;
  data?: T;

  constructor(status: number, statusMessage: string, data?: T) {
    this.status = status;
    this.statusMessage = statusMessage;
    this.data = data;
  }
}

export class WeexProxyResult<T> {
  result: ResultStr;
  data?: T;

  constructor(result: ResultStr, data?: T) {
    this.result = result;
    this.data = data;
  }
}

export enum ResultStr {
  SUCCESS = 'success',
  FAIL = 'fail',
  CANCEL='cancel'
}