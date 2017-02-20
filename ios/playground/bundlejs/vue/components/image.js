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
	__vue_styles__.push(__webpack_require__(403)
	)

	/* script */
	__vue_exports__ = __webpack_require__(404)

	/* template */
	var __vue_template__ = __webpack_require__(405)
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
	__vue_options__.__file = "/Users/bobning/work/source/weex_fork/examples/vue/components/image.vue"
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

/***/ 391:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = []

	/* styles */
	__vue_styles__.push(__webpack_require__(392)
	)

	/* script */
	__vue_exports__ = __webpack_require__(393)

	/* template */
	var __vue_template__ = __webpack_require__(394)
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
	__vue_options__.__file = "/Users/bobning/work/source/weex_fork/examples/vue/include/tip.vue"
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

/***/ 392:
/***/ function(module, exports) {

	module.exports = {
	  "tip": {
	    "paddingLeft": 36,
	    "paddingRight": 36,
	    "paddingTop": 36,
	    "paddingBottom": 36,
	    "borderRadius": 10
	  },
	  "tip-txt": {
	    "fontSize": 28
	  },
	  "tip-success": {
	    "backgroundColor": "#dff0d8",
	    "borderColor": "#d6e9c6"
	  },
	  "tip-txt-success": {
	    "color": "#3c763d"
	  },
	  "tip-info": {
	    "backgroundColor": "#d9edf7",
	    "borderColor": "#bce8f1"
	  },
	  "tip-txt-info": {
	    "color": "#31708f"
	  },
	  "tip-warning": {
	    "backgroundColor": "#fcf8e3",
	    "borderColor": "#faebcc"
	  },
	  "tip-txt-warning": {
	    "color": "#8a6d3b"
	  },
	  "tip-danger": {
	    "backgroundColor": "#f2dede",
	    "borderColor": "#ebccd1"
	  },
	  "tip-txt-danger": {
	    "color": "#a94442"
	  }
	}

/***/ },

/***/ 393:
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
	    type: { default: 'success' },
	    value: { default: '' }
	  }
	};

/***/ },

/***/ 394:
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _h('div', {
	    class: ['tip', 'tip-' + _vm.type]
	  }, [_h('text', {
	    class: ['tip-txt', 'tip-txt-' + _vm.type]
	  }, [_vm._s(_vm.value)])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true

/***/ },

/***/ 403:
/***/ function(module, exports) {

	module.exports = {
	  "img": {
	    "marginBottom": 20
	  }
	}

/***/ },

/***/ 404:
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

	module.exports = {
	  data: function data() {
	    return {
	      img: '//gw.alicdn.com/tps/i2/TB1DpsmMpXXXXabaXXX20ySQVXX-512-512.png_400x400.jpg'
	    };
	  },
	  components: {
	    panel: __webpack_require__(381),
	    tip: __webpack_require__(391)
	  }
	};

/***/ },

