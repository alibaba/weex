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

	;__weex_define__("@weex-component/8bb23b6d4f0576db9a4d402046c2fba4", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	  __weex_module__.exports = {
	    data: function() {
	      var items = [];
	      var N = 5;
	      var i, j, k, item;

	      if (N > 10) N = 10;
	      for (i = 0; i < N; i++) {
	        for (j = 0; j < N; j++) {
	          for (k = 0; k < N; k++) {
	            items.push({i: i, j: j, k: k});
	          }
	        }
	      }

	      var ROW_COUNT = 2;
	      var rows = [], row, key;

	      for (i = 0; i < Math.pow(N, 3) / ROW_COUNT; i++) {
	        row = rows[i] = {};
	        for (j = 0; j < ROW_COUNT; j++) {
	          item = items[i * ROW_COUNT + j];
	          for (key in item) {
	            row[key + j] = item[key];
	          }
	        }
	      }

	      console.log(rows);
	      return {
	        rows: rows,
	        size: 360
	      }
	    }
	  };

	;__weex_module__.exports.template = __weex_module__.exports.template || {}
	;Object.assign(__weex_module__.exports.template, {
	  "type": "list",
	  "children": [
	    {
	      "type": "cell",
	      "append": "tree",
	      "classList": [
	        "row"
	      ],
	      "repeat": function () {return this.rows},
	      "children": [
	        {
	          "type": "image",
	          "classList": [
	            "img"
	          ],
	          "attr": {
	            "src": function () {return 'https://www.gravatar.com/avatar/5dab88d418972368dcd1d9032b1c3' + (this.i0) + (this.j0) + (this.k0) + '?s=' + (this.size) + '&d=identicon&r=PG'}
	          }
	        },
	        {
	          "type": "image",
	          "classList": [
	            "img"
	          ],
	          "attr": {
	            "src": function () {return 'https://www.gravatar.com/avatar/5dab88d418972368dcd1d9032b1c3' + (this.i1) + (this.j1) + (this.k1) + '?s=' + (this.size) + '&d=identicon&r=PG'}
	          }
	        }
	      ]
	    }
	  ]
	})
	;__weex_module__.exports.style = __weex_module__.exports.style || {}
	;Object.assign(__weex_module__.exports.style, {
	  "row": {
	    "flexDirection": "row",
	    "marginBottom": 10
	  },
	  "img": {
	    "width": 360,
	    "height": 360
	  }
	})
	})
	;__weex_bootstrap__("@weex-component/8bb23b6d4f0576db9a4d402046c2fba4", {
	  "transformerVersion": "0.3.1"
	},undefined)

/***/ }
/******/ ]);