'use strict'

const metaModule = {

  /**
   * setViewport
   * @param {object} config
   *        - width: number | 'device-width'
   */
  setViewport: function (config) {
    document.querySelector('meta[name=viewport]').setAttribute('content', `width=${config.width}, user-scalable=no`)
  }
}

const meta = {
  meta: [{
    name: 'setViewport',
    args: ['object']
  }]
}

export default {
  init: function (Weex) {
    Weex.registerApiModule('meta', metaModule, meta)
  }
}
