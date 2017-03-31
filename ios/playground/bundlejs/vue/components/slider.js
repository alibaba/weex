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
	__vue_styles__.push(__webpack_require__(432)
	)

	/* script */
	__vue_exports__ = __webpack_require__(433)

	/* template */
	var __vue_template__ = __webpack_require__(442)
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
	__vue_options__.__file = "/Users/bobning/work/source/weex_fork/examples/vue/components/slider.vue"
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

/***/ 432:
/***/ function(module, exports) {

	module.exports = {
	  "body": {
	    "backgroundColor": "#ffffff"
	  },
	  "slider": {
	    "flexDirection": "row",
	    "width": 690,
	    "height": 360
	  },
	  "indicator": {
	    "position": "absolute",
	    "width": 690,
	    "height": 420,
	    "top": 140,
	    "left": 240,
	    "itemColor": "#dddddd",
	    "itemSelectedColor": "rgb(40, 96, 144)"
	  }
	}

/***/ },

/***/ 433:
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

	var img0 = '//gw.alicdn.com/tps/i2/TB1DpsmMpXXXXabaXXX20ySQVXX-512-512.png_400x400.jpg';
	var img1 = '//gw.alicdn.com/tps/i1/TB1M3sQMpXXXXakXXXXApNeJVXX-360-360.png';
	module.exports = {
	  data: function data() {
	    return {
	      eventCnt: 0,
	      togglePlayMsg: 'pause',
	      sliders: [{
	        interval: 1000,
	        autoPlay: true,
	        sliderPages: [{
	          items: [{
	            image: img0,
	            link: '//h5.m.taobao.com/1'
	          }, {
	            image: img0,
	            link: '//h5.m.taobao.com/1'
	          }]
	        }, {
	          items: [{
	            image: img1,
	            link: '//h5.m.taobao.com/1'
	          }, {
	            image: img1,
	            link: '//h5.m.taobao.com/1'
	          }]
	        }, {
	          items: [{
	            image: img0,
	            link: '//h5.m.taobao.com/1'
	          }, {
	            image: img1,
	            link: '//h5.m.taobao.com/1'
	          }]
	        }]
	      }, {
	        interval: 3000,
	        autoPlay: true,
	        sliderPages: [{
	          items: [{
	            image: img0,
	            link: '//h5.m.taobao.com/1'
	          }, {
	            image: img0,
	            link: '//h5.m.taobao.com/1'
	          }]
	        }, {
	          items: [{
	            image: img1,
	            link: '//h5.m.taobao.com/1'
	          }, {
	            image: img1,
	            link: '//h5.m.taobao.com/1'
	          }]
	        }, {
	          items: [{
	            image: img0,
	            link: '//h5.m.taobao.com/1'
	          }, {
	            image: img1,
	            link: '//h5.m.taobao.com/1'
	          }]
	        }]
	      }, {
	        interval: 5000,
	        autoPlay: true,
	        sliderPages: [{
	          items: [{
	            image: img0,
	            link: '//h5.m.taobao.com/1'
	          }, {
	            image: img0,
	            link: '//h5.m.taobao.com/1'
	          }]
	        }, {
	          items: [{
	            image: img1,
	            link: '//h5.m.taobao.com/1'
	          }, {
	            image: img1,
	            link: '//h5.m.taobao.com/1'
	          }]
	        }, {
	          items: [{
	            image: img0,
	            link: '//h5.m.taobao.com/1'
	          }, {
	            image: img1,
	            link: '//h5.m.taobao.com/1'
	          }]
	        }]
	      }]
	    };
	  },
	  components: {
	    panel: __webpack_require__(381),
	    sliderPage: __webpack_require__(434)
	  },
	  methods: {
	    togglePlay: function togglePlay() {
	      var autoPlay = this.sliders[0].autoPlay;
	      autoPlay = !autoPlay;
	      this.sliders[0].autoPlay = autoPlay;
	      this.togglePlayMsg = autoPlay ? 'pause' : 'play';
	    },
	    handleSliderChange: function handleSliderChange() {
	      var nowCnt = this.eventCnt + 1;
	      this.eventCnt = nowCnt;
	    },
	    setInterval1: function setInterval1() {
	      this.sliders[0].interval = 1000;
	    },
	    setInterval3: function setInterval3() {
	      this.sliders[0].interval = 3000;
	    },
	    setInterval5: function setInterval5() {
	      this.sliders[0].interval = 5000;
	    }
	  }
	};

