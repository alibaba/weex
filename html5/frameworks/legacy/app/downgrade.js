import semver from 'semver'
import { isPlainObject, typof } from '../util/index'

/**
 * Normalize a version string.
 * @param  {String} Version. ie: 1, 1.0, 1.0.0
 * @return {String} Version
 */
export function normalizeVersion (v) {
  const isValid = semver.valid(v)
  if (isValid) {
    return v
  }

  v = typeof (v) === 'string' ? v : ''
  const split = v.split('.')
  let i = 0
  const result = []

  while (i < 3) {
    const s = typeof (split[i]) === 'string' && split[i] ? split[i] : '0'
    result.push(s)
    i++
  }

  return result.join('.')
}

/**
 * Get informations from different error key. Like:
 * - code
 * - errorMessage
 * - errorType
 * - isDowngrade
 * @param  {string} key
 * @param  {string} val
 * @param  {string} criteria
 * @return {object}
 */
export function getError (key, val, criteria) {
  const result = {
    isDowngrade: true,
    errorType: 1,
    code: 1000
  }
  const getMsg = function (key, val, criteria) {
    return 'Downgrade[' + key + '] :: deviceInfo '
      + val + ' matched criteria ' + criteria
  }
  const _key = key.toLowerCase()

  result.errorMessage = getMsg(key, val, criteria)

  if (_key.indexOf('osversion') >= 0) {
    result.code = 1001
  }
  else if (_key.indexOf('appversion') >= 0) {
    result.code = 1002
  }
  else if (_key.indexOf('weexversion') >= 0) {
    result.code = 1003
  }
  else if (_key.indexOf('devicemodel') >= 0) {
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

  let result = {
    isDowngrade: false // defautl is pass
  }

  if (typof(config) === 'function') {
    let customDowngrade = config.call(this, deviceInfo, {
      semver: semver,
      normalizeVersion
    })

    customDowngrade = !!customDowngrade

    result = customDowngrade ? getError('custom', '', 'custom params') : result
  }
  else {
    config = isPlainObject(config) ? config : {}

    const platform = deviceInfo.platform || 'unknow'
    const dPlatform = platform.toLowerCase()
    const cObj = config[dPlatform] || {}

    for (const i in deviceInfo) {
      const key = i
      const keyLower = key.toLowerCase()
      const val = deviceInfo[i]
      const isVersion = keyLower.indexOf('version') >= 0
      const isDeviceModel = keyLower.indexOf('devicemodel') >= 0
      const criteria = cObj[i]

      if (criteria && isVersion) {
        const c = normalizeVersion(criteria)
        const d = normalizeVersion(deviceInfo[i])

        if (semver.satisfies(d, c)) {
          result = getError(key, val, criteria)
          break
        }
      }
      else if (isDeviceModel) {
        const _criteria = typof(criteria) === 'array' ? criteria : [criteria]
        if (_criteria.indexOf(val) >= 0) {
          result = getError(key, val, criteria)
          break
        }
      }
    }
  }

  return result
}
