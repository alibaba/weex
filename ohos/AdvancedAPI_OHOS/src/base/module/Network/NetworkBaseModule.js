import { RadioBase, netWorkConnState } from '../../bridge/radioBase'
import { WifiBase } from '../../bridge/wifiBase'
import { jsMethod } from '../../decorators/index'

export default class NetworkBaseModule {
  signalType (resultObj) {
    switch (resultObj) {
      case netWorkConnState.GSM:
      case netWorkConnState.CDMA:
        resultObj = {
          metered: true,
          type: '2G'
        }
        break
      case netWorkConnState.WCDMA:
      case netWorkConnState.TDSCDMA:
        resultObj = {
          metered: true,
          type: '3G'
        }
        break
      case netWorkConnState.LTE:
        resultObj = {
          metered: true,
          type: '4G'
        }
        break
      case netWorkConnState.NR:
        resultObj = {
          metered: true,
          type: '5G'
        }
        break
      case netWorkConnState.UNKNOWN:
        resultObj = {
          metered: true,
          type: 'none'
        }
        break
    }
    return resultObj
  }

      //  获取网络类型
      @jsMethod({ alias: 'getType', common: false, callback: true })
  async getType() {
    const linkedInfo = await WifiBase.ohoGetLinkedInfo()
    let resultObj = {
      metered: false,
      type: 'wifi'
    }
    // 板子不支持获取默认数据卡槽，打桩为0
    const defaultSlotId = 0
    return new Promise((resolve, reject) => {
      if (linkedInfo.connState === 4) {
        resolve([resultObj])
        return
      }
      RadioBase.ohoGetSignalInformation(defaultSlotId).then(data => {
        if (data && data.signalType) {
          resultObj = this.signalType(data.signalType)
          resolve([resultObj])
        } else {
          resultObj.type = 'none'
          resolve([resultObj])
        }
      }).catch(err => {
        reject([[' Failed to get type:' + err.data, err.code]])
      })
    })
  }
}