/***/ },

/***/ 434:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = []

	/* styles */
	__vue_styles__.push(__webpack_require__(435)
	)

	/* script */
	__vue_exports__ = __webpack_require__(436)

	/* template */
	var __vue_template__ = __webpack_require__(441)
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
	__vue_options__.__file = "/Users/bobning/work/source/weex_fork/examples/vue/include/slider-page.vue"
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

/***/ 435:
/***/ function(module, exports) {

	module.exports = {
	  "slider-page": {
	    "flexDirection": "row",
	    "justifyContent": "space-between",
	    "width": 714,
	    "height": 420
	  }
	}

/***/ },

/***/ 436:
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

	module.exports = {
	  props: {
	    items: { default: [] }
	  },
	  components: {
	    sliderItem: __webpack_require__(437)
	  }
	};

/***/ },

/***/ 437:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = []

	/* styles */
	__vue_styles__.push(__webpack_require__(438)
	)

	/* script */
	__vue_exports__ = __webpack_require__(439)

	/* template */
	var __vue_template__ = __webpack_require__(440)
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
	__vue_options__.__file = "/Users/bobning/work/source/weex_fork/examples/vue/include/slider-item.vue"
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

/***/ 438:
/***/ function(module, exports) {

	module.exports = {
	  "slider-item": {
	    "width": 348,
	    "height": 400
	  }
	}

/***/ },

/***/ 439:
/***/ function(module, exports) {

	'use strict';

	//
	//
	//
	//

	module.exports = {
	  props: {
	    image: { default: '' },
	    link: { default: '' }
	  }
	};

/***/ },

/***/ 440:
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _h('image', {
	    staticClass: ["slider-item"],
	    attrs: {
	      "src": _vm.image
	    }
	  })
	},staticRenderFns: []}
	module.exports.render._withStripped = true

/***/ },

/***/ 441:
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _h('div', {
	    staticClass: ["slider-page"]
	  }, [_vm._l((_vm.items), function(v) {
	    return _h('slider-item', {
	      attrs: {
	        "image": v.image,
	        "link": v.link
	      }
	    })
	  })])
	},staticRenderFns: []}
	module.exports.render._withStripped = true

/***/ },

