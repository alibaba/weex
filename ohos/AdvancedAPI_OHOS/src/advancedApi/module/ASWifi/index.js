
/**
  * Copyright (c) Huawei Technologies Co., Ltd. 2022-2022. All rights reserved.
  * Description: default description
  * Author: weisufang
  * Create: 04/10/2023
  * 需要权限:
  * ohos.permission.LOCATION
  * ohos.permission.GET_WIFI_INFO
  * ohos.permission.SET_WIFI_INFO
  * ohos.permission.MANAGE_WIFI_CONNECTION
  * ohos.permission.GET_WIFI_INFO_INTERNAL
  * ohos.permission.SET_WIFI_CONFIG
  */

import wifi from '@ohos.wifi'
import { WifiBase } from '../../../base/bridge/wifiBase'
import { WifiBaseModule } from '../../../base/module/Wifi/WifiBaseModule'
import { isString } from '../../../base/util/checkDataType'
import { ErrorCode, WifiErrorCode } from '../../../base/util/ErrorCode'

// eslint-disable-next-line no-unused-vars
const WIFI_ERR_CODE = {
  OK: 0, // 正常
  NOT_INIT: 12000, // 未先调用 startWifi 接口
  NOT_SUPPORT: 12001, // 当前系统不支持相关能力
  ERR_PASSWORD: 12002, // 密码错误
  NOT_TURN_ON: 12005, // Android 特有，未打开 Wi-Fi 开关
  CONFIG_EXPIPIRED: 12013 // 系统保存的 Wi-Fi 配置过期，建议忘记 Wi-Fi 后重试，仅 Android 支持
}

export default class ASWifi extends WifiBaseModule {
  constructor() {
    super()
    this.connectCallbacks = []
    this.connectWithPartialInfo = []
    this._connectByNetId = []
    this.wifiScanCallbacks = []
    this.connectionChange()
    this.scanChange()
  }

  /**
   * 初始化Wi-Fi模块
   * @param {function} success - 接口调用成功的回调函数
   * @param {function} fail - 接口调用失败的回调函数
   * @param {function} complete - 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  startWifi (params) {
    return new Promise((resolve, reject) => {
      if (wifi.isWifiActive()) {
        console.debug('[AdvancedAPI] enableWifi success')
        resolve()
      } else {
        if (wifi.enableWifi()) {
          console.debug('[AdvancedAPI] enableWifi success')
          resolve()
        } else {
          console.debug('[AdvancedAPI] enableWifi fail')
          reject(['wifi not turned on', WifiErrorCode.WIFI_NOT_TURNED_ON])
        }
      }
    })
  }

  /**
   * 关闭 Wi-Fi 模块
   * @param {function} success - 接口调用成功的回调函数
   * @param {function} fail - 接口调用失败的回调函数
   * @param {function} complete - 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  stopWifi () {
    return new Promise((resolve, reject) => {
      if (!wifi.isWifiActive()) {
        console.debug('[AdvancedAPI] stopWifi success')
        resolve()
      } else {
        if (wifi.disableWifi()) {
          console.debug('[AdvancedAPI] stopWifi success')
          resolve()
        } else {
          console.debug('[AdvancedAPI] stopWifi fail')
          reject(['system not support', ErrorCode.COMMON_ERROR])
        }
      }
    })
  }

  /**
   * 获取已连接的 Wi-Fi 信息
   * @param {boolean} partialInfo - 是否需要返回部分 Wi-Fi 信息
   * @param {function} success - 接口调用成功的回调函数
   * @param {function} fail - 接口调用失败的回调函数
   * @param {function} complete - 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  getConnectedWifi (params = {}) {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line no-unused-vars
      const { partialInfo = false } = params
      super.getConnectedWifi(partialInfo).then(([[wifi]]) => {
        resolve({ wifi: wifi })
      }, (err) => {
        reject(...err)
      })
    })
  }

  /**
   * 请求获取 Wi-Fi 列表。wifiList 数据会在 onGetWifiList 注册的回调中返回。
   * @param {function} success - 接口调用成功的回调函数
   * @param {function} fail - 接口调用失败的回调函数
   * @param {function} complete - 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  getWifiList (params) {
    return new Promise((resolve, reject) => {
      super.scan().then(([data = []] = []) => {
        resolve(...data)
      }, (err) => {
        reject(...err)
      })
    })
  }

  /**
   * 监听获取到 Wi-Fi 列表数据事件。
   * @param {function} 获取到 Wi-Fi 列表数据事件的监听函数
   */
  onGetWifiList (callback) {
    if (typeof callback !== 'function') {
      console.error('[AdvancedAPI] param is invalid.')
      return
    }
    this.wifiScanCallbacks.push(callback)
  }

