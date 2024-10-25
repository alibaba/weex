import { interceptCallback } from '../callback/callback-intercept'
import JSCallback, { jsCallbackMap } from '../callback/JSCallback'

import {
  getSystemInfoSync,
  getDeviceInfo,
  getWindowInfo,
  getAppBaseInfo,
  getAppAuthorizeSetting,
  getSystemSetting,
  openAppAuthorizeSetting
} from '../as/device/system'
import { navigateTo, redirectTo, navigateBack } from '../as/router/navigate'
import {
  getLocation,
  onLocationChange,
  offLocationChange,
  onLocationChangeError,
  offLocationChangeError,
  startLocationUpdate,
  startLocationUpdateBackground,
  stopLocationUpdate
} from '../as/location/location'
import { makePhoneCall } from '../as/telephony/telephony'
import { request, uploadFile, downloadFile } from '../as/request/request'
import {
  openBluetoothAdapter,
  startBluetoothDevicesDiscovery,
  onBluetoothDeviceFound,
  offBluetoothDeviceFound,
  stopBluetoothDevicesDiscovery,
  onBluetoothAdapterStateChange,
  offBluetoothAdapterStateChange,
  getConnectedBluetoothDevices,
  getBluetoothAdapterState,
  closeBluetoothAdapter,
  getBluetoothDevices,
  setBLEMTU,
  writeBLECharacteristicValue,
  readBLECharacteristicValue,
  onBLEConnectionStateChange,
  offBLEConnectionStateChange,
  onBLECharacteristicValueChange,
  offBLECharacteristicValueChange,
  notifyBLECharacteristicValueChange,
  getBLEDeviceServices,
  getBLEDeviceRSSI,
  getBLEDeviceCharacteristics,
  createBLEConnection,
  closeBLEConnection
} from '../as/bluetooth/bluetooth'
import {
  startWifi,
  stopWifi,
  getConnectedWifi,
  getWifiList,
  onGetWifiList,
  offGetWifiList,
  connectWifi,
  onWifiConnected,
  offWifiConnected,
  onWifiConnectedWithPartialInfo,
  offWifiConnectedWithPartialInfo
} from '../as/device/wifi'
import { startSoterAuthentication, checkIsSupportSoterAuthentication, checkIsSoterEnrolledInDevice } from '../as/device/authenication'
import {
  onAccelerometerChange,
  offAccelerometerChange,
  startAccelerometer,
  stopAccelerometer
} from '../as/device/accelerometer'
import {
  onCompassChange,
  offCompassChange,
  startCompass,
  stopCompass
} from '../as/device/compass'
import {
  onGyroscopeChange,
  startGyroscope,
  stopGyroscope
} from '../as/device/gyroscope'
import { addPhoneContact } from '../as/device/contact'
import { vibrate, vibrateLong, vibrateShort } from '../as/device/vibrate'
import { onUserCaptureScreen, offUserCaptureScreen } from '../as/device/capture'
import { hideKeyboard, onKeyboardHeightChange, offKeyboardHeightChange } from '../as/keyboard/keyboard'
import { login, getUserInfo } from '../as/account/account'
import {
  chooseImage,
  getImageInfo,
  saveImageToPhotosAlbum,
  compressImage
} from '../as/media/image'
import { setScreenBrightness, getScreenBrightness, setKeepScreenOn } from '../as/device/brightness'
import { getFileInfo, getSavedFileInfo, getSavedFileList, removeSavedFile, saveFile, getFileSystemManager, openDocument } from '../as/file/file'
import {
  createInnerAudioContext
} from '../as/media/audio'
import {
  saveVideoToPhotosAlbum,
  getVideoInfo,
} from '../as/media/video'
import { scanCode } from '../as/scan/scan'

/**
 * needPromise默认值是true：表示默认promise化
 * [methodName]: { method: [method], needPromise: {boolean}, needCallback: {boolean} }
 * needPromise: false; needCallback:false 表示不需要封装promise和JSCallback，会直接把cp的参数透传给接口
 */
