
define('@weex-component/moduleA', function(require, exports, module) {

  define('sample', function(require, exports, module) {
    module.exports = { name: 'sample' }
  })

  ;module.exports = {
    data: {
      text: ''
    },
    methods: {
      update: function() {
        var outer = require('sample')
        this.text = outer ? outer.name : 'nothing'
      }
    }
  }


  ;module.exports.style = {}

  ;module.exports.template = {
	  "type": "div",
	  "children": [
	    {
	      "type": "text",
    	  "events": {
    	    "click": "update"
    	  },
	      "attr": {
	        "value": function() { return this.text }
	      }
	    }
	  ]
  }

})

// require module
bootstrap('@weex-component/moduleA', {
    "transformerVersion": "0.3.1"
})
