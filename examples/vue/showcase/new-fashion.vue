<template>
  <scroller class="content">
    <refresh class="refresh" @refresh="handleRefresh" :display="displayRefresh"
      style="flex-direction:row;">
      <loading-indicator></loading-indicator>
      <text style="margin-left:36px;color:#eee;">下拉刷新...</text>
    </refresh>
    <headlines v-if="show0" :ds="showData.header"></headlines>
    <category v-if="show0" :ds="showData.category"></category>
    <coupon v-if="show1" :ds="showData.coupon"></coupon>
    <goods v-if="show1" :ds="showData.goods"></goods>
    <resource v-if="show1" :ds="showData.resource"></resource>
    <scene v-if="show1" :ds="showData.scene"></scene>
    <match v-if="show2" :ds="showData.match"></match>
    <brand v-if="show2" :ds="showData.brand"></brand>
    <loading class="loading" @loading="handleLoading" :display="displayLoading">
      <text style="color:#eee;">加载更多...</text>
    </loading>
  </scroller>
</template>

<style>
  .content {
    color: #353535;
    background-color: #666;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .refresh {
    align-items: center;
    justify-content: center;
  }
  .loading {
    align-items: center;
    justify-content: center;
  }
</style>

<script>
  var modal = require('@weex-module/modal')
  var timer = require('@weex-module/timer')

  module.exports = {
    components: {
      headlines: require('./include/headlines.vue'),
      category: require('./include/category.vue'),
      coupon: require('./include/coupon.vue'),
      goods: require('./include/goods.vue'),
      resource: require('./include/resource.vue'),
      scene: require('./include/scene.vue'),
      match: require('./include/match.vue'),
      brand: require('./include/brand.vue')
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
    created: function () {
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
      this.simLoadingData(this.cnt++)
    },
    methods: {
      handleRefresh: function (e) {
        var vm = this
        vm.displayRefresh = 'show'
        if (timer) {
          timer.setTimeout(function () {
            vm.displayRefresh = 'hide'
          }, 2000)
        } else {
          modal.alert({
            message: 'refreshing.'
          }, function () {
            vm.displayRefresh = 'hide'
          })
        }
      },
      handleLoading: function (e) {
        var vm = this
        vm.displayLoading = 'show'
        modal.toast({
          message: 'loading.'
        })
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
          modal.toast({
            message: '已到底部'
          })
          return
        }
        this['show' + num] = true
      }
    }
  };
</script>
