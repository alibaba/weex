define('@weex-component/timer', function (require, exports, module) {

;
  module.exports = {
    data: function () {
      return {
        x: 'foo'
      }
    },
    created: function () {
      setTimeout(function () {
        this.x = 'bar'
      }.bind(this), 1500)
    }
  }


;module.exports.template = {
  "type": "div",
  "children": [
    {
      "type": "text",
      "attr": {
        "value": function () {
          return this.x
        }
      }
    }
  ]
}

;})

// require module

bootstrap('@weex-component/timer')
