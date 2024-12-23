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

import { NodeType } from '../common/entity/NodeType';
import { PageModelController } from '../pagemanager/PageModelController';
import { Project } from '../common/entity/Project';
import { RouteNode } from '../common/entity/RouteNode';
import { RouteType, PushPageType } from '../common/entity/RouteType';
import { UrlInfo } from '../common/entity/UrlInfo';
import { UrlUtil } from '../common/util/UrlUtil';
import { WebManager } from '../webmanger/WebManager';
import { Constant } from '../common/constant/Constant';

export class RouterStorage {
  private static instance: RouterStorage;
  private routeNodes: Array<RouteNode> = [];
  private routeTypes: Array<RouteType> = [];
  private pushPageTypes: Array<PushPageType> = [];
  private urlNodes: Map<string, number> = new Map();
  public urlConfig: Map<string, UrlInfo> = new Map();
  public projectsConfig: Map<string, Project> = new Map();
  public jsCodeCache: Map<string, number> = new Map();
  isFromPush: boolean = false;
  isFromReplace: boolean = false;

  /**
   * Singleton mode get instance.
   *
   * @returns RouterStorage
   */
  public static getInstance(): RouterStorage {
    if (!RouterStorage.instance) {
      RouterStorage.instance = new RouterStorage();
    }
    return RouterStorage.instance;
  }

  addNode(url: string, webId: number, type: NodeType): void {
    this.routeNodes.push({ url, webId, type });
  }

  deleteNode(popNum?: number): Array<number> {
    // 兼容回退多次
    let webIdArray: Array<number> = [];
    popNum = popNum ?? 1;
    while (popNum > 0) {
      if (this.routeNodes.length > 0) {
        webIdArray.push(this.routeNodes.pop()?.webId as number);
      }
      popNum--;
    }
    return webIdArray;
  }

  shiftNode(): void {
    let routeNode = this.routeNodes.shift();
    this.pushPageTypes.shift();
    this.routeTypes.shift();
    this.deleteUrlNode(1, routeNode?.url);
    // 同步更改pageModelArray
    const nativePageId: number = PageModelController.getInstance().getPageStackArrayLen() - 1;
    let pageModel = PageModelController.getInstance().pageModelArray[nativePageId]?.shift();
    pageModel?.webNodeController.init(null);
  }

  clearPage(): number | undefined {
    while (this.routeNodes[0].type === NodeType.TEMPLATE_NODE) {
      this.shiftNode();
    }

    let routeNode = this.routeNodes[0];
    if (routeNode !== undefined) {
      this.shiftNode();
    }

    for (let i = 0; i < this.routeNodes.length; i++) {
      if (this.routeNodes[i].webId !== routeNode?.webId) {
        break;
      }
      this.shiftNode();
    }
    return routeNode?.webId;
  }

  getRouteNodesSize(): number {
    return this.routeNodes.length;
  }

  addRouteType(routeType: RouteType): void {
    this.routeTypes.push(routeType);
  }

  deleteRouteType(popNum?: number): Array<RouteType> {
    // 兼容回退多次
    let routeTypeArray: Array<RouteType> = []
    popNum = popNum ?? 1;
    while (popNum > 0) {
      if (this.routeTypes.length > 0) {
        routeTypeArray.push(this.routeTypes.pop() as RouteType);
      }
      popNum--;
    }
    return routeTypeArray;
  }

  getRouteType(): RouteType {
    const length: number = this.routeTypes.length;
    if (length === 0) {
      return RouteType.MULTI_SINGLE;
    }
    return this.routeTypes[length-1];
  }

  addPushPageType(pushPageType: PushPageType): void {
    this.pushPageTypes.push(pushPageType);
  }

  deletePushPageType(popNum?: number): PushPageType | undefined {
    // 兼容回退多次
    let pushTypesArray: Array<PushPageType | undefined> = [];
    popNum = popNum ?? 1;
    while (popNum > 0) {
      if (this.pushPageTypes.length > 0) {
        pushTypesArray.push(this.pushPageTypes.pop());
      }
      popNum--;
    }
    return pushTypesArray[pushTypesArray.length -1];
  }

  addUrlNode(url: string, webId: number): void {
    this.urlNodes.set(url, webId);
  }

  deleteUrlNode(popNum: number, url?: string): void {
    if (url) {
      this.urlNodes.delete(url);
    } else {
      while (popNum > 0 && this.urlNodes.size > 0) {
        const keys = Array.from(this.urlNodes.keys());
        this.urlNodes.delete(keys[keys.length-1]);
        popNum--;
      }
    }
  }

  getPushPageType(): PushPageType {
    const length: number = this.pushPageTypes.length;
    if (length === 0) {
      return PushPageType.WEB_TO_WEB;
    }
    return this.pushPageTypes[length-1];
  }

  getLastNodeType(): NodeType {
    const length: number = this.routeNodes.length;
    if (length === 0) {
      return NodeType.DEFAULT_NODE;
    }
    return this.routeNodes[length-1].type;
  }

  getCurrentNodeUrl(): string {
    const length: number = this.routeNodes.length;
    if (length === 0) {
      return '';
    }
    return this.routeNodes[length-1].url;
  }

  checkNeedFreeOrNot(webId: number) {
    let webArray: Array<number> = [];
    this.routeNodes.forEach((route: RouteNode) => {
      webArray.push(route.webId);
    })
    const webUsed = webArray.includes(webId) || WebManager.getInstance().templateUsedMap.has(webId);
    if (webUsed) {
      return false;
    }
    const preRenderKeepLive = WebManager.getInstance().isPreRenderKeepLive(webId);
    return !preRenderKeepLive;
  }


  getCurrentWebId(url?: string): number {
    const length: number = this.routeNodes.length;
    // If the url is defined, consider the multi extWeb.
    if (url) {
      return this.urlNodes.get(UrlUtil.addFakeDomain(url)) ?? 0;
    }
    if (length === 0) {
      return 0;
    }
    return this.routeNodes[length-1].webId;
  }

  getCurrentUrl(webId:number): string {
    let url = '';
    this.urlNodes.forEach((value, key) => {
      if (value === webId) {
        url = key;
      }
    });
    return url;
  }

  getLastUrlNode(): string {
    const urlNodeKeys = Array.from(this.urlNodes.keys())
    return urlNodeKeys[urlNodeKeys.length-1]
  }

  clear() {
    this.routeNodes = [];
    this.pushPageTypes = [];
    this.routeTypes = [];
    // PageModelController.getInstance().clearPageStack();
  }

  getNodeType(url: string): NodeType {
    let newUrl: string = UrlUtil.getUrlTemplate(url);
    let type: number | undefined = RouterStorage.getInstance().urlConfig.get(newUrl)?.type;
    let nodeType: NodeType = NodeType.SAVE_NODE;
    switch (type) {
      case 1:
        nodeType = NodeType.TEMPLATE_NODE
        break;
      case 2:
        nodeType = NodeType.SAVE_NODE
        break;
      case 3:
        nodeType = NodeType.DEFAULT_NODE
        break;
      case 4:
        nodeType = NodeType.MIX_NODE
        break;
    }
    return nodeType;
  }

  getProjectName(url: string): string {
    let fakeDomain: string = Constant.FAKE_DOMAIN;
    if (url.startsWith(fakeDomain)) {
      url = url.substring(fakeDomain.length);
    }
    let projectName: string | undefined = RouterStorage.getInstance().urlConfig.get(url)?.projectName;
    return projectName ?? '';
  }
}