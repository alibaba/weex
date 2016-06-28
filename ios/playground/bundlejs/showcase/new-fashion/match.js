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

	;__weex_define__("@weex-component/9d4c2c7c4ae424dd9960b55f7cf27378", [], function(__weex_require__, __weex_exports__, __weex_module__){
	__webpack_require__(17);

	;
	  __weex_module__.exports = {
	    data: function () {return {
	      NUMBER_750: 750,
	      NUMBER_373: 373,
	      NUMBER_240: 240,
	      NUMBER_200: 200,
	      NUMBER_4: 4
	    }},
	    methods: {
	      ready: function () {
	        var self = this;
	        self._initEnv();
	        self._addBannerIndex();
	      },
	      _initEnv: function () {
	        var self = this;
	        self.isTM = self._app.IS_TM;
	      },
	      _addBannerIndex: function () {
	        var self = this;
	        var ds = self.ds;
	        if (!ds || !ds.bannerItems) return;
	        for (var i = 0; i < ds.bannerItems.length; i++) {
	          ds.bannerItems[i].index = i;
	        }
	      }
	    }
	  }

	;__weex_module__.exports.template={
	  "type": "container",
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
	      "type": "container",
	      "classList": [
	        "tm-banner"
	      ],
	      "shown": function () {return this.ds.isShowTmSpecBanner&&this.ds.tmSpecBanner&&this.isTM},
	      "children": [
	        {
	          "type": "banner",
	          "attr": {
	            "width": function () {return this.NUMBER_750},
	            "height": function () {return this.NUMBER_200},
	            "src": function () {return this.ds.tmSpecBanner.img},
	            "href": function () {return this.ds.tmSpecBanner.url}
	          }
	        }
	      ]
	    },
	    {
	      "type": "container",
	      "repeat": function () {return this.ds.bannerItems},
	      "style": {
	        "flexDirection": "row",
	        "marginBottom": function () {return this.NUMBER_4}
	      },
	      "children": [
	        {
	          "type": "container",
	          "style": {
	            "marginRight": function () {return this.NUMBER_4}
	          },
	          "children": [
	            {
	              "type": "banner",
	              "attr": {
	                "width": function () {return this.NUMBER_373},
	                "height": function () {return this.NUMBER_240},
	                "src": function () {return this.leftImg},
	                "href": function () {return this.leftUrl}
	              }
	            }
	          ]
	        },
	        {
	          "type": "container",
	          "children": [
	            {
	              "type": "banner",
	              "attr": {
	                "width": function () {return this.NUMBER_373},
	                "height": function () {return this.NUMBER_240},
	                "src": function () {return this.rightImg},
	                "href": function () {return this.rightUrl}
	              }
	            }
	          ]
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
	  "tm-banner": {
	    "bottom": 4
	  }
	}
	})
	;__weex_bootstrap__("@weex-component/9d4c2c7c4ae424dd9960b55f7cf27378", {
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