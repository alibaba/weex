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

import { GlobalRouter } from '../globalrouter/GlobalRouter';
import Logger from '../../common/Logger';
import { PageModel } from './PageModel';
import { PageModelController } from './PageModelController';
import { Constant } from '../common/constant/Constant';

const TAG: string = 'DestinationPage';

@Component
export struct SubPage {
  @State pageModel: PageModel | undefined = PageModelController.getInstance().getCurrentPageModel();

  aboutToAppear(): void {
    Logger.info(TAG, 'pageModel aboutToAppear');
  }

  aboutToDisappear(): void {
    Logger.info(TAG, 'pageModel aboutToDisappear');
  }

  build() {
    NavDestination() {
      if (this.pageModel?.isLoading) {
        Column() {
          LoadingProgress()
            .color(Color.Gray)
            .width(Constant.WIDTH_PERCENT_TWENTY)
            .height(Constant.HEIGHT_PERCENT_TWENTY)
        }
        .width(Constant.FULL_PERCENT)
        .height(Constant.FULL_PERCENT)
        .justifyContent(FlexAlign.Center)
        .alignItems(HorizontalAlign.Center)
      } else {
        Column() {
          NodeContainer(this.pageModel?.webNodeController)
        }
      }
    }
    .hideTitleBar(true)
    .onBackPressed(() => {
      Logger.info(TAG, 'pageModel onBackPressed');
      return GlobalRouter.getInstance().onBackPress(1, true)
    })
  }
}