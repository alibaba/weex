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

	;__weex_define__("@weex-component/0e247947163c03c5256694e47a931372", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	  __weex_module__.exports = {
	    data: function () {return {
	      size: 32,
	      color: '#ff0000'
	    }},
	    methods: {
	      update: function (e) {
	        this.size = 48
	      }
	    }
	  }

	;__weex_module__.exports.template = __weex_module__.exports.template || {}
	;Object.assign(__weex_module__.exports.template, {
	  "type": "div",
	  "events": {
	    "click": "update"
	  },
	  "children": [
	    {
	      "type": "text",
	      "style": {
	        "fontSize": 48,
	        "color": "#0000ff"
	      },
	      "attr": {
	        "value": "Hello"
	      }
	    },
	    {
	      "type": "text",
	      "style": {
	        "fontSize": function () {return this.size},
	        "color": function () {return this.color}
	      },
	      "attr": {
	        "value": "Hello"
	      }
	    }
	  ]
	})
	})
	;__weex_bootstrap__("@weex-component/0e247947163c03c5256694e47a931372", {
	  "transformerVersion": "0.3.1"
	},undefined)

/***/ }
/******/ ]);