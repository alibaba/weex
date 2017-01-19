/* global lib, XMLHttpRequest */
/* deps: httpurl */

'use strict'

let utils

import 'httpurl'
import qs from 'query-string'

let jsonpCnt = 0
const ERROR_STATE = -1

function _jsonp (config, callback, progressCallback) {
  const cbName = 'jsonp_' + (++jsonpCnt)
  let url

  if (!config.url) {
    console.error('[h5-render] config.url should be set in _jsonp for \'fetch\' API.')
  }

  global[cbName] = (function (cb) {
    return function (response) {
      callback({
        status: 200,
        ok: true,
        statusText: 'OK',
        data: response
      })
      delete global[cb]
    }
  })(cbName)

  const script = document.createElement('script')
  try {
    url = lib.httpurl(config.url)
  }
  catch (err) {
    console.error('[h5-render] invalid config.url in _jsonp for \'fetch\' API: '
      + config.url)
  }
  url.params.callback = cbName
  script.type = 'text/javascript'
  script.src = url.toString()
  // script.onerror is not working on IE or safari.
  // but they are not considered here.
  script.onerror = (function (cb) {
    return function (err) {
      console.error('[h5-render] unexpected error in _jsonp for \'fetch\' API', err)
      callback({
        status: ERROR_STATE,
        ok: false,
        statusText: '',
        data: ''
      })
      delete global[cb]
    }
  })(cbName)
  const head = document.getElementsByTagName('head')[0]
  head.insertBefore(script, null)
}

function _xhr (config, callback, progressCallback) {
  const xhr = new XMLHttpRequest()
  xhr.responseType = config.type
  xhr.open(config.method, config.url, true)

  // cors cookie support
  if (config.withCredentials === true) {
    xhr.withCredentials = true
  }

  const headers = config.headers || {}
  for (const k in headers) {
    xhr.setRequestHeader(k, headers[k])
  }

  xhr.onload = function (res) {
    callback({
      status: xhr.status,
      ok: xhr.status >= 200 && xhr.status < 300,
      statusText: xhr.statusText,
      data: xhr.response,
      headers: xhr.getAllResponseHeaders().split('\n')
        .reduce(function (obj, headerStr) {
          const headerArr = headerStr.match(/(.+): (.+)/)
          if (headerArr) {
            obj[headerArr[1]] = headerArr[2]
          }
          return obj
        }, {})
    })
  }

  if (progressCallback) {
    xhr.onprogress = function (e) {
      progressCallback({
        readyState: xhr.readyState,
        status: xhr.status,
        length: e.loaded,
        total: e.total,
        statusText: xhr.statusText,
        headers: xhr.getAllResponseHeaders().split('\n')
          .reduce(function (obj, headerStr) {
            const headerArr = headerStr.match(/(.+): (.+)/)
            if (headerArr) {
              obj[headerArr[1]] = headerArr[2]
            }
            return obj
          }, {})
      })
    }
  }

  xhr.onerror = function (err) {
    console.error('[h5-render] unexpected error in _xhr for \'fetch\' API', err)
    callback({
      status: ERROR_STATE,
      ok: false,
      statusText: '',
      data: ''
    })
  }

  xhr.send(config.body)
}

