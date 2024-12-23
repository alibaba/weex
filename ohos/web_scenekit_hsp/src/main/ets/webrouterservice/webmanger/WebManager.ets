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

import { UIContext } from '@ohos.arkui.UIContext';
import web_webview from '@ohos.web.webview';
import { BuilderData } from '../common/entity/BuilderData';
import { BuilderNode } from '@ohos.arkui.node';
import { Constant } from '../common/constant/Constant';
import { RouterStorage } from '../globalrouter/RouterStorage';
import { UrlUtil } from '../common/util/UrlUtil';
import { WebBuilder } from './WebBuilder';
import { BroadcastChannel } from '../../adapterservice/api/BroadcastChannel';
import { GlobalEvent } from '../../adapterservice/api/GlobalEvent';
import webview from '@ohos.web.webview';
import Logger from '../../common/Logger';
import { PreRenderUrl } from '../common/entity/PreRenderUrl';
import { IdResource } from '../common/entity/IdResource';
import { ExtWebController } from '../../ExtWebController';

const TAG: string = 'WebManager';

export class WebManager {
  public webIdFIFO: Array<number> = new Array();
  public templateIdleMap: Map<number, BuilderNode<BuilderData[]>> = new Map();
  public templateUsedMap: Map<number, BuilderNode<BuilderData[]>> = new Map();
  public templateUrlMap: Map<string, number> = new Map();
  private preRenderUsedMap: Map<number, [string, BuilderNode<BuilderData[]>]> = new Map();
  private preRenderUrlMap: Map<string, [number, PreRenderUrl]> = new Map();
  public preloadStatus: Map<string, Map<string, string>> = new Map(); // 模板预热状态
  private static instance: WebManager;
  private webIdleMap: Map<number, BuilderNode<BuilderData[]>> = new Map();
  private webUsedMap: Map<number, BuilderNode<BuilderData[]>> = new Map();
  public webControllerMap: Map<number, web_webview.WebviewController> = new Map();
  public webControllerFakeUrl: Map<web_webview.WebviewController, string> = new Map();
  public uiContext: UIContext | undefined;
  public syncCreateWebNum: number = 1;
  private ua: string | undefined;
  private webUA: string | undefined;
  public webStatusMap: Map<string, string> = new Map();
  private templateStartId: number = Constant.TEMPLATE_START_WEB_ID;
  private preRenderId: IdResource = new IdResource(Constant.PRERENDER_START_WEB_ID, Constant.PRERENDER_START_WEB_ID + 100);
  public  templateNeed: number = -1;
  private minimumThreshold: number = 1;
  private webTaskMap: Map<string, Function> = new Map();

  /**
   * Singleton mode get instance.
   *
   * @returns WebManager
   */
  public static getInstance(): WebManager {
    if (!WebManager.instance) {
      WebManager.instance = new WebManager();
    }
    return WebManager.instance;
  }

  public refreshStatus(url: string) {
    let fakeDomain: string = Constant.FAKE_DOMAIN;
    if (this.webTaskMap.has(url)) {
      this.webTaskMap.get(url) && this.webTaskMap.get(url)?.();
      this.deleteWebTask(url);
    }
    if (url.startsWith(fakeDomain)) {
      url = url.substring(fakeDomain.length);
    }
    let projectName: string = RouterStorage.getInstance().getProjectName(url);
    this.preloadStatus.get(projectName)?.set(url, 'finish');
  }

  /**
   * submit the task to delay invoke.
   * @param url
   * @param fn
   */
  public setWebTask(url: string, fn: Function) {
    this.webTaskMap.set(url, fn);
  }

  /**
   * delete the task by url.
   * @param url
   */
  public deleteWebTask(url: string) {
    this.webTaskMap.delete(url);
  }

  /**
   * WebManager refresh the webview.
   *
   * @param url
   */
  public refreshController(url: string) {
    const webId: number = RouterStorage.getInstance().getCurrentWebId(url);
    WebManager.getInstance().getWebController(webId)?.refresh();
  }

  public getWebId(url:string) {
    const webId: number = RouterStorage.getInstance().getCurrentWebId(url);
    return webId;
  }

  public getUrl(webId:number){
    return RouterStorage.getInstance().getCurrentUrl(webId);
  }
  /**
   * Is preload finish.
   *
   * @param url
   * @returns boolean
   */
  public isPreloadFinish(url: string): boolean {
    url = UrlUtil.getUrlTemplate(url);
    let projectName: string = RouterStorage.getInstance().getProjectName(url);
    return this.preloadStatus.get(projectName)?.get(url) === Constant.FINISH;
  }

