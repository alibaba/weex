import Result from '../../../base/util/Result'
export function scanCode (...args) {
  console.debug('[AdvancedAPI] start scanCode')
  const callback = args.pop()
  const params = args[0]
  const scan = requireAPI('ASScan')
  scan.scanCode(params).then(
    res => {
      callback.invoke(Result.success(res))
    },
    err => {
      callback.invoke(Result.fail(err))
    }
  )
}
