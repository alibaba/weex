function otherNameFunction () {
  var module = {}
  var exports = {}
  module.exports = exports

  ;module.exports.style = {}

  ;module.exports.template = {
    "type": "container",
    "children": [
      {
        "type": "text",
        "attr": {
          "value": function () {return this.outerData.a}
        }
      },
      {
        "type": "text",
        "attr": {
          "value": function () {return this.outerData.b}
        }
      }
    ]
  }

  ;module.exports.created = function() {
    this.outerData.a = 'aa'
  }

  ;module.exports.ready = function() {
    this.outerData.b = 'bb'
  }

  return module.exports
}

// module

define('@weex-component/subvm', function (require, exports, module) {

;
  module.exports = {
    "components": {
      innertpl: otherNameFunction()
    },
    data: function () {return {
      item: {a: 'a', b: 'b'},
      className: 'fromOuter',
      marginTop: 10
    }}
  }


;module.exports.style = {}

;module.exports.template = {
  "type": "container",
  "children": [
    {
      "type": "innertpl",
      "classList": function() {
        return this.className
      },
      "style": {
        marginTop: function() {
          return this.marginTop
        }
      },
      "events": {
          "click": "clicked"
      },
      "attr": {
        "outerData": function () {return this.item}
      }
    }
  ]
}

;})

// require module

bootstrap('@weex-component/subvm')
