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

import hilog from '@ohos.hilog';
import UIAbility from '@ohos.app.ability.UIAbility';
import window from '@ohos.window';
import { AdvancedAPI } from 'advancedApi';
import Want from '@ohos.app.ability.Want';
import AbilityConstant from '@ohos.app.ability.AbilityConstant';
import {
  ExtWebController,
  sameLayerManager,
  codeCache,
  CodeCacheController,
  CodeCacheResponseSettings
} from 'WebSceneKitHsp';
import { GlobalThis } from '../utils/GlobalThis';
import { NativeVideoBuilder } from '../samelayer/nativeComponents/Video/Video';
import { NativeButtonBuilder } from '../samelayer/nativeComponents/Button/Button';
import { NativeSliderBuilder } from '../samelayer/nativeComponents/Slider/Slider';
import { NativeLottieBuilder } from '../samelayer/nativeComponents/Lottie/Lottie';
import { NativeRichTextBuilder } from '../samelayer/nativeComponents/RichText/RichText';
import { NativeTextAreaBuilder } from '../samelayer/nativeComponents/TextArea/TextArea';
import { NativeWebBuilder } from '../samelayer/nativeComponents/Web/Web';

import webview from '@ohos.web.webview';
import { ParseUtil } from 'WebSceneKitHsp/src/main/ets/webrouterservice/common/util/ParseUtil';

class SchemeCodeCacheController implements CodeCacheController {
  getScheme(): webview.WebCustomScheme {
    return { schemeName: 'shell', isSupportCORS: true, isSupportFetch: true, isCodeCacheSupported: false };
  }

  getResponseSettings(url: string): CodeCacheResponseSettings | null {
    if (url.startsWith('shell://')) {
      let data: string | number | Resource | ArrayBuffer | undefined;
      try {
        data = getContext().resourceManager.getRawFileContentSync(`cache/${url.slice(8)}`);
      } catch (e) {
        console.error('[WEB] cached data error', e.message);
      }
      if (data) {
        return {
          headerKey: 'ResponseDataId',
          // 格式：不超过13位的纯数字。JS识别码，JS有更新时必须更新该字段
          headerValue: '0000000000006',
          data: ParseUtil.bufferToString((data as Uint8Array).buffer)
        }
      }
    }
    return null;
  }
}

export const schemeCodeCacheController = new SchemeCodeCacheController();
codeCache.registerController(schemeCodeCacheController);

export default class EntryAbility extends UIAbility {
  onCreate(want: Want, launchParam: AbilityConstant.LaunchParam) {
    hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onCreate');
    console.log('TestXXX EntryAbility onCreate');
    AdvancedAPI.init(this.context);
    GlobalThis.getInstance().setContext("GlobalContext", this.context)
    sameLayerManager.registerNativeComponentBuilders('video', NativeVideoBuilder)
    sameLayerManager.registerNativeComponentBuilders('button', NativeButtonBuilder)
    sameLayerManager.registerNativeComponentBuilders('slider', NativeSliderBuilder)
    sameLayerManager.registerNativeComponentBuilders('lottie', NativeLottieBuilder)
    sameLayerManager.registerNativeComponentBuilders('richText', NativeRichTextBuilder)
    sameLayerManager.registerNativeComponentBuilders('textArea', NativeTextAreaBuilder)
    sameLayerManager.registerNativeComponentBuilders('web', NativeWebBuilder)
  }

  onDestroy() {
    hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onDestroy');
  }

  onWindowStageCreate(windowStage: window.WindowStage) {
    // Main window is created, set main page for this ability
    hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onWindowStageCreate');
    ExtWebController.setUA('');
    windowStage.loadContent('pages/Index', (err, data) => {
      // 支持业务侧动态配置 将业务模块路径传入init 页面配置文件在每个业务模块根目录
      // ExtWebController.init('WebSceneConfig.json', windowStage.getMainWindowSync().getUIContext(), this.context, 10);
      ExtWebController.init(['frameworkTest_web'], windowStage.getMainWindowSync().getUIContext(), this.context, 10);
      if (err.code) {
        hilog.error(0x0000, 'testTag', 'Failed to load the content. Cause: %{public}s', JSON.stringify(err) ?? '');
        return;
      }
      AppStorage.setOrCreate("uiContext", windowStage.getMainWindowSync().getUIContext());
      hilog.info(0x0000, 'testTag', 'Succeeded in loading the content. Data: %{public}s', JSON.stringify(data) ?? '');
      AppStorage.setOrCreate<UIContext>("UIContext", windowStage.getMainWindowSync().getUIContext());
    });
  }

  onWindowStageDestroy() {
    // Main window is destroyed, release UI related resources
    hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onWindowStageDestroy');
  }

  onForeground() {
    hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onForeground');
    ExtWebController.triggerEvent('WXApplicationDidBecomeActiveEvent');
  }

  onBackground() {
    hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onBackground');
    ExtWebController.triggerEvent('WXApplicationWillResignActiveEvent');
  }
}
