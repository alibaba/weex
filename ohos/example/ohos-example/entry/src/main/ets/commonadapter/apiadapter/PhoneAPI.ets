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

import promptAction from '@ohos.promptAction';
import { as } from 'advancedApi';
import { StatusCode } from 'webSceneAPI';
import { WeexResult } from '../apimodel/WeexResult';
import { ApiOptions } from 'WebSceneKitHsp';

export class PhoneAPI {
  callUp(options: ApiOptions) {
    const name = options.name
    const args = options.args;
    const completeCb = options.completeCb;
    const callUpInParams: CallUpInParams = JSON.parse(args);
    if (callUpInParams.isModal === 1) {
      promptAction.showDialog({
        message: callUpInParams.tipWords,
        buttons: [
          { text: '确认', color: '#000000', },
          { text: '取消', color: '#000000', }
        ],
      })
        .then(data => {
          if (data.index === 0) {
            makePhoneCall(name, callUpInParams.phoneNumber, completeCb);
          } else {
            completeCb(new WeexResult<void>(StatusCode.CANCEL, 'The user cancels the operation.'));
          }
        })
        .catch((err: object) => {
          completeCb(new WeexResult<void>(StatusCode.FAIL, JSON.stringify(err)));
        })
    } else {
      makePhoneCall(name, callUpInParams.phoneNumber, completeCb);
    }
  }
}

function makePhoneCall(asName: string, phoneNumber: string, completeCb: Function) {
  if (asName.length === 0 || phoneNumber.length === 0) {
    return;
  }
  asName = 'makePhoneCall';

  let CallUpCompleteCallback = (data: WeexDataResult) => {
    console.info('WANG CallUpCompleteCallback data:' + JSON.stringify(data));
    if (data.errCode === 0) {
      completeCb(new WeexResult<void>(StatusCode.SUCCESS, data.errMsg ?? ''));
    } else {
      completeCb(new WeexResult<void>(StatusCode.FAIL, data.errMsg ?? ''));
    }
  };

  let callUpParam: CallUpParam = new CallUpParam();
  callUpParam.phoneNumber = phoneNumber;
  callUpParam.complete = CallUpCompleteCallback;

  let callUpParams: Array<CallUpParam> = new Array();
  callUpParams[0] = callUpParam;
  as[asName].apply(null, callUpParams);
}

class CallUpInParams {
  phoneNumber: string = '12345678901';
  isModal?: number;
  tipWords?: string;
}

class CallUpParam {
  phoneNumber: string = '12345678901';
  success: Function = () => {
  };
  fail: Function = () => {
  };
  complete: Function = () => {
  };
}

class WeexDataResult {
  errCode?: number;
  errMsg?: string;
}
