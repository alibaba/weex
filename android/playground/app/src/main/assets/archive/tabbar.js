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

	;__weex_define__("@weex-component/tabitem", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	    __weex_module__.exports = {
	      data: function () {return {
	        index: 0,
	        title: "",
	        titleColor: 0x0,
	        icon: "",
	        backgroundColor: 0xffffff,
	      }},
	      methods: {
	        onclickitem: function (e) {
	          var vm = this;
	          var params = {
	            index: vm.index
	           };
	          vm.$dispatch('tabItem.onClick', params);
	        }
	      }
	    }
	  
	;__weex_module__.exports.template = __weex_module__.exports.template || {}
	;Object.assign(__weex_module__.exports.template, {
	  "type": "div",
	  "style": {
	    "flex": 1,
	    "flexDirection": "column",
	    "alignItems": "center",
	    "justifyContent": "center",
	    "backgroundColor": function () {return this.backgroundColor},
	    "height": 88
	  },
	  "events": {
	    "click": "onclickitem"
	  },
	  "children": [
	    {
	      "type": "image",
	      "style": {
	        "position": "absolute",
	        "top": 0,
	        "left": 0,
	        "right": 0,
	        "height": 2
	      },
	      "attr": {
	        "src": "http://gtms03.alicdn.com/tps/i3/TB1mdsiMpXXXXXpXXXXNw4JIXXX-640-4.png"
	      }
	    },
	    {
	      "type": "image",
	      "style": {
	        "marginTop": 5,
	        "width": 40,
	        "height": 40
	      },
	      "attr": {
	        "src": function () {return this.icon}
	      }
	    },
	    {
	      "type": "text",
	      "style": {
	        "marginTop": 5,
	        "textAlign": "center",
	        "color": function () {return this.titleColor},
	        "fontSize": 20
	      },
	      "attr": {
	        "value": function () {return this.title}
	      }
	    }
	  ]
	})
	});

	;__weex_define__("@weex-component/55f98562972e15e02d56488954384374", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	  __weex_module__.exports = {
	    data: function () {return {
	      tabItems: [ ],
	      selectedIndex: 0,
	      selectedColor: 0xff0000,
	      unselectedColor: 0x0,
	    }},
	    created: function () {
	      this.selected(this.selectedIndex);

	      this.$on('tabItem.onClick',function(e){
	        var detail= e.detail;
	        this.selectedIndex = detail.index;
	        this.selected(detail.index);

	        var params = {
	          index: detail.index
	        };
	        this.$dispatch('tabBar.onClick', params);
	      });
	    },
	    methods: {
	      selected: function(index) {
	        for(var i = 0; i < this.tabItems.length; i++) {
	          var tabItem = this.tabItems[i];
	          if(i == index){
	            tabItem.icon = tabItem.selectedImage;
	            tabItem.titleColor = this.selectedColor;
	            tabItem.visibility = "visible";
	          }
	          else {
	            tabItem.icon = tabItem.image;
	            tabItem.titleColor = this.unselectedColor;
	            tabItem.visibility = "hidden";
	          }
	        }
	      },  
	    }
	  }

	;__weex_module__.exports.template = __weex_module__.exports.template || {}
	;Object.assign(__weex_module__.exports.template, {
	  "type": "div",
	  "classList": [
	    "wrapper"
	  ],
	  "children": [
	    {
	      "type": "embed",
	      "classList": [
	        "content"
	      ],
	      "style": {
	        "visibility": function () {return this.visibility}
	      },
	      "repeat": function () {return this.tabItems},
	      "attr": {
	        "src": function () {return this.src},
	        "type": "weex"
	      }
	    },
	    {
	      "type": "div",
	      "classList": [
	        "tabbar"
	      ],
	      "append": "tree",
	      "children": [
	        {
	          "type": "tabitem",
	          "repeat": function () {return this.tabItems},
	          "attr": {
	            "index": function () {return this.index},
	            "icon": function () {return this.icon},
	            "title": function () {return this.title},
	            "titleColor": function () {return this.titleColor}
	          }
	        }
	      ]
	    }
	  ]
	})
	;__weex_module__.exports.style = __weex_module__.exports.style || {}
	;Object.assign(__weex_module__.exports.style, {
	  "wrapper": {
	    "width": 750,
	    "position": "absolute",
	    "top": 0,
	    "left": 0,
	    "right": 0,
	    "bottom": 0
	  },
	  "content": {
	    "position": "absolute",
	    "top": 0,
	    "left": 0,
	    "right": 0,
	    "bottom": 0,
	    "marginTop": 0,
	    "marginBottom": 88
	  },
	  "tabbar": {
	    "flexDirection": "row",
	    "position": "fixed",
	    "bottom": 0,
	    "left": 0,
	    "right": 0,
	    "height": 88
	  }
	})
	})
	;__weex_bootstrap__("@weex-component/55f98562972e15e02d56488954384374", {
	  "transformerVersion": "0.3.1"
	},undefined)

/***/ }
/******/ ]);