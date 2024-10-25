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

import Logger from '../../common/Logger';
import { WebManager } from '../../webrouterservice/webmanger/WebManager'
import web_webview from '@ohos.web.webview';

const TAG: string = 'ViewAppear';

export class ViewAppear {
  private static instance: ViewAppear;
  viewUrlWebIdMap: Map<string, number> = new Map(); // 用于标识url是否绑定了 viewappear 事件
  disViewUrlWebIdMap: Map<string, number> = new Map(); // 用于标识url是否绑定了 viewdisappear 事件

  /**
   * Singleton mode get instance.
   *
   * @returns ViewAppear
   */
  public static getInstance(): ViewAppear {
    if (!ViewAppear.instance) {
      ViewAppear.instance = new ViewAppear();
      Logger.info(TAG, 'new ViewAppear() success.');
    }
    return ViewAppear.instance;
  }

  /**
   * 根据webId，获取当前controller指向的 url
   *
   */
  static _getUrl(webId: number) {
    const url = WebManager.getInstance().webControllerMap.get(webId)?.getUrl();
    return url ? url : ''
  }

  /**
   * 记录web侧注册了viewAppear事件的url; 及其对应的webId ，便于查找对应的controller
   *
   */
  saveViewAppear(webId: number) {
    ViewAppear.getInstance().viewUrlWebIdMap.set(ViewAppear._getUrl(webId), webId)
  }

  saveViewDisAppear(webId: number) {
    ViewAppear.getInstance().disViewUrlWebIdMap.set(ViewAppear._getUrl(webId), webId)
  }

  static getViewAppearScript(viewType: string = ''): string {
    let result: string = `
        if(window.${viewType} !== 'undefined') {
          window.${viewType}()
        } else {
          console.log('viewType not exit')
        }
        `
    return result
  }


  /**
   *  runJavaScript函数执行脚本
   *
   */
  static execAppearFunByWebId(webId: number, webController: web_webview.WebviewController | undefined, url: string, viewType: string) {
    Logger.debug(TAG, `execAppearFunByWebId: ${url}`);
    try {
      const map = ViewAppear.getInstance().viewUrlWebIdMap
      if (map.size === 0 || !map.has(url) || map.get(url) !== webId) {
        return
      }
      webController?.runJavaScript(
        // 修复viewappear、viewdisappear报错问题
        // 问题原因：业务可能没有调用这两个方法，导致直接加载window.harmonyViewAppear时报错
        ViewAppear.getViewAppearScript(viewType),
        (error, result) => {
        if (error) {
          console.log(JSON.stringify(error));
        }
      });
    } catch (error) {
      console.log(error);
    }
  }


  /**
   * 根据当前的webId， 在viewUrlWebIdMap 中是否有对应的url绑有viewappear事件， 有则执行事件函数
   *
   */
  static execAppearByCurrentPage(webId: number, viewType: string) {
    let controller = WebManager.getInstance().getWebController(webId);
    const curl = controller?.getUrl()
    curl && ViewAppear.execAppearFunByWebId(webId, controller, curl, viewType)
    return controller
  }
}