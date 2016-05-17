'use strict'

var sender = require('../bridge/sender')

var webview = {

  // ref: ref of the web component.
  goBack: function (ref) {
    var webComp = this.getComponentManager().getElementByRef(ref)
    if (!webComp.goBack) {
      console.error('error: the specified component has no method of'
          + ' goBack. Please make sure it is a webview component.')
      return
    }
    webComp.goBack()
  },

  // ref: ref of the web component.
  goForward: function (ref) {
    var webComp = this.getComponentManager().getElementByRef(ref)
    if (!webComp.goForward) {
      console.error('error: the specified component has no method of'
          + ' goForward. Please make sure it is a webview component.')
      return
    }
    webComp.goForward()
  },

  // ref: ref of the web component.
  reload: function (ref) {
    var webComp = this.getComponentManager().getElementByRef(ref)
    if (!webComp.reload) {
      console.error('error: the specified component has no method of'
          + ' reload. Please make sure it is a webview component.')
      return
    }
    webComp.reload()
  }

}

webview._meta = {
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

module.exports = webview
