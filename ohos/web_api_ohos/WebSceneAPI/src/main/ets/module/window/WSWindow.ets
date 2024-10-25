/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License,Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { BusinessError } from '@ohos.base';
import window from '@ohos.window';
import common from '@ohos.app.ability.common';
import BusinessConstants from '../../common/constants/BusinessConstants';
import { CallBackAdapter } from '../../model/CallBackAdapter';
import { CommonConfig } from '../../common/entity/CommonConfig';
import { GlobalThis } from '../../model/GlobalThis';
import { StatusCode } from '../../common/entity/StatusCode';
import Log from '../../common/log/Log';
import WindowUtil from '../../common/utils/WindowUtil';

const TAG: string = 'WSWindow';

/**
 * Class for changeOrientation and set fullScreen.
 */
export class WSWindow {
  /**
   * Set the Orientation of Window.
   *
   * @param orientationConfig.
   */
  @CallBackAdapter
  public setPreferredOrientation(orientationConfig: OrientationConfig) {
    let context: common.UIAbilityContext | undefined = GlobalThis.getInstance().getContext();
    if (context === undefined) {
      Log.error(TAG, BusinessConstants.CONTEXT_UNDEFINED);
      orientationConfig.complete(StatusCode.FAIL, BusinessConstants.CONTEXT_UNDEFINED);
      return;
    }
    WindowUtil.GetWindowClass(context).then((data: window.Window) => {
      data.setPreferredOrientation((orientationConfig.orientation === Orientation.PORTRAIT)
        ? window.Orientation.PORTRAIT : window.Orientation.LANDSCAPE)
        .then(() => {
          Log.info(TAG, StatusMsg.SUCCESS_ORIENTATION);
          orientationConfig.complete(StatusCode.SUCCESS, StatusMsg.SUCCESS_ORIENTATION);
        })
        .catch((err: BusinessError) => {
          Log.error(TAG, err.message);
          orientationConfig.complete(StatusCode.FAIL, err.message);
        });
    })
  }

  /**
   * Set app full screen.
   *
   * @param fullScreenConfig callback.
   */
  @CallBackAdapter
  public setFullScreen(fullScreenConfig: FullScreenConfig) {
    let context: common.UIAbilityContext | undefined = GlobalThis.getInstance().getContext();
    if (context === undefined) {
      Log.error(TAG, BusinessConstants.CONTEXT_UNDEFINED);
      fullScreenConfig.complete(StatusCode.FAIL, StatusMsg.FAIL_FULL_SCREEN);
      return;
    }
    let systemBar: Array<'status' | 'navigation'> = this.checkParam(fullScreenConfig);
    WindowUtil.GetWindowClass(context).then((windowClass: window.Window) => {
      windowClass.setWindowLayoutFullScreen(fullScreenConfig.isOpen).then(() => {
        windowClass.setWindowSystemBarEnable(systemBar).then(() => {
          windowClass.setWindowSystemBarProperties(fullScreenConfig).then(() => {
            let avoidArea: AvoidPosition = this.getAvoidPosition(windowClass);
            fullScreenConfig.complete(StatusCode.SUCCESS, StatusMsg.SUCCESS_FULL_SCREEN, avoidArea);
          }).catch((err: BusinessError) => {
            Log.error(TAG, 'Set properties of systemBar failed, errMsg: ' + err.message);
            fullScreenConfig.complete(StatusCode.FAIL, StatusMsg.FAIL_FULL_SCREEN);
          });
        }).catch((err: BusinessError) => {
          Log.error(TAG, 'Set systemBar failed, errMsg: ' + err.message);
          fullScreenConfig.complete(StatusCode.FAIL, StatusMsg.FAIL_FULL_SCREEN);
        });
      }).catch((err: BusinessError) => {
        Log.error(TAG, 'Set fullScreen failed, errMsg: ' + err.message);
        fullScreenConfig.complete(StatusCode.FAIL, StatusMsg.FAIL_FULL_SCREEN);
      });
    }).catch((err: BusinessError) => {
      Log.error(TAG, 'getLastWindow failed, errMsg: ' + err.message);
      fullScreenConfig.complete(StatusCode.FAIL, StatusMsg.FAIL_FULL_SCREEN);
    });
  }

  private checkParam(fullScreenConfig: FullScreenConfig): Array<'status' | 'navigation'> {
    if (typeof fullScreenConfig.isOpen === 'undefined') {
      fullScreenConfig.isOpen = false;
    }
    if (typeof fullScreenConfig.showStatusMsg === 'undefined') {
      fullScreenConfig.showStatusMsg = true;
    }
    if (fullScreenConfig.statusMsgColor === 0) {
      fullScreenConfig.statusBarContentColor = '#ffffff';
      fullScreenConfig.navigationBarContentColor = '#ffffff';
    } else {
      fullScreenConfig.statusBarContentColor = '#292929'
      fullScreenConfig.navigationBarContentColor = '#292929';
    }
    let systemBar: Array<'status' | 'navigation'> = new Array();
    if (fullScreenConfig.showStatusMsg) {
      systemBar.push('status');
    }
    if (fullScreenConfig.showNavigationBar) {
      systemBar.push('navigation');
    }
    return systemBar;
  }

  private getAvoidPosition(windowClass: window.Window): AvoidPosition {
    let avoidArea: window.AvoidArea = windowClass.getWindowAvoidArea(window.AvoidAreaType.TYPE_SYSTEM);
    let avoidPosition: AvoidPosition = new AvoidPosition();
    avoidPosition.statusbarHeight = avoidArea.topRect.height.toString();
    avoidPosition.bottomHeight = avoidArea.bottomRect.height.toString();
    return avoidPosition;
  }
}

/**
 * Class for the input parameter of OrientationConfig.
 */
export class OrientationConfig extends CommonConfig<string> {
  orientation: Orientation = Orientation.PORTRAIT;
}

/**
 * Class for the input parameter of FullScreenConfig.
 */
export class FullScreenConfig extends CommonConfig<AvoidPosition> {
  isOpen?: boolean = false;
  showStatusMsg?: boolean = true;
  statusMsgColor?: number = 1;
  statusBarContentColor?: string;
  showNavigationBar?: boolean = true;
  navigationBarContentColor?: string;
}

export enum Orientation {
  PORTRAIT = 0,
  LANDSCAPE = 1
}

export class AvoidPosition {
  statusbarHeight: string = '';
  bottomHeight: string = '';
}

enum StatusMsg {
  SUCCESS_ORIENTATION = '设置横竖屏成功',
  SUCCESS_FULL_SCREEN = '操作成功',
  FAIL_FULL_SCREEN = '获取数据失败'
}