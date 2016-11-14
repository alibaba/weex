define('@weex-component/dynamic-property', function (require, exports, module) {

  ;module.exports.style = {}

  ;module.exports = {
    data: function () {return {
      A: {},
      B: {},
      C: {
        message: 'initial'
      },
      D: {
        message: 'initial'
      }
    }},

    created: function() {
      this.B.message = 'created'
      this.C.message = 'created'
    },

    ready: function() {
      this.A.message = 'ready'
      this.B.message = 'ready'
      this.C.message = 'ready'
    }
  }

  ;module.exports.template = {
    "type": "div",
	  "children": [
	    {
	      "type": "text",
	      "attr": {
	        "value": function () {return 'A: ' + (this.A.message)}
	      }
	    },
	    {
	      "type": "text",
	      "attr": {
	        "value": function () {return 'B: ' + (this.B.message)}
	      }
	    },
	    {
	      "type": "text",
	      "attr": {
	        "value": function () {return 'C: ' + (this.C.message)}
	      }
	    },
	    {
	      "type": "text",
	      "attr": {
	        "value": function () {return 'D: ' + (this.D.message)}
	      }
	    }
	  ]
  }

;})

bootstrap('@weex-component/dynamic-property')