  /**
   * set the web status
   *
   * @param webId
   * @param status
   */
  public setWebStatus(webId: number, status: string) {
    this.webStatusMap.set(String(webId), status);
  }

  /**
   * get the web status
   *
   * @param webId
   * @returns string
   */
  public getWebStatus(webId: number) {
    return this.webStatusMap.get(String(webId));
  }

  /**
   * save ua of web.
   *
   * @param ua
   * @param ua
   */
  public setUA(ua: string): void {
    this.ua = ua;
  }

  /**
   * get the ua of web
   *
   * @returns
   * @returns
   */
  public getUA(): string | undefined {
    return this.ua;
  }

  /**
   *
   * @param userAgent
   */
  public setWebUA(userAgent: string): void {
    this.webUA = userAgent;
  }

  /**
   *
   * @returns
   */
  public getWebUA(): string | undefined {
    return this.webUA;
  }

  /**
   * check thr normal web and template web is finished
   *
   * @returns
   */
  public checkWebFinished(): boolean {
    for (let index = 1; index <= this.syncCreateWebNum; index++) {
      if (!['finished', 'webPageEnd'].includes(this.webStatusMap.get(String(index)) || '')) {
        return false
      }
    }
    // initial the preload template web, check the use web is prepared or not.
    for (let index = this.templateStartId; index <= this.templateStartId + this.templateNeed; index++) {
      if (!['finished', 'webPageEnd'].includes(this.webStatusMap.get(String(index)) || '')) {
        return false;
      }
    }

    return true
  }

  /**
   * Init web pool.
   *
   * @param poolSize
   * @param context
   */
  public initWebPool(context: UIContext, poolSize?: number): void {
    this.uiContext = context;
    poolSize = poolSize ?? 10;
    if (!poolSize || poolSize > 10) {
      poolSize = 10;
    }
    this.createNormalWebInstance(context, this.syncCreateWebNum + 1, poolSize - this.syncCreateWebNum);
    this.createTemplateWebInstance(context, this.templateStartId);
  }

  /**
   * put webId 1-100 into normal
   *
   * @param context
   * @param startWebId
   * @param poolSize
   */
  public createNormalWebInstance(context: UIContext, startWebId: number, poolSize: number) {
    for (let webIndex = startWebId; webIndex < startWebId + poolSize; webIndex++) {
      this.setWebStatus(webIndex, 'init');
      let controller: web_webview.WebviewController = new web_webview.WebviewController();
      this.webControllerMap.set(webIndex, controller);
      let builderNode: BuilderNode<BuilderData[]> = new BuilderNode(context);
      builderNode.build(wrapBuilder<BuilderData[]>(WebBuilder), { url: '', controller: controller, webId: webIndex });
      this.webIdleMap.set(webIndex, builderNode);
    }
  }

  /**
   * put webId 101-200 into template.
   *
   * @param context
   * @param startWebId
   */
  public createTemplateWebInstance(context: UIContext, startWebId: number) {
    for (let webIndex = startWebId; webIndex <= startWebId + 20; webIndex++) {
      this.setWebStatus(webIndex, 'init');
      let controller: web_webview.WebviewController = new web_webview.WebviewController();
      this.webControllerMap.set(webIndex, controller);
      let builderNode: BuilderNode<BuilderData[]> = new BuilderNode(context);
      builderNode.build(wrapBuilder<BuilderData[]>(WebBuilder), { url: '', controller: controller, webId: webIndex });
      this.templateIdleMap.set(webIndex, builderNode);
    }
  }

