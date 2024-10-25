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

import router from '@ohos.router';
import { Constant } from '../common/constant/Constant';
import Logger from '../../common/Logger';
import { LocalUpdateManagerInstance } from '../../bundleservice/update/LocalUpdateManager';
import { NodeType } from '../common/entity/NodeType';
import { PageModelController } from '../pagemanager/PageModelController';
import { RouterStorage } from './RouterStorage';
import { RouteType, PushPageType } from '../common/entity/RouteType';
import { UrlUtil } from '../common/util/UrlUtil';
import { WebManager } from '../webmanger/WebManager';
import bundleManager from '@ohos.bundle.bundleManager';
import { BusinessError } from '@ohos.base';
const TAG: string = 'GlobalRouter';

export class GlobalRouter {
  private static instance: GlobalRouter;

  /**
   * get GlobalRouter instance.
   *
   * @returns GlobalRouter
   */
  public static getInstance(): GlobalRouter {
    if (!GlobalRouter.instance) {
      GlobalRouter.instance = new GlobalRouter();
    }
    return GlobalRouter.instance;
  }


  /**
   * Load Home Page.
   *
   * @param routerUrl
   */
  public firstLoad(routerUrl: string): void {
    routerUrl = UrlUtil.addFakeDomain(routerUrl);
    let routerStorageInstance: RouterStorage = RouterStorage.getInstance();
    let nodeType: NodeType = routerStorageInstance.getNodeType(routerUrl);

    let webId: number = WebManager.getInstance().getWebInstanceId(false, routerUrl);
    // 原生页->原生页 如果是跳入新原生页pushPageType设置为NATIVE_TO_NATIVE
    let pushPageType: PushPageType = PushPageType.NATIVE_TO_NATIVE;
    let routeType: RouteType = RouteType.MULTI_MULTI;
    routerStorageInstance.addRouteType(routeType);
    // 区分每一次跳转 页面类型(混合)->页面类型(web)
    routerStorageInstance.addPushPageType(pushPageType);
    routerStorageInstance.addNode(routerUrl, webId, nodeType);
    routerStorageInstance.addUrlNode(routerUrl, webId);
    PageModelController.getInstance().pushPathFirst();

    if (nodeType === NodeType.TEMPLATE_NODE) {
      let params = UrlUtil.getUrlParams(routerUrl);
      // 如果此时routerUrl没有预热完毕，提交reloadUrl任务
      if (WebManager.getInstance().isPreloadFinish(routerUrl)) {
        WebManager.getInstance().getWebController(webId)?.runJavaScript(`reloadUrl(\"${params}\")`);
        PageModelController.getInstance().loading(false);
      } else {
        // 提交reloadUrl任务
        let task: Function = () => WebManager.getInstance()
          .getWebController(webId)?.runJavaScript(`reloadUrl(\"${params}\")`);
        WebManager.getInstance().setWebTask(routerUrl, task)
      }
    } else {
      if (!WebManager.getInstance().isPreRenderWeb(webId)) {
        WebManager.getInstance().addWebControllerUrl(webId, routerUrl);
        WebManager.getInstance().getWebController(webId)?.loadUrl(UrlUtil.getUrlTemplate(routerUrl));
      }
      WebManager.getInstance().getWebController(webId)?.onActive();
    }
  }