  /**
   * 移除获取到 Wi-Fi 列表数据事件的监听函数。不支持移除某个监听函数
   * @param {function} 传入的监听函数。不传此参数则移除所有监听函数。
   */
  offGetWifiList (callback) {
    const index = this.wifiScanCallbacks.indexOf(callback)
    if (index >= 0) {
      this.wifiScanCallbacks.splice(index, 1)
    } else {
      this.wifiScanCallbacks = []
    }
  }

  /**
   * 连接 Wi-Fi。若已知 Wi-Fi 信息，可以直接利用该接口连接。
   * @param {string} SSID Wi-Fi 设备 SSID
   * @param {string} BSSID Wi-Fi 设备 BSSID
   * @param {string} password Wi-Fi 设备密码
   * @param {boolean} maunal 跳转到系统设置页进行连接
   * @param {boolean} partialInfo 是否需要返回部分 Wi-Fi 信息
   * @param {function} success - 接口调用成功的回调函数
   * @param {function} fail - 接口调用失败的回调函数
   * @param {function} complete - 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  connectWifi (params) {
    return new Promise(async (resolve, reject) => {
      // eslint-disable-next-line no-unused-vars
      const { SSID, BSSID = '', password = '', maunal = false, partialInfo = false } = params
      if (!isString(SSID)) {
        console.error('[AdvancedAPI] connectWifi invalid SSID')
        reject(['wifi SSID error', WifiErrorCode.PASSWORD_ERROR])
        return
      }
      if (!isString(BSSID)) {
        console.error('[AdvancedAPI] connectWifi invalid BSSID')
        reject(['wifi BSSID error', WifiErrorCode.PASSWORD_ERROR])
        return
      }
      if (!isString(password)) {
        console.error('[AdvancedAPI] connectWifi invalid password')
        reject(['wifi password error', WifiErrorCode.PASSWORD_ERROR])
        return
      }

      try {
        const connectedInfo = await this.getConnectedWifi()
        if (connectedInfo.wifi.SSID === SSID) {
          resolve()
          return
        }
      } catch (e) {
        // 如果当前没有已连接上的wifi不影响
        console.debug('[AdvancedAPI] wifi is not connected.')
      }

      try {
        const netId = await wifi.addDeviceConfig({
          ssid: SSID,
          bssid: BSSID,
          preSharedKey: password,
          securityType: 3,
          isHiddenSsid: false
        })
        console.debug('[AdvancedAPI] addDeviceConfig success netId = %d', netId)
        this._connectByNetId.push(result => {
          const wifiInfo = result.wifi
          if (wifiInfo.SSID === SSID) {
            resolve()
          } else {
            reject()
          }
        })
        if (maunal) { // TODO: 跳转到设置wlan页面连接
          console.error('[AdvancedAPI] 不支持跳转系统wlan页面')
          return
        } else {
          wifi.connectToNetwork(netId)
        }
      } catch (err) {
        console.error('[AdvancedAPI] connectWifi addDeviceConfig fail err = ' + err)
        reject(['system not support', ErrorCode.COMMON_ERROR])
      }
    })
  }

  /**
   * 监听连接上 Wi-Fi 的事件。
   * @param {function} 连接上 Wi-Fi 的事件的监听函数
   */
  onWifiConnected (callback) {
    if (typeof callback !== 'function') {
      console.error('[AdvancedAPI] param is invalid.')
      return
    }
    this.connectCallbacks.push(callback)
  }

