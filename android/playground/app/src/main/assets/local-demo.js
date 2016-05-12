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

	;__weex_define__("@weex-component/9dc047404865acabbbd4844a27483821", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	  __weex_module__.exports = {
	    data: function () {return {
	      items: [{
	        id: 1
	      }, {
	        id: 2
	      }, {
	        id: 3
	      }]
	    }}
	  }

	;__weex_module__.exports.template={
	  "type": "div",
	  "children": [
	    {
	      "type": "text",
	      "repeat": function () {return this.items},
	      "style": {
	        "fontSize": 100,
	        "color": "#FF0000"
	      },
	      "attr": {
	        "value": function () {return 'Hello ' + (this.id)}
	      }
	    },
	    {
	      "type": "text",
	      "style": {
	        "fontSize": 100,
	        "color": "#FF0000"
	      },
	      "attr": {
	        "value": "Hello Weex!"
	      }
	    },
	    {
	      "type": "image",
	      "attr": {
	        "src": "http://gw.alicdn.com/tps/i2/TB1DpsmMpXXXXabaXXX20ySQVXX-512-512.png_400x400.jpg"
	      },
	      "style": {
	        "width": 200,
	        "height": 200
	      }
	    }
	  ]
	}
	})
	;__weex_bootstrap__("@weex-component/9dc047404865acabbbd4844a27483821", {"transformerVersion":"0.3.1"}, undefined)

/***/ }
/******/ ]);