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
/***/ function(module, exports, __webpack_require__) {

	;__weex_define__("@weex-component/73b44713db2eae6d536291fb7cc654e4", [], function(__weex_require__, __weex_exports__, __weex_module__){
	__webpack_require__(20);
	__webpack_require__(21);
	__webpack_require__(22);
	__webpack_require__(23);
	__webpack_require__(24);
	__webpack_require__(25);
	__webpack_require__(26);
	__webpack_require__(27);

	;
	  __webpack_require__(1)
	  __weex_module__.exports = {
	    data: function () {return {
	      navBarHeight: 88,
	      cnt: 0,
	      show0: true,
	      show1: false,
	      show2: false,
	      displayRefresh: 'show',
	      displayLoading: 'show',
	    }},
	    methods: {
	      ready: function () {
	        var self = this;
	        self._initData();
	        self._initEnv();
	        self._initUtil();
	      },
	      _initData: function () {
	        var self = this;
	        self.showData = {
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
	            },
	            {
	              "img": "https://img.alicdn.com/tps/TB1U8LHLVXXXXa3XpXXXXXXXXXX-233-172.jpg",
	              "url": "https://chaoshi.m.tmall.com/"
	            },
	            {
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
	            },
	            {
	              "img": "https://img.alicdn.com/tps/TB1Ff_0LVXXXXXNaXXXXXXXXXXX-375-262.jpg",
	              "url": "https://chaoshi.m.tmall.com/"
	            }],
	            "isHideStarBanner": false,
	            "firstStarBannerItems": [{
	              "img": "https://gw.alicdn.com/tps/TB1xlIVLVXXXXckXVXXXXXXXXXX-250-220.jpg",
	              "url": "https://chaoshi.m.tmall.com/"
	            },
	            {
	              "img": "https://gw.alicdn.com/tps/TB1xlIVLVXXXXckXVXXXXXXXXXX-250-220.jpg",
	              "url": "https://chaoshi.m.tmall.com/"
	            }],
	            "secondStarBannerItems": [{
	              "img": "https://gw.alicdn.com/tps/TB1xlIVLVXXXXckXVXXXXXXXXXX-250-220.jpg",
	              "url": "https://chaoshi.m.tmall.com/"
	            },
	            {
	              "img": "https://gw.alicdn.com/tps/TB1xlIVLVXXXXckXVXXXXXXXXXX-250-220.jpg",
	              "url": "https://chaoshi.m.tmall.com/"
	            }],
	            "thirdStarBannerItems": [{
	              "img": "https://gw.alicdn.com/tps/TB1xlIVLVXXXXckXVXXXXXXXXXX-250-220.jpg",
	              "url": "https://chaoshi.m.tmall.com/"
	            },
	            {
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
	            },
	            {
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
	                "benefitImg": "//img.alicdn.com/tps/i3/TB1Onr9LVXXXXbiXpXXB8gAQpXX-300-100.png",
	              },
	              {
	                "id": "1394",
	                "sceneUrl": "https://pages.tmall.com/wow/act/15617/scene?acm=03653.1003.1.710531&aldid=TPMkJDIw&wh_id=1394&scm=1003.1.03653.MAIN_1394_710531&pos=2",
	                "_s_": "d",
	                "itemImg": "//img.alicdn.com/tps/i1/TB13mj1LVXXXXa.XFXXTCU0QpXX-300-300.jpg",
	                "sceneCat": "50010850,50000671,162201,50022566,50007068,50026651,50000852,162104,162116,162205,1623,123216004,162404,162401,50011412,50011411,162402,50008903,50011413,162403,50000697,1629,50011277,121412004,50008897,50008901,50008899,50013194,50008904,50008905,50008898,162103,50008900,50013196,121434004,50005065,162702,162701,162703,1636,124730001,50001748,50011130,124730001,50001748,50011130,50011129,50010160,50011161,50011159,50010159,50010158,50011127,3035,50010167,50000557,50011123,50010402,50000436,50011153,50011740,50006843,50006842,124986002,50010368, 50011892,50011894,121480030,121366035,121424025,121426030,121484030,121412031",
	                "finalScore": "77.06103999999999",
	                "_pos_": 2,
	                "entityType": "MAIN",
	                "benefitImg": "//img.alicdn.com/tps/i2/TB17kvVLVXXXXaTXVXXB8gAQpXX-300-100.png",
	              },
	              {
	                "id": "1396",
	                "sceneUrl": "https://pages.tmall.com/wow/act/15617/scene?acm=03653.1003.1.710531&aldid=TPMkJDIw&wh_id=1396&scm=1003.1.03653.MAIN_1396_710531&pos=3",
	                "_s_": "d",
	                "itemImg": "//img.alicdn.com/tps/i2/TB1ZOAXLVXXXXa0XXXXTCU0QpXX-300-300.jpg",
	                "sceneCat": "50010368,50011892,50011894,50013794,50010792,50010790,50010790,121434025,121396024,50010793,50010789,50010793,121386035,121392037,121458034,121392036,121482027,121392015,121368014,121418013,121392016,50011982,122690003,302910,50012010,122654005,50012019,50012825,50012027,50012042,50011744,50012906,50012907,50008881,50008883,50008882?,50012784?,50022889,50022728,50013228,50013896,50014775,50019578,50014822,50026394,50019694,50019279,50019272,50014079,50014078,50014076,50014077,50017238,121464011,121468014,50019130,50019127,50019126,50019128,50019125,50015984,50014803,50014802,50015980,50014788,50014787,50019526,50014791,50019520,50013932,50014677,50015978,50014786,50014785,50522001,50014493,50023100,121418021,121388027,121424021,121418020,121368020,50012036,50012044,50012043,50010368, 50011892, 50019274,50012044,50012048,50012043,50013228,50013238,50011726,50019279,50015984,50014803,50014802,50019526,50014791,50019520,50013932,50014677,50019526,50013314,50023341,50016752,50016749,50016747,50016744,50016741,50016740,50016739,50016738,50016737,50016769,50016763,50016750,50007003,302910,50012010,50012032,50012033,50011745,50011746,50011894,121458034,121756003,121426033,50011982,50011979,121390006,124730001,50001748,50011130,124730001,50001748,50011130,50011129,50010160,50011161,50011159,50010159,50010158,50011127,3035,50010167,50000557,50011123,50010402,50000436,50011153,50010850,50000671,162201,50022566,50007068,50026651,50000852,162104,162116,162205,1623,123216004,162404,162401,50011412,50011411,162402,50008903,50011413,162403,50000697,1629,50011277,121412004,50008897,50008901,50008899,50013194,50008904,50008905,50008898,162103,50008900,50013196,121434004,50005065,162702,162701,162703,1636,1512,123534001,14,50008090,50012341,50132002,50012342,50012343,50012345,50012346,50013189,50010527,121394006,50013618,50010537,50012424,121452038,121484044,50010540,50010548,50024769,121450007,50013697,50010218,50005960,50005962,50012820,50012406,50023620,50023605,50008829,50024064,50023440,50008687,124392001,50023771,50006804,50012410,124482010,121398023,50023789,50011975",
	                "finalScore": "76.76379487179486",
	                "_pos_": 3,
	                "entityType": "MAIN",
	                "benefitImg": "//img.alicdn.com/tps/i3/TB1Usn.LVXXXXaoXpXXB8gAQpXX-300-100.png",
	              },
	              {
	                "id": "1619",
	                "sceneUrl": "https://pages.tmall.com/wow/act/15617/scene?acm=03653.1003.1.710531&aldid=TPMkJDIw&wh_id=1619&scm=1003.1.03653.SUB_1619_710531&pos=4",
	                "_s_": "d",
	                "itemImg": "//img.alicdn.com/tps/i2/TB1MpoBLVXXXXbxXpXXKofZZpXX-182-206.jpg",
	                "sceneCat": "124730001,50001748,50011130,124730001,50001748,50011130,50011129,50010160,50011161,50011159,50010159,50010158,50011127,3035,50010167,50000557,50011123,50010402,50000436,50011153,122654005,50011740,50009032,124688012，213202,121396029,121476023,121410029,213203,50023326,213205,50022686,50023293,50466023,50024999,50016885，50011894",
	                "finalScore": "75.88480000000001",
	                "_pos_": 4,
	                "entityType": "SUB",
	                "benefitImg": "//img.alicdn.com/tps/i4/TB1j0AxLVXXXXaRXFXX3bpXTXXX-170-100.png",
	              },
	              {
	                "id": "1612",
	                "sceneUrl": "https://pages.tmall.com/wow/act/15617/scene?acm=03653.1003.1.710531&aldid=TPMkJDIw&wh_id=1612&scm=1003.1.03653.SUB_1612_710531&pos=5",
	                "_s_": "d",
	                "itemImg": "//img.alicdn.com/tps/i3/TB1NNwyLVXXXXaEXVXXKofZZpXX-182-206.jpg",
	                "sceneCat": "50010850,50000671,162104,162116,123216004",
	                "finalScore": "75.23733333333334",
	                "_pos_": 5,
	                "entityType": "SUB",
	                "benefitImg": "//img.alicdn.com/tps/i1/TB1PsoBLVXXXXbQXpXX3bpXTXXX-170-100.png",
	              },
	              {
	                "id": "1610",
	                "sceneUrl": "https://pages.tmall.com/wow/act/15617/scene?acm=03653.1003.1.710531&aldid=TPMkJDIw&wh_id=1610&scm=1003.1.03653.SUB_1610_710531&pos=6",
	                "_s_": "d",
	                "itemImg": "//img.alicdn.com/tps/i4/TB1EkczLVXXXXcVXpXXKofZZpXX-182-206.jpg",
	                "sceneCat": "121484044,121452038,50012342,50012027,50012032,50006843,50010850,50000671,162104,1623,50011277,162116,123216004,50008898,121366037,121458036,121392038,121420035,121364028,121468026,121472031,121476036,121470042,121418032,121410036,121472032,121420032,121470040,121384032,121460028,121448028,121400030,121424024,121482025,121418031,121402028,121388035,121460029,121400028,121400029,121418030,121476034,121478031,121448029,121480030,121366035,121424025,121426030,121484030,121412031,121384033,121424023,121402027,121408039,121420033,121452028,121466040,121416029,121482028,121420034,121396046,121422052,121370037,121424031,21364043,121472040,121412045,121424032,125054002,125074007,125074008,125104003,125080003,125024006,125080004",
	                "finalScore": "75.00533333333334",
	                "_pos_": 6,
	                "entityType": "SUB",
	                "benefitImg": "//img.alicdn.com/tps/i2/TB1RzwFLVXXXXXsXpXX3bpXTXXX-170-100.png",
	              },
	              {
	                "id": "1620",
	                "sceneUrl": "https://pages.tmall.com/wow/act/15617/scene?acm=03653.1003.1.710531&aldid=TPMkJDIw&wh_id=1620&scm=1003.1.03653.SUB_1620_710531&pos=7",
	                "_s_": "d",
	                "itemImg": "//img.alicdn.com/tps/i1/TB1IJsILVXXXXbGXXXXKofZZpXX-182-206.jpg",
	                "sceneCat": "50010789,50010790,50010792,50010793,50010794,50010796,50010797,50010798,50010801,50010803,50010805,50010807,50010808,50010813,50010814,50010815,50013794,121382014,121386023,121388007,121388008,121398004,121364007,121398006,121410007,121426007,121452004,50012010,50012027,50012032，124688012, 124986002, 124942005，50010850,50000671,162104,162201,50022566,162116,1623,50011277,50008897,162401,162402",
	                "finalScore": "74.72522222222223",
	                "_pos_": 7,
	                "entityType": "SUB",
	                "benefitImg": "//img.alicdn.com/tps/i1/TB16A.yLVXXXXX8XFXX3bpXTXXX-170-100.png",
	              },
	              {
	                "id": "1608",
	                "sceneUrl": "https://pages.tmall.com/wow/act/15617/scene?acm=03653.1003.1.710531&aldid=TPMkJDIw&wh_id=1608&scm=1003.1.03653.SUB_1608_710531&pos=8",
	                "_s_": "d",
	                "itemImg": "//img.alicdn.com/tps/i3/TB1xA3jLVXXXXXqapXXKofZZpXX-182-206.jpg",
	                "sceneCat": "50012010,50012027,50012032,50007003,50008881,50008883,1623,162116,50010850,123216004",
	                "finalScore": "74.626",
	                "_pos_": 8,
	                "entityType": "SUB",
	                "benefitImg": "//img.alicdn.com/tps/i2/TB1WvoALVXXXXcdXpXX3bpXTXXX-170-100.png",
	              },
	              {
	                "id": "1615",
	                "sceneUrl": "https://pages.tmall.com/wow/act/15617/scene?acm=03653.1003.1.710531&aldid=TPMkJDIw&wh_id=1615&scm=1003.1.03653.SUB_1615_710531&pos=9",
	                "_s_": "d",
	                "itemImg": "//img.alicdn.com/tps/i1/TB1PVctLVXXXXchXFXXKofZZpXX-182-206.jpg",
	                "sceneCat": "50011978,50011979,50011980,50011993,50011996,50011997,121390006,121408011,121474010,50010789,50010790,50010792,50010793,50010803,50013794,121398004,121410007，213205,121470030,50024980,121408030",
	                "finalScore": "74.02799999999999",
	                "_pos_": 9,
	                "entityType": "SUB",
	                "benefitImg": "//img.alicdn.com/tps/i4/TB1yKwBLVXXXXa4XpXX3bpXTXXX-170-100.png",
	              },
	              {
	                "id": "1618",
	                "sceneUrl": "https://pages.tmall.com/wow/act/15617/scene?acm=03653.1003.1.710531&aldid=TPMkJDIw&wh_id=1618&scm=1003.1.03653.SUB_1618_710531&pos=10",
	                "_s_": "d",
	                "itemImg": "//img.alicdn.com/tps/i1/TB1vn3sLVXXXXX5XVXXKofZZpXX-182-206.jpg",
	                "sceneCat": "50008886,50012766,50012771,50012772,50012773,50008090,111219,50012100,50012082,50012478,50012475,213202,50018977,121396029,121476023,50018994,121410029,213203,50023326,50003820,213205,50022686,50012481,50013976?,50001871,122854005,121458010,121452006,121416008,50008779,50002777,121394007,121386009,50010825,50013810,121434010,50001865,50008565,50008246,50017192,121404045,121368009,121462014,50019372,50008248,121418011,50008249,50017193,50008252,50008251,50000512,121364047",
	                "finalScore": "73.94212121212121",
	                "_pos_": 10,
	                "entityType": "SUB",
	                "benefitImg": "//img.alicdn.com/tps/i4/TB1kSkpLVXXXXbTXVXX3bpXTXXX-170-100.png",
	              },
	              {
	                "id": "1617",
	                "sceneUrl": "https://pages.tmall.com/wow/act/15617/scene?acm=03653.1003.1.710531&aldid=TPMkJDIw&wh_id=1617&scm=1003.1.03653.SUB_1617_710531&pos=11",
	                "_s_": "d",
	                "itemImg": "//img.alicdn.com/tps/i1/TB1ELwrLVXXXXaNXVXXKofZZpXX-182-206.jpg",
	                "sceneCat": "50013189,50010527,121394006,50013618,50010537,50012424,121452038,121484044,50010540,50010548,50024769,50012341,50132002,50012342,50012343,50012345,50012346,50012341,50132002,50012342,50012343,50012345,50012346",
	                "finalScore": "73.78883333333334",
	                "_pos_": 11,
	                "entityType": "SUB",
	                "benefitImg": "//img.alicdn.com/tps/i3/TB1CtsuLVXXXXcJXFXX3bpXTXXX-170-100.png",
	              }],
	              "exposureParam": "//ac.mmstat.com/1.gif?apply=vote&abbucket=_AB-M1001_B5&com=02&acm=03653.1003.1.710531&cod=03653&cache=jWl8FJsb&aldid=TPMkJDIw&logtype=4&abtest=_AB-LR1001-PR1001&scm=1003.1.03653.710531",
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
	            },
	            {
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
	              },
	              {
	                "finalScore": 0,
	                "industryUrl": "//pages.tmall.com/wow/act/15617/xihu?abbucket=_AB-M1011_B5&acm=03654.1003.1.735362&aldid=e5zPEI6R&abtest=_AB-LR1011-PR1011&scm=1003.1.03654.OTHER_13_735362&pos=2",
	                "entityType": "OTHER",
	                "colour": "cdffa4",
	                "industryTitle": "洗护",
	                "_pos_": 2,
	                "industryBenefit": "爆款1分钱抢",
	                "industryId": "13",
	                "industryImg": "//img.alicdn.com/tps/i3/TB1Ft_CLVXXXXX2XXXXrdvGIFXX-248-155.jpg"
	              },
	              {
	                "finalScore": 0,
	                "industryUrl": "//pages.tmall.com/wow/act/15617/mobilephone?abbucket=_AB-M1011_B5&acm=03654.1003.1.735362&aldid=e5zPEI6R&abtest=_AB-LR1011-PR1011&scm=1003.1.03654.OTHER_14_735362&pos=3",
	                "entityType": "OTHER",
	                "colour": "c5ffdf",
	                "industryTitle": "手机",
	                "_pos_": 3,
	                "industryBenefit": "1元抢优惠券",
	                "industryId": "14",
	                "industryImg": "//img.alicdn.com/tps/i3/TB1mJjuLVXXXXc.XXXXrdvGIFXX-248-155.jpg"
	              },
	              {
	                "finalScore": 0,
	                "industryUrl": "//pages.tmall.com/wow/act/15617/xiangbaohuanxin?abbucket=_AB-M1011_B5&acm=03654.1003.1.735362&aldid=e5zPEI6R&abtest=_AB-LR1011-PR1011&scm=1003.1.03654.OTHER_11_735362&pos=4",
	                "entityType": "OTHER",
	                "colour": "ffccdc",
	                "industryTitle": "箱包",
	                "_pos_": 4,
	                "industryBenefit": "极致焕新尖货",
	                "industryId": "11",
	                "industryImg": "//img.alicdn.com/tps/i2/TB1_5P9KVXXXXayaXXXrdvGIFXX-248-155.jpg"
	              },
	              {
	                "finalScore": 0,
	                "industryUrl": "//pages.tmall.com/wow/act/15617/newfood?abbucket=_AB-M1011_B5&acm=03654.1003.1.735362&aldid=e5zPEI6R&abtest=_AB-LR1011-PR1011&scm=1003.1.03654.OTHER_12_735362&pos=5",
	                "entityType": "OTHER",
	                "colour": "fff5a3",
	                "industryTitle": "食品",
	                "_pos_": 5,
	                "industryBenefit": "新品1分试吃",
	                "industryId": "12",
	                "industryImg": "//img.alicdn.com/tps/i2/TB1HfLzLVXXXXb_XXXXrdvGIFXX-248-155.jpg"
	              },
	              {
	                "finalScore": 0,
	                "industryUrl": "//pages.tmall.com/wow/act/15617/zbps?abbucket=_AB-M1011_B5&acm=03654.1003.1.735362&aldid=e5zPEI6R&abtest=_AB-LR1011-PR1011&scm=1003.1.03654.OTHER_3_735362&pos=6",
	                "entityType": "OTHER",
	                "colour": "bbffe5",
	                "industryTitle": "珠宝配饰",
	                "_pos_": 6,
	                "industryBenefit": "大牌1折秒杀",
	                "industryId": "3",
	                "industryImg": "//img.alicdn.com/tps/i1/TB1s5y.LVXXXXb.aXXXrdvGIFXX-248-155.jpg"
	              },
	              {
	                "finalScore": 0,
	                "industryUrl": "//pages.tmall.com/wow/act/15617/getbeauty?abbucket=_AB-M1011_B5&acm=03654.1003.1.735362&aldid=e5zPEI6R&abtest=_AB-LR1011-PR1011&scm=1003.1.03654.OTHER_2_735362&pos=7",
	                "entityType": "OTHER",
	                "colour": "ffd1b6",
	                "industryTitle": "美妆",
	                "_pos_": 7,
	                "industryBenefit": "即刻预约美丽",
	                "industryId": "2",
	                "industryImg": "//img.alicdn.com/tps/i1/TB1lNvoLVXXXXaoXFXXrdvGIFXX-248-155.jpg"
	              },
	              {
	                "finalScore": 0,
	                "industryUrl": "//pages.tmall.com/wow/act/15617/guojixfs?abbucket=_AB-M1011_B5&acm=03654.1003.1.735362&aldid=e5zPEI6R&abtest=_AB-LR1011-PR1011&scm=1003.1.03654.OTHER_1_735362&pos=8",
	                "entityType": "OTHER",
	                "colour": "b9eaf2",
	                "industryTitle": "天猫国际",
	                "_pos_": 8,
	                "industryBenefit": "唤醒全球潮流",
	                "industryId": "1",
	                "industryImg": "//img.alicdn.com/tps/i4/TB1JHbkLVXXXXblXFXXrdvGIFXX-248-155.jpg"
	              },
	              {
	                "finalScore": 0,
	                "industryUrl": "//pages.tmall.com/wow/act/15617/newnv?abbucket=_AB-M1011_B5&acm=03654.1003.1.735362&aldid=e5zPEI6R&abtest=_AB-LR1011-PR1011&scm=1003.1.03654.OTHER_10_735362&pos=9",
	                "entityType": "OTHER",
	                "colour": "fff8ee",
	                "industryTitle": "鞋履",
	                "_pos_": 9,
	                "industryBenefit": "潮品精选鞋履",
	                "industryId": "10",
	                "industryImg": "//img.alicdn.com/tps/i2/TB1RovwLVXXXXXnXpXXrdvGIFXX-248-155.jpg"
	              },
	              {
	                "finalScore": 0,
	                "industryUrl": "//pages.tmall.com/wow/act/15617/nvzhuang?abbucket=_AB-M1011_B5&acm=03654.1003.1.735362&aldid=e5zPEI6R&abtest=_AB-LR1011-PR1011&scm=1003.1.03654.OTHER_7_735362&pos=10",
	                "entityType": "OTHER",
	                "colour": "d5cbe8",
	                "industryTitle": "女装",
	                "_pos_": 10,
	                "industryBenefit": "折后用券抢新",
	                "industryId": "7",
	                "industryImg": "//img.alicdn.com/tps/i1/TB1BOncLVXXXXXSaXXXrdvGIFXX-248-155.jpg"
	              },
	              {
	                "finalScore": 0,
	                "industryUrl": "//pages.tmall.com/wow/act/15617/man?abbucket=_AB-M1011_B5&acm=03654.1003.1.735362&aldid=e5zPEI6R&abtest=_AB-LR1011-PR1011&scm=1003.1.03654.OTHER_6_735362&pos=11",
	                "entityType": "OTHER",
	                "colour": "cbe9a9",
	                "industryTitle": "男装",
	                "_pos_": 11,
	                "industryBenefit": "新品低至9.9元",
	                "industryId": "6",
	                "industryImg": "//img.alicdn.com/tps/i4/TB1t9TmLVXXXXbkXFXXrdvGIFXX-248-155.jpg"
	              },
	              {
	                "finalScore": 0,
	                "industryUrl": "//pages.tmall.com/wow/act/15617/myxfs?abbucket=_AB-M1011_B5&acm=03654.1003.1.735362&aldid=e5zPEI6R&abtest=_AB-LR1011-PR1011&scm=1003.1.03654.OTHER_5_735362&pos=12",
	                "entityType": "OTHER",
	                "colour": "f8e1ff",
	                "industryTitle": "母婴童装",
	                "_pos_": 12,
	                "industryBenefit": "跨店满299减40",
	                "industryId": "5",
	                "industryImg": "//img.alicdn.com/tps/i3/TB1kpziLVXXXXabXVXXrdvGIFXX-248-155.jpg"
	              },
	              {
	                "finalScore": 0,
	                "industryUrl": "//pages.tmall.com/wow/act/15617/jfjs?abbucket=_AB-M1011_B5&acm=03654.1003.1.735362&aldid=e5zPEI6R&abtest=_AB-LR1011-PR1011&scm=1003.1.03654.OTHER_4_735362&pos=13",
	                "entityType": "OTHER",
	                "colour": "bbffe5",
	                "industryTitle": "家纺家饰",
	                "_pos_": 13,
	                "industryBenefit": "全场低至9.9元",
	                "industryId": "4",
	                "industryImg": "//img.alicdn.com/tps/i1/TB1lUjzLVXXXXbAXXXXrdvGIFXX-248-155.jpg"
	              },
	              {
	                "finalScore": 0,
	                "industryUrl": "//pages.tmall.com/wow/act/15617/neiyi328?abbucket=_AB-M1011_B5&acm=03654.1003.1.735362&aldid=e5zPEI6R&abtest=_AB-LR1011-PR1011&scm=1003.1.03654.OTHER_9_735362&pos=14",
	                "entityType": "OTHER",
	                "colour": "ffc7c9",
	                "industryTitle": "内衣",
	                "_pos_": 14,
	                "industryBenefit": "新品3折起",
	                "industryId": "9",
	                "industryImg": "//img.alicdn.com/tps/i1/TB1S7PuLVXXXXcVXXXXrdvGIFXX-248-155.jpg"
	              },
	              {
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
	              "exposureParam": "//ac.mmstat.com/1.gif?apply=vote&abbucket=_AB-M1011_B5&com=02&acm=03654.1003.1.735362&cod=03654&cache=CG5ZB02B&aldid=e5zPEI6R&logtype=4&abtest=_AB-LR1011-PR1011&scm=1003.1.03654.735362",
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
	            },
	            {
	              "leftImg": "https://gw.alicdn.com/tps/TB1F2fJLVXXXXccXFXXXXXXXXXX-750-230.jpg",
	              "leftUrl": "https://chaoshi.m.tmall.com/",
	              "rightImg": "https://gw.alicdn.com/tps/TB1F2fJLVXXXXccXFXXXXXXXXXX-750-230.jpg",
	              "rightUrl": "https://chaoshi.m.tmall.com/"
	            },
	            {
	              "leftImg": "https://gw.alicdn.com/tps/TB1F2fJLVXXXXccXFXXXXXXXXXX-750-230.jpg",
	              "leftUrl": "https://chaoshi.m.tmall.com/",
	              "rightImg": "https://gw.alicdn.com/tps/TB1F2fJLVXXXXccXFXXXXXXXXXX-750-230.jpg",
	              "rightUrl": "https://chaoshi.m.tmall.com/"
	            },
	            {
	              "leftImg": "https://gw.alicdn.com/tps/TB1F2fJLVXXXXccXFXXXXXXXXXX-750-230.jpg",
	              "leftUrl": "https://chaoshi.m.tmall.com/",
	              "rightImg": "https://gw.alicdn.com/tps/TB1F2fJLVXXXXccXFXXXXXXXXXX-750-230.jpg",
	              "rightUrl": "https://chaoshi.m.tmall.com/"
	            },
	            {
	              "leftImg": "https://gw.alicdn.com/tps/TB1F2fJLVXXXXccXFXXXXXXXXXX-750-230.jpg",
	              "leftUrl": "https://chaoshi.m.tmall.com/",
	              "rightImg": "https://gw.alicdn.com/tps/TB1F2fJLVXXXXccXFXXXXXXXXXX-750-230.jpg",
	              "rightUrl": "https://chaoshi.m.tmall.com/"
	            },
	            {
	              "leftImg": "https://gw.alicdn.com/tps/TB1F2fJLVXXXXccXFXXXXXXXXXX-750-230.jpg",
	              "leftUrl": "https://chaoshi.m.tmall.com/",
	              "rightImg": "https://gw.alicdn.com/tps/TB1F2fJLVXXXXccXFXXXXXXXXXX-750-230.jpg",
	              "rightUrl": "https://chaoshi.m.tmall.com/"
	            },
	            {
	              "leftImg": "https://gw.alicdn.com/tps/TB1F2fJLVXXXXccXFXXXXXXXXXX-750-230.jpg",
	              "leftUrl": "https://chaoshi.m.tmall.com/",
	              "rightImg": "https://gw.alicdn.com/tps/TB1F2fJLVXXXXccXFXXXXXXXXXX-750-230.jpg",
	              "rightUrl": "https://chaoshi.m.tmall.com/"
	            },
	            {
	              "leftImg": "https://gw.alicdn.com/tps/TB1F2fJLVXXXXccXFXXXXXXXXXX-750-230.jpg",
	              "leftUrl": "https://chaoshi.m.tmall.com/",
	              "rightImg": "https://gw.alicdn.com/tps/TB1F2fJLVXXXXccXFXXXXXXXXXX-750-230.jpg",
	              "rightUrl": "https://chaoshi.m.tmall.com/"
	            },
	            {
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
	            },
	            {
	              "leftImg": "https://gw.alicdn.com/tps/TB1OUnILVXXXXcoXFXXXXXXXXXX-374-416.jpg",
	              "leftUrl": "https://chaoshi.m.tmall.com/",
	              "rightImg": "https://gw.alicdn.com/tps/TB1OUnILVXXXXcoXFXXXXXXXXXX-374-416.jpg",
	              "rightUrl": "https://chaoshi.m.tmall.com/"
	            }]
	          }
	        }
	        self.simLoadingData(this.cnt++)
	      },
	      _initEnv: function () {
	          var self = this;
	          var config = self.$getConfig(function () {
	                  }) || {};
	          self._app.IS_H5 = typeof window === 'object';
	          self._app.IS_TEST = config.bundleUrl ? config.bundleUrl.indexOf('wh_test') > -1 : false;
	          self._app.OS = config.os;
	          self._app.PLATFORM = config.platform;
	          var title = '新风尚主会场';
	          self._app.config = {
	              title: title,
	              pageName: '2016-xfs-main'
	          };
	      },
	      _initUtil: function () {
	          var self = this;
	          var app = self._app || {};
	          app.Util = {
	              randomInt: function (min, max) {
	                  return Math.round(Math.random() * (max - min)) + min;
	              },
	              randomItemFromArr: function (arr) {
	                  if (!arr) return;
	                  return arr[self._app.Util.randomInt(0, arr.length - 1)];
	              },
	              httpurl: function (url) {
	                  var params = {};

	                  Object.defineProperty(this, 'params', {
	                      set: function (v) {
	                          if (typeof v === 'object') {
	                              for (var p in params) {
	                                  delete params[p];
	                              }
	                              for (var p in v) {
	                                  params[p] = v[p];
	                              }
	                          }
	                      },
	                      get: function () {
	                          return params;
	                      },
	                      enumerable: true
	                  });

	                  Object.defineProperty(this, 'search', {
	                      set: function (v) {
	                          if (typeof v === 'string') {
	                              if (v.indexOf('?') === 0) {
	                                  v = v.substr(1);
	                              }
	                              var search = v.split('&');
	                              for (var p in params) {
	                                  delete params[p];
	                              }
	                              for (var i = 0; i < search.length; i++) {
	                                  var pair = search[i].split('=');
	                                  if (pair[0]) {
	                                      try {
	                                          params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
	                                      } catch (e) {
	                                          params[pair[0]] = pair[1] || '';
	                                      }
	                                  }
	                              }
	                          }
	                      },
	                      get: function () {
	                          var search = [];
	                          for (var p in params) {
	                              if (params[p]) {
	                                  try {
	                                      search.push(encodeURIComponent(p) + '=' + encodeURIComponent(params[p]));
	                                  } catch (e) {
	                                      search.push(p + '=' + params[p]);
	                                  }
	                              } else {
	                                  try {
	                                      search.push(encodeURIComponent(p));
	                                  } catch (e) {
	                                      search.push(p);
	                                  }
	                              }
	                          }
	                          if (search.length) {
	                              return '?' + search.join('&');
	                          } else {
	                              return '';
	                          }
	                      },
	                      enumerable: true
	                  });

	                  var hash;
	                  Object.defineProperty(this, 'hash', {
	                      set: function (v) {
	                          if (typeof v === 'string') {
	                              if (v && v.indexOf('#') < 0) {
	                                  v = '#' + v;
	                              }
	                              hash = v || '';
	                          }
	                      },
	                      get: function () {
	                          return hash;
	                      },
	                      enumerable: true
	                  });

	                  this.set = function (v) {
	                      var matchArr;
	                      if ((matchArr = v.match(new RegExp('^([a-z0-9-]+\:)?' +    //protocol
	                                      '[/]{2}' +                            //slash x 2
	                                      '(?:([^@/:\?]+)(?::([^@/:]+))?@)?' +  //username:password@
	                                      '([^:/?#]+)' +                        //hostname
	                                      '(?:[:]([0-9]+))?' +                  //port
	                                      '([/][^?#;]*)?' +                     //pathname
	                                      '(?:[?]([^?#]*))?' +                  //search
	                                      '(#[^#]*)?$'                          //hash
	                                      , 'i')))) {
	                          this.protocol = matchArr[1] || '';
	                          this.username = matchArr[2] || '';
	                          this.password = matchArr[3] || '';
	                          this.hostname = this.host = matchArr[4];
	                          this.port = matchArr[5] || '';
	                          this.pathname = matchArr[6] || '/';
	                          this.search = matchArr[7] || '';
	                          this.hash = matchArr[8] || '';
	                          this.origin = this.protocol + '//' + this.hostname;
	                      } else {
	                          throw new Error('Wrong uri scheme.');
	                      }
	                  };

	                  this.toString = function () {
	                      var string = this.protocol + '//';
	                      if (this.username) {
	                          string += this.username;
	                          if (this.password) {
	                              string += ':' + this.password;
	                          }
	                          string += '@';
	                      }
	                      string += this.host;
	                      if (this.port && this.port !== '80') {
	                          string += ':' + this.port;
	                      }
	                      if (this.pathname) {
	                          string += this.pathname;
	                      }
	                      if (this.search) {
	                          string += this.search;
	                      }
	                      if (this.hash) {
	                          string += this.hash;
	                      }
	                      return string;
	                  };

	                  this.set(url.toString());
	              }

	          }
	      },
	      handleRefresh: function (e) {
	        var vm = this
	        vm.displayRefresh = 'show'
	        var timer = __weex_require__('@weex-module/timer')
	        if (timer) {
	          timer.setTimeout(function () {
	            vm.displayRefresh = 'hide'
	          }, 2000)
	        } else {
	          this.$call('modal', 'alert',  {
	            message: 'refreshing.'
	          }, function () {
	            vm.displayRefresh = 'hide'
	          })
	        }
	      },
	      handleLoading: function (e) {
	        var vm = this
	        vm.displayLoading = 'show'
	        this.$call('modal', 'toast', {
	          message: 'loading.'
	        })
	        var timer = __weex_require__('@weex-module/timer')
	        if (timer) {
	          timer.setTimeout(function () {
	            vm.simLoadingData(vm.cnt++)
	            vm.displayLoading = 'hide'
	          }, 2000)
	        } else {
	          vm.simLoadingData(vm.cnt++)
	          vm.displayLoading = 'hide'
	        }
	      },
	      simLoadingData: function (num) {
	        if (num >= 3) {
	          this.$call('modal', 'toast', {
	            message: '已到底部'
	          })
	          return
	        }
	        this['show' + num] = true
	      }
	    }
	  };

	;__weex_module__.exports.template={
	  "type": "wxc-navpage",
	  "attr": {
	    "dataRole": "none",
	    "height": function () {return this.navBarHeight},
	    "backgroundColor": "#ff5898",
	    "title": "新风尚会场",
	    "titleColor": "white",
	    "rightItemSrc": "http://gtms02.alicdn.com/tps/i2/TB1ED7iMpXXXXXEXXXXWA_BHXXX-48-48.png"
	  },
	  "children": [
	    {
	      "type": "scroller",
	      "classList": [
	        "content"
	      ],
	      "children": [
	        {
	          "type": "refresh",
	          "classList": [
	            "refresh"
	          ],
	          "events": {
	            "refresh": "handleRefresh"
	          },
	          "attr": {
	            "display": function () {return this.displayRefresh}
	          },
	          "style": {
	            "flexDirection": "row"
	          },
	          "children": [
	            {
	              "type": "loading-indicator"
	            },
	            {
	              "type": "text",
	              "style": {
	                "marginLeft": 36,
	                "color": "#eeeeee"
	              },
	              "attr": {
	                "value": "下拉刷新..."
	              }
	            }
	          ]
	        },
	        {
	          "type": "headlines",
	          "shown": function () {return this.show0},
	          "attr": {
	            "ds": function () {return this.showData.header}
	          },
	          "append": "tree"
	        },
	        {
	          "type": "category",
	          "shown": function () {return this.show0},
	          "attr": {
	            "ds": function () {return this.showData.category}
	          },
	          "append": "tree"
	        },
	        {
	          "type": "coupon",
	          "shown": function () {return this.show1},
	          "attr": {
	            "ds": function () {return this.showData.coupon}
	          },
	          "append": "tree"
	        },
	        {
	          "type": "goods",
	          "shown": function () {return this.show1},
	          "attr": {
	            "ds": function () {return this.showData.goods}
	          },
	          "append": "tree"
	        },
	        {
	          "type": "resource",
	          "shown": function () {return this.show1},
	          "attr": {
	            "ds": function () {return this.showData.resource}
	          },
	          "append": "tree"
	        },
	        {
	          "type": "scene",
	          "shown": function () {return this.show1},
	          "attr": {
	            "ds": function () {return this.showData.scene}
	          },
	          "append": "tree"
	        },
	        {
	          "type": "match",
	          "shown": function () {return this.show2},
	          "attr": {
	            "ds": function () {return this.showData.match}
	          },
	          "append": "tree"
	        },
	        {
	          "type": "brand",
	          "shown": function () {return this.show2},
	          "attr": {
	            "ds": function () {return this.showData.brand}
	          },
	          "append": "tree"
	        },
	        {
	          "type": "loading",
	          "classList": [
	            "loading"
	          ],
	          "events": {
	            "loading": "handleLoading"
	          },
	          "attr": {
	            "display": function () {return this.displayLoading}
	          },
	          "children": [
	            {
	              "type": "text",
	              "style": {
	                "color": "#eeeeee"
	              },
	              "attr": {
	                "value": "加载更多..."
	              }
	            }
	          ]
	        }
	      ]
	    }
	  ]
	}
	;__weex_module__.exports.style={
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
	    "display": "flex",
	    "alignItems": "center",
	    "justifyContent": "center"
	  },
	  "loading": {
	    "display": "flex",
	    "alignItems": "center",
	    "justifyContent": "center"
	  }
	}
	})
	;__weex_bootstrap__("@weex-component/73b44713db2eae6d536291fb7cc654e4", {
	  "transformerVersion": "0.3.1"
	},undefined)

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	;__weex_define__("@weex-component/index", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	  __webpack_require__(2);
	  __webpack_require__(3);
	  __webpack_require__(4);
	  __webpack_require__(5);
	  __webpack_require__(6);
	  __webpack_require__(7);
	  __webpack_require__(8);
	  __webpack_require__(9);
	  __webpack_require__(10);
	  __webpack_require__(11);
	  __webpack_require__(12);

	})

