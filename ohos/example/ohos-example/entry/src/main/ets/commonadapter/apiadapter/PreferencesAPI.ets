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
import dataPreferences from '@ohos.data.preferences';
import common from '@ohos.app.ability.common';
import preferences from '@ohos.data.preferences';
import { WeexProxyResult, ResultStr } from '../apimodel/WeexResult';
import { GlobalThis } from '../../utils/GlobalThis';
import { ApiOptions } from 'WebSceneKitHsp';

function getPreferences(): dataPreferences.Preferences {
  let options: preferences.Options = {
    name: 'myStore'
  };
  return dataPreferences.getPreferencesSync(GlobalThis.getInstance().getContext("GlobalContext"), options);
}

export class PreferencesAPI {
  setItem(options: ApiOptions) {
    const completeCb = options.completeCb;
    const args: PreferencesParams = JSON.parse(options.args);
    try {
      let preferencesParams: PreferencesParams = args as PreferencesParams;
      // if ((preferencesParams?.key === null || preferencesParams?.key?.length === 0) ||
      //   (preferencesParams?.value === null || preferencesParams?.value?.length === 0)) {
      //   completeCb(new WeexProxyResult(ResultStr.FAIL, 'invalid_param'));
      // }
      let preferences = getPreferences();
      preferences.putSync(preferencesParams.key, preferencesParams.value);
      console.info('WANG setItem putSync');
      preferences.flush().then(() => {
        console.info('WANG setItem flush succeed ');
        completeCb(new WeexProxyResult<void>(ResultStr.SUCCESS));
      }).catch((err: BusinessError) => {
        console.info('WANG setItem flush fail data:' + JSON.stringify(err));
        completeCb(new WeexProxyResult(ResultStr.SUCCESS, ''));
      })
    } catch (error) {
      console.error('WANG setItem error:' + JSON.stringify(error))
      completeCb(new WeexProxyResult(ResultStr.FAIL, ''));
    }
  }

  getItem(options: ApiOptions) {
    const completeCb = options.completeCb;
    const args: PreferencesParams = JSON.parse(options.args);
    try {
      let preferences = getPreferences();
      let defValue: preferences.ValueType = '';
      defValue = preferences.getSync((args as PreferencesParams).key, defValue);
      console.info('WANG getItem data:' + JSON.stringify(defValue));

      if (defValue.toString().length === 0) {
        completeCb(new WeexProxyResult<void>(ResultStr.FAIL));
      } else {
        completeCb(new WeexProxyResult(ResultStr.SUCCESS, JSON.stringify(defValue)));
      }
    } catch (err) {
      console.error('WANG getItem error:' + JSON.stringify(err))
      completeCb(new WeexProxyResult<void>(ResultStr.FAIL));
    }
  }

  removeItem(options: ApiOptions) {
    const completeCb = options.completeCb;
    const args: PreferencesParams = JSON.parse(options.args);
    try {
      let preferencesParams: PreferencesParams = args as PreferencesParams;
      let preferences = getPreferences();
      if(!preferences.hasSync(preferencesParams.key)){
        completeCb(new WeexProxyResult(ResultStr.FAIL, ''));
      }
      preferences.delete(preferencesParams.key).then(() => {
        console.info('WANG removeItem succeed');
        completeCb(new WeexProxyResult<void>(ResultStr.SUCCESS));
      }).catch((err: BusinessError) => {
        console.info('WANG removeItem fail:' + JSON.stringify(err));
        completeCb(new WeexProxyResult(ResultStr.FAIL, ''));
      })
    } catch (err) {
      console.error('WANG removeItem error:' + JSON.stringify(err))
      completeCb(new WeexProxyResult(ResultStr.FAIL, ''));
    }
  }

  length(options: ApiOptions) {
    const completeCb = options.completeCb;
    try {
      let preferences = getPreferences();
      let value = preferences.getAllSync();
      let allKeys: string[] = Object.keys(value);
      let len: number = allKeys.length;
      console.info('WANG length :' + len)
      completeCb(new WeexProxyResult(ResultStr.SUCCESS, len));
    } catch (err) {
      console.error('WANG length error:' + JSON.stringify(err))
      completeCb(new WeexProxyResult(ResultStr.FAIL, ''));
    }
  }

  getAllKeys(options: ApiOptions) {
    const completeCb = options.completeCb;
    try {
      let preferences = getPreferences();
      let value = preferences.getAllSync();
      let allKeys: string[] = Object.keys(value);
      console.info('WANG length allKeys:' + JSON.stringify(allKeys));
      completeCb(new WeexProxyResult(ResultStr.SUCCESS, allKeys));
    } catch (err) {
      console.error('WANG getAllKeys error:' + JSON.stringify(err))
      completeCb(new WeexProxyResult(ResultStr.FAIL, ''));
    }
  }
}

class PreferencesParams {
  key?: string;
  value?: string;
}
