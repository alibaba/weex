import { jsMethod } from '../../decorators'
import { context } from '../../bridge/abilityBase'
import { BrightnessBase } from '../../bridge/brightnessBase'
import { ErrorCode } from '../../util/ErrorCode'
import { isNumber } from '../../util/checkDataType'
import window from '@ohos.window'

export class BrightnessBaseModule {
    @jsMethod({ alias: 'getValue', common: false, callback: true })
  getValue() {
    return new Promise((resolve, reject) => {
      try {
        window.getLastWindow(context).then(windowClass => {
          const properties = windowClass.getWindowProperties()
          let value = properties.brightness
          if (!value || value < 0) {
            value = Number(BrightnessBase.ohoGetValue()) / 255
          }
          const brightness = {
            value: Math.round(value * 255)
          }
          console.debug('[QAFAPI] getValue success, brightness = ' + JSON.stringify(brightness))
          resolve([brightness])
        })
      } catch (exception) {
        reject([['Failed to get brightness']])
        console.error('Failed to obtain the window properties. Cause: ' + JSON.stringify(exception))
      }
    })
  }

    @jsMethod({ alias: 'setValue', common: false, callback: true })
    setValue(object) {
      return new Promise((resolve, reject) => {
        const { value } = object
        let params
        if (value || value === 0) {
          params = value
        } else {
          reject([['inalid param', ErrorCode.PARAMETER_ERROR]])
          return
        }
        if (!isNumber(params)) {
          reject([['inalid param', ErrorCode.PARAMETER_ERROR]])
          return
        }
        let Num = Math.floor(params)
        if (Num < 0) {
          Num = 1
        } else if (Num > 255) {
          Num = 255
        }
        const brightness = Num / 255
        try {
          window.getLastWindow(context).then((windowClass) => {
            windowClass.setWindowBrightness(brightness, (err) => {
              if (err.code) {
                reject([['setWindowBrightness fail']])
                console.error('[QAFAPI] Failed to set the brightness. Cause: ' + JSON.stringify(err))
                return
              }
              resolve('successed to set')
              console.info('[QAFAPI] Succeeded in setting the brightness.')
            })
          })
        } catch (error) {
          console.error('[QAFAPI] Failed to set setting of brightness. Cause:' + JSON.stringify(error))
          reject([['setWindowBrightness fail']])
        }
      })
    }

    @jsMethod({ alias: 'setKeepScreenOn', common: false, callback: true })
    setKeepScreenOn(object) {
      return new Promise((resolve, reject) => {
        if (object && object.keepScreenOn !== '' && object.keepScreenOn !== null) {
          const { keepScreenOn } = object
          if (typeof (keepScreenOn) === 'boolean') {
            try {
              window.getLastWindow(context).then(windowClass => {
                windowClass.setWindowKeepScreenOn(keepScreenOn, (err) => {
                  if (err.code) {
                    console.error('[QAFAPI] Failed to set the screen to be always on. Cause: ' + JSON.stringify(err))
                    reject([['handling failed']])
                    return
                  }
                  resolve(['handling success'])
                  console.info('[QAFAPI] Succeeded in setting the screen to be always on.')
                })
              })
            } catch (exception) {
              console.error('[QAFAPI] Failed to set the screen to be always on. exception: ' + JSON.stringify(exception))
              reject([['handling failed']])
            }
          } else {
            reject([['inalid param', ErrorCode.PARAMETER_ERROR]])
          }
        } else {
          reject([['inalid param', ErrorCode.PARAMETER_ERROR]])
        }
      })
    }
}
