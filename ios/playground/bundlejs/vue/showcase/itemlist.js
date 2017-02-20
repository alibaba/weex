// { "framework": "Vue" }

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

	var __vue_exports__, __vue_options__
	var __vue_styles__ = []

	/* styles */
	__vue_styles__.push(__webpack_require__(492)
	)

	/* script */
	__vue_exports__ = __webpack_require__(493)

	/* template */
	var __vue_template__ = __webpack_require__(494)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/Users/bobning/work/source/weex_fork/examples/vue/showcase/itemlist.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__.style = __vue_options__.style || {}
	__vue_styles__.forEach(function (module) {
	for (var name in module) {
	__vue_options__.style[name] = module[name]
	}
	})

	module.exports = __vue_exports__
	module.exports.el = 'true'
	new Vue(module.exports)


/***/ },

/***/ 492:
/***/ function(module, exports) {

	module.exports = {
	  "flexRow": {
	    "flexDirection": "row"
	  },
	  "flexColumn": {
	    "flexDirection": "column"
	  },
	  "fixed": {
	    "position": "fixed",
	    "bottom": 50,
	    "left": 50,
	    "width": 300,
	    "height": 50,
	    "alignItems": "center",
	    "justifyContent": "center"
	  },
	  "shopImg": {
	    "width": 220,
	    "height": 220
	  },
	  "list": {
	    "flexDirection": "column",
	    "overflow": "hidden",
	    "width": 750,
	    "height": 1200,
	    "backgroundColor": "#dddddd"
	  },
	  "cell": {
	    "backgroundColor": "#dddddd",
	    "flexDirection": "column",
	    "width": 750
	  },
	  "shopDiv": {
	    "flexDirection": "column",
	    "backgroundColor": "#ffffff",
	    "margin": 5,
	    "padding": 10,
	    "borderWidth": 1,
	    "borderColor": "#cccccc",
	    "overflow": "visible"
	  },
	  "shopRowList": {
	    "flexDirection": "column",
	    "borderWidth": 1,
	    "borderColor": "#cccccc",
	    "overflow": "visible",
	    "margin": 5,
	    "padding": 10,
	    "backgroundColor": "#ffffff"
	  },
	  "shopHeader": {
	    "flexDirection": "row",
	    "width": 720
	  },
	  "shopFooter": {
	    "flexDirection": "row",
	    "width": 720
	  },
	  "smallImg": {
	    "width": 20,
	    "height": 20
	  }
	}

/***/ },

