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

import { as } from 'advancedApi';
import emitter from '@ohos.events.emitter';
import { EmitterID } from '../apimodel/EmitterCommon';
import { StatusCode } from 'webSceneAPI';
import { WeexResult } from '../apimodel/WeexResult';
import { ApiOptions } from 'WebSceneKitHsp';

export class RouterAPI {
  private static instance: RouterAPI;
  private static actionTag: boolean = true;

  public static getInstance(): RouterAPI {
    if (!RouterAPI.instance) {
      RouterAPI.instance = new RouterAPI();
    }
    return RouterAPI.instance;
  }

  getActionTag(): boolean {
    return RouterAPI.actionTag;
  }

  jumpNative(options: ApiOptions) {
    const completeCb = options.completeCb;
    const args = options.args;
    let asName: string = '';
    let jumpInParams: JumpInParams = JSON.parse(args);

    let RouterCompleteCallback = (data: WeexDataResult) => {
      console.info('WANG RouterFailCompleteCallback data: ' + JSON.stringify(data))

      RouterAPI.actionTag = false;
      if (jumpInParams.action) {
        let innerEvent: emitterInner = {
          eventId: EmitterID.EVENT_JUMP_NATIVE_ID
        };
        emitter.on(innerEvent, () => {
          if (data.errCode === 0) {
            completeCb(new WeexResult(StatusCode.SUCCESS, data.errMsg ?? '', ''));
          } else {
            completeCb(new WeexResult(StatusCode.FAIL, data.errMsg ?? '', ''));
          }
          RouterAPI.actionTag = true;
        });
      } else {
        if (data.errCode === 0) {
          completeCb(new WeexResult(StatusCode.SUCCESS, data.errMsg ?? '', ''));
        } else {
          completeCb(new WeexResult(StatusCode.FAIL, data.errMsg ?? '', ''));
        }
        RouterAPI.actionTag = true;
      }
    };

    let jumpParams: JumpParams = new JumpParams();
    jumpParams.url = jumpInParams.pageId;
    jumpParams.url = 'pages/Second' //临时适配
    jumpParams.complete = RouterCompleteCallback;

    let routerParams: Array<JumpParams> = new Array();
    routerParams[0] = jumpParams;
    if (jumpInParams.isClose) {
      asName = 'redirectTo';
    } else {
      asName = 'navigateTo';
    }
    as[asName].apply(null, routerParams);
  }

  finishWebView(options: ApiOptions) {
    const completeCb = options.completeCb;
    let NavigateBackCompleteCallback = (data: WeexDataResult) => {
      console.info('WANG NavigateBackCompleteCallback data:' + JSON.stringify(data));
      if (data.errCode === 0) {
        completeCb(new WeexResult(StatusCode.SUCCESS, data.errMsg ?? '', ''));
      } else {
        completeCb(new WeexResult(StatusCode.FAIL, data.errMsg ?? '', ''));
      }
    };

    let navigateBackParams: NavigateBackParams = new NavigateBackParams();
    navigateBackParams.complete = NavigateBackCompleteCallback;
    let params: Array<NavigateBackParams> = new Array();
    params[0] = navigateBackParams;
    as['navigateBack'].apply(null, params);
  }
}

class JumpInParams {
  pageId: string = 'pages/Second';
  action?: boolean = false;
  isClose?: boolean = false;
  needLogin?: boolean = false;
  needIdentify?: boolean = false;
  params: object = new Object();
}

class JumpParams {
  url: string = 'pages/Second';
  animationType?: string;
  animationDuration?: number;
  events?: object;
  success: Function = () => {
  };
  fail: Function = () => {
  };
  complete: Function = () => {
  };
}

export class WeexDataResult {
  errCode?: number;
  errMsg?: string;
}

export class NavigateBackParams {
  delta?: number;
  animationType?: string;
  animationDuration?: number;
  success: Function = () => {
  };
  fail: Function = () => {
  };
  complete: Function = () => {
  };
}

class emitterInner {
  eventId: number = 0;
  priority?: emitter.EventPriority;
}
