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

// module

define('@weex-component/indexItem', function (require, exports, module) {

;
  module.exports = {
    data: function () {return {
      title: '',
      url: ''
    }},
    methods: {
      redirect: function() {
        this.$openURL(this.url);
      }
    }
  }


;module.exports.style = {
  "item-txt": {
    "fontSize": 48,
    "color": "#555555"
  }
}

;module.exports.template = {
  "type": "ui-list-item",
  "attr": {
    "click": function () {return this.redirect}
  },
  "children": [
    {
      "type": "text",
      "classList": [
        "item-txt"
      ],
      "attr": {
        "value": function () {return this.title}
      }
    }
  ]
}

;})

// require module
bootstrap('@weex-component/indexItem', {"transformerVersion":"0.1.8"})