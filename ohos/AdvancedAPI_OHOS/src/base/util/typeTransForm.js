/**
 * Copyright (c) Huawei Technologies Co., Ltd. 2022-2022. All rights reserved.
 * Description: 数据类型转换工具函数
 * Author: pengweihang
 * Create: 03/21/2022
 * Notes: N/A
 */

function stringToArrayBuffer(str) {
  const buffers = []
  let c
  const len = str.length
  for (let i = 0; i < len; i++) {
    c = str.charCodeAt(i)
    if (c >= 0x010000 && c <= 0x10FFFF) {
      buffers.push(((c >> 18) & 0x07) | 0xF0)
      buffers.push(((c >> 12) & 0x3F) | 0x80)
      buffers.push(((c >> 6) & 0x3F) | 0x80)
      buffers.push((c & 0x3F) | 0x80)
    } else if (c >= 0x000800 && c <= 0x00FFFF) {
      buffers.push(((c >> 12) & 0x0F) | 0xE0)
      buffers.push(((c >> 6) & 0x3F) | 0x80)
      buffers.push((c & 0x3F) | 0x80)
    } else if (c >= 0x000080 && c <= 0x0007FF) {
      buffers.push(((c >> 6) & 0x1F) | 0xC0)
      buffers.push((c & 0x3F) | 0x80)
    } else {
      buffers.push(c & 0xFF)
    }
  }
  const array = new Int8Array(buffers.length)
  for (let i = 0; i <= buffers.length; i++) {
    array[i] = buffers[i]
  }
  return array.buffer
}

function dataToArray (obj) {
  if (Array.isArray(obj)) {
    return obj
  }
  return [obj]
}

// 获取url上的参数
function getUriParams (uri) {
  const search = uri.split('?')[1]
  const result = {}
  if (search) {
    const params = search.split('&')
    params.forEach(item => {
      const [key, value] = item.split('=')
      result[key] = value
    })
  }
  return result
}

export { stringToArrayBuffer, dataToArray, getUriParams }
