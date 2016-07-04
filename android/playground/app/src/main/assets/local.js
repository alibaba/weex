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

	;__weex_define__("@weex-component/acdf53172f8fc8cc68088ada1980f92a", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	  __weex_module__.exports = {
	    data: function () {return {
	      keys: [{
	        key: 1
	      }, {
	        key: 2
	      }]
	    }},

	    methods: {
	      ready() {

	      },
	      click: function() {
	        console.log('hit');
	        this.keys[0] = {key: 'a'};
	        this.keys[1] = {key: 'b'};
	      }
	    }
	  };

	;__weex_module__.exports.template={
	  "type": "container",
	  "style": {
	    "backgroundColor": "#ffffff"
	  },
	  "events": {
	    "click": function ($event) {this.click($event)}
	  },
	  "children": [
	    {
	      "type": "text",
	      "attr": {
	        "value": "test"
	      }
	    },
	    {
	      "type": "text",
	      "repeat": function () {return this.keys},
	      "attr": {
	        "value": function () {return this.key}
	      }
	    }
	  ]
	}
	;__weex_module__.exports.style={}
	})
	;__weex_bootstrap__("@weex-component/acdf53172f8fc8cc68088ada1980f92a", {
	  "transformerVersion": "0.3.1"
	},undefined)

/***/ }
/******/ ]);