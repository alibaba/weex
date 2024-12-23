import Result from '../../../base/util/Result'

export function vibrate (...args) {
  const callback = args.pop()
  const vibrator = requireAPI('ASVibrator')
  vibrator.vibrate().then((data) => {
    callback.invoke(Result.success(data))
  }, (err) => {
    callback.invoke(Result.fail(err))
  })
}

export function vibrateLong (...args) {
  const callback = args.pop()
  const vibrator = requireAPI('ASVibrator')
  vibrator.vibrateLong().then((data) => {
    callback.invoke(Result.success(data))
  }, (err) => {
    callback.invoke(Result.fail(err))
  })
}

export function vibrateShort (...args) {
  const callback = args.pop()
  const vibrator = requireAPI('ASVibrator')
  vibrator.vibrateShort().then((data) => {
    callback.invoke(Result.success(data))
  }, (err) => {
    callback.invoke(Result.fail(err))
  })
}
