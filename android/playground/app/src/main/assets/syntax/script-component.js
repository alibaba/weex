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

	;__weex_define__("@weex-component/8e6cff2d0487efb24411ddaeb27766c3", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	  __webpack_require__(32)
	  __weex_module__.exports = {
	    data: function () {return {
	      items: [
	        {title: 'A', url: 'a'},
	        {title: 'B', url: 'b'},
	        {title: 'C', url: 'c'}
	      ]
	    }}
	  }

	;__weex_module__.exports.template = __weex_module__.exports.template || {}
	;Object.assign(__weex_module__.exports.template, {
	  "type": "list",
	  "children": [
	    {
	      "type": "cell",
	      "append": "tree",
	      "repeat": {
	        "expression": function () {return this.items},
	        "value": "item"
	      },
	      "children": [
	        {
	          "type": "text",
	          "attr": {
	            "value": function () {return this.item.title}
	          }
	        },
	        {
	          "type": "sub",
	          "attr": {
	            "title": "a"
	          }
	        }
	      ]
	    }
	  ]
	})
	})
	;__weex_bootstrap__("@weex-component/8e6cff2d0487efb24411ddaeb27766c3", {
	  "transformerVersion": "0.3.1"
	},undefined)

/***/ },

/***/ 32:
/***/ function(module, exports) {

	;__weex_define__("@weex-component/sub", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	  __weex_module__.exports = {
	    data: function () {return {
	    title: ''
	    }}
	  }

	;__weex_module__.exports.template = __weex_module__.exports.template || {}
	;Object.assign(__weex_module__.exports.template, {
	  "type": "text",
	  "classList": [
	    "item-txt"
	  ],
	  "attr": {
	    "value": function () {return this.title}
	  }
	})
	;__weex_module__.exports.style = __weex_module__.exports.style || {}
	;Object.assign(__weex_module__.exports.style, {
	  "item-txt": {
	    "fontSize": 48,
	    "color": "#555555"
	  }
	})
	})

/***/ }

/******/ });