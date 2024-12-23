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
// import { ExtWeb, LocalUpdateManagerInstance, UpdateConfig } from 'WebSceneKit/Index';
import { ExtWeb, LocalUpdateManagerInstance, UpdateConfig } from 'WebSceneKitHsp/Index';

@Entry
@Component
struct Second {
  @State message: string = '此Native页由Weex页面跳转而来, 1017'
  url: string = "";

  onBackPress(): boolean | void {
    router.back({
      url: '',
      params: { isLoading: false }
    })
    return true;
  }

  aboutToAppear() {
    if (router.getParams()) {
      this.url = (router.getParams() as routerParam).url;
    }
  }

  build() {
    Row() {
      Column() {
        Text(this.message)
          .fontSize(10)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
          })
        Button('第一个extWeb')
        ExtWeb({ url: "resource://rawfile/hybrid1.html"}).height('50%');
        Button('第二个extWeb')
        ExtWeb({ url: "resource://rawfile/hybrid2.html"})
      }
      .width('100%')
    }
    .height('100%')
  }
}

interface routerParam {
  url: string
}