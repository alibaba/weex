// { "framework": "Vue" }

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

	var __vue_exports__, __vue_options__
	var __vue_styles__ = []

	/* styles */
	__vue_styles__.push(__webpack_require__(601)
	)

	/* script */
	__vue_exports__ = __webpack_require__(602)

	/* template */
	var __vue_template__ = __webpack_require__(603)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/Users/bobning/work/source/weex_fork/examples/vue/syntax/template-event.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__.style = __vue_options__.style || {}
	__vue_styles__.forEach(function (module) {
	for (var name in module) {
	__vue_options__.style[name] = module[name]
	}
	})

	module.exports = __vue_exports__
	module.exports.el = 'true'
	new Vue(module.exports)


/***/ },

/***/ 601:
/***/ function(module, exports) {

	module.exports = {
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
	}

/***/ },

/***/ 602:
/***/ function(module, exports) {

	'use strict';

	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

	module.exports = {
	  data: function data() {
	    return {
	      name: 'Steve',
	      temp: 'Mike'
	    };
	  },
	  methods: {
	    update: function update(e) {
	      this.setName('David');
	      console.log('setName', this.name);
	    },
	    setName: function setName(value) {
	      this.name = value;
	      console.log('name', this.name);
	    }
	  }
	};

/***/ },

/***/ 603:
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _h('div', [_h('text', {
	    staticClass: ["title"]
	  }, ["Hello " + _vm._s(_vm.name)]), _h('text', {
	    staticClass: ["btn"],
	    on: {
	      "click": _vm.update
	    }
	  }, ["Update 1"]), _h('text', {
	    staticClass: ["btn"],
	    on: {
	      "click": function($event) {
	        _vm.update($event)
	      }
	    }
	  }, ["Update 1"]), _h('text', {
	    staticClass: ["btn"],
	    on: {
	      "click": function($event) {
	        _vm.setName(_vm.temp, $event)
	      }
	    }
	  }, ["Update 2"]), _h('text', {
	    staticClass: ["btn"],
	    on: {
	      "click": function($event) {
	        _vm.setName('John')
	      }
	    }
	  }, ["Update 3"])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true

/***/ }

/******/ });