  public createPreRenderWebInstance(context: UIContext, preRenderUrls: Array<PreRenderUrl>) {
    if (preRenderUrls.length <= 0) {
      return;
    }
    const usedUrls: string[] = [];
    for (const id of this.webUsedMap.keys()) {
      const url = this.getWebController(id)?.getUrl();
      if (url) {
        usedUrls.push(UrlUtil.getUrlTemplate(url));
      }
    }
    for (const urlInfo of preRenderUrls) {
      const deleteDomainUrl = UrlUtil.getUrlTemplate(urlInfo.url);
      if (this.preRenderUrlMap.has(deleteDomainUrl)) {
        continue; // 如果url已经有预渲染了，跳过, 避免重复预渲染
      }
      if (usedUrls.includes(deleteDomainUrl) || usedUrls.includes(deleteDomainUrl + '/')) {
        Logger.warn(TAG, `Url: ${deleteDomainUrl} has been normally rendered already. Skip prerender`);
        continue;
      }
      const preRenderId = this.preRenderId.getAndUseIdleId();
      this.setWebStatus(preRenderId, 'init');
      let controller: web_webview.WebviewController = new web_webview.WebviewController();
      this.webControllerMap.set(preRenderId, controller);
      let builderNode: BuilderNode<BuilderData[]> = new BuilderNode(context);
      this.webControllerFakeUrl.set(controller, UrlUtil.addFakeDomain(urlInfo.url));
      builderNode.build(wrapBuilder<BuilderData[]>(WebBuilder), { url: deleteDomainUrl, controller: controller, webId: preRenderId });
      this.preRenderUsedMap.set(preRenderId, [deleteDomainUrl, builderNode]);
      this.preRenderUrlMap.set(deleteDomainUrl, [preRenderId, urlInfo]);
    }
  }

  public isPreRenderKeepLive(webId: number): boolean {
    const hasPreRender = this.preRenderUsedMap.has(webId);
    if (hasPreRender) {
      const preRenderInfo = this.preRenderUsedMap.get(webId);
      const deletedDomainUrl: string = preRenderInfo?.[0]!;
      const urlInfo = this.preRenderUrlMap.get(deletedDomainUrl);
      if (urlInfo && urlInfo[1].keepLive) {
        return true;
      }
    }
    return false;
  }

  public isPreRenderWeb(webId: number) {
    return webId >= Constant.PRERENDER_START_WEB_ID && webId < Constant.PRERENDER_START_WEB_ID + 100;
  }

  public deleteProject(deleteProjects: Array<string>) {
    deleteProjects.forEach((deleteProjectName: string) => {
      let projectsStatusMap: Map<string, string> | undefined = this.preloadStatus.get(deleteProjectName);
      projectsStatusMap?.forEach((value: string, key: string) => {
        let webId: number | undefined = this.templateUrlMap.get(key);
        this.templateUrlMap.delete(key);
        if (webId) {
          let builderNode: BuilderNode<BuilderData[]> | undefined = this.templateUsedMap.get(webId);
          if (builderNode) {
            this.templateUsedMap.delete(webId);
            this.templateIdleMap.set(webId, builderNode);
            let controller = this.webControllerMap.get(webId);
            controller?.clearHistory();
          }
        }
      })
      this.preloadStatus.delete(deleteProjectName);
    })
  }

  public addProject(addProjects: Array<string>): Array<string> {
    let taskUrls: Array<string> = new Array();
    addProjects.forEach((addProjectName: string) => {
      let preloadUrls: Array<string> | undefined = RouterStorage.getInstance()
        .projectsConfig
        .get(addProjectName)?.preloadUrls;
      let projectsStatusMap: Map<string, string> = new Map();
      preloadUrls?.forEach((preloadUrl: string) => {
        projectsStatusMap.set(preloadUrl, Constant.STATUS_INITIAL);
        taskUrls.push(preloadUrl);
      })
      this.preloadStatus.set(addProjectName, projectsStatusMap);
    })
    return taskUrls;
  }

  /**
   *
   * @param taskUrls
   */
  public preloadTemplate(taskUrls: Array<string>) {
    taskUrls.forEach((url: string) => {
      if (this.templateIdleMap.size === 0) {
        return;
      }
      let webId: number = this.templateIdleMap.keys().next().value;
      let controller: web_webview.WebviewController | undefined = this.webControllerMap.get(webId);
      try {
        controller?.clearHistory();
      } catch (err) {
        Logger.info(TAG, err)
      }
      let builderNode: BuilderNode<BuilderData[]> | undefined = this.templateIdleMap.get(webId);
      if (builderNode) {
        this.templateUsedMap.set(webId, builderNode);
        this.templateIdleMap.delete(webId);
      }
      this.templateUrlMap.set(url, webId);
      url = UrlUtil.addFakeDomain(url);
      RouterStorage.getInstance().isFromPush = true;
      controller?.loadUrl(url);
    })
  }

