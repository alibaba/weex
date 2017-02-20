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
	__vue_styles__.push(__webpack_require__(379)
	)

	/* script */
	__vue_exports__ = __webpack_require__(380)

	/* template */
	var __vue_template__ = __webpack_require__(389)
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
	__vue_options__.__file = "/Users/bobning/work/source/weex_fork/examples/vue/animation.vue"
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

/***/ 379:
/***/ function(module, exports) {

	module.exports = {
	  "block": {
	    "position": "absolute",
	    "width": 250,
	    "height": 250,
	    "top": 300,
	    "left": 400,
	    "backgroundColor": "#F0AD4E",
	    "alignItems": "center",
	    "justifyContent": "center"
	  },
	  "block-txt": {
	    "color": "#FFFFFF",
	    "fontSize": 70
	  }
	}

/***/ },

/***/ 380:
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

	var animation = __weex_require_module__('animation');
	module.exports = {
	  data: function data() {
	    return {
	      transformOrigin: 'center center',
	      current_rotate: 0,
	      current_scale: 1,
	      current_color: '#FF0000',
	      current_opacity: 1,
	      current_translate: '',
	      current_transform: '',
	      isStop: true
	    };
	  },
	  components: {
	    panel: __webpack_require__(381),
	    button: __webpack_require__(385)
	  },
	  methods: {
	    anim: function anim(styles, timingFunction, duration, callback) {
	      animation.transition(this.$refs.block.ref, {
	        styles: styles,
	        timingFunction: timingFunction,
	        duration: duration
	      }, callback);
	    },
	    rotate: function rotate() {
	      var self = this;
	      self.current_rotate += 90;
	      self.anim({
	        transform: 'rotate(' + self.current_rotate + 'deg)'
	      }, 'ease-in-out', 500, function () {
	        if (self.current_rotate === 360) {
	          self.current_rotate = 0;
	        } else {
	          self.rotate();
	        }
	      });
	    },
	    translate: function translate() {
	      this.current_translate = this.current_translate ? '' : 'translate(50%, 50%)';
	      this.anim({
	        transform: this.current_translate
	      }, 'ease-in', 500, function () {});
	    },
	    scale: function scale() {
	      var self = this;
	      self.current_scale = self.current_scale === 2 ? .5 : 2;
	      self.anim({
	        transform: 'scale(' + self.current_scale + ')'
	      }, 'linear', 500, function () {});
	    },
	    transform: function transform() {
	      var self = this;
	      this.current_transform = this.current_transform ? '' : 'rotate(45deg) scale(1.5)';
	      this.anim({
	        transform: this.current_transform,
	        transformOrigin: 'left top'
	      }, 'ease-out', 500, function () {
	        if (self.current_transform !== '') {
	          self.anim({
	            transform: 'rotate(-90deg) scale(1.2)',
	            transformOrigin: 'left top'
	          }, 'ease-out', 500, function () {});
	        } else {}
	      });
	    },
	    composite: function composite() {
	      var self = this;
	      self.current_transform = self.current_transform ? '' : 'rotate(45deg) scale(1.5) translate(50%, 50%)';
	      self.current_color = self.current_color === '#F0AD4E' ? '#D9534F' : '#F0AD4E';
	      self.current_opacity = self.current_opacity === 1 ? 0.1 : 1;
	      this.anim({
	        transform: this.current_transform,
	        transformOrigin: 'left top',
	        backgroundColor: self.current_color,
	        opacity: self.current_opacity
	      }, 'ease-out', 1000, function () {});
	    },
	    color: function color() {
	      var self = this;
	      self.current_color = self.current_color === '#F0AD4E' ? '#D9534F' : '#F0AD4E';
	      self.anim({
	        backgroundColor: self.current_color
	      }, 'linear', 500, function () {});
	    },
	    opacity: function opacity() {
	      var self = this;
	      self.current_opacity = self.current_opacity === 1 ? 0.1 : 1;
	      self.anim({
	        opacity: self.current_opacity
	      }, 'linear', 500, function () {});
	    }
	  }
	};

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

/***/ 385:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = []

	/* styles */
	__vue_styles__.push(__webpack_require__(386)
	)

	/* script */
	__vue_exports__ = __webpack_require__(387)

	/* template */
	var __vue_template__ = __webpack_require__(388)
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
	__vue_options__.__file = "/Users/bobning/work/source/weex_fork/examples/vue/include/button.vue"
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

