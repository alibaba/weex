import call from '@ohos.telephony.call'
import { ErrorCode } from '../../../base/util/ErrorCode'
export default class ASPhone {
  makePhoneCall(number) {
    if (!number || !number.phoneNumber || (typeof number.phoneNumber !== 'string') || number === '') {
      return new Promise((resolve, reject) => {
        reject(['param is invalid.', ErrorCode.PARAMETER_ERROR])
      })
    }
    const promise = call.makeCall(number.phoneNumber)
    return promise
  }
}
