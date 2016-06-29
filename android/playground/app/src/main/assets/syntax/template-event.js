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

	;__weex_define__("@weex-component/d83db6eb4daf21f3bf24890425dbbab0", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	  __weex_module__.exports = {
	    data: function () {return {
	      name: 'Steve',
	      temp: 'Mike'
	    }},
	    methods: {
	      update: function (e) {
	        this.setName('David')
	      },
	      setName: function (value) {
	        this.name = value
	      }
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
	        "value": function () {return 'Hello ' + (this.name)}
	      }
	    },
	    {
	      "type": "text",
	      "classList": [
	        "btn"
	      ],
	      "events": {
	        "click": "update"
	      },
	      "attr": {
	        "value": "Update 1"
	      }
	    },
	    {
	      "type": "text",
	      "classList": [
	        "btn"
	      ],
	      "events": {
	        "click": "update"
	      },
	      "attr": {
	        "value": "Update 1"
	      }
	    },
	    {
	      "type": "text",
	      "classList": [
	        "btn"
	      ],
	      "events": {
	        "click": function ($event) {this.update($event)}
	      },
	      "attr": {
	        "value": "Update 1"
	      }
	    },
	    {
	      "type": "text",
	      "classList": [
	        "btn"
	      ],
	      "events": {
	        "click": function ($event) {this.setName(this.temp,$event)}
	      },
	      "attr": {
	        "value": "Update 2"
	      }
	    },
	    {
	      "type": "text",
	      "classList": [
	        "btn"
	      ],
	      "events": {
	        "click": function ($event) {this.setName('John',$event)}
	      },
	      "attr": {
	        "value": "Update 3"
	      }
	    }
	  ]
	})
	;__weex_module__.exports.style = __weex_module__.exports.style || {}
	;Object.assign(__weex_module__.exports.style, {
	  "title": {
	    "fontSize": 48
	  },
	  "subtitle": {
	    "fontSize": 36
	  },
	  "btn": {
	    "fontSize": 36,
	    "textAlign": "center",
	    "color": "#FFFFFF",
	    "backgroundColor": "#808080",
	    "padding": 20,
	    "borderRadius": 5
	  }
	})
	})
	;__weex_bootstrap__("@weex-component/d83db6eb4daf21f3bf24890425dbbab0", {
	  "transformerVersion": "0.3.1"
	},undefined)

/***/ }
/******/ ]);