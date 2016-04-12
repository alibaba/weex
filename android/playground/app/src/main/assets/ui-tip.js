define('@weex-component/ui-tip', function (require, exports, module) {

;
  module.exports = {
    data: function () {return {
      type: 'success',
      value: ''
    }}
  }


;module.exports.style = {
  "tip": {
    "paddingLeft": 36,
    "paddingRight": 36,
    "paddingTop": 36,
    "paddingBottom": 36,
    "marginBottom": 20,
    "marginLeft": 20,
    "marginRight": 20,
    "marginTop": 20,
    "borderRadius": 10
  },
  "tip-success": {
    "backgroundColor": "#dff0d8",
    "borderColor": "#d6e9c6"
  },
  "tip-txt-success": {
    "color": "#3c763d"
  },
  "tip-info": {
    "backgroundColor": "#d9edf7",
    "borderColor": "#bce8f1"
  },
  "tip-txt-info": {
    "color": "#31708f"
  },
  "tip-warning": {
    "backgroundColor": "#fcf8e3",
    "borderColor": "#faebcc"
  },
  "tip-txt-warning": {
    "color": "#8a6d3b"
  },
  "tip-danger": {
    "backgroundColor": "#f2dede",
    "borderColor": "#ebccd1"
  },
  "tip-txt-danger": {
    "color": "#a94442"
  }
}

;module.exports.template = {
  "type": "container",
  "classList": function () {return ['tip', 'tip-' + (this.type)]},
  "children": [
    {
      "type": "text",
      "classList": function () {return ['tip-txt', 'tip-txt-' + (this.type)]},
      "attr": {
        "value": function () {return this.value}
      }
    }
  ]
}

;})

// require module
bootstrap('@weex-component/ui-tip', {"transformerVersion":"0.1.8"})