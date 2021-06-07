// { "framework": "Vue" }
"use weex:vue";

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 37);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(10);
var IE8_DOM_DEFINE = __webpack_require__(29);
var toPrimitive = __webpack_require__(17);
var dP = Object.defineProperty;

exports.f = __webpack_require__(2) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(11)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 3 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.7' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(1);
var createDesc = __webpack_require__(12);
module.exports = __webpack_require__(2) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(51);
var defined = __webpack_require__(15);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(21)('wks');
var uid = __webpack_require__(13);
var Symbol = __webpack_require__(0).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(8);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 13 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 15 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var core = __webpack_require__(4);
var ctx = __webpack_require__(47);
var hide = __webpack_require__(5);
var has = __webpack_require__(3);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(8);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(33);
var enumBugKeys = __webpack_require__(22);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(21)('keys');
var uid = __webpack_require__(13);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(4);
var global = __webpack_require__(0);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(9) ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});


/***/ }),
/* 22 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(1).f;
var has = __webpack_require__(3);
var TAG = __webpack_require__(7)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(7);


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var core = __webpack_require__(4);
var LIBRARY = __webpack_require__(9);
var wksExt = __webpack_require__(24);
var defineProperty = __webpack_require__(1).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 26 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchNews = exports.fetchDoodle = exports.readAbout = exports.saveAbout = exports.fetchAbout = exports.readGuide = exports.saveGuide = exports.fetchGuide = exports.readExamples = exports.saveExamples = exports.fetchExamples = undefined;

var _stringify = __webpack_require__(40);

var _stringify2 = _interopRequireDefault(_stringify);

var _typeof2 = __webpack_require__(42);

var _typeof3 = _interopRequireDefault(_typeof2);

exports.createLink = createLink;
exports.createURL = createURL;
exports.i18n = i18n;
exports.parseLanguage = parseLanguage;
exports.setLanguage = setLanguage;
exports.clearStorageLanguage = clearStorageLanguage;
exports.getStorageLanguage = getStorageLanguage;
exports.getSystemLanguage = getSystemLanguage;
exports.getLanguage = getLanguage;
exports.jumpTo = jumpTo;
exports.viewSource = viewSource;
exports.setTitleBar = setTitleBar;
exports.fetchData = fetchData;
exports.saveData = saveData;
exports.readData = readData;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stream = weex.requireModule('stream');
var storage = weex.requireModule('storage');
var navigator = weex.requireModule('navigator');

var encoder = typeof encodeURIComponent === 'function' ? encodeURIComponent : typeof encodeURI === 'function' ? encodeURI : function (x) {
  return x;
};

function encodeParams(params) {
  if (!params || (typeof params === 'undefined' ? 'undefined' : (0, _typeof3.default)(params)) !== 'object') {
    return '';
  }
  var array = [];
  for (var key in params) {
    if (typeof params[key] === 'string') {
      array.push(encoder(key) + '=' + encoder(params[key]));
    }
  }
  return array.join('&');
}

function createLink(name) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var args = [];
  for (var key in params) {
    if (typeof params[key] === 'string') {
      args.push(encoder(key) + '=' + encoder(params[key]));
    }
  }
  if (WXEnvironment.platform === 'Web') {
    args.unshift('page=' + name + '.web.js');
    return '/?' + args.join('&');
  }
  var base = getBaseURL();
  return '' + base + name + '.weex.js' + (args.length ? '?' + args.join('&') : '');
}

function createURL(hash, params) {
  if (WXEnvironment.platform === 'Web') {
    return 'http://dotwe.org/raw/htmlVue/' + hash;
  }
  var url = 'http://dotwe.org/raw/dist/' + hash + '.bundle.wx';
  var paramString = encodeParams(params);
  if (WXEnvironment.appName === 'TB') {
    return url + '?_wx_tpl=' + url + '&' + paramString;
  }
  if (WXEnvironment.appName === 'WXSample') {
    return url + '?' + paramString;
  }
  return url + '?wx_weex=true&' + paramString;
}

function getBaseURL() {
  var bundleUrl = weex.config.bundleUrl;
  var isAndroidAssets = bundleUrl.indexOf('your_current_IP') >= 0 || bundleUrl.indexOf('file://assets/') >= 0;
  var isiOSAssets = bundleUrl.indexOf('file:///') >= 0 && bundleUrl.indexOf('WeexDemo.app') > 0;
  if (isAndroidAssets) {
    return 'file://assets/';
  } else if (isiOSAssets) {
    // file:///var/mobile/Containers/Bundle/Application/{id}/WeexDemo.app/
    // file:///Users/{user}/Library/Developer/CoreSimulator/Devices/{id}/data/Containers/Bundle/Application/{id}/WeexDemo.app/
    return bundleUrl.substring(0, bundleUrl.lastIndexOf('/') + 1);
  }
  return '';
}

function i18n(text, language) {
  if (typeof text === 'string') {
    return text;
  }
  if (Object.prototype.toString.call(text) === '[object Object]') {
    var lang = this && this.language || language || 'en';
    return text[lang];
  }
}

var supportedLanguageRE = /(en|zh)\_?\w*/i;
function parseLanguage(language) {
  var match = supportedLanguageRE.exec(language + '');
  if (match && match[1]) {
    return match[1];
  }
  return '';
}

function setLanguage(language) {
  var lang = parseLanguage(language);
  if (lang) {
    storage.setItem('WEEX_PLAYGROUND_LANGUAGE', lang);
  }
}

function clearStorageLanguage() {
  storage.removeItem('WEEX_PLAYGROUND_LANGUAGE');
}

