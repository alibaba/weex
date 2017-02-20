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
	__vue_styles__.push(__webpack_require__(495)
	)

	/* script */
	__vue_exports__ = __webpack_require__(496)

	/* template */
	var __vue_template__ = __webpack_require__(538)
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
	__vue_options__.__file = "/Users/bobning/work/source/weex_fork/examples/vue/showcase/new-fashion.vue"
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

/***/ 495:
/***/ function(module, exports) {

	module.exports = {
	  "content": {
	    "color": "#353535",
	    "backgroundColor": "#666666",
	    "position": "absolute",
	    "top": 0,
	    "left": 0,
	    "right": 0,
	    "bottom": 0
	  },
	  "refresh": {
	    "alignItems": "center",
	    "justifyContent": "center"
	  },
	  "loading": {
	    "alignItems": "center",
	    "justifyContent": "center"
	  }
	}

/***/ },

/***/ 496:
/***/ function(module, exports, __webpack_require__) {

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

	var modal = __weex_require_module__('modal');
	var timer = __weex_require_module__('timer');

	module.exports = {
	  components: {
	    headlines: __webpack_require__(497),
	    category: __webpack_require__(510),
	    coupon: __webpack_require__(514),
	    goods: __webpack_require__(518),
	    resource: __webpack_require__(522),
	    scene: __webpack_require__(526),
	    match: __webpack_require__(530),
	    brand: __webpack_require__(534)
	  },
	  data: {
	    navBarHeight: 88,
	    cnt: 0,
	    show0: true,
	    show1: false,
	    show2: false,
	    displayRefresh: 'show',
	    displayLoading: 'show',
	    showData: {}
	  },
	  created: function created() {
	    this.showData = {
	      "header": {
	        "topBanner": "https://gw.alicdn.com/tps/TB1J48kMXXXXXXtapXXXXXXXXXX-750-782.jpg",
	        "ruleLink": "https://chaoshi.m.tmall.com/",
	        "isShowShare": true,
	        "shareInfo": {
	          "shareTitle": "我是分享标题",
	          "shareIntro": " 我是分享内容测试",
	          "allLink": "https://www.tmall.com",
	          "mobileImage": "https://gw.alicdn.com/tps/TB1J48kMXXXXXXtapXXXXXXXXXX-750-782.jpg",
	          "pcImage": "https://img.alicdn.com/tps/i4/TB1Dyw1LVXXXXXEapXXSutbFXXX.jpg",
	          "shareScene": "我是测试业务",
	          "bizId": ""
	        },
	        "announceHdBanner": "https://gw.alicdn.com/tps/i4/TB1fzclLVXXXXaVaXXXwu0bFXXX.png",
	        "bannerItems": [{
	          "img": "https://img.alicdn.com/tps/TB1U8LHLVXXXXa3XpXXXXXXXXXX-233-172.jpg",
	          "url": "https://chaoshi.m.tmall.com/"
	        }, {
	          "img": "https://img.alicdn.com/tps/TB1U8LHLVXXXXa3XpXXXXXXXXXX-233-172.jpg",
	          "url": "https://chaoshi.m.tmall.com/"
	        }, {
	          "img": "https://img.alicdn.com/tps/TB1U8LHLVXXXXa3XpXXXXXXXXXX-233-172.jpg",
	          "url": "https://chaoshi.m.tmall.com/"
	        }]
	      },
	      "fashion": {
	        "isHide": false,
	        "floorTitle": "https://gw.alicdn.com/tps/TB1._64LVXXXXatXVXXXXXXXXXX-750-100.jpg",
	        "bigBannerImg": "https://gw.alicdn.com/tps/TB1tO.aLVXXXXcvXpXXXXXXXXXX-750-262.jpg",
	        "bigBannerUrl": "https://chaoshi.m.tmall.com/",
	        "smallBannerItems": [{
	          "img": "https://img.alicdn.com/tps/TB1Ff_0LVXXXXXNaXXXXXXXXXXX-375-262.jpg",
	          "url": "https://chaoshi.m.tmall.com/"
	        }, {
	          "img": "https://img.alicdn.com/tps/TB1Ff_0LVXXXXXNaXXXXXXXXXXX-375-262.jpg",
	          "url": "https://chaoshi.m.tmall.com/"
	        }],
	        "isHideStarBanner": false,
	        "firstStarBannerItems": [{
	          "img": "https://gw.alicdn.com/tps/TB1xlIVLVXXXXckXVXXXXXXXXXX-250-220.jpg",
	          "url": "https://chaoshi.m.tmall.com/"
	        }, {
	          "img": "https://gw.alicdn.com/tps/TB1xlIVLVXXXXckXVXXXXXXXXXX-250-220.jpg",
	          "url": "https://chaoshi.m.tmall.com/"
	        }],
	        "secondStarBannerItems": [{
	          "img": "https://gw.alicdn.com/tps/TB1xlIVLVXXXXckXVXXXXXXXXXX-250-220.jpg",
	          "url": "https://chaoshi.m.tmall.com/"
	        }, {
	          "img": "https://gw.alicdn.com/tps/TB1xlIVLVXXXXckXVXXXXXXXXXX-250-220.jpg",
	          "url": "https://chaoshi.m.tmall.com/"
	        }],
	        "thirdStarBannerItems": [{
	          "img": "https://gw.alicdn.com/tps/TB1xlIVLVXXXXckXVXXXXXXXXXX-250-220.jpg",
	          "url": "https://chaoshi.m.tmall.com/"
	        }, {
	          "img": "https://gw.alicdn.com/tps/TB1xlIVLVXXXXckXVXXXXXXXXXX-250-220.jpg",
	          "url": "https://chaoshi.m.tmall.com/"
	        }]
	      },
	      "goods": {
	        "isHide": false,
	        "floorTitle": "https://gw.alicdn.com/tps/TB1._64LVXXXXatXVXXXXXXXXXX-750-100.jpg",
	        "bannerItems": [{
	          "img1": "https://gw.alicdn.com/tps/TB1TUzGLVXXXXc1XFXXXXXXXXXX-250-296.jpg",
	          "url1": "https://chaoshi.m.tmall.com/",
	          "img2": "https://gw.alicdn.com/tps/TB1TUzGLVXXXXc1XFXXXXXXXXXX-250-296.jpg",
	          "url2": "https://chaoshi.m.tmall.com/",
	          "img3": "https://gw.alicdn.com/tps/TB12MPFLVXXXXXnXVXXXXXXXXXX-250-592.jpg",
	          "url3": "https://chaoshi.m.tmall.com/",
	          "img4": "https://gw.alicdn.com/tps/TB1TUzGLVXXXXc1XFXXXXXXXXXX-250-296.jpg",
	          "url4": "https://chaoshi.m.tmall.com/",
	          "img5": "https://gw.alicdn.com/tps/TB1TUzGLVXXXXc1XFXXXXXXXXXX-250-296.jpg",
	          "url5": "https://chaoshi.m.tmall.com/"
	        }, {
	          "img1": "https://gw.alicdn.com/tps/TB1TUzGLVXXXXc1XFXXXXXXXXXX-250-296.jpg",
	          "url1": "https://chaoshi.m.tmall.com/",
	          "img2": "https://gw.alicdn.com/tps/TB1TUzGLVXXXXc1XFXXXXXXXXXX-250-296.jpg",
	          "url2": "https://chaoshi.m.tmall.com/",
	          "img3": "https://gw.alicdn.com/tps/TB12MPFLVXXXXXnXVXXXXXXXXXX-250-592.jpg",
	          "url3": "https://chaoshi.m.tmall.com/",
	          "img4": "https://gw.alicdn.com/tps/TB1TUzGLVXXXXc1XFXXXXXXXXXX-250-296.jpg",
	          "url4": "https://chaoshi.m.tmall.com/",
	          "img5": "https://gw.alicdn.com/tps/TB1TUzGLVXXXXc1XFXXXXXXXXXX-250-296.jpg",
	          "url5": "https://chaoshi.m.tmall.com/"
	        }]
	      },
	      "coupon": {
	        "floorTitle": "https://gw.alicdn.com/tps/TB1._64LVXXXXatXVXXXXXXXXXX-750-100.jpg"
	      },
	      "scene": {
	        "floorTitle": "https://gw.alicdn.com/tps/TB1._64LVXXXXatXVXXXXXXXXXX-750-100.jpg",
	        "_backup": {
	          "id": "03653",
	          "data": [{
	            "id": "1395",
	            "sceneUrl": "https://pages.tmall.com/wow/act/15617/scene?acm=03653.1003.1.710531&aldid=TPMkJDIw&wh_id=1395&scm=1003.1.03653.MAIN_1395_710531&pos=1",
	            "_s_": "d",
	            "itemImg": "//img.alicdn.com/tps/i2/TB1n6bVLVXXXXcCXVXXTCU0QpXX-300-300.jpg",
	            "sceneCat": "50008881,50008883,50008882,50008884,50012774,50012775,50012776,50012781,50008886,50012766,50012771,50012772,50010850,50000671,162201,50022566,50007068,50026651,50000852,162104,162116,162205,1623,123216004,162404,162401,50011412,50011411,16240,50012773,50006846,50010394,50008888,50008890,50008889,50012784,50012785,50012786,50012787,50008885,50012777,50012778,124730001,50001748,50011130,124730001,50001748,50011130,50011129,50010160,50011161,50011159,50010159,50010158,50011127,3035,50010167,50000557,50011123,50010402,50000436,50011153,50011740,50006843,50006842,124942005,50010368,50011892,50011894,50023751,121366037,121458036,121392038,121420035,121364028,121468026,121400029,121418030,121478031,121480030,121366035,121424025,121426030,121484030,121412031,125054002,125074007,125074008,125104003,125080003,125024006,125080004,121400030,121424024,121482025,121418031,121402028,121388035",
	            "finalScore": "77.26011111111112",
	            "_pos_": 1,
	            "entityType": "MAIN",
	            "benefitImg": "//img.alicdn.com/tps/i3/TB1Onr9LVXXXXbiXpXXB8gAQpXX-300-100.png"
	          }, {
	            "id": "1394",
	            "sceneUrl": "https://pages.tmall.com/wow/act/15617/scene?acm=03653.1003.1.710531&aldid=TPMkJDIw&wh_id=1394&scm=1003.1.03653.MAIN_1394_710531&pos=2",
	            "_s_": "d",
	            "itemImg": "//img.alicdn.com/tps/i1/TB13mj1LVXXXXa.XFXXTCU0QpXX-300-300.jpg",
	            "sceneCat": "50010850,50000671,162201,50022566,50007068,50026651,50000852,162104,162116,162205,1623,123216004,162404,162401,50011412,50011411,162402,50008903,50011413,162403,50000697,1629,50011277,121412004,50008897,50008901,50008899,50013194,50008904,50008905,50008898,162103,50008900,50013196,121434004,50005065,162702,162701,162703,1636,124730001,50001748,50011130,124730001,50001748,50011130,50011129,50010160,50011161,50011159,50010159,50010158,50011127,3035,50010167,50000557,50011123,50010402,50000436,50011153,50011740,50006843,50006842,124986002,50010368, 50011892,50011894,121480030,121366035,121424025,121426030,121484030,121412031",
	            "finalScore": "77.06103999999999",
	            "_pos_": 2,
	            "entityType": "MAIN",
	            "benefitImg": "//img.alicdn.com/tps/i2/TB17kvVLVXXXXaTXVXXB8gAQpXX-300-100.png"
	          }, {
	            "id": "1396",
	            "sceneUrl": "https://pages.tmall.com/wow/act/15617/scene?acm=03653.1003.1.710531&aldid=TPMkJDIw&wh_id=1396&scm=1003.1.03653.MAIN_1396_710531&pos=3",
	            "_s_": "d",
	            "itemImg": "//img.alicdn.com/tps/i2/TB1ZOAXLVXXXXa0XXXXTCU0QpXX-300-300.jpg",
	            "sceneCat": "50010368,50011892,50011894,50013794,50010792,50010790,50010790,121434025,121396024,50010793,50010789,50010793,121386035,121392037,121458034,121392036,121482027,121392015,121368014,121418013,121392016,50011982,122690003,302910,50012010,122654005,50012019,50012825,50012027,50012042,50011744,50012906,50012907,50008881,50008883,50008882?,50012784?,50022889,50022728,50013228,50013896,50014775,50019578,50014822,50026394,50019694,50019279,50019272,50014079,50014078,50014076,50014077,50017238,121464011,121468014,50019130,50019127,50019126,50019128,50019125,50015984,50014803,50014802,50015980,50014788,50014787,50019526,50014791,50019520,50013932,50014677,50015978,50014786,50014785,50522001,50014493,50023100,121418021,121388027,121424021,121418020,121368020,50012036,50012044,50012043,50010368, 50011892, 50019274,50012044,50012048,50012043,50013228,50013238,50011726,50019279,50015984,50014803,50014802,50019526,50014791,50019520,50013932,50014677,50019526,50013314,50023341,50016752,50016749,50016747,50016744,50016741,50016740,50016739,50016738,50016737,50016769,50016763,50016750,50007003,302910,50012010,50012032,50012033,50011745,50011746,50011894,121458034,121756003,121426033,50011982,50011979,121390006,124730001,50001748,50011130,124730001,50001748,50011130,50011129,50010160,50011161,50011159,50010159,50010158,50011127,3035,50010167,50000557,50011123,50010402,50000436,50011153,50010850,50000671,162201,50022566,50007068,50026651,50000852,162104,162116,162205,1623,123216004,162404,162401,50011412,50011411,162402,50008903,50011413,162403,50000697,1629,50011277,121412004,50008897,50008901,50008899,50013194,50008904,50008905,50008898,162103,50008900,50013196,121434004,50005065,162702,162701,162703,1636,1512,123534001,14,50008090,50012341,50132002,50012342,50012343,50012345,50012346,50013189,50010527,121394006,50013618,50010537,50012424,121452038,121484044,50010540,50010548,50024769,121450007,50013697,50010218,50005960,50005962,50012820,50012406,50023620,50023605,50008829,50024064,50023440,50008687,124392001,50023771,50006804,50012410,124482010,121398023,50023789,50011975",
	            "finalScore": "76.76379487179486",
	            "_pos_": 3,
	            "entityType": "MAIN",
	            "benefitImg": "//img.alicdn.com/tps/i3/TB1Usn.LVXXXXaoXpXXB8gAQpXX-300-100.png"
	          }, {
	            "id": "1619",
	            "sceneUrl": "https://pages.tmall.com/wow/act/15617/scene?acm=03653.1003.1.710531&aldid=TPMkJDIw&wh_id=1619&scm=1003.1.03653.SUB_1619_710531&pos=4",
	            "_s_": "d",
	            "itemImg": "//img.alicdn.com/tps/i2/TB1MpoBLVXXXXbxXpXXKofZZpXX-182-206.jpg",
	            "sceneCat": "124730001,50001748,50011130,124730001,50001748,50011130,50011129,50010160,50011161,50011159,50010159,50010158,50011127,3035,50010167,50000557,50011123,50010402,50000436,50011153,122654005,50011740,50009032,124688012，213202,121396029,121476023,121410029,213203,50023326,213205,50022686,50023293,50466023,50024999,50016885，50011894",
	            "finalScore": "75.88480000000001",
	            "_pos_": 4,
	            "entityType": "SUB",
	            "benefitImg": "//img.alicdn.com/tps/i4/TB1j0AxLVXXXXaRXFXX3bpXTXXX-170-100.png"
	          }, {
	            "id": "1612",
	            "sceneUrl": "https://pages.tmall.com/wow/act/15617/scene?acm=03653.1003.1.710531&aldid=TPMkJDIw&wh_id=1612&scm=1003.1.03653.SUB_1612_710531&pos=5",
	            "_s_": "d",
	            "itemImg": "//img.alicdn.com/tps/i3/TB1NNwyLVXXXXaEXVXXKofZZpXX-182-206.jpg",
	            "sceneCat": "50010850,50000671,162104,162116,123216004",
	            "finalScore": "75.23733333333334",
	            "_pos_": 5,
	            "entityType": "SUB",
	            "benefitImg": "//img.alicdn.com/tps/i1/TB1PsoBLVXXXXbQXpXX3bpXTXXX-170-100.png"
	          }, {
	            "id": "1610",
	            "sceneUrl": "https://pages.tmall.com/wow/act/15617/scene?acm=03653.1003.1.710531&aldid=TPMkJDIw&wh_id=1610&scm=1003.1.03653.SUB_1610_710531&pos=6",
	            "_s_": "d",
	            "itemImg": "//img.alicdn.com/tps/i4/TB1EkczLVXXXXcVXpXXKofZZpXX-182-206.jpg",
	            "sceneCat": "121484044,121452038,50012342,50012027,50012032,50006843,50010850,50000671,162104,1623,50011277,162116,123216004,50008898,121366037,121458036,121392038,121420035,121364028,121468026,121472031,121476036,121470042,121418032,121410036,121472032,121420032,121470040,121384032,121460028,121448028,121400030,121424024,121482025,121418031,121402028,121388035,121460029,121400028,121400029,121418030,121476034,121478031,121448029,121480030,121366035,121424025,121426030,121484030,121412031,121384033,121424023,121402027,121408039,121420033,121452028,121466040,121416029,121482028,121420034,121396046,121422052,121370037,121424031,21364043,121472040,121412045,121424032,125054002,125074007,125074008,125104003,125080003,125024006,125080004",
	            "finalScore": "75.00533333333334",
	            "_pos_": 6,
	            "entityType": "SUB",
	            "benefitImg": "//img.alicdn.com/tps/i2/TB1RzwFLVXXXXXsXpXX3bpXTXXX-170-100.png"
	          }, {
	            "id": "1620",
	            "sceneUrl": "https://pages.tmall.com/wow/act/15617/scene?acm=03653.1003.1.710531&aldid=TPMkJDIw&wh_id=1620&scm=1003.1.03653.SUB_1620_710531&pos=7",
	            "_s_": "d",
	            "itemImg": "//img.alicdn.com/tps/i1/TB1IJsILVXXXXbGXXXXKofZZpXX-182-206.jpg",
	            "sceneCat": "50010789,50010790,50010792,50010793,50010794,50010796,50010797,50010798,50010801,50010803,50010805,50010807,50010808,50010813,50010814,50010815,50013794,121382014,121386023,121388007,121388008,121398004,121364007,121398006,121410007,121426007,121452004,50012010,50012027,50012032，124688012, 124986002, 124942005，50010850,50000671,162104,162201,50022566,162116,1623,50011277,50008897,162401,162402",
	            "finalScore": "74.72522222222223",
	            "_pos_": 7,
	            "entityType": "SUB",
	            "benefitImg": "//img.alicdn.com/tps/i1/TB16A.yLVXXXXX8XFXX3bpXTXXX-170-100.png"
	          }, {
	            "id": "1608",
	            "sceneUrl": "https://pages.tmall.com/wow/act/15617/scene?acm=03653.1003.1.710531&aldid=TPMkJDIw&wh_id=1608&scm=1003.1.03653.SUB_1608_710531&pos=8",
	            "_s_": "d",
	            "itemImg": "//img.alicdn.com/tps/i3/TB1xA3jLVXXXXXqapXXKofZZpXX-182-206.jpg",
	            "sceneCat": "50012010,50012027,50012032,50007003,50008881,50008883,1623,162116,50010850,123216004",
	            "finalScore": "74.626",
	            "_pos_": 8,
	            "entityType": "SUB",
	            "benefitImg": "//img.alicdn.com/tps/i2/TB1WvoALVXXXXcdXpXX3bpXTXXX-170-100.png"
	          }, {
	            "id": "1615",
	            "sceneUrl": "https://pages.tmall.com/wow/act/15617/scene?acm=03653.1003.1.710531&aldid=TPMkJDIw&wh_id=1615&scm=1003.1.03653.SUB_1615_710531&pos=9",
	            "_s_": "d",
	            "itemImg": "//img.alicdn.com/tps/i1/TB1PVctLVXXXXchXFXXKofZZpXX-182-206.jpg",
	            "sceneCat": "50011978,50011979,50011980,50011993,50011996,50011997,121390006,121408011,121474010,50010789,50010790,50010792,50010793,50010803,50013794,121398004,121410007，213205,121470030,50024980,121408030",
	            "finalScore": "74.02799999999999",
	            "_pos_": 9,
	            "entityType": "SUB",
	            "benefitImg": "//img.alicdn.com/tps/i4/TB1yKwBLVXXXXa4XpXX3bpXTXXX-170-100.png"
	          }, {
	            "id": "1618",
	            "sceneUrl": "https://pages.tmall.com/wow/act/15617/scene?acm=03653.1003.1.710531&aldid=TPMkJDIw&wh_id=1618&scm=1003.1.03653.SUB_1618_710531&pos=10",
	            "_s_": "d",
	            "itemImg": "//img.alicdn.com/tps/i1/TB1vn3sLVXXXXX5XVXXKofZZpXX-182-206.jpg",
	            "sceneCat": "50008886,50012766,50012771,50012772,50012773,50008090,111219,50012100,50012082,50012478,50012475,213202,50018977,121396029,121476023,50018994,121410029,213203,50023326,50003820,213205,50022686,50012481,50013976?,50001871,122854005,121458010,121452006,121416008,50008779,50002777,121394007,121386009,50010825,50013810,121434010,50001865,50008565,50008246,50017192,121404045,121368009,121462014,50019372,50008248,121418011,50008249,50017193,50008252,50008251,50000512,121364047",
	            "finalScore": "73.94212121212121",
	            "_pos_": 10,
	            "entityType": "SUB",
	            "benefitImg": "//img.alicdn.com/tps/i4/TB1kSkpLVXXXXbTXVXX3bpXTXXX-170-100.png"
	          }, {
	            "id": "1617",
	            "sceneUrl": "https://pages.tmall.com/wow/act/15617/scene?acm=03653.1003.1.710531&aldid=TPMkJDIw&wh_id=1617&scm=1003.1.03653.SUB_1617_710531&pos=11",
	            "_s_": "d",
	            "itemImg": "//img.alicdn.com/tps/i1/TB1ELwrLVXXXXaNXVXXKofZZpXX-182-206.jpg",
	            "sceneCat": "50013189,50010527,121394006,50013618,50010537,50012424,121452038,121484044,50010540,50010548,50024769,50012341,50132002,50012342,50012343,50012345,50012346,50012341,50132002,50012342,50012343,50012345,50012346",
	            "finalScore": "73.78883333333334",
	            "_pos_": 11,
	            "entityType": "SUB",
	            "benefitImg": "//img.alicdn.com/tps/i3/TB1CtsuLVXXXXcJXFXX3bpXTXXX-170-100.png"
	          }],
	          "exposureParam": "//ac.mmstat.com/1.gif?apply=vote&abbucket=_AB-M1001_B5&com=02&acm=03653.1003.1.710531&cod=03653&cache=jWl8FJsb&aldid=TPMkJDIw&logtype=4&abtest=_AB-LR1001-PR1001&scm=1003.1.03653.710531&ip=42.120.74.104",
	          "serverTime": 1458296110334
	        }
	      },
	      "resource": {
	        "isHide": false,
	        "bigBannerImg": "https://gw.alicdn.com/tps/TB1tO.aLVXXXXcvXpXXXXXXXXXX-750-262.jpg",
	        "bigBannerUrl": "https://chaoshi.m.tmall.com/",
	        "smallBannerItems": [{
	          "img": "https://img.alicdn.com/tps/TB1Ff_0LVXXXXXNaXXXXXXXXXXX-375-262.jpg",
	          "url": "https://chaoshi.m.tmall.com/"
	        }, {
	          "img": "https://img.alicdn.com/tps/TB1Ff_0LVXXXXXNaXXXXXXXXXXX-375-262.jpg",
	          "url": "https://chaoshi.m.tmall.com/"
	        }]
	      },
	      "category": {
	        "floorTitle": "https://gw.alicdn.com/tps/TB1._64LVXXXXatXVXXXXXXXXXX-750-100.jpg",
	        "_backup": {
	          "main": [],
	          "sub": [{
	            "finalScore": 0,
	            "industryUrl": "//pages.tmall.com/wow/act/15617/dqc?abbucket=_AB-M1011_B5&acm=03654.1003.1.735362&aldid=e5zPEI6R&abtest=_AB-LR1011-PR1011&scm=1003.1.03654.OTHER_15_735362&pos=1",
	            "entityType": "OTHER",
	            "colour": "b4ebff",
	            "industryTitle": "数码",
	            "_pos_": 1,
	            "industryBenefit": "疯抢大牌新品",
	            "industryId": "15",
	            "industryImg": "//img.alicdn.com/tps/i4/TB1_xG.LVXXXXbWaXXXrdvGIFXX-248-155.jpg"
	          }, {
	            "finalScore": 0,
	            "industryUrl": "//pages.tmall.com/wow/act/15617/xihu?abbucket=_AB-M1011_B5&acm=03654.1003.1.735362&aldid=e5zPEI6R&abtest=_AB-LR1011-PR1011&scm=1003.1.03654.OTHER_13_735362&pos=2",
	            "entityType": "OTHER",
	            "colour": "cdffa4",
	            "industryTitle": "洗护",
	            "_pos_": 2,
	            "industryBenefit": "爆款1分钱抢",
	            "industryId": "13",
	            "industryImg": "//img.alicdn.com/tps/i3/TB1Ft_CLVXXXXX2XXXXrdvGIFXX-248-155.jpg"
	          }, {
	            "finalScore": 0,
	            "industryUrl": "//pages.tmall.com/wow/act/15617/mobilephone?abbucket=_AB-M1011_B5&acm=03654.1003.1.735362&aldid=e5zPEI6R&abtest=_AB-LR1011-PR1011&scm=1003.1.03654.OTHER_14_735362&pos=3",
	            "entityType": "OTHER",
	            "colour": "c5ffdf",
	            "industryTitle": "手机",
	            "_pos_": 3,
	            "industryBenefit": "1元抢优惠券",
	            "industryId": "14",
	            "industryImg": "//img.alicdn.com/tps/i3/TB1mJjuLVXXXXc.XXXXrdvGIFXX-248-155.jpg"
	          }, {
	            "finalScore": 0,
	            "industryUrl": "//pages.tmall.com/wow/act/15617/xiangbaohuanxin?abbucket=_AB-M1011_B5&acm=03654.1003.1.735362&aldid=e5zPEI6R&abtest=_AB-LR1011-PR1011&scm=1003.1.03654.OTHER_11_735362&pos=4",
	            "entityType": "OTHER",
	            "colour": "ffccdc",
	            "industryTitle": "箱包",
	            "_pos_": 4,
	            "industryBenefit": "极致焕新尖货",
	            "industryId": "11",
	            "industryImg": "//img.alicdn.com/tps/i2/TB1_5P9KVXXXXayaXXXrdvGIFXX-248-155.jpg"
	          }, {
	            "finalScore": 0,
	            "industryUrl": "//pages.tmall.com/wow/act/15617/newfood?abbucket=_AB-M1011_B5&acm=03654.1003.1.735362&aldid=e5zPEI6R&abtest=_AB-LR1011-PR1011&scm=1003.1.03654.OTHER_12_735362&pos=5",
	            "entityType": "OTHER",
	            "colour": "fff5a3",
	            "industryTitle": "食品",
	            "_pos_": 5,
	            "industryBenefit": "新品1分试吃",
	            "industryId": "12",
	            "industryImg": "//img.alicdn.com/tps/i2/TB1HfLzLVXXXXb_XXXXrdvGIFXX-248-155.jpg"
	          }, {
	            "finalScore": 0,
	            "industryUrl": "//pages.tmall.com/wow/act/15617/zbps?abbucket=_AB-M1011_B5&acm=03654.1003.1.735362&aldid=e5zPEI6R&abtest=_AB-LR1011-PR1011&scm=1003.1.03654.OTHER_3_735362&pos=6",
	            "entityType": "OTHER",
	            "colour": "bbffe5",
	            "industryTitle": "珠宝配饰",
	            "_pos_": 6,
	            "industryBenefit": "大牌1折秒杀",
	            "industryId": "3",
	            "industryImg": "//img.alicdn.com/tps/i1/TB1s5y.LVXXXXb.aXXXrdvGIFXX-248-155.jpg"
	          }, {
	            "finalScore": 0,
	            "industryUrl": "//pages.tmall.com/wow/act/15617/getbeauty?abbucket=_AB-M1011_B5&acm=03654.1003.1.735362&aldid=e5zPEI6R&abtest=_AB-LR1011-PR1011&scm=1003.1.03654.OTHER_2_735362&pos=7",
	            "entityType": "OTHER",
	            "colour": "ffd1b6",
	            "industryTitle": "美妆",
	            "_pos_": 7,
	            "industryBenefit": "即刻预约美丽",
	            "industryId": "2",
	            "industryImg": "//img.alicdn.com/tps/i1/TB1lNvoLVXXXXaoXFXXrdvGIFXX-248-155.jpg"
	          }, {
	            "finalScore": 0,
	            "industryUrl": "//pages.tmall.com/wow/act/15617/guojixfs?abbucket=_AB-M1011_B5&acm=03654.1003.1.735362&aldid=e5zPEI6R&abtest=_AB-LR1011-PR1011&scm=1003.1.03654.OTHER_1_735362&pos=8",
	            "entityType": "OTHER",
	            "colour": "b9eaf2",
	            "industryTitle": "天猫国际",
	            "_pos_": 8,
	            "industryBenefit": "唤醒全球潮流",
	            "industryId": "1",
	            "industryImg": "//img.alicdn.com/tps/i4/TB1JHbkLVXXXXblXFXXrdvGIFXX-248-155.jpg"
	          }, {
	            "finalScore": 0,
	            "industryUrl": "//pages.tmall.com/wow/act/15617/newnv?abbucket=_AB-M1011_B5&acm=03654.1003.1.735362&aldid=e5zPEI6R&abtest=_AB-LR1011-PR1011&scm=1003.1.03654.OTHER_10_735362&pos=9",
	            "entityType": "OTHER",
	            "colour": "fff8ee",
	            "industryTitle": "鞋履",
	            "_pos_": 9,
	            "industryBenefit": "潮品精选鞋履",
	            "industryId": "10",
	            "industryImg": "//img.alicdn.com/tps/i2/TB1RovwLVXXXXXnXpXXrdvGIFXX-248-155.jpg"
	          }, {
	            "finalScore": 0,
	            "industryUrl": "//pages.tmall.com/wow/act/15617/nvzhuang?abbucket=_AB-M1011_B5&acm=03654.1003.1.735362&aldid=e5zPEI6R&abtest=_AB-LR1011-PR1011&scm=1003.1.03654.OTHER_7_735362&pos=10",
	            "entityType": "OTHER",
	            "colour": "d5cbe8",
	            "industryTitle": "女装",
	            "_pos_": 10,
	            "industryBenefit": "折后用券抢新",
	            "industryId": "7",
	            "industryImg": "//img.alicdn.com/tps/i1/TB1BOncLVXXXXXSaXXXrdvGIFXX-248-155.jpg"
	          }, {
	            "finalScore": 0,
	            "industryUrl": "//pages.tmall.com/wow/act/15617/man?abbucket=_AB-M1011_B5&acm=03654.1003.1.735362&aldid=e5zPEI6R&abtest=_AB-LR1011-PR1011&scm=1003.1.03654.OTHER_6_735362&pos=11",
	            "entityType": "OTHER",
	            "colour": "cbe9a9",
	            "industryTitle": "男装",
	            "_pos_": 11,
	            "industryBenefit": "新品低至9.9元",
	            "industryId": "6",
	            "industryImg": "//img.alicdn.com/tps/i4/TB1t9TmLVXXXXbkXFXXrdvGIFXX-248-155.jpg"
	          }, {
	            "finalScore": 0,
	            "industryUrl": "//pages.tmall.com/wow/act/15617/myxfs?abbucket=_AB-M1011_B5&acm=03654.1003.1.735362&aldid=e5zPEI6R&abtest=_AB-LR1011-PR1011&scm=1003.1.03654.OTHER_5_735362&pos=12",
	            "entityType": "OTHER",
	            "colour": "f8e1ff",
	            "industryTitle": "母婴童装",
	            "_pos_": 12,
	            "industryBenefit": "跨店满299减40",
	            "industryId": "5",
	            "industryImg": "//img.alicdn.com/tps/i3/TB1kpziLVXXXXabXVXXrdvGIFXX-248-155.jpg"
	          }, {
	            "finalScore": 0,
	            "industryUrl": "//pages.tmall.com/wow/act/15617/jfjs?abbucket=_AB-M1011_B5&acm=03654.1003.1.735362&aldid=e5zPEI6R&abtest=_AB-LR1011-PR1011&scm=1003.1.03654.OTHER_4_735362&pos=13",
	            "entityType": "OTHER",
	            "colour": "bbffe5",
	            "industryTitle": "家纺家饰",
	            "_pos_": 13,
	            "industryBenefit": "全场低至9.9元",
	            "industryId": "4",
	            "industryImg": "//img.alicdn.com/tps/i1/TB1lUjzLVXXXXbAXXXXrdvGIFXX-248-155.jpg"
	          }, {
	            "finalScore": 0,
	            "industryUrl": "//pages.tmall.com/wow/act/15617/neiyi328?abbucket=_AB-M1011_B5&acm=03654.1003.1.735362&aldid=e5zPEI6R&abtest=_AB-LR1011-PR1011&scm=1003.1.03654.OTHER_9_735362&pos=14",
	            "entityType": "OTHER",
	            "colour": "ffc7c9",
	            "industryTitle": "内衣",
	            "_pos_": 14,
	            "industryBenefit": "新品3折起",
	            "industryId": "9",
	            "industryImg": "//img.alicdn.com/tps/i1/TB1S7PuLVXXXXcVXXXXrdvGIFXX-248-155.jpg"
	          }, {
	            "finalScore": 0,
	            "industryUrl": "//pages.tmall.com/wow/act/15617/ydhw?abbucket=_AB-M1011_B5&acm=03654.1003.1.735362&aldid=e5zPEI6R&abtest=_AB-LR1011-PR1011&scm=1003.1.03654.OTHER_8_735362&pos=15",
	            "entityType": "OTHER",
	            "colour": "cbdbfe",
	            "industryTitle": "运动户外",
	            "_pos_": 15,
	            "industryBenefit": "大牌新品抢券",
	            "industryId": "8",
	            "industryImg": "//img.alicdn.com/tps/i2/TB1mQDALVXXXXbdXXXXrdvGIFXX-248-155.jpg"
	          }],
	          "isFormal": false,
	          "exposureParam": "//ac.mmstat.com/1.gif?apply=vote&abbucket=_AB-M1011_B5&com=02&acm=03654.1003.1.735362&cod=03654&cache=CG5ZB02B&aldid=e5zPEI6R&logtype=4&abtest=_AB-LR1011-PR1011&scm=1003.1.03654.735362&ip=42.120.74.159",
	          "id": "03654"
	        }
	      },
	      "brand": {
	        "floorTitle": "https://gw.alicdn.com/tps/TB1._64LVXXXXatXVXXXXXXXXXX-750-100.jpg",
	        "bannerItems": [{
	          "leftImg": "https://gw.alicdn.com/tps/TB1F2fJLVXXXXccXFXXXXXXXXXX-750-230.jpg",
	          "leftUrl": "https://chaoshi.m.tmall.com/",
	          "rightImg": "https://gw.alicdn.com/tps/TB1F2fJLVXXXXccXFXXXXXXXXXX-750-230.jpg",
	          "rightUrl": "https://chaoshi.m.tmall.com/"
	        }, {
	          "leftImg": "https://gw.alicdn.com/tps/TB1F2fJLVXXXXccXFXXXXXXXXXX-750-230.jpg",
	          "leftUrl": "https://chaoshi.m.tmall.com/",
	          "rightImg": "https://gw.alicdn.com/tps/TB1F2fJLVXXXXccXFXXXXXXXXXX-750-230.jpg",
	          "rightUrl": "https://chaoshi.m.tmall.com/"
	        }, {
	          "leftImg": "https://gw.alicdn.com/tps/TB1F2fJLVXXXXccXFXXXXXXXXXX-750-230.jpg",
	          "leftUrl": "https://chaoshi.m.tmall.com/",
	          "rightImg": "https://gw.alicdn.com/tps/TB1F2fJLVXXXXccXFXXXXXXXXXX-750-230.jpg",
	          "rightUrl": "https://chaoshi.m.tmall.com/"
	        }, {
	          "leftImg": "https://gw.alicdn.com/tps/TB1F2fJLVXXXXccXFXXXXXXXXXX-750-230.jpg",
	          "leftUrl": "https://chaoshi.m.tmall.com/",
	          "rightImg": "https://gw.alicdn.com/tps/TB1F2fJLVXXXXccXFXXXXXXXXXX-750-230.jpg",
	          "rightUrl": "https://chaoshi.m.tmall.com/"
	        }, {
	          "leftImg": "https://gw.alicdn.com/tps/TB1F2fJLVXXXXccXFXXXXXXXXXX-750-230.jpg",
	          "leftUrl": "https://chaoshi.m.tmall.com/",
	          "rightImg": "https://gw.alicdn.com/tps/TB1F2fJLVXXXXccXFXXXXXXXXXX-750-230.jpg",
	          "rightUrl": "https://chaoshi.m.tmall.com/"
	        }, {
	          "leftImg": "https://gw.alicdn.com/tps/TB1F2fJLVXXXXccXFXXXXXXXXXX-750-230.jpg",
	          "leftUrl": "https://chaoshi.m.tmall.com/",
	          "rightImg": "https://gw.alicdn.com/tps/TB1F2fJLVXXXXccXFXXXXXXXXXX-750-230.jpg",
	          "rightUrl": "https://chaoshi.m.tmall.com/"
	        }, {
	          "leftImg": "https://gw.alicdn.com/tps/TB1F2fJLVXXXXccXFXXXXXXXXXX-750-230.jpg",
	          "leftUrl": "https://chaoshi.m.tmall.com/",
	          "rightImg": "https://gw.alicdn.com/tps/TB1F2fJLVXXXXccXFXXXXXXXXXX-750-230.jpg",
	          "rightUrl": "https://chaoshi.m.tmall.com/"
	        }, {
	          "leftImg": "https://gw.alicdn.com/tps/TB1F2fJLVXXXXccXFXXXXXXXXXX-750-230.jpg",
	          "leftUrl": "https://chaoshi.m.tmall.com/",
	          "rightImg": "https://gw.alicdn.com/tps/TB1F2fJLVXXXXccXFXXXXXXXXXX-750-230.jpg",
	          "rightUrl": "https://chaoshi.m.tmall.com/"
	        }, {
	          "leftImg": "https://gw.alicdn.com/tps/TB1F2fJLVXXXXccXFXXXXXXXXXX-750-230.jpg",
	          "leftUrl": "https://chaoshi.m.tmall.com/",
	          "rightImg": "https://gw.alicdn.com/tps/TB1F2fJLVXXXXccXFXXXXXXXXXX-750-230.jpg",
	          "rightUrl": "https://chaoshi.m.tmall.com/"
	        }]
	      },
	      "match": {
	        "floorTitle": "https://gw.alicdn.com/tps/TB1._64LVXXXXatXVXXXXXXXXXX-750-100.jpg",
	        "isShowTmSpecBanner": true,
	        "tmSpecBanner": {
	          "img": "https://gw.alicdn.com/tps/TB1F2fJLVXXXXccXFXXXXXXXXXX-750-230.jpg",
	          "url": "https://chaoshi.m.tmall.com/"
	        },
	        "bannerItems": [{
	          "leftImg": "https://gw.alicdn.com/tps/TB1OUnILVXXXXcoXFXXXXXXXXXX-374-416.jpg",
	          "leftUrl": "https://chaoshi.m.tmall.com/",
	          "rightImg": "https://gw.alicdn.com/tps/TB1OUnILVXXXXcoXFXXXXXXXXXX-374-416.jpg",
	          "rightUrl": "https://chaoshi.m.tmall.com/"
	        }, {
	          "leftImg": "https://gw.alicdn.com/tps/TB1OUnILVXXXXcoXFXXXXXXXXXX-374-416.jpg",
	          "leftUrl": "https://chaoshi.m.tmall.com/",
	          "rightImg": "https://gw.alicdn.com/tps/TB1OUnILVXXXXcoXFXXXXXXXXXX-374-416.jpg",
	          "rightUrl": "https://chaoshi.m.tmall.com/"
	        }]
	      }
	    };
	    this.simLoadingData(this.cnt++);
	  },
	  methods: {
	    handleRefresh: function handleRefresh(e) {
	      var vm = this;
	      vm.displayRefresh = 'show';
	      if (timer) {
	        timer.setTimeout(function () {
	          vm.displayRefresh = 'hide';
	        }, 2000);
	      } else {
	        modal.alert({
	          message: 'refreshing.'
	        }, function () {
	          vm.displayRefresh = 'hide';
	        });
	      }
	    },
	    handleLoading: function handleLoading(e) {
	      var vm = this;
	      vm.displayLoading = 'show';
	      modal.toast({
	        message: 'loading.'
	      });
	      if (timer) {
	        timer.setTimeout(function () {
	          vm.simLoadingData(vm.cnt++);
	          vm.displayLoading = 'hide';
	        }, 2000);
	      } else {
	        vm.simLoadingData(vm.cnt++);
	        vm.displayLoading = 'hide';
	      }
	    },
	    simLoadingData: function simLoadingData(num) {
	      if (num >= 3) {
	        modal.toast({
	          message: '已到底部'
	        });
	        return;
	      }
	      this['show' + num] = true;
	    }
	  }
	};

/***/ },