  /**
   * 移除连接上 Wi-Fi 的事件的监听函数。
   * @param {function} 传入的监听函数。不传此参数则移除所有监听函数。
   */
  offWifiConnected (callback) {
    const index = this.connectCallbacks.indexOf(callback)
    if (index >= 0) {
      this.connectCallbacks.splice(index, 1)
    } else {
      this.connectCallbacks = []
    }
  }

  // wifi连接回调
  connectionChange () {
    WifiBase.connectionChange(state => {
      if (state === WifiBase.StateType.ON) {
        this.getConnectedWifi().then(({ wifi }) => {
          wifi.state = WifiBase.StateType.ON
          this.triggerConnectCallbacks({ wifi })
          this.triggerConnectWithPartialInfo({ wifi })
          this.triggerConnectById({ wifi })
        }, () => {
          const wifi = {
            'BSSID': '',
            'signalStrength': 0,
            'state': WifiBase.StateType.ON,
            'secure': false,
            'SSID': ''
          }
          this.triggerConnectCallbacks({ wifi })
          this.triggerConnectWithPartialInfo({ wifi })
        })
      } else if (state === WifiBase.StateType.OFF) {
        const wifi = {
          'BSSID': '',
          'signalStrength': 0,
          'state': WifiBase.StateType.OFF,
          'secure': false,
          'SSID': ''
        }
        this.triggerConnectCallbacks({ wifi })
        this.triggerConnectWithPartialInfo({ wifi })
      }
    })
  }

  // wifi扫描回调
  scanChange () {
    WifiBase.scanStateChange(isScan => {
      if (isScan === WifiBase.ScanState.SUCCESS) {
        WifiBase.getScanInfos().then(wifiInfos => {
          console.debug('[AdvancedAPI] onGetWifiList getScanInfos success')
          const wifiList = wifiInfos.map(item => {
            return {
              BSSID: item.bssid,
              SSID: item.ssid,
              frequency: item.frequency,
              signalStrength: super.getSignalStrength(item.rssi),
              secure: super.isSecure(item.capabilities)
            }
          })
          this.triggerScanCallbacks({ wifiList })
        })
      }
    })
  }

  triggerConnectCallbacks (result) {
    console.debug('[AdvancedAPI] triggerConnectCallbacks')
    result.errMsg = 'onWifiConnected:ok'
    result.errCode = 0
    this.connectCallbacks.forEach(cb => {
      cb(result)
    })
  }

  triggerConnectById (result) {
    console.debug('[AdvancedAPI] triggerConnectById')
    this._connectByNetId.forEach(cb => {
      cb(result)
    })
    this._connectByNetId = []
  }

  triggerScanCallbacks (result) {
    console.debug('[AdvancedAPI] wifiScanCallbacks')
    this.wifiScanCallbacks.forEach(cb => {
      cb(result)
    })
  }

  /**
   * 监听连接上 Wi-Fi 的事件。
   * @param {function} 连接上 Wi-Fi 的事件的监听函数
   */
  onWifiConnectedWithPartialInfo (callback) {
    if (typeof callback !== 'function') {
      console.error('[AdvancedAPI] param is invalid.')
      return
    }
    this.connectWithPartialInfo.push(callback)
  }

  /**
   * 移除连接上 Wi-Fi 的事件的监听函数。
   * @param {function} 传入的监听函数。不传此参数则移除所有监听函数。
   */
  offWifiConnectedWithPartialInfo (callback) {
    const index = this.connectWithPartialInfo.indexOf(callback)
    if (index >= 0) {
      this.connectWithPartialInfo.splice(index, 1)
    } else {
      this.connectWithPartialInfo = []
    }
  }

  triggerConnectWithPartialInfo (result) {
    console.debug('[AdvancedAPI] triggerConnectWithPartialInfo')
    const wifi = { SSID: result.wifi.SSID }
    this.connectWithPartialInfo.forEach(cb => {
      cb({ wifi })
    })
  }
}
