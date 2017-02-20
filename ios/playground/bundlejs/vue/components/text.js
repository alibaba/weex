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
	__vue_styles__.push(__webpack_require__(453)
	)

	/* script */
	__vue_exports__ = __webpack_require__(454)

	/* template */
	var __vue_template__ = __webpack_require__(455)
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
	__vue_options__.__file = "/Users/bobning/work/source/weex_fork/examples/vue/components/text.vue"
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

/***/ 381:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = []

	/* styles */
	__vue_styles__.push(__webpack_require__(382)
	)

	/* script */
	__vue_exports__ = __webpack_require__(383)

	/* template */
	var __vue_template__ = __webpack_require__(384)
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
	__vue_options__.__file = "/Users/bobning/work/source/weex_fork/examples/vue/include/panel.vue"
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

/***/ 382:
/***/ function(module, exports) {

	module.exports = {
	  "panel": {
	    "marginBottom": 20,
	    "backgroundColor": "#ffffff",
	    "borderColor": "#dddddd",
	    "borderWidth": 1
	  },
	  "panel-primary": {
	    "borderColor": "rgb(40,96,144)"
	  },
	  "panel-success": {
	    "borderColor": "rgb(76,174,76)"
	  },
	  "panel-info": {
	    "borderColor": "rgb(70,184,218)"
	  },
	  "panel-warning": {
	    "borderColor": "rgb(238,162,54)"
	  },
	  "panel-danger": {
	    "borderColor": "rgb(212,63,58)"
	  },
	  "panel-header": {
	    "backgroundColor": "#f5f5f5",
	    "fontSize": 40,
	    "color": "#333333"
	  },
	  "panel-header-primary": {
	    "backgroundColor": "rgb(40,96,144)",
	    "color": "#ffffff"
	  },
	  "panel-header-success": {
	    "backgroundColor": "rgb(92,184,92)",
	    "color": "#ffffff"
	  },
	  "panel-header-info": {
	    "backgroundColor": "rgb(91,192,222)",
	    "color": "#ffffff"
	  },
	  "panel-header-warning": {
	    "backgroundColor": "rgb(240,173,78)",
	    "color": "#ffffff"
	  },
	  "panel-header-danger": {
	    "backgroundColor": "rgb(217,83,79)",
	    "color": "#ffffff"
	  }
	}

/***/ },

/***/ 383:
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

	module.exports = {
	  props: {
	    type: { default: 'default' },
	    title: { default: '' },
	    paddingBody: { default: 20 },
	    paddingHead: { default: 20 },
	    dataClass: { default: '' }, // FIXME transfer class
	    border: { default: 0 }
	  }
	};

/***/ },

