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

	;__weex_define__("@weex-component/fa8ecf711424518a532b8970e33ccf30", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	    // 引入button
	    __webpack_require__(1);

	    // 用来在循环中生成index值
	    var uid = 0;

	    __weex_module__.exports = {
	        "data":{
	            itemsStatus:0,
	            todos:[
	                {
	                    "todoUid":uid++,
	                    "status":"item-done",
	                    "content":"xxxxxx",
	                    "disableStatus":true
	                },
	                {
	                    "todoUid":uid++,
	                    "status":"item-doing",
	                    "content":"yyyyyy",
	                    "disableStatus":true
	                }
	            ]
	        },
	        methods:{
	            showAll: function() {

	            },
	            showOpened: function() {

	            },
	            showComplete: function() {

	            },
	            cleanCompletedTodos: function() {

	            },
	            finishInput: function(e) {
	//                this.$call('modal', 'alert', {
	//                    'message': "this is an debug tip",
	//                    'okTitle': "OK",
	//                    'cancelTitle': "cancel"
	//                    }, function() {
	//                });
	//                return;
	                var txt = e.value;

	                if (txt.trim().length>0) {
	                    this.todos.push({
	                        "todoUid":uid++,
	                        "status":"item-doing",
	                        "content":txt.trim(),
	                        "disableStatus":true
	                    });
	                    e.target.attr['value'] = '';
	                }
	            },
	            editItem: function(e) {
	                var todoUid= e.target.attr['todouid'];
	                this.__enableItemByUid(todoUid);
	                // 无法主动的focus到input上面
	            },
	            delItem: function(e) {
	                var todoUid= parseInt(e.target.attr['todouid'],10);
	                this.__removeItemByUid(todoUid);
	            },
	            __enableItemByUid: function(uid) {
	                var idxInTodos = this.__findTodoIndexByUid(uid);
	                this.todos[idxInTodos].disableStatus = false;
	            },
	            __findTodoIndexByUid: function(uid) {
	                var result = -1;
	                for (var i = 0;i < this.todos.length;i++) {
	                    if (uid === this.todos[i].todoUid) {
	                        result = i;
	                        break;
	                    }
	                }
	                return result;
	            },
	            __removeItemByUid:function(uid) {
	                var idxInTodos = this.__findTodoIndexByUid(uid);
	                this.todos.splice(idxInTodos,1);
	            }
	        },
	        created: function() {
	            this.itemsStatus = 1;
	        }
	    }

	;__weex_module__.exports.template={
	  "type": "list",
	  "classList": [
	    "todo-list"
	  ],
	  "children": [
	    {
	      "type": "cell",
	      "append": "tree",
	      "children": [
	        {
	          "type": "div",
	          "classList": [
	            "app-title-wrap"
	          ],
	          "children": [
	            {
	              "type": "text",
	              "classList": [
	                "app-title"
	              ],
	              "attr": {
	                "value": "todos"
	              }
	            }
	          ]
	        }
	      ]
	    },
	    {
	      "type": "cell",
	      "append": "tree",
	      "children": [
	        {
	          "type": "div",
	          "classList": [
	            "todo-area"
	          ],
	          "children": [
	            {
	              "type": "div",
	              "classList": [
	                "todo-input-wrap"
	              ],
	              "children": [
	                {
	                  "type": "div",
	                  "classList": [
	                    "finish-toggle"
	                  ],
	                  "children": [
	                    {
	                      "type": "image",
	                      "shown": function () {return this.itemsStatus===1},
	                      "style": {
	                        "width": 45,
	                        "height": 30
	                      },
	                      "attr": {
	                        "src": "https://gw.alicdn.com/tfs/TB1CnoDJFXXXXb6XVXXXXXXXXXX-77-51.jpg"
	                      }
	                    },
	                    {
	                      "type": "image",
	                      "shown": function () {return this.itemsStatus===2},
	                      "style": {
	                        "width": 45,
	                        "height": 30
	                      },
	                      "attr": {
	                        "src": "https://gw.alicdn.com/tfs/TB1CnoDJFXXXXb6XVXXXXXXXXXX-77-51.jpg"
	                      }
	                    }
	                  ]
	                },
	                {
	                  "type": "input",
	                  "classList": [
	                    "todo-input"
	                  ],
	                  "attr": {
	                    "type": "text",
	                    "placeholder": "What needs to be done?"
	                  },
	                  "events": {
	                    "change": "finishInput"
	                  }
	                },
	                {
	                  "type": "div",
	                  "classList": [
	                    "blank"
	                  ]
	                }
	              ]
	            }
	          ]
	        }
	      ]
	    },
	    {
	      "type": "cell",
	      "append": "tree",
	      "children": [
	        {
	          "type": "div",
	          "classList": [
	            "todo-item"
	          ],
	          "repeat": function () {return this.todos},
	          "children": [
	            {
	              "type": "div",
	              "classList": [
	                "todo-status-done"
	              ],
	              "children": [
	                {
	                  "type": "image",
	                  "shown": function () {return this.status==='item-doing'},
	                  "style": {
	                    "width": 70,
	                    "height": 70
	                  },
	                  "attr": {
	                    "src": "https://gw.alicdn.com/tfs/TB1Xr3GJFXXXXbmXVXXXXXXXXXX-153-153.jpg"
	                  }
	                },
	                {
	                  "type": "image",
	                  "shown": function () {return this.status==='item-done'},
	                  "style": {
	                    "width": 70,
	                    "height": 70
	                  },
	                  "attr": {
	                    "src": "https://gw.alicdn.com/tfs/TB1pAg1JFXXXXX8XpXXXXXXXXXX-153-153.jpg"
	                  }
	                }
	              ]
	            },
	            {
	              "type": "input",
	              "classList": function () {return ['todo-input', 'todo-content', this.status]},
	              "attr": {
	                "disabled": function () {return this.disableStatus},
	                "type": "text",
	                "value": function () {return this.content}
	              }
	            },
	            {
	              "type": "div",
	              "classList": [
	                "item-control"
	              ],
	              "children": [
	                {
	                  "type": "image",
	                  "classList": [
	                    "item-control-btn"
	                  ],
	                  "attr": {
	                    "todouid": function () {return this.todoUid},
	                    "src": "https://gw.alicdn.com/tfs/TB1gME_JFXXXXcmXpXXXXXXXXXX-48-48.jpg"
	                  },
	                  "events": {
	                    "click": "editItem"
	                  }
	                },
	                {
	                  "type": "image",
	                  "classList": [
	                    "item-control-btn"
	                  ],
	                  "attr": {
	                    "todouid": function () {return this.todoUid},
	                    "src": "https://gw.alicdn.com/tfs/TB1txI5JFXXXXagXFXXXXXXXXXX-48-48.jpg"
	                  },
	                  "events": {
	                    "click": "delItem"
	                  }
	                }
	              ]
	            }
	          ]
	        }
	      ]
	    },
	    {
	      "type": "cell",
	      "append": "tree",
	      "shown": function () {return this.todos.length>0},
	      "children": [
	        {
	          "type": "div",
	          "classList": [
	            "info-text-wrap"
	          ],
	          "children": [
	            {
	              "type": "text",
	              "classList": [
	                "info-text"
	              ],
	              "attr": {
	                "value": function () {return (this.todos.length) + ' item left'}
	              }
	            }
	          ]
	        }
	      ]
	    },
	    {
	      "type": "cell",
	      "append": "tree",
	      "shown": function () {return this.todos.length>0},
	      "children": [
	        {
	          "type": "div",
	          "classList": [
	            "sorting-wrap"
	          ],
	          "children": [
	            {
	              "type": "div",
	              "classList": [
	                "sorting"
	              ],
	              "children": [
	                {
	                  "type": "text",
	                  "classList": [
	                    "btn"
	                  ],
	                  "attr": {
	                    "value": "all"
	                  },
	                  "events": {
	                    "click": "showAll"
	                  }
	                },
	                {
	                  "type": "text",
	                  "classList": [
	                    "btn"
	                  ],
	                  "attr": {
	                    "value": "opened"
	                  },
	                  "events": {
	                    "click": "showOpened"
	                  }
	                },
	                {
	                  "type": "text",
	                  "classList": [
	                    "btn"
	                  ],
	                  "attr": {
	                    "value": "completed"
	                  },
	                  "events": {
	                    "click": "showComplete"
	                  }
	                },
	                {
	                  "type": "text",
	                  "classList": [
	                    "btn"
	                  ],
	                  "attr": {
	                    "value": "clean"
	                  },
	                  "events": {
	                    "click": "cleanCompletedTodos"
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
	  "todo-list": {
	    "flexDirection": "column",
	    "width": 750,
	    "backgroundColor": "#f5f5f5"
	  },
	  "app-title": {
	    "marginTop": 50,
	    "marginBottom": 50,
	    "fontSize": 120,
	    "textAlign": "center",
	    "color": "rgba(175,47,47,0.15)",
	    "fontFamily": "'Helvetica Neue', Helvetica, Arial, sans-serif"
	  },
	  "todo-input-wrap": {
	    "display": "flex",
	    "flexDirection": "row",
	    "backgroundColor": "#ffffff",
	    "borderTopWidth": 1,
	    "borderBottomWidth": 1,
	    "borderStyle": "solid",
	    "borderColor": "#cccccc"
	  },
	  "finish-toggle": {
	    "flex": 2,
	    "height": 120,
	    "lineHeight": 120,
	    "overflow": "hidden",
	    "fontSize": 60,
	    "textAlign": "center",
	    "fontWeight": "bold",
	    "color": "#e6e6e6",
	    "flexDirection": "row",
	    "justifyContent": "center",
	    "alignItems": "center"
	  },
	  "todo-input": {
	    "height": 120,
	    "flex": 7,
	    "fontSize": 40,
	    "marginLeft": 20,
	    "borderWidth": 0,
	    "fontStyle": "italic",
	    "fontFamily": "'Helvetica Neue', Helvetica, Arial, sans-serif"
	  },
	  "blank": {
	    "flex": 1
	  },
	  "todo-item": {
	    "display": "flex",
	    "flexDirection": "row",
	    "height": 120,
	    "width": 750,
	    "overflow": "hidden",
	    "borderBottomWidth": 1,
	    "borderStyle": "solid",
	    "borderColor": "#cccccc",
	    "backgroundColor": "#ffffff"
	  },
	  "todo-status-done": {
	    "flex": 2,
	    "lineHeight": 120,
	    "height": 120,
	    "color": "#008000",
	    "textAlign": "center",
	    "fontSize": 40,
	    "flexDirection": "row",
	    "justifyContent": "center",
	    "alignItems": "center"
	  },
	  "todo-content": {
	    "color": "#333333",
	    "fontStyle": "normal"
	  },
	  "item-control": {
	    "flex": 2,
	    "flexDirection": "row",
	    "alignItems": "center"
	  },
	  "item-control-btn": {
	    "width": 48,
	    "height": 48,
	    "marginRight": 20
	  },
	  "info-text-wrap": {
	    "flexDirection": "column",
	    "justifyContent": "center",
	    "width": 750,
	    "height": 80,
	    "backgroundColor": "#ffffff"
	  },
	  "info-text": {
	    "width": 700,
	    "height": 40,
	    "lineHeight": 40,
	    "fontSize": 30,
	    "paddingLeft": 50,
	    "color": "#cccccc"
	  },
	  "sorting-wrap": {
	    "width": 750,
	    "height": 80,
	    "backgroundColor": "#ffffff"
	  },
	  "sorting": {
	    "display": "flex",
	    "flexDirection": "row",
	    "justifyContent": "space-between",
	    "width": 550,
	    "marginLeft": 100,
	    "marginRight": 100,
	    "height": 80
	  },
	  "btn": {
	    "borderRadius": 3,
	    "alignItems": "center",
	    "marginLeft": 1,
	    "marginTop": 15,
	    "height": 50,
	    "paddingTop": 5,
	    "paddingLeft": 10,
	    "paddingRight": 10,
	    "fontSize": 30,
	    "borderColor": "#cccccc",
	    "borderWidth": 1,
	    "borderStyle": "solid",
	    "color": "#999999"
	  }
	}
	})
	;__weex_bootstrap__("@weex-component/fa8ecf711424518a532b8970e33ccf30", {
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
	        "left-image"
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
	    "right": 28,
	    "width": 50,
	    "height": 50
	  },
	  "right-image": {
	    "position": "absolute",
	    "bottom": 20,
	    "left": 28,
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

/***/ }
/******/ ]);