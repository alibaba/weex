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

	;__weex_define__("@weex-component/8513f75cb253e1c4f953d27627b0fb1c", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	  __weex_module__.exports = {
	    data: function () {return {
	      dataRole: 'navbar',

	      //导航条背景色
	      backgroundColor: 'white',

	      //导航条高度
	      height: 88,

	      //导航条标题 
	      title: "",

	      //导航条标题颜色
	      titleColor: 'black',

	      //右侧按钮图片
	      rightItemSrc: '',

	      //右侧按钮标题
	      rightItemTitle: '',

	      //右侧按钮标题颜色
	      rightItemColor: 'black',

	      //左侧按钮图片
	      leftItemSrc: '',

	      //左侧按钮标题
	      leftItemTitle: '',

	      //左侧按钮颜色
	      leftItemColor: 'black',
	    }},
	    methods: {
	      onclickrightitem: function (e) {
	        this.$dispatch('naviBar.rightItem.click', {});
	      },
	      onclickleftitem: function (e) {
	        this.$dispatch('naviBar.leftItem.click', {});
	      }
	    }
	  }

	;__weex_module__.exports.template = __weex_module__.exports.template || {}
	;Object.assign(__weex_module__.exports.template, {
	  "type": "div",
	  "style": {
	    "flexDirection": "row",
	    "position": "fixed",
	    "top": 0,
	    "left": 0,
	    "right": 0,
	    "width": 750,
	    "height": function () {return this.height},
	    "backgroundColor": function () {return this.backgroundColor}
	  },
	  "attr": {
	    "dataRole": function () {return this.dataRole}
	  },
	  "children": [
	    {
	      "type": "text",
	      "style": {
	        "position": "absolute",
	        "bottom": 28,
	        "right": 32,
	        "textAlign": "right",
	        "color": function () {return this.rightItemColor},
	        "fontSize": 32,
	        "fontFamily": "'Open Sans', sans-serif"
	      },
	      "attr": {
	        "naviItemPosition": "right",
	        "value": function () {return this.rightItemTitle}
	      },
	      "shown": function () {return !this.rightItemSrc},
	      "events": {
	        "click": "onclickrigthitem"
	      }
	    },
	    {
	      "type": "image",
	      "style": {
	        "position": "absolute",
	        "bottom": 20,
	        "right": 28,
	        "width": 50,
	        "height": 50
	      },
	      "attr": {
	        "naviItemPosition": "right",
	        "src": function () {return this.rightItemSrc}
	      },
	      "shown": function () {return this.rightItemSrc},
	      "events": {
	        "click": "onclickrightitem"
	      }
	    },
	    {
	      "type": "text",
	      "style": {
	        "position": "absolute",
	        "bottom": 28,
	        "left": 32,
	        "textAlign": "left",
	        "color": function () {return this.leftItemColor},
	        "fontSize": 32,
	        "fontFamily": "'Open Sans', sans-serif"
	      },
	      "attr": {
	        "naviItemPosition": "left",
	        "value": function () {return this.leftItemTitle}
	      },
	      "shown": function () {return !this.leftItemSrc},
	      "events": {
	        "click": "onclickleftitem"
	      }
	    },
	    {
	      "type": "image",
	      "style": {
	        "position": "absolute",
	        "bottom": 20,
	        "left": 28,
	        "width": 50,
	        "height": 50
	      },
	      "attr": {
	        "naviItemPosition": "left",
	        "src": function () {return this.leftItemSrc}
	      },
	      "shown": function () {return this.leftItemSrc},
	      "events": {
	        "click": "onclickleftitem"
	      }
	    },
	    {
	      "type": "text",
	      "classList": [
	        "center"
	      ],
	      "style": {
	        "textAlign": "center",
	        "color": function () {return this.titleColor},
	        "fontSize": 36,
	        "fontWeight": "bold"
	      },
	      "attr": {
	        "naviItemPosition": "center",
	        "value": function () {return this.title}
	      }
	    }
	  ]
	})
	;__weex_module__.exports.style = __weex_module__.exports.style || {}
	;Object.assign(__weex_module__.exports.style, {
	  "center": {
	    "position": "absolute",
	    "bottom": 25,
	    "left": 172,
	    "right": 172
	  }
	})
	})
	;__weex_bootstrap__("@weex-component/8513f75cb253e1c4f953d27627b0fb1c", {
	  "transformerVersion": "0.3.1"
	},undefined)

/***/ }
/******/ ]);