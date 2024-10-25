/**
 * Copyright (c) Huawei Technologies Co., Ltd. 2023-2023. All rights reserved.
 * Description: advanced as request api
 * Create: 04/01/2023
 * Notes: N/A
 */
import Result from '../../../base/util/Result'

export function request(...args) {
  const callback = args.pop()
  const obj = args.pop()
  const http = requireAPI('ASRequest')
  console.debug('[AdvancedAPI] request')

  const task = http.request(obj)
  // if success / fail / complete, return requestTask otherwise return Promise<requestTask>
  if (obj && !obj.success && !obj.fail && !obj.complete) {
    callback.invoke(Result.success(task))
    return
  }
  if (!obj) {
    callback.invoke(Result.fail(['illegal params', -1]))
  }
  return task
}

export function uploadFile(...args) {
  const callback = args.pop()
  const obj = args.pop()
  const http = requireAPI('ASRequest')
  console.debug('[AdvancedAPI] uploadFile')

  const task = http.uploadFile(obj)
  // if success / fail / complete, return uploadTask otherwise return Promise<uploadTask>
  if (obj && !obj.success && !obj.fail && !obj.complete) {
    callback.invoke(Result.success(task))
    return
  }
  if (!obj) {
    callback.invoke(Result.fail(['illegal params', -1]))
  }
  return task
}

export function downloadFile(...args) {
  const callback = args.pop()
  const obj = args.pop()
  const http = requireAPI('ASRequest')
  console.debug('[AdvancedAPI] downloadFile')

  const task = http.downloadFile(obj)
  // if success / fail / complete, return downloadTask otherwise return Promise<downloadTask>
  if (obj && !obj.success && !obj.fail && !obj.complete) {
    callback.invoke(Result.success(task))
    return
  }
  if (!obj) {
    callback.invoke(Result.fail(['illegal params', -1]))
  }
  return task
}