/***/ },
/* 2 */
/***/ function(module, exports) {

	;__weex_define__("@weex-component/wxc-button", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	  __weex_module__.exports = {
	    data: function () {return {
	      type: 'default',
	      size: 'large',
	      value: ''
	    }},
	    methods: {
	    }
	  }

	;__weex_module__.exports.template={
	  "type": "div",
	  "classList": function () {return ['btn', 'btn-' + (this.type), 'btn-sz-' + (this.size)]},
	  "children": [
	    {
	      "type": "text",
	      "classList": function () {return ['btn-txt', 'btn-txt-' + (this.type), 'btn-txt-sz-' + (this.size)]},
	      "attr": {
	        "value": function () {return this.value}
	      }
	    }
	  ]
	}
	;__weex_module__.exports.style={
	  "btn": {
	    "marginBottom": 0,
	    "alignItems": "center",
	    "justifyContent": "center",
	    "borderWidth": 1,
	    "borderStyle": "solid",
	    "borderColor": "#333333"
	  },
	  "btn-default": {
	    "color": "rgb(51,51,51)"
	  },
	  "btn-primary": {
	    "backgroundColor": "rgb(40,96,144)",
	    "borderColor": "rgb(40,96,144)"
	  },
	  "btn-success": {
	    "backgroundColor": "rgb(92,184,92)",
	    "borderColor": "rgb(76,174,76)"
	  },
	  "btn-info": {
	    "backgroundColor": "rgb(91,192,222)",
	    "borderColor": "rgb(70,184,218)"
	  },
	  "btn-warning": {
	    "backgroundColor": "rgb(240,173,78)",
	    "borderColor": "rgb(238,162,54)"
	  },
	  "btn-danger": {
	    "backgroundColor": "rgb(217,83,79)",
	    "borderColor": "rgb(212,63,58)"
	  },
	  "btn-link": {
	    "borderColor": "rgba(0,0,0,0)",
	    "borderRadius": 0
	  },
	  "btn-txt-default": {
	    "color": "rgb(51,51,51)"
	  },
	  "btn-txt-primary": {
	    "color": "rgb(255,255,255)"
	  },
	  "btn-txt-success": {
	    "color": "rgb(255,255,255)"
	  },
	  "btn-txt-info": {
	    "color": "rgb(255,255,255)"
	  },
	  "btn-txt-warning": {
	    "color": "rgb(255,255,255)"
	  },
	  "btn-txt-danger": {
	    "color": "rgb(255,255,255)"
	  },
	  "btn-txt-link": {
	    "color": "rgb(51,122,183)"
	  },
	  "btn-sz-large": {
	    "width": 300,
	    "height": 100,
	    "paddingTop": 25,
	    "paddingBottom": 25,
	    "paddingLeft": 40,
	    "paddingRight": 40,
	    "borderRadius": 15
	  },
	  "btn-sz-middle": {
	    "width": 240,
	    "height": 80,
	    "paddingTop": 15,
	    "paddingBottom": 15,
	    "paddingLeft": 30,
	    "paddingRight": 30,
	    "borderRadius": 10
	  },
	  "btn-sz-small": {
	    "width": 170,
	    "height": 60,
	    "paddingTop": 12,
	    "paddingBottom": 12,
	    "paddingLeft": 25,
	    "paddingRight": 25,
	    "borderRadius": 7
	  },
	  "btn-txt-sz-large": {
	    "fontSize": 45
	  },
	  "btn-txt-sz-middle": {
	    "fontSize": 35
	  },
	  "btn-txt-sz-small": {
	    "fontSize": 30
	  }
	}
	})

