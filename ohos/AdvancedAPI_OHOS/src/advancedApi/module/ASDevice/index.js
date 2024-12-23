import { DeivceBase } from '../../../base/bridge/deviceBase'
import { DisplayBase } from '../../../base/bridge/displayBase'
import I18n from '@ohos.i18n'
import abilityAccessCtrl from '@ohos.abilityAccessCtrl'
import { context } from '../../../base/bridge/abilityBase'
import bluetooth from '@ohos.bluetooth'
import geoLocationManager from '@ohos.geoLocationManager'
import wifiManager from '@ohos.wifiManager'
import window from '@ohos.window'

export default class ASDevice {
  getSystemInfoSync () {
    const {
      brand: deviceBrand,
      productModel: deviceModel,
      osFullName,
      deviceType,
      udid: deviceId,
      sdkApiVersion: ohosAPILevel
    } = DeivceBase.getDeviceInfo()
    const romName = osFullName.split('-')[0]
    const osName = romName
    const romVersion = osFullName.split('-')[1]
    const osVersion = romVersion

    const osLanguage = I18n.System.getSystemLanguage()
    const displayInfo = DisplayBase.ohosGetDisplay()
    const { rotation, densityPixels: devicePixelRatio } = displayInfo
    let { width: screenWidth, height: screenHeight } = displayInfo
    screenWidth = Math.round(screenWidth / devicePixelRatio)
    screenHeight = Math.round(screenHeight / devicePixelRatio)
    const deviceOrientation = (rotation === 1 || rotation === 3) ? 'landscape' : 'portrait'

    const {
      signatureInfo,
      versionName: appVersion,
      versionCode: appVersionCode,
      appInfo
    } = globalThis.bundleInfoForSelf
    const appName = context.resourceManager.getStringSync(appInfo.labelId)
    const appId = signatureInfo.appId

    const {
      language: appLanguage
    } = context.config

    let {
      width: windowWidth,
      height: windowHeight,
      top: windowTop
    } = globalThis.lastWindow.getWindowProperties()?.windowRect
    const {
      isFullScreen, isLayoutFullScreen
    } = globalThis.lastWindow.getWindowProperties()
    const systemCutout = globalThis.lastWindow.getWindowAvoidArea(window.AvoidAreaType.TYPE_SYSTEM)
    const statusBarHeight = Math.round((systemCutout?.topRect?.height || 0) / devicePixelRatio)
    const windowBottom = (isFullScreen || isLayoutFullScreen) ? Math.round(windowHeight / devicePixelRatio) :
      Math.round((windowHeight + statusBarHeight) / devicePixelRatio)
    windowTop = Math.round(windowTop / devicePixelRatio)
    windowWidth = Math.round(windowWidth / devicePixelRatio)
    windowHeight = Math.round(windowHeight / devicePixelRatio)

    const brand = deviceBrand
    const model = deviceModel
    const pixelRatio = devicePixelRatio
    const system = osFullName
    const language = osLanguage
    const platform = osName
    const version = osVersion
    const result = {
      deviceType,
      deviceBrand,
      brand,
      deviceModel,
      platform,
      model,
      deviceOrientation,
      devicePixelRatio,
      pixelRatio,
      system,
      osName,
      osVersion,
      version,
      osLanguage,
      language,
      ohosAPILevel,
      romName,
      romVersion,
      appId,
      appName,
      appVersion,
      appVersionCode,
      appLanguage,
      screenWidth,
      screenHeight,
      windowWidth,
      windowHeight,
      windowTop,
      windowBottom,
      statusBarHeight
    }
    if (deviceId) {
      result.deviceId = deviceId
    }
    return result
  }

  getDeviceInfo () {
    console.debug('[AdvancedAPI] start ASDevice getDeviceInfo')
    const {
      brand,
      productModel: deviceModel,
      osFullName: system,
      deviceType,
      osFullName,
      udid: deviceId
    } = DeivceBase.getDeviceInfo()
    const deviceBrand = brand
    const model = deviceModel
    const platform = osFullName.split('-')[0]
    const {
      densityPixels: devicePixelRatio,
      rotation
    } = DisplayBase.ohosGetDisplay()
    const deviceOrientation = (rotation === 1 || rotation === 3) ? 'landscape' : 'portrait'
    const result = {
      platform,
      deviceBrand,
      deviceModel,
      deviceType,
      deviceOrientation,
      devicePixelRatio,
      system,
      brand,
      model
    }
    if (deviceId) {
      result.deviceId = deviceId
    }
    return result
  }

