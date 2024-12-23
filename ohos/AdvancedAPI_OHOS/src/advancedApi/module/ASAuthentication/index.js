// eslint-disable-next-line camelcase
import userIAM_userAuth from '@ohos.userIAM.userAuth'
import prompt from '@ohos.prompt'

const AUTH_RESULT = {
  PERMISSION_CHECK_FAIL: 201, /* Permission verification failed. */
  PARAM_ERROR: 401, /* Incorrect parameters. */
  FAIL: 12500001, /* Authentication failed. */
  OPEN_ERROR: 12500002, /* General operation error. */
  USER_CANCEL: 12500003, /* The operation is canceled. */
  TIME_OUT: 12500004, /* The operation is time-out. */
  TYPE_UNSUPPORTED: 12500005, /* The authentication type is not supported. */
  TRUSTED_LEVEL_UNSUPPORTED: 12500006, /* The authentication trust level is not supported. */
  TASK_BUSY: 12500007, /* The authentication task is busy. */
  AUTHENTICATOR_LOCKED: 12500009, /* The authenticator is locked. */
  NOT_ENROLLED: 12500010, /* The type of credential has not been enrolled. */
}

function toUint8Arr(str) {
  const buffer = []
  for (const i of str) {
    const _code = i.charCodeAt(0)
    if (_code < 0x80) {
      buffer.push(_code)
    } else if (_code < 0x800) {
      buffer.push(0xc0 + (_code >> 6))
      buffer.push(0x80 + (_code & 0x3f))
    } else if (_code < 0x10000) {
      buffer.push(0xe0 + (_code >> 12))
      buffer.push(0x80 + (_code >> 6 & 0x3f))
      buffer.push(0x80 + (_code & 0x3f))
    }
  }
  return Uint8Array.from(buffer)
}

