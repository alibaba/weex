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

	var __weex_template__ = __webpack_require__(151)
	var __weex_script__ = __webpack_require__(152)

	__weex_define__('@weex-component/3157b803090c07c091af8fa3147f3d5c', [], function(__weex_require__, __weex_exports__, __weex_module__) {

	    __weex_script__(__weex_module__, __weex_exports__, __weex_require__)
	    if (__weex_exports__.__esModule && __weex_exports__.default) {
	      __weex_module__.exports = __weex_exports__.default
	    }

	    __weex_module__.exports.template = __weex_template__

	})

	__weex_bootstrap__('@weex-component/3157b803090c07c091af8fa3147f3d5c',undefined,undefined)

/***/ },

/***/ 151:
/***/ function(module, exports) {

	module.exports = {
	  "type": "div",
	  "style": {
	    "flexDirection": "column",
	    "backgroundColor": "#ffffff",
	    "width": 750,
	    "height": 600,
	    "borderWidth": 0
	  },
	  "children": [
	    {
	      "type": "div",
	      "style": {
	        "width": 700,
	        "height": 400,
	        "borderWidth": 1,
	        "borderStyle": "solid",
	        "borderColor": "#000000",
	        "margin": 0
	      },
	      "children": [
	        {
	          "type": "slider-neighbor",
	          "style": {
	            "width": 700,
	            "height": 400
	          },
	          "attr": {
	            "neighborScale": "0.8",
	            "neighborSpace": "30",
	            "currentItemScale": "0.90",
	            "interval": "3000",
	            "neighborAlpha": "0.8",
	            "autoPlay": function () {return this.attr_auto_play}
	          },
	          "children": [
	            {
	              "type": "image",
	              "style": {
	                "width": 600,
	                "backgroundColor": "#FFFFDF",
	                "height": 400
	              },
	              "attr": {
	                "src": "https://gw.alicdn.com/tps/TB1dzanMVXXXXXQXVXXXXXXXXXX-573-412.png"
	              }
	            },
	            {
	              "type": "image",
	              "style": {
	                "width": 600,
	                "backgroundColor": "#FFFFDF",
	                "height": 400
	              },
	              "attr": {
	                "src": "https://gw.alicdn.com/tps/TB1p9CCMVXXXXa_XFXXXXXXXXXX-450-340.png"
	              }
	            },
	            {
	              "type": "image",
	              "style": {
	                "width": 600,
	                "backgroundColor": "#FFFFDF",
	                "height": 400
	              },
	              "attr": {
	                "src": "https://gw.alicdn.com/tps/TB1zpSiMVXXXXchXFXXXXXXXXXX-448-338.png"
	              }
	            },
	            {
	              "type": "image",
	              "style": {
	                "width": 600,
	                "backgroundColor": "#FFFFDF",
	                "height": 400
	              },
	              "attr": {
	                "src": "https://gw.alicdn.com/tps/TB1EuGIMVXXXXcoXpXXXXXXXXXX-452-337.png"
	              }
	            },
	            {
	              "type": "indicator",
	              "style": {
	                "height": 60,
	                "position": "absolute",
	                "bottom": 15,
	                "width": 700,
	                "left": 0,
	                "itemSelectedColor": "#0000FF",
	                "itemSize": 20,
	                "itemColor": "#FF0000"
	              }
	            }
	          ]
	        }
	      ]
	    },
	    {
	      "type": "div",
	      "style": {
	        "height": 100,
	        "borderWidth": 0,
	        "margin": 10
	      },
	      "children": [
	        {
	          "type": "tc_support_subtitle",
	          "attr": {
	            "title": "auto-play"
	          }
	        },
	        {
	          "type": "div",
	          "repeat": function () {return this.btnList2100},
	          "style": {
	            "flexDirection": "row"
	          },
	          "children": [
	            {
	              "type": "text",
	              "events": {
	                "click": "update2100"
	              },
	              "attr": {
	                "flagid": function () {return this.index},
	                "value": function () {return 'auto play: ' + (this.value)}
	              },
	              "repeat": function () {return this.row},
	              "style": {
	                "width": 310,
	                "height": 50,
	                "textAlign": "center",
	                "borderWidth": 1,
	                "borderColor": "#696969",
	                "borderStyle": "solid",
	                "borderRadius": 5,
	                "margin": 10,
	                "backgroundColor": function () {return this.bgc}
	              }
	            }
	          ]
	        }
	      ]
	    }
	  ]
	}

/***/ },

/***/ 152:
/***/ function(module, exports) {

	module.exports = function(module, exports, __weex_require__){"use strict";

	module.exports = {
		data: function () {return {
			log_detail: [],
			attr_auto_play: false,
			btnList2100: [{ row: [{ value: "false", bgc: '#EEEEEE', index: 0 }, { value: "true", bgc: '#EEEEEE', index: 1 }]
			}]
		}},
		methods: {
			update2100: function update2100(e) {
				var self = this;
				var index = e.target.attr.flagid;
				for (var i = 0; i < self.btnList2100.length; i++) {
					var row = self.btnList2100[i];
					var columnlist = row.row;
					for (var j = 0; j < columnlist.length; j++) {
						var column = columnlist[j];
						if (column.index === index) {
							column.bgc = '#B2DFEE';
							switch (index) {
								case 0:
									self.attr_auto_play = false;
									break;
								case 1:
									self.attr_auto_play = true;
									break;
								default:
									break;
							}
						} else {
							column.bgc = '#EEEEEE';
						}
					}
				}
			}
		}
	};}
	/* generated by weex-loader */


/***/ }

/******/ });