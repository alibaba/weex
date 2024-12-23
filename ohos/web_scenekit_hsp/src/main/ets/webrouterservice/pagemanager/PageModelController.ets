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

import { Constant } from '../common/constant/Constant';
import { PageModel } from './PageModel';
import { PushPageType, RouteType } from '../common/entity/RouteType';
import { WebNodeController } from '../webmanger/WebNodeController';
import Logger from '../../common/Logger';

const TAG: string = 'PageModelController';

export class PageModelController {
  private static instance: PageModelController;
  public pageModelArray: Array<Array<PageModel>> = new Array();
  public pageStackArray: Array<NavPathStack> = new Array();

  public static getInstance(): PageModelController {
    if (!PageModelController.instance) {
      PageModelController.instance = new PageModelController();
    }
    return PageModelController.instance;
  }

  constructor() {
  }

  public addToPageStackArray(navPathStack: NavPathStack): void {
    this.pageStackArray.push(navPathStack);
  }

  public getPageStackArrayLen(): number {
    return this.pageStackArray.length;
  }

  public getCurrentPageModel(): PageModel | undefined {
    const nativePageId: number = this.getPageStackArrayLen() - 1;
    const pageModels = this.pageModelArray[nativePageId] ?? [];
    const length: number = pageModels?.length ?? 0;
    if (length === 0) {
      return undefined;
    }
    return pageModels[length-1];
  }


  public loading(isLoading: boolean) {
    let pageModel: PageModel | undefined = this.getCurrentPageModel();
    pageModel?.loading(isLoading);
  }

  public pushPathFirst() {
    const nativePageId: number = this.getPageStackArrayLen() - 1;
    let curPageModel: PageModel | undefined = nativePageId >= 1 ? [...this.pageModelArray[nativePageId-1] ?? []].pop() : undefined;
    let firstPageModel: PageModel = new PageModel(new WebNodeController(), 0);
    let pageModels = this.pageModelArray[nativePageId] ?? [];
    pageModels.push(firstPageModel);
    this.pageModelArray[nativePageId] = pageModels;

    this.pushPageStack(firstPageModel, false);
    firstPageModel.pageUp();
    // 执行下树操作
    if (curPageModel) {
      curPageModel.pageDown();
    }
    return;
  }

  public pushPath(routeType: RouteType) {
    const nativePageId: number = this.getPageStackArrayLen() - 1;
    let pageModel: PageModel | undefined = this.getCurrentPageModel() as PageModel;
    let nextPageModel: PageModel = new PageModel(new WebNodeController(), pageModel.id + 1);
    let pageModels = this.pageModelArray[nativePageId] ?? [];
    pageModels.push(nextPageModel);
    this.pageModelArray[nativePageId] = pageModels;

    this.pushPageStack(nextPageModel);

    if (routeType === RouteType.MULTI_MULTI) {
      // 延迟下树 解决动效白屏
      setTimeout(() => {
        pageModel?.pageDown();
      }, 300)
    } else {
      pageModel?.pageDown();
    }
    nextPageModel?.pageUp();
  }

  public replacePath() {
    const nativePageId: number = this.getPageStackArrayLen() - 1;
    let pageModel: PageModel | undefined = this.getCurrentPageModel() as PageModel;
    let nextPageModel: PageModel = new PageModel(new WebNodeController(), pageModel.id);
    let pageModels = this.pageModelArray[nativePageId] ?? [];
    pageModels.splice(-1, 1, nextPageModel);

    this.pageModelArray[nativePageId] = pageModels;
    pageModel?.pageDown();

    this.replacePageStack(nextPageModel);

    nextPageModel?.pageUp();
  }

  public popPath(popNum: number, animated: boolean, routerType?: RouteType, pushPageType?: PushPageType) {
    let pageModel: PageModel | undefined = this.getCurrentPageModel();
    const nativePageId: number = this.getPageStackArrayLen() - 1;
    let pageModels = this.pageModelArray[nativePageId] ?? [];
    while (popNum > 0) {
      if (pageModels.length > 0) {
        pageModels.pop();
      }
      popNum--;
    }
    this.pageModelArray[nativePageId] = pageModels;

    // fix 多单场景下的闪屏
    if (routerType === RouteType.MULTI_SINGLE) {
      this.loading(true);
    }

    this.popPageStack(animated);

    // 原生页返回原生页 nativePageId减一
    if (pageModels.length === 0 && nativePageId >= 0) {
      this.pageStackArray.splice(nativePageId);
    }
    if (pageModel) {
      pageModel?.pageDown();
    }

    let lastPageModel: PageModel | undefined = this.getCurrentPageModel();
    if (lastPageModel) {
      lastPageModel?.pageUp();
    }
  }

  private pushPageStack(pageModel: PageModel | undefined, isAnimation: boolean = true) {
    const nativePageId: number = this.getPageStackArrayLen() - 1;
    if (nativePageId >= 0) {
      this.pageStackArray[nativePageId]?.pushPath({ name: pageModel?.id.toString() }, isAnimation);
    } else {
      Logger.warn(TAG, 'pageStackArray is empty when pushPageStack');
    }
  }

  private replacePageStack(pageModel: PageModel | undefined, isAnimation: boolean = true) {
    const nativePageId: number = this.getPageStackArrayLen() - 1;

    if (nativePageId >= 0) {
      this.pageStackArray[nativePageId]?.replacePath({ name: pageModel?.id.toString() }, isAnimation);
    }
  }

  private popPageStack(animated: boolean) {
    const nativePageId: number = this.getPageStackArrayLen() - 1;
    let pageModel: PageModel | undefined = this.getCurrentPageModel();
    if (this.pageStackArray[nativePageId]?.size() === 1) {
      this.clearPageStack();
    } else {
      // 表示pop层数大于等于this.pageModelArray[nativePageId]的数量，直接clearPageStack
      if (!pageModel) {
        this.clearPageStack();
      } else {
        this.pageStackArray?.[nativePageId].popToIndex(pageModel?.id ?? 0, animated);
      }
    }
  }

  public clearPageStack() {
    const nativePageId: number = this.getPageStackArrayLen() - 1;
    this.pageStackArray?.[nativePageId].clear(false);
  }
}