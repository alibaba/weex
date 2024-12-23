/**
 * Copyright (c) Huawei Technologies Co., Ltd. 2023-2023. All rights reserved.
 * Description: advanced as account api
 * Create: 04/13/2023
 * Notes: N/A
 */
import Result from '../../../base/util/Result'

export function login(...args) {
  const callback = args.pop()
  const obj = args.pop()
  const account = requireAPI('ASAccount')
  console.debug('[AdvancedAPI] ASAccount login')

  account.login(obj).then(data => {
    callback.invoke(Result.success(data))
  }, (err) => {
    callback.invoke(Result.fail(err))
  })
}

export function getUserInfo(...args) {
  const callback = args.pop()
  const obj = args.pop()
  const account = requireAPI('ASAccount')
  console.debug('[AdvancedAPI] ASAccount getUserInfo')

  account.getUserInfo(obj).then(data => {
    callback.invoke(Result.success(data))
  }, (err) => {
    callback.invoke(Result.fail(err))
  })
}
