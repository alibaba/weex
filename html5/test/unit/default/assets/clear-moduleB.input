define('@weex-component/moduleB', function(require, exports, module) {

  ;module.exports = {
    data: {
      text: ''
    },
    created: function() {
      var smp = require('sample')
      this.text = smp ? smp.name : 'nothing'
    }
  }

  ;module.exports.style = {}

  ;module.exports.template = {
	  "type": "div",
	  "children": [
	    {
	      "type": "text",
	      "attr": {
	        "value": function() { return this.text }
	      }
	    }
	  ]
  }

})

// require module
bootstrap('@weex-component/moduleB', {
    "transformerVersion": "0.3.1"
})
