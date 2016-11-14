define('@weex-component/reset-style', function (require, exports, module) {

;
  module.exports = {
	  data: function () {return {
	    className: 'highlight'
	  }},
    ready: function() {
      this.className = 'normal'
    }
  }


;module.exports.style = {
  "normal": {
    "fontSize": 40
  },
  "highlight": {
    "fontSize": 60,
    "color": "#FF0000"
  }
}

;module.exports.template = {
  "type": "container",
  "children": [
    {
      "type": "text",
      "classList": function () {return [this.className]},
      "attr": {
        "value": "Hello Weex"
      }
    }
  ]
}

;})


bootstrap('@weex-component/reset-style')
