define('@weex-component/click', function (require, exports, module) {

;
  module.exports = {
    methods: {
      gotoDetail: function () {
        this.$openURL('https://item.taobao.com/item.htm?id=520421163634')
      }
    }
  }


;module.exports.style = {
  "thumb": {
    "width": 200,
    "height": 200
  },
  "title": {
    "flex": 1,
    "color": "#ff0000",
    "fontSize": 48,
    "fontWeight": "bold",
    "backgroundColor": "#eeeeee"
  }
}

;module.exports.template = {
  "type": "container",
  "events": {
    "click": "gotoDetail"
  },
  "children": [
    {
      "type": "image",
      "classList": [
        "thumb"
      ],
      "attr": {
        "src": "https://gd2.alicdn.com/bao/uploaded/i2/T14H1LFwBcXXXXXXXX_!!0-item_pic.jpg"
      }
    },
    {
      "type": "text",
      "classList": [
        "title"
      ],
      "attr": {
        "value": "一个超赞的宝贝标题"
      }
    }
  ]
}

;})

// require module

bootstrap('@weex-component/click')