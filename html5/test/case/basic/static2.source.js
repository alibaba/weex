define('@weex-component/static2', function (require, exports, module) {

;
  module.exports = {
    ready: function() {
	      this.arr.$set(2, 3)
	  },
    data: function () {return {
      arr: [1, 2]
    }}
  }


;module.exports.style = {
}

;module.exports.template = {
  "type": "div",
  "attr": {
    "static": ""
  },
  "children": [
    {
      "type": "div",
      "repeat": {
        "expression": function () {return this.arr},
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

;})


bootstrap('@weex-component/static2')
