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

	/* script */
	__vue_exports__ = __webpack_require__(466)

	/* template */
	var __vue_template__ = __webpack_require__(478)
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
	__vue_options__.__file = "/Users/bobning/work/source/weex_fork/examples/vue/index.vue"
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

/***/ 419:
/***/ function(module, exports) {

	exports.getBaseURL = function (vm) {
	  var bundleUrl = vm.$getConfig().bundleUrl;
	  var nativeBase;
	  var isAndroidAssets = bundleUrl.indexOf('your_current_IP') >= 0 || bundleUrl.indexOf('file://assets/')>=0;
	  var isiOSAssets = bundleUrl.indexOf('file:///') >= 0 && bundleUrl.indexOf('WeexDemo.app') > 0;
	  if (isAndroidAssets) {
	    nativeBase = 'file://assets/';
	  }
	  else if (isiOSAssets) {
	    // file:///var/mobile/Containers/Bundle/Application/{id}/WeexDemo.app/
	    // file:///Users/{user}/Library/Developer/CoreSimulator/Devices/{id}/data/Containers/Bundle/Application/{id}/WeexDemo.app/
	    nativeBase = bundleUrl.substring(0, bundleUrl.lastIndexOf('/') + 1);
	  }
	  else {
	    var host = 'localhost:12580';
	    var matches = /\/\/([^\/]+?)\//.exec(vm.$getConfig().bundleUrl);
	    if (matches && matches.length >= 2) {
	      host = matches[1];
	    }
	    nativeBase = 'http://' + host + '/' + vm.dir + '/build/';
	  }
	  var h5Base = './index.html?page=./' + vm.dir + '/build/';
	  // in Native
	  var base = nativeBase;
	  if (typeof window === 'object') {
	    // in Browser or WebView
	    base = h5Base;
	  }
	  return base
	}


/***/ },

/***/ 466:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//
	//
	//
	//

	module.exports = {
	  data: function data() {
	    return {
	      items: [
	      // common
	      { name: 'vue/syntax/hello-world', title: 'Hello World' }, { name: 'vue/style/index', title: 'Common Style' }, { name: 'vue/animation', title: 'Animation' },

	      // component
	      { name: 'vue/components/text', title: 'Text' }, { name: 'vue/components/image', title: 'Image' }, { name: 'vue/components/input', title: 'Input' }, { name: 'vue/components/scroller', title: 'Scroller' }, { name: 'vue/components/list', title: 'List' }, { name: 'vue/components/slider', title: 'Slider' }, { name: 'vue/components/a', title: 'A' }, { name: 'vue/components/video', title: 'Video' }, { name: 'vue/components/countdown', title: 'Countdown' }, { name: 'vue/components/marquee', title: 'Marquee' }, { name: 'vue/components/web', title: 'Web' }, { name: 'vue/components/navigator', title: 'Navigator' }, { name: 'vue/components/tabbar', title: 'Tabbar' },

	      // module
	      { name: 'vue/modules/instance-api', title: 'Instance API' }, { name: 'vue/modules/modal', title: 'Modal' }, { name: 'vue/modules/stream', title: 'Stream' }, { name: 'vue/modules/storage', title: 'Storage' },
	      // {name: 'module/clipboard', title: 'Clipboard'}, // 0.8 , developing

	      // showcase
	      { name: 'vue/showcase/progress', title: 'Progress Bar' }, { name: 'vue/showcase/itemlist', title: 'List (Advanced)' }, { name: 'vue/showcase/calculator', title: 'Calculator' }]
	    };
	  },
	  components: {
	    exampleList: __webpack_require__(467)
	  }
	};

/***/ },

/***/ 467:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = []

	/* script */
	__vue_exports__ = __webpack_require__(468)

	/* template */
	var __vue_template__ = __webpack_require__(477)
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
	__vue_options__.__file = "/Users/bobning/work/source/weex_fork/examples/vue/include/example-list.vue"
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

