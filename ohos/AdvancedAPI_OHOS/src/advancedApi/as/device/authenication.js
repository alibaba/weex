import Result from '../../../base/util/Result'

export function startSoterAuthentication (...args) {
  console.debug('[AdvancedAPI] start startSoterAuthentication')
  const callback = args.pop()
  const params = args.pop()
  console.debug('[AdvancedAPI] params = %s', JSON.stringify(params))
  const auth = requireAPI('ASAuthentication')
  auth.start(params).then(res => {
    callback.invoke(Result.success(res))
  }, err => {
    callback.invoke(Result.fail(err))
  })
}

export function checkIsSupportSoterAuthentication (...args) {
  console.debug('[AdvancedAPI] start checkIsSupportSoterAuthentication')
  const callback = args.pop()
  const auth = requireAPI('ASAuthentication')
  auth.getSupportedType().then(res => {
    callback.invoke(Result.success(res))
  }, err => {
    callback.invoke(Result.fail(err))
  })
}

export function checkIsSoterEnrolledInDevice (...args) {
  console.debug('[AdvancedAPI] start checkIsSoterEnrolledInDevice')
  const callback = args.pop()
  const params = args.pop()
  console.debug('[AdvancedAPI] params = %s', JSON.stringify(params))
  const auth = requireAPI('ASAuthentication')
  auth.isEnrolled(params).then(res => {
    callback.invoke(Result.success(res))
  }, err => {
    callback.invoke(Result.fail(err))
  })
}