  /**
   * The router.
   *
   * @param data
   * @param isFirst
   * @param entryFile
   * @returns boolean
   */
  public router(data: WebResourceRequest, isFromMixPage: boolean = false): boolean {
    let routerUrl: string = data.getRequestUrl();
    let isRedirect: boolean = data.isRedirect();
    let isMainFrame: boolean = data.isMainFrame();
    let isRequestGesture: boolean = data.isRequestGesture();
    let routerStorageInstance: RouterStorage = RouterStorage.getInstance();
    let webManagerInstance: WebManager = WebManager.getInstance();

    routerUrl = UrlUtil.addFakeDomain(routerUrl);

    // Check the routerUrl is intercept by push or not, if in, don't intercept.
    // 业务必须要走navigator.push代理
    if (!routerStorageInstance.isFromPush || routerStorageInstance.isFromReplace) {
      if (routerStorageInstance.isFromReplace) {
        routerStorageInstance.isFromReplace = false;
      }
      return false;
    }
    routerStorageInstance.isFromPush = false;


    // Don't intercept --Same URL
    if (UrlUtil.getUrlTemplate(routerStorageInstance.getCurrentNodeUrl()) === routerUrl) {
      Logger.info(TAG, '相同url不拦截,url: ' + routerUrl);
      return false;
    }

    // Don't intercept --Redirection and Web-embedded iframe
    if (isRedirect || (!isMainFrame && !isRequestGesture)) {
      Logger.info(TAG, '重定向和web内嵌的iframe不拦截,url: ' + routerUrl);
      return false;
    }

    let nodeType: NodeType = routerStorageInstance.getNodeType(routerUrl);
    let lastNodeType: NodeType = routerStorageInstance.getLastNodeType();
    let webId: number = 1;
    let routeType: RouteType = RouteType.MULTI_SINGLE;
    let pushPageType: PushPageType = PushPageType.WEB_TO_WEB;

    // If both arkts and web pages are used, new HTML files are loaded to the web page.
    // 修改混合->混合跳转逻辑
    if (nodeType === NodeType.MIX_NODE) {
      return false
    } else if (isFromMixPage) {
      bundleManager.getBundleInfoForSelf(bundleManager.BundleFlag.GET_BUNDLE_INFO_WITH_APPLICATION)
        .then((bundleInfo: bundleManager.BundleInfo) => {
          let bundleUrl = '@bundle:' + bundleInfo.name + '/WebScenekitHsp/ets/pages/pageTemplate';
          router.pushUrl({
            url: bundleUrl,
            params: {
              url: routerUrl
            }
          })

        })
        .catch((error: BusinessError) => {
          console.error("get bundleInfo failed,error is " + error)
        })
      return true;
    }

    // The iframe embedded in the web page jumps to the new HTML file.
    if (!isMainFrame && isRequestGesture) {
      Logger.info(TAG, 'web内嵌的iframe,跳转到新的html,url: ' + routerUrl);
      routeType = RouteType.SINGLE_SINGLE;

      webId = webManagerInstance.getWebInstanceId(true);
      routerStorageInstance.addRouteType(routeType);
      routerStorageInstance.addPushPageType(pushPageType);
      routerStorageInstance.addNode(routerUrl, webId, lastNodeType);
      routerStorageInstance.addUrlNode(routerUrl, webId);

      return false;
    }

    if (nodeType === NodeType.TEMPLATE_NODE) {
      let urlTemplate: string = UrlUtil.getUrlTemplate(routerUrl);

      if (!webManagerInstance.templateUrlMap.has(urlTemplate)) {
        return false;
      }

      // 第一次不拦截
      let projectName: string = RouterStorage.getInstance().getProjectName(urlTemplate);
      let status = webManagerInstance.preloadStatus.get(projectName)?.get(urlTemplate);
      if (status && status === Constant.STATUS_INITIAL) {
        webManagerInstance.preloadStatus.get(projectName)?.set(urlTemplate, Constant.LOADING);
        return false;
      }

      // 判断是否跳转是同模版间跳转
      if (UrlUtil.isSameTemplate(routerStorageInstance.getCurrentNodeUrl(), routerUrl)) {
        routeType = RouteType.MULTI_SINGLE;
      } else {
        routeType = RouteType.MULTI_MULTI;
      }

      let webId: number = webManagerInstance.getWebInstanceId(false, routerUrl);
      routerStorageInstance.addRouteType(routeType);
      routerStorageInstance.addPushPageType(pushPageType);
      routerStorageInstance.addNode(routerUrl, webId, nodeType);
      routerStorageInstance.addUrlNode(routerUrl, webId);

      PageModelController.getInstance().pushPath(routeType);

      let params = UrlUtil.getUrlParams(routerUrl);
      webManagerInstance.getWebController(webId)?.runJavaScript(`reloadUrl(\"${params}\")`);
      if (WebManager.getInstance().isPreloadFinish(routerUrl)) {
        PageModelController.getInstance().loading(false);
      }
      return true;
    }

    const taskUrls = this.getTemplate(routerUrl);
    taskUrls.length && webManagerInstance.preloadTemplate(taskUrls);

    switch (lastNodeType) {
      case NodeType.TEMPLATE_NODE:
        webId = webManagerInstance.getWebInstanceId(false);
        routeType = RouteType.MULTI_MULTI;
        break;
      case NodeType.SAVE_NODE:
        webId = webManagerInstance.getWebInstanceId(false, routerUrl);
        routeType = RouteType.MULTI_MULTI;
        break;
      case NodeType.DEFAULT_NODE:
        webId = webManagerInstance.getWebInstanceId(true);
        routeType = RouteType.MULTI_SINGLE;
        break;
    }

    Logger.info(TAG, 'webId:' + webId + ', routeType:' + routeType + ', nodeType: ' + nodeType);

    routerStorageInstance.addRouteType(routeType);
    routerStorageInstance.addPushPageType(pushPageType);
    routerStorageInstance.addNode(routerUrl, webId, nodeType);
    routerStorageInstance.addUrlNode(routerUrl, webId);

    PageModelController.getInstance().pushPath(routeType);
    if (!WebManager.getInstance().isPreRenderWeb(webId)) {
      WebManager.getInstance().addWebControllerUrl(webId, routerUrl);
      webManagerInstance.getWebController(webId)?.loadUrl(UrlUtil.getUrlTemplate(routerUrl));
    }
    WebManager.getInstance().getWebController(webId)?.onActive();
    return true;
  }

