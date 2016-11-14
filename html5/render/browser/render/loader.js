/* global XMLHttpRequest */

'use strict'

function loadByXHR (config, callback) {
  if (!config.source) {
    callback(new Error('xhr loader: missing config.source.'))
  }
  const xhr = new XMLHttpRequest()
  xhr.open('GET', config.source)
  xhr.onload = function () {
    callback(null, this.responseText)
  }
  xhr.onerror = function (error) {
    callback(error)
  }
  xhr.send()
}

function loadByJsonp (config, callback) {
  if (!config.source) {
    callback(new Error('jsonp loader: missing config.source.'))
  }
  const callbackName = config.jsonpCallback || 'weexJsonpCallback'
  window[callbackName] = function (code) {
    if (code) {
      callback(null, code)
    }
    else {
      callback(new Error('load by jsonp error'))
    }
  }
  const script = document.createElement('script')
  script.src = decodeURIComponent(config.source)
  script.type = 'text/javascript'
  document.body.appendChild(script)
}

function loadBySourceCode (config, callback) {
  // src is the jsbundle.
  // no need to fetch from anywhere.
  if (config.source) {
    callback(null, config.source)
  }
  else {
    callback(new Error('source code laoder: missing config.source.'))
  }
}

const callbackMap = {
  xhr: loadByXHR,
  jsonp: loadByJsonp,
  source: loadBySourceCode
}

export function load (options, callback) {
  const loadFn = callbackMap[options.loader]
  loadFn(options, callback)
}

export function registerLoader (name, loaderFunc) {
  if (typeof loaderFunc === 'function') {
    callbackMap[name] = loaderFunc
  }
}
