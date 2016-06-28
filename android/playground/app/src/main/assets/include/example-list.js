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

	;__weex_define__("@weex-component/5541efdebb29d11b48e333dd84d06e96", [], function(__weex_require__, __weex_exports__, __weex_module__){
	__webpack_require__(15);

	;
	  __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"weex-components\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	  __weex_module__.exports = {
	    data: function () {return {
	      dir: 'examples', // examples, test ...
	      items: [
	        {name: 'hello', title: 'Hello World', url: ''}
	      ]
	    }},
	    created: function() {
	      var bundleUrl = this.$getConfig().bundleUrl;
	      console.log('hit', bundleUrl);
	      var nativeBase;
	      var isAndroidAssets = bundleUrl.indexOf('your_current_IP') >= 0;
	      var isiOSAssets = bundleUrl.indexOf('file:///') >= 0 && bundleUrl.indexOf('WeexDemo.app') > 0;
	      if (isAndroidAssets) {
	        nativeBase = 'file://assets/';
	      }
	      else if (isiOSAssets) {
	        // file:///var/mobile/Containers/Bundle/Application/{id}/WeexDemo.app/
	        // file:///Users/{user}/Library/Developer/CoreSimulator/Devices/{id}/data/Containers/Bundle/Application/{id}/WeexDemo.app/
	        nativeBase = bundleUrl.substring(0, bundleUrl.lastIndexOf('/') + 1);
	      }
	      else {
	        var host = 'localhost:12580';
	        var matches = /\/\/([^\/]+?)\//.exec(this.$getConfig().bundleUrl);
	        if (matches && matches.length >= 2) {
	          host = matches[1];
	        }
	        nativeBase = '//' + host + '/' + this.dir + '/build/';
	      }
	      var h5Base = './index.html?page=./' + this.dir + '/build/';
	      // in Native
	      var base = nativeBase;
	      if (typeof window === 'object') {
	        // in Browser or WebView
	        base = h5Base;
	      }

	      for (var i in this.items) {
	        var item = this.items[i];
	        if (!item.url) {
	          item.url = base + item.name + '.js';
	        }
	      }
	      // see log in Android Logcat
	      if (this.items.length) console.log('hit', this.items[0].url);
	    }
	  }

	;__weex_module__.exports.template = __weex_module__.exports.template || {}
	;Object.assign(__weex_module__.exports.template, {
	  "type": "list",
	  "children": [
	    {
	      "type": "cell",
	      "append": "tree",
	      "repeat": function () {return this.items},
	      "children": [
	        {
	          "type": "example-list-item",
	          "attr": {
	            "title": function () {return this.title},
	            "url": function () {return this.url}
	          }
	        }
	      ]
	    }
	  ]
	})
	;__weex_module__.exports.style = __weex_module__.exports.style || {}
	;Object.assign(__weex_module__.exports.style, {})
	})
	;__weex_bootstrap__("@weex-component/5541efdebb29d11b48e333dd84d06e96", {
	  "transformerVersion": "0.3.1"
	},undefined)

/***/ },

/***/ 15:
/***/ function(module, exports, __webpack_require__) {

	;__weex_define__("@weex-component/example-list-item", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	  __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"weex-components\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	  __weex_module__.exports = {
	    data: function () {return {
	      title: '',
	      url: ''
	    }},
	    methods: {
	      redirect: function() {
	        this.$openURL(this.url);
	      }
	    }
	  }

	;__weex_module__.exports.template = __weex_module__.exports.template || {}
	;Object.assign(__weex_module__.exports.template, {
	  "type": "wxc-list-item",
	  "events": {
	    "click": "redirect"
	  },
	  "children": [
	    {
	      "type": "text",
	      "classList": [
	        "item-txt"
	      ],
	      "attr": {
	        "value": function () {return this.title}
	      }
	    }
	  ]
	})
	;__weex_module__.exports.style = __weex_module__.exports.style || {}
	;Object.assign(__weex_module__.exports.style, {
	  "item-txt": {
	    "fontSize": 48,
	    "color": "#555555"
	  }
	})
	})

/***/ }

/******/ });