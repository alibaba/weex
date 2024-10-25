/**
 * Copyright (c) Huawei Technologies Co., Ltd. 2023-2023. All rights reserved.
 * Description: Advanced API compass
 * Author: 00430169
 * Create: 23/3/2023
 * Notes: N/A
 */

import Result from '../../../base/util/Result'

export function onCompassChange (...args) {
  console.debug('[AdvancedAPI] start onCompassChange')
  const callback = args.pop()
  const compass = requireAPI('ASCompass')

  compass.onCompassChange(callback).then(data => {
    console.debug('[AdvancedAPI] onCompassChange success')
  }, (data, code) => {
    console.debug('[AdvancedAPI] onCompassChange fail errMsg = %o, code = %d', data, code)
  })
}

export function offCompassChange (...args) {
  console.debug('[AdvancedAPI] start offCompassChange')
  const callback = args.pop()
  const compass = requireAPI('ASCompass')

  compass.offCompassChange(callback).then(data => {
    console.debug('[AdvancedAPI] offCompassChange success')
  }, (data, code) => {
    console.debug('[AdvancedAPI] offCompassChange fail errMsg = %o, code = %d', data, code)
  })
}

export function startCompass (...args) {
  console.debug('[AdvancedAPI] start startCompass')
  const callback = args.pop()
  const compass = requireAPI('ASCompass')

  compass.startCompass().then(data => {
    console.debug('[AdvancedAPI] startCompass success')
    callback.invoke(Result.success(data))
  }, (data, code) => {
    console.debug('[AdvancedAPI] startCompass fail')
    callback.invoke(Result.fail([data, code]))
  })
}

export function stopCompass (...args) {
  console.debug('[AdvancedAPI] start stopCompass')
  const callback = args.pop()
  const compass = requireAPI('ASCompass')

  compass.stopCompass().then(data => {
    console.debug('[AdvancedAPI] stopCompass success')
    callback.invoke(Result.success(data))
  }, (data, code) => {
    console.debug('[AdvancedAPI] stopCompass fail')
    callback.invoke(Result.fail([data, code]))
  })
}

