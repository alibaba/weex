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

	;__weex_define__("@weex-component/c2c42e5d11d3bb85baa693927b3f83d0", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	  var initMessage
	  __weex_module__.exports = {
	    data: function () {return {
	      list: ['Lifecycle List']
	    }},
	    init: function () {
	      initMessage = 'component init: nothing more happen even the data initialization'
	    },
	    created: function () {
	      this.list.push(initMessage)
	      this.list.push('component created: data init and observed')
	    },
	    ready: function () {
	      this.list.push('component ready: virtual dom generated')
	    }
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
	      "repeat": {
	        "expression": function () {return this.list},
	        "value": "value"
	      },
	      "attr": {
	        "value": function () {return this.value}
	      }
	    }
	  ]
	})
	;__weex_module__.exports.style = __weex_module__.exports.style || {}
	;Object.assign(__weex_module__.exports.style, {
	  "title": {
	    "fontSize": 48
	  }
	})
	})
	;__weex_bootstrap__("@weex-component/c2c42e5d11d3bb85baa693927b3f83d0", {
	  "transformerVersion": "0.3.1"
	},undefined)

/***/ }
/******/ ]);