/***/ },
/* 3 */
/***/ function(module, exports) {

	;__weex_define__("@weex-component/wxc-hn", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	  __weex_module__.exports = {
	    data: function () {return {
	      level: 1,
	      value: ''
	    }},
	    methods: {}
	  }

	;__weex_module__.exports.template={
	  "type": "div",
	  "classList": function () {return ['h' + (this.level)]},
	  "style": {
	    "justifyContent": "center"
	  },
	  "children": [
	    {
	      "type": "text",
	      "classList": function () {return ['txt-h' + (this.level)]},
	      "attr": {
	        "value": function () {return this.value}
	      }
	    }
	  ]
	}
	;__weex_module__.exports.style={
	  "h1": {
	    "height": 110,
	    "paddingTop": 20,
	    "paddingBottom": 20
	  },
	  "h2": {
	    "height": 110,
	    "paddingTop": 20,
	    "paddingBottom": 20
	  },
	  "h3": {
	    "height": 110,
	    "paddingTop": 20,
	    "paddingBottom": 20
	  },
	  "txt-h1": {
	    "fontSize": 70
	  },
	  "txt-h2": {
	    "fontSize": 52
	  },
	  "txt-h3": {
	    "fontSize": 42
	  }
	}
	})

/***/ },
/* 4 */
/***/ function(module, exports) {

	;__weex_define__("@weex-component/wxc-list-item", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	  __weex_module__.exports = {
	    data: function () {return {
	      bgColor: '#ffffff'
	    }},
	    methods: {
	      touchstart: function() {
	        // FIXME android touch
	        // TODO adaptive opposite bgColor
	//        this.bgColor = '#e6e6e6';
	      },
	      touchend: function() {
	        // FIXME android touchend not triggered
	//        this.bgColor = '#ffffff';
	      }
	    }
	  }

	;__weex_module__.exports.template={
	  "type": "div",
	  "classList": [
	    "item"
	  ],
	  "events": {
	    "touchstart": "touchstart",
	    "touchend": "touchend"
	  },
	  "style": {
	    "backgroundColor": function () {return this.bgColor}
	  },
	  "children": [
	    {
	      "type": "content"
	    }
	  ]
	}
	;__weex_module__.exports.style={
	  "item": {
	    "paddingTop": 25,
	    "paddingBottom": 25,
	    "paddingLeft": 35,
	    "paddingRight": 35,
	    "height": 160,
	    "justifyContent": "center",
	    "borderBottomWidth": 1,
	    "borderColor": "#dddddd"
	  }
	}
	})

