/**
 * Copyright (c) Huawei Technologies Co., Ltd. 2023-2023. All rights reserved.
 * Description: Advanced API accelerometer
 * Author: 00430169
 * Create: 23/3/2023
 * Notes: N/A
 */

import Result from '../../../base/util/Result'

export function onAccelerometerChange (...args) {
  console.debug('[AdvancedAPI] start onAccelerometerChange')
  const callback = args.pop()
  const accelerometer = requireAPI('ASAccelerometer')

  accelerometer.onAccelerometerChange(callback).then(data => {
    console.debug('[AdvancedAPI] onAccelerometerChange success')
  }, (data, code) => {
    console.debug('[AdvancedAPI] onAccelerometerChange fail errMsg = %o, code = %d', data, code)
  })
}

export function offAccelerometerChange (...args) {
  console.debug('[AdvancedAPI] start offAccelerometerChange')
  const callback = args.pop()
  const accelerometer = requireAPI('ASAccelerometer')

  accelerometer.offAccelerometerChange(callback).then(data => {
    console.debug('[AdvancedAPI] offAccelerometerChange success')
  }, (data, code) => {
    console.debug('[AdvancedAPI] offAccelerometerChange fail errMsg = %o, code = %d', data, code)
  })
}

export function startAccelerometer (...args) {
  console.debug('[AdvancedAPI] start startAccelerometer')
  const callback = args.pop()
  const accelerometer = requireAPI('ASAccelerometer')

  accelerometer.startAccelerometer(args[0]).then(data => {
    console.debug('[AdvancedAPI] startAccelerometer success')
    callback.invoke(Result.success(data))
  }, (data, code) => {
    console.debug('[AdvancedAPI] startAccelerometer fail errMsg = %o, code = %d', data, code)
    callback.invoke(Result.fail([data, code]))
  })
}

export function stopAccelerometer (...args) {
  console.debug('[AdvancedAPI] start stopAccelerometer')
  const callback = args.pop()
  const accelerometer = requireAPI('ASAccelerometer')

  accelerometer.stopAccelerometer().then(data => {
    console.debug('[AdvancedAPI] startAccelerometer success')
    callback.invoke(Result.success(data))
  }, (data, code) => {
    console.debug('[AdvancedAPI] startAccelerometer fail')
    callback.invoke(Result.fail([data, code]))
  })
}