/***/ 497:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = []

	/* styles */
	__vue_styles__.push(__webpack_require__(498)
	)

	/* script */
	__vue_exports__ = __webpack_require__(499)

	/* template */
	var __vue_template__ = __webpack_require__(509)
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
	__vue_options__.__file = "/Users/bobning/work/source/weex_fork/examples/vue/showcase/include/headlines.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__.style = __vue_options__.style || {}
	__vue_styles__.forEach(function (module) {
	for (var name in module) {
	__vue_options__.style[name] = module[name]
	}
	})

	module.exports = __vue_exports__


/***/ },

/***/ 498:
/***/ function(module, exports) {

	module.exports = {
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

/***/ },

/***/ 499:
/***/ function(module, exports, __webpack_require__) {

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

	module.exports = {
	  components: {
	    link: __webpack_require__(500),
	    banners: __webpack_require__(503)
	  },
	  props: {
	    ds: {
	      default: function _default() {
	        return {};
	      }
	    }
	  },
	  data: function data() {
	    return {
	      NUMBER_233: 233,
	      NUMBER_172: 172,
	      NUMBER_3: 3
	    };
	  }
	};

/***/ },

/***/ 500:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = []

	/* script */
	__vue_exports__ = __webpack_require__(501)

	/* template */
	var __vue_template__ = __webpack_require__(502)
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
	__vue_options__.__file = "/Users/bobning/work/source/weex_fork/examples/vue/showcase/include/link.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__.style = __vue_options__.style || {}
	__vue_styles__.forEach(function (module) {
	for (var name in module) {
	__vue_options__.style[name] = module[name]
	}
	})

	module.exports = __vue_exports__


/***/ },