/***/ 405:
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _h('scroller', [_h('panel', {
	    attrs: {
	      "title": "width x height",
	      "type": "primary"
	    }
	  }, [_h('tip', {
	    staticStyle: {
	      marginBottom: "20px"
	    },
	    attrs: {
	      "type": "warning",
	      "value": "Weex screen width is 750"
	    }
	  }), _h('div', {
	    staticStyle: {
	      flexDirection: "row"
	    }
	  }, [_h('image', {
	    staticClass: ["img"],
	    staticStyle: {
	      width: "300px",
	      height: "300px"
	    },
	    attrs: {
	      "src": _vm.img
	    }
	  }), _h('image', {
	    staticClass: ["img"],
	    staticStyle: {
	      width: "200px",
	      height: "200px"
	    },
	    attrs: {
	      "src": _vm.img
	    }
	  }), _h('image', {
	    staticClass: ["img"],
	    staticStyle: {
	      width: "50px",
	      height: "50px"
	    },
	    attrs: {
	      "src": _vm.img
	    }
	  })])]), _h('panel', {
	    attrs: {
	      "title": "GIF Animation",
	      "type": "primary"
	    }
	  }, [_h('tip', {
	    staticStyle: {
	      marginBottom: "20px"
	    },
	    attrs: {
	      "type": "warning",
	      "value": "Depanding on Native ImageSDK"
	    }
	  }), _h('div', {
	    staticStyle: {
	      flexDirection: "row"
	    }
	  }, [_h('image', {
	    staticClass: ["img"],
	    staticStyle: {
	      width: "96px",
	      height: "96px"
	    },
	    attrs: {
	      "src": "https://gtd.alicdn.com/tps/i4/T1HcvHXd4nXXb6ROYh-48-48.gif"
	    }
	  }), _h('image', {
	    staticClass: ["img"],
	    staticStyle: {
	      width: "68px",
	      height: "68px",
	      marginLeft: "20px"
	    },
	    attrs: {
	      "src": "https://gw.alicdn.com/tps/TB1El.mKXXXXXXyapXXXXXXXXXX-34-34.gif"
	    }
	  })])]), _h('panel', {
	    attrs: {
	      "title": "Base64",
	      "type": "primary"
	    }
	  }, [_h('tip', {
	    staticStyle: {
	      marginBottom: "20px"
	    },
	    attrs: {
	      "type": "warning",
	      "value": "Depanding on Native ImageSDK"
	    }
	  }), _h('div', {
	    staticStyle: {
	      flexDirection: "row"
	    }
	  }, [_h('image', {
	    staticClass: ["img"],
	    staticStyle: {
	      width: "96px",
	      height: "96px"
	    },
	    attrs: {
	      "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAMAAABgOjJdAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAO1QTFRFhomSb3J8XGBrdnqDgYWNlJefV1tmfoGKU1diT1NfgISNgoWOYmZwio2Vi4+Wc3eAkJObZGhzUlZiaGt2U1djfYCKZGdyhYiQeHyFio6VgYWOVVllbHB6XWFsY2ZxaWx3jZCYXmFsfYCJcnZ/UVVham54V1tng4aPb3N8WV1pX2JtZWl0YWVvVlpmiYyUWVxohomRd3uEdHiBeX2GZ2t1hIeQVFhkf4OMbnJ8fYGKdnqEb3N9kJScY2dycnaAjpKZdHeBjpKajI+Yc3eBhYiRf4KLXmFtio6Wi4+XjZCZkJSbkZScjI+XlJifTlJe+rAZcwAAAZBJREFUeNp0lOeWgjAQhSdUBQRRbFjX7tpW3XUt23tL3v9xNigJIHh/zRk+5iR3ZgIkULWmwgv+A7VWDWWBR/nSt2gLUzIVbLH1lo8RRW1wEfqxPtCKUaKTMUhURuUhTIi6Q07l6LuAEFdpEld6tWNEx00CKKJ3jsR1xSHJcj4bB+LmkpxT49Yj8mqQUVBBciUk8ITepESJ+5AqY1+uwny5IjDPcADoN0BIwjLOsjKZOewtbi/9fvi338a44CetIai2H/cokPLj9tfEj2wVzD4rIWMlfpu+CXc5Pw4qh5X7AUw4gZIswUENGT8lAN1fMBVeAxIIxYR3Nin0imOe52emdxkyP8aY+0S9Y2d63cNoxvACRTaeI70slst+cjYCAnXmuuS1RKKmy1hKBX0hzaC3KOsxsmz2Ir2NzMcEbVCo+cf5oDOWOzNAucpxxoglnZlT1+KzXk4kymKwL4ttN+73dhHeuWV85zLL073Vw3v7MdDuE3a/JRrCmqwFQ2yV8gmvg/d+aPCMH0GLvB//AgwAo1MTpxsaxVoAAAAASUVORK5CYII="
	    }
	  }), _h('image', {
	    staticClass: ["img"],
	    staticStyle: {
	      width: "68px",
	      height: "68px",
	      marginLeft: "20px"
	    },
	    attrs: {
	      "src": "data:image/gif;base64,R0lGODlhIgAiANU7AMvLy83Nzdra2srKysnJyejo6MbGxtzc3M7Ozuzs7NTU1N3d3fz8/NfX1/j4+Ovr6+/v79DQ0Obm5v39/d/f3/f398/Pz9vb2+np6fn5+f7+/tXV1fX19dnZ2erq6tHR0fb29sjIyMfHx+Li4vLy8u7u7ufn5/r6+uPj49bW1tPT09LS0sTExPT09ODg4O3t7eHh4eTk5MXFxd7e3vHx8fPz8/Dw8OXl5djY2P///8zMzP///wAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0Q0QxODlDNENEOEQxMUUzOEIzM0I1ODVGNjU1MjBBQiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo0Q0QxODlDNUNEOEQxMUUzOEIzM0I1ODVGNjU1MjBBQiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjRDRDE4OUMyQ0Q4RDExRTM4QjMzQjU4NUY2NTUyMEFCIiBzdFJl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"
	    }
	  })])]), _h('panel', {
	    attrs: {
	      "title": "resize",
	      "type": "primary"
	    }
	  }, [_h('panel', {
	    attrs: {
	      "title": "resize=stretch(default) 600 x 200 "
	    }
	  }, [_h('image', {
	    staticClass: ["img"],
	    staticStyle: {
	      width: "600px",
	      height: "200px",
	      borderStyle: "solid",
	      borderWidth: "1px",
	      borderColor: "#333"
	    },
	    attrs: {
	      "src": _vm.img,
	      "resize": "stretch"
	    }
	  })]), _h('panel', {
	    attrs: {
	      "title": "resize=contain 600 x 200 "
	    }
	  }, [_h('image', {
	    staticClass: ["img"],
	    staticStyle: {
	      width: "600px",
	      height: "200px",
	      borderStyle: "solid",
	      borderWidth: "1px",
	      borderColor: "#333"
	    },
	    attrs: {
	      "src": _vm.img,
	      "resize": "contain"
	    }
	  })]), _h('panel', {
	    attrs: {
	      "title": "resize=cover 600 x 200"
	    }
	  }, [_h('image', {
	    staticClass: ["img"],
	    staticStyle: {
	      width: "600px",
	      height: "200px",
	      borderStyle: "solid",
	      borderWidth: "1px",
	      borderColor: "#333"
	    },
	    attrs: {
	      "src": _vm.img,
	      "resize": "cover"
	    }
	  })])])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true

/***/ }

/******/ });