/***/ 468:
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

	var getBaseURL = __webpack_require__(419).getBaseURL;
	module.exports = {
	  props: {
	    dir: {
	      default: 'examples'
	    }, // examples, test ...
	    items: {
	      default: [{ name: 'hello', title: 'Hello World', url: '' }]
	    }
	  },
	  components: {
	    exampleListItem: __webpack_require__(469)
	  },
	  created: function created() {
	    var base = getBaseURL(this);
	    for (var i in this.items) {
	      var item = this.items[i];
	      if (!item.url) {
	        item.url = base + item.name + '.js';
	      }
	    }
	  }
	};

/***/ },

/***/ 469:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = []

	/* styles */
	__vue_styles__.push(__webpack_require__(470)
	)

	/* script */
	__vue_exports__ = __webpack_require__(471)

	/* template */
	var __vue_template__ = __webpack_require__(476)
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
	__vue_options__.__file = "/Users/bobning/work/source/weex_fork/examples/vue/include/example-list-item.vue"
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

/***/ 470:
/***/ function(module, exports) {

	module.exports = {
	  "item-txt": {
	    "fontSize": 48,
	    "color": "#555555"
	  }
	}

/***/ },

/***/ 471:
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

	var event = __weex_require_module__('event');
	module.exports = {
	  props: {
	    title: { default: '456' },
	    url: { default: '' }
	  },
	  components: {
	    listItem: __webpack_require__(472)
	  },
	  methods: {
	    redirect: function redirect() {
	      event.openURL(this.url);
	    }
	  }
	};

/***/ },

/***/ 472:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = []

	/* styles */
	__vue_styles__.push(__webpack_require__(473)
	)

	/* script */
	__vue_exports__ = __webpack_require__(474)

	/* template */
	var __vue_template__ = __webpack_require__(475)
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
	__vue_options__.__file = "/Users/bobning/work/source/weex_fork/examples/vue/include/list-item.vue"
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

/***/ 473:
/***/ function(module, exports) {

	module.exports = {
	  "item": {
	    "paddingTop": 25,
	    "paddingBottom": 25,
	    "paddingLeft": 35,
	    "paddingRight": 35,
	    "height": 160,
	    "justifyContent": "center",
	    "borderBottomWidth": 1,
	    "borderColor": "#dddddd"
	  }
	}

/***/ },

/***/ 474:
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

	module.exports = {
	  props: {
	    bgColor: { default: '#ffffff' }
	  },
	  methods: {
	    click: function click() {
	      this.$emit('click');
	    },
	    touchstart: function touchstart() {
	      // FIXME android touch
	      // TODO adaptive opposite bgColor
	      // this.bgColor = '#e6e6e6';
	    },
	    touchend: function touchend() {
	      // FIXME android touchend not triggered
	      // this.bgColor = '#ffffff';
	    }
	  }
	};

/***/ },

/***/ 475:
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _h('div', {
	    staticClass: ["item"],
	    style: {
	      backgroundColor: _vm.bgColor
	    },
	    on: {
	      "click": _vm.click,
	      "touchstart": _vm.touchstart,
	      "touchend": _vm.touchend
	    }
	  }, [_vm._t("default")])
	},staticRenderFns: []}
	module.exports.render._withStripped = true

/***/ },

/***/ 476:
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _h('list-item', {
	    on: {
	      "click": _vm.redirect
	    }
	  }, [_h('text', {
	    staticClass: ["item-txt"]
	  }, [_vm._s(_vm.title)])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true

/***/ },

/***/ 477:
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _h('list', [_vm._l((_vm.items), function(item) {
	    return _h('cell', {
	      appendAsTree: true,
	      attrs: {
	        "append": "tree"
	      }
	    }, [_h('example-list-item', {
	      attrs: {
	        "title": item.title,
	        "url": item.url
	      }
	    })])
	  })])
	},staticRenderFns: []}
	module.exports.render._withStripped = true

/***/ },

/***/ 478:
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _h('example-list', {
	    attrs: {
	      "items": _vm.items,
	      "dir": "examples"
	    }
	  })
	},staticRenderFns: []}
	module.exports.render._withStripped = true

/***/ }

/******/ });