/***/ 501:
/***/ function(module, exports) {

	'use strict';

	//
	//
	//

	var modal = __weex_require_module__('modal');
	module.exports = {
	  props: ['text', 'href'],
	  methods: {
	    clickHandler: function clickHandler() {
	      modal.toast({
	        message: 'click',
	        duration: 1
	      });
	    }
	  }
	};

/***/ },

/***/ 502:
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _h('text', {
	    on: {
	      "click": _vm.clickHandler
	    }
	  }, [_vm._s(_vm.text)])
	},staticRenderFns: []}
	module.exports.render._withStripped = true

/***/ },

/***/ 503:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = []

	/* script */
	__vue_exports__ = __webpack_require__(504)

	/* template */
	var __vue_template__ = __webpack_require__(508)
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
	__vue_options__.__file = "/Users/bobning/work/source/weex_fork/examples/vue/showcase/include/banners.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__.style = __vue_options__.style || {}
	__vue_styles__.forEach(function (module) {
	for (var name in module) {
	__vue_options__.style[name] = module[name]
	}
	})

	module.exports = __vue_exports__


/***/ },

/***/ 504:
/***/ function(module, exports, __webpack_require__) {

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

	module.exports = {
	  components: {
	    banner: __webpack_require__(505)
	  },
	  props: ['ds', 'width', 'height', 'space', 'direction']
	};

/***/ },