function getStorageLanguage(done) {
  var fail = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

  if (!(typeof done === 'undefined' ? 'undefined' : (0, _typeof3.default)(done)) === 'function') {
    return;
  }
  try {
    storage.getItem('WEEX_PLAYGROUND_LANGUAGE', function (event) {
      if (event.result === 'success') {
        var lang = parseLanguage(event.data);
        lang ? done(lang) : fail();
      } else {
        fail(event);
      }
    });
  } catch (err) {
    fail(err);
  }
}

function getSystemLanguage(done) {
  var fail = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

  if (!(typeof done === 'undefined' ? 'undefined' : (0, _typeof3.default)(done)) === 'function') {
    return;
  }
  if (WXEnvironment.platform.toLowerCase() === 'web') {
    var lang = parseLanguage(window.navigator.language);
    lang ? done(lang) : fail();
  } else {
    try {
      var locale = weex.requireModule('locale') || weex.requireModule('local');
      var useSync = false;
      var resSync = locale.getLanguage(function (language) {
        var lang = parseLanguage(language);
        if (lang) {
          useSync || done(lang);
        } else {
          fail();
        }
      });
      var langSync = parseLanguage(resSync);
      if (langSync) {
        useSync = true;
        done(langSync);
      } else {
        fail();
      }
    } catch (e) {
      fail(e);
    }
  }
}

var languageRE = /.+[\?\&]{1}language=([\d\w]+)[\?\&]?.*/i;
function getLanguage() {
  var done = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};

  var match = languageRE.exec(weex.config.bundleUrl || '');
  var lang = parseLanguage(match && match[1]);
  if (lang) {
    done(lang);
  } else {
    getStorageLanguage(done, function () {
      getSystemLanguage(done, function () {
        done('en');
      });
    });
  }
}

function jumpTo(url, title, lang) {
  getLanguage(function (language) {
    storage.setItem('CURRENT_DOCUMENT_URL', i18n(url, lang || language));
    navigator.push({
      url: createURL('bf0305c14b511b24a4e616f53926432b', { language: language, title: i18n(title, lang || language) })
    });
  });
}

function viewSource(hash) {
  getLanguage(function (language) {
    navigator.push({
      url: createURL('f6ce29faf686eabc38b410bf4828fa5a', { hash: hash, language: language })
    });
  });
}

function setTitleBar(options) {
  var language = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en';

  if (Object.prototype.toString.apply(options) !== '[object Object]') {
    return;
  }
  var titleBar = weex.requireModule('titleBar');
  if (options.color || options.backgroundColor) {
    try {
      titleBar.setStyle({
        foregroundColor: options.color || '#FFFFFF',
        backgroundColor: options.backgroundColor || '#00B4FF'
      });
    } catch (e) {}
  }
  var title = i18n(options.title, language);
  if (title) {
    try {
      titleBar.setTitle(title);
    } catch (e) {}
  }
}

var storageKeys = {
  doodle: 'WEEX_PLAYGROUND_APP_DOODLE',
  guide: 'WEEX_PLAYGROUND_APP_GUIDE',
  examples: 'WEEX_PLAYGROUND_APP_EXAMPLES',
  news: 'WEEX_PLAYGROUND_APP_NEWS',
  about: 'WEEX_PLAYGROUND_APP_ABOUT'
};
function fetchData(name) {
  var done = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
  var fail = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

  try {
    stream.fetch({
      url: 'http://dotwe.org/query/weex-playground-app',
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      type: 'json',
      body: 'name=' + name
    }, function (res) {
      if (res.ok && res.data && res.data.success) {
        done(res.data);
      } else {
        fail(res);
      }
    });
  } catch (err) {
    fail(err);
  }
}
function saveData(name, result) {
  var key = storageKeys[name];
  if (!key) return;
  if (result && (typeof result === 'undefined' ? 'undefined' : (0, _typeof3.default)(result)) === 'object') {
    result.timestamp = Date.now();
    storage.setItem(key, (0, _stringify2.default)(result));
  }
}
function readData(name) {
  var done = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
  var fail = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

  var key = storageKeys[name];
  if (!key) return fail();
  try {
    storage.getItem(key, function (event) {
      if (event.result === 'success') {
        var result = JSON.parse(event.data);
        if (result && Array.isArray(result[name])) {
          return done(result[name]);
        }
      }
      fail(event);
    });
  } catch (e) {
    fail(e);
  }
}

var fetchExamples = exports.fetchExamples = function fetchExamples() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return fetchData.apply(undefined, ['examples'].concat(args));
};
var saveExamples = exports.saveExamples = function saveExamples() {
  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return saveData.apply(undefined, ['examples'].concat(args));
};
var readExamples = exports.readExamples = function readExamples() {
  for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    args[_key3] = arguments[_key3];
  }

  return readData.apply(undefined, ['examples'].concat(args));
};

var fetchGuide = exports.fetchGuide = function fetchGuide() {
  for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    args[_key4] = arguments[_key4];
  }

  return fetchData.apply(undefined, ['guide'].concat(args));
};
var saveGuide = exports.saveGuide = function saveGuide() {
  for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
    args[_key5] = arguments[_key5];
  }

  return saveData.apply(undefined, ['guide'].concat(args));
};
var readGuide = exports.readGuide = function readGuide() {
  for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
    args[_key6] = arguments[_key6];
  }

  return readData.apply(undefined, ['guide'].concat(args));
};

var fetchAbout = exports.fetchAbout = function fetchAbout() {
  for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
    args[_key7] = arguments[_key7];
  }

  return fetchData.apply(undefined, ['about'].concat(args));
};
var saveAbout = exports.saveAbout = function saveAbout() {
  for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
    args[_key8] = arguments[_key8];
  }

  return saveData.apply(undefined, ['about'].concat(args));
};
var readAbout = exports.readAbout = function readAbout() {
  for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
    args[_key9] = arguments[_key9];
  }

  return readData.apply(undefined, ['about'].concat(args));
};

