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

	;__weex_define__("@weex-component/12e3fae9066debee37a22f0980a88637", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	  var IS_WEB = typeof window !== 'undefined';
	  var IS_APP = !IS_WEB || /AliApp\((?:tb|tm)/i.test(navigator.userAgent);

	  __weex_module__.exports = {
	    data: function () {return {
	      currentStatus: '//img.alicdn.com/tps/i4/TB1cYBKMXXXXXayaXXXkxHk2pXX-750-228.jpg_q75.jpg'
	    }},
	    methods: {
	      ready: function () {
	      },
	      handleClick: function (e) {
	        this.$call('modal', 'toast', {
	            message: 'click',
	            duration: 1
	        });
	      }
	    }
	  };

	;__weex_module__.exports.template={
	  "type": "container",
	  "children": [
	    {
	      "type": "image",
	      "shown": function () {return this.ds.floorTitle},
	      "classList": [
	        "title"
	      ],
	      "attr": {
	        "src": function () {return this.ds.floorTitle}
	      }
	    },
	    {
	      "type": "container",
	      "classList": [
	        "wrapper"
	      ],
	      "children": [
	        {
	          "type": "image",
	          "classList": [
	            "img"
	          ],
	          "attr": {
	            "src": function () {return this.currentStatus}
	          }
	        },
	        {
	          "type": "container",
	          "classList": [
	            "my-coupon"
	          ],
	          "events": {
	            "click": "handleClick"
	          }
	        },
	        {
	          "type": "container",
	          "classList": [
	            "guides"
	          ],
	          "events": {
	            "click": "handleClick"
	          }
	        },
	        {
	          "type": "container",
	          "classList": [
	            "lottery"
	          ],
	          "events": {
	            "click": "handleClick"
	          }
	        }
	      ]
	    }
	  ]
	}
	;__weex_module__.exports.style={
	  "title": {
	    "width": 750,
	    "height": 100
	  },
	  "wrapper": {
	    "color": "#FF4550",
	    "width": 750,
	    "height": 230
	  },
	  "my-coupon": {
	    "width": 180,
	    "height": 39,
	    "position": "absolute",
	    "top": 15,
	    "right": 149
	  },
	  "guides": {
	    "height": 39,
	    "width": 110,
	    "position": "absolute",
	    "top": 15,
	    "right": 32
	  },
	  "lottery": {
	    "width": 348,
	    "height": 76,
	    "position": "absolute",
	    "top": 132,
	    "right": 70
	  },
	  "info": {
	    "fontSize": 18,
	    "position": "absolute",
	    "top": 84,
	    "right": 70
	  },
	  "img": {
	    "width": 750,
	    "height": 230
	  }
	}
	})
	;__weex_bootstrap__("@weex-component/12e3fae9066debee37a22f0980a88637", {
	  "transformerVersion": "0.3.1"
	},undefined)

/***/ }
/******/ ]);