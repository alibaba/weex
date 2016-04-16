define('@weex-component/ui-list-item', function (require, exports, module) {

;
  module.exports = {
    data: function () {return {
      bgColor: '#ffffff',
      click: function() {
      }
    }},
    methods: {
      touchstart: function() {
        // TODO adaptive opposite bgColor
//        this.bgColor = '#e6e6e6';
      },
      touchend: function() {
//        this.bgColor = '#ffffff';
      }
    }
  }


;module.exports.style = {
  "item": {
    "paddingTop": 25,
    "paddingBottom": 25,
    "paddingLeft": 35,
    "paddingRight": 35,
    "height": 160,
    "justifyContent": "center",
    "borderBottomWidth": 1,
    "borderColor": "#dddddd"
  }
}

;module.exports.template = {
  "type": "div",
  "classList": [
    "item"
  ],
  "events": {
    "click": "click",
    "touchstart": "touchstart",
    "touchend": "touchend"
  },
  "style": {
    "backgroundColor": function () {return this.bgColor}
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