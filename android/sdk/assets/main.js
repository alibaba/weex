(this.nativeLog || function(s) {console.log(s)})('START JS FRAMEWORK: 0.10.13 Build 20160707');
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	__webpack_require__(1);
	
	var _runtime = __webpack_require__(43);
	
	var _runtime2 = _interopRequireDefault(_runtime);
	
	var _package = __webpack_require__(68);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var native = _package.subversion.native;
	var transformer = _package.subversion.transformer;
	
	var _loop = function _loop(methodName) {
	  global[methodName] = function () {
	    var ret = _runtime2.default[methodName].apply(_runtime2.default, arguments);
	    if (ret instanceof Error) {
	      console.error(ret.toString());
	    }
	    return ret;
	  };
	};
	
	for (var methodName in _runtime2.default) {
	  _loop(methodName);
	}
	
	Object.assign(global, {
	  frameworkVersion: native,
	  needTransformerVersion: transformer
	});
	
	/**
	 * register methods
	 */
	var methods = __webpack_require__(69);
	var _global = global;
	var registerMethods = _global.registerMethods;
	
	registerMethods(methods);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(2);
	
	__webpack_require__(40);
	
	__webpack_require__(41);
	
	__webpack_require__(42);

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(3);

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(4);
	module.exports = __webpack_require__(7).Object.assign;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(5);
	
	$export($export.S + $export.F, 'Object', { assign: __webpack_require__(23) });

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var global = __webpack_require__(6),
	    core = __webpack_require__(7),
	    hide = __webpack_require__(8),
	    redefine = __webpack_require__(18),
	    ctx = __webpack_require__(21),
	    PROTOTYPE = 'prototype';
	
	var $export = function $export(type, name, source) {
	  var IS_FORCED = type & $export.F,
	      IS_GLOBAL = type & $export.G,
	      IS_STATIC = type & $export.S,
	      IS_PROTO = type & $export.P,
	      IS_BIND = type & $export.B,
	      target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE],
	      exports = IS_GLOBAL ? core : core[name] || (core[name] = {}),
	      expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {}),
	      key,
	      own,
	      out,
	      exp;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // extend global
	    if (target) redefine(target, key, out, type & $export.U);
	    // export
	    if (exports[key] != out) hide(exports, key, exp);
	    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
	  }
	};
	global.core = core;
	// type bitmap
	$export.F = 1; // forced
	$export.G = 2; // global
	$export.S = 4; // static
	$export.P = 8; // proto
	$export.B = 16; // bind
	$export.W = 32; // wrap
	$export.U = 64; // safe
	$export.R = 128; // real proto method for `library`
	module.exports = $export;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	var core = module.exports = { version: '2.4.0' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var dP = __webpack_require__(9),
	    createDesc = __webpack_require__(17);
	module.exports = __webpack_require__(13) ? function (object, key, value) {
	  return dP.f(object, key, createDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var anObject = __webpack_require__(10),
	    IE8_DOM_DEFINE = __webpack_require__(12),
	    toPrimitive = __webpack_require__(16),
	    dP = Object.defineProperty;
	
	exports.f = __webpack_require__(13) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (IE8_DOM_DEFINE) try {
	    return dP(O, P, Attributes);
	  } catch (e) {/* empty */}
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var isObject = __webpack_require__(11);
	module.exports = function (it) {
	  if (!isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	module.exports = function (it) {
	  return (typeof it === 'undefined' ? 'undefined' : _typeof(it)) === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = !__webpack_require__(13) && !__webpack_require__(14)(function () {
	  return Object.defineProperty(__webpack_require__(15)('div'), 'a', { get: function get() {
	      return 7;
	    } }).a != 7;
	});

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(14)(function () {
	  return Object.defineProperty({}, 'a', { get: function get() {
	      return 7;
	    } }).a != 7;
	});

/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var isObject = __webpack_require__(11),
	    document = __webpack_require__(6).document
	// in old IE typeof document.createElement is 'object'
	,
	    is = isObject(document) && isObject(document.createElement);
	module.exports = function (it) {
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(11);
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

/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var global = __webpack_require__(6),
	    hide = __webpack_require__(8),
	    has = __webpack_require__(19),
	    SRC = __webpack_require__(20)('src'),
	    TO_STRING = 'toString',
	    $toString = Function[TO_STRING],
	    TPL = ('' + $toString).split(TO_STRING);
	
	__webpack_require__(7).inspectSource = function (it) {
	  return $toString.call(it);
	};
	
	(module.exports = function (O, key, val, safe) {
	  var isFunction = typeof val == 'function';
	  if (isFunction) has(val, 'name') || hide(val, 'name', key);
	  if (O[key] === val) return;
	  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
	  if (O === global) {
	    O[key] = val;
	  } else {
	    if (!safe) {
	      delete O[key];
	      hide(O, key, val);
	    } else {
	      if (O[key]) O[key] = val;else hide(O, key, val);
	    }
	  }
	  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, TO_STRING, function toString() {
	  return typeof this == 'function' && this[SRC] || $toString.call(this);
	});

/***/ },
/* 19 */
/***/ function(module, exports) {

	"use strict";
	
	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';
	
	var id = 0,
	    px = Math.random();
	module.exports = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// optional / simple context binding
	var aFunction = __webpack_require__(22);
	module.exports = function (fn, that, length) {
	  aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1:
	      return function (a) {
	        return fn.call(that, a);
	      };
	    case 2:
	      return function (a, b) {
	        return fn.call(that, a, b);
	      };
	    case 3:
	      return function (a, b, c) {
	        return fn.call(that, a, b, c);
	      };
	  }
	  return function () /* ...args */{
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	
	var getKeys = __webpack_require__(24),
	    gOPS = __webpack_require__(37),
	    pIE = __webpack_require__(38),
	    toObject = __webpack_require__(39),
	    IObject = __webpack_require__(27),
	    $assign = Object.assign;
	
	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(14)(function () {
	  var A = {},
	      B = {},
	      S = Symbol(),
	      K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function (k) {
	    B[k] = k;
	  });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source) {
	  // eslint-disable-line no-unused-vars
	  var T = toObject(target),
	      aLen = arguments.length,
	      index = 1,
	      getSymbols = gOPS.f,
	      isEnum = pIE.f;
	  while (aLen > index) {
	    var S = IObject(arguments[index++]),
	        keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S),
	        length = keys.length,
	        j = 0,
	        key;
	    while (length > j) {
	      if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
	    }
	  }return T;
	} : $assign;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys = __webpack_require__(25),
	    enumBugKeys = __webpack_require__(36);
	
	module.exports = Object.keys || function keys(O) {
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var has = __webpack_require__(19),
	    toIObject = __webpack_require__(26),
	    arrayIndexOf = __webpack_require__(30)(false),
	    IE_PROTO = __webpack_require__(34)('IE_PROTO');
	
	module.exports = function (object, names) {
	  var O = toIObject(object),
	      i = 0,
	      result = [],
	      key;
	  for (key in O) {
	    if (key != IE_PROTO) has(O, key) && result.push(key);
	  } // Don't enum bug & hidden keys
	  while (names.length > i) {
	    if (has(O, key = names[i++])) {
	      ~arrayIndexOf(result, key) || result.push(key);
	    }
	  }return result;
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(27),
	    defined = __webpack_require__(29);
	module.exports = function (it) {
	  return IObject(defined(it));
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(28);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 28 */
/***/ function(module, exports) {

	"use strict";
	
	var toString = {}.toString;
	
	module.exports = function (it) {
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 29 */
/***/ function(module, exports) {

	"use strict";
	
	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(26),
	    toLength = __webpack_require__(31),
	    toIndex = __webpack_require__(33);
	module.exports = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIObject($this),
	        length = toLength(O.length),
	        index = toIndex(fromIndex, length),
	        value;
	    // Array#includes uses SameValueZero equality algorithm
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      if (value != value) return true;
	      // Array#toIndex ignores holes, Array#includes - not
	    } else for (; length > index; index++) {
	      if (IS_INCLUDES || index in O) {
	        if (O[index] === el) return IS_INCLUDES || index || 0;
	      }
	    }return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 7.1.15 ToLength
	var toInteger = __webpack_require__(32),
	    min = Math.min;
	module.exports = function (it) {
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 32 */
/***/ function(module, exports) {

	"use strict";
	
	// 7.1.4 ToInteger
	var ceil = Math.ceil,
	    floor = Math.floor;
	module.exports = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var toInteger = __webpack_require__(32),
	    max = Math.max,
	    min = Math.min;
	module.exports = function (index, length) {
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var shared = __webpack_require__(35)('keys'),
	    uid = __webpack_require__(20);
	module.exports = function (key) {
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var global = __webpack_require__(6),
	    SHARED = '__core-js_shared__',
	    store = global[SHARED] || (global[SHARED] = {});
	module.exports = function (key) {
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 36 */
/***/ function(module, exports) {

	'use strict';
	
	// IE 8- don't enum bug keys
	module.exports = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(',');

/***/ },
/* 37 */
/***/ function(module, exports) {

	"use strict";
	
	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 38 */
/***/ function(module, exports) {

	"use strict";
	
	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(29);
	module.exports = function (it) {
	  return Object(defined(it));
	};

/***/ },
/* 40 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var _global = global;
	var setTimeout = _global.setTimeout;
	var setTimeoutNative = _global.setTimeoutNative;
	
	
	var MSG = 'Use "global.setTimeout"  is unexpected, ' + 'please use require("@weex-module").setTimeout instead.';
	
	// fix no setTimeout on Android V8
	/* istanbul ignore if */
	if (typeof setTimeout === 'undefined' && typeof setTimeoutNative === 'function') {
	  (function () {
	    var timeoutMap = {};
	    var timeoutId = 0;
	    global.setTimeout = function (cb, time) {
	      console.warn(MSG);
	      timeoutMap[++timeoutId] = cb;
	      setTimeoutNative(timeoutId.toString(), time);
	    };
	    global.setTimeoutCallback = function (id) {
	      if (typeof timeoutMap[id] === 'function') {
	        timeoutMap[id]();
	        delete timeoutMap[id];
	      }
	    };
	  })();
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 41 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var OriginPromise = global.Promise || function () {};
	var MSG = 'Using "Promise" is unexpected';
	
	var UnexpectedPromise = function UnexpectedPromise() {
	  console.warn(MSG);
	
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }
	
	  return new (Function.prototype.bind.apply(OriginPromise, [null].concat(args)))();
	};
	
	var fn = ['all', 'race', 'resolve', 'reject'];
	fn.forEach(function (n) {
	  UnexpectedPromise[n] = function () {
	    console.warn(MSG);
	    return OriginPromise[n] && OriginPromise[n].apply(OriginPromise, arguments);
	  };
	});
	
	global.Promise = UnexpectedPromise;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 42 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var _global = global;
	var console = _global.console;
	var nativeLog = _global.nativeLog;
	
	var LEVELS = ['error', 'warn', 'info', 'log', 'debug'];
	var levelMap = {};
	
	generateLevelMap();
	
	/* istanbul ignore if */
	if (typeof console === 'undefined' || // Android
	global.WXEnvironment && global.WXEnvironment.platform === 'iOS' // iOS
	) {
	    global.console = {
	      debug: function debug() {
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	          args[_key] = arguments[_key];
	        }
	
	        if (checkLevel('debug')) {
	          nativeLog.apply(undefined, _toConsumableArray(format(args)).concat(['__DEBUG']));
	        }
	      },
	      log: function log() {
	        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	          args[_key2] = arguments[_key2];
	        }
	
	        if (checkLevel('log')) {
	          nativeLog.apply(undefined, _toConsumableArray(format(args)).concat(['__LOG']));
	        }
	      },
	      info: function info() {
	        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	          args[_key3] = arguments[_key3];
	        }
	
	        if (checkLevel('info')) {
	          nativeLog.apply(undefined, _toConsumableArray(format(args)).concat(['__INFO']));
	        }
	      },
	      warn: function warn() {
	        for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
	          args[_key4] = arguments[_key4];
	        }
	
	        if (checkLevel('warn')) {
	          nativeLog.apply(undefined, _toConsumableArray(format(args)).concat(['__WARN']));
	        }
	      },
	      error: function error() {
	        for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
	          args[_key5] = arguments[_key5];
	        }
	
	        if (checkLevel('error')) {
	          nativeLog.apply(undefined, _toConsumableArray(format(args)).concat(['__ERROR']));
	        }
	      }
	    };
	  } else {
	  // HTML5
	  var debug = console.debug;
	  var log = console.log;
	  var info = console.info;
	  var warn = console.warn;
	  var error = console.error;
	
	  console.__ori__ = { debug: debug, log: log, info: info, warn: warn, error: error };
	  console.debug = function () {
	    for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
	      args[_key6] = arguments[_key6];
	    }
	
	    if (checkLevel('debug')) {
	      console.__ori__.debug.apply(console, args);
	    }
	  };
	  console.log = function () {
	    for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
	      args[_key7] = arguments[_key7];
	    }
	
	    if (checkLevel('log')) {
	      console.__ori__.log.apply(console, args);
	    }
	  };
	  console.info = function () {
	    for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
	      args[_key8] = arguments[_key8];
	    }
	
	    if (checkLevel('info')) {
	      console.__ori__.info.apply(console, args);
	    }
	  };
	  console.warn = function () {
	    for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
	      args[_key9] = arguments[_key9];
	    }
	
	    if (checkLevel('warn')) {
	      console.__ori__.warn.apply(console, args);
	    }
	  };
	  console.error = function () {
	    for (var _len10 = arguments.length, args = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
	      args[_key10] = arguments[_key10];
	    }
	
	    if (checkLevel('error')) {
	      console.__ori__.error.apply(console, args);
	    }
	  };
	}
	
	function generateLevelMap() {
	  LEVELS.forEach(function (level) {
	    var levelIndex = LEVELS.indexOf(level);
	    levelMap[level] = {};
	    LEVELS.forEach(function (type) {
	      var typeIndex = LEVELS.indexOf(type);
	      if (typeIndex <= levelIndex) {
	        levelMap[level][type] = true;
	      }
	    });
	  });
	}
	
	function normalize(v) {
	  var type = Object.prototype.toString.call(v);
	  if (type.toLowerCase() === '[object object]') {
	    v = JSON.stringify(v);
	  } else {
	    v = String(v);
	  }
	  return v;
	}
	
	function checkLevel(type) {
	  var logLevel = global.WXEnvironment && global.WXEnvironment.logLevel || 'log';
	  return levelMap[logLevel] && levelMap[logLevel][type];
	}
	
	function format(args) {
	  return args.map(function (v) {
	    return normalize(v);
	  });
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createInstance = createInstance;
	
	var _frameworks = __webpack_require__(44);
	
	var _frameworks2 = _interopRequireDefault(_frameworks);
	
	var _vdom = __webpack_require__(66);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var config = {
	  Document: _vdom.Document, Element: _vdom.Element, Comment: _vdom.Comment,
	  sendTasks: function sendTasks() {
	    var _global;
	
	    return (_global = global).callNative.apply(_global, arguments);
	  }
	};
	
	for (var name in _frameworks2.default) {
	  var framework = _frameworks2.default[name];
	  framework.init(config);
	}
	
	var versionRegExp = /^\/\/ *(\{[^\}]*\}) *\r?\n/;
	
	function checkVersion(code) {
	  var info = void 0;
	  var result = versionRegExp.exec(code);
	  if (result) {
	    try {
	      info = JSON.parse(result[1]);
	    } catch (e) {}
	  }
	  return info;
	}
	
	var instanceMap = {};
	
	function createInstance(id, code, config, data) {
	  var info = instanceMap[id];
	  if (!info) {
	    info = checkVersion(code) || {};
	    if (!_frameworks2.default[info.framework]) {
	      info.framework = 'Weex';
	    }
	    instanceMap[id] = info;
	    config = config || {};
	    config.bundleVersion = info.version;
	    return _frameworks2.default[info.framework].createInstance(id, code, config, data);
	  }
	  return new Error('invalid instance id "' + id + '"');
	}
	
	var methods = {
	  createInstance: createInstance
	};
	
	function genInit(methodName) {
	  methods[methodName] = function () {
	    for (var _name in _frameworks2.default) {
	      var _framework = _frameworks2.default[_name];
	      if (_framework && _framework[methodName]) {
	        _framework[methodName].apply(_framework, arguments);
	      }
	    }
	  };
	}
	
	['registerComponents', 'registerModules', 'registerMethods'].forEach(genInit);
	
	function genInstance(methodName) {
	  methods[methodName] = function () {
	    var id = arguments.length <= 0 ? undefined : arguments[0];
	    var info = instanceMap[id];
	    if (info && _frameworks2.default[info.framework]) {
	      var _frameworks$info$fram;
	
	      return (_frameworks$info$fram = _frameworks2.default[info.framework])[methodName].apply(_frameworks$info$fram, arguments);
	    }
	    return new Error('invalid instance id "' + id + '"');
	  };
	}
	
	['destroyInstance', 'refreshInstance', 'callJS', 'getRoot'].forEach(genInstance);
	
	methods.receiveTasks = methods.callJS;
	
	exports.default = methods;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _default = __webpack_require__(45);
	
	var Weex = _interopRequireWildcard(_default);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	exports.default = {
	  Weex: Weex
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /**
	                                                                                                                                                                                                                                                   * @fileOverview Main entry, instance manager
	                                                                                                                                                                                                                                                   *
	                                                                                                                                                                                                                                                   * - createInstance(instanceId, code, options, data)
	                                                                                                                                                                                                                                                   * - refreshInstance(instanceId, data)
	                                                                                                                                                                                                                                                   * - destroyInstance(instanceId)
	                                                                                                                                                                                                                                                   * - registerComponents(components)
	                                                                                                                                                                                                                                                   * - registerModules(modules)
	                                                                                                                                                                                                                                                   * - getRoot(instanceId)
	                                                                                                                                                                                                                                                   * - instanceMap
	                                                                                                                                                                                                                                                   * - callJS(instanceId, tasks)
	                                                                                                                                                                                                                                                   *   - fireEvent(ref, type, data)
	                                                                                                                                                                                                                                                   *   - callback(funcId, data)
	                                                                                                                                                                                                                                                   */
	
	exports.init = init;
	exports.createInstance = createInstance;
	exports.refreshInstance = refreshInstance;
	exports.destroyInstance = destroyInstance;
	exports.registerComponents = registerComponents;
	exports.registerModules = registerModules;
	exports.registerMethods = registerMethods;
	exports.getRoot = getRoot;
	exports.callJS = callJS;
	
	var _config = __webpack_require__(46);
	
	var _config2 = _interopRequireDefault(_config);
	
	var _app = __webpack_require__(47);
	
	var _app2 = _interopRequireDefault(_app);
	
	var _vm = __webpack_require__(52);
	
	var _vm2 = _interopRequireDefault(_vm);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var nativeComponentMap = _config2.default.nativeComponentMap;
	
	var instanceMap = {};
	
	function init(cfg) {
	  _config2.default.Document = cfg.Document;
	  _config2.default.Element = cfg.Element;
	  _config2.default.Comment = cfg.Comment;
	  _config2.default.sendTasks = cfg.sendTasks;
	}
	
	/**
	 * create a Weex instance
	 *
	 * @param  {string} instanceId
	 * @param  {string} code
	 * @param  {object} [options] option `HAS_LOG` enable print log
	 * @param  {object} [data]
	 */
	function createInstance(instanceId, code, options, data) {
	  var instance = instanceMap[instanceId];
	  options = options || {};
	
	  _config2.default.debug = options.debug;
	
	  var result = void 0;
	  if (!instance) {
	    instance = new _app2.default(instanceId, options);
	    instanceMap[instanceId] = instance;
	    result = instance.init(code, data);
	  } else {
	    result = new Error('invalid instance id "' + instanceId + '"');
	  }
	
	  return result;
	}
	
	/**
	 * refresh a Weex instance
	 *
	 * @param  {string} instanceId
	 * @param  {object} data
	 */
	function refreshInstance(instanceId, data) {
	  var instance = instanceMap[instanceId];
	  var result = void 0;
	  if (instance) {
	    result = instance.refreshData(data);
	  } else {
	    result = new Error('invalid instance id "' + instanceId + '"');
	  }
	  return result;
	}
	
	/**
	 * destroy a Weex instance
	 * @param  {string} instanceId
	 */
	function destroyInstance(instanceId) {
	  var instance = instanceMap[instanceId];
	  if (!instance) {
	    return new Error('invalid instance id "' + instanceId + '"');
	  }
	
	  instance.destroy();
	  delete instanceMap[instanceId];
	  return instanceMap;
	}
	
	/**
	 * register the name of each native component
	 * @param  {array} components array of name
	 */
	function registerComponents(components) {
	  if (Array.isArray(components)) {
	    components.forEach(function register(name) {
	      /* istanbul ignore if */
	      if (!name) {
	        return;
	      }
	      if (typeof name === 'string') {
	        nativeComponentMap[name] = true;
	      } else if ((typeof name === 'undefined' ? 'undefined' : _typeof(name)) === 'object' && typeof name.type === 'string') {
	        nativeComponentMap[name.type] = name;
	      }
	    });
	  }
	}
	
	/**
	 * register the name and methods of each module
	 * @param  {object} modules a object of modules
	 */
	function registerModules(modules) {
	  if ((typeof modules === 'undefined' ? 'undefined' : _typeof(modules)) === 'object') {
	    _vm2.default.registerModules(modules);
	  }
	}
	
	/**
	 * register the name and methods of each api
	 * @param  {object} apis a object of apis
	 */
	function registerMethods(apis) {
	  if ((typeof apis === 'undefined' ? 'undefined' : _typeof(apis)) === 'object') {
	    _vm2.default.registerMethods(apis);
	  }
	}
	
	/**
	 * get a whole element tree of an instance
	 * for debugging
	 * @param  {string} instanceId
	 * @return {object} a virtual dom tree
	 */
	function getRoot(instanceId) {
	  var instance = instanceMap[instanceId];
	  var result = void 0;
	  if (instance) {
	    result = instance.getRootElement();
	  } else {
	    result = new Error('invalid instance id "' + instanceId + '"');
	  }
	  return result;
	}
	
	var jsHandlers = {
	  fireEvent: function fireEvent(instanceId, ref, type, data, domChanges) {
	    var instance = instanceMap[instanceId];
	    return instance.fireEvent(ref, type, data, domChanges);
	  },
	
	  callback: function callback(instanceId, funcId, data, ifLast) {
	    var instance = instanceMap[instanceId];
	    return instance.callback(funcId, data, ifLast);
	  }
	};
	
	/**
	 * accept calls from native (event or callback)
	 *
	 * @param  {string} instanceId
	 * @param  {array} tasks list with `method` and `args`
	 */
	function callJS(instanceId, tasks) {
	  var instance = instanceMap[instanceId];
	  if (instance && Array.isArray(tasks)) {
	    var _ret = function () {
	      var results = [];
	      tasks.forEach(function (task) {
	        var handler = jsHandlers[task.method];
	        var args = [].concat(_toConsumableArray(task.args));
	        if (typeof handler === 'function') {
	          args.unshift(instanceId);
	          results.push(handler.apply(undefined, _toConsumableArray(args)));
	        }
	      });
	      return {
	        v: results
	      };
	    }();
	
	    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	  }
	  return new Error('invalid instance id "' + instanceId + '" or tasks');
	}

/***/ },
/* 46 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  nativeComponentMap: {
	    text: true,
	    image: true,
	    container: true,
	    slider: {
	      type: 'slider',
	      append: 'tree'
	    },
	    cell: {
	      type: 'cell',
	      append: 'tree'
	    }
	  },
	  customComponentMap: {},
	  debug: false
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = AppInstance;
	
	var _util = __webpack_require__(48);
	
	var _bundle = __webpack_require__(49);
	
	var bundle = _interopRequireWildcard(_bundle);
	
	var _ctrl = __webpack_require__(64);
	
	var ctrl = _interopRequireWildcard(_ctrl);
	
	var _differ = __webpack_require__(65);
	
	var _differ2 = _interopRequireDefault(_differ);
	
	var _config = __webpack_require__(46);
	
	var _config2 = _interopRequireDefault(_config);
	
	var _register = __webpack_require__(62);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	/**
	 * @fileOverview
	 * Weex instance constructor & definition
	 */
	
	function AppInstance(instanceId, options) {
	  this.id = instanceId;
	  this.options = options || {};
	  this.vm = null;
	  this.customComponentMap = {};
	  this.callbacks = {};
	  this.doc = new _config2.default.Document(instanceId, this.options.bundleUrl);
	  this.differ = new _differ2.default(instanceId);
	  this.uid = 0;
	}
	
	function normalize(app, v) {
	  var type = (0, _util.typof)(v);
	
	  switch (type) {
	    case 'undefined':
	    case 'null':
	      return '';
	    case 'regexp':
	      return v.toString();
	    case 'date':
	      return v.toISOString();
	    case 'number':
	    case 'string':
	    case 'boolean':
	    case 'array':
	    case 'object':
	      if (v instanceof _config2.default.Element) {
	        return v.ref;
	      }
	      return v;
	    case 'function':
	      app.callbacks[++app.uid] = v;
	      return app.uid.toString();
	    default:
	      return JSON.stringify(v);
	  }
	}
	
	AppInstance.prototype.callTasks = function (tasks) {
	  var _this = this;
	
	  if ((0, _util.typof)(tasks) !== 'array') {
	    tasks = [tasks];
	  }
	
	  tasks.forEach(function (task) {
	    task.args = task.args.map(function (arg) {
	      return normalize(_this, arg);
	    });
	  });
	
	  return _config2.default.sendTasks(this.id, tasks, '-1');
	};
	
	(0, _util.extend)(AppInstance.prototype, bundle, ctrl, {
	  registerComponent: _register.registerComponent,
	  requireComponent: _register.requireComponent,
	  requireModule: _register.requireModule
	});

/***/ },
/* 48 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	exports.isReserved = isReserved;
	exports.def = def;
	exports.remove = remove;
	exports.hasOwn = hasOwn;
	exports.cached = cached;
	exports.bind = bind;
	exports.toArray = toArray;
	exports.extend = extend;
	exports.isObject = isObject;
	exports.isPlainObject = isPlainObject;
	exports.stringify = stringify;
	exports.typof = typof;
	exports.normalize = normalize;
	exports.error = error;
	exports.warn = warn;
	exports.info = info;
	exports.debug = debug;
	exports.log = log;
	/* global MutationObserver */
	
	// / lang.js
	
	/**
	 * Check if a string starts with $ or _
	 *
	 * @param {String} str
	 * @return {Boolean}
	 */
	
	function isReserved(str) {
	  var c = (str + '').charCodeAt(0);
	  return c === 0x24 || c === 0x5F;
	}
	
	/**
	 * Define a property.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @param {*} val
	 * @param {Boolean} [enumerable]
	 */
	
	function def(obj, key, val, enumerable) {
	  Object.defineProperty(obj, key, {
	    value: val,
	    enumerable: !!enumerable,
	    writable: true,
	    configurable: true
	  });
	}
	
	// / env.js
	
	// can we use __proto__?
	var hasProto = exports.hasProto = '__proto__' in {};
	
	// Browser environment sniffing
	var inBrowser = exports.inBrowser = typeof window !== 'undefined' && Object.prototype.toString.call(window) !== '[object Object]';
	
	// detect devtools
	var devtools = exports.devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
	
	// UA sniffing for working around browser-specific quirks
	var UA = inBrowser && window.navigator.userAgent.toLowerCase();
	var isIos = UA && /(iphone|ipad|ipod|ios)/i.test(UA);
	var isWechat = UA && UA.indexOf('micromessenger') > 0;
	
	/**
	 * Defer a task to execute it asynchronously. Ideally this
	 * should be executed as a microtask, so we leverage
	 * MutationObserver if it's available, and fallback to
	 * setTimeout(0).
	 *
	 * @param {Function} cb
	 * @param {Object} ctx
	 */
	
	var nextTick = exports.nextTick = function () {
	  var callbacks = [];
	  var pending = false;
	  var timerFunc = void 0;
	  function nextTickHandler() {
	    pending = false;
	    var copies = callbacks.slice(0);
	    callbacks = [];
	    for (var i = 0; i < copies.length; i++) {
	      copies[i]();
	    }
	  }
	
	  /* istanbul ignore if */
	  if (typeof MutationObserver !== 'undefined' && !(isWechat && isIos)) {
	    (function () {
	      var counter = 1;
	      var observer = new MutationObserver(nextTickHandler);
	      var textNode = document.createTextNode(counter);
	      observer.observe(textNode, {
	        characterData: true
	      });
	      timerFunc = function timerFunc() {
	        counter = (counter + 1) % 2;
	        textNode.data = counter;
	      };
	    })();
	  } else {
	    // webpack attempts to inject a shim for setImmediate
	    // if it is used as a global, so we have to work around that to
	    // avoid bundling unnecessary code.
	    var context = inBrowser ? window : typeof global !== 'undefined' ? global : {};
	    timerFunc = context.setImmediate || setTimeout;
	  }
	  return function (cb, ctx) {
	    var func = ctx ? function () {
	      cb.call(ctx);
	    } : cb;
	    callbacks.push(func);
	    if (pending) return;
	    pending = true;
	    timerFunc(nextTickHandler, 0);
	  };
	}();
	
	var _Set = void 0;
	/* istanbul ignore if */
	if (typeof Set !== 'undefined' && Set.toString().match(/native code/)) {
	  // use native Set when available.
	  exports._Set = _Set = Set;
	} else {
	  // a non-standard Set polyfill that only works with primitive keys.
	  exports._Set = _Set = function _Set() {
	    this.set = Object.create(null);
	  };
	  _Set.prototype.has = function (key) {
	    return this.set[key] !== undefined;
	  };
	  _Set.prototype.add = function (key) {
	    this.set[key] = 1;
	  };
	  _Set.prototype.clear = function () {
	    this.set = Object.create(null);
	  };
	}
	
	exports._Set = _Set;
	
	// / shared
	
	/**
	 * Remove an item from an array
	 *
	 * @param {Array} arr
	 * @param {*} item
	 */
	
	function remove(arr, item) {
	  if (arr.length) {
	    var index = arr.indexOf(item);
	    if (index > -1) {
	      return arr.splice(index, 1);
	    }
	  }
	}
	
	/**
	 * Check whether the object has the property.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @return {Boolean}
	 */
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	function hasOwn(obj, key) {
	  return hasOwnProperty.call(obj, key);
	}
	
	/**
	 * Create a cached version of a pure function.
	 *
	 * @param {Function} fn
	 * @return {Function}
	 */
	
	function cached(fn) {
	  var cache = Object.create(null);
	  return function cachedFn(str) {
	    var hit = cache[str];
	    return hit || (cache[str] = fn(str));
	  };
	}
	
	/**
	 * Camelize a hyphen-delmited string.
	 *
	 * @param {String} str
	 * @return {String}
	 */
	
	var camelizeRE = /-(\w)/g;
	var camelize = exports.camelize = cached(function (str) {
	  return str.replace(camelizeRE, toUpper);
	});
	
	function toUpper(_, c) {
	  return c ? c.toUpperCase() : '';
	}
	
	/**
	 * Hyphenate a camelCase string.
	 *
	 * @param {String} str
	 * @return {String}
	 */
	
	var hyphenateRE = /([a-z\d])([A-Z])/g;
	var hyphenate = exports.hyphenate = cached(function (str) {
	  return str.replace(hyphenateRE, '$1-$2').toLowerCase();
	});
	
	/**
	 * Simple bind, faster than native
	 *
	 * @param {Function} fn
	 * @param {Object} ctx
	 * @return {Function}
	 */
	
	function bind(fn, ctx) {
	  return function (a) {
	    var l = arguments.length;
	    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
	  };
	}
	
	/**
	 * Convert an Array-like object to a real Array.
	 *
	 * @param {Array-like} list
	 * @param {Number} [start] - start index
	 * @return {Array}
	 */
	
	function toArray(list, start) {
	  start = start || 0;
	  var i = list.length - start;
	  var ret = new Array(i);
	  while (i--) {
	    ret[i] = list[i + start];
	  }
	  return ret;
	}
	
	/**
	 * Mix properties into target object.
	 *
	 * @param {Object} to
	 * @param {Object} from
	 */
	
	function extend(target) {
	  for (var _len = arguments.length, src = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    src[_key - 1] = arguments[_key];
	  }
	
	  if (typeof Object.assign === 'function') {
	    Object.assign.apply(Object, [target].concat(src));
	  } else {
	    var first = src.shift();
	    for (var key in first) {
	      target[key] = first[key];
	    }
	    if (src.length) {
	      extend.apply(undefined, [target].concat(src));
	    }
	  }
	  return target;
	}
	
	/**
	 * Quick object check - this is primarily used to tell
	 * Objects from primitive values when we know the value
	 * is a JSON-compliant type.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */
	
	function isObject(obj) {
	  return obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
	}
	
	/**
	 * Strict object type check. Only returns true
	 * for plain JavaScript objects.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */
	
	var toString = Object.prototype.toString;
	var OBJECT_STRING = '[object Object]';
	function isPlainObject(obj) {
	  return toString.call(obj) === OBJECT_STRING;
	}
	
	/**
	 * Array type check.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */
	
	var isArray = exports.isArray = Array.isArray;
	
	// / other
	
	function stringify(x) {
	  return typeof x === 'undefined' || x === null || typeof x === 'function' ? '' : (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object' ? x instanceof RegExp ? x.toString() : x instanceof Date ? JSON.parse(JSON.stringify(x)) : JSON.stringify(x) : x.toString();
	}
	
	function typof(v) {
	  var s = Object.prototype.toString.call(v);
	  return s.substring(8, s.length - 1).toLowerCase();
	}
	
	function normalize(v) {
	  var type = typof(v);
	
	  switch (type) {
	    case 'undefined':
	    case 'null':
	      return '';
	    case 'regexp':
	      return v.toString();
	    case 'date':
	      return v.toISOString();
	    case 'number':
	    case 'string':
	    case 'boolean':
	    case 'array':
	    case 'object':
	    case 'function':
	      return v;
	  }
	}
	
	var enableLog = typeof console !== 'undefined' && global.IS_PRODUCT !== true;
	
	/**
	 * @param {String} msg
	 */
	function error() {
	  var _console;
	
	  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	    args[_key2] = arguments[_key2];
	  }
	
	  enableLog && console.error && (_console = console).error.apply(_console, ['[JS Framework]'].concat(args));
	}
	
	/**
	 * @param {String} msg
	 */
	function warn() {
	  var _console2;
	
	  for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	    args[_key3] = arguments[_key3];
	  }
	
	  enableLog && console.warn && (_console2 = console).warn.apply(_console2, ['[JS Framework]'].concat(args));
	}
	
	/**
	 * @param {String} msg
	 */
	function info() {
	  var _console3;
	
	  for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
	    args[_key4] = arguments[_key4];
	  }
	
	  enableLog && console.info && (_console3 = console).info.apply(_console3, ['[JS Framework]'].concat(args));
	}
	
	/**
	 * @param {String} msg
	 */
	function debug() {
	  var _console4;
	
	  for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
	    args[_key5] = arguments[_key5];
	  }
	
	  enableLog && console.debug && (_console4 = console).debug.apply(_console4, ['[JS Framework]'].concat(args));
	}
	
	/**
	 * @param {String} msg
	 */
	function log() {
	  var _console5;
	
	  for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
	    args[_key6] = arguments[_key6];
	  }
	
	  enableLog && console.log && (_console5 = console).log.apply(_console5, ['[JS Framework]'].concat(args));
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.require = exports.define = undefined;
	exports.clearCommonModules = clearCommonModules;
	exports.bootstrap = bootstrap;
	exports.register = register;
	exports.render = render;
	
	var _semver = __webpack_require__(50);
	
	var _semver2 = _interopRequireDefault(_semver);
	
	var _util = __webpack_require__(48);
	
	var _ = _interopRequireWildcard(_util);
	
	var _vm = __webpack_require__(52);
	
	var _vm2 = _interopRequireDefault(_vm);
	
	var _downgrade = __webpack_require__(63);
	
	var downgrade = _interopRequireWildcard(_downgrade);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /**
	                                                                                                                                                                                                                   * @fileOverview
	                                                                                                                                                                                                                   * api that invoked by js bundle code
	                                                                                                                                                                                                                   *
	                                                                                                                                                                                                                   * - define(name, factory): define a new composed component type
	                                                                                                                                                                                                                   * - bootstrap(type, config, data): require a certain type &
	                                                                                                                                                                                                                   *         render with (optional) data
	                                                                                                                                                                                                                   *
	                                                                                                                                                                                                                   * deprecated:
	                                                                                                                                                                                                                   * - register(type, options): register a new composed component type
	                                                                                                                                                                                                                   * - render(type, data): render by a certain type with (optional) data
	                                                                                                                                                                                                                   * - require(type)(data): require a type then render with data
	                                                                                                                                                                                                                   */
	
	var WEEX_COMPONENT_REG = /^@weex-component\//;
	var WEEX_MODULE_REG = /^@weex-module\//;
	var NORMAL_MODULE_REG = /^\.{1,2}\//;
	var JS_SURFIX_REG = /\.js$/;
	
	var isWeexComponent = function isWeexComponent(name) {
	  return !!name.match(WEEX_COMPONENT_REG);
	};
	var isWeexModule = function isWeexModule(name) {
	  return !!name.match(WEEX_MODULE_REG);
	};
	var isNormalModule = function isNormalModule(name) {
	  return !!name.match(NORMAL_MODULE_REG);
	};
	var isNpmModule = function isNpmModule(name) {
	  return !isWeexComponent(name) && !isWeexModule(name) && !isNormalModule(name);
	};
	
	function removeWeexPrefix(str) {
	  return str.replace(WEEX_COMPONENT_REG, '').replace(WEEX_MODULE_REG, '');
	}
	
	function removeJSSurfix(str) {
	  return str.replace(JS_SURFIX_REG, '');
	}
	
	var commonModules = {};
	
	function clearCommonModules() {
	  commonModules = {};
	}
	
	// define(name, factory) for primary usage
	// or
	// define(name, deps, factory) for compatibility
	// Notice: DO NOT use function define() {},
	// it will cause error after builded by webpack
	var define = exports.define = function define(name, deps, factory) {
	  var _this = this;
	
	  _.debug('define a component', name);
	
	  if (_.typof(deps) === 'function') {
	    factory = deps;
	    deps = [];
	  }
	
	  var _require = function _require(name) {
	    var cleanName = void 0;
	
	    if (isWeexComponent(name)) {
	      cleanName = removeWeexPrefix(name);
	      return _this.requireComponent(cleanName);
	    }
	    if (isWeexModule(name)) {
	      cleanName = removeWeexPrefix(name);
	      return _this.requireModule(cleanName);
	    }
	    if (isNormalModule(name)) {
	      cleanName = removeJSSurfix(name);
	      return commonModules[name];
	    }
	    if (isNpmModule(name)) {
	      cleanName = removeJSSurfix(name);
	      return commonModules[name];
	    }
	  };
	  var _module = { exports: {} };
	
	  var cleanName = void 0;
	  if (isWeexComponent(name)) {
	    cleanName = removeWeexPrefix(name);
	
	    factory(_require, _module.exports, _module);
	
	    this.registerComponent(cleanName, _module.exports);
	  } else if (isWeexModule(name)) {
	    cleanName = removeWeexPrefix(name);
	
	    factory(_require, _module.exports, _module);
	
	    _vm2.default.registerModules(_defineProperty({}, cleanName, _module.exports));
	  } else if (isNormalModule(name)) {
	    cleanName = removeJSSurfix(name);
	
	    factory(_require, _module.exports, _module);
	
	    commonModules[cleanName] = _module.exports;
	  } else if (isNpmModule(name)) {
	    cleanName = removeJSSurfix(name);
	
	    factory(_require, _module.exports, _module);
	
	    var exports = _module.exports;
	    if (exports.template || exports.style || exports.methods) {
	      // downgrade to old define method (define('componentName', factory))
	      // the exports contain one key of template, style or methods
	      // but it has risk!!!
	      this.registerComponent(cleanName, exports);
	    } else {
	      commonModules[cleanName] = _module.exports;
	    }
	  }
	};
	
	function bootstrap(name, config, data) {
	  _.debug('bootstrap for ' + name);
	
	  var cleanName = void 0;
	
	  if (isWeexComponent(name)) {
	    cleanName = removeWeexPrefix(name);
	  } else if (isNpmModule(name)) {
	    cleanName = removeJSSurfix(name);
	    // check if define by old 'define' method
	    /* istanbul ignore if */
	    if (!this.customComponentMap[cleanName]) {
	      return new Error('It\'s not a component: ' + name);
	    }
	  } else {
	    return new Error('Wrong component name: ' + name);
	  }
	
	  config = _.isPlainObject(config) ? config : {};
	
	  if (typeof config.transformerVersion === 'string' && typeof global.needTransformerVersion === 'string' && !_semver2.default.satisfies(config.transformerVersion, global.needTransformerVersion)) {
	    return new Error('JS Bundle version: ' + config.transformerVersion + ' ' + ('not compatible with ' + global.needTransformerVersion));
	  }
	
	  var _checkDowngrade = downgrade.check(config.downgrade);
	  /* istanbul ignore if */
	  if (_checkDowngrade.isDowngrade) {
	    this.callTasks([{
	      module: 'instanceWrap',
	      method: 'error',
	      args: [_checkDowngrade.errorType, _checkDowngrade.code, _checkDowngrade.errorMessage]
	    }]);
	    return new Error('Downgrade[' + _checkDowngrade.code + ']: ' + _checkDowngrade.errorMessage);
	  }
	
	  this.vm = new _vm2.default(cleanName, null, { _app: this }, null, data);
	}
	
	/**
	 * @deprecated
	 */
	function register(type, options) {
	  _.warn('Register is deprecated, please install lastest transformer.');
	  this.registerComponent(type, options);
	}
	
	/**
	 * @deprecated
	 */
	function render(type, data) {
	  _.warn('Render is deprecated, please install lastest transformer.');
	  return this.bootstrap(type, {}, data);
	}
	
	/**
	 * @deprecated
	 */
	function _require2(type) {
	  var _this2 = this;
	
	  _.warn('Require is deprecated, please install lastest transformer.');
	  return function (data) {
	    return _this2.bootstrap(type, {}, data);
	  };
	}
	exports.require = _require2;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	exports = module.exports = SemVer;
	
	// The debug function is excluded entirely from the minified version.
	/* nomin */var debug;
	/* nomin */if ((typeof process === 'undefined' ? 'undefined' : _typeof(process)) === 'object' &&
	/* nomin */process.env &&
	/* nomin */process.env.NODE_DEBUG &&
	/* nomin *//\bsemver\b/i.test(process.env.NODE_DEBUG))
	  /* nomin */debug = function debug() {
	    /* nomin */var args = Array.prototype.slice.call(arguments, 0);
	    /* nomin */args.unshift('SEMVER');
	    /* nomin */console.log.apply(console, args);
	    /* nomin */
	  };
	  /* nomin */else
	  /* nomin */debug = function debug() {};
	
	// Note: this is the semver.org version of the spec that it implements
	// Not necessarily the package version of this code.
	exports.SEMVER_SPEC_VERSION = '2.0.0';
	
	var MAX_LENGTH = 256;
	var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;
	
	// The actual regexps go on exports.re
	var re = exports.re = [];
	var src = exports.src = [];
	var R = 0;
	
	// The following Regular Expressions can be used for tokenizing,
	// validating, and parsing SemVer version strings.
	
	// ## Numeric Identifier
	// A single `0`, or a non-zero digit followed by zero or more digits.
	
	var NUMERICIDENTIFIER = R++;
	src[NUMERICIDENTIFIER] = '0|[1-9]\\d*';
	var NUMERICIDENTIFIERLOOSE = R++;
	src[NUMERICIDENTIFIERLOOSE] = '[0-9]+';
	
	// ## Non-numeric Identifier
	// Zero or more digits, followed by a letter or hyphen, and then zero or
	// more letters, digits, or hyphens.
	
	var NONNUMERICIDENTIFIER = R++;
	src[NONNUMERICIDENTIFIER] = '\\d*[a-zA-Z-][a-zA-Z0-9-]*';
	
	// ## Main Version
	// Three dot-separated numeric identifiers.
	
	var MAINVERSION = R++;
	src[MAINVERSION] = '(' + src[NUMERICIDENTIFIER] + ')\\.' + '(' + src[NUMERICIDENTIFIER] + ')\\.' + '(' + src[NUMERICIDENTIFIER] + ')';
	
	var MAINVERSIONLOOSE = R++;
	src[MAINVERSIONLOOSE] = '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' + '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' + '(' + src[NUMERICIDENTIFIERLOOSE] + ')';
	
	// ## Pre-release Version Identifier
	// A numeric identifier, or a non-numeric identifier.
	
	var PRERELEASEIDENTIFIER = R++;
	src[PRERELEASEIDENTIFIER] = '(?:' + src[NUMERICIDENTIFIER] + '|' + src[NONNUMERICIDENTIFIER] + ')';
	
	var PRERELEASEIDENTIFIERLOOSE = R++;
	src[PRERELEASEIDENTIFIERLOOSE] = '(?:' + src[NUMERICIDENTIFIERLOOSE] + '|' + src[NONNUMERICIDENTIFIER] + ')';
	
	// ## Pre-release Version
	// Hyphen, followed by one or more dot-separated pre-release version
	// identifiers.
	
	var PRERELEASE = R++;
	src[PRERELEASE] = '(?:-(' + src[PRERELEASEIDENTIFIER] + '(?:\\.' + src[PRERELEASEIDENTIFIER] + ')*))';
	
	var PRERELEASELOOSE = R++;
	src[PRERELEASELOOSE] = '(?:-?(' + src[PRERELEASEIDENTIFIERLOOSE] + '(?:\\.' + src[PRERELEASEIDENTIFIERLOOSE] + ')*))';
	
	// ## Build Metadata Identifier
	// Any combination of digits, letters, or hyphens.
	
	var BUILDIDENTIFIER = R++;
	src[BUILDIDENTIFIER] = '[0-9A-Za-z-]+';
	
	// ## Build Metadata
	// Plus sign, followed by one or more period-separated build metadata
	// identifiers.
	
	var BUILD = R++;
	src[BUILD] = '(?:\\+(' + src[BUILDIDENTIFIER] + '(?:\\.' + src[BUILDIDENTIFIER] + ')*))';
	
	// ## Full Version String
	// A main version, followed optionally by a pre-release version and
	// build metadata.
	
	// Note that the only major, minor, patch, and pre-release sections of
	// the version string are capturing groups.  The build metadata is not a
	// capturing group, because it should not ever be used in version
	// comparison.
	
	var FULL = R++;
	var FULLPLAIN = 'v?' + src[MAINVERSION] + src[PRERELEASE] + '?' + src[BUILD] + '?';
	
	src[FULL] = '^' + FULLPLAIN + '$';
	
	// like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
	// also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
	// common in the npm registry.
	var LOOSEPLAIN = '[v=\\s]*' + src[MAINVERSIONLOOSE] + src[PRERELEASELOOSE] + '?' + src[BUILD] + '?';
	
	var LOOSE = R++;
	src[LOOSE] = '^' + LOOSEPLAIN + '$';
	
	var GTLT = R++;
	src[GTLT] = '((?:<|>)?=?)';
	
	// Something like "2.*" or "1.2.x".
	// Note that "x.x" is a valid xRange identifer, meaning "any version"
	// Only the first item is strictly required.
	var XRANGEIDENTIFIERLOOSE = R++;
	src[XRANGEIDENTIFIERLOOSE] = src[NUMERICIDENTIFIERLOOSE] + '|x|X|\\*';
	var XRANGEIDENTIFIER = R++;
	src[XRANGEIDENTIFIER] = src[NUMERICIDENTIFIER] + '|x|X|\\*';
	
	var XRANGEPLAIN = R++;
	src[XRANGEPLAIN] = '[v=\\s]*(' + src[XRANGEIDENTIFIER] + ')' + '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' + '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' + '(?:' + src[PRERELEASE] + ')?' + src[BUILD] + '?' + ')?)?';
	
	var XRANGEPLAINLOOSE = R++;
	src[XRANGEPLAINLOOSE] = '[v=\\s]*(' + src[XRANGEIDENTIFIERLOOSE] + ')' + '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' + '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' + '(?:' + src[PRERELEASELOOSE] + ')?' + src[BUILD] + '?' + ')?)?';
	
	var XRANGE = R++;
	src[XRANGE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAIN] + '$';
	var XRANGELOOSE = R++;
	src[XRANGELOOSE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAINLOOSE] + '$';
	
	// Tilde ranges.
	// Meaning is "reasonably at or greater than"
	var LONETILDE = R++;
	src[LONETILDE] = '(?:~>?)';
	
	var TILDETRIM = R++;
	src[TILDETRIM] = '(\\s*)' + src[LONETILDE] + '\\s+';
	re[TILDETRIM] = new RegExp(src[TILDETRIM], 'g');
	var tildeTrimReplace = '$1~';
	
	var TILDE = R++;
	src[TILDE] = '^' + src[LONETILDE] + src[XRANGEPLAIN] + '$';
	var TILDELOOSE = R++;
	src[TILDELOOSE] = '^' + src[LONETILDE] + src[XRANGEPLAINLOOSE] + '$';
	
	// Caret ranges.
	// Meaning is "at least and backwards compatible with"
	var LONECARET = R++;
	src[LONECARET] = '(?:\\^)';
	
	var CARETTRIM = R++;
	src[CARETTRIM] = '(\\s*)' + src[LONECARET] + '\\s+';
	re[CARETTRIM] = new RegExp(src[CARETTRIM], 'g');
	var caretTrimReplace = '$1^';
	
	var CARET = R++;
	src[CARET] = '^' + src[LONECARET] + src[XRANGEPLAIN] + '$';
	var CARETLOOSE = R++;
	src[CARETLOOSE] = '^' + src[LONECARET] + src[XRANGEPLAINLOOSE] + '$';
	
	// A simple gt/lt/eq thing, or just "" to indicate "any version"
	var COMPARATORLOOSE = R++;
	src[COMPARATORLOOSE] = '^' + src[GTLT] + '\\s*(' + LOOSEPLAIN + ')$|^$';
	var COMPARATOR = R++;
	src[COMPARATOR] = '^' + src[GTLT] + '\\s*(' + FULLPLAIN + ')$|^$';
	
	// An expression to strip any whitespace between the gtlt and the thing
	// it modifies, so that `> 1.2.3` ==> `>1.2.3`
	var COMPARATORTRIM = R++;
	src[COMPARATORTRIM] = '(\\s*)' + src[GTLT] + '\\s*(' + LOOSEPLAIN + '|' + src[XRANGEPLAIN] + ')';
	
	// this one has to use the /g flag
	re[COMPARATORTRIM] = new RegExp(src[COMPARATORTRIM], 'g');
	var comparatorTrimReplace = '$1$2$3';
	
	// Something like `1.2.3 - 1.2.4`
	// Note that these all use the loose form, because they'll be
	// checked against either the strict or loose comparator form
	// later.
	var HYPHENRANGE = R++;
	src[HYPHENRANGE] = '^\\s*(' + src[XRANGEPLAIN] + ')' + '\\s+-\\s+' + '(' + src[XRANGEPLAIN] + ')' + '\\s*$';
	
	var HYPHENRANGELOOSE = R++;
	src[HYPHENRANGELOOSE] = '^\\s*(' + src[XRANGEPLAINLOOSE] + ')' + '\\s+-\\s+' + '(' + src[XRANGEPLAINLOOSE] + ')' + '\\s*$';
	
	// Star ranges basically just allow anything at all.
	var STAR = R++;
	src[STAR] = '(<|>)?=?\\s*\\*';
	
	// Compile to actual regexp objects.
	// All are flag-free, unless they were created above with a flag.
	for (var i = 0; i < R; i++) {
	  debug(i, src[i]);
	  if (!re[i]) re[i] = new RegExp(src[i]);
	}
	
	exports.parse = parse;
	function parse(version, loose) {
	  if (version instanceof SemVer) return version;
	
	  if (typeof version !== 'string') return null;
	
	  if (version.length > MAX_LENGTH) return null;
	
	  var r = loose ? re[LOOSE] : re[FULL];
	  if (!r.test(version)) return null;
	
	  try {
	    return new SemVer(version, loose);
	  } catch (er) {
	    return null;
	  }
	}
	
	exports.valid = valid;
	function valid(version, loose) {
	  var v = parse(version, loose);
	  return v ? v.version : null;
	}
	
	exports.clean = clean;
	function clean(version, loose) {
	  var s = parse(version.trim().replace(/^[=v]+/, ''), loose);
	  return s ? s.version : null;
	}
	
	exports.SemVer = SemVer;
	
	function SemVer(version, loose) {
	  if (version instanceof SemVer) {
	    if (version.loose === loose) return version;else version = version.version;
	  } else if (typeof version !== 'string') {
	    throw new TypeError('Invalid Version: ' + version);
	  }
	
	  if (version.length > MAX_LENGTH) throw new TypeError('version is longer than ' + MAX_LENGTH + ' characters');
	
	  if (!(this instanceof SemVer)) return new SemVer(version, loose);
	
	  debug('SemVer', version, loose);
	  this.loose = loose;
	  var m = version.trim().match(loose ? re[LOOSE] : re[FULL]);
	
	  if (!m) throw new TypeError('Invalid Version: ' + version);
	
	  this.raw = version;
	
	  // these are actually numbers
	  this.major = +m[1];
	  this.minor = +m[2];
	  this.patch = +m[3];
	
	  if (this.major > MAX_SAFE_INTEGER || this.major < 0) throw new TypeError('Invalid major version');
	
	  if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) throw new TypeError('Invalid minor version');
	
	  if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) throw new TypeError('Invalid patch version');
	
	  // numberify any prerelease numeric ids
	  if (!m[4]) this.prerelease = [];else this.prerelease = m[4].split('.').map(function (id) {
	    if (/^[0-9]+$/.test(id)) {
	      var num = +id;
	      if (num >= 0 && num < MAX_SAFE_INTEGER) return num;
	    }
	    return id;
	  });
	
	  this.build = m[5] ? m[5].split('.') : [];
	  this.format();
	}
	
	SemVer.prototype.format = function () {
	  this.version = this.major + '.' + this.minor + '.' + this.patch;
	  if (this.prerelease.length) this.version += '-' + this.prerelease.join('.');
	  return this.version;
	};
	
	SemVer.prototype.toString = function () {
	  return this.version;
	};
	
	SemVer.prototype.compare = function (other) {
	  debug('SemVer.compare', this.version, this.loose, other);
	  if (!(other instanceof SemVer)) other = new SemVer(other, this.loose);
	
	  return this.compareMain(other) || this.comparePre(other);
	};
	
	SemVer.prototype.compareMain = function (other) {
	  if (!(other instanceof SemVer)) other = new SemVer(other, this.loose);
	
	  return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
	};
	
	SemVer.prototype.comparePre = function (other) {
	  if (!(other instanceof SemVer)) other = new SemVer(other, this.loose);
	
	  // NOT having a prerelease is > having one
	  if (this.prerelease.length && !other.prerelease.length) return -1;else if (!this.prerelease.length && other.prerelease.length) return 1;else if (!this.prerelease.length && !other.prerelease.length) return 0;
	
	  var i = 0;
	  do {
	    var a = this.prerelease[i];
	    var b = other.prerelease[i];
	    debug('prerelease compare', i, a, b);
	    if (a === undefined && b === undefined) return 0;else if (b === undefined) return 1;else if (a === undefined) return -1;else if (a === b) continue;else return compareIdentifiers(a, b);
	  } while (++i);
	};
	
	// preminor will bump the version up to the next minor release, and immediately
	// down to pre-release. premajor and prepatch work the same way.
	SemVer.prototype.inc = function (release, identifier) {
	  switch (release) {
	    case 'premajor':
	      this.prerelease.length = 0;
	      this.patch = 0;
	      this.minor = 0;
	      this.major++;
	      this.inc('pre', identifier);
	      break;
	    case 'preminor':
	      this.prerelease.length = 0;
	      this.patch = 0;
	      this.minor++;
	      this.inc('pre', identifier);
	      break;
	    case 'prepatch':
	      // If this is already a prerelease, it will bump to the next version
	      // drop any prereleases that might already exist, since they are not
	      // relevant at this point.
	      this.prerelease.length = 0;
	      this.inc('patch', identifier);
	      this.inc('pre', identifier);
	      break;
	    // If the input is a non-prerelease version, this acts the same as
	    // prepatch.
	    case 'prerelease':
	      if (this.prerelease.length === 0) this.inc('patch', identifier);
	      this.inc('pre', identifier);
	      break;
	
	    case 'major':
	      // If this is a pre-major version, bump up to the same major version.
	      // Otherwise increment major.
	      // 1.0.0-5 bumps to 1.0.0
	      // 1.1.0 bumps to 2.0.0
	      if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) this.major++;
	      this.minor = 0;
	      this.patch = 0;
	      this.prerelease = [];
	      break;
	    case 'minor':
	      // If this is a pre-minor version, bump up to the same minor version.
	      // Otherwise increment minor.
	      // 1.2.0-5 bumps to 1.2.0
	      // 1.2.1 bumps to 1.3.0
	      if (this.patch !== 0 || this.prerelease.length === 0) this.minor++;
	      this.patch = 0;
	      this.prerelease = [];
	      break;
	    case 'patch':
	      // If this is not a pre-release version, it will increment the patch.
	      // If it is a pre-release it will bump up to the same patch version.
	      // 1.2.0-5 patches to 1.2.0
	      // 1.2.0 patches to 1.2.1
	      if (this.prerelease.length === 0) this.patch++;
	      this.prerelease = [];
	      break;
	    // This probably shouldn't be used publicly.
	    // 1.0.0 "pre" would become 1.0.0-0 which is the wrong direction.
	    case 'pre':
	      if (this.prerelease.length === 0) this.prerelease = [0];else {
	        var i = this.prerelease.length;
	        while (--i >= 0) {
	          if (typeof this.prerelease[i] === 'number') {
	            this.prerelease[i]++;
	            i = -2;
	          }
	        }
	        if (i === -1) // didn't increment anything
	          this.prerelease.push(0);
	      }
	      if (identifier) {
	        // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
	        // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
	        if (this.prerelease[0] === identifier) {
	          if (isNaN(this.prerelease[1])) this.prerelease = [identifier, 0];
	        } else this.prerelease = [identifier, 0];
	      }
	      break;
	
	    default:
	      throw new Error('invalid increment argument: ' + release);
	  }
	  this.format();
	  this.raw = this.version;
	  return this;
	};
	
	exports.inc = inc;
	function inc(version, release, loose, identifier) {
	  if (typeof loose === 'string') {
	    identifier = loose;
	    loose = undefined;
	  }
	
	  try {
	    return new SemVer(version, loose).inc(release, identifier).version;
	  } catch (er) {
	    return null;
	  }
	}
	
	exports.diff = diff;
	function diff(version1, version2) {
	  if (eq(version1, version2)) {
	    return null;
	  } else {
	    var v1 = parse(version1);
	    var v2 = parse(version2);
	    if (v1.prerelease.length || v2.prerelease.length) {
	      for (var key in v1) {
	        if (key === 'major' || key === 'minor' || key === 'patch') {
	          if (v1[key] !== v2[key]) {
	            return 'pre' + key;
	          }
	        }
	      }
	      return 'prerelease';
	    }
	    for (var key in v1) {
	      if (key === 'major' || key === 'minor' || key === 'patch') {
	        if (v1[key] !== v2[key]) {
	          return key;
	        }
	      }
	    }
	  }
	}
	
	exports.compareIdentifiers = compareIdentifiers;
	
	var numeric = /^[0-9]+$/;
	function compareIdentifiers(a, b) {
	  var anum = numeric.test(a);
	  var bnum = numeric.test(b);
	
	  if (anum && bnum) {
	    a = +a;
	    b = +b;
	  }
	
	  return anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : a > b ? 1 : 0;
	}
	
	exports.rcompareIdentifiers = rcompareIdentifiers;
	function rcompareIdentifiers(a, b) {
	  return compareIdentifiers(b, a);
	}
	
	exports.major = major;
	function major(a, loose) {
	  return new SemVer(a, loose).major;
	}
	
	exports.minor = minor;
	function minor(a, loose) {
	  return new SemVer(a, loose).minor;
	}
	
	exports.patch = patch;
	function patch(a, loose) {
	  return new SemVer(a, loose).patch;
	}
	
	exports.compare = compare;
	function compare(a, b, loose) {
	  return new SemVer(a, loose).compare(b);
	}
	
	exports.compareLoose = compareLoose;
	function compareLoose(a, b) {
	  return compare(a, b, true);
	}
	
	exports.rcompare = rcompare;
	function rcompare(a, b, loose) {
	  return compare(b, a, loose);
	}
	
	exports.sort = sort;
	function sort(list, loose) {
	  return list.sort(function (a, b) {
	    return exports.compare(a, b, loose);
	  });
	}
	
	exports.rsort = rsort;
	function rsort(list, loose) {
	  return list.sort(function (a, b) {
	    return exports.rcompare(a, b, loose);
	  });
	}
	
	exports.gt = gt;
	function gt(a, b, loose) {
	  return compare(a, b, loose) > 0;
	}
	
	exports.lt = lt;
	function lt(a, b, loose) {
	  return compare(a, b, loose) < 0;
	}
	
	exports.eq = eq;
	function eq(a, b, loose) {
	  return compare(a, b, loose) === 0;
	}
	
	exports.neq = neq;
	function neq(a, b, loose) {
	  return compare(a, b, loose) !== 0;
	}
	
	exports.gte = gte;
	function gte(a, b, loose) {
	  return compare(a, b, loose) >= 0;
	}
	
	exports.lte = lte;
	function lte(a, b, loose) {
	  return compare(a, b, loose) <= 0;
	}
	
	exports.cmp = cmp;
	function cmp(a, op, b, loose) {
	  var ret;
	  switch (op) {
	    case '===':
	      if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'object') a = a.version;
	      if ((typeof b === 'undefined' ? 'undefined' : _typeof(b)) === 'object') b = b.version;
	      ret = a === b;
	      break;
	    case '!==':
	      if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'object') a = a.version;
	      if ((typeof b === 'undefined' ? 'undefined' : _typeof(b)) === 'object') b = b.version;
	      ret = a !== b;
	      break;
	    case '':case '=':case '==':
	      ret = eq(a, b, loose);break;
	    case '!=':
	      ret = neq(a, b, loose);break;
	    case '>':
	      ret = gt(a, b, loose);break;
	    case '>=':
	      ret = gte(a, b, loose);break;
	    case '<':
	      ret = lt(a, b, loose);break;
	    case '<=':
	      ret = lte(a, b, loose);break;
	    default:
	      throw new TypeError('Invalid operator: ' + op);
	  }
	  return ret;
	}
	
	exports.Comparator = Comparator;
	function Comparator(comp, loose) {
	  if (comp instanceof Comparator) {
	    if (comp.loose === loose) return comp;else comp = comp.value;
	  }
	
	  if (!(this instanceof Comparator)) return new Comparator(comp, loose);
	
	  debug('comparator', comp, loose);
	  this.loose = loose;
	  this.parse(comp);
	
	  if (this.semver === ANY) this.value = '';else this.value = this.operator + this.semver.version;
	
	  debug('comp', this);
	}
	
	var ANY = {};
	Comparator.prototype.parse = function (comp) {
	  var r = this.loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
	  var m = comp.match(r);
	
	  if (!m) throw new TypeError('Invalid comparator: ' + comp);
	
	  this.operator = m[1];
	  if (this.operator === '=') this.operator = '';
	
	  // if it literally is just '>' or '' then allow anything.
	  if (!m[2]) this.semver = ANY;else this.semver = new SemVer(m[2], this.loose);
	};
	
	Comparator.prototype.toString = function () {
	  return this.value;
	};
	
	Comparator.prototype.test = function (version) {
	  debug('Comparator.test', version, this.loose);
	
	  if (this.semver === ANY) return true;
	
	  if (typeof version === 'string') version = new SemVer(version, this.loose);
	
	  return cmp(version, this.operator, this.semver, this.loose);
	};
	
	exports.Range = Range;
	function Range(range, loose) {
	  if (range instanceof Range && range.loose === loose) return range;
	
	  if (!(this instanceof Range)) return new Range(range, loose);
	
	  this.loose = loose;
	
	  // First, split based on boolean or ||
	  this.raw = range;
	  this.set = range.split(/\s*\|\|\s*/).map(function (range) {
	    return this.parseRange(range.trim());
	  }, this).filter(function (c) {
	    // throw out any that are not relevant for whatever reason
	    return c.length;
	  });
	
	  if (!this.set.length) {
	    throw new TypeError('Invalid SemVer Range: ' + range);
	  }
	
	  this.format();
	}
	
	Range.prototype.format = function () {
	  this.range = this.set.map(function (comps) {
	    return comps.join(' ').trim();
	  }).join('||').trim();
	  return this.range;
	};
	
	Range.prototype.toString = function () {
	  return this.range;
	};
	
	Range.prototype.parseRange = function (range) {
	  var loose = this.loose;
	  range = range.trim();
	  debug('range', range, loose);
	  // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
	  var hr = loose ? re[HYPHENRANGELOOSE] : re[HYPHENRANGE];
	  range = range.replace(hr, hyphenReplace);
	  debug('hyphen replace', range);
	  // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
	  range = range.replace(re[COMPARATORTRIM], comparatorTrimReplace);
	  debug('comparator trim', range, re[COMPARATORTRIM]);
	
	  // `~ 1.2.3` => `~1.2.3`
	  range = range.replace(re[TILDETRIM], tildeTrimReplace);
	
	  // `^ 1.2.3` => `^1.2.3`
	  range = range.replace(re[CARETTRIM], caretTrimReplace);
	
	  // normalize spaces
	  range = range.split(/\s+/).join(' ');
	
	  // At this point, the range is completely trimmed and
	  // ready to be split into comparators.
	
	  var compRe = loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
	  var set = range.split(' ').map(function (comp) {
	    return parseComparator(comp, loose);
	  }).join(' ').split(/\s+/);
	  if (this.loose) {
	    // in loose mode, throw out any that are not valid comparators
	    set = set.filter(function (comp) {
	      return !!comp.match(compRe);
	    });
	  }
	  set = set.map(function (comp) {
	    return new Comparator(comp, loose);
	  });
	
	  return set;
	};
	
	// Mostly just for testing and legacy API reasons
	exports.toComparators = toComparators;
	function toComparators(range, loose) {
	  return new Range(range, loose).set.map(function (comp) {
	    return comp.map(function (c) {
	      return c.value;
	    }).join(' ').trim().split(' ');
	  });
	}
	
	// comprised of xranges, tildes, stars, and gtlt's at this point.
	// already replaced the hyphen ranges
	// turn into a set of JUST comparators.
	function parseComparator(comp, loose) {
	  debug('comp', comp);
	  comp = replaceCarets(comp, loose);
	  debug('caret', comp);
	  comp = replaceTildes(comp, loose);
	  debug('tildes', comp);
	  comp = replaceXRanges(comp, loose);
	  debug('xrange', comp);
	  comp = replaceStars(comp, loose);
	  debug('stars', comp);
	  return comp;
	}
	
	function isX(id) {
	  return !id || id.toLowerCase() === 'x' || id === '*';
	}
	
	// ~, ~> --> * (any, kinda silly)
	// ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0
	// ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0
	// ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0
	// ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0
	// ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0
	function replaceTildes(comp, loose) {
	  return comp.trim().split(/\s+/).map(function (comp) {
	    return replaceTilde(comp, loose);
	  }).join(' ');
	}
	
	function replaceTilde(comp, loose) {
	  var r = loose ? re[TILDELOOSE] : re[TILDE];
	  return comp.replace(r, function (_, M, m, p, pr) {
	    debug('tilde', comp, _, M, m, p, pr);
	    var ret;
	
	    if (isX(M)) ret = '';else if (isX(m)) ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';else if (isX(p))
	      // ~1.2 == >=1.2.0 <1.3.0
	      ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';else if (pr) {
	      debug('replaceTilde pr', pr);
	      if (pr.charAt(0) !== '-') pr = '-' + pr;
	      ret = '>=' + M + '.' + m + '.' + p + pr + ' <' + M + '.' + (+m + 1) + '.0';
	    } else
	      // ~1.2.3 == >=1.2.3 <1.3.0
	      ret = '>=' + M + '.' + m + '.' + p + ' <' + M + '.' + (+m + 1) + '.0';
	
	    debug('tilde return', ret);
	    return ret;
	  });
	}
	
	// ^ --> * (any, kinda silly)
	// ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0
	// ^2.0, ^2.0.x --> >=2.0.0 <3.0.0
	// ^1.2, ^1.2.x --> >=1.2.0 <2.0.0
	// ^1.2.3 --> >=1.2.3 <2.0.0
	// ^1.2.0 --> >=1.2.0 <2.0.0
	function replaceCarets(comp, loose) {
	  return comp.trim().split(/\s+/).map(function (comp) {
	    return replaceCaret(comp, loose);
	  }).join(' ');
	}
	
	function replaceCaret(comp, loose) {
	  debug('caret', comp, loose);
	  var r = loose ? re[CARETLOOSE] : re[CARET];
	  return comp.replace(r, function (_, M, m, p, pr) {
	    debug('caret', comp, _, M, m, p, pr);
	    var ret;
	
	    if (isX(M)) ret = '';else if (isX(m)) ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';else if (isX(p)) {
	      if (M === '0') ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';else ret = '>=' + M + '.' + m + '.0 <' + (+M + 1) + '.0.0';
	    } else if (pr) {
	      debug('replaceCaret pr', pr);
	      if (pr.charAt(0) !== '-') pr = '-' + pr;
	      if (M === '0') {
	        if (m === '0') ret = '>=' + M + '.' + m + '.' + p + pr + ' <' + M + '.' + m + '.' + (+p + 1);else ret = '>=' + M + '.' + m + '.' + p + pr + ' <' + M + '.' + (+m + 1) + '.0';
	      } else ret = '>=' + M + '.' + m + '.' + p + pr + ' <' + (+M + 1) + '.0.0';
	    } else {
	      debug('no pr');
	      if (M === '0') {
	        if (m === '0') ret = '>=' + M + '.' + m + '.' + p + ' <' + M + '.' + m + '.' + (+p + 1);else ret = '>=' + M + '.' + m + '.' + p + ' <' + M + '.' + (+m + 1) + '.0';
	      } else ret = '>=' + M + '.' + m + '.' + p + ' <' + (+M + 1) + '.0.0';
	    }
	
	    debug('caret return', ret);
	    return ret;
	  });
	}
	
	function replaceXRanges(comp, loose) {
	  debug('replaceXRanges', comp, loose);
	  return comp.split(/\s+/).map(function (comp) {
	    return replaceXRange(comp, loose);
	  }).join(' ');
	}
	
	function replaceXRange(comp, loose) {
	  comp = comp.trim();
	  var r = loose ? re[XRANGELOOSE] : re[XRANGE];
	  return comp.replace(r, function (ret, gtlt, M, m, p, pr) {
	    debug('xRange', comp, ret, gtlt, M, m, p, pr);
	    var xM = isX(M);
	    var xm = xM || isX(m);
	    var xp = xm || isX(p);
	    var anyX = xp;
	
	    if (gtlt === '=' && anyX) gtlt = '';
	
	    if (xM) {
	      if (gtlt === '>' || gtlt === '<') {
	        // nothing is allowed
	        ret = '<0.0.0';
	      } else {
	        // nothing is forbidden
	        ret = '*';
	      }
	    } else if (gtlt && anyX) {
	      // replace X with 0
	      if (xm) m = 0;
	      if (xp) p = 0;
	
	      if (gtlt === '>') {
	        // >1 => >=2.0.0
	        // >1.2 => >=1.3.0
	        // >1.2.3 => >= 1.2.4
	        gtlt = '>=';
	        if (xm) {
	          M = +M + 1;
	          m = 0;
	          p = 0;
	        } else if (xp) {
	          m = +m + 1;
	          p = 0;
	        }
	      } else if (gtlt === '<=') {
	        // <=0.7.x is actually <0.8.0, since any 0.7.x should
	        // pass.  Similarly, <=7.x is actually <8.0.0, etc.
	        gtlt = '<';
	        if (xm) M = +M + 1;else m = +m + 1;
	      }
	
	      ret = gtlt + M + '.' + m + '.' + p;
	    } else if (xm) {
	      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
	    } else if (xp) {
	      ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
	    }
	
	    debug('xRange return', ret);
	
	    return ret;
	  });
	}
	
	// Because * is AND-ed with everything else in the comparator,
	// and '' means "any version", just remove the *s entirely.
	function replaceStars(comp, loose) {
	  debug('replaceStars', comp, loose);
	  // Looseness is ignored here.  star is always as loose as it gets!
	  return comp.trim().replace(re[STAR], '');
	}
	
	// This function is passed to string.replace(re[HYPHENRANGE])
	// M, m, patch, prerelease, build
	// 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
	// 1.2.3 - 3.4 => >=1.2.0 <3.5.0 Any 3.4.x will do
	// 1.2 - 3.4 => >=1.2.0 <3.5.0
	function hyphenReplace($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr, tb) {
	
	  if (isX(fM)) from = '';else if (isX(fm)) from = '>=' + fM + '.0.0';else if (isX(fp)) from = '>=' + fM + '.' + fm + '.0';else from = '>=' + from;
	
	  if (isX(tM)) to = '';else if (isX(tm)) to = '<' + (+tM + 1) + '.0.0';else if (isX(tp)) to = '<' + tM + '.' + (+tm + 1) + '.0';else if (tpr) to = '<=' + tM + '.' + tm + '.' + tp + '-' + tpr;else to = '<=' + to;
	
	  return (from + ' ' + to).trim();
	}
	
	// if ANY of the sets match ALL of its comparators, then pass
	Range.prototype.test = function (version) {
	  if (!version) return false;
	
	  if (typeof version === 'string') version = new SemVer(version, this.loose);
	
	  for (var i = 0; i < this.set.length; i++) {
	    if (testSet(this.set[i], version)) return true;
	  }
	  return false;
	};
	
	function testSet(set, version) {
	  for (var i = 0; i < set.length; i++) {
	    if (!set[i].test(version)) return false;
	  }
	
	  if (version.prerelease.length) {
	    // Find the set of versions that are allowed to have prereleases
	    // For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
	    // That should allow `1.2.3-pr.2` to pass.
	    // However, `1.2.4-alpha.notready` should NOT be allowed,
	    // even though it's within the range set by the comparators.
	    for (var i = 0; i < set.length; i++) {
	      debug(set[i].semver);
	      if (set[i].semver === ANY) continue;
	
	      if (set[i].semver.prerelease.length > 0) {
	        var allowed = set[i].semver;
	        if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) return true;
	      }
	    }
	
	    // Version has a -pre, but it's not one of the ones we like.
	    return false;
	  }
	
	  return true;
	}
	
	exports.satisfies = satisfies;
	function satisfies(version, range, loose) {
	  try {
	    range = new Range(range, loose);
	  } catch (er) {
	    return false;
	  }
	  return range.test(version);
	}
	
	exports.maxSatisfying = maxSatisfying;
	function maxSatisfying(versions, range, loose) {
	  return versions.filter(function (version) {
	    return satisfies(version, range, loose);
	  }).sort(function (a, b) {
	    return rcompare(a, b, loose);
	  })[0] || null;
	}
	
	exports.validRange = validRange;
	function validRange(range, loose) {
	  try {
	    // Return '*' instead of '' so that truthiness works.
	    // This will throw if it's invalid anyway
	    return new Range(range, loose).range || '*';
	  } catch (er) {
	    return null;
	  }
	}
	
	// Determine if version is less than all the versions possible in the range
	exports.ltr = ltr;
	function ltr(version, range, loose) {
	  return outside(version, range, '<', loose);
	}
	
	// Determine if version is greater than all the versions possible in the range.
	exports.gtr = gtr;
	function gtr(version, range, loose) {
	  return outside(version, range, '>', loose);
	}
	
	exports.outside = outside;
	function outside(version, range, hilo, loose) {
	  version = new SemVer(version, loose);
	  range = new Range(range, loose);
	
	  var gtfn, ltefn, ltfn, comp, ecomp;
	  switch (hilo) {
	    case '>':
	      gtfn = gt;
	      ltefn = lte;
	      ltfn = lt;
	      comp = '>';
	      ecomp = '>=';
	      break;
	    case '<':
	      gtfn = lt;
	      ltefn = gte;
	      ltfn = gt;
	      comp = '<';
	      ecomp = '<=';
	      break;
	    default:
	      throw new TypeError('Must provide a hilo val of "<" or ">"');
	  }
	
	  // If it satisifes the range it is not outside
	  if (satisfies(version, range, loose)) {
	    return false;
	  }
	
	  // From now on, variable terms are as if we're in "gtr" mode.
	  // but note that everything is flipped for the "ltr" function.
	
	  for (var i = 0; i < range.set.length; ++i) {
	    var comparators = range.set[i];
	
	    var high = null;
	    var low = null;
	
	    comparators.forEach(function (comparator) {
	      if (comparator.semver === ANY) {
	        comparator = new Comparator('>=0.0.0');
	      }
	      high = high || comparator;
	      low = low || comparator;
	      if (gtfn(comparator.semver, high.semver, loose)) {
	        high = comparator;
	      } else if (ltfn(comparator.semver, low.semver, loose)) {
	        low = comparator;
	      }
	    });
	
	    // If the edge version comparator has a operator then our version
	    // isn't outside it
	    if (high.operator === comp || high.operator === ecomp) {
	      return false;
	    }
	
	    // If the lowest version comparator has an operator and our version
	    // is less than it then it isn't higher than the range
	    if ((!low.operator || low.operator === comp) && ltefn(version, low.semver)) {
	      return false;
	    } else if (low.operator === ecomp && ltfn(version, low.semver)) {
	      return false;
	    }
	  }
	  return true;
	}
	
	exports.prerelease = prerelease;
	function prerelease(version, loose) {
	  var parsed = parse(version, loose);
	  return parsed && parsed.prerelease.length ? parsed.prerelease : null;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(51)))

/***/ },
/* 51 */
/***/ function(module, exports) {

	'use strict';
	
	// shim for using process in browser
	
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	(function () {
	    try {
	        cachedSetTimeout = setTimeout;
	    } catch (e) {
	        cachedSetTimeout = function cachedSetTimeout() {
	            throw new Error('setTimeout is not defined');
	        };
	    }
	    try {
	        cachedClearTimeout = clearTimeout;
	    } catch (e) {
	        cachedClearTimeout = function cachedClearTimeout() {
	            throw new Error('clearTimeout is not defined');
	        };
	    }
	})();
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = cachedSetTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while (len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    cachedClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        cachedSetTimeout(drainQueue, 0);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () {
	    return '/';
	};
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function () {
	    return 0;
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Vm;
	
	var _util = __webpack_require__(48);
	
	var _ = _interopRequireWildcard(_util);
	
	var _state = __webpack_require__(53);
	
	var state = _interopRequireWildcard(_state);
	
	var _compiler = __webpack_require__(58);
	
	var compiler = _interopRequireWildcard(_compiler);
	
	var _directive = __webpack_require__(59);
	
	var directive = _interopRequireWildcard(_directive);
	
	var _domHelper = __webpack_require__(60);
	
	var domHelper = _interopRequireWildcard(_domHelper);
	
	var _events = __webpack_require__(61);
	
	var events = _interopRequireWildcard(_events);
	
	var _register = __webpack_require__(62);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function callOldReadyEntry(vm, component) {
	  if (component.methods && component.methods.ready) {
	    _.warn('"exports.methods.ready" is deprecated, ' + 'please use "exports.created" instead');
	    component.methods.ready.call(vm);
	  }
	}
	
	/**
	 * ViewModel constructor
	 *
	 * @param {string} type
	 * @param {object} options    component options
	 * @param {object} parentVm   which contains _app
	 * @param {object} parentEl   root element or frag block
	 * @param {object} mergedData external data
	 * @param {object} externalEvents external events
	 */
	/**
	 * @fileOverview
	 * ViewModel Constructor & definition
	 */
	
	function Vm(type, options, parentVm, parentEl, mergedData, externalEvents) {
	  this._parent = parentVm._realParent ? parentVm._realParent : parentVm;
	  this._app = parentVm._app;
	  parentVm._childrenVms && parentVm._childrenVms.push(this);
	
	  if (!options) {
	    options = this._app.customComponentMap[type] || {};
	  }
	  var data = options.data || {};
	
	  this._options = options;
	  this._methods = options.methods || {};
	  this._computed = options.computed || {};
	  this._css = options.style || {};
	  this._ids = {};
	  this._vmEvents = {};
	  this._childrenVms = [];
	  this._type = type;
	
	  // bind events and lifecycles
	  this._initEvents(externalEvents);
	
	  _.debug('"init" lifecycle in Vm(' + this._type + ')');
	  this.$emit('hook:init');
	  this._inited = true;
	  // proxy data and methods
	  // observe data and add this to vms
	  this._data = typeof data === 'function' ? data() : data;
	  if (mergedData) {
	    _.extend(this._data, mergedData);
	  }
	  this._initState();
	
	  _.debug('"created" lifecycle in Vm(' + this._type + ')');
	  this.$emit('hook:created');
	  this._created = true;
	  // backward old ready entry
	  callOldReadyEntry(this, options);
	
	  // if no parentElement then specify the documentElement
	  this._parentEl = parentEl || this._app.doc.documentElement;
	  this._build();
	}
	
	_.extend(Vm.prototype, state, compiler, directive, domHelper, events);
	_.extend(Vm, {
	  registerModules: _register.registerModules,
	  registerMethods: _register.registerMethods
	});

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._initState = _initState;
	exports._initData = _initData;
	exports._initComputed = _initComputed;
	exports._initMethods = _initMethods;
	
	var _watcher = __webpack_require__(54);
	
	var _watcher2 = _interopRequireDefault(_watcher);
	
	var _dep = __webpack_require__(55);
	
	var _dep2 = _interopRequireDefault(_dep);
	
	var _observer = __webpack_require__(56);
	
	var _util = __webpack_require__(48);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/* eslint-disable */
	
	function _initState() {
	  var vm = this;
	  vm._watchers = [];
	  vm._initData();
	  vm._initComputed();
	  vm._initMethods();
	}
	
	function _initData() {
	  var vm = this;
	  var data = vm._data;
	
	  if (!(0, _util.isPlainObject)(data)) {
	    data = {};
	  }
	  // proxy data on instance
	  var keys = Object.keys(data);
	  var i = keys.length;
	  while (i--) {
	    (0, _observer.proxy)(vm, keys[i]);
	  }
	  // observe data
	  (0, _observer.observe)(data, vm);
	}
	
	function noop() {}
	
	function _initComputed() {
	  var vm = this;
	  var computed = vm._computed;
	  if (computed) {
	    for (var key in computed) {
	      var userDef = computed[key];
	      var def = {
	        enumerable: true,
	        configurable: true
	      };
	      if (typeof userDef === 'function') {
	        def.get = makeComputedGetter(userDef, vm);
	        def.set = noop;
	      } else {
	        def.get = userDef.get ? userDef.cache !== false ? makeComputedGetter(userDef.get, vm) : (0, _util.bind)(userDef.get, vm) : noop;
	        def.set = userDef.set ? (0, _util.bind)(userDef.set, vm) : noop;
	      }
	      Object.defineProperty(vm, key, def);
	    }
	  }
	}
	
	function makeComputedGetter(getter, owner) {
	  var watcher = new _watcher2.default(owner, getter, null, {
	    lazy: true
	  });
	  return function computedGetter() {
	    if (watcher.dirty) {
	      watcher.evaluate();
	    }
	    if (_dep2.default.target) {
	      watcher.depend();
	    }
	    return watcher.value;
	  };
	}
	
	function _initMethods() {
	  var vm = this;
	  var methods = vm._methods;
	  if (methods) {
	    for (var key in methods) {
	      vm[key] = (0, _util.bind)(methods[key], vm);
	    }
	  }
	}

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Watcher;
	
	var _dep = __webpack_require__(55);
	
	var _dep2 = _interopRequireDefault(_dep);
	
	var _util = __webpack_require__(48);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/* eslint-disable */
	
	var uid = 0;
	// import { pushWatcher } from './batcher'
	
	var prevTarget = void 0;
	
	/**
	 * A watcher parses an expression, collects dependencies,
	 * and fires callback when the expression value changes.
	 * This is used for both the $watch() api and directives.
	 *
	 * @param {Vue} vm
	 * @param {String|Function} expOrFn
	 * @param {Function} cb
	 * @param {Object} options
	 *                 - {Array} filters
	 *                 - {Boolean} twoWay
	 *                 - {Boolean} deep
	 *                 - {Boolean} user
	 *                 - {Boolean} sync
	 *                 - {Boolean} lazy
	 *                 - {Function} [preProcess]
	 *                 - {Function} [postProcess]
	 * @constructor
	 */
	
	function Watcher(vm, expOrFn, cb, options) {
	  // mix in options
	  if (options) {
	    (0, _util.extend)(this, options);
	  }
	  var isFn = typeof expOrFn === 'function';
	  this.vm = vm;
	  vm._watchers.push(this);
	  this.expression = expOrFn;
	  this.cb = cb;
	  this.id = ++uid; // uid for batching
	  this.active = true;
	  this.dirty = this.lazy; // for lazy watchers
	  this.deps = [];
	  this.newDeps = [];
	  this.depIds = new _util._Set();
	  this.newDepIds = new _util._Set();
	  // parse expression for getter
	  if (isFn) {
	    this.getter = expOrFn;
	  } else {
	    this.getter = (0, _util.parsePath)(expOrFn);
	    if (!this.getter) {
	      this.getter = function () {};
	      process.env.NODE_ENV !== 'production' && (0, _util.warn)('Failed watching path: ' + expOrFn + 'Watcher only accepts simple dot-delimited paths. ' + 'For full control, use a function instead.', vm);
	    }
	  }
	  this.value = this.lazy ? undefined : this.get();
	  // state for avoiding false triggers for deep and Array
	  // watchers during vm._digest()
	  this.queued = this.shallow = false;
	}
	
	/**
	 * Evaluate the getter, and re-collect dependencies.
	 */
	
	Watcher.prototype.get = function () {
	  this.beforeGet();
	  var value = this.getter.call(this.vm, this.vm);
	  // "touch" every property so they are all tracked as
	  // dependencies for deep watching
	  if (this.deep) {
	    traverse(value);
	  }
	  this.afterGet();
	  return value;
	};
	
	/**
	 * Prepare for dependency collection.
	 */
	
	Watcher.prototype.beforeGet = function () {
	  prevTarget = _dep2.default.target;
	  _dep2.default.target = this;
	};
	
	/**
	 * Add a dependency to this directive.
	 *
	 * @param {Dep} dep
	 */
	
	Watcher.prototype.addDep = function (dep) {
	  var id = dep.id;
	  if (!this.newDepIds.has(id)) {
	    this.newDepIds.add(id);
	    this.newDeps.push(dep);
	    if (!this.depIds.has(id)) {
	      dep.addSub(this);
	    }
	  }
	};
	
	/**
	 * Clean up for dependency collection.
	 */
	
	Watcher.prototype.afterGet = function () {
	  _dep2.default.target = prevTarget;
	  var i = this.deps.length;
	  while (i--) {
	    var dep = this.deps[i];
	    if (!this.newDepIds.has(dep.id)) {
	      dep.removeSub(this);
	    }
	  }
	  var tmp = this.depIds;
	  this.depIds = this.newDepIds;
	  this.newDepIds = tmp;
	  this.newDepIds.clear();
	  tmp = this.deps;
	  this.deps = this.newDeps;
	  this.newDeps = tmp;
	  this.newDeps.length = 0;
	};
	
	/**
	 * Subscriber interface.
	 * Will be called when a dependency changes.
	 *
	 * @param {Boolean} shallow
	 */
	
	Watcher.prototype.update = function (shallow) {
	  if (this.lazy) {
	    this.dirty = true;
	  } else {
	    this.run();
	  }
	  // } else if (this.sync) {
	  //   this.run()
	  // } else {
	  //   // if queued, only overwrite shallow with non-shallow,
	  //   // but not the other way around.
	  //   this.shallow = this.queued
	  //     ? shallow
	  //       ? this.shallow
	  //       : false
	  //     : !!shallow
	  //   this.queued = true
	  //   pushWatcher(this)
	  // }
	};
	
	/**
	 * Batcher job interface.
	 * Will be called by the batcher.
	 */
	
	Watcher.prototype.run = function () {
	  if (this.active) {
	    var value = this.get();
	    if (value !== this.value ||
	    // Deep watchers and watchers on Object/Arrays should fire even
	    // when the value is the same, because the value may
	    // have mutated; but only do so if this is a
	    // non-shallow update (caused by a vm digest).
	    ((0, _util.isObject)(value) || this.deep) && !this.shallow) {
	      // set new value
	      var oldValue = this.value;
	      this.value = value;
	      this.cb.call(this.vm, value, oldValue);
	    }
	    this.queued = this.shallow = false;
	  }
	};
	
	/**
	 * Evaluate the value of the watcher.
	 * This only gets called for lazy watchers.
	 */
	
	Watcher.prototype.evaluate = function () {
	  // avoid overwriting another watcher that is being
	  // collected.
	  var current = _dep2.default.target;
	  this.value = this.get();
	  this.dirty = false;
	  _dep2.default.target = current;
	};
	
	/**
	 * Depend on all deps collected by this watcher.
	 */
	
	Watcher.prototype.depend = function () {
	  var i = this.deps.length;
	  while (i--) {
	    this.deps[i].depend();
	  }
	};
	
	/**
	 * Remove self from all dependencies' subcriber list.
	 */
	
	Watcher.prototype.teardown = function () {
	  if (this.active) {
	    // remove self from vm's watcher list
	    // this is a somewhat expensive operation so we skip it
	    // if the vm is being destroyed or is performing a v-for
	    // re-render (the watcher list is then filtered by v-for).
	    if (!this.vm._isBeingDestroyed && !this.vm._vForRemoving) {
	      (0, _util.remove)(this.vm._watchers, this);
	    }
	    var i = this.deps.length;
	    while (i--) {
	      this.deps[i].removeSub(this);
	    }
	    this.active = false;
	    this.vm = this.cb = this.value = null;
	  }
	};
	
	/**
	 * Recrusively traverse an object to evoke all converted
	 * getters, so that every nested property inside the object
	 * is collected as a "deep" dependency.
	 *
	 * @param {*} val
	 * @param {Set} seen
	 */
	
	var seenObjects = new _util._Set();
	function traverse(val, seen) {
	  var i = void 0,
	      keys = void 0,
	      isA = void 0,
	      isO = void 0;
	  if (!seen) {
	    seen = seenObjects;
	    seen.clear();
	  }
	  isA = (0, _util.isArray)(val);
	  isO = (0, _util.isObject)(val);
	  if (isA || isO) {
	    if (val.__ob__) {
	      var depId = val.__ob__.dep.id;
	      if (seen.has(depId)) {
	        return;
	      } else {
	        seen.add(depId);
	      }
	    }
	    if (isA) {
	      i = val.length;
	      while (i--) {
	        traverse(val[i], seen);
	      }
	    } else if (isO) {
	      keys = Object.keys(val);
	      i = keys.length;
	      while (i--) {
	        traverse(val[keys[i]], seen);
	      }
	    }
	  }
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(51)))

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Dep;
	
	var _util = __webpack_require__(48);
	
	var uid = 0;
	
	/**
	 * A dep is an observable that can have multiple
	 * directives subscribing to it.
	 *
	 * @constructor
	 */
	
	/* eslint-disable */
	
	function Dep() {
	  this.id = uid++;
	  this.subs = [];
	}
	
	// the current target watcher being evaluated.
	// this is globally unique because there could be only one
	// watcher being evaluated at any time.
	Dep.target = null;
	
	/**
	 * Add a directive subscriber.
	 *
	 * @param {Directive} sub
	 */
	
	Dep.prototype.addSub = function (sub) {
	  this.subs.push(sub);
	};
	
	/**
	 * Remove a directive subscriber.
	 *
	 * @param {Directive} sub
	 */
	
	Dep.prototype.removeSub = function (sub) {
	  (0, _util.remove)(this.subs, sub);
	};
	
	/**
	 * Add self as a dependency to the target watcher.
	 */
	
	Dep.prototype.depend = function () {
	  Dep.target.addDep(this);
	};
	
	/**
	 * Notify all subscribers of a new value.
	 */
	
	Dep.prototype.notify = function () {
	  // stablize the subscriber list first
	  var subs = this.subs.slice();
	  for (var i = 0, l = subs.length; i < l; i++) {
	    subs[i].update();
	  }
	};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Observer = Observer;
	exports.observe = observe;
	exports.defineReactive = defineReactive;
	exports.set = set;
	exports.del = del;
	exports.proxy = proxy;
	exports.unproxy = unproxy;
	
	var _dep = __webpack_require__(55);
	
	var _dep2 = _interopRequireDefault(_dep);
	
	var _array = __webpack_require__(57);
	
	var _util = __webpack_require__(48);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var arrayKeys = Object.getOwnPropertyNames(_array.arrayMethods);
	
	/**
	 * Observer class that are attached to each observed
	 * object. Once attached, the observer converts target
	 * object's property keys into getter/setters that
	 * collect dependencies and dispatches updates.
	 *
	 * @param {Array|Object} value
	 * @constructor
	 */
	
	/* eslint-disable */
	
	function Observer(value) {
	  this.value = value;
	  this.dep = new _dep2.default();
	  (0, _util.def)(value, '__ob__', this);
	  if ((0, _util.isArray)(value)) {
	    var augment = _util.hasProto ? protoAugment : copyAugment;
	    augment(value, _array.arrayMethods, arrayKeys);
	    this.observeArray(value);
	  } else {
	    this.walk(value);
	  }
	}
	
	// Instance methods
	
	/**
	 * Walk through each property and convert them into
	 * getter/setters. This method should only be called when
	 * value type is Object.
	 *
	 * @param {Object} obj
	 */
	
	Observer.prototype.walk = function (obj) {
	  for (var key in obj) {
	    this.convert(key, obj[key]);
	  }
	};
	
	/**
	 * Observe a list of Array items.
	 *
	 * @param {Array} items
	 */
	
	Observer.prototype.observeArray = function (items) {
	  for (var i = 0, l = items.length; i < l; i++) {
	    observe(items[i]);
	  }
	};
	
	/**
	 * Convert a property into getter/setter so we can emit
	 * the events when the property is accessed/changed.
	 *
	 * @param {String} key
	 * @param {*} val
	 */
	
	Observer.prototype.convert = function (key, val) {
	  defineReactive(this.value, key, val);
	};
	
	/**
	 * Add an owner vm, so that when $set/$delete mutations
	 * happen we can notify owner vms to proxy the keys and
	 * digest the watchers. This is only called when the object
	 * is observed as an instance's root $data.
	 *
	 * @param {Vue} vm
	 */
	
	Observer.prototype.addVm = function (vm) {
	  (this.vms || (this.vms = [])).push(vm);
	};
	
	/**
	 * Remove an owner vm. This is called when the object is
	 * swapped out as an instance's $data object.
	 *
	 * @param {Vue} vm
	 */
	
	Observer.prototype.removeVm = function (vm) {
	  (0, _util.remove)(this.vms, vm);
	};
	
	// helpers
	
	/**
	 * Augment an target Object or Array by intercepting
	 * the prototype chain using __proto__
	 *
	 * @param {Object|Array} target
	 * @param {Object} src
	 */
	
	function protoAugment(target, src) {
	  /* eslint-disable no-proto */
	  target.__proto__ = src;
	  /* eslint-enable no-proto */
	}
	
	/**
	 * Augment an target Object or Array by defining
	 * hidden properties.
	 *
	 * @param {Object|Array} target
	 * @param {Object} proto
	 */
	
	function copyAugment(target, src, keys) {
	  for (var i = 0, l = keys.length; i < l; i++) {
	    var key = keys[i];
	    (0, _util.def)(target, key, src[key]);
	  }
	}
	
	/**
	 * Attempt to create an observer instance for a value,
	 * returns the new observer if successfully observed,
	 * or the existing observer if the value already has one.
	 *
	 * @param {*} value
	 * @param {Vue} [vm]
	 * @return {Observer|undefined}
	 * @static
	 */
	
	function observe(value, vm) {
	  if (!(0, _util.isObject)(value)) {
	    return;
	  }
	  var ob = void 0;
	  if ((0, _util.hasOwn)(value, '__ob__') && value.__ob__ instanceof Observer) {
	    ob = value.__ob__;
	  } else if (((0, _util.isArray)(value) || (0, _util.isPlainObject)(value)) && Object.isExtensible(value) && !value._isVue) {
	    ob = new Observer(value);
	  }
	  if (ob && vm) {
	    ob.addVm(vm);
	  }
	  return ob;
	}
	
	/**
	 * Define a reactive property on an Object.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @param {*} val
	 */
	
	function defineReactive(obj, key, val) {
	  var dep = new _dep2.default();
	
	  var property = Object.getOwnPropertyDescriptor(obj, key);
	  if (property && property.configurable === false) {
	    return;
	  }
	
	  // cater for pre-defined getter/setters
	  var getter = property && property.get;
	  var setter = property && property.set;
	
	  var childOb = observe(val);
	  Object.defineProperty(obj, key, {
	    enumerable: true,
	    configurable: true,
	    get: function reactiveGetter() {
	      var value = getter ? getter.call(obj) : val;
	      if (_dep2.default.target) {
	        dep.depend();
	        if (childOb) {
	          childOb.dep.depend();
	        }
	        if ((0, _util.isArray)(value)) {
	          for (var e, i = 0, l = value.length; i < l; i++) {
	            e = value[i];
	            e && e.__ob__ && e.__ob__.dep.depend();
	          }
	        }
	      }
	      return value;
	    },
	    set: function reactiveSetter(newVal) {
	      var value = getter ? getter.call(obj) : val;
	      if (newVal === value) {
	        return;
	      }
	      if (setter) {
	        setter.call(obj, newVal);
	      } else {
	        val = newVal;
	      }
	      childOb = observe(newVal);
	      dep.notify();
	    }
	  });
	}
	
	/**
	 * Set a property on an object. Adds the new property and
	 * triggers change notification if the property doesn't
	 * already exist.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @param {*} val
	 * @public
	 */
	
	function set(obj, key, val) {
	  if ((0, _util.isArray)(obj)) {
	    return obj.splice(key, 1, val);
	  }
	  if ((0, _util.hasOwn)(obj, key)) {
	    obj[key] = val;
	    return;
	  }
	  if (obj._isVue) {
	    set(obj._data, key, val);
	    return;
	  }
	  var ob = obj.__ob__;
	  if (!ob) {
	    obj[key] = val;
	    return;
	  }
	  ob.convert(key, val);
	  ob.dep.notify();
	  if (ob.vms) {
	    var i = ob.vms.length;
	    while (i--) {
	      var vm = ob.vms[i];
	      proxy(vm, key);
	      vm.$forceUpdate();
	    }
	  }
	  return val;
	}
	
	/**
	 * Delete a property and trigger change if necessary.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 */
	
	function del(obj, key) {
	  if (!(0, _util.hasOwn)(obj, key)) {
	    return;
	  }
	  delete obj[key];
	  var ob = obj.__ob__;
	
	  if (!ob) {
	    if (obj._isVue) {
	      delete obj._data[key];
	      obj.$forceUpdate();
	    }
	    return;
	  }
	  ob.dep.notify();
	  if (ob.vms) {
	    var i = ob.vms.length;
	    while (i--) {
	      var vm = ob.vms[i];
	      unproxy(vm, key);
	      vm.$forceUpdate();
	    }
	  }
	}
	
	var KEY_WORDS = ['$index', '$value', '$event'];
	function proxy(vm, key) {
	  if (KEY_WORDS.indexOf(key) > -1 || !(0, _util.isReserved)(key)) {
	    Object.defineProperty(vm, key, {
	      configurable: true,
	      enumerable: true,
	      get: function proxyGetter() {
	        return vm._data[key];
	      },
	      set: function proxySetter(val) {
	        vm._data[key] = val;
	      }
	    });
	  }
	}
	
	function unproxy(vm, key) {
	  if (!(0, _util.isReserved)(key)) {
	    delete vm[key];
	  }
	}

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.arrayMethods = undefined;
	
	var _util = __webpack_require__(48);
	
	var arrayProto = Array.prototype; /* eslint-disable */
	
	var arrayMethods = exports.arrayMethods = Object.create(arrayProto)
	
	/**
	 * Intercept mutating methods and emit events
	 */
	
	;['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function (method) {
	  // cache original method
	  var original = arrayProto[method];
	  (0, _util.def)(arrayMethods, method, function mutator() {
	    // avoid leaking arguments:
	    // http://jsperf.com/closure-with-arguments
	    var i = arguments.length;
	    var args = new Array(i);
	    while (i--) {
	      args[i] = arguments[i];
	    }
	    var result = original.apply(this, args);
	    var ob = this.__ob__;
	    var inserted = void 0;
	    switch (method) {
	      case 'push':
	        inserted = args;
	        break;
	      case 'unshift':
	        inserted = args;
	        break;
	      case 'splice':
	        inserted = args.slice(2);
	        break;
	    }
	    if (inserted) ob.observeArray(inserted);
	    // notify change
	    ob.dep.notify();
	    return result;
	  });
	});
	
	/**
	 * Swap the element at the given index with a new value
	 * and emits corresponding event.
	 *
	 * @param {Number} index
	 * @param {*} val
	 * @return {*} - replaced element
	 */
	
	(0, _util.def)(arrayProto, '$set', function $set(index, val) {
	  if (index >= this.length) {
	    this.length = index + 1;
	  }
	  return this.splice(index, 1, val)[0];
	});
	
	/**
	 * Convenience method to remove the element at given index.
	 *
	 * @param {Number} index
	 * @param {*} val
	 */
	
	(0, _util.def)(arrayProto, '$remove', function $remove(index) {
	  /* istanbul ignore if */
	  if (!this.length) return;
	  if (typeof index !== 'number') {
	    index = this.indexOf(index);
	  }
	  if (index > -1) {
	    this.splice(index, 1);
	  }
	});

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /**
	                                                                                                                                                                                                                                                   * @fileOverview
	                                                                                                                                                                                                                                                   * ViewModel template parser & data-binding process
	                                                                                                                                                                                                                                                   *
	                                                                                                                                                                                                                                                   * required:
	                                                                                                                                                                                                                                                   * index.js: Vm
	                                                                                                                                                                                                                                                   * dom-helper.js: _createElement, _createBlock
	                                                                                                                                                                                                                                                   * dom-helper.js: _attachTarget, _moveTarget, _removeTarget
	                                                                                                                                                                                                                                                   * directive.js: _bindElement, _bindSubVm, _watch
	                                                                                                                                                                                                                                                   * events.js: $on
	                                                                                                                                                                                                                                                   */
	
	exports._build = _build;
	exports._compile = _compile;
	exports._targetIsFragment = _targetIsFragment;
	exports._targetIsContent = _targetIsContent;
	exports._targetNeedCheckRepeat = _targetNeedCheckRepeat;
	exports._targetNeedCheckShown = _targetNeedCheckShown;
	exports._targetNeedCheckType = _targetNeedCheckType;
	exports._targetIsComposed = _targetIsComposed;
	exports._compileFragment = _compileFragment;
	exports._compileRepeat = _compileRepeat;
	exports._compileShown = _compileShown;
	exports._compileType = _compileType;
	exports._compileCustomComponent = _compileCustomComponent;
	exports._compileNativeComponent = _compileNativeComponent;
	exports._compileChildren = _compileChildren;
	exports._bindRepeat = _bindRepeat;
	exports._bindShown = _bindShown;
	exports._watchBlock = _watchBlock;
	exports._mergeContext = _mergeContext;
	
	var _util = __webpack_require__(48);
	
	var _ = _interopRequireWildcard(_util);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	/**
	 * build(externalDirs)
	 *   createVm()
	 *   merge(externalDirs, dirs)
	 *   compile(template, parentNode)
	 *     if (type is content) create contentNode
	 *     else if (dirs have v-for) foreach -> create context
	 *       -> compile(templateWithoutFor, parentNode): diff(list) onchange
	 *     else if (dirs have v-if) assert
	 *       -> compile(templateWithoutIf, parentNode): toggle(shown) onchange
	 *     else if (type is native)
	 *       set(dirs): update(id/attr/style/class) onchange
	 *       append(template, parentNode)
	 *       foreach childNodes -> compile(childNode, template)
	 *     else if (type is custom)
	 *       addChildVm(vm, parentVm)
	 *       build(externalDirs)
	 *       foreach childNodes -> compile(childNode, template)
	 */
	function _build() {
	  var opt = this._options || {};
	  var template = opt.template || {};
	
	  if (opt.replace) {
	    if (template.children && template.children.length === 1) {
	      this._compile(template.children[0], this._parentEl);
	    } else {
	      this._compile(template.children, this._parentEl);
	    }
	  } else {
	    this._compile(template, this._parentEl);
	  }
	
	  _.debug('"ready" lifecycle in Vm(' + this._type + ')');
	  this.$emit('hook:ready');
	  this._ready = true;
	}
	
	/**
	 * Generate elements by child or children and append to parent elements.
	 * Root element info would be merged if has. The first argument may be an array
	 * if the root element with options.replace has not only one child.
	 *
	 * @param {object|array} target
	 * @param {object}       dest
	 * @param {object}       meta
	 */
	function _compile(target, dest, meta) {
	  var app = this._app || {};
	
	  if (app.lastSignal === -1) {
	    return;
	  }
	
	  var context = this;
	  if (context._targetIsFragment(target)) {
	    context._compileFragment(target, dest, meta);
	    return;
	  }
	  meta = meta || {};
	  if (context._targetIsContent(target)) {
	    _.debug('compile "content" block by', target);
	    context._content = context._createBlock(dest);
	    return;
	  }
	
	  if (context._targetNeedCheckRepeat(target, meta)) {
	    _.debug('compile "repeat" logic by', target);
	    context._compileRepeat(target, dest);
	    return;
	  }
	  if (context._targetNeedCheckShown(target, meta)) {
	    _.debug('compile "if" logic by', target);
	    context._compileShown(target, dest, meta);
	    return;
	  }
	  var typeGetter = meta.type || target.type;
	  if (context._targetNeedCheckType(typeGetter, meta)) {
	    context._compileType(target, dest, typeGetter, meta);
	    return;
	  }
	  var type = typeGetter;
	  var component = context._targetIsComposed(target, type);
	  if (component) {
	    _.debug('compile composed component by', target);
	    context._compileCustomComponent(component, target, dest, type, meta);
	    return;
	  }
	  _.debug('compile native component by', target);
	  context._compileNativeComponent(target, dest, type);
	}
	
	/**
	 * Check if target is a fragment (an array).
	 *
	 * @param  {object}  target
	 * @return {boolean}
	 */
	function _targetIsFragment(target) {
	  return Array.isArray(target);
	}
	
	/**
	 * Check if target type is content/slot.
	 *
	 * @param  {object}  target
	 * @return {boolean}
	 */
	function _targetIsContent(target) {
	  return target.type === 'content' || target.type === 'slot';
	}
	
	/**
	 * Check if target need to compile by a list.
	 *
	 * @param  {object}  target
	 * @param  {object}  meta
	 * @return {boolean}
	 */
	function _targetNeedCheckRepeat(target, meta) {
	  return !meta.hasOwnProperty('repeat') && target.repeat;
	}
	
	/**
	 * Check if target need to compile by a boolean value.
	 *
	 * @param  {object}  target
	 * @param  {object}  meta
	 * @return {boolean}
	 */
	function _targetNeedCheckShown(target, meta) {
	  return !meta.hasOwnProperty('shown') && target.shown;
	}
	
	/**
	 * Check if target need to compile by a dynamic type.
	 *
	 * @param  {string|function} typeGetter
	 * @param  {object}          meta
	 * @return {boolean}
	 */
	function _targetNeedCheckType(typeGetter, meta) {
	  return typeof typeGetter === 'function' && !meta.hasOwnProperty('type');
	}
	
	/**
	 * Check if this kind of component is composed.
	 *
	 * @param  {string}  type
	 * @return {boolean}
	 */
	function _targetIsComposed(target, type) {
	  var component = void 0;
	  if (this._app && this._app.customComponentMap) {
	    component = this._app.customComponentMap[type];
	  }
	  if (this._options && this._options.components) {
	    component = this._options.components[type];
	  }
	  if (target.component) {
	    component = component || {};
	  }
	  return component;
	}
	
	/**
	 * Compile a list of targets.
	 *
	 * @param {object} target
	 * @param {object} dest
	 * @param {object} meta
	 */
	function _compileFragment(target, dest, meta) {
	  var _this = this;
	
	  var fragBlock = this._createBlock(dest);
	  target.forEach(function (child) {
	    _this._compile(child, fragBlock, meta);
	  });
	}
	
	/**
	 * Compile a target with repeat directive.
	 *
	 * @param {object} target
	 * @param {object} dest
	 */
	function _compileRepeat(target, dest) {
	  var repeat = target.repeat;
	  var oldStyle = typeof repeat === 'function';
	  var getter = repeat.getter || repeat.expression || repeat;
	  if (typeof getter !== 'function') {
	    getter = function getter() {
	      return [];
	    };
	  }
	  var key = repeat.key || '$index';
	  var value = repeat.value || '$value';
	  var trackBy = repeat.trackBy || target.trackBy || target.attr && target.attr.trackBy;
	
	  var fragBlock = this._createBlock(dest);
	  fragBlock.children = [];
	  fragBlock.data = [];
	  fragBlock.vms = [];
	
	  this._bindRepeat(target, fragBlock, { getter: getter, key: key, value: value, trackBy: trackBy, oldStyle: oldStyle });
	}
	
	/**
	 * Compile a target with if directive.
	 *
	 * @param {object} target
	 * @param {object} dest
	 * @param {object} meta
	 */
	function _compileShown(target, dest, meta) {
	  var newMeta = { shown: true };
	  var fragBlock = this._createBlock(dest);
	
	  if (dest.element && dest.children) {
	    dest.children.push(fragBlock);
	  }
	
	  if (meta.repeat) {
	    newMeta.repeat = meta.repeat;
	  }
	
	  this._bindShown(target, fragBlock, newMeta);
	}
	
	/**
	 * Compile a target with dynamic component type.
	 *
	 * @param {object}   target
	 * @param {object}   dest
	 * @param {function} typeGetter
	 */
	function _compileType(target, dest, typeGetter, meta) {
	  var _this2 = this;
	
	  var type = typeGetter.call(this);
	  var newMeta = Object.assign({ type: type }, meta);
	  var fragBlock = this._createBlock(dest);
	
	  if (dest.element && dest.children) {
	    dest.children.push(fragBlock);
	  }
	
	  this._watch(typeGetter, function (value) {
	    var newMeta = Object.assign({ type: value }, meta);
	    _this2._removeBlock(fragBlock, true);
	    _this2._compile(target, fragBlock, newMeta);
	  });
	
	  this._compile(target, fragBlock, newMeta);
	}
	
	/**
	 * Compile a composed component.
	 *
	 * @param {object} target
	 * @param {object} dest
	 * @param {string} type
	 */
	function _compileCustomComponent(component, target, dest, type, meta) {
	  var Vm = this.constructor;
	  var context = this;
	  var subVm = new Vm(type, component, context, dest, undefined, {
	    'hook:init': function hookInit() {
	      context._setId(target.id, null, this);
	      // bind template earlier because of lifecycle issues
	      this._externalBinding = {
	        parent: context,
	        template: target
	      };
	    },
	    'hook:created': function hookCreated() {
	      context._bindSubVm(this, target, meta.repeat);
	    },
	    'hook:ready': function hookReady() {
	      if (this._content) {
	        context._compileChildren(target, this._content);
	      }
	    }
	  });
	  this._bindSubVmAfterInitialized(subVm, target);
	}
	
	/**
	 * Generate element from template and attach to the dest if needed.
	 * The time to attach depends on whether the mode status is node or tree.
	 *
	 * @param {object} template
	 * @param {object} dest
	 * @param {string} type
	 */
	function _compileNativeComponent(template, dest, type) {
	  this._applyNaitveComponentOptions(template);
	
	  var element = void 0;
	  if (dest.ref === '_documentElement') {
	    // if its parent is documentElement then it's a body
	    _.debug('compile to create body for', type);
	    element = this._createBody(type);
	  } else {
	    _.debug('compile to create element for', type);
	    element = this._createElement(type);
	  }
	
	  if (!this._rootEl) {
	    this._rootEl = element;
	    // bind event earlier because of lifecycle issues
	    var binding = this._externalBinding || {};
	    var target = binding.template;
	    var vm = binding.parent;
	    if (target && target.events && vm && element) {
	      for (var _type in target.events) {
	        var handler = vm[target.events[_type]];
	        if (handler) {
	          element.addEvent(_type, _.bind(handler, vm));
	        }
	      }
	    }
	  }
	
	  this._bindElement(element, template);
	
	  if (template.attr && template.attr.append) {
	    // backward, append prop in attr
	    template.append = template.attr.append;
	  }
	
	  if (template.append) {
	    // give the append attribute for ios adaptation
	    element.attr = element.attr || {};
	    element.attr.append = template.append;
	  }
	
	  var treeMode = template.append === 'tree';
	  var app = this._app || {};
	  if (app.lastSignal !== -1 && !treeMode) {
	    _.debug('compile to append single node for', element);
	    app.lastSignal = this._attachTarget(element, dest);
	  }
	  if (app.lastSignal !== -1) {
	    this._compileChildren(template, element);
	  }
	  if (app.lastSignal !== -1 && treeMode) {
	    _.debug('compile to append whole tree for', element);
	    app.lastSignal = this._attachTarget(element, dest);
	  }
	}
	
	/**
	 * Set all children to a certain parent element.
	 *
	 * @param {object} template
	 * @param {object} dest
	 */
	function _compileChildren(template, dest) {
	  var _this3 = this;
	
	  var app = this._app || {};
	  var children = template.children;
	  if (children && children.length) {
	    children.every(function (child) {
	      _this3._compile(child, dest);
	      return app.lastSignal !== -1;
	    });
	  }
	}
	
	/**
	 * Watch the list update and refresh the changes.
	 *
	 * @param {object} target
	 * @param {object} fragBlock {vms, data, children}
	 * @param {object} info      {getter, key, value, trackBy, oldStyle}
	 */
	function _bindRepeat(target, fragBlock, info) {
	  var _this4 = this;
	
	  var vms = fragBlock.vms;
	  var children = fragBlock.children;
	  var getter = info.getter;
	  var trackBy = info.trackBy;
	  var oldStyle = info.oldStyle;
	
	  var keyName = info.key;
	  var valueName = info.value;
	
	  function compileItem(item, index, context) {
	    var mergedData = void 0;
	    if (oldStyle) {
	      mergedData = item;
	      if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object') {
	        mergedData[keyName] = index;
	        if (!mergedData.hasOwnProperty('INDEX')) {
	          Object.defineProperty(mergedData, 'INDEX', {
	            value: function value() {
	              _.warn('"INDEX" in repeat is deprecated,' + ' please use "$index" instead');
	            }
	          });
	        }
	      }
	    } else {
	      mergedData = {};
	      mergedData[keyName] = index;
	      mergedData[valueName] = item;
	    }
	    context = context._mergeContext(mergedData);
	    vms.push(context);
	    context._compile(target, fragBlock, { repeat: item });
	  }
	
	  var list = this._watchBlock(fragBlock, getter, 'repeat', function (data) {
	    _.debug('the "repeat" item has changed', data);
	    if (!fragBlock) {
	      return;
	    }
	
	    var oldChildren = children.slice();
	    var oldVms = vms.slice();
	    var oldData = fragBlock.data.slice();
	    // 1. collect all new refs track by
	    var trackMap = {};
	    var reusedMap = {};
	    data.forEach(function (item, index) {
	      var key = trackBy ? item[trackBy] : oldStyle ? item[keyName] : index;
	      /* istanbul ignore if */
	      if (key == null || key === '') {
	        return;
	      }
	      trackMap[key] = item;
	    });
	
	    // 2. remove unused element foreach old item
	    var reusedList = [];
	    oldData.forEach(function (item, index) {
	      var key = trackBy ? item[trackBy] : oldStyle ? item[keyName] : index;
	      if (trackMap.hasOwnProperty(key)) {
	        reusedMap[key] = {
	          item: item, index: index, key: key,
	          target: oldChildren[index],
	          vm: oldVms[index]
	        };
	        reusedList.push(item);
	      } else {
	        _this4._removeTarget(oldChildren[index]);
	      }
	    });
	
	    // 3. create new element foreach new item
	    children.length = 0;
	    vms.length = 0;
	    fragBlock.data = data.slice();
	    fragBlock.updateMark = fragBlock.start;
	
	    data.forEach(function (item, index) {
	      var key = trackBy ? item[trackBy] : oldStyle ? item[keyName] : index;
	      var reused = reusedMap[key];
	      if (reused) {
	        if (reused.item === reusedList[0]) {
	          reusedList.shift();
	        } else {
	          reusedList.$remove(reused.item);
	          _this4._moveTarget(reused.target, fragBlock.updateMark, true);
	        }
	        children.push(reused.target);
	        vms.push(reused.vm);
	        reused.vm[keyName] = index;
	        fragBlock.updateMark = reused.target;
	      } else {
	        compileItem(item, index, _this4);
	      }
	    });
	
	    delete fragBlock.updateMark;
	  });
	
	  fragBlock.data = list.slice(0);
	  list.forEach(function (item, index) {
	    compileItem(item, index, _this4);
	  });
	}
	
	/**
	 * Watch the display update and add/remove the element.
	 *
	 * @param  {object} target
	 * @param  {object} fragBlock
	 * @param  {object} context
	 */
	function _bindShown(target, fragBlock, meta) {
	  var _this5 = this;
	
	  var display = this._watchBlock(fragBlock, target.shown, 'shown', function (display) {
	    _.debug('the "if" item was changed', display);
	
	    if (!fragBlock || !!fragBlock.display === !!display) {
	      return;
	    }
	    fragBlock.display = !!display;
	    if (display) {
	      _this5._compile(target, fragBlock, meta);
	    } else {
	      _this5._removeBlock(fragBlock, true);
	    }
	  });
	
	  fragBlock.display = !!display;
	  if (display) {
	    this._compile(target, fragBlock, meta);
	  }
	}
	
	/**
	 * Watch calc value changes and append certain type action to differ.
	 * It is used for if or repeat data-binding generator.
	 *
	 * @param  {object}   fragBlock
	 * @param  {function} calc
	 * @param  {string}   type
	 * @param  {function} handler
	 * @return {any}      init value of calc
	 */
	function _watchBlock(fragBlock, calc, type, handler) {
	  var differ = this && this._app && this._app.differ;
	  var config = {};
	  var depth = (fragBlock.element.depth || 0) + 1;
	
	  return this._watch(calc, function (value) {
	    config.latestValue = value;
	    if (differ && !config.recorded) {
	      differ.append(type, depth, fragBlock.blockId, function () {
	        var latestValue = config.latestValue;
	        handler(latestValue);
	        config.recorded = false;
	        config.latestValue = undefined;
	      });
	    }
	    config.recorded = true;
	  });
	}
	
	/**
	 * Clone a context and merge certain data.
	 *
	 * @param  {object} mergedData
	 * @return {object}
	 */
	function _mergeContext(mergedData) {
	  var context = Object.create(this);
	  context._data = mergedData;
	  context._initData();
	  context._initComputed();
	  context._realParent = this;
	  return context;
	}

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /**
	                                                                                                                                                                                                                                                   * @fileOverview
	                                                                                                                                                                                                                                                   * Directive Parser
	                                                                                                                                                                                                                                                   */
	
	exports._applyNaitveComponentOptions = _applyNaitveComponentOptions;
	exports._bindElement = _bindElement;
	exports._bindSubVm = _bindSubVm;
	exports._bindSubVmAfterInitialized = _bindSubVmAfterInitialized;
	exports._setId = _setId;
	exports._setAttr = _setAttr;
	exports._setClass = _setClass;
	exports._setStyle = _setStyle;
	exports._setEvent = _setEvent;
	exports._bindEvents = _bindEvents;
	exports._bindDir = _bindDir;
	exports._bindKey = _bindKey;
	exports._watch = _watch;
	
	var _util = __webpack_require__(48);
	
	var _ = _interopRequireWildcard(_util);
	
	var _watcher = __webpack_require__(54);
	
	var _watcher2 = _interopRequireDefault(_watcher);
	
	var _config = __webpack_require__(46);
	
	var _config2 = _interopRequireDefault(_config);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var nativeComponentMap = _config2.default.nativeComponentMap;
	
	
	var SETTERS = {
	  attr: 'setAttr',
	  style: 'setStyle',
	  event: 'addEvent'
	};
	
	/**
	 * apply the native component's options(specified by template.type)
	 * to the template
	 */
	function _applyNaitveComponentOptions(template) {
	  var type = template.type;
	
	  var options = nativeComponentMap[type];
	
	  if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
	    for (var key in options) {
	      if (template[key] == null) {
	        template[key] = options[key];
	      } else if (_.typof(template[key]) === 'object' && _.typof(options[key]) === 'object') {
	        for (var subkey in options[key]) {
	          if (template[key][subkey] == null) {
	            template[key][subkey] = options[key][subkey];
	          }
	        }
	      }
	    }
	  }
	}
	
	/**
	 * bind all id, attr, classnames, style, events to an element
	 */
	function _bindElement(el, template) {
	  this._setId(template.id, el, this);
	  this._setAttr(el, template.attr);
	  this._setClass(el, template.classList);
	  this._setStyle(el, template.style);
	  this._bindEvents(el, template.events);
	}
	
	/**
	 * bind all props to sub vm and bind all style, events to the root element
	 * of the sub vm if it doesn't have a replaced multi-node fragment
	 */
	function _bindSubVm(subVm, template, repeatItem) {
	  subVm = subVm || {};
	  template = template || {};
	
	  var options = subVm._options || {};
	
	  // bind props
	  var props = options.props;
	
	  if (Array.isArray(props)) {
	    props = props.reduce(function (result, value) {
	      result[value] = true;
	      return result;
	    }, {});
	  }
	
	  mergeProps(repeatItem, props, this, subVm);
	  mergeProps(template.attr, props, this, subVm);
	}
	
	function _bindSubVmAfterInitialized(subVm, template) {
	  mergeClassStyle(template.classList, this, subVm);
	  mergeStyle(template.style, this, subVm);
	}
	
	function mergeProps(target, props, vm, subVm) {
	  if (!target) {
	    return;
	  }
	
	  var _loop = function _loop(key) {
	    if (!props || props[key]) {
	      var value = target[key];
	      if (typeof value === 'function') {
	        var returnValue = vm._watch(value, function (v) {
	          subVm[key] = v;
	        });
	        subVm[key] = returnValue;
	      } else {
	        subVm[key] = value;
	      }
	    }
	  };
	
	  for (var key in target) {
	    _loop(key);
	  }
	}
	
	function mergeStyle(target, vm, subVm) {
	  var _loop2 = function _loop2(key) {
	    var value = target[key];
	    if (typeof value === 'function') {
	      var returnValue = vm._watch(value, function (v) {
	        if (subVm._rootEl) {
	          subVm._rootEl.setStyle(key, v);
	        }
	      });
	      subVm._rootEl.setStyle(key, returnValue);
	    } else {
	      if (subVm._rootEl) {
	        subVm._rootEl.setStyle(key, value);
	      }
	    }
	  };
	
	  for (var key in target) {
	    _loop2(key);
	  }
	}
	
	function mergeClassStyle(target, vm, subVm) {
	  var css = vm._options && vm._options.style || {};
	
	  /* istanbul ignore if */
	  if (!subVm._rootEl) {
	    return;
	  }
	
	  if (typeof target === 'function') {
	    var _value = vm._watch(target, function (v) {
	      setClassStyle(subVm._rootEl, css, v);
	    });
	    setClassStyle(subVm._rootEl, css, _value);
	  } else if (target != null) {
	    setClassStyle(subVm._rootEl, css, target);
	  }
	}
	
	/**
	 * bind id to an element
	 * each id is unique in a whole vm
	 */
	function _setId(id, el, vm) {
	  var _this = this;
	
	  var map = Object.create(null);
	
	  Object.defineProperties(map, {
	    vm: {
	      value: vm,
	      writable: false,
	      configurable: false
	    },
	    el: {
	      get: function get() {
	        return el || vm._rootEl;
	      },
	      configurable: false
	    }
	  });
	
	  if (typeof id === 'function') {
	    var handler = id;
	    id = handler.call(this);
	    if (id) {
	      this._ids[id] = map;
	    }
	    this._watch(handler, function (newId) {
	      if (newId) {
	        _this._ids[newId] = map;
	      }
	    });
	  } else if (id && typeof id === 'string') {
	    this._ids[id] = map;
	  }
	}
	
	/**
	 * bind attr to an element
	 */
	function _setAttr(el, attr) {
	  this._bindDir(el, 'attr', attr);
	}
	
	function setClassStyle(el, css, classList) {
	  var classStyle = {};
	  var length = classList.length;
	
	  for (var i = 0; i < length; i++) {
	    var style = css[classList[i]];
	    if (style) {
	      for (var key in style) {
	        classStyle[key] = style[key];
	      }
	    }
	  }
	  el.setClassStyle(classStyle);
	}
	
	/**
	 * bind classnames to an element
	 */
	function _setClass(el, classList) {
	  if (typeof classList !== 'function' && !Array.isArray(classList)) {
	    return;
	  }
	  if (Array.isArray(classList) && !classList.length) {
	    el.setClassStyle({});
	    return;
	  }
	
	  var style = this._options && this._options.style || {};
	  if (typeof classList === 'function') {
	    var _value2 = this._watch(classList, function (v) {
	      setClassStyle(el, style, v);
	    });
	    setClassStyle(el, style, _value2);
	  } else {
	    setClassStyle(el, style, classList);
	  }
	}
	
	/**
	 * bind style to an element
	 */
	function _setStyle(el, style) {
	  this._bindDir(el, 'style', style);
	}
	
	/**
	 * add an event type and handler to an element and generate a dom update
	 */
	function _setEvent(el, type, handler) {
	  el.addEvent(type, _.bind(handler, this));
	}
	
	/**
	 * add all events of an element
	 */
	function _bindEvents(el, events) {
	  if (!events) {
	    return;
	  }
	  var keys = Object.keys(events);
	  var i = keys.length;
	  while (i--) {
	    var key = keys[i];
	    var handler = events[key];
	    if (typeof handler === 'string') {
	      handler = this[handler];
	      /* istanbul ignore if */
	      if (!handler) {
	        _.error('The method "' + handler + '" is not defined.');
	      }
	    }
	    this._setEvent(el, key, handler);
	  }
	}
	
	/**
	 * set a series of members as a kind of an element
	 * for example: style, attr, ...
	 * if the value is a function then bind the data changes
	 */
	function _bindDir(el, name, data) {
	  if (!data) {
	    return;
	  }
	  var keys = Object.keys(data);
	  var i = keys.length;
	  while (i--) {
	    var key = keys[i];
	    var _value3 = data[key];
	    if (typeof _value3 === 'function') {
	      this._bindKey(el, name, key, _value3);
	    } else {
	      el[SETTERS[name]](key, _value3);
	    }
	  }
	}
	
	/**
	 * bind data changes to a certain key to a name series in an element
	 */
	function _bindKey(el, name, key, calc) {
	  var _this2 = this;
	
	  var methodName = SETTERS[name];
	  // watch the calc, and returns a value by calc.call()
	  var value = this._watch(calc, function (value) {
	    function handler() {
	      el[methodName](key, value);
	    }
	    var differ = _this2 && _this2._app && _this2._app.differ;
	    if (differ) {
	      differ.append('element', el.depth, el.ref, handler);
	    } else {
	      handler();
	    }
	  });
	
	  el[methodName](key, value);
	}
	
	/**
	 * watch a calc function and callback if the calc value changes
	 */
	function _watch(calc, callback) {
	  var watcher = new _watcher2.default(this, calc, function (value, oldValue) {
	    /* istanbul ignore if */
	    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object' && value === oldValue) {
	      return;
	    }
	    callback(value);
	  });
	
	  return watcher.value;
	}

/***/ },
/* 60 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	exports._createBody = _createBody;
	exports._createElement = _createElement;
	exports._createBlock = _createBlock;
	exports._createBlockStart = _createBlockStart;
	exports._createBlockEnd = _createBlockEnd;
	exports._attachTarget = _attachTarget;
	exports._moveTarget = _moveTarget;
	exports._moveElement = _moveElement;
	exports._moveBlock = _moveBlock;
	exports._removeTarget = _removeTarget;
	exports._removeElement = _removeElement;
	exports._removeBlock = _removeBlock;
	/**
	 * @fileOverview Document & Element Helpers.
	 *
	 * required:
	 * Document#: createElement, createComment, getRef
	 * Element#: appendChild, insertBefore, removeChild, nextSibling
	 */
	
	/**
	 * Create a body by type
	 * Using this._app.doc
	 *
	 * @param  {string} type
	 */
	function _createBody(type) {
	  var doc = this._app.doc;
	  return doc.createBody(type);
	}
	
	/**
	 * Create an element by type
	 * Using this._app.doc
	 *
	 * @param  {string} type
	 */
	function _createElement(type) {
	  var doc = this._app.doc;
	  return doc.createElement(type);
	}
	
	/**
	 * Create and return a frag block for an element.
	 * The frag block has a starter, ender and the element itself.
	 *
	 * @param  {object} element
	 */
	function _createBlock(element) {
	  var start = this._createBlockStart();
	  var end = this._createBlockEnd();
	  var blockId = lastestBlockId++;
	  if (element.element) {
	    element.element.insertBefore(start, element.end);
	    element.element.insertBefore(end, element.end);
	    element = element.element;
	  } else {
	    element.appendChild(start);
	    element.appendChild(end);
	  }
	  return { start: start, end: end, element: element, blockId: blockId };
	}
	
	var lastestBlockId = 1;
	
	/**
	 * Create and return a block starter.
	 * Using this._app.doc
	 */
	function _createBlockStart() {
	  var doc = this._app.doc;
	  var anchor = doc.createComment('start');
	  return anchor;
	}
	
	/**
	 * Create and return a block ender.
	 * Using this._app.doc
	 */
	function _createBlockEnd() {
	  var doc = this._app.doc;
	  var anchor = doc.createComment('end');
	  return anchor;
	}
	
	/**
	 * Attach target to a certain dest using appendChild by default.
	 * If the dest is a frag block then insert before the ender.
	 * If the target is a frag block then attach the starter and ender in order.
	 *
	 * @param  {object} target
	 * @param  {object} dest
	 */
	function _attachTarget(target, dest) {
	  if (dest.element) {
	    var before = dest.end;
	    var after = dest.updateMark;
	    // push new target for watch list update later
	    if (dest.children) {
	      dest.children.push(target);
	    }
	    // for check repeat case
	    if (after) {
	      var signal = this._moveTarget(target, after);
	      dest.updateMark = target.element ? target.end : target;
	      return signal;
	    } else if (target.element) {
	      dest.element.insertBefore(target.start, before);
	      dest.element.insertBefore(target.end, before);
	    } else {
	      return dest.element.insertBefore(target, before);
	    }
	  } else {
	    if (target.element) {
	      dest.appendChild(target.start);
	      dest.appendChild(target.end);
	    } else {
	      return dest.appendChild(target);
	    }
	  }
	}
	
	/**
	 * Move target before a certain element. The target maybe block or element.
	 *
	 * @param  {object} target
	 * @param  {object} before
	 */
	function _moveTarget(target, after) {
	  if (target.element) {
	    return this._moveBlock(target, after);
	  }
	  return this._moveElement(target, after);
	}
	
	/**
	 * Move element before a certain element.
	 *
	 * @param  {object} element
	 * @param  {object} before
	 */
	function _moveElement(element, after) {
	  var parent = after.parentNode;
	  if (parent) {
	    return parent.insertAfter(element, after);
	  }
	}
	
	/**
	 * Move all elements of the block before a certain element.
	 *
	 * @param  {object} fragBlock
	 * @param  {object} before
	 */
	function _moveBlock(fragBlock, after) {
	  var parent = after.parentNode;
	
	  if (parent) {
	    var _ret = function () {
	      var el = fragBlock.start;
	      var signal = void 0;
	      var group = [el];
	
	      while (el && el !== fragBlock.end) {
	        el = el.nextSibling;
	        group.push(el);
	      }
	
	      var temp = after;
	      group.every(function (el) {
	        signal = parent.insertAfter(el, temp);
	        temp = el;
	        return signal !== -1;
	      });
	
	      return {
	        v: signal
	      };
	    }();
	
	    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	  }
	}
	
	/**
	 * Remove target from DOM tree.
	 * If the target is a frag block then call _removeBlock
	 *
	 * @param  {object} target
	 */
	function _removeTarget(target) {
	  if (target.element) {
	    this._removeBlock(target);
	  } else {
	    this._removeElement(target);
	  }
	}
	
	/**
	 * Remove a certain element.
	 * Using this._app.doc
	 *
	 * @param  {object} target
	 */
	function _removeElement(target) {
	  var parent = target.parentNode;
	
	  if (parent) {
	    parent.removeChild(target);
	  }
	}
	
	/**
	 * Remove a frag block.
	 * The second param decides whether the block self should be removed too.
	 *
	 * @param  {object}  fragBlock
	 * @param  {Boolean} preserveBlock=false
	 */
	function _removeBlock(fragBlock) {
	  var _this = this;
	
	  var preserveBlock = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	
	  var result = [];
	  var el = fragBlock.start.nextSibling;
	
	  while (el && el !== fragBlock.end) {
	    result.push(el);
	    el = el.nextSibling;
	  }
	
	  if (!preserveBlock) {
	    this._removeElement(fragBlock.start);
	  }
	  result.forEach(function (el) {
	    _this._removeElement(el);
	  });
	  if (!preserveBlock) {
	    this._removeElement(fragBlock.end);
	  }
	}

/***/ },
/* 61 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.$emit = $emit;
	exports.$dispatch = $dispatch;
	exports.$broadcast = $broadcast;
	exports.$on = $on;
	exports.$off = $off;
	exports._initEvents = _initEvents;
	function Evt(type, detail) {
	  if (detail instanceof Evt) {
	    return detail;
	  }
	
	  this.timestamp = Date.now();
	  this.detail = detail;
	  this.type = type;
	
	  var shouldStop = false;
	  this.stop = function () {
	    shouldStop = true;
	  };
	  this.hasStopped = function () {
	    return shouldStop;
	  };
	}
	
	function $emit(type, detail) {
	  var _this = this;
	
	  var events = this._vmEvents;
	  var handlerList = events[type];
	  if (handlerList) {
	    (function () {
	      var evt = new Evt(type, detail);
	      handlerList.forEach(function (handler) {
	        handler.call(_this, evt);
	      });
	    })();
	  }
	}
	
	function $dispatch(type, detail) {
	  var evt = new Evt(type, detail);
	  this.$emit(type, evt);
	
	  if (!evt.hasStopped() && this._parent && this._parent.$dispatch) {
	    this._parent.$dispatch(type, evt);
	  }
	}
	
	function $broadcast(type, detail) {
	  var evt = new Evt(type, detail);
	  this.$emit(type, evt);
	
	  if (!evt.hasStopped() && this._childrenVms) {
	    this._childrenVms.forEach(function (subVm) {
	      subVm.$broadcast(type, evt);
	    });
	  }
	}
	
	function $on(type, handler) {
	  if (!type || typeof handler !== 'function') {
	    return;
	  }
	  var events = this._vmEvents;
	  var handlerList = events[type] || [];
	  handlerList.push(handler);
	  events[type] = handlerList;
	
	  // fixed old version lifecycle design
	  if (type === 'hook:ready' && this._ready) {
	    this.$emit('hook:ready');
	  }
	}
	
	function $off(type, handler) {
	  if (!type) {
	    return;
	  }
	  var events = this._vmEvents;
	  if (!handler) {
	    delete events[type];
	    return;
	  }
	  var handlerList = events[type];
	  if (!handlerList) {
	    return;
	  }
	  handlerList.$remove(handler);
	}
	
	var LIFE_CYCLE_TYPES = ['init', 'created', 'ready'];
	
	function _initEvents(externalEvents) {
	  var _this2 = this;
	
	  var options = this._options || {};
	  var events = options.events || {};
	  for (var type1 in events) {
	    this.$on(type1, events[type1]);
	  }
	  for (var type2 in externalEvents) {
	    this.$on(type2, externalEvents[type2]);
	  }
	  LIFE_CYCLE_TYPES.forEach(function (type) {
	    _this2.$on('hook:' + type, options[type]);
	  });
	}

/***/ },
/* 62 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.clearModules = clearModules;
	exports.getModule = getModule;
	exports.requireModule = requireModule;
	exports.registerModules = registerModules;
	exports.registerMethods = registerMethods;
	exports.requireComponent = requireComponent;
	exports.registerComponent = registerComponent;
	var nativeModules = {};
	
	function assignModules(modules, ifReplace) {
	  var _loop = function _loop(moduleName) {
	    // init `modules[moduleName][]`
	    var methods = nativeModules[moduleName];
	    if (!methods) {
	      methods = {};
	      nativeModules[moduleName] = methods;
	    }
	
	    // push each non-existed new method
	    modules[moduleName].forEach(function (method) {
	      if (typeof method === 'string') {
	        method = {
	          name: method
	        };
	      }
	
	      if (!methods[method.name] || ifReplace) {
	        methods[method.name] = method;
	      }
	    });
	  };
	
	  for (var moduleName in modules) {
	    _loop(moduleName);
	  }
	}
	
	function assignApis(Ctor, apis) {
	  var p = Ctor.prototype;
	
	  for (var apiName in apis) {
	    if (!p.hasOwnProperty(apiName)) {
	      p[apiName] = apis[apiName];
	    }
	  }
	}
	
	function clearModules() {
	  nativeModules = {};
	}
	
	function getModule(moduleName) {
	  return nativeModules[moduleName];
	}
	
	/**
	 * @context a instance of AppInstance
	 */
	function requireModule(moduleName) {
	  var _this = this;
	
	  var methods = nativeModules[moduleName];
	  var target = {};
	
	  var _loop2 = function _loop2(methodName) {
	    target[methodName] = function () {
	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }
	
	      return _this.callTasks({
	        module: moduleName,
	        method: methodName,
	        args: args
	      });
	    };
	  };
	
	  for (var methodName in methods) {
	    _loop2(methodName);
	  }
	
	  return target;
	}
	
	/**
	 * @context Vm
	 */
	function registerModules(modules, ifReplace) {
	  assignModules(modules, ifReplace);
	}
	
	/**
	 * @context Vm
	 */
	function registerMethods(apis) {
	  assignApis(this, apis);
	}
	
	/**
	 * @context a instance of AppInstance
	 */
	function requireComponent(name) {
	  var customComponentMap = this.customComponentMap;
	
	  return customComponentMap[name];
	}
	
	/**
	 * @context a instance of AppInstance
	 */
	function registerComponent(name, exports) {
	  var customComponentMap = this.customComponentMap;
	
	
	  if (customComponentMap[name]) {
	    throw new Error('define a component(' + name + ') that already exists');
	  }
	
	  customComponentMap[name] = exports;
	}

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.normalizeVersion = normalizeVersion;
	exports.getError = getError;
	exports.check = check;
	
	var _semver = __webpack_require__(50);
	
	var _semver2 = _interopRequireDefault(_semver);
	
	var _util = __webpack_require__(48);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * [normalizeVersion description]
	 * @param  {String} Version. ie: 1, 1.0, 1.0.0
	 * @return {String} Version
	 */
	function normalizeVersion(v) {
	  var isValid = _semver2.default.valid(v);
	  if (isValid) {
	    return v;
	  }
	
	  v = typeof v === 'string' ? v : '';
	  var split = v.split('.');
	  var i = 0;
	  var result = [];
	
	  while (i < 3) {
	    var s = typeof split[i] === 'string' && split[i] ? split[i] : '0';
	    result.push(s);
	    i++;
	  }
	
	  return result.join('.');
	}
	
	function getError(key, val, criteria) {
	  var result = {
	    isDowngrade: true,
	    errorType: 1,
	    code: 1000
	  };
	  var getMsg = function getMsg(key, val, criteria) {
	    return 'Downgrade[' + key + '] :: deviceInfo ' + val + ' matched criteria ' + criteria;
	  };
	  var _key = key.toLowerCase();
	
	  result.errorMessage = getMsg(key, val, criteria);
	
	  if (_key.indexOf('osversion') >= 0) {
	    result.code = 1001;
	  } else if (_key.indexOf('appversion') >= 0) {
	    result.code = 1002;
	  } else if (_key.indexOf('weexversion') >= 0) {
	    result.code = 1003;
	  } else if (_key.indexOf('devicemodel') >= 0) {
	    result.code = 1004;
	  }
	
	  return result;
	}
	
	/**
	 * WEEX framework input(deviceInfo)
	 * {
	 *   platform: 'iOS' or 'android'
	 *   osVersion: '1.0.0' or '1.0' or '1'
	 *   appVersion: '1.0.0' or '1.0' or '1'
	 *   weexVersion: '1.0.0' or '1.0' or '1'
	 *   dDeviceModel: 'MODEL_NAME'
	 * }
	 *
	 * downgrade config(config)
	 * {
	 *   ios: {
	 *     osVersion: '>1.0.0' or '>=1.0.0' or '<1.0.0' or '<=1.0.0' or '1.0.0'
	 *     appVersion: '>1.0.0' or '>=1.0.0' or '<1.0.0' or '<=1.0.0' or '1.0.0'
	 *     weexVersion: '>1.0.0' or '>=1.0.0' or '<1.0.0' or '<=1.0.0' or '1.0.0'
	 *     deviceModel: ['modelA', 'modelB', ...]
	 *   },
	 *   android: {
	 *     osVersion: '>1.0.0' or '>=1.0.0' or '<1.0.0' or '<=1.0.0' or '1.0.0'
	 *     appVersion: '>1.0.0' or '>=1.0.0' or '<1.0.0' or '<=1.0.0' or '1.0.0'
	 *     weexVersion: '>1.0.0' or '>=1.0.0' or '<1.0.0' or '<=1.0.0' or '1.0.0'
	 *     deviceModel: ['modelA', 'modelB', ...]
	 *   }
	 * }
	 *
	 *
	 * @param  {object} deviceInfo Weex SDK framework input
	 * @param  {object} config     user input
	 * @return {Object}            { isDowngrade: true/false, errorMessage... }
	 */
	function check(config, deviceInfo) {
	  deviceInfo = deviceInfo || global.WXEnvironment;
	  deviceInfo = (0, _util.isPlainObject)(deviceInfo) ? deviceInfo : {};
	
	  var result = {
	    isDowngrade: false // defautl is pass
	  };
	
	  if ((0, _util.typof)(config) === 'function') {
	    var customDowngrade = config.call(this, deviceInfo, {
	      semver: _semver2.default,
	      normalizeVersion: this.normalizeVersion
	    });
	
	    customDowngrade = !!customDowngrade;
	
	    result = customDowngrade ? this.getError('custom', '', 'custom params') : result;
	  } else {
	    config = (0, _util.isPlainObject)(config) ? config : {};
	
	    var platform = deviceInfo.platform || 'unknow';
	    var dPlatform = platform.toLowerCase();
	    var cObj = config[dPlatform] || {};
	
	    for (var i in deviceInfo) {
	      var key = i;
	      var keyLower = key.toLowerCase();
	      var val = deviceInfo[i];
	      var isVersion = keyLower.indexOf('version') >= 0;
	      var isDeviceModel = keyLower.indexOf('devicemodel') >= 0;
	      var criteria = cObj[i];
	
	      if (criteria && isVersion) {
	        var c = this.normalizeVersion(criteria);
	        var d = this.normalizeVersion(deviceInfo[i]);
	
	        if (_semver2.default.satisfies(d, c)) {
	          result = this.getError(key, val, criteria);
	          break;
	        }
	      } else if (isDeviceModel) {
	        var _criteria = (0, _util.typof)(criteria) === 'array' ? criteria : [criteria];
	        if (_criteria.indexOf(val) >= 0) {
	          result = this.getError(key, val, criteria);
	          break;
	        }
	      }
	    }
	  }
	
	  return result;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.updateActions = updateActions;
	exports.init = init;
	exports.destroy = destroy;
	exports.getRootElement = getRootElement;
	exports.fireEvent = fireEvent;
	exports.callback = callback;
	exports.refreshData = refreshData;
	
	var _util = __webpack_require__(48);
	
	var _ = _interopRequireWildcard(_util);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /**
	                                                                                                                                                                                                     * @fileOverview
	                                                                                                                                                                                                     * instance controls from native
	                                                                                                                                                                                                     *
	                                                                                                                                                                                                     * - init bundle
	                                                                                                                                                                                                     * - fire event
	                                                                                                                                                                                                     * - callback
	                                                                                                                                                                                                     * - destroy
	                                                                                                                                                                                                     *
	                                                                                                                                                                                                     * corresponded with the API of instance manager (framework.js)
	                                                                                                                                                                                                     */
	
	function updateActions() {
	  this.differ.flush();
	  var tasks = [];
	  if (this.doc && this.doc.listener && this.doc.listener.updates.length) {
	    tasks.push.apply(tasks, _toConsumableArray(this.doc.listener.updates));
	    this.doc.listener.updates = [];
	  }
	  if (tasks.length) {
	    return this.callTasks(tasks);
	  }
	}
	
	function init(code, data) {
	  var _this = this;
	
	  _.debug('Intialize an instance with:\n', code, data);
	
	  var result = void 0;
	  // @see: lib/app/bundle.js
	  var define = _.bind(this.define, this);
	  var bootstrap = function bootstrap(name, config, _data) {
	    result = _this.bootstrap(name, config, _data || data);
	    _this.updateActions();
	    _this.doc.listener.createFinish();
	    _.debug('After intialized an instance(' + _this.id + ')');
	  };
	
	  // backward(register/render)
	  var register = _.bind(this.register, this);
	  var render = function render(name, _data) {
	    result = _this.bootstrap(name, {}, _data);
	  };
	
	  var require = function require(name) {
	    return function (_data) {
	      result = _this.bootstrap(name, {}, _data);
	    };
	  };
	
	  var document = this.doc;
	
	  var functionBody = void 0;
	  /* istanbul ignore if */
	  if (typeof code === 'function') {
	    // `function () {...}` -> `{...}`
	    // not very strict
	    functionBody = code.toString().substr(12);
	  } else if (code) {
	    functionBody = code.toString();
	  }
	
	  var _global = global;
	  var WXEnvironment = _global.WXEnvironment;
	
	  if (WXEnvironment && WXEnvironment.platform !== 'Web') {
	    (function () {
	      var timer = _this.requireModule('timer');
	      var timerAPIs = {
	        setTimeout: function setTimeout() {
	          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	          }
	
	          var handler = function handler() {
	            args[0].apply(args, _toConsumableArray(args.slice(2)));
	          };
	          timer.setTimeout(handler, args[1]);
	          return _this.uid.toString();
	        },
	        setInterval: function setInterval() {
	          for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	            args[_key2] = arguments[_key2];
	          }
	
	          var handler = function handler() {
	            args[0].apply(args, _toConsumableArray(args.slice(2)));
	          };
	          timer.setInterval(handler, args[1]);
	          return _this.uid.toString();
	        },
	        clearTimeout: function clearTimeout(n) {
	          timer.clearTimeout(n);
	        },
	        clearInterval: function clearInterval(n) {
	          timer.clearInterval(n);
	        }
	      };
	
	      var fn = new Function('define', 'require', 'document', 'bootstrap', 'register', 'render', '__weex_define__', // alias for define
	      '__weex_bootstrap__', // alias for bootstrap
	      'setTimeout', 'setInterval', 'clearTimeout', 'clearInterval', functionBody);
	
	      fn(define, require, document, bootstrap, register, render, define, bootstrap, timerAPIs.setTimeout, timerAPIs.setInterval, timerAPIs.clearTimeout, timerAPIs.clearInterval);
	    })();
	  } else {
	    var _fn = new Function('define', 'require', 'document', 'bootstrap', 'register', 'render', '__weex_define__', // alias for define
	    '__weex_bootstrap__', // alias for bootstrap
	    functionBody);
	
	    _fn(define, require, document, bootstrap, register, render, define, bootstrap);
	  }
	
	  return result;
	}
	
	function destroy() {
	  _.debug('Destory an instance(' + this.id + ')');
	
	  this.id = '';
	  this.options = null;
	  this.blocks = null;
	  this.vm = null;
	  this.doc = null;
	  this.customComponentMap = null;
	  this.callbacks = null;
	}
	
	function getRootElement() {
	  var doc = this.doc || {};
	  var body = doc.body || {};
	  return body.toJSON ? body.toJSON() : {};
	}
	
	function fireEvent(ref, type, e, domChanges) {
	  var _this2 = this;
	
	  _.debug('Fire a "' + type + '" event on an element(' + ref + ') in instance(' + this.id + ')');
	  if (Array.isArray(ref)) {
	    ref.some(function (ref) {
	      return _this2.fireEvent(ref, type, e) !== false;
	    });
	    return;
	  }
	
	  var el = this.doc.getRef(ref);
	
	  if (el) {
	    this.doc.close();
	    var result = this.doc.fireEvent(el, type, e, domChanges);
	    this.updateActions();
	    this.doc.listener.updateFinish();
	    this.doc.open();
	    return result;
	  }
	
	  return new Error('invalid element reference "' + ref + '"');
	}
	
	function callback(callbackId, data, ifKeepAlive) {
	  _.debug('Invoke a callback(' + callbackId + ') with', data, 'in instance(' + this.id + ')');
	
	  var callback = this.callbacks[callbackId];
	
	  if (typeof callback === 'function') {
	    this.doc.close();
	    callback(data); // data is already a object, @see: lib/runtime/index.js
	
	    if (typeof ifKeepAlive === 'undefined' || ifKeepAlive === false) {
	      this.callbacks[callbackId] = undefined;
	    }
	
	    this.updateActions();
	    this.doc.listener.updateFinish();
	    this.doc.open();
	    return;
	  }
	
	  return new Error('invalid callback id "' + callbackId + '"');
	}
	
	function refreshData(data) {
	  _.debug('Refresh with', data, 'in instance[' + this.id + ']');
	
	  var vm = this.vm;
	
	  if (vm && data) {
	    this.doc.close();
	    if (typeof vm.refreshData === 'function') {
	      vm.refreshData(data);
	    } else {
	      _.extend(vm, data);
	    }
	    this.updateActions();
	    this.doc.listener.refreshFinish();
	    this.doc.open();
	    return;
	  }
	
	  return new Error('invalid data "' + data + '"');
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 65 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Differ = function () {
	  function Differ(id) {
	    _classCallCheck(this, Differ);
	
	    this.id = id;
	    this.map = [];
	    this.hooks = [];
	  }
	
	  _createClass(Differ, [{
	    key: 'isEmpty',
	    value: function isEmpty() {
	      return this.map.length === 0;
	    }
	  }, {
	    key: 'append',
	    value: function append(type, depth, ref, handler) {
	      var _this = this;
	
	      if (!this.hasTimer) {
	        this.hasTimer = true;
	        setTimeout(function () {
	          _this.hasTimer = false;
	          _this.flush(true);
	        }, 0);
	      }
	      var map = this.map;
	      if (!map[depth]) {
	        map[depth] = {};
	      }
	      var group = map[depth];
	      if (!group[type]) {
	        group[type] = {};
	      }
	      if (type === 'element') {
	        if (!group[type][ref]) {
	          group[type][ref] = [];
	        }
	        group[type][ref].push(handler);
	      } else {
	        group[type][ref] = handler;
	      }
	    }
	  }, {
	    key: 'flush',
	    value: function flush(isTimeout) {
	      var map = this.map.slice();
	      this.map.length = 0;
	      map.forEach(function (group) {
	        callTypeMap(group, 'repeat');
	        callTypeMap(group, 'shown');
	        callTypeList(group, 'element');
	      });
	
	      var hooks = this.hooks.slice();
	      this.hooks.length = 0;
	      hooks.forEach(function (fn) {
	        fn();
	      });
	
	      if (!this.isEmpty()) {
	        this.flush();
	      }
	    }
	  }, {
	    key: 'then',
	    value: function then(fn) {
	      this.hooks.push(fn);
	    }
	  }]);
	
	  return Differ;
	}();
	
	exports.default = Differ;
	
	
	function callTypeMap(group, type) {
	  var map = group[type];
	  for (var ref in map) {
	    map[ref]();
	  }
	}
	
	function callTypeList(group, type) {
	  var map = group[type];
	  for (var ref in map) {
	    var list = map[ref];
	    list.forEach(function (handler) {
	      handler();
	    });
	  }
	}

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.instanceMap = undefined;
	exports.Document = Document;
	exports.Node = Node;
	exports.Element = Element;
	exports.Comment = Comment;
	
	var _listener4 = __webpack_require__(67);
	
	var _listener5 = _interopRequireDefault(_listener4);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var DEFAULT_TAG_NAME = 'div'; /**
	                               * @fileOverview
	                               * A simple virtual dom implementation
	                               */
	
	var instanceMap = exports.instanceMap = {};
	var nextNodeRef = 1;
	
	function Document(id, url, handler) {
	  id = id ? id.toString() : '';
	  this.id = id;
	  this.URL = url;
	
	  instanceMap[id] = this;
	  this.nodeMap = {};
	  this.listener = new _listener5.default(id, handler || genCallTasks(id));
	  this.createDocumentElement();
	}
	
	function genCallTasks(id) {
	  return function (tasks) {
	    if (!Array.isArray(tasks)) {
	      tasks = [tasks];
	    }
	    return callNative(id, tasks, '-1');
	  };
	}
	
	Document.prototype.destroy = function () {
	  delete this.listener;
	  delete this.nodeMap;
	  delete instanceMap[this.id];
	};
	
	Document.prototype.open = function () {
	  this.listener.batched = false;
	};
	
	Document.prototype.close = function () {
	  this.listener.batched = true;
	};
	
	Document.prototype.createDocumentElement = function () {
	  var _this = this;
	
	  if (!this.documentElement) {
	    var el = new Element('document');
	    el.docId = this.id;
	    el.ownerDocument = this;
	    el.role = 'documentElement';
	    el.depth = 0;
	    el.ref = '_documentElement';
	    this.nodeMap._documentElement = el;
	    this.documentElement = el;
	    el.appendChild = function (node) {
	      appendBody(_this, node);
	    };
	    el.insertBefore = function (node, before) {
	      appendBody(_this, node, before);
	    };
	  }
	
	  return this.documentElement;
	};
	
	function appendBody(doc, node, before) {
	  var documentElement = doc.documentElement;
	
	
	  if (documentElement.pureChildren.length > 0 || node.parentNode) {
	    return;
	  }
	  var children = documentElement.children;
	  var beforeIndex = children.indexOf(before);
	  if (beforeIndex < 0) {
	    children.push(node);
	  } else {
	    children.splice(beforeIndex, 0, node);
	  }
	
	  if (node.nodeType === 1) {
	    if (node.role === 'body') {
	      node.docId = doc.id;
	      node.ownerDocument = doc;
	      node.parentNode = documentElement;
	    } else {
	      node.children.forEach(function (child) {
	        child.parentNode = node;
	      });
	      setBody(doc, node);
	      node.docId = doc.id;
	      node.ownerDocument = doc;
	      linkParent(node, documentElement);
	      delete doc.nodeMap[node.nodeId];
	    }
	    documentElement.pureChildren.push(node);
	    doc.listener.createBody(node);
	  } else {
	    node.parentNode = documentElement;
	    doc.nodeMap[node.ref] = node;
	  }
	}
	
	function setBody(doc, el) {
	  el.role = 'body';
	  el.depth = 1;
	  delete doc.nodeMap[el.nodeId];
	  el.ref = '_root';
	  doc.nodeMap._root = el;
	  doc.body = el;
	}
	
	Document.prototype.createBody = function (type, props) {
	  if (!this.body) {
	    var el = new Element(type, props);
	    setBody(this, el);
	  }
	
	  return this.body;
	};
	
	Document.prototype.createElement = function (tagName, props) {
	  return new Element(tagName, props);
	};
	
	Document.prototype.createComment = function (text) {
	  return new Comment(text);
	};
	
	Document.prototype.fireEvent = function (el, type, e, domChanges) {
	  if (!el) {
	    return;
	  }
	  e = e || {};
	  e.type = type;
	  e.target = el;
	  e.timestamp = Date.now();
	  if (domChanges) {
	    updateElement(el, domChanges);
	  }
	  return el.fireEvent(type, e);
	};
	
	Document.prototype.getRef = function (ref) {
	  return this.nodeMap[ref];
	};
	
	function updateElement(el, changes) {
	  var attrs = changes.attrs || {};
	  for (var name in attrs) {
	    el.setAttr(name, attrs[name], true);
	  }
	  var style = changes.style || {};
	  for (var _name in style) {
	    el.setStyle(_name, style[_name], true);
	  }
	}
	
	function Node() {
	  this.nodeId = (nextNodeRef++).toString();
	  this.ref = this.nodeId;
	  this.children = [];
	  this.pureChildren = [];
	  this.parentNode = null;
	  this.nextSibling = null;
	  this.previousSibling = null;
	}
	
	Node.prototype.destroy = function () {
	  var doc = instanceMap[this.docId];
	  if (doc) {
	    delete this.docId;
	    delete doc.nodeMap[this.nodeId];
	  }
	  this.children.forEach(function (child) {
	    child.destroy();
	  });
	};
	
	function Element() {
	  var type = arguments.length <= 0 || arguments[0] === undefined ? DEFAULT_TAG_NAME : arguments[0];
	  var props = arguments[1];
	
	  props = props || {};
	  this.nodeType = 1;
	  this.nodeId = (nextNodeRef++).toString();
	  this.ref = this.nodeId;
	  this.type = type;
	  this.attr = props.attr || {};
	  this.classStyle = props.classStyle || {};
	  this.style = props.style || {};
	  this.event = {};
	  this.children = [];
	  this.pureChildren = [];
	}
	
	Element.prototype = new Node();
	
	Element.prototype.appendChild = function (node) {
	  if (node.parentNode && node.parentNode !== this) {
	    return;
	  }
	  if (!node.parentNode) {
	    linkParent(node, this);
	    insertIndex(node, this.children, this.children.length, true);
	    if (this.docId) {
	      registerNode(this.docId, node);
	    }
	    if (node.nodeType === 1) {
	      insertIndex(node, this.pureChildren, this.pureChildren.length);
	      if (this.docId) {
	        var listener = instanceMap[this.docId].listener;
	        return listener.addElement(node, this.ref, -1);
	      }
	    }
	  } else {
	    moveIndex(node, this.children, this.children.length, true);
	    if (node.nodeType === 1) {
	      var index = moveIndex(node, this.pureChildren, this.pureChildren.length);
	      if (this.docId && index >= 0) {
	        var _listener = instanceMap[this.docId].listener;
	        return _listener.moveElement(node.ref, this.ref, index);
	      }
	    }
	  }
	};
	
	Element.prototype.insertBefore = function (node, before) {
	  if (node.parentNode && node.parentNode !== this) {
	    return;
	  }
	  if (node === before || node.nextSibling === before) {
	    return;
	  }
	  if (!node.parentNode) {
	    linkParent(node, this);
	    insertIndex(node, this.children, this.children.indexOf(before), true);
	    if (this.docId) {
	      registerNode(this.docId, node);
	    }
	    if (node.nodeType === 1) {
	      var pureBefore = nextElement(before);
	      var index = insertIndex(node, this.pureChildren, pureBefore ? this.pureChildren.indexOf(pureBefore) : this.pureChildren.length);
	      if (this.docId) {
	        var listener = instanceMap[this.docId].listener;
	        return listener.addElement(node, this.ref, index);
	      }
	    }
	  } else {
	    moveIndex(node, this.children, this.children.indexOf(before), true);
	    if (node.nodeType === 1) {
	      var _pureBefore = nextElement(before);
	      var _index = moveIndex(node, this.pureChildren, _pureBefore ? this.pureChildren.indexOf(_pureBefore) : this.pureChildren.length);
	      if (this.docId && _index >= 0) {
	        var _listener2 = instanceMap[this.docId].listener;
	        return _listener2.moveElement(node.ref, this.ref, _index);
	      }
	    }
	  }
	};
	
	Element.prototype.insertAfter = function (node, after) {
	  if (node.parentNode && node.parentNode !== this) {
	    return;
	  }
	  if (node === after || node.previousSibling === after) {
	    return;
	  }
	  if (!node.parentNode) {
	    linkParent(node, this);
	    insertIndex(node, this.children, this.children.indexOf(after) + 1, true);
	    if (this.docId) {
	      registerNode(this.docId, node);
	    }
	    if (node.nodeType === 1) {
	      var index = insertIndex(node, this.pureChildren, this.pureChildren.indexOf(previousElement(after)) + 1);
	      if (this.docId) {
	        var listener = instanceMap[this.docId].listener;
	        return listener.addElement(node, this.ref, index);
	      }
	    }
	  } else {
	    moveIndex(node, this.children, this.children.indexOf(after) + 1, true);
	    if (node.nodeType === 1) {
	      var _index2 = moveIndex(node, this.pureChildren, this.pureChildren.indexOf(previousElement(after)) + 1);
	      if (this.docId && _index2 >= 0) {
	        var _listener3 = instanceMap[this.docId].listener;
	        return _listener3.moveElement(node.ref, this.ref, _index2);
	      }
	    }
	  }
	};
	
	Element.prototype.removeChild = function (node, preserved) {
	  if (node.parentNode) {
	    removeIndex(node, this.children, true);
	    if (node.nodeType === 1) {
	      removeIndex(node, this.pureChildren);
	      if (this.docId) {
	        var listener = instanceMap[this.docId].listener;
	        listener.removeElement(node.ref);
	      }
	    }
	  }
	  if (!preserved) {
	    node.destroy();
	  }
	};
	
	Element.prototype.clear = function () {
	  var _this2 = this;
	
	  if (this.docId) {
	    (function () {
	      var listener = instanceMap[_this2.docId].listener;
	      _this2.pureChildren.forEach(function (node) {
	        listener.removeElement(node.ref);
	      });
	    })();
	  }
	  this.children.forEach(function (node) {
	    node.destroy();
	  });
	  this.children.length = 0;
	  this.pureChildren.length = 0;
	};
	
	function nextElement(node) {
	  while (node) {
	    if (node.nodeType === 1) {
	      return node;
	    }
	    node = node.nextSibling;
	  }
	}
	
	function previousElement(node) {
	  while (node) {
	    if (node.nodeType === 1) {
	      return node;
	    }
	    node = node.previousSibling;
	  }
	}
	
	function linkParent(node, parent) {
	  node.parentNode = parent;
	  if (parent.docId) {
	    node.docId = parent.docId;
	    node.ownerDocument = parent.ownerDocument;
	    node.ownerDocument.nodeMap[node.nodeId] = node;
	    node.depth = parent.depth + 1;
	  }
	  node.children.forEach(function (child) {
	    linkParent(child, node);
	  });
	}
	
	function registerNode(docId, node) {
	  var doc = instanceMap[docId];
	  doc.nodeMap[node.nodeId] = node;
	}
	
	function insertIndex(target, list, newIndex, changeSibling) {
	  if (newIndex < 0) {
	    newIndex = 0;
	  }
	  var before = list[newIndex - 1];
	  var after = list[newIndex];
	  list.splice(newIndex, 0, target);
	  if (changeSibling) {
	    before && (before.nextSibling = target);
	    target.previousSibling = before;
	    target.nextSibling = after;
	    after && (after.previousSibling = target);
	  }
	  return newIndex;
	}
	
	function moveIndex(target, list, newIndex, changeSibling) {
	  var index = list.indexOf(target);
	  if (index < 0) {
	    return -1;
	  }
	  if (changeSibling) {
	    var before = list[index - 1];
	    var after = list[index + 1];
	    before && (before.nextSibling = after);
	    after && (after.previousSibling = before);
	  }
	  list.splice(index, 1);
	  var newIndexAfter = newIndex;
	  if (index <= newIndex) {
	    newIndexAfter = newIndex - 1;
	  }
	  var beforeNew = list[newIndexAfter - 1];
	  var afterNew = list[newIndexAfter];
	  list.splice(newIndexAfter, 0, target);
	  if (changeSibling) {
	    beforeNew && (beforeNew.nextSibling = target);
	    target.previousSibling = beforeNew;
	    target.nextSibling = afterNew;
	    afterNew && (afterNew.previousSibling = target);
	  }
	  if (index === newIndexAfter) {
	    return -1;
	  }
	  return newIndex;
	}
	
	function removeIndex(target, list, changeSibling) {
	  var index = list.indexOf(target);
	  if (index < 0) {
	    return;
	  }
	  if (changeSibling) {
	    var before = list[index - 1];
	    var after = list[index + 1];
	    before && (before.nextSibling = after);
	    after && (after.previousSibling = before);
	  }
	  list.splice(index, 1);
	}
	
	Element.prototype.setAttr = function (key, value, silent) {
	  if (this.attr[key] === value) {
	    return;
	  }
	  this.attr[key] = value;
	  if (!silent && this.docId) {
	    var listener = instanceMap[this.docId].listener;
	    listener.setAttr(this.ref, key, value);
	  }
	};
	
	Element.prototype.setStyle = function (key, value, silent) {
	  if (this.style[key] === value) {
	    return;
	  }
	  this.style[key] = value;
	  if (!silent && this.docId) {
	    var listener = instanceMap[this.docId].listener;
	    listener.setStyle(this.ref, key, value);
	  }
	};
	
	Element.prototype.setClassStyle = function (classStyle) {
	  this.classStyle = classStyle;
	  if (this.docId) {
	    var listener = instanceMap[this.docId].listener;
	    listener.setStyles(this.ref, this.toStyle());
	  }
	};
	
	Element.prototype.addEvent = function (type, handler) {
	  if (!this.event[type]) {
	    this.event[type] = handler;
	    if (this.docId) {
	      var listener = instanceMap[this.docId].listener;
	      listener.addEvent(this.ref, type);
	    }
	  }
	};
	
	Element.prototype.removeEvent = function (type) {
	  if (this.event[type]) {
	    delete this.event[type];
	    if (this.docId) {
	      var listener = instanceMap[this.docId].listener;
	      listener.removeEvent(this.ref, type);
	    }
	  }
	};
	
	Element.prototype.fireEvent = function (type, e) {
	  var handler = this.event[type];
	  if (handler) {
	    return handler.call(this, e);
	  }
	};
	
	Element.prototype.toStyle = function () {
	  return Object.assign({}, this.classStyle, this.style);
	};
	
	Element.prototype.toJSON = function () {
	  var result = {
	    ref: this.ref.toString(),
	    type: this.type,
	    attr: this.attr,
	    style: this.toStyle()
	  };
	  var event = Object.keys(this.event);
	  if (event.length) {
	    result.event = event;
	  }
	  if (this.pureChildren.length) {
	    result.children = this.pureChildren.map(function (child) {
	      return child.toJSON();
	    });
	  }
	  return result;
	};
	
	Element.prototype.toString = function () {
	  return '<' + this.type + ' attr=' + JSON.stringify(this.attr) + ' style=' + JSON.stringify(this.toStyle()) + '>' + this.pureChildren.map(function (child) {
	    return child.toString();
	  }).join('') + '</' + this.type + '>';
	};
	
	function Comment(value) {
	  this.nodeType = 8;
	  this.nodeId = (nextNodeRef++).toString();
	  this.ref = this.nodeId;
	  this.type = 'comment';
	  this.value = value;
	  this.children = [];
	  this.pureChildren = [];
	}
	
	Comment.prototype = new Node();
	
	Comment.prototype.toString = function () {
	  return '<!-- ' + this.value + ' -->';
	};

/***/ },
/* 67 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Listener;
	exports.createAction = createAction;
	function Listener(id, handler) {
	  this.id = id;
	  this.batched = false;
	  this.updates = [];
	  if (typeof handler === 'function') {
	    this.handler = handler;
	  }
	}
	
	Listener.prototype.createFinish = function (callback) {
	  var handler = this.handler;
	  return handler([createAction('createFinish', [])], callback);
	};
	
	Listener.prototype.updateFinish = function (callback) {
	  var handler = this.handler;
	  return handler([createAction('updateFinish', [])], callback);
	};
	
	Listener.prototype.refreshFinish = function (callback) {
	  var handler = this.handler;
	  return handler([createAction('refreshFinish', [])], callback);
	};
	
	Listener.prototype.createBody = function (element) {
	  var body = element.toJSON();
	  var children = body.children;
	  delete body.children;
	  var actions = [createAction('createBody', [body])];
	  if (children) {
	    actions.push.apply(actions, children.map(function (child) {
	      return createAction('addElement', [body.ref, child, -1]);
	    }));
	  }
	  return this.addActions(actions);
	};
	
	Listener.prototype.addElement = function (element, ref, index) {
	  if (!(index >= 0)) {
	    index = -1;
	  }
	  return this.addActions(createAction('addElement', [ref, element.toJSON(), index]));
	};
	
	Listener.prototype.removeElement = function (ref) {
	  if (Array.isArray(ref)) {
	    var actions = ref.map(function (r) {
	      return createAction('removeElement', [r]);
	    });
	    return this.addActions(actions);
	  }
	  return this.addActions(createAction('removeElement', [ref]));
	};
	
	Listener.prototype.moveElement = function (targetRef, parentRef, index) {
	  return this.addActions(createAction('moveElement', [targetRef, parentRef, index]));
	};
	
	Listener.prototype.setAttr = function (ref, key, value) {
	  var result = {};
	  result[key] = value;
	  return this.addActions(createAction('updateAttrs', [ref, result]));
	};
	
	Listener.prototype.setStyle = function (ref, key, value) {
	  var result = {};
	  result[key] = value;
	  return this.addActions(createAction('updateStyle', [ref, result]));
	};
	
	Listener.prototype.setStyles = function (ref, style) {
	  return this.addActions(createAction('updateStyle', [ref, style]));
	};
	
	Listener.prototype.addEvent = function (ref, type) {
	  return this.addActions(createAction('addEvent', [ref, type]));
	};
	
	Listener.prototype.removeEvent = function (ref, type) {
	  return this.addActions(createAction('removeEvent', [ref, type]));
	};
	
	Listener.prototype.handler = function (actions, cb) {
	  return cb && cb();
	};
	
	Listener.prototype.addActions = function (actions) {
	  var updates = this.updates;
	  var handler = this.handler;
	
	  if (!Array.isArray(actions)) {
	    actions = [actions];
	  }
	
	  if (this.batched) {
	    updates.push.apply(updates, actions);
	  } else {
	    return handler(actions);
	  }
	};
	
	function createAction(name, args) {
	  return { module: 'dom', method: name, args: args };
	}

/***/ },
/* 68 */
/***/ function(module, exports) {

	module.exports = {
		"name": "weex",
		"version": "0.4.0",
		"description": "A framework for building Mobile cross-platform UI",
		"license": "Apache-2.0",
		"repository": {
			"type": "git",
			"url": "git@github.com:alibaba/weex.git"
		},
		"homepage": "http://alibaba.github.io/weex/",
		"bugs": {
			"url": "https://github.com/alibaba/weex/issues"
		},
		"private": "true",
		"keywords": [
			"weex",
			"hybrid",
			"webcomponent",
			"appframework",
			"mvvm",
			"javascript",
			"webkit",
			"v8",
			"jscore",
			"html5",
			"android",
			"ios",
			"yunos"
		],
		"engines": {
			"node": ">=4"
		},
		"scripts": {
			"postinstall": "bash ./bin/install-hooks.sh",
			"build:browser": "webpack --config build/webpack.browser.config.js",
			"build:native": "webpack --config build/webpack.native.config.js",
			"build:examples": "webpack --config build/webpack.examples.config.js",
			"build:test": "webpack --config build/webpack.test.config.js",
			"dist:browser": "npm run build:browser && bash ./bin/dist-browser.sh",
			"dist": "npm run dist:browser",
			"dev:browser": "webpack --watch --config build/webpack.browser.config.js",
			"dev:native": "webpack --watch --config build/webpack.native.config.js",
			"dev:examples": "webpack --watch --config build/webpack.examples.config.js",
			"dev:test": "webpack --watch --config build/webpack.test.config.js",
			"build": "npm run build:native && npm run build:browser && npm run build:examples && npm run build:test",
			"lint": "eslint html5",
			"test:unit": "mocha --compilers js:babel-core/register html5/test/unit/*/*.js html5/test/unit/*/*/*.js",
			"test:cover": "babel-node node_modules/isparta/bin/isparta cover --report text node_modules/mocha/bin/_mocha -- --reporter dot html5/test/unit/*/*.js html5/test/unit/*/*/*.js",
			"test:e2e": "node html5/test/e2e/runner.js",
			"test": "npm run lint && npm run test:cover && npm run test:e2e",
			"serve": "serve ./ -p 12580",
			"clean:examples": "echo \"\\033[36;1m[Clean]\\033[0m \\033[33mexamples\\033[0m\" && rm -vrf examples/build/*",
			"clean:test": "echo \"\\033[36;1m[Clean]\\033[0m \\033[33mtest\\033[0m\" && rm -vrf test/build/*",
			"clean": "npm run clean:examples && npm run clean:test",
			"copy:js": "cp -vf ./dist/native.js ./android/sdk/assets/main.js",
			"copy:examples": "rm -rf ./android/playground/app/src/main/assets/* && cp -vrf ./examples/build/* ./android/playground/app/src/main/assets/",
			"copy": "npm run copy:js && npm run copy:examples"
		},
		"subversion": {
			"browser": "0.2.23",
			"framework": "0.10.13",
			"transformer": ">=0.1.5 <0.4"
		},
		"dependencies": {
			"animationjs": "^0.1.5",
			"carrousel": "^0.1.11",
			"core-js": "^2.4.0",
			"cubicbezier": "^0.1.1",
			"envd": "^0.1.1",
			"fixedsticky": "^0.1.0",
			"httpurl": "^0.1.1",
			"kountdown": "^0.1.2",
			"lazyimg": "^0.1.2",
			"lie": "^3.0.4",
			"modals": "^0.1.5",
			"scroll-to": "0.0.2",
			"semver": "^5.1.0",
			"transitionize": "0.0.3",
			"weex-components": "^0.1.3"
		},
		"devDependencies": {
			"babel-cli": "~6.4.5",
			"babel-loader": "^6.2.4",
			"babel-preset-es2015": "^6.9.0",
			"chai": "^3.5.0",
			"chromedriver": "^2.21.2",
			"cross-spawn": "^4.0.0",
			"css-loader": "^0.23.1",
			"eslint": "^2.11.1",
			"http-server": "^0.9.0",
			"isparta": "^4.0.0",
			"istanbul": "^0.4.3",
			"json-loader": "^0.5.4",
			"mocha": "^2.5.3",
			"nightwatch": "^0.9.4",
			"phantomjs-prebuilt": "^2.1.7",
			"selenium-server": "^2.53.0",
			"serve": "^1.4.0",
			"sinon": "^1.17.4",
			"sinon-chai": "^2.8.0",
			"style-loader": "^0.13.1",
			"uglify-js": "^2.6.4",
			"webpack": "^1.13.1",
			"weex-loader": "^0.2.0"
		}
	};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.$ = $;
	exports.$el = $el;
	exports.$vm = $vm;
	exports.$renderThen = $renderThen;
	exports.$scrollTo = $scrollTo;
	exports.$transition = $transition;
	exports.$getConfig = $getConfig;
	exports.$sendHttp = $sendHttp;
	exports.$openURL = $openURL;
	exports.$setTitle = $setTitle;
	exports.$call = $call;
	
	var _util = __webpack_require__(48);
	
	var _ = _interopRequireWildcard(_util);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	/**
	 * ==========================================================
	 * common
	 * ==========================================================
	 */
	
	/**
	 * @deprecated use $vm instead
	 * find the vm by id
	 * Note: there is only one id in whole component
	 * @param  {string} id
	 * @return {Vm}
	 */
	function $(id) {
	  _.warn('Vm#$ is deprecated, please use Vm#$vm instead');
	  var info = this._ids[id];
	  if (info) {
	    return info.vm;
	  }
	}
	
	/**
	 * find the element by id
	 * Note: there is only one id in whole component
	 * @param  {string} id
	 * @return {Element}
	 */
	/**
	 * @fileOverview The api for invoking with "$" prefix
	 */
	function $el(id) {
	  var info = this._ids[id];
	  if (info) {
	    return info.el;
	  }
	}
	
	/**
	 * find the vm of the custom component by id
	 * Note: there is only one id in whole component
	 * @param  {string} id
	 * @return {Vm}
	 */
	function $vm(id) {
	  var info = this._ids[id];
	  if (info) {
	    return info.vm;
	  }
	}
	
	/**
	 * Fire when differ rendering finished
	 *
	 * @param  {Function} fn
	 */
	function $renderThen(fn) {
	  var app = this._app;
	  var differ = app.differ;
	  return differ.then(function () {
	    fn();
	  });
	}
	
	/**
	 * scroll an element specified by id into view,
	 * moreover specify a number of offset optionally
	 * @param  {string} id
	 * @param  {number} offset
	 */
	function $scrollTo(id, offset) {
	  _.warn('Vm#$scrollTo is deprecated, ' + 'please use "require(\'@weex-module/dom\')' + '.scrollTo(el, options)" instead');
	  var el = this.$el(id);
	  if (el) {
	    var dom = this._app.requireModule('dom');
	    dom.scrollToElement(el.ref, { offset: offset });
	  }
	}
	
	/**
	 * perform transition animation on an element specified by id
	 * @param  {string}   id
	 * @param  {object}   options
	 * @param  {object}   options.styles
	 * @param  {object}   options.duration(ms)
	 * @param  {object}   [options.timingFunction]
	 * @param  {object}   [options.delay=0(ms)]
	 * @param  {Function} callback
	 */
	function $transition(id, options, callback) {
	  var _this = this;
	
	  var el = this.$el(id);
	  if (el && options && options.styles) {
	    var animation = this._app.requireModule('animation');
	    animation.transition(el.ref, options, function () {
	      _this._setStyle(el, options.styles);
	      callback && callback.apply(undefined, arguments);
	    });
	  }
	}
	
	/**
	 * get some config
	 * @return {object} some config for app instance
	 * @property {string} bundleUrl
	 * @property {boolean} debug
	 * @property {object} env
	 * @property {string} env.weexVersion(ex. 1.0.0)
	 * @property {string} env.appName(ex. TB/TM)
	 * @property {string} env.appVersion(ex. 5.0.0)
	 * @property {string} env.platform(ex. iOS/Android)
	 * @property {string} env.osVersion(ex. 7.0.0)
	 * @property {string} env.deviceModel **native only**
	 * @property {number} env.[deviceWidth=750]
	 * @property {number} env.deviceHeight
	 */
	function $getConfig(callback) {
	  var config = _.extend({
	    env: global.WXEnvironment || {}
	  }, this._app.options);
	  if (_.typof(callback) === 'function') {
	    _.warn('the callback of Vm#$getConfig(callback) is deprecated, ' + 'this api now can directly RETURN config info.');
	    callback(config);
	  }
	  return config;
	}
	
	/**
	 * @deprecated
	 * request network via http protocol
	 * @param  {object}   params
	 * @param  {Function} callback
	 */
	function $sendHttp(params, callback) {
	  _.warn('Vm#$sendHttp is deprecated, ' + 'please use "require(\'@weex-module/stream\')' + '.sendHttp(params, callback)" instead');
	  var stream = this._app.requireModule('stream');
	  stream.sendHttp(params, callback);
	}
	
	/**
	 * @deprecated
	 * open a url
	 * @param  {string} url
	 */
	function $openURL(url) {
	  _.warn('Vm#$openURL is deprecated, ' + 'please use "require(\'@weex-module/event\')' + '.openURL(url)" instead');
	  var event = this._app.requireModule('event');
	  event.openURL(url);
	}
	
	/**
	 * @deprecated
	 * set a title for page
	 * @param  {string} title
	 */
	function $setTitle(title) {
	  _.warn('Vm#$setTitle is deprecated, ' + 'please use "require(\'@weex-module/pageInfo\')' + '.setTitle(title)" instead');
	  var pageInfo = this._app.requireModule('pageInfo');
	  pageInfo.setTitle(title);
	}
	
	/**
	 * @deprecated use "require('@weex-module/moduleName') instead"
	 * invoke a native method by specifing the name of module and method
	 * @param  {string} moduleName
	 * @param  {string} methodName
	 * @param  {...*} the rest arguments
	 */
	function $call(moduleName, methodName) {
	  _.warn('Vm#$call is deprecated, ' + 'please use "require(\'@weex-module/moduleName\')" instead');
	  var module = this._app.requireModule(moduleName);
	  if (module && module[methodName]) {
	    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	      args[_key - 2] = arguments[_key];
	    }
	
	    module[methodName].apply(module, args);
	  }
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMWI1MjZjYjE5NjFjZjMxYzQ0ZTIiLCJ3ZWJwYWNrOi8vLy4vaHRtbDUvbmF0aXZlL2luZGV4LmpzIiwid2VicGFjazovLy8uL2h0bWw1L3NoYXJlZC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9odG1sNS9zaGFyZWQvb2JqZWN0QXNzaWduLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9mbi9vYmplY3QvYXNzaWduLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19leHBvcnQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9fY29yZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9faGlkZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWRwLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19hbi1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX2lzLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9faWU4LWRvbS1kZWZpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19mYWlscy5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9fZG9tLWNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9fdG8tcHJpbWl0aXZlLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19wcm9wZXJ0eS1kZXNjLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19yZWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9faGFzLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL191aWQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX2N0eC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9fYS1mdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWFzc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWtleXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1rZXlzLWludGVybmFsLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL190by1pb2JqZWN0LmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19pb2JqZWN0LmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19jb2YuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX2RlZmluZWQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX2FycmF5LWluY2x1ZGVzLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL190by1sZW5ndGguanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX3RvLWludGVnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX3RvLWluZGV4LmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19zaGFyZWQta2V5LmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19zaGFyZWQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX2VudW0tYnVnLWtleXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1nb3BzLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19vYmplY3QtcGllLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL190by1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vaHRtbDUvc2hhcmVkL3NldFRpbWVvdXQuanMiLCJ3ZWJwYWNrOi8vLy4vaHRtbDUvc2hhcmVkL3Byb21pc2UuanMiLCJ3ZWJwYWNrOi8vLy4vaHRtbDUvc2hhcmVkL2NvbnNvbGUuanMiLCJ3ZWJwYWNrOi8vLy4vaHRtbDUvcnVudGltZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9odG1sNS9ydW50aW1lL2ZyYW1ld29ya3MuanMiLCJ3ZWJwYWNrOi8vLy4vaHRtbDUvZGVmYXVsdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9odG1sNS9kZWZhdWx0L2NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9odG1sNS9kZWZhdWx0L2FwcC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9odG1sNS9kZWZhdWx0L3V0aWwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vaHRtbDUvZGVmYXVsdC9hcHAvYnVuZGxlLmpzIiwid2VicGFjazovLy8uL34vc2VtdmVyL3NlbXZlci5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL34vbm9kZS1saWJzLWJyb3dzZXIvfi9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vaHRtbDUvZGVmYXVsdC92bS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9odG1sNS9kZWZhdWx0L2NvcmUvc3RhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vaHRtbDUvZGVmYXVsdC9jb3JlL3dhdGNoZXIuanMiLCJ3ZWJwYWNrOi8vLy4vaHRtbDUvZGVmYXVsdC9jb3JlL2RlcC5qcyIsIndlYnBhY2s6Ly8vLi9odG1sNS9kZWZhdWx0L2NvcmUvb2JzZXJ2ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vaHRtbDUvZGVmYXVsdC9jb3JlL2FycmF5LmpzIiwid2VicGFjazovLy8uL2h0bWw1L2RlZmF1bHQvdm0vY29tcGlsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vaHRtbDUvZGVmYXVsdC92bS9kaXJlY3RpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vaHRtbDUvZGVmYXVsdC92bS9kb20taGVscGVyLmpzIiwid2VicGFjazovLy8uL2h0bWw1L2RlZmF1bHQvdm0vZXZlbnRzLmpzIiwid2VicGFjazovLy8uL2h0bWw1L2RlZmF1bHQvYXBwL3JlZ2lzdGVyLmpzIiwid2VicGFjazovLy8uL2h0bWw1L2RlZmF1bHQvYXBwL2Rvd25ncmFkZS5qcyIsIndlYnBhY2s6Ly8vLi9odG1sNS9kZWZhdWx0L2FwcC9jdHJsLmpzIiwid2VicGFjazovLy8uL2h0bWw1L2RlZmF1bHQvYXBwL2RpZmZlci5qcyIsIndlYnBhY2s6Ly8vLi9odG1sNS92ZG9tL2luZGV4LmpzIiwid2VicGFjazovLy8uL2h0bWw1L3Zkb20vbGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vcGFja2FnZS5qc29uIiwid2VicGFjazovLy8uL2h0bWw1L2RlZmF1bHQvYXBpL21ldGhvZHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7QUN0Q0E7O0FBQ0E7Ozs7QUFDQTs7OztLQUVRLE0sdUJBQUEsTTtLQUFRLFcsdUJBQUEsVzs7NEJBRUwsVTtBQUNULFVBQU8sVUFBUCxJQUFxQixZQUFtQjtBQUN0QyxTQUFNLE1BQU0sa0JBQVEsVUFBUixxQ0FBWjtBQUNBLFNBQUksZUFBZSxLQUFuQixFQUEwQjtBQUN4QixlQUFRLEtBQVIsQ0FBYyxJQUFJLFFBQUosRUFBZDtBQUNEO0FBQ0QsWUFBTyxHQUFQO0FBQ0QsSUFORDs7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QUFGLENBQU8saUNBQ0MsZ0RBREQsR0FFQywyQkFGUjtBQUdBLE9BQU0sV0FBVyxLQUFLLElBQUwsQ0FBVSxhQUFWLENBQXdCLFVBQXhCLENBQWpCO0FBQ0EsWUFBUyxRQUFULENBQWtCLEtBQWxCO0FBQ0Q7Ozs7Ozs7OztBQVNNLFVBQVMsS0FBVCxDQUFnQixVQUFoQixFQUE0QixVQUE1QixFQUFpRDtBQUN0RCxLQUFFLElBQUYsQ0FBTyw2QkFDTCwyREFERjtBQUVBLE9BQU0sU0FBUyxLQUFLLElBQUwsQ0FBVSxhQUFWLENBQXdCLFVBQXhCLENBQWY7QUFDQSxPQUFJLFVBQVUsT0FBTyxVQUFQLENBQWQsRUFBa0M7QUFBQSx1Q0FKYyxJQUlkO0FBSmMsV0FJZDtBQUFBOztBQUNoQyxZQUFPLFVBQVAsZ0JBQXNCLElBQXRCO0FBQ0Q7QUFDRixFIiwiZmlsZSI6Im5hdGl2ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgMWI1MjZjYjE5NjFjZjMxYzQ0ZTJcbiAqKi8iLCJpbXBvcnQgJy4uL3NoYXJlZCdcbmltcG9ydCBydW50aW1lIGZyb20gJy4uL3J1bnRpbWUnXG5pbXBvcnQgeyBzdWJ2ZXJzaW9uIH0gZnJvbSAnLi4vLi4vcGFja2FnZS5qc29uJ1xuXG5jb25zdCB7IG5hdGl2ZSwgdHJhbnNmb3JtZXIgfSA9IHN1YnZlcnNpb25cblxuZm9yIChjb25zdCBtZXRob2ROYW1lIGluIHJ1bnRpbWUpIHtcbiAgZ2xvYmFsW21ldGhvZE5hbWVdID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcbiAgICBjb25zdCByZXQgPSBydW50aW1lW21ldGhvZE5hbWVdKC4uLmFyZ3MpXG4gICAgaWYgKHJldCBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKHJldC50b1N0cmluZygpKVxuICAgIH1cbiAgICByZXR1cm4gcmV0XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihnbG9iYWwsIHtcbiAgZnJhbWV3b3JrVmVyc2lvbjogbmF0aXZlLFxuICBuZWVkVHJhbnNmb3JtZXJWZXJzaW9uOiB0cmFuc2Zvcm1lclxufSlcblxuLyoqXG4gKiByZWdpc3RlciBtZXRob2RzXG4gKi9cbmNvbnN0IG1ldGhvZHMgPSByZXF1aXJlKCcuLi9kZWZhdWx0L2FwaS9tZXRob2RzJylcbmNvbnN0IHsgcmVnaXN0ZXJNZXRob2RzIH0gPSBnbG9iYWxcbnJlZ2lzdGVyTWV0aG9kcyhtZXRob2RzKVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9odG1sNS9uYXRpdmUvaW5kZXguanNcbiAqKi8iLCJpbXBvcnQgJy4vb2JqZWN0QXNzaWduJ1xuaW1wb3J0ICcuL3NldFRpbWVvdXQnXG5pbXBvcnQgJy4vcHJvbWlzZSdcbmltcG9ydCAnLi9jb25zb2xlJ1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9odG1sNS9zaGFyZWQvaW5kZXguanNcbiAqKi8iLCJpbXBvcnQgJ2NvcmUtanMvZm4vb2JqZWN0L2Fzc2lnbidcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vaHRtbDUvc2hhcmVkL29iamVjdEFzc2lnbi5qc1xuICoqLyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24nKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdC5hc3NpZ247XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvZm4vb2JqZWN0L2Fzc2lnbi5qc1xuICoqLyIsIi8vIDE5LjEuMy4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiwgJ09iamVjdCcsIHthc3NpZ246IHJlcXVpcmUoJy4vX29iamVjdC1hc3NpZ24nKX0pO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24uanNcbiAqKi8iLCJ2YXIgZ2xvYmFsICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBjb3JlICAgICAgPSByZXF1aXJlKCcuL19jb3JlJylcbiAgLCBoaWRlICAgICAgPSByZXF1aXJlKCcuL19oaWRlJylcbiAgLCByZWRlZmluZSAgPSByZXF1aXJlKCcuL19yZWRlZmluZScpXG4gICwgY3R4ICAgICAgID0gcmVxdWlyZSgnLi9fY3R4JylcbiAgLCBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcblxudmFyICRleHBvcnQgPSBmdW5jdGlvbih0eXBlLCBuYW1lLCBzb3VyY2Upe1xuICB2YXIgSVNfRk9SQ0VEID0gdHlwZSAmICRleHBvcnQuRlxuICAgICwgSVNfR0xPQkFMID0gdHlwZSAmICRleHBvcnQuR1xuICAgICwgSVNfU1RBVElDID0gdHlwZSAmICRleHBvcnQuU1xuICAgICwgSVNfUFJPVE8gID0gdHlwZSAmICRleHBvcnQuUFxuICAgICwgSVNfQklORCAgID0gdHlwZSAmICRleHBvcnQuQlxuICAgICwgdGFyZ2V0ICAgID0gSVNfR0xPQkFMID8gZ2xvYmFsIDogSVNfU1RBVElDID8gZ2xvYmFsW25hbWVdIHx8IChnbG9iYWxbbmFtZV0gPSB7fSkgOiAoZ2xvYmFsW25hbWVdIHx8IHt9KVtQUk9UT1RZUEVdXG4gICAgLCBleHBvcnRzICAgPSBJU19HTE9CQUwgPyBjb3JlIDogY29yZVtuYW1lXSB8fCAoY29yZVtuYW1lXSA9IHt9KVxuICAgICwgZXhwUHJvdG8gID0gZXhwb3J0c1tQUk9UT1RZUEVdIHx8IChleHBvcnRzW1BST1RPVFlQRV0gPSB7fSlcbiAgICAsIGtleSwgb3duLCBvdXQsIGV4cDtcbiAgaWYoSVNfR0xPQkFMKXNvdXJjZSA9IG5hbWU7XG4gIGZvcihrZXkgaW4gc291cmNlKXtcbiAgICAvLyBjb250YWlucyBpbiBuYXRpdmVcbiAgICBvd24gPSAhSVNfRk9SQ0VEICYmIHRhcmdldCAmJiB0YXJnZXRba2V5XSAhPT0gdW5kZWZpbmVkO1xuICAgIC8vIGV4cG9ydCBuYXRpdmUgb3IgcGFzc2VkXG4gICAgb3V0ID0gKG93biA/IHRhcmdldCA6IHNvdXJjZSlba2V5XTtcbiAgICAvLyBiaW5kIHRpbWVycyB0byBnbG9iYWwgZm9yIGNhbGwgZnJvbSBleHBvcnQgY29udGV4dFxuICAgIGV4cCA9IElTX0JJTkQgJiYgb3duID8gY3R4KG91dCwgZ2xvYmFsKSA6IElTX1BST1RPICYmIHR5cGVvZiBvdXQgPT0gJ2Z1bmN0aW9uJyA/IGN0eChGdW5jdGlvbi5jYWxsLCBvdXQpIDogb3V0O1xuICAgIC8vIGV4dGVuZCBnbG9iYWxcbiAgICBpZih0YXJnZXQpcmVkZWZpbmUodGFyZ2V0LCBrZXksIG91dCwgdHlwZSAmICRleHBvcnQuVSk7XG4gICAgLy8gZXhwb3J0XG4gICAgaWYoZXhwb3J0c1trZXldICE9IG91dCloaWRlKGV4cG9ydHMsIGtleSwgZXhwKTtcbiAgICBpZihJU19QUk9UTyAmJiBleHBQcm90b1trZXldICE9IG91dClleHBQcm90b1trZXldID0gb3V0O1xuICB9XG59O1xuZ2xvYmFsLmNvcmUgPSBjb3JlO1xuLy8gdHlwZSBiaXRtYXBcbiRleHBvcnQuRiA9IDE7ICAgLy8gZm9yY2VkXG4kZXhwb3J0LkcgPSAyOyAgIC8vIGdsb2JhbFxuJGV4cG9ydC5TID0gNDsgICAvLyBzdGF0aWNcbiRleHBvcnQuUCA9IDg7ICAgLy8gcHJvdG9cbiRleHBvcnQuQiA9IDE2OyAgLy8gYmluZFxuJGV4cG9ydC5XID0gMzI7ICAvLyB3cmFwXG4kZXhwb3J0LlUgPSA2NDsgIC8vIHNhZmVcbiRleHBvcnQuUiA9IDEyODsgLy8gcmVhbCBwcm90byBtZXRob2QgZm9yIGBsaWJyYXJ5YCBcbm1vZHVsZS5leHBvcnRzID0gJGV4cG9ydDtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL19leHBvcnQuanNcbiAqKi8iLCIvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxudmFyIGdsb2JhbCA9IG1vZHVsZS5leHBvcnRzID0gdHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuTWF0aCA9PSBNYXRoXG4gID8gd2luZG93IDogdHlwZW9mIHNlbGYgIT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5NYXRoID09IE1hdGggPyBzZWxmIDogRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbmlmKHR5cGVvZiBfX2cgPT0gJ251bWJlcicpX19nID0gZ2xvYmFsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fZ2xvYmFsLmpzXG4gKiovIiwidmFyIGNvcmUgPSBtb2R1bGUuZXhwb3J0cyA9IHt2ZXJzaW9uOiAnMi40LjAnfTtcbmlmKHR5cGVvZiBfX2UgPT0gJ251bWJlcicpX19lID0gY29yZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX2NvcmUuanNcbiAqKi8iLCJ2YXIgZFAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpXG4gICwgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IGZ1bmN0aW9uKG9iamVjdCwga2V5LCB2YWx1ZSl7XG4gIHJldHVybiBkUC5mKG9iamVjdCwga2V5LCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG59IDogZnVuY3Rpb24ob2JqZWN0LCBrZXksIHZhbHVlKXtcbiAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIG9iamVjdDtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9faGlkZS5qc1xuICoqLyIsInZhciBhbk9iamVjdCAgICAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuL19pZTgtZG9tLWRlZmluZScpXG4gICwgdG9QcmltaXRpdmUgICAgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKVxuICAsIGRQICAgICAgICAgICAgID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG5leHBvcnRzLmYgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gT2JqZWN0LmRlZmluZVByb3BlcnR5IDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcyl7XG4gIGFuT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEF0dHJpYnV0ZXMpO1xuICBpZihJRThfRE9NX0RFRklORSl0cnkge1xuICAgIHJldHVybiBkUChPLCBQLCBBdHRyaWJ1dGVzKTtcbiAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxuICBpZignZ2V0JyBpbiBBdHRyaWJ1dGVzIHx8ICdzZXQnIGluIEF0dHJpYnV0ZXMpdGhyb3cgVHlwZUVycm9yKCdBY2Nlc3NvcnMgbm90IHN1cHBvcnRlZCEnKTtcbiAgaWYoJ3ZhbHVlJyBpbiBBdHRyaWJ1dGVzKU9bUF0gPSBBdHRyaWJ1dGVzLnZhbHVlO1xuICByZXR1cm4gTztcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWRwLmpzXG4gKiovIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoIWlzT2JqZWN0KGl0KSl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhbiBvYmplY3QhJyk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fYW4tb2JqZWN0LmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiB0eXBlb2YgaXQgPT09ICdvYmplY3QnID8gaXQgIT09IG51bGwgOiB0eXBlb2YgaXQgPT09ICdmdW5jdGlvbic7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX2lzLW9iamVjdC5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgJiYgIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcclxuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKSgnZGl2JyksICdhJywge2dldDogZnVuY3Rpb24oKXsgcmV0dXJuIDc7IH19KS5hICE9IDc7XHJcbn0pO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzXG4gKiovIiwiLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAnYScsIHtnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiA3OyB9fSkuYSAhPSA3O1xufSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fZGVzY3JpcHRvcnMuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGV4ZWMpe1xuICB0cnkge1xuICAgIHJldHVybiAhIWV4ZWMoKTtcbiAgfSBjYXRjaChlKXtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL19mYWlscy5qc1xuICoqLyIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgZG9jdW1lbnQgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5kb2N1bWVudFxuICAvLyBpbiBvbGQgSUUgdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCdcbiAgLCBpcyA9IGlzT2JqZWN0KGRvY3VtZW50KSAmJiBpc09iamVjdChkb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL19kb20tY3JlYXRlLmpzXG4gKiovIiwiLy8gNy4xLjEgVG9QcmltaXRpdmUoaW5wdXQgWywgUHJlZmVycmVkVHlwZV0pXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbi8vIGluc3RlYWQgb2YgdGhlIEVTNiBzcGVjIHZlcnNpb24sIHdlIGRpZG4ndCBpbXBsZW1lbnQgQEB0b1ByaW1pdGl2ZSBjYXNlXG4vLyBhbmQgdGhlIHNlY29uZCBhcmd1bWVudCAtIGZsYWcgLSBwcmVmZXJyZWQgdHlwZSBpcyBhIHN0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwgUyl7XG4gIGlmKCFpc09iamVjdChpdCkpcmV0dXJuIGl0O1xuICB2YXIgZm4sIHZhbDtcbiAgaWYoUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSlyZXR1cm4gdmFsO1xuICBpZih0eXBlb2YgKGZuID0gaXQudmFsdWVPZikgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIGlmKCFTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZVwiKTtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fdG8tcHJpbWl0aXZlLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihiaXRtYXAsIHZhbHVlKXtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlICA6ICEoYml0bWFwICYgMSksXG4gICAgY29uZmlndXJhYmxlOiAhKGJpdG1hcCAmIDIpLFxuICAgIHdyaXRhYmxlICAgIDogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZSAgICAgICA6IHZhbHVlXG4gIH07XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX3Byb3BlcnR5LWRlc2MuanNcbiAqKi8iLCJ2YXIgZ2xvYmFsICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBoaWRlICAgICAgPSByZXF1aXJlKCcuL19oaWRlJylcbiAgLCBoYXMgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIFNSQyAgICAgICA9IHJlcXVpcmUoJy4vX3VpZCcpKCdzcmMnKVxuICAsIFRPX1NUUklORyA9ICd0b1N0cmluZydcbiAgLCAkdG9TdHJpbmcgPSBGdW5jdGlvbltUT19TVFJJTkddXG4gICwgVFBMICAgICAgID0gKCcnICsgJHRvU3RyaW5nKS5zcGxpdChUT19TVFJJTkcpO1xuXG5yZXF1aXJlKCcuL19jb3JlJykuaW5zcGVjdFNvdXJjZSA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuICR0b1N0cmluZy5jYWxsKGl0KTtcbn07XG5cbihtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKE8sIGtleSwgdmFsLCBzYWZlKXtcbiAgdmFyIGlzRnVuY3Rpb24gPSB0eXBlb2YgdmFsID09ICdmdW5jdGlvbic7XG4gIGlmKGlzRnVuY3Rpb24paGFzKHZhbCwgJ25hbWUnKSB8fCBoaWRlKHZhbCwgJ25hbWUnLCBrZXkpO1xuICBpZihPW2tleV0gPT09IHZhbClyZXR1cm47XG4gIGlmKGlzRnVuY3Rpb24paGFzKHZhbCwgU1JDKSB8fCBoaWRlKHZhbCwgU1JDLCBPW2tleV0gPyAnJyArIE9ba2V5XSA6IFRQTC5qb2luKFN0cmluZyhrZXkpKSk7XG4gIGlmKE8gPT09IGdsb2JhbCl7XG4gICAgT1trZXldID0gdmFsO1xuICB9IGVsc2Uge1xuICAgIGlmKCFzYWZlKXtcbiAgICAgIGRlbGV0ZSBPW2tleV07XG4gICAgICBoaWRlKE8sIGtleSwgdmFsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYoT1trZXldKU9ba2V5XSA9IHZhbDtcbiAgICAgIGVsc2UgaGlkZShPLCBrZXksIHZhbCk7XG4gICAgfVxuICB9XG4vLyBhZGQgZmFrZSBGdW5jdGlvbiN0b1N0cmluZyBmb3IgY29ycmVjdCB3b3JrIHdyYXBwZWQgbWV0aG9kcyAvIGNvbnN0cnVjdG9ycyB3aXRoIG1ldGhvZHMgbGlrZSBMb0Rhc2ggaXNOYXRpdmVcbn0pKEZ1bmN0aW9uLnByb3RvdHlwZSwgVE9fU1RSSU5HLCBmdW5jdGlvbiB0b1N0cmluZygpe1xuICByZXR1cm4gdHlwZW9mIHRoaXMgPT0gJ2Z1bmN0aW9uJyAmJiB0aGlzW1NSQ10gfHwgJHRvU3RyaW5nLmNhbGwodGhpcyk7XG59KTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL19yZWRlZmluZS5qc1xuICoqLyIsInZhciBoYXNPd25Qcm9wZXJ0eSA9IHt9Lmhhc093blByb3BlcnR5O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwga2V5KXtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoaXQsIGtleSk7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX2hhcy5qc1xuICoqLyIsInZhciBpZCA9IDBcbiAgLCBweCA9IE1hdGgucmFuZG9tKCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIHJldHVybiAnU3ltYm9sKCcuY29uY2F0KGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXksICcpXycsICgrK2lkICsgcHgpLnRvU3RyaW5nKDM2KSk7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX3VpZC5qc1xuICoqLyIsIi8vIG9wdGlvbmFsIC8gc2ltcGxlIGNvbnRleHQgYmluZGluZ1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZm4sIHRoYXQsIGxlbmd0aCl7XG4gIGFGdW5jdGlvbihmbik7XG4gIGlmKHRoYXQgPT09IHVuZGVmaW5lZClyZXR1cm4gZm47XG4gIHN3aXRjaChsZW5ndGgpe1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uKGEpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSk7XG4gICAgfTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbihhLCBiKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24oYSwgYiwgYyl7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiLCBjKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbigvKiAuLi5hcmdzICovKXtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fY3R4LmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKHR5cGVvZiBpdCAhPSAnZnVuY3Rpb24nKXRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGEgZnVuY3Rpb24hJyk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fYS1mdW5jdGlvbi5qc1xuICoqLyIsIid1c2Ugc3RyaWN0Jztcbi8vIDE5LjEuMi4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UsIC4uLilcbnZhciBnZXRLZXlzICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJylcbiAgLCBnT1BTICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BzJylcbiAgLCBwSUUgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1waWUnKVxuICAsIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcbiAgLCBJT2JqZWN0ICA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKVxuICAsICRhc3NpZ24gID0gT2JqZWN0LmFzc2lnbjtcblxuLy8gc2hvdWxkIHdvcmsgd2l0aCBzeW1ib2xzIGFuZCBzaG91bGQgaGF2ZSBkZXRlcm1pbmlzdGljIHByb3BlcnR5IG9yZGVyIChWOCBidWcpXG5tb2R1bGUuZXhwb3J0cyA9ICEkYXNzaWduIHx8IHJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgdmFyIEEgPSB7fVxuICAgICwgQiA9IHt9XG4gICAgLCBTID0gU3ltYm9sKClcbiAgICAsIEsgPSAnYWJjZGVmZ2hpamtsbW5vcHFyc3QnO1xuICBBW1NdID0gNztcbiAgSy5zcGxpdCgnJykuZm9yRWFjaChmdW5jdGlvbihrKXsgQltrXSA9IGs7IH0pO1xuICByZXR1cm4gJGFzc2lnbih7fSwgQSlbU10gIT0gNyB8fCBPYmplY3Qua2V5cygkYXNzaWduKHt9LCBCKSkuam9pbignJykgIT0gSztcbn0pID8gZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgc291cmNlKXsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICB2YXIgVCAgICAgPSB0b09iamVjdCh0YXJnZXQpXG4gICAgLCBhTGVuICA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgICAsIGluZGV4ID0gMVxuICAgICwgZ2V0U3ltYm9scyA9IGdPUFMuZlxuICAgICwgaXNFbnVtICAgICA9IHBJRS5mO1xuICB3aGlsZShhTGVuID4gaW5kZXgpe1xuICAgIHZhciBTICAgICAgPSBJT2JqZWN0KGFyZ3VtZW50c1tpbmRleCsrXSlcbiAgICAgICwga2V5cyAgID0gZ2V0U3ltYm9scyA/IGdldEtleXMoUykuY29uY2F0KGdldFN5bWJvbHMoUykpIDogZ2V0S2V5cyhTKVxuICAgICAgLCBsZW5ndGggPSBrZXlzLmxlbmd0aFxuICAgICAgLCBqICAgICAgPSAwXG4gICAgICAsIGtleTtcbiAgICB3aGlsZShsZW5ndGggPiBqKWlmKGlzRW51bS5jYWxsKFMsIGtleSA9IGtleXNbaisrXSkpVFtrZXldID0gU1trZXldO1xuICB9IHJldHVybiBUO1xufSA6ICRhc3NpZ247XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWFzc2lnbi5qc1xuICoqLyIsIi8vIDE5LjEuMi4xNCAvIDE1LjIuMy4xNCBPYmplY3Qua2V5cyhPKVxyXG52YXIgJGtleXMgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cy1pbnRlcm5hbCcpXHJcbiAgLCBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24ga2V5cyhPKXtcclxuICByZXR1cm4gJGtleXMoTywgZW51bUJ1Z0tleXMpO1xyXG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1rZXlzLmpzXG4gKiovIiwidmFyIGhhcyAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXHJcbiAgLCB0b0lPYmplY3QgICAgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcclxuICAsIGFycmF5SW5kZXhPZiA9IHJlcXVpcmUoJy4vX2FycmF5LWluY2x1ZGVzJykoZmFsc2UpXHJcbiAgLCBJRV9QUk9UTyAgICAgPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iamVjdCwgbmFtZXMpe1xyXG4gIHZhciBPICAgICAgPSB0b0lPYmplY3Qob2JqZWN0KVxyXG4gICAgLCBpICAgICAgPSAwXHJcbiAgICAsIHJlc3VsdCA9IFtdXHJcbiAgICAsIGtleTtcclxuICBmb3Ioa2V5IGluIE8paWYoa2V5ICE9IElFX1BST1RPKWhhcyhPLCBrZXkpICYmIHJlc3VsdC5wdXNoKGtleSk7XHJcbiAgLy8gRG9uJ3QgZW51bSBidWcgJiBoaWRkZW4ga2V5c1xyXG4gIHdoaWxlKG5hbWVzLmxlbmd0aCA+IGkpaWYoaGFzKE8sIGtleSA9IG5hbWVzW2krK10pKXtcclxuICAgIH5hcnJheUluZGV4T2YocmVzdWx0LCBrZXkpIHx8IHJlc3VsdC5wdXNoKGtleSk7XHJcbiAgfVxyXG4gIHJldHVybiByZXN1bHQ7XHJcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWtleXMtaW50ZXJuYWwuanNcbiAqKi8iLCIvLyB0byBpbmRleGVkIG9iamVjdCwgdG9PYmplY3Qgd2l0aCBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIHN0cmluZ3NcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi9faW9iamVjdCcpXG4gICwgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gSU9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX3RvLWlvYmplY3QuanNcbiAqKi8iLCIvLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKSA/IE9iamVjdCA6IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGNvZihpdCkgPT0gJ1N0cmluZycgPyBpdC5zcGxpdCgnJykgOiBPYmplY3QoaXQpO1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL19pb2JqZWN0LmpzXG4gKiovIiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChpdCkuc2xpY2UoOCwgLTEpO1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL19jb2YuanNcbiAqKi8iLCIvLyA3LjIuMSBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKGl0ID09IHVuZGVmaW5lZCl0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiAgXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fZGVmaW5lZC5qc1xuICoqLyIsIi8vIGZhbHNlIC0+IEFycmF5I2luZGV4T2Zcbi8vIHRydWUgIC0+IEFycmF5I2luY2x1ZGVzXG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXG4gICwgdG9MZW5ndGggID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJylcbiAgLCB0b0luZGV4ICAgPSByZXF1aXJlKCcuL190by1pbmRleCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihJU19JTkNMVURFUyl7XG4gIHJldHVybiBmdW5jdGlvbigkdGhpcywgZWwsIGZyb21JbmRleCl7XG4gICAgdmFyIE8gICAgICA9IHRvSU9iamVjdCgkdGhpcylcbiAgICAgICwgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpXG4gICAgICAsIGluZGV4ICA9IHRvSW5kZXgoZnJvbUluZGV4LCBsZW5ndGgpXG4gICAgICAsIHZhbHVlO1xuICAgIC8vIEFycmF5I2luY2x1ZGVzIHVzZXMgU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG1cbiAgICBpZihJU19JTkNMVURFUyAmJiBlbCAhPSBlbCl3aGlsZShsZW5ndGggPiBpbmRleCl7XG4gICAgICB2YWx1ZSA9IE9baW5kZXgrK107XG4gICAgICBpZih2YWx1ZSAhPSB2YWx1ZSlyZXR1cm4gdHJ1ZTtcbiAgICAvLyBBcnJheSN0b0luZGV4IGlnbm9yZXMgaG9sZXMsIEFycmF5I2luY2x1ZGVzIC0gbm90XG4gICAgfSBlbHNlIGZvcig7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspaWYoSVNfSU5DTFVERVMgfHwgaW5kZXggaW4gTyl7XG4gICAgICBpZihPW2luZGV4XSA9PT0gZWwpcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4IHx8IDA7XG4gICAgfSByZXR1cm4gIUlTX0lOQ0xVREVTICYmIC0xO1xuICB9O1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL19hcnJheS1pbmNsdWRlcy5qc1xuICoqLyIsIi8vIDcuMS4xNSBUb0xlbmd0aFxudmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKVxuICAsIG1pbiAgICAgICA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpdCA+IDAgPyBtaW4odG9JbnRlZ2VyKGl0KSwgMHgxZmZmZmZmZmZmZmZmZikgOiAwOyAvLyBwb3coMiwgNTMpIC0gMSA9PSA5MDA3MTk5MjU0NzQwOTkxXG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX3RvLWxlbmd0aC5qc1xuICoqLyIsIi8vIDcuMS40IFRvSW50ZWdlclxudmFyIGNlaWwgID0gTWF0aC5jZWlsXG4gICwgZmxvb3IgPSBNYXRoLmZsb29yO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpc05hTihpdCA9ICtpdCkgPyAwIDogKGl0ID4gMCA/IGZsb29yIDogY2VpbCkoaXQpO1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL190by1pbnRlZ2VyLmpzXG4gKiovIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKVxuICAsIG1heCAgICAgICA9IE1hdGgubWF4XG4gICwgbWluICAgICAgID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGluZGV4LCBsZW5ndGgpe1xuICBpbmRleCA9IHRvSW50ZWdlcihpbmRleCk7XG4gIHJldHVybiBpbmRleCA8IDAgPyBtYXgoaW5kZXggKyBsZW5ndGgsIDApIDogbWluKGluZGV4LCBsZW5ndGgpO1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL190by1pbmRleC5qc1xuICoqLyIsInZhciBzaGFyZWQgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgna2V5cycpXHJcbiAgLCB1aWQgICAgPSByZXF1aXJlKCcuL191aWQnKTtcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xyXG4gIHJldHVybiBzaGFyZWRba2V5XSB8fCAoc2hhcmVkW2tleV0gPSB1aWQoa2V5KSk7XHJcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fc2hhcmVkLWtleS5qc1xuICoqLyIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIFNIQVJFRCA9ICdfX2NvcmUtanNfc2hhcmVkX18nXG4gICwgc3RvcmUgID0gZ2xvYmFsW1NIQVJFRF0gfHwgKGdsb2JhbFtTSEFSRURdID0ge30pO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gc3RvcmVba2V5XSB8fCAoc3RvcmVba2V5XSA9IHt9KTtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fc2hhcmVkLmpzXG4gKiovIiwiLy8gSUUgOC0gZG9uJ3QgZW51bSBidWcga2V5c1xyXG5tb2R1bGUuZXhwb3J0cyA9IChcclxuICAnY29uc3RydWN0b3IsaGFzT3duUHJvcGVydHksaXNQcm90b3R5cGVPZixwcm9wZXJ0eUlzRW51bWVyYWJsZSx0b0xvY2FsZVN0cmluZyx0b1N0cmluZyx2YWx1ZU9mJ1xyXG4pLnNwbGl0KCcsJyk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fZW51bS1idWcta2V5cy5qc1xuICoqLyIsImV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWdvcHMuanNcbiAqKi8iLCJleHBvcnRzLmYgPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL19vYmplY3QtcGllLmpzXG4gKiovIiwiLy8gNy4xLjEzIFRvT2JqZWN0KGFyZ3VtZW50KVxudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIE9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX3RvLW9iamVjdC5qc1xuICoqLyIsImNvbnN0IHtcbiAgc2V0VGltZW91dCwgc2V0VGltZW91dE5hdGl2ZVxufSA9IGdsb2JhbFxuXG5jb25zdCBNU0cgPSAnVXNlIFwiZ2xvYmFsLnNldFRpbWVvdXRcIiAgaXMgdW5leHBlY3RlZCwgJyArXG4gICAgICAgICAgICAgICdwbGVhc2UgdXNlIHJlcXVpcmUoXCJAd2VleC1tb2R1bGVcIikuc2V0VGltZW91dCBpbnN0ZWFkLidcblxuLy8gZml4IG5vIHNldFRpbWVvdXQgb24gQW5kcm9pZCBWOFxuLyogaXN0YW5idWwgaWdub3JlIGlmICovXG5pZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICd1bmRlZmluZWQnICYmXG4gIHR5cGVvZiBzZXRUaW1lb3V0TmF0aXZlID09PSAnZnVuY3Rpb24nKSB7XG4gIGNvbnN0IHRpbWVvdXRNYXAgPSB7fVxuICBsZXQgdGltZW91dElkID0gMFxuICBnbG9iYWwuc2V0VGltZW91dCA9IChjYiwgdGltZSkgPT4ge1xuICAgIGNvbnNvbGUud2FybihNU0cpXG4gICAgdGltZW91dE1hcFsrK3RpbWVvdXRJZF0gPSBjYlxuICAgIHNldFRpbWVvdXROYXRpdmUodGltZW91dElkLnRvU3RyaW5nKCksIHRpbWUpXG4gIH1cbiAgZ2xvYmFsLnNldFRpbWVvdXRDYWxsYmFjayA9IChpZCkgPT4ge1xuICAgIGlmICh0eXBlb2YgdGltZW91dE1hcFtpZF0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRpbWVvdXRNYXBbaWRdKClcbiAgICAgIGRlbGV0ZSB0aW1lb3V0TWFwW2lkXVxuICAgIH1cbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9odG1sNS9zaGFyZWQvc2V0VGltZW91dC5qc1xuICoqLyIsImNvbnN0IE9yaWdpblByb21pc2UgPSBnbG9iYWwuUHJvbWlzZSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge31cbmNvbnN0IE1TRyA9ICdVc2luZyBcIlByb21pc2VcIiBpcyB1bmV4cGVjdGVkJ1xuXG5jb25zdCBVbmV4cGVjdGVkUHJvbWlzZSA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gIGNvbnNvbGUud2FybihNU0cpXG4gIHJldHVybiBuZXcgT3JpZ2luUHJvbWlzZSguLi5hcmdzKVxufVxuXG5jb25zdCBmbiA9IFsnYWxsJywgJ3JhY2UnLCAncmVzb2x2ZScsICdyZWplY3QnXVxuZm4uZm9yRWFjaChuID0+IHtcbiAgVW5leHBlY3RlZFByb21pc2Vbbl0gPSBmdW5jdGlvbiAoLi4uYXJncykge1xuICAgIGNvbnNvbGUud2FybihNU0cpXG4gICAgcmV0dXJuIE9yaWdpblByb21pc2Vbbl0gJiYgT3JpZ2luUHJvbWlzZVtuXSguLi5hcmdzKVxuICB9XG59KVxuXG5nbG9iYWwuUHJvbWlzZSA9IFVuZXhwZWN0ZWRQcm9taXNlXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2h0bWw1L3NoYXJlZC9wcm9taXNlLmpzXG4gKiovIiwiY29uc3QgeyBjb25zb2xlLCBuYXRpdmVMb2cgfSA9IGdsb2JhbFxuY29uc3QgTEVWRUxTID0gWydlcnJvcicsICd3YXJuJywgJ2luZm8nLCAnbG9nJywgJ2RlYnVnJ11cbmNvbnN0IGxldmVsTWFwID0ge31cblxuZ2VuZXJhdGVMZXZlbE1hcCgpXG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuaWYgKFxuICB0eXBlb2YgY29uc29sZSA9PT0gJ3VuZGVmaW5lZCcgfHwgLy8gQW5kcm9pZFxuICAoZ2xvYmFsLldYRW52aXJvbm1lbnQgJiYgZ2xvYmFsLldYRW52aXJvbm1lbnQucGxhdGZvcm0gPT09ICdpT1MnKSAvLyBpT1Ncbikge1xuICBnbG9iYWwuY29uc29sZSA9IHtcbiAgICBkZWJ1ZzogKC4uLmFyZ3MpID0+IHtcbiAgICAgIGlmIChjaGVja0xldmVsKCdkZWJ1ZycpKSB7IG5hdGl2ZUxvZyguLi5mb3JtYXQoYXJncyksICdfX0RFQlVHJykgfVxuICAgIH0sXG4gICAgbG9nOiAoLi4uYXJncykgPT4ge1xuICAgICAgaWYgKGNoZWNrTGV2ZWwoJ2xvZycpKSB7IG5hdGl2ZUxvZyguLi5mb3JtYXQoYXJncyksICdfX0xPRycpIH1cbiAgICB9LFxuICAgIGluZm86ICguLi5hcmdzKSA9PiB7XG4gICAgICBpZiAoY2hlY2tMZXZlbCgnaW5mbycpKSB7IG5hdGl2ZUxvZyguLi5mb3JtYXQoYXJncyksICdfX0lORk8nKSB9XG4gICAgfSxcbiAgICB3YXJuOiAoLi4uYXJncykgPT4ge1xuICAgICAgaWYgKGNoZWNrTGV2ZWwoJ3dhcm4nKSkgeyBuYXRpdmVMb2coLi4uZm9ybWF0KGFyZ3MpLCAnX19XQVJOJykgfVxuICAgIH0sXG4gICAgZXJyb3I6ICguLi5hcmdzKSA9PiB7XG4gICAgICBpZiAoY2hlY2tMZXZlbCgnZXJyb3InKSkgeyBuYXRpdmVMb2coLi4uZm9ybWF0KGFyZ3MpLCAnX19FUlJPUicpIH1cbiAgICB9XG4gIH1cbn1cbmVsc2UgeyAvLyBIVE1MNVxuICBjb25zdCB7IGRlYnVnLCBsb2csIGluZm8sIHdhcm4sIGVycm9yIH0gPSBjb25zb2xlXG4gIGNvbnNvbGUuX19vcmlfXyA9IHsgZGVidWcsIGxvZywgaW5mbywgd2FybiwgZXJyb3IgfVxuICBjb25zb2xlLmRlYnVnID0gKC4uLmFyZ3MpID0+IHtcbiAgICBpZiAoY2hlY2tMZXZlbCgnZGVidWcnKSkgeyBjb25zb2xlLl9fb3JpX18uZGVidWcuYXBwbHkoY29uc29sZSwgYXJncykgfVxuICB9XG4gIGNvbnNvbGUubG9nID0gKC4uLmFyZ3MpID0+IHtcbiAgICBpZiAoY2hlY2tMZXZlbCgnbG9nJykpIHsgY29uc29sZS5fX29yaV9fLmxvZy5hcHBseShjb25zb2xlLCBhcmdzKSB9XG4gIH1cbiAgY29uc29sZS5pbmZvID0gKC4uLmFyZ3MpID0+IHtcbiAgICBpZiAoY2hlY2tMZXZlbCgnaW5mbycpKSB7IGNvbnNvbGUuX19vcmlfXy5pbmZvLmFwcGx5KGNvbnNvbGUsIGFyZ3MpIH1cbiAgfVxuICBjb25zb2xlLndhcm4gPSAoLi4uYXJncykgPT4ge1xuICAgIGlmIChjaGVja0xldmVsKCd3YXJuJykpIHsgY29uc29sZS5fX29yaV9fLndhcm4uYXBwbHkoY29uc29sZSwgYXJncykgfVxuICB9XG4gIGNvbnNvbGUuZXJyb3IgPSAoLi4uYXJncykgPT4ge1xuICAgIGlmIChjaGVja0xldmVsKCdlcnJvcicpKSB7IGNvbnNvbGUuX19vcmlfXy5lcnJvci5hcHBseShjb25zb2xlLCBhcmdzKSB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVMZXZlbE1hcCAoKSB7XG4gIExFVkVMUy5mb3JFYWNoKGxldmVsID0+IHtcbiAgICBjb25zdCBsZXZlbEluZGV4ID0gTEVWRUxTLmluZGV4T2YobGV2ZWwpXG4gICAgbGV2ZWxNYXBbbGV2ZWxdID0ge31cbiAgICBMRVZFTFMuZm9yRWFjaCh0eXBlID0+IHtcbiAgICAgIGNvbnN0IHR5cGVJbmRleCA9IExFVkVMUy5pbmRleE9mKHR5cGUpXG4gICAgICBpZiAodHlwZUluZGV4IDw9IGxldmVsSW5kZXgpIHtcbiAgICAgICAgbGV2ZWxNYXBbbGV2ZWxdW3R5cGVdID0gdHJ1ZVxuICAgICAgfVxuICAgIH0pXG4gIH0pXG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZSAodikge1xuICBjb25zdCB0eXBlID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHYpXG4gIGlmICh0eXBlLnRvTG93ZXJDYXNlKCkgPT09ICdbb2JqZWN0IG9iamVjdF0nKSB7XG4gICAgdiA9IEpTT04uc3RyaW5naWZ5KHYpXG4gIH1cbiAgZWxzZSB7XG4gICAgdiA9IFN0cmluZyh2KVxuICB9XG4gIHJldHVybiB2XG59XG5cbmZ1bmN0aW9uIGNoZWNrTGV2ZWwgKHR5cGUpIHtcbiAgY29uc3QgbG9nTGV2ZWwgPSAoZ2xvYmFsLldYRW52aXJvbm1lbnQgJiYgZ2xvYmFsLldYRW52aXJvbm1lbnQubG9nTGV2ZWwpIHx8ICdsb2cnXG4gIHJldHVybiBsZXZlbE1hcFtsb2dMZXZlbF0gJiYgbGV2ZWxNYXBbbG9nTGV2ZWxdW3R5cGVdXG59XG5cbmZ1bmN0aW9uIGZvcm1hdCAoYXJncykge1xuICByZXR1cm4gYXJncy5tYXAodiA9PiBub3JtYWxpemUodikpXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2h0bWw1L3NoYXJlZC9jb25zb2xlLmpzXG4gKiovIiwiaW1wb3J0IGZyYW1ld29ya3MgZnJvbSAnLi9mcmFtZXdvcmtzJ1xuXG5pbXBvcnQgeyBEb2N1bWVudCwgRWxlbWVudCwgQ29tbWVudCB9IGZyb20gJy4uL3Zkb20nXG5cbmNvbnN0IGNvbmZpZyA9IHtcbiAgRG9jdW1lbnQsIEVsZW1lbnQsIENvbW1lbnQsXG4gIHNlbmRUYXNrcyAoLi4uYXJncykge1xuICAgIHJldHVybiBnbG9iYWwuY2FsbE5hdGl2ZSguLi5hcmdzKVxuICB9XG59XG5cbmZvciAoY29uc3QgbmFtZSBpbiBmcmFtZXdvcmtzKSB7XG4gIGNvbnN0IGZyYW1ld29yayA9IGZyYW1ld29ya3NbbmFtZV1cbiAgZnJhbWV3b3JrLmluaXQoY29uZmlnKVxufVxuXG5jb25zdCB2ZXJzaW9uUmVnRXhwID0gL15cXC9cXC8gKihcXHtbXlxcfV0qXFx9KSAqXFxyP1xcbi9cblxuZnVuY3Rpb24gY2hlY2tWZXJzaW9uIChjb2RlKSB7XG4gIGxldCBpbmZvXG4gIGNvbnN0IHJlc3VsdCA9IHZlcnNpb25SZWdFeHAuZXhlYyhjb2RlKVxuICBpZiAocmVzdWx0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGluZm8gPSBKU09OLnBhcnNlKHJlc3VsdFsxXSlcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHt9XG4gIH1cbiAgcmV0dXJuIGluZm9cbn1cblxuY29uc3QgaW5zdGFuY2VNYXAgPSB7fVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2UgKGlkLCBjb2RlLCBjb25maWcsIGRhdGEpIHtcbiAgbGV0IGluZm8gPSBpbnN0YW5jZU1hcFtpZF1cbiAgaWYgKCFpbmZvKSB7XG4gICAgaW5mbyA9IGNoZWNrVmVyc2lvbihjb2RlKSB8fCB7fVxuICAgIGlmICghZnJhbWV3b3Jrc1tpbmZvLmZyYW1ld29ya10pIHtcbiAgICAgIGluZm8uZnJhbWV3b3JrID0gJ1dlZXgnXG4gICAgfVxuICAgIGluc3RhbmNlTWFwW2lkXSA9IGluZm9cbiAgICBjb25maWcgPSBjb25maWcgfHwge31cbiAgICBjb25maWcuYnVuZGxlVmVyc2lvbiA9IGluZm8udmVyc2lvblxuICAgIHJldHVybiBmcmFtZXdvcmtzW2luZm8uZnJhbWV3b3JrXS5jcmVhdGVJbnN0YW5jZShpZCwgY29kZSwgY29uZmlnLCBkYXRhKVxuICB9XG4gIHJldHVybiBuZXcgRXJyb3IoYGludmFsaWQgaW5zdGFuY2UgaWQgXCIke2lkfVwiYClcbn1cblxuY29uc3QgbWV0aG9kcyA9IHtcbiAgY3JlYXRlSW5zdGFuY2Vcbn1cblxuZnVuY3Rpb24gZ2VuSW5pdCAobWV0aG9kTmFtZSkge1xuICBtZXRob2RzW21ldGhvZE5hbWVdID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcbiAgICBmb3IgKGNvbnN0IG5hbWUgaW4gZnJhbWV3b3Jrcykge1xuICAgICAgY29uc3QgZnJhbWV3b3JrID0gZnJhbWV3b3Jrc1tuYW1lXVxuICAgICAgaWYgKGZyYW1ld29yayAmJiBmcmFtZXdvcmtbbWV0aG9kTmFtZV0pIHtcbiAgICAgICAgZnJhbWV3b3JrW21ldGhvZE5hbWVdKC4uLmFyZ3MpXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cblsncmVnaXN0ZXJDb21wb25lbnRzJywgJ3JlZ2lzdGVyTW9kdWxlcycsICdyZWdpc3Rlck1ldGhvZHMnXS5mb3JFYWNoKGdlbkluaXQpXG5cbmZ1bmN0aW9uIGdlbkluc3RhbmNlIChtZXRob2ROYW1lKSB7XG4gIG1ldGhvZHNbbWV0aG9kTmFtZV0gPSBmdW5jdGlvbiAoLi4uYXJncykge1xuICAgIGNvbnN0IGlkID0gYXJnc1swXVxuICAgIGNvbnN0IGluZm8gPSBpbnN0YW5jZU1hcFtpZF1cbiAgICBpZiAoaW5mbyAmJiBmcmFtZXdvcmtzW2luZm8uZnJhbWV3b3JrXSkge1xuICAgICAgcmV0dXJuIGZyYW1ld29ya3NbaW5mby5mcmFtZXdvcmtdW21ldGhvZE5hbWVdKC4uLmFyZ3MpXG4gICAgfVxuICAgIHJldHVybiBuZXcgRXJyb3IoYGludmFsaWQgaW5zdGFuY2UgaWQgXCIke2lkfVwiYClcbiAgfVxufVxuXG5bJ2Rlc3Ryb3lJbnN0YW5jZScsICdyZWZyZXNoSW5zdGFuY2UnLCAnY2FsbEpTJywgJ2dldFJvb3QnXS5mb3JFYWNoKGdlbkluc3RhbmNlKVxuXG5tZXRob2RzLnJlY2VpdmVUYXNrcyA9IG1ldGhvZHMuY2FsbEpTXG5cbmV4cG9ydCBkZWZhdWx0IG1ldGhvZHNcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vaHRtbDUvcnVudGltZS9pbmRleC5qc1xuICoqLyIsImltcG9ydCAqIGFzIFdlZXggZnJvbSAnLi4vZGVmYXVsdCdcblxuZXhwb3J0IGRlZmF1bHQge1xuICBXZWV4XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2h0bWw1L3J1bnRpbWUvZnJhbWV3b3Jrcy5qc1xuICoqLyIsIi8qKlxuICogQGZpbGVPdmVydmlldyBNYWluIGVudHJ5LCBpbnN0YW5jZSBtYW5hZ2VyXG4gKlxuICogLSBjcmVhdGVJbnN0YW5jZShpbnN0YW5jZUlkLCBjb2RlLCBvcHRpb25zLCBkYXRhKVxuICogLSByZWZyZXNoSW5zdGFuY2UoaW5zdGFuY2VJZCwgZGF0YSlcbiAqIC0gZGVzdHJveUluc3RhbmNlKGluc3RhbmNlSWQpXG4gKiAtIHJlZ2lzdGVyQ29tcG9uZW50cyhjb21wb25lbnRzKVxuICogLSByZWdpc3Rlck1vZHVsZXMobW9kdWxlcylcbiAqIC0gZ2V0Um9vdChpbnN0YW5jZUlkKVxuICogLSBpbnN0YW5jZU1hcFxuICogLSBjYWxsSlMoaW5zdGFuY2VJZCwgdGFza3MpXG4gKiAgIC0gZmlyZUV2ZW50KHJlZiwgdHlwZSwgZGF0YSlcbiAqICAgLSBjYWxsYmFjayhmdW5jSWQsIGRhdGEpXG4gKi9cblxuaW1wb3J0IGNvbmZpZyBmcm9tICcuL2NvbmZpZydcbmltcG9ydCBBcHBJbnN0YW5jZSBmcm9tICcuL2FwcCdcbmltcG9ydCBWbSBmcm9tICcuL3ZtJ1xuXG5jb25zdCB7XG4gIG5hdGl2ZUNvbXBvbmVudE1hcFxufSA9IGNvbmZpZ1xuY29uc3QgaW5zdGFuY2VNYXAgPSB7fVxuXG5leHBvcnQgZnVuY3Rpb24gaW5pdCAoY2ZnKSB7XG4gIGNvbmZpZy5Eb2N1bWVudCA9IGNmZy5Eb2N1bWVudFxuICBjb25maWcuRWxlbWVudCA9IGNmZy5FbGVtZW50XG4gIGNvbmZpZy5Db21tZW50ID0gY2ZnLkNvbW1lbnRcbiAgY29uZmlnLnNlbmRUYXNrcyA9IGNmZy5zZW5kVGFza3Ncbn1cblxuLyoqXG4gKiBjcmVhdGUgYSBXZWV4IGluc3RhbmNlXG4gKlxuICogQHBhcmFtICB7c3RyaW5nfSBpbnN0YW5jZUlkXG4gKiBAcGFyYW0gIHtzdHJpbmd9IGNvZGVcbiAqIEBwYXJhbSAge29iamVjdH0gW29wdGlvbnNdIG9wdGlvbiBgSEFTX0xPR2AgZW5hYmxlIHByaW50IGxvZ1xuICogQHBhcmFtICB7b2JqZWN0fSBbZGF0YV1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlIChpbnN0YW5jZUlkLCBjb2RlLCBvcHRpb25zLCBkYXRhKSB7XG4gIGxldCBpbnN0YW5jZSA9IGluc3RhbmNlTWFwW2luc3RhbmNlSWRdXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG5cbiAgY29uZmlnLmRlYnVnID0gb3B0aW9ucy5kZWJ1Z1xuXG4gIGxldCByZXN1bHRcbiAgaWYgKCFpbnN0YW5jZSkge1xuICAgIGluc3RhbmNlID0gbmV3IEFwcEluc3RhbmNlKGluc3RhbmNlSWQsIG9wdGlvbnMpXG4gICAgaW5zdGFuY2VNYXBbaW5zdGFuY2VJZF0gPSBpbnN0YW5jZVxuICAgIHJlc3VsdCA9IGluc3RhbmNlLmluaXQoY29kZSwgZGF0YSlcbiAgfVxuICBlbHNlIHtcbiAgICByZXN1bHQgPSBuZXcgRXJyb3IoYGludmFsaWQgaW5zdGFuY2UgaWQgXCIke2luc3RhbmNlSWR9XCJgKVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG4vKipcbiAqIHJlZnJlc2ggYSBXZWV4IGluc3RhbmNlXG4gKlxuICogQHBhcmFtICB7c3RyaW5nfSBpbnN0YW5jZUlkXG4gKiBAcGFyYW0gIHtvYmplY3R9IGRhdGFcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlZnJlc2hJbnN0YW5jZSAoaW5zdGFuY2VJZCwgZGF0YSkge1xuICBjb25zdCBpbnN0YW5jZSA9IGluc3RhbmNlTWFwW2luc3RhbmNlSWRdXG4gIGxldCByZXN1bHRcbiAgaWYgKGluc3RhbmNlKSB7XG4gICAgcmVzdWx0ID0gaW5zdGFuY2UucmVmcmVzaERhdGEoZGF0YSlcbiAgfVxuICBlbHNlIHtcbiAgICByZXN1bHQgPSBuZXcgRXJyb3IoYGludmFsaWQgaW5zdGFuY2UgaWQgXCIke2luc3RhbmNlSWR9XCJgKVxuICB9XG4gIHJldHVybiByZXN1bHRcbn1cblxuLyoqXG4gKiBkZXN0cm95IGEgV2VleCBpbnN0YW5jZVxuICogQHBhcmFtICB7c3RyaW5nfSBpbnN0YW5jZUlkXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZXN0cm95SW5zdGFuY2UgKGluc3RhbmNlSWQpIHtcbiAgY29uc3QgaW5zdGFuY2UgPSBpbnN0YW5jZU1hcFtpbnN0YW5jZUlkXVxuICBpZiAoIWluc3RhbmNlKSB7XG4gICAgcmV0dXJuIG5ldyBFcnJvcihgaW52YWxpZCBpbnN0YW5jZSBpZCBcIiR7aW5zdGFuY2VJZH1cImApXG4gIH1cblxuICBpbnN0YW5jZS5kZXN0cm95KClcbiAgZGVsZXRlIGluc3RhbmNlTWFwW2luc3RhbmNlSWRdXG4gIHJldHVybiBpbnN0YW5jZU1hcFxufVxuXG4vKipcbiAqIHJlZ2lzdGVyIHRoZSBuYW1lIG9mIGVhY2ggbmF0aXZlIGNvbXBvbmVudFxuICogQHBhcmFtICB7YXJyYXl9IGNvbXBvbmVudHMgYXJyYXkgb2YgbmFtZVxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJDb21wb25lbnRzIChjb21wb25lbnRzKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGNvbXBvbmVudHMpKSB7XG4gICAgY29tcG9uZW50cy5mb3JFYWNoKGZ1bmN0aW9uIHJlZ2lzdGVyIChuYW1lKSB7XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgIGlmICghbmFtZSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbmFtZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgbmF0aXZlQ29tcG9uZW50TWFwW25hbWVdID0gdHJ1ZVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAodHlwZW9mIG5hbWUgPT09ICdvYmplY3QnICYmIHR5cGVvZiBuYW1lLnR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIG5hdGl2ZUNvbXBvbmVudE1hcFtuYW1lLnR5cGVdID0gbmFtZVxuICAgICAgfVxuICAgIH0pXG4gIH1cbn1cblxuLyoqXG4gKiByZWdpc3RlciB0aGUgbmFtZSBhbmQgbWV0aG9kcyBvZiBlYWNoIG1vZHVsZVxuICogQHBhcmFtICB7b2JqZWN0fSBtb2R1bGVzIGEgb2JqZWN0IG9mIG1vZHVsZXNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyTW9kdWxlcyAobW9kdWxlcykge1xuICBpZiAodHlwZW9mIG1vZHVsZXMgPT09ICdvYmplY3QnKSB7XG4gICAgVm0ucmVnaXN0ZXJNb2R1bGVzKG1vZHVsZXMpXG4gIH1cbn1cblxuLyoqXG4gKiByZWdpc3RlciB0aGUgbmFtZSBhbmQgbWV0aG9kcyBvZiBlYWNoIGFwaVxuICogQHBhcmFtICB7b2JqZWN0fSBhcGlzIGEgb2JqZWN0IG9mIGFwaXNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyTWV0aG9kcyAoYXBpcykge1xuICBpZiAodHlwZW9mIGFwaXMgPT09ICdvYmplY3QnKSB7XG4gICAgVm0ucmVnaXN0ZXJNZXRob2RzKGFwaXMpXG4gIH1cbn1cblxuLyoqXG4gKiBnZXQgYSB3aG9sZSBlbGVtZW50IHRyZWUgb2YgYW4gaW5zdGFuY2VcbiAqIGZvciBkZWJ1Z2dpbmdcbiAqIEBwYXJhbSAge3N0cmluZ30gaW5zdGFuY2VJZFxuICogQHJldHVybiB7b2JqZWN0fSBhIHZpcnR1YWwgZG9tIHRyZWVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFJvb3QgKGluc3RhbmNlSWQpIHtcbiAgY29uc3QgaW5zdGFuY2UgPSBpbnN0YW5jZU1hcFtpbnN0YW5jZUlkXVxuICBsZXQgcmVzdWx0XG4gIGlmIChpbnN0YW5jZSkge1xuICAgIHJlc3VsdCA9IGluc3RhbmNlLmdldFJvb3RFbGVtZW50KClcbiAgfVxuICBlbHNlIHtcbiAgICByZXN1bHQgPSBuZXcgRXJyb3IoYGludmFsaWQgaW5zdGFuY2UgaWQgXCIke2luc3RhbmNlSWR9XCJgKVxuICB9XG4gIHJldHVybiByZXN1bHRcbn1cblxuY29uc3QganNIYW5kbGVycyA9IHtcbiAgZmlyZUV2ZW50OiBmdW5jdGlvbiBmaXJlRXZlbnQgKGluc3RhbmNlSWQsIHJlZiwgdHlwZSwgZGF0YSwgZG9tQ2hhbmdlcykge1xuICAgIGNvbnN0IGluc3RhbmNlID0gaW5zdGFuY2VNYXBbaW5zdGFuY2VJZF1cbiAgICByZXR1cm4gaW5zdGFuY2UuZmlyZUV2ZW50KHJlZiwgdHlwZSwgZGF0YSwgZG9tQ2hhbmdlcylcbiAgfSxcblxuICBjYWxsYmFjazogZnVuY3Rpb24gY2FsbGJhY2sgKGluc3RhbmNlSWQsIGZ1bmNJZCwgZGF0YSwgaWZMYXN0KSB7XG4gICAgY29uc3QgaW5zdGFuY2UgPSBpbnN0YW5jZU1hcFtpbnN0YW5jZUlkXVxuICAgIHJldHVybiBpbnN0YW5jZS5jYWxsYmFjayhmdW5jSWQsIGRhdGEsIGlmTGFzdClcbiAgfVxufVxuXG4vKipcbiAqIGFjY2VwdCBjYWxscyBmcm9tIG5hdGl2ZSAoZXZlbnQgb3IgY2FsbGJhY2spXG4gKlxuICogQHBhcmFtICB7c3RyaW5nfSBpbnN0YW5jZUlkXG4gKiBAcGFyYW0gIHthcnJheX0gdGFza3MgbGlzdCB3aXRoIGBtZXRob2RgIGFuZCBgYXJnc2BcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNhbGxKUyAoaW5zdGFuY2VJZCwgdGFza3MpIHtcbiAgY29uc3QgaW5zdGFuY2UgPSBpbnN0YW5jZU1hcFtpbnN0YW5jZUlkXVxuICBpZiAoaW5zdGFuY2UgJiYgQXJyYXkuaXNBcnJheSh0YXNrcykpIHtcbiAgICBjb25zdCByZXN1bHRzID0gW11cbiAgICB0YXNrcy5mb3JFYWNoKCh0YXNrKSA9PiB7XG4gICAgICBjb25zdCBoYW5kbGVyID0ganNIYW5kbGVyc1t0YXNrLm1ldGhvZF1cbiAgICAgIGNvbnN0IGFyZ3MgPSBbLi4udGFzay5hcmdzXVxuICAgICAgaWYgKHR5cGVvZiBoYW5kbGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGFyZ3MudW5zaGlmdChpbnN0YW5jZUlkKVxuICAgICAgICByZXN1bHRzLnB1c2goaGFuZGxlciguLi5hcmdzKSlcbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiByZXN1bHRzXG4gIH1cbiAgcmV0dXJuIG5ldyBFcnJvcihgaW52YWxpZCBpbnN0YW5jZSBpZCBcIiR7aW5zdGFuY2VJZH1cIiBvciB0YXNrc2ApXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2h0bWw1L2RlZmF1bHQvaW5kZXguanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCB7XG4gIG5hdGl2ZUNvbXBvbmVudE1hcDoge1xuICAgIHRleHQ6IHRydWUsXG4gICAgaW1hZ2U6IHRydWUsXG4gICAgY29udGFpbmVyOiB0cnVlLFxuICAgIHNsaWRlcjoge1xuICAgICAgdHlwZTogJ3NsaWRlcicsXG4gICAgICBhcHBlbmQ6ICd0cmVlJ1xuICAgIH0sXG4gICAgY2VsbDoge1xuICAgICAgdHlwZTogJ2NlbGwnLFxuICAgICAgYXBwZW5kOiAndHJlZSdcbiAgICB9XG4gIH0sXG4gIGN1c3RvbUNvbXBvbmVudE1hcDoge30sXG4gIGRlYnVnOiBmYWxzZVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9odG1sNS9kZWZhdWx0L2NvbmZpZy5qc1xuICoqLyIsIi8qKlxuICogQGZpbGVPdmVydmlld1xuICogV2VleCBpbnN0YW5jZSBjb25zdHJ1Y3RvciAmIGRlZmluaXRpb25cbiAqL1xuXG5pbXBvcnQgeyBleHRlbmQsIHR5cG9mIH0gZnJvbSAnLi4vdXRpbCdcbmltcG9ydCAqIGFzIGJ1bmRsZSBmcm9tICcuL2J1bmRsZSdcbmltcG9ydCAqIGFzIGN0cmwgZnJvbSAnLi9jdHJsJ1xuaW1wb3J0IERpZmZlciBmcm9tICcuL2RpZmZlcidcblxuaW1wb3J0IHJlbmRlcmVyIGZyb20gJy4uL2NvbmZpZydcbmltcG9ydCB7IHJlZ2lzdGVyQ29tcG9uZW50LCByZXF1aXJlQ29tcG9uZW50LCByZXF1aXJlTW9kdWxlIH0gZnJvbSAnLi9yZWdpc3RlcidcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQXBwSW5zdGFuY2UgKGluc3RhbmNlSWQsIG9wdGlvbnMpIHtcbiAgdGhpcy5pZCA9IGluc3RhbmNlSWRcbiAgdGhpcy5vcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuICB0aGlzLnZtID0gbnVsbFxuICB0aGlzLmN1c3RvbUNvbXBvbmVudE1hcCA9IHt9XG4gIHRoaXMuY2FsbGJhY2tzID0ge31cbiAgdGhpcy5kb2MgPSBuZXcgcmVuZGVyZXIuRG9jdW1lbnQoXG4gICAgaW5zdGFuY2VJZCxcbiAgICB0aGlzLm9wdGlvbnMuYnVuZGxlVXJsXG4gIClcbiAgdGhpcy5kaWZmZXIgPSBuZXcgRGlmZmVyKGluc3RhbmNlSWQpXG4gIHRoaXMudWlkID0gMFxufVxuXG5mdW5jdGlvbiBub3JtYWxpemUgKGFwcCwgdikge1xuICBjb25zdCB0eXBlID0gdHlwb2YodilcblxuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICd1bmRlZmluZWQnOlxuICAgIGNhc2UgJ251bGwnOlxuICAgICAgcmV0dXJuICcnXG4gICAgY2FzZSAncmVnZXhwJzpcbiAgICAgIHJldHVybiB2LnRvU3RyaW5nKClcbiAgICBjYXNlICdkYXRlJzpcbiAgICAgIHJldHVybiB2LnRvSVNPU3RyaW5nKClcbiAgICBjYXNlICdudW1iZXInOlxuICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgY2FzZSAnYm9vbGVhbic6XG4gICAgY2FzZSAnYXJyYXknOlxuICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICBpZiAodiBpbnN0YW5jZW9mIHJlbmRlcmVyLkVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIHYucmVmXG4gICAgICB9XG4gICAgICByZXR1cm4gdlxuICAgIGNhc2UgJ2Z1bmN0aW9uJzpcbiAgICAgIGFwcC5jYWxsYmFja3NbKythcHAudWlkXSA9IHZcbiAgICAgIHJldHVybiBhcHAudWlkLnRvU3RyaW5nKClcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHYpXG4gIH1cbn1cblxuQXBwSW5zdGFuY2UucHJvdG90eXBlLmNhbGxUYXNrcyA9IGZ1bmN0aW9uICh0YXNrcykge1xuICBpZiAodHlwb2YodGFza3MpICE9PSAnYXJyYXknKSB7XG4gICAgdGFza3MgPSBbdGFza3NdXG4gIH1cblxuICB0YXNrcy5mb3JFYWNoKCh0YXNrKSA9PiB7XG4gICAgdGFzay5hcmdzID0gdGFzay5hcmdzLm1hcChhcmcgPT4gbm9ybWFsaXplKHRoaXMsIGFyZykpXG4gIH0pXG5cbiAgcmV0dXJuIHJlbmRlcmVyLnNlbmRUYXNrcyh0aGlzLmlkLCB0YXNrcywgJy0xJylcbn1cblxuZXh0ZW5kKEFwcEluc3RhbmNlLnByb3RvdHlwZSwgYnVuZGxlLCBjdHJsLCB7XG4gIHJlZ2lzdGVyQ29tcG9uZW50LFxuICByZXF1aXJlQ29tcG9uZW50LFxuICByZXF1aXJlTW9kdWxlXG59KVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2h0bWw1L2RlZmF1bHQvYXBwL2luZGV4LmpzXG4gKiovIiwiLyogZ2xvYmFsIE11dGF0aW9uT2JzZXJ2ZXIgKi9cblxuLy8gLyBsYW5nLmpzXG5cbi8qKlxuICogQ2hlY2sgaWYgYSBzdHJpbmcgc3RhcnRzIHdpdGggJCBvciBfXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gaXNSZXNlcnZlZCAoc3RyKSB7XG4gIGNvbnN0IGMgPSAoc3RyICsgJycpLmNoYXJDb2RlQXQoMClcbiAgcmV0dXJuIGMgPT09IDB4MjQgfHwgYyA9PT0gMHg1RlxufVxuXG4vKipcbiAqIERlZmluZSBhIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAqIEBwYXJhbSB7Kn0gdmFsXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtlbnVtZXJhYmxlXVxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBkZWYgKG9iaiwga2V5LCB2YWwsIGVudW1lcmFibGUpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgdmFsdWU6IHZhbCxcbiAgICBlbnVtZXJhYmxlOiAhIWVudW1lcmFibGUsXG4gICAgd3JpdGFibGU6IHRydWUsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlXG4gIH0pXG59XG5cbi8vIC8gZW52LmpzXG5cbi8vIGNhbiB3ZSB1c2UgX19wcm90b19fP1xuZXhwb3J0IGNvbnN0IGhhc1Byb3RvID0gJ19fcHJvdG9fXycgaW4ge31cblxuLy8gQnJvd3NlciBlbnZpcm9ubWVudCBzbmlmZmluZ1xuZXhwb3J0IGNvbnN0IGluQnJvd3NlciA9XG4gIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh3aW5kb3cpICE9PSAnW29iamVjdCBPYmplY3RdJ1xuXG4vLyBkZXRlY3QgZGV2dG9vbHNcbmV4cG9ydCBjb25zdCBkZXZ0b29scyA9IGluQnJvd3NlciAmJiB3aW5kb3cuX19WVUVfREVWVE9PTFNfR0xPQkFMX0hPT0tfX1xuXG4vLyBVQSBzbmlmZmluZyBmb3Igd29ya2luZyBhcm91bmQgYnJvd3Nlci1zcGVjaWZpYyBxdWlya3NcbmNvbnN0IFVBID0gaW5Ccm93c2VyICYmIHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKClcbmNvbnN0IGlzSW9zID0gVUEgJiYgLyhpcGhvbmV8aXBhZHxpcG9kfGlvcykvaS50ZXN0KFVBKVxuY29uc3QgaXNXZWNoYXQgPSBVQSAmJiBVQS5pbmRleE9mKCdtaWNyb21lc3NlbmdlcicpID4gMFxuXG4vKipcbiAqIERlZmVyIGEgdGFzayB0byBleGVjdXRlIGl0IGFzeW5jaHJvbm91c2x5LiBJZGVhbGx5IHRoaXNcbiAqIHNob3VsZCBiZSBleGVjdXRlZCBhcyBhIG1pY3JvdGFzaywgc28gd2UgbGV2ZXJhZ2VcbiAqIE11dGF0aW9uT2JzZXJ2ZXIgaWYgaXQncyBhdmFpbGFibGUsIGFuZCBmYWxsYmFjayB0b1xuICogc2V0VGltZW91dCgwKS5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYlxuICogQHBhcmFtIHtPYmplY3R9IGN0eFxuICovXG5cbmV4cG9ydCBjb25zdCBuZXh0VGljayA9IChmdW5jdGlvbiAoKSB7XG4gIGxldCBjYWxsYmFja3MgPSBbXVxuICBsZXQgcGVuZGluZyA9IGZhbHNlXG4gIGxldCB0aW1lckZ1bmNcbiAgZnVuY3Rpb24gbmV4dFRpY2tIYW5kbGVyICgpIHtcbiAgICBwZW5kaW5nID0gZmFsc2VcbiAgICBjb25zdCBjb3BpZXMgPSBjYWxsYmFja3Muc2xpY2UoMClcbiAgICBjYWxsYmFja3MgPSBbXVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29waWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb3BpZXNbaV0oKVxuICAgIH1cbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICBpZiAodHlwZW9mIE11dGF0aW9uT2JzZXJ2ZXIgIT09ICd1bmRlZmluZWQnICYmICEoaXNXZWNoYXQgJiYgaXNJb3MpKSB7XG4gICAgbGV0IGNvdW50ZXIgPSAxXG4gICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihuZXh0VGlja0hhbmRsZXIpXG4gICAgY29uc3QgdGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjb3VudGVyKVxuICAgIG9ic2VydmVyLm9ic2VydmUodGV4dE5vZGUsIHtcbiAgICAgIGNoYXJhY3RlckRhdGE6IHRydWVcbiAgICB9KVxuICAgIHRpbWVyRnVuYyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvdW50ZXIgPSAoY291bnRlciArIDEpICUgMlxuICAgICAgdGV4dE5vZGUuZGF0YSA9IGNvdW50ZXJcbiAgICB9XG4gIH1cbiAgZWxzZSB7XG4gICAgLy8gd2VicGFjayBhdHRlbXB0cyB0byBpbmplY3QgYSBzaGltIGZvciBzZXRJbW1lZGlhdGVcbiAgICAvLyBpZiBpdCBpcyB1c2VkIGFzIGEgZ2xvYmFsLCBzbyB3ZSBoYXZlIHRvIHdvcmsgYXJvdW5kIHRoYXQgdG9cbiAgICAvLyBhdm9pZCBidW5kbGluZyB1bm5lY2Vzc2FyeSBjb2RlLlxuICAgIGNvbnN0IGNvbnRleHQgPSBpbkJyb3dzZXJcbiAgICAgID8gd2luZG93XG4gICAgICA6IHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsIDoge31cbiAgICB0aW1lckZ1bmMgPSBjb250ZXh0LnNldEltbWVkaWF0ZSB8fCBzZXRUaW1lb3V0XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uIChjYiwgY3R4KSB7XG4gICAgY29uc3QgZnVuYyA9IGN0eFxuICAgICAgPyBmdW5jdGlvbiAoKSB7IGNiLmNhbGwoY3R4KSB9XG4gICAgICA6IGNiXG4gICAgY2FsbGJhY2tzLnB1c2goZnVuYylcbiAgICBpZiAocGVuZGluZykgcmV0dXJuXG4gICAgcGVuZGluZyA9IHRydWVcbiAgICB0aW1lckZ1bmMobmV4dFRpY2tIYW5kbGVyLCAwKVxuICB9XG59KSgpXG5cbmxldCBfU2V0XG4vKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbmlmICh0eXBlb2YgU2V0ICE9PSAndW5kZWZpbmVkJyAmJiBTZXQudG9TdHJpbmcoKS5tYXRjaCgvbmF0aXZlIGNvZGUvKSkge1xuICAvLyB1c2UgbmF0aXZlIFNldCB3aGVuIGF2YWlsYWJsZS5cbiAgX1NldCA9IFNldFxufVxuZWxzZSB7XG4gIC8vIGEgbm9uLXN0YW5kYXJkIFNldCBwb2x5ZmlsbCB0aGF0IG9ubHkgd29ya3Mgd2l0aCBwcmltaXRpdmUga2V5cy5cbiAgX1NldCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnNldCA9IE9iamVjdC5jcmVhdGUobnVsbClcbiAgfVxuICBfU2V0LnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgcmV0dXJuIHRoaXMuc2V0W2tleV0gIT09IHVuZGVmaW5lZFxuICB9XG4gIF9TZXQucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICB0aGlzLnNldFtrZXldID0gMVxuICB9XG4gIF9TZXQucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc2V0ID0gT2JqZWN0LmNyZWF0ZShudWxsKVxuICB9XG59XG5cbmV4cG9ydCB7IF9TZXQgfVxuXG4vLyAvIHNoYXJlZFxuXG4vKipcbiAqIFJlbW92ZSBhbiBpdGVtIGZyb20gYW4gYXJyYXlcbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJcbiAqIEBwYXJhbSB7Kn0gaXRlbVxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmUgKGFyciwgaXRlbSkge1xuICBpZiAoYXJyLmxlbmd0aCkge1xuICAgIGNvbnN0IGluZGV4ID0gYXJyLmluZGV4T2YoaXRlbSlcbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgcmV0dXJuIGFyci5zcGxpY2UoaW5kZXgsIDEpXG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQ2hlY2sgd2hldGhlciB0aGUgb2JqZWN0IGhhcyB0aGUgcHJvcGVydHkuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xuY29uc3QgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5XG5leHBvcnQgZnVuY3Rpb24gaGFzT3duIChvYmosIGtleSkge1xuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSlcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBjYWNoZWQgdmVyc2lvbiBvZiBhIHB1cmUgZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBjYWNoZWQgKGZuKSB7XG4gIGNvbnN0IGNhY2hlID0gT2JqZWN0LmNyZWF0ZShudWxsKVxuICByZXR1cm4gZnVuY3Rpb24gY2FjaGVkRm4gKHN0cikge1xuICAgIGNvbnN0IGhpdCA9IGNhY2hlW3N0cl1cbiAgICByZXR1cm4gaGl0IHx8IChjYWNoZVtzdHJdID0gZm4oc3RyKSlcbiAgfVxufVxuXG4vKipcbiAqIENhbWVsaXplIGEgaHlwaGVuLWRlbG1pdGVkIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cblxuY29uc3QgY2FtZWxpemVSRSA9IC8tKFxcdykvZ1xuZXhwb3J0IGNvbnN0IGNhbWVsaXplID0gY2FjaGVkKHN0ciA9PiB7XG4gIHJldHVybiBzdHIucmVwbGFjZShjYW1lbGl6ZVJFLCB0b1VwcGVyKVxufSlcblxuZnVuY3Rpb24gdG9VcHBlciAoXywgYykge1xuICByZXR1cm4gYyA/IGMudG9VcHBlckNhc2UoKSA6ICcnXG59XG5cbi8qKlxuICogSHlwaGVuYXRlIGEgY2FtZWxDYXNlIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cblxuY29uc3QgaHlwaGVuYXRlUkUgPSAvKFthLXpcXGRdKShbQS1aXSkvZ1xuZXhwb3J0IGNvbnN0IGh5cGhlbmF0ZSA9IGNhY2hlZChzdHIgPT4ge1xuICByZXR1cm4gc3RyXG4gICAgLnJlcGxhY2UoaHlwaGVuYXRlUkUsICckMS0kMicpXG4gICAgLnRvTG93ZXJDYXNlKClcbn0pXG5cbi8qKlxuICogU2ltcGxlIGJpbmQsIGZhc3RlciB0aGFuIG5hdGl2ZVxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge09iamVjdH0gY3R4XG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gYmluZCAoZm4sIGN0eCkge1xuICByZXR1cm4gZnVuY3Rpb24gKGEpIHtcbiAgICBjb25zdCBsID0gYXJndW1lbnRzLmxlbmd0aFxuICAgIHJldHVybiBsXG4gICAgICA/IGwgPiAxXG4gICAgICAgID8gZm4uYXBwbHkoY3R4LCBhcmd1bWVudHMpXG4gICAgICAgIDogZm4uY2FsbChjdHgsIGEpXG4gICAgICA6IGZuLmNhbGwoY3R4KVxuICB9XG59XG5cbi8qKlxuICogQ29udmVydCBhbiBBcnJheS1saWtlIG9iamVjdCB0byBhIHJlYWwgQXJyYXkuXG4gKlxuICogQHBhcmFtIHtBcnJheS1saWtlfSBsaXN0XG4gKiBAcGFyYW0ge051bWJlcn0gW3N0YXJ0XSAtIHN0YXJ0IGluZGV4XG4gKiBAcmV0dXJuIHtBcnJheX1cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gdG9BcnJheSAobGlzdCwgc3RhcnQpIHtcbiAgc3RhcnQgPSBzdGFydCB8fCAwXG4gIGxldCBpID0gbGlzdC5sZW5ndGggLSBzdGFydFxuICBjb25zdCByZXQgPSBuZXcgQXJyYXkoaSlcbiAgd2hpbGUgKGktLSkge1xuICAgIHJldFtpXSA9IGxpc3RbaSArIHN0YXJ0XVxuICB9XG4gIHJldHVybiByZXRcbn1cblxuLyoqXG4gKiBNaXggcHJvcGVydGllcyBpbnRvIHRhcmdldCBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHRvXG4gKiBAcGFyYW0ge09iamVjdH0gZnJvbVxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBleHRlbmQgKHRhcmdldCwgLi4uc3JjKSB7XG4gIGlmICh0eXBlb2YgT2JqZWN0LmFzc2lnbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIE9iamVjdC5hc3NpZ24odGFyZ2V0LCAuLi5zcmMpXG4gIH1cbiAgZWxzZSB7XG4gICAgY29uc3QgZmlyc3QgPSBzcmMuc2hpZnQoKVxuICAgIGZvciAoY29uc3Qga2V5IGluIGZpcnN0KSB7XG4gICAgICB0YXJnZXRba2V5XSA9IGZpcnN0W2tleV1cbiAgICB9XG4gICAgaWYgKHNyYy5sZW5ndGgpIHtcbiAgICAgIGV4dGVuZCh0YXJnZXQsIC4uLnNyYylcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRhcmdldFxufVxuXG4vKipcbiAqIFF1aWNrIG9iamVjdCBjaGVjayAtIHRoaXMgaXMgcHJpbWFyaWx5IHVzZWQgdG8gdGVsbFxuICogT2JqZWN0cyBmcm9tIHByaW1pdGl2ZSB2YWx1ZXMgd2hlbiB3ZSBrbm93IHRoZSB2YWx1ZVxuICogaXMgYSBKU09OLWNvbXBsaWFudCB0eXBlLlxuICpcbiAqIEBwYXJhbSB7Kn0gb2JqXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBpc09iamVjdCAob2JqKSB7XG4gIHJldHVybiBvYmogIT09IG51bGwgJiYgdHlwZW9mIG9iaiA9PT0gJ29iamVjdCdcbn1cblxuLyoqXG4gKiBTdHJpY3Qgb2JqZWN0IHR5cGUgY2hlY2suIE9ubHkgcmV0dXJucyB0cnVlXG4gKiBmb3IgcGxhaW4gSmF2YVNjcmlwdCBvYmplY3RzLlxuICpcbiAqIEBwYXJhbSB7Kn0gb2JqXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5cbmNvbnN0IHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ1xuY29uc3QgT0JKRUNUX1NUUklORyA9ICdbb2JqZWN0IE9iamVjdF0nXG5leHBvcnQgZnVuY3Rpb24gaXNQbGFpbk9iamVjdCAob2JqKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKG9iaikgPT09IE9CSkVDVF9TVFJJTkdcbn1cblxuLyoqXG4gKiBBcnJheSB0eXBlIGNoZWNrLlxuICpcbiAqIEBwYXJhbSB7Kn0gb2JqXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5cbmV4cG9ydCBjb25zdCBpc0FycmF5ID0gQXJyYXkuaXNBcnJheVxuXG4vLyAvIG90aGVyXG5cbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdpZnkgKHgpIHtcbiAgcmV0dXJuIHR5cGVvZiB4ID09PSAndW5kZWZpbmVkJyB8fCB4ID09PSBudWxsIHx8IHR5cGVvZiAoeCkgPT09ICdmdW5jdGlvbidcbiAgICA/ICcnXG4gICAgOiB0eXBlb2YgeCA9PT0gJ29iamVjdCdcbiAgICAgID8geCBpbnN0YW5jZW9mIFJlZ0V4cFxuICAgICAgICA/IHgudG9TdHJpbmcoKVxuICAgICAgICA6IHggaW5zdGFuY2VvZiBEYXRlXG4gICAgICAgICAgPyBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHgpKVxuICAgICAgICAgIDogSlNPTi5zdHJpbmdpZnkoeClcbiAgICAgIDogeC50b1N0cmluZygpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0eXBvZiAodikge1xuICBjb25zdCBzID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHYpXG4gIHJldHVybiBzLnN1YnN0cmluZyg4LCBzLmxlbmd0aCAtIDEpLnRvTG93ZXJDYXNlKClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZSAodikge1xuICBjb25zdCB0eXBlID0gdHlwb2YodilcblxuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICd1bmRlZmluZWQnOlxuICAgIGNhc2UgJ251bGwnOlxuICAgICAgcmV0dXJuICcnXG4gICAgY2FzZSAncmVnZXhwJzpcbiAgICAgIHJldHVybiB2LnRvU3RyaW5nKClcbiAgICBjYXNlICdkYXRlJzpcbiAgICAgIHJldHVybiB2LnRvSVNPU3RyaW5nKClcbiAgICBjYXNlICdudW1iZXInOlxuICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgY2FzZSAnYm9vbGVhbic6XG4gICAgY2FzZSAnYXJyYXknOlxuICAgIGNhc2UgJ29iamVjdCc6XG4gICAgY2FzZSAnZnVuY3Rpb24nOlxuICAgICAgcmV0dXJuIHZcbiAgfVxufVxuXG5jb25zdCBlbmFibGVMb2cgPSB0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiYgZ2xvYmFsLklTX1BST0RVQ1QgIT09IHRydWVcblxuLyoqXG4gKiBAcGFyYW0ge1N0cmluZ30gbXNnXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlcnJvciAoLi4uYXJncykge1xuICBlbmFibGVMb2cgJiYgY29uc29sZS5lcnJvciAmJiBjb25zb2xlLmVycm9yKCdbSlMgRnJhbWV3b3JrXScsIC4uLmFyZ3MpXG59XG5cbi8qKlxuICogQHBhcmFtIHtTdHJpbmd9IG1zZ1xuICovXG5leHBvcnQgZnVuY3Rpb24gd2FybiAoLi4uYXJncykge1xuICBlbmFibGVMb2cgJiYgY29uc29sZS53YXJuICYmIGNvbnNvbGUud2FybignW0pTIEZyYW1ld29ya10nLCAuLi5hcmdzKVxufVxuXG4vKipcbiAqIEBwYXJhbSB7U3RyaW5nfSBtc2dcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluZm8gKC4uLmFyZ3MpIHtcbiAgZW5hYmxlTG9nICYmIGNvbnNvbGUuaW5mbyAmJiBjb25zb2xlLmluZm8oJ1tKUyBGcmFtZXdvcmtdJywgLi4uYXJncylcbn1cblxuLyoqXG4gKiBAcGFyYW0ge1N0cmluZ30gbXNnXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWJ1ZyAoLi4uYXJncykge1xuICBlbmFibGVMb2cgJiYgY29uc29sZS5kZWJ1ZyAmJiBjb25zb2xlLmRlYnVnKCdbSlMgRnJhbWV3b3JrXScsIC4uLmFyZ3MpXG59XG5cbi8qKlxuICogQHBhcmFtIHtTdHJpbmd9IG1zZ1xuICovXG5leHBvcnQgZnVuY3Rpb24gbG9nICguLi5hcmdzKSB7XG4gIGVuYWJsZUxvZyAmJiBjb25zb2xlLmxvZyAmJiBjb25zb2xlLmxvZygnW0pTIEZyYW1ld29ya10nLCAuLi5hcmdzKVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9odG1sNS9kZWZhdWx0L3V0aWwvaW5kZXguanNcbiAqKi8iLCIvKipcbiAqIEBmaWxlT3ZlcnZpZXdcbiAqIGFwaSB0aGF0IGludm9rZWQgYnkganMgYnVuZGxlIGNvZGVcbiAqXG4gKiAtIGRlZmluZShuYW1lLCBmYWN0b3J5KTogZGVmaW5lIGEgbmV3IGNvbXBvc2VkIGNvbXBvbmVudCB0eXBlXG4gKiAtIGJvb3RzdHJhcCh0eXBlLCBjb25maWcsIGRhdGEpOiByZXF1aXJlIGEgY2VydGFpbiB0eXBlICZcbiAqICAgICAgICAgcmVuZGVyIHdpdGggKG9wdGlvbmFsKSBkYXRhXG4gKlxuICogZGVwcmVjYXRlZDpcbiAqIC0gcmVnaXN0ZXIodHlwZSwgb3B0aW9ucyk6IHJlZ2lzdGVyIGEgbmV3IGNvbXBvc2VkIGNvbXBvbmVudCB0eXBlXG4gKiAtIHJlbmRlcih0eXBlLCBkYXRhKTogcmVuZGVyIGJ5IGEgY2VydGFpbiB0eXBlIHdpdGggKG9wdGlvbmFsKSBkYXRhXG4gKiAtIHJlcXVpcmUodHlwZSkoZGF0YSk6IHJlcXVpcmUgYSB0eXBlIHRoZW4gcmVuZGVyIHdpdGggZGF0YVxuICovXG5cbmltcG9ydCBzZW12ZXIgZnJvbSAnc2VtdmVyJ1xuaW1wb3J0ICogYXMgXyBmcm9tICcuLi91dGlsJ1xuaW1wb3J0IFZtIGZyb20gJy4uL3ZtJ1xuaW1wb3J0ICogYXMgZG93bmdyYWRlIGZyb20gJy4vZG93bmdyYWRlJ1xuXG5jb25zdCBXRUVYX0NPTVBPTkVOVF9SRUcgPSAvXkB3ZWV4LWNvbXBvbmVudFxcLy9cbmNvbnN0IFdFRVhfTU9EVUxFX1JFRyA9IC9eQHdlZXgtbW9kdWxlXFwvL1xuY29uc3QgTk9STUFMX01PRFVMRV9SRUcgPSAvXlxcLnsxLDJ9XFwvL1xuY29uc3QgSlNfU1VSRklYX1JFRyA9IC9cXC5qcyQvXG5cbmNvbnN0IGlzV2VleENvbXBvbmVudCA9IG5hbWUgPT4gISFuYW1lLm1hdGNoKFdFRVhfQ09NUE9ORU5UX1JFRylcbmNvbnN0IGlzV2VleE1vZHVsZSA9IG5hbWUgPT4gISFuYW1lLm1hdGNoKFdFRVhfTU9EVUxFX1JFRylcbmNvbnN0IGlzTm9ybWFsTW9kdWxlID0gbmFtZSA9PiAhIW5hbWUubWF0Y2goTk9STUFMX01PRFVMRV9SRUcpXG5jb25zdCBpc05wbU1vZHVsZSA9IG5hbWUgPT4gIWlzV2VleENvbXBvbmVudChuYW1lKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIWlzV2VleE1vZHVsZShuYW1lKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIWlzTm9ybWFsTW9kdWxlKG5hbWUpXG5cbmZ1bmN0aW9uIHJlbW92ZVdlZXhQcmVmaXggKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoV0VFWF9DT01QT05FTlRfUkVHLCAnJylcbiAgICAgICAgICAucmVwbGFjZShXRUVYX01PRFVMRV9SRUcsICcnKVxufVxuXG5mdW5jdGlvbiByZW1vdmVKU1N1cmZpeCAoc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZShKU19TVVJGSVhfUkVHLCAnJylcbn1cblxubGV0IGNvbW1vbk1vZHVsZXMgPSB7fVxuXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJDb21tb25Nb2R1bGVzICgpIHtcbiAgY29tbW9uTW9kdWxlcyA9IHt9XG59XG5cbi8vIGRlZmluZShuYW1lLCBmYWN0b3J5KSBmb3IgcHJpbWFyeSB1c2FnZVxuLy8gb3Jcbi8vIGRlZmluZShuYW1lLCBkZXBzLCBmYWN0b3J5KSBmb3IgY29tcGF0aWJpbGl0eVxuLy8gTm90aWNlOiBETyBOT1QgdXNlIGZ1bmN0aW9uIGRlZmluZSgpIHt9LFxuLy8gaXQgd2lsbCBjYXVzZSBlcnJvciBhZnRlciBidWlsZGVkIGJ5IHdlYnBhY2tcbmV4cG9ydCBjb25zdCBkZWZpbmUgPSBmdW5jdGlvbiAobmFtZSwgZGVwcywgZmFjdG9yeSkge1xuICBfLmRlYnVnKCdkZWZpbmUgYSBjb21wb25lbnQnLCBuYW1lKVxuXG4gIGlmIChfLnR5cG9mKGRlcHMpID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZmFjdG9yeSA9IGRlcHNcbiAgICBkZXBzID0gW11cbiAgfVxuXG4gIGNvbnN0IF9yZXF1aXJlID0gKG5hbWUpID0+IHtcbiAgICBsZXQgY2xlYW5OYW1lXG5cbiAgICBpZiAoaXNXZWV4Q29tcG9uZW50KG5hbWUpKSB7XG4gICAgICBjbGVhbk5hbWUgPSByZW1vdmVXZWV4UHJlZml4KG5hbWUpXG4gICAgICByZXR1cm4gdGhpcy5yZXF1aXJlQ29tcG9uZW50KGNsZWFuTmFtZSlcbiAgICB9XG4gICAgaWYgKGlzV2VleE1vZHVsZShuYW1lKSkge1xuICAgICAgY2xlYW5OYW1lID0gcmVtb3ZlV2VleFByZWZpeChuYW1lKVxuICAgICAgcmV0dXJuIHRoaXMucmVxdWlyZU1vZHVsZShjbGVhbk5hbWUpXG4gICAgfVxuICAgIGlmIChpc05vcm1hbE1vZHVsZShuYW1lKSkge1xuICAgICAgY2xlYW5OYW1lID0gcmVtb3ZlSlNTdXJmaXgobmFtZSlcbiAgICAgIHJldHVybiBjb21tb25Nb2R1bGVzW25hbWVdXG4gICAgfVxuICAgIGlmIChpc05wbU1vZHVsZShuYW1lKSkge1xuICAgICAgY2xlYW5OYW1lID0gcmVtb3ZlSlNTdXJmaXgobmFtZSlcbiAgICAgIHJldHVybiBjb21tb25Nb2R1bGVzW25hbWVdXG4gICAgfVxuICB9XG4gIGNvbnN0IF9tb2R1bGUgPSB7IGV4cG9ydHM6IHt9fVxuXG4gIGxldCBjbGVhbk5hbWVcbiAgaWYgKGlzV2VleENvbXBvbmVudChuYW1lKSkge1xuICAgIGNsZWFuTmFtZSA9IHJlbW92ZVdlZXhQcmVmaXgobmFtZSlcblxuICAgIGZhY3RvcnkoX3JlcXVpcmUsIF9tb2R1bGUuZXhwb3J0cywgX21vZHVsZSlcblxuICAgIHRoaXMucmVnaXN0ZXJDb21wb25lbnQoY2xlYW5OYW1lLCBfbW9kdWxlLmV4cG9ydHMpXG4gIH1cbiAgZWxzZSBpZiAoaXNXZWV4TW9kdWxlKG5hbWUpKSB7XG4gICAgY2xlYW5OYW1lID0gcmVtb3ZlV2VleFByZWZpeChuYW1lKVxuXG4gICAgZmFjdG9yeShfcmVxdWlyZSwgX21vZHVsZS5leHBvcnRzLCBfbW9kdWxlKVxuXG4gICAgVm0ucmVnaXN0ZXJNb2R1bGVzKHtcbiAgICAgIFtjbGVhbk5hbWVdOiBfbW9kdWxlLmV4cG9ydHNcbiAgICB9KVxuICB9XG4gIGVsc2UgaWYgKGlzTm9ybWFsTW9kdWxlKG5hbWUpKSB7XG4gICAgY2xlYW5OYW1lID0gcmVtb3ZlSlNTdXJmaXgobmFtZSlcblxuICAgIGZhY3RvcnkoX3JlcXVpcmUsIF9tb2R1bGUuZXhwb3J0cywgX21vZHVsZSlcblxuICAgIGNvbW1vbk1vZHVsZXNbY2xlYW5OYW1lXSA9IF9tb2R1bGUuZXhwb3J0c1xuICB9XG4gIGVsc2UgaWYgKGlzTnBtTW9kdWxlKG5hbWUpKSB7XG4gICAgY2xlYW5OYW1lID0gcmVtb3ZlSlNTdXJmaXgobmFtZSlcblxuICAgIGZhY3RvcnkoX3JlcXVpcmUsIF9tb2R1bGUuZXhwb3J0cywgX21vZHVsZSlcblxuICAgIGNvbnN0IGV4cG9ydHMgPSBfbW9kdWxlLmV4cG9ydHNcbiAgICBpZiAoZXhwb3J0cy50ZW1wbGF0ZSB8fFxuICAgICAgICBleHBvcnRzLnN0eWxlIHx8XG4gICAgICAgIGV4cG9ydHMubWV0aG9kcykge1xuICAgICAgLy8gZG93bmdyYWRlIHRvIG9sZCBkZWZpbmUgbWV0aG9kIChkZWZpbmUoJ2NvbXBvbmVudE5hbWUnLCBmYWN0b3J5KSlcbiAgICAgIC8vIHRoZSBleHBvcnRzIGNvbnRhaW4gb25lIGtleSBvZiB0ZW1wbGF0ZSwgc3R5bGUgb3IgbWV0aG9kc1xuICAgICAgLy8gYnV0IGl0IGhhcyByaXNrISEhXG4gICAgICB0aGlzLnJlZ2lzdGVyQ29tcG9uZW50KGNsZWFuTmFtZSwgZXhwb3J0cylcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBjb21tb25Nb2R1bGVzW2NsZWFuTmFtZV0gPSBfbW9kdWxlLmV4cG9ydHNcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJvb3RzdHJhcCAobmFtZSwgY29uZmlnLCBkYXRhKSB7XG4gIF8uZGVidWcoYGJvb3RzdHJhcCBmb3IgJHtuYW1lfWApXG5cbiAgbGV0IGNsZWFuTmFtZVxuXG4gIGlmIChpc1dlZXhDb21wb25lbnQobmFtZSkpIHtcbiAgICBjbGVhbk5hbWUgPSByZW1vdmVXZWV4UHJlZml4KG5hbWUpXG4gIH1cbiAgZWxzZSBpZiAoaXNOcG1Nb2R1bGUobmFtZSkpIHtcbiAgICBjbGVhbk5hbWUgPSByZW1vdmVKU1N1cmZpeChuYW1lKVxuICAgIC8vIGNoZWNrIGlmIGRlZmluZSBieSBvbGQgJ2RlZmluZScgbWV0aG9kXG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKCF0aGlzLmN1c3RvbUNvbXBvbmVudE1hcFtjbGVhbk5hbWVdKSB7XG4gICAgICByZXR1cm4gbmV3IEVycm9yKGBJdCdzIG5vdCBhIGNvbXBvbmVudDogJHtuYW1lfWApXG4gICAgfVxuICB9XG4gIGVsc2Uge1xuICAgIHJldHVybiBuZXcgRXJyb3IoYFdyb25nIGNvbXBvbmVudCBuYW1lOiAke25hbWV9YClcbiAgfVxuXG4gIGNvbmZpZyA9IF8uaXNQbGFpbk9iamVjdChjb25maWcpID8gY29uZmlnIDoge31cblxuICBpZiAodHlwZW9mIGNvbmZpZy50cmFuc2Zvcm1lclZlcnNpb24gPT09ICdzdHJpbmcnICYmXG4gICAgdHlwZW9mIGdsb2JhbC5uZWVkVHJhbnNmb3JtZXJWZXJzaW9uID09PSAnc3RyaW5nJyAmJlxuICAgICFzZW12ZXIuc2F0aXNmaWVzKGNvbmZpZy50cmFuc2Zvcm1lclZlcnNpb24sXG4gICAgICBnbG9iYWwubmVlZFRyYW5zZm9ybWVyVmVyc2lvbikpIHtcbiAgICByZXR1cm4gbmV3IEVycm9yKGBKUyBCdW5kbGUgdmVyc2lvbjogJHtjb25maWcudHJhbnNmb3JtZXJWZXJzaW9ufSBgICtcbiAgICAgIGBub3QgY29tcGF0aWJsZSB3aXRoICR7Z2xvYmFsLm5lZWRUcmFuc2Zvcm1lclZlcnNpb259YClcbiAgfVxuXG4gIGNvbnN0IF9jaGVja0Rvd25ncmFkZSA9IGRvd25ncmFkZS5jaGVjayhjb25maWcuZG93bmdyYWRlKVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgaWYgKF9jaGVja0Rvd25ncmFkZS5pc0Rvd25ncmFkZSkge1xuICAgIHRoaXMuY2FsbFRhc2tzKFt7XG4gICAgICBtb2R1bGU6ICdpbnN0YW5jZVdyYXAnLFxuICAgICAgbWV0aG9kOiAnZXJyb3InLFxuICAgICAgYXJnczogW1xuICAgICAgICBfY2hlY2tEb3duZ3JhZGUuZXJyb3JUeXBlLFxuICAgICAgICBfY2hlY2tEb3duZ3JhZGUuY29kZSxcbiAgICAgICAgX2NoZWNrRG93bmdyYWRlLmVycm9yTWVzc2FnZVxuICAgICAgXVxuICAgIH1dKVxuICAgIHJldHVybiBuZXcgRXJyb3IoYERvd25ncmFkZVske19jaGVja0Rvd25ncmFkZS5jb2RlfV06ICR7X2NoZWNrRG93bmdyYWRlLmVycm9yTWVzc2FnZX1gKVxuICB9XG5cbiAgdGhpcy52bSA9IG5ldyBWbShjbGVhbk5hbWUsIG51bGwsIHsgX2FwcDogdGhpcyB9LCBudWxsLCBkYXRhKVxufVxuXG4vKipcbiAqIEBkZXByZWNhdGVkXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlciAodHlwZSwgb3B0aW9ucykge1xuICBfLndhcm4oJ1JlZ2lzdGVyIGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSBpbnN0YWxsIGxhc3Rlc3QgdHJhbnNmb3JtZXIuJylcbiAgdGhpcy5yZWdpc3RlckNvbXBvbmVudCh0eXBlLCBvcHRpb25zKVxufVxuXG4vKipcbiAqIEBkZXByZWNhdGVkXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXIgKHR5cGUsIGRhdGEpIHtcbiAgXy53YXJuKCdSZW5kZXIgaXMgZGVwcmVjYXRlZCwgcGxlYXNlIGluc3RhbGwgbGFzdGVzdCB0cmFuc2Zvcm1lci4nKVxuICByZXR1cm4gdGhpcy5ib290c3RyYXAodHlwZSwge30sIGRhdGEpXG59XG5cbi8qKlxuICogQGRlcHJlY2F0ZWRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlcXVpcmUgKHR5cGUpIHtcbiAgXy53YXJuKCdSZXF1aXJlIGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSBpbnN0YWxsIGxhc3Rlc3QgdHJhbnNmb3JtZXIuJylcbiAgcmV0dXJuIChkYXRhKSA9PiB7XG4gICAgcmV0dXJuIHRoaXMuYm9vdHN0cmFwKHR5cGUsIHt9LCBkYXRhKVxuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2h0bWw1L2RlZmF1bHQvYXBwL2J1bmRsZS5qc1xuICoqLyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IFNlbVZlcjtcblxuLy8gVGhlIGRlYnVnIGZ1bmN0aW9uIGlzIGV4Y2x1ZGVkIGVudGlyZWx5IGZyb20gdGhlIG1pbmlmaWVkIHZlcnNpb24uXG4vKiBub21pbiAqLyB2YXIgZGVidWc7XG4vKiBub21pbiAqLyBpZiAodHlwZW9mIHByb2Nlc3MgPT09ICdvYmplY3QnICYmXG4gICAgLyogbm9taW4gKi8gcHJvY2Vzcy5lbnYgJiZcbiAgICAvKiBub21pbiAqLyBwcm9jZXNzLmVudi5OT0RFX0RFQlVHICYmXG4gICAgLyogbm9taW4gKi8gL1xcYnNlbXZlclxcYi9pLnRlc3QocHJvY2Vzcy5lbnYuTk9ERV9ERUJVRykpXG4gIC8qIG5vbWluICovIGRlYnVnID0gZnVuY3Rpb24oKSB7XG4gICAgLyogbm9taW4gKi8gdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuICAgIC8qIG5vbWluICovIGFyZ3MudW5zaGlmdCgnU0VNVkVSJyk7XG4gICAgLyogbm9taW4gKi8gY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgYXJncyk7XG4gICAgLyogbm9taW4gKi8gfTtcbi8qIG5vbWluICovIGVsc2VcbiAgLyogbm9taW4gKi8gZGVidWcgPSBmdW5jdGlvbigpIHt9O1xuXG4vLyBOb3RlOiB0aGlzIGlzIHRoZSBzZW12ZXIub3JnIHZlcnNpb24gb2YgdGhlIHNwZWMgdGhhdCBpdCBpbXBsZW1lbnRzXG4vLyBOb3QgbmVjZXNzYXJpbHkgdGhlIHBhY2thZ2UgdmVyc2lvbiBvZiB0aGlzIGNvZGUuXG5leHBvcnRzLlNFTVZFUl9TUEVDX1ZFUlNJT04gPSAnMi4wLjAnO1xuXG52YXIgTUFYX0xFTkdUSCA9IDI1NjtcbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIgfHwgOTAwNzE5OTI1NDc0MDk5MTtcblxuLy8gVGhlIGFjdHVhbCByZWdleHBzIGdvIG9uIGV4cG9ydHMucmVcbnZhciByZSA9IGV4cG9ydHMucmUgPSBbXTtcbnZhciBzcmMgPSBleHBvcnRzLnNyYyA9IFtdO1xudmFyIFIgPSAwO1xuXG4vLyBUaGUgZm9sbG93aW5nIFJlZ3VsYXIgRXhwcmVzc2lvbnMgY2FuIGJlIHVzZWQgZm9yIHRva2VuaXppbmcsXG4vLyB2YWxpZGF0aW5nLCBhbmQgcGFyc2luZyBTZW1WZXIgdmVyc2lvbiBzdHJpbmdzLlxuXG4vLyAjIyBOdW1lcmljIElkZW50aWZpZXJcbi8vIEEgc2luZ2xlIGAwYCwgb3IgYSBub24temVybyBkaWdpdCBmb2xsb3dlZCBieSB6ZXJvIG9yIG1vcmUgZGlnaXRzLlxuXG52YXIgTlVNRVJJQ0lERU5USUZJRVIgPSBSKys7XG5zcmNbTlVNRVJJQ0lERU5USUZJRVJdID0gJzB8WzEtOV1cXFxcZConO1xudmFyIE5VTUVSSUNJREVOVElGSUVSTE9PU0UgPSBSKys7XG5zcmNbTlVNRVJJQ0lERU5USUZJRVJMT09TRV0gPSAnWzAtOV0rJztcblxuXG4vLyAjIyBOb24tbnVtZXJpYyBJZGVudGlmaWVyXG4vLyBaZXJvIG9yIG1vcmUgZGlnaXRzLCBmb2xsb3dlZCBieSBhIGxldHRlciBvciBoeXBoZW4sIGFuZCB0aGVuIHplcm8gb3Jcbi8vIG1vcmUgbGV0dGVycywgZGlnaXRzLCBvciBoeXBoZW5zLlxuXG52YXIgTk9OTlVNRVJJQ0lERU5USUZJRVIgPSBSKys7XG5zcmNbTk9OTlVNRVJJQ0lERU5USUZJRVJdID0gJ1xcXFxkKlthLXpBLVotXVthLXpBLVowLTktXSonO1xuXG5cbi8vICMjIE1haW4gVmVyc2lvblxuLy8gVGhyZWUgZG90LXNlcGFyYXRlZCBudW1lcmljIGlkZW50aWZpZXJzLlxuXG52YXIgTUFJTlZFUlNJT04gPSBSKys7XG5zcmNbTUFJTlZFUlNJT05dID0gJygnICsgc3JjW05VTUVSSUNJREVOVElGSUVSXSArICcpXFxcXC4nICtcbiAgICAgICAgICAgICAgICAgICAnKCcgKyBzcmNbTlVNRVJJQ0lERU5USUZJRVJdICsgJylcXFxcLicgK1xuICAgICAgICAgICAgICAgICAgICcoJyArIHNyY1tOVU1FUklDSURFTlRJRklFUl0gKyAnKSc7XG5cbnZhciBNQUlOVkVSU0lPTkxPT1NFID0gUisrO1xuc3JjW01BSU5WRVJTSU9OTE9PU0VdID0gJygnICsgc3JjW05VTUVSSUNJREVOVElGSUVSTE9PU0VdICsgJylcXFxcLicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJygnICsgc3JjW05VTUVSSUNJREVOVElGSUVSTE9PU0VdICsgJylcXFxcLicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJygnICsgc3JjW05VTUVSSUNJREVOVElGSUVSTE9PU0VdICsgJyknO1xuXG4vLyAjIyBQcmUtcmVsZWFzZSBWZXJzaW9uIElkZW50aWZpZXJcbi8vIEEgbnVtZXJpYyBpZGVudGlmaWVyLCBvciBhIG5vbi1udW1lcmljIGlkZW50aWZpZXIuXG5cbnZhciBQUkVSRUxFQVNFSURFTlRJRklFUiA9IFIrKztcbnNyY1tQUkVSRUxFQVNFSURFTlRJRklFUl0gPSAnKD86JyArIHNyY1tOVU1FUklDSURFTlRJRklFUl0gK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd8JyArIHNyY1tOT05OVU1FUklDSURFTlRJRklFUl0gKyAnKSc7XG5cbnZhciBQUkVSRUxFQVNFSURFTlRJRklFUkxPT1NFID0gUisrO1xuc3JjW1BSRVJFTEVBU0VJREVOVElGSUVSTE9PU0VdID0gJyg/OicgKyBzcmNbTlVNRVJJQ0lERU5USUZJRVJMT09TRV0gK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3wnICsgc3JjW05PTk5VTUVSSUNJREVOVElGSUVSXSArICcpJztcblxuXG4vLyAjIyBQcmUtcmVsZWFzZSBWZXJzaW9uXG4vLyBIeXBoZW4sIGZvbGxvd2VkIGJ5IG9uZSBvciBtb3JlIGRvdC1zZXBhcmF0ZWQgcHJlLXJlbGVhc2UgdmVyc2lvblxuLy8gaWRlbnRpZmllcnMuXG5cbnZhciBQUkVSRUxFQVNFID0gUisrO1xuc3JjW1BSRVJFTEVBU0VdID0gJyg/Oi0oJyArIHNyY1tQUkVSRUxFQVNFSURFTlRJRklFUl0gK1xuICAgICAgICAgICAgICAgICAgJyg/OlxcXFwuJyArIHNyY1tQUkVSRUxFQVNFSURFTlRJRklFUl0gKyAnKSopKSc7XG5cbnZhciBQUkVSRUxFQVNFTE9PU0UgPSBSKys7XG5zcmNbUFJFUkVMRUFTRUxPT1NFXSA9ICcoPzotPygnICsgc3JjW1BSRVJFTEVBU0VJREVOVElGSUVSTE9PU0VdICtcbiAgICAgICAgICAgICAgICAgICAgICAgJyg/OlxcXFwuJyArIHNyY1tQUkVSRUxFQVNFSURFTlRJRklFUkxPT1NFXSArICcpKikpJztcblxuLy8gIyMgQnVpbGQgTWV0YWRhdGEgSWRlbnRpZmllclxuLy8gQW55IGNvbWJpbmF0aW9uIG9mIGRpZ2l0cywgbGV0dGVycywgb3IgaHlwaGVucy5cblxudmFyIEJVSUxESURFTlRJRklFUiA9IFIrKztcbnNyY1tCVUlMRElERU5USUZJRVJdID0gJ1swLTlBLVphLXotXSsnO1xuXG4vLyAjIyBCdWlsZCBNZXRhZGF0YVxuLy8gUGx1cyBzaWduLCBmb2xsb3dlZCBieSBvbmUgb3IgbW9yZSBwZXJpb2Qtc2VwYXJhdGVkIGJ1aWxkIG1ldGFkYXRhXG4vLyBpZGVudGlmaWVycy5cblxudmFyIEJVSUxEID0gUisrO1xuc3JjW0JVSUxEXSA9ICcoPzpcXFxcKygnICsgc3JjW0JVSUxESURFTlRJRklFUl0gK1xuICAgICAgICAgICAgICcoPzpcXFxcLicgKyBzcmNbQlVJTERJREVOVElGSUVSXSArICcpKikpJztcblxuXG4vLyAjIyBGdWxsIFZlcnNpb24gU3RyaW5nXG4vLyBBIG1haW4gdmVyc2lvbiwgZm9sbG93ZWQgb3B0aW9uYWxseSBieSBhIHByZS1yZWxlYXNlIHZlcnNpb24gYW5kXG4vLyBidWlsZCBtZXRhZGF0YS5cblxuLy8gTm90ZSB0aGF0IHRoZSBvbmx5IG1ham9yLCBtaW5vciwgcGF0Y2gsIGFuZCBwcmUtcmVsZWFzZSBzZWN0aW9ucyBvZlxuLy8gdGhlIHZlcnNpb24gc3RyaW5nIGFyZSBjYXB0dXJpbmcgZ3JvdXBzLiAgVGhlIGJ1aWxkIG1ldGFkYXRhIGlzIG5vdCBhXG4vLyBjYXB0dXJpbmcgZ3JvdXAsIGJlY2F1c2UgaXQgc2hvdWxkIG5vdCBldmVyIGJlIHVzZWQgaW4gdmVyc2lvblxuLy8gY29tcGFyaXNvbi5cblxudmFyIEZVTEwgPSBSKys7XG52YXIgRlVMTFBMQUlOID0gJ3Y/JyArIHNyY1tNQUlOVkVSU0lPTl0gK1xuICAgICAgICAgICAgICAgIHNyY1tQUkVSRUxFQVNFXSArICc/JyArXG4gICAgICAgICAgICAgICAgc3JjW0JVSUxEXSArICc/Jztcblxuc3JjW0ZVTExdID0gJ14nICsgRlVMTFBMQUlOICsgJyQnO1xuXG4vLyBsaWtlIGZ1bGwsIGJ1dCBhbGxvd3MgdjEuMi4zIGFuZCA9MS4yLjMsIHdoaWNoIHBlb3BsZSBkbyBzb21ldGltZXMuXG4vLyBhbHNvLCAxLjAuMGFscGhhMSAocHJlcmVsZWFzZSB3aXRob3V0IHRoZSBoeXBoZW4pIHdoaWNoIGlzIHByZXR0eVxuLy8gY29tbW9uIGluIHRoZSBucG0gcmVnaXN0cnkuXG52YXIgTE9PU0VQTEFJTiA9ICdbdj1cXFxcc10qJyArIHNyY1tNQUlOVkVSU0lPTkxPT1NFXSArXG4gICAgICAgICAgICAgICAgIHNyY1tQUkVSRUxFQVNFTE9PU0VdICsgJz8nICtcbiAgICAgICAgICAgICAgICAgc3JjW0JVSUxEXSArICc/JztcblxudmFyIExPT1NFID0gUisrO1xuc3JjW0xPT1NFXSA9ICdeJyArIExPT1NFUExBSU4gKyAnJCc7XG5cbnZhciBHVExUID0gUisrO1xuc3JjW0dUTFRdID0gJygoPzo8fD4pPz0/KSc7XG5cbi8vIFNvbWV0aGluZyBsaWtlIFwiMi4qXCIgb3IgXCIxLjIueFwiLlxuLy8gTm90ZSB0aGF0IFwieC54XCIgaXMgYSB2YWxpZCB4UmFuZ2UgaWRlbnRpZmVyLCBtZWFuaW5nIFwiYW55IHZlcnNpb25cIlxuLy8gT25seSB0aGUgZmlyc3QgaXRlbSBpcyBzdHJpY3RseSByZXF1aXJlZC5cbnZhciBYUkFOR0VJREVOVElGSUVSTE9PU0UgPSBSKys7XG5zcmNbWFJBTkdFSURFTlRJRklFUkxPT1NFXSA9IHNyY1tOVU1FUklDSURFTlRJRklFUkxPT1NFXSArICd8eHxYfFxcXFwqJztcbnZhciBYUkFOR0VJREVOVElGSUVSID0gUisrO1xuc3JjW1hSQU5HRUlERU5USUZJRVJdID0gc3JjW05VTUVSSUNJREVOVElGSUVSXSArICd8eHxYfFxcXFwqJztcblxudmFyIFhSQU5HRVBMQUlOID0gUisrO1xuc3JjW1hSQU5HRVBMQUlOXSA9ICdbdj1cXFxcc10qKCcgKyBzcmNbWFJBTkdFSURFTlRJRklFUl0gKyAnKScgK1xuICAgICAgICAgICAgICAgICAgICcoPzpcXFxcLignICsgc3JjW1hSQU5HRUlERU5USUZJRVJdICsgJyknICtcbiAgICAgICAgICAgICAgICAgICAnKD86XFxcXC4oJyArIHNyY1tYUkFOR0VJREVOVElGSUVSXSArICcpJyArXG4gICAgICAgICAgICAgICAgICAgJyg/OicgKyBzcmNbUFJFUkVMRUFTRV0gKyAnKT8nICtcbiAgICAgICAgICAgICAgICAgICBzcmNbQlVJTERdICsgJz8nICtcbiAgICAgICAgICAgICAgICAgICAnKT8pPyc7XG5cbnZhciBYUkFOR0VQTEFJTkxPT1NFID0gUisrO1xuc3JjW1hSQU5HRVBMQUlOTE9PU0VdID0gJ1t2PVxcXFxzXSooJyArIHNyY1tYUkFOR0VJREVOVElGSUVSTE9PU0VdICsgJyknICtcbiAgICAgICAgICAgICAgICAgICAgICAgICcoPzpcXFxcLignICsgc3JjW1hSQU5HRUlERU5USUZJRVJMT09TRV0gKyAnKScgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJyg/OlxcXFwuKCcgKyBzcmNbWFJBTkdFSURFTlRJRklFUkxPT1NFXSArICcpJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnKD86JyArIHNyY1tQUkVSRUxFQVNFTE9PU0VdICsgJyk/JyArXG4gICAgICAgICAgICAgICAgICAgICAgICBzcmNbQlVJTERdICsgJz8nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICcpPyk/JztcblxudmFyIFhSQU5HRSA9IFIrKztcbnNyY1tYUkFOR0VdID0gJ14nICsgc3JjW0dUTFRdICsgJ1xcXFxzKicgKyBzcmNbWFJBTkdFUExBSU5dICsgJyQnO1xudmFyIFhSQU5HRUxPT1NFID0gUisrO1xuc3JjW1hSQU5HRUxPT1NFXSA9ICdeJyArIHNyY1tHVExUXSArICdcXFxccyonICsgc3JjW1hSQU5HRVBMQUlOTE9PU0VdICsgJyQnO1xuXG4vLyBUaWxkZSByYW5nZXMuXG4vLyBNZWFuaW5nIGlzIFwicmVhc29uYWJseSBhdCBvciBncmVhdGVyIHRoYW5cIlxudmFyIExPTkVUSUxERSA9IFIrKztcbnNyY1tMT05FVElMREVdID0gJyg/On4+PyknO1xuXG52YXIgVElMREVUUklNID0gUisrO1xuc3JjW1RJTERFVFJJTV0gPSAnKFxcXFxzKiknICsgc3JjW0xPTkVUSUxERV0gKyAnXFxcXHMrJztcbnJlW1RJTERFVFJJTV0gPSBuZXcgUmVnRXhwKHNyY1tUSUxERVRSSU1dLCAnZycpO1xudmFyIHRpbGRlVHJpbVJlcGxhY2UgPSAnJDF+JztcblxudmFyIFRJTERFID0gUisrO1xuc3JjW1RJTERFXSA9ICdeJyArIHNyY1tMT05FVElMREVdICsgc3JjW1hSQU5HRVBMQUlOXSArICckJztcbnZhciBUSUxERUxPT1NFID0gUisrO1xuc3JjW1RJTERFTE9PU0VdID0gJ14nICsgc3JjW0xPTkVUSUxERV0gKyBzcmNbWFJBTkdFUExBSU5MT09TRV0gKyAnJCc7XG5cbi8vIENhcmV0IHJhbmdlcy5cbi8vIE1lYW5pbmcgaXMgXCJhdCBsZWFzdCBhbmQgYmFja3dhcmRzIGNvbXBhdGlibGUgd2l0aFwiXG52YXIgTE9ORUNBUkVUID0gUisrO1xuc3JjW0xPTkVDQVJFVF0gPSAnKD86XFxcXF4pJztcblxudmFyIENBUkVUVFJJTSA9IFIrKztcbnNyY1tDQVJFVFRSSU1dID0gJyhcXFxccyopJyArIHNyY1tMT05FQ0FSRVRdICsgJ1xcXFxzKyc7XG5yZVtDQVJFVFRSSU1dID0gbmV3IFJlZ0V4cChzcmNbQ0FSRVRUUklNXSwgJ2cnKTtcbnZhciBjYXJldFRyaW1SZXBsYWNlID0gJyQxXic7XG5cbnZhciBDQVJFVCA9IFIrKztcbnNyY1tDQVJFVF0gPSAnXicgKyBzcmNbTE9ORUNBUkVUXSArIHNyY1tYUkFOR0VQTEFJTl0gKyAnJCc7XG52YXIgQ0FSRVRMT09TRSA9IFIrKztcbnNyY1tDQVJFVExPT1NFXSA9ICdeJyArIHNyY1tMT05FQ0FSRVRdICsgc3JjW1hSQU5HRVBMQUlOTE9PU0VdICsgJyQnO1xuXG4vLyBBIHNpbXBsZSBndC9sdC9lcSB0aGluZywgb3IganVzdCBcIlwiIHRvIGluZGljYXRlIFwiYW55IHZlcnNpb25cIlxudmFyIENPTVBBUkFUT1JMT09TRSA9IFIrKztcbnNyY1tDT01QQVJBVE9STE9PU0VdID0gJ14nICsgc3JjW0dUTFRdICsgJ1xcXFxzKignICsgTE9PU0VQTEFJTiArICcpJHxeJCc7XG52YXIgQ09NUEFSQVRPUiA9IFIrKztcbnNyY1tDT01QQVJBVE9SXSA9ICdeJyArIHNyY1tHVExUXSArICdcXFxccyooJyArIEZVTExQTEFJTiArICcpJHxeJCc7XG5cblxuLy8gQW4gZXhwcmVzc2lvbiB0byBzdHJpcCBhbnkgd2hpdGVzcGFjZSBiZXR3ZWVuIHRoZSBndGx0IGFuZCB0aGUgdGhpbmdcbi8vIGl0IG1vZGlmaWVzLCBzbyB0aGF0IGA+IDEuMi4zYCA9PT4gYD4xLjIuM2BcbnZhciBDT01QQVJBVE9SVFJJTSA9IFIrKztcbnNyY1tDT01QQVJBVE9SVFJJTV0gPSAnKFxcXFxzKiknICsgc3JjW0dUTFRdICtcbiAgICAgICAgICAgICAgICAgICAgICAnXFxcXHMqKCcgKyBMT09TRVBMQUlOICsgJ3wnICsgc3JjW1hSQU5HRVBMQUlOXSArICcpJztcblxuLy8gdGhpcyBvbmUgaGFzIHRvIHVzZSB0aGUgL2cgZmxhZ1xucmVbQ09NUEFSQVRPUlRSSU1dID0gbmV3IFJlZ0V4cChzcmNbQ09NUEFSQVRPUlRSSU1dLCAnZycpO1xudmFyIGNvbXBhcmF0b3JUcmltUmVwbGFjZSA9ICckMSQyJDMnO1xuXG5cbi8vIFNvbWV0aGluZyBsaWtlIGAxLjIuMyAtIDEuMi40YFxuLy8gTm90ZSB0aGF0IHRoZXNlIGFsbCB1c2UgdGhlIGxvb3NlIGZvcm0sIGJlY2F1c2UgdGhleSdsbCBiZVxuLy8gY2hlY2tlZCBhZ2FpbnN0IGVpdGhlciB0aGUgc3RyaWN0IG9yIGxvb3NlIGNvbXBhcmF0b3IgZm9ybVxuLy8gbGF0ZXIuXG52YXIgSFlQSEVOUkFOR0UgPSBSKys7XG5zcmNbSFlQSEVOUkFOR0VdID0gJ15cXFxccyooJyArIHNyY1tYUkFOR0VQTEFJTl0gKyAnKScgK1xuICAgICAgICAgICAgICAgICAgICdcXFxccystXFxcXHMrJyArXG4gICAgICAgICAgICAgICAgICAgJygnICsgc3JjW1hSQU5HRVBMQUlOXSArICcpJyArXG4gICAgICAgICAgICAgICAgICAgJ1xcXFxzKiQnO1xuXG52YXIgSFlQSEVOUkFOR0VMT09TRSA9IFIrKztcbnNyY1tIWVBIRU5SQU5HRUxPT1NFXSA9ICdeXFxcXHMqKCcgKyBzcmNbWFJBTkdFUExBSU5MT09TRV0gKyAnKScgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ1xcXFxzKy1cXFxccysnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICcoJyArIHNyY1tYUkFOR0VQTEFJTkxPT1NFXSArICcpJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnXFxcXHMqJCc7XG5cbi8vIFN0YXIgcmFuZ2VzIGJhc2ljYWxseSBqdXN0IGFsbG93IGFueXRoaW5nIGF0IGFsbC5cbnZhciBTVEFSID0gUisrO1xuc3JjW1NUQVJdID0gJyg8fD4pPz0/XFxcXHMqXFxcXConO1xuXG4vLyBDb21waWxlIHRvIGFjdHVhbCByZWdleHAgb2JqZWN0cy5cbi8vIEFsbCBhcmUgZmxhZy1mcmVlLCB1bmxlc3MgdGhleSB3ZXJlIGNyZWF0ZWQgYWJvdmUgd2l0aCBhIGZsYWcuXG5mb3IgKHZhciBpID0gMDsgaSA8IFI7IGkrKykge1xuICBkZWJ1ZyhpLCBzcmNbaV0pO1xuICBpZiAoIXJlW2ldKVxuICAgIHJlW2ldID0gbmV3IFJlZ0V4cChzcmNbaV0pO1xufVxuXG5leHBvcnRzLnBhcnNlID0gcGFyc2U7XG5mdW5jdGlvbiBwYXJzZSh2ZXJzaW9uLCBsb29zZSkge1xuICBpZiAodmVyc2lvbiBpbnN0YW5jZW9mIFNlbVZlcilcbiAgICByZXR1cm4gdmVyc2lvbjtcblxuICBpZiAodHlwZW9mIHZlcnNpb24gIT09ICdzdHJpbmcnKVxuICAgIHJldHVybiBudWxsO1xuXG4gIGlmICh2ZXJzaW9uLmxlbmd0aCA+IE1BWF9MRU5HVEgpXG4gICAgcmV0dXJuIG51bGw7XG5cbiAgdmFyIHIgPSBsb29zZSA/IHJlW0xPT1NFXSA6IHJlW0ZVTExdO1xuICBpZiAoIXIudGVzdCh2ZXJzaW9uKSlcbiAgICByZXR1cm4gbnVsbDtcblxuICB0cnkge1xuICAgIHJldHVybiBuZXcgU2VtVmVyKHZlcnNpb24sIGxvb3NlKTtcbiAgfSBjYXRjaCAoZXIpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuXG5leHBvcnRzLnZhbGlkID0gdmFsaWQ7XG5mdW5jdGlvbiB2YWxpZCh2ZXJzaW9uLCBsb29zZSkge1xuICB2YXIgdiA9IHBhcnNlKHZlcnNpb24sIGxvb3NlKTtcbiAgcmV0dXJuIHYgPyB2LnZlcnNpb24gOiBudWxsO1xufVxuXG5cbmV4cG9ydHMuY2xlYW4gPSBjbGVhbjtcbmZ1bmN0aW9uIGNsZWFuKHZlcnNpb24sIGxvb3NlKSB7XG4gIHZhciBzID0gcGFyc2UodmVyc2lvbi50cmltKCkucmVwbGFjZSgvXls9dl0rLywgJycpLCBsb29zZSk7XG4gIHJldHVybiBzID8gcy52ZXJzaW9uIDogbnVsbDtcbn1cblxuZXhwb3J0cy5TZW1WZXIgPSBTZW1WZXI7XG5cbmZ1bmN0aW9uIFNlbVZlcih2ZXJzaW9uLCBsb29zZSkge1xuICBpZiAodmVyc2lvbiBpbnN0YW5jZW9mIFNlbVZlcikge1xuICAgIGlmICh2ZXJzaW9uLmxvb3NlID09PSBsb29zZSlcbiAgICAgIHJldHVybiB2ZXJzaW9uO1xuICAgIGVsc2VcbiAgICAgIHZlcnNpb24gPSB2ZXJzaW9uLnZlcnNpb247XG4gIH0gZWxzZSBpZiAodHlwZW9mIHZlcnNpb24gIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBWZXJzaW9uOiAnICsgdmVyc2lvbik7XG4gIH1cblxuICBpZiAodmVyc2lvbi5sZW5ndGggPiBNQVhfTEVOR1RIKVxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3ZlcnNpb24gaXMgbG9uZ2VyIHRoYW4gJyArIE1BWF9MRU5HVEggKyAnIGNoYXJhY3RlcnMnKVxuXG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBTZW1WZXIpKVxuICAgIHJldHVybiBuZXcgU2VtVmVyKHZlcnNpb24sIGxvb3NlKTtcblxuICBkZWJ1ZygnU2VtVmVyJywgdmVyc2lvbiwgbG9vc2UpO1xuICB0aGlzLmxvb3NlID0gbG9vc2U7XG4gIHZhciBtID0gdmVyc2lvbi50cmltKCkubWF0Y2gobG9vc2UgPyByZVtMT09TRV0gOiByZVtGVUxMXSk7XG5cbiAgaWYgKCFtKVxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgVmVyc2lvbjogJyArIHZlcnNpb24pO1xuXG4gIHRoaXMucmF3ID0gdmVyc2lvbjtcblxuICAvLyB0aGVzZSBhcmUgYWN0dWFsbHkgbnVtYmVyc1xuICB0aGlzLm1ham9yID0gK21bMV07XG4gIHRoaXMubWlub3IgPSArbVsyXTtcbiAgdGhpcy5wYXRjaCA9ICttWzNdO1xuXG4gIGlmICh0aGlzLm1ham9yID4gTUFYX1NBRkVfSU5URUdFUiB8fCB0aGlzLm1ham9yIDwgMClcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIG1ham9yIHZlcnNpb24nKVxuXG4gIGlmICh0aGlzLm1pbm9yID4gTUFYX1NBRkVfSU5URUdFUiB8fCB0aGlzLm1pbm9yIDwgMClcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIG1pbm9yIHZlcnNpb24nKVxuXG4gIGlmICh0aGlzLnBhdGNoID4gTUFYX1NBRkVfSU5URUdFUiB8fCB0aGlzLnBhdGNoIDwgMClcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIHBhdGNoIHZlcnNpb24nKVxuXG4gIC8vIG51bWJlcmlmeSBhbnkgcHJlcmVsZWFzZSBudW1lcmljIGlkc1xuICBpZiAoIW1bNF0pXG4gICAgdGhpcy5wcmVyZWxlYXNlID0gW107XG4gIGVsc2VcbiAgICB0aGlzLnByZXJlbGVhc2UgPSBtWzRdLnNwbGl0KCcuJykubWFwKGZ1bmN0aW9uKGlkKSB7XG4gICAgICBpZiAoL15bMC05XSskLy50ZXN0KGlkKSkge1xuICAgICAgICB2YXIgbnVtID0gK2lkXG4gICAgICAgIGlmIChudW0gPj0gMCAmJiBudW0gPCBNQVhfU0FGRV9JTlRFR0VSKVxuICAgICAgICAgIHJldHVybiBudW1cbiAgICAgIH1cbiAgICAgIHJldHVybiBpZDtcbiAgICB9KTtcblxuICB0aGlzLmJ1aWxkID0gbVs1XSA/IG1bNV0uc3BsaXQoJy4nKSA6IFtdO1xuICB0aGlzLmZvcm1hdCgpO1xufVxuXG5TZW1WZXIucHJvdG90eXBlLmZvcm1hdCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnZlcnNpb24gPSB0aGlzLm1ham9yICsgJy4nICsgdGhpcy5taW5vciArICcuJyArIHRoaXMucGF0Y2g7XG4gIGlmICh0aGlzLnByZXJlbGVhc2UubGVuZ3RoKVxuICAgIHRoaXMudmVyc2lvbiArPSAnLScgKyB0aGlzLnByZXJlbGVhc2Uuam9pbignLicpO1xuICByZXR1cm4gdGhpcy52ZXJzaW9uO1xufTtcblxuU2VtVmVyLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy52ZXJzaW9uO1xufTtcblxuU2VtVmVyLnByb3RvdHlwZS5jb21wYXJlID0gZnVuY3Rpb24ob3RoZXIpIHtcbiAgZGVidWcoJ1NlbVZlci5jb21wYXJlJywgdGhpcy52ZXJzaW9uLCB0aGlzLmxvb3NlLCBvdGhlcik7XG4gIGlmICghKG90aGVyIGluc3RhbmNlb2YgU2VtVmVyKSlcbiAgICBvdGhlciA9IG5ldyBTZW1WZXIob3RoZXIsIHRoaXMubG9vc2UpO1xuXG4gIHJldHVybiB0aGlzLmNvbXBhcmVNYWluKG90aGVyKSB8fCB0aGlzLmNvbXBhcmVQcmUob3RoZXIpO1xufTtcblxuU2VtVmVyLnByb3RvdHlwZS5jb21wYXJlTWFpbiA9IGZ1bmN0aW9uKG90aGVyKSB7XG4gIGlmICghKG90aGVyIGluc3RhbmNlb2YgU2VtVmVyKSlcbiAgICBvdGhlciA9IG5ldyBTZW1WZXIob3RoZXIsIHRoaXMubG9vc2UpO1xuXG4gIHJldHVybiBjb21wYXJlSWRlbnRpZmllcnModGhpcy5tYWpvciwgb3RoZXIubWFqb3IpIHx8XG4gICAgICAgICBjb21wYXJlSWRlbnRpZmllcnModGhpcy5taW5vciwgb3RoZXIubWlub3IpIHx8XG4gICAgICAgICBjb21wYXJlSWRlbnRpZmllcnModGhpcy5wYXRjaCwgb3RoZXIucGF0Y2gpO1xufTtcblxuU2VtVmVyLnByb3RvdHlwZS5jb21wYXJlUHJlID0gZnVuY3Rpb24ob3RoZXIpIHtcbiAgaWYgKCEob3RoZXIgaW5zdGFuY2VvZiBTZW1WZXIpKVxuICAgIG90aGVyID0gbmV3IFNlbVZlcihvdGhlciwgdGhpcy5sb29zZSk7XG5cbiAgLy8gTk9UIGhhdmluZyBhIHByZXJlbGVhc2UgaXMgPiBoYXZpbmcgb25lXG4gIGlmICh0aGlzLnByZXJlbGVhc2UubGVuZ3RoICYmICFvdGhlci5wcmVyZWxlYXNlLmxlbmd0aClcbiAgICByZXR1cm4gLTE7XG4gIGVsc2UgaWYgKCF0aGlzLnByZXJlbGVhc2UubGVuZ3RoICYmIG90aGVyLnByZXJlbGVhc2UubGVuZ3RoKVxuICAgIHJldHVybiAxO1xuICBlbHNlIGlmICghdGhpcy5wcmVyZWxlYXNlLmxlbmd0aCAmJiAhb3RoZXIucHJlcmVsZWFzZS5sZW5ndGgpXG4gICAgcmV0dXJuIDA7XG5cbiAgdmFyIGkgPSAwO1xuICBkbyB7XG4gICAgdmFyIGEgPSB0aGlzLnByZXJlbGVhc2VbaV07XG4gICAgdmFyIGIgPSBvdGhlci5wcmVyZWxlYXNlW2ldO1xuICAgIGRlYnVnKCdwcmVyZWxlYXNlIGNvbXBhcmUnLCBpLCBhLCBiKTtcbiAgICBpZiAoYSA9PT0gdW5kZWZpbmVkICYmIGIgPT09IHVuZGVmaW5lZClcbiAgICAgIHJldHVybiAwO1xuICAgIGVsc2UgaWYgKGIgPT09IHVuZGVmaW5lZClcbiAgICAgIHJldHVybiAxO1xuICAgIGVsc2UgaWYgKGEgPT09IHVuZGVmaW5lZClcbiAgICAgIHJldHVybiAtMTtcbiAgICBlbHNlIGlmIChhID09PSBiKVxuICAgICAgY29udGludWU7XG4gICAgZWxzZVxuICAgICAgcmV0dXJuIGNvbXBhcmVJZGVudGlmaWVycyhhLCBiKTtcbiAgfSB3aGlsZSAoKytpKTtcbn07XG5cbi8vIHByZW1pbm9yIHdpbGwgYnVtcCB0aGUgdmVyc2lvbiB1cCB0byB0aGUgbmV4dCBtaW5vciByZWxlYXNlLCBhbmQgaW1tZWRpYXRlbHlcbi8vIGRvd24gdG8gcHJlLXJlbGVhc2UuIHByZW1ham9yIGFuZCBwcmVwYXRjaCB3b3JrIHRoZSBzYW1lIHdheS5cblNlbVZlci5wcm90b3R5cGUuaW5jID0gZnVuY3Rpb24ocmVsZWFzZSwgaWRlbnRpZmllcikge1xuICBzd2l0Y2ggKHJlbGVhc2UpIHtcbiAgICBjYXNlICdwcmVtYWpvcic6XG4gICAgICB0aGlzLnByZXJlbGVhc2UubGVuZ3RoID0gMDtcbiAgICAgIHRoaXMucGF0Y2ggPSAwO1xuICAgICAgdGhpcy5taW5vciA9IDA7XG4gICAgICB0aGlzLm1ham9yKys7XG4gICAgICB0aGlzLmluYygncHJlJywgaWRlbnRpZmllcik7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdwcmVtaW5vcic6XG4gICAgICB0aGlzLnByZXJlbGVhc2UubGVuZ3RoID0gMDtcbiAgICAgIHRoaXMucGF0Y2ggPSAwO1xuICAgICAgdGhpcy5taW5vcisrO1xuICAgICAgdGhpcy5pbmMoJ3ByZScsIGlkZW50aWZpZXIpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAncHJlcGF0Y2gnOlxuICAgICAgLy8gSWYgdGhpcyBpcyBhbHJlYWR5IGEgcHJlcmVsZWFzZSwgaXQgd2lsbCBidW1wIHRvIHRoZSBuZXh0IHZlcnNpb25cbiAgICAgIC8vIGRyb3AgYW55IHByZXJlbGVhc2VzIHRoYXQgbWlnaHQgYWxyZWFkeSBleGlzdCwgc2luY2UgdGhleSBhcmUgbm90XG4gICAgICAvLyByZWxldmFudCBhdCB0aGlzIHBvaW50LlxuICAgICAgdGhpcy5wcmVyZWxlYXNlLmxlbmd0aCA9IDA7XG4gICAgICB0aGlzLmluYygncGF0Y2gnLCBpZGVudGlmaWVyKTtcbiAgICAgIHRoaXMuaW5jKCdwcmUnLCBpZGVudGlmaWVyKTtcbiAgICAgIGJyZWFrO1xuICAgIC8vIElmIHRoZSBpbnB1dCBpcyBhIG5vbi1wcmVyZWxlYXNlIHZlcnNpb24sIHRoaXMgYWN0cyB0aGUgc2FtZSBhc1xuICAgIC8vIHByZXBhdGNoLlxuICAgIGNhc2UgJ3ByZXJlbGVhc2UnOlxuICAgICAgaWYgKHRoaXMucHJlcmVsZWFzZS5sZW5ndGggPT09IDApXG4gICAgICAgIHRoaXMuaW5jKCdwYXRjaCcsIGlkZW50aWZpZXIpO1xuICAgICAgdGhpcy5pbmMoJ3ByZScsIGlkZW50aWZpZXIpO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdtYWpvcic6XG4gICAgICAvLyBJZiB0aGlzIGlzIGEgcHJlLW1ham9yIHZlcnNpb24sIGJ1bXAgdXAgdG8gdGhlIHNhbWUgbWFqb3IgdmVyc2lvbi5cbiAgICAgIC8vIE90aGVyd2lzZSBpbmNyZW1lbnQgbWFqb3IuXG4gICAgICAvLyAxLjAuMC01IGJ1bXBzIHRvIDEuMC4wXG4gICAgICAvLyAxLjEuMCBidW1wcyB0byAyLjAuMFxuICAgICAgaWYgKHRoaXMubWlub3IgIT09IDAgfHwgdGhpcy5wYXRjaCAhPT0gMCB8fCB0aGlzLnByZXJlbGVhc2UubGVuZ3RoID09PSAwKVxuICAgICAgICB0aGlzLm1ham9yKys7XG4gICAgICB0aGlzLm1pbm9yID0gMDtcbiAgICAgIHRoaXMucGF0Y2ggPSAwO1xuICAgICAgdGhpcy5wcmVyZWxlYXNlID0gW107XG4gICAgICBicmVhaztcbiAgICBjYXNlICdtaW5vcic6XG4gICAgICAvLyBJZiB0aGlzIGlzIGEgcHJlLW1pbm9yIHZlcnNpb24sIGJ1bXAgdXAgdG8gdGhlIHNhbWUgbWlub3IgdmVyc2lvbi5cbiAgICAgIC8vIE90aGVyd2lzZSBpbmNyZW1lbnQgbWlub3IuXG4gICAgICAvLyAxLjIuMC01IGJ1bXBzIHRvIDEuMi4wXG4gICAgICAvLyAxLjIuMSBidW1wcyB0byAxLjMuMFxuICAgICAgaWYgKHRoaXMucGF0Y2ggIT09IDAgfHwgdGhpcy5wcmVyZWxlYXNlLmxlbmd0aCA9PT0gMClcbiAgICAgICAgdGhpcy5taW5vcisrO1xuICAgICAgdGhpcy5wYXRjaCA9IDA7XG4gICAgICB0aGlzLnByZXJlbGVhc2UgPSBbXTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3BhdGNoJzpcbiAgICAgIC8vIElmIHRoaXMgaXMgbm90IGEgcHJlLXJlbGVhc2UgdmVyc2lvbiwgaXQgd2lsbCBpbmNyZW1lbnQgdGhlIHBhdGNoLlxuICAgICAgLy8gSWYgaXQgaXMgYSBwcmUtcmVsZWFzZSBpdCB3aWxsIGJ1bXAgdXAgdG8gdGhlIHNhbWUgcGF0Y2ggdmVyc2lvbi5cbiAgICAgIC8vIDEuMi4wLTUgcGF0Y2hlcyB0byAxLjIuMFxuICAgICAgLy8gMS4yLjAgcGF0Y2hlcyB0byAxLjIuMVxuICAgICAgaWYgKHRoaXMucHJlcmVsZWFzZS5sZW5ndGggPT09IDApXG4gICAgICAgIHRoaXMucGF0Y2grKztcbiAgICAgIHRoaXMucHJlcmVsZWFzZSA9IFtdO1xuICAgICAgYnJlYWs7XG4gICAgLy8gVGhpcyBwcm9iYWJseSBzaG91bGRuJ3QgYmUgdXNlZCBwdWJsaWNseS5cbiAgICAvLyAxLjAuMCBcInByZVwiIHdvdWxkIGJlY29tZSAxLjAuMC0wIHdoaWNoIGlzIHRoZSB3cm9uZyBkaXJlY3Rpb24uXG4gICAgY2FzZSAncHJlJzpcbiAgICAgIGlmICh0aGlzLnByZXJlbGVhc2UubGVuZ3RoID09PSAwKVxuICAgICAgICB0aGlzLnByZXJlbGVhc2UgPSBbMF07XG4gICAgICBlbHNlIHtcbiAgICAgICAgdmFyIGkgPSB0aGlzLnByZXJlbGVhc2UubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoLS1pID49IDApIHtcbiAgICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJlcmVsZWFzZVtpXSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHRoaXMucHJlcmVsZWFzZVtpXSsrO1xuICAgICAgICAgICAgaSA9IC0yO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoaSA9PT0gLTEpIC8vIGRpZG4ndCBpbmNyZW1lbnQgYW55dGhpbmdcbiAgICAgICAgICB0aGlzLnByZXJlbGVhc2UucHVzaCgwKTtcbiAgICAgIH1cbiAgICAgIGlmIChpZGVudGlmaWVyKSB7XG4gICAgICAgIC8vIDEuMi4wLWJldGEuMSBidW1wcyB0byAxLjIuMC1iZXRhLjIsXG4gICAgICAgIC8vIDEuMi4wLWJldGEuZm9vYmx6IG9yIDEuMi4wLWJldGEgYnVtcHMgdG8gMS4yLjAtYmV0YS4wXG4gICAgICAgIGlmICh0aGlzLnByZXJlbGVhc2VbMF0gPT09IGlkZW50aWZpZXIpIHtcbiAgICAgICAgICBpZiAoaXNOYU4odGhpcy5wcmVyZWxlYXNlWzFdKSlcbiAgICAgICAgICAgIHRoaXMucHJlcmVsZWFzZSA9IFtpZGVudGlmaWVyLCAwXTtcbiAgICAgICAgfSBlbHNlXG4gICAgICAgICAgdGhpcy5wcmVyZWxlYXNlID0gW2lkZW50aWZpZXIsIDBdO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGluY3JlbWVudCBhcmd1bWVudDogJyArIHJlbGVhc2UpO1xuICB9XG4gIHRoaXMuZm9ybWF0KCk7XG4gIHRoaXMucmF3ID0gdGhpcy52ZXJzaW9uO1xuICByZXR1cm4gdGhpcztcbn07XG5cbmV4cG9ydHMuaW5jID0gaW5jO1xuZnVuY3Rpb24gaW5jKHZlcnNpb24sIHJlbGVhc2UsIGxvb3NlLCBpZGVudGlmaWVyKSB7XG4gIGlmICh0eXBlb2YobG9vc2UpID09PSAnc3RyaW5nJykge1xuICAgIGlkZW50aWZpZXIgPSBsb29zZTtcbiAgICBsb29zZSA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHRyeSB7XG4gICAgcmV0dXJuIG5ldyBTZW1WZXIodmVyc2lvbiwgbG9vc2UpLmluYyhyZWxlYXNlLCBpZGVudGlmaWVyKS52ZXJzaW9uO1xuICB9IGNhdGNoIChlcikge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbmV4cG9ydHMuZGlmZiA9IGRpZmY7XG5mdW5jdGlvbiBkaWZmKHZlcnNpb24xLCB2ZXJzaW9uMikge1xuICBpZiAoZXEodmVyc2lvbjEsIHZlcnNpb24yKSkge1xuICAgIHJldHVybiBudWxsO1xuICB9IGVsc2Uge1xuICAgIHZhciB2MSA9IHBhcnNlKHZlcnNpb24xKTtcbiAgICB2YXIgdjIgPSBwYXJzZSh2ZXJzaW9uMik7XG4gICAgaWYgKHYxLnByZXJlbGVhc2UubGVuZ3RoIHx8IHYyLnByZXJlbGVhc2UubGVuZ3RoKSB7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gdjEpIHtcbiAgICAgICAgaWYgKGtleSA9PT0gJ21ham9yJyB8fCBrZXkgPT09ICdtaW5vcicgfHwga2V5ID09PSAncGF0Y2gnKSB7XG4gICAgICAgICAgaWYgKHYxW2tleV0gIT09IHYyW2tleV0pIHtcbiAgICAgICAgICAgIHJldHVybiAncHJlJytrZXk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gJ3ByZXJlbGVhc2UnO1xuICAgIH1cbiAgICBmb3IgKHZhciBrZXkgaW4gdjEpIHtcbiAgICAgIGlmIChrZXkgPT09ICdtYWpvcicgfHwga2V5ID09PSAnbWlub3InIHx8IGtleSA9PT0gJ3BhdGNoJykge1xuICAgICAgICBpZiAodjFba2V5XSAhPT0gdjJba2V5XSkge1xuICAgICAgICAgIHJldHVybiBrZXk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0cy5jb21wYXJlSWRlbnRpZmllcnMgPSBjb21wYXJlSWRlbnRpZmllcnM7XG5cbnZhciBudW1lcmljID0gL15bMC05XSskLztcbmZ1bmN0aW9uIGNvbXBhcmVJZGVudGlmaWVycyhhLCBiKSB7XG4gIHZhciBhbnVtID0gbnVtZXJpYy50ZXN0KGEpO1xuICB2YXIgYm51bSA9IG51bWVyaWMudGVzdChiKTtcblxuICBpZiAoYW51bSAmJiBibnVtKSB7XG4gICAgYSA9ICthO1xuICAgIGIgPSArYjtcbiAgfVxuXG4gIHJldHVybiAoYW51bSAmJiAhYm51bSkgPyAtMSA6XG4gICAgICAgICAoYm51bSAmJiAhYW51bSkgPyAxIDpcbiAgICAgICAgIGEgPCBiID8gLTEgOlxuICAgICAgICAgYSA+IGIgPyAxIDpcbiAgICAgICAgIDA7XG59XG5cbmV4cG9ydHMucmNvbXBhcmVJZGVudGlmaWVycyA9IHJjb21wYXJlSWRlbnRpZmllcnM7XG5mdW5jdGlvbiByY29tcGFyZUlkZW50aWZpZXJzKGEsIGIpIHtcbiAgcmV0dXJuIGNvbXBhcmVJZGVudGlmaWVycyhiLCBhKTtcbn1cblxuZXhwb3J0cy5tYWpvciA9IG1ham9yO1xuZnVuY3Rpb24gbWFqb3IoYSwgbG9vc2UpIHtcbiAgcmV0dXJuIG5ldyBTZW1WZXIoYSwgbG9vc2UpLm1ham9yO1xufVxuXG5leHBvcnRzLm1pbm9yID0gbWlub3I7XG5mdW5jdGlvbiBtaW5vcihhLCBsb29zZSkge1xuICByZXR1cm4gbmV3IFNlbVZlcihhLCBsb29zZSkubWlub3I7XG59XG5cbmV4cG9ydHMucGF0Y2ggPSBwYXRjaDtcbmZ1bmN0aW9uIHBhdGNoKGEsIGxvb3NlKSB7XG4gIHJldHVybiBuZXcgU2VtVmVyKGEsIGxvb3NlKS5wYXRjaDtcbn1cblxuZXhwb3J0cy5jb21wYXJlID0gY29tcGFyZTtcbmZ1bmN0aW9uIGNvbXBhcmUoYSwgYiwgbG9vc2UpIHtcbiAgcmV0dXJuIG5ldyBTZW1WZXIoYSwgbG9vc2UpLmNvbXBhcmUoYik7XG59XG5cbmV4cG9ydHMuY29tcGFyZUxvb3NlID0gY29tcGFyZUxvb3NlO1xuZnVuY3Rpb24gY29tcGFyZUxvb3NlKGEsIGIpIHtcbiAgcmV0dXJuIGNvbXBhcmUoYSwgYiwgdHJ1ZSk7XG59XG5cbmV4cG9ydHMucmNvbXBhcmUgPSByY29tcGFyZTtcbmZ1bmN0aW9uIHJjb21wYXJlKGEsIGIsIGxvb3NlKSB7XG4gIHJldHVybiBjb21wYXJlKGIsIGEsIGxvb3NlKTtcbn1cblxuZXhwb3J0cy5zb3J0ID0gc29ydDtcbmZ1bmN0aW9uIHNvcnQobGlzdCwgbG9vc2UpIHtcbiAgcmV0dXJuIGxpc3Quc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgcmV0dXJuIGV4cG9ydHMuY29tcGFyZShhLCBiLCBsb29zZSk7XG4gIH0pO1xufVxuXG5leHBvcnRzLnJzb3J0ID0gcnNvcnQ7XG5mdW5jdGlvbiByc29ydChsaXN0LCBsb29zZSkge1xuICByZXR1cm4gbGlzdC5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gZXhwb3J0cy5yY29tcGFyZShhLCBiLCBsb29zZSk7XG4gIH0pO1xufVxuXG5leHBvcnRzLmd0ID0gZ3Q7XG5mdW5jdGlvbiBndChhLCBiLCBsb29zZSkge1xuICByZXR1cm4gY29tcGFyZShhLCBiLCBsb29zZSkgPiAwO1xufVxuXG5leHBvcnRzLmx0ID0gbHQ7XG5mdW5jdGlvbiBsdChhLCBiLCBsb29zZSkge1xuICByZXR1cm4gY29tcGFyZShhLCBiLCBsb29zZSkgPCAwO1xufVxuXG5leHBvcnRzLmVxID0gZXE7XG5mdW5jdGlvbiBlcShhLCBiLCBsb29zZSkge1xuICByZXR1cm4gY29tcGFyZShhLCBiLCBsb29zZSkgPT09IDA7XG59XG5cbmV4cG9ydHMubmVxID0gbmVxO1xuZnVuY3Rpb24gbmVxKGEsIGIsIGxvb3NlKSB7XG4gIHJldHVybiBjb21wYXJlKGEsIGIsIGxvb3NlKSAhPT0gMDtcbn1cblxuZXhwb3J0cy5ndGUgPSBndGU7XG5mdW5jdGlvbiBndGUoYSwgYiwgbG9vc2UpIHtcbiAgcmV0dXJuIGNvbXBhcmUoYSwgYiwgbG9vc2UpID49IDA7XG59XG5cbmV4cG9ydHMubHRlID0gbHRlO1xuZnVuY3Rpb24gbHRlKGEsIGIsIGxvb3NlKSB7XG4gIHJldHVybiBjb21wYXJlKGEsIGIsIGxvb3NlKSA8PSAwO1xufVxuXG5leHBvcnRzLmNtcCA9IGNtcDtcbmZ1bmN0aW9uIGNtcChhLCBvcCwgYiwgbG9vc2UpIHtcbiAgdmFyIHJldDtcbiAgc3dpdGNoIChvcCkge1xuICAgIGNhc2UgJz09PSc6XG4gICAgICBpZiAodHlwZW9mIGEgPT09ICdvYmplY3QnKSBhID0gYS52ZXJzaW9uO1xuICAgICAgaWYgKHR5cGVvZiBiID09PSAnb2JqZWN0JykgYiA9IGIudmVyc2lvbjtcbiAgICAgIHJldCA9IGEgPT09IGI7XG4gICAgICBicmVhaztcbiAgICBjYXNlICchPT0nOlxuICAgICAgaWYgKHR5cGVvZiBhID09PSAnb2JqZWN0JykgYSA9IGEudmVyc2lvbjtcbiAgICAgIGlmICh0eXBlb2YgYiA9PT0gJ29iamVjdCcpIGIgPSBiLnZlcnNpb247XG4gICAgICByZXQgPSBhICE9PSBiO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnJzogY2FzZSAnPSc6IGNhc2UgJz09JzogcmV0ID0gZXEoYSwgYiwgbG9vc2UpOyBicmVhaztcbiAgICBjYXNlICchPSc6IHJldCA9IG5lcShhLCBiLCBsb29zZSk7IGJyZWFrO1xuICAgIGNhc2UgJz4nOiByZXQgPSBndChhLCBiLCBsb29zZSk7IGJyZWFrO1xuICAgIGNhc2UgJz49JzogcmV0ID0gZ3RlKGEsIGIsIGxvb3NlKTsgYnJlYWs7XG4gICAgY2FzZSAnPCc6IHJldCA9IGx0KGEsIGIsIGxvb3NlKTsgYnJlYWs7XG4gICAgY2FzZSAnPD0nOiByZXQgPSBsdGUoYSwgYiwgbG9vc2UpOyBicmVhaztcbiAgICBkZWZhdWx0OiB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIG9wZXJhdG9yOiAnICsgb3ApO1xuICB9XG4gIHJldHVybiByZXQ7XG59XG5cbmV4cG9ydHMuQ29tcGFyYXRvciA9IENvbXBhcmF0b3I7XG5mdW5jdGlvbiBDb21wYXJhdG9yKGNvbXAsIGxvb3NlKSB7XG4gIGlmIChjb21wIGluc3RhbmNlb2YgQ29tcGFyYXRvcikge1xuICAgIGlmIChjb21wLmxvb3NlID09PSBsb29zZSlcbiAgICAgIHJldHVybiBjb21wO1xuICAgIGVsc2VcbiAgICAgIGNvbXAgPSBjb21wLnZhbHVlO1xuICB9XG5cbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIENvbXBhcmF0b3IpKVxuICAgIHJldHVybiBuZXcgQ29tcGFyYXRvcihjb21wLCBsb29zZSk7XG5cbiAgZGVidWcoJ2NvbXBhcmF0b3InLCBjb21wLCBsb29zZSk7XG4gIHRoaXMubG9vc2UgPSBsb29zZTtcbiAgdGhpcy5wYXJzZShjb21wKTtcblxuICBpZiAodGhpcy5zZW12ZXIgPT09IEFOWSlcbiAgICB0aGlzLnZhbHVlID0gJyc7XG4gIGVsc2VcbiAgICB0aGlzLnZhbHVlID0gdGhpcy5vcGVyYXRvciArIHRoaXMuc2VtdmVyLnZlcnNpb247XG5cbiAgZGVidWcoJ2NvbXAnLCB0aGlzKTtcbn1cblxudmFyIEFOWSA9IHt9O1xuQ29tcGFyYXRvci5wcm90b3R5cGUucGFyc2UgPSBmdW5jdGlvbihjb21wKSB7XG4gIHZhciByID0gdGhpcy5sb29zZSA/IHJlW0NPTVBBUkFUT1JMT09TRV0gOiByZVtDT01QQVJBVE9SXTtcbiAgdmFyIG0gPSBjb21wLm1hdGNoKHIpO1xuXG4gIGlmICghbSlcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIGNvbXBhcmF0b3I6ICcgKyBjb21wKTtcblxuICB0aGlzLm9wZXJhdG9yID0gbVsxXTtcbiAgaWYgKHRoaXMub3BlcmF0b3IgPT09ICc9JylcbiAgICB0aGlzLm9wZXJhdG9yID0gJyc7XG5cbiAgLy8gaWYgaXQgbGl0ZXJhbGx5IGlzIGp1c3QgJz4nIG9yICcnIHRoZW4gYWxsb3cgYW55dGhpbmcuXG4gIGlmICghbVsyXSlcbiAgICB0aGlzLnNlbXZlciA9IEFOWTtcbiAgZWxzZVxuICAgIHRoaXMuc2VtdmVyID0gbmV3IFNlbVZlcihtWzJdLCB0aGlzLmxvb3NlKTtcbn07XG5cbkNvbXBhcmF0b3IucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnZhbHVlO1xufTtcblxuQ29tcGFyYXRvci5wcm90b3R5cGUudGVzdCA9IGZ1bmN0aW9uKHZlcnNpb24pIHtcbiAgZGVidWcoJ0NvbXBhcmF0b3IudGVzdCcsIHZlcnNpb24sIHRoaXMubG9vc2UpO1xuXG4gIGlmICh0aGlzLnNlbXZlciA9PT0gQU5ZKVxuICAgIHJldHVybiB0cnVlO1xuXG4gIGlmICh0eXBlb2YgdmVyc2lvbiA9PT0gJ3N0cmluZycpXG4gICAgdmVyc2lvbiA9IG5ldyBTZW1WZXIodmVyc2lvbiwgdGhpcy5sb29zZSk7XG5cbiAgcmV0dXJuIGNtcCh2ZXJzaW9uLCB0aGlzLm9wZXJhdG9yLCB0aGlzLnNlbXZlciwgdGhpcy5sb29zZSk7XG59O1xuXG5cbmV4cG9ydHMuUmFuZ2UgPSBSYW5nZTtcbmZ1bmN0aW9uIFJhbmdlKHJhbmdlLCBsb29zZSkge1xuICBpZiAoKHJhbmdlIGluc3RhbmNlb2YgUmFuZ2UpICYmIHJhbmdlLmxvb3NlID09PSBsb29zZSlcbiAgICByZXR1cm4gcmFuZ2U7XG5cbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFJhbmdlKSlcbiAgICByZXR1cm4gbmV3IFJhbmdlKHJhbmdlLCBsb29zZSk7XG5cbiAgdGhpcy5sb29zZSA9IGxvb3NlO1xuXG4gIC8vIEZpcnN0LCBzcGxpdCBiYXNlZCBvbiBib29sZWFuIG9yIHx8XG4gIHRoaXMucmF3ID0gcmFuZ2U7XG4gIHRoaXMuc2V0ID0gcmFuZ2Uuc3BsaXQoL1xccypcXHxcXHxcXHMqLykubWFwKGZ1bmN0aW9uKHJhbmdlKSB7XG4gICAgcmV0dXJuIHRoaXMucGFyc2VSYW5nZShyYW5nZS50cmltKCkpO1xuICB9LCB0aGlzKS5maWx0ZXIoZnVuY3Rpb24oYykge1xuICAgIC8vIHRocm93IG91dCBhbnkgdGhhdCBhcmUgbm90IHJlbGV2YW50IGZvciB3aGF0ZXZlciByZWFzb25cbiAgICByZXR1cm4gYy5sZW5ndGg7XG4gIH0pO1xuXG4gIGlmICghdGhpcy5zZXQubGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBTZW1WZXIgUmFuZ2U6ICcgKyByYW5nZSk7XG4gIH1cblxuICB0aGlzLmZvcm1hdCgpO1xufVxuXG5SYW5nZS5wcm90b3R5cGUuZm9ybWF0ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMucmFuZ2UgPSB0aGlzLnNldC5tYXAoZnVuY3Rpb24oY29tcHMpIHtcbiAgICByZXR1cm4gY29tcHMuam9pbignICcpLnRyaW0oKTtcbiAgfSkuam9pbignfHwnKS50cmltKCk7XG4gIHJldHVybiB0aGlzLnJhbmdlO1xufTtcblxuUmFuZ2UucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnJhbmdlO1xufTtcblxuUmFuZ2UucHJvdG90eXBlLnBhcnNlUmFuZ2UgPSBmdW5jdGlvbihyYW5nZSkge1xuICB2YXIgbG9vc2UgPSB0aGlzLmxvb3NlO1xuICByYW5nZSA9IHJhbmdlLnRyaW0oKTtcbiAgZGVidWcoJ3JhbmdlJywgcmFuZ2UsIGxvb3NlKTtcbiAgLy8gYDEuMi4zIC0gMS4yLjRgID0+IGA+PTEuMi4zIDw9MS4yLjRgXG4gIHZhciBociA9IGxvb3NlID8gcmVbSFlQSEVOUkFOR0VMT09TRV0gOiByZVtIWVBIRU5SQU5HRV07XG4gIHJhbmdlID0gcmFuZ2UucmVwbGFjZShociwgaHlwaGVuUmVwbGFjZSk7XG4gIGRlYnVnKCdoeXBoZW4gcmVwbGFjZScsIHJhbmdlKTtcbiAgLy8gYD4gMS4yLjMgPCAxLjIuNWAgPT4gYD4xLjIuMyA8MS4yLjVgXG4gIHJhbmdlID0gcmFuZ2UucmVwbGFjZShyZVtDT01QQVJBVE9SVFJJTV0sIGNvbXBhcmF0b3JUcmltUmVwbGFjZSk7XG4gIGRlYnVnKCdjb21wYXJhdG9yIHRyaW0nLCByYW5nZSwgcmVbQ09NUEFSQVRPUlRSSU1dKTtcblxuICAvLyBgfiAxLjIuM2AgPT4gYH4xLjIuM2BcbiAgcmFuZ2UgPSByYW5nZS5yZXBsYWNlKHJlW1RJTERFVFJJTV0sIHRpbGRlVHJpbVJlcGxhY2UpO1xuXG4gIC8vIGBeIDEuMi4zYCA9PiBgXjEuMi4zYFxuICByYW5nZSA9IHJhbmdlLnJlcGxhY2UocmVbQ0FSRVRUUklNXSwgY2FyZXRUcmltUmVwbGFjZSk7XG5cbiAgLy8gbm9ybWFsaXplIHNwYWNlc1xuICByYW5nZSA9IHJhbmdlLnNwbGl0KC9cXHMrLykuam9pbignICcpO1xuXG4gIC8vIEF0IHRoaXMgcG9pbnQsIHRoZSByYW5nZSBpcyBjb21wbGV0ZWx5IHRyaW1tZWQgYW5kXG4gIC8vIHJlYWR5IHRvIGJlIHNwbGl0IGludG8gY29tcGFyYXRvcnMuXG5cbiAgdmFyIGNvbXBSZSA9IGxvb3NlID8gcmVbQ09NUEFSQVRPUkxPT1NFXSA6IHJlW0NPTVBBUkFUT1JdO1xuICB2YXIgc2V0ID0gcmFuZ2Uuc3BsaXQoJyAnKS5tYXAoZnVuY3Rpb24oY29tcCkge1xuICAgIHJldHVybiBwYXJzZUNvbXBhcmF0b3IoY29tcCwgbG9vc2UpO1xuICB9KS5qb2luKCcgJykuc3BsaXQoL1xccysvKTtcbiAgaWYgKHRoaXMubG9vc2UpIHtcbiAgICAvLyBpbiBsb29zZSBtb2RlLCB0aHJvdyBvdXQgYW55IHRoYXQgYXJlIG5vdCB2YWxpZCBjb21wYXJhdG9yc1xuICAgIHNldCA9IHNldC5maWx0ZXIoZnVuY3Rpb24oY29tcCkge1xuICAgICAgcmV0dXJuICEhY29tcC5tYXRjaChjb21wUmUpO1xuICAgIH0pO1xuICB9XG4gIHNldCA9IHNldC5tYXAoZnVuY3Rpb24oY29tcCkge1xuICAgIHJldHVybiBuZXcgQ29tcGFyYXRvcihjb21wLCBsb29zZSk7XG4gIH0pO1xuXG4gIHJldHVybiBzZXQ7XG59O1xuXG4vLyBNb3N0bHkganVzdCBmb3IgdGVzdGluZyBhbmQgbGVnYWN5IEFQSSByZWFzb25zXG5leHBvcnRzLnRvQ29tcGFyYXRvcnMgPSB0b0NvbXBhcmF0b3JzO1xuZnVuY3Rpb24gdG9Db21wYXJhdG9ycyhyYW5nZSwgbG9vc2UpIHtcbiAgcmV0dXJuIG5ldyBSYW5nZShyYW5nZSwgbG9vc2UpLnNldC5tYXAoZnVuY3Rpb24oY29tcCkge1xuICAgIHJldHVybiBjb21wLm1hcChmdW5jdGlvbihjKSB7XG4gICAgICByZXR1cm4gYy52YWx1ZTtcbiAgICB9KS5qb2luKCcgJykudHJpbSgpLnNwbGl0KCcgJyk7XG4gIH0pO1xufVxuXG4vLyBjb21wcmlzZWQgb2YgeHJhbmdlcywgdGlsZGVzLCBzdGFycywgYW5kIGd0bHQncyBhdCB0aGlzIHBvaW50LlxuLy8gYWxyZWFkeSByZXBsYWNlZCB0aGUgaHlwaGVuIHJhbmdlc1xuLy8gdHVybiBpbnRvIGEgc2V0IG9mIEpVU1QgY29tcGFyYXRvcnMuXG5mdW5jdGlvbiBwYXJzZUNvbXBhcmF0b3IoY29tcCwgbG9vc2UpIHtcbiAgZGVidWcoJ2NvbXAnLCBjb21wKTtcbiAgY29tcCA9IHJlcGxhY2VDYXJldHMoY29tcCwgbG9vc2UpO1xuICBkZWJ1ZygnY2FyZXQnLCBjb21wKTtcbiAgY29tcCA9IHJlcGxhY2VUaWxkZXMoY29tcCwgbG9vc2UpO1xuICBkZWJ1ZygndGlsZGVzJywgY29tcCk7XG4gIGNvbXAgPSByZXBsYWNlWFJhbmdlcyhjb21wLCBsb29zZSk7XG4gIGRlYnVnKCd4cmFuZ2UnLCBjb21wKTtcbiAgY29tcCA9IHJlcGxhY2VTdGFycyhjb21wLCBsb29zZSk7XG4gIGRlYnVnKCdzdGFycycsIGNvbXApO1xuICByZXR1cm4gY29tcDtcbn1cblxuZnVuY3Rpb24gaXNYKGlkKSB7XG4gIHJldHVybiAhaWQgfHwgaWQudG9Mb3dlckNhc2UoKSA9PT0gJ3gnIHx8IGlkID09PSAnKic7XG59XG5cbi8vIH4sIH4+IC0tPiAqIChhbnksIGtpbmRhIHNpbGx5KVxuLy8gfjIsIH4yLngsIH4yLngueCwgfj4yLCB+PjIueCB+PjIueC54IC0tPiA+PTIuMC4wIDwzLjAuMFxuLy8gfjIuMCwgfjIuMC54LCB+PjIuMCwgfj4yLjAueCAtLT4gPj0yLjAuMCA8Mi4xLjBcbi8vIH4xLjIsIH4xLjIueCwgfj4xLjIsIH4+MS4yLnggLS0+ID49MS4yLjAgPDEuMy4wXG4vLyB+MS4yLjMsIH4+MS4yLjMgLS0+ID49MS4yLjMgPDEuMy4wXG4vLyB+MS4yLjAsIH4+MS4yLjAgLS0+ID49MS4yLjAgPDEuMy4wXG5mdW5jdGlvbiByZXBsYWNlVGlsZGVzKGNvbXAsIGxvb3NlKSB7XG4gIHJldHVybiBjb21wLnRyaW0oKS5zcGxpdCgvXFxzKy8pLm1hcChmdW5jdGlvbihjb21wKSB7XG4gICAgcmV0dXJuIHJlcGxhY2VUaWxkZShjb21wLCBsb29zZSk7XG4gIH0pLmpvaW4oJyAnKTtcbn1cblxuZnVuY3Rpb24gcmVwbGFjZVRpbGRlKGNvbXAsIGxvb3NlKSB7XG4gIHZhciByID0gbG9vc2UgPyByZVtUSUxERUxPT1NFXSA6IHJlW1RJTERFXTtcbiAgcmV0dXJuIGNvbXAucmVwbGFjZShyLCBmdW5jdGlvbihfLCBNLCBtLCBwLCBwcikge1xuICAgIGRlYnVnKCd0aWxkZScsIGNvbXAsIF8sIE0sIG0sIHAsIHByKTtcbiAgICB2YXIgcmV0O1xuXG4gICAgaWYgKGlzWChNKSlcbiAgICAgIHJldCA9ICcnO1xuICAgIGVsc2UgaWYgKGlzWChtKSlcbiAgICAgIHJldCA9ICc+PScgKyBNICsgJy4wLjAgPCcgKyAoK00gKyAxKSArICcuMC4wJztcbiAgICBlbHNlIGlmIChpc1gocCkpXG4gICAgICAvLyB+MS4yID09ID49MS4yLjAgPDEuMy4wXG4gICAgICByZXQgPSAnPj0nICsgTSArICcuJyArIG0gKyAnLjAgPCcgKyBNICsgJy4nICsgKCttICsgMSkgKyAnLjAnO1xuICAgIGVsc2UgaWYgKHByKSB7XG4gICAgICBkZWJ1ZygncmVwbGFjZVRpbGRlIHByJywgcHIpO1xuICAgICAgaWYgKHByLmNoYXJBdCgwKSAhPT0gJy0nKVxuICAgICAgICBwciA9ICctJyArIHByO1xuICAgICAgcmV0ID0gJz49JyArIE0gKyAnLicgKyBtICsgJy4nICsgcCArIHByICtcbiAgICAgICAgICAgICcgPCcgKyBNICsgJy4nICsgKCttICsgMSkgKyAnLjAnO1xuICAgIH0gZWxzZVxuICAgICAgLy8gfjEuMi4zID09ID49MS4yLjMgPDEuMy4wXG4gICAgICByZXQgPSAnPj0nICsgTSArICcuJyArIG0gKyAnLicgKyBwICtcbiAgICAgICAgICAgICcgPCcgKyBNICsgJy4nICsgKCttICsgMSkgKyAnLjAnO1xuXG4gICAgZGVidWcoJ3RpbGRlIHJldHVybicsIHJldCk7XG4gICAgcmV0dXJuIHJldDtcbiAgfSk7XG59XG5cbi8vIF4gLS0+ICogKGFueSwga2luZGEgc2lsbHkpXG4vLyBeMiwgXjIueCwgXjIueC54IC0tPiA+PTIuMC4wIDwzLjAuMFxuLy8gXjIuMCwgXjIuMC54IC0tPiA+PTIuMC4wIDwzLjAuMFxuLy8gXjEuMiwgXjEuMi54IC0tPiA+PTEuMi4wIDwyLjAuMFxuLy8gXjEuMi4zIC0tPiA+PTEuMi4zIDwyLjAuMFxuLy8gXjEuMi4wIC0tPiA+PTEuMi4wIDwyLjAuMFxuZnVuY3Rpb24gcmVwbGFjZUNhcmV0cyhjb21wLCBsb29zZSkge1xuICByZXR1cm4gY29tcC50cmltKCkuc3BsaXQoL1xccysvKS5tYXAoZnVuY3Rpb24oY29tcCkge1xuICAgIHJldHVybiByZXBsYWNlQ2FyZXQoY29tcCwgbG9vc2UpO1xuICB9KS5qb2luKCcgJyk7XG59XG5cbmZ1bmN0aW9uIHJlcGxhY2VDYXJldChjb21wLCBsb29zZSkge1xuICBkZWJ1ZygnY2FyZXQnLCBjb21wLCBsb29zZSk7XG4gIHZhciByID0gbG9vc2UgPyByZVtDQVJFVExPT1NFXSA6IHJlW0NBUkVUXTtcbiAgcmV0dXJuIGNvbXAucmVwbGFjZShyLCBmdW5jdGlvbihfLCBNLCBtLCBwLCBwcikge1xuICAgIGRlYnVnKCdjYXJldCcsIGNvbXAsIF8sIE0sIG0sIHAsIHByKTtcbiAgICB2YXIgcmV0O1xuXG4gICAgaWYgKGlzWChNKSlcbiAgICAgIHJldCA9ICcnO1xuICAgIGVsc2UgaWYgKGlzWChtKSlcbiAgICAgIHJldCA9ICc+PScgKyBNICsgJy4wLjAgPCcgKyAoK00gKyAxKSArICcuMC4wJztcbiAgICBlbHNlIGlmIChpc1gocCkpIHtcbiAgICAgIGlmIChNID09PSAnMCcpXG4gICAgICAgIHJldCA9ICc+PScgKyBNICsgJy4nICsgbSArICcuMCA8JyArIE0gKyAnLicgKyAoK20gKyAxKSArICcuMCc7XG4gICAgICBlbHNlXG4gICAgICAgIHJldCA9ICc+PScgKyBNICsgJy4nICsgbSArICcuMCA8JyArICgrTSArIDEpICsgJy4wLjAnO1xuICAgIH0gZWxzZSBpZiAocHIpIHtcbiAgICAgIGRlYnVnKCdyZXBsYWNlQ2FyZXQgcHInLCBwcik7XG4gICAgICBpZiAocHIuY2hhckF0KDApICE9PSAnLScpXG4gICAgICAgIHByID0gJy0nICsgcHI7XG4gICAgICBpZiAoTSA9PT0gJzAnKSB7XG4gICAgICAgIGlmIChtID09PSAnMCcpXG4gICAgICAgICAgcmV0ID0gJz49JyArIE0gKyAnLicgKyBtICsgJy4nICsgcCArIHByICtcbiAgICAgICAgICAgICAgICAnIDwnICsgTSArICcuJyArIG0gKyAnLicgKyAoK3AgKyAxKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHJldCA9ICc+PScgKyBNICsgJy4nICsgbSArICcuJyArIHAgKyBwciArXG4gICAgICAgICAgICAgICAgJyA8JyArIE0gKyAnLicgKyAoK20gKyAxKSArICcuMCc7XG4gICAgICB9IGVsc2VcbiAgICAgICAgcmV0ID0gJz49JyArIE0gKyAnLicgKyBtICsgJy4nICsgcCArIHByICtcbiAgICAgICAgICAgICAgJyA8JyArICgrTSArIDEpICsgJy4wLjAnO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWJ1Zygnbm8gcHInKTtcbiAgICAgIGlmIChNID09PSAnMCcpIHtcbiAgICAgICAgaWYgKG0gPT09ICcwJylcbiAgICAgICAgICByZXQgPSAnPj0nICsgTSArICcuJyArIG0gKyAnLicgKyBwICtcbiAgICAgICAgICAgICAgICAnIDwnICsgTSArICcuJyArIG0gKyAnLicgKyAoK3AgKyAxKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHJldCA9ICc+PScgKyBNICsgJy4nICsgbSArICcuJyArIHAgK1xuICAgICAgICAgICAgICAgICcgPCcgKyBNICsgJy4nICsgKCttICsgMSkgKyAnLjAnO1xuICAgICAgfSBlbHNlXG4gICAgICAgIHJldCA9ICc+PScgKyBNICsgJy4nICsgbSArICcuJyArIHAgK1xuICAgICAgICAgICAgICAnIDwnICsgKCtNICsgMSkgKyAnLjAuMCc7XG4gICAgfVxuXG4gICAgZGVidWcoJ2NhcmV0IHJldHVybicsIHJldCk7XG4gICAgcmV0dXJuIHJldDtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlcGxhY2VYUmFuZ2VzKGNvbXAsIGxvb3NlKSB7XG4gIGRlYnVnKCdyZXBsYWNlWFJhbmdlcycsIGNvbXAsIGxvb3NlKTtcbiAgcmV0dXJuIGNvbXAuc3BsaXQoL1xccysvKS5tYXAoZnVuY3Rpb24oY29tcCkge1xuICAgIHJldHVybiByZXBsYWNlWFJhbmdlKGNvbXAsIGxvb3NlKTtcbiAgfSkuam9pbignICcpO1xufVxuXG5mdW5jdGlvbiByZXBsYWNlWFJhbmdlKGNvbXAsIGxvb3NlKSB7XG4gIGNvbXAgPSBjb21wLnRyaW0oKTtcbiAgdmFyIHIgPSBsb29zZSA/IHJlW1hSQU5HRUxPT1NFXSA6IHJlW1hSQU5HRV07XG4gIHJldHVybiBjb21wLnJlcGxhY2UociwgZnVuY3Rpb24ocmV0LCBndGx0LCBNLCBtLCBwLCBwcikge1xuICAgIGRlYnVnKCd4UmFuZ2UnLCBjb21wLCByZXQsIGd0bHQsIE0sIG0sIHAsIHByKTtcbiAgICB2YXIgeE0gPSBpc1goTSk7XG4gICAgdmFyIHhtID0geE0gfHwgaXNYKG0pO1xuICAgIHZhciB4cCA9IHhtIHx8IGlzWChwKTtcbiAgICB2YXIgYW55WCA9IHhwO1xuXG4gICAgaWYgKGd0bHQgPT09ICc9JyAmJiBhbnlYKVxuICAgICAgZ3RsdCA9ICcnO1xuXG4gICAgaWYgKHhNKSB7XG4gICAgICBpZiAoZ3RsdCA9PT0gJz4nIHx8IGd0bHQgPT09ICc8Jykge1xuICAgICAgICAvLyBub3RoaW5nIGlzIGFsbG93ZWRcbiAgICAgICAgcmV0ID0gJzwwLjAuMCc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBub3RoaW5nIGlzIGZvcmJpZGRlblxuICAgICAgICByZXQgPSAnKic7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChndGx0ICYmIGFueVgpIHtcbiAgICAgIC8vIHJlcGxhY2UgWCB3aXRoIDBcbiAgICAgIGlmICh4bSlcbiAgICAgICAgbSA9IDA7XG4gICAgICBpZiAoeHApXG4gICAgICAgIHAgPSAwO1xuXG4gICAgICBpZiAoZ3RsdCA9PT0gJz4nKSB7XG4gICAgICAgIC8vID4xID0+ID49Mi4wLjBcbiAgICAgICAgLy8gPjEuMiA9PiA+PTEuMy4wXG4gICAgICAgIC8vID4xLjIuMyA9PiA+PSAxLjIuNFxuICAgICAgICBndGx0ID0gJz49JztcbiAgICAgICAgaWYgKHhtKSB7XG4gICAgICAgICAgTSA9ICtNICsgMTtcbiAgICAgICAgICBtID0gMDtcbiAgICAgICAgICBwID0gMDtcbiAgICAgICAgfSBlbHNlIGlmICh4cCkge1xuICAgICAgICAgIG0gPSArbSArIDE7XG4gICAgICAgICAgcCA9IDA7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoZ3RsdCA9PT0gJzw9Jykge1xuICAgICAgICAvLyA8PTAuNy54IGlzIGFjdHVhbGx5IDwwLjguMCwgc2luY2UgYW55IDAuNy54IHNob3VsZFxuICAgICAgICAvLyBwYXNzLiAgU2ltaWxhcmx5LCA8PTcueCBpcyBhY3R1YWxseSA8OC4wLjAsIGV0Yy5cbiAgICAgICAgZ3RsdCA9ICc8J1xuICAgICAgICBpZiAoeG0pXG4gICAgICAgICAgTSA9ICtNICsgMVxuICAgICAgICBlbHNlXG4gICAgICAgICAgbSA9ICttICsgMVxuICAgICAgfVxuXG4gICAgICByZXQgPSBndGx0ICsgTSArICcuJyArIG0gKyAnLicgKyBwO1xuICAgIH0gZWxzZSBpZiAoeG0pIHtcbiAgICAgIHJldCA9ICc+PScgKyBNICsgJy4wLjAgPCcgKyAoK00gKyAxKSArICcuMC4wJztcbiAgICB9IGVsc2UgaWYgKHhwKSB7XG4gICAgICByZXQgPSAnPj0nICsgTSArICcuJyArIG0gKyAnLjAgPCcgKyBNICsgJy4nICsgKCttICsgMSkgKyAnLjAnO1xuICAgIH1cblxuICAgIGRlYnVnKCd4UmFuZ2UgcmV0dXJuJywgcmV0KTtcblxuICAgIHJldHVybiByZXQ7XG4gIH0pO1xufVxuXG4vLyBCZWNhdXNlICogaXMgQU5ELWVkIHdpdGggZXZlcnl0aGluZyBlbHNlIGluIHRoZSBjb21wYXJhdG9yLFxuLy8gYW5kICcnIG1lYW5zIFwiYW55IHZlcnNpb25cIiwganVzdCByZW1vdmUgdGhlICpzIGVudGlyZWx5LlxuZnVuY3Rpb24gcmVwbGFjZVN0YXJzKGNvbXAsIGxvb3NlKSB7XG4gIGRlYnVnKCdyZXBsYWNlU3RhcnMnLCBjb21wLCBsb29zZSk7XG4gIC8vIExvb3NlbmVzcyBpcyBpZ25vcmVkIGhlcmUuICBzdGFyIGlzIGFsd2F5cyBhcyBsb29zZSBhcyBpdCBnZXRzIVxuICByZXR1cm4gY29tcC50cmltKCkucmVwbGFjZShyZVtTVEFSXSwgJycpO1xufVxuXG4vLyBUaGlzIGZ1bmN0aW9uIGlzIHBhc3NlZCB0byBzdHJpbmcucmVwbGFjZShyZVtIWVBIRU5SQU5HRV0pXG4vLyBNLCBtLCBwYXRjaCwgcHJlcmVsZWFzZSwgYnVpbGRcbi8vIDEuMiAtIDMuNC41ID0+ID49MS4yLjAgPD0zLjQuNVxuLy8gMS4yLjMgLSAzLjQgPT4gPj0xLjIuMCA8My41LjAgQW55IDMuNC54IHdpbGwgZG9cbi8vIDEuMiAtIDMuNCA9PiA+PTEuMi4wIDwzLjUuMFxuZnVuY3Rpb24gaHlwaGVuUmVwbGFjZSgkMCxcbiAgICAgICAgICAgICAgICAgICAgICAgZnJvbSwgZk0sIGZtLCBmcCwgZnByLCBmYixcbiAgICAgICAgICAgICAgICAgICAgICAgdG8sIHRNLCB0bSwgdHAsIHRwciwgdGIpIHtcblxuICBpZiAoaXNYKGZNKSlcbiAgICBmcm9tID0gJyc7XG4gIGVsc2UgaWYgKGlzWChmbSkpXG4gICAgZnJvbSA9ICc+PScgKyBmTSArICcuMC4wJztcbiAgZWxzZSBpZiAoaXNYKGZwKSlcbiAgICBmcm9tID0gJz49JyArIGZNICsgJy4nICsgZm0gKyAnLjAnO1xuICBlbHNlXG4gICAgZnJvbSA9ICc+PScgKyBmcm9tO1xuXG4gIGlmIChpc1godE0pKVxuICAgIHRvID0gJyc7XG4gIGVsc2UgaWYgKGlzWCh0bSkpXG4gICAgdG8gPSAnPCcgKyAoK3RNICsgMSkgKyAnLjAuMCc7XG4gIGVsc2UgaWYgKGlzWCh0cCkpXG4gICAgdG8gPSAnPCcgKyB0TSArICcuJyArICgrdG0gKyAxKSArICcuMCc7XG4gIGVsc2UgaWYgKHRwcilcbiAgICB0byA9ICc8PScgKyB0TSArICcuJyArIHRtICsgJy4nICsgdHAgKyAnLScgKyB0cHI7XG4gIGVsc2VcbiAgICB0byA9ICc8PScgKyB0bztcblxuICByZXR1cm4gKGZyb20gKyAnICcgKyB0bykudHJpbSgpO1xufVxuXG5cbi8vIGlmIEFOWSBvZiB0aGUgc2V0cyBtYXRjaCBBTEwgb2YgaXRzIGNvbXBhcmF0b3JzLCB0aGVuIHBhc3NcblJhbmdlLnByb3RvdHlwZS50ZXN0ID0gZnVuY3Rpb24odmVyc2lvbikge1xuICBpZiAoIXZlcnNpb24pXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGlmICh0eXBlb2YgdmVyc2lvbiA9PT0gJ3N0cmluZycpXG4gICAgdmVyc2lvbiA9IG5ldyBTZW1WZXIodmVyc2lvbiwgdGhpcy5sb29zZSk7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnNldC5sZW5ndGg7IGkrKykge1xuICAgIGlmICh0ZXN0U2V0KHRoaXMuc2V0W2ldLCB2ZXJzaW9uKSlcbiAgICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbmZ1bmN0aW9uIHRlc3RTZXQoc2V0LCB2ZXJzaW9uKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc2V0Lmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKCFzZXRbaV0udGVzdCh2ZXJzaW9uKSlcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmICh2ZXJzaW9uLnByZXJlbGVhc2UubGVuZ3RoKSB7XG4gICAgLy8gRmluZCB0aGUgc2V0IG9mIHZlcnNpb25zIHRoYXQgYXJlIGFsbG93ZWQgdG8gaGF2ZSBwcmVyZWxlYXNlc1xuICAgIC8vIEZvciBleGFtcGxlLCBeMS4yLjMtcHIuMSBkZXN1Z2FycyB0byA+PTEuMi4zLXByLjEgPDIuMC4wXG4gICAgLy8gVGhhdCBzaG91bGQgYWxsb3cgYDEuMi4zLXByLjJgIHRvIHBhc3MuXG4gICAgLy8gSG93ZXZlciwgYDEuMi40LWFscGhhLm5vdHJlYWR5YCBzaG91bGQgTk9UIGJlIGFsbG93ZWQsXG4gICAgLy8gZXZlbiB0aG91Z2ggaXQncyB3aXRoaW4gdGhlIHJhbmdlIHNldCBieSB0aGUgY29tcGFyYXRvcnMuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZXQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGRlYnVnKHNldFtpXS5zZW12ZXIpO1xuICAgICAgaWYgKHNldFtpXS5zZW12ZXIgPT09IEFOWSlcbiAgICAgICAgY29udGludWU7XG5cbiAgICAgIGlmIChzZXRbaV0uc2VtdmVyLnByZXJlbGVhc2UubGVuZ3RoID4gMCkge1xuICAgICAgICB2YXIgYWxsb3dlZCA9IHNldFtpXS5zZW12ZXI7XG4gICAgICAgIGlmIChhbGxvd2VkLm1ham9yID09PSB2ZXJzaW9uLm1ham9yICYmXG4gICAgICAgICAgICBhbGxvd2VkLm1pbm9yID09PSB2ZXJzaW9uLm1pbm9yICYmXG4gICAgICAgICAgICBhbGxvd2VkLnBhdGNoID09PSB2ZXJzaW9uLnBhdGNoKVxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFZlcnNpb24gaGFzIGEgLXByZSwgYnV0IGl0J3Mgbm90IG9uZSBvZiB0aGUgb25lcyB3ZSBsaWtlLlxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5leHBvcnRzLnNhdGlzZmllcyA9IHNhdGlzZmllcztcbmZ1bmN0aW9uIHNhdGlzZmllcyh2ZXJzaW9uLCByYW5nZSwgbG9vc2UpIHtcbiAgdHJ5IHtcbiAgICByYW5nZSA9IG5ldyBSYW5nZShyYW5nZSwgbG9vc2UpO1xuICB9IGNhdGNoIChlcikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gcmFuZ2UudGVzdCh2ZXJzaW9uKTtcbn1cblxuZXhwb3J0cy5tYXhTYXRpc2Z5aW5nID0gbWF4U2F0aXNmeWluZztcbmZ1bmN0aW9uIG1heFNhdGlzZnlpbmcodmVyc2lvbnMsIHJhbmdlLCBsb29zZSkge1xuICByZXR1cm4gdmVyc2lvbnMuZmlsdGVyKGZ1bmN0aW9uKHZlcnNpb24pIHtcbiAgICByZXR1cm4gc2F0aXNmaWVzKHZlcnNpb24sIHJhbmdlLCBsb29zZSk7XG4gIH0pLnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgIHJldHVybiByY29tcGFyZShhLCBiLCBsb29zZSk7XG4gIH0pWzBdIHx8IG51bGw7XG59XG5cbmV4cG9ydHMudmFsaWRSYW5nZSA9IHZhbGlkUmFuZ2U7XG5mdW5jdGlvbiB2YWxpZFJhbmdlKHJhbmdlLCBsb29zZSkge1xuICB0cnkge1xuICAgIC8vIFJldHVybiAnKicgaW5zdGVhZCBvZiAnJyBzbyB0aGF0IHRydXRoaW5lc3Mgd29ya3MuXG4gICAgLy8gVGhpcyB3aWxsIHRocm93IGlmIGl0J3MgaW52YWxpZCBhbnl3YXlcbiAgICByZXR1cm4gbmV3IFJhbmdlKHJhbmdlLCBsb29zZSkucmFuZ2UgfHwgJyonO1xuICB9IGNhdGNoIChlcikge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbi8vIERldGVybWluZSBpZiB2ZXJzaW9uIGlzIGxlc3MgdGhhbiBhbGwgdGhlIHZlcnNpb25zIHBvc3NpYmxlIGluIHRoZSByYW5nZVxuZXhwb3J0cy5sdHIgPSBsdHI7XG5mdW5jdGlvbiBsdHIodmVyc2lvbiwgcmFuZ2UsIGxvb3NlKSB7XG4gIHJldHVybiBvdXRzaWRlKHZlcnNpb24sIHJhbmdlLCAnPCcsIGxvb3NlKTtcbn1cblxuLy8gRGV0ZXJtaW5lIGlmIHZlcnNpb24gaXMgZ3JlYXRlciB0aGFuIGFsbCB0aGUgdmVyc2lvbnMgcG9zc2libGUgaW4gdGhlIHJhbmdlLlxuZXhwb3J0cy5ndHIgPSBndHI7XG5mdW5jdGlvbiBndHIodmVyc2lvbiwgcmFuZ2UsIGxvb3NlKSB7XG4gIHJldHVybiBvdXRzaWRlKHZlcnNpb24sIHJhbmdlLCAnPicsIGxvb3NlKTtcbn1cblxuZXhwb3J0cy5vdXRzaWRlID0gb3V0c2lkZTtcbmZ1bmN0aW9uIG91dHNpZGUodmVyc2lvbiwgcmFuZ2UsIGhpbG8sIGxvb3NlKSB7XG4gIHZlcnNpb24gPSBuZXcgU2VtVmVyKHZlcnNpb24sIGxvb3NlKTtcbiAgcmFuZ2UgPSBuZXcgUmFuZ2UocmFuZ2UsIGxvb3NlKTtcblxuICB2YXIgZ3RmbiwgbHRlZm4sIGx0Zm4sIGNvbXAsIGVjb21wO1xuICBzd2l0Y2ggKGhpbG8pIHtcbiAgICBjYXNlICc+JzpcbiAgICAgIGd0Zm4gPSBndDtcbiAgICAgIGx0ZWZuID0gbHRlO1xuICAgICAgbHRmbiA9IGx0O1xuICAgICAgY29tcCA9ICc+JztcbiAgICAgIGVjb21wID0gJz49JztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJzwnOlxuICAgICAgZ3RmbiA9IGx0O1xuICAgICAgbHRlZm4gPSBndGU7XG4gICAgICBsdGZuID0gZ3Q7XG4gICAgICBjb21wID0gJzwnO1xuICAgICAgZWNvbXAgPSAnPD0nO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ011c3QgcHJvdmlkZSBhIGhpbG8gdmFsIG9mIFwiPFwiIG9yIFwiPlwiJyk7XG4gIH1cblxuICAvLyBJZiBpdCBzYXRpc2lmZXMgdGhlIHJhbmdlIGl0IGlzIG5vdCBvdXRzaWRlXG4gIGlmIChzYXRpc2ZpZXModmVyc2lvbiwgcmFuZ2UsIGxvb3NlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIEZyb20gbm93IG9uLCB2YXJpYWJsZSB0ZXJtcyBhcmUgYXMgaWYgd2UncmUgaW4gXCJndHJcIiBtb2RlLlxuICAvLyBidXQgbm90ZSB0aGF0IGV2ZXJ5dGhpbmcgaXMgZmxpcHBlZCBmb3IgdGhlIFwibHRyXCIgZnVuY3Rpb24uXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByYW5nZS5zZXQubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgY29tcGFyYXRvcnMgPSByYW5nZS5zZXRbaV07XG5cbiAgICB2YXIgaGlnaCA9IG51bGw7XG4gICAgdmFyIGxvdyA9IG51bGw7XG5cbiAgICBjb21wYXJhdG9ycy5mb3JFYWNoKGZ1bmN0aW9uKGNvbXBhcmF0b3IpIHtcbiAgICAgIGlmIChjb21wYXJhdG9yLnNlbXZlciA9PT0gQU5ZKSB7XG4gICAgICAgIGNvbXBhcmF0b3IgPSBuZXcgQ29tcGFyYXRvcignPj0wLjAuMCcpXG4gICAgICB9XG4gICAgICBoaWdoID0gaGlnaCB8fCBjb21wYXJhdG9yO1xuICAgICAgbG93ID0gbG93IHx8IGNvbXBhcmF0b3I7XG4gICAgICBpZiAoZ3Rmbihjb21wYXJhdG9yLnNlbXZlciwgaGlnaC5zZW12ZXIsIGxvb3NlKSkge1xuICAgICAgICBoaWdoID0gY29tcGFyYXRvcjtcbiAgICAgIH0gZWxzZSBpZiAobHRmbihjb21wYXJhdG9yLnNlbXZlciwgbG93LnNlbXZlciwgbG9vc2UpKSB7XG4gICAgICAgIGxvdyA9IGNvbXBhcmF0b3I7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBJZiB0aGUgZWRnZSB2ZXJzaW9uIGNvbXBhcmF0b3IgaGFzIGEgb3BlcmF0b3IgdGhlbiBvdXIgdmVyc2lvblxuICAgIC8vIGlzbid0IG91dHNpZGUgaXRcbiAgICBpZiAoaGlnaC5vcGVyYXRvciA9PT0gY29tcCB8fCBoaWdoLm9wZXJhdG9yID09PSBlY29tcCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIElmIHRoZSBsb3dlc3QgdmVyc2lvbiBjb21wYXJhdG9yIGhhcyBhbiBvcGVyYXRvciBhbmQgb3VyIHZlcnNpb25cbiAgICAvLyBpcyBsZXNzIHRoYW4gaXQgdGhlbiBpdCBpc24ndCBoaWdoZXIgdGhhbiB0aGUgcmFuZ2VcbiAgICBpZiAoKCFsb3cub3BlcmF0b3IgfHwgbG93Lm9wZXJhdG9yID09PSBjb21wKSAmJlxuICAgICAgICBsdGVmbih2ZXJzaW9uLCBsb3cuc2VtdmVyKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSBpZiAobG93Lm9wZXJhdG9yID09PSBlY29tcCAmJiBsdGZuKHZlcnNpb24sIGxvdy5zZW12ZXIpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG5leHBvcnRzLnByZXJlbGVhc2UgPSBwcmVyZWxlYXNlO1xuZnVuY3Rpb24gcHJlcmVsZWFzZSh2ZXJzaW9uLCBsb29zZSkge1xuICB2YXIgcGFyc2VkID0gcGFyc2UodmVyc2lvbiwgbG9vc2UpO1xuICByZXR1cm4gKHBhcnNlZCAmJiBwYXJzZWQucHJlcmVsZWFzZS5sZW5ndGgpID8gcGFyc2VkLnByZXJlbGVhc2UgOiBudWxsO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L3NlbXZlci9zZW12ZXIuanNcbiAqKi8iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcblxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG4oZnVuY3Rpb24gKCkge1xuICB0cnkge1xuICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICB9IGNhdGNoIChlKSB7XG4gICAgY2FjaGVkU2V0VGltZW91dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBpcyBub3QgZGVmaW5lZCcpO1xuICAgIH1cbiAgfVxuICB0cnkge1xuICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGlzIG5vdCBkZWZpbmVkJyk7XG4gICAgfVxuICB9XG59ICgpKVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gY2FjaGVkU2V0VGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgY2FjaGVkQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dChkcmFpblF1ZXVlLCAwKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqICh3ZWJwYWNrKS9+L25vZGUtbGlicy1icm93c2VyL34vcHJvY2Vzcy9icm93c2VyLmpzXG4gKiovIiwiLyoqXG4gKiBAZmlsZU92ZXJ2aWV3XG4gKiBWaWV3TW9kZWwgQ29uc3RydWN0b3IgJiBkZWZpbml0aW9uXG4gKi9cblxuaW1wb3J0ICogYXMgXyBmcm9tICcuLi91dGlsJ1xuaW1wb3J0ICogYXMgc3RhdGUgZnJvbSAnLi4vY29yZS9zdGF0ZSdcbmltcG9ydCAqIGFzIGNvbXBpbGVyIGZyb20gJy4vY29tcGlsZXInXG5pbXBvcnQgKiBhcyBkaXJlY3RpdmUgZnJvbSAnLi9kaXJlY3RpdmUnXG5pbXBvcnQgKiBhcyBkb21IZWxwZXIgZnJvbSAnLi9kb20taGVscGVyJ1xuaW1wb3J0ICogYXMgZXZlbnRzIGZyb20gJy4vZXZlbnRzJ1xuXG5pbXBvcnQgeyByZWdpc3Rlck1vZHVsZXMsIHJlZ2lzdGVyTWV0aG9kcyB9IGZyb20gJy4uL2FwcC9yZWdpc3RlcidcblxuZnVuY3Rpb24gY2FsbE9sZFJlYWR5RW50cnkgKHZtLCBjb21wb25lbnQpIHtcbiAgaWYgKGNvbXBvbmVudC5tZXRob2RzICYmXG4gICAgICBjb21wb25lbnQubWV0aG9kcy5yZWFkeSkge1xuICAgIF8ud2FybignXCJleHBvcnRzLm1ldGhvZHMucmVhZHlcIiBpcyBkZXByZWNhdGVkLCAnICtcbiAgICAgICdwbGVhc2UgdXNlIFwiZXhwb3J0cy5jcmVhdGVkXCIgaW5zdGVhZCcpXG4gICAgY29tcG9uZW50Lm1ldGhvZHMucmVhZHkuY2FsbCh2bSlcbiAgfVxufVxuXG4vKipcbiAqIFZpZXdNb2RlbCBjb25zdHJ1Y3RvclxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAgICBjb21wb25lbnQgb3B0aW9uc1xuICogQHBhcmFtIHtvYmplY3R9IHBhcmVudFZtICAgd2hpY2ggY29udGFpbnMgX2FwcFxuICogQHBhcmFtIHtvYmplY3R9IHBhcmVudEVsICAgcm9vdCBlbGVtZW50IG9yIGZyYWcgYmxvY2tcbiAqIEBwYXJhbSB7b2JqZWN0fSBtZXJnZWREYXRhIGV4dGVybmFsIGRhdGFcbiAqIEBwYXJhbSB7b2JqZWN0fSBleHRlcm5hbEV2ZW50cyBleHRlcm5hbCBldmVudHNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gVm0gKFxuICB0eXBlLFxuICBvcHRpb25zLFxuICBwYXJlbnRWbSxcbiAgcGFyZW50RWwsXG4gIG1lcmdlZERhdGEsXG4gIGV4dGVybmFsRXZlbnRzXG4pIHtcbiAgdGhpcy5fcGFyZW50ID0gcGFyZW50Vm0uX3JlYWxQYXJlbnQgPyBwYXJlbnRWbS5fcmVhbFBhcmVudCA6IHBhcmVudFZtXG4gIHRoaXMuX2FwcCA9IHBhcmVudFZtLl9hcHBcbiAgcGFyZW50Vm0uX2NoaWxkcmVuVm1zICYmIHBhcmVudFZtLl9jaGlsZHJlblZtcy5wdXNoKHRoaXMpXG5cbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHRoaXMuX2FwcC5jdXN0b21Db21wb25lbnRNYXBbdHlwZV0gfHwge31cbiAgfVxuICBjb25zdCBkYXRhID0gb3B0aW9ucy5kYXRhIHx8IHt9XG5cbiAgdGhpcy5fb3B0aW9ucyA9IG9wdGlvbnNcbiAgdGhpcy5fbWV0aG9kcyA9IG9wdGlvbnMubWV0aG9kcyB8fCB7fVxuICB0aGlzLl9jb21wdXRlZCA9IG9wdGlvbnMuY29tcHV0ZWQgfHwge31cbiAgdGhpcy5fY3NzID0gb3B0aW9ucy5zdHlsZSB8fCB7fVxuICB0aGlzLl9pZHMgPSB7fVxuICB0aGlzLl92bUV2ZW50cyA9IHt9XG4gIHRoaXMuX2NoaWxkcmVuVm1zID0gW11cbiAgdGhpcy5fdHlwZSA9IHR5cGVcblxuICAvLyBiaW5kIGV2ZW50cyBhbmQgbGlmZWN5Y2xlc1xuICB0aGlzLl9pbml0RXZlbnRzKGV4dGVybmFsRXZlbnRzKVxuXG4gIF8uZGVidWcoYFwiaW5pdFwiIGxpZmVjeWNsZSBpbiBWbSgke3RoaXMuX3R5cGV9KWApXG4gIHRoaXMuJGVtaXQoJ2hvb2s6aW5pdCcpXG4gIHRoaXMuX2luaXRlZCA9IHRydWVcbiAgLy8gcHJveHkgZGF0YSBhbmQgbWV0aG9kc1xuICAvLyBvYnNlcnZlIGRhdGEgYW5kIGFkZCB0aGlzIHRvIHZtc1xuICB0aGlzLl9kYXRhID0gdHlwZW9mIGRhdGEgPT09ICdmdW5jdGlvbicgPyBkYXRhKCkgOiBkYXRhXG4gIGlmIChtZXJnZWREYXRhKSB7XG4gICAgXy5leHRlbmQodGhpcy5fZGF0YSwgbWVyZ2VkRGF0YSlcbiAgfVxuICB0aGlzLl9pbml0U3RhdGUoKVxuXG4gIF8uZGVidWcoYFwiY3JlYXRlZFwiIGxpZmVjeWNsZSBpbiBWbSgke3RoaXMuX3R5cGV9KWApXG4gIHRoaXMuJGVtaXQoJ2hvb2s6Y3JlYXRlZCcpXG4gIHRoaXMuX2NyZWF0ZWQgPSB0cnVlXG4gIC8vIGJhY2t3YXJkIG9sZCByZWFkeSBlbnRyeVxuICBjYWxsT2xkUmVhZHlFbnRyeSh0aGlzLCBvcHRpb25zKVxuXG4gIC8vIGlmIG5vIHBhcmVudEVsZW1lbnQgdGhlbiBzcGVjaWZ5IHRoZSBkb2N1bWVudEVsZW1lbnRcbiAgdGhpcy5fcGFyZW50RWwgPSBwYXJlbnRFbCB8fCB0aGlzLl9hcHAuZG9jLmRvY3VtZW50RWxlbWVudFxuICB0aGlzLl9idWlsZCgpXG59XG5cbl8uZXh0ZW5kKFZtLnByb3RvdHlwZSwgc3RhdGUsIGNvbXBpbGVyLCBkaXJlY3RpdmUsIGRvbUhlbHBlciwgZXZlbnRzKVxuXy5leHRlbmQoVm0sIHtcbiAgcmVnaXN0ZXJNb2R1bGVzLFxuICByZWdpc3Rlck1ldGhvZHNcbn0pXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2h0bWw1L2RlZmF1bHQvdm0vaW5kZXguanNcbiAqKi8iLCIvKiBlc2xpbnQtZGlzYWJsZSAqL1xuXG5pbXBvcnQgV2F0Y2hlciBmcm9tICcuL3dhdGNoZXInXG5pbXBvcnQgRGVwIGZyb20gJy4vZGVwJ1xuaW1wb3J0IHtcbiAgb2JzZXJ2ZSxcbiAgcHJveHksXG4gIHVucHJveHlcbn0gZnJvbSAnLi9vYnNlcnZlcidcbmltcG9ydCB7XG4gIGlzQXJyYXksXG4gIGlzUGxhaW5PYmplY3QsXG4gIGJpbmRcbn0gZnJvbSAnLi4vdXRpbCdcblxuZXhwb3J0IGZ1bmN0aW9uIF9pbml0U3RhdGUgKCkge1xuICBjb25zdCB2bSA9IHRoaXNcbiAgdm0uX3dhdGNoZXJzID0gW11cbiAgdm0uX2luaXREYXRhKClcbiAgdm0uX2luaXRDb21wdXRlZCgpXG4gIHZtLl9pbml0TWV0aG9kcygpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfaW5pdERhdGEgKCkge1xuICBjb25zdCB2bSA9IHRoaXNcbiAgbGV0IGRhdGEgPSB2bS5fZGF0YVxuXG4gIGlmICghaXNQbGFpbk9iamVjdChkYXRhKSkge1xuICAgIGRhdGEgPSB7fVxuICB9XG4gIC8vIHByb3h5IGRhdGEgb24gaW5zdGFuY2VcbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGRhdGEpXG4gIGxldCBpID0ga2V5cy5sZW5ndGhcbiAgd2hpbGUgKGktLSkge1xuICAgIHByb3h5KHZtLCBrZXlzW2ldKVxuICB9XG4gIC8vIG9ic2VydmUgZGF0YVxuICBvYnNlcnZlKGRhdGEsIHZtKVxufVxuXG5mdW5jdGlvbiBub29wICgpIHtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9pbml0Q29tcHV0ZWQgKCkge1xuICBjb25zdCB2bSA9IHRoaXNcbiAgY29uc3QgY29tcHV0ZWQgPSB2bS5fY29tcHV0ZWRcbiAgaWYgKGNvbXB1dGVkKSB7XG4gICAgZm9yIChsZXQga2V5IGluIGNvbXB1dGVkKSB7XG4gICAgICBjb25zdCB1c2VyRGVmID0gY29tcHV0ZWRba2V5XVxuICAgICAgY29uc3QgZGVmID0ge1xuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgdXNlckRlZiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBkZWYuZ2V0ID0gbWFrZUNvbXB1dGVkR2V0dGVyKHVzZXJEZWYsIHZtKVxuICAgICAgICBkZWYuc2V0ID0gbm9vcFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVmLmdldCA9IHVzZXJEZWYuZ2V0XG4gICAgICAgICAgPyB1c2VyRGVmLmNhY2hlICE9PSBmYWxzZVxuICAgICAgICAgICAgPyBtYWtlQ29tcHV0ZWRHZXR0ZXIodXNlckRlZi5nZXQsIHZtKVxuICAgICAgICAgICAgOiBiaW5kKHVzZXJEZWYuZ2V0LCB2bSlcbiAgICAgICAgICA6IG5vb3BcbiAgICAgICAgZGVmLnNldCA9IHVzZXJEZWYuc2V0XG4gICAgICAgICAgPyBiaW5kKHVzZXJEZWYuc2V0LCB2bSlcbiAgICAgICAgICA6IG5vb3BcbiAgICAgIH1cbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh2bSwga2V5LCBkZWYpXG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIG1ha2VDb21wdXRlZEdldHRlciAoZ2V0dGVyLCBvd25lcikge1xuICBjb25zdCB3YXRjaGVyID0gbmV3IFdhdGNoZXIob3duZXIsIGdldHRlciwgbnVsbCwge1xuICAgIGxhenk6IHRydWVcbiAgfSlcbiAgcmV0dXJuIGZ1bmN0aW9uIGNvbXB1dGVkR2V0dGVyICgpIHtcbiAgICBpZiAod2F0Y2hlci5kaXJ0eSkge1xuICAgICAgd2F0Y2hlci5ldmFsdWF0ZSgpXG4gICAgfVxuICAgIGlmIChEZXAudGFyZ2V0KSB7XG4gICAgICB3YXRjaGVyLmRlcGVuZCgpXG4gICAgfVxuICAgIHJldHVybiB3YXRjaGVyLnZhbHVlXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9pbml0TWV0aG9kcyAoKSB7XG4gIGNvbnN0IHZtID0gdGhpc1xuICBjb25zdCBtZXRob2RzID0gdm0uX21ldGhvZHNcbiAgaWYgKG1ldGhvZHMpIHtcbiAgICBmb3IgKGxldCBrZXkgaW4gbWV0aG9kcykge1xuICAgICAgdm1ba2V5XSA9IGJpbmQobWV0aG9kc1trZXldLCB2bSlcbiAgICB9XG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vaHRtbDUvZGVmYXVsdC9jb3JlL3N0YXRlLmpzXG4gKiovIiwiLyogZXNsaW50LWRpc2FibGUgKi9cblxuaW1wb3J0IERlcCBmcm9tICcuL2RlcCdcbi8vIGltcG9ydCB7IHB1c2hXYXRjaGVyIH0gZnJvbSAnLi9iYXRjaGVyJ1xuaW1wb3J0IHtcbiAgd2FybixcbiAgcmVtb3ZlLFxuICBleHRlbmQsXG4gIGlzQXJyYXksXG4gIGlzT2JqZWN0LFxuICBwYXJzZVBhdGgsXG4gIF9TZXQgYXMgU2V0XG59IGZyb20gJy4uL3V0aWwnXG5cbmxldCB1aWQgPSAwXG5sZXQgcHJldlRhcmdldFxuXG4vKipcbiAqIEEgd2F0Y2hlciBwYXJzZXMgYW4gZXhwcmVzc2lvbiwgY29sbGVjdHMgZGVwZW5kZW5jaWVzLFxuICogYW5kIGZpcmVzIGNhbGxiYWNrIHdoZW4gdGhlIGV4cHJlc3Npb24gdmFsdWUgY2hhbmdlcy5cbiAqIFRoaXMgaXMgdXNlZCBmb3IgYm90aCB0aGUgJHdhdGNoKCkgYXBpIGFuZCBkaXJlY3RpdmVzLlxuICpcbiAqIEBwYXJhbSB7VnVlfSB2bVxuICogQHBhcmFtIHtTdHJpbmd8RnVuY3Rpb259IGV4cE9yRm5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNiXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogICAgICAgICAgICAgICAgIC0ge0FycmF5fSBmaWx0ZXJzXG4gKiAgICAgICAgICAgICAgICAgLSB7Qm9vbGVhbn0gdHdvV2F5XG4gKiAgICAgICAgICAgICAgICAgLSB7Qm9vbGVhbn0gZGVlcFxuICogICAgICAgICAgICAgICAgIC0ge0Jvb2xlYW59IHVzZXJcbiAqICAgICAgICAgICAgICAgICAtIHtCb29sZWFufSBzeW5jXG4gKiAgICAgICAgICAgICAgICAgLSB7Qm9vbGVhbn0gbGF6eVxuICogICAgICAgICAgICAgICAgIC0ge0Z1bmN0aW9ufSBbcHJlUHJvY2Vzc11cbiAqICAgICAgICAgICAgICAgICAtIHtGdW5jdGlvbn0gW3Bvc3RQcm9jZXNzXVxuICogQGNvbnN0cnVjdG9yXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gV2F0Y2hlciAodm0sIGV4cE9yRm4sIGNiLCBvcHRpb25zKSB7XG4gIC8vIG1peCBpbiBvcHRpb25zXG4gIGlmIChvcHRpb25zKSB7XG4gICAgZXh0ZW5kKHRoaXMsIG9wdGlvbnMpXG4gIH1cbiAgY29uc3QgaXNGbiA9IHR5cGVvZiBleHBPckZuID09PSAnZnVuY3Rpb24nXG4gIHRoaXMudm0gPSB2bVxuICB2bS5fd2F0Y2hlcnMucHVzaCh0aGlzKVxuICB0aGlzLmV4cHJlc3Npb24gPSBleHBPckZuXG4gIHRoaXMuY2IgPSBjYlxuICB0aGlzLmlkID0gKyt1aWQgLy8gdWlkIGZvciBiYXRjaGluZ1xuICB0aGlzLmFjdGl2ZSA9IHRydWVcbiAgdGhpcy5kaXJ0eSA9IHRoaXMubGF6eSAvLyBmb3IgbGF6eSB3YXRjaGVyc1xuICB0aGlzLmRlcHMgPSBbXVxuICB0aGlzLm5ld0RlcHMgPSBbXVxuICB0aGlzLmRlcElkcyA9IG5ldyBTZXQoKVxuICB0aGlzLm5ld0RlcElkcyA9IG5ldyBTZXQoKVxuICAvLyBwYXJzZSBleHByZXNzaW9uIGZvciBnZXR0ZXJcbiAgaWYgKGlzRm4pIHtcbiAgICB0aGlzLmdldHRlciA9IGV4cE9yRm5cbiAgfSBlbHNlIHtcbiAgICB0aGlzLmdldHRlciA9IHBhcnNlUGF0aChleHBPckZuKVxuICAgIGlmICghdGhpcy5nZXR0ZXIpIHtcbiAgICAgIHRoaXMuZ2V0dGVyID0gZnVuY3Rpb24gKCkge31cbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgd2FybihcbiAgICAgICAgJ0ZhaWxlZCB3YXRjaGluZyBwYXRoOiAnICsgZXhwT3JGbiArXG4gICAgICAgICdXYXRjaGVyIG9ubHkgYWNjZXB0cyBzaW1wbGUgZG90LWRlbGltaXRlZCBwYXRocy4gJyArXG4gICAgICAgICdGb3IgZnVsbCBjb250cm9sLCB1c2UgYSBmdW5jdGlvbiBpbnN0ZWFkLicsXG4gICAgICAgIHZtXG4gICAgICApXG4gICAgfVxuICB9XG4gIHRoaXMudmFsdWUgPSB0aGlzLmxhenlcbiAgICA/IHVuZGVmaW5lZFxuICAgIDogdGhpcy5nZXQoKVxuICAvLyBzdGF0ZSBmb3IgYXZvaWRpbmcgZmFsc2UgdHJpZ2dlcnMgZm9yIGRlZXAgYW5kIEFycmF5XG4gIC8vIHdhdGNoZXJzIGR1cmluZyB2bS5fZGlnZXN0KClcbiAgdGhpcy5xdWV1ZWQgPSB0aGlzLnNoYWxsb3cgPSBmYWxzZVxufVxuXG4vKipcbiAqIEV2YWx1YXRlIHRoZSBnZXR0ZXIsIGFuZCByZS1jb2xsZWN0IGRlcGVuZGVuY2llcy5cbiAqL1xuXG5XYXRjaGVyLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuYmVmb3JlR2V0KClcbiAgY29uc3QgdmFsdWUgPSB0aGlzLmdldHRlci5jYWxsKHRoaXMudm0sIHRoaXMudm0pXG4gIC8vIFwidG91Y2hcIiBldmVyeSBwcm9wZXJ0eSBzbyB0aGV5IGFyZSBhbGwgdHJhY2tlZCBhc1xuICAvLyBkZXBlbmRlbmNpZXMgZm9yIGRlZXAgd2F0Y2hpbmdcbiAgaWYgKHRoaXMuZGVlcCkge1xuICAgIHRyYXZlcnNlKHZhbHVlKVxuICB9XG4gIHRoaXMuYWZ0ZXJHZXQoKVxuICByZXR1cm4gdmFsdWVcbn1cblxuLyoqXG4gKiBQcmVwYXJlIGZvciBkZXBlbmRlbmN5IGNvbGxlY3Rpb24uXG4gKi9cblxuV2F0Y2hlci5wcm90b3R5cGUuYmVmb3JlR2V0ID0gZnVuY3Rpb24gKCkge1xuICBwcmV2VGFyZ2V0ID0gRGVwLnRhcmdldFxuICBEZXAudGFyZ2V0ID0gdGhpc1xufVxuXG4vKipcbiAqIEFkZCBhIGRlcGVuZGVuY3kgdG8gdGhpcyBkaXJlY3RpdmUuXG4gKlxuICogQHBhcmFtIHtEZXB9IGRlcFxuICovXG5cbldhdGNoZXIucHJvdG90eXBlLmFkZERlcCA9IGZ1bmN0aW9uIChkZXApIHtcbiAgY29uc3QgaWQgPSBkZXAuaWRcbiAgaWYgKCF0aGlzLm5ld0RlcElkcy5oYXMoaWQpKSB7XG4gICAgdGhpcy5uZXdEZXBJZHMuYWRkKGlkKVxuICAgIHRoaXMubmV3RGVwcy5wdXNoKGRlcClcbiAgICBpZiAoIXRoaXMuZGVwSWRzLmhhcyhpZCkpIHtcbiAgICAgIGRlcC5hZGRTdWIodGhpcylcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBDbGVhbiB1cCBmb3IgZGVwZW5kZW5jeSBjb2xsZWN0aW9uLlxuICovXG5cbldhdGNoZXIucHJvdG90eXBlLmFmdGVyR2V0ID0gZnVuY3Rpb24gKCkge1xuICBEZXAudGFyZ2V0ID0gcHJldlRhcmdldFxuICBsZXQgaSA9IHRoaXMuZGVwcy5sZW5ndGhcbiAgd2hpbGUgKGktLSkge1xuICAgIGNvbnN0IGRlcCA9IHRoaXMuZGVwc1tpXVxuICAgIGlmICghdGhpcy5uZXdEZXBJZHMuaGFzKGRlcC5pZCkpIHtcbiAgICAgIGRlcC5yZW1vdmVTdWIodGhpcylcbiAgICB9XG4gIH1cbiAgbGV0IHRtcCA9IHRoaXMuZGVwSWRzXG4gIHRoaXMuZGVwSWRzID0gdGhpcy5uZXdEZXBJZHNcbiAgdGhpcy5uZXdEZXBJZHMgPSB0bXBcbiAgdGhpcy5uZXdEZXBJZHMuY2xlYXIoKVxuICB0bXAgPSB0aGlzLmRlcHNcbiAgdGhpcy5kZXBzID0gdGhpcy5uZXdEZXBzXG4gIHRoaXMubmV3RGVwcyA9IHRtcFxuICB0aGlzLm5ld0RlcHMubGVuZ3RoID0gMFxufVxuXG4vKipcbiAqIFN1YnNjcmliZXIgaW50ZXJmYWNlLlxuICogV2lsbCBiZSBjYWxsZWQgd2hlbiBhIGRlcGVuZGVuY3kgY2hhbmdlcy5cbiAqXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHNoYWxsb3dcbiAqL1xuXG5XYXRjaGVyLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoc2hhbGxvdykge1xuICBpZiAodGhpcy5sYXp5KSB7XG4gICAgdGhpcy5kaXJ0eSA9IHRydWVcbiAgfSBlbHNlIHtcbiAgICB0aGlzLnJ1bigpXG4gIH1cbiAgLy8gfSBlbHNlIGlmICh0aGlzLnN5bmMpIHtcbiAgLy8gICB0aGlzLnJ1bigpXG4gIC8vIH0gZWxzZSB7XG4gIC8vICAgLy8gaWYgcXVldWVkLCBvbmx5IG92ZXJ3cml0ZSBzaGFsbG93IHdpdGggbm9uLXNoYWxsb3csXG4gIC8vICAgLy8gYnV0IG5vdCB0aGUgb3RoZXIgd2F5IGFyb3VuZC5cbiAgLy8gICB0aGlzLnNoYWxsb3cgPSB0aGlzLnF1ZXVlZFxuICAvLyAgICAgPyBzaGFsbG93XG4gIC8vICAgICAgID8gdGhpcy5zaGFsbG93XG4gIC8vICAgICAgIDogZmFsc2VcbiAgLy8gICAgIDogISFzaGFsbG93XG4gIC8vICAgdGhpcy5xdWV1ZWQgPSB0cnVlXG4gIC8vICAgcHVzaFdhdGNoZXIodGhpcylcbiAgLy8gfVxufVxuXG4vKipcbiAqIEJhdGNoZXIgam9iIGludGVyZmFjZS5cbiAqIFdpbGwgYmUgY2FsbGVkIGJ5IHRoZSBiYXRjaGVyLlxuICovXG5cbldhdGNoZXIucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMuYWN0aXZlKSB7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLmdldCgpXG4gICAgaWYgKFxuICAgICAgdmFsdWUgIT09IHRoaXMudmFsdWUgfHxcbiAgICAgIC8vIERlZXAgd2F0Y2hlcnMgYW5kIHdhdGNoZXJzIG9uIE9iamVjdC9BcnJheXMgc2hvdWxkIGZpcmUgZXZlblxuICAgICAgLy8gd2hlbiB0aGUgdmFsdWUgaXMgdGhlIHNhbWUsIGJlY2F1c2UgdGhlIHZhbHVlIG1heVxuICAgICAgLy8gaGF2ZSBtdXRhdGVkOyBidXQgb25seSBkbyBzbyBpZiB0aGlzIGlzIGFcbiAgICAgIC8vIG5vbi1zaGFsbG93IHVwZGF0ZSAoY2F1c2VkIGJ5IGEgdm0gZGlnZXN0KS5cbiAgICAgICgoaXNPYmplY3QodmFsdWUpIHx8IHRoaXMuZGVlcCkgJiYgIXRoaXMuc2hhbGxvdylcbiAgICApIHtcbiAgICAgIC8vIHNldCBuZXcgdmFsdWVcbiAgICAgIGNvbnN0IG9sZFZhbHVlID0gdGhpcy52YWx1ZVxuICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlXG4gICAgICB0aGlzLmNiLmNhbGwodGhpcy52bSwgdmFsdWUsIG9sZFZhbHVlKVxuICAgIH1cbiAgICB0aGlzLnF1ZXVlZCA9IHRoaXMuc2hhbGxvdyA9IGZhbHNlXG4gIH1cbn1cblxuLyoqXG4gKiBFdmFsdWF0ZSB0aGUgdmFsdWUgb2YgdGhlIHdhdGNoZXIuXG4gKiBUaGlzIG9ubHkgZ2V0cyBjYWxsZWQgZm9yIGxhenkgd2F0Y2hlcnMuXG4gKi9cblxuV2F0Y2hlci5wcm90b3R5cGUuZXZhbHVhdGUgPSBmdW5jdGlvbiAoKSB7XG4gIC8vIGF2b2lkIG92ZXJ3cml0aW5nIGFub3RoZXIgd2F0Y2hlciB0aGF0IGlzIGJlaW5nXG4gIC8vIGNvbGxlY3RlZC5cbiAgY29uc3QgY3VycmVudCA9IERlcC50YXJnZXRcbiAgdGhpcy52YWx1ZSA9IHRoaXMuZ2V0KClcbiAgdGhpcy5kaXJ0eSA9IGZhbHNlXG4gIERlcC50YXJnZXQgPSBjdXJyZW50XG59XG5cbi8qKlxuICogRGVwZW5kIG9uIGFsbCBkZXBzIGNvbGxlY3RlZCBieSB0aGlzIHdhdGNoZXIuXG4gKi9cblxuV2F0Y2hlci5wcm90b3R5cGUuZGVwZW5kID0gZnVuY3Rpb24gKCkge1xuICBsZXQgaSA9IHRoaXMuZGVwcy5sZW5ndGhcbiAgd2hpbGUgKGktLSkge1xuICAgIHRoaXMuZGVwc1tpXS5kZXBlbmQoKVxuICB9XG59XG5cbi8qKlxuICogUmVtb3ZlIHNlbGYgZnJvbSBhbGwgZGVwZW5kZW5jaWVzJyBzdWJjcmliZXIgbGlzdC5cbiAqL1xuXG5XYXRjaGVyLnByb3RvdHlwZS50ZWFyZG93biA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMuYWN0aXZlKSB7XG4gICAgLy8gcmVtb3ZlIHNlbGYgZnJvbSB2bSdzIHdhdGNoZXIgbGlzdFxuICAgIC8vIHRoaXMgaXMgYSBzb21ld2hhdCBleHBlbnNpdmUgb3BlcmF0aW9uIHNvIHdlIHNraXAgaXRcbiAgICAvLyBpZiB0aGUgdm0gaXMgYmVpbmcgZGVzdHJveWVkIG9yIGlzIHBlcmZvcm1pbmcgYSB2LWZvclxuICAgIC8vIHJlLXJlbmRlciAodGhlIHdhdGNoZXIgbGlzdCBpcyB0aGVuIGZpbHRlcmVkIGJ5IHYtZm9yKS5cbiAgICBpZiAoIXRoaXMudm0uX2lzQmVpbmdEZXN0cm95ZWQgJiYgIXRoaXMudm0uX3ZGb3JSZW1vdmluZykge1xuICAgICAgcmVtb3ZlKHRoaXMudm0uX3dhdGNoZXJzLCB0aGlzKVxuICAgIH1cbiAgICBsZXQgaSA9IHRoaXMuZGVwcy5sZW5ndGhcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICB0aGlzLmRlcHNbaV0ucmVtb3ZlU3ViKHRoaXMpXG4gICAgfVxuICAgIHRoaXMuYWN0aXZlID0gZmFsc2VcbiAgICB0aGlzLnZtID0gdGhpcy5jYiA9IHRoaXMudmFsdWUgPSBudWxsXG4gIH1cbn1cblxuLyoqXG4gKiBSZWNydXNpdmVseSB0cmF2ZXJzZSBhbiBvYmplY3QgdG8gZXZva2UgYWxsIGNvbnZlcnRlZFxuICogZ2V0dGVycywgc28gdGhhdCBldmVyeSBuZXN0ZWQgcHJvcGVydHkgaW5zaWRlIHRoZSBvYmplY3RcbiAqIGlzIGNvbGxlY3RlZCBhcyBhIFwiZGVlcFwiIGRlcGVuZGVuY3kuXG4gKlxuICogQHBhcmFtIHsqfSB2YWxcbiAqIEBwYXJhbSB7U2V0fSBzZWVuXG4gKi9cblxuY29uc3Qgc2Vlbk9iamVjdHMgPSBuZXcgU2V0KClcbmZ1bmN0aW9uIHRyYXZlcnNlICh2YWwsIHNlZW4pIHtcbiAgbGV0IGksIGtleXMsIGlzQSwgaXNPXG4gIGlmICghc2Vlbikge1xuICAgIHNlZW4gPSBzZWVuT2JqZWN0c1xuICAgIHNlZW4uY2xlYXIoKVxuICB9XG4gIGlzQSA9IGlzQXJyYXkodmFsKVxuICBpc08gPSBpc09iamVjdCh2YWwpXG4gIGlmIChpc0EgfHwgaXNPKSB7XG4gICAgaWYgKHZhbC5fX29iX18pIHtcbiAgICAgIGNvbnN0IGRlcElkID0gdmFsLl9fb2JfXy5kZXAuaWRcbiAgICAgIGlmIChzZWVuLmhhcyhkZXBJZCkpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZWVuLmFkZChkZXBJZClcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGlzQSkge1xuICAgICAgaSA9IHZhbC5sZW5ndGhcbiAgICAgIHdoaWxlIChpLS0pIHRyYXZlcnNlKHZhbFtpXSwgc2VlbilcbiAgICB9IGVsc2UgaWYgKGlzTykge1xuICAgICAga2V5cyA9IE9iamVjdC5rZXlzKHZhbClcbiAgICAgIGkgPSBrZXlzLmxlbmd0aFxuICAgICAgd2hpbGUgKGktLSkgdHJhdmVyc2UodmFsW2tleXNbaV1dLCBzZWVuKVxuICAgIH1cbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9odG1sNS9kZWZhdWx0L2NvcmUvd2F0Y2hlci5qc1xuICoqLyIsIi8qIGVzbGludC1kaXNhYmxlICovXG5cbmltcG9ydCB7IHJlbW92ZSB9IGZyb20gJy4uL3V0aWwnXG5cbmxldCB1aWQgPSAwXG5cbi8qKlxuICogQSBkZXAgaXMgYW4gb2JzZXJ2YWJsZSB0aGF0IGNhbiBoYXZlIG11bHRpcGxlXG4gKiBkaXJlY3RpdmVzIHN1YnNjcmliaW5nIHRvIGl0LlxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIERlcCAoKSB7XG4gIHRoaXMuaWQgPSB1aWQrK1xuICB0aGlzLnN1YnMgPSBbXVxufVxuXG4vLyB0aGUgY3VycmVudCB0YXJnZXQgd2F0Y2hlciBiZWluZyBldmFsdWF0ZWQuXG4vLyB0aGlzIGlzIGdsb2JhbGx5IHVuaXF1ZSBiZWNhdXNlIHRoZXJlIGNvdWxkIGJlIG9ubHkgb25lXG4vLyB3YXRjaGVyIGJlaW5nIGV2YWx1YXRlZCBhdCBhbnkgdGltZS5cbkRlcC50YXJnZXQgPSBudWxsXG5cbi8qKlxuICogQWRkIGEgZGlyZWN0aXZlIHN1YnNjcmliZXIuXG4gKlxuICogQHBhcmFtIHtEaXJlY3RpdmV9IHN1YlxuICovXG5cbkRlcC5wcm90b3R5cGUuYWRkU3ViID0gZnVuY3Rpb24gKHN1Yikge1xuICB0aGlzLnN1YnMucHVzaChzdWIpXG59XG5cbi8qKlxuICogUmVtb3ZlIGEgZGlyZWN0aXZlIHN1YnNjcmliZXIuXG4gKlxuICogQHBhcmFtIHtEaXJlY3RpdmV9IHN1YlxuICovXG5cbkRlcC5wcm90b3R5cGUucmVtb3ZlU3ViID0gZnVuY3Rpb24gKHN1Yikge1xuICByZW1vdmUodGhpcy5zdWJzLCBzdWIpXG59XG5cbi8qKlxuICogQWRkIHNlbGYgYXMgYSBkZXBlbmRlbmN5IHRvIHRoZSB0YXJnZXQgd2F0Y2hlci5cbiAqL1xuXG5EZXAucHJvdG90eXBlLmRlcGVuZCA9IGZ1bmN0aW9uICgpIHtcbiAgRGVwLnRhcmdldC5hZGREZXAodGhpcylcbn1cblxuLyoqXG4gKiBOb3RpZnkgYWxsIHN1YnNjcmliZXJzIG9mIGEgbmV3IHZhbHVlLlxuICovXG5cbkRlcC5wcm90b3R5cGUubm90aWZ5ID0gZnVuY3Rpb24gKCkge1xuICAvLyBzdGFibGl6ZSB0aGUgc3Vic2NyaWJlciBsaXN0IGZpcnN0XG4gIGNvbnN0IHN1YnMgPSB0aGlzLnN1YnMuc2xpY2UoKVxuICBmb3IgKGxldCBpID0gMCwgbCA9IHN1YnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgc3Vic1tpXS51cGRhdGUoKVxuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2h0bWw1L2RlZmF1bHQvY29yZS9kZXAuanNcbiAqKi8iLCIvKiBlc2xpbnQtZGlzYWJsZSAqL1xuXG5pbXBvcnQgRGVwIGZyb20gJy4vZGVwJ1xuaW1wb3J0IHsgYXJyYXlNZXRob2RzIH0gZnJvbSAnLi9hcnJheSdcbmltcG9ydCB7XG4gIGRlZixcbiAgcmVtb3ZlLFxuICBpc0FycmF5LFxuICBpc09iamVjdCxcbiAgaXNQbGFpbk9iamVjdCxcbiAgaGFzUHJvdG8sXG4gIGhhc093bixcbiAgaXNSZXNlcnZlZFxufSBmcm9tICcuLi91dGlsJ1xuXG5jb25zdCBhcnJheUtleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhhcnJheU1ldGhvZHMpXG5cbi8qKlxuICogT2JzZXJ2ZXIgY2xhc3MgdGhhdCBhcmUgYXR0YWNoZWQgdG8gZWFjaCBvYnNlcnZlZFxuICogb2JqZWN0LiBPbmNlIGF0dGFjaGVkLCB0aGUgb2JzZXJ2ZXIgY29udmVydHMgdGFyZ2V0XG4gKiBvYmplY3QncyBwcm9wZXJ0eSBrZXlzIGludG8gZ2V0dGVyL3NldHRlcnMgdGhhdFxuICogY29sbGVjdCBkZXBlbmRlbmNpZXMgYW5kIGRpc3BhdGNoZXMgdXBkYXRlcy5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gdmFsdWVcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBPYnNlcnZlciAodmFsdWUpIHtcbiAgdGhpcy52YWx1ZSA9IHZhbHVlXG4gIHRoaXMuZGVwID0gbmV3IERlcCgpXG4gIGRlZih2YWx1ZSwgJ19fb2JfXycsIHRoaXMpXG4gIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgIGNvbnN0IGF1Z21lbnQgPSBoYXNQcm90b1xuICAgICAgPyBwcm90b0F1Z21lbnRcbiAgICAgIDogY29weUF1Z21lbnRcbiAgICBhdWdtZW50KHZhbHVlLCBhcnJheU1ldGhvZHMsIGFycmF5S2V5cylcbiAgICB0aGlzLm9ic2VydmVBcnJheSh2YWx1ZSlcbiAgfSBlbHNlIHtcbiAgICB0aGlzLndhbGsodmFsdWUpXG4gIH1cbn1cblxuLy8gSW5zdGFuY2UgbWV0aG9kc1xuXG4vKipcbiAqIFdhbGsgdGhyb3VnaCBlYWNoIHByb3BlcnR5IGFuZCBjb252ZXJ0IHRoZW0gaW50b1xuICogZ2V0dGVyL3NldHRlcnMuIFRoaXMgbWV0aG9kIHNob3VsZCBvbmx5IGJlIGNhbGxlZCB3aGVuXG4gKiB2YWx1ZSB0eXBlIGlzIE9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKi9cblxuT2JzZXJ2ZXIucHJvdG90eXBlLndhbGsgPSBmdW5jdGlvbiAob2JqKSB7XG4gIGZvciAobGV0IGtleSBpbiBvYmopIHtcbiAgICB0aGlzLmNvbnZlcnQoa2V5LCBvYmpba2V5XSlcbiAgfVxufVxuXG4vKipcbiAqIE9ic2VydmUgYSBsaXN0IG9mIEFycmF5IGl0ZW1zLlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IGl0ZW1zXG4gKi9cblxuT2JzZXJ2ZXIucHJvdG90eXBlLm9ic2VydmVBcnJheSA9IGZ1bmN0aW9uIChpdGVtcykge1xuICBmb3IgKGxldCBpID0gMCwgbCA9IGl0ZW1zLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIG9ic2VydmUoaXRlbXNbaV0pXG4gIH1cbn1cblxuLyoqXG4gKiBDb252ZXJ0IGEgcHJvcGVydHkgaW50byBnZXR0ZXIvc2V0dGVyIHNvIHdlIGNhbiBlbWl0XG4gKiB0aGUgZXZlbnRzIHdoZW4gdGhlIHByb3BlcnR5IGlzIGFjY2Vzc2VkL2NoYW5nZWQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICogQHBhcmFtIHsqfSB2YWxcbiAqL1xuXG5PYnNlcnZlci5wcm90b3R5cGUuY29udmVydCA9IGZ1bmN0aW9uIChrZXksIHZhbCkge1xuICBkZWZpbmVSZWFjdGl2ZSh0aGlzLnZhbHVlLCBrZXksIHZhbClcbn1cblxuLyoqXG4gKiBBZGQgYW4gb3duZXIgdm0sIHNvIHRoYXQgd2hlbiAkc2V0LyRkZWxldGUgbXV0YXRpb25zXG4gKiBoYXBwZW4gd2UgY2FuIG5vdGlmeSBvd25lciB2bXMgdG8gcHJveHkgdGhlIGtleXMgYW5kXG4gKiBkaWdlc3QgdGhlIHdhdGNoZXJzLiBUaGlzIGlzIG9ubHkgY2FsbGVkIHdoZW4gdGhlIG9iamVjdFxuICogaXMgb2JzZXJ2ZWQgYXMgYW4gaW5zdGFuY2UncyByb290ICRkYXRhLlxuICpcbiAqIEBwYXJhbSB7VnVlfSB2bVxuICovXG5cbk9ic2VydmVyLnByb3RvdHlwZS5hZGRWbSA9IGZ1bmN0aW9uICh2bSkge1xuICAodGhpcy52bXMgfHwgKHRoaXMudm1zID0gW10pKS5wdXNoKHZtKVxufVxuXG4vKipcbiAqIFJlbW92ZSBhbiBvd25lciB2bS4gVGhpcyBpcyBjYWxsZWQgd2hlbiB0aGUgb2JqZWN0IGlzXG4gKiBzd2FwcGVkIG91dCBhcyBhbiBpbnN0YW5jZSdzICRkYXRhIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge1Z1ZX0gdm1cbiAqL1xuXG5PYnNlcnZlci5wcm90b3R5cGUucmVtb3ZlVm0gPSBmdW5jdGlvbiAodm0pIHtcbiAgcmVtb3ZlKHRoaXMudm1zLCB2bSlcbn1cblxuLy8gaGVscGVyc1xuXG4vKipcbiAqIEF1Z21lbnQgYW4gdGFyZ2V0IE9iamVjdCBvciBBcnJheSBieSBpbnRlcmNlcHRpbmdcbiAqIHRoZSBwcm90b3R5cGUgY2hhaW4gdXNpbmcgX19wcm90b19fXG4gKlxuICogQHBhcmFtIHtPYmplY3R8QXJyYXl9IHRhcmdldFxuICogQHBhcmFtIHtPYmplY3R9IHNyY1xuICovXG5cbmZ1bmN0aW9uIHByb3RvQXVnbWVudCAodGFyZ2V0LCBzcmMpIHtcbiAgLyogZXNsaW50LWRpc2FibGUgbm8tcHJvdG8gKi9cbiAgdGFyZ2V0Ll9fcHJvdG9fXyA9IHNyY1xuICAvKiBlc2xpbnQtZW5hYmxlIG5vLXByb3RvICovXG59XG5cbi8qKlxuICogQXVnbWVudCBhbiB0YXJnZXQgT2JqZWN0IG9yIEFycmF5IGJ5IGRlZmluaW5nXG4gKiBoaWRkZW4gcHJvcGVydGllcy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdHxBcnJheX0gdGFyZ2V0XG4gKiBAcGFyYW0ge09iamVjdH0gcHJvdG9cbiAqL1xuXG5mdW5jdGlvbiBjb3B5QXVnbWVudCAodGFyZ2V0LCBzcmMsIGtleXMpIHtcbiAgZm9yIChsZXQgaSA9IDAsIGwgPSBrZXlzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGNvbnN0IGtleSA9IGtleXNbaV1cbiAgICBkZWYodGFyZ2V0LCBrZXksIHNyY1trZXldKVxuICB9XG59XG5cbi8qKlxuICogQXR0ZW1wdCB0byBjcmVhdGUgYW4gb2JzZXJ2ZXIgaW5zdGFuY2UgZm9yIGEgdmFsdWUsXG4gKiByZXR1cm5zIHRoZSBuZXcgb2JzZXJ2ZXIgaWYgc3VjY2Vzc2Z1bGx5IG9ic2VydmVkLFxuICogb3IgdGhlIGV4aXN0aW5nIG9ic2VydmVyIGlmIHRoZSB2YWx1ZSBhbHJlYWR5IGhhcyBvbmUuXG4gKlxuICogQHBhcmFtIHsqfSB2YWx1ZVxuICogQHBhcmFtIHtWdWV9IFt2bV1cbiAqIEByZXR1cm4ge09ic2VydmVyfHVuZGVmaW5lZH1cbiAqIEBzdGF0aWNcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gb2JzZXJ2ZSAodmFsdWUsIHZtKSB7XG4gIGlmICghaXNPYmplY3QodmFsdWUpKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgbGV0IG9iXG4gIGlmIChoYXNPd24odmFsdWUsICdfX29iX18nKSAmJiB2YWx1ZS5fX29iX18gaW5zdGFuY2VvZiBPYnNlcnZlcikge1xuICAgIG9iID0gdmFsdWUuX19vYl9fXG4gIH0gZWxzZSBpZiAoXG4gICAgKGlzQXJyYXkodmFsdWUpIHx8IGlzUGxhaW5PYmplY3QodmFsdWUpKSAmJlxuICAgIE9iamVjdC5pc0V4dGVuc2libGUodmFsdWUpICYmXG4gICAgIXZhbHVlLl9pc1Z1ZVxuICApIHtcbiAgICBvYiA9IG5ldyBPYnNlcnZlcih2YWx1ZSlcbiAgfVxuICBpZiAob2IgJiYgdm0pIHtcbiAgICBvYi5hZGRWbSh2bSlcbiAgfVxuICByZXR1cm4gb2Jcbn1cblxuLyoqXG4gKiBEZWZpbmUgYSByZWFjdGl2ZSBwcm9wZXJ0eSBvbiBhbiBPYmplY3QuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICogQHBhcmFtIHsqfSB2YWxcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZGVmaW5lUmVhY3RpdmUgKG9iaiwga2V5LCB2YWwpIHtcbiAgY29uc3QgZGVwID0gbmV3IERlcCgpXG5cbiAgY29uc3QgcHJvcGVydHkgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KVxuICBpZiAocHJvcGVydHkgJiYgcHJvcGVydHkuY29uZmlndXJhYmxlID09PSBmYWxzZSkge1xuICAgIHJldHVyblxuICB9XG5cbiAgLy8gY2F0ZXIgZm9yIHByZS1kZWZpbmVkIGdldHRlci9zZXR0ZXJzXG4gIGNvbnN0IGdldHRlciA9IHByb3BlcnR5ICYmIHByb3BlcnR5LmdldFxuICBjb25zdCBzZXR0ZXIgPSBwcm9wZXJ0eSAmJiBwcm9wZXJ0eS5zZXRcblxuICBsZXQgY2hpbGRPYiA9IG9ic2VydmUodmFsKVxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uIHJlYWN0aXZlR2V0dGVyICgpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gZ2V0dGVyID8gZ2V0dGVyLmNhbGwob2JqKSA6IHZhbFxuICAgICAgaWYgKERlcC50YXJnZXQpIHtcbiAgICAgICAgZGVwLmRlcGVuZCgpXG4gICAgICAgIGlmIChjaGlsZE9iKSB7XG4gICAgICAgICAgY2hpbGRPYi5kZXAuZGVwZW5kKClcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICBmb3IgKGxldCBlLCBpID0gMCwgbCA9IHZhbHVlLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgZSA9IHZhbHVlW2ldXG4gICAgICAgICAgICBlICYmIGUuX19vYl9fICYmIGUuX19vYl9fLmRlcC5kZXBlbmQoKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlXG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uIHJlYWN0aXZlU2V0dGVyIChuZXdWYWwpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gZ2V0dGVyID8gZ2V0dGVyLmNhbGwob2JqKSA6IHZhbFxuICAgICAgaWYgKG5ld1ZhbCA9PT0gdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBpZiAoc2V0dGVyKSB7XG4gICAgICAgIHNldHRlci5jYWxsKG9iaiwgbmV3VmFsKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsID0gbmV3VmFsXG4gICAgICB9XG4gICAgICBjaGlsZE9iID0gb2JzZXJ2ZShuZXdWYWwpXG4gICAgICBkZXAubm90aWZ5KClcbiAgICB9XG4gIH0pXG59XG5cbi8qKlxuICogU2V0IGEgcHJvcGVydHkgb24gYW4gb2JqZWN0LiBBZGRzIHRoZSBuZXcgcHJvcGVydHkgYW5kXG4gKiB0cmlnZ2VycyBjaGFuZ2Ugbm90aWZpY2F0aW9uIGlmIHRoZSBwcm9wZXJ0eSBkb2Vzbid0XG4gKiBhbHJlYWR5IGV4aXN0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAqIEBwYXJhbSB7Kn0gdmFsXG4gKiBAcHVibGljXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHNldCAob2JqLCBrZXksIHZhbCkge1xuICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgcmV0dXJuIG9iai5zcGxpY2Uoa2V5LCAxLCB2YWwpXG4gIH1cbiAgaWYgKGhhc093bihvYmosIGtleSkpIHtcbiAgICBvYmpba2V5XSA9IHZhbFxuICAgIHJldHVyblxuICB9XG4gIGlmIChvYmouX2lzVnVlKSB7XG4gICAgc2V0KG9iai5fZGF0YSwga2V5LCB2YWwpXG4gICAgcmV0dXJuXG4gIH1cbiAgY29uc3Qgb2IgPSBvYmouX19vYl9fXG4gIGlmICghb2IpIHtcbiAgICBvYmpba2V5XSA9IHZhbFxuICAgIHJldHVyblxuICB9XG4gIG9iLmNvbnZlcnQoa2V5LCB2YWwpXG4gIG9iLmRlcC5ub3RpZnkoKVxuICBpZiAob2Iudm1zKSB7XG4gICAgbGV0IGkgPSBvYi52bXMubGVuZ3RoXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgY29uc3Qgdm0gPSBvYi52bXNbaV1cbiAgICAgIHByb3h5KHZtLCBrZXkpXG4gICAgICB2bS4kZm9yY2VVcGRhdGUoKVxuICAgIH1cbiAgfVxuICByZXR1cm4gdmFsXG59XG5cbi8qKlxuICogRGVsZXRlIGEgcHJvcGVydHkgYW5kIHRyaWdnZXIgY2hhbmdlIGlmIG5lY2Vzc2FyeS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGRlbCAob2JqLCBrZXkpIHtcbiAgaWYgKCFoYXNPd24ob2JqLCBrZXkpKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgZGVsZXRlIG9ialtrZXldXG4gIGNvbnN0IG9iID0gb2JqLl9fb2JfX1xuXG4gIGlmICghb2IpIHtcbiAgICBpZiAob2JqLl9pc1Z1ZSkge1xuICAgICAgZGVsZXRlIG9iai5fZGF0YVtrZXldXG4gICAgICBvYmouJGZvcmNlVXBkYXRlKClcbiAgICB9XG4gICAgcmV0dXJuXG4gIH1cbiAgb2IuZGVwLm5vdGlmeSgpXG4gIGlmIChvYi52bXMpIHtcbiAgICBsZXQgaSA9IG9iLnZtcy5sZW5ndGhcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICBjb25zdCB2bSA9IG9iLnZtc1tpXVxuICAgICAgdW5wcm94eSh2bSwga2V5KVxuICAgICAgdm0uJGZvcmNlVXBkYXRlKClcbiAgICB9XG4gIH1cbn1cblxuY29uc3QgS0VZX1dPUkRTID0gWyckaW5kZXgnLCAnJHZhbHVlJywgJyRldmVudCddXG5leHBvcnQgZnVuY3Rpb24gcHJveHkgKHZtLCBrZXkpIHtcbiAgaWYgKEtFWV9XT1JEUy5pbmRleE9mKGtleSkgPiAtMSB8fCAhaXNSZXNlcnZlZChrZXkpKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHZtLCBrZXksIHtcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBnZXQ6IGZ1bmN0aW9uIHByb3h5R2V0dGVyICgpIHtcbiAgICAgICAgcmV0dXJuIHZtLl9kYXRhW2tleV1cbiAgICAgIH0sXG4gICAgICBzZXQ6IGZ1bmN0aW9uIHByb3h5U2V0dGVyICh2YWwpIHtcbiAgICAgICAgdm0uX2RhdGFba2V5XSA9IHZhbFxuICAgICAgfVxuICAgIH0pXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVucHJveHkgKHZtLCBrZXkpIHtcbiAgaWYgKCFpc1Jlc2VydmVkKGtleSkpIHtcbiAgICBkZWxldGUgdm1ba2V5XVxuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2h0bWw1L2RlZmF1bHQvY29yZS9vYnNlcnZlci5qc1xuICoqLyIsIi8qIGVzbGludC1kaXNhYmxlICovXG5cbmltcG9ydCB7IGRlZiB9IGZyb20gJy4uL3V0aWwnXG5cbmNvbnN0IGFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGVcbmV4cG9ydCBjb25zdCBhcnJheU1ldGhvZHMgPSBPYmplY3QuY3JlYXRlKGFycmF5UHJvdG8pXG5cbi8qKlxuICogSW50ZXJjZXB0IG11dGF0aW5nIG1ldGhvZHMgYW5kIGVtaXQgZXZlbnRzXG4gKi9cblxuO1tcbiAgJ3B1c2gnLFxuICAncG9wJyxcbiAgJ3NoaWZ0JyxcbiAgJ3Vuc2hpZnQnLFxuICAnc3BsaWNlJyxcbiAgJ3NvcnQnLFxuICAncmV2ZXJzZSdcbl1cbi5mb3JFYWNoKGZ1bmN0aW9uIChtZXRob2QpIHtcbiAgLy8gY2FjaGUgb3JpZ2luYWwgbWV0aG9kXG4gIGNvbnN0IG9yaWdpbmFsID0gYXJyYXlQcm90b1ttZXRob2RdXG4gIGRlZihhcnJheU1ldGhvZHMsIG1ldGhvZCwgZnVuY3Rpb24gbXV0YXRvciAoKSB7XG4gICAgLy8gYXZvaWQgbGVha2luZyBhcmd1bWVudHM6XG4gICAgLy8gaHR0cDovL2pzcGVyZi5jb20vY2xvc3VyZS13aXRoLWFyZ3VtZW50c1xuICAgIGxldCBpID0gYXJndW1lbnRzLmxlbmd0aFxuICAgIGNvbnN0IGFyZ3MgPSBuZXcgQXJyYXkoaSlcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2ldXG4gICAgfVxuICAgIGNvbnN0IHJlc3VsdCA9IG9yaWdpbmFsLmFwcGx5KHRoaXMsIGFyZ3MpXG4gICAgY29uc3Qgb2IgPSB0aGlzLl9fb2JfX1xuICAgIGxldCBpbnNlcnRlZFxuICAgIHN3aXRjaCAobWV0aG9kKSB7XG4gICAgICBjYXNlICdwdXNoJzpcbiAgICAgICAgaW5zZXJ0ZWQgPSBhcmdzXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICd1bnNoaWZ0JzpcbiAgICAgICAgaW5zZXJ0ZWQgPSBhcmdzXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICdzcGxpY2UnOlxuICAgICAgICBpbnNlcnRlZCA9IGFyZ3Muc2xpY2UoMilcbiAgICAgICAgYnJlYWtcbiAgICB9XG4gICAgaWYgKGluc2VydGVkKSBvYi5vYnNlcnZlQXJyYXkoaW5zZXJ0ZWQpXG4gICAgLy8gbm90aWZ5IGNoYW5nZVxuICAgIG9iLmRlcC5ub3RpZnkoKVxuICAgIHJldHVybiByZXN1bHRcbiAgfSlcbn0pXG5cbi8qKlxuICogU3dhcCB0aGUgZWxlbWVudCBhdCB0aGUgZ2l2ZW4gaW5kZXggd2l0aCBhIG5ldyB2YWx1ZVxuICogYW5kIGVtaXRzIGNvcnJlc3BvbmRpbmcgZXZlbnQuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4XG4gKiBAcGFyYW0geyp9IHZhbFxuICogQHJldHVybiB7Kn0gLSByZXBsYWNlZCBlbGVtZW50XG4gKi9cblxuZGVmKFxuICBhcnJheVByb3RvLFxuICAnJHNldCcsXG4gIGZ1bmN0aW9uICRzZXQgKGluZGV4LCB2YWwpIHtcbiAgICBpZiAoaW5kZXggPj0gdGhpcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubGVuZ3RoID0gaW5kZXggKyAxXG4gICAgfVxuICAgIHJldHVybiB0aGlzLnNwbGljZShpbmRleCwgMSwgdmFsKVswXVxuICB9XG4pXG5cbi8qKlxuICogQ29udmVuaWVuY2UgbWV0aG9kIHRvIHJlbW92ZSB0aGUgZWxlbWVudCBhdCBnaXZlbiBpbmRleC5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gaW5kZXhcbiAqIEBwYXJhbSB7Kn0gdmFsXG4gKi9cblxuZGVmKFxuICBhcnJheVByb3RvLFxuICAnJHJlbW92ZScsXG4gIGZ1bmN0aW9uICRyZW1vdmUgKGluZGV4KSB7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKCF0aGlzLmxlbmd0aCkgcmV0dXJuXG4gICAgaWYgKHR5cGVvZiBpbmRleCAhPT0gJ251bWJlcicpIHtcbiAgICAgIGluZGV4ID0gdGhpcy5pbmRleE9mKGluZGV4KVxuICAgIH1cbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgdGhpcy5zcGxpY2UoaW5kZXgsIDEpXG4gICAgfVxuICB9XG4pXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2h0bWw1L2RlZmF1bHQvY29yZS9hcnJheS5qc1xuICoqLyIsIi8qKlxuICogQGZpbGVPdmVydmlld1xuICogVmlld01vZGVsIHRlbXBsYXRlIHBhcnNlciAmIGRhdGEtYmluZGluZyBwcm9jZXNzXG4gKlxuICogcmVxdWlyZWQ6XG4gKiBpbmRleC5qczogVm1cbiAqIGRvbS1oZWxwZXIuanM6IF9jcmVhdGVFbGVtZW50LCBfY3JlYXRlQmxvY2tcbiAqIGRvbS1oZWxwZXIuanM6IF9hdHRhY2hUYXJnZXQsIF9tb3ZlVGFyZ2V0LCBfcmVtb3ZlVGFyZ2V0XG4gKiBkaXJlY3RpdmUuanM6IF9iaW5kRWxlbWVudCwgX2JpbmRTdWJWbSwgX3dhdGNoXG4gKiBldmVudHMuanM6ICRvblxuICovXG5cbmltcG9ydCAqIGFzIF8gZnJvbSAnLi4vdXRpbCdcblxuLyoqXG4gKiBidWlsZChleHRlcm5hbERpcnMpXG4gKiAgIGNyZWF0ZVZtKClcbiAqICAgbWVyZ2UoZXh0ZXJuYWxEaXJzLCBkaXJzKVxuICogICBjb21waWxlKHRlbXBsYXRlLCBwYXJlbnROb2RlKVxuICogICAgIGlmICh0eXBlIGlzIGNvbnRlbnQpIGNyZWF0ZSBjb250ZW50Tm9kZVxuICogICAgIGVsc2UgaWYgKGRpcnMgaGF2ZSB2LWZvcikgZm9yZWFjaCAtPiBjcmVhdGUgY29udGV4dFxuICogICAgICAgLT4gY29tcGlsZSh0ZW1wbGF0ZVdpdGhvdXRGb3IsIHBhcmVudE5vZGUpOiBkaWZmKGxpc3QpIG9uY2hhbmdlXG4gKiAgICAgZWxzZSBpZiAoZGlycyBoYXZlIHYtaWYpIGFzc2VydFxuICogICAgICAgLT4gY29tcGlsZSh0ZW1wbGF0ZVdpdGhvdXRJZiwgcGFyZW50Tm9kZSk6IHRvZ2dsZShzaG93bikgb25jaGFuZ2VcbiAqICAgICBlbHNlIGlmICh0eXBlIGlzIG5hdGl2ZSlcbiAqICAgICAgIHNldChkaXJzKTogdXBkYXRlKGlkL2F0dHIvc3R5bGUvY2xhc3MpIG9uY2hhbmdlXG4gKiAgICAgICBhcHBlbmQodGVtcGxhdGUsIHBhcmVudE5vZGUpXG4gKiAgICAgICBmb3JlYWNoIGNoaWxkTm9kZXMgLT4gY29tcGlsZShjaGlsZE5vZGUsIHRlbXBsYXRlKVxuICogICAgIGVsc2UgaWYgKHR5cGUgaXMgY3VzdG9tKVxuICogICAgICAgYWRkQ2hpbGRWbSh2bSwgcGFyZW50Vm0pXG4gKiAgICAgICBidWlsZChleHRlcm5hbERpcnMpXG4gKiAgICAgICBmb3JlYWNoIGNoaWxkTm9kZXMgLT4gY29tcGlsZShjaGlsZE5vZGUsIHRlbXBsYXRlKVxuICovXG5leHBvcnQgZnVuY3Rpb24gX2J1aWxkICgpIHtcbiAgY29uc3Qgb3B0ID0gdGhpcy5fb3B0aW9ucyB8fCB7fVxuICBjb25zdCB0ZW1wbGF0ZSA9IG9wdC50ZW1wbGF0ZSB8fCB7fVxuXG4gIGlmIChvcHQucmVwbGFjZSkge1xuICAgIGlmICh0ZW1wbGF0ZS5jaGlsZHJlbiAmJiB0ZW1wbGF0ZS5jaGlsZHJlbi5sZW5ndGggPT09IDEpIHtcbiAgICAgIHRoaXMuX2NvbXBpbGUodGVtcGxhdGUuY2hpbGRyZW5bMF0sIHRoaXMuX3BhcmVudEVsKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuX2NvbXBpbGUodGVtcGxhdGUuY2hpbGRyZW4sIHRoaXMuX3BhcmVudEVsKVxuICAgIH1cbiAgfVxuICBlbHNlIHtcbiAgICB0aGlzLl9jb21waWxlKHRlbXBsYXRlLCB0aGlzLl9wYXJlbnRFbClcbiAgfVxuXG4gIF8uZGVidWcoYFwicmVhZHlcIiBsaWZlY3ljbGUgaW4gVm0oJHt0aGlzLl90eXBlfSlgKVxuICB0aGlzLiRlbWl0KCdob29rOnJlYWR5JylcbiAgdGhpcy5fcmVhZHkgPSB0cnVlXG59XG5cbi8qKlxuICogR2VuZXJhdGUgZWxlbWVudHMgYnkgY2hpbGQgb3IgY2hpbGRyZW4gYW5kIGFwcGVuZCB0byBwYXJlbnQgZWxlbWVudHMuXG4gKiBSb290IGVsZW1lbnQgaW5mbyB3b3VsZCBiZSBtZXJnZWQgaWYgaGFzLiBUaGUgZmlyc3QgYXJndW1lbnQgbWF5IGJlIGFuIGFycmF5XG4gKiBpZiB0aGUgcm9vdCBlbGVtZW50IHdpdGggb3B0aW9ucy5yZXBsYWNlIGhhcyBub3Qgb25seSBvbmUgY2hpbGQuXG4gKlxuICogQHBhcmFtIHtvYmplY3R8YXJyYXl9IHRhcmdldFxuICogQHBhcmFtIHtvYmplY3R9ICAgICAgIGRlc3RcbiAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICBtZXRhXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfY29tcGlsZSAodGFyZ2V0LCBkZXN0LCBtZXRhKSB7XG4gIGNvbnN0IGFwcCA9IHRoaXMuX2FwcCB8fCB7fVxuXG4gIGlmIChhcHAubGFzdFNpZ25hbCA9PT0gLTEpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIGNvbnN0IGNvbnRleHQgPSB0aGlzXG4gIGlmIChjb250ZXh0Ll90YXJnZXRJc0ZyYWdtZW50KHRhcmdldCkpIHtcbiAgICBjb250ZXh0Ll9jb21waWxlRnJhZ21lbnQodGFyZ2V0LCBkZXN0LCBtZXRhKVxuICAgIHJldHVyblxuICB9XG4gIG1ldGEgPSBtZXRhIHx8IHt9XG4gIGlmIChjb250ZXh0Ll90YXJnZXRJc0NvbnRlbnQodGFyZ2V0KSkge1xuICAgIF8uZGVidWcoJ2NvbXBpbGUgXCJjb250ZW50XCIgYmxvY2sgYnknLCB0YXJnZXQpXG4gICAgY29udGV4dC5fY29udGVudCA9IGNvbnRleHQuX2NyZWF0ZUJsb2NrKGRlc3QpXG4gICAgcmV0dXJuXG4gIH1cblxuICBpZiAoY29udGV4dC5fdGFyZ2V0TmVlZENoZWNrUmVwZWF0KHRhcmdldCwgbWV0YSkpIHtcbiAgICBfLmRlYnVnKCdjb21waWxlIFwicmVwZWF0XCIgbG9naWMgYnknLCB0YXJnZXQpXG4gICAgY29udGV4dC5fY29tcGlsZVJlcGVhdCh0YXJnZXQsIGRlc3QpXG4gICAgcmV0dXJuXG4gIH1cbiAgaWYgKGNvbnRleHQuX3RhcmdldE5lZWRDaGVja1Nob3duKHRhcmdldCwgbWV0YSkpIHtcbiAgICBfLmRlYnVnKCdjb21waWxlIFwiaWZcIiBsb2dpYyBieScsIHRhcmdldClcbiAgICBjb250ZXh0Ll9jb21waWxlU2hvd24odGFyZ2V0LCBkZXN0LCBtZXRhKVxuICAgIHJldHVyblxuICB9XG4gIGNvbnN0IHR5cGVHZXR0ZXIgPSBtZXRhLnR5cGUgfHwgdGFyZ2V0LnR5cGVcbiAgaWYgKGNvbnRleHQuX3RhcmdldE5lZWRDaGVja1R5cGUodHlwZUdldHRlciwgbWV0YSkpIHtcbiAgICBjb250ZXh0Ll9jb21waWxlVHlwZSh0YXJnZXQsIGRlc3QsIHR5cGVHZXR0ZXIsIG1ldGEpXG4gICAgcmV0dXJuXG4gIH1cbiAgY29uc3QgdHlwZSA9IHR5cGVHZXR0ZXJcbiAgY29uc3QgY29tcG9uZW50ID0gY29udGV4dC5fdGFyZ2V0SXNDb21wb3NlZCh0YXJnZXQsIHR5cGUpXG4gIGlmIChjb21wb25lbnQpIHtcbiAgICBfLmRlYnVnKCdjb21waWxlIGNvbXBvc2VkIGNvbXBvbmVudCBieScsIHRhcmdldClcbiAgICBjb250ZXh0Ll9jb21waWxlQ3VzdG9tQ29tcG9uZW50KGNvbXBvbmVudCwgdGFyZ2V0LCBkZXN0LCB0eXBlLCBtZXRhKVxuICAgIHJldHVyblxuICB9XG4gIF8uZGVidWcoJ2NvbXBpbGUgbmF0aXZlIGNvbXBvbmVudCBieScsIHRhcmdldClcbiAgY29udGV4dC5fY29tcGlsZU5hdGl2ZUNvbXBvbmVudCh0YXJnZXQsIGRlc3QsIHR5cGUpXG59XG5cbi8qKlxuICogQ2hlY2sgaWYgdGFyZ2V0IGlzIGEgZnJhZ21lbnQgKGFuIGFycmF5KS5cbiAqXG4gKiBAcGFyYW0gIHtvYmplY3R9ICB0YXJnZXRcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfdGFyZ2V0SXNGcmFnbWVudCAodGFyZ2V0KSB7XG4gIHJldHVybiBBcnJheS5pc0FycmF5KHRhcmdldClcbn1cblxuLyoqXG4gKiBDaGVjayBpZiB0YXJnZXQgdHlwZSBpcyBjb250ZW50L3Nsb3QuXG4gKlxuICogQHBhcmFtICB7b2JqZWN0fSAgdGFyZ2V0XG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gX3RhcmdldElzQ29udGVudCAodGFyZ2V0KSB7XG4gIHJldHVybiB0YXJnZXQudHlwZSA9PT0gJ2NvbnRlbnQnIHx8IHRhcmdldC50eXBlID09PSAnc2xvdCdcbn1cblxuLyoqXG4gKiBDaGVjayBpZiB0YXJnZXQgbmVlZCB0byBjb21waWxlIGJ5IGEgbGlzdC5cbiAqXG4gKiBAcGFyYW0gIHtvYmplY3R9ICB0YXJnZXRcbiAqIEBwYXJhbSAge29iamVjdH0gIG1ldGFcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfdGFyZ2V0TmVlZENoZWNrUmVwZWF0ICh0YXJnZXQsIG1ldGEpIHtcbiAgcmV0dXJuICFtZXRhLmhhc093blByb3BlcnR5KCdyZXBlYXQnKSAmJiB0YXJnZXQucmVwZWF0XG59XG5cbi8qKlxuICogQ2hlY2sgaWYgdGFyZ2V0IG5lZWQgdG8gY29tcGlsZSBieSBhIGJvb2xlYW4gdmFsdWUuXG4gKlxuICogQHBhcmFtICB7b2JqZWN0fSAgdGFyZ2V0XG4gKiBAcGFyYW0gIHtvYmplY3R9ICBtZXRhXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gX3RhcmdldE5lZWRDaGVja1Nob3duICh0YXJnZXQsIG1ldGEpIHtcbiAgcmV0dXJuICFtZXRhLmhhc093blByb3BlcnR5KCdzaG93bicpICYmIHRhcmdldC5zaG93blxufVxuXG4vKipcbiAqIENoZWNrIGlmIHRhcmdldCBuZWVkIHRvIGNvbXBpbGUgYnkgYSBkeW5hbWljIHR5cGUuXG4gKlxuICogQHBhcmFtICB7c3RyaW5nfGZ1bmN0aW9ufSB0eXBlR2V0dGVyXG4gKiBAcGFyYW0gIHtvYmplY3R9ICAgICAgICAgIG1ldGFcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfdGFyZ2V0TmVlZENoZWNrVHlwZSAodHlwZUdldHRlciwgbWV0YSkge1xuICByZXR1cm4gKHR5cGVvZiB0eXBlR2V0dGVyID09PSAnZnVuY3Rpb24nKSAmJiAhbWV0YS5oYXNPd25Qcm9wZXJ0eSgndHlwZScpXG59XG5cbi8qKlxuICogQ2hlY2sgaWYgdGhpcyBraW5kIG9mIGNvbXBvbmVudCBpcyBjb21wb3NlZC5cbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICB0eXBlXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gX3RhcmdldElzQ29tcG9zZWQgKHRhcmdldCwgdHlwZSkge1xuICBsZXQgY29tcG9uZW50XG4gIGlmICh0aGlzLl9hcHAgJiYgdGhpcy5fYXBwLmN1c3RvbUNvbXBvbmVudE1hcCkge1xuICAgIGNvbXBvbmVudCA9IHRoaXMuX2FwcC5jdXN0b21Db21wb25lbnRNYXBbdHlwZV1cbiAgfVxuICBpZiAodGhpcy5fb3B0aW9ucyAmJiB0aGlzLl9vcHRpb25zLmNvbXBvbmVudHMpIHtcbiAgICBjb21wb25lbnQgPSB0aGlzLl9vcHRpb25zLmNvbXBvbmVudHNbdHlwZV1cbiAgfVxuICBpZiAodGFyZ2V0LmNvbXBvbmVudCkge1xuICAgIGNvbXBvbmVudCA9IGNvbXBvbmVudCB8fCB7fVxuICB9XG4gIHJldHVybiBjb21wb25lbnRcbn1cblxuLyoqXG4gKiBDb21waWxlIGEgbGlzdCBvZiB0YXJnZXRzLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSB0YXJnZXRcbiAqIEBwYXJhbSB7b2JqZWN0fSBkZXN0XG4gKiBAcGFyYW0ge29iamVjdH0gbWV0YVxuICovXG5leHBvcnQgZnVuY3Rpb24gX2NvbXBpbGVGcmFnbWVudCAodGFyZ2V0LCBkZXN0LCBtZXRhKSB7XG4gIGNvbnN0IGZyYWdCbG9jayA9IHRoaXMuX2NyZWF0ZUJsb2NrKGRlc3QpXG4gIHRhcmdldC5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgIHRoaXMuX2NvbXBpbGUoY2hpbGQsIGZyYWdCbG9jaywgbWV0YSlcbiAgfSlcbn1cblxuLyoqXG4gKiBDb21waWxlIGEgdGFyZ2V0IHdpdGggcmVwZWF0IGRpcmVjdGl2ZS5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gdGFyZ2V0XG4gKiBAcGFyYW0ge29iamVjdH0gZGVzdFxuICovXG5leHBvcnQgZnVuY3Rpb24gX2NvbXBpbGVSZXBlYXQgKHRhcmdldCwgZGVzdCkge1xuICBjb25zdCByZXBlYXQgPSB0YXJnZXQucmVwZWF0XG4gIGNvbnN0IG9sZFN0eWxlID0gdHlwZW9mIHJlcGVhdCA9PT0gJ2Z1bmN0aW9uJ1xuICBsZXQgZ2V0dGVyID0gcmVwZWF0LmdldHRlciB8fCByZXBlYXQuZXhwcmVzc2lvbiB8fCByZXBlYXRcbiAgaWYgKHR5cGVvZiBnZXR0ZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICBnZXR0ZXIgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBbXSB9XG4gIH1cbiAgY29uc3Qga2V5ID0gcmVwZWF0LmtleSB8fCAnJGluZGV4J1xuICBjb25zdCB2YWx1ZSA9IHJlcGVhdC52YWx1ZSB8fCAnJHZhbHVlJ1xuICBjb25zdCB0cmFja0J5ID0gcmVwZWF0LnRyYWNrQnkgfHwgdGFyZ2V0LnRyYWNrQnkgfHxcbiAgICAodGFyZ2V0LmF0dHIgJiYgdGFyZ2V0LmF0dHIudHJhY2tCeSlcblxuICBjb25zdCBmcmFnQmxvY2sgPSB0aGlzLl9jcmVhdGVCbG9jayhkZXN0KVxuICBmcmFnQmxvY2suY2hpbGRyZW4gPSBbXVxuICBmcmFnQmxvY2suZGF0YSA9IFtdXG4gIGZyYWdCbG9jay52bXMgPSBbXVxuXG4gIHRoaXMuX2JpbmRSZXBlYXQodGFyZ2V0LCBmcmFnQmxvY2ssIHsgZ2V0dGVyLCBrZXksIHZhbHVlLCB0cmFja0J5LCBvbGRTdHlsZSB9KVxufVxuXG4vKipcbiAqIENvbXBpbGUgYSB0YXJnZXQgd2l0aCBpZiBkaXJlY3RpdmUuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHRhcmdldFxuICogQHBhcmFtIHtvYmplY3R9IGRlc3RcbiAqIEBwYXJhbSB7b2JqZWN0fSBtZXRhXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfY29tcGlsZVNob3duICh0YXJnZXQsIGRlc3QsIG1ldGEpIHtcbiAgY29uc3QgbmV3TWV0YSA9IHsgc2hvd246IHRydWUgfVxuICBjb25zdCBmcmFnQmxvY2sgPSB0aGlzLl9jcmVhdGVCbG9jayhkZXN0KVxuXG4gIGlmIChkZXN0LmVsZW1lbnQgJiYgZGVzdC5jaGlsZHJlbikge1xuICAgIGRlc3QuY2hpbGRyZW4ucHVzaChmcmFnQmxvY2spXG4gIH1cblxuICBpZiAobWV0YS5yZXBlYXQpIHtcbiAgICBuZXdNZXRhLnJlcGVhdCA9IG1ldGEucmVwZWF0XG4gIH1cblxuICB0aGlzLl9iaW5kU2hvd24odGFyZ2V0LCBmcmFnQmxvY2ssIG5ld01ldGEpXG59XG5cbi8qKlxuICogQ29tcGlsZSBhIHRhcmdldCB3aXRoIGR5bmFtaWMgY29tcG9uZW50IHR5cGUuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9ICAgdGFyZ2V0XG4gKiBAcGFyYW0ge29iamVjdH0gICBkZXN0XG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSB0eXBlR2V0dGVyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfY29tcGlsZVR5cGUgKHRhcmdldCwgZGVzdCwgdHlwZUdldHRlciwgbWV0YSkge1xuICBjb25zdCB0eXBlID0gdHlwZUdldHRlci5jYWxsKHRoaXMpXG4gIGNvbnN0IG5ld01ldGEgPSBPYmplY3QuYXNzaWduKHsgdHlwZSB9LCBtZXRhKVxuICBjb25zdCBmcmFnQmxvY2sgPSB0aGlzLl9jcmVhdGVCbG9jayhkZXN0KVxuXG4gIGlmIChkZXN0LmVsZW1lbnQgJiYgZGVzdC5jaGlsZHJlbikge1xuICAgIGRlc3QuY2hpbGRyZW4ucHVzaChmcmFnQmxvY2spXG4gIH1cblxuICB0aGlzLl93YXRjaCh0eXBlR2V0dGVyLCAodmFsdWUpID0+IHtcbiAgICBjb25zdCBuZXdNZXRhID0gT2JqZWN0LmFzc2lnbih7IHR5cGU6IHZhbHVlIH0sIG1ldGEpXG4gICAgdGhpcy5fcmVtb3ZlQmxvY2soZnJhZ0Jsb2NrLCB0cnVlKVxuICAgIHRoaXMuX2NvbXBpbGUodGFyZ2V0LCBmcmFnQmxvY2ssIG5ld01ldGEpXG4gIH0pXG5cbiAgdGhpcy5fY29tcGlsZSh0YXJnZXQsIGZyYWdCbG9jaywgbmV3TWV0YSlcbn1cblxuLyoqXG4gKiBDb21waWxlIGEgY29tcG9zZWQgY29tcG9uZW50LlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSB0YXJnZXRcbiAqIEBwYXJhbSB7b2JqZWN0fSBkZXN0XG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICovXG5leHBvcnQgZnVuY3Rpb24gX2NvbXBpbGVDdXN0b21Db21wb25lbnQgKGNvbXBvbmVudCwgdGFyZ2V0LCBkZXN0LCB0eXBlLCBtZXRhKSB7XG4gIGNvbnN0IFZtID0gdGhpcy5jb25zdHJ1Y3RvclxuICBjb25zdCBjb250ZXh0ID0gdGhpc1xuICBjb25zdCBzdWJWbSA9IG5ldyBWbSh0eXBlLCBjb21wb25lbnQsIGNvbnRleHQsIGRlc3QsIHVuZGVmaW5lZCwge1xuICAgICdob29rOmluaXQnOiBmdW5jdGlvbiAoKSB7XG4gICAgICBjb250ZXh0Ll9zZXRJZCh0YXJnZXQuaWQsIG51bGwsIHRoaXMpXG4gICAgICAvLyBiaW5kIHRlbXBsYXRlIGVhcmxpZXIgYmVjYXVzZSBvZiBsaWZlY3ljbGUgaXNzdWVzXG4gICAgICB0aGlzLl9leHRlcm5hbEJpbmRpbmcgPSB7XG4gICAgICAgIHBhcmVudDogY29udGV4dCxcbiAgICAgICAgdGVtcGxhdGU6IHRhcmdldFxuICAgICAgfVxuICAgIH0sXG4gICAgJ2hvb2s6Y3JlYXRlZCc6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnRleHQuX2JpbmRTdWJWbSh0aGlzLCB0YXJnZXQsIG1ldGEucmVwZWF0KVxuICAgIH0sXG4gICAgJ2hvb2s6cmVhZHknOiBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAodGhpcy5fY29udGVudCkge1xuICAgICAgICBjb250ZXh0Ll9jb21waWxlQ2hpbGRyZW4odGFyZ2V0LCB0aGlzLl9jb250ZW50KVxuICAgICAgfVxuICAgIH1cbiAgfSlcbiAgdGhpcy5fYmluZFN1YlZtQWZ0ZXJJbml0aWFsaXplZChzdWJWbSwgdGFyZ2V0KVxufVxuXG4vKipcbiAqIEdlbmVyYXRlIGVsZW1lbnQgZnJvbSB0ZW1wbGF0ZSBhbmQgYXR0YWNoIHRvIHRoZSBkZXN0IGlmIG5lZWRlZC5cbiAqIFRoZSB0aW1lIHRvIGF0dGFjaCBkZXBlbmRzIG9uIHdoZXRoZXIgdGhlIG1vZGUgc3RhdHVzIGlzIG5vZGUgb3IgdHJlZS5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gdGVtcGxhdGVcbiAqIEBwYXJhbSB7b2JqZWN0fSBkZXN0XG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICovXG5leHBvcnQgZnVuY3Rpb24gX2NvbXBpbGVOYXRpdmVDb21wb25lbnQgKHRlbXBsYXRlLCBkZXN0LCB0eXBlKSB7XG4gIHRoaXMuX2FwcGx5TmFpdHZlQ29tcG9uZW50T3B0aW9ucyh0ZW1wbGF0ZSlcblxuICBsZXQgZWxlbWVudFxuICBpZiAoZGVzdC5yZWYgPT09ICdfZG9jdW1lbnRFbGVtZW50Jykge1xuICAgIC8vIGlmIGl0cyBwYXJlbnQgaXMgZG9jdW1lbnRFbGVtZW50IHRoZW4gaXQncyBhIGJvZHlcbiAgICBfLmRlYnVnKCdjb21waWxlIHRvIGNyZWF0ZSBib2R5IGZvcicsIHR5cGUpXG4gICAgZWxlbWVudCA9IHRoaXMuX2NyZWF0ZUJvZHkodHlwZSlcbiAgfVxuICBlbHNlIHtcbiAgICBfLmRlYnVnKCdjb21waWxlIHRvIGNyZWF0ZSBlbGVtZW50IGZvcicsIHR5cGUpXG4gICAgZWxlbWVudCA9IHRoaXMuX2NyZWF0ZUVsZW1lbnQodHlwZSlcbiAgfVxuXG4gIGlmICghdGhpcy5fcm9vdEVsKSB7XG4gICAgdGhpcy5fcm9vdEVsID0gZWxlbWVudFxuICAgIC8vIGJpbmQgZXZlbnQgZWFybGllciBiZWNhdXNlIG9mIGxpZmVjeWNsZSBpc3N1ZXNcbiAgICBjb25zdCBiaW5kaW5nID0gdGhpcy5fZXh0ZXJuYWxCaW5kaW5nIHx8IHt9XG4gICAgY29uc3QgdGFyZ2V0ID0gYmluZGluZy50ZW1wbGF0ZVxuICAgIGNvbnN0IHZtID0gYmluZGluZy5wYXJlbnRcbiAgICBpZiAodGFyZ2V0ICYmIHRhcmdldC5ldmVudHMgJiYgdm0gJiYgZWxlbWVudCkge1xuICAgICAgZm9yIChjb25zdCB0eXBlIGluIHRhcmdldC5ldmVudHMpIHtcbiAgICAgICAgY29uc3QgaGFuZGxlciA9IHZtW3RhcmdldC5ldmVudHNbdHlwZV1dXG4gICAgICAgIGlmIChoYW5kbGVyKSB7XG4gICAgICAgICAgZWxlbWVudC5hZGRFdmVudCh0eXBlLCBfLmJpbmQoaGFuZGxlciwgdm0pKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdGhpcy5fYmluZEVsZW1lbnQoZWxlbWVudCwgdGVtcGxhdGUpXG5cbiAgaWYgKHRlbXBsYXRlLmF0dHIgJiYgdGVtcGxhdGUuYXR0ci5hcHBlbmQpIHsgLy8gYmFja3dhcmQsIGFwcGVuZCBwcm9wIGluIGF0dHJcbiAgICB0ZW1wbGF0ZS5hcHBlbmQgPSB0ZW1wbGF0ZS5hdHRyLmFwcGVuZFxuICB9XG5cbiAgaWYgKHRlbXBsYXRlLmFwcGVuZCkgeyAvLyBnaXZlIHRoZSBhcHBlbmQgYXR0cmlidXRlIGZvciBpb3MgYWRhcHRhdGlvblxuICAgIGVsZW1lbnQuYXR0ciA9IGVsZW1lbnQuYXR0ciB8fCB7fVxuICAgIGVsZW1lbnQuYXR0ci5hcHBlbmQgPSB0ZW1wbGF0ZS5hcHBlbmRcbiAgfVxuXG4gIGNvbnN0IHRyZWVNb2RlID0gdGVtcGxhdGUuYXBwZW5kID09PSAndHJlZSdcbiAgY29uc3QgYXBwID0gdGhpcy5fYXBwIHx8IHt9XG4gIGlmIChhcHAubGFzdFNpZ25hbCAhPT0gLTEgJiYgIXRyZWVNb2RlKSB7XG4gICAgXy5kZWJ1ZygnY29tcGlsZSB0byBhcHBlbmQgc2luZ2xlIG5vZGUgZm9yJywgZWxlbWVudClcbiAgICBhcHAubGFzdFNpZ25hbCA9IHRoaXMuX2F0dGFjaFRhcmdldChlbGVtZW50LCBkZXN0KVxuICB9XG4gIGlmIChhcHAubGFzdFNpZ25hbCAhPT0gLTEpIHtcbiAgICB0aGlzLl9jb21waWxlQ2hpbGRyZW4odGVtcGxhdGUsIGVsZW1lbnQpXG4gIH1cbiAgaWYgKGFwcC5sYXN0U2lnbmFsICE9PSAtMSAmJiB0cmVlTW9kZSkge1xuICAgIF8uZGVidWcoJ2NvbXBpbGUgdG8gYXBwZW5kIHdob2xlIHRyZWUgZm9yJywgZWxlbWVudClcbiAgICBhcHAubGFzdFNpZ25hbCA9IHRoaXMuX2F0dGFjaFRhcmdldChlbGVtZW50LCBkZXN0KVxuICB9XG59XG5cbi8qKlxuICogU2V0IGFsbCBjaGlsZHJlbiB0byBhIGNlcnRhaW4gcGFyZW50IGVsZW1lbnQuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHRlbXBsYXRlXG4gKiBAcGFyYW0ge29iamVjdH0gZGVzdFxuICovXG5leHBvcnQgZnVuY3Rpb24gX2NvbXBpbGVDaGlsZHJlbiAodGVtcGxhdGUsIGRlc3QpIHtcbiAgY29uc3QgYXBwID0gdGhpcy5fYXBwIHx8IHt9XG4gIGNvbnN0IGNoaWxkcmVuID0gdGVtcGxhdGUuY2hpbGRyZW5cbiAgaWYgKGNoaWxkcmVuICYmIGNoaWxkcmVuLmxlbmd0aCkge1xuICAgIGNoaWxkcmVuLmV2ZXJ5KChjaGlsZCkgPT4ge1xuICAgICAgdGhpcy5fY29tcGlsZShjaGlsZCwgZGVzdClcbiAgICAgIHJldHVybiBhcHAubGFzdFNpZ25hbCAhPT0gLTFcbiAgICB9KVxuICB9XG59XG5cbi8qKlxuICogV2F0Y2ggdGhlIGxpc3QgdXBkYXRlIGFuZCByZWZyZXNoIHRoZSBjaGFuZ2VzLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSB0YXJnZXRcbiAqIEBwYXJhbSB7b2JqZWN0fSBmcmFnQmxvY2sge3ZtcywgZGF0YSwgY2hpbGRyZW59XG4gKiBAcGFyYW0ge29iamVjdH0gaW5mbyAgICAgIHtnZXR0ZXIsIGtleSwgdmFsdWUsIHRyYWNrQnksIG9sZFN0eWxlfVxuICovXG5leHBvcnQgZnVuY3Rpb24gX2JpbmRSZXBlYXQgKHRhcmdldCwgZnJhZ0Jsb2NrLCBpbmZvKSB7XG4gIGNvbnN0IHZtcyA9IGZyYWdCbG9jay52bXNcbiAgY29uc3QgY2hpbGRyZW4gPSBmcmFnQmxvY2suY2hpbGRyZW5cbiAgY29uc3QgeyBnZXR0ZXIsIHRyYWNrQnksIG9sZFN0eWxlIH0gPSBpbmZvXG4gIGNvbnN0IGtleU5hbWUgPSBpbmZvLmtleVxuICBjb25zdCB2YWx1ZU5hbWUgPSBpbmZvLnZhbHVlXG5cbiAgZnVuY3Rpb24gY29tcGlsZUl0ZW0gKGl0ZW0sIGluZGV4LCBjb250ZXh0KSB7XG4gICAgbGV0IG1lcmdlZERhdGFcbiAgICBpZiAob2xkU3R5bGUpIHtcbiAgICAgIG1lcmdlZERhdGEgPSBpdGVtXG4gICAgICBpZiAodHlwZW9mIGl0ZW0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgIG1lcmdlZERhdGFba2V5TmFtZV0gPSBpbmRleFxuICAgICAgICBpZiAoIW1lcmdlZERhdGEuaGFzT3duUHJvcGVydHkoJ0lOREVYJykpIHtcbiAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobWVyZ2VkRGF0YSwgJ0lOREVYJywge1xuICAgICAgICAgICAgdmFsdWU6ICgpID0+IHtcbiAgICAgICAgICAgICAgXy53YXJuKCdcIklOREVYXCIgaW4gcmVwZWF0IGlzIGRlcHJlY2F0ZWQsJyArXG4gICAgICAgICAgICAgICAgJyBwbGVhc2UgdXNlIFwiJGluZGV4XCIgaW5zdGVhZCcpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIG1lcmdlZERhdGEgPSB7fVxuICAgICAgbWVyZ2VkRGF0YVtrZXlOYW1lXSA9IGluZGV4XG4gICAgICBtZXJnZWREYXRhW3ZhbHVlTmFtZV0gPSBpdGVtXG4gICAgfVxuICAgIGNvbnRleHQgPSBjb250ZXh0Ll9tZXJnZUNvbnRleHQobWVyZ2VkRGF0YSlcbiAgICB2bXMucHVzaChjb250ZXh0KVxuICAgIGNvbnRleHQuX2NvbXBpbGUodGFyZ2V0LCBmcmFnQmxvY2ssIHsgcmVwZWF0OiBpdGVtIH0pXG4gIH1cblxuICBjb25zdCBsaXN0ID0gdGhpcy5fd2F0Y2hCbG9jayhmcmFnQmxvY2ssIGdldHRlciwgJ3JlcGVhdCcsXG4gICAgKGRhdGEpID0+IHtcbiAgICAgIF8uZGVidWcoJ3RoZSBcInJlcGVhdFwiIGl0ZW0gaGFzIGNoYW5nZWQnLCBkYXRhKVxuICAgICAgaWYgKCFmcmFnQmxvY2spIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG9sZENoaWxkcmVuID0gY2hpbGRyZW4uc2xpY2UoKVxuICAgICAgY29uc3Qgb2xkVm1zID0gdm1zLnNsaWNlKClcbiAgICAgIGNvbnN0IG9sZERhdGEgPSBmcmFnQmxvY2suZGF0YS5zbGljZSgpXG4gICAgICAvLyAxLiBjb2xsZWN0IGFsbCBuZXcgcmVmcyB0cmFjayBieVxuICAgICAgY29uc3QgdHJhY2tNYXAgPSB7fVxuICAgICAgY29uc3QgcmV1c2VkTWFwID0ge31cbiAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgY29uc3Qga2V5ID0gdHJhY2tCeSA/IGl0ZW1bdHJhY2tCeV0gOiAob2xkU3R5bGUgPyBpdGVtW2tleU5hbWVdIDogaW5kZXgpXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICBpZiAoa2V5ID09IG51bGwgfHwga2V5ID09PSAnJykge1xuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIHRyYWNrTWFwW2tleV0gPSBpdGVtXG4gICAgICB9KVxuXG4gICAgICAvLyAyLiByZW1vdmUgdW51c2VkIGVsZW1lbnQgZm9yZWFjaCBvbGQgaXRlbVxuICAgICAgY29uc3QgcmV1c2VkTGlzdCA9IFtdXG4gICAgICBvbGREYXRhLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IGtleSA9IHRyYWNrQnkgPyBpdGVtW3RyYWNrQnldIDogKG9sZFN0eWxlID8gaXRlbVtrZXlOYW1lXSA6IGluZGV4KVxuICAgICAgICBpZiAodHJhY2tNYXAuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgIHJldXNlZE1hcFtrZXldID0ge1xuICAgICAgICAgICAgaXRlbSwgaW5kZXgsIGtleSxcbiAgICAgICAgICAgIHRhcmdldDogb2xkQ2hpbGRyZW5baW5kZXhdLFxuICAgICAgICAgICAgdm06IG9sZFZtc1tpbmRleF1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV1c2VkTGlzdC5wdXNoKGl0ZW0pXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdGhpcy5fcmVtb3ZlVGFyZ2V0KG9sZENoaWxkcmVuW2luZGV4XSlcbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgICAgLy8gMy4gY3JlYXRlIG5ldyBlbGVtZW50IGZvcmVhY2ggbmV3IGl0ZW1cbiAgICAgIGNoaWxkcmVuLmxlbmd0aCA9IDBcbiAgICAgIHZtcy5sZW5ndGggPSAwXG4gICAgICBmcmFnQmxvY2suZGF0YSA9IGRhdGEuc2xpY2UoKVxuICAgICAgZnJhZ0Jsb2NrLnVwZGF0ZU1hcmsgPSBmcmFnQmxvY2suc3RhcnRcblxuICAgICAgZGF0YS5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICBjb25zdCBrZXkgPSB0cmFja0J5ID8gaXRlbVt0cmFja0J5XSA6IChvbGRTdHlsZSA/IGl0ZW1ba2V5TmFtZV0gOiBpbmRleClcbiAgICAgICAgY29uc3QgcmV1c2VkID0gcmV1c2VkTWFwW2tleV1cbiAgICAgICAgaWYgKHJldXNlZCkge1xuICAgICAgICAgIGlmIChyZXVzZWQuaXRlbSA9PT0gcmV1c2VkTGlzdFswXSkge1xuICAgICAgICAgICAgcmV1c2VkTGlzdC5zaGlmdCgpXG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV1c2VkTGlzdC4kcmVtb3ZlKHJldXNlZC5pdGVtKVxuICAgICAgICAgICAgdGhpcy5fbW92ZVRhcmdldChyZXVzZWQudGFyZ2V0LCBmcmFnQmxvY2sudXBkYXRlTWFyaywgdHJ1ZSlcbiAgICAgICAgICB9XG4gICAgICAgICAgY2hpbGRyZW4ucHVzaChyZXVzZWQudGFyZ2V0KVxuICAgICAgICAgIHZtcy5wdXNoKHJldXNlZC52bSlcbiAgICAgICAgICByZXVzZWQudm1ba2V5TmFtZV0gPSBpbmRleFxuICAgICAgICAgIGZyYWdCbG9jay51cGRhdGVNYXJrID0gcmV1c2VkLnRhcmdldFxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGNvbXBpbGVJdGVtKGl0ZW0sIGluZGV4LCB0aGlzKVxuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgICBkZWxldGUgZnJhZ0Jsb2NrLnVwZGF0ZU1hcmtcbiAgICB9XG4gIClcblxuICBmcmFnQmxvY2suZGF0YSA9IGxpc3Quc2xpY2UoMClcbiAgbGlzdC5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgIGNvbXBpbGVJdGVtKGl0ZW0sIGluZGV4LCB0aGlzKVxuICB9KVxufVxuXG4vKipcbiAqIFdhdGNoIHRoZSBkaXNwbGF5IHVwZGF0ZSBhbmQgYWRkL3JlbW92ZSB0aGUgZWxlbWVudC5cbiAqXG4gKiBAcGFyYW0gIHtvYmplY3R9IHRhcmdldFxuICogQHBhcmFtICB7b2JqZWN0fSBmcmFnQmxvY2tcbiAqIEBwYXJhbSAge29iamVjdH0gY29udGV4dFxuICovXG5leHBvcnQgZnVuY3Rpb24gX2JpbmRTaG93biAodGFyZ2V0LCBmcmFnQmxvY2ssIG1ldGEpIHtcbiAgY29uc3QgZGlzcGxheSA9IHRoaXMuX3dhdGNoQmxvY2soZnJhZ0Jsb2NrLCB0YXJnZXQuc2hvd24sICdzaG93bicsXG4gICAgKGRpc3BsYXkpID0+IHtcbiAgICAgIF8uZGVidWcoJ3RoZSBcImlmXCIgaXRlbSB3YXMgY2hhbmdlZCcsIGRpc3BsYXkpXG5cbiAgICAgIGlmICghZnJhZ0Jsb2NrIHx8ICEhZnJhZ0Jsb2NrLmRpc3BsYXkgPT09ICEhZGlzcGxheSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGZyYWdCbG9jay5kaXNwbGF5ID0gISFkaXNwbGF5XG4gICAgICBpZiAoZGlzcGxheSkge1xuICAgICAgICB0aGlzLl9jb21waWxlKHRhcmdldCwgZnJhZ0Jsb2NrLCBtZXRhKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRoaXMuX3JlbW92ZUJsb2NrKGZyYWdCbG9jaywgdHJ1ZSlcbiAgICAgIH1cbiAgICB9XG4gIClcblxuICBmcmFnQmxvY2suZGlzcGxheSA9ICEhZGlzcGxheVxuICBpZiAoZGlzcGxheSkge1xuICAgIHRoaXMuX2NvbXBpbGUodGFyZ2V0LCBmcmFnQmxvY2ssIG1ldGEpXG4gIH1cbn1cblxuLyoqXG4gKiBXYXRjaCBjYWxjIHZhbHVlIGNoYW5nZXMgYW5kIGFwcGVuZCBjZXJ0YWluIHR5cGUgYWN0aW9uIHRvIGRpZmZlci5cbiAqIEl0IGlzIHVzZWQgZm9yIGlmIG9yIHJlcGVhdCBkYXRhLWJpbmRpbmcgZ2VuZXJhdG9yLlxuICpcbiAqIEBwYXJhbSAge29iamVjdH0gICBmcmFnQmxvY2tcbiAqIEBwYXJhbSAge2Z1bmN0aW9ufSBjYWxjXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICAgdHlwZVxuICogQHBhcmFtICB7ZnVuY3Rpb259IGhhbmRsZXJcbiAqIEByZXR1cm4ge2FueX0gICAgICBpbml0IHZhbHVlIG9mIGNhbGNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF93YXRjaEJsb2NrIChmcmFnQmxvY2ssIGNhbGMsIHR5cGUsIGhhbmRsZXIpIHtcbiAgY29uc3QgZGlmZmVyID0gdGhpcyAmJiB0aGlzLl9hcHAgJiYgdGhpcy5fYXBwLmRpZmZlclxuICBjb25zdCBjb25maWcgPSB7fVxuICBjb25zdCBkZXB0aCA9IChmcmFnQmxvY2suZWxlbWVudC5kZXB0aCB8fCAwKSArIDFcblxuICByZXR1cm4gdGhpcy5fd2F0Y2goY2FsYywgKHZhbHVlKSA9PiB7XG4gICAgY29uZmlnLmxhdGVzdFZhbHVlID0gdmFsdWVcbiAgICBpZiAoZGlmZmVyICYmICFjb25maWcucmVjb3JkZWQpIHtcbiAgICAgIGRpZmZlci5hcHBlbmQodHlwZSwgZGVwdGgsIGZyYWdCbG9jay5ibG9ja0lkLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGxhdGVzdFZhbHVlID0gY29uZmlnLmxhdGVzdFZhbHVlXG4gICAgICAgIGhhbmRsZXIobGF0ZXN0VmFsdWUpXG4gICAgICAgIGNvbmZpZy5yZWNvcmRlZCA9IGZhbHNlXG4gICAgICAgIGNvbmZpZy5sYXRlc3RWYWx1ZSA9IHVuZGVmaW5lZFxuICAgICAgfSlcbiAgICB9XG4gICAgY29uZmlnLnJlY29yZGVkID0gdHJ1ZVxuICB9KVxufVxuXG4vKipcbiAqIENsb25lIGEgY29udGV4dCBhbmQgbWVyZ2UgY2VydGFpbiBkYXRhLlxuICpcbiAqIEBwYXJhbSAge29iamVjdH0gbWVyZ2VkRGF0YVxuICogQHJldHVybiB7b2JqZWN0fVxuICovXG5leHBvcnQgZnVuY3Rpb24gX21lcmdlQ29udGV4dCAobWVyZ2VkRGF0YSkge1xuICBjb25zdCBjb250ZXh0ID0gT2JqZWN0LmNyZWF0ZSh0aGlzKVxuICBjb250ZXh0Ll9kYXRhID0gbWVyZ2VkRGF0YVxuICBjb250ZXh0Ll9pbml0RGF0YSgpXG4gIGNvbnRleHQuX2luaXRDb21wdXRlZCgpXG4gIGNvbnRleHQuX3JlYWxQYXJlbnQgPSB0aGlzXG4gIHJldHVybiBjb250ZXh0XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2h0bWw1L2RlZmF1bHQvdm0vY29tcGlsZXIuanNcbiAqKi8iLCIvKipcbiAqIEBmaWxlT3ZlcnZpZXdcbiAqIERpcmVjdGl2ZSBQYXJzZXJcbiAqL1xuXG5pbXBvcnQgKiBhcyBfIGZyb20gJy4uL3V0aWwnXG5cbmltcG9ydCBXYXRjaGVyIGZyb20gJy4uL2NvcmUvd2F0Y2hlcidcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vY29uZmlnJ1xuXG5jb25zdCB7IG5hdGl2ZUNvbXBvbmVudE1hcCB9ID0gY29uZmlnXG5cbmNvbnN0IFNFVFRFUlMgPSB7XG4gIGF0dHI6ICdzZXRBdHRyJyxcbiAgc3R5bGU6ICdzZXRTdHlsZScsXG4gIGV2ZW50OiAnYWRkRXZlbnQnXG59XG5cbi8qKlxuICogYXBwbHkgdGhlIG5hdGl2ZSBjb21wb25lbnQncyBvcHRpb25zKHNwZWNpZmllZCBieSB0ZW1wbGF0ZS50eXBlKVxuICogdG8gdGhlIHRlbXBsYXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfYXBwbHlOYWl0dmVDb21wb25lbnRPcHRpb25zICh0ZW1wbGF0ZSkge1xuICBjb25zdCB7IHR5cGUgfSA9IHRlbXBsYXRlXG4gIGNvbnN0IG9wdGlvbnMgPSBuYXRpdmVDb21wb25lbnRNYXBbdHlwZV1cblxuICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdvYmplY3QnKSB7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gb3B0aW9ucykge1xuICAgICAgaWYgKHRlbXBsYXRlW2tleV0gPT0gbnVsbCkge1xuICAgICAgICB0ZW1wbGF0ZVtrZXldID0gb3B0aW9uc1trZXldXG4gICAgICB9XG4gICAgICBlbHNlIGlmIChfLnR5cG9mKHRlbXBsYXRlW2tleV0pID09PSAnb2JqZWN0JyAmJlxuICAgICAgICBfLnR5cG9mKG9wdGlvbnNba2V5XSkgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGZvciAoY29uc3Qgc3Via2V5IGluIG9wdGlvbnNba2V5XSkge1xuICAgICAgICAgIGlmICh0ZW1wbGF0ZVtrZXldW3N1YmtleV0gPT0gbnVsbCkge1xuICAgICAgICAgICAgdGVtcGxhdGVba2V5XVtzdWJrZXldID0gb3B0aW9uc1trZXldW3N1YmtleV1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBiaW5kIGFsbCBpZCwgYXR0ciwgY2xhc3NuYW1lcywgc3R5bGUsIGV2ZW50cyB0byBhbiBlbGVtZW50XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfYmluZEVsZW1lbnQgKGVsLCB0ZW1wbGF0ZSkge1xuICB0aGlzLl9zZXRJZCh0ZW1wbGF0ZS5pZCwgZWwsIHRoaXMpXG4gIHRoaXMuX3NldEF0dHIoZWwsIHRlbXBsYXRlLmF0dHIpXG4gIHRoaXMuX3NldENsYXNzKGVsLCB0ZW1wbGF0ZS5jbGFzc0xpc3QpXG4gIHRoaXMuX3NldFN0eWxlKGVsLCB0ZW1wbGF0ZS5zdHlsZSlcbiAgdGhpcy5fYmluZEV2ZW50cyhlbCwgdGVtcGxhdGUuZXZlbnRzKVxufVxuXG4vKipcbiAqIGJpbmQgYWxsIHByb3BzIHRvIHN1YiB2bSBhbmQgYmluZCBhbGwgc3R5bGUsIGV2ZW50cyB0byB0aGUgcm9vdCBlbGVtZW50XG4gKiBvZiB0aGUgc3ViIHZtIGlmIGl0IGRvZXNuJ3QgaGF2ZSBhIHJlcGxhY2VkIG11bHRpLW5vZGUgZnJhZ21lbnRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9iaW5kU3ViVm0gKHN1YlZtLCB0ZW1wbGF0ZSwgcmVwZWF0SXRlbSkge1xuICBzdWJWbSA9IHN1YlZtIHx8IHt9XG4gIHRlbXBsYXRlID0gdGVtcGxhdGUgfHwge31cblxuICBjb25zdCBvcHRpb25zID0gc3ViVm0uX29wdGlvbnMgfHwge31cblxuICAvLyBiaW5kIHByb3BzXG4gIGxldCBwcm9wcyA9IG9wdGlvbnMucHJvcHNcblxuICBpZiAoQXJyYXkuaXNBcnJheShwcm9wcykpIHtcbiAgICBwcm9wcyA9IHByb3BzLnJlZHVjZSgocmVzdWx0LCB2YWx1ZSkgPT4ge1xuICAgICAgcmVzdWx0W3ZhbHVlXSA9IHRydWVcbiAgICAgIHJldHVybiByZXN1bHRcbiAgICB9LCB7fSlcbiAgfVxuXG4gIG1lcmdlUHJvcHMocmVwZWF0SXRlbSwgcHJvcHMsIHRoaXMsIHN1YlZtKVxuICBtZXJnZVByb3BzKHRlbXBsYXRlLmF0dHIsIHByb3BzLCB0aGlzLCBzdWJWbSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9iaW5kU3ViVm1BZnRlckluaXRpYWxpemVkIChzdWJWbSwgdGVtcGxhdGUpIHtcbiAgbWVyZ2VDbGFzc1N0eWxlKHRlbXBsYXRlLmNsYXNzTGlzdCwgdGhpcywgc3ViVm0pXG4gIG1lcmdlU3R5bGUodGVtcGxhdGUuc3R5bGUsIHRoaXMsIHN1YlZtKVxufVxuXG5mdW5jdGlvbiBtZXJnZVByb3BzICh0YXJnZXQsIHByb3BzLCB2bSwgc3ViVm0pIHtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICByZXR1cm5cbiAgfVxuICBmb3IgKGNvbnN0IGtleSBpbiB0YXJnZXQpIHtcbiAgICBpZiAoIXByb3BzIHx8IHByb3BzW2tleV0pIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gdGFyZ2V0W2tleV1cbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY29uc3QgcmV0dXJuVmFsdWUgPSB2bS5fd2F0Y2godmFsdWUsIGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgc3ViVm1ba2V5XSA9IHZcbiAgICAgICAgfSlcbiAgICAgICAgc3ViVm1ba2V5XSA9IHJldHVyblZhbHVlXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgc3ViVm1ba2V5XSA9IHZhbHVlXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIG1lcmdlU3R5bGUgKHRhcmdldCwgdm0sIHN1YlZtKSB7XG4gIGZvciAoY29uc3Qga2V5IGluIHRhcmdldCkge1xuICAgIGNvbnN0IHZhbHVlID0gdGFyZ2V0W2tleV1cbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb25zdCByZXR1cm5WYWx1ZSA9IHZtLl93YXRjaCh2YWx1ZSwgZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgaWYgKHN1YlZtLl9yb290RWwpIHtcbiAgICAgICAgICBzdWJWbS5fcm9vdEVsLnNldFN0eWxlKGtleSwgdilcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIHN1YlZtLl9yb290RWwuc2V0U3R5bGUoa2V5LCByZXR1cm5WYWx1ZSlcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBpZiAoc3ViVm0uX3Jvb3RFbCkge1xuICAgICAgICBzdWJWbS5fcm9vdEVsLnNldFN0eWxlKGtleSwgdmFsdWUpXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIG1lcmdlQ2xhc3NTdHlsZSAodGFyZ2V0LCB2bSwgc3ViVm0pIHtcbiAgY29uc3QgY3NzID0gdm0uX29wdGlvbnMgJiYgdm0uX29wdGlvbnMuc3R5bGUgfHwge31cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgaWYgKCFzdWJWbS5fcm9vdEVsKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICBpZiAodHlwZW9mIHRhcmdldCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNvbnN0IHZhbHVlID0gdm0uX3dhdGNoKHRhcmdldCwgdiA9PiB7XG4gICAgICBzZXRDbGFzc1N0eWxlKHN1YlZtLl9yb290RWwsIGNzcywgdilcbiAgICB9KVxuICAgIHNldENsYXNzU3R5bGUoc3ViVm0uX3Jvb3RFbCwgY3NzLCB2YWx1ZSlcbiAgfVxuICBlbHNlIGlmICh0YXJnZXQgIT0gbnVsbCkge1xuICAgIHNldENsYXNzU3R5bGUoc3ViVm0uX3Jvb3RFbCwgY3NzLCB0YXJnZXQpXG4gIH1cbn1cblxuLyoqXG4gKiBiaW5kIGlkIHRvIGFuIGVsZW1lbnRcbiAqIGVhY2ggaWQgaXMgdW5pcXVlIGluIGEgd2hvbGUgdm1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9zZXRJZCAoaWQsIGVsLCB2bSkge1xuICBjb25zdCBtYXAgPSBPYmplY3QuY3JlYXRlKG51bGwpXG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMobWFwLCB7XG4gICAgdm06IHtcbiAgICAgIHZhbHVlOiB2bSxcbiAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2VcbiAgICB9LFxuICAgIGVsOiB7XG4gICAgICBnZXQ6ICgpID0+IGVsIHx8IHZtLl9yb290RWwsXG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlXG4gICAgfVxuICB9KVxuXG4gIGlmICh0eXBlb2YgaWQgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjb25zdCBoYW5kbGVyID0gaWRcbiAgICBpZCA9IGhhbmRsZXIuY2FsbCh0aGlzKVxuICAgIGlmIChpZCkge1xuICAgICAgdGhpcy5faWRzW2lkXSA9IG1hcFxuICAgIH1cbiAgICB0aGlzLl93YXRjaChoYW5kbGVyLCAobmV3SWQpID0+IHtcbiAgICAgIGlmIChuZXdJZCkge1xuICAgICAgICB0aGlzLl9pZHNbbmV3SWRdID0gbWFwXG4gICAgICB9XG4gICAgfSlcbiAgfVxuICBlbHNlIGlmIChpZCAmJiB0eXBlb2YgaWQgPT09ICdzdHJpbmcnKSB7XG4gICAgdGhpcy5faWRzW2lkXSA9IG1hcFxuICB9XG59XG5cbi8qKlxuICogYmluZCBhdHRyIHRvIGFuIGVsZW1lbnRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9zZXRBdHRyIChlbCwgYXR0cikge1xuICB0aGlzLl9iaW5kRGlyKGVsLCAnYXR0cicsIGF0dHIpXG59XG5cbmZ1bmN0aW9uIHNldENsYXNzU3R5bGUgKGVsLCBjc3MsIGNsYXNzTGlzdCkge1xuICBjb25zdCBjbGFzc1N0eWxlID0ge31cbiAgY29uc3QgbGVuZ3RoID0gY2xhc3NMaXN0Lmxlbmd0aFxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBzdHlsZSA9IGNzc1tjbGFzc0xpc3RbaV1dXG4gICAgaWYgKHN0eWxlKSB7XG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBzdHlsZSkge1xuICAgICAgICBjbGFzc1N0eWxlW2tleV0gPSBzdHlsZVtrZXldXG4gICAgICB9XG4gICAgfVxuICB9XG4gIGVsLnNldENsYXNzU3R5bGUoY2xhc3NTdHlsZSlcbn1cblxuLyoqXG4gKiBiaW5kIGNsYXNzbmFtZXMgdG8gYW4gZWxlbWVudFxuICovXG5leHBvcnQgZnVuY3Rpb24gX3NldENsYXNzIChlbCwgY2xhc3NMaXN0KSB7XG4gIGlmICh0eXBlb2YgY2xhc3NMaXN0ICE9PSAnZnVuY3Rpb24nICYmICFBcnJheS5pc0FycmF5KGNsYXNzTGlzdCkpIHtcbiAgICByZXR1cm5cbiAgfVxuICBpZiAoQXJyYXkuaXNBcnJheShjbGFzc0xpc3QpICYmICFjbGFzc0xpc3QubGVuZ3RoKSB7XG4gICAgZWwuc2V0Q2xhc3NTdHlsZSh7fSlcbiAgICByZXR1cm5cbiAgfVxuXG4gIGNvbnN0IHN0eWxlID0gdGhpcy5fb3B0aW9ucyAmJiB0aGlzLl9vcHRpb25zLnN0eWxlIHx8IHt9XG4gIGlmICh0eXBlb2YgY2xhc3NMaXN0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLl93YXRjaChjbGFzc0xpc3QsIHYgPT4ge1xuICAgICAgc2V0Q2xhc3NTdHlsZShlbCwgc3R5bGUsIHYpXG4gICAgfSlcbiAgICBzZXRDbGFzc1N0eWxlKGVsLCBzdHlsZSwgdmFsdWUpXG4gIH1cbiAgZWxzZSB7XG4gICAgc2V0Q2xhc3NTdHlsZShlbCwgc3R5bGUsIGNsYXNzTGlzdClcbiAgfVxufVxuXG4vKipcbiAqIGJpbmQgc3R5bGUgdG8gYW4gZWxlbWVudFxuICovXG5leHBvcnQgZnVuY3Rpb24gX3NldFN0eWxlIChlbCwgc3R5bGUpIHtcbiAgdGhpcy5fYmluZERpcihlbCwgJ3N0eWxlJywgc3R5bGUpXG59XG5cbi8qKlxuICogYWRkIGFuIGV2ZW50IHR5cGUgYW5kIGhhbmRsZXIgdG8gYW4gZWxlbWVudCBhbmQgZ2VuZXJhdGUgYSBkb20gdXBkYXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfc2V0RXZlbnQgKGVsLCB0eXBlLCBoYW5kbGVyKSB7XG4gIGVsLmFkZEV2ZW50KHR5cGUsIF8uYmluZChoYW5kbGVyLCB0aGlzKSlcbn1cblxuLyoqXG4gKiBhZGQgYWxsIGV2ZW50cyBvZiBhbiBlbGVtZW50XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfYmluZEV2ZW50cyAoZWwsIGV2ZW50cykge1xuICBpZiAoIWV2ZW50cykge1xuICAgIHJldHVyblxuICB9XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhldmVudHMpXG4gIGxldCBpID0ga2V5cy5sZW5ndGhcbiAgd2hpbGUgKGktLSkge1xuICAgIGNvbnN0IGtleSA9IGtleXNbaV1cbiAgICBsZXQgaGFuZGxlciA9IGV2ZW50c1trZXldXG4gICAgaWYgKHR5cGVvZiBoYW5kbGVyID09PSAnc3RyaW5nJykge1xuICAgICAgaGFuZGxlciA9IHRoaXNbaGFuZGxlcl1cbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgaWYgKCFoYW5kbGVyKSB7XG4gICAgICAgIF8uZXJyb3IoYFRoZSBtZXRob2QgXCIke2hhbmRsZXJ9XCIgaXMgbm90IGRlZmluZWQuYClcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fc2V0RXZlbnQoZWwsIGtleSwgaGFuZGxlcilcbiAgfVxufVxuXG4vKipcbiAqIHNldCBhIHNlcmllcyBvZiBtZW1iZXJzIGFzIGEga2luZCBvZiBhbiBlbGVtZW50XG4gKiBmb3IgZXhhbXBsZTogc3R5bGUsIGF0dHIsIC4uLlxuICogaWYgdGhlIHZhbHVlIGlzIGEgZnVuY3Rpb24gdGhlbiBiaW5kIHRoZSBkYXRhIGNoYW5nZXNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9iaW5kRGlyIChlbCwgbmFtZSwgZGF0YSkge1xuICBpZiAoIWRhdGEpIHtcbiAgICByZXR1cm5cbiAgfVxuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoZGF0YSlcbiAgbGV0IGkgPSBrZXlzLmxlbmd0aFxuICB3aGlsZSAoaS0tKSB7XG4gICAgY29uc3Qga2V5ID0ga2V5c1tpXVxuICAgIGNvbnN0IHZhbHVlID0gZGF0YVtrZXldXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy5fYmluZEtleShlbCwgbmFtZSwga2V5LCB2YWx1ZSlcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBlbFtTRVRURVJTW25hbWVdXShrZXksIHZhbHVlKVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIGJpbmQgZGF0YSBjaGFuZ2VzIHRvIGEgY2VydGFpbiBrZXkgdG8gYSBuYW1lIHNlcmllcyBpbiBhbiBlbGVtZW50XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfYmluZEtleSAoZWwsIG5hbWUsIGtleSwgY2FsYykge1xuICBjb25zdCBtZXRob2ROYW1lID0gU0VUVEVSU1tuYW1lXVxuICAvLyB3YXRjaCB0aGUgY2FsYywgYW5kIHJldHVybnMgYSB2YWx1ZSBieSBjYWxjLmNhbGwoKVxuICBjb25zdCB2YWx1ZSA9IHRoaXMuX3dhdGNoKGNhbGMsICh2YWx1ZSkgPT4ge1xuICAgIGZ1bmN0aW9uIGhhbmRsZXIgKCkge1xuICAgICAgZWxbbWV0aG9kTmFtZV0oa2V5LCB2YWx1ZSlcbiAgICB9XG4gICAgY29uc3QgZGlmZmVyID0gdGhpcyAmJiB0aGlzLl9hcHAgJiYgdGhpcy5fYXBwLmRpZmZlclxuICAgIGlmIChkaWZmZXIpIHtcbiAgICAgIGRpZmZlci5hcHBlbmQoJ2VsZW1lbnQnLCBlbC5kZXB0aCwgZWwucmVmLCBoYW5kbGVyKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGhhbmRsZXIoKVxuICAgIH1cbiAgfSlcblxuICBlbFttZXRob2ROYW1lXShrZXksIHZhbHVlKVxufVxuXG4vKipcbiAqIHdhdGNoIGEgY2FsYyBmdW5jdGlvbiBhbmQgY2FsbGJhY2sgaWYgdGhlIGNhbGMgdmFsdWUgY2hhbmdlc1xuICovXG5leHBvcnQgZnVuY3Rpb24gX3dhdGNoIChjYWxjLCBjYWxsYmFjaykge1xuICBjb25zdCB3YXRjaGVyID0gbmV3IFdhdGNoZXIodGhpcywgY2FsYywgZnVuY3Rpb24gKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdvYmplY3QnICYmIHZhbHVlID09PSBvbGRWYWx1ZSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGNhbGxiYWNrKHZhbHVlKVxuICB9KVxuXG4gIHJldHVybiB3YXRjaGVyLnZhbHVlXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2h0bWw1L2RlZmF1bHQvdm0vZGlyZWN0aXZlLmpzXG4gKiovIiwiLyoqXG4gKiBAZmlsZU92ZXJ2aWV3IERvY3VtZW50ICYgRWxlbWVudCBIZWxwZXJzLlxuICpcbiAqIHJlcXVpcmVkOlxuICogRG9jdW1lbnQjOiBjcmVhdGVFbGVtZW50LCBjcmVhdGVDb21tZW50LCBnZXRSZWZcbiAqIEVsZW1lbnQjOiBhcHBlbmRDaGlsZCwgaW5zZXJ0QmVmb3JlLCByZW1vdmVDaGlsZCwgbmV4dFNpYmxpbmdcbiAqL1xuXG4vKipcbiAqIENyZWF0ZSBhIGJvZHkgYnkgdHlwZVxuICogVXNpbmcgdGhpcy5fYXBwLmRvY1xuICpcbiAqIEBwYXJhbSAge3N0cmluZ30gdHlwZVxuICovXG5leHBvcnQgZnVuY3Rpb24gX2NyZWF0ZUJvZHkgKHR5cGUpIHtcbiAgY29uc3QgZG9jID0gdGhpcy5fYXBwLmRvY1xuICByZXR1cm4gZG9jLmNyZWF0ZUJvZHkodHlwZSlcbn1cblxuLyoqXG4gKiBDcmVhdGUgYW4gZWxlbWVudCBieSB0eXBlXG4gKiBVc2luZyB0aGlzLl9hcHAuZG9jXG4gKlxuICogQHBhcmFtICB7c3RyaW5nfSB0eXBlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfY3JlYXRlRWxlbWVudCAodHlwZSkge1xuICBjb25zdCBkb2MgPSB0aGlzLl9hcHAuZG9jXG4gIHJldHVybiBkb2MuY3JlYXRlRWxlbWVudCh0eXBlKVxufVxuXG4vKipcbiAqIENyZWF0ZSBhbmQgcmV0dXJuIGEgZnJhZyBibG9jayBmb3IgYW4gZWxlbWVudC5cbiAqIFRoZSBmcmFnIGJsb2NrIGhhcyBhIHN0YXJ0ZXIsIGVuZGVyIGFuZCB0aGUgZWxlbWVudCBpdHNlbGYuXG4gKlxuICogQHBhcmFtICB7b2JqZWN0fSBlbGVtZW50XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfY3JlYXRlQmxvY2sgKGVsZW1lbnQpIHtcbiAgY29uc3Qgc3RhcnQgPSB0aGlzLl9jcmVhdGVCbG9ja1N0YXJ0KClcbiAgY29uc3QgZW5kID0gdGhpcy5fY3JlYXRlQmxvY2tFbmQoKVxuICBjb25zdCBibG9ja0lkID0gbGFzdGVzdEJsb2NrSWQrK1xuICBpZiAoZWxlbWVudC5lbGVtZW50KSB7XG4gICAgZWxlbWVudC5lbGVtZW50Lmluc2VydEJlZm9yZShzdGFydCwgZWxlbWVudC5lbmQpXG4gICAgZWxlbWVudC5lbGVtZW50Lmluc2VydEJlZm9yZShlbmQsIGVsZW1lbnQuZW5kKVxuICAgIGVsZW1lbnQgPSBlbGVtZW50LmVsZW1lbnRcbiAgfVxuICBlbHNlIHtcbiAgICBlbGVtZW50LmFwcGVuZENoaWxkKHN0YXJ0KVxuICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoZW5kKVxuICB9XG4gIHJldHVybiB7IHN0YXJ0LCBlbmQsIGVsZW1lbnQsIGJsb2NrSWQgfVxufVxuXG5sZXQgbGFzdGVzdEJsb2NrSWQgPSAxXG5cbi8qKlxuICogQ3JlYXRlIGFuZCByZXR1cm4gYSBibG9jayBzdGFydGVyLlxuICogVXNpbmcgdGhpcy5fYXBwLmRvY1xuICovXG5leHBvcnQgZnVuY3Rpb24gX2NyZWF0ZUJsb2NrU3RhcnQgKCkge1xuICBjb25zdCBkb2MgPSB0aGlzLl9hcHAuZG9jXG4gIGNvbnN0IGFuY2hvciA9IGRvYy5jcmVhdGVDb21tZW50KCdzdGFydCcpXG4gIHJldHVybiBhbmNob3Jcbn1cblxuLyoqXG4gKiBDcmVhdGUgYW5kIHJldHVybiBhIGJsb2NrIGVuZGVyLlxuICogVXNpbmcgdGhpcy5fYXBwLmRvY1xuICovXG5leHBvcnQgZnVuY3Rpb24gX2NyZWF0ZUJsb2NrRW5kICgpIHtcbiAgY29uc3QgZG9jID0gdGhpcy5fYXBwLmRvY1xuICBjb25zdCBhbmNob3IgPSBkb2MuY3JlYXRlQ29tbWVudCgnZW5kJylcbiAgcmV0dXJuIGFuY2hvclxufVxuXG4vKipcbiAqIEF0dGFjaCB0YXJnZXQgdG8gYSBjZXJ0YWluIGRlc3QgdXNpbmcgYXBwZW5kQ2hpbGQgYnkgZGVmYXVsdC5cbiAqIElmIHRoZSBkZXN0IGlzIGEgZnJhZyBibG9jayB0aGVuIGluc2VydCBiZWZvcmUgdGhlIGVuZGVyLlxuICogSWYgdGhlIHRhcmdldCBpcyBhIGZyYWcgYmxvY2sgdGhlbiBhdHRhY2ggdGhlIHN0YXJ0ZXIgYW5kIGVuZGVyIGluIG9yZGVyLlxuICpcbiAqIEBwYXJhbSAge29iamVjdH0gdGFyZ2V0XG4gKiBAcGFyYW0gIHtvYmplY3R9IGRlc3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9hdHRhY2hUYXJnZXQgKHRhcmdldCwgZGVzdCkge1xuICBpZiAoZGVzdC5lbGVtZW50KSB7XG4gICAgY29uc3QgYmVmb3JlID0gZGVzdC5lbmRcbiAgICBjb25zdCBhZnRlciA9IGRlc3QudXBkYXRlTWFya1xuICAgIC8vIHB1c2ggbmV3IHRhcmdldCBmb3Igd2F0Y2ggbGlzdCB1cGRhdGUgbGF0ZXJcbiAgICBpZiAoZGVzdC5jaGlsZHJlbikge1xuICAgICAgZGVzdC5jaGlsZHJlbi5wdXNoKHRhcmdldClcbiAgICB9XG4gICAgLy8gZm9yIGNoZWNrIHJlcGVhdCBjYXNlXG4gICAgaWYgKGFmdGVyKSB7XG4gICAgICBjb25zdCBzaWduYWwgPSB0aGlzLl9tb3ZlVGFyZ2V0KHRhcmdldCwgYWZ0ZXIpXG4gICAgICBkZXN0LnVwZGF0ZU1hcmsgPSB0YXJnZXQuZWxlbWVudCA/IHRhcmdldC5lbmQgOiB0YXJnZXRcbiAgICAgIHJldHVybiBzaWduYWxcbiAgICB9XG4gICAgZWxzZSBpZiAodGFyZ2V0LmVsZW1lbnQpIHtcbiAgICAgIGRlc3QuZWxlbWVudC5pbnNlcnRCZWZvcmUodGFyZ2V0LnN0YXJ0LCBiZWZvcmUpXG4gICAgICBkZXN0LmVsZW1lbnQuaW5zZXJ0QmVmb3JlKHRhcmdldC5lbmQsIGJlZm9yZSlcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gZGVzdC5lbGVtZW50Lmluc2VydEJlZm9yZSh0YXJnZXQsIGJlZm9yZSlcbiAgICB9XG4gIH1cbiAgZWxzZSB7XG4gICAgaWYgKHRhcmdldC5lbGVtZW50KSB7XG4gICAgICBkZXN0LmFwcGVuZENoaWxkKHRhcmdldC5zdGFydClcbiAgICAgIGRlc3QuYXBwZW5kQ2hpbGQodGFyZ2V0LmVuZClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gZGVzdC5hcHBlbmRDaGlsZCh0YXJnZXQpXG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogTW92ZSB0YXJnZXQgYmVmb3JlIGEgY2VydGFpbiBlbGVtZW50LiBUaGUgdGFyZ2V0IG1heWJlIGJsb2NrIG9yIGVsZW1lbnQuXG4gKlxuICogQHBhcmFtICB7b2JqZWN0fSB0YXJnZXRcbiAqIEBwYXJhbSAge29iamVjdH0gYmVmb3JlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfbW92ZVRhcmdldCAodGFyZ2V0LCBhZnRlcikge1xuICBpZiAodGFyZ2V0LmVsZW1lbnQpIHtcbiAgICByZXR1cm4gdGhpcy5fbW92ZUJsb2NrKHRhcmdldCwgYWZ0ZXIpXG4gIH1cbiAgcmV0dXJuIHRoaXMuX21vdmVFbGVtZW50KHRhcmdldCwgYWZ0ZXIpXG59XG5cbi8qKlxuICogTW92ZSBlbGVtZW50IGJlZm9yZSBhIGNlcnRhaW4gZWxlbWVudC5cbiAqXG4gKiBAcGFyYW0gIHtvYmplY3R9IGVsZW1lbnRcbiAqIEBwYXJhbSAge29iamVjdH0gYmVmb3JlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfbW92ZUVsZW1lbnQgKGVsZW1lbnQsIGFmdGVyKSB7XG4gIGNvbnN0IHBhcmVudCA9IGFmdGVyLnBhcmVudE5vZGVcbiAgaWYgKHBhcmVudCkge1xuICAgIHJldHVybiBwYXJlbnQuaW5zZXJ0QWZ0ZXIoZWxlbWVudCwgYWZ0ZXIpXG4gIH1cbn1cblxuLyoqXG4gKiBNb3ZlIGFsbCBlbGVtZW50cyBvZiB0aGUgYmxvY2sgYmVmb3JlIGEgY2VydGFpbiBlbGVtZW50LlxuICpcbiAqIEBwYXJhbSAge29iamVjdH0gZnJhZ0Jsb2NrXG4gKiBAcGFyYW0gIHtvYmplY3R9IGJlZm9yZVxuICovXG5leHBvcnQgZnVuY3Rpb24gX21vdmVCbG9jayAoZnJhZ0Jsb2NrLCBhZnRlcikge1xuICBjb25zdCBwYXJlbnQgPSBhZnRlci5wYXJlbnROb2RlXG5cbiAgaWYgKHBhcmVudCkge1xuICAgIGxldCBlbCA9IGZyYWdCbG9jay5zdGFydFxuICAgIGxldCBzaWduYWxcbiAgICBjb25zdCBncm91cCA9IFtlbF1cblxuICAgIHdoaWxlIChlbCAmJiBlbCAhPT0gZnJhZ0Jsb2NrLmVuZCkge1xuICAgICAgZWwgPSBlbC5uZXh0U2libGluZ1xuICAgICAgZ3JvdXAucHVzaChlbClcbiAgICB9XG5cbiAgICBsZXQgdGVtcCA9IGFmdGVyXG4gICAgZ3JvdXAuZXZlcnkoKGVsKSA9PiB7XG4gICAgICBzaWduYWwgPSBwYXJlbnQuaW5zZXJ0QWZ0ZXIoZWwsIHRlbXApXG4gICAgICB0ZW1wID0gZWxcbiAgICAgIHJldHVybiBzaWduYWwgIT09IC0xXG4gICAgfSlcblxuICAgIHJldHVybiBzaWduYWxcbiAgfVxufVxuXG4vKipcbiAqIFJlbW92ZSB0YXJnZXQgZnJvbSBET00gdHJlZS5cbiAqIElmIHRoZSB0YXJnZXQgaXMgYSBmcmFnIGJsb2NrIHRoZW4gY2FsbCBfcmVtb3ZlQmxvY2tcbiAqXG4gKiBAcGFyYW0gIHtvYmplY3R9IHRhcmdldFxuICovXG5leHBvcnQgZnVuY3Rpb24gX3JlbW92ZVRhcmdldCAodGFyZ2V0KSB7XG4gIGlmICh0YXJnZXQuZWxlbWVudCkge1xuICAgIHRoaXMuX3JlbW92ZUJsb2NrKHRhcmdldClcbiAgfVxuICBlbHNlIHtcbiAgICB0aGlzLl9yZW1vdmVFbGVtZW50KHRhcmdldClcbiAgfVxufVxuXG4vKipcbiAqIFJlbW92ZSBhIGNlcnRhaW4gZWxlbWVudC5cbiAqIFVzaW5nIHRoaXMuX2FwcC5kb2NcbiAqXG4gKiBAcGFyYW0gIHtvYmplY3R9IHRhcmdldFxuICovXG5leHBvcnQgZnVuY3Rpb24gX3JlbW92ZUVsZW1lbnQgKHRhcmdldCkge1xuICBjb25zdCBwYXJlbnQgPSB0YXJnZXQucGFyZW50Tm9kZVxuXG4gIGlmIChwYXJlbnQpIHtcbiAgICBwYXJlbnQucmVtb3ZlQ2hpbGQodGFyZ2V0KVxuICB9XG59XG5cbi8qKlxuICogUmVtb3ZlIGEgZnJhZyBibG9jay5cbiAqIFRoZSBzZWNvbmQgcGFyYW0gZGVjaWRlcyB3aGV0aGVyIHRoZSBibG9jayBzZWxmIHNob3VsZCBiZSByZW1vdmVkIHRvby5cbiAqXG4gKiBAcGFyYW0gIHtvYmplY3R9ICBmcmFnQmxvY2tcbiAqIEBwYXJhbSAge0Jvb2xlYW59IHByZXNlcnZlQmxvY2s9ZmFsc2VcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9yZW1vdmVCbG9jayAoZnJhZ0Jsb2NrLCBwcmVzZXJ2ZUJsb2NrID0gZmFsc2UpIHtcbiAgY29uc3QgcmVzdWx0ID0gW11cbiAgbGV0IGVsID0gZnJhZ0Jsb2NrLnN0YXJ0Lm5leHRTaWJsaW5nXG5cbiAgd2hpbGUgKGVsICYmIGVsICE9PSBmcmFnQmxvY2suZW5kKSB7XG4gICAgcmVzdWx0LnB1c2goZWwpXG4gICAgZWwgPSBlbC5uZXh0U2libGluZ1xuICB9XG5cbiAgaWYgKCFwcmVzZXJ2ZUJsb2NrKSB7XG4gICAgdGhpcy5fcmVtb3ZlRWxlbWVudChmcmFnQmxvY2suc3RhcnQpXG4gIH1cbiAgcmVzdWx0LmZvckVhY2goKGVsKSA9PiB7XG4gICAgdGhpcy5fcmVtb3ZlRWxlbWVudChlbClcbiAgfSlcbiAgaWYgKCFwcmVzZXJ2ZUJsb2NrKSB7XG4gICAgdGhpcy5fcmVtb3ZlRWxlbWVudChmcmFnQmxvY2suZW5kKVxuICB9XG59XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vaHRtbDUvZGVmYXVsdC92bS9kb20taGVscGVyLmpzXG4gKiovIiwiZnVuY3Rpb24gRXZ0ICh0eXBlLCBkZXRhaWwpIHtcbiAgaWYgKGRldGFpbCBpbnN0YW5jZW9mIEV2dCkge1xuICAgIHJldHVybiBkZXRhaWxcbiAgfVxuXG4gIHRoaXMudGltZXN0YW1wID0gRGF0ZS5ub3coKVxuICB0aGlzLmRldGFpbCA9IGRldGFpbFxuICB0aGlzLnR5cGUgPSB0eXBlXG5cbiAgbGV0IHNob3VsZFN0b3AgPSBmYWxzZVxuICB0aGlzLnN0b3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgc2hvdWxkU3RvcCA9IHRydWVcbiAgfVxuICB0aGlzLmhhc1N0b3BwZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHNob3VsZFN0b3BcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gJGVtaXQgKHR5cGUsIGRldGFpbCkge1xuICBjb25zdCBldmVudHMgPSB0aGlzLl92bUV2ZW50c1xuICBjb25zdCBoYW5kbGVyTGlzdCA9IGV2ZW50c1t0eXBlXVxuICBpZiAoaGFuZGxlckxpc3QpIHtcbiAgICBjb25zdCBldnQgPSBuZXcgRXZ0KHR5cGUsIGRldGFpbClcbiAgICBoYW5kbGVyTGlzdC5mb3JFYWNoKChoYW5kbGVyKSA9PiB7XG4gICAgICBoYW5kbGVyLmNhbGwodGhpcywgZXZ0KVxuICAgIH0pXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uICRkaXNwYXRjaCAodHlwZSwgZGV0YWlsKSB7XG4gIGNvbnN0IGV2dCA9IG5ldyBFdnQodHlwZSwgZGV0YWlsKVxuICB0aGlzLiRlbWl0KHR5cGUsIGV2dClcblxuICBpZiAoIWV2dC5oYXNTdG9wcGVkKCkgJiYgdGhpcy5fcGFyZW50ICYmIHRoaXMuX3BhcmVudC4kZGlzcGF0Y2gpIHtcbiAgICB0aGlzLl9wYXJlbnQuJGRpc3BhdGNoKHR5cGUsIGV2dClcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gJGJyb2FkY2FzdCAodHlwZSwgZGV0YWlsKSB7XG4gIGNvbnN0IGV2dCA9IG5ldyBFdnQodHlwZSwgZGV0YWlsKVxuICB0aGlzLiRlbWl0KHR5cGUsIGV2dClcblxuICBpZiAoIWV2dC5oYXNTdG9wcGVkKCkgJiYgdGhpcy5fY2hpbGRyZW5WbXMpIHtcbiAgICB0aGlzLl9jaGlsZHJlblZtcy5mb3JFYWNoKChzdWJWbSkgPT4ge1xuICAgICAgc3ViVm0uJGJyb2FkY2FzdCh0eXBlLCBldnQpXG4gICAgfSlcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gJG9uICh0eXBlLCBoYW5kbGVyKSB7XG4gIGlmICghdHlwZSB8fCB0eXBlb2YgaGFuZGxlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVyblxuICB9XG4gIGNvbnN0IGV2ZW50cyA9IHRoaXMuX3ZtRXZlbnRzXG4gIGNvbnN0IGhhbmRsZXJMaXN0ID0gZXZlbnRzW3R5cGVdIHx8IFtdXG4gIGhhbmRsZXJMaXN0LnB1c2goaGFuZGxlcilcbiAgZXZlbnRzW3R5cGVdID0gaGFuZGxlckxpc3RcblxuICAvLyBmaXhlZCBvbGQgdmVyc2lvbiBsaWZlY3ljbGUgZGVzaWduXG4gIGlmICh0eXBlID09PSAnaG9vazpyZWFkeScgJiYgdGhpcy5fcmVhZHkpIHtcbiAgICB0aGlzLiRlbWl0KCdob29rOnJlYWR5JylcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gJG9mZiAodHlwZSwgaGFuZGxlcikge1xuICBpZiAoIXR5cGUpIHtcbiAgICByZXR1cm5cbiAgfVxuICBjb25zdCBldmVudHMgPSB0aGlzLl92bUV2ZW50c1xuICBpZiAoIWhhbmRsZXIpIHtcbiAgICBkZWxldGUgZXZlbnRzW3R5cGVdXG4gICAgcmV0dXJuXG4gIH1cbiAgY29uc3QgaGFuZGxlckxpc3QgPSBldmVudHNbdHlwZV1cbiAgaWYgKCFoYW5kbGVyTGlzdCkge1xuICAgIHJldHVyblxuICB9XG4gIGhhbmRsZXJMaXN0LiRyZW1vdmUoaGFuZGxlcilcbn1cblxuY29uc3QgTElGRV9DWUNMRV9UWVBFUyA9IFsnaW5pdCcsICdjcmVhdGVkJywgJ3JlYWR5J11cblxuZXhwb3J0IGZ1bmN0aW9uIF9pbml0RXZlbnRzIChleHRlcm5hbEV2ZW50cykge1xuICBjb25zdCBvcHRpb25zID0gdGhpcy5fb3B0aW9ucyB8fCB7fVxuICBjb25zdCBldmVudHMgPSBvcHRpb25zLmV2ZW50cyB8fCB7fVxuICBmb3IgKGNvbnN0IHR5cGUxIGluIGV2ZW50cykge1xuICAgIHRoaXMuJG9uKHR5cGUxLCBldmVudHNbdHlwZTFdKVxuICB9XG4gIGZvciAoY29uc3QgdHlwZTIgaW4gZXh0ZXJuYWxFdmVudHMpIHtcbiAgICB0aGlzLiRvbih0eXBlMiwgZXh0ZXJuYWxFdmVudHNbdHlwZTJdKVxuICB9XG4gIExJRkVfQ1lDTEVfVFlQRVMuZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgIHRoaXMuJG9uKGBob29rOiR7dHlwZX1gLCBvcHRpb25zW3R5cGVdKVxuICB9KVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9odG1sNS9kZWZhdWx0L3ZtL2V2ZW50cy5qc1xuICoqLyIsImxldCBuYXRpdmVNb2R1bGVzID0ge31cblxuZnVuY3Rpb24gYXNzaWduTW9kdWxlcyAobW9kdWxlcywgaWZSZXBsYWNlKSB7XG4gIGZvciAoY29uc3QgbW9kdWxlTmFtZSBpbiBtb2R1bGVzKSB7XG4gICAgLy8gaW5pdCBgbW9kdWxlc1ttb2R1bGVOYW1lXVtdYFxuICAgIGxldCBtZXRob2RzID0gbmF0aXZlTW9kdWxlc1ttb2R1bGVOYW1lXVxuICAgIGlmICghbWV0aG9kcykge1xuICAgICAgbWV0aG9kcyA9IHt9XG4gICAgICBuYXRpdmVNb2R1bGVzW21vZHVsZU5hbWVdID0gbWV0aG9kc1xuICAgIH1cblxuICAgIC8vIHB1c2ggZWFjaCBub24tZXhpc3RlZCBuZXcgbWV0aG9kXG4gICAgbW9kdWxlc1ttb2R1bGVOYW1lXS5mb3JFYWNoKGZ1bmN0aW9uIChtZXRob2QpIHtcbiAgICAgIGlmICh0eXBlb2YgbWV0aG9kID09PSAnc3RyaW5nJykge1xuICAgICAgICBtZXRob2QgPSB7XG4gICAgICAgICAgbmFtZTogbWV0aG9kXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCFtZXRob2RzW21ldGhvZC5uYW1lXSB8fCBpZlJlcGxhY2UpIHtcbiAgICAgICAgbWV0aG9kc1ttZXRob2QubmFtZV0gPSBtZXRob2RcbiAgICAgIH1cbiAgICB9KVxuICB9XG59XG5cbmZ1bmN0aW9uIGFzc2lnbkFwaXMgKEN0b3IsIGFwaXMpIHtcbiAgY29uc3QgcCA9IEN0b3IucHJvdG90eXBlXG5cbiAgZm9yIChjb25zdCBhcGlOYW1lIGluIGFwaXMpIHtcbiAgICBpZiAoIXAuaGFzT3duUHJvcGVydHkoYXBpTmFtZSkpIHtcbiAgICAgIHBbYXBpTmFtZV0gPSBhcGlzW2FwaU5hbWVdXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGVhck1vZHVsZXMgKCkge1xuICBuYXRpdmVNb2R1bGVzID0ge31cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldE1vZHVsZSAobW9kdWxlTmFtZSkge1xuICByZXR1cm4gbmF0aXZlTW9kdWxlc1ttb2R1bGVOYW1lXVxufVxuXG4vKipcbiAqIEBjb250ZXh0IGEgaW5zdGFuY2Ugb2YgQXBwSW5zdGFuY2VcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlcXVpcmVNb2R1bGUgKG1vZHVsZU5hbWUpIHtcbiAgY29uc3QgbWV0aG9kcyA9IG5hdGl2ZU1vZHVsZXNbbW9kdWxlTmFtZV1cbiAgY29uc3QgdGFyZ2V0ID0ge31cblxuICBmb3IgKGNvbnN0IG1ldGhvZE5hbWUgaW4gbWV0aG9kcykge1xuICAgIHRhcmdldFttZXRob2ROYW1lXSA9ICguLi5hcmdzKSA9PiB0aGlzLmNhbGxUYXNrcyh7XG4gICAgICBtb2R1bGU6IG1vZHVsZU5hbWUsXG4gICAgICBtZXRob2Q6IG1ldGhvZE5hbWUsXG4gICAgICBhcmdzOiBhcmdzXG4gICAgfSlcbiAgfVxuXG4gIHJldHVybiB0YXJnZXRcbn1cblxuLyoqXG4gKiBAY29udGV4dCBWbVxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJNb2R1bGVzIChtb2R1bGVzLCBpZlJlcGxhY2UpIHtcbiAgYXNzaWduTW9kdWxlcyhtb2R1bGVzLCBpZlJlcGxhY2UpXG59XG5cbi8qKlxuICogQGNvbnRleHQgVm1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyTWV0aG9kcyAoYXBpcykge1xuICBhc3NpZ25BcGlzKHRoaXMsIGFwaXMpXG59XG5cbi8qKlxuICogQGNvbnRleHQgYSBpbnN0YW5jZSBvZiBBcHBJbnN0YW5jZVxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVxdWlyZUNvbXBvbmVudCAobmFtZSkge1xuICBjb25zdCB7IGN1c3RvbUNvbXBvbmVudE1hcCB9ID0gdGhpc1xuICByZXR1cm4gY3VzdG9tQ29tcG9uZW50TWFwW25hbWVdXG59XG5cbi8qKlxuICogQGNvbnRleHQgYSBpbnN0YW5jZSBvZiBBcHBJbnN0YW5jZVxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJDb21wb25lbnQgKG5hbWUsIGV4cG9ydHMpIHtcbiAgY29uc3QgeyBjdXN0b21Db21wb25lbnRNYXAgfSA9IHRoaXNcblxuICBpZiAoY3VzdG9tQ29tcG9uZW50TWFwW25hbWVdKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBkZWZpbmUgYSBjb21wb25lbnQoJHtuYW1lfSkgdGhhdCBhbHJlYWR5IGV4aXN0c2ApXG4gIH1cblxuICBjdXN0b21Db21wb25lbnRNYXBbbmFtZV0gPSBleHBvcnRzXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2h0bWw1L2RlZmF1bHQvYXBwL3JlZ2lzdGVyLmpzXG4gKiovIiwiaW1wb3J0IHNlbXZlciBmcm9tICdzZW12ZXInXG5pbXBvcnQgeyBpc1BsYWluT2JqZWN0LCB0eXBvZiB9IGZyb20gJy4uL3V0aWwnXG5cbi8qKlxuICogW25vcm1hbGl6ZVZlcnNpb24gZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtTdHJpbmd9IFZlcnNpb24uIGllOiAxLCAxLjAsIDEuMC4wXG4gKiBAcmV0dXJuIHtTdHJpbmd9IFZlcnNpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZVZlcnNpb24gKHYpIHtcbiAgY29uc3QgaXNWYWxpZCA9IHNlbXZlci52YWxpZCh2KVxuICBpZiAoaXNWYWxpZCkge1xuICAgIHJldHVybiB2XG4gIH1cblxuICB2ID0gdHlwZW9mICh2KSA9PT0gJ3N0cmluZycgPyB2IDogJydcbiAgY29uc3Qgc3BsaXQgPSB2LnNwbGl0KCcuJylcbiAgbGV0IGkgPSAwXG4gIGNvbnN0IHJlc3VsdCA9IFtdXG5cbiAgd2hpbGUgKGkgPCAzKSB7XG4gICAgY29uc3QgcyA9IHR5cGVvZiAoc3BsaXRbaV0pID09PSAnc3RyaW5nJyAmJiBzcGxpdFtpXSA/IHNwbGl0W2ldIDogJzAnXG4gICAgcmVzdWx0LnB1c2gocylcbiAgICBpKytcbiAgfVxuXG4gIHJldHVybiByZXN1bHQuam9pbignLicpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRFcnJvciAoa2V5LCB2YWwsIGNyaXRlcmlhKSB7XG4gIGNvbnN0IHJlc3VsdCA9IHtcbiAgICBpc0Rvd25ncmFkZTogdHJ1ZSxcbiAgICBlcnJvclR5cGU6IDEsXG4gICAgY29kZTogMTAwMFxuICB9XG4gIGNvbnN0IGdldE1zZyA9IGZ1bmN0aW9uIChrZXksIHZhbCwgY3JpdGVyaWEpIHtcbiAgICByZXR1cm4gJ0Rvd25ncmFkZVsnICsga2V5ICsgJ10gOjogZGV2aWNlSW5mbyAnXG4gICAgICArIHZhbCArICcgbWF0Y2hlZCBjcml0ZXJpYSAnICsgY3JpdGVyaWFcbiAgfVxuICBjb25zdCBfa2V5ID0ga2V5LnRvTG93ZXJDYXNlKClcblxuICByZXN1bHQuZXJyb3JNZXNzYWdlID0gZ2V0TXNnKGtleSwgdmFsLCBjcml0ZXJpYSlcblxuICBpZiAoX2tleS5pbmRleE9mKCdvc3ZlcnNpb24nKSA+PSAwKSB7XG4gICAgcmVzdWx0LmNvZGUgPSAxMDAxXG4gIH1cbiAgZWxzZSBpZiAoX2tleS5pbmRleE9mKCdhcHB2ZXJzaW9uJykgPj0gMCkge1xuICAgIHJlc3VsdC5jb2RlID0gMTAwMlxuICB9XG4gIGVsc2UgaWYgKF9rZXkuaW5kZXhPZignd2VleHZlcnNpb24nKSA+PSAwKSB7XG4gICAgcmVzdWx0LmNvZGUgPSAxMDAzXG4gIH1cbiAgZWxzZSBpZiAoX2tleS5pbmRleE9mKCdkZXZpY2Vtb2RlbCcpID49IDApIHtcbiAgICByZXN1bHQuY29kZSA9IDEwMDRcbiAgfVxuXG4gIHJldHVybiByZXN1bHRcbn1cblxuLyoqXG4gKiBXRUVYIGZyYW1ld29yayBpbnB1dChkZXZpY2VJbmZvKVxuICoge1xuICogICBwbGF0Zm9ybTogJ2lPUycgb3IgJ2FuZHJvaWQnXG4gKiAgIG9zVmVyc2lvbjogJzEuMC4wJyBvciAnMS4wJyBvciAnMSdcbiAqICAgYXBwVmVyc2lvbjogJzEuMC4wJyBvciAnMS4wJyBvciAnMSdcbiAqICAgd2VleFZlcnNpb246ICcxLjAuMCcgb3IgJzEuMCcgb3IgJzEnXG4gKiAgIGREZXZpY2VNb2RlbDogJ01PREVMX05BTUUnXG4gKiB9XG4gKlxuICogZG93bmdyYWRlIGNvbmZpZyhjb25maWcpXG4gKiB7XG4gKiAgIGlvczoge1xuICogICAgIG9zVmVyc2lvbjogJz4xLjAuMCcgb3IgJz49MS4wLjAnIG9yICc8MS4wLjAnIG9yICc8PTEuMC4wJyBvciAnMS4wLjAnXG4gKiAgICAgYXBwVmVyc2lvbjogJz4xLjAuMCcgb3IgJz49MS4wLjAnIG9yICc8MS4wLjAnIG9yICc8PTEuMC4wJyBvciAnMS4wLjAnXG4gKiAgICAgd2VleFZlcnNpb246ICc+MS4wLjAnIG9yICc+PTEuMC4wJyBvciAnPDEuMC4wJyBvciAnPD0xLjAuMCcgb3IgJzEuMC4wJ1xuICogICAgIGRldmljZU1vZGVsOiBbJ21vZGVsQScsICdtb2RlbEInLCAuLi5dXG4gKiAgIH0sXG4gKiAgIGFuZHJvaWQ6IHtcbiAqICAgICBvc1ZlcnNpb246ICc+MS4wLjAnIG9yICc+PTEuMC4wJyBvciAnPDEuMC4wJyBvciAnPD0xLjAuMCcgb3IgJzEuMC4wJ1xuICogICAgIGFwcFZlcnNpb246ICc+MS4wLjAnIG9yICc+PTEuMC4wJyBvciAnPDEuMC4wJyBvciAnPD0xLjAuMCcgb3IgJzEuMC4wJ1xuICogICAgIHdlZXhWZXJzaW9uOiAnPjEuMC4wJyBvciAnPj0xLjAuMCcgb3IgJzwxLjAuMCcgb3IgJzw9MS4wLjAnIG9yICcxLjAuMCdcbiAqICAgICBkZXZpY2VNb2RlbDogWydtb2RlbEEnLCAnbW9kZWxCJywgLi4uXVxuICogICB9XG4gKiB9XG4gKlxuICpcbiAqIEBwYXJhbSAge29iamVjdH0gZGV2aWNlSW5mbyBXZWV4IFNESyBmcmFtZXdvcmsgaW5wdXRcbiAqIEBwYXJhbSAge29iamVjdH0gY29uZmlnICAgICB1c2VyIGlucHV0XG4gKiBAcmV0dXJuIHtPYmplY3R9ICAgICAgICAgICAgeyBpc0Rvd25ncmFkZTogdHJ1ZS9mYWxzZSwgZXJyb3JNZXNzYWdlLi4uIH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrIChjb25maWcsIGRldmljZUluZm8pIHtcbiAgZGV2aWNlSW5mbyA9IGRldmljZUluZm8gfHwgZ2xvYmFsLldYRW52aXJvbm1lbnRcbiAgZGV2aWNlSW5mbyA9IGlzUGxhaW5PYmplY3QoZGV2aWNlSW5mbykgPyBkZXZpY2VJbmZvIDoge31cblxuICBsZXQgcmVzdWx0ID0ge1xuICAgIGlzRG93bmdyYWRlOiBmYWxzZSAvLyBkZWZhdXRsIGlzIHBhc3NcbiAgfVxuXG4gIGlmICh0eXBvZihjb25maWcpID09PSAnZnVuY3Rpb24nKSB7XG4gICAgbGV0IGN1c3RvbURvd25ncmFkZSA9IGNvbmZpZy5jYWxsKHRoaXMsIGRldmljZUluZm8sIHtcbiAgICAgIHNlbXZlcjogc2VtdmVyLFxuICAgICAgbm9ybWFsaXplVmVyc2lvbjogdGhpcy5ub3JtYWxpemVWZXJzaW9uXG4gICAgfSlcblxuICAgIGN1c3RvbURvd25ncmFkZSA9ICEhY3VzdG9tRG93bmdyYWRlXG5cbiAgICByZXN1bHQgPSBjdXN0b21Eb3duZ3JhZGUgPyB0aGlzLmdldEVycm9yKCdjdXN0b20nLCAnJywgJ2N1c3RvbSBwYXJhbXMnKSA6IHJlc3VsdFxuICB9XG4gIGVsc2Uge1xuICAgIGNvbmZpZyA9IGlzUGxhaW5PYmplY3QoY29uZmlnKSA/IGNvbmZpZyA6IHt9XG5cbiAgICBjb25zdCBwbGF0Zm9ybSA9IGRldmljZUluZm8ucGxhdGZvcm0gfHwgJ3Vua25vdydcbiAgICBjb25zdCBkUGxhdGZvcm0gPSBwbGF0Zm9ybS50b0xvd2VyQ2FzZSgpXG4gICAgY29uc3QgY09iaiA9IGNvbmZpZ1tkUGxhdGZvcm1dIHx8IHt9XG5cbiAgICBmb3IgKGNvbnN0IGkgaW4gZGV2aWNlSW5mbykge1xuICAgICAgY29uc3Qga2V5ID0gaVxuICAgICAgY29uc3Qga2V5TG93ZXIgPSBrZXkudG9Mb3dlckNhc2UoKVxuICAgICAgY29uc3QgdmFsID0gZGV2aWNlSW5mb1tpXVxuICAgICAgY29uc3QgaXNWZXJzaW9uID0ga2V5TG93ZXIuaW5kZXhPZigndmVyc2lvbicpID49IDBcbiAgICAgIGNvbnN0IGlzRGV2aWNlTW9kZWwgPSBrZXlMb3dlci5pbmRleE9mKCdkZXZpY2Vtb2RlbCcpID49IDBcbiAgICAgIGNvbnN0IGNyaXRlcmlhID0gY09ialtpXVxuXG4gICAgICBpZiAoY3JpdGVyaWEgJiYgaXNWZXJzaW9uKSB7XG4gICAgICAgIGNvbnN0IGMgPSB0aGlzLm5vcm1hbGl6ZVZlcnNpb24oY3JpdGVyaWEpXG4gICAgICAgIGNvbnN0IGQgPSB0aGlzLm5vcm1hbGl6ZVZlcnNpb24oZGV2aWNlSW5mb1tpXSlcblxuICAgICAgICBpZiAoc2VtdmVyLnNhdGlzZmllcyhkLCBjKSkge1xuICAgICAgICAgIHJlc3VsdCA9IHRoaXMuZ2V0RXJyb3Ioa2V5LCB2YWwsIGNyaXRlcmlhKVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGlzRGV2aWNlTW9kZWwpIHtcbiAgICAgICAgY29uc3QgX2NyaXRlcmlhID0gdHlwb2YoY3JpdGVyaWEpID09PSAnYXJyYXknID8gY3JpdGVyaWEgOiBbY3JpdGVyaWFdXG4gICAgICAgIGlmIChfY3JpdGVyaWEuaW5kZXhPZih2YWwpID49IDApIHtcbiAgICAgICAgICByZXN1bHQgPSB0aGlzLmdldEVycm9yKGtleSwgdmFsLCBjcml0ZXJpYSlcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9odG1sNS9kZWZhdWx0L2FwcC9kb3duZ3JhZGUuanNcbiAqKi8iLCIvKipcbiAqIEBmaWxlT3ZlcnZpZXdcbiAqIGluc3RhbmNlIGNvbnRyb2xzIGZyb20gbmF0aXZlXG4gKlxuICogLSBpbml0IGJ1bmRsZVxuICogLSBmaXJlIGV2ZW50XG4gKiAtIGNhbGxiYWNrXG4gKiAtIGRlc3Ryb3lcbiAqXG4gKiBjb3JyZXNwb25kZWQgd2l0aCB0aGUgQVBJIG9mIGluc3RhbmNlIG1hbmFnZXIgKGZyYW1ld29yay5qcylcbiAqL1xuXG5pbXBvcnQgKiBhcyBfIGZyb20gJy4uL3V0aWwnXG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVBY3Rpb25zICgpIHtcbiAgdGhpcy5kaWZmZXIuZmx1c2goKVxuICBjb25zdCB0YXNrcyA9IFtdXG4gIGlmICh0aGlzLmRvYyAmJiB0aGlzLmRvYy5saXN0ZW5lciAmJiB0aGlzLmRvYy5saXN0ZW5lci51cGRhdGVzLmxlbmd0aCkge1xuICAgIHRhc2tzLnB1c2goLi4udGhpcy5kb2MubGlzdGVuZXIudXBkYXRlcylcbiAgICB0aGlzLmRvYy5saXN0ZW5lci51cGRhdGVzID0gW11cbiAgfVxuICBpZiAodGFza3MubGVuZ3RoKSB7XG4gICAgcmV0dXJuIHRoaXMuY2FsbFRhc2tzKHRhc2tzKVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0IChjb2RlLCBkYXRhKSB7XG4gIF8uZGVidWcoJ0ludGlhbGl6ZSBhbiBpbnN0YW5jZSB3aXRoOlxcbicsIGNvZGUsIGRhdGEpXG5cbiAgbGV0IHJlc3VsdFxuICAvLyBAc2VlOiBsaWIvYXBwL2J1bmRsZS5qc1xuICBjb25zdCBkZWZpbmUgPSBfLmJpbmQodGhpcy5kZWZpbmUsIHRoaXMpXG4gIGNvbnN0IGJvb3RzdHJhcCA9IChuYW1lLCBjb25maWcsIF9kYXRhKSA9PiB7XG4gICAgcmVzdWx0ID0gdGhpcy5ib290c3RyYXAobmFtZSwgY29uZmlnLCBfZGF0YSB8fCBkYXRhKVxuICAgIHRoaXMudXBkYXRlQWN0aW9ucygpXG4gICAgdGhpcy5kb2MubGlzdGVuZXIuY3JlYXRlRmluaXNoKClcbiAgICBfLmRlYnVnKGBBZnRlciBpbnRpYWxpemVkIGFuIGluc3RhbmNlKCR7dGhpcy5pZH0pYClcbiAgfVxuXG4gIC8vIGJhY2t3YXJkKHJlZ2lzdGVyL3JlbmRlcilcbiAgY29uc3QgcmVnaXN0ZXIgPSBfLmJpbmQodGhpcy5yZWdpc3RlciwgdGhpcylcbiAgY29uc3QgcmVuZGVyID0gKG5hbWUsIF9kYXRhKSA9PiB7XG4gICAgcmVzdWx0ID0gdGhpcy5ib290c3RyYXAobmFtZSwge30sIF9kYXRhKVxuICB9XG5cbiAgY29uc3QgcmVxdWlyZSA9IG5hbWUgPT4gX2RhdGEgPT4ge1xuICAgIHJlc3VsdCA9IHRoaXMuYm9vdHN0cmFwKG5hbWUsIHt9LCBfZGF0YSlcbiAgfVxuXG4gIGNvbnN0IGRvY3VtZW50ID0gdGhpcy5kb2NcblxuICBsZXQgZnVuY3Rpb25Cb2R5XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICBpZiAodHlwZW9mIGNvZGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAvLyBgZnVuY3Rpb24gKCkgey4uLn1gIC0+IGB7Li4ufWBcbiAgICAvLyBub3QgdmVyeSBzdHJpY3RcbiAgICBmdW5jdGlvbkJvZHkgPSBjb2RlLnRvU3RyaW5nKCkuc3Vic3RyKDEyKVxuICB9XG4gIGVsc2UgaWYgKGNvZGUpIHtcbiAgICBmdW5jdGlvbkJvZHkgPSBjb2RlLnRvU3RyaW5nKClcbiAgfVxuXG4gIGNvbnN0IHsgV1hFbnZpcm9ubWVudCB9ID0gZ2xvYmFsXG4gIGlmIChXWEVudmlyb25tZW50ICYmIFdYRW52aXJvbm1lbnQucGxhdGZvcm0gIT09ICdXZWInKSB7XG4gICAgY29uc3QgdGltZXIgPSB0aGlzLnJlcXVpcmVNb2R1bGUoJ3RpbWVyJylcbiAgICBjb25zdCB0aW1lckFQSXMgPSB7XG4gICAgICBzZXRUaW1lb3V0OiAoLi4uYXJncykgPT4ge1xuICAgICAgICBjb25zdCBoYW5kbGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGFyZ3NbMF0oLi4uYXJncy5zbGljZSgyKSlcbiAgICAgICAgfVxuICAgICAgICB0aW1lci5zZXRUaW1lb3V0KGhhbmRsZXIsIGFyZ3NbMV0pXG4gICAgICAgIHJldHVybiB0aGlzLnVpZC50b1N0cmluZygpXG4gICAgICB9LFxuICAgICAgc2V0SW50ZXJ2YWw6ICguLi5hcmdzKSA9PiB7XG4gICAgICAgIGNvbnN0IGhhbmRsZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgYXJnc1swXSguLi5hcmdzLnNsaWNlKDIpKVxuICAgICAgICB9XG4gICAgICAgIHRpbWVyLnNldEludGVydmFsKGhhbmRsZXIsIGFyZ3NbMV0pXG4gICAgICAgIHJldHVybiB0aGlzLnVpZC50b1N0cmluZygpXG4gICAgICB9LFxuICAgICAgY2xlYXJUaW1lb3V0OiAobikgPT4ge1xuICAgICAgICB0aW1lci5jbGVhclRpbWVvdXQobilcbiAgICAgIH0sXG4gICAgICBjbGVhckludGVydmFsOiAobikgPT4ge1xuICAgICAgICB0aW1lci5jbGVhckludGVydmFsKG4pXG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgZm4gPSBuZXcgRnVuY3Rpb24oXG4gICAgICAnZGVmaW5lJyxcbiAgICAgICdyZXF1aXJlJyxcbiAgICAgICdkb2N1bWVudCcsXG4gICAgICAnYm9vdHN0cmFwJyxcbiAgICAgICdyZWdpc3RlcicsXG4gICAgICAncmVuZGVyJyxcbiAgICAgICdfX3dlZXhfZGVmaW5lX18nLCAvLyBhbGlhcyBmb3IgZGVmaW5lXG4gICAgICAnX193ZWV4X2Jvb3RzdHJhcF9fJywgLy8gYWxpYXMgZm9yIGJvb3RzdHJhcFxuICAgICAgJ3NldFRpbWVvdXQnLFxuICAgICAgJ3NldEludGVydmFsJyxcbiAgICAgICdjbGVhclRpbWVvdXQnLFxuICAgICAgJ2NsZWFySW50ZXJ2YWwnLFxuICAgICAgZnVuY3Rpb25Cb2R5XG4gICAgKVxuXG4gICAgZm4oXG4gICAgICBkZWZpbmUsXG4gICAgICByZXF1aXJlLFxuICAgICAgZG9jdW1lbnQsXG4gICAgICBib290c3RyYXAsXG4gICAgICByZWdpc3RlcixcbiAgICAgIHJlbmRlcixcbiAgICAgIGRlZmluZSxcbiAgICAgIGJvb3RzdHJhcCxcbiAgICAgIHRpbWVyQVBJcy5zZXRUaW1lb3V0LFxuICAgICAgdGltZXJBUElzLnNldEludGVydmFsLFxuICAgICAgdGltZXJBUElzLmNsZWFyVGltZW91dCxcbiAgICAgIHRpbWVyQVBJcy5jbGVhckludGVydmFsKVxuICB9XG4gIGVsc2Uge1xuICAgIGNvbnN0IGZuID0gbmV3IEZ1bmN0aW9uKFxuICAgICAgJ2RlZmluZScsXG4gICAgICAncmVxdWlyZScsXG4gICAgICAnZG9jdW1lbnQnLFxuICAgICAgJ2Jvb3RzdHJhcCcsXG4gICAgICAncmVnaXN0ZXInLFxuICAgICAgJ3JlbmRlcicsXG4gICAgICAnX193ZWV4X2RlZmluZV9fJywgLy8gYWxpYXMgZm9yIGRlZmluZVxuICAgICAgJ19fd2VleF9ib290c3RyYXBfXycsIC8vIGFsaWFzIGZvciBib290c3RyYXBcbiAgICAgIGZ1bmN0aW9uQm9keVxuICAgIClcblxuICAgIGZuKFxuICAgICAgZGVmaW5lLFxuICAgICAgcmVxdWlyZSxcbiAgICAgIGRvY3VtZW50LFxuICAgICAgYm9vdHN0cmFwLFxuICAgICAgcmVnaXN0ZXIsXG4gICAgICByZW5kZXIsXG4gICAgICBkZWZpbmUsXG4gICAgICBib290c3RyYXApXG4gIH1cblxuICByZXR1cm4gcmVzdWx0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXN0cm95ICgpIHtcbiAgXy5kZWJ1ZyhgRGVzdG9yeSBhbiBpbnN0YW5jZSgke3RoaXMuaWR9KWApXG5cbiAgdGhpcy5pZCA9ICcnXG4gIHRoaXMub3B0aW9ucyA9IG51bGxcbiAgdGhpcy5ibG9ja3MgPSBudWxsXG4gIHRoaXMudm0gPSBudWxsXG4gIHRoaXMuZG9jID0gbnVsbFxuICB0aGlzLmN1c3RvbUNvbXBvbmVudE1hcCA9IG51bGxcbiAgdGhpcy5jYWxsYmFja3MgPSBudWxsXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRSb290RWxlbWVudCAoKSB7XG4gIGNvbnN0IGRvYyA9IHRoaXMuZG9jIHx8IHt9XG4gIGNvbnN0IGJvZHkgPSBkb2MuYm9keSB8fCB7fVxuICByZXR1cm4gYm9keS50b0pTT04gPyBib2R5LnRvSlNPTigpIDoge31cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpcmVFdmVudCAocmVmLCB0eXBlLCBlLCBkb21DaGFuZ2VzKSB7XG4gIF8uZGVidWcoYEZpcmUgYSBcIiR7dHlwZX1cIiBldmVudCBvbiBhbiBlbGVtZW50KCR7cmVmfSkgaW4gaW5zdGFuY2UoJHt0aGlzLmlkfSlgKVxuICBpZiAoQXJyYXkuaXNBcnJheShyZWYpKSB7XG4gICAgcmVmLnNvbWUoKHJlZikgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuZmlyZUV2ZW50KHJlZiwgdHlwZSwgZSkgIT09IGZhbHNlXG4gICAgfSlcbiAgICByZXR1cm5cbiAgfVxuXG4gIGNvbnN0IGVsID0gdGhpcy5kb2MuZ2V0UmVmKHJlZilcblxuICBpZiAoZWwpIHtcbiAgICB0aGlzLmRvYy5jbG9zZSgpXG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy5kb2MuZmlyZUV2ZW50KGVsLCB0eXBlLCBlLCBkb21DaGFuZ2VzKVxuICAgIHRoaXMudXBkYXRlQWN0aW9ucygpXG4gICAgdGhpcy5kb2MubGlzdGVuZXIudXBkYXRlRmluaXNoKClcbiAgICB0aGlzLmRvYy5vcGVuKClcbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cblxuICByZXR1cm4gbmV3IEVycm9yKGBpbnZhbGlkIGVsZW1lbnQgcmVmZXJlbmNlIFwiJHtyZWZ9XCJgKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FsbGJhY2sgKGNhbGxiYWNrSWQsIGRhdGEsIGlmS2VlcEFsaXZlKSB7XG4gIF8uZGVidWcoYEludm9rZSBhIGNhbGxiYWNrKCR7Y2FsbGJhY2tJZH0pIHdpdGhgLCBkYXRhLFxuICAgICAgICAgICAgYGluIGluc3RhbmNlKCR7dGhpcy5pZH0pYClcblxuICBjb25zdCBjYWxsYmFjayA9IHRoaXMuY2FsbGJhY2tzW2NhbGxiYWNrSWRdXG5cbiAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHRoaXMuZG9jLmNsb3NlKClcbiAgICBjYWxsYmFjayhkYXRhKSAvLyBkYXRhIGlzIGFscmVhZHkgYSBvYmplY3QsIEBzZWU6IGxpYi9ydW50aW1lL2luZGV4LmpzXG5cbiAgICBpZiAodHlwZW9mIGlmS2VlcEFsaXZlID09PSAndW5kZWZpbmVkJyB8fCBpZktlZXBBbGl2ZSA9PT0gZmFsc2UpIHtcbiAgICAgIHRoaXMuY2FsbGJhY2tzW2NhbGxiYWNrSWRdID0gdW5kZWZpbmVkXG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGVBY3Rpb25zKClcbiAgICB0aGlzLmRvYy5saXN0ZW5lci51cGRhdGVGaW5pc2goKVxuICAgIHRoaXMuZG9jLm9wZW4oKVxuICAgIHJldHVyblxuICB9XG5cbiAgcmV0dXJuIG5ldyBFcnJvcihgaW52YWxpZCBjYWxsYmFjayBpZCBcIiR7Y2FsbGJhY2tJZH1cImApXG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZWZyZXNoRGF0YSAoZGF0YSkge1xuICBfLmRlYnVnKGBSZWZyZXNoIHdpdGhgLCBkYXRhLFxuICAgICAgICAgICAgYGluIGluc3RhbmNlWyR7dGhpcy5pZH1dYClcblxuICBjb25zdCB2bSA9IHRoaXMudm1cblxuICBpZiAodm0gJiYgZGF0YSkge1xuICAgIHRoaXMuZG9jLmNsb3NlKClcbiAgICBpZiAodHlwZW9mIHZtLnJlZnJlc2hEYXRhID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB2bS5yZWZyZXNoRGF0YShkYXRhKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIF8uZXh0ZW5kKHZtLCBkYXRhKVxuICAgIH1cbiAgICB0aGlzLnVwZGF0ZUFjdGlvbnMoKVxuICAgIHRoaXMuZG9jLmxpc3RlbmVyLnJlZnJlc2hGaW5pc2goKVxuICAgIHRoaXMuZG9jLm9wZW4oKVxuICAgIHJldHVyblxuICB9XG5cbiAgcmV0dXJuIG5ldyBFcnJvcihgaW52YWxpZCBkYXRhIFwiJHtkYXRhfVwiYClcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vaHRtbDUvZGVmYXVsdC9hcHAvY3RybC5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIERpZmZlciB7XG4gIGNvbnN0cnVjdG9yIChpZCkge1xuICAgIHRoaXMuaWQgPSBpZFxuICAgIHRoaXMubWFwID0gW11cbiAgICB0aGlzLmhvb2tzID0gW11cbiAgfVxuICBpc0VtcHR5ICgpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAubGVuZ3RoID09PSAwXG4gIH1cbiAgYXBwZW5kICh0eXBlLCBkZXB0aCwgcmVmLCBoYW5kbGVyKSB7XG4gICAgaWYgKCF0aGlzLmhhc1RpbWVyKSB7XG4gICAgICB0aGlzLmhhc1RpbWVyID0gdHJ1ZVxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuaGFzVGltZXIgPSBmYWxzZVxuICAgICAgICB0aGlzLmZsdXNoKHRydWUpXG4gICAgICB9LCAwKVxuICAgIH1cbiAgICBjb25zdCBtYXAgPSB0aGlzLm1hcFxuICAgIGlmICghbWFwW2RlcHRoXSkge1xuICAgICAgbWFwW2RlcHRoXSA9IHt9XG4gICAgfVxuICAgIGNvbnN0IGdyb3VwID0gbWFwW2RlcHRoXVxuICAgIGlmICghZ3JvdXBbdHlwZV0pIHtcbiAgICAgIGdyb3VwW3R5cGVdID0ge31cbiAgICB9XG4gICAgaWYgKHR5cGUgPT09ICdlbGVtZW50Jykge1xuICAgICAgaWYgKCFncm91cFt0eXBlXVtyZWZdKSB7XG4gICAgICAgIGdyb3VwW3R5cGVdW3JlZl0gPSBbXVxuICAgICAgfVxuICAgICAgZ3JvdXBbdHlwZV1bcmVmXS5wdXNoKGhhbmRsZXIpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgZ3JvdXBbdHlwZV1bcmVmXSA9IGhhbmRsZXJcbiAgICB9XG4gIH1cbiAgZmx1c2ggKGlzVGltZW91dCkge1xuICAgIGNvbnN0IG1hcCA9IHRoaXMubWFwLnNsaWNlKClcbiAgICB0aGlzLm1hcC5sZW5ndGggPSAwXG4gICAgbWFwLmZvckVhY2goKGdyb3VwKSA9PiB7XG4gICAgICBjYWxsVHlwZU1hcChncm91cCwgJ3JlcGVhdCcpXG4gICAgICBjYWxsVHlwZU1hcChncm91cCwgJ3Nob3duJylcbiAgICAgIGNhbGxUeXBlTGlzdChncm91cCwgJ2VsZW1lbnQnKVxuICAgIH0pXG5cbiAgICBjb25zdCBob29rcyA9IHRoaXMuaG9va3Muc2xpY2UoKVxuICAgIHRoaXMuaG9va3MubGVuZ3RoID0gMFxuICAgIGhvb2tzLmZvckVhY2goKGZuKSA9PiB7XG4gICAgICBmbigpXG4gICAgfSlcblxuICAgIGlmICghdGhpcy5pc0VtcHR5KCkpIHtcbiAgICAgIHRoaXMuZmx1c2goKVxuICAgIH1cbiAgfVxuICB0aGVuIChmbikge1xuICAgIHRoaXMuaG9va3MucHVzaChmbilcbiAgfVxufVxuXG5mdW5jdGlvbiBjYWxsVHlwZU1hcCAoZ3JvdXAsIHR5cGUpIHtcbiAgY29uc3QgbWFwID0gZ3JvdXBbdHlwZV1cbiAgZm9yIChjb25zdCByZWYgaW4gbWFwKSB7XG4gICAgbWFwW3JlZl0oKVxuICB9XG59XG5cbmZ1bmN0aW9uIGNhbGxUeXBlTGlzdCAoZ3JvdXAsIHR5cGUpIHtcbiAgY29uc3QgbWFwID0gZ3JvdXBbdHlwZV1cbiAgZm9yIChjb25zdCByZWYgaW4gbWFwKSB7XG4gICAgY29uc3QgbGlzdCA9IG1hcFtyZWZdXG4gICAgbGlzdC5mb3JFYWNoKChoYW5kbGVyKSA9PiB7IGhhbmRsZXIoKSB9KVxuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2h0bWw1L2RlZmF1bHQvYXBwL2RpZmZlci5qc1xuICoqLyIsIi8qKlxuICogQGZpbGVPdmVydmlld1xuICogQSBzaW1wbGUgdmlydHVhbCBkb20gaW1wbGVtZW50YXRpb25cbiAqL1xuXG5pbXBvcnQgTGlzdGVuZXIgZnJvbSAnLi9saXN0ZW5lcidcblxuY29uc3QgREVGQVVMVF9UQUdfTkFNRSA9ICdkaXYnXG5cbmV4cG9ydCBjb25zdCBpbnN0YW5jZU1hcCA9IHt9XG5sZXQgbmV4dE5vZGVSZWYgPSAxXG5cbmV4cG9ydCBmdW5jdGlvbiBEb2N1bWVudCAoaWQsIHVybCwgaGFuZGxlcikge1xuICBpZCA9IGlkID8gaWQudG9TdHJpbmcoKSA6ICcnXG4gIHRoaXMuaWQgPSBpZFxuICB0aGlzLlVSTCA9IHVybFxuXG4gIGluc3RhbmNlTWFwW2lkXSA9IHRoaXNcbiAgdGhpcy5ub2RlTWFwID0ge31cbiAgdGhpcy5saXN0ZW5lciA9IG5ldyBMaXN0ZW5lcihpZCwgaGFuZGxlciB8fCBnZW5DYWxsVGFza3MoaWQpKVxuICB0aGlzLmNyZWF0ZURvY3VtZW50RWxlbWVudCgpXG59XG5cbmZ1bmN0aW9uIGdlbkNhbGxUYXNrcyAoaWQpIHtcbiAgcmV0dXJuICh0YXNrcykgPT4ge1xuICAgIGlmICghQXJyYXkuaXNBcnJheSh0YXNrcykpIHtcbiAgICAgIHRhc2tzID0gW3Rhc2tzXVxuICAgIH1cbiAgICByZXR1cm4gY2FsbE5hdGl2ZShpZCwgdGFza3MsICctMScpXG4gIH1cbn1cblxuRG9jdW1lbnQucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gIGRlbGV0ZSB0aGlzLmxpc3RlbmVyXG4gIGRlbGV0ZSB0aGlzLm5vZGVNYXBcbiAgZGVsZXRlIGluc3RhbmNlTWFwW3RoaXMuaWRdXG59XG5cbkRvY3VtZW50LnByb3RvdHlwZS5vcGVuID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmxpc3RlbmVyLmJhdGNoZWQgPSBmYWxzZVxufVxuXG5Eb2N1bWVudC5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMubGlzdGVuZXIuYmF0Y2hlZCA9IHRydWVcbn1cblxuRG9jdW1lbnQucHJvdG90eXBlLmNyZWF0ZURvY3VtZW50RWxlbWVudCA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKCF0aGlzLmRvY3VtZW50RWxlbWVudCkge1xuICAgIGNvbnN0IGVsID0gbmV3IEVsZW1lbnQoJ2RvY3VtZW50JylcbiAgICBlbC5kb2NJZCA9IHRoaXMuaWRcbiAgICBlbC5vd25lckRvY3VtZW50ID0gdGhpc1xuICAgIGVsLnJvbGUgPSAnZG9jdW1lbnRFbGVtZW50J1xuICAgIGVsLmRlcHRoID0gMFxuICAgIGVsLnJlZiA9ICdfZG9jdW1lbnRFbGVtZW50J1xuICAgIHRoaXMubm9kZU1hcC5fZG9jdW1lbnRFbGVtZW50ID0gZWxcbiAgICB0aGlzLmRvY3VtZW50RWxlbWVudCA9IGVsXG4gICAgZWwuYXBwZW5kQ2hpbGQgPSAobm9kZSkgPT4ge1xuICAgICAgYXBwZW5kQm9keSh0aGlzLCBub2RlKVxuICAgIH1cbiAgICBlbC5pbnNlcnRCZWZvcmUgPSAobm9kZSwgYmVmb3JlKSA9PiB7XG4gICAgICBhcHBlbmRCb2R5KHRoaXMsIG5vZGUsIGJlZm9yZSlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcy5kb2N1bWVudEVsZW1lbnRcbn1cblxuZnVuY3Rpb24gYXBwZW5kQm9keSAoZG9jLCBub2RlLCBiZWZvcmUpIHtcbiAgY29uc3QgeyBkb2N1bWVudEVsZW1lbnQgfSA9IGRvY1xuXG4gIGlmIChkb2N1bWVudEVsZW1lbnQucHVyZUNoaWxkcmVuLmxlbmd0aCA+IDAgfHwgbm9kZS5wYXJlbnROb2RlKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgY29uc3QgY2hpbGRyZW4gPSBkb2N1bWVudEVsZW1lbnQuY2hpbGRyZW5cbiAgY29uc3QgYmVmb3JlSW5kZXggPSBjaGlsZHJlbi5pbmRleE9mKGJlZm9yZSlcbiAgaWYgKGJlZm9yZUluZGV4IDwgMCkge1xuICAgIGNoaWxkcmVuLnB1c2gobm9kZSlcbiAgfVxuICBlbHNlIHtcbiAgICBjaGlsZHJlbi5zcGxpY2UoYmVmb3JlSW5kZXgsIDAsIG5vZGUpXG4gIH1cblxuICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gMSkge1xuICAgIGlmIChub2RlLnJvbGUgPT09ICdib2R5Jykge1xuICAgICAgbm9kZS5kb2NJZCA9IGRvYy5pZFxuICAgICAgbm9kZS5vd25lckRvY3VtZW50ID0gZG9jXG4gICAgICBub2RlLnBhcmVudE5vZGUgPSBkb2N1bWVudEVsZW1lbnRcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBub2RlLmNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICBjaGlsZC5wYXJlbnROb2RlID0gbm9kZVxuICAgICAgfSlcbiAgICAgIHNldEJvZHkoZG9jLCBub2RlKVxuICAgICAgbm9kZS5kb2NJZCA9IGRvYy5pZFxuICAgICAgbm9kZS5vd25lckRvY3VtZW50ID0gZG9jXG4gICAgICBsaW5rUGFyZW50KG5vZGUsIGRvY3VtZW50RWxlbWVudClcbiAgICAgIGRlbGV0ZSBkb2Mubm9kZU1hcFtub2RlLm5vZGVJZF1cbiAgICB9XG4gICAgZG9jdW1lbnRFbGVtZW50LnB1cmVDaGlsZHJlbi5wdXNoKG5vZGUpXG4gICAgZG9jLmxpc3RlbmVyLmNyZWF0ZUJvZHkobm9kZSlcbiAgfVxuICBlbHNlIHtcbiAgICBub2RlLnBhcmVudE5vZGUgPSBkb2N1bWVudEVsZW1lbnRcbiAgICBkb2Mubm9kZU1hcFtub2RlLnJlZl0gPSBub2RlXG4gIH1cbn1cblxuZnVuY3Rpb24gc2V0Qm9keSAoZG9jLCBlbCkge1xuICBlbC5yb2xlID0gJ2JvZHknXG4gIGVsLmRlcHRoID0gMVxuICBkZWxldGUgZG9jLm5vZGVNYXBbZWwubm9kZUlkXVxuICBlbC5yZWYgPSAnX3Jvb3QnXG4gIGRvYy5ub2RlTWFwLl9yb290ID0gZWxcbiAgZG9jLmJvZHkgPSBlbFxufVxuXG5Eb2N1bWVudC5wcm90b3R5cGUuY3JlYXRlQm9keSA9IGZ1bmN0aW9uICh0eXBlLCBwcm9wcykge1xuICBpZiAoIXRoaXMuYm9keSkge1xuICAgIGNvbnN0IGVsID0gbmV3IEVsZW1lbnQodHlwZSwgcHJvcHMpXG4gICAgc2V0Qm9keSh0aGlzLCBlbClcbiAgfVxuXG4gIHJldHVybiB0aGlzLmJvZHlcbn1cblxuRG9jdW1lbnQucHJvdG90eXBlLmNyZWF0ZUVsZW1lbnQgPSBmdW5jdGlvbiAodGFnTmFtZSwgcHJvcHMpIHtcbiAgcmV0dXJuIG5ldyBFbGVtZW50KHRhZ05hbWUsIHByb3BzKVxufVxuXG5Eb2N1bWVudC5wcm90b3R5cGUuY3JlYXRlQ29tbWVudCA9IGZ1bmN0aW9uICh0ZXh0KSB7XG4gIHJldHVybiBuZXcgQ29tbWVudCh0ZXh0KVxufVxuXG5Eb2N1bWVudC5wcm90b3R5cGUuZmlyZUV2ZW50ID0gZnVuY3Rpb24gKGVsLCB0eXBlLCBlLCBkb21DaGFuZ2VzKSB7XG4gIGlmICghZWwpIHtcbiAgICByZXR1cm5cbiAgfVxuICBlID0gZSB8fCB7fVxuICBlLnR5cGUgPSB0eXBlXG4gIGUudGFyZ2V0ID0gZWxcbiAgZS50aW1lc3RhbXAgPSBEYXRlLm5vdygpXG4gIGlmIChkb21DaGFuZ2VzKSB7XG4gICAgdXBkYXRlRWxlbWVudChlbCwgZG9tQ2hhbmdlcylcbiAgfVxuICByZXR1cm4gZWwuZmlyZUV2ZW50KHR5cGUsIGUpXG59XG5cbkRvY3VtZW50LnByb3RvdHlwZS5nZXRSZWYgPSBmdW5jdGlvbiAocmVmKSB7XG4gIHJldHVybiB0aGlzLm5vZGVNYXBbcmVmXVxufVxuXG5mdW5jdGlvbiB1cGRhdGVFbGVtZW50IChlbCwgY2hhbmdlcykge1xuICBjb25zdCBhdHRycyA9IGNoYW5nZXMuYXR0cnMgfHwge31cbiAgZm9yIChjb25zdCBuYW1lIGluIGF0dHJzKSB7XG4gICAgZWwuc2V0QXR0cihuYW1lLCBhdHRyc1tuYW1lXSwgdHJ1ZSlcbiAgfVxuICBjb25zdCBzdHlsZSA9IGNoYW5nZXMuc3R5bGUgfHwge31cbiAgZm9yIChjb25zdCBuYW1lIGluIHN0eWxlKSB7XG4gICAgZWwuc2V0U3R5bGUobmFtZSwgc3R5bGVbbmFtZV0sIHRydWUpXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIE5vZGUgKCkge1xuICB0aGlzLm5vZGVJZCA9IChuZXh0Tm9kZVJlZisrKS50b1N0cmluZygpXG4gIHRoaXMucmVmID0gdGhpcy5ub2RlSWRcbiAgdGhpcy5jaGlsZHJlbiA9IFtdXG4gIHRoaXMucHVyZUNoaWxkcmVuID0gW11cbiAgdGhpcy5wYXJlbnROb2RlID0gbnVsbFxuICB0aGlzLm5leHRTaWJsaW5nID0gbnVsbFxuICB0aGlzLnByZXZpb3VzU2libGluZyA9IG51bGxcbn1cblxuTm9kZS5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgZG9jID0gaW5zdGFuY2VNYXBbdGhpcy5kb2NJZF1cbiAgaWYgKGRvYykge1xuICAgIGRlbGV0ZSB0aGlzLmRvY0lkXG4gICAgZGVsZXRlIGRvYy5ub2RlTWFwW3RoaXMubm9kZUlkXVxuICB9XG4gIHRoaXMuY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgY2hpbGQuZGVzdHJveSgpXG4gIH0pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBFbGVtZW50ICh0eXBlID0gREVGQVVMVF9UQUdfTkFNRSwgcHJvcHMpIHtcbiAgcHJvcHMgPSBwcm9wcyB8fCB7fVxuICB0aGlzLm5vZGVUeXBlID0gMVxuICB0aGlzLm5vZGVJZCA9IChuZXh0Tm9kZVJlZisrKS50b1N0cmluZygpXG4gIHRoaXMucmVmID0gdGhpcy5ub2RlSWRcbiAgdGhpcy50eXBlID0gdHlwZVxuICB0aGlzLmF0dHIgPSBwcm9wcy5hdHRyIHx8IHt9XG4gIHRoaXMuY2xhc3NTdHlsZSA9IHByb3BzLmNsYXNzU3R5bGUgfHwge31cbiAgdGhpcy5zdHlsZSA9IHByb3BzLnN0eWxlIHx8IHt9XG4gIHRoaXMuZXZlbnQgPSB7fVxuICB0aGlzLmNoaWxkcmVuID0gW11cbiAgdGhpcy5wdXJlQ2hpbGRyZW4gPSBbXVxufVxuXG5FbGVtZW50LnByb3RvdHlwZSA9IG5ldyBOb2RlKClcblxuRWxlbWVudC5wcm90b3R5cGUuYXBwZW5kQ2hpbGQgPSBmdW5jdGlvbiAobm9kZSkge1xuICBpZiAobm9kZS5wYXJlbnROb2RlICYmIG5vZGUucGFyZW50Tm9kZSAhPT0gdGhpcykge1xuICAgIHJldHVyblxuICB9XG4gIGlmICghbm9kZS5wYXJlbnROb2RlKSB7XG4gICAgbGlua1BhcmVudChub2RlLCB0aGlzKVxuICAgIGluc2VydEluZGV4KG5vZGUsIHRoaXMuY2hpbGRyZW4sIHRoaXMuY2hpbGRyZW4ubGVuZ3RoLCB0cnVlKVxuICAgIGlmICh0aGlzLmRvY0lkKSB7XG4gICAgICByZWdpc3Rlck5vZGUodGhpcy5kb2NJZCwgbm9kZSlcbiAgICB9XG4gICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IDEpIHtcbiAgICAgIGluc2VydEluZGV4KG5vZGUsIHRoaXMucHVyZUNoaWxkcmVuLCB0aGlzLnB1cmVDaGlsZHJlbi5sZW5ndGgpXG4gICAgICBpZiAodGhpcy5kb2NJZCkge1xuICAgICAgICBjb25zdCBsaXN0ZW5lciA9IGluc3RhbmNlTWFwW3RoaXMuZG9jSWRdLmxpc3RlbmVyXG4gICAgICAgIHJldHVybiBsaXN0ZW5lci5hZGRFbGVtZW50KG5vZGUsIHRoaXMucmVmLCAtMSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgZWxzZSB7XG4gICAgbW92ZUluZGV4KG5vZGUsIHRoaXMuY2hpbGRyZW4sIHRoaXMuY2hpbGRyZW4ubGVuZ3RoLCB0cnVlKVxuICAgIGlmIChub2RlLm5vZGVUeXBlID09PSAxKSB7XG4gICAgICBjb25zdCBpbmRleCA9IG1vdmVJbmRleChub2RlLCB0aGlzLnB1cmVDaGlsZHJlbiwgdGhpcy5wdXJlQ2hpbGRyZW4ubGVuZ3RoKVxuICAgICAgaWYgKHRoaXMuZG9jSWQgJiYgaW5kZXggPj0gMCkge1xuICAgICAgICBjb25zdCBsaXN0ZW5lciA9IGluc3RhbmNlTWFwW3RoaXMuZG9jSWRdLmxpc3RlbmVyXG4gICAgICAgIHJldHVybiBsaXN0ZW5lci5tb3ZlRWxlbWVudChub2RlLnJlZiwgdGhpcy5yZWYsIGluZGV4KVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5FbGVtZW50LnByb3RvdHlwZS5pbnNlcnRCZWZvcmUgPSBmdW5jdGlvbiAobm9kZSwgYmVmb3JlKSB7XG4gIGlmIChub2RlLnBhcmVudE5vZGUgJiYgbm9kZS5wYXJlbnROb2RlICE9PSB0aGlzKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgaWYgKG5vZGUgPT09IGJlZm9yZSB8fCBub2RlLm5leHRTaWJsaW5nID09PSBiZWZvcmUpIHtcbiAgICByZXR1cm5cbiAgfVxuICBpZiAoIW5vZGUucGFyZW50Tm9kZSkge1xuICAgIGxpbmtQYXJlbnQobm9kZSwgdGhpcylcbiAgICBpbnNlcnRJbmRleChub2RlLCB0aGlzLmNoaWxkcmVuLCB0aGlzLmNoaWxkcmVuLmluZGV4T2YoYmVmb3JlKSwgdHJ1ZSlcbiAgICBpZiAodGhpcy5kb2NJZCkge1xuICAgICAgcmVnaXN0ZXJOb2RlKHRoaXMuZG9jSWQsIG5vZGUpXG4gICAgfVxuICAgIGlmIChub2RlLm5vZGVUeXBlID09PSAxKSB7XG4gICAgICBjb25zdCBwdXJlQmVmb3JlID0gbmV4dEVsZW1lbnQoYmVmb3JlKVxuICAgICAgY29uc3QgaW5kZXggPSBpbnNlcnRJbmRleChcbiAgICAgICAgbm9kZSxcbiAgICAgICAgdGhpcy5wdXJlQ2hpbGRyZW4sXG4gICAgICAgIHB1cmVCZWZvcmVcbiAgICAgICAgICA/IHRoaXMucHVyZUNoaWxkcmVuLmluZGV4T2YocHVyZUJlZm9yZSlcbiAgICAgICAgICA6IHRoaXMucHVyZUNoaWxkcmVuLmxlbmd0aFxuICAgICAgKVxuICAgICAgaWYgKHRoaXMuZG9jSWQpIHtcbiAgICAgICAgY29uc3QgbGlzdGVuZXIgPSBpbnN0YW5jZU1hcFt0aGlzLmRvY0lkXS5saXN0ZW5lclxuICAgICAgICByZXR1cm4gbGlzdGVuZXIuYWRkRWxlbWVudChub2RlLCB0aGlzLnJlZiwgaW5kZXgpXG4gICAgICB9XG4gICAgfVxuICB9XG4gIGVsc2Uge1xuICAgIG1vdmVJbmRleChub2RlLCB0aGlzLmNoaWxkcmVuLCB0aGlzLmNoaWxkcmVuLmluZGV4T2YoYmVmb3JlKSwgdHJ1ZSlcbiAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gMSkge1xuICAgICAgY29uc3QgcHVyZUJlZm9yZSA9IG5leHRFbGVtZW50KGJlZm9yZSlcbiAgICAgIGNvbnN0IGluZGV4ID0gbW92ZUluZGV4KFxuICAgICAgICBub2RlLFxuICAgICAgICB0aGlzLnB1cmVDaGlsZHJlbixcbiAgICAgICAgcHVyZUJlZm9yZVxuICAgICAgICAgID8gdGhpcy5wdXJlQ2hpbGRyZW4uaW5kZXhPZihwdXJlQmVmb3JlKVxuICAgICAgICAgIDogdGhpcy5wdXJlQ2hpbGRyZW4ubGVuZ3RoXG4gICAgICApXG4gICAgICBpZiAodGhpcy5kb2NJZCAmJiBpbmRleCA+PSAwKSB7XG4gICAgICAgIGNvbnN0IGxpc3RlbmVyID0gaW5zdGFuY2VNYXBbdGhpcy5kb2NJZF0ubGlzdGVuZXJcbiAgICAgICAgcmV0dXJuIGxpc3RlbmVyLm1vdmVFbGVtZW50KG5vZGUucmVmLCB0aGlzLnJlZiwgaW5kZXgpXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbkVsZW1lbnQucHJvdG90eXBlLmluc2VydEFmdGVyID0gZnVuY3Rpb24gKG5vZGUsIGFmdGVyKSB7XG4gIGlmIChub2RlLnBhcmVudE5vZGUgJiYgbm9kZS5wYXJlbnROb2RlICE9PSB0aGlzKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgaWYgKG5vZGUgPT09IGFmdGVyIHx8IG5vZGUucHJldmlvdXNTaWJsaW5nID09PSBhZnRlcikge1xuICAgIHJldHVyblxuICB9XG4gIGlmICghbm9kZS5wYXJlbnROb2RlKSB7XG4gICAgbGlua1BhcmVudChub2RlLCB0aGlzKVxuICAgIGluc2VydEluZGV4KG5vZGUsIHRoaXMuY2hpbGRyZW4sIHRoaXMuY2hpbGRyZW4uaW5kZXhPZihhZnRlcikgKyAxLCB0cnVlKVxuICAgIGlmICh0aGlzLmRvY0lkKSB7XG4gICAgICByZWdpc3Rlck5vZGUodGhpcy5kb2NJZCwgbm9kZSlcbiAgICB9XG4gICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IDEpIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gaW5zZXJ0SW5kZXgoXG4gICAgICAgIG5vZGUsXG4gICAgICAgIHRoaXMucHVyZUNoaWxkcmVuLFxuICAgICAgICB0aGlzLnB1cmVDaGlsZHJlbi5pbmRleE9mKHByZXZpb3VzRWxlbWVudChhZnRlcikpICsgMVxuICAgICAgKVxuICAgICAgaWYgKHRoaXMuZG9jSWQpIHtcbiAgICAgICAgY29uc3QgbGlzdGVuZXIgPSBpbnN0YW5jZU1hcFt0aGlzLmRvY0lkXS5saXN0ZW5lclxuICAgICAgICByZXR1cm4gbGlzdGVuZXIuYWRkRWxlbWVudChub2RlLCB0aGlzLnJlZiwgaW5kZXgpXG4gICAgICB9XG4gICAgfVxuICB9XG4gIGVsc2Uge1xuICAgIG1vdmVJbmRleChub2RlLCB0aGlzLmNoaWxkcmVuLCB0aGlzLmNoaWxkcmVuLmluZGV4T2YoYWZ0ZXIpICsgMSwgdHJ1ZSlcbiAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gMSkge1xuICAgICAgY29uc3QgaW5kZXggPSBtb3ZlSW5kZXgoXG4gICAgICAgIG5vZGUsXG4gICAgICAgIHRoaXMucHVyZUNoaWxkcmVuLFxuICAgICAgICB0aGlzLnB1cmVDaGlsZHJlbi5pbmRleE9mKHByZXZpb3VzRWxlbWVudChhZnRlcikpICsgMVxuICAgICAgKVxuICAgICAgaWYgKHRoaXMuZG9jSWQgJiYgaW5kZXggPj0gMCkge1xuICAgICAgICBjb25zdCBsaXN0ZW5lciA9IGluc3RhbmNlTWFwW3RoaXMuZG9jSWRdLmxpc3RlbmVyXG4gICAgICAgIHJldHVybiBsaXN0ZW5lci5tb3ZlRWxlbWVudChub2RlLnJlZiwgdGhpcy5yZWYsIGluZGV4KVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5FbGVtZW50LnByb3RvdHlwZS5yZW1vdmVDaGlsZCA9IGZ1bmN0aW9uIChub2RlLCBwcmVzZXJ2ZWQpIHtcbiAgaWYgKG5vZGUucGFyZW50Tm9kZSkge1xuICAgIHJlbW92ZUluZGV4KG5vZGUsIHRoaXMuY2hpbGRyZW4sIHRydWUpXG4gICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IDEpIHtcbiAgICAgIHJlbW92ZUluZGV4KG5vZGUsIHRoaXMucHVyZUNoaWxkcmVuKVxuICAgICAgaWYgKHRoaXMuZG9jSWQpIHtcbiAgICAgICAgY29uc3QgbGlzdGVuZXIgPSBpbnN0YW5jZU1hcFt0aGlzLmRvY0lkXS5saXN0ZW5lclxuICAgICAgICBsaXN0ZW5lci5yZW1vdmVFbGVtZW50KG5vZGUucmVmKVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBpZiAoIXByZXNlcnZlZCkge1xuICAgIG5vZGUuZGVzdHJveSgpXG4gIH1cbn1cblxuRWxlbWVudC5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLmRvY0lkKSB7XG4gICAgY29uc3QgbGlzdGVuZXIgPSBpbnN0YW5jZU1hcFt0aGlzLmRvY0lkXS5saXN0ZW5lclxuICAgIHRoaXMucHVyZUNoaWxkcmVuLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICBsaXN0ZW5lci5yZW1vdmVFbGVtZW50KG5vZGUucmVmKVxuICAgIH0pXG4gIH1cbiAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKG5vZGUgPT4ge1xuICAgIG5vZGUuZGVzdHJveSgpXG4gIH0pXG4gIHRoaXMuY2hpbGRyZW4ubGVuZ3RoID0gMFxuICB0aGlzLnB1cmVDaGlsZHJlbi5sZW5ndGggPSAwXG59XG5cbmZ1bmN0aW9uIG5leHRFbGVtZW50IChub2RlKSB7XG4gIHdoaWxlIChub2RlKSB7XG4gICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IDEpIHtcbiAgICAgIHJldHVybiBub2RlXG4gICAgfVxuICAgIG5vZGUgPSBub2RlLm5leHRTaWJsaW5nXG4gIH1cbn1cblxuZnVuY3Rpb24gcHJldmlvdXNFbGVtZW50IChub2RlKSB7XG4gIHdoaWxlIChub2RlKSB7XG4gICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IDEpIHtcbiAgICAgIHJldHVybiBub2RlXG4gICAgfVxuICAgIG5vZGUgPSBub2RlLnByZXZpb3VzU2libGluZ1xuICB9XG59XG5cbmZ1bmN0aW9uIGxpbmtQYXJlbnQgKG5vZGUsIHBhcmVudCkge1xuICBub2RlLnBhcmVudE5vZGUgPSBwYXJlbnRcbiAgaWYgKHBhcmVudC5kb2NJZCkge1xuICAgIG5vZGUuZG9jSWQgPSBwYXJlbnQuZG9jSWRcbiAgICBub2RlLm93bmVyRG9jdW1lbnQgPSBwYXJlbnQub3duZXJEb2N1bWVudFxuICAgIG5vZGUub3duZXJEb2N1bWVudC5ub2RlTWFwW25vZGUubm9kZUlkXSA9IG5vZGVcbiAgICBub2RlLmRlcHRoID0gcGFyZW50LmRlcHRoICsgMVxuICB9XG4gIG5vZGUuY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgbGlua1BhcmVudChjaGlsZCwgbm9kZSlcbiAgfSlcbn1cblxuZnVuY3Rpb24gcmVnaXN0ZXJOb2RlIChkb2NJZCwgbm9kZSkge1xuICBjb25zdCBkb2MgPSBpbnN0YW5jZU1hcFtkb2NJZF1cbiAgZG9jLm5vZGVNYXBbbm9kZS5ub2RlSWRdID0gbm9kZVxufVxuXG5mdW5jdGlvbiBpbnNlcnRJbmRleCAodGFyZ2V0LCBsaXN0LCBuZXdJbmRleCwgY2hhbmdlU2libGluZykge1xuICBpZiAobmV3SW5kZXggPCAwKSB7XG4gICAgbmV3SW5kZXggPSAwXG4gIH1cbiAgY29uc3QgYmVmb3JlID0gbGlzdFtuZXdJbmRleCAtIDFdXG4gIGNvbnN0IGFmdGVyID0gbGlzdFtuZXdJbmRleF1cbiAgbGlzdC5zcGxpY2UobmV3SW5kZXgsIDAsIHRhcmdldClcbiAgaWYgKGNoYW5nZVNpYmxpbmcpIHtcbiAgICBiZWZvcmUgJiYgKGJlZm9yZS5uZXh0U2libGluZyA9IHRhcmdldClcbiAgICB0YXJnZXQucHJldmlvdXNTaWJsaW5nID0gYmVmb3JlXG4gICAgdGFyZ2V0Lm5leHRTaWJsaW5nID0gYWZ0ZXJcbiAgICBhZnRlciAmJiAoYWZ0ZXIucHJldmlvdXNTaWJsaW5nID0gdGFyZ2V0KVxuICB9XG4gIHJldHVybiBuZXdJbmRleFxufVxuXG5mdW5jdGlvbiBtb3ZlSW5kZXggKHRhcmdldCwgbGlzdCwgbmV3SW5kZXgsIGNoYW5nZVNpYmxpbmcpIHtcbiAgY29uc3QgaW5kZXggPSBsaXN0LmluZGV4T2YodGFyZ2V0KVxuICBpZiAoaW5kZXggPCAwKSB7XG4gICAgcmV0dXJuIC0xXG4gIH1cbiAgaWYgKGNoYW5nZVNpYmxpbmcpIHtcbiAgICBjb25zdCBiZWZvcmUgPSBsaXN0W2luZGV4IC0gMV1cbiAgICBjb25zdCBhZnRlciA9IGxpc3RbaW5kZXggKyAxXVxuICAgIGJlZm9yZSAmJiAoYmVmb3JlLm5leHRTaWJsaW5nID0gYWZ0ZXIpXG4gICAgYWZ0ZXIgJiYgKGFmdGVyLnByZXZpb3VzU2libGluZyA9IGJlZm9yZSlcbiAgfVxuICBsaXN0LnNwbGljZShpbmRleCwgMSlcbiAgbGV0IG5ld0luZGV4QWZ0ZXIgPSBuZXdJbmRleFxuICBpZiAoaW5kZXggPD0gbmV3SW5kZXgpIHtcbiAgICBuZXdJbmRleEFmdGVyID0gbmV3SW5kZXggLSAxXG4gIH1cbiAgY29uc3QgYmVmb3JlTmV3ID0gbGlzdFtuZXdJbmRleEFmdGVyIC0gMV1cbiAgY29uc3QgYWZ0ZXJOZXcgPSBsaXN0W25ld0luZGV4QWZ0ZXJdXG4gIGxpc3Quc3BsaWNlKG5ld0luZGV4QWZ0ZXIsIDAsIHRhcmdldClcbiAgaWYgKGNoYW5nZVNpYmxpbmcpIHtcbiAgICBiZWZvcmVOZXcgJiYgKGJlZm9yZU5ldy5uZXh0U2libGluZyA9IHRhcmdldClcbiAgICB0YXJnZXQucHJldmlvdXNTaWJsaW5nID0gYmVmb3JlTmV3XG4gICAgdGFyZ2V0Lm5leHRTaWJsaW5nID0gYWZ0ZXJOZXdcbiAgICBhZnRlck5ldyAmJiAoYWZ0ZXJOZXcucHJldmlvdXNTaWJsaW5nID0gdGFyZ2V0KVxuICB9XG4gIGlmIChpbmRleCA9PT0gbmV3SW5kZXhBZnRlcikge1xuICAgIHJldHVybiAtMVxuICB9XG4gIHJldHVybiBuZXdJbmRleFxufVxuXG5mdW5jdGlvbiByZW1vdmVJbmRleCAodGFyZ2V0LCBsaXN0LCBjaGFuZ2VTaWJsaW5nKSB7XG4gIGNvbnN0IGluZGV4ID0gbGlzdC5pbmRleE9mKHRhcmdldClcbiAgaWYgKGluZGV4IDwgMCkge1xuICAgIHJldHVyblxuICB9XG4gIGlmIChjaGFuZ2VTaWJsaW5nKSB7XG4gICAgY29uc3QgYmVmb3JlID0gbGlzdFtpbmRleCAtIDFdXG4gICAgY29uc3QgYWZ0ZXIgPSBsaXN0W2luZGV4ICsgMV1cbiAgICBiZWZvcmUgJiYgKGJlZm9yZS5uZXh0U2libGluZyA9IGFmdGVyKVxuICAgIGFmdGVyICYmIChhZnRlci5wcmV2aW91c1NpYmxpbmcgPSBiZWZvcmUpXG4gIH1cbiAgbGlzdC5zcGxpY2UoaW5kZXgsIDEpXG59XG5cbkVsZW1lbnQucHJvdG90eXBlLnNldEF0dHIgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSwgc2lsZW50KSB7XG4gIGlmICh0aGlzLmF0dHJba2V5XSA9PT0gdmFsdWUpIHtcbiAgICByZXR1cm5cbiAgfVxuICB0aGlzLmF0dHJba2V5XSA9IHZhbHVlXG4gIGlmICghc2lsZW50ICYmIHRoaXMuZG9jSWQpIHtcbiAgICBjb25zdCBsaXN0ZW5lciA9IGluc3RhbmNlTWFwW3RoaXMuZG9jSWRdLmxpc3RlbmVyXG4gICAgbGlzdGVuZXIuc2V0QXR0cih0aGlzLnJlZiwga2V5LCB2YWx1ZSlcbiAgfVxufVxuXG5FbGVtZW50LnByb3RvdHlwZS5zZXRTdHlsZSA9IGZ1bmN0aW9uIChrZXksIHZhbHVlLCBzaWxlbnQpIHtcbiAgaWYgKHRoaXMuc3R5bGVba2V5XSA9PT0gdmFsdWUpIHtcbiAgICByZXR1cm5cbiAgfVxuICB0aGlzLnN0eWxlW2tleV0gPSB2YWx1ZVxuICBpZiAoIXNpbGVudCAmJiB0aGlzLmRvY0lkKSB7XG4gICAgY29uc3QgbGlzdGVuZXIgPSBpbnN0YW5jZU1hcFt0aGlzLmRvY0lkXS5saXN0ZW5lclxuICAgIGxpc3RlbmVyLnNldFN0eWxlKHRoaXMucmVmLCBrZXksIHZhbHVlKVxuICB9XG59XG5cbkVsZW1lbnQucHJvdG90eXBlLnNldENsYXNzU3R5bGUgPSBmdW5jdGlvbiAoY2xhc3NTdHlsZSkge1xuICB0aGlzLmNsYXNzU3R5bGUgPSBjbGFzc1N0eWxlXG4gIGlmICh0aGlzLmRvY0lkKSB7XG4gICAgY29uc3QgbGlzdGVuZXIgPSBpbnN0YW5jZU1hcFt0aGlzLmRvY0lkXS5saXN0ZW5lclxuICAgIGxpc3RlbmVyLnNldFN0eWxlcyh0aGlzLnJlZiwgdGhpcy50b1N0eWxlKCkpXG4gIH1cbn1cblxuRWxlbWVudC5wcm90b3R5cGUuYWRkRXZlbnQgPSBmdW5jdGlvbiAodHlwZSwgaGFuZGxlcikge1xuICBpZiAoIXRoaXMuZXZlbnRbdHlwZV0pIHtcbiAgICB0aGlzLmV2ZW50W3R5cGVdID0gaGFuZGxlclxuICAgIGlmICh0aGlzLmRvY0lkKSB7XG4gICAgICBjb25zdCBsaXN0ZW5lciA9IGluc3RhbmNlTWFwW3RoaXMuZG9jSWRdLmxpc3RlbmVyXG4gICAgICBsaXN0ZW5lci5hZGRFdmVudCh0aGlzLnJlZiwgdHlwZSlcbiAgICB9XG4gIH1cbn1cblxuRWxlbWVudC5wcm90b3R5cGUucmVtb3ZlRXZlbnQgPSBmdW5jdGlvbiAodHlwZSkge1xuICBpZiAodGhpcy5ldmVudFt0eXBlXSkge1xuICAgIGRlbGV0ZSB0aGlzLmV2ZW50W3R5cGVdXG4gICAgaWYgKHRoaXMuZG9jSWQpIHtcbiAgICAgIGNvbnN0IGxpc3RlbmVyID0gaW5zdGFuY2VNYXBbdGhpcy5kb2NJZF0ubGlzdGVuZXJcbiAgICAgIGxpc3RlbmVyLnJlbW92ZUV2ZW50KHRoaXMucmVmLCB0eXBlKVxuICAgIH1cbiAgfVxufVxuXG5FbGVtZW50LnByb3RvdHlwZS5maXJlRXZlbnQgPSBmdW5jdGlvbiAodHlwZSwgZSkge1xuICBjb25zdCBoYW5kbGVyID0gdGhpcy5ldmVudFt0eXBlXVxuICBpZiAoaGFuZGxlcikge1xuICAgIHJldHVybiBoYW5kbGVyLmNhbGwodGhpcywgZSlcbiAgfVxufVxuXG5FbGVtZW50LnByb3RvdHlwZS50b1N0eWxlID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5jbGFzc1N0eWxlLCB0aGlzLnN0eWxlKVxufVxuXG5FbGVtZW50LnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IHJlc3VsdCA9IHtcbiAgICByZWY6IHRoaXMucmVmLnRvU3RyaW5nKCksXG4gICAgdHlwZTogdGhpcy50eXBlLFxuICAgIGF0dHI6IHRoaXMuYXR0cixcbiAgICBzdHlsZTogdGhpcy50b1N0eWxlKClcbiAgfVxuICBjb25zdCBldmVudCA9IE9iamVjdC5rZXlzKHRoaXMuZXZlbnQpXG4gIGlmIChldmVudC5sZW5ndGgpIHtcbiAgICByZXN1bHQuZXZlbnQgPSBldmVudFxuICB9XG4gIGlmICh0aGlzLnB1cmVDaGlsZHJlbi5sZW5ndGgpIHtcbiAgICByZXN1bHQuY2hpbGRyZW4gPSB0aGlzLnB1cmVDaGlsZHJlbi5tYXAoKGNoaWxkKSA9PiBjaGlsZC50b0pTT04oKSlcbiAgfVxuICByZXR1cm4gcmVzdWx0XG59XG5cbkVsZW1lbnQucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gJzwnICsgdGhpcy50eXBlICtcbiAgICAnIGF0dHI9JyArIEpTT04uc3RyaW5naWZ5KHRoaXMuYXR0cikgK1xuICAgICcgc3R5bGU9JyArIEpTT04uc3RyaW5naWZ5KHRoaXMudG9TdHlsZSgpKSArICc+JyArXG4gICAgdGhpcy5wdXJlQ2hpbGRyZW4ubWFwKChjaGlsZCkgPT4gY2hpbGQudG9TdHJpbmcoKSkuam9pbignJykgK1xuICAgICc8LycgKyB0aGlzLnR5cGUgKyAnPidcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIENvbW1lbnQgKHZhbHVlKSB7XG4gIHRoaXMubm9kZVR5cGUgPSA4XG4gIHRoaXMubm9kZUlkID0gKG5leHROb2RlUmVmKyspLnRvU3RyaW5nKClcbiAgdGhpcy5yZWYgPSB0aGlzLm5vZGVJZFxuICB0aGlzLnR5cGUgPSAnY29tbWVudCdcbiAgdGhpcy52YWx1ZSA9IHZhbHVlXG4gIHRoaXMuY2hpbGRyZW4gPSBbXVxuICB0aGlzLnB1cmVDaGlsZHJlbiA9IFtdXG59XG5cbkNvbW1lbnQucHJvdG90eXBlID0gbmV3IE5vZGUoKVxuXG5Db21tZW50LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuICc8IS0tICcgKyB0aGlzLnZhbHVlICsgJyAtLT4nXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2h0bWw1L3Zkb20vaW5kZXguanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBMaXN0ZW5lciAoaWQsIGhhbmRsZXIpIHtcbiAgdGhpcy5pZCA9IGlkXG4gIHRoaXMuYmF0Y2hlZCA9IGZhbHNlXG4gIHRoaXMudXBkYXRlcyA9IFtdXG4gIGlmICh0eXBlb2YgaGFuZGxlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHRoaXMuaGFuZGxlciA9IGhhbmRsZXJcbiAgfVxufVxuXG5MaXN0ZW5lci5wcm90b3R5cGUuY3JlYXRlRmluaXNoID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gIGNvbnN0IGhhbmRsZXIgPSB0aGlzLmhhbmRsZXJcbiAgcmV0dXJuIGhhbmRsZXIoW2NyZWF0ZUFjdGlvbignY3JlYXRlRmluaXNoJywgW10pXSwgY2FsbGJhY2spXG59XG5cbkxpc3RlbmVyLnByb3RvdHlwZS51cGRhdGVGaW5pc2ggPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgY29uc3QgaGFuZGxlciA9IHRoaXMuaGFuZGxlclxuICByZXR1cm4gaGFuZGxlcihbY3JlYXRlQWN0aW9uKCd1cGRhdGVGaW5pc2gnLCBbXSldLCBjYWxsYmFjaylcbn1cblxuTGlzdGVuZXIucHJvdG90eXBlLnJlZnJlc2hGaW5pc2ggPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgY29uc3QgaGFuZGxlciA9IHRoaXMuaGFuZGxlclxuICByZXR1cm4gaGFuZGxlcihbY3JlYXRlQWN0aW9uKCdyZWZyZXNoRmluaXNoJywgW10pXSwgY2FsbGJhY2spXG59XG5cbkxpc3RlbmVyLnByb3RvdHlwZS5jcmVhdGVCb2R5ID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgY29uc3QgYm9keSA9IGVsZW1lbnQudG9KU09OKClcbiAgY29uc3QgY2hpbGRyZW4gPSBib2R5LmNoaWxkcmVuXG4gIGRlbGV0ZSBib2R5LmNoaWxkcmVuXG4gIGNvbnN0IGFjdGlvbnMgPSBbY3JlYXRlQWN0aW9uKCdjcmVhdGVCb2R5JywgW2JvZHldKV1cbiAgaWYgKGNoaWxkcmVuKSB7XG4gICAgYWN0aW9ucy5wdXNoLmFwcGx5KGFjdGlvbnMsIGNoaWxkcmVuLm1hcChjaGlsZCA9PiB7XG4gICAgICByZXR1cm4gY3JlYXRlQWN0aW9uKCdhZGRFbGVtZW50JywgW2JvZHkucmVmLCBjaGlsZCwgLTFdKVxuICAgIH0pKVxuICB9XG4gIHJldHVybiB0aGlzLmFkZEFjdGlvbnMoYWN0aW9ucylcbn1cblxuTGlzdGVuZXIucHJvdG90eXBlLmFkZEVsZW1lbnQgPSBmdW5jdGlvbiAoZWxlbWVudCwgcmVmLCBpbmRleCkge1xuICBpZiAoIShpbmRleCA+PSAwKSkge1xuICAgIGluZGV4ID0gLTFcbiAgfVxuICByZXR1cm4gdGhpcy5hZGRBY3Rpb25zKGNyZWF0ZUFjdGlvbignYWRkRWxlbWVudCcsIFtyZWYsIGVsZW1lbnQudG9KU09OKCksIGluZGV4XSkpXG59XG5cbkxpc3RlbmVyLnByb3RvdHlwZS5yZW1vdmVFbGVtZW50ID0gZnVuY3Rpb24gKHJlZikge1xuICBpZiAoQXJyYXkuaXNBcnJheShyZWYpKSB7XG4gICAgY29uc3QgYWN0aW9ucyA9IHJlZi5tYXAoKHIpID0+IGNyZWF0ZUFjdGlvbigncmVtb3ZlRWxlbWVudCcsIFtyXSkpXG4gICAgcmV0dXJuIHRoaXMuYWRkQWN0aW9ucyhhY3Rpb25zKVxuICB9XG4gIHJldHVybiB0aGlzLmFkZEFjdGlvbnMoY3JlYXRlQWN0aW9uKCdyZW1vdmVFbGVtZW50JywgW3JlZl0pKVxufVxuXG5MaXN0ZW5lci5wcm90b3R5cGUubW92ZUVsZW1lbnQgPSBmdW5jdGlvbiAodGFyZ2V0UmVmLCBwYXJlbnRSZWYsIGluZGV4KSB7XG4gIHJldHVybiB0aGlzLmFkZEFjdGlvbnMoY3JlYXRlQWN0aW9uKCdtb3ZlRWxlbWVudCcsIFt0YXJnZXRSZWYsIHBhcmVudFJlZiwgaW5kZXhdKSlcbn1cblxuTGlzdGVuZXIucHJvdG90eXBlLnNldEF0dHIgPSBmdW5jdGlvbiAocmVmLCBrZXksIHZhbHVlKSB7XG4gIGNvbnN0IHJlc3VsdCA9IHt9XG4gIHJlc3VsdFtrZXldID0gdmFsdWVcbiAgcmV0dXJuIHRoaXMuYWRkQWN0aW9ucyhjcmVhdGVBY3Rpb24oJ3VwZGF0ZUF0dHJzJywgW3JlZiwgcmVzdWx0XSkpXG59XG5cbkxpc3RlbmVyLnByb3RvdHlwZS5zZXRTdHlsZSA9IGZ1bmN0aW9uIChyZWYsIGtleSwgdmFsdWUpIHtcbiAgY29uc3QgcmVzdWx0ID0ge31cbiAgcmVzdWx0W2tleV0gPSB2YWx1ZVxuICByZXR1cm4gdGhpcy5hZGRBY3Rpb25zKGNyZWF0ZUFjdGlvbigndXBkYXRlU3R5bGUnLCBbcmVmLCByZXN1bHRdKSlcbn1cblxuTGlzdGVuZXIucHJvdG90eXBlLnNldFN0eWxlcyA9IGZ1bmN0aW9uIChyZWYsIHN0eWxlKSB7XG4gIHJldHVybiB0aGlzLmFkZEFjdGlvbnMoY3JlYXRlQWN0aW9uKCd1cGRhdGVTdHlsZScsIFtyZWYsIHN0eWxlXSkpXG59XG5cbkxpc3RlbmVyLnByb3RvdHlwZS5hZGRFdmVudCA9IGZ1bmN0aW9uIChyZWYsIHR5cGUpIHtcbiAgcmV0dXJuIHRoaXMuYWRkQWN0aW9ucyhjcmVhdGVBY3Rpb24oJ2FkZEV2ZW50JywgW3JlZiwgdHlwZV0pKVxufVxuXG5MaXN0ZW5lci5wcm90b3R5cGUucmVtb3ZlRXZlbnQgPSBmdW5jdGlvbiAocmVmLCB0eXBlKSB7XG4gIHJldHVybiB0aGlzLmFkZEFjdGlvbnMoY3JlYXRlQWN0aW9uKCdyZW1vdmVFdmVudCcsIFtyZWYsIHR5cGVdKSlcbn1cblxuTGlzdGVuZXIucHJvdG90eXBlLmhhbmRsZXIgPSBmdW5jdGlvbiAoYWN0aW9ucywgY2IpIHtcbiAgcmV0dXJuIGNiICYmIGNiKClcbn1cblxuTGlzdGVuZXIucHJvdG90eXBlLmFkZEFjdGlvbnMgPSBmdW5jdGlvbiAoYWN0aW9ucykge1xuICBjb25zdCB1cGRhdGVzID0gdGhpcy51cGRhdGVzXG4gIGNvbnN0IGhhbmRsZXIgPSB0aGlzLmhhbmRsZXJcblxuICBpZiAoIUFycmF5LmlzQXJyYXkoYWN0aW9ucykpIHtcbiAgICBhY3Rpb25zID0gW2FjdGlvbnNdXG4gIH1cblxuICBpZiAodGhpcy5iYXRjaGVkKSB7XG4gICAgdXBkYXRlcy5wdXNoLmFwcGx5KHVwZGF0ZXMsIGFjdGlvbnMpXG4gIH1cbiAgZWxzZSB7XG4gICAgcmV0dXJuIGhhbmRsZXIoYWN0aW9ucylcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQWN0aW9uIChuYW1lLCBhcmdzKSB7XG4gIHJldHVybiB7IG1vZHVsZTogJ2RvbScsIG1ldGhvZDogbmFtZSwgYXJnczogYXJncyB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2h0bWw1L3Zkb20vbGlzdGVuZXIuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHtcblx0XCJuYW1lXCI6IFwid2VleFwiLFxuXHRcInZlcnNpb25cIjogXCIwLjQuMFwiLFxuXHRcImRlc2NyaXB0aW9uXCI6IFwiQSBmcmFtZXdvcmsgZm9yIGJ1aWxkaW5nIE1vYmlsZSBjcm9zcy1wbGF0Zm9ybSBVSVwiLFxuXHRcImxpY2Vuc2VcIjogXCJBcGFjaGUtMi4wXCIsXG5cdFwicmVwb3NpdG9yeVwiOiB7XG5cdFx0XCJ0eXBlXCI6IFwiZ2l0XCIsXG5cdFx0XCJ1cmxcIjogXCJnaXRAZ2l0aHViLmNvbTphbGliYWJhL3dlZXguZ2l0XCJcblx0fSxcblx0XCJob21lcGFnZVwiOiBcImh0dHA6Ly9hbGliYWJhLmdpdGh1Yi5pby93ZWV4L1wiLFxuXHRcImJ1Z3NcIjoge1xuXHRcdFwidXJsXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL2FsaWJhYmEvd2VleC9pc3N1ZXNcIlxuXHR9LFxuXHRcInByaXZhdGVcIjogXCJ0cnVlXCIsXG5cdFwia2V5d29yZHNcIjogW1xuXHRcdFwid2VleFwiLFxuXHRcdFwiaHlicmlkXCIsXG5cdFx0XCJ3ZWJjb21wb25lbnRcIixcblx0XHRcImFwcGZyYW1ld29ya1wiLFxuXHRcdFwibXZ2bVwiLFxuXHRcdFwiamF2YXNjcmlwdFwiLFxuXHRcdFwid2Via2l0XCIsXG5cdFx0XCJ2OFwiLFxuXHRcdFwianNjb3JlXCIsXG5cdFx0XCJodG1sNVwiLFxuXHRcdFwiYW5kcm9pZFwiLFxuXHRcdFwiaW9zXCIsXG5cdFx0XCJ5dW5vc1wiXG5cdF0sXG5cdFwiZW5naW5lc1wiOiB7XG5cdFx0XCJub2RlXCI6IFwiPj00XCJcblx0fSxcblx0XCJzY3JpcHRzXCI6IHtcblx0XHRcInBvc3RpbnN0YWxsXCI6IFwiYmFzaCAuL2Jpbi9pbnN0YWxsLWhvb2tzLnNoXCIsXG5cdFx0XCJidWlsZDpicm93c2VyXCI6IFwid2VicGFjayAtLWNvbmZpZyBidWlsZC93ZWJwYWNrLmJyb3dzZXIuY29uZmlnLmpzXCIsXG5cdFx0XCJidWlsZDpuYXRpdmVcIjogXCJ3ZWJwYWNrIC0tY29uZmlnIGJ1aWxkL3dlYnBhY2submF0aXZlLmNvbmZpZy5qc1wiLFxuXHRcdFwiYnVpbGQ6ZXhhbXBsZXNcIjogXCJ3ZWJwYWNrIC0tY29uZmlnIGJ1aWxkL3dlYnBhY2suZXhhbXBsZXMuY29uZmlnLmpzXCIsXG5cdFx0XCJidWlsZDp0ZXN0XCI6IFwid2VicGFjayAtLWNvbmZpZyBidWlsZC93ZWJwYWNrLnRlc3QuY29uZmlnLmpzXCIsXG5cdFx0XCJkaXN0OmJyb3dzZXJcIjogXCJucG0gcnVuIGJ1aWxkOmJyb3dzZXIgJiYgYmFzaCAuL2Jpbi9kaXN0LWJyb3dzZXIuc2hcIixcblx0XHRcImRpc3RcIjogXCJucG0gcnVuIGRpc3Q6YnJvd3NlclwiLFxuXHRcdFwiZGV2OmJyb3dzZXJcIjogXCJ3ZWJwYWNrIC0td2F0Y2ggLS1jb25maWcgYnVpbGQvd2VicGFjay5icm93c2VyLmNvbmZpZy5qc1wiLFxuXHRcdFwiZGV2Om5hdGl2ZVwiOiBcIndlYnBhY2sgLS13YXRjaCAtLWNvbmZpZyBidWlsZC93ZWJwYWNrLm5hdGl2ZS5jb25maWcuanNcIixcblx0XHRcImRldjpleGFtcGxlc1wiOiBcIndlYnBhY2sgLS13YXRjaCAtLWNvbmZpZyBidWlsZC93ZWJwYWNrLmV4YW1wbGVzLmNvbmZpZy5qc1wiLFxuXHRcdFwiZGV2OnRlc3RcIjogXCJ3ZWJwYWNrIC0td2F0Y2ggLS1jb25maWcgYnVpbGQvd2VicGFjay50ZXN0LmNvbmZpZy5qc1wiLFxuXHRcdFwiYnVpbGRcIjogXCJucG0gcnVuIGJ1aWxkOm5hdGl2ZSAmJiBucG0gcnVuIGJ1aWxkOmJyb3dzZXIgJiYgbnBtIHJ1biBidWlsZDpleGFtcGxlcyAmJiBucG0gcnVuIGJ1aWxkOnRlc3RcIixcblx0XHRcImxpbnRcIjogXCJlc2xpbnQgaHRtbDVcIixcblx0XHRcInRlc3Q6dW5pdFwiOiBcIm1vY2hhIC0tY29tcGlsZXJzIGpzOmJhYmVsLWNvcmUvcmVnaXN0ZXIgaHRtbDUvdGVzdC91bml0LyovKi5qcyBodG1sNS90ZXN0L3VuaXQvKi8qLyouanNcIixcblx0XHRcInRlc3Q6Y292ZXJcIjogXCJiYWJlbC1ub2RlIG5vZGVfbW9kdWxlcy9pc3BhcnRhL2Jpbi9pc3BhcnRhIGNvdmVyIC0tcmVwb3J0IHRleHQgbm9kZV9tb2R1bGVzL21vY2hhL2Jpbi9fbW9jaGEgLS0gLS1yZXBvcnRlciBkb3QgaHRtbDUvdGVzdC91bml0LyovKi5qcyBodG1sNS90ZXN0L3VuaXQvKi8qLyouanNcIixcblx0XHRcInRlc3Q6ZTJlXCI6IFwibm9kZSBodG1sNS90ZXN0L2UyZS9ydW5uZXIuanNcIixcblx0XHRcInRlc3RcIjogXCJucG0gcnVuIGxpbnQgJiYgbnBtIHJ1biB0ZXN0OmNvdmVyICYmIG5wbSBydW4gdGVzdDplMmVcIixcblx0XHRcInNlcnZlXCI6IFwic2VydmUgLi8gLXAgMTI1ODBcIixcblx0XHRcImNsZWFuOmV4YW1wbGVzXCI6IFwiZWNobyBcXFwiXFxcXDAzM1szNjsxbVtDbGVhbl1cXFxcMDMzWzBtIFxcXFwwMzNbMzNtZXhhbXBsZXNcXFxcMDMzWzBtXFxcIiAmJiBybSAtdnJmIGV4YW1wbGVzL2J1aWxkLypcIixcblx0XHRcImNsZWFuOnRlc3RcIjogXCJlY2hvIFxcXCJcXFxcMDMzWzM2OzFtW0NsZWFuXVxcXFwwMzNbMG0gXFxcXDAzM1szM210ZXN0XFxcXDAzM1swbVxcXCIgJiYgcm0gLXZyZiB0ZXN0L2J1aWxkLypcIixcblx0XHRcImNsZWFuXCI6IFwibnBtIHJ1biBjbGVhbjpleGFtcGxlcyAmJiBucG0gcnVuIGNsZWFuOnRlc3RcIixcblx0XHRcImNvcHk6anNcIjogXCJjcCAtdmYgLi9kaXN0L25hdGl2ZS5qcyAuL2FuZHJvaWQvc2RrL2Fzc2V0cy9tYWluLmpzXCIsXG5cdFx0XCJjb3B5OmV4YW1wbGVzXCI6IFwicm0gLXJmIC4vYW5kcm9pZC9wbGF5Z3JvdW5kL2FwcC9zcmMvbWFpbi9hc3NldHMvKiAmJiBjcCAtdnJmIC4vZXhhbXBsZXMvYnVpbGQvKiAuL2FuZHJvaWQvcGxheWdyb3VuZC9hcHAvc3JjL21haW4vYXNzZXRzL1wiLFxuXHRcdFwiY29weVwiOiBcIm5wbSBydW4gY29weTpqcyAmJiBucG0gcnVuIGNvcHk6ZXhhbXBsZXNcIlxuXHR9LFxuXHRcInN1YnZlcnNpb25cIjoge1xuXHRcdFwiYnJvd3NlclwiOiBcIjAuMi4yM1wiLFxuXHRcdFwiZnJhbWV3b3JrXCI6IFwiMC4xMC4xM1wiLFxuXHRcdFwidHJhbnNmb3JtZXJcIjogXCI+PTAuMS41IDwwLjRcIlxuXHR9LFxuXHRcImRlcGVuZGVuY2llc1wiOiB7XG5cdFx0XCJhbmltYXRpb25qc1wiOiBcIl4wLjEuNVwiLFxuXHRcdFwiY2Fycm91c2VsXCI6IFwiXjAuMS4xMVwiLFxuXHRcdFwiY29yZS1qc1wiOiBcIl4yLjQuMFwiLFxuXHRcdFwiY3ViaWNiZXppZXJcIjogXCJeMC4xLjFcIixcblx0XHRcImVudmRcIjogXCJeMC4xLjFcIixcblx0XHRcImZpeGVkc3RpY2t5XCI6IFwiXjAuMS4wXCIsXG5cdFx0XCJodHRwdXJsXCI6IFwiXjAuMS4xXCIsXG5cdFx0XCJrb3VudGRvd25cIjogXCJeMC4xLjJcIixcblx0XHRcImxhenlpbWdcIjogXCJeMC4xLjJcIixcblx0XHRcImxpZVwiOiBcIl4zLjAuNFwiLFxuXHRcdFwibW9kYWxzXCI6IFwiXjAuMS41XCIsXG5cdFx0XCJzY3JvbGwtdG9cIjogXCIwLjAuMlwiLFxuXHRcdFwic2VtdmVyXCI6IFwiXjUuMS4wXCIsXG5cdFx0XCJ0cmFuc2l0aW9uaXplXCI6IFwiMC4wLjNcIixcblx0XHRcIndlZXgtY29tcG9uZW50c1wiOiBcIl4wLjEuM1wiXG5cdH0sXG5cdFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcblx0XHRcImJhYmVsLWNsaVwiOiBcIn42LjQuNVwiLFxuXHRcdFwiYmFiZWwtbG9hZGVyXCI6IFwiXjYuMi40XCIsXG5cdFx0XCJiYWJlbC1wcmVzZXQtZXMyMDE1XCI6IFwiXjYuOS4wXCIsXG5cdFx0XCJjaGFpXCI6IFwiXjMuNS4wXCIsXG5cdFx0XCJjaHJvbWVkcml2ZXJcIjogXCJeMi4yMS4yXCIsXG5cdFx0XCJjcm9zcy1zcGF3blwiOiBcIl40LjAuMFwiLFxuXHRcdFwiY3NzLWxvYWRlclwiOiBcIl4wLjIzLjFcIixcblx0XHRcImVzbGludFwiOiBcIl4yLjExLjFcIixcblx0XHRcImh0dHAtc2VydmVyXCI6IFwiXjAuOS4wXCIsXG5cdFx0XCJpc3BhcnRhXCI6IFwiXjQuMC4wXCIsXG5cdFx0XCJpc3RhbmJ1bFwiOiBcIl4wLjQuM1wiLFxuXHRcdFwianNvbi1sb2FkZXJcIjogXCJeMC41LjRcIixcblx0XHRcIm1vY2hhXCI6IFwiXjIuNS4zXCIsXG5cdFx0XCJuaWdodHdhdGNoXCI6IFwiXjAuOS40XCIsXG5cdFx0XCJwaGFudG9tanMtcHJlYnVpbHRcIjogXCJeMi4xLjdcIixcblx0XHRcInNlbGVuaXVtLXNlcnZlclwiOiBcIl4yLjUzLjBcIixcblx0XHRcInNlcnZlXCI6IFwiXjEuNC4wXCIsXG5cdFx0XCJzaW5vblwiOiBcIl4xLjE3LjRcIixcblx0XHRcInNpbm9uLWNoYWlcIjogXCJeMi44LjBcIixcblx0XHRcInN0eWxlLWxvYWRlclwiOiBcIl4wLjEzLjFcIixcblx0XHRcInVnbGlmeS1qc1wiOiBcIl4yLjYuNFwiLFxuXHRcdFwid2VicGFja1wiOiBcIl4xLjEzLjFcIixcblx0XHRcIndlZXgtbG9hZGVyXCI6IFwiXjAuMi4wXCJcblx0fVxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vcGFja2FnZS5qc29uXG4gKiogbW9kdWxlIGlkID0gNjhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogQGZpbGVPdmVydmlldyBUaGUgYXBpIGZvciBpbnZva2luZyB3aXRoIFwiJFwiIHByZWZpeFxuICovXG5pbXBvcnQgKiBhcyBfIGZyb20gJy4uL3V0aWwnXG5cbi8qKlxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogY29tbW9uXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKi9cblxuLyoqXG4gKiBAZGVwcmVjYXRlZCB1c2UgJHZtIGluc3RlYWRcbiAqIGZpbmQgdGhlIHZtIGJ5IGlkXG4gKiBOb3RlOiB0aGVyZSBpcyBvbmx5IG9uZSBpZCBpbiB3aG9sZSBjb21wb25lbnRcbiAqIEBwYXJhbSAge3N0cmluZ30gaWRcbiAqIEByZXR1cm4ge1ZtfVxuICovXG5leHBvcnQgZnVuY3Rpb24gJCAoaWQpIHtcbiAgXy53YXJuKCdWbSMkIGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgVm0jJHZtIGluc3RlYWQnKVxuICBjb25zdCBpbmZvID0gdGhpcy5faWRzW2lkXVxuICBpZiAoaW5mbykge1xuICAgIHJldHVybiBpbmZvLnZtXG4gIH1cbn1cblxuLyoqXG4gKiBmaW5kIHRoZSBlbGVtZW50IGJ5IGlkXG4gKiBOb3RlOiB0aGVyZSBpcyBvbmx5IG9uZSBpZCBpbiB3aG9sZSBjb21wb25lbnRcbiAqIEBwYXJhbSAge3N0cmluZ30gaWRcbiAqIEByZXR1cm4ge0VsZW1lbnR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiAkZWwgKGlkKSB7XG4gIGNvbnN0IGluZm8gPSB0aGlzLl9pZHNbaWRdXG4gIGlmIChpbmZvKSB7XG4gICAgcmV0dXJuIGluZm8uZWxcbiAgfVxufVxuXG4vKipcbiAqIGZpbmQgdGhlIHZtIG9mIHRoZSBjdXN0b20gY29tcG9uZW50IGJ5IGlkXG4gKiBOb3RlOiB0aGVyZSBpcyBvbmx5IG9uZSBpZCBpbiB3aG9sZSBjb21wb25lbnRcbiAqIEBwYXJhbSAge3N0cmluZ30gaWRcbiAqIEByZXR1cm4ge1ZtfVxuICovXG5leHBvcnQgZnVuY3Rpb24gJHZtIChpZCkge1xuICBjb25zdCBpbmZvID0gdGhpcy5faWRzW2lkXVxuICBpZiAoaW5mbykge1xuICAgIHJldHVybiBpbmZvLnZtXG4gIH1cbn1cblxuLyoqXG4gKiBGaXJlIHdoZW4gZGlmZmVyIHJlbmRlcmluZyBmaW5pc2hlZFxuICpcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBmblxuICovXG5leHBvcnQgZnVuY3Rpb24gJHJlbmRlclRoZW4gKGZuKSB7XG4gIGNvbnN0IGFwcCA9IHRoaXMuX2FwcFxuICBjb25zdCBkaWZmZXIgPSBhcHAuZGlmZmVyXG4gIHJldHVybiBkaWZmZXIudGhlbigoKSA9PiB7XG4gICAgZm4oKVxuICB9KVxufVxuXG4vKipcbiAqIHNjcm9sbCBhbiBlbGVtZW50IHNwZWNpZmllZCBieSBpZCBpbnRvIHZpZXcsXG4gKiBtb3Jlb3ZlciBzcGVjaWZ5IGEgbnVtYmVyIG9mIG9mZnNldCBvcHRpb25hbGx5XG4gKiBAcGFyYW0gIHtzdHJpbmd9IGlkXG4gKiBAcGFyYW0gIHtudW1iZXJ9IG9mZnNldFxuICovXG5leHBvcnQgZnVuY3Rpb24gJHNjcm9sbFRvIChpZCwgb2Zmc2V0KSB7XG4gIF8ud2FybignVm0jJHNjcm9sbFRvIGlzIGRlcHJlY2F0ZWQsICcgK1xuICAgICAgICAgICdwbGVhc2UgdXNlIFwicmVxdWlyZShcXCdAd2VleC1tb2R1bGUvZG9tXFwnKScgK1xuICAgICAgICAgICcuc2Nyb2xsVG8oZWwsIG9wdGlvbnMpXCIgaW5zdGVhZCcpXG4gIGNvbnN0IGVsID0gdGhpcy4kZWwoaWQpXG4gIGlmIChlbCkge1xuICAgIGNvbnN0IGRvbSA9IHRoaXMuX2FwcC5yZXF1aXJlTW9kdWxlKCdkb20nKVxuICAgIGRvbS5zY3JvbGxUb0VsZW1lbnQoZWwucmVmLCB7IG9mZnNldDogb2Zmc2V0IH0pXG4gIH1cbn1cblxuLyoqXG4gKiBwZXJmb3JtIHRyYW5zaXRpb24gYW5pbWF0aW9uIG9uIGFuIGVsZW1lbnQgc3BlY2lmaWVkIGJ5IGlkXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICAgaWRcbiAqIEBwYXJhbSAge29iamVjdH0gICBvcHRpb25zXG4gKiBAcGFyYW0gIHtvYmplY3R9ICAgb3B0aW9ucy5zdHlsZXNcbiAqIEBwYXJhbSAge29iamVjdH0gICBvcHRpb25zLmR1cmF0aW9uKG1zKVxuICogQHBhcmFtICB7b2JqZWN0fSAgIFtvcHRpb25zLnRpbWluZ0Z1bmN0aW9uXVxuICogQHBhcmFtICB7b2JqZWN0fSAgIFtvcHRpb25zLmRlbGF5PTAobXMpXVxuICogQHBhcmFtICB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiAkdHJhbnNpdGlvbiAoaWQsIG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gIGNvbnN0IGVsID0gdGhpcy4kZWwoaWQpXG4gIGlmIChlbCAmJiBvcHRpb25zICYmIG9wdGlvbnMuc3R5bGVzKSB7XG4gICAgY29uc3QgYW5pbWF0aW9uID0gdGhpcy5fYXBwLnJlcXVpcmVNb2R1bGUoJ2FuaW1hdGlvbicpXG4gICAgYW5pbWF0aW9uLnRyYW5zaXRpb24oZWwucmVmLCBvcHRpb25zLCAoLi4uYXJncykgPT4ge1xuICAgICAgdGhpcy5fc2V0U3R5bGUoZWwsIG9wdGlvbnMuc3R5bGVzKVxuICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soLi4uYXJncylcbiAgICB9KVxuICB9XG59XG5cbi8qKlxuICogZ2V0IHNvbWUgY29uZmlnXG4gKiBAcmV0dXJuIHtvYmplY3R9IHNvbWUgY29uZmlnIGZvciBhcHAgaW5zdGFuY2VcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBidW5kbGVVcmxcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gZGVidWdcbiAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBlbnZcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBlbnYud2VleFZlcnNpb24oZXguIDEuMC4wKVxuICogQHByb3BlcnR5IHtzdHJpbmd9IGVudi5hcHBOYW1lKGV4LiBUQi9UTSlcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBlbnYuYXBwVmVyc2lvbihleC4gNS4wLjApXG4gKiBAcHJvcGVydHkge3N0cmluZ30gZW52LnBsYXRmb3JtKGV4LiBpT1MvQW5kcm9pZClcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBlbnYub3NWZXJzaW9uKGV4LiA3LjAuMClcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBlbnYuZGV2aWNlTW9kZWwgKipuYXRpdmUgb25seSoqXG4gKiBAcHJvcGVydHkge251bWJlcn0gZW52LltkZXZpY2VXaWR0aD03NTBdXG4gKiBAcHJvcGVydHkge251bWJlcn0gZW52LmRldmljZUhlaWdodFxuICovXG5leHBvcnQgZnVuY3Rpb24gJGdldENvbmZpZyAoY2FsbGJhY2spIHtcbiAgY29uc3QgY29uZmlnID0gXy5leHRlbmQoe1xuICAgIGVudjogZ2xvYmFsLldYRW52aXJvbm1lbnQgfHwge31cbiAgfSwgdGhpcy5fYXBwLm9wdGlvbnMpXG4gIGlmIChfLnR5cG9mKGNhbGxiYWNrKSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIF8ud2FybigndGhlIGNhbGxiYWNrIG9mIFZtIyRnZXRDb25maWcoY2FsbGJhY2spIGlzIGRlcHJlY2F0ZWQsICcgK1xuICAgICAgJ3RoaXMgYXBpIG5vdyBjYW4gZGlyZWN0bHkgUkVUVVJOIGNvbmZpZyBpbmZvLicpXG4gICAgY2FsbGJhY2soY29uZmlnKVxuICB9XG4gIHJldHVybiBjb25maWdcbn1cblxuLyoqXG4gKiBAZGVwcmVjYXRlZFxuICogcmVxdWVzdCBuZXR3b3JrIHZpYSBodHRwIHByb3RvY29sXG4gKiBAcGFyYW0gIHtvYmplY3R9ICAgcGFyYW1zXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uICRzZW5kSHR0cCAocGFyYW1zLCBjYWxsYmFjaykge1xuICBfLndhcm4oJ1ZtIyRzZW5kSHR0cCBpcyBkZXByZWNhdGVkLCAnICtcbiAgICAgICAgICAncGxlYXNlIHVzZSBcInJlcXVpcmUoXFwnQHdlZXgtbW9kdWxlL3N0cmVhbVxcJyknICtcbiAgICAgICAgICAnLnNlbmRIdHRwKHBhcmFtcywgY2FsbGJhY2spXCIgaW5zdGVhZCcpXG4gIGNvbnN0IHN0cmVhbSA9IHRoaXMuX2FwcC5yZXF1aXJlTW9kdWxlKCdzdHJlYW0nKVxuICBzdHJlYW0uc2VuZEh0dHAocGFyYW1zLCBjYWxsYmFjaylcbn1cblxuLyoqXG4gKiBAZGVwcmVjYXRlZFxuICogb3BlbiBhIHVybFxuICogQHBhcmFtICB7c3RyaW5nfSB1cmxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uICRvcGVuVVJMICh1cmwpIHtcbiAgXy53YXJuKCdWbSMkb3BlblVSTCBpcyBkZXByZWNhdGVkLCAnICtcbiAgICAgICAgICAncGxlYXNlIHVzZSBcInJlcXVpcmUoXFwnQHdlZXgtbW9kdWxlL2V2ZW50XFwnKScgK1xuICAgICAgICAgICcub3BlblVSTCh1cmwpXCIgaW5zdGVhZCcpXG4gIGNvbnN0IGV2ZW50ID0gdGhpcy5fYXBwLnJlcXVpcmVNb2R1bGUoJ2V2ZW50JylcbiAgZXZlbnQub3BlblVSTCh1cmwpXG59XG5cbi8qKlxuICogQGRlcHJlY2F0ZWRcbiAqIHNldCBhIHRpdGxlIGZvciBwYWdlXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHRpdGxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiAkc2V0VGl0bGUgKHRpdGxlKSB7XG4gIF8ud2FybignVm0jJHNldFRpdGxlIGlzIGRlcHJlY2F0ZWQsICcgK1xuICAgICAgICAgICdwbGVhc2UgdXNlIFwicmVxdWlyZShcXCdAd2VleC1tb2R1bGUvcGFnZUluZm9cXCcpJyArXG4gICAgICAgICAgJy5zZXRUaXRsZSh0aXRsZSlcIiBpbnN0ZWFkJylcbiAgY29uc3QgcGFnZUluZm8gPSB0aGlzLl9hcHAucmVxdWlyZU1vZHVsZSgncGFnZUluZm8nKVxuICBwYWdlSW5mby5zZXRUaXRsZSh0aXRsZSlcbn1cblxuLyoqXG4gKiBAZGVwcmVjYXRlZCB1c2UgXCJyZXF1aXJlKCdAd2VleC1tb2R1bGUvbW9kdWxlTmFtZScpIGluc3RlYWRcIlxuICogaW52b2tlIGEgbmF0aXZlIG1ldGhvZCBieSBzcGVjaWZpbmcgdGhlIG5hbWUgb2YgbW9kdWxlIGFuZCBtZXRob2RcbiAqIEBwYXJhbSAge3N0cmluZ30gbW9kdWxlTmFtZVxuICogQHBhcmFtICB7c3RyaW5nfSBtZXRob2ROYW1lXG4gKiBAcGFyYW0gIHsuLi4qfSB0aGUgcmVzdCBhcmd1bWVudHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uICRjYWxsIChtb2R1bGVOYW1lLCBtZXRob2ROYW1lLCAuLi5hcmdzKSB7XG4gIF8ud2FybignVm0jJGNhbGwgaXMgZGVwcmVjYXRlZCwgJyArXG4gICAgJ3BsZWFzZSB1c2UgXCJyZXF1aXJlKFxcJ0B3ZWV4LW1vZHVsZS9tb2R1bGVOYW1lXFwnKVwiIGluc3RlYWQnKVxuICBjb25zdCBtb2R1bGUgPSB0aGlzLl9hcHAucmVxdWlyZU1vZHVsZShtb2R1bGVOYW1lKVxuICBpZiAobW9kdWxlICYmIG1vZHVsZVttZXRob2ROYW1lXSkge1xuICAgIG1vZHVsZVttZXRob2ROYW1lXSguLi5hcmdzKVxuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2h0bWw1L2RlZmF1bHQvYXBpL21ldGhvZHMuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9