'use strict'

const webview = {

  // ref: ref of the web component.
  goBack: function (ref) {
    const webComp = this.getComponentManager().getComponent(ref)
    if (!webComp.goBack) {
      console.error('error: the specified component has no method of'
          + ' goBack. Please make sure it is a webview component.')
      return
    }
    webComp.goBack()
  },

  // ref: ref of the web component.
  goForward: function (ref) {
    const webComp = this.getComponentManager().getComponent(ref)
    if (!webComp.goForward) {
      console.error('error: the specified component has no method of'
          + ' goForward. Please make sure it is a webview component.')
      return
    }
    webComp.goForward()
  },

  // ref: ref of the web component.
  reload: function (ref) {
    const webComp = this.getComponentManager().getComponent(ref)
    if (!webComp.reload) {
      console.error('error: the specified component has no method of'
          + ' reload. Please make sure it is a webview component.')
      return
    }
    webComp.reload()
  }

}

const meta = {
  webview: [{
    name: 'goBack',
    args: ['string']
  }, {
    name: 'goForward',
    args: ['string']
  }, {
    name: 'reload',
    args: ['string']
  }]
}

export default {
  init: function (Weex) {
    Weex.registerApiModule('webview', webview, meta)
  }
}
