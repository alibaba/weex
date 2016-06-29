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

	;__weex_define__("@weex-component/3afe39b600f3a6c55888805f03a4b3ae", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	  __weex_module__.exports = {
	    data: function () {return {
	      list: [
	        {key: 1, text: 'a'},
	        {key: 2, text: 'a'},
	        {key: 3, text: 'b'},
	        {key: 4, text: 'c'},
	        {key: 5, text: 'a'}
	      ],
	      flag: true
	    }},
	    methods: {
	      update: function (e) {
	        // equals to `this.list[2].text = 'foo'`
	        // DO NOT USE: `this.list[2] = {key: 3, text: 'foo'}}`
	        this.list.$set(2, {key: 3, text: 'foo'})
	      },
	      mutate: function (e) {
	        if (this.list.length % 2) {
	          this.list.push({key: 'x', text: 'bar'})
	        }
	        else {
	          this.list.pop()
	        }
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
	        "value": "Track by"
	      }
	    },
	    {
	      "type": "text",
	      "classList": [
	        "subtitle"
	      ],
	      "repeat": {
	        "expression": function () {return this.list},
	        "value": "item"
	      },
	      "attr": {
	        "trackBy": "key",
	        "value": function () {return (this.$index) + '-' + (this.item.text)}
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
	        "value": "Update"
	      }
	    },
	    {
	      "type": "text",
	      "classList": [
	        "btn"
	      ],
	      "events": {
	        "click": "mutate"
	      },
	      "attr": {
	        "value": "Mutate"
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
	;__weex_bootstrap__("@weex-component/3afe39b600f3a6c55888805f03a4b3ae", {
	  "transformerVersion": "0.3.1"
	},undefined)

/***/ }
/******/ ]);