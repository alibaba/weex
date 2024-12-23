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

import { BuilderData } from '../common/entity/BuilderData';
import { Constant } from '../common/constant/Constant';
import { GlobalRouter } from '../globalrouter/GlobalRouter';
import { JsBridge } from '../../adapterservice/model/JsBridge';
import Logger from '../../common/Logger';
import { PageModelController } from '../pagemanager/PageModelController';
import { RouterStorage } from '../globalrouter/RouterStorage';
import { RouteType } from '../common/entity/RouteType';
import { WebAdapter } from '../../adapterservice/model/WebAdapter';
import { WebManager } from './WebManager';
import { NodeType } from '../common/entity/NodeType';
import { sameLayerManager } from '../../samelayer/SameLayerManager';
import webview from '@ohos.web.webview';
import { emitter } from '@kit.BasicServicesKit';
import { PageModel } from '../pagemanager/PageModel';
import { codeCache } from './WebCodeCache';

const TAG: string = 'WebBuilder';

@Component
struct weexWeb {
  @ObjectLink builderData: BuilderData
  @State componentIdArr: Array<string> = []

  aboutToAppear(): void {
    webview.WebviewController.setWebDebuggingAccess(true);
    try {
      const schemeList = codeCache.getSchemeList();
      webview.WebviewController.customizeSchemes(schemeList);
    } catch (e) {
      console.error(`[WEB] customizeSchemes Error: ${e.code}, ${e.message}`);
    }
  }

  build() {
    Column() {
      Stack() {
        ForEach(this.componentIdArr, (componentId: string) => {
          NodeContainer(sameLayerManager.getNodeController(componentId))
        }, (componentId: string) => componentId)
        Web({ src: this.builderData.url, controller: this.builderData.controller })
          .enableNativeEmbedMode(true)
          .onNativeEmbedLifecycleChange((embed) => {
            sameLayerManager.handleNativeEmbedLifecycleChange(embed, () => {
              // 创建新节点更新 componentIdArr
              this.componentIdArr.push(embed.info?.id!)
            }, () => {
              this.componentIdArr.splice(this.componentIdArr.indexOf(embed.info?.id!), 1)
            });
          })
          .onNativeEmbedGestureEvent((touch) => {
            sameLayerManager.handleNativeEmbedGestureEvent(touch, this.componentIdArr);
          })
          .fileAccess(true)
          .domStorageAccess(true)
          .mixedMode(MixedMode.All)
          .databaseAccess(true)
          .geolocationAccess(true)
          .javaScriptAccess(true)
          .onConsole((event) => {
            Logger.info(TAG, '[WEB] : ' + event?.message.getMessage());
            // This interface is used to notify the host application of the JS console message.
            // If true is returned, the message is printed to the console.
            return false
          })
          .zoomAccess(false)// 设置是否支持手势进行缩放，默认允许执行缩放。
          .horizontalScrollBarAccess(false)// 设置是否显示横向滚动条，默认显示。
          .onInterceptRequest((event) => {
            if (event) {
              const url = event.request.getRequestUrl();
              const customResponse = codeCache.handleURL(url);
              if (customResponse) {
                console.log('[WEB] : custom cached success', url)
                return customResponse.response;
              }
              return GlobalRouter.getInstance().onInterceptRequest(event.request);
            }
            return null;
          })
          .onPageEnd(() => {
            if (RouterStorage.getInstance().getRouteType() === RouteType.MULTI_MULTI) {
              const pageModel = PageModelController.getInstance().getCurrentPageModel();
              if (pageModel?.webId === this.builderData.webId) {
                pageModel?.loading(false)
              }
            }
            this.builderData.controller.onActive();
            WebManager.getInstance().refreshStatus(this.builderData.controller.getUrl());
            WebManager.getInstance().setWebStatus(this.builderData.webId, 'webPageEnd');
            Logger.info(TAG, '[WEB] : onPageEnd');
          })
          .onResourceLoad((event) => {
            //Logger.info(TAG, '[WEB] : onResourceLoad : ' + event.url);
          })
          .onLoadIntercept((event) => {
            if (event) {
              return GlobalRouter.getInstance().router(event.data);
            }
            return false;
          })
          .onPageBegin(() => {
            // 模板预热预加载需要手动onActive
            let nodeType: NodeType = RouterStorage.getInstance().getNodeType(this.builderData.controller.getUrl());
            if (nodeType === NodeType.TEMPLATE_NODE) {
              this.builderData.controller.onActive();
            }
            this.builderData.controller.runJavaScript(`window.hmWeexBundleUrl = '${WebManager.getInstance().getWebControllerUrl(this.builderData.controller)}'`)
            Logger.info(TAG, '[WEB] : onPageBegin');
          })
          .javaScriptOnDocumentStart([{
            script:  JsBridge.getJsBridgeScript(this.builderData.webId), scriptRules: [Constant.ASTERISK]
          }])
          .onFirstContentfulPaint(()=>{
            PageModelController.getInstance().loading(false)
            Logger.info(TAG, '[WEB] : onFirstContentfulPaint');
          })
          .onControllerAttached(() => {
            const ua = WebManager.getInstance().getUA();
            const webUA = this.builderData.controller.getUserAgent();
            if (!WebManager.getInstance().getWebUA()) {
              WebManager.getInstance().setWebUA(webUA);
            }
            if (ua) {
              this.builderData.controller.setCustomUserAgent(`${webUA}${ua}`);
            }

            Logger.info(TAG, 'success' + ' ' + this.builderData.webId);
            this.builderData.controller.registerJavaScriptProxy(WebAdapter.getInstance(), Constant.WEB_ADAPTER, [Constant.RUN], [Constant.ASYNC_RUN]);
            WebManager.getInstance().setWebStatus(this.builderData.webId, 'finished');
            if (WebManager.getInstance().checkWebFinished() && AppStorage.get('webStatus') !== 'finished') {
              AppStorage.setOrCreate('webStatus', 'finished');
              emitter.emit({ eventId: -1 }, {
                data: {
                  webStatus: 'finished'
                }
              })
            }
            Logger.info(TAG, '[WEB] : onControllerAttached');
          })
      }
    }
  }
}

@Builder
export function WebBuilder(builderData: BuilderData) {
  weexWeb({ builderData: builderData })
}