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

define('@weex-component/modal', function (require, exports, module) {

;
  module.exports = {
    data: function () {return {}},
    methods: {
      toast: function(msg, duration) {
        if (!msg || typeof msg !== 'string') {
          msg = 'I am Toast show!';
        }

        duration = duration || 2;
        this.$call('modal', 'toast', {
          'message': msg,
          'duration': duration
        });
      },
      alert: function(msg, okTitle, cancelTitle) {
        var self = this;
        if (!msg || typeof msg !== 'string') {
          msg = "I am Alert!";
        }
        this.$call('modal', 'alert', {
          'message': msg,
          'okTitle': okTitle,
          'cancelTitle': cancelTitle
        }, function() {
          self.toast("Click Alert OK Bnt!!");
        });
      },
      confirm: function(msg, okTitle, cancelTitle) {
        var self = this
        if (!msg || typeof msg !== 'string') {
          msg = "I am Confirm!";
        }

        okTitle = okTitle || "OK";
        cancelTitle = cancelTitle || "Cancel";
        this.$call('modal', 'confirm', {
          'message': msg,
          'okTitle': okTitle,
          'cancelTitle': cancelTitle
        }, function(result) {
          self.toast("Click Confirm  " + result);
        });
      },
      prompt: function() {
        var self = this;
        this.$call('modal', 'prompt', {
          'message': 'I am Prompt!',
          'okTitle': 'ok',
          'cancelTitle': 'cancel'
        }, function(result) {
          self.toast("Click Prompt  " + result);
        });
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
        "title": "Toast"
      },
      "children": [
        {
          "type": "ui-button",
          "attr": {
            "type": "primary",
            "click": function () {return this.toast},
            "value": "Toast"
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
          "type": "ui-button",
          "attr": {
            "type": "success",
            "click": function () {return this.alert},
            "value": "Alert"
          },
          "style": {
            "marginBottom": 20
          }
        },
        {
          "type": "ui-button",
          "attr": {
            "type": "primary",
            "click": function () {return this.confirm},
            "value": "Confirm"
          },
          "style": {
            "marginBottom": 20
          }
        },
        {
          "type": "ui-button",
          "attr": {
            "type": "warning",
            "click": function () {return this.prompt},
            "value": "Prompt"
          }
        }
      ]
    }
  ]
}

;})

// require module
bootstrap('@weex-component/modal', {"transformerVersion":"0.1.8"})