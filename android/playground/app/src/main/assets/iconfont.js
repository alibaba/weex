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

	;__weex_define__("@weex-component/98a81994760c2c511a86f5736aa81f2d", [], function(__weex_require__, exports, __weex_module__){

	;
	  __weex_module__.exports = {
	    created: function() {
	      var domModule = __weex_require__('@weex-module/dom');
	      domModule.addRule('font-face', {
	        'font-family': "iconfont",
	        // 'src' : "url('iconfont.ttf')"
	        'src': "url('http://at.alicdn.com/t/font_1468842683_3772445.ttf')"
	      });
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
	      "attr": {
	        "value": ""
	      }
	    }
	  ]
	})
	;__weex_module__.exports.style = __weex_module__.exports.style || {}
	;Object.assign(__weex_module__.exports.style, {
	  "title": {
	    "color": "#FF0000",
	    "fontSize": 36,
	    "fontFamily": "iconfont"
	  }
	})
	})
	;__weex_bootstrap__("@weex-component/98a81994760c2c511a86f5736aa81f2d", {
	  "transformerVersion": "0.3.1"
	},undefined)

/***/ }
/******/ ]);