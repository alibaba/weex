define('@weex-component/global-variable2', function (require, exports, module) {

  module.exports.template = { "type": "container" }

  module.exports.style = {}

  module.exports = {
    ready: function () {
      abc = 'abc'
    }
  }

})

bootstrap('@weex-component/global-variable2')
