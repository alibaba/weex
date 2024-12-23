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

import { GlobalRouter } from './webrouterservice/globalrouter/GlobalRouter';
import Logger from './common/Logger';
import { SubPage } from './webrouterservice/pagemanager/SubPage';
import { MixWebManager } from './webrouterservice/webmanger/MixWebManager';
import { WebManager } from './webrouterservice/webmanger/WebManager';
import { RouterStorage } from './webrouterservice/globalrouter/RouterStorage';
import { NodeType } from './webrouterservice/common/entity/NodeType';
import { emitter } from '@kit.BasicServicesKit';
import { UrlInfo } from './webrouterservice/common/entity/UrlInfo';
import { UrlUtil } from './webrouterservice/common/util/UrlUtil';

import { ViewAppear } from './adapterservice/api/ViewAppear';
import { Constants } from './adapterservice/constants/Constants'
import { PageModelController } from './webrouterservice/pagemanager/PageModelController';

const TAG: string = 'WeexWeb';

@Component
export struct ExtWeb {
  @Prop @Watch('urlChanged') url: string = '';
  @Prop @Watch('showStatusChanged') showStatus: number = 0; // 1:可见 2:不可见
  @State navPathStack: NavPathStack | undefined = undefined;
  asMixWeb: boolean = false;

  @Builder
  PageMap(name:string, param: object) {
    SubPage()
  }

  // 用户设置有效的url之后，再执行初始化
  urlChanged() {
    if (this.url) {
      this.initLoad();
    }
  }

  // 解决jumpNative跳转和前后台切换时，weex项目触发viewappear和viewdisappear
  showStatusChanged() {
    if (this.showStatus === 1) {
      ViewAppear.execAppearByCurrentPage(RouterStorage.getInstance().getCurrentWebId(), Constants.VIEW_APPEAR_TYPE)
    } else if(this.showStatus === 2) {
      ViewAppear.execAppearByCurrentPage(RouterStorage.getInstance().getCurrentWebId(), Constants.VIEW_DIS_APPEAR_TYPE)
    }
  }

  initLoad() {
    if(this.asMixWeb){
      RouterStorage.getInstance().urlConfig.set(UrlUtil.getUrlTemplate(this.url), new UrlInfo(4, ''))
    }
    if (RouterStorage.getInstance().getNodeType(this.url) !== NodeType.MIX_NODE) {
      // 新起原生页 nativePageId+1
      const taskUrls = GlobalRouter.getInstance().getTemplate(UrlUtil.addFakeDomain(this.url));
      WebManager.getInstance().templateNeed === -1 && (WebManager.getInstance().templateNeed = taskUrls.length);
      // 进入aboutToAppear的时机早于web实例准备完毕
      emitter.on({ eventId: -1 }, (_data) => {
        WebManager.getInstance().preloadTemplate(taskUrls);
        GlobalRouter.getInstance().firstLoad(this.url);
      })
      // 进入aboutToAppear的时机晚于web实例准备完
      if (WebManager.getInstance().checkWebFinished()) {
        WebManager.getInstance().preloadTemplate(taskUrls);
        GlobalRouter.getInstance().firstLoad(this.url);
      }
    }
  }

  aboutToAppear(): void {
    if (!this.asMixWeb) {
      this.navPathStack = new NavPathStack();
      PageModelController.getInstance().addToPageStackArray(this.navPathStack);
    }
    Logger.info(TAG, 'WeexWeb aboutToAppear');
    // 混合页使用osWeb
    if (this.url) {
      this.initLoad()
    }
  }

  build() {
    if(this.url && this.asMixWeb){
      NodeContainer(MixWebManager.getInstance().getWebNodeController(this.url))
    } else if (!this.asMixWeb && this.url && RouterStorage.getInstance().getNodeType(this.url) !== NodeType.MIX_NODE) {
      Navigation(this.navPathStack) {
      }
      .navDestination(this.PageMap)
      .hideToolBar(true)
      .hideTitleBar(true)
      .hideBackButton(true)
      .mode(NavigationMode.Stack)
    }
  }
}