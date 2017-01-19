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

	var __weex_template__ = __webpack_require__(226)
	var __weex_style__ = __webpack_require__(227)
	var __weex_script__ = __webpack_require__(228)

	__weex_define__('@weex-component/ffbcbcf1bd6120b070f00ceafeb0160e', [], function(__weex_require__, __weex_exports__, __weex_module__) {

	    __weex_script__(__weex_module__, __weex_exports__, __weex_require__)
	    if (__weex_exports__.__esModule && __weex_exports__.default) {
	      __weex_module__.exports = __weex_exports__.default
	    }

	    __weex_module__.exports.template = __weex_template__

	    __weex_module__.exports.style = __weex_style__

	})

	__weex_bootstrap__('@weex-component/ffbcbcf1bd6120b070f00ceafeb0160e',undefined,undefined)

/***/ },

/***/ 226:
/***/ function(module, exports) {

	module.exports = {
	  "type": "div",
	  "classList": [
	    "select-container"
	  ],
	  "children": [
	    {
	      "type": "div",
	      "classList": [
	        "content"
	      ],
	      "children": [
	        {
	          "type": "content"
	        }
	      ]
	    },
	    {
	      "type": "div",
	      "classList": [
	        "mask"
	      ],
	      "id": "mask",
	      "events": {
	        "click": "switchView"
	      }
	    },
	    {
	      "type": "div",
	      "classList": [
	        "options"
	      ],
	      "id": "options",
	      "children": [
	        {
	          "type": "div",
	          "repeat": function () {return this.status},
	          "classList": [
	            "cell"
	          ],
	          "attr": {
	            "vid": function () {return this.id}
	          },
	          "events": {
	            "click": "onItemClick"
	          },
	          "children": [
	            {
	              "type": "text",
	              "classList": function () {return ['name', this.id==this.statusId?'current':'']},
	              "attr": {
	                "value": function () {return this.name}
	              }
	            },
	            {
	              "type": "image",
	              "classList": [
	                "icon-curr-flag"
	              ],
	              "attr": {
	                "src": function () {return this.flagSrc}
	              },
	              "shown": function () {return this.id==this.statusId}
	            }
	          ]
	        }
	      ]
	    },
	    {
	      "type": "div",
	      "classList": [
	        "select"
	      ],
	      "events": {
	        "click": "switchView"
	      },
	      "children": [
	        {
	          "type": "text",
	          "classList": [
	            "current-text"
	          ],
	          "attr": {
	            "value": function () {return this.statusName}
	          }
	        },
	        {
	          "type": "image",
	          "classList": [
	            "icon-arrow"
	          ],
	          "id": "arrow",
	          "attr": {
	            "src": function () {return this.arrowSrc}
	          }
	        }
	      ]
	    }
	  ]
	}

/***/ },

/***/ 227:
/***/ function(module, exports) {

	module.exports = {
	  "select-container": {
	    "flexDirection": "column",
	    "position": "relative",
	    "zIndex": 1000
	  },
	  "content": {
	    "width": 750,
	    "marginTop": 90
	  },
	  "mask": {
	    "position": "absolute",
	    "top": 0,
	    "left": 0,
	    "bottom": 0,
	    "right": 0,
	    "flex": 1,
	    "width": 750,
	    "backgroundColor": "rgba(0,0,0,0.5)",
	    "visibility": "hidden"
	  },
	  "select": {
	    "width": 750,
	    "height": 90,
	    "flexDirection": "row",
	    "alignItems": "center",
	    "justifyContent": "space-between",
	    "paddingLeft": 30,
	    "paddingRight": 30,
	    "borderBottomWidth": 1,
	    "borderStyle": "solid",
	    "borderColor": "#dddddd",
	    "backgroundColor": "#eeeeee",
	    "zIndex": 1001,
	    "position": "absolute",
	    "top": 0
	  },
	  "current-text": {
	    "color": "#333333",
	    "fontSize": 33,
	    "flex": 1
	  },
	  "icon-arrow": {
	    "width": 27,
	    "height": 23
	  },
	  "options": {
	    "position": "absolute",
	    "top": -181,
	    "width": 750,
	    "backgroundColor": "#ffffff",
	    "transformOrigin": "center center"
	  },
	  "cell": {
	    "flexDirection": "row",
	    "justifyContent": "space-between",
	    "alignItems": "center",
	    "width": 750,
	    "height": 90,
	    "paddingLeft": 30,
	    "paddingRight": 30,
	    "borderBottomWidth": 1,
	    "borderStyle": "solid",
	    "borderColor": "#dddddd"
	  },
	  "name": {
	    "color": "#333333",
	    "fontSize": 33,
	    "flex": 1
	  },
	  "icon-curr-flag": {
	    "width": 32,
	    "height": 32
	  },
	  "current": {
	    "color": "#0088FB"
	  }
	}

/***/ },