  public getTemplate(routerUrl: string): Array<string> {
    routerUrl = UrlUtil.getUrlTemplate(routerUrl);
    let projectName: string = RouterStorage.getInstance().getProjectName(routerUrl);
    // url未配置，不做处理
    if (projectName === '') {
      return [];
    }
    // 需要预热的模板
    let preLoadProjects: Array<string> | undefined = RouterStorage.getInstance()
      .projectsConfig
      .get(projectName)?.preLoadProjects;
    // 当前预热的模板
    let currentProjects: Map<string, Map<string, string>> = WebManager.getInstance().preloadStatus;

    let addProjects: Array<string> = new Array();
    let deleteProjects: Array<string> = new Array();
    preLoadProjects?.forEach((preLoadProject: string) => {
      if (!currentProjects.has(preLoadProject)) {
        addProjects.push(preLoadProject);
      }
    })
    currentProjects.forEach((value: Map<string, string>, key: string) => {
      if (!preLoadProjects?.includes(key)) {
        deleteProjects.push(key);
      }
    })

    if (preLoadProjects?.length === 0 && deleteProjects.length === 0) {
      return [];
    }
    // 删除冗余模版
    WebManager.getInstance().deleteProject(deleteProjects);
    // 获取预热模版
    return WebManager.getInstance().addProject(addProjects);
  }

  /**
   * On back press.
   *
   * @param webId
   * @returns
   */
  public onBackPress(popNum: number, animated: boolean): boolean {
    const nativePageId: number = PageModelController.getInstance().getPageStackArrayLen() - 1;
    const routerStorageInstance = RouterStorage.getInstance();
    const pageModelInstance = PageModelController.getInstance();

    // compare the popNum and current page num of this extWeb.
    if (popNum > pageModelInstance.pageModelArray[nativePageId].length) {
      popNum = pageModelInstance.pageModelArray[nativePageId].length;
    }

    const webIdArray = routerStorageInstance.deleteNode(popNum);
    let routerType: RouteType = routerStorageInstance.getRouteType();
    let routeTypeArray = routerStorageInstance.deleteRouteType(popNum);
    routerStorageInstance.deleteUrlNode(webIdArray.length ?? 1);
    let pushPageType = routerStorageInstance.deletePushPageType(popNum);

    let lastUrl: string = RouterStorage.getInstance().getCurrentNodeUrl();
    const taskUrls = this.getTemplate(lastUrl);
    taskUrls.length && WebManager.getInstance().preloadTemplate(taskUrls);

    let controller: WebviewController | undefined;
    routeTypeArray.forEach((curRouteType, index) => {
      // 考虑iframe嵌套 单单场景下不需要进行上下树以及navigation的出栈
      switch (curRouteType) {
        case RouteType.SINGLE_SINGLE:
          popNum && popNum--;
          controller = WebManager.getInstance().getWebController(webIdArray[index]);
          if (controller?.accessBackward()) {
            controller?.backward();
          }
        case RouteType.MULTI_SINGLE:
          controller = WebManager.getInstance().getWebController(webIdArray[index]);
          if (controller?.accessBackward()) {
            controller?.backward();
          }
        case RouteType.MULTI_MULTI:
          if (routerStorageInstance.checkNeedFreeOrNot(webIdArray[index])) {
            WebManager.getInstance().freeWebInstance(webIdArray[index]);
          }
      }
    })

    // 单单返回不需要popPath
    if (popNum > 0) {
      pageModelInstance.popPath(popNum, animated, routerType, pushPageType);
    }

    if (pageModelInstance.pageModelArray[nativePageId].length === 0) {
      PageModelController.getInstance().pageModelArray.splice(nativePageId);
      router.back();
    }

    if (routerStorageInstance.getRouteNodesSize() === 0) {
      routerStorageInstance.clear();
    }
    return true;
  }

