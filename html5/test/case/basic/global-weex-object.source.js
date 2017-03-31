weex.define('@weex-component/foo', function (require, exports, module) {
  module.exports = {
    data: function () {
      return {
        x: weex.config.env.appName
      }
    },
    template: {
      "type": "div",
      "attr": {
        "a": function () {
          return this.x
        }
      }
    }
  }
})

weex.bootstrap('@weex-component/foo')