/***/ 505:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = []

	/* script */
	__vue_exports__ = __webpack_require__(506)

	/* template */
	var __vue_template__ = __webpack_require__(507)
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
	__vue_options__.__file = "/Users/bobning/work/source/weex_fork/examples/vue/showcase/include/banner.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__.style = __vue_options__.style || {}
	__vue_styles__.forEach(function (module) {
	for (var name in module) {
	__vue_options__.style[name] = module[name]
	}
	})

	module.exports = __vue_exports__


/***/ },

/***/ 506:
/***/ function(module, exports) {

	'use strict';

	//
	//
	//
	//

	var modal = __weex_require_module__('modal');
	module.exports = {
	  props: ['width', 'height', 'src', 'href'],
	  data: function data() {
	    return {
	      quality: 'normal'
	    };
	  },
	  methods: {
	    clickHandler: function clickHandler() {
	      modal.toast({
	        message: 'click',
	        duration: 1
	      });
	    }
	  }
	};

/***/ },

/***/ 507:
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _h('image', {
	    style: {
	      width: _vm.width,
	      height: _vm.height
	    },
	    attrs: {
	      "src": _vm.src,
	      "image-quality": _vm.quality
	    },
	    on: {
	      "click": _vm.clickHandler
	    }
	  })
	},staticRenderFns: []}
	module.exports.render._withStripped = true

/***/ },

/***/ 508:
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _h('div', [(_vm.direction === 'row') ? _h('div', {
	    staticStyle: {
	      flexDirection: "row"
	    }
	  }, [_vm._l((_vm.ds), function(i, item) {
	    return _h('div', {
	      style: {
	        width: _vm.width,
	        height: _vm.height,
	        marginLeft: (i % _vm.ds.length ? _vm.space : 0)
	      }
	    }, [_h('banner', {
	      attrs: {
	        "width": _vm.width,
	        "height": _vm.height,
	        "src": item.img,
	        "href": item.url
	      }
	    })])
	  })]) : _vm._e(), (_vm.direction === 'column') ? _h('div', [_vm._l((_vm.ds), function(i, item) {
	    return _h('div', {
	      style: {
	        width: _vm.width,
	        height: _vm.height,
	        marginTop: (i % _vm.ds.length ? _vm.space : 0)
	      }
	    }, [_h('banner', {
	      attrs: {
	        "width": _vm.width,
	        "height": _vm.height,
	        "src": item.img,
	        "href": item.url
	      }
	    })])
	  })]) : _vm._e()])
	},staticRenderFns: []}
	module.exports.render._withStripped = true

/***/ },

/***/ 509:
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _h('div', {
	    staticClass: ["container"]
	  }, [_h('image', {
	    staticClass: ["banner"],
	    attrs: {
	      "src": _vm.ds.topBanner
	    }
	  }), _h('div', {
	    staticClass: ["rule-container"]
	  }, [_h('link', {
	    staticStyle: {
	      fontSize: "22px",
	      color: "#ffffff",
	      textAlign: "center"
	    },
	    attrs: {
	      "text": "帮助",
	      "href": _vm.ds.ruleLink
	    }
	  })]), _h('div', {
	    staticClass: ["announce"]
	  }, [_h('image', {
	    staticClass: ["announce-hd"],
	    attrs: {
	      "src": _vm.ds.announceHdBanner
	    }
	  }), _h('banners', {
	    staticStyle: {
	      marginLeft: "6",
	      marginRight: "6"
	    },
	    attrs: {
	      "ds": _vm.ds.bannerItems,
	      "direction": "row",
	      "width": _vm.NUMBER_233,
	      "height": _vm.NUMBER_172,
	      "space": _vm.NUMBER_3
	    }
	  })])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true

/***/ },

/***/ 510:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = []

	/* styles */
	__vue_styles__.push(__webpack_require__(511)
	)

	/* script */
	__vue_exports__ = __webpack_require__(512)

	/* template */
	var __vue_template__ = __webpack_require__(513)
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
	__vue_options__.__file = "/Users/bobning/work/source/weex_fork/examples/vue/showcase/include/category.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__.style = __vue_options__.style || {}
	__vue_styles__.forEach(function (module) {
	for (var name in module) {
	__vue_options__.style[name] = module[name]
	}
	})

	module.exports = __vue_exports__


/***/ },

/***/ 511:
/***/ function(module, exports) {

	module.exports = {
	  "title": {
	    "width": 750,
	    "height": 100
	  },
	  "shop-list": {
	    "flexDirection": "row"
	  },
	  "shop-img-container": {
	    "marginRight": 2
	  },
	  "sub-item": {
	    "position": "absolute",
	    "width": 248,
	    "height": 241,
	    "alignItems": "center",
	    "backgroundColor": "#ffffff"
	  },
	  "sub-item-bg": {
	    "width": 248,
	    "height": 86
	  },
	  "sub-item-title": {
	    "position": "absolute",
	    "left": 0,
	    "top": 0,
	    "width": 248,
	    "textAlign": "center"
	  },
	  "industry-title": {
	    "fontSize": 28,
	    "color": "#484848",
	    "textAlign": "center",
	    "marginTop": 10,
	    "height": 34
	  },
	  "industry-benefit": {
	    "fontSize": 24,
	    "color": "#999999",
	    "textAlign": "center"
	  }
	}

/***/ },

