define('@weex-component/computed', function (require, exports, module) {

;
  module.exports = {
    data: function () {
      return {x: 1, y: 2}
    },
    computed: {
      n: function () {
        return this.x + this.y
      },
      m: {
        get: function () {
          return this.x + this.y
        },
        set: function (v) {
          this.y = v
        }
      }
    },
    methods: {
      foo: function () {
        this.m = 10
      }
    }
  }


;module.exports.template = {
  "type": "container",
  "events": {
    "click": "foo"
  },
  "children": [
    {
      "type": "text",
      "attr": {
        "value": function () {return this.n}
      }
    },
    {
      "type": "text",
      "attr": {
        "value": function () {return this.m}
      }
    }
  ]
}

;})

// require module

bootstrap('@weex-component/computed')
