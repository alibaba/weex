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

	;__weex_define__("@weex-component/9f86da5d6b34376b9cac6c09a9b78cc2", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	  __webpack_require__(33)

	;__weex_module__.exports.template = __weex_module__.exports.template || {}
	;Object.assign(__weex_module__.exports.template, {
	  "type": "div",
	  "children": [
	    {
	      "type": "btn",
	      "children": [
	        {
	          "type": "text",
	          "attr": {
	            "value": "Click!"
	          }
	        }
	      ]
	    }
	  ]
	})
	})
	;__weex_bootstrap__("@weex-component/9f86da5d6b34376b9cac6c09a9b78cc2", {
	  "transformerVersion": "0.3.1"
	},undefined)

/***/ },

/***/ 33:
/***/ function(module, exports) {

	;__weex_define__("@weex-component/btn", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;__weex_module__.exports.template = __weex_module__.exports.template || {}
	;Object.assign(__weex_module__.exports.template, {
	  "type": "div",
	  "classList": [
	    "btn"
	  ],
	  "children": [
	    {
	      "type": "content"
	    }
	  ]
	})
	;__weex_module__.exports.style = __weex_module__.exports.style || {}
	;Object.assign(__weex_module__.exports.style, {
	  "btn": {
	    "fontSize": 36,
	    "textAlign": "center",
	    "color": "#FFFFFF",
	    "backgroundColor": "#808080",
	    "padding": 20,
	    "borderRadius": 5
	  }
	})
	})

/***/ }

/******/ });