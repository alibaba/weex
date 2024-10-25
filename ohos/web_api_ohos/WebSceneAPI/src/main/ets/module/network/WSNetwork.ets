/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { BusinessError } from '@ohos.base';
import connection from '@ohos.net.connection';
import data from '@ohos.telephony.data';
import radio from '@ohos.telephony.radio';
import wifiManager from '@ohos.wifiManager';
import BusinessConstants from '../../common/constants/BusinessConstants';
import { CallBackAdapter } from '../../model/CallBackAdapter';
import { CommonConfig } from '../../common/entity/CommonConfig';
import Log from '../../common/log/Log';
import { StatusCode } from '../../common/entity/StatusCode';

const TAG: string = 'WSMedia';

/**
 * The network management class provides network operation methods.
 *
 */
export class WSNetwork {
  /**
   * Get Network Information.
   *
   * @param {CommonConfig<NetworkInfo>} networkEvent Result callback.
   */
  @CallBackAdapter
  public getNetworkInfo(networkEvent: CommonConfig<NetworkInfo>) {
    wifiManager.getLinkedInfo((err: BusinessError, wifiResult: wifiManager.WifiLinkedInfo) => {
      if (err && err.code !== BusinessConstants.WIFI_CLOSE_CODE) {
        Log.error(TAG, 'Get wifi linked info error: ' + err.code);
        networkEvent.complete(StatusCode.FAIL, err.message);
        return;
      } else if (wifiResult.ssid.length === 0) {
        let defaultSlot = data.getDefaultCellularDataSlotIdSync();
        if (defaultSlot === -1) {
          Log.error(TAG, 'The defaultSlot is not found.');
          networkEvent.complete(StatusCode.SUCCESS, StatusMsg.NO_NETWORK, new NetworkInfo(BusinessConstants.NO_NETWORK));
          return;
        }
        let promise = radio.getSignalInformation(defaultSlot);
        promise.then((data: radio.SignalInformation[]) => {
          let signalInformation: radio.SignalInformation = data[0];
          let netType: string = this.getSignalType(signalInformation?.signalType);
          connection.getDefaultNet().then((netHandle: connection.NetHandle) => {
            connection.getConnectionProperties(netHandle).then((data: connection.ConnectionProperties) => {
              let networkInfo: NetworkInfo = new NetworkInfo(netType);
              let linkAddressesArray: Array<connection.LinkAddress> = data?.linkAddresses;
              if (linkAddressesArray.length === 0) {
                Log.error(TAG, 'Link addresses array is empty.');
                networkEvent.complete(StatusCode.FAIL, StatusMsg.FAIL);
                return;
              }
              let netAddress: connection.NetAddress = linkAddressesArray[0]?.address;
              if (!netAddress) {
                Log.error(TAG, 'Net address is null.');
                networkEvent.complete(StatusCode.FAIL, StatusMsg.FAIL);
                return;
              }
              networkInfo.networkIP = netAddress?.address;
              networkEvent.complete(StatusCode.SUCCESS, StatusMsg.SUCCESS, networkInfo);
              return;
            });
          });
        }).catch((err: BusinessError) => {
          Log.error(TAG, 'Get signal information error: ' + err.code);
          networkEvent.complete(StatusCode.FAIL, err.message);
          return;
        });
      }
      let networkInfo: NetworkInfo = new NetworkInfo(BusinessConstants.WIFI,
        this.ipDecimalToHost(wifiResult.ipAddress), wifiResult.ssid);
      networkEvent.complete(StatusCode.SUCCESS, StatusMsg.SUCCESS, networkInfo);
    });
  }

  private ipDecimalToHost(ipDecimal: number): string {
    let ipString = String(ipDecimal % BusinessConstants.IP_CODE);
    for (let i = BusinessConstants.DEFAULT_VALUE; i <= BusinessConstants.NUMBER_OF_CYCLES; i++) {
      ipDecimal = Number.parseInt(String(ipDecimal / BusinessConstants.IP_CODE));
      ipString = String(ipDecimal % BusinessConstants.IP_CODE) + '.' + ipString;
    }
    return ipString;
  }

  private getSignalType(signalType: radio.NetworkType) {
    let netType: string = '';
    switch (signalType) {
      case radio.NetworkType.NETWORK_TYPE_GSM:
      case radio.NetworkType.NETWORK_TYPE_CDMA:
        netType = BusinessConstants.SECOND_G;
        break;
      case radio.NetworkType.NETWORK_TYPE_WCDMA:
      case radio.NetworkType.NETWORK_TYPE_TDSCDMA:
        netType = BusinessConstants.THIRD_G;
        break;
      case radio.NetworkType.NETWORK_TYPE_LTE:
        netType = BusinessConstants.FORTH_G;
        break;
      case radio.NetworkType.NETWORK_TYPE_NR:
        netType = BusinessConstants.FIFTH_G;
        break;
      case radio.NetworkType.NETWORK_TYPE_UNKNOWN:
        netType = BusinessConstants.UNKNOWN_NETWORK;
        break;
      default:
        netType = BusinessConstants.UNKNOWN_NETWORK;
        break;
    }
    return netType;
  }
}

/**
 * Network Information class.
 */
export class NetworkInfo {
  networkType: string;
  networkIP?: string;
  wifiName?: string;

  constructor(networkType: string, networkIP?: string, wifiName?: string) {
    this.networkType = networkType;
    this.networkIP = networkIP;
    this.wifiName = wifiName;
  }
}

enum StatusMsg {
  SUCCESS = '获取网络信息成功',
  FAIL = '获取数据失败',
  NO_NETWORK = '无网络'
}