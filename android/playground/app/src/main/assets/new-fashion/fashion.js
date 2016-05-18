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

	;__weex_define__("@weex-component/29432e9104bfbc477db30914749dfb5b", [], function(__weex_require__, __weex_exports__, __weex_module__){
	__webpack_require__(17);
	__webpack_require__(18);

	;
	  __weex_module__.exports = {
	    data: function () {return {
	      NUMBER_750: 750,
	      NUMBER_250: 250,
	      NUMBER_220: 220,
	      NUMBER_262: 262,
	      NUMBER_375: 375
	    }},
	    methods: {
	      ready: function () {
	        var self = this;
	        self._randomStarBanner();
	      },
	      _randomStarBanner: function () {
	        var self = this;
	        if (!self.ds||!self.ds.firstStarBannerItems||!self.ds.secondStarBannerItems||!self.ds.thirdStarBannerItems) return;
	        var starBanners = [];
	        starBanners.push(self._app.Util.randomItemFromArr(self.ds.firstStarBannerItems));
	        starBanners.push(self._app.Util.randomItemFromArr(self.ds.secondStarBannerItems));
	        starBanners.push(self._app.Util.randomItemFromArr(self.ds.thirdStarBannerItems));
	        self.ds.starBanners = starBanners;
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
	      "type": "banner",
	      "attr": {
	        "width": function () {return this.NUMBER_750},
	        "height": function () {return this.NUMBER_262},
	        "src": function () {return this.ds.bigBannerImg},
	        "href": function () {return this.ds.bigBannerUrl}
	      }
	    },
	    {
	      "type": "banners",
	      "attr": {
	        "ds": function () {return this.ds.smallBannerItems},
	        "width": function () {return this.NUMBER_375},
	        "height": function () {return this.NUMBER_262},
	        "direction": "row"
	      }
	    },
	    {
	      "type": "container",
	      "shown": function () {return !this.ds.isHideStarBanner},
	      "children": [
	        {
	          "type": "banners",
	          "attr": {
	            "ds": function () {return this.ds.starBanners},
	            "width": function () {return this.NUMBER_250},
	            "height": function () {return this.NUMBER_220},
	            "direction": "row"
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
	  }
	}
	})
	;__weex_bootstrap__("@weex-component/29432e9104bfbc477db30914749dfb5b", {
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

/***/ }

/******/ });