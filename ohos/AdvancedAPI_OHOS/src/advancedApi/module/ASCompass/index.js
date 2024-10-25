/**
 * Copyright (c) Huawei Technologies Co., Ltd. 2023-2023. All rights reserved.
 * Description: Advanced API Compass
 * Author: 00430169
 * Create: 7/4/2023
 * Notes: N/A
 */

import { OhosSensorBase } from '../../../base/bridge/sensorBase'
import { ErrorCode } from '../../../base/util/ErrorCode'

export default class ASCompass {
  constructor () {
    this.callBackCompassSet = new Set()
  }

  onCompassChange (callback) {
    return new Promise(async (resolve, reject) => {
      if (typeof callback !== 'function') {
        reject('param is invalid.', ErrorCode.PARAMETER_ERROR)
        return
      }
      if (this.callBackCompassSet.has(callback)) {
        reject('param is invalid.', ErrorCode.PARAMETER_ERROR)
      } else {
        this.callBackCompassSet.add(callback)
        OhosSensorBase.ohosSubscribeCompass({ callback: (data) => {
          const accuracy = 3 // 高精度
          const res = {
            direction: data.alpha,
            accuracy: data.alpha ? accuracy : 0
          }
          for (const cb of this.callBackCompassSet.keys()) {
            cb(res)
          }
        } })
        resolve()
      }
    })
  }

  offCompassChange (callback) {
    return new Promise(async (resolve, reject) => {
      if (typeof callback !== 'function') {
        // compass off change默认不传参数时不取消所有监听
        reject('param is invalid.', ErrorCode.PARAMETER_ERROR)
        return
      }
      if (!this.callBackCompassSet.has(callback)) {
        reject('param is invalid.', ErrorCode.PARAMETER_ERROR)
      } else {
        this.callBackCompassSet.delete(callback)
        if (this.callBackCompassSet.size === 0) {
          OhosSensorBase.ohosUnsubscribeCompass()
        }
        resolve('success')
      }
    })
  }

  startCompass (object) {
    return new Promise(async (resolve, reject) => {
      OhosSensorBase.ohosSubscribeCompass({
        callback: (data) => {
          const accuracy = 3 // 高精度
          const res = {
            direction: data.alpha,
            accuracy: data.alpha ? accuracy : 0
          }
          for (const cb of this.callBackCompassSet.keys()) {
            cb(res)
          }
        }
      })
      resolve('success')
    })
  }

  stopCompass () {
    return new Promise(async (resolve, reject) => {
      OhosSensorBase.ohosUnsubscribeCompass()
      resolve('success')
    })
  }
}
