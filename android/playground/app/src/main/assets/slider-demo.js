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

	;__weex_define__("@weex-component/f7610e63687fc893d4a73400a4378d49", [], function(__weex_require__, __weex_exports__, __weex_module__){
	__webpack_require__(11);

	;
	  __webpack_require__(1);
	  var img0 = '//gw.alicdn.com/tps/i2/TB1DpsmMpXXXXabaXXX20ySQVXX-512-512.png_400x400.jpg';
	  var img1 = '//gw.alicdn.com/tps/i1/TB1M3sQMpXXXXakXXXXApNeJVXX-360-360.png';
	  __weex_module__.exports = {
	    data: function () {return {
	      eventCnt: 0,
	      togglePlayMsg: 'pause',
	      sliders: [
	        {
	          interval: 1000,
	          autoPlay: true,
	          sliderPages: [
	            {
	              items: [
	                {
	                  image: img0,
	                  link: '//h5.m.taobao.com/1'
	                },
	                {
	                  image: img0,
	                  link: '//h5.m.taobao.com/1'
	                }
	              ]
	            },
	            {
	              items: [
	                {
	                  image: img1,
	                  link: '//h5.m.taobao.com/1'
	                },
	                {
	                  image: img1,
	                  link: '//h5.m.taobao.com/1'
	                }
	              ]
	            },
	            {
	              items: [
	                {
	                  image: img0,
	                  link: '//h5.m.taobao.com/1'
	                },
	                {
	                  image: img1,
	                  link: '//h5.m.taobao.com/1'
	                }
	              ]
	            }
	          ]
	        },
	        {
	          interval: 3000,
	          autoPlay: true,
	          sliderPages: [
	            {
	              items: [
	                {
	                  image: img0,
	                  link: '//h5.m.taobao.com/1'
	                },
	                {
	                  image: img0,
	                  link: '//h5.m.taobao.com/1'
	                }
	              ]
	            },
	            {
	              items: [
	                {
	                  image: img1,
	                  link: '//h5.m.taobao.com/1'
	                },
	                {
	                  image: img1,
	                  link: '//h5.m.taobao.com/1'
	                }
	              ]
	            },
	            {
	              items: [
	                {
	                  image: img0,
	                  link: '//h5.m.taobao.com/1'
	                },
	                {
	                  image: img1,
	                  link: '//h5.m.taobao.com/1'
	                }
	              ]
	            }
	          ]
	        },
	        {
	          interval: 5000,
	          autoPlay: true,
	          sliderPages: [
	            {
	              items: [
	                {
	                  image: img0,
	                  link: '//h5.m.taobao.com/1'
	                },
	                {
	                  image: img0,
	                  link: '//h5.m.taobao.com/1'
	                }
	              ]
	            },
	            {
	              items: [
	                {
	                  image: img1,
	                  link: '//h5.m.taobao.com/1'
	                },
	                {
	                  image: img1,
	                  link: '//h5.m.taobao.com/1'
	                }
	              ]
	            },
	            {
	              items: [
	                {
	                  image: img0,
	                  link: '//h5.m.taobao.com/1'
	                },
	                {
	                  image: img1,
	                  link: '//h5.m.taobao.com/1'
	                }
	              ]
	            }
	          ]
	        }
	      ]
	    }},
	    methods: {
	      ready: function() {
	      },
	      togglePlay: function() {
	        var autoPlay = this.sliders[0].autoPlay
	        autoPlay = !autoPlay
	        this.sliders[0].autoPlay = autoPlay
	        this.togglePlayMsg = autoPlay ? 'pause' : 'play'
	      },
	      handleSliderChange: function() {
	        var nowCnt = this.eventCnt + 1
	        this.eventCnt = nowCnt
	      },
	      setInterval1: function() {
	        this.sliders[0].interval = 1000;
	      },
	      setInterval3: function() {
	        this.sliders[0].interval = 3000;
	      },
	      setInterval5: function() {
	        this.sliders[0].interval = 5000;
	      }
	    }
	  };

	;__weex_module__.exports.template={
	  "type": "scroller",
	  "classList": [
	    "body"
	  ],
	  "children": [
	    {
	      "type": "ui-panel",
	      "attr": {
	        "title": "auto-play",
	        "type": "primary"
	      },
	      "children": [
	        {
	          "type": "ui-panel",
	          "attr": {
	            "title": "auto-play = false",
	            "paddingBody": "0"
	          },
	          "children": [
	            {
	              "type": "slider",
	              "classList": [
	                "slider"
	              ],
	              "append": "tree",
	              "attr": {
	                "interval": function () {return this.sliders[1].interval},
	                "autoPlay": "false"
	              },
	              "children": [
	                {
	                  "type": "indicator",
	                  "classList": [
	                    "indicator"
	                  ]
	                },
	                {
	                  "type": "slider-page",
	                  "repeat": function () {return this.sliders[1].sliderPages}
	                }
	              ]
	            }
	          ]
	        },
	        {
	          "type": "ui-panel",
	          "attr": {
	            "title": "auto-play = true",
	            "paddingBody": "0"
	          },
	          "children": [
	            {
	              "type": "slider",
	              "classList": [
	                "slider"
	              ],
	              "append": "tree",
	              "attr": {
	                "interval": function () {return this.sliders[0].interval},
	                "autoPlay": function () {return this.sliders[0].autoPlay}
	              },
	              "children": [
	                {
	                  "type": "indicator",
	                  "classList": [
	                    "indicator"
	                  ]
	                },
	                {
	                  "type": "slider-page",
	                  "repeat": function () {return this.sliders[0].sliderPages}
	                }
	              ]
	            }
	          ]
	        }
	      ]
	    },
	    {
	      "type": "ui-panel",
	      "attr": {
	        "title": function () {return 'Event, ' + (this.eventCnt) + ' change'},
	        "type": "primary"
	      },
	      "children": [
	        {
	          "type": "slider",
	          "classList": [
	            "slider"
	          ],
	          "append": "tree",
	          "attr": {
	            "interval": function () {return this.sliders[0].interval},
	            "autoPlay": function () {return this.sliders[0].autoPlay}
	          },
	          "events": {
	            "change": "handleSliderChange"
	          },
	          "children": [
	            {
	              "type": "indicator",
	              "classList": [
	                "indicator"
	              ]
	            },
	            {
	              "type": "slider-page",
	              "repeat": function () {return this.sliders[0].sliderPages}
	            }
	          ]
	        }
	      ]
	    },
	    {
	      "type": "ui-panel",
	      "attr": {
	        "title": "Indicator",
	        "type": "primary"
	      },
	      "children": [
	        {
	          "type": "ui-panel",
	          "attr": {
	            "title": "default style",
	            "paddingBody": "0"
	          },
	          "children": [
	            {
	              "type": "slider",
	              "classList": [
	                "slider"
	              ],
	              "append": "tree",
	              "attr": {
	                "interval": function () {return this.sliders[0].interval},
	                "autoPlay": function () {return this.sliders[0].autoPlay}
	              },
	              "events": {
	                "change": "handleSliderChange"
	              },
	              "children": [
	                {
	                  "type": "indicator",
	                  "classList": [
	                    "indicator"
	                  ]
	                },
	                {
	                  "type": "slider-page",
	                  "repeat": function () {return this.sliders[0].sliderPages}
	                }
	              ]
	            }
	          ]
	        },
	        {
	          "type": "ui-panel",
	          "attr": {
	            "title": "width & height",
	            "paddingBody": "0"
	          },
	          "children": [
	            {
	              "type": "slider",
	              "classList": [
	                "slider"
	              ],
	              "append": "tree",
	              "attr": {
	                "interval": function () {return this.sliders[0].interval},
	                "autoPlay": function () {return this.sliders[0].autoPlay}
	              },
	              "children": [
	                {
	                  "type": "indicator",
	                  "style": {
	                    "itemColor": "#dddddd",
	                    "width": 714,
	                    "height": 460
	                  }
	                },
	                {
	                  "type": "slider-page",
	                  "repeat": function () {return this.sliders[0].sliderPages}
	                }
	              ]
	            }
	          ]
	        },
	        {
	          "type": "ui-panel",
	          "attr": {
	            "title": "left & top",
	            "paddingBody": "0"
	          },
	          "children": [
	            {
	              "type": "slider",
	              "classList": [
	                "slider"
	              ],
	              "append": "tree",
	              "attr": {
	                "interval": function () {return this.sliders[1].interval},
	                "autoPlay": function () {return this.sliders[1].autoPlay}
	              },
	              "children": [
	                {
	                  "type": "indicator",
	                  "classList": [
	                    "indicator"
	                  ],
	                  "style": {
	                    "top": -140,
	                    "left": -240
	                  }
	                },
	                {
	                  "type": "slider-page",
	                  "repeat": function () {return this.sliders[1].sliderPages}
	                }
	              ]
	            }
	          ]
	        },
	        {
	          "type": "ui-panel",
	          "attr": {
	            "title": "itemColor & itemSelectedColor",
	            "paddingBody": "0"
	          },
	          "children": [
	            {
	              "type": "slider",
	              "classList": [
	                "slider"
	              ],
	              "append": "tree",
	              "attr": {
	                "interval": function () {return this.sliders[2].interval},
	                "autoPlay": function () {return this.sliders[2].autoPlay}
	              },
	              "children": [
	                {
	                  "type": "indicator",
	                  "classList": [
	                    "indicator"
	                  ],
	                  "style": {
	                    "itemSelectedColor": "rgb(217, 83, 79)"
	                  }
	                },
	                {
	                  "type": "slider-page",
	                  "repeat": function () {return this.sliders[2].sliderPages}
	                }
	              ]
	            }
	          ]
	        },
	        {
	          "type": "ui-panel",
	          "attr": {
	            "title": "itemSize",
	            "paddingBody": "0"
	          },
	          "children": [
	            {
	              "type": "slider",
	              "classList": [
	                "slider"
	              ],
	              "append": "tree",
	              "attr": {
	                "interval": function () {return this.sliders[1].interval},
	                "autoPlay": function () {return this.sliders[1].autoPlay}
	              },
	              "children": [
	                {
	                  "type": "indicator",
	                  "style": {
	                    "itemColor": "#dddddd",
	                    "itemSize": 40,
	                    "top": 140,
	                    "left": 180,
	                    "width": 700,
	                    "height": 380
	                  }
	                },
	                {
	                  "type": "slider-page",
	                  "repeat": function () {return this.sliders[1].sliderPages}
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
	  "body": {
	    "backgroundColor": "#ffffff"
	  },
	  "slider": {
	    "flexDirection": "row",
	    "width": 690,
	    "height": 360
	  },
	  "indicator": {
	    "position": "absolute",
	    "width": 690,
	    "height": 420,
	    "top": 140,
	    "left": 240,
	    "itemColor": "#dddddd",
	    "itemSelectedColor": "rgb(40, 96, 144)"
	  }
	}
	})
	;__weex_bootstrap__("@weex-component/f7610e63687fc893d4a73400a4378d49", {"transformerVersion":"0.3.1"}, undefined)

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

	})

/***/ },
/* 2 */
/***/ function(module, exports) {

	;__weex_define__("@weex-component/ui-button", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	  __weex_module__.exports = {
	    data: function () {return {
	      type: 'default',
	      size: 'large',
	      value: '',
	      click: null,
	      disabled: false
	    }},
	    methods: {
	      clicked: function(ev) {
	        if (this.disabled) return;
	        this.click(ev);
	      }
	    }
	  }

	;__weex_module__.exports.template={
	  "type": "div",
	  "classList": function () {return ['btn', 'btn-' + (this.type), 'btn-sz-' + (this.size)]},
	  "events": {
	    "click": "clicked"
	  },
	  "style": {},
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

	;__weex_define__("@weex-component/ui-hn", [], function(__weex_require__, __weex_exports__, __weex_module__){

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

	;__weex_define__("@weex-component/ui-list-item", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	  __weex_module__.exports = {
	    data: function () {return {
	      bgColor: '#ffffff',
	      click: function() {
	      }
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
	    "click": "click",
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

	;__weex_define__("@weex-component/ui-panel", [], function(__weex_require__, __weex_exports__, __weex_module__){

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
	      console.log(this.data);
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

	;__weex_define__("@weex-component/ui-tip", [], function(__weex_require__, __weex_exports__, __weex_module__){

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
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	;__weex_define__("@weex-component/slider-page", [], function(__weex_require__, __weex_exports__, __weex_module__){
	__webpack_require__(12);

	;
	  __weex_module__.exports = {
	    data: function () {return {
	      items: [],
	      sliderItems: []
	    }},
	    methods: {
	      ready: function() {
	        this.sliderItems = this.getSliderItems()
	      },
	      getSliderItems: function() {
	        return this.items.map(function(item, index) {
	          return item;
	        }.bind(this));
	      }
	    }
	  };

	;__weex_module__.exports.template={
	  "type": "div",
	  "classList": [
	    "slider-page"
	  ],
	  "children": [
	    {
	      "type": "slider-item",
	      "repeat": function () {return this.sliderItems}
	    }
	  ]
	}
	;__weex_module__.exports.style={
	  "slider-page": {
	    "flexDirection": "row",
	    "justifyContent": "space-between",
	    "width": 714,
	    "height": 420
	  }
	}
	})

/***/ },
/* 12 */
/***/ function(module, exports) {

	;__weex_define__("@weex-component/slider-item", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	  __weex_module__.exports = {
	    data: function () {return {
	      image: '',
	      link: '',
	      href: ''
	    }},
	    methods: {
	      ready: function() {
	        this.href = this.link;
	      }
	    }
	  };

	;__weex_module__.exports.template={
	  "type": "image",
	  "classList": [
	    "slider-item"
	  ],
	  "attr": {
	    "src": function () {return this.image}
	  }
	}
	;__weex_module__.exports.style={
	  "slider-item": {
	    "width": 348,
	    "height": 400
	  }
	}
	})

/***/ }
/******/ ]);