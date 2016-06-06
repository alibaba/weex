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

	;__weex_define__("@weex-component/4fb98209eb251d741375c33c6b8370f2", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	  __weex_module__.exports = {
	    data: function () {return {
	      navBarHeight: 88,
	      actionStatus: "none",
	      Column_Data_Storage: [
	        {itemId: 'id0101', textValue: '点击后写数据', fontSize:30,eventName:'mutiSet',parentName:'Column_Data_Storage'},
	        {itemId: 'id0102', textValue: '点击后读数据', fontSize:30,eventName:'mutiGet',parentName:'Column_Data_Storage'},
	        {itemId: 'id0103', textValue: '点击后删数据', fontSize:30,eventName:'clear',parentName:'Column_Data_Storage'},
	      ],
	      Column_Navigator:[
	        {itemId: 'id0201', textValue: '点击后跳转:push', width: 400, height: 30 ,fontSize:40,eventName:'push',parentName:'Column_Navigator'},
	        {itemId: 'id0202', textValue: '点击后回退:pop', width: 400, fontSize:40,eventName:'pop',parentName:'Column_Navigator'},
	      ],
	      Column_NaviBar:[
	        {itemId: 'id0301', textValue: '点击后设置Title：setNaviBarTitle', width: 400, fontSize:40,eventName:'setNaviBarTitle',parentName:'Column_NaviBar'},
	        {itemId: 'id0302', textValue: '点击后隐藏Title：clearNaviBarTitle', width: 400, fontSize:40,eventName:'clearNaviBarTitle',parentName:'Column_NaviBar'},
	        {itemId: 'id0305', textValue: '点击后设置右侧按钮：setNaviBarRightItem', width: 400, fontSize:40,eventName:'setNaviBarRightItem',parentName:'Column_NaviBar'},
	        {itemId: 'id0405', textValue: '点击后隐藏右侧按钮：clearNaviBarRightItem', width: 400, fontSize:40,eventName:'clearNaviBarRightItem',parentName:'Column_NaviBar'},
	        {itemId: 'id0505', textValue: '点击后设置左侧按钮：setNavBarLeftItem', width: 400, fontSize:40,eventName:'setNavBarLeftItem',parentName:'Column_NaviBar'},
	        {itemId: 'id0605', textValue: '点击后隐藏左侧按钮：clearNavBarLeftItem', width: 400, fontSize:40,eventName:'clearNavBarLeftItem',parentName:'Column_NaviBar'},
	      ],
	      appConfig:'',
	    }},
	    methods: {
	      /**
	      *  view LifeCycle
	      */

	      onclickRightItem: function (e) {
	        nativeLog("onclickRightBtn");
	      },

	      ready: function (e) {
	                        // config
	        this.$getConfig(function (config) {
	            this.appConfig = config;
	        }.bind(this));

	        nativeLog("TC_App_Frm ready");
	        this.$getConfig(function (config) {
	          var env = config.env;
	          if(env.platform == 'iOS'){
	            var scale = env.scale;
	            var deviceWidth = env.deviceWidth / scale;
	            this.navBarHeight = 64.0 * 750.0 / deviceWidth;
	          }
	        }.bind(this));

	        this.$on('naviBar.rightItem.click',function(e){
	          nativeLog("naviBar.rightItem.click");
	          var webElement = this.$el('webview');
	          this.$call('webview','goForward',webElement.ref);
	        });
	        this.$on('naviBar.leftItem.click',function(e){
	          nativeLog("naviBar.leftItem.click");
	          var webElement = this.$el('webview');
	          this.$call('webview','goBack',webElement.ref);
	        });
	      },

	      destroy: function (e) {
	        nativeLog("TC_App_Frm destroy");
	      },
	      viewAppear: function (e) {
	        nativeLog("TC_App_Frm viewAppear");
	      },
	      viewDisAppear: function (e) {
	        nativeLog("TC_App_Frm viewDisAppear");
	      },

	      /**
	      *  Data Storage
	      */

	      mutiSet: function (e,parentName) {
	        var vm = this;
	        var data = {
	          "version": "1.4.0",
	          "bundle": "weex-test"
	        };

	        this.$mutiSet(data, function(e) {
	          var data = JSON.parse(e);
	          var duration = 2;
	          var params = {
	            'message':  "写入数据：" + data.result,
	            'duration': duration,
	          }
	          vm.$call('modal','toast',params);
	        });
	      },
	      mutiGet: function (e,parentName) {
	        var vm = this;
	        vm.$mutiGet(["version","bundle"], function(e) {
	          var data = JSON.parse(e);
	          var duration = 2;
	          var params = {
	            'message':  "bundle:" + data.bundle + "\n" + "version:" + data.version,
	            'duration': duration,
	          }
	          vm.$call('modal','toast',params);
	        });
	      },
	      clear: function (e,parentName) {
	        var vm = this;
	        vm.$mutiRemove(["version","bundle"], function(e) {
	          var data = JSON.parse(e);
	          var duration = 2;
	          var params = {
	            'message':  "删除数据：" + data.result,
	            'duration': duration,
	          }
	          vm.$call('modal','toast',params);
	        });
	      },

	      /**
	      *  Navigator
	      */
	      push: function (e,parentName) {
	        var vm = this;
	        var params = {
	          'url':  'file://assets/' + 'component/navigator-demo.js?test=1',
	          'animated' : 'true',
	        }
	        vm.$call('navigator','push',params, null);
	      },
	      pop: function (e,parentName) {
	        var vm = this;
	        var params = {
	          'animated' : 'true',
	        }
	        vm.$call('navigator','pop', params, null);

	      },
	      close: function (e,parentName) {
	        var vm = this;
	        vm.$call('navigator','close',{}, null);
	      },

	      /**
	      *  Navibar Setup
	      */

	      setNaviBarTitle: function (e,parentName) {
	        nativeLog("setNaviBarTitle");
	        var params = {
	          // 要设置的页面标题
	          title: '我是标题',
	          titleColor: 'white',
	        };
	        this.$call('navigator','setNavBarTitle',params,null);
	      },

	      clearNaviBarTitle: function (e,parentName) {
	        nativeLog("clearNaviBarTitle");
	        this.$call('navigator','clearNavBarTitle',null,null);
	      },

	      setNaviBarRightItem: function (e,parentName) {
	        nativeLog("setNavBarRightItem");

	        var params = {
	          // 要设置的图标
	          //title: 'More',
	          //titleColor: 'white',
	          // 图标是否从 native 中获取
	          fromNative: 'true',
	          autoReset: true ,
	          icon: 'ic_menu_manage'
	        };
	        this.$call('navigator','setNavBarRightItem',params,null);
	      },

	      clearNaviBarRightItem: function (e,parentName) {
	        this.$call('navigator','clearNavBarRightItem',null,null);
	        //var webElement = this.$el('webview');
	        //this.$call('webview','reload',webElement.ref);
	      },

	      setNavBarLeftItem: function (e,parentName) {
	        nativeLog("setNavBarLeftItem");

	        var params = {
	          // 要设置的图标
	          title: 'Home',
	          titleColor: 'white',
	          // 图标是否从 native 中获取
	          fromNative: 'true',
	          autoReset: true ,
	          icon: 'ic_menu_manage'
	        };
	        this.$call('navigator','setNavBarLeftItem',params,null);
	      },

	      clearNavBarLeftItem: function (e,parentName) {
	        this.$call('navigator','clearNavBarLeftItem',null,null);
	        //var webElement = this.$el('webview');
	        //this.$call('webview','reload',webElement.ref);
	      },

	      setNaviBarMoreItem: function (e,parentName) {
	        var params = {
	        // 需要定制的选项列表
	        items: [ {
	          // 要设置的图标
	          icon: 'home',
	          // 图标是否从 native 中获取
	          fromNative: 'true',
	          // 客户端中预置的图标是否是 iconFont
	          iconFont: 'true',
	          // 要设置的文本
	          text: 'home'
	        }, {
	          icon: 'tb_icon_navibar_default_right',
	          fromNative: 'true',
	          text: 'default List'
	        }, {
	          icon: 'iVBORw0KGgoAAAANSUhEUgAAADgAAAA4BAMAAABaqCYtAAAAGFBMVEX///9bYmxbYmxbYmxbYmxbYmxbYmxbYmwN6C/eAAAAB3RSTlMAufow7PZXjR+zEAAAAFJJREFUeF7tkLENgDAMBB1A1EhZADEBbECXEdIyRNCtT0MBxYuK7q+1zrIv/sVsS5ZCXzlXJSZgirHwoB232QFzDLzYv4Z6rThIvaJxW7d1W3MByIBt+f4fAsMAAAAASUVORK5CYII=',
	          text: 'list'
	        } ],
	        autoReset: true
	        };
	        this.$call('navigator','setNavBarMoreItem',params,null);
	      },

	      clearNaviBarMoreItem: function (e,parentName) {
	        nativeLog("clearNaviBarMoreItem");
	        this.$call('navigator','clearNavBarMoreItem',null,null);
	      },

	      startload: function (e) {
	         nativeLog('startload: e = ' + JSON.stringify(e));

	      },

	      finishload: function (e) {
	        nativeLog('finishload =  e' + JSON.stringify(e));
	      },

	      failload: function(e) {
	        nativeLog('finishload =  e' + JSON.stringify(e));
	      },
	      gotoHomePage:function(e){
	        var vm = this;
	        var params={
	          biz:"shequ"
	        };
	        vm.$dispatch('gotoHomePage', params);
	        nativeLog("gotoHomePage dispatch");
	      },
	      clickEvent: function (e) {
	        var eventName = e.target.attr.eventName;
	        var parentName = "'"+e.target.attr.parentName+"'";
	        eval("this."+eventName+"(e,"+parentName+");");
	      },

	      getTabUrl:function (e,tabName){
	        var bundleUrl = this.appConfig.bundleUrl;
	        var lastIndex = bundleUrl.lastIndexOf('build/');
	        if(lastIndex<0){
	          var message = "链接无法识别～";
	          var okTitle = "确 定";
	          var params = {
	            'message':message,
	            'okTitle':okTitle,
	          }
	          this.$call('modal','alert',params);
	          return;
	        }
	        var tabUrl = bundleUrl.substring(0,lastIndex + 6)+tabName+".js";
	        nativeLog("taburl==" + tabUrl);
	        return tabUrl;
	      },
	    }
	  }

	;__weex_module__.exports.template = __weex_module__.exports.template || {}
	;Object.assign(__weex_module__.exports.template, {
	  "type": "tc_navpage",
	  "attr": {
	    "dataRole": "none",
	    "height": function () {return this.navBarHeight},
	    "backgroundColor": "#ff5898",
	    "title": "社区4",
	    "titleColor": "white",
	    "leftItemTitle": "更多",
	    "leftItemColor": "white",
	    "rightItemSrc": "http://gtms02.alicdn.com/tps/i2/TB1ED7iMpXXXXXEXXXXWA_BHXXX-48-48.png"
	  },
	  "children": [
	    {
	      "type": "scroller",
	      "style": {
	        "flexDirection": "column",
	        "position": "absolute",
	        "top": 0,
	        "left": 0,
	        "right": 0,
	        "bottom": 0,
	        "marginTop": function () {return this.navBarHeight}
	      },
	      "events": {
	        "clickrightitem": "onclickRightItem"
	      },
	      "children": [
	        {
	          "type": "div",
	          "classList": [
	            "block"
	          ],
	          "children": [
	            {
	              "type": "text",
	              "classList": [
	                "discript"
	              ],
	              "attr": {
	                "value": "App容器（手淘功能）测试指标1："
	              }
	            },
	            {
	              "type": "text",
	              "classList": [
	                "discript"
	              ],
	              "attr": {
	                "value": "1.数据存储：LocalStorge"
	              }
	            },
	            {
	              "type": "text",
	              "classList": [
	                "discript"
	              ],
	              "attr": {
	                "value": "2.导航体系；"
	              }
	            },
	            {
	              "type": "text",
	              "classList": [
	                "discript"
	              ],
	              "attr": {
	                "value": "3.导航栏设置；"
	              }
	            },
	            {
	              "type": "text",
	              "classList": [
	                "discript"
	              ],
	              "attr": {
	                "value": "测试方法：进入页面，点击每一个文本；"
	              }
	            },
	            {
	              "type": "text",
	              "classList": [
	                "discript"
	              ],
	              "attr": {
	                "value": "gotoHomePage"
	              },
	              "events": {
	                "click": "gotoHomePage"
	              }
	            }
	          ]
	        },
	        {
	          "type": "div",
	          "classList": [
	            "block"
	          ],
	          "children": [
	            {
	              "type": "text",
	              "classList": [
	                "title"
	              ],
	              "attr": {
	                "value": "01.数据存储"
	              }
	            },
	            {
	              "type": "text",
	              "attr": {
	                "itemId": function () {return this.itemId},
	                "value": function () {return this.textValue},
	                "eventName": function () {return this.eventName},
	                "parentName": function () {return this.parentName}
	              },
	              "classList": [
	                "noWH"
	              ],
	              "repeat": function () {return this.Column_Data_Storage},
	              "style": {
	                "fontSize": function () {return this.fontSize}
	              },
	              "events": {
	                "click": "clickEvent"
	              }
	            }
	          ]
	        },
	        {
	          "type": "div",
	          "classList": [
	            "block"
	          ],
	          "children": [
	            {
	              "type": "text",
	              "classList": [
	                "title"
	              ],
	              "attr": {
	                "value": "02.导航体系"
	              }
	            },
	            {
	              "type": "text",
	              "attr": {
	                "itemId": function () {return this.itemId},
	                "value": function () {return this.textValue},
	                "eventName": function () {return this.eventName},
	                "parentName": function () {return this.parentName}
	              },
	              "classList": [
	                "noWH"
	              ],
	              "repeat": function () {return this.Column_Navigator},
	              "style": {
	                "fontSize": function () {return this.fontSize}
	              },
	              "events": {
	                "click": "clickEvent"
	              }
	            }
	          ]
	        },
	        {
	          "type": "div",
	          "classList": [
	            "block"
	          ],
	          "children": [
	            {
	              "type": "text",
	              "classList": [
	                "title"
	              ],
	              "attr": {
	                "value": "03.导航栏设置"
	              }
	            },
	            {
	              "type": "text",
	              "attr": {
	                "itemId": function () {return this.itemId},
	                "value": function () {return this.textValue},
	                "eventName": function () {return this.eventName},
	                "parentName": function () {return this.parentName}
	              },
	              "classList": [
	                "noWH"
	              ],
	              "repeat": function () {return this.Column_NaviBar},
	              "style": {
	                "fontSize": function () {return this.fontSize}
	              },
	              "events": {
	                "click": "clickEvent"
	              }
	            }
	          ]
	        },
	        {
	          "type": "wvweb",
	          "id": "webview",
	          "classList": [
	            "web"
	          ],
	          "attr": {
	            "src": "http://wapp.m.taobao.com/wv/debug/windvane.html#taobao",
	            "actionStatus": function () {return this.actionStatus}
	          },
	          "events": {
	            "pagestart": "startload",
	            "pagefinish": "finishload",
	            "error": "failload"
	          }
	        }
	      ]
	    }
	  ]
	})
	;__weex_module__.exports.style = __weex_module__.exports.style || {}
	;Object.assign(__weex_module__.exports.style, {
	  "block": {
	    "flexDirection": "column",
	    "borderWidth": 3,
	    "borderColor": "#ffff00",
	    "borderStyle": "dotted",
	    "overflow": "visible"
	  },
	  "discript": {
	    "flex": 1,
	    "color": "#000000",
	    "fontSize": 30,
	    "fontWeight": "bold",
	    "backgroundColor": "#37dd23",
	    "overflow": "visible",
	    "fontFamily": "\"Open Sans\", sans-serif"
	  },
	  "title": {
	    "flex": 1,
	    "color": "#000000",
	    "fontSize": 35,
	    "fontWeight": "bold",
	    "backgroundColor": "#ff0000",
	    "overflow": "visible",
	    "fontFamily": "\"Open Sans\", sans-serif"
	  },
	  "hasWH": {
	    "width": 400,
	    "backgroundColor": "#cccccc",
	    "fontSize": 30,
	    "margin": 10,
	    "overflow": "visible",
	    "fontFamily": "\"Open Sans\", sans-serif"
	  },
	  "noWH": {
	    "backgroundColor": "#cccccc",
	    "fontSize": 30,
	    "margin": 10,
	    "overflow": "visible",
	    "fontFamily": "\"Open Sans\", sans-serif"
	  },
	  "support": {
	    "backgroundColor": "#ffff00",
	    "fontSize": 30,
	    "overflow": "visible",
	    "fontFamily": "\"Open Sans\", sans-serif"
	  },
	  "typeBase": {
	    "width": 200,
	    "backgroundColor": "#00ffff",
	    "fontSize": 30,
	    "margin": 10,
	    "fontFamily": "\"Open Sans\", sans-serif"
	  },
	  "typeCompare": {
	    "width": 500,
	    "backgroundColor": "#cccccc",
	    "fontSize": 30,
	    "margin": 10,
	    "fontFamily": "\"Open Sans\", sans-serif"
	  },
	  "web": {
	    "width": 750,
	    "height": 800
	  }
	})
	})
	;__weex_bootstrap__("@weex-component/4fb98209eb251d741375c33c6b8370f2", {
	  "transformerVersion": "0.3.1"
	},undefined)

/***/ }
/******/ ]);