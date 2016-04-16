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

// module

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

define('@weex-component/ui', function (require, exports, module) {

;
  module.exports = {
    data: function () {return {
      levels: [
        {level: 1},
        {level: 2},
        {level: 3}
      ],
      buttons: [
        {type: 'default'},
        {type: 'primary'},
        {type: 'success'},
        {type: 'info'},
        {type: 'warning'},
        {type: 'danger'},
        {type: 'link'}
      ],
      panels: [
        {type: 'default'},
        {type: 'primary'},
        {type: 'success'},
        {type: 'info'},
        {type: 'warning'},
        {type: 'danger'}
      ],
      tips: [
        {type: 'success'},
        {type: 'info'},
        {type: 'warning'},
        {type: 'danger'}
      ]
    }},
    methods: {
      clicked: function(ev) {
        console.log(ev);
        this.$call('modal', 'toast', {'message': 'clicked!', duration: 0.5});
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
  "type": "scroller",
  "classList": [
    "body"
  ],
  "children": [
    {
      "type": "ui-panel",
      "attr": {
        "title": "Title Levels"
      },
      "children": [
        {
          "type": "ui-hn",
          "repeat": function () {return this.levels},
          "attr": {
            "level": function () {return this.level},
            "value": function () {return 'H' + (this.level) + ', Level ' + (this.level)}
          }
        }
      ]
    },
    {
      "type": "ui-panel",
      "attr": {
        "title": "Buttons"
      },
      "append": "tree",
      "children": [
        {
          "type": "div",
          "style": {
            "flexDirection": "row",
            "marginTop": 12
          },
          "repeat": function () {return this.buttons},
          "children": [
            {
              "type": "ui-button",
              "attr": {
                "type": function () {return this.type},
                "size": "large",
                "value": function () {return this.type},
                "click": function () {return this.clicked}
              }
            },
            {
              "type": "ui-button",
              "attr": {
                "type": function () {return this.type},
                "size": "middle",
                "value": function () {return this.type},
                "click": function () {return this.clicked}
              },
              "style": {
                "marginLeft": 10
              }
            },
            {
              "type": "ui-button",
              "attr": {
                "type": function () {return this.type},
                "size": "small",
                "value": function () {return this.type},
                "click": function () {return this.clicked}
              },
              "style": {
                "marginLeft": 10
              }
            }
          ]
        },
        {
          "type": "div",
          "style": {
            "flexDirection": "row",
            "marginTop": 12
          },
          "children": [
            {
              "type": "ui-button",
              "attr": {
                "disabled": function () {return true},
                "type": "",
                "size": "large",
                "value": "Disabled",
                "click": function () {return this.clicked}
              }
            },
            {
              "type": "ui-button",
              "attr": {
                "disabled": function () {return false},
                "type": "primary",
                "size": "large",
                "value": "Enabled",
                "click": function () {return this.clicked}
              },
              "style": {
                "marginLeft": 12
              }
            }
          ]
        }
      ]
    },
    {
      "type": "ui-panel",
      "attr": {
        "title": "Panels"
      },
      "children": [
        {
          "type": "ui-panel",
          "repeat": function () {return this.panels},
          "attr": {
            "title": function () {return 'Panels-' + (this.type)},
            "type": function () {return this.type},
            "border": "1"
          },
          "style": {
            "marginLeft": 12,
            "marginRight": 12
          },
          "children": [
            {
              "type": "text",
              "attr": {
                "value": function () {return 'Panels ' + (this.type) + ' content. Panels ' + (this.type) + ' content. Panels ' + (this.type) + ' content.'}
              }
            }
          ]
        }
      ]
    },
    {
      "type": "ui-panel",
      "attr": {
        "title": "List"
      },
      "children": [
        {
          "type": "ui-list-item",
          "repeat": function () {return this.tips},
          "attr": {
            "click": function () {return this.clicked}
          },
          "children": [
            {
              "type": "text",
              "classList": [
                "item-txt"
              ],
              "attr": {
                "value": function () {return this.type}
              }
            }
          ]
        }
      ]
    },
    {
      "type": "ui-panel",
      "attr": {
        "title": "Tips"
      },
      "children": [
        {
          "type": "ui-tip",
          "repeat": function () {return this.tips},
          "style": {
            "marginBottom": 20
          },
          "attr": {
            "value": function () {return 'Panels ' + (this.type) + ' content. Panels ' + (this.type) + ' content. Panels ' + (this.type) + ' content.'}
          }
        }
      ]
    }
  ]
}

;})

// require module
bootstrap('@weex-component/ui', {"transformerVersion":"0.1.8"})