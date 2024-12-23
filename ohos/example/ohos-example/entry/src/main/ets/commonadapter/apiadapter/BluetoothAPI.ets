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

import { BluetoothState, CommonConfig, WSBluetooth } from 'webSceneAPI';
import { WeexResult } from '../apimodel/WeexResult';
import { ApiOptions } from 'WebSceneKitHsp';

export class BluetoothAPI {
  getBluetooth(options: ApiOptions) {
    const completeCb = options.completeCb;
    let wSBluetooth: WSBluetooth = new WSBluetooth();
    let bluetoothEvent: CommonConfig<BluetoothState> = new CommonConfig<BluetoothState>(
      (status: number, statusMessage: string, data?: BluetoothState) => {
        completeCb(new WeexResult<string>(status, statusMessage, data === 0 ? 'opend' : 'closed'));
      },
    );
    wSBluetooth.getBluetoothState(bluetoothEvent);
  }
}
