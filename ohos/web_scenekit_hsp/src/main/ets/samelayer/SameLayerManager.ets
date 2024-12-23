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

import { BuilderNode, FrameNode, NodeController, NodeRenderType } from '@kit.ArkUI';
import Logger from '../common/Logger';

const TAG: string = '[SameLayerRender]';

const nodeContainerArgMap: Map<string, EmbedNodeController> = new Map();
const sameLayerArgsMap: Map<string, object> = new Map();
const nativeComponentBuilderMap: Map<string, (...args: Object[]) => void> = new Map();

interface RenderParams {
  embedId: string;
  embedType: string;
  embedWidth: number;
  embedHeight: number;
  surfaceId: string;
  componentId: string;
}

// 重新设置渲染参数中的宽高，但不修改原始数据中的宽高
function getRenderOptions(originalArgs: object, embedWidth: number | undefined, embedHeight: number | undefined): object {
  const args: ESObject = {};
  Object.keys(originalArgs).forEach(key => {
    args[key] = originalArgs[key]
  })
  args['width'] = embedWidth || 0;
  args['height'] = embedHeight || 0;
  return args;
}

class EmbedNodeController extends NodeController {
  private rootNode: BuilderNode<[Object]> | undefined | null;
  private embedId: string | undefined; // 分配给embed的ID
  private embedType: string | undefined; // 对应html中embed元素的type属性
  private embedWidth: number | undefined; // 对应html中embed元素的height属性转换后的值
  private embedHeight: number | undefined; // 对应html中embed元素的width属性转换后的值
  private surfaceId: string | undefined; // 分配给embed的surfaceId
  private componentId: string | undefined; // 对应html中embed元素的id属性
  private renderType: NodeRenderType = NodeRenderType.RENDER_TYPE_TEXTURE;

  makeNode(uiContext: UIContext): FrameNode | null {
    if (this.rootNode === null) {
      // 动态下树
      return null;
    }
    if (!this.embedType || !this.componentId) {
      Logger.warn(TAG, 'The id or type attribute of the embed tag is undefined.');
      return null;
    }
    // 未定义根节点则创建
    if (!this.rootNode) {
      this.rootNode = new BuilderNode<[Object]>(uiContext, { surfaceId: this.surfaceId, type: this.renderType });
      if (nativeComponentBuilderMap.get(this.embedType)) {
        const originalArgs = sameLayerArgsMap.get(this.componentId);
        if (originalArgs) {
          const renderOptions = getRenderOptions(originalArgs, this.embedWidth, this.embedHeight);
          const wrapBuilder: WrappedBuilder<[Object]> = new WrappedBuilder(nativeComponentBuilderMap.get(this.embedType) as (...args: Object[]) => void);
          this.rootNode.build(wrapBuilder, renderOptions);
        } else {
          Logger.warn(TAG, `Native component args is undefined.`);
          this.rootNode = null;
          return null;
        }
      } else {
        Logger.warn(TAG, `Native component builder is not registered, type: ${this.embedType}.`);
        this.rootNode = null;
        return null;
      }
    }
    // 动态上树
    return this.rootNode.getFrameNode();
  }

  release() {
    this.rootNode?.dispose();
  }

  setRenderParams(params: RenderParams) {
    this.embedId = params.embedId;
    this.embedType = params.embedType;
    this.embedWidth = params.embedWidth;
    this.embedHeight = params.embedHeight;
    this.surfaceId = params.surfaceId;
    this.componentId = params.componentId;
  }

  setEmbedWidth(width: number): void {
    this.embedWidth = width;
  }

  getEmbedWidth(): number | undefined {
    return this.embedWidth;
  }

  setEmbedHeight(height: number): void {
    this.embedHeight = height;
  }

  getEmbedHeight(): number | undefined {
    return this.embedHeight;
  }

  setBuilderNode(rootNode: BuilderNode<[Object]> | null): void {
    this.rootNode = rootNode;
  }

  getBuilderNode(): BuilderNode<[Object]> | undefined | null {
    return this.rootNode;
  }

  getEmbedId(): string | undefined {
    return this.embedId;
  }
}

export class SameLayerManager {
  private static instance: SameLayerManager;

  static getInstance(): SameLayerManager {
    if (!SameLayerManager.instance) {
      SameLayerManager.instance = new SameLayerManager();
    }
    return SameLayerManager.instance;
  }

  getNodeController(componentId: string): EmbedNodeController | undefined {
    return nodeContainerArgMap.get(componentId)
  }

  getSameLayerArgs(componentId: string): object | undefined {
    return sameLayerArgsMap.get(componentId)
  }

