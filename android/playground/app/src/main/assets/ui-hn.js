define('@weex-component/ui-hn', function (require, exports, module) {

;
  module.exports = {
    data: function () {return {
      level: 1,
      value: ''
    }},
    methods: {}
  }


;module.exports.style = {
  "h1": {
    "height": 110,
    "paddingTop": 20,
    "paddingBottom": 20
  },
  "h2": {
    "height": 110,
    "paddingTop": 20,
    "paddingBottom": 20
  },
  "h3": {
    "height": 110,
    "paddingTop": 20,
    "paddingBottom": 20
  },
  "txt-h1": {
    "fontSize": 70
  },
  "txt-h2": {
    "fontSize": 52
  },
  "txt-h3": {
    "fontSize": 42
  }
}

;module.exports.template = {
  "type": "div",
  "classList": function () {return ['h' + (this.level)]},
  "style": {
    "justifyContent": "center"
  },
  "children": [
    {
      "type": "text",
      "classList": function () {return ['txt-h' + (this.level)]},
      "attr": {
        "value": function () {return this.value}
      }
    }
  ]
}

;})

// require module
bootstrap('@weex-component/ui-hn', {"transformerVersion":"0.1.8"})