/***/ },
/* 5 */
/***/ function(module, exports) {

	;__weex_define__("@weex-component/wxc-panel", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	  __weex_module__.exports = {
	    data: function () {return {
	      type: 'default',
	      title: '',
	      paddingBody: 20,
	      paddingHead: 20,
	      dataClass: '', // FIXME transfer class
	      border: 0
	    }},
	    ready: function() {
	    }
	  }

	;__weex_module__.exports.template={
	  "type": "div",
	  "classList": function () {return ['panel', 'panel-' + (this.type)]},
	  "style": {
	    "borderWidth": function () {return this.border}
	  },
	  "children": [
	    {
	      "type": "text",
	      "classList": function () {return ['panel-header', 'panel-header-' + (this.type)]},
	      "style": {
	        "paddingTop": function () {return this.paddingHead},
	        "paddingBottom": function () {return this.paddingHead},
	        "paddingLeft": function () {return this.paddingHead*1.5},
	        "paddingRight": function () {return this.paddingHead*1.5}
	      },
	      "attr": {
	        "value": function () {return this.title}
	      }
	    },
	    {
	      "type": "div",
	      "classList": function () {return ['panel-body', 'panel-body-' + (this.type)]},
	      "style": {
	        "paddingTop": function () {return this.paddingBody},
	        "paddingBottom": function () {return this.paddingBody},
	        "paddingLeft": function () {return this.paddingBody*1.5},
	        "paddingRight": function () {return this.paddingBody*1.5}
	      },
	      "children": [
	        {
	          "type": "content"
	        }
	      ]
	    }
	  ]
	}
	;__weex_module__.exports.style={
	  "panel": {
	    "marginBottom": 20,
	    "backgroundColor": "#ffffff",
	    "borderColor": "#dddddd",
	    "borderWidth": 1
	  },
	  "panel-primary": {
	    "borderColor": "rgb(40,96,144)"
	  },
	  "panel-success": {
	    "borderColor": "rgb(76,174,76)"
	  },
	  "panel-info": {
	    "borderColor": "rgb(70,184,218)"
	  },
	  "panel-warning": {
	    "borderColor": "rgb(238,162,54)"
	  },
	  "panel-danger": {
	    "borderColor": "rgb(212,63,58)"
	  },
	  "panel-header": {
	    "backgroundColor": "#f5f5f5",
	    "fontSize": 40,
	    "color": "#333333"
	  },
	  "panel-header-primary": {
	    "backgroundColor": "rgb(40,96,144)",
	    "color": "#ffffff"
	  },
	  "panel-header-success": {
	    "backgroundColor": "rgb(92,184,92)",
	    "color": "#ffffff"
	  },
	  "panel-header-info": {
	    "backgroundColor": "rgb(91,192,222)",
	    "color": "#ffffff"
	  },
	  "panel-header-warning": {
	    "backgroundColor": "rgb(240,173,78)",
	    "color": "#ffffff"
	  },
	  "panel-header-danger": {
	    "backgroundColor": "rgb(217,83,79)",
	    "color": "#ffffff"
	  },
	  "panel-body": {}
	}
	})

