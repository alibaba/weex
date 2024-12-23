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

import { JumpThirdConfig, WSRouter } from 'webSceneAPI';
import { WeexResult } from '../apimodel/WeexResult';
import { ApiOptions } from 'WebSceneKitHsp';

export class ThirdAppApi {
  /**
   * Invoke jumpThirdApp in WebSceneAPI project.
   *
   * @param name
   * @param args
   * @param callback
   */
  jumpThirdApp(options: ApiOptions) {
    const args = options.args;
    const completeCb = options.completeCb;
    let wSRouter: WSRouter = new WSRouter();
    const jumpThirdConfig: JumpThirdConfig = JSON.parse(args);
    jumpThirdConfig.complete = (statusCode: number, statusMsg: string) => {
      completeCb(new WeexResult<void>(statusCode, statusMsg));
    }
    wSRouter.jumpThirdApp(jumpThirdConfig)
  }
}
