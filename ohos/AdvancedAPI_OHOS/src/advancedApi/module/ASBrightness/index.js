import { ErrorCode } from '../../../base/util/ErrorCode'
import { BrightnessBaseModule } from '../../../base/module/Brightness/BrightnessBaseModule'

export default class ASBrightness extends BrightnessBaseModule {
  setScreenBrightness(params) {
    console.info('[AdvancedAPI] params = ' + JSON.stringify(params))
    if (params && params.value !== undefined && (typeof params.value === 'number')) {
      const value = params.value
      if (value <= 1 && value >= 0) {
        return this.setValue({ value: Math.round(params.value * 255) })
      }
    }
    return new Promise((resolve, reject) => {
      reject(['param is invalid.', ErrorCode.PARAMETER_ERROR])
    })
  }

  getScreenBrightness() {
    return this.getValue()
  }

  asSetKeepScreenOn(params) {
    return this.setKeepScreenOn(params)
  }
}
