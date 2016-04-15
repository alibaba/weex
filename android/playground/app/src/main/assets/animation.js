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
  "type": "container",
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

define('@weex-component/ui-panel', function (require, exports, module) {

;
  module.exports = {
    data: function () {return {
      type: 'default',
      title: '',
      border: 0
    }}
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
  "type": "container",
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

define('@weex-component/animation', function (require, exports, module) {

;
  module.exports = {
    data: function () {return {
      transformOrigin: 'center center',
      current_rotate: 0,
      current_scale: 1,
      current_color: '#FF0000',
      current_opacity: 1,
      current_translate: '',
      current_transform: '',
      isStop: true
    }},
    methods: {
      anim: function(styles, timingFunction, duration, callback) {
        this.$call('animation', 'transition', this._ids.block.el.ref, {
          styles: styles,
          timingFunction: timingFunction,
          duration: duration
        }, callback);
      },
      rotate: function() {
        var self = this;
        self.current_rotate += 90;
        self.anim({
          transform: 'rotate(' + self.current_rotate + 'deg)'
        }, 'ease-in-out', 500, function() {
          if (self.current_rotate === 360) {
            self.current_rotate = 0;
          }
          else {
            self.rotate();
          }
        });
      },
      translate: function() {
        this.current_translate = this.current_translate ? '' : 'translate(50%, 50%)';
        this.anim({
          transform: this.current_translate
        }, 'ease-in', 500, function() {
        });
      },
      scale: function() {
        var self = this;
        self.current_scale = self.current_scale === 2 ? .5 : 2
        self.anim({
          transform: 'scale(' + self.current_scale + ')'
        }, 'linear', 500, function() {
        });
      },
      transform: function() {
        var self = this;
        this.current_transform = this.current_transform ? '' : 'rotate(45deg) scale(1.5)';
        this.anim({
          transform: this.current_transform,
          transformOrigin: 'left top'
        }, 'ease-out', 500, function() {
          if (self.current_transform !== '') {
            self.anim({
              transform: 'rotate(-90deg) scale(1.2)',
              transformOrigin: 'left top'
            }, 'ease-out', 500, function() {
            })
          }
          else {

          }
        });
      },
      composite: function() {
        var self = this;
        self.current_transform = self.current_transform ? '' : 'rotate(45deg) scale(1.5) translate(50%, 50%)';
        self.current_color = self.current_color === '#F0AD4E' ? '#D9534F' : '#F0AD4E';
        self.current_opacity = self.current_opacity === 1 ? 0.1 : 1;
        this.anim({
          transform: this.current_transform,
          transformOrigin: 'left top',
          backgroundColor: self.current_color,
          opacity: self.current_opacity
        }, 'ease-out', 1000, function() {
        });
      },
      color: function() {
        var self = this;
        self.current_color = self.current_color === '#F0AD4E' ? '#D9534F' : '#F0AD4E';
        self.anim({
          backgroundColor: self.current_color
        }, 'linear', 500, function() {
        });
      },
      opacity: function() {
        var self = this;
        self.current_opacity = self.current_opacity === 1 ? 0.1 : 1;
        self.anim({
          opacity: self.current_opacity
        }, 'linear', 500, function() {
        });
      }
    }
  };


;module.exports.style = {
  "block": {
    "position": "absolute",
    "width": 250,
    "height": 250,
    "top": 300,
    "left": 400,
    "backgroundColor": "#F0AD4E",
    "alignItems": "center",
    "justifyContent": "center"
  },
  "block-txt": {
    "color": "#FFFFFF",
    "fontSize": 70
  }
}

;module.exports.template = {
  "type": "div",
  "classList": [
    "container"
  ],
  "children": [
    {
      "type": "ui-panel",
      "attr": {
        "title": "Transform"
      },
      "children": [
        {
          "type": "ui-button",
          "attr": {
            "value": "Rotate",
            "click": function () {return this.rotate},
            "type": "primary",
            "size": "middle"
          }
        },
        {
          "type": "ui-button",
          "attr": {
            "value": "Scale",
            "click": function () {return this.scale},
            "type": "primary",
            "size": "middle"
          },
          "style": {
            "marginTop": 12
          }
        },
        {
          "type": "ui-button",
          "attr": {
            "value": "Translate",
            "click": function () {return this.translate},
            "type": "primary",
            "size": "middle"
          },
          "style": {
            "marginTop": 12
          }
        },
        {
          "type": "ui-button",
          "attr": {
            "value": "Transform",
            "click": function () {return this.transform},
            "type": "success",
            "size": "middle"
          },
          "style": {
            "marginTop": 12
          }
        }
      ]
    },
    {
      "type": "ui-panel",
      "attr": {
        "title": "Others"
      },
      "children": [
        {
          "type": "ui-button",
          "attr": {
            "value": "BgColor",
            "click": function () {return this.color},
            "type": "primary",
            "size": "middle"
          }
        },
        {
          "type": "ui-button",
          "attr": {
            "value": "Opacity",
            "click": function () {return this.opacity},
            "type": "primary",
            "size": "middle"
          },
          "style": {
            "marginTop": 12
          }
        },
        {
          "type": "ui-button",
          "attr": {
            "value": "All",
            "click": function () {return this.composite},
            "type": "success",
            "size": "middle"
          },
          "style": {
            "marginTop": 12
          }
        }
      ]
    },
    {
      "type": "div",
      "id": "block",
      "classList": [
        "block"
      ],
      "style": {
        "transformOrigin": function () {return this.transformOrigin}
      },
      "children": [
        {
          "type": "text",
          "classList": [
            "block-txt"
          ],
          "attr": {
            "value": "Anim"
          }
        }
      ]
    }
  ]
}

;})

// require module
bootstrap('@weex-component/animation', {"transformerVersion":"0.1.8"})