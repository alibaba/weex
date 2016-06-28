define('@weex-component/test', function (require, exports, module) {

;
module.exports = {
    data: function () {return {
        text: 'Hello World1'
    }},
    methods: {
        clicked: function(text, e) {
            this.text = text
        }
    }
}


;module.exports.style = {}

;module.exports.template = {
  "type": "div",
  "children": [
    {
      "type": "text",
      "events": {
        "click": function ($event) {this.clicked('Hello World2', $event)}
      },
      "attr": {
        "value": function () {return this.text}
      }
    }
  ]
}

;})

// require module
bootstrap('@weex-component/test', {"transformerVersion":"0.3.0"})