/***/ 384:
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _h('div', {
	    class: ['panel', 'panel-' + _vm.type],
	    style: {
	      borderWidth: _vm.border
	    }
	  }, [_h('text', {
	    class: ['panel-header', 'panel-header-' + _vm.type],
	    style: {
	      paddingTop: _vm.paddingHead,
	      paddingBottom: _vm.paddingHead,
	      paddingLeft: _vm.paddingHead * 1.5,
	      paddingRight: _vm.paddingHead * 1.5
	    }
	  }, [_vm._s(_vm.title)]), _h('div', {
	    class: ['panel-body', 'panel-body-' + _vm.type],
	    style: {
	      paddingTop: _vm.paddingBody,
	      paddingBottom: _vm.paddingBody,
	      paddingLeft: _vm.paddingBody * 1.5,
	      paddingRight: _vm.paddingBody * 1.5
	    }
	  }, [_vm._t("default")])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true

/***/ },

/***/ 453:
/***/ function(module, exports) {

	module.exports = {
	  "txt": {
	    "marginBottom": 12,
	    "fontSize": 40
	  }
	}

/***/ },

/***/ 454:
/***/ function(module, exports, __webpack_require__) {

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

	module.exports = {
	  components: {
	    panel: __webpack_require__(381)
	  }
	};

/***/ },

/***/ 455:
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _h('scroller', [_h('panel', {
	    attrs: {
	      "title": "color",
	      "type": "primary"
	    }
	  }, [_h('text', {
	    staticClass: ["txt"]
	  }, ["default is black"]), _h('text', {
	    staticClass: ["txt"],
	    staticStyle: {
	      color: "#286090"
	    }
	  }, ["#286090"]), _h('text', {
	    staticClass: ["txt"],
	    staticStyle: {
	      color: "#0f0"
	    }
	  }, ["#0f0"]), _h('text', {
	    staticClass: ["txt"],
	    staticStyle: {
	      color: "red"
	    }
	  }, ["keyword"]), _h('text', {
	    staticClass: ["txt"],
	    staticStyle: {
	      color: "rgb(238, 162, 54)"
	    }
	  }, ["rgb(238, 162, 54)"]), _h('text', {
	    staticClass: ["txt"],
	    staticStyle: {
	      color: "rgba(238, 162, 54, 0.5)"
	    }
	  }, ["rgba(238, 162, 54, 0.5)"])]), _h('panel', {
	    attrs: {
	      "title": "font-size",
	      "type": "primary"
	    }
	  }, [_h('text', {
	    staticClass: ["txt"],
	    staticStyle: {
	      fontSize: "32px"
	    }
	  }, ["32"]), _h('text', {
	    staticClass: ["txt"],
	    staticStyle: {
	      fontSize: "64px"
	    }
	  }, ["64"]), _h('text', {
	    staticClass: ["txt"],
	    staticStyle: {
	      fontSize: "100px"
	    }
	  }, ["100"])]), _h('panel', {
	    attrs: {
	      "title": "font-style",
	      "type": "primary"
	    }
	  }, [_h('text', {
	    staticClass: ["txt"],
	    staticStyle: {
	      fontStyle: "normal"
	    }
	  }, ["normal"]), _h('text', {
	    staticClass: ["txt"],
	    staticStyle: {
	      fontStyle: "italic"
	    }
	  }, ["italic"])]), _h('panel', {
	    attrs: {
	      "title": "font-weight",
	      "type": "primary"
	    }
	  }, [_h('text', {
	    staticClass: ["txt"],
	    staticStyle: {
	      fontWeight: "normal"
	    }
	  }, ["normal"]), _h('text', {
	    staticClass: ["txt"],
	    staticStyle: {
	      fontWeight: "bold"
	    }
	  }, ["bold"])]), _h('panel', {
	    attrs: {
	      "title": "text-decoration",
	      "type": "primary"
	    }
	  }, [_h('text', {
	    staticClass: ["txt"],
	    staticStyle: {
	      textDecoration: "none"
	    }
	  }, ["none"]), _h('text', {
	    staticClass: ["txt"],
	    staticStyle: {
	      textDecoration: "underline"
	    }
	  }, ["underline"]), _h('text', {
	    staticClass: ["txt"],
	    staticStyle: {
	      textDecoration: "line-through"
	    }
	  }, ["line-through"])]), _h('panel', {
	    attrs: {
	      "title": "text-align",
	      "type": "primary"
	    }
	  }, [_h('text', {
	    staticClass: ["txt"],
	    staticStyle: {
	      textAlign: "left"
	    }
	  }, ["left"]), _h('text', {
	    staticClass: ["txt"],
	    staticStyle: {
	      textAlign: "center"
	    }
	  }, ["center"]), _h('text', {
	    staticClass: ["txt"],
	    staticStyle: {
	      textAlign: "right"
	    }
	  }, ["right"])]), _h('panel', {
	    attrs: {
	      "title": "text-overflow",
	      "type": "primary"
	    }
	  }, [_h('text', {
	    staticClass: ["txt"],
	    staticStyle: {
	      lines: "1"
	    }
	  }, ["no text-overflow, no text-overflow"]), _h('text', {
	    staticClass: ["txt"],
	    staticStyle: {
	      textOverflow: "clip",
	      width: "450px",
	      lines: "1"
	    }
	  }, ["text-overflow: clip, text-overflow: clip"]), _h('text', {
	    staticClass: ["txt"],
	    staticStyle: {
	      textOverflow: "ellipsis",
	      width: "450px",
	      lines: "1"
	    }
	  }, ["text-overflow: ellipsis, text-overflow: ellipsis"])]), _h('panel', {
	    attrs: {
	      "title": "line-height",
	      "type": "primary"
	    }
	  }, [_h('text', {
	    staticClass: ["txt"]
	  }, ["no lineheight setting"]), _h('text', {
	    staticClass: ["txt"],
	    staticStyle: {
	      lineHeight: "50"
	    }
	  }, ["lineheight 50"]), _h('text', {
	    staticClass: ["txt"],
	    staticStyle: {
	      lineHeight: "80"
	    }
	  }, [" lineheight 80"])])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true

/***/ }

/******/ });