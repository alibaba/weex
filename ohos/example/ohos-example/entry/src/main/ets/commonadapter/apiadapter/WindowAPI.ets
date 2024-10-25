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

import { AvoidPosition, FullScreenConfig, OrientationConfig, WSWindow } from 'webSceneAPI';
import { WeexResult } from '../apimodel/WeexResult';
import { ApiOptions } from 'WebSceneKitHsp';

export class WindowApi {
  /**
   * Invoke setPreferredOrientation in WebSceneAPI project.
   *
   * @param name
   * @param args
   * @param callback
   */
  changeOrientation(options: ApiOptions) {
    const args = options.args;
    const completeCb = options.completeCb;
    let wSOrientation: WSWindow = new WSWindow();
    const orientationConfig: OrientationConfig = JSON.parse(args);
    orientationConfig.complete = (statusCode: number, statusMsg: string) => {
      completeCb(new WeexResult<void>(statusCode, statusMsg));
    }

    wSOrientation.setPreferredOrientation(orientationConfig);
  }

  /**
   * Invoke setFullscreen in WebSceneAPI project.
   *
   * @param _name
   * @param args
   * @param callback
   */
  setFullscreen(options: ApiOptions) {
    const args = options.args;
    const completeCb = options.completeCb;
    let wSFullScreen: WSWindow = new WSWindow();
    let argSystemBarConfig: FullScreenConfig = JSON.parse(args);
    argSystemBarConfig.complete = (statusCode: number, statusMsg: string, data?: AvoidPosition): void => {
      completeCb(new WeexResult<AvoidPosition>(statusCode, statusMsg, data));
    }
    wSFullScreen.setFullScreen(argSystemBarConfig);
  }
}
