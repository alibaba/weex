define('@weex-component/if', function (require, exports, module) {

;
  module.exports = {
    data: function () {return {
      showTitle: true,
      title: 'Hello World'
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
      "shown": function () {return this.showTitle},
      "classList": [
        "title"
      ],
      "attr": {
        "value": function () {return this.title}
      }
    }
  ]
}

;})

// require module

bootstrap('@weex-component/if')