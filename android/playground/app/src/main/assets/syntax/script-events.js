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

	;__weex_define__("@weex-component/84e899512277fcf07171e5e7a7bf23cc", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	  __weex_module__.exports = {
	    data: function () {return {
	      list: []
	    }},
	    events: {
	      custom: function (e) {
	        this.list.push('custom: ' + JSON.stringify(e.detail))
	      }
	    },
	    ready: function () {
	      function custom2(e) {
	        this.list.push('custom2: ' + JSON.stringify(e.detail))
	      }

	      this.$on('custom2', custom2)

	      this.$emit('custom', {x: 1})
	      this.$emit('custom2', {x: 1})

	      this.$off('custom2', custom2)

	      this.$emit('custom', {x: 2})
	      this.$emit('custom2', {x: 2})

	      this.$off('custom')

	      this.$emit('custom', {x: 3})
	      this.$emit('custom2', {x: 3})
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
	      "repeat": {
	        "expression": function () {return this.list},
	        "value": "value"
	      },
	      "attr": {
	        "value": function () {return this.value}
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
	;__weex_bootstrap__("@weex-component/84e899512277fcf07171e5e7a7bf23cc", {
	  "transformerVersion": "0.3.1"
	},undefined)

/***/ }
/******/ ]);