/*
 * Copyright (C) 2024. Huawei Device Co., Ltd. All rights reserved.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the Apache-2.0 license.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * Apache-2.0 license for more details.
 */

import { CommonConfig, NetworkInfo, WSNetwork } from 'webSceneAPI';
import { WeexResult } from '../apimodel/WeexResult';
import { ApiOptions } from 'WebSceneKitHsp';

export class NetworkAPI {
  getNetworkType(options: ApiOptions) {
    const completeCb = options.completeCb;
    let wNetwork: WSNetwork = new WSNetwork();
    let networkTypeEvent: CommonConfig<NetworkInfo> = new CommonConfig<NetworkInfo>(
      (status: number, statusMessage: string, data?: NetworkInfo) => {
        console.info('getNetworkType complete data ' + JSON.stringify(data));
        completeCb(new WeexResult<string | undefined>(status, statusMessage, data?.networkType));
      }
    );
    wNetwork.getNetworkInfo(networkTypeEvent);
  }

  getNetworkInfo( options: ApiOptions) {
    const args = options.args;
    const completeCb = options.completeCb;
    let wNetwork: WSNetwork = new WSNetwork();
    let type: string = JSON.parse(args).type;
    let networkInfoEvent: CommonConfig<NetworkInfo> = new CommonConfig<NetworkInfo>(
      (status: number, statusMessage: string, data?: NetworkInfo) => {
        let result: NetworkResult;
        if ('1' === type) {
          result = new NetworkResult(data?.networkType, data?.networkIP ?? '0.0.0.0', '');
        } else if ('2' === type) {
          result = new NetworkResult(data?.networkType, data?.networkIP ?? '0.0.0.0', data?.wifiName ?? '');
        } else {
          result = new NetworkResult(data?.networkType);
        }
        console.info('getNetworkInfo complete data ' + JSON.stringify(data));
        completeCb(new WeexResult<NetworkResult>(status, statusMessage, result));
      }
    );
    wNetwork.getNetworkInfo(networkInfoEvent);
  }

  getLocalIPAddress(options: ApiOptions) {
    const completeCb = options.completeCb;
    let wNetwork: WSNetwork = new WSNetwork();
    let networkEvent: CommonConfig<NetworkInfo> = new CommonConfig<NetworkInfo>(
      (status: number, statusMessage: string, data?: NetworkInfo) => {
        console.info(`getLocalIPAddress complete data : ` + JSON.stringify(data));
        completeCb(new WeexResult<WeexIpResult>(status, statusMessage, new WeexIpResult(data?.networkIP ?? '0.0.0.0')));
      }
    );
    wNetwork.getNetworkInfo(networkEvent);
  }
}


class NetworkResult {
  netType: string | undefined = '';
  netIp?: string = '';
  wifiName?: string = '';
  errMsg?: string = '';

  constructor(netType: string | undefined, netIp?: string, wifiName?: string, errMsg?: string) {
    this.netType = netType;
    this.netIp = netIp;
    this.wifiName = wifiName;
    this.errMsg = errMsg;
  }
}


class WeexIpResult {
  localip?: string;

  constructor(localip?: string) {
    this.localip = localip;
  }
}
