/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	;__weex_define__("@weex-component/98f0ba054d59c6ae00ee62ea4b6ca552", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	  __weex_module__.exports = {
	    data: function () {return {
	      normal: 'x',
	      list: [
	        'a',
	        'b',
	        'c',
	        'd',
	        'e'
	      ],
	      list2: [
	        {text: 'a'},
	        {text: 'b'},
	        {text: 'c'},
	        {text: 'd'},
	        {text: 'e'}
	      ]
	    }}
	  }

	;__weex_module__.exports.template = __weex_module__.exports.template || {}
	;Object.assign(__weex_module__.exports.template, {
	  "type": "div",
	  "children": [
	    {
	      "type": "text",
	      "classList": [
	        "title"
	      ],
	      "attr": {
	        "value": "Basic"
	      }
	    },
	    {
	      "type": "text",
	      "classList": [
	        "subtitle"
	      ],
	      "repeat": function () {return this.list2},
	      "attr": {
	        "value": function () {return (this.$index) + '-' + (this.text) + '-' + (this.normal)}
	      }
	    },
	    {
	      "type": "text",
	      "classList": [
	        "title"
	      ],
	      "attr": {
	        "value": "Basic"
	      }
	    },
	    {
	      "type": "text",
	      "classList": [
	        "subtitle"
	      ],
	      "repeat": function () {return this.list2},
	      "attr": {
	        "value": function () {return (this.$index) + '-' + (this.text) + '-' + (this.normal)}
	      }
	    },
	    {
	      "type": "text",
	      "classList": [
	        "title"
	      ],
	      "attr": {
	        "value": "Custom item"
	      }
	    },
	    {
	      "type": "text",
	      "classList": [
	        "subtitle"
	      ],
	      "repeat": {
	        "expression": function () {return this.list},
	        "value": "item"
	      },
	      "attr": {
	        "value": function () {return (this.$index) + '-' + (this.item) + '-' + (this.normal)}
	      }
	    },
	    {
	      "type": "text",
	      "classList": [
	        "title"
	      ],
	      "attr": {
	        "value": "Custom item"
	      }
	    },
	    {
	      "type": "text",
	      "classList": [
	        "subtitle"
	      ],
	      "repeat": {
	        "expression": function () {return this.list},
	        "value": "item"
	      },
	      "attr": {
	        "value": function () {return (this.$index) + '-' + (this.item) + '-' + (this.normal)}
	      }
	    },
	    {
	      "type": "text",
	      "classList": [
	        "title"
	      ],
	      "attr": {
	        "value": "Custom key and item"
	      }
	    },
	    {
	      "type": "text",
	      "classList": [
	        "subtitle"
	      ],
	      "repeat": {
	        "expression": function () {return this.list},
	        "key": "i",
	        "value": "v"
	      },
	      "attr": {
	        "value": function () {return (this.i) + '-' + (this.v) + '-' + (this.normal)}
	      }
	    },
	    {
	      "type": "text",
	      "classList": [
	        "title"
	      ],
	      "attr": {
	        "value": "Custom key and item"
	      }
	    },
	    {
	      "type": "text",
	      "classList": [
	        "subtitle"
	      ],
	      "repeat": {
	        "expression": function () {return this.list},
	        "key": "i",
	        "value": "v"
	      },
	      "attr": {
	        "value": function () {return (this.i) + '-' + (this.v) + '-' + (this.normal)}
	      }
	    },
	    {
	      "type": "text",
	      "classList": [
	        "title"
	      ],
	      "attr": {
	        "value": "Array of Object"
	      }
	    },
	    {
	      "type": "text",
	      "classList": [
	        "subtitle"
	      ],
	      "repeat": {
	        "expression": function () {return this.list2},
	        "value": "item"
	      },
	      "attr": {
	        "value": function () {return (this.$index) + '-' + (this.item.text) + '-' + (this.normal)}
	      }
	    }
	  ]
	})
	;__weex_module__.exports.style = __weex_module__.exports.style || {}
	;Object.assign(__weex_module__.exports.style, {
	  "title": {
	    "fontSize": 48
	  },
	  "subtitle": {
	    "fontSize": 36
	  }
	})
	})
	;__weex_bootstrap__("@weex-component/98f0ba054d59c6ae00ee62ea4b6ca552", {
	  "transformerVersion": "0.3.1"
	},undefined)

/***/ }
/******/ ]);