/***/ 512:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

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

	var demoContent = {
	  "main": [{
	    "shopList": [{
	      "id": "619123122",
	      "picUrl": "//img.alicdn.com/tps/i1/TB1Cl5MLVXXXXXTaXXXSutbFXXX.jpg",
	      "finalScore": "0.884765209440857",
	      "shopUrl": "http://liangpinpuzi.tmall.com/campaign-3735-7.htm",
	      "entityType": "SHOP",
	      "brandId": "7724367"
	    }, {
	      "id": "880734502",
	      "picUrl": "//img.alicdn.com/tps/i1/TB1HN2XLVXXXXbkXFXXSutbFXXX.jpg",
	      "finalScore": "0.8822246866512714",
	      "shopUrl": "http://sanzhisongshu.tmall.com/campaign-3735-7.htm",
	      "entityType": "SHOP",
	      "brandId": "147280915"
	    }, {
	      "id": "392147177",
	      "picUrl": "//img.alicdn.com/tps/i1/TB1yq6dLVXXXXbXXpXXSutbFXXX.jpg",
	      "finalScore": "0.8805854724243631",
	      "shopUrl": "http://zhouheiya.tmall.com/campaign-3735-6.htm",
	      "entityType": "SHOP",
	      "brandId": "111496"
	    }, {
	      "id": "2081058060",
	      "picUrl": "//img.alicdn.com/tps/i1/TB1w4jxLVXXXXaxXXXXtKXbFXXX.gif",
	      "finalScore": "0.8640439551049249",
	      "shopUrl": "http://rongxintang.tmall.com/campaign-3735-6.htm",
	      "entityType": "SHOP",
	      "brandId": "8709890"
	    }],
	    "finalScore": "4.657333333333334",
	    "industryUrl": null,
	    "entityType": "OTHER",
	    "colour": "#fff5a3",
	    "industryTitle": null,
	    "bannerUrl": "//pages.tmall.com/wow/act/15617/newfood?abbucket=_AB-M1011_B14&acm=03654.1003.1.735362&aldid=KXPpnvEH&abtest=_AB-LR1011-PR1011&scm=1003.1.03654.OTHER_12_735362&pos=1",
	    "leftBannerImg": "http://img.alicdn.com/tps/i1/TB1LHh4MXXXXXbsXpXXeWjm2pXX-750-240.jpg",
	    "_pos_": "1",
	    "industryBenefit": null,
	    "industryId": "12",
	    "industryImg": null,
	    "rightBannerImg": "//img.alicdn.com/tps/i4/TB1wshUMXXXXXXaXVXXeWjm2pXX-750-240.jpg"
	  }, {
	    "shopList": [{
	      "id": "520557274",
	      "picUrl": "//img.alicdn.com/tps/i1/TB1aMjXLVXXXXbUaXXXSutbFXXX.jpg",
	      "finalScore": "0.8986382989845325",
	      "shopUrl": "http://newbalance.tmall.com/campaign-3735-20.htm",
	      "entityType": "SHOP",
	      "brandId": "20584"
	    }, {
	      "id": "746866993",
	      "picUrl": "//img.alicdn.com/tps/i1/TB1pXG9LVXXXXaLXFXXSutbFXXX.jpg",
	      "finalScore": "0.8917855242977327",
	      "shopUrl": "http://vans.tmall.com/campaign-3735-19.htm",
	      "entityType": "SHOP",
	      "brandId": "29529"
	    }, {
	      "id": "1612713147",
	      "picUrl": "//img.alicdn.com/tps/i1/TB1jHfXLVXXXXXPXFXXSutbFXXX.jpg",
	      "finalScore": "0.8895943606442631",
	      "shopUrl": "http://dcshoecousa.tmall.com/campaign-3735-8.htm",
	      "entityType": "SHOP",
	      "brandId": "3851662"
	    }, {
	      "id": "2379251418",
	      "picUrl": "//img.alicdn.com/tps/i1/TB1sbLlLVXXXXbeXXXXSutbFXXX.jpg",
	      "finalScore": "0.8881539668874383",
	      "shopUrl": "http://baijinydhw.tmall.com/campaign-3735-2.htm",
	      "entityType": "SHOP",
	      "brandId": "20579"
	    }],
	    "finalScore": "4.545333333333334",
	    "industryUrl": null,
	    "entityType": "OTHER",
	    "colour": "#cbdbfe",
	    "industryTitle": null,
	    "bannerUrl": "//pages.tmall.com/wow/act/15617/ydhw?abbucket=_AB-M1011_B14&acm=03654.1003.1.735362&aldid=KXPpnvEH&abtest=_AB-LR1011-PR1011&scm=1003.1.03654.OTHER_8_735362&pos=2",
	    "leftBannerImg": "http://img.alicdn.com/tps/i3/TB1h4kzLVXXXXawXpXXeWjm2pXX-750-240.jpg",
	    "_pos_": "2",
	    "industryBenefit": null,
	    "industryId": "8",
	    "industryImg": null,
	    "rightBannerImg": "//img.alicdn.com/tps/i4/TB19VMjLVXXXXaeaXXXeWjm2pXX-750-240.jpg"
	  }, {
	    "shopList": [{
	      "id": "811383091",
	      "picUrl": "//img.alicdn.com/tps/i1/TB1q49ZLVXXXXaJXVXXSutbFXXX.jpg",
	      "finalScore": "0.8723682716749482",
	      "shopUrl": "http://tongrentangbj.tmall.com/campaign-3735-9.htm",
	      "entityType": "SHOP",
	      "brandId": "44652"
	    }, {
	      "id": "838914626",
	      "picUrl": "//img.alicdn.com/tps/i1/TB1GQYbLVXXXXaXXVXXSutbFXXX.jpg",
	      "finalScore": "0.5027131908086584",
	      "shopUrl": "http://jouo.tmall.com/campaign-3735-3.htm",
	      "entityType": "SHOP",
	      "brandId": "14170081"
	    }, {
	      "id": "1077716829",
	      "picUrl": "//img.alicdn.com/tps/i1/TB1rdW2LVXXXXagapXXSutbFXXX.jpg",
	      "finalScore": "0.5015387557024262",
	      "shopUrl": "http://wetcode.tmall.com/campaign-3735-14.htm",
	      "entityType": "SHOP",
	      "brandId": "3675642"
	    }, {
	      "id": "1664976033",
	      "picUrl": "//img.alicdn.com/tps/i1/TB1Q.rpLVXXXXXiXpXXSutbFXXX.jpg",
	      "finalScore": "0.5014897109669442",
	      "shopUrl": "http://hanhoohzp.tmall.com/campaign-3735-17.htm",
	      "entityType": "SHOP",
	      "brandId": "78888695"
	    }],
	    "finalScore": "4.526666666666666",
	    "industryUrl": null,
	    "entityType": "OTHER",
	    "colour": "#ffd1b6",
	    "industryTitle": null,
	    "bannerUrl": "//pages.tmall.com/wow/act/15617/getbeauty?abbucket=_AB-M1011_B14&acm=03654.1003.1.735362&aldid=KXPpnvEH&abtest=_AB-LR1011-PR1011&scm=1003.1.03654.OTHER_2_735362&pos=3",
	    "leftBannerImg": "http://img.alicdn.com/tps/i4/TB1Djt9MXXXXXanXXXXeWjm2pXX-750-240.jpg",
	    "_pos_": "3",
	    "industryBenefit": null,
	    "industryId": "2",
	    "industryImg": null,
	    "rightBannerImg": "//img.alicdn.com/tps/i3/TB1_gVQMXXXXXX9XVXXeWjm2pXX-750-240.jpg"
	  }, {
	    "shopList": [{
	      "id": "2153169655",
	      "picUrl": "//img.alicdn.com/tps/i1/TB1nlK7LVXXXXaRXFXXSutbFXXX.jpg",
	      "finalScore": "0.8820210808835905",
	      "shopUrl": "http://ctkicks.tmall.com/campaign-3735-15.htm",
	      "entityType": "SHOP",
	      "brandId": "20584"
	    }, {
	      "id": "2784101115",
	      "picUrl": "//img.alicdn.com/tps/i1/TB1RrS.LVXXXXcrXpXXSutbFXXX.jpg",
	      "finalScore": "0.5930383227012586",
	      "shopUrl": "http://tomtailor.tmall.com/campaign-3735-0.htm",
	      "entityType": "SHOP",
	      "brandId": "213474060"
	    }, {
	      "id": "2183813726",
	      "picUrl": "//img.alicdn.com/tps/i1/TB1kmS_LVXXXXaBaXXXSutbFXXX.jpg",
	      "finalScore": "0.5882558957771681",
	      "shopUrl": "http://huaiyuan.tmall.com/campaign-3735-5.htm",
	      "entityType": "SHOP",
	      "brandId": "29465"
	    }, {
	      "id": "1785908005",
	      "picUrl": "//img.alicdn.com/tps/i1/TB1dB6zLVXXXXcJXXXXSutbFXXX.jpg",
	      "finalScore": "0.5694211862124341",
	      "shopUrl": "http://axonus.tmall.com/campaign-3735-1.htm",
	      "entityType": "SHOP",
	      "brandId": "115035841"
	    }],
	    "finalScore": "4.413955555555555",
	    "industryUrl": null,
	    "entityType": "OTHER",
	    "colour": "#b9eaf2",
	    "industryTitle": null,
	    "bannerUrl": "//pages.tmall.com/wow/act/15617/guojixfs?abbucket=_AB-M1011_B14&acm=03654.1003.1.735362&aldid=KXPpnvEH&abtest=_AB-LR1011-PR1011&scm=1003.1.03654.OTHER_1_735362&pos=4",
	    "leftBannerImg": "http://img.alicdn.com/tps/i3/TB1_T7ALVXXXXXOXXXXeWjm2pXX-750-240.jpg",
	    "_pos_": "4",
	    "industryBenefit": null,
	    "industryId": "1",
	    "industryImg": null,
	    "rightBannerImg": "//img.alicdn.com/tps/i2/TB1s7koLVXXXXafXFXXeWjm2pXX-750-240.jpg"
	  }, {
	    "shopList": [{
	      "id": "2453054335",
	      "picUrl": "//img.alicdn.com/tps/i1/TB1RX_vLVXXXXchXpXXSutbFXXX.jpg",
	      "finalScore": "0.8463447899590267",
	      "shopUrl": "http://nanshizixing.tmall.com/campaign-3735-2.htm",
	      "entityType": "SHOP",
	      "brandId": "844502560"
	    }, {
	      "id": "1041773234",
	      "picUrl": "//img.alicdn.com/tps/i1/TB1Q7jpLVXXXXX8XpXXSutbFXXX.jpg",
	      "finalScore": "0.560952734503075",
	      "shopUrl": "http://dapu.tmall.com/campaign-3735-8.htm",
	      "entityType": "SHOP",
	      "brandId": "14493763"
	    }, {
	      "id": "300031438",
	      "picUrl": "//img.alicdn.com/tps/i1/TB13VC4LVXXXXarXVXXSutbFXXX.jpg",
	      "finalScore": "0.5450674634839442",
	      "shopUrl": "http://kangerxin.tmall.com/campaign-3735-10.htm",
	      "entityType": "SHOP",
	      "brandId": "3781905"
	    }, {
	      "id": "92042735",
	      "picUrl": "//img.alicdn.com/tps/i1/TB1PxYcLVXXXXasaXXXSutbFXXX.jpg",
	      "finalScore": "0.5448023228053981",
	      "shopUrl": "http://shuixing.tmall.com/campaign-3735-10.htm",
	      "entityType": "SHOP",
	      "brandId": "3685660"
	    }],
	    "finalScore": "4.13",
	    "industryUrl": null,
	    "entityType": "OTHER",
	    "colour": "#bbffe5",
	    "industryTitle": null,
	    "bannerUrl": "//pages.tmall.com/wow/act/15617/jfjs?abbucket=_AB-M1011_B14&acm=03654.1003.1.735362&aldid=KXPpnvEH&abtest=_AB-LR1011-PR1011&scm=1003.1.03654.OTHER_4_735362&pos=5",
	    "leftBannerImg": "http://img.alicdn.com/tps/i3/TB1jeoCLVXXXXcoXXXXeWjm2pXX-750-240.jpg",
	    "_pos_": "5",
	    "industryBenefit": null,
	    "industryId": "4",
	    "industryImg": null,
	    "rightBannerImg": "//img.alicdn.com/tps/i4/TB1C5.fLVXXXXb3aXXXeWjm2pXX-750-240.jpg"
	  }, {
	    "shopList": [{
	      "id": "822428555",
	      "picUrl": "//img.alicdn.com/tps/i1/TB1g46aLVXXXXcUXVXXSutbFXXX.jpg",
	      "finalScore": "0.9183458776971917",
	      "shopUrl": "http://playboyyd.tmall.com/campaign-3735-11.htm",
	      "entityType": "SHOP",
	      "brandId": "29510"
	    }, {
	      "id": "196993935",
	      "picUrl": "//img.alicdn.com/tps/i1/TB1pHG8LVXXXXbraXXXSutbFXXX.jpg",
	      "finalScore": "0.9105525246667775",
	      "shopUrl": "https://uniqlo.tmall.com/campaign-3735-56.htm",
	      "entityType": "SHOP",
	      "brandId": "29527"
	    }, {
	      "id": "505753958",
	      "picUrl": "//img.alicdn.com/tps/i1/TB1WKYyLVXXXXXHXXXXSutbFXXX.jpg",
	      "finalScore": "0.90750966370726",
	      "shopUrl": "http://bonas.tmall.com/campaign-3735-11.htm",
	      "entityType": "SHOP",
	      "brandId": "3486580"
	    }, {
	      "id": "2113823580",
	      "picUrl": "//img.alicdn.com/tps/i1/TB1itHkLVXXXXX9XFXXSutbFXXX.jpg",
	      "finalScore": "0.5900977955635289",
	      "shopUrl": "http://kafanya.tmall.com/campaign-3735-7.htm",
	      "entityType": "SHOP",
	      "brandId": "110684218"
	    }],
	    "finalScore": "4.088",
	    "industryUrl": null,
	    "entityType": "OTHER",
	    "colour": "#ffc7c9",
	    "industryTitle": null,
	    "bannerUrl": "//pages.tmall.com/wow/act/15617/neiyi328?abbucket=_AB-M1011_B14&acm=03654.1003.1.735362&aldid=KXPpnvEH&abtest=_AB-LR1011-PR1011&scm=1003.1.03654.OTHER_9_735362&pos=6",
	    "leftBannerImg": "http://img.alicdn.com/tps/i1/TB1tl3tLVXXXXbbXFXXeWjm2pXX-750-240.jpg",
	    "_pos_": "6",
	    "industryBenefit": null,
	    "industryId": "9",
	    "industryImg": null,
	    "rightBannerImg": "//img.alicdn.com/tps/i2/TB1AkIyLVXXXXbjXpXXeWjm2pXX-750-240.jpg"
	  }],
	  "sub": [{
	    "shopList": null,
	    "finalScore": "4.033333333333333",
	    "industryUrl": "//pages.tmall.com/wow/act/15617/zbps?abbucket=_AB-M1011_B14&acm=03654.1003.1.735362&aldid=KXPpnvEH&abtest=_AB-LR1011-PR1011&scm=1003.1.03654.OTHER_3_735362&pos=7",
	    "entityType": "OTHER",
	    "colour": "#bbffe5",
	    "industryTitle": "珠宝配饰",
	    "bannerUrl": null,
	    "leftBannerImg": null,
	    "_pos_": "7",
	    "industryBenefit": "大牌1折秒杀",
	    "industryId": "3",
	    "industryImg": "//img.alicdn.com/tps/i1/TB1s5y.LVXXXXb.aXXXrdvGIFXX-248-155.jpg",
	    "rightBannerImg": null
	  }, {
	    "shopList": null,
	    "finalScore": "3.8773333333333335",
	    "industryUrl": "//pages.tmall.com/wow/act/15617/dqc?abbucket=_AB-M1011_B14&acm=03654.1003.1.735362&aldid=KXPpnvEH&abtest=_AB-LR1011-PR1011&scm=1003.1.03654.OTHER_15_735362&pos=8",
	    "entityType": "OTHER",
	    "colour": "#b4ebff",
	    "industryTitle": "数码",
	    "bannerUrl": null,
	    "leftBannerImg": null,
	    "_pos_": "8",
	    "industryBenefit": "疯抢大牌新品",
	    "industryId": "15",
	    "industryImg": "//img.alicdn.com/tps/i4/TB1_xG.LVXXXXbWaXXXrdvGIFXX-248-155.jpg",
	    "rightBannerImg": null
	  }, {
	    "shopList": null,
	    "finalScore": "3.8359999999999994",
	    "industryUrl": "//pages.tmall.com/wow/act/15617/man?abbucket=_AB-M1011_B14&acm=03654.1003.1.735362&aldid=KXPpnvEH&abtest=_AB-LR1011-PR1011&scm=1003.1.03654.OTHER_6_735362&pos=9",
	    "entityType": "OTHER",
	    "colour": "#cbe9a9",
	    "industryTitle": "男装",
	    "bannerUrl": null,
	    "leftBannerImg": null,
	    "_pos_": "9",
	    "industryBenefit": "新品低至9.9元",
	    "industryId": "6",
	    "industryImg": "//img.alicdn.com/tps/i1/TB1mO2qLVXXXXXiXFXXrdvGIFXX-248-155.jpg",
	    "rightBannerImg": null
	  }, {
	    "shopList": null,
	    "finalScore": "3.243333333333333",
	    "industryUrl": "//pages.tmall.com/wow/act/15617/xihu?abbucket=_AB-M1011_B14&acm=03654.1003.1.735362&aldid=KXPpnvEH&abtest=_AB-LR1011-PR1011&scm=1003.1.03654.OTHER_13_735362&pos=10",
	    "entityType": "OTHER",
	    "colour": "#cdffa4",
	    "industryTitle": "洗护",
	    "bannerUrl": null,
	    "leftBannerImg": null,
	    "_pos_": "10",
	    "industryBenefit": "爆款1分钱抢",
	    "industryId": "13",
	    "industryImg": "//img.alicdn.com/tps/i3/TB1Ft_CLVXXXXX2XXXXrdvGIFXX-248-155.jpg",
	    "rightBannerImg": null
	  }, {
	    "shopList": null,
	    "finalScore": "3.1553333333333335",
	    "industryUrl": "//pages.tmall.com/wow/act/15617/myxfs?abbucket=_AB-M1011_B14&acm=03654.1003.1.735362&aldid=KXPpnvEH&abtest=_AB-LR1011-PR1011&scm=1003.1.03654.OTHER_5_735362&pos=11",
	    "entityType": "OTHER",
	    "colour": "#f8e1ff",
	    "industryTitle": "母婴童装",
	    "bannerUrl": null,
	    "leftBannerImg": null,
	    "_pos_": "11",
	    "industryBenefit": "跨店满299减40",
	    "industryId": "5",
	    "industryImg": "//img.alicdn.com/tps/i4/TB1c.HvLVXXXXXPXpXXrdvGIFXX-248-155.jpg",
	    "rightBannerImg": null
	  }, {
	    "shopList": null,
	    "finalScore": "2.6739999999999995",
	    "industryUrl": "//pages.tmall.com/wow/act/15617/nvzhuang?abbucket=_AB-M1011_B14&acm=03654.1003.1.735362&aldid=KXPpnvEH&abtest=_AB-LR1011-PR1011&scm=1003.1.03654.OTHER_7_735362&pos=12",
	    "entityType": "OTHER",
	    "colour": "#d5cbe8",
	    "industryTitle": "女装",
	    "bannerUrl": null,
	    "leftBannerImg": null,
	    "_pos_": "12",
	    "industryBenefit": "折后用券抢新",
	    "industryId": "7",
	    "industryImg": "//img.alicdn.com/tps/i3/TB1JdfsLVXXXXbRXpXXrdvGIFXX-248-155.jpg",
	    "rightBannerImg": null
	  }, {
	    "shopList": null,
	    "finalScore": "0.0",
	    "industryUrl": "//pages.tmall.com/wow/act/15617/mobilephone?abbucket=_AB-M1011_B14&acm=03654.1003.1.735362&aldid=KXPpnvEH&abtest=_AB-LR1011-PR1011&scm=1003.1.03654.OTHER_14_735362&pos=13",
	    "entityType": "OTHER",
	    "colour": "#c5ffdf",
	    "industryTitle": "手机",
	    "bannerUrl": null,
	    "leftBannerImg": null,
	    "_pos_": "13",
	    "industryBenefit": "1元抢优惠券",
	    "industryId": "14",
	    "industryImg": "//img.alicdn.com/tps/i4/TB1M3zhLVXXXXX4XVXXrdvGIFXX-248-155.jpg",
	    "rightBannerImg": null
	  }, {
	    "shopList": null,
	    "finalScore": "0.0",
	    "industryUrl": "//pages.tmall.com/wow/act/15617/xiangbaohuanxin?abbucket=_AB-M1011_B14&acm=03654.1003.1.735362&aldid=KXPpnvEH&abtest=_AB-LR1011-PR1011&scm=1003.1.03654.OTHER_11_735362&pos=14",
	    "entityType": "OTHER",
	    "colour": "#ffccdc",
	    "industryTitle": "箱包",
	    "bannerUrl": null,
	    "leftBannerImg": null,
	    "_pos_": "14",
	    "industryBenefit": "极致焕新尖货",
	    "industryId": "11",
	    "industryImg": "//img.alicdn.com/tps/i3/TB1gE6kLVXXXXcrXFXXrdvGIFXX-248-155.jpg",
	    "rightBannerImg": null
	  }, {
	    "shopList": null,
	    "finalScore": "0.0",
	    "industryUrl": "//pages.tmall.com/wow/act/15617/newnv?abbucket=_AB-M1011_B14&acm=03654.1003.1.735362&aldid=KXPpnvEH&abtest=_AB-LR1011-PR1011&scm=1003.1.03654.OTHER_10_735362&pos=15",
	    "entityType": "OTHER",
	    "colour": "#fff8ee",
	    "industryTitle": "鞋履",
	    "bannerUrl": null,
	    "leftBannerImg": null,
	    "_pos_": "15",
	    "industryBenefit": "潮品精选鞋履",
	    "industryId": "10",
	    "industryImg": "//img.alicdn.com/tps/i3/TB1.qzpLVXXXXX.XFXXrdvGIFXX-248-155.jpg",
	    "rightBannerImg": null
	  }],
	  "isFormal": "false",
	  "exposureParam": "//ac.mmstat.com/1.gif?apply=vote&abbucket=_AB-M1011_B14&com=02&acm=03654.1003.1.735362&cod=03654&cache=U5revsTn&aldid=KXPpnvEH&logtype=4&abtest=_AB-LR1011-PR1011&scm=1003.1.03654.735362&ip=",
	  "id": "03654"
	};

	module.exports = {
	  components: {
	    banner: __webpack_require__(505)
	  },
	  props: {
	    ds: {
	      default: function _default() {
	        return {};
	      }
	    }
	  },
	  data: function data() {
	    return {
	      NUMBER_248: 248,
	      NUMBER_155: 155,
	      NUMBER_373: 373,
	      NUMBER_237: 237,
	      NUMBER_186: 186,
	      NUMBER_208: 208,
	      NUMBER_750: 750,
	      subItemBg: '//gw.alicdn.com/tps/TB1QzUfLVXXXXaOXVXXXXXXXXXX-248-86.jpg',
	      items: [],
	      subItems: []
	    };
	  },
	  created: function created() {
	    this.initData(demoContent);
	  },
	  methods: {
	    getSubItemTop: function getSubItemTop(i) {
	      return (i - i % 3) / 3 * (241 + 3);
	    },
	    getSubItemLeft: function getSubItemLeft(i) {
	      return i % 3 * (248 + 3);
	    },
	    initData: function initData(content) {
	      this.items = content.main;
	      this.subItems = content.sub;
	    }
	  }
	};

/***/ },

