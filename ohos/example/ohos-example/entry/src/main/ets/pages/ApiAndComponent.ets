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

import AppContext from '@ohos.app.ability.common';
import router from '@ohos.router';
import { CommonAdapter } from '../commonadapter/CommonAdapter';
// import { ExtWeb, LocalUpdateManagerInstance, UpdateConfig } from 'WebSceneKit';
import { ExtWeb, LocalUpdateManagerInstance, UpdateConfig } from 'WebSceneKitHsp';
import { GlobalThis } from '../utils/GlobalThis';

@Entry
@Component
struct ApiAndComponent {
  commonAdapter: CommonAdapter = new CommonAdapter();
  url: string = "";

  aboutToAppear() {
    if (router.getParams()) {
      this.url = (router.getParams() as routerParam).url;
    }
    // commonAdapter认为是伙伴自己的业务代码
    this.commonAdapter.init();

    //热更新配置
    const context = GlobalThis.getInstance().getContext("GlobalContext")
    const func = (version: string) => {
      return `http://192.168.183.106:3000/apis/config?local_version=${version}`
    }
    UpdateConfig.getInstance().setup('0', func)
    LocalUpdateManagerInstance.updateMiniOnLaunch(context as AppContext.UIAbilityContext)
  }

  build() {
    Row() {
      Column() {
        ExtWeb({ url: this.url })
      }
      .width('100%')
    }
    .height('100%')
  }
}

interface routerParam {
  url: string
}