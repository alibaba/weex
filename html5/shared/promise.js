// fix Promise Problem on JSContext of iOS7~8
// @see https://bugs.webkit.org/show_bug.cgi?id=135866
// global.Promise = null
require('core-js/modules/es6.object.to-string')
require('core-js/modules/es6.string.iterator')
require('core-js/modules/web.dom.iterable')
require('core-js/modules/es6.promise')
