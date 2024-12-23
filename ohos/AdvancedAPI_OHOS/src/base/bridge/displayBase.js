/**
 * Copyright (c) Huawei Technologies Co., Ltd. 2022-2022. All rights reserved.
 * Description: @ohos.display
 * Author: wangtianpeng
 * Create: 03/14/2022
 * Notes: N/A
 */

import display from '@ohos.display'

export class DisplayBase {
  static ohosGetDisplay () {
    let displayClass = null
    try {
      displayClass = display.getDefaultDisplaySync();
    } catch (exception) {
      console.error(`[QAFAPI] display error message: ${JSON.stringify(exception)}`);
    }
    return displayClass
  }
}
