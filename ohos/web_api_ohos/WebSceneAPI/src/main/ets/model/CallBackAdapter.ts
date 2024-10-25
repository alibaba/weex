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

const SUCCESS_CODE: number = 11111;

/**
 * The callback adapter.
 *
 * @param target: Object
 * @param propertyKey: string
 * @param descriptor: PropertyDescriptor
 */
export function CallBackAdapter(target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
  let originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    let completeCb = args[0].complete;
    if ((args[0].success === undefined && args[0].fail !== undefined)
      || (args[0].success !== undefined && args[0].fail === undefined)) {
      console.error("param error, success and fail callbacks is necessary, or neither of them.");
      return;
    }
    args[0].complete = (status: number, message: string, data?) => {
      if (typeof completeCb === 'function') {
        completeCb.apply(null, [status, message, data]);
      }
      if (status === SUCCESS_CODE) {
        if (typeof (args[0].success) === 'function') {
          args[0].success.apply(null, [status, message, data]);
        }
      } else {
        if (typeof (args[0].fail) === 'function') {
          args[0].fail.apply(null, [status, message, data]);
        }
      }
    }
    let result = originalMethod.apply(this, args);
    return result;
  };
}