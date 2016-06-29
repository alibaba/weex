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

	;__weex_define__("@weex-component/8f4a8089f260f0dd979f1310d74be4f5", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	    __webpack_require__(8);
	    __webpack_require__(9);
	    __webpack_require__(10);
	    __webpack_require__(13);
	    __webpack_require__(14);

	    __weex_module__.exports = {
	        data: function () {return {
	            shop_config:{
	                userId:14197825
	                /**WEEX_SHOP_CONFIG**/
	            },
	            refresh_display : 'hide',
	            arrivalListParams : {
	                "api": "mtop.shop.newarrival.list.get",
	                "v": "1.0",
	                "needLogin": false,
	                "ecode": 0
	            },
	            arrivalDescParams: {
	                "api": "mtop.sns.newPubaccount.newProductDesc",
	                "v": "2.0",
	                "needLogin": false,
	                "ecode": 0
	            },

	            queryParams: {
	                "direction": "1",
	                "userId": 0,
	                "pageSize": "10",
	                "needPreNew": "true",
	                "timestamp": "0",
	                "id": "0"
	            },
	            userId: 0,
	            banner:{

	            },
	            curPage: 1, // 刷新时需要重新初始化
	            list: [], // 刷新时需要重新初始化
	            isListLoading:false,
	            shouldLoadMore:true,
	            endVisibility:'hidden',
	            loadingVisibility:'visible',
	            emptyList:false,// 刷新时需要重新初始化
	            isFirstRequest:true// 刷新时需要重新初始化
	        }},

	        methods: {
	            onRefresh: function(e) {
	                var vm = this;
	                vm.refresh_display = 'show';
	                vm.refresh(function() {
	                    vm.refresh_display = 'hide';
	                });
	//                var platform = vm.$getConfig().env.platform;
	//                if (platform !== 'android') {
	//                    vm.$call('timer', 'setTimeout', function() {
	//                        vm.refresh_display = 'hide';
	//                    },500);
	//                } else {
	//                    vm.refresh_display = 'hide';
	//                }
	            },
	            onLoadMore: function () {
	                var vm = this;

	                var lastElement = vm.list[vm.list.length - 1];
	                vm.queryParams["timestamp"] = lastElement["timestamp"];
	                vm.queryParams["id"] = lastElement["id"];
	                vm.queryParams["curPage"] = vm.curPage++;

	                if (vm.shouldLoadMore) {
	                    vm.fetchArrivalListData();
	                }
	            },

	            createList: function (rawList) {
	                var vm = this;

	                if (rawList.length == 0) {
	                    vm.shouldLoadMore = false;
	                    vm.endVisibility = 'visible';
	                    // 如果第一次请求没有数据，就直接展示空白的逻辑
	                    if (vm.isFirstRequest === true) {
	                        vm.emptyList = true;
	                    }
	                }

	                // 第一次成功请求数据之后，就将第一次置为false
	                vm.isFirstRequest = false;

	                for (var i = 0; i < rawList.length;i++) {
	                    var element = rawList[i];

	                    if (element["isShownPublishDate"] == "true") {
	                        vm.list.push({"cellType": "date", "publishDate": element["publishDate"]});
	                    }

	                    if (element["hasSecondItem"] == "true") {
	                        element["cellType"] = "doubleItems";
	                    } else {
	                        element["cellType"] = "singleItem";
	                    }
	                    vm.list.push(element);
	                }

	            },

	            // 获取上新的描述的请求
	            fetchNewArrivalDesc: function() {
	                var vm = this;
	                vm.requestMtop(vm.arrivalDescParams, function(ret) {
	                    if (ret.data.type) {
	                        vm.banner = {
	                            description:ret.data.description,
	                            url:ret.data.url,
	                            path:ret.data.path,
	                            type:ret.data.type
	                        };
	                    }
	                }, function() {
	                    /* fail callback */
	                });
	            },

	            // 获取list的数据
	            fetchArrivalListData: function(refreshCallback) {
	                var vm = this;
	                if (vm.isListLoading) {
	                    return;
	                }
	                vm.isListLoading = true;
	                vm.loadingVisibility = 'visible';
	                vm.requestMtop(vm.arrivalListParams, function(ret) {
	                    ret.data && ret.data.list && vm.createList(ret.data.list);
	                    vm.isListLoading = false;
	                    vm.loadingVisibility = 'hidden';
	                    refreshCallback && refreshCallback();
	                }, function() {
	                    vm.curPage--;
	                    vm.isListLoading = false;
	                    vm.loadingVisibility = 'hidden';
	                    refreshCallback && refreshCallback();
	                });
	            },

	            /**
	             * 发送Mtop请求的抽象逻辑
	             **/
	            requestMtop: function(param, success, fail) {
	                var vm = this;
	                // 由于android没有办法去处理JSON, 这里要判断一下, 如果是string的话,则要多做一次JSON.parse.

	                vm.$sendMtop(param, function (ret) {
	                    if (typeof ret === 'string') {
	                        ret = JSON.parse(ret);
	                    }
	                    success && success(ret);
	                }, function (ret) {
	                    if (typeof ret === 'string') {
	                        ret = JSON.parse(ret);
	                    }
	                    fail && fail(ret);
	                });

	            },

	            /**
	             * 初始化首屏的数据以及加载
	             */
	            refresh: function(refreshCallback) {
	                var vm = this;

	                // 从bundleUrl上面获取初始化数据, FIXME:
	//                var bundleUrl = vm.$getConfig().bundleUrl;
	//                var query = urlparser.parse(bundleUrl).search;

	                vm.userId = vm.shop_config.userId;
	                vm.queryParams.userId = vm.userId;

	                // 初始化所有的数据
	                vm.curPage = 1;
	                vm.list = [];
	                vm.banner = {};
	                vm.emptyList = false;
	                vm.isFirstRequest = true;
	                vm.isListLoading = false;
	                vm.shouldLoadMore = true;
	                vm.endVisibility = 'hidden';
	                vm.loadingVisibility = 'visible';

	                vm.queryParams["curPage"] = vm.curPage++;
	                vm.queryParams["timestamp"] = 0;
	                vm.arrivalListParams["param"] = vm.queryParams;

	                vm.arrivalDescParams["param"] = {
	                    "accountId":vm.userId
	                };

	                vm.fetchNewArrivalDesc();
	                vm.fetchArrivalListData(refreshCallback);
	            }
	        },

	        ready: function () {
	            var vm = this;
	            vm.refresh();
	        }

	    }

	;__weex_module__.exports.template = __weex_module__.exports.template || {}
	;Object.assign(__weex_module__.exports.template, {
	  "type": "list",
	  "classList": [
	    "tableView"
	  ],
	  "events": {
	    "loadmore": "onLoadMore"
	  },
	  "attr": {
	    "loadmoreoffset": "960"
	  },
	  "children": [
	    {
	      "type": "refresh",
	      "classList": [
	        "refresh-view"
	      ],
	      "attr": {
	        "display": function () {return this.refresh_display}
	      },
	      "events": {
	        "refresh": "onRefresh"
	      },
	      "children": [
	        {
	          "type": "text",
	          "classList": [
	            "refresh-arrow"
	          ],
	          "shown": function () {return (this.refresh_display==='hide')},
	          "attr": {
	            "value": "↓ 向下拉刷新页面"
	          }
	        },
	        {
	          "type": "loading-indicator"
	        }
	      ]
	    },
	    {
	      "type": "cell",
	      "append": "tree",
	      "children": [
	        {
	          "type": "new-arrival-empty",
	          "shown": function () {return this.emptyList},
	          "attr": {
	            "shopid": function () {return this.userId}
	          }
	        }
	      ]
	    },
	    {
	      "type": "cell",
	      "append": "tree",
	      "children": [
	        {
	          "type": "new-arrival-banner",
	          "shown": function () {return !this.emptyList},
	          "attr": {
	            "description": function () {return this.banner.description},
	            "url": function () {return this.banner.url},
	            "type": function () {return this.banner.type},
	            "path": function () {return this.banner.path}
	          }
	        }
	      ]
	    },
	    {
	      "type": "cell",
	      "append": "tree",
	      "shown": function () {return !this.emptyList},
	      "repeat": function () {return this.list},
	      "children": [
	        {
	          "type": "word-with-line",
	          "shown": function () {return this.cellType==='date'},
	          "attr": {
	            "content_type": "date",
	            "words": function () {return this.publishDate}
	          }
	        },
	        {
	          "type": "single-column-item-w",
	          "shown": function () {return this.cellType==='singleItem'},
	          "attr": {
	            "item": function () {return this.firstItem}
	          }
	        },
	        {
	          "type": "dual-column-item-w",
	          "shown": function () {return this.cellType==='doubleItems'},
	          "attr": {
	            "first_item": function () {return this.firstItem},
	            "second_item": function () {return this.secondItem}
	          }
	        }
	      ]
	    },
	    {
	      "type": "cell",
	      "append": "tree",
	      "children": [
	        {
	          "type": "div",
	          "shown": function () {return !this.emptyList},
	          "classList": [
	            "bottom-area"
	          ],
	          "children": [
	            {
	              "type": "text",
	              "classList": [
	                "list-loading"
	              ],
	              "style": {
	                "visibility": function () {return this.loadingVisibility}
	              },
	              "attr": {
	                "value": "正在加载，请稍后"
	              }
	            },
	            {
	              "type": "word-with-line",
	              "style": {
	                "visibility": function () {return this.endVisibility}
	              },
	              "attr": {
	                "content_type": "end",
	                "words": "已经没有更多宝贝了哦"
	              }
	            }
	          ]
	        }
	      ]
	    }
	  ]
	})
	;__weex_module__.exports.style = __weex_module__.exports.style || {}
	;Object.assign(__weex_module__.exports.style, {
	  "tableView": {
	    "backgroundColor": "#e7e7e7"
	  },
	  "header": {
	    "height": 80
	  },
	  "date": {
	    "margin": 16,
	    "fontSize": 24,
	    "color": "#5d5d5d"
	  },
	  "bottom-area": {
	    "position": "relative",
	    "height": 116,
	    "width": 750,
	    "justifyContent": "center",
	    "alignItems": "center"
	  },
	  "list-loading": {
	    "position": "absolute",
	    "top": 0,
	    "left": 0,
	    "width": 750,
	    "height": 80,
	    "fontSize": 26,
	    "textAlign": "center",
	    "alignItems": "center",
	    "color": "#333333"
	  },
	  "refresh-view": {
	    "width": 750,
	    "height": 60,
	    "justifyContent": "center",
	    "alignItems": "center",
	    "textAlign": "center"
	  },
	  "refresh-arrow": {
	    "fontSize": 30,
	    "color": "#999999",
	    "paddingBottom": 20
	  }
	})
	})
	;__weex_bootstrap__("@weex-component/8f4a8089f260f0dd979f1310d74be4f5", {
	  "transformerVersion": "0.3.1"
	},undefined)

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ function(module, exports) {

	;__weex_define__("@weex-component/word-with-line", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	    __weex_module__.exports = {
	        data: function () {return {
	            words:'',
	            content_type: 'end'
	        }}
	    }

	;__weex_module__.exports.template = __weex_module__.exports.template || {}
	;Object.assign(__weex_module__.exports.template, {
	  "type": "div",
	  "classList": function () {return [(this.content_type) + '-container']},
	  "children": [
	    {
	      "type": "div",
	      "classList": function () {return [(this.content_type) + '-line']}
	    },
	    {
	      "type": "text",
	      "classList": function () {return [(this.content_type) + '-words']},
	      "attr": {
	        "value": function () {return this.words}
	      }
	    },
	    {
	      "type": "div",
	      "classList": function () {return [(this.content_type) + '-line']}
	    }
	  ]
	})
	;__weex_module__.exports.style = __weex_module__.exports.style || {}
	;Object.assign(__weex_module__.exports.style, {
	  "date-container": {
	    "flexDirection": "row",
	    "width": 750,
	    "height": 66,
	    "alignItems": "center",
	    "justifyContent": "center"
	  },
	  "end-container": {
	    "flexDirection": "row",
	    "width": 750,
	    "height": 116,
	    "alignItems": "center",
	    "justifyContent": "center"
	  },
	  "date-line": {
	    "height": 2,
	    "width": 270,
	    "backgroundColor": "#dddddd"
	  },
	  "date-words": {
	    "width": 120,
	    "marginLeft": 10,
	    "marginRight": 10,
	    "fontSize": 22,
	    "color": "#999999",
	    "textAlign": "center",
	    "alignItems": "center"
	  },
	  "end-line": {
	    "height": 2,
	    "width": 180,
	    "backgroundColor": "#dddddd"
	  },
	  "end-words": {
	    "width": 302,
	    "marginLeft": 10,
	    "marginRight": 10,
	    "fontSize": 28,
	    "color": "#999999",
	    "textAlign": "center",
	    "alignItems": "center"
	  }
	})
	})

