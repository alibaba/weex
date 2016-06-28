/******/ (function(modules) { // webpackBootstrap
/******/  // The module cache
/******/  var installedModules = {};

/******/  // The require function
/******/  function __webpack_require__(moduleId) {

/******/    // Check if module is in cache
/******/    if(installedModules[moduleId])
/******/      return installedModules[moduleId].exports;

/******/    // Create a new module (and put it into the cache)
/******/    var module = installedModules[moduleId] = {
/******/      exports: {},
/******/      id: moduleId,
/******/      loaded: false
/******/    };

/******/    // Execute the module function
/******/    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/    // Flag the module as loaded
/******/    module.loaded = true;

/******/    // Return the exports of the module
/******/    return module.exports;
/******/  }


/******/  // expose the modules object (__webpack_modules__)
/******/  __webpack_require__.m = modules;

/******/  // expose the module cache
/******/  __webpack_require__.c = installedModules;

/******/  // __webpack_public_path__
/******/  __webpack_require__.p = "";

/******/  // Load entry module and return exports
/******/  return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

  ;__weex_define__("@weex-component/9f052b677df388810d2a0255e3195397", [], function(__weex_require__, __weex_exports__, __weex_module__){

  ;
    __weex_module__.exports = {
      data: function () {return {
        ctHeight: 800,
        img: '//gw.alicdn.com/tps/i2/TB1DpsmMpXXXXabaXXX20ySQVXX-512-512.png_400x400.jpg'
      }},
      ready: function () {
        this.ctHeight = this.$getConfig().env.deviceHeight
      }
    }

  ;__weex_module__.exports.template = __weex_module__.exports.template || {}
  ;Object.assign(__weex_module__.exports.template, {
    "type": "div",
    "classList": [
      "ct"
    ],
    "style": {
      "height": function () {return this.ctHeight}
    },
    "children": [
      {
        "type": "image",
        "classList": [
          "img"
        ],
        "style": {
          "width": 400,
          "height": 400
        },
        "attr": {
          "src": function () {return this.img}
        }
      },
      {
        "type": "text",
        "style": {
          "fontSize": 42
        },
        "attr": {
          "value": "Hello Weex !"
        }
      }
    ]
  })
  ;__weex_module__.exports.style = __weex_module__.exports.style || {}
  ;Object.assign(__weex_module__.exports.style, {
    "ct": {
      "width": 750,
      "alignItems": "center",
      "justifyContent": "center"
    },
    "img": {
      "marginBottom": 20
    }
  })
  })
  ;__weex_bootstrap__("@weex-component/9f052b677df388810d2a0255e3195397", {
    "transformerVersion": "0.3.1"
  },undefined)

/***/ }
/******/ ]);