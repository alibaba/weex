import Result from '../../../base/util/Result'

export function navigateTo (...args) {
  const callback = args.pop()
  const params = args.pop() || {}
  const router = requireAPI('ASRouter')
  router.navigateTo(params).then(data => {
    callback.invoke(Result.success(data))
  }, (err) => {
    callback.invoke(Result.fail(err))
  })
}

export function redirectTo (...args) {
  const callback = args.pop()
  const params = args.pop() || {}
  const router = requireAPI('ASRouter')
  router.redirectTo(params).then(data => {
    callback.invoke(Result.success(data))
  }, (err) => {
    callback.invoke(Result.fail(err))
  })
}

export function navigateBack (...args) {
  const callback = args.pop()
  const params = args.pop() || {}
  const router = requireAPI('ASRouter')
  router.navigateBack(params).then(data => {
    callback.invoke(Result.success(data))
  }, (err) => {
    callback.invoke(Result.fail(err))
  })
}
