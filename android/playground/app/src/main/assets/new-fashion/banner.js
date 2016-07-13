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

	;__weex_define__("@weex-component/182cfd86f4ae8de2b3d0ea308cf05b5f", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	  __weex_module__.exports = {
	    data: function () {return {
	        quality: 'normal',
	        width: 0,
	        height: 0,
	        src: '',
	        href: '',
	        spmc:0,
	        spmd:0
	    }},
	    methods: {
	      ready: function () {
	      },
	      _clickHandler: function () {
	        this.$call('modal', 'toast', {
	          message: 'click',
	          duration: 1
	        });
	      }
	    }
	  };

	;__weex_module__.exports.template={
	  "type": "image",
	  "style": {
	    "width": function () {return this.width},
	    "height": function () {return this.height}
	  },
	  "attr": {
	    "src": function () {return this.src},
	    "imageQuality": function () {return this.quality}
	  },
	  "events": {
	    "click": "_clickHandler"
	  }
	}
	})
	;__weex_bootstrap__("@weex-component/182cfd86f4ae8de2b3d0ea308cf05b5f", {
	  "transformerVersion": "0.3.1"
	},undefined)

/***/ }
/******/ ]);