/**
 * Copyright (c) Huawei Technologies Co., Ltd. 2023-2023. All rights reserved.
 * Description: Advanced API gyroscope
 * Author: 00430169
 * Create: 7/4/2023
 * Notes: N/A
 */

import { OhosSensorBase } from '../../../base/bridge/sensorBase'
import { ErrorCode } from '../../../base/util/ErrorCode'

const intervalType = [
  { label: 'game', value: 20000000 },
  { label: 'ui', value: 60000000 },
  { label: 'normal', value: 200000000 }
]

export default class ASGyroscope {
  constructor () {
    this.callBackGyroscopeSet = new Set()
  }

  onGyroscopeChange (callback) {
    return new Promise((resolve, reject) => {
      if (typeof callback !== 'function') {
        reject('param is invalid.', ErrorCode.PARAMETER_ERROR)
        return
      }
      if (this.callBackGyroscopeSet.has(callback)) {
        reject('param is invalid.', ErrorCode.PARAMETER_ERROR)
      } else {
        this.callBackGyroscopeSet.add(callback)
        resolve()
      }
    })
  }

  startGyroscope (object = {}) {
    return new Promise((resolve, reject) => {
      let value = intervalType.find(i => i.label === 'normal').value
      if (object.interval && typeof object.interval === 'string') {
        const target = intervalType.find(i => i.label === object.interval)
        if (target) {
          value = target.value
        }
      }

      OhosSensorBase.ohosSubscribeGyroscope({ intervalValue: value, callback: (data) => {
        const res = {
          x: data.x,
          y: data.y,
          z: data.z
        }
        for (const cb of this.callBackGyroscopeSet.keys()) {
          cb(res)
        }
      } })
      resolve()
    })
  }

  stopGyroscope () {
    return new Promise((resolve, reject) => {
      OhosSensorBase.ohosUnsubscribeGyroscope()
      resolve()
    })
  }
}
