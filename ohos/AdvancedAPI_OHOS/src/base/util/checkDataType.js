/**
 * Copyright (c) Huawei Technologies Co., Ltd. 2022-2022. All rights reserved.
 * Description: 检查数据类型工具函数
 * Author: xuxiaofei
 * Create: 03/17/2022
 * Notes: N/A
 */

// 判断MIC地址格式是否正确(deviceid)
function isMac (str) {
  return /^[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}$/.test(str)
}

// 判断UUID是否格式正确
function isUuid (str) {
  return /^[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}$/.test(str)
}

// 判断字符串是否为全小写
function isLower (str) {
  return str === str.toLowerCase()
}

// 判断字符串是否包含中文
function isIncludeChinese (str) {
  const regChinese = new RegExp('[\u4e00-\u9fa5]+', 'g')
  return regChinese.test(str)
}

// 数据类型是否为int
function isInt (data) {
  if (isNumber(data)) {
    return (/(^[1-9]\d*$)/.test(data))
  }
}

// 数据类型是否为number
function isNumber (data) {
  return typeof data === 'number' && !Number.isNaN(data) && Number.isFinite(data)
}

// 数据类型是否为string
function isString (data) {
  return typeof data === 'string'
}

// 数据类型是否为boolean
function isBoolean (data) {
  return typeof data === 'boolean'
}

// 数据类型是否为function
function isFunction (data) {
  return typeof data === 'function'
}

// 数据类型是否为arraybuffer
function isArrayBuffer (data) {
  return Object.prototype.toString.call(data) === '[object ArrayBuffer]'
}

// 数据类型是否为Uint8Array
function isUint8Array (data) {
  return Object.prototype.toString.call(data) === '[object Uint8Array]'
}

// 判断url是否有效
function isValidURL (url) {
  const urlReg = /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/.*)?(\?.*)?(#.*)?$/
  if (!isString(url)) {
    return false
  }
  return urlReg.test(url)
}

// 判断websocket的url是否有效
function isValidURLofWS (url) {
  const urlReg = /^wss?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/.*)?(\?.*)?(#.*)?$/
  if (!isString(url)) {
    return false
  }
  return urlReg.test(url)
}

// 判断uri是否有效
function isValidURI (uri) {
  const uriReg = /^(internal:\/\/|\/)?([^\s"':|*?<>\\]+\/)*([^\s"':|*?<>\\]+)?$/
  if (!isString(uri)) {
    return false
  }
  // uri不允许出现..
  if (uri.indexOf('..') > -1) {
    return false
  }
  return uriReg.test(uri)
}

// 数据类型是否为null
function isNull (data) {
  return data === null
}

// 数据类型是否为undefined
function isUndefined (data) {
  return (typeof data) === 'undefined'
}

// 数据类型是否为数组
function isArray (data) {
  return Array.isArray(data)
}

// 数据类型是否为16进制颜色码
function isHexcolor (data) {
  const regExp6 = /^#[0-9a-fA-F]{6}$/i
  const regExp3 = /^#[0-9a-fA-F]{3}$/i
  return regExp6.test(data) || regExp3.test(data)
}

/**
 * 通用校验接口checkDataType
 * @param {*} data 待校验数据
 * @param {Boolean} isRequired 是否为必填项
 * @param {String | String[]} dataType 字符串或数组，预期的数据类型，
 * 字符串支持："string","number","boolean","function","arraybuffer","array","hexcolor"。
 * 支持上述字符串类型组成的数组，数组情况下满足其中一种类型即校验通过
 * @param {Function} customCheck 定制化校验方法，入参为data，需返回布尔
 * @returns {Boolean} 返回是否校验通过
 */
function checkDataType (data, isRequired, dataType, customCheck) {
  let result = false
  try {
    if (isRequired && (isNull(data) || isUndefined(data))) {
      throw new Error('The param data is required')
    }
    if (!isString(dataType) && !isArray(dataType)) {
      throw new Error('The param dataType should be a String or an Array')
    }
    if (!isNull(customCheck) && !isUndefined(customCheck) && !isFunction(customCheck)) {
      throw new Error('If customCheck exist,it should be a Function')
    }

    // 非必填时，如果没有该参数，直接返回true
    if (!isRequired && (isNull(data) || isUndefined(data))) {
      return true
    }
    if (isString(dataType)) {
      result = checkSingleDataType(data, dataType)
    } else if (isArray(dataType)) {
      result = dataType.some(value => {
        return checkSingleDataType(data, value)
      })
    }
    if (result && isFunction(customCheck)) {
      result = customCheck(data)
    }
  } catch (error) {
    console.log(error)
    return false
  }
  return result
}
function checkSingleDataType (data, dataType) {
  let result = false
  switch (dataType) {
    case 'string':
      result = isString(data)
      break
    case 'number':
      result = isNumber(data)
      break
    case 'boolean':
      result = isBoolean(data)
      break
    case 'function':
      result = isFunction(data)
      break
    case 'arraybuffer':
      result = isArrayBuffer(data)
      break
    case 'array':
      result = isArray(data)
      break
    case 'hexcolor':
      result = isHexcolor(data)
      break
    case 'null':
      result = isNull(data)
      break
    case 'undefined':
      result = isUndefined(data)
      break
    default:
      throw new Error('The param dataType is unsupport')
  }
  return result
}
function isJsonString (str) {
  try {
    if (typeof JSON.parse(str) === 'object') {
      return true
    }
  } catch (e) { }
  return false
}
// 判断号码是否有效
function isValidDestNumber (data) {
  const regExp = /^\+?([0-9]\d*|\s)+$/
  return regExp.test(data)
}
export {
  isNumber,
  isString,
  isBoolean,
  isFunction,
  isArrayBuffer,
  isUint8Array,
  isValidURL,
  isValidURLofWS,
  isValidURI,
  checkDataType,
  isInt,
  isArray,
  isLower,
  isJsonString,
  isMac,
  isUuid,
  isValidDestNumber,
  isIncludeChinese
}
