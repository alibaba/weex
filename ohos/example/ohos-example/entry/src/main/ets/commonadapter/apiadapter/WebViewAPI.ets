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

import { ApiOptions } from 'WebSceneKitHsp';
import { WebManager } from '../../samelayer/utils/WebManger';

export class WebViewAPI {
  webHandle(options: ApiOptions) {
    const args: ESObject = JSON.parse(options.args);
    const webManager = WebManager.getInstance();
    console.log('EmbedWeb handle', JSON.stringify(args));
    switch (args['method']) {
      case 'goBack': {
        webManager.goBack(args['name']);
        break;
      }
      case 'goForward': {
        webManager.goForward(args['name']);
        break;
      }
      case 'reload': {
        webManager.reload(args['name']);
        break;
      }
      case 'postMessage': {
        webManager.postMessage(args['name'], args['message']);
        break;
      }
    }
  }
}

