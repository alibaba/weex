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

	;__weex_define__("@weex-component/27404869ac7d04c3c768257387390d1b", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	  __weex_module__.exports = {
	    data: function () {return {
	      backgroundColor: 'red',
	      composite: 'false',
	      shopList: [
	        {
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
	          shareText: "10",

	        },
	        {
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
	          shareText: "10",

	        },
	        {
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
	          shareText: "10",

	        },
	        {
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
	          shareText: "10",

	        },
	        {
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
	          shareText: "10",

	        },
	        {
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
	          shareText: "10",

	        },
	        {
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
	          shareText: "10",

	        },
	        {
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
	          shareText: "10",

	        },
	        {
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
	          shareText: "10",

	        },
	        {
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
	          shareText: "10",
	        }
	      ],
	    }},
	    methods: {
	      loadmore: function(e) {
	        this.$call('modal', 'toast', {
	          'message': 'loadmore',
	          'duration': 2.0
	        });
	      },
	      oncellclick: function(e) {
	        this.$call('modal', 'toast', {
	          'message': 'row ' + e.target.attr.rownumber + ' clicked',
	          'duration': 2.0
	        });
	      },
	      onfixedclick: function(e) {
	        if (e.target.style.backgroundColor == 'red') {
	          this.backgroundColor = 'green';
	          this.composite = true;
	        }
	        else {
	          this.backgroundColor = 'red';
	          this.composite = false;
	        }
	      }
	    }

	  }

	;__weex_module__.exports.template={
	  "type": "list",
	  "classList": [
	    "list"
	  ],
	  "events": {
	    "loadmore": "loadmore"
	  },
	  "attr": {
	    "loadmoreoffset": "2000"
	  },
	  "children": [
	    {
	      "type": "cell",
	      "append": "tree",
	      "classList": [
	        "cell"
	      ],
	      "events": {
	        "click": "oncellclick"
	      },
	      "attr": {
	        "rownumber": function () {return this.id},
	        "scope": function () {return this.scopeValue},
	        "composite": function () {return this.composite}
	      },
	      "repeat": function () {return this.shopList},
	      "children": [
	        {
	          "type": "div",
	          "classList": [
	            "shopDiv"
	          ],
	          "children": [
	            {
	              "type": "div",
	              "classList": [
	                "shopHeader"
	              ],
	              "style": {
	                "flexDirection": "row"
	              },
	              "children": [
	                {
	                  "type": "div",
	                  "style": {
	                    "flex": 2,
	                    "flexDirection": "row"
	                  },
	                  "children": [
	                    {
	                      "type": "div",
	                      "children": [
	                        {
	                          "type": "image",
	                          "style": {
	                            "width": 60,
	                            "height": 60
	                          },
	                          "attr": {
	                            "src": function () {return this.PersonPhoto}
	                          }
	                        }
	                      ]
	                    },
	                    {
	                      "type": "div",
	                      "style": {
	                        "flexDirection": "column",
	                        "marginLeft": 5
	                      },
	                      "children": [
	                        {
	                          "type": "div",
	                          "style": {
	                            "marginTop": 5
	                          },
	                          "children": [
	                            {
	                              "type": "text",
	                              "style": {
	                                "fontSize": 20
	                              },
	                              "attr": {
	                                "value": function () {return this.PersonName}
	                              }
	                            }
	                          ]
	                        },
	                        {
	                          "type": "div",
	                          "style": {
	                            "marginTop": 5
	                          },
	                          "children": [
	                            {
	                              "type": "text",
	                              "style": {
	                                "fontSize": 20,
	                                "color": "#cccccc"
	                              },
	                              "attr": {
	                                "value": function () {return this.PersonVisitTime}
	                              }
	                            }
	                          ]
	                        }
	                      ]
	                    }
	                  ]
	                },
	                {
	                  "type": "div",
	                  "style": {
	                    "flex": 5,
	                    "flexDirection": "row"
	                  },
	                  "children": [
	                    {
	                      "type": "div",
	                      "style": {
	                        "flexDirection": "row",
	                        "marginLeft": 10,
	                        "marginTop": 10
	                      },
	                      "children": [
	                        {
	                          "type": "div",
	                          "children": [
	                            {
	                              "type": "image",
	                              "style": {
	                                "width": 20,
	                                "height": 20
	                              },
	                              "attr": {
	                                "src": "https://img.alicdn.com/tps/i4/TB1zkDeIFXXXXXrXVXX07tlTXXX-200-200.png_88x88xz.jpg"
	                              }
	                            }
	                          ]
	                        },
	                        {
	                          "type": "div",
	                          "children": [
	                            {
	                              "type": "text",
	                              "style": {
	                                "fontSize": 20
	                              },
	                              "attr": {
	                                "value": "Hope"
	                              }
	                            }
	                          ]
	                        }
	                      ]
	                    },
	                    {
	                      "type": "div",
	                      "style": {
	                        "position": "absolute",
	                        "left": 90,
	                        "top": 10,
	                        "flexDirection": "row"
	                      },
	                      "children": [
	                        {
	                          "type": "div",
	                          "children": [
	                            {
	                              "type": "image",
	                              "style": {
	                                "width": 20,
	                                "height": 20
	                              },
	                              "attr": {
	                                "src": "https://img.alicdn.com/tps/i2/TB1hRb1IXXXXXX3XVXXXQaP.pXX-87-87.jpeg"
	                              }
	                            }
	                          ]
	                        },
	                        {
	                          "type": "div",
	                          "children": [
	                            {
	                              "type": "text",
	                              "style": {
	                                "fontSize": 20
	                              },
	                              "attr": {
	                                "value": "Mem"
	                              }
	                            }
	                          ]
	                        }
	                      ]
	                    },
	                    {
	                      "type": "div",
	                      "style": {
	                        "position": "absolute",
	                        "left": 170,
	                        "top": 10,
	                        "flexDirection": "row"
	                      },
	                      "children": [
	                        {
	                          "type": "div",
	                          "children": [
	                            {
	                              "type": "image",
	                              "style": {
	                                "width": 20,
	                                "height": 20
	                              },
	                              "attr": {
	                                "src": "https://img.alicdn.com/tps/i3/TB1DGkJJFXXXXaZXFXX07tlTXXX-200-200.png"
	                              }
	                            }
	                          ]
	                        },
	                        {
	                          "type": "div",
	                          "children": [
	                            {
	                              "type": "text",
	                              "style": {
	                                "fontSize": 20
	                              },
	                              "attr": {
	                                "value": "auth"
	                              }
	                            }
	                          ]
	                        }
	                      ]
	                    },
	                    {
	                      "type": "div",
	                      "style": {
	                        "position": "absolute",
	                        "left": 250,
	                        "top": 10,
	                        "flexDirection": "row"
	                      },
	                      "children": [
	                        {
	                          "type": "div",
	                          "children": [
	                            {
	                              "type": "image",
	                              "style": {
	                                "width": 20,
	                                "height": 20
	                              },
	                              "attr": {
	                                "src": "https://img.alicdn.com/tps/i1/TB1nFvPIXXXXXbUXXXXUAkPJpXX-87-87.png"
	                              }
	                            }
	                          ]
	                        },
	                        {
	                          "type": "div",
	                          "children": [
	                            {
	                              "type": "text",
	                              "style": {
	                                "fontSize": 20
	                              },
	                              "attr": {
	                                "value": "Friend"
	                              }
	                            }
	                          ]
	                        }
	                      ]
	                    },
	                    {
	                      "type": "div",
	                      "style": {
	                        "position": "absolute",
	                        "left": 330,
	                        "top": 10,
	                        "flexDirection": "row"
	                      },
	                      "children": [
	                        {
	                          "type": "div",
	                          "children": [
	                            {
	                              "type": "image",
	                              "style": {
	                                "width": 20,
	                                "height": 20
	                              },
	                              "attr": {
	                                "src": "https://img.alicdn.com/tps/i2/TB1CpD7IXXXXXbSXXXXUAkPJpXX-87-87.png"
	                              }
	                            }
	                          ]
	                        },
	                        {
	                          "type": "div",
	                          "children": [
	                            {
	                              "type": "text",
	                              "style": {
	                                "fontSize": 20
	                              },
	                              "attr": {
	                                "value": "issue"
	                              }
	                            }
	                          ]
	                        }
	                      ]
	                    },
	                    {
	                      "type": "div",
	                      "style": {
	                        "position": "absolute",
	                        "left": 410,
	                        "top": 10,
	                        "flexDirection": "row"
	                      },
	                      "children": [
	                        {
	                          "type": "div",
	                          "children": [
	                            {
	                              "type": "image",
	                              "style": {
	                                "width": 20,
	                                "height": 20
	                              },
	                              "attr": {
	                                "src": "https://gtms02.alicdn.com/tps/i2/TB11ZZfIVXXXXbMXFXXEDhGGXXX-32-32.png"
	                              }
	                            }
	                          ]
	                        },
	                        {
	                          "type": "div",
	                          "children": [
	                            {
	                              "type": "text",
	                              "style": {
	                                "fontSize": 20
	                              },
	                              "attr": {
	                                "value": "super"
	                              }
	                            }
	                          ]
	                        }
	                      ]
	                    }
	                  ]
	                }
	              ]
	            },
	            {
	              "type": "div",
	              "classList": [
	                "shopBody"
	              ],
	              "style": {
	                "flexDirection": "column"
	              },
	              "children": [
	                {
	                  "type": "div",
	                  "classList": [
	                    "descDiv"
	                  ],
	                  "style": {
	                    "marginTop": 10,
	                    "marginLeft": 10
	                  },
	                  "children": [
	                    {
	                      "type": "text",
	                      "classList": [
	                        "shopDesc"
	                      ],
	                      "style": {
	                        "fontSize": 25
	                      },
	                      "attr": {
	                        "value": function () {return this.shopDesc}
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
	                      "type": "div",
	                      "classList": [
	                        "imgDiv"
	                      ],
	                      "style": {
	                        "flex": 1,
	                        "flexDirection": "column",
	                        "margin": 10
	                      },
	                      "repeat": function () {return this.shopImgList},
	                      "children": [
	                        {
	                          "type": "div",
	                          "children": [
	                            {
	                              "type": "image",
	                              "classList": [
	                                "shopImg"
	                              ],
	                              "style": {
	                                "width": function () {return this.shopImgWidth},
	                                "height": function () {return this.shopImgHeight}
	                              },
	                              "attr": {
	                                "src": function () {return this.shopImg}
	                              }
	                            }
	                          ]
	                        },
	                        {
	                          "type": "div",
	                          "style": {
	                            "flex": 1,
	                            "marginTop": 10,
	                            "flexDirection": "row"
	                          },
	                          "children": [
	                            {
	                              "type": "div",
	                              "style": {
	                                "flex": 1,
	                                "justifyContent": "center",
	                                "flexDirection": "row"
	                              },
	                              "children": [
	                                {
	                                  "type": "div",
	                                  "children": [
	                                    {
	                                      "type": "image",
	                                      "style": {
	                                        "width": 20,
	                                        "height": 20
	                                      },
	                                      "attr": {
	                                        "src": "https://img.alicdn.com/tps/i1/TB1nFvPIXXXXXbUXXXXUAkPJpXX-87-87.png"
	                                      }
	                                    }
	                                  ]
	                                },
	                                {
	                                  "type": "div",
	                                  "style": {
	                                    "marginLeft": 5
	                                  },
	                                  "children": [
	                                    {
	                                      "type": "text",
	                                      "style": {
	                                        "fontSize": 20,
	                                        "textAlign": "center"
	                                      },
	                                      "attr": {
	                                        "value": "Up"
	                                      }
	                                    }
	                                  ]
	                                }
	                              ]
	                            },
	                            {
	                              "type": "div",
	                              "style": {
	                                "flex": 1,
	                                "justifyContent": "center",
	                                "flexDirection": "row"
	                              },
	                              "children": [
	                                {
	                                  "type": "div",
	                                  "children": [
	                                    {
	                                      "type": "image",
	                                      "style": {
	                                        "width": 20,
	                                        "height": 20
	                                      },
	                                      "attr": {
	                                        "src": "https://img.alicdn.com/tps/i2/TB1CpD7IXXXXXbSXXXXUAkPJpXX-87-87.png"
	                                      }
	                                    }
	                                  ]
	                                },
	                                {
	                                  "type": "div",
	                                  "style": {
	                                    "marginLeft": 5
	                                  },
	                                  "children": [
	                                    {
	                                      "type": "text",
	                                      "style": {
	                                        "fontSize": 20,
	                                        "textAlign": "center"
	                                      },
	                                      "attr": {
	                                        "value": "down"
	                                      }
	                                    }
	                                  ]
	                                }
	                              ]
	                            }
	                          ]
	                        }
	                      ]
	                    }
	                  ]
	                }
	              ]
	            },
	            {
	              "type": "div",
	              "classList": [
	                "shopFooter"
	              ],
	              "style": {
	                "flexDirection": "row",
	                "marginTop": 10,
	                "marginLeft": 10,
	                "justifyContent": "flex-end"
	              },
	              "children": [
	                {
	                  "type": "div",
	                  "style": {
	                    "marginRight": 5
	                  },
	                  "children": [
	                    {
	                      "type": "image",
	                      "classList": [
	                        "shopLikeImg",
	                        "smallImg"
	                      ],
	                      "attr": {
	                        "src": function () {return this.shopLikeImg}
	                      }
	                    }
	                  ]
	                },
	                {
	                  "type": "div",
	                  "style": {
	                    "marginRight": 15
	                  },
	                  "children": [
	                    {
	                      "type": "text",
	                      "classList": [
	                        "shopLikeText"
	                      ],
	                      "style": {
	                        "fontSize": 20
	                      },
	                      "attr": {
	                        "value": function () {return this.shopLikeText}
	                      }
	                    }
	                  ]
	                },
	                {
	                  "type": "div",
	                  "style": {
	                    "marginRight": 5
	                  },
	                  "children": [
	                    {
	                      "type": "image",
	                      "classList": [
	                        "shopCommentImg",
	                        "smallImg"
	                      ],
	                      "attr": {
	                        "src": function () {return this.shopCommentImg}
	                      }
	                    }
	                  ]
	                },
	                {
	                  "type": "div",
	                  "style": {
	                    "marginRight": 15
	                  },
	                  "children": [
	                    {
	                      "type": "text",
	                      "classList": [
	                        "shopCommentText"
	                      ],
	                      "style": {
	                        "fontSize": 20
	                      },
	                      "attr": {
	                        "value": function () {return this.shopCommentText}
	                      }
	                    }
	                  ]
	                },
	                {
	                  "type": "div",
	                  "style": {
	                    "marginRight": 5
	                  },
	                  "children": [
	                    {
	                      "type": "image",
	                      "classList": [
	                        "shopLookImg",
	                        "smallImg"
	                      ],
	                      "attr": {
	                        "src": function () {return this.shopLookImg}
	                      }
	                    }
	                  ]
	                },
	                {
	                  "type": "div",
	                  "style": {
	                    "marginRight": 15
	                  },
	                  "children": [
	                    {
	                      "type": "text",
	                      "classList": [
	                        "shopLookText"
	                      ],
	                      "style": {
	                        "fontSize": 20
	                      },
	                      "attr": {
	                        "value": function () {return this.shopLookText}
	                      }
	                    }
	                  ]
	                },
	                {
	                  "type": "div",
	                  "style": {
	                    "marginRight": 5
	                  },
	                  "children": [
	                    {
	                      "type": "image",
	                      "classList": [
	                        "shareImg",
	                        "smallImg"
	                      ],
	                      "attr": {
	                        "src": function () {return this.shareImg}
	                      }
	                    }
	                  ]
	                },
	                {
	                  "type": "div",
	                  "style": {
	                    "marginRight": 20
	                  },
	                  "children": [
	                    {
	                      "type": "text",
	                      "classList": [
	                        "shareText"
	                      ],
	                      "style": {
	                        "fontSize": 20
	                      },
	                      "attr": {
	                        "value": function () {return this.shareText}
	                      }
	                    }
	                  ]
	                }
	              ]
	            }
	          ]
	        }
	      ]
	    }
	  ]
	}
	;__weex_module__.exports.style={
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
	})
	;__weex_bootstrap__("@weex-component/27404869ac7d04c3c768257387390d1b", {
	  "transformerVersion": "0.3.1"
	},undefined)

/***/ }
/******/ ]);