export const asInterfaceList = {
  // 设备系统
  getSystemInfoSync: { method: getSystemInfoSync, needPromise: false, needCallback: false },
  getDeviceInfo: { method: getDeviceInfo, needPromise: false },
  getWindowInfo: { method: getWindowInfo, needPromise: false },
  getAppBaseInfo: { method: getAppBaseInfo, needPromise: false },
  getAppAuthorizeSetting: { method: getAppAuthorizeSetting, needPromise: false },
  getSystemSetting: { method: getSystemSetting, needPromise: false },
  openAppAuthorizeSetting: { method: openAppAuthorizeSetting },

  // 地理位置
  getLocation: { method: getLocation },
  onLocationChange: { method: onLocationChange },
  offLocationChange: { method: offLocationChange, needPromise: false },
  startLocationUpdate: { method: startLocationUpdate },
  startLocationUpdateBackground: { method: startLocationUpdateBackground },
  stopLocationUpdate: { method: stopLocationUpdate },
  onLocationChangeError: { method: onLocationChangeError },
  offLocationChangeError: { method: offLocationChangeError },
  // 电话
  makePhoneCall: { method: makePhoneCall },

  // 网络
  request: { method: request },
  uploadFile: { method: uploadFile },
  downloadFile: { method: downloadFile },

  // 页面和路由
  navigateTo: { method: navigateTo },
  redirectTo: { method: redirectTo },
  navigateBack: { method: navigateBack },

  // 蓝牙
  openBluetoothAdapter: { method: openBluetoothAdapter },
  startBluetoothDevicesDiscovery: { method: startBluetoothDevicesDiscovery },
  onBluetoothDeviceFound: { method: onBluetoothDeviceFound, needPromise: false, needCallback: false },
  offBluetoothDeviceFound: { method: offBluetoothDeviceFound, needPromise: false, needCallback: false },
  stopBluetoothDevicesDiscovery: { method: stopBluetoothDevicesDiscovery },
  onBluetoothAdapterStateChange: { method: onBluetoothAdapterStateChange, needPromise: false, needCallback: false },
  offBluetoothAdapterStateChange: { method: offBluetoothAdapterStateChange, needPromise: false, needCallback: false },
  getConnectedBluetoothDevices: { method: getConnectedBluetoothDevices },
  getBluetoothAdapterState: { method: getBluetoothAdapterState },
  closeBluetoothAdapter: { method: closeBluetoothAdapter },
  getBluetoothDevices: { method: getBluetoothDevices },
  // 低功耗蓝牙
  setBLEMTU: { method: setBLEMTU },
  writeBLECharacteristicValue: { method: writeBLECharacteristicValue },
  readBLECharacteristicValue: { method: readBLECharacteristicValue },
  onBLEConnectionStateChange: { method: onBLEConnectionStateChange, needPromise: false, needCallback: false },
  offBLEConnectionStateChange: { method: offBLEConnectionStateChange, needPromise: false, needCallback: false },
  onBLECharacteristicValueChange: { method: onBLECharacteristicValueChange, needPromise: false, needCallback: false },
  offBLECharacteristicValueChange: { method: offBLECharacteristicValueChange, needPromise: false, needCallback: false },
  notifyBLECharacteristicValueChange: { method: notifyBLECharacteristicValueChange },
  getBLEDeviceServices: { method: getBLEDeviceServices },
  getBLEDeviceRSSI: { method: getBLEDeviceRSSI },
  getBLEDeviceCharacteristics: { method: getBLEDeviceCharacteristics },
  createBLEConnection: { method: createBLEConnection },
  closeBLEConnection: { method: closeBLEConnection },

  // 传感器
  onAccelerometerChange: { method: onAccelerometerChange, needPromise: false, needCallback: false },
  offAccelerometerChange: { method: offAccelerometerChange, needPromise: false, needCallback: false },
  startAccelerometer: { method: startAccelerometer },
  stopAccelerometer: { method: stopAccelerometer },
  // 当接口参数中包含开发者的回调接口，比如监听的场景，接口框架不需要额外创建callBack对象，此时通过needCallback关键字控制
  onCompassChange: { method: onCompassChange, needPromise: false, needCallback: false },
  offCompassChange: { method: offCompassChange, needPromise: false, needCallback: false },
  startCompass: { method: startCompass },
  stopCompass: { method: stopCompass },
  onGyroscopeChange: { method: onGyroscopeChange, needPromise: false, needCallback: false },
  startGyroscope: { method: startGyroscope },
  stopGyroscope: { method: stopGyroscope },
  // wifi
  startWifi: { method: startWifi },
  stopWifi: { method: stopWifi },
  getConnectedWifi: { method: getConnectedWifi },
  getWifiList: { method: getWifiList },
  onGetWifiList: { method: onGetWifiList, needPromise: false, needCallback: false },
  offGetWifiList: { method: offGetWifiList, needPromise: false, needCallback: false },
  connectWifi: { method: connectWifi },
  onWifiConnected: { method: onWifiConnected, needPromise: false, needCallback: false },
  offWifiConnected: { method: offWifiConnected, needPromise: false, needCallback: false },
  onWifiConnectedWithPartialInfo: { method: onWifiConnectedWithPartialInfo, needPromise: false, needCallback: false },
  offWifiConnectedWithPartialInfo: { method: offWifiConnectedWithPartialInfo, needPromise: false, needCallback: false },

  // 生物认证
  startSoterAuthentication: { method: startSoterAuthentication },
  checkIsSupportSoterAuthentication: { method: checkIsSupportSoterAuthentication },
  checkIsSoterEnrolledInDevice: { method: checkIsSoterEnrolledInDevice },

  // 联系人
  addPhoneContact: { method: addPhoneContact },

  // 振动
  vibrate: { method: vibrate },
  vibrateLong: { method: vibrateLong },
  vibrateShort: { method: vibrateShort },

  // 截屏事件
  onUserCaptureScreen: { method: onUserCaptureScreen, needPromise: false, needCallback: false },
  offUserCaptureScreen: { method: offUserCaptureScreen, needPromise: false, needCallback: false },

  // 键盘
  hideKeyboard: { method: hideKeyboard },
  onKeyboardHeightChange: { method: onKeyboardHeightChange, needPromise: false, needCallback: false },
  offKeyboardHeightChange: { method: offKeyboardHeightChange, needPromise: false, needCallback: false },

  // 帐号
  login: { method: login },
  getUserInfo: { method: getUserInfo },

  // 媒体 图片
  chooseImage: { method: chooseImage },
  getImageInfo: { method: getImageInfo },
  saveImageToPhotosAlbum: { method: saveImageToPhotosAlbum },
  compressImage: { method: compressImage },

  // 屏幕亮度
  setScreenBrightness: { method: setScreenBrightness },
  getScreenBrightness: { method: getScreenBrightness },
  setKeepScreenOn: { method: setKeepScreenOn },

  // 文件
  saveFile: { method: saveFile },
  getSavedFileList: { method: getSavedFileList },
  getSavedFileInfo: { method: getSavedFileInfo },
  removeSavedFile: { method: removeSavedFile },
  getFileInfo: { method: getFileInfo },
  openDocument: { method: openDocument },
  getFileSystemManager: { method: getFileSystemManager, needPromise: false, needCallback: false },

  // 基础

  // 媒体 录音管理

  // 媒体 音频
  createInnerAudioContext: { method: createInnerAudioContext, needPromise: false, needCallback: false },

  // 媒体 视频
  saveVideoToPhotosAlbum: { method: saveVideoToPhotosAlbum },
  getVideoInfo: { method: getVideoInfo },

  // 二维码扫描
  scanCode: { method: scanCode },
}

