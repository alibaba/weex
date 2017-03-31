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

	var __weex_template__ = __webpack_require__(239)
	var __weex_style__ = __webpack_require__(240)
	var __weex_script__ = __webpack_require__(241)

	__weex_define__('@weex-component/c0df89e239d226d3a0c6f418314cda04', [], function(__weex_require__, __weex_exports__, __weex_module__) {

	    __weex_script__(__weex_module__, __weex_exports__, __weex_require__)
	    if (__weex_exports__.__esModule && __weex_exports__.default) {
	      __weex_module__.exports = __weex_exports__.default
	    }

	    __weex_module__.exports.template = __weex_template__

	    __weex_module__.exports.style = __weex_style__

	})

	__weex_bootstrap__('@weex-component/c0df89e239d226d3a0c6f418314cda04',undefined,undefined)

/***/ },

/***/ 239:
/***/ function(module, exports) {

	module.exports = {
	  "type": "container",
	  "children": [
	    {
	      "type": "text",
	      "classList": [
	        "btn"
	      ],
	      "attr": {
	        "value": function () {return this.board}
	      }
	    },
	    {
	      "type": "container",
	      "repeat": function () {return this.row},
	      "style": {
	        "flexDirection": "row",
	        "flex": 1
	      },
	      "children": [
	        {
	          "type": "container",
	          "repeat": function () {return this.col},
	          "style": {
	            "flex": 1
	          },
	          "children": [
	            {
	              "type": "text",
	              "attr": {
	                "tid": function () {return this.tid},
	                "around": function () {return this.around},
	                "value": function () {return this.text}
	              },
	              "events": {
	                "click": "onclick",
	                "longpress": "onlongpress"
	              },
	              "classList": function () {return [this.state, 'tile']}
	            }
	          ]
	        }
	      ]
	    },
	    {
	      "type": "text",
	      "events": {
	        "click": "restart"
	      },
	      "classList": [
	        "btn"
	      ],
	      "attr": {
	        "value": "START"
	      }
	    }
	  ]
	}

/***/ },

/***/ 240:
/***/ function(module, exports) {

	module.exports = {
	  "btn": {
	    "margin": 2,
	    "backgroundColor": "#e74c3c",
	    "color": "#ffffff",
	    "textAlign": "center",
	    "flex": 1,
	    "fontSize": 66,
	    "height": 80
	  },
	  "normal": {
	    "backgroundColor": "#95a5a6"
	  },
	  "open": {
	    "backgroundColor": "#34495e",
	    "color": "#ffffff"
	  },
	  "flag": {
	    "backgroundColor": "#95a5a6"
	  },
	  "tile": {
	    "margin": 2,
	    "fontSize": 56,
	    "height": 80,
	    "paddingTop": 0,
	    "textAlign": "center"
	  }
	}

/***/ },

/***/ 241:
/***/ function(module, exports) {

	module.exports = function(module, exports, __weex_require__){"use strict";

	module.exports = {
	  data: function () {return {
	    size: 9,
	    max: 10,
	    board: 0,
	    row: [],
	    vector: [[-1, 0], [-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1]],
	    strings: {
	      mine: "💣",
	      flag: "🚩",
	      win: "YOU WIN!",
	      lose: "YOU LOSE~"
	    },
	    finished: false
	  }},
	  methods: {
	    map: function map(x, y, callback) {
	      for (var i = 0; i < 8; ++i) {
	        var mx = x + this.vector[i][0];
	        var my = y + this.vector[i][1];
	        if (mx >= 0 && my >= 0 && mx < this.size && my < this.size) {
	          callback(this.row[mx].col[my]);
	        }
	      }
	    },
	    dfs: function dfs(tile) {
	      var pos = this.position(tile.tid);
	      var context = this;
	      tile.state = "open";
	      this.map(pos["x"], pos["y"], function (node) {
	        if (node.around == 0 && node.state == "normal") {
	          context.dfs(node);
	        } else {
	          context.display(node);
	        }
	      });
	    },
	    random: function random(min, max) {
	      return parseInt(Math.random() * (max - min) + min);
	    },
	    plant: function plant() {
	      var count = 0;
	      while (count < this.max) {
	        var x = this.random(0, this.size);
	        var y = this.random(0, this.size);
	        var tile = this.row[x].col[y];
	        if (tile.value == 0) {
	          ++count;
	          tile.value = 1;
	        }
	      }
	    },
	    calculate: function calculate() {
	      for (var i = 0; i < this.size; ++i) {
	        for (var j = 0; j < this.size; ++j) {
	          var around = 0;
	          this.map(i, j, function (tile) {
	            around += tile.value;
	          });
	          this.row[i].col[j].around = around;
	        }
	      }
	    },
	    restart: function restart(e) {
	      var row = [];
	      var count = 0;
	      this.board = this.max;
	      this.finished = false;
	      for (var i = 0; i < this.size; ++i) {
	        var col = { "col": [] };
	        for (var j = 0; j < this.size; ++j) {
	          var tid = i * this.size + j;
	          col["col"][j] = {
	            tid: "" + tid,
	            state: "normal",
	            value: 0,
	            text: "",
	            around: 0
	          };
	        }
	        row[i] = col;
	      }
	      this.row = row;
	      this.plant();
	      this.calculate();
	    },
	    unfinished: function unfinished() {
	      var finished = this.finished;
	      if (this.finished) {
	        this.restart();
	      }
	      return !finished;
	    },
	    position: function position(tid) {
	      var row = parseInt(tid / this.size);
	      var col = tid % this.size;
	      return { x: row, y: col };
	    },
	    display: function display(tile) {
	      tile.state = "open";
	      tile.text = tile.around == 0 ? "" : tile.around;
	    },
	    tile: function tile(event) {
	      var tid = event.target.attr["tid"];
	      var pos = this.position(tid);
	      return this.row[pos["x"]].col[pos["y"]];
	    },
	    onclick: function onclick(event) {
	      if (this.unfinished()) {
	        var tile = this.tile(event);
	        if (tile.state == "normal") {
	          if (tile.value == 1) {
	            this.onfail();
	          } else {
	            this.display(tile);
	            if (tile.around == 0) {
	              this.dfs(tile);
	            }
	            this.judge();
	          }
	        }
	      }
	    },
	    onlongpress: function onlongpress(event) {
	      if (this.unfinished()) {
	        var tile = this.tile(event);
	        tile.state = tile.state == "flag" ? "normal" : "flag";
	        if (tile.state == "flag") {
	          --this.board;
	          tile.text = this.strings.flag;
	        } else {
	          ++this.board;
	          tile.text = "";
	        }
	        this.judge();
	      }
	    },
	    foreach: function foreach(callback) {
	      for (var i = 0; i < this.size; ++i) {
	        for (var j = 0; j < this.size; ++j) {
	          callback(this.row[i].col[j]);
	        }
	      }
	    },
	    judge: function judge() {
	      var count = 0;
	      this.foreach(function (tile) {
	        if (tile.state == "open" || tile.state == "flag") {
	          ++count;
	        }
	      });
	      if (count == this.size * this.size) {
	        this.finished = true;
	        this.board = this.strings.win;
	      }
	    },
	    onfail: function onfail() {
	      this.board = this.strings.lose;
	      this.finished = true;
	      var mine = this.strings.mine;
	      this.foreach(function (tile) {
	        if (tile.value == 1) {
	          tile.text = mine;
	        }
	      });
	    }
	  }
	};}
	/* generated by weex-loader */


/***/ }

/******/ });