/***/ 442:
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _h('scroller', {
	    staticClass: ["body"]
	  }, [_h('panel', {
	    attrs: {
	      "title": "auto-play",
	      "type": "primary"
	    }
	  }, [_h('panel', {
	    attrs: {
	      "title": "auto-play = false",
	      "padding-body": "0"
	    }
	  }, [_h('slider', {
	    staticClass: ["slider"],
	    appendAsTree: true,
	    attrs: {
	      "append": "tree",
	      "interval": _vm.sliders[1].interval,
	      "autoPlay": "false"
	    }
	  }, [_h('indicator', {
	    staticClass: ["indicator"]
	  }), _vm._l((_vm.sliders[1].sliderPages), function(v) {
	    return _h('slider-page', {
	      attrs: {
	        "items": v.items
	      }
	    })
	  })])]), _h('panel', {
	    attrs: {
	      "title": "auto-play = true",
	      "padding-body": "0"
	    }
	  }, [_h('slider', {
	    staticClass: ["slider"],
	    appendAsTree: true,
	    attrs: {
	      "append": "tree",
	      "interval": _vm.sliders[0].interval,
	      "autoPlay": _vm.sliders[0].autoPlay
	    }
	  }, [_h('indicator', {
	    staticClass: ["indicator"]
	  }), _vm._l((_vm.sliders[0].sliderPages), function(v) {
	    return _h('slider-page', {
	      attrs: {
	        "items": v.items
	      }
	    })
	  })])])]), _h('panel', {
	    attrs: {
	      "title": 'Event, ' + _vm.eventCnt + ' change',
	      "type": "primary"
	    }
	  }, [_h('slider', {
	    staticClass: ["slider"],
	    appendAsTree: true,
	    attrs: {
	      "append": "tree",
	      "interval": _vm.sliders[0].interval,
	      "autoPlay": _vm.sliders[0].autoPlay
	    },
	    on: {
	      "change": _vm.handleSliderChange
	    }
	  }, [_h('indicator', {
	    staticClass: ["indicator"]
	  }), _vm._l((_vm.sliders[0].sliderPages), function(v) {
	    return _h('slider-page', {
	      attrs: {
	        "items": v.items
	      }
	    })
	  })])]), _h('panel', {
	    attrs: {
	      "title": "Indicator",
	      "type": "primary"
	    }
	  }, [_h('panel', {
	    attrs: {
	      "title": "default style",
	      "padding-body": "0"
	    }
	  }, [_h('slider', {
	    staticClass: ["slider"],
	    appendAsTree: true,
	    attrs: {
	      "append": "tree",
	      "interval": _vm.sliders[0].interval,
	      "autoPlay": _vm.sliders[0].autoPlay
	    },
	    on: {
	      "change": _vm.handleSliderChange
	    }
	  }, [_h('indicator', {
	    staticClass: ["indicator"]
	  }), _vm._l((_vm.sliders[0].sliderPages), function(v) {
	    return _h('slider-page', {
	      attrs: {
	        "items": v.items
	      }
	    })
	  })])]), _h('panel', {
	    attrs: {
	      "title": "width & height",
	      "padding-body": "0"
	    }
	  }, [_h('slider', {
	    staticClass: ["slider"],
	    appendAsTree: true,
	    attrs: {
	      "append": "tree",
	      "interval": _vm.sliders[0].interval,
	      "autoPlay": _vm.sliders[0].autoPlay
	    }
	  }, [_h('indicator', {
	    staticStyle: {
	      itemColor: "#dddddd",
	      width: "714",
	      height: "460"
	    }
	  }), _vm._l((_vm.sliders[0].sliderPages), function(v) {
	    return _h('slider-page', {
	      attrs: {
	        "items": v.items
	      }
	    })
	  })])]), _h('panel', {
	    attrs: {
	      "title": "left & top",
	      "padding-body": "0"
	    }
	  }, [_h('slider', {
	    staticClass: ["slider"],
	    appendAsTree: true,
	    attrs: {
	      "append": "tree",
	      "interval": _vm.sliders[1].interval,
	      "autoPlay": _vm.sliders[1].autoPlay
	    }
	  }, [_h('indicator', {
	    staticClass: ["indicator"],
	    staticStyle: {
	      top: "-140",
	      left: "-240"
	    }
	  }), _vm._l((_vm.sliders[1].sliderPages), function(v) {
	    return _h('slider-page', {
	      attrs: {
	        "items": v.items
	      }
	    })
	  })])]), _h('panel', {
	    attrs: {
	      "title": "itemColor & itemSelectedColor",
	      "padding-body": "0"
	    }
	  }, [_h('slider', {
	    staticClass: ["slider"],
	    appendAsTree: true,
	    attrs: {
	      "append": "tree",
	      "interval": _vm.sliders[2].interval,
	      "autoPlay": _vm.sliders[2].autoPlay
	    }
	  }, [_h('indicator', {
	    staticClass: ["indicator"],
	    staticStyle: {
	      itemSelectedColor: "rgb(217, 83, 79)"
	    }
	  }), _vm._l((_vm.sliders[2].sliderPages), function(v) {
	    return _h('slider-page', {
	      attrs: {
	        "items": v.items
	      }
	    })
	  })])]), _h('panel', {
	    attrs: {
	      "title": "itemSize",
	      "padding-body": "0"
	    }
	  }, [_h('slider', {
	    staticClass: ["slider"],
	    appendAsTree: true,
	    attrs: {
	      "append": "tree",
	      "interval": _vm.sliders[1].interval,
	      "autoPlay": _vm.sliders[1].autoPlay
	    }
	  }, [_h('indicator', {
	    staticStyle: {
	      itemColor: "#dddddd",
	      itemSize: "40",
	      top: "140",
	      left: "180",
	      width: "700",
	      height: "380"
	    }
	  }), _vm._l((_vm.sliders[1].sliderPages), function(v) {
	    return _h('slider-page', {
	      attrs: {
	        "items": v.items
	      }
	    })
	  })])])])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true

/***/ }

/******/ });