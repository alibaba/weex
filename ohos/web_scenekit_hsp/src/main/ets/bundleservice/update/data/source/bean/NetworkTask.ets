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

export enum NetworkTaskStatus {
  ACTIVE, // Requesting...
  READY, // The request is successful...
  FAILED // Request failed...
}

export class NetworkTask<T> {
  data: T | null;
  taskStatus: NetworkTaskStatus;

  constructor(data: T | null, taskStatus: NetworkTaskStatus) {
    this.data = data;
    this.taskStatus = taskStatus;
  }
}