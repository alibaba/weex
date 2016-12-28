define('@weex-component/css-unit', function (require, exports, module) {
  module.exports.template = {
    "type": "div",
    "style": {
      "width": 50 * CSS_UNIT.VW
    }
  }
})

bootstrap('@weex-component/css-unit')
