import Result from '../../../base/util/Result'
export function makePhoneCall (...args) {
  const callback = args.pop()
  const number = args.pop()
  const phone = requireAPI('ASPhone')
  phone.makePhoneCall(number).then(() => {
    callback.invoke(Result.success())
  }, (err) => {
    console.error(`[AdvancedAPI] start makePhoneCall fail`)
    callback.invoke(Result.fail([err, -1]))
  })
}
