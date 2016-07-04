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

	;__weex_define__("@weex-component/de0c661a89abd9ebbbf4e61f69038784", [], function(__weex_require__, __weex_exports__, __weex_module__){
	__webpack_require__(19);
	__webpack_require__(18);

	;
	  __weex_module__.exports = {
	    data: function () {return {
	      ds: {},
	      NUMBER_233: 233,
	      NUMBER_172: 172,
	      NUMBER_3: 3
	    }},
	    methods: {
	      ready: function () {
	        var self = this;
	        self.isH5 = self._app.IS_H5;
	        self.isTM = self._app.IS_TM;
	        self.isTest = self._app.IS_TEST;
	      },
	    }
	  };

	;__weex_module__.exports.template={
	  "type": "container",
	  "classList": [
	    "container"
	  ],
	  "children": [
	    {
	      "type": "image",
	      "classList": [
	        "banner"
	      ],
	      "attr": {
	        "src": function () {return this.ds.topBanner}
	      }
	    },
	    {
	      "type": "container",
	      "classList": [
	        "rule-container"
	      ],
	      "children": [
	        {
	          "type": "link",
	          "style": {
	            "fontSize": 22,
	            "color": "#ffffff",
	            "textAlign": "center"
	          },
	          "attr": {
	            "text": "帮助",
	            "href": function () {return this.ds.ruleLink}
	          }
	        }
	      ]
	    },
	    {
	      "type": "container",
	      "classList": [
	        "announce"
	      ],
	      "children": [
	        {
	          "type": "image",
	          "classList": [
	            "announce-hd"
	          ],
	          "attr": {
	            "src": function () {return this.ds.announceHdBanner}
	          }
	        },
	        {
	          "type": "banners",
	          "style": {
	            "marginLeft": 6,
	            "marginRight": 6
	          },
	          "attr": {
	            "ds": function () {return this.ds.bannerItems},
	            "direction": "row",
	            "width": function () {return this.NUMBER_233},
	            "height": function () {return this.NUMBER_172},
	            "space": function () {return this.NUMBER_3}
	          }
	        }
	      ]
	    }
	  ]
	}
	;__weex_module__.exports.style={
	  "banner": {
	    "width": 750,
	    "height": 782
	  },
	  "share-container": {
	    "position": "absolute",
	    "right": 100,
	    "top": 15,
	    "zIndex": 100,
	    "fontSize": 20,
	    "color": "#ffffff",
	    "backgroundColor": "#000000",
	    "borderRadius": 17,
	    "width": 110,
	    "height": 35,
	    "justifyContent": "center",
	    "alignItems": "center"
	  },
	  "rule-container": {
	    "position": "absolute",
	    "right": 22,
	    "top": 15,
	    "zIndex": 100,
	    "fontSize": 20,
	    "color": "#ffffff",
	    "backgroundColor": "#000000",
	    "borderRadius": 17,
	    "width": 70,
	    "height": 35,
	    "justifyContent": "center"
	  },
	  "announce": {
	    "backgroundColor": "#f5f3f4",
	    "width": 716,
	    "height": 286,
	    "position": "absolute",
	    "bottom": 17,
	    "left": 17,
	    "borderRadius": 5
	  },
	  "announce-hd": {
	    "width": 700,
	    "height": 90,
	    "marginTop": 8,
	    "marginBottom": 8,
	    "marginLeft": 5,
	    "marginRight": 5
	  }
	}
	})
	;__weex_bootstrap__("@weex-component/de0c661a89abd9ebbbf4e61f69038784", {
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

/***/ },

/***/ 18:
/***/ function(module, exports, __webpack_require__) {

	;__weex_define__("@weex-component/banners", [], function(__weex_require__, __weex_exports__, __weex_module__){
	__webpack_require__(17);

	;
	  __weex_module__.exports = {
	    data: function () {return {
	      space: 0,
	      width: 0,
	      height: 0,
	      spmc:0,
	      spmdprefix:'',
	      ds: []
	    }},
	    methods: {
	      ready: function () {
	        var self = this;
	        var ds = self.ds;
	        var length = ds.length;
	        for (var i = 0; i < length; i++) {
	          var item = ds[i];
	          item.index = i;
	          item.space = (i % length === 0) ? 0 : self.space;
	        }
	      }
	    }
	  };

	;__weex_module__.exports.template={
	  "type": "container",
	  "children": [
	    {
	      "type": "container",
	      "shown": function () {return this.direction==='row'},
	      "style": {
	        "flexDirection": "row"
	      },
	      "children": [
	        {
	          "type": "container",
	          "repeat": function () {return this.ds},
	          "style": {
	            "width": function () {return this.width},
	            "height": function () {return this.height},
	            "marginLeft": function () {return this.space}
	          },
	          "children": [
	            {
	              "type": "banner",
	              "attr": {
	                "width": function () {return this.width},
	                "height": function () {return this.height},
	                "src": function () {return this.img},
	                "href": function () {return this.url}
	              }
	            }
	          ]
	        }
	      ]
	    },
	    {
	      "type": "container",
	      "shown": function () {return this.direction==='column'},
	      "children": [
	        {
	          "type": "container",
	          "repeat": function () {return this.ds},
	          "style": {
	            "width": function () {return this.width},
	            "height": function () {return this.height},
	            "marginTop": function () {return this.space}
	          },
	          "children": [
	            {
	              "type": "banner",
	              "attr": {
	                "width": function () {return this.width},
	                "height": function () {return this.height},
	                "src": function () {return this.img},
	                "href": function () {return this.url}
	              }
	            }
	          ]
	        }
	      ]
	    }
	  ]
	}
	})

/***/ },

/***/ 19:
/***/ function(module, exports) {

	;__weex_define__("@weex-component/link", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	  __weex_module__.exports = {
	    data: function () {return {
	      text: '',
	      href: ''
	    }},
	    methods: {
	      _clickHandler: function () {
	        this.$call('modal', 'toast', {
	          message: 'click',
	          duration: 1
	        });
	      }
	    }
	  };

	;__weex_module__.exports.template={
	  "type": "text",
	  "classList": [
	    "link"
	  ],
	  "shown": function () {return this.href},
	  "events": {
	    "click": "_clickHandler"
	  },
	  "attr": {
	    "value": function () {return this.text}
	  }
	}
	})

/***/ }

/******/ });