/***/ },
/* 6 */
/***/ function(module, exports) {

	;__weex_define__("@weex-component/wxc-tip", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	  __weex_module__.exports = {
	    data: function () {return {
	      type: 'success',
	      value: ''
	    }}
	  }

	;__weex_module__.exports.template={
	  "type": "div",
	  "classList": function () {return ['tip', 'tip-' + (this.type)]},
	  "children": [
	    {
	      "type": "text",
	      "classList": function () {return ['tip-txt', 'tip-txt-' + (this.type)]},
	      "attr": {
	        "value": function () {return this.value}
	      }
	    }
	  ]
	}
	;__weex_module__.exports.style={
	  "tip": {
	    "paddingLeft": 36,
	    "paddingRight": 36,
	    "paddingTop": 36,
	    "paddingBottom": 36,
	    "borderRadius": 10
	  },
	  "tip-txt": {
	    "fontSize": 28
	  },
	  "tip-success": {
	    "backgroundColor": "#dff0d8",
	    "borderColor": "#d6e9c6"
	  },
	  "tip-txt-success": {
	    "color": "#3c763d"
	  },
	  "tip-info": {
	    "backgroundColor": "#d9edf7",
	    "borderColor": "#bce8f1"
	  },
	  "tip-txt-info": {
	    "color": "#31708f"
	  },
	  "tip-warning": {
	    "backgroundColor": "#fcf8e3",
	    "borderColor": "#faebcc"
	  },
	  "tip-txt-warning": {
	    "color": "#8a6d3b"
	  },
	  "tip-danger": {
	    "backgroundColor": "#f2dede",
	    "borderColor": "#ebccd1"
	  },
	  "tip-txt-danger": {
	    "color": "#a94442"
	  }
	}
	})

