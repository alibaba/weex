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
	__vue_styles__.push(__webpack_require__(396)
	)

	/* script */
	__vue_exports__ = __webpack_require__(397)

	/* template */
	var __vue_template__ = __webpack_require__(402)
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
	__vue_options__.__file = "/Users/bobning/work/source/weex_fork/examples/vue/components/countdown.vue"
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

/***/ 396:
/***/ function(module, exports) {

	module.exports = {
	  "ctno1": {
	    "borderRadius": 8,
	    "paddingTop": 6,
	    "paddingBottom": 6,
	    "paddingRight": 4,
	    "paddingLeft": 4,
	    "marginLeft": 2,
	    "marginRight": 2,
	    "backgroundColor": "rgb(242,222,222)",
	    "color": "rgb(169,68,66)"
	  },
	  "ctno2": {
	    "borderRadius": 8,
	    "paddingTop": 30,
	    "paddingBottom": 30,
	    "paddingLeft": 16,
	    "paddingRight": 16,
	    "backgroundColor": "rgb(217,237,247)",
	    "color": "rgb(49,112,143)",
	    "textAlign": "center",
	    "fontSize": 40
	  }
	}

/***/ },

/***/ 397:
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
	//
	//

	module.exports = {
	  data: function data() {
	    return {
	      countdown1: {
	        remain: 5000,
	        time: {
	          D: '0',
	          hh: '00',
	          mm: '00',
	          ss: '00'
	        }
	      },
	      countdown2: {
	        remain: 5000,
	        time: {
	          MM: '0',
	          ss: '0'
	        }
	      }
	    };
	  },
	  components: {
	    panel: __webpack_require__(381),
	    countdown: __webpack_require__(398)
	  },
	  methods: {
	    tick: function tick(e, k) {
	      this[k].time = JSON.parse(JSON.stringify(e));
	    }
	  }
	};

/***/ },

/***/ 398:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = []

	/* styles */
	__vue_styles__.push(__webpack_require__(399)
	)

	/* script */
	__vue_exports__ = __webpack_require__(400)

	/* template */
	var __vue_template__ = __webpack_require__(401)
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
	__vue_options__.__file = "/Users/bobning/work/source/weex_fork/examples/vue/include/countdown.vue"
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

/***/ 399:
/***/ function(module, exports) {

	module.exports = {
	  "wrap": {
	    "overflow": "hidden"
	  }
	}

/***/ },

/***/ 400:
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

	function format(str) {
	  if (str.length >= 2) {
	    return str;
	  } else {
	    return '0' + str;
	  }
	}

	function getTime(target, now) {
	  var remain = parseInt((target - now) / 1000);
	  var D = String(parseInt(remain / 86400));
	  var DD = format(D);
	  var h = String(parseInt((remain - parseInt(D) * 86400) / 3600));
	  var hh = format(h);
	  var H = String(parseInt(remain / 3600));
	  var HH = format(H);
	  var m = String(parseInt((remain - parseInt(H) * 3600) / 60));
	  var mm = format(m);
	  var M = String(parseInt(remain / 60));
	  var MM = format(M);
	  var s = String(remain - parseInt(M) * 60);
	  var ss = format(s);
	  var S = String(remain);
	  var SS = format(S);
	  return {
	    D: D, DD: DD,
	    h: h, hh: hh,
	    H: H, HH: HH,
	    m: m, mm: mm,
	    M: M, MM: MM,
	    s: s, ss: ss,
	    S: S, SS: SS
	  };
	}

	module.exports = {
	  props: {
	    remain: {
	      default: 0
	    }
	  },
	  data: function data() {
	    return {
	      now: 0,
	      target: 0,
	      outofview: false
	    };
	  },
	  created: function created() {
	    this.now = Date.now();
	    this.target = this.now + this.remain * 1000;
	    if (this.remain > 0) {
	      this.run();
	    }
	  },
	  methods: {
	    run: function run() {
	      if (!this.outofview) {
	        this.now = Date.now();
	      }
	      var time = getTime(this.target, this.now);
	      if (this.target >= this.now) {
	        this.$emit('tick', time);
	      } else {
	        this.$emit('alarm', time);
	        return;
	      }
	      setTimeout(this.run.bind(this), 1000);
	    },
	    appeared: function appeared() {
	      this.outofview = false;
	    },
	    disappeared: function disappeared() {
	      this.outofview = true;
	    }
	  }
	};

/***/ },

/***/ 401:
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _h('div', {
	    staticStyle: {
	      overflow: "hidden",
	      flexDirection: "row"
	    },
	    on: {
	      "appear": _vm.appeared,
	      "disappear": _vm.disappeared
	    }
	  }, [_vm._t("default")])
	},staticRenderFns: []}
	module.exports.render._withStripped = true

/***/ },

/***/ 402:
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _h('scroller', [_h('panel', {
	    attrs: {
	      "title": "Countdown",
	      "type": "primary"
	    }
	  }, [_h('countdown', {
	    staticStyle: {
	      width: "750",
	      marginTop: "20",
	      marginBottom: "20"
	    },
	    attrs: {
	      "remain": _vm.countdown1.remain
	    },
	    on: {
	      "tick": function($event) {
	        _vm.tick($event, 'countdown1')
	      }
	    }
	  }, [_h('text', {
	    staticClass: ["ctno1"]
	  }, [_vm._s(_vm.countdown1.time.D)]), _h('text', {
	    staticClass: ["ctno1"],
	    staticStyle: {
	      backgroundColor: "#FFFFFF",
	      color: "#AAAAAA"
	    }
	  }, ["day(s)"]), _h('text', {
	    staticClass: ["ctno1"]
	  }, [_vm._s(_vm.countdown1.time.hh)]), _h('text', {
	    staticClass: ["ctno1"],
	    staticStyle: {
	      backgroundColor: "#FFFFFF",
	      color: "#AAAAAA"
	    }
	  }, ["hour(s)"]), _h('text', {
	    staticClass: ["ctno1"]
	  }, [_vm._s(_vm.countdown1.time.mm)]), _h('text', {
	    staticClass: ["ctno1"],
	    staticStyle: {
	      backgroundColor: "#FFFFFF",
	      color: "#AAAAAA"
	    }
	  }, ["minute(s)"]), _h('text', {
	    staticClass: ["ctno1"]
	  }, [_vm._s(_vm.countdown1.time.ss)]), _h('text', {
	    staticClass: ["ctno1"],
	    staticStyle: {
	      backgroundColor: "#FFFFFF",
	      color: "#AAAAAA"
	    }
	  }, ["second(s)"])]), _h('countdown', {
	    staticStyle: {
	      width: "600"
	    },
	    attrs: {
	      "remain": _vm.countdown2.remain
	    },
	    on: {
	      "tick": function($event) {
	        _vm.tick($event, 'countdown2')
	      }
	    }
	  }, [_h('text', {
	    staticClass: ["ctno2"]
	  }, [_vm._s(_vm.countdown2.time.MM)]), _h('text', {
	    staticClass: ["ctno2"],
	    staticStyle: {
	      backgroundColor: "#FFFFFF",
	      color: "#AAAAAA"
	    }
	  }, [":"]), _h('text', {
	    staticClass: ["ctno2"]
	  }, [_vm._s(_vm.countdown2.time.ss)])])])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true

/***/ }

/******/ });