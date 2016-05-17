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

	;__weex_define__("@weex-component/88c0bfc819749aa96853318546d70e47", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	  __weex_module__.exports = {
	    data: function () {return {
	      block: {
	        moving: false,
	        width: 100,
	        height: 100,
	        left: 300,
	        top: 500,
	        backgroundColor: 'red'
	      },
	      keys: [
	        'pageX', 'pageY', 'screenX', 'screenY', 'identifier'
	      ],
	      infos: {
	        touchstart: {
	          changedTouches: 0,
	          display: true,
	          pageX: -1,
	          pageY: -1,
	          screenX: -1,
	          screenY: -1,
	          identifier: 0
	        },
	        touchmove: {
	          changedTouches: 0,
	          display: true,
	          pageX: -1,
	          pageY: -1,
	          screenX: -1,
	          screenY: -1,
	          identifier: 0
	        },
	        touchend: {
	          changedTouches: 0,
	          display: true,
	          pageX: -1,
	          pageY: -1,
	          screenX: -1,
	          screenY: -1,
	          identifier: 0
	        },
	        panstart: {
	          changedTouches: 0,
	          display: true,
	          pageX: -1,
	          pageY: -1,
	          screenX: -1,
	          screenY: -1,
	          identifier: 0
	        },
	        panmove: {
	          changedTouches: 0,
	          display: true,
	          pageX: -1,
	          pageY: -1,
	          screenX: -1,
	          screenY: -1,
	          identifier: 0
	        },
	        panend: {
	          changedTouches: 0,
	          display: true,
	          pageX: -1,
	          pageY: -1,
	          screenX: -1,
	          screenY: -1,
	          identifier: 0
	        },
	        longpress: {
	          changedTouches: 0,
	          display: true,
	          pageX: -1,
	          pageY: -1,
	          screenX: -1,
	          screenY: -1,
	          identifier: 0
	        }
	      }
	    }},
	    methods: {
	      clearTouchData: function(type) {
	        var vm = this;
	        vm.infos[type].display = true;
	        vm.infos[type].changedTouches = 0;
	        vm.keys.forEach(function(key) {
	          vm.infos[type][key] = -1;
	        });
	      },
	      setTouchData: function(type, data) {
	        var vm = this;
	        nativeLog(type)
	        vm.infos[type].display = true;
	        vm.infos[type].changedTouches = data.changedTouches.length;

	        var touch = data.changedTouches[0];
	        if (touch) {
	          vm.keys.forEach(function(key) {
	            vm.infos[type][key] = touch[key]
	          })
	        } else {
	          vm.clearTouchData(type)
	        }
	      },
	      checkIfOnBlock: function(e) {
	        var touch = e.changedTouches[0];
	        return (touch.pageX > this.block.left 
	              && touch.pageX < this.block.left + this.block.width 
	              && touch.pageY > this.block.top
	              && touch.pageY < this.block.top + this.block.height);
	      },
	      touchstartHandler: function (e) {
	        // this.clearTouchData('touchmove')
	        // this.clearTouchData('touchend')
	        this.setTouchData('touchstart', e);
	      },
	      touchmoveHandler: function(e) {
	        // this.clearTouchData('touchstart')
	        this.setTouchData('touchmove', e);
	      },
	      touchendHandler: function(e) {
	        // this.clearTouchData('touchmove')
	        this.setTouchData('touchend', e);
	      },
	      panstartHandler: function(e) {
	        // this.clearTouchData('panmove')
	        // this.clearTouchData('panend')
	        this.setTouchData('panstart', e);
	        if (this.checkIfOnBlock(e)) {
	          this.block.moving = true;
	          var touch = e.changedTouches[0];
	          this.block.lastX = touch.pageX;
	          this.block.lastY = touch.pageY;
	        }
	      },
	      panmoveHandler: function(e) {
	        // this.clearTouchData('panstart')
	        this.setTouchData('panmove', e);
	        if (this.block.moving) {
	          var touch = e.changedTouches[0];
	          this.block.left += touch.pageX - this.block.lastX;
	          this.block.top += touch.pageY - this.block.lastY;
	          this.block.lastX = touch.pageX;
	          this.block.lastY = touch.pageY;
	        }
	      },
	      panendHandler: function(e) {
	        // this.clearTouchData('panmove')
	        this.setTouchData('panend', e);
	        this.block.moving = false;
	      },
	      longpressHandler: function(e) {
	        // this.clearTouchData('touchstart')
	        // this.clearTouchData('touchmove')
	        // this.clearTouchData('panstart')
	        this.setTouchData('longpress', e);
	        var r = parseInt(Math.random() * 255);
	        var g = parseInt(Math.random() * 255);
	        var b = parseInt(Math.random() * 255);
	        this.block.backgroundColor = 'rgb(' + [r,g,b].join(',') + ')';
	      }
	    }
	  }

	;__weex_module__.exports.template={
	  "type": "div",
	  "style": {
	    "height": 2000
	  },
	  "events": {
	    "touchstart": "touchstartHandler",
	    "touchmove": "touchmoveHandler",
	    "touchend": "touchendHandler",
	    "panstart": "panstartHandler",
	    "panmove": "panmoveHandler",
	    "panend": "panendHandler",
	    "longpress": "longpressHandler"
	  },
	  "children": [
	    {
	      "type": "div",
	      "shown": function () {return this.infos.touchstart.display},
	      "children": [
	        {
	          "type": "text",
	          "classList": [
	            "title"
	          ],
	          "attr": {
	            "value": "touchstart"
	          }
	        },
	        {
	          "type": "div",
	          "children": [
	            {
	              "type": "div",
	              "classList": [
	                "row"
	              ],
	              "children": [
	                {
	                  "type": "text",
	                  "classList": [
	                    "item"
	                  ],
	                  "attr": {
	                    "value": function () {return 'the count of touch: ' + (this.infos.touchstart.changedTouches)}
	                  }
	                },
	                {
	                  "type": "text",
	                  "classList": [
	                    "item"
	                  ],
	                  "attr": {
	                    "value": function () {return 'identifier: ' + (this.infos.touchstart.identifier)}
	                  }
	                }
	              ]
	            },
	            {
	              "type": "div",
	              "classList": [
	                "row"
	              ],
	              "children": [
	                {
	                  "type": "text",
	                  "classList": [
	                    "item"
	                  ],
	                  "attr": {
	                    "value": function () {return 'pageX: ' + (this.infos.touchstart.pageX)}
	                  }
	                },
	                {
	                  "type": "text",
	                  "classList": [
	                    "item"
	                  ],
	                  "attr": {
	                    "value": function () {return 'pageY: ' + (this.infos.touchstart.pageY)}
	                  }
	                }
	              ]
	            },
	            {
	              "type": "div",
	              "classList": [
	                "row"
	              ],
	              "children": [
	                {
	                  "type": "text",
	                  "classList": [
	                    "item"
	                  ],
	                  "attr": {
	                    "value": function () {return 'screenX: ' + (this.infos.touchstart.screenX)}
	                  }
	                },
	                {
	                  "type": "text",
	                  "classList": [
	                    "item"
	                  ],
	                  "attr": {
	                    "value": function () {return 'screenY: ' + (this.infos.touchstart.screenY)}
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
	      "shown": function () {return this.infos.touchmove.display},
	      "children": [
	        {
	          "type": "text",
	          "classList": [
	            "title"
	          ],
	          "attr": {
	            "value": "touchmove"
	          }
	        },
	        {
	          "type": "div",
	          "children": [
	            {
	              "type": "div",
	              "classList": [
	                "row"
	              ],
	              "children": [
	                {
	                  "type": "text",
	                  "classList": [
	                    "item"
	                  ],
	                  "attr": {
	                    "value": function () {return 'the count of touch: ' + (this.infos.touchmove.changedTouches)}
	                  }
	                },
	                {
	                  "type": "text",
	                  "classList": [
	                    "item"
	                  ],
	                  "attr": {
	                    "value": function () {return 'identifier: ' + (this.infos.touchmove.identifier)}
	                  }
	                }
	              ]
	            },
	            {
	              "type": "div",
	              "classList": [
	                "row"
	              ],
	              "children": [
	                {
	                  "type": "text",
	                  "classList": [
	                    "item"
	                  ],
	                  "attr": {
	                    "value": function () {return 'pageX: ' + (this.infos.touchmove.pageX)}
	                  }
	                },
	                {
	                  "type": "text",
	                  "classList": [
	                    "item"
	                  ],
	                  "attr": {
	                    "value": function () {return 'pageY: ' + (this.infos.touchmove.pageY)}
	                  }
	                }
	              ]
	            },
	            {
	              "type": "div",
	              "classList": [
	                "row"
	              ],
	              "children": [
	                {
	                  "type": "text",
	                  "classList": [
	                    "item"
	                  ],
	                  "attr": {
	                    "value": function () {return 'screenX: ' + (this.infos.touchmove.screenX)}
	                  }
	                },
	                {
	                  "type": "text",
	                  "classList": [
	                    "item"
	                  ],
	                  "attr": {
	                    "value": function () {return 'screenY: ' + (this.infos.touchmove.screenY)}
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
	      "shown": function () {return this.infos.touchend.display},
	      "children": [
	        {
	          "type": "text",
	          "classList": [
	            "title"
	          ],
	          "attr": {
	            "value": "touchend"
	          }
	        },
	        {
	          "type": "div",
	          "children": [
	            {
	              "type": "div",
	              "classList": [
	                "row"
	              ],
	              "children": [
	                {
	                  "type": "text",
	                  "classList": [
	                    "item"
	                  ],
	                  "attr": {
	                    "value": function () {return 'the count of touch: ' + (this.infos.touchend.changedTouches)}
	                  }
	                },
	                {
	                  "type": "text",
	                  "classList": [
	                    "item"
	                  ],
	                  "attr": {
	                    "value": function () {return 'identifier: ' + (this.infos.touchend.identifier)}
	                  }
	                }
	              ]
	            },
	            {
	              "type": "div",
	              "classList": [
	                "row"
	              ],
	              "children": [
	                {
	                  "type": "text",
	                  "classList": [
	                    "item"
	                  ],
	                  "attr": {
	                    "value": function () {return 'pageX: ' + (this.infos.touchend.pageX)}
	                  }
	                },
	                {
	                  "type": "text",
	                  "classList": [
	                    "item"
	                  ],
	                  "attr": {
	                    "value": function () {return 'pageY: ' + (this.infos.touchend.pageY)}
	                  }
	                }
	              ]
	            },
	            {
	              "type": "div",
	              "classList": [
	                "row"
	              ],
	              "children": [
	                {
	                  "type": "text",
	                  "classList": [
	                    "item"
	                  ],
	                  "attr": {
	                    "value": function () {return 'screenX: ' + (this.infos.touchend.screenX)}
	                  }
	                },
	                {
	                  "type": "text",
	                  "classList": [
	                    "item"
	                  ],
	                  "attr": {
	                    "value": function () {return 'screenY: ' + (this.infos.touchend.screenY)}
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
	      "shown": function () {return this.infos.panstart.display},
	      "children": [
	        {
	          "type": "text",
	          "classList": [
	            "title"
	          ],
	          "attr": {
	            "value": "panstart"
	          }
	        },
	        {
	          "type": "div",
	          "children": [
	            {
	              "type": "div",
	              "classList": [
	                "row"
	              ],
	              "children": [
	                {
	                  "type": "text",
	                  "classList": [
	                    "item"
	                  ],
	                  "attr": {
	                    "value": function () {return 'the count of touch: ' + (this.infos.panstart.changedTouches)}
	                  }
	                },
	                {
	                  "type": "text",
	                  "classList": [
	                    "item"
	                  ],
	                  "attr": {
	                    "value": function () {return 'identifier: ' + (this.infos.panstart.identifier)}
	                  }
	                }
	              ]
	            },
	            {
	              "type": "div",
	              "classList": [
	                "row"
	              ],
	              "children": [
	                {
	                  "type": "text",
	                  "classList": [
	                    "item"
	                  ],
	                  "attr": {
	                    "value": function () {return 'pageX: ' + (this.infos.panstart.pageX)}
	                  }
	                },
	                {
	                  "type": "text",
	                  "classList": [
	                    "item"
	                  ],
	                  "attr": {
	                    "value": function () {return 'pageY: ' + (this.infos.panstart.pageY)}
	                  }
	                }
	              ]
	            },
	            {
	              "type": "div",
	              "classList": [
	                "row"
	              ],
	              "children": [
	                {
	                  "type": "text",
	                  "classList": [
	                    "item"
	                  ],
	                  "attr": {
	                    "value": function () {return 'screenX: ' + (this.infos.panstart.screenX)}
	                  }
	                },
	                {
	                  "type": "text",
	                  "classList": [
	                    "item"
	                  ],
	                  "attr": {
	                    "value": function () {return 'screenY: ' + (this.infos.panstart.screenY)}
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
	      "shown": function () {return this.infos.panmove.display},
	      "children": [
	        {
	          "type": "text",
	          "classList": [
	            "title"
	          ],
	          "attr": {
	            "value": "panmove"
	          }
	        },
	        {
	          "type": "div",
	          "children": [
	            {
	              "type": "div",
	              "classList": [
	                "row"
	              ],
	              "children": [
	                {
	                  "type": "text",
	                  "classList": [
	                    "item"
	                  ],
	                  "attr": {
	                    "value": function () {return 'the count of touch: ' + (this.infos.panmove.changedTouches)}
	                  }
	                },
	                {
	                  "type": "text",
	                  "classList": [
	                    "item"
	                  ],
	                  "attr": {
	                    "value": function () {return 'identifier: ' + (this.infos.panmove.identifier)}
	                  }
	                }
	              ]
	            },
	            {
	              "type": "div",
	              "classList": [
	                "row"
	              ],
	              "children": [
	                {
	                  "type": "text",
	                  "classList": [
	                    "item"
	                  ],
	                  "attr": {
	                    "value": function () {return 'pageX: ' + (this.infos.panmove.pageX)}
	                  }
	                },
	                {
	                  "type": "text",
	                  "classList": [
	                    "item"
	                  ],
	                  "attr": {
	                    "value": function () {return 'pageY: ' + (this.infos.panmove.pageY)}
	                  }
	                }
	              ]
	            },
	            {
	              "type": "div",
	              "classList": [
	                "row"
	              ],
	              "children": [
	                {
	                  "type": "text",
	                  "classList": [
	                    "item"
	                  ],
	                  "attr": {
	                    "value": function () {return 'screenX: ' + (this.infos.panmove.screenX)}
	                  }
	                },
	                {
	                  "type": "text",
	                  "classList": [
	                    "item"
	                  ],
	                  "attr": {
	                    "value": function () {return 'screenY: ' + (this.infos.panmove.screenY)}
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
	      "shown": function () {return this.infos.panend.display},
	      "children": [
	        {
	          "type": "text",
	          "classList": [
	            "title"
	          ],
	          "attr": {
	            "value": "panend"
	          }
	        },
	        {
	          "type": "div",
	          "children": [
	            {
	              "type": "div",
	              "classList": [
	                "row"
	              ],
	              "children": [
	                {
	                  "type": "text",
	                  "classList": [
	                    "item"
	                  ],
	                  "attr": {
	                    "value": function () {return 'the count of touch: ' + (this.infos.panend.changedTouches)}
	                  }
	                },
	                {
	                  "type": "text",
	                  "classList": [
	                    "item"
	                  ],
	                  "attr": {
	                    "value": function () {return 'identifier: ' + (this.infos.panend.identifier)}
	                  }
	                }
	              ]
	            },
	            {
	              "type": "div",
	              "classList": [
	                "row"
	              ],
	              "children": [
	                {
	                  "type": "text",
	                  "classList": [
	                    "item"
	                  ],
	                  "attr": {
	                    "value": function () {return 'pageX: ' + (this.infos.panend.pageX)}
	                  }
	                },
	                {
	                  "type": "text",
	                  "classList": [
	                    "item"
	                  ],
	                  "attr": {
	                    "value": function () {return 'pageY: ' + (this.infos.panend.pageY)}
	                  }
	                }
	              ]
	            },
	            {
	              "type": "div",
	              "classList": [
	                "row"
	              ],
	              "children": [
	                {
	                  "type": "text",
	                  "classList": [
	                    "item"
	                  ],
	                  "attr": {
	                    "value": function () {return 'screenX: ' + (this.infos.panend.screenX)}
	                  }
	                },
	                {
	                  "type": "text",
	                  "classList": [
	                    "item"
	                  ],
	                  "attr": {
	                    "value": function () {return 'screenY: ' + (this.infos.panend.screenY)}
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
	      "shown": function () {return this.infos.longpress.display},
	      "children": [
	        {
	          "type": "text",
	          "classList": [
	            "title"
	          ],
	          "attr": {
	            "value": "longpress"
	          }
	        },
	        {
	          "type": "div",
	          "children": [
	            {
	              "type": "div",
	              "classList": [
	                "row"
	              ],
	              "children": [
	                {
	                  "type": "text",
	                  "classList": [
	                    "item"
	                  ],
	                  "attr": {
	                    "value": function () {return 'the count of touch: ' + (this.infos.longpress.changedTouches)}
	                  }
	                },
	                {
	                  "type": "text",
	                  "classList": [
	                    "item"
	                  ],
	                  "attr": {
	                    "value": function () {return 'identifier: ' + (this.infos.longpress.identifier)}
	                  }
	                }
	              ]
	            },
	            {
	              "type": "div",
	              "classList": [
	                "row"
	              ],
	              "children": [
	                {
	                  "type": "text",
	                  "classList": [
	                    "item"
	                  ],
	                  "attr": {
	                    "value": function () {return 'pageX: ' + (this.infos.longpress.pageX)}
	                  }
	                },
	                {
	                  "type": "text",
	                  "classList": [
	                    "item"
	                  ],
	                  "attr": {
	                    "value": function () {return 'pageY: ' + (this.infos.longpress.pageY)}
	                  }
	                }
	              ]
	            },
	            {
	              "type": "div",
	              "classList": [
	                "row"
	              ],
	              "children": [
	                {
	                  "type": "text",
	                  "classList": [
	                    "item"
	                  ],
	                  "attr": {
	                    "value": function () {return 'screenX: ' + (this.infos.longpress.screenX)}
	                  }
	                },
	                {
	                  "type": "text",
	                  "classList": [
	                    "item"
	                  ],
	                  "attr": {
	                    "value": function () {return 'screenY: ' + (this.infos.longpress.screenY)}
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
	      "classList": [
	        "block"
	      ],
	      "style": {
	        "left": function () {return this.block.left},
	        "top": function () {return this.block.top},
	        "backgroundColor": function () {return this.block.backgroundColor},
	        "width": function () {return this.block.width},
	        "height": function () {return this.block.height},
	        "position": "absolute"
	      }
	    }
	  ]
	}
	;__weex_module__.exports.style={
	  "row": {
	    "flexDirection": "row"
	  },
	  "title": {
	    "fontSize": 30,
	    "backgroundColor": "#333333",
	    "color": "#FFFFFF",
	    "marginTop": 4,
	    "marginBottom": 4,
	    "marginLeft": 4,
	    "marginRight": 4
	  },
	  "item": {
	    "fontSize": 26,
	    "marginTop": 2,
	    "marginBottom": 2,
	    "marginLeft": 5,
	    "marginRight": 5
	  }
	}
	})
	;__weex_bootstrap__("@weex-component/88c0bfc819749aa96853318546d70e47", {"transformerVersion":"0.3.1"}, undefined)

/***/ }
/******/ ]);