/***/ },
/* 9 */
/***/ function(module, exports) {

	;__weex_define__("@weex-component/new-arrival-banner", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	    __weex_module__.exports = {
	        data:function () {return {
	            description:"",
	            type:"",
	            url:"",
	            imageUrl:""
	        }},
	        methods: {
	            gotoImageUrl: function(e) {
	                var url = e.target.attr['url'];
	                this.$openURL(url);
	            },
	            ut: function(url) {
	                var vm = this;
	                // $userTrack(type, name, comName, param);
	                vm.$userTrack('listItem', 'Banner', '', {
	                    url:url
	                })
	            }
	        }
	    }

	;__weex_module__.exports.template = __weex_module__.exports.template || {}
	;Object.assign(__weex_module__.exports.template, {
	  "type": "div",
	  "classList": [
	    "banner-container"
	  ],
	  "append": "tree",
	  "children": [
	    {
	      "type": "div",
	      "shown": function () {return this.type=='text'},
	      "classList": [
	        "banner-txt-wrap"
	      ],
	      "children": [
	        {
	          "type": "image",
	          "classList": [
	            "left-quot"
	          ],
	          "attr": {
	            "src": "//gw.alicdn.com/tfs/TB1njpgKXXXXXa4XXXXXXXXXXXX-14-14.png"
	          }
	        },
	        {
	          "type": "text",
	          "classList": [
	            "banner-text"
	          ],
	          "attr": {
	            "value": function () {return this.description}
	          }
	        },
	        {
	          "type": "image",
	          "classList": [
	            "right-quot"
	          ],
	          "attr": {
	            "src": "//gw.alicdn.com/tfs/TB1JPsFJVXXXXclXpXXXXXXXXXX-14-14.png"
	          }
	        },
	        {
	          "type": "div",
	          "classList": [
	            "line-bottom"
	          ]
	        }
	      ]
	    },
	    {
	      "type": "div",
	      "shown": function () {return this.type=='pic'},
	      "events": {
	        "click": "gotoImageUrl"
	      },
	      "attr": {
	        "url": function () {return this.url}
	      },
	      "children": [
	        {
	          "type": "image",
	          "classList": [
	            "publish-banner"
	          ],
	          "attr": {
	            "src": function () {return this.path}
	          }
	        }
	      ]
	    }
	  ]
	})
	;__weex_module__.exports.style = __weex_module__.exports.style || {}
	;Object.assign(__weex_module__.exports.style, {
	  "banner-container": {
	    "display": "flex"
	  },
	  "banner-txt-wrap": {
	    "position": "relative",
	    "width": 714,
	    "margin": 18,
	    "padding": 50,
	    "backgroundColor": "#ffffff",
	    "borderBottomColor": "#dddddd",
	    "borderBottomWidth": 1,
	    "borderBottomStyle": "solid"
	  },
	  "line-bottom": {
	    "position": "absolute",
	    "bottom": -1,
	    "left": 0,
	    "height": 1,
	    "width": 714,
	    "backgroundColor": "#cccccc"
	  },
	  "left-quot": {
	    "position": "absolute",
	    "top": 15,
	    "left": 15,
	    "width": 14,
	    "height": 14
	  },
	  "right-quot": {
	    "position": "absolute",
	    "bottom": 15,
	    "right": 15,
	    "width": 14,
	    "height": 14
	  },
	  "banner-text": {
	    "color": "#051b28"
	  },
	  "publish-banner": {
	    "width": 714,
	    "height": 132,
	    "margin": 18
	  }
	})
	})

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	;__weex_define__("@weex-component/single-column-item-w", [], function(__weex_require__, __weex_exports__, __weex_module__){
	__webpack_require__(11);
	__webpack_require__(12);

	;
	    __weex_module__.exports = {
	        data: function () {return {
	            item: {}
	        }},

	        methods: {
	            goTargetUrl: function(e) {
	                var vm = this;
	                var itemId = e.target.attr['itemid'];
	                vm.$openURL('//h5.m.taobao.com/awp/core/detail.htm?id='+itemId);
	            }
	        }
	    }

	;__weex_module__.exports.template = __weex_module__.exports.template || {}
	;Object.assign(__weex_module__.exports.template, {
	  "type": "div",
	  "classList": [
	    "item-container"
	  ],
	  "append": "tree",
	  "children": [
	    {
	      "type": "div",
	      "classList": [
	        "item-wrap"
	      ],
	      "attr": {
	        "itemid": function () {return this.item.itemId}
	      },
	      "events": {
	        "click": "goTargetUrl"
	      },
	      "children": [
	        {
	          "type": "image",
	          "classList": [
	            "item-image"
	          ],
	          "attr": {
	            "src": function () {return this.item.itemPic}
	          }
	        },
	        {
	          "type": "text",
	          "classList": [
	            "title"
	          ],
	          "attr": {
	            "value": function () {return this.item.title}
	          }
	        },
	        {
	          "type": "price-tag",
	          "events": {
	            "shelf": "item.isOnShelves"
	          },
	          "attr": {
	            "time": function () {return this.item.onShelvesTime},
	            "promotion": function () {return this.item.promotionPrice},
	            "price": function () {return this.item.price}
	          }
	        }
	      ]
	    },
	    {
	      "type": "calendar-btn",
	      "shown": function () {return this.item.isOnShelves==='false'},
	      "classList": [
	        "cal-btn"
	      ],
	      "attr": {
	        "btn_type": "single",
	        "status": "calendar-unset"
	      }
	    },
	    {
	      "type": "div",
	      "classList": [
	        "line-bottom"
	      ]
	    }
	  ]
	})
	;__weex_module__.exports.style = __weex_module__.exports.style || {}
	;Object.assign(__weex_module__.exports.style, {
	  "item-container": {
	    "flexDirection": "row",
	    "display": "flex",
	    "flexWrap": "wrap",
	    "justifyContent": "center",
	    "marginBottom": 4,
	    "backgroundColor": "#ffffff",
	    "borderBottomColor": "#dddddd",
	    "borderBottomWidth": 1,
	    "borderBottomStyle": "solid"
	  },
	  "line-bottom": {
	    "height": 1,
	    "width": 750,
	    "backgroundColor": "#cccccc"
	  },
	  "item-wrap": {
	    "flexDirection": "column"
	  },
	  "item-image": {
	    "height": 750,
	    "width": 750
	  },
	  "title": {
	    "marginTop": 12,
	    "marginLeft": 12,
	    "width": 694,
	    "height": 60,
	    "lines": 2,
	    "fontSize": 26,
	    "color": "#051b28",
	    "textOverflow": "ellipsis"
	  },
	  "item-info": {
	    "flexDirection": "row",
	    "alignItems": "center",
	    "justifyContent": "space-between",
	    "marginLeft": 12,
	    "height": 80,
	    "width": 739
	  },
	  "cal-btn": {
	    "position": "absolute",
	    "top": 678,
	    "left": 0,
	    "height": 72,
	    "width": 750
	  },
	  "on-shelf-time": {
	    "color": "#ff6600",
	    "fontSize": 26
	  }
	})
	})

