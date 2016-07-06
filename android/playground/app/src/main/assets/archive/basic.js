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

	;__weex_define__("@weex-component/4aae7a2d34f83b02b5a76d89afe889ae", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;__weex_module__.exports.template = __weex_module__.exports.template || {}
	;Object.assign(__weex_module__.exports.template, {
	  "type": "div",
	  "classList": [
	    "container"
	  ],
	  "children": [
	    {
	      "type": "div",
	      "classList": [
	        "logoContainer"
	      ],
	      "children": [
	        {
	          "type": "image",
	          "classList": [
	            "logo"
	          ],
	          "attr": {
	            "src": "http://t.cn/Rq9bcDm"
	          }
	        },
	        {
	          "type": "text",
	          "classList": [
	            "desc"
	          ],
	          "attr": {
	            "value": "A framework for building Mobile cross-platform UI"
	          }
	        }
	      ]
	    },
	    {
	      "type": "div",
	      "classList": [
	        "textContainer"
	      ],
	      "children": [
	        {
	          "type": "text",
	          "classList": [
	            "text"
	          ],
	          "attr": {
	            "value": "Hello weex"
	          }
	        }
	      ]
	    }
	  ]
	})
	;__weex_module__.exports.style = __weex_module__.exports.style || {}
	;Object.assign(__weex_module__.exports.style, {
	  "logoContainer": {
	    "width": 750,
	    "height": 500,
	    "alignItems": "center",
	    "justifyContent": "center",
	    "backgroundColor": "#0054DC"
	  },
	  "logo": {
	    "width": 378,
	    "height": 84
	  },
	  "desc": {
	    "marginTop": 40,
	    "fontSize": 24,
	    "color": "#cccccc"
	  },
	  "textContainer": {
	    "width": 750,
	    "paddingTop": 200,
	    "alignItems": "center",
	    "justifyContent": "center"
	  },
	  "text": {
	    "fontSize": 48
	  }
	})
	})
	;__weex_bootstrap__("@weex-component/4aae7a2d34f83b02b5a76d89afe889ae", {
	  "transformerVersion": "0.3.1"
	},undefined)

/***/ }
/******/ ]);