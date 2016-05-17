var dom = require('./dom')
var event = require('./event')
var pageInfo = require('./pageInfo')
var stream = require('./stream')
var modal = require('./modal')
var animation = require('./animation')
var webview = require('./webview')
var timer = require('./timer')

var api = {
  init: function (Weex) {
    Weex.registerApiModule('dom', dom, dom._meta)
    Weex.registerApiModule('event', event, event._meta)
    Weex.registerApiModule('pageInfo', pageInfo, pageInfo._meta)
    Weex.registerApiModule('stream', stream, stream._meta)
    Weex.registerApiModule('modal', modal, modal._meta)
    Weex.registerApiModule('animation', animation, animation._meta)
    Weex.registerApiModule('webview', webview, webview._meta)
    Weex.registerApiModule('timer', timer, timer._meta)
  }
}

module.exports = api