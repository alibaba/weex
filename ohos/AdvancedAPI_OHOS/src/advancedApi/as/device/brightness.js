/**
 * Copyright (c) Huawei Technologies Co., Ltd. 2023-2023. All rights reserved.
 * Description: advanced as capture screen event api
 * Create: 04/12/2023
 * Notes: N/A
 */
import Result from '../../../base/util/Result'

export function setScreenBrightness(...args) {
  const callback = args.pop()
  const params = args.pop()
  const brightness = requireAPI('ASBrightness')
  brightness.setScreenBrightness(params).then(data => {
    callback.invoke(Result.success(data))
  }, (data) => {
    callback.invoke(Result.fail(data))
  })
}

export function getScreenBrightness(...args) {
  const callback = args.pop()
  const brightness = requireAPI('ASBrightness')
  brightness.getScreenBrightness().then(data => {
    console.info(`[AdvancedAPI] getScreenBrightness raw = ${data[0].value}`)
    const brightValue = data[0].value / 255
    console.info(`[AdvancedAPI] getScreenBrightness = ${brightValue}`)
    callback.invoke(Result.success({ value: brightValue }))
  }, (data) => {
    callback.invoke(Result.fail(data))
  })
}

export function setKeepScreenOn(...args) {
  const callback = args.pop()
  const params = args.pop()
  const brightness = requireAPI('ASBrightness')
  brightness.asSetKeepScreenOn(params).then(() => {
    callback.invoke(Result.success())
  }, () => {
    callback.invoke(Result.fail())
  })
}
