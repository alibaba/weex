import Result from '../../../base/util/Result'

export function addPhoneContact (...args) {
  const callback = args.pop()
  const params = args.pop() || {}
  const contact = requireAPI('ASContact')
  contact.addPhoneContact(params).then(data => {
    callback.invoke(Result.success(data))
  }, (errData) => {
    callback.invoke(Result.fail(errData))
  })
}
