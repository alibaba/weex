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
	__vue_styles__.push(__webpack_require__(489)
	)

	/* script */
	__vue_exports__ = __webpack_require__(490)

	/* template */
	var __vue_template__ = __webpack_require__(491)
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
	__vue_options__.__file = "/Users/bobning/work/source/weex_fork/examples/vue/showcase/calculator.vue"
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

/***/ 489:
/***/ function(module, exports) {

	module.exports = {
	  "row": {
	    "flexDirection": "row"
	  },
	  "result": {
	    "textAlign": "right",
	    "backgroundColor": "#666666",
	    "fontSize": 40,
	    "color": "#FFFFFF",
	    "height": 100,
	    "padding": 30,
	    "margin": 5
	  },
	  "btn": {
	    "flex": 1,
	    "textAlign": "center",
	    "backgroundColor": "#eeeeee",
	    "fontSize": 36,
	    "height": 100,
	    "padding": 30,
	    "margin": 5
	  },
	  "btn-operator": {
	    "backgroundColor": "#666699",
	    "fontSize": 40,
	    "color": "#FFFFFF"
	  }
	}

/***/ },

/***/ 490:
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
	//
	//

	var OP = ['+', '-', '*', '/'];
	var modal = __weex_require_module__('modal');
	module.exports = {
	  data: function data() {
	    return {
	      result: '',
	      inputs: []
	    };
	  },
	  methods: {
	    input: function input(e) {
	      modal.toast({ message: 'input: ' + e.target.attr.value, duration: 1 });
	      var value = e.target.attr['value'];
	      var inputs = this.inputs;
	      var lastOne = inputs.length ? inputs[inputs.length - 1] : '';
	      if (OP.indexOf(lastOne) > -1 && OP.indexOf(value) > -1) {
	        return;
	      }
	      inputs.push(value);
	      var buf = [],
	          char;
	      for (var i = 0; i < inputs.length; i++) {
	        char = inputs[i];
	        if (OP.indexOf(char) > -1) {
	          char = ' ' + char + ' ';
	        }
	        buf.push(char);
	      }
	      this.result = buf.join('');
	    },
	    calculate: function calculate() {
	      var result = eval(this.result);
	      this.inputs = [result];
	      this.result = result;
	    },
	    clear: function clear() {
	      this.inputs = [];
	      this.result = '';
	    }
	  }
	};

/***/ },

/***/ 491:
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _h('div', {
	    staticStyle: {
	      padding: "5px"
	    }
	  }, [_h('text', {
	    staticClass: ["result"]
	  }, [_vm._s(_vm.result)]), _h('div', {
	    staticClass: ["row"]
	  }, [_h('text', {
	    staticClass: ["btn"],
	    on: {
	      "click": _vm.input
	    }
	  }, ["1"]), _h('text', {
	    staticClass: ["btn"],
	    on: {
	      "click": _vm.input
	    }
	  }, ["2"]), _h('text', {
	    staticClass: ["btn"],
	    on: {
	      "click": _vm.input
	    }
	  }, ["3"]), _h('text', {
	    staticClass: ["btn", "btn-operator"],
	    on: {
	      "click": _vm.input
	    }
	  }, ["+"])]), _h('div', {
	    staticClass: ["row"]
	  }, [_h('text', {
	    staticClass: ["btn"],
	    on: {
	      "click": _vm.input
	    }
	  }, ["4"]), _h('text', {
	    staticClass: ["btn"],
	    on: {
	      "click": _vm.input
	    }
	  }, ["5"]), _h('text', {
	    staticClass: ["btn"],
	    on: {
	      "click": _vm.input
	    }
	  }, ["6"]), _h('text', {
	    staticClass: ["btn", "btn-operator"],
	    on: {
	      "click": _vm.input
	    }
	  }, ["-"])]), _h('div', {
	    staticClass: ["row"]
	  }, [_h('text', {
	    staticClass: ["btn"],
	    on: {
	      "click": _vm.input
	    }
	  }, ["7"]), _h('text', {
	    staticClass: ["btn"],
	    on: {
	      "click": _vm.input
	    }
	  }, ["8"]), _h('text', {
	    staticClass: ["btn"],
	    on: {
	      "click": _vm.input
	    }
	  }, ["9"]), _h('text', {
	    staticClass: ["btn", "btn-operator"],
	    on: {
	      "click": _vm.input
	    }
	  }, ["*"])]), _h('div', {
	    staticClass: ["row"]
	  }, [_h('text', {
	    staticClass: ["btn"],
	    on: {
	      "click": _vm.input
	    }
	  }, ["0"]), _h('text', {
	    staticClass: ["btn"],
	    on: {
	      "click": _vm.input
	    }
	  }, ["."]), _h('text', {
	    staticClass: ["btn"],
	    on: {
	      "click": _vm.clear
	    }
	  }, ["AC"]), _h('text', {
	    staticClass: ["btn", "btn-operator"],
	    on: {
	      "click": _vm.calculate
	    }
	  }, ["="])])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true

/***/ }

/******/ });