/***/ 386:
/***/ function(module, exports) {

	module.exports = {
	  "btn": {
	    "marginBottom": 0,
	    "alignItems": "center",
	    "justifyContent": "center",
	    "borderWidth": 1,
	    "borderStyle": "solid",
	    "borderColor": "#333333"
	  },
	  "btn-default": {
	    "color": "rgb(51,51,51)"
	  },
	  "btn-primary": {
	    "backgroundColor": "rgb(40,96,144)",
	    "borderColor": "rgb(40,96,144)"
	  },
	  "btn-success": {
	    "backgroundColor": "rgb(92,184,92)",
	    "borderColor": "rgb(76,174,76)"
	  },
	  "btn-info": {
	    "backgroundColor": "rgb(91,192,222)",
	    "borderColor": "rgb(70,184,218)"
	  },
	  "btn-warning": {
	    "backgroundColor": "rgb(240,173,78)",
	    "borderColor": "rgb(238,162,54)"
	  },
	  "btn-danger": {
	    "backgroundColor": "rgb(217,83,79)",
	    "borderColor": "rgb(212,63,58)"
	  },
	  "btn-link": {
	    "borderColor": "rgba(0,0,0,0)",
	    "borderRadius": 0
	  },
	  "btn-txt-default": {
	    "color": "rgb(51,51,51)"
	  },
	  "btn-txt-primary": {
	    "color": "rgb(255,255,255)"
	  },
	  "btn-txt-success": {
	    "color": "rgb(255,255,255)"
	  },
	  "btn-txt-info": {
	    "color": "rgb(255,255,255)"
	  },
	  "btn-txt-warning": {
	    "color": "rgb(255,255,255)"
	  },
	  "btn-txt-danger": {
	    "color": "rgb(255,255,255)"
	  },
	  "btn-txt-link": {
	    "color": "rgb(51,122,183)"
	  },
	  "btn-sz-large": {
	    "width": 300,
	    "height": 100,
	    "paddingTop": 25,
	    "paddingBottom": 25,
	    "paddingLeft": 40,
	    "paddingRight": 40,
	    "borderRadius": 15
	  },
	  "btn-sz-middle": {
	    "width": 240,
	    "height": 80,
	    "paddingTop": 15,
	    "paddingBottom": 15,
	    "paddingLeft": 30,
	    "paddingRight": 30,
	    "borderRadius": 10
	  },
	  "btn-sz-small": {
	    "width": 170,
	    "height": 60,
	    "paddingTop": 12,
	    "paddingBottom": 12,
	    "paddingLeft": 25,
	    "paddingRight": 25,
	    "borderRadius": 7
	  },
	  "btn-txt-sz-large": {
	    "fontSize": 45
	  },
	  "btn-txt-sz-middle": {
	    "fontSize": 35
	  },
	  "btn-txt-sz-small": {
	    "fontSize": 30
	  }
	}

/***/ },

/***/ 387:
/***/ function(module, exports) {

	'use strict';

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
	    size: { default: 'large' },
	    value: { default: '' }
	  }
	};

/***/ },

/***/ 388:
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _h('div', {
	    class: ['btn', 'btn-' + _vm.type, 'btn-sz-' + _vm.size]
	  }, [_h('text', {
	    class: ['btn-txt', 'btn-txt-' + _vm.type, 'btn-txt-sz-' + _vm.size]
	  }, [_vm._s(_vm.value)])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true

/***/ },

/***/ 389:
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _h('div', [_h('panel', {
	    attrs: {
	      "title": "Transform",
	      "type": "primary"
	    }
	  }, [_h('button', {
	    attrs: {
	      "value": "Rotate",
	      "type": "primary",
	      "size": "middle"
	    },
	    nativeOn: {
	      "click": function($event) {
	        _vm.rotate($event)
	      }
	    }
	  }), _h('button', {
	    staticStyle: {
	      marginTop: "12px"
	    },
	    attrs: {
	      "value": "Scale",
	      "type": "primary",
	      "size": "middle"
	    },
	    nativeOn: {
	      "click": function($event) {
	        _vm.scale($event)
	      }
	    }
	  }), _h('button', {
	    staticStyle: {
	      marginTop: "12px"
	    },
	    attrs: {
	      "value": "Translate",
	      "type": "primary",
	      "size": "middle"
	    },
	    nativeOn: {
	      "click": function($event) {
	        _vm.translate($event)
	      }
	    }
	  }), _h('button', {
	    staticStyle: {
	      marginTop: "12px"
	    },
	    attrs: {
	      "value": "Transform",
	      "type": "success",
	      "size": "middle"
	    },
	    nativeOn: {
	      "click": function($event) {
	        _vm.transform($event)
	      }
	    }
	  })]), _h('panel', {
	    attrs: {
	      "title": "Others",
	      "type": "primary"
	    }
	  }, [_h('button', {
	    attrs: {
	      "value": "BgColor",
	      "type": "primary",
	      "size": "middle"
	    },
	    nativeOn: {
	      "click": function($event) {
	        _vm.color($event)
	      }
	    }
	  }), _h('button', {
	    staticStyle: {
	      marginTop: "12px"
	    },
	    attrs: {
	      "value": "Opacity",
	      "type": "primary",
	      "size": "middle"
	    },
	    nativeOn: {
	      "click": function($event) {
	        _vm.opacity($event)
	      }
	    }
	  }), _h('button', {
	    staticStyle: {
	      marginTop: "12px"
	    },
	    attrs: {
	      "value": "All",
	      "type": "success",
	      "size": "middle"
	    },
	    nativeOn: {
	      "click": function($event) {
	        _vm.composite($event)
	      }
	    }
	  })]), _h('div', {
	    ref: "block",
	    staticClass: ["block"],
	    style: {
	      transformOrigin: _vm.transformOrigin
	    }
	  }, [_h('text', {
	    staticClass: ["block-txt"]
	  }, ["Anim"])])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true

/***/ }

/******/ });