  getWindowInfo () {
    console.debug('[AdvancedAPI] start ASDevice getWindowInfo')
    const display = DisplayBase.ohosGetDisplay()

    const { densityPixels: pixelRatio } = display
    let {
      width: screenWidth,
      height: screenHeight
    } = display

    let {
      width: windowWidth,
      height: windowHeight,
      top: windowTop
    } = globalThis.lastWindow.getWindowProperties()?.windowRect
    const {
      isFullScreen,
      isLayoutFullScreen
    } = globalThis.lastWindow.getWindowProperties()
    const systemCutout = globalThis.lastWindow.getWindowAvoidArea(window.AvoidAreaType.TYPE_SYSTEM)
    const statusBarHeight = Math.round((systemCutout?.topRect?.height || 0) / pixelRatio)
    const windowBottom = (isFullScreen || isLayoutFullScreen) ? Math.round(windowHeight / pixelRatio) :
      Math.round((windowHeight + statusBarHeight) / pixelRatio)
    windowTop = Math.round(windowTop / pixelRatio)
    windowWidth = Math.round(windowWidth / pixelRatio)
    windowHeight = Math.round(windowHeight / pixelRatio)
    screenWidth = Math.round(screenWidth / pixelRatio)
    screenHeight = Math.round(screenHeight / pixelRatio)
    return {
      pixelRatio,
      screenWidth,
      screenHeight,
      windowWidth,
      windowHeight,
      windowTop,
      windowBottom,
      statusBarHeight
    }
  }
  getAppBaseInfo() {
    console.debug('[AdvancedAPI] start ASDevice getAppBaseInfo')
    const {
      signatureInfo,
      versionName: appVersion,
      versionCode: appVersionCode,
      appInfo
    } = globalThis.bundleInfoForSelf
    const enableDebug = appInfo.debug
    const appName = context.resourceManager.getStringSync(appInfo.labelId)
    const appId = signatureInfo.appId
    const {
      language: appLanguage
    } = context.config
    // eslint-disable-next-line no-undef
    Environment.envProp('colorMode', -1)
    const colorMode = AppStorage.get('colorMode')
    const theme = colorMode === 0 ? 'light' : (colorMode === 1 ? 'dark' : 'auto')
    return {
      appId,
      appName,
      appVersion,
      appVersionCode,
      appLanguage,
      enableDebug,
      theme
    }
  }
  getAppAuthorizeSetting() {
    console.debug('[AdvancedAPI] start ASDevice getAppAuthorizeSetting')
    const permissionsList = {
      album: 'ohos.permission.WRITE_IMAGEVIDEO',
      bluetooth: 'ohos.permission.USE_BLUETOOTH',
      camera: 'ohos.permission.CAMERA',
      location: 'ohos.permission.LOCATION',
      locationAccuracy: 'ohos.permission.APPROXIMATELY_LOCATION',
      microphone: 'ohos.permission.MICROPHONE',
      notification: 'ohos.permission.NOTIFICATION_CONTROLLER',
      phoneCalendar: 'ohos.permission.READ_CALENDAR'
    }

    const atManager = abilityAccessCtrl.createAtManager()
    const info = globalThis.bundleInfoForSelf
    const tokenID = info.appInfo.accessTokenId
    const grantStatus = (flag) => {
      if (flag === -1) {
        return 'denied'
      } else if (flag === 0) {
        return 'authorized'
      }
      return 'config error'
    }
    let albumAuthorized = 'not determined'
    try {
      albumAuthorized = atManager.checkAccessTokenSync(tokenID, permissionsList.album)
      albumAuthorized = grantStatus(albumAuthorized)
    } catch (e) {
      console.debug('[AdvancedAPI] ASDevice getAppAuthorizeSetting checkAccessToken album fail')
    }
    let bluetoothAuthorized = 'not determined'
    try {
      bluetoothAuthorized = atManager.checkAccessTokenSync(tokenID, permissionsList.bluetooth)
      bluetoothAuthorized = grantStatus(bluetoothAuthorized)
    } catch (e) {
      console.debug('[AdvancedAPI] ASDevice getAppAuthorizeSetting checkAccessToken bluetooth fail')
    }
    let cameraAuthorized = 'not determined'
    try {
      cameraAuthorized = atManager.checkAccessTokenSync(tokenID, permissionsList.camera)
      cameraAuthorized = grantStatus(cameraAuthorized)
    } catch (e) {
      console.debug('[AdvancedAPI] ASDevice getAppAuthorizeSetting checkAccessToken camera fail')
    }
    let locationAuthorized = 'not determined'
    try {
      locationAuthorized = atManager.checkAccessTokenSync(tokenID, permissionsList.location)
      locationAuthorized = grantStatus(locationAuthorized)
    } catch (e) {
      console.debug('[AdvancedAPI] ASDevice getAppAuthorizeSetting checkAccessToken location fail')
    }
    let locationAccuracy = 'not determined'
    try {
      locationAccuracy = (atManager.checkAccessTokenSync(tokenID, permissionsList.locationAccuracy)) === 0 ? 'full' : 'reduced'
    } catch (e) {
      console.debug('[AdvancedAPI] ASDevice getAppAuthorizeSetting checkAccessToken locationAccuracy fail')
    }
    let microphoneAuthorized = 'not determined'
    try {
      microphoneAuthorized = atManager.checkAccessTokenSync(tokenID, permissionsList.microphone)
      microphoneAuthorized = grantStatus(microphoneAuthorized)
    } catch (e) {
      console.debug('[AdvancedAPI] ASDevice getAppAuthorizeSetting checkAccessToken microphone fail')
    }
    let notificationAuthorized = 'not determined'
    try {
      notificationAuthorized = atManager.checkAccessTokenSync(tokenID, permissionsList.notification)
      notificationAuthorized = grantStatus(notificationAuthorized)
    } catch (e) {
      console.debug('[AdvancedAPI] ASDevice getAppAuthorizeSetting checkAccessToken notification fail')
    }
    let phoneCalendarAuthorized = 'not determined'
    try {
      phoneCalendarAuthorized = atManager.checkAccessTokenSync(tokenID, permissionsList.phoneCalendar)
      phoneCalendarAuthorized = grantStatus(phoneCalendarAuthorized)
    } catch (e) {
      console.debug('[AdvancedAPI] ASDevice getAppAuthorizeSetting checkAccessToken phoneCalendar fail')
    }

    const result = {
      albumAuthorized,
      bluetoothAuthorized,
      cameraAuthorized,
      locationAuthorized,
      locationAccuracy,
      microphoneAuthorized,
      notificationAuthorized,
      phoneCalendarAuthorized
    }
    return result
  }
  getSystemSetting() {
    let bluetoothEnabled
    let locationEnabled
    let wifiEnabled
    let bluetoothError
    let locationError
    try {
      bluetoothEnabled = bluetooth.getState()
      bluetoothEnabled = !!(bluetoothEnabled === 2 || bluetoothEnabled === 5)
    } catch (err) {
      console.error('errCode:' + err.code + ',errMessage:' + err.message)
      bluetoothError = err.message
    }
    try {
      locationEnabled = geoLocationManager.isLocationEnabled()
    } catch (err) {
      console.error('errCode:' + err.code + ',errMessage:' + err.message)
      locationError = err.message
    }
    try {
      wifiEnabled = wifiManager.isWifiActive()
    } catch (err) {
      console.error('errCode:' + err.code + ',errMessage:' + err.message)
    }
    const {
      rotation
    } = DisplayBase.ohosGetDisplay()
    const deviceOrientation = (rotation === 1 || rotation === 3) ? 'landscape' : 'portrait'
    return {
      bluetoothEnabled,
      bluetoothError,
      locationEnabled,
      locationError,
      wifiEnabled,
      deviceOrientation
    }
  }

  openAppAuthorizeSetting() {
    const want = {
      bundleName: 'com.huawei.hmos.settings',
      abilityName: 'com.huawei.hmos.settings.MainAbility',
      uri: 'application_info_entry',
      parameters: {
        pushParams: context.applicationInfo.name // 打开指定应用的详情页面
      }
    }
    return context.startAbilityForResult(want)
  }
}
