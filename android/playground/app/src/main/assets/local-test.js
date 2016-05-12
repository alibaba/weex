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
/******/ ([
/* 0 */
/***/ function(module, exports) {

	;__weex_define__("@weex-component/81ed0b9b5608141b3583acd4f72a7ded", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;__weex_module__.exports.template={
	  "type": "div",
	  "children": [
	    {
	      "type": "div",
	      "style": {
	        "flexDirection": "row"
	      },
	      "children": [
	        {
	          "type": "text",
	          "classList": [
	            "item"
	          ],
	          "attr": {
	            "value": "1"
	          }
	        },
	        {
	          "type": "text",
	          "classList": [
	            "item"
	          ],
	          "attr": {
	            "value": "2"
	          }
	        },
	        {
	          "type": "text",
	          "classList": [
	            "item"
	          ],
	          "attr": {
	            "value": "3"
	          }
	        },
	        {
	          "type": "text",
	          "classList": [
	            "item"
	          ],
	          "attr": {
	            "value": "4"
	          }
	        }
	      ]
	    },
	    {
	      "type": "div",
	      "style": {
	        "flexDirection": "row"
	      },
	      "children": [
	        {
	          "type": "text",
	          "classList": [
	            "item"
	          ],
	          "style": {
	            "alignItems": "flex-end"
	          },
	          "attr": {
	            "value": "1"
	          }
	        },
	        {
	          "type": "text",
	          "classList": [
	            "item"
	          ],
	          "style": {
	            "borderLeftColor": "#333333"
	          }
	        },
	        {
	          "type": "text",
	          "classList": [
	            "item"
	          ],
	          "attr": {
	            "value": "3"
	          }
	        },
	        {
	          "type": "text",
	          "classList": [
	            "item"
	          ],
	          "attr": {
	            "value": "3"
	          }
	        }
	      ]
	    },
	    {
	      "type": "div",
	      "style": {
	        "flexDirection": "row"
	      },
	      "children": [
	        {
	          "type": "text",
	          "classList": [
	            "item"
	          ],
	          "style": {
	            "flex": 2
	          },
	          "attr": {
	            "value": "1"
	          }
	        },
	        {
	          "type": "text",
	          "classList": [
	            "item"
	          ],
	          "attr": {
	            "value": "2"
	          }
	        },
	        {
	          "type": "text",
	          "classList": [
	            "item"
	          ],
	          "attr": {
	            "value": "3"
	          }
	        }
	      ]
	    }
	  ]
	}
	;__weex_module__.exports.style={
	  "item": {
	    "flex": 1,
	    "height": 80,
	    "borderStyle": "solid",
	    "borderLeftWidth": 3,
	    "borderLeftColor": "#dddddd",
	    "borderBottomWidth": 3,
	    "borderBottomColor": "#dddddd",
	    "backgroundColor": "#333333",
	    "color": "#ffffff",
	    "alignItems": "center",
	    "justifyContent": "center"
	  }
	}
	})
	;__weex_bootstrap__("@weex-component/81ed0b9b5608141b3583acd4f72a7ded", {"transformerVersion":"0.3.1"}, undefined)

/***/ }
/******/ ]);