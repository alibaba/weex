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

import { BuilderNode } from '@kit.ArkUI';
import { ViewAppear } from '../../adapterservice/api/ViewAppear';
import { BuilderData } from '../common/entity/BuilderData';
import { RouterStorage } from '../globalrouter/RouterStorage';
import { WebManager } from '../webmanger/WebManager';
import { WebNodeController } from '../webmanger/WebNodeController';
import { Constants } from '../../adapterservice/constants/Constants'

@Observed
export class PageModel {
  public isLoading: boolean = true;
  public webNodeController: WebNodeController;
  public id: number = 0;
  public webId: number = -1;

  constructor(webNodeController: WebNodeController, id: number) {
    this.webNodeController = webNodeController;
    this.id = id;
  }

  pageDown() {
    this.webNodeController.remove();
  }

  pageUp() {
    // todo 模板预热场景下当前url跳转当前url共用builderNode需兼容
    let webId: number = RouterStorage.getInstance().getCurrentWebId();
    ViewAppear.execAppearByCurrentPage(webId, Constants.VIEW_APPEAR_TYPE) // 回退到A页面时, 触发A页面上的 viewappear 事件
    let builderNode: BuilderNode<BuilderData[]> | undefined = WebManager.getInstance().getBuilderNode(webId);
    if (builderNode) {
      this.webId = webId;
      this.webNodeController.init(builderNode);
      this.webNodeController.add();
      // 预渲染的BuilderNode可能在绑定到PageModel之前已加载数据完成, 所以这里检查一下状态
      if (WebManager.getInstance().getWebStatus(webId) === 'webPageEnd') {
        this.isLoading = false;
      }
    }
  }

  loading(isLoading: boolean) {
    this.isLoading = isLoading;
  }
}