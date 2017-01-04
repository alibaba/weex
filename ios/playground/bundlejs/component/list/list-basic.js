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

	var __weex_template__ = __webpack_require__(97)
	var __weex_style__ = __webpack_require__(98)
	var __weex_script__ = __webpack_require__(99)

	__weex_define__('@weex-component/e4cde146096cc51ec5ab930a518ea157', [], function(__weex_require__, __weex_exports__, __weex_module__) {

	    __weex_script__(__weex_module__, __weex_exports__, __weex_require__)
	    if (__weex_exports__.__esModule && __weex_exports__.default) {
	      __weex_module__.exports = __weex_exports__.default
	    }

	    __weex_module__.exports.template = __weex_template__

	    __weex_module__.exports.style = __weex_style__

	})

	__weex_bootstrap__('@weex-component/e4cde146096cc51ec5ab930a518ea157',undefined,undefined)

/***/ },

/***/ 97:
/***/ function(module, exports) {

	module.exports = {
	  "type": "div",
	  "children": [
	    {
	      "type": "list",
	      "classList": [
	        "list"
	      ],
	      "children": [
	        {
	          "type": "refresh",
	          "classList": [
	            "refresh-view"
	          ],
	          "attr": {
	            "display": function () {return this.refresh_display}
	          },
	          "events": {
	            "refresh": "onrefresh"
	          },
	          "children": [
	            {
	              "type": "text",
	              "shown": function () {return (this.refresh_display==='hide')},
	              "attr": {
	                "value": "↓ pull to refresh"
	              }
	            },
	            {
	              "type": "loading-indicator",
	              "classList": [
	                "indicator"
	              ]
	            }
	          ]
	        },
	        {
	          "type": "cell",
	          "append": "tree",
	          "events": {
	            "appear": "onappear",
	            "disappear": "ondisappear"
	          },
	          "classList": [
	            "row"
	          ],
	          "repeat": function () {return this.rows},
	          "attr": {
	            "index": function () {return this.$index}
	          },
	          "children": [
	            {
	              "type": "div",
	              "classList": [
	                "item"
	              ],
	              "children": [
	                {
	                  "type": "text",
	                  "classList": [
	                    "item-title"
	                  ],
	                  "attr": {
	                    "value": function () {return 'row ' + (this.id)}
	                  }
	                }
	              ]
	            }
	          ]
	        },
	        {
	          "type": "loading",
	          "classList": [
	            "loading-view"
	          ],
	          "attr": {
	            "display": function () {return this.loading_display}
	          },
	          "events": {
	            "loading": "onloading"
	          },
	          "children": [
	            {
	              "type": "text",
	              "shown": function () {return (this.loading_display==='hide')},
	              "attr": {
	                "value": "↑ Loadmore"
	              }
	            },
	            {
	              "type": "loading-indicator",
	              "classList": [
	                "indicator"
	              ]
	            }
	          ]
	        }
	      ]
	    },
	    {
	      "type": "text",
	      "classList": [
	        "count"
	      ],
	      "attr": {
	        "value": function () {return 'Appear items:' + (this.appearMin) + ' - ' + (this.appearMax)}
	      }
	    }
	  ]
	}

/***/ },

/***/ 98:
/***/ function(module, exports) {

	module.exports = {
	  "list": {
	    "height": 850
	  },
	  "count": {
	    "fontSize": 48,
	    "margin": 10
	  },
	  "indicator": {
	    "height": 60,
	    "width": 60,
	    "color": "#889967"
	  },
	  "refresh-arrow": {
	    "fontSize": 30,
	    "color": "#45b5f0"
	  },
	  "row": {
	    "width": 750
	  },
	  "item": {
	    "justifyContent": "center",
	    "borderBottomWidth": 2,
	    "borderBottomColor": "#c0c0c0",
	    "height": 100,
	    "padding": 20
	  },
	  "refresh-view": {
	    "width": 750,
	    "height": 100,
	    "display": "flex",
	    "MsFlexAlign": "center",
	    "WebkitAlignItems": "center",
	    "WebkitBoxAlign": "center",
	    "alignItems": "center"
	  },
	  "loading-view": {
	    "width": 750,
	    "height": 100,
	    "display": "flex",
	    "MsFlexAlign": "center",
	    "WebkitAlignItems": "center",
	    "WebkitBoxAlign": "center",
	    "alignItems": "center"
	  }
	}

/***/ },

/***/ 99:
/***/ function(module, exports) {

	module.exports = function(module, exports, __weex_require__){'use strict';

	module.exports = {
	  methods: {
	    onappear: function onappear(e) {
	      var appearId = this.rows[e.target.attr.index].id;
	      nativeLog('+++++', appearId);
	      var appearIds = this.appearIds;
	      appearIds.push(appearId);
	      this.getMinAndMaxIds(appearIds);
	    },
	    ondisappear: function ondisappear(e) {
	      var disAppearId = this.rows[e.target.attr.index].id;
	      nativeLog('+++++', disAppearId);
	      var appearIds = this.appearIds;
	      var index = appearIds.indexOf(disAppearId);
	      if (index > -1) {
	        appearIds.splice(index, 1);
	      }
	      this.getMinAndMaxIds(appearIds);
	    },
	    getMinAndMaxIds: function getMinAndMaxIds(appearIds) {
	      appearIds.sort(function (a, b) {
	        return a - b;
	      });
	      this.appearIds = appearIds;
	      this.appearMax = appearIds[appearIds.length - 1];
	      this.appearMin = appearIds[0];
	    },
	    onrefresh: function onrefresh(e) {
	      var self = this;
	      self.refresh_display = 'show';
	      self.$call('modal', 'toast', {
	        'message': 'onrefresh'
	      });

	      this.$call('timer', 'setTimeout', function () {
	        self.refresh_display = 'hide';
	      }, 3000);
	    },

	    onloading: function onloading() {
	      var self = this;
	      self.loading_display = 'show';
	      self.$call('modal', 'toast', {
	        'message': 'onloading'
	      });

	      this.$call('timer', 'setTimeout', function () {
	        if (self.rows.length <= 33) {
	          self.rows.push(self.moreRows[self.rows.length - 29]);
	        }
	        self.loading_display = 'hide';
	      }, 3000);
	    }
	  },
	  data: function () {return {
	    refresh_display: 'hide',
	    loading_display: 'hide',
	    appearMin: 1,
	    appearMax: 1,
	    appearIds: [],
	    rows: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }, { id: 10 }, { id: 11 }, { id: 12 }, { id: 13 }, { id: 14 }, { id: 15 }, { id: 16 }, { id: 17 }, { id: 18 }, { id: 19 }, { id: 20 }, { id: 21 }, { id: 22 }, { id: 23 }, { id: 24 }, { id: 25 }, { id: 26 }, { id: 27 }, { id: 28 }, { id: 29 }],
	    moreRows: [{ id: 30 }, { id: 31 }, { id: 32 }, { id: 33 }]
	  }}
	};}
	/* generated by weex-loader */


/***/ }

/******/ });