define('@weex-component/repeat-array-non-obj', function (require, exports, module) {

;
  module.exports = {
    data: function () {return {
      titlelist: [
        'Hello World1',
        'Hello World2'
      ]
    }}
  }


;module.exports.style = {
  "title": {
    "fontSize": 26,
    "color": "#FF0000"
  }
}

;module.exports.template = {
  "type": "container",
  "children": [
    {
      "type": "text",
      "repeat": {
        expression: function() { return this.titlelist },
        value: 'title'
      },
      "classList": [
        "title"
      ],
      "attr": {
        "value": function () {return this.$index + ': ' + this.title}
      }
    }
  ]
}

;})

// require module

bootstrap('@weex-component/repeat-array-non-obj')
