define('@weex-component/foo5', function (require, exports, module) {

;

;module.exports.style = {
  "title": {
    "color": "#ff0000",
    "fontSize": 48,
    "fontWeight": "bold"
  }
}

;module.exports.template = {
  "type": "container",
  "children": [
    {
      "type": "text",
      "classList": [
        "title"
      ],
      "attr": {
        "value": "Hello World"
      }
    }
  ]
}

;})

// require module

bootstrap('@weex-component/foo5')