  handleNativeEmbedLifecycleChange(embed: NativeEmbedDataInfo, createCallback: Function, destroyCallback: Function) {
    // 获取web侧embed元素的id
    if (!embed.info?.type || !embed.info?.id || !embed.info?.width || !embed.info?.height) {
      Logger.warn(TAG, 'The embed tag is set incorrectly.');
      return
    }
    const componentId = embed.info.id;
    if (embed.status == NativeEmbedStatus.CREATE) {
      Logger.info(TAG, 'onNativeEmbedLifecycleChange CREATE')
      const nodeController = new EmbedNodeController();
      nodeController.setRenderParams({
        embedId: embed.embedId as string,
        embedType: embed.info.type,
        embedWidth: px2vp(embed.info.width), // 需要px2vp
        embedHeight: px2vp(embed.info.height), // 需要px2vp
        surfaceId: embed.surfaceId as string,
        componentId: componentId,
      })
      nodeContainerArgMap.set(componentId, nodeController)
      createCallback?.()
    } else if (embed.status == NativeEmbedStatus.UPDATE) {
      const nodeController = nodeContainerArgMap.get(componentId)!;
      const embedWidth = px2vp(embed.info.width);
      const embedHeight = px2vp(embed.info.height);
      // 页面滑动会导致embed标签的宽高会出现1px的抖动
      if (Math.abs(embedWidth - nodeController.getEmbedWidth()!) <= 1
        && Math.abs(embedHeight - nodeController.getEmbedHeight()!) <= 1 ) {
        return
      }
      Logger.info(TAG, 'onNativeEmbedLifecycleChange UPDATE: Re-render native component')
      nodeController.setEmbedWidth(embedWidth) // embed宽度发生变化，重新设置宽度
      nodeController.setEmbedHeight(embedHeight) // embed高度发生变化，重新设置高度
      const originalArgs = sameLayerArgsMap.get(componentId)!;
      const renderOptions = getRenderOptions(originalArgs, embedWidth, embedHeight);
      nodeController.getBuilderNode()?.update(renderOptions)
      nodeController.rebuild()
    } else {
      Logger.info(TAG, 'onNativeEmbedLifecycleChange DESTROY')
      // 清理数组元素，触发重新渲染
      destroyCallback?.()
      const nodeController = nodeContainerArgMap.get(componentId)
      nodeController?.release()
      // 动态下树
      nodeController?.setBuilderNode(null)
      nodeController?.rebuild()
      // 清理节点控制器
      nodeContainerArgMap.delete(componentId)
      // 清理同层渲染组件数据
      sameLayerArgsMap.delete(componentId)
    }
  }

  handleNativeEmbedGestureEvent(touch: NativeEmbedTouchInfo, componentIdArr: Array<string>) {
    Logger.info(TAG, `OnNativeEmbedGestureEvent: ${JSON.stringify(touch.touchEvent)}.`)
    componentIdArr.forEach((componentId: string) => {
      const nodeController = nodeContainerArgMap.get(componentId);
      if (nodeController?.getEmbedId() === touch.embedId) {
        const rootNode = nodeController?.getBuilderNode()
        let ret = rootNode?.postTouchEvent(touch.touchEvent);
        if (ret) {
          Logger.info(TAG, "onNativeEmbedGestureEvent is consumed by native.")
        } else {
          Logger.info(TAG, "onNativeEmbedGestureEvent is not consumed by native.")
        }
        touch?.result?.setGestureEventResult(ret)
      }
    })
  }

  transferSameLayerArgs(args: object) {
    if (!args) {
      Logger.warn(TAG, 'Args from web side is undefined.')
      return
    }
    if (!args['componentId']) {
      Logger.warn(TAG, 'ComponentId is undefined.')
      return
    }
    if (sameLayerArgsMap.get(args['componentId']) === undefined ||
      nodeContainerArgMap.get(args['componentId']) === undefined) {
      Logger.info(TAG, `Create native component attributes: ${JSON.stringify(args)}`);
      // 创建同层组件时
      sameLayerArgsMap.set(args['componentId'], args)
    } else {
      const originalArgs = sameLayerArgsMap.get(args['componentId'])!;
      Object.keys(originalArgs).forEach(key => {
        if (args[key] === undefined) {
          args[key] = originalArgs[key];
        }
      })
      Logger.info(TAG, `Update native component attributes: ${JSON.stringify(args)}`);
      sameLayerArgsMap.set(args['componentId'], args)
      // 宽高均为发生变化时走此处重新渲染
      if (args['width'] === originalArgs['width'] && args['height'] === originalArgs['height']) {
        Logger.info(TAG, 'transferSameLayerArgs: Re-render native component');
        // 更新原生组件
        const nodeController = nodeContainerArgMap.get(args['componentId']);
        if (!nodeController) {
          Logger.warn(TAG, 'NodeController instance is undefined.');
          return
        }
        const embedWidth = nodeController.getEmbedWidth();
        const embedHeight = nodeController.getEmbedHeight();
        const renderOptions = getRenderOptions(args, embedWidth, embedHeight);
        nodeController.getBuilderNode()?.update(renderOptions);
        nodeController.rebuild()
      }
    }
  }

  registerNativeComponentBuilders(componentName: string, builder: (...args: ESObject[]) => void) {
    // 同层渲染传递到原生的type会被转换为全小写
    const embedType: string = `native/${componentName.toLowerCase()}`;
    nativeComponentBuilderMap.set(embedType, builder)
  }
}

export const sameLayerManager = SameLayerManager.getInstance()