const stream = {

  /**
   * sendHttp
   * @deprecated
   * Note: This API is deprecated. Please use stream.fetch instead.
   * send a http request through XHR.
   * @param  {obj} params
   *  - method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'PATCH',
   *  - url: url requested
   * @param  {string} callbackId
   */
  sendHttp: function (param, callbackId) {
    if (typeof param === 'string') {
      try {
        param = JSON.parse(param)
      }
      catch (e) {
        return
      }
    }
    if (typeof param !== 'object' || !param.url) {
      return console.error(
        '[h5-render] invalid config or invalid config.url for sendHttp API')
    }

    const sender = this.sender
    const method = param.method || 'GET'
    const xhr = new XMLHttpRequest()
    xhr.open(method, param.url, true)
    xhr.onload = function () {
      sender.performCallback(callbackId, this.responseText)
    }
    xhr.onerror = function (error) {
      return console.error('[h5-render] unexpected error in sendHttp API', error)
      // sender.performCallback(
      //   callbackId,
      //   new Error('unexpected error in sendHttp API')
      // )
    }
    xhr.send()
  },

  /**
   * fetch
   * use stream.fetch to request for a json file, a plain text file or
   * a arraybuffer for a file stream. (You can use Blob and FileReader
   * API implemented by most modern browsers to read a arraybuffer.)
   * @param  {object} options config options
   *   - method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'PATCH'
   *   - headers {obj}
   *   - url {string}
   *   - mode {string} 'cors' | 'no-cors' | 'same-origin' | 'navigate'
   *   - withCredentials {boolean}
   *   - body
   *   - type {string} 'json' | 'jsonp' | 'text'
   * @param  {string} callbackId
   * @param  {string} progressCallbackId
   */
  fetch: function (options, callbackId, progressCallbackId) {
    const DEFAULT_METHOD = 'GET'
    const DEFAULT_MODE = 'cors'
    const DEFAULT_TYPE = 'text'

    const methodOptions = ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'PATCH']
    const modeOptions = ['cors', 'no-cors', 'same-origin', 'navigate']
    const typeOptions = ['text', 'json', 'jsonp', 'arraybuffer']

    // const fallback = false  // fallback from 'fetch' API to XHR.
    const sender = this.sender

    const config = utils.extend({}, options)

    // validate options.method
    if (typeof config.method === 'undefined') {
      config.method = DEFAULT_METHOD
      console.warn('[h5-render] options.method for \'fetch\' API has been set to '
        + 'default value \'' + config.method + '\'')
    }
    else if (methodOptions.indexOf((config.method + '')
        .toUpperCase()) === -1) {
      return console.error('[h5-render] options.method \''
        + config.method
        + '\' for \'fetch\' API should be one of '
        + methodOptions + '.')
    }

    // validate options.url
    if (!config.url) {
      return console.error('[h5-render] options.url should be set for \'fetch\' API.')
    }

    // validate body content for method 'GET'.
    if (config.method.toUpperCase() === 'GET') {
      let body = config.body
      if (utils.isPlainObject(body)) {
        body = qs.stringify(body)
      }
      let url = config.url
      let hashIdx = url.indexOf('#')
      hashIdx <= -1 && (hashIdx = url.length)
      let hash = url.substr(hashIdx)
      hash && (hash = '#' + hash)
      url = url.substring(0, hashIdx)
      url += (config.url.indexOf('?') <= -1 ? '?' : '&') + body + hash
      config.url = url
    }

    // validate options.mode
    if (typeof config.mode === 'undefined') {
      config.mode = DEFAULT_MODE
    }
    else if (modeOptions.indexOf((config.mode + '').toLowerCase()) === -1) {
      return console.error('[h5-render] options.mode \''
        + config.mode
        + '\' for \'fetch\' API should be one of '
        + modeOptions + '.')
    }

    // validate options.type
    if (typeof config.type === 'undefined') {
      config.type = DEFAULT_TYPE
      console.warn('[h5-render] options.type for \'fetch\' API has been set to '
        + 'default value \'' + config.type + '\'.')
    }
    else if (typeOptions.indexOf((config.type + '').toLowerCase()) === -1) {
      return console.error('[h5-render] options.type \''
          + config.type
          + '\' for \'fetch\' API should be one of '
          + typeOptions + '.')
    }

    // validate options.headers
    config.headers = config.headers || {}
    if (!utils.isPlainObject(config.headers)) {
      return console.error('[h5-render] options.headers should be a plain object')
    }

    // validate options.timeout
    config.timeout = parseInt(config.timeout, 10) || 2500

    const _callArgs = [config, function (res) {
      sender.performCallback(callbackId, res)
    }]
    if (progressCallbackId) {
      _callArgs.push(function (res) {
        // Set 'keepAlive' to true for sending continuous callbacks
        sender.performCallback(progressCallbackId, res, true)
      })
    }

    if (config.type === 'jsonp') {
      _jsonp.apply(this, _callArgs)
    }
    else {
      _xhr.apply(this, _callArgs)
    }
  }

}

const meta = {
  stream: [{
    name: 'sendHttp',
    args: ['object', 'function']
  }, {
    name: 'fetch',
    args: ['object', 'function', 'function']
  }]
}

export default {
  init: function (Weex) {
    utils = Weex.utils
    Weex.registerApiModule('stream', stream, meta)
  }
}
