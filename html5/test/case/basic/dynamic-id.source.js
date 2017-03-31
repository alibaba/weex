define('@weex-component/id', function (require, exports, module) {

;
  module.exports = {
    ready: function () {
      if (this.$el('x')) {
        this.$el('x').setAttr('a', 1)
      }
      if (this.$el('y')) {
        this.$el('y').setAttr('a', 1)
      }
      if (this.$el('')) {
        this.$el('').setAttr('a', 1)
      }
      if (this.$el('0')) {
        this.$el('0').setAttr('a', 1)
      }
      if (this.$el(0)) {
        this.$el(0).setAttr('b', 1)
      }
    }
  }

;module.exports.template = {
  "type": "div",
  "children": [
    {
      "type": "text",
      "id": function () { return "x" },
      "attr": {
        "value": "Hello"
      }
    },
    {
      "type": "text",
      "id": function () { return 0 },
      "attr": {
        "value": "Hello"
      }
    },
    {
      "type": "text",
      "id": function () { return '' },
      "attr": {
        "value": "Hello"
      }
    },
    {
      "type": "text",
      "id": function () { return null },
      "attr": {
        "value": "Hello"
      }
    },
    {
      "type": "text",
      "id": function () { return NaN },
      "attr": {
        "value": "Hello"
      }
    },
    {
      "type": "text",
      "id": function () { return },
      "attr": {
        "value": "Hello"
      }
    }
  ]
}

;})

// require module

bootstrap('@weex-component/id')
