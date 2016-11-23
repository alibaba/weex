function otherNameFunction () {
  var module = {}
  var exports = {}
  module.exports = exports

  ;module.exports.style = {}

  ;module.exports.template = {
    "type": "div",
	  "children": [
	    {
	      "type": "div",
	      "repeat": {
	        "expression": function () {return this.outer},
	        "value": "x"
	      },
	      "children": [
	        {
	          "type": "text",
	          "attr": {
	            "value": function () {return this.x}
	          }
	        }
	      ]
	    }
	  ]
  }

  ;module.exports.data = function() {return {
    outer: null
  }}

  return module.exports
}

// module

define('@weex-component/static4', function (require, exports, module) {

;
  module.exports = {
    "components": {
      innertpl: otherNameFunction()
    },
    ready: function() {
      this.arr.$set(2, 3)
    },
    data: function () {return {
      arr: [1, 2]
    }}
  }


;module.exports.style = {}

;module.exports.template = {
  "type": "div",
  "attr": {
    "static": ""
  },
  "children": [
    {
      "type": "innertpl",
      "attr": {
        "outer": function () {return this.arr}
      }
    }
  ]
}

;})

// require module

bootstrap('@weex-component/static4')