var fetchDoodle = exports.fetchDoodle = function fetchDoodle() {
  for (var _len10 = arguments.length, args = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
    args[_key10] = arguments[_key10];
  }

  return fetchData.apply(undefined, ['doodle'].concat(args));
};
var fetchNews = exports.fetchNews = function fetchNews() {
  for (var _len11 = arguments.length, args = Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
    args[_key11] = arguments[_key11];
  }

  return fetchData.apply(undefined, ['news'].concat(args));
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(9);
var $export = __webpack_require__(16);
var redefine = __webpack_require__(31);
var hide = __webpack_require__(5);
var Iterators = __webpack_require__(18);
var $iterCreate = __webpack_require__(49);
var setToStringTag = __webpack_require__(23);
var getPrototypeOf = __webpack_require__(56);
var ITERATOR = __webpack_require__(7)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(2) && !__webpack_require__(11)(function () {
  return Object.defineProperty(__webpack_require__(30)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(8);
var document = __webpack_require__(0).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(5);


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(10);
var dPs = __webpack_require__(50);
var enumBugKeys = __webpack_require__(22);
var IE_PROTO = __webpack_require__(20)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(30)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(55).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(3);
var toIObject = __webpack_require__(6);
var arrayIndexOf = __webpack_require__(52)(false);
var IE_PROTO = __webpack_require__(20)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 34 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 35 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(33);
var hiddenKeys = __webpack_require__(22).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(38);

var _Guide = __webpack_require__(73);

var _Guide2 = _interopRequireDefault(_Guide);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// show title bar
try {
  var titleBar = weex.requireModule('titleBar');
  titleBar.showTitleBar(true);
} catch (e) {}

_Guide2.default.el = '#root';
new Vue(_Guide2.default);

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _mixin = __webpack_require__(39);

var _mixin2 = _interopRequireDefault(_mixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// use shared mixins
Vue.mixin(_mixin2.default);

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(27);

var utils = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var storage = weex.requireModule('storage');

exports.default = {
  filters: {
    i18n: utils.i18n,
    url: utils.createURL,
    link: utils.createLink
  },
  methods: {
    createLink: utils.createLink,
    createURL: utils.createURL,
    i18n: utils.i18n,
    getLanguage: utils.getLanguage,
    fetchData: utils.fetchData,
    saveData: utils.saveData,
    readData: utils.readData,
    jumpTo: utils.jumpTo
  },
  created: function created() {
    var _this = this;

    // get and set language
    utils.getLanguage(function (language) {
      _this.language = language;
      utils.setTitleBar(_this.navigationBarOptions, language);
    });

    // listen to the language change event
    var channel = new BroadcastChannel('language');
    channel.onmessage = function (event) {
      if (event.data && event.data.language) {
        _this.language = event.data.language;
      }
    };
  },
  beforeDestroy: function beforeDestroy() {
    storage.removeItem('CURRENT_DOCUMENT_URL');
    storage.removeItem('CURRENT_SOURCE_HASH');
  }
};

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(41), __esModule: true };

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(4);
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(43);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(62);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(44), __esModule: true };

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(45);
__webpack_require__(58);
module.exports = __webpack_require__(24).f('iterator');


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(46)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(28)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(14);
var defined = __webpack_require__(15);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(48);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(32);
var descriptor = __webpack_require__(12);
var setToStringTag = __webpack_require__(23);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(5)(IteratorPrototype, __webpack_require__(7)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(1);
var anObject = __webpack_require__(10);
var getKeys = __webpack_require__(19);

module.exports = __webpack_require__(2) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(34);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(6);
var toLength = __webpack_require__(53);
var toAbsoluteIndex = __webpack_require__(54);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(14);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(14);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(0).document;
module.exports = document && document.documentElement;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(3);
var toObject = __webpack_require__(57);
var IE_PROTO = __webpack_require__(20)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(15);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(59);
var global = __webpack_require__(0);
var hide = __webpack_require__(5);
var Iterators = __webpack_require__(18);
var TO_STRING_TAG = __webpack_require__(7)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(60);
var step = __webpack_require__(61);
var Iterators = __webpack_require__(18);
var toIObject = __webpack_require__(6);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(28)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 60 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 61 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(63), __esModule: true };

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(64);
__webpack_require__(70);
__webpack_require__(71);
__webpack_require__(72);
module.exports = __webpack_require__(4).Symbol;


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(0);
var has = __webpack_require__(3);
var DESCRIPTORS = __webpack_require__(2);
var $export = __webpack_require__(16);
var redefine = __webpack_require__(31);
var META = __webpack_require__(65).KEY;
var $fails = __webpack_require__(11);
var shared = __webpack_require__(21);
var setToStringTag = __webpack_require__(23);
var uid = __webpack_require__(13);
var wks = __webpack_require__(7);
var wksExt = __webpack_require__(24);
var wksDefine = __webpack_require__(25);
var enumKeys = __webpack_require__(66);
var isArray = __webpack_require__(67);
var anObject = __webpack_require__(10);
var isObject = __webpack_require__(8);
var toIObject = __webpack_require__(6);
var toPrimitive = __webpack_require__(17);
var createDesc = __webpack_require__(12);
var _create = __webpack_require__(32);
var gOPNExt = __webpack_require__(68);
var $GOPD = __webpack_require__(69);
var $DP = __webpack_require__(1);
var $keys = __webpack_require__(19);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(36).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(26).f = $propertyIsEnumerable;
  __webpack_require__(35).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(9)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(5)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(13)('meta');
var isObject = __webpack_require__(8);
var has = __webpack_require__(3);
var setDesc = __webpack_require__(1).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(11)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(19);
var gOPS = __webpack_require__(35);
var pIE = __webpack_require__(26);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(34);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(6);
var gOPN = __webpack_require__(36).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(26);
var createDesc = __webpack_require__(12);
var toIObject = __webpack_require__(6);
var toPrimitive = __webpack_require__(17);
var has = __webpack_require__(3);
var IE8_DOM_DEFINE = __webpack_require__(29);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(2) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 70 */
/***/ (function(module, exports) {



/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(25)('asyncIterator');


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(25)('observable');


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(74)
)

/* script */
__vue_exports__ = __webpack_require__(75)

/* template */
var __vue_template__ = __webpack_require__(86)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/kw/github/weex-vue-examples/src/pages/guide/Guide.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-5490db22"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 74 */
/***/ (function(module, exports) {

module.exports = {
  "size": {
    "width": "750",
    "height": "320"
  },
  "center": {
    "alignItems": "center",
    "justifyContent": "center"
  },
  "slider": {
    "width": "750",
    "height": "400",
    "boxShadow": "0 5px 10px rgba(0, 0, 0, 0.2)",
    "marginBottom": "10"
  },
  "slider-title": {
    "width": "750",
    "paddingTop": 0,
    "paddingRight": "30",
    "paddingBottom": "30",
    "paddingLeft": "30",
    "fontSize": "46",
    "textAlign": "center",
    "color": "#FFFFFF"
  },
  "indicator": {
    "position": "absolute",
    "left": 0,
    "right": 0,
    "bottom": 0,
    "width": "750",
    "height": "30",
    "itemSize": "12",
    "itemColor": "#DDDDDD",
    "itemSelectedColor": "rgb(0,180,255)"
  }
}

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(27);

var _Lesson = __webpack_require__(76);

var _Lesson2 = _interopRequireDefault(_Lesson);

var _mock = __webpack_require__(80);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var useStorage = false; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  components: { Lesson: _Lesson2.default },
  data: function data() {
    return {
      language: 'en',
      navigationBarOptions: {
        title: {
          zh: 'Weex 入门',
          en: 'Weex Guide'
        }
      },
      lenssonIndex: 0,
      guideLessons: _mock.guideLessons
    };
  },

  computed: {
    chosenLesson: function chosenLesson() {
      return this.guideLessons[this.lenssonIndex];
    }
  },
  watch: {
    lenssonIndex: function lenssonIndex() {
      this.navigationBarOptions.backgroundColor = this.chosenLesson.mainColor;
      this.navigationBarOptions.title = this.chosenLesson.title;
    },
    navigationBarOptions: function navigationBarOptions() {
      (0, _utils.setTitleBar)(this.navigationBarOptions, this.language);
    }
  },
  beforeCreate: function beforeCreate() {
    var _this = this;

    (0, _utils.readGuide)(function (guide) {
      _this.guideLessons = guide;
      if (WXEnvironment.platform.toLowerCase() !== 'web') {
        useStorage = true;
      }
    });
    (0, _utils.fetchGuide)(function (result) {
      (0, _utils.saveGuide)(result);
      if (!useStorage) {
        _this.guideLessons = result.guide;
      }
    });
  }
};

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(77)
)

/* script */
__vue_exports__ = __webpack_require__(78)

/* template */
var __vue_template__ = __webpack_require__(79)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/kw/github/weex-vue-examples/src/components/Lesson.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-2c29cf22"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 77 */
/***/ (function(module, exports) {

module.exports = {
  "center": {
    "alignItems": "center",
    "justifyContent": "center"
  },
  "title": {
    "fontSize": "60",
    "textAlign": "center",
    "marginTop": "60",
    "marginBottom": "60",
    "color": "#606060"
  },
  "lesson": {
    "borderBottomWidth": "1",
    "borderBottomStyle": "solid",
    "borderBottomColor": "#EEEEEE",
    "flexDirection": "row",
    "alignItems": "center"
  },
  "lesson-zh": {
    "width": "600"
  },
  "lesson-en": {
    "width": "630"
  },
  "lesson-index": {
    "color": "#777777",
    "textAlign": "right",
    "paddingRight": "30"
  },
  "lesson-title": {
    "paddingTop": "35",
    "paddingBottom": "35"
  },
  "lesson-index-zh": {
    "fontSize": "46",
    "width": "120"
  },
  "lesson-title-zh": {
    "fontSize": "42",
    "width": "480"
  },
  "lesson-index-en": {
    "fontSize": "42",
    "width": "100"
  },
  "lesson-title-en": {
    "fontSize": "38",
    "width": "530"
  },
  "footer": {
    "height": "120",
    "paddingTop": "40"
  },
  "copyright": {
    "fontSize": "22",
    "color": "#A0A0A0",
    "textAlign": "center"
  }
}

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  props: ['mainColor', 'title', 'copyright', 'lessons'],
  data: function data() {
    return {
      language: 'en'
    };
  }
};

/***/ }),
/* 79 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["wrapper"]
  }, [_c('div', {
    staticClass: ["center"]
  }, [_c('text', {
    staticClass: ["title"]
  }, [_vm._v(_vm._s(_vm.i18n(_vm.title)))])]), _vm._l((_vm.lessons), function(lesson, i) {
    return _c('div', {
      key: i,
      staticClass: ["center"]
    }, [_c('div', {
      class: ['lesson', ("lesson-" + _vm.language)],
      on: {
        "click": function($event) {
          _vm.jumpTo(lesson.docLink, lesson.title)
        }
      }
    }, [_c('text', {
      class: ['lesson-index', ("lesson-index-" + _vm.language)]
    }, [_vm._v(_vm._s(i + 1) + ".")]), _c('text', {
      class: ['lesson-title', ("lesson-title-" + _vm.language)],
      style: {
        color: _vm.mainColor
      }
    }, [_vm._v(_vm._s(_vm.i18n(lesson.title)))])])])
  }), _c('div', {
    staticClass: ["footer", "center"]
  }, [_c('text', {
    staticClass: ["copyright"]
  }, [_vm._v(_vm._s(_vm.i18n(_vm.copyright)))])])], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.aboutApp = exports.guideLessons = undefined;

var _sliders = __webpack_require__(81);

var _sliders2 = _interopRequireDefault(_sliders);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var guideLessons = exports.guideLessons = _sliders2.default;

var aboutApp = exports.aboutApp = [{
  title: { en: 'Weex Official Website', zh: 'Weex 官方网站' },
  link: {
    en: 'http://weex-project.io/',
    zh: 'http://weex-project.io/cn/'
  }
}, {
  title: { en: 'Apache Software Foundation', zh: 'Apache 软件基金会' },
  link: 'http://www.apache.org/'
}, {
  title: { en: 'Who is using Weex', zh: '谁在使用 Weex' },
  link: {
    en: 'http://weex-project.io/who-is-using-weex.html',
    zh: 'http://weex-project.io/cn/who-is-using-weex.html'
  }
}, {
  title: { en: 'Contribution', zh: '参与贡献' },
  link: {
    en: 'http://weex-project.io/guide/contributing.html',
    zh: 'http://weex-project.io/cn/guide/contributing.html'
  }
}, {
  title: { en: 'Release Note', zh: '版本变更' },
  link: {
    en: 'http://weex-project.io/releasenote.html',
    zh: 'http://weex-project.io/cn/releasenote.html'
  }
}, {
  title: { en: 'FAQ', zh: '常见问题' },
  link: {
    en: 'http://weex-project.io/faq.html',
    zh: 'http://weex-project.io/cn/faq.html'
  }
}];

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = __webpack_require__(82);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _ref, _ref2, _ref3;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [{
  subject: 'weex',
  mainColor: '#00B4FF',
  title: { zh: '学习 Weex', en: 'Learn Weex' },
  poster: 'https://gw.alicdn.com/tfs/TB1.8Vdl9_I8KJjy0FoXXaFnVXa-3799-1615.png',
  posterBg: '#E5F7FF',
  posterStyle: {
    width: '650px',
    height: '304px'
  },
  copyright: {
    zh: '来自 http://weex-project.io/cn/',
    en: 'From http://weex-project.io/'
  },
  lessons: [{
    title: {
      zh: '快速入门',
      en: 'Getting Started'
    },
    docLink: {
      zh: 'http://weex-project.io/cn/guide/index.html',
      en: 'http://weex-project.io/guide/index.html'
    }
  }, {
    title: {
      zh: '工作原理',
      en: 'How it Works'
    },
    docLink: {
      zh: 'http://weex-project.io/cn/wiki/index.html',
      en: 'http://weex-project.io/wiki/index.html'
    }
  }, {
    title: {
      zh: 'Weex 中的前端框架',
      en: 'Front-end Frameworks'
    },
    docLink: {
      zh: 'http://weex-project.io/cn/guide/front-end-frameworks.html',
      en: 'http://weex-project.io/guide/front-end-frameworks.html'
    }
  }, {
    title: {
      zh: '在 Weex 中使用 Vue.js',
      en: 'Use Vue.js on Weex'
    },
    docLink: {
      zh: 'http://weex-project.io/cn/guide/use-vue.html',
      en: 'http://weex-project.io/guide/use-vue.html'
    }
  }, {
    title: {
      zh: '与 Web 平台的差异',
      en: 'Platform difference with Web'
    },
    docLink: {
      zh: 'http://weex-project.io/cn/wiki/platform-difference.html',
      en: 'http://weex-project.io/wiki/platform-difference.html'
    }
  }, {
    title: {
      zh: '集成 Weex 到已有应用',
      en: 'Integrate to Your App'
    },
    docLink: {
      zh: 'http://weex-project.io/cn/guide/integrate-to-your-app.html',
      en: 'http://weex-project.io/guide/integrate-to-your-app.html'
    }
  }, {
    title: {
      zh: '搭建开发环境',
      en: 'Set Up Dev Environment'
    },
    docLink: {
      zh: 'http://weex-project.io/cn/guide/set-up-env.html',
      en: 'http://weex-project.io/guide/set-up-env.html'
    }
  }, {
    title: {
      zh: '通用样式',
      en: 'Common Styles'
    },
    docLink: {
      zh: 'http://weex-project.io/cn/wiki/common-styles.html',
      en: 'http://weex-project.io/wiki/common-styles.html'
    }
  }, {
    title: {
      zh: '通用事件',
      en: 'Common Events'
    },
    docLink: {
      zh: 'http://weex-project.io/cn/wiki/common-events.html',
      en: 'http://weex-project.io/wiki/common-events.html'
    }
  }, {
    title: {
      zh: 'Weex 实例变量',
      en: 'The "weex" Variable'
    },
    docLink: {
      zh: 'http://weex-project.io/cn/references/weex-variable.html',
      en: 'http://weex-project.io/references/weex-variable.html'
    }
  }, {
    title: {
      zh: '内置组件',
      en: 'Built-in Components'
    },
    docLink: {
      zh: 'http://weex-project.io/cn/references/components/index.html',
      en: 'http://weex-project.io/references/components/index.html'
    }
  }, {
    title: {
      zh: '内置模块',
      en: 'Built-in Modules'
    },
    docLink: {
      zh: 'http://weex-project.io/cn/references/modules/index.html',
      en: 'http://weex-project.io/references/modules/index.html'
    }
  }, {
    title: {
      zh: '扩展 Android 组件/模块',
      en: 'Extend Android'
    },
    docLink: {
      zh: 'http://weex-project.io/cn/guide/extend-android.html',
      en: 'http://weex-project.io/guide/extend-android.html'
    }
  }, {
    title: {
      zh: '扩展 iOS 组件/模块',
      en: 'Extend iOS'
    },
    docLink: {
      zh: 'http://weex-project.io/cn/guide/extend-ios.html',
      en: 'http://weex-project.io/guide/extend-ios.html'
    }
  }, {
    title: {
      zh: '使用 weex-toolkit',
      en: 'Use weex-toolkit'
    },
    docLink: {
      zh: 'http://weex-project.io/cn/tools/toolkit.html',
      en: 'http://weex-project.io/tools/toolkit.html'
    }
  }, {
    title: {
      zh: '如何参与贡献',
      en: 'How to Contribute'
    },
    docLink: {
      zh: 'http://weex-project.io/cn/contributing.html',
      en: 'http://weex-project.io/contributing.html'
    }
  }]
}, (_ref = {
  subject: 'vue',
  mainColor: '#42b983',
  title: { zh: '学习 Vue.js', en: 'Learn Vue.js' },
  poster: 'https://gw.alicdn.com/tfs/TB1J_uKcMMPMeJjy1XdXXasrXXa-400-400.png',
  posterBg: '#E7FBF2',
  posterStyle: {
    width: '300px',
    height: '300px'
  }
}, (0, _defineProperty3.default)(_ref, 'title', {
  zh: '学习 Vue.js',
  en: 'Learn Vue.js'
}), (0, _defineProperty3.default)(_ref, 'copyright', {
  zh: '来自 https://cn.vuejs.org/',
  en: 'From https://vuejs.org/'
}), (0, _defineProperty3.default)(_ref, 'lessons', [{
  title: {
    zh: 'Vue.js 是什么？',
    en: 'What is Vue.js ?'
  },
  docLink: {
    zh: 'https://cn.vuejs.org/v2/guide/index.html',
    en: 'https://vuejs.org/v2/guide/index.html'
  }
}, {
  title: {
    zh: '单文件组件',
    en: 'Single File Components'
  },
  docLink: {
    zh: 'https://cn.vuejs.org/v2/guide/single-file-components.html',
    en: 'https://vuejs.org/v2/guide/single-file-components.html'
  }
}, {
  title: {
    zh: '模板语法',
    en: 'Template Syntax'
  },
  docLink: {
    zh: 'https://cn.vuejs.org/v2/guide/syntax.html',
    en: 'https://vuejs.org/v2/guide/syntax.html'
  }
}, {
  title: {
    zh: 'Class 与 Style 绑定',
    en: 'Class and Style Bindings'
  },
  docLink: {
    zh: 'https://cn.vuejs.org/v2/guide/class-and-style.html',
    en: 'https://vuejs.org/v2/guide/class-and-style.html'
  }
}, {
  title: {
    zh: '条件渲染',
    en: 'Conditional Rendering'
  },
  docLink: {
    zh: 'https://cn.vuejs.org/v2/guide/conditional.html',
    en: 'https://vuejs.org/v2/guide/conditional.html'
  }
}, {
  title: {
    zh: '列表渲染',
    en: 'List Rendering'
  },
  docLink: {
    zh: 'https://cn.vuejs.org/v2/guide/list.html',
    en: 'https://vuejs.org/v2/guide/list.html'
  }
}, {
  title: {
    zh: '事件处理',
    en: 'Event Handling'
  },
  docLink: {
    zh: 'https://cn.vuejs.org/v2/guide/events.html',
    en: 'https://vuejs.org/v2/guide/events.html'
  }
}, {
  title: {
    zh: '表单输入绑定',
    en: 'Form Input Bindings'
  },
  docLink: {
    zh: 'https://cn.vuejs.org/v2/guide/forms.html',
    en: 'https://vuejs.org/v2/guide/forms.html'
  }
}, {
  title: {
    zh: 'Vue 实例',
    en: 'The Vue Instance'
  },
  docLink: {
    zh: 'https://cn.vuejs.org/v2/guide/instance.html',
    en: 'https://vuejs.org/v2/guide/instance.html'
  }
}, {
  title: {
    zh: '在 Weex 中使用 Vue.js',
    en: 'Use Vue.js on Weex'
  },
  docLink: {
    zh: 'http://weex-project.io/cn/guide/use-vue.html',
    en: 'http://weex-project.io/guide/use-vue.html'
  }
}, {
  title: {
    zh: '混合（mixins）',
    en: 'Mixins'
  },
  docLink: {
    zh: 'https://cn.vuejs.org/v2/guide/mixins.html',
    en: 'https://vuejs.org/v2/guide/mixins.html'
  }
}, {
  title: {
    zh: '过滤器（filters）',
    en: 'Filters'
  },
  docLink: {
    zh: 'https://cn.vuejs.org/v2/guide/filters.html',
    en: 'https://vuejs.org/v2/guide/filters.html'
  }
}, {
  title: {
    zh: '插件（plugins）',
    en: 'Plugins'
  },
  docLink: {
    zh: 'https://cn.vuejs.org/v2/guide/plugins.html',
    en: 'https://vuejs.org/v2/guide/plugins.html'
  }
}, {
  title: {
    zh: '自定义指令',
    en: 'Custom Directives'
  },
  docLink: {
    zh: 'https://cn.vuejs.org/v2/guide/custom-directive.html',
    en: 'https://vuejs.org/v2/guide/custom-directive.html'
  }
}, {
  title: {
    zh: '状态管理',
    en: 'State Management'
  },
  docLink: {
    zh: 'https://cn.vuejs.org/v2/guide/state-management.html',
    en: 'https://vuejs.org/v2/guide/state-management.html'
  }
}, {
  title: {
    zh: '深入响应式原理',
    en: 'Reactivity in Depth'
  },
  docLink: {
    zh: 'https://cn.vuejs.org/v2/guide/reactivity.html',
    en: 'https://vuejs.org/v2/guide/reactivity.html'
  }
}, {
  title: {
    zh: '渲染函数',
    en: 'Render Functions'
  },
  docLink: {
    zh: 'https://cn.vuejs.org/v2/guide/render-function.html',
    en: 'https://vuejs.org/v2/guide/render-function.html'
  }
}, {
  title: {
    zh: 'TypeScript 支持',
    en: 'TypeScript Support'
  },
  docLink: {
    zh: 'https://cn.vuejs.org/v2/guide/typescript.html',
    en: 'https://vuejs.org/v2/guide/typescript.html'
  }
}, {
  title: 'API',
  docLink: {
    zh: 'https://cn.vuejs.org/v2/api/',
    en: 'https://vuejs.org/v2/api/'
  }
}]), _ref), (_ref2 = {
  subject: 'javascript',
  mainColor: '#F7BD2A',
  title: { zh: '学习 Javascript', en: 'Learn Javascript' },
  poster: 'https://gw.alicdn.com/tfs/TB1bT98hMoQMeJjy0FpXXcTxpXa-1500-700.png',
  posterBg: '#FAF3EB',
  posterStyle: {
    width: '750px',
    height: '350px'
  }
}, (0, _defineProperty3.default)(_ref2, 'title', {
  zh: '学习 Javascript',
  en: 'Learn Javascript'
}), (0, _defineProperty3.default)(_ref2, 'copyright', {
  zh: '来自 MDN (Mozilla Developer Network)',
  en: 'From MDN (Mozilla Developer Network)'
}), (0, _defineProperty3.default)(_ref2, 'lessons', [{
  title: {
    zh: '什么是 Javascript ？',
    en: 'What is Javascript ?'
  },
  docLink: {
    zh: 'https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/What_is_JavaScript',
    en: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_is_JavaScript'
  }
}, {
  title: {
    zh: 'JavaScript基础',
    en: 'JavaScript basics'
  },
  docLink: {
    zh: 'https://developer.mozilla.org/zh-CN/docs/Learn/Getting_started_with_the_web/JavaScript_basics',
    en: 'https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics'
  }
}, {
  title: {
    zh: '重新介绍 JavaScript',
    en: 'A re-introduction to JavaScript'
  },
  docLink: {
    zh: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/A_re-introduction_to_JavaScript',
    en: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript'
  }
}, {
  title: {
    zh: '语法和数据类型',
    en: 'Grammar and types'
  },
  docLink: {
    zh: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Grammar_and_types#Variable_scope',
    en: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#Variable_scope'
  }
}, {
  title: {
    zh: '数据类型和数据结构',
    en: 'Data types and data structures'
  },
  docLink: {
    zh: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures',
    en: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures'
  }
}, {
  title: {
    zh: '变量',
    en: 'Variables'
  },
  docLink: {
    zh: 'https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/Variables',
    en: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Variables'
  }
}, {
  title: {
    zh: '数字和操作符',
    en: 'Numbers and operators'
  },
  docLink: {
    zh: 'https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/Math',
    en: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Math'
  }
}, {
  title: {
    zh: '字符串',
    en: 'Handling text'
  },
  docLink: {
    zh: 'https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/Strings',
    en: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Strings'
  }
}, {
  title: {
    zh: '常用的 String 方法',
    en: 'Useful string methods'
  },
  docLink: {
    zh: 'https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/Useful_string_methods',
    en: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Useful_string_methods'
  }
}, {
  title: {
    zh: '数组',
    en: 'Arrays'
  },
  docLink: {
    zh: 'https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/Arrays',
    en: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Arrays'
  }
}, {
  title: {
    zh: '函数',
    en: 'Functions'
  },
  docLink: {
    zh: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Functions',
    en: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions'
  }
}, {
  title: {
    zh: 'JavaScript 对象基础',
    en: 'JavaScript object basics'
  },
  docLink: {
    zh: 'https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects/Basics',
    en: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Basics'
  }
}, {
  title: {
    zh: '使用对象',
    en: 'Working with objects'
  },
  docLink: {
    zh: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Working_with_Objects',
    en: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects'
  }
}, {
  title: {
    zh: '使用 JSON 数据',
    en: 'Working with JSON'
  },
  docLink: {
    zh: 'https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects/JSON',
    en: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON'
  }
}, {
  title: {
    zh: '对象模型的细节',
    en: 'Details of the object model'
  },
  docLink: {
    zh: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Details_of_the_Object_Model',
    en: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Details_of_the_Object_Model'
  }
}, {
  title: {
    zh: '对象原型',
    en: 'Object prototypes'
  },
  docLink: {
    zh: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes',
    en: 'https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects/Object_prototypes'
  }
}, {
  title: {
    zh: 'JavaScript 中的继承',
    en: 'Inheritance in JavaScript'
  },
  docLink: {
    zh: 'https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects/Inheritance',
    en: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Inheritance'
  }
}, {
  title: {
    zh: '继承与原型链',
    en: 'Inheritance and the prototype chain'
  },
  docLink: {
    zh: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain',
    en: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain'
  }
}, {
  title: {
    zh: '严格模式',
    en: 'Strict mode'
  },
  docLink: {
    zh: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode',
    en: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode'
  }
}, {
  title: {
    zh: '内存管理',
    en: 'Memory Management'
  },
  docLink: {
    zh: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Memory_Management',
    en: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management'
  }
}, {
  title: {
    zh: '并发模型与事件循环',
    en: 'Concurrency model and Event Loop'
  },
  docLink: {
    zh: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/EventLoop',
    en: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop'
  }
}, {
  //   title: {
  //     zh: '索引集合类',
  //     en: 'Indexed collections'
  //   },
  //   docLink: {
  //     zh: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Indexed_collections',
  //     en: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections'
  //   }
  // }, {
  //   title: {
  //     zh: '带键的集合',
  //     en: 'Keyed collections'
  //   },
  //   docLink: {
  //     zh: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Keyed_collections',
  //     en: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Keyed_collections'
  //   }
  // }, {
  title: {
    zh: 'JavaScript 标准库',
    en: 'Standard built-in objects'
  },
  docLink: {
    zh: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects',
    en: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects'
  }
}]), _ref2), (_ref3 = {
  subject: 'css',
  mainColor: '#F56FC6',
  title: { zh: '学习 CSS', en: 'Learn CSS' },
  titleColor: '#FFFFFF',
  poster: 'https://gw.alicdn.com/tfs/TB1k6anhMMPMeJjy1XdXXasrXXa-427-190.jpg',
  posterBg: '#FFA2DE',
  posterStyle: {
    width: '517px',
    height: '230px'
  }
}, (0, _defineProperty3.default)(_ref3, 'title', {
  zh: '学习 CSS',
  en: 'Learn CSS'
}), (0, _defineProperty3.default)(_ref3, 'copyright', {
  zh: '来自 MDN (Mozilla Developer Network)',
  en: 'From MDN (Mozilla Developer Network)'
}), (0, _defineProperty3.default)(_ref3, 'lessons', [{
  title: {
    zh: '什么是 CSS ？',
    en: 'What is CSS ?'
  },
  docLink: {
    zh: 'https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Getting_started/What_is_CSS',
    en: 'https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Getting_started/What_is_CSS'
  }
}, {
  title: {
    zh: 'CSS 语法',
    en: 'CSS Syntax'
  },
  docLink: {
    zh: 'https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Introduction_to_CSS/Syntax',
    en: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS/Syntax'
  }
}, {
  title: {
    zh: 'CSS的值和单位',
    en: 'CSS Values and Units'
  },
  docLink: {
    zh: 'https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Introduction_to_CSS/Values_and_units',
    en: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS/Values_and_units'
  }
}, {
  title: {
    zh: '盒模型',
    en: 'The Box Model'
  },
  docLink: {
    zh: 'https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Introduction_to_CSS/Box_model',
    en: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS/Box_model'
  }
}, {
  title: {
    zh: '盒模型的属性',
    en: 'Box Model Properties'
  },
  docLink: {
    zh: 'https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Box_Model',
    en: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model'
  }
}, {
  title: {
    zh: '定位布局',
    en: 'Positioning'
  },
  docLink: {
    zh: 'https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/%E5%AE%9A%E4%BD%8Dx',
    en: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/positioning'
  }
}, {
  title: {
    zh: '定位布局的属性',
    en: 'CSS Positioning'
  },
  docLink: {
    zh: 'https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Positioning',
    en: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning'
  }
}, {
  title: {
    zh: 'Flexbox 布局',
    en: 'Flexbox Layout'
  },
  docLink: {
    zh: 'https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Flexbox',
    en: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox'
  }
}, {
  title: {
    zh: 'Flexbox 布局的属性',
    en: 'CSS Flexible Box Layout'
  },
  docLink: {
    zh: 'https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout',
    en: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout'
  }
}, {
  title: {
    zh: 'Weex 中的通用样式',
    en: 'Common Styles in Weex'
  },
  docLink: {
    zh: 'http://weex-project.io/cn/references/common-style.html',
    en: 'http://weex-project.io/references/common-style.html'
  }
}, {
  title: {
    zh: 'Weex 中的文本样式',
    en: 'Text Styles in Weex'
  },
  docLink: {
    zh: 'http://weex-project.io/cn/references/text-style.html',
    en: 'http://weex-project.io/references/text-style.html'
  }
}, {
  title: {
    zh: '块格式化上下文(BFC)',
    en: 'Block Formatting Context'
  },
  docLink: {
    zh: 'https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context',
    en: 'https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Block_formatting_context'
  }
}, {
  title: {
    zh: '视觉格式化模型',
    en: 'Visual Formatting Model'
  },
  docLink: {
    zh: 'https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Visual_formatting_model',
    en: 'https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Visual_formatting_model'
  }
}, {
  title: 'CSS Reference',
  docLink: {
    zh: 'https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference',
    en: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference'
  }
}]), _ref3)];

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(83);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(84), __esModule: true };

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(85);
var $Object = __webpack_require__(4).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(16);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(2), 'Object', { defineProperty: __webpack_require__(1).f });


/***/ }),
/* 86 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('scroller', {
    staticClass: ["wrapper"]
  }, [_c('slider', {
    staticClass: ["slider"],
    attrs: {
      "autoPlay": "true"
    }
  }, [_vm._l((_vm.guideLessons), function(item, i) {
    return _c('div', {
      key: item.subject,
      staticClass: ["center"],
      style: {
        backgroundColor: item.posterBg
      },
      on: {
        "click": function($event) {
          _vm.lenssonIndex = i
        }
      }
    }, [_c('div', {
      staticClass: ["center", "size"]
    }, [_c('image', {
      style: item.posterStyle,
      attrs: {
        "resize": "cover",
        "src": item.poster
      }
    })]), _c('text', {
      staticClass: ["slider-title"],
      style: {
        color: item.titleColor || item.mainColor
      }
    }, [_vm._v(_vm._s(_vm.i18n(item.title)))])])
  }), _c('indicator', {
    staticClass: ["indicator"]
  })], 2), _c('lesson', {
    attrs: {
      "mainColor": _vm.chosenLesson.mainColor,
      "title": _vm.chosenLesson.title,
      "lessons": _vm.chosenLesson.lessons,
      "copyright": _vm.chosenLesson.copyright
    }
  })], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ })
/******/ ]);