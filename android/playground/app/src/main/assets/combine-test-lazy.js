define('@weex-component/item', function (require, exports, module) {

;
	module.exports = {
		data: function () {return {
			item:{}
		}},
		methods: {
			ready:function (){

			},
			goTargetUrl: function(e){
				this.$openURL(this.item.h5Url);
			}
		}
	};


;module.exports.style = {
  "item-container": {
    "flexDirection": "row",
    "display": "flex",
    "flexWrap": "wrap"
  },
  "item-wrap": {
    "marginBottom": 6,
    "flexDirection": "column",
    "width": 372
  },
  "item-image": {
    "height": 372,
    "width": 372
  },
  "title": {
    "color": "#051b28",
    "fontSize": 28,
    "lines": 2,
    "lineHeight": 42,
    "height": 84,
    "width": 336,
    "overflow": "hidden"
  },
  "info-wrap": {
    "padding": 18,
    "flexDirection": "column",
    "backgroundColor": "#ffffff"
  },
  "price-info": {
    "display": "flex",
    "justifyContent": "space-between",
    "flexDirection": "row"
  },
  "price": {
    "display": "flex",
    "flexDirection": "row"
  },
  "price-rmb": {
    "fontSize": 20,
    "color": "#ff6600",
    "paddingTop": 6
  },
  "price-decimal": {
    "fontSize": 20,
    "color": "#ff6600",
    "paddingTop": 6,
    "width": 100
  },
  "price-detail": {
    "color": "#ff6600",
    "height": 30,
    "fontSize": 26
  },
  "buy-count": {
    "paddingTop": 4
  },
  "buy-count-text": {
    "fontSize": 20,
    "color": "#999999"
  },
  "bottom-border": {
    "height": 1,
    "backgroundColor": "#d9d9d9"
  },
  "bottom-border-light": {
    "height": 1,
    "backgroundColor": "#e7e7e7"
  }
}

;module.exports.template = {
  "type": "container",
  "classList": [
    "item-container"
  ],
  "events": {
    "click": "goTargetUrl"
  },
  "append": "tree",
  "children": [
    {
      "type": "container",
      "classList": [
        "item-wrap"
      ],
      "children": [
        {
          "type": "image",
          "classList": [
            "item-image"
          ],
          "attr": {
            "src": function () {return this.item.imgUrl}
          }
        },
        {
          "type": "container",
          "classList": [
            "info-wrap"
          ],
          "children": [
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
              "type": "container",
              "classList": [
                "price-info"
              ],
              "children": [
                {
                  "type": "container",
                  "classList": [
                    "price"
                  ],
                  "children": [
                    {
                      "type": "text",
                      "classList": [
                        "price-rmb"
                      ],
                      "attr": {
                        "value": "￥"
                      }
                    },
                    {
                      "type": "text",
                      "classList": [
                        "price-detail"
                      ],
                      "attr": {
                        "value": function () {return this.item.priceYuan}
                      }
                    },
                    {
                      "type": "text",
                      "shown": function () {return this.item.priceFen},
                      "classList": [
                        "price-decimal"
                      ],
                      "attr": {
                        "value": function () {return '.' + (this.item.priceFen)}
                      }
                    }
                  ]
                },
                {
                  "type": "container",
                  "classList": [
                    "buy-count"
                  ],
                  "children": [
                    {
                      "type": "text",
                      "classList": [
                        "buy-count-text"
                      ],
                      "attr": {
                        "value": function () {return (this.item.sold30daysQuantity) + '人购买'}
                      }
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
            "bottom-border"
          ]
        },
        {
          "type": "container",
          "classList": [
            "bottom-border-light"
          ]
        }
      ]
    }
  ]
}

;})

// module

define('@weex-component/double-item', function (require, exports, module) {

;
	module.exports = {
		data: function () {return {
			list: [],
			dataSource: {
			},
			type: "double"
		}},
		methods: {
			render:function (ds){
				var vm = this;
				vm.dataSource = ds;

				if(!vm.dataSource) {
					return;
				}

				//nativeLog('shop_weex', 'double-item', 'before sending Mtop');
				vm.dataSource.pageSize || (vm.dataSource.pageSize = 6);
				vm.$sendMtop({
					'api' : 'mtop.taobao.geb.enhenced.itemList.get',
					'v' : '2.0',
					'needLogin' : false,
					'ecode': 0,
					'param' : this.dataSource
				},function(ret){
					//nativeLog('shop_weex', 'double-item', 'after sending Mtop', 'success');
					if(typeof ret == 'string'){
						ret = JSON.parse(ret);
					}

					if(ret.data && ret.data.list){
						if(!ret.data.list){
							return
						}
						//filter
						var newArr = [];
						var subItemObj = {};

						ret.data.list.forEach(function (item, index){
							if(item.priceFen == '00') {
								item.priceFen = '';
							}
							if(index % 2 == 1){
								subItemObj.right = item;
								newArr.push(subItemObj);
								subItemObj = {};
							} else {
								subItemObj.left = item;
							}
						});

						if (ret.data.list.length % 2 == 1) {
							newArr.push(subItemObj);
						}
						vm.list = newArr;
					}
				},function (){
					nativeLog('shop_weex', 'double-item', 'after sending Mtop', 'fail');
					//alert(err.ret[0].split('::')[1] || "请求数据失败");
				});
			},
			goToMore: function () {
				this.dataSource.moreLink && this.$openURL(this.dataSource.moreLink);
			}
		}
	};


;module.exports.style = {
  "item-container": {
    "marginBottom": 12,
    "display": "flex"
  },
  "title-wrap": {
    "display": "flex",
    "flexDirection": "row",
    "alignItems": "center",
    "justifyContent": "space-between",
    "height": 72,
    "width": 750,
    "backgroundColor": "#ffffff",
    "marginBottom": 0
  },
  "title": {
    "fontSize": 32,
    "color": "#051b28",
    "paddingLeft": 16,
    "width": 606
  },
  "arrow": {
    "width": 32,
    "height": 32,
    "marginRight": 16
  },
  "more-link": {
    "display": "flex",
    "flexDirection": "row",
    "height": 72,
    "alignItems": "center"
  },
  "more": {
    "fontSize": 28,
    "color": "#999999",
    "width": 96,
    "textAlign": "right"
  },
  "item-content": {
    "justifyContent": "space-between",
    "width": 750,
    "flexDirection": "row"
  }
}

;module.exports.template = {
  "type": "cell",
  "append": "tree",
  "shown": function () {return this.list.length>0},
  "classList": [
    "item-container"
  ],
  "children": [
    {
      "type": "container",
      "classList": [
        "title-wrap"
      ],
      "shown": function () {return this.dataSource.title},
      "events": {
        "click": "goToMore"
      },
      "children": [
        {
          "type": "text",
          "classList": [
            "title"
          ],
          "attr": {
            "value": function () {return this.dataSource.title}
          }
        },
        {
          "type": "container",
          "classList": [
            "more-link"
          ],
          "shown": function () {return this.dataSource.moreLink},
          "children": [
            {
              "type": "text",
              "classList": [
                "more"
              ],
              "attr": {
                "value": "更多"
              }
            },
            {
              "type": "image",
              "classList": [
                "arrow"
              ],
              "attr": {
                "src": "https://gw.alicdn.com/tps/TB1qe3fLVXXXXaTXFXXXXXXXXXX-32-32.png"
              }
            }
          ]
        }
      ]
    },
    {
      "type": "container",
      "repeat": function () {return this.list},
      "classList": [
        "item-content"
      ],
      "children": [
        {
          "type": "item",
          "attr": {
            "item": function () {return this.left}
          }
        },
        {
          "type": "item",
          "shown": function () {return this.right},
          "attr": {
            "item": function () {return this.right}
          }
        }
      ]
    }
  ]
}

;})

// module

define('@weex-component/text-view', function (require, exports, module) {

;
	module.exports = {
		data:function () {return {
			dataSource:{
			},
			content: ''
		}},
		methods:{
		    render: function (ds) {
		    	this.dataSource = ds;
				this.dataSource && this.dataSource.content && (this.content = decodeURIComponent(this.dataSource.content).replace(/\\+/g, ' '));
		    }
		}
	}


;module.exports.style = {
  "mainframe": {
    "display": "flex",
    "flexDirection": "column",
    "paddingTop": 32,
    "backgroundColor": "#ffffff",
    "marginBottom": 18
  },
  "section": {
    "width": 750,
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "center"
  },
  "content": {
    "fontSize": 28,
    "lineHeight": 42,
    "width": 686,
    "textAlign": "left",
    "color": "#999999",
    "wordBreak": "break-all"
  },
  "title-container": {
    "display": "flex",
    "flexDirection": "row",
    "marginBottom": 12,
    "width": 700
  },
  "little-tag": {
    "backgroundColor": "#ff5000",
    "height": 40,
    "width": 10
  },
  "title": {
    "fontSize": 28,
    "fontWeight": "bold",
    "color": "#051b29",
    "paddingLeft": 24,
    "width": 700
  },
  "bottom-border": {
    "marginTop": 32,
    "height": 1,
    "backgroundColor": "#d9d9d9"
  },
  "bottom-border-light": {
    "height": 1,
    "backgroundColor": "#e7e7e7"
  }
}

;module.exports.template = {
  "type": "cell",
  "append": "tree",
  "classList": [
    "mainframe"
  ],
  "shown": function () {return this.dataSource&&(this.dataSource.title||this.dataSource.content)},
  "children": [
    {
      "type": "container",
      "shown": function () {return this.dataSource.title},
      "classList": [
        "title-container"
      ],
      "children": [
        {
          "type": "container",
          "classList": [
            "little-tag"
          ]
        },
        {
          "type": "text",
          "classList": [
            "title"
          ],
          "attr": {
            "value": function () {return this.dataSource.title}
          }
        }
      ]
    },
    {
      "type": "container",
      "shown": function () {return this.content},
      "classList": [
        "section"
      ],
      "children": [
        {
          "type": "text",
          "classList": [
            "content"
          ],
          "attr": {
            "value": function () {return this.content}
          }
        }
      ]
    },
    {
      "type": "container",
      "classList": [
        "bottom-border"
      ]
    },
    {
      "type": "container",
      "classList": [
        "bottom-border-light"
      ]
    }
  ]
}

;})

// module

define('@weex-component/title-view', function (require, exports, module) {

;
    module.exports = {
        data:function () {return {
            dataSource: {
            }
        }},
        methods:{
            goToMore:function () {
                this.$openURL(this.dataSource.link); 
            },
            render: function (ds) {
                this.dataSource = ds;
            }
        }
    }


;module.exports.style = {
  "title": {
    "fontSize": 32,
    "color": "#051b28",
    "paddingLeft": 16,
    "width": 700,
    "lines": 1
  },
  "outer-container": {
    "height": 74,
    "marginBottom": 18,
    "backgroundColor": "#ffffff"
  },
  "inner-container": {
    "display": "flex",
    "justifyContent": "space-between",
    "flexDirection": "row",
    "alignItems": "center",
    "height": 72,
    "width": 750
  },
  "arrow": {
    "width": 32,
    "height": 32,
    "paddingRight": 16
  },
  "bottom-border": {
    "height": 1,
    "backgroundColor": "#d9d9d9"
  },
  "bottom-border-light": {
    "height": 1,
    "backgroundColor": "#e7e7e7"
  }
}

;module.exports.template = {
  "type": "cell",
  "append": "tree",
  "classList": [
    "outer-container"
  ],
  "shown": function () {return this.dataSource&&this.dataSource.content},
  "children": [
    {
      "type": "container",
      "classList": [
        "inner-container"
      ],
      "events": {
        "click": "goToMore"
      },
      "children": [
        {
          "type": "text",
          "classList": [
            "title"
          ],
          "attr": {
            "value": function () {return this.dataSource.content}
          }
        },
        {
          "type": "image",
          "classList": [
            "arrow"
          ],
          "attr": {
            "src": "https://gw.alicdn.com/tps/TB1qe3fLVXXXXaTXFXXXXXXXXXX-32-32.png"
          }
        }
      ]
    },
    {
      "type": "container",
      "classList": [
        "bottom-border"
      ]
    },
    {
      "type": "container",
      "classList": [
        "bottom-border-light"
      ]
    }
  ]
}

;})

// module

define('@weex-component/single-image', function (require, exports, module) {

;
  module.exports={
    data:function () {return {
      dataSource:{}
    }},
    methods:{
      goTargetUrl:function(){
        this.$openURL(this.dataSource.link);
      },
      render: function (ds) {
        this.dataSource = ds;
      }
    }
  }



;module.exports.style = {
  "container": {
    "position": "relative",
    "marginBottom": 18
  },
  "main-image": {
    "height": 300,
    "width": 750
  },
  "title-container": {
    "position": "absolute",
    "top": 228,
    "paddingLeft": 32,
    "zIndex": 2,
    "height": 72,
    "width": 718,
    "display": "flex",
    "alignItems": "center",
    "flexDirection": "row"
  },
  "title": {
    "fontSize": 32,
    "color": "#ffffff",
    "lines": 1,
    "width": 680
  },
  "title-shadow": {
    "position": "absolute",
    "top": 228,
    "zIndex": 1,
    "backgroundColor": "#000000",
    "height": 72,
    "width": 750,
    "opacity": 0.6
  },
  "little-tag": {
    "position": "absolute",
    "backgroundColor": "#ff5000",
    "height": 40,
    "width": 10,
    "top": 244,
    "zIndex": 2
  },
  "bottom-border": {
    "position": "absolute",
    "top": 300,
    "height": 1,
    "backgroundColor": "#d9d9d9"
  },
  "bottom-border-light": {
    "position": "absolute",
    "top": 301,
    "height": 1,
    "backgroundColor": "#e7e7e7"
  }
}

;module.exports.template = {
  "type": "cell",
  "append": "tree",
  "classList": [
    "container"
  ],
  "events": {
    "click": "goTargetUrl"
  },
  "shown": function () {return this.dataSource&&this.dataSource.picUrl},
  "children": [
    {
      "type": "image",
      "classList": [
        "main-image"
      ],
      "attr": {
        "src": function () {return this.dataSource.picUrl}
      }
    },
    {
      "type": "container",
      "shown": function () {return this.dataSource.textContent},
      "classList": [
        "title-shadow"
      ]
    },
    {
      "type": "container",
      "shown": function () {return this.dataSource.textContent},
      "classList": [
        "little-tag"
      ]
    },
    {
      "type": "container",
      "shown": function () {return this.dataSource.textContent},
      "classList": [
        "title-container"
      ],
      "children": [
        {
          "type": "text",
          "classList": [
            "title"
          ],
          "attr": {
            "value": function () {return this.dataSource.textContent}
          }
        }
      ]
    },
    {
      "type": "container",
      "classList": [
        "bottom-border"
      ]
    },
    {
      "type": "container",
      "classList": [
        "bottom-border-light"
      ]
    }
  ]
}

;})

// module

define('@weex-component/double-image', function (require, exports, module) {

;
	module.exports = {
		data: function () {return {
			dataSource: {
			}
		}},
		methods: {
			openUrl: function (e) {
				if (e.target.attr.link) {
					this.$openURL(e.target.attr.link);
				}
			},
			render: function(ds) {
				var vm = this;
				vm.dataSource = ds;
				console.log(vm.dataSource);

				if(!vm.dataSource || !vm.dataSource.picUrlList){
					return;
				}

				var newArr = [];
				var subItemObj = {};

				vm.dataSource.picUrlList.forEach(function (item, index){
					if(index % 2 == 1){
						subItemObj.right = item;
						newArr.push(subItemObj);
						subItemObj = {};
					}else {
						subItemObj.left = item;
					}
				});

				if(vm.dataSource.picUrlList.length % 2 == 1) {
					newArr.push(subItemObj);
				}
				
				vm.list = newArr;
			}
		}
	}


;module.exports.style = {
  "img-container": {
    "height": 192,
    "display": "flex",
    "flexDirection": "row",
    "marginBottom": 6
  },
  "img": {
    "width": 372,
    "height": 190
  },
  "second-image": {
    "marginLeft": 6
  },
  "single-img": {
    "width": 372,
    "height": 192,
    "display": "flex",
    "flexDirection": "column"
  },
  "img-list": {
    "marginBottom": 12
  },
  "bottom-border": {
    "height": 1,
    "backgroundColor": "#d9d9d9"
  },
  "bottom-border-light": {
    "height": 1,
    "backgroundColor": "#e7e7e7"
  }
}

;module.exports.template = {
  "type": "cell",
  "append": "tree",
  "classList": [
    "img-list"
  ],
  "shown": function () {return this.dataSource&&this.dataSource.picUrlList},
  "children": [
    {
      "type": "container",
      "classList": [
        "img-container"
      ],
      "repeat": function () {return this.list},
      "children": [
        {
          "type": "container",
          "classList": [
            "single-img"
          ],
          "children": [
            {
              "type": "image",
              "classList": [
                "img"
              ],
              "attr": {
                "src": function () {return this.left.image},
                "link": function () {return this.left.link}
              },
              "events": {
                "click": "openUrl"
              }
            },
            {
              "type": "container",
              "classList": [
                "bottom-border"
              ]
            },
            {
              "type": "container",
              "classList": [
                "bottom-border-light"
              ]
            }
          ]
        },
        {
          "type": "container",
          "shown": function () {return this.right},
          "classList": [
            "single-img",
            "second-image"
          ],
          "children": [
            {
              "type": "image",
              "classList": [
                "img"
              ],
              "attr": {
                "src": function () {return this.right.image},
                "link": function () {return this.right.link}
              },
              "events": {
                "click": "openUrl"
              }
            },
            {
              "type": "container",
              "classList": [
                "bottom-border"
              ]
            },
            {
              "type": "container",
              "classList": [
                "bottom-border-light"
              ]
            }
          ]
        }
      ]
    }
  ]
}

;})

// module

define('@weex-component/slider-view', function (require, exports, module) {

;
  module.exports = {
    data: function () {return {
      dataSource:{},
      autoPlay: true,
      shouldShowIndicator: true
    }},
    methods: {
      render:function (ds){
        var vm = this;

        vm.dataSource = ds;

        if(vm.dataSource && vm.dataSource.picUrlList) {
          vm.dataSource.picUrlList.forEach(function (item, index){
            item.index = index;
          });

          vm.shouldShowIndicator = vm.dataSource.picUrlList.length != 1;
        }

        this.$on('sliderStop', function (e) {
          vm.autoPlay = false;
        });

        this.$on('sliderStart', function (e) {
          vm.autoPlay = true;
        });
      },
      goTargetUrl:function (e){
        var index = e.target.attr.index;
        var vm = this;

        vm.$openURL(vm.dataSource.picUrlList[index].link);
      },
      onchange: function (e) {
      },
      appear: function (e) {
        var vm = this;
        vm.autoPlay = true;
      },
      disappear: function (e) {
        var vm = this;
        vm.autoPlay = false;
      }
    }
  }


;module.exports.style = {
  "slider": {
    "position": "relative",
    "width": 750,
    "height": 375,
    "backgroundColor": "#ffffff"
  },
  "slider-page": {
    "width": 750,
    "height": 375
  },
  "image-wrap": {
    "width": 750,
    "height": 375
  },
  "image": {
    "width": 750,
    "height": 375
  },
  "indicator": {
    "bottom": 18,
    "left": 0,
    "width": 750,
    "height": 20,
    "position": "absolute",
    "itemColor": "rgba(255,255,255, 0.4)",
    "itemSelectedColor": "#ff5000",
    "itemSize": 20,
    "justifyContent": "center",
    "alignItems": "center",
    "display": "flex"
  },
  "bottom-border": {
    "height": 1,
    "backgroundColor": "#d9d9d9"
  },
  "bottom-border-light": {
    "height": 1,
    "backgroundColor": "#e7e7e7",
    "marginBottom": 18
  }
}

;module.exports.template = {
  "type": "cell",
  "append": "tree",
  "shown": function () {return this.dataSource&&this.dataSource.picUrlList},
  "events": {
    "appear": "appear",
    "disappear": "disappear"
  },
  "children": [
    {
      "type": "slider",
      "classList": [
        "slider"
      ],
      "attr": {
        "interval": "2000",
        "autoPlay": function () {return this.autoPlay}
      },
      "events": {
        "change": "onchange"
      },
      "children": [
        {
          "type": "container",
          "repeat": function () {return this.dataSource.picUrlList},
          "classList": [
            "image-wrap"
          ],
          "events": {
            "click": "goTargetUrl"
          },
          "attr": {
            "index": function () {return this.index}
          },
          "children": [
            {
              "type": "image",
              "classList": [
                "image"
              ],
              "attr": {
                "src": function () {return this.image}
              }
            }
          ]
        },
        {
          "type": "indicator",
          "classList": [
            "indicator"
          ],
          "shown": function () {return this.shouldShowIndicator}
        }
      ]
    },
    {
      "type": "container",
      "classList": [
        "bottom-border"
      ]
    },
    {
      "type": "container",
      "classList": [
        "bottom-border-light"
      ]
    }
  ]
}

;})

// module

define('@weex-component/combine-test-lazy', function (require, exports, module) {

;
	module.exports = {
		methods: {
			appear: function () {
				this.$broadcast('sliderStart');
			},
			disappear: function () {
				this.$broadcast('sliderStop');
			},
			loadMore: function (e) {
				nativeLog('weexview', 'loadMore', this.shouldStop);
				if(this.shouldStop) {
					return;	
				}

				for(var i = 0; i < 6; i++) {
					var compVm = this.$vm('component-' + this.pointer);
					if(!compVm) {
						this.shouldStop = !0;
						return;
					}
					if(!compVm.render) {
						this.pointer++;
						continue;
					}
					compVm.render(this.ds[this.pointer]);
					this.pointer++;
				}
			}
		},
		ready: function () {
			var pageName = 'Page_Weex_Userdefine';
			//this.$userTrack('enter', pageName, null, {});

			for(var i = 0; i < 10; i ++) {
				var compVm = this.$vm('component-' + i);
				if(!compVm) {
					this.pointer++;
					break;
				}
				if(!compVm.render) {
					this.pointer++;
					continue;
				}
				compVm.render(this.ds[this.pointer]);
				this.pointer++;
			}

			this.shouldStop = false;
			nativeLog('weexview', 'initial load finished');
		},
		data: function () {return {
			 ds:[{
				//轮播
					picUrlList: [
						//
						{
				          image: 'http://img.alicdn.com/tps/TB1iUCPJXXXXXaBXVXXXXXXXXXX-1125-352.jpg',
				          link: '//h5.m.taobao.com/wirelessshop/decorator/view.html?userId=123&pageId=46&ttt=111&isMock=true#222222'
				        }, {
						image: "https://gw.alicdn.com/tps/i3/TB1RqA7HFXXXXbbXFXXrVZt0FXX-640-200.jpg",
						link: "//h5.wapa.taobao.com/wirelessshop/decorator/view_h5.html?userId=123&pageId=46&ttt=111&isMock=true#222222"
					},{
						image: "https://gw.alicdn.com/imgextra/i2/263662065/TB2VVk4jFXXXXbWXpXXXXXXXXXX_!!263662065.jpg",
						link: "//h5.m.taobao.com/wirelessshop/decorator/view.html?userId=123&pageId=46&ttt=111&isMock=true#222222"
					}
					]
				},{
					picUrlList: [
						//双列图片
					{
						image: "https://gw.alicdn.com/imgextra/i2/263662065/TB2VVk4jFXXXXbWXpXXXXXXXXXX_!!263662065.jpg",
						link: "//h5.m.taobao.com/wirelessshop/decorator/view.html?userId=123&pageId=46&ttt=111&isMock=true#222222"
					}, {
						image: "https://gw.alicdn.com/tps/i3/TB1RqA7HFXXXXbbXFXXrVZt0FXX-640-200.jpg",
						link: "//h5.wapa.taobao.com/wirelessshop/decorator/view_h5.html?userId=123&pageId=46&ttt=111&isMock=true#222222"
					}
					]
				},  {
				//单图
					picUrl:"https://img.alicdn.com/bao/uploaded/i3/TB1nFi2LpXXXXcNXpXXXXXXXXXX_!!0-item_pic.jpg_800x800q90.jpg",
			        textContent:"单图模块跳入新的weex页哈一二三四五六七八九十",
			        link:"https://h5.m.taobao.com/wirelessshop/decorator/view.html?userId=123&pageId=46&ttt=111&isMock=true#222222"
				}, {
				//标题
					content:"新品上架标题组件10字",
					link:"//shop.m.taobao.com/goods/index.htm?shop_id=116716739&user_id=2432558160&isNew=true"
				},{
				//文本1
					title: "文本模块文本带标题啦",
					content:"%E4%B8%8A%E9%99%90%E4%B8%80%E7%99%BE%E4%BA%94%E5%8D%81%E4%B8%AA%E5%AD%97%E6%B2%A1%E6%9C%89%E6%A0%87%E9%A2%98%E5%8F%AA%E6%9C%89%E6%96%87%E6%9C%AC%E7%9A%84%E6%96%87%E6%9C%AC%EF%BC%8C%E6%B2%A1%E6%9C%89%E6%A0%87%E9%A2%98%E5%8F%AA%E6%9C%89%E6%96%87%E6%9C%AC%E7%9A%84%E6%96%87%E6%9C%AC%EF%BC%8C%E6%B2%A1%E6%9C%89%E6%A0%87%E9%A2%98%E5%8F%AA%E6%9C%89%E6%96%87%E6%9C%AC%E7%9A%84%E6%96%87%E6%9C%AC%EF%BC%8C%E6%B2%A1%E6%9C%89%E6%A0%87%E9%A2%98%E5%8F%AA%E6%9C%89%E6%96%87%E6%9C%AC%E7%9A%84%E6%96%87%E6%9C%AC%EF%BC%8C%E6%B2%A1%E6%9C%89%E6%A0%87%E9%A2%98%E5%8F%AA%E6%9C%89%E6%96%87%E6%9C%AC%E7%9A%84%E6%96%87%E6%9C%AC%E6%B2%A1%E6%9C%89%E6%A0%87%E9%A2%98%E5%8F%AA%E6%9C%89%E6%96%87%E6%9C%AC%E7%9A%84%E6%96%87%E6%9C%AC%EF%BC%8C%E6%B2%A1%E6%9C%89%E6%A0%87%E9%A2%98%E5%8F%AA%E6%9C%89%E6%96%87%E6%9C%AC%E7%9A%84%E6%96%87%E6%9C%AC%EF%BC%8C~!%40%24%24%5E%5E%26*()_%20_)(*%26%5E%25%24%23%40!~%3C%3E%3F%3A%22%7B%7D%7C%7D%7C%7D%7B%3A%22%3F%3E%3C%2C.%2F%3B'%5B%5D%60%E6%9C%89%E6%A0%87"
				}, {
				//文本2
					content:"一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十"
				}, 
				{
				//文本3
					content:"文本模块--单行文字"
				},
				//双列宝贝
				{
					catId:"-1",
					isAuto:"true",
					ownerId: 263817957,
					pageSize:"6",
					sort:"oldstarts",
					userType:"1",
					title:"按上新排序按上新排序自动",
					moreLink:'http://h5.wapa.taobao.com/wirelessshop/activity/item-list.html?ownerId=2432558160&category=-1&isAuto=false&itemIds=528332806230,527262814712,524566103776,521187514021,521174811024,521190968475&pageSize=6&userType=1&title=%E5%AE%9D%E8%B4%9D%E6%8E%A8%E8%8D%908&sort=_bid'
				},{
					catId:"-1",
					isAuto:"true",
					ownerId:263817957,
					pageSize:"6",
					sort:"bid",
					userType:"1",
					title:"按价格从低到高"
				},{
					catId:"-1",
					isAuto:"true",
					ownerId: 263817957,
					pageSize:"6",
					sort:"coefp",
					userType:"1",
					title:"按人气排序"
				},{
					picUrlList: [
						//双列图片
					{
						image: "https://gw.alicdn.com/imgextra/i2/263662065/TB2VVk4jFXXXXbWXpXXXXXXXXXX_!!263662065.jpg",
						link: "//h5.m.taobao.com/wirelessshop/decorator/view.html?userId=123&pageId=46&ttt=111&isMock=true#222222"
					}, {
						image: "https://gw.alicdn.com/tps/i3/TB1RqA7HFXXXXbbXFXXrVZt0FXX-640-200.jpg",
						link: "//h5.wapa.taobao.com/wirelessshop/decorator/view_h5.html?userId=123&pageId=46&ttt=111&isMock=true#222222"
					}
					]
				},{
					picUrlList: [
						//双列图片
					{
						image: "https://gw.alicdn.com/imgextra/i2/263662065/TB2VVk4jFXXXXbWXpXXXXXXXXXX_!!263662065.jpg",
						link: "//h5.m.taobao.com/wirelessshop/decorator/view.html?userId=123&pageId=46&ttt=111&isMock=true#222222"
					}, {
						image: "https://gw.alicdn.com/tps/i3/TB1RqA7HFXXXXbbXFXXrVZt0FXX-640-200.jpg",
						link: "//h5.wapa.taobao.com/wirelessshop/decorator/view_h5.html?userId=123&pageId=46&ttt=111&isMock=true#222222"
					}
					]
				},{
					catId:"-1",
					isAuto:"true",
					ownerId: 263817957,
					pageSize:"6",
					sort:"hotsell",
					userType:"1",
					title:"按销量排序"
				},{
					catId:"-1",
					isAuto:"true",
					ownerId: 263817957,
					pageSize:"6",
					sort:"ordercost",
					userType:"1",
					title:"按收藏数排序"
				},{
					catId:"-1",
					isAuto:"true",
					itemIds:"524678768041,523228917824",
					ownerId: 263817957,
					pageSize:"6",
					sort:"ordercost",
					userType:"1",
					title:"自动推荐的宝贝20个不取itemId"
				},{
					picUrlList: [
						//双列图片
					{
						image: "https://gw.alicdn.com/imgextra/i2/263662065/TB2VVk4jFXXXXbWXpXXXXXXXXXX_!!263662065.jpg",
						link: "//h5.m.taobao.com/wirelessshop/decorator/view.html?userId=123&pageId=46&ttt=111&isMock=true#222222"
					}, {
						image: "https://gw.alicdn.com/tps/i3/TB1RqA7HFXXXXbbXFXXrVZt0FXX-640-200.jpg",
						link: "//h5.wapa.taobao.com/wirelessshop/decorator/view_h5.html?userId=123&pageId=46&ttt=111&isMock=true#222222"
					}
					]
				},{
					picUrlList: [
						//双列图片
					{
						image: "https://gw.alicdn.com/imgextra/i2/263662065/TB2VVk4jFXXXXbWXpXXXXXXXXXX_!!263662065.jpg",
						link: "//h5.m.taobao.com/wirelessshop/decorator/view.html?userId=123&pageId=46&ttt=111&isMock=true#222222"
					}, {
						image: "https://gw.alicdn.com/tps/i3/TB1RqA7HFXXXXbbXFXXrVZt0FXX-640-200.jpg",
						link: "//h5.wapa.taobao.com/wirelessshop/decorator/view_h5.html?userId=123&pageId=46&ttt=111&isMock=true#222222"
					}
					]
				},
				//标题
				{
					content:"h5的weex链接，直接点此适配既可",
					link:"//h5.m.taobao.com/wirelessshop/decorator/view_h5.html?userId=123&pageId=46&ttt=111&isMock=true#222222"
				},
				//双列图 
				{picUrlList:[{
						image: "https://img.alicdn.com/imgextra/i4/2432558160/TB2Q8o5lXXXXXcLXpXXXXXXXXXX_!!2432558160.jpg",
						link: "https://h5.m.taobao.com/wirelessshop/decorator/view.html?userId=123&pageId=46&ttt=111&isMock=true#222222"
					},{
						image: "https://img.alicdn.com/imgextra/i2/2432558160/TB2duN3eFXXXXbIXXXXXXXXXXXX-2432558160.jpg",
						link: "//h5.m.taobao.com/wirelessshop/decorator/view.html?userId=123&pageId=46&ttt=111&isMock=true#222222"
					}]
				}, {
				//文本1
					title: "文本模块文本带标题啦",
					content:"%E4%B8%8A%E9%99%90%E4%B8%80%E7%99%BE%E4%BA%94%E5%8D%81%E4%B8%AA%E5%AD%97%E6%B2%A1%E6%9C%89%E6%A0%87%E9%A2%98%E5%8F%AA%E6%9C%89%E6%96%87%E6%9C%AC%E7%9A%84%E6%96%87%E6%9C%AC%EF%BC%8C%E6%B2%A1%E6%9C%89%E6%A0%87%E9%A2%98%E5%8F%AA%E6%9C%89%E6%96%87%E6%9C%AC%E7%9A%84%E6%96%87%E6%9C%AC%EF%BC%8C%E6%B2%A1%E6%9C%89%E6%A0%87%E9%A2%98%E5%8F%AA%E6%9C%89%E6%96%87%E6%9C%AC%E7%9A%84%E6%96%87%E6%9C%AC%EF%BC%8C%E6%B2%A1%E6%9C%89%E6%A0%87%E9%A2%98%E5%8F%AA%E6%9C%89%E6%96%87%E6%9C%AC%E7%9A%84%E6%96%87%E6%9C%AC%EF%BC%8C%E6%B2%A1%E6%9C%89%E6%A0%87%E9%A2%98%E5%8F%AA%E6%9C%89%E6%96%87%E6%9C%AC%E7%9A%84%E6%96%87%E6%9C%AC%E6%B2%A1%E6%9C%89%E6%A0%87%E9%A2%98%E5%8F%AA%E6%9C%89%E6%96%87%E6%9C%AC%E7%9A%84%E6%96%87%E6%9C%AC%EF%BC%8C%E6%B2%A1%E6%9C%89%E6%A0%87%E9%A2%98%E5%8F%AA%E6%9C%89%E6%96%87%E6%9C%AC%E7%9A%84%E6%96%87%E6%9C%AC%EF%BC%8C~!%40%24%24%5E%5E%26*()_%20_)(*%26%5E%25%24%23%40!~%3C%3E%3F%3A%22%7B%7D%7C%7D%7C%7D%7B%3A%22%3F%3E%3C%2C.%2F%3B'%5B%5D%60%E6%9C%89%E6%A0%87"
				},{
				//轮播
					picUrlList: [
						//
						{
				          image: 'http://img.alicdn.com/tps/TB1iUCPJXXXXXaBXVXXXXXXXXXX-1125-352.jpg',
				          link: '//h5.m.taobao.com/wirelessshop/decorator/view.html?userId=123&pageId=46&ttt=111&isMock=true#222222'
				        }, {
						image: "https://gw.alicdn.com/tps/i3/TB1RqA7HFXXXXbbXFXXrVZt0FXX-640-200.jpg",
						link: "//h5.wapa.taobao.com/wirelessshop/decorator/view_h5.html?userId=123&pageId=46&ttt=111&isMock=true#222222"
					},{
						image: "https://gw.alicdn.com/imgextra/i2/263662065/TB2VVk4jFXXXXbWXpXXXXXXXXXX_!!263662065.jpg",
						link: "//h5.m.taobao.com/wirelessshop/decorator/view.html?userId=123&pageId=46&ttt=111&isMock=true#222222"
					}
					]
				},{
					picUrlList: [
						//双列图片
					{
						image: "https://gw.alicdn.com/imgextra/i2/263662065/TB2VVk4jFXXXXbWXpXXXXXXXXXX_!!263662065.jpg",
						link: "//h5.m.taobao.com/wirelessshop/decorator/view.html?userId=123&pageId=46&ttt=111&isMock=true#222222"
					}, {
						image: "https://gw.alicdn.com/tps/i3/TB1RqA7HFXXXXbbXFXXrVZt0FXX-640-200.jpg",
						link: "//h5.wapa.taobao.com/wirelessshop/decorator/view_h5.html?userId=123&pageId=46&ttt=111&isMock=true#222222"
					}
					]
				},  {
				//单图
					picUrl:"https://img.alicdn.com/bao/uploaded/i3/TB1nFi2LpXXXXcNXpXXXXXXXXXX_!!0-item_pic.jpg_800x800q90.jpg",
			        textContent:"单图模块跳入新的weex页哈一二三四五六七八九十",
			        link:"https://h5.m.taobao.com/wirelessshop/decorator/view.html?userId=123&pageId=46&ttt=111&isMock=true#222222"
				},{
					picUrlList: [
						//双列图片
					{
						image: "https://gw.alicdn.com/imgextra/i2/263662065/TB2VVk4jFXXXXbWXpXXXXXXXXXX_!!263662065.jpg",
						link: "//h5.m.taobao.com/wirelessshop/decorator/view.html?userId=123&pageId=46&ttt=111&isMock=true#222222"
					}, {
						image: "https://gw.alicdn.com/tps/i3/TB1RqA7HFXXXXbbXFXXrVZt0FXX-640-200.jpg",
						link: "//h5.wapa.taobao.com/wirelessshop/decorator/view_h5.html?userId=123&pageId=46&ttt=111&isMock=true#222222"
					}
					]
				},{
					catId:"-1",
					isAuto:"false",
					itemIds:"520713326108,520363618454,520437830060,520713470197,520531176914,520866886905",
					ownerId: 263817957,
					auctionTag: 0,
					startPrice: 0,
					endPrice: 1000,
					pageSize:"6",
					sort:"oldstarts",
					userType:"1",
					title:"手动推荐20个宝贝"
				},
				{
					//双列宝贝
					catId:"-1",
					isAuto:"false",
					itemIds:"526036966670,524612287875,520713835002,524684228630,524686544668",
					ownerId: 196993935,
					pageId: 1369583,
					pageSize:"6",
					sort:"oldstarts",
					//userType:"1"
				}, {
				//文本2
					content:"一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十"
				}, 
				{
				//文本3
					content:"文本模块--单行文字"
				},{
					picUrlList: [
						//双列图片
					{
						image: "https://gw.alicdn.com/imgextra/i2/263662065/TB2VVk4jFXXXXbWXpXXXXXXXXXX_!!263662065.jpg",
						link: "//h5.m.taobao.com/wirelessshop/decorator/view.html?userId=123&pageId=46&ttt=111&isMock=true#222222"
					}, {
						image: "https://gw.alicdn.com/tps/i3/TB1RqA7HFXXXXbbXFXXrVZt0FXX-640-200.jpg",
						link: "//h5.wapa.taobao.com/wirelessshop/decorator/view_h5.html?userId=123&pageId=46&ttt=111&isMock=true#222222"
					}
					]
				},  {
				//单图
					picUrl:"https://img.alicdn.com/bao/uploaded/i3/TB1nFi2LpXXXXcNXpXXXXXXXXXX_!!0-item_pic.jpg_800x800q90.jpg",
			        textContent:"单图模块跳入新的weex页哈一二三四五六七八九十",
			        link:"https://h5.m.taobao.com/wirelessshop/decorator/view.html?userId=123&pageId=46&ttt=111&isMock=true#222222"
				}, {
				//标题
					content:"新品上架标题组件10字",
					link:"//shop.m.taobao.com/goods/index.htm?shop_id=116716739&user_id=2432558160&isNew=true"
				}
			],
			dataSource:[],
			pointer: 0,
			shouldStop: true
		}}
	}


;module.exports.style = {
  "container": {
    "width": 750,
    "backgroundColor": "#eeeeee"
  },
  "main-area": {
    "display": "flex",
    "flexDirection": "column",
    "paddingBottom": 50
  },
  "sub-area": {
    "display": "flex",
    "flexDirection": "column"
  },
  "last-container": {
    "height": 1,
    "width": 750
  }
}

;module.exports.template = {
  "type": "list",
  "classList": [
    "container"
  ],
  "attr": {
    "loadmoreoffset": "960",
    "showScrollbar": "false"
  },
  "events": {
    "loadmore": "loadMore",
    "appear": "appear",
    "disappear": "disappear"
  },
  "children": [
    {
      "type": "container",
      "classList": [
        "main-area"
      ],
      "children": [
        {
          "type": "slider-view",
          "id": "component-0"
        },
        {
          "type": "double-image",
          "id": "component-1"
        },
        {
          "type": "single-image",
          "id": "component-2"
        },
        {
          "type": "title-view",
          "id": "component-3"
        },
        {
          "type": "text-view",
          "id": "component-4"
        },
        {
          "type": "text-view",
          "id": "component-5"
        },
        {
          "type": "text-view",
          "id": "component-6"
        },
        {
          "type": "double-item",
          "id": "component-7"
        },
        {
          "type": "double-item",
          "id": "component-8"
        },
        {
          "type": "double-item",
          "id": "component-9"
        },
        {
          "type": "double-image",
          "id": "component-10"
        },
        {
          "type": "double-image",
          "id": "component-11"
        },
        {
          "type": "double-item",
          "id": "component-12"
        },
        {
          "type": "double-item",
          "id": "component-13"
        },
        {
          "type": "double-item",
          "id": "component-14"
        },
        {
          "type": "double-image",
          "id": "component-15"
        },
        {
          "type": "double-image",
          "id": "component-16"
        },
        {
          "type": "title-view",
          "id": "component-17"
        },
        {
          "type": "double-image",
          "id": "component-18"
        },
        {
          "type": "text-view",
          "id": "component-19"
        },
        {
          "type": "slider-view",
          "id": "component-20"
        },
        {
          "type": "double-image",
          "id": "component-21"
        },
        {
          "type": "single-image",
          "id": "component-22"
        },
        {
          "type": "double-image",
          "id": "component-23"
        },
        {
          "type": "double-item",
          "id": "component-24"
        },
        {
          "type": "double-item",
          "id": "component-25"
        },
        {
          "type": "text-view",
          "id": "component-26"
        },
        {
          "type": "text-view",
          "id": "component-27"
        },
        {
          "type": "double-image",
          "id": "component-28"
        },
        {
          "type": "single-image",
          "id": "component-29"
        },
        {
          "type": "title-view",
          "id": "component-30"
        }
      ]
    }
  ]
}

;})

// require module
bootstrap('@weex-component/combine-test-lazy', {"transformerVersion":"0.1.7"})