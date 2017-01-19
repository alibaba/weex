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
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = []

	/* script */
	__vue_exports__ = __webpack_require__(1)

	/* template */
	var __vue_template__ = __webpack_require__(6)
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
	__vue_options__.__file = "/Users/YunDong/Projects/weex-vue-demo/src/App.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__.style = __vue_options__.style || {}
	__vue_styles__.forEach(function (module) {
	for (var name in module) {
	__vue_options__.style[name] = module[name]
	}
	})

	module.exports = __vue_exports__
	module.exports.el = 'body'
	new Vue(module.exports)


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _storage = __webpack_require__(2);

	var _storage2 = _interopRequireDefault(_storage);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  components: { Example: _storage2.default }
	}; //
	//
	//
	//

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = []

	/* styles */
	__vue_styles__.push(__webpack_require__(3)
	)

	/* script */
	__vue_exports__ = __webpack_require__(4)

	/* template */
	var __vue_template__ = __webpack_require__(5)
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
	__vue_options__.__file = "/Users/YunDong/Projects/weex-vue-demo/src/modules/storage.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__.style = __vue_options__.style || {}
	__vue_styles__.forEach(function (module) {
	for (var name in module) {
	__vue_options__.style[name] = module[name]
	}
	})

	module.exports = __vue_exports__


/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = {
	  "panel": {
	    "height": 100,
	    "flexDirection": "column",
	    "justifyContent": "center",
	    "borderWidth": 2,
	    "borderStyle": "solid",
	    "borderColor": "rgb(162,217,192)",
	    "backgroundColor": "rgba(162,217,192,0.2)"
	  },
	  "group": {
	    "flexDirection": "row",
	    "justifyContent": "space-between",
	    "width": 650,
	    "marginLeft": 50,
	    "marginTop": 50,
	    "marginBottom": 50
	  },
	  "center": {
	    "justifyContent": "center"
	  },
	  "text": {
	    "fontSize": 50,
	    "textAlign": "center",
	    "paddingLeft": 25,
	    "paddingRight": 25,
	    "color": "#41B883"
	  },
	  "small": {
	    "fontSize": 32,
	    "paddingLeft": 35,
	    "paddingRight": 35,
	    "color": "#41B883"
	  }
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
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

	var storage = weex.requireModule('storage');
	var modal = weex.requireModule('modal');

	exports.default = {
	  data: function data() {
	    return {
	      keys: '[]',
	      length: 0,
	      state: '----'
	    };
	  },

	  methods: {
	    setItem: function setItem() {
	      var _this = this;

	      storage.setItem('name', 'Hanks', function (event) {
	        _this.state = 'set success';
	        console.log('set success');
	      });
	    },
	    getItem: function getItem() {
	      var _this2 = this;

	      storage.getItem('name', function (event) {
	        console.log('get value:', event.data);
	        _this2.state = 'value: ' + event.data;
	      });
	    },
	    removeItem: function removeItem() {
	      var _this3 = this;

	      storage.removeItem('name', function (event) {
	        console.log('delete value:', event.data);
	        _this3.state = 'deleted';
	      });
	    },
	    getAll: function getAll() {
	      storage.getAllKeys(function (event) {
	        // modal.toast({ message: event.result })
	        if (event.result === 'success') {
	          modal.toast({
	            message: 'props: ' + event.data.join(', ')
	          });
	        }
	      });
	    }
	  }
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _h('div', {
	    staticClass: ["list"]
	  }, [_h('div', {
	    staticClass: ["group", "center"]
	  }, [_h('div', {
	    staticClass: ["panel"]
	  }, [_h('text', {
	    staticClass: ["text"]
	  }, [_vm._s(_vm.state)])])]), _h('div', {
	    staticClass: ["group"]
	  }, [_h('div', {
	    staticClass: ["panel"]
	  }, [_h('text', {
	    staticClass: ["text"],
	    on: {
	      "click": _vm.setItem
	    }
	  }, ["set"])]), _h('div', {
	    staticClass: ["panel"]
	  }, [_h('text', {
	    staticClass: ["text"],
	    on: {
	      "click": _vm.getItem
	    }
	  }, ["get"])]), _h('div', {
	    staticClass: ["panel"]
	  }, [_h('text', {
	    staticClass: ["text"],
	    on: {
	      "click": _vm.removeItem
	    }
	  }, ["remove"])]), _h('div', {
	    staticClass: ["panel"]
	  }, [_h('text', {
	    staticClass: ["text"],
	    on: {
	      "click": _vm.getAll
	    }
	  }, ["all"])])])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _h('example')
	},staticRenderFns: []}
	module.exports.render._withStripped = true

/***/ }
/******/ ]);