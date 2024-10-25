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

import http from '@ohos.net.http'
import { MiniConfig } from '../bean/MiniConfig'
import { NetworkTask, NetworkTaskStatus } from '../bean/NetworkTask';
import { UpdateConfig } from '../bean/UpdateConfig';
import Logger from '../../../../../common/Logger';

export class MiniConfigNetworkDataSource {
  async fetchMiniConfig(localVersion: string): Promise<NetworkTask<MiniConfig>> {
    const networkTask = new NetworkTask<MiniConfig>(null, NetworkTaskStatus.ACTIVE);

    const url = `${UpdateConfig.getInstance().getUrl(localVersion)}`
    const httpRequest = http.createHttp();
    try {
      Logger.debug('network', `${url} request`, url)
      const response = await httpRequest.request(url, {
        header: [{ 'Content-Type': 'application/json' }],
      })
      Logger.debug('network', `${url} request complete, result is ${response.result}`,)

      const result: ESObject = JSON.parse(response.result.toString())
      networkTask.taskStatus = NetworkTaskStatus.READY
      if (result?.data) {
        networkTask.data = new MiniConfig(true, Number.parseInt(result?.data?.latest_version ?? '-1', 10), result?.data?.download_url ?? '');
      }
    } catch (err) {
      Logger.debug('network', `${url} request is err, err is ${JSON.stringify(err) ?? ''}`)
      networkTask.taskStatus = NetworkTaskStatus.FAILED;
    } finally {
      httpRequest.destroy();
    }

    return networkTask
  }
}