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
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	var __weex_template__ = __webpack_require__(356)
	var __weex_style__ = __webpack_require__(357)
	var __weex_script__ = __webpack_require__(358)

	__weex_define__('@weex-component/19638a010faa9c01b41851f36c4157df', [], function(__weex_require__, __weex_exports__, __weex_module__) {

	    __weex_script__(__weex_module__, __weex_exports__, __weex_require__)
	    if (__weex_exports__.__esModule && __weex_exports__.default) {
	      __weex_module__.exports = __weex_exports__.default
	    }

	    __weex_module__.exports.template = __weex_template__

	    __weex_module__.exports.style = __weex_style__

	})

	__weex_bootstrap__('@weex-component/19638a010faa9c01b41851f36c4157df',undefined,undefined)

/***/ },

/***/ 356:
/***/ function(module, exports) {

	module.exports = {
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
	}

/***/ },

/***/ 357:
/***/ function(module, exports) {

	module.exports = {
	  "title": {
	    "fontSize": 48
	  },
	  "subtitle": {
	    "fontSize": 36
	  }
	}

/***/ },

/***/ 358:
/***/ function(module, exports) {

	module.exports = function(module, exports, __weex_require__){'use strict';

	module.exports = {
	  data: function () {return {
	    normal: 'x',
	    list: ['a', 'b', 'c', 'd', 'e'],
	    list2: [{ text: 'a' }, { text: 'b' }, { text: 'c' }, { text: 'd' }, { text: 'e' }]
	  }}
	};}
	/* generated by weex-loader */


/***/ }

/******/ });