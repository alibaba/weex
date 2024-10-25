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

import { LottieManager } from '../../samelayer/utils/LottieManager';
import { ApiOptions } from 'WebSceneKitHsp';

export class LottieAPI {
  lottieHandle(options: ApiOptions) {
    const completeCb = options.completeCb;
    const args: ESObject = JSON.parse(options.args);
    const lottieManager = LottieManager.getInstance();
    console.log('EmbedLottie handle', JSON.stringify(args));
    switch (args['method']) {
      case 'play': {
        lottieManager.play(args['name'], completeCb);
        break;
      }
      case 'pause': {
        lottieManager.pause(args['name']);
        break;
      }
      case 'stop': {
        lottieManager.stop(args['name']);
        break;
      }
      case 'togglePause': {
        lottieManager.togglePause(args['name']);
        break;
      }
      case 'setSpeed': {
        lottieManager.setSpeed(args['speed'], args['name']);
        break;
      }
      case 'setDirection': {
        lottieManager.setDirection(args['dir'], args['name']);
        break;
      }
      case 'playFromProgress': {
        lottieManager.playFromProgress(args['from'], args['to'], args['name'], completeCb);
        break;
      }
      case 'isAnimationPlaying': {
        lottieManager.isAnimationPlaying(args['name'], completeCb);
        break;
      }
    }
  }
}