/***/ 493:
/***/ function(module, exports) {

	'use strict';

	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

	var modal = __weex_require_module__('modal');
	module.exports = {
	  data: function data() {
	    return {
	      shopList: [{
	        id: 1,
	        scopeValue: 1,
	        PersonPhoto: 'https://gw.alicdn.com/tps/i3/TB1yeWeIFXXXXX5XFXXuAZJYXXX-210-210.png_60x60.jpg',
	        PersonName: 'Mendeleyev',
	        PersonVisitTime: 'today',
	        shopDesc: 'Genius only means hard-working all one\'s life',
	        shopImgList: [{
	          shopImgWidth: 220,
	          shopImgHeight: 220,
	          shopImg: 'https://gd2.alicdn.com/bao/uploaded/i2/TB1rtOnHpXXXXXLaXXXXXXXXXXX_!!0-item_pic.jpg_220x220.jpg'
	        }, {
	          shopImgWidth: 220,
	          shopImgHeight: 220,
	          shopImg: 'https://gd4.alicdn.com/bao/uploaded/i4/TB15KrfFVXXXXXJXXXXXXXXXXXX_!!0-item_pic.jpg_220x220.jpg'
	        }, {
	          shopImgWidth: 220,
	          shopImgHeight: 220,
	          shopImg: 'https://gd2.alicdn.com/bao/uploaded/i2/TB1t5YBGVXXXXXcaXXXXXXXXXXX_!!0-item_pic.jpg_220x220.jpg'
	        }],
	        shopLikeImg: 'https://img.alicdn.com/tps/i1/TB1jTxXIVXXXXb8XXXX07tlTXXX-200-200.png_88x88xz.jpg',
	        shopLikeText: '6',
	        shopCommentImg: 'https://img.alicdn.com/tps/i1/TB1kTKyIVXXXXacXFXX07tlTXXX-200-200.png_88x88xz.jpg',
	        shopCommentText: '97',
	        shopLookImg: 'https://img.alicdn.com/imgextra/i4/397746073/TB2IseKeFXXXXcVXXXXXXXXXXXX-397746073.png_88x88xz.jpg',
	        shopLookText: '1003',
	        shareImg: 'https://cbu01.alicdn.com/cms/upload/2015/930/224/2422039_702806130.png_88x88xz.jpg',
	        shareText: "10"

	      }, {
	        id: 2,
	        scopeValue: 2,
	        PersonPhoto: 'https://gw.alicdn.com/tps/i3/TB1yeWeIFXXXXX5XFXXuAZJYXXX-210-210.png_60x60.jpg',
	        PersonName: 'Napoleon',
	        PersonVisitTime: 'yesterday',
	        shopDesc: 'The man who has made up his mind to win will never say "impossible "',
	        shopImgList: [{
	          shopImgWidth: 220,
	          shopImgHeight: 220,
	          shopImg: 'https://gd1.alicdn.com/imgextra/i1/2655929383/TB2.qITjpXXXXcIXXXXXXXXXXXX_!!2655929383.jpg_220x220.jpg'
	        }, {
	          shopImgWidth: 220,
	          shopImgHeight: 220,
	          shopImg: 'https://gd3.alicdn.com/imgextra/i3/2655929383/TB2eWwZjpXXXXbHXXXXXXXXXXXX_!!2655929383.jpg_220x220.jpg'
	        }, {
	          shopImgWidth: 220,
	          shopImgHeight: 220,
	          shopImg: 'https://gd2.alicdn.com/imgextra/i2/2655929383/TB2tgQWjpXXXXbZXXXXXXXXXXXX_!!2655929383.jpg_220x220.jpg'
	        }],
	        shopLikeImg: 'https://img.alicdn.com/tps/i1/TB1jTxXIVXXXXb8XXXX07tlTXXX-200-200.png_88x88xz.jpg',
	        shopLikeText: '6',
	        shopCommentImg: 'https://img.alicdn.com/tps/i1/TB1kTKyIVXXXXacXFXX07tlTXXX-200-200.png_88x88xz.jpg',
	        shopCommentText: '97',
	        shopLookImg: 'https://img.alicdn.com/imgextra/i4/397746073/TB2IseKeFXXXXcVXXXXXXXXXXXX-397746073.png_88x88xz.jpg',
	        shopLookText: '1003',
	        shareImg: 'https://cbu01.alicdn.com/cms/upload/2015/930/224/2422039_702806130.png_88x88xz.jpg',
	        shareText: "10"

	      }, {
	        id: 3,
	        scopeValue: 3,
	        PersonPhoto: 'https://gw.alicdn.com/tps/i3/TB1yeWeIFXXXXX5XFXXuAZJYXXX-210-210.png_60x60.jpg',
	        PersonName: 'Balzac',
	        PersonVisitTime: 'yesterday',
	        shopDesc: 'There is no such thing as a great talent without great will - power',
	        shopImgList: [{
	          shopImgWidth: 220,
	          shopImgHeight: 220,
	          shopImg: 'https://gd1.alicdn.com/imgextra/i1/TB1AFz9LXXXXXbrXVXXXXXXXXXX_!!0-item_pic.jpg_220x220.jpg'
	        }, {
	          shopImgWidth: 220,
	          shopImgHeight: 220,
	          shopImg: 'https://gd2.alicdn.com/imgextra/i2/2557954751/TB2is2njXXXXXatXpXXXXXXXXXX_!!2557954751.jpg_220x220.jpg'
	        }, {
	          shopImgWidth: 220,
	          shopImgHeight: 220,
	          shopImg: 'https://gd2.alicdn.com/imgextra/i2/2557954751/TB2PNYGjXXXXXbXXXXXXXXXXXXX_!!2557954751.jpg_220x220.jpg'
	        }],
	        shopLikeImg: 'https://img.alicdn.com/tps/i1/TB1jTxXIVXXXXb8XXXX07tlTXXX-200-200.png_88x88xz.jpg',
	        shopLikeText: '6',
	        shopCommentImg: 'https://img.alicdn.com/tps/i1/TB1kTKyIVXXXXacXFXX07tlTXXX-200-200.png_88x88xz.jpg',
	        shopCommentText: '97',
	        shopLookImg: 'https://img.alicdn.com/imgextra/i4/397746073/TB2IseKeFXXXXcVXXXXXXXXXXXX-397746073.png_88x88xz.jpg',
	        shopLookText: '1003',
	        shareImg: 'https://cbu01.alicdn.com/cms/upload/2015/930/224/2422039_702806130.png_88x88xz.jpg',
	        shareText: "10"

	      }, {
	        id: 4,
	        scopeValue: 4,
	        PersonPhoto: 'https://gw.alicdn.com/tps/i3/TB1yeWeIFXXXXX5XFXXuAZJYXXX-210-210.png_60x60.jpg',
	        PersonName: 'Thomas Carlyle',
	        PersonVisitTime: '3 day ago',
	        shopDesc: 'Cease to struggle and you cease to live',
	        shopImgList: [{
	          shopImgWidth: 220,
	          shopImgHeight: 220,
	          shopImg: 'https://gd4.alicdn.com/imgextra/i4/69426324/TB2zbwdfXXXXXa4XpXXXXXXXXXX_!!69426324.jpg_220x220.jpg'
	        }, {
	          shopImgWidth: 220,
	          shopImgHeight: 220,
	          shopImg: 'https://gd4.alicdn.com/imgextra/i4/69426324/TB2L7ZAfXXXXXXOXXXXXXXXXXXX_!!69426324.jpg_220x220.jpg'
	        }, {
	          shopImgWidth: 220,
	          shopImgHeight: 220,
	          shopImg: 'https://gd4.alicdn.com/imgextra/i4/69426324/TB2p9wufXXXXXbiXXXXXXXXXXXX_!!69426324.jpg_220x220.jpg'
	        }],
	        shopLikeImg: 'https://img.alicdn.com/tps/i1/TB1jTxXIVXXXXb8XXXX07tlTXXX-200-200.png_88x88xz.jpg',
	        shopLikeText: '6',
	        shopCommentImg: 'https://img.alicdn.com/tps/i1/TB1kTKyIVXXXXacXFXX07tlTXXX-200-200.png_88x88xz.jpg',
	        shopCommentText: '97',
	        shopLookImg: 'https://img.alicdn.com/imgextra/i4/397746073/TB2IseKeFXXXXcVXXXXXXXXXXXX-397746073.png_88x88xz.jpg',
	        shopLookText: '1003',
	        shareImg: 'https://cbu01.alicdn.com/cms/upload/2015/930/224/2422039_702806130.png_88x88xz.jpg',
	        shareText: "10"

	      }, {
	        id: 5,
	        scopeValue: 5,
	        PersonPhoto: 'https://gw.alicdn.com/tps/i3/TB1yeWeIFXXXXX5XFXXuAZJYXXX-210-210.png_60x60.jpg',
	        PersonName: 'Addison',
	        PersonVisitTime: 'yesterday',
	        shopDesc: 'A strong man will struggle with the storms of fate',
	        shopImgList: [{
	          shopImgWidth: 220,
	          shopImgHeight: 220,
	          shopImg: 'https://gd3.alicdn.com/bao/uploaded/i3/TB1MQ8_KVXXXXaLXVXXXXXXXXXX_!!0-item_pic.jpg_220x220.jpg'
	        }, {
	          shopImgWidth: 220,
	          shopImgHeight: 220,
	          shopImg: 'https://gd2.alicdn.com/imgextra/i2/53218032/TB2bGSqiXXXXXXyXpXXXXXXXXXX_!!53218032.jpg_220x220.jpg'
	        }, {
	          shopImgWidth: 220,
	          shopImgHeight: 220,
	          shopImg: 'https://gd2.alicdn.com/bao/uploaded/i2/TB1kP2zKFXXXXbIXXXXXXXXXXXX_!!0-item_pic.jpg_220x220.jpg'
	        }],
	        shopLikeImg: 'https://img.alicdn.com/tps/i1/TB1jTxXIVXXXXb8XXXX07tlTXXX-200-200.png_88x88xz.jpg',
	        shopLikeText: '6',
	        shopCommentImg: 'https://img.alicdn.com/tps/i1/TB1kTKyIVXXXXacXFXX07tlTXXX-200-200.png_88x88xz.jpg',
	        shopCommentText: '97',
	        shopLookImg: 'https://img.alicdn.com/imgextra/i4/397746073/TB2IseKeFXXXXcVXXXXXXXXXXXX-397746073.png_88x88xz.jpg',
	        shopLookText: '1003',
	        shareImg: 'https://cbu01.alicdn.com/cms/upload/2015/930/224/2422039_702806130.png_88x88xz.jpg',
	        shareText: "10"

	      }, {
	        id: 6,
	        scopeValue: 1,
	        PersonPhoto: 'https://gw.alicdn.com/tps/i3/TB1yeWeIFXXXXX5XFXXuAZJYXXX-210-210.png_60x60.jpg',
	        PersonName: 'Ruskin',
	        PersonVisitTime: 'yesterday',
	        shopDesc: 'Living without an aim is like sailing without a compass',
	        shopImgList: [{
	          shopImgWidth: 220,
	          shopImgHeight: 220,
	          shopImg: 'https://gd4.alicdn.com/bao/uploaded/i4/TB11yFnHXXXXXakaXXXXXXXXXXX_!!0-item_pic.jpg_220x220.jpg'
	        }, {
	          shopImgWidth: 220,
	          shopImgHeight: 220,
	          shopImg: 'https://gd4.alicdn.com/imgextra/i4/32720628/TB2CRJUcXXXXXXwXpXXXXXXXXXX_!!32720628.jpg_220x220.jpg'
	        }, {
	          shopImgWidth: 220,
	          shopImgHeight: 220,
	          shopImg: 'https://gd2.alicdn.com/bao/uploaded/i2/TB17LUzHXXXXXcEaXXXXXXXXXXX_!!0-item_pic.jpg_220x220.jpg'
	        }],
	        shopLikeImg: 'https://img.alicdn.com/tps/i1/TB1jTxXIVXXXXb8XXXX07tlTXXX-200-200.png_88x88xz.jpg',
	        shopLikeText: '6',
	        shopCommentImg: 'https://img.alicdn.com/tps/i1/TB1kTKyIVXXXXacXFXX07tlTXXX-200-200.png_88x88xz.jpg',
	        shopCommentText: '97',
	        shopLookImg: 'https://img.alicdn.com/imgextra/i4/397746073/TB2IseKeFXXXXcVXXXXXXXXXXXX-397746073.png_88x88xz.jpg',
	        shopLookText: '1003',
	        shareImg: 'https://cbu01.alicdn.com/cms/upload/2015/930/224/2422039_702806130.png_88x88xz.jpg',
	        shareText: "10"

	      }, {
	        id: 7,
	        scopeValue: 2,
	        PersonPhoto: 'https://gw.alicdn.com/tps/i3/TB1yeWeIFXXXXX5XFXXuAZJYXXX-210-210.png_60x60.jpg',
	        PersonName: 'Yiming',
	        PersonVisitTime: 'today',
	        shopDesc: 'Live a noble and honest life. Reviving past times in your old age will help you to enjoy your life again',
	        shopImgList: [{
	          shopImgWidth: 220,
	          shopImgHeight: 220,
	          shopImg: 'https://gd4.alicdn.com/bao/uploaded/i4/TB1hvNoJXXXXXaMaXXXXXXXXXXX_!!0-item_pic.jpg_220x220.jpg'
	        }, {
	          shopImgWidth: 220,
	          shopImgHeight: 220,
	          shopImg: 'https://gd4.alicdn.com/imgextra/i4/2058567235/TB2V8iygFXXXXaRXpXXXXXXXXXX_!!2058567235.jpg_220x220.jpg'
	        }, {
	          shopImgWidth: 220,
	          shopImgHeight: 220,
	          shopImg: 'https://gd2.alicdn.com/imgextra/i2/2058567235/TB2im1QgFXXXXX8XXXXXXXXXXXX_!!2058567235.jpg_220x220.jpg'
	        }],
	        shopLikeImg: 'https://img.alicdn.com/tps/i1/TB1jTxXIVXXXXb8XXXX07tlTXXX-200-200.png_88x88xz.jpg',
	        shopLikeText: '6',
	        shopCommentImg: 'https://img.alicdn.com/tps/i1/TB1kTKyIVXXXXacXFXX07tlTXXX-200-200.png_88x88xz.jpg',
	        shopCommentText: '97',
	        shopLookImg: 'https://img.alicdn.com/imgextra/i4/397746073/TB2IseKeFXXXXcVXXXXXXXXXXXX-397746073.png_88x88xz.jpg',
	        shopLookText: '1003',
	        shareImg: 'https://cbu01.alicdn.com/cms/upload/2015/930/224/2422039_702806130.png_88x88xz.jpg',
	        shareText: "10"

	      }, {
	        id: 8,
	        scopeValue: 3,
	        PersonPhoto: 'https://gw.alicdn.com/tps/i3/TB1yeWeIFXXXXX5XFXXuAZJYXXX-210-210.png_60x60.jpg',
	        PersonName: 'Brown',
	        PersonVisitTime: 'yesterday',
	        shopDesc: 'Behind every successful man there\'s a lot u unsuccessful years',
	        shopImgList: [{
	          shopImgWidth: 220,
	          shopImgHeight: 220,
	          shopImg: 'https://gd1.alicdn.com/bao/uploaded/i1/TB18BZ2KFXXXXb8XFXXXXXXXXXX_!!0-item_pic.jpg_220x220.jpg'
	        }, {
	          shopImgWidth: 220,
	          shopImgHeight: 220,
	          shopImg: 'https://gd1.alicdn.com/imgextra/i1/2775383848/TB2r012jVXXXXXHXpXXXXXXXXXX_!!2775383848.jpg_220x220.jpg'
	        }, {
	          shopImgWidth: 220,
	          shopImgHeight: 220,
	          shopImg: 'https://gd3.alicdn.com/imgextra/i3/2775383848/TB2iI9VjVXXXXaoXpXXXXXXXXXX_!!2775383848.jpg_220x220.jpg'
	        }],
	        shopLikeImg: 'https://img.alicdn.com/tps/i1/TB1jTxXIVXXXXb8XXXX07tlTXXX-200-200.png_88x88xz.jpg',
	        shopLikeText: '6',
	        shopCommentImg: 'https://img.alicdn.com/tps/i1/TB1kTKyIVXXXXacXFXX07tlTXXX-200-200.png_88x88xz.jpg',
	        shopCommentText: '97',
	        shopLookImg: 'https://img.alicdn.com/imgextra/i4/397746073/TB2IseKeFXXXXcVXXXXXXXXXXXX-397746073.png_88x88xz.jpg',
	        shopLookText: '1003',
	        shareImg: 'https://cbu01.alicdn.com/cms/upload/2015/930/224/2422039_702806130.png_88x88xz.jpg',
	        shareText: "10"

	      }, {
	        id: 9,
	        scopeValue: 4,
	        PersonPhoto: 'https://gw.alicdn.com/tps/i3/TB1yeWeIFXXXXX5XFXXuAZJYXXX-210-210.png_60x60.jpg',
	        PersonName: 'YIMING',
	        PersonVisitTime: 'today',
	        shopDesc: 'Enrich your life today,. yesterday is history.tomorrow is mystery',
	        shopImgList: [{
	          shopImgWidth: 220,
	          shopImgHeight: 220,
	          shopImg: 'https://gd1.alicdn.com/bao/uploaded/i1/TB1JB.rLpXXXXXLXXXXXXXXXXXX_!!0-item_pic.jpg_220x220.jpg'
	        }, {
	          shopImgWidth: 220,
	          shopImgHeight: 220,
	          shopImg: 'https://gd4.alicdn.com/imgextra/i4/2702739128/TB2JdvmjVXXXXXjXXXXXXXXXXXX_!!2702739128.jpg_220x220.jpg'
	        }, {
	          shopImgWidth: 220,
	          shopImgHeight: 220,
	          shopImg: 'https://gd2.alicdn.com/imgextra/i2/2702739128/TB2A.e6jVXXXXXGXpXXXXXXXXXX_!!2702739128.jpg_220x220.jpg'
	        }],
	        shopLikeImg: 'https://img.alicdn.com/tps/i1/TB1jTxXIVXXXXb8XXXX07tlTXXX-200-200.png_88x88xz.jpg',
	        shopLikeText: '6',
	        shopCommentImg: 'https://img.alicdn.com/tps/i1/TB1kTKyIVXXXXacXFXX07tlTXXX-200-200.png_88x88xz.jpg',
	        shopCommentText: '97',
	        shopLookImg: 'https://img.alicdn.com/imgextra/i4/397746073/TB2IseKeFXXXXcVXXXXXXXXXXXX-397746073.png_88x88xz.jpg',
	        shopLookText: '1003',
	        shareImg: 'https://cbu01.alicdn.com/cms/upload/2015/930/224/2422039_702806130.png_88x88xz.jpg',
	        shareText: "10"

	      }, {
	        id: 10,
	        scopeValue: 5,
	        PersonPhoto: 'https://gw.alicdn.com/tps/i3/TB1yeWeIFXXXXX5XFXXuAZJYXXX-210-210.png_60x60.jpg',
	        PersonName: 'YIMING',
	        PersonVisitTime: 'yesterday',
	        shopDesc: 'The secret of success is constancy to purpose',
	        shopImgList: [{
	          shopImgWidth: 220,
	          shopImgHeight: 220,
	          shopImg: 'https://gd3.alicdn.com/bao/uploaded/i3/TB17zXOGXXXXXbEXVXXXXXXXXXX_!!0-item_pic.jpg_220x220.jpg'
	        }, {
	          shopImgWidth: 220,
	          shopImgHeight: 220,
	          shopImg: 'https://gd1.alicdn.com/imgextra/i1/2265445951/TB22ACTbFXXXXXBXXXXXXXXXXXX_!!2265445951.jpg_220x220.jpg'
	        }, {
	          shopImgWidth: 220,
	          shopImgHeight: 220,
	          shopImg: 'https://gd3.alicdn.com/imgextra/i3/2265445951/TB2oXqUbFXXXXXIXXXXXXXXXXXX_!!2265445951.jpg_220x220.jpg'
	        }],
	        shopLikeImg: 'https://img.alicdn.com/tps/i1/TB1jTxXIVXXXXb8XXXX07tlTXXX-200-200.png_88x88xz.jpg',
	        shopLikeText: '6',
	        shopCommentImg: 'https://img.alicdn.com/tps/i1/TB1kTKyIVXXXXacXFXX07tlTXXX-200-200.png_88x88xz.jpg',
	        shopCommentText: '97',
	        shopLookImg: 'https://img.alicdn.com/imgextra/i4/397746073/TB2IseKeFXXXXcVXXXXXXXXXXXX-397746073.png_88x88xz.jpg',
	        shopLookText: '1003',
	        shareImg: 'https://cbu01.alicdn.com/cms/upload/2015/930/224/2422039_702806130.png_88x88xz.jpg',
	        shareText: "10"
	      }]
	    };
	  },
	  methods: {
	    loadmore: function loadmore(e) {
	      modal.toast({
	        'message': 'loadmore',
	        'duration': 2.0
	      });
	    },
	    oncellclick: function oncellclick(id) {
	      modal.toast({
	        'message': 'row ' + id + ' clicked',
	        'duration': 2.0
	      });
	    }
	  }

	};

/***/ },

