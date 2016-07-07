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

	;__weex_define__("@weex-component/dc26e98d7d1f5d1cf937f00bff77ff51", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	  __weex_module__.exports = {
	    data: function () {return {
	      x: 1,
	      y: 2
	    }},
	    methods: {
	      foo: function () {
	        console.log('foo')
	      },
	      test: function () {

	        // access data
	        console.log(this.x)

	        // access computed
	        console.log(this.z)

	        // call methods
	        this.foo()

	        // get config
	        console.log(this.$getConfig())

	        // listen and fire component events
	        this.$emit('custom')
	        this.$dispatch('custom')
	        this.$broadcast('custom')
	        this.$on('custom', this.foo)
	        this.$off('custom', this.foo)

	        // // parent component and sub components
	        // this.$parent.$emit('custom')
	        // this.$vm('sub').$emit('custom')

	        // // find element
	        // var dom = __weex_require__('@weex-module/dom')
	        // dom.scrollToElement(this.$el('title'), {offset: 0})
	      }
	    },
	    computed: {
	      z: function () {
	        return this.x + this.y
	      }
	    },
	    ready: function () {
	      this.test()
	    }
	  }

	;__weex_module__.exports.template = __weex_module__.exports.template || {}
	;Object.assign(__weex_module__.exports.template, {
	  "type": "div",
	  "children": [
	    {
	      "type": "text",
	      "id": "title",
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
	;__weex_bootstrap__("@weex-component/dc26e98d7d1f5d1cf937f00bff77ff51", {
	  "transformerVersion": "0.3.1"
	},undefined)

/***/ }
/******/ ]);