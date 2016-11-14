something = 'whatever'

define('@weex-component/global-variable1', function (require, exports, module) {

  module.exports.template = { "type": "container" }

  module.exports.style = {}

  module.exports = {
    ready: function () {
      console.log('I an ready')
    }
  }

})

bootstrap('@weex-component/global-variable1')