/***/ },
/* 11 */
/***/ function(module, exports) {

	;__weex_define__("@weex-component/price-tag", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	    __weex_module__.exports = {
	        data: function () {return {
	            isonshelf:'true',
	            time:"",
	            promotion:"",
	            price:""
	        }}
	    }

	;__weex_module__.exports.template = __weex_module__.exports.template || {}
	;Object.assign(__weex_module__.exports.template, {
	  "type": "div",
	  "classList": [
	    "price-wrap"
	  ],
	  "children": [
	    {
	      "type": "div",
	      "shown": function () {return this.isonshelf=='false'},
	      "children": [
	        {
	          "type": "text",
	          "classList": [
	            "on-shelf-time"
	          ],
	          "attr": {
	            "value": function () {return (this.time) + '上架'}
	          }
	        }
	      ]
	    },
	    {
	      "type": "div",
	      "shown": function () {return this.isonshelf=='true'},
	      "children": [
	        {
	          "type": "div",
	          "classList": [
	            "price-wrap-with-promotion"
	          ],
	          "shown": function () {return this.promotion},
	          "children": [
	            {
	              "type": "text",
	              "classList": [
	                "symbol-yen"
	              ],
	              "attr": {
	                "value": "¥"
	              }
	            },
	            {
	              "type": "text",
	              "classList": [
	                "current-price"
	              ],
	              "attr": {
	                "value": function () {return this.promotion}
	              }
	            },
	            {
	              "type": "text",
	              "classList": [
	                "symbol-yen-original"
	              ],
	              "attr": {
	                "value": "¥"
	              }
	            },
	            {
	              "type": "text",
	              "classList": [
	                "original-price"
	              ],
	              "attr": {
	                "value": function () {return this.price}
	              }
	            }
	          ]
	        },
	        {
	          "type": "div",
	          "classList": [
	            "price-wrap-without-promotion"
	          ],
	          "shown": function () {return !this.promotion},
	          "children": [
	            {
	              "type": "text",
	              "classList": [
	                "symbol-yen"
	              ],
	              "attr": {
	                "value": "¥"
	              }
	            },
	            {
	              "type": "text",
	              "classList": [
	                "current-price"
	              ],
	              "attr": {
	                "value": function () {return this.price}
	              }
	            }
	          ]
	        }
	      ]
	    }
	  ]
	})
	;__weex_module__.exports.style = __weex_module__.exports.style || {}
	;Object.assign(__weex_module__.exports.style, {
	  "on-shelf-time": {
	    "color": "#ff5000",
	    "fontSize": 26,
	    "height": 34,
	    "justifyContent": "center"
	  },
	  "price-wrap": {
	    "margin": 12,
	    "height": 34
	  },
	  "price-wrap-with-promotion": {
	    "flexDirection": "row",
	    "alignItems": "center"
	  },
	  "price-wrap-without-promotion": {
	    "flexDirection": "row",
	    "alignItems": "center"
	  },
	  "symbol-yen": {
	    "fontSize": 20,
	    "color": "#ff5000"
	  },
	  "symbol-yen-original": {
	    "fontSize": 20,
	    "color": "#acacac"
	  },
	  "current-price": {
	    "fontSize": 30,
	    "marginRight": 15,
	    "color": "#ff5000"
	  },
	  "original-price": {
	    "fontSize": 26,
	    "color": "#acacac",
	    "textDecoration": "line-through"
	  }
	})
	})

