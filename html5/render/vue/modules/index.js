// modules from render/browesr
import Event from '../../browser/extend/api/event'
import Geolocation from '../../browser/extend/api/geolocation'
import PageInfo from '../../browser/extend/api/pageInfo'
import Storage from '../../browser/extend/api/storage'
import Stream from '../../browser/extend/api/stream'
import Clipboard from '../../browser/extend/api/clipboard'

// custom modules
import animation from './animation'
import dom from './dom'
import modal from './modal'
import navigator from './navigator'
import webview from './webview'

const modules = {
  animation,
  dom,
  modal,
  navigator,
  webview
}

export function requireWeexModule (name) {
  if (modules[name]) {
    return modules[name]
  }
  return null
}

export function init (weex) {
  weex.install(Event)
  weex.install(Geolocation)
  weex.install(PageInfo)
  weex.install(Storage)
  weex.install(Stream)
  weex.install(Clipboard)
}
