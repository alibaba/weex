import { AbilityBase, context } from '../../../base/bridge/abilityBase'
import abilityAccessCtrl from '@ohos.abilityAccessCtrl'
import geoLocationManager from '@ohos.geoLocationManager'
import mapCommon from '@hms.core.map.mapCommon'
import map from '@hms.core.map.map'
import wantAgent from '@ohos.app.ability.wantAgent'
import backgroundTaskManager from '@ohos.resourceschedule.backgroundTaskManager'
import { ErrorCode } from '../../../base/util/ErrorCode'
import Result from '../../../base/util/Result'

export default class ASLocation {
  constructor () {
    this.locationChangeCallbacks = []
    this.locationChangeErrorCallback = (location, err) => {}
    this.bothCallback = (location, err) => {
      if (err) {
        this.locationChangeErrorCallback({
          errMsg: err[2].arguments[0], errCode: err[2].arguments[1]
        })
      } else {
        for (let i = 0; i < this.locationChangeCallbacks.length; i++) {
          this.locationChangeCallbacks[i].invokeAndKeepAlive(Result.success(location))
        }
      }
    }
  }

  getLocation(params) {
    console.debug('[AdvancedAPI] start ASLocation getLocation')
    let permissions = ['ohos.permission.APPROXIMATELY_LOCATION']
    if (params?.isHighAccuracy) {
      permissions = ['ohos.permission.APPROXIMATELY_LOCATION', 'ohos.permission.LOCATION']
    }
    const atManager = abilityAccessCtrl.createAtManager()
    return atManager.requestPermissionsFromUser(context, permissions).then((data) => {
      const grantStatus = data.authResults
      const dialogShownResults = data.dialogShownResults
      const length = grantStatus.length
      for (let i = 0; i < length; i++) {
        if (grantStatus[i] !== 0 && data.permissions[i] === 'ohos.permission.APPROXIMATELY_LOCATION') {
          return Promise.reject(['Permissions check failed,auth deny', ErrorCode.USER_REJECT, grantStatus[0], dialogShownResults[0]])
        }
      }

      let requestInfo = { 'priority': 0x203, 'scenario': 0x300, 'maxAccuracy': 0 }
      if (params?.highAccuracyExpireTime) {
        requestInfo = { 'priority': 0x203, 'scenario': 0x300, 'maxAccuracy': 0, timeoutMs: params.highAccuracyExpireTime }
      }
      try {
        return geoLocationManager.getCurrentLocation(requestInfo).then((result) => {
          console.debug('[AdvancedAPI]  current location: %s', JSON.stringify(result))
          if (params?.type === 'gcj02') {
            const wgs84Position = {
              latitude: result.latitude,
              longitude: result.longitude
            }
            return map.convertCoordinate(mapCommon.CoordinateType.WGS84, mapCommon.CoordinateType.GCJ02, wgs84Position).then((gcj02Position) => {
              result.latitude = gcj02Position.latitude
              result.longitude = gcj02Position.longitude
              return Promise.resolve(result)
            }).catch((error) => {
              console.debug('[AdvancedAPI]  promise, convertCoordinate: error= %s', JSON.stringify(error))
              return Promise.reject([[error.message, ErrorCode.SERVICE_UNAVIALABLE]])
            })
          } else {
            return Promise.resolve(result)
          }
        })
          .catch((error) => {
            console.debug('[AdvancedAPI]  promise, getCurrentLocation: error= %s', JSON.stringify(error))
            return Promise.reject([[error.message, ErrorCode.SERVICE_UNAVIALABLE]])
          })
      } catch (error) {
        console.error('[AdvancedAPI] errCode:' + error.code + ',errMessage:' + error.message)
        return Promise.reject([[error.message, ErrorCode.SERVICE_UNAVIALABLE]])
      }
    })
  }
  onLocationChange(callback) {
    console.debug('[AdvancedAPI] start ASLocation onLocationChange')
    this.locationChangeCallbacks.push(callback)
  }
  offLocationChange(callback) {
    console.debug('[AdvancedAPI] start ASLocation offLocationChange')
    if (callback) {
      const index = this.locationChangeCallbacks.indexOf(callback)
      if (index >= 0) {
        this.locationChangeCallbacks.splice(index, 1)
      }
    } else {
      this.locationChangeCallbacks = []
    }
  }
  onLocationChangeError(callback) {
    console.debug('[AdvancedAPI] start ASLocation onLocationChangeError')
    this.locationChangeErrorCallback = callback
  }
  offLocationChangeError() {
    console.debug('[AdvancedAPI] start ASLocation offLocationChangeError')
    this.locationChangeErrorCallback = (location, err) => {}
  }
  startLocationUpdate() {
    console.debug('[AdvancedAPI] start ASLocation startLocationUpdate')
    const permissions = ['ohos.permission.APPROXIMATELY_LOCATION', 'ohos.permission.LOCATION']
    const atManager = abilityAccessCtrl.createAtManager()
    try {
      return atManager.requestPermissionsFromUser(context, permissions).then((data) => {
        const grantStatus = data.authResults
        const length = grantStatus.length
        for (let i = 0; i < length; i++) {
          if (grantStatus[i] !== 0 && data.permissions[i] === 'ohos.permission.APPROXIMATELY_LOCATION') {
            return Promise.reject([['Permissions check failed,auth deny', ErrorCode.USER_REJECT]])
          }
        }
        const requestInfo = { 'priority': 0x203, 'scenario': 0x300, 'timeInterval': 0, 'distanceInterval': 0, 'maxAccuracy': 0 }
        try {
          geoLocationManager.on('locationChange', requestInfo, this.bothCallback)
          return Promise.resolve('SUCCESS')
        } catch (error) {
          return Promise.reject([[error.message, error.code]])
        }
      })
    } catch (err) {
      return Promise.reject([['startLocationUpdate failed', ErrorCode.COMMON_ERROR]])
    }
  }
  startLocationUpdateBackground() {
    console.debug('[AdvancedAPI] start ASLocation startLocationUpdateBackground')
    const permissions = ['ohos.permission.APPROXIMATELY_LOCATION', 'ohos.permission.LOCATION', 'ohos.permission.LOCATION_IN_BACKGROUND']
    const atManager = abilityAccessCtrl.createAtManager()
    try {
      return atManager.requestPermissionsFromUser(context, permissions).then((data) => {
        const grantStatus = data.authResults
        const length = grantStatus.length
        for (let i = 0; i < length; i++) {
          if (grantStatus[i] !== 0
              && (data.permissions[i] === 'ohos.permission.APPROXIMATELY_LOCATION'
                  || data.permissions[i] === 'ohos.permission.LOCATION_IN_BACKGROUND')) {
            return Promise.reject([['Permissions check failed,auth deny', ErrorCode.USER_REJECT]])
          }
        }
        AbilityBase.getAbilityInfo().then(abilityInfo => {
          const wantAgentInfo = {
            wants: [
              {
                bundleName: abilityInfo.bundleName,
                abilityName: abilityInfo.name
              }
            ],
            operationType: wantAgent.OperationType.START_ABILITY,
            requestCode: 0,
            wantAgentFlags: [wantAgent.WantAgentFlags.UPDATE_PRESENT_FLAG]
          }
          // use WantAgent to notify
          wantAgent.getWantAgent(wantAgentInfo).then((wantAgentObj) => {
            return backgroundTaskManager.startBackgroundRunning(context, backgroundTaskManager.BackgroundMode.LOCATION, wantAgentObj)
          }).then(() => {
            console.debug('[AdvancedAPI]  start bg operation succeeded')
          }).catch((err) => {
            console.error('[AdvancedAPI]  start bg operation failed Cause: ' + err)
          })
        })
        const requestInfo = { 'priority': 0x203, 'scenario': 0x300, 'timeInterval': 0, 'distanceInterval': 0, 'maxAccuracy': 0 }
        try {
          geoLocationManager.on('locationChange', requestInfo, this.bothCallback)
          return Promise.resolve('SUCCESS')
        } catch (error) {
          return Promise.reject([[error.message, error.code]])
        }
      })
    } catch (err) {
      return Promise.reject([['startLocationUpdateBackground failed', ErrorCode.COMMON_ERROR]])
    }
  }
  stopLocationUpdate(params) {
    console.debug('[AdvancedAPI] start ASLocation stopLocationUpdate')
    backgroundTaskManager.stopBackgroundRunning(context).then(() => {
      console.debug('[AdvancedAPI]  stop operation succeeded')
    }).catch((err) => {
      console.error('[AdvancedAPI]  stop operation fail cause: ' + JSON.stringify(err))
    })
    try {
      geoLocationManager.off('locationChange')
      return Promise.resolve('SUCCESS')
    } catch (err) {
      return Promise.reject([['stopLocationUpdate failed', ErrorCode.COMMON_ERROR]])
    }
  }
}
