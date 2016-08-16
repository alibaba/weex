'use strict'

import { transitionOnce } from './lib'

const _data = {}

const animation = {

  /**
   * transition
   * @param  {string} ref        [description]
   * @param  {obj} config     [description]
   * @param  {string} callbackId [description]
   */
  transition: function (ref, config, callbackId) {
    let refData = _data[ref]
    const stylesKey = JSON.stringify(config.styles)
    const weexInstance = this
    // If the same component perform a animation with exactly the same
    // styles in a sequence with so short interval that the prev animation
    // is still in playing, then the next animation should be ignored.
    if (refData && refData[stylesKey]) {
      return
    }
    if (!refData) {
      refData = _data[ref] = {}
    }
    refData[stylesKey] = true

    const component = this.getComponentManager().getComponent(ref)
    return transitionOnce(component, config, function () {
      // Remove the stylesKey in refData so that the same animation
      // can be played again after current animation is already finished.
      delete refData[stylesKey]
      weexInstance.sender.performCallback(callbackId)
    })
  }
}

const meta = {
  animation: [{
    name: 'transition',
    args: ['string', 'object', 'function']
  }]
}

export default {
  init: function (Weex) {
    Weex.registerApiModule('animation', animation, meta)
  }
}
