
define('@weex-component/DepTargetError', function(require, exports, module) {

  ;module.exports = {
    data: function () {return {
      a: {}
    }}
  }


  ;module.exports.style = {}

  ;module.exports.template = {
	  "type": "div",
	  "children": [
	    {
	      "type": "text",
	      "attr": {
	        "value": function () { return this.a.x.y }
	      }
	    }
	  ]
  }

})

bootstrap('@weex-component/DepTargetError', { "transformerVersion": "0.3.1" })
