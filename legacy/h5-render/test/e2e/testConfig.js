var fs = require('fs')

var getDemoSource = function (name) {
  var source = fs.read('../../examples/build/' + name + '.js', 'utf8')
  return source.replace(/\\/g, '\\\\')
}

var examples = [
  'animation',
  // 'calculator',
  // 'common',
  'hello'
  // 'image-demo',
  // 'list-basic',
  // 'list-demo',
  // 'modal',
  // 'text-demo',
  // 'video-demo'
]

var config = {
  source: {},
  timeout: 5000
}

; (function initConfig() {

  var name
  for (var i = 0, l = examples.length; i < l; i++) {
    name = examples[i]

    config.source[name] = getDemoSource(name)
  }

})()

config.url = './test/e2e/index.html'

module.exports = config