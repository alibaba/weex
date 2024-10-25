/**
  * Copyright (c) Huawei Technologies Co., Ltd. 2022-2022. All rights reserved.
  * Description: default description
  * Author: weisufang
  * Create: 04/12/2023
  * 需要权限: ohos.permission.VIBRATE
  */

import vibrator from '@ohos.vibrator'

export default class ASVibrator {
  /**
   * 使手机发生振动。
   * @param {function} success - 接口调用成功的回调函数
   * @param {function} fail - 接口调用失败的回调函数
   * @param {function} complete - 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  vibrate () {
    return new Promise((resolve, reject) => {
      this.triggerVibrate({ duration: 200 }).then(data => {
        resolve(data)
      }).catch(err => {
        reject([err.data, err.code])
      })
    })
  }

  /**
   * 使手机发生较长时间的振动（400ms）
   * @param {function} success - 接口调用成功的回调函数
   * @param {function} fail - 接口调用失败的回调函数
   * @param {function} complete - 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  vibrateLong () {
    return new Promise((resolve, reject) => {
      this.triggerVibrate({ duration: 400 }).then(data => {
        resolve(data)
      }).catch(err => {
        reject([err.data, err.code])
      })
    })
  }

  /**
   * 使手机发生较短时间的振动（15ms）
   * @param {function} success - 接口调用成功的回调函数
   * @param {function} fail - 接口调用失败的回调函数
   * @param {function} complete - 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  vibrateShort () {
    return new Promise((resolve, reject) => {
      this.triggerVibrate({ duration: 15 }).then(data => {
        resolve(data)
      }).catch(err => {
        reject([err.data, err.code])
      })
    })
  }

  triggerVibrate (params) {
    return new Promise((resolve, reject) => {
      const effect = {
        type: 'time',
        duration: params.duration
      }
      const attribute = {
        id: 0,
        usage: 'alarm'
      }
      vibrator.startVibration(effect, attribute).then(data => {
        console.debug('[AdvancedAPI] startVibration success')
        resolve(data)
      }, (err) => {
        console.error(`[AdvancedAPI] startVibration fail err = ${JSON.stringify(err)}`)
        reject(err)
      }).catch((err) => {
        console.error(`[AdvancedAPI] startVibration fail err = ${JSON.stringify(err)}`)
        reject(err)
      })
    })
  }
}
