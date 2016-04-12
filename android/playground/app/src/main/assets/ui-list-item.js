define('@weex-component/ui-list-item', function (require, exports, module) {

;
  module.exports = {
    data: function () {return {
    }}
  }


;module.exports.style = {
  "item": {
    "paddingTop": 25,
    "paddingBottom": 25,
    "paddingLeft": 35,
    "paddingRight": 35,
    "height": 160,
    "justifyContent": "center",
    "backgroundColor": "#ffffff",
    "marginBottom": 1,
    "borderBottomWidth": 1,
    "borderColor": "#dddddd"
  }
}

;module.exports.template = {
  "type": "container",
  "classList": [
    "item"
  ],
  "events": {
    "click": "click"
  },
  "children": [
    {
      "type": "content"
    }
  ]
}

;})

// require module
bootstrap('@weex-component/ui-list-item', {"transformerVersion":"0.1.8"})