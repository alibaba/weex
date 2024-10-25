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

import { BroadcastChannel } from '../api/BroadcastChannel';
import { ClipboardAPI } from '../api/ClipboardAPI';
import { Constants } from '../constants/Constants';
import { DeviceInfoAPI } from '../api/DeviceInfoAPI';
import { GlobalEvent } from '../api/GlobalEvent';
import Logger from '../../common/Logger';
import { Navigator } from '../api/Navigator';
import { UpdateApi } from '../api/UpdateApi';
import { sameLayerManager } from '../../samelayer/SameLayerManager';
import { ViewAppear } from '../api/ViewAppear';
import { StreamAPI } from '../api/StreamAPI';
import { offKeyboard, onKeyboard } from '../api/KeyboardAPI';

const TAG: string = 'WebAdapter';

const advancedAPIs = new Map<string, Function>([
  ['getString', new ClipboardAPI().getString],
  ['setString', new ClipboardAPI().setString],
  ['enableFullScreenHeight', new DeviceInfoAPI().enableFullScreenHeight],
  ['fetch', new StreamAPI().fetch],
  ['onCheckForUpdate', new UpdateApi().onCheckForUpdate],
  ['applyUpdate', new UpdateApi().applyUpdate],
  ['onUpdateReady', new UpdateApi().onUpdateReady],
  ['onUpdateFailed', new UpdateApi().onUpdateFailed],
  ['onKeyboard', onKeyboard],
  ['offKeyboard', offKeyboard],
])

const advancedCbStringifyAPIs = new Set<string>([

])

export class WebAdapter {
  private static instance: WebAdapter;

  /**
   * Singleton mode get instance.
   *
   * @returns WebAdapter
   */
  public static getInstance(): WebAdapter {
    if (!WebAdapter.instance) {
      WebAdapter.instance = new WebAdapter();
    }
    return WebAdapter.instance;
  }

  /**
   * Register custom fun
   *
   * @param funName
   * @param fun
   */
  public registerCustomFun(funName: string, fun: Function) {
    advancedAPIs.set(funName, fun);
  }

  public registerCustomFunCbParamsStringify(funName: string){
    advancedCbStringifyAPIs.add(funName)
  }


  /**
   * Weex API entry.
   *
   * @param name: string
   * @param args: object
   * @param callback: Function
   * @param webId: string
   */
  public dispatch(name: string, runArgs: string | object, callback: Function, webId: number){
    let args: object = typeof runArgs === 'object' ? runArgs : JSON.parse(runArgs);
    if (name === Constants.API_NAME_NAVIGATOR_POP) {
      Navigator.pop(args, callback, webId);
    } else if (name === Constants.API_NAME_NAVIGATOR_PUSH) {
      Navigator.push(args, callback, webId);
    } else if (name === Constants.API_NAME_NAVIGATOR_REPLACE) {
      Navigator.replace(args, callback, webId);
    } else if (name === Constants.API_NAME_ADD_EVENT_LISTENER) {
      GlobalEvent.getInstance().addEventListener(args, callback, webId);
    } else if (name === Constants.API_NAME_REMOVE_EVENT_LISTENER) {
      GlobalEvent.getInstance().removeEventListener(args);
    } else if (name === Constants.API_NAME_BC_POST_MESSAGE) {
      BroadcastChannel.getInstance().bcPostMessage(args);
    } else if (name === Constants.API_NAME_BC_ON_MESSAGE) {
      BroadcastChannel.getInstance().bcOnMessage(args, callback, webId);
    } else if (name === Constants.API_NAME_BC_CLOSE) {
      BroadcastChannel.getInstance().bcClose(args);
    } else if (name === Constants.API_NAME_TRANSFER_SAME_LAYER) {
      sameLayerManager.transferSameLayerArgs(args);
    } else if (name === Constants.API_NAME_VIEW_APPEAR) {
      ViewAppear.getInstance().saveViewAppear(webId);
    } else if (name === Constants.API_NAME_DIS_VIEW_APPEAR) {
      ViewAppear.getInstance().saveViewDisAppear(webId);
    } else {
      // For common high-level APIs, invoke the implementation customAdapter injected by the partner.
      this.commonRun(name, args, callback, webId)
    }
  }


  /**
   * Weex API entry.
   *
   * @param name: string
   * @param args: object
   * @param callback: Function
   * @param webId: string
   */
  public run(name: string, runArgs: string | object, callback: Function, webId: number) {
    Logger.info(TAG, 'invoke api: ' + name);
    this.dispatch(name, runArgs, callback, webId)
  }


  /**
   * Weex API entry.
   *
   * @param name: string
   * @param args: object
   * @param callback: Function
   * @param webId: string
   */
  public async  asyncRun(name: string, runArgs: object, callback: Function, webId: number): Promise<void> {
    Logger.info(TAG, 'invoke async api: ' + name);
    this.dispatch(name, runArgs, callback, webId)
  }


  commonRun(name: string, args: object, callback: Function, webId: number): void {
    console.info(`[ADSAPI] CommonAdaptername : ` + name)
    let argsString = JSON.stringify(args)
    let completeCB = (data: Object) => {
      if(advancedCbStringifyAPIs.has(name)) {
        callback(JSON.stringify(data))
      } else {
        callback(data)
      }
    }

    let advancedAPI: Function | undefined = advancedAPIs.get(name);
    if(advancedAPI){
      advancedAPI({
        name,
        args: argsString,
        successCb: null,
        failCb: null,
        completeCb: completeCB,
        webId: webId
      });
    }
  }
}