/***/ 228:
/***/ function(module, exports) {

	module.exports = function(module, exports, __weex_require__){'use strict';

	var animation = __weex_require__('@weex-module/animation');

	module.exports = {
	    data: function () {return {
	        statusId: '0',
	        status: [{ id: '0', name: 'All' }, { id: '1', name: 'Doing' }, { id: '2', name: 'Done' }],
	        flagSrc: 'https://gw.alicdn.com/tps/TB11a2lKFXXXXbVXpXXXXXXXXXX-32-32.png',
	        arrowSrc: 'https://gw.alicdn.com/tps/TB1O3_aKFXXXXXdXVXXXXXXXXXX-27-23.png'
	    }},
	    computed: {
	        statusName: {
	            get: function get() {
	                var id = this.statusId;
	                return this.status.filter(function (s) {
	                    return s.id == id;
	                })[0].name;
	            }
	        }
	    },
	    methods: {
	        switchView: function switchView() {
	            this.toggleMaskVisible();

	            this.opacity(this._ids.mask.el.ref);
	            this.collapse(this._ids.options.el.ref);
	            this.rotate(this._ids.arrow.el.ref);
	        },

	        onItemClick: function onItemClick(e) {
	            var vid = e.target.attr.vid;
	            this.updateStatus(vid);
	            this.switchView();
	            this.$dispatch('statuschange', {
	                id: this.statusId,
	                name: this.statusName
	            });
	        },

	        updateStatus: function updateStatus(id) {
	            this.statusId = id;
	        },

	        toggleMaskVisible: function toggleMaskVisible() {
	            this.current_showMask = !this.current_showMask;
	            var visibility = this.current_showMask ? 'visible' : 'hidden';
	            this._ids.mask.el.setClassStyle({ visibility: visibility });
	        },

	        collapse: function collapse(ref, callback) {
	            var platform = this.$getConfig().env.platform;
	            var translate = 'translate(0, 100%)';
	            if (platform == 'iOS') {
	                translate = 'translate(0, 270)';
	            }
	            this.current_translate = this.current_translate ? '' : translate;
	            this.anim(ref, {
	                transform: this.current_translate
	            }, 'ease', 100, callback);
	        },

	        opacity: function opacity(ref, callback) {
	            var self = this;
	            self.current_opacity = self.current_opacity === 1 ? 0.1 : 1;
	            self.anim(ref, {
	                opacity: self.current_opacity
	            }, 'ease', 100, callback);
	        },

	        rotate: function rotate(ref, callback) {
	            var self = this;
	            if (!self.current_rotate) {
	                self.current_rotate = 0;
	            }
	            self.current_rotate = self.current_rotate + 180;
	            self.anim(ref, {
	                transform: 'rotate(' + self.current_rotate + 'deg)'
	            }, 'linear', 100, callback);
	        },

	        anim: function anim(ref, styles, timingFunction, duration, callback) {
	            animation.transition(ref, {
	                styles: styles,
	                timingFunction: timingFunction,
	                duration: duration
	            }, callback || function () {});
	        }
	    }
	};}
	/* generated by weex-loader */


/***/ }

/******/ });