/***/ },
/* 7 */
/***/ function(module, exports) {

	;__weex_define__("@weex-component/wxc-countdown", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	__weex_module__.exports = {
	    data: function () {return {
	        now: 0,
	        remain: 0,
	        time: {
	            elapse: 0,
	            D: '0',
	            DD: '0',
	            h: '0',
	            hh: '00',
	            H: '0',
	            HH: '0',
	            m: '0',
	            mm: '00',
	            M: '0',
	            MM: '0',
	            s: '0',
	            ss: '00',
	            S: '0',
	            SS: '0'
	        },
	        outofview: false
	    }},
	    ready: function() {
	        if (this.remain <= 0) {
	            return;
	        }
	        // this.isWeb = this.$getConfig().env.platform === 'Web';
	        this.now = Date.now();
	        this.nextTick();
	    },
	    methods: {
	        nextTick: function() {
	            if (this.outofview) {
	                setTimeout(this.nextTick.bind(this), 1000);
	            } else {
	                this.time.elapse = parseInt((Date.now() - this.now) / 1000);

	                if (this.calc()) {
	                    this.$emit('tick', Object.assign({}, this.time));
	                    setTimeout(this.nextTick.bind(this), 1000);
	                } else {
	                    this.$emit('alarm', Object.assign({}, this.time));
	                }
	                this._app.updateActions(); 
	            }
	        },
	        format: function(str) {
	            if (str.length >= 2) {
	                return str;
	            } else {
	                return '0' + str;
	            }
	        },
	        calc: function() {
	            var remain = this.remain - this.time.elapse;
	            if (remain < 0) {
	                remain = 0;
	            }
	            this.time.D = String(parseInt(remain / 86400));
	            this.time.DD = this.format(this.time.D);
	            this.time.h = String(parseInt((remain - parseInt(this.time.D) * 86400) / 3600));
	            this.time.hh = this.format(this.time.h);
	            this.time.H = String(parseInt(remain / 3600));
	            this.time.HH = this.format(this.time.H);
	            this.time.m = String(parseInt((remain - parseInt(this.time.H) * 3600) / 60));
	            this.time.mm = this.format(this.time.m);
	            this.time.M = String(parseInt(remain / 60));
	            this.time.MM = this.format(this.time.M);
	            this.time.s = String(remain - parseInt(this.time.M) * 60);
	            this.time.ss = this.format(this.time.s);
	            this.time.S = String(remain);
	            this.time.SS = this.format(this.time.S);
	            // console.log(remain, this.D, this.h, this.hh, this.H, this.HH, this.m, this.MM, this.s, this.ss, this.S, this.SS);
	            return remain > 0;
	        },
	        appeared: function() {
	            this.outofview = false;
	        },
	        disappeared: function() {
	            this.outofview = true;
	        }
	    }
	}

	;__weex_module__.exports.template={
	  "type": "div",
	  "style": {
	    "overflow": "hidden",
	    "flexDirection": "row"
	  },
	  "events": {
	    "appear": "appeared",
	    "disappear": "disappeared"
	  },
	  "children": [
	    {
	      "type": "content"
	    }
	  ]
	}
	;__weex_module__.exports.style={
	  "wrap": {
	    "overflow": "hidden"
	  }
	}
	})

/***/ },
/* 8 */
/***/ function(module, exports) {

	;__weex_define__("@weex-component/wxc-marquee", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	__weex_module__.exports = {
	    data: function () {return {
	        step: 0,
	        count: 0,
	        index: 1,
	        duration: 0,
	        interval: 0,
	        outofview: false
	    }},
	    ready: function () {
	        if (this.interval > 0
	                && this.step > 0
	                && this.duration > 0) {
	            this.nextTick();    
	        }
	    },
	    methods: {
	        nextTick: function() {
	            var self = this;
	            if (this.outofview) {
	                setTimeout(self.nextTick.bind(self), self.interval);
	            } else {
	                setTimeout(function() {
	                    self.animation(self.nextTick.bind(self));
	                }, self.interval);
	            }
	        },
	        animation: function(cb) {
	            var self = this;
	            var offset = -self.step * self.index;
	            var $animation = __weex_require__('@weex-module/animation');
	            $animation.transition(this.$el('anim'), {
	              styles: {
	                transform: 'translateY(' + String(offset) + 'px) translateZ(0)'
	              },
	              timingFunction: 'ease',
	              duration: self.duration
	            }, function() {
	                self.index = (self.index + 1) % (self.count);
	                self.$emit('change', {
	                    index: self.index,
	                    count: self.count
	                });
	                cb && cb();
	            });
	        },
	        appeared: function() {
	            this.outofview = false;
	        },
	        disappeared: function() {
	            this.outofview = true;
	        }
	    }
	}

	;__weex_module__.exports.template={
	  "type": "div",
	  "classList": [
	    "wrap"
	  ],
	  "events": {
	    "appear": "appeared",
	    "disappear": "disappeared"
	  },
	  "children": [
	    {
	      "type": "div",
	      "id": "anim",
	      "classList": [
	        "anim"
	      ],
	      "children": [
	        {
	          "type": "content"
	        }
	      ]
	    }
	  ]
	}
	;__weex_module__.exports.style={
	  "wrap": {
	    "overflow": "hidden",
	    "position": "relative"
	  },
	  "anim": {
	    "flexDirection": "column",
	    "position": "absolute",
	    "transform": "translateY(0) translateZ(0)"
	  }
	}
	})