function invokeModule (moduleName, ...args) {
  console.debug('[AdvancedAPI] invokeModule moduleName = %s', moduleName)
  const id = args.pop()
  if (typeof id === 'number') {
    let callback = jsCallbackMap.get(id)
    if (!callback) {
      callback = new JSCallback({ id })
      jsCallbackMap.set(id, callback)
    }
    args.push(callback)
  } else {
    args.push(id)
  }
  const values = asInterfaceList[moduleName]
  triggerInterceptInvoke(moduleName, args)
  const result = values.method.apply(null, args)
  triggerInterceptReturnValue(moduleName, result)
  return result
}

function triggerInterceptInvoke (moduleName, args) {
  const interceptor = requireAPI('ASInterceptor')
  if (asInterfaceList[moduleName].needCallback !== false) {
    const params = [...args]
    params.pop()
    interceptor.invoke(moduleName, params)
  }
}

function triggerInterceptReturnValue (moduleName, args) {
  const interceptor = requireAPI('ASInterceptor')
  interceptor.returnValue(moduleName, args)
}

export function createAs() {
  const as = {}
  const moduleNames = Object.keys(asInterfaceList)
  moduleNames.forEach(moduleName => {
    Object.defineProperty(as, moduleName, {
      get: () => {
        return (...args) => {
          const cbResult = interceptCallback(args,
            moduleName,
            asInterfaceList[moduleName].needPromise,
            asInterfaceList[moduleName].needCallback)
          args = cbResult.args || []
          const promise = cbResult.promise
          const result = invokeModule(moduleName, ...args)
          if (promise) {
            return promise.promise
          }
          return result
        }
      }
    })
  })
  return as
}

const as = createAs()

export default as
