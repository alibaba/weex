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

	;__weex_define__("@weex-component/288f1d10e56a339d2751caec3346b80a", [], function(__weex_require__, __weex_exports__, __weex_module__){
	__webpack_require__(17);

	;
	  __weex_module__.exports = {
	    data: function () {return {
	      NUMBER_251: 251,
	      NUMBER_240: 240,
	      NUMBER_292: 292,
	      NUMBER_588: 588
	    }},
	    methods: {
	      ready: function () {
	        var self = this;
	        var ds = self.ds;
	        if (!ds || !ds.bannerItems) return;
	        var bannerItems = ds.bannerItems;
	        for (var i = 0; i < bannerItems.length; i++) {
	          bannerItems[i].index = i;
	        }
	      }
	    }
	  }

	;__weex_module__.exports.template={
	  "type": "container",
	  "shown": function () {return !this.ds.isHide},
	  "children": [
	    {
	      "type": "image",
	      "shown": function () {return this.ds.floorTitle},
	      "classList": [
	        "title"
	      ],
	      "attr": {
	        "src": function () {return this.ds.floorTitle}
	      }
	    },
	    {
	      "type": "slider",
	      "classList": [
	        "slider"
	      ],
	      "attr": {
	        "showIndicators": "true",
	        "autoPlay": "true",
	        "interval": "3000"
	      },
	      "children": [
	        {
	          "type": "container",
	          "classList": [
	            "pannel"
	          ],
	          "repeat": function () {return this.ds.bannerItems},
	          "children": [
	            {
	              "type": "container",
	              "children": [
	                {
	                  "type": "banner",
	                  "style": {
	                    "marginBottom": 4
	                  },
	                  "attr": {
	                    "width": function () {return this.NUMBER_251},
	                    "height": function () {return this.NUMBER_292},
	                    "src": function () {return this.img1},
	                    "href": function () {return this.url1}
	                  }
	                },
	                {
	                  "type": "banner",
	                  "attr": {
	                    "width": function () {return this.NUMBER_251},
	                    "height": function () {return this.NUMBER_292},
	                    "src": function () {return this.img2},
	                    "href": function () {return this.url2}
	                  }
	                }
	              ]
	            },
	            {
	              "type": "container",
	              "classList": [
	                "middle-col"
	              ],
	              "children": [
	                {
	                  "type": "banner",
	                  "attr": {
	                    "width": function () {return this.NUMBER_240},
	                    "height": function () {return this.NUMBER_588},
	                    "src": function () {return this.img3},
	                    "href": function () {return this.url3}
	                  }
	                }
	              ]
	            },
	            {
	              "type": "container",
	              "children": [
	                {
	                  "type": "banner",
	                  "style": {
	                    "marginBottom": 4
	                  },
	                  "attr": {
	                    "width": function () {return this.NUMBER_251},
	                    "height": function () {return this.NUMBER_292},
	                    "src": function () {return this.img4},
	                    "href": function () {return this.url4}
	                  }
	                },
	                {
	                  "type": "banner",
	                  "attr": {
	                    "width": function () {return this.NUMBER_251},
	                    "height": function () {return this.NUMBER_292},
	                    "src": function () {return this.img5},
	                    "href": function () {return this.url5}
	                  }
	                }
	              ]
	            }
	          ]
	        },
	        {
	          "type": "indicator",
	          "style": {
	            "position": "absolute",
	            "width": 714,
	            "height": 200,
	            "left": 10,
	            "bottom": -80,
	            "itemSize": 20,
	            "itemColor": "#999999",
	            "itemSelectedColor": "#000000"
	          }
	        }
	      ]
	    }
	  ]
	}
	;__weex_module__.exports.style={
	  "title": {
	    "width": 750,
	    "height": 100
	  },
	  "slider": {
	    "height": 652
	  },
	  "pannel": {
	    "width": 750,
	    "height": 592,
	    "flexDirection": "row"
	  },
	  "middle-col": {
	    "marginLeft": 4,
	    "marginRight": 4,
	    "width": 240,
	    "height": 588
	  }
	}
	})
	;__weex_bootstrap__("@weex-component/288f1d10e56a339d2751caec3346b80a", {
	  "transformerVersion": "0.3.1"
	},undefined)

/***/ },

/***/ 17:
/***/ function(module, exports) {

	;__weex_define__("@weex-component/banner", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	  __weex_module__.exports = {
	    data: function () {return {
	        quality: 'normal',
	        width: 0,
	        height: 0,
	        src: '',
	        href: '',
	        spmc:0,
	        spmd:0
	    }},
	    methods: {
	      ready: function () {
	      },
	      _clickHandler: function () {
	        this.$call('modal', 'toast', {
	          message: 'click',
	          duration: 1
	        });
	      }
	    }
	  };

	;__weex_module__.exports.template={
	  "type": "image",
	  "style": {
	    "width": function () {return this.width},
	    "height": function () {return this.height}
	  },
	  "attr": {
	    "src": function () {return this.src},
	    "imageQuality": function () {return this.quality}
	  },
	  "events": {
	    "click": "_clickHandler"
	  }
	}
	})

/***/ }

/******/ });