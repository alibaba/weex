import { initContextOnStageModel } from '../base/bridge/abilityBase'
import { requireAPI } from './module/index'
import as, { createAs } from './module/interface'
import media from '@ohos.multimedia.media'
import bundleManager from '@ohos.bundle.bundleManager'

const AdvancedApi = {
  init: function (context, windowClass) {
    if (globalThis.as && globalThis.requireAPI) {
      return
    }
    console.debug('[AdvancedAPI] init')
    globalThis.as = as
    globalThis.requireAPI = requireAPI
    globalThis.isStageModel = true
    globalThis.abilityContext = context
    media.createAVRecorder().then(
      (recorder) => {
        globalThis.commonAvRecorder = recorder
      }
    )
    const flags = bundleManager.BundleFlag.GET_BUNDLE_INFO_WITH_SIGNATURE_INFO | bundleManager.BundleFlag.GET_BUNDLE_INFO_WITH_APPLICATION
    globalThis.bundleInfoForSelf = bundleManager.getBundleInfoForSelfSync(flags)
    globalThis.lastWindow = windowClass
    initContextOnStageModel(context)
  }
}

export default AdvancedApi
export { as, createAs }
