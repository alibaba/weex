import { jsMethod } from '../../decorators'
import { WifiBase } from '../../bridge/wifiBase'
import { ErrorCode, WifiErrorCode } from '../../util/ErrorCode'

export class WifiBaseModule {
  constructor() {
    this.SecureType = {
      WPA: 'wpa',
      WEP: 'wep',
    }
  }
  isSecure(capabilities = '') {
    let result = false
    capabilities = capabilities.toLowerCase()
    if (
      capabilities.includes(this.SecureType.WPA) ||
      capabilities.includes(this.SecureType.WEP)
    ) {
      result = true
    }
    return result
  }

  getSignalStrength(value) {
    return value + 100
  }

  @jsMethod({ alias: 'scan', common: false })
  scan() {
    return new Promise((resolve, reject) => {
      if (!WifiBase.isWifiActive()) {
        reject([['wifi not turned on', WifiErrorCode.WIFI_NOT_TURNED_ON]])
        return
      }
      const isScan = WifiBase.scan()
      if (isScan) {
        resolve([['scan success']])
      } else {
        reject([['scan fail', WifiErrorCode.WIFI_NOT_TURNED_ON]])
      }
    })
  }

  @jsMethod({ alias: 'getConnectedWifi', common: false })
  getConnectedWifi(partialInfo) {
    return new Promise((resolve, reject) => {
      if (!WifiBase.isWifiActive()) {
        reject([['wifi not turned on', WifiErrorCode.WIFI_NOT_TURNED_ON]])
        return
      }

      WifiBase.ohoGetLinkedInfo().then(async (wifiInfo) => {
        if (wifiInfo.connState === WifiBase.ConnState.DISCONNECTED) {
          reject([['wifi is not connected', ErrorCode.COMMON_ERROR]])
          return
        }

        if (partialInfo) {
          const result = {
            SSID: wifiInfo.ssid,
          }
          resolve([[result]])
          return
        }

        const result = {
          BSSID: wifiInfo.bssid,
          SSID: wifiInfo.ssid,
          frequency: wifiInfo.frequency,
          signalStrength: this.getSignalStrength(wifiInfo.rssi),
          secure: false,
        }

        let capabilities
        const scanLists = await WifiBase.getScanInfos()
        const length = scanLists.length
        for (let i = 0; i < length; i++) {
          if (
            scanLists[i].bssid === result.BSSID &&
            scanLists[i].ssid === result.SSID
          ) {
            capabilities = scanLists[i].capabilities
            break
          }
        }
        if (capabilities) {
          result.secure = this.isSecure(capabilities)
        }
        resolve([[result]])
      })
    })
  }
}
