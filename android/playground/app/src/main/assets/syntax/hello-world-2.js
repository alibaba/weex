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

	var __weex_template__ = __webpack_require__(307)

	__weex_define__('@weex-component/25608f094c039b891a20c8161b9c650b', [], function(__weex_require__, __weex_exports__, __weex_module__) {

	    __weex_module__.exports.template = __weex_template__

	})

	__weex_bootstrap__('@weex-component/25608f094c039b891a20c8161b9c650b',undefined,undefined)

/***/ },

/***/ 307:
/***/ function(module, exports) {

	module.exports = {
	  "type": "div",
	  "style": {
	    "alignItems": "center",
	    "marginTop": 120
	  },
	  "children": [
	    {
	      "type": "image",
	      "attr": {
	        "src": "http://alibaba.github.io/weex/img/weex_logo_blue@3x.png"
	      },
	      "style": {
	        "width": 360,
	        "height": 82
	      }
	    },
	    {
	      "type": "text",
	      "style": {
	        "fontSize": 48
	      },
	      "attr": {
	        "value": "Hello World"
	      }
	    }
	  ]
	}

/***/ }

/******/ });