/***/ 513:
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _h('div', [(_vm.ds.floorTitle) ? _h('image', {
	    staticClass: ["title"],
	    attrs: {
	      "src": _vm.ds.floorTitle
	    }
	  }) : _vm._e(), _h('div', {
	    staticClass: ["item-container"]
	  }, [_vm._l((_vm.items), function(i, item) {
	    return _h('div', {
	      style: {
	        width: 750,
	        paddingBottom: 14,
	        backgroundColor: item.colour
	      }
	    }, [_h('div', [_h('banner', {
	      attrs: {
	        "width": _vm.NUMBER_750,
	        "height": _vm.NUMBER_237,
	        "src": i % 2 === 0 ? item.leftBannerImg : item.rightBannerImg,
	        "href": item.bannerUrl
	      }
	    })]), _h('div', {
	      staticClass: ["shop-list"]
	    }, [_vm._l((item.shopList), function(shop) {
	      return _h('div', {
	        staticClass: ["shop-img-container"]
	      }, [_h('banner', {
	        attrs: {
	          "width": _vm.NUMBER_186,
	          "height": _vm.NUMBER_208,
	          "src": shop.picUrl,
	          "href": shop.shopUrl
	        }
	      })])
	    })])])
	  })]), _h('div', {
	    staticClass: ["sub-item-container"],
	    style: {
	      height: Math.round(_vm.subItems.length / 3) * (241 + 3)
	    }
	  }, [_vm._l((_vm.subItems), function(i, item) {
	    return _h('div', {
	      staticClass: ["sub-item"],
	      style: {
	        top: _vm.getSubItemTop(i),
	        left: _vm.getSubItemLeft(i)
	      }
	    }, [_h('image', {
	      staticClass: ["sub-item-bg"],
	      attrs: {
	        "src": _vm.subItemBg
	      }
	    }), _h('div', {
	      staticClass: ["sub-item-img"]
	    }, [_h('banner', {
	      attrs: {
	        "width": _vm.NUMBER_248,
	        "height": _vm.NUMBER_155,
	        "src": item.industryImg,
	        "href": item.industryUrl
	      }
	    })]), _h('div', {
	      staticClass: ["sub-item-title"]
	    }, [_h('text', {
	      staticClass: ["industry-title"],
	      attrs: {
	        "href": item.industryUrl
	      }
	    }, [_vm._s(item.industryTitle)]), _h('text', {
	      staticClass: ["industry-benefit"],
	      attrs: {
	        "href": item.industryUrl
	      }
	    }, [_vm._s(item.industryBenefit)])])])
	  })])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true

/***/ },

/***/ 514:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = []

	/* styles */
	__vue_styles__.push(__webpack_require__(515)
	)

	/* script */
	__vue_exports__ = __webpack_require__(516)

	/* template */
	var __vue_template__ = __webpack_require__(517)
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
	__vue_options__.__file = "/Users/bobning/work/source/weex_fork/examples/vue/showcase/include/coupon.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__.style = __vue_options__.style || {}
	__vue_styles__.forEach(function (module) {
	for (var name in module) {
	__vue_options__.style[name] = module[name]
	}
	})

	module.exports = __vue_exports__


/***/ },

/***/ 515:
/***/ function(module, exports) {

	module.exports = {
	  "title": {
	    "width": 750,
	    "height": 100
	  },
	  "wrapper": {
	    "color": "#FF4550",
	    "width": 750,
	    "height": 230
	  },
	  "my-coupon": {
	    "width": 180,
	    "height": 39,
	    "position": "absolute",
	    "top": 15,
	    "right": 149
	  },
	  "guides": {
	    "height": 39,
	    "width": 110,
	    "position": "absolute",
	    "top": 15,
	    "right": 32
	  },
	  "lottery": {
	    "width": 348,
	    "height": 76,
	    "position": "absolute",
	    "top": 132,
	    "right": 70
	  },
	  "info": {
	    "fontSize": 18,
	    "position": "absolute",
	    "top": 84,
	    "right": 70
	  },
	  "img": {
	    "width": 750,
	    "height": 230
	  }
	}

/***/ },

/***/ 516:
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

	var modal = __weex_require_module__('modal');
	module.exports = {
	  props: {
	    ds: {
	      default: function _default() {
	        return {};
	      }
	    }
	  },
	  data: function data() {
	    return {
	      currentStatus: '//img.alicdn.com/tps/i4/TB1cYBKMXXXXXayaXXXkxHk2pXX-750-228.jpg_q75.jpg'
	    };
	  },
	  methods: {
	    handleClick: function handleClick(e) {
	      modal.toast({
	        message: 'click',
	        duration: 1
	      });
	    }
	  }
	};

/***/ },

/***/ 517:
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _h('div', [(_vm.ds.floorTitle) ? _h('image', {
	    staticClass: ["title"],
	    attrs: {
	      "src": _vm.ds.floorTitle
	    }
	  }) : _vm._e(), _h('div', {
	    staticClass: ["wrapper"]
	  }, [_h('image', {
	    staticClass: ["img"],
	    attrs: {
	      "src": _vm.currentStatus
	    }
	  }), _h('div', {
	    staticClass: ["my-coupon"],
	    on: {
	      "click": _vm.handleClick
	    }
	  }), _h('div', {
	    staticClass: ["guides"],
	    on: {
	      "click": _vm.handleClick
	    }
	  }), _h('div', {
	    staticClass: ["lottery"],
	    on: {
	      "click": _vm.handleClick
	    }
	  })])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true

/***/ },

/***/ 518:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = []

	/* styles */
	__vue_styles__.push(__webpack_require__(519)
	)

	/* script */
	__vue_exports__ = __webpack_require__(520)

	/* template */
	var __vue_template__ = __webpack_require__(521)
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
	__vue_options__.__file = "/Users/bobning/work/source/weex_fork/examples/vue/showcase/include/goods.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__.style = __vue_options__.style || {}
	__vue_styles__.forEach(function (module) {
	for (var name in module) {
	__vue_options__.style[name] = module[name]
	}
	})

	module.exports = __vue_exports__


/***/ },

/***/ 519:
/***/ function(module, exports) {

	module.exports = {
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

/***/ },

/***/ 520:
/***/ function(module, exports, __webpack_require__) {

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

	module.exports = {
	  components: {
	    banner: __webpack_require__(505)
	  },
	  props: {
	    ds: {
	      default: function _default() {
	        return {};
	      }
	    }
	  },
	  data: function data() {
	    return {
	      NUMBER_251: 251,
	      NUMBER_240: 240,
	      NUMBER_292: 292,
	      NUMBER_588: 588
	    };
	  }
	};

/***/ },

/***/ 521:
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return (!_vm.ds.isHide) ? _h('div', [(_vm.ds.floorTitle) ? _h('image', {
	    staticClass: ["title"],
	    attrs: {
	      "src": _vm.ds.floorTitle
	    }
	  }) : _vm._e(), _h('slider', {
	    staticClass: ["slider"],
	    attrs: {
	      "show-indicators": "true",
	      "auto-play": "true",
	      "interval": "3000"
	    }
	  }, [_vm._l((_vm.ds.bannerItems), function(item) {
	    return _h('div', {
	      staticClass: ["pannel"]
	    }, [_h('div', [_h('banner', {
	      staticStyle: {
	        marginBottom: "4"
	      },
	      attrs: {
	        "width": _vm.NUMBER_251,
	        "height": _vm.NUMBER_292,
	        "src": item.img1,
	        "href": item.url1
	      }
	    }), _h('banner', {
	      attrs: {
	        "width": _vm.NUMBER_251,
	        "height": _vm.NUMBER_292,
	        "src": item.img2,
	        "href": item.url2
	      }
	    })]), _h('div', {
	      staticClass: ["middle-col"]
	    }, [_h('banner', {
	      attrs: {
	        "width": _vm.NUMBER_240,
	        "height": _vm.NUMBER_588,
	        "src": item.img3,
	        "href": item.url3
	      }
	    })]), _h('div', [_h('banner', {
	      staticStyle: {
	        marginBottom: "4"
	      },
	      attrs: {
	        "width": _vm.NUMBER_251,
	        "height": _vm.NUMBER_292,
	        "src": item.img4,
	        "href": item.url4
	      }
	    }), _h('banner', {
	      attrs: {
	        "width": _vm.NUMBER_251,
	        "height": _vm.NUMBER_292,
	        "src": item.img5,
	        "href": item.url5
	      }
	    })])])
	  }), _h('indicator', {
	    staticStyle: {
	      position: "absolute",
	      width: "714",
	      height: "200",
	      left: "10",
	      bottom: "-80",
	      itemSize: "20",
	      itemColor: "#999999",
	      itemSelectedColor: "#000000"
	    }
	  })])]) : _vm._e()
	},staticRenderFns: []}
	module.exports.render._withStripped = true

/***/ },

/***/ 522:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = []

	/* styles */
	__vue_styles__.push(__webpack_require__(523)
	)

	/* script */
	__vue_exports__ = __webpack_require__(524)

	/* template */
	var __vue_template__ = __webpack_require__(525)
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
	__vue_options__.__file = "/Users/bobning/work/source/weex_fork/examples/vue/showcase/include/resource.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__.style = __vue_options__.style || {}
	__vue_styles__.forEach(function (module) {
	for (var name in module) {
	__vue_options__.style[name] = module[name]
	}
	})

	module.exports = __vue_exports__


/***/ },

/***/ 523:
/***/ function(module, exports) {

	module.exports = {
	  "title": {
	    "width": 750,
	    "height": 100
	  },
	  "big-banner-container": {
	    "marginBottom": 4
	  }
	}

/***/ },

/***/ 524:
/***/ function(module, exports, __webpack_require__) {

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

	module.exports = {
	  components: {
	    banners: __webpack_require__(503),
	    banner: __webpack_require__(505)
	  },
	  props: {
	    ds: {
	      default: function _default() {
	        return {};
	      }
	    }
	  },
	  data: function data() {
	    return {
	      NUMBER_750: 750,
	      NUMBER_200: 200,
	      NUMBER_373: 373,
	      NUMBER_224: 224,
	      NUMBER_4: 4
	    };
	  }
	};

/***/ },

/***/ 525:
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return (!_vm.ds.isHide) ? _h('div', [_h('div', {
	    staticClass: ["big-banner-container"]
	  }, [_h('banner', {
	    attrs: {
	      "width": _vm.NUMBER_750,
	      "height": _vm.NUMBER_200,
	      "src": _vm.ds.bigBannerImg,
	      "href": _vm.ds.bigBannerUrl
	    }
	  })]), _h('banners', {
	    attrs: {
	      "direction": "row",
	      "ds": _vm.ds.smallBannerItems,
	      "width": _vm.NUMBER_373,
	      "height": _vm.NUMBER_224,
	      "space": _vm.NUMBER_4
	    }
	  })]) : _vm._e()
	},staticRenderFns: []}
	module.exports.render._withStripped = true

/***/ },

/***/ 526:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = []

	/* styles */
	__vue_styles__.push(__webpack_require__(527)
	)

	/* script */
	__vue_exports__ = __webpack_require__(528)

	/* template */
	var __vue_template__ = __webpack_require__(529)
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
	__vue_options__.__file = "/Users/bobning/work/source/weex_fork/examples/vue/showcase/include/scene.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__.style = __vue_options__.style || {}
	__vue_styles__.forEach(function (module) {
	for (var name in module) {
	__vue_options__.style[name] = module[name]
	}
	})

	module.exports = __vue_exports__


/***/ },

/***/ 527:
/***/ function(module, exports) {

	module.exports = {
	  "title": {
	    "width": 750,
	    "height": 100
	  },
	  "item": {
	    "width": 750,
	    "height": 340,
	    "marginBottom": 4
	  },
	  "item-img": {
	    "position": "absolute",
	    "left": 110,
	    "top": 20
	  },
	  "right-item-img": {
	    "position": "absolute",
	    "right": 110,
	    "top": 20
	  },
	  "benifit-img": {
	    "position": "absolute",
	    "right": 5,
	    "top": 160
	  },
	  "right-benifit-img": {
	    "position": "absolute",
	    "left": 40,
	    "top": 160
	  },
	  "small-item-container": {
	    "width": 750
	  },
	  "small-item": {
	    "position": "absolute",
	    "width": 373,
	    "height": 230,
	    "flexDirection": "row"
	  },
	  "small-item-bg": {
	    "width": 373,
	    "height": 230
	  },
	  "small-item-img": {
	    "position": "absolute",
	    "left": 12,
	    "top": 12
	  },
	  "small-benifit-img": {
	    "position": "absolute",
	    "right": 0,
	    "top": 65
	  }
	}

/***/ },

