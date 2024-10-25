import { context } from './abilityBase'
import settings from '@ohos.settings'

const name = settings.display.SCREEN_BRIGHTNESS_STATUS
export class BrightnessBase {
  static ohoGetValue() {
    const SETTINGMAX = 100
    const VAlUEMAX = 255
    try {
      // 获取数据项亮度的值（该数据项在数据库中已存在）
      const value = settings.getValueSync(context, name, '1')
      console.log('[AdvancedAPI] success to get brightness. value:' + value)
      Math.round(value * (VAlUEMAX / SETTINGMAX))
      return value
    } catch (error) {
      console.log('[QAFAPI] Failed to get brightness. Cause:' + JSON.stringify(error))
    }
  }
}
