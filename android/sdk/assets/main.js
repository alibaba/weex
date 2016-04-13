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
	  var value = calc.call(this);
	  el[methodName](key, calc.call(this));
	  this._watch(calc, function (value) {
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
	}
	
	/**
	 * watch a calc function and callback if the calc value changes
	 */
	function _watch(calc, callback) {
	  new _watcher2.default(this, calc, function (value, oldValue) {
	    /* istanbul ignore if */
	    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object' && value === oldValue) {
	      return;
	    }
	    callback(value);
	  });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZjg2NWViZDYyMGIxZjhhNjJmMTEiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vcG9seWZpbGwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vcG9seWZpbGwvb2JqZWN0QXNzaWduLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9mbi9vYmplY3QvYXNzaWduLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19leHBvcnQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9fY29yZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9faGlkZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWRwLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19hbi1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX2lzLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9faWU4LWRvbS1kZWZpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19mYWlscy5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9fZG9tLWNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9fdG8tcHJpbWl0aXZlLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19wcm9wZXJ0eS1kZXNjLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19yZWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9faGFzLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL191aWQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX2N0eC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9fYS1mdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWFzc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWtleXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1rZXlzLWludGVybmFsLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL190by1pb2JqZWN0LmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19pb2JqZWN0LmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19jb2YuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX2RlZmluZWQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX2FycmF5LWluY2x1ZGVzLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL190by1sZW5ndGguanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX3RvLWludGVnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX3RvLWluZGV4LmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19zaGFyZWQta2V5LmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19zaGFyZWQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX2VudW0tYnVnLWtleXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1nb3BzLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19vYmplY3QtcGllLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL190by1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vcG9seWZpbGwvcHJvbWlzZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LnRvLXN0cmluZy5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9fY2xhc3NvZi5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9fd2tzLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX3N0cmluZy1hdC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9faXRlci1kZWZpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX2xpYnJhcnkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX2l0ZXJhdG9ycy5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9faXRlci1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1kcHMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX2h0bWwuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX3NldC10by1zdHJpbmctdGFnLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19vYmplY3QtZ3BvLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5Lml0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19hZGQtdG8tdW5zY29wYWJsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX2l0ZXItc3RlcC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9lczYucHJvbWlzZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9fYW4taW5zdGFuY2UuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX2Zvci1vZi5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9faXRlci1jYWxsLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19pcy1hcnJheS1pdGVyLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9fc2V0LXByb3RvLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19vYmplY3QtZ29wZC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9fc3BlY2llcy1jb25zdHJ1Y3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9fdGFzay5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9faW52b2tlLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19taWNyb3Rhc2suanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX3JlZGVmaW5lLWFsbC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9fc2V0LXNwZWNpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX2l0ZXItZGV0ZWN0LmpzIiwid2VicGFjazovLy8uL3BvbHlmaWxsL3NldFRpbWVvdXQuanMiLCJ3ZWJwYWNrOi8vLy4vcG9seWZpbGwvY29uc29sZWxvZy5qcyIsIndlYnBhY2s6Ly8vLi9saWIvZnJhbWV3b3JrLmpzIiwid2VicGFjazovLy8uL2xpYi9wZXJmLmpzIiwid2VicGFjazovLy8uL2xpYi9sb2cuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9saWIvYXBwL2luZGV4LmpzIiwid2VicGFjazovLy8uL2xpYi91dGlsL2luZGV4LmpzIiwid2VicGFjazovLy8uL2xpYi9hcHAvYnVuZGxlLmpzIiwid2VicGFjazovLy8uL34vc2VtdmVyL3NlbXZlci5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL34vbm9kZS1saWJzLWJyb3dzZXIvfi9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL3ZtL2luZGV4LmpzIiwid2VicGFjazovLy8uL2xpYi92bS9pbnN0YW5jZS9zY29wZS5qcyIsIndlYnBhY2s6Ly8vLi9saWIvdm0vdXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvdm0vb2JzZXJ2ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbGliL3ZtL2NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9saWIvdm0vb2JzZXJ2ZXIvZGVwLmpzIiwid2VicGFjazovLy8uL2xpYi92bS9vYnNlcnZlci9hcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9saWIvdm0vb2JzZXJ2ZXIvb2JqZWN0LmpzIiwid2VicGFjazovLy8uL2xpYi92bS9jb21waWxlci5qcyIsIndlYnBhY2s6Ly8vLi9saWIvdm0vZGlyZWN0aXZlLmpzIiwid2VicGFjazovLy8uL2xpYi92bS93YXRjaGVyLmpzIiwid2VicGFjazovLy8uL2xpYi92bS9kb20taGVscGVyLmpzIiwid2VicGFjazovLy8uL2xpYi92bS9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2FwcC9yZWdpc3Rlci5qcyIsIndlYnBhY2s6Ly8vLi9saWIvYXBwL2Rvd25ncmFkZS5qcyIsIndlYnBhY2s6Ly8vLi9saWIvYXBwL2N0cmwuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2FwcC9kb20tbGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2FwcC9kaWZmZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2FwcC9ldmVudC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvYXBwL2RvbS5qcyIsIndlYnBhY2s6Ly8vLi9wYWNrYWdlLmpzb24iLCJ3ZWJwYWNrOi8vLy4vbGliL2FwaS9tZXRob2RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7O0FDdENBOztBQUNBOztLQUFZOztBQUNaOzs7O0FBRUEsUUFBTyxNQUFQLENBQWMsTUFBZCxFQUFzQixTQUF0QixFQUFpQztBQUM3QixxQ0FENkI7QUFFN0IsMkJBQXdCLDhCQUFxQixrQkFBckIsQ0FBeEI7RUFGSjs7Ozs7QUFRQSxLQUFNLFVBQVUsb0JBQVEsR0FBUixDQUFWO2VBQ29CO0tBQW5COztBQUNQLGlCQUFnQixPQUFoQixFOzs7Ozs7Ozs7QUNkQTs7QUFDQTs7QUFDQTs7QUFDQSx5Qjs7Ozs7Ozs7QUNIQSx3Qjs7Ozs7Ozs7QUNBQSxxQkFBUSxDQUFSO0FBQ0EsUUFBTyxPQUFQLEdBQWlCLG9CQUFRLENBQVIsRUFBK0IsTUFBL0IsQ0FBc0MsTUFBdEMsQzs7Ozs7Ozs7O0FDQWpCLEtBQUksVUFBVSxvQkFBUSxDQUFSLENBQVY7O0FBRUosU0FBUSxRQUFRLENBQVIsR0FBWSxRQUFRLENBQVIsRUFBVyxRQUEvQixFQUF5QyxFQUFDLFFBQVEsb0JBQVEsRUFBUixDQUFSLEVBQTFDLEU7Ozs7Ozs7O0FDSEEsS0FBSSxTQUFZLG9CQUFRLENBQVIsQ0FBWjtLQUNBLE9B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QkFBTztBQUNwQixVQUFLLE9BQU8sYUFBUCxJQUF3QixFQUF4QjtJQURRLEVBRVosS0FBSyxJQUFMLENBQVUsT0FBVixDQUZHLENBRDZCO0FBSW5DLG9CQUFNLFFBQU4sTUFBb0IsVUFBcEIsSUFBa0MsU0FBUyxNQUFULENBQWxDLENBSm1DO0FBS25DLFVBQU8sTUFBUCxDQUxtQztFQUE5Qjs7Ozs7OztBQWFBLFVBQVMsU0FBVCxDQUFtQixNQUFuQixFQUEyQixRQUEzQixFQUFxQztBQUMxQyxPQUFNLFNBQVMsS0FBSyxJQUFMLENBQVUsYUFBVixDQUF3QixRQUF4QixDQUFULENBRG9DO0FBRTFDLFVBQU8sUUFBUCxDQUFnQixNQUFoQixFQUF3QixRQUF4QixFQUYwQztFQUFyQzs7Ozs7O0FBU0EsVUFBUyxRQUFULENBQWtCLEdBQWxCLEVBQXVCO0FBQzVCLE9BQU0sUUFBUSxLQUFLLElBQUwsQ0FBVSxhQUFWLENBQXdCLE9BQXhCLENBQVIsQ0FEc0I7QUFFNUIsU0FBTSxPQUFOLENBQWMsR0FBZCxFQUY0QjtFQUF2Qjs7Ozs7O0FBU0EsVUFBUyxTQUFULENBQW1CLEtBQW5CLEVBQTBCO0FBQy9CLE9BQU0sV0FBVyxLQUFLLElBQUwsQ0FBVSxhQUFWLENBQXdCLFVBQXhCLENBQVgsQ0FEeUI7QUFFL0IsWUFBUyxRQUFULENBQWtCLEtBQWxCLEVBRitCO0VBQTFCOzs7Ozs7OztBQVdBLFVBQVMsS0FBVCxDQUFlLFVBQWYsRUFBMkIsVUFBM0IsRUFBZ0Q7QUFDckQsT0FBTSxTQUFTLEtBQUssSUFBTCxDQUFVLGFBQVYsQ0FBd0IsVUFBeEIsQ0FBVCxDQUQrQztBQUVyRCxPQUFJLFVBQVUsT0FBTyxVQUFQLENBQVYsRUFBOEI7dUNBRmE7O01BRWI7O0FBQ2hDLFlBQU8sV0FBUCxlQUFzQixJQUF0QixFQURnQztJQUFsQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgZjg2NWViZDYyMGIxZjhhNjJmMTFcbiAqKi8iLCJpbXBvcnQgJy4vcG9seWZpbGwnXG5pbXBvcnQgKiBhcyBmcmFtZXdvcmsgZnJvbSAnLi9saWIvZnJhbWV3b3JrJ1xuaW1wb3J0IHt2ZXJzaW9uLCBvcHRpb25hbERlcGVuZGVuY2llc30gZnJvbSAnLi9wYWNrYWdlLmpzb24nXG5cbk9iamVjdC5hc3NpZ24oZ2xvYmFsLCBmcmFtZXdvcmssIHtcbiAgICBmcmFtZXdvcmtWZXJzaW9uOiB2ZXJzaW9uLFxuICAgIG5lZWRUcmFuc2Zvcm1lclZlcnNpb246IG9wdGlvbmFsRGVwZW5kZW5jaWVzWyd3ZWV4LXRyYW5zZm9ybWVyJ11cbn0pXG5cbi8qKlxuICogcmVnaXN0ZXIgbWV0aG9kc1xuICovXG5jb25zdCBtZXRob2RzID0gcmVxdWlyZSgnLi9saWIvYXBpL21ldGhvZHMnKVxuY29uc3Qge3JlZ2lzdGVyTWV0aG9kc30gPSBnbG9iYWxcbnJlZ2lzdGVyTWV0aG9kcyhtZXRob2RzKVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9pbmRleC5qc1xuICoqLyIsImltcG9ydCAnLi9vYmplY3RBc3NpZ24nXG5pbXBvcnQgJy4vcHJvbWlzZSdcbmltcG9ydCAnLi9zZXRUaW1lb3V0J1xuaW1wb3J0ICcuL2NvbnNvbGVsb2cnXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3BvbHlmaWxsL2luZGV4LmpzXG4gKiovIiwiaW1wb3J0ICdjb3JlLWpzL2ZuL29iamVjdC9hc3NpZ24nXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3BvbHlmaWxsL29iamVjdEFzc2lnbi5qc1xuICoqLyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24nKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdC5hc3NpZ247XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvZm4vb2JqZWN0L2Fzc2lnbi5qc1xuICoqLyIsIi8vIDE5LjEuMy4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiwgJ09iamVjdCcsIHthc3NpZ246IHJlcXVpcmUoJy4vX29iamVjdC1hc3NpZ24nKX0pO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24uanNcbiAqKi8iLCJ2YXIgZ2xvYmFsICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBjb3JlICAgICAgPSByZXF1aXJlKCcuL19jb3JlJylcbiAgLCBoaWRlICAgICAgPSByZXF1aXJlKCcuL19oaWRlJylcbiAgLCByZWRlZmluZSAgPSByZXF1aXJlKCcuL19yZWRlZmluZScpXG4gICwgY3R4ICAgICAgID0gcmVxdWlyZSgnLi9fY3R4JylcbiAgLCBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcblxudmFyICRleHBvcnQgPSBmdW5jdGlvbih0eXBlLCBuYW1lLCBzb3VyY2Upe1xuICB2YXIgSVNfRk9SQ0VEID0gdHlwZSAmICRleHBvcnQuRlxuICAgICwgSVNfR0xPQkFMID0gdHlwZSAmICRleHBvcnQuR1xuICAgICwgSVNfU1RBVElDID0gdHlwZSAmICRleHBvcnQuU1xuICAgICwgSVNfUFJPVE8gID0gdHlwZSAmICRleHBvcnQuUFxuICAgICwgSVNfQklORCAgID0gdHlwZSAmICRleHBvcnQuQlxuICAgICwgdGFyZ2V0ICAgID0gSVNfR0xPQkFMID8gZ2xvYmFsIDogSVNfU1RBVElDID8gZ2xvYmFsW25hbWVdIHx8IChnbG9iYWxbbmFtZV0gPSB7fSkgOiAoZ2xvYmFsW25hbWVdIHx8IHt9KVtQUk9UT1RZUEVdXG4gICAgLCBleHBvcnRzICAgPSBJU19HTE9CQUwgPyBjb3JlIDogY29yZVtuYW1lXSB8fCAoY29yZVtuYW1lXSA9IHt9KVxuICAgICwgZXhwUHJvdG8gID0gZXhwb3J0c1tQUk9UT1RZUEVdIHx8IChleHBvcnRzW1BST1RPVFlQRV0gPSB7fSlcbiAgICAsIGtleSwgb3duLCBvdXQsIGV4cDtcbiAgaWYoSVNfR0xPQkFMKXNvdXJjZSA9IG5hbWU7XG4gIGZvcihrZXkgaW4gc291cmNlKXtcbiAgICAvLyBjb250YWlucyBpbiBuYXRpdmVcbiAgICBvd24gPSAhSVNfRk9SQ0VEICYmIHRhcmdldCAmJiB0YXJnZXRba2V5XSAhPT0gdW5kZWZpbmVkO1xuICAgIC8vIGV4cG9ydCBuYXRpdmUgb3IgcGFzc2VkXG4gICAgb3V0ID0gKG93biA/IHRhcmdldCA6IHNvdXJjZSlba2V5XTtcbiAgICAvLyBiaW5kIHRpbWVycyB0byBnbG9iYWwgZm9yIGNhbGwgZnJvbSBleHBvcnQgY29udGV4dFxuICAgIGV4cCA9IElTX0JJTkQgJiYgb3duID8gY3R4KG91dCwgZ2xvYmFsKSA6IElTX1BST1RPICYmIHR5cGVvZiBvdXQgPT0gJ2Z1bmN0aW9uJyA/IGN0eChGdW5jdGlvbi5jYWxsLCBvdXQpIDogb3V0O1xuICAgIC8vIGV4dGVuZCBnbG9iYWxcbiAgICBpZih0YXJnZXQpcmVkZWZpbmUodGFyZ2V0LCBrZXksIG91dCwgdHlwZSAmICRleHBvcnQuVSk7XG4gICAgLy8gZXhwb3J0XG4gICAgaWYoZXhwb3J0c1trZXldICE9IG91dCloaWRlKGV4cG9ydHMsIGtleSwgZXhwKTtcbiAgICBpZihJU19QUk9UTyAmJiBleHBQcm90b1trZXldICE9IG91dClleHBQcm90b1trZXldID0gb3V0O1xuICB9XG59O1xuZ2xvYmFsLmNvcmUgPSBjb3JlO1xuLy8gdHlwZSBiaXRtYXBcbiRleHBvcnQuRiA9IDE7ICAgLy8gZm9yY2VkXG4kZXhwb3J0LkcgPSAyOyAgIC8vIGdsb2JhbFxuJGV4cG9ydC5TID0gNDsgICAvLyBzdGF0aWNcbiRleHBvcnQuUCA9IDg7ICAgLy8gcHJvdG9cbiRleHBvcnQuQiA9IDE2OyAgLy8gYmluZFxuJGV4cG9ydC5XID0gMzI7ICAvLyB3cmFwXG4kZXhwb3J0LlUgPSA2NDsgIC8vIHNhZmVcbiRleHBvcnQuUiA9IDEyODsgLy8gcmVhbCBwcm90byBtZXRob2QgZm9yIGBsaWJyYXJ5YCBcbm1vZHVsZS5leHBvcnRzID0gJGV4cG9ydDtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL19leHBvcnQuanNcbiAqKi8iLCIvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxudmFyIGdsb2JhbCA9IG1vZHVsZS5leHBvcnRzID0gdHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuTWF0aCA9PSBNYXRoXG4gID8gd2luZG93IDogdHlwZW9mIHNlbGYgIT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5NYXRoID09IE1hdGggPyBzZWxmIDogRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbmlmKHR5cGVvZiBfX2cgPT0gJ251bWJlcicpX19nID0gZ2xvYmFsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fZ2xvYmFsLmpzXG4gKiovIiwidmFyIGNvcmUgPSBtb2R1bGUuZXhwb3J0cyA9IHt2ZXJzaW9uOiAnMi4xLjUnfTtcbmlmKHR5cGVvZiBfX2UgPT0gJ251bWJlcicpX19lID0gY29yZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX2NvcmUuanNcbiAqKi8iLCJ2YXIgZFAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpXG4gICwgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IGZ1bmN0aW9uKG9iamVjdCwga2V5LCB2YWx1ZSl7XG4gIHJldHVybiBkUC5mKG9iamVjdCwga2V5LCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG59IDogZnVuY3Rpb24ob2JqZWN0LCBrZXksIHZhbHVlKXtcbiAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIG9iamVjdDtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9faGlkZS5qc1xuICoqLyIsInZhciBhbk9iamVjdCAgICAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuL19pZTgtZG9tLWRlZmluZScpXG4gICwgdG9QcmltaXRpdmUgICAgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKVxuICAsIGRQICAgICAgICAgICAgID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG5leHBvcnRzLmYgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gT2JqZWN0LmRlZmluZVByb3BlcnR5IDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcyl7XG4gIGFuT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEF0dHJpYnV0ZXMpO1xuICBpZihJRThfRE9NX0RFRklORSl0cnkge1xuICAgIHJldHVybiBkUChPLCBQLCBBdHRyaWJ1dGVzKTtcbiAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxuICBpZignZ2V0JyBpbiBBdHRyaWJ1dGVzIHx8ICdzZXQnIGluIEF0dHJpYnV0ZXMpdGhyb3cgVHlwZUVycm9yKCdBY2Nlc3NvcnMgbm90IHN1cHBvcnRlZCEnKTtcbiAgaWYoJ3ZhbHVlJyBpbiBBdHRyaWJ1dGVzKU9bUF0gPSBBdHRyaWJ1dGVzLnZhbHVlO1xuICByZXR1cm4gTztcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWRwLmpzXG4gKiovIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoIWlzT2JqZWN0KGl0KSl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhbiBvYmplY3QhJyk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fYW4tb2JqZWN0LmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiB0eXBlb2YgaXQgPT09ICdvYmplY3QnID8gaXQgIT09IG51bGwgOiB0eXBlb2YgaXQgPT09ICdmdW5jdGlvbic7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX2lzLW9iamVjdC5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgJiYgIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcclxuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKSgnZGl2JyksICdhJywge2dldDogZnVuY3Rpb24oKXsgcmV0dXJuIDc7IH19KS5hICE9IDc7XHJcbn0pO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzXG4gKiovIiwiLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAnYScsIHtnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiA3OyB9fSkuYSAhPSA3O1xufSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fZGVzY3JpcHRvcnMuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGV4ZWMpe1xuICB0cnkge1xuICAgIHJldHVybiAhIWV4ZWMoKTtcbiAgfSBjYXRjaChlKXtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL19mYWlscy5qc1xuICoqLyIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgZG9jdW1lbnQgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5kb2N1bWVudFxuICAvLyBpbiBvbGQgSUUgdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCdcbiAgLCBpcyA9IGlzT2JqZWN0KGRvY3VtZW50KSAmJiBpc09iamVjdChkb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL19kb20tY3JlYXRlLmpzXG4gKiovIiwiLy8gNy4xLjEgVG9QcmltaXRpdmUoaW5wdXQgWywgUHJlZmVycmVkVHlwZV0pXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbi8vIGluc3RlYWQgb2YgdGhlIEVTNiBzcGVjIHZlcnNpb24sIHdlIGRpZG4ndCBpbXBsZW1lbnQgQEB0b1ByaW1pdGl2ZSBjYXNlXG4vLyBhbmQgdGhlIHNlY29uZCBhcmd1bWVudCAtIGZsYWcgLSBwcmVmZXJyZWQgdHlwZSBpcyBhIHN0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwgUyl7XG4gIGlmKCFpc09iamVjdChpdCkpcmV0dXJuIGl0O1xuICB2YXIgZm4sIHZhbDtcbiAgaWYoUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSlyZXR1cm4gdmFsO1xuICBpZih0eXBlb2YgKGZuID0gaXQudmFsdWVPZikgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIGlmKCFTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZVwiKTtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fdG8tcHJpbWl0aXZlLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihiaXRtYXAsIHZhbHVlKXtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlICA6ICEoYml0bWFwICYgMSksXG4gICAgY29uZmlndXJhYmxlOiAhKGJpdG1hcCAmIDIpLFxuICAgIHdyaXRhYmxlICAgIDogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZSAgICAgICA6IHZhbHVlXG4gIH07XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX3Byb3BlcnR5LWRlc2MuanNcbiAqKi8iLCJ2YXIgZ2xvYmFsICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBoaWRlICAgICAgPSByZXF1aXJlKCcuL19oaWRlJylcbiAgLCBoYXMgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIFNSQyAgICAgICA9IHJlcXVpcmUoJy4vX3VpZCcpKCdzcmMnKVxuICAsIFRPX1NUUklORyA9ICd0b1N0cmluZydcbiAgLCAkdG9TdHJpbmcgPSBGdW5jdGlvbltUT19TVFJJTkddXG4gICwgVFBMICAgICAgID0gKCcnICsgJHRvU3RyaW5nKS5zcGxpdChUT19TVFJJTkcpO1xuXG5yZXF1aXJlKCcuL19jb3JlJykuaW5zcGVjdFNvdXJjZSA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuICR0b1N0cmluZy5jYWxsKGl0KTtcbn07XG5cbihtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKE8sIGtleSwgdmFsLCBzYWZlKXtcbiAgdmFyIGlzRnVuY3Rpb24gPSB0eXBlb2YgdmFsID09ICdmdW5jdGlvbic7XG4gIGlmKGlzRnVuY3Rpb24paGFzKHZhbCwgJ25hbWUnKSB8fCBoaWRlKHZhbCwgJ25hbWUnLCBrZXkpO1xuICBpZihPW2tleV0gPT09IHZhbClyZXR1cm47XG4gIGlmKGlzRnVuY3Rpb24paGFzKHZhbCwgU1JDKSB8fCBoaWRlKHZhbCwgU1JDLCBPW2tleV0gPyAnJyArIE9ba2V5XSA6IFRQTC5qb2luKFN0cmluZyhrZXkpKSk7XG4gIGlmKE8gPT09IGdsb2JhbCl7XG4gICAgT1trZXldID0gdmFsO1xuICB9IGVsc2Uge1xuICAgIGlmKCFzYWZlKXtcbiAgICAgIGRlbGV0ZSBPW2tleV07XG4gICAgICBoaWRlKE8sIGtleSwgdmFsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYoT1trZXldKU9ba2V5XSA9IHZhbDtcbiAgICAgIGVsc2UgaGlkZShPLCBrZXksIHZhbCk7XG4gICAgfVxuICB9XG4vLyBhZGQgZmFrZSBGdW5jdGlvbiN0b1N0cmluZyBmb3IgY29ycmVjdCB3b3JrIHdyYXBwZWQgbWV0aG9kcyAvIGNvbnN0cnVjdG9ycyB3aXRoIG1ldGhvZHMgbGlrZSBMb0Rhc2ggaXNOYXRpdmVcbn0pKEZ1bmN0aW9uLnByb3RvdHlwZSwgVE9fU1RSSU5HLCBmdW5jdGlvbiB0b1N0cmluZygpe1xuICByZXR1cm4gdHlwZW9mIHRoaXMgPT0gJ2Z1bmN0aW9uJyAmJiB0aGlzW1NSQ10gfHwgJHRvU3RyaW5nLmNhbGwodGhpcyk7XG59KTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL19yZWRlZmluZS5qc1xuICoqLyIsInZhciBoYXNPd25Qcm9wZXJ0eSA9IHt9Lmhhc093blByb3BlcnR5O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwga2V5KXtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoaXQsIGtleSk7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX2hhcy5qc1xuICoqLyIsInZhciBpZCA9IDBcbiAgLCBweCA9IE1hdGgucmFuZG9tKCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIHJldHVybiAnU3ltYm9sKCcuY29uY2F0KGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXksICcpXycsICgrK2lkICsgcHgpLnRvU3RyaW5nKDM2KSk7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX3VpZC5qc1xuICoqLyIsIi8vIG9wdGlvbmFsIC8gc2ltcGxlIGNvbnRleHQgYmluZGluZ1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZm4sIHRoYXQsIGxlbmd0aCl7XG4gIGFGdW5jdGlvbihmbik7XG4gIGlmKHRoYXQgPT09IHVuZGVmaW5lZClyZXR1cm4gZm47XG4gIHN3aXRjaChsZW5ndGgpe1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uKGEpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSk7XG4gICAgfTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbihhLCBiKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24oYSwgYiwgYyl7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiLCBjKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbigvKiAuLi5hcmdzICovKXtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fY3R4LmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKHR5cGVvZiBpdCAhPSAnZnVuY3Rpb24nKXRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGEgZnVuY3Rpb24hJyk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fYS1mdW5jdGlvbi5qc1xuICoqLyIsIid1c2Ugc3RyaWN0Jztcbi8vIDE5LjEuMi4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UsIC4uLilcbnZhciBnZXRLZXlzICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJylcbiAgLCBnT1BTICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BzJylcbiAgLCBwSUUgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1waWUnKVxuICAsIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcbiAgLCBJT2JqZWN0ICA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKVxuICAsICRhc3NpZ24gID0gT2JqZWN0LmFzc2lnbjtcblxuLy8gc2hvdWxkIHdvcmsgd2l0aCBzeW1ib2xzIGFuZCBzaG91bGQgaGF2ZSBkZXRlcm1pbmlzdGljIHByb3BlcnR5IG9yZGVyIChWOCBidWcpXG5tb2R1bGUuZXhwb3J0cyA9ICEkYXNzaWduIHx8IHJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgdmFyIEEgPSB7fVxuICAgICwgQiA9IHt9XG4gICAgLCBTID0gU3ltYm9sKClcbiAgICAsIEsgPSAnYWJjZGVmZ2hpamtsbW5vcHFyc3QnO1xuICBBW1NdID0gNztcbiAgSy5zcGxpdCgnJykuZm9yRWFjaChmdW5jdGlvbihrKXsgQltrXSA9IGs7IH0pO1xuICByZXR1cm4gJGFzc2lnbih7fSwgQSlbU10gIT0gNyB8fCBPYmplY3Qua2V5cygkYXNzaWduKHt9LCBCKSkuam9pbignJykgIT0gSztcbn0pID8gZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgc291cmNlKXsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICB2YXIgVCAgICAgPSB0b09iamVjdCh0YXJnZXQpXG4gICAgLCBhTGVuICA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgICAsIGluZGV4ID0gMVxuICAgICwgZ2V0U3ltYm9scyA9IGdPUFMuZlxuICAgICwgaXNFbnVtICAgICA9IHBJRS5mO1xuICB3aGlsZShhTGVuID4gaW5kZXgpe1xuICAgIHZhciBTICAgICAgPSBJT2JqZWN0KGFyZ3VtZW50c1tpbmRleCsrXSlcbiAgICAgICwga2V5cyAgID0gZ2V0U3ltYm9scyA/IGdldEtleXMoUykuY29uY2F0KGdldFN5bWJvbHMoUykpIDogZ2V0S2V5cyhTKVxuICAgICAgLCBsZW5ndGggPSBrZXlzLmxlbmd0aFxuICAgICAgLCBqICAgICAgPSAwXG4gICAgICAsIGtleTtcbiAgICB3aGlsZShsZW5ndGggPiBqKWlmKGlzRW51bS5jYWxsKFMsIGtleSA9IGtleXNbaisrXSkpVFtrZXldID0gU1trZXldO1xuICB9IHJldHVybiBUO1xufSA6ICRhc3NpZ247XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWFzc2lnbi5qc1xuICoqLyIsIi8vIDE5LjEuMi4xNCAvIDE1LjIuMy4xNCBPYmplY3Qua2V5cyhPKVxyXG52YXIgJGtleXMgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cy1pbnRlcm5hbCcpXHJcbiAgLCBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24ga2V5cyhPKXtcclxuICByZXR1cm4gJGtleXMoTywgZW51bUJ1Z0tleXMpO1xyXG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1rZXlzLmpzXG4gKiovIiwidmFyIGhhcyAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXHJcbiAgLCB0b0lPYmplY3QgICAgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcclxuICAsIGFycmF5SW5kZXhPZiA9IHJlcXVpcmUoJy4vX2FycmF5LWluY2x1ZGVzJykoZmFsc2UpXHJcbiAgLCBJRV9QUk9UTyAgICAgPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iamVjdCwgbmFtZXMpe1xyXG4gIHZhciBPICAgICAgPSB0b0lPYmplY3Qob2JqZWN0KVxyXG4gICAgLCBpICAgICAgPSAwXHJcbiAgICAsIHJlc3VsdCA9IFtdXHJcbiAgICAsIGtleTtcclxuICBmb3Ioa2V5IGluIE8paWYoa2V5ICE9IElFX1BST1RPKWhhcyhPLCBrZXkpICYmIHJlc3VsdC5wdXNoKGtleSk7XHJcbiAgLy8gRG9uJ3QgZW51bSBidWcgJiBoaWRkZW4ga2V5c1xyXG4gIHdoaWxlKG5hbWVzLmxlbmd0aCA+IGkpaWYoaGFzKE8sIGtleSA9IG5hbWVzW2krK10pKXtcclxuICAgIH5hcnJheUluZGV4T2YocmVzdWx0LCBrZXkpIHx8IHJlc3VsdC5wdXNoKGtleSk7XHJcbiAgfVxyXG4gIHJldHVybiByZXN1bHQ7XHJcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWtleXMtaW50ZXJuYWwuanNcbiAqKi8iLCIvLyB0byBpbmRleGVkIG9iamVjdCwgdG9PYmplY3Qgd2l0aCBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIHN0cmluZ3NcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi9faW9iamVjdCcpXG4gICwgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gSU9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX3RvLWlvYmplY3QuanNcbiAqKi8iLCIvLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKSA/IE9iamVjdCA6IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGNvZihpdCkgPT0gJ1N0cmluZycgPyBpdC5zcGxpdCgnJykgOiBPYmplY3QoaXQpO1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL19pb2JqZWN0LmpzXG4gKiovIiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChpdCkuc2xpY2UoOCwgLTEpO1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL19jb2YuanNcbiAqKi8iLCIvLyA3LjIuMSBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKGl0ID09IHVuZGVmaW5lZCl0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiAgXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fZGVmaW5lZC5qc1xuICoqLyIsIi8vIGZhbHNlIC0+IEFycmF5I2luZGV4T2Zcbi8vIHRydWUgIC0+IEFycmF5I2luY2x1ZGVzXG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXG4gICwgdG9MZW5ndGggID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJylcbiAgLCB0b0luZGV4ICAgPSByZXF1aXJlKCcuL190by1pbmRleCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihJU19JTkNMVURFUyl7XG4gIHJldHVybiBmdW5jdGlvbigkdGhpcywgZWwsIGZyb21JbmRleCl7XG4gICAgdmFyIE8gICAgICA9IHRvSU9iamVjdCgkdGhpcylcbiAgICAgICwgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpXG4gICAgICAsIGluZGV4ICA9IHRvSW5kZXgoZnJvbUluZGV4LCBsZW5ndGgpXG4gICAgICAsIHZhbHVlO1xuICAgIC8vIEFycmF5I2luY2x1ZGVzIHVzZXMgU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG1cbiAgICBpZihJU19JTkNMVURFUyAmJiBlbCAhPSBlbCl3aGlsZShsZW5ndGggPiBpbmRleCl7XG4gICAgICB2YWx1ZSA9IE9baW5kZXgrK107XG4gICAgICBpZih2YWx1ZSAhPSB2YWx1ZSlyZXR1cm4gdHJ1ZTtcbiAgICAvLyBBcnJheSN0b0luZGV4IGlnbm9yZXMgaG9sZXMsIEFycmF5I2luY2x1ZGVzIC0gbm90XG4gICAgfSBlbHNlIGZvcig7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspaWYoSVNfSU5DTFVERVMgfHwgaW5kZXggaW4gTyl7XG4gICAgICBpZihPW2luZGV4XSA9PT0gZWwpcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4O1xuICAgIH0gcmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgfTtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fYXJyYXktaW5jbHVkZXMuanNcbiAqKi8iLCIvLyA3LjEuMTUgVG9MZW5ndGhcbnZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJylcbiAgLCBtaW4gICAgICAgPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXQgPiAwID8gbWluKHRvSW50ZWdlcihpdCksIDB4MWZmZmZmZmZmZmZmZmYpIDogMDsgLy8gcG93KDIsIDUzKSAtIDEgPT0gOTAwNzE5OTI1NDc0MDk5MVxufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL190by1sZW5ndGguanNcbiAqKi8iLCIvLyA3LjEuNCBUb0ludGVnZXJcbnZhciBjZWlsICA9IE1hdGguY2VpbFxuICAsIGZsb29yID0gTWF0aC5mbG9vcjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXNOYU4oaXQgPSAraXQpID8gMCA6IChpdCA+IDAgPyBmbG9vciA6IGNlaWwpKGl0KTtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fdG8taW50ZWdlci5qc1xuICoqLyIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJylcbiAgLCBtYXggICAgICAgPSBNYXRoLm1heFxuICAsIG1pbiAgICAgICA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpbmRleCwgbGVuZ3RoKXtcbiAgaW5kZXggPSB0b0ludGVnZXIoaW5kZXgpO1xuICByZXR1cm4gaW5kZXggPCAwID8gbWF4KGluZGV4ICsgbGVuZ3RoLCAwKSA6IG1pbihpbmRleCwgbGVuZ3RoKTtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fdG8taW5kZXguanNcbiAqKi8iLCJ2YXIgc2hhcmVkID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ2tleXMnKVxyXG4gICwgdWlkICAgID0gcmVxdWlyZSgnLi9fdWlkJyk7XHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oa2V5KXtcclxuICByZXR1cm4gc2hhcmVkW2tleV0gfHwgKHNoYXJlZFtrZXldID0gdWlkKGtleSkpO1xyXG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX3NoYXJlZC1rZXkuanNcbiAqKi8iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBTSEFSRUQgPSAnX19jb3JlLWpzX3NoYXJlZF9fJ1xuICAsIHN0b3JlICA9IGdsb2JhbFtTSEFSRURdIHx8IChnbG9iYWxbU0hBUkVEXSA9IHt9KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oa2V5KXtcbiAgcmV0dXJuIHN0b3JlW2tleV0gfHwgKHN0b3JlW2tleV0gPSB7fSk7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX3NoYXJlZC5qc1xuICoqLyIsIi8vIElFIDgtIGRvbid0IGVudW0gYnVnIGtleXNcclxubW9kdWxlLmV4cG9ydHMgPSAoXHJcbiAgJ2NvbnN0cnVjdG9yLGhhc093blByb3BlcnR5LGlzUHJvdG90eXBlT2YscHJvcGVydHlJc0VudW1lcmFibGUsdG9Mb2NhbGVTdHJpbmcsdG9TdHJpbmcsdmFsdWVPZidcclxuKS5zcGxpdCgnLCcpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX2VudW0tYnVnLWtleXMuanNcbiAqKi8iLCJleHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1nb3BzLmpzXG4gKiovIiwiZXhwb3J0cy5mID0ge30ucHJvcGVydHlJc0VudW1lcmFibGU7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LXBpZS5qc1xuICoqLyIsIi8vIDcuMS4xMyBUb09iamVjdChhcmd1bWVudClcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL190by1vYmplY3QuanNcbiAqKi8iLCIvLyBmaXggUHJvbWlzZSBQcm9ibGVtIG9uIEpTQ29udGV4dCBvZiBpT1M3fjhcbi8vIEBzZWUgaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTEzNTg2NlxuZ2xvYmFsLlByb21pc2UgPSBudWxsXG5yZXF1aXJlKCdjb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC50by1zdHJpbmcnKVxucmVxdWlyZSgnY29yZS1qcy9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKVxucmVxdWlyZSgnY29yZS1qcy9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKVxucmVxdWlyZSgnY29yZS1qcy9tb2R1bGVzL2VzNi5wcm9taXNlJylcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3BvbHlmaWxsL3Byb21pc2UuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG4vLyAxOS4xLjMuNiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nKClcbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi9fY2xhc3NvZicpXG4gICwgdGVzdCAgICA9IHt9O1xudGVzdFtyZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKV0gPSAneic7XG5pZih0ZXN0ICsgJycgIT0gJ1tvYmplY3Qgel0nKXtcbiAgcmVxdWlyZSgnLi9fcmVkZWZpbmUnKShPYmplY3QucHJvdG90eXBlLCAndG9TdHJpbmcnLCBmdW5jdGlvbiB0b1N0cmluZygpe1xuICAgIHJldHVybiAnW29iamVjdCAnICsgY2xhc3NvZih0aGlzKSArICddJztcbiAgfSwgdHJ1ZSk7XG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LnRvLXN0cmluZy5qc1xuICoqLyIsIi8vIGdldHRpbmcgdGFnIGZyb20gMTkuMS4zLjYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZygpXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJylcbiAgLCBUQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKVxuICAvLyBFUzMgd3JvbmcgaGVyZVxuICAsIEFSRyA9IGNvZihmdW5jdGlvbigpeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpID09ICdBcmd1bWVudHMnO1xuXG4vLyBmYWxsYmFjayBmb3IgSUUxMSBTY3JpcHQgQWNjZXNzIERlbmllZCBlcnJvclxudmFyIHRyeUdldCA9IGZ1bmN0aW9uKGl0LCBrZXkpe1xuICB0cnkge1xuICAgIHJldHVybiBpdFtrZXldO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgdmFyIE8sIFQsIEI7XG4gIHJldHVybiBpdCA9PT0gdW5kZWZpbmVkID8gJ1VuZGVmaW5lZCcgOiBpdCA9PT0gbnVsbCA/ICdOdWxsJ1xuICAgIC8vIEBAdG9TdHJpbmdUYWcgY2FzZVxuICAgIDogdHlwZW9mIChUID0gdHJ5R2V0KE8gPSBPYmplY3QoaXQpLCBUQUcpKSA9PSAnc3RyaW5nJyA/IFRcbiAgICAvLyBidWlsdGluVGFnIGNhc2VcbiAgICA6IEFSRyA/IGNvZihPKVxuICAgIC8vIEVTMyBhcmd1bWVudHMgZmFsbGJhY2tcbiAgICA6IChCID0gY29mKE8pKSA9PSAnT2JqZWN0JyAmJiB0eXBlb2YgTy5jYWxsZWUgPT0gJ2Z1bmN0aW9uJyA/ICdBcmd1bWVudHMnIDogQjtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fY2xhc3NvZi5qc1xuICoqLyIsInZhciBzdG9yZSAgICAgID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ3drcycpXG4gICwgdWlkICAgICAgICA9IHJlcXVpcmUoJy4vX3VpZCcpXG4gICwgU3ltYm9sICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLlN5bWJvbFxuICAsIFVTRV9TWU1CT0wgPSB0eXBlb2YgU3ltYm9sID09ICdmdW5jdGlvbic7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG5hbWUpe1xuICByZXR1cm4gc3RvcmVbbmFtZV0gfHwgKHN0b3JlW25hbWVdID1cbiAgICBVU0VfU1lNQk9MICYmIFN5bWJvbFtuYW1lXSB8fCAoVVNFX1NZTUJPTCA/IFN5bWJvbCA6IHVpZCkoJ1N5bWJvbC4nICsgbmFtZSkpO1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL193a3MuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgJGF0ICA9IHJlcXVpcmUoJy4vX3N0cmluZy1hdCcpKHRydWUpO1xuXG4vLyAyMS4xLjMuMjcgU3RyaW5nLnByb3RvdHlwZVtAQGl0ZXJhdG9yXSgpXG5yZXF1aXJlKCcuL19pdGVyLWRlZmluZScpKFN0cmluZywgJ1N0cmluZycsIGZ1bmN0aW9uKGl0ZXJhdGVkKXtcbiAgdGhpcy5fdCA9IFN0cmluZyhpdGVyYXRlZCk7IC8vIHRhcmdldFxuICB0aGlzLl9pID0gMDsgICAgICAgICAgICAgICAgLy8gbmV4dCBpbmRleFxuLy8gMjEuMS41LjIuMSAlU3RyaW5nSXRlcmF0b3JQcm90b3R5cGUlLm5leHQoKVxufSwgZnVuY3Rpb24oKXtcbiAgdmFyIE8gICAgID0gdGhpcy5fdFxuICAgICwgaW5kZXggPSB0aGlzLl9pXG4gICAgLCBwb2ludDtcbiAgaWYoaW5kZXggPj0gTy5sZW5ndGgpcmV0dXJuIHt2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlfTtcbiAgcG9pbnQgPSAkYXQoTywgaW5kZXgpO1xuICB0aGlzLl9pICs9IHBvaW50Lmxlbmd0aDtcbiAgcmV0dXJuIHt2YWx1ZTogcG9pbnQsIGRvbmU6IGZhbHNlfTtcbn0pO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvci5qc1xuICoqLyIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJylcbiAgLCBkZWZpbmVkICAgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG4vLyB0cnVlICAtPiBTdHJpbmcjYXRcbi8vIGZhbHNlIC0+IFN0cmluZyNjb2RlUG9pbnRBdFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihUT19TVFJJTkcpe1xuICByZXR1cm4gZnVuY3Rpb24odGhhdCwgcG9zKXtcbiAgICB2YXIgcyA9IFN0cmluZyhkZWZpbmVkKHRoYXQpKVxuICAgICAgLCBpID0gdG9JbnRlZ2VyKHBvcylcbiAgICAgICwgbCA9IHMubGVuZ3RoXG4gICAgICAsIGEsIGI7XG4gICAgaWYoaSA8IDAgfHwgaSA+PSBsKXJldHVybiBUT19TVFJJTkcgPyAnJyA6IHVuZGVmaW5lZDtcbiAgICBhID0gcy5jaGFyQ29kZUF0KGkpO1xuICAgIHJldHVybiBhIDwgMHhkODAwIHx8IGEgPiAweGRiZmYgfHwgaSArIDEgPT09IGwgfHwgKGIgPSBzLmNoYXJDb2RlQXQoaSArIDEpKSA8IDB4ZGMwMCB8fCBiID4gMHhkZmZmXG4gICAgICA/IFRPX1NUUklORyA/IHMuY2hhckF0KGkpIDogYVxuICAgICAgOiBUT19TVFJJTkcgPyBzLnNsaWNlKGksIGkgKyAyKSA6IChhIC0gMHhkODAwIDw8IDEwKSArIChiIC0gMHhkYzAwKSArIDB4MTAwMDA7XG4gIH07XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX3N0cmluZy1hdC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBMSUJSQVJZICAgICAgICA9IHJlcXVpcmUoJy4vX2xpYnJhcnknKVxuICAsICRleHBvcnQgICAgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCByZWRlZmluZSAgICAgICA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJylcbiAgLCBoaWRlICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hpZGUnKVxuICAsIGhhcyAgICAgICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCBJdGVyYXRvcnMgICAgICA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpXG4gICwgJGl0ZXJDcmVhdGUgICAgPSByZXF1aXJlKCcuL19pdGVyLWNyZWF0ZScpXG4gICwgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpXG4gICwgZ2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuL19vYmplY3QtZ3BvJylcbiAgLCBJVEVSQVRPUiAgICAgICA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpXG4gICwgQlVHR1kgICAgICAgICAgPSAhKFtdLmtleXMgJiYgJ25leHQnIGluIFtdLmtleXMoKSkgLy8gU2FmYXJpIGhhcyBidWdneSBpdGVyYXRvcnMgdy9vIGBuZXh0YFxuICAsIEZGX0lURVJBVE9SICAgID0gJ0BAaXRlcmF0b3InXG4gICwgS0VZUyAgICAgICAgICAgPSAna2V5cydcbiAgLCBWQUxVRVMgICAgICAgICA9ICd2YWx1ZXMnO1xuXG52YXIgcmV0dXJuVGhpcyA9IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzOyB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKEJhc2UsIE5BTUUsIENvbnN0cnVjdG9yLCBuZXh0LCBERUZBVUxULCBJU19TRVQsIEZPUkNFRCl7XG4gICRpdGVyQ3JlYXRlKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KTtcbiAgdmFyIGdldE1ldGhvZCA9IGZ1bmN0aW9uKGtpbmQpe1xuICAgIGlmKCFCVUdHWSAmJiBraW5kIGluIHByb3RvKXJldHVybiBwcm90b1traW5kXTtcbiAgICBzd2l0Y2goa2luZCl7XG4gICAgICBjYXNlIEtFWVM6IHJldHVybiBmdW5jdGlvbiBrZXlzKCl7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gICAgICBjYXNlIFZBTFVFUzogcmV0dXJuIGZ1bmN0aW9uIHZhbHVlcygpeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICAgIH0gcmV0dXJuIGZ1bmN0aW9uIGVudHJpZXMoKXsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgfTtcbiAgdmFyIFRBRyAgICAgICAgPSBOQU1FICsgJyBJdGVyYXRvcidcbiAgICAsIERFRl9WQUxVRVMgPSBERUZBVUxUID09IFZBTFVFU1xuICAgICwgVkFMVUVTX0JVRyA9IGZhbHNlXG4gICAgLCBwcm90byAgICAgID0gQmFzZS5wcm90b3R5cGVcbiAgICAsICRuYXRpdmUgICAgPSBwcm90b1tJVEVSQVRPUl0gfHwgcHJvdG9bRkZfSVRFUkFUT1JdIHx8IERFRkFVTFQgJiYgcHJvdG9bREVGQVVMVF1cbiAgICAsICRkZWZhdWx0ICAgPSAkbmF0aXZlIHx8IGdldE1ldGhvZChERUZBVUxUKVxuICAgICwgJGVudHJpZXMgICA9IERFRkFVTFQgPyAhREVGX1ZBTFVFUyA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKCdlbnRyaWVzJykgOiB1bmRlZmluZWRcbiAgICAsICRhbnlOYXRpdmUgPSBOQU1FID09ICdBcnJheScgPyBwcm90by5lbnRyaWVzIHx8ICRuYXRpdmUgOiAkbmF0aXZlXG4gICAgLCBtZXRob2RzLCBrZXksIEl0ZXJhdG9yUHJvdG90eXBlO1xuICAvLyBGaXggbmF0aXZlXG4gIGlmKCRhbnlOYXRpdmUpe1xuICAgIEl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG90eXBlT2YoJGFueU5hdGl2ZS5jYWxsKG5ldyBCYXNlKSk7XG4gICAgaWYoSXRlcmF0b3JQcm90b3R5cGUgIT09IE9iamVjdC5wcm90b3R5cGUpe1xuICAgICAgLy8gU2V0IEBAdG9TdHJpbmdUYWcgdG8gbmF0aXZlIGl0ZXJhdG9yc1xuICAgICAgc2V0VG9TdHJpbmdUYWcoSXRlcmF0b3JQcm90b3R5cGUsIFRBRywgdHJ1ZSk7XG4gICAgICAvLyBmaXggZm9yIHNvbWUgb2xkIGVuZ2luZXNcbiAgICAgIGlmKCFMSUJSQVJZICYmICFoYXMoSXRlcmF0b3JQcm90b3R5cGUsIElURVJBVE9SKSloaWRlKEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUiwgcmV0dXJuVGhpcyk7XG4gICAgfVxuICB9XG4gIC8vIGZpeCBBcnJheSN7dmFsdWVzLCBAQGl0ZXJhdG9yfS5uYW1lIGluIFY4IC8gRkZcbiAgaWYoREVGX1ZBTFVFUyAmJiAkbmF0aXZlICYmICRuYXRpdmUubmFtZSAhPT0gVkFMVUVTKXtcbiAgICBWQUxVRVNfQlVHID0gdHJ1ZTtcbiAgICAkZGVmYXVsdCA9IGZ1bmN0aW9uIHZhbHVlcygpeyByZXR1cm4gJG5hdGl2ZS5jYWxsKHRoaXMpOyB9O1xuICB9XG4gIC8vIERlZmluZSBpdGVyYXRvclxuICBpZigoIUxJQlJBUlkgfHwgRk9SQ0VEKSAmJiAoQlVHR1kgfHwgVkFMVUVTX0JVRyB8fCAhcHJvdG9bSVRFUkFUT1JdKSl7XG4gICAgaGlkZShwcm90bywgSVRFUkFUT1IsICRkZWZhdWx0KTtcbiAgfVxuICAvLyBQbHVnIGZvciBsaWJyYXJ5XG4gIEl0ZXJhdG9yc1tOQU1FXSA9ICRkZWZhdWx0O1xuICBJdGVyYXRvcnNbVEFHXSAgPSByZXR1cm5UaGlzO1xuICBpZihERUZBVUxUKXtcbiAgICBtZXRob2RzID0ge1xuICAgICAgdmFsdWVzOiAgREVGX1ZBTFVFUyA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKFZBTFVFUyksXG4gICAgICBrZXlzOiAgICBJU19TRVQgICAgID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoS0VZUyksXG4gICAgICBlbnRyaWVzOiAkZW50cmllc1xuICAgIH07XG4gICAgaWYoRk9SQ0VEKWZvcihrZXkgaW4gbWV0aG9kcyl7XG4gICAgICBpZighKGtleSBpbiBwcm90bykpcmVkZWZpbmUocHJvdG8sIGtleSwgbWV0aG9kc1trZXldKTtcbiAgICB9IGVsc2UgJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiAoQlVHR1kgfHwgVkFMVUVTX0JVRyksIE5BTUUsIG1ldGhvZHMpO1xuICB9XG4gIHJldHVybiBtZXRob2RzO1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL19pdGVyLWRlZmluZS5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZmFsc2U7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fbGlicmFyeS5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0ge307XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9faXRlcmF0b3JzLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGNyZWF0ZSAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpXG4gICwgZGVzY3JpcHRvciAgICAgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJylcbiAgLCBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJylcbiAgLCBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuXG4vLyAyNS4xLjIuMS4xICVJdGVyYXRvclByb3RvdHlwZSVbQEBpdGVyYXRvcl0oKVxucmVxdWlyZSgnLi9faGlkZScpKEl0ZXJhdG9yUHJvdG90eXBlLCByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKSwgZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXM7IH0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KXtcbiAgQ29uc3RydWN0b3IucHJvdG90eXBlID0gY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlLCB7bmV4dDogZGVzY3JpcHRvcigxLCBuZXh0KX0pO1xuICBzZXRUb1N0cmluZ1RhZyhDb25zdHJ1Y3RvciwgTkFNRSArICcgSXRlcmF0b3InKTtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9faXRlci1jcmVhdGUuanNcbiAqKi8iLCIvLyAxOS4xLjIuMiAvIDE1LjIuMy41IE9iamVjdC5jcmVhdGUoTyBbLCBQcm9wZXJ0aWVzXSlcclxudmFyIGFuT2JqZWN0ICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcclxuICAsIGRQcyAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwcycpXHJcbiAgLCBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKVxyXG4gICwgSUVfUFJPVE8gICAgPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJylcclxuICAsIEVtcHR5ICAgICAgID0gZnVuY3Rpb24oKXsgLyogZW1wdHkgKi8gfVxyXG4gICwgUFJPVE9UWVBFICAgPSAncHJvdG90eXBlJztcclxuXHJcbi8vIENyZWF0ZSBvYmplY3Qgd2l0aCBmYWtlIGBudWxsYCBwcm90b3R5cGU6IHVzZSBpZnJhbWUgT2JqZWN0IHdpdGggY2xlYXJlZCBwcm90b3R5cGVcclxudmFyIGNyZWF0ZURpY3QgPSBmdW5jdGlvbigpe1xyXG4gIC8vIFRocmFzaCwgd2FzdGUgYW5kIHNvZG9teTogSUUgR0MgYnVnXHJcbiAgdmFyIGlmcmFtZSA9IHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKSgnaWZyYW1lJylcclxuICAgICwgaSAgICAgID0gZW51bUJ1Z0tleXMubGVuZ3RoXHJcbiAgICAsIGd0ICAgICA9ICc+J1xyXG4gICAgLCBpZnJhbWVEb2N1bWVudDtcclxuICBpZnJhbWUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICByZXF1aXJlKCcuL19odG1sJykuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcclxuICBpZnJhbWUuc3JjID0gJ2phdmFzY3JpcHQ6JzsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1zY3JpcHQtdXJsXHJcbiAgLy8gY3JlYXRlRGljdCA9IGlmcmFtZS5jb250ZW50V2luZG93Lk9iamVjdDtcclxuICAvLyBodG1sLnJlbW92ZUNoaWxkKGlmcmFtZSk7XHJcbiAgaWZyYW1lRG9jdW1lbnQgPSBpZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudDtcclxuICBpZnJhbWVEb2N1bWVudC5vcGVuKCk7XHJcbiAgaWZyYW1lRG9jdW1lbnQud3JpdGUoJzxzY3JpcHQ+ZG9jdW1lbnQuRj1PYmplY3Q8L3NjcmlwdCcgKyBndCk7XHJcbiAgaWZyYW1lRG9jdW1lbnQuY2xvc2UoKTtcclxuICBjcmVhdGVEaWN0ID0gaWZyYW1lRG9jdW1lbnQuRjtcclxuICB3aGlsZShpLS0pZGVsZXRlIGNyZWF0ZURpY3RbUFJPVE9UWVBFXVtlbnVtQnVnS2V5c1tpXV07XHJcbiAgcmV0dXJuIGNyZWF0ZURpY3QoKTtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmNyZWF0ZSB8fCBmdW5jdGlvbiBjcmVhdGUoTywgUHJvcGVydGllcyl7XHJcbiAgdmFyIHJlc3VsdDtcclxuICBpZihPICE9PSBudWxsKXtcclxuICAgIEVtcHR5W1BST1RPVFlQRV0gPSBhbk9iamVjdChPKTtcclxuICAgIHJlc3VsdCA9IG5ldyBFbXB0eTtcclxuICAgIEVtcHR5W1BST1RPVFlQRV0gPSBudWxsO1xyXG4gICAgLy8gYWRkIFwiX19wcm90b19fXCIgZm9yIE9iamVjdC5nZXRQcm90b3R5cGVPZiBwb2x5ZmlsbFxyXG4gICAgcmVzdWx0W0lFX1BST1RPXSA9IE87XHJcbiAgfSBlbHNlIHJlc3VsdCA9IGNyZWF0ZURpY3QoKTtcclxuICByZXR1cm4gUHJvcGVydGllcyA9PT0gdW5kZWZpbmVkID8gcmVzdWx0IDogZFBzKHJlc3VsdCwgUHJvcGVydGllcyk7XHJcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWNyZWF0ZS5qc1xuICoqLyIsInZhciBkUCAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpXHJcbiAgLCBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXHJcbiAgLCBnZXRLZXlzICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcyl7XHJcbiAgYW5PYmplY3QoTyk7XHJcbiAgdmFyIGtleXMgICA9IGdldEtleXMoUHJvcGVydGllcylcclxuICAgICwgbGVuZ3RoID0ga2V5cy5sZW5ndGhcclxuICAgICwgaSA9IDBcclxuICAgICwgUDtcclxuICB3aGlsZShsZW5ndGggPiBpKWRQLmYoTywgUCA9IGtleXNbaSsrXSwgUHJvcGVydGllc1tQXSk7XHJcbiAgcmV0dXJuIE87XHJcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWRwcy5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuZG9jdW1lbnQgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX2h0bWwuanNcbiAqKi8iLCJ2YXIgZGVmID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZlxuICAsIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgVEFHID0gcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIHRhZywgc3RhdCl7XG4gIGlmKGl0ICYmICFoYXMoaXQgPSBzdGF0ID8gaXQgOiBpdC5wcm90b3R5cGUsIFRBRykpZGVmKGl0LCBUQUcsIHtjb25maWd1cmFibGU6IHRydWUsIHZhbHVlOiB0YWd9KTtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fc2V0LXRvLXN0cmluZy10YWcuanNcbiAqKi8iLCIvLyAxOS4xLjIuOSAvIDE1LjIuMy4yIE9iamVjdC5nZXRQcm90b3R5cGVPZihPKVxyXG52YXIgaGFzICAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxyXG4gICwgdG9PYmplY3QgICAgPSByZXF1aXJlKCcuL190by1vYmplY3QnKVxyXG4gICwgSUVfUFJPVE8gICAgPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJylcclxuICAsIE9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmdldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uKE8pe1xyXG4gIE8gPSB0b09iamVjdChPKTtcclxuICBpZihoYXMoTywgSUVfUFJPVE8pKXJldHVybiBPW0lFX1BST1RPXTtcclxuICBpZih0eXBlb2YgTy5jb25zdHJ1Y3RvciA9PSAnZnVuY3Rpb24nICYmIE8gaW5zdGFuY2VvZiBPLmNvbnN0cnVjdG9yKXtcclxuICAgIHJldHVybiBPLmNvbnN0cnVjdG9yLnByb3RvdHlwZTtcclxuICB9IHJldHVybiBPIGluc3RhbmNlb2YgT2JqZWN0ID8gT2JqZWN0UHJvdG8gOiBudWxsO1xyXG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1ncG8uanNcbiAqKi8iLCJ2YXIgJGl0ZXJhdG9ycyAgICA9IHJlcXVpcmUoJy4vZXM2LmFycmF5Lml0ZXJhdG9yJylcbiAgLCByZWRlZmluZSAgICAgID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUnKVxuICAsIGdsb2JhbCAgICAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIGhpZGUgICAgICAgICAgPSByZXF1aXJlKCcuL19oaWRlJylcbiAgLCBJdGVyYXRvcnMgICAgID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJylcbiAgLCB3a3MgICAgICAgICAgID0gcmVxdWlyZSgnLi9fd2tzJylcbiAgLCBJVEVSQVRPUiAgICAgID0gd2tzKCdpdGVyYXRvcicpXG4gICwgVE9fU1RSSU5HX1RBRyA9IHdrcygndG9TdHJpbmdUYWcnKVxuICAsIEFycmF5VmFsdWVzICAgPSBJdGVyYXRvcnMuQXJyYXk7XG5cbmZvcih2YXIgY29sbGVjdGlvbnMgPSBbJ05vZGVMaXN0JywgJ0RPTVRva2VuTGlzdCcsICdNZWRpYUxpc3QnLCAnU3R5bGVTaGVldExpc3QnLCAnQ1NTUnVsZUxpc3QnXSwgaSA9IDA7IGkgPCA1OyBpKyspe1xuICB2YXIgTkFNRSAgICAgICA9IGNvbGxlY3Rpb25zW2ldXG4gICAgLCBDb2xsZWN0aW9uID0gZ2xvYmFsW05BTUVdXG4gICAgLCBwcm90byAgICAgID0gQ29sbGVjdGlvbiAmJiBDb2xsZWN0aW9uLnByb3RvdHlwZVxuICAgICwga2V5O1xuICBpZihwcm90byl7XG4gICAgaWYoIXByb3RvW0lURVJBVE9SXSloaWRlKHByb3RvLCBJVEVSQVRPUiwgQXJyYXlWYWx1ZXMpO1xuICAgIGlmKCFwcm90b1tUT19TVFJJTkdfVEFHXSloaWRlKHByb3RvLCBUT19TVFJJTkdfVEFHLCBOQU1FKTtcbiAgICBJdGVyYXRvcnNbTkFNRV0gPSBBcnJheVZhbHVlcztcbiAgICBmb3Ioa2V5IGluICRpdGVyYXRvcnMpaWYoIXByb3RvW2tleV0pcmVkZWZpbmUocHJvdG8sIGtleSwgJGl0ZXJhdG9yc1trZXldLCB0cnVlKTtcbiAgfVxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBhZGRUb1Vuc2NvcGFibGVzID0gcmVxdWlyZSgnLi9fYWRkLXRvLXVuc2NvcGFibGVzJylcbiAgLCBzdGVwICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9faXRlci1zdGVwJylcbiAgLCBJdGVyYXRvcnMgICAgICAgID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJylcbiAgLCB0b0lPYmplY3QgICAgICAgID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xuXG4vLyAyMi4xLjMuNCBBcnJheS5wcm90b3R5cGUuZW50cmllcygpXG4vLyAyMi4xLjMuMTMgQXJyYXkucHJvdG90eXBlLmtleXMoKVxuLy8gMjIuMS4zLjI5IEFycmF5LnByb3RvdHlwZS52YWx1ZXMoKVxuLy8gMjIuMS4zLjMwIEFycmF5LnByb3RvdHlwZVtAQGl0ZXJhdG9yXSgpXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2l0ZXItZGVmaW5lJykoQXJyYXksICdBcnJheScsIGZ1bmN0aW9uKGl0ZXJhdGVkLCBraW5kKXtcbiAgdGhpcy5fdCA9IHRvSU9iamVjdChpdGVyYXRlZCk7IC8vIHRhcmdldFxuICB0aGlzLl9pID0gMDsgICAgICAgICAgICAgICAgICAgLy8gbmV4dCBpbmRleFxuICB0aGlzLl9rID0ga2luZDsgICAgICAgICAgICAgICAgLy8ga2luZFxuLy8gMjIuMS41LjIuMSAlQXJyYXlJdGVyYXRvclByb3RvdHlwZSUubmV4dCgpXG59LCBmdW5jdGlvbigpe1xuICB2YXIgTyAgICAgPSB0aGlzLl90XG4gICAgLCBraW5kICA9IHRoaXMuX2tcbiAgICAsIGluZGV4ID0gdGhpcy5faSsrO1xuICBpZighTyB8fCBpbmRleCA+PSBPLmxlbmd0aCl7XG4gICAgdGhpcy5fdCA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gc3RlcCgxKTtcbiAgfVxuICBpZihraW5kID09ICdrZXlzJyAgKXJldHVybiBzdGVwKDAsIGluZGV4KTtcbiAgaWYoa2luZCA9PSAndmFsdWVzJylyZXR1cm4gc3RlcCgwLCBPW2luZGV4XSk7XG4gIHJldHVybiBzdGVwKDAsIFtpbmRleCwgT1tpbmRleF1dKTtcbn0sICd2YWx1ZXMnKTtcblxuLy8gYXJndW1lbnRzTGlzdFtAQGl0ZXJhdG9yXSBpcyAlQXJyYXlQcm90b192YWx1ZXMlICg5LjQuNC42LCA5LjQuNC43KVxuSXRlcmF0b3JzLkFyZ3VtZW50cyA9IEl0ZXJhdG9ycy5BcnJheTtcblxuYWRkVG9VbnNjb3BhYmxlcygna2V5cycpO1xuYWRkVG9VbnNjb3BhYmxlcygndmFsdWVzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCdlbnRyaWVzJyk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuaXRlcmF0b3IuanNcbiAqKi8iLCIvLyAyMi4xLjMuMzEgQXJyYXkucHJvdG90eXBlW0BAdW5zY29wYWJsZXNdXG52YXIgVU5TQ09QQUJMRVMgPSByZXF1aXJlKCcuL193a3MnKSgndW5zY29wYWJsZXMnKVxuICAsIEFycmF5UHJvdG8gID0gQXJyYXkucHJvdG90eXBlO1xuaWYoQXJyYXlQcm90b1tVTlNDT1BBQkxFU10gPT0gdW5kZWZpbmVkKXJlcXVpcmUoJy4vX2hpZGUnKShBcnJheVByb3RvLCBVTlNDT1BBQkxFUywge30pO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICBBcnJheVByb3RvW1VOU0NPUEFCTEVTXVtrZXldID0gdHJ1ZTtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fYWRkLXRvLXVuc2NvcGFibGVzLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihkb25lLCB2YWx1ZSl7XG4gIHJldHVybiB7dmFsdWU6IHZhbHVlLCBkb25lOiAhIWRvbmV9O1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL19pdGVyLXN0ZXAuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgTElCUkFSWSAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fbGlicmFyeScpXG4gICwgZ2xvYmFsICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBjdHggICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19jdHgnKVxuICAsIGNsYXNzb2YgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2NsYXNzb2YnKVxuICAsICRleHBvcnQgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgaXNPYmplY3QgICAgICAgICAgID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0JylcbiAgLCBhbk9iamVjdCAgICAgICAgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIGFGdW5jdGlvbiAgICAgICAgICA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKVxuICAsIGFuSW5zdGFuY2UgICAgICAgICA9IHJlcXVpcmUoJy4vX2FuLWluc3RhbmNlJylcbiAgLCBmb3JPZiAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19mb3Itb2YnKVxuICAsIHNldFByb3RvICAgICAgICAgICA9IHJlcXVpcmUoJy4vX3NldC1wcm90bycpLnNldFxuICAsIHNwZWNpZXNDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4vX3NwZWNpZXMtY29uc3RydWN0b3InKVxuICAsIHRhc2sgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX3Rhc2snKS5zZXRcbiAgLCBtaWNyb3Rhc2sgICAgICAgICAgPSByZXF1aXJlKCcuL19taWNyb3Rhc2snKVxuICAsIFBST01JU0UgICAgICAgICAgICA9ICdQcm9taXNlJ1xuICAsIFR5cGVFcnJvciAgICAgICAgICA9IGdsb2JhbC5UeXBlRXJyb3JcbiAgLCBwcm9jZXNzICAgICAgICAgICAgPSBnbG9iYWwucHJvY2Vzc1xuICAsICRQcm9taXNlICAgICAgICAgICA9IGdsb2JhbFtQUk9NSVNFXVxuICAsIHByb2Nlc3MgICAgICAgICAgICA9IGdsb2JhbC5wcm9jZXNzXG4gICwgaXNOb2RlICAgICAgICAgICAgID0gY2xhc3NvZihwcm9jZXNzKSA9PSAncHJvY2VzcydcbiAgLCBlbXB0eSAgICAgICAgICAgICAgPSBmdW5jdGlvbigpeyAvKiBlbXB0eSAqLyB9XG4gICwgSW50ZXJuYWwsIEdlbmVyaWNQcm9taXNlQ2FwYWJpbGl0eSwgV3JhcHBlcjtcblxudmFyIFVTRV9OQVRJVkUgPSAhIWZ1bmN0aW9uKCl7XG4gIHRyeSB7XG4gICAgLy8gY29ycmVjdCBzdWJjbGFzc2luZyB3aXRoIEBAc3BlY2llcyBzdXBwb3J0XG4gICAgdmFyIHByb21pc2UgICAgID0gJFByb21pc2UucmVzb2x2ZSgxKVxuICAgICAgLCBGYWtlUHJvbWlzZSA9IChwcm9taXNlLmNvbnN0cnVjdG9yID0ge30pW3JlcXVpcmUoJy4vX3drcycpKCdzcGVjaWVzJyldID0gZnVuY3Rpb24oZXhlYyl7IGV4ZWMoZW1wdHksIGVtcHR5KTsgfTtcbiAgICAvLyB1bmhhbmRsZWQgcmVqZWN0aW9ucyB0cmFja2luZyBzdXBwb3J0LCBOb2RlSlMgUHJvbWlzZSB3aXRob3V0IGl0IGZhaWxzIEBAc3BlY2llcyB0ZXN0XG4gICAgcmV0dXJuIChpc05vZGUgfHwgdHlwZW9mIFByb21pc2VSZWplY3Rpb25FdmVudCA9PSAnZnVuY3Rpb24nKSAmJiBwcm9taXNlLnRoZW4oZW1wdHkpIGluc3RhbmNlb2YgRmFrZVByb21pc2U7XG4gIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbn0oKTtcblxuLy8gaGVscGVyc1xudmFyIHNhbWVDb25zdHJ1Y3RvciA9IGZ1bmN0aW9uKGEsIGIpe1xuICAvLyB3aXRoIGxpYnJhcnkgd3JhcHBlciBzcGVjaWFsIGNhc2VcbiAgcmV0dXJuIGEgPT09IGIgfHwgYSA9PT0gJFByb21pc2UgJiYgYiA9PT0gV3JhcHBlcjtcbn07XG52YXIgaXNUaGVuYWJsZSA9IGZ1bmN0aW9uKGl0KXtcbiAgdmFyIHRoZW47XG4gIHJldHVybiBpc09iamVjdChpdCkgJiYgdHlwZW9mICh0aGVuID0gaXQudGhlbikgPT0gJ2Z1bmN0aW9uJyA/IHRoZW4gOiBmYWxzZTtcbn07XG52YXIgbmV3UHJvbWlzZUNhcGFiaWxpdHkgPSBmdW5jdGlvbihDKXtcbiAgcmV0dXJuIHNhbWVDb25zdHJ1Y3RvcigkUHJvbWlzZSwgQylcbiAgICA/IG5ldyBQcm9taXNlQ2FwYWJpbGl0eShDKVxuICAgIDogbmV3IEdlbmVyaWNQcm9taXNlQ2FwYWJpbGl0eShDKTtcbn07XG52YXIgUHJvbWlzZUNhcGFiaWxpdHkgPSBHZW5lcmljUHJvbWlzZUNhcGFiaWxpdHkgPSBmdW5jdGlvbihDKXtcbiAgdmFyIHJlc29sdmUsIHJlamVjdDtcbiAgdGhpcy5wcm9taXNlID0gbmV3IEMoZnVuY3Rpb24oJCRyZXNvbHZlLCAkJHJlamVjdCl7XG4gICAgaWYocmVzb2x2ZSAhPT0gdW5kZWZpbmVkIHx8IHJlamVjdCAhPT0gdW5kZWZpbmVkKXRocm93IFR5cGVFcnJvcignQmFkIFByb21pc2UgY29uc3RydWN0b3InKTtcbiAgICByZXNvbHZlID0gJCRyZXNvbHZlO1xuICAgIHJlamVjdCAgPSAkJHJlamVjdDtcbiAgfSk7XG4gIHRoaXMucmVzb2x2ZSA9IGFGdW5jdGlvbihyZXNvbHZlKTtcbiAgdGhpcy5yZWplY3QgID0gYUZ1bmN0aW9uKHJlamVjdCk7XG59O1xudmFyIHBlcmZvcm0gPSBmdW5jdGlvbihleGVjKXtcbiAgdHJ5IHtcbiAgICBleGVjKCk7XG4gIH0gY2F0Y2goZSl7XG4gICAgcmV0dXJuIHtlcnJvcjogZX07XG4gIH1cbn07XG52YXIgbm90aWZ5ID0gZnVuY3Rpb24ocHJvbWlzZSwgaXNSZWplY3Qpe1xuICBpZihwcm9taXNlLl9uKXJldHVybjtcbiAgcHJvbWlzZS5fbiA9IHRydWU7XG4gIHZhciBjaGFpbiA9IHByb21pc2UuX2M7XG4gIG1pY3JvdGFzayhmdW5jdGlvbigpe1xuICAgIHZhciB2YWx1ZSA9IHByb21pc2UuX3ZcbiAgICAgICwgb2sgICAgPSBwcm9taXNlLl9zID09IDFcbiAgICAgICwgaSAgICAgPSAwO1xuICAgIHZhciBydW4gPSBmdW5jdGlvbihyZWFjdGlvbil7XG4gICAgICB2YXIgaGFuZGxlciA9IG9rID8gcmVhY3Rpb24ub2sgOiByZWFjdGlvbi5mYWlsXG4gICAgICAgICwgcmVzb2x2ZSA9IHJlYWN0aW9uLnJlc29sdmVcbiAgICAgICAgLCByZWplY3QgID0gcmVhY3Rpb24ucmVqZWN0XG4gICAgICAgICwgZG9tYWluICA9IHJlYWN0aW9uLmRvbWFpblxuICAgICAgICAsIHJlc3VsdCwgdGhlbjtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmKGhhbmRsZXIpe1xuICAgICAgICAgIGlmKCFvayl7XG4gICAgICAgICAgICBpZihwcm9taXNlLl9oID09IDIpb25IYW5kbGVVbmhhbmRsZWQocHJvbWlzZSk7XG4gICAgICAgICAgICBwcm9taXNlLl9oID0gMTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYoaGFuZGxlciA9PT0gdHJ1ZSlyZXN1bHQgPSB2YWx1ZTtcbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmKGRvbWFpbilkb21haW4uZW50ZXIoKTtcbiAgICAgICAgICAgIHJlc3VsdCA9IGhhbmRsZXIodmFsdWUpO1xuICAgICAgICAgICAgaWYoZG9tYWluKWRvbWFpbi5leGl0KCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmKHJlc3VsdCA9PT0gcmVhY3Rpb24ucHJvbWlzZSl7XG4gICAgICAgICAgICByZWplY3QoVHlwZUVycm9yKCdQcm9taXNlLWNoYWluIGN5Y2xlJykpO1xuICAgICAgICAgIH0gZWxzZSBpZih0aGVuID0gaXNUaGVuYWJsZShyZXN1bHQpKXtcbiAgICAgICAgICAgIHRoZW4uY2FsbChyZXN1bHQsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSBlbHNlIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSBlbHNlIHJlamVjdCh2YWx1ZSk7XG4gICAgICB9IGNhdGNoKGUpe1xuICAgICAgICByZWplY3QoZSk7XG4gICAgICB9XG4gICAgfTtcbiAgICB3aGlsZShjaGFpbi5sZW5ndGggPiBpKXJ1bihjaGFpbltpKytdKTsgLy8gdmFyaWFibGUgbGVuZ3RoIC0gY2FuJ3QgdXNlIGZvckVhY2hcbiAgICBwcm9taXNlLl9jID0gW107XG4gICAgcHJvbWlzZS5fbiA9IGZhbHNlO1xuICAgIGlmKGlzUmVqZWN0ICYmICFwcm9taXNlLl9oKW9uVW5oYW5kbGVkKHByb21pc2UpO1xuICB9KTtcbn07XG52YXIgb25VbmhhbmRsZWQgPSBmdW5jdGlvbihwcm9taXNlKXtcbiAgdGFzay5jYWxsKGdsb2JhbCwgZnVuY3Rpb24oKXtcbiAgICB2YXIgdmFsdWUgPSBwcm9taXNlLl92XG4gICAgICAsIGFicnVwdCwgaGFuZGxlciwgY29uc29sZTtcbiAgICBpZihpc1VuaGFuZGxlZChwcm9taXNlKSl7XG4gICAgICBhYnJ1cHQgPSBwZXJmb3JtKGZ1bmN0aW9uKCl7XG4gICAgICAgIGlmKGlzTm9kZSl7XG4gICAgICAgICAgcHJvY2Vzcy5lbWl0KCd1bmhhbmRsZWRSZWplY3Rpb24nLCB2YWx1ZSwgcHJvbWlzZSk7XG4gICAgICAgIH0gZWxzZSBpZihoYW5kbGVyID0gZ2xvYmFsLm9udW5oYW5kbGVkcmVqZWN0aW9uKXtcbiAgICAgICAgICBoYW5kbGVyKHtwcm9taXNlOiBwcm9taXNlLCByZWFzb246IHZhbHVlfSk7XG4gICAgICAgIH0gZWxzZSBpZigoY29uc29sZSA9IGdsb2JhbC5jb25zb2xlKSAmJiBjb25zb2xlLmVycm9yKXtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdVbmhhbmRsZWQgcHJvbWlzZSByZWplY3Rpb24nLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgLy8gQnJvd3NlcnMgc2hvdWxkIG5vdCB0cmlnZ2VyIGByZWplY3Rpb25IYW5kbGVkYCBldmVudCBpZiBpdCB3YXMgaGFuZGxlZCBoZXJlLCBOb2RlSlMgLSBzaG91bGRcbiAgICAgIHByb21pc2UuX2ggPSBpc05vZGUgfHwgaXNVbmhhbmRsZWQocHJvbWlzZSkgPyAyIDogMTtcbiAgICB9IHByb21pc2UuX2EgPSB1bmRlZmluZWQ7XG4gICAgaWYoYWJydXB0KXRocm93IGFicnVwdC5lcnJvcjtcbiAgfSk7XG59O1xudmFyIGlzVW5oYW5kbGVkID0gZnVuY3Rpb24ocHJvbWlzZSl7XG4gIGlmKHByb21pc2UuX2ggPT0gMSlyZXR1cm4gZmFsc2U7XG4gIHZhciBjaGFpbiA9IHByb21pc2UuX2EgfHwgcHJvbWlzZS5fY1xuICAgICwgaSAgICAgPSAwXG4gICAgLCByZWFjdGlvbjtcbiAgd2hpbGUoY2hhaW4ubGVuZ3RoID4gaSl7XG4gICAgcmVhY3Rpb24gPSBjaGFpbltpKytdO1xuICAgIGlmKHJlYWN0aW9uLmZhaWwgfHwgIWlzVW5oYW5kbGVkKHJlYWN0aW9uLnByb21pc2UpKXJldHVybiBmYWxzZTtcbiAgfSByZXR1cm4gdHJ1ZTtcbn07XG52YXIgb25IYW5kbGVVbmhhbmRsZWQgPSBmdW5jdGlvbihwcm9taXNlKXtcbiAgdGFzay5jYWxsKGdsb2JhbCwgZnVuY3Rpb24oKXtcbiAgICB2YXIgaGFuZGxlcjtcbiAgICBpZihpc05vZGUpe1xuICAgICAgcHJvY2Vzcy5lbWl0KCdyZWplY3Rpb25IYW5kbGVkJywgcHJvbWlzZSk7XG4gICAgfSBlbHNlIGlmKGhhbmRsZXIgPSBnbG9iYWwub25yZWplY3Rpb25oYW5kbGVkKXtcbiAgICAgIGhhbmRsZXIoe3Byb21pc2U6IHByb21pc2UsIHJlYXNvbjogcHJvbWlzZS5fdn0pO1xuICAgIH1cbiAgfSk7XG59O1xudmFyICRyZWplY3QgPSBmdW5jdGlvbih2YWx1ZSl7XG4gIHZhciBwcm9taXNlID0gdGhpcztcbiAgaWYocHJvbWlzZS5fZClyZXR1cm47XG4gIHByb21pc2UuX2QgPSB0cnVlO1xuICBwcm9taXNlID0gcHJvbWlzZS5fdyB8fCBwcm9taXNlOyAvLyB1bndyYXBcbiAgcHJvbWlzZS5fdiA9IHZhbHVlO1xuICBwcm9taXNlLl9zID0gMjtcbiAgaWYoIXByb21pc2UuX2EpcHJvbWlzZS5fYSA9IHByb21pc2UuX2Muc2xpY2UoKTtcbiAgbm90aWZ5KHByb21pc2UsIHRydWUpO1xufTtcbnZhciAkcmVzb2x2ZSA9IGZ1bmN0aW9uKHZhbHVlKXtcbiAgdmFyIHByb21pc2UgPSB0aGlzXG4gICAgLCB0aGVuO1xuICBpZihwcm9taXNlLl9kKXJldHVybjtcbiAgcHJvbWlzZS5fZCA9IHRydWU7XG4gIHByb21pc2UgPSBwcm9taXNlLl93IHx8IHByb21pc2U7IC8vIHVud3JhcFxuICB0cnkge1xuICAgIGlmKHByb21pc2UgPT09IHZhbHVlKXRocm93IFR5cGVFcnJvcihcIlByb21pc2UgY2FuJ3QgYmUgcmVzb2x2ZWQgaXRzZWxmXCIpO1xuICAgIGlmKHRoZW4gPSBpc1RoZW5hYmxlKHZhbHVlKSl7XG4gICAgICBtaWNyb3Rhc2soZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIHdyYXBwZXIgPSB7X3c6IHByb21pc2UsIF9kOiBmYWxzZX07IC8vIHdyYXBcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB0aGVuLmNhbGwodmFsdWUsIGN0eCgkcmVzb2x2ZSwgd3JhcHBlciwgMSksIGN0eCgkcmVqZWN0LCB3cmFwcGVyLCAxKSk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgJHJlamVjdC5jYWxsKHdyYXBwZXIsIGUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcHJvbWlzZS5fdiA9IHZhbHVlO1xuICAgICAgcHJvbWlzZS5fcyA9IDE7XG4gICAgICBub3RpZnkocHJvbWlzZSwgZmFsc2UpO1xuICAgIH1cbiAgfSBjYXRjaChlKXtcbiAgICAkcmVqZWN0LmNhbGwoe193OiBwcm9taXNlLCBfZDogZmFsc2V9LCBlKTsgLy8gd3JhcFxuICB9XG59O1xuXG4vLyBjb25zdHJ1Y3RvciBwb2x5ZmlsbFxuaWYoIVVTRV9OQVRJVkUpe1xuICAvLyAyNS40LjMuMSBQcm9taXNlKGV4ZWN1dG9yKVxuICAkUHJvbWlzZSA9IGZ1bmN0aW9uIFByb21pc2UoZXhlY3V0b3Ipe1xuICAgIGFuSW5zdGFuY2UodGhpcywgJFByb21pc2UsIFBST01JU0UsICdfaCcpO1xuICAgIGFGdW5jdGlvbihleGVjdXRvcik7XG4gICAgSW50ZXJuYWwuY2FsbCh0aGlzKTtcbiAgICB0cnkge1xuICAgICAgZXhlY3V0b3IoY3R4KCRyZXNvbHZlLCB0aGlzLCAxKSwgY3R4KCRyZWplY3QsIHRoaXMsIDEpKTtcbiAgICB9IGNhdGNoKGVycil7XG4gICAgICAkcmVqZWN0LmNhbGwodGhpcywgZXJyKTtcbiAgICB9XG4gIH07XG4gIEludGVybmFsID0gZnVuY3Rpb24gUHJvbWlzZShleGVjdXRvcil7XG4gICAgdGhpcy5fYyA9IFtdOyAgICAgICAgICAgICAvLyA8LSBhd2FpdGluZyByZWFjdGlvbnNcbiAgICB0aGlzLl9hID0gdW5kZWZpbmVkOyAgICAgIC8vIDwtIGNoZWNrZWQgaW4gaXNVbmhhbmRsZWQgcmVhY3Rpb25zXG4gICAgdGhpcy5fcyA9IDA7ICAgICAgICAgICAgICAvLyA8LSBzdGF0ZVxuICAgIHRoaXMuX2QgPSBmYWxzZTsgICAgICAgICAgLy8gPC0gZG9uZVxuICAgIHRoaXMuX3YgPSB1bmRlZmluZWQ7ICAgICAgLy8gPC0gdmFsdWVcbiAgICB0aGlzLl9oID0gMDsgICAgICAgICAgICAgIC8vIDwtIHJlamVjdGlvbiBzdGF0ZSwgMCAtIGRlZmF1bHQsIDEgLSBoYW5kbGVkLCAyIC0gdW5oYW5kbGVkXG4gICAgdGhpcy5fbiA9IGZhbHNlOyAgICAgICAgICAvLyA8LSBub3RpZnlcbiAgfTtcbiAgSW50ZXJuYWwucHJvdG90eXBlID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUtYWxsJykoJFByb21pc2UucHJvdG90eXBlLCB7XG4gICAgLy8gMjUuNC41LjMgUHJvbWlzZS5wcm90b3R5cGUudGhlbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZClcbiAgICB0aGVuOiBmdW5jdGlvbiB0aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKXtcbiAgICAgIHZhciByZWFjdGlvbiAgICA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KHNwZWNpZXNDb25zdHJ1Y3Rvcih0aGlzLCAkUHJvbWlzZSkpO1xuICAgICAgcmVhY3Rpb24ub2sgICAgID0gdHlwZW9mIG9uRnVsZmlsbGVkID09ICdmdW5jdGlvbicgPyBvbkZ1bGZpbGxlZCA6IHRydWU7XG4gICAgICByZWFjdGlvbi5mYWlsICAgPSB0eXBlb2Ygb25SZWplY3RlZCA9PSAnZnVuY3Rpb24nICYmIG9uUmVqZWN0ZWQ7XG4gICAgICByZWFjdGlvbi5kb21haW4gPSBpc05vZGUgPyBwcm9jZXNzLmRvbWFpbiA6IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuX2MucHVzaChyZWFjdGlvbik7XG4gICAgICBpZih0aGlzLl9hKXRoaXMuX2EucHVzaChyZWFjdGlvbik7XG4gICAgICBpZih0aGlzLl9zKW5vdGlmeSh0aGlzLCBmYWxzZSk7XG4gICAgICByZXR1cm4gcmVhY3Rpb24ucHJvbWlzZTtcbiAgICB9LFxuICAgIC8vIDI1LjQuNS4xIFByb21pc2UucHJvdG90eXBlLmNhdGNoKG9uUmVqZWN0ZWQpXG4gICAgJ2NhdGNoJzogZnVuY3Rpb24ob25SZWplY3RlZCl7XG4gICAgICByZXR1cm4gdGhpcy50aGVuKHVuZGVmaW5lZCwgb25SZWplY3RlZCk7XG4gICAgfVxuICB9KTtcbiAgUHJvbWlzZUNhcGFiaWxpdHkgPSBmdW5jdGlvbigpe1xuICAgIHZhciBwcm9taXNlICA9IG5ldyBJbnRlcm5hbDtcbiAgICB0aGlzLnByb21pc2UgPSBwcm9taXNlO1xuICAgIHRoaXMucmVzb2x2ZSA9IGN0eCgkcmVzb2x2ZSwgcHJvbWlzZSwgMSk7XG4gICAgdGhpcy5yZWplY3QgID0gY3R4KCRyZWplY3QsIHByb21pc2UsIDEpO1xuICB9O1xufVxuXG4kZXhwb3J0KCRleHBvcnQuRyArICRleHBvcnQuVyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCB7UHJvbWlzZTogJFByb21pc2V9KTtcbnJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJykoJFByb21pc2UsIFBST01JU0UpO1xucmVxdWlyZSgnLi9fc2V0LXNwZWNpZXMnKShQUk9NSVNFKTtcbldyYXBwZXIgPSByZXF1aXJlKCcuL19jb3JlJylbUFJPTUlTRV07XG5cbi8vIHN0YXRpY3NcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsIFBST01JU0UsIHtcbiAgLy8gMjUuNC40LjUgUHJvbWlzZS5yZWplY3QocilcbiAgcmVqZWN0OiBmdW5jdGlvbiByZWplY3Qocil7XG4gICAgdmFyIGNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eSh0aGlzKVxuICAgICAgLCAkJHJlamVjdCAgID0gY2FwYWJpbGl0eS5yZWplY3Q7XG4gICAgJCRyZWplY3Qocik7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfVxufSk7XG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqIChMSUJSQVJZIHx8ICFVU0VfTkFUSVZFKSwgUFJPTUlTRSwge1xuICAvLyAyNS40LjQuNiBQcm9taXNlLnJlc29sdmUoeClcbiAgcmVzb2x2ZTogZnVuY3Rpb24gcmVzb2x2ZSh4KXtcbiAgICAvLyBpbnN0YW5jZW9mIGluc3RlYWQgb2YgaW50ZXJuYWwgc2xvdCBjaGVjayBiZWNhdXNlIHdlIHNob3VsZCBmaXggaXQgd2l0aG91dCByZXBsYWNlbWVudCBuYXRpdmUgUHJvbWlzZSBjb3JlXG4gICAgaWYoeCBpbnN0YW5jZW9mICRQcm9taXNlICYmIHNhbWVDb25zdHJ1Y3Rvcih4LmNvbnN0cnVjdG9yLCB0aGlzKSlyZXR1cm4geDtcbiAgICB2YXIgY2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KHRoaXMpXG4gICAgICAsICQkcmVzb2x2ZSAgPSBjYXBhYmlsaXR5LnJlc29sdmU7XG4gICAgJCRyZXNvbHZlKHgpO1xuICAgIHJldHVybiBjYXBhYmlsaXR5LnByb21pc2U7XG4gIH1cbn0pO1xuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhKFVTRV9OQVRJVkUgJiYgcmVxdWlyZSgnLi9faXRlci1kZXRlY3QnKShmdW5jdGlvbihpdGVyKXtcbiAgJFByb21pc2UuYWxsKGl0ZXIpWydjYXRjaCddKGVtcHR5KTtcbn0pKSwgUFJPTUlTRSwge1xuICAvLyAyNS40LjQuMSBQcm9taXNlLmFsbChpdGVyYWJsZSlcbiAgYWxsOiBmdW5jdGlvbiBhbGwoaXRlcmFibGUpe1xuICAgIHZhciBDICAgICAgICAgID0gdGhpc1xuICAgICAgLCBjYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkoQylcbiAgICAgICwgcmVzb2x2ZSAgICA9IGNhcGFiaWxpdHkucmVzb2x2ZVxuICAgICAgLCByZWplY3QgICAgID0gY2FwYWJpbGl0eS5yZWplY3Q7XG4gICAgdmFyIGFicnVwdCA9IHBlcmZvcm0oZnVuY3Rpb24oKXtcbiAgICAgIHZhciB2YWx1ZXMgICAgPSBbXVxuICAgICAgICAsIGluZGV4ICAgICA9IDBcbiAgICAgICAgLCByZW1haW5pbmcgPSAxO1xuICAgICAgZm9yT2YoaXRlcmFibGUsIGZhbHNlLCBmdW5jdGlvbihwcm9taXNlKXtcbiAgICAgICAgdmFyICRpbmRleCAgICAgICAgPSBpbmRleCsrXG4gICAgICAgICAgLCBhbHJlYWR5Q2FsbGVkID0gZmFsc2U7XG4gICAgICAgIHZhbHVlcy5wdXNoKHVuZGVmaW5lZCk7XG4gICAgICAgIHJlbWFpbmluZysrO1xuICAgICAgICBDLnJlc29sdmUocHJvbWlzZSkudGhlbihmdW5jdGlvbih2YWx1ZSl7XG4gICAgICAgICAgaWYoYWxyZWFkeUNhbGxlZClyZXR1cm47XG4gICAgICAgICAgYWxyZWFkeUNhbGxlZCAgPSB0cnVlO1xuICAgICAgICAgIHZhbHVlc1skaW5kZXhdID0gdmFsdWU7XG4gICAgICAgICAgLS1yZW1haW5pbmcgfHwgcmVzb2x2ZSh2YWx1ZXMpO1xuICAgICAgICB9LCByZWplY3QpO1xuICAgICAgfSk7XG4gICAgICAtLXJlbWFpbmluZyB8fCByZXNvbHZlKHZhbHVlcyk7XG4gICAgfSk7XG4gICAgaWYoYWJydXB0KXJlamVjdChhYnJ1cHQuZXJyb3IpO1xuICAgIHJldHVybiBjYXBhYmlsaXR5LnByb21pc2U7XG4gIH0sXG4gIC8vIDI1LjQuNC40IFByb21pc2UucmFjZShpdGVyYWJsZSlcbiAgcmFjZTogZnVuY3Rpb24gcmFjZShpdGVyYWJsZSl7XG4gICAgdmFyIEMgICAgICAgICAgPSB0aGlzXG4gICAgICAsIGNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eShDKVxuICAgICAgLCByZWplY3QgICAgID0gY2FwYWJpbGl0eS5yZWplY3Q7XG4gICAgdmFyIGFicnVwdCA9IHBlcmZvcm0oZnVuY3Rpb24oKXtcbiAgICAgIGZvck9mKGl0ZXJhYmxlLCBmYWxzZSwgZnVuY3Rpb24ocHJvbWlzZSl7XG4gICAgICAgIEMucmVzb2x2ZShwcm9taXNlKS50aGVuKGNhcGFiaWxpdHkucmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGlmKGFicnVwdClyZWplY3QoYWJydXB0LmVycm9yKTtcbiAgICByZXR1cm4gY2FwYWJpbGl0eS5wcm9taXNlO1xuICB9XG59KTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL2VzNi5wcm9taXNlLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwgQ29uc3RydWN0b3IsIG5hbWUsIGZvcmJpZGRlbkZpZWxkKXtcbiAgaWYoIShpdCBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSB8fCAoZm9yYmlkZGVuRmllbGQgIT09IHVuZGVmaW5lZCAmJiBmb3JiaWRkZW5GaWVsZCBpbiBpdCkpe1xuICAgIHRocm93IFR5cGVFcnJvcihuYW1lICsgJzogaW5jb3JyZWN0IGludm9jYXRpb24hJyk7XG4gIH0gcmV0dXJuIGl0O1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL19hbi1pbnN0YW5jZS5qc1xuICoqLyIsInZhciBjdHggICAgICAgICA9IHJlcXVpcmUoJy4vX2N0eCcpXG4gICwgY2FsbCAgICAgICAgPSByZXF1aXJlKCcuL19pdGVyLWNhbGwnKVxuICAsIGlzQXJyYXlJdGVyID0gcmVxdWlyZSgnLi9faXMtYXJyYXktaXRlcicpXG4gICwgYW5PYmplY3QgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIHRvTGVuZ3RoICAgID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJylcbiAgLCBnZXRJdGVyRm4gICA9IHJlcXVpcmUoJy4vY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0ZXJhYmxlLCBlbnRyaWVzLCBmbiwgdGhhdCwgSVRFUkFUT1Ipe1xuICB2YXIgaXRlckZuID0gSVRFUkFUT1IgPyBmdW5jdGlvbigpeyByZXR1cm4gaXRlcmFibGU7IH0gOiBnZXRJdGVyRm4oaXRlcmFibGUpXG4gICAgLCBmICAgICAgPSBjdHgoZm4sIHRoYXQsIGVudHJpZXMgPyAyIDogMSlcbiAgICAsIGluZGV4ICA9IDBcbiAgICAsIGxlbmd0aCwgc3RlcCwgaXRlcmF0b3I7XG4gIGlmKHR5cGVvZiBpdGVyRm4gIT0gJ2Z1bmN0aW9uJyl0aHJvdyBUeXBlRXJyb3IoaXRlcmFibGUgKyAnIGlzIG5vdCBpdGVyYWJsZSEnKTtcbiAgLy8gZmFzdCBjYXNlIGZvciBhcnJheXMgd2l0aCBkZWZhdWx0IGl0ZXJhdG9yXG4gIGlmKGlzQXJyYXlJdGVyKGl0ZXJGbikpZm9yKGxlbmd0aCA9IHRvTGVuZ3RoKGl0ZXJhYmxlLmxlbmd0aCk7IGxlbmd0aCA+IGluZGV4OyBpbmRleCsrKXtcbiAgICBlbnRyaWVzID8gZihhbk9iamVjdChzdGVwID0gaXRlcmFibGVbaW5kZXhdKVswXSwgc3RlcFsxXSkgOiBmKGl0ZXJhYmxlW2luZGV4XSk7XG4gIH0gZWxzZSBmb3IoaXRlcmF0b3IgPSBpdGVyRm4uY2FsbChpdGVyYWJsZSk7ICEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZTsgKXtcbiAgICBjYWxsKGl0ZXJhdG9yLCBmLCBzdGVwLnZhbHVlLCBlbnRyaWVzKTtcbiAgfVxufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL19mb3Itb2YuanNcbiAqKi8iLCIvLyBjYWxsIHNvbWV0aGluZyBvbiBpdGVyYXRvciBzdGVwIHdpdGggc2FmZSBjbG9zaW5nIG9uIGVycm9yXG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXRlcmF0b3IsIGZuLCB2YWx1ZSwgZW50cmllcyl7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGVudHJpZXMgPyBmbihhbk9iamVjdCh2YWx1ZSlbMF0sIHZhbHVlWzFdKSA6IGZuKHZhbHVlKTtcbiAgLy8gNy40LjYgSXRlcmF0b3JDbG9zZShpdGVyYXRvciwgY29tcGxldGlvbilcbiAgfSBjYXRjaChlKXtcbiAgICB2YXIgcmV0ID0gaXRlcmF0b3JbJ3JldHVybiddO1xuICAgIGlmKHJldCAhPT0gdW5kZWZpbmVkKWFuT2JqZWN0KHJldC5jYWxsKGl0ZXJhdG9yKSk7XG4gICAgdGhyb3cgZTtcbiAgfVxufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL19pdGVyLWNhbGwuanNcbiAqKi8iLCIvLyBjaGVjayBvbiBkZWZhdWx0IEFycmF5IGl0ZXJhdG9yXG52YXIgSXRlcmF0b3JzICA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpXG4gICwgSVRFUkFUT1IgICA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpXG4gICwgQXJyYXlQcm90byA9IEFycmF5LnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpdCAhPT0gdW5kZWZpbmVkICYmIChJdGVyYXRvcnMuQXJyYXkgPT09IGl0IHx8IEFycmF5UHJvdG9bSVRFUkFUT1JdID09PSBpdCk7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX2lzLWFycmF5LWl0ZXIuanNcbiAqKi8iLCJ2YXIgY2xhc3NvZiAgID0gcmVxdWlyZSgnLi9fY2xhc3NvZicpXG4gICwgSVRFUkFUT1IgID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fY29yZScpLmdldEl0ZXJhdG9yTWV0aG9kID0gZnVuY3Rpb24oaXQpe1xuICBpZihpdCAhPSB1bmRlZmluZWQpcmV0dXJuIGl0W0lURVJBVE9SXVxuICAgIHx8IGl0WydAQGl0ZXJhdG9yJ11cbiAgICB8fCBJdGVyYXRvcnNbY2xhc3NvZihpdCldO1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZC5qc1xuICoqLyIsIi8vIFdvcmtzIHdpdGggX19wcm90b19fIG9ubHkuIE9sZCB2OCBjYW4ndCB3b3JrIHdpdGggbnVsbCBwcm90byBvYmplY3RzLlxuLyogZXNsaW50LWRpc2FibGUgbm8tcHJvdG8gKi9cbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBjaGVjayA9IGZ1bmN0aW9uKE8sIHByb3RvKXtcbiAgYW5PYmplY3QoTyk7XG4gIGlmKCFpc09iamVjdChwcm90bykgJiYgcHJvdG8gIT09IG51bGwpdGhyb3cgVHlwZUVycm9yKHByb3RvICsgXCI6IGNhbid0IHNldCBhcyBwcm90b3R5cGUhXCIpO1xufTtcbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXQ6IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCAoJ19fcHJvdG9fXycgaW4ge30gPyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgZnVuY3Rpb24odGVzdCwgYnVnZ3ksIHNldCl7XG4gICAgICB0cnkge1xuICAgICAgICBzZXQgPSByZXF1aXJlKCcuL19jdHgnKShGdW5jdGlvbi5jYWxsLCByZXF1aXJlKCcuL19vYmplY3QtZ29wZCcpLmYoT2JqZWN0LnByb3RvdHlwZSwgJ19fcHJvdG9fXycpLnNldCwgMik7XG4gICAgICAgIHNldCh0ZXN0LCBbXSk7XG4gICAgICAgIGJ1Z2d5ID0gISh0ZXN0IGluc3RhbmNlb2YgQXJyYXkpO1xuICAgICAgfSBjYXRjaChlKXsgYnVnZ3kgPSB0cnVlOyB9XG4gICAgICByZXR1cm4gZnVuY3Rpb24gc2V0UHJvdG90eXBlT2YoTywgcHJvdG8pe1xuICAgICAgICBjaGVjayhPLCBwcm90byk7XG4gICAgICAgIGlmKGJ1Z2d5KU8uX19wcm90b19fID0gcHJvdG87XG4gICAgICAgIGVsc2Ugc2V0KE8sIHByb3RvKTtcbiAgICAgICAgcmV0dXJuIE87XG4gICAgICB9O1xuICAgIH0oe30sIGZhbHNlKSA6IHVuZGVmaW5lZCksXG4gIGNoZWNrOiBjaGVja1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL19zZXQtcHJvdG8uanNcbiAqKi8iLCJ2YXIgcElFICAgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtcGllJylcclxuICAsIGNyZWF0ZURlc2MgICAgID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpXHJcbiAgLCB0b0lPYmplY3QgICAgICA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxyXG4gICwgdG9QcmltaXRpdmUgICAgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKVxyXG4gICwgaGFzICAgICAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxyXG4gICwgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuL19pZTgtZG9tLWRlZmluZScpXHJcbiAgLCBnT1BEICAgICAgICAgICA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XHJcblxyXG5leHBvcnRzLmYgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gZ09QRCA6IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKXtcclxuICBPID0gdG9JT2JqZWN0KE8pO1xyXG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcclxuICBpZihJRThfRE9NX0RFRklORSl0cnkge1xyXG4gICAgcmV0dXJuIGdPUEQoTywgUCk7XHJcbiAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxyXG4gIGlmKGhhcyhPLCBQKSlyZXR1cm4gY3JlYXRlRGVzYyghcElFLmYuY2FsbChPLCBQKSwgT1tQXSk7XHJcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWdvcGQuanNcbiAqKi8iLCIvLyA3LjMuMjAgU3BlY2llc0NvbnN0cnVjdG9yKE8sIGRlZmF1bHRDb25zdHJ1Y3RvcilcbnZhciBhbk9iamVjdCAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKVxuICAsIFNQRUNJRVMgICA9IHJlcXVpcmUoJy4vX3drcycpKCdzcGVjaWVzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKE8sIEQpe1xuICB2YXIgQyA9IGFuT2JqZWN0KE8pLmNvbnN0cnVjdG9yLCBTO1xuICByZXR1cm4gQyA9PT0gdW5kZWZpbmVkIHx8IChTID0gYW5PYmplY3QoQylbU1BFQ0lFU10pID09IHVuZGVmaW5lZCA/IEQgOiBhRnVuY3Rpb24oUyk7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX3NwZWNpZXMtY29uc3RydWN0b3IuanNcbiAqKi8iLCJ2YXIgY3R4ICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fY3R4JylcbiAgLCBpbnZva2UgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19pbnZva2UnKVxuICAsIGh0bWwgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2h0bWwnKVxuICAsIGNlbCAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKVxuICAsIGdsb2JhbCAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgcHJvY2VzcyAgICAgICAgICAgID0gZ2xvYmFsLnByb2Nlc3NcbiAgLCBzZXRUYXNrICAgICAgICAgICAgPSBnbG9iYWwuc2V0SW1tZWRpYXRlXG4gICwgY2xlYXJUYXNrICAgICAgICAgID0gZ2xvYmFsLmNsZWFySW1tZWRpYXRlXG4gICwgTWVzc2FnZUNoYW5uZWwgICAgID0gZ2xvYmFsLk1lc3NhZ2VDaGFubmVsXG4gICwgY291bnRlciAgICAgICAgICAgID0gMFxuICAsIHF1ZXVlICAgICAgICAgICAgICA9IHt9XG4gICwgT05SRUFEWVNUQVRFQ0hBTkdFID0gJ29ucmVhZHlzdGF0ZWNoYW5nZSdcbiAgLCBkZWZlciwgY2hhbm5lbCwgcG9ydDtcbnZhciBydW4gPSBmdW5jdGlvbigpe1xuICB2YXIgaWQgPSArdGhpcztcbiAgaWYocXVldWUuaGFzT3duUHJvcGVydHkoaWQpKXtcbiAgICB2YXIgZm4gPSBxdWV1ZVtpZF07XG4gICAgZGVsZXRlIHF1ZXVlW2lkXTtcbiAgICBmbigpO1xuICB9XG59O1xudmFyIGxpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQpe1xuICBydW4uY2FsbChldmVudC5kYXRhKTtcbn07XG4vLyBOb2RlLmpzIDAuOSsgJiBJRTEwKyBoYXMgc2V0SW1tZWRpYXRlLCBvdGhlcndpc2U6XG5pZighc2V0VGFzayB8fCAhY2xlYXJUYXNrKXtcbiAgc2V0VGFzayA9IGZ1bmN0aW9uIHNldEltbWVkaWF0ZShmbil7XG4gICAgdmFyIGFyZ3MgPSBbXSwgaSA9IDE7XG4gICAgd2hpbGUoYXJndW1lbnRzLmxlbmd0aCA+IGkpYXJncy5wdXNoKGFyZ3VtZW50c1tpKytdKTtcbiAgICBxdWV1ZVsrK2NvdW50ZXJdID0gZnVuY3Rpb24oKXtcbiAgICAgIGludm9rZSh0eXBlb2YgZm4gPT0gJ2Z1bmN0aW9uJyA/IGZuIDogRnVuY3Rpb24oZm4pLCBhcmdzKTtcbiAgICB9O1xuICAgIGRlZmVyKGNvdW50ZXIpO1xuICAgIHJldHVybiBjb3VudGVyO1xuICB9O1xuICBjbGVhclRhc2sgPSBmdW5jdGlvbiBjbGVhckltbWVkaWF0ZShpZCl7XG4gICAgZGVsZXRlIHF1ZXVlW2lkXTtcbiAgfTtcbiAgLy8gTm9kZS5qcyAwLjgtXG4gIGlmKHJlcXVpcmUoJy4vX2NvZicpKHByb2Nlc3MpID09ICdwcm9jZXNzJyl7XG4gICAgZGVmZXIgPSBmdW5jdGlvbihpZCl7XG4gICAgICBwcm9jZXNzLm5leHRUaWNrKGN0eChydW4sIGlkLCAxKSk7XG4gICAgfTtcbiAgLy8gQnJvd3NlcnMgd2l0aCBNZXNzYWdlQ2hhbm5lbCwgaW5jbHVkZXMgV2ViV29ya2Vyc1xuICB9IGVsc2UgaWYoTWVzc2FnZUNoYW5uZWwpe1xuICAgIGNoYW5uZWwgPSBuZXcgTWVzc2FnZUNoYW5uZWw7XG4gICAgcG9ydCAgICA9IGNoYW5uZWwucG9ydDI7XG4gICAgY2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2UgPSBsaXN0ZW5lcjtcbiAgICBkZWZlciA9IGN0eChwb3J0LnBvc3RNZXNzYWdlLCBwb3J0LCAxKTtcbiAgLy8gQnJvd3NlcnMgd2l0aCBwb3N0TWVzc2FnZSwgc2tpcCBXZWJXb3JrZXJzXG4gIC8vIElFOCBoYXMgcG9zdE1lc3NhZ2UsIGJ1dCBpdCdzIHN5bmMgJiB0eXBlb2YgaXRzIHBvc3RNZXNzYWdlIGlzICdvYmplY3QnXG4gIH0gZWxzZSBpZihnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lciAmJiB0eXBlb2YgcG9zdE1lc3NhZ2UgPT0gJ2Z1bmN0aW9uJyAmJiAhZ2xvYmFsLmltcG9ydFNjcmlwdHMpe1xuICAgIGRlZmVyID0gZnVuY3Rpb24oaWQpe1xuICAgICAgZ2xvYmFsLnBvc3RNZXNzYWdlKGlkICsgJycsICcqJyk7XG4gICAgfTtcbiAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGxpc3RlbmVyLCBmYWxzZSk7XG4gIC8vIElFOC1cbiAgfSBlbHNlIGlmKE9OUkVBRFlTVEFURUNIQU5HRSBpbiBjZWwoJ3NjcmlwdCcpKXtcbiAgICBkZWZlciA9IGZ1bmN0aW9uKGlkKXtcbiAgICAgIGh0bWwuYXBwZW5kQ2hpbGQoY2VsKCdzY3JpcHQnKSlbT05SRUFEWVNUQVRFQ0hBTkdFXSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIGh0bWwucmVtb3ZlQ2hpbGQodGhpcyk7XG4gICAgICAgIHJ1bi5jYWxsKGlkKTtcbiAgICAgIH07XG4gICAgfTtcbiAgLy8gUmVzdCBvbGQgYnJvd3NlcnNcbiAgfSBlbHNlIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uKGlkKXtcbiAgICAgIHNldFRpbWVvdXQoY3R4KHJ1biwgaWQsIDEpLCAwKTtcbiAgICB9O1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2V0OiAgIHNldFRhc2ssXG4gIGNsZWFyOiBjbGVhclRhc2tcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fdGFzay5qc1xuICoqLyIsIi8vIGZhc3QgYXBwbHksIGh0dHA6Ly9qc3BlcmYubG5raXQuY29tL2Zhc3QtYXBwbHkvNVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihmbiwgYXJncywgdGhhdCl7XG4gIHZhciB1biA9IHRoYXQgPT09IHVuZGVmaW5lZDtcbiAgc3dpdGNoKGFyZ3MubGVuZ3RoKXtcbiAgICBjYXNlIDA6IHJldHVybiB1biA/IGZuKClcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCk7XG4gICAgY2FzZSAxOiByZXR1cm4gdW4gPyBmbihhcmdzWzBdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdKTtcbiAgICBjYXNlIDI6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0sIGFyZ3NbMV0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0sIGFyZ3NbMV0pO1xuICAgIGNhc2UgMzogcmV0dXJuIHVuID8gZm4oYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSk7XG4gICAgY2FzZSA0OiByZXR1cm4gdW4gPyBmbihhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdLCBhcmdzWzNdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdLCBhcmdzWzNdKTtcbiAgfSByZXR1cm4gICAgICAgICAgICAgIGZuLmFwcGx5KHRoYXQsIGFyZ3MpO1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL19pbnZva2UuanNcbiAqKi8iLCJ2YXIgZ2xvYmFsICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBtYWNyb3Rhc2sgPSByZXF1aXJlKCcuL190YXNrJykuc2V0XG4gICwgT2JzZXJ2ZXIgID0gZ2xvYmFsLk11dGF0aW9uT2JzZXJ2ZXIgfHwgZ2xvYmFsLldlYktpdE11dGF0aW9uT2JzZXJ2ZXJcbiAgLCBwcm9jZXNzICAgPSBnbG9iYWwucHJvY2Vzc1xuICAsIFByb21pc2UgICA9IGdsb2JhbC5Qcm9taXNlXG4gICwgaXNOb2RlICAgID0gcmVxdWlyZSgnLi9fY29mJykocHJvY2VzcykgPT0gJ3Byb2Nlc3MnXG4gICwgaGVhZCwgbGFzdCwgbm90aWZ5O1xuXG52YXIgZmx1c2ggPSBmdW5jdGlvbigpe1xuICB2YXIgcGFyZW50LCBmbjtcbiAgaWYoaXNOb2RlICYmIChwYXJlbnQgPSBwcm9jZXNzLmRvbWFpbikpcGFyZW50LmV4aXQoKTtcbiAgd2hpbGUoaGVhZCl7XG4gICAgZm4gPSBoZWFkLmZuO1xuICAgIGZuKCk7IC8vIDwtIGN1cnJlbnRseSB3ZSB1c2UgaXQgb25seSBmb3IgUHJvbWlzZSAtIHRyeSAvIGNhdGNoIG5vdCByZXF1aXJlZFxuICAgIGhlYWQgPSBoZWFkLm5leHQ7XG4gIH0gbGFzdCA9IHVuZGVmaW5lZDtcbiAgaWYocGFyZW50KXBhcmVudC5lbnRlcigpO1xufTtcblxuLy8gTm9kZS5qc1xuaWYoaXNOb2RlKXtcbiAgbm90aWZ5ID0gZnVuY3Rpb24oKXtcbiAgICBwcm9jZXNzLm5leHRUaWNrKGZsdXNoKTtcbiAgfTtcbi8vIGJyb3dzZXJzIHdpdGggTXV0YXRpb25PYnNlcnZlclxufSBlbHNlIGlmKE9ic2VydmVyKXtcbiAgdmFyIHRvZ2dsZSA9IHRydWVcbiAgICAsIG5vZGUgICA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKTtcbiAgbmV3IE9ic2VydmVyKGZsdXNoKS5vYnNlcnZlKG5vZGUsIHtjaGFyYWN0ZXJEYXRhOiB0cnVlfSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3XG4gIG5vdGlmeSA9IGZ1bmN0aW9uKCl7XG4gICAgbm9kZS5kYXRhID0gdG9nZ2xlID0gIXRvZ2dsZTtcbiAgfTtcbi8vIGVudmlyb25tZW50cyB3aXRoIG1heWJlIG5vbi1jb21wbGV0ZWx5IGNvcnJlY3QsIGJ1dCBleGlzdGVudCBQcm9taXNlXG59IGVsc2UgaWYoUHJvbWlzZSAmJiBQcm9taXNlLnJlc29sdmUpe1xuICBub3RpZnkgPSBmdW5jdGlvbigpe1xuICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oZmx1c2gpO1xuICB9O1xuLy8gZm9yIG90aGVyIGVudmlyb25tZW50cyAtIG1hY3JvdGFzayBiYXNlZCBvbjpcbi8vIC0gc2V0SW1tZWRpYXRlXG4vLyAtIE1lc3NhZ2VDaGFubmVsXG4vLyAtIHdpbmRvdy5wb3N0TWVzc2FnXG4vLyAtIG9ucmVhZHlzdGF0ZWNoYW5nZVxuLy8gLSBzZXRUaW1lb3V0XG59IGVsc2Uge1xuICBub3RpZnkgPSBmdW5jdGlvbigpe1xuICAgIC8vIHN0cmFuZ2UgSUUgKyB3ZWJwYWNrIGRldiBzZXJ2ZXIgYnVnIC0gdXNlIC5jYWxsKGdsb2JhbClcbiAgICBtYWNyb3Rhc2suY2FsbChnbG9iYWwsIGZsdXNoKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihmbil7XG4gIHZhciB0YXNrID0ge2ZuOiBmbiwgbmV4dDogdW5kZWZpbmVkfTtcbiAgaWYobGFzdClsYXN0Lm5leHQgPSB0YXNrO1xuICBpZighaGVhZCl7XG4gICAgaGVhZCA9IHRhc2s7XG4gICAgbm90aWZ5KCk7XG4gIH0gbGFzdCA9IHRhc2s7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX21pY3JvdGFzay5qc1xuICoqLyIsInZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHRhcmdldCwgc3JjLCBzYWZlKXtcbiAgZm9yKHZhciBrZXkgaW4gc3JjKXJlZGVmaW5lKHRhcmdldCwga2V5LCBzcmNba2V5XSwgc2FmZSk7XG4gIHJldHVybiB0YXJnZXQ7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX3JlZGVmaW5lLWFsbC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBnbG9iYWwgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgZFAgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKVxuICAsIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKVxuICAsIFNQRUNJRVMgICAgID0gcmVxdWlyZSgnLi9fd2tzJykoJ3NwZWNpZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihLRVkpe1xuICB2YXIgQyA9IGdsb2JhbFtLRVldO1xuICBpZihERVNDUklQVE9SUyAmJiBDICYmICFDW1NQRUNJRVNdKWRQLmYoQywgU1BFQ0lFUywge1xuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzOyB9XG4gIH0pO1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL19zZXQtc3BlY2llcy5qc1xuICoqLyIsInZhciBJVEVSQVRPUiAgICAgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKVxuICAsIFNBRkVfQ0xPU0lORyA9IGZhbHNlO1xuXG50cnkge1xuICB2YXIgcml0ZXIgPSBbN11bSVRFUkFUT1JdKCk7XG4gIHJpdGVyWydyZXR1cm4nXSA9IGZ1bmN0aW9uKCl7IFNBRkVfQ0xPU0lORyA9IHRydWU7IH07XG4gIEFycmF5LmZyb20ocml0ZXIsIGZ1bmN0aW9uKCl7IHRocm93IDI7IH0pO1xufSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGV4ZWMsIHNraXBDbG9zaW5nKXtcbiAgaWYoIXNraXBDbG9zaW5nICYmICFTQUZFX0NMT1NJTkcpcmV0dXJuIGZhbHNlO1xuICB2YXIgc2FmZSA9IGZhbHNlO1xuICB0cnkge1xuICAgIHZhciBhcnIgID0gWzddXG4gICAgICAsIGl0ZXIgPSBhcnJbSVRFUkFUT1JdKCk7XG4gICAgaXRlci5uZXh0ID0gZnVuY3Rpb24oKXsgc2FmZSA9IHRydWU7IH07XG4gICAgYXJyW0lURVJBVE9SXSA9IGZ1bmN0aW9uKCl7IHJldHVybiBpdGVyOyB9O1xuICAgIGV4ZWMoYXJyKTtcbiAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxuICByZXR1cm4gc2FmZTtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9faXRlci1kZXRlY3QuanNcbiAqKi8iLCJjb25zdCB7XG4gIHNldFRpbWVvdXQsIHNldFRpbWVvdXROYXRpdmVcbn0gPSBnbG9iYWxcblxuLy8gZml4IG5vIHNldFRpbWVvdXQgb24gQW5kcm9pZCBWOFxuaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAndW5kZWZpbmVkJyAmJlxuICB0eXBlb2Ygc2V0VGltZW91dE5hdGl2ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICBjb25zdCB0aW1lb3V0TWFwID0ge31cbiAgbGV0IHRpbWVvdXRJZCA9IDBcbiAgZ2xvYmFsLnNldFRpbWVvdXQgPSAoY2IsIHRpbWUpID0+IHtcbiAgICB0aW1lb3V0TWFwWysrdGltZW91dElkXSA9IGNiXG4gICAgc2V0VGltZW91dE5hdGl2ZSh0aW1lb3V0SWQudG9TdHJpbmcoKSwgdGltZSlcbiAgfVxuICBnbG9iYWwuc2V0VGltZW91dENhbGxiYWNrID0gKGlkKSA9PiB7XG4gICAgaWYgKHR5cGVvZiB0aW1lb3V0TWFwW2lkXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGltZW91dE1hcFtpZF0oKVxuICAgICAgZGVsZXRlIHRpbWVvdXRNYXBbaWRdXG4gICAgfVxuICB9XG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9wb2x5ZmlsbC9zZXRUaW1lb3V0LmpzXG4gKiovIiwiY29uc3Qge2NvbnNvbGV9ID0gZ2xvYmFsXG5cbmlmICh0eXBlb2YgY29uc29sZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgZ2xvYmFsLmNvbnNvbGUgPSB7XG4gICAgbG9nOiAoLi4uYXJncykgPT4ge1xuICAgICAgaWYgKHR5cGVvZiBuYXRpdmVMb2cgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgbmF0aXZlTG9nKC4uLmFyZ3MpXG4gICAgICB9XG4gICAgfSxcbiAgICBlcnJvcjogKC4uLmFyZ3MpID0+IHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihhcmdzKVxuICAgIH1cbiAgfVxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vcG9seWZpbGwvY29uc29sZWxvZy5qc1xuICoqLyIsIi8qKlxuICogQGZpbGVPdmVydmlldyBNYWluIGVudHJ5LCBpbnN0YW5jZSBtYW5hZ2VyXG4gKlxuICogLSBjcmVhdGVJbnN0YW5jZShpbnN0YW5jZUlkLCBjb2RlLCBvcHRpb25zLCBkYXRhKVxuICogLSByZWZyZXNoSW5zdGFuY2UoaW5zdGFuY2VJZCwgZGF0YSlcbiAqIC0gZGVzdHJveUluc3RhbmNlKGluc3RhbmNlSWQpXG4gKiAtIHJlZ2lzdGVyQ29tcG9uZW50cyhjb21wb25lbnRzKVxuICogLSByZWdpc3Rlck1vZHVsZXMobW9kdWxlcylcbiAqIC0gZ2V0Um9vdChpbnN0YW5jZUlkKVxuICogLSBpbnN0YW5jZU1hcFxuICogLSBjYWxsSlMoaW5zdGFuY2VJZCwgdGFza3MpXG4gKiAgIC0gZmlyZUV2ZW50KHJlZiwgdHlwZSwgZGF0YSlcbiAqICAgLSBjYWxsYmFjayhmdW5jSWQsIGRhdGEpXG4gKi9cblxuaW1wb3J0ICogYXMgcGVyZiBmcm9tICcuL3BlcmYnXG5pbXBvcnQgKiBhcyBjb25maWcgZnJvbSAnLi9jb25maWcnXG5pbXBvcnQgQXBwSW5zdGFuY2UgZnJvbSAnLi9hcHAnXG5pbXBvcnQgVm0gZnJvbSAnLi92bSdcblxudmFyIHtcbiAgbmF0aXZlQ29tcG9uZW50TWFwXG59ID0gY29uZmlnXG52YXIgaW5zdGFuY2VNYXAgPSB7fVxuXG4vKipcbiAqIGNyZWF0ZSBhIFdlZXggaW5zdGFuY2VcbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9IGluc3RhbmNlSWRcbiAqIEBwYXJhbSAge3N0cmluZ30gY29kZVxuICogQHBhcmFtICB7b2JqZWN0fSBbb3B0aW9uc10gb3B0aW9uIGBIQVNfTE9HYCBlbmFibGUgcHJpbnQgbG9nXG4gKiBAcGFyYW0gIHtvYmplY3R9IFtkYXRhXVxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2UoaW5zdGFuY2VJZCwgY29kZSwgb3B0aW9ucywgZGF0YSkge1xuICB2YXIgaW5zdGFuY2UgPSBpbnN0YW5jZU1hcFtpbnN0YW5jZUlkXVxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuXG4gIGNvbmZpZy5kZWJ1ZyA9IG9wdGlvbnMuZGVidWdcblxuICB2YXIgcmVzdWx0XG4gIGlmICghaW5zdGFuY2UpIHtcbiAgICBwZXJmLnN0YXJ0KCdjcmVhdGVJbnN0YW5jZScsIGluc3RhbmNlSWQpXG4gICAgaW5zdGFuY2UgPSBuZXcgQXBwSW5zdGFuY2UoaW5zdGFuY2VJZCwgb3B0aW9ucylcbiAgICBpbnN0YW5jZU1hcFtpbnN0YW5jZUlkXSA9IGluc3RhbmNlXG4gICAgcmVzdWx0ID0gaW5zdGFuY2UuaW5pdChjb2RlLCBkYXRhKVxuICAgIHBlcmYuZW5kKCdjcmVhdGVJbnN0YW5jZScsIGluc3RhbmNlSWQpXG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ID0gbmV3IEVycm9yKGBpbnZhbGlkIGluc3RhbmNlIGlkIFwiJHtpbnN0YW5jZUlkfVwiYClcbiAgfVxuXG4gIHJldHVybiByZXN1bHRcbn1cblxuLyoqXG4gKiByZWZyZXNoIGEgV2VleCBpbnN0YW5jZVxuICpcbiAqIEBwYXJhbSAge3N0cmluZ30gaW5zdGFuY2VJZFxuICogQHBhcmFtICB7b2JqZWN0fSBkYXRhXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZWZyZXNoSW5zdGFuY2UoaW5zdGFuY2VJZCwgZGF0YSkge1xuICB2YXIgaW5zdGFuY2UgPSBpbnN0YW5jZU1hcFtpbnN0YW5jZUlkXVxuICB2YXIgcmVzdWx0XG4gIGlmIChpbnN0YW5jZSkge1xuICAgIHBlcmYuc3RhcnQoJ3JlZnJlc2hEYXRhJywgaW5zdGFuY2VJZClcbiAgICByZXN1bHQgPSBpbnN0YW5jZS5yZWZyZXNoRGF0YShkYXRhKVxuICAgIHBlcmYuZW5kKCdyZWZyZXNoRGF0YScsIGluc3RhbmNlSWQpXG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ID0gbmV3IEVycm9yKGBpbnZhbGlkIGluc3RhbmNlIGlkIFwiJHtpbnN0YW5jZUlkfVwiYClcbiAgfVxuICByZXR1cm4gcmVzdWx0XG59XG5cbi8qKlxuICogZGVzdHJveSBhIFdlZXggaW5zdGFuY2VcbiAqIEBwYXJhbSAge3N0cmluZ30gaW5zdGFuY2VJZFxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVzdHJveUluc3RhbmNlKGluc3RhbmNlSWQpIHtcbiAgdmFyIGluc3RhbmNlID0gaW5zdGFuY2VNYXBbaW5zdGFuY2VJZF1cbiAgaWYgKCFpbnN0YW5jZSkge1xuICAgIHJldHVybiBuZXcgRXJyb3IoYGludmFsaWQgaW5zdGFuY2UgaWQgXCIke2luc3RhbmNlSWR9XCJgKVxuICB9XG5cbiAgcGVyZi5zdGFydCgnZGVzdHJveUluc3RhbmNlJywgaW5zdGFuY2VJZClcbiAgaW5zdGFuY2UuZGVzdHJveSgpXG4gIGRlbGV0ZSBpbnN0YW5jZU1hcFtpbnN0YW5jZUlkXVxuICBwZXJmLmVuZCgnZGVzdHJveUluc3RhbmNlJywgaW5zdGFuY2VJZClcblxuICByZXR1cm4gaW5zdGFuY2VNYXBcbn1cblxuLyoqXG4gKiByZWdpc3RlciB0aGUgbmFtZSBvZiBlYWNoIG5hdGl2ZSBjb21wb25lbnRcbiAqIEBwYXJhbSAge2FycmF5fSBjb21wb25lbnRzIGFycmF5IG9mIG5hbWVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyQ29tcG9uZW50cyhjb21wb25lbnRzKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGNvbXBvbmVudHMpKSB7XG4gICAgY29tcG9uZW50cy5mb3JFYWNoKGZ1bmN0aW9uIHJlZ2lzdGVyKG5hbWUpIHtcbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgaWYgKCFuYW1lKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBuYW1lID09PSAnc3RyaW5nJykge1xuICAgICAgICBuYXRpdmVDb21wb25lbnRNYXBbbmFtZV0gPSB0cnVlXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBuYW1lID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbmFtZS50eXBlID09PSAnc3RyaW5nJykge1xuICAgICAgICBuYXRpdmVDb21wb25lbnRNYXBbbmFtZS50eXBlXSA9IG5hbWVcbiAgICAgIH1cbiAgICB9KVxuICB9XG59XG5cbi8qKlxuICogcmVnaXN0ZXIgdGhlIG5hbWUgYW5kIG1ldGhvZHMgb2YgZWFjaCBtb2R1bGVcbiAqIEBwYXJhbSAge29iamVjdH0gbW9kdWxlcyBhIG9iamVjdCBvZiBtb2R1bGVzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3Rlck1vZHVsZXMobW9kdWxlcykge1xuICBpZiAodHlwZW9mIG1vZHVsZXMgPT09ICdvYmplY3QnKSB7XG4gICAgVm0ucmVnaXN0ZXJNb2R1bGVzKG1vZHVsZXMpXG4gIH1cbn1cblxuLyoqXG4gKiByZWdpc3RlciB0aGUgbmFtZSBhbmQgbWV0aG9kcyBvZiBlYWNoIGFwaVxuICogQHBhcmFtICB7b2JqZWN0fSBhcGlzIGEgb2JqZWN0IG9mIGFwaXNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyTWV0aG9kcyhhcGlzKSB7XG4gIGlmICh0eXBlb2YgYXBpcyA9PT0gJ29iamVjdCcpIHtcbiAgICBWbS5yZWdpc3Rlck1ldGhvZHMoYXBpcylcbiAgfVxufVxuXG4vKipcbiAqIGdldCBhIHdob2xlIGVsZW1lbnQgdHJlZSBvZiBhbiBpbnN0YW5jZVxuICogZm9yIGRlYnVnZ2luZ1xuICogQHBhcmFtICB7c3RyaW5nfSBpbnN0YW5jZUlkXG4gKiBAcmV0dXJuIHtvYmplY3R9IGEgdmlydHVhbCBkb20gdHJlZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Um9vdChpbnN0YW5jZUlkKSB7XG4gIHZhciBpbnN0YW5jZSA9IGluc3RhbmNlTWFwW2luc3RhbmNlSWRdXG4gIHZhciByZXN1bHRcbiAgaWYgKGluc3RhbmNlKSB7XG4gICAgcmVzdWx0ID0gaW5zdGFuY2UuZ2V0Um9vdEVsZW1lbnQoKVxuICB9IGVsc2Uge1xuICAgIHJlc3VsdCA9IG5ldyBFcnJvcihgaW52YWxpZCBpbnN0YW5jZSBpZCBcIiR7aW5zdGFuY2VJZH1cImApXG4gIH1cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG52YXIganNIYW5kbGVycyA9IHtcbiAgZmlyZUV2ZW50OiBmdW5jdGlvbiBmaXJlRXZlbnQoaW5zdGFuY2VJZCwgcmVmLCB0eXBlLCBkYXRhKSB7XG4gICAgdmFyIGluc3RhbmNlID0gaW5zdGFuY2VNYXBbaW5zdGFuY2VJZF1cbiAgICB2YXIgcmVzdWx0XG4gICAgcGVyZi5zdGFydCgnZmlyZUV2ZW50JywgaW5zdGFuY2VJZCArICctJyArIHJlZiArICctJyArIHR5cGUpXG4gICAgcmVzdWx0ID0gaW5zdGFuY2UuZmlyZUV2ZW50KHJlZiwgdHlwZSwgZGF0YSlcbiAgICBwZXJmLmVuZCgnZmlyZUV2ZW50JywgaW5zdGFuY2VJZCArICctJyArIHJlZiArICctJyArIHR5cGUpXG4gICAgcmV0dXJuIHJlc3VsdFxuICB9LFxuXG4gIGNhbGxiYWNrOiBmdW5jdGlvbiBjYWxsYmFjayhpbnN0YW5jZUlkLCBmdW5jSWQsIGRhdGEsIGlmTGFzdCkge1xuICAgIHZhciBpbnN0YW5jZSA9IGluc3RhbmNlTWFwW2luc3RhbmNlSWRdXG4gICAgdmFyIHJlc3VsdFxuICAgIHBlcmYuc3RhcnQoJ2NhbGxiYWNrJyxcbiAgICAgIGluc3RhbmNlSWQgKyAnLScgKyBmdW5jSWQgKyAnLScgKyBkYXRhICsgJy0nICsgaWZMYXN0KVxuICAgIHJlc3VsdCA9IGluc3RhbmNlLmNhbGxiYWNrKGZ1bmNJZCwgZGF0YSwgaWZMYXN0KVxuICAgIHBlcmYuZW5kKCdjYWxsYmFjaycsXG4gICAgICBpbnN0YW5jZUlkICsgJy0nICsgZnVuY0lkICsgJy0nICsgZGF0YSArICctJyArIGlmTGFzdClcbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cbn1cblxuLyoqXG4gKiBhY2NlcHQgY2FsbHMgZnJvbSBuYXRpdmUgKGV2ZW50IG9yIGNhbGxiYWNrKVxuICpcbiAqIEBwYXJhbSAge3N0cmluZ30gaW5zdGFuY2VJZFxuICogQHBhcmFtICB7YXJyYXl9IHRhc2tzIGxpc3Qgd2l0aCBgbWV0aG9kYCBhbmQgYGFyZ3NgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYWxsSlMoaW5zdGFuY2VJZCwgdGFza3MpIHtcbiAgY29uc3QgaW5zdGFuY2UgPSBpbnN0YW5jZU1hcFtpbnN0YW5jZUlkXVxuICBsZXQgcmVzdWx0cyA9IFtdXG4gIGlmIChpbnN0YW5jZSAmJiBBcnJheS5pc0FycmF5KHRhc2tzKSkge1xuICAgIHRhc2tzLmZvckVhY2goKHRhc2spID0+IHtcbiAgICAgIGNvbnN0IGhhbmRsZXIgPSBqc0hhbmRsZXJzW3Rhc2subWV0aG9kXVxuICAgICAgY29uc3QgYXJncyA9IFsuLi50YXNrLmFyZ3NdXG4gICAgICBpZiAodHlwZW9mIGhhbmRsZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgbG9nKCdqYXZhc2NyaXB0OicsIHRhc2subWV0aG9kLCB0YXNrLmFyZ3MpXG4gICAgICAgIGFyZ3MudW5zaGlmdChpbnN0YW5jZUlkKVxuICAgICAgICByZXN1bHRzLnB1c2goaGFuZGxlciguLi5hcmdzKSlcbiAgICAgIH1cbiAgICB9KVxuICB9IGVsc2Uge1xuICAgIHJlc3VsdHMucHVzaChuZXcgRXJyb3IoYGludmFsaWQgaW5zdGFuY2UgaWQgXCIke2luc3RhbmNlSWR9XCIgb3IgdGFza3NgKSlcbiAgfVxuXG4gIHJldHVybiByZXN1bHRzXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2xpYi9mcmFtZXdvcmsuanNcbiAqKi8iLCJpbXBvcnQgbG9nIGZyb20gJy4vbG9nJ1xuXG52YXIgZGF0YSA9IHt0eXBlOiAncm9vdCcsIGNoaWxkcmVuOiBbXX1cbnZhciBjdXJyZW50ID0gZGF0YVxudmFyIHN0YWNrID0gW2N1cnJlbnRdXG5cbmZ1bmN0aW9uIHNwYWNlcyhudW0pIHtcbiAgcmV0dXJuIEFycmF5KG51bSkuam9pbignICcpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdGFydCh0eXBlLCBpZCkge1xuICB2YXIgdGFzayA9IHt0eXBlOiB0eXBlLCBpZDogaWQsIGNoaWxkcmVuOiBbXSwgc3RhcnQ6IERhdGUubm93KCl9XG4gIGN1cnJlbnQuY2hpbGRyZW4ucHVzaCh0YXNrKVxuICBzdGFjay5wdXNoKHRhc2spXG4gIGN1cnJlbnQgPSB0YXNrXG4gIGxvZygncGVyZjonICsgc3BhY2VzKHN0YWNrLmxlbmd0aCAtIDEpLCAnc3RhcnQnLCB0YXNrLnR5cGUsIHRhc2suaWQpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbmQodHlwZSwgaWQpIHtcbiAgdmFyIHRhc2sgPSBzdGFjay5wb3AoKVxuICB0YXNrLmVuZCA9IERhdGUubm93KClcbiAgY3VycmVudCA9IHN0YWNrW3N0YWNrLmxlbmd0aCAtIDFdXG4gIGxvZygncGVyZjonICsgc3BhY2VzKHN0YWNrLmxlbmd0aCksICdlbmQnLFxuICAgICh0YXNrLmVuZCAtIHRhc2suc3RhcnQpICsgJ21zJywgdGFzay50eXBlLCB0YXNrLmlkKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVzZXQoKSB7XG4gIGRhdGEuY2hpbGRyZW4gPSBbXVxuICBjdXJyZW50ID0gZGF0YVxuICBzdGFjay5sZW5ndGggPSAwXG4gIHN0YWNrLnB1c2goY3VycmVudClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvSlNPTigpIHtcbiAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZGF0YSkpXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2xpYi9wZXJmLmpzXG4gKiovIiwiaW1wb3J0ICogYXMgY29uZmlnIGZyb20gJy4vY29uZmlnJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsb2coLi4uYXJncykge1xuICBpZiAoY29uZmlnLmRlYnVnKSB7XG4gICAgZ2xvYmFsLmNvbnNvbGUubG9nKC4uLmFyZ3MpXG4gIH1cbn1cblxuZ2xvYmFsLmxvZyA9IGxvZ1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vbGliL2xvZy5qc1xuICoqLyIsImV4cG9ydCBjb25zdCBuYXRpdmVDb21wb25lbnRNYXAgPSB7XG4gIHRleHQ6IHRydWUsXG4gIGltYWdlOiB0cnVlLFxuICBjb250YWluZXI6IHRydWUsXG4gIHNsaWRlcjoge1xuICAgIHR5cGU6ICdzbGlkZXInLFxuICAgIGFwcGVuZDogJ3RyZWUnXG4gIH0sXG4gIGNlbGw6IHtcbiAgICB0eXBlOiAnY2VsbCcsXG4gICAgYXBwZW5kOiAndHJlZSdcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgY3VzdG9tQ29tcG9uZW50TWFwID0ge31cblxuZXhwb3J0IHZhciBkZWJ1ZyA9IGZhbHNlXG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vbGliL2NvbmZpZy5qc1xuICoqLyIsIi8qKlxuICogQGZpbGVPdmVydmlld1xuICogV2VleCBpbnN0YW5jZSBjb25zdHJ1Y3RvciAmIGRlZmluaXRpb25cbiAqL1xuXG5pbXBvcnQge3R5cG9mLCBleHRlbmR9IGZyb20gJy4uL3V0aWwnXG5pbXBvcnQgKiBhcyBwZXJmIGZyb20gJy4uL3BlcmYnXG5pbXBvcnQgKiBhcyBidW5kbGUgZnJvbSAnLi9idW5kbGUnXG5pbXBvcnQgKiBhcyBjdHJsIGZyb20gJy4vY3RybCdcbmltcG9ydCBEaWZmZXIgZnJvbSAnLi9kaWZmZXInXG5cbmltcG9ydCBFdmVudE1hbmFnZXIgZnJvbSAnLi9ldmVudCdcbmltcG9ydCBMaXN0ZW5lciBmcm9tICcuL2RvbS1saXN0ZW5lcidcbmltcG9ydCB7RG9jdW1lbnQsIE5vZGV9IGZyb20gJy4vZG9tJ1xuaW1wb3J0IHtyZWdpc3RlckNvbXBvbmVudCwgcmVxdWlyZUNvbXBvbmVudCwgcmVxdWlyZU1vZHVsZX0gZnJvbSAnLi9yZWdpc3RlcidcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQXBwSW5zdGFuY2UoaW5zdGFuY2VJZCwgb3B0aW9ucykge1xuICBwZXJmLnN0YXJ0KCdpbml0SW5zdGFuY2UnLCBpbnN0YW5jZUlkKVxuICB0aGlzLmlkID0gaW5zdGFuY2VJZFxuICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG4gIHRoaXMudm0gPSBudWxsXG4gIHRoaXMuZG9jID0gbmV3IERvY3VtZW50KGluc3RhbmNlSWQpXG4gIHRoaXMuY3VzdG9tQ29tcG9uZW50TWFwID0ge31cbiAgdGhpcy5jYWxsYmFja3MgPSB7fVxuICB0aGlzLmRpZmZlciA9IG5ldyBEaWZmZXIoaW5zdGFuY2VJZClcbiAgdGhpcy51aWQgPSAwXG4gIHRoaXMucmVuZGVyZWQgPSBmYWxzZVxuICB0aGlzLmV2ZW50TWFuYWdlciA9IG5ldyBFdmVudE1hbmFnZXIoKVxuICB0aGlzLmxpc3RlbmVyID0gbmV3IExpc3RlbmVyKHRoaXMuaWQsICh0YXNrcykgPT4ge1xuICAgIHRoaXMuY2FsbFRhc2tzKHRhc2tzKVxuICB9KVxuICB0aGlzLmRvYy5zZXRFdmVudE1hbmFnZXIodGhpcy5ldmVudE1hbmFnZXIpXG4gIHRoaXMuZG9jLnNldExpc3RlbmVyKHRoaXMubGlzdGVuZXIpXG5cbiAgcGVyZi5lbmQoJ2luaXRJbnN0YW5jZScsIGluc3RhbmNlSWQpXG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZShhcHAsIHYpIHtcbiAgdmFyIHR5cGUgPSB0eXBvZih2KVxuXG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgJ3VuZGVmaW5lZCc6XG4gICAgY2FzZSAnbnVsbCc6XG4gICAgICByZXR1cm4gJydcbiAgICBjYXNlICdyZWdleHAnOlxuICAgICAgcmV0dXJuIHYudG9TdHJpbmcoKVxuICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgcmV0dXJuIHYudG9JU09TdHJpbmcoKVxuICAgIGNhc2UgJ251bWJlcic6XG4gICAgY2FzZSAnc3RyaW5nJzpcbiAgICBjYXNlICdib29sZWFuJzpcbiAgICBjYXNlICdhcnJheSc6XG4gICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgIGlmICh2IGluc3RhbmNlb2YgTm9kZSkge1xuICAgICAgICByZXR1cm4gdi5yZWZcbiAgICAgIH1cbiAgICAgIHJldHVybiB2XG4gICAgY2FzZSAnZnVuY3Rpb24nOlxuICAgICAgYXBwLmNhbGxiYWNrc1srK2FwcC51aWRdID0gdlxuICAgICAgcmV0dXJuIGFwcC51aWQudG9TdHJpbmcoKVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodilcbiAgfVxufVxuXG5BcHBJbnN0YW5jZS5wcm90b3R5cGUuY2FsbFRhc2tzID0gZnVuY3Rpb24gKHRhc2tzKSB7XG4gIGlmICh0eXBvZih0YXNrcykgIT09ICdhcnJheScpIHtcbiAgICB0YXNrcyA9IFt0YXNrc11cbiAgfVxuXG4gIHRhc2tzLmZvckVhY2goKHRhc2spID0+IHtcbiAgICB0YXNrLmFyZ3MgPSB0YXNrLmFyZ3MubWFwKGFyZyA9PiBub3JtYWxpemUodGhpcywgYXJnKSlcbiAgfSlcblxuICBjYWxsTmF0aXZlKHRoaXMuaWQsIHRhc2tzLCAnLTEnKVxufVxuXG5leHRlbmQoQXBwSW5zdGFuY2UucHJvdG90eXBlLCBidW5kbGUsIGN0cmwsIHtcbiAgcmVnaXN0ZXJDb21wb25lbnQsXG4gIHJlcXVpcmVDb21wb25lbnQsXG4gIHJlcXVpcmVNb2R1bGVcbn0pXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2xpYi9hcHAvaW5kZXguanNcbiAqKi8iLCIvLy8gbGFuZy5qc1xuaW1wb3J0IENvbmZpZyBmcm9tICcuLi9jb25maWcnXG5cbi8qKlxuICogQ2hlY2sgaXMgYSBzdHJpbmcgc3RhcnRzIHdpdGggJCBvciBfXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xuXG5leHBvcnQgdmFyIGlzUmVzZXJ2ZWQgPSAoc3RyKSA9PiB7XG4gIGxldCBjID0gKHN0ciArICcnKS5jaGFyQ29kZUF0KDApXG4gIHJldHVybiBjID09PSAweDI0IHx8IGMgPT09IDB4NUZcbn1cblxuLyoqXG4gKiBDYW1lbGl6ZSBhIGh5cGhlbi1kZWxtaXRlZCBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5cbmxldCBjYW1lbFJFID0gLy0oXFx3KS9nXG5mdW5jdGlvbiB0b1VwcGVyIChfLCBjKSB7XG4gIHJldHVybiBjID8gYy50b1VwcGVyQ2FzZSAoKSA6ICcnXG59XG5leHBvcnQgdmFyIGNhbWVsaXplID0gKHN0cikgPT4ge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoY2FtZWxSRSwgdG9VcHBlcilcbn1cblxuLyoqXG4gKiBTaW1wbGUgYmluZCwgZmFzdGVyIHRoYW4gbmF0aXZlXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjdHhcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICovXG5cbmV4cG9ydCB2YXIgYmluZCA9IGZ1bmN0aW9uIChmbiwgY3R4KSB7XG4gIHJldHVybiBmdW5jdGlvbiAoYSkge1xuICAgIGxldCBsID0gYXJndW1lbnRzLmxlbmd0aFxuICAgIHJldHVybiBsXG4gICAgICA/IGwgPiAxXG4gICAgICAgID8gZm4uYXBwbHkoY3R4LCBhcmd1bWVudHMpXG4gICAgICAgIDogZm4uY2FsbChjdHgsIGEpXG4gICAgICA6IGZuLmNhbGwoY3R4KVxuICB9XG59XG5cbi8qKlxuICogQ29udmVydCBhbiBBcnJheS1saWtlIG9iamVjdCB0byBhIHJlYWwgQXJyYXkuXG4gKlxuICogQHBhcmFtIHtBcnJheS1saWtlfSBsaXN0XG4gKiBAcGFyYW0ge051bWJlcn0gW3N0YXJ0XSAtIHN0YXJ0IGluZGV4XG4gKiBAcmV0dXJuIHtBcnJheX1cbiAqL1xuXG5leHBvcnQgdmFyIHRvQXJyYXkgPSAobGlzdCwgc3RhcnQpID0+IHtcbiAgc3RhcnQgPSBzdGFydCB8fCAwXG4gIGxldCBpID0gbGlzdC5sZW5ndGggLSBzdGFydFxuICBsZXQgcmV0ID0gbmV3IEFycmF5KGkpXG4gIHdoaWxlIChpLS0pIHtcbiAgICByZXRbaV0gPSBsaXN0W2kgKyBzdGFydF1cbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbi8qKlxuICogTWl4IHByb3BlcnRpZXMgaW50byB0YXJnZXQgb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB0b1xuICogQHBhcmFtIHtPYmplY3R9IGZyb21cbiAqL1xuXG5leHBvcnQgdmFyIGV4dGVuZCA9ICh0YXJnZXQsIC4uLnNyYykgPT4ge1xuICBpZiAodHlwZW9mIE9iamVjdC5hc3NpZ24gPT09ICdmdW5jdGlvbicpIHtcbiAgICBPYmplY3QuYXNzaWduKHRhcmdldCwgLi4uc3JjKVxuICB9IGVsc2Uge1xuICAgIGNvbnN0IGZpcnN0ID0gc3JjLnNoaWZ0KClcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBmaXJzdCkge1xuICAgICAgdGFyZ2V0W2tleV0gPSBmaXJzdFtrZXldXG4gICAgfVxuICAgIGlmIChzcmMubGVuZ3RoKSB7XG4gICAgICBleHRlbmQodGFyZ2V0LCAuLi5zcmMpXG4gICAgfVxuICB9XG4gIHJldHVybiB0YXJnZXRcbn1cblxuLyoqXG4gKiBRdWljayBvYmplY3QgY2hlY2sgLSB0aGlzIGlzIHByaW1hcmlseSB1c2VkIHRvIHRlbGxcbiAqIE9iamVjdHMgZnJvbSBwcmltaXRpdmUgdmFsdWVzIHdoZW4gd2Uga25vdyB0aGUgdmFsdWVcbiAqIGlzIGEgSlNPTi1jb21wbGlhbnQgdHlwZS5cbiAqXG4gKiBAcGFyYW0geyp9IG9ialxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xuXG5leHBvcnQgdmFyIGlzT2JqZWN0ID0gKG9iaikgPT4ge1xuICByZXR1cm4gISEob2JqICYmIHR5cGVvZiBvYmogPT09ICdvYmplY3QnKVxufVxuXG4vKipcbiAqIFN0cmljdCBvYmplY3QgdHlwZSBjaGVjay4gT25seSByZXR1cm5zIHRydWVcbiAqIGZvciBwbGFpbiBKYXZhU2NyaXB0IG9iamVjdHMuXG4gKlxuICogQHBhcmFtIHsqfSBvYmpcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cblxubGV0IHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ1xuZXhwb3J0IHZhciBpc1BsYWluT2JqZWN0ID0gKG9iaikgPT4ge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBPYmplY3RdJ1xufVxuXG4vKipcbiAqIEFycmF5IHR5cGUgY2hlY2suXG4gKlxuICogQHBhcmFtIHsqfSBvYmpcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cblxuZXhwb3J0IHZhciBpc0FycmF5ID0gKG9iaikgPT4ge1xuICByZXR1cm4gQXJyYXkuaXNBcnJheShvYmopXG59XG5cbmV4cG9ydCB2YXIgc3RyaW5naWZ5ID0gKHgpID0+IHtcbiAgcmV0dXJuIHR5cGVvZiB4ID09PSAndW5kZWZpbmVkJyB8fCB4ID09PSBudWxsIHx8IHR5cGVvZih4KSA9PT0gJ2Z1bmN0aW9uJ1xuICAgID8gJydcbiAgICA6IHR5cGVvZiB4ID09PSAnb2JqZWN0J1xuICAgICAgPyB4IGluc3RhbmNlb2YgUmVnRXhwXG4gICAgICAgID8geC50b1N0cmluZygpXG4gICAgICAgIDogeCBpbnN0YW5jZW9mIERhdGVcbiAgICAgICAgICA/IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoeCkpXG4gICAgICAgICAgOiBKU09OLnN0cmluZ2lmeSh4KVxuICAgICAgOiB4LnRvU3RyaW5nKClcbn1cblxuZXhwb3J0IHZhciB0eXBvZiA9ICh2KSA9PiB7XG4gIGxldCBzID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHYpXG4gIHJldHVybiBzLnN1YnN0cmluZyg4LCBzLmxlbmd0aCAtIDEpLnRvTG93ZXJDYXNlKClcbn1cblxuZXhwb3J0IHZhciBub3JtYWxpemUgPSAodikgPT4ge1xuICBsZXQgdHlwZSA9IHR5cG9mKHYpXG5cbiAgc3dpdGNoKHR5cGUpIHtcbiAgICBjYXNlICd1bmRlZmluZWQnOlxuICAgIGNhc2UgJ251bGwnOlxuICAgICAgcmV0dXJuICcnXG4gICAgY2FzZSAncmVnZXhwJzpcbiAgICAgIHJldHVybiB2LnRvU3RyaW5nKClcbiAgICBjYXNlICdkYXRlJzpcbiAgICAgIHJldHVybiB2LnRvSVNPU3RyaW5nKClcbiAgICBjYXNlICdudW1iZXInOlxuICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgY2FzZSAnYm9vbGVhbic6XG4gICAgY2FzZSAnYXJyYXknOlxuICAgIGNhc2UgJ29iamVjdCc6XG4gICAgY2FzZSAnZnVuY3Rpb24nOlxuICAgICAgcmV0dXJuIHZcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHYpXG4gIH1cbn1cblxuLyoqXG4gKiBEZWZpbmUgYSBub24tZW51bWVyYWJsZSBwcm9wZXJ0eVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAqIEBwYXJhbSB7Kn0gdmFsXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtlbnVtZXJhYmxlXVxuICovXG5cbmV4cG9ydCB2YXIgZGVmaW5lID0gKG9iaiwga2V5LCB2YWwsIGVudW1lcmFibGUpID0+IHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgdmFsdWU6IHZhbCxcbiAgICBlbnVtZXJhYmxlOiAhIWVudW1lcmFibGUsXG4gICAgd3JpdGFibGU6IHRydWUsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlXG4gIH0pXG59XG5cbi8qKlxuICogTWFudWFsIGluZGV4T2YgYmVjYXVzZSBpdCdzIHNsaWdodGx5IGZhc3RlciB0aGFuXG4gKiBuYXRpdmUuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gYXJyXG4gKiBAcGFyYW0geyp9IG9ialxuICovXG5cbmV4cG9ydCB2YXIgaW5kZXhPZiA9IChhcnIsIG9iaikgPT4ge1xuICBmb3IgKGxldCBpID0gMCwgbCA9IGFyci5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBpZiAoYXJyW2ldID09PSBvYmopIHJldHVybiBpXG4gIH1cbiAgcmV0dXJuIC0xXG59XG5cblxuLy8vIGRlYnVnLmpzXG5cblxuY29uc3QgaGFzQ29uc29sZSA9IHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJ1xuXG4vKipcbiAqIExvZyBhIG1lc3NhZ2UuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG1zZ1xuICovXG5cbmV4cG9ydCB2YXIgbG9nID0gKG1zZykgPT4ge1xuICBjb25zdCBfY29uZmlnID0gQ29uZmlnIHx8IHt9XG4gIGlmIChoYXNDb25zb2xlICYmIF9jb25maWcuZGVidWcpIHtcbiAgICBjb25zb2xlLmxvZy5jYWxsKHRoaXMsICdbaW5mb106ICcsIG1zZylcbiAgfVxufVxuXG4vKipcbiAqIFdlJ3ZlIGdvdCBhIHByb2JsZW0gaGVyZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbXNnXG4gKi9cblxuZXhwb3J0IHZhciB3YXJuID0gKG1zZykgPT4ge1xuICAvLyBpZiAoaGFzQ29uc29sZSAmJiAoIWNvbmZpZy5zaWxlbnQgfHwgY29uZmlnLmRlYnVnKSkge1xuICBpZiAoaGFzQ29uc29sZSkge1xuICAgIGNvbnNvbGUud2Fybi5jYWxsKHRoaXMsICdbd2Fybl06ICcsIG1zZylcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAvLyBpZiAoY29uZmlnLmRlYnVnKSB7XG4gICAgLy8gICAvKiBqc2hpbnQgZGVidWc6IHRydWUgKi9cbiAgICAvLyAgIGRlYnVnZ2VyXG4gICAgLy8gfVxuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2xpYi91dGlsL2luZGV4LmpzXG4gKiovIiwiLyoqXG4gKiBAZmlsZU92ZXJ2aWV3XG4gKiBhcGkgdGhhdCBpbnZva2VkIGJ5IGpzIGJ1bmRsZSBjb2RlXG4gKlxuICogLSBkZWZpbmUobmFtZSwgZmFjdG9yeSk6IGRlZmluZSBhIG5ldyBjb21wb3NlZCBjb21wb25lbnQgdHlwZVxuICogLSBib290c3RyYXAodHlwZSwgY29uZmlnLCBkYXRhKTogcmVxdWlyZSBhIGNlcnRhaW4gdHlwZSAmXG4gKiAgICAgICAgIHJlbmRlciB3aXRoIChvcHRpb25hbCkgZGF0YVxuICpcbiAqIGRlcHJlY2F0ZWQ6XG4gKiAtIHJlZ2lzdGVyKHR5cGUsIG9wdGlvbnMpOiByZWdpc3RlciBhIG5ldyBjb21wb3NlZCBjb21wb25lbnQgdHlwZVxuICogLSByZW5kZXIodHlwZSwgZGF0YSk6IHJlbmRlciBieSBhIGNlcnRhaW4gdHlwZSB3aXRoIChvcHRpb25hbCkgZGF0YVxuICogLSByZXF1aXJlKHR5cGUpKGRhdGEpOiByZXF1aXJlIGEgdHlwZSB0aGVuIHJlbmRlciB3aXRoIGRhdGFcbiAqL1xuXG5pbXBvcnQgc2VtdmVyIGZyb20gJ3NlbXZlcidcbmltcG9ydCAqIGFzIF8gZnJvbSAnLi4vdXRpbCdcbmltcG9ydCAqIGFzIGNvbmZpZyBmcm9tICcuLi9jb25maWcnXG5pbXBvcnQgKiBhcyBwZXJmIGZyb20gJy4uL3BlcmYnXG5pbXBvcnQgVm0gZnJvbSAnLi4vdm0nXG5pbXBvcnQgKiBhcyBkb3duZ3JhZGUgZnJvbSAnLi9kb3duZ3JhZGUnXG5cbmNvbnN0IFdFRVhfQ09NUE9ORU5UX1JFRyA9IC9eXFxAd2VleC1jb21wb25lbnRcXC8vXG5jb25zdCBXRUVYX01PRFVMRV9SRUcgPSAvXlxcQHdlZXgtbW9kdWxlXFwvL1xuY29uc3QgTk9STUFMX01PRFVMRV9SRUcgPSAvXlxcLnsxLDJ9XFwvL1xuY29uc3QgSlNfU1VSRklYX1JFRyA9IC9cXC5qcyQvXG5cbmNvbnN0IGlzV2VleENvbXBvbmVudCA9IG5hbWUgPT4gISFuYW1lLm1hdGNoKFdFRVhfQ09NUE9ORU5UX1JFRylcbmNvbnN0IGlzV2VleE1vZHVsZSA9IG5hbWUgPT4gISFuYW1lLm1hdGNoKFdFRVhfTU9EVUxFX1JFRylcbmNvbnN0IGlzTm9ybWFsTW9kdWxlID0gbmFtZSA9PiAhIW5hbWUubWF0Y2goTk9STUFMX01PRFVMRV9SRUcpXG5jb25zdCBpc05wbU1vZHVsZSA9IG5hbWUgPT4gIWlzV2VleENvbXBvbmVudChuYW1lKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIWlzV2VleE1vZHVsZShuYW1lKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIWlzTm9ybWFsTW9kdWxlKG5hbWUpXG5cbmZ1bmN0aW9uIHJlbW92ZVdlZXhQcmVmaXgoc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZShXRUVYX0NPTVBPTkVOVF9SRUcsICcnKVxuICAgICAgICAgIC5yZXBsYWNlKFdFRVhfTU9EVUxFX1JFRywgJycpXG59XG5cbmZ1bmN0aW9uIHJlbW92ZUpTU3VyZml4KHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoSlNfU1VSRklYX1JFRywgJycpXG59XG5cbmxldCBjb21tb25Nb2R1bGVzID0ge31cblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyQ29tbW9uTW9kdWxlcygpIHtcbiAgY29tbW9uTW9kdWxlcyA9IHt9XG59XG5cbi8vIGRlZmluZShuYW1lLCBmYWN0b3J5KSBmb3IgcHJpbWFyeSB1c2FnZVxuLy8gb3Jcbi8vIGRlZmluZShuYW1lLCBkZXBzLCBmYWN0b3J5KSBmb3IgY29tcGF0aWJpbGl0eVxuLy8gTm90aWNlOiBETyBOT1QgdXNlIGZ1bmN0aW9uIGRlZmluZSgpIHt9LFxuLy8gaXQgd2lsbCBjYXVzZSBlcnJvciBhZnRlciBidWlsZGVkIGJ5IHdlYnBhY2tcbmV4cG9ydCB2YXIgZGVmaW5lID0gZnVuY3Rpb24gKG5hbWUsIGRlcHMsIGZhY3RvcnkpIHtcbiAgcGVyZi5zdGFydCgnZGVmaW5lJywgbmFtZSlcblxuICBpZiAoXy50eXBvZihkZXBzKSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGZhY3RvcnkgPSBkZXBzXG4gICAgZGVwcyA9IFtdXG4gIH1cblxuICBsZXQgX3JlcXVpcmUgPSAobmFtZSkgPT4ge1xuICAgIGxldCBjbGVhbk5hbWVcblxuICAgIGlmIChpc1dlZXhDb21wb25lbnQobmFtZSkpIHtcbiAgICAgIGNsZWFuTmFtZSA9IHJlbW92ZVdlZXhQcmVmaXgobmFtZSlcbiAgICAgIHJldHVybiB0aGlzLnJlcXVpcmVDb21wb25lbnQoY2xlYW5OYW1lKVxuICAgIH1cbiAgICBpZiAoaXNXZWV4TW9kdWxlKG5hbWUpKSB7XG4gICAgICBjbGVhbk5hbWUgPSByZW1vdmVXZWV4UHJlZml4KG5hbWUpXG4gICAgICByZXR1cm4gdGhpcy5yZXF1aXJlTW9kdWxlKGNsZWFuTmFtZSlcbiAgICB9XG4gICAgaWYgKGlzTm9ybWFsTW9kdWxlKG5hbWUpKSB7XG4gICAgICBjbGVhbk5hbWUgPSByZW1vdmVKU1N1cmZpeChuYW1lKVxuICAgICAgcmV0dXJuIGNvbW1vbk1vZHVsZXNbbmFtZV1cbiAgICB9XG4gICAgaWYgKGlzTnBtTW9kdWxlKG5hbWUpKSB7XG4gICAgICBjbGVhbk5hbWUgPSByZW1vdmVKU1N1cmZpeChuYW1lKVxuICAgICAgcmV0dXJuIGNvbW1vbk1vZHVsZXNbbmFtZV1cbiAgICB9XG4gIH1cbiAgbGV0IF9tb2R1bGUgPSB7ZXhwb3J0czoge319XG5cbiAgbGV0IGNsZWFuTmFtZVxuICBpZiAoaXNXZWV4Q29tcG9uZW50KG5hbWUpKSB7XG4gICAgY2xlYW5OYW1lID0gcmVtb3ZlV2VleFByZWZpeChuYW1lKVxuXG4gICAgZmFjdG9yeShfcmVxdWlyZSwgX21vZHVsZS5leHBvcnRzLCBfbW9kdWxlKVxuXG4gICAgdGhpcy5yZWdpc3RlckNvbXBvbmVudChjbGVhbk5hbWUsIF9tb2R1bGUuZXhwb3J0cylcbiAgfSBlbHNlIGlmIChpc1dlZXhNb2R1bGUobmFtZSkpIHtcbiAgICBjbGVhbk5hbWUgPSByZW1vdmVXZWV4UHJlZml4KG5hbWUpXG5cbiAgICBmYWN0b3J5KF9yZXF1aXJlLCBfbW9kdWxlLmV4cG9ydHMsIF9tb2R1bGUpXG5cbiAgICBWbS5yZWdpc3Rlck1vZHVsZXMoe1xuICAgICAgW2NsZWFuTmFtZV06IF9tb2R1bGUuZXhwb3J0c1xuICAgIH0pXG4gIH0gZWxzZSBpZiAoaXNOb3JtYWxNb2R1bGUobmFtZSkpIHtcbiAgICBjbGVhbk5hbWUgPSByZW1vdmVKU1N1cmZpeChuYW1lKVxuXG4gICAgZmFjdG9yeShfcmVxdWlyZSwgX21vZHVsZS5leHBvcnRzLCBfbW9kdWxlKVxuXG4gICAgY29tbW9uTW9kdWxlc1tjbGVhbk5hbWVdID0gX21vZHVsZS5leHBvcnRzXG4gIH0gZWxzZSBpZiAoaXNOcG1Nb2R1bGUobmFtZSkpIHtcbiAgICBjbGVhbk5hbWUgPSByZW1vdmVKU1N1cmZpeChuYW1lKVxuXG4gICAgZmFjdG9yeShfcmVxdWlyZSwgX21vZHVsZS5leHBvcnRzLCBfbW9kdWxlKVxuXG4gICAgbGV0IGV4cG9ydHMgPSBfbW9kdWxlLmV4cG9ydHNcbiAgICBpZiAoZXhwb3J0cy50ZW1wbGF0ZSB8fFxuICAgICAgICBleHBvcnRzLnN0eWxlIHx8XG4gICAgICAgIGV4cG9ydHMubWV0aG9kcykge1xuICAgICAgLy8gZG93bmdyYWRlIHRvIG9sZCBkZWZpbmUgbWV0aG9kIChkZWZpbmUoJ2NvbXBvbmVudE5hbWUnLCBmYWN0b3J5KSlcbiAgICAgIC8vIHRoZSBleHBvcnRzIGNvbnRhaW4gb25lIGtleSBvZiB0ZW1wbGF0ZSwgc3R5bGUgb3IgbWV0aG9kc1xuICAgICAgLy8gYnV0IGl0IGhhcyByaXNrISEhXG4gICAgICB0aGlzLnJlZ2lzdGVyQ29tcG9uZW50KGNsZWFuTmFtZSwgZXhwb3J0cylcbiAgICB9IGVsc2Uge1xuICAgICAgY29tbW9uTW9kdWxlc1tjbGVhbk5hbWVdID0gX21vZHVsZS5leHBvcnRzXG4gICAgfVxuICB9XG5cbiAgcGVyZi5lbmQoJ2RlZmluZScsIG5hbWUpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBib290c3RyYXAobmFtZSwgY29uZmlnLCBkYXRhKSB7XG4gIGxldCBjbGVhbk5hbWVcblxuICBpZiAoaXNXZWV4Q29tcG9uZW50KG5hbWUpKSB7XG4gICAgY2xlYW5OYW1lID0gcmVtb3ZlV2VleFByZWZpeChuYW1lKVxuICB9IGVsc2UgaWYgKGlzTnBtTW9kdWxlKG5hbWUpKSB7XG4gICAgY2xlYW5OYW1lID0gcmVtb3ZlSlNTdXJmaXgobmFtZSlcbiAgICAvLyBjaGVjayBpZiBkZWZpbmUgYnkgb2xkICdkZWZpbmUnIG1ldGhvZFxuICAgIGlmICghdGhpcy5jdXN0b21Db21wb25lbnRNYXBbY2xlYW5OYW1lXSkge1xuICAgICAgcmV0dXJuIG5ldyBFcnJvcihgSXQncyBub3QgYSBjb21wb25lbnQ6ICR7bmFtZX1gKVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV3IEVycm9yKGBXcm9uZyBjb21wb25lbnQgbmFtZTogJHtuYW1lfWApXG4gIH1cblxuICBjb25maWcgPSBfLmlzUGxhaW5PYmplY3QoY29uZmlnKSA/IGNvbmZpZyA6IHt9XG5cbiAgaWYgKHR5cGVvZiBjb25maWcudHJhbnNmb3JtZXJWZXJzaW9uID09PSAnc3RyaW5nJyAmJlxuICAgIHR5cGVvZiBnbG9iYWwubmVlZFRyYW5zZm9ybWVyVmVyc2lvbiA9PT0gJ3N0cmluZycgJiZcbiAgICAhc2VtdmVyLnNhdGlzZmllcyhjb25maWcudHJhbnNmb3JtZXJWZXJzaW9uLFxuICAgICAgZ2xvYmFsLm5lZWRUcmFuc2Zvcm1lclZlcnNpb24pKSB7XG4gICAgcmV0dXJuIG5ldyBFcnJvcihgSlMgQnVuZGxlIHZlcnNpb246ICR7Y29uZmlnLnRyYW5zZm9ybWVyVmVyc2lvbn0gYCArXG4gICAgICBgbm90IGNvbXBhdGlibGUgd2l0aCAke2dsb2JhbC5uZWVkVHJhbnNmb3JtZXJWZXJzaW9ufWApXG4gIH1cblxuICBsZXQgX2NoZWNrRG93bmdyYWRlID0gZG93bmdyYWRlLmNoZWNrKGNvbmZpZy5kb3duZ3JhZGUsIHRoaXMub3B0aW9ucylcbiAgaWYgKF9jaGVja0Rvd25ncmFkZS5pc0Rvd25ncmFkZSkge1xuICAgIHRoaXMuY2FsbFRhc2tzKFt7XG4gICAgICBtb2R1bGU6ICdpbnN0YW5jZVdyYXAnLFxuICAgICAgbWV0aG9kOiAnZXJyb3InLFxuICAgICAgYXJnczogW1xuICAgICAgICBfY2hlY2tEb3duZ3JhZGUuZXJyb3JUeXBlLFxuICAgICAgICBfY2hlY2tEb3duZ3JhZGUuY29kZSxcbiAgICAgICAgX2NoZWNrRG93bmdyYWRlLmVycm9yTWVzc2FnZVxuICAgICAgXVxuICAgIH1dKVxuICAgIHJldHVybiBuZXcgRXJyb3IoYERvd25ncmFkZTogJHtjb25maWcuZG93bmdyYWRlfWApXG4gIH1cblxuICBwZXJmLnN0YXJ0KCdjcmVhdGUgdm0nLCBjbGVhbk5hbWUpXG5cbiAgdGhpcy52bSA9IG5ldyBWbShjbGVhbk5hbWUsIHtfYXBwOiB0aGlzfSwgbnVsbCwgZGF0YSwge1xuICAgICdob29rOnJlYWR5JzogKCkgPT4ge1xuICAgICAgcGVyZi5lbmQoJ2NyZWF0ZSB2bScsIGNsZWFuTmFtZSlcbiAgICB9XG4gIH0pXG59XG5cbi8qKlxuICogQGRlcHJlY2F0ZWRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyKHR5cGUsIG9wdGlvbnMpIHtcbiAgcGVyZi5zdGFydCgncmVnaXN0ZXInLCB0eXBlKVxuICB0aGlzLnJlZ2lzdGVyQ29tcG9uZW50KHR5cGUsIG9wdGlvbnMpXG4gIHBlcmYuZW5kKCdyZWdpc3RlcicsIHR5cGUpXG59XG5cbi8qKlxuICogQGRlcHJlY2F0ZWRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlcih0eXBlLCBkYXRhKSB7XG4gIHJldHVybiB0aGlzLmJvb3RzdHJhcCh0eXBlLCB7fSwgZGF0YSlcbn1cblxuLyoqXG4gKiBAZGVwcmVjYXRlZFxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVxdWlyZSh0eXBlKSB7XG4gIHJldHVybiAoZGF0YSkgPT4ge1xuICAgIHJldHVybiB0aGlzLmJvb3RzdHJhcCh0eXBlLCB7fSwgZGF0YSlcbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9saWIvYXBwL2J1bmRsZS5qc1xuICoqLyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IFNlbVZlcjtcblxuLy8gVGhlIGRlYnVnIGZ1bmN0aW9uIGlzIGV4Y2x1ZGVkIGVudGlyZWx5IGZyb20gdGhlIG1pbmlmaWVkIHZlcnNpb24uXG4vKiBub21pbiAqLyB2YXIgZGVidWc7XG4vKiBub21pbiAqLyBpZiAodHlwZW9mIHByb2Nlc3MgPT09ICdvYmplY3QnICYmXG4gICAgLyogbm9taW4gKi8gcHJvY2Vzcy5lbnYgJiZcbiAgICAvKiBub21pbiAqLyBwcm9jZXNzLmVudi5OT0RFX0RFQlVHICYmXG4gICAgLyogbm9taW4gKi8gL1xcYnNlbXZlclxcYi9pLnRlc3QocHJvY2Vzcy5lbnYuTk9ERV9ERUJVRykpXG4gIC8qIG5vbWluICovIGRlYnVnID0gZnVuY3Rpb24oKSB7XG4gICAgLyogbm9taW4gKi8gdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuICAgIC8qIG5vbWluICovIGFyZ3MudW5zaGlmdCgnU0VNVkVSJyk7XG4gICAgLyogbm9taW4gKi8gY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgYXJncyk7XG4gICAgLyogbm9taW4gKi8gfTtcbi8qIG5vbWluICovIGVsc2VcbiAgLyogbm9taW4gKi8gZGVidWcgPSBmdW5jdGlvbigpIHt9O1xuXG4vLyBOb3RlOiB0aGlzIGlzIHRoZSBzZW12ZXIub3JnIHZlcnNpb24gb2YgdGhlIHNwZWMgdGhhdCBpdCBpbXBsZW1lbnRzXG4vLyBOb3QgbmVjZXNzYXJpbHkgdGhlIHBhY2thZ2UgdmVyc2lvbiBvZiB0aGlzIGNvZGUuXG5leHBvcnRzLlNFTVZFUl9TUEVDX1ZFUlNJT04gPSAnMi4wLjAnO1xuXG52YXIgTUFYX0xFTkdUSCA9IDI1NjtcbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIgfHwgOTAwNzE5OTI1NDc0MDk5MTtcblxuLy8gVGhlIGFjdHVhbCByZWdleHBzIGdvIG9uIGV4cG9ydHMucmVcbnZhciByZSA9IGV4cG9ydHMucmUgPSBbXTtcbnZhciBzcmMgPSBleHBvcnRzLnNyYyA9IFtdO1xudmFyIFIgPSAwO1xuXG4vLyBUaGUgZm9sbG93aW5nIFJlZ3VsYXIgRXhwcmVzc2lvbnMgY2FuIGJlIHVzZWQgZm9yIHRva2VuaXppbmcsXG4vLyB2YWxpZGF0aW5nLCBhbmQgcGFyc2luZyBTZW1WZXIgdmVyc2lvbiBzdHJpbmdzLlxuXG4vLyAjIyBOdW1lcmljIElkZW50aWZpZXJcbi8vIEEgc2luZ2xlIGAwYCwgb3IgYSBub24temVybyBkaWdpdCBmb2xsb3dlZCBieSB6ZXJvIG9yIG1vcmUgZGlnaXRzLlxuXG52YXIgTlVNRVJJQ0lERU5USUZJRVIgPSBSKys7XG5zcmNbTlVNRVJJQ0lERU5USUZJRVJdID0gJzB8WzEtOV1cXFxcZConO1xudmFyIE5VTUVSSUNJREVOVElGSUVSTE9PU0UgPSBSKys7XG5zcmNbTlVNRVJJQ0lERU5USUZJRVJMT09TRV0gPSAnWzAtOV0rJztcblxuXG4vLyAjIyBOb24tbnVtZXJpYyBJZGVudGlmaWVyXG4vLyBaZXJvIG9yIG1vcmUgZGlnaXRzLCBmb2xsb3dlZCBieSBhIGxldHRlciBvciBoeXBoZW4sIGFuZCB0aGVuIHplcm8gb3Jcbi8vIG1vcmUgbGV0dGVycywgZGlnaXRzLCBvciBoeXBoZW5zLlxuXG52YXIgTk9OTlVNRVJJQ0lERU5USUZJRVIgPSBSKys7XG5zcmNbTk9OTlVNRVJJQ0lERU5USUZJRVJdID0gJ1xcXFxkKlthLXpBLVotXVthLXpBLVowLTktXSonO1xuXG5cbi8vICMjIE1haW4gVmVyc2lvblxuLy8gVGhyZWUgZG90LXNlcGFyYXRlZCBudW1lcmljIGlkZW50aWZpZXJzLlxuXG52YXIgTUFJTlZFUlNJT04gPSBSKys7XG5zcmNbTUFJTlZFUlNJT05dID0gJygnICsgc3JjW05VTUVSSUNJREVOVElGSUVSXSArICcpXFxcXC4nICtcbiAgICAgICAgICAgICAgICAgICAnKCcgKyBzcmNbTlVNRVJJQ0lERU5USUZJRVJdICsgJylcXFxcLicgK1xuICAgICAgICAgICAgICAgICAgICcoJyArIHNyY1tOVU1FUklDSURFTlRJRklFUl0gKyAnKSc7XG5cbnZhciBNQUlOVkVSU0lPTkxPT1NFID0gUisrO1xuc3JjW01BSU5WRVJTSU9OTE9PU0VdID0gJygnICsgc3JjW05VTUVSSUNJREVOVElGSUVSTE9PU0VdICsgJylcXFxcLicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJygnICsgc3JjW05VTUVSSUNJREVOVElGSUVSTE9PU0VdICsgJylcXFxcLicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJygnICsgc3JjW05VTUVSSUNJREVOVElGSUVSTE9PU0VdICsgJyknO1xuXG4vLyAjIyBQcmUtcmVsZWFzZSBWZXJzaW9uIElkZW50aWZpZXJcbi8vIEEgbnVtZXJpYyBpZGVudGlmaWVyLCBvciBhIG5vbi1udW1lcmljIGlkZW50aWZpZXIuXG5cbnZhciBQUkVSRUxFQVNFSURFTlRJRklFUiA9IFIrKztcbnNyY1tQUkVSRUxFQVNFSURFTlRJRklFUl0gPSAnKD86JyArIHNyY1tOVU1FUklDSURFTlRJRklFUl0gK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd8JyArIHNyY1tOT05OVU1FUklDSURFTlRJRklFUl0gKyAnKSc7XG5cbnZhciBQUkVSRUxFQVNFSURFTlRJRklFUkxPT1NFID0gUisrO1xuc3JjW1BSRVJFTEVBU0VJREVOVElGSUVSTE9PU0VdID0gJyg/OicgKyBzcmNbTlVNRVJJQ0lERU5USUZJRVJMT09TRV0gK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3wnICsgc3JjW05PTk5VTUVSSUNJREVOVElGSUVSXSArICcpJztcblxuXG4vLyAjIyBQcmUtcmVsZWFzZSBWZXJzaW9uXG4vLyBIeXBoZW4sIGZvbGxvd2VkIGJ5IG9uZSBvciBtb3JlIGRvdC1zZXBhcmF0ZWQgcHJlLXJlbGVhc2UgdmVyc2lvblxuLy8gaWRlbnRpZmllcnMuXG5cbnZhciBQUkVSRUxFQVNFID0gUisrO1xuc3JjW1BSRVJFTEVBU0VdID0gJyg/Oi0oJyArIHNyY1tQUkVSRUxFQVNFSURFTlRJRklFUl0gK1xuICAgICAgICAgICAgICAgICAgJyg/OlxcXFwuJyArIHNyY1tQUkVSRUxFQVNFSURFTlRJRklFUl0gKyAnKSopKSc7XG5cbnZhciBQUkVSRUxFQVNFTE9PU0UgPSBSKys7XG5zcmNbUFJFUkVMRUFTRUxPT1NFXSA9ICcoPzotPygnICsgc3JjW1BSRVJFTEVBU0VJREVOVElGSUVSTE9PU0VdICtcbiAgICAgICAgICAgICAgICAgICAgICAgJyg/OlxcXFwuJyArIHNyY1tQUkVSRUxFQVNFSURFTlRJRklFUkxPT1NFXSArICcpKikpJztcblxuLy8gIyMgQnVpbGQgTWV0YWRhdGEgSWRlbnRpZmllclxuLy8gQW55IGNvbWJpbmF0aW9uIG9mIGRpZ2l0cywgbGV0dGVycywgb3IgaHlwaGVucy5cblxudmFyIEJVSUxESURFTlRJRklFUiA9IFIrKztcbnNyY1tCVUlMRElERU5USUZJRVJdID0gJ1swLTlBLVphLXotXSsnO1xuXG4vLyAjIyBCdWlsZCBNZXRhZGF0YVxuLy8gUGx1cyBzaWduLCBmb2xsb3dlZCBieSBvbmUgb3IgbW9yZSBwZXJpb2Qtc2VwYXJhdGVkIGJ1aWxkIG1ldGFkYXRhXG4vLyBpZGVudGlmaWVycy5cblxudmFyIEJVSUxEID0gUisrO1xuc3JjW0JVSUxEXSA9ICcoPzpcXFxcKygnICsgc3JjW0JVSUxESURFTlRJRklFUl0gK1xuICAgICAgICAgICAgICcoPzpcXFxcLicgKyBzcmNbQlVJTERJREVOVElGSUVSXSArICcpKikpJztcblxuXG4vLyAjIyBGdWxsIFZlcnNpb24gU3RyaW5nXG4vLyBBIG1haW4gdmVyc2lvbiwgZm9sbG93ZWQgb3B0aW9uYWxseSBieSBhIHByZS1yZWxlYXNlIHZlcnNpb24gYW5kXG4vLyBidWlsZCBtZXRhZGF0YS5cblxuLy8gTm90ZSB0aGF0IHRoZSBvbmx5IG1ham9yLCBtaW5vciwgcGF0Y2gsIGFuZCBwcmUtcmVsZWFzZSBzZWN0aW9ucyBvZlxuLy8gdGhlIHZlcnNpb24gc3RyaW5nIGFyZSBjYXB0dXJpbmcgZ3JvdXBzLiAgVGhlIGJ1aWxkIG1ldGFkYXRhIGlzIG5vdCBhXG4vLyBjYXB0dXJpbmcgZ3JvdXAsIGJlY2F1c2UgaXQgc2hvdWxkIG5vdCBldmVyIGJlIHVzZWQgaW4gdmVyc2lvblxuLy8gY29tcGFyaXNvbi5cblxudmFyIEZVTEwgPSBSKys7XG52YXIgRlVMTFBMQUlOID0gJ3Y/JyArIHNyY1tNQUlOVkVSU0lPTl0gK1xuICAgICAgICAgICAgICAgIHNyY1tQUkVSRUxFQVNFXSArICc/JyArXG4gICAgICAgICAgICAgICAgc3JjW0JVSUxEXSArICc/Jztcblxuc3JjW0ZVTExdID0gJ14nICsgRlVMTFBMQUlOICsgJyQnO1xuXG4vLyBsaWtlIGZ1bGwsIGJ1dCBhbGxvd3MgdjEuMi4zIGFuZCA9MS4yLjMsIHdoaWNoIHBlb3BsZSBkbyBzb21ldGltZXMuXG4vLyBhbHNvLCAxLjAuMGFscGhhMSAocHJlcmVsZWFzZSB3aXRob3V0IHRoZSBoeXBoZW4pIHdoaWNoIGlzIHByZXR0eVxuLy8gY29tbW9uIGluIHRoZSBucG0gcmVnaXN0cnkuXG52YXIgTE9PU0VQTEFJTiA9ICdbdj1cXFxcc10qJyArIHNyY1tNQUlOVkVSU0lPTkxPT1NFXSArXG4gICAgICAgICAgICAgICAgIHNyY1tQUkVSRUxFQVNFTE9PU0VdICsgJz8nICtcbiAgICAgICAgICAgICAgICAgc3JjW0JVSUxEXSArICc/JztcblxudmFyIExPT1NFID0gUisrO1xuc3JjW0xPT1NFXSA9ICdeJyArIExPT1NFUExBSU4gKyAnJCc7XG5cbnZhciBHVExUID0gUisrO1xuc3JjW0dUTFRdID0gJygoPzo8fD4pPz0/KSc7XG5cbi8vIFNvbWV0aGluZyBsaWtlIFwiMi4qXCIgb3IgXCIxLjIueFwiLlxuLy8gTm90ZSB0aGF0IFwieC54XCIgaXMgYSB2YWxpZCB4UmFuZ2UgaWRlbnRpZmVyLCBtZWFuaW5nIFwiYW55IHZlcnNpb25cIlxuLy8gT25seSB0aGUgZmlyc3QgaXRlbSBpcyBzdHJpY3RseSByZXF1aXJlZC5cbnZhciBYUkFOR0VJREVOVElGSUVSTE9PU0UgPSBSKys7XG5zcmNbWFJBTkdFSURFTlRJRklFUkxPT1NFXSA9IHNyY1tOVU1FUklDSURFTlRJRklFUkxPT1NFXSArICd8eHxYfFxcXFwqJztcbnZhciBYUkFOR0VJREVOVElGSUVSID0gUisrO1xuc3JjW1hSQU5HRUlERU5USUZJRVJdID0gc3JjW05VTUVSSUNJREVOVElGSUVSXSArICd8eHxYfFxcXFwqJztcblxudmFyIFhSQU5HRVBMQUlOID0gUisrO1xuc3JjW1hSQU5HRVBMQUlOXSA9ICdbdj1cXFxcc10qKCcgKyBzcmNbWFJBTkdFSURFTlRJRklFUl0gKyAnKScgK1xuICAgICAgICAgICAgICAgICAgICcoPzpcXFxcLignICsgc3JjW1hSQU5HRUlERU5USUZJRVJdICsgJyknICtcbiAgICAgICAgICAgICAgICAgICAnKD86XFxcXC4oJyArIHNyY1tYUkFOR0VJREVOVElGSUVSXSArICcpJyArXG4gICAgICAgICAgICAgICAgICAgJyg/OicgKyBzcmNbUFJFUkVMRUFTRV0gKyAnKT8nICtcbiAgICAgICAgICAgICAgICAgICBzcmNbQlVJTERdICsgJz8nICtcbiAgICAgICAgICAgICAgICAgICAnKT8pPyc7XG5cbnZhciBYUkFOR0VQTEFJTkxPT1NFID0gUisrO1xuc3JjW1hSQU5HRVBMQUlOTE9PU0VdID0gJ1t2PVxcXFxzXSooJyArIHNyY1tYUkFOR0VJREVOVElGSUVSTE9PU0VdICsgJyknICtcbiAgICAgICAgICAgICAgICAgICAgICAgICcoPzpcXFxcLignICsgc3JjW1hSQU5HRUlERU5USUZJRVJMT09TRV0gKyAnKScgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJyg/OlxcXFwuKCcgKyBzcmNbWFJBTkdFSURFTlRJRklFUkxPT1NFXSArICcpJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnKD86JyArIHNyY1tQUkVSRUxFQVNFTE9PU0VdICsgJyk/JyArXG4gICAgICAgICAgICAgICAgICAgICAgICBzcmNbQlVJTERdICsgJz8nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICcpPyk/JztcblxudmFyIFhSQU5HRSA9IFIrKztcbnNyY1tYUkFOR0VdID0gJ14nICsgc3JjW0dUTFRdICsgJ1xcXFxzKicgKyBzcmNbWFJBTkdFUExBSU5dICsgJyQnO1xudmFyIFhSQU5HRUxPT1NFID0gUisrO1xuc3JjW1hSQU5HRUxPT1NFXSA9ICdeJyArIHNyY1tHVExUXSArICdcXFxccyonICsgc3JjW1hSQU5HRVBMQUlOTE9PU0VdICsgJyQnO1xuXG4vLyBUaWxkZSByYW5nZXMuXG4vLyBNZWFuaW5nIGlzIFwicmVhc29uYWJseSBhdCBvciBncmVhdGVyIHRoYW5cIlxudmFyIExPTkVUSUxERSA9IFIrKztcbnNyY1tMT05FVElMREVdID0gJyg/On4+PyknO1xuXG52YXIgVElMREVUUklNID0gUisrO1xuc3JjW1RJTERFVFJJTV0gPSAnKFxcXFxzKiknICsgc3JjW0xPTkVUSUxERV0gKyAnXFxcXHMrJztcbnJlW1RJTERFVFJJTV0gPSBuZXcgUmVnRXhwKHNyY1tUSUxERVRSSU1dLCAnZycpO1xudmFyIHRpbGRlVHJpbVJlcGxhY2UgPSAnJDF+JztcblxudmFyIFRJTERFID0gUisrO1xuc3JjW1RJTERFXSA9ICdeJyArIHNyY1tMT05FVElMREVdICsgc3JjW1hSQU5HRVBMQUlOXSArICckJztcbnZhciBUSUxERUxPT1NFID0gUisrO1xuc3JjW1RJTERFTE9PU0VdID0gJ14nICsgc3JjW0xPTkVUSUxERV0gKyBzcmNbWFJBTkdFUExBSU5MT09TRV0gKyAnJCc7XG5cbi8vIENhcmV0IHJhbmdlcy5cbi8vIE1lYW5pbmcgaXMgXCJhdCBsZWFzdCBhbmQgYmFja3dhcmRzIGNvbXBhdGlibGUgd2l0aFwiXG52YXIgTE9ORUNBUkVUID0gUisrO1xuc3JjW0xPTkVDQVJFVF0gPSAnKD86XFxcXF4pJztcblxudmFyIENBUkVUVFJJTSA9IFIrKztcbnNyY1tDQVJFVFRSSU1dID0gJyhcXFxccyopJyArIHNyY1tMT05FQ0FSRVRdICsgJ1xcXFxzKyc7XG5yZVtDQVJFVFRSSU1dID0gbmV3IFJlZ0V4cChzcmNbQ0FSRVRUUklNXSwgJ2cnKTtcbnZhciBjYXJldFRyaW1SZXBsYWNlID0gJyQxXic7XG5cbnZhciBDQVJFVCA9IFIrKztcbnNyY1tDQVJFVF0gPSAnXicgKyBzcmNbTE9ORUNBUkVUXSArIHNyY1tYUkFOR0VQTEFJTl0gKyAnJCc7XG52YXIgQ0FSRVRMT09TRSA9IFIrKztcbnNyY1tDQVJFVExPT1NFXSA9ICdeJyArIHNyY1tMT05FQ0FSRVRdICsgc3JjW1hSQU5HRVBMQUlOTE9PU0VdICsgJyQnO1xuXG4vLyBBIHNpbXBsZSBndC9sdC9lcSB0aGluZywgb3IganVzdCBcIlwiIHRvIGluZGljYXRlIFwiYW55IHZlcnNpb25cIlxudmFyIENPTVBBUkFUT1JMT09TRSA9IFIrKztcbnNyY1tDT01QQVJBVE9STE9PU0VdID0gJ14nICsgc3JjW0dUTFRdICsgJ1xcXFxzKignICsgTE9PU0VQTEFJTiArICcpJHxeJCc7XG52YXIgQ09NUEFSQVRPUiA9IFIrKztcbnNyY1tDT01QQVJBVE9SXSA9ICdeJyArIHNyY1tHVExUXSArICdcXFxccyooJyArIEZVTExQTEFJTiArICcpJHxeJCc7XG5cblxuLy8gQW4gZXhwcmVzc2lvbiB0byBzdHJpcCBhbnkgd2hpdGVzcGFjZSBiZXR3ZWVuIHRoZSBndGx0IGFuZCB0aGUgdGhpbmdcbi8vIGl0IG1vZGlmaWVzLCBzbyB0aGF0IGA+IDEuMi4zYCA9PT4gYD4xLjIuM2BcbnZhciBDT01QQVJBVE9SVFJJTSA9IFIrKztcbnNyY1tDT01QQVJBVE9SVFJJTV0gPSAnKFxcXFxzKiknICsgc3JjW0dUTFRdICtcbiAgICAgICAgICAgICAgICAgICAgICAnXFxcXHMqKCcgKyBMT09TRVBMQUlOICsgJ3wnICsgc3JjW1hSQU5HRVBMQUlOXSArICcpJztcblxuLy8gdGhpcyBvbmUgaGFzIHRvIHVzZSB0aGUgL2cgZmxhZ1xucmVbQ09NUEFSQVRPUlRSSU1dID0gbmV3IFJlZ0V4cChzcmNbQ09NUEFSQVRPUlRSSU1dLCAnZycpO1xudmFyIGNvbXBhcmF0b3JUcmltUmVwbGFjZSA9ICckMSQyJDMnO1xuXG5cbi8vIFNvbWV0aGluZyBsaWtlIGAxLjIuMyAtIDEuMi40YFxuLy8gTm90ZSB0aGF0IHRoZXNlIGFsbCB1c2UgdGhlIGxvb3NlIGZvcm0sIGJlY2F1c2UgdGhleSdsbCBiZVxuLy8gY2hlY2tlZCBhZ2FpbnN0IGVpdGhlciB0aGUgc3RyaWN0IG9yIGxvb3NlIGNvbXBhcmF0b3IgZm9ybVxuLy8gbGF0ZXIuXG52YXIgSFlQSEVOUkFOR0UgPSBSKys7XG5zcmNbSFlQSEVOUkFOR0VdID0gJ15cXFxccyooJyArIHNyY1tYUkFOR0VQTEFJTl0gKyAnKScgK1xuICAgICAgICAgICAgICAgICAgICdcXFxccystXFxcXHMrJyArXG4gICAgICAgICAgICAgICAgICAgJygnICsgc3JjW1hSQU5HRVBMQUlOXSArICcpJyArXG4gICAgICAgICAgICAgICAgICAgJ1xcXFxzKiQnO1xuXG52YXIgSFlQSEVOUkFOR0VMT09TRSA9IFIrKztcbnNyY1tIWVBIRU5SQU5HRUxPT1NFXSA9ICdeXFxcXHMqKCcgKyBzcmNbWFJBTkdFUExBSU5MT09TRV0gKyAnKScgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ1xcXFxzKy1cXFxccysnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICcoJyArIHNyY1tYUkFOR0VQTEFJTkxPT1NFXSArICcpJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnXFxcXHMqJCc7XG5cbi8vIFN0YXIgcmFuZ2VzIGJhc2ljYWxseSBqdXN0IGFsbG93IGFueXRoaW5nIGF0IGFsbC5cbnZhciBTVEFSID0gUisrO1xuc3JjW1NUQVJdID0gJyg8fD4pPz0/XFxcXHMqXFxcXConO1xuXG4vLyBDb21waWxlIHRvIGFjdHVhbCByZWdleHAgb2JqZWN0cy5cbi8vIEFsbCBhcmUgZmxhZy1mcmVlLCB1bmxlc3MgdGhleSB3ZXJlIGNyZWF0ZWQgYWJvdmUgd2l0aCBhIGZsYWcuXG5mb3IgKHZhciBpID0gMDsgaSA8IFI7IGkrKykge1xuICBkZWJ1ZyhpLCBzcmNbaV0pO1xuICBpZiAoIXJlW2ldKVxuICAgIHJlW2ldID0gbmV3IFJlZ0V4cChzcmNbaV0pO1xufVxuXG5leHBvcnRzLnBhcnNlID0gcGFyc2U7XG5mdW5jdGlvbiBwYXJzZSh2ZXJzaW9uLCBsb29zZSkge1xuICBpZiAodmVyc2lvbiBpbnN0YW5jZW9mIFNlbVZlcilcbiAgICByZXR1cm4gdmVyc2lvbjtcblxuICBpZiAodHlwZW9mIHZlcnNpb24gIT09ICdzdHJpbmcnKVxuICAgIHJldHVybiBudWxsO1xuXG4gIGlmICh2ZXJzaW9uLmxlbmd0aCA+IE1BWF9MRU5HVEgpXG4gICAgcmV0dXJuIG51bGw7XG5cbiAgdmFyIHIgPSBsb29zZSA/IHJlW0xPT1NFXSA6IHJlW0ZVTExdO1xuICBpZiAoIXIudGVzdCh2ZXJzaW9uKSlcbiAgICByZXR1cm4gbnVsbDtcblxuICB0cnkge1xuICAgIHJldHVybiBuZXcgU2VtVmVyKHZlcnNpb24sIGxvb3NlKTtcbiAgfSBjYXRjaCAoZXIpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuXG5leHBvcnRzLnZhbGlkID0gdmFsaWQ7XG5mdW5jdGlvbiB2YWxpZCh2ZXJzaW9uLCBsb29zZSkge1xuICB2YXIgdiA9IHBhcnNlKHZlcnNpb24sIGxvb3NlKTtcbiAgcmV0dXJuIHYgPyB2LnZlcnNpb24gOiBudWxsO1xufVxuXG5cbmV4cG9ydHMuY2xlYW4gPSBjbGVhbjtcbmZ1bmN0aW9uIGNsZWFuKHZlcnNpb24sIGxvb3NlKSB7XG4gIHZhciBzID0gcGFyc2UodmVyc2lvbi50cmltKCkucmVwbGFjZSgvXls9dl0rLywgJycpLCBsb29zZSk7XG4gIHJldHVybiBzID8gcy52ZXJzaW9uIDogbnVsbDtcbn1cblxuZXhwb3J0cy5TZW1WZXIgPSBTZW1WZXI7XG5cbmZ1bmN0aW9uIFNlbVZlcih2ZXJzaW9uLCBsb29zZSkge1xuICBpZiAodmVyc2lvbiBpbnN0YW5jZW9mIFNlbVZlcikge1xuICAgIGlmICh2ZXJzaW9uLmxvb3NlID09PSBsb29zZSlcbiAgICAgIHJldHVybiB2ZXJzaW9uO1xuICAgIGVsc2VcbiAgICAgIHZlcnNpb24gPSB2ZXJzaW9uLnZlcnNpb247XG4gIH0gZWxzZSBpZiAodHlwZW9mIHZlcnNpb24gIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBWZXJzaW9uOiAnICsgdmVyc2lvbik7XG4gIH1cblxuICBpZiAodmVyc2lvbi5sZW5ndGggPiBNQVhfTEVOR1RIKVxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3ZlcnNpb24gaXMgbG9uZ2VyIHRoYW4gJyArIE1BWF9MRU5HVEggKyAnIGNoYXJhY3RlcnMnKVxuXG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBTZW1WZXIpKVxuICAgIHJldHVybiBuZXcgU2VtVmVyKHZlcnNpb24sIGxvb3NlKTtcblxuICBkZWJ1ZygnU2VtVmVyJywgdmVyc2lvbiwgbG9vc2UpO1xuICB0aGlzLmxvb3NlID0gbG9vc2U7XG4gIHZhciBtID0gdmVyc2lvbi50cmltKCkubWF0Y2gobG9vc2UgPyByZVtMT09TRV0gOiByZVtGVUxMXSk7XG5cbiAgaWYgKCFtKVxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgVmVyc2lvbjogJyArIHZlcnNpb24pO1xuXG4gIHRoaXMucmF3ID0gdmVyc2lvbjtcblxuICAvLyB0aGVzZSBhcmUgYWN0dWFsbHkgbnVtYmVyc1xuICB0aGlzLm1ham9yID0gK21bMV07XG4gIHRoaXMubWlub3IgPSArbVsyXTtcbiAgdGhpcy5wYXRjaCA9ICttWzNdO1xuXG4gIGlmICh0aGlzLm1ham9yID4gTUFYX1NBRkVfSU5URUdFUiB8fCB0aGlzLm1ham9yIDwgMClcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIG1ham9yIHZlcnNpb24nKVxuXG4gIGlmICh0aGlzLm1pbm9yID4gTUFYX1NBRkVfSU5URUdFUiB8fCB0aGlzLm1pbm9yIDwgMClcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIG1pbm9yIHZlcnNpb24nKVxuXG4gIGlmICh0aGlzLnBhdGNoID4gTUFYX1NBRkVfSU5URUdFUiB8fCB0aGlzLnBhdGNoIDwgMClcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIHBhdGNoIHZlcnNpb24nKVxuXG4gIC8vIG51bWJlcmlmeSBhbnkgcHJlcmVsZWFzZSBudW1lcmljIGlkc1xuICBpZiAoIW1bNF0pXG4gICAgdGhpcy5wcmVyZWxlYXNlID0gW107XG4gIGVsc2VcbiAgICB0aGlzLnByZXJlbGVhc2UgPSBtWzRdLnNwbGl0KCcuJykubWFwKGZ1bmN0aW9uKGlkKSB7XG4gICAgICBpZiAoL15bMC05XSskLy50ZXN0KGlkKSkge1xuICAgICAgICB2YXIgbnVtID0gK2lkXG4gICAgICAgIGlmIChudW0gPj0gMCAmJiBudW0gPCBNQVhfU0FGRV9JTlRFR0VSKVxuICAgICAgICAgIHJldHVybiBudW1cbiAgICAgIH1cbiAgICAgIHJldHVybiBpZDtcbiAgICB9KTtcblxuICB0aGlzLmJ1aWxkID0gbVs1XSA/IG1bNV0uc3BsaXQoJy4nKSA6IFtdO1xuICB0aGlzLmZvcm1hdCgpO1xufVxuXG5TZW1WZXIucHJvdG90eXBlLmZvcm1hdCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnZlcnNpb24gPSB0aGlzLm1ham9yICsgJy4nICsgdGhpcy5taW5vciArICcuJyArIHRoaXMucGF0Y2g7XG4gIGlmICh0aGlzLnByZXJlbGVhc2UubGVuZ3RoKVxuICAgIHRoaXMudmVyc2lvbiArPSAnLScgKyB0aGlzLnByZXJlbGVhc2Uuam9pbignLicpO1xuICByZXR1cm4gdGhpcy52ZXJzaW9uO1xufTtcblxuU2VtVmVyLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy52ZXJzaW9uO1xufTtcblxuU2VtVmVyLnByb3RvdHlwZS5jb21wYXJlID0gZnVuY3Rpb24ob3RoZXIpIHtcbiAgZGVidWcoJ1NlbVZlci5jb21wYXJlJywgdGhpcy52ZXJzaW9uLCB0aGlzLmxvb3NlLCBvdGhlcik7XG4gIGlmICghKG90aGVyIGluc3RhbmNlb2YgU2VtVmVyKSlcbiAgICBvdGhlciA9IG5ldyBTZW1WZXIob3RoZXIsIHRoaXMubG9vc2UpO1xuXG4gIHJldHVybiB0aGlzLmNvbXBhcmVNYWluKG90aGVyKSB8fCB0aGlzLmNvbXBhcmVQcmUob3RoZXIpO1xufTtcblxuU2VtVmVyLnByb3RvdHlwZS5jb21wYXJlTWFpbiA9IGZ1bmN0aW9uKG90aGVyKSB7XG4gIGlmICghKG90aGVyIGluc3RhbmNlb2YgU2VtVmVyKSlcbiAgICBvdGhlciA9IG5ldyBTZW1WZXIob3RoZXIsIHRoaXMubG9vc2UpO1xuXG4gIHJldHVybiBjb21wYXJlSWRlbnRpZmllcnModGhpcy5tYWpvciwgb3RoZXIubWFqb3IpIHx8XG4gICAgICAgICBjb21wYXJlSWRlbnRpZmllcnModGhpcy5taW5vciwgb3RoZXIubWlub3IpIHx8XG4gICAgICAgICBjb21wYXJlSWRlbnRpZmllcnModGhpcy5wYXRjaCwgb3RoZXIucGF0Y2gpO1xufTtcblxuU2VtVmVyLnByb3RvdHlwZS5jb21wYXJlUHJlID0gZnVuY3Rpb24ob3RoZXIpIHtcbiAgaWYgKCEob3RoZXIgaW5zdGFuY2VvZiBTZW1WZXIpKVxuICAgIG90aGVyID0gbmV3IFNlbVZlcihvdGhlciwgdGhpcy5sb29zZSk7XG5cbiAgLy8gTk9UIGhhdmluZyBhIHByZXJlbGVhc2UgaXMgPiBoYXZpbmcgb25lXG4gIGlmICh0aGlzLnByZXJlbGVhc2UubGVuZ3RoICYmICFvdGhlci5wcmVyZWxlYXNlLmxlbmd0aClcbiAgICByZXR1cm4gLTE7XG4gIGVsc2UgaWYgKCF0aGlzLnByZXJlbGVhc2UubGVuZ3RoICYmIG90aGVyLnByZXJlbGVhc2UubGVuZ3RoKVxuICAgIHJldHVybiAxO1xuICBlbHNlIGlmICghdGhpcy5wcmVyZWxlYXNlLmxlbmd0aCAmJiAhb3RoZXIucHJlcmVsZWFzZS5sZW5ndGgpXG4gICAgcmV0dXJuIDA7XG5cbiAgdmFyIGkgPSAwO1xuICBkbyB7XG4gICAgdmFyIGEgPSB0aGlzLnByZXJlbGVhc2VbaV07XG4gICAgdmFyIGIgPSBvdGhlci5wcmVyZWxlYXNlW2ldO1xuICAgIGRlYnVnKCdwcmVyZWxlYXNlIGNvbXBhcmUnLCBpLCBhLCBiKTtcbiAgICBpZiAoYSA9PT0gdW5kZWZpbmVkICYmIGIgPT09IHVuZGVmaW5lZClcbiAgICAgIHJldHVybiAwO1xuICAgIGVsc2UgaWYgKGIgPT09IHVuZGVmaW5lZClcbiAgICAgIHJldHVybiAxO1xuICAgIGVsc2UgaWYgKGEgPT09IHVuZGVmaW5lZClcbiAgICAgIHJldHVybiAtMTtcbiAgICBlbHNlIGlmIChhID09PSBiKVxuICAgICAgY29udGludWU7XG4gICAgZWxzZVxuICAgICAgcmV0dXJuIGNvbXBhcmVJZGVudGlmaWVycyhhLCBiKTtcbiAgfSB3aGlsZSAoKytpKTtcbn07XG5cbi8vIHByZW1pbm9yIHdpbGwgYnVtcCB0aGUgdmVyc2lvbiB1cCB0byB0aGUgbmV4dCBtaW5vciByZWxlYXNlLCBhbmQgaW1tZWRpYXRlbHlcbi8vIGRvd24gdG8gcHJlLXJlbGVhc2UuIHByZW1ham9yIGFuZCBwcmVwYXRjaCB3b3JrIHRoZSBzYW1lIHdheS5cblNlbVZlci5wcm90b3R5cGUuaW5jID0gZnVuY3Rpb24ocmVsZWFzZSwgaWRlbnRpZmllcikge1xuICBzd2l0Y2ggKHJlbGVhc2UpIHtcbiAgICBjYXNlICdwcmVtYWpvcic6XG4gICAgICB0aGlzLnByZXJlbGVhc2UubGVuZ3RoID0gMDtcbiAgICAgIHRoaXMucGF0Y2ggPSAwO1xuICAgICAgdGhpcy5taW5vciA9IDA7XG4gICAgICB0aGlzLm1ham9yKys7XG4gICAgICB0aGlzLmluYygncHJlJywgaWRlbnRpZmllcik7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdwcmVtaW5vcic6XG4gICAgICB0aGlzLnByZXJlbGVhc2UubGVuZ3RoID0gMDtcbiAgICAgIHRoaXMucGF0Y2ggPSAwO1xuICAgICAgdGhpcy5taW5vcisrO1xuICAgICAgdGhpcy5pbmMoJ3ByZScsIGlkZW50aWZpZXIpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAncHJlcGF0Y2gnOlxuICAgICAgLy8gSWYgdGhpcyBpcyBhbHJlYWR5IGEgcHJlcmVsZWFzZSwgaXQgd2lsbCBidW1wIHRvIHRoZSBuZXh0IHZlcnNpb25cbiAgICAgIC8vIGRyb3AgYW55IHByZXJlbGVhc2VzIHRoYXQgbWlnaHQgYWxyZWFkeSBleGlzdCwgc2luY2UgdGhleSBhcmUgbm90XG4gICAgICAvLyByZWxldmFudCBhdCB0aGlzIHBvaW50LlxuICAgICAgdGhpcy5wcmVyZWxlYXNlLmxlbmd0aCA9IDA7XG4gICAgICB0aGlzLmluYygncGF0Y2gnLCBpZGVudGlmaWVyKTtcbiAgICAgIHRoaXMuaW5jKCdwcmUnLCBpZGVudGlmaWVyKTtcbiAgICAgIGJyZWFrO1xuICAgIC8vIElmIHRoZSBpbnB1dCBpcyBhIG5vbi1wcmVyZWxlYXNlIHZlcnNpb24sIHRoaXMgYWN0cyB0aGUgc2FtZSBhc1xuICAgIC8vIHByZXBhdGNoLlxuICAgIGNhc2UgJ3ByZXJlbGVhc2UnOlxuICAgICAgaWYgKHRoaXMucHJlcmVsZWFzZS5sZW5ndGggPT09IDApXG4gICAgICAgIHRoaXMuaW5jKCdwYXRjaCcsIGlkZW50aWZpZXIpO1xuICAgICAgdGhpcy5pbmMoJ3ByZScsIGlkZW50aWZpZXIpO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdtYWpvcic6XG4gICAgICAvLyBJZiB0aGlzIGlzIGEgcHJlLW1ham9yIHZlcnNpb24sIGJ1bXAgdXAgdG8gdGhlIHNhbWUgbWFqb3IgdmVyc2lvbi5cbiAgICAgIC8vIE90aGVyd2lzZSBpbmNyZW1lbnQgbWFqb3IuXG4gICAgICAvLyAxLjAuMC01IGJ1bXBzIHRvIDEuMC4wXG4gICAgICAvLyAxLjEuMCBidW1wcyB0byAyLjAuMFxuICAgICAgaWYgKHRoaXMubWlub3IgIT09IDAgfHwgdGhpcy5wYXRjaCAhPT0gMCB8fCB0aGlzLnByZXJlbGVhc2UubGVuZ3RoID09PSAwKVxuICAgICAgICB0aGlzLm1ham9yKys7XG4gICAgICB0aGlzLm1pbm9yID0gMDtcbiAgICAgIHRoaXMucGF0Y2ggPSAwO1xuICAgICAgdGhpcy5wcmVyZWxlYXNlID0gW107XG4gICAgICBicmVhaztcbiAgICBjYXNlICdtaW5vcic6XG4gICAgICAvLyBJZiB0aGlzIGlzIGEgcHJlLW1pbm9yIHZlcnNpb24sIGJ1bXAgdXAgdG8gdGhlIHNhbWUgbWlub3IgdmVyc2lvbi5cbiAgICAgIC8vIE90aGVyd2lzZSBpbmNyZW1lbnQgbWlub3IuXG4gICAgICAvLyAxLjIuMC01IGJ1bXBzIHRvIDEuMi4wXG4gICAgICAvLyAxLjIuMSBidW1wcyB0byAxLjMuMFxuICAgICAgaWYgKHRoaXMucGF0Y2ggIT09IDAgfHwgdGhpcy5wcmVyZWxlYXNlLmxlbmd0aCA9PT0gMClcbiAgICAgICAgdGhpcy5taW5vcisrO1xuICAgICAgdGhpcy5wYXRjaCA9IDA7XG4gICAgICB0aGlzLnByZXJlbGVhc2UgPSBbXTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3BhdGNoJzpcbiAgICAgIC8vIElmIHRoaXMgaXMgbm90IGEgcHJlLXJlbGVhc2UgdmVyc2lvbiwgaXQgd2lsbCBpbmNyZW1lbnQgdGhlIHBhdGNoLlxuICAgICAgLy8gSWYgaXQgaXMgYSBwcmUtcmVsZWFzZSBpdCB3aWxsIGJ1bXAgdXAgdG8gdGhlIHNhbWUgcGF0Y2ggdmVyc2lvbi5cbiAgICAgIC8vIDEuMi4wLTUgcGF0Y2hlcyB0byAxLjIuMFxuICAgICAgLy8gMS4yLjAgcGF0Y2hlcyB0byAxLjIuMVxuICAgICAgaWYgKHRoaXMucHJlcmVsZWFzZS5sZW5ndGggPT09IDApXG4gICAgICAgIHRoaXMucGF0Y2grKztcbiAgICAgIHRoaXMucHJlcmVsZWFzZSA9IFtdO1xuICAgICAgYnJlYWs7XG4gICAgLy8gVGhpcyBwcm9iYWJseSBzaG91bGRuJ3QgYmUgdXNlZCBwdWJsaWNseS5cbiAgICAvLyAxLjAuMCBcInByZVwiIHdvdWxkIGJlY29tZSAxLjAuMC0wIHdoaWNoIGlzIHRoZSB3cm9uZyBkaXJlY3Rpb24uXG4gICAgY2FzZSAncHJlJzpcbiAgICAgIGlmICh0aGlzLnByZXJlbGVhc2UubGVuZ3RoID09PSAwKVxuICAgICAgICB0aGlzLnByZXJlbGVhc2UgPSBbMF07XG4gICAgICBlbHNlIHtcbiAgICAgICAgdmFyIGkgPSB0aGlzLnByZXJlbGVhc2UubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoLS1pID49IDApIHtcbiAgICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJlcmVsZWFzZVtpXSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHRoaXMucHJlcmVsZWFzZVtpXSsrO1xuICAgICAgICAgICAgaSA9IC0yO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoaSA9PT0gLTEpIC8vIGRpZG4ndCBpbmNyZW1lbnQgYW55dGhpbmdcbiAgICAgICAgICB0aGlzLnByZXJlbGVhc2UucHVzaCgwKTtcbiAgICAgIH1cbiAgICAgIGlmIChpZGVudGlmaWVyKSB7XG4gICAgICAgIC8vIDEuMi4wLWJldGEuMSBidW1wcyB0byAxLjIuMC1iZXRhLjIsXG4gICAgICAgIC8vIDEuMi4wLWJldGEuZm9vYmx6IG9yIDEuMi4wLWJldGEgYnVtcHMgdG8gMS4yLjAtYmV0YS4wXG4gICAgICAgIGlmICh0aGlzLnByZXJlbGVhc2VbMF0gPT09IGlkZW50aWZpZXIpIHtcbiAgICAgICAgICBpZiAoaXNOYU4odGhpcy5wcmVyZWxlYXNlWzFdKSlcbiAgICAgICAgICAgIHRoaXMucHJlcmVsZWFzZSA9IFtpZGVudGlmaWVyLCAwXTtcbiAgICAgICAgfSBlbHNlXG4gICAgICAgICAgdGhpcy5wcmVyZWxlYXNlID0gW2lkZW50aWZpZXIsIDBdO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGluY3JlbWVudCBhcmd1bWVudDogJyArIHJlbGVhc2UpO1xuICB9XG4gIHRoaXMuZm9ybWF0KCk7XG4gIHRoaXMucmF3ID0gdGhpcy52ZXJzaW9uO1xuICByZXR1cm4gdGhpcztcbn07XG5cbmV4cG9ydHMuaW5jID0gaW5jO1xuZnVuY3Rpb24gaW5jKHZlcnNpb24sIHJlbGVhc2UsIGxvb3NlLCBpZGVudGlmaWVyKSB7XG4gIGlmICh0eXBlb2YobG9vc2UpID09PSAnc3RyaW5nJykge1xuICAgIGlkZW50aWZpZXIgPSBsb29zZTtcbiAgICBsb29zZSA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHRyeSB7XG4gICAgcmV0dXJuIG5ldyBTZW1WZXIodmVyc2lvbiwgbG9vc2UpLmluYyhyZWxlYXNlLCBpZGVudGlmaWVyKS52ZXJzaW9uO1xuICB9IGNhdGNoIChlcikge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbmV4cG9ydHMuZGlmZiA9IGRpZmY7XG5mdW5jdGlvbiBkaWZmKHZlcnNpb24xLCB2ZXJzaW9uMikge1xuICBpZiAoZXEodmVyc2lvbjEsIHZlcnNpb24yKSkge1xuICAgIHJldHVybiBudWxsO1xuICB9IGVsc2Uge1xuICAgIHZhciB2MSA9IHBhcnNlKHZlcnNpb24xKTtcbiAgICB2YXIgdjIgPSBwYXJzZSh2ZXJzaW9uMik7XG4gICAgaWYgKHYxLnByZXJlbGVhc2UubGVuZ3RoIHx8IHYyLnByZXJlbGVhc2UubGVuZ3RoKSB7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gdjEpIHtcbiAgICAgICAgaWYgKGtleSA9PT0gJ21ham9yJyB8fCBrZXkgPT09ICdtaW5vcicgfHwga2V5ID09PSAncGF0Y2gnKSB7XG4gICAgICAgICAgaWYgKHYxW2tleV0gIT09IHYyW2tleV0pIHtcbiAgICAgICAgICAgIHJldHVybiAncHJlJytrZXk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gJ3ByZXJlbGVhc2UnO1xuICAgIH1cbiAgICBmb3IgKHZhciBrZXkgaW4gdjEpIHtcbiAgICAgIGlmIChrZXkgPT09ICdtYWpvcicgfHwga2V5ID09PSAnbWlub3InIHx8IGtleSA9PT0gJ3BhdGNoJykge1xuICAgICAgICBpZiAodjFba2V5XSAhPT0gdjJba2V5XSkge1xuICAgICAgICAgIHJldHVybiBrZXk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0cy5jb21wYXJlSWRlbnRpZmllcnMgPSBjb21wYXJlSWRlbnRpZmllcnM7XG5cbnZhciBudW1lcmljID0gL15bMC05XSskLztcbmZ1bmN0aW9uIGNvbXBhcmVJZGVudGlmaWVycyhhLCBiKSB7XG4gIHZhciBhbnVtID0gbnVtZXJpYy50ZXN0KGEpO1xuICB2YXIgYm51bSA9IG51bWVyaWMudGVzdChiKTtcblxuICBpZiAoYW51bSAmJiBibnVtKSB7XG4gICAgYSA9ICthO1xuICAgIGIgPSArYjtcbiAgfVxuXG4gIHJldHVybiAoYW51bSAmJiAhYm51bSkgPyAtMSA6XG4gICAgICAgICAoYm51bSAmJiAhYW51bSkgPyAxIDpcbiAgICAgICAgIGEgPCBiID8gLTEgOlxuICAgICAgICAgYSA+IGIgPyAxIDpcbiAgICAgICAgIDA7XG59XG5cbmV4cG9ydHMucmNvbXBhcmVJZGVudGlmaWVycyA9IHJjb21wYXJlSWRlbnRpZmllcnM7XG5mdW5jdGlvbiByY29tcGFyZUlkZW50aWZpZXJzKGEsIGIpIHtcbiAgcmV0dXJuIGNvbXBhcmVJZGVudGlmaWVycyhiLCBhKTtcbn1cblxuZXhwb3J0cy5tYWpvciA9IG1ham9yO1xuZnVuY3Rpb24gbWFqb3IoYSwgbG9vc2UpIHtcbiAgcmV0dXJuIG5ldyBTZW1WZXIoYSwgbG9vc2UpLm1ham9yO1xufVxuXG5leHBvcnRzLm1pbm9yID0gbWlub3I7XG5mdW5jdGlvbiBtaW5vcihhLCBsb29zZSkge1xuICByZXR1cm4gbmV3IFNlbVZlcihhLCBsb29zZSkubWlub3I7XG59XG5cbmV4cG9ydHMucGF0Y2ggPSBwYXRjaDtcbmZ1bmN0aW9uIHBhdGNoKGEsIGxvb3NlKSB7XG4gIHJldHVybiBuZXcgU2VtVmVyKGEsIGxvb3NlKS5wYXRjaDtcbn1cblxuZXhwb3J0cy5jb21wYXJlID0gY29tcGFyZTtcbmZ1bmN0aW9uIGNvbXBhcmUoYSwgYiwgbG9vc2UpIHtcbiAgcmV0dXJuIG5ldyBTZW1WZXIoYSwgbG9vc2UpLmNvbXBhcmUoYik7XG59XG5cbmV4cG9ydHMuY29tcGFyZUxvb3NlID0gY29tcGFyZUxvb3NlO1xuZnVuY3Rpb24gY29tcGFyZUxvb3NlKGEsIGIpIHtcbiAgcmV0dXJuIGNvbXBhcmUoYSwgYiwgdHJ1ZSk7XG59XG5cbmV4cG9ydHMucmNvbXBhcmUgPSByY29tcGFyZTtcbmZ1bmN0aW9uIHJjb21wYXJlKGEsIGIsIGxvb3NlKSB7XG4gIHJldHVybiBjb21wYXJlKGIsIGEsIGxvb3NlKTtcbn1cblxuZXhwb3J0cy5zb3J0ID0gc29ydDtcbmZ1bmN0aW9uIHNvcnQobGlzdCwgbG9vc2UpIHtcbiAgcmV0dXJuIGxpc3Quc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgcmV0dXJuIGV4cG9ydHMuY29tcGFyZShhLCBiLCBsb29zZSk7XG4gIH0pO1xufVxuXG5leHBvcnRzLnJzb3J0ID0gcnNvcnQ7XG5mdW5jdGlvbiByc29ydChsaXN0LCBsb29zZSkge1xuICByZXR1cm4gbGlzdC5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gZXhwb3J0cy5yY29tcGFyZShhLCBiLCBsb29zZSk7XG4gIH0pO1xufVxuXG5leHBvcnRzLmd0ID0gZ3Q7XG5mdW5jdGlvbiBndChhLCBiLCBsb29zZSkge1xuICByZXR1cm4gY29tcGFyZShhLCBiLCBsb29zZSkgPiAwO1xufVxuXG5leHBvcnRzLmx0ID0gbHQ7XG5mdW5jdGlvbiBsdChhLCBiLCBsb29zZSkge1xuICByZXR1cm4gY29tcGFyZShhLCBiLCBsb29zZSkgPCAwO1xufVxuXG5leHBvcnRzLmVxID0gZXE7XG5mdW5jdGlvbiBlcShhLCBiLCBsb29zZSkge1xuICByZXR1cm4gY29tcGFyZShhLCBiLCBsb29zZSkgPT09IDA7XG59XG5cbmV4cG9ydHMubmVxID0gbmVxO1xuZnVuY3Rpb24gbmVxKGEsIGIsIGxvb3NlKSB7XG4gIHJldHVybiBjb21wYXJlKGEsIGIsIGxvb3NlKSAhPT0gMDtcbn1cblxuZXhwb3J0cy5ndGUgPSBndGU7XG5mdW5jdGlvbiBndGUoYSwgYiwgbG9vc2UpIHtcbiAgcmV0dXJuIGNvbXBhcmUoYSwgYiwgbG9vc2UpID49IDA7XG59XG5cbmV4cG9ydHMubHRlID0gbHRlO1xuZnVuY3Rpb24gbHRlKGEsIGIsIGxvb3NlKSB7XG4gIHJldHVybiBjb21wYXJlKGEsIGIsIGxvb3NlKSA8PSAwO1xufVxuXG5leHBvcnRzLmNtcCA9IGNtcDtcbmZ1bmN0aW9uIGNtcChhLCBvcCwgYiwgbG9vc2UpIHtcbiAgdmFyIHJldDtcbiAgc3dpdGNoIChvcCkge1xuICAgIGNhc2UgJz09PSc6XG4gICAgICBpZiAodHlwZW9mIGEgPT09ICdvYmplY3QnKSBhID0gYS52ZXJzaW9uO1xuICAgICAgaWYgKHR5cGVvZiBiID09PSAnb2JqZWN0JykgYiA9IGIudmVyc2lvbjtcbiAgICAgIHJldCA9IGEgPT09IGI7XG4gICAgICBicmVhaztcbiAgICBjYXNlICchPT0nOlxuICAgICAgaWYgKHR5cGVvZiBhID09PSAnb2JqZWN0JykgYSA9IGEudmVyc2lvbjtcbiAgICAgIGlmICh0eXBlb2YgYiA9PT0gJ29iamVjdCcpIGIgPSBiLnZlcnNpb247XG4gICAgICByZXQgPSBhICE9PSBiO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnJzogY2FzZSAnPSc6IGNhc2UgJz09JzogcmV0ID0gZXEoYSwgYiwgbG9vc2UpOyBicmVhaztcbiAgICBjYXNlICchPSc6IHJldCA9IG5lcShhLCBiLCBsb29zZSk7IGJyZWFrO1xuICAgIGNhc2UgJz4nOiByZXQgPSBndChhLCBiLCBsb29zZSk7IGJyZWFrO1xuICAgIGNhc2UgJz49JzogcmV0ID0gZ3RlKGEsIGIsIGxvb3NlKTsgYnJlYWs7XG4gICAgY2FzZSAnPCc6IHJldCA9IGx0KGEsIGIsIGxvb3NlKTsgYnJlYWs7XG4gICAgY2FzZSAnPD0nOiByZXQgPSBsdGUoYSwgYiwgbG9vc2UpOyBicmVhaztcbiAgICBkZWZhdWx0OiB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIG9wZXJhdG9yOiAnICsgb3ApO1xuICB9XG4gIHJldHVybiByZXQ7XG59XG5cbmV4cG9ydHMuQ29tcGFyYXRvciA9IENvbXBhcmF0b3I7XG5mdW5jdGlvbiBDb21wYXJhdG9yKGNvbXAsIGxvb3NlKSB7XG4gIGlmIChjb21wIGluc3RhbmNlb2YgQ29tcGFyYXRvcikge1xuICAgIGlmIChjb21wLmxvb3NlID09PSBsb29zZSlcbiAgICAgIHJldHVybiBjb21wO1xuICAgIGVsc2VcbiAgICAgIGNvbXAgPSBjb21wLnZhbHVlO1xuICB9XG5cbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIENvbXBhcmF0b3IpKVxuICAgIHJldHVybiBuZXcgQ29tcGFyYXRvcihjb21wLCBsb29zZSk7XG5cbiAgZGVidWcoJ2NvbXBhcmF0b3InLCBjb21wLCBsb29zZSk7XG4gIHRoaXMubG9vc2UgPSBsb29zZTtcbiAgdGhpcy5wYXJzZShjb21wKTtcblxuICBpZiAodGhpcy5zZW12ZXIgPT09IEFOWSlcbiAgICB0aGlzLnZhbHVlID0gJyc7XG4gIGVsc2VcbiAgICB0aGlzLnZhbHVlID0gdGhpcy5vcGVyYXRvciArIHRoaXMuc2VtdmVyLnZlcnNpb247XG5cbiAgZGVidWcoJ2NvbXAnLCB0aGlzKTtcbn1cblxudmFyIEFOWSA9IHt9O1xuQ29tcGFyYXRvci5wcm90b3R5cGUucGFyc2UgPSBmdW5jdGlvbihjb21wKSB7XG4gIHZhciByID0gdGhpcy5sb29zZSA/IHJlW0NPTVBBUkFUT1JMT09TRV0gOiByZVtDT01QQVJBVE9SXTtcbiAgdmFyIG0gPSBjb21wLm1hdGNoKHIpO1xuXG4gIGlmICghbSlcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIGNvbXBhcmF0b3I6ICcgKyBjb21wKTtcblxuICB0aGlzLm9wZXJhdG9yID0gbVsxXTtcbiAgaWYgKHRoaXMub3BlcmF0b3IgPT09ICc9JylcbiAgICB0aGlzLm9wZXJhdG9yID0gJyc7XG5cbiAgLy8gaWYgaXQgbGl0ZXJhbGx5IGlzIGp1c3QgJz4nIG9yICcnIHRoZW4gYWxsb3cgYW55dGhpbmcuXG4gIGlmICghbVsyXSlcbiAgICB0aGlzLnNlbXZlciA9IEFOWTtcbiAgZWxzZVxuICAgIHRoaXMuc2VtdmVyID0gbmV3IFNlbVZlcihtWzJdLCB0aGlzLmxvb3NlKTtcbn07XG5cbkNvbXBhcmF0b3IucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnZhbHVlO1xufTtcblxuQ29tcGFyYXRvci5wcm90b3R5cGUudGVzdCA9IGZ1bmN0aW9uKHZlcnNpb24pIHtcbiAgZGVidWcoJ0NvbXBhcmF0b3IudGVzdCcsIHZlcnNpb24sIHRoaXMubG9vc2UpO1xuXG4gIGlmICh0aGlzLnNlbXZlciA9PT0gQU5ZKVxuICAgIHJldHVybiB0cnVlO1xuXG4gIGlmICh0eXBlb2YgdmVyc2lvbiA9PT0gJ3N0cmluZycpXG4gICAgdmVyc2lvbiA9IG5ldyBTZW1WZXIodmVyc2lvbiwgdGhpcy5sb29zZSk7XG5cbiAgcmV0dXJuIGNtcCh2ZXJzaW9uLCB0aGlzLm9wZXJhdG9yLCB0aGlzLnNlbXZlciwgdGhpcy5sb29zZSk7XG59O1xuXG5cbmV4cG9ydHMuUmFuZ2UgPSBSYW5nZTtcbmZ1bmN0aW9uIFJhbmdlKHJhbmdlLCBsb29zZSkge1xuICBpZiAoKHJhbmdlIGluc3RhbmNlb2YgUmFuZ2UpICYmIHJhbmdlLmxvb3NlID09PSBsb29zZSlcbiAgICByZXR1cm4gcmFuZ2U7XG5cbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFJhbmdlKSlcbiAgICByZXR1cm4gbmV3IFJhbmdlKHJhbmdlLCBsb29zZSk7XG5cbiAgdGhpcy5sb29zZSA9IGxvb3NlO1xuXG4gIC8vIEZpcnN0LCBzcGxpdCBiYXNlZCBvbiBib29sZWFuIG9yIHx8XG4gIHRoaXMucmF3ID0gcmFuZ2U7XG4gIHRoaXMuc2V0ID0gcmFuZ2Uuc3BsaXQoL1xccypcXHxcXHxcXHMqLykubWFwKGZ1bmN0aW9uKHJhbmdlKSB7XG4gICAgcmV0dXJuIHRoaXMucGFyc2VSYW5nZShyYW5nZS50cmltKCkpO1xuICB9LCB0aGlzKS5maWx0ZXIoZnVuY3Rpb24oYykge1xuICAgIC8vIHRocm93IG91dCBhbnkgdGhhdCBhcmUgbm90IHJlbGV2YW50IGZvciB3aGF0ZXZlciByZWFzb25cbiAgICByZXR1cm4gYy5sZW5ndGg7XG4gIH0pO1xuXG4gIGlmICghdGhpcy5zZXQubGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBTZW1WZXIgUmFuZ2U6ICcgKyByYW5nZSk7XG4gIH1cblxuICB0aGlzLmZvcm1hdCgpO1xufVxuXG5SYW5nZS5wcm90b3R5cGUuZm9ybWF0ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMucmFuZ2UgPSB0aGlzLnNldC5tYXAoZnVuY3Rpb24oY29tcHMpIHtcbiAgICByZXR1cm4gY29tcHMuam9pbignICcpLnRyaW0oKTtcbiAgfSkuam9pbignfHwnKS50cmltKCk7XG4gIHJldHVybiB0aGlzLnJhbmdlO1xufTtcblxuUmFuZ2UucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnJhbmdlO1xufTtcblxuUmFuZ2UucHJvdG90eXBlLnBhcnNlUmFuZ2UgPSBmdW5jdGlvbihyYW5nZSkge1xuICB2YXIgbG9vc2UgPSB0aGlzLmxvb3NlO1xuICByYW5nZSA9IHJhbmdlLnRyaW0oKTtcbiAgZGVidWcoJ3JhbmdlJywgcmFuZ2UsIGxvb3NlKTtcbiAgLy8gYDEuMi4zIC0gMS4yLjRgID0+IGA+PTEuMi4zIDw9MS4yLjRgXG4gIHZhciBociA9IGxvb3NlID8gcmVbSFlQSEVOUkFOR0VMT09TRV0gOiByZVtIWVBIRU5SQU5HRV07XG4gIHJhbmdlID0gcmFuZ2UucmVwbGFjZShociwgaHlwaGVuUmVwbGFjZSk7XG4gIGRlYnVnKCdoeXBoZW4gcmVwbGFjZScsIHJhbmdlKTtcbiAgLy8gYD4gMS4yLjMgPCAxLjIuNWAgPT4gYD4xLjIuMyA8MS4yLjVgXG4gIHJhbmdlID0gcmFuZ2UucmVwbGFjZShyZVtDT01QQVJBVE9SVFJJTV0sIGNvbXBhcmF0b3JUcmltUmVwbGFjZSk7XG4gIGRlYnVnKCdjb21wYXJhdG9yIHRyaW0nLCByYW5nZSwgcmVbQ09NUEFSQVRPUlRSSU1dKTtcblxuICAvLyBgfiAxLjIuM2AgPT4gYH4xLjIuM2BcbiAgcmFuZ2UgPSByYW5nZS5yZXBsYWNlKHJlW1RJTERFVFJJTV0sIHRpbGRlVHJpbVJlcGxhY2UpO1xuXG4gIC8vIGBeIDEuMi4zYCA9PiBgXjEuMi4zYFxuICByYW5nZSA9IHJhbmdlLnJlcGxhY2UocmVbQ0FSRVRUUklNXSwgY2FyZXRUcmltUmVwbGFjZSk7XG5cbiAgLy8gbm9ybWFsaXplIHNwYWNlc1xuICByYW5nZSA9IHJhbmdlLnNwbGl0KC9cXHMrLykuam9pbignICcpO1xuXG4gIC8vIEF0IHRoaXMgcG9pbnQsIHRoZSByYW5nZSBpcyBjb21wbGV0ZWx5IHRyaW1tZWQgYW5kXG4gIC8vIHJlYWR5IHRvIGJlIHNwbGl0IGludG8gY29tcGFyYXRvcnMuXG5cbiAgdmFyIGNvbXBSZSA9IGxvb3NlID8gcmVbQ09NUEFSQVRPUkxPT1NFXSA6IHJlW0NPTVBBUkFUT1JdO1xuICB2YXIgc2V0ID0gcmFuZ2Uuc3BsaXQoJyAnKS5tYXAoZnVuY3Rpb24oY29tcCkge1xuICAgIHJldHVybiBwYXJzZUNvbXBhcmF0b3IoY29tcCwgbG9vc2UpO1xuICB9KS5qb2luKCcgJykuc3BsaXQoL1xccysvKTtcbiAgaWYgKHRoaXMubG9vc2UpIHtcbiAgICAvLyBpbiBsb29zZSBtb2RlLCB0aHJvdyBvdXQgYW55IHRoYXQgYXJlIG5vdCB2YWxpZCBjb21wYXJhdG9yc1xuICAgIHNldCA9IHNldC5maWx0ZXIoZnVuY3Rpb24oY29tcCkge1xuICAgICAgcmV0dXJuICEhY29tcC5tYXRjaChjb21wUmUpO1xuICAgIH0pO1xuICB9XG4gIHNldCA9IHNldC5tYXAoZnVuY3Rpb24oY29tcCkge1xuICAgIHJldHVybiBuZXcgQ29tcGFyYXRvcihjb21wLCBsb29zZSk7XG4gIH0pO1xuXG4gIHJldHVybiBzZXQ7XG59O1xuXG4vLyBNb3N0bHkganVzdCBmb3IgdGVzdGluZyBhbmQgbGVnYWN5IEFQSSByZWFzb25zXG5leHBvcnRzLnRvQ29tcGFyYXRvcnMgPSB0b0NvbXBhcmF0b3JzO1xuZnVuY3Rpb24gdG9Db21wYXJhdG9ycyhyYW5nZSwgbG9vc2UpIHtcbiAgcmV0dXJuIG5ldyBSYW5nZShyYW5nZSwgbG9vc2UpLnNldC5tYXAoZnVuY3Rpb24oY29tcCkge1xuICAgIHJldHVybiBjb21wLm1hcChmdW5jdGlvbihjKSB7XG4gICAgICByZXR1cm4gYy52YWx1ZTtcbiAgICB9KS5qb2luKCcgJykudHJpbSgpLnNwbGl0KCcgJyk7XG4gIH0pO1xufVxuXG4vLyBjb21wcmlzZWQgb2YgeHJhbmdlcywgdGlsZGVzLCBzdGFycywgYW5kIGd0bHQncyBhdCB0aGlzIHBvaW50LlxuLy8gYWxyZWFkeSByZXBsYWNlZCB0aGUgaHlwaGVuIHJhbmdlc1xuLy8gdHVybiBpbnRvIGEgc2V0IG9mIEpVU1QgY29tcGFyYXRvcnMuXG5mdW5jdGlvbiBwYXJzZUNvbXBhcmF0b3IoY29tcCwgbG9vc2UpIHtcbiAgZGVidWcoJ2NvbXAnLCBjb21wKTtcbiAgY29tcCA9IHJlcGxhY2VDYXJldHMoY29tcCwgbG9vc2UpO1xuICBkZWJ1ZygnY2FyZXQnLCBjb21wKTtcbiAgY29tcCA9IHJlcGxhY2VUaWxkZXMoY29tcCwgbG9vc2UpO1xuICBkZWJ1ZygndGlsZGVzJywgY29tcCk7XG4gIGNvbXAgPSByZXBsYWNlWFJhbmdlcyhjb21wLCBsb29zZSk7XG4gIGRlYnVnKCd4cmFuZ2UnLCBjb21wKTtcbiAgY29tcCA9IHJlcGxhY2VTdGFycyhjb21wLCBsb29zZSk7XG4gIGRlYnVnKCdzdGFycycsIGNvbXApO1xuICByZXR1cm4gY29tcDtcbn1cblxuZnVuY3Rpb24gaXNYKGlkKSB7XG4gIHJldHVybiAhaWQgfHwgaWQudG9Mb3dlckNhc2UoKSA9PT0gJ3gnIHx8IGlkID09PSAnKic7XG59XG5cbi8vIH4sIH4+IC0tPiAqIChhbnksIGtpbmRhIHNpbGx5KVxuLy8gfjIsIH4yLngsIH4yLngueCwgfj4yLCB+PjIueCB+PjIueC54IC0tPiA+PTIuMC4wIDwzLjAuMFxuLy8gfjIuMCwgfjIuMC54LCB+PjIuMCwgfj4yLjAueCAtLT4gPj0yLjAuMCA8Mi4xLjBcbi8vIH4xLjIsIH4xLjIueCwgfj4xLjIsIH4+MS4yLnggLS0+ID49MS4yLjAgPDEuMy4wXG4vLyB+MS4yLjMsIH4+MS4yLjMgLS0+ID49MS4yLjMgPDEuMy4wXG4vLyB+MS4yLjAsIH4+MS4yLjAgLS0+ID49MS4yLjAgPDEuMy4wXG5mdW5jdGlvbiByZXBsYWNlVGlsZGVzKGNvbXAsIGxvb3NlKSB7XG4gIHJldHVybiBjb21wLnRyaW0oKS5zcGxpdCgvXFxzKy8pLm1hcChmdW5jdGlvbihjb21wKSB7XG4gICAgcmV0dXJuIHJlcGxhY2VUaWxkZShjb21wLCBsb29zZSk7XG4gIH0pLmpvaW4oJyAnKTtcbn1cblxuZnVuY3Rpb24gcmVwbGFjZVRpbGRlKGNvbXAsIGxvb3NlKSB7XG4gIHZhciByID0gbG9vc2UgPyByZVtUSUxERUxPT1NFXSA6IHJlW1RJTERFXTtcbiAgcmV0dXJuIGNvbXAucmVwbGFjZShyLCBmdW5jdGlvbihfLCBNLCBtLCBwLCBwcikge1xuICAgIGRlYnVnKCd0aWxkZScsIGNvbXAsIF8sIE0sIG0sIHAsIHByKTtcbiAgICB2YXIgcmV0O1xuXG4gICAgaWYgKGlzWChNKSlcbiAgICAgIHJldCA9ICcnO1xuICAgIGVsc2UgaWYgKGlzWChtKSlcbiAgICAgIHJldCA9ICc+PScgKyBNICsgJy4wLjAgPCcgKyAoK00gKyAxKSArICcuMC4wJztcbiAgICBlbHNlIGlmIChpc1gocCkpXG4gICAgICAvLyB+MS4yID09ID49MS4yLjAtIDwxLjMuMC1cbiAgICAgIHJldCA9ICc+PScgKyBNICsgJy4nICsgbSArICcuMCA8JyArIE0gKyAnLicgKyAoK20gKyAxKSArICcuMCc7XG4gICAgZWxzZSBpZiAocHIpIHtcbiAgICAgIGRlYnVnKCdyZXBsYWNlVGlsZGUgcHInLCBwcik7XG4gICAgICBpZiAocHIuY2hhckF0KDApICE9PSAnLScpXG4gICAgICAgIHByID0gJy0nICsgcHI7XG4gICAgICByZXQgPSAnPj0nICsgTSArICcuJyArIG0gKyAnLicgKyBwICsgcHIgK1xuICAgICAgICAgICAgJyA8JyArIE0gKyAnLicgKyAoK20gKyAxKSArICcuMCc7XG4gICAgfSBlbHNlXG4gICAgICAvLyB+MS4yLjMgPT0gPj0xLjIuMyA8MS4zLjBcbiAgICAgIHJldCA9ICc+PScgKyBNICsgJy4nICsgbSArICcuJyArIHAgK1xuICAgICAgICAgICAgJyA8JyArIE0gKyAnLicgKyAoK20gKyAxKSArICcuMCc7XG5cbiAgICBkZWJ1ZygndGlsZGUgcmV0dXJuJywgcmV0KTtcbiAgICByZXR1cm4gcmV0O1xuICB9KTtcbn1cblxuLy8gXiAtLT4gKiAoYW55LCBraW5kYSBzaWxseSlcbi8vIF4yLCBeMi54LCBeMi54LnggLS0+ID49Mi4wLjAgPDMuMC4wXG4vLyBeMi4wLCBeMi4wLnggLS0+ID49Mi4wLjAgPDMuMC4wXG4vLyBeMS4yLCBeMS4yLnggLS0+ID49MS4yLjAgPDIuMC4wXG4vLyBeMS4yLjMgLS0+ID49MS4yLjMgPDIuMC4wXG4vLyBeMS4yLjAgLS0+ID49MS4yLjAgPDIuMC4wXG5mdW5jdGlvbiByZXBsYWNlQ2FyZXRzKGNvbXAsIGxvb3NlKSB7XG4gIHJldHVybiBjb21wLnRyaW0oKS5zcGxpdCgvXFxzKy8pLm1hcChmdW5jdGlvbihjb21wKSB7XG4gICAgcmV0dXJuIHJlcGxhY2VDYXJldChjb21wLCBsb29zZSk7XG4gIH0pLmpvaW4oJyAnKTtcbn1cblxuZnVuY3Rpb24gcmVwbGFjZUNhcmV0KGNvbXAsIGxvb3NlKSB7XG4gIGRlYnVnKCdjYXJldCcsIGNvbXAsIGxvb3NlKTtcbiAgdmFyIHIgPSBsb29zZSA/IHJlW0NBUkVUTE9PU0VdIDogcmVbQ0FSRVRdO1xuICByZXR1cm4gY29tcC5yZXBsYWNlKHIsIGZ1bmN0aW9uKF8sIE0sIG0sIHAsIHByKSB7XG4gICAgZGVidWcoJ2NhcmV0JywgY29tcCwgXywgTSwgbSwgcCwgcHIpO1xuICAgIHZhciByZXQ7XG5cbiAgICBpZiAoaXNYKE0pKVxuICAgICAgcmV0ID0gJyc7XG4gICAgZWxzZSBpZiAoaXNYKG0pKVxuICAgICAgcmV0ID0gJz49JyArIE0gKyAnLjAuMCA8JyArICgrTSArIDEpICsgJy4wLjAnO1xuICAgIGVsc2UgaWYgKGlzWChwKSkge1xuICAgICAgaWYgKE0gPT09ICcwJylcbiAgICAgICAgcmV0ID0gJz49JyArIE0gKyAnLicgKyBtICsgJy4wIDwnICsgTSArICcuJyArICgrbSArIDEpICsgJy4wJztcbiAgICAgIGVsc2VcbiAgICAgICAgcmV0ID0gJz49JyArIE0gKyAnLicgKyBtICsgJy4wIDwnICsgKCtNICsgMSkgKyAnLjAuMCc7XG4gICAgfSBlbHNlIGlmIChwcikge1xuICAgICAgZGVidWcoJ3JlcGxhY2VDYXJldCBwcicsIHByKTtcbiAgICAgIGlmIChwci5jaGFyQXQoMCkgIT09ICctJylcbiAgICAgICAgcHIgPSAnLScgKyBwcjtcbiAgICAgIGlmIChNID09PSAnMCcpIHtcbiAgICAgICAgaWYgKG0gPT09ICcwJylcbiAgICAgICAgICByZXQgPSAnPj0nICsgTSArICcuJyArIG0gKyAnLicgKyBwICsgcHIgK1xuICAgICAgICAgICAgICAgICcgPCcgKyBNICsgJy4nICsgbSArICcuJyArICgrcCArIDEpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgcmV0ID0gJz49JyArIE0gKyAnLicgKyBtICsgJy4nICsgcCArIHByICtcbiAgICAgICAgICAgICAgICAnIDwnICsgTSArICcuJyArICgrbSArIDEpICsgJy4wJztcbiAgICAgIH0gZWxzZVxuICAgICAgICByZXQgPSAnPj0nICsgTSArICcuJyArIG0gKyAnLicgKyBwICsgcHIgK1xuICAgICAgICAgICAgICAnIDwnICsgKCtNICsgMSkgKyAnLjAuMCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlYnVnKCdubyBwcicpO1xuICAgICAgaWYgKE0gPT09ICcwJykge1xuICAgICAgICBpZiAobSA9PT0gJzAnKVxuICAgICAgICAgIHJldCA9ICc+PScgKyBNICsgJy4nICsgbSArICcuJyArIHAgK1xuICAgICAgICAgICAgICAgICcgPCcgKyBNICsgJy4nICsgbSArICcuJyArICgrcCArIDEpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgcmV0ID0gJz49JyArIE0gKyAnLicgKyBtICsgJy4nICsgcCArXG4gICAgICAgICAgICAgICAgJyA8JyArIE0gKyAnLicgKyAoK20gKyAxKSArICcuMCc7XG4gICAgICB9IGVsc2VcbiAgICAgICAgcmV0ID0gJz49JyArIE0gKyAnLicgKyBtICsgJy4nICsgcCArXG4gICAgICAgICAgICAgICcgPCcgKyAoK00gKyAxKSArICcuMC4wJztcbiAgICB9XG5cbiAgICBkZWJ1ZygnY2FyZXQgcmV0dXJuJywgcmV0KTtcbiAgICByZXR1cm4gcmV0O1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcmVwbGFjZVhSYW5nZXMoY29tcCwgbG9vc2UpIHtcbiAgZGVidWcoJ3JlcGxhY2VYUmFuZ2VzJywgY29tcCwgbG9vc2UpO1xuICByZXR1cm4gY29tcC5zcGxpdCgvXFxzKy8pLm1hcChmdW5jdGlvbihjb21wKSB7XG4gICAgcmV0dXJuIHJlcGxhY2VYUmFuZ2UoY29tcCwgbG9vc2UpO1xuICB9KS5qb2luKCcgJyk7XG59XG5cbmZ1bmN0aW9uIHJlcGxhY2VYUmFuZ2UoY29tcCwgbG9vc2UpIHtcbiAgY29tcCA9IGNvbXAudHJpbSgpO1xuICB2YXIgciA9IGxvb3NlID8gcmVbWFJBTkdFTE9PU0VdIDogcmVbWFJBTkdFXTtcbiAgcmV0dXJuIGNvbXAucmVwbGFjZShyLCBmdW5jdGlvbihyZXQsIGd0bHQsIE0sIG0sIHAsIHByKSB7XG4gICAgZGVidWcoJ3hSYW5nZScsIGNvbXAsIHJldCwgZ3RsdCwgTSwgbSwgcCwgcHIpO1xuICAgIHZhciB4TSA9IGlzWChNKTtcbiAgICB2YXIgeG0gPSB4TSB8fCBpc1gobSk7XG4gICAgdmFyIHhwID0geG0gfHwgaXNYKHApO1xuICAgIHZhciBhbnlYID0geHA7XG5cbiAgICBpZiAoZ3RsdCA9PT0gJz0nICYmIGFueVgpXG4gICAgICBndGx0ID0gJyc7XG5cbiAgICBpZiAoeE0pIHtcbiAgICAgIGlmIChndGx0ID09PSAnPicgfHwgZ3RsdCA9PT0gJzwnKSB7XG4gICAgICAgIC8vIG5vdGhpbmcgaXMgYWxsb3dlZFxuICAgICAgICByZXQgPSAnPDAuMC4wJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIG5vdGhpbmcgaXMgZm9yYmlkZGVuXG4gICAgICAgIHJldCA9ICcqJztcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGd0bHQgJiYgYW55WCkge1xuICAgICAgLy8gcmVwbGFjZSBYIHdpdGggMFxuICAgICAgaWYgKHhtKVxuICAgICAgICBtID0gMDtcbiAgICAgIGlmICh4cClcbiAgICAgICAgcCA9IDA7XG5cbiAgICAgIGlmIChndGx0ID09PSAnPicpIHtcbiAgICAgICAgLy8gPjEgPT4gPj0yLjAuMFxuICAgICAgICAvLyA+MS4yID0+ID49MS4zLjBcbiAgICAgICAgLy8gPjEuMi4zID0+ID49IDEuMi40XG4gICAgICAgIGd0bHQgPSAnPj0nO1xuICAgICAgICBpZiAoeG0pIHtcbiAgICAgICAgICBNID0gK00gKyAxO1xuICAgICAgICAgIG0gPSAwO1xuICAgICAgICAgIHAgPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKHhwKSB7XG4gICAgICAgICAgbSA9ICttICsgMTtcbiAgICAgICAgICBwID0gMDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChndGx0ID09PSAnPD0nKSB7XG4gICAgICAgIC8vIDw9MC43LnggaXMgYWN0dWFsbHkgPDAuOC4wLCBzaW5jZSBhbnkgMC43Lnggc2hvdWxkXG4gICAgICAgIC8vIHBhc3MuICBTaW1pbGFybHksIDw9Ny54IGlzIGFjdHVhbGx5IDw4LjAuMCwgZXRjLlxuICAgICAgICBndGx0ID0gJzwnXG4gICAgICAgIGlmICh4bSlcbiAgICAgICAgICBNID0gK00gKyAxXG4gICAgICAgIGVsc2VcbiAgICAgICAgICBtID0gK20gKyAxXG4gICAgICB9XG5cbiAgICAgIHJldCA9IGd0bHQgKyBNICsgJy4nICsgbSArICcuJyArIHA7XG4gICAgfSBlbHNlIGlmICh4bSkge1xuICAgICAgcmV0ID0gJz49JyArIE0gKyAnLjAuMCA8JyArICgrTSArIDEpICsgJy4wLjAnO1xuICAgIH0gZWxzZSBpZiAoeHApIHtcbiAgICAgIHJldCA9ICc+PScgKyBNICsgJy4nICsgbSArICcuMCA8JyArIE0gKyAnLicgKyAoK20gKyAxKSArICcuMCc7XG4gICAgfVxuXG4gICAgZGVidWcoJ3hSYW5nZSByZXR1cm4nLCByZXQpO1xuXG4gICAgcmV0dXJuIHJldDtcbiAgfSk7XG59XG5cbi8vIEJlY2F1c2UgKiBpcyBBTkQtZWQgd2l0aCBldmVyeXRoaW5nIGVsc2UgaW4gdGhlIGNvbXBhcmF0b3IsXG4vLyBhbmQgJycgbWVhbnMgXCJhbnkgdmVyc2lvblwiLCBqdXN0IHJlbW92ZSB0aGUgKnMgZW50aXJlbHkuXG5mdW5jdGlvbiByZXBsYWNlU3RhcnMoY29tcCwgbG9vc2UpIHtcbiAgZGVidWcoJ3JlcGxhY2VTdGFycycsIGNvbXAsIGxvb3NlKTtcbiAgLy8gTG9vc2VuZXNzIGlzIGlnbm9yZWQgaGVyZS4gIHN0YXIgaXMgYWx3YXlzIGFzIGxvb3NlIGFzIGl0IGdldHMhXG4gIHJldHVybiBjb21wLnRyaW0oKS5yZXBsYWNlKHJlW1NUQVJdLCAnJyk7XG59XG5cbi8vIFRoaXMgZnVuY3Rpb24gaXMgcGFzc2VkIHRvIHN0cmluZy5yZXBsYWNlKHJlW0hZUEhFTlJBTkdFXSlcbi8vIE0sIG0sIHBhdGNoLCBwcmVyZWxlYXNlLCBidWlsZFxuLy8gMS4yIC0gMy40LjUgPT4gPj0xLjIuMCA8PTMuNC41XG4vLyAxLjIuMyAtIDMuNCA9PiA+PTEuMi4wIDwzLjUuMCBBbnkgMy40Lnggd2lsbCBkb1xuLy8gMS4yIC0gMy40ID0+ID49MS4yLjAgPDMuNS4wXG5mdW5jdGlvbiBoeXBoZW5SZXBsYWNlKCQwLFxuICAgICAgICAgICAgICAgICAgICAgICBmcm9tLCBmTSwgZm0sIGZwLCBmcHIsIGZiLFxuICAgICAgICAgICAgICAgICAgICAgICB0bywgdE0sIHRtLCB0cCwgdHByLCB0Yikge1xuXG4gIGlmIChpc1goZk0pKVxuICAgIGZyb20gPSAnJztcbiAgZWxzZSBpZiAoaXNYKGZtKSlcbiAgICBmcm9tID0gJz49JyArIGZNICsgJy4wLjAnO1xuICBlbHNlIGlmIChpc1goZnApKVxuICAgIGZyb20gPSAnPj0nICsgZk0gKyAnLicgKyBmbSArICcuMCc7XG4gIGVsc2VcbiAgICBmcm9tID0gJz49JyArIGZyb207XG5cbiAgaWYgKGlzWCh0TSkpXG4gICAgdG8gPSAnJztcbiAgZWxzZSBpZiAoaXNYKHRtKSlcbiAgICB0byA9ICc8JyArICgrdE0gKyAxKSArICcuMC4wJztcbiAgZWxzZSBpZiAoaXNYKHRwKSlcbiAgICB0byA9ICc8JyArIHRNICsgJy4nICsgKCt0bSArIDEpICsgJy4wJztcbiAgZWxzZSBpZiAodHByKVxuICAgIHRvID0gJzw9JyArIHRNICsgJy4nICsgdG0gKyAnLicgKyB0cCArICctJyArIHRwcjtcbiAgZWxzZVxuICAgIHRvID0gJzw9JyArIHRvO1xuXG4gIHJldHVybiAoZnJvbSArICcgJyArIHRvKS50cmltKCk7XG59XG5cblxuLy8gaWYgQU5ZIG9mIHRoZSBzZXRzIG1hdGNoIEFMTCBvZiBpdHMgY29tcGFyYXRvcnMsIHRoZW4gcGFzc1xuUmFuZ2UucHJvdG90eXBlLnRlc3QgPSBmdW5jdGlvbih2ZXJzaW9uKSB7XG4gIGlmICghdmVyc2lvbilcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKHR5cGVvZiB2ZXJzaW9uID09PSAnc3RyaW5nJylcbiAgICB2ZXJzaW9uID0gbmV3IFNlbVZlcih2ZXJzaW9uLCB0aGlzLmxvb3NlKTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuc2V0Lmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHRlc3RTZXQodGhpcy5zZXRbaV0sIHZlcnNpb24pKVxuICAgICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuZnVuY3Rpb24gdGVzdFNldChzZXQsIHZlcnNpb24pIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZXQubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoIXNldFtpXS50ZXN0KHZlcnNpb24pKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKHZlcnNpb24ucHJlcmVsZWFzZS5sZW5ndGgpIHtcbiAgICAvLyBGaW5kIHRoZSBzZXQgb2YgdmVyc2lvbnMgdGhhdCBhcmUgYWxsb3dlZCB0byBoYXZlIHByZXJlbGVhc2VzXG4gICAgLy8gRm9yIGV4YW1wbGUsIF4xLjIuMy1wci4xIGRlc3VnYXJzIHRvID49MS4yLjMtcHIuMSA8Mi4wLjBcbiAgICAvLyBUaGF0IHNob3VsZCBhbGxvdyBgMS4yLjMtcHIuMmAgdG8gcGFzcy5cbiAgICAvLyBIb3dldmVyLCBgMS4yLjQtYWxwaGEubm90cmVhZHlgIHNob3VsZCBOT1QgYmUgYWxsb3dlZCxcbiAgICAvLyBldmVuIHRob3VnaCBpdCdzIHdpdGhpbiB0aGUgcmFuZ2Ugc2V0IGJ5IHRoZSBjb21wYXJhdG9ycy5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNldC5sZW5ndGg7IGkrKykge1xuICAgICAgZGVidWcoc2V0W2ldLnNlbXZlcik7XG4gICAgICBpZiAoc2V0W2ldLnNlbXZlciA9PT0gQU5ZKVxuICAgICAgICBjb250aW51ZTtcblxuICAgICAgaWYgKHNldFtpXS5zZW12ZXIucHJlcmVsZWFzZS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHZhciBhbGxvd2VkID0gc2V0W2ldLnNlbXZlcjtcbiAgICAgICAgaWYgKGFsbG93ZWQubWFqb3IgPT09IHZlcnNpb24ubWFqb3IgJiZcbiAgICAgICAgICAgIGFsbG93ZWQubWlub3IgPT09IHZlcnNpb24ubWlub3IgJiZcbiAgICAgICAgICAgIGFsbG93ZWQucGF0Y2ggPT09IHZlcnNpb24ucGF0Y2gpXG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gVmVyc2lvbiBoYXMgYSAtcHJlLCBidXQgaXQncyBub3Qgb25lIG9mIHRoZSBvbmVzIHdlIGxpa2UuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmV4cG9ydHMuc2F0aXNmaWVzID0gc2F0aXNmaWVzO1xuZnVuY3Rpb24gc2F0aXNmaWVzKHZlcnNpb24sIHJhbmdlLCBsb29zZSkge1xuICB0cnkge1xuICAgIHJhbmdlID0gbmV3IFJhbmdlKHJhbmdlLCBsb29zZSk7XG4gIH0gY2F0Y2ggKGVyKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiByYW5nZS50ZXN0KHZlcnNpb24pO1xufVxuXG5leHBvcnRzLm1heFNhdGlzZnlpbmcgPSBtYXhTYXRpc2Z5aW5nO1xuZnVuY3Rpb24gbWF4U2F0aXNmeWluZyh2ZXJzaW9ucywgcmFuZ2UsIGxvb3NlKSB7XG4gIHJldHVybiB2ZXJzaW9ucy5maWx0ZXIoZnVuY3Rpb24odmVyc2lvbikge1xuICAgIHJldHVybiBzYXRpc2ZpZXModmVyc2lvbiwgcmFuZ2UsIGxvb3NlKTtcbiAgfSkuc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgcmV0dXJuIHJjb21wYXJlKGEsIGIsIGxvb3NlKTtcbiAgfSlbMF0gfHwgbnVsbDtcbn1cblxuZXhwb3J0cy52YWxpZFJhbmdlID0gdmFsaWRSYW5nZTtcbmZ1bmN0aW9uIHZhbGlkUmFuZ2UocmFuZ2UsIGxvb3NlKSB7XG4gIHRyeSB7XG4gICAgLy8gUmV0dXJuICcqJyBpbnN0ZWFkIG9mICcnIHNvIHRoYXQgdHJ1dGhpbmVzcyB3b3Jrcy5cbiAgICAvLyBUaGlzIHdpbGwgdGhyb3cgaWYgaXQncyBpbnZhbGlkIGFueXdheVxuICAgIHJldHVybiBuZXcgUmFuZ2UocmFuZ2UsIGxvb3NlKS5yYW5nZSB8fCAnKic7XG4gIH0gY2F0Y2ggKGVyKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuLy8gRGV0ZXJtaW5lIGlmIHZlcnNpb24gaXMgbGVzcyB0aGFuIGFsbCB0aGUgdmVyc2lvbnMgcG9zc2libGUgaW4gdGhlIHJhbmdlXG5leHBvcnRzLmx0ciA9IGx0cjtcbmZ1bmN0aW9uIGx0cih2ZXJzaW9uLCByYW5nZSwgbG9vc2UpIHtcbiAgcmV0dXJuIG91dHNpZGUodmVyc2lvbiwgcmFuZ2UsICc8JywgbG9vc2UpO1xufVxuXG4vLyBEZXRlcm1pbmUgaWYgdmVyc2lvbiBpcyBncmVhdGVyIHRoYW4gYWxsIHRoZSB2ZXJzaW9ucyBwb3NzaWJsZSBpbiB0aGUgcmFuZ2UuXG5leHBvcnRzLmd0ciA9IGd0cjtcbmZ1bmN0aW9uIGd0cih2ZXJzaW9uLCByYW5nZSwgbG9vc2UpIHtcbiAgcmV0dXJuIG91dHNpZGUodmVyc2lvbiwgcmFuZ2UsICc+JywgbG9vc2UpO1xufVxuXG5leHBvcnRzLm91dHNpZGUgPSBvdXRzaWRlO1xuZnVuY3Rpb24gb3V0c2lkZSh2ZXJzaW9uLCByYW5nZSwgaGlsbywgbG9vc2UpIHtcbiAgdmVyc2lvbiA9IG5ldyBTZW1WZXIodmVyc2lvbiwgbG9vc2UpO1xuICByYW5nZSA9IG5ldyBSYW5nZShyYW5nZSwgbG9vc2UpO1xuXG4gIHZhciBndGZuLCBsdGVmbiwgbHRmbiwgY29tcCwgZWNvbXA7XG4gIHN3aXRjaCAoaGlsbykge1xuICAgIGNhc2UgJz4nOlxuICAgICAgZ3RmbiA9IGd0O1xuICAgICAgbHRlZm4gPSBsdGU7XG4gICAgICBsdGZuID0gbHQ7XG4gICAgICBjb21wID0gJz4nO1xuICAgICAgZWNvbXAgPSAnPj0nO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnPCc6XG4gICAgICBndGZuID0gbHQ7XG4gICAgICBsdGVmbiA9IGd0ZTtcbiAgICAgIGx0Zm4gPSBndDtcbiAgICAgIGNvbXAgPSAnPCc7XG4gICAgICBlY29tcCA9ICc8PSc7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignTXVzdCBwcm92aWRlIGEgaGlsbyB2YWwgb2YgXCI8XCIgb3IgXCI+XCInKTtcbiAgfVxuXG4gIC8vIElmIGl0IHNhdGlzaWZlcyB0aGUgcmFuZ2UgaXQgaXMgbm90IG91dHNpZGVcbiAgaWYgKHNhdGlzZmllcyh2ZXJzaW9uLCByYW5nZSwgbG9vc2UpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gRnJvbSBub3cgb24sIHZhcmlhYmxlIHRlcm1zIGFyZSBhcyBpZiB3ZSdyZSBpbiBcImd0clwiIG1vZGUuXG4gIC8vIGJ1dCBub3RlIHRoYXQgZXZlcnl0aGluZyBpcyBmbGlwcGVkIGZvciB0aGUgXCJsdHJcIiBmdW5jdGlvbi5cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHJhbmdlLnNldC5sZW5ndGg7ICsraSkge1xuICAgIHZhciBjb21wYXJhdG9ycyA9IHJhbmdlLnNldFtpXTtcblxuICAgIHZhciBoaWdoID0gbnVsbDtcbiAgICB2YXIgbG93ID0gbnVsbDtcblxuICAgIGNvbXBhcmF0b3JzLmZvckVhY2goZnVuY3Rpb24oY29tcGFyYXRvcikge1xuICAgICAgaWYgKGNvbXBhcmF0b3Iuc2VtdmVyID09PSBBTlkpIHtcbiAgICAgICAgY29tcGFyYXRvciA9IG5ldyBDb21wYXJhdG9yKCc+PTAuMC4wJylcbiAgICAgIH1cbiAgICAgIGhpZ2ggPSBoaWdoIHx8IGNvbXBhcmF0b3I7XG4gICAgICBsb3cgPSBsb3cgfHwgY29tcGFyYXRvcjtcbiAgICAgIGlmIChndGZuKGNvbXBhcmF0b3Iuc2VtdmVyLCBoaWdoLnNlbXZlciwgbG9vc2UpKSB7XG4gICAgICAgIGhpZ2ggPSBjb21wYXJhdG9yO1xuICAgICAgfSBlbHNlIGlmIChsdGZuKGNvbXBhcmF0b3Iuc2VtdmVyLCBsb3cuc2VtdmVyLCBsb29zZSkpIHtcbiAgICAgICAgbG93ID0gY29tcGFyYXRvcjtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIElmIHRoZSBlZGdlIHZlcnNpb24gY29tcGFyYXRvciBoYXMgYSBvcGVyYXRvciB0aGVuIG91ciB2ZXJzaW9uXG4gICAgLy8gaXNuJ3Qgb3V0c2lkZSBpdFxuICAgIGlmIChoaWdoLm9wZXJhdG9yID09PSBjb21wIHx8IGhpZ2gub3BlcmF0b3IgPT09IGVjb21wKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlIGxvd2VzdCB2ZXJzaW9uIGNvbXBhcmF0b3IgaGFzIGFuIG9wZXJhdG9yIGFuZCBvdXIgdmVyc2lvblxuICAgIC8vIGlzIGxlc3MgdGhhbiBpdCB0aGVuIGl0IGlzbid0IGhpZ2hlciB0aGFuIHRoZSByYW5nZVxuICAgIGlmICgoIWxvdy5vcGVyYXRvciB8fCBsb3cub3BlcmF0b3IgPT09IGNvbXApICYmXG4gICAgICAgIGx0ZWZuKHZlcnNpb24sIGxvdy5zZW12ZXIpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIGlmIChsb3cub3BlcmF0b3IgPT09IGVjb21wICYmIGx0Zm4odmVyc2lvbiwgbG93LnNlbXZlcikpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vc2VtdmVyL3NlbXZlci5qc1xuICoqLyIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxuXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBzZXRUaW1lb3V0KGRyYWluUXVldWUsIDApO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogKHdlYnBhY2spL34vbm9kZS1saWJzLWJyb3dzZXIvfi9wcm9jZXNzL2Jyb3dzZXIuanNcbiAqKi8iLCIvKipcbiAqIEBmaWxlT3ZlcnZpZXdcbiAqIFZpZXdNb2RlbCBDb25zdHJ1Y3RvciAmIGRlZmluaXRpb25cbiAqL1xuXG5pbXBvcnQge2V4dGVuZCwgdG9BcnJheX0gZnJvbSAnLi4vdXRpbCdcblxuaW1wb3J0ICogYXMgc2NvcGUgZnJvbSAnLi9pbnN0YW5jZS9zY29wZSdcbmltcG9ydCAqIGFzIGNvbXBpbGVyIGZyb20gJy4vY29tcGlsZXInXG5pbXBvcnQgKiBhcyBkaXJlY3RpdmUgZnJvbSAnLi9kaXJlY3RpdmUnXG5pbXBvcnQgKiBhcyBkb21IZWxwZXIgZnJvbSAnLi9kb20taGVscGVyJ1xuaW1wb3J0ICogYXMgZXZlbnRzIGZyb20gJy4vZXZlbnRzJ1xuLy8gaW1wb3J0ICogYXMgbW9kdWxlcyBmcm9tICcuLy4uL2FwaS9tb2R1bGVzJ1xuLy8gaW1wb3J0ICogYXMgYXBpIGZyb20gJy4vLi4vYXBpL2FwaSdcblxuaW1wb3J0IHtyZWdpc3Rlck1vZHVsZXMsIHJlZ2lzdGVyTWV0aG9kc30gZnJvbSAnLi4vYXBwL3JlZ2lzdGVyJ1xuXG5mdW5jdGlvbiBjYWxsT2xkUmVhZHlFbnRyeSh2bSwgY29tcG9uZW50KSB7XG4gIGlmIChjb21wb25lbnQubWV0aG9kcyAmJlxuICAgICAgY29tcG9uZW50Lm1ldGhvZHMucmVhZHkpIHtcbiAgICBjb21wb25lbnQubWV0aG9kcy5yZWFkeS5jYWxsKHZtKVxuICB9XG59XG5cbi8qKlxuICogVmlld01vZGVsIGNvbnN0cnVjdG9yXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAqIEBwYXJhbSB7b2JqZWN0fSBwYXJlbnRWbSAgIHdoaWNoIGNvbnRhaW5zIF9hcHBcbiAqIEBwYXJhbSB7b2JqZWN0fSBwYXJlbnRFbCAgIHJvb3QgZWxlbWVudCBvciBmcmFnIGJsb2NrXG4gKiBAcGFyYW0ge29iamVjdH0gbWVyZ2VkRGF0YSBleHRlcm5hbCBkYXRhXG4gKiBAcGFyYW0ge29iamVjdH0gZXh0ZXJuYWxFdmVudHMgZXh0ZXJuYWwgZXZlbnRzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFZtKFxuICB0eXBlLFxuICBwYXJlbnRWbSxcbiAgcGFyZW50RWwsXG4gIG1lcmdlZERhdGEsXG4gIGV4dGVybmFsRXZlbnRzXG4pIHtcbiAgdGhpcy5fcGFyZW50ID0gcGFyZW50Vm0uX3JlYWxQYXJlbnQgPyBwYXJlbnRWbS5fcmVhbFBhcmVudCA6IHBhcmVudFZtXG4gIHRoaXMuX2FwcCA9IHBhcmVudFZtLl9hcHBcbiAgcGFyZW50Vm0uX2NoaWxkcmVuVm1zICYmIHBhcmVudFZtLl9jaGlsZHJlblZtcy5wdXNoKHRoaXMpXG5cbiAgY29uc3QgY29tcG9uZW50ID0gdGhpcy5fYXBwLmN1c3RvbUNvbXBvbmVudE1hcFt0eXBlXSB8fCB7fVxuICBjb25zdCBkYXRhID0gY29tcG9uZW50LmRhdGEgfHwge31cblxuICB0aGlzLl9vcHRpb25zID0gY29tcG9uZW50XG4gIHRoaXMuX21ldGhvZHMgPSBjb21wb25lbnQubWV0aG9kcyB8fCB7fVxuICB0aGlzLl9jc3MgPSBjb21wb25lbnQuc3R5bGUgfHwge31cbiAgdGhpcy5faWRzID0ge31cbiAgdGhpcy5fd2F0Y2hlcnMgPSBbXVxuICB0aGlzLl92bUV2ZW50cyA9IHt9XG4gIHRoaXMuX2NoaWxkcmVuVm1zID0gW11cbiAgdGhpcy5fdHlwZSA9IHR5cGVcblxuICAvLyBiaW5kIGV2ZW50cyBhbmQgbGlmZWN5Y2xlc1xuICB0aGlzLl9pbml0RXZlbnRzKGV4dGVybmFsRXZlbnRzKVxuXG4gIHRoaXMuJGVtaXQoJ2hvb2s6aW5pdCcpXG4gIHRoaXMuX2luaXRlZCA9IHRydWVcbiAgLy8gcHJveHkgZGF0YSBhbmQgbWV0aG9kc1xuICAvLyBvYnNlcnZlIGRhdGEgYW5kIGFkZCB0aGlzIHRvIHZtc1xuICB0aGlzLl9kYXRhID0gdHlwZW9mIGRhdGEgPT09ICdmdW5jdGlvbicgPyBkYXRhKCkgOiBkYXRhXG4gIGlmIChtZXJnZWREYXRhKSB7XG4gICAgZXh0ZW5kKHRoaXMuX2RhdGEsIG1lcmdlZERhdGEpXG4gIH1cbiAgdGhpcy5faW5pdFNjb3BlKClcblxuICB0aGlzLiRlbWl0KCdob29rOmNyZWF0ZWQnKVxuICB0aGlzLl9jcmVhdGVkID0gdHJ1ZVxuICAvLyBiYWNrd2FyZCBvbGQgcmVhZHkgZW50cnlcbiAgY2FsbE9sZFJlYWR5RW50cnkodGhpcywgY29tcG9uZW50KVxuXG4gIC8vIGlmIG5vIHBhcmVudEVsZW1lbnQgdGhlbiBzcGVjaWZ5IHRoZSBkb2N1bWVudEVsZW1lbnRcbiAgdGhpcy5fcGFyZW50RWwgPSBwYXJlbnRFbCB8fCB0aGlzLl9hcHAuZG9jLmRvY3VtZW50RWxlbWVudFxuICB0aGlzLl9idWlsZCgpXG59XG5cbmV4dGVuZChWbS5wcm90b3R5cGUsIHNjb3BlLCBjb21waWxlciwgZGlyZWN0aXZlLCBkb21IZWxwZXIsIGV2ZW50cylcbmV4dGVuZChWbSwge1xuICByZWdpc3Rlck1vZHVsZXMsXG4gIHJlZ2lzdGVyTWV0aG9kc1xufSlcbi8vIFZtLnJlZ2lzdGVyTW9kdWxlcyhtb2R1bGVzKVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9saWIvdm0vaW5kZXguanNcbiAqKi8iLCJ2YXIgXyA9IHJlcXVpcmUoJy4uL3V0aWwnKVxudmFyIE9ic2VydmVyID0gcmVxdWlyZSgnLi4vb2JzZXJ2ZXInKVxudmFyIERlcCA9IHJlcXVpcmUoJy4uL29ic2VydmVyL2RlcCcpXG5cbi8qKlxuICogU2V0dXAgdGhlIHNjb3BlIG9mIGFuIGluc3RhbmNlLCB3aGljaCBjb250YWluczpcbiAqIC0gb2JzZXJ2ZWQgZGF0YVxuICogLSBjb21wdXRlZCBwcm9wZXJ0aWVzXG4gKiAtIHVzZXIgbWV0aG9kc1xuICogLSBtZXRhIHByb3BlcnRpZXNcbiAqL1xuXG5leHBvcnRzLl9pbml0U2NvcGUgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuX2luaXREYXRhKClcbiAgLy8gdGhpcy5faW5pdENvbXB1dGVkKClcbiAgdGhpcy5faW5pdE1ldGhvZHMoKVxuICAvLyB0aGlzLl9pbml0TWV0YSgpXG59XG5cbi8qKlxuICogSW5pdGlhbGl6ZSB0aGUgZGF0YS4gXG4gKi9cblxuZXhwb3J0cy5faW5pdERhdGEgPSBmdW5jdGlvbiAoKSB7XG4gIC8vIHByb3h5IGRhdGEgb24gaW5zdGFuY2VcbiAgdmFyIGRhdGEgPSB0aGlzLl9kYXRhXG4gIHZhciBpLCBrZXlcbiAgLy8gLy8gbWFrZSBzdXJlIGFsbCBwcm9wcyBwcm9wZXJ0aWVzIGFyZSBvYnNlcnZlZFxuICAvLyB2YXIgcHJvcHMgPSB0aGlzLiRvcHRpb25zLnByb3BzXG4gIC8vIGlmIChwcm9wcykge1xuICAvLyAgIGkgPSBwcm9wcy5sZW5ndGhcbiAgLy8gICB3aGlsZSAoaS0tKSB7XG4gIC8vICAgICBrZXkgPSBfLmNhbWVsaXplKHByb3BzW2ldKVxuICAvLyAgICAgaWYgKCEoa2V5IGluIGRhdGEpKSB7XG4gIC8vICAgICAgIGRhdGFba2V5XSA9IG51bGxcbiAgLy8gICAgIH1cbiAgLy8gICB9XG4gIC8vIH1cbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhkYXRhKVxuICBpID0ga2V5cy5sZW5ndGhcbiAgd2hpbGUgKGktLSkge1xuICAgIGtleSA9IGtleXNbaV1cbiAgICBpZiAoIV8uaXNSZXNlcnZlZChrZXkpKSB7XG4gICAgICB0aGlzLl9wcm94eShrZXkpXG4gICAgfVxuICB9XG4gIC8vIG9ic2VydmUgZGF0YVxuICBPYnNlcnZlci5jcmVhdGUoZGF0YSkuYWRkVm0odGhpcylcbn1cblxuLy8gLyoqXG4vLyAgKiBTd2FwIHRoZSBpc250YW5jZSdzICRkYXRhLiBDYWxsZWQgaW4gJGRhdGEncyBzZXR0ZXIuXG4vLyAgKlxuLy8gICogQHBhcmFtIHtPYmplY3R9IG5ld0RhdGFcbi8vICAqL1xuXG4vLyBleHBvcnRzLl9zZXREYXRhID0gZnVuY3Rpb24gKG5ld0RhdGEpIHtcbi8vICAgbmV3RGF0YSA9IG5ld0RhdGEgfHwge31cbi8vICAgdmFyIG9sZERhdGEgPSB0aGlzLl9kYXRhXG4vLyAgIHRoaXMuX2RhdGEgPSBuZXdEYXRhXG4vLyAgIHZhciBrZXlzLCBrZXksIGlcbi8vICAgLy8gdW5wcm94eSBrZXlzIG5vdCBwcmVzZW50IGluIG5ldyBkYXRhXG4vLyAgIGtleXMgPSBPYmplY3Qua2V5cyhvbGREYXRhKVxuLy8gICBpID0ga2V5cy5sZW5ndGhcbi8vICAgd2hpbGUgKGktLSkge1xuLy8gICAgIGtleSA9IGtleXNbaV1cbi8vICAgICBpZiAoIV8uaXNSZXNlcnZlZChrZXkpICYmICEoa2V5IGluIG5ld0RhdGEpKSB7XG4vLyAgICAgICB0aGlzLl91bnByb3h5KGtleSlcbi8vICAgICB9XG4vLyAgIH1cbi8vICAgLy8gcHJveHkga2V5cyBub3QgYWxyZWFkeSBwcm94aWVkLFxuLy8gICAvLyBhbmQgdHJpZ2dlciBjaGFuZ2UgZm9yIGNoYW5nZWQgdmFsdWVzXG4vLyAgIGtleXMgPSBPYmplY3Qua2V5cyhuZXdEYXRhKVxuLy8gICBpID0ga2V5cy5sZW5ndGhcbi8vICAgd2hpbGUgKGktLSkge1xuLy8gICAgIGtleSA9IGtleXNbaV1cbi8vICAgICBpZiAoIXRoaXMuaGFzT3duUHJvcGVydHkoa2V5KSAmJiAhXy5pc1Jlc2VydmVkKGtleSkpIHtcbi8vICAgICAgIC8vIG5ldyBwcm9wZXJ0eVxuLy8gICAgICAgdGhpcy5fcHJveHkoa2V5KVxuLy8gICAgIH1cbi8vICAgfVxuLy8gICBvbGREYXRhLl9fb2JfXy5yZW1vdmVWbSh0aGlzKVxuLy8gICBPYnNlcnZlci5jcmVhdGUobmV3RGF0YSkuYWRkVm0odGhpcylcbi8vICAgdGhpcy5fZGlnZXN0KClcbi8vIH1cblxuLyoqXG4gKiBQcm94eSBhIHByb3BlcnR5LCBzbyB0aGF0XG4gKiB2bS5wcm9wID09PSB2bS5fZGF0YS5wcm9wXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICovXG5cbmV4cG9ydHMuX3Byb3h5ID0gZnVuY3Rpb24gKGtleSkge1xuICAvLyBuZWVkIHRvIHN0b3JlIHJlZiB0byBzZWxmIGhlcmVcbiAgLy8gYmVjYXVzZSB0aGVzZSBnZXR0ZXIvc2V0dGVycyBtaWdodFxuICAvLyBiZSBjYWxsZWQgYnkgY2hpbGQgaW5zdGFuY2VzIVxuICB2YXIgc2VsZiA9IHRoaXNcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHNlbGYsIGtleSwge1xuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24gcHJveHlHZXR0ZXIgKCkge1xuICAgICAgcmV0dXJuIHNlbGYuX2RhdGFba2V5XVxuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbiBwcm94eVNldHRlciAodmFsKSB7XG4gICAgICBzZWxmLl9kYXRhW2tleV0gPSB2YWxcbiAgICB9XG4gIH0pXG59XG5cbi8qKlxuICogVW5wcm94eSBhIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAqL1xuXG5leHBvcnRzLl91bnByb3h5ID0gZnVuY3Rpb24gKGtleSkge1xuICBkZWxldGUgdGhpc1trZXldXG59XG5cbi8vIC8qKlxuLy8gICogRm9yY2UgdXBkYXRlIG9uIGV2ZXJ5IHdhdGNoZXIgaW4gc2NvcGUuXG4vLyAgKi9cblxuLy8gZXhwb3J0cy5fZGlnZXN0ID0gZnVuY3Rpb24gKCkge1xuLy8gICB2YXIgaSA9IHRoaXMuX3dhdGNoZXJzLmxlbmd0aFxuLy8gICB3aGlsZSAoaS0tKSB7XG4vLyAgICAgdGhpcy5fd2F0Y2hlcnNbaV0udXBkYXRlKClcbi8vICAgfVxuLy8gICB2YXIgY2hpbGRyZW4gPSB0aGlzLl9jaGlsZHJlblxuLy8gICBpID0gY2hpbGRyZW4ubGVuZ3RoXG4vLyAgIHdoaWxlIChpLS0pIHtcbi8vICAgICB2YXIgY2hpbGQgPSBjaGlsZHJlbltpXVxuLy8gICAgIGlmIChjaGlsZC4kb3B0aW9ucy5pbmhlcml0KSB7XG4vLyAgICAgICBjaGlsZC5fZGlnZXN0KClcbi8vICAgICB9XG4vLyAgIH1cbi8vIH1cblxuLy8gLyoqXG4vLyAgKiBTZXR1cCBjb21wdXRlZCBwcm9wZXJ0aWVzLiBUaGV5IGFyZSBlc3NlbnRpYWxseVxuLy8gICogc3BlY2lhbCBnZXR0ZXIvc2V0dGVyc1xuLy8gICovXG5cbi8vIGZ1bmN0aW9uIG5vb3AgKCkge31cbi8vIGV4cG9ydHMuX2luaXRDb21wdXRlZCA9IGZ1bmN0aW9uICgpIHtcbi8vICAgdmFyIGNvbXB1dGVkID0gdGhpcy4kb3B0aW9ucy5jb21wdXRlZFxuLy8gICBpZiAoY29tcHV0ZWQpIHtcbi8vICAgICBmb3IgKHZhciBrZXkgaW4gY29tcHV0ZWQpIHtcbi8vICAgICAgIHZhciB1c2VyRGVmID0gY29tcHV0ZWRba2V5XVxuLy8gICAgICAgdmFyIGRlZiA9IHtcbi8vICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbi8vICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4vLyAgICAgICB9XG4vLyAgICAgICBpZiAodHlwZW9mIHVzZXJEZWYgPT09ICdmdW5jdGlvbicpIHtcbi8vICAgICAgICAgZGVmLmdldCA9IF8uYmluZCh1c2VyRGVmLCB0aGlzKVxuLy8gICAgICAgICBkZWYuc2V0ID0gbm9vcFxuLy8gICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgZGVmLmdldCA9IHVzZXJEZWYuZ2V0XG4vLyAgICAgICAgICAgPyBfLmJpbmQodXNlckRlZi5nZXQsIHRoaXMpXG4vLyAgICAgICAgICAgOiBub29wXG4vLyAgICAgICAgIGRlZi5zZXQgPSB1c2VyRGVmLnNldFxuLy8gICAgICAgICAgID8gXy5iaW5kKHVzZXJEZWYuc2V0LCB0aGlzKVxuLy8gICAgICAgICAgIDogbm9vcFxuLy8gICAgICAgfVxuLy8gICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIGtleSwgZGVmKVxuLy8gICAgIH1cbi8vICAgfVxuLy8gfVxuXG4vKipcbiAqIFNldHVwIGluc3RhbmNlIG1ldGhvZHMuIE1ldGhvZHMgbXVzdCBiZSBib3VuZCB0byB0aGVcbiAqIGluc3RhbmNlIHNpbmNlIHRoZXkgbWlnaHQgYmUgY2FsbGVkIGJ5IGNoaWxkcmVuXG4gKiBpbmhlcml0aW5nIHRoZW0uXG4gKi9cblxuZXhwb3J0cy5faW5pdE1ldGhvZHMgPSBmdW5jdGlvbiAoKSB7XG4gIC8vIHZhciBtZXRob2RzID0gdGhpcy4kb3B0aW9ucy5tZXRob2RzXG4gIHZhciBtZXRob2RzID0gdGhpcy5fbWV0aG9kc1xuICBpZiAobWV0aG9kcykge1xuICAgIGZvciAodmFyIGtleSBpbiBtZXRob2RzKSB7XG4gICAgICB0aGlzW2tleV0gPSBfLmJpbmQobWV0aG9kc1trZXldLCB0aGlzKVxuICAgIH1cbiAgfVxufVxuXG4vLyAvKipcbi8vICAqIEluaXRpYWxpemUgbWV0YSBpbmZvcm1hdGlvbiBsaWtlICRpbmRleCwgJGtleSAmICR2YWx1ZS5cbi8vICAqL1xuXG4vLyBleHBvcnRzLl9pbml0TWV0YSA9IGZ1bmN0aW9uICgpIHtcbi8vICAgdmFyIG1ldGFzID0gdGhpcy4kb3B0aW9ucy5fbWV0YVxuLy8gICBpZiAobWV0YXMpIHtcbi8vICAgICBmb3IgKHZhciBrZXkgaW4gbWV0YXMpIHtcbi8vICAgICAgIHRoaXMuX2RlZmluZU1ldGEoa2V5LCBtZXRhc1trZXldKVxuLy8gICAgIH1cbi8vICAgfVxuLy8gfVxuXG4vLyAvKipcbi8vICAqIERlZmluZSBhIG1ldGEgcHJvcGVydHksIGUuZyAkaW5kZXgsICRrZXksICR2YWx1ZVxuLy8gICogd2hpY2ggb25seSBleGlzdHMgb24gdGhlIHZtIGluc3RhbmNlIGJ1dCBub3QgaW4gJGRhdGEuXG4vLyAgKlxuLy8gICogQHBhcmFtIHtTdHJpbmd9IGtleVxuLy8gICogQHBhcmFtIHsqfSB2YWx1ZVxuLy8gICovXG5cbi8vIGV4cG9ydHMuX2RlZmluZU1ldGEgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuLy8gICB2YXIgZGVwID0gbmV3IERlcCgpXG4vLyAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBrZXksIHtcbi8vICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuLy8gICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbi8vICAgICBnZXQ6IGZ1bmN0aW9uIG1ldGFHZXR0ZXIgKCkge1xuLy8gICAgICAgaWYgKE9ic2VydmVyLnRhcmdldCkge1xuLy8gICAgICAgICBPYnNlcnZlci50YXJnZXQuYWRkRGVwKGRlcClcbi8vICAgICAgIH1cbi8vICAgICAgIHJldHVybiB2YWx1ZVxuLy8gICAgIH0sXG4vLyAgICAgc2V0OiBmdW5jdGlvbiBtZXRhU2V0dGVyICh2YWwpIHtcbi8vICAgICAgIGlmICh2YWwgIT09IHZhbHVlKSB7XG4vLyAgICAgICAgIHZhbHVlID0gdmFsXG4vLyAgICAgICAgIGRlcC5ub3RpZnkoKVxuLy8gICAgICAgfVxuLy8gICAgIH1cbi8vICAgfSlcbi8vIH1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vbGliL3ZtL2luc3RhbmNlL3Njb3BlLmpzXG4gKiovIiwiLy8gcmVxdWlyZWQgZm9yIGNvZGUgaW4gaW5zdGFuY2Uvb2JzZXJ2ZXJcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vdXRpbCcpXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9saWIvdm0vdXRpbC5qc1xuICoqLyIsInZhciBfID0gcmVxdWlyZSgnLi4vdXRpbCcpXG52YXIgY29uZmlnID0gcmVxdWlyZSgnLi4vY29uZmlnJylcbnZhciBEZXAgPSByZXF1aXJlKCcuL2RlcCcpXG52YXIgYXJyYXlNZXRob2RzID0gcmVxdWlyZSgnLi9hcnJheScpXG52YXIgYXJyYXlLZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoYXJyYXlNZXRob2RzKVxucmVxdWlyZSgnLi9vYmplY3QnKVxuXG52YXIgdWlkID0gMFxuXG4vKipcbiAqIFR5cGUgZW51bXNcbiAqL1xuXG52YXIgQVJSQVkgID0gMFxudmFyIE9CSkVDVCA9IDFcblxuLyoqXG4gKiBBdWdtZW50IGFuIHRhcmdldCBPYmplY3Qgb3IgQXJyYXkgYnkgaW50ZXJjZXB0aW5nXG4gKiB0aGUgcHJvdG90eXBlIGNoYWluIHVzaW5nIF9fcHJvdG9fX1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fSB0YXJnZXRcbiAqIEBwYXJhbSB7T2JqZWN0fSBwcm90b1xuICovXG5cbmZ1bmN0aW9uIHByb3RvQXVnbWVudCAodGFyZ2V0LCBzcmMpIHtcbiAgdGFyZ2V0Ll9fcHJvdG9fXyA9IHNyY1xufVxuXG4vKipcbiAqIEF1Z21lbnQgYW4gdGFyZ2V0IE9iamVjdCBvciBBcnJheSBieSBkZWZpbmluZ1xuICogaGlkZGVuIHByb3BlcnRpZXMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R8QXJyYXl9IHRhcmdldFxuICogQHBhcmFtIHtPYmplY3R9IHByb3RvXG4gKi9cblxuZnVuY3Rpb24gY29weUF1Z21lbnQgKHRhcmdldCwgc3JjLCBrZXlzKSB7XG4gIHZhciBpID0ga2V5cy5sZW5ndGhcbiAgdmFyIGtleVxuICB3aGlsZSAoaS0tKSB7XG4gICAga2V5ID0ga2V5c1tpXVxuICAgIF8uZGVmaW5lKHRhcmdldCwga2V5LCBzcmNba2V5XSlcbiAgfVxufVxuXG4vKipcbiAqIE9ic2VydmVyIGNsYXNzIHRoYXQgYXJlIGF0dGFjaGVkIHRvIGVhY2ggb2JzZXJ2ZWRcbiAqIG9iamVjdC4gT25jZSBhdHRhY2hlZCwgdGhlIG9ic2VydmVyIGNvbnZlcnRzIHRhcmdldFxuICogb2JqZWN0J3MgcHJvcGVydHkga2V5cyBpbnRvIGdldHRlci9zZXR0ZXJzIHRoYXRcbiAqIGNvbGxlY3QgZGVwZW5kZW5jaWVzIGFuZCBkaXNwYXRjaGVzIHVwZGF0ZXMuXG4gKlxuICogQHBhcmFtIHtBcnJheXxPYmplY3R9IHZhbHVlXG4gKiBAcGFyYW0ge051bWJlcn0gdHlwZVxuICogQGNvbnN0cnVjdG9yXG4gKi9cblxuZnVuY3Rpb24gT2JzZXJ2ZXIgKHZhbHVlLCB0eXBlKSB7XG4gIHRoaXMuaWQgPSArK3VpZFxuICB0aGlzLnZhbHVlID0gdmFsdWVcbiAgdGhpcy5hY3RpdmUgPSB0cnVlXG4gIHRoaXMuZGVwcyA9IFtdXG4gIF8uZGVmaW5lKHZhbHVlLCAnX19vYl9fJywgdGhpcylcbiAgaWYgKHR5cGUgPT09IEFSUkFZKSB7XG4gICAgdmFyIGF1Z21lbnQgPSBjb25maWcucHJvdG8gJiYgXy5oYXNQcm90b1xuICAgICAgPyBwcm90b0F1Z21lbnRcbiAgICAgIDogY29weUF1Z21lbnRcbiAgICBhdWdtZW50KHZhbHVlLCBhcnJheU1ldGhvZHMsIGFycmF5S2V5cylcbiAgICB0aGlzLm9ic2VydmVBcnJheSh2YWx1ZSlcbiAgfSBlbHNlIGlmICh0eXBlID09PSBPQkpFQ1QpIHtcbiAgICB0aGlzLndhbGsodmFsdWUpXG4gIH1cbn1cblxuT2JzZXJ2ZXIudGFyZ2V0ID0gbnVsbFxuXG52YXIgcCA9IE9ic2VydmVyLnByb3RvdHlwZVxuXG4vKipcbiAqIEF0dGVtcHQgdG8gY3JlYXRlIGFuIG9ic2VydmVyIGluc3RhbmNlIGZvciBhIHZhbHVlLFxuICogcmV0dXJucyB0aGUgbmV3IG9ic2VydmVyIGlmIHN1Y2Nlc3NmdWxseSBvYnNlcnZlZCxcbiAqIG9yIHRoZSBleGlzdGluZyBvYnNlcnZlciBpZiB0aGUgdmFsdWUgYWxyZWFkeSBoYXMgb25lLlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAqIEByZXR1cm4ge09ic2VydmVyfHVuZGVmaW5lZH1cbiAqIEBzdGF0aWNcbiAqL1xuXG5PYnNlcnZlci5jcmVhdGUgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgaWYgKFxuICAgIHZhbHVlICYmXG4gICAgdmFsdWUuaGFzT3duUHJvcGVydHkoJ19fb2JfXycpICYmXG4gICAgdmFsdWUuX19vYl9fIGluc3RhbmNlb2YgT2JzZXJ2ZXJcbiAgKSB7XG4gICAgcmV0dXJuIHZhbHVlLl9fb2JfX1xuICB9IGVsc2UgaWYgKF8uaXNBcnJheSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmVyKHZhbHVlLCBBUlJBWSlcbiAgfSBlbHNlIGlmIChcbiAgICBfLmlzUGxhaW5PYmplY3QodmFsdWUpICYmXG4gICAgIXZhbHVlLl9pc1Z1ZSAvLyBhdm9pZCBWdWUgaW5zdGFuY2VcbiAgKSB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZlcih2YWx1ZSwgT0JKRUNUKVxuICB9XG59XG5cbi8qKlxuICogV2FsayB0aHJvdWdoIGVhY2ggcHJvcGVydHkgYW5kIGNvbnZlcnQgdGhlbSBpbnRvXG4gKiBnZXR0ZXIvc2V0dGVycy4gVGhpcyBtZXRob2Qgc2hvdWxkIG9ubHkgYmUgY2FsbGVkIHdoZW5cbiAqIHZhbHVlIHR5cGUgaXMgT2JqZWN0LiBQcm9wZXJ0aWVzIHByZWZpeGVkIHdpdGggYCRgIG9yIGBfYFxuICogYW5kIGFjY2Vzc29yIHByb3BlcnRpZXMgYXJlIGlnbm9yZWQuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICovXG5cbnAud2FsayA9IGZ1bmN0aW9uIChvYmopIHtcbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmopXG4gIHZhciBpID0ga2V5cy5sZW5ndGhcbiAgdmFyIGtleSwgcHJlZml4XG4gIHdoaWxlIChpLS0pIHtcbiAgICBrZXkgPSBrZXlzW2ldXG4gICAgcHJlZml4ID0ga2V5LmNoYXJDb2RlQXQoMClcbiAgICBpZiAocHJlZml4ICE9PSAweDI0ICYmIHByZWZpeCAhPT0gMHg1RikgeyAvLyBza2lwICQgb3IgX1xuICAgICAgdGhpcy5jb252ZXJ0KGtleSwgb2JqW2tleV0pXG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogVHJ5IHRvIGNhcmV0ZSBhbiBvYnNlcnZlciBmb3IgYSBjaGlsZCB2YWx1ZSxcbiAqIGFuZCBpZiB2YWx1ZSBpcyBhcnJheSwgbGluayBkZXAgdG8gdGhlIGFycmF5LlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsXG4gKiBAcmV0dXJuIHtEZXB8dW5kZWZpbmVkfVxuICovXG5cbnAub2JzZXJ2ZSA9IGZ1bmN0aW9uICh2YWwpIHtcbiAgcmV0dXJuIE9ic2VydmVyLmNyZWF0ZSh2YWwpXG59XG5cbi8qKlxuICogT2JzZXJ2ZSBhIGxpc3Qgb2YgQXJyYXkgaXRlbXMuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gaXRlbXNcbiAqL1xuXG5wLm9ic2VydmVBcnJheSA9IGZ1bmN0aW9uIChpdGVtcykge1xuICB2YXIgaSA9IGl0ZW1zLmxlbmd0aFxuICB3aGlsZSAoaS0tKSB7XG4gICAgdGhpcy5vYnNlcnZlKGl0ZW1zW2ldKVxuICB9XG59XG5cbi8qKlxuICogQ29udmVydCBhIHByb3BlcnR5IGludG8gZ2V0dGVyL3NldHRlciBzbyB3ZSBjYW4gZW1pdFxuICogdGhlIGV2ZW50cyB3aGVuIHRoZSBwcm9wZXJ0eSBpcyBhY2Nlc3NlZC9jaGFuZ2VkLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAqIEBwYXJhbSB7Kn0gdmFsXG4gKi9cblxucC5jb252ZXJ0ID0gZnVuY3Rpb24gKGtleSwgdmFsKSB7XG4gIHZhciBvYiA9IHRoaXNcbiAgdmFyIGNoaWxkT2IgPSBvYi5vYnNlcnZlKHZhbClcbiAgdmFyIGRlcCA9IG5ldyBEZXAoKVxuICBpZiAoY2hpbGRPYikge1xuICAgIGNoaWxkT2IuZGVwcy5wdXNoKGRlcClcbiAgfVxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2IudmFsdWUsIGtleSwge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgLy8gT2JzZXJ2ZXIudGFyZ2V0IGlzIGEgd2F0Y2hlciB3aG9zZSBnZXR0ZXIgaXNcbiAgICAgIC8vIGN1cnJlbnRseSBiZWluZyBldmFsdWF0ZWQuXG4gICAgICBpZiAob2IuYWN0aXZlICYmIE9ic2VydmVyLnRhcmdldCkge1xuICAgICAgICBPYnNlcnZlci50YXJnZXQuYWRkRGVwKGRlcClcbiAgICAgIH1cbiAgICAgIHJldHVybiB2YWxcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24gKG5ld1ZhbCkge1xuICAgICAgaWYgKG5ld1ZhbCA9PT0gdmFsKSByZXR1cm5cbiAgICAgIC8vIHJlbW92ZSBkZXAgZnJvbSBvbGQgdmFsdWVcbiAgICAgIHZhciBvbGRDaGlsZE9iID0gdmFsICYmIHZhbC5fX29iX19cbiAgICAgIGlmIChvbGRDaGlsZE9iKSB7XG4gICAgICAgIG9sZENoaWxkT2IuZGVwcy4kcmVtb3ZlKGRlcClcbiAgICAgIH1cbiAgICAgIHZhbCA9IG5ld1ZhbFxuICAgICAgLy8gYWRkIGRlcCB0byBuZXcgdmFsdWVcbiAgICAgIHZhciBuZXdDaGlsZE9iID0gb2Iub2JzZXJ2ZShuZXdWYWwpXG4gICAgICBpZiAobmV3Q2hpbGRPYikge1xuICAgICAgICBuZXdDaGlsZE9iLmRlcHMucHVzaChkZXApXG4gICAgICB9XG4gICAgICBkZXAubm90aWZ5KClcbiAgICB9XG4gIH0pXG59XG5cbi8qKlxuICogTm90aWZ5IGNoYW5nZSBvbiBhbGwgc2VsZiBkZXBzIG9uIGFuIG9ic2VydmVyLlxuICogVGhpcyBpcyBjYWxsZWQgd2hlbiBhIG11dGFibGUgdmFsdWUgbXV0YXRlcy4gZS5nLlxuICogd2hlbiBhbiBBcnJheSdzIG11dGF0aW5nIG1ldGhvZHMgYXJlIGNhbGxlZCwgb3IgYW5cbiAqIE9iamVjdCdzICRhZGQvJGRlbGV0ZSBhcmUgY2FsbGVkLlxuICovXG5cbnAubm90aWZ5ID0gZnVuY3Rpb24gKCkge1xuICB2YXIgZGVwcyA9IHRoaXMuZGVwc1xuICBmb3IgKHZhciBpID0gMCwgbCA9IGRlcHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgZGVwc1tpXS5ub3RpZnkoKVxuICB9XG59XG5cbi8qKlxuICogQWRkIGFuIG93bmVyIHZtLCBzbyB0aGF0IHdoZW4gJGFkZC8kZGVsZXRlIG11dGF0aW9uc1xuICogaGFwcGVuIHdlIGNhbiBub3RpZnkgb3duZXIgdm1zIHRvIHByb3h5IHRoZSBrZXlzIGFuZFxuICogZGlnZXN0IHRoZSB3YXRjaGVycy4gVGhpcyBpcyBvbmx5IGNhbGxlZCB3aGVuIHRoZSBvYmplY3RcbiAqIGlzIG9ic2VydmVkIGFzIGFuIGluc3RhbmNlJ3Mgcm9vdCAkZGF0YS5cbiAqXG4gKiBAcGFyYW0ge1Z1ZX0gdm1cbiAqL1xuXG5wLmFkZFZtID0gZnVuY3Rpb24gKHZtKSB7XG4gICh0aGlzLnZtcyA9IHRoaXMudm1zIHx8IFtdKS5wdXNoKHZtKVxufVxuXG4vKipcbiAqIFJlbW92ZSBhbiBvd25lciB2bS4gVGhpcyBpcyBjYWxsZWQgd2hlbiB0aGUgb2JqZWN0IGlzXG4gKiBzd2FwcGVkIG91dCBhcyBhbiBpbnN0YW5jZSdzICRkYXRhIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge1Z1ZX0gdm1cbiAqL1xuXG5wLnJlbW92ZVZtID0gZnVuY3Rpb24gKHZtKSB7XG4gIHRoaXMudm1zLiRyZW1vdmUodm0pXG59XG5cbm1vZHVsZS5leHBvcnRzID0gT2JzZXJ2ZXJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vbGliL3ZtL29ic2VydmVyL2luZGV4LmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSB7cHJvdG86IHRydWV9XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2xpYi92bS9jb25maWcuanNcbiAqKi8iLCJ2YXIgXyA9IHJlcXVpcmUoJy4uL3V0aWwnKVxuXG4vKipcbiAqIEEgZGVwIGlzIGFuIG9ic2VydmFibGUgdGhhdCBjYW4gaGF2ZSBtdWx0aXBsZVxuICogZGlyZWN0aXZlcyBzdWJzY3JpYmluZyB0byBpdC5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuXG5mdW5jdGlvbiBEZXAgKCkge1xuICB0aGlzLnN1YnMgPSBbXVxufVxuXG52YXIgcCA9IERlcC5wcm90b3R5cGVcblxuLyoqXG4gKiBBZGQgYSBkaXJlY3RpdmUgc3Vic2NyaWJlci5cbiAqXG4gKiBAcGFyYW0ge0RpcmVjdGl2ZX0gc3ViXG4gKi9cblxucC5hZGRTdWIgPSBmdW5jdGlvbiAoc3ViKSB7XG4gIHRoaXMuc3Vicy5wdXNoKHN1Yilcbn1cblxuLyoqXG4gKiBSZW1vdmUgYSBkaXJlY3RpdmUgc3Vic2NyaWJlci5cbiAqXG4gKiBAcGFyYW0ge0RpcmVjdGl2ZX0gc3ViXG4gKi9cblxucC5yZW1vdmVTdWIgPSBmdW5jdGlvbiAoc3ViKSB7XG4gIHRoaXMuc3Vicy4kcmVtb3ZlKHN1Yilcbn1cblxuLyoqXG4gKiBOb3RpZnkgYWxsIHN1YnNjcmliZXJzIG9mIGEgbmV3IHZhbHVlLlxuICovXG5cbnAubm90aWZ5ID0gZnVuY3Rpb24gKCkge1xuICAvLyBzdGFibGl6ZSB0aGUgc3Vic2NyaWJlciBsaXN0IGZpcnN0XG4gIHZhciBzdWJzID0gXy50b0FycmF5KHRoaXMuc3VicylcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBzdWJzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIHN1YnNbaV0udXBkYXRlKClcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IERlcFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vbGliL3ZtL29ic2VydmVyL2RlcC5qc1xuICoqLyIsInZhciBfID0gcmVxdWlyZSgnLi4vdXRpbCcpXG52YXIgYXJyYXlQcm90byA9IEFycmF5LnByb3RvdHlwZVxudmFyIGFycmF5TWV0aG9kcyA9IE9iamVjdC5jcmVhdGUoYXJyYXlQcm90bylcblxuLyoqXG4gKiBJbnRlcmNlcHQgbXV0YXRpbmcgbWV0aG9kcyBhbmQgZW1pdCBldmVudHNcbiAqL1xuXG47W1xuICAncHVzaCcsXG4gICdwb3AnLFxuICAnc2hpZnQnLFxuICAndW5zaGlmdCcsXG4gICdzcGxpY2UnLFxuICAnc29ydCcsXG4gICdyZXZlcnNlJ1xuXVxuLmZvckVhY2goZnVuY3Rpb24gKG1ldGhvZCkge1xuICAvLyBjYWNoZSBvcmlnaW5hbCBtZXRob2RcbiAgdmFyIG9yaWdpbmFsID0gYXJyYXlQcm90b1ttZXRob2RdXG4gIF8uZGVmaW5lKGFycmF5TWV0aG9kcywgbWV0aG9kLCBmdW5jdGlvbiBtdXRhdG9yICgpIHtcbiAgICAvLyBhdm9pZCBsZWFraW5nIGFyZ3VtZW50czpcbiAgICAvLyBodHRwOi8vanNwZXJmLmNvbS9jbG9zdXJlLXdpdGgtYXJndW1lbnRzXG4gICAgdmFyIGkgPSBhcmd1bWVudHMubGVuZ3RoXG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoaSlcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2ldXG4gICAgfVxuICAgIHZhciByZXN1bHQgPSBvcmlnaW5hbC5hcHBseSh0aGlzLCBhcmdzKVxuICAgIHZhciBvYiA9IHRoaXMuX19vYl9fXG4gICAgdmFyIGluc2VydGVkXG4gICAgc3dpdGNoIChtZXRob2QpIHtcbiAgICAgIGNhc2UgJ3B1c2gnOlxuICAgICAgICBpbnNlcnRlZCA9IGFyZ3NcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ3Vuc2hpZnQnOlxuICAgICAgICBpbnNlcnRlZCA9IGFyZ3NcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ3NwbGljZSc6XG4gICAgICAgIGluc2VydGVkID0gYXJncy5zbGljZSgyKVxuICAgICAgICBicmVha1xuICAgIH1cbiAgICBpZiAoaW5zZXJ0ZWQpIG9iLm9ic2VydmVBcnJheShpbnNlcnRlZClcbiAgICAvLyBub3RpZnkgY2hhbmdlXG4gICAgb2Iubm90aWZ5KClcbiAgICByZXR1cm4gcmVzdWx0XG4gIH0pXG59KVxuXG4vKipcbiAqIFN3YXAgdGhlIGVsZW1lbnQgYXQgdGhlIGdpdmVuIGluZGV4IHdpdGggYSBuZXcgdmFsdWVcbiAqIGFuZCBlbWl0cyBjb3JyZXNwb25kaW5nIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleFxuICogQHBhcmFtIHsqfSB2YWxcbiAqIEByZXR1cm4geyp9IC0gcmVwbGFjZWQgZWxlbWVudFxuICovXG5cbl8uZGVmaW5lKFxuICBhcnJheVByb3RvLFxuICAnJHNldCcsXG4gIGZ1bmN0aW9uICRzZXQgKGluZGV4LCB2YWwpIHtcbiAgICBpZiAoaW5kZXggPj0gdGhpcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubGVuZ3RoID0gaW5kZXggKyAxXG4gICAgfVxuICAgIHJldHVybiB0aGlzLnNwbGljZShpbmRleCwgMSwgdmFsKVswXVxuICB9XG4pXG5cbi8qKlxuICogQ29udmVuaWVuY2UgbWV0aG9kIHRvIHJlbW92ZSB0aGUgZWxlbWVudCBhdCBnaXZlbiBpbmRleC5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gaW5kZXhcbiAqIEBwYXJhbSB7Kn0gdmFsXG4gKi9cblxuXy5kZWZpbmUoXG4gIGFycmF5UHJvdG8sXG4gICckcmVtb3ZlJyxcbiAgZnVuY3Rpb24gJHJlbW92ZSAoaW5kZXgpIHtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAoIXRoaXMubGVuZ3RoKSByZXR1cm5cbiAgICBpZiAodHlwZW9mIGluZGV4ICE9PSAnbnVtYmVyJykge1xuICAgICAgaW5kZXggPSBfLmluZGV4T2YodGhpcywgaW5kZXgpXG4gICAgfVxuICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICB0aGlzLnNwbGljZShpbmRleCwgMSlcbiAgICB9XG4gIH1cbilcblxubW9kdWxlLmV4cG9ydHMgPSBhcnJheU1ldGhvZHNcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2xpYi92bS9vYnNlcnZlci9hcnJheS5qc1xuICoqLyIsInZhciBfID0gcmVxdWlyZSgnLi4vdXRpbCcpXG52YXIgb2JqUHJvdG8gPSBPYmplY3QucHJvdG90eXBlXG5cbi8qKlxuICogQWRkIGEgbmV3IHByb3BlcnR5IHRvIGFuIG9ic2VydmVkIG9iamVjdFxuICogYW5kIGVtaXRzIGNvcnJlc3BvbmRpbmcgZXZlbnRcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gKiBAcGFyYW0geyp9IHZhbFxuICogQHB1YmxpY1xuICovXG5cbl8uZGVmaW5lKFxuICBvYmpQcm90byxcbiAgJyRhZGQnLFxuICBmdW5jdGlvbiAkYWRkIChrZXksIHZhbCkge1xuICAgIGlmICh0aGlzLmhhc093blByb3BlcnR5KGtleSkpIHJldHVyblxuICAgIHZhciBvYiA9IHRoaXMuX19vYl9fXG4gICAgaWYgKCFvYiB8fCBfLmlzUmVzZXJ2ZWQoa2V5KSkge1xuICAgICAgdGhpc1trZXldID0gdmFsXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgb2IuY29udmVydChrZXksIHZhbClcbiAgICBvYi5ub3RpZnkoKVxuICAgIGlmIChvYi52bXMpIHtcbiAgICAgIHZhciBpID0gb2Iudm1zLmxlbmd0aFxuICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICB2YXIgdm0gPSBvYi52bXNbaV1cbiAgICAgICAgdm0uX3Byb3h5KGtleSlcbiAgICAgICAgLy8gdm0uX2RpZ2VzdCgpIC8vIHRvZG9cbiAgICAgIH1cbiAgICB9XG4gIH1cbilcblxuLyoqXG4gKiBTZXQgYSBwcm9wZXJ0eSBvbiBhbiBvYnNlcnZlZCBvYmplY3QsIGNhbGxpbmcgYWRkIHRvXG4gKiBlbnN1cmUgdGhlIHByb3BlcnR5IGlzIG9ic2VydmVkLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAqIEBwYXJhbSB7Kn0gdmFsXG4gKiBAcHVibGljXG4gKi9cblxuXy5kZWZpbmUoXG4gIG9ialByb3RvLFxuICAnJHNldCcsXG4gIGZ1bmN0aW9uICRzZXQgKGtleSwgdmFsKSB7XG4gICAgdGhpcy4kYWRkKGtleSwgdmFsKVxuICAgIHRoaXNba2V5XSA9IHZhbFxuICB9XG4pXG5cbi8qKlxuICogRGVsZXRlcyBhIHByb3BlcnR5IGZyb20gYW4gb2JzZXJ2ZWQgb2JqZWN0XG4gKiBhbmQgZW1pdHMgY29ycmVzcG9uZGluZyBldmVudFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAqIEBwdWJsaWNcbiAqL1xuXG5fLmRlZmluZShcbiAgb2JqUHJvdG8sXG4gICckZGVsZXRlJyxcbiAgZnVuY3Rpb24gJGRlbGV0ZSAoa2V5KSB7XG4gICAgaWYgKCF0aGlzLmhhc093blByb3BlcnR5KGtleSkpIHJldHVyblxuICAgIGRlbGV0ZSB0aGlzW2tleV1cbiAgICB2YXIgb2IgPSB0aGlzLl9fb2JfX1xuICAgIGlmICghb2IgfHwgXy5pc1Jlc2VydmVkKGtleSkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBvYi5ub3RpZnkoKVxuICAgIGlmIChvYi52bXMpIHtcbiAgICAgIHZhciBpID0gb2Iudm1zLmxlbmd0aFxuICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICB2YXIgdm0gPSBvYi52bXNbaV1cbiAgICAgICAgdm0uX3VucHJveHkoa2V5KVxuICAgICAgICAvLyB2bS5fZGlnZXN0KCkgLy8gdG9kb1xuICAgICAgfVxuICAgIH1cbiAgfVxuKVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9saWIvdm0vb2JzZXJ2ZXIvb2JqZWN0LmpzXG4gKiovIiwiIC8qKlxuICogQGZpbGVPdmVydmlld1xuICogVmlld01vZGVsIHRlbXBsYXRlIHBhcnNlciAmIGRhdGEtYmluZGluZyBwcm9jZXNzXG4gKlxuICogcmVxdWlyZWQ6XG4gKiBpbmRleC5qczogVm1cbiAqIGRvbS1oZWxwZXIuanM6IF9jcmVhdGVFbGVtZW50LCBfY3JlYXRlQmxvY2tcbiAqIGRvbS1oZWxwZXIuanM6IF9hdHRhY2hUYXJnZXQsIF9tb3ZlVGFyZ2V0LCBfcmVtb3ZlVGFyZ2V0XG4gKiBkaXJlY3RpdmUuanM6IF9iaW5kRWxlbWVudCwgX2JpbmRTdWJWbSwgX3dhdGNoXG4gKiBldmVudHMuanM6ICRvblxuICovXG5cbi8qKlxuICogYnVpbGQoZXh0ZXJuYWxEaXJzKVxuICogICBjcmVhdGVWbSgpXG4gKiAgIG1lcmdlKGV4dGVybmFsRGlycywgZGlycylcbiAqICAgZ2VuZXJhdGUodGVtcGxhdGUsIHBhcmVudE5vZGUpXG4gKiAgICAgaWYgKHR5cGUgaXMgY29udGVudCkgY3JlYXRlIGNvbnRlbnROb2RlXG4gKiAgICAgZWxzZSBpZiAoZGlycyBoYXZlIHYtZm9yKSBmb3JlYWNoIC0+IGNyZWF0ZSBjb250ZXh0XG4gKiAgICAgICAtPiBnZW5lcmF0ZSh0ZW1wbGF0ZVdpdGhvdXRGb3IsIHBhcmVudE5vZGUpOiBkaWZmKGxpc3QpIG9uY2hhbmdlXG4gKiAgICAgZWxzZSBpZiAoZGlycyBoYXZlIHYtaWYpIGFzc2VydFxuICogICAgICAgLT4gZ2VuZXJhdGUodGVtcGxhdGVXaXRob3V0SWYsIHBhcmVudE5vZGUpOiB0b2dnbGUoc2hvd24pIG9uY2hhbmdlXG4gKiAgICAgZWxzZSBpZiAodHlwZSBpcyBuYXRpdmUpXG4gKiAgICAgICBzZXQoZGlycyk6IHVwZGF0ZShpZC9hdHRyL3N0eWxlL2NsYXNzKSBvbmNoYW5nZVxuICogICAgICAgYXBwZW5kKHRlbXBsYXRlLCBwYXJlbnROb2RlKVxuICogICAgICAgZm9yZWFjaCBjaGlsZE5vZGVzIC0+IGdlbmVyYXRlKGNoaWxkTm9kZSwgdGVtcGxhdGUpXG4gKiAgICAgZWxzZSBpZiAodHlwZSBpcyBjdXN0b20pXG4gKiAgICAgICBhZGRDaGlsZFZtKHZtLCBwYXJlbnRWbSlcbiAqICAgICAgIGJ1aWxkKGV4dGVybmFsRGlycylcbiAqICAgICAgIGZvcmVhY2ggY2hpbGROb2RlcyAtPiBnZW5lcmF0ZShjaGlsZE5vZGUsIHRlbXBsYXRlKVxuICovXG5leHBvcnQgZnVuY3Rpb24gX2J1aWxkKCkge1xuICBjb25zdCBvcHQgPSB0aGlzLl9vcHRpb25zIHx8IHt9XG4gIGNvbnN0IHRlbXBsYXRlID0gb3B0LnRlbXBsYXRlIHx8IHt9XG5cbiAgaWYgKG9wdC5yZXBsYWNlKSB7XG4gICAgaWYgKHRlbXBsYXRlLmNoaWxkcmVuICYmIHRlbXBsYXRlLmNoaWxkcmVuLmxlbmd0aCA9PT0gMSkge1xuICAgICAgdGhpcy5fZ2VuZXJhdGUodGVtcGxhdGUuY2hpbGRyZW5bMF0sIHRoaXMuX3BhcmVudEVsKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuX2dlbmVyYXRlKHRlbXBsYXRlLmNoaWxkcmVuLCB0aGlzLl9wYXJlbnRFbClcbiAgICB9XG4gIH1cbiAgZWxzZSB7XG4gICAgdGhpcy5fZ2VuZXJhdGUodGVtcGxhdGUsIHRoaXMuX3BhcmVudEVsKVxuICB9XG5cbiAgdGhpcy4kZW1pdCgnaG9vazpyZWFkeScpXG4gIHRoaXMuX3JlYWR5ID0gdHJ1ZVxufVxuXG4vKipcbiAqIEdlbmVyYXRlIGVsZW1lbnRzIGJ5IGNoaWxkIG9yIGNoaWxkcmVuIGFuZCBhcHBlbmQgdG8gcGFyZW50IGVsZW1lbnRzLlxuICogUm9vdCBlbGVtZW50IGluZm8gd291bGQgYmUgbWVyZ2VkIGlmIGhhcy4gVGhlIGZpcnN0IGFyZ3VtZW50IG1heSBiZSBhbiBhcnJheVxuICogaWYgdGhlIHJvb3QgZWxlbWVudCB3aXRoIG9wdGlvbnMucmVwbGFjZSBoYXMgbm90IG9ubHkgb25lIGNoaWxkLlxuICpcbiAqIEBwYXJhbSAge29iamVjdHxhcnJheX0gdGFyZ2V0XG4gKiBAcGFyYW0gIHtvYmplY3R9IHBhcmVudEVsXG4gKiBAcGFyYW0gIHtvYmplY3R9IGNvbnRleHRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9nZW5lcmF0ZSh0YXJnZXQsIHBhcmVudEVsLCBjb250ZXh0KSB7XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkodGFyZ2V0KSkge1xuICAgIGNvbnN0IGZyYWdCbG9jayA9IHRoaXMuX2NyZWF0ZUJsb2NrKHBhcmVudEVsKVxuICAgIHRhcmdldC5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgdGhpcy5fZ2VuZXJhdGUoY2hpbGQsIGZyYWdCbG9jaywgY29udGV4dClcbiAgICB9KVxuICAgIHJldHVyblxuICB9XG5cbiAgY29udGV4dCA9IGNvbnRleHQgfHwge31cblxuICBpZiAodGFyZ2V0LnR5cGUgPT09ICdjb250ZW50JyB8fCB0YXJnZXQudHlwZSA9PT0gJ3Nsb3QnKSB7XG4gICAgdGhpcy5fY29udGVudCA9IHRoaXMuX2NyZWF0ZUJsb2NrKHBhcmVudEVsKVxuICAgIHJldHVyblxuICB9XG5cbiAgaWYgKCFjb250ZXh0Lmhhc093blByb3BlcnR5KCdyZXBlYXQnKSAmJiB0YXJnZXQucmVwZWF0KSB7XG4gICAgY29uc3QgbGlzdCA9IHRhcmdldC5yZXBlYXQuY2FsbCh0aGlzKVxuICAgIGNvbnN0IHJlcGVhdElkID0gbGF0ZXN0UmVwZWF0SWQrK1xuICAgIGNvbnN0IGxhdGVzdEl0ZW1JZCA9IG1hcmtMaXN0KGxpc3QsIHJlcGVhdElkKVxuXG4gICAgY29uc3QgZnJhZ0Jsb2NrID0gdGhpcy5fY3JlYXRlQmxvY2socGFyZW50RWwpXG4gICAgZnJhZ0Jsb2NrLmNoaWxkcmVuID0gW11cbiAgICBmcmFnQmxvY2suZGF0YSA9IGxpc3Quc2xpY2UoMClcblxuICAgIHRoaXMuX2NoZWNrUmVwZWF0KHRhcmdldCwgZnJhZ0Jsb2NrLCByZXBlYXRJZCwgbGF0ZXN0SXRlbUlkKVxuXG4gICAgbGlzdC5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgaWYgKHR5cGVvZiBpdGVtID09PSAnb2JqZWN0Jykge1xuICAgICAgICBpdGVtLklOREVYID0gaW5kZXhcbiAgICAgIH1cbiAgICAgIHRoaXMuX2dlbmVyYXRlKHRhcmdldCwgZnJhZ0Jsb2NrLCB7cmVwZWF0OiBpdGVtfSlcbiAgICB9KVxuXG4gICAgcmV0dXJuXG4gIH1cblxuICBsZXQgc3ViQ29udGV4dCA9IHRoaXNcbiAgaWYgKGNvbnRleHQucmVwZWF0ICYmICFjb250ZXh0LnNob3duKSB7XG4gICAgc3ViQ29udGV4dCA9IHRoaXMuX21lcmdlQ29udGV4dChjb250ZXh0LnJlcGVhdClcbiAgfVxuXG4gIGlmICghY29udGV4dC5oYXNPd25Qcm9wZXJ0eSgnc2hvd24nKSAmJiB0YXJnZXQuc2hvd24pIHtcbiAgICBjb25zdCBkaXNwbGF5ID0gdGFyZ2V0LnNob3duLmNhbGwoc3ViQ29udGV4dClcbiAgICBjb25zdCBuZXdDb250ZXh0ID0ge3Nob3duOiB0cnVlfVxuICAgIGNvbnN0IGZyYWdCbG9jayA9IHN1YkNvbnRleHQuX2NyZWF0ZUJsb2NrKHBhcmVudEVsKVxuXG4gICAgaWYgKHBhcmVudEVsLmVsZW1lbnQgJiYgcGFyZW50RWwuY2hpbGRyZW4pIHtcbiAgICAgIHBhcmVudEVsLmNoaWxkcmVuLnB1c2goZnJhZ0Jsb2NrKVxuICAgIH1cblxuICAgIGlmIChjb250ZXh0LnJlcGVhdCkge1xuICAgICAgbmV3Q29udGV4dC5yZXBlYXQgPSBjb250ZXh0LnJlcGVhdFxuICAgIH1cblxuICAgIGZyYWdCbG9jay5kaXNwbGF5ID0gISFkaXNwbGF5XG4gICAgc3ViQ29udGV4dC5fY2hlY2tEaXNwbGF5KHRhcmdldCwgZnJhZ0Jsb2NrLCBuZXdDb250ZXh0KVxuXG4gICAgaWYgKGRpc3BsYXkpIHtcbiAgICAgIHN1YkNvbnRleHQuX2dlbmVyYXRlKHRhcmdldCwgZnJhZ0Jsb2NrLCBuZXdDb250ZXh0KVxuICAgIH1cblxuICAgIHJldHVyblxuICB9XG5cbiAgbGV0IHR5cGVHZXR0ZXIgPSB0YXJnZXQudHlwZVxuICBsZXQgdHlwZSA9IHR5cGVHZXR0ZXJcblxuICBpZiAodHlwZW9mIHR5cGVHZXR0ZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICB0eXBlID0gdHlwZUdldHRlci5jYWxsKHN1YkNvbnRleHQpXG5cbiAgICBpZiAoIWNvbnRleHQuaGFzT3duUHJvcGVydHkoJ3R5cGUnKSkge1xuICAgICAgY29uc3QgbmV3Q29udGV4dCA9IHt0eXBlOiB0eXBlfVxuICAgICAgY29uc3QgZnJhZ0Jsb2NrID0gc3ViQ29udGV4dC5fY3JlYXRlQmxvY2socGFyZW50RWwpXG5cbiAgICAgIGlmIChwYXJlbnRFbC5lbGVtZW50ICYmIHBhcmVudEVsLmNoaWxkcmVuKSB7XG4gICAgICAgIHBhcmVudEVsLmNoaWxkcmVuLnB1c2goZnJhZ0Jsb2NrKVxuICAgICAgfVxuXG4gICAgICBzdWJDb250ZXh0Ll93YXRjaCh0eXBlR2V0dGVyLCAodmFsdWUpID0+IHtcbiAgICAgICAgc3ViQ29udGV4dC5fcmVtb3ZlQmxvY2soZnJhZ0Jsb2NrLCB0cnVlKVxuICAgICAgICBzdWJDb250ZXh0Ll9nZW5lcmF0ZSh0YXJnZXQsIGZyYWdCbG9jaywge3R5cGU6IHZhbHVlfSlcbiAgICAgIH0pXG5cbiAgICAgIHN1YkNvbnRleHQuX2dlbmVyYXRlKHRhcmdldCwgZnJhZ0Jsb2NrLCBuZXdDb250ZXh0KVxuXG4gICAgICByZXR1cm5cbiAgICB9XG4gIH1cblxuICBsZXQgaXNDb21wb25lbnRcbiAgaWYgKHRoaXMuX2FwcCAmJiB0aGlzLl9hcHAuY3VzdG9tQ29tcG9uZW50TWFwICYmIHR5cGUpIHtcbiAgICBpc0NvbXBvbmVudCA9IHRoaXMuX2FwcC5jdXN0b21Db21wb25lbnRNYXBbdHlwZV1cbiAgfVxuICBlbHNlIHtcbiAgICBpc0NvbXBvbmVudCA9IHRhcmdldC5jb21wb25lbnRcbiAgfVxuXG4gIGlmIChpc0NvbXBvbmVudCkge1xuICAgIGNvbnN0IFZtID0gdGhpcy5jb25zdHJ1Y3RvclxuICAgIGNvbnN0IHN1YlZtID0gbmV3IFZtKHR5cGUsIHN1YkNvbnRleHQsIHBhcmVudEVsLCB1bmRlZmluZWQsIHtcbiAgICAgICdob29rOmluaXQnOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHN1YkNvbnRleHQuX3NldElkKHRhcmdldC5pZCwgbnVsbCwgdGhpcylcbiAgICAgIH0sXG4gICAgICAnaG9vazpjcmVhdGVkJzogZnVuY3Rpb24gKCkge1xuICAgICAgICBzdWJDb250ZXh0Ll9iaW5kU3ViVm0odGhpcywgdGFyZ2V0LCBjb250ZXh0LnJlcGVhdClcbiAgICAgIH0sXG4gICAgICAnaG9vazpyZWFkeSc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2NvbnRlbnQpIHtcbiAgICAgICAgICBzdWJDb250ZXh0Ll9zZXRDaGlsZHJlbih0YXJnZXQsIHRoaXMuX2NvbnRlbnQpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICAgIHN1YkNvbnRleHQuX2JpbmRTdWJWbUFmdGVySW5pdGlhbGl6ZWQoc3ViVm0sIHRhcmdldClcbiAgICByZXR1cm5cbiAgfVxuXG4gIGNvbnN0IGVsZW1lbnQgPSBzdWJDb250ZXh0Ll9nZW5lcmF0ZUVsZW1lbnQodHlwZSwgdGFyZ2V0LCBwYXJlbnRFbClcbiAgY29uc3QgdHJlZU1vZGUgPSB0YXJnZXQuYXBwZW5kID09PSAndHJlZSdcbiAgaWYgKCF0cmVlTW9kZSkge1xuICAgIHN1YkNvbnRleHQuX2F0dGFjaFRhcmdldChlbGVtZW50LCBwYXJlbnRFbClcbiAgfVxuICBzdWJDb250ZXh0Ll9zZXRDaGlsZHJlbih0YXJnZXQsIGVsZW1lbnQpXG4gIGlmICh0cmVlTW9kZSkge1xuICAgIHN1YkNvbnRleHQuX2F0dGFjaFRhcmdldChlbGVtZW50LCBwYXJlbnRFbClcbiAgfVxufVxuXG4vKipcbiAqIEdlbmVyYXRlIGVsZW1lbnQgZnJvbSB0ZW1wbGF0ZSBhbmQgYXR0YWNoIHRvIHRoZSBkZXN0IGlmIG5lZWRlZC5cbiAqIFRoZSB0aW1lIHRvIGF0dGFjaCBkZXBlbmRzIG9uIHdoZXRoZXIgdGhlIG1vZGUgc3RhdHVzIGlzIG5vZGUgb3IgdHJlZS5cbiAqXG4gKiBAcGFyYW0gIHtvYmplY3R9IHRlbXBsYXRlXG4gKiBAcGFyYW0gIHtvYmplY3R9IGRlc3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9nZW5lcmF0ZUVsZW1lbnQodHlwZSwgdGVtcGxhdGUsIGRlc3QpIHtcblxuICB0aGlzLl9hcHBseU5haXR2ZUNvbXBvbmVudE9wdGlvbnModGVtcGxhdGUpXG5cbiAgbGV0IGVsZW1lbnRcbiAgaWYgKGRlc3QucmVmID09PSAnX2RvY3VtZW50RWxlbWVudCcpIHtcbiAgICAvLyBpZiBpdHMgcGFyZW50IGlzIGRvY3VtZW50RWxlbWVudCB0aGVuIGl0J3MgYSBib2R5XG4gICAgZWxlbWVudCA9IHRoaXMuX2NyZWF0ZUJvZHkodHlwZSlcbiAgfSBlbHNlIHtcbiAgICBlbGVtZW50ID0gdGhpcy5fY3JlYXRlRWxlbWVudCh0eXBlKVxuICB9XG4gIC8vIFRPRE8gaXQgd2FzIGEgcm9vdCBlbGVtZW50IHdoZW4gbm90IGluIGEgZnJhZ21lbnRcbiAgaWYgKCF0aGlzLl9yb290RWwpIHtcbiAgICB0aGlzLl9yb290RWwgPSBlbGVtZW50XG4gIH1cblxuICB0aGlzLl9iaW5kRWxlbWVudChlbGVtZW50LCB0ZW1wbGF0ZSlcblxuICBpZiAodGVtcGxhdGUuYXR0ciAmJiB0ZW1wbGF0ZS5hdHRyLmFwcGVuZCkgeyAvLyBiYWNrd2FyZCwgYXBwZW5kIHByb3AgaW4gYXR0clxuICAgIGVsZW1lbnQuYXBwZW5kID0gdGVtcGxhdGUuYXR0ci5hcHBlbmRcbiAgfVxuXG4gIHJldHVybiBlbGVtZW50XG59XG5cbi8qKlxuICogU2V0IGFsbCBjaGlsZHJlbiB0byBhIGNlcnRhaW4gcGFyZW50IGVsZW1lbnQuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHRlbXBsYXRlXG4gKiBAcGFyYW0ge29iamVjdH0gcGFyZW50RWxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9zZXRDaGlsZHJlbih0ZW1wbGF0ZSwgcGFyZW50RWwpIHtcbiAgY29uc3QgY2hpbGRyZW4gPSB0ZW1wbGF0ZS5jaGlsZHJlblxuICBpZiAoY2hpbGRyZW4gJiYgY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgIHRoaXMuX2dlbmVyYXRlKGNoaWxkLCBwYXJlbnRFbClcbiAgICB9KVxuICB9XG59XG5cbi8qKlxuICogV2F0Y2ggdGhlIGxpc3QgdXBkYXRlIGFuZCByZWZyZXNoIHRoZSBjaGFuZ2VzLlxuICpcbiAqIEBwYXJhbSAge29iamVjdH0gdGFyZ2V0XG4gKiBAcGFyYW0gIHtvYmplY3R9IGZyYWdCbG9ja1xuICovXG5leHBvcnQgZnVuY3Rpb24gX2NoZWNrUmVwZWF0KHRhcmdldCwgZnJhZ0Jsb2NrLCByZXBlYXRJZCwgbGF0ZXN0SXRlbUlkKSB7XG4gIGNvbnN0IGNoaWxkcmVuID0gZnJhZ0Jsb2NrLmNoaWxkcmVuXG5cbiAgdGhpcy5fd2F0Y2hCbG9jayhmcmFnQmxvY2ssIHRhcmdldC5yZXBlYXQsICdyZXBlYXQnLCAodmFsdWUpID0+IHtcbiAgICBpZiAoIWZyYWdCbG9jaykge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3Qgb2xkQ2hpbGRyZW4gPSBjaGlsZHJlbi5zbGljZSgpXG4gICAgY29uc3Qgb2xkVmFsdWUgPSBmcmFnQmxvY2suZGF0YS5zbGljZSgpXG4gICAgLy8gMS4gY29sbGVjdCBhbGwgbmV3IHJlZnMgdHJhY2sgYnlcbiAgICBjb25zdCB0cmFja01hcCA9IHt9XG4gICAgY29uc3QgcmV1c2VkTWFwID0ge31cbiAgICB2YWx1ZS5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgbGV0IGtleSA9IGl0ZW1bYF9fd3hfcmVwZWF0XyR7cmVwZWF0SWR9X19gXVxuICAgICAgaWYgKCFrZXkpIHtcbiAgICAgICAga2V5ID0gbGF0ZXN0SXRlbUlkKytcbiAgICAgICAgc2V0UmVwZWF0SXRlbUlkKGl0ZW0sIHJlcGVhdElkLCBrZXkpXG4gICAgICB9XG4gICAgICB0cmFja01hcFtrZXldID0gaXRlbVxuICAgIH0pXG5cbiAgICAvLyAyLiByZW1vdmUgdW51c2VkIGVsZW1lbnQgZm9yZWFjaCBvbGQgaXRlbVxuICAgIGNvbnN0IHJldXNlZExpc3QgPSBbXVxuICAgIG9sZFZhbHVlLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBrZXkgPSBpdGVtW2BfX3d4X3JlcGVhdF8ke3JlcGVhdElkfV9fYF1cbiAgICAgIGlmICh0cmFja01hcC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgIHJldXNlZE1hcFtrZXldID0ge2l0ZW0sIGluZGV4LCB0YXJnZXQ6IG9sZENoaWxkcmVuW2luZGV4XX1cbiAgICAgICAgcmV1c2VkTGlzdC5wdXNoKGl0ZW0pXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5fcmVtb3ZlVGFyZ2V0KG9sZENoaWxkcmVuW2luZGV4XSlcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgLy8gMy4gY3JlYXRlIG5ldyBlbGVtZW50IGZvcmVhY2ggbmV3IGl0ZW1cbiAgICBjaGlsZHJlbi5sZW5ndGggPSAwXG4gICAgZnJhZ0Jsb2NrLmRhdGEgPSB2YWx1ZS5zbGljZSgpXG4gICAgZnJhZ0Jsb2NrLnVwZGF0ZU1hcmsgPSBmcmFnQmxvY2suc3RhcnRcblxuICAgIHZhbHVlLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBrZXkgPSBpdGVtW2BfX3d4X3JlcGVhdF8ke3JlcGVhdElkfV9fYF1cbiAgICAgIGNvbnN0IHJldXNlZCA9IHJldXNlZE1hcFtrZXldXG4gICAgICBpZiAodHlwZW9mIGl0ZW0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGl0ZW0uSU5ERVggPSBpbmRleFxuICAgICAgfVxuICAgICAgaWYgKHJldXNlZCkge1xuICAgICAgICBpZiAocmV1c2VkLml0ZW0gPT09IHJldXNlZExpc3RbMF0pIHtcbiAgICAgICAgICByZXVzZWRMaXN0LnNoaWZ0KClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXVzZWRMaXN0LiRyZW1vdmUocmV1c2VkLml0ZW0pXG4gICAgICAgICAgdGhpcy5fbW92ZVRhcmdldChyZXVzZWQudGFyZ2V0LCBmcmFnQmxvY2sudXBkYXRlTWFyaywgdHJ1ZSlcbiAgICAgICAgfVxuICAgICAgICBjaGlsZHJlbi5wdXNoKHJldXNlZC50YXJnZXQpXG4gICAgICAgIGZyYWdCbG9jay51cGRhdGVNYXJrID0gcmV1c2VkLnRhcmdldFxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRoaXMuX2dlbmVyYXRlKHRhcmdldCwgZnJhZ0Jsb2NrLCB7cmVwZWF0OiBpdGVtfSlcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgZGVsZXRlIGZyYWdCbG9jay51cGRhdGVNYXJrXG4gIH0pXG59XG5cbmxldCBsYXRlc3RSZXBlYXRJZCA9IDFcblxuZnVuY3Rpb24gbWFya0xpc3QobGlzdCwgcmVwZWF0SWQpIHtcbiAgbGV0IGxhdGVzdEl0ZW1JZCA9IDFcbiAgbGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgc2V0UmVwZWF0SXRlbUlkKGl0ZW0sIHJlcGVhdElkLCBsYXRlc3RJdGVtSWQrKylcbiAgfSlcbiAgcmV0dXJuIGxhdGVzdEl0ZW1JZFxufVxuXG5mdW5jdGlvbiBzZXRSZXBlYXRJdGVtSWQoaXRlbSwgcmVwZWF0SWQsIGl0ZW1JZCkge1xuICBjb25zdCBrZXkgPSBgX193eF9yZXBlYXRfJHtyZXBlYXRJZH1fX2BcbiAgaWYgKHR5cGVvZiBpdGVtID09PSAnb2JqZWN0Jykge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShpdGVtLCBrZXksIHtcbiAgICAgIHZhbHVlOiBpdGVtSWRcbiAgICB9KVxuICB9XG59XG5cbi8qKlxuICogV2F0Y2ggdGhlIGRpc3BsYXkgdXBkYXRlIGFuZCBhZGQvcmVtb3ZlIHRoZSBlbGVtZW50LlxuICpcbiAqIEBwYXJhbSAge29iamVjdH0gdGFyZ2V0XG4gKiBAcGFyYW0gIHtvYmplY3R9IGZyYWdCbG9ja1xuICogQHBhcmFtICB7b2JqZWN0fSBjb250ZXh0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfY2hlY2tEaXNwbGF5KHRhcmdldCwgZnJhZ0Jsb2NrLCBjb250ZXh0KSB7XG5cbiAgdGhpcy5fd2F0Y2hCbG9jayhmcmFnQmxvY2ssIHRhcmdldC5zaG93biwgJ3Nob3duJywgKHZhbHVlKSA9PiB7XG4gICAgaWYgKCFmcmFnQmxvY2sgfHwgISFmcmFnQmxvY2suZGlzcGxheSA9PT0gISF2YWx1ZSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGZyYWdCbG9jay5kaXNwbGF5ID0gdmFsdWVcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMuX2dlbmVyYXRlKHRhcmdldCwgZnJhZ0Jsb2NrLCBjb250ZXh0KVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuX3JlbW92ZUJsb2NrKGZyYWdCbG9jaywgdHJ1ZSlcbiAgICB9XG4gIH0pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfd2F0Y2hCbG9jayhmcmFnQmxvY2ssIGNhbGMsIHR5cGUsIGhhbmRsZXIpIHtcbiAgY29uc3QgZGlmZmVyID0gdGhpcyAmJiB0aGlzLl9hcHAgJiYgdGhpcy5fYXBwLmRpZmZlclxuICBjb25zdCBjb25maWcgPSB7fVxuICBjb25zdCBkZXB0aCA9IGZyYWdCbG9jay5lbGVtZW50LmRlcHRoICsgMVxuXG4gIHRoaXMuX3dhdGNoKGNhbGMsICh2YWx1ZSkgPT4ge1xuICAgIGNvbmZpZy5sYXRlc3RWYWx1ZSA9IHZhbHVlXG4gICAgaWYgKGRpZmZlciAmJiAhY29uZmlnLnJlY29yZGVkKSB7XG4gICAgICBkaWZmZXIuYXBwZW5kKHR5cGUsIGRlcHRoLCBmcmFnQmxvY2suYmxvY2tJZCwgKCkgPT4ge1xuICAgICAgICBjb25zdCBsYXRlc3RWYWx1ZSA9IGNvbmZpZy5sYXRlc3RWYWx1ZVxuICAgICAgICBoYW5kbGVyKGxhdGVzdFZhbHVlKVxuICAgICAgICBjb25maWcucmVjb3JkZWQgPSBmYWxzZVxuICAgICAgICBjb25maWcubGF0ZXN0VmFsdWUgPSB1bmRlZmluZWRcbiAgICAgIH0pXG4gICAgfVxuICAgIGNvbmZpZy5yZWNvcmRlZCA9IHRydWVcbiAgfSlcbn1cblxuLyoqXG4gKiBDbG9uZSBhIGNvbnRleHQgYW5kIG1lcmdlIGNlcnRhaW4gZGF0YS5cbiAqXG4gKiBAcGFyYW0gIHtvYmplY3R9IG1lcmdlZERhdGFcbiAqIEByZXR1cm4ge29iamVjdH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9tZXJnZUNvbnRleHQobWVyZ2VkRGF0YSkge1xuICBjb25zdCBjb250ZXh0ID0gT2JqZWN0LmNyZWF0ZSh0aGlzKVxuICBjb250ZXh0Ll9kYXRhID0gbWVyZ2VkRGF0YVxuICBjb250ZXh0Ll9pbml0RGF0YSgpXG4gIGNvbnRleHQuX3JlYWxQYXJlbnQgPSB0aGlzXG4gIHJldHVybiBjb250ZXh0XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2xpYi92bS9jb21waWxlci5qc1xuICoqLyIsIi8qKlxuICogQGZpbGVPdmVydmlld1xuICogRGlyZWN0aXZlIFBhcnNlclxuICovXG5cbmltcG9ydCB7YmluZCwgZXh0ZW5kfSBmcm9tICcuLi91dGlsJ1xuXG5pbXBvcnQgV2F0Y2hlciBmcm9tICcuL3dhdGNoZXInXG5pbXBvcnQge25hdGl2ZUNvbXBvbmVudE1hcH0gZnJvbSAnLi4vY29uZmlnJ1xuXG5jb25zdCBTRVRURVJTID0ge1xuICBhdHRyOiAnc2V0QXR0cicsXG4gIHN0eWxlOiAnc2V0U3R5bGUnLFxuICBldmVudDogJ2FkZEV2ZW50J1xufVxuXG4vKipcbiAqIGFwcGx5IHRoZSBuYXRpdmUgY29tcG9uZW50J3Mgb3B0aW9ucyhzcGVjaWZpZWQgYnkgdGVtcGxhdGUudHlwZSlcbiAqIHRvIHRoZSB0ZW1wbGF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gX2FwcGx5TmFpdHZlQ29tcG9uZW50T3B0aW9ucyh0ZW1wbGF0ZSkge1xuICBjb25zdCB7dHlwZX0gPSB0ZW1wbGF0ZVxuICBjb25zdCBvcHRpb25zID0gbmF0aXZlQ29tcG9uZW50TWFwW3R5cGVdXG5cbiAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnb2JqZWN0Jykge1xuICAgIGV4dGVuZCh0ZW1wbGF0ZSwgb3B0aW9ucylcbiAgfVxufVxuXG4vKipcbiAqIGJpbmQgYWxsIGlkLCBhdHRyLCBjbGFzc25hbWVzLCBzdHlsZSwgZXZlbnRzIHRvIGFuIGVsZW1lbnRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9iaW5kRWxlbWVudChlbCwgdGVtcGxhdGUpIHtcbiAgdGhpcy5fc2V0SWQodGVtcGxhdGUuaWQsIGVsLCB0aGlzKVxuICB0aGlzLl9zZXRBdHRyKGVsLCB0ZW1wbGF0ZS5hdHRyKVxuICB0aGlzLl9zZXRDbGFzcyhlbCwgdGVtcGxhdGUuY2xhc3NMaXN0KVxuICB0aGlzLl9zZXRTdHlsZShlbCwgdGVtcGxhdGUuc3R5bGUpXG4gIHRoaXMuX2JpbmRFdmVudHMoZWwsIHRlbXBsYXRlLmV2ZW50cylcbn1cblxuLyoqXG4gKiBiaW5kIGFsbCBwcm9wcyB0byBzdWIgdm0gYW5kIGJpbmQgYWxsIHN0eWxlLCBldmVudHMgdG8gdGhlIHJvb3QgZWxlbWVudFxuICogb2YgdGhlIHN1YiB2bSBpZiBpdCBkb2Vzbid0IGhhdmUgYSByZXBsYWNlZCBtdWx0aS1ub2RlIGZyYWdtZW50XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfYmluZFN1YlZtKHN1YlZtLCB0ZW1wbGF0ZSwgcmVwZWF0SXRlbSkge1xuICBzdWJWbSA9IHN1YlZtIHx8IHt9XG4gIHRlbXBsYXRlID0gdGVtcGxhdGUgfHwge31cblxuICBjb25zdCBvcHRpb25zID0gc3ViVm0uX29wdGlvbnMgfHwge31cblxuICAvLyBiaW5kIHByb3BzXG4gIGxldCBwcm9wcyA9IG9wdGlvbnMucHJvcHNcblxuICBpZiAoQXJyYXkuaXNBcnJheShwcm9wcykpIHtcbiAgICBwcm9wcyA9IHByb3BzLnJlZHVjZSgocmVzdWx0LCB2YWx1ZSkgPT4ge1xuICAgICAgcmVzdWx0W3ZhbHVlXSA9IHRydWVcbiAgICAgIHJldHVybiByZXN1bHRcbiAgICB9LCB7fSlcbiAgfVxuXG4gIG1lcmdlUHJvcHMocmVwZWF0SXRlbSwgcHJvcHMsIHRoaXMsIHN1YlZtKVxuICBtZXJnZVByb3BzKHRlbXBsYXRlLmF0dHIsIHByb3BzLCB0aGlzLCBzdWJWbSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9iaW5kU3ViVm1BZnRlckluaXRpYWxpemVkKHN1YlZtLCB0ZW1wbGF0ZSkge1xuICBtZXJnZVN0eWxlKHRlbXBsYXRlLnN0eWxlLCB0aGlzLCBzdWJWbSlcblxuICAvLyBiaW5kIGV2ZW50c1xuICAvLyB0b2RvOiByZWJpbmQgaWYgc3ViVm0uX3Jvb3RFbCBjaGFuZ2VkXG4gIGlmIChzdWJWbS5fcm9vdEVsKSB7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gKHRlbXBsYXRlLmV2ZW50cyB8fCB7fSkpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gdGVtcGxhdGUuZXZlbnRzW2tleV1cbiAgICAgIHRoaXMuX3NldEV2ZW50KHN1YlZtLl9yb290RWwsIGtleSwgdmFsdWUpXG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIG1lcmdlUHJvcHModGFyZ2V0LCBwcm9wcywgdm0sIHN1YlZtKSB7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgZm9yIChjb25zdCBrZXkgaW4gdGFyZ2V0KSB7XG4gICAgaWYgKCFwcm9wcyB8fCBwcm9wc1trZXldKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHRhcmdldFtrZXldXG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHZtLl93YXRjaCh2YWx1ZSwgZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICBzdWJWbVtrZXldID0gdlxuICAgICAgICB9KVxuICAgICAgICBzdWJWbVtrZXldID0gdmFsdWUuYmluZCh2bSkoKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHN1YlZtW2tleV0gPSB2YWx1ZVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBtZXJnZVN0eWxlKHRhcmdldCwgdm0sIHN1YlZtKSB7XG4gIGZvciAoY29uc3Qga2V5IGluIHRhcmdldCkge1xuICAgIGNvbnN0IHZhbHVlID0gdGFyZ2V0W2tleV1cbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB2bS5fd2F0Y2godmFsdWUsIGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIGlmIChzdWJWbS5fcm9vdEVsKSB7XG4gICAgICAgICAgc3ViVm0uX3Jvb3RFbC5zZXRTdHlsZShrZXksIHYpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICBzdWJWbS5fcm9vdEVsLnNldFN0eWxlKGtleSwgdmFsdWUuYmluZCh2bSkoKSlcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBpZiAoc3ViVm0uX3Jvb3RFbCkge1xuICAgICAgICBzdWJWbS5fcm9vdEVsLnNldFN0eWxlKGtleSwgdmFsdWUpXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogYmluZCBpZCB0byBhbiBlbGVtZW50XG4gKiBlYWNoIGlkIGlzIHVuaXF1ZSBpbiBhIHdob2xlIHZtXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfc2V0SWQoaWQsIGVsLCB2bSkge1xuICBjb25zdCBtYXAgPSBPYmplY3QuY3JlYXRlKG51bGwpXG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMobWFwLCB7XG4gICAgdm06IHtcbiAgICAgIHZhbHVlOiB2bSxcbiAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2VcbiAgICB9LFxuICAgIGVsOiB7XG4gICAgICBnZXQ6ICgpID0+IGVsIHx8IHZtLl9yb290RWwsXG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlXG4gICAgfVxuICB9KVxuXG4gIGlmICh0eXBlb2YgaWQgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjb25zdCBoYW5kbGVyID0gaWRcbiAgICBpZCA9IGhhbmRsZXIuY2FsbCh0aGlzKVxuICAgIGlmIChpZCkge1xuICAgICAgdGhpcy5faWRzW2lkXSA9IG1hcFxuICAgIH1cbiAgICB0aGlzLl93YXRjaChoYW5kbGVyLCAobmV3SWQpID0+IHtcbiAgICAgIGlmIChuZXdJZCkge1xuICAgICAgICB0aGlzLl9pZHNbbmV3SWRdID0gbWFwXG4gICAgICB9XG4gICAgfSlcbiAgfVxuICBlbHNlIGlmIChpZCAmJiB0eXBlb2YgaWQgPT09ICdzdHJpbmcnKSB7XG4gICAgdGhpcy5faWRzW2lkXSA9IG1hcFxuICB9XG59XG5cbi8qKlxuICogYmluZCBhdHRyIHRvIGFuIGVsZW1lbnRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9zZXRBdHRyKGVsLCBhdHRyKSB7XG4gIHRoaXMuX2JpbmREaXIoZWwsICdhdHRyJywgYXR0cilcbn1cblxuLyoqXG4gKiBiaW5kIGNsYXNzbmFtZXMgdG8gYW4gZWxlbWVudFxuICovXG5leHBvcnQgZnVuY3Rpb24gX3NldENsYXNzKGVsLCBjbGFzc0xpc3QpIHtcblxuICBpZiAodHlwZW9mIGNsYXNzTGlzdCAhPT0gJ2Z1bmN0aW9uJyAmJiAhQXJyYXkuaXNBcnJheShjbGFzc0xpc3QpKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgaWYgKEFycmF5LmlzQXJyYXkoY2xhc3NMaXN0KSAmJiAhY2xhc3NMaXN0Lmxlbmd0aCkge1xuICAgIGVsLnNldENsYXNzU3R5bGUoe30pXG4gICAgcmV0dXJuXG4gIH1cblxuICBjb25zdCB1cGRhdGUgPSAoY2xhc3NMaXN0KSA9PiB7XG4gICAgY29uc3QgY3NzID0gdGhpcy5fb3B0aW9ucy5zdHlsZVxuICAgIGNvbnN0IGNsYXNzU3R5bGUgPSB7fVxuICAgIGNvbnN0IGxlbmd0aCA9IGNsYXNzTGlzdC5sZW5ndGhcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHN0eWxlID0gY3NzW2NsYXNzTGlzdFtpXV1cbiAgICAgIGlmIChzdHlsZSkge1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBzdHlsZSkge1xuICAgICAgICAgIGNsYXNzU3R5bGVba2V5XSA9IHN0eWxlW2tleV1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBlbC5zZXRDbGFzc1N0eWxlKGNsYXNzU3R5bGUpXG4gIH1cblxuICBpZiAodHlwZW9mIGNsYXNzTGlzdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHRoaXMuX3dhdGNoKGNsYXNzTGlzdCwgdXBkYXRlKVxuICAgIHVwZGF0ZShjbGFzc0xpc3QuY2FsbCh0aGlzKSlcbiAgfVxuICBlbHNlIHtcbiAgICB1cGRhdGUoY2xhc3NMaXN0KVxuICB9XG59XG5cbi8qKlxuICogYmluZCBzdHlsZSB0byBhbiBlbGVtZW50XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfc2V0U3R5bGUoZWwsIHN0eWxlKSB7XG4gIHRoaXMuX2JpbmREaXIoZWwsICdzdHlsZScsIHN0eWxlKVxufVxuXG4vKipcbiAqIGFkZCBhbiBldmVudCB0eXBlIGFuZCBoYW5kbGVyIHRvIGFuIGVsZW1lbnQgYW5kIGdlbmVyYXRlIGEgZG9tIHVwZGF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gX3NldEV2ZW50KGVsLCB0eXBlLCBoYW5kbGVyKSB7XG4gIGVsLmFkZEV2ZW50KHR5cGUsIGJpbmQoaGFuZGxlciwgdGhpcykpXG59XG5cbi8qKlxuICogYWRkIGFsbCBldmVudHMgb2YgYW4gZWxlbWVudFxuICovXG5leHBvcnQgZnVuY3Rpb24gX2JpbmRFdmVudHMoZWwsIGV2ZW50cykge1xuICBpZiAoIWV2ZW50cykge1xuICAgIHJldHVyblxuICB9XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhldmVudHMpXG4gIGxldCBpID0ga2V5cy5sZW5ndGhcbiAgd2hpbGUgKGktLSkge1xuICAgIGNvbnN0IGtleSA9IGtleXNbaV1cbiAgICBjb25zdCBoYW5kbGVyTmFtZSA9IGV2ZW50c1trZXldXG4gICAgdGhpcy5fc2V0RXZlbnQoZWwsIGtleSwgdGhpc1toYW5kbGVyTmFtZV0pXG4gIH1cbn1cblxuLyoqXG4gKiBzZXQgYSBzZXJpZXMgb2YgbWVtYmVycyBhcyBhIGtpbmQgb2YgYW4gZWxlbWVudFxuICogZm9yIGV4YW1wbGU6IHN0eWxlLCBhdHRyLCAuLi5cbiAqIGlmIHRoZSB2YWx1ZSBpcyBhIGZ1bmN0aW9uIHRoZW4gYmluZCB0aGUgZGF0YSBjaGFuZ2VzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfYmluZERpcihlbCwgbmFtZSwgZGF0YSkge1xuICBpZiAoIWRhdGEpIHtcbiAgICByZXR1cm5cbiAgfVxuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoZGF0YSlcbiAgbGV0IGkgPSBrZXlzLmxlbmd0aFxuICB3aGlsZSAoaS0tKSB7XG4gICAgY29uc3Qga2V5ID0ga2V5c1tpXVxuICAgIGNvbnN0IHZhbHVlID0gZGF0YVtrZXldXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc3QgdXBkYXRlID0gdmFsdWVcbiAgICAgIHRoaXMuX2JpbmRLZXkoZWwsIG5hbWUsIGtleSwgdXBkYXRlKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGVsW1NFVFRFUlNbbmFtZV1dKGtleSwgdmFsdWUpXG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogYmluZCBkYXRhIGNoYW5nZXMgdG8gYSBjZXJ0YWluIGtleSB0byBhIG5hbWUgc2VyaWVzIGluIGFuIGVsZW1lbnRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9iaW5kS2V5KGVsLCBuYW1lLCBrZXksIGNhbGMpIHtcbiAgY29uc3QgbWV0aG9kTmFtZSA9IFNFVFRFUlNbbmFtZV1cbiAgY29uc3Qgb2JqID0gZWxbbmFtZV1cbiAgY29uc3QgdmFsdWUgPSBjYWxjLmNhbGwodGhpcylcbiAgZWxbbWV0aG9kTmFtZV0oa2V5LCBjYWxjLmNhbGwodGhpcykpXG4gIHRoaXMuX3dhdGNoKGNhbGMsICh2YWx1ZSkgPT4ge1xuICAgIGZ1bmN0aW9uIGhhbmRsZXIoKSB7XG4gICAgICBlbFttZXRob2ROYW1lXShrZXksIHZhbHVlKVxuICAgIH1cbiAgICBjb25zdCBkaWZmZXIgPSB0aGlzICYmIHRoaXMuX2FwcCAmJiB0aGlzLl9hcHAuZGlmZmVyXG4gICAgaWYgKGRpZmZlcikge1xuICAgICAgZGlmZmVyLmFwcGVuZCgnZWxlbWVudCcsIGVsLmRlcHRoLCBlbC5yZWYsIGhhbmRsZXIpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgaGFuZGxlcigpXG4gICAgfVxuICB9KVxufVxuXG4vKipcbiAqIHdhdGNoIGEgY2FsYyBmdW5jdGlvbiBhbmQgY2FsbGJhY2sgaWYgdGhlIGNhbGMgdmFsdWUgY2hhbmdlc1xuICovXG5leHBvcnQgZnVuY3Rpb24gX3dhdGNoKGNhbGMsIGNhbGxiYWNrKSB7XG4gIG5ldyBXYXRjaGVyKHRoaXMsIGNhbGMsIGZ1bmN0aW9uICh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0JyAmJiB2YWx1ZSA9PT0gb2xkVmFsdWUpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBjYWxsYmFjayh2YWx1ZSlcbiAgfSlcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vbGliL3ZtL2RpcmVjdGl2ZS5qc1xuICoqLyIsIi8qKlxuICogVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLTIwMTUgWXV4aSBFdmFuIFlvdVxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKi9cblxudmFyIF8gPSByZXF1aXJlKCcuL3V0aWwnKVxuLy8gdmFyIGNvbmZpZyA9IHJlcXVpcmUoJy4vY29uZmlnJylcbnZhciBPYnNlcnZlciA9IHJlcXVpcmUoJy4vb2JzZXJ2ZXInKVxuLy8gdmFyIGV4cFBhcnNlciA9IHJlcXVpcmUoJy4vcGFyc2Vycy9leHByZXNzaW9uJylcbi8vIHZhciBiYXRjaGVyID0gcmVxdWlyZSgnLi9iYXRjaGVyJylcbnZhciB1aWQgPSAwXG5cbi8qKlxuICogQSB3YXRjaGVyIHBhcnNlcyBhbiBleHByZXNzaW9uLCBjb2xsZWN0cyBkZXBlbmRlbmNpZXMsXG4gKiBhbmQgZmlyZXMgY2FsbGJhY2sgd2hlbiB0aGUgZXhwcmVzc2lvbiB2YWx1ZSBjaGFuZ2VzLlxuICogVGhpcyBpcyB1c2VkIGZvciBib3RoIHRoZSAkd2F0Y2goKSBhcGkgYW5kIGRpcmVjdGl2ZXMuXG4gKlxuICogQHBhcmFtIHtWdWV9IHZtXG4gKiBAcGFyYW0ge1N0cmluZ30gZXhwcmVzc2lvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2JcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiAgICAgICAgICAgICAgICAgLSB7QXJyYXl9IGZpbHRlcnNcbiAqICAgICAgICAgICAgICAgICAtIHtCb29sZWFufSB0d29XYXlcbiAqICAgICAgICAgICAgICAgICAtIHtCb29sZWFufSBkZWVwXG4gKiAgICAgICAgICAgICAgICAgLSB7Qm9vbGVhbn0gdXNlclxuICogICAgICAgICAgICAgICAgIC0ge0Z1bmN0aW9ufSBbcHJlUHJvY2Vzc11cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5cbi8vIGZ1bmN0aW9uIFdhdGNoZXIgKHZtLCBleHByZXNzaW9uLCBjYiwgb3B0aW9ucykge1xuZnVuY3Rpb24gV2F0Y2hlciAodm0sIHVwZGF0ZSwgY2IpIHtcbiAgdGhpcy52bSA9IHZtXG4gIHZtLl93YXRjaGVycy5wdXNoKHRoaXMpXG4gIC8vIHRoaXMuZXhwcmVzc2lvbiA9IGV4cHJlc3Npb25cbiAgdGhpcy5jYiA9IGNiXG4gIHRoaXMuaWQgPSArK3VpZCAvLyB1aWQgZm9yIGJhdGNoaW5nXG4gIHRoaXMuYWN0aXZlID0gdHJ1ZVxuICAvLyBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuICAvLyB0aGlzLmRlZXAgPSAhIW9wdGlvbnMuZGVlcFxuICAvLyB0aGlzLnVzZXIgPSAhIW9wdGlvbnMudXNlclxuICAvLyB0aGlzLnR3b1dheSA9ICEhb3B0aW9ucy50d29XYXlcbiAgLy8gdGhpcy5maWx0ZXJzID0gb3B0aW9ucy5maWx0ZXJzXG4gIC8vIHRoaXMucHJlUHJvY2VzcyA9IG9wdGlvbnMucHJlUHJvY2Vzc1xuICB0aGlzLmRlcHMgPSBbXVxuICB0aGlzLm5ld0RlcHMgPSBbXVxuICAvLyBwYXJzZSBleHByZXNzaW9uIGZvciBnZXR0ZXIvc2V0dGVyXG4gIC8vIHZhciByZXMgPSBleHBQYXJzZXIucGFyc2UoZXhwcmVzc2lvbiwgb3B0aW9ucy50d29XYXkpXG4gIC8vIHRoaXMuZ2V0dGVyID0gcmVzLmdldFxuICAvLyB0aGlzLnNldHRlciA9IHJlcy5zZXRcbiAgdGhpcy5nZXR0ZXIgPSB1cGRhdGVcbiAgdGhpcy52YWx1ZSA9IHRoaXMuZ2V0KClcbn1cblxudmFyIHAgPSBXYXRjaGVyLnByb3RvdHlwZVxuXG4vKipcbiAqIEFkZCBhIGRlcGVuZGVuY3kgdG8gdGhpcyBkaXJlY3RpdmUuXG4gKlxuICogQHBhcmFtIHtEZXB9IGRlcFxuICovXG5cbnAuYWRkRGVwID0gZnVuY3Rpb24gKGRlcCkge1xuICB2YXIgbmV3RGVwcyA9IHRoaXMubmV3RGVwc1xuICB2YXIgb2xkID0gdGhpcy5kZXBzXG4gIGlmIChfLmluZGV4T2YobmV3RGVwcywgZGVwKSA8IDApIHtcbiAgICBuZXdEZXBzLnB1c2goZGVwKVxuICAgIHZhciBpID0gXy5pbmRleE9mKG9sZCwgZGVwKVxuICAgIGlmIChpIDwgMCkge1xuICAgICAgZGVwLmFkZFN1Yih0aGlzKVxuICAgIH0gZWxzZSB7XG4gICAgICBvbGRbaV0gPSBudWxsXG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogRXZhbHVhdGUgdGhlIGdldHRlciwgYW5kIHJlLWNvbGxlY3QgZGVwZW5kZW5jaWVzLlxuICovXG5cbnAuZ2V0ID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmJlZm9yZUdldCgpXG4gIHZhciB2bSA9IHRoaXMudm1cbiAgdmFyIHZhbHVlXG4gIHRyeSB7XG4gICAgdmFsdWUgPSB0aGlzLmdldHRlci5jYWxsKHZtLCB2bSlcbiAgfSBjYXRjaCAoZSkge1xuICAgIC8vIGlmIChjb25maWcud2FybkV4cHJlc3Npb25FcnJvcnMpIHtcbiAgICAvLyAgIF8ud2FybihcbiAgICAvLyAgICAgJ0Vycm9yIHdoZW4gZXZhbHVhdGluZyBleHByZXNzaW9uIFwiJyArXG4gICAgLy8gICAgIHRoaXMuZXhwcmVzc2lvbiArICdcIjpcXG4gICAnICsgZVxuICAgIC8vICAgKVxuICAgIC8vIH1cbiAgICBfLndhcm4oJ0Vycm9yIHdoZW4gdXBkYXRlXCInKVxuICB9XG4gIC8vIFwidG91Y2hcIiBldmVyeSBwcm9wZXJ0eSBzbyB0aGV5IGFyZSBhbGwgdHJhY2tlZCBhc1xuICAvLyBkZXBlbmRlbmNpZXMgZm9yIGRlZXAgd2F0Y2hpbmdcbiAgaWYgKHRoaXMuZGVlcCkge1xuICAgIHRyYXZlcnNlKHZhbHVlKVxuICB9XG4gIGlmICh0aGlzLnByZVByb2Nlc3MpIHtcbiAgICB2YWx1ZSA9IHRoaXMucHJlUHJvY2Vzcyh2YWx1ZSlcbiAgfVxuICBpZiAodGhpcy5maWx0ZXJzKSB7XG4gICAgdmFsdWUgPSB2bS5fYXBwbHlGaWx0ZXJzKHZhbHVlLCBudWxsLCB0aGlzLmZpbHRlcnMsIGZhbHNlKVxuICB9XG4gIHRoaXMuYWZ0ZXJHZXQoKVxuICByZXR1cm4gdmFsdWVcbn1cblxuLy8gLyoqXG4vLyAgKiBTZXQgdGhlIGNvcnJlc3BvbmRpbmcgdmFsdWUgd2l0aCB0aGUgc2V0dGVyLlxuLy8gICpcbi8vICAqIEBwYXJhbSB7Kn0gdmFsdWVcbi8vICAqL1xuXG4vLyBwLnNldCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuLy8gICB2YXIgdm0gPSB0aGlzLnZtXG4vLyAgIGlmICh0aGlzLmZpbHRlcnMpIHtcbi8vICAgICB2YWx1ZSA9IHZtLl9hcHBseUZpbHRlcnMoXG4vLyAgICAgICB2YWx1ZSwgdGhpcy52YWx1ZSwgdGhpcy5maWx0ZXJzLCB0cnVlKVxuLy8gICB9XG4vLyAgIHRyeSB7XG4vLyAgICAgdGhpcy5zZXR0ZXIuY2FsbCh2bSwgdm0sIHZhbHVlKVxuLy8gICB9IGNhdGNoIChlKSB7XG4vLyAgICAgLy8gaWYgKGNvbmZpZy53YXJuRXhwcmVzc2lvbkVycm9ycykge1xuLy8gICAgICAgXy53YXJuKFxuLy8gICAgICAgICAnRXJyb3Igd2hlbiBldmFsdWF0aW5nIHNldHRlciBcIicgK1xuLy8gICAgICAgICB0aGlzLmV4cHJlc3Npb24gKyAnXCI6XFxuICAgJyArIGVcbi8vICAgICAgIClcbi8vICAgICAvLyB9XG4vLyAgIH1cbi8vIH1cblxuLyoqXG4gKiBQcmVwYXJlIGZvciBkZXBlbmRlbmN5IGNvbGxlY3Rpb24uXG4gKi9cblxucC5iZWZvcmVHZXQgPSBmdW5jdGlvbiAoKSB7XG4gIE9ic2VydmVyLnRhcmdldCA9IHRoaXNcbn1cblxuLyoqXG4gKiBDbGVhbiB1cCBmb3IgZGVwZW5kZW5jeSBjb2xsZWN0aW9uLlxuICovXG5cbnAuYWZ0ZXJHZXQgPSBmdW5jdGlvbiAoKSB7XG4gIE9ic2VydmVyLnRhcmdldCA9IG51bGxcbiAgdmFyIGkgPSB0aGlzLmRlcHMubGVuZ3RoXG4gIHdoaWxlIChpLS0pIHtcbiAgICB2YXIgZGVwID0gdGhpcy5kZXBzW2ldXG4gICAgaWYgKGRlcCkge1xuICAgICAgZGVwLnJlbW92ZVN1Yih0aGlzKVxuICAgIH1cbiAgfVxuICB0aGlzLmRlcHMgPSB0aGlzLm5ld0RlcHNcbiAgdGhpcy5uZXdEZXBzID0gW11cbn1cblxuLyoqXG4gKiBTdWJzY3JpYmVyIGludGVyZmFjZS5cbiAqIFdpbGwgYmUgY2FsbGVkIHdoZW4gYSBkZXBlbmRlbmN5IGNoYW5nZXMuXG4gKi9cblxuLy8gcC51cGRhdGUgPSBmdW5jdGlvbiAoKSB7XG4vLyAgIGlmICghY29uZmlnLmFzeW5jIHx8IGNvbmZpZy5kZWJ1Zykge1xuLy8gICAgIHRoaXMucnVuKClcbi8vICAgfSBlbHNlIHtcbi8vICAgICBiYXRjaGVyLnB1c2godGhpcylcbi8vICAgfVxuLy8gfVxuXG4vLyAvKipcbi8vICAqIEJhdGNoZXIgam9iIGludGVyZmFjZS5cbi8vICAqIFdpbGwgYmUgY2FsbGVkIGJ5IHRoZSBiYXRjaGVyLlxuLy8gICovXG5cbi8vIHAucnVuID0gZnVuY3Rpb24gKCkge1xucC51cGRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLmFjdGl2ZSkge1xuICAgIHZhciB2YWx1ZSA9IHRoaXMuZ2V0KClcbiAgICBpZiAoXG4gICAgICB2YWx1ZSAhPT0gdGhpcy52YWx1ZSB8fFxuICAgICAgQXJyYXkuaXNBcnJheSh2YWx1ZSkgfHxcbiAgICAgIHRoaXMuZGVlcFxuICAgICkge1xuICAgICAgdmFyIG9sZFZhbHVlID0gdGhpcy52YWx1ZVxuICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlXG4gICAgICB0aGlzLmNiKHZhbHVlLCBvbGRWYWx1ZSlcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBSZW1vdmUgc2VsZiBmcm9tIGFsbCBkZXBlbmRlbmNpZXMnIHN1YmNyaWJlciBsaXN0LlxuICovXG5cbnAudGVhcmRvd24gPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLmFjdGl2ZSkge1xuICAgIC8vIHJlbW92ZSBzZWxmIGZyb20gdm0ncyB3YXRjaGVyIGxpc3RcbiAgICAvLyB3ZSBjYW4gc2tpcCB0aGlzIGlmIHRoZSB2bSBpZiBiZWluZyBkZXN0cm95ZWRcbiAgICAvLyB3aGljaCBjYW4gaW1wcm92ZSB0ZWFyZG93biBwZXJmb3JtYW5jZS5cbiAgICBpZiAoIXRoaXMudm0uX2lzQmVpbmdEZXN0cm95ZWQpIHtcbiAgICAgIHRoaXMudm0uX3dhdGNoZXJzLiRyZW1vdmUodGhpcylcbiAgICB9XG4gICAgdmFyIGkgPSB0aGlzLmRlcHMubGVuZ3RoXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgdGhpcy5kZXBzW2ldLnJlbW92ZVN1Yih0aGlzKVxuICAgIH1cbiAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlXG4gICAgdGhpcy52bSA9IHRoaXMuY2IgPSB0aGlzLnZhbHVlID0gbnVsbFxuICB9XG59XG5cblxuLyoqXG4gKiBSZWNydXNpdmVseSB0cmF2ZXJzZSBhbiBvYmplY3QgdG8gZXZva2UgYWxsIGNvbnZlcnRlZFxuICogZ2V0dGVycywgc28gdGhhdCBldmVyeSBuZXN0ZWQgcHJvcGVydHkgaW5zaWRlIHRoZSBvYmplY3RcbiAqIGlzIGNvbGxlY3RlZCBhcyBhIFwiZGVlcFwiIGRlcGVuZGVuY3kuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICovXG5cbmZ1bmN0aW9uIHRyYXZlcnNlIChvYmopIHtcbiAgdmFyIGtleSwgdmFsLCBpXG4gIGZvciAoa2V5IGluIG9iaikge1xuICAgIHZhbCA9IG9ialtrZXldXG4gICAgaWYgKF8uaXNBcnJheSh2YWwpKSB7XG4gICAgICBpID0gdmFsLmxlbmd0aFxuICAgICAgd2hpbGUgKGktLSkge3RyYXZlcnNlKHZhbFtpXSl9XG4gICAgfSBlbHNlIGlmIChfLmlzT2JqZWN0KHZhbCkpIHtcbiAgICAgIHRyYXZlcnNlKHZhbClcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBXYXRjaGVyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2xpYi92bS93YXRjaGVyLmpzXG4gKiovIiwiLyoqXG4gKiBAZmlsZU92ZXJ2aWV3IERvY3VtZW50ICYgRWxlbWVudCBIZWxwZXJzLlxuICpcbiAqIHJlcXVpcmVkOlxuICogRG9jdW1lbnQjOiBjcmVhdGVFbGVtZW50LCBjcmVhdGVDb21tZW50LCBnZXRSZWZcbiAqIEVsZW1lbnQjOiBhcHBlbmRDaGlsZCwgaW5zZXJ0QmVmb3JlLCByZW1vdmVDaGlsZCwgbmV4dFNpYmxpbmdcbiAqL1xuXG4vKipcbiAqIENyZWF0ZSBhIGJvZHkgYnkgdHlwZVxuICogVXNpbmcgdGhpcy5fYXBwLmRvY1xuICpcbiAqIEBwYXJhbSAge3N0cmluZ30gdHlwZVxuICovXG5leHBvcnQgZnVuY3Rpb24gX2NyZWF0ZUJvZHkodHlwZSkge1xuICBjb25zdCBkb2MgPSB0aGlzLl9hcHAuZG9jXG4gIHJldHVybiBkb2MuY3JlYXRlQm9keSh0eXBlKVxufVxuXG4vKipcbiAqIENyZWF0ZSBhbiBlbGVtZW50IGJ5IHR5cGVcbiAqIFVzaW5nIHRoaXMuX2FwcC5kb2NcbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHR5cGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9jcmVhdGVFbGVtZW50KHR5cGUpIHtcbiAgY29uc3QgZG9jID0gdGhpcy5fYXBwLmRvY1xuICByZXR1cm4gZG9jLmNyZWF0ZUVsZW1lbnQodHlwZSlcbn1cblxuLyoqXG4gKiBDcmVhdGUgYW5kIHJldHVybiBhIGZyYWcgYmxvY2sgZm9yIGFuIGVsZW1lbnQuXG4gKiBUaGUgZnJhZyBibG9jayBoYXMgYSBzdGFydGVyLCBlbmRlciBhbmQgdGhlIGVsZW1lbnQgaXRzZWxmLlxuICpcbiAqIEBwYXJhbSAge29iamVjdH0gZWxlbWVudFxuICovXG5leHBvcnQgZnVuY3Rpb24gX2NyZWF0ZUJsb2NrKGVsZW1lbnQpIHtcbiAgY29uc3Qgc3RhcnQgPSB0aGlzLl9jcmVhdGVCbG9ja1N0YXJ0KClcbiAgY29uc3QgZW5kID0gdGhpcy5fY3JlYXRlQmxvY2tFbmQoKVxuICBjb25zdCBibG9ja0lkID0gbGFzdGVzdEJsb2NrSWQrK1xuICBpZiAoZWxlbWVudC5lbGVtZW50KSB7XG4gICAgZWxlbWVudC5lbGVtZW50Lmluc2VydEJlZm9yZShzdGFydCwgZWxlbWVudC5lbmQpXG4gICAgZWxlbWVudC5lbGVtZW50Lmluc2VydEJlZm9yZShlbmQsIGVsZW1lbnQuZW5kKVxuICAgIGVsZW1lbnQgPSBlbGVtZW50LmVsZW1lbnRcbiAgfVxuICBlbHNlIHtcbiAgICBlbGVtZW50LmFwcGVuZENoaWxkKHN0YXJ0KVxuICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoZW5kKVxuICB9XG4gIHJldHVybiB7c3RhcnQsIGVuZCwgZWxlbWVudCwgYmxvY2tJZH1cbn1cblxubGV0IGxhc3Rlc3RCbG9ja0lkID0gMVxuXG4vKipcbiAqIENyZWF0ZSBhbmQgcmV0dXJuIGEgYmxvY2sgc3RhcnRlci5cbiAqIFVzaW5nIHRoaXMuX2FwcC5kb2NcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9jcmVhdGVCbG9ja1N0YXJ0KCkge1xuICBjb25zdCBkb2MgPSB0aGlzLl9hcHAuZG9jXG4gIGNvbnN0IGFuY2hvciA9IGRvYy5jcmVhdGVDb21tZW50KCdzdGFydCcpXG4gIHJldHVybiBhbmNob3Jcbn1cblxuLyoqXG4gKiBDcmVhdGUgYW5kIHJldHVybiBhIGJsb2NrIGVuZGVyLlxuICogVXNpbmcgdGhpcy5fYXBwLmRvY1xuICovXG5leHBvcnQgZnVuY3Rpb24gX2NyZWF0ZUJsb2NrRW5kKCkge1xuICBjb25zdCBkb2MgPSB0aGlzLl9hcHAuZG9jXG4gIGNvbnN0IGFuY2hvciA9IGRvYy5jcmVhdGVDb21tZW50KCdlbmQnKVxuICByZXR1cm4gYW5jaG9yXG59XG5cbi8qKlxuICogQXR0YWNoIHRhcmdldCB0byBhIGNlcnRhaW4gZGVzdCB1c2luZyBhcHBlbmRDaGlsZCBieSBkZWZhdWx0LlxuICogSWYgdGhlIGRlc3QgaXMgYSBmcmFnIGJsb2NrIHRoZW4gaW5zZXJ0IGJlZm9yZSB0aGUgZW5kZXIuXG4gKiBJZiB0aGUgdGFyZ2V0IGlzIGEgZnJhZyBibG9jayB0aGVuIGF0dGFjaCB0aGUgc3RhcnRlciBhbmQgZW5kZXIgaW4gb3JkZXIuXG4gKlxuICogQHBhcmFtICB7b2JqZWN0fSB0YXJnZXRcbiAqIEBwYXJhbSAge29iamVjdH0gZGVzdFxuICovXG5leHBvcnQgZnVuY3Rpb24gX2F0dGFjaFRhcmdldCh0YXJnZXQsIGRlc3QpIHtcblxuICBpZiAoZGVzdC5lbGVtZW50KSB7XG4gICAgY29uc3QgYmVmb3JlID0gZGVzdC5lbmRcbiAgICBjb25zdCBhZnRlciA9IGRlc3QudXBkYXRlTWFya1xuICAgIC8vIHB1c2ggbmV3IHRhcmdldCBmb3Igd2F0Y2ggbGlzdCB1cGRhdGUgbGF0ZXJcbiAgICBpZiAoZGVzdC5jaGlsZHJlbikge1xuICAgICAgZGVzdC5jaGlsZHJlbi5wdXNoKHRhcmdldClcbiAgICB9XG4gICAgLy8gZm9yIGNoZWNrIHJlcGVhdCBjYXNlXG4gICAgaWYgKGFmdGVyKSB7XG4gICAgICB0aGlzLl9tb3ZlVGFyZ2V0KHRhcmdldCwgYWZ0ZXIpXG4gICAgICBkZXN0LnVwZGF0ZU1hcmsgPSB0YXJnZXQuZWxlbWVudCA/IHRhcmdldC5lbmQgOiB0YXJnZXRcbiAgICB9XG4gICAgZWxzZSBpZiAodGFyZ2V0LmVsZW1lbnQpIHtcbiAgICAgIGRlc3QuZWxlbWVudC5pbnNlcnRCZWZvcmUodGFyZ2V0LnN0YXJ0LCBiZWZvcmUpXG4gICAgICBkZXN0LmVsZW1lbnQuaW5zZXJ0QmVmb3JlKHRhcmdldC5lbmQsIGJlZm9yZSlcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBkZXN0LmVsZW1lbnQuaW5zZXJ0QmVmb3JlKHRhcmdldCwgYmVmb3JlKVxuICAgIH1cbiAgfVxuICBlbHNlIHtcbiAgICBpZiAodGFyZ2V0LmVsZW1lbnQpIHtcbiAgICAgIGRlc3QuYXBwZW5kQ2hpbGQodGFyZ2V0LnN0YXJ0KVxuICAgICAgZGVzdC5hcHBlbmRDaGlsZCh0YXJnZXQuZW5kKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGRlc3QuYXBwZW5kQ2hpbGQodGFyZ2V0KVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIE1vdmUgdGFyZ2V0IGJlZm9yZSBhIGNlcnRhaW4gZWxlbWVudC4gVGhlIHRhcmdldCBtYXliZSBibG9jayBvciBlbGVtZW50LlxuICpcbiAqIEBwYXJhbSAge29iamVjdH0gdGFyZ2V0XG4gKiBAcGFyYW0gIHtvYmplY3R9IGJlZm9yZVxuICovXG5leHBvcnQgZnVuY3Rpb24gX21vdmVUYXJnZXQodGFyZ2V0LCBhZnRlcikge1xuICBpZiAodGFyZ2V0LmVsZW1lbnQpIHtcbiAgICB0aGlzLl9tb3ZlQmxvY2sodGFyZ2V0LCBhZnRlcilcbiAgfVxuICBlbHNlIHtcbiAgICB0aGlzLl9tb3ZlRWxlbWVudCh0YXJnZXQsIGFmdGVyKVxuICB9XG59XG5cbi8qKlxuICogTW92ZSBlbGVtZW50IGJlZm9yZSBhIGNlcnRhaW4gZWxlbWVudC5cbiAqXG4gKiBAcGFyYW0gIHtvYmplY3R9IGVsZW1lbnRcbiAqIEBwYXJhbSAge29iamVjdH0gYmVmb3JlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfbW92ZUVsZW1lbnQoZWxlbWVudCwgYWZ0ZXIpIHtcbiAgY29uc3QgZG9jID0gdGhpcy5fYXBwLmRvY1xuICBjb25zdCBwYXJlbnQgPSBkb2MuZ2V0UmVmKGFmdGVyLnBhcmVudFJlZilcblxuICBpZiAocGFyZW50KSB7XG4gICAgcGFyZW50Lmluc2VydEFmdGVyKGVsZW1lbnQsIGFmdGVyKVxuICB9XG59XG5cbi8qKlxuICogTW92ZSBhbGwgZWxlbWVudHMgb2YgdGhlIGJsb2NrIGJlZm9yZSBhIGNlcnRhaW4gZWxlbWVudC5cbiAqXG4gKiBAcGFyYW0gIHtvYmplY3R9IGZyYWdCbG9ja1xuICogQHBhcmFtICB7b2JqZWN0fSBiZWZvcmVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9tb3ZlQmxvY2soZnJhZ0Jsb2NrLCBhZnRlcikge1xuICBjb25zdCBkb2MgPSB0aGlzLl9hcHAuZG9jXG4gIGNvbnN0IHBhcmVudCA9IGRvYy5nZXRSZWYoYWZ0ZXIucGFyZW50UmVmKVxuXG4gIGlmIChwYXJlbnQpIHtcbiAgICBsZXQgZWwgPSBmcmFnQmxvY2suc3RhcnRcbiAgICBjb25zdCBncm91cCA9IFtlbF1cblxuICAgIHdoaWxlIChlbCAmJiBlbCAhPT0gZnJhZ0Jsb2NrLmVuZCkge1xuICAgICAgZWwgPSBlbC5uZXh0KClcbiAgICAgIGdyb3VwLnB1c2goZWwpXG4gICAgfVxuXG4gICAgbGV0IHRlbXAgPSBhZnRlclxuICAgIGdyb3VwLmZvckVhY2goKGVsKSA9PiB7XG4gICAgICBwYXJlbnQuaW5zZXJ0QWZ0ZXIoZWwsIHRlbXApXG4gICAgICB0ZW1wID0gZWxcbiAgICB9KVxuICB9XG59XG5cbi8qKlxuICogUmVtb3ZlIHRhcmdldCBmcm9tIERPTSB0cmVlLlxuICogSWYgdGhlIHRhcmdldCBpcyBhIGZyYWcgYmxvY2sgdGhlbiBjYWxsIF9yZW1vdmVCbG9ja1xuICpcbiAqIEBwYXJhbSAge29iamVjdH0gdGFyZ2V0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfcmVtb3ZlVGFyZ2V0KHRhcmdldCkge1xuXG4gIGlmICh0YXJnZXQuZWxlbWVudCkge1xuICAgIHRoaXMuX3JlbW92ZUJsb2NrKHRhcmdldClcbiAgfVxuICBlbHNlIHtcbiAgICB0aGlzLl9yZW1vdmVFbGVtZW50KHRhcmdldClcbiAgfVxufVxuXG4vKipcbiAqIFJlbW92ZSBhIGNlcnRhaW4gZWxlbWVudC5cbiAqIFVzaW5nIHRoaXMuX2FwcC5kb2NcbiAqXG4gKiBAcGFyYW0gIHtvYmplY3R9IHRhcmdldFxuICovXG5leHBvcnQgZnVuY3Rpb24gX3JlbW92ZUVsZW1lbnQodGFyZ2V0KSB7XG4gIGNvbnN0IGRvYyA9IHRoaXMuX2FwcC5kb2NcbiAgY29uc3QgcGFyZW50ID0gZG9jLmdldFJlZih0YXJnZXQucGFyZW50UmVmKVxuXG4gIGlmIChwYXJlbnQpIHtcbiAgICBwYXJlbnQucmVtb3ZlQ2hpbGQodGFyZ2V0KVxuICB9XG59XG5cbi8qKlxuICogUmVtb3ZlIGEgZnJhZyBibG9jay5cbiAqIFRoZSBzZWNvbmQgcGFyYW0gZGVjaWRlcyB3aGV0aGVyIHRoZSBibG9jayBzZWxmIHNob3VsZCBiZSByZW1vdmVkIHRvby5cbiAqXG4gKiBAcGFyYW0gIHtvYmplY3R9ICBmcmFnQmxvY2tcbiAqIEBwYXJhbSAge0Jvb2xlYW59IHByZXNlcnZlQmxvY2s9ZmFsc2VcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9yZW1vdmVCbG9jayhmcmFnQmxvY2ssIHByZXNlcnZlQmxvY2sgPSBmYWxzZSkge1xuICBjb25zdCByZXN1bHQgPSBbXVxuICBsZXQgZWwgPSBmcmFnQmxvY2suc3RhcnQubmV4dCgpXG5cbiAgd2hpbGUgKGVsICYmIGVsICE9PSBmcmFnQmxvY2suZW5kKSB7XG4gICAgcmVzdWx0LnB1c2goZWwpXG4gICAgZWwgPSBlbC5uZXh0KClcbiAgfVxuXG4gIGlmICghcHJlc2VydmVCbG9jaykge1xuICAgIHRoaXMuX3JlbW92ZUVsZW1lbnQoZnJhZ0Jsb2NrLnN0YXJ0KVxuICB9XG4gIHJlc3VsdC5mb3JFYWNoKChlbCkgPT4ge1xuICAgIHRoaXMuX3JlbW92ZUVsZW1lbnQoZWwpXG4gIH0pXG4gIGlmICghcHJlc2VydmVCbG9jaykge1xuICAgIHRoaXMuX3JlbW92ZUVsZW1lbnQoZnJhZ0Jsb2NrLmVuZClcbiAgfVxufVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2xpYi92bS9kb20taGVscGVyLmpzXG4gKiovIiwiZnVuY3Rpb24gRXZ0KHR5cGUsIGRldGFpbCkge1xuICBpZiAoZGV0YWlsIGluc3RhbmNlb2YgRXZ0KSB7XG4gICAgcmV0dXJuIGRldGFpbFxuICB9XG5cbiAgdGhpcy50aW1lc3RhbXAgPSBEYXRlLm5vdygpXG4gIHRoaXMuZGV0YWlsID0gZGV0YWlsXG4gIHRoaXMudHlwZSA9IHR5cGVcblxuICBsZXQgc2hvdWxkU3RvcCA9IGZhbHNlXG4gIHRoaXMuc3RvcCA9IGZ1bmN0aW9uICgpIHtcbiAgICBzaG91bGRTdG9wID0gdHJ1ZVxuICB9XG4gIHRoaXMuaGFzU3RvcHBlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gc2hvdWxkU3RvcFxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiAkZW1pdCh0eXBlLCBkZXRhaWwpIHtcbiAgY29uc3QgZXZlbnRzID0gdGhpcy5fdm1FdmVudHNcbiAgY29uc3QgaGFuZGxlckxpc3QgPSBldmVudHNbdHlwZV1cbiAgaWYgKGhhbmRsZXJMaXN0KSB7XG4gICAgbGV0IGV2dCA9IG5ldyBFdnQodHlwZSwgZGV0YWlsKVxuICAgIGhhbmRsZXJMaXN0LmZvckVhY2goKGhhbmRsZXIpID0+IHtcbiAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLCBldnQpXG4gICAgfSlcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gJGRpc3BhdGNoKHR5cGUsIGRldGFpbCkge1xuICBjb25zdCBldnQgPSBuZXcgRXZ0KHR5cGUsIGRldGFpbClcbiAgdGhpcy4kZW1pdCh0eXBlLCBldnQpXG5cbiAgaWYgKCFldnQuaGFzU3RvcHBlZCgpICYmIHRoaXMuX3BhcmVudCAmJiB0aGlzLl9wYXJlbnQuJGRpc3BhdGNoKSB7XG4gICAgdGhpcy5fcGFyZW50LiRkaXNwYXRjaCh0eXBlLCBldnQpXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uICRicm9hZGNhc3QodHlwZSwgZGV0YWlsKSB7XG4gIGNvbnN0IGV2dCA9IG5ldyBFdnQodHlwZSwgZGV0YWlsKVxuICB0aGlzLiRlbWl0KHR5cGUsIGV2dClcblxuICBpZiAoIWV2dC5oYXNTdG9wcGVkKCkgJiYgdGhpcy5fY2hpbGRyZW5WbXMpIHtcbiAgICB0aGlzLl9jaGlsZHJlblZtcy5mb3JFYWNoKChzdWJWbSkgPT4ge1xuICAgICAgc3ViVm0uJGJyb2FkY2FzdCh0eXBlLCBldnQpXG4gICAgfSlcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gJG9uKHR5cGUsIGhhbmRsZXIpIHtcbiAgaWYgKCF0eXBlIHx8IHR5cGVvZiBoYW5kbGVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgY29uc3QgZXZlbnRzID0gdGhpcy5fdm1FdmVudHNcbiAgY29uc3QgaGFuZGxlckxpc3QgPSBldmVudHNbdHlwZV0gfHwgW11cbiAgaGFuZGxlckxpc3QucHVzaChoYW5kbGVyKVxuICBldmVudHNbdHlwZV0gPSBoYW5kbGVyTGlzdFxuXG4gIC8vIGZpeGVkIG9sZCB2ZXJzaW9uIGxpZmVjeWNsZSBkZXNpZ25cbiAgaWYgKHR5cGUgPT09ICdob29rOnJlYWR5JyAmJiB0aGlzLl9yZWFkeSkge1xuICAgIHRoaXMuJGVtaXQoJ2hvb2s6cmVhZHknKVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiAkb2ZmKHR5cGUsIGhhbmRsZXIpIHtcbiAgaWYgKCF0eXBlKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgY29uc3QgZXZlbnRzID0gdGhpcy5fdm1FdmVudHNcbiAgaWYgKCFoYW5kbGVyKSB7XG4gICAgZGVsZXRlIGV2ZW50c1t0eXBlXVxuICAgIHJldHVyblxuICB9XG4gIGNvbnN0IGhhbmRsZXJMaXN0ID0gZXZlbnRzW3R5cGVdXG4gIGlmICghaGFuZGxlckxpc3QpIHtcbiAgICByZXR1cm5cbiAgfVxuICBoYW5kbGVyTGlzdC4kcmVtb3ZlKGhhbmRsZXIpXG59XG5cbmNvbnN0IExJRkVfQ1lDTEVfVFlQRVMgPSBbJ2luaXQnLCAnY3JlYXRlZCcsICdyZWFkeSddXG5cbmV4cG9ydCBmdW5jdGlvbiBfaW5pdEV2ZW50cyhleHRlcm5hbEV2ZW50cykge1xuICBjb25zdCBvcHRpb25zID0gdGhpcy5fb3B0aW9ucyB8fCB7fVxuICBjb25zdCBldmVudHMgPSBvcHRpb25zLmV2ZW50cyB8fCB7fVxuICBmb3IgKGNvbnN0IHR5cGUxIGluIGV2ZW50cykge1xuICAgIHRoaXMuJG9uKHR5cGUxLCBldmVudHNbdHlwZTFdKVxuICB9XG4gIGZvciAoY29uc3QgdHlwZTIgaW4gZXh0ZXJuYWxFdmVudHMpIHtcbiAgICB0aGlzLiRvbih0eXBlMiwgZXh0ZXJuYWxFdmVudHNbdHlwZTJdKVxuICB9XG4gIExJRkVfQ1lDTEVfVFlQRVMuZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgIHRoaXMuJG9uKGBob29rOiR7dHlwZX1gLCBvcHRpb25zW3R5cGVdKVxuICB9KVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9saWIvdm0vZXZlbnRzLmpzXG4gKiovIiwibGV0IG5hdGl2ZU1vZHVsZXMgPSB7fVxuXG5mdW5jdGlvbiBhc3NpZ25Nb2R1bGVzKG1vZHVsZXMsIGlmUmVwbGFjZSkge1xuXG4gIGZvciAoY29uc3QgbW9kdWxlTmFtZSBpbiBtb2R1bGVzKSB7XG5cbiAgICAvLyBpbml0IGBtb2R1bGVzW21vZHVsZU5hbWVdW11gXG4gICAgbGV0IG1ldGhvZHMgPSBuYXRpdmVNb2R1bGVzW21vZHVsZU5hbWVdXG4gICAgaWYgKCFtZXRob2RzKSB7XG4gICAgICBtZXRob2RzID0ge31cbiAgICAgIG5hdGl2ZU1vZHVsZXNbbW9kdWxlTmFtZV0gPSBtZXRob2RzXG4gICAgfVxuXG4gICAgLy8gcHVzaCBlYWNoIG5vbi1leGlzdGVkIG5ldyBtZXRob2RcbiAgICBtb2R1bGVzW21vZHVsZU5hbWVdLmZvckVhY2goZnVuY3Rpb24gKG1ldGhvZCkge1xuICAgICAgaWYgKHR5cGVvZiBtZXRob2QgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIG1ldGhvZCA9IHtcbiAgICAgICAgICBuYW1lOiBtZXRob2RcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoIW1ldGhvZHNbbWV0aG9kLm5hbWVdIHx8IGlmUmVwbGFjZSkge1xuICAgICAgICBtZXRob2RzW21ldGhvZC5uYW1lXSA9IG1ldGhvZFxuICAgICAgfVxuICAgIH0pXG4gIH1cbn1cblxuZnVuY3Rpb24gYXNzaWduQXBpcyhDdG9yLCBhcGlzKSB7XG4gIGNvbnN0IHAgPSBDdG9yLnByb3RvdHlwZVxuXG4gIGZvciAoY29uc3QgYXBpTmFtZSBpbiBhcGlzKSB7XG4gICAgaWYgKCFwLmhhc093blByb3BlcnR5KGFwaU5hbWUpKSB7XG4gICAgICBwW2FwaU5hbWVdID0gYXBpc1thcGlOYW1lXVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJNb2R1bGVzKCkge1xuICBuYXRpdmVNb2R1bGVzID0ge31cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldE1vZHVsZShtb2R1bGVOYW1lKSB7XG4gIHJldHVybiBuYXRpdmVNb2R1bGVzW21vZHVsZU5hbWVdXG59XG5cbi8qKlxuICogQGNvbnRleHQgYSBpbnN0YW5jZSBvZiBBcHBJbnN0YW5jZVxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVxdWlyZU1vZHVsZShtb2R1bGVOYW1lKSB7XG4gIGNvbnN0IG1ldGhvZHMgPSBuYXRpdmVNb2R1bGVzW21vZHVsZU5hbWVdXG4gIGNvbnN0IHRhcmdldCA9IHt9XG5cbiAgZm9yIChjb25zdCBtZXRob2ROYW1lIGluIG1ldGhvZHMpIHtcbiAgICB0YXJnZXRbbWV0aG9kTmFtZV0gPSAoLi4uYXJncykgPT4gdGhpcy5jYWxsVGFza3Moe1xuICAgICAgbW9kdWxlOiBtb2R1bGVOYW1lLFxuICAgICAgbWV0aG9kOiBtZXRob2ROYW1lLFxuICAgICAgYXJnczogYXJnc1xuICAgIH0pXG4gIH1cblxuICByZXR1cm4gdGFyZ2V0XG59XG5cbi8qKlxuICogQGNvbnRleHQgVm1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyTW9kdWxlcyhtb2R1bGVzLCBpZlJlcGxhY2UpIHtcbiAgYXNzaWduTW9kdWxlcyhtb2R1bGVzLCBpZlJlcGxhY2UpXG59XG5cbi8qKlxuICogQGNvbnRleHQgVm1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyTWV0aG9kcyhhcGlzKSB7XG4gIGFzc2lnbkFwaXModGhpcywgYXBpcylcbn1cblxuLyoqXG4gKiBAY29udGV4dCBhIGluc3RhbmNlIG9mIEFwcEluc3RhbmNlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXF1aXJlQ29tcG9uZW50KG5hbWUpIHtcbiAgY29uc3Qge2N1c3RvbUNvbXBvbmVudE1hcH0gPSB0aGlzXG4gIHJldHVybiBjdXN0b21Db21wb25lbnRNYXBbbmFtZV1cbn1cblxuLyoqXG4gKiBAY29udGV4dCBhIGluc3RhbmNlIG9mIEFwcEluc3RhbmNlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlckNvbXBvbmVudChuYW1lLCBleHBvcnRzKSB7XG4gIGNvbnN0IHtjdXN0b21Db21wb25lbnRNYXB9ID0gdGhpc1xuXG4gIGlmIChjdXN0b21Db21wb25lbnRNYXBbbmFtZV0pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYGRlZmluZSBhIGNvbXBvbmVudCgke25hbWV9KSB0aGF0IGFscmVhZHkgZXhpc3RzYClcbiAgfVxuXG4gIGN1c3RvbUNvbXBvbmVudE1hcFtuYW1lXSA9IGV4cG9ydHNcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2xpYi9hcHAvcmVnaXN0ZXIuanNcbiAqKi8iLCJpbXBvcnQgc2VtdmVyIGZyb20gJ3NlbXZlcidcbmltcG9ydCB7ZXh0ZW5kLCBpc1BsYWluT2JqZWN0LCB0eXBvZn0gIGZyb20gJy4uL3V0aWwnXG5cbi8qKlxuICogW25vcm1hbGl6ZVZlcnNpb24gZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtTdHJpbmd9IFZlcnNpb24uIGllOiAxLCAxLjAsIDEuMC4wXG4gKiBAcmV0dXJuIHtTdHJpbmd9IFZlcnNpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZVZlcnNpb24gKHYpIHtcbiAgY29uc3QgaXNWYWxpZCA9IHNlbXZlci52YWxpZCh2KSA/IHRydWUgOiBmYWxzZVxuICBpZiAoaXNWYWxpZCkge1xuICAgIHJldHVybiB2XG4gIH1cblxuICB2ID0gdHlwZW9mICh2KSA9PT0gJ3N0cmluZycgPyB2IDogJydcbiAgY29uc3Qgc3BsaXQgPSB2LnNwbGl0KCcuJylcbiAgbGV0IGkgPSAwXG4gIGxldCByZXN1bHQgPSBbXVxuXG4gIHdoaWxlIChpIDwgMykge1xuICAgIGNvbnN0IHMgPSB0eXBlb2YgKHNwbGl0W2ldKSA9PT0gJ3N0cmluZycgJiYgc3BsaXRbaV0gPyBzcGxpdFtpXSA6ICcwJ1xuICAgIHJlc3VsdC5wdXNoKHMpXG4gICAgaSsrXG4gIH1cblxuICByZXR1cm4gcmVzdWx0LmpvaW4oJy4nKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RXJyb3IgKGtleSwgdmFsLCBjcml0ZXJpYSkge1xuICBsZXQgcmVzdWx0ID0ge1xuICAgIGlzRG93bmdyYWRlOiB0cnVlLFxuICAgIGVycm9yVHlwZTogMSxcbiAgICBjb2RlOiAxMDAwXG4gIH1cbiAgbGV0IGdldE1zZyA9IGZ1bmN0aW9uIChrZXksIHZhbCwgY3JpdGVyaWEpIHtcbiAgICByZXR1cm4gJ0Rvd25ncmFkZVsnICsga2V5ICsgJ10gOjogZGV2aWNlSW5mbyAnXG4gICAgICArIHZhbCArICcgbWF0Y2hlZCBjcml0ZXJpYSAnICsgY3JpdGVyaWFcbiAgfVxuICBjb25zdCBfa2V5ID0ga2V5LnRvTG93ZXJDYXNlKClcblxuICByZXN1bHQuZXJyb3JNZXNzYWdlID0gZ2V0TXNnKGtleSwgdmFsLCBjcml0ZXJpYSlcblxuICBpZiAoX2tleS5pbmRleE9mKCdvc3ZlcnNpb24nKSA+PSAwKSB7XG4gICAgcmVzdWx0LmNvZGUgPSAxMDAxXG4gIH1lbHNlIGlmIChfa2V5LmluZGV4T2YoJ2FwcHZlcnNpb24nKSA+PSAwKSB7XG4gICAgcmVzdWx0LmNvZGUgPSAxMDAyXG4gIH1lbHNlIGlmIChfa2V5LmluZGV4T2YoJ3dlZXh2ZXJzaW9uJykgPj0gMCkge1xuICAgIHJlc3VsdC5jb2RlID0gMTAwM1xuICB9ZWxzZSBpZiAoX2tleS5pbmRleE9mKCdkZXZpY2Vtb2RlbCcpID49IDApIHtcbiAgICByZXN1bHQuY29kZSA9IDEwMDRcbiAgfVxuXG4gIHJldHVybiByZXN1bHRcbn1cblxuLyoqXG4gKiBXRUVYIGZyYW1ld29yayBpbnB1dChkZXZpY2VJbmZvKVxuICoge1xuICogICBwbGF0Zm9ybTogJ2lPUycgb3IgJ2FuZHJvaWQnXG4gKiAgIG9zVmVyc2lvbjogJzEuMC4wJyBvciAnMS4wJyBvciAnMSdcbiAqICAgYXBwVmVyc2lvbjogJzEuMC4wJyBvciAnMS4wJyBvciAnMSdcbiAqICAgd2VleFZlcnNpb246ICcxLjAuMCcgb3IgJzEuMCcgb3IgJzEnXG4gKiAgIGREZXZpY2VNb2RlbDogJ01PREVMX05BTUUnXG4gKiB9XG4gKlxuICogZG93bmdyYWRlIGNvbmZpZyhjb25maWcpXG4gKiB7XG4gKiAgIGlvczoge1xuICogICAgIG9zVmVyc2lvbjogJz4xLjAuMCcgb3IgJz49MS4wLjAnIG9yICc8MS4wLjAnIG9yICc8PTEuMC4wJyBvciAnMS4wLjAnXG4gKiAgICAgYXBwVmVyc2lvbjogJz4xLjAuMCcgb3IgJz49MS4wLjAnIG9yICc8MS4wLjAnIG9yICc8PTEuMC4wJyBvciAnMS4wLjAnXG4gKiAgICAgd2VleFZlcnNpb246ICc+MS4wLjAnIG9yICc+PTEuMC4wJyBvciAnPDEuMC4wJyBvciAnPD0xLjAuMCcgb3IgJzEuMC4wJ1xuICogICAgIGRldmljZU1vZGVsOiBbJ21vZGVsQScsICdtb2RlbEInLCAuLi5dXG4gKiAgIH0sXG4gKiAgIGFuZHJvaWQ6IHtcbiAqICAgICBvc1ZlcnNpb246ICc+MS4wLjAnIG9yICc+PTEuMC4wJyBvciAnPDEuMC4wJyBvciAnPD0xLjAuMCcgb3IgJzEuMC4wJ1xuICogICAgIGFwcFZlcnNpb246ICc+MS4wLjAnIG9yICc+PTEuMC4wJyBvciAnPDEuMC4wJyBvciAnPD0xLjAuMCcgb3IgJzEuMC4wJ1xuICogICAgIHdlZXhWZXJzaW9uOiAnPjEuMC4wJyBvciAnPj0xLjAuMCcgb3IgJzwxLjAuMCcgb3IgJzw9MS4wLjAnIG9yICcxLjAuMCdcbiAqICAgICBkZXZpY2VNb2RlbDogWydtb2RlbEEnLCAnbW9kZWxCJywgLi4uXVxuICogICB9XG4gKiB9XG4gKlxuICpcbiAqIEBwYXJhbSAge29iamVjdH0gZGV2aWNlSW5mbyBXZWV4IFNESyBmcmFtZXdvcmsgaW5wdXRcbiAqIEBwYXJhbSAge29iamVjdH0gY29uZmlnICAgICB1c2VyIGlucHV0XG4gKiBAcmV0dXJuIHtPYmplY3R9ICAgICAgICAgICAgeyBpc0Rvd25ncmFkZTogdHJ1ZS9mYWxzZSwgZXJyb3JNZXNzYWdlLi4uIH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrIChjb25maWcsIGRldmljZUluZm8pIHtcbiAgZGV2aWNlSW5mbyA9IGRldmljZUluZm8gfHwgZ2xvYmFsLldYRW52aXJvbm1lbnRcbiAgZGV2aWNlSW5mbyA9IGlzUGxhaW5PYmplY3QoZGV2aWNlSW5mbykgPyBkZXZpY2VJbmZvIDoge31cbiAgY29uZmlnID0gaXNQbGFpbk9iamVjdChjb25maWcpID8gY29uZmlnIDoge31cbiAgY29uc3QgcGxhdGZvcm0gPSBkZXZpY2VJbmZvLnBsYXRmb3JtIHx8ICd1bmtub3cnXG4gIGNvbnN0IGRQbGF0Zm9ybSA9IHBsYXRmb3JtLnRvTG93ZXJDYXNlKClcbiAgY29uc3QgY09iaiA9IGNvbmZpZ1tkUGxhdGZvcm1dIHx8IHt9XG5cbiAgbGV0IHJlc3VsdCA9IHtcbiAgICBpc0Rvd25ncmFkZTogZmFsc2UgLy8gZGVmYXV0bCBpcyBwYXNzXG4gIH1cblxuICBmb3IgKGxldCBpIGluIGRldmljZUluZm8pIHtcbiAgICBjb25zdCBrZXkgPSBpXG4gICAgY29uc3Qga2V5TG93ZXIgPSBrZXkudG9Mb3dlckNhc2UoKVxuICAgIGNvbnN0IHZhbCA9IGRldmljZUluZm9baV1cbiAgICBjb25zdCBpc1ZlcnNpb24gPSBrZXlMb3dlci5pbmRleE9mKCd2ZXJzaW9uJykgPj0gMCA/IHRydWUgOiBmYWxzZVxuICAgIGNvbnN0IGlzRGV2aWNlTW9kZWwgPSBrZXlMb3dlci5pbmRleE9mKCdkZXZpY2Vtb2RlbCcpID49IDAgPyB0cnVlIDogZmFsc2VcbiAgICBjb25zdCBjcml0ZXJpYSA9IGNPYmpbaV1cblxuICAgIGlmIChjcml0ZXJpYSAmJiBpc1ZlcnNpb24pIHtcbiAgICAgIGNvbnN0IGMgPSB0aGlzLm5vcm1hbGl6ZVZlcnNpb24oY3JpdGVyaWEpXG4gICAgICBjb25zdCBkID0gdGhpcy5ub3JtYWxpemVWZXJzaW9uKGRldmljZUluZm9baV0pXG5cbiAgICAgIGlmIChzZW12ZXIuc2F0aXNmaWVzKGQsIGMpKSB7XG4gICAgICAgIHJlc3VsdCA9IGV4dGVuZCh0aGlzLmdldEVycm9yKGtleSwgdmFsLCBjcml0ZXJpYSkpXG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgfWVsc2UgaWYgKGlzRGV2aWNlTW9kZWwpIHtcbiAgICAgIGNvbnN0IF9jcml0ZXJpYSA9IHR5cG9mKGNyaXRlcmlhKSA9PT0gJ2FycmF5JyA/IGNyaXRlcmlhIDogW2NyaXRlcmlhXVxuICAgICAgaWYgKF9jcml0ZXJpYS5pbmRleE9mKHZhbCkgPj0gMCkge1xuICAgICAgICByZXN1bHQgPSBleHRlbmQodGhpcy5nZXRFcnJvcihrZXksIHZhbCwgY3JpdGVyaWEpKVxuICAgICAgICBicmVha1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHRcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2xpYi9hcHAvZG93bmdyYWRlLmpzXG4gKiovIiwiLyoqXG4gKiBAZmlsZU92ZXJ2aWV3XG4gKiBpbnN0YW5jZSBjb250cm9scyBmcm9tIG5hdGl2ZVxuICpcbiAqIC0gaW5pdCBidW5kbGVcbiAqIC0gZmlyZSBldmVudFxuICogLSBjYWxsYmFja1xuICogLSBkZXN0cm95XG4gKlxuICogY29ycmVzcG9uZGVkIHdpdGggdGhlIEFQSSBvZiBpbnN0YW5jZSBtYW5hZ2VyIChmcmFtZXdvcmsuanMpXG4gKi9cblxuaW1wb3J0IHtcbiAgYmluZCwgZXh0ZW5kXG59XG5mcm9tICcuLi91dGlsJ1xuaW1wb3J0ICogYXMgcGVyZiBmcm9tICcuLi9wZXJmJ1xuaW1wb3J0IExpc3RlbmVyLCB7Y3JlYXRlQWN0aW9ufSBmcm9tICcuL2RvbS1saXN0ZW5lcidcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXQoY29kZSwgZGF0YSkge1xuICB2YXIgcmVzdWx0XG4gIC8vIEBzZWU6IGxpYi9hcHAvYnVuZGxlLmpzXG4gIGNvbnN0IGRlZmluZSA9IGJpbmQodGhpcy5kZWZpbmUsIHRoaXMpXG4gIGNvbnN0IGJvb3RzdHJhcCA9IChuYW1lLCBjb25maWcsIF9kYXRhKSA9PiB7XG4gICAgcmVzdWx0ID0gdGhpcy5ib290c3RyYXAobmFtZSwgY29uZmlnLCBfZGF0YSB8fCBkYXRhKVxuICAgIHRoaXMuZG9jLmxpc3RlbmVyLmNyZWF0ZUZpbmlzaCgpXG4gICAgdGhpcy5kb2MuY2xvc2UoKVxuICB9XG5cbiAgLy8gYmFja3dhcmQocmVnaXN0ZXIvcmVuZGVyKVxuICBjb25zdCByZWdpc3RlciA9IGJpbmQodGhpcy5yZWdpc3RlciwgdGhpcylcbiAgY29uc3QgcmVuZGVyID0gKG5hbWUsIF9kYXRhKSA9PiB7XG4gICAgcmVzdWx0ID0gdGhpcy5ib290c3RyYXAobmFtZSwge30sIF9kYXRhKVxuICB9XG5cbiAgY29uc3QgcmVxdWlyZSA9IG5hbWUgPT4gX2RhdGEgPT4ge1xuICAgIHJlc3VsdCA9IHRoaXMuYm9vdHN0cmFwKG5hbWUsIHt9LCBfZGF0YSlcbiAgfVxuXG4gIGNvbnN0IGRvY3VtZW50ID0gdGhpcy5kb2NcblxuICBwZXJmLnN0YXJ0KCdydW4gYnVuZGxlJywgdGhpcy5pZClcblxuICBsZXQgZnVuY3Rpb25Cb2R5XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICBpZiAodHlwZW9mIGNvZGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAvLyBgZnVuY3Rpb24gKCkgey4uLn1gIC0+IGB7Li4ufWBcbiAgICAvLyBub3QgdmVyeSBzdHJpY3RcbiAgICBmdW5jdGlvbkJvZHkgPSBjb2RlLnRvU3RyaW5nKCkuc3Vic3RyKDEyKVxuICB9IGVsc2UgaWYgKGNvZGUpIHtcbiAgICBmdW5jdGlvbkJvZHkgPSBjb2RlLnRvU3RyaW5nKClcbiAgfVxuXG4gIGxldCBmbiA9IG5ldyBGdW5jdGlvbihcbiAgICAnZGVmaW5lJyxcbiAgICAncmVxdWlyZScsXG4gICAgJ2RvY3VtZW50JyxcbiAgICAnYm9vdHN0cmFwJyxcbiAgICAncmVnaXN0ZXInLFxuICAgICdyZW5kZXInLFxuICAgIGZ1bmN0aW9uQm9keVxuICApXG5cbiAgZm4oZGVmaW5lLCByZXF1aXJlLCBkb2N1bWVudCwgYm9vdHN0cmFwLCByZWdpc3RlciwgcmVuZGVyKVxuXG4gIHBlcmYuZW5kKCdydW4gYnVuZGxlJywgdGhpcy5pZClcbiAgcmV0dXJuIHJlc3VsdFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgdGhpcy5pZCA9ICcnXG4gIHRoaXMuZXZlbnRNYW5hZ2VyID0gbnVsbFxuICB0aGlzLm9wdGlvbnMgPSBudWxsXG4gIHRoaXMuYmxvY2tzID0gbnVsbFxuICB0aGlzLnZtID0gbnVsbFxuICB0aGlzLmRvYyA9IG51bGxcbiAgdGhpcy5jdXN0b21Db21wb25lbnRNYXAgPSBudWxsXG4gIHRoaXMuY2FsbGJhY2tzID0gbnVsbFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Um9vdEVsZW1lbnQoKSB7XG4gIGNvbnN0IGRvYyA9IHRoaXMuZG9jIHx8IHt9XG4gIGNvbnN0IGJvZHkgPSBkb2MuYm9keSB8fCB7fVxuICByZXR1cm4gYm9keS50b0pTT04gPyBib2R5LnRvSlNPTigpIDoge31cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUFjdGlvbnMoYWRkb25UYXNrcykge1xuICB0aGlzLmRpZmZlci5mbHVzaCgpXG4gIGNvbnN0IHRhc2tzID0gW11cbiAgaWYgKHRoaXMubGlzdGVuZXIgJiYgdGhpcy5saXN0ZW5lci51cGRhdGVzLmxlbmd0aCkge1xuICAgIHRhc2tzLnB1c2goLi4udGhpcy5saXN0ZW5lci51cGRhdGVzKVxuICAgIHRoaXMubGlzdGVuZXIudXBkYXRlcyA9IFtdXG4gIH1cbiAgaWYgKGFkZG9uVGFza3MgJiYgYWRkb25UYXNrcy5sZW5ndGgpIHtcbiAgICB0YXNrcy5wdXNoKC4uLmFkZG9uVGFza3MpXG4gIH1cbiAgaWYgKHRhc2tzLmxlbmd0aCkge1xuICAgIHRoaXMuY2FsbFRhc2tzKHRhc2tzKVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaXJlRXZlbnQocmVmLCB0eXBlLCBlLCBkb21DaGFuZ2VzKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHJlZikpIHtcbiAgICByZWYuc29tZSgocmVmKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5maXJlRXZlbnQocmVmLCB0eXBlLCBlKSAhPT0gZmFsc2VcbiAgICB9KVxuICAgIHJldHVyblxuICB9XG5cbiAgY29uc3QgZWwgPSB0aGlzLmRvYy5nZXRSZWYocmVmKVxuXG4gIGlmIChlbCkge1xuICAgIHBlcmYuc3RhcnQoJ21hbmFnZSBldmVudCcsIHJlZiArICctJyArIHR5cGUpXG4gICAgZSA9IGUgfHwge31cbiAgICBlLnR5cGUgPSB0eXBlXG4gICAgZS50YXJnZXQgPSBlbFxuICAgIGUudGltZXN0YW1wID0gRGF0ZS5ub3coKVxuICAgIGlmIChkb21DaGFuZ2VzKSB7XG4gICAgICB1cGRhdGVFbGVtZW50KGVsLCBkb21DaGFuZ2VzKVxuICAgIH1cbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLmV2ZW50TWFuYWdlci5maXJlKGVsLCB0eXBlLCBlKVxuICAgIHBlcmYuZW5kKCdtYW5hZ2UgZXZlbnQnLCByZWYgKyAnLScgKyB0eXBlKVxuICAgIHRoaXMudXBkYXRlQWN0aW9ucygpXG4gICAgcmV0dXJuIHJlc3VsdFxuICB9XG5cbiAgcmV0dXJuIG5ldyBFcnJvcihgaW52YWxpZCBlbGVtZW50IHJlZmVyZW5jZSBcIiR7cmVmfVwiYClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNhbGxiYWNrKGNhbGxiYWNrSWQsIGRhdGEsIGlmTGFzdCkge1xuICBjb25zdCBjYWxsYmFjayA9IHRoaXMuY2FsbGJhY2tzW2NhbGxiYWNrSWRdXG5cbiAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNhbGxiYWNrKGRhdGEpIC8vIGRhdGEgaXMgYWxyZWFkeSBhIG9iamVjdCwgQHNlZTogbGliL2ZyYW1ld29yay5qc1xuXG4gICAgaWYgKHR5cGVvZiBpZkxhc3QgPT09ICd1bmRlZmluZWQnIHx8IGlmTGFzdCA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy5jYWxsYmFja3NbY2FsbGJhY2tJZF0gPSB1bmRlZmluZWRcbiAgICB9XG5cbiAgICB0aGlzLnVwZGF0ZUFjdGlvbnMoKVxuICAgIHJldHVyblxuICB9XG5cbiAgcmV0dXJuIG5ldyBFcnJvcihgaW52YWxpZCBjYWxsYmFjayBpZCBcIiR7Y2FsbGJhY2tJZH1cImApXG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZWZyZXNoRGF0YShkYXRhKSB7XG4gIGNvbnN0IHZtID0gdGhpcy52bVxuXG4gIGlmICh2bSAmJiBkYXRhKSB7XG4gICAgaWYgKHR5cGVvZiB2bS5yZWZyZXNoRGF0YSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdm0ucmVmcmVzaERhdGEoZGF0YSlcbiAgICB9IGVsc2Uge1xuICAgICAgZXh0ZW5kKHZtLCBkYXRhKVxuICAgIH1cbiAgICB0aGlzLnVwZGF0ZUFjdGlvbnMoW2NyZWF0ZUFjdGlvbigncmVmcmVzaEZpbmlzaCcsIFtdKV0pXG4gICAgcmV0dXJuXG4gIH1cblxuICByZXR1cm4gbmV3IEVycm9yKGBpbnZhbGlkIGRhdGEgXCIke2RhdGF9XCJgKVxufVxuXG5mdW5jdGlvbiB1cGRhdGVFbGVtZW50KGVsLCBjaGFuZ2VzKSB7XG4gIGNvbnN0IGF0dHJzID0gY2hhbmdlcy5hdHRycyB8fCB7fVxuICBmb3IgKGNvbnN0IG5hbWUgaW4gYXR0cnMpIHtcbiAgICBlbC5zZXRBdHRyKG5hbWUsIGF0dHJzKVxuICB9XG4gIGNvbnN0IHN0eWxlID0gY2hhbmdlcy5zdHlsZSB8fCB7fVxuICBmb3IgKGNvbnN0IG5hbWUgaW4gc3R5bGUpIHtcbiAgICBlbC5zZXRTdHlsZShuYW1lLCBzdHlsZVtuYW1lXSlcbiAgfVxufVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2xpYi9hcHAvY3RybC5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIExpc3RlbmVyKGlkLCBoYW5kbGVyKSB7XG4gIHRoaXMuaWQgPSBpZFxuICB0aGlzLmJhdGNoZWQgPSBmYWxzZVxuICB0aGlzLnVwZGF0ZXMgPSBbXVxuICBpZiAodHlwZW9mIGhhbmRsZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICB0aGlzLmhhbmRsZXIgPSBoYW5kbGVyXG4gIH1cbn1cblxuTGlzdGVuZXIucHJvdG90eXBlLmNyZWF0ZUZpbmlzaCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICBjb25zdCBoYW5kbGVyID0gdGhpcy5oYW5kbGVyXG4gIGhhbmRsZXIoW2NyZWF0ZUFjdGlvbignY3JlYXRlRmluaXNoJywgW10pXSwgY2FsbGJhY2spXG59XG5cbkxpc3RlbmVyLnByb3RvdHlwZS5jcmVhdGVCb2R5ID0gZnVuY3Rpb24gKGVsZW1lbnQsIHJlZikge1xuICBjb25zdCBhY3Rpb25zID0gW2NyZWF0ZUFjdGlvbignY3JlYXRlQm9keScsIFtlbGVtZW50LnRvSlNPTigpXSldXG4gIHRoaXMuYWRkQWN0aW9ucyhhY3Rpb25zKVxufVxuXG5MaXN0ZW5lci5wcm90b3R5cGUuYWRkRWxlbWVudCA9IGZ1bmN0aW9uIChlbGVtZW50LCByZWYsIGluZGV4KSB7XG4gIGlmICghKGluZGV4ID49IDApKSB7XG4gICAgaW5kZXggPSAtMVxuICB9XG4gIHRoaXMuYWRkQWN0aW9ucyhjcmVhdGVBY3Rpb24oJ2FkZEVsZW1lbnQnLCBbcmVmLCBlbGVtZW50LnRvSlNPTigpLCBpbmRleF0pKVxufVxuXG5MaXN0ZW5lci5wcm90b3R5cGUucmVtb3ZlRWxlbWVudCA9IGZ1bmN0aW9uIChyZWYpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkocmVmKSkge1xuICAgIGNvbnN0IGFjdGlvbnMgPSByZWYubWFwKChyKSA9PiBjcmVhdGVBY3Rpb24oJ3JlbW92ZUVsZW1lbnQnLCBbcl0pKVxuICAgIHRoaXMuYWRkQWN0aW9ucyhhY3Rpb25zKVxuICB9XG4gIGVsc2Uge1xuICAgIHRoaXMuYWRkQWN0aW9ucyhjcmVhdGVBY3Rpb24oJ3JlbW92ZUVsZW1lbnQnLCBbcmVmXSkpXG4gIH1cbn1cblxuTGlzdGVuZXIucHJvdG90eXBlLm1vdmVFbGVtZW50ID0gZnVuY3Rpb24gKHRhcmdldFJlZiwgcGFyZW50UmVmLCBpbmRleCkge1xuICB0aGlzLmFkZEFjdGlvbnMoY3JlYXRlQWN0aW9uKCdtb3ZlRWxlbWVudCcsIFt0YXJnZXRSZWYsIHBhcmVudFJlZiwgaW5kZXhdKSlcbn1cblxuTGlzdGVuZXIucHJvdG90eXBlLnNldEF0dHIgPSBmdW5jdGlvbiAocmVmLCBrZXksIHZhbHVlKSB7XG4gIGNvbnN0IHJlc3VsdCA9IHt9XG4gIHJlc3VsdFtrZXldID0gdmFsdWVcbiAgdGhpcy5hZGRBY3Rpb25zKGNyZWF0ZUFjdGlvbigndXBkYXRlQXR0cnMnLCBbcmVmLCByZXN1bHRdKSlcbn1cblxuTGlzdGVuZXIucHJvdG90eXBlLnNldFN0eWxlID0gZnVuY3Rpb24gKHJlZiwga2V5LCB2YWx1ZSkge1xuICBjb25zdCByZXN1bHQgPSB7fVxuICByZXN1bHRba2V5XSA9IHZhbHVlXG4gIHRoaXMuYWRkQWN0aW9ucyhjcmVhdGVBY3Rpb24oJ3VwZGF0ZVN0eWxlJywgW3JlZiwgcmVzdWx0XSkpXG59XG5cbkxpc3RlbmVyLnByb3RvdHlwZS5zZXRTdHlsZXMgPSBmdW5jdGlvbiAocmVmLCBzdHlsZSkge1xuICB0aGlzLmFkZEFjdGlvbnMoY3JlYXRlQWN0aW9uKCd1cGRhdGVTdHlsZScsIFtyZWYsIHN0eWxlXSkpXG59XG5cbkxpc3RlbmVyLnByb3RvdHlwZS5hZGRFdmVudCA9IGZ1bmN0aW9uIChyZWYsIHR5cGUpIHtcbiAgdGhpcy5hZGRBY3Rpb25zKGNyZWF0ZUFjdGlvbignYWRkRXZlbnQnLCBbcmVmLCB0eXBlXSkpXG59XG5cbkxpc3RlbmVyLnByb3RvdHlwZS5yZW1vdmVFdmVudCA9IGZ1bmN0aW9uIChyZWYsIHR5cGUpIHtcbiAgdGhpcy5hZGRBY3Rpb25zKGNyZWF0ZUFjdGlvbigncmVtb3ZlRXZlbnQnLCBbcmVmLCB0eXBlXSkpXG59XG5cbkxpc3RlbmVyLnByb3RvdHlwZS5oYW5kbGVyID0gZnVuY3Rpb24gKGFjdGlvbnMsIGNiKSB7XG4gIGNiICYmIGNiKClcbn1cblxuTGlzdGVuZXIucHJvdG90eXBlLmFkZEFjdGlvbnMgPSBmdW5jdGlvbiAoYWN0aW9ucykge1xuICBjb25zdCB1cGRhdGVzID0gdGhpcy51cGRhdGVzXG4gIGNvbnN0IGhhbmRsZXIgPSB0aGlzLmhhbmRsZXJcblxuICBpZiAoIUFycmF5LmlzQXJyYXkoYWN0aW9ucykpIHtcbiAgICBhY3Rpb25zID0gW2FjdGlvbnNdXG4gIH1cblxuICBpZiAodGhpcy5iYXRjaGVkKSB7XG4gICAgdXBkYXRlcy5wdXNoLmFwcGx5KHVwZGF0ZXMsIGFjdGlvbnMpXG4gIH1cbiAgZWxzZSB7XG4gICAgaGFuZGxlcihhY3Rpb25zKVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVBY3Rpb24obmFtZSwgYXJncykge1xuICByZXR1cm4ge21vZHVsZTogJ2RvbScsIG1ldGhvZDogbmFtZSwgYXJnczogYXJnc31cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vbGliL2FwcC9kb20tbGlzdGVuZXIuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBEaWZmZXIge1xuICBjb25zdHJ1Y3RvciAoaWQpIHtcbiAgICB0aGlzLmlkID0gaWRcbiAgICB0aGlzLm1hcCA9IFtdXG4gICAgdGhpcy5ob29rcyA9IFtdXG4gIH1cbiAgaXNFbXB0eSAoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwLmxlbmd0aCA9PT0gMFxuICB9XG4gIGFwcGVuZCAodHlwZSwgZGVwdGgsIHJlZiwgaGFuZGxlcikge1xuICAgIGNvbnN0IG1hcCA9IHRoaXMubWFwXG4gICAgaWYgKCFtYXBbZGVwdGhdKSB7XG4gICAgICBtYXBbZGVwdGhdID0ge31cbiAgICB9XG4gICAgY29uc3QgZ3JvdXAgPSBtYXBbZGVwdGhdXG4gICAgaWYgKCFncm91cFt0eXBlXSkge1xuICAgICAgZ3JvdXBbdHlwZV0gPSB7fVxuICAgIH1cbiAgICBpZiAodHlwZSA9PT0gJ2VsZW1lbnQnKSB7XG4gICAgICBpZiAoIWdyb3VwW3R5cGVdW3JlZl0pIHtcbiAgICAgICAgZ3JvdXBbdHlwZV1bcmVmXSA9IFtdXG4gICAgICB9XG4gICAgICBncm91cFt0eXBlXVtyZWZdLnB1c2goaGFuZGxlcilcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBncm91cFt0eXBlXVtyZWZdID0gaGFuZGxlclxuICAgIH1cbiAgfVxuICBmbHVzaCAoKSB7XG4gICAgY29uc3QgbWFwID0gdGhpcy5tYXAuc2xpY2UoKVxuICAgIHRoaXMubWFwLmxlbmd0aCA9IDBcbiAgICBtYXAuZm9yRWFjaCgoZ3JvdXApID0+IHtcbiAgICAgIGNhbGxUeXBlTWFwKGdyb3VwLCAncmVwZWF0JylcbiAgICAgIGNhbGxUeXBlTWFwKGdyb3VwLCAnc2hvd24nKVxuICAgICAgY2FsbFR5cGVMaXN0KGdyb3VwLCAnZWxlbWVudCcpXG4gICAgfSlcblxuICAgIGNvbnN0IGhvb2tzID0gdGhpcy5ob29rcy5zbGljZSgpXG4gICAgdGhpcy5ob29rcy5sZW5ndGggPSAwXG4gICAgaG9va3MuZm9yRWFjaCgoZm4pID0+IHtcbiAgICAgIGZuKClcbiAgICB9KVxuXG4gICAgaWYgKCF0aGlzLmlzRW1wdHkoKSkge1xuICAgICAgdGhpcy5mbHVzaCgpXG4gICAgfVxuICB9XG4gIHRoZW4gKGZuKSB7XG4gICAgdGhpcy5ob29rcy5wdXNoKGZuKVxuICB9XG59XG5cbmZ1bmN0aW9uIGNhbGxUeXBlTWFwKGdyb3VwLCB0eXBlKSB7XG4gIGNvbnN0IG1hcCA9IGdyb3VwW3R5cGVdXG4gIGZvciAoY29uc3QgcmVmIGluIG1hcCkge1xuICAgIG1hcFtyZWZdKClcbiAgfVxufVxuXG5mdW5jdGlvbiBjYWxsVHlwZUxpc3QoZ3JvdXAsIHR5cGUpIHtcbiAgY29uc3QgbWFwID0gZ3JvdXBbdHlwZV1cbiAgZm9yIChjb25zdCByZWYgaW4gbWFwKSB7XG4gICAgY29uc3QgbGlzdCA9IG1hcFtyZWZdXG4gICAgbGlzdC5mb3JFYWNoKChoYW5kbGVyKSA9PiB7aGFuZGxlcigpfSlcbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9saWIvYXBwL2RpZmZlci5qc1xuICoqLyIsIi8qKlxuICogQGZpbGVPdmVydmlldyBldmVudCBtYW5hZ2VyXG4gKi9cblxuaW1wb3J0ICogYXMgXyBmcm9tICcuLi91dGlsJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBFdmVudE1hbmFnZXIoKSB7XG4gIHRoaXMuZWxzID0gW11cbiAgdGhpcy50YXJnZXRzID0gW11cbn1cblxuRXZlbnRNYW5hZ2VyLnByb3RvdHlwZS5fZ2V0ID0gZnVuY3Rpb24gKGVsLCBmb3JjZSkge1xuICB2YXIgaW5kZXggPSBfLmluZGV4T2YodGhpcy5lbHMsIGVsKVxuICB2YXIgdGFyZ2V0XG4gIGlmIChpbmRleCA+PSAwKSB7XG4gICAgdGFyZ2V0ID0gdGhpcy50YXJnZXRzW2luZGV4XVxuICB9XG4gIGVsc2UgaWYgKGZvcmNlKSB7XG4gICAgdGFyZ2V0ID0ge2VsOiBlbCwgZXZlbnRzOiB7fX1cbiAgICB0aGlzLmVscy5wdXNoKGVsKVxuICAgIHRoaXMudGFyZ2V0cy5wdXNoKHRhcmdldClcbiAgfVxuICByZXR1cm4gdGFyZ2V0XG59XG5cbkV2ZW50TWFuYWdlci5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKGVsLCB0eXBlLCBoYW5kbGVyKSB7XG4gIGlmICh0eXBlb2YgZWwgIT09ICdvYmplY3QnIHx8ICFlbCB8fFxuICAgIHR5cGVvZiB0eXBlICE9PSAnc3RyaW5nJyB8fCAhdHlwZSB8fFxuICAgIHR5cGVvZiBoYW5kbGVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgdmFyIHRhcmdldCA9IHRoaXMuX2dldChlbCwgdHJ1ZSlcbiAgdGFyZ2V0LmV2ZW50c1t0eXBlXSA9IGhhbmRsZXJcbn1cblxuRXZlbnRNYW5hZ2VyLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoZWwsIHR5cGUpIHtcbiAgaWYgKHR5cGVvZiBlbCAhPT0gJ29iamVjdCcgfHwgIWVsIHx8XG4gICAgdHlwZW9mIHR5cGUgIT09ICdzdHJpbmcnIHx8ICF0eXBlKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgdmFyIHRhcmdldCA9IHRoaXMuX2dldChlbClcbiAgaWYgKHRhcmdldCkge1xuICAgIGRlbGV0ZSB0YXJnZXQuZXZlbnRzW3R5cGVdXG4gIH1cbn1cblxuRXZlbnRNYW5hZ2VyLnByb3RvdHlwZS5maXJlID0gZnVuY3Rpb24gKGVsLCB0eXBlLCBlKSB7XG4gIHZhciB0YXJnZXQgPSB0aGlzLl9nZXQoZWwpXG4gIHZhciBoYW5kbGVyLCBlbFxuICBpZiAodGFyZ2V0KSB7XG4gICAgZWwgPSB0YXJnZXQuZWxcbiAgICBoYW5kbGVyID0gdGFyZ2V0LmV2ZW50c1t0eXBlXVxuICAgIGlmICh0eXBlb2YgaGFuZGxlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIGhhbmRsZXIuY2FsbChlbCwgZSlcbiAgICB9XG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vbGliL2FwcC9ldmVudC5qc1xuICoqLyIsIi8qKlxuICogQGZpbGVPdmVydmlld1xuICogQSBzaW1wbGUgdmlydHVhbCBkb20gaW1wbGVtZW50YXRpb25cbiAqL1xuXG5jb25zdCBERUZBVUxUX1RBR19OQU1FID0gJ2RpdidcblxuZXhwb3J0IGNvbnN0IGluc3RhbmNlTWFwID0ge31cblxuZXhwb3J0IGZ1bmN0aW9uIERvY3VtZW50KGlkKSB7XG4gIGlkID0gaWQgPyBpZC50b1N0cmluZygpIDogJydcbiAgdGhpcy5pZCA9IGlkXG4gIHRoaXMubmV4dFJlZiA9IDFcbiAgdGhpcy5ub2RlTWFwID0ge31cbiAgdGhpcy5saXN0ZW5lciA9IG51bGxcbiAgdGhpcy5ldmVudE1hbmFnZXIgPSBudWxsXG4gIHRoaXMuY2xvc2VkID0gZmFsc2VcbiAgaW5zdGFuY2VNYXBbaWRdID0gdGhpc1xuXG4gIHRoaXMuY3JlYXRlRG9jdW1lbnRFbGVtZW50KClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlc3Ryb3lEb2N1bWVudChpZCkge1xuICBkZWxldGUgaW5zdGFuY2VNYXBbaWRdXG59XG5cbkRvY3VtZW50LnByb3RvdHlwZS5vcGVuID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmNsb3NlZCA9IGZhbHNlXG4gIGlmICh0aGlzLmxpc3RlbmVyKSB7XG4gICAgdGhpcy5saXN0ZW5lci5iYXRjaGVkID0gZmFsc2VcbiAgfVxufVxuRG9jdW1lbnQucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmNsb3NlZCA9IHRydWVcbiAgaWYgKHRoaXMubGlzdGVuZXIpIHtcbiAgICB0aGlzLmxpc3RlbmVyLmJhdGNoZWQgPSB0cnVlXG4gIH1cbn1cblxuRG9jdW1lbnQucHJvdG90eXBlLnNldEV2ZW50TWFuYWdlciA9IGZ1bmN0aW9uIChldmVudE1hbmFnZXIpIHtcbiAgdGhpcy5ldmVudE1hbmFnZXIgPSBldmVudE1hbmFnZXJcbn1cblxuRG9jdW1lbnQucHJvdG90eXBlLnNldExpc3RlbmVyID0gZnVuY3Rpb24gKGxpc3RlbmVyKSB7XG4gIHRoaXMubGlzdGVuZXIgPSBsaXN0ZW5lclxuICBsaXN0ZW5lci5iYXRjaGVkID0gISF0aGlzLmNsb3NlZFxufVxuXG5Eb2N1bWVudC5wcm90b3R5cGUuYWRkUmVmID0gZnVuY3Rpb24gKGVsKSB7XG4gIGVsLnJlZiA9IHRoaXMubmV4dFJlZi50b1N0cmluZygpXG4gIHRoaXMubm9kZU1hcFtlbC5yZWZdID0gZWxcbiAgdGhpcy5uZXh0UmVmKytcbn1cblxuRG9jdW1lbnQucHJvdG90eXBlLmdldFJlZiA9IGZ1bmN0aW9uIChyZWYpIHtcbiAgcmV0dXJuIHRoaXMubm9kZU1hcFtyZWZdXG59XG5cbkRvY3VtZW50LnByb3RvdHlwZS5yZW1vdmVSZWYgPSBmdW5jdGlvbiAocmVmKSB7XG4gIGRlbGV0ZSB0aGlzLm5vZGVNYXBbcmVmXVxufVxuXG5Eb2N1bWVudC5wcm90b3R5cGUuY3JlYXRlRG9jdW1lbnRFbGVtZW50ID0gZnVuY3Rpb24gKHR5cGUsIHByb3BzKSB7XG4gIGlmICghdGhpcy5kb2N1bWVudEVsZW1lbnQpIHtcbiAgICB0aGlzLmRvY3VtZW50RWxlbWVudCA9IG5ldyBFbGVtZW50KHR5cGUsIHByb3BzLCB0aGlzKVxuICAgIHRoaXMubm9kZU1hcC5fZG9jdW1lbnRFbGVtZW50ID0gdGhpcy5kb2N1bWVudEVsZW1lbnRcbiAgICB0aGlzLmRvY3VtZW50RWxlbWVudC5yZWYgPSAnX2RvY3VtZW50RWxlbWVudCdcbiAgICB0aGlzLmRvY3VtZW50RWxlbWVudC5hdHRhY2hlZCA9IHRydWVcbiAgfVxuXG4gIHJldHVybiB0aGlzLmRvY3VtZW50RWxlbWVudFxufVxuXG5Eb2N1bWVudC5wcm90b3R5cGUuY3JlYXRlQm9keSA9IGZ1bmN0aW9uICh0eXBlLCBwcm9wcykge1xuICBpZiAoIXRoaXMuYm9keSkge1xuICAgIHRoaXMuYm9keSA9IG5ldyBFbGVtZW50KHR5cGUsIHByb3BzLCB0aGlzKVxuICAgIHRoaXMubm9kZU1hcC5fcm9vdCA9IHRoaXMuYm9keVxuICAgIHRoaXMuYm9keS5yZWYgPSAnX3Jvb3QnXG4gICAgdGhpcy5ib2R5LmRlcHRoID0gMVxuICB9XG5cbiAgcmV0dXJuIHRoaXMuYm9keVxufVxuXG5Eb2N1bWVudC5wcm90b3R5cGUuY3JlYXRlRWxlbWVudCA9IGZ1bmN0aW9uICh0YWdOYW1lLCBwcm9wcykge1xuICByZXR1cm4gbmV3IEVsZW1lbnQodGFnTmFtZSwgcHJvcHMsIHRoaXMpXG59XG5cbkRvY3VtZW50LnByb3RvdHlwZS5jcmVhdGVDb21tZW50ID0gZnVuY3Rpb24gKHRleHQpIHtcbiAgcmV0dXJuIG5ldyBDb21tZW50KHRleHQsIHRoaXMpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBOb2RlKCkge1xufVxuXG5Ob2RlLnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbiAoaW5zdGFuY2VJZCkge1xuICB0aGlzLnBhcmVudFJlZiA9IG51bGxcbiAgdGhpcy5hdHRhY2hlZCA9IGZhbHNlXG4gIGlmIChpbnN0YW5jZUlkKSB7XG4gICAgdGhpcy5pbnN0YW5jZUlkID0gaW5zdGFuY2VJZFxuICAgIGNvbnN0IGRvYyA9IGluc3RhbmNlTWFwW2luc3RhbmNlSWRdXG4gICAgZG9jLmFkZFJlZih0aGlzKVxuICB9XG59XG5cbk5vZGUucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IHJlZiA9IHRoaXMucmVmXG4gIGNvbnN0IGluc3RhbmNlSWQgPSB0aGlzLmluc3RhbmNlSWRcbiAgaWYgKGluc3RhbmNlSWQpIHtcbiAgICBjb25zdCBkb2MgPSBpbnN0YW5jZU1hcFtpbnN0YW5jZUlkXVxuICAgIGRvYy5yZW1vdmVSZWYocmVmKVxuICB9XG5cbiAgY29uc3QgY2hpbGRyZW4gPSB0aGlzLmNoaWxkcmVuIHx8IFtdXG4gIGNvbnN0IGxlbmd0aCA9IGNoaWxkcmVuLmxlbmd0aFxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgY2hpbGRyZW5baV0uZGVzdHJveSgpXG4gIH1cbn1cblxuTm9kZS5wcm90b3R5cGUuZ2V0UmVuZGVyZXIgPSBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IGRvYyA9IGluc3RhbmNlTWFwW3RoaXMuaW5zdGFuY2VJZF1cbiAgcmV0dXJuIGRvYy5saXN0ZW5lclxufVxuXG5Ob2RlLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24gKCkge1xuICBjb25zdCBpbnN0YW5jZUlkID0gdGhpcy5pbnN0YW5jZUlkXG4gIGNvbnN0IGRvYyA9IGluc3RhbmNlTWFwW2luc3RhbmNlSWRdXG4gIGNvbnN0IHBhcmVudCA9IGRvYy5nZXRSZWYodGhpcy5wYXJlbnRSZWYpXG4gIGlmIChwYXJlbnQpIHtcbiAgICByZXR1cm4gcGFyZW50LmNoaWxkcmVuW3BhcmVudC5jaGlsZHJlbi5pbmRleE9mKHRoaXMpICsgMV1cbiAgfVxufVxuXG5Ob2RlLnByb3RvdHlwZS5wcmV2ID0gZnVuY3Rpb24gKCkge1xuICBjb25zdCBpbnN0YW5jZUlkID0gdGhpcy5pbnN0YW5jZUlkXG4gIGNvbnN0IGRvYyA9IGluc3RhbmNlTWFwW2luc3RhbmNlSWRdXG4gIGNvbnN0IHBhcmVudCA9IGRvYy5nZXRSZWYodGhpcy5wYXJlbnRSZWYpXG4gIGlmIChwYXJlbnQpIHtcbiAgICByZXR1cm4gcGFyZW50LmNoaWxkcmVuW3BhcmVudC5jaGlsZHJlbi5pbmRleE9mKHRoaXMpIC0gMV1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gRWxlbWVudCh0eXBlPURFRkFVTFRfVEFHX05BTUUsIHByb3BzLCBvd25lckRvY3VtZW50KSB7XG4gIHByb3BzID0gcHJvcHMgfHwge31cbiAgdGhpcy5jcmVhdGUob3duZXJEb2N1bWVudC5pZClcbiAgdGhpcy5vd25lckRvY3VtZW50ID0gb3duZXJEb2N1bWVudFxuICB0aGlzLnR5cGUgPSB0eXBlXG4gIHRoaXMuYXR0ciA9IHByb3BzLmF0dHIgfHwge31cbiAgdGhpcy5jbGFzc1N0eWxlID0gcHJvcHMuY2xhc3NTdHlsZSB8fCB7fVxuICB0aGlzLnN0eWxlID0gcHJvcHMuc3R5bGUgfHwge31cbiAgdGhpcy5ldmVudCA9IFtdXG4gIHRoaXMuY2hpbGRyZW4gPSBbXVxuICB0aGlzLnB1cmVDaGlsZHJlbiA9IFtdXG59XG5cbkVsZW1lbnQucHJvdG90eXBlID0gbmV3IE5vZGUoKVxuXG5FbGVtZW50LnByb3RvdHlwZS5hcHBlbmRDaGlsZCA9IGZ1bmN0aW9uIChub2RlKSB7XG5cbiAgcmVtb3ZlSWZFeGlzdGVkKG5vZGUpXG4gIG5vZGUucGFyZW50UmVmID0gdGhpcy5yZWZcbiAgdGhpcy5jaGlsZHJlbi5wdXNoKG5vZGUpXG5cbiAgaWYgKHRoaXMuYXR0YWNoZWQpIHtcbiAgICBzZXRBdHRhY2hlZChub2RlLCB0aGlzLmRlcHRoKVxuICB9XG4gIGVsc2Uge1xuICAgIHNldERldGFjaGVkKG5vZGUpXG4gIH1cblxuICBpZiAobm9kZSBpbnN0YW5jZW9mIEVsZW1lbnQpIHtcbiAgICB0aGlzLnB1cmVDaGlsZHJlbi5wdXNoKG5vZGUpXG5cbiAgICBpZiAodGhpcy5hdHRhY2hlZCkge1xuICAgICAgY29uc3QgcmVuZGVyZXIgPSB0aGlzLmdldFJlbmRlcmVyKClcbiAgICAgIGlmIChyZW5kZXJlcikge1xuICAgICAgICBpZiAodGhpcy5yZWYgPT09ICdfZG9jdW1lbnRFbGVtZW50Jykge1xuICAgICAgICAgIC8vIGlmIGl0cyBwYXJlbnQgaXMgZG9jdW1lbnRFbGVtZW50IHRoZW4gaXQncyBhIGJvZHlcbiAgICAgICAgICByZW5kZXJlci5jcmVhdGVCb2R5KG5vZGUsIHRoaXMucmVmKVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHJlbmRlcmVyLmFkZEVsZW1lbnQobm9kZSwgdGhpcy5yZWYpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuRWxlbWVudC5wcm90b3R5cGUuaW5zZXJ0QmVmb3JlID0gZnVuY3Rpb24gKG5vZGUsIGJlZm9yZSkge1xuXG4gIGlmIChub2RlLnBhcmVudFJlZiA9PT0gdGhpcy5yZWYpIHtcbiAgICBtb3ZlQmVmb3JlKG5vZGUsIGJlZm9yZSwgdGhpcy5jaGlsZHJlbilcbiAgICBpZiAobm9kZSBpbnN0YW5jZW9mIEVsZW1lbnQpIHtcbiAgICAgIGNvbnN0IHB1cmVCZWZvcmVJbmRleCA9IG1vdmVQdXJlQmVmb3JlKG5vZGUsIGJlZm9yZSwgdGhpcy5wdXJlQ2hpbGRyZW4pXG4gICAgICBpZiAocHVyZUJlZm9yZUluZGV4ID49IDAgJiYgdGhpcy5hdHRhY2hlZCkge1xuICAgICAgICBjb25zdCByZW5kZXJlciA9IHRoaXMuZ2V0UmVuZGVyZXIoKVxuICAgICAgICBpZiAocmVuZGVyZXIpIHtcbiAgICAgICAgICByZW5kZXJlci5tb3ZlRWxlbWVudChub2RlLnJlZiwgdGhpcy5yZWYsIHB1cmVCZWZvcmVJbmRleClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm5cbiAgfVxuXG4gIHJlbW92ZUlmRXhpc3RlZChub2RlKVxuXG4gIGNvbnN0IGNoaWxkcmVuID0gdGhpcy5jaGlsZHJlblxuICBjb25zdCBpbmRleCA9IGNoaWxkcmVuLmluZGV4T2YoYmVmb3JlKVxuXG4gIG5vZGUucGFyZW50UmVmID0gdGhpcy5yZWZcbiAgaWYgKHRoaXMuYXR0YWNoZWQpIHtcbiAgICBzZXRBdHRhY2hlZChub2RlLCB0aGlzLmRlcHRoKVxuICB9XG4gIGVsc2Uge1xuICAgIHNldERldGFjaGVkKG5vZGUpXG4gIH1cbiAgY2hpbGRyZW4uc3BsaWNlKGluZGV4LCAwLCBub2RlKVxuXG4gIGlmIChub2RlIGluc3RhbmNlb2YgRWxlbWVudCkge1xuICAgIGNvbnN0IHB1cmVDaGlsZHJlbiA9IHRoaXMucHVyZUNoaWxkcmVuXG4gICAgY29uc3QgcHVyZUluZGV4ID0gZ2V0UHVyZUFmdGVyKGJlZm9yZSwgcHVyZUNoaWxkcmVuKVxuXG4gICAgcHVyZUNoaWxkcmVuLnNwbGljZShwdXJlSW5kZXgsIDAsIG5vZGUpXG5cbiAgICBpZiAodGhpcy5hdHRhY2hlZCkge1xuICAgICAgY29uc3QgcmVuZGVyZXIgPSB0aGlzLmdldFJlbmRlcmVyKClcbiAgICAgIGlmIChyZW5kZXJlcikge1xuICAgICAgICByZW5kZXJlci5hZGRFbGVtZW50KG5vZGUsIHRoaXMucmVmLCBwdXJlSW5kZXgpXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbkVsZW1lbnQucHJvdG90eXBlLmluc2VydEFmdGVyID0gZnVuY3Rpb24gKG5vZGUsIGFmdGVyKSB7XG5cbiAgaWYgKG5vZGUucGFyZW50UmVmID09PSB0aGlzLnJlZikge1xuICAgIG1vdmVBZnRlcihub2RlLCBhZnRlciwgdGhpcy5jaGlsZHJlbilcbiAgICBpZiAobm9kZSBpbnN0YW5jZW9mIEVsZW1lbnQpIHtcbiAgICAgIGNvbnN0IHB1cmVBZnRlckluZGV4ID0gbW92ZVB1cmVBZnRlcihub2RlLCBhZnRlciwgdGhpcy5wdXJlQ2hpbGRyZW4pXG4gICAgICBpZiAocHVyZUFmdGVySW5kZXggPj0gMCAmJiB0aGlzLmF0dGFjaGVkKSB7XG4gICAgICAgIGNvbnN0IHJlbmRlcmVyID0gdGhpcy5nZXRSZW5kZXJlcigpXG4gICAgICAgIGlmIChyZW5kZXJlcikge1xuICAgICAgICAgIHJlbmRlcmVyLm1vdmVFbGVtZW50KG5vZGUucmVmLCB0aGlzLnJlZiwgcHVyZUFmdGVySW5kZXgpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuXG4gIH1cblxuICByZW1vdmVJZkV4aXN0ZWQobm9kZSlcblxuICBjb25zdCBjaGlsZHJlbiA9IHRoaXMuY2hpbGRyZW5cbiAgY29uc3QgaW5kZXggPSBjaGlsZHJlbi5pbmRleE9mKGFmdGVyKVxuXG4gIG5vZGUucGFyZW50UmVmID0gdGhpcy5yZWZcbiAgaWYgKHRoaXMuYXR0YWNoZWQpIHtcbiAgICBzZXRBdHRhY2hlZChub2RlLCB0aGlzLmRlcHRoKVxuICB9XG4gIGVsc2Uge1xuICAgIHNldERldGFjaGVkKG5vZGUpXG4gIH1cbiAgY2hpbGRyZW4uc3BsaWNlKGluZGV4ICsgMSwgMCwgbm9kZSlcblxuICBpZiAobm9kZSBpbnN0YW5jZW9mIEVsZW1lbnQpIHtcbiAgICBjb25zdCBwdXJlQ2hpbGRyZW4gPSB0aGlzLnB1cmVDaGlsZHJlblxuICAgIGNvbnN0IHB1cmVJbmRleCA9IGdldFB1cmVCZWZvcmUoYWZ0ZXIsIHB1cmVDaGlsZHJlbilcblxuICAgIHB1cmVDaGlsZHJlbi5zcGxpY2UocHVyZUluZGV4ICsgMSwgMCwgbm9kZSlcblxuICAgIGlmICh0aGlzLmF0dGFjaGVkKSB7XG4gICAgICBjb25zdCByZW5kZXJlciA9IHRoaXMuZ2V0UmVuZGVyZXIoKVxuICAgICAgaWYgKHJlbmRlcmVyKSB7XG4gICAgICAgIHJlbmRlcmVyLmFkZEVsZW1lbnQobm9kZSwgdGhpcy5yZWYsIHB1cmVJbmRleCArIDEpXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbkVsZW1lbnQucHJvdG90eXBlLnJlbW92ZUNoaWxkID0gZnVuY3Rpb24gKG5vZGUsIHByZXNlcnZlZCkge1xuICBjb25zdCBjaGlsZHJlbiA9IHRoaXMuY2hpbGRyZW5cbiAgY29uc3QgaW5kZXggPSBjaGlsZHJlbi5pbmRleE9mKG5vZGUpXG5cbiAgc2V0RGV0YWNoZWQobm9kZSlcblxuICBpZiAoaW5kZXggPj0gMCkge1xuICAgIG5vZGUucGFyZW50UmVmID0gbnVsbFxuICAgIGNoaWxkcmVuLnNwbGljZShpbmRleCwgMSlcbiAgICBpZiAoIXByZXNlcnZlZCkge1xuICAgICAgbm9kZS5kZXN0cm95KClcbiAgICB9XG4gIH1cblxuICBpZiAobm9kZSBpbnN0YW5jZW9mIEVsZW1lbnQpIHtcbiAgICB0aGlzLnB1cmVDaGlsZHJlbi4kcmVtb3ZlKG5vZGUpXG4gICAgaWYgKHRoaXMuYXR0YWNoZWQpIHtcbiAgICAgIGNvbnN0IHJlbmRlcmVyID0gdGhpcy5nZXRSZW5kZXJlcigpXG4gICAgICBpZiAocmVuZGVyZXIpIHtcbiAgICAgICAgcmVuZGVyZXIucmVtb3ZlRWxlbWVudChub2RlLnJlZilcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuRWxlbWVudC5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IGNoaWxkcmVuID0gdGhpcy5jaGlsZHJlblxuICBjb25zdCBsZW5ndGggPSBjaGlsZHJlbi5sZW5ndGhcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGNoaWxkID0gY2hpbGRyZW5baV1cbiAgICBjaGlsZC5wYXJlbnRSZWYgPSBudWxsXG4gICAgc2V0RGV0YWNoZWQoY2hpbGQpXG4gICAgY2hpbGQuZGVzdHJveSgpXG4gIH1cbiAgY2hpbGRyZW4ubGVuZ3RoID0gMFxuXG4gIGlmICh0aGlzLmF0dGFjaGVkKSB7XG4gICAgY29uc3QgcmVmcyA9IHRoaXMucHVyZUNoaWxkcmVuLm1hcCgoY2hpbGQpID0+IGNoaWxkLnJlZilcbiAgICB0aGlzLnB1cmVDaGlsZHJlbi5sZW5ndGggPSAwXG4gICAgY29uc3QgcmVuZGVyZXIgPSB0aGlzLmdldFJlbmRlcmVyKClcbiAgICBpZiAocmVuZGVyZXIpIHtcbiAgICAgIHJlbmRlcmVyLnJlbW92ZUVsZW1lbnQocmVmcylcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gbW92ZUJlZm9yZShub2RlLCBiZWZvcmUsIGNoaWxkcmVuKSB7XG4gIGNvbnN0IHRhcmdldEluZGV4ID0gY2hpbGRyZW4uaW5kZXhPZihub2RlKVxuICBjb25zdCBiZWZvcmVJbmRleCA9IGNoaWxkcmVuLmluZGV4T2YoYmVmb3JlKVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIGlmICh0YXJnZXRJbmRleCA9PT0gYmVmb3JlSW5kZXggfHwgdGFyZ2V0SW5kZXggKyAxID09PSBiZWZvcmVJbmRleCkge1xuICAgIHJldHVybiAtMVxuICB9XG5cbiAgY29uc3QgbmV3SW5kZXggPSB0YXJnZXRJbmRleCA8IGJlZm9yZUluZGV4ID8gYmVmb3JlSW5kZXggLSAxIDogYmVmb3JlSW5kZXhcbiAgY2hpbGRyZW4uc3BsaWNlKHRhcmdldEluZGV4LCAxKVxuICBjaGlsZHJlbi5zcGxpY2UobmV3SW5kZXgsIDAsIG5vZGUpXG5cbiAgcmV0dXJuIGJlZm9yZUluZGV4XG59XG5cbmZ1bmN0aW9uIG1vdmVQdXJlQmVmb3JlKG5vZGUsIGJlZm9yZSwgcHVyZUNoaWxkcmVuKSB7XG4gIGNvbnN0IHB1cmVUYXJnZXRJbmRleCA9IHB1cmVDaGlsZHJlbi5pbmRleE9mKG5vZGUpXG4gIGNvbnN0IHB1cmVCZWZvcmVJbmRleCA9IGdldFB1cmVBZnRlcihiZWZvcmUsIHB1cmVDaGlsZHJlbilcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBpZiAocHVyZVRhcmdldEluZGV4ID09PSBwdXJlQmVmb3JlSW5kZXggfHxcbiAgICBwdXJlVGFyZ2V0SW5kZXggKyAxID09PSBwdXJlQmVmb3JlSW5kZXgpIHtcbiAgICByZXR1cm4gLTFcbiAgfVxuXG4gIGNvbnN0IHB1cmVOZXdJbmRleCA9IHB1cmVUYXJnZXRJbmRleCA8IHB1cmVCZWZvcmVJbmRleFxuICAgID8gcHVyZUJlZm9yZUluZGV4IC0gMVxuICAgIDogcHVyZUJlZm9yZUluZGV4XG5cbiAgcHVyZUNoaWxkcmVuLnNwbGljZShwdXJlVGFyZ2V0SW5kZXgsIDEpXG4gIHB1cmVDaGlsZHJlbi5zcGxpY2UocHVyZU5ld0luZGV4LCAwLCBub2RlKVxuXG4gIHJldHVybiBwdXJlQmVmb3JlSW5kZXhcbn1cblxuZnVuY3Rpb24gZ2V0UHVyZUFmdGVyKG5vZGUsIHB1cmVDaGlsZHJlbikge1xuICBsZXQgcHVyZUluZGV4ID0gcHVyZUNoaWxkcmVuLmluZGV4T2Yobm9kZSlcbiAgd2hpbGUgKG5vZGUgJiYgcHVyZUluZGV4IDwgMCkge1xuICAgIG5vZGUgPSBub2RlLm5leHQoKVxuICAgIHB1cmVJbmRleCA9IHB1cmVDaGlsZHJlbi5pbmRleE9mKG5vZGUpXG4gIH1cbiAgaWYgKHB1cmVJbmRleCA8IDApIHtcbiAgICBwdXJlSW5kZXggPSBwdXJlQ2hpbGRyZW4ubGVuZ3RoXG4gIH1cbiAgcmV0dXJuIHB1cmVJbmRleFxufVxuXG5mdW5jdGlvbiBtb3ZlQWZ0ZXIobm9kZSwgYWZ0ZXIsIGNoaWxkcmVuKSB7XG4gIGNvbnN0IHRhcmdldEluZGV4ID0gY2hpbGRyZW4uaW5kZXhPZihub2RlKVxuICBjb25zdCBhZnRlckluZGV4ID0gY2hpbGRyZW4uaW5kZXhPZihhZnRlcilcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBpZiAodGFyZ2V0SW5kZXggPT09IGFmdGVySW5kZXggfHwgdGFyZ2V0SW5kZXggPT09IGFmdGVySW5kZXggKyAxKSB7XG4gICAgcmV0dXJuIC0xXG4gIH1cblxuICBjb25zdCBuZXdJbmRleCA9IHRhcmdldEluZGV4IDwgYWZ0ZXJJbmRleCA/IGFmdGVySW5kZXggOiBhZnRlckluZGV4ICsgMVxuICBjaGlsZHJlbi5zcGxpY2UodGFyZ2V0SW5kZXgsIDEpXG4gIGNoaWxkcmVuLnNwbGljZShuZXdJbmRleCwgMCwgbm9kZSlcblxuICByZXR1cm4gYWZ0ZXJJbmRleFxufVxuXG5mdW5jdGlvbiBtb3ZlUHVyZUFmdGVyKG5vZGUsIGFmdGVyLCBwdXJlQ2hpbGRyZW4pIHtcbiAgY29uc3QgcHVyZVRhcmdldEluZGV4ID0gcHVyZUNoaWxkcmVuLmluZGV4T2Yobm9kZSlcbiAgY29uc3QgcHVyZUFmdGVySW5kZXggPSBnZXRQdXJlQmVmb3JlKGFmdGVyLCBwdXJlQ2hpbGRyZW4pXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgaWYgKHB1cmVUYXJnZXRJbmRleCA9PT0gcHVyZUFmdGVySW5kZXggfHxcbiAgICBwdXJlVGFyZ2V0SW5kZXggPT09IHB1cmVBZnRlckluZGV4ICsgMSkge1xuICAgIHJldHVybiAtMVxuICB9XG5cbiAgY29uc3QgcHVyZU5ld0luZGV4ID0gcHVyZVRhcmdldEluZGV4IDwgcHVyZUFmdGVySW5kZXhcbiAgICA/IHB1cmVBZnRlckluZGV4XG4gICAgOiBwdXJlQWZ0ZXJJbmRleCArIDFcblxuICBwdXJlQ2hpbGRyZW4uc3BsaWNlKHB1cmVUYXJnZXRJbmRleCwgMSlcbiAgcHVyZUNoaWxkcmVuLnNwbGljZShwdXJlTmV3SW5kZXgsIDAsIG5vZGUpXG5cbiAgcmV0dXJuIHB1cmVBZnRlckluZGV4ICsgMVxufVxuXG5mdW5jdGlvbiBnZXRQdXJlQmVmb3JlKG5vZGUsIHB1cmVDaGlsZHJlbikge1xuICBsZXQgcHVyZUluZGV4ID0gcHVyZUNoaWxkcmVuLmluZGV4T2Yobm9kZSlcbiAgd2hpbGUgKG5vZGUgJiYgcHVyZUluZGV4IDwgMCkge1xuICAgIG5vZGUgPSBub2RlLnByZXYoKVxuICAgIHB1cmVJbmRleCA9IHB1cmVDaGlsZHJlbi5pbmRleE9mKG5vZGUpXG4gIH1cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgaWYgKHB1cmVJbmRleCA8IDApIHtcbiAgICBwdXJlSW5kZXggPSAtMVxuICB9XG4gIHJldHVybiBwdXJlSW5kZXhcbn1cblxuZnVuY3Rpb24gc2V0QXR0YWNoZWQobm9kZSwgZGVwdGgpIHtcbiAgaWYgKG5vZGUucmVmID09PSAnX3Jvb3QnKSB7XG4gICAgZGVwdGggPSAxXG4gIH1cbiAgZWxzZSB7XG4gICAgZGVwdGggPSBkZXB0aCA+IDAgPyBkZXB0aCArIDEgOiAwXG4gIH1cbiAgbm9kZS5hdHRhY2hlZCA9IHRydWVcbiAgbm9kZS5kZXB0aCA9IGRlcHRoXG4gIGlmIChub2RlLmNoaWxkcmVuKSB7XG4gICAgbm9kZS5jaGlsZHJlbi5mb3JFYWNoKChzdWIpID0+IHtcbiAgICAgIHNldEF0dGFjaGVkKHN1YiwgZGVwdGgpXG4gICAgfSlcbiAgfVxufVxuXG5mdW5jdGlvbiBzZXREZXRhY2hlZChub2RlKSB7XG4gIG5vZGUuYXR0YWNoZWQgPSBmYWxzZVxuICBub2RlLmRlcHRoID0gMFxuICBpZiAobm9kZS5jaGlsZHJlbikge1xuICAgIG5vZGUuY2hpbGRyZW4uZm9yRWFjaCgoc3ViKSA9PiB7XG4gICAgICBzZXREZXRhY2hlZChzdWIpXG4gICAgfSlcbiAgfVxufVxuXG5mdW5jdGlvbiByZW1vdmVJZkV4aXN0ZWQobm9kZSkge1xuICBjb25zdCBkb2MgPSBpbnN0YW5jZU1hcFtub2RlLmluc3RhbmNlSWRdXG4gIGlmIChkb2MpIHtcbiAgICBjb25zdCBleGlzdGVkTm9kZSA9IGRvYy5nZXRSZWYobm9kZS5yZWYpXG4gICAgaWYgKGV4aXN0ZWROb2RlKSB7XG4gICAgICBjb25zdCBleGlzdGVkUGFyZW50ID0gZG9jLmdldFJlZihleGlzdGVkTm9kZS5wYXJlbnRSZWYpXG4gICAgICBpZiAoZXhpc3RlZFBhcmVudCAmJiBleGlzdGVkUGFyZW50LnJlbW92ZUNoaWxkKSB7XG4gICAgICAgIGV4aXN0ZWRQYXJlbnQucmVtb3ZlQ2hpbGQoZXhpc3RlZE5vZGUsIHRydWUpXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbkVsZW1lbnQucHJvdG90eXBlLnNldEF0dHIgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICBpZiAodGhpcy5hdHRyW2tleV0gPT09IHZhbHVlKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgdGhpcy5hdHRyW2tleV0gPSB2YWx1ZVxuICBpZiAodGhpcy5hdHRhY2hlZCkge1xuICAgIGNvbnN0IHJlbmRlcmVyID0gdGhpcy5nZXRSZW5kZXJlcigpXG4gICAgaWYgKHJlbmRlcmVyKSB7XG4gICAgICByZW5kZXJlci5zZXRBdHRyKHRoaXMucmVmLCBrZXksIHZhbHVlKVxuICAgIH1cbiAgfVxufVxuXG5FbGVtZW50LnByb3RvdHlwZS5zZXRTdHlsZSA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gIGlmICh0aGlzLnN0eWxlW2tleV0gPT09IHZhbHVlKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgdGhpcy5zdHlsZVtrZXldID0gdmFsdWVcbiAgaWYgKHRoaXMuYXR0YWNoZWQpIHtcbiAgICBjb25zdCByZW5kZXJlciA9IHRoaXMuZ2V0UmVuZGVyZXIoKVxuICAgIGlmIChyZW5kZXJlcikge1xuICAgICAgcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5yZWYsIGtleSwgdmFsdWUpXG4gICAgfVxuICB9XG59XG5cbkVsZW1lbnQucHJvdG90eXBlLnNldENsYXNzU3R5bGUgPSBmdW5jdGlvbiAoY2xhc3NTdHlsZSkge1xuICB0aGlzLmNsYXNzU3R5bGUgPSBjbGFzc1N0eWxlXG4gIGlmICh0aGlzLmF0dGFjaGVkKSB7XG4gICAgY29uc3QgcmVuZGVyZXIgPSB0aGlzLmdldFJlbmRlcmVyKClcbiAgICBpZiAocmVuZGVyZXIpIHtcbiAgICAgIHJlbmRlcmVyLnNldFN0eWxlcyh0aGlzLnJlZiwgdGhpcy50b1N0eWxlKCkpXG4gICAgfVxuICB9XG59XG5cbkVsZW1lbnQucHJvdG90eXBlLmFkZEV2ZW50ID0gZnVuY3Rpb24gKHR5cGUsIGhhbmRsZXIpIHtcbiAgY29uc3QgaW5kZXggPSB0aGlzLmV2ZW50LmluZGV4T2YodHlwZSlcblxuICBpZiAoaW5kZXggPCAwKSB7XG4gICAgdGhpcy5ldmVudC5wdXNoKHR5cGUpXG4gICAgbGV0IGV2ZW50TWFuYWdlciA9IHRoaXMub3duZXJEb2N1bWVudC5ldmVudE1hbmFnZXJcbiAgICBldmVudE1hbmFnZXIuYWRkKHRoaXMsIHR5cGUsIGhhbmRsZXIpXG5cbiAgICBpZiAodGhpcy5hdHRhY2hlZCkge1xuICAgICAgY29uc3QgcmVuZGVyZXIgPSB0aGlzLmdldFJlbmRlcmVyKClcbiAgICAgIGlmIChyZW5kZXJlcikge1xuICAgICAgICByZW5kZXJlci5hZGRFdmVudCh0aGlzLnJlZiwgdHlwZSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuRWxlbWVudC5wcm90b3R5cGUucmVtb3ZlRXZlbnQgPSBmdW5jdGlvbiAodHlwZSkge1xuICBjb25zdCBpbmRleCA9IHRoaXMuZXZlbnQuaW5kZXhPZih0eXBlKVxuXG4gIGlmIChpbmRleCA+PSAwKSB7XG4gICAgdGhpcy5ldmVudC5zcGxpY2UoaW5kZXgsIDEpXG4gICAgbGV0IGV2ZW50TWFuYWdlciA9IHRoaXMub3duZXJEb2N1bWVudC5ldmVudE1hbmFnZXJcbiAgICBldmVudE1hbmFnZXIucmVtb3ZlKHRoaXMsIHR5cGUpXG5cbiAgICBpZiAodGhpcy5hdHRhY2hlZCkge1xuICAgICAgY29uc3QgcmVuZGVyZXIgPSB0aGlzLmdldFJlbmRlcmVyKClcbiAgICAgIGlmIChyZW5kZXJlcikge1xuICAgICAgICByZW5kZXJlci5yZW1vdmVFdmVudCh0aGlzLnJlZiwgdHlwZSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuRWxlbWVudC5wcm90b3R5cGUudG9TdHlsZSA9IGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgcmVzdWx0ID0ge31cbiAgY29uc3QgY2xhc3NTdHlsZSA9IHRoaXMuY2xhc3NTdHlsZVxuICBjb25zdCBzdHlsZSA9IHRoaXMuc3R5bGVcbiAgZm9yIChjb25zdCBuYW1lIGluIGNsYXNzU3R5bGUpIHtcbiAgICByZXN1bHRbbmFtZV0gPSBjbGFzc1N0eWxlW25hbWVdXG4gIH1cbiAgZm9yIChjb25zdCBuYW1lIGluIHN0eWxlKSB7XG4gICAgcmVzdWx0W25hbWVdID0gc3R5bGVbbmFtZV1cbiAgfVxuICByZXR1cm4gcmVzdWx0XG59XG5cbkVsZW1lbnQucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgcmVzdWx0ID0ge1xuICAgIHJlZjogdGhpcy5yZWYudG9TdHJpbmcoKSxcbiAgICB0eXBlOiB0aGlzLnR5cGUsXG4gICAgYXR0cjogdGhpcy5hdHRyLFxuICAgIHN0eWxlOiB0aGlzLnRvU3R5bGUoKVxuICB9XG5cbiAgaWYgKHRoaXMuZXZlbnQgJiYgdGhpcy5ldmVudC5sZW5ndGgpIHtcbiAgICByZXN1bHQuZXZlbnQgPSB0aGlzLmV2ZW50XG4gIH1cbiAgaWYgKHRoaXMucHVyZUNoaWxkcmVuICYmIHRoaXMucHVyZUNoaWxkcmVuLmxlbmd0aCkge1xuICAgIHJlc3VsdC5jaGlsZHJlbiA9IHRoaXMucHVyZUNoaWxkcmVuLm1hcCgoY2hpbGQpID0+IGNoaWxkLnRvSlNPTigpKVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG5FbGVtZW50LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuICc8JyArIHRoaXMudHlwZSArXG4gICAgJyBhdHRyPScgKyBKU09OLnN0cmluZ2lmeSh0aGlzLmF0dHIpICtcbiAgICAnIHN0eWxlPScgKyBKU09OLnN0cmluZ2lmeSh0aGlzLnRvU3R5bGUoKSkgKyAnPicgK1xuICAgIHRoaXMucHVyZUNoaWxkcmVuLm1hcCgoY2hpbGQpID0+IGNoaWxkLnRvU3RyaW5nKCkpLmpvaW4oJycpICtcbiAgICAnPC8nICsgdGhpcy50eXBlICsgJz4nXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBDb21tZW50KHZhbHVlLCBvd25lckRvY3VtZW50KSB7XG4gIHRoaXMuY3JlYXRlKG93bmVyRG9jdW1lbnQuaWQpXG4gIHRoaXMudHlwZSA9ICdjb21tZW50J1xuICB0aGlzLnZhbHVlID0gdmFsdWVcbn1cblxuQ29tbWVudC5wcm90b3R5cGUgPSBuZXcgTm9kZSgpXG5cbkNvbW1lbnQucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gJzwhLS0gJyArIHRoaXMudmFsdWUgKyAnIC0tPidcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vbGliL2FwcC9kb20uanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHtcblx0XCJuYW1lXCI6IFwid2VleC1qc2ZyYW1ld29ya1wiLFxuXHRcInZlcnNpb25cIjogXCIwLjEzLjRcIixcblx0XCJkZXNjcmlwdGlvblwiOiBcIkpTIEZyYW1ld29yayBmb3IgV2VleCBzb2x1dGlvbiB3aGljaCBpcyBhIGV4dGVuZGFibGUgY3Jvc3MtcGxhdGZvcm0gc29sdXRpb24gZm9yIGR5bmFtaWMgcHJvZ3JhbW1pbmcgYW5kIHB1Ymxpc2hpbmcgcHJvamVjdHNcIixcblx0XCJtYWluXCI6IFwiaW5kZXguanNcIixcblx0XCJzY3JpcHRzXCI6IHtcblx0XHRcImRldlwiOiBcIndlYnBhY2sgLS13YXRjaCAtLWNvbmZpZyAuL3dlYnBhY2suY29uZmlnLmpzXCIsXG5cdFx0XCJidWlsZFwiOiBcIndlYnBhY2sgLS1jb25maWcgLi93ZWJwYWNrLmNvbmZpZy5qc1wiLFxuXHRcdFwiY29tcHJlc3NcIjogXCJ1Z2xpZnlqcyBkaXN0L2luZGV4LmpzIC1vIGRpc3QvaW5kZXgubWluLmpzXCIsXG5cdFx0XCJsaW50XCI6IFwianNjcyAtLWNvbmZpZyAuanNjc3JjIHBvbHlmaWxsLyouanMgcG9seWZpbGwvX190ZXN0X18vKi5qcyBsaWIvKi5qcyBsaWIvX190ZXN0X18vKi5qcyBsaWIvYXBwLyouanMgbGliL2FwcC9fX3Rlc3RfXy8qLmpzIGxpYi92bS8qLmpzIGxpYi92bS9fX3Rlc3RfXy8qLmpzXCIsXG5cdFx0XCJ0ZXN0XCI6IFwibW9jaGEgLS1jb21waWxlcnMganM6YmFiZWwtY29yZS9yZWdpc3RlciBwb2x5ZmlsbC9fX3Rlc3RfXy8qLmpzIGxpYi9fX3Rlc3RfXy8qLmpzIGxpYi8qKi9fX3Rlc3RfXy8qLmpzXCIsXG5cdFx0XCJjb3ZlclwiOiBcImJhYmVsLW5vZGUgbm9kZV9tb2R1bGVzL2lzcGFydGEvYmluL2lzcGFydGEgY292ZXIgLS1yZXBvcnQgdGV4dCBub2RlX21vZHVsZXMvbW9jaGEvYmluL19tb2NoYSAtLSAtLXJlcG9ydGVyIGRvdCBsaWIvX190ZXN0X18vKi5qcyBsaWIvKiovX190ZXN0X18vKi5qc1wiLFxuXHRcdFwiY2lcIjogXCJucG0gcnVuIGxpbnQgJiYgbnBtIHJ1biBjb3ZlclwiXG5cdH0sXG5cdFwicmVwb3NpdG9yeVwiOiB7XG5cdFx0XCJ0eXBlXCI6IFwiZ2l0XCIsXG5cdFx0XCJ1cmxcIjogXCJnaXRAZ2l0aHViLmNvbTphbGliYWJhL3dlZXguZ2l0XCJcblx0fSxcblx0XCJhdXRob3JcIjogW1xuXHRcdHtcblx0XHRcdFwibmFtZVwiOiBcImppbmppYW5nXCIsXG5cdFx0XHRcImVtYWlsXCI6IFwiemhhb2ppbmppYW5nQG1lLmNvbVwiXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRcIm5hbWVcIjogXCJUZXJyeSBLaW5nXCIsXG5cdFx0XHRcImVtYWlsXCI6IFwidGVycnlraW5nY2hhQGdtYWlsLmNvbVwiXG5cdFx0fVxuXHRdLFxuXHRcImNvbnRyaWJ1dG9yc1wiOiBbXG5cdFx0e1xuXHRcdFx0XCJuYW1lXCI6IFwicHVzaGltaW5nXCIsXG5cdFx0XHRcImVtYWlsXCI6IFwicHVzaGltaW5nQGdtYWlsLmNvbVwiXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRcIm5hbWVcIjogXCJpc2tlbmh1YW5nXCIsXG5cdFx0XHRcImVtYWlsXCI6IFwiaXNrZW5odWFuZ0BnbWFpbC5jb21cIlxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0XCJuYW1lXCI6IFwieXVhbnlhblwiLFxuXHRcdFx0XCJlbWFpbFwiOiBcInl1YW55YW4uY2FvQGdtYWlsLmNvbVwiXG5cdFx0fVxuXHRdLFxuXHRcImtleXdvcmRzXCI6IFtcblx0XHRcIndlZXhcIixcblx0XHRcIm12dm1cIixcblx0XHRcImJyb3dzZXJcIixcblx0XHRcImh5YnJpZFwiLFxuXHRcdFwiZnJhbWV3b3JrXCJcblx0XSxcblx0XCJsaWNlbnNlXCI6IFwiQXBhY2hlLTIuMFwiLFxuXHRcImRlcGVuZGVuY2llc1wiOiB7XG5cdFx0XCJzZW12ZXJcIjogXCJ+NS4xLjBcIixcblx0XHRcImNvcmUtanNcIjogXCJ+Mi4xLjFcIlxuXHR9LFxuXHRcImRldkRlcGVuZGVuY2llc1wiOiB7XG5cdFx0XCJiYWJlbC1jbGlcIjogXCJ+Ni40LjVcIixcblx0XHRcImJhYmVsLWNvcmVcIjogXCJ+Ni40LjVcIixcblx0XHRcImJhYmVsLWxvYWRlclwiOiBcIn42LjIuMVwiLFxuXHRcdFwiYmFiZWwtcHJlc2V0LWVzMjAxNVwiOiBcIn42LjMuMTNcIixcblx0XHRcImNoYWlcIjogXCJ+My4yLjBcIixcblx0XHRcImlzcGFydGFcIjogXCJ+NC4wLjBcIixcblx0XHRcImlzdGFuYnVsXCI6IFwifjAuNC4yXCIsXG5cdFx0XCJqc2NzXCI6IFwifjIuOS4wXCIsXG5cdFx0XCJqc29uLWxvYWRlclwiOiBcIl4wLjUuNFwiLFxuXHRcdFwibW9jaGFcIjogXCJ+Mi4zLjRcIixcblx0XHRcInNpbm9uXCI6IFwifjEuMTcuMlwiLFxuXHRcdFwic2lub24tY2hhaVwiOiBcIn4yLjguMFwiLFxuXHRcdFwidWdsaWZ5LWpzXCI6IFwiXjIuNi4yXCIsXG5cdFx0XCJ3YXRjaC1jbGlcIjogXCJ+MC4yLjFcIixcblx0XHRcIndlYnBhY2tcIjogXCJ+MS4xMi4xMlwiXG5cdH0sXG5cdFwib3B0aW9uYWxEZXBlbmRlbmNpZXNcIjoge1xuXHRcdFwid2VleC10cmFuc2Zvcm1lclwiOiBcIn4wLjFcIlxuXHR9XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9wYWNrYWdlLmpzb25cbiAqKiBtb2R1bGUgaWQgPSAxMDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogQGZpbGVPdmVydmlldyBUaGUgYXBpIGZvciBpbnZva2luZyB3aXRoIFwiJFwiIHByZWZpeFxuICovXG5pbXBvcnQge3R5cG9mLCBleHRlbmR9IGZyb20gJy4uL3V0aWwnXG5cbi8qKlxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogY29tbW9uXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKi9cblxuLyoqXG4gKiBAZGVwcmVjYXRlZCB1c2UgJHZtIGluc3RlYWRcbiAqIGZpbmQgdGhlIHZtIGJ5IGlkXG4gKiBOb3RlOiB0aGVyZSBpcyBvbmx5IG9uZSBpZCBpbiB3aG9sZSBjb21wb25lbnRcbiAqIEBwYXJhbSAge3N0cmluZ30gaWRcbiAqIEByZXR1cm4ge1ZtfVxuICovXG5leHBvcnQgZnVuY3Rpb24gJChpZCkge1xuICBuYXRpdmVMb2coJ3RoZSBWbSMkIGFwaSBpcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlIFZtIyR2bSBpbnN0ZWFkJylcbiAgY29uc3QgaW5mbyA9IHRoaXMuX2lkc1tpZF1cbiAgaWYgKGluZm8pIHtcbiAgICByZXR1cm4gaW5mby52bVxuICB9XG59XG5cbi8qKlxuICogZmluZCB0aGUgZWxlbWVudCBieSBpZFxuICogTm90ZTogdGhlcmUgaXMgb25seSBvbmUgaWQgaW4gd2hvbGUgY29tcG9uZW50XG4gKiBAcGFyYW0gIHtzdHJpbmd9IGlkXG4gKiBAcmV0dXJuIHtFbGVtZW50fVxuICovXG5leHBvcnQgZnVuY3Rpb24gJGVsKGlkKSB7XG4gIGNvbnN0IGluZm8gPSB0aGlzLl9pZHNbaWRdXG4gIGlmIChpbmZvKSB7XG4gICAgcmV0dXJuIGluZm8uZWxcbiAgfVxufVxuXG4vKipcbiAqIGZpbmQgdGhlIHZtIG9mIHRoZSBjdXN0b20gY29tcG9uZW50IGJ5IGlkXG4gKiBOb3RlOiB0aGVyZSBpcyBvbmx5IG9uZSBpZCBpbiB3aG9sZSBjb21wb25lbnRcbiAqIEBwYXJhbSAge3N0cmluZ30gaWRcbiAqIEByZXR1cm4ge1ZtfVxuICovXG5leHBvcnQgZnVuY3Rpb24gJHZtKGlkKSB7XG4gIGNvbnN0IGluZm8gPSB0aGlzLl9pZHNbaWRdXG4gIGlmIChpbmZvKSB7XG4gICAgcmV0dXJuIGluZm8udm1cbiAgfVxufVxuXG4vKipcbiAqIEZpcmUgd2hlbiBkaWZmZXIgcmVuZGVyaW5nIGZpbmlzaGVkXG4gKlxuICogQHBhcmFtICB7RnVuY3Rpb259IGZuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiAkcmVuZGVyVGhlbihmbikge1xuICBjb25zdCBhcHAgPSB0aGlzLl9hcHBcbiAgY29uc3QgZGlmZmVyID0gYXBwLmRpZmZlclxuICByZXR1cm4gZGlmZmVyLnRoZW4oKCkgPT4ge1xuICAgIGZuKClcbiAgfSlcbn1cblxuLyoqXG4gKiBzY3JvbGwgYW4gZWxlbWVudCBzcGVjaWZpZWQgYnkgaWQgaW50byB2aWV3LCBcbiAqIG1vcmVvdmVyIHNwZWNpZnkgYSBudW1iZXIgb2Ygb2Zmc2V0IG9wdGlvbmFsbHlcbiAqIEBwYXJhbSAge3N0cmluZ30gaWRcbiAqIEBwYXJhbSAge251bWJlcn0gb2Zmc2V0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiAkc2Nyb2xsVG8oaWQsIG9mZnNldCkge1xuICBjb25zdCBlbCA9IHRoaXMuJGVsKGlkKVxuICBpZiAoZWwpIHtcbiAgICBjb25zdCBkb20gPSB0aGlzLl9hcHAucmVxdWlyZU1vZHVsZSgnZG9tJylcbiAgICBkb20uc2Nyb2xsVG9FbGVtZW50KGVsLnJlZiwge29mZnNldDogb2Zmc2V0fSlcbiAgfVxufVxuXG4vKipcbiAqIHBlcmZvcm0gdHJhbnNpdGlvbiBhbmltYXRpb24gb24gYW4gZWxlbWVudCBzcGVjaWZpZWQgYnkgaWRcbiAqIEBwYXJhbSAge3N0cmluZ30gICBpZFxuICogQHBhcmFtICB7b2JqZWN0fSAgIG9wdGlvbnNcbiAqIEBwYXJhbSAge29iamVjdH0gICBvcHRpb25zLnN0eWxlc1xuICogQHBhcmFtICB7b2JqZWN0fSAgIG9wdGlvbnMuZHVyYXRpb24obXMpXG4gKiBAcGFyYW0gIHtvYmplY3R9ICAgW29wdGlvbnMudGltaW5nRnVuY3Rpb25dXG4gKiBAcGFyYW0gIHtvYmplY3R9ICAgW29wdGlvbnMuZGVsYXk9MChtcyldXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uICR0cmFuc2l0aW9uKGlkLCBvcHRpb25zLCBjYWxsYmFjaykge1xuICBjb25zdCBlbCA9IHRoaXMuJGVsKGlkKVxuICBpZiAoZWwgJiYgb3B0aW9ucyAmJiBvcHRpb25zLnN0eWxlcykge1xuICAgIGNvbnN0IGFuaW1hdGlvbiA9IHRoaXMuX2FwcC5yZXF1aXJlTW9kdWxlKCdhbmltYXRpb24nKVxuICAgIGFuaW1hdGlvbi50cmFuc2l0aW9uKGVsLnJlZiwgb3B0aW9ucywgKC4uLmFyZ3MpID0+IHtcbiAgICAgIHRoaXMuX3NldFN0eWxlKGVsLCBvcHRpb25zLnN0eWxlcylcbiAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKC4uLmFyZ3MpXG4gICAgfSlcbiAgfVxufVxuXG4vKipcbiAqIGdldCBzb21lIGNvbmZpZ1xuICogQHJldHVybiB7b2JqZWN0fSBzb21lIGNvbmZpZyBmb3IgYXBwIGluc3RhbmNlXG4gKiBAcHJvcGVydHkge3N0cmluZ30gYnVuZGxlVXJsXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGRlYnVnXG4gKiBAcHJvcGVydHkge29iamVjdH0gZW52XG4gKiBAcHJvcGVydHkge3N0cmluZ30gZW52LndlZXhWZXJzaW9uKGV4LiAxLjAuMClcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBlbnYuYXBwTmFtZShleC4gVEIvVE0pXG4gKiBAcHJvcGVydHkge3N0cmluZ30gZW52LmFwcFZlcnNpb24oZXguIDUuMC4wKVxuICogQHByb3BlcnR5IHtzdHJpbmd9IGVudi5wbGF0Zm9ybShleC4gaU9TL0FuZHJvaWQpXG4gKiBAcHJvcGVydHkge3N0cmluZ30gZW52Lm9zVmVyc2lvbihleC4gNy4wLjApXG4gKiBAcHJvcGVydHkge3N0cmluZ30gZW52LmRldmljZU1vZGVsICoqbmF0aXZlIG9ubHkqKlxuICogQHByb3BlcnR5IHtudW1iZXJ9IGVudi5bZGV2aWNlV2lkdGg9NzUwXVxuICogQHByb3BlcnR5IHtudW1iZXJ9IGVudi5kZXZpY2VIZWlnaHRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uICRnZXRDb25maWcoY2FsbGJhY2spIHtcbiAgY29uc3QgY29uZmlnID0gZXh0ZW5kKHtcbiAgICBlbnY6IGdsb2JhbC5XWEVudmlyb25tZW50IHx8IHt9XG4gIH0sIHRoaXMuX2FwcC5vcHRpb25zKVxuICB0eXBvZihjYWxsYmFjaykgPT09ICdmdW5jdGlvbicgJiYgY2FsbGJhY2soY29uZmlnKVxuICByZXR1cm4gY29uZmlnXG59XG5cbi8qKlxuICogcmVxdWVzdCBuZXR3b3JrIHZpYSBodHRwIHByb3RvY29sXG4gKiBAcGFyYW0gIHtvYmplY3R9ICAgcGFyYW1zXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uICRzZW5kSHR0cChwYXJhbXMsIGNhbGxiYWNrKSB7XG4gIGNvbnN0IHN0cmVhbSA9IHRoaXMuX2FwcC5yZXF1aXJlTW9kdWxlKCdzdHJlYW0nKVxuICBzdHJlYW0uc2VuZEh0dHAocGFyYW1zLCBjYWxsYmFjaylcbn1cblxuLyoqXG4gKiBvcGVuIGEgdXJsXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHVybFxuICovXG5leHBvcnQgZnVuY3Rpb24gJG9wZW5VUkwodXJsKSB7XG4gIGNvbnN0IGV2ZW50ID0gdGhpcy5fYXBwLnJlcXVpcmVNb2R1bGUoJ2V2ZW50JylcbiAgZXZlbnQub3BlblVSTCh1cmwpXG59XG5cbi8qKlxuICogc2V0IGEgdGl0bGUgZm9yIHBhZ2VcbiAqIEBwYXJhbSAge3N0cmluZ30gdGl0bGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uICRzZXRUaXRsZSh0aXRsZSkge1xuICBjb25zdCBwYWdlSW5mbyA9IHRoaXMuX2FwcC5yZXF1aXJlTW9kdWxlKCdwYWdlSW5mbycpXG4gIHBhZ2VJbmZvLnNldFRpdGxlKHRpdGxlKVxufVxuXG4vKipcbiAqIGludm9rZSBhIG5hdGl2ZSBtZXRob2QgYnkgc3BlY2lmaW5nIHRoZSBuYW1lIG9mIG1vZHVsZSBhbmQgbWV0aG9kXG4gKiBAcGFyYW0gIHtzdHJpbmd9IG1vZHVsZU5hbWVcbiAqIEBwYXJhbSAge3N0cmluZ30gbWV0aG9kTmFtZVxuICogQHBhcmFtICB7Li4uKn0gdGhlIHJlc3QgYXJndW1lbnRzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiAkY2FsbChtb2R1bGVOYW1lLCBtZXRob2ROYW1lLCAuLi5hcmdzKSB7XG4gIGNvbnN0IG1vZHVsZSA9IHRoaXMuX2FwcC5yZXF1aXJlTW9kdWxlKG1vZHVsZU5hbWUpXG4gIGlmIChtb2R1bGUgJiYgbW9kdWxlW21ldGhvZE5hbWVdKSB7XG4gICAgbW9kdWxlW21ldGhvZE5hbWVdKC4uLmFyZ3MpXG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vbGliL2FwaS9tZXRob2RzLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==