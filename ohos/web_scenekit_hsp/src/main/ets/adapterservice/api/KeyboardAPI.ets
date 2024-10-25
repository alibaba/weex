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

import { display, window } from '@kit.ArkUI';
import { common } from '@kit.AbilityKit';
import { BusinessError } from '@kit.BasicServicesKit';
import { ApiOptions } from './apimodel/ApiOptions';
import Logger from '../../common/Logger';

const TAG: string = 'KeyboardAPI';
const WEEX_DESIGN_SIZE: number = 750; // WEEX的设计稿尺寸
const SCALE: number = WEEX_DESIGN_SIZE / px2vp(display.getDefaultDisplaySync().width); // WEEX相对原生的缩放比例

let callback: (height: number) => void | undefined

/**
 * 返回的软键盘尺寸类型
 */
interface KeyboardSize {
  width: number
  height: number
}

/**
 * 给web侧input组件添加软键盘监听事件（input获得焦点时添加监听）
 *
 * @param options
 */
export function onKeyboard(options: ApiOptions) {
  Logger.info(TAG, 'onKeyboard');
  const cb = options.completeCb;
  try {
    window.getLastWindow(getContext() as common.UIAbilityContext).then((data) => {
      // 创建监听
      callback = (height: number) => {
        if (height === 0) {
          // 键盘隐藏
          cb({ isShow: false, keyboardSize: { width: 0, height: 0 } as KeyboardSize })
        } else {
          const keyboardSize: KeyboardSize = {
            width: WEEX_DESIGN_SIZE,
            height: Math.round(px2vp(height) * SCALE)
          }
          // 键盘弹出
          cb({ isShow: true, keyboardSize: keyboardSize })
        }
      }
      data.on('keyboardHeightChange', callback)
    }).catch((err: BusinessError) => {
      Logger.error(TAG, `Failed to obtain the keyboard height. Cause:${JSON.stringify(err)}`);
    })
  } catch (err) {
    Logger.error(TAG, `Failed to obtain the keyboard height. Cause:${JSON.stringify(err)}`);
  }
}

/**
 * 取消web侧input组件对软键盘的监听（input失焦时移除监听）
 *
 * @param _options
 */
export function offKeyboard(_options: ApiOptions) {
  Logger.info(TAG, 'offKeyboard');
  try {
    window.getLastWindow(getContext() as common.UIAbilityContext).then((data) => {
      // 取消监听
      if (callback) {
        data.off('keyboardHeightChange', callback);
      }
    }).catch((err: BusinessError) => {
      Logger.error(TAG, `Failed to off the keyboardHeightChange listener. Cause:${JSON.stringify(err)}`);
    })
  } catch (err) {
    Logger.error(TAG, `Failed to off the keyboardHeightChange listener. Cause:${JSON.stringify(err)}`);
  }
}