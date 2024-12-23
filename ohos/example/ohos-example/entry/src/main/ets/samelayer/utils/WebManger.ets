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

export interface WebCallbacks {
  createFinish?: Function
  onComplete?: Function
  onEnterFrame?: Function
  onLoopComplete?: Function
  message?: Function
}

export interface PagefinishObj {
  url: string
  title: string
  canGoBack?: boolean
  canGoForward?: boolean
}

interface WebParams {
  name: string
  WebviewController: web_webview.WebviewController
}

export class WebManager {
  private constructor() {
  }

  private static instance: WebManager;
  private webComponentMap = new Map<string, web_webview.WebviewController>();
  public ports: web_webview.WebMessagePort[] = [];

  public static getInstance(): WebManager {
    if (!WebManager.instance) {
      WebManager.instance = new WebManager();
    }
    return WebManager.instance;
  }

  public saveWebviewController(params: WebParams) {
    if (!this.webComponentMap.get(params.name)) {
      this.webComponentMap.set(params.name, params.WebviewController);
    }
  }

  public deleteWebviewController(name: string) {
    if (this.webComponentMap.get(name) !== undefined) {
      this.webComponentMap.delete(name)
    }
  }

  public goBack(name: string) {
    if (this.webComponentMap.get(name)) {
      this.webComponentMap.get(name)?.backward()
    }
  }

  public goForward(name: string) {
    if (this.webComponentMap.get(name)) {
      this.webComponentMap.get(name)?.forward()
    }
  }

  public reload(name: string) {
    if (this.webComponentMap.get(name)) {
      this.webComponentMap.get(name)?.refresh()
    }
  }

  public postMessage(name: string, message: object) {
    if (this.webComponentMap.get(name)) {
      this.webComponentMap.get(name)?.runJavaScript(`window.postMessage(${JSON.stringify(message)},'*')`)
    }
  }
}