/***/ },
/* 12 */
/***/ function(module, exports) {

	;__weex_define__("@weex-component/calendar-btn", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	    __weex_module__.exports = {
	        data:function () {return {
	            btn_type: 'dual',
	            sourceId:10007,
	            status:"",
	            calendarApiParam: {
	                "api": "mtop.sns.newPubaccount.newProductDesc",
	                "v": "2.0",
	                "needLogin": false,
	                "ecode": 0
	            }
	        }},
	        computed: {
	            unsetVisibility: {
	                get: function() {
	                    return this.status === 'calendar-unset' ? 'visible' : 'hidden';
	                }
	            },
	            setVisibility: {
	                get: function() {
	                    return this.status === 'calendar-set' ? 'visible' : 'hidden';
	                }
	            }
	        },
	        ready: function() {
	            // 正常一个组件不包含请求逻辑，日历提醒组件这里是比较特殊的一种情况，日历组件在初始化之后会请求本地的native方法
	            // TODO
	        },
	        methods: {
	            setCalendar: function() {
	                var vm = this;
	                if (vm.status == 'calendar-unset') {
	                    this.$call('modal', 'toast', {
	                        'message': '设置成功',
	                        'duration': 1
	                    });
	                    vm.status = 'calendar-set';
	                } else {
	                    this.$call('modal', 'toast', {
	                        'message': '取消设置成功',
	                        'duration': 1
	                    });
	                    vm.status = 'calendar-unset';
	                }
	            }
	        }
	    }

	;__weex_module__.exports.template = __weex_module__.exports.template || {}
	;Object.assign(__weex_module__.exports.template, {
	  "type": "div",
	  "events": {
	    "click": "setCalendar"
	  },
	  "children": [
	    {
	      "type": "div",
	      "classList": function () {return [(this.btn_type) + '-calendar-tip', 'calendar-unset']},
	      "style": {
	        "visibility": function () {return this.unsetVisibility}
	      },
	      "children": [
	        {
	          "type": "image",
	          "classList": [
	            "cal-image"
	          ],
	          "attr": {
	            "src": "//gw.alicdn.com/tfs/TB1LPguJVXXXXbDXFXXXXXXXXXX-32-32.png"
	          }
	        },
	        {
	          "type": "text",
	          "classList": [
	            "dual-calendar-tip-txt"
	          ],
	          "attr": {
	            "value": "上架提醒我"
	          }
	        }
	      ]
	    },
	    {
	      "type": "div",
	      "classList": function () {return [(this.btn_type) + '-calendar-tip', 'calendar-set']},
	      "style": {
	        "visibility": function () {return this.setVisibility}
	      },
	      "children": [
	        {
	          "type": "text",
	          "classList": [
	            "dual-calendar-tip-txt"
	          ],
	          "attr": {
	            "value": "已设置上架提醒"
	          }
	        }
	      ]
	    }
	  ]
	})
	;__weex_module__.exports.style = __weex_module__.exports.style || {}
	;Object.assign(__weex_module__.exports.style, {
	  "cal-image": {
	    "position": "relative",
	    "width": 32,
	    "height": 32,
	    "marginRight": 10
	  },
	  "dual-calendar-tip": {
	    "position": "absolute",
	    "bottom": 0,
	    "left": 0,
	    "width": 373,
	    "flexDirection": "row",
	    "alignItems": "center",
	    "justifyContent": "center",
	    "height": 72
	  },
	  "single-calendar-tip": {
	    "position": "absolute",
	    "bottom": 0,
	    "left": 0,
	    "width": 750,
	    "flexDirection": "row",
	    "alignItems": "center",
	    "justifyContent": "center",
	    "height": 72
	  },
	  "calendar-unset": {
	    "backgroundColor": "rgba(251,94,23,0.9)"
	  },
	  "calendar-set": {
	    "backgroundColor": "rgba(90,90,90,0.9)"
	  },
	  "dual-calendar-tip-txt": {
	    "fontSize": 26,
	    "line": 1,
	    "color": "#ffffff"
	  }
	})
	})

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	;__weex_define__("@weex-component/dual-column-item-w", [], function(__weex_require__, __weex_exports__, __weex_module__){
	__webpack_require__(11);
	__webpack_require__(12);

	;
	    __weex_module__.exports = {
	        data: function () {return {
	            item: {},
	            first_item: {},
	            second_item: {}
	        }},

	        methods: {
	            goTargetUrl: function(e) {
	                var vm = this;
	                var itemId = e.target.attr['itemid'];
	                vm.$openURL('//h5.m.taobao.com/awp/core/detail.htm?id='+itemId);
	            }
	        }
	    }

	;__weex_module__.exports.template = __weex_module__.exports.template || {}
	;Object.assign(__weex_module__.exports.template, {
	  "type": "div",
	  "classList": [
	    "item-container"
	  ],
	  "append": "tree",
	  "children": [
	    {
	      "type": "div",
	      "classList": [
	        "item-wrap"
	      ],
	      "children": [
	        {
	          "type": "div",
	          "attr": {
	            "itemid": function () {return this.first_item.itemId}
	          },
	          "events": {
	            "click": "goTargetUrl"
	          },
	          "children": [
	            {
	              "type": "image",
	              "classList": [
	                "item-image"
	              ],
	              "attr": {
	                "src": function () {return this.first_item.itemPic}
	              }
	            },
	            {
	              "type": "text",
	              "classList": [
	                "title"
	              ],
	              "attr": {
	                "value": function () {return this.first_item.title}
	              }
	            },
	            {
	              "type": "price-tag",
	              "attr": {
	                "isonshelf": function () {return this.first_item.isOnShelves},
	                "time": function () {return this.first_item.onShelvesTime},
	                "promotion": function () {return this.first_item.promotionPrice},
	                "price": function () {return this.first_item.price}
	              }
	            }
	          ]
	        },
	        {
	          "type": "calendar-btn",
	          "classList": [
	            "cal-btn"
	          ],
	          "shown": function () {return this.first_item.isOnShelves==='false'},
	          "attr": {
	            "status": "calendar-unset"
	          }
	        },
	        {
	          "type": "div",
	          "classList": [
	            "line-bottom"
	          ]
	        }
	      ]
	    },
	    {
	      "type": "div",
	      "classList": [
	        "item-wrap"
	      ],
	      "children": [
	        {
	          "type": "div",
	          "attr": {
	            "itemid": function () {return this.second_item.itemId}
	          },
	          "events": {
	            "click": "goTargetUrl"
	          },
	          "children": [
	            {
	              "type": "image",
	              "classList": [
	                "item-image"
	              ],
	              "attr": {
	                "src": function () {return this.second_item.itemPic}
	              }
	            },
	            {
	              "type": "text",
	              "classList": [
	                "title"
	              ],
	              "attr": {
	                "value": function () {return this.second_item.title}
	              }
	            },
	            {
	              "type": "price-tag",
	              "attr": {
	                "isonshelf": function () {return this.second_item.isOnShelves},
	                "time": function () {return this.second_item.onShelvesTime},
	                "promotion": function () {return this.second_item.promotionPrice},
	                "price": function () {return this.second_item.price}
	              }
	            }
	          ]
	        },
	        {
	          "type": "calendar-btn",
	          "classList": [
	            "cal-btn"
	          ],
	          "shown": function () {return this.second_item.isOnShelves==='false'},
	          "attr": {
	            "status": "calendar-set"
	          }
	        },
	        {
	          "type": "div",
	          "classList": [
	            "line-bottom"
	          ]
	        }
	      ]
	    }
	  ]
	})
	;__weex_module__.exports.style = __weex_module__.exports.style || {}
	;Object.assign(__weex_module__.exports.style, {
	  "item-container": {
	    "display": "flex",
	    "flexDirection": "row",
	    "justifyContent": "space-between"
	  },
	  "item-wrap": {
	    "position": "relative",
	    "flexDirection": "column",
	    "marginBottom": 4,
	    "backgroundColor": "#ffffff",
	    "borderBottomColor": "#dddddd",
	    "borderBottomWidth": 1,
	    "borderBottomStyle": "solid"
	  },
	  "line-bottom": {
	    "height": 1,
	    "width": 372,
	    "backgroundColor": "#cccccc"
	  },
	  "item-image": {
	    "height": 372,
	    "width": 372
	  },
	  "title": {
	    "marginTop": 12,
	    "marginLeft": 12,
	    "height": 60,
	    "width": 346,
	    "lines": 2,
	    "textOverflow": "ellipsis",
	    "fontSize": 26,
	    "color": "#051b28",
	    "overflow": "hidden"
	  },
	  "cal-btn": {
	    "position": "absolute",
	    "top": 301,
	    "left": 0,
	    "height": 72,
	    "width": 372
	  }
	})
	})

