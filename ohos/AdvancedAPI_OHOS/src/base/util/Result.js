/**
 * Copyright (c) Huawei Technologies Co., Ltd. 2022-2022. All rights reserved.
 * Description: 模块返回参数封装
 * Author: weisufang
 * Create: 03/22/2022
 * Notes: N/A
 */

import { dataToArray } from './typeTransForm'

export default class Result {
  static success (data, ignoreComplete = false, ifKeepAlive = false) {
    return { method: 'success', arguments: dataToArray(data), ignoreComplete, ifKeepAlive }
  }
  static fail (data, ignoreComplete = false, ifKeepAlive = false) {
    return { method: 'fail', arguments: dataToArray(data), ignoreComplete, ifKeepAlive }
  }
  static cancel (data, ignoreComplete = false, ifKeepAlive = false) {
    return { method: 'cancel', arguments: dataToArray(data), ignoreComplete, ifKeepAlive }
  }
  static callback (data, ignoreComplete = false, ifKeepAlive = false) {
    return { method: 'callback', arguments: dataToArray(data), ignoreComplete, ifKeepAlive }
  }
  static destroy (data, ignoreComplete = false, ifKeepAlive = false) {
    return { method: 'destroy', arguments: dataToArray(data), ignoreComplete, ifKeepAlive }
  }
}
