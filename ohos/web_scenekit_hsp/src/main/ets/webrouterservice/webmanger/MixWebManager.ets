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

import { WebNodeController } from './WebNodeController';
import web_webview from '@ohos.web.webview';
import { BuilderNode } from '@ohos.arkui.node';
import { BuilderData } from '../common/entity/BuilderData';
import { MixWebBuilder } from './MixWebBuilder';
import { Constant } from '../common/constant/Constant';
import { WebManager } from './WebManager';
import { RouterStorage } from '../globalrouter/RouterStorage';
import { UrlUtil } from '../common/util/UrlUtil';
import { ExtWebController } from '../../ExtWebController';

export class MixWebManager {
  private static instance: MixWebManager;
  private preRenderUsedMap: Map<string, BuilderNode<BuilderData[]>> = new Map();
  private currentMixWebId: number = Constant.MIX_WEB_START_WEB_ID;
  private preRenderStartId: number = Constant.PRERENDER_MIX_WEB_START_WEB_ID;

  public static getInstance(): MixWebManager {
    if (!MixWebManager.instance) {
      MixWebManager.instance = new MixWebManager();
    }
    return MixWebManager.instance;
  }

  private syncData(url: string, webId: number, controller: web_webview.WebviewController) {
    WebManager.getInstance().webControllerMap.set(webId, controller);
    RouterStorage.getInstance().addUrlNode(UrlUtil.addFakeDomain(url), webId);
  }

  private createBuilderNode(url: string, webIndex: number, uiContext: UIContext): BuilderNode<BuilderData[]>  {
    let controller: web_webview.WebviewController = new web_webview.WebviewController();
    let builderNode: BuilderNode<BuilderData[]> = new BuilderNode(uiContext!);
    builderNode.build(wrapBuilder<BuilderData[]>(MixWebBuilder), { url, controller: controller, webId: webIndex });
    this.syncData(url, webIndex, controller);
    return builderNode;
  }

  public createPreRenderWebInstance(uiContext: UIContext, preRenderUrls: Array<string>) {
    if (preRenderUrls.length <= 0) {
      return;
    }
    for (const url of preRenderUrls) {
      const deletedFakeDomainUrl = UrlUtil.getUrlTemplate(url);
      if (this.preRenderUsedMap.has(deletedFakeDomainUrl)) {
        continue; // 如果url已经有预渲染了，跳过, 避免重复预渲染
      }
      const builderNode = this.createBuilderNode(url, this.preRenderStartId, uiContext);
      this.preRenderUsedMap.set(deletedFakeDomainUrl, builderNode);
      this.preRenderStartId++;
    }
  }

  public getWebNodeController(url: string): WebNodeController {
    if (!ExtWebController.uiContext) {
      throw Error('ExtWebController.init must call first');
    }
    const webNodeController = new WebNodeController();
    const deletedFakeDomainUrl = UrlUtil.getUrlTemplate(url);
    let builderNode: BuilderNode<BuilderData[]> | undefined = undefined;
    if (this.preRenderUsedMap.has(deletedFakeDomainUrl)) {
      builderNode = this.preRenderUsedMap.get(deletedFakeDomainUrl)!;
    } else {
      builderNode = this.createBuilderNode(url, this.currentMixWebId++, ExtWebController.uiContext);
    }
    webNodeController.init(builderNode);
    webNodeController.add();
    return webNodeController;
  }

  public freeWeb(url: string, webId: number) {
    // 预渲染的常驻内存
    if (!this.preRenderUsedMap.has(url)) {
      this.currentMixWebId--;
    }
    WebManager.getInstance().webControllerMap.delete(webId);
    RouterStorage.getInstance().deleteUrlNode(1, url);
  }
}