/***/ 528:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

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

	var demoContent = [{
	  "id": "1111",
	  "sceneUrl": "https://pages.tmall.com/wow/act/15617/scene?acm=03653.1003.1.740603&aldid=VyrSqx06&wh_id=1392&scm=1003.1.03653.SUB_1111_740603&pos=1",
	  "_s_": "d",
	  "itemImg": "https://img.alicdn.com/tps/TB1c7t.MXXXXXchXXXXXXXXXXXX-182-206.jpg",
	  "sceneCat": "50012010,50012027,50012032,50007003,50008881,50008883,1623,162116,50010850,123216004",
	  "finalScore": "10000.0",
	  "_pos_": "1",
	  "entityType": "SUB",
	  "benefitImg": "//img.alicdn.com/tps/TB1Zgl2MXXXXXaYXFXXXXXXXXXX-170-100.png"
	}, {
	  "id": "1396",
	  "sceneUrl": "https://pages.tmall.com/wow/act/15617/scene?acm=03653.1003.1.740603&aldid=VyrSqx06&wh_id=1396&scm=1003.1.03653.SUB_1396_740603&pos=2",
	  "_s_": "d",
	  "itemImg": "//img.alicdn.com/tps/i2/TB1O1VfMXXXXXX0aXXXKofZZpXX-182-206.jpg",
	  "sceneCat": "50010368,50011892,50011894,50013794,50010792,50010790,50010790,121434025,121396024,50010793,50010789,50010793,121386035,121392037,121458034,121392036,121482027,121392015,121368014,121418013,121392016,50011982,122690003,302910,50012010,122654005,50012019,50012825,50012027,50012042,50011744,50012906,50012907,50008881,50008883,50008882?,50012784?,50022889,50022728,50013228,50013896,50014775,50019578,50014822,50026394,50019694,50019279,50019272,50014079,50014078,50014076,50014077,50017238,121464011,121468014,50019130,50019127,50019126,50019128,50019125,50015984,50014803,50014802,50015980,50014788,50014787,50019526,50014791,50019520,50013932,50014677,50015978,50014786,50014785,50522001,50014493,50023100,121418021,121388027,121424021,121418020,121368020,50012036,50012044,50012043,50010368, 50011892, 50019274,50012044,50012048,50012043,50013228,50013238,50011726,50019279,50015984,50014803,50014802,50019526,50014791,50019520,50013932,50014677,50019526,50013314,50023341,50016752,50016749,50016747,50016744,50016741,50016740,50016739,50016738,50016737,50016769,50016763,50016750,50007003,302910,50012010,50012032,50012033,50011745,50011746,50011894,121458034,121756003,121426033,50011982,50011979,121390006,124730001,50001748,50011130,124730001,50001748,50011130,50011129,50010160,50011161,50011159,50010159,50010158,50011127,3035,50010167,50000557,50011123,50010402,50000436,50011153,50010850,50000671,162201,50022566,50007068,50026651,50000852,162104,162116,162205,1623,123216004,162404,162401,50011412,50011411,162402,50008903,50011413,162403,50000697,1629,50011277,121412004,50008897,50008901,50008899,50013194,50008904,50008905,50008898,162103,50008900,50013196,121434004,50005065,162702,162701,162703,1636,1512,123534001,14,50008090,50012341,50132002,50012342,50012343,50012345,50012346,50013189,50010527,121394006,50013618,50010537,50012424,121452038,121484044,50010540,50010548,50024769,121450007,50013697,50010218,50005960,50005962,50012820,50012406,50023620,50023605,50008829,50024064,50023440,50008687,124392001,50023771,50006804,50012410,124482010,121398023,50023789,50011975",
	  "finalScore": "10000.0",
	  "_pos_": "2",
	  "entityType": "SUB",
	  "benefitImg": "//img.alicdn.com/tps/i1/TB1cp4sMXXXXXbLXFXX3bpXTXXX-170-100.png"
	}, {
	  "id": "1616",
	  "sceneUrl": "https://pages.tmall.com/wow/act/15617/scene?acm=03653.1003.1.740603&aldid=VyrSqx06&wh_id=1616&scm=1003.1.03653.SUB_1616_740603&pos=3",
	  "_s_": "d",
	  "itemImg": "//img.alicdn.com/tps/i4/TB1dlEALVXXXXbxXpXXKofZZpXX-182-206.jpg",
	  "sceneCat": "50009032,50007003,302910,1512,124688012,124986002,124942005,50023722,50010368,50011892,50011894",
	  "finalScore": "10000.0",
	  "_pos_": "3",
	  "entityType": "SUB",
	  "benefitImg": "//img.alicdn.com/tps/i3/TB1fxonLVXXXXXUaXXX3bpXTXXX-170-100.png"
	}, {
	  "id": "16424",
	  "sceneUrl": "https://brand.tmall.com/mobilestreet/subject.htm?id=16424&acm=03653.1003.1.740603&aldid=VyrSqx06&spm=0.0.0.0.Wv8ion&scm=1003.1.03653.SUB_16424_740603&pos=4",
	  "_s_": "d",
	  "itemImg": "//img.alicdn.com/tps/i4/TB1.i2_LVXXXXbrXpXXKofZZpXX-182-206.jpg",
	  "sceneCat": "50012043,50012036,50010850,50000671,1622,50000852,162104,50000697,162205,162116,50012027,50012032,50012028,50012033,50012042,50008882,50012772,50006846,50008881,50000436,50011123,3035,50010167,50000557,50010158,50010159,50010402,50010160,50011980,50011993,121390006,50011978,50011977,50011979,121454013,50011745",
	  "finalScore": "6.729749999999999",
	  "_pos_": "4",
	  "entityType": "SUB",
	  "benefitImg": "//img.alicdn.com/tps/i2/TB1bhH5LVXXXXapXFXX3bpXTXXX-170-100.png"
	}, {
	  "id": "16425",
	  "sceneUrl": "https://brand.tmall.com/mobilestreet/subject.htm?id=16360&acm=03653.1003.1.740603&aldid=VyrSqx06&spm=0.0.0.0.MttFEC&scm=1003.1.03653.SUB_16425_740603&pos=5",
	  "_s_": "d",
	  "itemImg": "//img.alicdn.com/tps/i3/TB15ywbLVXXXXcdXXXXKofZZpXX-182-206.jpg",
	  "sceneCat": "50012043,50012036,50010850,50000671,1622,50000852,162104,50000697,162205,162116,50012027,50012032,50012028,50012033,50012042,50008882,50012772,50006846,50008881,50000436,50011123,3035,50010167,50000557,50010158,50010159,50010402,50010160,50011980,50011993,121390006,50011978,50011977,50011979,121454013,50011745",
	  "finalScore": "6.729749999999999",
	  "_pos_": "5",
	  "entityType": "SUB",
	  "benefitImg": "//img.alicdn.com/tps/i1/TB1JBLYLVXXXXXlXVXX3bpXTXXX-170-100.png"
	}, {
	  "id": "1625",
	  "sceneUrl": "https://pages.tmall.com/wow/fushi/act/gf-chaoliu?acm=03653.1003.1.740603&aldid=VyrSqx06&scm=1003.1.03653.SUB_1625_740603&pos=6",
	  "_s_": "d",
	  "itemImg": "//img.alicdn.com/bao/uploaded/i2/TB1Gd21KVXXXXXZXVXXXXXXXXXX_!!0-item_pic.jpg",
	  "sceneCat": "50012043,50012036,50010850,50000671,1622,50000852,162104,50000697,162205,162116,50012027,50012032,50012028,50012033,50012042,50008882,50012772,50006846,50008881,50000436,50011123,3035,50010167,50000557,50010158,50010159,50010402,50010160,50011980,50011993,121390006,50011978,50011977,50011979,121454013,50011982,50011991,50012906,50011744,50011745,50011743,50012907,50011746,50010815,121460005,50013794,122438001,121398006,121386023,50010808",
	  "finalScore": "6.729749999999999",
	  "_pos_": "6",
	  "entityType": "SUB",
	  "benefitImg": "//img.alicdn.com/tps/i3/TB1qxXzMXXXXXcjXFXX3bpXTXXX-170-100.png"
	}, {
	  "id": "1392",
	  "sceneUrl": "https://pages.tmall.com/wow/act/15617/scene?acm=03653.1003.1.740603&aldid=VyrSqx06&wh_id=1392&scm=1003.1.03653.SUB_1392_740603&pos=7",
	  "_s_": "d",
	  "itemImg": "https://img.alicdn.com/tps/TB1c7t.MXXXXXchXXXXXXXXXXXX-182-206.jpg",
	  "sceneCat": "50006842,50006840,50008881,50008883,50008882,50008884,50012774,50012775,50012776,50012781,5000888,50012766,50012771,50012772,50010404,50010368, 50011892, 50011894,124688012,124730001,50001748,50011130,124730001,50001748,50011130,50011129,50010160,50011161,50011159,50010159,50010158,50011127,3035,50010167,50000557,50011123,50010402,50000436,50011153,50011740,50008882,50008886,50008885,50012777,50012778,50011977,50011978,50011979,50011980,50011982,50011990,50011999,50012000,50011993,50011996,50011997,121366011,121484009,121368010,121390006,121398029,121404030,121404031,121408040,121410035,121412033,121414041,121418013,121454013,121410013,121422013,121484013,50010789,50010790,50010792,50010793,50010794,50010796,50010797,50010798,50010801,50010803,50010805,50010807,50010808,50010815,121410007,121426007,121452004,121460005,50012341,50132002,50012342,50012343,50012345,50012346,50013189,50010527,121394006,50013618,50010537,50012424,121452038,121484044,50010540,50010548,50024769,121366037,121458036,121392038,121420035,121364028,121468026,121472031,121476036,121470042,121418032,121410036,121472032,121420032,121470040,121384032,121460028,121448028,121400030,121424024,121482025,121418031,121402028,121388035,121460029,121400028,121400029,121418030,121476034,121478031,121448029,121480030,121366035,121424025,121426030,121484030,121412031,121384033,121424023,121402027,121408039,121420033,121452028,121466040,121416029,121482028,121420034,121396046,121422052,121370037,121424031,21364043,121472040,121412045,121424032,125054002,125074007,125074008,125104003,125080003,125024006,125080004",
	  "finalScore": "4.4951428571428576",
	  "_pos_": "7",
	  "entityType": "SUB",
	  "benefitImg": "//img.alicdn.com/tps/TB1Zgl2MXXXXXaYXFXXXXXXXXXX-170-100.png"
	}, {
	  "id": "1395",
	  "sceneUrl": "https://pages.tmall.com/wow/act/15617/scene?acm=03653.1003.1.740603&aldid=VyrSqx06&wh_id=1395&scm=1003.1.03653.SUB_1395_740603&pos=8",
	  "_s_": "d",
	  "itemImg": "//img.alicdn.com/tps/i2/TB1p4NcMXXXXXbGaXXXKofZZpXX-182-206.jpg",
	  "sceneCat": "50008881,50008883,50008882,50008884,50012774,50012775,50012776,50012781,50008886,50012766,50012771,50012772,50010850,50000671,162201,50022566,50007068,50026651,50000852,162104,162116,162205,1623,123216004,162404,162401,50011412,50011411,16240,50012773,50006846,50010394,50008888,50008890,50008889,50012784,50012785,50012786,50012787,50008885,50012777,50012778,124730001,50001748,50011130,124730001,50001748,50011130,50011129,50010160,50011161,50011159,50010159,50010158,50011127,3035,50010167,50000557,50011123,50010402,50000436,50011153,50011740,50006843,50006842,124942005,50010368,50011892,50011894,50023751,121366037,121458036,121392038,121420035,121364028,121468026,121400029,121418030,121478031,121480030,121366035,121424025,121426030,121484030,121412031,125054002,125074007,125074008,125104003,125080003,125024006,125080004,121400030,121424024,121482025,121418031,121402028,121388035",
	  "finalScore": "4.465166666666667",
	  "_pos_": "8",
	  "entityType": "SUB",
	  "benefitImg": "//img.alicdn.com/tps/i1/TB1ySNtMXXXXXamXFXX3bpXTXXX-170-100.png"
	}, {
	  "id": "1394",
	  "sceneUrl": "https://pages.tmall.com/wow/act/15617/scene?acm=03653.1003.1.740603&aldid=VyrSqx06&wh_id=1394&scm=1003.1.03653.SUB_1394_740603&pos=9",
	  "_s_": "d",
	  "itemImg": "//img.alicdn.com/tps/i4/TB1Ns8eMXXXXXb1aXXXKofZZpXX-182-206.jpg",
	  "sceneCat": "50010850,50000671,162201,50022566,50007068,50026651,50000852,162104,162116,162205,1623,123216004,162404,162401,50011412,50011411,162402,50008903,50011413,162403,50000697,1629,50011277,121412004,50008897,50008901,50008899,50013194,50008904,50008905,50008898,162103,50008900,50013196,121434004,50005065,162702,162701,162703,1636,124730001,50001748,50011130,124730001,50001748,50011130,50011129,50010160,50011161,50011159,50010159,50010158,50011127,3035,50010167,50000557,50011123,50010402,50000436,50011153,50011740,50006843,50006842,124986002,50010368, 50011892,50011894,121480030,121366035,121424025,121426030,121484030,121412031",
	  "finalScore": "4.309925925925926",
	  "_pos_": "9",
	  "entityType": "SUB",
	  "benefitImg": "//img.alicdn.com/tps/i3/TB1ZEXfMXXXXXapaXXX3bpXTXXX-170-100.png"
	}, {
	  "id": "1610",
	  "sceneUrl": "https://pages.tmall.com/wow/act/15617/scene?acm=03653.1003.1.740603&aldid=VyrSqx06&wh_id=1610&scm=1003.1.03653.SUB_1610_740603&pos=10",
	  "_s_": "d",
	  "itemImg": "//img.alicdn.com/tps/i3/TB1ONckLVXXXXbJaXXXKofZZpXX-182-206.jpg",
	  "sceneCat": "121484044,121452038,50012342,50012027,50012032,50006843,50010850,50000671,162104,1623,50011277,162116,123216004,50008898,121366037,121458036,121392038,121420035,121364028,121468026,121472031,121476036,121470042,121418032,121410036,121472032,121420032,121470040,121384032,121460028,121448028,121400030,121424024,121482025,121418031,121402028,121388035,121460029,121400028,121400029,121418030,121476034,121478031,121448029,121480030,121366035,121424025,121426030,121484030,121412031,121384033,121424023,121402027,121408039,121420033,121452028,121466040,121416029,121482028,121420034,121396046,121422052,121370037,121424031,21364043,121472040,121412045,121424032,125054002,125074007,125074008,125104003,125080003,125024006,125080004",
	  "finalScore": "4.293333333333334",
	  "_pos_": "10",
	  "entityType": "SUB",
	  "benefitImg": "//img.alicdn.com/tps/i2/TB1RzwFLVXXXXXsXpXX3bpXTXXX-170-100.png"
	}, {
	  "id": "1619",
	  "sceneUrl": "https://pages.tmall.com/wow/act/15617/scene?acm=03653.1003.1.740603&aldid=VyrSqx06&wh_id=1619&scm=1003.1.03653.SUB_1619_740603&pos=11",
	  "_s_": "d",
	  "itemImg": "//img.alicdn.com/tps/i3/TB1eagyLVXXXXaiXFXXKofZZpXX-182-206.jpg",
	  "sceneCat": "124730001,50001748,50011130,124730001,50001748,50011130,50011129,50010160,50011161,50011159,50010159,50010158,50011127,3035,50010167,50000557,50011123,50010402,50000436,50011153,122654005,50011740,50009032,124688012，213202,121396029,121476023,121410029,213203,50023326,213205,50022686,50023293,50466023,50024999,50016885，50011894",
	  "finalScore": "4.23",
	  "_pos_": "11",
	  "entityType": "SUB",
	  "benefitImg": "//img.alicdn.com/tps/i4/TB1j0AxLVXXXXaRXFXX3bpXTXXX-170-100.png"
	}, {
	  "id": "1613",
	  "sceneUrl": "https://pages.tmall.com/wow/act/15617/scene?acm=03653.1003.1.740603&aldid=VyrSqx06&wh_id=1613&scm=1003.1.03653.SUB_1613_740603&pos=12",
	  "_s_": "d",
	  "itemImg": "//img.alicdn.com/tps/i2/TB1WssFLVXXXXXUXpXXKofZZpXX-182-206.jpg",
	  "sceneCat": "50023108,50022893,50022892,50022890,50013228,50019520,50017120,50019560,50017129,50017128,50017127,50017126,50017125,50017124,50017123,50017122,50017121,50020039,50020038,50017119,50019559,50017110,50017108,50017107,50017097,50017096,50017095,50017094,50017093,50017092,50012036,50012041",
	  "finalScore": "4.2186666666666675",
	  "_pos_": "12",
	  "entityType": "SUB",
	  "benefitImg": "//img.alicdn.com/tps/i1/TB1Rg.qLVXXXXbqXVXX3bpXTXXX-170-100.png"
	}, {
	  "id": "1614",
	  "sceneUrl": "https://pages.tmall.com/wow/act/15617/scene?acm=03653.1003.1.740603&aldid=VyrSqx06&wh_id=1614&scm=1003.1.03653.SUB_1614_740603&pos=13",
	  "_s_": "d",
	  "itemImg": "//img.alicdn.com/tps/i1/TB1KzUxLVXXXXajXFXXKofZZpXX-182-206.jpg",
	  "sceneCat": "50013238,50011726,50022893,50022892,50022890,50013228,50017129,50020038,50017119,50019559,50017102,50017110,50017097,50019707,50019555,50016677,50018317,50016675,50016673,50016672,50016671,50016670,50016732,50016669,50016668,50016667,50016666,50016665,50016683,50016682,50016608,50016607,50016637,50016638,50012036,50012043",
	  "finalScore": "4.216",
	  "_pos_": "13",
	  "entityType": "SUB",
	  "benefitImg": "//img.alicdn.com/tps/i2/TB1WyouLVXXXXXcXVXX3bpXTXXX-170-100.png"
	}, {
	  "id": "1397",
	  "sceneUrl": "https://pages.tmall.com/wow/act/15617/scene?acm=03653.1003.1.740603&aldid=VyrSqx06&wh_id=1397&scm=1003.1.03653.SUB_1397_740603&pos=14",
	  "_s_": "d",
	  "itemImg": "//img.alicdn.com/tps/i4/TB1dCxvMXXXXXc1XpXXKofZZpXX-182-206.jpg",
	  "sceneCat": "122846004,50020776,50024799,50024801,50024921,50002794,50020778,50002792,50002791,50002793,50003942,50005500,50005497,50001692,50005495,50005496,50005503,50005498,50005499,50005501,50005502,50003455,50003457,122904003,50023091,50020770,50008863,50005507,121414011,50020768,50022701,50008862,121420012,50020766,50020764,121398012,121380011,50020751,50020676,50024945,50020720,50002790,50020730,50001866,50020678,121476008,121458013,50002795,121364011,50005505,121422014,50024943,50000583,50000582,50000584,213002,50005033,50000563,50008607,50006988,50008608,50024601,50024602,50012051,50001871,122854005,121458010,121452006,121416008,50008779,50002777,121394007,121386009,50010825,50013810,121434010,50001865,50008565,50008246,50017192,121404045,121368009,121462014,50019372,50008248,121418011,50008249,50017193,50008252,50008251,50000512,121364047,122846004,50020776,50024799,50024801,50024921,50002794,50020778,50002792,50002791,50002793,50003942,50005500,50005497,50001692,50005495,50005496,50005503,50005498,50005499,50005501,50005502,50003455,50003457,122904003,50023091,50020770,50008863,50005507,121414011,50020768,50022701,50008862,121420012,50020766,50020764,121398012,121380011,50020751,50020676,50024945,50020720,50002790,50020730,50001866,50020678,121476008,121458013,50002795,121364011,50005505,121422014,50024943,50000583,50000582,50000584,213002,50005033,50000563,50008607,50006988,50008608,50024601,50024602,50012051,50020835,50021907,121472021,50021902,50005919,50002045,122724003,122652007,121408025,122688004,50021924,50021923,50000561,50011738,122676005,121396026,121388028,50003338,50021915,50011415,50011416,50003454,50021928,50021930,50021929,50021931,50024939,121384024,121472020,50020902,50020903,50020904,50020905,50021888,50021889,50021890,50023266,122960005,50012001,50011999,50012004,50012000,50012006,121394024,121412033,121394025,121450036,121472007,121480009,121388013,121466009,121484012,121366014,121434014,121422012,121476006,121396013,50011997,121434013,122646001,121458012,121468012,121368013,50011979,121366015,121406016,121456012,121366011,121414010,121460006,121368014,121388016,121396013,121400010,121470011,121474011,121478009,124760009,124768010,124822006,121482009,122430002,121454014,121392016，50001871,122854005,121458010,121452006,121416008,50008779,50002777,121394007,121386009,50010825,50013810,121434010,50001865,50008565,50008246,50017192,121404045,121368009,121462014,50019372,50008248,121418011,50008249,50017193,50008252,50008251,50000512,121364047,122846004,50020776,50024799,50024801,50024921,50002794,50020778,50002792,50002791,50002793,50003942,50005500,50005497,50001692,50005495,50005496,50005503,50005498,50005499,50005501,50005502,50003455,50003457,122904003,50023091,50020770,50008863,50005507,121414011,50020768,50022701,50008862,121420012,50020766,50020764,121398012,121380011,50020751,50020676,50024945,50020720,50002790,50020730,50001866,50020678,121476008,121458013,50002795,121364011,50005505,121422014,50024943,50000583,50000582,50000584,213002,50005033,50000563,50008607,50006988,50008608,50024601,50024602,50012051",
	  "finalScore": "3.4206666666666665",
	  "_pos_": "14",
	  "entityType": "SUB",
	  "benefitImg": "//img.alicdn.com/tps/i3/TB1ZARnMXXXXXaGXVXX3bpXTXXX-170-100.png"
	}, {
	  "id": "1608",
	  "sceneUrl": "https://pages.tmall.com/wow/act/15617/scene?acm=03653.1003.1.740603&aldid=VyrSqx06&wh_id=1608&scm=1003.1.03653.SUB_1608_740603&pos=15",
	  "_s_": "d",
	  "itemImg": "//img.alicdn.com/tps/i3/TB1xA3jLVXXXXXqapXXKofZZpXX-182-206.jpg",
	  "sceneCat": "50012010,50012027,50012032,50007003,50008881,50008883,1623,162116,50010850,123216004",
	  "finalScore": "0.0",
	  "_pos_": "15",
	  "entityType": "SUB",
	  "benefitImg": "//img.alicdn.com/tps/i2/TB1WvoALVXXXXcdXpXX3bpXTXXX-170-100.png"
	}];

	module.exports = {
	  components: {
	    banner: __webpack_require__(505)
	  },
	  props: {
	    ds: {
	      default: function _default() {
	        return {};
	      }
	    }
	  },
	  data: function data() {
	    return {
	      NUMBER_186: 186,
	      NUMBER_206: 206,
	      NUMBER_373: 373,
	      NUMBER_230: 230,
	      NUMBER_170: 170,
	      NUMBER_100: 100,
	      NUMBER_750: 750,
	      NUMBER_300: 300,
	      NUMBER_340: 340,
	      smallItemBg: 'https://gw.alicdn.com/tps/TB1oBIeLVXXXXatXpXXXXXXXXXX-373-230.jpg',
	      items: [],
	      smallItems: [],
	      sceneBgs: ['https://gw.alicdn.com/tps/TB1xBT8LVXXXXbYXVXXXXXXXXXX-750-340.jpg', 'https://gw.alicdn.com/tps/TB1RoEkLVXXXXaMXpXXXXXXXXXX-750-340.jpg', 'https://gw.alicdn.com/tps/TB1DiEpLVXXXXa7XXXXXXXXXXXX-750-340.jpg']
	    };
	  },
	  created: function created() {
	    this.items = demoContent.slice(0, 3);
	    this.smallItems = demoContent.slice(3);
	  },
	  methods: {
	    getItemTop: function getItemTop(i) {
	      return (i - i % 2) / 2 * (230 + 4);
	    },
	    getItemLeft: function getItemLeft(i) {
	      return i % 2 * (373 + 4);
	    }
	  }
	};