/***/ },
/* 9 */
/***/ function(module, exports) {

	;__weex_define__("@weex-component/wxc-navbar", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	    __weex_module__.exports = {
	        data: function () {return {
	          dataRole: 'navbar',

	          //导航条背景色
	          backgroundColor: 'black',

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

	;__weex_module__.exports.template={
	  "type": "div",
	  "classList": [
	    "container"
	  ],
	  "style": {
	    "height": function () {return this.height},
	    "backgroundColor": function () {return this.backgroundColor}
	  },
	  "attr": {
	    "dataRole": function () {return this.dataRole}
	  },
	  "children": [
	    {
	      "type": "text",
	      "classList": [
	        "right-text"
	      ],
	      "style": {
	        "color": function () {return this.rightItemColor}
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
	      "classList": [
	        "right-image"
	      ],
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
	      "classList": [
	        "left-text"
	      ],
	      "style": {
	        "color": function () {return this.leftItemColor}
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
	      "classList": [
	        "left-image"
	      ],
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
	        "center-text"
	      ],
	      "style": {
	        "color": function () {return this.titleColor}
	      },
	      "attr": {
	        "naviItemPosition": "center",
	        "value": function () {return this.title}
	      }
	    }
	  ]
	}
	;__weex_module__.exports.style={
	  "container": {
	    "flexDirection": "row",
	    "position": "fixed",
	    "top": 0,
	    "left": 0,
	    "right": 0,
	    "width": 750
	  },
	  "right-text": {
	    "position": "absolute",
	    "bottom": 28,
	    "right": 32,
	    "textAlign": "right",
	    "fontSize": 32,
	    "fontFamily": "'Open Sans', sans-serif"
	  },
	  "left-text": {
	    "position": "absolute",
	    "bottom": 28,
	    "left": 32,
	    "textAlign": "left",
	    "fontSize": 32,
	    "fontFamily": "'Open Sans', sans-serif"
	  },
	  "center-text": {
	    "position": "absolute",
	    "bottom": 25,
	    "left": 172,
	    "right": 172,
	    "textAlign": "center",
	    "fontSize": 36,
	    "fontWeight": "bold"
	  },
	  "left-image": {
	    "position": "absolute",
	    "bottom": 20,
	    "left": 28,
	    "width": 50,
	    "height": 50
	  },
	  "right-image": {
	    "position": "absolute",
	    "bottom": 20,
	    "right": 28,
	    "width": 50,
	    "height": 50
	  }
	}
	})

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	;__weex_define__("@weex-component/wxc-navpage", [], function(__weex_require__, __weex_exports__, __weex_module__){
	__webpack_require__(9);

	;__weex_module__.exports.template={
	  "type": "div",
	  "classList": [
	    "wrapper"
	  ],
	  "children": [
	    {
	      "type": "wxc-navbar",
	      "attr": {
	        "dataRole": function () {return this.dataRole},
	        "height": function () {return this.height},
	        "backgroundColor": function () {return this.backgroundColor},
	        "title": function () {return this.title},
	        "titleColor": function () {return this.titleColor},
	        "leftItemSrc": function () {return this.leftItemSrc},
	        "leftItemTitle": function () {return this.leftItemTitle},
	        "leftItemColor": function () {return this.leftItemColor},
	        "rightItemSrc": function () {return this.rightItemSrc},
	        "rightItemTitle": function () {return this.rightItemTitle},
	        "rightItemColor": function () {return this.rightItemColor}
	      }
	    },
	    {
	      "type": "div",
	      "classList": [
	        "wrapper"
	      ],
	      "style": {
	        "marginTop": function () {return this.height}
	      },
	      "children": [
	        {
	          "type": "content"
	        }
	      ]
	    }
	  ]
	}
	;__weex_module__.exports.style={
	  "wrapper": {
	    "position": "absolute",
	    "top": 0,
	    "left": 0,
	    "right": 0,
	    "bottom": 0,
	    "width": 750
	  }
	}
	})

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	;__weex_define__("@weex-component/wxc-tabbar", [], function(__weex_require__, __weex_exports__, __weex_module__){
	__webpack_require__(12);

	;
	    __weex_module__.exports = {
	        data: function () {return {
	          tabItems: [ ],
	          selectedIndex: 0,
	          selectedColor: '#ff0000',
	          unselectedColor: '#000000',
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
	                  tabItem.visibility = 'visible';
	                }
	                else {
	                  tabItem.icon = tabItem.image;
	                  tabItem.titleColor = this.unselectedColor;
	                  tabItem.visibility = 'hidden';
	                }
	              }
	            },  
	        }
	    }

	;__weex_module__.exports.template={
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
	          "type": "wxc-tabitem",
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
	}
	;__weex_module__.exports.style={
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
	}
	})

/***/ },
/* 12 */
/***/ function(module, exports) {

	;__weex_define__("@weex-component/wxc-tabitem", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	    __weex_module__.exports = {
	        data: function () {return {
	          index: 0,
	          title: '',
	          titleColor: '#000000',
	          icon: '',
	          backgroundColor: '#ffffff',
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

	;__weex_module__.exports.template={
	  "type": "div",
	  "classList": [
	    "container"
	  ],
	  "style": {
	    "backgroundColor": function () {return this.backgroundColor}
	  },
	  "events": {
	    "click": "onclickitem"
	  },
	  "children": [
	    {
	      "type": "image",
	      "classList": [
	        "top-line"
	      ],
	      "attr": {
	        "src": "http://gtms03.alicdn.com/tps/i3/TB1mdsiMpXXXXXpXXXXNw4JIXXX-640-4.png"
	      }
	    },
	    {
	      "type": "image",
	      "classList": [
	        "tab-icon"
	      ],
	      "attr": {
	        "src": function () {return this.icon}
	      }
	    },
	    {
	      "type": "text",
	      "classList": [
	        "tab-text"
	      ],
	      "style": {
	        "color": function () {return this.titleColor}
	      },
	      "attr": {
	        "value": function () {return this.title}
	      }
	    }
	  ]
	}
	;__weex_module__.exports.style={
	  "container": {
	    "flex": 1,
	    "flexDirection": "column",
	    "alignItems": "center",
	    "justifyContent": "center",
	    "height": 88
	  },
	  "top-line": {
	    "position": "absolute",
	    "top": 0,
	    "left": 0,
	    "right": 0,
	    "height": 2
	  },
	  "tab-icon": {
	    "marginTop": 5,
	    "width": 40,
	    "height": 40
	  },
	  "tab-text": {
	    "marginTop": 5,
	    "textAlign": "center",
	    "fontSize": 20
	  }
	}
	})

/***/ },
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */
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
/* 18 */
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
/* 19 */
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

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	;__weex_define__("@weex-component/headlines", [], function(__weex_require__, __weex_exports__, __weex_module__){
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

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	;__weex_define__("@weex-component/category", [], function(__weex_require__, __weex_exports__, __weex_module__){
	__webpack_require__(17);

	;
	  __weex_module__.exports = {
	    data: function () {return {
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
	    }},
	    methods: {
	      ready: function () {
	        var self = this;
	        self._loadData();
	      },

	      _loadData: function () {
	        var self = this;
	        var content = {
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
	        }
	        self._processData(content);
	        // self.$sendMtop({
	        //     api: 'mtop.taobao.aladdin.service.AldRecommendService.newFashionIndustry',
	        //     v: '1.0',
	        //     isHttps: true,
	        //     sessionOption: 'AutoLoginOnly',
	        //     timer: 3000
	        // }, function (result) {
	        //     console.log('in category load mtop data:', result)
	        //     if(typeof result==='string') result = JSON.parse(result);
	        //     var content = self.ds._backup;
	        //     if (result.data && result.data.resultValue) {
	        //         content = result.data.resultValue;
	        //     }
	        //     self._processData(content);
	        // });
	      },
	      _processData: function (content) {
	        var self = this;
	        var items = content.main;
	        var subItems = content.sub;
	        for (var j = 0; j < items.length; j++) {
	          var item = items[j];
	          item.index= j;
	          item.bannerImg = j % 2 === 0 ? item.leftBannerImg : item.rightBannerImg;
	          if(item.shopList){
	            for(var n=0;n<item.shopList.length;n++){
	              item.shopList[n].idx = n;
	            }
	          }
	        }

	        for (var i = 0; i < subItems.length; i++) {
	          var subItem = subItems[i];
	          subItem.index= i;
	          subItem.top = (i - i % 3) / 3 * (241 + 3);
	          subItem.left = i % 3 * (248 + 3);
	        }

	        self.items = items;
	        self.subItems = subItems;
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
	        "item-container"
	      ],
	      "children": [
	        {
	          "type": "container",
	          "repeat": function () {return this.items},
	          "style": {
	            "width": 750,
	            "paddingBottom": 14,
	            "backgroundColor": function () {return this.colour}
	          },
	          "children": [
	            {
	              "type": "container",
	              "children": [
	                {
	                  "type": "banner",
	                  "attr": {
	                    "width": function () {return this.NUMBER_750},
	                    "height": function () {return this.NUMBER_237},
	                    "src": function () {return this.bannerImg},
	                    "href": function () {return this.bannerUrl}
	                  }
	                }
	              ]
	            },
	            {
	              "type": "container",
	              "classList": [
	                "shop-list"
	              ],
	              "children": [
	                {
	                  "type": "container",
	                  "repeat": function () {return this.shopList},
	                  "classList": [
	                    "shop-img-container"
	                  ],
	                  "children": [
	                    {
	                      "type": "banner",
	                      "attr": {
	                        "width": function () {return this.NUMBER_186},
	                        "height": function () {return this.NUMBER_208},
	                        "src": function () {return this.picUrl},
	                        "href": function () {return this.shopUrl}
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
	      "type": "container",
	      "classList": [
	        "sub-item-container"
	      ],
	      "style": {
	        "height": function () {return Math.round(this.subItems.length/3)*(241+3)}
	      },
	      "children": [
	        {
	          "type": "container",
	          "repeat": function () {return this.subItems},
	          "classList": [
	            "sub-item"
	          ],
	          "style": {
	            "top": function () {return this.top},
	            "left": function () {return this.left}
	          },
	          "children": [
	            {
	              "type": "image",
	              "classList": [
	                "sub-item-bg"
	              ],
	              "attr": {
	                "src": function () {return this.subItemBg}
	              }
	            },
	            {
	              "type": "container",
	              "classList": [
	                "sub-item-img"
	              ],
	              "children": [
	                {
	                  "type": "banner",
	                  "attr": {
	                    "width": function () {return this.NUMBER_248},
	                    "height": function () {return this.NUMBER_155},
	                    "src": function () {return this.industryImg},
	                    "href": function () {return this.industryUrl}
	                  }
	                }
	              ]
	            },
	            {
	              "type": "container",
	              "classList": [
	                "sub-item-title"
	              ],
	              "children": [
	                {
	                  "type": "text",
	                  "classList": [
	                    "industry-title"
	                  ],
	                  "attr": {
	                    "href": function () {return this.industryUrl},
	                    "value": function () {return this.industryTitle}
	                  }
	                },
	                {
	                  "type": "text",
	                  "classList": [
	                    "industry-benefit"
	                  ],
	                  "attr": {
	                    "href": function () {return this.industryUrl},
	                    "value": function () {return this.industryBenefit}
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
	;__weex_module__.exports.style={
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
	})

/***/ },
/* 22 */
/***/ function(module, exports) {

	;__weex_define__("@weex-component/coupon", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	  var IS_WEB = typeof window !== 'undefined';
	  var IS_APP = !IS_WEB || /AliApp\((?:tb|tm)/i.test(navigator.userAgent);

	  __weex_module__.exports = {
	    data: function () {return {
	      currentStatus: '//img.alicdn.com/tps/i4/TB1cYBKMXXXXXayaXXXkxHk2pXX-750-228.jpg_q75.jpg'
	    }},
	    methods: {
	      ready: function () {
	      },
	      handleClick: function (e) {
	        this.$call('modal', 'toast', {
	            message: 'click',
	            duration: 1
	        });
	      }
	    }
	  };

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
	        "wrapper"
	      ],
	      "children": [
	        {
	          "type": "image",
	          "classList": [
	            "img"
	          ],
	          "attr": {
	            "src": function () {return this.currentStatus}
	          }
	        },
	        {
	          "type": "container",
	          "classList": [
	            "my-coupon"
	          ],
	          "events": {
	            "click": "handleClick"
	          }
	        },
	        {
	          "type": "container",
	          "classList": [
	            "guides"
	          ],
	          "events": {
	            "click": "handleClick"
	          }
	        },
	        {
	          "type": "container",
	          "classList": [
	            "lottery"
	          ],
	          "events": {
	            "click": "handleClick"
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
	})

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	;__weex_define__("@weex-component/goods", [], function(__weex_require__, __weex_exports__, __weex_module__){
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

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	;__weex_define__("@weex-component/resource", [], function(__weex_require__, __weex_exports__, __weex_module__){
	__webpack_require__(17);
	__webpack_require__(18);

	;
	  __weex_module__.exports = {
	    data: function () {return {
	      NUMBER_750: 750,
	      NUMBER_200: 200,
	      NUMBER_373: 373,
	      NUMBER_224:224,
	      NUMBER_4:4
	    }}
	  }

	;__weex_module__.exports.template={
	  "type": "container",
	  "shown": function () {return !this.ds.isHide},
	  "children": [
	    {
	      "type": "container",
	      "classList": [
	        "big-banner-container"
	      ],
	      "children": [
	        {
	          "type": "banner",
	          "attr": {
	            "width": function () {return this.NUMBER_750},
	            "height": function () {return this.NUMBER_200},
	            "src": function () {return this.ds.bigBannerImg},
	            "href": function () {return this.ds.bigBannerUrl}
	          }
	        }
	      ]
	    },
	    {
	      "type": "banners",
	      "attr": {
	        "ds": function () {return this.ds.smallBannerItems},
	        "width": function () {return this.NUMBER_373},
	        "height": function () {return this.NUMBER_224},
	        "direction": "row",
	        "space": function () {return this.NUMBER_4}
	      }
	    }
	  ]
	}
	;__weex_module__.exports.style={
	  "title": {
	    "width": 750,
	    "height": 100
	  },
	  "big-banner-container": {
	    "marginBottom": 4
	  }
	}
	})

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	;__weex_define__("@weex-component/scene", [], function(__weex_require__, __weex_exports__, __weex_module__){
	__webpack_require__(17);

	;
	  __weex_module__.exports = {
	    data: function () {return {
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
	      sceneBgs: [
	        'https://gw.alicdn.com/tps/TB1xBT8LVXXXXbYXVXXXXXXXXXX-750-340.jpg',
	        'https://gw.alicdn.com/tps/TB1RoEkLVXXXXaMXpXXXXXXXXXX-750-340.jpg',
	        'https://gw.alicdn.com/tps/TB1DiEpLVXXXXa7XXXXXXXXXXXX-750-340.jpg'
	      ]
	    }},
	    methods: {
	      ready: function () {
	        var self = this;
	        self._loadData();
	      },

	      _loadData: function () {
	        var self = this;
	        var content = [{
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
	        }]
	        self._processData(content)
	      },
	      _processData: function (content) {
	        var self = this;
	        if (!content) return;
	        var items = content.slice(0, 3);
	        var smallItems = content.slice(3);

	        var sceneBgs = self.sceneBgs;
	        for (var j = 0; j < items.length; j++) {
	          var item = items[j];
	          item.index = j;
	          item.bg = sceneBgs[j];
	          item.itemImgCls = j % 2 === 0 ? 'item-img' : 'right-item-img';
	          item.benifitImgCls = j % 2 === 0 ? 'benifit-img' : 'right-benifit-img';
	        }


	        for (var i = 0; i < smallItems.length; i++) {
	          var smallItem = smallItems[i];
	          smallItem.index = i;
	          smallItem.top = (i - i % 2) / 2 * (230 + 4);
	          smallItem.left = i % 2 * (373 + 4);
	        }
	        self.items = items;
	        self.smallItems = smallItems;
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
	        "small-item-container"
	      ],
	      "style": {
	        "height": function () {return Math.round(this.smallItems.length/2)*234}
	      },
	      "children": [
	        {
	          "type": "container",
	          "repeat": function () {return this.smallItems},
	          "classList": [
	            "small-item"
	          ],
	          "style": {
	            "top": function () {return this.top},
	            "left": function () {return this.left}
	          },
	          "children": [
	            {
	              "type": "container",
	              "children": [
	                {
	                  "type": "image",
	                  "classList": [
	                    "small-item-bg"
	                  ],
	                  "attr": {
	                    "src": function () {return this.smallItemBg}
	                  }
	                }
	              ]
	            },
	            {
	              "type": "container",
	              "classList": [
	                "small-item-img"
	              ],
	              "children": [
	                {
	                  "type": "banner",
	                  "attr": {
	                    "width": function () {return this.NUMBER_186},
	                    "height": function () {return this.NUMBER_206},
	                    "src": function () {return this.itemImg},
	                    "href": function () {return this.sceneUrl}
	                  }
	                }
	              ]
	            },
	            {
	              "type": "container",
	              "classList": [
	                "small-benifit-img"
	              ],
	              "children": [
	                {
	                  "type": "banner",
	                  "attr": {
	                    "width": function () {return this.NUMBER_170},
	                    "height": function () {return this.NUMBER_100},
	                    "src": function () {return this.benefitImg},
	                    "href": function () {return this.sceneUrl}
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
	;__weex_module__.exports.style={
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
	})

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	;__weex_define__("@weex-component/match", [], function(__weex_require__, __weex_exports__, __weex_module__){
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

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	;__weex_define__("@weex-component/brand", [], function(__weex_require__, __weex_exports__, __weex_module__){
	__webpack_require__(18);

	;
	  __weex_module__.exports = {
	    data: function () {return {
	      NUMBER_742: 742,
	      NUMBER_230: 230,
	      NUMBER_4: 4
	    }},
	    methods: {
	      ready: function () {
	        var self = this;
	        self._randomBrand();
	      },
	      _randomBrand: function () {
	        var self = this;
	        var bannerItems = self.ds.bannerItems;
	        bannerItems = bannerItems.sort(function(){
	          return Math.random()-0.5;
	        });
	        self.bannerItems =  bannerItems.slice(0,8);
	        for(var i=0;i<bannerItems.length;i++){
	          var item =  bannerItems[i];
	          if(i%2===0){
	            item.img = item.leftImg;
	            item.url = item.rightUrl;
	          }else{
	            item.img = item.rightImg;
	            item.url = item.rightUrl;
	          }
	        }
	      }
	    }
	  }

	;__weex_module__.exports.template={
	  "type": "container",
	  "classList": [
	    "container"
	  ],
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
	      "style": {
	        "marginLeft": 4,
	        "marginRight": 4
	      },
	      "children": [
	        {
	          "type": "banners",
	          "attr": {
	            "ds": function () {return this.bannerItems},
	            "direction": "column",
	            "width": function () {return this.NUMBER_742},
	            "height": function () {return this.NUMBER_230},
	            "space": function () {return this.NUMBER_4}
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
	  "container": {
	    "marginBottom": 4,
	    "backgroundColor": "#C0BABC"
	  }
	}
	})

/***/ }
/******/ ]);