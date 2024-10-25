/**
 * Copyright (c) Huawei Technologies Co., Ltd. 2023-2023. All rights reserved.
 * Description: advanced keyboard api
 * Create: 04/10/2023
 * Notes:
 */
import inputMethod from '@ohos.inputMethod'
import window from '@ohos.window'
import { DisplayBase } from '../../../base/bridge/displayBase'

// AS API class
export default class ASKeyboard {
  /**
   * constructor function, init callback map
   */
  constructor () {
    this.changeCallback = new Map()
  }

  /**
   * hide software keyboard
   * need system permission ohos.permission.CONNECT_IME_ABILITY
   */
  hideKeyboard() {
    return new Promise((resolve, reject) => {
      try {
        const inputMethodController = inputMethod.getController()
        inputMethodController.hideTextInput().then(() => {
          console.debug('[AdvancedAPI] Succeeded in hiding softKeyboard.')
          resolve()
        }).catch((err) => {
          console.error('[AdvancedAPI] Failed to hideSoftKeyboard: ' + JSON.stringify(err))
          reject()
        })
      } catch (exception) {
        console.error('[AdvancedAPI] Failed to get inputMethod Controller. Cause: ' + JSON.stringify(exception))
        reject()
      }
    })
  }

  /**
   * subscribe keyboard height change event
   * Callback
   * @obj params height {Number}: keyboard height
   */
  onKeyboardHeightChange(callback) {
    if (!callback) {
      console.error('[AdvancedAPI] params illegal, empty callback')
      return
    }

    try {
      window.getLastWindow(globalThis.abilityContext).then((data) => {
        this.windowClass = data
        const {
          densityPixels: devicePixelRatio,
        } = DisplayBase.ohosGetDisplay()

        const heightChangeCallback = function (data) {
          // ohos notify twice when keyboard popup
          callback({ height: Math.round(data / devicePixelRatio) })
        }
        if (!this.changeCallback.has(callback)) {
          this.changeCallback.set(callback, heightChangeCallback)
        }
        console.info('[AdvancedAPI] Succeeded in obtaining the top window. Listen to keyboard height change')
        try {
          this.windowClass.on('keyboardHeightChange', this.changeCallback.get(callback))
        } catch (exception) {
          console.error('[AdvancedAPI] Failed to enable the listener for keyboard height changes. Cause: ' + JSON.stringify(exception))
        }
      }).catch((err) => {
        console.error('[AdvancedAPI] Failed to obtain the top window. Cause: ' + JSON.stringify(err))
      })
    } catch (exception) {
      console.error('[AdvancedAPI] Failed to obtain the top window. Cause: ' + JSON.stringify(exception))
    }
  }

  /**
   * unsubscribe keyboard height change event
   * remove all if callback is null, otherwise remove the specialized callback
   */
  offKeyboardHeightChange(callback) {
    try {
      window.getLastWindow(globalThis.abilityContext).then((data) => {
        this.windowClass = data
        console.info('[AdvancedAPI] Succeeded in obtaining the top window. Unsubscribe keyboard change event.')
        try {
          if (callback) {
            if (this.changeCallback.has(callback)) {
              this.windowClass.off('keyboardHeightChange', this.changeCallback.get(callback))
              this.changeCallback.delete(callback)
            } else {
              console.info('[AdvancedAPI] Invalid callback.')
            }
          } else {
            this.windowClass.off('keyboardHeightChange')
            this.changeCallback.clear()
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
