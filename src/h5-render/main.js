/**
 * weexInit: init weex instance depending on the url params.
 * There are three ways to load weex bundles, depends on the
 * parameter 'loader' in the url:
 *
 *   + xhr:   use XMLHttpRequest. Parameter 'page' should be
 *   the bundle's url.
 *   + jsonp: use jsonp. Parameter 'page' should be the request
 *   url and jsonpCallback should be specified during calling
 *   weex.init.
 *   + source: use the transformed code itself. 'page' should
 *   be the transformed weex bundle.
 *
 * @param {String}  bundle  It has different meaning depends on
 *   the type of loader.
 */
function weexInit() {
  function getUrlParam (key) {
    var reg = new RegExp('[?|&]' + key + '=([^&]+)')
    var match = location.search.match(reg)
    return match && match[1]
  }

  var loader = getUrlParam('loader') || 'xhr'
  var page = getUrlParam('page')

  // jsonp callback name should be specified or be the default
  // value 'weexJsonpCallback' if the 'jsonp' loader is used.
  var JSONP_CALLBACK_NAME = 'weexJsonpCallback'

  window.weex.init({
    jsonpCallback: JSONP_CALLBACK_NAME,
    appId: location.href,
    source: page,
    loader: loader,
    rootId: 'weex'
  })
}

weexInit()
