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

import { Constants } from '../constants/Constants';
import Logger from '../../common/Logger';

const TAG: string = 'GlobalEvent';

export class GlobalEvent {
  private static instance: GlobalEvent;
  globalEventMap: Map<string, Map<number, Array<Function>>> = new Map();
  webIdMap: Map<number, Array<Function>> = new Map();

  /**
   * Singleton mode get instance.
   *
   * @returns GlobalEvent
   */
  public static getInstance(): GlobalEvent {
    if (!GlobalEvent.instance) {
      GlobalEvent.instance = new GlobalEvent();
    }
    return GlobalEvent.instance;
  }

  /**
   * The trigger event.
   *
   * @param eventName
   * @param data
   */
  public triggerEvent(eventName: string, data?: object | string) {
    let cbMap: Map<number, Array<Function>> = this.globalEventMap.get(eventName) ?? new Map();
    for (let value of cbMap) {
      for( let callback of value[1]) {
        callback(data);
      }
    }
  }

  addEventListener(args: object, callback: Function, webId: number) {
    let eventName: string = args[Constants.EVENT_NAME];
    if (eventName === undefined) {
      Logger.error(TAG, '[addEventListener] param error!');
      return;
    }
    let cbMap: Map<number, Array<Function>> = this.globalEventMap.get(eventName) ?? new Map();
    let callbacks: Array<Function> = cbMap.get(webId)?? new Array();
    callbacks.push(callback);
    cbMap.set(webId, callbacks);
    this.globalEventMap.set(eventName, cbMap);
  }

  removeEventListener(args: object) {
    let eventName: string = args[Constants.EVENT_NAME];
    if (eventName === undefined) {
      Logger.error(TAG, '[removeEventListener] param error!');
      return;
    }
    this.globalEventMap.delete(eventName);
  }

  deleteCb(webId: number) {
    for(let value of this.globalEventMap) {
      if(value[1].delete(webId)){
        Logger.info(TAG, "Delete globalEvent name = " + value[0] + ", webId = " + webId);
      }
    }
  }
}
