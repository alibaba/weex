const dom = require('./dom')
const event = require('./event')
const pageInfo = require('./pageInfo')
const stream = require('./stream')
const modal = require('./modal')
const animation = require('./animation')
const webview = require('./webview')
const timer = require('./timer')
const navigator = require('./navigator')

const api = {
  init: function (Weex) {
    Weex.registerApiModule('dom', dom, dom._meta)
    Weex.registerApiModule('event', event, event._meta)
    Weex.registerApiModule('pageInfo', pageInfo, pageInfo._meta)
    Weex.registerApiModule('stream', stream, stream._meta)
    Weex.registerApiModule('modal', modal, modal._meta)
    Weex.registerApiModule('animation', animation, animation._meta)
    Weex.registerApiModule('webview', webview, webview._meta)
    Weex.registerApiModule('timer', timer, timer._meta)
    Weex.registerApiModule('navigator', navigator, navigator._meta)
  }
}

module.exports = api
