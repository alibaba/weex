define('@weex-component/dynamic-type', function (require, exports, module) {

;
  module.exports = {
    data: function () {return {
      type: 'text'
    }}
  }

;module.exports.template = {
  "type": "container",
  "children": [
    {
      "type": function () {return this.type},
      "style": {
        "width": 200,
        "height": 200
      }
    }
  ]
}

;})

// require module

bootstrap('@weex-component/dynamic-type')
