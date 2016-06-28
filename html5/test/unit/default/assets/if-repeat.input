define('@weex-component/if-repeat', function (require, exports, module) {

;
  module.exports = {
    data: function () {return {
      titlelist: [
        {showTitle: true, title: 'Hello World1'},
        {showTitle: false, title: 'Hello World2'}
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

bootstrap('@weex-component/if-repeat')