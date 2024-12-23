/**
 * Copyright (c) Huawei Technologies Co., Ltd. 2022-2022. All rights reserved.
 * Description: ohos radio 模块
 * Author: shenrui
 * Create: 04/11/2022
 * Notes: N/A
 */

import radio from '@ohos.telephony.radio'

// 网络类型
export const netWorkConnState = {
  UNKNOWN: 0, // 未知网络类型。
  GSM: 1, // 网络类型为GSM（Global System For Mobile Communication）。
  CDMA: 2, // 网络类型为CDMA（Code Division Multiple Access）。
  WCDMA: 3, // 网络类型为WCDMA（Wideband Code Division Multiple Access）。
  TDSCDMA: 4, // 网络类型为TDSCDMA（TimeDivision-Synchronous Code Division Multiple Access）。
  LTE: 5, // 网络类型为LTE（Long Term Evolution）。
  NR: 6 // 网络类型为5G NR（New Radio）
}

export class RadioBase {
  static ohoGetSignalInformation(slotId) {
    return new Promise((resolve, reject) => {
      radio.getSignalInformation(slotId, (err, data) => {
        if (err) {
          console.log('[QAFAPI] Failed to get signal information Data. Cause:' + JSON.stringify(err))
          reject(err)
        } else {
          console.log('[QAFAPI] Success to get signal information Data:' + JSON.stringify(data))
          resolve(data)
        }
      })
    })
  }

  static ohoIsNrSupported(slotId) {
    try {
      const result = radio.isNrSupported(slotId)
      return result
    } catch (err) {
      console.error('[QAFAPI] Failed get is supported 5G:' + err)
    }
  }
}
