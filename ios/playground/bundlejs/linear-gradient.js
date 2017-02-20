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

	var __weex_template__ = __webpack_require__(205)
	var __weex_style__ = __webpack_require__(206)

	__weex_define__('@weex-component/695f94322dfa977e2812d2616f20e495', [], function(__weex_require__, __weex_exports__, __weex_module__) {

	    __weex_module__.exports.template = __weex_template__

	    __weex_module__.exports.style = __weex_style__

	})

	__weex_bootstrap__('@weex-component/695f94322dfa977e2812d2616f20e495',undefined,undefined)

/***/ },

/***/ 205:
/***/ function(module, exports) {

	module.exports = {
	  "type": "scroller",
	  "style": {
	    "backgroundColor": "#3a3a3a"
	  },
	  "children": [
	    {
	      "type": "div",
	      "classList": [
	        "container1"
	      ],
	      "style": {
	        "backgroundImage": "linear-gradient(to right,#43C6AC,#F8FFAE)"
	      },
	      "children": [
	        {
	          "type": "text",
	          "classList": [
	            "direction"
	          ],
	          "attr": {
	            "value": "to right"
	          }
	        }
	      ]
	    },
	    {
	      "type": "div",
	      "classList": [
	        "container1"
	      ],
	      "style": {
	        "backgroundImage": "linear-gradient(to left,#DCE35B,#45B649)"
	      },
	      "children": [
	        {
	          "type": "text",
	          "classList": [
	            "direction"
	          ],
	          "attr": {
	            "value": "to left"
	          }
	        }
	      ]
	    },
	    {
	      "type": "div",
	      "classList": [
	        "container1"
	      ],
	      "style": {
	        "backgroundImage": "linear-gradient(to bottom,#3494E6,#EC6EAD)"
	      },
	      "children": [
	        {
	          "type": "text",
	          "classList": [
	            "direction"
	          ],
	          "attr": {
	            "value": "to bottom"
	          }
	        }
	      ]
	    },
	    {
	      "type": "div",
	      "classList": [
	        "container1"
	      ],
	      "style": {
	        "backgroundImage": "linear-gradient(to top,#ee0979,#ff6a00)"
	      },
	      "children": [
	        {
	          "type": "text",
	          "classList": [
	            "direction"
	          ],
	          "attr": {
	            "value": "to top"
	          }
	        }
	      ]
	    },
	    {
	      "type": "div",
	      "style": {
	        "flexDirection": "row",
	        "alignItems": "center",
	        "justifyContent": "center"
	      },
	      "children": [
	        {
	          "type": "div",
	          "classList": [
	            "container2"
	          ],
	          "style": {
	            "backgroundImage": "linear-gradient(to bottom right,#00c3ff,#ffff1c)"
	          },
	          "children": [
	            {
	              "type": "text",
	              "classList": [
	                "direction"
	              ],
	              "attr": {
	                "value": "to bottom right"
	              }
	            }
	          ]
	        },
	        {
	          "type": "div",
	          "classList": [
	            "container2"
	          ],
	          "style": {
	            "backgroundImage": "linear-gradient(to top left,#ff00cc,#333399)"
	          },
	          "children": [
	            {
	              "type": "text",
	              "classList": [
	                "direction"
	              ],
	              "attr": {
	                "value": "to top left"
	              }
	            }
	          ]
	        }
	      ]
	    },
	    {
	      "type": "div",
	      "classList": [
	        "container1"
	      ],
	      "style": {
	        "backgroundImage": "linear-gradient(to right,#a80077,#66ff00)"
	      },
	      "children": [
	        {
	          "type": "text",
	          "classList": [
	            "direction"
	          ],
	          "attr": {
	            "value": "to right"
	          }
	        }
	      ]
	    },
	    {
	      "type": "div",
	      "classList": [
	        "container1"
	      ],
	      "style": {
	        "backgroundImage": "linear-gradient(to left,#a80077,#66ff00)"
	      },
	      "children": [
	        {
	          "type": "text",
	          "classList": [
	            "direction"
	          ],
	          "attr": {
	            "value": "to left"
	          }
	        }
	      ]
	    },
	    {
	      "type": "div",
	      "classList": [
	        "container1"
	      ],
	      "style": {
	        "backgroundImage": "linear-gradient(to bottom,#a80077,#66ff00)"
	      },
	      "children": [
	        {
	          "type": "text",
	          "classList": [
	            "direction"
	          ],
	          "attr": {
	            "value": "to bottom"
	          }
	        }
	      ]
	    },
	    {
	      "type": "div",
	      "classList": [
	        "container1"
	      ],
	      "style": {
	        "backgroundImage": "linear-gradient(to top,#a80077,#66ff00)"
	      },
	      "children": [
	        {
	          "type": "text",
	          "classList": [
	            "direction"
	          ],
	          "attr": {
	            "value": "to top"
	          }
	        }
	      ]
	    },
	    {
	      "type": "div",
	      "style": {
	        "flexDirection": "row",
	        "alignItems": "center",
	        "justifyContent": "center"
	      },
	      "children": [
	        {
	          "type": "div",
	          "classList": [
	            "container2"
	          ],
	          "style": {
	            "backgroundImage": "linear-gradient(to bottom right,#a80077,#66ff00)"
	          },
	          "children": [
	            {
	              "type": "text",
	              "classList": [
	                "direction"
	              ],
	              "attr": {
	                "value": "to bottom right"
	              }
	            }
	          ]
	        },
	        {
	          "type": "div",
	          "classList": [
	            "container2"
	          ],
	          "style": {
	            "backgroundImage": "linear-gradient(to top left,#a80077,#66ff00)"
	          },
	          "children": [
	            {
	              "type": "text",
	              "classList": [
	                "direction"
	              ],
	              "attr": {
	                "value": "to top left"
	              }
	            }
	          ]
	        }
	      ]
	    }
	  ]
	}

/***/ },

/***/ 206:
/***/ function(module, exports) {

	module.exports = {
	  "container1": {
	    "margin": 10,
	    "width": 730,
	    "height": 200,
	    "alignItems": "center",
	    "justifyContent": "center",
	    "border": "solid",
	    "borderRadius": 10
	  },
	  "container2": {
	    "margin": 10,
	    "width": 300,
	    "height": 300,
	    "alignItems": "center",
	    "justifyContent": "center",
	    "border": "solid",
	    "borderRadius": 10
	  },
	  "direction": {
	    "fontSize": 40,
	    "color": "#FFFFFF"
	  }
	}

/***/ }

/******/ });