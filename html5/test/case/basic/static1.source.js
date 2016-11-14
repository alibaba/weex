define('@weex-component/static1', function (require, exports, module) {

;
  module.exports = {
    ready: function() {
	      this.x = 'world'
	    },
	    data: function () {return {
	      x: 'hello'
	    }}
  }


;module.exports.style = {
}

;module.exports.template = {
  "type": "div",
  "children": [
    {
      "type": "text",
      "attr": {
        "static": "",
        "value": function () {return this.x}
      }
    }
  ]
}

;})


bootstrap('@weex-component/static1')
