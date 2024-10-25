/**
 * Copyright (c) Huawei Technologies Co., Ltd. 2023-2023. All rights reserved.
 * Description: advanced as capture screen event api
 * Create: 04/10/2023
 * Notes: N/A
 */
import Result from '../../../base/util/Result'

export function onUserCaptureScreen(...args) {
  const callback = args.pop()
  const capture = requireAPI('ASCapture')

  capture.onUserCaptureScreen(callback)
}

export function offUserCaptureScreen(...args) {
  const callback = args.pop()
  const capture = requireAPI('ASCapture')

  capture.offUserCaptureScreen(callback)
}