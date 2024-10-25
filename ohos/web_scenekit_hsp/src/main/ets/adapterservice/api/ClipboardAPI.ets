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

import { BusinessError } from '@ohos.base';
import pasteboard from '@ohos.pasteboard';
import { WeexProxyResult, ResultStr } from './apimodel/WeexResult';
import { ApiOptions } from './apimodel/ApiOptions';
import { abilityAccessCtrl, common } from '@kit.AbilityKit';


export class ClipboardAPI {
  getString(options: ApiOptions) {
    const completeCb = options.completeCb
    let context = getContext(this) as common.UIAbilityContext;
    let atManager = abilityAccessCtrl.createAtManager();
    atManager.requestPermissionsFromUser(context, ['ohos.permission.READ_PASTEBOARD']).then((data) => {
      let grantStatus: Array<number> = data.authResults;
      let length: number = grantStatus.length;
      for (let i = 0; i < length; i++) {
        if (grantStatus[i] === 0) {
          let systemPasteboard: pasteboard.SystemPasteboard = pasteboard.getSystemPasteboard();
          systemPasteboard.getData((err: BusinessError, pasteData: pasteboard.PasteData) => {
            let text: string = pasteData.getPrimaryText();
            completeCb(new WeexProxyResult<string>(ResultStr.SUCCESS, text));
          });
        } else {
          completeCb(new WeexProxyResult<string>(ResultStr.FAIL, ''));
        }
      }
    }).catch((err: String) => {
    })

  }


  setString(options: ApiOptions) {

    const args = JSON.parse(options.args) as object;
    let systemPasteboard: pasteboard.SystemPasteboard = pasteboard.getSystemPasteboard();
    let setData: pasteboard.PasteData = pasteboard.createData(pasteboard.MIMETYPE_TEXT_PLAIN, args['message']);

    systemPasteboard.setData(setData).then(() => {
      console.log('[setString] System clipboard set data [' + args['message'] + '] success.');
    }).catch((err: BusinessError) => {
      console.error('[setString] Failed to set clipboard data, errMsg: ' + err.message);
    });
  }
}
