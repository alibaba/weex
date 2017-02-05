define('@weex-component/foo2', function (require, exports, module) {

;
  module.exports = {
    data: function () {
      return {
        x: 1
      }
    }
  }


;module.exports.style = {
  "a": {
    "fontSize": 12
  }
}

;module.exports.template = {
  "type": "container",
  "attr": {
    "a": "1",
    "b": function () {return this.x}
  },
  "classList": [
    "a"
  ]
}

;})

// require module

bootstrap('@weex-component/foo2')