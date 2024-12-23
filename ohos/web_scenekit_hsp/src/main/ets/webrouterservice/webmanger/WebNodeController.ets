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

import { BuilderNode, FrameNode, NodeController } from '@ohos.arkui.node';
import { UIContext } from '@ohos.arkui.UIContext';
import { BuilderData } from '../common/entity/BuilderData';
import Logger from '../../common/Logger';

const TAG: string = 'WebNodeController';

export class WebNodeController extends NodeController {
  private rootNode: BuilderNode<BuilderData[]> | null = null;
  private isRemove: boolean = true;
  private date: number = new Date().getTime()

  makeNode(uiContext: UIContext): FrameNode | null {
    Logger.info(TAG, 'makeNode isRemove : ' + this.isRemove + ' ' + this.date);
    if (this.isRemove) {
      return null;
    }
    if (this.rootNode !== null) {
      return this.rootNode.getFrameNode();
    }
    return null;
  }

  init(rootNode: BuilderNode<BuilderData[]> | null) {
    this.rootNode = rootNode;
  }

  aboutToAppear() {
    Logger.info(TAG, 'aboutToAppear');
  }

  aboutToDisappear() {
    Logger.info(TAG, 'aboutToDisappear');
  }

  remove() {
    let uiContext: UIContext | undefined = AppStorage.get<UIContext>("uiContext");
    uiContext?.runScopedTask(() => {
      Logger.info(TAG, 'remove ' + this.date);
      this.isRemove = true;
      this.rebuild();
    })
  }

  release() {
    Logger.info(TAG, 'release');
    this.rootNode?.dispose();
  }

  add() {
    let uiContext: UIContext | undefined = AppStorage.get<UIContext>("uiContext");

    uiContext?.runScopedTask(() => {
      Logger.info(TAG, 'add ' + this.date);
      this.isRemove = false;
      this.rebuild();
    })
  }
}