  /**
   * Get web instance id.
   *
   * @param reuse
   * @param url
   * @returns number
   */
  public getWebInstanceId(reuse: boolean, url?: string): number {
    if (reuse && RouterStorage.getInstance().getRouteNodesSize() > 0) {
      return RouterStorage.getInstance().getCurrentWebId();
    }

    if (url) {
      let deleteDomainUrl = UrlUtil.getUrlTemplate(url);
      let templateWebId = this.templateUrlMap.get(deleteDomainUrl);
      if (templateWebId) {
        return templateWebId;
      }
      let webIdUrl = this.preRenderUrlMap.get(deleteDomainUrl);
      if (webIdUrl) {
        return webIdUrl[0];
      }
    }

    let webId: number = 0;
    // if have idle web.
    if (this.webIdleMap.size > 0) {
      webId = this.webIdleMap.keys().next().value;
      let builderNode = this.webIdleMap.get(webId);
      if (builderNode !== undefined) {
        this.webUsedMap.set(webId, builderNode);
        this.webIdleMap.delete(webId);
      }
    }

    // if the webIdleMap size less than minimumThreshold, new web
    if (this.webIdleMap.size <= this.minimumThreshold && this.webIdleMap.size > 0) {
      const currentSize: number = this.webIdleMap.size + this.webUsedMap.size;
      this.createNormalWebInstance(this.uiContext as UIContext, currentSize + 1, 2);
    }

    // Compatible with exceptions.
    if (this.webIdleMap.size <= 0) {
      webId = RouterStorage.getInstance().clearPage() ?? webId;
      this.webControllerMap.get(webId)?.clearHistory();
      BroadcastChannel.getInstance().bcDeleteCb(webId);
      GlobalEvent.getInstance().deleteCb(webId);
    }

    return webId;
  }

  /**
   * Get web node.
   *
   * @param webId
   * @returns BuilderNode
   */
  public getBuilderNode(webId: number): BuilderNode<BuilderData[]> | undefined {
    // todo 模板预热不能只考虑webusedMap
    let builderNode = this.webUsedMap.get(webId) || this.templateIdleMap.get(webId);
    if (builderNode) {
      return builderNode;
    }
    let preRender = this.preRenderUsedMap.get(webId);
    if (preRender) {
      return preRender[1];
    }
    return this.templateUsedMap.get(webId);
  }

  /**
   * get Web Controller.
   *
   * @param webId
   * @returns web_webview.WebviewController | undefined
   */
  public getWebController(webId: number): web_webview.WebviewController | undefined {
    return this.webControllerMap.get(webId);
  }

  /**
   * Free Web Instance.
   *
   * @param webId
   */
  public freeWebInstance(webId: number): void {
    let builderNode = this.webUsedMap.get(webId);
    if (builderNode) {
      builderNode.dispose();
      let OriginController: WebviewController | undefined = this.webControllerMap.get(webId);
      let controller: WebviewController | undefined = new webview.WebviewController();
      this.webUsedMap.delete(webId);
      this.setWebStatus(webId, 'init');
      OriginController?.clearHistory();
      builderNode.build(wrapBuilder<BuilderData[]>(WebBuilder), { url: '', controller: controller, webId: webId });
      // 重新设置web的controller
      this.webControllerMap.set(webId, controller);
      this.webIdleMap.set(webId, builderNode);
    }
    const hasPreRender = this.preRenderUsedMap.has(webId);
    if (hasPreRender) {
      const deleteDomainUrl = this.preRenderUsedMap.get(webId)![0];
      const builderNode = this.preRenderUsedMap.get(webId)![1];
      const webController: WebviewController | undefined = this.webControllerMap.get(webId);
      builderNode.dispose();
      webController?.clearHistory();
      this.preRenderUsedMap.delete(webId);
      const freeRender = this.preRenderUrlMap.get(deleteDomainUrl)![1];
      this.preRenderUrlMap.delete(deleteDomainUrl);
      this.webControllerMap.delete(webId);
      webController && this.webControllerFakeUrl.delete(webController);
      this.preRenderId.freeId(webId);
      if (freeRender.backFreeRender) {
        this.createPreRenderWebInstance(ExtWebController.uiContext!, [freeRender])
      }
    }
    BroadcastChannel.getInstance().bcDeleteCb(webId);
    GlobalEvent.getInstance().deleteCb(webId);
  }

  public addWebControllerUrl(wedId: number, fakeUrl: string) {
    if (this.webControllerMap.has(wedId)) {
      this.webControllerFakeUrl.set(this.webControllerMap.get(wedId)!, fakeUrl);
    }
  }

  public getWebControllerUrl(controller: WebviewController) {
    return this.webControllerFakeUrl.get(controller) ?? '';
  }
}