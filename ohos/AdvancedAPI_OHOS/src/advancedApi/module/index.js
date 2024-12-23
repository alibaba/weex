import ASDevice from './ASDevice/index'
import ASLocation from './ASLocation/index'
import ASPhone from './ASPhone/index'
import ASRequest from './ASRequest/index'
import ASBluetooth from './ASBluetooth/index'
import ASRouter from './ASRouter/index'
import ASWifi from './ASWifi/index'
import ASAuthentication from './ASAuthentication'
import ASAccelerometer from './ASAccelerometer/index'
import ASCompass from './ASCompass/index'
import ASGyroscope from './ASGyroscope/index'
import ASContact from './ASContact/index'
import ASVibrator from './ASVibrator/index'
import ASCapture from './ASCapture/index'
import ASKeyboard from './ASKeyboard/index'
import ASImage from './ASImage/index'
import ASAudio from './ASAudio/index'
import ASVideo from './ASVideo/index'
import ASBGAudio from './ASBGAudio/index'
import ASFile from './ASFile/index'
import ASBrightness from './ASBrightness/index'
import ASInterceptor from './ASInterceptor/index'
import ASScan from './ASScan/index'

const asModulesMap = new Map()
asModulesMap.set('ASDevice', ASDevice)
asModulesMap.set('ASLocation', ASLocation)
asModulesMap.set('ASPhone', ASPhone)
asModulesMap.set('ASRequest', ASRequest)
asModulesMap.set('ASRouter', ASRouter)
asModulesMap.set('ASBluetooth', ASBluetooth)
asModulesMap.set('ASWifi', ASWifi)
asModulesMap.set('ASAuthentication', ASAuthentication)
asModulesMap.set('ASAccelerometer', ASAccelerometer)
asModulesMap.set('ASCompass', ASCompass)
asModulesMap.set('ASGyroscope', ASGyroscope)
asModulesMap.set('ASContact', ASContact)
asModulesMap.set('ASVibrator', ASVibrator)
asModulesMap.set('ASCapture', ASCapture)
asModulesMap.set('ASKeyboard', ASKeyboard)
asModulesMap.set('ASImage', ASImage)
asModulesMap.set('ASBrightness', ASBrightness)
asModulesMap.set('ASFile', ASFile)
asModulesMap.set('ASAudio', ASAudio)
asModulesMap.set('ASBGAudio', ASBGAudio)
asModulesMap.set('ASVideo', ASVideo)
asModulesMap.set('ASInterceptor', ASInterceptor)
asModulesMap.set('ASScan', ASScan)

const moduleInstance = {}

export function requireAPI (moduleName) {
  if (!moduleInstance[moduleName]) {
    console.debug('[AdvancedAPI] create %s', moduleName)
    const XModule = asModulesMap.get(moduleName)
    moduleInstance[moduleName] = new XModule()
  }
  return moduleInstance[moduleName]
}
