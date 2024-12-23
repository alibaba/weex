/**
 * Copyright (c) Huawei Technologies Co., Ltd. 2022-2022. All rights reserved.
 * Description: ohos wifi 模块
 * Author: qianchen
 * Create: 04/11/2022
 * Notes:
 */

import wifi from '@ohos.wifi'
export class WifiBase {
    static ConnState = {
      SCANNING: 0, // 设备正在搜索可用的AP
      CONNECTING: 1, // 设备正在搜索可用的AP。
      AUTHENTICATING: 2, // WLAN连接正在认证中
      OBTAINING_IPADDR: 3, // 正在获取WLAN连接的IP地址
      CONNECTED: 4, // WLAN连接已建立
      DISCONNECTING: 5, // WLAN连接正在断开
      DISCONNECTED: 6, // WLAN连接已断开
      UNKNOWN: 7// WLAN连接建立失败
    }
    static isWifiActive () {
      return wifi.isWifiActive()
    }

    static scan () {
      return wifi.scan()
    }
    static ohoGetLinkedInfo() {
      return new Promise((resolve, reject) => {
        wifi.getLinkedInfo((err, data) => {
          if (err) {
            console.log('[QAFAPI] get linked info error:' + err)
            reject(err)
          } else {
            console.log('[QAFAPI] get wifi linked info: ' + JSON.stringify(data))
            resolve(data)
          }
        })
      })
    }
    static connectionChange (cb) {
      wifi.on('wifiConnectionChange', cb)
    }

    static StateType = {
      OFF: 0,
      ON: 1
    }

    static scanStateChange (cb) {
      wifi.on('wifiScanStateChange', cb)
    }

    static ScanState = {
      SUCCESS: 1,
      FAIL: 0
    }

    static getScanInfos () {
      return new Promise((resolve, reject) => {
        wifi.getScanInfos().then(scanResult => {
          resolve(scanResult)
        }).catch(error => {
          console.info('[QAFAPI] getScanInfos error ' + JSON.stringify(error))
          reject(error)
        })
      })
    }
}
