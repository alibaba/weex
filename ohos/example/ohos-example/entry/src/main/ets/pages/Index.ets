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
import { ExtWebController, PreRenderUrl } from 'WebSceneKitHsp';
import window from '@ohos.window';
import { CommonAdapter } from '../commonadapter/CommonAdapter';

@Entry
@Component
struct Index {
  commonAdapter: CommonAdapter = new CommonAdapter();

  aboutToAppear(): void {
    // 使用extWeb必须init 初始化api方法
    this.commonAdapter.init();
    ExtWebController.preRenderUrls([
      new PreRenderUrl('/data/storage/el2/base/haps/entry/files/web.html', true, false),
      new PreRenderUrl('resource://rawfile/frameworkTest_web/pages/index/entry.html?hello=world', false, false),
      new PreRenderUrl('https://www.jd.com/', true, false),
    ]);
  }

  onPageShow(): void {
    ExtWebController.preRenderUrls([
      new PreRenderUrl('https://www.taobao.com/', false, false),
    ]);
  }

  build() {
    Row() {
      Column({ space: 10 }) {
        Button("跳转到华为商城，有预渲染")
          .width('100%')
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            router.pushUrl({
              url: "pages/ExtWebPage",
              params: {
                url: 'https://www.vmall.com/',
              }
            })
          })
        Button("跳转到开发者联盟，无预渲染")
          .width('100%')
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            router.pushUrl({
              url: "pages/ExtWebPage",
              params: {
                url: 'https://developer.huawei.com/consumer/cn/',
              }
            })
          })
        Button("跳转到CommonTest，有预渲染")
          .width('100%')
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            router.pushUrl({
              url: "pages/ExtWebPage",
              params: {
                url: 'resource://rawfile/frameworkTest_web/pages/index/entry.html',
              }
            })
          })
        Button("跳转到沙箱路径entry/files/web.html，有预渲染")
          .width('100%')
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            router.pushUrl({
              url: "pages/ExtWebPage",
              params: {
                url: '/data/storage/el2/base/haps/entry/files/web.html',
              }
            })
          })
      }
    }
    .height('100%')
  }
}

