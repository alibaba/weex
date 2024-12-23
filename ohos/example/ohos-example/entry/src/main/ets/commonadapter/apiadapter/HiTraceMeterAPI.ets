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

import { ApiOptions } from 'WebSceneKitHsp';
import hitrace from '@ohos.hiTraceMeter';

export class HiTraceMeterAPI {
  /**
   * Marks the beginning of a pre-tracking time-consuming task.
   * taskId is the ID used to indicate the association in the trace.
   * If multiple tasks with the same name are executed concurrently,
   * the taskId of each call to startTrace is different.
   * If tasks with the same name are executed in serial mode, the task IDs can be the same.
   *
   * @param name
   * @param taskId
   */
  startTrace(options: ApiOptions) {
    const args: TraceParams = JSON.parse(options.args);
    let name: string = args.name;
    let taskId: number = args.taskId;
    hitrace.startTrace(name, taskId);
  }

  /**
   * The values of name and taskId must be the same as those of hiTraceMeter.startTrace.
   *
   * @param name
   * @param taskId
   */
  finishTrace(options: ApiOptions) {
    const args: TraceParams = JSON.parse(options.args);
    let name: string = args.name;
    let taskId: number = args.taskId;
    hitrace.finishTrace(name, taskId);
  }

  /**
   * It is used to mark a pre-tracking numeric variable.
   * The value of the variable changes continuously.
   *
   * @param name
   * @param value
   */
  traceByValue(options: ApiOptions) {
    const args: TraceParams = JSON.parse(options.args);
    let name: string = args.name;
    let value: number = args.value;
    hitrace.traceByValue(name, value);
  }
}

interface TraceParams{
  name: string
  taskId: number
  value: number
}