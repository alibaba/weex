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

import { Constants } from '../constants/Constants';
import { GlobalRouter } from '../../webrouterservice/globalrouter/GlobalRouter';
import Logger from '../../common/Logger';
import { WebManager } from '../../webrouterservice/webmanger/WebManager';
import { RouterStorage } from '../../webrouterservice/globalrouter/RouterStorage';
import { ViewAppear } from './ViewAppear'

const TAG: string = 'Navigator';

export class Navigator {
  static pop(args: object, callback: Function, webId: number): void {
    // 在该页面回退到上一个页面之前，先执行该页面的 viewdisappear 事件
    ViewAppear.execAppearByCurrentPage(webId, Constants.VIEW_DIS_APPEAR_TYPE)
    let popNum: number = args['popNum'] ?? 1;
    let animated: boolean = args['animated'] ?? true;
    GlobalRouter.getInstance().onBackPress(popNum, animated);
    if(callback){
      callback(Constants.SUCCEED);
    }
  }

  static push(args: object, callback: Function, webId: number): void {
    let url: string = args[Constants.URL];
    if (webId) {
      // 在该页面路由到下一个页面之前，先执行该页面的 viewdisappear 事件
      let controller = ViewAppear.execAppearByCurrentPage(webId, Constants.VIEW_DIS_APPEAR_TYPE)
      RouterStorage.getInstance().isFromPush = true;
      controller?.loadUrl(url);
      if(callback) {
        callback(Constants.SUCCEED);
      }
    } else {
      Logger.error(TAG, 'push, webId is undefined.');
    }
  }

  static replace(args: object, callback: Function, webId: number): void {
    ViewAppear.execAppearByCurrentPage(webId, Constants.VIEW_DIS_APPEAR_TYPE)
    const url: string = args[Constants.URL];
    GlobalRouter.getInstance().replacePage(url);
    if (callback) {
      callback(Constants.SUCCEED);
    }
  }
}