export default class ASAuthentication {
  start(params) {
    return new Promise((resolve, reject) => {
      const type = (params && params.requestAuthModes) || ''
      // 当前鸿蒙仅支持faceId解锁
      if (type !== 'facial') {
        reject({ errCode: 90003, errMsg: 'The authentication type is not supported.' })
        return
      }
      const challenge = params.challenge
      // uni的字符串challenge转换成鸿蒙的数组challenge
      const challengeArr = toUint8Arr(challenge)
      const authContent = (params && params.authContent) || ''
      // 当前仅支持faceId解锁
      const authType = userIAM_userAuth.UserAuthType.FACE
      // 认证结果的信任等级
      const authTrustLevel = userIAM_userAuth.AuthTrustLevel.ATL1
      try {
        const auth = userIAM_userAuth.getAuthInstance(challengeArr, authType, authTrustLevel)
        // 订阅认证结果: userIAM_userAuth.AuthResultInfo
        auth.on('result', {
          callback: (result) => {
            console.debug('[AdvancedAPI] authV9 result ' + result.result)
            console.debug('[AdvancedAPI] authV9 token ' + result.token)
            console.debug('[AdvancedAPI] authV9 remainAttempts ' + result.remainAttempts)
            console.debug('[AdvancedAPI] authV9 lockoutDuration ' + result.lockoutDuration)
            if (result.result === AUTH_RESULT.PERMISSION_CHECK_FAIL) {
              reject({ errCode: 90002, errMsg: 'Permission verification failed.' })
            } else if (result.result === AUTH_RESULT.PARAM_ERROR) {
              reject({ errCode: 90004, errMsg: 'Incorrect parameters.' })
            } else if (result.result === AUTH_RESULT.FAIL) {
              reject({ errCode: 90009, errMsg: 'Authentication failed.' })
            } else if (result.result === AUTH_RESULT.OPEN_ERROR) {
              reject({ errCode: 90009, errMsg: 'General operation error.' })
            } else if (result.result === AUTH_RESULT.USER_CANCEL) {
              reject({ errCode: 90008, errMsg: 'The operation is canceled.' })
            } else if (result.result === AUTH_RESULT.TIME_OUT) {
              reject({ errCode: 90007, errMsg: 'The operation is time-out.' })
            } else if (result.result === AUTH_RESULT.TYPE_UNSUPPORTED) {
              reject({ errCode: 90003, errMsg: 'The authentication type is not supported.' })
            } else if (result.result === AUTH_RESULT.TRUSTED_LEVEL_UNSUPPORTED) {
              reject({ errCode: 90003, errMsg: 'The authentication trust level is not supported.' })
            } else if (result.result === AUTH_RESULT.TASK_BUSY) {
              reject({ errCode: 90010, errMsg: 'The authentication task is busy.' })
            } else if (result.result === AUTH_RESULT.AUTHENTICATOR_LOCKED) {
              reject({ errCode: 90010, errMsg: 'The authenticator is locked.' })
            } else if (result.result === AUTH_RESULT.NOT_ENROLLED) {
              reject({ errCode: 90011, errMsg: 'The type of credential has not been enrolled.' })
            } else {
              resolve({
                authMode: 'facial',
                resultJSON: '',
                resultJSONSignature: '',
                errCode: 0,
                errMsg: undefined
              })
            }
          }
        })
        auth.on('tip', {
          callback: (result) => {
            switch (result.tip) {
              case userIAM_userAuth.FaceTips.FACE_AUTH_TIP_TOO_BRIGHT:
                prompt.showToast({ message: '光线太强，获取的图像太亮。' })
                break

              case userIAM_userAuth.FaceTips.FACE_AUTH_TIP_TOO_DARK:
                prompt.showToast({ message: '光线太暗，获取的图像太暗。' })
                break

              case userIAM_userAuth.FaceTips.FACE_AUTH_TIP_TOO_CLOSE:
                prompt.showToast({ message: '人脸距离设备过近。' })
                break

              case userIAM_userAuth.FaceTips.FACE_AUTH_TIP_TOO_FAR:
                prompt.showToast({ message: '人脸距离设备过远。' })
                break

              case userIAM_userAuth.FaceTips.FACE_AUTH_TIP_TOO_HIGH:
                prompt.showToast({ message: '设备太高，仅获取到人脸上部。' })
                break

              case userIAM_userAuth.FaceTips.FACE_AUTH_TIP_TOO_LOW:
                prompt.showToast({ message: '设备太低，仅获取到人脸下部。' })
                break

              case userIAM_userAuth.FaceTips.FACE_AUTH_TIP_TOO_RIGHT:
                prompt.showToast({ message: '设备太靠右，仅获取到人脸右部。' })
                break

              case userIAM_userAuth.FaceTips.FACE_AUTH_TIP_TOO_LEFT:
                prompt.showToast({ message: '设备太靠左，仅获取到人脸左部。' })
                break

              case userIAM_userAuth.FaceTips.FACE_AUTH_TIP_TOO_MUCH_MOTION:
                prompt.showToast({ message: '在图像采集过程中，用户人脸移动太快。' })
                break

              case userIAM_userAuth.FaceTips.FACE_AUTH_TIP_POOR_GAZE:
                prompt.showToast({ message: '没有正视摄像头。' })
                break

              case userIAM_userAuth.FaceTips.FACE_AUTH_TIP_NOT_DETECTED:
                prompt.showToast({ message: '没有检测到人脸信息。' })
                break

              default :
              console.debug('[AdvancedAPI] %s', JSON.stringify(result))
            }
          }
        })
        if (authContent) {
          console.debug('[AdvancedAPI] showToast authContent = %s', authContent)
          prompt.showToast({
            message: authContent
          })
        }
        auth.start()
        console.debug('[AdvancedAPI] authV9 start success')
      } catch (error) {
        console.debug('[AdvancedAPI] authV9 start error = %s', error)
        reject({ errCode: 90007, errMsg: 'General operation fail.' })
      }
    })
  }

  getSupportedType() {
    console.debug('[AdvancedAPI] start getSupportedType')
    return new Promise((resolve) => {
      resolve({ supportMode: ['facial'] })
    })
  }

  isEnrolled(params) {
    console.debug('[AdvancedAPI] start isEnrolled')
    return new Promise((resolve, reject) => {
      const checkAuthMode = (params && params.checkAuthMode) || ''
      if (checkAuthMode === 'fingerPrint') {
        resolve({ isEnrolled: false, errMsg: '' })
      } else if (checkAuthMode === 'facial') {
        resolve({ isEnrolled: false, errMsg: 'The type of credential has not been enrolled.' })
      }
    })
  }
}
