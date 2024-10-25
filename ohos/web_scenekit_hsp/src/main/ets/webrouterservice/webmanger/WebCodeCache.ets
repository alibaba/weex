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

import { webview } from '@kit.ArkWeb'

export interface CodeCacheResponseSettings {
  headerKey: string
  headerValue: string
  data: string | number | Resource | ArrayBuffer;
}

class CodeCacheResponse {
  response: WebResourceResponse

  constructor() {
    this.response = new WebResourceResponse()
    this.setDefault()
  }

  setSettings(settings: CodeCacheResponseSettings) {
    this.response.setResponseHeader([{
      headerKey: settings.headerKey,
      headerValue: settings.headerValue
    }])
    this.response.setResponseData(settings.data)
  }

  private setDefault() {
    const response = this.response;
    response.setResponseEncoding('utf-8');
    response.setResponseMimeType('application/javascript');
    response.setResponseCode(200);
    response.setReasonMessage('OK');
  }
}

export interface CodeCacheController {
  getScheme(): webview.WebCustomScheme
  getResponseSettings(url: string): CodeCacheResponseSettings | null
}

class CodeCache {
  controllerSet: Set<CodeCacheController>

  constructor() {
    this.controllerSet = new Set()
  }

  getSchemeList() {
    const result: webview.WebCustomScheme[] = []
    for (const controller of this.controllerSet) {
      result.push(controller.getScheme())
    }
    return result
  }

  handleURL(url: string) {
    for (const controller of this.controllerSet) {
      const settings = controller.getResponseSettings(url)
      if (settings) {
        const response = new CodeCacheResponse()
        response.setSettings(settings)
        return response
      }
    }
    return null
  }

  registerController(controller: CodeCacheController) {
    this.controllerSet.add(controller)
    return this
  }
}

export const codeCache = new CodeCache()