  public replacePage(url: string): void {
    const routerStorageInstance: RouterStorage = RouterStorage.getInstance();
    // 没有Node, 无法replace, 直接返回
    if (!routerStorageInstance.getCurrentNodeUrl()) {
      return;
    }
    const routerUrl = UrlUtil.addFakeDomain(url);
    const nodeType: NodeType = routerStorageInstance.getNodeType(routerUrl);
    const webManagerInstance: WebManager = WebManager.getInstance();

    if (nodeType === NodeType.TEMPLATE_NODE) {
      const urlTemplate: string = UrlUtil.getUrlTemplate(routerUrl);
      // 新页面是预热节点但还未预热，直接退出
      if (!webManagerInstance.templateUrlMap.has(urlTemplate)) {
        return;
      }
    } else {
      const taskUrls = this.getTemplate(routerUrl);
      taskUrls.length && webManagerInstance.preloadTemplate(taskUrls);
    }
    const webArray = routerStorageInstance.deleteNode(1);
    webArray && webArray.length && webManagerInstance.freeWebInstance(webArray[0]);
    const webId: number = webManagerInstance.getWebInstanceId(false,routerUrl);
    routerStorageInstance.addNode(routerUrl, webId, nodeType);
    routerStorageInstance.deleteUrlNode(1);
    routerStorageInstance.addUrlNode(routerUrl, webId);

    // 页面replacePath切换
    PageModelController.getInstance().replacePath();

    if (nodeType === NodeType.TEMPLATE_NODE) {
      const params = UrlUtil.getUrlParams(routerUrl);
      webManagerInstance.getWebController(webId)?.runJavaScript(`reloadUrl(\"${params}\")`);
      if (WebManager.getInstance().isPreloadFinish(routerUrl)) {
        PageModelController.getInstance().loading(false);
      }
    } else {
      routerStorageInstance.isFromReplace = true
      if (!WebManager.getInstance().isPreRenderWeb(webId)) {
        WebManager.getInstance().addWebControllerUrl(webId, routerUrl);
        webManagerInstance.getWebController(webId)?.loadUrl(routerUrl);
      }
      WebManager.getInstance().getWebController(webId)?.onActive();
    }
  }

  public onInterceptRequest(data: WebResourceRequest): WebResourceResponse | null {
    let fakeDomain: string = Constant.FAKE_DOMAIN;
    const url = data.getRequestUrl();
    const responseWeb = new WebResourceResponse();
    if (url === undefined || !url.startsWith(fakeDomain)) {
      Logger.warn(TAG, `The url is blocked: ${url ? url : "undefined"}`);
      return null;
    }
    let newUrl: string = '';
    let splitString: string = fakeDomain + Constant.URL_HARD_RESOURCE;

    const localWebResourceResponse = LocalUpdateManagerInstance.useSandboxCacheResource(url, fakeDomain);
    if (localWebResourceResponse != null) {
      return localWebResourceResponse;
    }

    if (url.startsWith(splitString)) {
      newUrl = url.substring(splitString.length);
    }
    const position = newUrl.indexOf(Constant.QUESTION_MARK);
    if (position !== -1) {
      newUrl = newUrl.substring(0, position);
    }
    Logger.info(TAG, 'newUrl' + newUrl);
    try {
      if (newUrl.indexOf(Constant.FILE_TYPE_JS) !== -1) {
        let hashCode: number | undefined = RouterStorage.getInstance().jsCodeCache.get(newUrl);
        if (!hashCode) {
          hashCode = Date.now();
          RouterStorage.getInstance().jsCodeCache.set(newUrl, hashCode);
        }
        responseWeb.setResponseHeader([
          {
            headerKey: Constant.RESPONSE_DATA_ID,
            headerValue: hashCode.toString()
          }
        ])
      }
      responseWeb.setResponseData($rawfile(newUrl));
      responseWeb.setResponseEncoding(Constant.ENCODING_UTF_8);
      responseWeb.setResponseMimeType(Constant.MIME_TYPE_TEXT_HTML);
      responseWeb.setResponseCode(Constant.RESPONSE_CODE);
      responseWeb.setReasonMessage(Constant.REASON_MESSAGE_OK);
      return responseWeb;
    } catch (error) {
      Logger.warn(TAG, `This file is not exist`);
      return null;
    }
  }
}