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

	;__weex_define__("@weex-component/d5bf5080354894261874e546f58039a7", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	  // // if this is a sub component and the parent component could set `firstName` and `lastName` by:
	  // // `<subcomponent first-name="John" last-name="Smith"></subcomponent>`
	  // __weex_module__.exports = {
	  //   data: function () {
	  //     return {
	  //       firstName: '',
	  //       lastName: ''
	  //     }
	  //   }
	  // }

	  __weex_module__.exports = {
	    data: function () {return {
	      firstName: 'John',
	      lastName: 'Smith',
	      date: Date.now()
	    }},
	    methods: {
	      update: function () {
	        this.today = '2016-01-01'
	      }
	    },
	    computed: {
	      fullName: function () {
	        return this.firstName + ' ' + this.lastName
	      },
	      today: {
	        get: function () {
	          return new Date(this.date).toDateString()
	        },
	        set: function (v) {
	          this.date = Date.parse(v)
	        }
	      }
	    }
	  }

	;__weex_module__.exports.template = __weex_module__.exports.template || {}
	;Object.assign(__weex_module__.exports.template, {
	  "type": "div",
	  "events": {
	    "click": "update"
	  },
	  "children": [
	    {
	      "type": "text",
	      "classList": [
	        "title"
	      ],
	      "attr": {
	        "value": function () {return this.firstName}
	      }
	    },
	    {
	      "type": "text",
	      "classList": [
	        "title"
	      ],
	      "attr": {
	        "value": function () {return this.lastName}
	      }
	    },
	    {
	      "type": "text",
	      "classList": [
	        "title"
	      ],
	      "attr": {
	        "value": function () {return this.fullName}
	      }
	    },
	    {
	      "type": "text",
	      "classList": [
	        "title"
	      ],
	      "attr": {
	        "value": function () {return this.today}
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
	;__weex_bootstrap__("@weex-component/d5bf5080354894261874e546f58039a7", {
	  "transformerVersion": "0.3.1"
	},undefined)

/***/ }
/******/ ]);