define('@weex-component/repeat-index', function (require, exports, module) {

;
  module.exports = {
    data: function () {return {
      titlelist: [
        {title: 'Hello World1'},
        {title: 'Hello World2'}
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
      "repeat": function () {return this.titlelist},
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

bootstrap('@weex-component/repeat-index')
