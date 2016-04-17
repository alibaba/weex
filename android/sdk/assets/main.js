(this.nativeLog || function(s) {console.log(s)})('START JS FRAMEWORK: 0.13.4');
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
	
	var _framework = __webpack_require__(76);
	
	var framework = _interopRequireWildcard(_framework);
	
	var _package = __webpack_require__(105);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	Object.assign(global, framework, {
	  frameworkVersion: _package.version,
	  needTransformerVersion: _package.optionalDependencies['weex-transformer']
	});
	
	/**
	 * register methods
	 */
	var methods = __webpack_require__(106);
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
	
	__webpack_require__(74);
	
	__webpack_require__(75);

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
	
	var core = module.exports = { version: '2.1.5' };
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
	          if (O[index] === el) return IS_INCLUDES || index;
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
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	// fix Promise Problem on JSContext of iOS7~8
	// @see https://bugs.webkit.org/show_bug.cgi?id=135866
	global.Promise = null;
	__webpack_require__(41);
	__webpack_require__(44);
	__webpack_require__(55);
	__webpack_require__(59);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.3.6 Object.prototype.toString()
	
	var classof = __webpack_require__(42),
	    test = {};
	test[__webpack_require__(43)('toStringTag')] = 'z';
	if (test + '' != '[object z]') {
	  __webpack_require__(18)(Object.prototype, 'toString', function toString() {
	    return '[object ' + classof(this) + ']';
	  }, true);
	}

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(28),
	    TAG = __webpack_require__(43)('toStringTag')
	// ES3 wrong here
	,
	    ARG = cof(function () {
	  return arguments;
	}()) == 'Arguments';
	
	// fallback for IE11 Script Access Denied error
	var tryGet = function tryGet(it, key) {
	  try {
	    return it[key];
	  } catch (e) {/* empty */}
	};
	
	module.exports = function (it) {
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	  // @@toStringTag case
	  : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	  // builtinTag case
	  : ARG ? cof(O)
	  // ES3 arguments fallback
	  : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var store = __webpack_require__(35)('wks'),
	    uid = __webpack_require__(20),
	    _Symbol = __webpack_require__(6).Symbol,
	    USE_SYMBOL = typeof _Symbol == 'function';
	module.exports = function (name) {
	  return store[name] || (store[name] = USE_SYMBOL && _Symbol[name] || (USE_SYMBOL ? _Symbol : uid)('Symbol.' + name));
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $at = __webpack_require__(45)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(46)(String, 'String', function (iterated) {
	  this._t = String(iterated); // target
	  this._i = 0; // next index
	  // 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function () {
	  var O = this._t,
	      index = this._i,
	      point;
	  if (index >= O.length) return { value: undefined, done: true };
	  point = $at(O, index);
	  this._i += point.length;
	  return { value: point, done: false };
	});

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var toInteger = __webpack_require__(32),
	    defined = __webpack_require__(29);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function (TO_STRING) {
	  return function (that, pos) {
	    var s = String(defined(that)),
	        i = toInteger(pos),
	        l = s.length,
	        a,
	        b;
	    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var LIBRARY = __webpack_require__(47),
	    $export = __webpack_require__(5),
	    redefine = __webpack_require__(18),
	    hide = __webpack_require__(8),
	    has = __webpack_require__(19),
	    Iterators = __webpack_require__(48),
	    $iterCreate = __webpack_require__(49),
	    setToStringTag = __webpack_require__(53),
	    getPrototypeOf = __webpack_require__(54),
	    ITERATOR = __webpack_require__(43)('iterator'),
	    BUGGY = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	,
	    FF_ITERATOR = '@@iterator',
	    KEYS = 'keys',
	    VALUES = 'values';
	
	var returnThis = function returnThis() {
	  return this;
	};
	
	module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function getMethod(kind) {
	    if (!BUGGY && kind in proto) return proto[kind];
	    switch (kind) {
	      case KEYS:
	        return function keys() {
	          return new Constructor(this, kind);
	        };
	      case VALUES:
	        return function values() {
	          return new Constructor(this, kind);
	        };
	    }return function entries() {
	      return new Constructor(this, kind);
	    };
	  };
	  var TAG = NAME + ' Iterator',
	      DEF_VALUES = DEFAULT == VALUES,
	      VALUES_BUG = false,
	      proto = Base.prototype,
	      $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT],
	      $default = $native || getMethod(DEFAULT),
	      $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined,
	      $anyNative = NAME == 'Array' ? proto.entries || $native : $native,
	      methods,
	      key,
	      IteratorPrototype;
	  // Fix native
	  if ($anyNative) {
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
	    if (IteratorPrototype !== Object.prototype) {
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEF_VALUES && $native && $native.name !== VALUES) {
	    VALUES_BUG = true;
	    $default = function values() {
	      return $native.call(this);
	    };
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

/***/ },
/* 47 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = false;

/***/ },
/* 48 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = {};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var create = __webpack_require__(50),
	    descriptor = __webpack_require__(17),
	    setToStringTag = __webpack_require__(53),
	    IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(8)(IteratorPrototype, __webpack_require__(43)('iterator'), function () {
	  return this;
	});
	
	module.exports = function (Constructor, NAME, next) {
	  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject = __webpack_require__(10),
	    dPs = __webpack_require__(51),
	    enumBugKeys = __webpack_require__(36),
	    IE_PROTO = __webpack_require__(34)('IE_PROTO'),
	    Empty = function Empty() {/* empty */},
	    PROTOTYPE = 'prototype';
	
	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var _createDict = function createDict() {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(15)('iframe'),
	      i = enumBugKeys.length,
	      gt = '>',
	      iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(52).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write('<script>document.F=Object</script' + gt);
	  iframeDocument.close();
	  _createDict = iframeDocument.F;
	  while (i--) {
	    delete _createDict[PROTOTYPE][enumBugKeys[i]];
	  }return _createDict();
	};
	
	module.exports = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty();
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = _createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var dP = __webpack_require__(9),
	    anObject = __webpack_require__(10),
	    getKeys = __webpack_require__(24);
	
	module.exports = __webpack_require__(13) ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject(O);
	  var keys = getKeys(Properties),
	      length = keys.length,
	      i = 0,
	      P;
	  while (length > i) {
	    dP.f(O, P = keys[i++], Properties[P]);
	  }return O;
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(6).document && document.documentElement;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var def = __webpack_require__(9).f,
	    has = __webpack_require__(19),
	    TAG = __webpack_require__(43)('toStringTag');
	
	module.exports = function (it, tag, stat) {
	  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has = __webpack_require__(19),
	    toObject = __webpack_require__(39),
	    IE_PROTO = __webpack_require__(34)('IE_PROTO'),
	    ObjectProto = Object.prototype;
	
	module.exports = Object.getPrototypeOf || function (O) {
	  O = toObject(O);
	  if (has(O, IE_PROTO)) return O[IE_PROTO];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  }return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $iterators = __webpack_require__(56),
	    redefine = __webpack_require__(18),
	    global = __webpack_require__(6),
	    hide = __webpack_require__(8),
	    Iterators = __webpack_require__(48),
	    wks = __webpack_require__(43),
	    ITERATOR = wks('iterator'),
	    TO_STRING_TAG = wks('toStringTag'),
	    ArrayValues = Iterators.Array;
	
	for (var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++) {
	  var NAME = collections[i],
	      Collection = global[NAME],
	      proto = Collection && Collection.prototype,
	      key;
	  if (proto) {
	    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
	    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
	    Iterators[NAME] = ArrayValues;
	    for (key in $iterators) {
	      if (!proto[key]) redefine(proto, key, $iterators[key], true);
	    }
	  }
	}

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addToUnscopables = __webpack_require__(57),
	    step = __webpack_require__(58),
	    Iterators = __webpack_require__(48),
	    toIObject = __webpack_require__(26);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(46)(Array, 'Array', function (iterated, kind) {
	  this._t = toIObject(iterated); // target
	  this._i = 0; // next index
	  this._k = kind; // kind
	  // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function () {
	  var O = this._t,
	      kind = this._k,
	      index = this._i++;
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

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 22.1.3.31 Array.prototype[@@unscopables]
	var UNSCOPABLES = __webpack_require__(43)('unscopables'),
	    ArrayProto = Array.prototype;
	if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__(8)(ArrayProto, UNSCOPABLES, {});
	module.exports = function (key) {
	  ArrayProto[UNSCOPABLES][key] = true;
	};

/***/ },
/* 58 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function (done, value) {
	  return { value: value, done: !!done };
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var LIBRARY = __webpack_require__(47),
	    global = __webpack_require__(6),
	    ctx = __webpack_require__(21),
	    classof = __webpack_require__(42),
	    $export = __webpack_require__(5),
	    isObject = __webpack_require__(11),
	    anObject = __webpack_require__(10),
	    aFunction = __webpack_require__(22),
	    anInstance = __webpack_require__(60),
	    forOf = __webpack_require__(61),
	    setProto = __webpack_require__(65).set,
	    speciesConstructor = __webpack_require__(67),
	    task = __webpack_require__(68).set,
	    microtask = __webpack_require__(70),
	    PROMISE = 'Promise',
	    TypeError = global.TypeError,
	    process = global.process,
	    $Promise = global[PROMISE],
	    process = global.process,
	    isNode = classof(process) == 'process',
	    empty = function empty() {/* empty */},
	    Internal,
	    GenericPromiseCapability,
	    Wrapper;
	
	var USE_NATIVE = !!function () {
	  try {
	    // correct subclassing with @@species support
	    var promise = $Promise.resolve(1),
	        FakePromise = (promise.constructor = {})[__webpack_require__(43)('species')] = function (exec) {
	      exec(empty, empty);
	    };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
	  } catch (e) {/* empty */}
	}();
	
	// helpers
	var sameConstructor = function sameConstructor(a, b) {
	  // with library wrapper special case
	  return a === b || a === $Promise && b === Wrapper;
	};
	var isThenable = function isThenable(it) {
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var newPromiseCapability = function newPromiseCapability(C) {
	  return sameConstructor($Promise, C) ? new PromiseCapability(C) : new GenericPromiseCapability(C);
	};
	var PromiseCapability = GenericPromiseCapability = function GenericPromiseCapability(C) {
	  var resolve, reject;
	  this.promise = new C(function ($$resolve, $$reject) {
	    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject = $$reject;
	  });
	  this.resolve = aFunction(resolve);
	  this.reject = aFunction(reject);
	};
	var perform = function perform(exec) {
	  try {
	    exec();
	  } catch (e) {
	    return { error: e };
	  }
	};
	var notify = function notify(promise, isReject) {
	  if (promise._n) return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function () {
	    var value = promise._v,
	        ok = promise._s == 1,
	        i = 0;
	    var run = function run(reaction) {
	      var handler = ok ? reaction.ok : reaction.fail,
	          resolve = reaction.resolve,
	          reject = reaction.reject,
	          domain = reaction.domain,
	          result,
	          then;
	      try {
	        if (handler) {
	          if (!ok) {
	            if (promise._h == 2) onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if (handler === true) result = value;else {
	            if (domain) domain.enter();
	            result = handler(value);
	            if (domain) domain.exit();
	          }
	          if (result === reaction.promise) {
	            reject(TypeError('Promise-chain cycle'));
	          } else if (then = isThenable(result)) {
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch (e) {
	        reject(e);
	      }
	    };
	    while (chain.length > i) {
	      run(chain[i++]);
	    } // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if (isReject && !promise._h) onUnhandled(promise);
	  });
	};
	var onUnhandled = function onUnhandled(promise) {
	  task.call(global, function () {
	    var value = promise._v,
	        abrupt,
	        handler,
	        console;
	    if (isUnhandled(promise)) {
	      abrupt = perform(function () {
	        if (isNode) {
	          process.emit('unhandledRejection', value, promise);
	        } else if (handler = global.onunhandledrejection) {
	          handler({ promise: promise, reason: value });
	        } else if ((console = global.console) && console.error) {
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
	    }promise._a = undefined;
	    if (abrupt) throw abrupt.error;
	  });
	};
	var isUnhandled = function isUnhandled(promise) {
	  if (promise._h == 1) return false;
	  var chain = promise._a || promise._c,
	      i = 0,
	      reaction;
	  while (chain.length > i) {
	    reaction = chain[i++];
	    if (reaction.fail || !isUnhandled(reaction.promise)) return false;
	  }return true;
	};
	var onHandleUnhandled = function onHandleUnhandled(promise) {
	  task.call(global, function () {
	    var handler;
	    if (isNode) {
	      process.emit('rejectionHandled', promise);
	    } else if (handler = global.onrejectionhandled) {
	      handler({ promise: promise, reason: promise._v });
	    }
	  });
	};
	var $reject = function $reject(value) {
	  var promise = this;
	  if (promise._d) return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if (!promise._a) promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function $resolve(value) {
	  var promise = this,
	      then;
	  if (promise._d) return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if (promise === value) throw TypeError("Promise can't be resolved itself");
	    if (then = isThenable(value)) {
	      microtask(function () {
	        var wrapper = { _w: promise, _d: false }; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch (e) {
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch (e) {
	    $reject.call({ _w: promise, _d: false }, e); // wrap
	  }
	};
	
	// constructor polyfill
	if (!USE_NATIVE) {
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor) {
	    anInstance(this, $Promise, PROMISE, '_h');
	    aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
	    } catch (err) {
	      $reject.call(this, err);
	    }
	  };
	  Internal = function Promise(executor) {
	    this._c = []; // <- awaiting reactions
	    this._a = undefined; // <- checked in isUnhandled reactions
	    this._s = 0; // <- state
	    this._d = false; // <- done
	    this._v = undefined; // <- value
	    this._h = 0; // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false; // <- notify
	  };
	  Internal.prototype = __webpack_require__(71)($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected) {
	      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
	      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode ? process.domain : undefined;
	      this._c.push(reaction);
	      if (this._a) this._a.push(reaction);
	      if (this._s) notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function _catch(onRejected) {
	      return this.then(undefined, onRejected);
	    }
	  });
	  PromiseCapability = function PromiseCapability() {
	    var promise = new Internal();
	    this.promise = promise;
	    this.resolve = ctx($resolve, promise, 1);
	    this.reject = ctx($reject, promise, 1);
	  };
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
	__webpack_require__(53)($Promise, PROMISE);
	__webpack_require__(72)(PROMISE);
	Wrapper = __webpack_require__(7)[PROMISE];
	
	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r) {
	    var capability = newPromiseCapability(this),
	        $$reject = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x) {
	    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
	    if (x instanceof $Promise && sameConstructor(x.constructor, this)) return x;
	    var capability = newPromiseCapability(this),
	        $$resolve = capability.resolve;
	    $$resolve(x);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(73)(function (iter) {
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable) {
	    var C = this,
	        capability = newPromiseCapability(C),
	        resolve = capability.resolve,
	        reject = capability.reject;
	    var abrupt = perform(function () {
	      var values = [],
	          index = 0,
	          remaining = 1;
	      forOf(iterable, false, function (promise) {
	        var $index = index++,
	            alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function (value) {
	          if (alreadyCalled) return;
	          alreadyCalled = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if (abrupt) reject(abrupt.error);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable) {
	    var C = this,
	        capability = newPromiseCapability(C),
	        reject = capability.reject;
	    var abrupt = perform(function () {
	      forOf(iterable, false, function (promise) {
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if (abrupt) reject(abrupt.error);
	    return capability.promise;
	  }
	});

/***/ },
/* 60 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function (it, Constructor, name, forbiddenField) {
	  if (!(it instanceof Constructor) || forbiddenField !== undefined && forbiddenField in it) {
	    throw TypeError(name + ': incorrect invocation!');
	  }return it;
	};

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var ctx = __webpack_require__(21),
	    call = __webpack_require__(62),
	    isArrayIter = __webpack_require__(63),
	    anObject = __webpack_require__(10),
	    toLength = __webpack_require__(31),
	    getIterFn = __webpack_require__(64);
	module.exports = function (iterable, entries, fn, that, ITERATOR) {
	  var iterFn = ITERATOR ? function () {
	    return iterable;
	  } : getIterFn(iterable),
	      f = ctx(fn, that, entries ? 2 : 1),
	      index = 0,
	      length,
	      step,
	      iterator;
	  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
	    entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
	    call(iterator, f, step.value, entries);
	  }
	};

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(10);
	module.exports = function (iterator, fn, value, entries) {
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	    // 7.4.6 IteratorClose(iterator, completion)
	  } catch (e) {
	    var ret = iterator['return'];
	    if (ret !== undefined) anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// check on default Array iterator
	var Iterators = __webpack_require__(48),
	    ITERATOR = __webpack_require__(43)('iterator'),
	    ArrayProto = Array.prototype;
	
	module.exports = function (it) {
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var classof = __webpack_require__(42),
	    ITERATOR = __webpack_require__(43)('iterator'),
	    Iterators = __webpack_require__(48);
	module.exports = __webpack_require__(7).getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR] || it['@@iterator'] || Iterators[classof(it)];
	};

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(11),
	    anObject = __webpack_require__(10);
	var check = function check(O, proto) {
	  anObject(O);
	  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	  function (test, buggy, set) {
	    try {
	      set = __webpack_require__(21)(Function.call, __webpack_require__(66).f(Object.prototype, '__proto__').set, 2);
	      set(test, []);
	      buggy = !(test instanceof Array);
	    } catch (e) {
	      buggy = true;
	    }
	    return function setPrototypeOf(O, proto) {
	      check(O, proto);
	      if (buggy) O.__proto__ = proto;else set(O, proto);
	      return O;
	    };
	  }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var pIE = __webpack_require__(38),
	    createDesc = __webpack_require__(17),
	    toIObject = __webpack_require__(26),
	    toPrimitive = __webpack_require__(16),
	    has = __webpack_require__(19),
	    IE8_DOM_DEFINE = __webpack_require__(12),
	    gOPD = Object.getOwnPropertyDescriptor;
	
	exports.f = __webpack_require__(13) ? gOPD : function getOwnPropertyDescriptor(O, P) {
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if (IE8_DOM_DEFINE) try {
	    return gOPD(O, P);
	  } catch (e) {/* empty */}
	  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject = __webpack_require__(10),
	    aFunction = __webpack_require__(22),
	    SPECIES = __webpack_require__(43)('species');
	module.exports = function (O, D) {
	  var C = anObject(O).constructor,
	      S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var ctx = __webpack_require__(21),
	    invoke = __webpack_require__(69),
	    html = __webpack_require__(52),
	    cel = __webpack_require__(15),
	    global = __webpack_require__(6),
	    process = global.process,
	    setTask = global.setImmediate,
	    clearTask = global.clearImmediate,
	    MessageChannel = global.MessageChannel,
	    counter = 0,
	    queue = {},
	    ONREADYSTATECHANGE = 'onreadystatechange',
	    defer,
	    channel,
	    port;
	var run = function run() {
	  var id = +this;
	  if (queue.hasOwnProperty(id)) {
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function listener(event) {
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if (!setTask || !clearTask) {
	  setTask = function setImmediate(fn) {
	    var args = [],
	        i = 1;
	    while (arguments.length > i) {
	      args.push(arguments[i++]);
	    }queue[++counter] = function () {
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id) {
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if (__webpack_require__(28)(process) == 'process') {
	    defer = function defer(id) {
	      process.nextTick(ctx(run, id, 1));
	    };
	    // Browsers with MessageChannel, includes WebWorkers
	  } else if (MessageChannel) {
	      channel = new MessageChannel();
	      port = channel.port2;
	      channel.port1.onmessage = listener;
	      defer = ctx(port.postMessage, port, 1);
	      // Browsers with postMessage, skip WebWorkers
	      // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	    } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
	        defer = function defer(id) {
	          global.postMessage(id + '', '*');
	        };
	        global.addEventListener('message', listener, false);
	        // IE8-
	      } else if (ONREADYSTATECHANGE in cel('script')) {
	          defer = function defer(id) {
	            html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
	              html.removeChild(this);
	              run.call(id);
	            };
	          };
	          // Rest old browsers
	        } else {
	            defer = function defer(id) {
	              setTimeout(ctx(run, id, 1), 0);
	            };
	          }
	}
	module.exports = {
	  set: setTask,
	  clear: clearTask
	};

/***/ },
/* 69 */
/***/ function(module, exports) {

	"use strict";
	
	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function (fn, args, that) {
	                  var un = that === undefined;
	                  switch (args.length) {
	                                    case 0:
	                                                      return un ? fn() : fn.call(that);
	                                    case 1:
	                                                      return un ? fn(args[0]) : fn.call(that, args[0]);
	                                    case 2:
	                                                      return un ? fn(args[0], args[1]) : fn.call(that, args[0], args[1]);
	                                    case 3:
	                                                      return un ? fn(args[0], args[1], args[2]) : fn.call(that, args[0], args[1], args[2]);
	                                    case 4:
	                                                      return un ? fn(args[0], args[1], args[2], args[3]) : fn.call(that, args[0], args[1], args[2], args[3]);
	                  }return fn.apply(that, args);
	};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var global = __webpack_require__(6),
	    macrotask = __webpack_require__(68).set,
	    Observer = global.MutationObserver || global.WebKitMutationObserver,
	    process = global.process,
	    Promise = global.Promise,
	    isNode = __webpack_require__(28)(process) == 'process',
	    head,
	    last,
	    notify;
	
	var flush = function flush() {
	  var parent, fn;
	  if (isNode && (parent = process.domain)) parent.exit();
	  while (head) {
	    fn = head.fn;
	    fn(); // <- currently we use it only for Promise - try / catch not required
	    head = head.next;
	  }last = undefined;
	  if (parent) parent.enter();
	};
	
	// Node.js
	if (isNode) {
	  notify = function notify() {
	    process.nextTick(flush);
	  };
	  // browsers with MutationObserver
	} else if (Observer) {
	    var toggle = true,
	        node = document.createTextNode('');
	    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
	    notify = function notify() {
	      node.data = toggle = !toggle;
	    };
	    // environments with maybe non-completely correct, but existent Promise
	  } else if (Promise && Promise.resolve) {
	      notify = function notify() {
	        Promise.resolve().then(flush);
	      };
	      // for other environments - macrotask based on:
	      // - setImmediate
	      // - MessageChannel
	      // - window.postMessag
	      // - onreadystatechange
	      // - setTimeout
	    } else {
	        notify = function notify() {
	          // strange IE + webpack dev server bug - use .call(global)
	          macrotask.call(global, flush);
	        };
	      }
	
	module.exports = function (fn) {
	  var task = { fn: fn, next: undefined };
	  if (last) last.next = task;
	  if (!head) {
	    head = task;
	    notify();
	  }last = task;
	};

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var redefine = __webpack_require__(18);
	module.exports = function (target, src, safe) {
	  for (var key in src) {
	    redefine(target, key, src[key], safe);
	  }return target;
	};

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var global = __webpack_require__(6),
	    dP = __webpack_require__(9),
	    DESCRIPTORS = __webpack_require__(13),
	    SPECIES = __webpack_require__(43)('species');
	
	module.exports = function (KEY) {
	  var C = global[KEY];
	  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
	    configurable: true,
	    get: function get() {
	      return this;
	    }
	  });
	};

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var ITERATOR = __webpack_require__(43)('iterator'),
	    SAFE_CLOSING = false;
	
	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function () {
	    SAFE_CLOSING = true;
	  };
	  Array.from(riter, function () {
	    throw 2;
	  });
	} catch (e) {/* empty */}
	
	module.exports = function (exec, skipClosing) {
	  if (!skipClosing && !SAFE_CLOSING) return false;
	  var safe = false;
	  try {
	    var arr = [7],
	        iter = arr[ITERATOR]();
	    iter.next = function () {
	      safe = true;
	    };
	    arr[ITERATOR] = function () {
	      return iter;
	    };
	    exec(arr);
	  } catch (e) {/* empty */}
	  return safe;
	};

/***/ },
/* 74 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var _global = global;
	var setTimeout = _global.setTimeout;
	var setTimeoutNative = _global.setTimeoutNative;
	
	// fix no setTimeout on Android V8
	
	if (typeof setTimeout === 'undefined' && typeof setTimeoutNative === 'function') {
	  (function () {
	    var timeoutMap = {};
	    var timeoutId = 0;
	    global.setTimeout = function (cb, time) {
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
/* 75 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var _global = global;
	var console = _global.console;
	
	
	if (typeof console === 'undefined') {
	  global.console = {
	    log: function log() {
	      if (typeof nativeLog === 'function') {
	        nativeLog.apply(undefined, arguments);
	      }
	    },
	    error: function error() {
	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }
	
	      throw new Error(args);
	    }
	  };
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 76 */
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
	
	exports.createInstance = createInstance;
	exports.refreshInstance = refreshInstance;
	exports.destroyInstance = destroyInstance;
	exports.registerComponents = registerComponents;
	exports.registerModules = registerModules;
	exports.registerMethods = registerMethods;
	exports.getRoot = getRoot;
	exports.callJS = callJS;
	
	var _perf = __webpack_require__(77);
	
	var perf = _interopRequireWildcard(_perf);
	
	var _config = __webpack_require__(79);
	
	var config = _interopRequireWildcard(_config);
	
	var _app = __webpack_require__(80);
	
	var _app2 = _interopRequireDefault(_app);
	
	var _vm = __webpack_require__(85);
	
	var _vm2 = _interopRequireDefault(_vm);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var nativeComponentMap = config.nativeComponentMap;
	
	var instanceMap = {};
	
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
	
	  config.debug = options.debug;
	
	  var result;
	  if (!instance) {
	    perf.start('createInstance', instanceId);
	    instance = new _app2.default(instanceId, options);
	    instanceMap[instanceId] = instance;
	    result = instance.init(code, data);
	    perf.end('createInstance', instanceId);
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
	  var result;
	  if (instance) {
	    perf.start('refreshData', instanceId);
	    result = instance.refreshData(data);
	    perf.end('refreshData', instanceId);
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
	
	  perf.start('destroyInstance', instanceId);
	  instance.destroy();
	  delete instanceMap[instanceId];
	  perf.end('destroyInstance', instanceId);
	
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
	  var result;
	  if (instance) {
	    result = instance.getRootElement();
	  } else {
	    result = new Error('invalid instance id "' + instanceId + '"');
	  }
	  return result;
	}
	
	var jsHandlers = {
	  fireEvent: function fireEvent(instanceId, ref, type, data) {
	    var instance = instanceMap[instanceId];
	    var result;
	    perf.start('fireEvent', instanceId + '-' + ref + '-' + type);
	    result = instance.fireEvent(ref, type, data);
	    perf.end('fireEvent', instanceId + '-' + ref + '-' + type);
	    return result;
	  },
	
	  callback: function callback(instanceId, funcId, data, ifLast) {
	    var instance = instanceMap[instanceId];
	    var result;
	    perf.start('callback', instanceId + '-' + funcId + '-' + data + '-' + ifLast);
	    result = instance.callback(funcId, data, ifLast);
	    perf.end('callback', instanceId + '-' + funcId + '-' + data + '-' + ifLast);
	    return result;
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
	  var results = [];
	  if (instance && Array.isArray(tasks)) {
	    tasks.forEach(function (task) {
	      var handler = jsHandlers[task.method];
	      var args = [].concat(_toConsumableArray(task.args));
	      if (typeof handler === 'function') {
	        log('javascript:', task.method, task.args);
	        args.unshift(instanceId);
	        results.push(handler.apply(undefined, _toConsumableArray(args)));
	      }
	    });
	  } else {
	    results.push(new Error('invalid instance id "' + instanceId + '" or tasks'));
	  }
	
	  return results;
	}

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.start = start;
	exports.end = end;
	exports.reset = reset;
	exports.toJSON = toJSON;
	
	var _log = __webpack_require__(78);
	
	var _log2 = _interopRequireDefault(_log);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var data = { type: 'root', children: [] };
	var current = data;
	var stack = [current];
	
	function spaces(num) {
	  return Array(num).join(' ');
	}
	
	function start(type, id) {
	  var task = { type: type, id: id, children: [], start: Date.now() };
	  current.children.push(task);
	  stack.push(task);
	  current = task;
	  (0, _log2.default)('perf:' + spaces(stack.length - 1), 'start', task.type, task.id);
	}
	
	function end(type, id) {
	  var task = stack.pop();
	  task.end = Date.now();
	  current = stack[stack.length - 1];
	  (0, _log2.default)('perf:' + spaces(stack.length), 'end', task.end - task.start + 'ms', task.type, task.id);
	}
	
	function reset() {
	  data.children = [];
	  current = data;
	  stack.length = 0;
	  stack.push(current);
	}
	
	function toJSON() {
	  return JSON.parse(JSON.stringify(data));
	}

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = log;
	
	var _config = __webpack_require__(79);
	
	var config = _interopRequireWildcard(_config);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function log() {
	  if (config.debug) {
	    var _global$console;
	
	    (_global$console = global.console).log.apply(_global$console, arguments);
	  }
	}
	
	global.log = log;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 79 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var nativeComponentMap = exports.nativeComponentMap = {
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
	};
	
	var customComponentMap = exports.customComponentMap = {};
	
	var debug = exports.debug = false;

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = AppInstance;
	
	var _util = __webpack_require__(81);
	
	var _perf = __webpack_require__(77);
	
	var perf = _interopRequireWildcard(_perf);
	
	var _bundle = __webpack_require__(82);
	
	var bundle = _interopRequireWildcard(_bundle);
	
	var _ctrl = __webpack_require__(100);
	
	var ctrl = _interopRequireWildcard(_ctrl);
	
	var _differ = __webpack_require__(102);
	
	var _differ2 = _interopRequireDefault(_differ);
	
	var _event = __webpack_require__(103);
	
	var _event2 = _interopRequireDefault(_event);
	
	var _domListener = __webpack_require__(101);
	
	var _domListener2 = _interopRequireDefault(_domListener);
	
	var _dom = __webpack_require__(104);
	
	var _register = __webpack_require__(98);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function AppInstance(instanceId, options) {
	  var _this = this;
	
	  perf.start('initInstance', instanceId);
	  this.id = instanceId;
	  this.options = options || {};
	  this.vm = null;
	  this.doc = new _dom.Document(instanceId);
	  this.customComponentMap = {};
	  this.callbacks = {};
	  this.differ = new _differ2.default(instanceId);
	  this.uid = 0;
	  this.rendered = false;
	  this.eventManager = new _event2.default();
	  this.listener = new _domListener2.default(this.id, function (tasks) {
	    _this.callTasks(tasks);
	  });
	  this.doc.setEventManager(this.eventManager);
	  this.doc.setListener(this.listener);
	
	  perf.end('initInstance', instanceId);
	} /**
	   * @fileOverview
	   * Weex instance constructor & definition
	   */
	
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
	      if (v instanceof _dom.Node) {
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
	  var _this2 = this;
	
	  if ((0, _util.typof)(tasks) !== 'array') {
	    tasks = [tasks];
	  }
	
	  tasks.forEach(function (task) {
	    task.args = task.args.map(function (arg) {
	      return normalize(_this2, arg);
	    });
	  });
	
	  callNative(this.id, tasks, '-1');
	};
	
	(0, _util.extend)(AppInstance.prototype, bundle, ctrl, {
	  registerComponent: _register.registerComponent,
	  requireComponent: _register.requireComponent,
	  requireModule: _register.requireModule
	});

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.warn = exports.log = exports.indexOf = exports.define = exports.normalize = exports.typof = exports.stringify = exports.isArray = exports.isPlainObject = exports.isObject = exports.extend = exports.toArray = exports.bind = exports.camelize = exports.isReserved = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /// lang.js
	
	
	var _config2 = __webpack_require__(79);
	
	var _config3 = _interopRequireDefault(_config2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Check is a string starts with $ or _
	 *
	 * @param {String} str
	 * @return {Boolean}
	 */
	
	var isReserved = exports.isReserved = function isReserved(str) {
	  var c = (str + '').charCodeAt(0);
	  return c === 0x24 || c === 0x5F;
	};
	
	/**
	 * Camelize a hyphen-delmited string.
	 *
	 * @param {String} str
	 * @return {String}
	 */
	
	var camelRE = /-(\w)/g;
	function toUpper(_, c) {
	  return c ? c.toUpperCase() : '';
	}
	var camelize = exports.camelize = function camelize(str) {
	  return str.replace(camelRE, toUpper);
	};
	
	/**
	 * Simple bind, faster than native
	 *
	 * @param {Function} fn
	 * @param {Object} ctx
	 * @return {Function}
	 */
	
	var bind = exports.bind = function bind(fn, ctx) {
	  return function (a) {
	    var l = arguments.length;
	    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
	  };
	};
	
	/**
	 * Convert an Array-like object to a real Array.
	 *
	 * @param {Array-like} list
	 * @param {Number} [start] - start index
	 * @return {Array}
	 */
	
	var toArray = exports.toArray = function toArray(list, start) {
	  start = start || 0;
	  var i = list.length - start;
	  var ret = new Array(i);
	  while (i--) {
	    ret[i] = list[i + start];
	  }
	  return ret;
	};
	
	/**
	 * Mix properties into target object.
	 *
	 * @param {Object} to
	 * @param {Object} from
	 */
	
	var extend = exports.extend = function extend(target) {
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
	};
	
	/**
	 * Quick object check - this is primarily used to tell
	 * Objects from primitive values when we know the value
	 * is a JSON-compliant type.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */
	
	var isObject = exports.isObject = function isObject(obj) {
	  return !!(obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object');
	};
	
	/**
	 * Strict object type check. Only returns true
	 * for plain JavaScript objects.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */
	
	var toString = Object.prototype.toString;
	var isPlainObject = exports.isPlainObject = function isPlainObject(obj) {
	  return toString.call(obj) === '[object Object]';
	};
	
	/**
	 * Array type check.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */
	
	var isArray = exports.isArray = function isArray(obj) {
	  return Array.isArray(obj);
	};
	
	var stringify = exports.stringify = function stringify(x) {
	  return typeof x === 'undefined' || x === null || typeof x === 'function' ? '' : (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object' ? x instanceof RegExp ? x.toString() : x instanceof Date ? JSON.parse(JSON.stringify(x)) : JSON.stringify(x) : x.toString();
	};
	
	var typof = exports.typof = function typof(v) {
	  var s = Object.prototype.toString.call(v);
	  return s.substring(8, s.length - 1).toLowerCase();
	};
	
	var normalize = exports.normalize = function normalize(v) {
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
	    default:
	      return JSON.stringify(v);
	  }
	};
	
	/**
	 * Define a non-enumerable property
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @param {*} val
	 * @param {Boolean} [enumerable]
	 */
	
	var define = exports.define = function define(obj, key, val, enumerable) {
	  Object.defineProperty(obj, key, {
	    value: val,
	    enumerable: !!enumerable,
	    writable: true,
	    configurable: true
	  });
	};
	
	/**
	 * Manual indexOf because it's slightly faster than
	 * native.
	 *
	 * @param {Array} arr
	 * @param {*} obj
	 */
	
	var indexOf = exports.indexOf = function indexOf(arr, obj) {
	  for (var i = 0, l = arr.length; i < l; i++) {
	    if (arr[i] === obj) return i;
	  }
	  return -1;
	};
	
	/// debug.js
	
	var hasConsole = typeof console !== 'undefined';
	
	/**
	 * Log a message.
	 *
	 * @param {String} msg
	 */
	
	var log = exports.log = function log(msg) {
	  var _config = _config3.default || {};
	  if (hasConsole && _config.debug) {
	    console.log.call(undefined, '[info]: ', msg);
	  }
	};
	
	/**
	 * We've got a problem here.
	 *
	 * @param {String} msg
	 */
	
	var warn = exports.warn = function warn(msg) {
	  // if (hasConsole && (!config.silent || config.debug)) {
	  if (hasConsole) {
	    console.warn.call(undefined, '[warn]: ', msg);
	    /* istanbul ignore if */
	    // if (config.debug) {
	    //   /* jshint debug: true */
	    //   debugger
	    // }
	  }
	};

/***/ },
/* 82 */
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
	
	var _semver = __webpack_require__(83);
	
	var _semver2 = _interopRequireDefault(_semver);
	
	var _util = __webpack_require__(81);
	
	var _ = _interopRequireWildcard(_util);
	
	var _config = __webpack_require__(79);
	
	var config = _interopRequireWildcard(_config);
	
	var _perf = __webpack_require__(77);
	
	var perf = _interopRequireWildcard(_perf);
	
	var _vm = __webpack_require__(85);
	
	var _vm2 = _interopRequireDefault(_vm);
	
	var _downgrade = __webpack_require__(99);
	
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
	
	var WEEX_COMPONENT_REG = /^\@weex-component\//;
	var WEEX_MODULE_REG = /^\@weex-module\//;
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
	
	  perf.start('define', name);
	
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
	
	  perf.end('define', name);
	};
	
	function bootstrap(name, config, data) {
	  var cleanName = void 0;
	
	  if (isWeexComponent(name)) {
	    cleanName = removeWeexPrefix(name);
	  } else if (isNpmModule(name)) {
	    cleanName = removeJSSurfix(name);
	    // check if define by old 'define' method
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
	
	  var _checkDowngrade = downgrade.check(config.downgrade, this.options);
	  if (_checkDowngrade.isDowngrade) {
	    this.callTasks([{
	      module: 'instanceWrap',
	      method: 'error',
	      args: [_checkDowngrade.errorType, _checkDowngrade.code, _checkDowngrade.errorMessage]
	    }]);
	    return new Error('Downgrade: ' + config.downgrade);
	  }
	
	  perf.start('create vm', cleanName);
	
	  this.vm = new _vm2.default(cleanName, { _app: this }, null, data, {
	    'hook:ready': function hookReady() {
	      perf.end('create vm', cleanName);
	    }
	  });
	}
	
	/**
	 * @deprecated
	 */
	function register(type, options) {
	  perf.start('register', type);
	  this.registerComponent(type, options);
	  perf.end('register', type);
	}
	
	/**
	 * @deprecated
	 */
	function render(type, data) {
	  return this.bootstrap(type, {}, data);
	}
	
	/**
	 * @deprecated
	 */
	function _require2(type) {
	  var _this2 = this;
	
	  return function (data) {
	    return _this2.bootstrap(type, {}, data);
	  };
	}
	exports.require = _require2;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 83 */
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
	      // ~1.2 == >=1.2.0- <1.3.0-
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(84)))

/***/ },
/* 84 */
/***/ function(module, exports) {

	'use strict';
	
	// shim for using process in browser
	
	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
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
	    var timeout = setTimeout(cleanUpNextTick);
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
	    clearTimeout(timeout);
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
	        setTimeout(drainQueue, 0);
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
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Vm;
	
	var _util = __webpack_require__(81);
	
	var _scope = __webpack_require__(86);
	
	var scope = _interopRequireWildcard(_scope);
	
	var _compiler = __webpack_require__(93);
	
	var compiler = _interopRequireWildcard(_compiler);
	
	var _directive = __webpack_require__(94);
	
	var directive = _interopRequireWildcard(_directive);
	
	var _domHelper = __webpack_require__(96);
	
	var domHelper = _interopRequireWildcard(_domHelper);
	
	var _events = __webpack_require__(97);
	
	var events = _interopRequireWildcard(_events);
	
	var _register = __webpack_require__(98);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function callOldReadyEntry(vm, component) {
	  if (component.methods && component.methods.ready) {
	    component.methods.ready.call(vm);
	  }
	}
	
	/**
	 * ViewModel constructor
	 *
	 * @param {string} type
	 * @param {object} parentVm   which contains _app
	 * @param {object} parentEl   root element or frag block
	 * @param {object} mergedData external data
	 * @param {object} externalEvents external events
	 */
	
	// import * as modules from './../api/modules'
	// import * as api from './../api/api'
	
	/**
	 * @fileOverview
	 * ViewModel Constructor & definition
	 */
	
	function Vm(type, parentVm, parentEl, mergedData, externalEvents) {
	  this._parent = parentVm._realParent ? parentVm._realParent : parentVm;
	  this._app = parentVm._app;
	  parentVm._childrenVms && parentVm._childrenVms.push(this);
	
	  var component = this._app.customComponentMap[type] || {};
	  var data = component.data || {};
	
	  this._options = component;
	  this._methods = component.methods || {};
	  this._css = component.style || {};
	  this._ids = {};
	  this._watchers = [];
	  this._vmEvents = {};
	  this._childrenVms = [];
	  this._type = type;
	
	  // bind events and lifecycles
	  this._initEvents(externalEvents);
	
	  this.$emit('hook:init');
	  this._inited = true;
	  // proxy data and methods
	  // observe data and add this to vms
	  this._data = typeof data === 'function' ? data() : data;
	  if (mergedData) {
	    (0, _util.extend)(this._data, mergedData);
	  }
	  this._initScope();
	
	  this.$emit('hook:created');
	  this._created = true;
	  // backward old ready entry
	  callOldReadyEntry(this, component);
	
	  // if no parentElement then specify the documentElement
	  this._parentEl = parentEl || this._app.doc.documentElement;
	  this._build();
	}
	
	(0, _util.extend)(Vm.prototype, scope, compiler, directive, domHelper, events);
	(0, _util.extend)(Vm, {
	  registerModules: _register.registerModules,
	  registerMethods: _register.registerMethods
	});
	// Vm.registerModules(modules)

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _ = __webpack_require__(87);
	var Observer = __webpack_require__(88);
	var Dep = __webpack_require__(90);
	
	/**
	 * Setup the scope of an instance, which contains:
	 * - observed data
	 * - computed properties
	 * - user methods
	 * - meta properties
	 */
	
	exports._initScope = function () {
	  this._initData();
	  // this._initComputed()
	  this._initMethods();
	  // this._initMeta()
	};
	
	/**
	 * Initialize the data. 
	 */
	
	exports._initData = function () {
	  // proxy data on instance
	  var data = this._data;
	  var i, key;
	  // // make sure all props properties are observed
	  // var props = this.$options.props
	  // if (props) {
	  //   i = props.length
	  //   while (i--) {
	  //     key = _.camelize(props[i])
	  //     if (!(key in data)) {
	  //       data[key] = null
	  //     }
	  //   }
	  // }
	  var keys = Object.keys(data);
	  i = keys.length;
	  while (i--) {
	    key = keys[i];
	    if (!_.isReserved(key)) {
	      this._proxy(key);
	    }
	  }
	  // observe data
	  Observer.create(data).addVm(this);
	};
	
	// /**
	//  * Swap the isntance's $data. Called in $data's setter.
	//  *
	//  * @param {Object} newData
	//  */
	
	// exports._setData = function (newData) {
	//   newData = newData || {}
	//   var oldData = this._data
	//   this._data = newData
	//   var keys, key, i
	//   // unproxy keys not present in new data
	//   keys = Object.keys(oldData)
	//   i = keys.length
	//   while (i--) {
	//     key = keys[i]
	//     if (!_.isReserved(key) && !(key in newData)) {
	//       this._unproxy(key)
	//     }
	//   }
	//   // proxy keys not already proxied,
	//   // and trigger change for changed values
	//   keys = Object.keys(newData)
	//   i = keys.length
	//   while (i--) {
	//     key = keys[i]
	//     if (!this.hasOwnProperty(key) && !_.isReserved(key)) {
	//       // new property
	//       this._proxy(key)
	//     }
	//   }
	//   oldData.__ob__.removeVm(this)
	//   Observer.create(newData).addVm(this)
	//   this._digest()
	// }
	
	/**
	 * Proxy a property, so that
	 * vm.prop === vm._data.prop
	 *
	 * @param {String} key
	 */
	
	exports._proxy = function (key) {
	  // need to store ref to self here
	  // because these getter/setters might
	  // be called by child instances!
	  var self = this;
	  Object.defineProperty(self, key, {
	    configurable: true,
	    enumerable: true,
	    get: function proxyGetter() {
	      return self._data[key];
	    },
	    set: function proxySetter(val) {
	      self._data[key] = val;
	    }
	  });
	};
	
	/**
	 * Unproxy a property.
	 *
	 * @param {String} key
	 */
	
	exports._unproxy = function (key) {
	  delete this[key];
	};
	
	// /**
	//  * Force update on every watcher in scope.
	//  */
	
	// exports._digest = function () {
	//   var i = this._watchers.length
	//   while (i--) {
	//     this._watchers[i].update()
	//   }
	//   var children = this._children
	//   i = children.length
	//   while (i--) {
	//     var child = children[i]
	//     if (child.$options.inherit) {
	//       child._digest()
	//     }
	//   }
	// }
	
	// /**
	//  * Setup computed properties. They are essentially
	//  * special getter/setters
	//  */
	
	// function noop () {}
	// exports._initComputed = function () {
	//   var computed = this.$options.computed
	//   if (computed) {
	//     for (var key in computed) {
	//       var userDef = computed[key]
	//       var def = {
	//         enumerable: true,
	//         configurable: true
	//       }
	//       if (typeof userDef === 'function') {
	//         def.get = _.bind(userDef, this)
	//         def.set = noop
	//       } else {
	//         def.get = userDef.get
	//           ? _.bind(userDef.get, this)
	//           : noop
	//         def.set = userDef.set
	//           ? _.bind(userDef.set, this)
	//           : noop
	//       }
	//       Object.defineProperty(this, key, def)
	//     }
	//   }
	// }
	
	/**
	 * Setup instance methods. Methods must be bound to the
	 * instance since they might be called by children
	 * inheriting them.
	 */
	
	exports._initMethods = function () {
	  // var methods = this.$options.methods
	  var methods = this._methods;
	  if (methods) {
	    for (var key in methods) {
	      this[key] = _.bind(methods[key], this);
	    }
	  }
	};
	
	// /**
	//  * Initialize meta information like $index, $key & $value.
	//  */

	// exports._initMeta = function () {
	//   var metas = this.$options._meta
	//   if (metas) {
	//     for (var key in metas) {
	//       this._defineMeta(key, metas[key])
	//     }
	//   }
	// }

	// /**
	//  * Define a meta property, e.g $index, $key, $value
	//  * which only exists on the vm instance but not in $data.
	//  *
	//  * @param {String} key
	//  * @param {*} value
	//  */

	// exports._defineMeta = function (key, value) {
	//   var dep = new Dep()
	//   Object.defineProperty(this, key, {
	//     enumerable: true,
	//     configurable: true,
	//     get: function metaGetter () {
	//       if (Observer.target) {
	//         Observer.target.addDep(dep)
	//       }
	//       return value
	//     },
	//     set: function metaSetter (val) {
	//       if (val !== value) {
	//         value = val
	//         dep.notify()
	//       }
	//     }
	//   })
	// }

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// required for code in instance/observer
	module.exports = __webpack_require__(81);

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _ = __webpack_require__(87);
	var config = __webpack_require__(89);
	var Dep = __webpack_require__(90);
	var arrayMethods = __webpack_require__(91);
	var arrayKeys = Object.getOwnPropertyNames(arrayMethods);
	__webpack_require__(92);
	
	var uid = 0;
	
	/**
	 * Type enums
	 */
	
	var ARRAY = 0;
	var OBJECT = 1;
	
	/**
	 * Augment an target Object or Array by intercepting
	 * the prototype chain using __proto__
	 *
	 * @param {Object|Array} target
	 * @param {Object} proto
	 */
	
	function protoAugment(target, src) {
	  target.__proto__ = src;
	}
	
	/**
	 * Augment an target Object or Array by defining
	 * hidden properties.
	 *
	 * @param {Object|Array} target
	 * @param {Object} proto
	 */
	
	function copyAugment(target, src, keys) {
	  var i = keys.length;
	  var key;
	  while (i--) {
	    key = keys[i];
	    _.define(target, key, src[key]);
	  }
	}
	
	/**
	 * Observer class that are attached to each observed
	 * object. Once attached, the observer converts target
	 * object's property keys into getter/setters that
	 * collect dependencies and dispatches updates.
	 *
	 * @param {Array|Object} value
	 * @param {Number} type
	 * @constructor
	 */
	
	function Observer(value, type) {
	  this.id = ++uid;
	  this.value = value;
	  this.active = true;
	  this.deps = [];
	  _.define(value, '__ob__', this);
	  if (type === ARRAY) {
	    var augment = config.proto && _.hasProto ? protoAugment : copyAugment;
	    augment(value, arrayMethods, arrayKeys);
	    this.observeArray(value);
	  } else if (type === OBJECT) {
	    this.walk(value);
	  }
	}
	
	Observer.target = null;
	
	var p = Observer.prototype;
	
	/**
	 * Attempt to create an observer instance for a value,
	 * returns the new observer if successfully observed,
	 * or the existing observer if the value already has one.
	 *
	 * @param {*} value
	 * @return {Observer|undefined}
	 * @static
	 */
	
	Observer.create = function (value) {
	  if (value && value.hasOwnProperty('__ob__') && value.__ob__ instanceof Observer) {
	    return value.__ob__;
	  } else if (_.isArray(value)) {
	    return new Observer(value, ARRAY);
	  } else if (_.isPlainObject(value) && !value._isVue // avoid Vue instance
	  ) {
	      return new Observer(value, OBJECT);
	    }
	};
	
	/**
	 * Walk through each property and convert them into
	 * getter/setters. This method should only be called when
	 * value type is Object. Properties prefixed with `$` or `_`
	 * and accessor properties are ignored.
	 *
	 * @param {Object} obj
	 */
	
	p.walk = function (obj) {
	  var keys = Object.keys(obj);
	  var i = keys.length;
	  var key, prefix;
	  while (i--) {
	    key = keys[i];
	    prefix = key.charCodeAt(0);
	    if (prefix !== 0x24 && prefix !== 0x5F) {
	      // skip $ or _
	      this.convert(key, obj[key]);
	    }
	  }
	};
	
	/**
	 * Try to carete an observer for a child value,
	 * and if value is array, link dep to the array.
	 *
	 * @param {*} val
	 * @return {Dep|undefined}
	 */
	
	p.observe = function (val) {
	  return Observer.create(val);
	};
	
	/**
	 * Observe a list of Array items.
	 *
	 * @param {Array} items
	 */
	
	p.observeArray = function (items) {
	  var i = items.length;
	  while (i--) {
	    this.observe(items[i]);
	  }
	};
	
	/**
	 * Convert a property into getter/setter so we can emit
	 * the events when the property is accessed/changed.
	 *
	 * @param {String} key
	 * @param {*} val
	 */
	
	p.convert = function (key, val) {
	  var ob = this;
	  var childOb = ob.observe(val);
	  var dep = new Dep();
	  if (childOb) {
	    childOb.deps.push(dep);
	  }
	  Object.defineProperty(ob.value, key, {
	    enumerable: true,
	    configurable: true,
	    get: function get() {
	      // Observer.target is a watcher whose getter is
	      // currently being evaluated.
	      if (ob.active && Observer.target) {
	        Observer.target.addDep(dep);
	      }
	      return val;
	    },
	    set: function set(newVal) {
	      if (newVal === val) return;
	      // remove dep from old value
	      var oldChildOb = val && val.__ob__;
	      if (oldChildOb) {
	        oldChildOb.deps.$remove(dep);
	      }
	      val = newVal;
	      // add dep to new value
	      var newChildOb = ob.observe(newVal);
	      if (newChildOb) {
	        newChildOb.deps.push(dep);
	      }
	      dep.notify();
	    }
	  });
	};
	
	/**
	 * Notify change on all self deps on an observer.
	 * This is called when a mutable value mutates. e.g.
	 * when an Array's mutating methods are called, or an
	 * Object's $add/$delete are called.
	 */
	
	p.notify = function () {
	  var deps = this.deps;
	  for (var i = 0, l = deps.length; i < l; i++) {
	    deps[i].notify();
	  }
	};
	
	/**
	 * Add an owner vm, so that when $add/$delete mutations
	 * happen we can notify owner vms to proxy the keys and
	 * digest the watchers. This is only called when the object
	 * is observed as an instance's root $data.
	 *
	 * @param {Vue} vm
	 */
	
	p.addVm = function (vm) {
	  (this.vms = this.vms || []).push(vm);
	};
	
	/**
	 * Remove an owner vm. This is called when the object is
	 * swapped out as an instance's $data object.
	 *
	 * @param {Vue} vm
	 */
	
	p.removeVm = function (vm) {
	  this.vms.$remove(vm);
	};
	
	module.exports = Observer;

/***/ },
/* 89 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = { proto: true };

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _ = __webpack_require__(87);
	
	/**
	 * A dep is an observable that can have multiple
	 * directives subscribing to it.
	 *
	 * @constructor
	 */
	
	function Dep() {
	  this.subs = [];
	}
	
	var p = Dep.prototype;
	
	/**
	 * Add a directive subscriber.
	 *
	 * @param {Directive} sub
	 */
	
	p.addSub = function (sub) {
	  this.subs.push(sub);
	};
	
	/**
	 * Remove a directive subscriber.
	 *
	 * @param {Directive} sub
	 */
	
	p.removeSub = function (sub) {
	  this.subs.$remove(sub);
	};
	
	/**
	 * Notify all subscribers of a new value.
	 */
	
	p.notify = function () {
	  // stablize the subscriber list first
	  var subs = _.toArray(this.subs);
	  for (var i = 0, l = subs.length; i < l; i++) {
	    subs[i].update();
	  }
	};
	
	module.exports = Dep;

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _ = __webpack_require__(87);
	var arrayProto = Array.prototype;
	var arrayMethods = Object.create(arrayProto)
	
	/**
	 * Intercept mutating methods and emit events
	 */
	
	;['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function (method) {
	  // cache original method
	  var original = arrayProto[method];
	  _.define(arrayMethods, method, function mutator() {
	    // avoid leaking arguments:
	    // http://jsperf.com/closure-with-arguments
	    var i = arguments.length;
	    var args = new Array(i);
	    while (i--) {
	      args[i] = arguments[i];
	    }
	    var result = original.apply(this, args);
	    var ob = this.__ob__;
	    var inserted;
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
	    ob.notify();
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
	
	_.define(arrayProto, '$set', function $set(index, val) {
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
	
	_.define(arrayProto, '$remove', function $remove(index) {
	  /* istanbul ignore if */
	  if (!this.length) return;
	  if (typeof index !== 'number') {
	    index = _.indexOf(this, index);
	  }
	  if (index > -1) {
	    this.splice(index, 1);
	  }
	});
	
	module.exports = arrayMethods;

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _ = __webpack_require__(87);
	var objProto = Object.prototype;
	
	/**
	 * Add a new property to an observed object
	 * and emits corresponding event
	 *
	 * @param {String} key
	 * @param {*} val
	 * @public
	 */
	
	_.define(objProto, '$add', function $add(key, val) {
	  if (this.hasOwnProperty(key)) return;
	  var ob = this.__ob__;
	  if (!ob || _.isReserved(key)) {
	    this[key] = val;
	    return;
	  }
	  ob.convert(key, val);
	  ob.notify();
	  if (ob.vms) {
	    var i = ob.vms.length;
	    while (i--) {
	      var vm = ob.vms[i];
	      vm._proxy(key);
	      // vm._digest() // todo
	    }
	  }
	});
	
	/**
	 * Set a property on an observed object, calling add to
	 * ensure the property is observed.
	 *
	 * @param {String} key
	 * @param {*} val
	 * @public
	 */
	
	_.define(objProto, '$set', function $set(key, val) {
	  this.$add(key, val);
	  this[key] = val;
	});
	
	/**
	 * Deletes a property from an observed object
	 * and emits corresponding event
	 *
	 * @param {String} key
	 * @public
	 */
	
	_.define(objProto, '$delete', function $delete(key) {
	  if (!this.hasOwnProperty(key)) return;
	  delete this[key];
	  var ob = this.__ob__;
	  if (!ob || _.isReserved(key)) {
	    return;
	  }
	  ob.notify();
	  if (ob.vms) {
	    var i = ob.vms.length;
	    while (i--) {
	      var vm = ob.vms[i];
	      vm._unproxy(key);
	      // vm._digest() // todo
	    }
	  }
	});

/***/ },
/* 93 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	exports._build = _build;
	exports._generate = _generate;
	exports._generateElement = _generateElement;
	exports._setChildren = _setChildren;
	exports._checkRepeat = _checkRepeat;
	exports._checkDisplay = _checkDisplay;
	exports._watchBlock = _watchBlock;
	exports._mergeContext = _mergeContext;
	/**
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
	
	/**
	 * build(externalDirs)
	 *   createVm()
	 *   merge(externalDirs, dirs)
	 *   generate(template, parentNode)
	 *     if (type is content) create contentNode
	 *     else if (dirs have v-for) foreach -> create context
	 *       -> generate(templateWithoutFor, parentNode): diff(list) onchange
	 *     else if (dirs have v-if) assert
	 *       -> generate(templateWithoutIf, parentNode): toggle(shown) onchange
	 *     else if (type is native)
	 *       set(dirs): update(id/attr/style/class) onchange
	 *       append(template, parentNode)
	 *       foreach childNodes -> generate(childNode, template)
	 *     else if (type is custom)
	 *       addChildVm(vm, parentVm)
	 *       build(externalDirs)
	 *       foreach childNodes -> generate(childNode, template)
	 */
	function _build() {
	  var opt = this._options || {};
	  var template = opt.template || {};
	
	  if (opt.replace) {
	    if (template.children && template.children.length === 1) {
	      this._generate(template.children[0], this._parentEl);
	    } else {
	      this._generate(template.children, this._parentEl);
	    }
	  } else {
	    this._generate(template, this._parentEl);
	  }
	
	  this.$emit('hook:ready');
	  this._ready = true;
	}
	
	/**
	 * Generate elements by child or children and append to parent elements.
	 * Root element info would be merged if has. The first argument may be an array
	 * if the root element with options.replace has not only one child.
	 *
	 * @param  {object|array} target
	 * @param  {object} parentEl
	 * @param  {object} context
	 */
	function _generate(target, parentEl, context) {
	  var _this = this;
	
	  if (Array.isArray(target)) {
	    var _ret = function () {
	      var fragBlock = _this._createBlock(parentEl);
	      target.forEach(function (child) {
	        _this._generate(child, fragBlock, context);
	      });
	      return {
	        v: void 0
	      };
	    }();
	
	    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	  }
	
	  context = context || {};
	
	  if (target.type === 'content' || target.type === 'slot') {
	    this._content = this._createBlock(parentEl);
	    return;
	  }
	
	  if (!context.hasOwnProperty('repeat') && target.repeat) {
	    var _ret2 = function () {
	      var list = target.repeat.call(_this);
	      var repeatId = latestRepeatId++;
	      var latestItemId = markList(list, repeatId);
	
	      var fragBlock = _this._createBlock(parentEl);
	      fragBlock.children = [];
	      fragBlock.data = list.slice(0);
	
	      _this._checkRepeat(target, fragBlock, repeatId, latestItemId);
	
	      list.forEach(function (item, index) {
	        if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object') {
	          item.INDEX = index;
	        }
	        _this._generate(target, fragBlock, { repeat: item });
	      });
	
	      return {
	        v: void 0
	      };
	    }();
	
	    if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
	  }
	
	  var subContext = this;
	  if (context.repeat && !context.shown) {
	    subContext = this._mergeContext(context.repeat);
	  }
	
	  if (!context.hasOwnProperty('shown') && target.shown) {
	    var display = target.shown.call(subContext);
	    var newContext = { shown: true };
	    var _fragBlock = subContext._createBlock(parentEl);
	
	    if (parentEl.element && parentEl.children) {
	      parentEl.children.push(_fragBlock);
	    }
	
	    if (context.repeat) {
	      newContext.repeat = context.repeat;
	    }
	
	    _fragBlock.display = !!display;
	    subContext._checkDisplay(target, _fragBlock, newContext);
	
	    if (display) {
	      subContext._generate(target, _fragBlock, newContext);
	    }
	
	    return;
	  }
	
	  var typeGetter = target.type;
	  var type = typeGetter;
	
	  if (typeof typeGetter === 'function') {
	    type = typeGetter.call(subContext);
	
	    if (!context.hasOwnProperty('type')) {
	      var _ret3 = function () {
	        var newContext = { type: type };
	        var fragBlock = subContext._createBlock(parentEl);
	
	        if (parentEl.element && parentEl.children) {
	          parentEl.children.push(fragBlock);
	        }
	
	        subContext._watch(typeGetter, function (value) {
	          subContext._removeBlock(fragBlock, true);
	          subContext._generate(target, fragBlock, { type: value });
	        });
	
	        subContext._generate(target, fragBlock, newContext);
	
	        return {
	          v: void 0
	        };
	      }();
	
	      if ((typeof _ret3 === 'undefined' ? 'undefined' : _typeof(_ret3)) === "object") return _ret3.v;
	    }
	  }
	
	  var isComponent = void 0;
	  if (this._app && this._app.customComponentMap && type) {
	    isComponent = this._app.customComponentMap[type];
	  } else {
	    isComponent = target.component;
	  }
	
	  if (isComponent) {
	    var Vm = this.constructor;
	    var subVm = new Vm(type, subContext, parentEl, undefined, {
	      'hook:init': function hookInit() {
	        subContext._setId(target.id, null, this);
	      },
	      'hook:created': function hookCreated() {
	        subContext._bindSubVm(this, target, context.repeat);
	      },
	      'hook:ready': function hookReady() {
	        if (this._content) {
	          subContext._setChildren(target, this._content);
	        }
	      }
	    });
	    subContext._bindSubVmAfterInitialized(subVm, target);
	    return;
	  }
	
	  var element = subContext._generateElement(type, target, parentEl);
	  var treeMode = target.append === 'tree';
	  if (!treeMode) {
	    subContext._attachTarget(element, parentEl);
	  }
	  subContext._setChildren(target, element);
	  if (treeMode) {
	    subContext._attachTarget(element, parentEl);
	  }
	}
	
	/**
	 * Generate element from template and attach to the dest if needed.
	 * The time to attach depends on whether the mode status is node or tree.
	 *
	 * @param  {object} template
	 * @param  {object} dest
	 */
	function _generateElement(type, template, dest) {
	
	  this._applyNaitveComponentOptions(template);
	
	  var element = void 0;
	  if (dest.ref === '_documentElement') {
	    // if its parent is documentElement then it's a body
	    element = this._createBody(type);
	  } else {
	    element = this._createElement(type);
	  }
	  // TODO it was a root element when not in a fragment
	  if (!this._rootEl) {
	    this._rootEl = element;
	  }
	
	  this._bindElement(element, template);
	
	  if (template.attr && template.attr.append) {
	    // backward, append prop in attr
	    element.append = template.attr.append;
	  }
	
	  return element;
	}
	
	/**
	 * Set all children to a certain parent element.
	 *
	 * @param {object} template
	 * @param {object} parentEl
	 */
	function _setChildren(template, parentEl) {
	  var _this2 = this;
	
	  var children = template.children;
	  if (children && children.length) {
	    children.forEach(function (child) {
	      _this2._generate(child, parentEl);
	    });
	  }
	}
	
	/**
	 * Watch the list update and refresh the changes.
	 *
	 * @param  {object} target
	 * @param  {object} fragBlock
	 */
	function _checkRepeat(target, fragBlock, repeatId, latestItemId) {
	  var _this3 = this;
	
	  var children = fragBlock.children;
	
	  this._watchBlock(fragBlock, target.repeat, 'repeat', function (value) {
	    if (!fragBlock) {
	      return;
	    }
	
	    var oldChildren = children.slice();
	    var oldValue = fragBlock.data.slice();
	    // 1. collect all new refs track by
	    var trackMap = {};
	    var reusedMap = {};
	    value.forEach(function (item, index) {
	      var key = item['__wx_repeat_' + repeatId + '__'];
	      if (!key) {
	        key = latestItemId++;
	        setRepeatItemId(item, repeatId, key);
	      }
	      trackMap[key] = item;
	    });
	
	    // 2. remove unused element foreach old item
	    var reusedList = [];
	    oldValue.forEach(function (item, index) {
	      var key = item['__wx_repeat_' + repeatId + '__'];
	      if (trackMap.hasOwnProperty(key)) {
	        reusedMap[key] = { item: item, index: index, target: oldChildren[index] };
	        reusedList.push(item);
	      } else {
	        _this3._removeTarget(oldChildren[index]);
	      }
	    });
	
	    // 3. create new element foreach new item
	    children.length = 0;
	    fragBlock.data = value.slice();
	    fragBlock.updateMark = fragBlock.start;
	
	    value.forEach(function (item, index) {
	      var key = item['__wx_repeat_' + repeatId + '__'];
	      var reused = reusedMap[key];
	      if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object') {
	        item.INDEX = index;
	      }
	      if (reused) {
	        if (reused.item === reusedList[0]) {
	          reusedList.shift();
	        } else {
	          reusedList.$remove(reused.item);
	          _this3._moveTarget(reused.target, fragBlock.updateMark, true);
	        }
	        children.push(reused.target);
	        fragBlock.updateMark = reused.target;
	      } else {
	        _this3._generate(target, fragBlock, { repeat: item });
	      }
	    });
	
	    delete fragBlock.updateMark;
	  });
	}
	
	var latestRepeatId = 1;
	
	function markList(list, repeatId) {
	  var latestItemId = 1;
	  list.forEach(function (item) {
	    setRepeatItemId(item, repeatId, latestItemId++);
	  });
	  return latestItemId;
	}
	
	function setRepeatItemId(item, repeatId, itemId) {
	  var key = '__wx_repeat_' + repeatId + '__';
	  if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object') {
	    Object.defineProperty(item, key, {
	      value: itemId
	    });
	  }
	}
	
	/**
	 * Watch the display update and add/remove the element.
	 *
	 * @param  {object} target
	 * @param  {object} fragBlock
	 * @param  {object} context
	 */
	function _checkDisplay(target, fragBlock, context) {
	  var _this4 = this;
	
	  this._watchBlock(fragBlock, target.shown, 'shown', function (value) {
	    if (!fragBlock || !!fragBlock.display === !!value) {
	      return;
	    }
	    fragBlock.display = value;
	    if (value) {
	      _this4._generate(target, fragBlock, context);
	    } else {
	      _this4._removeBlock(fragBlock, true);
	    }
	  });
	}
	
	function _watchBlock(fragBlock, calc, type, handler) {
	  var differ = this && this._app && this._app.differ;
	  var config = {};
	  var depth = fragBlock.element.depth + 1;
	
	  this._watch(calc, function (value) {
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
	  context._realParent = this;
	  return context;
	}

/***/ },
/* 94 */
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
	
	var _util = __webpack_require__(81);
	
	var _watcher = __webpack_require__(95);
	
	var _watcher2 = _interopRequireDefault(_watcher);
	
	var _config = __webpack_require__(79);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
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
	
	  var options = _config.nativeComponentMap[type];
	
	  if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
	    (0, _util.extend)(template, options);
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
	  mergeStyle(template.style, this, subVm);
	
	  // bind events
	  // todo: rebind if subVm._rootEl changed
	  if (subVm._rootEl) {
	    for (var key in template.events || {}) {
	      var value = template.events[key];
	      this._setEvent(subVm._rootEl, key, value);
	    }
	  }
	}
	
	function mergeProps(target, props, vm, subVm) {
	  if (!target) {
	    return;
	  }
	
	  var _loop = function _loop(key) {
	    if (!props || props[key]) {
	      var value = target[key];
	      if (typeof value === 'function') {
	        vm._watch(value, function (v) {
	          subVm[key] = v;
	        });
	        subVm[key] = value.bind(vm)();
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
	      vm._watch(value, function (v) {
	        if (subVm._rootEl) {
	          subVm._rootEl.setStyle(key, v);
	        }
	      });
	      subVm._rootEl.setStyle(key, value.bind(vm)());
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
	
	/**
	 * bind classnames to an element
	 */
	function _setClass(el, classList) {
	  var _this2 = this;
	
	  if (typeof classList !== 'function' && !Array.isArray(classList)) {
	    return;
	  }
	  if (Array.isArray(classList) && !classList.length) {
	    el.setClassStyle({});
	    return;
	  }
	
	  var update = function update(classList) {
	    var css = _this2._options.style;
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
	  };
	
	  if (typeof classList === 'function') {
	    this._watch(classList, update);
	    update(classList.call(this));
	  } else {
	    update(classList);
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
	  el.addEvent(type, (0, _util.bind)(handler, this));
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
	    var handlerName = events[key];
	    this._setEvent(el, key, this[handlerName]);
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
	    var _value = data[key];
	    if (typeof _value === 'function') {
	      var update = _value;
	      this._bindKey(el, name, key, update);
	    } else {
	      el[SETTERS[name]](key, _value);
	    }
	  }
	}
	
	/**
	 * bind data changes to a certain key to a name series in an element
	 */
	function _bindKey(el, name, key, calc) {
	  var _this3 = this;
	
	  var methodName = SETTERS[name];
	  var obj = el[name];
	  // watch the calc, and returns a value by calc.call()
	  var value = this._watch(calc, function (value) {
	    function handler() {
	      el[methodName](key, value);
	    }
	    var differ = _this3 && _this3._app && _this3._app.differ;
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
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * The MIT License (MIT)
	 *
	 * Copyright (c) 2013-2015 Yuxi Evan You
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 */
	
	var _ = __webpack_require__(87);
	// var config = require('./config')
	var Observer = __webpack_require__(88);
	// var expParser = require('./parsers/expression')
	// var batcher = require('./batcher')
	var uid = 0;
	
	/**
	 * A watcher parses an expression, collects dependencies,
	 * and fires callback when the expression value changes.
	 * This is used for both the $watch() api and directives.
	 *
	 * @param {Vue} vm
	 * @param {String} expression
	 * @param {Function} cb
	 * @param {Object} options
	 *                 - {Array} filters
	 *                 - {Boolean} twoWay
	 *                 - {Boolean} deep
	 *                 - {Boolean} user
	 *                 - {Function} [preProcess]
	 * @constructor
	 */
	
	// function Watcher (vm, expression, cb, options) {
	function Watcher(vm, update, cb) {
	  this.vm = vm;
	  vm._watchers.push(this);
	  // this.expression = expression
	  this.cb = cb;
	  this.id = ++uid; // uid for batching
	  this.active = true;
	  // options = options || {}
	  // this.deep = !!options.deep
	  // this.user = !!options.user
	  // this.twoWay = !!options.twoWay
	  // this.filters = options.filters
	  // this.preProcess = options.preProcess
	  this.deps = [];
	  this.newDeps = [];
	  // parse expression for getter/setter
	  // var res = expParser.parse(expression, options.twoWay)
	  // this.getter = res.get
	  // this.setter = res.set
	  this.getter = update;
	  this.value = this.get();
	}
	
	var p = Watcher.prototype;
	
	/**
	 * Add a dependency to this directive.
	 *
	 * @param {Dep} dep
	 */
	
	p.addDep = function (dep) {
	  var newDeps = this.newDeps;
	  var old = this.deps;
	  if (_.indexOf(newDeps, dep) < 0) {
	    newDeps.push(dep);
	    var i = _.indexOf(old, dep);
	    if (i < 0) {
	      dep.addSub(this);
	    } else {
	      old[i] = null;
	    }
	  }
	};
	
	/**
	 * Evaluate the getter, and re-collect dependencies.
	 */
	
	p.get = function () {
	  this.beforeGet();
	  var vm = this.vm;
	  var value;
	  try {
	    value = this.getter.call(vm, vm);
	  } catch (e) {
	    // if (config.warnExpressionErrors) {
	    //   _.warn(
	    //     'Error when evaluating expression "' +
	    //     this.expression + '":\n   ' + e
	    //   )
	    // }
	    _.warn('Error when update"');
	  }
	  // "touch" every property so they are all tracked as
	  // dependencies for deep watching
	  if (this.deep) {
	    traverse(value);
	  }
	  if (this.preProcess) {
	    value = this.preProcess(value);
	  }
	  if (this.filters) {
	    value = vm._applyFilters(value, null, this.filters, false);
	  }
	  this.afterGet();
	  return value;
	};
	
	// /**
	//  * Set the corresponding value with the setter.
	//  *
	//  * @param {*} value
	//  */
	
	// p.set = function (value) {
	//   var vm = this.vm
	//   if (this.filters) {
	//     value = vm._applyFilters(
	//       value, this.value, this.filters, true)
	//   }
	//   try {
	//     this.setter.call(vm, vm, value)
	//   } catch (e) {
	//     // if (config.warnExpressionErrors) {
	//       _.warn(
	//         'Error when evaluating setter "' +
	//         this.expression + '":\n   ' + e
	//       )
	//     // }
	//   }
	// }
	
	/**
	 * Prepare for dependency collection.
	 */
	
	p.beforeGet = function () {
	  Observer.target = this;
	};
	
	/**
	 * Clean up for dependency collection.
	 */
	
	p.afterGet = function () {
	  Observer.target = null;
	  var i = this.deps.length;
	  while (i--) {
	    var dep = this.deps[i];
	    if (dep) {
	      dep.removeSub(this);
	    }
	  }
	  this.deps = this.newDeps;
	  this.newDeps = [];
	};
	
	/**
	 * Subscriber interface.
	 * Will be called when a dependency changes.
	 */
	
	// p.update = function () {
	//   if (!config.async || config.debug) {
	//     this.run()
	//   } else {
	//     batcher.push(this)
	//   }
	// }
	
	// /**
	//  * Batcher job interface.
	//  * Will be called by the batcher.
	//  */
	
	// p.run = function () {
	p.update = function () {
	  if (this.active) {
	    var value = this.get();
	    if (value !== this.value || Array.isArray(value) || this.deep) {
	      var oldValue = this.value;
	      this.value = value;
	      this.cb(value, oldValue);
	    }
	  }
	};
	
	/**
	 * Remove self from all dependencies' subcriber list.
	 */
	
	p.teardown = function () {
	  if (this.active) {
	    // remove self from vm's watcher list
	    // we can skip this if the vm if being destroyed
	    // which can improve teardown performance.
	    if (!this.vm._isBeingDestroyed) {
	      this.vm._watchers.$remove(this);
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
	 * @param {Object} obj
	 */
	
	function traverse(obj) {
	  var key, val, i;
	  for (key in obj) {
	    val = obj[key];
	    if (_.isArray(val)) {
	      i = val.length;
	      while (i--) {
	        traverse(val[i]);
	      }
	    } else if (_.isObject(val)) {
	      traverse(val);
	    }
	  }
	}
	
	module.exports = Watcher;

/***/ },
/* 96 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
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
	      this._moveTarget(target, after);
	      dest.updateMark = target.element ? target.end : target;
	    } else if (target.element) {
	      dest.element.insertBefore(target.start, before);
	      dest.element.insertBefore(target.end, before);
	    } else {
	      dest.element.insertBefore(target, before);
	    }
	  } else {
	    if (target.element) {
	      dest.appendChild(target.start);
	      dest.appendChild(target.end);
	    } else {
	      dest.appendChild(target);
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
	    this._moveBlock(target, after);
	  } else {
	    this._moveElement(target, after);
	  }
	}
	
	/**
	 * Move element before a certain element.
	 *
	 * @param  {object} element
	 * @param  {object} before
	 */
	function _moveElement(element, after) {
	  var doc = this._app.doc;
	  var parent = doc.getRef(after.parentRef);
	
	  if (parent) {
	    parent.insertAfter(element, after);
	  }
	}
	
	/**
	 * Move all elements of the block before a certain element.
	 *
	 * @param  {object} fragBlock
	 * @param  {object} before
	 */
	function _moveBlock(fragBlock, after) {
	  var doc = this._app.doc;
	  var parent = doc.getRef(after.parentRef);
	
	  if (parent) {
	    (function () {
	      var el = fragBlock.start;
	      var group = [el];
	
	      while (el && el !== fragBlock.end) {
	        el = el.next();
	        group.push(el);
	      }
	
	      var temp = after;
	      group.forEach(function (el) {
	        parent.insertAfter(el, temp);
	        temp = el;
	      });
	    })();
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
	  var doc = this._app.doc;
	  var parent = doc.getRef(target.parentRef);
	
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
	  var el = fragBlock.start.next();
	
	  while (el && el !== fragBlock.end) {
	    result.push(el);
	    el = el.next();
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
/* 97 */
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
/* 98 */
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
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.normalizeVersion = normalizeVersion;
	exports.getError = getError;
	exports.check = check;
	
	var _semver = __webpack_require__(83);
	
	var _semver2 = _interopRequireDefault(_semver);
	
	var _util = __webpack_require__(81);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * [normalizeVersion description]
	 * @param  {String} Version. ie: 1, 1.0, 1.0.0
	 * @return {String} Version
	 */
	function normalizeVersion(v) {
	  var isValid = _semver2.default.valid(v) ? true : false;
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
	  config = (0, _util.isPlainObject)(config) ? config : {};
	  var platform = deviceInfo.platform || 'unknow';
	  var dPlatform = platform.toLowerCase();
	  var cObj = config[dPlatform] || {};
	
	  var result = {
	    isDowngrade: false // defautl is pass
	  };
	
	  for (var i in deviceInfo) {
	    var key = i;
	    var keyLower = key.toLowerCase();
	    var val = deviceInfo[i];
	    var isVersion = keyLower.indexOf('version') >= 0 ? true : false;
	    var isDeviceModel = keyLower.indexOf('devicemodel') >= 0 ? true : false;
	    var criteria = cObj[i];
	
	    if (criteria && isVersion) {
	      var c = this.normalizeVersion(criteria);
	      var d = this.normalizeVersion(deviceInfo[i]);
	
	      if (_semver2.default.satisfies(d, c)) {
	        result = (0, _util.extend)(this.getError(key, val, criteria));
	        break;
	      }
	    } else if (isDeviceModel) {
	      var _criteria = (0, _util.typof)(criteria) === 'array' ? criteria : [criteria];
	      if (_criteria.indexOf(val) >= 0) {
	        result = (0, _util.extend)(this.getError(key, val, criteria));
	        break;
	      }
	    }
	  }
	
	  return result;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.init = init;
	exports.destroy = destroy;
	exports.getRootElement = getRootElement;
	exports.updateActions = updateActions;
	exports.fireEvent = fireEvent;
	exports.callback = callback;
	exports.refreshData = refreshData;
	
	var _util = __webpack_require__(81);
	
	var _perf = __webpack_require__(77);
	
	var perf = _interopRequireWildcard(_perf);
	
	var _domListener = __webpack_require__(101);
	
	var _domListener2 = _interopRequireDefault(_domListener);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
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
	
	function init(code, data) {
	  var _this = this;
	
	  var result;
	  // @see: lib/app/bundle.js
	  var define = (0, _util.bind)(this.define, this);
	  var bootstrap = function bootstrap(name, config, _data) {
	    result = _this.bootstrap(name, config, _data || data);
	    _this.doc.listener.createFinish();
	    _this.doc.close();
	  };
	
	  // backward(register/render)
	  var register = (0, _util.bind)(this.register, this);
	  var render = function render(name, _data) {
	    result = _this.bootstrap(name, {}, _data);
	  };
	
	  var require = function require(name) {
	    return function (_data) {
	      result = _this.bootstrap(name, {}, _data);
	    };
	  };
	
	  var document = this.doc;
	
	  perf.start('run bundle', this.id);
	
	  var functionBody = void 0;
	  /* istanbul ignore if */
	  if (typeof code === 'function') {
	    // `function () {...}` -> `{...}`
	    // not very strict
	    functionBody = code.toString().substr(12);
	  } else if (code) {
	    functionBody = code.toString();
	  }
	
	  var fn = new Function('define', 'require', 'document', 'bootstrap', 'register', 'render', functionBody);
	
	  fn(define, require, document, bootstrap, register, render);
	
	  perf.end('run bundle', this.id);
	  return result;
	}
	
	function destroy() {
	  this.id = '';
	  this.eventManager = null;
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
	
	function updateActions(addonTasks) {
	  this.differ.flush();
	  var tasks = [];
	  if (this.listener && this.listener.updates.length) {
	    tasks.push.apply(tasks, _toConsumableArray(this.listener.updates));
	    this.listener.updates = [];
	  }
	  if (addonTasks && addonTasks.length) {
	    tasks.push.apply(tasks, _toConsumableArray(addonTasks));
	  }
	  if (tasks.length) {
	    this.callTasks(tasks);
	  }
	}
	
	function fireEvent(ref, type, e, domChanges) {
	  var _this2 = this;
	
	  if (Array.isArray(ref)) {
	    ref.some(function (ref) {
	      return _this2.fireEvent(ref, type, e) !== false;
	    });
	    return;
	  }
	
	  var el = this.doc.getRef(ref);
	
	  if (el) {
	    perf.start('manage event', ref + '-' + type);
	    e = e || {};
	    e.type = type;
	    e.target = el;
	    e.timestamp = Date.now();
	    if (domChanges) {
	      updateElement(el, domChanges);
	    }
	    var result = this.eventManager.fire(el, type, e);
	    perf.end('manage event', ref + '-' + type);
	    this.updateActions();
	    return result;
	  }
	
	  return new Error('invalid element reference "' + ref + '"');
	}
	
	function callback(callbackId, data, ifLast) {
	  var callback = this.callbacks[callbackId];
	
	  if (typeof callback === 'function') {
	    callback(data); // data is already a object, @see: lib/framework.js
	
	    if (typeof ifLast === 'undefined' || ifLast === true) {
	      this.callbacks[callbackId] = undefined;
	    }
	
	    this.updateActions();
	    return;
	  }
	
	  return new Error('invalid callback id "' + callbackId + '"');
	}
	
	function refreshData(data) {
	  var vm = this.vm;
	
	  if (vm && data) {
	    if (typeof vm.refreshData === 'function') {
	      vm.refreshData(data);
	    } else {
	      (0, _util.extend)(vm, data);
	    }
	    this.updateActions([(0, _domListener.createAction)('refreshFinish', [])]);
	    return;
	  }
	
	  return new Error('invalid data "' + data + '"');
	}
	
	function updateElement(el, changes) {
	  var attrs = changes.attrs || {};
	  for (var name in attrs) {
	    el.setAttr(name, attrs);
	  }
	  var style = changes.style || {};
	  for (var _name in style) {
	    el.setStyle(_name, style[_name]);
	  }
	}

/***/ },
/* 101 */
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
	  handler([createAction('createFinish', [])], callback);
	};
	
	Listener.prototype.createBody = function (element, ref) {
	  var actions = [createAction('createBody', [element.toJSON()])];
	  this.addActions(actions);
	};
	
	Listener.prototype.addElement = function (element, ref, index) {
	  if (!(index >= 0)) {
	    index = -1;
	  }
	  this.addActions(createAction('addElement', [ref, element.toJSON(), index]));
	};
	
	Listener.prototype.removeElement = function (ref) {
	  if (Array.isArray(ref)) {
	    var actions = ref.map(function (r) {
	      return createAction('removeElement', [r]);
	    });
	    this.addActions(actions);
	  } else {
	    this.addActions(createAction('removeElement', [ref]));
	  }
	};
	
	Listener.prototype.moveElement = function (targetRef, parentRef, index) {
	  this.addActions(createAction('moveElement', [targetRef, parentRef, index]));
	};
	
	Listener.prototype.setAttr = function (ref, key, value) {
	  var result = {};
	  result[key] = value;
	  this.addActions(createAction('updateAttrs', [ref, result]));
	};
	
	Listener.prototype.setStyle = function (ref, key, value) {
	  var result = {};
	  result[key] = value;
	  this.addActions(createAction('updateStyle', [ref, result]));
	};
	
	Listener.prototype.setStyles = function (ref, style) {
	  this.addActions(createAction('updateStyle', [ref, style]));
	};
	
	Listener.prototype.addEvent = function (ref, type) {
	  this.addActions(createAction('addEvent', [ref, type]));
	};
	
	Listener.prototype.removeEvent = function (ref, type) {
	  this.addActions(createAction('removeEvent', [ref, type]));
	};
	
	Listener.prototype.handler = function (actions, cb) {
	  cb && cb();
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
	    handler(actions);
	  }
	};
	
	function createAction(name, args) {
	  return { module: 'dom', method: name, args: args };
	}

/***/ },
/* 102 */
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
	    value: function flush() {
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
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /**
	                                                                                                                                                                                                                                                   * @fileOverview event manager
	                                                                                                                                                                                                                                                   */
	
	exports.default = EventManager;
	
	var _util = __webpack_require__(81);
	
	var _ = _interopRequireWildcard(_util);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function EventManager() {
	  this.els = [];
	  this.targets = [];
	}
	
	EventManager.prototype._get = function (el, force) {
	  var index = _.indexOf(this.els, el);
	  var target;
	  if (index >= 0) {
	    target = this.targets[index];
	  } else if (force) {
	    target = { el: el, events: {} };
	    this.els.push(el);
	    this.targets.push(target);
	  }
	  return target;
	};
	
	EventManager.prototype.add = function (el, type, handler) {
	  if ((typeof el === 'undefined' ? 'undefined' : _typeof(el)) !== 'object' || !el || typeof type !== 'string' || !type || typeof handler !== 'function') {
	    return;
	  }
	  var target = this._get(el, true);
	  target.events[type] = handler;
	};
	
	EventManager.prototype.remove = function (el, type) {
	  if ((typeof el === 'undefined' ? 'undefined' : _typeof(el)) !== 'object' || !el || typeof type !== 'string' || !type) {
	    return;
	  }
	  var target = this._get(el);
	  if (target) {
	    delete target.events[type];
	  }
	};
	
	EventManager.prototype.fire = function (el, type, e) {
	  var target = this._get(el);
	  var handler, el;
	  if (target) {
	    el = target.el;
	    handler = target.events[type];
	    if (typeof handler === 'function') {
	      return handler.call(el, e);
	    }
	  }
	};

/***/ },
/* 104 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Document = Document;
	exports.destroyDocument = destroyDocument;
	exports.Node = Node;
	exports.Element = Element;
	exports.Comment = Comment;
	/**
	 * @fileOverview
	 * A simple virtual dom implementation
	 */
	
	var DEFAULT_TAG_NAME = 'div';
	
	var instanceMap = exports.instanceMap = {};
	
	function Document(id) {
	  id = id ? id.toString() : '';
	  this.id = id;
	  this.nextRef = 1;
	  this.nodeMap = {};
	  this.listener = null;
	  this.eventManager = null;
	  this.closed = false;
	  instanceMap[id] = this;
	
	  this.createDocumentElement();
	}
	
	function destroyDocument(id) {
	  delete instanceMap[id];
	}
	
	Document.prototype.open = function () {
	  this.closed = false;
	  if (this.listener) {
	    this.listener.batched = false;
	  }
	};
	Document.prototype.close = function () {
	  this.closed = true;
	  if (this.listener) {
	    this.listener.batched = true;
	  }
	};
	
	Document.prototype.setEventManager = function (eventManager) {
	  this.eventManager = eventManager;
	};
	
	Document.prototype.setListener = function (listener) {
	  this.listener = listener;
	  listener.batched = !!this.closed;
	};
	
	Document.prototype.addRef = function (el) {
	  el.ref = this.nextRef.toString();
	  this.nodeMap[el.ref] = el;
	  this.nextRef++;
	};
	
	Document.prototype.getRef = function (ref) {
	  return this.nodeMap[ref];
	};
	
	Document.prototype.removeRef = function (ref) {
	  delete this.nodeMap[ref];
	};
	
	Document.prototype.createDocumentElement = function (type, props) {
	  if (!this.documentElement) {
	    this.documentElement = new Element(type, props, this);
	    this.nodeMap._documentElement = this.documentElement;
	    this.documentElement.ref = '_documentElement';
	    this.documentElement.attached = true;
	  }
	
	  return this.documentElement;
	};
	
	Document.prototype.createBody = function (type, props) {
	  if (!this.body) {
	    this.body = new Element(type, props, this);
	    this.nodeMap._root = this.body;
	    this.body.ref = '_root';
	    this.body.depth = 1;
	  }
	
	  return this.body;
	};
	
	Document.prototype.createElement = function (tagName, props) {
	  return new Element(tagName, props, this);
	};
	
	Document.prototype.createComment = function (text) {
	  return new Comment(text, this);
	};
	
	function Node() {}
	
	Node.prototype.create = function (instanceId) {
	  this.parentRef = null;
	  this.attached = false;
	  if (instanceId) {
	    this.instanceId = instanceId;
	    var doc = instanceMap[instanceId];
	    doc.addRef(this);
	  }
	};
	
	Node.prototype.destroy = function () {
	  var ref = this.ref;
	  var instanceId = this.instanceId;
	  if (instanceId) {
	    var doc = instanceMap[instanceId];
	    doc.removeRef(ref);
	  }
	
	  var children = this.children || [];
	  var length = children.length;
	  for (var i = 0; i < length; i++) {
	    children[i].destroy();
	  }
	};
	
	Node.prototype.getRenderer = function () {
	  var doc = instanceMap[this.instanceId];
	  return doc.listener;
	};
	
	Node.prototype.next = function () {
	  var instanceId = this.instanceId;
	  var doc = instanceMap[instanceId];
	  var parent = doc.getRef(this.parentRef);
	  if (parent) {
	    return parent.children[parent.children.indexOf(this) + 1];
	  }
	};
	
	Node.prototype.prev = function () {
	  var instanceId = this.instanceId;
	  var doc = instanceMap[instanceId];
	  var parent = doc.getRef(this.parentRef);
	  if (parent) {
	    return parent.children[parent.children.indexOf(this) - 1];
	  }
	};
	
	function Element() {
	  var type = arguments.length <= 0 || arguments[0] === undefined ? DEFAULT_TAG_NAME : arguments[0];
	  var props = arguments[1];
	  var ownerDocument = arguments[2];
	
	  props = props || {};
	  this.create(ownerDocument.id);
	  this.ownerDocument = ownerDocument;
	  this.type = type;
	  this.attr = props.attr || {};
	  this.classStyle = props.classStyle || {};
	  this.style = props.style || {};
	  this.event = [];
	  this.children = [];
	  this.pureChildren = [];
	}
	
	Element.prototype = new Node();
	
	Element.prototype.appendChild = function (node) {
	
	  removeIfExisted(node);
	  node.parentRef = this.ref;
	  this.children.push(node);
	
	  if (this.attached) {
	    setAttached(node, this.depth);
	  } else {
	    setDetached(node);
	  }
	
	  if (node instanceof Element) {
	    this.pureChildren.push(node);
	
	    if (this.attached) {
	      var renderer = this.getRenderer();
	      if (renderer) {
	        if (this.ref === '_documentElement') {
	          // if its parent is documentElement then it's a body
	          renderer.createBody(node, this.ref);
	        } else {
	          renderer.addElement(node, this.ref);
	        }
	      }
	    }
	  }
	};
	
	Element.prototype.insertBefore = function (node, before) {
	
	  if (node.parentRef === this.ref) {
	    moveBefore(node, before, this.children);
	    if (node instanceof Element) {
	      var pureBeforeIndex = movePureBefore(node, before, this.pureChildren);
	      if (pureBeforeIndex >= 0 && this.attached) {
	        var renderer = this.getRenderer();
	        if (renderer) {
	          renderer.moveElement(node.ref, this.ref, pureBeforeIndex);
	        }
	      }
	    }
	    return;
	  }
	
	  removeIfExisted(node);
	
	  var children = this.children;
	  var index = children.indexOf(before);
	
	  node.parentRef = this.ref;
	  if (this.attached) {
	    setAttached(node, this.depth);
	  } else {
	    setDetached(node);
	  }
	  children.splice(index, 0, node);
	
	  if (node instanceof Element) {
	    var pureChildren = this.pureChildren;
	    var pureIndex = getPureAfter(before, pureChildren);
	
	    pureChildren.splice(pureIndex, 0, node);
	
	    if (this.attached) {
	      var _renderer = this.getRenderer();
	      if (_renderer) {
	        _renderer.addElement(node, this.ref, pureIndex);
	      }
	    }
	  }
	};
	
	Element.prototype.insertAfter = function (node, after) {
	
	  if (node.parentRef === this.ref) {
	    moveAfter(node, after, this.children);
	    if (node instanceof Element) {
	      var pureAfterIndex = movePureAfter(node, after, this.pureChildren);
	      if (pureAfterIndex >= 0 && this.attached) {
	        var renderer = this.getRenderer();
	        if (renderer) {
	          renderer.moveElement(node.ref, this.ref, pureAfterIndex);
	        }
	      }
	    }
	    return;
	  }
	
	  removeIfExisted(node);
	
	  var children = this.children;
	  var index = children.indexOf(after);
	
	  node.parentRef = this.ref;
	  if (this.attached) {
	    setAttached(node, this.depth);
	  } else {
	    setDetached(node);
	  }
	  children.splice(index + 1, 0, node);
	
	  if (node instanceof Element) {
	    var pureChildren = this.pureChildren;
	    var pureIndex = getPureBefore(after, pureChildren);
	
	    pureChildren.splice(pureIndex + 1, 0, node);
	
	    if (this.attached) {
	      var _renderer2 = this.getRenderer();
	      if (_renderer2) {
	        _renderer2.addElement(node, this.ref, pureIndex + 1);
	      }
	    }
	  }
	};
	
	Element.prototype.removeChild = function (node, preserved) {
	  var children = this.children;
	  var index = children.indexOf(node);
	
	  setDetached(node);
	
	  if (index >= 0) {
	    node.parentRef = null;
	    children.splice(index, 1);
	    if (!preserved) {
	      node.destroy();
	    }
	  }
	
	  if (node instanceof Element) {
	    this.pureChildren.$remove(node);
	    if (this.attached) {
	      var renderer = this.getRenderer();
	      if (renderer) {
	        renderer.removeElement(node.ref);
	      }
	    }
	  }
	};
	
	Element.prototype.clear = function () {
	  var children = this.children;
	  var length = children.length;
	  for (var i = 0; i < length; i++) {
	    var child = children[i];
	    child.parentRef = null;
	    setDetached(child);
	    child.destroy();
	  }
	  children.length = 0;
	
	  if (this.attached) {
	    var refs = this.pureChildren.map(function (child) {
	      return child.ref;
	    });
	    this.pureChildren.length = 0;
	    var renderer = this.getRenderer();
	    if (renderer) {
	      renderer.removeElement(refs);
	    }
	  }
	};
	
	function moveBefore(node, before, children) {
	  var targetIndex = children.indexOf(node);
	  var beforeIndex = children.indexOf(before);
	
	  /* istanbul ignore next */
	  if (targetIndex === beforeIndex || targetIndex + 1 === beforeIndex) {
	    return -1;
	  }
	
	  var newIndex = targetIndex < beforeIndex ? beforeIndex - 1 : beforeIndex;
	  children.splice(targetIndex, 1);
	  children.splice(newIndex, 0, node);
	
	  return beforeIndex;
	}
	
	function movePureBefore(node, before, pureChildren) {
	  var pureTargetIndex = pureChildren.indexOf(node);
	  var pureBeforeIndex = getPureAfter(before, pureChildren);
	
	  /* istanbul ignore next */
	  if (pureTargetIndex === pureBeforeIndex || pureTargetIndex + 1 === pureBeforeIndex) {
	    return -1;
	  }
	
	  var pureNewIndex = pureTargetIndex < pureBeforeIndex ? pureBeforeIndex - 1 : pureBeforeIndex;
	
	  pureChildren.splice(pureTargetIndex, 1);
	  pureChildren.splice(pureNewIndex, 0, node);
	
	  return pureBeforeIndex;
	}
	
	function getPureAfter(node, pureChildren) {
	  var pureIndex = pureChildren.indexOf(node);
	  while (node && pureIndex < 0) {
	    node = node.next();
	    pureIndex = pureChildren.indexOf(node);
	  }
	  if (pureIndex < 0) {
	    pureIndex = pureChildren.length;
	  }
	  return pureIndex;
	}
	
	function moveAfter(node, after, children) {
	  var targetIndex = children.indexOf(node);
	  var afterIndex = children.indexOf(after);
	
	  /* istanbul ignore next */
	  if (targetIndex === afterIndex || targetIndex === afterIndex + 1) {
	    return -1;
	  }
	
	  var newIndex = targetIndex < afterIndex ? afterIndex : afterIndex + 1;
	  children.splice(targetIndex, 1);
	  children.splice(newIndex, 0, node);
	
	  return afterIndex;
	}
	
	function movePureAfter(node, after, pureChildren) {
	  var pureTargetIndex = pureChildren.indexOf(node);
	  var pureAfterIndex = getPureBefore(after, pureChildren);
	
	  /* istanbul ignore next */
	  if (pureTargetIndex === pureAfterIndex || pureTargetIndex === pureAfterIndex + 1) {
	    return -1;
	  }
	
	  var pureNewIndex = pureTargetIndex < pureAfterIndex ? pureAfterIndex : pureAfterIndex + 1;
	
	  pureChildren.splice(pureTargetIndex, 1);
	  pureChildren.splice(pureNewIndex, 0, node);
	
	  return pureAfterIndex + 1;
	}
	
	function getPureBefore(node, pureChildren) {
	  var pureIndex = pureChildren.indexOf(node);
	  while (node && pureIndex < 0) {
	    node = node.prev();
	    pureIndex = pureChildren.indexOf(node);
	  }
	  /* istanbul ignore next */
	  if (pureIndex < 0) {
	    pureIndex = -1;
	  }
	  return pureIndex;
	}
	
	function setAttached(node, depth) {
	  if (node.ref === '_root') {
	    depth = 1;
	  } else {
	    depth = depth > 0 ? depth + 1 : 0;
	  }
	  node.attached = true;
	  node.depth = depth;
	  if (node.children) {
	    node.children.forEach(function (sub) {
	      setAttached(sub, depth);
	    });
	  }
	}
	
	function setDetached(node) {
	  node.attached = false;
	  node.depth = 0;
	  if (node.children) {
	    node.children.forEach(function (sub) {
	      setDetached(sub);
	    });
	  }
	}
	
	function removeIfExisted(node) {
	  var doc = instanceMap[node.instanceId];
	  if (doc) {
	    var existedNode = doc.getRef(node.ref);
	    if (existedNode) {
	      var existedParent = doc.getRef(existedNode.parentRef);
	      if (existedParent && existedParent.removeChild) {
	        existedParent.removeChild(existedNode, true);
	      }
	    }
	  }
	}
	
	Element.prototype.setAttr = function (key, value) {
	  if (this.attr[key] === value) {
	    return;
	  }
	  this.attr[key] = value;
	  if (this.attached) {
	    var renderer = this.getRenderer();
	    if (renderer) {
	      renderer.setAttr(this.ref, key, value);
	    }
	  }
	};
	
	Element.prototype.setStyle = function (key, value) {
	  if (this.style[key] === value) {
	    return;
	  }
	  this.style[key] = value;
	  if (this.attached) {
	    var renderer = this.getRenderer();
	    if (renderer) {
	      renderer.setStyle(this.ref, key, value);
	    }
	  }
	};
	
	Element.prototype.setClassStyle = function (classStyle) {
	  this.classStyle = classStyle;
	  if (this.attached) {
	    var renderer = this.getRenderer();
	    if (renderer) {
	      renderer.setStyles(this.ref, this.toStyle());
	    }
	  }
	};
	
	Element.prototype.addEvent = function (type, handler) {
	  var index = this.event.indexOf(type);
	
	  if (index < 0) {
	    this.event.push(type);
	    var eventManager = this.ownerDocument.eventManager;
	    eventManager.add(this, type, handler);
	
	    if (this.attached) {
	      var renderer = this.getRenderer();
	      if (renderer) {
	        renderer.addEvent(this.ref, type);
	      }
	    }
	  }
	};
	
	Element.prototype.removeEvent = function (type) {
	  var index = this.event.indexOf(type);
	
	  if (index >= 0) {
	    this.event.splice(index, 1);
	    var eventManager = this.ownerDocument.eventManager;
	    eventManager.remove(this, type);
	
	    if (this.attached) {
	      var renderer = this.getRenderer();
	      if (renderer) {
	        renderer.removeEvent(this.ref, type);
	      }
	    }
	  }
	};
	
	Element.prototype.toStyle = function () {
	  var result = {};
	  var classStyle = this.classStyle;
	  var style = this.style;
	  for (var name in classStyle) {
	    result[name] = classStyle[name];
	  }
	  for (var _name in style) {
	    result[_name] = style[_name];
	  }
	  return result;
	};
	
	Element.prototype.toJSON = function () {
	  var result = {
	    ref: this.ref.toString(),
	    type: this.type,
	    attr: this.attr,
	    style: this.toStyle()
	  };
	
	  if (this.event && this.event.length) {
	    result.event = this.event;
	  }
	  if (this.pureChildren && this.pureChildren.length) {
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
	
	function Comment(value, ownerDocument) {
	  this.create(ownerDocument.id);
	  this.type = 'comment';
	  this.value = value;
	}
	
	Comment.prototype = new Node();
	
	Comment.prototype.toString = function () {
	  return '<!-- ' + this.value + ' -->';
	};

/***/ },
/* 105 */
/***/ function(module, exports) {

	module.exports = {
		"name": "weex-jsframework",
		"version": "0.13.4",
		"description": "JS Framework for Weex solution which is a extendable cross-platform solution for dynamic programming and publishing projects",
		"main": "index.js",
		"scripts": {
			"dev": "webpack --watch --config ./webpack.config.js",
			"build": "webpack --config ./webpack.config.js",
			"compress": "uglifyjs dist/index.js -o dist/index.min.js",
			"lint": "jscs --config .jscsrc polyfill/*.js polyfill/__test__/*.js lib/*.js lib/__test__/*.js lib/app/*.js lib/app/__test__/*.js lib/vm/*.js lib/vm/__test__/*.js",
			"test": "mocha --compilers js:babel-core/register polyfill/__test__/*.js lib/__test__/*.js lib/**/__test__/*.js",
			"cover": "babel-node node_modules/isparta/bin/isparta cover --report text node_modules/mocha/bin/_mocha -- --reporter dot lib/__test__/*.js lib/**/__test__/*.js",
			"ci": "npm run lint && npm run cover"
		},
		"repository": {
			"type": "git",
			"url": "git@github.com:alibaba/weex.git"
		},
		"author": [
			{
				"name": "jinjiang",
				"email": "zhaojinjiang@me.com"
			},
			{
				"name": "Terry King",
				"email": "terrykingcha@gmail.com"
			}
		],
		"contributors": [
			{
				"name": "pushiming",
				"email": "pushiming@gmail.com"
			},
			{
				"name": "iskenhuang",
				"email": "iskenhuang@gmail.com"
			},
			{
				"name": "yuanyan",
				"email": "yuanyan.cao@gmail.com"
			}
		],
		"keywords": [
			"weex",
			"mvvm",
			"browser",
			"hybrid",
			"framework"
		],
		"license": "Apache-2.0",
		"dependencies": {
			"semver": "~5.1.0",
			"core-js": "~2.1.1"
		},
		"devDependencies": {
			"babel-cli": "~6.4.5",
			"babel-core": "~6.4.5",
			"babel-loader": "~6.2.1",
			"babel-preset-es2015": "~6.3.13",
			"chai": "~3.2.0",
			"isparta": "~4.0.0",
			"istanbul": "~0.4.2",
			"jscs": "~2.9.0",
			"json-loader": "^0.5.4",
			"mocha": "~2.3.4",
			"sinon": "~1.17.2",
			"sinon-chai": "~2.8.0",
			"uglify-js": "^2.6.2",
			"watch-cli": "~0.2.1",
			"webpack": "~1.12.12"
		},
		"optionalDependencies": {
			"weex-transformer": "~0.1"
		}
	};

/***/ },
/* 106 */
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
	
	var _util = __webpack_require__(81);
	
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
	  nativeLog('the Vm#$ api is deprecated, please use Vm#$vm instead');
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
	  var config = (0, _util.extend)({
	    env: global.WXEnvironment || {}
	  }, this._app.options);
	  (0, _util.typof)(callback) === 'function' && callback(config);
	  return config;
	}
	
	/**
	 * request network via http protocol
	 * @param  {object}   params
	 * @param  {Function} callback
	 */
	function $sendHttp(params, callback) {
	  var stream = this._app.requireModule('stream');
	  stream.sendHttp(params, callback);
	}
	
	/**
	 * open a url
	 * @param  {string} url
	 */
	function $openURL(url) {
	  var event = this._app.requireModule('event');
	  event.openURL(url);
	}
	
	/**
	 * set a title for page
	 * @param  {string} title
	 */
	function $setTitle(title) {
	  var pageInfo = this._app.requireModule('pageInfo');
	  pageInfo.setTitle(title);
	}
	
	/**
	 * invoke a native method by specifing the name of module and method
	 * @param  {string} moduleName
	 * @param  {string} methodName
	 * @param  {...*} the rest arguments
	 */
	function $call(moduleName, methodName) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjljNDg2ZjU1MDA2NjkyNDY2NGQiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vcG9seWZpbGwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vcG9seWZpbGwvb2JqZWN0QXNzaWduLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9mbi9vYmplY3QvYXNzaWduLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19leHBvcnQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9fY29yZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9faGlkZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWRwLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19hbi1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX2lzLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9faWU4LWRvbS1kZWZpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19mYWlscy5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9fZG9tLWNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9fdG8tcHJpbWl0aXZlLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19wcm9wZXJ0eS1kZXNjLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19yZWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9faGFzLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL191aWQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX2N0eC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9fYS1mdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWFzc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWtleXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1rZXlzLWludGVybmFsLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL190by1pb2JqZWN0LmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19pb2JqZWN0LmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19jb2YuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX2RlZmluZWQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX2FycmF5LWluY2x1ZGVzLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL190by1sZW5ndGguanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX3RvLWludGVnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX3RvLWluZGV4LmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19zaGFyZWQta2V5LmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19zaGFyZWQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX2VudW0tYnVnLWtleXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1nb3BzLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19vYmplY3QtcGllLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL190by1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vcG9seWZpbGwvcHJvbWlzZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LnRvLXN0cmluZy5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9fY2xhc3NvZi5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9fd2tzLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX3N0cmluZy1hdC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9faXRlci1kZWZpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX2xpYnJhcnkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX2l0ZXJhdG9ycy5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9faXRlci1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1kcHMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX2h0bWwuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX3NldC10by1zdHJpbmctdGFnLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19vYmplY3QtZ3BvLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5Lml0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19hZGQtdG8tdW5zY29wYWJsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX2l0ZXItc3RlcC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9lczYucHJvbWlzZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9fYW4taW5zdGFuY2UuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX2Zvci1vZi5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9faXRlci1jYWxsLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19pcy1hcnJheS1pdGVyLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9fc2V0LXByb3RvLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19vYmplY3QtZ29wZC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9fc3BlY2llcy1jb25zdHJ1Y3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9fdGFzay5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9faW52b2tlLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19taWNyb3Rhc2suanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX3JlZGVmaW5lLWFsbC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9fc2V0LXNwZWNpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX2l0ZXItZGV0ZWN0LmpzIiwid2VicGFjazovLy8uL3BvbHlmaWxsL3NldFRpbWVvdXQuanMiLCJ3ZWJwYWNrOi8vLy4vcG9seWZpbGwvY29uc29sZWxvZy5qcyIsIndlYnBhY2s6Ly8vLi9saWIvZnJhbWV3b3JrLmpzIiwid2VicGFjazovLy8uL2xpYi9wZXJmLmpzIiwid2VicGFjazovLy8uL2xpYi9sb2cuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9saWIvYXBwL2luZGV4LmpzIiwid2VicGFjazovLy8uL2xpYi91dGlsL2luZGV4LmpzIiwid2VicGFjazovLy8uL2xpYi9hcHAvYnVuZGxlLmpzIiwid2VicGFjazovLy8uL34vc2VtdmVyL3NlbXZlci5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL34vbm9kZS1saWJzLWJyb3dzZXIvfi9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL3ZtL2luZGV4LmpzIiwid2VicGFjazovLy8uL2xpYi92bS9pbnN0YW5jZS9zY29wZS5qcyIsIndlYnBhY2s6Ly8vLi9saWIvdm0vdXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvdm0vb2JzZXJ2ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbGliL3ZtL2NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9saWIvdm0vb2JzZXJ2ZXIvZGVwLmpzIiwid2VicGFjazovLy8uL2xpYi92bS9vYnNlcnZlci9hcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9saWIvdm0vb2JzZXJ2ZXIvb2JqZWN0LmpzIiwid2VicGFjazovLy8uL2xpYi92bS9jb21waWxlci5qcyIsIndlYnBhY2s6Ly8vLi9saWIvdm0vZGlyZWN0aXZlLmpzIiwid2VicGFjazovLy8uL2xpYi92bS93YXRjaGVyLmpzIiwid2VicGFjazovLy8uL2xpYi92bS9kb20taGVscGVyLmpzIiwid2VicGFjazovLy8uL2xpYi92bS9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2FwcC9yZWdpc3Rlci5qcyIsIndlYnBhY2s6Ly8vLi9saWIvYXBwL2Rvd25ncmFkZS5qcyIsIndlYnBhY2s6Ly8vLi9saWIvYXBwL2N0cmwuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2FwcC9kb20tbGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2FwcC9kaWZmZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2FwcC9ldmVudC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvYXBwL2RvbS5qcyIsIndlYnBhY2s6Ly8vLi9wYWNrYWdlLmpzb24iLCJ3ZWJwYWNrOi8vLy4vbGliL2FwaS9tZXRob2RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7O0FDdENBOztBQUNBOztLQUFZOztBQUNaOzs7O0FBRUEsUUFBTyxNQUFQLENBQWMsTUFBZCxFQUFzQixTQUF0QixFQUFpQztBQUM3QixxQ0FENkI7QUFFN0IsMkJBQXdCLDhCQUFxQixrQkFBckIsQ0FBeEI7RUFGSjs7Ozs7QUFRQSxLQUFNLFVBQVUsb0JBQVEsR0FBUixDQUFWO2VBQ29CO0tBQW5COztBQUNQLGlCQUFnQixPQUFoQixFOzs7Ozs7Ozs7QUNkQTs7QUFDQTs7QUFDQTs7QUFDQSx5Qjs7Ozs7Ozs7QUNIQSx3Qjs7Ozs7Ozs7QUNBQSxxQkFBUSxDQUFSO0FBQ0EsUUFBTyxPQUFQLEdBQWlCLG9CQUFRLENBQVIsRUFBK0IsTUFBL0IsQ0FBc0MsTUFBdEMsQzs7Ozs7Ozs7O0FDQWpCLEtBQUksVUFBVSxvQkFBUSxDQUFSLENBQVY7O0FBRUosU0FBUSxRQUFRLENBQVIsR0FBWSxRQUFRLENBQVIsRUFBVyxRQUEvQixFQUF5QyxFQUFDLFFBQVEsb0JBQVEsRUFBUixDQUFSLEVBQTFDLEU7Ozs7Ozs7O0FDSEEsS0FBSSxTQUFZLG9CQUFRLENBQVIsQ0FBWjtLQUNBLE9B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LGFBQVAsSUFBd0IsRUFBeEI7SUFEUSxFQUVaLEtBQUssSUFBTCxDQUFVLE9BQVYsQ0FGRyxDQUQ2QjtBQUluQyxvQkFBTSxRQUFOLE1BQW9CLFVBQXBCLElBQWtDLFNBQVMsTUFBVCxDQUFsQyxDQUptQztBQUtuQyxVQUFPLE1BQVAsQ0FMbUM7RUFBOUI7Ozs7Ozs7QUFhQSxVQUFTLFNBQVQsQ0FBbUIsTUFBbkIsRUFBMkIsUUFBM0IsRUFBcUM7QUFDMUMsT0FBTSxTQUFTLEtBQUssSUFBTCxDQUFVLGFBQVYsQ0FBd0IsUUFBeEIsQ0FBVCxDQURvQztBQUUxQyxVQUFPLFFBQVAsQ0FBZ0IsTUFBaEIsRUFBd0IsUUFBeEIsRUFGMEM7RUFBckM7Ozs7OztBQVNBLFVBQVMsUUFBVCxDQUFrQixHQUFsQixFQUF1QjtBQUM1QixPQUFNLFFBQVEsS0FBSyxJQUFMLENBQVUsYUFBVixDQUF3QixPQUF4QixDQUFSLENBRHNCO0FBRTVCLFNBQU0sT0FBTixDQUFjLEdBQWQsRUFGNEI7RUFBdkI7Ozs7OztBQVNBLFVBQVMsU0FBVCxDQUFtQixLQUFuQixFQUEwQjtBQUMvQixPQUFNLFdBQVcsS0FBSyxJQUFMLENBQVUsYUFBVixDQUF3QixVQUF4QixDQUFYLENBRHlCO0FBRS9CLFlBQVMsUUFBVCxDQUFrQixLQUFsQixFQUYrQjtFQUExQjs7Ozs7Ozs7QUFXQSxVQUFTLEtBQVQsQ0FBZSxVQUFmLEVBQTJCLFVBQTNCLEVBQWdEO0FBQ3JELE9BQU0sU0FBUyxLQUFLLElBQUwsQ0FBVSxhQUFWLENBQXdCLFVBQXhCLENBQVQsQ0FEK0M7QUFFckQsT0FBSSxVQUFVLE9BQU8sVUFBUCxDQUFWLEVBQThCO3VDQUZhOztNQUViOztBQUNoQyxZQUFPLFdBQVAsZUFBc0IsSUFBdEIsRUFEZ0M7SUFBbEMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGI5YzQ4NmY1NTAwNjY5MjQ2NjRkXG4gKiovIiwiaW1wb3J0ICcuL3BvbHlmaWxsJ1xuaW1wb3J0ICogYXMgZnJhbWV3b3JrIGZyb20gJy4vbGliL2ZyYW1ld29yaydcbmltcG9ydCB7dmVyc2lvbiwgb3B0aW9uYWxEZXBlbmRlbmNpZXN9IGZyb20gJy4vcGFja2FnZS5qc29uJ1xuXG5PYmplY3QuYXNzaWduKGdsb2JhbCwgZnJhbWV3b3JrLCB7XG4gICAgZnJhbWV3b3JrVmVyc2lvbjogdmVyc2lvbixcbiAgICBuZWVkVHJhbnNmb3JtZXJWZXJzaW9uOiBvcHRpb25hbERlcGVuZGVuY2llc1snd2VleC10cmFuc2Zvcm1lciddXG59KVxuXG4vKipcbiAqIHJlZ2lzdGVyIG1ldGhvZHNcbiAqL1xuY29uc3QgbWV0aG9kcyA9IHJlcXVpcmUoJy4vbGliL2FwaS9tZXRob2RzJylcbmNvbnN0IHtyZWdpc3Rlck1ldGhvZHN9ID0gZ2xvYmFsXG5yZWdpc3Rlck1ldGhvZHMobWV0aG9kcylcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vaW5kZXguanNcbiAqKi8iLCJpbXBvcnQgJy4vb2JqZWN0QXNzaWduJ1xuaW1wb3J0ICcuL3Byb21pc2UnXG5pbXBvcnQgJy4vc2V0VGltZW91dCdcbmltcG9ydCAnLi9jb25zb2xlbG9nJ1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9wb2x5ZmlsbC9pbmRleC5qc1xuICoqLyIsImltcG9ydCAnY29yZS1qcy9mbi9vYmplY3QvYXNzaWduJ1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9wb2x5ZmlsbC9vYmplY3RBc3NpZ24uanNcbiAqKi8iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3QuYXNzaWduO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL2ZuL29iamVjdC9hc3NpZ24uanNcbiAqKi8iLCIvLyAxOS4xLjMuMSBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlKVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYsICdPYmplY3QnLCB7YXNzaWduOiByZXF1aXJlKCcuL19vYmplY3QtYXNzaWduJyl9KTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduLmpzXG4gKiovIiwidmFyIGdsb2JhbCAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgY29yZSAgICAgID0gcmVxdWlyZSgnLi9fY29yZScpXG4gICwgaGlkZSAgICAgID0gcmVxdWlyZSgnLi9faGlkZScpXG4gICwgcmVkZWZpbmUgID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUnKVxuICAsIGN0eCAgICAgICA9IHJlcXVpcmUoJy4vX2N0eCcpXG4gICwgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG5cbnZhciAkZXhwb3J0ID0gZnVuY3Rpb24odHlwZSwgbmFtZSwgc291cmNlKXtcbiAgdmFyIElTX0ZPUkNFRCA9IHR5cGUgJiAkZXhwb3J0LkZcbiAgICAsIElTX0dMT0JBTCA9IHR5cGUgJiAkZXhwb3J0LkdcbiAgICAsIElTX1NUQVRJQyA9IHR5cGUgJiAkZXhwb3J0LlNcbiAgICAsIElTX1BST1RPICA9IHR5cGUgJiAkZXhwb3J0LlBcbiAgICAsIElTX0JJTkQgICA9IHR5cGUgJiAkZXhwb3J0LkJcbiAgICAsIHRhcmdldCAgICA9IElTX0dMT0JBTCA/IGdsb2JhbCA6IElTX1NUQVRJQyA/IGdsb2JhbFtuYW1lXSB8fCAoZ2xvYmFsW25hbWVdID0ge30pIDogKGdsb2JhbFtuYW1lXSB8fCB7fSlbUFJPVE9UWVBFXVxuICAgICwgZXhwb3J0cyAgID0gSVNfR0xPQkFMID8gY29yZSA6IGNvcmVbbmFtZV0gfHwgKGNvcmVbbmFtZV0gPSB7fSlcbiAgICAsIGV4cFByb3RvICA9IGV4cG9ydHNbUFJPVE9UWVBFXSB8fCAoZXhwb3J0c1tQUk9UT1RZUEVdID0ge30pXG4gICAgLCBrZXksIG93biwgb3V0LCBleHA7XG4gIGlmKElTX0dMT0JBTClzb3VyY2UgPSBuYW1lO1xuICBmb3Ioa2V5IGluIHNvdXJjZSl7XG4gICAgLy8gY29udGFpbnMgaW4gbmF0aXZlXG4gICAgb3duID0gIUlTX0ZPUkNFRCAmJiB0YXJnZXQgJiYgdGFyZ2V0W2tleV0gIT09IHVuZGVmaW5lZDtcbiAgICAvLyBleHBvcnQgbmF0aXZlIG9yIHBhc3NlZFxuICAgIG91dCA9IChvd24gPyB0YXJnZXQgOiBzb3VyY2UpW2tleV07XG4gICAgLy8gYmluZCB0aW1lcnMgdG8gZ2xvYmFsIGZvciBjYWxsIGZyb20gZXhwb3J0IGNvbnRleHRcbiAgICBleHAgPSBJU19CSU5EICYmIG93biA/IGN0eChvdXQsIGdsb2JhbCkgOiBJU19QUk9UTyAmJiB0eXBlb2Ygb3V0ID09ICdmdW5jdGlvbicgPyBjdHgoRnVuY3Rpb24uY2FsbCwgb3V0KSA6IG91dDtcbiAgICAvLyBleHRlbmQgZ2xvYmFsXG4gICAgaWYodGFyZ2V0KXJlZGVmaW5lKHRhcmdldCwga2V5LCBvdXQsIHR5cGUgJiAkZXhwb3J0LlUpO1xuICAgIC8vIGV4cG9ydFxuICAgIGlmKGV4cG9ydHNba2V5XSAhPSBvdXQpaGlkZShleHBvcnRzLCBrZXksIGV4cCk7XG4gICAgaWYoSVNfUFJPVE8gJiYgZXhwUHJvdG9ba2V5XSAhPSBvdXQpZXhwUHJvdG9ba2V5XSA9IG91dDtcbiAgfVxufTtcbmdsb2JhbC5jb3JlID0gY29yZTtcbi8vIHR5cGUgYml0bWFwXG4kZXhwb3J0LkYgPSAxOyAgIC8vIGZvcmNlZFxuJGV4cG9ydC5HID0gMjsgICAvLyBnbG9iYWxcbiRleHBvcnQuUyA9IDQ7ICAgLy8gc3RhdGljXG4kZXhwb3J0LlAgPSA4OyAgIC8vIHByb3RvXG4kZXhwb3J0LkIgPSAxNjsgIC8vIGJpbmRcbiRleHBvcnQuVyA9IDMyOyAgLy8gd3JhcFxuJGV4cG9ydC5VID0gNjQ7ICAvLyBzYWZlXG4kZXhwb3J0LlIgPSAxMjg7IC8vIHJlYWwgcHJvdG8gbWV0aG9kIGZvciBgbGlicmFyeWAgXG5tb2R1bGUuZXhwb3J0cyA9ICRleHBvcnQ7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fZXhwb3J0LmpzXG4gKiovIiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzg2I2lzc3VlY29tbWVudC0xMTU3NTkwMjhcbnZhciBnbG9iYWwgPSBtb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93Lk1hdGggPT0gTWF0aFxuICA/IHdpbmRvdyA6IHR5cGVvZiBzZWxmICE9ICd1bmRlZmluZWQnICYmIHNlbGYuTWF0aCA9PSBNYXRoID8gc2VsZiA6IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5pZih0eXBlb2YgX19nID09ICdudW1iZXInKV9fZyA9IGdsb2JhbDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX2dsb2JhbC5qc1xuICoqLyIsInZhciBjb3JlID0gbW9kdWxlLmV4cG9ydHMgPSB7dmVyc2lvbjogJzIuMS41J307XG5pZih0eXBlb2YgX19lID09ICdudW1iZXInKV9fZSA9IGNvcmU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL19jb3JlLmpzXG4gKiovIiwidmFyIGRQICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKVxuICAsIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBmdW5jdGlvbihvYmplY3QsIGtleSwgdmFsdWUpe1xuICByZXR1cm4gZFAuZihvYmplY3QsIGtleSwgY3JlYXRlRGVzYygxLCB2YWx1ZSkpO1xufSA6IGZ1bmN0aW9uKG9iamVjdCwga2V5LCB2YWx1ZSl7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIHJldHVybiBvYmplY3Q7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX2hpZGUuanNcbiAqKi8iLCJ2YXIgYW5PYmplY3QgICAgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi9faWU4LWRvbS1kZWZpbmUnKVxuICAsIHRvUHJpbWl0aXZlICAgID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJylcbiAgLCBkUCAgICAgICAgICAgICA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcblxuZXhwb3J0cy5mID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpe1xuICBhbk9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBhbk9iamVjdChBdHRyaWJ1dGVzKTtcbiAgaWYoSUU4X0RPTV9ERUZJTkUpdHJ5IHtcbiAgICByZXR1cm4gZFAoTywgUCwgQXR0cmlidXRlcyk7XG4gIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbiAgaWYoJ2dldCcgaW4gQXR0cmlidXRlcyB8fCAnc2V0JyBpbiBBdHRyaWJ1dGVzKXRocm93IFR5cGVFcnJvcignQWNjZXNzb3JzIG5vdCBzdXBwb3J0ZWQhJyk7XG4gIGlmKCd2YWx1ZScgaW4gQXR0cmlidXRlcylPW1BdID0gQXR0cmlidXRlcy52YWx1ZTtcbiAgcmV0dXJuIE87XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1kcC5qc1xuICoqLyIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKCFpc09iamVjdChpdCkpdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYW4gb2JqZWN0IScpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX2FuLW9iamVjdC5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gdHlwZW9mIGl0ID09PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogdHlwZW9mIGl0ID09PSAnZnVuY3Rpb24nO1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL19pcy1vYmplY3QuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpICYmICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uKCl7XHJcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2RpdicpLCAnYScsIHtnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiA3OyB9fSkuYSAhPSA3O1xyXG59KTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL19pZTgtZG9tLWRlZmluZS5qc1xuICoqLyIsIi8vIFRoYW5rJ3MgSUU4IGZvciBoaXMgZnVubnkgZGVmaW5lUHJvcGVydHlcbm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7Z2V0OiBmdW5jdGlvbigpeyByZXR1cm4gNzsgfX0pLmEgIT0gNztcbn0pO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihleGVjKXtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFleGVjKCk7XG4gIH0gY2F0Y2goZSl7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fZmFpbHMuanNcbiAqKi8iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKVxuICAsIGRvY3VtZW50ID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuZG9jdW1lbnRcbiAgLy8gaW4gb2xkIElFIHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFbGVtZW50IGlzICdvYmplY3QnXG4gICwgaXMgPSBpc09iamVjdChkb2N1bWVudCkgJiYgaXNPYmplY3QoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGlzID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdCkgOiB7fTtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fZG9tLWNyZWF0ZS5qc1xuICoqLyIsIi8vIDcuMS4xIFRvUHJpbWl0aXZlKGlucHV0IFssIFByZWZlcnJlZFR5cGVdKVxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG4vLyBpbnN0ZWFkIG9mIHRoZSBFUzYgc3BlYyB2ZXJzaW9uLCB3ZSBkaWRuJ3QgaW1wbGVtZW50IEBAdG9QcmltaXRpdmUgY2FzZVxuLy8gYW5kIHRoZSBzZWNvbmQgYXJndW1lbnQgLSBmbGFnIC0gcHJlZmVycmVkIHR5cGUgaXMgYSBzdHJpbmdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIFMpe1xuICBpZighaXNPYmplY3QoaXQpKXJldHVybiBpdDtcbiAgdmFyIGZuLCB2YWw7XG4gIGlmKFMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpcmV0dXJuIHZhbDtcbiAgaWYodHlwZW9mIChmbiA9IGl0LnZhbHVlT2YpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSlyZXR1cm4gdmFsO1xuICBpZighUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSlyZXR1cm4gdmFsO1xuICB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjb252ZXJ0IG9iamVjdCB0byBwcmltaXRpdmUgdmFsdWVcIik7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX3RvLXByaW1pdGl2ZS5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYml0bWFwLCB2YWx1ZSl7XG4gIHJldHVybiB7XG4gICAgZW51bWVyYWJsZSAgOiAhKGJpdG1hcCAmIDEpLFxuICAgIGNvbmZpZ3VyYWJsZTogIShiaXRtYXAgJiAyKSxcbiAgICB3cml0YWJsZSAgICA6ICEoYml0bWFwICYgNCksXG4gICAgdmFsdWUgICAgICAgOiB2YWx1ZVxuICB9O1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL19wcm9wZXJ0eS1kZXNjLmpzXG4gKiovIiwidmFyIGdsb2JhbCAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgaGlkZSAgICAgID0gcmVxdWlyZSgnLi9faGlkZScpXG4gICwgaGFzICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCBTUkMgICAgICAgPSByZXF1aXJlKCcuL191aWQnKSgnc3JjJylcbiAgLCBUT19TVFJJTkcgPSAndG9TdHJpbmcnXG4gICwgJHRvU3RyaW5nID0gRnVuY3Rpb25bVE9fU1RSSU5HXVxuICAsIFRQTCAgICAgICA9ICgnJyArICR0b1N0cmluZykuc3BsaXQoVE9fU1RSSU5HKTtcblxucmVxdWlyZSgnLi9fY29yZScpLmluc3BlY3RTb3VyY2UgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiAkdG9TdHJpbmcuY2FsbChpdCk7XG59O1xuXG4obW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihPLCBrZXksIHZhbCwgc2FmZSl7XG4gIHZhciBpc0Z1bmN0aW9uID0gdHlwZW9mIHZhbCA9PSAnZnVuY3Rpb24nO1xuICBpZihpc0Z1bmN0aW9uKWhhcyh2YWwsICduYW1lJykgfHwgaGlkZSh2YWwsICduYW1lJywga2V5KTtcbiAgaWYoT1trZXldID09PSB2YWwpcmV0dXJuO1xuICBpZihpc0Z1bmN0aW9uKWhhcyh2YWwsIFNSQykgfHwgaGlkZSh2YWwsIFNSQywgT1trZXldID8gJycgKyBPW2tleV0gOiBUUEwuam9pbihTdHJpbmcoa2V5KSkpO1xuICBpZihPID09PSBnbG9iYWwpe1xuICAgIE9ba2V5XSA9IHZhbDtcbiAgfSBlbHNlIHtcbiAgICBpZighc2FmZSl7XG4gICAgICBkZWxldGUgT1trZXldO1xuICAgICAgaGlkZShPLCBrZXksIHZhbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmKE9ba2V5XSlPW2tleV0gPSB2YWw7XG4gICAgICBlbHNlIGhpZGUoTywga2V5LCB2YWwpO1xuICAgIH1cbiAgfVxuLy8gYWRkIGZha2UgRnVuY3Rpb24jdG9TdHJpbmcgZm9yIGNvcnJlY3Qgd29yayB3cmFwcGVkIG1ldGhvZHMgLyBjb25zdHJ1Y3RvcnMgd2l0aCBtZXRob2RzIGxpa2UgTG9EYXNoIGlzTmF0aXZlXG59KShGdW5jdGlvbi5wcm90b3R5cGUsIFRPX1NUUklORywgZnVuY3Rpb24gdG9TdHJpbmcoKXtcbiAgcmV0dXJuIHR5cGVvZiB0aGlzID09ICdmdW5jdGlvbicgJiYgdGhpc1tTUkNdIHx8ICR0b1N0cmluZy5jYWxsKHRoaXMpO1xufSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fcmVkZWZpbmUuanNcbiAqKi8iLCJ2YXIgaGFzT3duUHJvcGVydHkgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIGtleSl7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGl0LCBrZXkpO1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL19oYXMuanNcbiAqKi8iLCJ2YXIgaWQgPSAwXG4gICwgcHggPSBNYXRoLnJhbmRvbSgpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gJ1N5bWJvbCgnLmNvbmNhdChrZXkgPT09IHVuZGVmaW5lZCA/ICcnIDoga2V5LCAnKV8nLCAoKytpZCArIHB4KS50b1N0cmluZygzNikpO1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL191aWQuanNcbiAqKi8iLCIvLyBvcHRpb25hbCAvIHNpbXBsZSBjb250ZXh0IGJpbmRpbmdcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGZuLCB0aGF0LCBsZW5ndGgpe1xuICBhRnVuY3Rpb24oZm4pO1xuICBpZih0aGF0ID09PSB1bmRlZmluZWQpcmV0dXJuIGZuO1xuICBzd2l0Y2gobGVuZ3RoKXtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jdGlvbihhKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEpO1xuICAgIH07XG4gICAgY2FzZSAyOiByZXR1cm4gZnVuY3Rpb24oYSwgYil7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiKTtcbiAgICB9O1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmN0aW9uKGEsIGIsIGMpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYiwgYyk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24oLyogLi4uYXJncyAqLyl7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gIH07XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX2N0eC5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICBpZih0eXBlb2YgaXQgIT0gJ2Z1bmN0aW9uJyl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uIScpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX2EtZnVuY3Rpb24uanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG4vLyAxOS4xLjIuMSBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlLCAuLi4pXG52YXIgZ2V0S2V5cyAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpXG4gICwgZ09QUyAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wcycpXG4gICwgcElFICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtcGllJylcbiAgLCB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpXG4gICwgSU9iamVjdCAgPSByZXF1aXJlKCcuL19pb2JqZWN0JylcbiAgLCAkYXNzaWduICA9IE9iamVjdC5hc3NpZ247XG5cbi8vIHNob3VsZCB3b3JrIHdpdGggc3ltYm9scyBhbmQgc2hvdWxkIGhhdmUgZGV0ZXJtaW5pc3RpYyBwcm9wZXJ0eSBvcmRlciAoVjggYnVnKVxubW9kdWxlLmV4cG9ydHMgPSAhJGFzc2lnbiB8fCByZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uKCl7XG4gIHZhciBBID0ge31cbiAgICAsIEIgPSB7fVxuICAgICwgUyA9IFN5bWJvbCgpXG4gICAgLCBLID0gJ2FiY2RlZmdoaWprbG1ub3BxcnN0JztcbiAgQVtTXSA9IDc7XG4gIEsuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24oayl7IEJba10gPSBrOyB9KTtcbiAgcmV0dXJuICRhc3NpZ24oe30sIEEpW1NdICE9IDcgfHwgT2JqZWN0LmtleXMoJGFzc2lnbih7fSwgQikpLmpvaW4oJycpICE9IEs7XG59KSA/IGZ1bmN0aW9uIGFzc2lnbih0YXJnZXQsIHNvdXJjZSl7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgdmFyIFQgICAgID0gdG9PYmplY3QodGFyZ2V0KVxuICAgICwgYUxlbiAgPSBhcmd1bWVudHMubGVuZ3RoXG4gICAgLCBpbmRleCA9IDFcbiAgICAsIGdldFN5bWJvbHMgPSBnT1BTLmZcbiAgICAsIGlzRW51bSAgICAgPSBwSUUuZjtcbiAgd2hpbGUoYUxlbiA+IGluZGV4KXtcbiAgICB2YXIgUyAgICAgID0gSU9iamVjdChhcmd1bWVudHNbaW5kZXgrK10pXG4gICAgICAsIGtleXMgICA9IGdldFN5bWJvbHMgPyBnZXRLZXlzKFMpLmNvbmNhdChnZXRTeW1ib2xzKFMpKSA6IGdldEtleXMoUylcbiAgICAgICwgbGVuZ3RoID0ga2V5cy5sZW5ndGhcbiAgICAgICwgaiAgICAgID0gMFxuICAgICAgLCBrZXk7XG4gICAgd2hpbGUobGVuZ3RoID4gailpZihpc0VudW0uY2FsbChTLCBrZXkgPSBrZXlzW2orK10pKVRba2V5XSA9IFNba2V5XTtcbiAgfSByZXR1cm4gVDtcbn0gOiAkYXNzaWduO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1hc3NpZ24uanNcbiAqKi8iLCIvLyAxOS4xLjIuMTQgLyAxNS4yLjMuMTQgT2JqZWN0LmtleXMoTylcclxudmFyICRrZXlzICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMtaW50ZXJuYWwnKVxyXG4gICwgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5rZXlzIHx8IGZ1bmN0aW9uIGtleXMoTyl7XHJcbiAgcmV0dXJuICRrZXlzKE8sIGVudW1CdWdLZXlzKTtcclxufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL19vYmplY3Qta2V5cy5qc1xuICoqLyIsInZhciBoYXMgICAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxyXG4gICwgdG9JT2JqZWN0ICAgID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXHJcbiAgLCBhcnJheUluZGV4T2YgPSByZXF1aXJlKCcuL19hcnJheS1pbmNsdWRlcycpKGZhbHNlKVxyXG4gICwgSUVfUFJPVE8gICAgID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmplY3QsIG5hbWVzKXtcclxuICB2YXIgTyAgICAgID0gdG9JT2JqZWN0KG9iamVjdClcclxuICAgICwgaSAgICAgID0gMFxyXG4gICAgLCByZXN1bHQgPSBbXVxyXG4gICAgLCBrZXk7XHJcbiAgZm9yKGtleSBpbiBPKWlmKGtleSAhPSBJRV9QUk9UTyloYXMoTywga2V5KSAmJiByZXN1bHQucHVzaChrZXkpO1xyXG4gIC8vIERvbid0IGVudW0gYnVnICYgaGlkZGVuIGtleXNcclxuICB3aGlsZShuYW1lcy5sZW5ndGggPiBpKWlmKGhhcyhPLCBrZXkgPSBuYW1lc1tpKytdKSl7XHJcbiAgICB+YXJyYXlJbmRleE9mKHJlc3VsdCwga2V5KSB8fCByZXN1bHQucHVzaChrZXkpO1xyXG4gIH1cclxuICByZXR1cm4gcmVzdWx0O1xyXG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1rZXlzLWludGVybmFsLmpzXG4gKiovIiwiLy8gdG8gaW5kZXhlZCBvYmplY3QsIHRvT2JqZWN0IHdpdGggZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBzdHJpbmdzXG52YXIgSU9iamVjdCA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKVxuICAsIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIElPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL190by1pb2JqZWN0LmpzXG4gKiovIiwiLy8gZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBhbmQgbm9uLWVudW1lcmFibGUgb2xkIFY4IHN0cmluZ3NcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKTtcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0KCd6JykucHJvcGVydHlJc0VudW1lcmFibGUoMCkgPyBPYmplY3QgOiBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBjb2YoaXQpID09ICdTdHJpbmcnID8gaXQuc3BsaXQoJycpIDogT2JqZWN0KGl0KTtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9faW9iamVjdC5qc1xuICoqLyIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoaXQpLnNsaWNlKDgsIC0xKTtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fY29mLmpzXG4gKiovIiwiLy8gNy4yLjEgUmVxdWlyZU9iamVjdENvZXJjaWJsZShhcmd1bWVudClcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICBpZihpdCA9PSB1bmRlZmluZWQpdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gIFwiICsgaXQpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX2RlZmluZWQuanNcbiAqKi8iLCIvLyBmYWxzZSAtPiBBcnJheSNpbmRleE9mXG4vLyB0cnVlICAtPiBBcnJheSNpbmNsdWRlc1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxuICAsIHRvTGVuZ3RoICA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpXG4gICwgdG9JbmRleCAgID0gcmVxdWlyZSgnLi9fdG8taW5kZXgnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oSVNfSU5DTFVERVMpe1xuICByZXR1cm4gZnVuY3Rpb24oJHRoaXMsIGVsLCBmcm9tSW5kZXgpe1xuICAgIHZhciBPICAgICAgPSB0b0lPYmplY3QoJHRoaXMpXG4gICAgICAsIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKVxuICAgICAgLCBpbmRleCAgPSB0b0luZGV4KGZyb21JbmRleCwgbGVuZ3RoKVxuICAgICAgLCB2YWx1ZTtcbiAgICAvLyBBcnJheSNpbmNsdWRlcyB1c2VzIFNhbWVWYWx1ZVplcm8gZXF1YWxpdHkgYWxnb3JpdGhtXG4gICAgaWYoSVNfSU5DTFVERVMgJiYgZWwgIT0gZWwpd2hpbGUobGVuZ3RoID4gaW5kZXgpe1xuICAgICAgdmFsdWUgPSBPW2luZGV4KytdO1xuICAgICAgaWYodmFsdWUgIT0gdmFsdWUpcmV0dXJuIHRydWU7XG4gICAgLy8gQXJyYXkjdG9JbmRleCBpZ25vcmVzIGhvbGVzLCBBcnJheSNpbmNsdWRlcyAtIG5vdFxuICAgIH0gZWxzZSBmb3IoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKWlmKElTX0lOQ0xVREVTIHx8IGluZGV4IGluIE8pe1xuICAgICAgaWYoT1tpbmRleF0gPT09IGVsKXJldHVybiBJU19JTkNMVURFUyB8fCBpbmRleDtcbiAgICB9IHJldHVybiAhSVNfSU5DTFVERVMgJiYgLTE7XG4gIH07XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX2FycmF5LWluY2x1ZGVzLmpzXG4gKiovIiwiLy8gNy4xLjE1IFRvTGVuZ3RoXG52YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpXG4gICwgbWluICAgICAgID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGl0ID4gMCA/IG1pbih0b0ludGVnZXIoaXQpLCAweDFmZmZmZmZmZmZmZmZmKSA6IDA7IC8vIHBvdygyLCA1MykgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fdG8tbGVuZ3RoLmpzXG4gKiovIiwiLy8gNy4xLjQgVG9JbnRlZ2VyXG52YXIgY2VpbCAgPSBNYXRoLmNlaWxcbiAgLCBmbG9vciA9IE1hdGguZmxvb3I7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGlzTmFOKGl0ID0gK2l0KSA/IDAgOiAoaXQgPiAwID8gZmxvb3IgOiBjZWlsKShpdCk7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX3RvLWludGVnZXIuanNcbiAqKi8iLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpXG4gICwgbWF4ICAgICAgID0gTWF0aC5tYXhcbiAgLCBtaW4gICAgICAgPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaW5kZXgsIGxlbmd0aCl7XG4gIGluZGV4ID0gdG9JbnRlZ2VyKGluZGV4KTtcbiAgcmV0dXJuIGluZGV4IDwgMCA/IG1heChpbmRleCArIGxlbmd0aCwgMCkgOiBtaW4oaW5kZXgsIGxlbmd0aCk7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX3RvLWluZGV4LmpzXG4gKiovIiwidmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpKCdrZXlzJylcclxuICAsIHVpZCAgICA9IHJlcXVpcmUoJy4vX3VpZCcpO1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XHJcbiAgcmV0dXJuIHNoYXJlZFtrZXldIHx8IChzaGFyZWRba2V5XSA9IHVpZChrZXkpKTtcclxufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL19zaGFyZWQta2V5LmpzXG4gKiovIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgU0hBUkVEID0gJ19fY29yZS1qc19zaGFyZWRfXydcbiAgLCBzdG9yZSAgPSBnbG9iYWxbU0hBUkVEXSB8fCAoZ2xvYmFsW1NIQVJFRF0gPSB7fSk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIHJldHVybiBzdG9yZVtrZXldIHx8IChzdG9yZVtrZXldID0ge30pO1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL19zaGFyZWQuanNcbiAqKi8iLCIvLyBJRSA4LSBkb24ndCBlbnVtIGJ1ZyBrZXlzXHJcbm1vZHVsZS5leHBvcnRzID0gKFxyXG4gICdjb25zdHJ1Y3RvcixoYXNPd25Qcm9wZXJ0eSxpc1Byb3RvdHlwZU9mLHByb3BlcnR5SXNFbnVtZXJhYmxlLHRvTG9jYWxlU3RyaW5nLHRvU3RyaW5nLHZhbHVlT2YnXHJcbikuc3BsaXQoJywnKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL19lbnVtLWJ1Zy1rZXlzLmpzXG4gKiovIiwiZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL19vYmplY3QtZ29wcy5qc1xuICoqLyIsImV4cG9ydHMuZiA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1waWUuanNcbiAqKi8iLCIvLyA3LjEuMTMgVG9PYmplY3QoYXJndW1lbnQpXG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fdG8tb2JqZWN0LmpzXG4gKiovIiwiLy8gZml4IFByb21pc2UgUHJvYmxlbSBvbiBKU0NvbnRleHQgb2YgaU9TN344XG4vLyBAc2VlIGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xMzU4NjZcbmdsb2JhbC5Qcm9taXNlID0gbnVsbFxucmVxdWlyZSgnY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3QudG8tc3RyaW5nJylcbnJlcXVpcmUoJ2NvcmUtanMvbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJylcbnJlcXVpcmUoJ2NvcmUtanMvbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlJylcbnJlcXVpcmUoJ2NvcmUtanMvbW9kdWxlcy9lczYucHJvbWlzZScpXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9wb2x5ZmlsbC9wcm9taXNlLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuLy8gMTkuMS4zLjYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZygpXG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4vX2NsYXNzb2YnKVxuICAsIHRlc3QgICAgPSB7fTtcbnRlc3RbcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJyldID0gJ3onO1xuaWYodGVzdCArICcnICE9ICdbb2JqZWN0IHpdJyl7XG4gIHJlcXVpcmUoJy4vX3JlZGVmaW5lJykoT2JqZWN0LnByb3RvdHlwZSwgJ3RvU3RyaW5nJywgZnVuY3Rpb24gdG9TdHJpbmcoKXtcbiAgICByZXR1cm4gJ1tvYmplY3QgJyArIGNsYXNzb2YodGhpcykgKyAnXSc7XG4gIH0sIHRydWUpO1xufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC50by1zdHJpbmcuanNcbiAqKi8iLCIvLyBnZXR0aW5nIHRhZyBmcm9tIDE5LjEuMy42IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcoKVxudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpXG4gICwgVEFHID0gcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJylcbiAgLy8gRVMzIHdyb25nIGhlcmVcbiAgLCBBUkcgPSBjb2YoZnVuY3Rpb24oKXsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKSA9PSAnQXJndW1lbnRzJztcblxuLy8gZmFsbGJhY2sgZm9yIElFMTEgU2NyaXB0IEFjY2VzcyBEZW5pZWQgZXJyb3JcbnZhciB0cnlHZXQgPSBmdW5jdGlvbihpdCwga2V5KXtcbiAgdHJ5IHtcbiAgICByZXR1cm4gaXRba2V5XTtcbiAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHZhciBPLCBULCBCO1xuICByZXR1cm4gaXQgPT09IHVuZGVmaW5lZCA/ICdVbmRlZmluZWQnIDogaXQgPT09IG51bGwgPyAnTnVsbCdcbiAgICAvLyBAQHRvU3RyaW5nVGFnIGNhc2VcbiAgICA6IHR5cGVvZiAoVCA9IHRyeUdldChPID0gT2JqZWN0KGl0KSwgVEFHKSkgPT0gJ3N0cmluZycgPyBUXG4gICAgLy8gYnVpbHRpblRhZyBjYXNlXG4gICAgOiBBUkcgPyBjb2YoTylcbiAgICAvLyBFUzMgYXJndW1lbnRzIGZhbGxiYWNrXG4gICAgOiAoQiA9IGNvZihPKSkgPT0gJ09iamVjdCcgJiYgdHlwZW9mIE8uY2FsbGVlID09ICdmdW5jdGlvbicgPyAnQXJndW1lbnRzJyA6IEI7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX2NsYXNzb2YuanNcbiAqKi8iLCJ2YXIgc3RvcmUgICAgICA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpKCd3a3MnKVxuICAsIHVpZCAgICAgICAgPSByZXF1aXJlKCcuL191aWQnKVxuICAsIFN5bWJvbCAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5TeW1ib2xcbiAgLCBVU0VfU1lNQk9MID0gdHlwZW9mIFN5bWJvbCA9PSAnZnVuY3Rpb24nO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihuYW1lKXtcbiAgcmV0dXJuIHN0b3JlW25hbWVdIHx8IChzdG9yZVtuYW1lXSA9XG4gICAgVVNFX1NZTUJPTCAmJiBTeW1ib2xbbmFtZV0gfHwgKFVTRV9TWU1CT0wgPyBTeW1ib2wgOiB1aWQpKCdTeW1ib2wuJyArIG5hbWUpKTtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fd2tzLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyICRhdCAgPSByZXF1aXJlKCcuL19zdHJpbmctYXQnKSh0cnVlKTtcblxuLy8gMjEuMS4zLjI3IFN0cmluZy5wcm90b3R5cGVbQEBpdGVyYXRvcl0oKVxucmVxdWlyZSgnLi9faXRlci1kZWZpbmUnKShTdHJpbmcsICdTdHJpbmcnLCBmdW5jdGlvbihpdGVyYXRlZCl7XG4gIHRoaXMuX3QgPSBTdHJpbmcoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbi8vIDIxLjEuNS4yLjEgJVN0cmluZ0l0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcbn0sIGZ1bmN0aW9uKCl7XG4gIHZhciBPICAgICA9IHRoaXMuX3RcbiAgICAsIGluZGV4ID0gdGhpcy5faVxuICAgICwgcG9pbnQ7XG4gIGlmKGluZGV4ID49IE8ubGVuZ3RoKXJldHVybiB7dmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZX07XG4gIHBvaW50ID0gJGF0KE8sIGluZGV4KTtcbiAgdGhpcy5faSArPSBwb2ludC5sZW5ndGg7XG4gIHJldHVybiB7dmFsdWU6IHBvaW50LCBkb25lOiBmYWxzZX07XG59KTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3IuanNcbiAqKi8iLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpXG4gICwgZGVmaW5lZCAgID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xuLy8gdHJ1ZSAgLT4gU3RyaW5nI2F0XG4vLyBmYWxzZSAtPiBTdHJpbmcjY29kZVBvaW50QXRcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oVE9fU1RSSU5HKXtcbiAgcmV0dXJuIGZ1bmN0aW9uKHRoYXQsIHBvcyl7XG4gICAgdmFyIHMgPSBTdHJpbmcoZGVmaW5lZCh0aGF0KSlcbiAgICAgICwgaSA9IHRvSW50ZWdlcihwb3MpXG4gICAgICAsIGwgPSBzLmxlbmd0aFxuICAgICAgLCBhLCBiO1xuICAgIGlmKGkgPCAwIHx8IGkgPj0gbClyZXR1cm4gVE9fU1RSSU5HID8gJycgOiB1bmRlZmluZWQ7XG4gICAgYSA9IHMuY2hhckNvZGVBdChpKTtcbiAgICByZXR1cm4gYSA8IDB4ZDgwMCB8fCBhID4gMHhkYmZmIHx8IGkgKyAxID09PSBsIHx8IChiID0gcy5jaGFyQ29kZUF0KGkgKyAxKSkgPCAweGRjMDAgfHwgYiA+IDB4ZGZmZlxuICAgICAgPyBUT19TVFJJTkcgPyBzLmNoYXJBdChpKSA6IGFcbiAgICAgIDogVE9fU1RSSU5HID8gcy5zbGljZShpLCBpICsgMikgOiAoYSAtIDB4ZDgwMCA8PCAxMCkgKyAoYiAtIDB4ZGMwMCkgKyAweDEwMDAwO1xuICB9O1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL19zdHJpbmctYXQuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgTElCUkFSWSAgICAgICAgPSByZXF1aXJlKCcuL19saWJyYXJ5JylcbiAgLCAkZXhwb3J0ICAgICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgcmVkZWZpbmUgICAgICAgPSByZXF1aXJlKCcuL19yZWRlZmluZScpXG4gICwgaGlkZSAgICAgICAgICAgPSByZXF1aXJlKCcuL19oaWRlJylcbiAgLCBoYXMgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgSXRlcmF0b3JzICAgICAgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKVxuICAsICRpdGVyQ3JlYXRlICAgID0gcmVxdWlyZSgnLi9faXRlci1jcmVhdGUnKVxuICAsIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKVxuICAsIGdldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdwbycpXG4gICwgSVRFUkFUT1IgICAgICAgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKVxuICAsIEJVR0dZICAgICAgICAgID0gIShbXS5rZXlzICYmICduZXh0JyBpbiBbXS5rZXlzKCkpIC8vIFNhZmFyaSBoYXMgYnVnZ3kgaXRlcmF0b3JzIHcvbyBgbmV4dGBcbiAgLCBGRl9JVEVSQVRPUiAgICA9ICdAQGl0ZXJhdG9yJ1xuICAsIEtFWVMgICAgICAgICAgID0gJ2tleXMnXG4gICwgVkFMVUVTICAgICAgICAgPSAndmFsdWVzJztcblxudmFyIHJldHVyblRoaXMgPSBmdW5jdGlvbigpeyByZXR1cm4gdGhpczsgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihCYXNlLCBOQU1FLCBDb25zdHJ1Y3RvciwgbmV4dCwgREVGQVVMVCwgSVNfU0VULCBGT1JDRUQpe1xuICAkaXRlckNyZWF0ZShDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCk7XG4gIHZhciBnZXRNZXRob2QgPSBmdW5jdGlvbihraW5kKXtcbiAgICBpZighQlVHR1kgJiYga2luZCBpbiBwcm90bylyZXR1cm4gcHJvdG9ba2luZF07XG4gICAgc3dpdGNoKGtpbmQpe1xuICAgICAgY2FzZSBLRVlTOiByZXR1cm4gZnVuY3Rpb24ga2V5cygpeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICAgICAgY2FzZSBWQUxVRVM6IHJldHVybiBmdW5jdGlvbiB2YWx1ZXMoKXsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgICB9IHJldHVybiBmdW5jdGlvbiBlbnRyaWVzKCl7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gIH07XG4gIHZhciBUQUcgICAgICAgID0gTkFNRSArICcgSXRlcmF0b3InXG4gICAgLCBERUZfVkFMVUVTID0gREVGQVVMVCA9PSBWQUxVRVNcbiAgICAsIFZBTFVFU19CVUcgPSBmYWxzZVxuICAgICwgcHJvdG8gICAgICA9IEJhc2UucHJvdG90eXBlXG4gICAgLCAkbmF0aXZlICAgID0gcHJvdG9bSVRFUkFUT1JdIHx8IHByb3RvW0ZGX0lURVJBVE9SXSB8fCBERUZBVUxUICYmIHByb3RvW0RFRkFVTFRdXG4gICAgLCAkZGVmYXVsdCAgID0gJG5hdGl2ZSB8fCBnZXRNZXRob2QoREVGQVVMVClcbiAgICAsICRlbnRyaWVzICAgPSBERUZBVUxUID8gIURFRl9WQUxVRVMgPyAkZGVmYXVsdCA6IGdldE1ldGhvZCgnZW50cmllcycpIDogdW5kZWZpbmVkXG4gICAgLCAkYW55TmF0aXZlID0gTkFNRSA9PSAnQXJyYXknID8gcHJvdG8uZW50cmllcyB8fCAkbmF0aXZlIDogJG5hdGl2ZVxuICAgICwgbWV0aG9kcywga2V5LCBJdGVyYXRvclByb3RvdHlwZTtcbiAgLy8gRml4IG5hdGl2ZVxuICBpZigkYW55TmF0aXZlKXtcbiAgICBJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvdHlwZU9mKCRhbnlOYXRpdmUuY2FsbChuZXcgQmFzZSkpO1xuICAgIGlmKEl0ZXJhdG9yUHJvdG90eXBlICE9PSBPYmplY3QucHJvdG90eXBlKXtcbiAgICAgIC8vIFNldCBAQHRvU3RyaW5nVGFnIHRvIG5hdGl2ZSBpdGVyYXRvcnNcbiAgICAgIHNldFRvU3RyaW5nVGFnKEl0ZXJhdG9yUHJvdG90eXBlLCBUQUcsIHRydWUpO1xuICAgICAgLy8gZml4IGZvciBzb21lIG9sZCBlbmdpbmVzXG4gICAgICBpZighTElCUkFSWSAmJiAhaGFzKEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUikpaGlkZShJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IsIHJldHVyblRoaXMpO1xuICAgIH1cbiAgfVxuICAvLyBmaXggQXJyYXkje3ZhbHVlcywgQEBpdGVyYXRvcn0ubmFtZSBpbiBWOCAvIEZGXG4gIGlmKERFRl9WQUxVRVMgJiYgJG5hdGl2ZSAmJiAkbmF0aXZlLm5hbWUgIT09IFZBTFVFUyl7XG4gICAgVkFMVUVTX0JVRyA9IHRydWU7XG4gICAgJGRlZmF1bHQgPSBmdW5jdGlvbiB2YWx1ZXMoKXsgcmV0dXJuICRuYXRpdmUuY2FsbCh0aGlzKTsgfTtcbiAgfVxuICAvLyBEZWZpbmUgaXRlcmF0b3JcbiAgaWYoKCFMSUJSQVJZIHx8IEZPUkNFRCkgJiYgKEJVR0dZIHx8IFZBTFVFU19CVUcgfHwgIXByb3RvW0lURVJBVE9SXSkpe1xuICAgIGhpZGUocHJvdG8sIElURVJBVE9SLCAkZGVmYXVsdCk7XG4gIH1cbiAgLy8gUGx1ZyBmb3IgbGlicmFyeVxuICBJdGVyYXRvcnNbTkFNRV0gPSAkZGVmYXVsdDtcbiAgSXRlcmF0b3JzW1RBR10gID0gcmV0dXJuVGhpcztcbiAgaWYoREVGQVVMVCl7XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHZhbHVlczogIERFRl9WQUxVRVMgPyAkZGVmYXVsdCA6IGdldE1ldGhvZChWQUxVRVMpLFxuICAgICAga2V5czogICAgSVNfU0VUICAgICA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKEtFWVMpLFxuICAgICAgZW50cmllczogJGVudHJpZXNcbiAgICB9O1xuICAgIGlmKEZPUkNFRClmb3Ioa2V5IGluIG1ldGhvZHMpe1xuICAgICAgaWYoIShrZXkgaW4gcHJvdG8pKXJlZGVmaW5lKHByb3RvLCBrZXksIG1ldGhvZHNba2V5XSk7XG4gICAgfSBlbHNlICRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogKEJVR0dZIHx8IFZBTFVFU19CVUcpLCBOQU1FLCBtZXRob2RzKTtcbiAgfVxuICByZXR1cm4gbWV0aG9kcztcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9faXRlci1kZWZpbmUuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZhbHNlO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX2xpYnJhcnkuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX2l0ZXJhdG9ycy5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBjcmVhdGUgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1jcmVhdGUnKVxuICAsIGRlc2NyaXB0b3IgICAgID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpXG4gICwgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpXG4gICwgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcblxuLy8gMjUuMS4yLjEuMSAlSXRlcmF0b3JQcm90b3R5cGUlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vX2hpZGUnKShJdGVyYXRvclByb3RvdHlwZSwgcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyksIGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzOyB9KTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCl7XG4gIENvbnN0cnVjdG9yLnByb3RvdHlwZSA9IGNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSwge25leHQ6IGRlc2NyaXB0b3IoMSwgbmV4dCl9KTtcbiAgc2V0VG9TdHJpbmdUYWcoQ29uc3RydWN0b3IsIE5BTUUgKyAnIEl0ZXJhdG9yJyk7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX2l0ZXItY3JlYXRlLmpzXG4gKiovIiwiLy8gMTkuMS4yLjIgLyAxNS4yLjMuNSBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXHJcbnZhciBhbk9iamVjdCAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXHJcbiAgLCBkUHMgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcHMnKVxyXG4gICwgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJylcclxuICAsIElFX1BST1RPICAgID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpXHJcbiAgLCBFbXB0eSAgICAgICA9IGZ1bmN0aW9uKCl7IC8qIGVtcHR5ICovIH1cclxuICAsIFBST1RPVFlQRSAgID0gJ3Byb3RvdHlwZSc7XHJcblxyXG4vLyBDcmVhdGUgb2JqZWN0IHdpdGggZmFrZSBgbnVsbGAgcHJvdG90eXBlOiB1c2UgaWZyYW1lIE9iamVjdCB3aXRoIGNsZWFyZWQgcHJvdG90eXBlXHJcbnZhciBjcmVhdGVEaWN0ID0gZnVuY3Rpb24oKXtcclxuICAvLyBUaHJhc2gsIHdhc3RlIGFuZCBzb2RvbXk6IElFIEdDIGJ1Z1xyXG4gIHZhciBpZnJhbWUgPSByZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2lmcmFtZScpXHJcbiAgICAsIGkgICAgICA9IGVudW1CdWdLZXlzLmxlbmd0aFxyXG4gICAgLCBndCAgICAgPSAnPidcclxuICAgICwgaWZyYW1lRG9jdW1lbnQ7XHJcbiAgaWZyYW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgcmVxdWlyZSgnLi9faHRtbCcpLmFwcGVuZENoaWxkKGlmcmFtZSk7XHJcbiAgaWZyYW1lLnNyYyA9ICdqYXZhc2NyaXB0Oic7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tc2NyaXB0LXVybFxyXG4gIC8vIGNyZWF0ZURpY3QgPSBpZnJhbWUuY29udGVudFdpbmRvdy5PYmplY3Q7XHJcbiAgLy8gaHRtbC5yZW1vdmVDaGlsZChpZnJhbWUpO1xyXG4gIGlmcmFtZURvY3VtZW50ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQ7XHJcbiAgaWZyYW1lRG9jdW1lbnQub3BlbigpO1xyXG4gIGlmcmFtZURvY3VtZW50LndyaXRlKCc8c2NyaXB0PmRvY3VtZW50LkY9T2JqZWN0PC9zY3JpcHQnICsgZ3QpO1xyXG4gIGlmcmFtZURvY3VtZW50LmNsb3NlKCk7XHJcbiAgY3JlYXRlRGljdCA9IGlmcmFtZURvY3VtZW50LkY7XHJcbiAgd2hpbGUoaS0tKWRlbGV0ZSBjcmVhdGVEaWN0W1BST1RPVFlQRV1bZW51bUJ1Z0tleXNbaV1dO1xyXG4gIHJldHVybiBjcmVhdGVEaWN0KCk7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5jcmVhdGUgfHwgZnVuY3Rpb24gY3JlYXRlKE8sIFByb3BlcnRpZXMpe1xyXG4gIHZhciByZXN1bHQ7XHJcbiAgaWYoTyAhPT0gbnVsbCl7XHJcbiAgICBFbXB0eVtQUk9UT1RZUEVdID0gYW5PYmplY3QoTyk7XHJcbiAgICByZXN1bHQgPSBuZXcgRW1wdHk7XHJcbiAgICBFbXB0eVtQUk9UT1RZUEVdID0gbnVsbDtcclxuICAgIC8vIGFkZCBcIl9fcHJvdG9fX1wiIGZvciBPYmplY3QuZ2V0UHJvdG90eXBlT2YgcG9seWZpbGxcclxuICAgIHJlc3VsdFtJRV9QUk9UT10gPSBPO1xyXG4gIH0gZWxzZSByZXN1bHQgPSBjcmVhdGVEaWN0KCk7XHJcbiAgcmV0dXJuIFByb3BlcnRpZXMgPT09IHVuZGVmaW5lZCA/IHJlc3VsdCA6IGRQcyhyZXN1bHQsIFByb3BlcnRpZXMpO1xyXG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1jcmVhdGUuanNcbiAqKi8iLCJ2YXIgZFAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKVxyXG4gICwgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxyXG4gICwgZ2V0S2V5cyAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gT2JqZWN0LmRlZmluZVByb3BlcnRpZXMgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKE8sIFByb3BlcnRpZXMpe1xyXG4gIGFuT2JqZWN0KE8pO1xyXG4gIHZhciBrZXlzICAgPSBnZXRLZXlzKFByb3BlcnRpZXMpXHJcbiAgICAsIGxlbmd0aCA9IGtleXMubGVuZ3RoXHJcbiAgICAsIGkgPSAwXHJcbiAgICAsIFA7XHJcbiAgd2hpbGUobGVuZ3RoID4gaSlkUC5mKE8sIFAgPSBrZXlzW2krK10sIFByb3BlcnRpZXNbUF0pO1xyXG4gIHJldHVybiBPO1xyXG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1kcHMuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmRvY3VtZW50ICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL19odG1sLmpzXG4gKiovIiwidmFyIGRlZiA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmZcbiAgLCBoYXMgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIFRBRyA9IHJlcXVpcmUoJy4vX3drcycpKCd0b1N0cmluZ1RhZycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCB0YWcsIHN0YXQpe1xuICBpZihpdCAmJiAhaGFzKGl0ID0gc3RhdCA/IGl0IDogaXQucHJvdG90eXBlLCBUQUcpKWRlZihpdCwgVEFHLCB7Y29uZmlndXJhYmxlOiB0cnVlLCB2YWx1ZTogdGFnfSk7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX3NldC10by1zdHJpbmctdGFnLmpzXG4gKiovIiwiLy8gMTkuMS4yLjkgLyAxNS4yLjMuMiBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTylcclxudmFyIGhhcyAgICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcclxuICAsIHRvT2JqZWN0ICAgID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcclxuICAsIElFX1BST1RPICAgID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpXHJcbiAgLCBPYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbihPKXtcclxuICBPID0gdG9PYmplY3QoTyk7XHJcbiAgaWYoaGFzKE8sIElFX1BST1RPKSlyZXR1cm4gT1tJRV9QUk9UT107XHJcbiAgaWYodHlwZW9mIE8uY29uc3RydWN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBPIGluc3RhbmNlb2YgTy5jb25zdHJ1Y3Rvcil7XHJcbiAgICByZXR1cm4gTy5jb25zdHJ1Y3Rvci5wcm90b3R5cGU7XHJcbiAgfSByZXR1cm4gTyBpbnN0YW5jZW9mIE9iamVjdCA/IE9iamVjdFByb3RvIDogbnVsbDtcclxufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL19vYmplY3QtZ3BvLmpzXG4gKiovIiwidmFyICRpdGVyYXRvcnMgICAgPSByZXF1aXJlKCcuL2VzNi5hcnJheS5pdGVyYXRvcicpXG4gICwgcmVkZWZpbmUgICAgICA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJylcbiAgLCBnbG9iYWwgICAgICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBoaWRlICAgICAgICAgID0gcmVxdWlyZSgnLi9faGlkZScpXG4gICwgSXRlcmF0b3JzICAgICA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpXG4gICwgd2tzICAgICAgICAgICA9IHJlcXVpcmUoJy4vX3drcycpXG4gICwgSVRFUkFUT1IgICAgICA9IHdrcygnaXRlcmF0b3InKVxuICAsIFRPX1NUUklOR19UQUcgPSB3a3MoJ3RvU3RyaW5nVGFnJylcbiAgLCBBcnJheVZhbHVlcyAgID0gSXRlcmF0b3JzLkFycmF5O1xuXG5mb3IodmFyIGNvbGxlY3Rpb25zID0gWydOb2RlTGlzdCcsICdET01Ub2tlbkxpc3QnLCAnTWVkaWFMaXN0JywgJ1N0eWxlU2hlZXRMaXN0JywgJ0NTU1J1bGVMaXN0J10sIGkgPSAwOyBpIDwgNTsgaSsrKXtcbiAgdmFyIE5BTUUgICAgICAgPSBjb2xsZWN0aW9uc1tpXVxuICAgICwgQ29sbGVjdGlvbiA9IGdsb2JhbFtOQU1FXVxuICAgICwgcHJvdG8gICAgICA9IENvbGxlY3Rpb24gJiYgQ29sbGVjdGlvbi5wcm90b3R5cGVcbiAgICAsIGtleTtcbiAgaWYocHJvdG8pe1xuICAgIGlmKCFwcm90b1tJVEVSQVRPUl0paGlkZShwcm90bywgSVRFUkFUT1IsIEFycmF5VmFsdWVzKTtcbiAgICBpZighcHJvdG9bVE9fU1RSSU5HX1RBR10paGlkZShwcm90bywgVE9fU1RSSU5HX1RBRywgTkFNRSk7XG4gICAgSXRlcmF0b3JzW05BTUVdID0gQXJyYXlWYWx1ZXM7XG4gICAgZm9yKGtleSBpbiAkaXRlcmF0b3JzKWlmKCFwcm90b1trZXldKXJlZGVmaW5lKHByb3RvLCBrZXksICRpdGVyYXRvcnNba2V5XSwgdHJ1ZSk7XG4gIH1cbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgYWRkVG9VbnNjb3BhYmxlcyA9IHJlcXVpcmUoJy4vX2FkZC10by11bnNjb3BhYmxlcycpXG4gICwgc3RlcCAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2l0ZXItc3RlcCcpXG4gICwgSXRlcmF0b3JzICAgICAgICA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpXG4gICwgdG9JT2JqZWN0ICAgICAgICA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcblxuLy8gMjIuMS4zLjQgQXJyYXkucHJvdG90eXBlLmVudHJpZXMoKVxuLy8gMjIuMS4zLjEzIEFycmF5LnByb3RvdHlwZS5rZXlzKClcbi8vIDIyLjEuMy4yOSBBcnJheS5wcm90b3R5cGUudmFsdWVzKClcbi8vIDIyLjEuMy4zMCBBcnJheS5wcm90b3R5cGVbQEBpdGVyYXRvcl0oKVxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19pdGVyLWRlZmluZScpKEFycmF5LCAnQXJyYXknLCBmdW5jdGlvbihpdGVyYXRlZCwga2luZCl7XG4gIHRoaXMuX3QgPSB0b0lPYmplY3QoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbiAgdGhpcy5fayA9IGtpbmQ7ICAgICAgICAgICAgICAgIC8vIGtpbmRcbi8vIDIyLjEuNS4yLjEgJUFycmF5SXRlcmF0b3JQcm90b3R5cGUlLm5leHQoKVxufSwgZnVuY3Rpb24oKXtcbiAgdmFyIE8gICAgID0gdGhpcy5fdFxuICAgICwga2luZCAgPSB0aGlzLl9rXG4gICAgLCBpbmRleCA9IHRoaXMuX2krKztcbiAgaWYoIU8gfHwgaW5kZXggPj0gTy5sZW5ndGgpe1xuICAgIHRoaXMuX3QgPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHN0ZXAoMSk7XG4gIH1cbiAgaWYoa2luZCA9PSAna2V5cycgIClyZXR1cm4gc3RlcCgwLCBpbmRleCk7XG4gIGlmKGtpbmQgPT0gJ3ZhbHVlcycpcmV0dXJuIHN0ZXAoMCwgT1tpbmRleF0pO1xuICByZXR1cm4gc3RlcCgwLCBbaW5kZXgsIE9baW5kZXhdXSk7XG59LCAndmFsdWVzJyk7XG5cbi8vIGFyZ3VtZW50c0xpc3RbQEBpdGVyYXRvcl0gaXMgJUFycmF5UHJvdG9fdmFsdWVzJSAoOS40LjQuNiwgOS40LjQuNylcbkl0ZXJhdG9ycy5Bcmd1bWVudHMgPSBJdGVyYXRvcnMuQXJyYXk7XG5cbmFkZFRvVW5zY29wYWJsZXMoJ2tleXMnKTtcbmFkZFRvVW5zY29wYWJsZXMoJ3ZhbHVlcycpO1xuYWRkVG9VbnNjb3BhYmxlcygnZW50cmllcycpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5Lml0ZXJhdG9yLmpzXG4gKiovIiwiLy8gMjIuMS4zLjMxIEFycmF5LnByb3RvdHlwZVtAQHVuc2NvcGFibGVzXVxudmFyIFVOU0NPUEFCTEVTID0gcmVxdWlyZSgnLi9fd2tzJykoJ3Vuc2NvcGFibGVzJylcbiAgLCBBcnJheVByb3RvICA9IEFycmF5LnByb3RvdHlwZTtcbmlmKEFycmF5UHJvdG9bVU5TQ09QQUJMRVNdID09IHVuZGVmaW5lZClyZXF1aXJlKCcuL19oaWRlJykoQXJyYXlQcm90bywgVU5TQ09QQUJMRVMsIHt9KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oa2V5KXtcbiAgQXJyYXlQcm90b1tVTlNDT1BBQkxFU11ba2V5XSA9IHRydWU7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX2FkZC10by11bnNjb3BhYmxlcy5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZG9uZSwgdmFsdWUpe1xuICByZXR1cm4ge3ZhbHVlOiB2YWx1ZSwgZG9uZTogISFkb25lfTtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9faXRlci1zdGVwLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyIExJQlJBUlkgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2xpYnJhcnknKVxuICAsIGdsb2JhbCAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgY3R4ICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fY3R4JylcbiAgLCBjbGFzc29mICAgICAgICAgICAgPSByZXF1aXJlKCcuL19jbGFzc29mJylcbiAgLCAkZXhwb3J0ICAgICAgICAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIGlzT2JqZWN0ICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgYW5PYmplY3QgICAgICAgICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBhRnVuY3Rpb24gICAgICAgICAgPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJylcbiAgLCBhbkluc3RhbmNlICAgICAgICAgPSByZXF1aXJlKCcuL19hbi1pbnN0YW5jZScpXG4gICwgZm9yT2YgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fZm9yLW9mJylcbiAgLCBzZXRQcm90byAgICAgICAgICAgPSByZXF1aXJlKCcuL19zZXQtcHJvdG8nKS5zZXRcbiAgLCBzcGVjaWVzQ29uc3RydWN0b3IgPSByZXF1aXJlKCcuL19zcGVjaWVzLWNvbnN0cnVjdG9yJylcbiAgLCB0YXNrICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL190YXNrJykuc2V0XG4gICwgbWljcm90YXNrICAgICAgICAgID0gcmVxdWlyZSgnLi9fbWljcm90YXNrJylcbiAgLCBQUk9NSVNFICAgICAgICAgICAgPSAnUHJvbWlzZSdcbiAgLCBUeXBlRXJyb3IgICAgICAgICAgPSBnbG9iYWwuVHlwZUVycm9yXG4gICwgcHJvY2VzcyAgICAgICAgICAgID0gZ2xvYmFsLnByb2Nlc3NcbiAgLCAkUHJvbWlzZSAgICAgICAgICAgPSBnbG9iYWxbUFJPTUlTRV1cbiAgLCBwcm9jZXNzICAgICAgICAgICAgPSBnbG9iYWwucHJvY2Vzc1xuICAsIGlzTm9kZSAgICAgICAgICAgICA9IGNsYXNzb2YocHJvY2VzcykgPT0gJ3Byb2Nlc3MnXG4gICwgZW1wdHkgICAgICAgICAgICAgID0gZnVuY3Rpb24oKXsgLyogZW1wdHkgKi8gfVxuICAsIEludGVybmFsLCBHZW5lcmljUHJvbWlzZUNhcGFiaWxpdHksIFdyYXBwZXI7XG5cbnZhciBVU0VfTkFUSVZFID0gISFmdW5jdGlvbigpe1xuICB0cnkge1xuICAgIC8vIGNvcnJlY3Qgc3ViY2xhc3Npbmcgd2l0aCBAQHNwZWNpZXMgc3VwcG9ydFxuICAgIHZhciBwcm9taXNlICAgICA9ICRQcm9taXNlLnJlc29sdmUoMSlcbiAgICAgICwgRmFrZVByb21pc2UgPSAocHJvbWlzZS5jb25zdHJ1Y3RvciA9IHt9KVtyZXF1aXJlKCcuL193a3MnKSgnc3BlY2llcycpXSA9IGZ1bmN0aW9uKGV4ZWMpeyBleGVjKGVtcHR5LCBlbXB0eSk7IH07XG4gICAgLy8gdW5oYW5kbGVkIHJlamVjdGlvbnMgdHJhY2tpbmcgc3VwcG9ydCwgTm9kZUpTIFByb21pc2Ugd2l0aG91dCBpdCBmYWlscyBAQHNwZWNpZXMgdGVzdFxuICAgIHJldHVybiAoaXNOb2RlIHx8IHR5cGVvZiBQcm9taXNlUmVqZWN0aW9uRXZlbnQgPT0gJ2Z1bmN0aW9uJykgJiYgcHJvbWlzZS50aGVuKGVtcHR5KSBpbnN0YW5jZW9mIEZha2VQcm9taXNlO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG59KCk7XG5cbi8vIGhlbHBlcnNcbnZhciBzYW1lQ29uc3RydWN0b3IgPSBmdW5jdGlvbihhLCBiKXtcbiAgLy8gd2l0aCBsaWJyYXJ5IHdyYXBwZXIgc3BlY2lhbCBjYXNlXG4gIHJldHVybiBhID09PSBiIHx8IGEgPT09ICRQcm9taXNlICYmIGIgPT09IFdyYXBwZXI7XG59O1xudmFyIGlzVGhlbmFibGUgPSBmdW5jdGlvbihpdCl7XG4gIHZhciB0aGVuO1xuICByZXR1cm4gaXNPYmplY3QoaXQpICYmIHR5cGVvZiAodGhlbiA9IGl0LnRoZW4pID09ICdmdW5jdGlvbicgPyB0aGVuIDogZmFsc2U7XG59O1xudmFyIG5ld1Byb21pc2VDYXBhYmlsaXR5ID0gZnVuY3Rpb24oQyl7XG4gIHJldHVybiBzYW1lQ29uc3RydWN0b3IoJFByb21pc2UsIEMpXG4gICAgPyBuZXcgUHJvbWlzZUNhcGFiaWxpdHkoQylcbiAgICA6IG5ldyBHZW5lcmljUHJvbWlzZUNhcGFiaWxpdHkoQyk7XG59O1xudmFyIFByb21pc2VDYXBhYmlsaXR5ID0gR2VuZXJpY1Byb21pc2VDYXBhYmlsaXR5ID0gZnVuY3Rpb24oQyl7XG4gIHZhciByZXNvbHZlLCByZWplY3Q7XG4gIHRoaXMucHJvbWlzZSA9IG5ldyBDKGZ1bmN0aW9uKCQkcmVzb2x2ZSwgJCRyZWplY3Qpe1xuICAgIGlmKHJlc29sdmUgIT09IHVuZGVmaW5lZCB8fCByZWplY3QgIT09IHVuZGVmaW5lZCl0aHJvdyBUeXBlRXJyb3IoJ0JhZCBQcm9taXNlIGNvbnN0cnVjdG9yJyk7XG4gICAgcmVzb2x2ZSA9ICQkcmVzb2x2ZTtcbiAgICByZWplY3QgID0gJCRyZWplY3Q7XG4gIH0pO1xuICB0aGlzLnJlc29sdmUgPSBhRnVuY3Rpb24ocmVzb2x2ZSk7XG4gIHRoaXMucmVqZWN0ICA9IGFGdW5jdGlvbihyZWplY3QpO1xufTtcbnZhciBwZXJmb3JtID0gZnVuY3Rpb24oZXhlYyl7XG4gIHRyeSB7XG4gICAgZXhlYygpO1xuICB9IGNhdGNoKGUpe1xuICAgIHJldHVybiB7ZXJyb3I6IGV9O1xuICB9XG59O1xudmFyIG5vdGlmeSA9IGZ1bmN0aW9uKHByb21pc2UsIGlzUmVqZWN0KXtcbiAgaWYocHJvbWlzZS5fbilyZXR1cm47XG4gIHByb21pc2UuX24gPSB0cnVlO1xuICB2YXIgY2hhaW4gPSBwcm9taXNlLl9jO1xuICBtaWNyb3Rhc2soZnVuY3Rpb24oKXtcbiAgICB2YXIgdmFsdWUgPSBwcm9taXNlLl92XG4gICAgICAsIG9rICAgID0gcHJvbWlzZS5fcyA9PSAxXG4gICAgICAsIGkgICAgID0gMDtcbiAgICB2YXIgcnVuID0gZnVuY3Rpb24ocmVhY3Rpb24pe1xuICAgICAgdmFyIGhhbmRsZXIgPSBvayA/IHJlYWN0aW9uLm9rIDogcmVhY3Rpb24uZmFpbFxuICAgICAgICAsIHJlc29sdmUgPSByZWFjdGlvbi5yZXNvbHZlXG4gICAgICAgICwgcmVqZWN0ICA9IHJlYWN0aW9uLnJlamVjdFxuICAgICAgICAsIGRvbWFpbiAgPSByZWFjdGlvbi5kb21haW5cbiAgICAgICAgLCByZXN1bHQsIHRoZW47XG4gICAgICB0cnkge1xuICAgICAgICBpZihoYW5kbGVyKXtcbiAgICAgICAgICBpZighb2spe1xuICAgICAgICAgICAgaWYocHJvbWlzZS5faCA9PSAyKW9uSGFuZGxlVW5oYW5kbGVkKHByb21pc2UpO1xuICAgICAgICAgICAgcHJvbWlzZS5faCA9IDE7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmKGhhbmRsZXIgPT09IHRydWUpcmVzdWx0ID0gdmFsdWU7XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZihkb21haW4pZG9tYWluLmVudGVyKCk7XG4gICAgICAgICAgICByZXN1bHQgPSBoYW5kbGVyKHZhbHVlKTtcbiAgICAgICAgICAgIGlmKGRvbWFpbilkb21haW4uZXhpdCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZihyZXN1bHQgPT09IHJlYWN0aW9uLnByb21pc2Upe1xuICAgICAgICAgICAgcmVqZWN0KFR5cGVFcnJvcignUHJvbWlzZS1jaGFpbiBjeWNsZScpKTtcbiAgICAgICAgICB9IGVsc2UgaWYodGhlbiA9IGlzVGhlbmFibGUocmVzdWx0KSl7XG4gICAgICAgICAgICB0aGVuLmNhbGwocmVzdWx0LCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0gZWxzZSByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0gZWxzZSByZWplY3QodmFsdWUpO1xuICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgfVxuICAgIH07XG4gICAgd2hpbGUoY2hhaW4ubGVuZ3RoID4gaSlydW4oY2hhaW5baSsrXSk7IC8vIHZhcmlhYmxlIGxlbmd0aCAtIGNhbid0IHVzZSBmb3JFYWNoXG4gICAgcHJvbWlzZS5fYyA9IFtdO1xuICAgIHByb21pc2UuX24gPSBmYWxzZTtcbiAgICBpZihpc1JlamVjdCAmJiAhcHJvbWlzZS5faClvblVuaGFuZGxlZChwcm9taXNlKTtcbiAgfSk7XG59O1xudmFyIG9uVW5oYW5kbGVkID0gZnVuY3Rpb24ocHJvbWlzZSl7XG4gIHRhc2suY2FsbChnbG9iYWwsIGZ1bmN0aW9uKCl7XG4gICAgdmFyIHZhbHVlID0gcHJvbWlzZS5fdlxuICAgICAgLCBhYnJ1cHQsIGhhbmRsZXIsIGNvbnNvbGU7XG4gICAgaWYoaXNVbmhhbmRsZWQocHJvbWlzZSkpe1xuICAgICAgYWJydXB0ID0gcGVyZm9ybShmdW5jdGlvbigpe1xuICAgICAgICBpZihpc05vZGUpe1xuICAgICAgICAgIHByb2Nlc3MuZW1pdCgndW5oYW5kbGVkUmVqZWN0aW9uJywgdmFsdWUsIHByb21pc2UpO1xuICAgICAgICB9IGVsc2UgaWYoaGFuZGxlciA9IGdsb2JhbC5vbnVuaGFuZGxlZHJlamVjdGlvbil7XG4gICAgICAgICAgaGFuZGxlcih7cHJvbWlzZTogcHJvbWlzZSwgcmVhc29uOiB2YWx1ZX0pO1xuICAgICAgICB9IGVsc2UgaWYoKGNvbnNvbGUgPSBnbG9iYWwuY29uc29sZSkgJiYgY29uc29sZS5lcnJvcil7XG4gICAgICAgICAgY29uc29sZS5lcnJvcignVW5oYW5kbGVkIHByb21pc2UgcmVqZWN0aW9uJywgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIC8vIEJyb3dzZXJzIHNob3VsZCBub3QgdHJpZ2dlciBgcmVqZWN0aW9uSGFuZGxlZGAgZXZlbnQgaWYgaXQgd2FzIGhhbmRsZWQgaGVyZSwgTm9kZUpTIC0gc2hvdWxkXG4gICAgICBwcm9taXNlLl9oID0gaXNOb2RlIHx8IGlzVW5oYW5kbGVkKHByb21pc2UpID8gMiA6IDE7XG4gICAgfSBwcm9taXNlLl9hID0gdW5kZWZpbmVkO1xuICAgIGlmKGFicnVwdCl0aHJvdyBhYnJ1cHQuZXJyb3I7XG4gIH0pO1xufTtcbnZhciBpc1VuaGFuZGxlZCA9IGZ1bmN0aW9uKHByb21pc2Upe1xuICBpZihwcm9taXNlLl9oID09IDEpcmV0dXJuIGZhbHNlO1xuICB2YXIgY2hhaW4gPSBwcm9taXNlLl9hIHx8IHByb21pc2UuX2NcbiAgICAsIGkgICAgID0gMFxuICAgICwgcmVhY3Rpb247XG4gIHdoaWxlKGNoYWluLmxlbmd0aCA+IGkpe1xuICAgIHJlYWN0aW9uID0gY2hhaW5baSsrXTtcbiAgICBpZihyZWFjdGlvbi5mYWlsIHx8ICFpc1VuaGFuZGxlZChyZWFjdGlvbi5wcm9taXNlKSlyZXR1cm4gZmFsc2U7XG4gIH0gcmV0dXJuIHRydWU7XG59O1xudmFyIG9uSGFuZGxlVW5oYW5kbGVkID0gZnVuY3Rpb24ocHJvbWlzZSl7XG4gIHRhc2suY2FsbChnbG9iYWwsIGZ1bmN0aW9uKCl7XG4gICAgdmFyIGhhbmRsZXI7XG4gICAgaWYoaXNOb2RlKXtcbiAgICAgIHByb2Nlc3MuZW1pdCgncmVqZWN0aW9uSGFuZGxlZCcsIHByb21pc2UpO1xuICAgIH0gZWxzZSBpZihoYW5kbGVyID0gZ2xvYmFsLm9ucmVqZWN0aW9uaGFuZGxlZCl7XG4gICAgICBoYW5kbGVyKHtwcm9taXNlOiBwcm9taXNlLCByZWFzb246IHByb21pc2UuX3Z9KTtcbiAgICB9XG4gIH0pO1xufTtcbnZhciAkcmVqZWN0ID0gZnVuY3Rpb24odmFsdWUpe1xuICB2YXIgcHJvbWlzZSA9IHRoaXM7XG4gIGlmKHByb21pc2UuX2QpcmV0dXJuO1xuICBwcm9taXNlLl9kID0gdHJ1ZTtcbiAgcHJvbWlzZSA9IHByb21pc2UuX3cgfHwgcHJvbWlzZTsgLy8gdW53cmFwXG4gIHByb21pc2UuX3YgPSB2YWx1ZTtcbiAgcHJvbWlzZS5fcyA9IDI7XG4gIGlmKCFwcm9taXNlLl9hKXByb21pc2UuX2EgPSBwcm9taXNlLl9jLnNsaWNlKCk7XG4gIG5vdGlmeShwcm9taXNlLCB0cnVlKTtcbn07XG52YXIgJHJlc29sdmUgPSBmdW5jdGlvbih2YWx1ZSl7XG4gIHZhciBwcm9taXNlID0gdGhpc1xuICAgICwgdGhlbjtcbiAgaWYocHJvbWlzZS5fZClyZXR1cm47XG4gIHByb21pc2UuX2QgPSB0cnVlO1xuICBwcm9taXNlID0gcHJvbWlzZS5fdyB8fCBwcm9taXNlOyAvLyB1bndyYXBcbiAgdHJ5IHtcbiAgICBpZihwcm9taXNlID09PSB2YWx1ZSl0aHJvdyBUeXBlRXJyb3IoXCJQcm9taXNlIGNhbid0IGJlIHJlc29sdmVkIGl0c2VsZlwiKTtcbiAgICBpZih0aGVuID0gaXNUaGVuYWJsZSh2YWx1ZSkpe1xuICAgICAgbWljcm90YXNrKGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciB3cmFwcGVyID0ge193OiBwcm9taXNlLCBfZDogZmFsc2V9OyAvLyB3cmFwXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdGhlbi5jYWxsKHZhbHVlLCBjdHgoJHJlc29sdmUsIHdyYXBwZXIsIDEpLCBjdHgoJHJlamVjdCwgd3JhcHBlciwgMSkpO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICRyZWplY3QuY2FsbCh3cmFwcGVyLCBlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHByb21pc2UuX3YgPSB2YWx1ZTtcbiAgICAgIHByb21pc2UuX3MgPSAxO1xuICAgICAgbm90aWZ5KHByb21pc2UsIGZhbHNlKTtcbiAgICB9XG4gIH0gY2F0Y2goZSl7XG4gICAgJHJlamVjdC5jYWxsKHtfdzogcHJvbWlzZSwgX2Q6IGZhbHNlfSwgZSk7IC8vIHdyYXBcbiAgfVxufTtcblxuLy8gY29uc3RydWN0b3IgcG9seWZpbGxcbmlmKCFVU0VfTkFUSVZFKXtcbiAgLy8gMjUuNC4zLjEgUHJvbWlzZShleGVjdXRvcilcbiAgJFByb21pc2UgPSBmdW5jdGlvbiBQcm9taXNlKGV4ZWN1dG9yKXtcbiAgICBhbkluc3RhbmNlKHRoaXMsICRQcm9taXNlLCBQUk9NSVNFLCAnX2gnKTtcbiAgICBhRnVuY3Rpb24oZXhlY3V0b3IpO1xuICAgIEludGVybmFsLmNhbGwodGhpcyk7XG4gICAgdHJ5IHtcbiAgICAgIGV4ZWN1dG9yKGN0eCgkcmVzb2x2ZSwgdGhpcywgMSksIGN0eCgkcmVqZWN0LCB0aGlzLCAxKSk7XG4gICAgfSBjYXRjaChlcnIpe1xuICAgICAgJHJlamVjdC5jYWxsKHRoaXMsIGVycik7XG4gICAgfVxuICB9O1xuICBJbnRlcm5hbCA9IGZ1bmN0aW9uIFByb21pc2UoZXhlY3V0b3Ipe1xuICAgIHRoaXMuX2MgPSBbXTsgICAgICAgICAgICAgLy8gPC0gYXdhaXRpbmcgcmVhY3Rpb25zXG4gICAgdGhpcy5fYSA9IHVuZGVmaW5lZDsgICAgICAvLyA8LSBjaGVja2VkIGluIGlzVW5oYW5kbGVkIHJlYWN0aW9uc1xuICAgIHRoaXMuX3MgPSAwOyAgICAgICAgICAgICAgLy8gPC0gc3RhdGVcbiAgICB0aGlzLl9kID0gZmFsc2U7ICAgICAgICAgIC8vIDwtIGRvbmVcbiAgICB0aGlzLl92ID0gdW5kZWZpbmVkOyAgICAgIC8vIDwtIHZhbHVlXG4gICAgdGhpcy5faCA9IDA7ICAgICAgICAgICAgICAvLyA8LSByZWplY3Rpb24gc3RhdGUsIDAgLSBkZWZhdWx0LCAxIC0gaGFuZGxlZCwgMiAtIHVuaGFuZGxlZFxuICAgIHRoaXMuX24gPSBmYWxzZTsgICAgICAgICAgLy8gPC0gbm90aWZ5XG4gIH07XG4gIEludGVybmFsLnByb3RvdHlwZSA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lLWFsbCcpKCRQcm9taXNlLnByb3RvdHlwZSwge1xuICAgIC8vIDI1LjQuNS4zIFByb21pc2UucHJvdG90eXBlLnRoZW4ob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpXG4gICAgdGhlbjogZnVuY3Rpb24gdGhlbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCl7XG4gICAgICB2YXIgcmVhY3Rpb24gICAgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eShzcGVjaWVzQ29uc3RydWN0b3IodGhpcywgJFByb21pc2UpKTtcbiAgICAgIHJlYWN0aW9uLm9rICAgICA9IHR5cGVvZiBvbkZ1bGZpbGxlZCA9PSAnZnVuY3Rpb24nID8gb25GdWxmaWxsZWQgOiB0cnVlO1xuICAgICAgcmVhY3Rpb24uZmFpbCAgID0gdHlwZW9mIG9uUmVqZWN0ZWQgPT0gJ2Z1bmN0aW9uJyAmJiBvblJlamVjdGVkO1xuICAgICAgcmVhY3Rpb24uZG9tYWluID0gaXNOb2RlID8gcHJvY2Vzcy5kb21haW4gOiB1bmRlZmluZWQ7XG4gICAgICB0aGlzLl9jLnB1c2gocmVhY3Rpb24pO1xuICAgICAgaWYodGhpcy5fYSl0aGlzLl9hLnB1c2gocmVhY3Rpb24pO1xuICAgICAgaWYodGhpcy5fcylub3RpZnkodGhpcywgZmFsc2UpO1xuICAgICAgcmV0dXJuIHJlYWN0aW9uLnByb21pc2U7XG4gICAgfSxcbiAgICAvLyAyNS40LjUuMSBQcm9taXNlLnByb3RvdHlwZS5jYXRjaChvblJlamVjdGVkKVxuICAgICdjYXRjaCc6IGZ1bmN0aW9uKG9uUmVqZWN0ZWQpe1xuICAgICAgcmV0dXJuIHRoaXMudGhlbih1bmRlZmluZWQsIG9uUmVqZWN0ZWQpO1xuICAgIH1cbiAgfSk7XG4gIFByb21pc2VDYXBhYmlsaXR5ID0gZnVuY3Rpb24oKXtcbiAgICB2YXIgcHJvbWlzZSAgPSBuZXcgSW50ZXJuYWw7XG4gICAgdGhpcy5wcm9taXNlID0gcHJvbWlzZTtcbiAgICB0aGlzLnJlc29sdmUgPSBjdHgoJHJlc29sdmUsIHByb21pc2UsIDEpO1xuICAgIHRoaXMucmVqZWN0ICA9IGN0eCgkcmVqZWN0LCBwcm9taXNlLCAxKTtcbiAgfTtcbn1cblxuJGV4cG9ydCgkZXhwb3J0LkcgKyAkZXhwb3J0LlcgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwge1Byb21pc2U6ICRQcm9taXNlfSk7XG5yZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpKCRQcm9taXNlLCBQUk9NSVNFKTtcbnJlcXVpcmUoJy4vX3NldC1zcGVjaWVzJykoUFJPTUlTRSk7XG5XcmFwcGVyID0gcmVxdWlyZSgnLi9fY29yZScpW1BST01JU0VdO1xuXG4vLyBzdGF0aWNzXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCBQUk9NSVNFLCB7XG4gIC8vIDI1LjQuNC41IFByb21pc2UucmVqZWN0KHIpXG4gIHJlamVjdDogZnVuY3Rpb24gcmVqZWN0KHIpe1xuICAgIHZhciBjYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkodGhpcylcbiAgICAgICwgJCRyZWplY3QgICA9IGNhcGFiaWxpdHkucmVqZWN0O1xuICAgICQkcmVqZWN0KHIpO1xuICAgIHJldHVybiBjYXBhYmlsaXR5LnByb21pc2U7XG4gIH1cbn0pO1xuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAoTElCUkFSWSB8fCAhVVNFX05BVElWRSksIFBST01JU0UsIHtcbiAgLy8gMjUuNC40LjYgUHJvbWlzZS5yZXNvbHZlKHgpXG4gIHJlc29sdmU6IGZ1bmN0aW9uIHJlc29sdmUoeCl7XG4gICAgLy8gaW5zdGFuY2VvZiBpbnN0ZWFkIG9mIGludGVybmFsIHNsb3QgY2hlY2sgYmVjYXVzZSB3ZSBzaG91bGQgZml4IGl0IHdpdGhvdXQgcmVwbGFjZW1lbnQgbmF0aXZlIFByb21pc2UgY29yZVxuICAgIGlmKHggaW5zdGFuY2VvZiAkUHJvbWlzZSAmJiBzYW1lQ29uc3RydWN0b3IoeC5jb25zdHJ1Y3RvciwgdGhpcykpcmV0dXJuIHg7XG4gICAgdmFyIGNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eSh0aGlzKVxuICAgICAgLCAkJHJlc29sdmUgID0gY2FwYWJpbGl0eS5yZXNvbHZlO1xuICAgICQkcmVzb2x2ZSh4KTtcbiAgICByZXR1cm4gY2FwYWJpbGl0eS5wcm9taXNlO1xuICB9XG59KTtcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIShVU0VfTkFUSVZFICYmIHJlcXVpcmUoJy4vX2l0ZXItZGV0ZWN0JykoZnVuY3Rpb24oaXRlcil7XG4gICRQcm9taXNlLmFsbChpdGVyKVsnY2F0Y2gnXShlbXB0eSk7XG59KSksIFBST01JU0UsIHtcbiAgLy8gMjUuNC40LjEgUHJvbWlzZS5hbGwoaXRlcmFibGUpXG4gIGFsbDogZnVuY3Rpb24gYWxsKGl0ZXJhYmxlKXtcbiAgICB2YXIgQyAgICAgICAgICA9IHRoaXNcbiAgICAgICwgY2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KEMpXG4gICAgICAsIHJlc29sdmUgICAgPSBjYXBhYmlsaXR5LnJlc29sdmVcbiAgICAgICwgcmVqZWN0ICAgICA9IGNhcGFiaWxpdHkucmVqZWN0O1xuICAgIHZhciBhYnJ1cHQgPSBwZXJmb3JtKGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgdmFsdWVzICAgID0gW11cbiAgICAgICAgLCBpbmRleCAgICAgPSAwXG4gICAgICAgICwgcmVtYWluaW5nID0gMTtcbiAgICAgIGZvck9mKGl0ZXJhYmxlLCBmYWxzZSwgZnVuY3Rpb24ocHJvbWlzZSl7XG4gICAgICAgIHZhciAkaW5kZXggICAgICAgID0gaW5kZXgrK1xuICAgICAgICAgICwgYWxyZWFkeUNhbGxlZCA9IGZhbHNlO1xuICAgICAgICB2YWx1ZXMucHVzaCh1bmRlZmluZWQpO1xuICAgICAgICByZW1haW5pbmcrKztcbiAgICAgICAgQy5yZXNvbHZlKHByb21pc2UpLnRoZW4oZnVuY3Rpb24odmFsdWUpe1xuICAgICAgICAgIGlmKGFscmVhZHlDYWxsZWQpcmV0dXJuO1xuICAgICAgICAgIGFscmVhZHlDYWxsZWQgID0gdHJ1ZTtcbiAgICAgICAgICB2YWx1ZXNbJGluZGV4XSA9IHZhbHVlO1xuICAgICAgICAgIC0tcmVtYWluaW5nIHx8IHJlc29sdmUodmFsdWVzKTtcbiAgICAgICAgfSwgcmVqZWN0KTtcbiAgICAgIH0pO1xuICAgICAgLS1yZW1haW5pbmcgfHwgcmVzb2x2ZSh2YWx1ZXMpO1xuICAgIH0pO1xuICAgIGlmKGFicnVwdClyZWplY3QoYWJydXB0LmVycm9yKTtcbiAgICByZXR1cm4gY2FwYWJpbGl0eS5wcm9taXNlO1xuICB9LFxuICAvLyAyNS40LjQuNCBQcm9taXNlLnJhY2UoaXRlcmFibGUpXG4gIHJhY2U6IGZ1bmN0aW9uIHJhY2UoaXRlcmFibGUpe1xuICAgIHZhciBDICAgICAgICAgID0gdGhpc1xuICAgICAgLCBjYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkoQylcbiAgICAgICwgcmVqZWN0ICAgICA9IGNhcGFiaWxpdHkucmVqZWN0O1xuICAgIHZhciBhYnJ1cHQgPSBwZXJmb3JtKGZ1bmN0aW9uKCl7XG4gICAgICBmb3JPZihpdGVyYWJsZSwgZmFsc2UsIGZ1bmN0aW9uKHByb21pc2Upe1xuICAgICAgICBDLnJlc29sdmUocHJvbWlzZSkudGhlbihjYXBhYmlsaXR5LnJlc29sdmUsIHJlamVjdCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBpZihhYnJ1cHQpcmVqZWN0KGFicnVwdC5lcnJvcik7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfVxufSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9lczYucHJvbWlzZS5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIENvbnN0cnVjdG9yLCBuYW1lLCBmb3JiaWRkZW5GaWVsZCl7XG4gIGlmKCEoaXQgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikgfHwgKGZvcmJpZGRlbkZpZWxkICE9PSB1bmRlZmluZWQgJiYgZm9yYmlkZGVuRmllbGQgaW4gaXQpKXtcbiAgICB0aHJvdyBUeXBlRXJyb3IobmFtZSArICc6IGluY29ycmVjdCBpbnZvY2F0aW9uIScpO1xuICB9IHJldHVybiBpdDtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fYW4taW5zdGFuY2UuanNcbiAqKi8iLCJ2YXIgY3R4ICAgICAgICAgPSByZXF1aXJlKCcuL19jdHgnKVxuICAsIGNhbGwgICAgICAgID0gcmVxdWlyZSgnLi9faXRlci1jYWxsJylcbiAgLCBpc0FycmF5SXRlciA9IHJlcXVpcmUoJy4vX2lzLWFycmF5LWl0ZXInKVxuICAsIGFuT2JqZWN0ICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCB0b0xlbmd0aCAgICA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpXG4gICwgZ2V0SXRlckZuICAgPSByZXF1aXJlKCcuL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdGVyYWJsZSwgZW50cmllcywgZm4sIHRoYXQsIElURVJBVE9SKXtcbiAgdmFyIGl0ZXJGbiA9IElURVJBVE9SID8gZnVuY3Rpb24oKXsgcmV0dXJuIGl0ZXJhYmxlOyB9IDogZ2V0SXRlckZuKGl0ZXJhYmxlKVxuICAgICwgZiAgICAgID0gY3R4KGZuLCB0aGF0LCBlbnRyaWVzID8gMiA6IDEpXG4gICAgLCBpbmRleCAgPSAwXG4gICAgLCBsZW5ndGgsIHN0ZXAsIGl0ZXJhdG9yO1xuICBpZih0eXBlb2YgaXRlckZuICE9ICdmdW5jdGlvbicpdGhyb3cgVHlwZUVycm9yKGl0ZXJhYmxlICsgJyBpcyBub3QgaXRlcmFibGUhJyk7XG4gIC8vIGZhc3QgY2FzZSBmb3IgYXJyYXlzIHdpdGggZGVmYXVsdCBpdGVyYXRvclxuICBpZihpc0FycmF5SXRlcihpdGVyRm4pKWZvcihsZW5ndGggPSB0b0xlbmd0aChpdGVyYWJsZS5sZW5ndGgpOyBsZW5ndGggPiBpbmRleDsgaW5kZXgrKyl7XG4gICAgZW50cmllcyA/IGYoYW5PYmplY3Qoc3RlcCA9IGl0ZXJhYmxlW2luZGV4XSlbMF0sIHN0ZXBbMV0pIDogZihpdGVyYWJsZVtpbmRleF0pO1xuICB9IGVsc2UgZm9yKGl0ZXJhdG9yID0gaXRlckZuLmNhbGwoaXRlcmFibGUpOyAhKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmU7ICl7XG4gICAgY2FsbChpdGVyYXRvciwgZiwgc3RlcC52YWx1ZSwgZW50cmllcyk7XG4gIH1cbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fZm9yLW9mLmpzXG4gKiovIiwiLy8gY2FsbCBzb21ldGhpbmcgb24gaXRlcmF0b3Igc3RlcCB3aXRoIHNhZmUgY2xvc2luZyBvbiBlcnJvclxudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0ZXJhdG9yLCBmbiwgdmFsdWUsIGVudHJpZXMpe1xuICB0cnkge1xuICAgIHJldHVybiBlbnRyaWVzID8gZm4oYW5PYmplY3QodmFsdWUpWzBdLCB2YWx1ZVsxXSkgOiBmbih2YWx1ZSk7XG4gIC8vIDcuNC42IEl0ZXJhdG9yQ2xvc2UoaXRlcmF0b3IsIGNvbXBsZXRpb24pXG4gIH0gY2F0Y2goZSl7XG4gICAgdmFyIHJldCA9IGl0ZXJhdG9yWydyZXR1cm4nXTtcbiAgICBpZihyZXQgIT09IHVuZGVmaW5lZClhbk9iamVjdChyZXQuY2FsbChpdGVyYXRvcikpO1xuICAgIHRocm93IGU7XG4gIH1cbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9faXRlci1jYWxsLmpzXG4gKiovIiwiLy8gY2hlY2sgb24gZGVmYXVsdCBBcnJheSBpdGVyYXRvclxudmFyIEl0ZXJhdG9ycyAgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKVxuICAsIElURVJBVE9SICAgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKVxuICAsIEFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXQgIT09IHVuZGVmaW5lZCAmJiAoSXRlcmF0b3JzLkFycmF5ID09PSBpdCB8fCBBcnJheVByb3RvW0lURVJBVE9SXSA9PT0gaXQpO1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL19pcy1hcnJheS1pdGVyLmpzXG4gKiovIiwidmFyIGNsYXNzb2YgICA9IHJlcXVpcmUoJy4vX2NsYXNzb2YnKVxuICAsIElURVJBVE9SICA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpXG4gICwgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2NvcmUnKS5nZXRJdGVyYXRvck1ldGhvZCA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoaXQgIT0gdW5kZWZpbmVkKXJldHVybiBpdFtJVEVSQVRPUl1cbiAgICB8fCBpdFsnQEBpdGVyYXRvciddXG4gICAgfHwgSXRlcmF0b3JzW2NsYXNzb2YoaXQpXTtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QuanNcbiAqKi8iLCIvLyBXb3JrcyB3aXRoIF9fcHJvdG9fXyBvbmx5LiBPbGQgdjggY2FuJ3Qgd29yayB3aXRoIG51bGwgcHJvdG8gb2JqZWN0cy5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXByb3RvICovXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKVxuICAsIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgY2hlY2sgPSBmdW5jdGlvbihPLCBwcm90byl7XG4gIGFuT2JqZWN0KE8pO1xuICBpZighaXNPYmplY3QocHJvdG8pICYmIHByb3RvICE9PSBudWxsKXRocm93IFR5cGVFcnJvcihwcm90byArIFwiOiBjYW4ndCBzZXQgYXMgcHJvdG90eXBlIVwiKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2V0OiBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwgKCdfX3Byb3RvX18nIGluIHt9ID8gLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIGZ1bmN0aW9uKHRlc3QsIGJ1Z2d5LCBzZXQpe1xuICAgICAgdHJ5IHtcbiAgICAgICAgc2V0ID0gcmVxdWlyZSgnLi9fY3R4JykoRnVuY3Rpb24uY2FsbCwgcmVxdWlyZSgnLi9fb2JqZWN0LWdvcGQnKS5mKE9iamVjdC5wcm90b3R5cGUsICdfX3Byb3RvX18nKS5zZXQsIDIpO1xuICAgICAgICBzZXQodGVzdCwgW10pO1xuICAgICAgICBidWdneSA9ICEodGVzdCBpbnN0YW5jZW9mIEFycmF5KTtcbiAgICAgIH0gY2F0Y2goZSl7IGJ1Z2d5ID0gdHJ1ZTsgfVxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIHNldFByb3RvdHlwZU9mKE8sIHByb3RvKXtcbiAgICAgICAgY2hlY2soTywgcHJvdG8pO1xuICAgICAgICBpZihidWdneSlPLl9fcHJvdG9fXyA9IHByb3RvO1xuICAgICAgICBlbHNlIHNldChPLCBwcm90byk7XG4gICAgICAgIHJldHVybiBPO1xuICAgICAgfTtcbiAgICB9KHt9LCBmYWxzZSkgOiB1bmRlZmluZWQpLFxuICBjaGVjazogY2hlY2tcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fc2V0LXByb3RvLmpzXG4gKiovIiwidmFyIHBJRSAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpXHJcbiAgLCBjcmVhdGVEZXNjICAgICA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKVxyXG4gICwgdG9JT2JqZWN0ICAgICAgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcclxuICAsIHRvUHJpbWl0aXZlICAgID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJylcclxuICAsIGhhcyAgICAgICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcclxuICAsIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi9faWU4LWRvbS1kZWZpbmUnKVxyXG4gICwgZ09QRCAgICAgICAgICAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xyXG5cclxuZXhwb3J0cy5mID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IGdPUEQgOiBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUCl7XHJcbiAgTyA9IHRvSU9iamVjdChPKTtcclxuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XHJcbiAgaWYoSUU4X0RPTV9ERUZJTkUpdHJ5IHtcclxuICAgIHJldHVybiBnT1BEKE8sIFApO1xyXG4gIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cclxuICBpZihoYXMoTywgUCkpcmV0dXJuIGNyZWF0ZURlc2MoIXBJRS5mLmNhbGwoTywgUCksIE9bUF0pO1xyXG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1nb3BkLmpzXG4gKiovIiwiLy8gNy4zLjIwIFNwZWNpZXNDb25zdHJ1Y3RvcihPLCBkZWZhdWx0Q29uc3RydWN0b3IpXG52YXIgYW5PYmplY3QgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJylcbiAgLCBTUEVDSUVTICAgPSByZXF1aXJlKCcuL193a3MnKSgnc3BlY2llcycpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihPLCBEKXtcbiAgdmFyIEMgPSBhbk9iamVjdChPKS5jb25zdHJ1Y3RvciwgUztcbiAgcmV0dXJuIEMgPT09IHVuZGVmaW5lZCB8fCAoUyA9IGFuT2JqZWN0KEMpW1NQRUNJRVNdKSA9PSB1bmRlZmluZWQgPyBEIDogYUZ1bmN0aW9uKFMpO1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL19zcGVjaWVzLWNvbnN0cnVjdG9yLmpzXG4gKiovIiwidmFyIGN0eCAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2N0eCcpXG4gICwgaW52b2tlICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9faW52b2tlJylcbiAgLCBodG1sICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19odG1sJylcbiAgLCBjZWwgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19kb20tY3JlYXRlJylcbiAgLCBnbG9iYWwgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIHByb2Nlc3MgICAgICAgICAgICA9IGdsb2JhbC5wcm9jZXNzXG4gICwgc2V0VGFzayAgICAgICAgICAgID0gZ2xvYmFsLnNldEltbWVkaWF0ZVxuICAsIGNsZWFyVGFzayAgICAgICAgICA9IGdsb2JhbC5jbGVhckltbWVkaWF0ZVxuICAsIE1lc3NhZ2VDaGFubmVsICAgICA9IGdsb2JhbC5NZXNzYWdlQ2hhbm5lbFxuICAsIGNvdW50ZXIgICAgICAgICAgICA9IDBcbiAgLCBxdWV1ZSAgICAgICAgICAgICAgPSB7fVxuICAsIE9OUkVBRFlTVEFURUNIQU5HRSA9ICdvbnJlYWR5c3RhdGVjaGFuZ2UnXG4gICwgZGVmZXIsIGNoYW5uZWwsIHBvcnQ7XG52YXIgcnVuID0gZnVuY3Rpb24oKXtcbiAgdmFyIGlkID0gK3RoaXM7XG4gIGlmKHF1ZXVlLmhhc093blByb3BlcnR5KGlkKSl7XG4gICAgdmFyIGZuID0gcXVldWVbaWRdO1xuICAgIGRlbGV0ZSBxdWV1ZVtpZF07XG4gICAgZm4oKTtcbiAgfVxufTtcbnZhciBsaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50KXtcbiAgcnVuLmNhbGwoZXZlbnQuZGF0YSk7XG59O1xuLy8gTm9kZS5qcyAwLjkrICYgSUUxMCsgaGFzIHNldEltbWVkaWF0ZSwgb3RoZXJ3aXNlOlxuaWYoIXNldFRhc2sgfHwgIWNsZWFyVGFzayl7XG4gIHNldFRhc2sgPSBmdW5jdGlvbiBzZXRJbW1lZGlhdGUoZm4pe1xuICAgIHZhciBhcmdzID0gW10sIGkgPSAxO1xuICAgIHdoaWxlKGFyZ3VtZW50cy5sZW5ndGggPiBpKWFyZ3MucHVzaChhcmd1bWVudHNbaSsrXSk7XG4gICAgcXVldWVbKytjb3VudGVyXSA9IGZ1bmN0aW9uKCl7XG4gICAgICBpbnZva2UodHlwZW9mIGZuID09ICdmdW5jdGlvbicgPyBmbiA6IEZ1bmN0aW9uKGZuKSwgYXJncyk7XG4gICAgfTtcbiAgICBkZWZlcihjb3VudGVyKTtcbiAgICByZXR1cm4gY291bnRlcjtcbiAgfTtcbiAgY2xlYXJUYXNrID0gZnVuY3Rpb24gY2xlYXJJbW1lZGlhdGUoaWQpe1xuICAgIGRlbGV0ZSBxdWV1ZVtpZF07XG4gIH07XG4gIC8vIE5vZGUuanMgMC44LVxuICBpZihyZXF1aXJlKCcuL19jb2YnKShwcm9jZXNzKSA9PSAncHJvY2Vzcycpe1xuICAgIGRlZmVyID0gZnVuY3Rpb24oaWQpe1xuICAgICAgcHJvY2Vzcy5uZXh0VGljayhjdHgocnVuLCBpZCwgMSkpO1xuICAgIH07XG4gIC8vIEJyb3dzZXJzIHdpdGggTWVzc2FnZUNoYW5uZWwsIGluY2x1ZGVzIFdlYldvcmtlcnNcbiAgfSBlbHNlIGlmKE1lc3NhZ2VDaGFubmVsKXtcbiAgICBjaGFubmVsID0gbmV3IE1lc3NhZ2VDaGFubmVsO1xuICAgIHBvcnQgICAgPSBjaGFubmVsLnBvcnQyO1xuICAgIGNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gbGlzdGVuZXI7XG4gICAgZGVmZXIgPSBjdHgocG9ydC5wb3N0TWVzc2FnZSwgcG9ydCwgMSk7XG4gIC8vIEJyb3dzZXJzIHdpdGggcG9zdE1lc3NhZ2UsIHNraXAgV2ViV29ya2Vyc1xuICAvLyBJRTggaGFzIHBvc3RNZXNzYWdlLCBidXQgaXQncyBzeW5jICYgdHlwZW9mIGl0cyBwb3N0TWVzc2FnZSBpcyAnb2JqZWN0J1xuICB9IGVsc2UgaWYoZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIgJiYgdHlwZW9mIHBvc3RNZXNzYWdlID09ICdmdW5jdGlvbicgJiYgIWdsb2JhbC5pbXBvcnRTY3JpcHRzKXtcbiAgICBkZWZlciA9IGZ1bmN0aW9uKGlkKXtcbiAgICAgIGdsb2JhbC5wb3N0TWVzc2FnZShpZCArICcnLCAnKicpO1xuICAgIH07XG4gICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBsaXN0ZW5lciwgZmFsc2UpO1xuICAvLyBJRTgtXG4gIH0gZWxzZSBpZihPTlJFQURZU1RBVEVDSEFOR0UgaW4gY2VsKCdzY3JpcHQnKSl7XG4gICAgZGVmZXIgPSBmdW5jdGlvbihpZCl7XG4gICAgICBodG1sLmFwcGVuZENoaWxkKGNlbCgnc2NyaXB0JykpW09OUkVBRFlTVEFURUNIQU5HRV0gPSBmdW5jdGlvbigpe1xuICAgICAgICBodG1sLnJlbW92ZUNoaWxkKHRoaXMpO1xuICAgICAgICBydW4uY2FsbChpZCk7XG4gICAgICB9O1xuICAgIH07XG4gIC8vIFJlc3Qgb2xkIGJyb3dzZXJzXG4gIH0gZWxzZSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbihpZCl7XG4gICAgICBzZXRUaW1lb3V0KGN0eChydW4sIGlkLCAxKSwgMCk7XG4gICAgfTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogICBzZXRUYXNrLFxuICBjbGVhcjogY2xlYXJUYXNrXG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX3Rhc2suanNcbiAqKi8iLCIvLyBmYXN0IGFwcGx5LCBodHRwOi8vanNwZXJmLmxua2l0LmNvbS9mYXN0LWFwcGx5LzVcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZm4sIGFyZ3MsIHRoYXQpe1xuICB2YXIgdW4gPSB0aGF0ID09PSB1bmRlZmluZWQ7XG4gIHN3aXRjaChhcmdzLmxlbmd0aCl7XG4gICAgY2FzZSAwOiByZXR1cm4gdW4gPyBmbigpXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQpO1xuICAgIGNhc2UgMTogcmV0dXJuIHVuID8gZm4oYXJnc1swXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSk7XG4gICAgY2FzZSAyOiByZXR1cm4gdW4gPyBmbihhcmdzWzBdLCBhcmdzWzFdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdLCBhcmdzWzFdKTtcbiAgICBjYXNlIDM6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pO1xuICAgIGNhc2UgNDogcmV0dXJuIHVuID8gZm4oYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSk7XG4gIH0gcmV0dXJuICAgICAgICAgICAgICBmbi5hcHBseSh0aGF0LCBhcmdzKTtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9faW52b2tlLmpzXG4gKiovIiwidmFyIGdsb2JhbCAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgbWFjcm90YXNrID0gcmVxdWlyZSgnLi9fdGFzaycpLnNldFxuICAsIE9ic2VydmVyICA9IGdsb2JhbC5NdXRhdGlvbk9ic2VydmVyIHx8IGdsb2JhbC5XZWJLaXRNdXRhdGlvbk9ic2VydmVyXG4gICwgcHJvY2VzcyAgID0gZ2xvYmFsLnByb2Nlc3NcbiAgLCBQcm9taXNlICAgPSBnbG9iYWwuUHJvbWlzZVxuICAsIGlzTm9kZSAgICA9IHJlcXVpcmUoJy4vX2NvZicpKHByb2Nlc3MpID09ICdwcm9jZXNzJ1xuICAsIGhlYWQsIGxhc3QsIG5vdGlmeTtcblxudmFyIGZsdXNoID0gZnVuY3Rpb24oKXtcbiAgdmFyIHBhcmVudCwgZm47XG4gIGlmKGlzTm9kZSAmJiAocGFyZW50ID0gcHJvY2Vzcy5kb21haW4pKXBhcmVudC5leGl0KCk7XG4gIHdoaWxlKGhlYWQpe1xuICAgIGZuID0gaGVhZC5mbjtcbiAgICBmbigpOyAvLyA8LSBjdXJyZW50bHkgd2UgdXNlIGl0IG9ubHkgZm9yIFByb21pc2UgLSB0cnkgLyBjYXRjaCBub3QgcmVxdWlyZWRcbiAgICBoZWFkID0gaGVhZC5uZXh0O1xuICB9IGxhc3QgPSB1bmRlZmluZWQ7XG4gIGlmKHBhcmVudClwYXJlbnQuZW50ZXIoKTtcbn07XG5cbi8vIE5vZGUuanNcbmlmKGlzTm9kZSl7XG4gIG5vdGlmeSA9IGZ1bmN0aW9uKCl7XG4gICAgcHJvY2Vzcy5uZXh0VGljayhmbHVzaCk7XG4gIH07XG4vLyBicm93c2VycyB3aXRoIE11dGF0aW9uT2JzZXJ2ZXJcbn0gZWxzZSBpZihPYnNlcnZlcil7XG4gIHZhciB0b2dnbGUgPSB0cnVlXG4gICAgLCBub2RlICAgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJyk7XG4gIG5ldyBPYnNlcnZlcihmbHVzaCkub2JzZXJ2ZShub2RlLCB7Y2hhcmFjdGVyRGF0YTogdHJ1ZX0pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ld1xuICBub3RpZnkgPSBmdW5jdGlvbigpe1xuICAgIG5vZGUuZGF0YSA9IHRvZ2dsZSA9ICF0b2dnbGU7XG4gIH07XG4vLyBlbnZpcm9ubWVudHMgd2l0aCBtYXliZSBub24tY29tcGxldGVseSBjb3JyZWN0LCBidXQgZXhpc3RlbnQgUHJvbWlzZVxufSBlbHNlIGlmKFByb21pc2UgJiYgUHJvbWlzZS5yZXNvbHZlKXtcbiAgbm90aWZ5ID0gZnVuY3Rpb24oKXtcbiAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKGZsdXNoKTtcbiAgfTtcbi8vIGZvciBvdGhlciBlbnZpcm9ubWVudHMgLSBtYWNyb3Rhc2sgYmFzZWQgb246XG4vLyAtIHNldEltbWVkaWF0ZVxuLy8gLSBNZXNzYWdlQ2hhbm5lbFxuLy8gLSB3aW5kb3cucG9zdE1lc3NhZ1xuLy8gLSBvbnJlYWR5c3RhdGVjaGFuZ2Vcbi8vIC0gc2V0VGltZW91dFxufSBlbHNlIHtcbiAgbm90aWZ5ID0gZnVuY3Rpb24oKXtcbiAgICAvLyBzdHJhbmdlIElFICsgd2VicGFjayBkZXYgc2VydmVyIGJ1ZyAtIHVzZSAuY2FsbChnbG9iYWwpXG4gICAgbWFjcm90YXNrLmNhbGwoZ2xvYmFsLCBmbHVzaCk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZm4pe1xuICB2YXIgdGFzayA9IHtmbjogZm4sIG5leHQ6IHVuZGVmaW5lZH07XG4gIGlmKGxhc3QpbGFzdC5uZXh0ID0gdGFzaztcbiAgaWYoIWhlYWQpe1xuICAgIGhlYWQgPSB0YXNrO1xuICAgIG5vdGlmeSgpO1xuICB9IGxhc3QgPSB0YXNrO1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL19taWNyb3Rhc2suanNcbiAqKi8iLCJ2YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuL19yZWRlZmluZScpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih0YXJnZXQsIHNyYywgc2FmZSl7XG4gIGZvcih2YXIga2V5IGluIHNyYylyZWRlZmluZSh0YXJnZXQsIGtleSwgc3JjW2tleV0sIHNhZmUpO1xuICByZXR1cm4gdGFyZ2V0O1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL19yZWRlZmluZS1hbGwuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgZ2xvYmFsICAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIGRQICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJylcbiAgLCBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJylcbiAgLCBTUEVDSUVTICAgICA9IHJlcXVpcmUoJy4vX3drcycpKCdzcGVjaWVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oS0VZKXtcbiAgdmFyIEMgPSBnbG9iYWxbS0VZXTtcbiAgaWYoREVTQ1JJUFRPUlMgJiYgQyAmJiAhQ1tTUEVDSUVTXSlkUC5mKEMsIFNQRUNJRVMsIHtcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbigpeyByZXR1cm4gdGhpczsgfVxuICB9KTtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fc2V0LXNwZWNpZXMuanNcbiAqKi8iLCJ2YXIgSVRFUkFUT1IgICAgID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBTQUZFX0NMT1NJTkcgPSBmYWxzZTtcblxudHJ5IHtcbiAgdmFyIHJpdGVyID0gWzddW0lURVJBVE9SXSgpO1xuICByaXRlclsncmV0dXJuJ10gPSBmdW5jdGlvbigpeyBTQUZFX0NMT1NJTkcgPSB0cnVlOyB9O1xuICBBcnJheS5mcm9tKHJpdGVyLCBmdW5jdGlvbigpeyB0aHJvdyAyOyB9KTtcbn0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihleGVjLCBza2lwQ2xvc2luZyl7XG4gIGlmKCFza2lwQ2xvc2luZyAmJiAhU0FGRV9DTE9TSU5HKXJldHVybiBmYWxzZTtcbiAgdmFyIHNhZmUgPSBmYWxzZTtcbiAgdHJ5IHtcbiAgICB2YXIgYXJyICA9IFs3XVxuICAgICAgLCBpdGVyID0gYXJyW0lURVJBVE9SXSgpO1xuICAgIGl0ZXIubmV4dCA9IGZ1bmN0aW9uKCl7IHNhZmUgPSB0cnVlOyB9O1xuICAgIGFycltJVEVSQVRPUl0gPSBmdW5jdGlvbigpeyByZXR1cm4gaXRlcjsgfTtcbiAgICBleGVjKGFycik7XG4gIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbiAgcmV0dXJuIHNhZmU7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX2l0ZXItZGV0ZWN0LmpzXG4gKiovIiwiY29uc3Qge1xuICBzZXRUaW1lb3V0LCBzZXRUaW1lb3V0TmF0aXZlXG59ID0gZ2xvYmFsXG5cbi8vIGZpeCBubyBzZXRUaW1lb3V0IG9uIEFuZHJvaWQgVjhcbmlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ3VuZGVmaW5lZCcgJiZcbiAgdHlwZW9mIHNldFRpbWVvdXROYXRpdmUgPT09ICdmdW5jdGlvbicpIHtcbiAgY29uc3QgdGltZW91dE1hcCA9IHt9XG4gIGxldCB0aW1lb3V0SWQgPSAwXG4gIGdsb2JhbC5zZXRUaW1lb3V0ID0gKGNiLCB0aW1lKSA9PiB7XG4gICAgdGltZW91dE1hcFsrK3RpbWVvdXRJZF0gPSBjYlxuICAgIHNldFRpbWVvdXROYXRpdmUodGltZW91dElkLnRvU3RyaW5nKCksIHRpbWUpXG4gIH1cbiAgZ2xvYmFsLnNldFRpbWVvdXRDYWxsYmFjayA9IChpZCkgPT4ge1xuICAgIGlmICh0eXBlb2YgdGltZW91dE1hcFtpZF0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRpbWVvdXRNYXBbaWRdKClcbiAgICAgIGRlbGV0ZSB0aW1lb3V0TWFwW2lkXVxuICAgIH1cbiAgfVxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vcG9seWZpbGwvc2V0VGltZW91dC5qc1xuICoqLyIsImNvbnN0IHtjb25zb2xlfSA9IGdsb2JhbFxuXG5pZiAodHlwZW9mIGNvbnNvbGUgPT09ICd1bmRlZmluZWQnKSB7XG4gIGdsb2JhbC5jb25zb2xlID0ge1xuICAgIGxvZzogKC4uLmFyZ3MpID0+IHtcbiAgICAgIGlmICh0eXBlb2YgbmF0aXZlTG9nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIG5hdGl2ZUxvZyguLi5hcmdzKVxuICAgICAgfVxuICAgIH0sXG4gICAgZXJyb3I6ICguLi5hcmdzKSA9PiB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYXJncylcbiAgICB9XG4gIH1cbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3BvbHlmaWxsL2NvbnNvbGVsb2cuanNcbiAqKi8iLCIvKipcbiAqIEBmaWxlT3ZlcnZpZXcgTWFpbiBlbnRyeSwgaW5zdGFuY2UgbWFuYWdlclxuICpcbiAqIC0gY3JlYXRlSW5zdGFuY2UoaW5zdGFuY2VJZCwgY29kZSwgb3B0aW9ucywgZGF0YSlcbiAqIC0gcmVmcmVzaEluc3RhbmNlKGluc3RhbmNlSWQsIGRhdGEpXG4gKiAtIGRlc3Ryb3lJbnN0YW5jZShpbnN0YW5jZUlkKVxuICogLSByZWdpc3RlckNvbXBvbmVudHMoY29tcG9uZW50cylcbiAqIC0gcmVnaXN0ZXJNb2R1bGVzKG1vZHVsZXMpXG4gKiAtIGdldFJvb3QoaW5zdGFuY2VJZClcbiAqIC0gaW5zdGFuY2VNYXBcbiAqIC0gY2FsbEpTKGluc3RhbmNlSWQsIHRhc2tzKVxuICogICAtIGZpcmVFdmVudChyZWYsIHR5cGUsIGRhdGEpXG4gKiAgIC0gY2FsbGJhY2soZnVuY0lkLCBkYXRhKVxuICovXG5cbmltcG9ydCAqIGFzIHBlcmYgZnJvbSAnLi9wZXJmJ1xuaW1wb3J0ICogYXMgY29uZmlnIGZyb20gJy4vY29uZmlnJ1xuaW1wb3J0IEFwcEluc3RhbmNlIGZyb20gJy4vYXBwJ1xuaW1wb3J0IFZtIGZyb20gJy4vdm0nXG5cbnZhciB7XG4gIG5hdGl2ZUNvbXBvbmVudE1hcFxufSA9IGNvbmZpZ1xudmFyIGluc3RhbmNlTWFwID0ge31cblxuLyoqXG4gKiBjcmVhdGUgYSBXZWV4IGluc3RhbmNlXG4gKlxuICogQHBhcmFtICB7c3RyaW5nfSBpbnN0YW5jZUlkXG4gKiBAcGFyYW0gIHtzdHJpbmd9IGNvZGVcbiAqIEBwYXJhbSAge29iamVjdH0gW29wdGlvbnNdIG9wdGlvbiBgSEFTX0xPR2AgZW5hYmxlIHByaW50IGxvZ1xuICogQHBhcmFtICB7b2JqZWN0fSBbZGF0YV1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlKGluc3RhbmNlSWQsIGNvZGUsIG9wdGlvbnMsIGRhdGEpIHtcbiAgdmFyIGluc3RhbmNlID0gaW5zdGFuY2VNYXBbaW5zdGFuY2VJZF1cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cblxuICBjb25maWcuZGVidWcgPSBvcHRpb25zLmRlYnVnXG5cbiAgdmFyIHJlc3VsdFxuICBpZiAoIWluc3RhbmNlKSB7XG4gICAgcGVyZi5zdGFydCgnY3JlYXRlSW5zdGFuY2UnLCBpbnN0YW5jZUlkKVxuICAgIGluc3RhbmNlID0gbmV3IEFwcEluc3RhbmNlKGluc3RhbmNlSWQsIG9wdGlvbnMpXG4gICAgaW5zdGFuY2VNYXBbaW5zdGFuY2VJZF0gPSBpbnN0YW5jZVxuICAgIHJlc3VsdCA9IGluc3RhbmNlLmluaXQoY29kZSwgZGF0YSlcbiAgICBwZXJmLmVuZCgnY3JlYXRlSW5zdGFuY2UnLCBpbnN0YW5jZUlkKVxuICB9IGVsc2Uge1xuICAgIHJlc3VsdCA9IG5ldyBFcnJvcihgaW52YWxpZCBpbnN0YW5jZSBpZCBcIiR7aW5zdGFuY2VJZH1cImApXG4gIH1cblxuICByZXR1cm4gcmVzdWx0XG59XG5cbi8qKlxuICogcmVmcmVzaCBhIFdlZXggaW5zdGFuY2VcbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9IGluc3RhbmNlSWRcbiAqIEBwYXJhbSAge29iamVjdH0gZGF0YVxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVmcmVzaEluc3RhbmNlKGluc3RhbmNlSWQsIGRhdGEpIHtcbiAgdmFyIGluc3RhbmNlID0gaW5zdGFuY2VNYXBbaW5zdGFuY2VJZF1cbiAgdmFyIHJlc3VsdFxuICBpZiAoaW5zdGFuY2UpIHtcbiAgICBwZXJmLnN0YXJ0KCdyZWZyZXNoRGF0YScsIGluc3RhbmNlSWQpXG4gICAgcmVzdWx0ID0gaW5zdGFuY2UucmVmcmVzaERhdGEoZGF0YSlcbiAgICBwZXJmLmVuZCgncmVmcmVzaERhdGEnLCBpbnN0YW5jZUlkKVxuICB9IGVsc2Uge1xuICAgIHJlc3VsdCA9IG5ldyBFcnJvcihgaW52YWxpZCBpbnN0YW5jZSBpZCBcIiR7aW5zdGFuY2VJZH1cImApXG4gIH1cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG4vKipcbiAqIGRlc3Ryb3kgYSBXZWV4IGluc3RhbmNlXG4gKiBAcGFyYW0gIHtzdHJpbmd9IGluc3RhbmNlSWRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlc3Ryb3lJbnN0YW5jZShpbnN0YW5jZUlkKSB7XG4gIHZhciBpbnN0YW5jZSA9IGluc3RhbmNlTWFwW2luc3RhbmNlSWRdXG4gIGlmICghaW5zdGFuY2UpIHtcbiAgICByZXR1cm4gbmV3IEVycm9yKGBpbnZhbGlkIGluc3RhbmNlIGlkIFwiJHtpbnN0YW5jZUlkfVwiYClcbiAgfVxuXG4gIHBlcmYuc3RhcnQoJ2Rlc3Ryb3lJbnN0YW5jZScsIGluc3RhbmNlSWQpXG4gIGluc3RhbmNlLmRlc3Ryb3koKVxuICBkZWxldGUgaW5zdGFuY2VNYXBbaW5zdGFuY2VJZF1cbiAgcGVyZi5lbmQoJ2Rlc3Ryb3lJbnN0YW5jZScsIGluc3RhbmNlSWQpXG5cbiAgcmV0dXJuIGluc3RhbmNlTWFwXG59XG5cbi8qKlxuICogcmVnaXN0ZXIgdGhlIG5hbWUgb2YgZWFjaCBuYXRpdmUgY29tcG9uZW50XG4gKiBAcGFyYW0gIHthcnJheX0gY29tcG9uZW50cyBhcnJheSBvZiBuYW1lXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlckNvbXBvbmVudHMoY29tcG9uZW50cykge1xuICBpZiAoQXJyYXkuaXNBcnJheShjb21wb25lbnRzKSkge1xuICAgIGNvbXBvbmVudHMuZm9yRWFjaChmdW5jdGlvbiByZWdpc3RlcihuYW1lKSB7XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgIGlmICghbmFtZSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbmFtZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgbmF0aXZlQ29tcG9uZW50TWFwW25hbWVdID0gdHJ1ZVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgbmFtZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG5hbWUudHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgbmF0aXZlQ29tcG9uZW50TWFwW25hbWUudHlwZV0gPSBuYW1lXG4gICAgICB9XG4gICAgfSlcbiAgfVxufVxuXG4vKipcbiAqIHJlZ2lzdGVyIHRoZSBuYW1lIGFuZCBtZXRob2RzIG9mIGVhY2ggbW9kdWxlXG4gKiBAcGFyYW0gIHtvYmplY3R9IG1vZHVsZXMgYSBvYmplY3Qgb2YgbW9kdWxlc1xuICovXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJNb2R1bGVzKG1vZHVsZXMpIHtcbiAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSAnb2JqZWN0Jykge1xuICAgIFZtLnJlZ2lzdGVyTW9kdWxlcyhtb2R1bGVzKVxuICB9XG59XG5cbi8qKlxuICogcmVnaXN0ZXIgdGhlIG5hbWUgYW5kIG1ldGhvZHMgb2YgZWFjaCBhcGlcbiAqIEBwYXJhbSAge29iamVjdH0gYXBpcyBhIG9iamVjdCBvZiBhcGlzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3Rlck1ldGhvZHMoYXBpcykge1xuICBpZiAodHlwZW9mIGFwaXMgPT09ICdvYmplY3QnKSB7XG4gICAgVm0ucmVnaXN0ZXJNZXRob2RzKGFwaXMpXG4gIH1cbn1cblxuLyoqXG4gKiBnZXQgYSB3aG9sZSBlbGVtZW50IHRyZWUgb2YgYW4gaW5zdGFuY2VcbiAqIGZvciBkZWJ1Z2dpbmdcbiAqIEBwYXJhbSAge3N0cmluZ30gaW5zdGFuY2VJZFxuICogQHJldHVybiB7b2JqZWN0fSBhIHZpcnR1YWwgZG9tIHRyZWVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFJvb3QoaW5zdGFuY2VJZCkge1xuICB2YXIgaW5zdGFuY2UgPSBpbnN0YW5jZU1hcFtpbnN0YW5jZUlkXVxuICB2YXIgcmVzdWx0XG4gIGlmIChpbnN0YW5jZSkge1xuICAgIHJlc3VsdCA9IGluc3RhbmNlLmdldFJvb3RFbGVtZW50KClcbiAgfSBlbHNlIHtcbiAgICByZXN1bHQgPSBuZXcgRXJyb3IoYGludmFsaWQgaW5zdGFuY2UgaWQgXCIke2luc3RhbmNlSWR9XCJgKVxuICB9XG4gIHJldHVybiByZXN1bHRcbn1cblxudmFyIGpzSGFuZGxlcnMgPSB7XG4gIGZpcmVFdmVudDogZnVuY3Rpb24gZmlyZUV2ZW50KGluc3RhbmNlSWQsIHJlZiwgdHlwZSwgZGF0YSkge1xuICAgIHZhciBpbnN0YW5jZSA9IGluc3RhbmNlTWFwW2luc3RhbmNlSWRdXG4gICAgdmFyIHJlc3VsdFxuICAgIHBlcmYuc3RhcnQoJ2ZpcmVFdmVudCcsIGluc3RhbmNlSWQgKyAnLScgKyByZWYgKyAnLScgKyB0eXBlKVxuICAgIHJlc3VsdCA9IGluc3RhbmNlLmZpcmVFdmVudChyZWYsIHR5cGUsIGRhdGEpXG4gICAgcGVyZi5lbmQoJ2ZpcmVFdmVudCcsIGluc3RhbmNlSWQgKyAnLScgKyByZWYgKyAnLScgKyB0eXBlKVxuICAgIHJldHVybiByZXN1bHRcbiAgfSxcblxuICBjYWxsYmFjazogZnVuY3Rpb24gY2FsbGJhY2soaW5zdGFuY2VJZCwgZnVuY0lkLCBkYXRhLCBpZkxhc3QpIHtcbiAgICB2YXIgaW5zdGFuY2UgPSBpbnN0YW5jZU1hcFtpbnN0YW5jZUlkXVxuICAgIHZhciByZXN1bHRcbiAgICBwZXJmLnN0YXJ0KCdjYWxsYmFjaycsXG4gICAgICBpbnN0YW5jZUlkICsgJy0nICsgZnVuY0lkICsgJy0nICsgZGF0YSArICctJyArIGlmTGFzdClcbiAgICByZXN1bHQgPSBpbnN0YW5jZS5jYWxsYmFjayhmdW5jSWQsIGRhdGEsIGlmTGFzdClcbiAgICBwZXJmLmVuZCgnY2FsbGJhY2snLFxuICAgICAgaW5zdGFuY2VJZCArICctJyArIGZ1bmNJZCArICctJyArIGRhdGEgKyAnLScgKyBpZkxhc3QpXG4gICAgcmV0dXJuIHJlc3VsdFxuICB9XG59XG5cbi8qKlxuICogYWNjZXB0IGNhbGxzIGZyb20gbmF0aXZlIChldmVudCBvciBjYWxsYmFjaylcbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9IGluc3RhbmNlSWRcbiAqIEBwYXJhbSAge2FycmF5fSB0YXNrcyBsaXN0IHdpdGggYG1ldGhvZGAgYW5kIGBhcmdzYFxuICovXG5leHBvcnQgZnVuY3Rpb24gY2FsbEpTKGluc3RhbmNlSWQsIHRhc2tzKSB7XG4gIGNvbnN0IGluc3RhbmNlID0gaW5zdGFuY2VNYXBbaW5zdGFuY2VJZF1cbiAgbGV0IHJlc3VsdHMgPSBbXVxuICBpZiAoaW5zdGFuY2UgJiYgQXJyYXkuaXNBcnJheSh0YXNrcykpIHtcbiAgICB0YXNrcy5mb3JFYWNoKCh0YXNrKSA9PiB7XG4gICAgICBjb25zdCBoYW5kbGVyID0ganNIYW5kbGVyc1t0YXNrLm1ldGhvZF1cbiAgICAgIGNvbnN0IGFyZ3MgPSBbLi4udGFzay5hcmdzXVxuICAgICAgaWYgKHR5cGVvZiBoYW5kbGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGxvZygnamF2YXNjcmlwdDonLCB0YXNrLm1ldGhvZCwgdGFzay5hcmdzKVxuICAgICAgICBhcmdzLnVuc2hpZnQoaW5zdGFuY2VJZClcbiAgICAgICAgcmVzdWx0cy5wdXNoKGhhbmRsZXIoLi4uYXJncykpXG4gICAgICB9XG4gICAgfSlcbiAgfSBlbHNlIHtcbiAgICByZXN1bHRzLnB1c2gobmV3IEVycm9yKGBpbnZhbGlkIGluc3RhbmNlIGlkIFwiJHtpbnN0YW5jZUlkfVwiIG9yIHRhc2tzYCkpXG4gIH1cblxuICByZXR1cm4gcmVzdWx0c1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9saWIvZnJhbWV3b3JrLmpzXG4gKiovIiwiaW1wb3J0IGxvZyBmcm9tICcuL2xvZydcblxudmFyIGRhdGEgPSB7dHlwZTogJ3Jvb3QnLCBjaGlsZHJlbjogW119XG52YXIgY3VycmVudCA9IGRhdGFcbnZhciBzdGFjayA9IFtjdXJyZW50XVxuXG5mdW5jdGlvbiBzcGFjZXMobnVtKSB7XG4gIHJldHVybiBBcnJheShudW0pLmpvaW4oJyAnKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RhcnQodHlwZSwgaWQpIHtcbiAgdmFyIHRhc2sgPSB7dHlwZTogdHlwZSwgaWQ6IGlkLCBjaGlsZHJlbjogW10sIHN0YXJ0OiBEYXRlLm5vdygpfVxuICBjdXJyZW50LmNoaWxkcmVuLnB1c2godGFzaylcbiAgc3RhY2sucHVzaCh0YXNrKVxuICBjdXJyZW50ID0gdGFza1xuICBsb2coJ3BlcmY6JyArIHNwYWNlcyhzdGFjay5sZW5ndGggLSAxKSwgJ3N0YXJ0JywgdGFzay50eXBlLCB0YXNrLmlkKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZW5kKHR5cGUsIGlkKSB7XG4gIHZhciB0YXNrID0gc3RhY2sucG9wKClcbiAgdGFzay5lbmQgPSBEYXRlLm5vdygpXG4gIGN1cnJlbnQgPSBzdGFja1tzdGFjay5sZW5ndGggLSAxXVxuICBsb2coJ3BlcmY6JyArIHNwYWNlcyhzdGFjay5sZW5ndGgpLCAnZW5kJyxcbiAgICAodGFzay5lbmQgLSB0YXNrLnN0YXJ0KSArICdtcycsIHRhc2sudHlwZSwgdGFzay5pZClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlc2V0KCkge1xuICBkYXRhLmNoaWxkcmVuID0gW11cbiAgY3VycmVudCA9IGRhdGFcbiAgc3RhY2subGVuZ3RoID0gMFxuICBzdGFjay5wdXNoKGN1cnJlbnQpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b0pTT04oKSB7XG4gIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGRhdGEpKVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9saWIvcGVyZi5qc1xuICoqLyIsImltcG9ydCAqIGFzIGNvbmZpZyBmcm9tICcuL2NvbmZpZydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbG9nKC4uLmFyZ3MpIHtcbiAgaWYgKGNvbmZpZy5kZWJ1Zykge1xuICAgIGdsb2JhbC5jb25zb2xlLmxvZyguLi5hcmdzKVxuICB9XG59XG5cbmdsb2JhbC5sb2cgPSBsb2dcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2xpYi9sb2cuanNcbiAqKi8iLCJleHBvcnQgY29uc3QgbmF0aXZlQ29tcG9uZW50TWFwID0ge1xuICB0ZXh0OiB0cnVlLFxuICBpbWFnZTogdHJ1ZSxcbiAgY29udGFpbmVyOiB0cnVlLFxuICBzbGlkZXI6IHtcbiAgICB0eXBlOiAnc2xpZGVyJyxcbiAgICBhcHBlbmQ6ICd0cmVlJ1xuICB9LFxuICBjZWxsOiB7XG4gICAgdHlwZTogJ2NlbGwnLFxuICAgIGFwcGVuZDogJ3RyZWUnXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGN1c3RvbUNvbXBvbmVudE1hcCA9IHt9XG5cbmV4cG9ydCB2YXIgZGVidWcgPSBmYWxzZVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2xpYi9jb25maWcuanNcbiAqKi8iLCIvKipcbiAqIEBmaWxlT3ZlcnZpZXdcbiAqIFdlZXggaW5zdGFuY2UgY29uc3RydWN0b3IgJiBkZWZpbml0aW9uXG4gKi9cblxuaW1wb3J0IHt0eXBvZiwgZXh0ZW5kfSBmcm9tICcuLi91dGlsJ1xuaW1wb3J0ICogYXMgcGVyZiBmcm9tICcuLi9wZXJmJ1xuaW1wb3J0ICogYXMgYnVuZGxlIGZyb20gJy4vYnVuZGxlJ1xuaW1wb3J0ICogYXMgY3RybCBmcm9tICcuL2N0cmwnXG5pbXBvcnQgRGlmZmVyIGZyb20gJy4vZGlmZmVyJ1xuXG5pbXBvcnQgRXZlbnRNYW5hZ2VyIGZyb20gJy4vZXZlbnQnXG5pbXBvcnQgTGlzdGVuZXIgZnJvbSAnLi9kb20tbGlzdGVuZXInXG5pbXBvcnQge0RvY3VtZW50LCBOb2RlfSBmcm9tICcuL2RvbSdcbmltcG9ydCB7cmVnaXN0ZXJDb21wb25lbnQsIHJlcXVpcmVDb21wb25lbnQsIHJlcXVpcmVNb2R1bGV9IGZyb20gJy4vcmVnaXN0ZXInXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEFwcEluc3RhbmNlKGluc3RhbmNlSWQsIG9wdGlvbnMpIHtcbiAgcGVyZi5zdGFydCgnaW5pdEluc3RhbmNlJywgaW5zdGFuY2VJZClcbiAgdGhpcy5pZCA9IGluc3RhbmNlSWRcbiAgdGhpcy5vcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuICB0aGlzLnZtID0gbnVsbFxuICB0aGlzLmRvYyA9IG5ldyBEb2N1bWVudChpbnN0YW5jZUlkKVxuICB0aGlzLmN1c3RvbUNvbXBvbmVudE1hcCA9IHt9XG4gIHRoaXMuY2FsbGJhY2tzID0ge31cbiAgdGhpcy5kaWZmZXIgPSBuZXcgRGlmZmVyKGluc3RhbmNlSWQpXG4gIHRoaXMudWlkID0gMFxuICB0aGlzLnJlbmRlcmVkID0gZmFsc2VcbiAgdGhpcy5ldmVudE1hbmFnZXIgPSBuZXcgRXZlbnRNYW5hZ2VyKClcbiAgdGhpcy5saXN0ZW5lciA9IG5ldyBMaXN0ZW5lcih0aGlzLmlkLCAodGFza3MpID0+IHtcbiAgICB0aGlzLmNhbGxUYXNrcyh0YXNrcylcbiAgfSlcbiAgdGhpcy5kb2Muc2V0RXZlbnRNYW5hZ2VyKHRoaXMuZXZlbnRNYW5hZ2VyKVxuICB0aGlzLmRvYy5zZXRMaXN0ZW5lcih0aGlzLmxpc3RlbmVyKVxuXG4gIHBlcmYuZW5kKCdpbml0SW5zdGFuY2UnLCBpbnN0YW5jZUlkKVxufVxuXG5mdW5jdGlvbiBub3JtYWxpemUoYXBwLCB2KSB7XG4gIHZhciB0eXBlID0gdHlwb2YodilcblxuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICd1bmRlZmluZWQnOlxuICAgIGNhc2UgJ251bGwnOlxuICAgICAgcmV0dXJuICcnXG4gICAgY2FzZSAncmVnZXhwJzpcbiAgICAgIHJldHVybiB2LnRvU3RyaW5nKClcbiAgICBjYXNlICdkYXRlJzpcbiAgICAgIHJldHVybiB2LnRvSVNPU3RyaW5nKClcbiAgICBjYXNlICdudW1iZXInOlxuICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgY2FzZSAnYm9vbGVhbic6XG4gICAgY2FzZSAnYXJyYXknOlxuICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICBpZiAodiBpbnN0YW5jZW9mIE5vZGUpIHtcbiAgICAgICAgcmV0dXJuIHYucmVmXG4gICAgICB9XG4gICAgICByZXR1cm4gdlxuICAgIGNhc2UgJ2Z1bmN0aW9uJzpcbiAgICAgIGFwcC5jYWxsYmFja3NbKythcHAudWlkXSA9IHZcbiAgICAgIHJldHVybiBhcHAudWlkLnRvU3RyaW5nKClcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHYpXG4gIH1cbn1cblxuQXBwSW5zdGFuY2UucHJvdG90eXBlLmNhbGxUYXNrcyA9IGZ1bmN0aW9uICh0YXNrcykge1xuICBpZiAodHlwb2YodGFza3MpICE9PSAnYXJyYXknKSB7XG4gICAgdGFza3MgPSBbdGFza3NdXG4gIH1cblxuICB0YXNrcy5mb3JFYWNoKCh0YXNrKSA9PiB7XG4gICAgdGFzay5hcmdzID0gdGFzay5hcmdzLm1hcChhcmcgPT4gbm9ybWFsaXplKHRoaXMsIGFyZykpXG4gIH0pXG5cbiAgY2FsbE5hdGl2ZSh0aGlzLmlkLCB0YXNrcywgJy0xJylcbn1cblxuZXh0ZW5kKEFwcEluc3RhbmNlLnByb3RvdHlwZSwgYnVuZGxlLCBjdHJsLCB7XG4gIHJlZ2lzdGVyQ29tcG9uZW50LFxuICByZXF1aXJlQ29tcG9uZW50LFxuICByZXF1aXJlTW9kdWxlXG59KVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9saWIvYXBwL2luZGV4LmpzXG4gKiovIiwiLy8vIGxhbmcuanNcbmltcG9ydCBDb25maWcgZnJvbSAnLi4vY29uZmlnJ1xuXG4vKipcbiAqIENoZWNrIGlzIGEgc3RyaW5nIHN0YXJ0cyB3aXRoICQgb3IgX1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cblxuZXhwb3J0IHZhciBpc1Jlc2VydmVkID0gKHN0cikgPT4ge1xuICBsZXQgYyA9IChzdHIgKyAnJykuY2hhckNvZGVBdCgwKVxuICByZXR1cm4gYyA9PT0gMHgyNCB8fCBjID09PSAweDVGXG59XG5cbi8qKlxuICogQ2FtZWxpemUgYSBoeXBoZW4tZGVsbWl0ZWQgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuXG5sZXQgY2FtZWxSRSA9IC8tKFxcdykvZ1xuZnVuY3Rpb24gdG9VcHBlciAoXywgYykge1xuICByZXR1cm4gYyA/IGMudG9VcHBlckNhc2UgKCkgOiAnJ1xufVxuZXhwb3J0IHZhciBjYW1lbGl6ZSA9IChzdHIpID0+IHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKGNhbWVsUkUsIHRvVXBwZXIpXG59XG5cbi8qKlxuICogU2ltcGxlIGJpbmQsIGZhc3RlciB0aGFuIG5hdGl2ZVxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge09iamVjdH0gY3R4XG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqL1xuXG5leHBvcnQgdmFyIGJpbmQgPSBmdW5jdGlvbiAoZm4sIGN0eCkge1xuICByZXR1cm4gZnVuY3Rpb24gKGEpIHtcbiAgICBsZXQgbCA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgICByZXR1cm4gbFxuICAgICAgPyBsID4gMVxuICAgICAgICA/IGZuLmFwcGx5KGN0eCwgYXJndW1lbnRzKVxuICAgICAgICA6IGZuLmNhbGwoY3R4LCBhKVxuICAgICAgOiBmbi5jYWxsKGN0eClcbiAgfVxufVxuXG4vKipcbiAqIENvbnZlcnQgYW4gQXJyYXktbGlrZSBvYmplY3QgdG8gYSByZWFsIEFycmF5LlxuICpcbiAqIEBwYXJhbSB7QXJyYXktbGlrZX0gbGlzdFxuICogQHBhcmFtIHtOdW1iZXJ9IFtzdGFydF0gLSBzdGFydCBpbmRleFxuICogQHJldHVybiB7QXJyYXl9XG4gKi9cblxuZXhwb3J0IHZhciB0b0FycmF5ID0gKGxpc3QsIHN0YXJ0KSA9PiB7XG4gIHN0YXJ0ID0gc3RhcnQgfHwgMFxuICBsZXQgaSA9IGxpc3QubGVuZ3RoIC0gc3RhcnRcbiAgbGV0IHJldCA9IG5ldyBBcnJheShpKVxuICB3aGlsZSAoaS0tKSB7XG4gICAgcmV0W2ldID0gbGlzdFtpICsgc3RhcnRdXG4gIH1cbiAgcmV0dXJuIHJldFxufVxuXG4vKipcbiAqIE1peCBwcm9wZXJ0aWVzIGludG8gdGFyZ2V0IG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdG9cbiAqIEBwYXJhbSB7T2JqZWN0fSBmcm9tXG4gKi9cblxuZXhwb3J0IHZhciBleHRlbmQgPSAodGFyZ2V0LCAuLi5zcmMpID0+IHtcbiAgaWYgKHR5cGVvZiBPYmplY3QuYXNzaWduID09PSAnZnVuY3Rpb24nKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0YXJnZXQsIC4uLnNyYylcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBmaXJzdCA9IHNyYy5zaGlmdCgpXG4gICAgZm9yIChjb25zdCBrZXkgaW4gZmlyc3QpIHtcbiAgICAgIHRhcmdldFtrZXldID0gZmlyc3Rba2V5XVxuICAgIH1cbiAgICBpZiAoc3JjLmxlbmd0aCkge1xuICAgICAgZXh0ZW5kKHRhcmdldCwgLi4uc3JjKVxuICAgIH1cbiAgfVxuICByZXR1cm4gdGFyZ2V0XG59XG5cbi8qKlxuICogUXVpY2sgb2JqZWN0IGNoZWNrIC0gdGhpcyBpcyBwcmltYXJpbHkgdXNlZCB0byB0ZWxsXG4gKiBPYmplY3RzIGZyb20gcHJpbWl0aXZlIHZhbHVlcyB3aGVuIHdlIGtub3cgdGhlIHZhbHVlXG4gKiBpcyBhIEpTT04tY29tcGxpYW50IHR5cGUuXG4gKlxuICogQHBhcmFtIHsqfSBvYmpcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cblxuZXhwb3J0IHZhciBpc09iamVjdCA9IChvYmopID0+IHtcbiAgcmV0dXJuICEhKG9iaiAmJiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0Jylcbn1cblxuLyoqXG4gKiBTdHJpY3Qgb2JqZWN0IHR5cGUgY2hlY2suIE9ubHkgcmV0dXJucyB0cnVlXG4gKiBmb3IgcGxhaW4gSmF2YVNjcmlwdCBvYmplY3RzLlxuICpcbiAqIEBwYXJhbSB7Kn0gb2JqXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5cbmxldCB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdcbmV4cG9ydCB2YXIgaXNQbGFpbk9iamVjdCA9IChvYmopID0+IHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgT2JqZWN0XSdcbn1cblxuLyoqXG4gKiBBcnJheSB0eXBlIGNoZWNrLlxuICpcbiAqIEBwYXJhbSB7Kn0gb2JqXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5cbmV4cG9ydCB2YXIgaXNBcnJheSA9IChvYmopID0+IHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkob2JqKVxufVxuXG5leHBvcnQgdmFyIHN0cmluZ2lmeSA9ICh4KSA9PiB7XG4gIHJldHVybiB0eXBlb2YgeCA9PT0gJ3VuZGVmaW5lZCcgfHwgeCA9PT0gbnVsbCB8fCB0eXBlb2YoeCkgPT09ICdmdW5jdGlvbidcbiAgICA/ICcnXG4gICAgOiB0eXBlb2YgeCA9PT0gJ29iamVjdCdcbiAgICAgID8geCBpbnN0YW5jZW9mIFJlZ0V4cFxuICAgICAgICA/IHgudG9TdHJpbmcoKVxuICAgICAgICA6IHggaW5zdGFuY2VvZiBEYXRlXG4gICAgICAgICAgPyBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHgpKVxuICAgICAgICAgIDogSlNPTi5zdHJpbmdpZnkoeClcbiAgICAgIDogeC50b1N0cmluZygpXG59XG5cbmV4cG9ydCB2YXIgdHlwb2YgPSAodikgPT4ge1xuICBsZXQgcyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2KVxuICByZXR1cm4gcy5zdWJzdHJpbmcoOCwgcy5sZW5ndGggLSAxKS50b0xvd2VyQ2FzZSgpXG59XG5cbmV4cG9ydCB2YXIgbm9ybWFsaXplID0gKHYpID0+IHtcbiAgbGV0IHR5cGUgPSB0eXBvZih2KVxuXG4gIHN3aXRjaCh0eXBlKSB7XG4gICAgY2FzZSAndW5kZWZpbmVkJzpcbiAgICBjYXNlICdudWxsJzpcbiAgICAgIHJldHVybiAnJ1xuICAgIGNhc2UgJ3JlZ2V4cCc6XG4gICAgICByZXR1cm4gdi50b1N0cmluZygpXG4gICAgY2FzZSAnZGF0ZSc6XG4gICAgICByZXR1cm4gdi50b0lTT1N0cmluZygpXG4gICAgY2FzZSAnbnVtYmVyJzpcbiAgICBjYXNlICdzdHJpbmcnOlxuICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgIGNhc2UgJ2FycmF5JzpcbiAgICBjYXNlICdvYmplY3QnOlxuICAgIGNhc2UgJ2Z1bmN0aW9uJzpcbiAgICAgIHJldHVybiB2XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh2KVxuICB9XG59XG5cbi8qKlxuICogRGVmaW5lIGEgbm9uLWVudW1lcmFibGUgcHJvcGVydHlcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gKiBAcGFyYW0geyp9IHZhbFxuICogQHBhcmFtIHtCb29sZWFufSBbZW51bWVyYWJsZV1cbiAqL1xuXG5leHBvcnQgdmFyIGRlZmluZSA9IChvYmosIGtleSwgdmFsLCBlbnVtZXJhYmxlKSA9PiB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgIHZhbHVlOiB2YWwsXG4gICAgZW51bWVyYWJsZTogISFlbnVtZXJhYmxlLFxuICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICB9KVxufVxuXG4vKipcbiAqIE1hbnVhbCBpbmRleE9mIGJlY2F1c2UgaXQncyBzbGlnaHRseSBmYXN0ZXIgdGhhblxuICogbmF0aXZlLlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxuICogQHBhcmFtIHsqfSBvYmpcbiAqL1xuXG5leHBvcnQgdmFyIGluZGV4T2YgPSAoYXJyLCBvYmopID0+IHtcbiAgZm9yIChsZXQgaSA9IDAsIGwgPSBhcnIubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgaWYgKGFycltpXSA9PT0gb2JqKSByZXR1cm4gaVxuICB9XG4gIHJldHVybiAtMVxufVxuXG5cbi8vLyBkZWJ1Zy5qc1xuXG5cbmNvbnN0IGhhc0NvbnNvbGUgPSB0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCdcblxuLyoqXG4gKiBMb2cgYSBtZXNzYWdlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBtc2dcbiAqL1xuXG5leHBvcnQgdmFyIGxvZyA9IChtc2cpID0+IHtcbiAgY29uc3QgX2NvbmZpZyA9IENvbmZpZyB8fCB7fVxuICBpZiAoaGFzQ29uc29sZSAmJiBfY29uZmlnLmRlYnVnKSB7XG4gICAgY29uc29sZS5sb2cuY2FsbCh0aGlzLCAnW2luZm9dOiAnLCBtc2cpXG4gIH1cbn1cblxuLyoqXG4gKiBXZSd2ZSBnb3QgYSBwcm9ibGVtIGhlcmUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG1zZ1xuICovXG5cbmV4cG9ydCB2YXIgd2FybiA9IChtc2cpID0+IHtcbiAgLy8gaWYgKGhhc0NvbnNvbGUgJiYgKCFjb25maWcuc2lsZW50IHx8IGNvbmZpZy5kZWJ1ZykpIHtcbiAgaWYgKGhhc0NvbnNvbGUpIHtcbiAgICBjb25zb2xlLndhcm4uY2FsbCh0aGlzLCAnW3dhcm5dOiAnLCBtc2cpXG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgLy8gaWYgKGNvbmZpZy5kZWJ1Zykge1xuICAgIC8vICAgLyoganNoaW50IGRlYnVnOiB0cnVlICovXG4gICAgLy8gICBkZWJ1Z2dlclxuICAgIC8vIH1cbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9saWIvdXRpbC9pbmRleC5qc1xuICoqLyIsIi8qKlxuICogQGZpbGVPdmVydmlld1xuICogYXBpIHRoYXQgaW52b2tlZCBieSBqcyBidW5kbGUgY29kZVxuICpcbiAqIC0gZGVmaW5lKG5hbWUsIGZhY3RvcnkpOiBkZWZpbmUgYSBuZXcgY29tcG9zZWQgY29tcG9uZW50IHR5cGVcbiAqIC0gYm9vdHN0cmFwKHR5cGUsIGNvbmZpZywgZGF0YSk6IHJlcXVpcmUgYSBjZXJ0YWluIHR5cGUgJlxuICogICAgICAgICByZW5kZXIgd2l0aCAob3B0aW9uYWwpIGRhdGFcbiAqXG4gKiBkZXByZWNhdGVkOlxuICogLSByZWdpc3Rlcih0eXBlLCBvcHRpb25zKTogcmVnaXN0ZXIgYSBuZXcgY29tcG9zZWQgY29tcG9uZW50IHR5cGVcbiAqIC0gcmVuZGVyKHR5cGUsIGRhdGEpOiByZW5kZXIgYnkgYSBjZXJ0YWluIHR5cGUgd2l0aCAob3B0aW9uYWwpIGRhdGFcbiAqIC0gcmVxdWlyZSh0eXBlKShkYXRhKTogcmVxdWlyZSBhIHR5cGUgdGhlbiByZW5kZXIgd2l0aCBkYXRhXG4gKi9cblxuaW1wb3J0IHNlbXZlciBmcm9tICdzZW12ZXInXG5pbXBvcnQgKiBhcyBfIGZyb20gJy4uL3V0aWwnXG5pbXBvcnQgKiBhcyBjb25maWcgZnJvbSAnLi4vY29uZmlnJ1xuaW1wb3J0ICogYXMgcGVyZiBmcm9tICcuLi9wZXJmJ1xuaW1wb3J0IFZtIGZyb20gJy4uL3ZtJ1xuaW1wb3J0ICogYXMgZG93bmdyYWRlIGZyb20gJy4vZG93bmdyYWRlJ1xuXG5jb25zdCBXRUVYX0NPTVBPTkVOVF9SRUcgPSAvXlxcQHdlZXgtY29tcG9uZW50XFwvL1xuY29uc3QgV0VFWF9NT0RVTEVfUkVHID0gL15cXEB3ZWV4LW1vZHVsZVxcLy9cbmNvbnN0IE5PUk1BTF9NT0RVTEVfUkVHID0gL15cXC57MSwyfVxcLy9cbmNvbnN0IEpTX1NVUkZJWF9SRUcgPSAvXFwuanMkL1xuXG5jb25zdCBpc1dlZXhDb21wb25lbnQgPSBuYW1lID0+ICEhbmFtZS5tYXRjaChXRUVYX0NPTVBPTkVOVF9SRUcpXG5jb25zdCBpc1dlZXhNb2R1bGUgPSBuYW1lID0+ICEhbmFtZS5tYXRjaChXRUVYX01PRFVMRV9SRUcpXG5jb25zdCBpc05vcm1hbE1vZHVsZSA9IG5hbWUgPT4gISFuYW1lLm1hdGNoKE5PUk1BTF9NT0RVTEVfUkVHKVxuY29uc3QgaXNOcG1Nb2R1bGUgPSBuYW1lID0+ICFpc1dlZXhDb21wb25lbnQobmFtZSkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICFpc1dlZXhNb2R1bGUobmFtZSkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICFpc05vcm1hbE1vZHVsZShuYW1lKVxuXG5mdW5jdGlvbiByZW1vdmVXZWV4UHJlZml4KHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoV0VFWF9DT01QT05FTlRfUkVHLCAnJylcbiAgICAgICAgICAucmVwbGFjZShXRUVYX01PRFVMRV9SRUcsICcnKVxufVxuXG5mdW5jdGlvbiByZW1vdmVKU1N1cmZpeChzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKEpTX1NVUkZJWF9SRUcsICcnKVxufVxuXG5sZXQgY29tbW9uTW9kdWxlcyA9IHt9XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGVhckNvbW1vbk1vZHVsZXMoKSB7XG4gIGNvbW1vbk1vZHVsZXMgPSB7fVxufVxuXG4vLyBkZWZpbmUobmFtZSwgZmFjdG9yeSkgZm9yIHByaW1hcnkgdXNhZ2Vcbi8vIG9yXG4vLyBkZWZpbmUobmFtZSwgZGVwcywgZmFjdG9yeSkgZm9yIGNvbXBhdGliaWxpdHlcbi8vIE5vdGljZTogRE8gTk9UIHVzZSBmdW5jdGlvbiBkZWZpbmUoKSB7fSxcbi8vIGl0IHdpbGwgY2F1c2UgZXJyb3IgYWZ0ZXIgYnVpbGRlZCBieSB3ZWJwYWNrXG5leHBvcnQgdmFyIGRlZmluZSA9IGZ1bmN0aW9uIChuYW1lLCBkZXBzLCBmYWN0b3J5KSB7XG4gIHBlcmYuc3RhcnQoJ2RlZmluZScsIG5hbWUpXG5cbiAgaWYgKF8udHlwb2YoZGVwcykgPT09ICdmdW5jdGlvbicpIHtcbiAgICBmYWN0b3J5ID0gZGVwc1xuICAgIGRlcHMgPSBbXVxuICB9XG5cbiAgbGV0IF9yZXF1aXJlID0gKG5hbWUpID0+IHtcbiAgICBsZXQgY2xlYW5OYW1lXG5cbiAgICBpZiAoaXNXZWV4Q29tcG9uZW50KG5hbWUpKSB7XG4gICAgICBjbGVhbk5hbWUgPSByZW1vdmVXZWV4UHJlZml4KG5hbWUpXG4gICAgICByZXR1cm4gdGhpcy5yZXF1aXJlQ29tcG9uZW50KGNsZWFuTmFtZSlcbiAgICB9XG4gICAgaWYgKGlzV2VleE1vZHVsZShuYW1lKSkge1xuICAgICAgY2xlYW5OYW1lID0gcmVtb3ZlV2VleFByZWZpeChuYW1lKVxuICAgICAgcmV0dXJuIHRoaXMucmVxdWlyZU1vZHVsZShjbGVhbk5hbWUpXG4gICAgfVxuICAgIGlmIChpc05vcm1hbE1vZHVsZShuYW1lKSkge1xuICAgICAgY2xlYW5OYW1lID0gcmVtb3ZlSlNTdXJmaXgobmFtZSlcbiAgICAgIHJldHVybiBjb21tb25Nb2R1bGVzW25hbWVdXG4gICAgfVxuICAgIGlmIChpc05wbU1vZHVsZShuYW1lKSkge1xuICAgICAgY2xlYW5OYW1lID0gcmVtb3ZlSlNTdXJmaXgobmFtZSlcbiAgICAgIHJldHVybiBjb21tb25Nb2R1bGVzW25hbWVdXG4gICAgfVxuICB9XG4gIGxldCBfbW9kdWxlID0ge2V4cG9ydHM6IHt9fVxuXG4gIGxldCBjbGVhbk5hbWVcbiAgaWYgKGlzV2VleENvbXBvbmVudChuYW1lKSkge1xuICAgIGNsZWFuTmFtZSA9IHJlbW92ZVdlZXhQcmVmaXgobmFtZSlcblxuICAgIGZhY3RvcnkoX3JlcXVpcmUsIF9tb2R1bGUuZXhwb3J0cywgX21vZHVsZSlcblxuICAgIHRoaXMucmVnaXN0ZXJDb21wb25lbnQoY2xlYW5OYW1lLCBfbW9kdWxlLmV4cG9ydHMpXG4gIH0gZWxzZSBpZiAoaXNXZWV4TW9kdWxlKG5hbWUpKSB7XG4gICAgY2xlYW5OYW1lID0gcmVtb3ZlV2VleFByZWZpeChuYW1lKVxuXG4gICAgZmFjdG9yeShfcmVxdWlyZSwgX21vZHVsZS5leHBvcnRzLCBfbW9kdWxlKVxuXG4gICAgVm0ucmVnaXN0ZXJNb2R1bGVzKHtcbiAgICAgIFtjbGVhbk5hbWVdOiBfbW9kdWxlLmV4cG9ydHNcbiAgICB9KVxuICB9IGVsc2UgaWYgKGlzTm9ybWFsTW9kdWxlKG5hbWUpKSB7XG4gICAgY2xlYW5OYW1lID0gcmVtb3ZlSlNTdXJmaXgobmFtZSlcblxuICAgIGZhY3RvcnkoX3JlcXVpcmUsIF9tb2R1bGUuZXhwb3J0cywgX21vZHVsZSlcblxuICAgIGNvbW1vbk1vZHVsZXNbY2xlYW5OYW1lXSA9IF9tb2R1bGUuZXhwb3J0c1xuICB9IGVsc2UgaWYgKGlzTnBtTW9kdWxlKG5hbWUpKSB7XG4gICAgY2xlYW5OYW1lID0gcmVtb3ZlSlNTdXJmaXgobmFtZSlcblxuICAgIGZhY3RvcnkoX3JlcXVpcmUsIF9tb2R1bGUuZXhwb3J0cywgX21vZHVsZSlcblxuICAgIGxldCBleHBvcnRzID0gX21vZHVsZS5leHBvcnRzXG4gICAgaWYgKGV4cG9ydHMudGVtcGxhdGUgfHxcbiAgICAgICAgZXhwb3J0cy5zdHlsZSB8fFxuICAgICAgICBleHBvcnRzLm1ldGhvZHMpIHtcbiAgICAgIC8vIGRvd25ncmFkZSB0byBvbGQgZGVmaW5lIG1ldGhvZCAoZGVmaW5lKCdjb21wb25lbnROYW1lJywgZmFjdG9yeSkpXG4gICAgICAvLyB0aGUgZXhwb3J0cyBjb250YWluIG9uZSBrZXkgb2YgdGVtcGxhdGUsIHN0eWxlIG9yIG1ldGhvZHNcbiAgICAgIC8vIGJ1dCBpdCBoYXMgcmlzayEhIVxuICAgICAgdGhpcy5yZWdpc3RlckNvbXBvbmVudChjbGVhbk5hbWUsIGV4cG9ydHMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbW1vbk1vZHVsZXNbY2xlYW5OYW1lXSA9IF9tb2R1bGUuZXhwb3J0c1xuICAgIH1cbiAgfVxuXG4gIHBlcmYuZW5kKCdkZWZpbmUnLCBuYW1lKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYm9vdHN0cmFwKG5hbWUsIGNvbmZpZywgZGF0YSkge1xuICBsZXQgY2xlYW5OYW1lXG5cbiAgaWYgKGlzV2VleENvbXBvbmVudChuYW1lKSkge1xuICAgIGNsZWFuTmFtZSA9IHJlbW92ZVdlZXhQcmVmaXgobmFtZSlcbiAgfSBlbHNlIGlmIChpc05wbU1vZHVsZShuYW1lKSkge1xuICAgIGNsZWFuTmFtZSA9IHJlbW92ZUpTU3VyZml4KG5hbWUpXG4gICAgLy8gY2hlY2sgaWYgZGVmaW5lIGJ5IG9sZCAnZGVmaW5lJyBtZXRob2RcbiAgICBpZiAoIXRoaXMuY3VzdG9tQ29tcG9uZW50TWFwW2NsZWFuTmFtZV0pIHtcbiAgICAgIHJldHVybiBuZXcgRXJyb3IoYEl0J3Mgbm90IGEgY29tcG9uZW50OiAke25hbWV9YClcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ldyBFcnJvcihgV3JvbmcgY29tcG9uZW50IG5hbWU6ICR7bmFtZX1gKVxuICB9XG5cbiAgY29uZmlnID0gXy5pc1BsYWluT2JqZWN0KGNvbmZpZykgPyBjb25maWcgOiB7fVxuXG4gIGlmICh0eXBlb2YgY29uZmlnLnRyYW5zZm9ybWVyVmVyc2lvbiA9PT0gJ3N0cmluZycgJiZcbiAgICB0eXBlb2YgZ2xvYmFsLm5lZWRUcmFuc2Zvcm1lclZlcnNpb24gPT09ICdzdHJpbmcnICYmXG4gICAgIXNlbXZlci5zYXRpc2ZpZXMoY29uZmlnLnRyYW5zZm9ybWVyVmVyc2lvbixcbiAgICAgIGdsb2JhbC5uZWVkVHJhbnNmb3JtZXJWZXJzaW9uKSkge1xuICAgIHJldHVybiBuZXcgRXJyb3IoYEpTIEJ1bmRsZSB2ZXJzaW9uOiAke2NvbmZpZy50cmFuc2Zvcm1lclZlcnNpb259IGAgK1xuICAgICAgYG5vdCBjb21wYXRpYmxlIHdpdGggJHtnbG9iYWwubmVlZFRyYW5zZm9ybWVyVmVyc2lvbn1gKVxuICB9XG5cbiAgbGV0IF9jaGVja0Rvd25ncmFkZSA9IGRvd25ncmFkZS5jaGVjayhjb25maWcuZG93bmdyYWRlLCB0aGlzLm9wdGlvbnMpXG4gIGlmIChfY2hlY2tEb3duZ3JhZGUuaXNEb3duZ3JhZGUpIHtcbiAgICB0aGlzLmNhbGxUYXNrcyhbe1xuICAgICAgbW9kdWxlOiAnaW5zdGFuY2VXcmFwJyxcbiAgICAgIG1ldGhvZDogJ2Vycm9yJyxcbiAgICAgIGFyZ3M6IFtcbiAgICAgICAgX2NoZWNrRG93bmdyYWRlLmVycm9yVHlwZSxcbiAgICAgICAgX2NoZWNrRG93bmdyYWRlLmNvZGUsXG4gICAgICAgIF9jaGVja0Rvd25ncmFkZS5lcnJvck1lc3NhZ2VcbiAgICAgIF1cbiAgICB9XSlcbiAgICByZXR1cm4gbmV3IEVycm9yKGBEb3duZ3JhZGU6ICR7Y29uZmlnLmRvd25ncmFkZX1gKVxuICB9XG5cbiAgcGVyZi5zdGFydCgnY3JlYXRlIHZtJywgY2xlYW5OYW1lKVxuXG4gIHRoaXMudm0gPSBuZXcgVm0oY2xlYW5OYW1lLCB7X2FwcDogdGhpc30sIG51bGwsIGRhdGEsIHtcbiAgICAnaG9vazpyZWFkeSc6ICgpID0+IHtcbiAgICAgIHBlcmYuZW5kKCdjcmVhdGUgdm0nLCBjbGVhbk5hbWUpXG4gICAgfVxuICB9KVxufVxuXG4vKipcbiAqIEBkZXByZWNhdGVkXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3Rlcih0eXBlLCBvcHRpb25zKSB7XG4gIHBlcmYuc3RhcnQoJ3JlZ2lzdGVyJywgdHlwZSlcbiAgdGhpcy5yZWdpc3RlckNvbXBvbmVudCh0eXBlLCBvcHRpb25zKVxuICBwZXJmLmVuZCgncmVnaXN0ZXInLCB0eXBlKVxufVxuXG4vKipcbiAqIEBkZXByZWNhdGVkXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXIodHlwZSwgZGF0YSkge1xuICByZXR1cm4gdGhpcy5ib290c3RyYXAodHlwZSwge30sIGRhdGEpXG59XG5cbi8qKlxuICogQGRlcHJlY2F0ZWRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlcXVpcmUodHlwZSkge1xuICByZXR1cm4gKGRhdGEpID0+IHtcbiAgICByZXR1cm4gdGhpcy5ib290c3RyYXAodHlwZSwge30sIGRhdGEpXG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vbGliL2FwcC9idW5kbGUuanNcbiAqKi8iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBTZW1WZXI7XG5cbi8vIFRoZSBkZWJ1ZyBmdW5jdGlvbiBpcyBleGNsdWRlZCBlbnRpcmVseSBmcm9tIHRoZSBtaW5pZmllZCB2ZXJzaW9uLlxuLyogbm9taW4gKi8gdmFyIGRlYnVnO1xuLyogbm9taW4gKi8gaWYgKHR5cGVvZiBwcm9jZXNzID09PSAnb2JqZWN0JyAmJlxuICAgIC8qIG5vbWluICovIHByb2Nlc3MuZW52ICYmXG4gICAgLyogbm9taW4gKi8gcHJvY2Vzcy5lbnYuTk9ERV9ERUJVRyAmJlxuICAgIC8qIG5vbWluICovIC9cXGJzZW12ZXJcXGIvaS50ZXN0KHByb2Nlc3MuZW52Lk5PREVfREVCVUcpKVxuICAvKiBub21pbiAqLyBkZWJ1ZyA9IGZ1bmN0aW9uKCkge1xuICAgIC8qIG5vbWluICovIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcbiAgICAvKiBub21pbiAqLyBhcmdzLnVuc2hpZnQoJ1NFTVZFUicpO1xuICAgIC8qIG5vbWluICovIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIGFyZ3MpO1xuICAgIC8qIG5vbWluICovIH07XG4vKiBub21pbiAqLyBlbHNlXG4gIC8qIG5vbWluICovIGRlYnVnID0gZnVuY3Rpb24oKSB7fTtcblxuLy8gTm90ZTogdGhpcyBpcyB0aGUgc2VtdmVyLm9yZyB2ZXJzaW9uIG9mIHRoZSBzcGVjIHRoYXQgaXQgaW1wbGVtZW50c1xuLy8gTm90IG5lY2Vzc2FyaWx5IHRoZSBwYWNrYWdlIHZlcnNpb24gb2YgdGhpcyBjb2RlLlxuZXhwb3J0cy5TRU1WRVJfU1BFQ19WRVJTSU9OID0gJzIuMC4wJztcblxudmFyIE1BWF9MRU5HVEggPSAyNTY7XG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSIHx8IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8vIFRoZSBhY3R1YWwgcmVnZXhwcyBnbyBvbiBleHBvcnRzLnJlXG52YXIgcmUgPSBleHBvcnRzLnJlID0gW107XG52YXIgc3JjID0gZXhwb3J0cy5zcmMgPSBbXTtcbnZhciBSID0gMDtcblxuLy8gVGhlIGZvbGxvd2luZyBSZWd1bGFyIEV4cHJlc3Npb25zIGNhbiBiZSB1c2VkIGZvciB0b2tlbml6aW5nLFxuLy8gdmFsaWRhdGluZywgYW5kIHBhcnNpbmcgU2VtVmVyIHZlcnNpb24gc3RyaW5ncy5cblxuLy8gIyMgTnVtZXJpYyBJZGVudGlmaWVyXG4vLyBBIHNpbmdsZSBgMGAsIG9yIGEgbm9uLXplcm8gZGlnaXQgZm9sbG93ZWQgYnkgemVybyBvciBtb3JlIGRpZ2l0cy5cblxudmFyIE5VTUVSSUNJREVOVElGSUVSID0gUisrO1xuc3JjW05VTUVSSUNJREVOVElGSUVSXSA9ICcwfFsxLTldXFxcXGQqJztcbnZhciBOVU1FUklDSURFTlRJRklFUkxPT1NFID0gUisrO1xuc3JjW05VTUVSSUNJREVOVElGSUVSTE9PU0VdID0gJ1swLTldKyc7XG5cblxuLy8gIyMgTm9uLW51bWVyaWMgSWRlbnRpZmllclxuLy8gWmVybyBvciBtb3JlIGRpZ2l0cywgZm9sbG93ZWQgYnkgYSBsZXR0ZXIgb3IgaHlwaGVuLCBhbmQgdGhlbiB6ZXJvIG9yXG4vLyBtb3JlIGxldHRlcnMsIGRpZ2l0cywgb3IgaHlwaGVucy5cblxudmFyIE5PTk5VTUVSSUNJREVOVElGSUVSID0gUisrO1xuc3JjW05PTk5VTUVSSUNJREVOVElGSUVSXSA9ICdcXFxcZCpbYS16QS1aLV1bYS16QS1aMC05LV0qJztcblxuXG4vLyAjIyBNYWluIFZlcnNpb25cbi8vIFRocmVlIGRvdC1zZXBhcmF0ZWQgbnVtZXJpYyBpZGVudGlmaWVycy5cblxudmFyIE1BSU5WRVJTSU9OID0gUisrO1xuc3JjW01BSU5WRVJTSU9OXSA9ICcoJyArIHNyY1tOVU1FUklDSURFTlRJRklFUl0gKyAnKVxcXFwuJyArXG4gICAgICAgICAgICAgICAgICAgJygnICsgc3JjW05VTUVSSUNJREVOVElGSUVSXSArICcpXFxcXC4nICtcbiAgICAgICAgICAgICAgICAgICAnKCcgKyBzcmNbTlVNRVJJQ0lERU5USUZJRVJdICsgJyknO1xuXG52YXIgTUFJTlZFUlNJT05MT09TRSA9IFIrKztcbnNyY1tNQUlOVkVSU0lPTkxPT1NFXSA9ICcoJyArIHNyY1tOVU1FUklDSURFTlRJRklFUkxPT1NFXSArICcpXFxcXC4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICcoJyArIHNyY1tOVU1FUklDSURFTlRJRklFUkxPT1NFXSArICcpXFxcXC4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICcoJyArIHNyY1tOVU1FUklDSURFTlRJRklFUkxPT1NFXSArICcpJztcblxuLy8gIyMgUHJlLXJlbGVhc2UgVmVyc2lvbiBJZGVudGlmaWVyXG4vLyBBIG51bWVyaWMgaWRlbnRpZmllciwgb3IgYSBub24tbnVtZXJpYyBpZGVudGlmaWVyLlxuXG52YXIgUFJFUkVMRUFTRUlERU5USUZJRVIgPSBSKys7XG5zcmNbUFJFUkVMRUFTRUlERU5USUZJRVJdID0gJyg/OicgKyBzcmNbTlVNRVJJQ0lERU5USUZJRVJdICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnfCcgKyBzcmNbTk9OTlVNRVJJQ0lERU5USUZJRVJdICsgJyknO1xuXG52YXIgUFJFUkVMRUFTRUlERU5USUZJRVJMT09TRSA9IFIrKztcbnNyY1tQUkVSRUxFQVNFSURFTlRJRklFUkxPT1NFXSA9ICcoPzonICsgc3JjW05VTUVSSUNJREVOVElGSUVSTE9PU0VdICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd8JyArIHNyY1tOT05OVU1FUklDSURFTlRJRklFUl0gKyAnKSc7XG5cblxuLy8gIyMgUHJlLXJlbGVhc2UgVmVyc2lvblxuLy8gSHlwaGVuLCBmb2xsb3dlZCBieSBvbmUgb3IgbW9yZSBkb3Qtc2VwYXJhdGVkIHByZS1yZWxlYXNlIHZlcnNpb25cbi8vIGlkZW50aWZpZXJzLlxuXG52YXIgUFJFUkVMRUFTRSA9IFIrKztcbnNyY1tQUkVSRUxFQVNFXSA9ICcoPzotKCcgKyBzcmNbUFJFUkVMRUFTRUlERU5USUZJRVJdICtcbiAgICAgICAgICAgICAgICAgICcoPzpcXFxcLicgKyBzcmNbUFJFUkVMRUFTRUlERU5USUZJRVJdICsgJykqKSknO1xuXG52YXIgUFJFUkVMRUFTRUxPT1NFID0gUisrO1xuc3JjW1BSRVJFTEVBU0VMT09TRV0gPSAnKD86LT8oJyArIHNyY1tQUkVSRUxFQVNFSURFTlRJRklFUkxPT1NFXSArXG4gICAgICAgICAgICAgICAgICAgICAgICcoPzpcXFxcLicgKyBzcmNbUFJFUkVMRUFTRUlERU5USUZJRVJMT09TRV0gKyAnKSopKSc7XG5cbi8vICMjIEJ1aWxkIE1ldGFkYXRhIElkZW50aWZpZXJcbi8vIEFueSBjb21iaW5hdGlvbiBvZiBkaWdpdHMsIGxldHRlcnMsIG9yIGh5cGhlbnMuXG5cbnZhciBCVUlMRElERU5USUZJRVIgPSBSKys7XG5zcmNbQlVJTERJREVOVElGSUVSXSA9ICdbMC05QS1aYS16LV0rJztcblxuLy8gIyMgQnVpbGQgTWV0YWRhdGFcbi8vIFBsdXMgc2lnbiwgZm9sbG93ZWQgYnkgb25lIG9yIG1vcmUgcGVyaW9kLXNlcGFyYXRlZCBidWlsZCBtZXRhZGF0YVxuLy8gaWRlbnRpZmllcnMuXG5cbnZhciBCVUlMRCA9IFIrKztcbnNyY1tCVUlMRF0gPSAnKD86XFxcXCsoJyArIHNyY1tCVUlMRElERU5USUZJRVJdICtcbiAgICAgICAgICAgICAnKD86XFxcXC4nICsgc3JjW0JVSUxESURFTlRJRklFUl0gKyAnKSopKSc7XG5cblxuLy8gIyMgRnVsbCBWZXJzaW9uIFN0cmluZ1xuLy8gQSBtYWluIHZlcnNpb24sIGZvbGxvd2VkIG9wdGlvbmFsbHkgYnkgYSBwcmUtcmVsZWFzZSB2ZXJzaW9uIGFuZFxuLy8gYnVpbGQgbWV0YWRhdGEuXG5cbi8vIE5vdGUgdGhhdCB0aGUgb25seSBtYWpvciwgbWlub3IsIHBhdGNoLCBhbmQgcHJlLXJlbGVhc2Ugc2VjdGlvbnMgb2Zcbi8vIHRoZSB2ZXJzaW9uIHN0cmluZyBhcmUgY2FwdHVyaW5nIGdyb3Vwcy4gIFRoZSBidWlsZCBtZXRhZGF0YSBpcyBub3QgYVxuLy8gY2FwdHVyaW5nIGdyb3VwLCBiZWNhdXNlIGl0IHNob3VsZCBub3QgZXZlciBiZSB1c2VkIGluIHZlcnNpb25cbi8vIGNvbXBhcmlzb24uXG5cbnZhciBGVUxMID0gUisrO1xudmFyIEZVTExQTEFJTiA9ICd2PycgKyBzcmNbTUFJTlZFUlNJT05dICtcbiAgICAgICAgICAgICAgICBzcmNbUFJFUkVMRUFTRV0gKyAnPycgK1xuICAgICAgICAgICAgICAgIHNyY1tCVUlMRF0gKyAnPyc7XG5cbnNyY1tGVUxMXSA9ICdeJyArIEZVTExQTEFJTiArICckJztcblxuLy8gbGlrZSBmdWxsLCBidXQgYWxsb3dzIHYxLjIuMyBhbmQgPTEuMi4zLCB3aGljaCBwZW9wbGUgZG8gc29tZXRpbWVzLlxuLy8gYWxzbywgMS4wLjBhbHBoYTEgKHByZXJlbGVhc2Ugd2l0aG91dCB0aGUgaHlwaGVuKSB3aGljaCBpcyBwcmV0dHlcbi8vIGNvbW1vbiBpbiB0aGUgbnBtIHJlZ2lzdHJ5LlxudmFyIExPT1NFUExBSU4gPSAnW3Y9XFxcXHNdKicgKyBzcmNbTUFJTlZFUlNJT05MT09TRV0gK1xuICAgICAgICAgICAgICAgICBzcmNbUFJFUkVMRUFTRUxPT1NFXSArICc/JyArXG4gICAgICAgICAgICAgICAgIHNyY1tCVUlMRF0gKyAnPyc7XG5cbnZhciBMT09TRSA9IFIrKztcbnNyY1tMT09TRV0gPSAnXicgKyBMT09TRVBMQUlOICsgJyQnO1xuXG52YXIgR1RMVCA9IFIrKztcbnNyY1tHVExUXSA9ICcoKD86PHw+KT89PyknO1xuXG4vLyBTb21ldGhpbmcgbGlrZSBcIjIuKlwiIG9yIFwiMS4yLnhcIi5cbi8vIE5vdGUgdGhhdCBcIngueFwiIGlzIGEgdmFsaWQgeFJhbmdlIGlkZW50aWZlciwgbWVhbmluZyBcImFueSB2ZXJzaW9uXCJcbi8vIE9ubHkgdGhlIGZpcnN0IGl0ZW0gaXMgc3RyaWN0bHkgcmVxdWlyZWQuXG52YXIgWFJBTkdFSURFTlRJRklFUkxPT1NFID0gUisrO1xuc3JjW1hSQU5HRUlERU5USUZJRVJMT09TRV0gPSBzcmNbTlVNRVJJQ0lERU5USUZJRVJMT09TRV0gKyAnfHh8WHxcXFxcKic7XG52YXIgWFJBTkdFSURFTlRJRklFUiA9IFIrKztcbnNyY1tYUkFOR0VJREVOVElGSUVSXSA9IHNyY1tOVU1FUklDSURFTlRJRklFUl0gKyAnfHh8WHxcXFxcKic7XG5cbnZhciBYUkFOR0VQTEFJTiA9IFIrKztcbnNyY1tYUkFOR0VQTEFJTl0gPSAnW3Y9XFxcXHNdKignICsgc3JjW1hSQU5HRUlERU5USUZJRVJdICsgJyknICtcbiAgICAgICAgICAgICAgICAgICAnKD86XFxcXC4oJyArIHNyY1tYUkFOR0VJREVOVElGSUVSXSArICcpJyArXG4gICAgICAgICAgICAgICAgICAgJyg/OlxcXFwuKCcgKyBzcmNbWFJBTkdFSURFTlRJRklFUl0gKyAnKScgK1xuICAgICAgICAgICAgICAgICAgICcoPzonICsgc3JjW1BSRVJFTEVBU0VdICsgJyk/JyArXG4gICAgICAgICAgICAgICAgICAgc3JjW0JVSUxEXSArICc/JyArXG4gICAgICAgICAgICAgICAgICAgJyk/KT8nO1xuXG52YXIgWFJBTkdFUExBSU5MT09TRSA9IFIrKztcbnNyY1tYUkFOR0VQTEFJTkxPT1NFXSA9ICdbdj1cXFxcc10qKCcgKyBzcmNbWFJBTkdFSURFTlRJRklFUkxPT1NFXSArICcpJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnKD86XFxcXC4oJyArIHNyY1tYUkFOR0VJREVOVElGSUVSTE9PU0VdICsgJyknICtcbiAgICAgICAgICAgICAgICAgICAgICAgICcoPzpcXFxcLignICsgc3JjW1hSQU5HRUlERU5USUZJRVJMT09TRV0gKyAnKScgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJyg/OicgKyBzcmNbUFJFUkVMRUFTRUxPT1NFXSArICcpPycgK1xuICAgICAgICAgICAgICAgICAgICAgICAgc3JjW0JVSUxEXSArICc/JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnKT8pPyc7XG5cbnZhciBYUkFOR0UgPSBSKys7XG5zcmNbWFJBTkdFXSA9ICdeJyArIHNyY1tHVExUXSArICdcXFxccyonICsgc3JjW1hSQU5HRVBMQUlOXSArICckJztcbnZhciBYUkFOR0VMT09TRSA9IFIrKztcbnNyY1tYUkFOR0VMT09TRV0gPSAnXicgKyBzcmNbR1RMVF0gKyAnXFxcXHMqJyArIHNyY1tYUkFOR0VQTEFJTkxPT1NFXSArICckJztcblxuLy8gVGlsZGUgcmFuZ2VzLlxuLy8gTWVhbmluZyBpcyBcInJlYXNvbmFibHkgYXQgb3IgZ3JlYXRlciB0aGFuXCJcbnZhciBMT05FVElMREUgPSBSKys7XG5zcmNbTE9ORVRJTERFXSA9ICcoPzp+Pj8pJztcblxudmFyIFRJTERFVFJJTSA9IFIrKztcbnNyY1tUSUxERVRSSU1dID0gJyhcXFxccyopJyArIHNyY1tMT05FVElMREVdICsgJ1xcXFxzKyc7XG5yZVtUSUxERVRSSU1dID0gbmV3IFJlZ0V4cChzcmNbVElMREVUUklNXSwgJ2cnKTtcbnZhciB0aWxkZVRyaW1SZXBsYWNlID0gJyQxfic7XG5cbnZhciBUSUxERSA9IFIrKztcbnNyY1tUSUxERV0gPSAnXicgKyBzcmNbTE9ORVRJTERFXSArIHNyY1tYUkFOR0VQTEFJTl0gKyAnJCc7XG52YXIgVElMREVMT09TRSA9IFIrKztcbnNyY1tUSUxERUxPT1NFXSA9ICdeJyArIHNyY1tMT05FVElMREVdICsgc3JjW1hSQU5HRVBMQUlOTE9PU0VdICsgJyQnO1xuXG4vLyBDYXJldCByYW5nZXMuXG4vLyBNZWFuaW5nIGlzIFwiYXQgbGVhc3QgYW5kIGJhY2t3YXJkcyBjb21wYXRpYmxlIHdpdGhcIlxudmFyIExPTkVDQVJFVCA9IFIrKztcbnNyY1tMT05FQ0FSRVRdID0gJyg/OlxcXFxeKSc7XG5cbnZhciBDQVJFVFRSSU0gPSBSKys7XG5zcmNbQ0FSRVRUUklNXSA9ICcoXFxcXHMqKScgKyBzcmNbTE9ORUNBUkVUXSArICdcXFxccysnO1xucmVbQ0FSRVRUUklNXSA9IG5ldyBSZWdFeHAoc3JjW0NBUkVUVFJJTV0sICdnJyk7XG52YXIgY2FyZXRUcmltUmVwbGFjZSA9ICckMV4nO1xuXG52YXIgQ0FSRVQgPSBSKys7XG5zcmNbQ0FSRVRdID0gJ14nICsgc3JjW0xPTkVDQVJFVF0gKyBzcmNbWFJBTkdFUExBSU5dICsgJyQnO1xudmFyIENBUkVUTE9PU0UgPSBSKys7XG5zcmNbQ0FSRVRMT09TRV0gPSAnXicgKyBzcmNbTE9ORUNBUkVUXSArIHNyY1tYUkFOR0VQTEFJTkxPT1NFXSArICckJztcblxuLy8gQSBzaW1wbGUgZ3QvbHQvZXEgdGhpbmcsIG9yIGp1c3QgXCJcIiB0byBpbmRpY2F0ZSBcImFueSB2ZXJzaW9uXCJcbnZhciBDT01QQVJBVE9STE9PU0UgPSBSKys7XG5zcmNbQ09NUEFSQVRPUkxPT1NFXSA9ICdeJyArIHNyY1tHVExUXSArICdcXFxccyooJyArIExPT1NFUExBSU4gKyAnKSR8XiQnO1xudmFyIENPTVBBUkFUT1IgPSBSKys7XG5zcmNbQ09NUEFSQVRPUl0gPSAnXicgKyBzcmNbR1RMVF0gKyAnXFxcXHMqKCcgKyBGVUxMUExBSU4gKyAnKSR8XiQnO1xuXG5cbi8vIEFuIGV4cHJlc3Npb24gdG8gc3RyaXAgYW55IHdoaXRlc3BhY2UgYmV0d2VlbiB0aGUgZ3RsdCBhbmQgdGhlIHRoaW5nXG4vLyBpdCBtb2RpZmllcywgc28gdGhhdCBgPiAxLjIuM2AgPT0+IGA+MS4yLjNgXG52YXIgQ09NUEFSQVRPUlRSSU0gPSBSKys7XG5zcmNbQ09NUEFSQVRPUlRSSU1dID0gJyhcXFxccyopJyArIHNyY1tHVExUXSArXG4gICAgICAgICAgICAgICAgICAgICAgJ1xcXFxzKignICsgTE9PU0VQTEFJTiArICd8JyArIHNyY1tYUkFOR0VQTEFJTl0gKyAnKSc7XG5cbi8vIHRoaXMgb25lIGhhcyB0byB1c2UgdGhlIC9nIGZsYWdcbnJlW0NPTVBBUkFUT1JUUklNXSA9IG5ldyBSZWdFeHAoc3JjW0NPTVBBUkFUT1JUUklNXSwgJ2cnKTtcbnZhciBjb21wYXJhdG9yVHJpbVJlcGxhY2UgPSAnJDEkMiQzJztcblxuXG4vLyBTb21ldGhpbmcgbGlrZSBgMS4yLjMgLSAxLjIuNGBcbi8vIE5vdGUgdGhhdCB0aGVzZSBhbGwgdXNlIHRoZSBsb29zZSBmb3JtLCBiZWNhdXNlIHRoZXknbGwgYmVcbi8vIGNoZWNrZWQgYWdhaW5zdCBlaXRoZXIgdGhlIHN0cmljdCBvciBsb29zZSBjb21wYXJhdG9yIGZvcm1cbi8vIGxhdGVyLlxudmFyIEhZUEhFTlJBTkdFID0gUisrO1xuc3JjW0hZUEhFTlJBTkdFXSA9ICdeXFxcXHMqKCcgKyBzcmNbWFJBTkdFUExBSU5dICsgJyknICtcbiAgICAgICAgICAgICAgICAgICAnXFxcXHMrLVxcXFxzKycgK1xuICAgICAgICAgICAgICAgICAgICcoJyArIHNyY1tYUkFOR0VQTEFJTl0gKyAnKScgK1xuICAgICAgICAgICAgICAgICAgICdcXFxccyokJztcblxudmFyIEhZUEhFTlJBTkdFTE9PU0UgPSBSKys7XG5zcmNbSFlQSEVOUkFOR0VMT09TRV0gPSAnXlxcXFxzKignICsgc3JjW1hSQU5HRVBMQUlOTE9PU0VdICsgJyknICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdcXFxccystXFxcXHMrJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnKCcgKyBzcmNbWFJBTkdFUExBSU5MT09TRV0gKyAnKScgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ1xcXFxzKiQnO1xuXG4vLyBTdGFyIHJhbmdlcyBiYXNpY2FsbHkganVzdCBhbGxvdyBhbnl0aGluZyBhdCBhbGwuXG52YXIgU1RBUiA9IFIrKztcbnNyY1tTVEFSXSA9ICcoPHw+KT89P1xcXFxzKlxcXFwqJztcblxuLy8gQ29tcGlsZSB0byBhY3R1YWwgcmVnZXhwIG9iamVjdHMuXG4vLyBBbGwgYXJlIGZsYWctZnJlZSwgdW5sZXNzIHRoZXkgd2VyZSBjcmVhdGVkIGFib3ZlIHdpdGggYSBmbGFnLlxuZm9yICh2YXIgaSA9IDA7IGkgPCBSOyBpKyspIHtcbiAgZGVidWcoaSwgc3JjW2ldKTtcbiAgaWYgKCFyZVtpXSlcbiAgICByZVtpXSA9IG5ldyBSZWdFeHAoc3JjW2ldKTtcbn1cblxuZXhwb3J0cy5wYXJzZSA9IHBhcnNlO1xuZnVuY3Rpb24gcGFyc2UodmVyc2lvbiwgbG9vc2UpIHtcbiAgaWYgKHZlcnNpb24gaW5zdGFuY2VvZiBTZW1WZXIpXG4gICAgcmV0dXJuIHZlcnNpb247XG5cbiAgaWYgKHR5cGVvZiB2ZXJzaW9uICE9PSAnc3RyaW5nJylcbiAgICByZXR1cm4gbnVsbDtcblxuICBpZiAodmVyc2lvbi5sZW5ndGggPiBNQVhfTEVOR1RIKVxuICAgIHJldHVybiBudWxsO1xuXG4gIHZhciByID0gbG9vc2UgPyByZVtMT09TRV0gOiByZVtGVUxMXTtcbiAgaWYgKCFyLnRlc3QodmVyc2lvbikpXG4gICAgcmV0dXJuIG51bGw7XG5cbiAgdHJ5IHtcbiAgICByZXR1cm4gbmV3IFNlbVZlcih2ZXJzaW9uLCBsb29zZSk7XG4gIH0gY2F0Y2ggKGVyKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuZXhwb3J0cy52YWxpZCA9IHZhbGlkO1xuZnVuY3Rpb24gdmFsaWQodmVyc2lvbiwgbG9vc2UpIHtcbiAgdmFyIHYgPSBwYXJzZSh2ZXJzaW9uLCBsb29zZSk7XG4gIHJldHVybiB2ID8gdi52ZXJzaW9uIDogbnVsbDtcbn1cblxuXG5leHBvcnRzLmNsZWFuID0gY2xlYW47XG5mdW5jdGlvbiBjbGVhbih2ZXJzaW9uLCBsb29zZSkge1xuICB2YXIgcyA9IHBhcnNlKHZlcnNpb24udHJpbSgpLnJlcGxhY2UoL15bPXZdKy8sICcnKSwgbG9vc2UpO1xuICByZXR1cm4gcyA/IHMudmVyc2lvbiA6IG51bGw7XG59XG5cbmV4cG9ydHMuU2VtVmVyID0gU2VtVmVyO1xuXG5mdW5jdGlvbiBTZW1WZXIodmVyc2lvbiwgbG9vc2UpIHtcbiAgaWYgKHZlcnNpb24gaW5zdGFuY2VvZiBTZW1WZXIpIHtcbiAgICBpZiAodmVyc2lvbi5sb29zZSA9PT0gbG9vc2UpXG4gICAgICByZXR1cm4gdmVyc2lvbjtcbiAgICBlbHNlXG4gICAgICB2ZXJzaW9uID0gdmVyc2lvbi52ZXJzaW9uO1xuICB9IGVsc2UgaWYgKHR5cGVvZiB2ZXJzaW9uICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgVmVyc2lvbjogJyArIHZlcnNpb24pO1xuICB9XG5cbiAgaWYgKHZlcnNpb24ubGVuZ3RoID4gTUFYX0xFTkdUSClcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCd2ZXJzaW9uIGlzIGxvbmdlciB0aGFuICcgKyBNQVhfTEVOR1RIICsgJyBjaGFyYWN0ZXJzJylcblxuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgU2VtVmVyKSlcbiAgICByZXR1cm4gbmV3IFNlbVZlcih2ZXJzaW9uLCBsb29zZSk7XG5cbiAgZGVidWcoJ1NlbVZlcicsIHZlcnNpb24sIGxvb3NlKTtcbiAgdGhpcy5sb29zZSA9IGxvb3NlO1xuICB2YXIgbSA9IHZlcnNpb24udHJpbSgpLm1hdGNoKGxvb3NlID8gcmVbTE9PU0VdIDogcmVbRlVMTF0pO1xuXG4gIGlmICghbSlcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIFZlcnNpb246ICcgKyB2ZXJzaW9uKTtcblxuICB0aGlzLnJhdyA9IHZlcnNpb247XG5cbiAgLy8gdGhlc2UgYXJlIGFjdHVhbGx5IG51bWJlcnNcbiAgdGhpcy5tYWpvciA9ICttWzFdO1xuICB0aGlzLm1pbm9yID0gK21bMl07XG4gIHRoaXMucGF0Y2ggPSArbVszXTtcblxuICBpZiAodGhpcy5tYWpvciA+IE1BWF9TQUZFX0lOVEVHRVIgfHwgdGhpcy5tYWpvciA8IDApXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBtYWpvciB2ZXJzaW9uJylcblxuICBpZiAodGhpcy5taW5vciA+IE1BWF9TQUZFX0lOVEVHRVIgfHwgdGhpcy5taW5vciA8IDApXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBtaW5vciB2ZXJzaW9uJylcblxuICBpZiAodGhpcy5wYXRjaCA+IE1BWF9TQUZFX0lOVEVHRVIgfHwgdGhpcy5wYXRjaCA8IDApXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBwYXRjaCB2ZXJzaW9uJylcblxuICAvLyBudW1iZXJpZnkgYW55IHByZXJlbGVhc2UgbnVtZXJpYyBpZHNcbiAgaWYgKCFtWzRdKVxuICAgIHRoaXMucHJlcmVsZWFzZSA9IFtdO1xuICBlbHNlXG4gICAgdGhpcy5wcmVyZWxlYXNlID0gbVs0XS5zcGxpdCgnLicpLm1hcChmdW5jdGlvbihpZCkge1xuICAgICAgaWYgKC9eWzAtOV0rJC8udGVzdChpZCkpIHtcbiAgICAgICAgdmFyIG51bSA9ICtpZFxuICAgICAgICBpZiAobnVtID49IDAgJiYgbnVtIDwgTUFYX1NBRkVfSU5URUdFUilcbiAgICAgICAgICByZXR1cm4gbnVtXG4gICAgICB9XG4gICAgICByZXR1cm4gaWQ7XG4gICAgfSk7XG5cbiAgdGhpcy5idWlsZCA9IG1bNV0gPyBtWzVdLnNwbGl0KCcuJykgOiBbXTtcbiAgdGhpcy5mb3JtYXQoKTtcbn1cblxuU2VtVmVyLnByb3RvdHlwZS5mb3JtYXQgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy52ZXJzaW9uID0gdGhpcy5tYWpvciArICcuJyArIHRoaXMubWlub3IgKyAnLicgKyB0aGlzLnBhdGNoO1xuICBpZiAodGhpcy5wcmVyZWxlYXNlLmxlbmd0aClcbiAgICB0aGlzLnZlcnNpb24gKz0gJy0nICsgdGhpcy5wcmVyZWxlYXNlLmpvaW4oJy4nKTtcbiAgcmV0dXJuIHRoaXMudmVyc2lvbjtcbn07XG5cblNlbVZlci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMudmVyc2lvbjtcbn07XG5cblNlbVZlci5wcm90b3R5cGUuY29tcGFyZSA9IGZ1bmN0aW9uKG90aGVyKSB7XG4gIGRlYnVnKCdTZW1WZXIuY29tcGFyZScsIHRoaXMudmVyc2lvbiwgdGhpcy5sb29zZSwgb3RoZXIpO1xuICBpZiAoIShvdGhlciBpbnN0YW5jZW9mIFNlbVZlcikpXG4gICAgb3RoZXIgPSBuZXcgU2VtVmVyKG90aGVyLCB0aGlzLmxvb3NlKTtcblxuICByZXR1cm4gdGhpcy5jb21wYXJlTWFpbihvdGhlcikgfHwgdGhpcy5jb21wYXJlUHJlKG90aGVyKTtcbn07XG5cblNlbVZlci5wcm90b3R5cGUuY29tcGFyZU1haW4gPSBmdW5jdGlvbihvdGhlcikge1xuICBpZiAoIShvdGhlciBpbnN0YW5jZW9mIFNlbVZlcikpXG4gICAgb3RoZXIgPSBuZXcgU2VtVmVyKG90aGVyLCB0aGlzLmxvb3NlKTtcblxuICByZXR1cm4gY29tcGFyZUlkZW50aWZpZXJzKHRoaXMubWFqb3IsIG90aGVyLm1ham9yKSB8fFxuICAgICAgICAgY29tcGFyZUlkZW50aWZpZXJzKHRoaXMubWlub3IsIG90aGVyLm1pbm9yKSB8fFxuICAgICAgICAgY29tcGFyZUlkZW50aWZpZXJzKHRoaXMucGF0Y2gsIG90aGVyLnBhdGNoKTtcbn07XG5cblNlbVZlci5wcm90b3R5cGUuY29tcGFyZVByZSA9IGZ1bmN0aW9uKG90aGVyKSB7XG4gIGlmICghKG90aGVyIGluc3RhbmNlb2YgU2VtVmVyKSlcbiAgICBvdGhlciA9IG5ldyBTZW1WZXIob3RoZXIsIHRoaXMubG9vc2UpO1xuXG4gIC8vIE5PVCBoYXZpbmcgYSBwcmVyZWxlYXNlIGlzID4gaGF2aW5nIG9uZVxuICBpZiAodGhpcy5wcmVyZWxlYXNlLmxlbmd0aCAmJiAhb3RoZXIucHJlcmVsZWFzZS5sZW5ndGgpXG4gICAgcmV0dXJuIC0xO1xuICBlbHNlIGlmICghdGhpcy5wcmVyZWxlYXNlLmxlbmd0aCAmJiBvdGhlci5wcmVyZWxlYXNlLmxlbmd0aClcbiAgICByZXR1cm4gMTtcbiAgZWxzZSBpZiAoIXRoaXMucHJlcmVsZWFzZS5sZW5ndGggJiYgIW90aGVyLnByZXJlbGVhc2UubGVuZ3RoKVxuICAgIHJldHVybiAwO1xuXG4gIHZhciBpID0gMDtcbiAgZG8ge1xuICAgIHZhciBhID0gdGhpcy5wcmVyZWxlYXNlW2ldO1xuICAgIHZhciBiID0gb3RoZXIucHJlcmVsZWFzZVtpXTtcbiAgICBkZWJ1ZygncHJlcmVsZWFzZSBjb21wYXJlJywgaSwgYSwgYik7XG4gICAgaWYgKGEgPT09IHVuZGVmaW5lZCAmJiBiID09PSB1bmRlZmluZWQpXG4gICAgICByZXR1cm4gMDtcbiAgICBlbHNlIGlmIChiID09PSB1bmRlZmluZWQpXG4gICAgICByZXR1cm4gMTtcbiAgICBlbHNlIGlmIChhID09PSB1bmRlZmluZWQpXG4gICAgICByZXR1cm4gLTE7XG4gICAgZWxzZSBpZiAoYSA9PT0gYilcbiAgICAgIGNvbnRpbnVlO1xuICAgIGVsc2VcbiAgICAgIHJldHVybiBjb21wYXJlSWRlbnRpZmllcnMoYSwgYik7XG4gIH0gd2hpbGUgKCsraSk7XG59O1xuXG4vLyBwcmVtaW5vciB3aWxsIGJ1bXAgdGhlIHZlcnNpb24gdXAgdG8gdGhlIG5leHQgbWlub3IgcmVsZWFzZSwgYW5kIGltbWVkaWF0ZWx5XG4vLyBkb3duIHRvIHByZS1yZWxlYXNlLiBwcmVtYWpvciBhbmQgcHJlcGF0Y2ggd29yayB0aGUgc2FtZSB3YXkuXG5TZW1WZXIucHJvdG90eXBlLmluYyA9IGZ1bmN0aW9uKHJlbGVhc2UsIGlkZW50aWZpZXIpIHtcbiAgc3dpdGNoIChyZWxlYXNlKSB7XG4gICAgY2FzZSAncHJlbWFqb3InOlxuICAgICAgdGhpcy5wcmVyZWxlYXNlLmxlbmd0aCA9IDA7XG4gICAgICB0aGlzLnBhdGNoID0gMDtcbiAgICAgIHRoaXMubWlub3IgPSAwO1xuICAgICAgdGhpcy5tYWpvcisrO1xuICAgICAgdGhpcy5pbmMoJ3ByZScsIGlkZW50aWZpZXIpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAncHJlbWlub3InOlxuICAgICAgdGhpcy5wcmVyZWxlYXNlLmxlbmd0aCA9IDA7XG4gICAgICB0aGlzLnBhdGNoID0gMDtcbiAgICAgIHRoaXMubWlub3IrKztcbiAgICAgIHRoaXMuaW5jKCdwcmUnLCBpZGVudGlmaWVyKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3ByZXBhdGNoJzpcbiAgICAgIC8vIElmIHRoaXMgaXMgYWxyZWFkeSBhIHByZXJlbGVhc2UsIGl0IHdpbGwgYnVtcCB0byB0aGUgbmV4dCB2ZXJzaW9uXG4gICAgICAvLyBkcm9wIGFueSBwcmVyZWxlYXNlcyB0aGF0IG1pZ2h0IGFscmVhZHkgZXhpc3QsIHNpbmNlIHRoZXkgYXJlIG5vdFxuICAgICAgLy8gcmVsZXZhbnQgYXQgdGhpcyBwb2ludC5cbiAgICAgIHRoaXMucHJlcmVsZWFzZS5sZW5ndGggPSAwO1xuICAgICAgdGhpcy5pbmMoJ3BhdGNoJywgaWRlbnRpZmllcik7XG4gICAgICB0aGlzLmluYygncHJlJywgaWRlbnRpZmllcik7XG4gICAgICBicmVhaztcbiAgICAvLyBJZiB0aGUgaW5wdXQgaXMgYSBub24tcHJlcmVsZWFzZSB2ZXJzaW9uLCB0aGlzIGFjdHMgdGhlIHNhbWUgYXNcbiAgICAvLyBwcmVwYXRjaC5cbiAgICBjYXNlICdwcmVyZWxlYXNlJzpcbiAgICAgIGlmICh0aGlzLnByZXJlbGVhc2UubGVuZ3RoID09PSAwKVxuICAgICAgICB0aGlzLmluYygncGF0Y2gnLCBpZGVudGlmaWVyKTtcbiAgICAgIHRoaXMuaW5jKCdwcmUnLCBpZGVudGlmaWVyKTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAnbWFqb3InOlxuICAgICAgLy8gSWYgdGhpcyBpcyBhIHByZS1tYWpvciB2ZXJzaW9uLCBidW1wIHVwIHRvIHRoZSBzYW1lIG1ham9yIHZlcnNpb24uXG4gICAgICAvLyBPdGhlcndpc2UgaW5jcmVtZW50IG1ham9yLlxuICAgICAgLy8gMS4wLjAtNSBidW1wcyB0byAxLjAuMFxuICAgICAgLy8gMS4xLjAgYnVtcHMgdG8gMi4wLjBcbiAgICAgIGlmICh0aGlzLm1pbm9yICE9PSAwIHx8IHRoaXMucGF0Y2ggIT09IDAgfHwgdGhpcy5wcmVyZWxlYXNlLmxlbmd0aCA9PT0gMClcbiAgICAgICAgdGhpcy5tYWpvcisrO1xuICAgICAgdGhpcy5taW5vciA9IDA7XG4gICAgICB0aGlzLnBhdGNoID0gMDtcbiAgICAgIHRoaXMucHJlcmVsZWFzZSA9IFtdO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnbWlub3InOlxuICAgICAgLy8gSWYgdGhpcyBpcyBhIHByZS1taW5vciB2ZXJzaW9uLCBidW1wIHVwIHRvIHRoZSBzYW1lIG1pbm9yIHZlcnNpb24uXG4gICAgICAvLyBPdGhlcndpc2UgaW5jcmVtZW50IG1pbm9yLlxuICAgICAgLy8gMS4yLjAtNSBidW1wcyB0byAxLjIuMFxuICAgICAgLy8gMS4yLjEgYnVtcHMgdG8gMS4zLjBcbiAgICAgIGlmICh0aGlzLnBhdGNoICE9PSAwIHx8IHRoaXMucHJlcmVsZWFzZS5sZW5ndGggPT09IDApXG4gICAgICAgIHRoaXMubWlub3IrKztcbiAgICAgIHRoaXMucGF0Y2ggPSAwO1xuICAgICAgdGhpcy5wcmVyZWxlYXNlID0gW107XG4gICAgICBicmVhaztcbiAgICBjYXNlICdwYXRjaCc6XG4gICAgICAvLyBJZiB0aGlzIGlzIG5vdCBhIHByZS1yZWxlYXNlIHZlcnNpb24sIGl0IHdpbGwgaW5jcmVtZW50IHRoZSBwYXRjaC5cbiAgICAgIC8vIElmIGl0IGlzIGEgcHJlLXJlbGVhc2UgaXQgd2lsbCBidW1wIHVwIHRvIHRoZSBzYW1lIHBhdGNoIHZlcnNpb24uXG4gICAgICAvLyAxLjIuMC01IHBhdGNoZXMgdG8gMS4yLjBcbiAgICAgIC8vIDEuMi4wIHBhdGNoZXMgdG8gMS4yLjFcbiAgICAgIGlmICh0aGlzLnByZXJlbGVhc2UubGVuZ3RoID09PSAwKVxuICAgICAgICB0aGlzLnBhdGNoKys7XG4gICAgICB0aGlzLnByZXJlbGVhc2UgPSBbXTtcbiAgICAgIGJyZWFrO1xuICAgIC8vIFRoaXMgcHJvYmFibHkgc2hvdWxkbid0IGJlIHVzZWQgcHVibGljbHkuXG4gICAgLy8gMS4wLjAgXCJwcmVcIiB3b3VsZCBiZWNvbWUgMS4wLjAtMCB3aGljaCBpcyB0aGUgd3JvbmcgZGlyZWN0aW9uLlxuICAgIGNhc2UgJ3ByZSc6XG4gICAgICBpZiAodGhpcy5wcmVyZWxlYXNlLmxlbmd0aCA9PT0gMClcbiAgICAgICAgdGhpcy5wcmVyZWxlYXNlID0gWzBdO1xuICAgICAgZWxzZSB7XG4gICAgICAgIHZhciBpID0gdGhpcy5wcmVyZWxlYXNlLmxlbmd0aDtcbiAgICAgICAgd2hpbGUgKC0taSA+PSAwKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByZXJlbGVhc2VbaV0gPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICB0aGlzLnByZXJlbGVhc2VbaV0rKztcbiAgICAgICAgICAgIGkgPSAtMjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGkgPT09IC0xKSAvLyBkaWRuJ3QgaW5jcmVtZW50IGFueXRoaW5nXG4gICAgICAgICAgdGhpcy5wcmVyZWxlYXNlLnB1c2goMCk7XG4gICAgICB9XG4gICAgICBpZiAoaWRlbnRpZmllcikge1xuICAgICAgICAvLyAxLjIuMC1iZXRhLjEgYnVtcHMgdG8gMS4yLjAtYmV0YS4yLFxuICAgICAgICAvLyAxLjIuMC1iZXRhLmZvb2JseiBvciAxLjIuMC1iZXRhIGJ1bXBzIHRvIDEuMi4wLWJldGEuMFxuICAgICAgICBpZiAodGhpcy5wcmVyZWxlYXNlWzBdID09PSBpZGVudGlmaWVyKSB7XG4gICAgICAgICAgaWYgKGlzTmFOKHRoaXMucHJlcmVsZWFzZVsxXSkpXG4gICAgICAgICAgICB0aGlzLnByZXJlbGVhc2UgPSBbaWRlbnRpZmllciwgMF07XG4gICAgICAgIH0gZWxzZVxuICAgICAgICAgIHRoaXMucHJlcmVsZWFzZSA9IFtpZGVudGlmaWVyLCAwXTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBpbmNyZW1lbnQgYXJndW1lbnQ6ICcgKyByZWxlYXNlKTtcbiAgfVxuICB0aGlzLmZvcm1hdCgpO1xuICB0aGlzLnJhdyA9IHRoaXMudmVyc2lvbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5leHBvcnRzLmluYyA9IGluYztcbmZ1bmN0aW9uIGluYyh2ZXJzaW9uLCByZWxlYXNlLCBsb29zZSwgaWRlbnRpZmllcikge1xuICBpZiAodHlwZW9mKGxvb3NlKSA9PT0gJ3N0cmluZycpIHtcbiAgICBpZGVudGlmaWVyID0gbG9vc2U7XG4gICAgbG9vc2UgPSB1bmRlZmluZWQ7XG4gIH1cblxuICB0cnkge1xuICAgIHJldHVybiBuZXcgU2VtVmVyKHZlcnNpb24sIGxvb3NlKS5pbmMocmVsZWFzZSwgaWRlbnRpZmllcikudmVyc2lvbjtcbiAgfSBjYXRjaCAoZXIpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuXG5leHBvcnRzLmRpZmYgPSBkaWZmO1xuZnVuY3Rpb24gZGlmZih2ZXJzaW9uMSwgdmVyc2lvbjIpIHtcbiAgaWYgKGVxKHZlcnNpb24xLCB2ZXJzaW9uMikpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfSBlbHNlIHtcbiAgICB2YXIgdjEgPSBwYXJzZSh2ZXJzaW9uMSk7XG4gICAgdmFyIHYyID0gcGFyc2UodmVyc2lvbjIpO1xuICAgIGlmICh2MS5wcmVyZWxlYXNlLmxlbmd0aCB8fCB2Mi5wcmVyZWxlYXNlLmxlbmd0aCkge1xuICAgICAgZm9yICh2YXIga2V5IGluIHYxKSB7XG4gICAgICAgIGlmIChrZXkgPT09ICdtYWpvcicgfHwga2V5ID09PSAnbWlub3InIHx8IGtleSA9PT0gJ3BhdGNoJykge1xuICAgICAgICAgIGlmICh2MVtrZXldICE9PSB2MltrZXldKSB7XG4gICAgICAgICAgICByZXR1cm4gJ3ByZScra2V5O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuICdwcmVyZWxlYXNlJztcbiAgICB9XG4gICAgZm9yICh2YXIga2V5IGluIHYxKSB7XG4gICAgICBpZiAoa2V5ID09PSAnbWFqb3InIHx8IGtleSA9PT0gJ21pbm9yJyB8fCBrZXkgPT09ICdwYXRjaCcpIHtcbiAgICAgICAgaWYgKHYxW2tleV0gIT09IHYyW2tleV0pIHtcbiAgICAgICAgICByZXR1cm4ga2V5O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydHMuY29tcGFyZUlkZW50aWZpZXJzID0gY29tcGFyZUlkZW50aWZpZXJzO1xuXG52YXIgbnVtZXJpYyA9IC9eWzAtOV0rJC87XG5mdW5jdGlvbiBjb21wYXJlSWRlbnRpZmllcnMoYSwgYikge1xuICB2YXIgYW51bSA9IG51bWVyaWMudGVzdChhKTtcbiAgdmFyIGJudW0gPSBudW1lcmljLnRlc3QoYik7XG5cbiAgaWYgKGFudW0gJiYgYm51bSkge1xuICAgIGEgPSArYTtcbiAgICBiID0gK2I7XG4gIH1cblxuICByZXR1cm4gKGFudW0gJiYgIWJudW0pID8gLTEgOlxuICAgICAgICAgKGJudW0gJiYgIWFudW0pID8gMSA6XG4gICAgICAgICBhIDwgYiA/IC0xIDpcbiAgICAgICAgIGEgPiBiID8gMSA6XG4gICAgICAgICAwO1xufVxuXG5leHBvcnRzLnJjb21wYXJlSWRlbnRpZmllcnMgPSByY29tcGFyZUlkZW50aWZpZXJzO1xuZnVuY3Rpb24gcmNvbXBhcmVJZGVudGlmaWVycyhhLCBiKSB7XG4gIHJldHVybiBjb21wYXJlSWRlbnRpZmllcnMoYiwgYSk7XG59XG5cbmV4cG9ydHMubWFqb3IgPSBtYWpvcjtcbmZ1bmN0aW9uIG1ham9yKGEsIGxvb3NlKSB7XG4gIHJldHVybiBuZXcgU2VtVmVyKGEsIGxvb3NlKS5tYWpvcjtcbn1cblxuZXhwb3J0cy5taW5vciA9IG1pbm9yO1xuZnVuY3Rpb24gbWlub3IoYSwgbG9vc2UpIHtcbiAgcmV0dXJuIG5ldyBTZW1WZXIoYSwgbG9vc2UpLm1pbm9yO1xufVxuXG5leHBvcnRzLnBhdGNoID0gcGF0Y2g7XG5mdW5jdGlvbiBwYXRjaChhLCBsb29zZSkge1xuICByZXR1cm4gbmV3IFNlbVZlcihhLCBsb29zZSkucGF0Y2g7XG59XG5cbmV4cG9ydHMuY29tcGFyZSA9IGNvbXBhcmU7XG5mdW5jdGlvbiBjb21wYXJlKGEsIGIsIGxvb3NlKSB7XG4gIHJldHVybiBuZXcgU2VtVmVyKGEsIGxvb3NlKS5jb21wYXJlKGIpO1xufVxuXG5leHBvcnRzLmNvbXBhcmVMb29zZSA9IGNvbXBhcmVMb29zZTtcbmZ1bmN0aW9uIGNvbXBhcmVMb29zZShhLCBiKSB7XG4gIHJldHVybiBjb21wYXJlKGEsIGIsIHRydWUpO1xufVxuXG5leHBvcnRzLnJjb21wYXJlID0gcmNvbXBhcmU7XG5mdW5jdGlvbiByY29tcGFyZShhLCBiLCBsb29zZSkge1xuICByZXR1cm4gY29tcGFyZShiLCBhLCBsb29zZSk7XG59XG5cbmV4cG9ydHMuc29ydCA9IHNvcnQ7XG5mdW5jdGlvbiBzb3J0KGxpc3QsIGxvb3NlKSB7XG4gIHJldHVybiBsaXN0LnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgIHJldHVybiBleHBvcnRzLmNvbXBhcmUoYSwgYiwgbG9vc2UpO1xuICB9KTtcbn1cblxuZXhwb3J0cy5yc29ydCA9IHJzb3J0O1xuZnVuY3Rpb24gcnNvcnQobGlzdCwgbG9vc2UpIHtcbiAgcmV0dXJuIGxpc3Quc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgcmV0dXJuIGV4cG9ydHMucmNvbXBhcmUoYSwgYiwgbG9vc2UpO1xuICB9KTtcbn1cblxuZXhwb3J0cy5ndCA9IGd0O1xuZnVuY3Rpb24gZ3QoYSwgYiwgbG9vc2UpIHtcbiAgcmV0dXJuIGNvbXBhcmUoYSwgYiwgbG9vc2UpID4gMDtcbn1cblxuZXhwb3J0cy5sdCA9IGx0O1xuZnVuY3Rpb24gbHQoYSwgYiwgbG9vc2UpIHtcbiAgcmV0dXJuIGNvbXBhcmUoYSwgYiwgbG9vc2UpIDwgMDtcbn1cblxuZXhwb3J0cy5lcSA9IGVxO1xuZnVuY3Rpb24gZXEoYSwgYiwgbG9vc2UpIHtcbiAgcmV0dXJuIGNvbXBhcmUoYSwgYiwgbG9vc2UpID09PSAwO1xufVxuXG5leHBvcnRzLm5lcSA9IG5lcTtcbmZ1bmN0aW9uIG5lcShhLCBiLCBsb29zZSkge1xuICByZXR1cm4gY29tcGFyZShhLCBiLCBsb29zZSkgIT09IDA7XG59XG5cbmV4cG9ydHMuZ3RlID0gZ3RlO1xuZnVuY3Rpb24gZ3RlKGEsIGIsIGxvb3NlKSB7XG4gIHJldHVybiBjb21wYXJlKGEsIGIsIGxvb3NlKSA+PSAwO1xufVxuXG5leHBvcnRzLmx0ZSA9IGx0ZTtcbmZ1bmN0aW9uIGx0ZShhLCBiLCBsb29zZSkge1xuICByZXR1cm4gY29tcGFyZShhLCBiLCBsb29zZSkgPD0gMDtcbn1cblxuZXhwb3J0cy5jbXAgPSBjbXA7XG5mdW5jdGlvbiBjbXAoYSwgb3AsIGIsIGxvb3NlKSB7XG4gIHZhciByZXQ7XG4gIHN3aXRjaCAob3ApIHtcbiAgICBjYXNlICc9PT0nOlxuICAgICAgaWYgKHR5cGVvZiBhID09PSAnb2JqZWN0JykgYSA9IGEudmVyc2lvbjtcbiAgICAgIGlmICh0eXBlb2YgYiA9PT0gJ29iamVjdCcpIGIgPSBiLnZlcnNpb247XG4gICAgICByZXQgPSBhID09PSBiO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnIT09JzpcbiAgICAgIGlmICh0eXBlb2YgYSA9PT0gJ29iamVjdCcpIGEgPSBhLnZlcnNpb247XG4gICAgICBpZiAodHlwZW9mIGIgPT09ICdvYmplY3QnKSBiID0gYi52ZXJzaW9uO1xuICAgICAgcmV0ID0gYSAhPT0gYjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJyc6IGNhc2UgJz0nOiBjYXNlICc9PSc6IHJldCA9IGVxKGEsIGIsIGxvb3NlKTsgYnJlYWs7XG4gICAgY2FzZSAnIT0nOiByZXQgPSBuZXEoYSwgYiwgbG9vc2UpOyBicmVhaztcbiAgICBjYXNlICc+JzogcmV0ID0gZ3QoYSwgYiwgbG9vc2UpOyBicmVhaztcbiAgICBjYXNlICc+PSc6IHJldCA9IGd0ZShhLCBiLCBsb29zZSk7IGJyZWFrO1xuICAgIGNhc2UgJzwnOiByZXQgPSBsdChhLCBiLCBsb29zZSk7IGJyZWFrO1xuICAgIGNhc2UgJzw9JzogcmV0ID0gbHRlKGEsIGIsIGxvb3NlKTsgYnJlYWs7XG4gICAgZGVmYXVsdDogdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBvcGVyYXRvcjogJyArIG9wKTtcbiAgfVxuICByZXR1cm4gcmV0O1xufVxuXG5leHBvcnRzLkNvbXBhcmF0b3IgPSBDb21wYXJhdG9yO1xuZnVuY3Rpb24gQ29tcGFyYXRvcihjb21wLCBsb29zZSkge1xuICBpZiAoY29tcCBpbnN0YW5jZW9mIENvbXBhcmF0b3IpIHtcbiAgICBpZiAoY29tcC5sb29zZSA9PT0gbG9vc2UpXG4gICAgICByZXR1cm4gY29tcDtcbiAgICBlbHNlXG4gICAgICBjb21wID0gY29tcC52YWx1ZTtcbiAgfVxuXG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBDb21wYXJhdG9yKSlcbiAgICByZXR1cm4gbmV3IENvbXBhcmF0b3IoY29tcCwgbG9vc2UpO1xuXG4gIGRlYnVnKCdjb21wYXJhdG9yJywgY29tcCwgbG9vc2UpO1xuICB0aGlzLmxvb3NlID0gbG9vc2U7XG4gIHRoaXMucGFyc2UoY29tcCk7XG5cbiAgaWYgKHRoaXMuc2VtdmVyID09PSBBTlkpXG4gICAgdGhpcy52YWx1ZSA9ICcnO1xuICBlbHNlXG4gICAgdGhpcy52YWx1ZSA9IHRoaXMub3BlcmF0b3IgKyB0aGlzLnNlbXZlci52ZXJzaW9uO1xuXG4gIGRlYnVnKCdjb21wJywgdGhpcyk7XG59XG5cbnZhciBBTlkgPSB7fTtcbkNvbXBhcmF0b3IucHJvdG90eXBlLnBhcnNlID0gZnVuY3Rpb24oY29tcCkge1xuICB2YXIgciA9IHRoaXMubG9vc2UgPyByZVtDT01QQVJBVE9STE9PU0VdIDogcmVbQ09NUEFSQVRPUl07XG4gIHZhciBtID0gY29tcC5tYXRjaChyKTtcblxuICBpZiAoIW0pXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBjb21wYXJhdG9yOiAnICsgY29tcCk7XG5cbiAgdGhpcy5vcGVyYXRvciA9IG1bMV07XG4gIGlmICh0aGlzLm9wZXJhdG9yID09PSAnPScpXG4gICAgdGhpcy5vcGVyYXRvciA9ICcnO1xuXG4gIC8vIGlmIGl0IGxpdGVyYWxseSBpcyBqdXN0ICc+JyBvciAnJyB0aGVuIGFsbG93IGFueXRoaW5nLlxuICBpZiAoIW1bMl0pXG4gICAgdGhpcy5zZW12ZXIgPSBBTlk7XG4gIGVsc2VcbiAgICB0aGlzLnNlbXZlciA9IG5ldyBTZW1WZXIobVsyXSwgdGhpcy5sb29zZSk7XG59O1xuXG5Db21wYXJhdG9yLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy52YWx1ZTtcbn07XG5cbkNvbXBhcmF0b3IucHJvdG90eXBlLnRlc3QgPSBmdW5jdGlvbih2ZXJzaW9uKSB7XG4gIGRlYnVnKCdDb21wYXJhdG9yLnRlc3QnLCB2ZXJzaW9uLCB0aGlzLmxvb3NlKTtcblxuICBpZiAodGhpcy5zZW12ZXIgPT09IEFOWSlcbiAgICByZXR1cm4gdHJ1ZTtcblxuICBpZiAodHlwZW9mIHZlcnNpb24gPT09ICdzdHJpbmcnKVxuICAgIHZlcnNpb24gPSBuZXcgU2VtVmVyKHZlcnNpb24sIHRoaXMubG9vc2UpO1xuXG4gIHJldHVybiBjbXAodmVyc2lvbiwgdGhpcy5vcGVyYXRvciwgdGhpcy5zZW12ZXIsIHRoaXMubG9vc2UpO1xufTtcblxuXG5leHBvcnRzLlJhbmdlID0gUmFuZ2U7XG5mdW5jdGlvbiBSYW5nZShyYW5nZSwgbG9vc2UpIHtcbiAgaWYgKChyYW5nZSBpbnN0YW5jZW9mIFJhbmdlKSAmJiByYW5nZS5sb29zZSA9PT0gbG9vc2UpXG4gICAgcmV0dXJuIHJhbmdlO1xuXG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBSYW5nZSkpXG4gICAgcmV0dXJuIG5ldyBSYW5nZShyYW5nZSwgbG9vc2UpO1xuXG4gIHRoaXMubG9vc2UgPSBsb29zZTtcblxuICAvLyBGaXJzdCwgc3BsaXQgYmFzZWQgb24gYm9vbGVhbiBvciB8fFxuICB0aGlzLnJhdyA9IHJhbmdlO1xuICB0aGlzLnNldCA9IHJhbmdlLnNwbGl0KC9cXHMqXFx8XFx8XFxzKi8pLm1hcChmdW5jdGlvbihyYW5nZSkge1xuICAgIHJldHVybiB0aGlzLnBhcnNlUmFuZ2UocmFuZ2UudHJpbSgpKTtcbiAgfSwgdGhpcykuZmlsdGVyKGZ1bmN0aW9uKGMpIHtcbiAgICAvLyB0aHJvdyBvdXQgYW55IHRoYXQgYXJlIG5vdCByZWxldmFudCBmb3Igd2hhdGV2ZXIgcmVhc29uXG4gICAgcmV0dXJuIGMubGVuZ3RoO1xuICB9KTtcblxuICBpZiAoIXRoaXMuc2V0Lmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgU2VtVmVyIFJhbmdlOiAnICsgcmFuZ2UpO1xuICB9XG5cbiAgdGhpcy5mb3JtYXQoKTtcbn1cblxuUmFuZ2UucHJvdG90eXBlLmZvcm1hdCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnJhbmdlID0gdGhpcy5zZXQubWFwKGZ1bmN0aW9uKGNvbXBzKSB7XG4gICAgcmV0dXJuIGNvbXBzLmpvaW4oJyAnKS50cmltKCk7XG4gIH0pLmpvaW4oJ3x8JykudHJpbSgpO1xuICByZXR1cm4gdGhpcy5yYW5nZTtcbn07XG5cblJhbmdlLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5yYW5nZTtcbn07XG5cblJhbmdlLnByb3RvdHlwZS5wYXJzZVJhbmdlID0gZnVuY3Rpb24ocmFuZ2UpIHtcbiAgdmFyIGxvb3NlID0gdGhpcy5sb29zZTtcbiAgcmFuZ2UgPSByYW5nZS50cmltKCk7XG4gIGRlYnVnKCdyYW5nZScsIHJhbmdlLCBsb29zZSk7XG4gIC8vIGAxLjIuMyAtIDEuMi40YCA9PiBgPj0xLjIuMyA8PTEuMi40YFxuICB2YXIgaHIgPSBsb29zZSA/IHJlW0hZUEhFTlJBTkdFTE9PU0VdIDogcmVbSFlQSEVOUkFOR0VdO1xuICByYW5nZSA9IHJhbmdlLnJlcGxhY2UoaHIsIGh5cGhlblJlcGxhY2UpO1xuICBkZWJ1ZygnaHlwaGVuIHJlcGxhY2UnLCByYW5nZSk7XG4gIC8vIGA+IDEuMi4zIDwgMS4yLjVgID0+IGA+MS4yLjMgPDEuMi41YFxuICByYW5nZSA9IHJhbmdlLnJlcGxhY2UocmVbQ09NUEFSQVRPUlRSSU1dLCBjb21wYXJhdG9yVHJpbVJlcGxhY2UpO1xuICBkZWJ1ZygnY29tcGFyYXRvciB0cmltJywgcmFuZ2UsIHJlW0NPTVBBUkFUT1JUUklNXSk7XG5cbiAgLy8gYH4gMS4yLjNgID0+IGB+MS4yLjNgXG4gIHJhbmdlID0gcmFuZ2UucmVwbGFjZShyZVtUSUxERVRSSU1dLCB0aWxkZVRyaW1SZXBsYWNlKTtcblxuICAvLyBgXiAxLjIuM2AgPT4gYF4xLjIuM2BcbiAgcmFuZ2UgPSByYW5nZS5yZXBsYWNlKHJlW0NBUkVUVFJJTV0sIGNhcmV0VHJpbVJlcGxhY2UpO1xuXG4gIC8vIG5vcm1hbGl6ZSBzcGFjZXNcbiAgcmFuZ2UgPSByYW5nZS5zcGxpdCgvXFxzKy8pLmpvaW4oJyAnKTtcblxuICAvLyBBdCB0aGlzIHBvaW50LCB0aGUgcmFuZ2UgaXMgY29tcGxldGVseSB0cmltbWVkIGFuZFxuICAvLyByZWFkeSB0byBiZSBzcGxpdCBpbnRvIGNvbXBhcmF0b3JzLlxuXG4gIHZhciBjb21wUmUgPSBsb29zZSA/IHJlW0NPTVBBUkFUT1JMT09TRV0gOiByZVtDT01QQVJBVE9SXTtcbiAgdmFyIHNldCA9IHJhbmdlLnNwbGl0KCcgJykubWFwKGZ1bmN0aW9uKGNvbXApIHtcbiAgICByZXR1cm4gcGFyc2VDb21wYXJhdG9yKGNvbXAsIGxvb3NlKTtcbiAgfSkuam9pbignICcpLnNwbGl0KC9cXHMrLyk7XG4gIGlmICh0aGlzLmxvb3NlKSB7XG4gICAgLy8gaW4gbG9vc2UgbW9kZSwgdGhyb3cgb3V0IGFueSB0aGF0IGFyZSBub3QgdmFsaWQgY29tcGFyYXRvcnNcbiAgICBzZXQgPSBzZXQuZmlsdGVyKGZ1bmN0aW9uKGNvbXApIHtcbiAgICAgIHJldHVybiAhIWNvbXAubWF0Y2goY29tcFJlKTtcbiAgICB9KTtcbiAgfVxuICBzZXQgPSBzZXQubWFwKGZ1bmN0aW9uKGNvbXApIHtcbiAgICByZXR1cm4gbmV3IENvbXBhcmF0b3IoY29tcCwgbG9vc2UpO1xuICB9KTtcblxuICByZXR1cm4gc2V0O1xufTtcblxuLy8gTW9zdGx5IGp1c3QgZm9yIHRlc3RpbmcgYW5kIGxlZ2FjeSBBUEkgcmVhc29uc1xuZXhwb3J0cy50b0NvbXBhcmF0b3JzID0gdG9Db21wYXJhdG9ycztcbmZ1bmN0aW9uIHRvQ29tcGFyYXRvcnMocmFuZ2UsIGxvb3NlKSB7XG4gIHJldHVybiBuZXcgUmFuZ2UocmFuZ2UsIGxvb3NlKS5zZXQubWFwKGZ1bmN0aW9uKGNvbXApIHtcbiAgICByZXR1cm4gY29tcC5tYXAoZnVuY3Rpb24oYykge1xuICAgICAgcmV0dXJuIGMudmFsdWU7XG4gICAgfSkuam9pbignICcpLnRyaW0oKS5zcGxpdCgnICcpO1xuICB9KTtcbn1cblxuLy8gY29tcHJpc2VkIG9mIHhyYW5nZXMsIHRpbGRlcywgc3RhcnMsIGFuZCBndGx0J3MgYXQgdGhpcyBwb2ludC5cbi8vIGFscmVhZHkgcmVwbGFjZWQgdGhlIGh5cGhlbiByYW5nZXNcbi8vIHR1cm4gaW50byBhIHNldCBvZiBKVVNUIGNvbXBhcmF0b3JzLlxuZnVuY3Rpb24gcGFyc2VDb21wYXJhdG9yKGNvbXAsIGxvb3NlKSB7XG4gIGRlYnVnKCdjb21wJywgY29tcCk7XG4gIGNvbXAgPSByZXBsYWNlQ2FyZXRzKGNvbXAsIGxvb3NlKTtcbiAgZGVidWcoJ2NhcmV0JywgY29tcCk7XG4gIGNvbXAgPSByZXBsYWNlVGlsZGVzKGNvbXAsIGxvb3NlKTtcbiAgZGVidWcoJ3RpbGRlcycsIGNvbXApO1xuICBjb21wID0gcmVwbGFjZVhSYW5nZXMoY29tcCwgbG9vc2UpO1xuICBkZWJ1ZygneHJhbmdlJywgY29tcCk7XG4gIGNvbXAgPSByZXBsYWNlU3RhcnMoY29tcCwgbG9vc2UpO1xuICBkZWJ1Zygnc3RhcnMnLCBjb21wKTtcbiAgcmV0dXJuIGNvbXA7XG59XG5cbmZ1bmN0aW9uIGlzWChpZCkge1xuICByZXR1cm4gIWlkIHx8IGlkLnRvTG93ZXJDYXNlKCkgPT09ICd4JyB8fCBpZCA9PT0gJyonO1xufVxuXG4vLyB+LCB+PiAtLT4gKiAoYW55LCBraW5kYSBzaWxseSlcbi8vIH4yLCB+Mi54LCB+Mi54LngsIH4+Miwgfj4yLnggfj4yLngueCAtLT4gPj0yLjAuMCA8My4wLjBcbi8vIH4yLjAsIH4yLjAueCwgfj4yLjAsIH4+Mi4wLnggLS0+ID49Mi4wLjAgPDIuMS4wXG4vLyB+MS4yLCB+MS4yLngsIH4+MS4yLCB+PjEuMi54IC0tPiA+PTEuMi4wIDwxLjMuMFxuLy8gfjEuMi4zLCB+PjEuMi4zIC0tPiA+PTEuMi4zIDwxLjMuMFxuLy8gfjEuMi4wLCB+PjEuMi4wIC0tPiA+PTEuMi4wIDwxLjMuMFxuZnVuY3Rpb24gcmVwbGFjZVRpbGRlcyhjb21wLCBsb29zZSkge1xuICByZXR1cm4gY29tcC50cmltKCkuc3BsaXQoL1xccysvKS5tYXAoZnVuY3Rpb24oY29tcCkge1xuICAgIHJldHVybiByZXBsYWNlVGlsZGUoY29tcCwgbG9vc2UpO1xuICB9KS5qb2luKCcgJyk7XG59XG5cbmZ1bmN0aW9uIHJlcGxhY2VUaWxkZShjb21wLCBsb29zZSkge1xuICB2YXIgciA9IGxvb3NlID8gcmVbVElMREVMT09TRV0gOiByZVtUSUxERV07XG4gIHJldHVybiBjb21wLnJlcGxhY2UociwgZnVuY3Rpb24oXywgTSwgbSwgcCwgcHIpIHtcbiAgICBkZWJ1ZygndGlsZGUnLCBjb21wLCBfLCBNLCBtLCBwLCBwcik7XG4gICAgdmFyIHJldDtcblxuICAgIGlmIChpc1goTSkpXG4gICAgICByZXQgPSAnJztcbiAgICBlbHNlIGlmIChpc1gobSkpXG4gICAgICByZXQgPSAnPj0nICsgTSArICcuMC4wIDwnICsgKCtNICsgMSkgKyAnLjAuMCc7XG4gICAgZWxzZSBpZiAoaXNYKHApKVxuICAgICAgLy8gfjEuMiA9PSA+PTEuMi4wLSA8MS4zLjAtXG4gICAgICByZXQgPSAnPj0nICsgTSArICcuJyArIG0gKyAnLjAgPCcgKyBNICsgJy4nICsgKCttICsgMSkgKyAnLjAnO1xuICAgIGVsc2UgaWYgKHByKSB7XG4gICAgICBkZWJ1ZygncmVwbGFjZVRpbGRlIHByJywgcHIpO1xuICAgICAgaWYgKHByLmNoYXJBdCgwKSAhPT0gJy0nKVxuICAgICAgICBwciA9ICctJyArIHByO1xuICAgICAgcmV0ID0gJz49JyArIE0gKyAnLicgKyBtICsgJy4nICsgcCArIHByICtcbiAgICAgICAgICAgICcgPCcgKyBNICsgJy4nICsgKCttICsgMSkgKyAnLjAnO1xuICAgIH0gZWxzZVxuICAgICAgLy8gfjEuMi4zID09ID49MS4yLjMgPDEuMy4wXG4gICAgICByZXQgPSAnPj0nICsgTSArICcuJyArIG0gKyAnLicgKyBwICtcbiAgICAgICAgICAgICcgPCcgKyBNICsgJy4nICsgKCttICsgMSkgKyAnLjAnO1xuXG4gICAgZGVidWcoJ3RpbGRlIHJldHVybicsIHJldCk7XG4gICAgcmV0dXJuIHJldDtcbiAgfSk7XG59XG5cbi8vIF4gLS0+ICogKGFueSwga2luZGEgc2lsbHkpXG4vLyBeMiwgXjIueCwgXjIueC54IC0tPiA+PTIuMC4wIDwzLjAuMFxuLy8gXjIuMCwgXjIuMC54IC0tPiA+PTIuMC4wIDwzLjAuMFxuLy8gXjEuMiwgXjEuMi54IC0tPiA+PTEuMi4wIDwyLjAuMFxuLy8gXjEuMi4zIC0tPiA+PTEuMi4zIDwyLjAuMFxuLy8gXjEuMi4wIC0tPiA+PTEuMi4wIDwyLjAuMFxuZnVuY3Rpb24gcmVwbGFjZUNhcmV0cyhjb21wLCBsb29zZSkge1xuICByZXR1cm4gY29tcC50cmltKCkuc3BsaXQoL1xccysvKS5tYXAoZnVuY3Rpb24oY29tcCkge1xuICAgIHJldHVybiByZXBsYWNlQ2FyZXQoY29tcCwgbG9vc2UpO1xuICB9KS5qb2luKCcgJyk7XG59XG5cbmZ1bmN0aW9uIHJlcGxhY2VDYXJldChjb21wLCBsb29zZSkge1xuICBkZWJ1ZygnY2FyZXQnLCBjb21wLCBsb29zZSk7XG4gIHZhciByID0gbG9vc2UgPyByZVtDQVJFVExPT1NFXSA6IHJlW0NBUkVUXTtcbiAgcmV0dXJuIGNvbXAucmVwbGFjZShyLCBmdW5jdGlvbihfLCBNLCBtLCBwLCBwcikge1xuICAgIGRlYnVnKCdjYXJldCcsIGNvbXAsIF8sIE0sIG0sIHAsIHByKTtcbiAgICB2YXIgcmV0O1xuXG4gICAgaWYgKGlzWChNKSlcbiAgICAgIHJldCA9ICcnO1xuICAgIGVsc2UgaWYgKGlzWChtKSlcbiAgICAgIHJldCA9ICc+PScgKyBNICsgJy4wLjAgPCcgKyAoK00gKyAxKSArICcuMC4wJztcbiAgICBlbHNlIGlmIChpc1gocCkpIHtcbiAgICAgIGlmIChNID09PSAnMCcpXG4gICAgICAgIHJldCA9ICc+PScgKyBNICsgJy4nICsgbSArICcuMCA8JyArIE0gKyAnLicgKyAoK20gKyAxKSArICcuMCc7XG4gICAgICBlbHNlXG4gICAgICAgIHJldCA9ICc+PScgKyBNICsgJy4nICsgbSArICcuMCA8JyArICgrTSArIDEpICsgJy4wLjAnO1xuICAgIH0gZWxzZSBpZiAocHIpIHtcbiAgICAgIGRlYnVnKCdyZXBsYWNlQ2FyZXQgcHInLCBwcik7XG4gICAgICBpZiAocHIuY2hhckF0KDApICE9PSAnLScpXG4gICAgICAgIHByID0gJy0nICsgcHI7XG4gICAgICBpZiAoTSA9PT0gJzAnKSB7XG4gICAgICAgIGlmIChtID09PSAnMCcpXG4gICAgICAgICAgcmV0ID0gJz49JyArIE0gKyAnLicgKyBtICsgJy4nICsgcCArIHByICtcbiAgICAgICAgICAgICAgICAnIDwnICsgTSArICcuJyArIG0gKyAnLicgKyAoK3AgKyAxKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHJldCA9ICc+PScgKyBNICsgJy4nICsgbSArICcuJyArIHAgKyBwciArXG4gICAgICAgICAgICAgICAgJyA8JyArIE0gKyAnLicgKyAoK20gKyAxKSArICcuMCc7XG4gICAgICB9IGVsc2VcbiAgICAgICAgcmV0ID0gJz49JyArIE0gKyAnLicgKyBtICsgJy4nICsgcCArIHByICtcbiAgICAgICAgICAgICAgJyA8JyArICgrTSArIDEpICsgJy4wLjAnO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWJ1Zygnbm8gcHInKTtcbiAgICAgIGlmIChNID09PSAnMCcpIHtcbiAgICAgICAgaWYgKG0gPT09ICcwJylcbiAgICAgICAgICByZXQgPSAnPj0nICsgTSArICcuJyArIG0gKyAnLicgKyBwICtcbiAgICAgICAgICAgICAgICAnIDwnICsgTSArICcuJyArIG0gKyAnLicgKyAoK3AgKyAxKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHJldCA9ICc+PScgKyBNICsgJy4nICsgbSArICcuJyArIHAgK1xuICAgICAgICAgICAgICAgICcgPCcgKyBNICsgJy4nICsgKCttICsgMSkgKyAnLjAnO1xuICAgICAgfSBlbHNlXG4gICAgICAgIHJldCA9ICc+PScgKyBNICsgJy4nICsgbSArICcuJyArIHAgK1xuICAgICAgICAgICAgICAnIDwnICsgKCtNICsgMSkgKyAnLjAuMCc7XG4gICAgfVxuXG4gICAgZGVidWcoJ2NhcmV0IHJldHVybicsIHJldCk7XG4gICAgcmV0dXJuIHJldDtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlcGxhY2VYUmFuZ2VzKGNvbXAsIGxvb3NlKSB7XG4gIGRlYnVnKCdyZXBsYWNlWFJhbmdlcycsIGNvbXAsIGxvb3NlKTtcbiAgcmV0dXJuIGNvbXAuc3BsaXQoL1xccysvKS5tYXAoZnVuY3Rpb24oY29tcCkge1xuICAgIHJldHVybiByZXBsYWNlWFJhbmdlKGNvbXAsIGxvb3NlKTtcbiAgfSkuam9pbignICcpO1xufVxuXG5mdW5jdGlvbiByZXBsYWNlWFJhbmdlKGNvbXAsIGxvb3NlKSB7XG4gIGNvbXAgPSBjb21wLnRyaW0oKTtcbiAgdmFyIHIgPSBsb29zZSA/IHJlW1hSQU5HRUxPT1NFXSA6IHJlW1hSQU5HRV07XG4gIHJldHVybiBjb21wLnJlcGxhY2UociwgZnVuY3Rpb24ocmV0LCBndGx0LCBNLCBtLCBwLCBwcikge1xuICAgIGRlYnVnKCd4UmFuZ2UnLCBjb21wLCByZXQsIGd0bHQsIE0sIG0sIHAsIHByKTtcbiAgICB2YXIgeE0gPSBpc1goTSk7XG4gICAgdmFyIHhtID0geE0gfHwgaXNYKG0pO1xuICAgIHZhciB4cCA9IHhtIHx8IGlzWChwKTtcbiAgICB2YXIgYW55WCA9IHhwO1xuXG4gICAgaWYgKGd0bHQgPT09ICc9JyAmJiBhbnlYKVxuICAgICAgZ3RsdCA9ICcnO1xuXG4gICAgaWYgKHhNKSB7XG4gICAgICBpZiAoZ3RsdCA9PT0gJz4nIHx8IGd0bHQgPT09ICc8Jykge1xuICAgICAgICAvLyBub3RoaW5nIGlzIGFsbG93ZWRcbiAgICAgICAgcmV0ID0gJzwwLjAuMCc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBub3RoaW5nIGlzIGZvcmJpZGRlblxuICAgICAgICByZXQgPSAnKic7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChndGx0ICYmIGFueVgpIHtcbiAgICAgIC8vIHJlcGxhY2UgWCB3aXRoIDBcbiAgICAgIGlmICh4bSlcbiAgICAgICAgbSA9IDA7XG4gICAgICBpZiAoeHApXG4gICAgICAgIHAgPSAwO1xuXG4gICAgICBpZiAoZ3RsdCA9PT0gJz4nKSB7XG4gICAgICAgIC8vID4xID0+ID49Mi4wLjBcbiAgICAgICAgLy8gPjEuMiA9PiA+PTEuMy4wXG4gICAgICAgIC8vID4xLjIuMyA9PiA+PSAxLjIuNFxuICAgICAgICBndGx0ID0gJz49JztcbiAgICAgICAgaWYgKHhtKSB7XG4gICAgICAgICAgTSA9ICtNICsgMTtcbiAgICAgICAgICBtID0gMDtcbiAgICAgICAgICBwID0gMDtcbiAgICAgICAgfSBlbHNlIGlmICh4cCkge1xuICAgICAgICAgIG0gPSArbSArIDE7XG4gICAgICAgICAgcCA9IDA7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoZ3RsdCA9PT0gJzw9Jykge1xuICAgICAgICAvLyA8PTAuNy54IGlzIGFjdHVhbGx5IDwwLjguMCwgc2luY2UgYW55IDAuNy54IHNob3VsZFxuICAgICAgICAvLyBwYXNzLiAgU2ltaWxhcmx5LCA8PTcueCBpcyBhY3R1YWxseSA8OC4wLjAsIGV0Yy5cbiAgICAgICAgZ3RsdCA9ICc8J1xuICAgICAgICBpZiAoeG0pXG4gICAgICAgICAgTSA9ICtNICsgMVxuICAgICAgICBlbHNlXG4gICAgICAgICAgbSA9ICttICsgMVxuICAgICAgfVxuXG4gICAgICByZXQgPSBndGx0ICsgTSArICcuJyArIG0gKyAnLicgKyBwO1xuICAgIH0gZWxzZSBpZiAoeG0pIHtcbiAgICAgIHJldCA9ICc+PScgKyBNICsgJy4wLjAgPCcgKyAoK00gKyAxKSArICcuMC4wJztcbiAgICB9IGVsc2UgaWYgKHhwKSB7XG4gICAgICByZXQgPSAnPj0nICsgTSArICcuJyArIG0gKyAnLjAgPCcgKyBNICsgJy4nICsgKCttICsgMSkgKyAnLjAnO1xuICAgIH1cblxuICAgIGRlYnVnKCd4UmFuZ2UgcmV0dXJuJywgcmV0KTtcblxuICAgIHJldHVybiByZXQ7XG4gIH0pO1xufVxuXG4vLyBCZWNhdXNlICogaXMgQU5ELWVkIHdpdGggZXZlcnl0aGluZyBlbHNlIGluIHRoZSBjb21wYXJhdG9yLFxuLy8gYW5kICcnIG1lYW5zIFwiYW55IHZlcnNpb25cIiwganVzdCByZW1vdmUgdGhlICpzIGVudGlyZWx5LlxuZnVuY3Rpb24gcmVwbGFjZVN0YXJzKGNvbXAsIGxvb3NlKSB7XG4gIGRlYnVnKCdyZXBsYWNlU3RhcnMnLCBjb21wLCBsb29zZSk7XG4gIC8vIExvb3NlbmVzcyBpcyBpZ25vcmVkIGhlcmUuICBzdGFyIGlzIGFsd2F5cyBhcyBsb29zZSBhcyBpdCBnZXRzIVxuICByZXR1cm4gY29tcC50cmltKCkucmVwbGFjZShyZVtTVEFSXSwgJycpO1xufVxuXG4vLyBUaGlzIGZ1bmN0aW9uIGlzIHBhc3NlZCB0byBzdHJpbmcucmVwbGFjZShyZVtIWVBIRU5SQU5HRV0pXG4vLyBNLCBtLCBwYXRjaCwgcHJlcmVsZWFzZSwgYnVpbGRcbi8vIDEuMiAtIDMuNC41ID0+ID49MS4yLjAgPD0zLjQuNVxuLy8gMS4yLjMgLSAzLjQgPT4gPj0xLjIuMCA8My41LjAgQW55IDMuNC54IHdpbGwgZG9cbi8vIDEuMiAtIDMuNCA9PiA+PTEuMi4wIDwzLjUuMFxuZnVuY3Rpb24gaHlwaGVuUmVwbGFjZSgkMCxcbiAgICAgICAgICAgICAgICAgICAgICAgZnJvbSwgZk0sIGZtLCBmcCwgZnByLCBmYixcbiAgICAgICAgICAgICAgICAgICAgICAgdG8sIHRNLCB0bSwgdHAsIHRwciwgdGIpIHtcblxuICBpZiAoaXNYKGZNKSlcbiAgICBmcm9tID0gJyc7XG4gIGVsc2UgaWYgKGlzWChmbSkpXG4gICAgZnJvbSA9ICc+PScgKyBmTSArICcuMC4wJztcbiAgZWxzZSBpZiAoaXNYKGZwKSlcbiAgICBmcm9tID0gJz49JyArIGZNICsgJy4nICsgZm0gKyAnLjAnO1xuICBlbHNlXG4gICAgZnJvbSA9ICc+PScgKyBmcm9tO1xuXG4gIGlmIChpc1godE0pKVxuICAgIHRvID0gJyc7XG4gIGVsc2UgaWYgKGlzWCh0bSkpXG4gICAgdG8gPSAnPCcgKyAoK3RNICsgMSkgKyAnLjAuMCc7XG4gIGVsc2UgaWYgKGlzWCh0cCkpXG4gICAgdG8gPSAnPCcgKyB0TSArICcuJyArICgrdG0gKyAxKSArICcuMCc7XG4gIGVsc2UgaWYgKHRwcilcbiAgICB0byA9ICc8PScgKyB0TSArICcuJyArIHRtICsgJy4nICsgdHAgKyAnLScgKyB0cHI7XG4gIGVsc2VcbiAgICB0byA9ICc8PScgKyB0bztcblxuICByZXR1cm4gKGZyb20gKyAnICcgKyB0bykudHJpbSgpO1xufVxuXG5cbi8vIGlmIEFOWSBvZiB0aGUgc2V0cyBtYXRjaCBBTEwgb2YgaXRzIGNvbXBhcmF0b3JzLCB0aGVuIHBhc3NcblJhbmdlLnByb3RvdHlwZS50ZXN0ID0gZnVuY3Rpb24odmVyc2lvbikge1xuICBpZiAoIXZlcnNpb24pXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGlmICh0eXBlb2YgdmVyc2lvbiA9PT0gJ3N0cmluZycpXG4gICAgdmVyc2lvbiA9IG5ldyBTZW1WZXIodmVyc2lvbiwgdGhpcy5sb29zZSk7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnNldC5sZW5ndGg7IGkrKykge1xuICAgIGlmICh0ZXN0U2V0KHRoaXMuc2V0W2ldLCB2ZXJzaW9uKSlcbiAgICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbmZ1bmN0aW9uIHRlc3RTZXQoc2V0LCB2ZXJzaW9uKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc2V0Lmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKCFzZXRbaV0udGVzdCh2ZXJzaW9uKSlcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmICh2ZXJzaW9uLnByZXJlbGVhc2UubGVuZ3RoKSB7XG4gICAgLy8gRmluZCB0aGUgc2V0IG9mIHZlcnNpb25zIHRoYXQgYXJlIGFsbG93ZWQgdG8gaGF2ZSBwcmVyZWxlYXNlc1xuICAgIC8vIEZvciBleGFtcGxlLCBeMS4yLjMtcHIuMSBkZXN1Z2FycyB0byA+PTEuMi4zLXByLjEgPDIuMC4wXG4gICAgLy8gVGhhdCBzaG91bGQgYWxsb3cgYDEuMi4zLXByLjJgIHRvIHBhc3MuXG4gICAgLy8gSG93ZXZlciwgYDEuMi40LWFscGhhLm5vdHJlYWR5YCBzaG91bGQgTk9UIGJlIGFsbG93ZWQsXG4gICAgLy8gZXZlbiB0aG91Z2ggaXQncyB3aXRoaW4gdGhlIHJhbmdlIHNldCBieSB0aGUgY29tcGFyYXRvcnMuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZXQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGRlYnVnKHNldFtpXS5zZW12ZXIpO1xuICAgICAgaWYgKHNldFtpXS5zZW12ZXIgPT09IEFOWSlcbiAgICAgICAgY29udGludWU7XG5cbiAgICAgIGlmIChzZXRbaV0uc2VtdmVyLnByZXJlbGVhc2UubGVuZ3RoID4gMCkge1xuICAgICAgICB2YXIgYWxsb3dlZCA9IHNldFtpXS5zZW12ZXI7XG4gICAgICAgIGlmIChhbGxvd2VkLm1ham9yID09PSB2ZXJzaW9uLm1ham9yICYmXG4gICAgICAgICAgICBhbGxvd2VkLm1pbm9yID09PSB2ZXJzaW9uLm1pbm9yICYmXG4gICAgICAgICAgICBhbGxvd2VkLnBhdGNoID09PSB2ZXJzaW9uLnBhdGNoKVxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFZlcnNpb24gaGFzIGEgLXByZSwgYnV0IGl0J3Mgbm90IG9uZSBvZiB0aGUgb25lcyB3ZSBsaWtlLlxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5leHBvcnRzLnNhdGlzZmllcyA9IHNhdGlzZmllcztcbmZ1bmN0aW9uIHNhdGlzZmllcyh2ZXJzaW9uLCByYW5nZSwgbG9vc2UpIHtcbiAgdHJ5IHtcbiAgICByYW5nZSA9IG5ldyBSYW5nZShyYW5nZSwgbG9vc2UpO1xuICB9IGNhdGNoIChlcikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gcmFuZ2UudGVzdCh2ZXJzaW9uKTtcbn1cblxuZXhwb3J0cy5tYXhTYXRpc2Z5aW5nID0gbWF4U2F0aXNmeWluZztcbmZ1bmN0aW9uIG1heFNhdGlzZnlpbmcodmVyc2lvbnMsIHJhbmdlLCBsb29zZSkge1xuICByZXR1cm4gdmVyc2lvbnMuZmlsdGVyKGZ1bmN0aW9uKHZlcnNpb24pIHtcbiAgICByZXR1cm4gc2F0aXNmaWVzKHZlcnNpb24sIHJhbmdlLCBsb29zZSk7XG4gIH0pLnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgIHJldHVybiByY29tcGFyZShhLCBiLCBsb29zZSk7XG4gIH0pWzBdIHx8IG51bGw7XG59XG5cbmV4cG9ydHMudmFsaWRSYW5nZSA9IHZhbGlkUmFuZ2U7XG5mdW5jdGlvbiB2YWxpZFJhbmdlKHJhbmdlLCBsb29zZSkge1xuICB0cnkge1xuICAgIC8vIFJldHVybiAnKicgaW5zdGVhZCBvZiAnJyBzbyB0aGF0IHRydXRoaW5lc3Mgd29ya3MuXG4gICAgLy8gVGhpcyB3aWxsIHRocm93IGlmIGl0J3MgaW52YWxpZCBhbnl3YXlcbiAgICByZXR1cm4gbmV3IFJhbmdlKHJhbmdlLCBsb29zZSkucmFuZ2UgfHwgJyonO1xuICB9IGNhdGNoIChlcikge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbi8vIERldGVybWluZSBpZiB2ZXJzaW9uIGlzIGxlc3MgdGhhbiBhbGwgdGhlIHZlcnNpb25zIHBvc3NpYmxlIGluIHRoZSByYW5nZVxuZXhwb3J0cy5sdHIgPSBsdHI7XG5mdW5jdGlvbiBsdHIodmVyc2lvbiwgcmFuZ2UsIGxvb3NlKSB7XG4gIHJldHVybiBvdXRzaWRlKHZlcnNpb24sIHJhbmdlLCAnPCcsIGxvb3NlKTtcbn1cblxuLy8gRGV0ZXJtaW5lIGlmIHZlcnNpb24gaXMgZ3JlYXRlciB0aGFuIGFsbCB0aGUgdmVyc2lvbnMgcG9zc2libGUgaW4gdGhlIHJhbmdlLlxuZXhwb3J0cy5ndHIgPSBndHI7XG5mdW5jdGlvbiBndHIodmVyc2lvbiwgcmFuZ2UsIGxvb3NlKSB7XG4gIHJldHVybiBvdXRzaWRlKHZlcnNpb24sIHJhbmdlLCAnPicsIGxvb3NlKTtcbn1cblxuZXhwb3J0cy5vdXRzaWRlID0gb3V0c2lkZTtcbmZ1bmN0aW9uIG91dHNpZGUodmVyc2lvbiwgcmFuZ2UsIGhpbG8sIGxvb3NlKSB7XG4gIHZlcnNpb24gPSBuZXcgU2VtVmVyKHZlcnNpb24sIGxvb3NlKTtcbiAgcmFuZ2UgPSBuZXcgUmFuZ2UocmFuZ2UsIGxvb3NlKTtcblxuICB2YXIgZ3RmbiwgbHRlZm4sIGx0Zm4sIGNvbXAsIGVjb21wO1xuICBzd2l0Y2ggKGhpbG8pIHtcbiAgICBjYXNlICc+JzpcbiAgICAgIGd0Zm4gPSBndDtcbiAgICAgIGx0ZWZuID0gbHRlO1xuICAgICAgbHRmbiA9IGx0O1xuICAgICAgY29tcCA9ICc+JztcbiAgICAgIGVjb21wID0gJz49JztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJzwnOlxuICAgICAgZ3RmbiA9IGx0O1xuICAgICAgbHRlZm4gPSBndGU7XG4gICAgICBsdGZuID0gZ3Q7XG4gICAgICBjb21wID0gJzwnO1xuICAgICAgZWNvbXAgPSAnPD0nO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ011c3QgcHJvdmlkZSBhIGhpbG8gdmFsIG9mIFwiPFwiIG9yIFwiPlwiJyk7XG4gIH1cblxuICAvLyBJZiBpdCBzYXRpc2lmZXMgdGhlIHJhbmdlIGl0IGlzIG5vdCBvdXRzaWRlXG4gIGlmIChzYXRpc2ZpZXModmVyc2lvbiwgcmFuZ2UsIGxvb3NlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIEZyb20gbm93IG9uLCB2YXJpYWJsZSB0ZXJtcyBhcmUgYXMgaWYgd2UncmUgaW4gXCJndHJcIiBtb2RlLlxuICAvLyBidXQgbm90ZSB0aGF0IGV2ZXJ5dGhpbmcgaXMgZmxpcHBlZCBmb3IgdGhlIFwibHRyXCIgZnVuY3Rpb24uXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByYW5nZS5zZXQubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgY29tcGFyYXRvcnMgPSByYW5nZS5zZXRbaV07XG5cbiAgICB2YXIgaGlnaCA9IG51bGw7XG4gICAgdmFyIGxvdyA9IG51bGw7XG5cbiAgICBjb21wYXJhdG9ycy5mb3JFYWNoKGZ1bmN0aW9uKGNvbXBhcmF0b3IpIHtcbiAgICAgIGlmIChjb21wYXJhdG9yLnNlbXZlciA9PT0gQU5ZKSB7XG4gICAgICAgIGNvbXBhcmF0b3IgPSBuZXcgQ29tcGFyYXRvcignPj0wLjAuMCcpXG4gICAgICB9XG4gICAgICBoaWdoID0gaGlnaCB8fCBjb21wYXJhdG9yO1xuICAgICAgbG93ID0gbG93IHx8IGNvbXBhcmF0b3I7XG4gICAgICBpZiAoZ3Rmbihjb21wYXJhdG9yLnNlbXZlciwgaGlnaC5zZW12ZXIsIGxvb3NlKSkge1xuICAgICAgICBoaWdoID0gY29tcGFyYXRvcjtcbiAgICAgIH0gZWxzZSBpZiAobHRmbihjb21wYXJhdG9yLnNlbXZlciwgbG93LnNlbXZlciwgbG9vc2UpKSB7XG4gICAgICAgIGxvdyA9IGNvbXBhcmF0b3I7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBJZiB0aGUgZWRnZSB2ZXJzaW9uIGNvbXBhcmF0b3IgaGFzIGEgb3BlcmF0b3IgdGhlbiBvdXIgdmVyc2lvblxuICAgIC8vIGlzbid0IG91dHNpZGUgaXRcbiAgICBpZiAoaGlnaC5vcGVyYXRvciA9PT0gY29tcCB8fCBoaWdoLm9wZXJhdG9yID09PSBlY29tcCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIElmIHRoZSBsb3dlc3QgdmVyc2lvbiBjb21wYXJhdG9yIGhhcyBhbiBvcGVyYXRvciBhbmQgb3VyIHZlcnNpb25cbiAgICAvLyBpcyBsZXNzIHRoYW4gaXQgdGhlbiBpdCBpc24ndCBoaWdoZXIgdGhhbiB0aGUgcmFuZ2VcbiAgICBpZiAoKCFsb3cub3BlcmF0b3IgfHwgbG93Lm9wZXJhdG9yID09PSBjb21wKSAmJlxuICAgICAgICBsdGVmbih2ZXJzaW9uLCBsb3cuc2VtdmVyKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSBpZiAobG93Lm9wZXJhdG9yID09PSBlY29tcCAmJiBsdGZuKHZlcnNpb24sIGxvdy5zZW12ZXIpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L3NlbXZlci9zZW12ZXIuanNcbiAqKi8iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcblxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgc2V0VGltZW91dChkcmFpblF1ZXVlLCAwKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqICh3ZWJwYWNrKS9+L25vZGUtbGlicy1icm93c2VyL34vcHJvY2Vzcy9icm93c2VyLmpzXG4gKiovIiwiLyoqXG4gKiBAZmlsZU92ZXJ2aWV3XG4gKiBWaWV3TW9kZWwgQ29uc3RydWN0b3IgJiBkZWZpbml0aW9uXG4gKi9cblxuaW1wb3J0IHtleHRlbmQsIHRvQXJyYXl9IGZyb20gJy4uL3V0aWwnXG5cbmltcG9ydCAqIGFzIHNjb3BlIGZyb20gJy4vaW5zdGFuY2Uvc2NvcGUnXG5pbXBvcnQgKiBhcyBjb21waWxlciBmcm9tICcuL2NvbXBpbGVyJ1xuaW1wb3J0ICogYXMgZGlyZWN0aXZlIGZyb20gJy4vZGlyZWN0aXZlJ1xuaW1wb3J0ICogYXMgZG9tSGVscGVyIGZyb20gJy4vZG9tLWhlbHBlcidcbmltcG9ydCAqIGFzIGV2ZW50cyBmcm9tICcuL2V2ZW50cydcbi8vIGltcG9ydCAqIGFzIG1vZHVsZXMgZnJvbSAnLi8uLi9hcGkvbW9kdWxlcydcbi8vIGltcG9ydCAqIGFzIGFwaSBmcm9tICcuLy4uL2FwaS9hcGknXG5cbmltcG9ydCB7cmVnaXN0ZXJNb2R1bGVzLCByZWdpc3Rlck1ldGhvZHN9IGZyb20gJy4uL2FwcC9yZWdpc3RlcidcblxuZnVuY3Rpb24gY2FsbE9sZFJlYWR5RW50cnkodm0sIGNvbXBvbmVudCkge1xuICBpZiAoY29tcG9uZW50Lm1ldGhvZHMgJiZcbiAgICAgIGNvbXBvbmVudC5tZXRob2RzLnJlYWR5KSB7XG4gICAgY29tcG9uZW50Lm1ldGhvZHMucmVhZHkuY2FsbCh2bSlcbiAgfVxufVxuXG4vKipcbiAqIFZpZXdNb2RlbCBjb25zdHJ1Y3RvclxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gKiBAcGFyYW0ge29iamVjdH0gcGFyZW50Vm0gICB3aGljaCBjb250YWlucyBfYXBwXG4gKiBAcGFyYW0ge29iamVjdH0gcGFyZW50RWwgICByb290IGVsZW1lbnQgb3IgZnJhZyBibG9ja1xuICogQHBhcmFtIHtvYmplY3R9IG1lcmdlZERhdGEgZXh0ZXJuYWwgZGF0YVxuICogQHBhcmFtIHtvYmplY3R9IGV4dGVybmFsRXZlbnRzIGV4dGVybmFsIGV2ZW50c1xuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBWbShcbiAgdHlwZSxcbiAgcGFyZW50Vm0sXG4gIHBhcmVudEVsLFxuICBtZXJnZWREYXRhLFxuICBleHRlcm5hbEV2ZW50c1xuKSB7XG4gIHRoaXMuX3BhcmVudCA9IHBhcmVudFZtLl9yZWFsUGFyZW50ID8gcGFyZW50Vm0uX3JlYWxQYXJlbnQgOiBwYXJlbnRWbVxuICB0aGlzLl9hcHAgPSBwYXJlbnRWbS5fYXBwXG4gIHBhcmVudFZtLl9jaGlsZHJlblZtcyAmJiBwYXJlbnRWbS5fY2hpbGRyZW5WbXMucHVzaCh0aGlzKVxuXG4gIGNvbnN0IGNvbXBvbmVudCA9IHRoaXMuX2FwcC5jdXN0b21Db21wb25lbnRNYXBbdHlwZV0gfHwge31cbiAgY29uc3QgZGF0YSA9IGNvbXBvbmVudC5kYXRhIHx8IHt9XG5cbiAgdGhpcy5fb3B0aW9ucyA9IGNvbXBvbmVudFxuICB0aGlzLl9tZXRob2RzID0gY29tcG9uZW50Lm1ldGhvZHMgfHwge31cbiAgdGhpcy5fY3NzID0gY29tcG9uZW50LnN0eWxlIHx8IHt9XG4gIHRoaXMuX2lkcyA9IHt9XG4gIHRoaXMuX3dhdGNoZXJzID0gW11cbiAgdGhpcy5fdm1FdmVudHMgPSB7fVxuICB0aGlzLl9jaGlsZHJlblZtcyA9IFtdXG4gIHRoaXMuX3R5cGUgPSB0eXBlXG5cbiAgLy8gYmluZCBldmVudHMgYW5kIGxpZmVjeWNsZXNcbiAgdGhpcy5faW5pdEV2ZW50cyhleHRlcm5hbEV2ZW50cylcblxuICB0aGlzLiRlbWl0KCdob29rOmluaXQnKVxuICB0aGlzLl9pbml0ZWQgPSB0cnVlXG4gIC8vIHByb3h5IGRhdGEgYW5kIG1ldGhvZHNcbiAgLy8gb2JzZXJ2ZSBkYXRhIGFuZCBhZGQgdGhpcyB0byB2bXNcbiAgdGhpcy5fZGF0YSA9IHR5cGVvZiBkYXRhID09PSAnZnVuY3Rpb24nID8gZGF0YSgpIDogZGF0YVxuICBpZiAobWVyZ2VkRGF0YSkge1xuICAgIGV4dGVuZCh0aGlzLl9kYXRhLCBtZXJnZWREYXRhKVxuICB9XG4gIHRoaXMuX2luaXRTY29wZSgpXG5cbiAgdGhpcy4kZW1pdCgnaG9vazpjcmVhdGVkJylcbiAgdGhpcy5fY3JlYXRlZCA9IHRydWVcbiAgLy8gYmFja3dhcmQgb2xkIHJlYWR5IGVudHJ5XG4gIGNhbGxPbGRSZWFkeUVudHJ5KHRoaXMsIGNvbXBvbmVudClcblxuICAvLyBpZiBubyBwYXJlbnRFbGVtZW50IHRoZW4gc3BlY2lmeSB0aGUgZG9jdW1lbnRFbGVtZW50XG4gIHRoaXMuX3BhcmVudEVsID0gcGFyZW50RWwgfHwgdGhpcy5fYXBwLmRvYy5kb2N1bWVudEVsZW1lbnRcbiAgdGhpcy5fYnVpbGQoKVxufVxuXG5leHRlbmQoVm0ucHJvdG90eXBlLCBzY29wZSwgY29tcGlsZXIsIGRpcmVjdGl2ZSwgZG9tSGVscGVyLCBldmVudHMpXG5leHRlbmQoVm0sIHtcbiAgcmVnaXN0ZXJNb2R1bGVzLFxuICByZWdpc3Rlck1ldGhvZHNcbn0pXG4vLyBWbS5yZWdpc3Rlck1vZHVsZXMobW9kdWxlcylcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vbGliL3ZtL2luZGV4LmpzXG4gKiovIiwidmFyIF8gPSByZXF1aXJlKCcuLi91dGlsJylcbnZhciBPYnNlcnZlciA9IHJlcXVpcmUoJy4uL29ic2VydmVyJylcbnZhciBEZXAgPSByZXF1aXJlKCcuLi9vYnNlcnZlci9kZXAnKVxuXG4vKipcbiAqIFNldHVwIHRoZSBzY29wZSBvZiBhbiBpbnN0YW5jZSwgd2hpY2ggY29udGFpbnM6XG4gKiAtIG9ic2VydmVkIGRhdGFcbiAqIC0gY29tcHV0ZWQgcHJvcGVydGllc1xuICogLSB1c2VyIG1ldGhvZHNcbiAqIC0gbWV0YSBwcm9wZXJ0aWVzXG4gKi9cblxuZXhwb3J0cy5faW5pdFNjb3BlID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLl9pbml0RGF0YSgpXG4gIC8vIHRoaXMuX2luaXRDb21wdXRlZCgpXG4gIHRoaXMuX2luaXRNZXRob2RzKClcbiAgLy8gdGhpcy5faW5pdE1ldGEoKVxufVxuXG4vKipcbiAqIEluaXRpYWxpemUgdGhlIGRhdGEuIFxuICovXG5cbmV4cG9ydHMuX2luaXREYXRhID0gZnVuY3Rpb24gKCkge1xuICAvLyBwcm94eSBkYXRhIG9uIGluc3RhbmNlXG4gIHZhciBkYXRhID0gdGhpcy5fZGF0YVxuICB2YXIgaSwga2V5XG4gIC8vIC8vIG1ha2Ugc3VyZSBhbGwgcHJvcHMgcHJvcGVydGllcyBhcmUgb2JzZXJ2ZWRcbiAgLy8gdmFyIHByb3BzID0gdGhpcy4kb3B0aW9ucy5wcm9wc1xuICAvLyBpZiAocHJvcHMpIHtcbiAgLy8gICBpID0gcHJvcHMubGVuZ3RoXG4gIC8vICAgd2hpbGUgKGktLSkge1xuICAvLyAgICAga2V5ID0gXy5jYW1lbGl6ZShwcm9wc1tpXSlcbiAgLy8gICAgIGlmICghKGtleSBpbiBkYXRhKSkge1xuICAvLyAgICAgICBkYXRhW2tleV0gPSBudWxsXG4gIC8vICAgICB9XG4gIC8vICAgfVxuICAvLyB9XG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMoZGF0YSlcbiAgaSA9IGtleXMubGVuZ3RoXG4gIHdoaWxlIChpLS0pIHtcbiAgICBrZXkgPSBrZXlzW2ldXG4gICAgaWYgKCFfLmlzUmVzZXJ2ZWQoa2V5KSkge1xuICAgICAgdGhpcy5fcHJveHkoa2V5KVxuICAgIH1cbiAgfVxuICAvLyBvYnNlcnZlIGRhdGFcbiAgT2JzZXJ2ZXIuY3JlYXRlKGRhdGEpLmFkZFZtKHRoaXMpXG59XG5cbi8vIC8qKlxuLy8gICogU3dhcCB0aGUgaXNudGFuY2UncyAkZGF0YS4gQ2FsbGVkIGluICRkYXRhJ3Mgc2V0dGVyLlxuLy8gICpcbi8vICAqIEBwYXJhbSB7T2JqZWN0fSBuZXdEYXRhXG4vLyAgKi9cblxuLy8gZXhwb3J0cy5fc2V0RGF0YSA9IGZ1bmN0aW9uIChuZXdEYXRhKSB7XG4vLyAgIG5ld0RhdGEgPSBuZXdEYXRhIHx8IHt9XG4vLyAgIHZhciBvbGREYXRhID0gdGhpcy5fZGF0YVxuLy8gICB0aGlzLl9kYXRhID0gbmV3RGF0YVxuLy8gICB2YXIga2V5cywga2V5LCBpXG4vLyAgIC8vIHVucHJveHkga2V5cyBub3QgcHJlc2VudCBpbiBuZXcgZGF0YVxuLy8gICBrZXlzID0gT2JqZWN0LmtleXMob2xkRGF0YSlcbi8vICAgaSA9IGtleXMubGVuZ3RoXG4vLyAgIHdoaWxlIChpLS0pIHtcbi8vICAgICBrZXkgPSBrZXlzW2ldXG4vLyAgICAgaWYgKCFfLmlzUmVzZXJ2ZWQoa2V5KSAmJiAhKGtleSBpbiBuZXdEYXRhKSkge1xuLy8gICAgICAgdGhpcy5fdW5wcm94eShrZXkpXG4vLyAgICAgfVxuLy8gICB9XG4vLyAgIC8vIHByb3h5IGtleXMgbm90IGFscmVhZHkgcHJveGllZCxcbi8vICAgLy8gYW5kIHRyaWdnZXIgY2hhbmdlIGZvciBjaGFuZ2VkIHZhbHVlc1xuLy8gICBrZXlzID0gT2JqZWN0LmtleXMobmV3RGF0YSlcbi8vICAgaSA9IGtleXMubGVuZ3RoXG4vLyAgIHdoaWxlIChpLS0pIHtcbi8vICAgICBrZXkgPSBrZXlzW2ldXG4vLyAgICAgaWYgKCF0aGlzLmhhc093blByb3BlcnR5KGtleSkgJiYgIV8uaXNSZXNlcnZlZChrZXkpKSB7XG4vLyAgICAgICAvLyBuZXcgcHJvcGVydHlcbi8vICAgICAgIHRoaXMuX3Byb3h5KGtleSlcbi8vICAgICB9XG4vLyAgIH1cbi8vICAgb2xkRGF0YS5fX29iX18ucmVtb3ZlVm0odGhpcylcbi8vICAgT2JzZXJ2ZXIuY3JlYXRlKG5ld0RhdGEpLmFkZFZtKHRoaXMpXG4vLyAgIHRoaXMuX2RpZ2VzdCgpXG4vLyB9XG5cbi8qKlxuICogUHJveHkgYSBwcm9wZXJ0eSwgc28gdGhhdFxuICogdm0ucHJvcCA9PT0gdm0uX2RhdGEucHJvcFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAqL1xuXG5leHBvcnRzLl9wcm94eSA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgLy8gbmVlZCB0byBzdG9yZSByZWYgdG8gc2VsZiBoZXJlXG4gIC8vIGJlY2F1c2UgdGhlc2UgZ2V0dGVyL3NldHRlcnMgbWlnaHRcbiAgLy8gYmUgY2FsbGVkIGJ5IGNoaWxkIGluc3RhbmNlcyFcbiAgdmFyIHNlbGYgPSB0aGlzXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzZWxmLCBrZXksIHtcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uIHByb3h5R2V0dGVyICgpIHtcbiAgICAgIHJldHVybiBzZWxmLl9kYXRhW2tleV1cbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24gcHJveHlTZXR0ZXIgKHZhbCkge1xuICAgICAgc2VsZi5fZGF0YVtrZXldID0gdmFsXG4gICAgfVxuICB9KVxufVxuXG4vKipcbiAqIFVucHJveHkgYSBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gKi9cblxuZXhwb3J0cy5fdW5wcm94eSA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgZGVsZXRlIHRoaXNba2V5XVxufVxuXG4vLyAvKipcbi8vICAqIEZvcmNlIHVwZGF0ZSBvbiBldmVyeSB3YXRjaGVyIGluIHNjb3BlLlxuLy8gICovXG5cbi8vIGV4cG9ydHMuX2RpZ2VzdCA9IGZ1bmN0aW9uICgpIHtcbi8vICAgdmFyIGkgPSB0aGlzLl93YXRjaGVycy5sZW5ndGhcbi8vICAgd2hpbGUgKGktLSkge1xuLy8gICAgIHRoaXMuX3dhdGNoZXJzW2ldLnVwZGF0ZSgpXG4vLyAgIH1cbi8vICAgdmFyIGNoaWxkcmVuID0gdGhpcy5fY2hpbGRyZW5cbi8vICAgaSA9IGNoaWxkcmVuLmxlbmd0aFxuLy8gICB3aGlsZSAoaS0tKSB7XG4vLyAgICAgdmFyIGNoaWxkID0gY2hpbGRyZW5baV1cbi8vICAgICBpZiAoY2hpbGQuJG9wdGlvbnMuaW5oZXJpdCkge1xuLy8gICAgICAgY2hpbGQuX2RpZ2VzdCgpXG4vLyAgICAgfVxuLy8gICB9XG4vLyB9XG5cbi8vIC8qKlxuLy8gICogU2V0dXAgY29tcHV0ZWQgcHJvcGVydGllcy4gVGhleSBhcmUgZXNzZW50aWFsbHlcbi8vICAqIHNwZWNpYWwgZ2V0dGVyL3NldHRlcnNcbi8vICAqL1xuXG4vLyBmdW5jdGlvbiBub29wICgpIHt9XG4vLyBleHBvcnRzLl9pbml0Q29tcHV0ZWQgPSBmdW5jdGlvbiAoKSB7XG4vLyAgIHZhciBjb21wdXRlZCA9IHRoaXMuJG9wdGlvbnMuY29tcHV0ZWRcbi8vICAgaWYgKGNvbXB1dGVkKSB7XG4vLyAgICAgZm9yICh2YXIga2V5IGluIGNvbXB1dGVkKSB7XG4vLyAgICAgICB2YXIgdXNlckRlZiA9IGNvbXB1dGVkW2tleV1cbi8vICAgICAgIHZhciBkZWYgPSB7XG4vLyAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4vLyAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuLy8gICAgICAgfVxuLy8gICAgICAgaWYgKHR5cGVvZiB1c2VyRGVmID09PSAnZnVuY3Rpb24nKSB7XG4vLyAgICAgICAgIGRlZi5nZXQgPSBfLmJpbmQodXNlckRlZiwgdGhpcylcbi8vICAgICAgICAgZGVmLnNldCA9IG5vb3Bcbi8vICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgIGRlZi5nZXQgPSB1c2VyRGVmLmdldFxuLy8gICAgICAgICAgID8gXy5iaW5kKHVzZXJEZWYuZ2V0LCB0aGlzKVxuLy8gICAgICAgICAgIDogbm9vcFxuLy8gICAgICAgICBkZWYuc2V0ID0gdXNlckRlZi5zZXRcbi8vICAgICAgICAgICA/IF8uYmluZCh1c2VyRGVmLnNldCwgdGhpcylcbi8vICAgICAgICAgICA6IG5vb3Bcbi8vICAgICAgIH1cbi8vICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBrZXksIGRlZilcbi8vICAgICB9XG4vLyAgIH1cbi8vIH1cblxuLyoqXG4gKiBTZXR1cCBpbnN0YW5jZSBtZXRob2RzLiBNZXRob2RzIG11c3QgYmUgYm91bmQgdG8gdGhlXG4gKiBpbnN0YW5jZSBzaW5jZSB0aGV5IG1pZ2h0IGJlIGNhbGxlZCBieSBjaGlsZHJlblxuICogaW5oZXJpdGluZyB0aGVtLlxuICovXG5cbmV4cG9ydHMuX2luaXRNZXRob2RzID0gZnVuY3Rpb24gKCkge1xuICAvLyB2YXIgbWV0aG9kcyA9IHRoaXMuJG9wdGlvbnMubWV0aG9kc1xuICB2YXIgbWV0aG9kcyA9IHRoaXMuX21ldGhvZHNcbiAgaWYgKG1ldGhvZHMpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gbWV0aG9kcykge1xuICAgICAgdGhpc1trZXldID0gXy5iaW5kKG1ldGhvZHNba2V5XSwgdGhpcylcbiAgICB9XG4gIH1cbn1cblxuLy8gLyoqXG4vLyAgKiBJbml0aWFsaXplIG1ldGEgaW5mb3JtYXRpb24gbGlrZSAkaW5kZXgsICRrZXkgJiAkdmFsdWUuXG4vLyAgKi9cblxuLy8gZXhwb3J0cy5faW5pdE1ldGEgPSBmdW5jdGlvbiAoKSB7XG4vLyAgIHZhciBtZXRhcyA9IHRoaXMuJG9wdGlvbnMuX21ldGFcbi8vICAgaWYgKG1ldGFzKSB7XG4vLyAgICAgZm9yICh2YXIga2V5IGluIG1ldGFzKSB7XG4vLyAgICAgICB0aGlzLl9kZWZpbmVNZXRhKGtleSwgbWV0YXNba2V5XSlcbi8vICAgICB9XG4vLyAgIH1cbi8vIH1cblxuLy8gLyoqXG4vLyAgKiBEZWZpbmUgYSBtZXRhIHByb3BlcnR5LCBlLmcgJGluZGV4LCAka2V5LCAkdmFsdWVcbi8vICAqIHdoaWNoIG9ubHkgZXhpc3RzIG9uIHRoZSB2bSBpbnN0YW5jZSBidXQgbm90IGluICRkYXRhLlxuLy8gICpcbi8vICAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbi8vICAqIEBwYXJhbSB7Kn0gdmFsdWVcbi8vICAqL1xuXG4vLyBleHBvcnRzLl9kZWZpbmVNZXRhID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbi8vICAgdmFyIGRlcCA9IG5ldyBEZXAoKVxuLy8gICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywga2V5LCB7XG4vLyAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbi8vICAgICBjb25maWd1cmFibGU6IHRydWUsXG4vLyAgICAgZ2V0OiBmdW5jdGlvbiBtZXRhR2V0dGVyICgpIHtcbi8vICAgICAgIGlmIChPYnNlcnZlci50YXJnZXQpIHtcbi8vICAgICAgICAgT2JzZXJ2ZXIudGFyZ2V0LmFkZERlcChkZXApXG4vLyAgICAgICB9XG4vLyAgICAgICByZXR1cm4gdmFsdWVcbi8vICAgICB9LFxuLy8gICAgIHNldDogZnVuY3Rpb24gbWV0YVNldHRlciAodmFsKSB7XG4vLyAgICAgICBpZiAodmFsICE9PSB2YWx1ZSkge1xuLy8gICAgICAgICB2YWx1ZSA9IHZhbFxuLy8gICAgICAgICBkZXAubm90aWZ5KClcbi8vICAgICAgIH1cbi8vICAgICB9XG4vLyAgIH0pXG4vLyB9XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2xpYi92bS9pbnN0YW5jZS9zY29wZS5qc1xuICoqLyIsIi8vIHJlcXVpcmVkIGZvciBjb2RlIGluIGluc3RhbmNlL29ic2VydmVyXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL3V0aWwnKVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vbGliL3ZtL3V0aWwuanNcbiAqKi8iLCJ2YXIgXyA9IHJlcXVpcmUoJy4uL3V0aWwnKVxudmFyIGNvbmZpZyA9IHJlcXVpcmUoJy4uL2NvbmZpZycpXG52YXIgRGVwID0gcmVxdWlyZSgnLi9kZXAnKVxudmFyIGFycmF5TWV0aG9kcyA9IHJlcXVpcmUoJy4vYXJyYXknKVxudmFyIGFycmF5S2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGFycmF5TWV0aG9kcylcbnJlcXVpcmUoJy4vb2JqZWN0JylcblxudmFyIHVpZCA9IDBcblxuLyoqXG4gKiBUeXBlIGVudW1zXG4gKi9cblxudmFyIEFSUkFZICA9IDBcbnZhciBPQkpFQ1QgPSAxXG5cbi8qKlxuICogQXVnbWVudCBhbiB0YXJnZXQgT2JqZWN0IG9yIEFycmF5IGJ5IGludGVyY2VwdGluZ1xuICogdGhlIHByb3RvdHlwZSBjaGFpbiB1c2luZyBfX3Byb3RvX19cbiAqXG4gKiBAcGFyYW0ge09iamVjdHxBcnJheX0gdGFyZ2V0XG4gKiBAcGFyYW0ge09iamVjdH0gcHJvdG9cbiAqL1xuXG5mdW5jdGlvbiBwcm90b0F1Z21lbnQgKHRhcmdldCwgc3JjKSB7XG4gIHRhcmdldC5fX3Byb3RvX18gPSBzcmNcbn1cblxuLyoqXG4gKiBBdWdtZW50IGFuIHRhcmdldCBPYmplY3Qgb3IgQXJyYXkgYnkgZGVmaW5pbmdcbiAqIGhpZGRlbiBwcm9wZXJ0aWVzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fSB0YXJnZXRcbiAqIEBwYXJhbSB7T2JqZWN0fSBwcm90b1xuICovXG5cbmZ1bmN0aW9uIGNvcHlBdWdtZW50ICh0YXJnZXQsIHNyYywga2V5cykge1xuICB2YXIgaSA9IGtleXMubGVuZ3RoXG4gIHZhciBrZXlcbiAgd2hpbGUgKGktLSkge1xuICAgIGtleSA9IGtleXNbaV1cbiAgICBfLmRlZmluZSh0YXJnZXQsIGtleSwgc3JjW2tleV0pXG4gIH1cbn1cblxuLyoqXG4gKiBPYnNlcnZlciBjbGFzcyB0aGF0IGFyZSBhdHRhY2hlZCB0byBlYWNoIG9ic2VydmVkXG4gKiBvYmplY3QuIE9uY2UgYXR0YWNoZWQsIHRoZSBvYnNlcnZlciBjb252ZXJ0cyB0YXJnZXRcbiAqIG9iamVjdCdzIHByb3BlcnR5IGtleXMgaW50byBnZXR0ZXIvc2V0dGVycyB0aGF0XG4gKiBjb2xsZWN0IGRlcGVuZGVuY2llcyBhbmQgZGlzcGF0Y2hlcyB1cGRhdGVzLlxuICpcbiAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSB2YWx1ZVxuICogQHBhcmFtIHtOdW1iZXJ9IHR5cGVcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5cbmZ1bmN0aW9uIE9ic2VydmVyICh2YWx1ZSwgdHlwZSkge1xuICB0aGlzLmlkID0gKyt1aWRcbiAgdGhpcy52YWx1ZSA9IHZhbHVlXG4gIHRoaXMuYWN0aXZlID0gdHJ1ZVxuICB0aGlzLmRlcHMgPSBbXVxuICBfLmRlZmluZSh2YWx1ZSwgJ19fb2JfXycsIHRoaXMpXG4gIGlmICh0eXBlID09PSBBUlJBWSkge1xuICAgIHZhciBhdWdtZW50ID0gY29uZmlnLnByb3RvICYmIF8uaGFzUHJvdG9cbiAgICAgID8gcHJvdG9BdWdtZW50XG4gICAgICA6IGNvcHlBdWdtZW50XG4gICAgYXVnbWVudCh2YWx1ZSwgYXJyYXlNZXRob2RzLCBhcnJheUtleXMpXG4gICAgdGhpcy5vYnNlcnZlQXJyYXkodmFsdWUpXG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gT0JKRUNUKSB7XG4gICAgdGhpcy53YWxrKHZhbHVlKVxuICB9XG59XG5cbk9ic2VydmVyLnRhcmdldCA9IG51bGxcblxudmFyIHAgPSBPYnNlcnZlci5wcm90b3R5cGVcblxuLyoqXG4gKiBBdHRlbXB0IHRvIGNyZWF0ZSBhbiBvYnNlcnZlciBpbnN0YW5jZSBmb3IgYSB2YWx1ZSxcbiAqIHJldHVybnMgdGhlIG5ldyBvYnNlcnZlciBpZiBzdWNjZXNzZnVsbHkgb2JzZXJ2ZWQsXG4gKiBvciB0aGUgZXhpc3Rpbmcgb2JzZXJ2ZXIgaWYgdGhlIHZhbHVlIGFscmVhZHkgaGFzIG9uZS5cbiAqXG4gKiBAcGFyYW0geyp9IHZhbHVlXG4gKiBAcmV0dXJuIHtPYnNlcnZlcnx1bmRlZmluZWR9XG4gKiBAc3RhdGljXG4gKi9cblxuT2JzZXJ2ZXIuY3JlYXRlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gIGlmIChcbiAgICB2YWx1ZSAmJlxuICAgIHZhbHVlLmhhc093blByb3BlcnR5KCdfX29iX18nKSAmJlxuICAgIHZhbHVlLl9fb2JfXyBpbnN0YW5jZW9mIE9ic2VydmVyXG4gICkge1xuICAgIHJldHVybiB2YWx1ZS5fX29iX19cbiAgfSBlbHNlIGlmIChfLmlzQXJyYXkodmFsdWUpKSB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZlcih2YWx1ZSwgQVJSQVkpXG4gIH0gZWxzZSBpZiAoXG4gICAgXy5pc1BsYWluT2JqZWN0KHZhbHVlKSAmJlxuICAgICF2YWx1ZS5faXNWdWUgLy8gYXZvaWQgVnVlIGluc3RhbmNlXG4gICkge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2ZXIodmFsdWUsIE9CSkVDVClcbiAgfVxufVxuXG4vKipcbiAqIFdhbGsgdGhyb3VnaCBlYWNoIHByb3BlcnR5IGFuZCBjb252ZXJ0IHRoZW0gaW50b1xuICogZ2V0dGVyL3NldHRlcnMuIFRoaXMgbWV0aG9kIHNob3VsZCBvbmx5IGJlIGNhbGxlZCB3aGVuXG4gKiB2YWx1ZSB0eXBlIGlzIE9iamVjdC4gUHJvcGVydGllcyBwcmVmaXhlZCB3aXRoIGAkYCBvciBgX2BcbiAqIGFuZCBhY2Nlc3NvciBwcm9wZXJ0aWVzIGFyZSBpZ25vcmVkLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqL1xuXG5wLndhbGsgPSBmdW5jdGlvbiAob2JqKSB7XG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqKVxuICB2YXIgaSA9IGtleXMubGVuZ3RoXG4gIHZhciBrZXksIHByZWZpeFxuICB3aGlsZSAoaS0tKSB7XG4gICAga2V5ID0ga2V5c1tpXVxuICAgIHByZWZpeCA9IGtleS5jaGFyQ29kZUF0KDApXG4gICAgaWYgKHByZWZpeCAhPT0gMHgyNCAmJiBwcmVmaXggIT09IDB4NUYpIHsgLy8gc2tpcCAkIG9yIF9cbiAgICAgIHRoaXMuY29udmVydChrZXksIG9ialtrZXldKVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIFRyeSB0byBjYXJldGUgYW4gb2JzZXJ2ZXIgZm9yIGEgY2hpbGQgdmFsdWUsXG4gKiBhbmQgaWYgdmFsdWUgaXMgYXJyYXksIGxpbmsgZGVwIHRvIHRoZSBhcnJheS5cbiAqXG4gKiBAcGFyYW0geyp9IHZhbFxuICogQHJldHVybiB7RGVwfHVuZGVmaW5lZH1cbiAqL1xuXG5wLm9ic2VydmUgPSBmdW5jdGlvbiAodmFsKSB7XG4gIHJldHVybiBPYnNlcnZlci5jcmVhdGUodmFsKVxufVxuXG4vKipcbiAqIE9ic2VydmUgYSBsaXN0IG9mIEFycmF5IGl0ZW1zLlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IGl0ZW1zXG4gKi9cblxucC5vYnNlcnZlQXJyYXkgPSBmdW5jdGlvbiAoaXRlbXMpIHtcbiAgdmFyIGkgPSBpdGVtcy5sZW5ndGhcbiAgd2hpbGUgKGktLSkge1xuICAgIHRoaXMub2JzZXJ2ZShpdGVtc1tpXSlcbiAgfVxufVxuXG4vKipcbiAqIENvbnZlcnQgYSBwcm9wZXJ0eSBpbnRvIGdldHRlci9zZXR0ZXIgc28gd2UgY2FuIGVtaXRcbiAqIHRoZSBldmVudHMgd2hlbiB0aGUgcHJvcGVydHkgaXMgYWNjZXNzZWQvY2hhbmdlZC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gKiBAcGFyYW0geyp9IHZhbFxuICovXG5cbnAuY29udmVydCA9IGZ1bmN0aW9uIChrZXksIHZhbCkge1xuICB2YXIgb2IgPSB0aGlzXG4gIHZhciBjaGlsZE9iID0gb2Iub2JzZXJ2ZSh2YWwpXG4gIHZhciBkZXAgPSBuZXcgRGVwKClcbiAgaWYgKGNoaWxkT2IpIHtcbiAgICBjaGlsZE9iLmRlcHMucHVzaChkZXApXG4gIH1cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iLnZhbHVlLCBrZXksIHtcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIE9ic2VydmVyLnRhcmdldCBpcyBhIHdhdGNoZXIgd2hvc2UgZ2V0dGVyIGlzXG4gICAgICAvLyBjdXJyZW50bHkgYmVpbmcgZXZhbHVhdGVkLlxuICAgICAgaWYgKG9iLmFjdGl2ZSAmJiBPYnNlcnZlci50YXJnZXQpIHtcbiAgICAgICAgT2JzZXJ2ZXIudGFyZ2V0LmFkZERlcChkZXApXG4gICAgICB9XG4gICAgICByZXR1cm4gdmFsXG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uIChuZXdWYWwpIHtcbiAgICAgIGlmIChuZXdWYWwgPT09IHZhbCkgcmV0dXJuXG4gICAgICAvLyByZW1vdmUgZGVwIGZyb20gb2xkIHZhbHVlXG4gICAgICB2YXIgb2xkQ2hpbGRPYiA9IHZhbCAmJiB2YWwuX19vYl9fXG4gICAgICBpZiAob2xkQ2hpbGRPYikge1xuICAgICAgICBvbGRDaGlsZE9iLmRlcHMuJHJlbW92ZShkZXApXG4gICAgICB9XG4gICAgICB2YWwgPSBuZXdWYWxcbiAgICAgIC8vIGFkZCBkZXAgdG8gbmV3IHZhbHVlXG4gICAgICB2YXIgbmV3Q2hpbGRPYiA9IG9iLm9ic2VydmUobmV3VmFsKVxuICAgICAgaWYgKG5ld0NoaWxkT2IpIHtcbiAgICAgICAgbmV3Q2hpbGRPYi5kZXBzLnB1c2goZGVwKVxuICAgICAgfVxuICAgICAgZGVwLm5vdGlmeSgpXG4gICAgfVxuICB9KVxufVxuXG4vKipcbiAqIE5vdGlmeSBjaGFuZ2Ugb24gYWxsIHNlbGYgZGVwcyBvbiBhbiBvYnNlcnZlci5cbiAqIFRoaXMgaXMgY2FsbGVkIHdoZW4gYSBtdXRhYmxlIHZhbHVlIG11dGF0ZXMuIGUuZy5cbiAqIHdoZW4gYW4gQXJyYXkncyBtdXRhdGluZyBtZXRob2RzIGFyZSBjYWxsZWQsIG9yIGFuXG4gKiBPYmplY3QncyAkYWRkLyRkZWxldGUgYXJlIGNhbGxlZC5cbiAqL1xuXG5wLm5vdGlmeSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGRlcHMgPSB0aGlzLmRlcHNcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBkZXBzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGRlcHNbaV0ubm90aWZ5KClcbiAgfVxufVxuXG4vKipcbiAqIEFkZCBhbiBvd25lciB2bSwgc28gdGhhdCB3aGVuICRhZGQvJGRlbGV0ZSBtdXRhdGlvbnNcbiAqIGhhcHBlbiB3ZSBjYW4gbm90aWZ5IG93bmVyIHZtcyB0byBwcm94eSB0aGUga2V5cyBhbmRcbiAqIGRpZ2VzdCB0aGUgd2F0Y2hlcnMuIFRoaXMgaXMgb25seSBjYWxsZWQgd2hlbiB0aGUgb2JqZWN0XG4gKiBpcyBvYnNlcnZlZCBhcyBhbiBpbnN0YW5jZSdzIHJvb3QgJGRhdGEuXG4gKlxuICogQHBhcmFtIHtWdWV9IHZtXG4gKi9cblxucC5hZGRWbSA9IGZ1bmN0aW9uICh2bSkge1xuICAodGhpcy52bXMgPSB0aGlzLnZtcyB8fCBbXSkucHVzaCh2bSlcbn1cblxuLyoqXG4gKiBSZW1vdmUgYW4gb3duZXIgdm0uIFRoaXMgaXMgY2FsbGVkIHdoZW4gdGhlIG9iamVjdCBpc1xuICogc3dhcHBlZCBvdXQgYXMgYW4gaW5zdGFuY2UncyAkZGF0YSBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtWdWV9IHZtXG4gKi9cblxucC5yZW1vdmVWbSA9IGZ1bmN0aW9uICh2bSkge1xuICB0aGlzLnZtcy4kcmVtb3ZlKHZtKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IE9ic2VydmVyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2xpYi92bS9vYnNlcnZlci9pbmRleC5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0ge3Byb3RvOiB0cnVlfVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9saWIvdm0vY29uZmlnLmpzXG4gKiovIiwidmFyIF8gPSByZXF1aXJlKCcuLi91dGlsJylcblxuLyoqXG4gKiBBIGRlcCBpcyBhbiBvYnNlcnZhYmxlIHRoYXQgY2FuIGhhdmUgbXVsdGlwbGVcbiAqIGRpcmVjdGl2ZXMgc3Vic2NyaWJpbmcgdG8gaXQuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKi9cblxuZnVuY3Rpb24gRGVwICgpIHtcbiAgdGhpcy5zdWJzID0gW11cbn1cblxudmFyIHAgPSBEZXAucHJvdG90eXBlXG5cbi8qKlxuICogQWRkIGEgZGlyZWN0aXZlIHN1YnNjcmliZXIuXG4gKlxuICogQHBhcmFtIHtEaXJlY3RpdmV9IHN1YlxuICovXG5cbnAuYWRkU3ViID0gZnVuY3Rpb24gKHN1Yikge1xuICB0aGlzLnN1YnMucHVzaChzdWIpXG59XG5cbi8qKlxuICogUmVtb3ZlIGEgZGlyZWN0aXZlIHN1YnNjcmliZXIuXG4gKlxuICogQHBhcmFtIHtEaXJlY3RpdmV9IHN1YlxuICovXG5cbnAucmVtb3ZlU3ViID0gZnVuY3Rpb24gKHN1Yikge1xuICB0aGlzLnN1YnMuJHJlbW92ZShzdWIpXG59XG5cbi8qKlxuICogTm90aWZ5IGFsbCBzdWJzY3JpYmVycyBvZiBhIG5ldyB2YWx1ZS5cbiAqL1xuXG5wLm5vdGlmeSA9IGZ1bmN0aW9uICgpIHtcbiAgLy8gc3RhYmxpemUgdGhlIHN1YnNjcmliZXIgbGlzdCBmaXJzdFxuICB2YXIgc3VicyA9IF8udG9BcnJheSh0aGlzLnN1YnMpXG4gIGZvciAodmFyIGkgPSAwLCBsID0gc3Vicy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBzdWJzW2ldLnVwZGF0ZSgpXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEZXBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2xpYi92bS9vYnNlcnZlci9kZXAuanNcbiAqKi8iLCJ2YXIgXyA9IHJlcXVpcmUoJy4uL3V0aWwnKVxudmFyIGFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGVcbnZhciBhcnJheU1ldGhvZHMgPSBPYmplY3QuY3JlYXRlKGFycmF5UHJvdG8pXG5cbi8qKlxuICogSW50ZXJjZXB0IG11dGF0aW5nIG1ldGhvZHMgYW5kIGVtaXQgZXZlbnRzXG4gKi9cblxuO1tcbiAgJ3B1c2gnLFxuICAncG9wJyxcbiAgJ3NoaWZ0JyxcbiAgJ3Vuc2hpZnQnLFxuICAnc3BsaWNlJyxcbiAgJ3NvcnQnLFxuICAncmV2ZXJzZSdcbl1cbi5mb3JFYWNoKGZ1bmN0aW9uIChtZXRob2QpIHtcbiAgLy8gY2FjaGUgb3JpZ2luYWwgbWV0aG9kXG4gIHZhciBvcmlnaW5hbCA9IGFycmF5UHJvdG9bbWV0aG9kXVxuICBfLmRlZmluZShhcnJheU1ldGhvZHMsIG1ldGhvZCwgZnVuY3Rpb24gbXV0YXRvciAoKSB7XG4gICAgLy8gYXZvaWQgbGVha2luZyBhcmd1bWVudHM6XG4gICAgLy8gaHR0cDovL2pzcGVyZi5jb20vY2xvc3VyZS13aXRoLWFyZ3VtZW50c1xuICAgIHZhciBpID0gYXJndW1lbnRzLmxlbmd0aFxuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGkpXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpXVxuICAgIH1cbiAgICB2YXIgcmVzdWx0ID0gb3JpZ2luYWwuYXBwbHkodGhpcywgYXJncylcbiAgICB2YXIgb2IgPSB0aGlzLl9fb2JfX1xuICAgIHZhciBpbnNlcnRlZFxuICAgIHN3aXRjaCAobWV0aG9kKSB7XG4gICAgICBjYXNlICdwdXNoJzpcbiAgICAgICAgaW5zZXJ0ZWQgPSBhcmdzXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICd1bnNoaWZ0JzpcbiAgICAgICAgaW5zZXJ0ZWQgPSBhcmdzXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICdzcGxpY2UnOlxuICAgICAgICBpbnNlcnRlZCA9IGFyZ3Muc2xpY2UoMilcbiAgICAgICAgYnJlYWtcbiAgICB9XG4gICAgaWYgKGluc2VydGVkKSBvYi5vYnNlcnZlQXJyYXkoaW5zZXJ0ZWQpXG4gICAgLy8gbm90aWZ5IGNoYW5nZVxuICAgIG9iLm5vdGlmeSgpXG4gICAgcmV0dXJuIHJlc3VsdFxuICB9KVxufSlcblxuLyoqXG4gKiBTd2FwIHRoZSBlbGVtZW50IGF0IHRoZSBnaXZlbiBpbmRleCB3aXRoIGEgbmV3IHZhbHVlXG4gKiBhbmQgZW1pdHMgY29ycmVzcG9uZGluZyBldmVudC5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gaW5kZXhcbiAqIEBwYXJhbSB7Kn0gdmFsXG4gKiBAcmV0dXJuIHsqfSAtIHJlcGxhY2VkIGVsZW1lbnRcbiAqL1xuXG5fLmRlZmluZShcbiAgYXJyYXlQcm90byxcbiAgJyRzZXQnLFxuICBmdW5jdGlvbiAkc2V0IChpbmRleCwgdmFsKSB7XG4gICAgaWYgKGluZGV4ID49IHRoaXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmxlbmd0aCA9IGluZGV4ICsgMVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5zcGxpY2UoaW5kZXgsIDEsIHZhbClbMF1cbiAgfVxuKVxuXG4vKipcbiAqIENvbnZlbmllbmNlIG1ldGhvZCB0byByZW1vdmUgdGhlIGVsZW1lbnQgYXQgZ2l2ZW4gaW5kZXguXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4XG4gKiBAcGFyYW0geyp9IHZhbFxuICovXG5cbl8uZGVmaW5lKFxuICBhcnJheVByb3RvLFxuICAnJHJlbW92ZScsXG4gIGZ1bmN0aW9uICRyZW1vdmUgKGluZGV4KSB7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKCF0aGlzLmxlbmd0aCkgcmV0dXJuXG4gICAgaWYgKHR5cGVvZiBpbmRleCAhPT0gJ251bWJlcicpIHtcbiAgICAgIGluZGV4ID0gXy5pbmRleE9mKHRoaXMsIGluZGV4KVxuICAgIH1cbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgdGhpcy5zcGxpY2UoaW5kZXgsIDEpXG4gICAgfVxuICB9XG4pXG5cbm1vZHVsZS5leHBvcnRzID0gYXJyYXlNZXRob2RzXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9saWIvdm0vb2JzZXJ2ZXIvYXJyYXkuanNcbiAqKi8iLCJ2YXIgXyA9IHJlcXVpcmUoJy4uL3V0aWwnKVxudmFyIG9ialByb3RvID0gT2JqZWN0LnByb3RvdHlwZVxuXG4vKipcbiAqIEFkZCBhIG5ldyBwcm9wZXJ0eSB0byBhbiBvYnNlcnZlZCBvYmplY3RcbiAqIGFuZCBlbWl0cyBjb3JyZXNwb25kaW5nIGV2ZW50XG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICogQHBhcmFtIHsqfSB2YWxcbiAqIEBwdWJsaWNcbiAqL1xuXG5fLmRlZmluZShcbiAgb2JqUHJvdG8sXG4gICckYWRkJyxcbiAgZnVuY3Rpb24gJGFkZCAoa2V5LCB2YWwpIHtcbiAgICBpZiAodGhpcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSByZXR1cm5cbiAgICB2YXIgb2IgPSB0aGlzLl9fb2JfX1xuICAgIGlmICghb2IgfHwgXy5pc1Jlc2VydmVkKGtleSkpIHtcbiAgICAgIHRoaXNba2V5XSA9IHZhbFxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIG9iLmNvbnZlcnQoa2V5LCB2YWwpXG4gICAgb2Iubm90aWZ5KClcbiAgICBpZiAob2Iudm1zKSB7XG4gICAgICB2YXIgaSA9IG9iLnZtcy5sZW5ndGhcbiAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgdmFyIHZtID0gb2Iudm1zW2ldXG4gICAgICAgIHZtLl9wcm94eShrZXkpXG4gICAgICAgIC8vIHZtLl9kaWdlc3QoKSAvLyB0b2RvXG4gICAgICB9XG4gICAgfVxuICB9XG4pXG5cbi8qKlxuICogU2V0IGEgcHJvcGVydHkgb24gYW4gb2JzZXJ2ZWQgb2JqZWN0LCBjYWxsaW5nIGFkZCB0b1xuICogZW5zdXJlIHRoZSBwcm9wZXJ0eSBpcyBvYnNlcnZlZC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gKiBAcGFyYW0geyp9IHZhbFxuICogQHB1YmxpY1xuICovXG5cbl8uZGVmaW5lKFxuICBvYmpQcm90byxcbiAgJyRzZXQnLFxuICBmdW5jdGlvbiAkc2V0IChrZXksIHZhbCkge1xuICAgIHRoaXMuJGFkZChrZXksIHZhbClcbiAgICB0aGlzW2tleV0gPSB2YWxcbiAgfVxuKVxuXG4vKipcbiAqIERlbGV0ZXMgYSBwcm9wZXJ0eSBmcm9tIGFuIG9ic2VydmVkIG9iamVjdFxuICogYW5kIGVtaXRzIGNvcnJlc3BvbmRpbmcgZXZlbnRcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gKiBAcHVibGljXG4gKi9cblxuXy5kZWZpbmUoXG4gIG9ialByb3RvLFxuICAnJGRlbGV0ZScsXG4gIGZ1bmN0aW9uICRkZWxldGUgKGtleSkge1xuICAgIGlmICghdGhpcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSByZXR1cm5cbiAgICBkZWxldGUgdGhpc1trZXldXG4gICAgdmFyIG9iID0gdGhpcy5fX29iX19cbiAgICBpZiAoIW9iIHx8IF8uaXNSZXNlcnZlZChrZXkpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgb2Iubm90aWZ5KClcbiAgICBpZiAob2Iudm1zKSB7XG4gICAgICB2YXIgaSA9IG9iLnZtcy5sZW5ndGhcbiAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgdmFyIHZtID0gb2Iudm1zW2ldXG4gICAgICAgIHZtLl91bnByb3h5KGtleSlcbiAgICAgICAgLy8gdm0uX2RpZ2VzdCgpIC8vIHRvZG9cbiAgICAgIH1cbiAgICB9XG4gIH1cbilcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vbGliL3ZtL29ic2VydmVyL29iamVjdC5qc1xuICoqLyIsIiAvKipcbiAqIEBmaWxlT3ZlcnZpZXdcbiAqIFZpZXdNb2RlbCB0ZW1wbGF0ZSBwYXJzZXIgJiBkYXRhLWJpbmRpbmcgcHJvY2Vzc1xuICpcbiAqIHJlcXVpcmVkOlxuICogaW5kZXguanM6IFZtXG4gKiBkb20taGVscGVyLmpzOiBfY3JlYXRlRWxlbWVudCwgX2NyZWF0ZUJsb2NrXG4gKiBkb20taGVscGVyLmpzOiBfYXR0YWNoVGFyZ2V0LCBfbW92ZVRhcmdldCwgX3JlbW92ZVRhcmdldFxuICogZGlyZWN0aXZlLmpzOiBfYmluZEVsZW1lbnQsIF9iaW5kU3ViVm0sIF93YXRjaFxuICogZXZlbnRzLmpzOiAkb25cbiAqL1xuXG4vKipcbiAqIGJ1aWxkKGV4dGVybmFsRGlycylcbiAqICAgY3JlYXRlVm0oKVxuICogICBtZXJnZShleHRlcm5hbERpcnMsIGRpcnMpXG4gKiAgIGdlbmVyYXRlKHRlbXBsYXRlLCBwYXJlbnROb2RlKVxuICogICAgIGlmICh0eXBlIGlzIGNvbnRlbnQpIGNyZWF0ZSBjb250ZW50Tm9kZVxuICogICAgIGVsc2UgaWYgKGRpcnMgaGF2ZSB2LWZvcikgZm9yZWFjaCAtPiBjcmVhdGUgY29udGV4dFxuICogICAgICAgLT4gZ2VuZXJhdGUodGVtcGxhdGVXaXRob3V0Rm9yLCBwYXJlbnROb2RlKTogZGlmZihsaXN0KSBvbmNoYW5nZVxuICogICAgIGVsc2UgaWYgKGRpcnMgaGF2ZSB2LWlmKSBhc3NlcnRcbiAqICAgICAgIC0+IGdlbmVyYXRlKHRlbXBsYXRlV2l0aG91dElmLCBwYXJlbnROb2RlKTogdG9nZ2xlKHNob3duKSBvbmNoYW5nZVxuICogICAgIGVsc2UgaWYgKHR5cGUgaXMgbmF0aXZlKVxuICogICAgICAgc2V0KGRpcnMpOiB1cGRhdGUoaWQvYXR0ci9zdHlsZS9jbGFzcykgb25jaGFuZ2VcbiAqICAgICAgIGFwcGVuZCh0ZW1wbGF0ZSwgcGFyZW50Tm9kZSlcbiAqICAgICAgIGZvcmVhY2ggY2hpbGROb2RlcyAtPiBnZW5lcmF0ZShjaGlsZE5vZGUsIHRlbXBsYXRlKVxuICogICAgIGVsc2UgaWYgKHR5cGUgaXMgY3VzdG9tKVxuICogICAgICAgYWRkQ2hpbGRWbSh2bSwgcGFyZW50Vm0pXG4gKiAgICAgICBidWlsZChleHRlcm5hbERpcnMpXG4gKiAgICAgICBmb3JlYWNoIGNoaWxkTm9kZXMgLT4gZ2VuZXJhdGUoY2hpbGROb2RlLCB0ZW1wbGF0ZSlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9idWlsZCgpIHtcbiAgY29uc3Qgb3B0ID0gdGhpcy5fb3B0aW9ucyB8fCB7fVxuICBjb25zdCB0ZW1wbGF0ZSA9IG9wdC50ZW1wbGF0ZSB8fCB7fVxuXG4gIGlmIChvcHQucmVwbGFjZSkge1xuICAgIGlmICh0ZW1wbGF0ZS5jaGlsZHJlbiAmJiB0ZW1wbGF0ZS5jaGlsZHJlbi5sZW5ndGggPT09IDEpIHtcbiAgICAgIHRoaXMuX2dlbmVyYXRlKHRlbXBsYXRlLmNoaWxkcmVuWzBdLCB0aGlzLl9wYXJlbnRFbClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLl9nZW5lcmF0ZSh0ZW1wbGF0ZS5jaGlsZHJlbiwgdGhpcy5fcGFyZW50RWwpXG4gICAgfVxuICB9XG4gIGVsc2Uge1xuICAgIHRoaXMuX2dlbmVyYXRlKHRlbXBsYXRlLCB0aGlzLl9wYXJlbnRFbClcbiAgfVxuXG4gIHRoaXMuJGVtaXQoJ2hvb2s6cmVhZHknKVxuICB0aGlzLl9yZWFkeSA9IHRydWVcbn1cblxuLyoqXG4gKiBHZW5lcmF0ZSBlbGVtZW50cyBieSBjaGlsZCBvciBjaGlsZHJlbiBhbmQgYXBwZW5kIHRvIHBhcmVudCBlbGVtZW50cy5cbiAqIFJvb3QgZWxlbWVudCBpbmZvIHdvdWxkIGJlIG1lcmdlZCBpZiBoYXMuIFRoZSBmaXJzdCBhcmd1bWVudCBtYXkgYmUgYW4gYXJyYXlcbiAqIGlmIHRoZSByb290IGVsZW1lbnQgd2l0aCBvcHRpb25zLnJlcGxhY2UgaGFzIG5vdCBvbmx5IG9uZSBjaGlsZC5cbiAqXG4gKiBAcGFyYW0gIHtvYmplY3R8YXJyYXl9IHRhcmdldFxuICogQHBhcmFtICB7b2JqZWN0fSBwYXJlbnRFbFxuICogQHBhcmFtICB7b2JqZWN0fSBjb250ZXh0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfZ2VuZXJhdGUodGFyZ2V0LCBwYXJlbnRFbCwgY29udGV4dCkge1xuXG4gIGlmIChBcnJheS5pc0FycmF5KHRhcmdldCkpIHtcbiAgICBjb25zdCBmcmFnQmxvY2sgPSB0aGlzLl9jcmVhdGVCbG9jayhwYXJlbnRFbClcbiAgICB0YXJnZXQuZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgIHRoaXMuX2dlbmVyYXRlKGNoaWxkLCBmcmFnQmxvY2ssIGNvbnRleHQpXG4gICAgfSlcbiAgICByZXR1cm5cbiAgfVxuXG4gIGNvbnRleHQgPSBjb250ZXh0IHx8IHt9XG5cbiAgaWYgKHRhcmdldC50eXBlID09PSAnY29udGVudCcgfHwgdGFyZ2V0LnR5cGUgPT09ICdzbG90Jykge1xuICAgIHRoaXMuX2NvbnRlbnQgPSB0aGlzLl9jcmVhdGVCbG9jayhwYXJlbnRFbClcbiAgICByZXR1cm5cbiAgfVxuXG4gIGlmICghY29udGV4dC5oYXNPd25Qcm9wZXJ0eSgncmVwZWF0JykgJiYgdGFyZ2V0LnJlcGVhdCkge1xuICAgIGNvbnN0IGxpc3QgPSB0YXJnZXQucmVwZWF0LmNhbGwodGhpcylcbiAgICBjb25zdCByZXBlYXRJZCA9IGxhdGVzdFJlcGVhdElkKytcbiAgICBjb25zdCBsYXRlc3RJdGVtSWQgPSBtYXJrTGlzdChsaXN0LCByZXBlYXRJZClcblxuICAgIGNvbnN0IGZyYWdCbG9jayA9IHRoaXMuX2NyZWF0ZUJsb2NrKHBhcmVudEVsKVxuICAgIGZyYWdCbG9jay5jaGlsZHJlbiA9IFtdXG4gICAgZnJhZ0Jsb2NrLmRhdGEgPSBsaXN0LnNsaWNlKDApXG5cbiAgICB0aGlzLl9jaGVja1JlcGVhdCh0YXJnZXQsIGZyYWdCbG9jaywgcmVwZWF0SWQsIGxhdGVzdEl0ZW1JZClcblxuICAgIGxpc3QuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgIGlmICh0eXBlb2YgaXRlbSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgaXRlbS5JTkRFWCA9IGluZGV4XG4gICAgICB9XG4gICAgICB0aGlzLl9nZW5lcmF0ZSh0YXJnZXQsIGZyYWdCbG9jaywge3JlcGVhdDogaXRlbX0pXG4gICAgfSlcblxuICAgIHJldHVyblxuICB9XG5cbiAgbGV0IHN1YkNvbnRleHQgPSB0aGlzXG4gIGlmIChjb250ZXh0LnJlcGVhdCAmJiAhY29udGV4dC5zaG93bikge1xuICAgIHN1YkNvbnRleHQgPSB0aGlzLl9tZXJnZUNvbnRleHQoY29udGV4dC5yZXBlYXQpXG4gIH1cblxuICBpZiAoIWNvbnRleHQuaGFzT3duUHJvcGVydHkoJ3Nob3duJykgJiYgdGFyZ2V0LnNob3duKSB7XG4gICAgY29uc3QgZGlzcGxheSA9IHRhcmdldC5zaG93bi5jYWxsKHN1YkNvbnRleHQpXG4gICAgY29uc3QgbmV3Q29udGV4dCA9IHtzaG93bjogdHJ1ZX1cbiAgICBjb25zdCBmcmFnQmxvY2sgPSBzdWJDb250ZXh0Ll9jcmVhdGVCbG9jayhwYXJlbnRFbClcblxuICAgIGlmIChwYXJlbnRFbC5lbGVtZW50ICYmIHBhcmVudEVsLmNoaWxkcmVuKSB7XG4gICAgICBwYXJlbnRFbC5jaGlsZHJlbi5wdXNoKGZyYWdCbG9jaylcbiAgICB9XG5cbiAgICBpZiAoY29udGV4dC5yZXBlYXQpIHtcbiAgICAgIG5ld0NvbnRleHQucmVwZWF0ID0gY29udGV4dC5yZXBlYXRcbiAgICB9XG5cbiAgICBmcmFnQmxvY2suZGlzcGxheSA9ICEhZGlzcGxheVxuICAgIHN1YkNvbnRleHQuX2NoZWNrRGlzcGxheSh0YXJnZXQsIGZyYWdCbG9jaywgbmV3Q29udGV4dClcblxuICAgIGlmIChkaXNwbGF5KSB7XG4gICAgICBzdWJDb250ZXh0Ll9nZW5lcmF0ZSh0YXJnZXQsIGZyYWdCbG9jaywgbmV3Q29udGV4dClcbiAgICB9XG5cbiAgICByZXR1cm5cbiAgfVxuXG4gIGxldCB0eXBlR2V0dGVyID0gdGFyZ2V0LnR5cGVcbiAgbGV0IHR5cGUgPSB0eXBlR2V0dGVyXG5cbiAgaWYgKHR5cGVvZiB0eXBlR2V0dGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgdHlwZSA9IHR5cGVHZXR0ZXIuY2FsbChzdWJDb250ZXh0KVxuXG4gICAgaWYgKCFjb250ZXh0Lmhhc093blByb3BlcnR5KCd0eXBlJykpIHtcbiAgICAgIGNvbnN0IG5ld0NvbnRleHQgPSB7dHlwZTogdHlwZX1cbiAgICAgIGNvbnN0IGZyYWdCbG9jayA9IHN1YkNvbnRleHQuX2NyZWF0ZUJsb2NrKHBhcmVudEVsKVxuXG4gICAgICBpZiAocGFyZW50RWwuZWxlbWVudCAmJiBwYXJlbnRFbC5jaGlsZHJlbikge1xuICAgICAgICBwYXJlbnRFbC5jaGlsZHJlbi5wdXNoKGZyYWdCbG9jaylcbiAgICAgIH1cblxuICAgICAgc3ViQ29udGV4dC5fd2F0Y2godHlwZUdldHRlciwgKHZhbHVlKSA9PiB7XG4gICAgICAgIHN1YkNvbnRleHQuX3JlbW92ZUJsb2NrKGZyYWdCbG9jaywgdHJ1ZSlcbiAgICAgICAgc3ViQ29udGV4dC5fZ2VuZXJhdGUodGFyZ2V0LCBmcmFnQmxvY2ssIHt0eXBlOiB2YWx1ZX0pXG4gICAgICB9KVxuXG4gICAgICBzdWJDb250ZXh0Ll9nZW5lcmF0ZSh0YXJnZXQsIGZyYWdCbG9jaywgbmV3Q29udGV4dClcblxuICAgICAgcmV0dXJuXG4gICAgfVxuICB9XG5cbiAgbGV0IGlzQ29tcG9uZW50XG4gIGlmICh0aGlzLl9hcHAgJiYgdGhpcy5fYXBwLmN1c3RvbUNvbXBvbmVudE1hcCAmJiB0eXBlKSB7XG4gICAgaXNDb21wb25lbnQgPSB0aGlzLl9hcHAuY3VzdG9tQ29tcG9uZW50TWFwW3R5cGVdXG4gIH1cbiAgZWxzZSB7XG4gICAgaXNDb21wb25lbnQgPSB0YXJnZXQuY29tcG9uZW50XG4gIH1cblxuICBpZiAoaXNDb21wb25lbnQpIHtcbiAgICBjb25zdCBWbSA9IHRoaXMuY29uc3RydWN0b3JcbiAgICBjb25zdCBzdWJWbSA9IG5ldyBWbSh0eXBlLCBzdWJDb250ZXh0LCBwYXJlbnRFbCwgdW5kZWZpbmVkLCB7XG4gICAgICAnaG9vazppbml0JzogZnVuY3Rpb24gKCkge1xuICAgICAgICBzdWJDb250ZXh0Ll9zZXRJZCh0YXJnZXQuaWQsIG51bGwsIHRoaXMpXG4gICAgICB9LFxuICAgICAgJ2hvb2s6Y3JlYXRlZCc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc3ViQ29udGV4dC5fYmluZFN1YlZtKHRoaXMsIHRhcmdldCwgY29udGV4dC5yZXBlYXQpXG4gICAgICB9LFxuICAgICAgJ2hvb2s6cmVhZHknOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9jb250ZW50KSB7XG4gICAgICAgICAgc3ViQ29udGV4dC5fc2V0Q2hpbGRyZW4odGFyZ2V0LCB0aGlzLl9jb250ZW50KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgICBzdWJDb250ZXh0Ll9iaW5kU3ViVm1BZnRlckluaXRpYWxpemVkKHN1YlZtLCB0YXJnZXQpXG4gICAgcmV0dXJuXG4gIH1cblxuICBjb25zdCBlbGVtZW50ID0gc3ViQ29udGV4dC5fZ2VuZXJhdGVFbGVtZW50KHR5cGUsIHRhcmdldCwgcGFyZW50RWwpXG4gIGNvbnN0IHRyZWVNb2RlID0gdGFyZ2V0LmFwcGVuZCA9PT0gJ3RyZWUnXG4gIGlmICghdHJlZU1vZGUpIHtcbiAgICBzdWJDb250ZXh0Ll9hdHRhY2hUYXJnZXQoZWxlbWVudCwgcGFyZW50RWwpXG4gIH1cbiAgc3ViQ29udGV4dC5fc2V0Q2hpbGRyZW4odGFyZ2V0LCBlbGVtZW50KVxuICBpZiAodHJlZU1vZGUpIHtcbiAgICBzdWJDb250ZXh0Ll9hdHRhY2hUYXJnZXQoZWxlbWVudCwgcGFyZW50RWwpXG4gIH1cbn1cblxuLyoqXG4gKiBHZW5lcmF0ZSBlbGVtZW50IGZyb20gdGVtcGxhdGUgYW5kIGF0dGFjaCB0byB0aGUgZGVzdCBpZiBuZWVkZWQuXG4gKiBUaGUgdGltZSB0byBhdHRhY2ggZGVwZW5kcyBvbiB3aGV0aGVyIHRoZSBtb2RlIHN0YXR1cyBpcyBub2RlIG9yIHRyZWUuXG4gKlxuICogQHBhcmFtICB7b2JqZWN0fSB0ZW1wbGF0ZVxuICogQHBhcmFtICB7b2JqZWN0fSBkZXN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfZ2VuZXJhdGVFbGVtZW50KHR5cGUsIHRlbXBsYXRlLCBkZXN0KSB7XG5cbiAgdGhpcy5fYXBwbHlOYWl0dmVDb21wb25lbnRPcHRpb25zKHRlbXBsYXRlKVxuXG4gIGxldCBlbGVtZW50XG4gIGlmIChkZXN0LnJlZiA9PT0gJ19kb2N1bWVudEVsZW1lbnQnKSB7XG4gICAgLy8gaWYgaXRzIHBhcmVudCBpcyBkb2N1bWVudEVsZW1lbnQgdGhlbiBpdCdzIGEgYm9keVxuICAgIGVsZW1lbnQgPSB0aGlzLl9jcmVhdGVCb2R5KHR5cGUpXG4gIH0gZWxzZSB7XG4gICAgZWxlbWVudCA9IHRoaXMuX2NyZWF0ZUVsZW1lbnQodHlwZSlcbiAgfVxuICAvLyBUT0RPIGl0IHdhcyBhIHJvb3QgZWxlbWVudCB3aGVuIG5vdCBpbiBhIGZyYWdtZW50XG4gIGlmICghdGhpcy5fcm9vdEVsKSB7XG4gICAgdGhpcy5fcm9vdEVsID0gZWxlbWVudFxuICB9XG5cbiAgdGhpcy5fYmluZEVsZW1lbnQoZWxlbWVudCwgdGVtcGxhdGUpXG5cbiAgaWYgKHRlbXBsYXRlLmF0dHIgJiYgdGVtcGxhdGUuYXR0ci5hcHBlbmQpIHsgLy8gYmFja3dhcmQsIGFwcGVuZCBwcm9wIGluIGF0dHJcbiAgICBlbGVtZW50LmFwcGVuZCA9IHRlbXBsYXRlLmF0dHIuYXBwZW5kXG4gIH1cblxuICByZXR1cm4gZWxlbWVudFxufVxuXG4vKipcbiAqIFNldCBhbGwgY2hpbGRyZW4gdG8gYSBjZXJ0YWluIHBhcmVudCBlbGVtZW50LlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSB0ZW1wbGF0ZVxuICogQHBhcmFtIHtvYmplY3R9IHBhcmVudEVsXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfc2V0Q2hpbGRyZW4odGVtcGxhdGUsIHBhcmVudEVsKSB7XG4gIGNvbnN0IGNoaWxkcmVuID0gdGVtcGxhdGUuY2hpbGRyZW5cbiAgaWYgKGNoaWxkcmVuICYmIGNoaWxkcmVuLmxlbmd0aCkge1xuICAgIGNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiB7XG4gICAgICB0aGlzLl9nZW5lcmF0ZShjaGlsZCwgcGFyZW50RWwpXG4gICAgfSlcbiAgfVxufVxuXG4vKipcbiAqIFdhdGNoIHRoZSBsaXN0IHVwZGF0ZSBhbmQgcmVmcmVzaCB0aGUgY2hhbmdlcy5cbiAqXG4gKiBAcGFyYW0gIHtvYmplY3R9IHRhcmdldFxuICogQHBhcmFtICB7b2JqZWN0fSBmcmFnQmxvY2tcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9jaGVja1JlcGVhdCh0YXJnZXQsIGZyYWdCbG9jaywgcmVwZWF0SWQsIGxhdGVzdEl0ZW1JZCkge1xuICBjb25zdCBjaGlsZHJlbiA9IGZyYWdCbG9jay5jaGlsZHJlblxuXG4gIHRoaXMuX3dhdGNoQmxvY2soZnJhZ0Jsb2NrLCB0YXJnZXQucmVwZWF0LCAncmVwZWF0JywgKHZhbHVlKSA9PiB7XG4gICAgaWYgKCFmcmFnQmxvY2spIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IG9sZENoaWxkcmVuID0gY2hpbGRyZW4uc2xpY2UoKVxuICAgIGNvbnN0IG9sZFZhbHVlID0gZnJhZ0Jsb2NrLmRhdGEuc2xpY2UoKVxuICAgIC8vIDEuIGNvbGxlY3QgYWxsIG5ldyByZWZzIHRyYWNrIGJ5XG4gICAgY29uc3QgdHJhY2tNYXAgPSB7fVxuICAgIGNvbnN0IHJldXNlZE1hcCA9IHt9XG4gICAgdmFsdWUuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgIGxldCBrZXkgPSBpdGVtW2BfX3d4X3JlcGVhdF8ke3JlcGVhdElkfV9fYF1cbiAgICAgIGlmICgha2V5KSB7XG4gICAgICAgIGtleSA9IGxhdGVzdEl0ZW1JZCsrXG4gICAgICAgIHNldFJlcGVhdEl0ZW1JZChpdGVtLCByZXBlYXRJZCwga2V5KVxuICAgICAgfVxuICAgICAgdHJhY2tNYXBba2V5XSA9IGl0ZW1cbiAgICB9KVxuXG4gICAgLy8gMi4gcmVtb3ZlIHVudXNlZCBlbGVtZW50IGZvcmVhY2ggb2xkIGl0ZW1cbiAgICBjb25zdCByZXVzZWRMaXN0ID0gW11cbiAgICBvbGRWYWx1ZS5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3Qga2V5ID0gaXRlbVtgX193eF9yZXBlYXRfJHtyZXBlYXRJZH1fX2BdXG4gICAgICBpZiAodHJhY2tNYXAuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICByZXVzZWRNYXBba2V5XSA9IHtpdGVtLCBpbmRleCwgdGFyZ2V0OiBvbGRDaGlsZHJlbltpbmRleF19XG4gICAgICAgIHJldXNlZExpc3QucHVzaChpdGVtKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRoaXMuX3JlbW92ZVRhcmdldChvbGRDaGlsZHJlbltpbmRleF0pXG4gICAgICB9XG4gICAgfSlcblxuICAgIC8vIDMuIGNyZWF0ZSBuZXcgZWxlbWVudCBmb3JlYWNoIG5ldyBpdGVtXG4gICAgY2hpbGRyZW4ubGVuZ3RoID0gMFxuICAgIGZyYWdCbG9jay5kYXRhID0gdmFsdWUuc2xpY2UoKVxuICAgIGZyYWdCbG9jay51cGRhdGVNYXJrID0gZnJhZ0Jsb2NrLnN0YXJ0XG5cbiAgICB2YWx1ZS5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3Qga2V5ID0gaXRlbVtgX193eF9yZXBlYXRfJHtyZXBlYXRJZH1fX2BdXG4gICAgICBjb25zdCByZXVzZWQgPSByZXVzZWRNYXBba2V5XVxuICAgICAgaWYgKHR5cGVvZiBpdGVtID09PSAnb2JqZWN0Jykge1xuICAgICAgICBpdGVtLklOREVYID0gaW5kZXhcbiAgICAgIH1cbiAgICAgIGlmIChyZXVzZWQpIHtcbiAgICAgICAgaWYgKHJldXNlZC5pdGVtID09PSByZXVzZWRMaXN0WzBdKSB7XG4gICAgICAgICAgcmV1c2VkTGlzdC5zaGlmdCgpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV1c2VkTGlzdC4kcmVtb3ZlKHJldXNlZC5pdGVtKVxuICAgICAgICAgIHRoaXMuX21vdmVUYXJnZXQocmV1c2VkLnRhcmdldCwgZnJhZ0Jsb2NrLnVwZGF0ZU1hcmssIHRydWUpXG4gICAgICAgIH1cbiAgICAgICAgY2hpbGRyZW4ucHVzaChyZXVzZWQudGFyZ2V0KVxuICAgICAgICBmcmFnQmxvY2sudXBkYXRlTWFyayA9IHJldXNlZC50YXJnZXRcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB0aGlzLl9nZW5lcmF0ZSh0YXJnZXQsIGZyYWdCbG9jaywge3JlcGVhdDogaXRlbX0pXG4gICAgICB9XG4gICAgfSlcblxuICAgIGRlbGV0ZSBmcmFnQmxvY2sudXBkYXRlTWFya1xuICB9KVxufVxuXG5sZXQgbGF0ZXN0UmVwZWF0SWQgPSAxXG5cbmZ1bmN0aW9uIG1hcmtMaXN0KGxpc3QsIHJlcGVhdElkKSB7XG4gIGxldCBsYXRlc3RJdGVtSWQgPSAxXG4gIGxpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgIHNldFJlcGVhdEl0ZW1JZChpdGVtLCByZXBlYXRJZCwgbGF0ZXN0SXRlbUlkKyspXG4gIH0pXG4gIHJldHVybiBsYXRlc3RJdGVtSWRcbn1cblxuZnVuY3Rpb24gc2V0UmVwZWF0SXRlbUlkKGl0ZW0sIHJlcGVhdElkLCBpdGVtSWQpIHtcbiAgY29uc3Qga2V5ID0gYF9fd3hfcmVwZWF0XyR7cmVwZWF0SWR9X19gXG4gIGlmICh0eXBlb2YgaXRlbSA9PT0gJ29iamVjdCcpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoaXRlbSwga2V5LCB7XG4gICAgICB2YWx1ZTogaXRlbUlkXG4gICAgfSlcbiAgfVxufVxuXG4vKipcbiAqIFdhdGNoIHRoZSBkaXNwbGF5IHVwZGF0ZSBhbmQgYWRkL3JlbW92ZSB0aGUgZWxlbWVudC5cbiAqXG4gKiBAcGFyYW0gIHtvYmplY3R9IHRhcmdldFxuICogQHBhcmFtICB7b2JqZWN0fSBmcmFnQmxvY2tcbiAqIEBwYXJhbSAge29iamVjdH0gY29udGV4dFxuICovXG5leHBvcnQgZnVuY3Rpb24gX2NoZWNrRGlzcGxheSh0YXJnZXQsIGZyYWdCbG9jaywgY29udGV4dCkge1xuXG4gIHRoaXMuX3dhdGNoQmxvY2soZnJhZ0Jsb2NrLCB0YXJnZXQuc2hvd24sICdzaG93bicsICh2YWx1ZSkgPT4ge1xuICAgIGlmICghZnJhZ0Jsb2NrIHx8ICEhZnJhZ0Jsb2NrLmRpc3BsYXkgPT09ICEhdmFsdWUpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBmcmFnQmxvY2suZGlzcGxheSA9IHZhbHVlXG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLl9nZW5lcmF0ZSh0YXJnZXQsIGZyYWdCbG9jaywgY29udGV4dClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLl9yZW1vdmVCbG9jayhmcmFnQmxvY2ssIHRydWUpXG4gICAgfVxuICB9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gX3dhdGNoQmxvY2soZnJhZ0Jsb2NrLCBjYWxjLCB0eXBlLCBoYW5kbGVyKSB7XG4gIGNvbnN0IGRpZmZlciA9IHRoaXMgJiYgdGhpcy5fYXBwICYmIHRoaXMuX2FwcC5kaWZmZXJcbiAgY29uc3QgY29uZmlnID0ge31cbiAgY29uc3QgZGVwdGggPSBmcmFnQmxvY2suZWxlbWVudC5kZXB0aCArIDFcblxuICB0aGlzLl93YXRjaChjYWxjLCAodmFsdWUpID0+IHtcbiAgICBjb25maWcubGF0ZXN0VmFsdWUgPSB2YWx1ZVxuICAgIGlmIChkaWZmZXIgJiYgIWNvbmZpZy5yZWNvcmRlZCkge1xuICAgICAgZGlmZmVyLmFwcGVuZCh0eXBlLCBkZXB0aCwgZnJhZ0Jsb2NrLmJsb2NrSWQsICgpID0+IHtcbiAgICAgICAgY29uc3QgbGF0ZXN0VmFsdWUgPSBjb25maWcubGF0ZXN0VmFsdWVcbiAgICAgICAgaGFuZGxlcihsYXRlc3RWYWx1ZSlcbiAgICAgICAgY29uZmlnLnJlY29yZGVkID0gZmFsc2VcbiAgICAgICAgY29uZmlnLmxhdGVzdFZhbHVlID0gdW5kZWZpbmVkXG4gICAgICB9KVxuICAgIH1cbiAgICBjb25maWcucmVjb3JkZWQgPSB0cnVlXG4gIH0pXG59XG5cbi8qKlxuICogQ2xvbmUgYSBjb250ZXh0IGFuZCBtZXJnZSBjZXJ0YWluIGRhdGEuXG4gKlxuICogQHBhcmFtICB7b2JqZWN0fSBtZXJnZWREYXRhXG4gKiBAcmV0dXJuIHtvYmplY3R9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfbWVyZ2VDb250ZXh0KG1lcmdlZERhdGEpIHtcbiAgY29uc3QgY29udGV4dCA9IE9iamVjdC5jcmVhdGUodGhpcylcbiAgY29udGV4dC5fZGF0YSA9IG1lcmdlZERhdGFcbiAgY29udGV4dC5faW5pdERhdGEoKVxuICBjb250ZXh0Ll9yZWFsUGFyZW50ID0gdGhpc1xuICByZXR1cm4gY29udGV4dFxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9saWIvdm0vY29tcGlsZXIuanNcbiAqKi8iLCIvKipcbiAqIEBmaWxlT3ZlcnZpZXdcbiAqIERpcmVjdGl2ZSBQYXJzZXJcbiAqL1xuXG5pbXBvcnQge2JpbmQsIGV4dGVuZH0gZnJvbSAnLi4vdXRpbCdcblxuaW1wb3J0IFdhdGNoZXIgZnJvbSAnLi93YXRjaGVyJ1xuaW1wb3J0IHtuYXRpdmVDb21wb25lbnRNYXB9IGZyb20gJy4uL2NvbmZpZydcblxuY29uc3QgU0VUVEVSUyA9IHtcbiAgYXR0cjogJ3NldEF0dHInLFxuICBzdHlsZTogJ3NldFN0eWxlJyxcbiAgZXZlbnQ6ICdhZGRFdmVudCdcbn1cblxuLyoqXG4gKiBhcHBseSB0aGUgbmF0aXZlIGNvbXBvbmVudCdzIG9wdGlvbnMoc3BlY2lmaWVkIGJ5IHRlbXBsYXRlLnR5cGUpXG4gKiB0byB0aGUgdGVtcGxhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9hcHBseU5haXR2ZUNvbXBvbmVudE9wdGlvbnModGVtcGxhdGUpIHtcbiAgY29uc3Qge3R5cGV9ID0gdGVtcGxhdGVcbiAgY29uc3Qgb3B0aW9ucyA9IG5hdGl2ZUNvbXBvbmVudE1hcFt0eXBlXVxuXG4gIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ29iamVjdCcpIHtcbiAgICBleHRlbmQodGVtcGxhdGUsIG9wdGlvbnMpXG4gIH1cbn1cblxuLyoqXG4gKiBiaW5kIGFsbCBpZCwgYXR0ciwgY2xhc3NuYW1lcywgc3R5bGUsIGV2ZW50cyB0byBhbiBlbGVtZW50XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfYmluZEVsZW1lbnQoZWwsIHRlbXBsYXRlKSB7XG4gIHRoaXMuX3NldElkKHRlbXBsYXRlLmlkLCBlbCwgdGhpcylcbiAgdGhpcy5fc2V0QXR0cihlbCwgdGVtcGxhdGUuYXR0cilcbiAgdGhpcy5fc2V0Q2xhc3MoZWwsIHRlbXBsYXRlLmNsYXNzTGlzdClcbiAgdGhpcy5fc2V0U3R5bGUoZWwsIHRlbXBsYXRlLnN0eWxlKVxuICB0aGlzLl9iaW5kRXZlbnRzKGVsLCB0ZW1wbGF0ZS5ldmVudHMpXG59XG5cbi8qKlxuICogYmluZCBhbGwgcHJvcHMgdG8gc3ViIHZtIGFuZCBiaW5kIGFsbCBzdHlsZSwgZXZlbnRzIHRvIHRoZSByb290IGVsZW1lbnRcbiAqIG9mIHRoZSBzdWIgdm0gaWYgaXQgZG9lc24ndCBoYXZlIGEgcmVwbGFjZWQgbXVsdGktbm9kZSBmcmFnbWVudFxuICovXG5leHBvcnQgZnVuY3Rpb24gX2JpbmRTdWJWbShzdWJWbSwgdGVtcGxhdGUsIHJlcGVhdEl0ZW0pIHtcbiAgc3ViVm0gPSBzdWJWbSB8fCB7fVxuICB0ZW1wbGF0ZSA9IHRlbXBsYXRlIHx8IHt9XG5cbiAgY29uc3Qgb3B0aW9ucyA9IHN1YlZtLl9vcHRpb25zIHx8IHt9XG5cbiAgLy8gYmluZCBwcm9wc1xuICBsZXQgcHJvcHMgPSBvcHRpb25zLnByb3BzXG5cbiAgaWYgKEFycmF5LmlzQXJyYXkocHJvcHMpKSB7XG4gICAgcHJvcHMgPSBwcm9wcy5yZWR1Y2UoKHJlc3VsdCwgdmFsdWUpID0+IHtcbiAgICAgIHJlc3VsdFt2YWx1ZV0gPSB0cnVlXG4gICAgICByZXR1cm4gcmVzdWx0XG4gICAgfSwge30pXG4gIH1cblxuICBtZXJnZVByb3BzKHJlcGVhdEl0ZW0sIHByb3BzLCB0aGlzLCBzdWJWbSlcbiAgbWVyZ2VQcm9wcyh0ZW1wbGF0ZS5hdHRyLCBwcm9wcywgdGhpcywgc3ViVm0pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfYmluZFN1YlZtQWZ0ZXJJbml0aWFsaXplZChzdWJWbSwgdGVtcGxhdGUpIHtcbiAgbWVyZ2VTdHlsZSh0ZW1wbGF0ZS5zdHlsZSwgdGhpcywgc3ViVm0pXG5cbiAgLy8gYmluZCBldmVudHNcbiAgLy8gdG9kbzogcmViaW5kIGlmIHN1YlZtLl9yb290RWwgY2hhbmdlZFxuICBpZiAoc3ViVm0uX3Jvb3RFbCkge1xuICAgIGZvciAoY29uc3Qga2V5IGluICh0ZW1wbGF0ZS5ldmVudHMgfHwge30pKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHRlbXBsYXRlLmV2ZW50c1trZXldXG4gICAgICB0aGlzLl9zZXRFdmVudChzdWJWbS5fcm9vdEVsLCBrZXksIHZhbHVlKVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBtZXJnZVByb3BzKHRhcmdldCwgcHJvcHMsIHZtLCBzdWJWbSkge1xuICBpZiAoIXRhcmdldCkge1xuICAgIHJldHVyblxuICB9XG4gIGZvciAoY29uc3Qga2V5IGluIHRhcmdldCkge1xuICAgIGlmICghcHJvcHMgfHwgcHJvcHNba2V5XSkge1xuICAgICAgY29uc3QgdmFsdWUgPSB0YXJnZXRba2V5XVxuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB2bS5fd2F0Y2godmFsdWUsIGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgc3ViVm1ba2V5XSA9IHZcbiAgICAgICAgfSlcbiAgICAgICAgc3ViVm1ba2V5XSA9IHZhbHVlLmJpbmQodm0pKClcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBzdWJWbVtrZXldID0gdmFsdWVcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gbWVyZ2VTdHlsZSh0YXJnZXQsIHZtLCBzdWJWbSkge1xuICBmb3IgKGNvbnN0IGtleSBpbiB0YXJnZXQpIHtcbiAgICBjb25zdCB2YWx1ZSA9IHRhcmdldFtrZXldXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdm0uX3dhdGNoKHZhbHVlLCBmdW5jdGlvbiAodikge1xuICAgICAgICBpZiAoc3ViVm0uX3Jvb3RFbCkge1xuICAgICAgICAgIHN1YlZtLl9yb290RWwuc2V0U3R5bGUoa2V5LCB2KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgc3ViVm0uX3Jvb3RFbC5zZXRTdHlsZShrZXksIHZhbHVlLmJpbmQodm0pKCkpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgaWYgKHN1YlZtLl9yb290RWwpIHtcbiAgICAgICAgc3ViVm0uX3Jvb3RFbC5zZXRTdHlsZShrZXksIHZhbHVlKVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIGJpbmQgaWQgdG8gYW4gZWxlbWVudFxuICogZWFjaCBpZCBpcyB1bmlxdWUgaW4gYSB3aG9sZSB2bVxuICovXG5leHBvcnQgZnVuY3Rpb24gX3NldElkKGlkLCBlbCwgdm0pIHtcbiAgY29uc3QgbWFwID0gT2JqZWN0LmNyZWF0ZShudWxsKVxuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKG1hcCwge1xuICAgIHZtOiB7XG4gICAgICB2YWx1ZTogdm0sXG4gICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlXG4gICAgfSxcbiAgICBlbDoge1xuICAgICAgZ2V0OiAoKSA9PiBlbCB8fCB2bS5fcm9vdEVsLFxuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZVxuICAgIH1cbiAgfSlcblxuICBpZiAodHlwZW9mIGlkID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY29uc3QgaGFuZGxlciA9IGlkXG4gICAgaWQgPSBoYW5kbGVyLmNhbGwodGhpcylcbiAgICBpZiAoaWQpIHtcbiAgICAgIHRoaXMuX2lkc1tpZF0gPSBtYXBcbiAgICB9XG4gICAgdGhpcy5fd2F0Y2goaGFuZGxlciwgKG5ld0lkKSA9PiB7XG4gICAgICBpZiAobmV3SWQpIHtcbiAgICAgICAgdGhpcy5faWRzW25ld0lkXSA9IG1hcFxuICAgICAgfVxuICAgIH0pXG4gIH1cbiAgZWxzZSBpZiAoaWQgJiYgdHlwZW9mIGlkID09PSAnc3RyaW5nJykge1xuICAgIHRoaXMuX2lkc1tpZF0gPSBtYXBcbiAgfVxufVxuXG4vKipcbiAqIGJpbmQgYXR0ciB0byBhbiBlbGVtZW50XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfc2V0QXR0cihlbCwgYXR0cikge1xuICB0aGlzLl9iaW5kRGlyKGVsLCAnYXR0cicsIGF0dHIpXG59XG5cbi8qKlxuICogYmluZCBjbGFzc25hbWVzIHRvIGFuIGVsZW1lbnRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9zZXRDbGFzcyhlbCwgY2xhc3NMaXN0KSB7XG5cbiAgaWYgKHR5cGVvZiBjbGFzc0xpc3QgIT09ICdmdW5jdGlvbicgJiYgIUFycmF5LmlzQXJyYXkoY2xhc3NMaXN0KSkge1xuICAgIHJldHVyblxuICB9XG4gIGlmIChBcnJheS5pc0FycmF5KGNsYXNzTGlzdCkgJiYgIWNsYXNzTGlzdC5sZW5ndGgpIHtcbiAgICBlbC5zZXRDbGFzc1N0eWxlKHt9KVxuICAgIHJldHVyblxuICB9XG5cbiAgY29uc3QgdXBkYXRlID0gKGNsYXNzTGlzdCkgPT4ge1xuICAgIGNvbnN0IGNzcyA9IHRoaXMuX29wdGlvbnMuc3R5bGVcbiAgICBjb25zdCBjbGFzc1N0eWxlID0ge31cbiAgICBjb25zdCBsZW5ndGggPSBjbGFzc0xpc3QubGVuZ3RoXG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBzdHlsZSA9IGNzc1tjbGFzc0xpc3RbaV1dXG4gICAgICBpZiAoc3R5bGUpIHtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gc3R5bGUpIHtcbiAgICAgICAgICBjbGFzc1N0eWxlW2tleV0gPSBzdHlsZVtrZXldXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZWwuc2V0Q2xhc3NTdHlsZShjbGFzc1N0eWxlKVxuICB9XG5cbiAgaWYgKHR5cGVvZiBjbGFzc0xpc3QgPT09ICdmdW5jdGlvbicpIHtcbiAgICB0aGlzLl93YXRjaChjbGFzc0xpc3QsIHVwZGF0ZSlcbiAgICB1cGRhdGUoY2xhc3NMaXN0LmNhbGwodGhpcykpXG4gIH1cbiAgZWxzZSB7XG4gICAgdXBkYXRlKGNsYXNzTGlzdClcbiAgfVxufVxuXG4vKipcbiAqIGJpbmQgc3R5bGUgdG8gYW4gZWxlbWVudFxuICovXG5leHBvcnQgZnVuY3Rpb24gX3NldFN0eWxlKGVsLCBzdHlsZSkge1xuICB0aGlzLl9iaW5kRGlyKGVsLCAnc3R5bGUnLCBzdHlsZSlcbn1cblxuLyoqXG4gKiBhZGQgYW4gZXZlbnQgdHlwZSBhbmQgaGFuZGxlciB0byBhbiBlbGVtZW50IGFuZCBnZW5lcmF0ZSBhIGRvbSB1cGRhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9zZXRFdmVudChlbCwgdHlwZSwgaGFuZGxlcikge1xuICBlbC5hZGRFdmVudCh0eXBlLCBiaW5kKGhhbmRsZXIsIHRoaXMpKVxufVxuXG4vKipcbiAqIGFkZCBhbGwgZXZlbnRzIG9mIGFuIGVsZW1lbnRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9iaW5kRXZlbnRzKGVsLCBldmVudHMpIHtcbiAgaWYgKCFldmVudHMpIHtcbiAgICByZXR1cm5cbiAgfVxuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoZXZlbnRzKVxuICBsZXQgaSA9IGtleXMubGVuZ3RoXG4gIHdoaWxlIChpLS0pIHtcbiAgICBjb25zdCBrZXkgPSBrZXlzW2ldXG4gICAgY29uc3QgaGFuZGxlck5hbWUgPSBldmVudHNba2V5XVxuICAgIHRoaXMuX3NldEV2ZW50KGVsLCBrZXksIHRoaXNbaGFuZGxlck5hbWVdKVxuICB9XG59XG5cbi8qKlxuICogc2V0IGEgc2VyaWVzIG9mIG1lbWJlcnMgYXMgYSBraW5kIG9mIGFuIGVsZW1lbnRcbiAqIGZvciBleGFtcGxlOiBzdHlsZSwgYXR0ciwgLi4uXG4gKiBpZiB0aGUgdmFsdWUgaXMgYSBmdW5jdGlvbiB0aGVuIGJpbmQgdGhlIGRhdGEgY2hhbmdlc1xuICovXG5leHBvcnQgZnVuY3Rpb24gX2JpbmREaXIoZWwsIG5hbWUsIGRhdGEpIHtcbiAgaWYgKCFkYXRhKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGRhdGEpXG4gIGxldCBpID0ga2V5cy5sZW5ndGhcbiAgd2hpbGUgKGktLSkge1xuICAgIGNvbnN0IGtleSA9IGtleXNbaV1cbiAgICBjb25zdCB2YWx1ZSA9IGRhdGFba2V5XVxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnN0IHVwZGF0ZSA9IHZhbHVlXG4gICAgICB0aGlzLl9iaW5kS2V5KGVsLCBuYW1lLCBrZXksIHVwZGF0ZSlcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBlbFtTRVRURVJTW25hbWVdXShrZXksIHZhbHVlKVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIGJpbmQgZGF0YSBjaGFuZ2VzIHRvIGEgY2VydGFpbiBrZXkgdG8gYSBuYW1lIHNlcmllcyBpbiBhbiBlbGVtZW50XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfYmluZEtleShlbCwgbmFtZSwga2V5LCBjYWxjKSB7XG4gIGNvbnN0IG1ldGhvZE5hbWUgPSBTRVRURVJTW25hbWVdXG4gIGNvbnN0IG9iaiA9IGVsW25hbWVdXG4gIC8vIHdhdGNoIHRoZSBjYWxjLCBhbmQgcmV0dXJucyBhIHZhbHVlIGJ5IGNhbGMuY2FsbCgpXG4gIGNvbnN0IHZhbHVlID0gdGhpcy5fd2F0Y2goY2FsYywgKHZhbHVlKSA9PiB7XG4gICAgZnVuY3Rpb24gaGFuZGxlcigpIHtcbiAgICAgIGVsW21ldGhvZE5hbWVdKGtleSwgdmFsdWUpXG4gICAgfVxuICAgIGNvbnN0IGRpZmZlciA9IHRoaXMgJiYgdGhpcy5fYXBwICYmIHRoaXMuX2FwcC5kaWZmZXJcbiAgICBpZiAoZGlmZmVyKSB7XG4gICAgICBkaWZmZXIuYXBwZW5kKCdlbGVtZW50JywgZWwuZGVwdGgsIGVsLnJlZiwgaGFuZGxlcilcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBoYW5kbGVyKClcbiAgICB9XG4gIH0pXG5cbiAgZWxbbWV0aG9kTmFtZV0oa2V5LCB2YWx1ZSlcbn1cblxuLyoqXG4gKiB3YXRjaCBhIGNhbGMgZnVuY3Rpb24gYW5kIGNhbGxiYWNrIGlmIHRoZSBjYWxjIHZhbHVlIGNoYW5nZXNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF93YXRjaChjYWxjLCBjYWxsYmFjaykge1xuICBjb25zdCB3YXRjaGVyID0gbmV3IFdhdGNoZXIodGhpcywgY2FsYywgZnVuY3Rpb24gKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdvYmplY3QnICYmIHZhbHVlID09PSBvbGRWYWx1ZSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGNhbGxiYWNrKHZhbHVlKVxuICB9KVxuXG4gIHJldHVybiB3YXRjaGVyLnZhbHVlXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2xpYi92bS9kaXJlY3RpdmUuanNcbiAqKi8iLCIvKipcbiAqIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxMy0yMDE1IFl1eGkgRXZhbiBZb3VcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICovXG5cbnZhciBfID0gcmVxdWlyZSgnLi91dGlsJylcbi8vIHZhciBjb25maWcgPSByZXF1aXJlKCcuL2NvbmZpZycpXG52YXIgT2JzZXJ2ZXIgPSByZXF1aXJlKCcuL29ic2VydmVyJylcbi8vIHZhciBleHBQYXJzZXIgPSByZXF1aXJlKCcuL3BhcnNlcnMvZXhwcmVzc2lvbicpXG4vLyB2YXIgYmF0Y2hlciA9IHJlcXVpcmUoJy4vYmF0Y2hlcicpXG52YXIgdWlkID0gMFxuXG4vKipcbiAqIEEgd2F0Y2hlciBwYXJzZXMgYW4gZXhwcmVzc2lvbiwgY29sbGVjdHMgZGVwZW5kZW5jaWVzLFxuICogYW5kIGZpcmVzIGNhbGxiYWNrIHdoZW4gdGhlIGV4cHJlc3Npb24gdmFsdWUgY2hhbmdlcy5cbiAqIFRoaXMgaXMgdXNlZCBmb3IgYm90aCB0aGUgJHdhdGNoKCkgYXBpIGFuZCBkaXJlY3RpdmVzLlxuICpcbiAqIEBwYXJhbSB7VnVlfSB2bVxuICogQHBhcmFtIHtTdHJpbmd9IGV4cHJlc3Npb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNiXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogICAgICAgICAgICAgICAgIC0ge0FycmF5fSBmaWx0ZXJzXG4gKiAgICAgICAgICAgICAgICAgLSB7Qm9vbGVhbn0gdHdvV2F5XG4gKiAgICAgICAgICAgICAgICAgLSB7Qm9vbGVhbn0gZGVlcFxuICogICAgICAgICAgICAgICAgIC0ge0Jvb2xlYW59IHVzZXJcbiAqICAgICAgICAgICAgICAgICAtIHtGdW5jdGlvbn0gW3ByZVByb2Nlc3NdXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuXG4vLyBmdW5jdGlvbiBXYXRjaGVyICh2bSwgZXhwcmVzc2lvbiwgY2IsIG9wdGlvbnMpIHtcbmZ1bmN0aW9uIFdhdGNoZXIgKHZtLCB1cGRhdGUsIGNiKSB7XG4gIHRoaXMudm0gPSB2bVxuICB2bS5fd2F0Y2hlcnMucHVzaCh0aGlzKVxuICAvLyB0aGlzLmV4cHJlc3Npb24gPSBleHByZXNzaW9uXG4gIHRoaXMuY2IgPSBjYlxuICB0aGlzLmlkID0gKyt1aWQgLy8gdWlkIGZvciBiYXRjaGluZ1xuICB0aGlzLmFjdGl2ZSA9IHRydWVcbiAgLy8gb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cbiAgLy8gdGhpcy5kZWVwID0gISFvcHRpb25zLmRlZXBcbiAgLy8gdGhpcy51c2VyID0gISFvcHRpb25zLnVzZXJcbiAgLy8gdGhpcy50d29XYXkgPSAhIW9wdGlvbnMudHdvV2F5XG4gIC8vIHRoaXMuZmlsdGVycyA9IG9wdGlvbnMuZmlsdGVyc1xuICAvLyB0aGlzLnByZVByb2Nlc3MgPSBvcHRpb25zLnByZVByb2Nlc3NcbiAgdGhpcy5kZXBzID0gW11cbiAgdGhpcy5uZXdEZXBzID0gW11cbiAgLy8gcGFyc2UgZXhwcmVzc2lvbiBmb3IgZ2V0dGVyL3NldHRlclxuICAvLyB2YXIgcmVzID0gZXhwUGFyc2VyLnBhcnNlKGV4cHJlc3Npb24sIG9wdGlvbnMudHdvV2F5KVxuICAvLyB0aGlzLmdldHRlciA9IHJlcy5nZXRcbiAgLy8gdGhpcy5zZXR0ZXIgPSByZXMuc2V0XG4gIHRoaXMuZ2V0dGVyID0gdXBkYXRlXG4gIHRoaXMudmFsdWUgPSB0aGlzLmdldCgpXG59XG5cbnZhciBwID0gV2F0Y2hlci5wcm90b3R5cGVcblxuLyoqXG4gKiBBZGQgYSBkZXBlbmRlbmN5IHRvIHRoaXMgZGlyZWN0aXZlLlxuICpcbiAqIEBwYXJhbSB7RGVwfSBkZXBcbiAqL1xuXG5wLmFkZERlcCA9IGZ1bmN0aW9uIChkZXApIHtcbiAgdmFyIG5ld0RlcHMgPSB0aGlzLm5ld0RlcHNcbiAgdmFyIG9sZCA9IHRoaXMuZGVwc1xuICBpZiAoXy5pbmRleE9mKG5ld0RlcHMsIGRlcCkgPCAwKSB7XG4gICAgbmV3RGVwcy5wdXNoKGRlcClcbiAgICB2YXIgaSA9IF8uaW5kZXhPZihvbGQsIGRlcClcbiAgICBpZiAoaSA8IDApIHtcbiAgICAgIGRlcC5hZGRTdWIodGhpcylcbiAgICB9IGVsc2Uge1xuICAgICAgb2xkW2ldID0gbnVsbFxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEV2YWx1YXRlIHRoZSBnZXR0ZXIsIGFuZCByZS1jb2xsZWN0IGRlcGVuZGVuY2llcy5cbiAqL1xuXG5wLmdldCA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5iZWZvcmVHZXQoKVxuICB2YXIgdm0gPSB0aGlzLnZtXG4gIHZhciB2YWx1ZVxuICB0cnkge1xuICAgIHZhbHVlID0gdGhpcy5nZXR0ZXIuY2FsbCh2bSwgdm0pXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICAvLyBpZiAoY29uZmlnLndhcm5FeHByZXNzaW9uRXJyb3JzKSB7XG4gICAgLy8gICBfLndhcm4oXG4gICAgLy8gICAgICdFcnJvciB3aGVuIGV2YWx1YXRpbmcgZXhwcmVzc2lvbiBcIicgK1xuICAgIC8vICAgICB0aGlzLmV4cHJlc3Npb24gKyAnXCI6XFxuICAgJyArIGVcbiAgICAvLyAgIClcbiAgICAvLyB9XG4gICAgXy53YXJuKCdFcnJvciB3aGVuIHVwZGF0ZVwiJylcbiAgfVxuICAvLyBcInRvdWNoXCIgZXZlcnkgcHJvcGVydHkgc28gdGhleSBhcmUgYWxsIHRyYWNrZWQgYXNcbiAgLy8gZGVwZW5kZW5jaWVzIGZvciBkZWVwIHdhdGNoaW5nXG4gIGlmICh0aGlzLmRlZXApIHtcbiAgICB0cmF2ZXJzZSh2YWx1ZSlcbiAgfVxuICBpZiAodGhpcy5wcmVQcm9jZXNzKSB7XG4gICAgdmFsdWUgPSB0aGlzLnByZVByb2Nlc3ModmFsdWUpXG4gIH1cbiAgaWYgKHRoaXMuZmlsdGVycykge1xuICAgIHZhbHVlID0gdm0uX2FwcGx5RmlsdGVycyh2YWx1ZSwgbnVsbCwgdGhpcy5maWx0ZXJzLCBmYWxzZSlcbiAgfVxuICB0aGlzLmFmdGVyR2V0KClcbiAgcmV0dXJuIHZhbHVlXG59XG5cbi8vIC8qKlxuLy8gICogU2V0IHRoZSBjb3JyZXNwb25kaW5nIHZhbHVlIHdpdGggdGhlIHNldHRlci5cbi8vICAqXG4vLyAgKiBAcGFyYW0geyp9IHZhbHVlXG4vLyAgKi9cblxuLy8gcC5zZXQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbi8vICAgdmFyIHZtID0gdGhpcy52bVxuLy8gICBpZiAodGhpcy5maWx0ZXJzKSB7XG4vLyAgICAgdmFsdWUgPSB2bS5fYXBwbHlGaWx0ZXJzKFxuLy8gICAgICAgdmFsdWUsIHRoaXMudmFsdWUsIHRoaXMuZmlsdGVycywgdHJ1ZSlcbi8vICAgfVxuLy8gICB0cnkge1xuLy8gICAgIHRoaXMuc2V0dGVyLmNhbGwodm0sIHZtLCB2YWx1ZSlcbi8vICAgfSBjYXRjaCAoZSkge1xuLy8gICAgIC8vIGlmIChjb25maWcud2FybkV4cHJlc3Npb25FcnJvcnMpIHtcbi8vICAgICAgIF8ud2Fybihcbi8vICAgICAgICAgJ0Vycm9yIHdoZW4gZXZhbHVhdGluZyBzZXR0ZXIgXCInICtcbi8vICAgICAgICAgdGhpcy5leHByZXNzaW9uICsgJ1wiOlxcbiAgICcgKyBlXG4vLyAgICAgICApXG4vLyAgICAgLy8gfVxuLy8gICB9XG4vLyB9XG5cbi8qKlxuICogUHJlcGFyZSBmb3IgZGVwZW5kZW5jeSBjb2xsZWN0aW9uLlxuICovXG5cbnAuYmVmb3JlR2V0ID0gZnVuY3Rpb24gKCkge1xuICBPYnNlcnZlci50YXJnZXQgPSB0aGlzXG59XG5cbi8qKlxuICogQ2xlYW4gdXAgZm9yIGRlcGVuZGVuY3kgY29sbGVjdGlvbi5cbiAqL1xuXG5wLmFmdGVyR2V0ID0gZnVuY3Rpb24gKCkge1xuICBPYnNlcnZlci50YXJnZXQgPSBudWxsXG4gIHZhciBpID0gdGhpcy5kZXBzLmxlbmd0aFxuICB3aGlsZSAoaS0tKSB7XG4gICAgdmFyIGRlcCA9IHRoaXMuZGVwc1tpXVxuICAgIGlmIChkZXApIHtcbiAgICAgIGRlcC5yZW1vdmVTdWIodGhpcylcbiAgICB9XG4gIH1cbiAgdGhpcy5kZXBzID0gdGhpcy5uZXdEZXBzXG4gIHRoaXMubmV3RGVwcyA9IFtdXG59XG5cbi8qKlxuICogU3Vic2NyaWJlciBpbnRlcmZhY2UuXG4gKiBXaWxsIGJlIGNhbGxlZCB3aGVuIGEgZGVwZW5kZW5jeSBjaGFuZ2VzLlxuICovXG5cbi8vIHAudXBkYXRlID0gZnVuY3Rpb24gKCkge1xuLy8gICBpZiAoIWNvbmZpZy5hc3luYyB8fCBjb25maWcuZGVidWcpIHtcbi8vICAgICB0aGlzLnJ1bigpXG4vLyAgIH0gZWxzZSB7XG4vLyAgICAgYmF0Y2hlci5wdXNoKHRoaXMpXG4vLyAgIH1cbi8vIH1cblxuLy8gLyoqXG4vLyAgKiBCYXRjaGVyIGpvYiBpbnRlcmZhY2UuXG4vLyAgKiBXaWxsIGJlIGNhbGxlZCBieSB0aGUgYmF0Y2hlci5cbi8vICAqL1xuXG4vLyBwLnJ1biA9IGZ1bmN0aW9uICgpIHtcbnAudXBkYXRlID0gZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy5hY3RpdmUpIHtcbiAgICB2YXIgdmFsdWUgPSB0aGlzLmdldCgpXG4gICAgaWYgKFxuICAgICAgdmFsdWUgIT09IHRoaXMudmFsdWUgfHxcbiAgICAgIEFycmF5LmlzQXJyYXkodmFsdWUpIHx8XG4gICAgICB0aGlzLmRlZXBcbiAgICApIHtcbiAgICAgIHZhciBvbGRWYWx1ZSA9IHRoaXMudmFsdWVcbiAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZVxuICAgICAgdGhpcy5jYih2YWx1ZSwgb2xkVmFsdWUpXG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogUmVtb3ZlIHNlbGYgZnJvbSBhbGwgZGVwZW5kZW5jaWVzJyBzdWJjcmliZXIgbGlzdC5cbiAqL1xuXG5wLnRlYXJkb3duID0gZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy5hY3RpdmUpIHtcbiAgICAvLyByZW1vdmUgc2VsZiBmcm9tIHZtJ3Mgd2F0Y2hlciBsaXN0XG4gICAgLy8gd2UgY2FuIHNraXAgdGhpcyBpZiB0aGUgdm0gaWYgYmVpbmcgZGVzdHJveWVkXG4gICAgLy8gd2hpY2ggY2FuIGltcHJvdmUgdGVhcmRvd24gcGVyZm9ybWFuY2UuXG4gICAgaWYgKCF0aGlzLnZtLl9pc0JlaW5nRGVzdHJveWVkKSB7XG4gICAgICB0aGlzLnZtLl93YXRjaGVycy4kcmVtb3ZlKHRoaXMpXG4gICAgfVxuICAgIHZhciBpID0gdGhpcy5kZXBzLmxlbmd0aFxuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIHRoaXMuZGVwc1tpXS5yZW1vdmVTdWIodGhpcylcbiAgICB9XG4gICAgdGhpcy5hY3RpdmUgPSBmYWxzZVxuICAgIHRoaXMudm0gPSB0aGlzLmNiID0gdGhpcy52YWx1ZSA9IG51bGxcbiAgfVxufVxuXG5cbi8qKlxuICogUmVjcnVzaXZlbHkgdHJhdmVyc2UgYW4gb2JqZWN0IHRvIGV2b2tlIGFsbCBjb252ZXJ0ZWRcbiAqIGdldHRlcnMsIHNvIHRoYXQgZXZlcnkgbmVzdGVkIHByb3BlcnR5IGluc2lkZSB0aGUgb2JqZWN0XG4gKiBpcyBjb2xsZWN0ZWQgYXMgYSBcImRlZXBcIiBkZXBlbmRlbmN5LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqL1xuXG5mdW5jdGlvbiB0cmF2ZXJzZSAob2JqKSB7XG4gIHZhciBrZXksIHZhbCwgaVxuICBmb3IgKGtleSBpbiBvYmopIHtcbiAgICB2YWwgPSBvYmpba2V5XVxuICAgIGlmIChfLmlzQXJyYXkodmFsKSkge1xuICAgICAgaSA9IHZhbC5sZW5ndGhcbiAgICAgIHdoaWxlIChpLS0pIHt0cmF2ZXJzZSh2YWxbaV0pfVxuICAgIH0gZWxzZSBpZiAoXy5pc09iamVjdCh2YWwpKSB7XG4gICAgICB0cmF2ZXJzZSh2YWwpXG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gV2F0Y2hlclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9saWIvdm0vd2F0Y2hlci5qc1xuICoqLyIsIi8qKlxuICogQGZpbGVPdmVydmlldyBEb2N1bWVudCAmIEVsZW1lbnQgSGVscGVycy5cbiAqXG4gKiByZXF1aXJlZDpcbiAqIERvY3VtZW50IzogY3JlYXRlRWxlbWVudCwgY3JlYXRlQ29tbWVudCwgZ2V0UmVmXG4gKiBFbGVtZW50IzogYXBwZW5kQ2hpbGQsIGluc2VydEJlZm9yZSwgcmVtb3ZlQ2hpbGQsIG5leHRTaWJsaW5nXG4gKi9cblxuLyoqXG4gKiBDcmVhdGUgYSBib2R5IGJ5IHR5cGVcbiAqIFVzaW5nIHRoaXMuX2FwcC5kb2NcbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHR5cGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9jcmVhdGVCb2R5KHR5cGUpIHtcbiAgY29uc3QgZG9jID0gdGhpcy5fYXBwLmRvY1xuICByZXR1cm4gZG9jLmNyZWF0ZUJvZHkodHlwZSlcbn1cblxuLyoqXG4gKiBDcmVhdGUgYW4gZWxlbWVudCBieSB0eXBlXG4gKiBVc2luZyB0aGlzLl9hcHAuZG9jXG4gKlxuICogQHBhcmFtICB7c3RyaW5nfSB0eXBlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfY3JlYXRlRWxlbWVudCh0eXBlKSB7XG4gIGNvbnN0IGRvYyA9IHRoaXMuX2FwcC5kb2NcbiAgcmV0dXJuIGRvYy5jcmVhdGVFbGVtZW50KHR5cGUpXG59XG5cbi8qKlxuICogQ3JlYXRlIGFuZCByZXR1cm4gYSBmcmFnIGJsb2NrIGZvciBhbiBlbGVtZW50LlxuICogVGhlIGZyYWcgYmxvY2sgaGFzIGEgc3RhcnRlciwgZW5kZXIgYW5kIHRoZSBlbGVtZW50IGl0c2VsZi5cbiAqXG4gKiBAcGFyYW0gIHtvYmplY3R9IGVsZW1lbnRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9jcmVhdGVCbG9jayhlbGVtZW50KSB7XG4gIGNvbnN0IHN0YXJ0ID0gdGhpcy5fY3JlYXRlQmxvY2tTdGFydCgpXG4gIGNvbnN0IGVuZCA9IHRoaXMuX2NyZWF0ZUJsb2NrRW5kKClcbiAgY29uc3QgYmxvY2tJZCA9IGxhc3Rlc3RCbG9ja0lkKytcbiAgaWYgKGVsZW1lbnQuZWxlbWVudCkge1xuICAgIGVsZW1lbnQuZWxlbWVudC5pbnNlcnRCZWZvcmUoc3RhcnQsIGVsZW1lbnQuZW5kKVxuICAgIGVsZW1lbnQuZWxlbWVudC5pbnNlcnRCZWZvcmUoZW5kLCBlbGVtZW50LmVuZClcbiAgICBlbGVtZW50ID0gZWxlbWVudC5lbGVtZW50XG4gIH1cbiAgZWxzZSB7XG4gICAgZWxlbWVudC5hcHBlbmRDaGlsZChzdGFydClcbiAgICBlbGVtZW50LmFwcGVuZENoaWxkKGVuZClcbiAgfVxuICByZXR1cm4ge3N0YXJ0LCBlbmQsIGVsZW1lbnQsIGJsb2NrSWR9XG59XG5cbmxldCBsYXN0ZXN0QmxvY2tJZCA9IDFcblxuLyoqXG4gKiBDcmVhdGUgYW5kIHJldHVybiBhIGJsb2NrIHN0YXJ0ZXIuXG4gKiBVc2luZyB0aGlzLl9hcHAuZG9jXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfY3JlYXRlQmxvY2tTdGFydCgpIHtcbiAgY29uc3QgZG9jID0gdGhpcy5fYXBwLmRvY1xuICBjb25zdCBhbmNob3IgPSBkb2MuY3JlYXRlQ29tbWVudCgnc3RhcnQnKVxuICByZXR1cm4gYW5jaG9yXG59XG5cbi8qKlxuICogQ3JlYXRlIGFuZCByZXR1cm4gYSBibG9jayBlbmRlci5cbiAqIFVzaW5nIHRoaXMuX2FwcC5kb2NcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9jcmVhdGVCbG9ja0VuZCgpIHtcbiAgY29uc3QgZG9jID0gdGhpcy5fYXBwLmRvY1xuICBjb25zdCBhbmNob3IgPSBkb2MuY3JlYXRlQ29tbWVudCgnZW5kJylcbiAgcmV0dXJuIGFuY2hvclxufVxuXG4vKipcbiAqIEF0dGFjaCB0YXJnZXQgdG8gYSBjZXJ0YWluIGRlc3QgdXNpbmcgYXBwZW5kQ2hpbGQgYnkgZGVmYXVsdC5cbiAqIElmIHRoZSBkZXN0IGlzIGEgZnJhZyBibG9jayB0aGVuIGluc2VydCBiZWZvcmUgdGhlIGVuZGVyLlxuICogSWYgdGhlIHRhcmdldCBpcyBhIGZyYWcgYmxvY2sgdGhlbiBhdHRhY2ggdGhlIHN0YXJ0ZXIgYW5kIGVuZGVyIGluIG9yZGVyLlxuICpcbiAqIEBwYXJhbSAge29iamVjdH0gdGFyZ2V0XG4gKiBAcGFyYW0gIHtvYmplY3R9IGRlc3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9hdHRhY2hUYXJnZXQodGFyZ2V0LCBkZXN0KSB7XG5cbiAgaWYgKGRlc3QuZWxlbWVudCkge1xuICAgIGNvbnN0IGJlZm9yZSA9IGRlc3QuZW5kXG4gICAgY29uc3QgYWZ0ZXIgPSBkZXN0LnVwZGF0ZU1hcmtcbiAgICAvLyBwdXNoIG5ldyB0YXJnZXQgZm9yIHdhdGNoIGxpc3QgdXBkYXRlIGxhdGVyXG4gICAgaWYgKGRlc3QuY2hpbGRyZW4pIHtcbiAgICAgIGRlc3QuY2hpbGRyZW4ucHVzaCh0YXJnZXQpXG4gICAgfVxuICAgIC8vIGZvciBjaGVjayByZXBlYXQgY2FzZVxuICAgIGlmIChhZnRlcikge1xuICAgICAgdGhpcy5fbW92ZVRhcmdldCh0YXJnZXQsIGFmdGVyKVxuICAgICAgZGVzdC51cGRhdGVNYXJrID0gdGFyZ2V0LmVsZW1lbnQgPyB0YXJnZXQuZW5kIDogdGFyZ2V0XG4gICAgfVxuICAgIGVsc2UgaWYgKHRhcmdldC5lbGVtZW50KSB7XG4gICAgICBkZXN0LmVsZW1lbnQuaW5zZXJ0QmVmb3JlKHRhcmdldC5zdGFydCwgYmVmb3JlKVxuICAgICAgZGVzdC5lbGVtZW50Lmluc2VydEJlZm9yZSh0YXJnZXQuZW5kLCBiZWZvcmUpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgZGVzdC5lbGVtZW50Lmluc2VydEJlZm9yZSh0YXJnZXQsIGJlZm9yZSlcbiAgICB9XG4gIH1cbiAgZWxzZSB7XG4gICAgaWYgKHRhcmdldC5lbGVtZW50KSB7XG4gICAgICBkZXN0LmFwcGVuZENoaWxkKHRhcmdldC5zdGFydClcbiAgICAgIGRlc3QuYXBwZW5kQ2hpbGQodGFyZ2V0LmVuZClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBkZXN0LmFwcGVuZENoaWxkKHRhcmdldClcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBNb3ZlIHRhcmdldCBiZWZvcmUgYSBjZXJ0YWluIGVsZW1lbnQuIFRoZSB0YXJnZXQgbWF5YmUgYmxvY2sgb3IgZWxlbWVudC5cbiAqXG4gKiBAcGFyYW0gIHtvYmplY3R9IHRhcmdldFxuICogQHBhcmFtICB7b2JqZWN0fSBiZWZvcmVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9tb3ZlVGFyZ2V0KHRhcmdldCwgYWZ0ZXIpIHtcbiAgaWYgKHRhcmdldC5lbGVtZW50KSB7XG4gICAgdGhpcy5fbW92ZUJsb2NrKHRhcmdldCwgYWZ0ZXIpXG4gIH1cbiAgZWxzZSB7XG4gICAgdGhpcy5fbW92ZUVsZW1lbnQodGFyZ2V0LCBhZnRlcilcbiAgfVxufVxuXG4vKipcbiAqIE1vdmUgZWxlbWVudCBiZWZvcmUgYSBjZXJ0YWluIGVsZW1lbnQuXG4gKlxuICogQHBhcmFtICB7b2JqZWN0fSBlbGVtZW50XG4gKiBAcGFyYW0gIHtvYmplY3R9IGJlZm9yZVxuICovXG5leHBvcnQgZnVuY3Rpb24gX21vdmVFbGVtZW50KGVsZW1lbnQsIGFmdGVyKSB7XG4gIGNvbnN0IGRvYyA9IHRoaXMuX2FwcC5kb2NcbiAgY29uc3QgcGFyZW50ID0gZG9jLmdldFJlZihhZnRlci5wYXJlbnRSZWYpXG5cbiAgaWYgKHBhcmVudCkge1xuICAgIHBhcmVudC5pbnNlcnRBZnRlcihlbGVtZW50LCBhZnRlcilcbiAgfVxufVxuXG4vKipcbiAqIE1vdmUgYWxsIGVsZW1lbnRzIG9mIHRoZSBibG9jayBiZWZvcmUgYSBjZXJ0YWluIGVsZW1lbnQuXG4gKlxuICogQHBhcmFtICB7b2JqZWN0fSBmcmFnQmxvY2tcbiAqIEBwYXJhbSAge29iamVjdH0gYmVmb3JlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfbW92ZUJsb2NrKGZyYWdCbG9jaywgYWZ0ZXIpIHtcbiAgY29uc3QgZG9jID0gdGhpcy5fYXBwLmRvY1xuICBjb25zdCBwYXJlbnQgPSBkb2MuZ2V0UmVmKGFmdGVyLnBhcmVudFJlZilcblxuICBpZiAocGFyZW50KSB7XG4gICAgbGV0IGVsID0gZnJhZ0Jsb2NrLnN0YXJ0XG4gICAgY29uc3QgZ3JvdXAgPSBbZWxdXG5cbiAgICB3aGlsZSAoZWwgJiYgZWwgIT09IGZyYWdCbG9jay5lbmQpIHtcbiAgICAgIGVsID0gZWwubmV4dCgpXG4gICAgICBncm91cC5wdXNoKGVsKVxuICAgIH1cblxuICAgIGxldCB0ZW1wID0gYWZ0ZXJcbiAgICBncm91cC5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgcGFyZW50Lmluc2VydEFmdGVyKGVsLCB0ZW1wKVxuICAgICAgdGVtcCA9IGVsXG4gICAgfSlcbiAgfVxufVxuXG4vKipcbiAqIFJlbW92ZSB0YXJnZXQgZnJvbSBET00gdHJlZS5cbiAqIElmIHRoZSB0YXJnZXQgaXMgYSBmcmFnIGJsb2NrIHRoZW4gY2FsbCBfcmVtb3ZlQmxvY2tcbiAqXG4gKiBAcGFyYW0gIHtvYmplY3R9IHRhcmdldFxuICovXG5leHBvcnQgZnVuY3Rpb24gX3JlbW92ZVRhcmdldCh0YXJnZXQpIHtcblxuICBpZiAodGFyZ2V0LmVsZW1lbnQpIHtcbiAgICB0aGlzLl9yZW1vdmVCbG9jayh0YXJnZXQpXG4gIH1cbiAgZWxzZSB7XG4gICAgdGhpcy5fcmVtb3ZlRWxlbWVudCh0YXJnZXQpXG4gIH1cbn1cblxuLyoqXG4gKiBSZW1vdmUgYSBjZXJ0YWluIGVsZW1lbnQuXG4gKiBVc2luZyB0aGlzLl9hcHAuZG9jXG4gKlxuICogQHBhcmFtICB7b2JqZWN0fSB0YXJnZXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9yZW1vdmVFbGVtZW50KHRhcmdldCkge1xuICBjb25zdCBkb2MgPSB0aGlzLl9hcHAuZG9jXG4gIGNvbnN0IHBhcmVudCA9IGRvYy5nZXRSZWYodGFyZ2V0LnBhcmVudFJlZilcblxuICBpZiAocGFyZW50KSB7XG4gICAgcGFyZW50LnJlbW92ZUNoaWxkKHRhcmdldClcbiAgfVxufVxuXG4vKipcbiAqIFJlbW92ZSBhIGZyYWcgYmxvY2suXG4gKiBUaGUgc2Vjb25kIHBhcmFtIGRlY2lkZXMgd2hldGhlciB0aGUgYmxvY2sgc2VsZiBzaG91bGQgYmUgcmVtb3ZlZCB0b28uXG4gKlxuICogQHBhcmFtICB7b2JqZWN0fSAgZnJhZ0Jsb2NrXG4gKiBAcGFyYW0gIHtCb29sZWFufSBwcmVzZXJ2ZUJsb2NrPWZhbHNlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfcmVtb3ZlQmxvY2soZnJhZ0Jsb2NrLCBwcmVzZXJ2ZUJsb2NrID0gZmFsc2UpIHtcbiAgY29uc3QgcmVzdWx0ID0gW11cbiAgbGV0IGVsID0gZnJhZ0Jsb2NrLnN0YXJ0Lm5leHQoKVxuXG4gIHdoaWxlIChlbCAmJiBlbCAhPT0gZnJhZ0Jsb2NrLmVuZCkge1xuICAgIHJlc3VsdC5wdXNoKGVsKVxuICAgIGVsID0gZWwubmV4dCgpXG4gIH1cblxuICBpZiAoIXByZXNlcnZlQmxvY2spIHtcbiAgICB0aGlzLl9yZW1vdmVFbGVtZW50KGZyYWdCbG9jay5zdGFydClcbiAgfVxuICByZXN1bHQuZm9yRWFjaCgoZWwpID0+IHtcbiAgICB0aGlzLl9yZW1vdmVFbGVtZW50KGVsKVxuICB9KVxuICBpZiAoIXByZXNlcnZlQmxvY2spIHtcbiAgICB0aGlzLl9yZW1vdmVFbGVtZW50KGZyYWdCbG9jay5lbmQpXG4gIH1cbn1cblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9saWIvdm0vZG9tLWhlbHBlci5qc1xuICoqLyIsImZ1bmN0aW9uIEV2dCh0eXBlLCBkZXRhaWwpIHtcbiAgaWYgKGRldGFpbCBpbnN0YW5jZW9mIEV2dCkge1xuICAgIHJldHVybiBkZXRhaWxcbiAgfVxuXG4gIHRoaXMudGltZXN0YW1wID0gRGF0ZS5ub3coKVxuICB0aGlzLmRldGFpbCA9IGRldGFpbFxuICB0aGlzLnR5cGUgPSB0eXBlXG5cbiAgbGV0IHNob3VsZFN0b3AgPSBmYWxzZVxuICB0aGlzLnN0b3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgc2hvdWxkU3RvcCA9IHRydWVcbiAgfVxuICB0aGlzLmhhc1N0b3BwZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHNob3VsZFN0b3BcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gJGVtaXQodHlwZSwgZGV0YWlsKSB7XG4gIGNvbnN0IGV2ZW50cyA9IHRoaXMuX3ZtRXZlbnRzXG4gIGNvbnN0IGhhbmRsZXJMaXN0ID0gZXZlbnRzW3R5cGVdXG4gIGlmIChoYW5kbGVyTGlzdCkge1xuICAgIGxldCBldnQgPSBuZXcgRXZ0KHR5cGUsIGRldGFpbClcbiAgICBoYW5kbGVyTGlzdC5mb3JFYWNoKChoYW5kbGVyKSA9PiB7XG4gICAgICBoYW5kbGVyLmNhbGwodGhpcywgZXZ0KVxuICAgIH0pXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uICRkaXNwYXRjaCh0eXBlLCBkZXRhaWwpIHtcbiAgY29uc3QgZXZ0ID0gbmV3IEV2dCh0eXBlLCBkZXRhaWwpXG4gIHRoaXMuJGVtaXQodHlwZSwgZXZ0KVxuXG4gIGlmICghZXZ0Lmhhc1N0b3BwZWQoKSAmJiB0aGlzLl9wYXJlbnQgJiYgdGhpcy5fcGFyZW50LiRkaXNwYXRjaCkge1xuICAgIHRoaXMuX3BhcmVudC4kZGlzcGF0Y2godHlwZSwgZXZ0KVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiAkYnJvYWRjYXN0KHR5cGUsIGRldGFpbCkge1xuICBjb25zdCBldnQgPSBuZXcgRXZ0KHR5cGUsIGRldGFpbClcbiAgdGhpcy4kZW1pdCh0eXBlLCBldnQpXG5cbiAgaWYgKCFldnQuaGFzU3RvcHBlZCgpICYmIHRoaXMuX2NoaWxkcmVuVm1zKSB7XG4gICAgdGhpcy5fY2hpbGRyZW5WbXMuZm9yRWFjaCgoc3ViVm0pID0+IHtcbiAgICAgIHN1YlZtLiRicm9hZGNhc3QodHlwZSwgZXZ0KVxuICAgIH0pXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uICRvbih0eXBlLCBoYW5kbGVyKSB7XG4gIGlmICghdHlwZSB8fCB0eXBlb2YgaGFuZGxlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVyblxuICB9XG4gIGNvbnN0IGV2ZW50cyA9IHRoaXMuX3ZtRXZlbnRzXG4gIGNvbnN0IGhhbmRsZXJMaXN0ID0gZXZlbnRzW3R5cGVdIHx8IFtdXG4gIGhhbmRsZXJMaXN0LnB1c2goaGFuZGxlcilcbiAgZXZlbnRzW3R5cGVdID0gaGFuZGxlckxpc3RcblxuICAvLyBmaXhlZCBvbGQgdmVyc2lvbiBsaWZlY3ljbGUgZGVzaWduXG4gIGlmICh0eXBlID09PSAnaG9vazpyZWFkeScgJiYgdGhpcy5fcmVhZHkpIHtcbiAgICB0aGlzLiRlbWl0KCdob29rOnJlYWR5JylcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gJG9mZih0eXBlLCBoYW5kbGVyKSB7XG4gIGlmICghdHlwZSkge1xuICAgIHJldHVyblxuICB9XG4gIGNvbnN0IGV2ZW50cyA9IHRoaXMuX3ZtRXZlbnRzXG4gIGlmICghaGFuZGxlcikge1xuICAgIGRlbGV0ZSBldmVudHNbdHlwZV1cbiAgICByZXR1cm5cbiAgfVxuICBjb25zdCBoYW5kbGVyTGlzdCA9IGV2ZW50c1t0eXBlXVxuICBpZiAoIWhhbmRsZXJMaXN0KSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgaGFuZGxlckxpc3QuJHJlbW92ZShoYW5kbGVyKVxufVxuXG5jb25zdCBMSUZFX0NZQ0xFX1RZUEVTID0gWydpbml0JywgJ2NyZWF0ZWQnLCAncmVhZHknXVxuXG5leHBvcnQgZnVuY3Rpb24gX2luaXRFdmVudHMoZXh0ZXJuYWxFdmVudHMpIHtcbiAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuX29wdGlvbnMgfHwge31cbiAgY29uc3QgZXZlbnRzID0gb3B0aW9ucy5ldmVudHMgfHwge31cbiAgZm9yIChjb25zdCB0eXBlMSBpbiBldmVudHMpIHtcbiAgICB0aGlzLiRvbih0eXBlMSwgZXZlbnRzW3R5cGUxXSlcbiAgfVxuICBmb3IgKGNvbnN0IHR5cGUyIGluIGV4dGVybmFsRXZlbnRzKSB7XG4gICAgdGhpcy4kb24odHlwZTIsIGV4dGVybmFsRXZlbnRzW3R5cGUyXSlcbiAgfVxuICBMSUZFX0NZQ0xFX1RZUEVTLmZvckVhY2goKHR5cGUpID0+IHtcbiAgICB0aGlzLiRvbihgaG9vazoke3R5cGV9YCwgb3B0aW9uc1t0eXBlXSlcbiAgfSlcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vbGliL3ZtL2V2ZW50cy5qc1xuICoqLyIsImxldCBuYXRpdmVNb2R1bGVzID0ge31cblxuZnVuY3Rpb24gYXNzaWduTW9kdWxlcyhtb2R1bGVzLCBpZlJlcGxhY2UpIHtcblxuICBmb3IgKGNvbnN0IG1vZHVsZU5hbWUgaW4gbW9kdWxlcykge1xuXG4gICAgLy8gaW5pdCBgbW9kdWxlc1ttb2R1bGVOYW1lXVtdYFxuICAgIGxldCBtZXRob2RzID0gbmF0aXZlTW9kdWxlc1ttb2R1bGVOYW1lXVxuICAgIGlmICghbWV0aG9kcykge1xuICAgICAgbWV0aG9kcyA9IHt9XG4gICAgICBuYXRpdmVNb2R1bGVzW21vZHVsZU5hbWVdID0gbWV0aG9kc1xuICAgIH1cblxuICAgIC8vIHB1c2ggZWFjaCBub24tZXhpc3RlZCBuZXcgbWV0aG9kXG4gICAgbW9kdWxlc1ttb2R1bGVOYW1lXS5mb3JFYWNoKGZ1bmN0aW9uIChtZXRob2QpIHtcbiAgICAgIGlmICh0eXBlb2YgbWV0aG9kID09PSAnc3RyaW5nJykge1xuICAgICAgICBtZXRob2QgPSB7XG4gICAgICAgICAgbmFtZTogbWV0aG9kXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCFtZXRob2RzW21ldGhvZC5uYW1lXSB8fCBpZlJlcGxhY2UpIHtcbiAgICAgICAgbWV0aG9kc1ttZXRob2QubmFtZV0gPSBtZXRob2RcbiAgICAgIH1cbiAgICB9KVxuICB9XG59XG5cbmZ1bmN0aW9uIGFzc2lnbkFwaXMoQ3RvciwgYXBpcykge1xuICBjb25zdCBwID0gQ3Rvci5wcm90b3R5cGVcblxuICBmb3IgKGNvbnN0IGFwaU5hbWUgaW4gYXBpcykge1xuICAgIGlmICghcC5oYXNPd25Qcm9wZXJ0eShhcGlOYW1lKSkge1xuICAgICAgcFthcGlOYW1lXSA9IGFwaXNbYXBpTmFtZV1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyTW9kdWxlcygpIHtcbiAgbmF0aXZlTW9kdWxlcyA9IHt9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRNb2R1bGUobW9kdWxlTmFtZSkge1xuICByZXR1cm4gbmF0aXZlTW9kdWxlc1ttb2R1bGVOYW1lXVxufVxuXG4vKipcbiAqIEBjb250ZXh0IGEgaW5zdGFuY2Ugb2YgQXBwSW5zdGFuY2VcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlcXVpcmVNb2R1bGUobW9kdWxlTmFtZSkge1xuICBjb25zdCBtZXRob2RzID0gbmF0aXZlTW9kdWxlc1ttb2R1bGVOYW1lXVxuICBjb25zdCB0YXJnZXQgPSB7fVxuXG4gIGZvciAoY29uc3QgbWV0aG9kTmFtZSBpbiBtZXRob2RzKSB7XG4gICAgdGFyZ2V0W21ldGhvZE5hbWVdID0gKC4uLmFyZ3MpID0+IHRoaXMuY2FsbFRhc2tzKHtcbiAgICAgIG1vZHVsZTogbW9kdWxlTmFtZSxcbiAgICAgIG1ldGhvZDogbWV0aG9kTmFtZSxcbiAgICAgIGFyZ3M6IGFyZ3NcbiAgICB9KVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldFxufVxuXG4vKipcbiAqIEBjb250ZXh0IFZtXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3Rlck1vZHVsZXMobW9kdWxlcywgaWZSZXBsYWNlKSB7XG4gIGFzc2lnbk1vZHVsZXMobW9kdWxlcywgaWZSZXBsYWNlKVxufVxuXG4vKipcbiAqIEBjb250ZXh0IFZtXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3Rlck1ldGhvZHMoYXBpcykge1xuICBhc3NpZ25BcGlzKHRoaXMsIGFwaXMpXG59XG5cbi8qKlxuICogQGNvbnRleHQgYSBpbnN0YW5jZSBvZiBBcHBJbnN0YW5jZVxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVxdWlyZUNvbXBvbmVudChuYW1lKSB7XG4gIGNvbnN0IHtjdXN0b21Db21wb25lbnRNYXB9ID0gdGhpc1xuICByZXR1cm4gY3VzdG9tQ29tcG9uZW50TWFwW25hbWVdXG59XG5cbi8qKlxuICogQGNvbnRleHQgYSBpbnN0YW5jZSBvZiBBcHBJbnN0YW5jZVxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJDb21wb25lbnQobmFtZSwgZXhwb3J0cykge1xuICBjb25zdCB7Y3VzdG9tQ29tcG9uZW50TWFwfSA9IHRoaXNcblxuICBpZiAoY3VzdG9tQ29tcG9uZW50TWFwW25hbWVdKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBkZWZpbmUgYSBjb21wb25lbnQoJHtuYW1lfSkgdGhhdCBhbHJlYWR5IGV4aXN0c2ApXG4gIH1cblxuICBjdXN0b21Db21wb25lbnRNYXBbbmFtZV0gPSBleHBvcnRzXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9saWIvYXBwL3JlZ2lzdGVyLmpzXG4gKiovIiwiaW1wb3J0IHNlbXZlciBmcm9tICdzZW12ZXInXG5pbXBvcnQge2V4dGVuZCwgaXNQbGFpbk9iamVjdCwgdHlwb2Z9ICBmcm9tICcuLi91dGlsJ1xuXG4vKipcbiAqIFtub3JtYWxpemVWZXJzaW9uIGRlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7U3RyaW5nfSBWZXJzaW9uLiBpZTogMSwgMS4wLCAxLjAuMFxuICogQHJldHVybiB7U3RyaW5nfSBWZXJzaW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVWZXJzaW9uICh2KSB7XG4gIGNvbnN0IGlzVmFsaWQgPSBzZW12ZXIudmFsaWQodikgPyB0cnVlIDogZmFsc2VcbiAgaWYgKGlzVmFsaWQpIHtcbiAgICByZXR1cm4gdlxuICB9XG5cbiAgdiA9IHR5cGVvZiAodikgPT09ICdzdHJpbmcnID8gdiA6ICcnXG4gIGNvbnN0IHNwbGl0ID0gdi5zcGxpdCgnLicpXG4gIGxldCBpID0gMFxuICBsZXQgcmVzdWx0ID0gW11cblxuICB3aGlsZSAoaSA8IDMpIHtcbiAgICBjb25zdCBzID0gdHlwZW9mIChzcGxpdFtpXSkgPT09ICdzdHJpbmcnICYmIHNwbGl0W2ldID8gc3BsaXRbaV0gOiAnMCdcbiAgICByZXN1bHQucHVzaChzKVxuICAgIGkrK1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdC5qb2luKCcuJylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEVycm9yIChrZXksIHZhbCwgY3JpdGVyaWEpIHtcbiAgbGV0IHJlc3VsdCA9IHtcbiAgICBpc0Rvd25ncmFkZTogdHJ1ZSxcbiAgICBlcnJvclR5cGU6IDEsXG4gICAgY29kZTogMTAwMFxuICB9XG4gIGxldCBnZXRNc2cgPSBmdW5jdGlvbiAoa2V5LCB2YWwsIGNyaXRlcmlhKSB7XG4gICAgcmV0dXJuICdEb3duZ3JhZGVbJyArIGtleSArICddIDo6IGRldmljZUluZm8gJ1xuICAgICAgKyB2YWwgKyAnIG1hdGNoZWQgY3JpdGVyaWEgJyArIGNyaXRlcmlhXG4gIH1cbiAgY29uc3QgX2tleSA9IGtleS50b0xvd2VyQ2FzZSgpXG5cbiAgcmVzdWx0LmVycm9yTWVzc2FnZSA9IGdldE1zZyhrZXksIHZhbCwgY3JpdGVyaWEpXG5cbiAgaWYgKF9rZXkuaW5kZXhPZignb3N2ZXJzaW9uJykgPj0gMCkge1xuICAgIHJlc3VsdC5jb2RlID0gMTAwMVxuICB9ZWxzZSBpZiAoX2tleS5pbmRleE9mKCdhcHB2ZXJzaW9uJykgPj0gMCkge1xuICAgIHJlc3VsdC5jb2RlID0gMTAwMlxuICB9ZWxzZSBpZiAoX2tleS5pbmRleE9mKCd3ZWV4dmVyc2lvbicpID49IDApIHtcbiAgICByZXN1bHQuY29kZSA9IDEwMDNcbiAgfWVsc2UgaWYgKF9rZXkuaW5kZXhPZignZGV2aWNlbW9kZWwnKSA+PSAwKSB7XG4gICAgcmVzdWx0LmNvZGUgPSAxMDA0XG4gIH1cblxuICByZXR1cm4gcmVzdWx0XG59XG5cbi8qKlxuICogV0VFWCBmcmFtZXdvcmsgaW5wdXQoZGV2aWNlSW5mbylcbiAqIHtcbiAqICAgcGxhdGZvcm06ICdpT1MnIG9yICdhbmRyb2lkJ1xuICogICBvc1ZlcnNpb246ICcxLjAuMCcgb3IgJzEuMCcgb3IgJzEnXG4gKiAgIGFwcFZlcnNpb246ICcxLjAuMCcgb3IgJzEuMCcgb3IgJzEnXG4gKiAgIHdlZXhWZXJzaW9uOiAnMS4wLjAnIG9yICcxLjAnIG9yICcxJ1xuICogICBkRGV2aWNlTW9kZWw6ICdNT0RFTF9OQU1FJ1xuICogfVxuICpcbiAqIGRvd25ncmFkZSBjb25maWcoY29uZmlnKVxuICoge1xuICogICBpb3M6IHtcbiAqICAgICBvc1ZlcnNpb246ICc+MS4wLjAnIG9yICc+PTEuMC4wJyBvciAnPDEuMC4wJyBvciAnPD0xLjAuMCcgb3IgJzEuMC4wJ1xuICogICAgIGFwcFZlcnNpb246ICc+MS4wLjAnIG9yICc+PTEuMC4wJyBvciAnPDEuMC4wJyBvciAnPD0xLjAuMCcgb3IgJzEuMC4wJ1xuICogICAgIHdlZXhWZXJzaW9uOiAnPjEuMC4wJyBvciAnPj0xLjAuMCcgb3IgJzwxLjAuMCcgb3IgJzw9MS4wLjAnIG9yICcxLjAuMCdcbiAqICAgICBkZXZpY2VNb2RlbDogWydtb2RlbEEnLCAnbW9kZWxCJywgLi4uXVxuICogICB9LFxuICogICBhbmRyb2lkOiB7XG4gKiAgICAgb3NWZXJzaW9uOiAnPjEuMC4wJyBvciAnPj0xLjAuMCcgb3IgJzwxLjAuMCcgb3IgJzw9MS4wLjAnIG9yICcxLjAuMCdcbiAqICAgICBhcHBWZXJzaW9uOiAnPjEuMC4wJyBvciAnPj0xLjAuMCcgb3IgJzwxLjAuMCcgb3IgJzw9MS4wLjAnIG9yICcxLjAuMCdcbiAqICAgICB3ZWV4VmVyc2lvbjogJz4xLjAuMCcgb3IgJz49MS4wLjAnIG9yICc8MS4wLjAnIG9yICc8PTEuMC4wJyBvciAnMS4wLjAnXG4gKiAgICAgZGV2aWNlTW9kZWw6IFsnbW9kZWxBJywgJ21vZGVsQicsIC4uLl1cbiAqICAgfVxuICogfVxuICpcbiAqXG4gKiBAcGFyYW0gIHtvYmplY3R9IGRldmljZUluZm8gV2VleCBTREsgZnJhbWV3b3JrIGlucHV0XG4gKiBAcGFyYW0gIHtvYmplY3R9IGNvbmZpZyAgICAgdXNlciBpbnB1dFxuICogQHJldHVybiB7T2JqZWN0fSAgICAgICAgICAgIHsgaXNEb3duZ3JhZGU6IHRydWUvZmFsc2UsIGVycm9yTWVzc2FnZS4uLiB9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjaGVjayAoY29uZmlnLCBkZXZpY2VJbmZvKSB7XG4gIGRldmljZUluZm8gPSBkZXZpY2VJbmZvIHx8IGdsb2JhbC5XWEVudmlyb25tZW50XG4gIGRldmljZUluZm8gPSBpc1BsYWluT2JqZWN0KGRldmljZUluZm8pID8gZGV2aWNlSW5mbyA6IHt9XG4gIGNvbmZpZyA9IGlzUGxhaW5PYmplY3QoY29uZmlnKSA/IGNvbmZpZyA6IHt9XG4gIGNvbnN0IHBsYXRmb3JtID0gZGV2aWNlSW5mby5wbGF0Zm9ybSB8fCAndW5rbm93J1xuICBjb25zdCBkUGxhdGZvcm0gPSBwbGF0Zm9ybS50b0xvd2VyQ2FzZSgpXG4gIGNvbnN0IGNPYmogPSBjb25maWdbZFBsYXRmb3JtXSB8fCB7fVxuXG4gIGxldCByZXN1bHQgPSB7XG4gICAgaXNEb3duZ3JhZGU6IGZhbHNlIC8vIGRlZmF1dGwgaXMgcGFzc1xuICB9XG5cbiAgZm9yIChsZXQgaSBpbiBkZXZpY2VJbmZvKSB7XG4gICAgY29uc3Qga2V5ID0gaVxuICAgIGNvbnN0IGtleUxvd2VyID0ga2V5LnRvTG93ZXJDYXNlKClcbiAgICBjb25zdCB2YWwgPSBkZXZpY2VJbmZvW2ldXG4gICAgY29uc3QgaXNWZXJzaW9uID0ga2V5TG93ZXIuaW5kZXhPZigndmVyc2lvbicpID49IDAgPyB0cnVlIDogZmFsc2VcbiAgICBjb25zdCBpc0RldmljZU1vZGVsID0ga2V5TG93ZXIuaW5kZXhPZignZGV2aWNlbW9kZWwnKSA+PSAwID8gdHJ1ZSA6IGZhbHNlXG4gICAgY29uc3QgY3JpdGVyaWEgPSBjT2JqW2ldXG5cbiAgICBpZiAoY3JpdGVyaWEgJiYgaXNWZXJzaW9uKSB7XG4gICAgICBjb25zdCBjID0gdGhpcy5ub3JtYWxpemVWZXJzaW9uKGNyaXRlcmlhKVxuICAgICAgY29uc3QgZCA9IHRoaXMubm9ybWFsaXplVmVyc2lvbihkZXZpY2VJbmZvW2ldKVxuXG4gICAgICBpZiAoc2VtdmVyLnNhdGlzZmllcyhkLCBjKSkge1xuICAgICAgICByZXN1bHQgPSBleHRlbmQodGhpcy5nZXRFcnJvcihrZXksIHZhbCwgY3JpdGVyaWEpKVxuICAgICAgICBicmVha1xuICAgICAgfVxuICAgIH1lbHNlIGlmIChpc0RldmljZU1vZGVsKSB7XG4gICAgICBjb25zdCBfY3JpdGVyaWEgPSB0eXBvZihjcml0ZXJpYSkgPT09ICdhcnJheScgPyBjcml0ZXJpYSA6IFtjcml0ZXJpYV1cbiAgICAgIGlmIChfY3JpdGVyaWEuaW5kZXhPZih2YWwpID49IDApIHtcbiAgICAgICAgcmVzdWx0ID0gZXh0ZW5kKHRoaXMuZ2V0RXJyb3Ioa2V5LCB2YWwsIGNyaXRlcmlhKSlcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0XG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9saWIvYXBwL2Rvd25ncmFkZS5qc1xuICoqLyIsIi8qKlxuICogQGZpbGVPdmVydmlld1xuICogaW5zdGFuY2UgY29udHJvbHMgZnJvbSBuYXRpdmVcbiAqXG4gKiAtIGluaXQgYnVuZGxlXG4gKiAtIGZpcmUgZXZlbnRcbiAqIC0gY2FsbGJhY2tcbiAqIC0gZGVzdHJveVxuICpcbiAqIGNvcnJlc3BvbmRlZCB3aXRoIHRoZSBBUEkgb2YgaW5zdGFuY2UgbWFuYWdlciAoZnJhbWV3b3JrLmpzKVxuICovXG5cbmltcG9ydCB7XG4gIGJpbmQsIGV4dGVuZFxufVxuZnJvbSAnLi4vdXRpbCdcbmltcG9ydCAqIGFzIHBlcmYgZnJvbSAnLi4vcGVyZidcbmltcG9ydCBMaXN0ZW5lciwge2NyZWF0ZUFjdGlvbn0gZnJvbSAnLi9kb20tbGlzdGVuZXInXG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0KGNvZGUsIGRhdGEpIHtcbiAgdmFyIHJlc3VsdFxuICAvLyBAc2VlOiBsaWIvYXBwL2J1bmRsZS5qc1xuICBjb25zdCBkZWZpbmUgPSBiaW5kKHRoaXMuZGVmaW5lLCB0aGlzKVxuICBjb25zdCBib290c3RyYXAgPSAobmFtZSwgY29uZmlnLCBfZGF0YSkgPT4ge1xuICAgIHJlc3VsdCA9IHRoaXMuYm9vdHN0cmFwKG5hbWUsIGNvbmZpZywgX2RhdGEgfHwgZGF0YSlcbiAgICB0aGlzLmRvYy5saXN0ZW5lci5jcmVhdGVGaW5pc2goKVxuICAgIHRoaXMuZG9jLmNsb3NlKClcbiAgfVxuXG4gIC8vIGJhY2t3YXJkKHJlZ2lzdGVyL3JlbmRlcilcbiAgY29uc3QgcmVnaXN0ZXIgPSBiaW5kKHRoaXMucmVnaXN0ZXIsIHRoaXMpXG4gIGNvbnN0IHJlbmRlciA9IChuYW1lLCBfZGF0YSkgPT4ge1xuICAgIHJlc3VsdCA9IHRoaXMuYm9vdHN0cmFwKG5hbWUsIHt9LCBfZGF0YSlcbiAgfVxuXG4gIGNvbnN0IHJlcXVpcmUgPSBuYW1lID0+IF9kYXRhID0+IHtcbiAgICByZXN1bHQgPSB0aGlzLmJvb3RzdHJhcChuYW1lLCB7fSwgX2RhdGEpXG4gIH1cblxuICBjb25zdCBkb2N1bWVudCA9IHRoaXMuZG9jXG5cbiAgcGVyZi5zdGFydCgncnVuIGJ1bmRsZScsIHRoaXMuaWQpXG5cbiAgbGV0IGZ1bmN0aW9uQm9keVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgaWYgKHR5cGVvZiBjb2RlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgLy8gYGZ1bmN0aW9uICgpIHsuLi59YCAtPiBgey4uLn1gXG4gICAgLy8gbm90IHZlcnkgc3RyaWN0XG4gICAgZnVuY3Rpb25Cb2R5ID0gY29kZS50b1N0cmluZygpLnN1YnN0cigxMilcbiAgfSBlbHNlIGlmIChjb2RlKSB7XG4gICAgZnVuY3Rpb25Cb2R5ID0gY29kZS50b1N0cmluZygpXG4gIH1cblxuICBsZXQgZm4gPSBuZXcgRnVuY3Rpb24oXG4gICAgJ2RlZmluZScsXG4gICAgJ3JlcXVpcmUnLFxuICAgICdkb2N1bWVudCcsXG4gICAgJ2Jvb3RzdHJhcCcsXG4gICAgJ3JlZ2lzdGVyJyxcbiAgICAncmVuZGVyJyxcbiAgICBmdW5jdGlvbkJvZHlcbiAgKVxuXG4gIGZuKGRlZmluZSwgcmVxdWlyZSwgZG9jdW1lbnQsIGJvb3RzdHJhcCwgcmVnaXN0ZXIsIHJlbmRlcilcblxuICBwZXJmLmVuZCgncnVuIGJ1bmRsZScsIHRoaXMuaWQpXG4gIHJldHVybiByZXN1bHRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gIHRoaXMuaWQgPSAnJ1xuICB0aGlzLmV2ZW50TWFuYWdlciA9IG51bGxcbiAgdGhpcy5vcHRpb25zID0gbnVsbFxuICB0aGlzLmJsb2NrcyA9IG51bGxcbiAgdGhpcy52bSA9IG51bGxcbiAgdGhpcy5kb2MgPSBudWxsXG4gIHRoaXMuY3VzdG9tQ29tcG9uZW50TWFwID0gbnVsbFxuICB0aGlzLmNhbGxiYWNrcyA9IG51bGxcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFJvb3RFbGVtZW50KCkge1xuICBjb25zdCBkb2MgPSB0aGlzLmRvYyB8fCB7fVxuICBjb25zdCBib2R5ID0gZG9jLmJvZHkgfHwge31cbiAgcmV0dXJuIGJvZHkudG9KU09OID8gYm9keS50b0pTT04oKSA6IHt9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVBY3Rpb25zKGFkZG9uVGFza3MpIHtcbiAgdGhpcy5kaWZmZXIuZmx1c2goKVxuICBjb25zdCB0YXNrcyA9IFtdXG4gIGlmICh0aGlzLmxpc3RlbmVyICYmIHRoaXMubGlzdGVuZXIudXBkYXRlcy5sZW5ndGgpIHtcbiAgICB0YXNrcy5wdXNoKC4uLnRoaXMubGlzdGVuZXIudXBkYXRlcylcbiAgICB0aGlzLmxpc3RlbmVyLnVwZGF0ZXMgPSBbXVxuICB9XG4gIGlmIChhZGRvblRhc2tzICYmIGFkZG9uVGFza3MubGVuZ3RoKSB7XG4gICAgdGFza3MucHVzaCguLi5hZGRvblRhc2tzKVxuICB9XG4gIGlmICh0YXNrcy5sZW5ndGgpIHtcbiAgICB0aGlzLmNhbGxUYXNrcyh0YXNrcylcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZmlyZUV2ZW50KHJlZiwgdHlwZSwgZSwgZG9tQ2hhbmdlcykge1xuICBpZiAoQXJyYXkuaXNBcnJheShyZWYpKSB7XG4gICAgcmVmLnNvbWUoKHJlZikgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuZmlyZUV2ZW50KHJlZiwgdHlwZSwgZSkgIT09IGZhbHNlXG4gICAgfSlcbiAgICByZXR1cm5cbiAgfVxuXG4gIGNvbnN0IGVsID0gdGhpcy5kb2MuZ2V0UmVmKHJlZilcblxuICBpZiAoZWwpIHtcbiAgICBwZXJmLnN0YXJ0KCdtYW5hZ2UgZXZlbnQnLCByZWYgKyAnLScgKyB0eXBlKVxuICAgIGUgPSBlIHx8IHt9XG4gICAgZS50eXBlID0gdHlwZVxuICAgIGUudGFyZ2V0ID0gZWxcbiAgICBlLnRpbWVzdGFtcCA9IERhdGUubm93KClcbiAgICBpZiAoZG9tQ2hhbmdlcykge1xuICAgICAgdXBkYXRlRWxlbWVudChlbCwgZG9tQ2hhbmdlcylcbiAgICB9XG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy5ldmVudE1hbmFnZXIuZmlyZShlbCwgdHlwZSwgZSlcbiAgICBwZXJmLmVuZCgnbWFuYWdlIGV2ZW50JywgcmVmICsgJy0nICsgdHlwZSlcbiAgICB0aGlzLnVwZGF0ZUFjdGlvbnMoKVxuICAgIHJldHVybiByZXN1bHRcbiAgfVxuXG4gIHJldHVybiBuZXcgRXJyb3IoYGludmFsaWQgZWxlbWVudCByZWZlcmVuY2UgXCIke3JlZn1cImApXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjYWxsYmFjayhjYWxsYmFja0lkLCBkYXRhLCBpZkxhc3QpIHtcbiAgY29uc3QgY2FsbGJhY2sgPSB0aGlzLmNhbGxiYWNrc1tjYWxsYmFja0lkXVxuXG4gIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYWxsYmFjayhkYXRhKSAvLyBkYXRhIGlzIGFscmVhZHkgYSBvYmplY3QsIEBzZWU6IGxpYi9mcmFtZXdvcmsuanNcblxuICAgIGlmICh0eXBlb2YgaWZMYXN0ID09PSAndW5kZWZpbmVkJyB8fCBpZkxhc3QgPT09IHRydWUpIHtcbiAgICAgIHRoaXMuY2FsbGJhY2tzW2NhbGxiYWNrSWRdID0gdW5kZWZpbmVkXG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGVBY3Rpb25zKClcbiAgICByZXR1cm5cbiAgfVxuXG4gIHJldHVybiBuZXcgRXJyb3IoYGludmFsaWQgY2FsbGJhY2sgaWQgXCIke2NhbGxiYWNrSWR9XCJgKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVmcmVzaERhdGEoZGF0YSkge1xuICBjb25zdCB2bSA9IHRoaXMudm1cblxuICBpZiAodm0gJiYgZGF0YSkge1xuICAgIGlmICh0eXBlb2Ygdm0ucmVmcmVzaERhdGEgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHZtLnJlZnJlc2hEYXRhKGRhdGEpXG4gICAgfSBlbHNlIHtcbiAgICAgIGV4dGVuZCh2bSwgZGF0YSlcbiAgICB9XG4gICAgdGhpcy51cGRhdGVBY3Rpb25zKFtjcmVhdGVBY3Rpb24oJ3JlZnJlc2hGaW5pc2gnLCBbXSldKVxuICAgIHJldHVyblxuICB9XG5cbiAgcmV0dXJuIG5ldyBFcnJvcihgaW52YWxpZCBkYXRhIFwiJHtkYXRhfVwiYClcbn1cblxuZnVuY3Rpb24gdXBkYXRlRWxlbWVudChlbCwgY2hhbmdlcykge1xuICBjb25zdCBhdHRycyA9IGNoYW5nZXMuYXR0cnMgfHwge31cbiAgZm9yIChjb25zdCBuYW1lIGluIGF0dHJzKSB7XG4gICAgZWwuc2V0QXR0cihuYW1lLCBhdHRycylcbiAgfVxuICBjb25zdCBzdHlsZSA9IGNoYW5nZXMuc3R5bGUgfHwge31cbiAgZm9yIChjb25zdCBuYW1lIGluIHN0eWxlKSB7XG4gICAgZWwuc2V0U3R5bGUobmFtZSwgc3R5bGVbbmFtZV0pXG4gIH1cbn1cblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9saWIvYXBwL2N0cmwuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBMaXN0ZW5lcihpZCwgaGFuZGxlcikge1xuICB0aGlzLmlkID0gaWRcbiAgdGhpcy5iYXRjaGVkID0gZmFsc2VcbiAgdGhpcy51cGRhdGVzID0gW11cbiAgaWYgKHR5cGVvZiBoYW5kbGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhpcy5oYW5kbGVyID0gaGFuZGxlclxuICB9XG59XG5cbkxpc3RlbmVyLnByb3RvdHlwZS5jcmVhdGVGaW5pc2ggPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgY29uc3QgaGFuZGxlciA9IHRoaXMuaGFuZGxlclxuICBoYW5kbGVyKFtjcmVhdGVBY3Rpb24oJ2NyZWF0ZUZpbmlzaCcsIFtdKV0sIGNhbGxiYWNrKVxufVxuXG5MaXN0ZW5lci5wcm90b3R5cGUuY3JlYXRlQm9keSA9IGZ1bmN0aW9uIChlbGVtZW50LCByZWYpIHtcbiAgY29uc3QgYWN0aW9ucyA9IFtjcmVhdGVBY3Rpb24oJ2NyZWF0ZUJvZHknLCBbZWxlbWVudC50b0pTT04oKV0pXVxuICB0aGlzLmFkZEFjdGlvbnMoYWN0aW9ucylcbn1cblxuTGlzdGVuZXIucHJvdG90eXBlLmFkZEVsZW1lbnQgPSBmdW5jdGlvbiAoZWxlbWVudCwgcmVmLCBpbmRleCkge1xuICBpZiAoIShpbmRleCA+PSAwKSkge1xuICAgIGluZGV4ID0gLTFcbiAgfVxuICB0aGlzLmFkZEFjdGlvbnMoY3JlYXRlQWN0aW9uKCdhZGRFbGVtZW50JywgW3JlZiwgZWxlbWVudC50b0pTT04oKSwgaW5kZXhdKSlcbn1cblxuTGlzdGVuZXIucHJvdG90eXBlLnJlbW92ZUVsZW1lbnQgPSBmdW5jdGlvbiAocmVmKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHJlZikpIHtcbiAgICBjb25zdCBhY3Rpb25zID0gcmVmLm1hcCgocikgPT4gY3JlYXRlQWN0aW9uKCdyZW1vdmVFbGVtZW50JywgW3JdKSlcbiAgICB0aGlzLmFkZEFjdGlvbnMoYWN0aW9ucylcbiAgfVxuICBlbHNlIHtcbiAgICB0aGlzLmFkZEFjdGlvbnMoY3JlYXRlQWN0aW9uKCdyZW1vdmVFbGVtZW50JywgW3JlZl0pKVxuICB9XG59XG5cbkxpc3RlbmVyLnByb3RvdHlwZS5tb3ZlRWxlbWVudCA9IGZ1bmN0aW9uICh0YXJnZXRSZWYsIHBhcmVudFJlZiwgaW5kZXgpIHtcbiAgdGhpcy5hZGRBY3Rpb25zKGNyZWF0ZUFjdGlvbignbW92ZUVsZW1lbnQnLCBbdGFyZ2V0UmVmLCBwYXJlbnRSZWYsIGluZGV4XSkpXG59XG5cbkxpc3RlbmVyLnByb3RvdHlwZS5zZXRBdHRyID0gZnVuY3Rpb24gKHJlZiwga2V5LCB2YWx1ZSkge1xuICBjb25zdCByZXN1bHQgPSB7fVxuICByZXN1bHRba2V5XSA9IHZhbHVlXG4gIHRoaXMuYWRkQWN0aW9ucyhjcmVhdGVBY3Rpb24oJ3VwZGF0ZUF0dHJzJywgW3JlZiwgcmVzdWx0XSkpXG59XG5cbkxpc3RlbmVyLnByb3RvdHlwZS5zZXRTdHlsZSA9IGZ1bmN0aW9uIChyZWYsIGtleSwgdmFsdWUpIHtcbiAgY29uc3QgcmVzdWx0ID0ge31cbiAgcmVzdWx0W2tleV0gPSB2YWx1ZVxuICB0aGlzLmFkZEFjdGlvbnMoY3JlYXRlQWN0aW9uKCd1cGRhdGVTdHlsZScsIFtyZWYsIHJlc3VsdF0pKVxufVxuXG5MaXN0ZW5lci5wcm90b3R5cGUuc2V0U3R5bGVzID0gZnVuY3Rpb24gKHJlZiwgc3R5bGUpIHtcbiAgdGhpcy5hZGRBY3Rpb25zKGNyZWF0ZUFjdGlvbigndXBkYXRlU3R5bGUnLCBbcmVmLCBzdHlsZV0pKVxufVxuXG5MaXN0ZW5lci5wcm90b3R5cGUuYWRkRXZlbnQgPSBmdW5jdGlvbiAocmVmLCB0eXBlKSB7XG4gIHRoaXMuYWRkQWN0aW9ucyhjcmVhdGVBY3Rpb24oJ2FkZEV2ZW50JywgW3JlZiwgdHlwZV0pKVxufVxuXG5MaXN0ZW5lci5wcm90b3R5cGUucmVtb3ZlRXZlbnQgPSBmdW5jdGlvbiAocmVmLCB0eXBlKSB7XG4gIHRoaXMuYWRkQWN0aW9ucyhjcmVhdGVBY3Rpb24oJ3JlbW92ZUV2ZW50JywgW3JlZiwgdHlwZV0pKVxufVxuXG5MaXN0ZW5lci5wcm90b3R5cGUuaGFuZGxlciA9IGZ1bmN0aW9uIChhY3Rpb25zLCBjYikge1xuICBjYiAmJiBjYigpXG59XG5cbkxpc3RlbmVyLnByb3RvdHlwZS5hZGRBY3Rpb25zID0gZnVuY3Rpb24gKGFjdGlvbnMpIHtcbiAgY29uc3QgdXBkYXRlcyA9IHRoaXMudXBkYXRlc1xuICBjb25zdCBoYW5kbGVyID0gdGhpcy5oYW5kbGVyXG5cbiAgaWYgKCFBcnJheS5pc0FycmF5KGFjdGlvbnMpKSB7XG4gICAgYWN0aW9ucyA9IFthY3Rpb25zXVxuICB9XG5cbiAgaWYgKHRoaXMuYmF0Y2hlZCkge1xuICAgIHVwZGF0ZXMucHVzaC5hcHBseSh1cGRhdGVzLCBhY3Rpb25zKVxuICB9XG4gIGVsc2Uge1xuICAgIGhhbmRsZXIoYWN0aW9ucylcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQWN0aW9uKG5hbWUsIGFyZ3MpIHtcbiAgcmV0dXJuIHttb2R1bGU6ICdkb20nLCBtZXRob2Q6IG5hbWUsIGFyZ3M6IGFyZ3N9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2xpYi9hcHAvZG9tLWxpc3RlbmVyLmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGlmZmVyIHtcbiAgY29uc3RydWN0b3IgKGlkKSB7XG4gICAgdGhpcy5pZCA9IGlkXG4gICAgdGhpcy5tYXAgPSBbXVxuICAgIHRoaXMuaG9va3MgPSBbXVxuICB9XG4gIGlzRW1wdHkgKCkge1xuICAgIHJldHVybiB0aGlzLm1hcC5sZW5ndGggPT09IDBcbiAgfVxuICBhcHBlbmQgKHR5cGUsIGRlcHRoLCByZWYsIGhhbmRsZXIpIHtcbiAgICBjb25zdCBtYXAgPSB0aGlzLm1hcFxuICAgIGlmICghbWFwW2RlcHRoXSkge1xuICAgICAgbWFwW2RlcHRoXSA9IHt9XG4gICAgfVxuICAgIGNvbnN0IGdyb3VwID0gbWFwW2RlcHRoXVxuICAgIGlmICghZ3JvdXBbdHlwZV0pIHtcbiAgICAgIGdyb3VwW3R5cGVdID0ge31cbiAgICB9XG4gICAgaWYgKHR5cGUgPT09ICdlbGVtZW50Jykge1xuICAgICAgaWYgKCFncm91cFt0eXBlXVtyZWZdKSB7XG4gICAgICAgIGdyb3VwW3R5cGVdW3JlZl0gPSBbXVxuICAgICAgfVxuICAgICAgZ3JvdXBbdHlwZV1bcmVmXS5wdXNoKGhhbmRsZXIpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgZ3JvdXBbdHlwZV1bcmVmXSA9IGhhbmRsZXJcbiAgICB9XG4gIH1cbiAgZmx1c2ggKCkge1xuICAgIGNvbnN0IG1hcCA9IHRoaXMubWFwLnNsaWNlKClcbiAgICB0aGlzLm1hcC5sZW5ndGggPSAwXG4gICAgbWFwLmZvckVhY2goKGdyb3VwKSA9PiB7XG4gICAgICBjYWxsVHlwZU1hcChncm91cCwgJ3JlcGVhdCcpXG4gICAgICBjYWxsVHlwZU1hcChncm91cCwgJ3Nob3duJylcbiAgICAgIGNhbGxUeXBlTGlzdChncm91cCwgJ2VsZW1lbnQnKVxuICAgIH0pXG5cbiAgICBjb25zdCBob29rcyA9IHRoaXMuaG9va3Muc2xpY2UoKVxuICAgIHRoaXMuaG9va3MubGVuZ3RoID0gMFxuICAgIGhvb2tzLmZvckVhY2goKGZuKSA9PiB7XG4gICAgICBmbigpXG4gICAgfSlcblxuICAgIGlmICghdGhpcy5pc0VtcHR5KCkpIHtcbiAgICAgIHRoaXMuZmx1c2goKVxuICAgIH1cbiAgfVxuICB0aGVuIChmbikge1xuICAgIHRoaXMuaG9va3MucHVzaChmbilcbiAgfVxufVxuXG5mdW5jdGlvbiBjYWxsVHlwZU1hcChncm91cCwgdHlwZSkge1xuICBjb25zdCBtYXAgPSBncm91cFt0eXBlXVxuICBmb3IgKGNvbnN0IHJlZiBpbiBtYXApIHtcbiAgICBtYXBbcmVmXSgpXG4gIH1cbn1cblxuZnVuY3Rpb24gY2FsbFR5cGVMaXN0KGdyb3VwLCB0eXBlKSB7XG4gIGNvbnN0IG1hcCA9IGdyb3VwW3R5cGVdXG4gIGZvciAoY29uc3QgcmVmIGluIG1hcCkge1xuICAgIGNvbnN0IGxpc3QgPSBtYXBbcmVmXVxuICAgIGxpc3QuZm9yRWFjaCgoaGFuZGxlcikgPT4ge2hhbmRsZXIoKX0pXG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vbGliL2FwcC9kaWZmZXIuanNcbiAqKi8iLCIvKipcbiAqIEBmaWxlT3ZlcnZpZXcgZXZlbnQgbWFuYWdlclxuICovXG5cbmltcG9ydCAqIGFzIF8gZnJvbSAnLi4vdXRpbCdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRXZlbnRNYW5hZ2VyKCkge1xuICB0aGlzLmVscyA9IFtdXG4gIHRoaXMudGFyZ2V0cyA9IFtdXG59XG5cbkV2ZW50TWFuYWdlci5wcm90b3R5cGUuX2dldCA9IGZ1bmN0aW9uIChlbCwgZm9yY2UpIHtcbiAgdmFyIGluZGV4ID0gXy5pbmRleE9mKHRoaXMuZWxzLCBlbClcbiAgdmFyIHRhcmdldFxuICBpZiAoaW5kZXggPj0gMCkge1xuICAgIHRhcmdldCA9IHRoaXMudGFyZ2V0c1tpbmRleF1cbiAgfVxuICBlbHNlIGlmIChmb3JjZSkge1xuICAgIHRhcmdldCA9IHtlbDogZWwsIGV2ZW50czoge319XG4gICAgdGhpcy5lbHMucHVzaChlbClcbiAgICB0aGlzLnRhcmdldHMucHVzaCh0YXJnZXQpXG4gIH1cbiAgcmV0dXJuIHRhcmdldFxufVxuXG5FdmVudE1hbmFnZXIucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChlbCwgdHlwZSwgaGFuZGxlcikge1xuICBpZiAodHlwZW9mIGVsICE9PSAnb2JqZWN0JyB8fCAhZWwgfHxcbiAgICB0eXBlb2YgdHlwZSAhPT0gJ3N0cmluZycgfHwgIXR5cGUgfHxcbiAgICB0eXBlb2YgaGFuZGxlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVyblxuICB9XG4gIHZhciB0YXJnZXQgPSB0aGlzLl9nZXQoZWwsIHRydWUpXG4gIHRhcmdldC5ldmVudHNbdHlwZV0gPSBoYW5kbGVyXG59XG5cbkV2ZW50TWFuYWdlci5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKGVsLCB0eXBlKSB7XG4gIGlmICh0eXBlb2YgZWwgIT09ICdvYmplY3QnIHx8ICFlbCB8fFxuICAgIHR5cGVvZiB0eXBlICE9PSAnc3RyaW5nJyB8fCAhdHlwZSkge1xuICAgIHJldHVyblxuICB9XG4gIHZhciB0YXJnZXQgPSB0aGlzLl9nZXQoZWwpXG4gIGlmICh0YXJnZXQpIHtcbiAgICBkZWxldGUgdGFyZ2V0LmV2ZW50c1t0eXBlXVxuICB9XG59XG5cbkV2ZW50TWFuYWdlci5wcm90b3R5cGUuZmlyZSA9IGZ1bmN0aW9uIChlbCwgdHlwZSwgZSkge1xuICB2YXIgdGFyZ2V0ID0gdGhpcy5fZ2V0KGVsKVxuICB2YXIgaGFuZGxlciwgZWxcbiAgaWYgKHRhcmdldCkge1xuICAgIGVsID0gdGFyZ2V0LmVsXG4gICAgaGFuZGxlciA9IHRhcmdldC5ldmVudHNbdHlwZV1cbiAgICBpZiAodHlwZW9mIGhhbmRsZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBoYW5kbGVyLmNhbGwoZWwsIGUpXG4gICAgfVxuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2xpYi9hcHAvZXZlbnQuanNcbiAqKi8iLCIvKipcbiAqIEBmaWxlT3ZlcnZpZXdcbiAqIEEgc2ltcGxlIHZpcnR1YWwgZG9tIGltcGxlbWVudGF0aW9uXG4gKi9cblxuY29uc3QgREVGQVVMVF9UQUdfTkFNRSA9ICdkaXYnXG5cbmV4cG9ydCBjb25zdCBpbnN0YW5jZU1hcCA9IHt9XG5cbmV4cG9ydCBmdW5jdGlvbiBEb2N1bWVudChpZCkge1xuICBpZCA9IGlkID8gaWQudG9TdHJpbmcoKSA6ICcnXG4gIHRoaXMuaWQgPSBpZFxuICB0aGlzLm5leHRSZWYgPSAxXG4gIHRoaXMubm9kZU1hcCA9IHt9XG4gIHRoaXMubGlzdGVuZXIgPSBudWxsXG4gIHRoaXMuZXZlbnRNYW5hZ2VyID0gbnVsbFxuICB0aGlzLmNsb3NlZCA9IGZhbHNlXG4gIGluc3RhbmNlTWFwW2lkXSA9IHRoaXNcblxuICB0aGlzLmNyZWF0ZURvY3VtZW50RWxlbWVudCgpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXN0cm95RG9jdW1lbnQoaWQpIHtcbiAgZGVsZXRlIGluc3RhbmNlTWFwW2lkXVxufVxuXG5Eb2N1bWVudC5wcm90b3R5cGUub3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5jbG9zZWQgPSBmYWxzZVxuICBpZiAodGhpcy5saXN0ZW5lcikge1xuICAgIHRoaXMubGlzdGVuZXIuYmF0Y2hlZCA9IGZhbHNlXG4gIH1cbn1cbkRvY3VtZW50LnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5jbG9zZWQgPSB0cnVlXG4gIGlmICh0aGlzLmxpc3RlbmVyKSB7XG4gICAgdGhpcy5saXN0ZW5lci5iYXRjaGVkID0gdHJ1ZVxuICB9XG59XG5cbkRvY3VtZW50LnByb3RvdHlwZS5zZXRFdmVudE1hbmFnZXIgPSBmdW5jdGlvbiAoZXZlbnRNYW5hZ2VyKSB7XG4gIHRoaXMuZXZlbnRNYW5hZ2VyID0gZXZlbnRNYW5hZ2VyXG59XG5cbkRvY3VtZW50LnByb3RvdHlwZS5zZXRMaXN0ZW5lciA9IGZ1bmN0aW9uIChsaXN0ZW5lcikge1xuICB0aGlzLmxpc3RlbmVyID0gbGlzdGVuZXJcbiAgbGlzdGVuZXIuYmF0Y2hlZCA9ICEhdGhpcy5jbG9zZWRcbn1cblxuRG9jdW1lbnQucHJvdG90eXBlLmFkZFJlZiA9IGZ1bmN0aW9uIChlbCkge1xuICBlbC5yZWYgPSB0aGlzLm5leHRSZWYudG9TdHJpbmcoKVxuICB0aGlzLm5vZGVNYXBbZWwucmVmXSA9IGVsXG4gIHRoaXMubmV4dFJlZisrXG59XG5cbkRvY3VtZW50LnByb3RvdHlwZS5nZXRSZWYgPSBmdW5jdGlvbiAocmVmKSB7XG4gIHJldHVybiB0aGlzLm5vZGVNYXBbcmVmXVxufVxuXG5Eb2N1bWVudC5wcm90b3R5cGUucmVtb3ZlUmVmID0gZnVuY3Rpb24gKHJlZikge1xuICBkZWxldGUgdGhpcy5ub2RlTWFwW3JlZl1cbn1cblxuRG9jdW1lbnQucHJvdG90eXBlLmNyZWF0ZURvY3VtZW50RWxlbWVudCA9IGZ1bmN0aW9uICh0eXBlLCBwcm9wcykge1xuICBpZiAoIXRoaXMuZG9jdW1lbnRFbGVtZW50KSB7XG4gICAgdGhpcy5kb2N1bWVudEVsZW1lbnQgPSBuZXcgRWxlbWVudCh0eXBlLCBwcm9wcywgdGhpcylcbiAgICB0aGlzLm5vZGVNYXAuX2RvY3VtZW50RWxlbWVudCA9IHRoaXMuZG9jdW1lbnRFbGVtZW50XG4gICAgdGhpcy5kb2N1bWVudEVsZW1lbnQucmVmID0gJ19kb2N1bWVudEVsZW1lbnQnXG4gICAgdGhpcy5kb2N1bWVudEVsZW1lbnQuYXR0YWNoZWQgPSB0cnVlXG4gIH1cblxuICByZXR1cm4gdGhpcy5kb2N1bWVudEVsZW1lbnRcbn1cblxuRG9jdW1lbnQucHJvdG90eXBlLmNyZWF0ZUJvZHkgPSBmdW5jdGlvbiAodHlwZSwgcHJvcHMpIHtcbiAgaWYgKCF0aGlzLmJvZHkpIHtcbiAgICB0aGlzLmJvZHkgPSBuZXcgRWxlbWVudCh0eXBlLCBwcm9wcywgdGhpcylcbiAgICB0aGlzLm5vZGVNYXAuX3Jvb3QgPSB0aGlzLmJvZHlcbiAgICB0aGlzLmJvZHkucmVmID0gJ19yb290J1xuICAgIHRoaXMuYm9keS5kZXB0aCA9IDFcbiAgfVxuXG4gIHJldHVybiB0aGlzLmJvZHlcbn1cblxuRG9jdW1lbnQucHJvdG90eXBlLmNyZWF0ZUVsZW1lbnQgPSBmdW5jdGlvbiAodGFnTmFtZSwgcHJvcHMpIHtcbiAgcmV0dXJuIG5ldyBFbGVtZW50KHRhZ05hbWUsIHByb3BzLCB0aGlzKVxufVxuXG5Eb2N1bWVudC5wcm90b3R5cGUuY3JlYXRlQ29tbWVudCA9IGZ1bmN0aW9uICh0ZXh0KSB7XG4gIHJldHVybiBuZXcgQ29tbWVudCh0ZXh0LCB0aGlzKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gTm9kZSgpIHtcbn1cblxuTm9kZS5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gKGluc3RhbmNlSWQpIHtcbiAgdGhpcy5wYXJlbnRSZWYgPSBudWxsXG4gIHRoaXMuYXR0YWNoZWQgPSBmYWxzZVxuICBpZiAoaW5zdGFuY2VJZCkge1xuICAgIHRoaXMuaW5zdGFuY2VJZCA9IGluc3RhbmNlSWRcbiAgICBjb25zdCBkb2MgPSBpbnN0YW5jZU1hcFtpbnN0YW5jZUlkXVxuICAgIGRvYy5hZGRSZWYodGhpcylcbiAgfVxufVxuXG5Ob2RlLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICBjb25zdCByZWYgPSB0aGlzLnJlZlxuICBjb25zdCBpbnN0YW5jZUlkID0gdGhpcy5pbnN0YW5jZUlkXG4gIGlmIChpbnN0YW5jZUlkKSB7XG4gICAgY29uc3QgZG9jID0gaW5zdGFuY2VNYXBbaW5zdGFuY2VJZF1cbiAgICBkb2MucmVtb3ZlUmVmKHJlZilcbiAgfVxuXG4gIGNvbnN0IGNoaWxkcmVuID0gdGhpcy5jaGlsZHJlbiB8fCBbXVxuICBjb25zdCBsZW5ndGggPSBjaGlsZHJlbi5sZW5ndGhcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGNoaWxkcmVuW2ldLmRlc3Ryb3koKVxuICB9XG59XG5cbk5vZGUucHJvdG90eXBlLmdldFJlbmRlcmVyID0gZnVuY3Rpb24gKCkge1xuICBjb25zdCBkb2MgPSBpbnN0YW5jZU1hcFt0aGlzLmluc3RhbmNlSWRdXG4gIHJldHVybiBkb2MubGlzdGVuZXJcbn1cblxuTm9kZS5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgaW5zdGFuY2VJZCA9IHRoaXMuaW5zdGFuY2VJZFxuICBjb25zdCBkb2MgPSBpbnN0YW5jZU1hcFtpbnN0YW5jZUlkXVxuICBjb25zdCBwYXJlbnQgPSBkb2MuZ2V0UmVmKHRoaXMucGFyZW50UmVmKVxuICBpZiAocGFyZW50KSB7XG4gICAgcmV0dXJuIHBhcmVudC5jaGlsZHJlbltwYXJlbnQuY2hpbGRyZW4uaW5kZXhPZih0aGlzKSArIDFdXG4gIH1cbn1cblxuTm9kZS5wcm90b3R5cGUucHJldiA9IGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgaW5zdGFuY2VJZCA9IHRoaXMuaW5zdGFuY2VJZFxuICBjb25zdCBkb2MgPSBpbnN0YW5jZU1hcFtpbnN0YW5jZUlkXVxuICBjb25zdCBwYXJlbnQgPSBkb2MuZ2V0UmVmKHRoaXMucGFyZW50UmVmKVxuICBpZiAocGFyZW50KSB7XG4gICAgcmV0dXJuIHBhcmVudC5jaGlsZHJlbltwYXJlbnQuY2hpbGRyZW4uaW5kZXhPZih0aGlzKSAtIDFdXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEVsZW1lbnQodHlwZT1ERUZBVUxUX1RBR19OQU1FLCBwcm9wcywgb3duZXJEb2N1bWVudCkge1xuICBwcm9wcyA9IHByb3BzIHx8IHt9XG4gIHRoaXMuY3JlYXRlKG93bmVyRG9jdW1lbnQuaWQpXG4gIHRoaXMub3duZXJEb2N1bWVudCA9IG93bmVyRG9jdW1lbnRcbiAgdGhpcy50eXBlID0gdHlwZVxuICB0aGlzLmF0dHIgPSBwcm9wcy5hdHRyIHx8IHt9XG4gIHRoaXMuY2xhc3NTdHlsZSA9IHByb3BzLmNsYXNzU3R5bGUgfHwge31cbiAgdGhpcy5zdHlsZSA9IHByb3BzLnN0eWxlIHx8IHt9XG4gIHRoaXMuZXZlbnQgPSBbXVxuICB0aGlzLmNoaWxkcmVuID0gW11cbiAgdGhpcy5wdXJlQ2hpbGRyZW4gPSBbXVxufVxuXG5FbGVtZW50LnByb3RvdHlwZSA9IG5ldyBOb2RlKClcblxuRWxlbWVudC5wcm90b3R5cGUuYXBwZW5kQ2hpbGQgPSBmdW5jdGlvbiAobm9kZSkge1xuXG4gIHJlbW92ZUlmRXhpc3RlZChub2RlKVxuICBub2RlLnBhcmVudFJlZiA9IHRoaXMucmVmXG4gIHRoaXMuY2hpbGRyZW4ucHVzaChub2RlKVxuXG4gIGlmICh0aGlzLmF0dGFjaGVkKSB7XG4gICAgc2V0QXR0YWNoZWQobm9kZSwgdGhpcy5kZXB0aClcbiAgfVxuICBlbHNlIHtcbiAgICBzZXREZXRhY2hlZChub2RlKVxuICB9XG5cbiAgaWYgKG5vZGUgaW5zdGFuY2VvZiBFbGVtZW50KSB7XG4gICAgdGhpcy5wdXJlQ2hpbGRyZW4ucHVzaChub2RlKVxuXG4gICAgaWYgKHRoaXMuYXR0YWNoZWQpIHtcbiAgICAgIGNvbnN0IHJlbmRlcmVyID0gdGhpcy5nZXRSZW5kZXJlcigpXG4gICAgICBpZiAocmVuZGVyZXIpIHtcbiAgICAgICAgaWYgKHRoaXMucmVmID09PSAnX2RvY3VtZW50RWxlbWVudCcpIHtcbiAgICAgICAgICAvLyBpZiBpdHMgcGFyZW50IGlzIGRvY3VtZW50RWxlbWVudCB0aGVuIGl0J3MgYSBib2R5XG4gICAgICAgICAgcmVuZGVyZXIuY3JlYXRlQm9keShub2RlLCB0aGlzLnJlZilcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICByZW5kZXJlci5hZGRFbGVtZW50KG5vZGUsIHRoaXMucmVmKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbkVsZW1lbnQucHJvdG90eXBlLmluc2VydEJlZm9yZSA9IGZ1bmN0aW9uIChub2RlLCBiZWZvcmUpIHtcblxuICBpZiAobm9kZS5wYXJlbnRSZWYgPT09IHRoaXMucmVmKSB7XG4gICAgbW92ZUJlZm9yZShub2RlLCBiZWZvcmUsIHRoaXMuY2hpbGRyZW4pXG4gICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBFbGVtZW50KSB7XG4gICAgICBjb25zdCBwdXJlQmVmb3JlSW5kZXggPSBtb3ZlUHVyZUJlZm9yZShub2RlLCBiZWZvcmUsIHRoaXMucHVyZUNoaWxkcmVuKVxuICAgICAgaWYgKHB1cmVCZWZvcmVJbmRleCA+PSAwICYmIHRoaXMuYXR0YWNoZWQpIHtcbiAgICAgICAgY29uc3QgcmVuZGVyZXIgPSB0aGlzLmdldFJlbmRlcmVyKClcbiAgICAgICAgaWYgKHJlbmRlcmVyKSB7XG4gICAgICAgICAgcmVuZGVyZXIubW92ZUVsZW1lbnQobm9kZS5yZWYsIHRoaXMucmVmLCBwdXJlQmVmb3JlSW5kZXgpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuXG4gIH1cblxuICByZW1vdmVJZkV4aXN0ZWQobm9kZSlcblxuICBjb25zdCBjaGlsZHJlbiA9IHRoaXMuY2hpbGRyZW5cbiAgY29uc3QgaW5kZXggPSBjaGlsZHJlbi5pbmRleE9mKGJlZm9yZSlcblxuICBub2RlLnBhcmVudFJlZiA9IHRoaXMucmVmXG4gIGlmICh0aGlzLmF0dGFjaGVkKSB7XG4gICAgc2V0QXR0YWNoZWQobm9kZSwgdGhpcy5kZXB0aClcbiAgfVxuICBlbHNlIHtcbiAgICBzZXREZXRhY2hlZChub2RlKVxuICB9XG4gIGNoaWxkcmVuLnNwbGljZShpbmRleCwgMCwgbm9kZSlcblxuICBpZiAobm9kZSBpbnN0YW5jZW9mIEVsZW1lbnQpIHtcbiAgICBjb25zdCBwdXJlQ2hpbGRyZW4gPSB0aGlzLnB1cmVDaGlsZHJlblxuICAgIGNvbnN0IHB1cmVJbmRleCA9IGdldFB1cmVBZnRlcihiZWZvcmUsIHB1cmVDaGlsZHJlbilcblxuICAgIHB1cmVDaGlsZHJlbi5zcGxpY2UocHVyZUluZGV4LCAwLCBub2RlKVxuXG4gICAgaWYgKHRoaXMuYXR0YWNoZWQpIHtcbiAgICAgIGNvbnN0IHJlbmRlcmVyID0gdGhpcy5nZXRSZW5kZXJlcigpXG4gICAgICBpZiAocmVuZGVyZXIpIHtcbiAgICAgICAgcmVuZGVyZXIuYWRkRWxlbWVudChub2RlLCB0aGlzLnJlZiwgcHVyZUluZGV4KVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5FbGVtZW50LnByb3RvdHlwZS5pbnNlcnRBZnRlciA9IGZ1bmN0aW9uIChub2RlLCBhZnRlcikge1xuXG4gIGlmIChub2RlLnBhcmVudFJlZiA9PT0gdGhpcy5yZWYpIHtcbiAgICBtb3ZlQWZ0ZXIobm9kZSwgYWZ0ZXIsIHRoaXMuY2hpbGRyZW4pXG4gICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBFbGVtZW50KSB7XG4gICAgICBjb25zdCBwdXJlQWZ0ZXJJbmRleCA9IG1vdmVQdXJlQWZ0ZXIobm9kZSwgYWZ0ZXIsIHRoaXMucHVyZUNoaWxkcmVuKVxuICAgICAgaWYgKHB1cmVBZnRlckluZGV4ID49IDAgJiYgdGhpcy5hdHRhY2hlZCkge1xuICAgICAgICBjb25zdCByZW5kZXJlciA9IHRoaXMuZ2V0UmVuZGVyZXIoKVxuICAgICAgICBpZiAocmVuZGVyZXIpIHtcbiAgICAgICAgICByZW5kZXJlci5tb3ZlRWxlbWVudChub2RlLnJlZiwgdGhpcy5yZWYsIHB1cmVBZnRlckluZGV4KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVyblxuICB9XG5cbiAgcmVtb3ZlSWZFeGlzdGVkKG5vZGUpXG5cbiAgY29uc3QgY2hpbGRyZW4gPSB0aGlzLmNoaWxkcmVuXG4gIGNvbnN0IGluZGV4ID0gY2hpbGRyZW4uaW5kZXhPZihhZnRlcilcblxuICBub2RlLnBhcmVudFJlZiA9IHRoaXMucmVmXG4gIGlmICh0aGlzLmF0dGFjaGVkKSB7XG4gICAgc2V0QXR0YWNoZWQobm9kZSwgdGhpcy5kZXB0aClcbiAgfVxuICBlbHNlIHtcbiAgICBzZXREZXRhY2hlZChub2RlKVxuICB9XG4gIGNoaWxkcmVuLnNwbGljZShpbmRleCArIDEsIDAsIG5vZGUpXG5cbiAgaWYgKG5vZGUgaW5zdGFuY2VvZiBFbGVtZW50KSB7XG4gICAgY29uc3QgcHVyZUNoaWxkcmVuID0gdGhpcy5wdXJlQ2hpbGRyZW5cbiAgICBjb25zdCBwdXJlSW5kZXggPSBnZXRQdXJlQmVmb3JlKGFmdGVyLCBwdXJlQ2hpbGRyZW4pXG5cbiAgICBwdXJlQ2hpbGRyZW4uc3BsaWNlKHB1cmVJbmRleCArIDEsIDAsIG5vZGUpXG5cbiAgICBpZiAodGhpcy5hdHRhY2hlZCkge1xuICAgICAgY29uc3QgcmVuZGVyZXIgPSB0aGlzLmdldFJlbmRlcmVyKClcbiAgICAgIGlmIChyZW5kZXJlcikge1xuICAgICAgICByZW5kZXJlci5hZGRFbGVtZW50KG5vZGUsIHRoaXMucmVmLCBwdXJlSW5kZXggKyAxKVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5FbGVtZW50LnByb3RvdHlwZS5yZW1vdmVDaGlsZCA9IGZ1bmN0aW9uIChub2RlLCBwcmVzZXJ2ZWQpIHtcbiAgY29uc3QgY2hpbGRyZW4gPSB0aGlzLmNoaWxkcmVuXG4gIGNvbnN0IGluZGV4ID0gY2hpbGRyZW4uaW5kZXhPZihub2RlKVxuXG4gIHNldERldGFjaGVkKG5vZGUpXG5cbiAgaWYgKGluZGV4ID49IDApIHtcbiAgICBub2RlLnBhcmVudFJlZiA9IG51bGxcbiAgICBjaGlsZHJlbi5zcGxpY2UoaW5kZXgsIDEpXG4gICAgaWYgKCFwcmVzZXJ2ZWQpIHtcbiAgICAgIG5vZGUuZGVzdHJveSgpXG4gICAgfVxuICB9XG5cbiAgaWYgKG5vZGUgaW5zdGFuY2VvZiBFbGVtZW50KSB7XG4gICAgdGhpcy5wdXJlQ2hpbGRyZW4uJHJlbW92ZShub2RlKVxuICAgIGlmICh0aGlzLmF0dGFjaGVkKSB7XG4gICAgICBjb25zdCByZW5kZXJlciA9IHRoaXMuZ2V0UmVuZGVyZXIoKVxuICAgICAgaWYgKHJlbmRlcmVyKSB7XG4gICAgICAgIHJlbmRlcmVyLnJlbW92ZUVsZW1lbnQobm9kZS5yZWYpXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbkVsZW1lbnQucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICBjb25zdCBjaGlsZHJlbiA9IHRoaXMuY2hpbGRyZW5cbiAgY29uc3QgbGVuZ3RoID0gY2hpbGRyZW4ubGVuZ3RoXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBjaGlsZCA9IGNoaWxkcmVuW2ldXG4gICAgY2hpbGQucGFyZW50UmVmID0gbnVsbFxuICAgIHNldERldGFjaGVkKGNoaWxkKVxuICAgIGNoaWxkLmRlc3Ryb3koKVxuICB9XG4gIGNoaWxkcmVuLmxlbmd0aCA9IDBcblxuICBpZiAodGhpcy5hdHRhY2hlZCkge1xuICAgIGNvbnN0IHJlZnMgPSB0aGlzLnB1cmVDaGlsZHJlbi5tYXAoKGNoaWxkKSA9PiBjaGlsZC5yZWYpXG4gICAgdGhpcy5wdXJlQ2hpbGRyZW4ubGVuZ3RoID0gMFxuICAgIGNvbnN0IHJlbmRlcmVyID0gdGhpcy5nZXRSZW5kZXJlcigpXG4gICAgaWYgKHJlbmRlcmVyKSB7XG4gICAgICByZW5kZXJlci5yZW1vdmVFbGVtZW50KHJlZnMpXG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIG1vdmVCZWZvcmUobm9kZSwgYmVmb3JlLCBjaGlsZHJlbikge1xuICBjb25zdCB0YXJnZXRJbmRleCA9IGNoaWxkcmVuLmluZGV4T2Yobm9kZSlcbiAgY29uc3QgYmVmb3JlSW5kZXggPSBjaGlsZHJlbi5pbmRleE9mKGJlZm9yZSlcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBpZiAodGFyZ2V0SW5kZXggPT09IGJlZm9yZUluZGV4IHx8IHRhcmdldEluZGV4ICsgMSA9PT0gYmVmb3JlSW5kZXgpIHtcbiAgICByZXR1cm4gLTFcbiAgfVxuXG4gIGNvbnN0IG5ld0luZGV4ID0gdGFyZ2V0SW5kZXggPCBiZWZvcmVJbmRleCA/IGJlZm9yZUluZGV4IC0gMSA6IGJlZm9yZUluZGV4XG4gIGNoaWxkcmVuLnNwbGljZSh0YXJnZXRJbmRleCwgMSlcbiAgY2hpbGRyZW4uc3BsaWNlKG5ld0luZGV4LCAwLCBub2RlKVxuXG4gIHJldHVybiBiZWZvcmVJbmRleFxufVxuXG5mdW5jdGlvbiBtb3ZlUHVyZUJlZm9yZShub2RlLCBiZWZvcmUsIHB1cmVDaGlsZHJlbikge1xuICBjb25zdCBwdXJlVGFyZ2V0SW5kZXggPSBwdXJlQ2hpbGRyZW4uaW5kZXhPZihub2RlKVxuICBjb25zdCBwdXJlQmVmb3JlSW5kZXggPSBnZXRQdXJlQWZ0ZXIoYmVmb3JlLCBwdXJlQ2hpbGRyZW4pXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgaWYgKHB1cmVUYXJnZXRJbmRleCA9PT0gcHVyZUJlZm9yZUluZGV4IHx8XG4gICAgcHVyZVRhcmdldEluZGV4ICsgMSA9PT0gcHVyZUJlZm9yZUluZGV4KSB7XG4gICAgcmV0dXJuIC0xXG4gIH1cblxuICBjb25zdCBwdXJlTmV3SW5kZXggPSBwdXJlVGFyZ2V0SW5kZXggPCBwdXJlQmVmb3JlSW5kZXhcbiAgICA/IHB1cmVCZWZvcmVJbmRleCAtIDFcbiAgICA6IHB1cmVCZWZvcmVJbmRleFxuXG4gIHB1cmVDaGlsZHJlbi5zcGxpY2UocHVyZVRhcmdldEluZGV4LCAxKVxuICBwdXJlQ2hpbGRyZW4uc3BsaWNlKHB1cmVOZXdJbmRleCwgMCwgbm9kZSlcblxuICByZXR1cm4gcHVyZUJlZm9yZUluZGV4XG59XG5cbmZ1bmN0aW9uIGdldFB1cmVBZnRlcihub2RlLCBwdXJlQ2hpbGRyZW4pIHtcbiAgbGV0IHB1cmVJbmRleCA9IHB1cmVDaGlsZHJlbi5pbmRleE9mKG5vZGUpXG4gIHdoaWxlIChub2RlICYmIHB1cmVJbmRleCA8IDApIHtcbiAgICBub2RlID0gbm9kZS5uZXh0KClcbiAgICBwdXJlSW5kZXggPSBwdXJlQ2hpbGRyZW4uaW5kZXhPZihub2RlKVxuICB9XG4gIGlmIChwdXJlSW5kZXggPCAwKSB7XG4gICAgcHVyZUluZGV4ID0gcHVyZUNoaWxkcmVuLmxlbmd0aFxuICB9XG4gIHJldHVybiBwdXJlSW5kZXhcbn1cblxuZnVuY3Rpb24gbW92ZUFmdGVyKG5vZGUsIGFmdGVyLCBjaGlsZHJlbikge1xuICBjb25zdCB0YXJnZXRJbmRleCA9IGNoaWxkcmVuLmluZGV4T2Yobm9kZSlcbiAgY29uc3QgYWZ0ZXJJbmRleCA9IGNoaWxkcmVuLmluZGV4T2YoYWZ0ZXIpXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgaWYgKHRhcmdldEluZGV4ID09PSBhZnRlckluZGV4IHx8IHRhcmdldEluZGV4ID09PSBhZnRlckluZGV4ICsgMSkge1xuICAgIHJldHVybiAtMVxuICB9XG5cbiAgY29uc3QgbmV3SW5kZXggPSB0YXJnZXRJbmRleCA8IGFmdGVySW5kZXggPyBhZnRlckluZGV4IDogYWZ0ZXJJbmRleCArIDFcbiAgY2hpbGRyZW4uc3BsaWNlKHRhcmdldEluZGV4LCAxKVxuICBjaGlsZHJlbi5zcGxpY2UobmV3SW5kZXgsIDAsIG5vZGUpXG5cbiAgcmV0dXJuIGFmdGVySW5kZXhcbn1cblxuZnVuY3Rpb24gbW92ZVB1cmVBZnRlcihub2RlLCBhZnRlciwgcHVyZUNoaWxkcmVuKSB7XG4gIGNvbnN0IHB1cmVUYXJnZXRJbmRleCA9IHB1cmVDaGlsZHJlbi5pbmRleE9mKG5vZGUpXG4gIGNvbnN0IHB1cmVBZnRlckluZGV4ID0gZ2V0UHVyZUJlZm9yZShhZnRlciwgcHVyZUNoaWxkcmVuKVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIGlmIChwdXJlVGFyZ2V0SW5kZXggPT09IHB1cmVBZnRlckluZGV4IHx8XG4gICAgcHVyZVRhcmdldEluZGV4ID09PSBwdXJlQWZ0ZXJJbmRleCArIDEpIHtcbiAgICByZXR1cm4gLTFcbiAgfVxuXG4gIGNvbnN0IHB1cmVOZXdJbmRleCA9IHB1cmVUYXJnZXRJbmRleCA8IHB1cmVBZnRlckluZGV4XG4gICAgPyBwdXJlQWZ0ZXJJbmRleFxuICAgIDogcHVyZUFmdGVySW5kZXggKyAxXG5cbiAgcHVyZUNoaWxkcmVuLnNwbGljZShwdXJlVGFyZ2V0SW5kZXgsIDEpXG4gIHB1cmVDaGlsZHJlbi5zcGxpY2UocHVyZU5ld0luZGV4LCAwLCBub2RlKVxuXG4gIHJldHVybiBwdXJlQWZ0ZXJJbmRleCArIDFcbn1cblxuZnVuY3Rpb24gZ2V0UHVyZUJlZm9yZShub2RlLCBwdXJlQ2hpbGRyZW4pIHtcbiAgbGV0IHB1cmVJbmRleCA9IHB1cmVDaGlsZHJlbi5pbmRleE9mKG5vZGUpXG4gIHdoaWxlIChub2RlICYmIHB1cmVJbmRleCA8IDApIHtcbiAgICBub2RlID0gbm9kZS5wcmV2KClcbiAgICBwdXJlSW5kZXggPSBwdXJlQ2hpbGRyZW4uaW5kZXhPZihub2RlKVxuICB9XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIGlmIChwdXJlSW5kZXggPCAwKSB7XG4gICAgcHVyZUluZGV4ID0gLTFcbiAgfVxuICByZXR1cm4gcHVyZUluZGV4XG59XG5cbmZ1bmN0aW9uIHNldEF0dGFjaGVkKG5vZGUsIGRlcHRoKSB7XG4gIGlmIChub2RlLnJlZiA9PT0gJ19yb290Jykge1xuICAgIGRlcHRoID0gMVxuICB9XG4gIGVsc2Uge1xuICAgIGRlcHRoID0gZGVwdGggPiAwID8gZGVwdGggKyAxIDogMFxuICB9XG4gIG5vZGUuYXR0YWNoZWQgPSB0cnVlXG4gIG5vZGUuZGVwdGggPSBkZXB0aFxuICBpZiAobm9kZS5jaGlsZHJlbikge1xuICAgIG5vZGUuY2hpbGRyZW4uZm9yRWFjaCgoc3ViKSA9PiB7XG4gICAgICBzZXRBdHRhY2hlZChzdWIsIGRlcHRoKVxuICAgIH0pXG4gIH1cbn1cblxuZnVuY3Rpb24gc2V0RGV0YWNoZWQobm9kZSkge1xuICBub2RlLmF0dGFjaGVkID0gZmFsc2VcbiAgbm9kZS5kZXB0aCA9IDBcbiAgaWYgKG5vZGUuY2hpbGRyZW4pIHtcbiAgICBub2RlLmNoaWxkcmVuLmZvckVhY2goKHN1YikgPT4ge1xuICAgICAgc2V0RGV0YWNoZWQoc3ViKVxuICAgIH0pXG4gIH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlSWZFeGlzdGVkKG5vZGUpIHtcbiAgY29uc3QgZG9jID0gaW5zdGFuY2VNYXBbbm9kZS5pbnN0YW5jZUlkXVxuICBpZiAoZG9jKSB7XG4gICAgY29uc3QgZXhpc3RlZE5vZGUgPSBkb2MuZ2V0UmVmKG5vZGUucmVmKVxuICAgIGlmIChleGlzdGVkTm9kZSkge1xuICAgICAgY29uc3QgZXhpc3RlZFBhcmVudCA9IGRvYy5nZXRSZWYoZXhpc3RlZE5vZGUucGFyZW50UmVmKVxuICAgICAgaWYgKGV4aXN0ZWRQYXJlbnQgJiYgZXhpc3RlZFBhcmVudC5yZW1vdmVDaGlsZCkge1xuICAgICAgICBleGlzdGVkUGFyZW50LnJlbW92ZUNoaWxkKGV4aXN0ZWROb2RlLCB0cnVlKVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5FbGVtZW50LnByb3RvdHlwZS5zZXRBdHRyID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgaWYgKHRoaXMuYXR0cltrZXldID09PSB2YWx1ZSkge1xuICAgIHJldHVyblxuICB9XG4gIHRoaXMuYXR0cltrZXldID0gdmFsdWVcbiAgaWYgKHRoaXMuYXR0YWNoZWQpIHtcbiAgICBjb25zdCByZW5kZXJlciA9IHRoaXMuZ2V0UmVuZGVyZXIoKVxuICAgIGlmIChyZW5kZXJlcikge1xuICAgICAgcmVuZGVyZXIuc2V0QXR0cih0aGlzLnJlZiwga2V5LCB2YWx1ZSlcbiAgICB9XG4gIH1cbn1cblxuRWxlbWVudC5wcm90b3R5cGUuc2V0U3R5bGUgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICBpZiAodGhpcy5zdHlsZVtrZXldID09PSB2YWx1ZSkge1xuICAgIHJldHVyblxuICB9XG4gIHRoaXMuc3R5bGVba2V5XSA9IHZhbHVlXG4gIGlmICh0aGlzLmF0dGFjaGVkKSB7XG4gICAgY29uc3QgcmVuZGVyZXIgPSB0aGlzLmdldFJlbmRlcmVyKClcbiAgICBpZiAocmVuZGVyZXIpIHtcbiAgICAgIHJlbmRlcmVyLnNldFN0eWxlKHRoaXMucmVmLCBrZXksIHZhbHVlKVxuICAgIH1cbiAgfVxufVxuXG5FbGVtZW50LnByb3RvdHlwZS5zZXRDbGFzc1N0eWxlID0gZnVuY3Rpb24gKGNsYXNzU3R5bGUpIHtcbiAgdGhpcy5jbGFzc1N0eWxlID0gY2xhc3NTdHlsZVxuICBpZiAodGhpcy5hdHRhY2hlZCkge1xuICAgIGNvbnN0IHJlbmRlcmVyID0gdGhpcy5nZXRSZW5kZXJlcigpXG4gICAgaWYgKHJlbmRlcmVyKSB7XG4gICAgICByZW5kZXJlci5zZXRTdHlsZXModGhpcy5yZWYsIHRoaXMudG9TdHlsZSgpKVxuICAgIH1cbiAgfVxufVxuXG5FbGVtZW50LnByb3RvdHlwZS5hZGRFdmVudCA9IGZ1bmN0aW9uICh0eXBlLCBoYW5kbGVyKSB7XG4gIGNvbnN0IGluZGV4ID0gdGhpcy5ldmVudC5pbmRleE9mKHR5cGUpXG5cbiAgaWYgKGluZGV4IDwgMCkge1xuICAgIHRoaXMuZXZlbnQucHVzaCh0eXBlKVxuICAgIGxldCBldmVudE1hbmFnZXIgPSB0aGlzLm93bmVyRG9jdW1lbnQuZXZlbnRNYW5hZ2VyXG4gICAgZXZlbnRNYW5hZ2VyLmFkZCh0aGlzLCB0eXBlLCBoYW5kbGVyKVxuXG4gICAgaWYgKHRoaXMuYXR0YWNoZWQpIHtcbiAgICAgIGNvbnN0IHJlbmRlcmVyID0gdGhpcy5nZXRSZW5kZXJlcigpXG4gICAgICBpZiAocmVuZGVyZXIpIHtcbiAgICAgICAgcmVuZGVyZXIuYWRkRXZlbnQodGhpcy5yZWYsIHR5cGUpXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbkVsZW1lbnQucHJvdG90eXBlLnJlbW92ZUV2ZW50ID0gZnVuY3Rpb24gKHR5cGUpIHtcbiAgY29uc3QgaW5kZXggPSB0aGlzLmV2ZW50LmluZGV4T2YodHlwZSlcblxuICBpZiAoaW5kZXggPj0gMCkge1xuICAgIHRoaXMuZXZlbnQuc3BsaWNlKGluZGV4LCAxKVxuICAgIGxldCBldmVudE1hbmFnZXIgPSB0aGlzLm93bmVyRG9jdW1lbnQuZXZlbnRNYW5hZ2VyXG4gICAgZXZlbnRNYW5hZ2VyLnJlbW92ZSh0aGlzLCB0eXBlKVxuXG4gICAgaWYgKHRoaXMuYXR0YWNoZWQpIHtcbiAgICAgIGNvbnN0IHJlbmRlcmVyID0gdGhpcy5nZXRSZW5kZXJlcigpXG4gICAgICBpZiAocmVuZGVyZXIpIHtcbiAgICAgICAgcmVuZGVyZXIucmVtb3ZlRXZlbnQodGhpcy5yZWYsIHR5cGUpXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbkVsZW1lbnQucHJvdG90eXBlLnRvU3R5bGUgPSBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IHJlc3VsdCA9IHt9XG4gIGNvbnN0IGNsYXNzU3R5bGUgPSB0aGlzLmNsYXNzU3R5bGVcbiAgY29uc3Qgc3R5bGUgPSB0aGlzLnN0eWxlXG4gIGZvciAoY29uc3QgbmFtZSBpbiBjbGFzc1N0eWxlKSB7XG4gICAgcmVzdWx0W25hbWVdID0gY2xhc3NTdHlsZVtuYW1lXVxuICB9XG4gIGZvciAoY29uc3QgbmFtZSBpbiBzdHlsZSkge1xuICAgIHJlc3VsdFtuYW1lXSA9IHN0eWxlW25hbWVdXG4gIH1cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG5FbGVtZW50LnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IHJlc3VsdCA9IHtcbiAgICByZWY6IHRoaXMucmVmLnRvU3RyaW5nKCksXG4gICAgdHlwZTogdGhpcy50eXBlLFxuICAgIGF0dHI6IHRoaXMuYXR0cixcbiAgICBzdHlsZTogdGhpcy50b1N0eWxlKClcbiAgfVxuXG4gIGlmICh0aGlzLmV2ZW50ICYmIHRoaXMuZXZlbnQubGVuZ3RoKSB7XG4gICAgcmVzdWx0LmV2ZW50ID0gdGhpcy5ldmVudFxuICB9XG4gIGlmICh0aGlzLnB1cmVDaGlsZHJlbiAmJiB0aGlzLnB1cmVDaGlsZHJlbi5sZW5ndGgpIHtcbiAgICByZXN1bHQuY2hpbGRyZW4gPSB0aGlzLnB1cmVDaGlsZHJlbi5tYXAoKGNoaWxkKSA9PiBjaGlsZC50b0pTT04oKSlcbiAgfVxuXG4gIHJldHVybiByZXN1bHRcbn1cblxuRWxlbWVudC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiAnPCcgKyB0aGlzLnR5cGUgK1xuICAgICcgYXR0cj0nICsgSlNPTi5zdHJpbmdpZnkodGhpcy5hdHRyKSArXG4gICAgJyBzdHlsZT0nICsgSlNPTi5zdHJpbmdpZnkodGhpcy50b1N0eWxlKCkpICsgJz4nICtcbiAgICB0aGlzLnB1cmVDaGlsZHJlbi5tYXAoKGNoaWxkKSA9PiBjaGlsZC50b1N0cmluZygpKS5qb2luKCcnKSArXG4gICAgJzwvJyArIHRoaXMudHlwZSArICc+J1xufVxuXG5leHBvcnQgZnVuY3Rpb24gQ29tbWVudCh2YWx1ZSwgb3duZXJEb2N1bWVudCkge1xuICB0aGlzLmNyZWF0ZShvd25lckRvY3VtZW50LmlkKVxuICB0aGlzLnR5cGUgPSAnY29tbWVudCdcbiAgdGhpcy52YWx1ZSA9IHZhbHVlXG59XG5cbkNvbW1lbnQucHJvdG90eXBlID0gbmV3IE5vZGUoKVxuXG5Db21tZW50LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuICc8IS0tICcgKyB0aGlzLnZhbHVlICsgJyAtLT4nXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2xpYi9hcHAvZG9tLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSB7XG5cdFwibmFtZVwiOiBcIndlZXgtanNmcmFtZXdvcmtcIixcblx0XCJ2ZXJzaW9uXCI6IFwiMC4xMy40XCIsXG5cdFwiZGVzY3JpcHRpb25cIjogXCJKUyBGcmFtZXdvcmsgZm9yIFdlZXggc29sdXRpb24gd2hpY2ggaXMgYSBleHRlbmRhYmxlIGNyb3NzLXBsYXRmb3JtIHNvbHV0aW9uIGZvciBkeW5hbWljIHByb2dyYW1taW5nIGFuZCBwdWJsaXNoaW5nIHByb2plY3RzXCIsXG5cdFwibWFpblwiOiBcImluZGV4LmpzXCIsXG5cdFwic2NyaXB0c1wiOiB7XG5cdFx0XCJkZXZcIjogXCJ3ZWJwYWNrIC0td2F0Y2ggLS1jb25maWcgLi93ZWJwYWNrLmNvbmZpZy5qc1wiLFxuXHRcdFwiYnVpbGRcIjogXCJ3ZWJwYWNrIC0tY29uZmlnIC4vd2VicGFjay5jb25maWcuanNcIixcblx0XHRcImNvbXByZXNzXCI6IFwidWdsaWZ5anMgZGlzdC9pbmRleC5qcyAtbyBkaXN0L2luZGV4Lm1pbi5qc1wiLFxuXHRcdFwibGludFwiOiBcImpzY3MgLS1jb25maWcgLmpzY3NyYyBwb2x5ZmlsbC8qLmpzIHBvbHlmaWxsL19fdGVzdF9fLyouanMgbGliLyouanMgbGliL19fdGVzdF9fLyouanMgbGliL2FwcC8qLmpzIGxpYi9hcHAvX190ZXN0X18vKi5qcyBsaWIvdm0vKi5qcyBsaWIvdm0vX190ZXN0X18vKi5qc1wiLFxuXHRcdFwidGVzdFwiOiBcIm1vY2hhIC0tY29tcGlsZXJzIGpzOmJhYmVsLWNvcmUvcmVnaXN0ZXIgcG9seWZpbGwvX190ZXN0X18vKi5qcyBsaWIvX190ZXN0X18vKi5qcyBsaWIvKiovX190ZXN0X18vKi5qc1wiLFxuXHRcdFwiY292ZXJcIjogXCJiYWJlbC1ub2RlIG5vZGVfbW9kdWxlcy9pc3BhcnRhL2Jpbi9pc3BhcnRhIGNvdmVyIC0tcmVwb3J0IHRleHQgbm9kZV9tb2R1bGVzL21vY2hhL2Jpbi9fbW9jaGEgLS0gLS1yZXBvcnRlciBkb3QgbGliL19fdGVzdF9fLyouanMgbGliLyoqL19fdGVzdF9fLyouanNcIixcblx0XHRcImNpXCI6IFwibnBtIHJ1biBsaW50ICYmIG5wbSBydW4gY292ZXJcIlxuXHR9LFxuXHRcInJlcG9zaXRvcnlcIjoge1xuXHRcdFwidHlwZVwiOiBcImdpdFwiLFxuXHRcdFwidXJsXCI6IFwiZ2l0QGdpdGh1Yi5jb206YWxpYmFiYS93ZWV4LmdpdFwiXG5cdH0sXG5cdFwiYXV0aG9yXCI6IFtcblx0XHR7XG5cdFx0XHRcIm5hbWVcIjogXCJqaW5qaWFuZ1wiLFxuXHRcdFx0XCJlbWFpbFwiOiBcInpoYW9qaW5qaWFuZ0BtZS5jb21cIlxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0XCJuYW1lXCI6IFwiVGVycnkgS2luZ1wiLFxuXHRcdFx0XCJlbWFpbFwiOiBcInRlcnJ5a2luZ2NoYUBnbWFpbC5jb21cIlxuXHRcdH1cblx0XSxcblx0XCJjb250cmlidXRvcnNcIjogW1xuXHRcdHtcblx0XHRcdFwibmFtZVwiOiBcInB1c2hpbWluZ1wiLFxuXHRcdFx0XCJlbWFpbFwiOiBcInB1c2hpbWluZ0BnbWFpbC5jb21cIlxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0XCJuYW1lXCI6IFwiaXNrZW5odWFuZ1wiLFxuXHRcdFx0XCJlbWFpbFwiOiBcImlza2VuaHVhbmdAZ21haWwuY29tXCJcblx0XHR9LFxuXHRcdHtcblx0XHRcdFwibmFtZVwiOiBcInl1YW55YW5cIixcblx0XHRcdFwiZW1haWxcIjogXCJ5dWFueWFuLmNhb0BnbWFpbC5jb21cIlxuXHRcdH1cblx0XSxcblx0XCJrZXl3b3Jkc1wiOiBbXG5cdFx0XCJ3ZWV4XCIsXG5cdFx0XCJtdnZtXCIsXG5cdFx0XCJicm93c2VyXCIsXG5cdFx0XCJoeWJyaWRcIixcblx0XHRcImZyYW1ld29ya1wiXG5cdF0sXG5cdFwibGljZW5zZVwiOiBcIkFwYWNoZS0yLjBcIixcblx0XCJkZXBlbmRlbmNpZXNcIjoge1xuXHRcdFwic2VtdmVyXCI6IFwifjUuMS4wXCIsXG5cdFx0XCJjb3JlLWpzXCI6IFwifjIuMS4xXCJcblx0fSxcblx0XCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuXHRcdFwiYmFiZWwtY2xpXCI6IFwifjYuNC41XCIsXG5cdFx0XCJiYWJlbC1jb3JlXCI6IFwifjYuNC41XCIsXG5cdFx0XCJiYWJlbC1sb2FkZXJcIjogXCJ+Ni4yLjFcIixcblx0XHRcImJhYmVsLXByZXNldC1lczIwMTVcIjogXCJ+Ni4zLjEzXCIsXG5cdFx0XCJjaGFpXCI6IFwifjMuMi4wXCIsXG5cdFx0XCJpc3BhcnRhXCI6IFwifjQuMC4wXCIsXG5cdFx0XCJpc3RhbmJ1bFwiOiBcIn4wLjQuMlwiLFxuXHRcdFwianNjc1wiOiBcIn4yLjkuMFwiLFxuXHRcdFwianNvbi1sb2FkZXJcIjogXCJeMC41LjRcIixcblx0XHRcIm1vY2hhXCI6IFwifjIuMy40XCIsXG5cdFx0XCJzaW5vblwiOiBcIn4xLjE3LjJcIixcblx0XHRcInNpbm9uLWNoYWlcIjogXCJ+Mi44LjBcIixcblx0XHRcInVnbGlmeS1qc1wiOiBcIl4yLjYuMlwiLFxuXHRcdFwid2F0Y2gtY2xpXCI6IFwifjAuMi4xXCIsXG5cdFx0XCJ3ZWJwYWNrXCI6IFwifjEuMTIuMTJcIlxuXHR9LFxuXHRcIm9wdGlvbmFsRGVwZW5kZW5jaWVzXCI6IHtcblx0XHRcIndlZXgtdHJhbnNmb3JtZXJcIjogXCJ+MC4xXCJcblx0fVxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vcGFja2FnZS5qc29uXG4gKiogbW9kdWxlIGlkID0gMTA1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIEBmaWxlT3ZlcnZpZXcgVGhlIGFwaSBmb3IgaW52b2tpbmcgd2l0aCBcIiRcIiBwcmVmaXhcbiAqL1xuaW1wb3J0IHt0eXBvZiwgZXh0ZW5kfSBmcm9tICcuLi91dGlsJ1xuXG4vKipcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIGNvbW1vblxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICovXG5cbi8qKlxuICogQGRlcHJlY2F0ZWQgdXNlICR2bSBpbnN0ZWFkXG4gKiBmaW5kIHRoZSB2bSBieSBpZFxuICogTm90ZTogdGhlcmUgaXMgb25seSBvbmUgaWQgaW4gd2hvbGUgY29tcG9uZW50XG4gKiBAcGFyYW0gIHtzdHJpbmd9IGlkXG4gKiBAcmV0dXJuIHtWbX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uICQoaWQpIHtcbiAgbmF0aXZlTG9nKCd0aGUgVm0jJCBhcGkgaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSBWbSMkdm0gaW5zdGVhZCcpXG4gIGNvbnN0IGluZm8gPSB0aGlzLl9pZHNbaWRdXG4gIGlmIChpbmZvKSB7XG4gICAgcmV0dXJuIGluZm8udm1cbiAgfVxufVxuXG4vKipcbiAqIGZpbmQgdGhlIGVsZW1lbnQgYnkgaWRcbiAqIE5vdGU6IHRoZXJlIGlzIG9ubHkgb25lIGlkIGluIHdob2xlIGNvbXBvbmVudFxuICogQHBhcmFtICB7c3RyaW5nfSBpZFxuICogQHJldHVybiB7RWxlbWVudH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uICRlbChpZCkge1xuICBjb25zdCBpbmZvID0gdGhpcy5faWRzW2lkXVxuICBpZiAoaW5mbykge1xuICAgIHJldHVybiBpbmZvLmVsXG4gIH1cbn1cblxuLyoqXG4gKiBmaW5kIHRoZSB2bSBvZiB0aGUgY3VzdG9tIGNvbXBvbmVudCBieSBpZFxuICogTm90ZTogdGhlcmUgaXMgb25seSBvbmUgaWQgaW4gd2hvbGUgY29tcG9uZW50XG4gKiBAcGFyYW0gIHtzdHJpbmd9IGlkXG4gKiBAcmV0dXJuIHtWbX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uICR2bShpZCkge1xuICBjb25zdCBpbmZvID0gdGhpcy5faWRzW2lkXVxuICBpZiAoaW5mbykge1xuICAgIHJldHVybiBpbmZvLnZtXG4gIH1cbn1cblxuLyoqXG4gKiBGaXJlIHdoZW4gZGlmZmVyIHJlbmRlcmluZyBmaW5pc2hlZFxuICpcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBmblxuICovXG5leHBvcnQgZnVuY3Rpb24gJHJlbmRlclRoZW4oZm4pIHtcbiAgY29uc3QgYXBwID0gdGhpcy5fYXBwXG4gIGNvbnN0IGRpZmZlciA9IGFwcC5kaWZmZXJcbiAgcmV0dXJuIGRpZmZlci50aGVuKCgpID0+IHtcbiAgICBmbigpXG4gIH0pXG59XG5cbi8qKlxuICogc2Nyb2xsIGFuIGVsZW1lbnQgc3BlY2lmaWVkIGJ5IGlkIGludG8gdmlldywgXG4gKiBtb3Jlb3ZlciBzcGVjaWZ5IGEgbnVtYmVyIG9mIG9mZnNldCBvcHRpb25hbGx5XG4gKiBAcGFyYW0gIHtzdHJpbmd9IGlkXG4gKiBAcGFyYW0gIHtudW1iZXJ9IG9mZnNldFxuICovXG5leHBvcnQgZnVuY3Rpb24gJHNjcm9sbFRvKGlkLCBvZmZzZXQpIHtcbiAgY29uc3QgZWwgPSB0aGlzLiRlbChpZClcbiAgaWYgKGVsKSB7XG4gICAgY29uc3QgZG9tID0gdGhpcy5fYXBwLnJlcXVpcmVNb2R1bGUoJ2RvbScpXG4gICAgZG9tLnNjcm9sbFRvRWxlbWVudChlbC5yZWYsIHtvZmZzZXQ6IG9mZnNldH0pXG4gIH1cbn1cblxuLyoqXG4gKiBwZXJmb3JtIHRyYW5zaXRpb24gYW5pbWF0aW9uIG9uIGFuIGVsZW1lbnQgc3BlY2lmaWVkIGJ5IGlkXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICAgaWRcbiAqIEBwYXJhbSAge29iamVjdH0gICBvcHRpb25zXG4gKiBAcGFyYW0gIHtvYmplY3R9ICAgb3B0aW9ucy5zdHlsZXNcbiAqIEBwYXJhbSAge29iamVjdH0gICBvcHRpb25zLmR1cmF0aW9uKG1zKVxuICogQHBhcmFtICB7b2JqZWN0fSAgIFtvcHRpb25zLnRpbWluZ0Z1bmN0aW9uXVxuICogQHBhcmFtICB7b2JqZWN0fSAgIFtvcHRpb25zLmRlbGF5PTAobXMpXVxuICogQHBhcmFtICB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiAkdHJhbnNpdGlvbihpZCwgb3B0aW9ucywgY2FsbGJhY2spIHtcbiAgY29uc3QgZWwgPSB0aGlzLiRlbChpZClcbiAgaWYgKGVsICYmIG9wdGlvbnMgJiYgb3B0aW9ucy5zdHlsZXMpIHtcbiAgICBjb25zdCBhbmltYXRpb24gPSB0aGlzLl9hcHAucmVxdWlyZU1vZHVsZSgnYW5pbWF0aW9uJylcbiAgICBhbmltYXRpb24udHJhbnNpdGlvbihlbC5yZWYsIG9wdGlvbnMsICguLi5hcmdzKSA9PiB7XG4gICAgICB0aGlzLl9zZXRTdHlsZShlbCwgb3B0aW9ucy5zdHlsZXMpXG4gICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayguLi5hcmdzKVxuICAgIH0pXG4gIH1cbn1cblxuLyoqXG4gKiBnZXQgc29tZSBjb25maWdcbiAqIEByZXR1cm4ge29iamVjdH0gc29tZSBjb25maWcgZm9yIGFwcCBpbnN0YW5jZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IGJ1bmRsZVVybFxuICogQHByb3BlcnR5IHtib29sZWFufSBkZWJ1Z1xuICogQHByb3BlcnR5IHtvYmplY3R9IGVudlxuICogQHByb3BlcnR5IHtzdHJpbmd9IGVudi53ZWV4VmVyc2lvbihleC4gMS4wLjApXG4gKiBAcHJvcGVydHkge3N0cmluZ30gZW52LmFwcE5hbWUoZXguIFRCL1RNKVxuICogQHByb3BlcnR5IHtzdHJpbmd9IGVudi5hcHBWZXJzaW9uKGV4LiA1LjAuMClcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBlbnYucGxhdGZvcm0oZXguIGlPUy9BbmRyb2lkKVxuICogQHByb3BlcnR5IHtzdHJpbmd9IGVudi5vc1ZlcnNpb24oZXguIDcuMC4wKVxuICogQHByb3BlcnR5IHtzdHJpbmd9IGVudi5kZXZpY2VNb2RlbCAqKm5hdGl2ZSBvbmx5KipcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBlbnYuW2RldmljZVdpZHRoPTc1MF1cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBlbnYuZGV2aWNlSGVpZ2h0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiAkZ2V0Q29uZmlnKGNhbGxiYWNrKSB7XG4gIGNvbnN0IGNvbmZpZyA9IGV4dGVuZCh7XG4gICAgZW52OiBnbG9iYWwuV1hFbnZpcm9ubWVudCB8fCB7fVxuICB9LCB0aGlzLl9hcHAub3B0aW9ucylcbiAgdHlwb2YoY2FsbGJhY2spID09PSAnZnVuY3Rpb24nICYmIGNhbGxiYWNrKGNvbmZpZylcbiAgcmV0dXJuIGNvbmZpZ1xufVxuXG4vKipcbiAqIHJlcXVlc3QgbmV0d29yayB2aWEgaHR0cCBwcm90b2NvbFxuICogQHBhcmFtICB7b2JqZWN0fSAgIHBhcmFtc1xuICogQHBhcmFtICB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiAkc2VuZEh0dHAocGFyYW1zLCBjYWxsYmFjaykge1xuICBjb25zdCBzdHJlYW0gPSB0aGlzLl9hcHAucmVxdWlyZU1vZHVsZSgnc3RyZWFtJylcbiAgc3RyZWFtLnNlbmRIdHRwKHBhcmFtcywgY2FsbGJhY2spXG59XG5cbi8qKlxuICogb3BlbiBhIHVybFxuICogQHBhcmFtICB7c3RyaW5nfSB1cmxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uICRvcGVuVVJMKHVybCkge1xuICBjb25zdCBldmVudCA9IHRoaXMuX2FwcC5yZXF1aXJlTW9kdWxlKCdldmVudCcpXG4gIGV2ZW50Lm9wZW5VUkwodXJsKVxufVxuXG4vKipcbiAqIHNldCBhIHRpdGxlIGZvciBwYWdlXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHRpdGxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiAkc2V0VGl0bGUodGl0bGUpIHtcbiAgY29uc3QgcGFnZUluZm8gPSB0aGlzLl9hcHAucmVxdWlyZU1vZHVsZSgncGFnZUluZm8nKVxuICBwYWdlSW5mby5zZXRUaXRsZSh0aXRsZSlcbn1cblxuLyoqXG4gKiBpbnZva2UgYSBuYXRpdmUgbWV0aG9kIGJ5IHNwZWNpZmluZyB0aGUgbmFtZSBvZiBtb2R1bGUgYW5kIG1ldGhvZFxuICogQHBhcmFtICB7c3RyaW5nfSBtb2R1bGVOYW1lXG4gKiBAcGFyYW0gIHtzdHJpbmd9IG1ldGhvZE5hbWVcbiAqIEBwYXJhbSAgey4uLip9IHRoZSByZXN0IGFyZ3VtZW50c1xuICovXG5leHBvcnQgZnVuY3Rpb24gJGNhbGwobW9kdWxlTmFtZSwgbWV0aG9kTmFtZSwgLi4uYXJncykge1xuICBjb25zdCBtb2R1bGUgPSB0aGlzLl9hcHAucmVxdWlyZU1vZHVsZShtb2R1bGVOYW1lKVxuICBpZiAobW9kdWxlICYmIG1vZHVsZVttZXRob2ROYW1lXSkge1xuICAgIG1vZHVsZVttZXRob2ROYW1lXSguLi5hcmdzKVxuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2xpYi9hcGkvbWV0aG9kcy5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=