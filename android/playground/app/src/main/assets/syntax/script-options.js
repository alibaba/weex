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

	;__weex_define__("@weex-component/9f2af5be4e353f4b1f4bec94edd9b14d", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	  // // import sub components
	  // require('./components/sub.vue')
	  __weex_module__.exports = {

	    // for root component only
	    data: function () {return {
	      x: 1,
	      y: 2
	    }},
	    // // for sub component only
	    // data: function () {
	    //   return {
	    //     x: 1,
	    //     y: 2
	    //   }
	    // }

	    methods: {
	      foo: function () {
	        console.log('foo')
	      }
	    },

	    computed: {
	      z: function () {
	        return this.x + this.y
	      }
	    },

	    events: {
	      custom: function (e) {
	        console.log(e)
	      }
	    },

	    init: function () {},
	    created: function () {},
	    ready: function () {}
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
	        "value": "Please check out the source code."
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
	;__weex_bootstrap__("@weex-component/9f2af5be4e353f4b1f4bec94edd9b14d", {
	  "transformerVersion": "0.3.1"
	},undefined)

/***/ }
/******/ ]);