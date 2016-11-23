
define('@weex-component/DepTargetFine', function(require, exports, module) {

  ;module.exports = {
    data: function () {return {
      lists: []
    }},
    created: function() {
      this.lists.$set(0, 'correct')
    }
  }


  ;module.exports.style = {}

  ;module.exports.template = {
	  "type": "div",
	  "children": [
	    {
	      "type": "text",
	      "attr": {
	        "value": function () { return this.lists[0] }
	      }
	    }
	  ]
  }

})

bootstrap('@weex-component/DepTargetFine', { "transformerVersion": "0.3.1" })
