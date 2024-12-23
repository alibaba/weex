/**
 * Copyright (c) Huawei Technologies Co., Ltd. 2023-2023. All rights reserved.
 * Description: Advanced API Gyroscope
 * Author: 00430169
 * Create: 23/3/2023
 * Notes: N/A
 */

import Result from '../../../base/util/Result'

export function onGyroscopeChange (...args) {
  console.debug('[AdvancedAPI] start onGyroscopeChange')
  const callback = args.pop()
  const gyroscope = requireAPI('ASGyroscope')

  gyroscope.onGyroscopeChange(callback).then(data => {
    console.debug('[AdvancedAPI] onGyroscopeChange success')
  }, (data, code) => {
    console.debug('[AdvancedAPI] onGyroscopeChange fail errMsg = %o, code = %d', data, code)
  })
}

export function startGyroscope (...args) {
  console.debug('[AdvancedAPI] start startCompass')
  const callback = args.pop()
  const gyroscope = requireAPI('ASGyroscope')

  gyroscope.startGyroscope(args[0]).then(data => {
    console.debug('[AdvancedAPI] startCompass success')
    callback.invoke(Result.success(data))
  }, (data, code) => {
    console.debug('[AdvancedAPI] startCompass fail errMsg = %o, code = %d', data, code)
    callback.invoke(Result.fail([data, code]))
  })
}

export function stopGyroscope (...args) {
  console.debug('[AdvancedAPI] start stopGyroscope')
  const callback = args.pop()
  const gyroscope = requireAPI('ASGyroscope')

  gyroscope.stopGyroscope().then(data => {
    console.debug('[AdvancedAPI] stopGyroscope success')
    callback.invoke(Result.success(data))
  }, (data, code) => {
    console.debug('[AdvancedAPI] stopGyroscope fail errMsg = %o, code = %d', data, code)
    callback.invoke(Result.fail([data, code]))
  })
}