/***/ },

/***/ 529:
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _h('div', [(_vm.ds.floorTitle) ? _h('image', {
	    staticClass: ["title"],
	    attrs: {
	      "src": _vm.ds.floorTitle
	    }
	  }) : _vm._e(), _h('div', {
	    staticClass: ["small-item-container"],
	    style: {
	      height: Math.round(_vm.smallItems.length / 2) * 234
	    }
	  }, [_vm._l((_vm.smallItems), function(i, item) {
	    return _h('div', {
	      staticClass: ["small-item"],
	      style: {
	        top: _vm.getItemTop(i),
	        left: _vm.getItemLeft(i)
	      }
	    }, [_h('div', [_h('image', {
	      staticClass: ["small-item-bg"],
	      attrs: {
	        "src": _vm.smallItemBg
	      }
	    })]), _h('div', {
	      staticClass: ["small-item-img"]
	    }, [_h('banner', {
	      attrs: {
	        "width": _vm.NUMBER_186,
	        "height": _vm.NUMBER_206,
	        "src": item.itemImg,
	        "href": item.sceneUrl
	      }
	    })]), _h('div', {
	      staticClass: ["small-benifit-img"]
	    }, [_h('banner', {
	      attrs: {
	        "width": _vm.NUMBER_170,
	        "height": _vm.NUMBER_100,
	        "src": item.benefitImg,
	        "href": item.sceneUrl
	      }
	    })])])
	  })])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true

/***/ },

/***/ 530:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = []

	/* styles */
	__vue_styles__.push(__webpack_require__(531)
	)

	/* script */
	__vue_exports__ = __webpack_require__(532)

	/* template */
	var __vue_template__ = __webpack_require__(533)
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
	__vue_options__.__file = "/Users/bobning/work/source/weex_fork/examples/vue/showcase/include/match.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__.style = __vue_options__.style || {}
	__vue_styles__.forEach(function (module) {
	for (var name in module) {
	__vue_options__.style[name] = module[name]
	}
	})

	module.exports = __vue_exports__


/***/ },

/***/ 531:
/***/ function(module, exports) {

	module.exports = {
	  "title": {
	    "width": 750,
	    "height": 100
	  },
	  "tm-banner": {
	    "bottom": 4
	  }
	}

/***/ },

/***/ 532:
/***/ function(module, exports, __webpack_require__) {

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

	module.exports = {
	  components: {
	    banner: __webpack_require__(505)
	  },
	  props: {
	    ds: {
	      default: function _default() {
	        return {};
	      }
	    }
	  },
	  data: function data() {
	    return {
	      NUMBER_750: 750,
	      NUMBER_373: 373,
	      NUMBER_240: 240,
	      NUMBER_200: 200,
	      NUMBER_4: 4
	    };
	  }
	};

/***/ },

/***/ 533:
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _h('div', [(_vm.ds.floorTitle) ? _h('image', {
	    staticClass: ["title"],
	    attrs: {
	      "src": _vm.ds.floorTitle
	    }
	  }) : _vm._e(), (_vm.ds.isShowTmSpecBanner && _vm.ds.tmSpecBanner) ? _h('div', {
	    staticClass: ["tm-banner"]
	  }, [_h('banner', {
	    attrs: {
	      "width": _vm.NUMBER_750,
	      "height": _vm.NUMBER_200,
	      "src": _vm.ds.tmSpecBanner.img,
	      "href": _vm.ds.tmSpecBanner.url
	    }
	  })]) : _vm._e(), _vm._l((_vm.ds.bannerItems), function(item) {
	    return _h('div', {
	      style: {
	        flexDirection: 'row',
	        marginBottom: _vm.NUMBER_4
	      }
	    }, [_h('div', {
	      style: {
	        marginRight: _vm.NUMBER_4
	      }
	    }, [_h('banner', {
	      attrs: {
	        "width": _vm.NUMBER_373,
	        "height": _vm.NUMBER_240,
	        "src": item.leftImg,
	        "href": item.leftUrl
	      }
	    })]), _h('div', [_h('banner', {
	      attrs: {
	        "width": _vm.NUMBER_373,
	        "height": _vm.NUMBER_240,
	        "src": item.rightImg,
	        "href": item.rightUrl
	      }
	    })])])
	  })])
	},staticRenderFns: []}
	module.exports.render._withStripped = true

/***/ },

/***/ 534:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = []

	/* styles */
	__vue_styles__.push(__webpack_require__(535)
	)

	/* script */
	__vue_exports__ = __webpack_require__(536)

	/* template */
	var __vue_template__ = __webpack_require__(537)
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
	__vue_options__.__file = "/Users/bobning/work/source/weex_fork/examples/vue/showcase/include/brand.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__.style = __vue_options__.style || {}
	__vue_styles__.forEach(function (module) {
	for (var name in module) {
	__vue_options__.style[name] = module[name]
	}
	})

	module.exports = __vue_exports__


/***/ },

/***/ 535:
/***/ function(module, exports) {

	module.exports = {
	  "title": {
	    "width": 750,
	    "height": 100
	  },
	  "container": {
	    "marginBottom": 4,
	    "backgroundColor": "#C0BABC"
	  }
	}

/***/ },

/***/ 536:
/***/ function(module, exports, __webpack_require__) {

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

	module.exports = {
	  components: {
	    banners: __webpack_require__(503)
	  },
	  props: {
	    ds: {
	      default: function _default() {
	        return {
	          bannerItems: []
	        };
	      }
	    }
	  },
	  data: function data() {
	    return {
	      NUMBER_742: 742,
	      NUMBER_230: 230,
	      NUMBER_4: 4
	    };
	  },
	  computed: {
	    bannerItems: function bannerItems() {
	      return this.ds.bannerItems.slice(0, 8);
	    }
	  },
	  created: function created() {
	    var bannerItems = this.ds.bannerItems;
	    bannerItems.sort(function () {
	      return Math.random() - 0.5;
	    });
	    for (var i = 0; i < bannerItems.length; i++) {
	      var item = bannerItems[i];
	      if (i % 2 === 0) {
	        item.img = item.leftImg;
	        item.url = item.rightUrl;
	      } else {
	        item.img = item.rightImg;
	        item.url = item.rightUrl;
	      }
	    }
	  }
	};

/***/ },

/***/ 537:
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _h('div', {
	    staticClass: ["container"]
	  }, [(_vm.ds.floorTitle) ? _h('image', {
	    staticClass: ["title"],
	    attrs: {
	      "src": _vm.ds.floorTitle
	    }
	  }) : _vm._e(), _h('div', {
	    staticStyle: {
	      marginLeft: "4",
	      marginRight: "4"
	    }
	  }, [_h('banners', {
	    attrs: {
	      "direction": "column",
	      "ds": _vm.bannerItems,
	      "width": _vm.NUMBER_742,
	      "height": _vm.NUMBER_230,
	      "space": _vm.NUMBER_4
	    }
	  })])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true

/***/ },

/***/ 538:
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _h('scroller', {
	    staticClass: ["content"]
	  }, [_h('refresh', {
	    staticClass: ["refresh"],
	    staticStyle: {
	      flexDirection: "row"
	    },
	    attrs: {
	      "display": _vm.displayRefresh
	    },
	    on: {
	      "refresh": _vm.handleRefresh
	    }
	  }, [_h('loading-indicator'), _h('text', {
	    staticStyle: {
	      marginLeft: "36px",
	      color: "#eee"
	    }
	  }, ["下拉刷新..."])]), (_vm.show0) ? _h('headlines', {
	    attrs: {
	      "ds": _vm.showData.header
	    }
	  }) : _vm._e(), (_vm.show0) ? _h('category', {
	    attrs: {
	      "ds": _vm.showData.category
	    }
	  }) : _vm._e(), (_vm.show1) ? _h('coupon', {
	    attrs: {
	      "ds": _vm.showData.coupon
	    }
	  }) : _vm._e(), (_vm.show1) ? _h('goods', {
	    attrs: {
	      "ds": _vm.showData.goods
	    }
	  }) : _vm._e(), (_vm.show1) ? _h('resource', {
	    attrs: {
	      "ds": _vm.showData.resource
	    }
	  }) : _vm._e(), (_vm.show1) ? _h('scene', {
	    attrs: {
	      "ds": _vm.showData.scene
	    }
	  }) : _vm._e(), (_vm.show2) ? _h('match', {
	    attrs: {
	      "ds": _vm.showData.match
	    }
	  }) : _vm._e(), (_vm.show2) ? _h('brand', {
	    attrs: {
	      "ds": _vm.showData.brand
	    }
	  }) : _vm._e(), _h('loading', {
	    staticClass: ["loading"],
	    attrs: {
	      "display": _vm.displayLoading
	    },
	    on: {
	      "loading": _vm.handleLoading
	    }
	  }, [_h('text', {
	    staticStyle: {
	      color: "#eee"
	    }
	  }, ["加载更多..."])])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true

/***/ }

/******/ });