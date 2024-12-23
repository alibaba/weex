/**
 * Copyright (c) Huawei Technologies Co., Ltd. 2022-2022. All rights reserved.
 * Description: ohos network 模块
 * Author: qianchen
 * Create: 06/06/2023
 * Notes: N/A
 */
import network from '@system.network'
export class NetworkBase {
  static ohoSubscribe(data) {
    const { callback, fail } = data
    network.subscribe({
      success: function (data) {
        console.log('[QAFAPI] success to subscribe network:' + data.metered + 'type:,' + data.type)
        if (callback) {
          callback(data)
        }
      },
      fail: function (err, code) {
        console.error('[QAFAPI] fail to subscribe network, code:' + code + ', err:' + err)
        if (fail) {
          fail(err)
        }
      }
    })
  }
}
