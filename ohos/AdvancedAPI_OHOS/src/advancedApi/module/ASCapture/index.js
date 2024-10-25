/**
 * Copyright (c) Huawei Technologies Co., Ltd. 2023-2023. All rights reserved.
 * Description: advanced capture screen event api
 * Create: 04/10/2023
 * Notes:
 */
import window from '@ohos.window'

// AS API class
export default class ASCapture {
  /**
   * constructor function, init callback map
   */
  constructor() {
    this.captureCallback = null
  }

  /**
   * subscribe user capture screen event
   * @callback params path {String}: capture file storage path (ohos not support)
   */
  onUserCaptureScreen(callback) {
    if (!callback) {
      console.error('[AdvancedAPI] params illegal, empty callback')
      return
    }
    try {
      window.getLastWindow(globalThis.abilityContext).then((data) => {
        this.windowClass = data

        function screenshotCallback() {
          callback('ohos not support path')
        }

        if (this.captureCallback) {
          this.windowClass.off('screenshot')
          this.captureCallback = null
        }
        this.captureCallback = callback

        console.info('[AdvancedAPI] Succeeded in obtaining the top window. Listen to screenshot event.')
        try {
          this.windowClass.on('screenshot', screenshotCallback)
        } catch (exception) {
          console.error('[AdvancedAPI] Failed to register callback. Cause: ' + JSON.stringify(exception))
        }
      }).catch((err) => {
        console.error('[AdvancedAPI] Failed to obtain the top window. Cause: ' + JSON.stringify(err))
      })
    } catch (exception) {
      console.error('[AdvancedAPI] Failed to obtain the top window. Cause: ' + JSON.stringify(exception))
    }
  }

  /**
   * unsubscribe user capture screen event
   * remove all if callback is null, otherwise remove the specialized callback
   */
  offUserCaptureScreen(callback) {
    try {
      window.getLastWindow(globalThis.abilityContext).then((data) => {
        this.windowClass = data
        console.info('[AdvancedAPI] Succeeded in obtaining the top window. Unsubscribe screenshot event.')
        try {
          if (callback) {
            if (this.captureCallback && this.captureCallback === callback) {
              this.windowClass.off('screenshot')
              this.captureCallback = null
            } else {
              console.info('[AdvancedAPI] Invalid callback.')
            }
          } else {
            this.windowClass.off('screenshot')
            this.captureCallback = null
          }
        } catch (exception) {
          console.error('[AdvancedAPI] Failed to unregister callback. Cause: ' + JSON.stringify(exception))
        }
      }).catch((err) => {
        console.error('[AdvancedAPI] Failed to obtain the top window. Cause: ' + JSON.stringify(err))
      })
    } catch (exception) {
      console.error('[AdvancedAPI] Failed to obtain the top window. Cause: ' + JSON.stringify(exception))
    }
  }
}
