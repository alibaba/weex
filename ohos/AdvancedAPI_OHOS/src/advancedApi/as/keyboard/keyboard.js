/**
 * Copyright (c) Huawei Technologies Co., Ltd. 2023-2023. All rights reserved.
 * Description: advanced as keyboard api
 * Create: 04/10/2023
 * Notes: N/A
 */
import Result from '../../../base/util/Result'

export function hideKeyboard(...args) {
  const keyboard = requireAPI('ASKeyboard')
  const callback = args.pop()
  keyboard.hideKeyboard().then(() => {
    console.debug('[AdvancedAPI] hideKeyboard success')
    callback.invoke(Result.success())
  }, (err, code) => {
    console.debug('[AdvancedAPI] hideKeyboard fail, code: %d, error: %s', code, err)
    callback.invoke(Result.fail())
  })
}

export function onKeyboardHeightChange(...args) {
  const callback = args.pop()
  const keyboard = requireAPI('ASKeyboard')

  keyboard.onKeyboardHeightChange(callback)
}

export function offKeyboardHeightChange(...args) {
  const callback = args.pop()
  const keyboard = requireAPI('ASKeyboard')

  keyboard.offKeyboardHeightChange(callback)
}
