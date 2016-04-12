import semver from 'semver'
import {extend, isPlainObject, typof}  from '../util'

/**
 * [normalizeVersion description]
 * @param  {String} Version. ie: 1, 1.0, 1.0.0
 * @return {String} Version
 */
export function normalizeVersion (v) {
  const isValid = semver.valid(v) ? true : false
  if (isValid) {
    return v
  }

  v = typeof (v) === 'string' ? v : ''
  const split = v.split('.')
  let i = 0
  let result = []

  while (i < 3) {
    const s = typeof (split[i]) === 'string' && split[i] ? split[i] : '0'
    result.push(s)
    i++
  }

  return result.join('.')
}

export function getError (key, val, criteria) {
  let result = {
    isDowngrade: true,
    errorType: 1,
    code: 1000
  }
  let getMsg = function (key, val, criteria) {
    return 'Downgrade[' + key + '] :: deviceInfo '
      + val + ' matched criteria ' + criteria
  }
  const _key = key.toLowerCase()

  result.errorMessage = getMsg(key, val, criteria)

  if (_key.indexOf('osversion') >= 0) {
    result.code = 1001
  }else if (_key.indexOf('appversion') >= 0) {
    result.code = 1002
  }else if (_key.indexOf('weexversion') >= 0) {
    result.code = 1003
  }else if (_key.indexOf('devicemodel') >= 0) {
    result.code = 1004
  }

  return result
}

/**
 * WEEX framework input(deviceInfo)
 * {
 *   platform: 'iOS' or 'android'
 *   osVersion: '1.0.0' or '1.0' or '1'
 *   appVersion: '1.0.0' or '1.0' or '1'
 *   weexVersion: '1.0.0' or '1.0' or '1'
 *   dDeviceModel: 'MODEL_NAME'
 * }
 *
 * downgrade config(config)
 * {
 *   ios: {
 *     osVersion: '>1.0.0' or '>=1.0.0' or '<1.0.0' or '<=1.0.0' or '1.0.0'
 *     appVersion: '>1.0.0' or '>=1.0.0' or '<1.0.0' or '<=1.0.0' or '1.0.0'
 *     weexVersion: '>1.0.0' or '>=1.0.0' or '<1.0.0' or '<=1.0.0' or '1.0.0'
 *     deviceModel: ['modelA', 'modelB', ...]
 *   },
 *   android: {
 *     osVersion: '>1.0.0' or '>=1.0.0' or '<1.0.0' or '<=1.0.0' or '1.0.0'
 *     appVersion: '>1.0.0' or '>=1.0.0' or '<1.0.0' or '<=1.0.0' or '1.0.0'
 *     weexVersion: '>1.0.0' or '>=1.0.0' or '<1.0.0' or '<=1.0.0' or '1.0.0'
 *     deviceModel: ['modelA', 'modelB', ...]
 *   }
 * }
 *
 *
 * @param  {object} deviceInfo Weex SDK framework input
 * @param  {object} config     user input
 * @return {Object}            { isDowngrade: true/false, errorMessage... }
 */
export function check (config, deviceInfo) {
  deviceInfo = deviceInfo || global.WXEnvironment
  deviceInfo = isPlainObject(deviceInfo) ? deviceInfo : {}
  config = isPlainObject(config) ? config : {}
  const platform = deviceInfo.platform || 'unknow'
  const dPlatform = platform.toLowerCase()
  const cObj = config[dPlatform] || {}

  let result = {
    isDowngrade: false // defautl is pass
  }

  for (let i in deviceInfo) {
    const key = i
    const keyLower = key.toLowerCase()
    const val = deviceInfo[i]
    const isVersion = keyLower.indexOf('version') >= 0 ? true : false
    const isDeviceModel = keyLower.indexOf('devicemodel') >= 0 ? true : false
    const criteria = cObj[i]

    if (criteria && isVersion) {
      const c = this.normalizeVersion(criteria)
      const d = this.normalizeVersion(deviceInfo[i])

      if (semver.satisfies(d, c)) {
        result = extend(this.getError(key, val, criteria))
        break
      }
    }else if (isDeviceModel) {
      const _criteria = typof(criteria) === 'array' ? criteria : [criteria]
      if (_criteria.indexOf(val) >= 0) {
        result = extend(this.getError(key, val, criteria))
        break
      }
    }
  }

  return result
}