/***/ },
/* 14 */
/***/ function(module, exports) {

	;__weex_define__("@weex-component/new-arrival-empty", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	    __weex_module__.exports = {
	        data: function () {return {
	            shopid:''
	        }},
	        methods: {
	            gotoAllItems: function() {
	                var vm = this;
	                vm.$openURL('//shop.m.taobao.com/goods/index.htm?catId=0&shopId=' + vm.shopid);
	            }
	        }
	    }

	;__weex_module__.exports.template = __weex_module__.exports.template || {}
	;Object.assign(__weex_module__.exports.template, {
	  "type": "div",
	  "classList": [
	    "empty-container"
	  ],
	  "children": [
	    {
	      "type": "image",
	      "classList": [
	        "empty-image"
	      ],
	      "attr": {
	        "src": "//img.alicdn.com/tfs/TB19aViKXXXXXXcaXXXXXXXXXXX-268-271.png"
	      }
	    },
	    {
	      "type": "text",
	      "classList": [
	        "empty-words"
	      ],
	      "attr": {
	        "value": "掌柜有点懒哦，最近没有更新"
	      }
	    },
	    {
	      "type": "text",
	      "classList": [
	        "guide-words"
	      ],
	      "attr": {
	        "value": "去下面逛逛"
	      }
	    },
	    {
	      "type": "div",
	      "classList": [
	        "entry"
	      ],
	      "events": {
	        "click": "gotoAllItems"
	      },
	      "children": [
	        {
	          "type": "text",
	          "classList": [
	            "goto-all-items"
	          ],
	          "attr": {
	            "value": "去逛全部宝贝"
	          }
	        }
	      ]
	    }
	  ]
	})
	;__weex_module__.exports.style = __weex_module__.exports.style || {}
	;Object.assign(__weex_module__.exports.style, {
	  "empty-container": {
	    "flexDirection": "column",
	    "width": 750,
	    "height": 800,
	    "paddingTop": 125,
	    "backgroundColor": "#ededed",
	    "alignItems": "center"
	  },
	  "empty-image": {
	    "width": 268,
	    "height": 271
	  },
	  "empty-words": {
	    "marginTop": 40,
	    "color": "#081c27",
	    "fontSize": 32
	  },
	  "guide-words": {
	    "marginTop": 20,
	    "marginBottom": 60,
	    "color": "#b2b2b2",
	    "fontSize": 24
	  },
	  "entry": {
	    "width": 186,
	    "height": 60,
	    "borderWidth": 2,
	    "borderColor": "#999999",
	    "borderRadius": 10,
	    "textAlign": "center",
	    "justifyContent": "center",
	    "alignItems": "center"
	  },
	  "goto-all-items": {
	    "fontSize": 24,
	    "color": "#999999"
	  }
	})
	})

/***/ }
/******/ ]);