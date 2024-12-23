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

import common from '@ohos.app.ability.common';
import web_webview from '@ohos.web.webview';
import { AuthSettingAPI } from './apiadapter/AuthSettingAPI';
import { BluetoothAPI } from './apiadapter/BluetoothAPI';
import { CommonUtil } from 'webSceneAPI';
import { ContactApi } from './apiadapter/ContactAPI';
import { DeviceAPI } from './apiadapter/DeviceAPI';
import { DownLoadAPI } from './apiadapter/DownLoadAPI';
import { GlobalThis } from '../utils/GlobalThis';
import { ImageAPI } from './apiadapter/ImageAPI';
import { LocationAPI } from './apiadapter/LocationAPI';
import { MediaAPI } from './apiadapter/MediaAPI';
import { NetworkAPI } from './apiadapter/NetworkAPI';
import { PhoneAPI } from './apiadapter/PhoneAPI';
import { PickerAPI } from './apiadapter/PickerAPI';
import { PreferencesAPI } from './apiadapter/PreferencesAPI';
import { RouterAPI } from './apiadapter/RouterAPI';
import { ThirdAppApi } from './apiadapter/ThirdAppAPI';
import { WebViewAPI } from './apiadapter/WebViewAPI';
import { WindowApi } from './apiadapter/WindowAPI';
import { HiTraceMeterAPI } from './apiadapter/HiTraceMeterAPI';
import { ExtWebController } from 'WebSceneKitHsp';
// import { ExtWebController } from 'WebSceneKit';
import { LottieAPI } from './componentAPI/LottieAPI';

export let controller: web_webview.WebviewController;

export class CommonAdapter {
  init() {
    CommonUtil.init(GlobalThis.getInstance().getContext("GlobalContext") as common.UIAbilityContext);
    ExtWebController.registerCustomFun('chooseContact', new ContactApi().chooseContact)
    ExtWebController.registerCustomFun('getBluetooth', new BluetoothAPI().getBluetooth)
    ExtWebController.registerCustomFun('getLocalIPAddress', new NetworkAPI().getLocalIPAddress)

    ExtWebController.registerCustomFun('setFullscreen', new WindowApi().setFullscreen)
    ExtWebController.registerCustomFun('getNetworkType', new NetworkAPI().getNetworkType)
    ExtWebController.registerCustomFun('getNetworkInfo', new NetworkAPI().getNetworkInfo)
    ExtWebController.registerCustomFun('saveImgsToAlbum', new MediaAPI().saveImgsToAlbum)

    ExtWebController.registerCustomFun('jumpNative', new RouterAPI().jumpNative)
    ExtWebController.registerCustomFun('finishWebView', new RouterAPI().finishWebView)
    ExtWebController.registerCustomFun('callUp', new PhoneAPI().callUp)
    ExtWebController.registerCustomFun('getPhoto', new ImageAPI().getPhoto)
    ExtWebController.registerCustomFun('chooseImage', new ImageAPI().chooseImage)
    ExtWebController.registerCustomFun('getSystemInfo', new DeviceAPI().getReqHeader)
    ExtWebController.registerCustomFun('saveVideoToPhotosAlbum', new MediaAPI().saveVideoToPhotosAlbum)
    ExtWebController.registerCustomFun('getLocation', new LocationAPI().getLocation)
    ExtWebController.registerCustomFun('jumpThirdApp', new ThirdAppApi().jumpThirdApp)
    ExtWebController.registerCustomFun('changeOrientation', new WindowApi().changeOrientation)
    ExtWebController.registerCustomFun('downloadTask', new DownLoadAPI().downloadTask)
    ExtWebController.registerCustomFun('authSetting', new AuthSettingAPI().authSetting)
    ExtWebController.registerCustomFun('setItem', new PreferencesAPI().setItem)
    ExtWebController.registerCustomFun('getItem', new PreferencesAPI().getItem)
    ExtWebController.registerCustomFun('removeItem', new PreferencesAPI().removeItem)
    ExtWebController.registerCustomFun('length', new PreferencesAPI().length)
    ExtWebController.registerCustomFun('getAllKeys', new PreferencesAPI().getAllKeys)
    ExtWebController.registerCustomFun('pick', new PickerAPI().pick)
    ExtWebController.registerCustomFun('pickDate', new PickerAPI().pickDate)
    ExtWebController.registerCustomFun('pickTime', new PickerAPI().pickTime)
    ExtWebController.registerCustomFun('lottieHandle', new LottieAPI().lottieHandle)
    ExtWebController.registerCustomFun('webHandle', new WebViewAPI().webHandle)
    ExtWebController.registerCustomFun('startTrace', new HiTraceMeterAPI().startTrace)
    ExtWebController.registerCustomFun('finishTrace', new HiTraceMeterAPI().finishTrace)
    ExtWebController.registerCustomFun('traceByValue', new HiTraceMeterAPI().traceByValue)
  }
}
