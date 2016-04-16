define('@weex-component/ui-button', function (require, exports, module) {

;
  module.exports = {
    data: function () {return {
      type: 'default',
      size: 'large',
      value: '',
      click: null,
      disabled: false
    }},
    methods: {
      clicked: function(ev) {
        if (this.disabled) return;
        this.click(ev);
      }
    }
  }


;module.exports.style = {
  "btn": {
    "marginBottom": 0,
    "alignItems": "center",
    "justifyContent": "center",
    "borderWidth": 1,
    "borderStyle": "solid",
    "borderColor": "#333333"
  },
  "btn-default": {
    "color": "rgb(51,51,51)"
  },
  "btn-primary": {
    "backgroundColor": "rgb(40,96,144)",
    "borderColor": "rgb(40,96,144)"
  },
  "btn-success": {
    "backgroundColor": "rgb(92,184,92)",
    "borderColor": "rgb(76,174,76)"
  },
  "btn-info": {
    "backgroundColor": "rgb(91,192,222)",
    "borderColor": "rgb(70,184,218)"
  },
  "btn-warning": {
    "backgroundColor": "rgb(240,173,78)",
    "borderColor": "rgb(238,162,54)"
  },
  "btn-danger": {
    "backgroundColor": "rgb(217,83,79)",
    "borderColor": "rgb(212,63,58)"
  },
  "btn-link": {
    "borderColor": "rgba(0,0,0,0)",
    "borderRadius": 0
  },
  "btn-txt-default": {
    "color": "rgb(51,51,51)"
  },
  "btn-txt-primary": {
    "color": "rgb(255,255,255)"
  },
  "btn-txt-success": {
    "color": "rgb(255,255,255)"
  },
  "btn-txt-info": {
    "color": "rgb(255,255,255)"
  },
  "btn-txt-warning": {
    "color": "rgb(255,255,255)"
  },
  "btn-txt-danger": {
    "color": "rgb(255,255,255)"
  },
  "btn-txt-link": {
    "color": "rgb(51,122,183)"
  },
  "btn-sz-large": {
    "width": 300,
    "height": 100,
    "paddingTop": 25,
    "paddingBottom": 25,
    "paddingLeft": 40,
    "paddingRight": 40,
    "borderRadius": 15
  },
  "btn-sz-middle": {
    "width": 240,
    "height": 80,
    "paddingTop": 15,
    "paddingBottom": 15,
    "paddingLeft": 30,
    "paddingRight": 30,
    "borderRadius": 10
  },
  "btn-sz-small": {
    "width": 170,
    "height": 60,
    "paddingTop": 12,
    "paddingBottom": 12,
    "paddingLeft": 25,
    "paddingRight": 25,
    "borderRadius": 7
  },
  "btn-txt-sz-large": {
    "fontSize": 45
  },
  "btn-txt-sz-middle": {
    "fontSize": 35
  },
  "btn-txt-sz-small": {
    "fontSize": 30
  }
}

;module.exports.template = {
  "type": "div",
  "classList": function () {return ['btn', 'btn-' + (this.type), 'btn-sz-' + (this.size)]},
  "events": {
    "click": "clicked"
  },
  "style": {},
  "children": [
    {
      "type": "text",
      "classList": function () {return ['btn-txt', 'btn-txt-' + (this.type), 'btn-txt-sz-' + (this.size)]},
      "attr": {
        "value": function () {return this.value}
      }
    }
  ]
}

;})

// module

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

// module

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

define('@weex-component/template', function (require, exports, module) {

;
  module.exports = {
    data: function () {return {
      img: '//img.alicdn.com/bao/uploaded/i4/TB1RDldGFXXXXXaXVXXXXXXXXXX_!!0-item_pic.jpg_400x400.jpg'
    }},
    methods: {
      toast: function() {
        this.$call('modal', 'toast', {'message': 'a toast', 'duration': 2});
      }
    }
  }


;module.exports.style = {}

;module.exports.template = {
  "type": "scroller",
  "children": [
    {
      "type": "ui-panel",
      "attr": {
        "title": "Image",
        "type": "primary"
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
        "title": "Dialog"
      },
      "children": [
        {
          "type": "ui-tip",
          "attr": {
            "type": "success",
            "value": "It's a weex example template."
          },
          "style": {
            "marginBottom": 20
          }
        },
        {
          "type": "ui-hn",
          "attr": {
            "level": "1",
            "value": "H1"
          }
        },
        {
          "type": "ui-button",
          "attr": {
            "type": "primary",
            "click": function () {return this.toast},
            "value": "Toast"
          }
        },
        {
          "type": "ui-hn",
          "attr": {
            "level": "2",
            "value": "H3"
          }
        },
        {
          "type": "ui-button",
          "attr": {
            "type": "warning",
            "click": function () {return this.toast},
            "value": "Toast"
          }
        }
      ]
    }
  ]
}

;})

// require module
bootstrap('@weex-component/template', {"transformerVersion":"0.1.8"})