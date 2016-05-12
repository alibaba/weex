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
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	;__weex_define__("@weex-component/5ad7a924dc9da8e1fdbbc4b0828fdb93", [], function(__weex_require__, __weex_exports__, __weex_module__){
	__webpack_require__(14);

	;
	  __weex_module__.exports = {
	    data: function () {return {
	      items: [],
	      sliderItems: []
	    }},
	    methods: {
	      ready: function() {
	        this.sliderItems = this.getSliderItems()
	      },
	      getSliderItems: function() {
	        return this.items.map(function(item, index) {
	          return item;
	        }.bind(this));
	      }
	    }
	  };

	;__weex_module__.exports.template={
	  "type": "div",
	  "classList": [
	    "slider-page"
	  ],
	  "children": [
	    {
	      "type": "slider-item",
	      "repeat": function () {return this.sliderItems}
	    }
	  ]
	}
	;__weex_module__.exports.style={
	  "slider-page": {
	    "flexDirection": "row",
	    "justifyContent": "space-between",
	    "width": 714,
	    "height": 420
	  }
	}
	})
	;__weex_bootstrap__("@weex-component/5ad7a924dc9da8e1fdbbc4b0828fdb93", {
	  "transformerVersion": "0.3.1"
	},undefined)

/***/ },

/***/ 14:
/***/ function(module, exports) {

	;__weex_define__("@weex-component/slider-item", [], function(__weex_require__, __weex_exports__, __weex_module__){

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

/***/ }

/******/ });