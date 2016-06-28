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

	;__weex_define__("@weex-component/ef1dc1be90047f8ba2262dbf1d8cf6e9", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	  __weex_module__.exports = {
	    data: function () {return {
	      image: '',
	      link: '',
	      href: ''
	    }},
	    methods: {
	      ready: function() {
	        this.href = this.link;
	      }
	    }
	  };

	;__weex_module__.exports.template={
	  "type": "image",
	  "classList": [
	    "slider-item"
	  ],
	  "attr": {
	    "src": function () {return this.image}
	  }
	}
	;__weex_module__.exports.style={
	  "slider-item": {
	    "width": 348,
	    "height": 400
	  }
	}
	})
	;__weex_bootstrap__("@weex-component/ef1dc1be90047f8ba2262dbf1d8cf6e9", {
	  "transformerVersion": "0.3.1"
	},undefined)

/***/ }
/******/ ]);