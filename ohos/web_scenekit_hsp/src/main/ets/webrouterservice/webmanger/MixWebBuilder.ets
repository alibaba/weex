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

import { JsBridge } from '../../adapterservice/model/JsBridge';
import { WebAdapter } from '../../adapterservice/model/WebAdapter';
import Logger from '../../common/Logger';
import { Constant } from '../common/constant/Constant';
import { WebManager } from './WebManager';
import { sameLayerManager } from '../../samelayer/SameLayerManager';
import { GlobalRouter } from '../globalrouter/GlobalRouter';
import { UrlUtil } from '../common/util/UrlUtil';
import { BuilderData } from '../common/entity/BuilderData';
import { MixWebManager } from './MixWebManager';
import webview from '@ohos.web.webview';

const TAG: string = 'MixWeb';

@Component
export struct MixWeb {
  @ObjectLink builderData: BuilderData
  @State componentIdArr: Array<string> = [];

  aboutToAppear(): void {
    webview.WebviewController.setWebDebuggingAccess(true);
  }

  aboutToDisappear(): void {
    console.log(TAG, 'aboutToDisappear');
    MixWebManager.getInstance().freeWeb(this.builderData.url, this.builderData.webId);
  }

  build() {
    Stack() {
      ForEach(this.componentIdArr, (componentId: string) => {
        NodeContainer(sameLayerManager.getNodeController(componentId))
      }, (componentId: string) => componentId)
      Web({ src: UrlUtil.getUrlTemplate(this.builderData.url), controller: this.builderData.controller })
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
        .zoomAccess(false)// 设置是否支持手势进行缩放，默认允许执行缩放。
        .horizontalScrollBarAccess(false)// 设置是否显示横向滚动条，默认显示。
        .onLoadIntercept((event) => {
          if (event) {
            return GlobalRouter.getInstance().router(event.data, true);
          }
          return false;
        })
        .javaScriptOnDocumentStart([{
          script: JsBridge.getJsBridgeScript(this.builderData.webId), scriptRules: [Constant.ASTERISK]
        }])
        .onControllerAttached(() => {
          this.builderData.controller.registerJavaScriptProxy(WebAdapter.getInstance(), Constant.WEB_ADAPTER, [Constant.RUN], [Constant.ASYNC_RUN]);
          Logger.info(TAG, '[WEB] : onControllerAttached');
          const ua = WebManager.getInstance().getUA();
          const webUA = this.builderData.controller.getUserAgent();
          if (!WebManager.getInstance().getWebUA()) {
            WebManager.getInstance().setWebUA(webUA);
          }
          if (ua) {
            this.builderData.controller.setCustomUserAgent(`${webUA}${ua}`);
          }
        })
        .onPageBegin(() => {
          this.builderData.controller.runJavaScript(`window.hmWeexBundleUrl = '${this.builderData.url}'`)
        })
    }
  }
}

@Builder
export function MixWebBuilder(builderData: BuilderData) {
  MixWeb({ builderData: builderData })
}