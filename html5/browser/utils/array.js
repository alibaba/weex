'use strict'

export function isArray (arr) {
  return Array.isArray
    ? Array.isArray(arr)
    : (Object.prototype.toString.call(arr) === '[object Array]')
}

export function slice (arr, start, end) {
  if (isArray(arr)) {
    return arr.slice(start, end)
  }
  const slice = Array.prototype.slice
  return slice.call(arr, start, end)
}
