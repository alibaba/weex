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

	;__weex_define__("@weex-component/f30da4ff4deb271b161473fed8083ed2", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	  __weex_module__.exports = {
	    created: function() {
	      var domModule = __weex_require__('@weex-module/dom');
	      //目前支持ttf、woff文件，不支持svg、eot类型
	      domModule.addRule('font-face', {
	        'font-family': "iconfont1",
	        'src' : "url('iconfont.ttf')"
	      });
	      domModule.addRule('font-face', {
	        'font-family': "iconfont2",
	        'src': "url('http://at.alicdn.com/t/font_1469606063_76593.ttf')"
	      });
	      domModule.addRule('font-face', {
	        'font-family': "iconfont3",
	        'src': "url('http://at.alicdn.com/t/font_1469606522_9417143.woff')"
	      });
	      domModule.addRule('font-face', {
	        'font-family': "iconfont4",
	        'src': "url('file:///storage/emulated/0/Android/data/com.alibaba.weex/cache/http:__at.alicdn.com_t_font_1469606063_76593.ttf')"
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
	        "title1"
	      ],
	      "attr": {
	        "value": "Assets: "
	      }
	    },
	    {
	      "type": "text",
	      "classList": [
	        "title2"
	      ],
	      "attr": {
	        "value": "http ttf: "
	      }
	    },
	    {
	      "type": "text",
	      "classList": [
	        "title3"
	      ],
	      "attr": {
	        "value": "http woff: "
	      }
	    },
	    {
	      "type": "text",
	      "classList": [
	        "title4"
	      ],
	      "attr": {
	        "value": "file: "
	      }
	    }
	  ]
	})
	;__weex_module__.exports.style = __weex_module__.exports.style || {}
	;Object.assign(__weex_module__.exports.style, {
	  "title1": {
	    "color": "#FF0000",
	    "fontSize": 36,
	    "fontFamily": "iconfont1"
	  },
	  "title2": {
	    "color": "#FF0000",
	    "fontSize": 36,
	    "fontFamily": "iconfont2"
	  },
	  "title3": {
	    "color": "#FF0000",
	    "fontSize": 36,
	    "fontFamily": "iconfont3"
	  },
	  "title4": {
	    "color": "#FF0000",
	    "fontSize": 36,
	    "fontFamily": "iconfont4"
	  }
	})
	})
	;__weex_bootstrap__("@weex-component/f30da4ff4deb271b161473fed8083ed2", {
	  "transformerVersion": "0.3.1"
	},undefined)

/***/ }
/******/ ]);