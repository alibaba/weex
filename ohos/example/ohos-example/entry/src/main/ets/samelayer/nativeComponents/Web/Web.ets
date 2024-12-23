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

import web_webview from '@ohos.web.webview';
import { sameLayerManager } from 'WebSceneKitHsp/Index';
import { WebParams } from '../../interfaces/SameLayer';
import { WebManager, PagefinishObj } from '../../utils/WebManger';

@Component
export struct WebComponent {
  @ObjectLink params: WebParams
  controller: web_webview.WebviewController = new web_webview.WebviewController();

  loadWeb() {
    WebManager.getInstance().saveWebviewController({
      name: this.params.componentId,
      WebviewController: this.controller,
    });
  }

  aboutToAppear(): void {
    this.loadWeb()
  }

  aboutToDisappear(): void {
    WebManager.getInstance().deleteWebviewController(this.params.componentId)
  }

  onMessage(message: object) {
    let onMessage: Function | undefined =
      (sameLayerManager.getSameLayerArgs(this.params.componentId) as WebParams)?.message
    onMessage && onMessage(message)
  }

  build() {
    Column() {
      Web({ src:this.params.src, controller: this.controller })
        .fileAccess(true)
        .domStorageAccess(true)
        .mixedMode(MixedMode.All)
        .databaseAccess(true)
        .geolocationAccess(true)
        .javaScriptAccess(true)
        .onPageBegin((event) => {
          if (event) {
            console.log('NativeEmbed web pagestart.', JSON.stringify(event))
            const callJsPagestart: Function | undefined =
              (sameLayerManager.getSameLayerArgs(this.params.componentId) as WebParams)?.pagestart
            callJsPagestart && callJsPagestart(event)
          }
        })
        .onPageEnd((event) => {
          if (event) {
            console.log('NativeEmbed web pagefinish.', JSON.stringify(event))
            const callBackObj: PagefinishObj = {
              url: event.url,
              title: this.controller.getTitle(),
              canGoBack: this.controller.accessBackward(),
              canGoForward: this.controller.accessForward(),
            }
            const callJsPagefinish: Function | undefined =
              (sameLayerManager.getSameLayerArgs(this.params.componentId) as WebParams)?.pagefinish
            callJsPagefinish && callJsPagefinish(callBackObj)
          }
        })
        .onErrorReceive((event) => {
          if (event) {
            console.log('NativeEmbed web error.', JSON.stringify(event))
            const callJsErr0r: Function | undefined =
              (sameLayerManager.getSameLayerArgs(this.params.componentId) as WebParams)?.error
            callJsErr0r && callJsErr0r({ errMsg: event.error.getErrorInfo() })
          }
        })
        .onTitleReceive((event) => {
          if (event) {
            console.log('NativeEmbed web receivedtitle.', JSON.stringify(event))
            const callJsReceivedtitle: Function | undefined =
              (sameLayerManager.getSameLayerArgs(this.params.componentId) as WebParams)?.receivedtitle
            callJsReceivedtitle && callJsReceivedtitle()
          }
        })
        .onControllerAttached(() => {
          this.controller.registerJavaScriptProxy({
            postMessage: (message: object) => {
              this.onMessage && this.onMessage(message)
            }
          }, "WebMessage", ["postMessage"])
          this.controller.refresh()
        })
    }
    .width(this.params.width)
    .height(this.params.height)
  }
}

@Builder
export function NativeWebBuilder(params: WebParams) {
  WebComponent({ params: params })
}
