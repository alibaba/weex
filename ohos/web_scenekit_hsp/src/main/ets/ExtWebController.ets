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

import { common } from '@kit.AbilityKit';
import { UIContext } from '@kit.ArkUI';
import { Constant } from './webrouterservice/common/constant/Constant';
import { GlobalEvent } from './adapterservice/api/GlobalEvent';
import { GlobalThis } from './adapterservice/utils/GlobalThis';
import { ParseUtil } from './webrouterservice/common/util/ParseUtil';
import { WebManager } from './webrouterservice/webmanger/WebManager';
import { WebAdapter } from './adapterservice/model/WebAdapter';
import { ApiOptions } from './adapterservice/api/apimodel/ApiOptions';
import { MixWebManager } from './webrouterservice/webmanger/MixWebManager';
import { PreRenderUrl } from './webrouterservice/common/entity/PreRenderUrl';


export class ExtWebController {
  static uiContext: UIContext | undefined = undefined;

  public static init(pathArray: Array<string>, uiContext: UIContext, context: common.UIAbilityContext, poolSize?: number): void {
    ExtWebController.uiContext = uiContext;
    GlobalThis.getInstance().setContext(Constant.GLOBAL_CONTEXT, context);
    // 动态获取配置文件
    const configFile = ParseUtil.getConfigFile(pathArray, context);
    const promises: Array<Promise<void>> = [];
    configFile.forEach((file: string) => {
      promises.push(ParseUtil.parseConfig(context, file))
    })
    // 同步 初始化
    WebManager.getInstance().createNormalWebInstance(uiContext, WebManager.getInstance().syncCreateWebNum, 1);
    // 异步 初始化
    Promise.all([...promises]).then(() => {
      WebManager.getInstance().initWebPool(uiContext, poolSize);
    })
  }

  public static preRenderUrls(preRenderUrls: Array<PreRenderUrl>) {
    if (ExtWebController.uiContext) {
      WebManager.getInstance().createPreRenderWebInstance(ExtWebController.uiContext, preRenderUrls);
    } else {
      throw Error('ExtWebController.init must call first');
    }
  }

  public static preRenderMixUrls(preRenderUrls: Array<string>) {
    if (ExtWebController.uiContext) {
      MixWebManager.getInstance().createPreRenderWebInstance(ExtWebController.uiContext, preRenderUrls);
    } else {
      throw Error('ExtWebController.init must call first');
    }
  }

  /**
   * Register custom fun.
   *
   * @param funName
   * @param fun
   */
  public static registerCustomFun(funName: string, fun: (options: ApiOptions) => void) {
    WebAdapter.getInstance().registerCustomFun(funName, fun);
  }

  public static registerCustomFunCbParamsStringify(funName: string){
    WebAdapter.getInstance().registerCustomFunCbParamsStringify(funName)
  }

  /**
   * This interface is provided by the GlobalEvent interface and is used to trigger events.
   *
   * @param eventName
   * @param data
   */
  public static triggerEvent(eventName: string, data?: object | string): void {
    GlobalEvent.getInstance().triggerEvent(eventName, data);
  }

  /**
   * set the extraUa of web.
   *
   * @param ua
   * @param ua web UA
   */
  public static setUA(ua: string): void {
    WebManager.getInstance().setUA(ua);
  }

  /**
   * refresh the webview.
   *
   * @param url
   */
  public static refresh(url:string) :void {
    WebManager.getInstance().refreshController(url);
  }

  public static getWebId(url:string) :number {
    return WebManager.getInstance().getWebId(url);
  }

  public static getUrlByWebId(webId: number):string{
    return WebManager.getInstance().getUrl(webId)
  }
}