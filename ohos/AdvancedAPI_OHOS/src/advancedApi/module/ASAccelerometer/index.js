/**
 * Copyright (c) Huawei Technologies Co., Ltd. 2023-2023. All rights reserved.
 * Description: Advanced API Storage
 * Author: 00430169
 * Create: 6/4/2023
 * Notes: N/A
 */

import { OhosSensorBase } from '../../../base/bridge/sensorBase'
import { ErrorCode } from '../../../base/util/ErrorCode'

const intervalType = [
  { label: 'game', value: 20000000 },
  { label: 'ui', value: 60000000 },
  { label: 'normal', value: 200000000 }
]

export default class ASAccelerometer {
  constructor () {
    this.callBackSet = new Set()
    this.defaultInterval = 'normal'
  }

  onAccelerometerChange (callback) {
    return new Promise((resolve, reject) => {
      if (typeof callback !== 'function') {
        reject('param is invalid.', ErrorCode.PARAMETER_ERROR)
        return
      }
      if (this.callBackSet.has(callback)) {
        reject('param is invalid.', ErrorCode.PARAMETER_ERROR)
      } else {
        this.callBackSet.add(callback)
        const value = intervalType.find(i => i.label === this.defaultInterval).value
        OhosSensorBase.ohosSubscribeAccelerometer({ interval: value, callback: (data) => {
          const res = {
            x: data.x,
            y: data.y,
            z: data.z
          }
          for (const cb of this.callBackSet.keys()) {
            cb(res)
          }
        } })
        resolve()
      }
    })
  }

  offAccelerometerChange (callback) {
    return new Promise((resolve, reject) => {
      if (typeof callback !== 'function') {
        this.callBackSet.clear()
        OhosSensorBase.ohosUnsubscribeAccelerometer()
        resolve()
        return
      }
      if (!this.callBackSet.has(callback)) {
        reject('param is invalid.', ErrorCode.COMMON_ERROR)
      } else {
        this.callBackSet.delete(callback)
        if (this.callBackSet.size === 0) {
          OhosSensorBase.ohosUnsubscribeAccelerometer()
        }
        resolve()
      }
    })
  }

  startAccelerometer (object) {
    return new Promise((resolve, reject) => {
      let value = intervalType.find(i => i.label === this.defaultInterval).value
      if (object.interval && (typeof object.interval === 'string')) {
        const target = intervalType.find(i => i.label === object.interval)
        if (target) {
          value = target.value
        }
      }
      OhosSensorBase.ohosSubscribeAccelerometer({ interval: value, callback: (data) => {
        const res = {
          x: data.x,
          y: data.y,
          z: data.z
        }
        for (const cb of this.callBackSet.keys()) {
          cb(res)
        }
      } })
      resolve()
    })
  }

  stopAccelerometer () {
    return new Promise((resolve, reject) => {
      OhosSensorBase.ohosUnsubscribeAccelerometer()
      resolve()
    })
  }
}