/***/ 494:
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _h('list', {
	    staticClass: ["list"],
	    attrs: {
	      "loadmoreoffset": "2000"
	    },
	    on: {
	      "loadmore": _vm.loadmore
	    }
	  }, [_vm._l((_vm.shopList), function(item) {
	    return _h('cell', {
	      staticClass: ["cell"],
	      attrs: {
	        "scope": item.scopeValue
	      },
	      on: {
	        "click": function($event) {
	          _vm.oncellclick(item.id)
	        }
	      }
	    }, [_h('div', {
	      staticClass: ["shopDiv"]
	    }, [_h('div', {
	      staticClass: ["shopHeader"],
	      staticStyle: {
	        flexDirection: "row"
	      }
	    }, [_h('div', {
	      staticStyle: {
	        flex: "2",
	        flexDirection: "row"
	      }
	    }, [_h('div', [_h('image', {
	      staticStyle: {
	        width: "60",
	        height: "60"
	      },
	      attrs: {
	        "src": item.PersonPhoto
	      }
	    })]), _h('div', {
	      staticStyle: {
	        flexDirection: "column",
	        marginLeft: "5"
	      }
	    }, [_h('div', {
	      staticStyle: {
	        marginTop: "5"
	      }
	    }, [_h('text', {
	      staticStyle: {
	        fontSize: "20"
	      }
	    }, [_vm._s(item.PersonName)])]), _h('div', {
	      staticStyle: {
	        marginTop: "5"
	      }
	    }, [_h('text', {
	      staticStyle: {
	        fontSize: "20",
	        color: "#cccccc"
	      }
	    }, [_vm._s(item.PersonVisitTime)])])])]), _vm._m(0, true)]), _h('div', {
	      staticClass: ["shopBody"],
	      staticStyle: {
	        flexDirection: "column"
	      }
	    }, [_h('div', {
	      staticClass: ["descDiv"],
	      staticStyle: {
	        marginTop: "10",
	        marginLeft: "10"
	      }
	    }, [_h('text', {
	      staticClass: ["shopDesc"],
	      staticStyle: {
	        fontSize: "25"
	      }
	    }, [_vm._s(item.shopDesc)])]), _h('div', {
	      staticStyle: {
	        flexDirection: "row"
	      }
	    }, [_vm._l((item.shopImgList), function(img) {
	      return _h('div', {
	        staticClass: ["imgDiv"],
	        staticStyle: {
	          flex: "1",
	          flexDirection: "column",
	          margin: "10"
	        }
	      }, [_h('div', [_h('image', {
	        staticClass: ["shopImg"],
	        style: {
	          width: img.shopImgWidth,
	          height: img.shopImgHeight
	        },
	        attrs: {
	          "src": img.shopImg
	        }
	      })]), _vm._m(1, true)])
	    })])]), _h('div', {
	      staticClass: ["shopFooter"],
	      staticStyle: {
	        flexDirection: "row",
	        marginTop: "10",
	        marginLeft: "10",
	        justifyContent: "flex-end"
	      }
	    }, [_h('div', {
	      staticStyle: {
	        marginRight: "5"
	      }
	    }, [_h('image', {
	      staticClass: ["shopLikeImg", "smallImg"],
	      attrs: {
	        "src": item.shopLikeImg
	      }
	    })]), _h('div', {
	      staticStyle: {
	        marginRight: "15"
	      }
	    }, [_h('text', {
	      staticClass: ["shopLikeText"],
	      staticStyle: {
	        fontSize: "20"
	      }
	    }, [_vm._s(item.shopLikeText)])]), _h('div', {
	      staticStyle: {
	        marginRight: "5"
	      }
	    }, [_h('image', {
	      staticClass: ["shopCommentImg", "smallImg"],
	      attrs: {
	        "src": item.shopCommentImg
	      }
	    })]), _h('div', {
	      staticStyle: {
	        marginRight: "15"
	      }
	    }, [_h('text', {
	      staticClass: ["shopCommentText"],
	      staticStyle: {
	        fontSize: "20"
	      }
	    }, [_vm._s(item.shopCommentText)])]), _h('div', {
	      staticStyle: {
	        marginRight: "5"
	      }
	    }, [_h('image', {
	      staticClass: ["shopLookImg", "smallImg"],
	      attrs: {
	        "src": item.shopLookImg
	      }
	    })]), _h('div', {
	      staticStyle: {
	        marginRight: "15"
	      }
	    }, [_h('text', {
	      staticClass: ["shopLookText"],
	      staticStyle: {
	        fontSize: "20"
	      }
	    }, [_vm._s(item.shopLookText)])]), _h('div', {
	      staticStyle: {
	        marginRight: "5"
	      }
	    }, [_h('image', {
	      staticClass: ["shareImg", "smallImg"],
	      attrs: {
	        "src": item.shareImg
	      }
	    })]), _h('div', {
	      staticStyle: {
	        marginRight: "20"
	      }
	    }, [_h('text', {
	      staticClass: ["shareText"],
	      staticStyle: {
	        fontSize: "20"
	      }
	    }, [_vm._s(item.shareText)])])])])])
	  })])
	},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _h('div', {
	    staticStyle: {
	      flex: "5",
	      flexDirection: "row"
	    }
	  }, [_h('div', {
	    staticStyle: {
	      flexDirection: "row",
	      marginLeft: "10",
	      marginTop: "10"
	    }
	  }, [_h('div', [_h('image', {
	    staticStyle: {
	      width: "20",
	      height: "20"
	    },
	    attrs: {
	      "src": "https://img.alicdn.com/tps/i4/TB1zkDeIFXXXXXrXVXX07tlTXXX-200-200.png_88x88xz.jpg"
	    }
	  })]), _h('div', [_h('text', {
	    staticStyle: {
	      fontSize: "20"
	    }
	  }, ["Hope"])])]), _h('div', {
	    staticStyle: {
	      position: "absolute",
	      left: "90",
	      top: "10",
	      flexDirection: "row"
	    }
	  }, [_h('div', [_h('image', {
	    staticStyle: {
	      width: "20",
	      height: "20"
	    },
	    attrs: {
	      "src": "https://img.alicdn.com/tps/i2/TB1hRb1IXXXXXX3XVXXXQaP.pXX-87-87.jpeg"
	    }
	  })]), _h('div', [_h('text', {
	    staticStyle: {
	      fontSize: "20"
	    }
	  }, ["Mem"])])]), _h('div', {
	    staticStyle: {
	      position: "absolute",
	      left: "170",
	      top: "10",
	      flexDirection: "row"
	    }
	  }, [_h('div', [_h('image', {
	    staticStyle: {
	      width: "20",
	      height: "20"
	    },
	    attrs: {
	      "src": "https://img.alicdn.com/tps/i3/TB1DGkJJFXXXXaZXFXX07tlTXXX-200-200.png"
	    }
	  })]), _h('div', [_h('text', {
	    staticStyle: {
	      fontSize: "20"
	    }
	  }, ["auth"])])]), _h('div', {
	    staticStyle: {
	      position: "absolute",
	      left: "250",
	      top: "10",
	      flexDirection: "row"
	    }
	  }, [_h('div', [_h('image', {
	    staticStyle: {
	      width: "20",
	      height: "20"
	    },
	    attrs: {
	      "src": "https://img.alicdn.com/tps/i1/TB1nFvPIXXXXXbUXXXXUAkPJpXX-87-87.png"
	    }
	  })]), _h('div', [_h('text', {
	    staticStyle: {
	      fontSize: "20"
	    }
	  }, ["Friend"])])]), _h('div', {
	    staticStyle: {
	      position: "absolute",
	      left: "330",
	      top: "10",
	      flexDirection: "row"
	    }
	  }, [_h('div', [_h('image', {
	    staticStyle: {
	      width: "20",
	      height: "20"
	    },
	    attrs: {
	      "src": "https://img.alicdn.com/tps/i2/TB1CpD7IXXXXXbSXXXXUAkPJpXX-87-87.png"
	    }
	  })]), _h('div', [_h('text', {
	    staticStyle: {
	      fontSize: "20"
	    }
	  }, ["issue"])])]), _h('div', {
	    staticStyle: {
	      position: "absolute",
	      left: "410",
	      top: "10",
	      flexDirection: "row"
	    }
	  }, [_h('div', [_h('image', {
	    staticStyle: {
	      width: "20",
	      height: "20"
	    },
	    attrs: {
	      "src": "https://gtms02.alicdn.com/tps/i2/TB11ZZfIVXXXXbMXFXXEDhGGXXX-32-32.png"
	    }
	  })]), _h('div', [_h('text', {
	    staticStyle: {
	      fontSize: "20"
	    }
	  }, ["super"])])])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _h('div', {
	    staticStyle: {
	      flex: "1",
	      marginTop: "10",
	      flexDirection: "row"
	    }
	  }, [_h('div', {
	    staticStyle: {
	      flex: "1",
	      justifyContent: "center",
	      flexDirection: "row"
	    }
	  }, [_h('div', [_h('image', {
	    staticStyle: {
	      width: "20",
	      height: "20"
	    },
	    attrs: {
	      "src": "https://img.alicdn.com/tps/i1/TB1nFvPIXXXXXbUXXXXUAkPJpXX-87-87.png"
	    }
	  })]), _h('div', {
	    staticStyle: {
	      marginLeft: "5"
	    }
	  }, [_h('text', {
	    staticStyle: {
	      fontSize: "20",
	      textAlign: "center"
	    }
	  }, ["Up"])])]), _h('div', {
	    staticStyle: {
	      flex: "1",
	      justifyContent: "center",
	      flexDirection: "row"
	    }
	  }, [_h('div', [_h('image', {
	    staticStyle: {
	      width: "20",
	      height: "20"
	    },
	    attrs: {
	      "src": "https://img.alicdn.com/tps/i2/TB1CpD7IXXXXXbSXXXXUAkPJpXX-87-87.png"
	    }
	  })]), _h('div', {
	    staticStyle: {
	      marginLeft: "5"
	    }
	  }, [_h('text', {
	    staticStyle: {
	      fontSize: "20",
	      textAlign: "center"
	    }
	  }, ["down"])])])])
	}]}
	module.exports.render._withStripped = true

/***/ }

/******/ });