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
    "borderRadius": 10
  },
  "tip-txt": {
    "fontSize": 28
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
  "type": "div",
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

// module

define('@weex-component/ui-panel', function (require, exports, module) {

;
  module.exports = {
    data: function () {return {
      type: 'default',
      title: '',
      dataClass: '', // FIXME transfer class
      border: 0
    }},
    ready: function() {
      console.log(this.data);
    }
  }


;module.exports.style = {
  "panel": {
    "marginBottom": 20,
    "backgroundColor": "#ffffff",
    "borderColor": "#dddddd",
    "borderWidth": 1
  },
  "panel-primary": {
    "borderColor": "rgb(40,96,144)"
  },
  "panel-success": {
    "borderColor": "rgb(76,174,76)"
  },
  "panel-info": {
    "borderColor": "rgb(70,184,218)"
  },
  "panel-warning": {
    "borderColor": "rgb(238,162,54)"
  },
  "panel-danger": {
    "borderColor": "rgb(212,63,58)"
  },
  "panel-header": {
    "backgroundColor": "#f5f5f5",
    "fontSize": 40,
    "paddingLeft": 12,
    "paddingRight": 12,
    "paddingTop": 20,
    "paddingBottom": 20,
    "color": "#333333"
  },
  "panel-header-primary": {
    "backgroundColor": "rgb(40,96,144)",
    "color": "#ffffff"
  },
  "panel-header-success": {
    "backgroundColor": "rgb(92,184,92)",
    "color": "#ffffff"
  },
  "panel-header-info": {
    "backgroundColor": "rgb(91,192,222)",
    "color": "#ffffff"
  },
  "panel-header-warning": {
    "backgroundColor": "rgb(240,173,78)",
    "color": "#ffffff"
  },
  "panel-header-danger": {
    "backgroundColor": "rgb(217,83,79)",
    "color": "#ffffff"
  },
  "panel-body": {
    "paddingLeft": 12,
    "paddingRight": 12,
    "paddingTop": 20,
    "paddingBottom": 20
  }
}

;module.exports.template = {
  "type": "div",
  "classList": function () {return ['panel', 'panel-' + (this.type)]},
  "style": {
    "borderWidth": function () {return this.border}
  },
  "children": [
    {
      "type": "text",
      "classList": function () {return ['panel-header', 'panel-header-' + (this.type)]},
      "attr": {
        "value": function () {return this.title}
      }
    },
    {
      "type": "div",
      "classList": function () {return ['panel-body', 'panel-body-' + (this.type)]},
      "children": [
        {
          "type": "content"
        }
      ]
    }
  ]
}

;})

// module

define('@weex-component/imageDemo', function (require, exports, module) {

;
  module.exports = {
    data: function () {return {
      img: '//img.alicdn.com/bao/uploaded/i4/TB1RDldGFXXXXXaXVXXXXXXXXXX_!!0-item_pic.jpg_400x400.jpg'
    }}
  }


;module.exports.style = {
  "img": {
    "marginBottom": 20
  }
}

;module.exports.template = {
  "type": "scroller",
  "children": [
    {
      "type": "ui-panel",
      "attr": {
        "title": "width x height = 400 x 400"
      },
      "children": [
        {
          "type": "ui-tip",
          "attr": {
            "type": "warning",
            "value": "Weex screen width is 750"
          },
          "style": {
            "marginBottom": 20
          }
        },
        {
          "type": "image",
          "classList": [
            "img"
          ],
          "style": {
            "width": 400,
            "height": 400
          },
          "attr": {
            "src": function () {return this.img}
          }
        }
      ]
    },
    {
      "type": "ui-panel",
      "attr": {
        "title": "200 x 200"
      },
      "children": [
        {
          "type": "image",
          "classList": [
            "img"
          ],
          "style": {
            "width": 200,
            "height": 200
          },
          "attr": {
            "src": function () {return this.img}
          }
        }
      ]
    },
    {
      "type": "ui-panel",
      "attr": {
        "title": "100 x 100"
      },
      "children": [
        {
          "type": "image",
          "classList": [
            "img"
          ],
          "style": {
            "width": 100,
            "height": 100
          },
          "attr": {
            "src": function () {return this.img}
          }
        }
      ]
    }
  ]
}

;})

// require module
bootstrap('@weex-component/imageDemo', {"transformerVersion":"0.1.8"})