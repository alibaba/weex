import dom from './dom'
import event from './event'
import pageInfo from './pageInfo'
import stream from './stream'
import modal from './modal'
import animation from './animation'
import webview from './webview'
// import timer from './timer'
import navigator from './navigator'
import storage from './storage'
import clipboard from './clipboard'

export default {
  init: function (Weex) {
    Weex.install(dom)
    Weex.install(event)
    Weex.install(pageInfo)
    Weex.install(stream)
    Weex.install(modal)
    Weex.install(animation)
    Weex.install(webview)
    // Weex.install(timer)
    Weex.install(navigator)
    Weex.install(storage)
    Weex.install(clipboard)
  }
}
