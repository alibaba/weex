(this.nativeLog || function(s) {console.log(s)})('START JS FRAMEWORK: 0.13.9');
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
	
	var _loop = function _loop(methodName) {
	    global[methodName] = function () {
	        var ret = framework[methodName].apply(framework, arguments);
	        if (ret instanceof Error) {
	            console.error(ret.toString());
	        } else if (ret instanceof Array) {
	            ret.forEach(function (r) {
	                if (r instanceof Error) {
	                    console.error(r.toString());
	                }
	            });
	        }
	        return ret;
	    };
	};
	
	for (var methodName in framework) {
	    _loop(methodName);
	}
	
	Object.assign(global, {
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
	  str += '';
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
	
	  var _checkDowngrade = downgrade.check(config.downgrade);
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
	  this._computed = component.computed || {};
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
	  this._initComputed();
	  this._initMethods();
	  // this._initMeta()
	};
	
	/**
	 * Initialize the data. 
	 */
	
	var KEY_WORDS = ['$index', '$value', '$event'];
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
	    if (KEY_WORDS.indexOf(key) > -1 || !_.isReserved(key)) {
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
	
	/**
	 * Setup computed properties. They are essentially
	 * special getter/setters
	 */
	
	function noop() {}
	exports._initComputed = function () {
	  // var computed = this.$options.computed
	  var computed = this._computed;
	  if (computed) {
	    for (var key in computed) {
	      var userDef = computed[key];
	      var def = {
	        enumerable: true,
	        configurable: true
	      };
	      if (typeof userDef === 'function') {
	        def.get = _.bind(userDef, this);
	        def.set = noop;
	      } else {
	        def.get = userDef.get ? _.bind(userDef.get, this) : noop;
	        def.set = userDef.set ? _.bind(userDef.set, this) : noop;
	      }
	      Object.defineProperty(this, key, def);
	    }
	  }
	};
	
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
	  var context = this;
	  if (context._targetIsFragment(target)) {
	    context._compileFragment(target, dest, meta);
	    return;
	  }
	  meta = meta || {};
	  if (context._targetIsContent(target)) {
	    context._content = context._createBlock(dest);
	    return;
	  }
	
	  if (context._targetNeedCheckRepeat(target, meta)) {
	    context._compileRepeat(target, dest);
	    return;
	  }
	  if (context._targetNeedCheckShown(target, meta)) {
	    context._compileShown(target, dest, meta);
	    return;
	  }
	  var typeGetter = meta.type || target.type;
	  if (context._targetNeedCheckType(typeGetter, meta)) {
	    context._compileType(target, dest, typeGetter, meta);
	    return;
	  }
	  var type = typeGetter;
	  if (context._targetIsComposed(target, type)) {
	    context._compileCustomComponent(target, dest, type, meta);
	    return;
	  }
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
	  if (this._app && this._app.customComponentMap && type) {
	    return !!this._app.customComponentMap[type];
	  }
	  return !!target.component;
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
	  var trackBy = repeat.trackBy || target.trackBy || target.attr && target.attr.trackBy || key;
	
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
	function _compileCustomComponent(target, dest, type, meta) {
	  var Vm = this.constructor;
	  var context = this;
	  var subVm = new Vm(type, context, dest, undefined, {
	    'hook:init': function hookInit() {
	      context._setId(target.id, null, this);
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
	    template.append = template.attr.append;
	  }
	
	  if (template.append) {
	    // give the append attribute for ios adaptation
	    element.attr = element.attr || {};
	    element.attr.append = template.append;
	  }
	
	  var treeMode = template.append === 'tree';
	  if (!treeMode) {
	    this._attachTarget(element, dest);
	  }
	  this._compileChildren(template, element);
	  if (treeMode) {
	    this._attachTarget(element, dest);
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
	
	  var children = template.children;
	  if (children && children.length) {
	    children.forEach(function (child) {
	      _this3._compile(child, dest);
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
	              nativeLog('[WARNING] "INDEX" in repeat is deprecated,' + ' please use "$index" instead');
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
	    // console.log(context)
	    vms.push(context);
	    context._compile(target, fragBlock, { repeat: item });
	  }
	
	  function diffItem(vm, item) {
	    var oldItem = vm._data;
	    var oldKeys = [];
	    for (var key in oldItem) {
	      if (!item.hasOwnProperty(key)) {
	        vm[key] = undefined;
	      }
	    }
	    for (var _key in item) {
	      vm[_key] = item[_key];
	    }
	  }
	
	  function setItemValue(item, index, vm) {
	    var mergedData = void 0;
	    if (oldStyle) {
	      if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object') {
	        diffItem(vm, item);
	        vm.INDEX = index;
	      }
	    } else {
	      vm[keyName] = index;
	      vm[valueName] = item;
	    }
	  }
	
	  var list = this._watchBlock(fragBlock, getter, 'repeat', function (data) {
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
	      var key = trackBy ? item[trackBy] : index;
	      /* istanbul ignore if */
	      if (key == null || key === '') {
	        return;
	      }
	      trackMap[key] = item;
	    });
	
	    // 2. remove unused element foreach old item
	    var reusedList = [];
	    oldData.forEach(function (item, index) {
	      var key = trackBy ? item[trackBy] : index;
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
	      var key = trackBy ? item[trackBy] : index;
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
	  mergeClassStyle(template.classList, this, subVm);
	  mergeStyle(template.style, this, subVm);
	  mergeEvent(template.events, this, subVm);
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
	
	  if (!subVm._rootEl) {
	    return;
	  }
	
	  if (typeof target === 'function') {
	    var _value = vm._watch(target, function (v) {
	      setClassStyle(subVm._rootEl, css, v);
	    });
	    setClassStyle(subVm._rootEl, css, _value);
	  } else if (target) {
	    setClassStyle(subVm._rootEl, css, target);
	  }
	}
	
	function mergeEvent(target, vm, subVm) {
	  if (target && subVm._rootEl) {
	    for (var type in target) {
	      var handler = vm[target[type]];
	      if (handler) {
	        subVm._rootEl.addEvent(type, (0, _util.bind)(handler, vm));
	      }
	    }
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
	    var handler = events[key];
	    if (typeof handler === 'string') {
	      handler = this[handler];
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
	      var update = _value3;
	      this._bindKey(el, name, key, update);
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
	  var obj = el[name];
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
	    _this.updateActions();
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
	
	  var fn = new Function('define', 'require', 'document', 'bootstrap', 'register', 'render', '__weex_define__', // alias for define
	  '__weex_bootstrap__', // alias for bootstrap
	  functionBody);
	
	  fn(define, require, document, bootstrap, register, render, define, bootstrap);
	
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
	
	function callback(callbackId, data, ifKeepAlive) {
	  var callback = this.callbacks[callbackId];
	
	  if (typeof callback === 'function') {
	    callback(data); // data is already a object, @see: lib/framework.js
	
	    if (typeof ifKeepAlive === 'undefined' || ifKeepAlive === false) {
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
		"version": "0.13.9",
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
			"weex-transformer": ">=0.1.5 <0.4"
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
	  nativeLog('[WARNING] the Vm#$ api is deprecated, please use Vm#$vm instead');
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
	  if ((0, _util.typof)(callback) === 'function') {
	    nativeLog('[WARNING] the callback of Vm#$getConfig(callback) is deprecated, ' + 'this api now can directly RETURN config info.');
	    callback(config);
	  }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZmY0NjU1MWIyZGJlZTU2NTJmMDQiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vcG9seWZpbGwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vcG9seWZpbGwvb2JqZWN0QXNzaWduLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9mbi9vYmplY3QvYXNzaWduLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19leHBvcnQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9fY29yZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9faGlkZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWRwLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19hbi1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX2lzLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9faWU4LWRvbS1kZWZpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19mYWlscy5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9fZG9tLWNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9fdG8tcHJpbWl0aXZlLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19wcm9wZXJ0eS1kZXNjLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19yZWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9faGFzLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL191aWQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX2N0eC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9fYS1mdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWFzc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWtleXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1rZXlzLWludGVybmFsLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL190by1pb2JqZWN0LmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19pb2JqZWN0LmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19jb2YuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX2RlZmluZWQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX2FycmF5LWluY2x1ZGVzLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL190by1sZW5ndGguanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX3RvLWludGVnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX3RvLWluZGV4LmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19zaGFyZWQta2V5LmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19zaGFyZWQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX2VudW0tYnVnLWtleXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1nb3BzLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19vYmplY3QtcGllLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL190by1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vcG9seWZpbGwvcHJvbWlzZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LnRvLXN0cmluZy5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9fY2xhc3NvZi5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9fd2tzLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX3N0cmluZy1hdC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9faXRlci1kZWZpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX2xpYnJhcnkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX2l0ZXJhdG9ycy5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9faXRlci1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1kcHMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX2h0bWwuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX3NldC10by1zdHJpbmctdGFnLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19vYmplY3QtZ3BvLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5Lml0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19hZGQtdG8tdW5zY29wYWJsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX2l0ZXItc3RlcC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9lczYucHJvbWlzZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9fYW4taW5zdGFuY2UuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX2Zvci1vZi5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9faXRlci1jYWxsLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19pcy1hcnJheS1pdGVyLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9fc2V0LXByb3RvLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19vYmplY3QtZ29wZC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9fc3BlY2llcy1jb25zdHJ1Y3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9fdGFzay5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9faW52b2tlLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19taWNyb3Rhc2suanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX3JlZGVmaW5lLWFsbC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9fc2V0LXNwZWNpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX2l0ZXItZGV0ZWN0LmpzIiwid2VicGFjazovLy8uL3BvbHlmaWxsL3NldFRpbWVvdXQuanMiLCJ3ZWJwYWNrOi8vLy4vcG9seWZpbGwvY29uc29sZWxvZy5qcyIsIndlYnBhY2s6Ly8vLi9saWIvZnJhbWV3b3JrLmpzIiwid2VicGFjazovLy8uL2xpYi9wZXJmLmpzIiwid2VicGFjazovLy8uL2xpYi9sb2cuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9saWIvYXBwL2luZGV4LmpzIiwid2VicGFjazovLy8uL2xpYi91dGlsL2luZGV4LmpzIiwid2VicGFjazovLy8uL2xpYi9hcHAvYnVuZGxlLmpzIiwid2VicGFjazovLy8uL34vc2VtdmVyL3NlbXZlci5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL34vbm9kZS1saWJzLWJyb3dzZXIvfi9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL3ZtL2luZGV4LmpzIiwid2VicGFjazovLy8uL2xpYi92bS9pbnN0YW5jZS9zY29wZS5qcyIsIndlYnBhY2s6Ly8vLi9saWIvdm0vdXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvdm0vb2JzZXJ2ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbGliL3ZtL2NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9saWIvdm0vb2JzZXJ2ZXIvZGVwLmpzIiwid2VicGFjazovLy8uL2xpYi92bS9vYnNlcnZlci9hcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9saWIvdm0vb2JzZXJ2ZXIvb2JqZWN0LmpzIiwid2VicGFjazovLy8uL2xpYi92bS9jb21waWxlci5qcyIsIndlYnBhY2s6Ly8vLi9saWIvdm0vZGlyZWN0aXZlLmpzIiwid2VicGFjazovLy8uL2xpYi92bS93YXRjaGVyLmpzIiwid2VicGFjazovLy8uL2xpYi92bS9kb20taGVscGVyLmpzIiwid2VicGFjazovLy8uL2xpYi92bS9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2FwcC9yZWdpc3Rlci5qcyIsIndlYnBhY2s6Ly8vLi9saWIvYXBwL2Rvd25ncmFkZS5qcyIsIndlYnBhY2s6Ly8vLi9saWIvYXBwL2N0cmwuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2FwcC9kb20tbGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2FwcC9kaWZmZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2FwcC9ldmVudC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvYXBwL2RvbS5qcyIsIndlYnBhY2s6Ly8vLi9wYWNrYWdlLmpzb24iLCJ3ZWJwYWNrOi8vLy4vbGliL2FwaS9tZXRob2RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7O0FDdENBOztBQUNBOztLQUFZOztBQUNaOzs7OzRCQUVTO0FBQ0wsWUFBTyxVQUFQLElBQXFCLFlBQW1CO0FBQ3BDLGFBQU0sTUFBTSxVQUFVLFdBQVYsNEJBQU4sQ0FEOEI7QUFFcEMsYUFBSSxlQUFlLEtBQWYsRUFBc0I7QUFDdEIscUJBQVEsS0FBUixDQUFjLElBQUksUUFBSixFQUFkLEVBRHNCO1VBQTFCLE1BRU8sSUFBSSxlQUFlLEtBQWYsRUFBc0I7QUFDN0IsaUJBQUksT0FBSixDQUFZLGFBQUs7QUFDYixxQkFBSSxhQUFhLEtBQWIsRUFBb0I7QUFDcEIsNkJBQVEsS0FBUixDQUFjLEVBQUUsUUFBRixFQUFkLEVBRG9CO2tCQUF4QjtjQURRLENBQVosQ0FENkI7VUFBMUI7QUFPUCxnQkFBTyxHQUFQLENBWG9DO01BQW5COzs7QUFEekIsTUFBSyxJQUFJLFVBQUosSUFBa0IsU0FBdkIsRUFBa0M7V0FBekIsWUFBeUI7RUFBbEM7O0FBZ0JBLFFBQU8sTUFBUCxDQUFjLE1BQWQsRUFBc0I7QUFDbEIsdUNBRGtCO0FBRWxCLDZCQUF3Qiw4QkFBcUIsa0JBQXJCLENBQXhC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QVQsQ0FBbUIsS0FBbkIsRUFBMEI7QUFDL0IsT0FBTSxXQUFXLEtBQUssSUFBTCxDQUFVLGFBQVYsQ0FBd0IsVUFBeEIsQ0FBWCxDQUR5QjtBQUUvQixZQUFTLFFBQVQsQ0FBa0IsS0FBbEIsRUFGK0I7RUFBMUI7Ozs7Ozs7O0FBV0EsVUFBUyxLQUFULENBQWUsVUFBZixFQUEyQixVQUEzQixFQUFnRDtBQUNyRCxPQUFNLFNBQVMsS0FBSyxJQUFMLENBQVUsYUFBVixDQUF3QixVQUF4QixDQUFULENBRCtDO0FBRXJELE9BQUksVUFBVSxPQUFPLFVBQVAsQ0FBVixFQUE4Qjt1Q0FGYTs7TUFFYjs7QUFDaEMsWUFBTyxXQUFQLGVBQXNCLElBQXRCLEVBRGdDO0lBQWxDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBmZjQ2NTUxYjJkYmVlNTY1MmYwNFxuICoqLyIsImltcG9ydCAnLi9wb2x5ZmlsbCdcbmltcG9ydCAqIGFzIGZyYW1ld29yayBmcm9tICcuL2xpYi9mcmFtZXdvcmsnXG5pbXBvcnQge3ZlcnNpb24sIG9wdGlvbmFsRGVwZW5kZW5jaWVzfSBmcm9tICcuL3BhY2thZ2UuanNvbidcblxuZm9yIChsZXQgbWV0aG9kTmFtZSBpbiBmcmFtZXdvcmspIHtcbiAgICBnbG9iYWxbbWV0aG9kTmFtZV0gPSBmdW5jdGlvbiAoLi4uYXJncykge1xuICAgICAgICBjb25zdCByZXQgPSBmcmFtZXdvcmtbbWV0aG9kTmFtZV0oLi4uYXJncylcbiAgICAgICAgaWYgKHJldCBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKHJldC50b1N0cmluZygpKVxuICAgICAgICB9IGVsc2UgaWYgKHJldCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICByZXQuZm9yRWFjaChyID0+IHtcbiAgICAgICAgICAgICAgICBpZiAociBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3Ioci50b1N0cmluZygpKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJldFxuICAgIH1cbn1cblxuT2JqZWN0LmFzc2lnbihnbG9iYWwsIHtcbiAgICBmcmFtZXdvcmtWZXJzaW9uOiB2ZXJzaW9uLFxuICAgIG5lZWRUcmFuc2Zvcm1lclZlcnNpb246IG9wdGlvbmFsRGVwZW5kZW5jaWVzWyd3ZWV4LXRyYW5zZm9ybWVyJ11cbn0pXG5cbi8qKlxuICogcmVnaXN0ZXIgbWV0aG9kc1xuICovXG5jb25zdCBtZXRob2RzID0gcmVxdWlyZSgnLi9saWIvYXBpL21ldGhvZHMnKVxuY29uc3Qge3JlZ2lzdGVyTWV0aG9kc30gPSBnbG9iYWxcbnJlZ2lzdGVyTWV0aG9kcyhtZXRob2RzKVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9pbmRleC5qc1xuICoqLyIsImltcG9ydCAnLi9vYmplY3RBc3NpZ24nXG5pbXBvcnQgJy4vcHJvbWlzZSdcbmltcG9ydCAnLi9zZXRUaW1lb3V0J1xuaW1wb3J0ICcuL2NvbnNvbGVsb2cnXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3BvbHlmaWxsL2luZGV4LmpzXG4gKiovIiwiaW1wb3J0ICdjb3JlLWpzL2ZuL29iamVjdC9hc3NpZ24nXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3BvbHlmaWxsL29iamVjdEFzc2lnbi5qc1xuICoqLyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24nKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdC5hc3NpZ247XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvZm4vb2JqZWN0L2Fzc2lnbi5qc1xuICoqLyIsIi8vIDE5LjEuMy4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiwgJ09iamVjdCcsIHthc3NpZ246IHJlcXVpcmUoJy4vX29iamVjdC1hc3NpZ24nKX0pO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24uanNcbiAqKi8iLCJ2YXIgZ2xvYmFsICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBjb3JlICAgICAgPSByZXF1aXJlKCcuL19jb3JlJylcbiAgLCBoaWRlICAgICAgPSByZXF1aXJlKCcuL19oaWRlJylcbiAgLCByZWRlZmluZSAgPSByZXF1aXJlKCcuL19yZWRlZmluZScpXG4gICwgY3R4ICAgICAgID0gcmVxdWlyZSgnLi9fY3R4JylcbiAgLCBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcblxudmFyICRleHBvcnQgPSBmdW5jdGlvbih0eXBlLCBuYW1lLCBzb3VyY2Upe1xuICB2YXIgSVNfRk9SQ0VEID0gdHlwZSAmICRleHBvcnQuRlxuICAgICwgSVNfR0xPQkFMID0gdHlwZSAmICRleHBvcnQuR1xuICAgICwgSVNfU1RBVElDID0gdHlwZSAmICRleHBvcnQuU1xuICAgICwgSVNfUFJPVE8gID0gdHlwZSAmICRleHBvcnQuUFxuICAgICwgSVNfQklORCAgID0gdHlwZSAmICRleHBvcnQuQlxuICAgICwgdGFyZ2V0ICAgID0gSVNfR0xPQkFMID8gZ2xvYmFsIDogSVNfU1RBVElDID8gZ2xvYmFsW25hbWVdIHx8IChnbG9iYWxbbmFtZV0gPSB7fSkgOiAoZ2xvYmFsW25hbWVdIHx8IHt9KVtQUk9UT1RZUEVdXG4gICAgLCBleHBvcnRzICAgPSBJU19HTE9CQUwgPyBjb3JlIDogY29yZVtuYW1lXSB8fCAoY29yZVtuYW1lXSA9IHt9KVxuICAgICwgZXhwUHJvdG8gID0gZXhwb3J0c1tQUk9UT1RZUEVdIHx8IChleHBvcnRzW1BST1RPVFlQRV0gPSB7fSlcbiAgICAsIGtleSwgb3duLCBvdXQsIGV4cDtcbiAgaWYoSVNfR0xPQkFMKXNvdXJjZSA9IG5hbWU7XG4gIGZvcihrZXkgaW4gc291cmNlKXtcbiAgICAvLyBjb250YWlucyBpbiBuYXRpdmVcbiAgICBvd24gPSAhSVNfRk9SQ0VEICYmIHRhcmdldCAmJiB0YXJnZXRba2V5XSAhPT0gdW5kZWZpbmVkO1xuICAgIC8vIGV4cG9ydCBuYXRpdmUgb3IgcGFzc2VkXG4gICAgb3V0ID0gKG93biA/IHRhcmdldCA6IHNvdXJjZSlba2V5XTtcbiAgICAvLyBiaW5kIHRpbWVycyB0byBnbG9iYWwgZm9yIGNhbGwgZnJvbSBleHBvcnQgY29udGV4dFxuICAgIGV4cCA9IElTX0JJTkQgJiYgb3duID8gY3R4KG91dCwgZ2xvYmFsKSA6IElTX1BST1RPICYmIHR5cGVvZiBvdXQgPT0gJ2Z1bmN0aW9uJyA/IGN0eChGdW5jdGlvbi5jYWxsLCBvdXQpIDogb3V0O1xuICAgIC8vIGV4dGVuZCBnbG9iYWxcbiAgICBpZih0YXJnZXQpcmVkZWZpbmUodGFyZ2V0LCBrZXksIG91dCwgdHlwZSAmICRleHBvcnQuVSk7XG4gICAgLy8gZXhwb3J0XG4gICAgaWYoZXhwb3J0c1trZXldICE9IG91dCloaWRlKGV4cG9ydHMsIGtleSwgZXhwKTtcbiAgICBpZihJU19QUk9UTyAmJiBleHBQcm90b1trZXldICE9IG91dClleHBQcm90b1trZXldID0gb3V0O1xuICB9XG59O1xuZ2xvYmFsLmNvcmUgPSBjb3JlO1xuLy8gdHlwZSBiaXRtYXBcbiRleHBvcnQuRiA9IDE7ICAgLy8gZm9yY2VkXG4kZXhwb3J0LkcgPSAyOyAgIC8vIGdsb2JhbFxuJGV4cG9ydC5TID0gNDsgICAvLyBzdGF0aWNcbiRleHBvcnQuUCA9IDg7ICAgLy8gcHJvdG9cbiRleHBvcnQuQiA9IDE2OyAgLy8gYmluZFxuJGV4cG9ydC5XID0gMzI7ICAvLyB3cmFwXG4kZXhwb3J0LlUgPSA2NDsgIC8vIHNhZmVcbiRleHBvcnQuUiA9IDEyODsgLy8gcmVhbCBwcm90byBtZXRob2QgZm9yIGBsaWJyYXJ5YCBcbm1vZHVsZS5leHBvcnRzID0gJGV4cG9ydDtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL19leHBvcnQuanNcbiAqKi8iLCIvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxudmFyIGdsb2JhbCA9IG1vZHVsZS5leHBvcnRzID0gdHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuTWF0aCA9PSBNYXRoXG4gID8gd2luZG93IDogdHlwZW9mIHNlbGYgIT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5NYXRoID09IE1hdGggPyBzZWxmIDogRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbmlmKHR5cGVvZiBfX2cgPT0gJ251bWJlcicpX19nID0gZ2xvYmFsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fZ2xvYmFsLmpzXG4gKiovIiwidmFyIGNvcmUgPSBtb2R1bGUuZXhwb3J0cyA9IHt2ZXJzaW9uOiAnMi4xLjUnfTtcbmlmKHR5cGVvZiBfX2UgPT0gJ251bWJlcicpX19lID0gY29yZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX2NvcmUuanNcbiAqKi8iLCJ2YXIgZFAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpXG4gICwgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IGZ1bmN0aW9uKG9iamVjdCwga2V5LCB2YWx1ZSl7XG4gIHJldHVybiBkUC5mKG9iamVjdCwga2V5LCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG59IDogZnVuY3Rpb24ob2JqZWN0LCBrZXksIHZhbHVlKXtcbiAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIG9iamVjdDtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9faGlkZS5qc1xuICoqLyIsInZhciBhbk9iamVjdCAgICAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuL19pZTgtZG9tLWRlZmluZScpXG4gICwgdG9QcmltaXRpdmUgICAgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKVxuICAsIGRQICAgICAgICAgICAgID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG5leHBvcnRzLmYgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gT2JqZWN0LmRlZmluZVByb3BlcnR5IDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcyl7XG4gIGFuT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEF0dHJpYnV0ZXMpO1xuICBpZihJRThfRE9NX0RFRklORSl0cnkge1xuICAgIHJldHVybiBkUChPLCBQLCBBdHRyaWJ1dGVzKTtcbiAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxuICBpZignZ2V0JyBpbiBBdHRyaWJ1dGVzIHx8ICdzZXQnIGluIEF0dHJpYnV0ZXMpdGhyb3cgVHlwZUVycm9yKCdBY2Nlc3NvcnMgbm90IHN1cHBvcnRlZCEnKTtcbiAgaWYoJ3ZhbHVlJyBpbiBBdHRyaWJ1dGVzKU9bUF0gPSBBdHRyaWJ1dGVzLnZhbHVlO1xuICByZXR1cm4gTztcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWRwLmpzXG4gKiovIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoIWlzT2JqZWN0KGl0KSl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhbiBvYmplY3QhJyk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fYW4tb2JqZWN0LmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiB0eXBlb2YgaXQgPT09ICdvYmplY3QnID8gaXQgIT09IG51bGwgOiB0eXBlb2YgaXQgPT09ICdmdW5jdGlvbic7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX2lzLW9iamVjdC5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgJiYgIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcclxuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKSgnZGl2JyksICdhJywge2dldDogZnVuY3Rpb24oKXsgcmV0dXJuIDc7IH19KS5hICE9IDc7XHJcbn0pO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzXG4gKiovIiwiLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAnYScsIHtnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiA3OyB9fSkuYSAhPSA3O1xufSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fZGVzY3JpcHRvcnMuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGV4ZWMpe1xuICB0cnkge1xuICAgIHJldHVybiAhIWV4ZWMoKTtcbiAgfSBjYXRjaChlKXtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL19mYWlscy5qc1xuICoqLyIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgZG9jdW1lbnQgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5kb2N1bWVudFxuICAvLyBpbiBvbGQgSUUgdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCdcbiAgLCBpcyA9IGlzT2JqZWN0KGRvY3VtZW50KSAmJiBpc09iamVjdChkb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL19kb20tY3JlYXRlLmpzXG4gKiovIiwiLy8gNy4xLjEgVG9QcmltaXRpdmUoaW5wdXQgWywgUHJlZmVycmVkVHlwZV0pXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbi8vIGluc3RlYWQgb2YgdGhlIEVTNiBzcGVjIHZlcnNpb24sIHdlIGRpZG4ndCBpbXBsZW1lbnQgQEB0b1ByaW1pdGl2ZSBjYXNlXG4vLyBhbmQgdGhlIHNlY29uZCBhcmd1bWVudCAtIGZsYWcgLSBwcmVmZXJyZWQgdHlwZSBpcyBhIHN0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwgUyl7XG4gIGlmKCFpc09iamVjdChpdCkpcmV0dXJuIGl0O1xuICB2YXIgZm4sIHZhbDtcbiAgaWYoUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSlyZXR1cm4gdmFsO1xuICBpZih0eXBlb2YgKGZuID0gaXQudmFsdWVPZikgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIGlmKCFTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZVwiKTtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fdG8tcHJpbWl0aXZlLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihiaXRtYXAsIHZhbHVlKXtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlICA6ICEoYml0bWFwICYgMSksXG4gICAgY29uZmlndXJhYmxlOiAhKGJpdG1hcCAmIDIpLFxuICAgIHdyaXRhYmxlICAgIDogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZSAgICAgICA6IHZhbHVlXG4gIH07XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX3Byb3BlcnR5LWRlc2MuanNcbiAqKi8iLCJ2YXIgZ2xvYmFsICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBoaWRlICAgICAgPSByZXF1aXJlKCcuL19oaWRlJylcbiAgLCBoYXMgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIFNSQyAgICAgICA9IHJlcXVpcmUoJy4vX3VpZCcpKCdzcmMnKVxuICAsIFRPX1NUUklORyA9ICd0b1N0cmluZydcbiAgLCAkdG9TdHJpbmcgPSBGdW5jdGlvbltUT19TVFJJTkddXG4gICwgVFBMICAgICAgID0gKCcnICsgJHRvU3RyaW5nKS5zcGxpdChUT19TVFJJTkcpO1xuXG5yZXF1aXJlKCcuL19jb3JlJykuaW5zcGVjdFNvdXJjZSA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuICR0b1N0cmluZy5jYWxsKGl0KTtcbn07XG5cbihtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKE8sIGtleSwgdmFsLCBzYWZlKXtcbiAgdmFyIGlzRnVuY3Rpb24gPSB0eXBlb2YgdmFsID09ICdmdW5jdGlvbic7XG4gIGlmKGlzRnVuY3Rpb24paGFzKHZhbCwgJ25hbWUnKSB8fCBoaWRlKHZhbCwgJ25hbWUnLCBrZXkpO1xuICBpZihPW2tleV0gPT09IHZhbClyZXR1cm47XG4gIGlmKGlzRnVuY3Rpb24paGFzKHZhbCwgU1JDKSB8fCBoaWRlKHZhbCwgU1JDLCBPW2tleV0gPyAnJyArIE9ba2V5XSA6IFRQTC5qb2luKFN0cmluZyhrZXkpKSk7XG4gIGlmKE8gPT09IGdsb2JhbCl7XG4gICAgT1trZXldID0gdmFsO1xuICB9IGVsc2Uge1xuICAgIGlmKCFzYWZlKXtcbiAgICAgIGRlbGV0ZSBPW2tleV07XG4gICAgICBoaWRlKE8sIGtleSwgdmFsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYoT1trZXldKU9ba2V5XSA9IHZhbDtcbiAgICAgIGVsc2UgaGlkZShPLCBrZXksIHZhbCk7XG4gICAgfVxuICB9XG4vLyBhZGQgZmFrZSBGdW5jdGlvbiN0b1N0cmluZyBmb3IgY29ycmVjdCB3b3JrIHdyYXBwZWQgbWV0aG9kcyAvIGNvbnN0cnVjdG9ycyB3aXRoIG1ldGhvZHMgbGlrZSBMb0Rhc2ggaXNOYXRpdmVcbn0pKEZ1bmN0aW9uLnByb3RvdHlwZSwgVE9fU1RSSU5HLCBmdW5jdGlvbiB0b1N0cmluZygpe1xuICByZXR1cm4gdHlwZW9mIHRoaXMgPT0gJ2Z1bmN0aW9uJyAmJiB0aGlzW1NSQ10gfHwgJHRvU3RyaW5nLmNhbGwodGhpcyk7XG59KTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL19yZWRlZmluZS5qc1xuICoqLyIsInZhciBoYXNPd25Qcm9wZXJ0eSA9IHt9Lmhhc093blByb3BlcnR5O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwga2V5KXtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoaXQsIGtleSk7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX2hhcy5qc1xuICoqLyIsInZhciBpZCA9IDBcbiAgLCBweCA9IE1hdGgucmFuZG9tKCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIHJldHVybiAnU3ltYm9sKCcuY29uY2F0KGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXksICcpXycsICgrK2lkICsgcHgpLnRvU3RyaW5nKDM2KSk7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX3VpZC5qc1xuICoqLyIsIi8vIG9wdGlvbmFsIC8gc2ltcGxlIGNvbnRleHQgYmluZGluZ1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZm4sIHRoYXQsIGxlbmd0aCl7XG4gIGFGdW5jdGlvbihmbik7XG4gIGlmKHRoYXQgPT09IHVuZGVmaW5lZClyZXR1cm4gZm47XG4gIHN3aXRjaChsZW5ndGgpe1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uKGEpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSk7XG4gICAgfTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbihhLCBiKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24oYSwgYiwgYyl7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiLCBjKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbigvKiAuLi5hcmdzICovKXtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fY3R4LmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKHR5cGVvZiBpdCAhPSAnZnVuY3Rpb24nKXRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGEgZnVuY3Rpb24hJyk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fYS1mdW5jdGlvbi5qc1xuICoqLyIsIid1c2Ugc3RyaWN0Jztcbi8vIDE5LjEuMi4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UsIC4uLilcbnZhciBnZXRLZXlzICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJylcbiAgLCBnT1BTICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BzJylcbiAgLCBwSUUgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1waWUnKVxuICAsIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcbiAgLCBJT2JqZWN0ICA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKVxuICAsICRhc3NpZ24gID0gT2JqZWN0LmFzc2lnbjtcblxuLy8gc2hvdWxkIHdvcmsgd2l0aCBzeW1ib2xzIGFuZCBzaG91bGQgaGF2ZSBkZXRlcm1pbmlzdGljIHByb3BlcnR5IG9yZGVyIChWOCBidWcpXG5tb2R1bGUuZXhwb3J0cyA9ICEkYXNzaWduIHx8IHJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgdmFyIEEgPSB7fVxuICAgICwgQiA9IHt9XG4gICAgLCBTID0gU3ltYm9sKClcbiAgICAsIEsgPSAnYWJjZGVmZ2hpamtsbW5vcHFyc3QnO1xuICBBW1NdID0gNztcbiAgSy5zcGxpdCgnJykuZm9yRWFjaChmdW5jdGlvbihrKXsgQltrXSA9IGs7IH0pO1xuICByZXR1cm4gJGFzc2lnbih7fSwgQSlbU10gIT0gNyB8fCBPYmplY3Qua2V5cygkYXNzaWduKHt9LCBCKSkuam9pbignJykgIT0gSztcbn0pID8gZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgc291cmNlKXsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICB2YXIgVCAgICAgPSB0b09iamVjdCh0YXJnZXQpXG4gICAgLCBhTGVuICA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgICAsIGluZGV4ID0gMVxuICAgICwgZ2V0U3ltYm9scyA9IGdPUFMuZlxuICAgICwgaXNFbnVtICAgICA9IHBJRS5mO1xuICB3aGlsZShhTGVuID4gaW5kZXgpe1xuICAgIHZhciBTICAgICAgPSBJT2JqZWN0KGFyZ3VtZW50c1tpbmRleCsrXSlcbiAgICAgICwga2V5cyAgID0gZ2V0U3ltYm9scyA/IGdldEtleXMoUykuY29uY2F0KGdldFN5bWJvbHMoUykpIDogZ2V0S2V5cyhTKVxuICAgICAgLCBsZW5ndGggPSBrZXlzLmxlbmd0aFxuICAgICAgLCBqICAgICAgPSAwXG4gICAgICAsIGtleTtcbiAgICB3aGlsZShsZW5ndGggPiBqKWlmKGlzRW51bS5jYWxsKFMsIGtleSA9IGtleXNbaisrXSkpVFtrZXldID0gU1trZXldO1xuICB9IHJldHVybiBUO1xufSA6ICRhc3NpZ247XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWFzc2lnbi5qc1xuICoqLyIsIi8vIDE5LjEuMi4xNCAvIDE1LjIuMy4xNCBPYmplY3Qua2V5cyhPKVxyXG52YXIgJGtleXMgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cy1pbnRlcm5hbCcpXHJcbiAgLCBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24ga2V5cyhPKXtcclxuICByZXR1cm4gJGtleXMoTywgZW51bUJ1Z0tleXMpO1xyXG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1rZXlzLmpzXG4gKiovIiwidmFyIGhhcyAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXHJcbiAgLCB0b0lPYmplY3QgICAgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcclxuICAsIGFycmF5SW5kZXhPZiA9IHJlcXVpcmUoJy4vX2FycmF5LWluY2x1ZGVzJykoZmFsc2UpXHJcbiAgLCBJRV9QUk9UTyAgICAgPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iamVjdCwgbmFtZXMpe1xyXG4gIHZhciBPICAgICAgPSB0b0lPYmplY3Qob2JqZWN0KVxyXG4gICAgLCBpICAgICAgPSAwXHJcbiAgICAsIHJlc3VsdCA9IFtdXHJcbiAgICAsIGtleTtcclxuICBmb3Ioa2V5IGluIE8paWYoa2V5ICE9IElFX1BST1RPKWhhcyhPLCBrZXkpICYmIHJlc3VsdC5wdXNoKGtleSk7XHJcbiAgLy8gRG9uJ3QgZW51bSBidWcgJiBoaWRkZW4ga2V5c1xyXG4gIHdoaWxlKG5hbWVzLmxlbmd0aCA+IGkpaWYoaGFzKE8sIGtleSA9IG5hbWVzW2krK10pKXtcclxuICAgIH5hcnJheUluZGV4T2YocmVzdWx0LCBrZXkpIHx8IHJlc3VsdC5wdXNoKGtleSk7XHJcbiAgfVxyXG4gIHJldHVybiByZXN1bHQ7XHJcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWtleXMtaW50ZXJuYWwuanNcbiAqKi8iLCIvLyB0byBpbmRleGVkIG9iamVjdCwgdG9PYmplY3Qgd2l0aCBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIHN0cmluZ3NcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi9faW9iamVjdCcpXG4gICwgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gSU9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX3RvLWlvYmplY3QuanNcbiAqKi8iLCIvLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKSA/IE9iamVjdCA6IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGNvZihpdCkgPT0gJ1N0cmluZycgPyBpdC5zcGxpdCgnJykgOiBPYmplY3QoaXQpO1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL19pb2JqZWN0LmpzXG4gKiovIiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChpdCkuc2xpY2UoOCwgLTEpO1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL19jb2YuanNcbiAqKi8iLCIvLyA3LjIuMSBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKGl0ID09IHVuZGVmaW5lZCl0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiAgXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fZGVmaW5lZC5qc1xuICoqLyIsIi8vIGZhbHNlIC0+IEFycmF5I2luZGV4T2Zcbi8vIHRydWUgIC0+IEFycmF5I2luY2x1ZGVzXG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXG4gICwgdG9MZW5ndGggID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJylcbiAgLCB0b0luZGV4ICAgPSByZXF1aXJlKCcuL190by1pbmRleCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihJU19JTkNMVURFUyl7XG4gIHJldHVybiBmdW5jdGlvbigkdGhpcywgZWwsIGZyb21JbmRleCl7XG4gICAgdmFyIE8gICAgICA9IHRvSU9iamVjdCgkdGhpcylcbiAgICAgICwgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpXG4gICAgICAsIGluZGV4ICA9IHRvSW5kZXgoZnJvbUluZGV4LCBsZW5ndGgpXG4gICAgICAsIHZhbHVlO1xuICAgIC8vIEFycmF5I2luY2x1ZGVzIHVzZXMgU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG1cbiAgICBpZihJU19JTkNMVURFUyAmJiBlbCAhPSBlbCl3aGlsZShsZW5ndGggPiBpbmRleCl7XG4gICAgICB2YWx1ZSA9IE9baW5kZXgrK107XG4gICAgICBpZih2YWx1ZSAhPSB2YWx1ZSlyZXR1cm4gdHJ1ZTtcbiAgICAvLyBBcnJheSN0b0luZGV4IGlnbm9yZXMgaG9sZXMsIEFycmF5I2luY2x1ZGVzIC0gbm90XG4gICAgfSBlbHNlIGZvcig7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspaWYoSVNfSU5DTFVERVMgfHwgaW5kZXggaW4gTyl7XG4gICAgICBpZihPW2luZGV4XSA9PT0gZWwpcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4O1xuICAgIH0gcmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgfTtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fYXJyYXktaW5jbHVkZXMuanNcbiAqKi8iLCIvLyA3LjEuMTUgVG9MZW5ndGhcbnZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJylcbiAgLCBtaW4gICAgICAgPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXQgPiAwID8gbWluKHRvSW50ZWdlcihpdCksIDB4MWZmZmZmZmZmZmZmZmYpIDogMDsgLy8gcG93KDIsIDUzKSAtIDEgPT0gOTAwNzE5OTI1NDc0MDk5MVxufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL190by1sZW5ndGguanNcbiAqKi8iLCIvLyA3LjEuNCBUb0ludGVnZXJcbnZhciBjZWlsICA9IE1hdGguY2VpbFxuICAsIGZsb29yID0gTWF0aC5mbG9vcjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXNOYU4oaXQgPSAraXQpID8gMCA6IChpdCA+IDAgPyBmbG9vciA6IGNlaWwpKGl0KTtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fdG8taW50ZWdlci5qc1xuICoqLyIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJylcbiAgLCBtYXggICAgICAgPSBNYXRoLm1heFxuICAsIG1pbiAgICAgICA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpbmRleCwgbGVuZ3RoKXtcbiAgaW5kZXggPSB0b0ludGVnZXIoaW5kZXgpO1xuICByZXR1cm4gaW5kZXggPCAwID8gbWF4KGluZGV4ICsgbGVuZ3RoLCAwKSA6IG1pbihpbmRleCwgbGVuZ3RoKTtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fdG8taW5kZXguanNcbiAqKi8iLCJ2YXIgc2hhcmVkID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ2tleXMnKVxyXG4gICwgdWlkICAgID0gcmVxdWlyZSgnLi9fdWlkJyk7XHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oa2V5KXtcclxuICByZXR1cm4gc2hhcmVkW2tleV0gfHwgKHNoYXJlZFtrZXldID0gdWlkKGtleSkpO1xyXG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX3NoYXJlZC1rZXkuanNcbiAqKi8iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBTSEFSRUQgPSAnX19jb3JlLWpzX3NoYXJlZF9fJ1xuICAsIHN0b3JlICA9IGdsb2JhbFtTSEFSRURdIHx8IChnbG9iYWxbU0hBUkVEXSA9IHt9KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oa2V5KXtcbiAgcmV0dXJuIHN0b3JlW2tleV0gfHwgKHN0b3JlW2tleV0gPSB7fSk7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX3NoYXJlZC5qc1xuICoqLyIsIi8vIElFIDgtIGRvbid0IGVudW0gYnVnIGtleXNcclxubW9kdWxlLmV4cG9ydHMgPSAoXHJcbiAgJ2NvbnN0cnVjdG9yLGhhc093blByb3BlcnR5LGlzUHJvdG90eXBlT2YscHJvcGVydHlJc0VudW1lcmFibGUsdG9Mb2NhbGVTdHJpbmcsdG9TdHJpbmcsdmFsdWVPZidcclxuKS5zcGxpdCgnLCcpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX2VudW0tYnVnLWtleXMuanNcbiAqKi8iLCJleHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1nb3BzLmpzXG4gKiovIiwiZXhwb3J0cy5mID0ge30ucHJvcGVydHlJc0VudW1lcmFibGU7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LXBpZS5qc1xuICoqLyIsIi8vIDcuMS4xMyBUb09iamVjdChhcmd1bWVudClcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL190by1vYmplY3QuanNcbiAqKi8iLCIvLyBmaXggUHJvbWlzZSBQcm9ibGVtIG9uIEpTQ29udGV4dCBvZiBpT1M3fjhcbi8vIEBzZWUgaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTEzNTg2NlxuZ2xvYmFsLlByb21pc2UgPSBudWxsXG5yZXF1aXJlKCdjb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC50by1zdHJpbmcnKVxucmVxdWlyZSgnY29yZS1qcy9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKVxucmVxdWlyZSgnY29yZS1qcy9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKVxucmVxdWlyZSgnY29yZS1qcy9tb2R1bGVzL2VzNi5wcm9taXNlJylcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3BvbHlmaWxsL3Byb21pc2UuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG4vLyAxOS4xLjMuNiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nKClcbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi9fY2xhc3NvZicpXG4gICwgdGVzdCAgICA9IHt9O1xudGVzdFtyZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKV0gPSAneic7XG5pZih0ZXN0ICsgJycgIT0gJ1tvYmplY3Qgel0nKXtcbiAgcmVxdWlyZSgnLi9fcmVkZWZpbmUnKShPYmplY3QucHJvdG90eXBlLCAndG9TdHJpbmcnLCBmdW5jdGlvbiB0b1N0cmluZygpe1xuICAgIHJldHVybiAnW29iamVjdCAnICsgY2xhc3NvZih0aGlzKSArICddJztcbiAgfSwgdHJ1ZSk7XG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LnRvLXN0cmluZy5qc1xuICoqLyIsIi8vIGdldHRpbmcgdGFnIGZyb20gMTkuMS4zLjYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZygpXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJylcbiAgLCBUQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKVxuICAvLyBFUzMgd3JvbmcgaGVyZVxuICAsIEFSRyA9IGNvZihmdW5jdGlvbigpeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpID09ICdBcmd1bWVudHMnO1xuXG4vLyBmYWxsYmFjayBmb3IgSUUxMSBTY3JpcHQgQWNjZXNzIERlbmllZCBlcnJvclxudmFyIHRyeUdldCA9IGZ1bmN0aW9uKGl0LCBrZXkpe1xuICB0cnkge1xuICAgIHJldHVybiBpdFtrZXldO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgdmFyIE8sIFQsIEI7XG4gIHJldHVybiBpdCA9PT0gdW5kZWZpbmVkID8gJ1VuZGVmaW5lZCcgOiBpdCA9PT0gbnVsbCA/ICdOdWxsJ1xuICAgIC8vIEBAdG9TdHJpbmdUYWcgY2FzZVxuICAgIDogdHlwZW9mIChUID0gdHJ5R2V0KE8gPSBPYmplY3QoaXQpLCBUQUcpKSA9PSAnc3RyaW5nJyA/IFRcbiAgICAvLyBidWlsdGluVGFnIGNhc2VcbiAgICA6IEFSRyA/IGNvZihPKVxuICAgIC8vIEVTMyBhcmd1bWVudHMgZmFsbGJhY2tcbiAgICA6IChCID0gY29mKE8pKSA9PSAnT2JqZWN0JyAmJiB0eXBlb2YgTy5jYWxsZWUgPT0gJ2Z1bmN0aW9uJyA/ICdBcmd1bWVudHMnIDogQjtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fY2xhc3NvZi5qc1xuICoqLyIsInZhciBzdG9yZSAgICAgID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ3drcycpXG4gICwgdWlkICAgICAgICA9IHJlcXVpcmUoJy4vX3VpZCcpXG4gICwgU3ltYm9sICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLlN5bWJvbFxuICAsIFVTRV9TWU1CT0wgPSB0eXBlb2YgU3ltYm9sID09ICdmdW5jdGlvbic7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG5hbWUpe1xuICByZXR1cm4gc3RvcmVbbmFtZV0gfHwgKHN0b3JlW25hbWVdID1cbiAgICBVU0VfU1lNQk9MICYmIFN5bWJvbFtuYW1lXSB8fCAoVVNFX1NZTUJPTCA/IFN5bWJvbCA6IHVpZCkoJ1N5bWJvbC4nICsgbmFtZSkpO1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL193a3MuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgJGF0ICA9IHJlcXVpcmUoJy4vX3N0cmluZy1hdCcpKHRydWUpO1xuXG4vLyAyMS4xLjMuMjcgU3RyaW5nLnByb3RvdHlwZVtAQGl0ZXJhdG9yXSgpXG5yZXF1aXJlKCcuL19pdGVyLWRlZmluZScpKFN0cmluZywgJ1N0cmluZycsIGZ1bmN0aW9uKGl0ZXJhdGVkKXtcbiAgdGhpcy5fdCA9IFN0cmluZyhpdGVyYXRlZCk7IC8vIHRhcmdldFxuICB0aGlzLl9pID0gMDsgICAgICAgICAgICAgICAgLy8gbmV4dCBpbmRleFxuLy8gMjEuMS41LjIuMSAlU3RyaW5nSXRlcmF0b3JQcm90b3R5cGUlLm5leHQoKVxufSwgZnVuY3Rpb24oKXtcbiAgdmFyIE8gICAgID0gdGhpcy5fdFxuICAgICwgaW5kZXggPSB0aGlzLl9pXG4gICAgLCBwb2ludDtcbiAgaWYoaW5kZXggPj0gTy5sZW5ndGgpcmV0dXJuIHt2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlfTtcbiAgcG9pbnQgPSAkYXQoTywgaW5kZXgpO1xuICB0aGlzLl9pICs9IHBvaW50Lmxlbmd0aDtcbiAgcmV0dXJuIHt2YWx1ZTogcG9pbnQsIGRvbmU6IGZhbHNlfTtcbn0pO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvci5qc1xuICoqLyIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJylcbiAgLCBkZWZpbmVkICAgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG4vLyB0cnVlICAtPiBTdHJpbmcjYXRcbi8vIGZhbHNlIC0+IFN0cmluZyNjb2RlUG9pbnRBdFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihUT19TVFJJTkcpe1xuICByZXR1cm4gZnVuY3Rpb24odGhhdCwgcG9zKXtcbiAgICB2YXIgcyA9IFN0cmluZyhkZWZpbmVkKHRoYXQpKVxuICAgICAgLCBpID0gdG9JbnRlZ2VyKHBvcylcbiAgICAgICwgbCA9IHMubGVuZ3RoXG4gICAgICAsIGEsIGI7XG4gICAgaWYoaSA8IDAgfHwgaSA+PSBsKXJldHVybiBUT19TVFJJTkcgPyAnJyA6IHVuZGVmaW5lZDtcbiAgICBhID0gcy5jaGFyQ29kZUF0KGkpO1xuICAgIHJldHVybiBhIDwgMHhkODAwIHx8IGEgPiAweGRiZmYgfHwgaSArIDEgPT09IGwgfHwgKGIgPSBzLmNoYXJDb2RlQXQoaSArIDEpKSA8IDB4ZGMwMCB8fCBiID4gMHhkZmZmXG4gICAgICA/IFRPX1NUUklORyA/IHMuY2hhckF0KGkpIDogYVxuICAgICAgOiBUT19TVFJJTkcgPyBzLnNsaWNlKGksIGkgKyAyKSA6IChhIC0gMHhkODAwIDw8IDEwKSArIChiIC0gMHhkYzAwKSArIDB4MTAwMDA7XG4gIH07XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX3N0cmluZy1hdC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBMSUJSQVJZICAgICAgICA9IHJlcXVpcmUoJy4vX2xpYnJhcnknKVxuICAsICRleHBvcnQgICAgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCByZWRlZmluZSAgICAgICA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJylcbiAgLCBoaWRlICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hpZGUnKVxuICAsIGhhcyAgICAgICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCBJdGVyYXRvcnMgICAgICA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpXG4gICwgJGl0ZXJDcmVhdGUgICAgPSByZXF1aXJlKCcuL19pdGVyLWNyZWF0ZScpXG4gICwgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpXG4gICwgZ2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuL19vYmplY3QtZ3BvJylcbiAgLCBJVEVSQVRPUiAgICAgICA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpXG4gICwgQlVHR1kgICAgICAgICAgPSAhKFtdLmtleXMgJiYgJ25leHQnIGluIFtdLmtleXMoKSkgLy8gU2FmYXJpIGhhcyBidWdneSBpdGVyYXRvcnMgdy9vIGBuZXh0YFxuICAsIEZGX0lURVJBVE9SICAgID0gJ0BAaXRlcmF0b3InXG4gICwgS0VZUyAgICAgICAgICAgPSAna2V5cydcbiAgLCBWQUxVRVMgICAgICAgICA9ICd2YWx1ZXMnO1xuXG52YXIgcmV0dXJuVGhpcyA9IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzOyB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKEJhc2UsIE5BTUUsIENvbnN0cnVjdG9yLCBuZXh0LCBERUZBVUxULCBJU19TRVQsIEZPUkNFRCl7XG4gICRpdGVyQ3JlYXRlKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KTtcbiAgdmFyIGdldE1ldGhvZCA9IGZ1bmN0aW9uKGtpbmQpe1xuICAgIGlmKCFCVUdHWSAmJiBraW5kIGluIHByb3RvKXJldHVybiBwcm90b1traW5kXTtcbiAgICBzd2l0Y2goa2luZCl7XG4gICAgICBjYXNlIEtFWVM6IHJldHVybiBmdW5jdGlvbiBrZXlzKCl7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gICAgICBjYXNlIFZBTFVFUzogcmV0dXJuIGZ1bmN0aW9uIHZhbHVlcygpeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICAgIH0gcmV0dXJuIGZ1bmN0aW9uIGVudHJpZXMoKXsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgfTtcbiAgdmFyIFRBRyAgICAgICAgPSBOQU1FICsgJyBJdGVyYXRvcidcbiAgICAsIERFRl9WQUxVRVMgPSBERUZBVUxUID09IFZBTFVFU1xuICAgICwgVkFMVUVTX0JVRyA9IGZhbHNlXG4gICAgLCBwcm90byAgICAgID0gQmFzZS5wcm90b3R5cGVcbiAgICAsICRuYXRpdmUgICAgPSBwcm90b1tJVEVSQVRPUl0gfHwgcHJvdG9bRkZfSVRFUkFUT1JdIHx8IERFRkFVTFQgJiYgcHJvdG9bREVGQVVMVF1cbiAgICAsICRkZWZhdWx0ICAgPSAkbmF0aXZlIHx8IGdldE1ldGhvZChERUZBVUxUKVxuICAgICwgJGVudHJpZXMgICA9IERFRkFVTFQgPyAhREVGX1ZBTFVFUyA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKCdlbnRyaWVzJykgOiB1bmRlZmluZWRcbiAgICAsICRhbnlOYXRpdmUgPSBOQU1FID09ICdBcnJheScgPyBwcm90by5lbnRyaWVzIHx8ICRuYXRpdmUgOiAkbmF0aXZlXG4gICAgLCBtZXRob2RzLCBrZXksIEl0ZXJhdG9yUHJvdG90eXBlO1xuICAvLyBGaXggbmF0aXZlXG4gIGlmKCRhbnlOYXRpdmUpe1xuICAgIEl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG90eXBlT2YoJGFueU5hdGl2ZS5jYWxsKG5ldyBCYXNlKSk7XG4gICAgaWYoSXRlcmF0b3JQcm90b3R5cGUgIT09IE9iamVjdC5wcm90b3R5cGUpe1xuICAgICAgLy8gU2V0IEBAdG9TdHJpbmdUYWcgdG8gbmF0aXZlIGl0ZXJhdG9yc1xuICAgICAgc2V0VG9TdHJpbmdUYWcoSXRlcmF0b3JQcm90b3R5cGUsIFRBRywgdHJ1ZSk7XG4gICAgICAvLyBmaXggZm9yIHNvbWUgb2xkIGVuZ2luZXNcbiAgICAgIGlmKCFMSUJSQVJZICYmICFoYXMoSXRlcmF0b3JQcm90b3R5cGUsIElURVJBVE9SKSloaWRlKEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUiwgcmV0dXJuVGhpcyk7XG4gICAgfVxuICB9XG4gIC8vIGZpeCBBcnJheSN7dmFsdWVzLCBAQGl0ZXJhdG9yfS5uYW1lIGluIFY4IC8gRkZcbiAgaWYoREVGX1ZBTFVFUyAmJiAkbmF0aXZlICYmICRuYXRpdmUubmFtZSAhPT0gVkFMVUVTKXtcbiAgICBWQUxVRVNfQlVHID0gdHJ1ZTtcbiAgICAkZGVmYXVsdCA9IGZ1bmN0aW9uIHZhbHVlcygpeyByZXR1cm4gJG5hdGl2ZS5jYWxsKHRoaXMpOyB9O1xuICB9XG4gIC8vIERlZmluZSBpdGVyYXRvclxuICBpZigoIUxJQlJBUlkgfHwgRk9SQ0VEKSAmJiAoQlVHR1kgfHwgVkFMVUVTX0JVRyB8fCAhcHJvdG9bSVRFUkFUT1JdKSl7XG4gICAgaGlkZShwcm90bywgSVRFUkFUT1IsICRkZWZhdWx0KTtcbiAgfVxuICAvLyBQbHVnIGZvciBsaWJyYXJ5XG4gIEl0ZXJhdG9yc1tOQU1FXSA9ICRkZWZhdWx0O1xuICBJdGVyYXRvcnNbVEFHXSAgPSByZXR1cm5UaGlzO1xuICBpZihERUZBVUxUKXtcbiAgICBtZXRob2RzID0ge1xuICAgICAgdmFsdWVzOiAgREVGX1ZBTFVFUyA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKFZBTFVFUyksXG4gICAgICBrZXlzOiAgICBJU19TRVQgICAgID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoS0VZUyksXG4gICAgICBlbnRyaWVzOiAkZW50cmllc1xuICAgIH07XG4gICAgaWYoRk9SQ0VEKWZvcihrZXkgaW4gbWV0aG9kcyl7XG4gICAgICBpZighKGtleSBpbiBwcm90bykpcmVkZWZpbmUocHJvdG8sIGtleSwgbWV0aG9kc1trZXldKTtcbiAgICB9IGVsc2UgJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiAoQlVHR1kgfHwgVkFMVUVTX0JVRyksIE5BTUUsIG1ldGhvZHMpO1xuICB9XG4gIHJldHVybiBtZXRob2RzO1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL19pdGVyLWRlZmluZS5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZmFsc2U7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fbGlicmFyeS5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0ge307XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9faXRlcmF0b3JzLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGNyZWF0ZSAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpXG4gICwgZGVzY3JpcHRvciAgICAgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJylcbiAgLCBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJylcbiAgLCBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuXG4vLyAyNS4xLjIuMS4xICVJdGVyYXRvclByb3RvdHlwZSVbQEBpdGVyYXRvcl0oKVxucmVxdWlyZSgnLi9faGlkZScpKEl0ZXJhdG9yUHJvdG90eXBlLCByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKSwgZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXM7IH0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KXtcbiAgQ29uc3RydWN0b3IucHJvdG90eXBlID0gY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlLCB7bmV4dDogZGVzY3JpcHRvcigxLCBuZXh0KX0pO1xuICBzZXRUb1N0cmluZ1RhZyhDb25zdHJ1Y3RvciwgTkFNRSArICcgSXRlcmF0b3InKTtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9faXRlci1jcmVhdGUuanNcbiAqKi8iLCIvLyAxOS4xLjIuMiAvIDE1LjIuMy41IE9iamVjdC5jcmVhdGUoTyBbLCBQcm9wZXJ0aWVzXSlcclxudmFyIGFuT2JqZWN0ICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcclxuICAsIGRQcyAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwcycpXHJcbiAgLCBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKVxyXG4gICwgSUVfUFJPVE8gICAgPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJylcclxuICAsIEVtcHR5ICAgICAgID0gZnVuY3Rpb24oKXsgLyogZW1wdHkgKi8gfVxyXG4gICwgUFJPVE9UWVBFICAgPSAncHJvdG90eXBlJztcclxuXHJcbi8vIENyZWF0ZSBvYmplY3Qgd2l0aCBmYWtlIGBudWxsYCBwcm90b3R5cGU6IHVzZSBpZnJhbWUgT2JqZWN0IHdpdGggY2xlYXJlZCBwcm90b3R5cGVcclxudmFyIGNyZWF0ZURpY3QgPSBmdW5jdGlvbigpe1xyXG4gIC8vIFRocmFzaCwgd2FzdGUgYW5kIHNvZG9teTogSUUgR0MgYnVnXHJcbiAgdmFyIGlmcmFtZSA9IHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKSgnaWZyYW1lJylcclxuICAgICwgaSAgICAgID0gZW51bUJ1Z0tleXMubGVuZ3RoXHJcbiAgICAsIGd0ICAgICA9ICc+J1xyXG4gICAgLCBpZnJhbWVEb2N1bWVudDtcclxuICBpZnJhbWUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICByZXF1aXJlKCcuL19odG1sJykuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcclxuICBpZnJhbWUuc3JjID0gJ2phdmFzY3JpcHQ6JzsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1zY3JpcHQtdXJsXHJcbiAgLy8gY3JlYXRlRGljdCA9IGlmcmFtZS5jb250ZW50V2luZG93Lk9iamVjdDtcclxuICAvLyBodG1sLnJlbW92ZUNoaWxkKGlmcmFtZSk7XHJcbiAgaWZyYW1lRG9jdW1lbnQgPSBpZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudDtcclxuICBpZnJhbWVEb2N1bWVudC5vcGVuKCk7XHJcbiAgaWZyYW1lRG9jdW1lbnQud3JpdGUoJzxzY3JpcHQ+ZG9jdW1lbnQuRj1PYmplY3Q8L3NjcmlwdCcgKyBndCk7XHJcbiAgaWZyYW1lRG9jdW1lbnQuY2xvc2UoKTtcclxuICBjcmVhdGVEaWN0ID0gaWZyYW1lRG9jdW1lbnQuRjtcclxuICB3aGlsZShpLS0pZGVsZXRlIGNyZWF0ZURpY3RbUFJPVE9UWVBFXVtlbnVtQnVnS2V5c1tpXV07XHJcbiAgcmV0dXJuIGNyZWF0ZURpY3QoKTtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmNyZWF0ZSB8fCBmdW5jdGlvbiBjcmVhdGUoTywgUHJvcGVydGllcyl7XHJcbiAgdmFyIHJlc3VsdDtcclxuICBpZihPICE9PSBudWxsKXtcclxuICAgIEVtcHR5W1BST1RPVFlQRV0gPSBhbk9iamVjdChPKTtcclxuICAgIHJlc3VsdCA9IG5ldyBFbXB0eTtcclxuICAgIEVtcHR5W1BST1RPVFlQRV0gPSBudWxsO1xyXG4gICAgLy8gYWRkIFwiX19wcm90b19fXCIgZm9yIE9iamVjdC5nZXRQcm90b3R5cGVPZiBwb2x5ZmlsbFxyXG4gICAgcmVzdWx0W0lFX1BST1RPXSA9IE87XHJcbiAgfSBlbHNlIHJlc3VsdCA9IGNyZWF0ZURpY3QoKTtcclxuICByZXR1cm4gUHJvcGVydGllcyA9PT0gdW5kZWZpbmVkID8gcmVzdWx0IDogZFBzKHJlc3VsdCwgUHJvcGVydGllcyk7XHJcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWNyZWF0ZS5qc1xuICoqLyIsInZhciBkUCAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpXHJcbiAgLCBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXHJcbiAgLCBnZXRLZXlzICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcyl7XHJcbiAgYW5PYmplY3QoTyk7XHJcbiAgdmFyIGtleXMgICA9IGdldEtleXMoUHJvcGVydGllcylcclxuICAgICwgbGVuZ3RoID0ga2V5cy5sZW5ndGhcclxuICAgICwgaSA9IDBcclxuICAgICwgUDtcclxuICB3aGlsZShsZW5ndGggPiBpKWRQLmYoTywgUCA9IGtleXNbaSsrXSwgUHJvcGVydGllc1tQXSk7XHJcbiAgcmV0dXJuIE87XHJcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWRwcy5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuZG9jdW1lbnQgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX2h0bWwuanNcbiAqKi8iLCJ2YXIgZGVmID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZlxuICAsIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgVEFHID0gcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIHRhZywgc3RhdCl7XG4gIGlmKGl0ICYmICFoYXMoaXQgPSBzdGF0ID8gaXQgOiBpdC5wcm90b3R5cGUsIFRBRykpZGVmKGl0LCBUQUcsIHtjb25maWd1cmFibGU6IHRydWUsIHZhbHVlOiB0YWd9KTtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fc2V0LXRvLXN0cmluZy10YWcuanNcbiAqKi8iLCIvLyAxOS4xLjIuOSAvIDE1LjIuMy4yIE9iamVjdC5nZXRQcm90b3R5cGVPZihPKVxyXG52YXIgaGFzICAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxyXG4gICwgdG9PYmplY3QgICAgPSByZXF1aXJlKCcuL190by1vYmplY3QnKVxyXG4gICwgSUVfUFJPVE8gICAgPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJylcclxuICAsIE9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmdldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uKE8pe1xyXG4gIE8gPSB0b09iamVjdChPKTtcclxuICBpZihoYXMoTywgSUVfUFJPVE8pKXJldHVybiBPW0lFX1BST1RPXTtcclxuICBpZih0eXBlb2YgTy5jb25zdHJ1Y3RvciA9PSAnZnVuY3Rpb24nICYmIE8gaW5zdGFuY2VvZiBPLmNvbnN0cnVjdG9yKXtcclxuICAgIHJldHVybiBPLmNvbnN0cnVjdG9yLnByb3RvdHlwZTtcclxuICB9IHJldHVybiBPIGluc3RhbmNlb2YgT2JqZWN0ID8gT2JqZWN0UHJvdG8gOiBudWxsO1xyXG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1ncG8uanNcbiAqKi8iLCJ2YXIgJGl0ZXJhdG9ycyAgICA9IHJlcXVpcmUoJy4vZXM2LmFycmF5Lml0ZXJhdG9yJylcbiAgLCByZWRlZmluZSAgICAgID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUnKVxuICAsIGdsb2JhbCAgICAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIGhpZGUgICAgICAgICAgPSByZXF1aXJlKCcuL19oaWRlJylcbiAgLCBJdGVyYXRvcnMgICAgID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJylcbiAgLCB3a3MgICAgICAgICAgID0gcmVxdWlyZSgnLi9fd2tzJylcbiAgLCBJVEVSQVRPUiAgICAgID0gd2tzKCdpdGVyYXRvcicpXG4gICwgVE9fU1RSSU5HX1RBRyA9IHdrcygndG9TdHJpbmdUYWcnKVxuICAsIEFycmF5VmFsdWVzICAgPSBJdGVyYXRvcnMuQXJyYXk7XG5cbmZvcih2YXIgY29sbGVjdGlvbnMgPSBbJ05vZGVMaXN0JywgJ0RPTVRva2VuTGlzdCcsICdNZWRpYUxpc3QnLCAnU3R5bGVTaGVldExpc3QnLCAnQ1NTUnVsZUxpc3QnXSwgaSA9IDA7IGkgPCA1OyBpKyspe1xuICB2YXIgTkFNRSAgICAgICA9IGNvbGxlY3Rpb25zW2ldXG4gICAgLCBDb2xsZWN0aW9uID0gZ2xvYmFsW05BTUVdXG4gICAgLCBwcm90byAgICAgID0gQ29sbGVjdGlvbiAmJiBDb2xsZWN0aW9uLnByb3RvdHlwZVxuICAgICwga2V5O1xuICBpZihwcm90byl7XG4gICAgaWYoIXByb3RvW0lURVJBVE9SXSloaWRlKHByb3RvLCBJVEVSQVRPUiwgQXJyYXlWYWx1ZXMpO1xuICAgIGlmKCFwcm90b1tUT19TVFJJTkdfVEFHXSloaWRlKHByb3RvLCBUT19TVFJJTkdfVEFHLCBOQU1FKTtcbiAgICBJdGVyYXRvcnNbTkFNRV0gPSBBcnJheVZhbHVlcztcbiAgICBmb3Ioa2V5IGluICRpdGVyYXRvcnMpaWYoIXByb3RvW2tleV0pcmVkZWZpbmUocHJvdG8sIGtleSwgJGl0ZXJhdG9yc1trZXldLCB0cnVlKTtcbiAgfVxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBhZGRUb1Vuc2NvcGFibGVzID0gcmVxdWlyZSgnLi9fYWRkLXRvLXVuc2NvcGFibGVzJylcbiAgLCBzdGVwICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9faXRlci1zdGVwJylcbiAgLCBJdGVyYXRvcnMgICAgICAgID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJylcbiAgLCB0b0lPYmplY3QgICAgICAgID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xuXG4vLyAyMi4xLjMuNCBBcnJheS5wcm90b3R5cGUuZW50cmllcygpXG4vLyAyMi4xLjMuMTMgQXJyYXkucHJvdG90eXBlLmtleXMoKVxuLy8gMjIuMS4zLjI5IEFycmF5LnByb3RvdHlwZS52YWx1ZXMoKVxuLy8gMjIuMS4zLjMwIEFycmF5LnByb3RvdHlwZVtAQGl0ZXJhdG9yXSgpXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2l0ZXItZGVmaW5lJykoQXJyYXksICdBcnJheScsIGZ1bmN0aW9uKGl0ZXJhdGVkLCBraW5kKXtcbiAgdGhpcy5fdCA9IHRvSU9iamVjdChpdGVyYXRlZCk7IC8vIHRhcmdldFxuICB0aGlzLl9pID0gMDsgICAgICAgICAgICAgICAgICAgLy8gbmV4dCBpbmRleFxuICB0aGlzLl9rID0ga2luZDsgICAgICAgICAgICAgICAgLy8ga2luZFxuLy8gMjIuMS41LjIuMSAlQXJyYXlJdGVyYXRvclByb3RvdHlwZSUubmV4dCgpXG59LCBmdW5jdGlvbigpe1xuICB2YXIgTyAgICAgPSB0aGlzLl90XG4gICAgLCBraW5kICA9IHRoaXMuX2tcbiAgICAsIGluZGV4ID0gdGhpcy5faSsrO1xuICBpZighTyB8fCBpbmRleCA+PSBPLmxlbmd0aCl7XG4gICAgdGhpcy5fdCA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gc3RlcCgxKTtcbiAgfVxuICBpZihraW5kID09ICdrZXlzJyAgKXJldHVybiBzdGVwKDAsIGluZGV4KTtcbiAgaWYoa2luZCA9PSAndmFsdWVzJylyZXR1cm4gc3RlcCgwLCBPW2luZGV4XSk7XG4gIHJldHVybiBzdGVwKDAsIFtpbmRleCwgT1tpbmRleF1dKTtcbn0sICd2YWx1ZXMnKTtcblxuLy8gYXJndW1lbnRzTGlzdFtAQGl0ZXJhdG9yXSBpcyAlQXJyYXlQcm90b192YWx1ZXMlICg5LjQuNC42LCA5LjQuNC43KVxuSXRlcmF0b3JzLkFyZ3VtZW50cyA9IEl0ZXJhdG9ycy5BcnJheTtcblxuYWRkVG9VbnNjb3BhYmxlcygna2V5cycpO1xuYWRkVG9VbnNjb3BhYmxlcygndmFsdWVzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCdlbnRyaWVzJyk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuaXRlcmF0b3IuanNcbiAqKi8iLCIvLyAyMi4xLjMuMzEgQXJyYXkucHJvdG90eXBlW0BAdW5zY29wYWJsZXNdXG52YXIgVU5TQ09QQUJMRVMgPSByZXF1aXJlKCcuL193a3MnKSgndW5zY29wYWJsZXMnKVxuICAsIEFycmF5UHJvdG8gID0gQXJyYXkucHJvdG90eXBlO1xuaWYoQXJyYXlQcm90b1tVTlNDT1BBQkxFU10gPT0gdW5kZWZpbmVkKXJlcXVpcmUoJy4vX2hpZGUnKShBcnJheVByb3RvLCBVTlNDT1BBQkxFUywge30pO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICBBcnJheVByb3RvW1VOU0NPUEFCTEVTXVtrZXldID0gdHJ1ZTtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fYWRkLXRvLXVuc2NvcGFibGVzLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihkb25lLCB2YWx1ZSl7XG4gIHJldHVybiB7dmFsdWU6IHZhbHVlLCBkb25lOiAhIWRvbmV9O1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL19pdGVyLXN0ZXAuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgTElCUkFSWSAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fbGlicmFyeScpXG4gICwgZ2xvYmFsICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBjdHggICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19jdHgnKVxuICAsIGNsYXNzb2YgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2NsYXNzb2YnKVxuICAsICRleHBvcnQgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgaXNPYmplY3QgICAgICAgICAgID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0JylcbiAgLCBhbk9iamVjdCAgICAgICAgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIGFGdW5jdGlvbiAgICAgICAgICA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKVxuICAsIGFuSW5zdGFuY2UgICAgICAgICA9IHJlcXVpcmUoJy4vX2FuLWluc3RhbmNlJylcbiAgLCBmb3JPZiAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19mb3Itb2YnKVxuICAsIHNldFByb3RvICAgICAgICAgICA9IHJlcXVpcmUoJy4vX3NldC1wcm90bycpLnNldFxuICAsIHNwZWNpZXNDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4vX3NwZWNpZXMtY29uc3RydWN0b3InKVxuICAsIHRhc2sgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX3Rhc2snKS5zZXRcbiAgLCBtaWNyb3Rhc2sgICAgICAgICAgPSByZXF1aXJlKCcuL19taWNyb3Rhc2snKVxuICAsIFBST01JU0UgICAgICAgICAgICA9ICdQcm9taXNlJ1xuICAsIFR5cGVFcnJvciAgICAgICAgICA9IGdsb2JhbC5UeXBlRXJyb3JcbiAgLCBwcm9jZXNzICAgICAgICAgICAgPSBnbG9iYWwucHJvY2Vzc1xuICAsICRQcm9taXNlICAgICAgICAgICA9IGdsb2JhbFtQUk9NSVNFXVxuICAsIHByb2Nlc3MgICAgICAgICAgICA9IGdsb2JhbC5wcm9jZXNzXG4gICwgaXNOb2RlICAgICAgICAgICAgID0gY2xhc3NvZihwcm9jZXNzKSA9PSAncHJvY2VzcydcbiAgLCBlbXB0eSAgICAgICAgICAgICAgPSBmdW5jdGlvbigpeyAvKiBlbXB0eSAqLyB9XG4gICwgSW50ZXJuYWwsIEdlbmVyaWNQcm9taXNlQ2FwYWJpbGl0eSwgV3JhcHBlcjtcblxudmFyIFVTRV9OQVRJVkUgPSAhIWZ1bmN0aW9uKCl7XG4gIHRyeSB7XG4gICAgLy8gY29ycmVjdCBzdWJjbGFzc2luZyB3aXRoIEBAc3BlY2llcyBzdXBwb3J0XG4gICAgdmFyIHByb21pc2UgICAgID0gJFByb21pc2UucmVzb2x2ZSgxKVxuICAgICAgLCBGYWtlUHJvbWlzZSA9IChwcm9taXNlLmNvbnN0cnVjdG9yID0ge30pW3JlcXVpcmUoJy4vX3drcycpKCdzcGVjaWVzJyldID0gZnVuY3Rpb24oZXhlYyl7IGV4ZWMoZW1wdHksIGVtcHR5KTsgfTtcbiAgICAvLyB1bmhhbmRsZWQgcmVqZWN0aW9ucyB0cmFja2luZyBzdXBwb3J0LCBOb2RlSlMgUHJvbWlzZSB3aXRob3V0IGl0IGZhaWxzIEBAc3BlY2llcyB0ZXN0XG4gICAgcmV0dXJuIChpc05vZGUgfHwgdHlwZW9mIFByb21pc2VSZWplY3Rpb25FdmVudCA9PSAnZnVuY3Rpb24nKSAmJiBwcm9taXNlLnRoZW4oZW1wdHkpIGluc3RhbmNlb2YgRmFrZVByb21pc2U7XG4gIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbn0oKTtcblxuLy8gaGVscGVyc1xudmFyIHNhbWVDb25zdHJ1Y3RvciA9IGZ1bmN0aW9uKGEsIGIpe1xuICAvLyB3aXRoIGxpYnJhcnkgd3JhcHBlciBzcGVjaWFsIGNhc2VcbiAgcmV0dXJuIGEgPT09IGIgfHwgYSA9PT0gJFByb21pc2UgJiYgYiA9PT0gV3JhcHBlcjtcbn07XG52YXIgaXNUaGVuYWJsZSA9IGZ1bmN0aW9uKGl0KXtcbiAgdmFyIHRoZW47XG4gIHJldHVybiBpc09iamVjdChpdCkgJiYgdHlwZW9mICh0aGVuID0gaXQudGhlbikgPT0gJ2Z1bmN0aW9uJyA/IHRoZW4gOiBmYWxzZTtcbn07XG52YXIgbmV3UHJvbWlzZUNhcGFiaWxpdHkgPSBmdW5jdGlvbihDKXtcbiAgcmV0dXJuIHNhbWVDb25zdHJ1Y3RvcigkUHJvbWlzZSwgQylcbiAgICA/IG5ldyBQcm9taXNlQ2FwYWJpbGl0eShDKVxuICAgIDogbmV3IEdlbmVyaWNQcm9taXNlQ2FwYWJpbGl0eShDKTtcbn07XG52YXIgUHJvbWlzZUNhcGFiaWxpdHkgPSBHZW5lcmljUHJvbWlzZUNhcGFiaWxpdHkgPSBmdW5jdGlvbihDKXtcbiAgdmFyIHJlc29sdmUsIHJlamVjdDtcbiAgdGhpcy5wcm9taXNlID0gbmV3IEMoZnVuY3Rpb24oJCRyZXNvbHZlLCAkJHJlamVjdCl7XG4gICAgaWYocmVzb2x2ZSAhPT0gdW5kZWZpbmVkIHx8IHJlamVjdCAhPT0gdW5kZWZpbmVkKXRocm93IFR5cGVFcnJvcignQmFkIFByb21pc2UgY29uc3RydWN0b3InKTtcbiAgICByZXNvbHZlID0gJCRyZXNvbHZlO1xuICAgIHJlamVjdCAgPSAkJHJlamVjdDtcbiAgfSk7XG4gIHRoaXMucmVzb2x2ZSA9IGFGdW5jdGlvbihyZXNvbHZlKTtcbiAgdGhpcy5yZWplY3QgID0gYUZ1bmN0aW9uKHJlamVjdCk7XG59O1xudmFyIHBlcmZvcm0gPSBmdW5jdGlvbihleGVjKXtcbiAgdHJ5IHtcbiAgICBleGVjKCk7XG4gIH0gY2F0Y2goZSl7XG4gICAgcmV0dXJuIHtlcnJvcjogZX07XG4gIH1cbn07XG52YXIgbm90aWZ5ID0gZnVuY3Rpb24ocHJvbWlzZSwgaXNSZWplY3Qpe1xuICBpZihwcm9taXNlLl9uKXJldHVybjtcbiAgcHJvbWlzZS5fbiA9IHRydWU7XG4gIHZhciBjaGFpbiA9IHByb21pc2UuX2M7XG4gIG1pY3JvdGFzayhmdW5jdGlvbigpe1xuICAgIHZhciB2YWx1ZSA9IHByb21pc2UuX3ZcbiAgICAgICwgb2sgICAgPSBwcm9taXNlLl9zID09IDFcbiAgICAgICwgaSAgICAgPSAwO1xuICAgIHZhciBydW4gPSBmdW5jdGlvbihyZWFjdGlvbil7XG4gICAgICB2YXIgaGFuZGxlciA9IG9rID8gcmVhY3Rpb24ub2sgOiByZWFjdGlvbi5mYWlsXG4gICAgICAgICwgcmVzb2x2ZSA9IHJlYWN0aW9uLnJlc29sdmVcbiAgICAgICAgLCByZWplY3QgID0gcmVhY3Rpb24ucmVqZWN0XG4gICAgICAgICwgZG9tYWluICA9IHJlYWN0aW9uLmRvbWFpblxuICAgICAgICAsIHJlc3VsdCwgdGhlbjtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmKGhhbmRsZXIpe1xuICAgICAgICAgIGlmKCFvayl7XG4gICAgICAgICAgICBpZihwcm9taXNlLl9oID09IDIpb25IYW5kbGVVbmhhbmRsZWQocHJvbWlzZSk7XG4gICAgICAgICAgICBwcm9taXNlLl9oID0gMTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYoaGFuZGxlciA9PT0gdHJ1ZSlyZXN1bHQgPSB2YWx1ZTtcbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmKGRvbWFpbilkb21haW4uZW50ZXIoKTtcbiAgICAgICAgICAgIHJlc3VsdCA9IGhhbmRsZXIodmFsdWUpO1xuICAgICAgICAgICAgaWYoZG9tYWluKWRvbWFpbi5leGl0KCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmKHJlc3VsdCA9PT0gcmVhY3Rpb24ucHJvbWlzZSl7XG4gICAgICAgICAgICByZWplY3QoVHlwZUVycm9yKCdQcm9taXNlLWNoYWluIGN5Y2xlJykpO1xuICAgICAgICAgIH0gZWxzZSBpZih0aGVuID0gaXNUaGVuYWJsZShyZXN1bHQpKXtcbiAgICAgICAgICAgIHRoZW4uY2FsbChyZXN1bHQsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSBlbHNlIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSBlbHNlIHJlamVjdCh2YWx1ZSk7XG4gICAgICB9IGNhdGNoKGUpe1xuICAgICAgICByZWplY3QoZSk7XG4gICAgICB9XG4gICAgfTtcbiAgICB3aGlsZShjaGFpbi5sZW5ndGggPiBpKXJ1bihjaGFpbltpKytdKTsgLy8gdmFyaWFibGUgbGVuZ3RoIC0gY2FuJ3QgdXNlIGZvckVhY2hcbiAgICBwcm9taXNlLl9jID0gW107XG4gICAgcHJvbWlzZS5fbiA9IGZhbHNlO1xuICAgIGlmKGlzUmVqZWN0ICYmICFwcm9taXNlLl9oKW9uVW5oYW5kbGVkKHByb21pc2UpO1xuICB9KTtcbn07XG52YXIgb25VbmhhbmRsZWQgPSBmdW5jdGlvbihwcm9taXNlKXtcbiAgdGFzay5jYWxsKGdsb2JhbCwgZnVuY3Rpb24oKXtcbiAgICB2YXIgdmFsdWUgPSBwcm9taXNlLl92XG4gICAgICAsIGFicnVwdCwgaGFuZGxlciwgY29uc29sZTtcbiAgICBpZihpc1VuaGFuZGxlZChwcm9taXNlKSl7XG4gICAgICBhYnJ1cHQgPSBwZXJmb3JtKGZ1bmN0aW9uKCl7XG4gICAgICAgIGlmKGlzTm9kZSl7XG4gICAgICAgICAgcHJvY2Vzcy5lbWl0KCd1bmhhbmRsZWRSZWplY3Rpb24nLCB2YWx1ZSwgcHJvbWlzZSk7XG4gICAgICAgIH0gZWxzZSBpZihoYW5kbGVyID0gZ2xvYmFsLm9udW5oYW5kbGVkcmVqZWN0aW9uKXtcbiAgICAgICAgICBoYW5kbGVyKHtwcm9taXNlOiBwcm9taXNlLCByZWFzb246IHZhbHVlfSk7XG4gICAgICAgIH0gZWxzZSBpZigoY29uc29sZSA9IGdsb2JhbC5jb25zb2xlKSAmJiBjb25zb2xlLmVycm9yKXtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdVbmhhbmRsZWQgcHJvbWlzZSByZWplY3Rpb24nLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgLy8gQnJvd3NlcnMgc2hvdWxkIG5vdCB0cmlnZ2VyIGByZWplY3Rpb25IYW5kbGVkYCBldmVudCBpZiBpdCB3YXMgaGFuZGxlZCBoZXJlLCBOb2RlSlMgLSBzaG91bGRcbiAgICAgIHByb21pc2UuX2ggPSBpc05vZGUgfHwgaXNVbmhhbmRsZWQocHJvbWlzZSkgPyAyIDogMTtcbiAgICB9IHByb21pc2UuX2EgPSB1bmRlZmluZWQ7XG4gICAgaWYoYWJydXB0KXRocm93IGFicnVwdC5lcnJvcjtcbiAgfSk7XG59O1xudmFyIGlzVW5oYW5kbGVkID0gZnVuY3Rpb24ocHJvbWlzZSl7XG4gIGlmKHByb21pc2UuX2ggPT0gMSlyZXR1cm4gZmFsc2U7XG4gIHZhciBjaGFpbiA9IHByb21pc2UuX2EgfHwgcHJvbWlzZS5fY1xuICAgICwgaSAgICAgPSAwXG4gICAgLCByZWFjdGlvbjtcbiAgd2hpbGUoY2hhaW4ubGVuZ3RoID4gaSl7XG4gICAgcmVhY3Rpb24gPSBjaGFpbltpKytdO1xuICAgIGlmKHJlYWN0aW9uLmZhaWwgfHwgIWlzVW5oYW5kbGVkKHJlYWN0aW9uLnByb21pc2UpKXJldHVybiBmYWxzZTtcbiAgfSByZXR1cm4gdHJ1ZTtcbn07XG52YXIgb25IYW5kbGVVbmhhbmRsZWQgPSBmdW5jdGlvbihwcm9taXNlKXtcbiAgdGFzay5jYWxsKGdsb2JhbCwgZnVuY3Rpb24oKXtcbiAgICB2YXIgaGFuZGxlcjtcbiAgICBpZihpc05vZGUpe1xuICAgICAgcHJvY2Vzcy5lbWl0KCdyZWplY3Rpb25IYW5kbGVkJywgcHJvbWlzZSk7XG4gICAgfSBlbHNlIGlmKGhhbmRsZXIgPSBnbG9iYWwub25yZWplY3Rpb25oYW5kbGVkKXtcbiAgICAgIGhhbmRsZXIoe3Byb21pc2U6IHByb21pc2UsIHJlYXNvbjogcHJvbWlzZS5fdn0pO1xuICAgIH1cbiAgfSk7XG59O1xudmFyICRyZWplY3QgPSBmdW5jdGlvbih2YWx1ZSl7XG4gIHZhciBwcm9taXNlID0gdGhpcztcbiAgaWYocHJvbWlzZS5fZClyZXR1cm47XG4gIHByb21pc2UuX2QgPSB0cnVlO1xuICBwcm9taXNlID0gcHJvbWlzZS5fdyB8fCBwcm9taXNlOyAvLyB1bndyYXBcbiAgcHJvbWlzZS5fdiA9IHZhbHVlO1xuICBwcm9taXNlLl9zID0gMjtcbiAgaWYoIXByb21pc2UuX2EpcHJvbWlzZS5fYSA9IHByb21pc2UuX2Muc2xpY2UoKTtcbiAgbm90aWZ5KHByb21pc2UsIHRydWUpO1xufTtcbnZhciAkcmVzb2x2ZSA9IGZ1bmN0aW9uKHZhbHVlKXtcbiAgdmFyIHByb21pc2UgPSB0aGlzXG4gICAgLCB0aGVuO1xuICBpZihwcm9taXNlLl9kKXJldHVybjtcbiAgcHJvbWlzZS5fZCA9IHRydWU7XG4gIHByb21pc2UgPSBwcm9taXNlLl93IHx8IHByb21pc2U7IC8vIHVud3JhcFxuICB0cnkge1xuICAgIGlmKHByb21pc2UgPT09IHZhbHVlKXRocm93IFR5cGVFcnJvcihcIlByb21pc2UgY2FuJ3QgYmUgcmVzb2x2ZWQgaXRzZWxmXCIpO1xuICAgIGlmKHRoZW4gPSBpc1RoZW5hYmxlKHZhbHVlKSl7XG4gICAgICBtaWNyb3Rhc2soZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIHdyYXBwZXIgPSB7X3c6IHByb21pc2UsIF9kOiBmYWxzZX07IC8vIHdyYXBcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB0aGVuLmNhbGwodmFsdWUsIGN0eCgkcmVzb2x2ZSwgd3JhcHBlciwgMSksIGN0eCgkcmVqZWN0LCB3cmFwcGVyLCAxKSk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgJHJlamVjdC5jYWxsKHdyYXBwZXIsIGUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcHJvbWlzZS5fdiA9IHZhbHVlO1xuICAgICAgcHJvbWlzZS5fcyA9IDE7XG4gICAgICBub3RpZnkocHJvbWlzZSwgZmFsc2UpO1xuICAgIH1cbiAgfSBjYXRjaChlKXtcbiAgICAkcmVqZWN0LmNhbGwoe193OiBwcm9taXNlLCBfZDogZmFsc2V9LCBlKTsgLy8gd3JhcFxuICB9XG59O1xuXG4vLyBjb25zdHJ1Y3RvciBwb2x5ZmlsbFxuaWYoIVVTRV9OQVRJVkUpe1xuICAvLyAyNS40LjMuMSBQcm9taXNlKGV4ZWN1dG9yKVxuICAkUHJvbWlzZSA9IGZ1bmN0aW9uIFByb21pc2UoZXhlY3V0b3Ipe1xuICAgIGFuSW5zdGFuY2UodGhpcywgJFByb21pc2UsIFBST01JU0UsICdfaCcpO1xuICAgIGFGdW5jdGlvbihleGVjdXRvcik7XG4gICAgSW50ZXJuYWwuY2FsbCh0aGlzKTtcbiAgICB0cnkge1xuICAgICAgZXhlY3V0b3IoY3R4KCRyZXNvbHZlLCB0aGlzLCAxKSwgY3R4KCRyZWplY3QsIHRoaXMsIDEpKTtcbiAgICB9IGNhdGNoKGVycil7XG4gICAgICAkcmVqZWN0LmNhbGwodGhpcywgZXJyKTtcbiAgICB9XG4gIH07XG4gIEludGVybmFsID0gZnVuY3Rpb24gUHJvbWlzZShleGVjdXRvcil7XG4gICAgdGhpcy5fYyA9IFtdOyAgICAgICAgICAgICAvLyA8LSBhd2FpdGluZyByZWFjdGlvbnNcbiAgICB0aGlzLl9hID0gdW5kZWZpbmVkOyAgICAgIC8vIDwtIGNoZWNrZWQgaW4gaXNVbmhhbmRsZWQgcmVhY3Rpb25zXG4gICAgdGhpcy5fcyA9IDA7ICAgICAgICAgICAgICAvLyA8LSBzdGF0ZVxuICAgIHRoaXMuX2QgPSBmYWxzZTsgICAgICAgICAgLy8gPC0gZG9uZVxuICAgIHRoaXMuX3YgPSB1bmRlZmluZWQ7ICAgICAgLy8gPC0gdmFsdWVcbiAgICB0aGlzLl9oID0gMDsgICAgICAgICAgICAgIC8vIDwtIHJlamVjdGlvbiBzdGF0ZSwgMCAtIGRlZmF1bHQsIDEgLSBoYW5kbGVkLCAyIC0gdW5oYW5kbGVkXG4gICAgdGhpcy5fbiA9IGZhbHNlOyAgICAgICAgICAvLyA8LSBub3RpZnlcbiAgfTtcbiAgSW50ZXJuYWwucHJvdG90eXBlID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUtYWxsJykoJFByb21pc2UucHJvdG90eXBlLCB7XG4gICAgLy8gMjUuNC41LjMgUHJvbWlzZS5wcm90b3R5cGUudGhlbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZClcbiAgICB0aGVuOiBmdW5jdGlvbiB0aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKXtcbiAgICAgIHZhciByZWFjdGlvbiAgICA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KHNwZWNpZXNDb25zdHJ1Y3Rvcih0aGlzLCAkUHJvbWlzZSkpO1xuICAgICAgcmVhY3Rpb24ub2sgICAgID0gdHlwZW9mIG9uRnVsZmlsbGVkID09ICdmdW5jdGlvbicgPyBvbkZ1bGZpbGxlZCA6IHRydWU7XG4gICAgICByZWFjdGlvbi5mYWlsICAgPSB0eXBlb2Ygb25SZWplY3RlZCA9PSAnZnVuY3Rpb24nICYmIG9uUmVqZWN0ZWQ7XG4gICAgICByZWFjdGlvbi5kb21haW4gPSBpc05vZGUgPyBwcm9jZXNzLmRvbWFpbiA6IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuX2MucHVzaChyZWFjdGlvbik7XG4gICAgICBpZih0aGlzLl9hKXRoaXMuX2EucHVzaChyZWFjdGlvbik7XG4gICAgICBpZih0aGlzLl9zKW5vdGlmeSh0aGlzLCBmYWxzZSk7XG4gICAgICByZXR1cm4gcmVhY3Rpb24ucHJvbWlzZTtcbiAgICB9LFxuICAgIC8vIDI1LjQuNS4xIFByb21pc2UucHJvdG90eXBlLmNhdGNoKG9uUmVqZWN0ZWQpXG4gICAgJ2NhdGNoJzogZnVuY3Rpb24ob25SZWplY3RlZCl7XG4gICAgICByZXR1cm4gdGhpcy50aGVuKHVuZGVmaW5lZCwgb25SZWplY3RlZCk7XG4gICAgfVxuICB9KTtcbiAgUHJvbWlzZUNhcGFiaWxpdHkgPSBmdW5jdGlvbigpe1xuICAgIHZhciBwcm9taXNlICA9IG5ldyBJbnRlcm5hbDtcbiAgICB0aGlzLnByb21pc2UgPSBwcm9taXNlO1xuICAgIHRoaXMucmVzb2x2ZSA9IGN0eCgkcmVzb2x2ZSwgcHJvbWlzZSwgMSk7XG4gICAgdGhpcy5yZWplY3QgID0gY3R4KCRyZWplY3QsIHByb21pc2UsIDEpO1xuICB9O1xufVxuXG4kZXhwb3J0KCRleHBvcnQuRyArICRleHBvcnQuVyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCB7UHJvbWlzZTogJFByb21pc2V9KTtcbnJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJykoJFByb21pc2UsIFBST01JU0UpO1xucmVxdWlyZSgnLi9fc2V0LXNwZWNpZXMnKShQUk9NSVNFKTtcbldyYXBwZXIgPSByZXF1aXJlKCcuL19jb3JlJylbUFJPTUlTRV07XG5cbi8vIHN0YXRpY3NcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsIFBST01JU0UsIHtcbiAgLy8gMjUuNC40LjUgUHJvbWlzZS5yZWplY3QocilcbiAgcmVqZWN0OiBmdW5jdGlvbiByZWplY3Qocil7XG4gICAgdmFyIGNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eSh0aGlzKVxuICAgICAgLCAkJHJlamVjdCAgID0gY2FwYWJpbGl0eS5yZWplY3Q7XG4gICAgJCRyZWplY3Qocik7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfVxufSk7XG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqIChMSUJSQVJZIHx8ICFVU0VfTkFUSVZFKSwgUFJPTUlTRSwge1xuICAvLyAyNS40LjQuNiBQcm9taXNlLnJlc29sdmUoeClcbiAgcmVzb2x2ZTogZnVuY3Rpb24gcmVzb2x2ZSh4KXtcbiAgICAvLyBpbnN0YW5jZW9mIGluc3RlYWQgb2YgaW50ZXJuYWwgc2xvdCBjaGVjayBiZWNhdXNlIHdlIHNob3VsZCBmaXggaXQgd2l0aG91dCByZXBsYWNlbWVudCBuYXRpdmUgUHJvbWlzZSBjb3JlXG4gICAgaWYoeCBpbnN0YW5jZW9mICRQcm9taXNlICYmIHNhbWVDb25zdHJ1Y3Rvcih4LmNvbnN0cnVjdG9yLCB0aGlzKSlyZXR1cm4geDtcbiAgICB2YXIgY2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KHRoaXMpXG4gICAgICAsICQkcmVzb2x2ZSAgPSBjYXBhYmlsaXR5LnJlc29sdmU7XG4gICAgJCRyZXNvbHZlKHgpO1xuICAgIHJldHVybiBjYXBhYmlsaXR5LnByb21pc2U7XG4gIH1cbn0pO1xuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhKFVTRV9OQVRJVkUgJiYgcmVxdWlyZSgnLi9faXRlci1kZXRlY3QnKShmdW5jdGlvbihpdGVyKXtcbiAgJFByb21pc2UuYWxsKGl0ZXIpWydjYXRjaCddKGVtcHR5KTtcbn0pKSwgUFJPTUlTRSwge1xuICAvLyAyNS40LjQuMSBQcm9taXNlLmFsbChpdGVyYWJsZSlcbiAgYWxsOiBmdW5jdGlvbiBhbGwoaXRlcmFibGUpe1xuICAgIHZhciBDICAgICAgICAgID0gdGhpc1xuICAgICAgLCBjYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkoQylcbiAgICAgICwgcmVzb2x2ZSAgICA9IGNhcGFiaWxpdHkucmVzb2x2ZVxuICAgICAgLCByZWplY3QgICAgID0gY2FwYWJpbGl0eS5yZWplY3Q7XG4gICAgdmFyIGFicnVwdCA9IHBlcmZvcm0oZnVuY3Rpb24oKXtcbiAgICAgIHZhciB2YWx1ZXMgICAgPSBbXVxuICAgICAgICAsIGluZGV4ICAgICA9IDBcbiAgICAgICAgLCByZW1haW5pbmcgPSAxO1xuICAgICAgZm9yT2YoaXRlcmFibGUsIGZhbHNlLCBmdW5jdGlvbihwcm9taXNlKXtcbiAgICAgICAgdmFyICRpbmRleCAgICAgICAgPSBpbmRleCsrXG4gICAgICAgICAgLCBhbHJlYWR5Q2FsbGVkID0gZmFsc2U7XG4gICAgICAgIHZhbHVlcy5wdXNoKHVuZGVmaW5lZCk7XG4gICAgICAgIHJlbWFpbmluZysrO1xuICAgICAgICBDLnJlc29sdmUocHJvbWlzZSkudGhlbihmdW5jdGlvbih2YWx1ZSl7XG4gICAgICAgICAgaWYoYWxyZWFkeUNhbGxlZClyZXR1cm47XG4gICAgICAgICAgYWxyZWFkeUNhbGxlZCAgPSB0cnVlO1xuICAgICAgICAgIHZhbHVlc1skaW5kZXhdID0gdmFsdWU7XG4gICAgICAgICAgLS1yZW1haW5pbmcgfHwgcmVzb2x2ZSh2YWx1ZXMpO1xuICAgICAgICB9LCByZWplY3QpO1xuICAgICAgfSk7XG4gICAgICAtLXJlbWFpbmluZyB8fCByZXNvbHZlKHZhbHVlcyk7XG4gICAgfSk7XG4gICAgaWYoYWJydXB0KXJlamVjdChhYnJ1cHQuZXJyb3IpO1xuICAgIHJldHVybiBjYXBhYmlsaXR5LnByb21pc2U7XG4gIH0sXG4gIC8vIDI1LjQuNC40IFByb21pc2UucmFjZShpdGVyYWJsZSlcbiAgcmFjZTogZnVuY3Rpb24gcmFjZShpdGVyYWJsZSl7XG4gICAgdmFyIEMgICAgICAgICAgPSB0aGlzXG4gICAgICAsIGNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eShDKVxuICAgICAgLCByZWplY3QgICAgID0gY2FwYWJpbGl0eS5yZWplY3Q7XG4gICAgdmFyIGFicnVwdCA9IHBlcmZvcm0oZnVuY3Rpb24oKXtcbiAgICAgIGZvck9mKGl0ZXJhYmxlLCBmYWxzZSwgZnVuY3Rpb24ocHJvbWlzZSl7XG4gICAgICAgIEMucmVzb2x2ZShwcm9taXNlKS50aGVuKGNhcGFiaWxpdHkucmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGlmKGFicnVwdClyZWplY3QoYWJydXB0LmVycm9yKTtcbiAgICByZXR1cm4gY2FwYWJpbGl0eS5wcm9taXNlO1xuICB9XG59KTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL2VzNi5wcm9taXNlLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwgQ29uc3RydWN0b3IsIG5hbWUsIGZvcmJpZGRlbkZpZWxkKXtcbiAgaWYoIShpdCBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSB8fCAoZm9yYmlkZGVuRmllbGQgIT09IHVuZGVmaW5lZCAmJiBmb3JiaWRkZW5GaWVsZCBpbiBpdCkpe1xuICAgIHRocm93IFR5cGVFcnJvcihuYW1lICsgJzogaW5jb3JyZWN0IGludm9jYXRpb24hJyk7XG4gIH0gcmV0dXJuIGl0O1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL19hbi1pbnN0YW5jZS5qc1xuICoqLyIsInZhciBjdHggICAgICAgICA9IHJlcXVpcmUoJy4vX2N0eCcpXG4gICwgY2FsbCAgICAgICAgPSByZXF1aXJlKCcuL19pdGVyLWNhbGwnKVxuICAsIGlzQXJyYXlJdGVyID0gcmVxdWlyZSgnLi9faXMtYXJyYXktaXRlcicpXG4gICwgYW5PYmplY3QgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIHRvTGVuZ3RoICAgID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJylcbiAgLCBnZXRJdGVyRm4gICA9IHJlcXVpcmUoJy4vY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0ZXJhYmxlLCBlbnRyaWVzLCBmbiwgdGhhdCwgSVRFUkFUT1Ipe1xuICB2YXIgaXRlckZuID0gSVRFUkFUT1IgPyBmdW5jdGlvbigpeyByZXR1cm4gaXRlcmFibGU7IH0gOiBnZXRJdGVyRm4oaXRlcmFibGUpXG4gICAgLCBmICAgICAgPSBjdHgoZm4sIHRoYXQsIGVudHJpZXMgPyAyIDogMSlcbiAgICAsIGluZGV4ICA9IDBcbiAgICAsIGxlbmd0aCwgc3RlcCwgaXRlcmF0b3I7XG4gIGlmKHR5cGVvZiBpdGVyRm4gIT0gJ2Z1bmN0aW9uJyl0aHJvdyBUeXBlRXJyb3IoaXRlcmFibGUgKyAnIGlzIG5vdCBpdGVyYWJsZSEnKTtcbiAgLy8gZmFzdCBjYXNlIGZvciBhcnJheXMgd2l0aCBkZWZhdWx0IGl0ZXJhdG9yXG4gIGlmKGlzQXJyYXlJdGVyKGl0ZXJGbikpZm9yKGxlbmd0aCA9IHRvTGVuZ3RoKGl0ZXJhYmxlLmxlbmd0aCk7IGxlbmd0aCA+IGluZGV4OyBpbmRleCsrKXtcbiAgICBlbnRyaWVzID8gZihhbk9iamVjdChzdGVwID0gaXRlcmFibGVbaW5kZXhdKVswXSwgc3RlcFsxXSkgOiBmKGl0ZXJhYmxlW2luZGV4XSk7XG4gIH0gZWxzZSBmb3IoaXRlcmF0b3IgPSBpdGVyRm4uY2FsbChpdGVyYWJsZSk7ICEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZTsgKXtcbiAgICBjYWxsKGl0ZXJhdG9yLCBmLCBzdGVwLnZhbHVlLCBlbnRyaWVzKTtcbiAgfVxufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL19mb3Itb2YuanNcbiAqKi8iLCIvLyBjYWxsIHNvbWV0aGluZyBvbiBpdGVyYXRvciBzdGVwIHdpdGggc2FmZSBjbG9zaW5nIG9uIGVycm9yXG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXRlcmF0b3IsIGZuLCB2YWx1ZSwgZW50cmllcyl7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGVudHJpZXMgPyBmbihhbk9iamVjdCh2YWx1ZSlbMF0sIHZhbHVlWzFdKSA6IGZuKHZhbHVlKTtcbiAgLy8gNy40LjYgSXRlcmF0b3JDbG9zZShpdGVyYXRvciwgY29tcGxldGlvbilcbiAgfSBjYXRjaChlKXtcbiAgICB2YXIgcmV0ID0gaXRlcmF0b3JbJ3JldHVybiddO1xuICAgIGlmKHJldCAhPT0gdW5kZWZpbmVkKWFuT2JqZWN0KHJldC5jYWxsKGl0ZXJhdG9yKSk7XG4gICAgdGhyb3cgZTtcbiAgfVxufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL19pdGVyLWNhbGwuanNcbiAqKi8iLCIvLyBjaGVjayBvbiBkZWZhdWx0IEFycmF5IGl0ZXJhdG9yXG52YXIgSXRlcmF0b3JzICA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpXG4gICwgSVRFUkFUT1IgICA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpXG4gICwgQXJyYXlQcm90byA9IEFycmF5LnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpdCAhPT0gdW5kZWZpbmVkICYmIChJdGVyYXRvcnMuQXJyYXkgPT09IGl0IHx8IEFycmF5UHJvdG9bSVRFUkFUT1JdID09PSBpdCk7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX2lzLWFycmF5LWl0ZXIuanNcbiAqKi8iLCJ2YXIgY2xhc3NvZiAgID0gcmVxdWlyZSgnLi9fY2xhc3NvZicpXG4gICwgSVRFUkFUT1IgID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fY29yZScpLmdldEl0ZXJhdG9yTWV0aG9kID0gZnVuY3Rpb24oaXQpe1xuICBpZihpdCAhPSB1bmRlZmluZWQpcmV0dXJuIGl0W0lURVJBVE9SXVxuICAgIHx8IGl0WydAQGl0ZXJhdG9yJ11cbiAgICB8fCBJdGVyYXRvcnNbY2xhc3NvZihpdCldO1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZC5qc1xuICoqLyIsIi8vIFdvcmtzIHdpdGggX19wcm90b19fIG9ubHkuIE9sZCB2OCBjYW4ndCB3b3JrIHdpdGggbnVsbCBwcm90byBvYmplY3RzLlxuLyogZXNsaW50LWRpc2FibGUgbm8tcHJvdG8gKi9cbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBjaGVjayA9IGZ1bmN0aW9uKE8sIHByb3RvKXtcbiAgYW5PYmplY3QoTyk7XG4gIGlmKCFpc09iamVjdChwcm90bykgJiYgcHJvdG8gIT09IG51bGwpdGhyb3cgVHlwZUVycm9yKHByb3RvICsgXCI6IGNhbid0IHNldCBhcyBwcm90b3R5cGUhXCIpO1xufTtcbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXQ6IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCAoJ19fcHJvdG9fXycgaW4ge30gPyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgZnVuY3Rpb24odGVzdCwgYnVnZ3ksIHNldCl7XG4gICAgICB0cnkge1xuICAgICAgICBzZXQgPSByZXF1aXJlKCcuL19jdHgnKShGdW5jdGlvbi5jYWxsLCByZXF1aXJlKCcuL19vYmplY3QtZ29wZCcpLmYoT2JqZWN0LnByb3RvdHlwZSwgJ19fcHJvdG9fXycpLnNldCwgMik7XG4gICAgICAgIHNldCh0ZXN0LCBbXSk7XG4gICAgICAgIGJ1Z2d5ID0gISh0ZXN0IGluc3RhbmNlb2YgQXJyYXkpO1xuICAgICAgfSBjYXRjaChlKXsgYnVnZ3kgPSB0cnVlOyB9XG4gICAgICByZXR1cm4gZnVuY3Rpb24gc2V0UHJvdG90eXBlT2YoTywgcHJvdG8pe1xuICAgICAgICBjaGVjayhPLCBwcm90byk7XG4gICAgICAgIGlmKGJ1Z2d5KU8uX19wcm90b19fID0gcHJvdG87XG4gICAgICAgIGVsc2Ugc2V0KE8sIHByb3RvKTtcbiAgICAgICAgcmV0dXJuIE87XG4gICAgICB9O1xuICAgIH0oe30sIGZhbHNlKSA6IHVuZGVmaW5lZCksXG4gIGNoZWNrOiBjaGVja1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL19zZXQtcHJvdG8uanNcbiAqKi8iLCJ2YXIgcElFICAgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtcGllJylcclxuICAsIGNyZWF0ZURlc2MgICAgID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpXHJcbiAgLCB0b0lPYmplY3QgICAgICA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxyXG4gICwgdG9QcmltaXRpdmUgICAgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKVxyXG4gICwgaGFzICAgICAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxyXG4gICwgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuL19pZTgtZG9tLWRlZmluZScpXHJcbiAgLCBnT1BEICAgICAgICAgICA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XHJcblxyXG5leHBvcnRzLmYgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gZ09QRCA6IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKXtcclxuICBPID0gdG9JT2JqZWN0KE8pO1xyXG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcclxuICBpZihJRThfRE9NX0RFRklORSl0cnkge1xyXG4gICAgcmV0dXJuIGdPUEQoTywgUCk7XHJcbiAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxyXG4gIGlmKGhhcyhPLCBQKSlyZXR1cm4gY3JlYXRlRGVzYyghcElFLmYuY2FsbChPLCBQKSwgT1tQXSk7XHJcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWdvcGQuanNcbiAqKi8iLCIvLyA3LjMuMjAgU3BlY2llc0NvbnN0cnVjdG9yKE8sIGRlZmF1bHRDb25zdHJ1Y3RvcilcbnZhciBhbk9iamVjdCAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKVxuICAsIFNQRUNJRVMgICA9IHJlcXVpcmUoJy4vX3drcycpKCdzcGVjaWVzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKE8sIEQpe1xuICB2YXIgQyA9IGFuT2JqZWN0KE8pLmNvbnN0cnVjdG9yLCBTO1xuICByZXR1cm4gQyA9PT0gdW5kZWZpbmVkIHx8IChTID0gYW5PYmplY3QoQylbU1BFQ0lFU10pID09IHVuZGVmaW5lZCA/IEQgOiBhRnVuY3Rpb24oUyk7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX3NwZWNpZXMtY29uc3RydWN0b3IuanNcbiAqKi8iLCJ2YXIgY3R4ICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fY3R4JylcbiAgLCBpbnZva2UgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19pbnZva2UnKVxuICAsIGh0bWwgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2h0bWwnKVxuICAsIGNlbCAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKVxuICAsIGdsb2JhbCAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgcHJvY2VzcyAgICAgICAgICAgID0gZ2xvYmFsLnByb2Nlc3NcbiAgLCBzZXRUYXNrICAgICAgICAgICAgPSBnbG9iYWwuc2V0SW1tZWRpYXRlXG4gICwgY2xlYXJUYXNrICAgICAgICAgID0gZ2xvYmFsLmNsZWFySW1tZWRpYXRlXG4gICwgTWVzc2FnZUNoYW5uZWwgICAgID0gZ2xvYmFsLk1lc3NhZ2VDaGFubmVsXG4gICwgY291bnRlciAgICAgICAgICAgID0gMFxuICAsIHF1ZXVlICAgICAgICAgICAgICA9IHt9XG4gICwgT05SRUFEWVNUQVRFQ0hBTkdFID0gJ29ucmVhZHlzdGF0ZWNoYW5nZSdcbiAgLCBkZWZlciwgY2hhbm5lbCwgcG9ydDtcbnZhciBydW4gPSBmdW5jdGlvbigpe1xuICB2YXIgaWQgPSArdGhpcztcbiAgaWYocXVldWUuaGFzT3duUHJvcGVydHkoaWQpKXtcbiAgICB2YXIgZm4gPSBxdWV1ZVtpZF07XG4gICAgZGVsZXRlIHF1ZXVlW2lkXTtcbiAgICBmbigpO1xuICB9XG59O1xudmFyIGxpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQpe1xuICBydW4uY2FsbChldmVudC5kYXRhKTtcbn07XG4vLyBOb2RlLmpzIDAuOSsgJiBJRTEwKyBoYXMgc2V0SW1tZWRpYXRlLCBvdGhlcndpc2U6XG5pZighc2V0VGFzayB8fCAhY2xlYXJUYXNrKXtcbiAgc2V0VGFzayA9IGZ1bmN0aW9uIHNldEltbWVkaWF0ZShmbil7XG4gICAgdmFyIGFyZ3MgPSBbXSwgaSA9IDE7XG4gICAgd2hpbGUoYXJndW1lbnRzLmxlbmd0aCA+IGkpYXJncy5wdXNoKGFyZ3VtZW50c1tpKytdKTtcbiAgICBxdWV1ZVsrK2NvdW50ZXJdID0gZnVuY3Rpb24oKXtcbiAgICAgIGludm9rZSh0eXBlb2YgZm4gPT0gJ2Z1bmN0aW9uJyA/IGZuIDogRnVuY3Rpb24oZm4pLCBhcmdzKTtcbiAgICB9O1xuICAgIGRlZmVyKGNvdW50ZXIpO1xuICAgIHJldHVybiBjb3VudGVyO1xuICB9O1xuICBjbGVhclRhc2sgPSBmdW5jdGlvbiBjbGVhckltbWVkaWF0ZShpZCl7XG4gICAgZGVsZXRlIHF1ZXVlW2lkXTtcbiAgfTtcbiAgLy8gTm9kZS5qcyAwLjgtXG4gIGlmKHJlcXVpcmUoJy4vX2NvZicpKHByb2Nlc3MpID09ICdwcm9jZXNzJyl7XG4gICAgZGVmZXIgPSBmdW5jdGlvbihpZCl7XG4gICAgICBwcm9jZXNzLm5leHRUaWNrKGN0eChydW4sIGlkLCAxKSk7XG4gICAgfTtcbiAgLy8gQnJvd3NlcnMgd2l0aCBNZXNzYWdlQ2hhbm5lbCwgaW5jbHVkZXMgV2ViV29ya2Vyc1xuICB9IGVsc2UgaWYoTWVzc2FnZUNoYW5uZWwpe1xuICAgIGNoYW5uZWwgPSBuZXcgTWVzc2FnZUNoYW5uZWw7XG4gICAgcG9ydCAgICA9IGNoYW5uZWwucG9ydDI7XG4gICAgY2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2UgPSBsaXN0ZW5lcjtcbiAgICBkZWZlciA9IGN0eChwb3J0LnBvc3RNZXNzYWdlLCBwb3J0LCAxKTtcbiAgLy8gQnJvd3NlcnMgd2l0aCBwb3N0TWVzc2FnZSwgc2tpcCBXZWJXb3JrZXJzXG4gIC8vIElFOCBoYXMgcG9zdE1lc3NhZ2UsIGJ1dCBpdCdzIHN5bmMgJiB0eXBlb2YgaXRzIHBvc3RNZXNzYWdlIGlzICdvYmplY3QnXG4gIH0gZWxzZSBpZihnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lciAmJiB0eXBlb2YgcG9zdE1lc3NhZ2UgPT0gJ2Z1bmN0aW9uJyAmJiAhZ2xvYmFsLmltcG9ydFNjcmlwdHMpe1xuICAgIGRlZmVyID0gZnVuY3Rpb24oaWQpe1xuICAgICAgZ2xvYmFsLnBvc3RNZXNzYWdlKGlkICsgJycsICcqJyk7XG4gICAgfTtcbiAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGxpc3RlbmVyLCBmYWxzZSk7XG4gIC8vIElFOC1cbiAgfSBlbHNlIGlmKE9OUkVBRFlTVEFURUNIQU5HRSBpbiBjZWwoJ3NjcmlwdCcpKXtcbiAgICBkZWZlciA9IGZ1bmN0aW9uKGlkKXtcbiAgICAgIGh0bWwuYXBwZW5kQ2hpbGQoY2VsKCdzY3JpcHQnKSlbT05SRUFEWVNUQVRFQ0hBTkdFXSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIGh0bWwucmVtb3ZlQ2hpbGQodGhpcyk7XG4gICAgICAgIHJ1bi5jYWxsKGlkKTtcbiAgICAgIH07XG4gICAgfTtcbiAgLy8gUmVzdCBvbGQgYnJvd3NlcnNcbiAgfSBlbHNlIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uKGlkKXtcbiAgICAgIHNldFRpbWVvdXQoY3R4KHJ1biwgaWQsIDEpLCAwKTtcbiAgICB9O1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2V0OiAgIHNldFRhc2ssXG4gIGNsZWFyOiBjbGVhclRhc2tcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fdGFzay5qc1xuICoqLyIsIi8vIGZhc3QgYXBwbHksIGh0dHA6Ly9qc3BlcmYubG5raXQuY29tL2Zhc3QtYXBwbHkvNVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihmbiwgYXJncywgdGhhdCl7XG4gIHZhciB1biA9IHRoYXQgPT09IHVuZGVmaW5lZDtcbiAgc3dpdGNoKGFyZ3MubGVuZ3RoKXtcbiAgICBjYXNlIDA6IHJldHVybiB1biA/IGZuKClcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCk7XG4gICAgY2FzZSAxOiByZXR1cm4gdW4gPyBmbihhcmdzWzBdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdKTtcbiAgICBjYXNlIDI6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0sIGFyZ3NbMV0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0sIGFyZ3NbMV0pO1xuICAgIGNhc2UgMzogcmV0dXJuIHVuID8gZm4oYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSk7XG4gICAgY2FzZSA0OiByZXR1cm4gdW4gPyBmbihhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdLCBhcmdzWzNdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdLCBhcmdzWzNdKTtcbiAgfSByZXR1cm4gICAgICAgICAgICAgIGZuLmFwcGx5KHRoYXQsIGFyZ3MpO1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL19pbnZva2UuanNcbiAqKi8iLCJ2YXIgZ2xvYmFsICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBtYWNyb3Rhc2sgPSByZXF1aXJlKCcuL190YXNrJykuc2V0XG4gICwgT2JzZXJ2ZXIgID0gZ2xvYmFsLk11dGF0aW9uT2JzZXJ2ZXIgfHwgZ2xvYmFsLldlYktpdE11dGF0aW9uT2JzZXJ2ZXJcbiAgLCBwcm9jZXNzICAgPSBnbG9iYWwucHJvY2Vzc1xuICAsIFByb21pc2UgICA9IGdsb2JhbC5Qcm9taXNlXG4gICwgaXNOb2RlICAgID0gcmVxdWlyZSgnLi9fY29mJykocHJvY2VzcykgPT0gJ3Byb2Nlc3MnXG4gICwgaGVhZCwgbGFzdCwgbm90aWZ5O1xuXG52YXIgZmx1c2ggPSBmdW5jdGlvbigpe1xuICB2YXIgcGFyZW50LCBmbjtcbiAgaWYoaXNOb2RlICYmIChwYXJlbnQgPSBwcm9jZXNzLmRvbWFpbikpcGFyZW50LmV4aXQoKTtcbiAgd2hpbGUoaGVhZCl7XG4gICAgZm4gPSBoZWFkLmZuO1xuICAgIGZuKCk7IC8vIDwtIGN1cnJlbnRseSB3ZSB1c2UgaXQgb25seSBmb3IgUHJvbWlzZSAtIHRyeSAvIGNhdGNoIG5vdCByZXF1aXJlZFxuICAgIGhlYWQgPSBoZWFkLm5leHQ7XG4gIH0gbGFzdCA9IHVuZGVmaW5lZDtcbiAgaWYocGFyZW50KXBhcmVudC5lbnRlcigpO1xufTtcblxuLy8gTm9kZS5qc1xuaWYoaXNOb2RlKXtcbiAgbm90aWZ5ID0gZnVuY3Rpb24oKXtcbiAgICBwcm9jZXNzLm5leHRUaWNrKGZsdXNoKTtcbiAgfTtcbi8vIGJyb3dzZXJzIHdpdGggTXV0YXRpb25PYnNlcnZlclxufSBlbHNlIGlmKE9ic2VydmVyKXtcbiAgdmFyIHRvZ2dsZSA9IHRydWVcbiAgICAsIG5vZGUgICA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKTtcbiAgbmV3IE9ic2VydmVyKGZsdXNoKS5vYnNlcnZlKG5vZGUsIHtjaGFyYWN0ZXJEYXRhOiB0cnVlfSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3XG4gIG5vdGlmeSA9IGZ1bmN0aW9uKCl7XG4gICAgbm9kZS5kYXRhID0gdG9nZ2xlID0gIXRvZ2dsZTtcbiAgfTtcbi8vIGVudmlyb25tZW50cyB3aXRoIG1heWJlIG5vbi1jb21wbGV0ZWx5IGNvcnJlY3QsIGJ1dCBleGlzdGVudCBQcm9taXNlXG59IGVsc2UgaWYoUHJvbWlzZSAmJiBQcm9taXNlLnJlc29sdmUpe1xuICBub3RpZnkgPSBmdW5jdGlvbigpe1xuICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oZmx1c2gpO1xuICB9O1xuLy8gZm9yIG90aGVyIGVudmlyb25tZW50cyAtIG1hY3JvdGFzayBiYXNlZCBvbjpcbi8vIC0gc2V0SW1tZWRpYXRlXG4vLyAtIE1lc3NhZ2VDaGFubmVsXG4vLyAtIHdpbmRvdy5wb3N0TWVzc2FnXG4vLyAtIG9ucmVhZHlzdGF0ZWNoYW5nZVxuLy8gLSBzZXRUaW1lb3V0XG59IGVsc2Uge1xuICBub3RpZnkgPSBmdW5jdGlvbigpe1xuICAgIC8vIHN0cmFuZ2UgSUUgKyB3ZWJwYWNrIGRldiBzZXJ2ZXIgYnVnIC0gdXNlIC5jYWxsKGdsb2JhbClcbiAgICBtYWNyb3Rhc2suY2FsbChnbG9iYWwsIGZsdXNoKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihmbil7XG4gIHZhciB0YXNrID0ge2ZuOiBmbiwgbmV4dDogdW5kZWZpbmVkfTtcbiAgaWYobGFzdClsYXN0Lm5leHQgPSB0YXNrO1xuICBpZighaGVhZCl7XG4gICAgaGVhZCA9IHRhc2s7XG4gICAgbm90aWZ5KCk7XG4gIH0gbGFzdCA9IHRhc2s7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX21pY3JvdGFzay5qc1xuICoqLyIsInZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHRhcmdldCwgc3JjLCBzYWZlKXtcbiAgZm9yKHZhciBrZXkgaW4gc3JjKXJlZGVmaW5lKHRhcmdldCwga2V5LCBzcmNba2V5XSwgc2FmZSk7XG4gIHJldHVybiB0YXJnZXQ7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX3JlZGVmaW5lLWFsbC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBnbG9iYWwgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgZFAgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKVxuICAsIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKVxuICAsIFNQRUNJRVMgICAgID0gcmVxdWlyZSgnLi9fd2tzJykoJ3NwZWNpZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihLRVkpe1xuICB2YXIgQyA9IGdsb2JhbFtLRVldO1xuICBpZihERVNDUklQVE9SUyAmJiBDICYmICFDW1NQRUNJRVNdKWRQLmYoQywgU1BFQ0lFUywge1xuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzOyB9XG4gIH0pO1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL19zZXQtc3BlY2llcy5qc1xuICoqLyIsInZhciBJVEVSQVRPUiAgICAgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKVxuICAsIFNBRkVfQ0xPU0lORyA9IGZhbHNlO1xuXG50cnkge1xuICB2YXIgcml0ZXIgPSBbN11bSVRFUkFUT1JdKCk7XG4gIHJpdGVyWydyZXR1cm4nXSA9IGZ1bmN0aW9uKCl7IFNBRkVfQ0xPU0lORyA9IHRydWU7IH07XG4gIEFycmF5LmZyb20ocml0ZXIsIGZ1bmN0aW9uKCl7IHRocm93IDI7IH0pO1xufSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGV4ZWMsIHNraXBDbG9zaW5nKXtcbiAgaWYoIXNraXBDbG9zaW5nICYmICFTQUZFX0NMT1NJTkcpcmV0dXJuIGZhbHNlO1xuICB2YXIgc2FmZSA9IGZhbHNlO1xuICB0cnkge1xuICAgIHZhciBhcnIgID0gWzddXG4gICAgICAsIGl0ZXIgPSBhcnJbSVRFUkFUT1JdKCk7XG4gICAgaXRlci5uZXh0ID0gZnVuY3Rpb24oKXsgc2FmZSA9IHRydWU7IH07XG4gICAgYXJyW0lURVJBVE9SXSA9IGZ1bmN0aW9uKCl7IHJldHVybiBpdGVyOyB9O1xuICAgIGV4ZWMoYXJyKTtcbiAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxuICByZXR1cm4gc2FmZTtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9faXRlci1kZXRlY3QuanNcbiAqKi8iLCJjb25zdCB7XG4gIHNldFRpbWVvdXQsIHNldFRpbWVvdXROYXRpdmVcbn0gPSBnbG9iYWxcblxuLy8gZml4IG5vIHNldFRpbWVvdXQgb24gQW5kcm9pZCBWOFxuaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAndW5kZWZpbmVkJyAmJlxuICB0eXBlb2Ygc2V0VGltZW91dE5hdGl2ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICBjb25zdCB0aW1lb3V0TWFwID0ge31cbiAgbGV0IHRpbWVvdXRJZCA9IDBcbiAgZ2xvYmFsLnNldFRpbWVvdXQgPSAoY2IsIHRpbWUpID0+IHtcbiAgICB0aW1lb3V0TWFwWysrdGltZW91dElkXSA9IGNiXG4gICAgc2V0VGltZW91dE5hdGl2ZSh0aW1lb3V0SWQudG9TdHJpbmcoKSwgdGltZSlcbiAgfVxuICBnbG9iYWwuc2V0VGltZW91dENhbGxiYWNrID0gKGlkKSA9PiB7XG4gICAgaWYgKHR5cGVvZiB0aW1lb3V0TWFwW2lkXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGltZW91dE1hcFtpZF0oKVxuICAgICAgZGVsZXRlIHRpbWVvdXRNYXBbaWRdXG4gICAgfVxuICB9XG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9wb2x5ZmlsbC9zZXRUaW1lb3V0LmpzXG4gKiovIiwiY29uc3Qge2NvbnNvbGV9ID0gZ2xvYmFsXG5cbmlmICh0eXBlb2YgY29uc29sZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgZ2xvYmFsLmNvbnNvbGUgPSB7XG4gICAgbG9nOiAoLi4uYXJncykgPT4ge1xuICAgICAgaWYgKHR5cGVvZiBuYXRpdmVMb2cgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgbmF0aXZlTG9nKC4uLmFyZ3MpXG4gICAgICB9XG4gICAgfSxcbiAgICBlcnJvcjogKC4uLmFyZ3MpID0+IHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihhcmdzKVxuICAgIH1cbiAgfVxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vcG9seWZpbGwvY29uc29sZWxvZy5qc1xuICoqLyIsIi8qKlxuICogQGZpbGVPdmVydmlldyBNYWluIGVudHJ5LCBpbnN0YW5jZSBtYW5hZ2VyXG4gKlxuICogLSBjcmVhdGVJbnN0YW5jZShpbnN0YW5jZUlkLCBjb2RlLCBvcHRpb25zLCBkYXRhKVxuICogLSByZWZyZXNoSW5zdGFuY2UoaW5zdGFuY2VJZCwgZGF0YSlcbiAqIC0gZGVzdHJveUluc3RhbmNlKGluc3RhbmNlSWQpXG4gKiAtIHJlZ2lzdGVyQ29tcG9uZW50cyhjb21wb25lbnRzKVxuICogLSByZWdpc3Rlck1vZHVsZXMobW9kdWxlcylcbiAqIC0gZ2V0Um9vdChpbnN0YW5jZUlkKVxuICogLSBpbnN0YW5jZU1hcFxuICogLSBjYWxsSlMoaW5zdGFuY2VJZCwgdGFza3MpXG4gKiAgIC0gZmlyZUV2ZW50KHJlZiwgdHlwZSwgZGF0YSlcbiAqICAgLSBjYWxsYmFjayhmdW5jSWQsIGRhdGEpXG4gKi9cblxuaW1wb3J0ICogYXMgcGVyZiBmcm9tICcuL3BlcmYnXG5pbXBvcnQgKiBhcyBjb25maWcgZnJvbSAnLi9jb25maWcnXG5pbXBvcnQgQXBwSW5zdGFuY2UgZnJvbSAnLi9hcHAnXG5pbXBvcnQgVm0gZnJvbSAnLi92bSdcblxudmFyIHtcbiAgbmF0aXZlQ29tcG9uZW50TWFwXG59ID0gY29uZmlnXG52YXIgaW5zdGFuY2VNYXAgPSB7fVxuXG4vKipcbiAqIGNyZWF0ZSBhIFdlZXggaW5zdGFuY2VcbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9IGluc3RhbmNlSWRcbiAqIEBwYXJhbSAge3N0cmluZ30gY29kZVxuICogQHBhcmFtICB7b2JqZWN0fSBbb3B0aW9uc10gb3B0aW9uIGBIQVNfTE9HYCBlbmFibGUgcHJpbnQgbG9nXG4gKiBAcGFyYW0gIHtvYmplY3R9IFtkYXRhXVxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2UoaW5zdGFuY2VJZCwgY29kZSwgb3B0aW9ucywgZGF0YSkge1xuICB2YXIgaW5zdGFuY2UgPSBpbnN0YW5jZU1hcFtpbnN0YW5jZUlkXVxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuXG4gIGNvbmZpZy5kZWJ1ZyA9IG9wdGlvbnMuZGVidWdcblxuICB2YXIgcmVzdWx0XG4gIGlmICghaW5zdGFuY2UpIHtcbiAgICBwZXJmLnN0YXJ0KCdjcmVhdGVJbnN0YW5jZScsIGluc3RhbmNlSWQpXG4gICAgaW5zdGFuY2UgPSBuZXcgQXBwSW5zdGFuY2UoaW5zdGFuY2VJZCwgb3B0aW9ucylcbiAgICBpbnN0YW5jZU1hcFtpbnN0YW5jZUlkXSA9IGluc3RhbmNlXG4gICAgcmVzdWx0ID0gaW5zdGFuY2UuaW5pdChjb2RlLCBkYXRhKVxuICAgIHBlcmYuZW5kKCdjcmVhdGVJbnN0YW5jZScsIGluc3RhbmNlSWQpXG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ID0gbmV3IEVycm9yKGBpbnZhbGlkIGluc3RhbmNlIGlkIFwiJHtpbnN0YW5jZUlkfVwiYClcbiAgfVxuXG4gIHJldHVybiByZXN1bHRcbn1cblxuLyoqXG4gKiByZWZyZXNoIGEgV2VleCBpbnN0YW5jZVxuICpcbiAqIEBwYXJhbSAge3N0cmluZ30gaW5zdGFuY2VJZFxuICogQHBhcmFtICB7b2JqZWN0fSBkYXRhXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZWZyZXNoSW5zdGFuY2UoaW5zdGFuY2VJZCwgZGF0YSkge1xuICB2YXIgaW5zdGFuY2UgPSBpbnN0YW5jZU1hcFtpbnN0YW5jZUlkXVxuICB2YXIgcmVzdWx0XG4gIGlmIChpbnN0YW5jZSkge1xuICAgIHBlcmYuc3RhcnQoJ3JlZnJlc2hEYXRhJywgaW5zdGFuY2VJZClcbiAgICByZXN1bHQgPSBpbnN0YW5jZS5yZWZyZXNoRGF0YShkYXRhKVxuICAgIHBlcmYuZW5kKCdyZWZyZXNoRGF0YScsIGluc3RhbmNlSWQpXG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ID0gbmV3IEVycm9yKGBpbnZhbGlkIGluc3RhbmNlIGlkIFwiJHtpbnN0YW5jZUlkfVwiYClcbiAgfVxuICByZXR1cm4gcmVzdWx0XG59XG5cbi8qKlxuICogZGVzdHJveSBhIFdlZXggaW5zdGFuY2VcbiAqIEBwYXJhbSAge3N0cmluZ30gaW5zdGFuY2VJZFxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVzdHJveUluc3RhbmNlKGluc3RhbmNlSWQpIHtcbiAgdmFyIGluc3RhbmNlID0gaW5zdGFuY2VNYXBbaW5zdGFuY2VJZF1cbiAgaWYgKCFpbnN0YW5jZSkge1xuICAgIHJldHVybiBuZXcgRXJyb3IoYGludmFsaWQgaW5zdGFuY2UgaWQgXCIke2luc3RhbmNlSWR9XCJgKVxuICB9XG5cbiAgcGVyZi5zdGFydCgnZGVzdHJveUluc3RhbmNlJywgaW5zdGFuY2VJZClcbiAgaW5zdGFuY2UuZGVzdHJveSgpXG4gIGRlbGV0ZSBpbnN0YW5jZU1hcFtpbnN0YW5jZUlkXVxuICBwZXJmLmVuZCgnZGVzdHJveUluc3RhbmNlJywgaW5zdGFuY2VJZClcblxuICByZXR1cm4gaW5zdGFuY2VNYXBcbn1cblxuLyoqXG4gKiByZWdpc3RlciB0aGUgbmFtZSBvZiBlYWNoIG5hdGl2ZSBjb21wb25lbnRcbiAqIEBwYXJhbSAge2FycmF5fSBjb21wb25lbnRzIGFycmF5IG9mIG5hbWVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyQ29tcG9uZW50cyhjb21wb25lbnRzKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGNvbXBvbmVudHMpKSB7XG4gICAgY29tcG9uZW50cy5mb3JFYWNoKGZ1bmN0aW9uIHJlZ2lzdGVyKG5hbWUpIHtcbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgaWYgKCFuYW1lKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBuYW1lID09PSAnc3RyaW5nJykge1xuICAgICAgICBuYXRpdmVDb21wb25lbnRNYXBbbmFtZV0gPSB0cnVlXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBuYW1lID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbmFtZS50eXBlID09PSAnc3RyaW5nJykge1xuICAgICAgICBuYXRpdmVDb21wb25lbnRNYXBbbmFtZS50eXBlXSA9IG5hbWVcbiAgICAgIH1cbiAgICB9KVxuICB9XG59XG5cbi8qKlxuICogcmVnaXN0ZXIgdGhlIG5hbWUgYW5kIG1ldGhvZHMgb2YgZWFjaCBtb2R1bGVcbiAqIEBwYXJhbSAge29iamVjdH0gbW9kdWxlcyBhIG9iamVjdCBvZiBtb2R1bGVzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3Rlck1vZHVsZXMobW9kdWxlcykge1xuICBpZiAodHlwZW9mIG1vZHVsZXMgPT09ICdvYmplY3QnKSB7XG4gICAgVm0ucmVnaXN0ZXJNb2R1bGVzKG1vZHVsZXMpXG4gIH1cbn1cblxuLyoqXG4gKiByZWdpc3RlciB0aGUgbmFtZSBhbmQgbWV0aG9kcyBvZiBlYWNoIGFwaVxuICogQHBhcmFtICB7b2JqZWN0fSBhcGlzIGEgb2JqZWN0IG9mIGFwaXNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyTWV0aG9kcyhhcGlzKSB7XG4gIGlmICh0eXBlb2YgYXBpcyA9PT0gJ29iamVjdCcpIHtcbiAgICBWbS5yZWdpc3Rlck1ldGhvZHMoYXBpcylcbiAgfVxufVxuXG4vKipcbiAqIGdldCBhIHdob2xlIGVsZW1lbnQgdHJlZSBvZiBhbiBpbnN0YW5jZVxuICogZm9yIGRlYnVnZ2luZ1xuICogQHBhcmFtICB7c3RyaW5nfSBpbnN0YW5jZUlkXG4gKiBAcmV0dXJuIHtvYmplY3R9IGEgdmlydHVhbCBkb20gdHJlZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Um9vdChpbnN0YW5jZUlkKSB7XG4gIHZhciBpbnN0YW5jZSA9IGluc3RhbmNlTWFwW2luc3RhbmNlSWRdXG4gIHZhciByZXN1bHRcbiAgaWYgKGluc3RhbmNlKSB7XG4gICAgcmVzdWx0ID0gaW5zdGFuY2UuZ2V0Um9vdEVsZW1lbnQoKVxuICB9IGVsc2Uge1xuICAgIHJlc3VsdCA9IG5ldyBFcnJvcihgaW52YWxpZCBpbnN0YW5jZSBpZCBcIiR7aW5zdGFuY2VJZH1cImApXG4gIH1cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG52YXIganNIYW5kbGVycyA9IHtcbiAgZmlyZUV2ZW50OiBmdW5jdGlvbiBmaXJlRXZlbnQoaW5zdGFuY2VJZCwgcmVmLCB0eXBlLCBkYXRhKSB7XG4gICAgdmFyIGluc3RhbmNlID0gaW5zdGFuY2VNYXBbaW5zdGFuY2VJZF1cbiAgICB2YXIgcmVzdWx0XG4gICAgcGVyZi5zdGFydCgnZmlyZUV2ZW50JywgaW5zdGFuY2VJZCArICctJyArIHJlZiArICctJyArIHR5cGUpXG4gICAgcmVzdWx0ID0gaW5zdGFuY2UuZmlyZUV2ZW50KHJlZiwgdHlwZSwgZGF0YSlcbiAgICBwZXJmLmVuZCgnZmlyZUV2ZW50JywgaW5zdGFuY2VJZCArICctJyArIHJlZiArICctJyArIHR5cGUpXG4gICAgcmV0dXJuIHJlc3VsdFxuICB9LFxuXG4gIGNhbGxiYWNrOiBmdW5jdGlvbiBjYWxsYmFjayhpbnN0YW5jZUlkLCBmdW5jSWQsIGRhdGEsIGlmTGFzdCkge1xuICAgIHZhciBpbnN0YW5jZSA9IGluc3RhbmNlTWFwW2luc3RhbmNlSWRdXG4gICAgdmFyIHJlc3VsdFxuICAgIHBlcmYuc3RhcnQoJ2NhbGxiYWNrJyxcbiAgICAgIGluc3RhbmNlSWQgKyAnLScgKyBmdW5jSWQgKyAnLScgKyBkYXRhICsgJy0nICsgaWZMYXN0KVxuICAgIHJlc3VsdCA9IGluc3RhbmNlLmNhbGxiYWNrKGZ1bmNJZCwgZGF0YSwgaWZMYXN0KVxuICAgIHBlcmYuZW5kKCdjYWxsYmFjaycsXG4gICAgICBpbnN0YW5jZUlkICsgJy0nICsgZnVuY0lkICsgJy0nICsgZGF0YSArICctJyArIGlmTGFzdClcbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cbn1cblxuLyoqXG4gKiBhY2NlcHQgY2FsbHMgZnJvbSBuYXRpdmUgKGV2ZW50IG9yIGNhbGxiYWNrKVxuICpcbiAqIEBwYXJhbSAge3N0cmluZ30gaW5zdGFuY2VJZFxuICogQHBhcmFtICB7YXJyYXl9IHRhc2tzIGxpc3Qgd2l0aCBgbWV0aG9kYCBhbmQgYGFyZ3NgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYWxsSlMoaW5zdGFuY2VJZCwgdGFza3MpIHtcbiAgY29uc3QgaW5zdGFuY2UgPSBpbnN0YW5jZU1hcFtpbnN0YW5jZUlkXVxuICBsZXQgcmVzdWx0cyA9IFtdXG4gIGlmIChpbnN0YW5jZSAmJiBBcnJheS5pc0FycmF5KHRhc2tzKSkge1xuICAgIHRhc2tzLmZvckVhY2goKHRhc2spID0+IHtcbiAgICAgIGNvbnN0IGhhbmRsZXIgPSBqc0hhbmRsZXJzW3Rhc2subWV0aG9kXVxuICAgICAgY29uc3QgYXJncyA9IFsuLi50YXNrLmFyZ3NdXG4gICAgICBpZiAodHlwZW9mIGhhbmRsZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgbG9nKCdqYXZhc2NyaXB0OicsIHRhc2subWV0aG9kLCB0YXNrLmFyZ3MpXG4gICAgICAgIGFyZ3MudW5zaGlmdChpbnN0YW5jZUlkKVxuICAgICAgICByZXN1bHRzLnB1c2goaGFuZGxlciguLi5hcmdzKSlcbiAgICAgIH1cbiAgICB9KVxuICB9IGVsc2Uge1xuICAgIHJlc3VsdHMucHVzaChuZXcgRXJyb3IoYGludmFsaWQgaW5zdGFuY2UgaWQgXCIke2luc3RhbmNlSWR9XCIgb3IgdGFza3NgKSlcbiAgfVxuXG4gIHJldHVybiByZXN1bHRzXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2xpYi9mcmFtZXdvcmsuanNcbiAqKi8iLCJpbXBvcnQgbG9nIGZyb20gJy4vbG9nJ1xuXG52YXIgZGF0YSA9IHt0eXBlOiAncm9vdCcsIGNoaWxkcmVuOiBbXX1cbnZhciBjdXJyZW50ID0gZGF0YVxudmFyIHN0YWNrID0gW2N1cnJlbnRdXG5cbmZ1bmN0aW9uIHNwYWNlcyhudW0pIHtcbiAgcmV0dXJuIEFycmF5KG51bSkuam9pbignICcpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdGFydCh0eXBlLCBpZCkge1xuICB2YXIgdGFzayA9IHt0eXBlOiB0eXBlLCBpZDogaWQsIGNoaWxkcmVuOiBbXSwgc3RhcnQ6IERhdGUubm93KCl9XG4gIGN1cnJlbnQuY2hpbGRyZW4ucHVzaCh0YXNrKVxuICBzdGFjay5wdXNoKHRhc2spXG4gIGN1cnJlbnQgPSB0YXNrXG4gIGxvZygncGVyZjonICsgc3BhY2VzKHN0YWNrLmxlbmd0aCAtIDEpLCAnc3RhcnQnLCB0YXNrLnR5cGUsIHRhc2suaWQpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbmQodHlwZSwgaWQpIHtcbiAgdmFyIHRhc2sgPSBzdGFjay5wb3AoKVxuICB0YXNrLmVuZCA9IERhdGUubm93KClcbiAgY3VycmVudCA9IHN0YWNrW3N0YWNrLmxlbmd0aCAtIDFdXG4gIGxvZygncGVyZjonICsgc3BhY2VzKHN0YWNrLmxlbmd0aCksICdlbmQnLFxuICAgICh0YXNrLmVuZCAtIHRhc2suc3RhcnQpICsgJ21zJywgdGFzay50eXBlLCB0YXNrLmlkKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVzZXQoKSB7XG4gIGRhdGEuY2hpbGRyZW4gPSBbXVxuICBjdXJyZW50ID0gZGF0YVxuICBzdGFjay5sZW5ndGggPSAwXG4gIHN0YWNrLnB1c2goY3VycmVudClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvSlNPTigpIHtcbiAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZGF0YSkpXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2xpYi9wZXJmLmpzXG4gKiovIiwiaW1wb3J0ICogYXMgY29uZmlnIGZyb20gJy4vY29uZmlnJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsb2coLi4uYXJncykge1xuICBpZiAoY29uZmlnLmRlYnVnKSB7XG4gICAgZ2xvYmFsLmNvbnNvbGUubG9nKC4uLmFyZ3MpXG4gIH1cbn1cblxuZ2xvYmFsLmxvZyA9IGxvZ1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vbGliL2xvZy5qc1xuICoqLyIsImV4cG9ydCBjb25zdCBuYXRpdmVDb21wb25lbnRNYXAgPSB7XG4gIHRleHQ6IHRydWUsXG4gIGltYWdlOiB0cnVlLFxuICBjb250YWluZXI6IHRydWUsXG4gIHNsaWRlcjoge1xuICAgIHR5cGU6ICdzbGlkZXInLFxuICAgIGFwcGVuZDogJ3RyZWUnXG4gIH0sXG4gIGNlbGw6IHtcbiAgICB0eXBlOiAnY2VsbCcsXG4gICAgYXBwZW5kOiAndHJlZSdcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgY3VzdG9tQ29tcG9uZW50TWFwID0ge31cblxuZXhwb3J0IHZhciBkZWJ1ZyA9IGZhbHNlXG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vbGliL2NvbmZpZy5qc1xuICoqLyIsIi8qKlxuICogQGZpbGVPdmVydmlld1xuICogV2VleCBpbnN0YW5jZSBjb25zdHJ1Y3RvciAmIGRlZmluaXRpb25cbiAqL1xuXG5pbXBvcnQge3R5cG9mLCBleHRlbmR9IGZyb20gJy4uL3V0aWwnXG5pbXBvcnQgKiBhcyBwZXJmIGZyb20gJy4uL3BlcmYnXG5pbXBvcnQgKiBhcyBidW5kbGUgZnJvbSAnLi9idW5kbGUnXG5pbXBvcnQgKiBhcyBjdHJsIGZyb20gJy4vY3RybCdcbmltcG9ydCBEaWZmZXIgZnJvbSAnLi9kaWZmZXInXG5cbmltcG9ydCBFdmVudE1hbmFnZXIgZnJvbSAnLi9ldmVudCdcbmltcG9ydCBMaXN0ZW5lciBmcm9tICcuL2RvbS1saXN0ZW5lcidcbmltcG9ydCB7RG9jdW1lbnQsIE5vZGV9IGZyb20gJy4vZG9tJ1xuaW1wb3J0IHtyZWdpc3RlckNvbXBvbmVudCwgcmVxdWlyZUNvbXBvbmVudCwgcmVxdWlyZU1vZHVsZX0gZnJvbSAnLi9yZWdpc3RlcidcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQXBwSW5zdGFuY2UoaW5zdGFuY2VJZCwgb3B0aW9ucykge1xuICBwZXJmLnN0YXJ0KCdpbml0SW5zdGFuY2UnLCBpbnN0YW5jZUlkKVxuICB0aGlzLmlkID0gaW5zdGFuY2VJZFxuICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG4gIHRoaXMudm0gPSBudWxsXG4gIHRoaXMuZG9jID0gbmV3IERvY3VtZW50KGluc3RhbmNlSWQpXG4gIHRoaXMuY3VzdG9tQ29tcG9uZW50TWFwID0ge31cbiAgdGhpcy5jYWxsYmFja3MgPSB7fVxuICB0aGlzLmRpZmZlciA9IG5ldyBEaWZmZXIoaW5zdGFuY2VJZClcbiAgdGhpcy51aWQgPSAwXG4gIHRoaXMucmVuZGVyZWQgPSBmYWxzZVxuICB0aGlzLmV2ZW50TWFuYWdlciA9IG5ldyBFdmVudE1hbmFnZXIoKVxuICB0aGlzLmxpc3RlbmVyID0gbmV3IExpc3RlbmVyKHRoaXMuaWQsICh0YXNrcykgPT4ge1xuICAgIHRoaXMuY2FsbFRhc2tzKHRhc2tzKVxuICB9KVxuICB0aGlzLmRvYy5zZXRFdmVudE1hbmFnZXIodGhpcy5ldmVudE1hbmFnZXIpXG4gIHRoaXMuZG9jLnNldExpc3RlbmVyKHRoaXMubGlzdGVuZXIpXG5cbiAgcGVyZi5lbmQoJ2luaXRJbnN0YW5jZScsIGluc3RhbmNlSWQpXG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZShhcHAsIHYpIHtcbiAgdmFyIHR5cGUgPSB0eXBvZih2KVxuXG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgJ3VuZGVmaW5lZCc6XG4gICAgY2FzZSAnbnVsbCc6XG4gICAgICByZXR1cm4gJydcbiAgICBjYXNlICdyZWdleHAnOlxuICAgICAgcmV0dXJuIHYudG9TdHJpbmcoKVxuICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgcmV0dXJuIHYudG9JU09TdHJpbmcoKVxuICAgIGNhc2UgJ251bWJlcic6XG4gICAgY2FzZSAnc3RyaW5nJzpcbiAgICBjYXNlICdib29sZWFuJzpcbiAgICBjYXNlICdhcnJheSc6XG4gICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgIGlmICh2IGluc3RhbmNlb2YgTm9kZSkge1xuICAgICAgICByZXR1cm4gdi5yZWZcbiAgICAgIH1cbiAgICAgIHJldHVybiB2XG4gICAgY2FzZSAnZnVuY3Rpb24nOlxuICAgICAgYXBwLmNhbGxiYWNrc1srK2FwcC51aWRdID0gdlxuICAgICAgcmV0dXJuIGFwcC51aWQudG9TdHJpbmcoKVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodilcbiAgfVxufVxuXG5BcHBJbnN0YW5jZS5wcm90b3R5cGUuY2FsbFRhc2tzID0gZnVuY3Rpb24gKHRhc2tzKSB7XG4gIGlmICh0eXBvZih0YXNrcykgIT09ICdhcnJheScpIHtcbiAgICB0YXNrcyA9IFt0YXNrc11cbiAgfVxuXG4gIHRhc2tzLmZvckVhY2goKHRhc2spID0+IHtcbiAgICB0YXNrLmFyZ3MgPSB0YXNrLmFyZ3MubWFwKGFyZyA9PiBub3JtYWxpemUodGhpcywgYXJnKSlcbiAgfSlcblxuICBjYWxsTmF0aXZlKHRoaXMuaWQsIHRhc2tzLCAnLTEnKVxufVxuXG5leHRlbmQoQXBwSW5zdGFuY2UucHJvdG90eXBlLCBidW5kbGUsIGN0cmwsIHtcbiAgcmVnaXN0ZXJDb21wb25lbnQsXG4gIHJlcXVpcmVDb21wb25lbnQsXG4gIHJlcXVpcmVNb2R1bGVcbn0pXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2xpYi9hcHAvaW5kZXguanNcbiAqKi8iLCIvLy8gbGFuZy5qc1xuaW1wb3J0IENvbmZpZyBmcm9tICcuLi9jb25maWcnXG5cbi8qKlxuICogQ2hlY2sgaXMgYSBzdHJpbmcgc3RhcnRzIHdpdGggJCBvciBfXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xuXG5leHBvcnQgdmFyIGlzUmVzZXJ2ZWQgPSAoc3RyKSA9PiB7XG4gIHN0ciArPSAnJ1xuICBsZXQgYyA9IChzdHIgKyAnJykuY2hhckNvZGVBdCgwKVxuICByZXR1cm4gYyA9PT0gMHgyNCB8fCBjID09PSAweDVGXG59XG5cbi8qKlxuICogQ2FtZWxpemUgYSBoeXBoZW4tZGVsbWl0ZWQgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuXG5sZXQgY2FtZWxSRSA9IC8tKFxcdykvZ1xuZnVuY3Rpb24gdG9VcHBlciAoXywgYykge1xuICByZXR1cm4gYyA/IGMudG9VcHBlckNhc2UgKCkgOiAnJ1xufVxuZXhwb3J0IHZhciBjYW1lbGl6ZSA9IChzdHIpID0+IHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKGNhbWVsUkUsIHRvVXBwZXIpXG59XG5cbi8qKlxuICogU2ltcGxlIGJpbmQsIGZhc3RlciB0aGFuIG5hdGl2ZVxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge09iamVjdH0gY3R4XG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqL1xuXG5leHBvcnQgdmFyIGJpbmQgPSBmdW5jdGlvbiAoZm4sIGN0eCkge1xuICByZXR1cm4gZnVuY3Rpb24gKGEpIHtcbiAgICBsZXQgbCA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgICByZXR1cm4gbFxuICAgICAgPyBsID4gMVxuICAgICAgICA/IGZuLmFwcGx5KGN0eCwgYXJndW1lbnRzKVxuICAgICAgICA6IGZuLmNhbGwoY3R4LCBhKVxuICAgICAgOiBmbi5jYWxsKGN0eClcbiAgfVxufVxuXG4vKipcbiAqIENvbnZlcnQgYW4gQXJyYXktbGlrZSBvYmplY3QgdG8gYSByZWFsIEFycmF5LlxuICpcbiAqIEBwYXJhbSB7QXJyYXktbGlrZX0gbGlzdFxuICogQHBhcmFtIHtOdW1iZXJ9IFtzdGFydF0gLSBzdGFydCBpbmRleFxuICogQHJldHVybiB7QXJyYXl9XG4gKi9cblxuZXhwb3J0IHZhciB0b0FycmF5ID0gKGxpc3QsIHN0YXJ0KSA9PiB7XG4gIHN0YXJ0ID0gc3RhcnQgfHwgMFxuICBsZXQgaSA9IGxpc3QubGVuZ3RoIC0gc3RhcnRcbiAgbGV0IHJldCA9IG5ldyBBcnJheShpKVxuICB3aGlsZSAoaS0tKSB7XG4gICAgcmV0W2ldID0gbGlzdFtpICsgc3RhcnRdXG4gIH1cbiAgcmV0dXJuIHJldFxufVxuXG4vKipcbiAqIE1peCBwcm9wZXJ0aWVzIGludG8gdGFyZ2V0IG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdG9cbiAqIEBwYXJhbSB7T2JqZWN0fSBmcm9tXG4gKi9cblxuZXhwb3J0IHZhciBleHRlbmQgPSAodGFyZ2V0LCAuLi5zcmMpID0+IHtcbiAgaWYgKHR5cGVvZiBPYmplY3QuYXNzaWduID09PSAnZnVuY3Rpb24nKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0YXJnZXQsIC4uLnNyYylcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBmaXJzdCA9IHNyYy5zaGlmdCgpXG4gICAgZm9yIChjb25zdCBrZXkgaW4gZmlyc3QpIHtcbiAgICAgIHRhcmdldFtrZXldID0gZmlyc3Rba2V5XVxuICAgIH1cbiAgICBpZiAoc3JjLmxlbmd0aCkge1xuICAgICAgZXh0ZW5kKHRhcmdldCwgLi4uc3JjKVxuICAgIH1cbiAgfVxuICByZXR1cm4gdGFyZ2V0XG59XG5cbi8qKlxuICogUXVpY2sgb2JqZWN0IGNoZWNrIC0gdGhpcyBpcyBwcmltYXJpbHkgdXNlZCB0byB0ZWxsXG4gKiBPYmplY3RzIGZyb20gcHJpbWl0aXZlIHZhbHVlcyB3aGVuIHdlIGtub3cgdGhlIHZhbHVlXG4gKiBpcyBhIEpTT04tY29tcGxpYW50IHR5cGUuXG4gKlxuICogQHBhcmFtIHsqfSBvYmpcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cblxuZXhwb3J0IHZhciBpc09iamVjdCA9IChvYmopID0+IHtcbiAgcmV0dXJuICEhKG9iaiAmJiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0Jylcbn1cblxuLyoqXG4gKiBTdHJpY3Qgb2JqZWN0IHR5cGUgY2hlY2suIE9ubHkgcmV0dXJucyB0cnVlXG4gKiBmb3IgcGxhaW4gSmF2YVNjcmlwdCBvYmplY3RzLlxuICpcbiAqIEBwYXJhbSB7Kn0gb2JqXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5cbmxldCB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdcbmV4cG9ydCB2YXIgaXNQbGFpbk9iamVjdCA9IChvYmopID0+IHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgT2JqZWN0XSdcbn1cblxuLyoqXG4gKiBBcnJheSB0eXBlIGNoZWNrLlxuICpcbiAqIEBwYXJhbSB7Kn0gb2JqXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5cbmV4cG9ydCB2YXIgaXNBcnJheSA9IChvYmopID0+IHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkob2JqKVxufVxuXG5leHBvcnQgdmFyIHN0cmluZ2lmeSA9ICh4KSA9PiB7XG4gIHJldHVybiB0eXBlb2YgeCA9PT0gJ3VuZGVmaW5lZCcgfHwgeCA9PT0gbnVsbCB8fCB0eXBlb2YoeCkgPT09ICdmdW5jdGlvbidcbiAgICA/ICcnXG4gICAgOiB0eXBlb2YgeCA9PT0gJ29iamVjdCdcbiAgICAgID8geCBpbnN0YW5jZW9mIFJlZ0V4cFxuICAgICAgICA/IHgudG9TdHJpbmcoKVxuICAgICAgICA6IHggaW5zdGFuY2VvZiBEYXRlXG4gICAgICAgICAgPyBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHgpKVxuICAgICAgICAgIDogSlNPTi5zdHJpbmdpZnkoeClcbiAgICAgIDogeC50b1N0cmluZygpXG59XG5cbmV4cG9ydCB2YXIgdHlwb2YgPSAodikgPT4ge1xuICBsZXQgcyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2KVxuICByZXR1cm4gcy5zdWJzdHJpbmcoOCwgcy5sZW5ndGggLSAxKS50b0xvd2VyQ2FzZSgpXG59XG5cbmV4cG9ydCB2YXIgbm9ybWFsaXplID0gKHYpID0+IHtcbiAgbGV0IHR5cGUgPSB0eXBvZih2KVxuXG4gIHN3aXRjaCh0eXBlKSB7XG4gICAgY2FzZSAndW5kZWZpbmVkJzpcbiAgICBjYXNlICdudWxsJzpcbiAgICAgIHJldHVybiAnJ1xuICAgIGNhc2UgJ3JlZ2V4cCc6XG4gICAgICByZXR1cm4gdi50b1N0cmluZygpXG4gICAgY2FzZSAnZGF0ZSc6XG4gICAgICByZXR1cm4gdi50b0lTT1N0cmluZygpXG4gICAgY2FzZSAnbnVtYmVyJzpcbiAgICBjYXNlICdzdHJpbmcnOlxuICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgIGNhc2UgJ2FycmF5JzpcbiAgICBjYXNlICdvYmplY3QnOlxuICAgIGNhc2UgJ2Z1bmN0aW9uJzpcbiAgICAgIHJldHVybiB2XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh2KVxuICB9XG59XG5cbi8qKlxuICogRGVmaW5lIGEgbm9uLWVudW1lcmFibGUgcHJvcGVydHlcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gKiBAcGFyYW0geyp9IHZhbFxuICogQHBhcmFtIHtCb29sZWFufSBbZW51bWVyYWJsZV1cbiAqL1xuXG5leHBvcnQgdmFyIGRlZmluZSA9IChvYmosIGtleSwgdmFsLCBlbnVtZXJhYmxlKSA9PiB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgIHZhbHVlOiB2YWwsXG4gICAgZW51bWVyYWJsZTogISFlbnVtZXJhYmxlLFxuICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICB9KVxufVxuXG4vKipcbiAqIE1hbnVhbCBpbmRleE9mIGJlY2F1c2UgaXQncyBzbGlnaHRseSBmYXN0ZXIgdGhhblxuICogbmF0aXZlLlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxuICogQHBhcmFtIHsqfSBvYmpcbiAqL1xuXG5leHBvcnQgdmFyIGluZGV4T2YgPSAoYXJyLCBvYmopID0+IHtcbiAgZm9yIChsZXQgaSA9IDAsIGwgPSBhcnIubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgaWYgKGFycltpXSA9PT0gb2JqKSByZXR1cm4gaVxuICB9XG4gIHJldHVybiAtMVxufVxuXG5cbi8vLyBkZWJ1Zy5qc1xuXG5cbmNvbnN0IGhhc0NvbnNvbGUgPSB0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCdcblxuLyoqXG4gKiBMb2cgYSBtZXNzYWdlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBtc2dcbiAqL1xuXG5leHBvcnQgdmFyIGxvZyA9IChtc2cpID0+IHtcbiAgY29uc3QgX2NvbmZpZyA9IENvbmZpZyB8fCB7fVxuICBpZiAoaGFzQ29uc29sZSAmJiBfY29uZmlnLmRlYnVnKSB7XG4gICAgY29uc29sZS5sb2cuY2FsbCh0aGlzLCAnW2luZm9dOiAnLCBtc2cpXG4gIH1cbn1cblxuLyoqXG4gKiBXZSd2ZSBnb3QgYSBwcm9ibGVtIGhlcmUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG1zZ1xuICovXG5cbmV4cG9ydCB2YXIgd2FybiA9IChtc2cpID0+IHtcbiAgLy8gaWYgKGhhc0NvbnNvbGUgJiYgKCFjb25maWcuc2lsZW50IHx8IGNvbmZpZy5kZWJ1ZykpIHtcbiAgaWYgKGhhc0NvbnNvbGUpIHtcbiAgICBjb25zb2xlLndhcm4uY2FsbCh0aGlzLCAnW3dhcm5dOiAnLCBtc2cpXG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgLy8gaWYgKGNvbmZpZy5kZWJ1Zykge1xuICAgIC8vICAgLyoganNoaW50IGRlYnVnOiB0cnVlICovXG4gICAgLy8gICBkZWJ1Z2dlclxuICAgIC8vIH1cbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9saWIvdXRpbC9pbmRleC5qc1xuICoqLyIsIi8qKlxuICogQGZpbGVPdmVydmlld1xuICogYXBpIHRoYXQgaW52b2tlZCBieSBqcyBidW5kbGUgY29kZVxuICpcbiAqIC0gZGVmaW5lKG5hbWUsIGZhY3RvcnkpOiBkZWZpbmUgYSBuZXcgY29tcG9zZWQgY29tcG9uZW50IHR5cGVcbiAqIC0gYm9vdHN0cmFwKHR5cGUsIGNvbmZpZywgZGF0YSk6IHJlcXVpcmUgYSBjZXJ0YWluIHR5cGUgJlxuICogICAgICAgICByZW5kZXIgd2l0aCAob3B0aW9uYWwpIGRhdGFcbiAqXG4gKiBkZXByZWNhdGVkOlxuICogLSByZWdpc3Rlcih0eXBlLCBvcHRpb25zKTogcmVnaXN0ZXIgYSBuZXcgY29tcG9zZWQgY29tcG9uZW50IHR5cGVcbiAqIC0gcmVuZGVyKHR5cGUsIGRhdGEpOiByZW5kZXIgYnkgYSBjZXJ0YWluIHR5cGUgd2l0aCAob3B0aW9uYWwpIGRhdGFcbiAqIC0gcmVxdWlyZSh0eXBlKShkYXRhKTogcmVxdWlyZSBhIHR5cGUgdGhlbiByZW5kZXIgd2l0aCBkYXRhXG4gKi9cblxuaW1wb3J0IHNlbXZlciBmcm9tICdzZW12ZXInXG5pbXBvcnQgKiBhcyBfIGZyb20gJy4uL3V0aWwnXG5pbXBvcnQgKiBhcyBjb25maWcgZnJvbSAnLi4vY29uZmlnJ1xuaW1wb3J0ICogYXMgcGVyZiBmcm9tICcuLi9wZXJmJ1xuaW1wb3J0IFZtIGZyb20gJy4uL3ZtJ1xuaW1wb3J0ICogYXMgZG93bmdyYWRlIGZyb20gJy4vZG93bmdyYWRlJ1xuXG5jb25zdCBXRUVYX0NPTVBPTkVOVF9SRUcgPSAvXlxcQHdlZXgtY29tcG9uZW50XFwvL1xuY29uc3QgV0VFWF9NT0RVTEVfUkVHID0gL15cXEB3ZWV4LW1vZHVsZVxcLy9cbmNvbnN0IE5PUk1BTF9NT0RVTEVfUkVHID0gL15cXC57MSwyfVxcLy9cbmNvbnN0IEpTX1NVUkZJWF9SRUcgPSAvXFwuanMkL1xuXG5jb25zdCBpc1dlZXhDb21wb25lbnQgPSBuYW1lID0+ICEhbmFtZS5tYXRjaChXRUVYX0NPTVBPTkVOVF9SRUcpXG5jb25zdCBpc1dlZXhNb2R1bGUgPSBuYW1lID0+ICEhbmFtZS5tYXRjaChXRUVYX01PRFVMRV9SRUcpXG5jb25zdCBpc05vcm1hbE1vZHVsZSA9IG5hbWUgPT4gISFuYW1lLm1hdGNoKE5PUk1BTF9NT0RVTEVfUkVHKVxuY29uc3QgaXNOcG1Nb2R1bGUgPSBuYW1lID0+ICFpc1dlZXhDb21wb25lbnQobmFtZSkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICFpc1dlZXhNb2R1bGUobmFtZSkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICFpc05vcm1hbE1vZHVsZShuYW1lKVxuXG5mdW5jdGlvbiByZW1vdmVXZWV4UHJlZml4KHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoV0VFWF9DT01QT05FTlRfUkVHLCAnJylcbiAgICAgICAgICAucmVwbGFjZShXRUVYX01PRFVMRV9SRUcsICcnKVxufVxuXG5mdW5jdGlvbiByZW1vdmVKU1N1cmZpeChzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKEpTX1NVUkZJWF9SRUcsICcnKVxufVxuXG5sZXQgY29tbW9uTW9kdWxlcyA9IHt9XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGVhckNvbW1vbk1vZHVsZXMoKSB7XG4gIGNvbW1vbk1vZHVsZXMgPSB7fVxufVxuXG4vLyBkZWZpbmUobmFtZSwgZmFjdG9yeSkgZm9yIHByaW1hcnkgdXNhZ2Vcbi8vIG9yXG4vLyBkZWZpbmUobmFtZSwgZGVwcywgZmFjdG9yeSkgZm9yIGNvbXBhdGliaWxpdHlcbi8vIE5vdGljZTogRE8gTk9UIHVzZSBmdW5jdGlvbiBkZWZpbmUoKSB7fSxcbi8vIGl0IHdpbGwgY2F1c2UgZXJyb3IgYWZ0ZXIgYnVpbGRlZCBieSB3ZWJwYWNrXG5leHBvcnQgdmFyIGRlZmluZSA9IGZ1bmN0aW9uIChuYW1lLCBkZXBzLCBmYWN0b3J5KSB7XG4gIHBlcmYuc3RhcnQoJ2RlZmluZScsIG5hbWUpXG5cbiAgaWYgKF8udHlwb2YoZGVwcykgPT09ICdmdW5jdGlvbicpIHtcbiAgICBmYWN0b3J5ID0gZGVwc1xuICAgIGRlcHMgPSBbXVxuICB9XG5cbiAgbGV0IF9yZXF1aXJlID0gKG5hbWUpID0+IHtcbiAgICBsZXQgY2xlYW5OYW1lXG5cbiAgICBpZiAoaXNXZWV4Q29tcG9uZW50KG5hbWUpKSB7XG4gICAgICBjbGVhbk5hbWUgPSByZW1vdmVXZWV4UHJlZml4KG5hbWUpXG4gICAgICByZXR1cm4gdGhpcy5yZXF1aXJlQ29tcG9uZW50KGNsZWFuTmFtZSlcbiAgICB9XG4gICAgaWYgKGlzV2VleE1vZHVsZShuYW1lKSkge1xuICAgICAgY2xlYW5OYW1lID0gcmVtb3ZlV2VleFByZWZpeChuYW1lKVxuICAgICAgcmV0dXJuIHRoaXMucmVxdWlyZU1vZHVsZShjbGVhbk5hbWUpXG4gICAgfVxuICAgIGlmIChpc05vcm1hbE1vZHVsZShuYW1lKSkge1xuICAgICAgY2xlYW5OYW1lID0gcmVtb3ZlSlNTdXJmaXgobmFtZSlcbiAgICAgIHJldHVybiBjb21tb25Nb2R1bGVzW25hbWVdXG4gICAgfVxuICAgIGlmIChpc05wbU1vZHVsZShuYW1lKSkge1xuICAgICAgY2xlYW5OYW1lID0gcmVtb3ZlSlNTdXJmaXgobmFtZSlcbiAgICAgIHJldHVybiBjb21tb25Nb2R1bGVzW25hbWVdXG4gICAgfVxuICB9XG4gIGxldCBfbW9kdWxlID0ge2V4cG9ydHM6IHt9fVxuXG4gIGxldCBjbGVhbk5hbWVcbiAgaWYgKGlzV2VleENvbXBvbmVudChuYW1lKSkge1xuICAgIGNsZWFuTmFtZSA9IHJlbW92ZVdlZXhQcmVmaXgobmFtZSlcblxuICAgIGZhY3RvcnkoX3JlcXVpcmUsIF9tb2R1bGUuZXhwb3J0cywgX21vZHVsZSlcblxuICAgIHRoaXMucmVnaXN0ZXJDb21wb25lbnQoY2xlYW5OYW1lLCBfbW9kdWxlLmV4cG9ydHMpXG4gIH0gZWxzZSBpZiAoaXNXZWV4TW9kdWxlKG5hbWUpKSB7XG4gICAgY2xlYW5OYW1lID0gcmVtb3ZlV2VleFByZWZpeChuYW1lKVxuXG4gICAgZmFjdG9yeShfcmVxdWlyZSwgX21vZHVsZS5leHBvcnRzLCBfbW9kdWxlKVxuXG4gICAgVm0ucmVnaXN0ZXJNb2R1bGVzKHtcbiAgICAgIFtjbGVhbk5hbWVdOiBfbW9kdWxlLmV4cG9ydHNcbiAgICB9KVxuICB9IGVsc2UgaWYgKGlzTm9ybWFsTW9kdWxlKG5hbWUpKSB7XG4gICAgY2xlYW5OYW1lID0gcmVtb3ZlSlNTdXJmaXgobmFtZSlcblxuICAgIGZhY3RvcnkoX3JlcXVpcmUsIF9tb2R1bGUuZXhwb3J0cywgX21vZHVsZSlcblxuICAgIGNvbW1vbk1vZHVsZXNbY2xlYW5OYW1lXSA9IF9tb2R1bGUuZXhwb3J0c1xuICB9IGVsc2UgaWYgKGlzTnBtTW9kdWxlKG5hbWUpKSB7XG4gICAgY2xlYW5OYW1lID0gcmVtb3ZlSlNTdXJmaXgobmFtZSlcblxuICAgIGZhY3RvcnkoX3JlcXVpcmUsIF9tb2R1bGUuZXhwb3J0cywgX21vZHVsZSlcblxuICAgIGxldCBleHBvcnRzID0gX21vZHVsZS5leHBvcnRzXG4gICAgaWYgKGV4cG9ydHMudGVtcGxhdGUgfHxcbiAgICAgICAgZXhwb3J0cy5zdHlsZSB8fFxuICAgICAgICBleHBvcnRzLm1ldGhvZHMpIHtcbiAgICAgIC8vIGRvd25ncmFkZSB0byBvbGQgZGVmaW5lIG1ldGhvZCAoZGVmaW5lKCdjb21wb25lbnROYW1lJywgZmFjdG9yeSkpXG4gICAgICAvLyB0aGUgZXhwb3J0cyBjb250YWluIG9uZSBrZXkgb2YgdGVtcGxhdGUsIHN0eWxlIG9yIG1ldGhvZHNcbiAgICAgIC8vIGJ1dCBpdCBoYXMgcmlzayEhIVxuICAgICAgdGhpcy5yZWdpc3RlckNvbXBvbmVudChjbGVhbk5hbWUsIGV4cG9ydHMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbW1vbk1vZHVsZXNbY2xlYW5OYW1lXSA9IF9tb2R1bGUuZXhwb3J0c1xuICAgIH1cbiAgfVxuXG4gIHBlcmYuZW5kKCdkZWZpbmUnLCBuYW1lKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYm9vdHN0cmFwKG5hbWUsIGNvbmZpZywgZGF0YSkge1xuICBsZXQgY2xlYW5OYW1lXG5cbiAgaWYgKGlzV2VleENvbXBvbmVudChuYW1lKSkge1xuICAgIGNsZWFuTmFtZSA9IHJlbW92ZVdlZXhQcmVmaXgobmFtZSlcbiAgfSBlbHNlIGlmIChpc05wbU1vZHVsZShuYW1lKSkge1xuICAgIGNsZWFuTmFtZSA9IHJlbW92ZUpTU3VyZml4KG5hbWUpXG4gICAgLy8gY2hlY2sgaWYgZGVmaW5lIGJ5IG9sZCAnZGVmaW5lJyBtZXRob2RcbiAgICBpZiAoIXRoaXMuY3VzdG9tQ29tcG9uZW50TWFwW2NsZWFuTmFtZV0pIHtcbiAgICAgIHJldHVybiBuZXcgRXJyb3IoYEl0J3Mgbm90IGEgY29tcG9uZW50OiAke25hbWV9YClcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ldyBFcnJvcihgV3JvbmcgY29tcG9uZW50IG5hbWU6ICR7bmFtZX1gKVxuICB9XG5cbiAgY29uZmlnID0gXy5pc1BsYWluT2JqZWN0KGNvbmZpZykgPyBjb25maWcgOiB7fVxuXG4gIGlmICh0eXBlb2YgY29uZmlnLnRyYW5zZm9ybWVyVmVyc2lvbiA9PT0gJ3N0cmluZycgJiZcbiAgICB0eXBlb2YgZ2xvYmFsLm5lZWRUcmFuc2Zvcm1lclZlcnNpb24gPT09ICdzdHJpbmcnICYmXG4gICAgIXNlbXZlci5zYXRpc2ZpZXMoY29uZmlnLnRyYW5zZm9ybWVyVmVyc2lvbixcbiAgICAgIGdsb2JhbC5uZWVkVHJhbnNmb3JtZXJWZXJzaW9uKSkge1xuICAgIHJldHVybiBuZXcgRXJyb3IoYEpTIEJ1bmRsZSB2ZXJzaW9uOiAke2NvbmZpZy50cmFuc2Zvcm1lclZlcnNpb259IGAgK1xuICAgICAgYG5vdCBjb21wYXRpYmxlIHdpdGggJHtnbG9iYWwubmVlZFRyYW5zZm9ybWVyVmVyc2lvbn1gKVxuICB9XG5cbiAgbGV0IF9jaGVja0Rvd25ncmFkZSA9IGRvd25ncmFkZS5jaGVjayhjb25maWcuZG93bmdyYWRlKVxuICBpZiAoX2NoZWNrRG93bmdyYWRlLmlzRG93bmdyYWRlKSB7XG4gICAgdGhpcy5jYWxsVGFza3MoW3tcbiAgICAgIG1vZHVsZTogJ2luc3RhbmNlV3JhcCcsXG4gICAgICBtZXRob2Q6ICdlcnJvcicsXG4gICAgICBhcmdzOiBbXG4gICAgICAgIF9jaGVja0Rvd25ncmFkZS5lcnJvclR5cGUsXG4gICAgICAgIF9jaGVja0Rvd25ncmFkZS5jb2RlLFxuICAgICAgICBfY2hlY2tEb3duZ3JhZGUuZXJyb3JNZXNzYWdlXG4gICAgICBdXG4gICAgfV0pXG4gICAgcmV0dXJuIG5ldyBFcnJvcihgRG93bmdyYWRlOiAke2NvbmZpZy5kb3duZ3JhZGV9YClcbiAgfVxuXG4gIHBlcmYuc3RhcnQoJ2NyZWF0ZSB2bScsIGNsZWFuTmFtZSlcblxuICB0aGlzLnZtID0gbmV3IFZtKGNsZWFuTmFtZSwge19hcHA6IHRoaXN9LCBudWxsLCBkYXRhLCB7XG4gICAgJ2hvb2s6cmVhZHknOiAoKSA9PiB7XG4gICAgICBwZXJmLmVuZCgnY3JlYXRlIHZtJywgY2xlYW5OYW1lKVxuICAgIH1cbiAgfSlcbn1cblxuLyoqXG4gKiBAZGVwcmVjYXRlZFxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXIodHlwZSwgb3B0aW9ucykge1xuICBwZXJmLnN0YXJ0KCdyZWdpc3RlcicsIHR5cGUpXG4gIHRoaXMucmVnaXN0ZXJDb21wb25lbnQodHlwZSwgb3B0aW9ucylcbiAgcGVyZi5lbmQoJ3JlZ2lzdGVyJywgdHlwZSlcbn1cblxuLyoqXG4gKiBAZGVwcmVjYXRlZFxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyKHR5cGUsIGRhdGEpIHtcbiAgcmV0dXJuIHRoaXMuYm9vdHN0cmFwKHR5cGUsIHt9LCBkYXRhKVxufVxuXG4vKipcbiAqIEBkZXByZWNhdGVkXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXF1aXJlKHR5cGUpIHtcbiAgcmV0dXJuIChkYXRhKSA9PiB7XG4gICAgcmV0dXJuIHRoaXMuYm9vdHN0cmFwKHR5cGUsIHt9LCBkYXRhKVxuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2xpYi9hcHAvYnVuZGxlLmpzXG4gKiovIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gU2VtVmVyO1xuXG4vLyBUaGUgZGVidWcgZnVuY3Rpb24gaXMgZXhjbHVkZWQgZW50aXJlbHkgZnJvbSB0aGUgbWluaWZpZWQgdmVyc2lvbi5cbi8qIG5vbWluICovIHZhciBkZWJ1Zztcbi8qIG5vbWluICovIGlmICh0eXBlb2YgcHJvY2VzcyA9PT0gJ29iamVjdCcgJiZcbiAgICAvKiBub21pbiAqLyBwcm9jZXNzLmVudiAmJlxuICAgIC8qIG5vbWluICovIHByb2Nlc3MuZW52Lk5PREVfREVCVUcgJiZcbiAgICAvKiBub21pbiAqLyAvXFxic2VtdmVyXFxiL2kudGVzdChwcm9jZXNzLmVudi5OT0RFX0RFQlVHKSlcbiAgLyogbm9taW4gKi8gZGVidWcgPSBmdW5jdGlvbigpIHtcbiAgICAvKiBub21pbiAqLyB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gICAgLyogbm9taW4gKi8gYXJncy51bnNoaWZ0KCdTRU1WRVInKTtcbiAgICAvKiBub21pbiAqLyBjb25zb2xlLmxvZy5hcHBseShjb25zb2xlLCBhcmdzKTtcbiAgICAvKiBub21pbiAqLyB9O1xuLyogbm9taW4gKi8gZWxzZVxuICAvKiBub21pbiAqLyBkZWJ1ZyA9IGZ1bmN0aW9uKCkge307XG5cbi8vIE5vdGU6IHRoaXMgaXMgdGhlIHNlbXZlci5vcmcgdmVyc2lvbiBvZiB0aGUgc3BlYyB0aGF0IGl0IGltcGxlbWVudHNcbi8vIE5vdCBuZWNlc3NhcmlseSB0aGUgcGFja2FnZSB2ZXJzaW9uIG9mIHRoaXMgY29kZS5cbmV4cG9ydHMuU0VNVkVSX1NQRUNfVkVSU0lPTiA9ICcyLjAuMCc7XG5cbnZhciBNQVhfTEVOR1RIID0gMjU2O1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUiB8fCA5MDA3MTk5MjU0NzQwOTkxO1xuXG4vLyBUaGUgYWN0dWFsIHJlZ2V4cHMgZ28gb24gZXhwb3J0cy5yZVxudmFyIHJlID0gZXhwb3J0cy5yZSA9IFtdO1xudmFyIHNyYyA9IGV4cG9ydHMuc3JjID0gW107XG52YXIgUiA9IDA7XG5cbi8vIFRoZSBmb2xsb3dpbmcgUmVndWxhciBFeHByZXNzaW9ucyBjYW4gYmUgdXNlZCBmb3IgdG9rZW5pemluZyxcbi8vIHZhbGlkYXRpbmcsIGFuZCBwYXJzaW5nIFNlbVZlciB2ZXJzaW9uIHN0cmluZ3MuXG5cbi8vICMjIE51bWVyaWMgSWRlbnRpZmllclxuLy8gQSBzaW5nbGUgYDBgLCBvciBhIG5vbi16ZXJvIGRpZ2l0IGZvbGxvd2VkIGJ5IHplcm8gb3IgbW9yZSBkaWdpdHMuXG5cbnZhciBOVU1FUklDSURFTlRJRklFUiA9IFIrKztcbnNyY1tOVU1FUklDSURFTlRJRklFUl0gPSAnMHxbMS05XVxcXFxkKic7XG52YXIgTlVNRVJJQ0lERU5USUZJRVJMT09TRSA9IFIrKztcbnNyY1tOVU1FUklDSURFTlRJRklFUkxPT1NFXSA9ICdbMC05XSsnO1xuXG5cbi8vICMjIE5vbi1udW1lcmljIElkZW50aWZpZXJcbi8vIFplcm8gb3IgbW9yZSBkaWdpdHMsIGZvbGxvd2VkIGJ5IGEgbGV0dGVyIG9yIGh5cGhlbiwgYW5kIHRoZW4gemVybyBvclxuLy8gbW9yZSBsZXR0ZXJzLCBkaWdpdHMsIG9yIGh5cGhlbnMuXG5cbnZhciBOT05OVU1FUklDSURFTlRJRklFUiA9IFIrKztcbnNyY1tOT05OVU1FUklDSURFTlRJRklFUl0gPSAnXFxcXGQqW2EtekEtWi1dW2EtekEtWjAtOS1dKic7XG5cblxuLy8gIyMgTWFpbiBWZXJzaW9uXG4vLyBUaHJlZSBkb3Qtc2VwYXJhdGVkIG51bWVyaWMgaWRlbnRpZmllcnMuXG5cbnZhciBNQUlOVkVSU0lPTiA9IFIrKztcbnNyY1tNQUlOVkVSU0lPTl0gPSAnKCcgKyBzcmNbTlVNRVJJQ0lERU5USUZJRVJdICsgJylcXFxcLicgK1xuICAgICAgICAgICAgICAgICAgICcoJyArIHNyY1tOVU1FUklDSURFTlRJRklFUl0gKyAnKVxcXFwuJyArXG4gICAgICAgICAgICAgICAgICAgJygnICsgc3JjW05VTUVSSUNJREVOVElGSUVSXSArICcpJztcblxudmFyIE1BSU5WRVJTSU9OTE9PU0UgPSBSKys7XG5zcmNbTUFJTlZFUlNJT05MT09TRV0gPSAnKCcgKyBzcmNbTlVNRVJJQ0lERU5USUZJRVJMT09TRV0gKyAnKVxcXFwuJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnKCcgKyBzcmNbTlVNRVJJQ0lERU5USUZJRVJMT09TRV0gKyAnKVxcXFwuJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnKCcgKyBzcmNbTlVNRVJJQ0lERU5USUZJRVJMT09TRV0gKyAnKSc7XG5cbi8vICMjIFByZS1yZWxlYXNlIFZlcnNpb24gSWRlbnRpZmllclxuLy8gQSBudW1lcmljIGlkZW50aWZpZXIsIG9yIGEgbm9uLW51bWVyaWMgaWRlbnRpZmllci5cblxudmFyIFBSRVJFTEVBU0VJREVOVElGSUVSID0gUisrO1xuc3JjW1BSRVJFTEVBU0VJREVOVElGSUVSXSA9ICcoPzonICsgc3JjW05VTUVSSUNJREVOVElGSUVSXSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3wnICsgc3JjW05PTk5VTUVSSUNJREVOVElGSUVSXSArICcpJztcblxudmFyIFBSRVJFTEVBU0VJREVOVElGSUVSTE9PU0UgPSBSKys7XG5zcmNbUFJFUkVMRUFTRUlERU5USUZJRVJMT09TRV0gPSAnKD86JyArIHNyY1tOVU1FUklDSURFTlRJRklFUkxPT1NFXSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnfCcgKyBzcmNbTk9OTlVNRVJJQ0lERU5USUZJRVJdICsgJyknO1xuXG5cbi8vICMjIFByZS1yZWxlYXNlIFZlcnNpb25cbi8vIEh5cGhlbiwgZm9sbG93ZWQgYnkgb25lIG9yIG1vcmUgZG90LXNlcGFyYXRlZCBwcmUtcmVsZWFzZSB2ZXJzaW9uXG4vLyBpZGVudGlmaWVycy5cblxudmFyIFBSRVJFTEVBU0UgPSBSKys7XG5zcmNbUFJFUkVMRUFTRV0gPSAnKD86LSgnICsgc3JjW1BSRVJFTEVBU0VJREVOVElGSUVSXSArXG4gICAgICAgICAgICAgICAgICAnKD86XFxcXC4nICsgc3JjW1BSRVJFTEVBU0VJREVOVElGSUVSXSArICcpKikpJztcblxudmFyIFBSRVJFTEVBU0VMT09TRSA9IFIrKztcbnNyY1tQUkVSRUxFQVNFTE9PU0VdID0gJyg/Oi0/KCcgKyBzcmNbUFJFUkVMRUFTRUlERU5USUZJRVJMT09TRV0gK1xuICAgICAgICAgICAgICAgICAgICAgICAnKD86XFxcXC4nICsgc3JjW1BSRVJFTEVBU0VJREVOVElGSUVSTE9PU0VdICsgJykqKSknO1xuXG4vLyAjIyBCdWlsZCBNZXRhZGF0YSBJZGVudGlmaWVyXG4vLyBBbnkgY29tYmluYXRpb24gb2YgZGlnaXRzLCBsZXR0ZXJzLCBvciBoeXBoZW5zLlxuXG52YXIgQlVJTERJREVOVElGSUVSID0gUisrO1xuc3JjW0JVSUxESURFTlRJRklFUl0gPSAnWzAtOUEtWmEtei1dKyc7XG5cbi8vICMjIEJ1aWxkIE1ldGFkYXRhXG4vLyBQbHVzIHNpZ24sIGZvbGxvd2VkIGJ5IG9uZSBvciBtb3JlIHBlcmlvZC1zZXBhcmF0ZWQgYnVpbGQgbWV0YWRhdGFcbi8vIGlkZW50aWZpZXJzLlxuXG52YXIgQlVJTEQgPSBSKys7XG5zcmNbQlVJTERdID0gJyg/OlxcXFwrKCcgKyBzcmNbQlVJTERJREVOVElGSUVSXSArXG4gICAgICAgICAgICAgJyg/OlxcXFwuJyArIHNyY1tCVUlMRElERU5USUZJRVJdICsgJykqKSknO1xuXG5cbi8vICMjIEZ1bGwgVmVyc2lvbiBTdHJpbmdcbi8vIEEgbWFpbiB2ZXJzaW9uLCBmb2xsb3dlZCBvcHRpb25hbGx5IGJ5IGEgcHJlLXJlbGVhc2UgdmVyc2lvbiBhbmRcbi8vIGJ1aWxkIG1ldGFkYXRhLlxuXG4vLyBOb3RlIHRoYXQgdGhlIG9ubHkgbWFqb3IsIG1pbm9yLCBwYXRjaCwgYW5kIHByZS1yZWxlYXNlIHNlY3Rpb25zIG9mXG4vLyB0aGUgdmVyc2lvbiBzdHJpbmcgYXJlIGNhcHR1cmluZyBncm91cHMuICBUaGUgYnVpbGQgbWV0YWRhdGEgaXMgbm90IGFcbi8vIGNhcHR1cmluZyBncm91cCwgYmVjYXVzZSBpdCBzaG91bGQgbm90IGV2ZXIgYmUgdXNlZCBpbiB2ZXJzaW9uXG4vLyBjb21wYXJpc29uLlxuXG52YXIgRlVMTCA9IFIrKztcbnZhciBGVUxMUExBSU4gPSAndj8nICsgc3JjW01BSU5WRVJTSU9OXSArXG4gICAgICAgICAgICAgICAgc3JjW1BSRVJFTEVBU0VdICsgJz8nICtcbiAgICAgICAgICAgICAgICBzcmNbQlVJTERdICsgJz8nO1xuXG5zcmNbRlVMTF0gPSAnXicgKyBGVUxMUExBSU4gKyAnJCc7XG5cbi8vIGxpa2UgZnVsbCwgYnV0IGFsbG93cyB2MS4yLjMgYW5kID0xLjIuMywgd2hpY2ggcGVvcGxlIGRvIHNvbWV0aW1lcy5cbi8vIGFsc28sIDEuMC4wYWxwaGExIChwcmVyZWxlYXNlIHdpdGhvdXQgdGhlIGh5cGhlbikgd2hpY2ggaXMgcHJldHR5XG4vLyBjb21tb24gaW4gdGhlIG5wbSByZWdpc3RyeS5cbnZhciBMT09TRVBMQUlOID0gJ1t2PVxcXFxzXSonICsgc3JjW01BSU5WRVJTSU9OTE9PU0VdICtcbiAgICAgICAgICAgICAgICAgc3JjW1BSRVJFTEVBU0VMT09TRV0gKyAnPycgK1xuICAgICAgICAgICAgICAgICBzcmNbQlVJTERdICsgJz8nO1xuXG52YXIgTE9PU0UgPSBSKys7XG5zcmNbTE9PU0VdID0gJ14nICsgTE9PU0VQTEFJTiArICckJztcblxudmFyIEdUTFQgPSBSKys7XG5zcmNbR1RMVF0gPSAnKCg/Ojx8Pik/PT8pJztcblxuLy8gU29tZXRoaW5nIGxpa2UgXCIyLipcIiBvciBcIjEuMi54XCIuXG4vLyBOb3RlIHRoYXQgXCJ4LnhcIiBpcyBhIHZhbGlkIHhSYW5nZSBpZGVudGlmZXIsIG1lYW5pbmcgXCJhbnkgdmVyc2lvblwiXG4vLyBPbmx5IHRoZSBmaXJzdCBpdGVtIGlzIHN0cmljdGx5IHJlcXVpcmVkLlxudmFyIFhSQU5HRUlERU5USUZJRVJMT09TRSA9IFIrKztcbnNyY1tYUkFOR0VJREVOVElGSUVSTE9PU0VdID0gc3JjW05VTUVSSUNJREVOVElGSUVSTE9PU0VdICsgJ3x4fFh8XFxcXConO1xudmFyIFhSQU5HRUlERU5USUZJRVIgPSBSKys7XG5zcmNbWFJBTkdFSURFTlRJRklFUl0gPSBzcmNbTlVNRVJJQ0lERU5USUZJRVJdICsgJ3x4fFh8XFxcXConO1xuXG52YXIgWFJBTkdFUExBSU4gPSBSKys7XG5zcmNbWFJBTkdFUExBSU5dID0gJ1t2PVxcXFxzXSooJyArIHNyY1tYUkFOR0VJREVOVElGSUVSXSArICcpJyArXG4gICAgICAgICAgICAgICAgICAgJyg/OlxcXFwuKCcgKyBzcmNbWFJBTkdFSURFTlRJRklFUl0gKyAnKScgK1xuICAgICAgICAgICAgICAgICAgICcoPzpcXFxcLignICsgc3JjW1hSQU5HRUlERU5USUZJRVJdICsgJyknICtcbiAgICAgICAgICAgICAgICAgICAnKD86JyArIHNyY1tQUkVSRUxFQVNFXSArICcpPycgK1xuICAgICAgICAgICAgICAgICAgIHNyY1tCVUlMRF0gKyAnPycgK1xuICAgICAgICAgICAgICAgICAgICcpPyk/JztcblxudmFyIFhSQU5HRVBMQUlOTE9PU0UgPSBSKys7XG5zcmNbWFJBTkdFUExBSU5MT09TRV0gPSAnW3Y9XFxcXHNdKignICsgc3JjW1hSQU5HRUlERU5USUZJRVJMT09TRV0gKyAnKScgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJyg/OlxcXFwuKCcgKyBzcmNbWFJBTkdFSURFTlRJRklFUkxPT1NFXSArICcpJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnKD86XFxcXC4oJyArIHNyY1tYUkFOR0VJREVOVElGSUVSTE9PU0VdICsgJyknICtcbiAgICAgICAgICAgICAgICAgICAgICAgICcoPzonICsgc3JjW1BSRVJFTEVBU0VMT09TRV0gKyAnKT8nICtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNyY1tCVUlMRF0gKyAnPycgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJyk/KT8nO1xuXG52YXIgWFJBTkdFID0gUisrO1xuc3JjW1hSQU5HRV0gPSAnXicgKyBzcmNbR1RMVF0gKyAnXFxcXHMqJyArIHNyY1tYUkFOR0VQTEFJTl0gKyAnJCc7XG52YXIgWFJBTkdFTE9PU0UgPSBSKys7XG5zcmNbWFJBTkdFTE9PU0VdID0gJ14nICsgc3JjW0dUTFRdICsgJ1xcXFxzKicgKyBzcmNbWFJBTkdFUExBSU5MT09TRV0gKyAnJCc7XG5cbi8vIFRpbGRlIHJhbmdlcy5cbi8vIE1lYW5pbmcgaXMgXCJyZWFzb25hYmx5IGF0IG9yIGdyZWF0ZXIgdGhhblwiXG52YXIgTE9ORVRJTERFID0gUisrO1xuc3JjW0xPTkVUSUxERV0gPSAnKD86fj4/KSc7XG5cbnZhciBUSUxERVRSSU0gPSBSKys7XG5zcmNbVElMREVUUklNXSA9ICcoXFxcXHMqKScgKyBzcmNbTE9ORVRJTERFXSArICdcXFxccysnO1xucmVbVElMREVUUklNXSA9IG5ldyBSZWdFeHAoc3JjW1RJTERFVFJJTV0sICdnJyk7XG52YXIgdGlsZGVUcmltUmVwbGFjZSA9ICckMX4nO1xuXG52YXIgVElMREUgPSBSKys7XG5zcmNbVElMREVdID0gJ14nICsgc3JjW0xPTkVUSUxERV0gKyBzcmNbWFJBTkdFUExBSU5dICsgJyQnO1xudmFyIFRJTERFTE9PU0UgPSBSKys7XG5zcmNbVElMREVMT09TRV0gPSAnXicgKyBzcmNbTE9ORVRJTERFXSArIHNyY1tYUkFOR0VQTEFJTkxPT1NFXSArICckJztcblxuLy8gQ2FyZXQgcmFuZ2VzLlxuLy8gTWVhbmluZyBpcyBcImF0IGxlYXN0IGFuZCBiYWNrd2FyZHMgY29tcGF0aWJsZSB3aXRoXCJcbnZhciBMT05FQ0FSRVQgPSBSKys7XG5zcmNbTE9ORUNBUkVUXSA9ICcoPzpcXFxcXiknO1xuXG52YXIgQ0FSRVRUUklNID0gUisrO1xuc3JjW0NBUkVUVFJJTV0gPSAnKFxcXFxzKiknICsgc3JjW0xPTkVDQVJFVF0gKyAnXFxcXHMrJztcbnJlW0NBUkVUVFJJTV0gPSBuZXcgUmVnRXhwKHNyY1tDQVJFVFRSSU1dLCAnZycpO1xudmFyIGNhcmV0VHJpbVJlcGxhY2UgPSAnJDFeJztcblxudmFyIENBUkVUID0gUisrO1xuc3JjW0NBUkVUXSA9ICdeJyArIHNyY1tMT05FQ0FSRVRdICsgc3JjW1hSQU5HRVBMQUlOXSArICckJztcbnZhciBDQVJFVExPT1NFID0gUisrO1xuc3JjW0NBUkVUTE9PU0VdID0gJ14nICsgc3JjW0xPTkVDQVJFVF0gKyBzcmNbWFJBTkdFUExBSU5MT09TRV0gKyAnJCc7XG5cbi8vIEEgc2ltcGxlIGd0L2x0L2VxIHRoaW5nLCBvciBqdXN0IFwiXCIgdG8gaW5kaWNhdGUgXCJhbnkgdmVyc2lvblwiXG52YXIgQ09NUEFSQVRPUkxPT1NFID0gUisrO1xuc3JjW0NPTVBBUkFUT1JMT09TRV0gPSAnXicgKyBzcmNbR1RMVF0gKyAnXFxcXHMqKCcgKyBMT09TRVBMQUlOICsgJykkfF4kJztcbnZhciBDT01QQVJBVE9SID0gUisrO1xuc3JjW0NPTVBBUkFUT1JdID0gJ14nICsgc3JjW0dUTFRdICsgJ1xcXFxzKignICsgRlVMTFBMQUlOICsgJykkfF4kJztcblxuXG4vLyBBbiBleHByZXNzaW9uIHRvIHN0cmlwIGFueSB3aGl0ZXNwYWNlIGJldHdlZW4gdGhlIGd0bHQgYW5kIHRoZSB0aGluZ1xuLy8gaXQgbW9kaWZpZXMsIHNvIHRoYXQgYD4gMS4yLjNgID09PiBgPjEuMi4zYFxudmFyIENPTVBBUkFUT1JUUklNID0gUisrO1xuc3JjW0NPTVBBUkFUT1JUUklNXSA9ICcoXFxcXHMqKScgKyBzcmNbR1RMVF0gK1xuICAgICAgICAgICAgICAgICAgICAgICdcXFxccyooJyArIExPT1NFUExBSU4gKyAnfCcgKyBzcmNbWFJBTkdFUExBSU5dICsgJyknO1xuXG4vLyB0aGlzIG9uZSBoYXMgdG8gdXNlIHRoZSAvZyBmbGFnXG5yZVtDT01QQVJBVE9SVFJJTV0gPSBuZXcgUmVnRXhwKHNyY1tDT01QQVJBVE9SVFJJTV0sICdnJyk7XG52YXIgY29tcGFyYXRvclRyaW1SZXBsYWNlID0gJyQxJDIkMyc7XG5cblxuLy8gU29tZXRoaW5nIGxpa2UgYDEuMi4zIC0gMS4yLjRgXG4vLyBOb3RlIHRoYXQgdGhlc2UgYWxsIHVzZSB0aGUgbG9vc2UgZm9ybSwgYmVjYXVzZSB0aGV5J2xsIGJlXG4vLyBjaGVja2VkIGFnYWluc3QgZWl0aGVyIHRoZSBzdHJpY3Qgb3IgbG9vc2UgY29tcGFyYXRvciBmb3JtXG4vLyBsYXRlci5cbnZhciBIWVBIRU5SQU5HRSA9IFIrKztcbnNyY1tIWVBIRU5SQU5HRV0gPSAnXlxcXFxzKignICsgc3JjW1hSQU5HRVBMQUlOXSArICcpJyArXG4gICAgICAgICAgICAgICAgICAgJ1xcXFxzKy1cXFxccysnICtcbiAgICAgICAgICAgICAgICAgICAnKCcgKyBzcmNbWFJBTkdFUExBSU5dICsgJyknICtcbiAgICAgICAgICAgICAgICAgICAnXFxcXHMqJCc7XG5cbnZhciBIWVBIRU5SQU5HRUxPT1NFID0gUisrO1xuc3JjW0hZUEhFTlJBTkdFTE9PU0VdID0gJ15cXFxccyooJyArIHNyY1tYUkFOR0VQTEFJTkxPT1NFXSArICcpJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnXFxcXHMrLVxcXFxzKycgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJygnICsgc3JjW1hSQU5HRVBMQUlOTE9PU0VdICsgJyknICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdcXFxccyokJztcblxuLy8gU3RhciByYW5nZXMgYmFzaWNhbGx5IGp1c3QgYWxsb3cgYW55dGhpbmcgYXQgYWxsLlxudmFyIFNUQVIgPSBSKys7XG5zcmNbU1RBUl0gPSAnKDx8Pik/PT9cXFxccypcXFxcKic7XG5cbi8vIENvbXBpbGUgdG8gYWN0dWFsIHJlZ2V4cCBvYmplY3RzLlxuLy8gQWxsIGFyZSBmbGFnLWZyZWUsIHVubGVzcyB0aGV5IHdlcmUgY3JlYXRlZCBhYm92ZSB3aXRoIGEgZmxhZy5cbmZvciAodmFyIGkgPSAwOyBpIDwgUjsgaSsrKSB7XG4gIGRlYnVnKGksIHNyY1tpXSk7XG4gIGlmICghcmVbaV0pXG4gICAgcmVbaV0gPSBuZXcgUmVnRXhwKHNyY1tpXSk7XG59XG5cbmV4cG9ydHMucGFyc2UgPSBwYXJzZTtcbmZ1bmN0aW9uIHBhcnNlKHZlcnNpb24sIGxvb3NlKSB7XG4gIGlmICh2ZXJzaW9uIGluc3RhbmNlb2YgU2VtVmVyKVxuICAgIHJldHVybiB2ZXJzaW9uO1xuXG4gIGlmICh0eXBlb2YgdmVyc2lvbiAhPT0gJ3N0cmluZycpXG4gICAgcmV0dXJuIG51bGw7XG5cbiAgaWYgKHZlcnNpb24ubGVuZ3RoID4gTUFYX0xFTkdUSClcbiAgICByZXR1cm4gbnVsbDtcblxuICB2YXIgciA9IGxvb3NlID8gcmVbTE9PU0VdIDogcmVbRlVMTF07XG4gIGlmICghci50ZXN0KHZlcnNpb24pKVxuICAgIHJldHVybiBudWxsO1xuXG4gIHRyeSB7XG4gICAgcmV0dXJuIG5ldyBTZW1WZXIodmVyc2lvbiwgbG9vc2UpO1xuICB9IGNhdGNoIChlcikge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbmV4cG9ydHMudmFsaWQgPSB2YWxpZDtcbmZ1bmN0aW9uIHZhbGlkKHZlcnNpb24sIGxvb3NlKSB7XG4gIHZhciB2ID0gcGFyc2UodmVyc2lvbiwgbG9vc2UpO1xuICByZXR1cm4gdiA/IHYudmVyc2lvbiA6IG51bGw7XG59XG5cblxuZXhwb3J0cy5jbGVhbiA9IGNsZWFuO1xuZnVuY3Rpb24gY2xlYW4odmVyc2lvbiwgbG9vc2UpIHtcbiAgdmFyIHMgPSBwYXJzZSh2ZXJzaW9uLnRyaW0oKS5yZXBsYWNlKC9eWz12XSsvLCAnJyksIGxvb3NlKTtcbiAgcmV0dXJuIHMgPyBzLnZlcnNpb24gOiBudWxsO1xufVxuXG5leHBvcnRzLlNlbVZlciA9IFNlbVZlcjtcblxuZnVuY3Rpb24gU2VtVmVyKHZlcnNpb24sIGxvb3NlKSB7XG4gIGlmICh2ZXJzaW9uIGluc3RhbmNlb2YgU2VtVmVyKSB7XG4gICAgaWYgKHZlcnNpb24ubG9vc2UgPT09IGxvb3NlKVxuICAgICAgcmV0dXJuIHZlcnNpb247XG4gICAgZWxzZVxuICAgICAgdmVyc2lvbiA9IHZlcnNpb24udmVyc2lvbjtcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmVyc2lvbiAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIFZlcnNpb246ICcgKyB2ZXJzaW9uKTtcbiAgfVxuXG4gIGlmICh2ZXJzaW9uLmxlbmd0aCA+IE1BWF9MRU5HVEgpXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcigndmVyc2lvbiBpcyBsb25nZXIgdGhhbiAnICsgTUFYX0xFTkdUSCArICcgY2hhcmFjdGVycycpXG5cbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFNlbVZlcikpXG4gICAgcmV0dXJuIG5ldyBTZW1WZXIodmVyc2lvbiwgbG9vc2UpO1xuXG4gIGRlYnVnKCdTZW1WZXInLCB2ZXJzaW9uLCBsb29zZSk7XG4gIHRoaXMubG9vc2UgPSBsb29zZTtcbiAgdmFyIG0gPSB2ZXJzaW9uLnRyaW0oKS5tYXRjaChsb29zZSA/IHJlW0xPT1NFXSA6IHJlW0ZVTExdKTtcblxuICBpZiAoIW0pXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBWZXJzaW9uOiAnICsgdmVyc2lvbik7XG5cbiAgdGhpcy5yYXcgPSB2ZXJzaW9uO1xuXG4gIC8vIHRoZXNlIGFyZSBhY3R1YWxseSBudW1iZXJzXG4gIHRoaXMubWFqb3IgPSArbVsxXTtcbiAgdGhpcy5taW5vciA9ICttWzJdO1xuICB0aGlzLnBhdGNoID0gK21bM107XG5cbiAgaWYgKHRoaXMubWFqb3IgPiBNQVhfU0FGRV9JTlRFR0VSIHx8IHRoaXMubWFqb3IgPCAwKVxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgbWFqb3IgdmVyc2lvbicpXG5cbiAgaWYgKHRoaXMubWlub3IgPiBNQVhfU0FGRV9JTlRFR0VSIHx8IHRoaXMubWlub3IgPCAwKVxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgbWlub3IgdmVyc2lvbicpXG5cbiAgaWYgKHRoaXMucGF0Y2ggPiBNQVhfU0FGRV9JTlRFR0VSIHx8IHRoaXMucGF0Y2ggPCAwKVxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgcGF0Y2ggdmVyc2lvbicpXG5cbiAgLy8gbnVtYmVyaWZ5IGFueSBwcmVyZWxlYXNlIG51bWVyaWMgaWRzXG4gIGlmICghbVs0XSlcbiAgICB0aGlzLnByZXJlbGVhc2UgPSBbXTtcbiAgZWxzZVxuICAgIHRoaXMucHJlcmVsZWFzZSA9IG1bNF0uc3BsaXQoJy4nKS5tYXAoZnVuY3Rpb24oaWQpIHtcbiAgICAgIGlmICgvXlswLTldKyQvLnRlc3QoaWQpKSB7XG4gICAgICAgIHZhciBudW0gPSAraWRcbiAgICAgICAgaWYgKG51bSA+PSAwICYmIG51bSA8IE1BWF9TQUZFX0lOVEVHRVIpXG4gICAgICAgICAgcmV0dXJuIG51bVxuICAgICAgfVxuICAgICAgcmV0dXJuIGlkO1xuICAgIH0pO1xuXG4gIHRoaXMuYnVpbGQgPSBtWzVdID8gbVs1XS5zcGxpdCgnLicpIDogW107XG4gIHRoaXMuZm9ybWF0KCk7XG59XG5cblNlbVZlci5wcm90b3R5cGUuZm9ybWF0ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMudmVyc2lvbiA9IHRoaXMubWFqb3IgKyAnLicgKyB0aGlzLm1pbm9yICsgJy4nICsgdGhpcy5wYXRjaDtcbiAgaWYgKHRoaXMucHJlcmVsZWFzZS5sZW5ndGgpXG4gICAgdGhpcy52ZXJzaW9uICs9ICctJyArIHRoaXMucHJlcmVsZWFzZS5qb2luKCcuJyk7XG4gIHJldHVybiB0aGlzLnZlcnNpb247XG59O1xuXG5TZW1WZXIucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnZlcnNpb247XG59O1xuXG5TZW1WZXIucHJvdG90eXBlLmNvbXBhcmUgPSBmdW5jdGlvbihvdGhlcikge1xuICBkZWJ1ZygnU2VtVmVyLmNvbXBhcmUnLCB0aGlzLnZlcnNpb24sIHRoaXMubG9vc2UsIG90aGVyKTtcbiAgaWYgKCEob3RoZXIgaW5zdGFuY2VvZiBTZW1WZXIpKVxuICAgIG90aGVyID0gbmV3IFNlbVZlcihvdGhlciwgdGhpcy5sb29zZSk7XG5cbiAgcmV0dXJuIHRoaXMuY29tcGFyZU1haW4ob3RoZXIpIHx8IHRoaXMuY29tcGFyZVByZShvdGhlcik7XG59O1xuXG5TZW1WZXIucHJvdG90eXBlLmNvbXBhcmVNYWluID0gZnVuY3Rpb24ob3RoZXIpIHtcbiAgaWYgKCEob3RoZXIgaW5zdGFuY2VvZiBTZW1WZXIpKVxuICAgIG90aGVyID0gbmV3IFNlbVZlcihvdGhlciwgdGhpcy5sb29zZSk7XG5cbiAgcmV0dXJuIGNvbXBhcmVJZGVudGlmaWVycyh0aGlzLm1ham9yLCBvdGhlci5tYWpvcikgfHxcbiAgICAgICAgIGNvbXBhcmVJZGVudGlmaWVycyh0aGlzLm1pbm9yLCBvdGhlci5taW5vcikgfHxcbiAgICAgICAgIGNvbXBhcmVJZGVudGlmaWVycyh0aGlzLnBhdGNoLCBvdGhlci5wYXRjaCk7XG59O1xuXG5TZW1WZXIucHJvdG90eXBlLmNvbXBhcmVQcmUgPSBmdW5jdGlvbihvdGhlcikge1xuICBpZiAoIShvdGhlciBpbnN0YW5jZW9mIFNlbVZlcikpXG4gICAgb3RoZXIgPSBuZXcgU2VtVmVyKG90aGVyLCB0aGlzLmxvb3NlKTtcblxuICAvLyBOT1QgaGF2aW5nIGEgcHJlcmVsZWFzZSBpcyA+IGhhdmluZyBvbmVcbiAgaWYgKHRoaXMucHJlcmVsZWFzZS5sZW5ndGggJiYgIW90aGVyLnByZXJlbGVhc2UubGVuZ3RoKVxuICAgIHJldHVybiAtMTtcbiAgZWxzZSBpZiAoIXRoaXMucHJlcmVsZWFzZS5sZW5ndGggJiYgb3RoZXIucHJlcmVsZWFzZS5sZW5ndGgpXG4gICAgcmV0dXJuIDE7XG4gIGVsc2UgaWYgKCF0aGlzLnByZXJlbGVhc2UubGVuZ3RoICYmICFvdGhlci5wcmVyZWxlYXNlLmxlbmd0aClcbiAgICByZXR1cm4gMDtcblxuICB2YXIgaSA9IDA7XG4gIGRvIHtcbiAgICB2YXIgYSA9IHRoaXMucHJlcmVsZWFzZVtpXTtcbiAgICB2YXIgYiA9IG90aGVyLnByZXJlbGVhc2VbaV07XG4gICAgZGVidWcoJ3ByZXJlbGVhc2UgY29tcGFyZScsIGksIGEsIGIpO1xuICAgIGlmIChhID09PSB1bmRlZmluZWQgJiYgYiA9PT0gdW5kZWZpbmVkKVxuICAgICAgcmV0dXJuIDA7XG4gICAgZWxzZSBpZiAoYiA9PT0gdW5kZWZpbmVkKVxuICAgICAgcmV0dXJuIDE7XG4gICAgZWxzZSBpZiAoYSA9PT0gdW5kZWZpbmVkKVxuICAgICAgcmV0dXJuIC0xO1xuICAgIGVsc2UgaWYgKGEgPT09IGIpXG4gICAgICBjb250aW51ZTtcbiAgICBlbHNlXG4gICAgICByZXR1cm4gY29tcGFyZUlkZW50aWZpZXJzKGEsIGIpO1xuICB9IHdoaWxlICgrK2kpO1xufTtcblxuLy8gcHJlbWlub3Igd2lsbCBidW1wIHRoZSB2ZXJzaW9uIHVwIHRvIHRoZSBuZXh0IG1pbm9yIHJlbGVhc2UsIGFuZCBpbW1lZGlhdGVseVxuLy8gZG93biB0byBwcmUtcmVsZWFzZS4gcHJlbWFqb3IgYW5kIHByZXBhdGNoIHdvcmsgdGhlIHNhbWUgd2F5LlxuU2VtVmVyLnByb3RvdHlwZS5pbmMgPSBmdW5jdGlvbihyZWxlYXNlLCBpZGVudGlmaWVyKSB7XG4gIHN3aXRjaCAocmVsZWFzZSkge1xuICAgIGNhc2UgJ3ByZW1ham9yJzpcbiAgICAgIHRoaXMucHJlcmVsZWFzZS5sZW5ndGggPSAwO1xuICAgICAgdGhpcy5wYXRjaCA9IDA7XG4gICAgICB0aGlzLm1pbm9yID0gMDtcbiAgICAgIHRoaXMubWFqb3IrKztcbiAgICAgIHRoaXMuaW5jKCdwcmUnLCBpZGVudGlmaWVyKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3ByZW1pbm9yJzpcbiAgICAgIHRoaXMucHJlcmVsZWFzZS5sZW5ndGggPSAwO1xuICAgICAgdGhpcy5wYXRjaCA9IDA7XG4gICAgICB0aGlzLm1pbm9yKys7XG4gICAgICB0aGlzLmluYygncHJlJywgaWRlbnRpZmllcik7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdwcmVwYXRjaCc6XG4gICAgICAvLyBJZiB0aGlzIGlzIGFscmVhZHkgYSBwcmVyZWxlYXNlLCBpdCB3aWxsIGJ1bXAgdG8gdGhlIG5leHQgdmVyc2lvblxuICAgICAgLy8gZHJvcCBhbnkgcHJlcmVsZWFzZXMgdGhhdCBtaWdodCBhbHJlYWR5IGV4aXN0LCBzaW5jZSB0aGV5IGFyZSBub3RcbiAgICAgIC8vIHJlbGV2YW50IGF0IHRoaXMgcG9pbnQuXG4gICAgICB0aGlzLnByZXJlbGVhc2UubGVuZ3RoID0gMDtcbiAgICAgIHRoaXMuaW5jKCdwYXRjaCcsIGlkZW50aWZpZXIpO1xuICAgICAgdGhpcy5pbmMoJ3ByZScsIGlkZW50aWZpZXIpO1xuICAgICAgYnJlYWs7XG4gICAgLy8gSWYgdGhlIGlucHV0IGlzIGEgbm9uLXByZXJlbGVhc2UgdmVyc2lvbiwgdGhpcyBhY3RzIHRoZSBzYW1lIGFzXG4gICAgLy8gcHJlcGF0Y2guXG4gICAgY2FzZSAncHJlcmVsZWFzZSc6XG4gICAgICBpZiAodGhpcy5wcmVyZWxlYXNlLmxlbmd0aCA9PT0gMClcbiAgICAgICAgdGhpcy5pbmMoJ3BhdGNoJywgaWRlbnRpZmllcik7XG4gICAgICB0aGlzLmluYygncHJlJywgaWRlbnRpZmllcik7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ21ham9yJzpcbiAgICAgIC8vIElmIHRoaXMgaXMgYSBwcmUtbWFqb3IgdmVyc2lvbiwgYnVtcCB1cCB0byB0aGUgc2FtZSBtYWpvciB2ZXJzaW9uLlxuICAgICAgLy8gT3RoZXJ3aXNlIGluY3JlbWVudCBtYWpvci5cbiAgICAgIC8vIDEuMC4wLTUgYnVtcHMgdG8gMS4wLjBcbiAgICAgIC8vIDEuMS4wIGJ1bXBzIHRvIDIuMC4wXG4gICAgICBpZiAodGhpcy5taW5vciAhPT0gMCB8fCB0aGlzLnBhdGNoICE9PSAwIHx8IHRoaXMucHJlcmVsZWFzZS5sZW5ndGggPT09IDApXG4gICAgICAgIHRoaXMubWFqb3IrKztcbiAgICAgIHRoaXMubWlub3IgPSAwO1xuICAgICAgdGhpcy5wYXRjaCA9IDA7XG4gICAgICB0aGlzLnByZXJlbGVhc2UgPSBbXTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ21pbm9yJzpcbiAgICAgIC8vIElmIHRoaXMgaXMgYSBwcmUtbWlub3IgdmVyc2lvbiwgYnVtcCB1cCB0byB0aGUgc2FtZSBtaW5vciB2ZXJzaW9uLlxuICAgICAgLy8gT3RoZXJ3aXNlIGluY3JlbWVudCBtaW5vci5cbiAgICAgIC8vIDEuMi4wLTUgYnVtcHMgdG8gMS4yLjBcbiAgICAgIC8vIDEuMi4xIGJ1bXBzIHRvIDEuMy4wXG4gICAgICBpZiAodGhpcy5wYXRjaCAhPT0gMCB8fCB0aGlzLnByZXJlbGVhc2UubGVuZ3RoID09PSAwKVxuICAgICAgICB0aGlzLm1pbm9yKys7XG4gICAgICB0aGlzLnBhdGNoID0gMDtcbiAgICAgIHRoaXMucHJlcmVsZWFzZSA9IFtdO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAncGF0Y2gnOlxuICAgICAgLy8gSWYgdGhpcyBpcyBub3QgYSBwcmUtcmVsZWFzZSB2ZXJzaW9uLCBpdCB3aWxsIGluY3JlbWVudCB0aGUgcGF0Y2guXG4gICAgICAvLyBJZiBpdCBpcyBhIHByZS1yZWxlYXNlIGl0IHdpbGwgYnVtcCB1cCB0byB0aGUgc2FtZSBwYXRjaCB2ZXJzaW9uLlxuICAgICAgLy8gMS4yLjAtNSBwYXRjaGVzIHRvIDEuMi4wXG4gICAgICAvLyAxLjIuMCBwYXRjaGVzIHRvIDEuMi4xXG4gICAgICBpZiAodGhpcy5wcmVyZWxlYXNlLmxlbmd0aCA9PT0gMClcbiAgICAgICAgdGhpcy5wYXRjaCsrO1xuICAgICAgdGhpcy5wcmVyZWxlYXNlID0gW107XG4gICAgICBicmVhaztcbiAgICAvLyBUaGlzIHByb2JhYmx5IHNob3VsZG4ndCBiZSB1c2VkIHB1YmxpY2x5LlxuICAgIC8vIDEuMC4wIFwicHJlXCIgd291bGQgYmVjb21lIDEuMC4wLTAgd2hpY2ggaXMgdGhlIHdyb25nIGRpcmVjdGlvbi5cbiAgICBjYXNlICdwcmUnOlxuICAgICAgaWYgKHRoaXMucHJlcmVsZWFzZS5sZW5ndGggPT09IDApXG4gICAgICAgIHRoaXMucHJlcmVsZWFzZSA9IFswXTtcbiAgICAgIGVsc2Uge1xuICAgICAgICB2YXIgaSA9IHRoaXMucHJlcmVsZWFzZS5sZW5ndGg7XG4gICAgICAgIHdoaWxlICgtLWkgPj0gMCkge1xuICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcmVyZWxlYXNlW2ldID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgdGhpcy5wcmVyZWxlYXNlW2ldKys7XG4gICAgICAgICAgICBpID0gLTI7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChpID09PSAtMSkgLy8gZGlkbid0IGluY3JlbWVudCBhbnl0aGluZ1xuICAgICAgICAgIHRoaXMucHJlcmVsZWFzZS5wdXNoKDApO1xuICAgICAgfVxuICAgICAgaWYgKGlkZW50aWZpZXIpIHtcbiAgICAgICAgLy8gMS4yLjAtYmV0YS4xIGJ1bXBzIHRvIDEuMi4wLWJldGEuMixcbiAgICAgICAgLy8gMS4yLjAtYmV0YS5mb29ibHogb3IgMS4yLjAtYmV0YSBidW1wcyB0byAxLjIuMC1iZXRhLjBcbiAgICAgICAgaWYgKHRoaXMucHJlcmVsZWFzZVswXSA9PT0gaWRlbnRpZmllcikge1xuICAgICAgICAgIGlmIChpc05hTih0aGlzLnByZXJlbGVhc2VbMV0pKVxuICAgICAgICAgICAgdGhpcy5wcmVyZWxlYXNlID0gW2lkZW50aWZpZXIsIDBdO1xuICAgICAgICB9IGVsc2VcbiAgICAgICAgICB0aGlzLnByZXJlbGVhc2UgPSBbaWRlbnRpZmllciwgMF07XG4gICAgICB9XG4gICAgICBicmVhaztcblxuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgaW5jcmVtZW50IGFyZ3VtZW50OiAnICsgcmVsZWFzZSk7XG4gIH1cbiAgdGhpcy5mb3JtYXQoKTtcbiAgdGhpcy5yYXcgPSB0aGlzLnZlcnNpb247XG4gIHJldHVybiB0aGlzO1xufTtcblxuZXhwb3J0cy5pbmMgPSBpbmM7XG5mdW5jdGlvbiBpbmModmVyc2lvbiwgcmVsZWFzZSwgbG9vc2UsIGlkZW50aWZpZXIpIHtcbiAgaWYgKHR5cGVvZihsb29zZSkgPT09ICdzdHJpbmcnKSB7XG4gICAgaWRlbnRpZmllciA9IGxvb3NlO1xuICAgIGxvb3NlID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgdHJ5IHtcbiAgICByZXR1cm4gbmV3IFNlbVZlcih2ZXJzaW9uLCBsb29zZSkuaW5jKHJlbGVhc2UsIGlkZW50aWZpZXIpLnZlcnNpb247XG4gIH0gY2F0Y2ggKGVyKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuZXhwb3J0cy5kaWZmID0gZGlmZjtcbmZ1bmN0aW9uIGRpZmYodmVyc2lvbjEsIHZlcnNpb24yKSB7XG4gIGlmIChlcSh2ZXJzaW9uMSwgdmVyc2lvbjIpKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHYxID0gcGFyc2UodmVyc2lvbjEpO1xuICAgIHZhciB2MiA9IHBhcnNlKHZlcnNpb24yKTtcbiAgICBpZiAodjEucHJlcmVsZWFzZS5sZW5ndGggfHwgdjIucHJlcmVsZWFzZS5sZW5ndGgpIHtcbiAgICAgIGZvciAodmFyIGtleSBpbiB2MSkge1xuICAgICAgICBpZiAoa2V5ID09PSAnbWFqb3InIHx8IGtleSA9PT0gJ21pbm9yJyB8fCBrZXkgPT09ICdwYXRjaCcpIHtcbiAgICAgICAgICBpZiAodjFba2V5XSAhPT0gdjJba2V5XSkge1xuICAgICAgICAgICAgcmV0dXJuICdwcmUnK2tleTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiAncHJlcmVsZWFzZSc7XG4gICAgfVxuICAgIGZvciAodmFyIGtleSBpbiB2MSkge1xuICAgICAgaWYgKGtleSA9PT0gJ21ham9yJyB8fCBrZXkgPT09ICdtaW5vcicgfHwga2V5ID09PSAncGF0Y2gnKSB7XG4gICAgICAgIGlmICh2MVtrZXldICE9PSB2MltrZXldKSB7XG4gICAgICAgICAgcmV0dXJuIGtleTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnRzLmNvbXBhcmVJZGVudGlmaWVycyA9IGNvbXBhcmVJZGVudGlmaWVycztcblxudmFyIG51bWVyaWMgPSAvXlswLTldKyQvO1xuZnVuY3Rpb24gY29tcGFyZUlkZW50aWZpZXJzKGEsIGIpIHtcbiAgdmFyIGFudW0gPSBudW1lcmljLnRlc3QoYSk7XG4gIHZhciBibnVtID0gbnVtZXJpYy50ZXN0KGIpO1xuXG4gIGlmIChhbnVtICYmIGJudW0pIHtcbiAgICBhID0gK2E7XG4gICAgYiA9ICtiO1xuICB9XG5cbiAgcmV0dXJuIChhbnVtICYmICFibnVtKSA/IC0xIDpcbiAgICAgICAgIChibnVtICYmICFhbnVtKSA/IDEgOlxuICAgICAgICAgYSA8IGIgPyAtMSA6XG4gICAgICAgICBhID4gYiA/IDEgOlxuICAgICAgICAgMDtcbn1cblxuZXhwb3J0cy5yY29tcGFyZUlkZW50aWZpZXJzID0gcmNvbXBhcmVJZGVudGlmaWVycztcbmZ1bmN0aW9uIHJjb21wYXJlSWRlbnRpZmllcnMoYSwgYikge1xuICByZXR1cm4gY29tcGFyZUlkZW50aWZpZXJzKGIsIGEpO1xufVxuXG5leHBvcnRzLm1ham9yID0gbWFqb3I7XG5mdW5jdGlvbiBtYWpvcihhLCBsb29zZSkge1xuICByZXR1cm4gbmV3IFNlbVZlcihhLCBsb29zZSkubWFqb3I7XG59XG5cbmV4cG9ydHMubWlub3IgPSBtaW5vcjtcbmZ1bmN0aW9uIG1pbm9yKGEsIGxvb3NlKSB7XG4gIHJldHVybiBuZXcgU2VtVmVyKGEsIGxvb3NlKS5taW5vcjtcbn1cblxuZXhwb3J0cy5wYXRjaCA9IHBhdGNoO1xuZnVuY3Rpb24gcGF0Y2goYSwgbG9vc2UpIHtcbiAgcmV0dXJuIG5ldyBTZW1WZXIoYSwgbG9vc2UpLnBhdGNoO1xufVxuXG5leHBvcnRzLmNvbXBhcmUgPSBjb21wYXJlO1xuZnVuY3Rpb24gY29tcGFyZShhLCBiLCBsb29zZSkge1xuICByZXR1cm4gbmV3IFNlbVZlcihhLCBsb29zZSkuY29tcGFyZShiKTtcbn1cblxuZXhwb3J0cy5jb21wYXJlTG9vc2UgPSBjb21wYXJlTG9vc2U7XG5mdW5jdGlvbiBjb21wYXJlTG9vc2UoYSwgYikge1xuICByZXR1cm4gY29tcGFyZShhLCBiLCB0cnVlKTtcbn1cblxuZXhwb3J0cy5yY29tcGFyZSA9IHJjb21wYXJlO1xuZnVuY3Rpb24gcmNvbXBhcmUoYSwgYiwgbG9vc2UpIHtcbiAgcmV0dXJuIGNvbXBhcmUoYiwgYSwgbG9vc2UpO1xufVxuXG5leHBvcnRzLnNvcnQgPSBzb3J0O1xuZnVuY3Rpb24gc29ydChsaXN0LCBsb29zZSkge1xuICByZXR1cm4gbGlzdC5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gZXhwb3J0cy5jb21wYXJlKGEsIGIsIGxvb3NlKTtcbiAgfSk7XG59XG5cbmV4cG9ydHMucnNvcnQgPSByc29ydDtcbmZ1bmN0aW9uIHJzb3J0KGxpc3QsIGxvb3NlKSB7XG4gIHJldHVybiBsaXN0LnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgIHJldHVybiBleHBvcnRzLnJjb21wYXJlKGEsIGIsIGxvb3NlKTtcbiAgfSk7XG59XG5cbmV4cG9ydHMuZ3QgPSBndDtcbmZ1bmN0aW9uIGd0KGEsIGIsIGxvb3NlKSB7XG4gIHJldHVybiBjb21wYXJlKGEsIGIsIGxvb3NlKSA+IDA7XG59XG5cbmV4cG9ydHMubHQgPSBsdDtcbmZ1bmN0aW9uIGx0KGEsIGIsIGxvb3NlKSB7XG4gIHJldHVybiBjb21wYXJlKGEsIGIsIGxvb3NlKSA8IDA7XG59XG5cbmV4cG9ydHMuZXEgPSBlcTtcbmZ1bmN0aW9uIGVxKGEsIGIsIGxvb3NlKSB7XG4gIHJldHVybiBjb21wYXJlKGEsIGIsIGxvb3NlKSA9PT0gMDtcbn1cblxuZXhwb3J0cy5uZXEgPSBuZXE7XG5mdW5jdGlvbiBuZXEoYSwgYiwgbG9vc2UpIHtcbiAgcmV0dXJuIGNvbXBhcmUoYSwgYiwgbG9vc2UpICE9PSAwO1xufVxuXG5leHBvcnRzLmd0ZSA9IGd0ZTtcbmZ1bmN0aW9uIGd0ZShhLCBiLCBsb29zZSkge1xuICByZXR1cm4gY29tcGFyZShhLCBiLCBsb29zZSkgPj0gMDtcbn1cblxuZXhwb3J0cy5sdGUgPSBsdGU7XG5mdW5jdGlvbiBsdGUoYSwgYiwgbG9vc2UpIHtcbiAgcmV0dXJuIGNvbXBhcmUoYSwgYiwgbG9vc2UpIDw9IDA7XG59XG5cbmV4cG9ydHMuY21wID0gY21wO1xuZnVuY3Rpb24gY21wKGEsIG9wLCBiLCBsb29zZSkge1xuICB2YXIgcmV0O1xuICBzd2l0Y2ggKG9wKSB7XG4gICAgY2FzZSAnPT09JzpcbiAgICAgIGlmICh0eXBlb2YgYSA9PT0gJ29iamVjdCcpIGEgPSBhLnZlcnNpb247XG4gICAgICBpZiAodHlwZW9mIGIgPT09ICdvYmplY3QnKSBiID0gYi52ZXJzaW9uO1xuICAgICAgcmV0ID0gYSA9PT0gYjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJyE9PSc6XG4gICAgICBpZiAodHlwZW9mIGEgPT09ICdvYmplY3QnKSBhID0gYS52ZXJzaW9uO1xuICAgICAgaWYgKHR5cGVvZiBiID09PSAnb2JqZWN0JykgYiA9IGIudmVyc2lvbjtcbiAgICAgIHJldCA9IGEgIT09IGI7XG4gICAgICBicmVhaztcbiAgICBjYXNlICcnOiBjYXNlICc9JzogY2FzZSAnPT0nOiByZXQgPSBlcShhLCBiLCBsb29zZSk7IGJyZWFrO1xuICAgIGNhc2UgJyE9JzogcmV0ID0gbmVxKGEsIGIsIGxvb3NlKTsgYnJlYWs7XG4gICAgY2FzZSAnPic6IHJldCA9IGd0KGEsIGIsIGxvb3NlKTsgYnJlYWs7XG4gICAgY2FzZSAnPj0nOiByZXQgPSBndGUoYSwgYiwgbG9vc2UpOyBicmVhaztcbiAgICBjYXNlICc8JzogcmV0ID0gbHQoYSwgYiwgbG9vc2UpOyBicmVhaztcbiAgICBjYXNlICc8PSc6IHJldCA9IGx0ZShhLCBiLCBsb29zZSk7IGJyZWFrO1xuICAgIGRlZmF1bHQ6IHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgb3BlcmF0b3I6ICcgKyBvcCk7XG4gIH1cbiAgcmV0dXJuIHJldDtcbn1cblxuZXhwb3J0cy5Db21wYXJhdG9yID0gQ29tcGFyYXRvcjtcbmZ1bmN0aW9uIENvbXBhcmF0b3IoY29tcCwgbG9vc2UpIHtcbiAgaWYgKGNvbXAgaW5zdGFuY2VvZiBDb21wYXJhdG9yKSB7XG4gICAgaWYgKGNvbXAubG9vc2UgPT09IGxvb3NlKVxuICAgICAgcmV0dXJuIGNvbXA7XG4gICAgZWxzZVxuICAgICAgY29tcCA9IGNvbXAudmFsdWU7XG4gIH1cblxuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgQ29tcGFyYXRvcikpXG4gICAgcmV0dXJuIG5ldyBDb21wYXJhdG9yKGNvbXAsIGxvb3NlKTtcblxuICBkZWJ1ZygnY29tcGFyYXRvcicsIGNvbXAsIGxvb3NlKTtcbiAgdGhpcy5sb29zZSA9IGxvb3NlO1xuICB0aGlzLnBhcnNlKGNvbXApO1xuXG4gIGlmICh0aGlzLnNlbXZlciA9PT0gQU5ZKVxuICAgIHRoaXMudmFsdWUgPSAnJztcbiAgZWxzZVxuICAgIHRoaXMudmFsdWUgPSB0aGlzLm9wZXJhdG9yICsgdGhpcy5zZW12ZXIudmVyc2lvbjtcblxuICBkZWJ1ZygnY29tcCcsIHRoaXMpO1xufVxuXG52YXIgQU5ZID0ge307XG5Db21wYXJhdG9yLnByb3RvdHlwZS5wYXJzZSA9IGZ1bmN0aW9uKGNvbXApIHtcbiAgdmFyIHIgPSB0aGlzLmxvb3NlID8gcmVbQ09NUEFSQVRPUkxPT1NFXSA6IHJlW0NPTVBBUkFUT1JdO1xuICB2YXIgbSA9IGNvbXAubWF0Y2gocik7XG5cbiAgaWYgKCFtKVxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgY29tcGFyYXRvcjogJyArIGNvbXApO1xuXG4gIHRoaXMub3BlcmF0b3IgPSBtWzFdO1xuICBpZiAodGhpcy5vcGVyYXRvciA9PT0gJz0nKVxuICAgIHRoaXMub3BlcmF0b3IgPSAnJztcblxuICAvLyBpZiBpdCBsaXRlcmFsbHkgaXMganVzdCAnPicgb3IgJycgdGhlbiBhbGxvdyBhbnl0aGluZy5cbiAgaWYgKCFtWzJdKVxuICAgIHRoaXMuc2VtdmVyID0gQU5ZO1xuICBlbHNlXG4gICAgdGhpcy5zZW12ZXIgPSBuZXcgU2VtVmVyKG1bMl0sIHRoaXMubG9vc2UpO1xufTtcblxuQ29tcGFyYXRvci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMudmFsdWU7XG59O1xuXG5Db21wYXJhdG9yLnByb3RvdHlwZS50ZXN0ID0gZnVuY3Rpb24odmVyc2lvbikge1xuICBkZWJ1ZygnQ29tcGFyYXRvci50ZXN0JywgdmVyc2lvbiwgdGhpcy5sb29zZSk7XG5cbiAgaWYgKHRoaXMuc2VtdmVyID09PSBBTlkpXG4gICAgcmV0dXJuIHRydWU7XG5cbiAgaWYgKHR5cGVvZiB2ZXJzaW9uID09PSAnc3RyaW5nJylcbiAgICB2ZXJzaW9uID0gbmV3IFNlbVZlcih2ZXJzaW9uLCB0aGlzLmxvb3NlKTtcblxuICByZXR1cm4gY21wKHZlcnNpb24sIHRoaXMub3BlcmF0b3IsIHRoaXMuc2VtdmVyLCB0aGlzLmxvb3NlKTtcbn07XG5cblxuZXhwb3J0cy5SYW5nZSA9IFJhbmdlO1xuZnVuY3Rpb24gUmFuZ2UocmFuZ2UsIGxvb3NlKSB7XG4gIGlmICgocmFuZ2UgaW5zdGFuY2VvZiBSYW5nZSkgJiYgcmFuZ2UubG9vc2UgPT09IGxvb3NlKVxuICAgIHJldHVybiByYW5nZTtcblxuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgUmFuZ2UpKVxuICAgIHJldHVybiBuZXcgUmFuZ2UocmFuZ2UsIGxvb3NlKTtcblxuICB0aGlzLmxvb3NlID0gbG9vc2U7XG5cbiAgLy8gRmlyc3QsIHNwbGl0IGJhc2VkIG9uIGJvb2xlYW4gb3IgfHxcbiAgdGhpcy5yYXcgPSByYW5nZTtcbiAgdGhpcy5zZXQgPSByYW5nZS5zcGxpdCgvXFxzKlxcfFxcfFxccyovKS5tYXAoZnVuY3Rpb24ocmFuZ2UpIHtcbiAgICByZXR1cm4gdGhpcy5wYXJzZVJhbmdlKHJhbmdlLnRyaW0oKSk7XG4gIH0sIHRoaXMpLmZpbHRlcihmdW5jdGlvbihjKSB7XG4gICAgLy8gdGhyb3cgb3V0IGFueSB0aGF0IGFyZSBub3QgcmVsZXZhbnQgZm9yIHdoYXRldmVyIHJlYXNvblxuICAgIHJldHVybiBjLmxlbmd0aDtcbiAgfSk7XG5cbiAgaWYgKCF0aGlzLnNldC5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIFNlbVZlciBSYW5nZTogJyArIHJhbmdlKTtcbiAgfVxuXG4gIHRoaXMuZm9ybWF0KCk7XG59XG5cblJhbmdlLnByb3RvdHlwZS5mb3JtYXQgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5yYW5nZSA9IHRoaXMuc2V0Lm1hcChmdW5jdGlvbihjb21wcykge1xuICAgIHJldHVybiBjb21wcy5qb2luKCcgJykudHJpbSgpO1xuICB9KS5qb2luKCd8fCcpLnRyaW0oKTtcbiAgcmV0dXJuIHRoaXMucmFuZ2U7XG59O1xuXG5SYW5nZS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMucmFuZ2U7XG59O1xuXG5SYW5nZS5wcm90b3R5cGUucGFyc2VSYW5nZSA9IGZ1bmN0aW9uKHJhbmdlKSB7XG4gIHZhciBsb29zZSA9IHRoaXMubG9vc2U7XG4gIHJhbmdlID0gcmFuZ2UudHJpbSgpO1xuICBkZWJ1ZygncmFuZ2UnLCByYW5nZSwgbG9vc2UpO1xuICAvLyBgMS4yLjMgLSAxLjIuNGAgPT4gYD49MS4yLjMgPD0xLjIuNGBcbiAgdmFyIGhyID0gbG9vc2UgPyByZVtIWVBIRU5SQU5HRUxPT1NFXSA6IHJlW0hZUEhFTlJBTkdFXTtcbiAgcmFuZ2UgPSByYW5nZS5yZXBsYWNlKGhyLCBoeXBoZW5SZXBsYWNlKTtcbiAgZGVidWcoJ2h5cGhlbiByZXBsYWNlJywgcmFuZ2UpO1xuICAvLyBgPiAxLjIuMyA8IDEuMi41YCA9PiBgPjEuMi4zIDwxLjIuNWBcbiAgcmFuZ2UgPSByYW5nZS5yZXBsYWNlKHJlW0NPTVBBUkFUT1JUUklNXSwgY29tcGFyYXRvclRyaW1SZXBsYWNlKTtcbiAgZGVidWcoJ2NvbXBhcmF0b3IgdHJpbScsIHJhbmdlLCByZVtDT01QQVJBVE9SVFJJTV0pO1xuXG4gIC8vIGB+IDEuMi4zYCA9PiBgfjEuMi4zYFxuICByYW5nZSA9IHJhbmdlLnJlcGxhY2UocmVbVElMREVUUklNXSwgdGlsZGVUcmltUmVwbGFjZSk7XG5cbiAgLy8gYF4gMS4yLjNgID0+IGBeMS4yLjNgXG4gIHJhbmdlID0gcmFuZ2UucmVwbGFjZShyZVtDQVJFVFRSSU1dLCBjYXJldFRyaW1SZXBsYWNlKTtcblxuICAvLyBub3JtYWxpemUgc3BhY2VzXG4gIHJhbmdlID0gcmFuZ2Uuc3BsaXQoL1xccysvKS5qb2luKCcgJyk7XG5cbiAgLy8gQXQgdGhpcyBwb2ludCwgdGhlIHJhbmdlIGlzIGNvbXBsZXRlbHkgdHJpbW1lZCBhbmRcbiAgLy8gcmVhZHkgdG8gYmUgc3BsaXQgaW50byBjb21wYXJhdG9ycy5cblxuICB2YXIgY29tcFJlID0gbG9vc2UgPyByZVtDT01QQVJBVE9STE9PU0VdIDogcmVbQ09NUEFSQVRPUl07XG4gIHZhciBzZXQgPSByYW5nZS5zcGxpdCgnICcpLm1hcChmdW5jdGlvbihjb21wKSB7XG4gICAgcmV0dXJuIHBhcnNlQ29tcGFyYXRvcihjb21wLCBsb29zZSk7XG4gIH0pLmpvaW4oJyAnKS5zcGxpdCgvXFxzKy8pO1xuICBpZiAodGhpcy5sb29zZSkge1xuICAgIC8vIGluIGxvb3NlIG1vZGUsIHRocm93IG91dCBhbnkgdGhhdCBhcmUgbm90IHZhbGlkIGNvbXBhcmF0b3JzXG4gICAgc2V0ID0gc2V0LmZpbHRlcihmdW5jdGlvbihjb21wKSB7XG4gICAgICByZXR1cm4gISFjb21wLm1hdGNoKGNvbXBSZSk7XG4gICAgfSk7XG4gIH1cbiAgc2V0ID0gc2V0Lm1hcChmdW5jdGlvbihjb21wKSB7XG4gICAgcmV0dXJuIG5ldyBDb21wYXJhdG9yKGNvbXAsIGxvb3NlKTtcbiAgfSk7XG5cbiAgcmV0dXJuIHNldDtcbn07XG5cbi8vIE1vc3RseSBqdXN0IGZvciB0ZXN0aW5nIGFuZCBsZWdhY3kgQVBJIHJlYXNvbnNcbmV4cG9ydHMudG9Db21wYXJhdG9ycyA9IHRvQ29tcGFyYXRvcnM7XG5mdW5jdGlvbiB0b0NvbXBhcmF0b3JzKHJhbmdlLCBsb29zZSkge1xuICByZXR1cm4gbmV3IFJhbmdlKHJhbmdlLCBsb29zZSkuc2V0Lm1hcChmdW5jdGlvbihjb21wKSB7XG4gICAgcmV0dXJuIGNvbXAubWFwKGZ1bmN0aW9uKGMpIHtcbiAgICAgIHJldHVybiBjLnZhbHVlO1xuICAgIH0pLmpvaW4oJyAnKS50cmltKCkuc3BsaXQoJyAnKTtcbiAgfSk7XG59XG5cbi8vIGNvbXByaXNlZCBvZiB4cmFuZ2VzLCB0aWxkZXMsIHN0YXJzLCBhbmQgZ3RsdCdzIGF0IHRoaXMgcG9pbnQuXG4vLyBhbHJlYWR5IHJlcGxhY2VkIHRoZSBoeXBoZW4gcmFuZ2VzXG4vLyB0dXJuIGludG8gYSBzZXQgb2YgSlVTVCBjb21wYXJhdG9ycy5cbmZ1bmN0aW9uIHBhcnNlQ29tcGFyYXRvcihjb21wLCBsb29zZSkge1xuICBkZWJ1ZygnY29tcCcsIGNvbXApO1xuICBjb21wID0gcmVwbGFjZUNhcmV0cyhjb21wLCBsb29zZSk7XG4gIGRlYnVnKCdjYXJldCcsIGNvbXApO1xuICBjb21wID0gcmVwbGFjZVRpbGRlcyhjb21wLCBsb29zZSk7XG4gIGRlYnVnKCd0aWxkZXMnLCBjb21wKTtcbiAgY29tcCA9IHJlcGxhY2VYUmFuZ2VzKGNvbXAsIGxvb3NlKTtcbiAgZGVidWcoJ3hyYW5nZScsIGNvbXApO1xuICBjb21wID0gcmVwbGFjZVN0YXJzKGNvbXAsIGxvb3NlKTtcbiAgZGVidWcoJ3N0YXJzJywgY29tcCk7XG4gIHJldHVybiBjb21wO1xufVxuXG5mdW5jdGlvbiBpc1goaWQpIHtcbiAgcmV0dXJuICFpZCB8fCBpZC50b0xvd2VyQ2FzZSgpID09PSAneCcgfHwgaWQgPT09ICcqJztcbn1cblxuLy8gfiwgfj4gLS0+ICogKGFueSwga2luZGEgc2lsbHkpXG4vLyB+MiwgfjIueCwgfjIueC54LCB+PjIsIH4+Mi54IH4+Mi54LnggLS0+ID49Mi4wLjAgPDMuMC4wXG4vLyB+Mi4wLCB+Mi4wLngsIH4+Mi4wLCB+PjIuMC54IC0tPiA+PTIuMC4wIDwyLjEuMFxuLy8gfjEuMiwgfjEuMi54LCB+PjEuMiwgfj4xLjIueCAtLT4gPj0xLjIuMCA8MS4zLjBcbi8vIH4xLjIuMywgfj4xLjIuMyAtLT4gPj0xLjIuMyA8MS4zLjBcbi8vIH4xLjIuMCwgfj4xLjIuMCAtLT4gPj0xLjIuMCA8MS4zLjBcbmZ1bmN0aW9uIHJlcGxhY2VUaWxkZXMoY29tcCwgbG9vc2UpIHtcbiAgcmV0dXJuIGNvbXAudHJpbSgpLnNwbGl0KC9cXHMrLykubWFwKGZ1bmN0aW9uKGNvbXApIHtcbiAgICByZXR1cm4gcmVwbGFjZVRpbGRlKGNvbXAsIGxvb3NlKTtcbiAgfSkuam9pbignICcpO1xufVxuXG5mdW5jdGlvbiByZXBsYWNlVGlsZGUoY29tcCwgbG9vc2UpIHtcbiAgdmFyIHIgPSBsb29zZSA/IHJlW1RJTERFTE9PU0VdIDogcmVbVElMREVdO1xuICByZXR1cm4gY29tcC5yZXBsYWNlKHIsIGZ1bmN0aW9uKF8sIE0sIG0sIHAsIHByKSB7XG4gICAgZGVidWcoJ3RpbGRlJywgY29tcCwgXywgTSwgbSwgcCwgcHIpO1xuICAgIHZhciByZXQ7XG5cbiAgICBpZiAoaXNYKE0pKVxuICAgICAgcmV0ID0gJyc7XG4gICAgZWxzZSBpZiAoaXNYKG0pKVxuICAgICAgcmV0ID0gJz49JyArIE0gKyAnLjAuMCA8JyArICgrTSArIDEpICsgJy4wLjAnO1xuICAgIGVsc2UgaWYgKGlzWChwKSlcbiAgICAgIC8vIH4xLjIgPT0gPj0xLjIuMC0gPDEuMy4wLVxuICAgICAgcmV0ID0gJz49JyArIE0gKyAnLicgKyBtICsgJy4wIDwnICsgTSArICcuJyArICgrbSArIDEpICsgJy4wJztcbiAgICBlbHNlIGlmIChwcikge1xuICAgICAgZGVidWcoJ3JlcGxhY2VUaWxkZSBwcicsIHByKTtcbiAgICAgIGlmIChwci5jaGFyQXQoMCkgIT09ICctJylcbiAgICAgICAgcHIgPSAnLScgKyBwcjtcbiAgICAgIHJldCA9ICc+PScgKyBNICsgJy4nICsgbSArICcuJyArIHAgKyBwciArXG4gICAgICAgICAgICAnIDwnICsgTSArICcuJyArICgrbSArIDEpICsgJy4wJztcbiAgICB9IGVsc2VcbiAgICAgIC8vIH4xLjIuMyA9PSA+PTEuMi4zIDwxLjMuMFxuICAgICAgcmV0ID0gJz49JyArIE0gKyAnLicgKyBtICsgJy4nICsgcCArXG4gICAgICAgICAgICAnIDwnICsgTSArICcuJyArICgrbSArIDEpICsgJy4wJztcblxuICAgIGRlYnVnKCd0aWxkZSByZXR1cm4nLCByZXQpO1xuICAgIHJldHVybiByZXQ7XG4gIH0pO1xufVxuXG4vLyBeIC0tPiAqIChhbnksIGtpbmRhIHNpbGx5KVxuLy8gXjIsIF4yLngsIF4yLngueCAtLT4gPj0yLjAuMCA8My4wLjBcbi8vIF4yLjAsIF4yLjAueCAtLT4gPj0yLjAuMCA8My4wLjBcbi8vIF4xLjIsIF4xLjIueCAtLT4gPj0xLjIuMCA8Mi4wLjBcbi8vIF4xLjIuMyAtLT4gPj0xLjIuMyA8Mi4wLjBcbi8vIF4xLjIuMCAtLT4gPj0xLjIuMCA8Mi4wLjBcbmZ1bmN0aW9uIHJlcGxhY2VDYXJldHMoY29tcCwgbG9vc2UpIHtcbiAgcmV0dXJuIGNvbXAudHJpbSgpLnNwbGl0KC9cXHMrLykubWFwKGZ1bmN0aW9uKGNvbXApIHtcbiAgICByZXR1cm4gcmVwbGFjZUNhcmV0KGNvbXAsIGxvb3NlKTtcbiAgfSkuam9pbignICcpO1xufVxuXG5mdW5jdGlvbiByZXBsYWNlQ2FyZXQoY29tcCwgbG9vc2UpIHtcbiAgZGVidWcoJ2NhcmV0JywgY29tcCwgbG9vc2UpO1xuICB2YXIgciA9IGxvb3NlID8gcmVbQ0FSRVRMT09TRV0gOiByZVtDQVJFVF07XG4gIHJldHVybiBjb21wLnJlcGxhY2UociwgZnVuY3Rpb24oXywgTSwgbSwgcCwgcHIpIHtcbiAgICBkZWJ1ZygnY2FyZXQnLCBjb21wLCBfLCBNLCBtLCBwLCBwcik7XG4gICAgdmFyIHJldDtcblxuICAgIGlmIChpc1goTSkpXG4gICAgICByZXQgPSAnJztcbiAgICBlbHNlIGlmIChpc1gobSkpXG4gICAgICByZXQgPSAnPj0nICsgTSArICcuMC4wIDwnICsgKCtNICsgMSkgKyAnLjAuMCc7XG4gICAgZWxzZSBpZiAoaXNYKHApKSB7XG4gICAgICBpZiAoTSA9PT0gJzAnKVxuICAgICAgICByZXQgPSAnPj0nICsgTSArICcuJyArIG0gKyAnLjAgPCcgKyBNICsgJy4nICsgKCttICsgMSkgKyAnLjAnO1xuICAgICAgZWxzZVxuICAgICAgICByZXQgPSAnPj0nICsgTSArICcuJyArIG0gKyAnLjAgPCcgKyAoK00gKyAxKSArICcuMC4wJztcbiAgICB9IGVsc2UgaWYgKHByKSB7XG4gICAgICBkZWJ1ZygncmVwbGFjZUNhcmV0IHByJywgcHIpO1xuICAgICAgaWYgKHByLmNoYXJBdCgwKSAhPT0gJy0nKVxuICAgICAgICBwciA9ICctJyArIHByO1xuICAgICAgaWYgKE0gPT09ICcwJykge1xuICAgICAgICBpZiAobSA9PT0gJzAnKVxuICAgICAgICAgIHJldCA9ICc+PScgKyBNICsgJy4nICsgbSArICcuJyArIHAgKyBwciArXG4gICAgICAgICAgICAgICAgJyA8JyArIE0gKyAnLicgKyBtICsgJy4nICsgKCtwICsgMSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICByZXQgPSAnPj0nICsgTSArICcuJyArIG0gKyAnLicgKyBwICsgcHIgK1xuICAgICAgICAgICAgICAgICcgPCcgKyBNICsgJy4nICsgKCttICsgMSkgKyAnLjAnO1xuICAgICAgfSBlbHNlXG4gICAgICAgIHJldCA9ICc+PScgKyBNICsgJy4nICsgbSArICcuJyArIHAgKyBwciArXG4gICAgICAgICAgICAgICcgPCcgKyAoK00gKyAxKSArICcuMC4wJztcbiAgICB9IGVsc2Uge1xuICAgICAgZGVidWcoJ25vIHByJyk7XG4gICAgICBpZiAoTSA9PT0gJzAnKSB7XG4gICAgICAgIGlmIChtID09PSAnMCcpXG4gICAgICAgICAgcmV0ID0gJz49JyArIE0gKyAnLicgKyBtICsgJy4nICsgcCArXG4gICAgICAgICAgICAgICAgJyA8JyArIE0gKyAnLicgKyBtICsgJy4nICsgKCtwICsgMSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICByZXQgPSAnPj0nICsgTSArICcuJyArIG0gKyAnLicgKyBwICtcbiAgICAgICAgICAgICAgICAnIDwnICsgTSArICcuJyArICgrbSArIDEpICsgJy4wJztcbiAgICAgIH0gZWxzZVxuICAgICAgICByZXQgPSAnPj0nICsgTSArICcuJyArIG0gKyAnLicgKyBwICtcbiAgICAgICAgICAgICAgJyA8JyArICgrTSArIDEpICsgJy4wLjAnO1xuICAgIH1cblxuICAgIGRlYnVnKCdjYXJldCByZXR1cm4nLCByZXQpO1xuICAgIHJldHVybiByZXQ7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiByZXBsYWNlWFJhbmdlcyhjb21wLCBsb29zZSkge1xuICBkZWJ1ZygncmVwbGFjZVhSYW5nZXMnLCBjb21wLCBsb29zZSk7XG4gIHJldHVybiBjb21wLnNwbGl0KC9cXHMrLykubWFwKGZ1bmN0aW9uKGNvbXApIHtcbiAgICByZXR1cm4gcmVwbGFjZVhSYW5nZShjb21wLCBsb29zZSk7XG4gIH0pLmpvaW4oJyAnKTtcbn1cblxuZnVuY3Rpb24gcmVwbGFjZVhSYW5nZShjb21wLCBsb29zZSkge1xuICBjb21wID0gY29tcC50cmltKCk7XG4gIHZhciByID0gbG9vc2UgPyByZVtYUkFOR0VMT09TRV0gOiByZVtYUkFOR0VdO1xuICByZXR1cm4gY29tcC5yZXBsYWNlKHIsIGZ1bmN0aW9uKHJldCwgZ3RsdCwgTSwgbSwgcCwgcHIpIHtcbiAgICBkZWJ1ZygneFJhbmdlJywgY29tcCwgcmV0LCBndGx0LCBNLCBtLCBwLCBwcik7XG4gICAgdmFyIHhNID0gaXNYKE0pO1xuICAgIHZhciB4bSA9IHhNIHx8IGlzWChtKTtcbiAgICB2YXIgeHAgPSB4bSB8fCBpc1gocCk7XG4gICAgdmFyIGFueVggPSB4cDtcblxuICAgIGlmIChndGx0ID09PSAnPScgJiYgYW55WClcbiAgICAgIGd0bHQgPSAnJztcblxuICAgIGlmICh4TSkge1xuICAgICAgaWYgKGd0bHQgPT09ICc+JyB8fCBndGx0ID09PSAnPCcpIHtcbiAgICAgICAgLy8gbm90aGluZyBpcyBhbGxvd2VkXG4gICAgICAgIHJldCA9ICc8MC4wLjAnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gbm90aGluZyBpcyBmb3JiaWRkZW5cbiAgICAgICAgcmV0ID0gJyonO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZ3RsdCAmJiBhbnlYKSB7XG4gICAgICAvLyByZXBsYWNlIFggd2l0aCAwXG4gICAgICBpZiAoeG0pXG4gICAgICAgIG0gPSAwO1xuICAgICAgaWYgKHhwKVxuICAgICAgICBwID0gMDtcblxuICAgICAgaWYgKGd0bHQgPT09ICc+Jykge1xuICAgICAgICAvLyA+MSA9PiA+PTIuMC4wXG4gICAgICAgIC8vID4xLjIgPT4gPj0xLjMuMFxuICAgICAgICAvLyA+MS4yLjMgPT4gPj0gMS4yLjRcbiAgICAgICAgZ3RsdCA9ICc+PSc7XG4gICAgICAgIGlmICh4bSkge1xuICAgICAgICAgIE0gPSArTSArIDE7XG4gICAgICAgICAgbSA9IDA7XG4gICAgICAgICAgcCA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAoeHApIHtcbiAgICAgICAgICBtID0gK20gKyAxO1xuICAgICAgICAgIHAgPSAwO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGd0bHQgPT09ICc8PScpIHtcbiAgICAgICAgLy8gPD0wLjcueCBpcyBhY3R1YWxseSA8MC44LjAsIHNpbmNlIGFueSAwLjcueCBzaG91bGRcbiAgICAgICAgLy8gcGFzcy4gIFNpbWlsYXJseSwgPD03LnggaXMgYWN0dWFsbHkgPDguMC4wLCBldGMuXG4gICAgICAgIGd0bHQgPSAnPCdcbiAgICAgICAgaWYgKHhtKVxuICAgICAgICAgIE0gPSArTSArIDFcbiAgICAgICAgZWxzZVxuICAgICAgICAgIG0gPSArbSArIDFcbiAgICAgIH1cblxuICAgICAgcmV0ID0gZ3RsdCArIE0gKyAnLicgKyBtICsgJy4nICsgcDtcbiAgICB9IGVsc2UgaWYgKHhtKSB7XG4gICAgICByZXQgPSAnPj0nICsgTSArICcuMC4wIDwnICsgKCtNICsgMSkgKyAnLjAuMCc7XG4gICAgfSBlbHNlIGlmICh4cCkge1xuICAgICAgcmV0ID0gJz49JyArIE0gKyAnLicgKyBtICsgJy4wIDwnICsgTSArICcuJyArICgrbSArIDEpICsgJy4wJztcbiAgICB9XG5cbiAgICBkZWJ1ZygneFJhbmdlIHJldHVybicsIHJldCk7XG5cbiAgICByZXR1cm4gcmV0O1xuICB9KTtcbn1cblxuLy8gQmVjYXVzZSAqIGlzIEFORC1lZCB3aXRoIGV2ZXJ5dGhpbmcgZWxzZSBpbiB0aGUgY29tcGFyYXRvcixcbi8vIGFuZCAnJyBtZWFucyBcImFueSB2ZXJzaW9uXCIsIGp1c3QgcmVtb3ZlIHRoZSAqcyBlbnRpcmVseS5cbmZ1bmN0aW9uIHJlcGxhY2VTdGFycyhjb21wLCBsb29zZSkge1xuICBkZWJ1ZygncmVwbGFjZVN0YXJzJywgY29tcCwgbG9vc2UpO1xuICAvLyBMb29zZW5lc3MgaXMgaWdub3JlZCBoZXJlLiAgc3RhciBpcyBhbHdheXMgYXMgbG9vc2UgYXMgaXQgZ2V0cyFcbiAgcmV0dXJuIGNvbXAudHJpbSgpLnJlcGxhY2UocmVbU1RBUl0sICcnKTtcbn1cblxuLy8gVGhpcyBmdW5jdGlvbiBpcyBwYXNzZWQgdG8gc3RyaW5nLnJlcGxhY2UocmVbSFlQSEVOUkFOR0VdKVxuLy8gTSwgbSwgcGF0Y2gsIHByZXJlbGVhc2UsIGJ1aWxkXG4vLyAxLjIgLSAzLjQuNSA9PiA+PTEuMi4wIDw9My40LjVcbi8vIDEuMi4zIC0gMy40ID0+ID49MS4yLjAgPDMuNS4wIEFueSAzLjQueCB3aWxsIGRvXG4vLyAxLjIgLSAzLjQgPT4gPj0xLjIuMCA8My41LjBcbmZ1bmN0aW9uIGh5cGhlblJlcGxhY2UoJDAsXG4gICAgICAgICAgICAgICAgICAgICAgIGZyb20sIGZNLCBmbSwgZnAsIGZwciwgZmIsXG4gICAgICAgICAgICAgICAgICAgICAgIHRvLCB0TSwgdG0sIHRwLCB0cHIsIHRiKSB7XG5cbiAgaWYgKGlzWChmTSkpXG4gICAgZnJvbSA9ICcnO1xuICBlbHNlIGlmIChpc1goZm0pKVxuICAgIGZyb20gPSAnPj0nICsgZk0gKyAnLjAuMCc7XG4gIGVsc2UgaWYgKGlzWChmcCkpXG4gICAgZnJvbSA9ICc+PScgKyBmTSArICcuJyArIGZtICsgJy4wJztcbiAgZWxzZVxuICAgIGZyb20gPSAnPj0nICsgZnJvbTtcblxuICBpZiAoaXNYKHRNKSlcbiAgICB0byA9ICcnO1xuICBlbHNlIGlmIChpc1godG0pKVxuICAgIHRvID0gJzwnICsgKCt0TSArIDEpICsgJy4wLjAnO1xuICBlbHNlIGlmIChpc1godHApKVxuICAgIHRvID0gJzwnICsgdE0gKyAnLicgKyAoK3RtICsgMSkgKyAnLjAnO1xuICBlbHNlIGlmICh0cHIpXG4gICAgdG8gPSAnPD0nICsgdE0gKyAnLicgKyB0bSArICcuJyArIHRwICsgJy0nICsgdHByO1xuICBlbHNlXG4gICAgdG8gPSAnPD0nICsgdG87XG5cbiAgcmV0dXJuIChmcm9tICsgJyAnICsgdG8pLnRyaW0oKTtcbn1cblxuXG4vLyBpZiBBTlkgb2YgdGhlIHNldHMgbWF0Y2ggQUxMIG9mIGl0cyBjb21wYXJhdG9ycywgdGhlbiBwYXNzXG5SYW5nZS5wcm90b3R5cGUudGVzdCA9IGZ1bmN0aW9uKHZlcnNpb24pIHtcbiAgaWYgKCF2ZXJzaW9uKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBpZiAodHlwZW9mIHZlcnNpb24gPT09ICdzdHJpbmcnKVxuICAgIHZlcnNpb24gPSBuZXcgU2VtVmVyKHZlcnNpb24sIHRoaXMubG9vc2UpO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zZXQubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAodGVzdFNldCh0aGlzLnNldFtpXSwgdmVyc2lvbikpXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuXG5mdW5jdGlvbiB0ZXN0U2V0KHNldCwgdmVyc2lvbikge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHNldC5sZW5ndGg7IGkrKykge1xuICAgIGlmICghc2V0W2ldLnRlc3QodmVyc2lvbikpXG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAodmVyc2lvbi5wcmVyZWxlYXNlLmxlbmd0aCkge1xuICAgIC8vIEZpbmQgdGhlIHNldCBvZiB2ZXJzaW9ucyB0aGF0IGFyZSBhbGxvd2VkIHRvIGhhdmUgcHJlcmVsZWFzZXNcbiAgICAvLyBGb3IgZXhhbXBsZSwgXjEuMi4zLXByLjEgZGVzdWdhcnMgdG8gPj0xLjIuMy1wci4xIDwyLjAuMFxuICAgIC8vIFRoYXQgc2hvdWxkIGFsbG93IGAxLjIuMy1wci4yYCB0byBwYXNzLlxuICAgIC8vIEhvd2V2ZXIsIGAxLjIuNC1hbHBoYS5ub3RyZWFkeWAgc2hvdWxkIE5PVCBiZSBhbGxvd2VkLFxuICAgIC8vIGV2ZW4gdGhvdWdoIGl0J3Mgd2l0aGluIHRoZSByYW5nZSBzZXQgYnkgdGhlIGNvbXBhcmF0b3JzLlxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2V0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBkZWJ1ZyhzZXRbaV0uc2VtdmVyKTtcbiAgICAgIGlmIChzZXRbaV0uc2VtdmVyID09PSBBTlkpXG4gICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICBpZiAoc2V0W2ldLnNlbXZlci5wcmVyZWxlYXNlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdmFyIGFsbG93ZWQgPSBzZXRbaV0uc2VtdmVyO1xuICAgICAgICBpZiAoYWxsb3dlZC5tYWpvciA9PT0gdmVyc2lvbi5tYWpvciAmJlxuICAgICAgICAgICAgYWxsb3dlZC5taW5vciA9PT0gdmVyc2lvbi5taW5vciAmJlxuICAgICAgICAgICAgYWxsb3dlZC5wYXRjaCA9PT0gdmVyc2lvbi5wYXRjaClcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBWZXJzaW9uIGhhcyBhIC1wcmUsIGJ1dCBpdCdzIG5vdCBvbmUgb2YgdGhlIG9uZXMgd2UgbGlrZS5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZXhwb3J0cy5zYXRpc2ZpZXMgPSBzYXRpc2ZpZXM7XG5mdW5jdGlvbiBzYXRpc2ZpZXModmVyc2lvbiwgcmFuZ2UsIGxvb3NlKSB7XG4gIHRyeSB7XG4gICAgcmFuZ2UgPSBuZXcgUmFuZ2UocmFuZ2UsIGxvb3NlKTtcbiAgfSBjYXRjaCAoZXIpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHJhbmdlLnRlc3QodmVyc2lvbik7XG59XG5cbmV4cG9ydHMubWF4U2F0aXNmeWluZyA9IG1heFNhdGlzZnlpbmc7XG5mdW5jdGlvbiBtYXhTYXRpc2Z5aW5nKHZlcnNpb25zLCByYW5nZSwgbG9vc2UpIHtcbiAgcmV0dXJuIHZlcnNpb25zLmZpbHRlcihmdW5jdGlvbih2ZXJzaW9uKSB7XG4gICAgcmV0dXJuIHNhdGlzZmllcyh2ZXJzaW9uLCByYW5nZSwgbG9vc2UpO1xuICB9KS5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gcmNvbXBhcmUoYSwgYiwgbG9vc2UpO1xuICB9KVswXSB8fCBudWxsO1xufVxuXG5leHBvcnRzLnZhbGlkUmFuZ2UgPSB2YWxpZFJhbmdlO1xuZnVuY3Rpb24gdmFsaWRSYW5nZShyYW5nZSwgbG9vc2UpIHtcbiAgdHJ5IHtcbiAgICAvLyBSZXR1cm4gJyonIGluc3RlYWQgb2YgJycgc28gdGhhdCB0cnV0aGluZXNzIHdvcmtzLlxuICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBpZiBpdCdzIGludmFsaWQgYW55d2F5XG4gICAgcmV0dXJuIG5ldyBSYW5nZShyYW5nZSwgbG9vc2UpLnJhbmdlIHx8ICcqJztcbiAgfSBjYXRjaCAoZXIpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuXG4vLyBEZXRlcm1pbmUgaWYgdmVyc2lvbiBpcyBsZXNzIHRoYW4gYWxsIHRoZSB2ZXJzaW9ucyBwb3NzaWJsZSBpbiB0aGUgcmFuZ2VcbmV4cG9ydHMubHRyID0gbHRyO1xuZnVuY3Rpb24gbHRyKHZlcnNpb24sIHJhbmdlLCBsb29zZSkge1xuICByZXR1cm4gb3V0c2lkZSh2ZXJzaW9uLCByYW5nZSwgJzwnLCBsb29zZSk7XG59XG5cbi8vIERldGVybWluZSBpZiB2ZXJzaW9uIGlzIGdyZWF0ZXIgdGhhbiBhbGwgdGhlIHZlcnNpb25zIHBvc3NpYmxlIGluIHRoZSByYW5nZS5cbmV4cG9ydHMuZ3RyID0gZ3RyO1xuZnVuY3Rpb24gZ3RyKHZlcnNpb24sIHJhbmdlLCBsb29zZSkge1xuICByZXR1cm4gb3V0c2lkZSh2ZXJzaW9uLCByYW5nZSwgJz4nLCBsb29zZSk7XG59XG5cbmV4cG9ydHMub3V0c2lkZSA9IG91dHNpZGU7XG5mdW5jdGlvbiBvdXRzaWRlKHZlcnNpb24sIHJhbmdlLCBoaWxvLCBsb29zZSkge1xuICB2ZXJzaW9uID0gbmV3IFNlbVZlcih2ZXJzaW9uLCBsb29zZSk7XG4gIHJhbmdlID0gbmV3IFJhbmdlKHJhbmdlLCBsb29zZSk7XG5cbiAgdmFyIGd0Zm4sIGx0ZWZuLCBsdGZuLCBjb21wLCBlY29tcDtcbiAgc3dpdGNoIChoaWxvKSB7XG4gICAgY2FzZSAnPic6XG4gICAgICBndGZuID0gZ3Q7XG4gICAgICBsdGVmbiA9IGx0ZTtcbiAgICAgIGx0Zm4gPSBsdDtcbiAgICAgIGNvbXAgPSAnPic7XG4gICAgICBlY29tcCA9ICc+PSc7XG4gICAgICBicmVhaztcbiAgICBjYXNlICc8JzpcbiAgICAgIGd0Zm4gPSBsdDtcbiAgICAgIGx0ZWZuID0gZ3RlO1xuICAgICAgbHRmbiA9IGd0O1xuICAgICAgY29tcCA9ICc8JztcbiAgICAgIGVjb21wID0gJzw9JztcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdNdXN0IHByb3ZpZGUgYSBoaWxvIHZhbCBvZiBcIjxcIiBvciBcIj5cIicpO1xuICB9XG5cbiAgLy8gSWYgaXQgc2F0aXNpZmVzIHRoZSByYW5nZSBpdCBpcyBub3Qgb3V0c2lkZVxuICBpZiAoc2F0aXNmaWVzKHZlcnNpb24sIHJhbmdlLCBsb29zZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvLyBGcm9tIG5vdyBvbiwgdmFyaWFibGUgdGVybXMgYXJlIGFzIGlmIHdlJ3JlIGluIFwiZ3RyXCIgbW9kZS5cbiAgLy8gYnV0IG5vdGUgdGhhdCBldmVyeXRoaW5nIGlzIGZsaXBwZWQgZm9yIHRoZSBcImx0clwiIGZ1bmN0aW9uLlxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcmFuZ2Uuc2V0Lmxlbmd0aDsgKytpKSB7XG4gICAgdmFyIGNvbXBhcmF0b3JzID0gcmFuZ2Uuc2V0W2ldO1xuXG4gICAgdmFyIGhpZ2ggPSBudWxsO1xuICAgIHZhciBsb3cgPSBudWxsO1xuXG4gICAgY29tcGFyYXRvcnMuZm9yRWFjaChmdW5jdGlvbihjb21wYXJhdG9yKSB7XG4gICAgICBpZiAoY29tcGFyYXRvci5zZW12ZXIgPT09IEFOWSkge1xuICAgICAgICBjb21wYXJhdG9yID0gbmV3IENvbXBhcmF0b3IoJz49MC4wLjAnKVxuICAgICAgfVxuICAgICAgaGlnaCA9IGhpZ2ggfHwgY29tcGFyYXRvcjtcbiAgICAgIGxvdyA9IGxvdyB8fCBjb21wYXJhdG9yO1xuICAgICAgaWYgKGd0Zm4oY29tcGFyYXRvci5zZW12ZXIsIGhpZ2guc2VtdmVyLCBsb29zZSkpIHtcbiAgICAgICAgaGlnaCA9IGNvbXBhcmF0b3I7XG4gICAgICB9IGVsc2UgaWYgKGx0Zm4oY29tcGFyYXRvci5zZW12ZXIsIGxvdy5zZW12ZXIsIGxvb3NlKSkge1xuICAgICAgICBsb3cgPSBjb21wYXJhdG9yO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gSWYgdGhlIGVkZ2UgdmVyc2lvbiBjb21wYXJhdG9yIGhhcyBhIG9wZXJhdG9yIHRoZW4gb3VyIHZlcnNpb25cbiAgICAvLyBpc24ndCBvdXRzaWRlIGl0XG4gICAgaWYgKGhpZ2gub3BlcmF0b3IgPT09IGNvbXAgfHwgaGlnaC5vcGVyYXRvciA9PT0gZWNvbXApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGUgbG93ZXN0IHZlcnNpb24gY29tcGFyYXRvciBoYXMgYW4gb3BlcmF0b3IgYW5kIG91ciB2ZXJzaW9uXG4gICAgLy8gaXMgbGVzcyB0aGFuIGl0IHRoZW4gaXQgaXNuJ3QgaGlnaGVyIHRoYW4gdGhlIHJhbmdlXG4gICAgaWYgKCghbG93Lm9wZXJhdG9yIHx8IGxvdy5vcGVyYXRvciA9PT0gY29tcCkgJiZcbiAgICAgICAgbHRlZm4odmVyc2lvbiwgbG93LnNlbXZlcikpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKGxvdy5vcGVyYXRvciA9PT0gZWNvbXAgJiYgbHRmbih2ZXJzaW9uLCBsb3cuc2VtdmVyKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9zZW12ZXIvc2VtdmVyLmpzXG4gKiovIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG5cbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHNldFRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZHJhaW5RdWV1ZSwgMCk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAod2VicGFjaykvfi9ub2RlLWxpYnMtYnJvd3Nlci9+L3Byb2Nlc3MvYnJvd3Nlci5qc1xuICoqLyIsIi8qKlxuICogQGZpbGVPdmVydmlld1xuICogVmlld01vZGVsIENvbnN0cnVjdG9yICYgZGVmaW5pdGlvblxuICovXG5cbmltcG9ydCB7ZXh0ZW5kLCB0b0FycmF5fSBmcm9tICcuLi91dGlsJ1xuXG5pbXBvcnQgKiBhcyBzY29wZSBmcm9tICcuL2luc3RhbmNlL3Njb3BlJ1xuaW1wb3J0ICogYXMgY29tcGlsZXIgZnJvbSAnLi9jb21waWxlcidcbmltcG9ydCAqIGFzIGRpcmVjdGl2ZSBmcm9tICcuL2RpcmVjdGl2ZSdcbmltcG9ydCAqIGFzIGRvbUhlbHBlciBmcm9tICcuL2RvbS1oZWxwZXInXG5pbXBvcnQgKiBhcyBldmVudHMgZnJvbSAnLi9ldmVudHMnXG4vLyBpbXBvcnQgKiBhcyBtb2R1bGVzIGZyb20gJy4vLi4vYXBpL21vZHVsZXMnXG4vLyBpbXBvcnQgKiBhcyBhcGkgZnJvbSAnLi8uLi9hcGkvYXBpJ1xuXG5pbXBvcnQge3JlZ2lzdGVyTW9kdWxlcywgcmVnaXN0ZXJNZXRob2RzfSBmcm9tICcuLi9hcHAvcmVnaXN0ZXInXG5cbmZ1bmN0aW9uIGNhbGxPbGRSZWFkeUVudHJ5KHZtLCBjb21wb25lbnQpIHtcbiAgaWYgKGNvbXBvbmVudC5tZXRob2RzICYmXG4gICAgICBjb21wb25lbnQubWV0aG9kcy5yZWFkeSkge1xuICAgIGNvbXBvbmVudC5tZXRob2RzLnJlYWR5LmNhbGwodm0pXG4gIH1cbn1cblxuLyoqXG4gKiBWaWV3TW9kZWwgY29uc3RydWN0b3JcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICogQHBhcmFtIHtvYmplY3R9IHBhcmVudFZtICAgd2hpY2ggY29udGFpbnMgX2FwcFxuICogQHBhcmFtIHtvYmplY3R9IHBhcmVudEVsICAgcm9vdCBlbGVtZW50IG9yIGZyYWcgYmxvY2tcbiAqIEBwYXJhbSB7b2JqZWN0fSBtZXJnZWREYXRhIGV4dGVybmFsIGRhdGFcbiAqIEBwYXJhbSB7b2JqZWN0fSBleHRlcm5hbEV2ZW50cyBleHRlcm5hbCBldmVudHNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gVm0oXG4gIHR5cGUsXG4gIHBhcmVudFZtLFxuICBwYXJlbnRFbCxcbiAgbWVyZ2VkRGF0YSxcbiAgZXh0ZXJuYWxFdmVudHNcbikge1xuICB0aGlzLl9wYXJlbnQgPSBwYXJlbnRWbS5fcmVhbFBhcmVudCA/IHBhcmVudFZtLl9yZWFsUGFyZW50IDogcGFyZW50Vm1cbiAgdGhpcy5fYXBwID0gcGFyZW50Vm0uX2FwcFxuICBwYXJlbnRWbS5fY2hpbGRyZW5WbXMgJiYgcGFyZW50Vm0uX2NoaWxkcmVuVm1zLnB1c2godGhpcylcblxuICBjb25zdCBjb21wb25lbnQgPSB0aGlzLl9hcHAuY3VzdG9tQ29tcG9uZW50TWFwW3R5cGVdIHx8IHt9XG4gIGNvbnN0IGRhdGEgPSBjb21wb25lbnQuZGF0YSB8fCB7fVxuXG4gIHRoaXMuX29wdGlvbnMgPSBjb21wb25lbnRcbiAgdGhpcy5fbWV0aG9kcyA9IGNvbXBvbmVudC5tZXRob2RzIHx8IHt9XG4gIHRoaXMuX2NvbXB1dGVkID0gY29tcG9uZW50LmNvbXB1dGVkIHx8IHt9XG4gIHRoaXMuX2NzcyA9IGNvbXBvbmVudC5zdHlsZSB8fCB7fVxuICB0aGlzLl9pZHMgPSB7fVxuICB0aGlzLl93YXRjaGVycyA9IFtdXG4gIHRoaXMuX3ZtRXZlbnRzID0ge31cbiAgdGhpcy5fY2hpbGRyZW5WbXMgPSBbXVxuICB0aGlzLl90eXBlID0gdHlwZVxuXG4gIC8vIGJpbmQgZXZlbnRzIGFuZCBsaWZlY3ljbGVzXG4gIHRoaXMuX2luaXRFdmVudHMoZXh0ZXJuYWxFdmVudHMpXG5cbiAgdGhpcy4kZW1pdCgnaG9vazppbml0JylcbiAgdGhpcy5faW5pdGVkID0gdHJ1ZVxuICAvLyBwcm94eSBkYXRhIGFuZCBtZXRob2RzXG4gIC8vIG9ic2VydmUgZGF0YSBhbmQgYWRkIHRoaXMgdG8gdm1zXG4gIHRoaXMuX2RhdGEgPSB0eXBlb2YgZGF0YSA9PT0gJ2Z1bmN0aW9uJyA/IGRhdGEoKSA6IGRhdGFcbiAgaWYgKG1lcmdlZERhdGEpIHtcbiAgICBleHRlbmQodGhpcy5fZGF0YSwgbWVyZ2VkRGF0YSlcbiAgfVxuICB0aGlzLl9pbml0U2NvcGUoKVxuXG4gIHRoaXMuJGVtaXQoJ2hvb2s6Y3JlYXRlZCcpXG4gIHRoaXMuX2NyZWF0ZWQgPSB0cnVlXG4gIC8vIGJhY2t3YXJkIG9sZCByZWFkeSBlbnRyeVxuICBjYWxsT2xkUmVhZHlFbnRyeSh0aGlzLCBjb21wb25lbnQpXG5cbiAgLy8gaWYgbm8gcGFyZW50RWxlbWVudCB0aGVuIHNwZWNpZnkgdGhlIGRvY3VtZW50RWxlbWVudFxuICB0aGlzLl9wYXJlbnRFbCA9IHBhcmVudEVsIHx8IHRoaXMuX2FwcC5kb2MuZG9jdW1lbnRFbGVtZW50XG4gIHRoaXMuX2J1aWxkKClcbn1cblxuZXh0ZW5kKFZtLnByb3RvdHlwZSwgc2NvcGUsIGNvbXBpbGVyLCBkaXJlY3RpdmUsIGRvbUhlbHBlciwgZXZlbnRzKVxuZXh0ZW5kKFZtLCB7XG4gIHJlZ2lzdGVyTW9kdWxlcyxcbiAgcmVnaXN0ZXJNZXRob2RzXG59KVxuLy8gVm0ucmVnaXN0ZXJNb2R1bGVzKG1vZHVsZXMpXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2xpYi92bS9pbmRleC5qc1xuICoqLyIsInZhciBfID0gcmVxdWlyZSgnLi4vdXRpbCcpXG52YXIgT2JzZXJ2ZXIgPSByZXF1aXJlKCcuLi9vYnNlcnZlcicpXG52YXIgRGVwID0gcmVxdWlyZSgnLi4vb2JzZXJ2ZXIvZGVwJylcblxuLyoqXG4gKiBTZXR1cCB0aGUgc2NvcGUgb2YgYW4gaW5zdGFuY2UsIHdoaWNoIGNvbnRhaW5zOlxuICogLSBvYnNlcnZlZCBkYXRhXG4gKiAtIGNvbXB1dGVkIHByb3BlcnRpZXNcbiAqIC0gdXNlciBtZXRob2RzXG4gKiAtIG1ldGEgcHJvcGVydGllc1xuICovXG5cbmV4cG9ydHMuX2luaXRTY29wZSA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5faW5pdERhdGEoKVxuICB0aGlzLl9pbml0Q29tcHV0ZWQoKVxuICB0aGlzLl9pbml0TWV0aG9kcygpXG4gIC8vIHRoaXMuX2luaXRNZXRhKClcbn1cblxuLyoqXG4gKiBJbml0aWFsaXplIHRoZSBkYXRhLiBcbiAqL1xuXG5jb25zdCBLRVlfV09SRFMgPSBbJyRpbmRleCcsICckdmFsdWUnLCAnJGV2ZW50J11cbmV4cG9ydHMuX2luaXREYXRhID0gZnVuY3Rpb24gKCkge1xuICAvLyBwcm94eSBkYXRhIG9uIGluc3RhbmNlXG4gIHZhciBkYXRhID0gdGhpcy5fZGF0YVxuICB2YXIgaSwga2V5XG4gIC8vIC8vIG1ha2Ugc3VyZSBhbGwgcHJvcHMgcHJvcGVydGllcyBhcmUgb2JzZXJ2ZWRcbiAgLy8gdmFyIHByb3BzID0gdGhpcy4kb3B0aW9ucy5wcm9wc1xuICAvLyBpZiAocHJvcHMpIHtcbiAgLy8gICBpID0gcHJvcHMubGVuZ3RoXG4gIC8vICAgd2hpbGUgKGktLSkge1xuICAvLyAgICAga2V5ID0gXy5jYW1lbGl6ZShwcm9wc1tpXSlcbiAgLy8gICAgIGlmICghKGtleSBpbiBkYXRhKSkge1xuICAvLyAgICAgICBkYXRhW2tleV0gPSBudWxsXG4gIC8vICAgICB9XG4gIC8vICAgfVxuICAvLyB9XG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMoZGF0YSlcbiAgaSA9IGtleXMubGVuZ3RoXG4gIHdoaWxlIChpLS0pIHtcbiAgICBrZXkgPSBrZXlzW2ldXG4gICAgaWYgKEtFWV9XT1JEUy5pbmRleE9mKGtleSkgPiAtMSB8fCAhXy5pc1Jlc2VydmVkKGtleSkpIHtcbiAgICAgIHRoaXMuX3Byb3h5KGtleSlcbiAgICB9XG4gIH1cbiAgLy8gb2JzZXJ2ZSBkYXRhXG4gIE9ic2VydmVyLmNyZWF0ZShkYXRhKS5hZGRWbSh0aGlzKVxufVxuXG4vLyAvKipcbi8vICAqIFN3YXAgdGhlIGlzbnRhbmNlJ3MgJGRhdGEuIENhbGxlZCBpbiAkZGF0YSdzIHNldHRlci5cbi8vICAqXG4vLyAgKiBAcGFyYW0ge09iamVjdH0gbmV3RGF0YVxuLy8gICovXG5cbi8vIGV4cG9ydHMuX3NldERhdGEgPSBmdW5jdGlvbiAobmV3RGF0YSkge1xuLy8gICBuZXdEYXRhID0gbmV3RGF0YSB8fCB7fVxuLy8gICB2YXIgb2xkRGF0YSA9IHRoaXMuX2RhdGFcbi8vICAgdGhpcy5fZGF0YSA9IG5ld0RhdGFcbi8vICAgdmFyIGtleXMsIGtleSwgaVxuLy8gICAvLyB1bnByb3h5IGtleXMgbm90IHByZXNlbnQgaW4gbmV3IGRhdGFcbi8vICAga2V5cyA9IE9iamVjdC5rZXlzKG9sZERhdGEpXG4vLyAgIGkgPSBrZXlzLmxlbmd0aFxuLy8gICB3aGlsZSAoaS0tKSB7XG4vLyAgICAga2V5ID0ga2V5c1tpXVxuLy8gICAgIGlmICghXy5pc1Jlc2VydmVkKGtleSkgJiYgIShrZXkgaW4gbmV3RGF0YSkpIHtcbi8vICAgICAgIHRoaXMuX3VucHJveHkoa2V5KVxuLy8gICAgIH1cbi8vICAgfVxuLy8gICAvLyBwcm94eSBrZXlzIG5vdCBhbHJlYWR5IHByb3hpZWQsXG4vLyAgIC8vIGFuZCB0cmlnZ2VyIGNoYW5nZSBmb3IgY2hhbmdlZCB2YWx1ZXNcbi8vICAga2V5cyA9IE9iamVjdC5rZXlzKG5ld0RhdGEpXG4vLyAgIGkgPSBrZXlzLmxlbmd0aFxuLy8gICB3aGlsZSAoaS0tKSB7XG4vLyAgICAga2V5ID0ga2V5c1tpXVxuLy8gICAgIGlmICghdGhpcy5oYXNPd25Qcm9wZXJ0eShrZXkpICYmICFfLmlzUmVzZXJ2ZWQoa2V5KSkge1xuLy8gICAgICAgLy8gbmV3IHByb3BlcnR5XG4vLyAgICAgICB0aGlzLl9wcm94eShrZXkpXG4vLyAgICAgfVxuLy8gICB9XG4vLyAgIG9sZERhdGEuX19vYl9fLnJlbW92ZVZtKHRoaXMpXG4vLyAgIE9ic2VydmVyLmNyZWF0ZShuZXdEYXRhKS5hZGRWbSh0aGlzKVxuLy8gICB0aGlzLl9kaWdlc3QoKVxuLy8gfVxuXG4vKipcbiAqIFByb3h5IGEgcHJvcGVydHksIHNvIHRoYXRcbiAqIHZtLnByb3AgPT09IHZtLl9kYXRhLnByb3BcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gKi9cblxuZXhwb3J0cy5fcHJveHkgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIC8vIG5lZWQgdG8gc3RvcmUgcmVmIHRvIHNlbGYgaGVyZVxuICAvLyBiZWNhdXNlIHRoZXNlIGdldHRlci9zZXR0ZXJzIG1pZ2h0XG4gIC8vIGJlIGNhbGxlZCBieSBjaGlsZCBpbnN0YW5jZXMhXG4gIHZhciBzZWxmID0gdGhpc1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoc2VsZiwga2V5LCB7XG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbiBwcm94eUdldHRlciAoKSB7XG4gICAgICByZXR1cm4gc2VsZi5fZGF0YVtrZXldXG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uIHByb3h5U2V0dGVyICh2YWwpIHtcbiAgICAgIHNlbGYuX2RhdGFba2V5XSA9IHZhbFxuICAgIH1cbiAgfSlcbn1cblxuLyoqXG4gKiBVbnByb3h5IGEgcHJvcGVydHkuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICovXG5cbmV4cG9ydHMuX3VucHJveHkgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIGRlbGV0ZSB0aGlzW2tleV1cbn1cblxuLy8gLyoqXG4vLyAgKiBGb3JjZSB1cGRhdGUgb24gZXZlcnkgd2F0Y2hlciBpbiBzY29wZS5cbi8vICAqL1xuXG4vLyBleHBvcnRzLl9kaWdlc3QgPSBmdW5jdGlvbiAoKSB7XG4vLyAgIHZhciBpID0gdGhpcy5fd2F0Y2hlcnMubGVuZ3RoXG4vLyAgIHdoaWxlIChpLS0pIHtcbi8vICAgICB0aGlzLl93YXRjaGVyc1tpXS51cGRhdGUoKVxuLy8gICB9XG4vLyAgIHZhciBjaGlsZHJlbiA9IHRoaXMuX2NoaWxkcmVuXG4vLyAgIGkgPSBjaGlsZHJlbi5sZW5ndGhcbi8vICAgd2hpbGUgKGktLSkge1xuLy8gICAgIHZhciBjaGlsZCA9IGNoaWxkcmVuW2ldXG4vLyAgICAgaWYgKGNoaWxkLiRvcHRpb25zLmluaGVyaXQpIHtcbi8vICAgICAgIGNoaWxkLl9kaWdlc3QoKVxuLy8gICAgIH1cbi8vICAgfVxuLy8gfVxuXG4vKipcbiAqIFNldHVwIGNvbXB1dGVkIHByb3BlcnRpZXMuIFRoZXkgYXJlIGVzc2VudGlhbGx5XG4gKiBzcGVjaWFsIGdldHRlci9zZXR0ZXJzXG4gKi9cblxuZnVuY3Rpb24gbm9vcCAoKSB7fVxuZXhwb3J0cy5faW5pdENvbXB1dGVkID0gZnVuY3Rpb24gKCkge1xuICAvLyB2YXIgY29tcHV0ZWQgPSB0aGlzLiRvcHRpb25zLmNvbXB1dGVkXG4gIHZhciBjb21wdXRlZCA9IHRoaXMuX2NvbXB1dGVkXG4gIGlmIChjb21wdXRlZCkge1xuICAgIGZvciAodmFyIGtleSBpbiBjb21wdXRlZCkge1xuICAgICAgdmFyIHVzZXJEZWYgPSBjb21wdXRlZFtrZXldXG4gICAgICB2YXIgZGVmID0ge1xuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgdXNlckRlZiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBkZWYuZ2V0ID0gXy5iaW5kKHVzZXJEZWYsIHRoaXMpXG4gICAgICAgIGRlZi5zZXQgPSBub29wXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWYuZ2V0ID0gdXNlckRlZi5nZXRcbiAgICAgICAgICA/IF8uYmluZCh1c2VyRGVmLmdldCwgdGhpcylcbiAgICAgICAgICA6IG5vb3BcbiAgICAgICAgZGVmLnNldCA9IHVzZXJEZWYuc2V0XG4gICAgICAgICAgPyBfLmJpbmQodXNlckRlZi5zZXQsIHRoaXMpXG4gICAgICAgICAgOiBub29wXG4gICAgICB9XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywga2V5LCBkZWYpXG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogU2V0dXAgaW5zdGFuY2UgbWV0aG9kcy4gTWV0aG9kcyBtdXN0IGJlIGJvdW5kIHRvIHRoZVxuICogaW5zdGFuY2Ugc2luY2UgdGhleSBtaWdodCBiZSBjYWxsZWQgYnkgY2hpbGRyZW5cbiAqIGluaGVyaXRpbmcgdGhlbS5cbiAqL1xuXG5leHBvcnRzLl9pbml0TWV0aG9kcyA9IGZ1bmN0aW9uICgpIHtcbiAgLy8gdmFyIG1ldGhvZHMgPSB0aGlzLiRvcHRpb25zLm1ldGhvZHNcbiAgdmFyIG1ldGhvZHMgPSB0aGlzLl9tZXRob2RzXG4gIGlmIChtZXRob2RzKSB7XG4gICAgZm9yICh2YXIga2V5IGluIG1ldGhvZHMpIHtcbiAgICAgIHRoaXNba2V5XSA9IF8uYmluZChtZXRob2RzW2tleV0sIHRoaXMpXG4gICAgfVxuICB9XG59XG5cbi8vIC8qKlxuLy8gICogSW5pdGlhbGl6ZSBtZXRhIGluZm9ybWF0aW9uIGxpa2UgJGluZGV4LCAka2V5ICYgJHZhbHVlLlxuLy8gICovXG5cbi8vIGV4cG9ydHMuX2luaXRNZXRhID0gZnVuY3Rpb24gKCkge1xuLy8gICB2YXIgbWV0YXMgPSB0aGlzLiRvcHRpb25zLl9tZXRhXG4vLyAgIGlmIChtZXRhcykge1xuLy8gICAgIGZvciAodmFyIGtleSBpbiBtZXRhcykge1xuLy8gICAgICAgdGhpcy5fZGVmaW5lTWV0YShrZXksIG1ldGFzW2tleV0pXG4vLyAgICAgfVxuLy8gICB9XG4vLyB9XG5cbi8vIC8qKlxuLy8gICogRGVmaW5lIGEgbWV0YSBwcm9wZXJ0eSwgZS5nICRpbmRleCwgJGtleSwgJHZhbHVlXG4vLyAgKiB3aGljaCBvbmx5IGV4aXN0cyBvbiB0aGUgdm0gaW5zdGFuY2UgYnV0IG5vdCBpbiAkZGF0YS5cbi8vICAqXG4vLyAgKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4vLyAgKiBAcGFyYW0geyp9IHZhbHVlXG4vLyAgKi9cblxuLy8gZXhwb3J0cy5fZGVmaW5lTWV0YSA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4vLyAgIHZhciBkZXAgPSBuZXcgRGVwKClcbi8vICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIGtleSwge1xuLy8gICAgIGVudW1lcmFibGU6IHRydWUsXG4vLyAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuLy8gICAgIGdldDogZnVuY3Rpb24gbWV0YUdldHRlciAoKSB7XG4vLyAgICAgICBpZiAoT2JzZXJ2ZXIudGFyZ2V0KSB7XG4vLyAgICAgICAgIE9ic2VydmVyLnRhcmdldC5hZGREZXAoZGVwKVxuLy8gICAgICAgfVxuLy8gICAgICAgcmV0dXJuIHZhbHVlXG4vLyAgICAgfSxcbi8vICAgICBzZXQ6IGZ1bmN0aW9uIG1ldGFTZXR0ZXIgKHZhbCkge1xuLy8gICAgICAgaWYgKHZhbCAhPT0gdmFsdWUpIHtcbi8vICAgICAgICAgdmFsdWUgPSB2YWxcbi8vICAgICAgICAgZGVwLm5vdGlmeSgpXG4vLyAgICAgICB9XG4vLyAgICAgfVxuLy8gICB9KVxuLy8gfVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9saWIvdm0vaW5zdGFuY2Uvc2NvcGUuanNcbiAqKi8iLCIvLyByZXF1aXJlZCBmb3IgY29kZSBpbiBpbnN0YW5jZS9vYnNlcnZlclxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi91dGlsJylcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2xpYi92bS91dGlsLmpzXG4gKiovIiwidmFyIF8gPSByZXF1aXJlKCcuLi91dGlsJylcbnZhciBjb25maWcgPSByZXF1aXJlKCcuLi9jb25maWcnKVxudmFyIERlcCA9IHJlcXVpcmUoJy4vZGVwJylcbnZhciBhcnJheU1ldGhvZHMgPSByZXF1aXJlKCcuL2FycmF5JylcbnZhciBhcnJheUtleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhhcnJheU1ldGhvZHMpXG5yZXF1aXJlKCcuL29iamVjdCcpXG5cbnZhciB1aWQgPSAwXG5cbi8qKlxuICogVHlwZSBlbnVtc1xuICovXG5cbnZhciBBUlJBWSAgPSAwXG52YXIgT0JKRUNUID0gMVxuXG4vKipcbiAqIEF1Z21lbnQgYW4gdGFyZ2V0IE9iamVjdCBvciBBcnJheSBieSBpbnRlcmNlcHRpbmdcbiAqIHRoZSBwcm90b3R5cGUgY2hhaW4gdXNpbmcgX19wcm90b19fXG4gKlxuICogQHBhcmFtIHtPYmplY3R8QXJyYXl9IHRhcmdldFxuICogQHBhcmFtIHtPYmplY3R9IHByb3RvXG4gKi9cblxuZnVuY3Rpb24gcHJvdG9BdWdtZW50ICh0YXJnZXQsIHNyYykge1xuICB0YXJnZXQuX19wcm90b19fID0gc3JjXG59XG5cbi8qKlxuICogQXVnbWVudCBhbiB0YXJnZXQgT2JqZWN0IG9yIEFycmF5IGJ5IGRlZmluaW5nXG4gKiBoaWRkZW4gcHJvcGVydGllcy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdHxBcnJheX0gdGFyZ2V0XG4gKiBAcGFyYW0ge09iamVjdH0gcHJvdG9cbiAqL1xuXG5mdW5jdGlvbiBjb3B5QXVnbWVudCAodGFyZ2V0LCBzcmMsIGtleXMpIHtcbiAgdmFyIGkgPSBrZXlzLmxlbmd0aFxuICB2YXIga2V5XG4gIHdoaWxlIChpLS0pIHtcbiAgICBrZXkgPSBrZXlzW2ldXG4gICAgXy5kZWZpbmUodGFyZ2V0LCBrZXksIHNyY1trZXldKVxuICB9XG59XG5cbi8qKlxuICogT2JzZXJ2ZXIgY2xhc3MgdGhhdCBhcmUgYXR0YWNoZWQgdG8gZWFjaCBvYnNlcnZlZFxuICogb2JqZWN0LiBPbmNlIGF0dGFjaGVkLCB0aGUgb2JzZXJ2ZXIgY29udmVydHMgdGFyZ2V0XG4gKiBvYmplY3QncyBwcm9wZXJ0eSBrZXlzIGludG8gZ2V0dGVyL3NldHRlcnMgdGhhdFxuICogY29sbGVjdCBkZXBlbmRlbmNpZXMgYW5kIGRpc3BhdGNoZXMgdXBkYXRlcy5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gdmFsdWVcbiAqIEBwYXJhbSB7TnVtYmVyfSB0eXBlXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuXG5mdW5jdGlvbiBPYnNlcnZlciAodmFsdWUsIHR5cGUpIHtcbiAgdGhpcy5pZCA9ICsrdWlkXG4gIHRoaXMudmFsdWUgPSB2YWx1ZVxuICB0aGlzLmFjdGl2ZSA9IHRydWVcbiAgdGhpcy5kZXBzID0gW11cbiAgXy5kZWZpbmUodmFsdWUsICdfX29iX18nLCB0aGlzKVxuICBpZiAodHlwZSA9PT0gQVJSQVkpIHtcbiAgICB2YXIgYXVnbWVudCA9IGNvbmZpZy5wcm90byAmJiBfLmhhc1Byb3RvXG4gICAgICA/IHByb3RvQXVnbWVudFxuICAgICAgOiBjb3B5QXVnbWVudFxuICAgIGF1Z21lbnQodmFsdWUsIGFycmF5TWV0aG9kcywgYXJyYXlLZXlzKVxuICAgIHRoaXMub2JzZXJ2ZUFycmF5KHZhbHVlKVxuICB9IGVsc2UgaWYgKHR5cGUgPT09IE9CSkVDVCkge1xuICAgIHRoaXMud2Fsayh2YWx1ZSlcbiAgfVxufVxuXG5PYnNlcnZlci50YXJnZXQgPSBudWxsXG5cbnZhciBwID0gT2JzZXJ2ZXIucHJvdG90eXBlXG5cbi8qKlxuICogQXR0ZW1wdCB0byBjcmVhdGUgYW4gb2JzZXJ2ZXIgaW5zdGFuY2UgZm9yIGEgdmFsdWUsXG4gKiByZXR1cm5zIHRoZSBuZXcgb2JzZXJ2ZXIgaWYgc3VjY2Vzc2Z1bGx5IG9ic2VydmVkLFxuICogb3IgdGhlIGV4aXN0aW5nIG9ic2VydmVyIGlmIHRoZSB2YWx1ZSBhbHJlYWR5IGhhcyBvbmUuXG4gKlxuICogQHBhcmFtIHsqfSB2YWx1ZVxuICogQHJldHVybiB7T2JzZXJ2ZXJ8dW5kZWZpbmVkfVxuICogQHN0YXRpY1xuICovXG5cbk9ic2VydmVyLmNyZWF0ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICBpZiAoXG4gICAgdmFsdWUgJiZcbiAgICB2YWx1ZS5oYXNPd25Qcm9wZXJ0eSgnX19vYl9fJykgJiZcbiAgICB2YWx1ZS5fX29iX18gaW5zdGFuY2VvZiBPYnNlcnZlclxuICApIHtcbiAgICByZXR1cm4gdmFsdWUuX19vYl9fXG4gIH0gZWxzZSBpZiAoXy5pc0FycmF5KHZhbHVlKSkge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2ZXIodmFsdWUsIEFSUkFZKVxuICB9IGVsc2UgaWYgKFxuICAgIF8uaXNQbGFpbk9iamVjdCh2YWx1ZSkgJiZcbiAgICAhdmFsdWUuX2lzVnVlIC8vIGF2b2lkIFZ1ZSBpbnN0YW5jZVxuICApIHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmVyKHZhbHVlLCBPQkpFQ1QpXG4gIH1cbn1cblxuLyoqXG4gKiBXYWxrIHRocm91Z2ggZWFjaCBwcm9wZXJ0eSBhbmQgY29udmVydCB0aGVtIGludG9cbiAqIGdldHRlci9zZXR0ZXJzLiBUaGlzIG1ldGhvZCBzaG91bGQgb25seSBiZSBjYWxsZWQgd2hlblxuICogdmFsdWUgdHlwZSBpcyBPYmplY3QuIFByb3BlcnRpZXMgcHJlZml4ZWQgd2l0aCBgJGAgb3IgYF9gXG4gKiBhbmQgYWNjZXNzb3IgcHJvcGVydGllcyBhcmUgaWdub3JlZC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKi9cblxucC53YWxrID0gZnVuY3Rpb24gKG9iaikge1xuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iailcbiAgdmFyIGkgPSBrZXlzLmxlbmd0aFxuICB2YXIga2V5LCBwcmVmaXhcbiAgd2hpbGUgKGktLSkge1xuICAgIGtleSA9IGtleXNbaV1cbiAgICBwcmVmaXggPSBrZXkuY2hhckNvZGVBdCgwKVxuICAgIGlmIChwcmVmaXggIT09IDB4MjQgJiYgcHJlZml4ICE9PSAweDVGKSB7IC8vIHNraXAgJCBvciBfXG4gICAgICB0aGlzLmNvbnZlcnQoa2V5LCBvYmpba2V5XSlcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBUcnkgdG8gY2FyZXRlIGFuIG9ic2VydmVyIGZvciBhIGNoaWxkIHZhbHVlLFxuICogYW5kIGlmIHZhbHVlIGlzIGFycmF5LCBsaW5rIGRlcCB0byB0aGUgYXJyYXkuXG4gKlxuICogQHBhcmFtIHsqfSB2YWxcbiAqIEByZXR1cm4ge0RlcHx1bmRlZmluZWR9XG4gKi9cblxucC5vYnNlcnZlID0gZnVuY3Rpb24gKHZhbCkge1xuICByZXR1cm4gT2JzZXJ2ZXIuY3JlYXRlKHZhbClcbn1cblxuLyoqXG4gKiBPYnNlcnZlIGEgbGlzdCBvZiBBcnJheSBpdGVtcy5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBpdGVtc1xuICovXG5cbnAub2JzZXJ2ZUFycmF5ID0gZnVuY3Rpb24gKGl0ZW1zKSB7XG4gIHZhciBpID0gaXRlbXMubGVuZ3RoXG4gIHdoaWxlIChpLS0pIHtcbiAgICB0aGlzLm9ic2VydmUoaXRlbXNbaV0pXG4gIH1cbn1cblxuLyoqXG4gKiBDb252ZXJ0IGEgcHJvcGVydHkgaW50byBnZXR0ZXIvc2V0dGVyIHNvIHdlIGNhbiBlbWl0XG4gKiB0aGUgZXZlbnRzIHdoZW4gdGhlIHByb3BlcnR5IGlzIGFjY2Vzc2VkL2NoYW5nZWQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICogQHBhcmFtIHsqfSB2YWxcbiAqL1xuXG5wLmNvbnZlcnQgPSBmdW5jdGlvbiAoa2V5LCB2YWwpIHtcbiAgdmFyIG9iID0gdGhpc1xuICB2YXIgY2hpbGRPYiA9IG9iLm9ic2VydmUodmFsKVxuICB2YXIgZGVwID0gbmV3IERlcCgpXG4gIGlmIChjaGlsZE9iKSB7XG4gICAgY2hpbGRPYi5kZXBzLnB1c2goZGVwKVxuICB9XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYi52YWx1ZSwga2V5LCB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBPYnNlcnZlci50YXJnZXQgaXMgYSB3YXRjaGVyIHdob3NlIGdldHRlciBpc1xuICAgICAgLy8gY3VycmVudGx5IGJlaW5nIGV2YWx1YXRlZC5cbiAgICAgIGlmIChvYi5hY3RpdmUgJiYgT2JzZXJ2ZXIudGFyZ2V0KSB7XG4gICAgICAgIE9ic2VydmVyLnRhcmdldC5hZGREZXAoZGVwKVxuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbFxuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbiAobmV3VmFsKSB7XG4gICAgICBpZiAobmV3VmFsID09PSB2YWwpIHJldHVyblxuICAgICAgLy8gcmVtb3ZlIGRlcCBmcm9tIG9sZCB2YWx1ZVxuICAgICAgdmFyIG9sZENoaWxkT2IgPSB2YWwgJiYgdmFsLl9fb2JfX1xuICAgICAgaWYgKG9sZENoaWxkT2IpIHtcbiAgICAgICAgb2xkQ2hpbGRPYi5kZXBzLiRyZW1vdmUoZGVwKVxuICAgICAgfVxuICAgICAgdmFsID0gbmV3VmFsXG4gICAgICAvLyBhZGQgZGVwIHRvIG5ldyB2YWx1ZVxuICAgICAgdmFyIG5ld0NoaWxkT2IgPSBvYi5vYnNlcnZlKG5ld1ZhbClcbiAgICAgIGlmIChuZXdDaGlsZE9iKSB7XG4gICAgICAgIG5ld0NoaWxkT2IuZGVwcy5wdXNoKGRlcClcbiAgICAgIH1cbiAgICAgIGRlcC5ub3RpZnkoKVxuICAgIH1cbiAgfSlcbn1cblxuLyoqXG4gKiBOb3RpZnkgY2hhbmdlIG9uIGFsbCBzZWxmIGRlcHMgb24gYW4gb2JzZXJ2ZXIuXG4gKiBUaGlzIGlzIGNhbGxlZCB3aGVuIGEgbXV0YWJsZSB2YWx1ZSBtdXRhdGVzLiBlLmcuXG4gKiB3aGVuIGFuIEFycmF5J3MgbXV0YXRpbmcgbWV0aG9kcyBhcmUgY2FsbGVkLCBvciBhblxuICogT2JqZWN0J3MgJGFkZC8kZGVsZXRlIGFyZSBjYWxsZWQuXG4gKi9cblxucC5ub3RpZnkgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBkZXBzID0gdGhpcy5kZXBzXG4gIGZvciAodmFyIGkgPSAwLCBsID0gZGVwcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBkZXBzW2ldLm5vdGlmeSgpXG4gIH1cbn1cblxuLyoqXG4gKiBBZGQgYW4gb3duZXIgdm0sIHNvIHRoYXQgd2hlbiAkYWRkLyRkZWxldGUgbXV0YXRpb25zXG4gKiBoYXBwZW4gd2UgY2FuIG5vdGlmeSBvd25lciB2bXMgdG8gcHJveHkgdGhlIGtleXMgYW5kXG4gKiBkaWdlc3QgdGhlIHdhdGNoZXJzLiBUaGlzIGlzIG9ubHkgY2FsbGVkIHdoZW4gdGhlIG9iamVjdFxuICogaXMgb2JzZXJ2ZWQgYXMgYW4gaW5zdGFuY2UncyByb290ICRkYXRhLlxuICpcbiAqIEBwYXJhbSB7VnVlfSB2bVxuICovXG5cbnAuYWRkVm0gPSBmdW5jdGlvbiAodm0pIHtcbiAgKHRoaXMudm1zID0gdGhpcy52bXMgfHwgW10pLnB1c2godm0pXG59XG5cbi8qKlxuICogUmVtb3ZlIGFuIG93bmVyIHZtLiBUaGlzIGlzIGNhbGxlZCB3aGVuIHRoZSBvYmplY3QgaXNcbiAqIHN3YXBwZWQgb3V0IGFzIGFuIGluc3RhbmNlJ3MgJGRhdGEgb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7VnVlfSB2bVxuICovXG5cbnAucmVtb3ZlVm0gPSBmdW5jdGlvbiAodm0pIHtcbiAgdGhpcy52bXMuJHJlbW92ZSh2bSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBPYnNlcnZlclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9saWIvdm0vb2JzZXJ2ZXIvaW5kZXguanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHtwcm90bzogdHJ1ZX1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vbGliL3ZtL2NvbmZpZy5qc1xuICoqLyIsInZhciBfID0gcmVxdWlyZSgnLi4vdXRpbCcpXG5cbi8qKlxuICogQSBkZXAgaXMgYW4gb2JzZXJ2YWJsZSB0aGF0IGNhbiBoYXZlIG11bHRpcGxlXG4gKiBkaXJlY3RpdmVzIHN1YnNjcmliaW5nIHRvIGl0LlxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5cbmZ1bmN0aW9uIERlcCAoKSB7XG4gIHRoaXMuc3VicyA9IFtdXG59XG5cbnZhciBwID0gRGVwLnByb3RvdHlwZVxuXG4vKipcbiAqIEFkZCBhIGRpcmVjdGl2ZSBzdWJzY3JpYmVyLlxuICpcbiAqIEBwYXJhbSB7RGlyZWN0aXZlfSBzdWJcbiAqL1xuXG5wLmFkZFN1YiA9IGZ1bmN0aW9uIChzdWIpIHtcbiAgdGhpcy5zdWJzLnB1c2goc3ViKVxufVxuXG4vKipcbiAqIFJlbW92ZSBhIGRpcmVjdGl2ZSBzdWJzY3JpYmVyLlxuICpcbiAqIEBwYXJhbSB7RGlyZWN0aXZlfSBzdWJcbiAqL1xuXG5wLnJlbW92ZVN1YiA9IGZ1bmN0aW9uIChzdWIpIHtcbiAgdGhpcy5zdWJzLiRyZW1vdmUoc3ViKVxufVxuXG4vKipcbiAqIE5vdGlmeSBhbGwgc3Vic2NyaWJlcnMgb2YgYSBuZXcgdmFsdWUuXG4gKi9cblxucC5ub3RpZnkgPSBmdW5jdGlvbiAoKSB7XG4gIC8vIHN0YWJsaXplIHRoZSBzdWJzY3JpYmVyIGxpc3QgZmlyc3RcbiAgdmFyIHN1YnMgPSBfLnRvQXJyYXkodGhpcy5zdWJzKVxuICBmb3IgKHZhciBpID0gMCwgbCA9IHN1YnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgc3Vic1tpXS51cGRhdGUoKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRGVwXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9saWIvdm0vb2JzZXJ2ZXIvZGVwLmpzXG4gKiovIiwidmFyIF8gPSByZXF1aXJlKCcuLi91dGlsJylcbnZhciBhcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlXG52YXIgYXJyYXlNZXRob2RzID0gT2JqZWN0LmNyZWF0ZShhcnJheVByb3RvKVxuXG4vKipcbiAqIEludGVyY2VwdCBtdXRhdGluZyBtZXRob2RzIGFuZCBlbWl0IGV2ZW50c1xuICovXG5cbjtbXG4gICdwdXNoJyxcbiAgJ3BvcCcsXG4gICdzaGlmdCcsXG4gICd1bnNoaWZ0JyxcbiAgJ3NwbGljZScsXG4gICdzb3J0JyxcbiAgJ3JldmVyc2UnXG5dXG4uZm9yRWFjaChmdW5jdGlvbiAobWV0aG9kKSB7XG4gIC8vIGNhY2hlIG9yaWdpbmFsIG1ldGhvZFxuICB2YXIgb3JpZ2luYWwgPSBhcnJheVByb3RvW21ldGhvZF1cbiAgXy5kZWZpbmUoYXJyYXlNZXRob2RzLCBtZXRob2QsIGZ1bmN0aW9uIG11dGF0b3IgKCkge1xuICAgIC8vIGF2b2lkIGxlYWtpbmcgYXJndW1lbnRzOlxuICAgIC8vIGh0dHA6Ly9qc3BlcmYuY29tL2Nsb3N1cmUtd2l0aC1hcmd1bWVudHNcbiAgICB2YXIgaSA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShpKVxuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaV1cbiAgICB9XG4gICAgdmFyIHJlc3VsdCA9IG9yaWdpbmFsLmFwcGx5KHRoaXMsIGFyZ3MpXG4gICAgdmFyIG9iID0gdGhpcy5fX29iX19cbiAgICB2YXIgaW5zZXJ0ZWRcbiAgICBzd2l0Y2ggKG1ldGhvZCkge1xuICAgICAgY2FzZSAncHVzaCc6XG4gICAgICAgIGluc2VydGVkID0gYXJnc1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSAndW5zaGlmdCc6XG4gICAgICAgIGluc2VydGVkID0gYXJnc1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSAnc3BsaWNlJzpcbiAgICAgICAgaW5zZXJ0ZWQgPSBhcmdzLnNsaWNlKDIpXG4gICAgICAgIGJyZWFrXG4gICAgfVxuICAgIGlmIChpbnNlcnRlZCkgb2Iub2JzZXJ2ZUFycmF5KGluc2VydGVkKVxuICAgIC8vIG5vdGlmeSBjaGFuZ2VcbiAgICBvYi5ub3RpZnkoKVxuICAgIHJldHVybiByZXN1bHRcbiAgfSlcbn0pXG5cbi8qKlxuICogU3dhcCB0aGUgZWxlbWVudCBhdCB0aGUgZ2l2ZW4gaW5kZXggd2l0aCBhIG5ldyB2YWx1ZVxuICogYW5kIGVtaXRzIGNvcnJlc3BvbmRpbmcgZXZlbnQuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4XG4gKiBAcGFyYW0geyp9IHZhbFxuICogQHJldHVybiB7Kn0gLSByZXBsYWNlZCBlbGVtZW50XG4gKi9cblxuXy5kZWZpbmUoXG4gIGFycmF5UHJvdG8sXG4gICckc2V0JyxcbiAgZnVuY3Rpb24gJHNldCAoaW5kZXgsIHZhbCkge1xuICAgIGlmIChpbmRleCA+PSB0aGlzLmxlbmd0aCkge1xuICAgICAgdGhpcy5sZW5ndGggPSBpbmRleCArIDFcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuc3BsaWNlKGluZGV4LCAxLCB2YWwpWzBdXG4gIH1cbilcblxuLyoqXG4gKiBDb252ZW5pZW5jZSBtZXRob2QgdG8gcmVtb3ZlIHRoZSBlbGVtZW50IGF0IGdpdmVuIGluZGV4LlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleFxuICogQHBhcmFtIHsqfSB2YWxcbiAqL1xuXG5fLmRlZmluZShcbiAgYXJyYXlQcm90byxcbiAgJyRyZW1vdmUnLFxuICBmdW5jdGlvbiAkcmVtb3ZlIChpbmRleCkge1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmICghdGhpcy5sZW5ndGgpIHJldHVyblxuICAgIGlmICh0eXBlb2YgaW5kZXggIT09ICdudW1iZXInKSB7XG4gICAgICBpbmRleCA9IF8uaW5kZXhPZih0aGlzLCBpbmRleClcbiAgICB9XG4gICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgIHRoaXMuc3BsaWNlKGluZGV4LCAxKVxuICAgIH1cbiAgfVxuKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFycmF5TWV0aG9kc1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vbGliL3ZtL29ic2VydmVyL2FycmF5LmpzXG4gKiovIiwidmFyIF8gPSByZXF1aXJlKCcuLi91dGlsJylcbnZhciBvYmpQcm90byA9IE9iamVjdC5wcm90b3R5cGVcblxuLyoqXG4gKiBBZGQgYSBuZXcgcHJvcGVydHkgdG8gYW4gb2JzZXJ2ZWQgb2JqZWN0XG4gKiBhbmQgZW1pdHMgY29ycmVzcG9uZGluZyBldmVudFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAqIEBwYXJhbSB7Kn0gdmFsXG4gKiBAcHVibGljXG4gKi9cblxuXy5kZWZpbmUoXG4gIG9ialByb3RvLFxuICAnJGFkZCcsXG4gIGZ1bmN0aW9uICRhZGQgKGtleSwgdmFsKSB7XG4gICAgaWYgKHRoaXMuaGFzT3duUHJvcGVydHkoa2V5KSkgcmV0dXJuXG4gICAgdmFyIG9iID0gdGhpcy5fX29iX19cbiAgICBpZiAoIW9iIHx8IF8uaXNSZXNlcnZlZChrZXkpKSB7XG4gICAgICB0aGlzW2tleV0gPSB2YWxcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBvYi5jb252ZXJ0KGtleSwgdmFsKVxuICAgIG9iLm5vdGlmeSgpXG4gICAgaWYgKG9iLnZtcykge1xuICAgICAgdmFyIGkgPSBvYi52bXMubGVuZ3RoXG4gICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIHZhciB2bSA9IG9iLnZtc1tpXVxuICAgICAgICB2bS5fcHJveHkoa2V5KVxuICAgICAgICAvLyB2bS5fZGlnZXN0KCkgLy8gdG9kb1xuICAgICAgfVxuICAgIH1cbiAgfVxuKVxuXG4vKipcbiAqIFNldCBhIHByb3BlcnR5IG9uIGFuIG9ic2VydmVkIG9iamVjdCwgY2FsbGluZyBhZGQgdG9cbiAqIGVuc3VyZSB0aGUgcHJvcGVydHkgaXMgb2JzZXJ2ZWQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICogQHBhcmFtIHsqfSB2YWxcbiAqIEBwdWJsaWNcbiAqL1xuXG5fLmRlZmluZShcbiAgb2JqUHJvdG8sXG4gICckc2V0JyxcbiAgZnVuY3Rpb24gJHNldCAoa2V5LCB2YWwpIHtcbiAgICB0aGlzLiRhZGQoa2V5LCB2YWwpXG4gICAgdGhpc1trZXldID0gdmFsXG4gIH1cbilcblxuLyoqXG4gKiBEZWxldGVzIGEgcHJvcGVydHkgZnJvbSBhbiBvYnNlcnZlZCBvYmplY3RcbiAqIGFuZCBlbWl0cyBjb3JyZXNwb25kaW5nIGV2ZW50XG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICogQHB1YmxpY1xuICovXG5cbl8uZGVmaW5lKFxuICBvYmpQcm90byxcbiAgJyRkZWxldGUnLFxuICBmdW5jdGlvbiAkZGVsZXRlIChrZXkpIHtcbiAgICBpZiAoIXRoaXMuaGFzT3duUHJvcGVydHkoa2V5KSkgcmV0dXJuXG4gICAgZGVsZXRlIHRoaXNba2V5XVxuICAgIHZhciBvYiA9IHRoaXMuX19vYl9fXG4gICAgaWYgKCFvYiB8fCBfLmlzUmVzZXJ2ZWQoa2V5KSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIG9iLm5vdGlmeSgpXG4gICAgaWYgKG9iLnZtcykge1xuICAgICAgdmFyIGkgPSBvYi52bXMubGVuZ3RoXG4gICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIHZhciB2bSA9IG9iLnZtc1tpXVxuICAgICAgICB2bS5fdW5wcm94eShrZXkpXG4gICAgICAgIC8vIHZtLl9kaWdlc3QoKSAvLyB0b2RvXG4gICAgICB9XG4gICAgfVxuICB9XG4pXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2xpYi92bS9vYnNlcnZlci9vYmplY3QuanNcbiAqKi8iLCIvKipcbiAqIEBmaWxlT3ZlcnZpZXdcbiAqIFZpZXdNb2RlbCB0ZW1wbGF0ZSBwYXJzZXIgJiBkYXRhLWJpbmRpbmcgcHJvY2Vzc1xuICpcbiAqIHJlcXVpcmVkOlxuICogaW5kZXguanM6IFZtXG4gKiBkb20taGVscGVyLmpzOiBfY3JlYXRlRWxlbWVudCwgX2NyZWF0ZUJsb2NrXG4gKiBkb20taGVscGVyLmpzOiBfYXR0YWNoVGFyZ2V0LCBfbW92ZVRhcmdldCwgX3JlbW92ZVRhcmdldFxuICogZGlyZWN0aXZlLmpzOiBfYmluZEVsZW1lbnQsIF9iaW5kU3ViVm0sIF93YXRjaFxuICogZXZlbnRzLmpzOiAkb25cbiAqL1xuXG4vKipcbiAqIGJ1aWxkKGV4dGVybmFsRGlycylcbiAqICAgY3JlYXRlVm0oKVxuICogICBtZXJnZShleHRlcm5hbERpcnMsIGRpcnMpXG4gKiAgIGNvbXBpbGUodGVtcGxhdGUsIHBhcmVudE5vZGUpXG4gKiAgICAgaWYgKHR5cGUgaXMgY29udGVudCkgY3JlYXRlIGNvbnRlbnROb2RlXG4gKiAgICAgZWxzZSBpZiAoZGlycyBoYXZlIHYtZm9yKSBmb3JlYWNoIC0+IGNyZWF0ZSBjb250ZXh0XG4gKiAgICAgICAtPiBjb21waWxlKHRlbXBsYXRlV2l0aG91dEZvciwgcGFyZW50Tm9kZSk6IGRpZmYobGlzdCkgb25jaGFuZ2VcbiAqICAgICBlbHNlIGlmIChkaXJzIGhhdmUgdi1pZikgYXNzZXJ0XG4gKiAgICAgICAtPiBjb21waWxlKHRlbXBsYXRlV2l0aG91dElmLCBwYXJlbnROb2RlKTogdG9nZ2xlKHNob3duKSBvbmNoYW5nZVxuICogICAgIGVsc2UgaWYgKHR5cGUgaXMgbmF0aXZlKVxuICogICAgICAgc2V0KGRpcnMpOiB1cGRhdGUoaWQvYXR0ci9zdHlsZS9jbGFzcykgb25jaGFuZ2VcbiAqICAgICAgIGFwcGVuZCh0ZW1wbGF0ZSwgcGFyZW50Tm9kZSlcbiAqICAgICAgIGZvcmVhY2ggY2hpbGROb2RlcyAtPiBjb21waWxlKGNoaWxkTm9kZSwgdGVtcGxhdGUpXG4gKiAgICAgZWxzZSBpZiAodHlwZSBpcyBjdXN0b20pXG4gKiAgICAgICBhZGRDaGlsZFZtKHZtLCBwYXJlbnRWbSlcbiAqICAgICAgIGJ1aWxkKGV4dGVybmFsRGlycylcbiAqICAgICAgIGZvcmVhY2ggY2hpbGROb2RlcyAtPiBjb21waWxlKGNoaWxkTm9kZSwgdGVtcGxhdGUpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfYnVpbGQoKSB7XG4gIGNvbnN0IG9wdCA9IHRoaXMuX29wdGlvbnMgfHwge31cbiAgY29uc3QgdGVtcGxhdGUgPSBvcHQudGVtcGxhdGUgfHwge31cblxuICBpZiAob3B0LnJlcGxhY2UpIHtcbiAgICBpZiAodGVtcGxhdGUuY2hpbGRyZW4gJiYgdGVtcGxhdGUuY2hpbGRyZW4ubGVuZ3RoID09PSAxKSB7XG4gICAgICB0aGlzLl9jb21waWxlKHRlbXBsYXRlLmNoaWxkcmVuWzBdLCB0aGlzLl9wYXJlbnRFbClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLl9jb21waWxlKHRlbXBsYXRlLmNoaWxkcmVuLCB0aGlzLl9wYXJlbnRFbClcbiAgICB9XG4gIH1cbiAgZWxzZSB7XG4gICAgdGhpcy5fY29tcGlsZSh0ZW1wbGF0ZSwgdGhpcy5fcGFyZW50RWwpXG4gIH1cblxuICB0aGlzLiRlbWl0KCdob29rOnJlYWR5JylcbiAgdGhpcy5fcmVhZHkgPSB0cnVlXG59XG5cbi8qKlxuICogR2VuZXJhdGUgZWxlbWVudHMgYnkgY2hpbGQgb3IgY2hpbGRyZW4gYW5kIGFwcGVuZCB0byBwYXJlbnQgZWxlbWVudHMuXG4gKiBSb290IGVsZW1lbnQgaW5mbyB3b3VsZCBiZSBtZXJnZWQgaWYgaGFzLiBUaGUgZmlyc3QgYXJndW1lbnQgbWF5IGJlIGFuIGFycmF5XG4gKiBpZiB0aGUgcm9vdCBlbGVtZW50IHdpdGggb3B0aW9ucy5yZXBsYWNlIGhhcyBub3Qgb25seSBvbmUgY2hpbGQuXG4gKlxuICogQHBhcmFtIHtvYmplY3R8YXJyYXl9IHRhcmdldFxuICogQHBhcmFtIHtvYmplY3R9ICAgICAgIGRlc3RcbiAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICBtZXRhXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfY29tcGlsZSh0YXJnZXQsIGRlc3QsIG1ldGEpIHtcbiAgbGV0IGNvbnRleHQgPSB0aGlzXG4gIGlmIChjb250ZXh0Ll90YXJnZXRJc0ZyYWdtZW50KHRhcmdldCkpIHtcbiAgICBjb250ZXh0Ll9jb21waWxlRnJhZ21lbnQodGFyZ2V0LCBkZXN0LCBtZXRhKVxuICAgIHJldHVyblxuICB9XG4gIG1ldGEgPSBtZXRhIHx8IHt9XG4gIGlmIChjb250ZXh0Ll90YXJnZXRJc0NvbnRlbnQodGFyZ2V0KSkge1xuICAgIGNvbnRleHQuX2NvbnRlbnQgPSBjb250ZXh0Ll9jcmVhdGVCbG9jayhkZXN0KVxuICAgIHJldHVyblxuICB9XG5cbiAgaWYgKGNvbnRleHQuX3RhcmdldE5lZWRDaGVja1JlcGVhdCh0YXJnZXQsIG1ldGEpKSB7XG4gICAgY29udGV4dC5fY29tcGlsZVJlcGVhdCh0YXJnZXQsIGRlc3QpXG4gICAgcmV0dXJuXG4gIH1cbiAgaWYgKGNvbnRleHQuX3RhcmdldE5lZWRDaGVja1Nob3duKHRhcmdldCwgbWV0YSkpIHtcbiAgICBjb250ZXh0Ll9jb21waWxlU2hvd24odGFyZ2V0LCBkZXN0LCBtZXRhKVxuICAgIHJldHVyblxuICB9XG4gIGNvbnN0IHR5cGVHZXR0ZXIgPSBtZXRhLnR5cGUgfHwgdGFyZ2V0LnR5cGVcbiAgaWYgKGNvbnRleHQuX3RhcmdldE5lZWRDaGVja1R5cGUodHlwZUdldHRlciwgbWV0YSkpIHtcbiAgICBjb250ZXh0Ll9jb21waWxlVHlwZSh0YXJnZXQsIGRlc3QsIHR5cGVHZXR0ZXIsIG1ldGEpXG4gICAgcmV0dXJuXG4gIH1cbiAgY29uc3QgdHlwZSA9IHR5cGVHZXR0ZXJcbiAgaWYgKGNvbnRleHQuX3RhcmdldElzQ29tcG9zZWQodGFyZ2V0LCB0eXBlKSkge1xuICAgIGNvbnRleHQuX2NvbXBpbGVDdXN0b21Db21wb25lbnQodGFyZ2V0LCBkZXN0LCB0eXBlLCBtZXRhKVxuICAgIHJldHVyblxuICB9XG4gIGNvbnRleHQuX2NvbXBpbGVOYXRpdmVDb21wb25lbnQodGFyZ2V0LCBkZXN0LCB0eXBlKVxufVxuXG4vKipcbiAqIENoZWNrIGlmIHRhcmdldCBpcyBhIGZyYWdtZW50IChhbiBhcnJheSkuXG4gKlxuICogQHBhcmFtICB7b2JqZWN0fSAgdGFyZ2V0XG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gX3RhcmdldElzRnJhZ21lbnQodGFyZ2V0KSB7XG4gIHJldHVybiBBcnJheS5pc0FycmF5KHRhcmdldClcbn1cblxuLyoqXG4gKiBDaGVjayBpZiB0YXJnZXQgdHlwZSBpcyBjb250ZW50L3Nsb3QuXG4gKlxuICogQHBhcmFtICB7b2JqZWN0fSAgdGFyZ2V0XG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gX3RhcmdldElzQ29udGVudCh0YXJnZXQpIHtcbiAgcmV0dXJuIHRhcmdldC50eXBlID09PSAnY29udGVudCcgfHwgdGFyZ2V0LnR5cGUgPT09ICdzbG90J1xufVxuXG4vKipcbiAqIENoZWNrIGlmIHRhcmdldCBuZWVkIHRvIGNvbXBpbGUgYnkgYSBsaXN0LlxuICpcbiAqIEBwYXJhbSAge29iamVjdH0gIHRhcmdldFxuICogQHBhcmFtICB7b2JqZWN0fSAgbWV0YVxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF90YXJnZXROZWVkQ2hlY2tSZXBlYXQodGFyZ2V0LCBtZXRhKSB7XG4gIHJldHVybiAhbWV0YS5oYXNPd25Qcm9wZXJ0eSgncmVwZWF0JykgJiYgdGFyZ2V0LnJlcGVhdFxufVxuXG4vKipcbiAqIENoZWNrIGlmIHRhcmdldCBuZWVkIHRvIGNvbXBpbGUgYnkgYSBib29sZWFuIHZhbHVlLlxuICpcbiAqIEBwYXJhbSAge29iamVjdH0gIHRhcmdldFxuICogQHBhcmFtICB7b2JqZWN0fSAgbWV0YVxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF90YXJnZXROZWVkQ2hlY2tTaG93bih0YXJnZXQsIG1ldGEpIHtcbiAgcmV0dXJuICFtZXRhLmhhc093blByb3BlcnR5KCdzaG93bicpICYmIHRhcmdldC5zaG93blxufVxuXG4vKipcbiAqIENoZWNrIGlmIHRhcmdldCBuZWVkIHRvIGNvbXBpbGUgYnkgYSBkeW5hbWljIHR5cGUuXG4gKlxuICogQHBhcmFtICB7c3RyaW5nfGZ1bmN0aW9ufSB0eXBlR2V0dGVyXG4gKiBAcGFyYW0gIHtvYmplY3R9ICAgICAgICAgIG1ldGFcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfdGFyZ2V0TmVlZENoZWNrVHlwZSh0eXBlR2V0dGVyLCBtZXRhKSB7XG4gIHJldHVybiAodHlwZW9mIHR5cGVHZXR0ZXIgPT09ICdmdW5jdGlvbicpICYmICFtZXRhLmhhc093blByb3BlcnR5KCd0eXBlJylcbn1cblxuLyoqXG4gKiBDaGVjayBpZiB0aGlzIGtpbmQgb2YgY29tcG9uZW50IGlzIGNvbXBvc2VkLlxuICpcbiAqIEBwYXJhbSAge3N0cmluZ30gIHR5cGVcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfdGFyZ2V0SXNDb21wb3NlZCh0YXJnZXQsIHR5cGUpIHtcbiAgaWYgKHRoaXMuX2FwcCAmJiB0aGlzLl9hcHAuY3VzdG9tQ29tcG9uZW50TWFwICYmIHR5cGUpIHtcbiAgICByZXR1cm4gISF0aGlzLl9hcHAuY3VzdG9tQ29tcG9uZW50TWFwW3R5cGVdXG4gIH1cbiAgcmV0dXJuICEhdGFyZ2V0LmNvbXBvbmVudFxufVxuXG4vKipcbiAqIENvbXBpbGUgYSBsaXN0IG9mIHRhcmdldHMuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHRhcmdldFxuICogQHBhcmFtIHtvYmplY3R9IGRlc3RcbiAqIEBwYXJhbSB7b2JqZWN0fSBtZXRhXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfY29tcGlsZUZyYWdtZW50KHRhcmdldCwgZGVzdCwgbWV0YSkge1xuICBjb25zdCBmcmFnQmxvY2sgPSB0aGlzLl9jcmVhdGVCbG9jayhkZXN0KVxuICB0YXJnZXQuZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICB0aGlzLl9jb21waWxlKGNoaWxkLCBmcmFnQmxvY2ssIG1ldGEpXG4gIH0pXG59XG5cbi8qKlxuICogQ29tcGlsZSBhIHRhcmdldCB3aXRoIHJlcGVhdCBkaXJlY3RpdmUuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHRhcmdldFxuICogQHBhcmFtIHtvYmplY3R9IGRlc3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9jb21waWxlUmVwZWF0KHRhcmdldCwgZGVzdCkge1xuICBjb25zdCByZXBlYXQgPSB0YXJnZXQucmVwZWF0XG4gIGNvbnN0IG9sZFN0eWxlID0gdHlwZW9mIHJlcGVhdCA9PT0gJ2Z1bmN0aW9uJ1xuICBsZXQgZ2V0dGVyID0gcmVwZWF0LmdldHRlciB8fCByZXBlYXQuZXhwcmVzc2lvbiB8fCByZXBlYXRcbiAgaWYgKHR5cGVvZiBnZXR0ZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICBnZXR0ZXIgPSBmdW5jdGlvbiAoKSB7cmV0dXJuIFtdfVxuICB9XG4gIGNvbnN0IGtleSA9IHJlcGVhdC5rZXkgfHwgJyRpbmRleCdcbiAgY29uc3QgdmFsdWUgPSByZXBlYXQudmFsdWUgfHwgJyR2YWx1ZSdcbiAgY29uc3QgdHJhY2tCeSA9IHJlcGVhdC50cmFja0J5IHx8IHRhcmdldC50cmFja0J5IHx8XG4gICAgKHRhcmdldC5hdHRyICYmIHRhcmdldC5hdHRyLnRyYWNrQnkpIHx8IGtleVxuXG4gIGNvbnN0IGZyYWdCbG9jayA9IHRoaXMuX2NyZWF0ZUJsb2NrKGRlc3QpXG4gIGZyYWdCbG9jay5jaGlsZHJlbiA9IFtdXG4gIGZyYWdCbG9jay5kYXRhID0gW11cbiAgZnJhZ0Jsb2NrLnZtcyA9IFtdXG5cbiAgdGhpcy5fYmluZFJlcGVhdCh0YXJnZXQsIGZyYWdCbG9jaywge2dldHRlciwga2V5LCB2YWx1ZSwgdHJhY2tCeSwgb2xkU3R5bGV9KVxufVxuXG4vKipcbiAqIENvbXBpbGUgYSB0YXJnZXQgd2l0aCBpZiBkaXJlY3RpdmUuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHRhcmdldFxuICogQHBhcmFtIHtvYmplY3R9IGRlc3RcbiAqIEBwYXJhbSB7b2JqZWN0fSBtZXRhXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfY29tcGlsZVNob3duKHRhcmdldCwgZGVzdCwgbWV0YSkge1xuICBjb25zdCBuZXdNZXRhID0ge3Nob3duOiB0cnVlfVxuICBjb25zdCBmcmFnQmxvY2sgPSB0aGlzLl9jcmVhdGVCbG9jayhkZXN0KVxuXG4gIGlmIChkZXN0LmVsZW1lbnQgJiYgZGVzdC5jaGlsZHJlbikge1xuICAgIGRlc3QuY2hpbGRyZW4ucHVzaChmcmFnQmxvY2spXG4gIH1cblxuICBpZiAobWV0YS5yZXBlYXQpIHtcbiAgICBuZXdNZXRhLnJlcGVhdCA9IG1ldGEucmVwZWF0XG4gIH1cblxuICB0aGlzLl9iaW5kU2hvd24odGFyZ2V0LCBmcmFnQmxvY2ssIG5ld01ldGEpXG59XG5cbi8qKlxuICogQ29tcGlsZSBhIHRhcmdldCB3aXRoIGR5bmFtaWMgY29tcG9uZW50IHR5cGUuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9ICAgdGFyZ2V0XG4gKiBAcGFyYW0ge29iamVjdH0gICBkZXN0XG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSB0eXBlR2V0dGVyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfY29tcGlsZVR5cGUodGFyZ2V0LCBkZXN0LCB0eXBlR2V0dGVyLCBtZXRhKSB7XG4gIGNvbnN0IHR5cGUgPSB0eXBlR2V0dGVyLmNhbGwodGhpcylcbiAgY29uc3QgbmV3TWV0YSA9IE9iamVjdC5hc3NpZ24oe3R5cGV9LCBtZXRhKVxuICBjb25zdCBmcmFnQmxvY2sgPSB0aGlzLl9jcmVhdGVCbG9jayhkZXN0KVxuXG4gIGlmIChkZXN0LmVsZW1lbnQgJiYgZGVzdC5jaGlsZHJlbikge1xuICAgIGRlc3QuY2hpbGRyZW4ucHVzaChmcmFnQmxvY2spXG4gIH1cblxuICB0aGlzLl93YXRjaCh0eXBlR2V0dGVyLCAodmFsdWUpID0+IHtcbiAgICBjb25zdCBuZXdNZXRhID0gT2JqZWN0LmFzc2lnbih7dHlwZTogdmFsdWV9LCBtZXRhKVxuICAgIHRoaXMuX3JlbW92ZUJsb2NrKGZyYWdCbG9jaywgdHJ1ZSlcbiAgICB0aGlzLl9jb21waWxlKHRhcmdldCwgZnJhZ0Jsb2NrLCBuZXdNZXRhKVxuICB9KVxuXG4gIHRoaXMuX2NvbXBpbGUodGFyZ2V0LCBmcmFnQmxvY2ssIG5ld01ldGEpXG59XG5cbi8qKlxuICogQ29tcGlsZSBhIGNvbXBvc2VkIGNvbXBvbmVudC5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gdGFyZ2V0XG4gKiBAcGFyYW0ge29iamVjdH0gZGVzdFxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9jb21waWxlQ3VzdG9tQ29tcG9uZW50KHRhcmdldCwgZGVzdCwgdHlwZSwgbWV0YSkge1xuICBjb25zdCBWbSA9IHRoaXMuY29uc3RydWN0b3JcbiAgY29uc3QgY29udGV4dCA9IHRoaXNcbiAgY29uc3Qgc3ViVm0gPSBuZXcgVm0odHlwZSwgY29udGV4dCwgZGVzdCwgdW5kZWZpbmVkLCB7XG4gICAgJ2hvb2s6aW5pdCc6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnRleHQuX3NldElkKHRhcmdldC5pZCwgbnVsbCwgdGhpcylcbiAgICB9LFxuICAgICdob29rOmNyZWF0ZWQnOiBmdW5jdGlvbiAoKSB7XG4gICAgICBjb250ZXh0Ll9iaW5kU3ViVm0odGhpcywgdGFyZ2V0LCBtZXRhLnJlcGVhdClcbiAgICB9LFxuICAgICdob29rOnJlYWR5JzogZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHRoaXMuX2NvbnRlbnQpIHtcbiAgICAgICAgY29udGV4dC5fY29tcGlsZUNoaWxkcmVuKHRhcmdldCwgdGhpcy5fY29udGVudClcbiAgICAgIH1cbiAgICB9XG4gIH0pXG4gIHRoaXMuX2JpbmRTdWJWbUFmdGVySW5pdGlhbGl6ZWQoc3ViVm0sIHRhcmdldClcbn1cblxuLyoqXG4gKiBHZW5lcmF0ZSBlbGVtZW50IGZyb20gdGVtcGxhdGUgYW5kIGF0dGFjaCB0byB0aGUgZGVzdCBpZiBuZWVkZWQuXG4gKiBUaGUgdGltZSB0byBhdHRhY2ggZGVwZW5kcyBvbiB3aGV0aGVyIHRoZSBtb2RlIHN0YXR1cyBpcyBub2RlIG9yIHRyZWUuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHRlbXBsYXRlXG4gKiBAcGFyYW0ge29iamVjdH0gZGVzdFxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9jb21waWxlTmF0aXZlQ29tcG9uZW50KHRlbXBsYXRlLCBkZXN0LCB0eXBlKSB7XG5cbiAgdGhpcy5fYXBwbHlOYWl0dmVDb21wb25lbnRPcHRpb25zKHRlbXBsYXRlKVxuXG4gIGxldCBlbGVtZW50XG4gIGlmIChkZXN0LnJlZiA9PT0gJ19kb2N1bWVudEVsZW1lbnQnKSB7XG4gICAgLy8gaWYgaXRzIHBhcmVudCBpcyBkb2N1bWVudEVsZW1lbnQgdGhlbiBpdCdzIGEgYm9keVxuICAgIGVsZW1lbnQgPSB0aGlzLl9jcmVhdGVCb2R5KHR5cGUpXG4gIH0gZWxzZSB7XG4gICAgZWxlbWVudCA9IHRoaXMuX2NyZWF0ZUVsZW1lbnQodHlwZSlcbiAgfVxuICAvLyBUT0RPIGl0IHdhcyBhIHJvb3QgZWxlbWVudCB3aGVuIG5vdCBpbiBhIGZyYWdtZW50XG4gIGlmICghdGhpcy5fcm9vdEVsKSB7XG4gICAgdGhpcy5fcm9vdEVsID0gZWxlbWVudFxuICB9XG5cbiAgdGhpcy5fYmluZEVsZW1lbnQoZWxlbWVudCwgdGVtcGxhdGUpXG5cbiAgaWYgKHRlbXBsYXRlLmF0dHIgJiYgdGVtcGxhdGUuYXR0ci5hcHBlbmQpIHsgLy8gYmFja3dhcmQsIGFwcGVuZCBwcm9wIGluIGF0dHJcbiAgICB0ZW1wbGF0ZS5hcHBlbmQgPSB0ZW1wbGF0ZS5hdHRyLmFwcGVuZFxuICB9XG5cbiAgaWYgKHRlbXBsYXRlLmFwcGVuZCkgeyAvLyBnaXZlIHRoZSBhcHBlbmQgYXR0cmlidXRlIGZvciBpb3MgYWRhcHRhdGlvblxuICAgIGVsZW1lbnQuYXR0ciA9IGVsZW1lbnQuYXR0ciB8fCB7fVxuICAgIGVsZW1lbnQuYXR0ci5hcHBlbmQgPSB0ZW1wbGF0ZS5hcHBlbmRcbiAgfVxuXG4gIGNvbnN0IHRyZWVNb2RlID0gdGVtcGxhdGUuYXBwZW5kID09PSAndHJlZSdcbiAgaWYgKCF0cmVlTW9kZSkge1xuICAgIHRoaXMuX2F0dGFjaFRhcmdldChlbGVtZW50LCBkZXN0KVxuICB9XG4gIHRoaXMuX2NvbXBpbGVDaGlsZHJlbih0ZW1wbGF0ZSwgZWxlbWVudClcbiAgaWYgKHRyZWVNb2RlKSB7XG4gICAgdGhpcy5fYXR0YWNoVGFyZ2V0KGVsZW1lbnQsIGRlc3QpXG4gIH1cbn1cblxuLyoqXG4gKiBTZXQgYWxsIGNoaWxkcmVuIHRvIGEgY2VydGFpbiBwYXJlbnQgZWxlbWVudC5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gdGVtcGxhdGVcbiAqIEBwYXJhbSB7b2JqZWN0fSBkZXN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfY29tcGlsZUNoaWxkcmVuKHRlbXBsYXRlLCBkZXN0KSB7XG4gIGNvbnN0IGNoaWxkcmVuID0gdGVtcGxhdGUuY2hpbGRyZW5cbiAgaWYgKGNoaWxkcmVuICYmIGNoaWxkcmVuLmxlbmd0aCkge1xuICAgIGNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiB7XG4gICAgICB0aGlzLl9jb21waWxlKGNoaWxkLCBkZXN0KVxuICAgIH0pXG4gIH1cbn1cblxuLyoqXG4gKiBXYXRjaCB0aGUgbGlzdCB1cGRhdGUgYW5kIHJlZnJlc2ggdGhlIGNoYW5nZXMuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHRhcmdldFxuICogQHBhcmFtIHtvYmplY3R9IGZyYWdCbG9jayB7dm1zLCBkYXRhLCBjaGlsZHJlbn1cbiAqIEBwYXJhbSB7b2JqZWN0fSBpbmZvICAgICAge2dldHRlciwga2V5LCB2YWx1ZSwgdHJhY2tCeSwgb2xkU3R5bGV9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfYmluZFJlcGVhdCh0YXJnZXQsIGZyYWdCbG9jaywgaW5mbykge1xuICBjb25zdCB2bXMgPSBmcmFnQmxvY2sudm1zXG4gIGNvbnN0IGNoaWxkcmVuID0gZnJhZ0Jsb2NrLmNoaWxkcmVuXG4gIGNvbnN0IHtnZXR0ZXIsIHRyYWNrQnksIG9sZFN0eWxlfSA9IGluZm9cbiAgY29uc3Qga2V5TmFtZSA9IGluZm8ua2V5XG4gIGNvbnN0IHZhbHVlTmFtZSA9IGluZm8udmFsdWVcblxuICBmdW5jdGlvbiBjb21waWxlSXRlbShpdGVtLCBpbmRleCwgY29udGV4dCkge1xuICAgIGxldCBtZXJnZWREYXRhXG4gICAgaWYgKG9sZFN0eWxlKSB7XG4gICAgICBtZXJnZWREYXRhID0gaXRlbVxuICAgICAgaWYgKHR5cGVvZiBpdGVtID09PSAnb2JqZWN0Jykge1xuICAgICAgICBtZXJnZWREYXRhW2tleU5hbWVdID0gaW5kZXhcbiAgICAgICAgaWYgKCFtZXJnZWREYXRhLmhhc093blByb3BlcnR5KCdJTkRFWCcpKSB7XG4gICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG1lcmdlZERhdGEsICdJTkRFWCcsIHtcbiAgICAgICAgICAgIHZhbHVlOiAoKSA9PiB7XG4gICAgICAgICAgICAgIG5hdGl2ZUxvZygnW1dBUk5JTkddIFwiSU5ERVhcIiBpbiByZXBlYXQgaXMgZGVwcmVjYXRlZCwnICtcbiAgICAgICAgICAgICAgICAnIHBsZWFzZSB1c2UgXCIkaW5kZXhcIiBpbnN0ZWFkJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgbWVyZ2VkRGF0YSA9IHt9XG4gICAgICBtZXJnZWREYXRhW2tleU5hbWVdID0gaW5kZXhcbiAgICAgIG1lcmdlZERhdGFbdmFsdWVOYW1lXSA9IGl0ZW1cbiAgICB9XG4gICAgY29udGV4dCA9IGNvbnRleHQuX21lcmdlQ29udGV4dChtZXJnZWREYXRhKVxuICAgIC8vIGNvbnNvbGUubG9nKGNvbnRleHQpXG4gICAgdm1zLnB1c2goY29udGV4dClcbiAgICBjb250ZXh0Ll9jb21waWxlKHRhcmdldCwgZnJhZ0Jsb2NrLCB7cmVwZWF0OiBpdGVtfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGRpZmZJdGVtKHZtLCBpdGVtKSB7XG4gICAgY29uc3Qgb2xkSXRlbSA9IHZtLl9kYXRhXG4gICAgY29uc3Qgb2xkS2V5cyA9IFtdXG4gICAgZm9yIChjb25zdCBrZXkgaW4gb2xkSXRlbSkge1xuICAgICAgaWYgKCFpdGVtLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgdm1ba2V5XSA9IHVuZGVmaW5lZFxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKGNvbnN0IGtleSBpbiBpdGVtKSB7XG4gICAgICB2bVtrZXldID0gaXRlbVtrZXldXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2V0SXRlbVZhbHVlKGl0ZW0sIGluZGV4LCB2bSkge1xuICAgIGxldCBtZXJnZWREYXRhXG4gICAgaWYgKG9sZFN0eWxlKSB7XG4gICAgICBpZiAodHlwZW9mIGl0ZW0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGRpZmZJdGVtKHZtLCBpdGVtKVxuICAgICAgICB2bS5JTkRFWCA9IGluZGV4XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdm1ba2V5TmFtZV0gPSBpbmRleFxuICAgICAgdm1bdmFsdWVOYW1lXSA9IGl0ZW1cbiAgICB9XG4gIH1cblxuICBjb25zdCBsaXN0ID0gdGhpcy5fd2F0Y2hCbG9jayhmcmFnQmxvY2ssIGdldHRlciwgJ3JlcGVhdCcsXG4gICAgKGRhdGEpID0+IHtcbiAgICAgIGlmICghZnJhZ0Jsb2NrKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBjb25zdCBvbGRDaGlsZHJlbiA9IGNoaWxkcmVuLnNsaWNlKClcbiAgICAgIGNvbnN0IG9sZFZtcyA9IHZtcy5zbGljZSgpXG4gICAgICBjb25zdCBvbGREYXRhID0gZnJhZ0Jsb2NrLmRhdGEuc2xpY2UoKVxuICAgICAgLy8gMS4gY29sbGVjdCBhbGwgbmV3IHJlZnMgdHJhY2sgYnlcbiAgICAgIGNvbnN0IHRyYWNrTWFwID0ge31cbiAgICAgIGNvbnN0IHJldXNlZE1hcCA9IHt9XG4gICAgICBkYXRhLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IGtleSA9IHRyYWNrQnkgPyBpdGVtW3RyYWNrQnldIDogaW5kZXhcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgIGlmIChrZXkgPT0gbnVsbCB8fCBrZXkgPT09ICcnKSB7XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgdHJhY2tNYXBba2V5XSA9IGl0ZW1cbiAgICAgIH0pXG5cbiAgICAgIC8vIDIuIHJlbW92ZSB1bnVzZWQgZWxlbWVudCBmb3JlYWNoIG9sZCBpdGVtXG4gICAgICBjb25zdCByZXVzZWRMaXN0ID0gW11cbiAgICAgIG9sZERhdGEuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgY29uc3Qga2V5ID0gdHJhY2tCeSA/IGl0ZW1bdHJhY2tCeV0gOiBpbmRleFxuICAgICAgICBpZiAodHJhY2tNYXAuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgIHJldXNlZE1hcFtrZXldID0ge1xuICAgICAgICAgICAgaXRlbSwgaW5kZXgsIGtleSxcbiAgICAgICAgICAgIHRhcmdldDogb2xkQ2hpbGRyZW5baW5kZXhdLFxuICAgICAgICAgICAgdm06IG9sZFZtc1tpbmRleF1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV1c2VkTGlzdC5wdXNoKGl0ZW0pXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdGhpcy5fcmVtb3ZlVGFyZ2V0KG9sZENoaWxkcmVuW2luZGV4XSlcbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgICAgLy8gMy4gY3JlYXRlIG5ldyBlbGVtZW50IGZvcmVhY2ggbmV3IGl0ZW1cbiAgICAgIGNoaWxkcmVuLmxlbmd0aCA9IDBcbiAgICAgIHZtcy5sZW5ndGggPSAwXG4gICAgICBmcmFnQmxvY2suZGF0YSA9IGRhdGEuc2xpY2UoKVxuICAgICAgZnJhZ0Jsb2NrLnVwZGF0ZU1hcmsgPSBmcmFnQmxvY2suc3RhcnRcblxuICAgICAgZGF0YS5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICBjb25zdCBrZXkgPSB0cmFja0J5ID8gaXRlbVt0cmFja0J5XSA6IGluZGV4XG4gICAgICAgIGNvbnN0IHJldXNlZCA9IHJldXNlZE1hcFtrZXldXG4gICAgICAgIGlmIChyZXVzZWQpIHtcbiAgICAgICAgICBpZiAocmV1c2VkLml0ZW0gPT09IHJldXNlZExpc3RbMF0pIHtcbiAgICAgICAgICAgIHJldXNlZExpc3Quc2hpZnQoKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXVzZWRMaXN0LiRyZW1vdmUocmV1c2VkLml0ZW0pXG4gICAgICAgICAgICB0aGlzLl9tb3ZlVGFyZ2V0KHJldXNlZC50YXJnZXQsIGZyYWdCbG9jay51cGRhdGVNYXJrLCB0cnVlKVxuICAgICAgICAgIH1cbiAgICAgICAgICBjaGlsZHJlbi5wdXNoKHJldXNlZC50YXJnZXQpXG4gICAgICAgICAgdm1zLnB1c2gocmV1c2VkLnZtKVxuICAgICAgICAgIHJldXNlZC52bVtrZXlOYW1lXSA9IGluZGV4XG4gICAgICAgICAgZnJhZ0Jsb2NrLnVwZGF0ZU1hcmsgPSByZXVzZWQudGFyZ2V0XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgY29tcGlsZUl0ZW0oaXRlbSwgaW5kZXgsIHRoaXMpXG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAgIGRlbGV0ZSBmcmFnQmxvY2sudXBkYXRlTWFya1xuICAgIH1cbiAgKVxuXG4gIGZyYWdCbG9jay5kYXRhID0gbGlzdC5zbGljZSgwKVxuICBsaXN0LmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgY29tcGlsZUl0ZW0oaXRlbSwgaW5kZXgsIHRoaXMpXG4gIH0pXG59XG5cbi8qKlxuICogV2F0Y2ggdGhlIGRpc3BsYXkgdXBkYXRlIGFuZCBhZGQvcmVtb3ZlIHRoZSBlbGVtZW50LlxuICpcbiAqIEBwYXJhbSAge29iamVjdH0gdGFyZ2V0XG4gKiBAcGFyYW0gIHtvYmplY3R9IGZyYWdCbG9ja1xuICogQHBhcmFtICB7b2JqZWN0fSBjb250ZXh0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfYmluZFNob3duKHRhcmdldCwgZnJhZ0Jsb2NrLCBtZXRhKSB7XG4gIGNvbnN0IGRpc3BsYXkgPSB0aGlzLl93YXRjaEJsb2NrKGZyYWdCbG9jaywgdGFyZ2V0LnNob3duLCAnc2hvd24nLFxuICAgIChkaXNwbGF5KSA9PiB7XG4gICAgICBpZiAoIWZyYWdCbG9jayB8fCAhIWZyYWdCbG9jay5kaXNwbGF5ID09PSAhIWRpc3BsYXkpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBmcmFnQmxvY2suZGlzcGxheSA9ICEhZGlzcGxheVxuICAgICAgaWYgKGRpc3BsYXkpIHtcbiAgICAgICAgdGhpcy5fY29tcGlsZSh0YXJnZXQsIGZyYWdCbG9jaywgbWV0YSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB0aGlzLl9yZW1vdmVCbG9jayhmcmFnQmxvY2ssIHRydWUpXG4gICAgICB9XG4gICAgfVxuICApXG5cbiAgZnJhZ0Jsb2NrLmRpc3BsYXkgPSAhIWRpc3BsYXlcbiAgaWYgKGRpc3BsYXkpIHtcbiAgICB0aGlzLl9jb21waWxlKHRhcmdldCwgZnJhZ0Jsb2NrLCBtZXRhKVxuICB9XG59XG5cbi8qKlxuICogV2F0Y2ggY2FsYyB2YWx1ZSBjaGFuZ2VzIGFuZCBhcHBlbmQgY2VydGFpbiB0eXBlIGFjdGlvbiB0byBkaWZmZXIuXG4gKiBJdCBpcyB1c2VkIGZvciBpZiBvciByZXBlYXQgZGF0YS1iaW5kaW5nIGdlbmVyYXRvci5cbiAqXG4gKiBAcGFyYW0gIHtvYmplY3R9ICAgZnJhZ0Jsb2NrXG4gKiBAcGFyYW0gIHtmdW5jdGlvbn0gY2FsY1xuICogQHBhcmFtICB7c3RyaW5nfSAgIHR5cGVcbiAqIEBwYXJhbSAge2Z1bmN0aW9ufSBoYW5kbGVyXG4gKiBAcmV0dXJuIHthbnl9ICAgICAgaW5pdCB2YWx1ZSBvZiBjYWxjXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfd2F0Y2hCbG9jayhmcmFnQmxvY2ssIGNhbGMsIHR5cGUsIGhhbmRsZXIpIHtcbiAgY29uc3QgZGlmZmVyID0gdGhpcyAmJiB0aGlzLl9hcHAgJiYgdGhpcy5fYXBwLmRpZmZlclxuICBjb25zdCBjb25maWcgPSB7fVxuICBjb25zdCBkZXB0aCA9IChmcmFnQmxvY2suZWxlbWVudC5kZXB0aCB8fCAwKSArIDFcblxuICByZXR1cm4gdGhpcy5fd2F0Y2goY2FsYywgKHZhbHVlKSA9PiB7XG4gICAgY29uZmlnLmxhdGVzdFZhbHVlID0gdmFsdWVcbiAgICBpZiAoZGlmZmVyICYmICFjb25maWcucmVjb3JkZWQpIHtcbiAgICAgIGRpZmZlci5hcHBlbmQodHlwZSwgZGVwdGgsIGZyYWdCbG9jay5ibG9ja0lkLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGxhdGVzdFZhbHVlID0gY29uZmlnLmxhdGVzdFZhbHVlXG4gICAgICAgIGhhbmRsZXIobGF0ZXN0VmFsdWUpXG4gICAgICAgIGNvbmZpZy5yZWNvcmRlZCA9IGZhbHNlXG4gICAgICAgIGNvbmZpZy5sYXRlc3RWYWx1ZSA9IHVuZGVmaW5lZFxuICAgICAgfSlcbiAgICB9XG4gICAgY29uZmlnLnJlY29yZGVkID0gdHJ1ZVxuICB9KVxufVxuXG4vKipcbiAqIENsb25lIGEgY29udGV4dCBhbmQgbWVyZ2UgY2VydGFpbiBkYXRhLlxuICpcbiAqIEBwYXJhbSAge29iamVjdH0gbWVyZ2VkRGF0YVxuICogQHJldHVybiB7b2JqZWN0fVxuICovXG5leHBvcnQgZnVuY3Rpb24gX21lcmdlQ29udGV4dChtZXJnZWREYXRhKSB7XG4gIGNvbnN0IGNvbnRleHQgPSBPYmplY3QuY3JlYXRlKHRoaXMpXG4gIGNvbnRleHQuX2RhdGEgPSBtZXJnZWREYXRhXG4gIGNvbnRleHQuX2luaXREYXRhKClcbiAgY29udGV4dC5fcmVhbFBhcmVudCA9IHRoaXNcbiAgcmV0dXJuIGNvbnRleHRcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vbGliL3ZtL2NvbXBpbGVyLmpzXG4gKiovIiwiLyoqXG4gKiBAZmlsZU92ZXJ2aWV3XG4gKiBEaXJlY3RpdmUgUGFyc2VyXG4gKi9cblxuaW1wb3J0IHtiaW5kLCBleHRlbmR9IGZyb20gJy4uL3V0aWwnXG5cbmltcG9ydCBXYXRjaGVyIGZyb20gJy4vd2F0Y2hlcidcbmltcG9ydCB7bmF0aXZlQ29tcG9uZW50TWFwfSBmcm9tICcuLi9jb25maWcnXG5cbmNvbnN0IFNFVFRFUlMgPSB7XG4gIGF0dHI6ICdzZXRBdHRyJyxcbiAgc3R5bGU6ICdzZXRTdHlsZScsXG4gIGV2ZW50OiAnYWRkRXZlbnQnXG59XG5cbi8qKlxuICogYXBwbHkgdGhlIG5hdGl2ZSBjb21wb25lbnQncyBvcHRpb25zKHNwZWNpZmllZCBieSB0ZW1wbGF0ZS50eXBlKVxuICogdG8gdGhlIHRlbXBsYXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfYXBwbHlOYWl0dmVDb21wb25lbnRPcHRpb25zKHRlbXBsYXRlKSB7XG4gIGNvbnN0IHt0eXBlfSA9IHRlbXBsYXRlXG4gIGNvbnN0IG9wdGlvbnMgPSBuYXRpdmVDb21wb25lbnRNYXBbdHlwZV1cblxuICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdvYmplY3QnKSB7XG4gICAgZXh0ZW5kKHRlbXBsYXRlLCBvcHRpb25zKVxuICB9XG59XG5cbi8qKlxuICogYmluZCBhbGwgaWQsIGF0dHIsIGNsYXNzbmFtZXMsIHN0eWxlLCBldmVudHMgdG8gYW4gZWxlbWVudFxuICovXG5leHBvcnQgZnVuY3Rpb24gX2JpbmRFbGVtZW50KGVsLCB0ZW1wbGF0ZSkge1xuICB0aGlzLl9zZXRJZCh0ZW1wbGF0ZS5pZCwgZWwsIHRoaXMpXG4gIHRoaXMuX3NldEF0dHIoZWwsIHRlbXBsYXRlLmF0dHIpXG4gIHRoaXMuX3NldENsYXNzKGVsLCB0ZW1wbGF0ZS5jbGFzc0xpc3QpXG4gIHRoaXMuX3NldFN0eWxlKGVsLCB0ZW1wbGF0ZS5zdHlsZSlcbiAgdGhpcy5fYmluZEV2ZW50cyhlbCwgdGVtcGxhdGUuZXZlbnRzKVxufVxuXG4vKipcbiAqIGJpbmQgYWxsIHByb3BzIHRvIHN1YiB2bSBhbmQgYmluZCBhbGwgc3R5bGUsIGV2ZW50cyB0byB0aGUgcm9vdCBlbGVtZW50XG4gKiBvZiB0aGUgc3ViIHZtIGlmIGl0IGRvZXNuJ3QgaGF2ZSBhIHJlcGxhY2VkIG11bHRpLW5vZGUgZnJhZ21lbnRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9iaW5kU3ViVm0oc3ViVm0sIHRlbXBsYXRlLCByZXBlYXRJdGVtKSB7XG4gIHN1YlZtID0gc3ViVm0gfHwge31cbiAgdGVtcGxhdGUgPSB0ZW1wbGF0ZSB8fCB7fVxuXG4gIGNvbnN0IG9wdGlvbnMgPSBzdWJWbS5fb3B0aW9ucyB8fCB7fVxuXG4gIC8vIGJpbmQgcHJvcHNcbiAgbGV0IHByb3BzID0gb3B0aW9ucy5wcm9wc1xuXG4gIGlmIChBcnJheS5pc0FycmF5KHByb3BzKSkge1xuICAgIHByb3BzID0gcHJvcHMucmVkdWNlKChyZXN1bHQsIHZhbHVlKSA9PiB7XG4gICAgICByZXN1bHRbdmFsdWVdID0gdHJ1ZVxuICAgICAgcmV0dXJuIHJlc3VsdFxuICAgIH0sIHt9KVxuICB9XG5cbiAgbWVyZ2VQcm9wcyhyZXBlYXRJdGVtLCBwcm9wcywgdGhpcywgc3ViVm0pXG4gIG1lcmdlUHJvcHModGVtcGxhdGUuYXR0ciwgcHJvcHMsIHRoaXMsIHN1YlZtKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gX2JpbmRTdWJWbUFmdGVySW5pdGlhbGl6ZWQoc3ViVm0sIHRlbXBsYXRlKSB7XG4gIG1lcmdlQ2xhc3NTdHlsZSh0ZW1wbGF0ZS5jbGFzc0xpc3QsIHRoaXMsIHN1YlZtKVxuICBtZXJnZVN0eWxlKHRlbXBsYXRlLnN0eWxlLCB0aGlzLCBzdWJWbSlcbiAgbWVyZ2VFdmVudCh0ZW1wbGF0ZS5ldmVudHMsIHRoaXMsIHN1YlZtKVxufVxuXG5mdW5jdGlvbiBtZXJnZVByb3BzKHRhcmdldCwgcHJvcHMsIHZtLCBzdWJWbSkge1xuICBpZiAoIXRhcmdldCkge1xuICAgIHJldHVyblxuICB9XG4gIGZvciAoY29uc3Qga2V5IGluIHRhcmdldCkge1xuICAgIGlmICghcHJvcHMgfHwgcHJvcHNba2V5XSkge1xuICAgICAgY29uc3QgdmFsdWUgPSB0YXJnZXRba2V5XVxuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBjb25zdCByZXR1cm5WYWx1ZSA9IHZtLl93YXRjaCh2YWx1ZSwgZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICBzdWJWbVtrZXldID0gdlxuICAgICAgICB9KVxuICAgICAgICBzdWJWbVtrZXldID0gcmV0dXJuVmFsdWVcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBzdWJWbVtrZXldID0gdmFsdWVcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gbWVyZ2VTdHlsZSh0YXJnZXQsIHZtLCBzdWJWbSkge1xuICBmb3IgKGNvbnN0IGtleSBpbiB0YXJnZXQpIHtcbiAgICBjb25zdCB2YWx1ZSA9IHRhcmdldFtrZXldXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc3QgcmV0dXJuVmFsdWUgPSB2bS5fd2F0Y2godmFsdWUsIGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIGlmIChzdWJWbS5fcm9vdEVsKSB7XG4gICAgICAgICAgc3ViVm0uX3Jvb3RFbC5zZXRTdHlsZShrZXksIHYpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICBzdWJWbS5fcm9vdEVsLnNldFN0eWxlKGtleSwgcmV0dXJuVmFsdWUpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgaWYgKHN1YlZtLl9yb290RWwpIHtcbiAgICAgICAgc3ViVm0uX3Jvb3RFbC5zZXRTdHlsZShrZXksIHZhbHVlKVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBtZXJnZUNsYXNzU3R5bGUodGFyZ2V0LCB2bSwgc3ViVm0pIHtcbiAgdmFyIGNzcyA9IHZtLl9vcHRpb25zICYmIHZtLl9vcHRpb25zLnN0eWxlIHx8IHt9XG5cbiAgaWYgKCFzdWJWbS5fcm9vdEVsKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICBpZiAodHlwZW9mIHRhcmdldCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNvbnN0IHZhbHVlID0gdm0uX3dhdGNoKHRhcmdldCwgIHYgPT4ge1xuICAgICAgc2V0Q2xhc3NTdHlsZShzdWJWbS5fcm9vdEVsLCBjc3MsIHYpXG4gICAgfSlcbiAgICBzZXRDbGFzc1N0eWxlKHN1YlZtLl9yb290RWwsIGNzcywgdmFsdWUpXG4gIH0gZWxzZSBpZiAodGFyZ2V0KSB7XG4gICAgc2V0Q2xhc3NTdHlsZShzdWJWbS5fcm9vdEVsLCBjc3MsIHRhcmdldClcbiAgfVxufVxuXG5mdW5jdGlvbiBtZXJnZUV2ZW50KHRhcmdldCwgdm0sIHN1YlZtKSB7XG4gIGlmICh0YXJnZXQgJiYgc3ViVm0uX3Jvb3RFbCkge1xuICAgIGZvciAoY29uc3QgdHlwZSBpbiB0YXJnZXQpIHtcbiAgICAgIGNvbnN0IGhhbmRsZXIgPSB2bVt0YXJnZXRbdHlwZV1dXG4gICAgICBpZiAoaGFuZGxlcikge1xuICAgICAgICBzdWJWbS5fcm9vdEVsLmFkZEV2ZW50KHR5cGUsIGJpbmQoaGFuZGxlciwgdm0pKVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIGJpbmQgaWQgdG8gYW4gZWxlbWVudFxuICogZWFjaCBpZCBpcyB1bmlxdWUgaW4gYSB3aG9sZSB2bVxuICovXG5leHBvcnQgZnVuY3Rpb24gX3NldElkKGlkLCBlbCwgdm0pIHtcbiAgY29uc3QgbWFwID0gT2JqZWN0LmNyZWF0ZShudWxsKVxuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKG1hcCwge1xuICAgIHZtOiB7XG4gICAgICB2YWx1ZTogdm0sXG4gICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlXG4gICAgfSxcbiAgICBlbDoge1xuICAgICAgZ2V0OiAoKSA9PiBlbCB8fCB2bS5fcm9vdEVsLFxuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZVxuICAgIH1cbiAgfSlcblxuICBpZiAodHlwZW9mIGlkID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY29uc3QgaGFuZGxlciA9IGlkXG4gICAgaWQgPSBoYW5kbGVyLmNhbGwodGhpcylcbiAgICBpZiAoaWQpIHtcbiAgICAgIHRoaXMuX2lkc1tpZF0gPSBtYXBcbiAgICB9XG4gICAgdGhpcy5fd2F0Y2goaGFuZGxlciwgKG5ld0lkKSA9PiB7XG4gICAgICBpZiAobmV3SWQpIHtcbiAgICAgICAgdGhpcy5faWRzW25ld0lkXSA9IG1hcFxuICAgICAgfVxuICAgIH0pXG4gIH1cbiAgZWxzZSBpZiAoaWQgJiYgdHlwZW9mIGlkID09PSAnc3RyaW5nJykge1xuICAgIHRoaXMuX2lkc1tpZF0gPSBtYXBcbiAgfVxufVxuXG4vKipcbiAqIGJpbmQgYXR0ciB0byBhbiBlbGVtZW50XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfc2V0QXR0cihlbCwgYXR0cikge1xuICB0aGlzLl9iaW5kRGlyKGVsLCAnYXR0cicsIGF0dHIpXG59XG5cbmZ1bmN0aW9uIHNldENsYXNzU3R5bGUoZWwsIGNzcywgY2xhc3NMaXN0KSB7XG4gIGNvbnN0IGNsYXNzU3R5bGUgPSB7fVxuICBjb25zdCBsZW5ndGggPSBjbGFzc0xpc3QubGVuZ3RoXG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IHN0eWxlID0gY3NzW2NsYXNzTGlzdFtpXV1cbiAgICBpZiAoc3R5bGUpIHtcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIHN0eWxlKSB7XG4gICAgICAgIGNsYXNzU3R5bGVba2V5XSA9IHN0eWxlW2tleV1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgZWwuc2V0Q2xhc3NTdHlsZShjbGFzc1N0eWxlKVxufVxuXG4vKipcbiAqIGJpbmQgY2xhc3NuYW1lcyB0byBhbiBlbGVtZW50XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfc2V0Q2xhc3MoZWwsIGNsYXNzTGlzdCkge1xuXG4gIGlmICh0eXBlb2YgY2xhc3NMaXN0ICE9PSAnZnVuY3Rpb24nICYmICFBcnJheS5pc0FycmF5KGNsYXNzTGlzdCkpIHtcbiAgICByZXR1cm5cbiAgfVxuICBpZiAoQXJyYXkuaXNBcnJheShjbGFzc0xpc3QpICYmICFjbGFzc0xpc3QubGVuZ3RoKSB7XG4gICAgZWwuc2V0Q2xhc3NTdHlsZSh7fSlcbiAgICByZXR1cm5cbiAgfVxuXG4gIGNvbnN0IHN0eWxlID0gdGhpcy5fb3B0aW9ucyAmJiB0aGlzLl9vcHRpb25zLnN0eWxlIHx8IHt9XG4gIGlmICh0eXBlb2YgY2xhc3NMaXN0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLl93YXRjaChjbGFzc0xpc3QsICB2ID0+IHtcbiAgICAgIHNldENsYXNzU3R5bGUoZWwsIHN0eWxlLCB2KVxuICAgIH0pXG4gICAgc2V0Q2xhc3NTdHlsZShlbCwgc3R5bGUsIHZhbHVlKVxuICB9XG4gIGVsc2Uge1xuICAgIHNldENsYXNzU3R5bGUoZWwsIHN0eWxlLCBjbGFzc0xpc3QpXG4gIH1cbn1cblxuLyoqXG4gKiBiaW5kIHN0eWxlIHRvIGFuIGVsZW1lbnRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9zZXRTdHlsZShlbCwgc3R5bGUpIHtcbiAgdGhpcy5fYmluZERpcihlbCwgJ3N0eWxlJywgc3R5bGUpXG59XG5cbi8qKlxuICogYWRkIGFuIGV2ZW50IHR5cGUgYW5kIGhhbmRsZXIgdG8gYW4gZWxlbWVudCBhbmQgZ2VuZXJhdGUgYSBkb20gdXBkYXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfc2V0RXZlbnQoZWwsIHR5cGUsIGhhbmRsZXIpIHtcbiAgZWwuYWRkRXZlbnQodHlwZSwgYmluZChoYW5kbGVyLCB0aGlzKSlcbn1cblxuLyoqXG4gKiBhZGQgYWxsIGV2ZW50cyBvZiBhbiBlbGVtZW50XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfYmluZEV2ZW50cyhlbCwgZXZlbnRzKSB7XG4gIGlmICghZXZlbnRzKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGV2ZW50cylcbiAgbGV0IGkgPSBrZXlzLmxlbmd0aFxuICB3aGlsZSAoaS0tKSB7XG4gICAgY29uc3Qga2V5ID0ga2V5c1tpXVxuICAgIGxldCBoYW5kbGVyID0gZXZlbnRzW2tleV1cbiAgICBpZiAodHlwZW9mIGhhbmRsZXIgPT09ICdzdHJpbmcnKSB7XG4gICAgICBoYW5kbGVyID0gdGhpc1toYW5kbGVyXVxuICAgIH1cbiAgICB0aGlzLl9zZXRFdmVudChlbCwga2V5LCBoYW5kbGVyKVxuICB9XG59XG5cbi8qKlxuICogc2V0IGEgc2VyaWVzIG9mIG1lbWJlcnMgYXMgYSBraW5kIG9mIGFuIGVsZW1lbnRcbiAqIGZvciBleGFtcGxlOiBzdHlsZSwgYXR0ciwgLi4uXG4gKiBpZiB0aGUgdmFsdWUgaXMgYSBmdW5jdGlvbiB0aGVuIGJpbmQgdGhlIGRhdGEgY2hhbmdlc1xuICovXG5leHBvcnQgZnVuY3Rpb24gX2JpbmREaXIoZWwsIG5hbWUsIGRhdGEpIHtcbiAgaWYgKCFkYXRhKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGRhdGEpXG4gIGxldCBpID0ga2V5cy5sZW5ndGhcbiAgd2hpbGUgKGktLSkge1xuICAgIGNvbnN0IGtleSA9IGtleXNbaV1cbiAgICBjb25zdCB2YWx1ZSA9IGRhdGFba2V5XVxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnN0IHVwZGF0ZSA9IHZhbHVlXG4gICAgICB0aGlzLl9iaW5kS2V5KGVsLCBuYW1lLCBrZXksIHVwZGF0ZSlcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBlbFtTRVRURVJTW25hbWVdXShrZXksIHZhbHVlKVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIGJpbmQgZGF0YSBjaGFuZ2VzIHRvIGEgY2VydGFpbiBrZXkgdG8gYSBuYW1lIHNlcmllcyBpbiBhbiBlbGVtZW50XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfYmluZEtleShlbCwgbmFtZSwga2V5LCBjYWxjKSB7XG4gIGNvbnN0IG1ldGhvZE5hbWUgPSBTRVRURVJTW25hbWVdXG4gIGNvbnN0IG9iaiA9IGVsW25hbWVdXG4gIC8vIHdhdGNoIHRoZSBjYWxjLCBhbmQgcmV0dXJucyBhIHZhbHVlIGJ5IGNhbGMuY2FsbCgpXG4gIGNvbnN0IHZhbHVlID0gdGhpcy5fd2F0Y2goY2FsYywgKHZhbHVlKSA9PiB7XG4gICAgZnVuY3Rpb24gaGFuZGxlcigpIHtcbiAgICAgIGVsW21ldGhvZE5hbWVdKGtleSwgdmFsdWUpXG4gICAgfVxuICAgIGNvbnN0IGRpZmZlciA9IHRoaXMgJiYgdGhpcy5fYXBwICYmIHRoaXMuX2FwcC5kaWZmZXJcbiAgICBpZiAoZGlmZmVyKSB7XG4gICAgICBkaWZmZXIuYXBwZW5kKCdlbGVtZW50JywgZWwuZGVwdGgsIGVsLnJlZiwgaGFuZGxlcilcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBoYW5kbGVyKClcbiAgICB9XG4gIH0pXG5cbiAgZWxbbWV0aG9kTmFtZV0oa2V5LCB2YWx1ZSlcbn1cblxuLyoqXG4gKiB3YXRjaCBhIGNhbGMgZnVuY3Rpb24gYW5kIGNhbGxiYWNrIGlmIHRoZSBjYWxjIHZhbHVlIGNoYW5nZXNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF93YXRjaChjYWxjLCBjYWxsYmFjaykge1xuICBjb25zdCB3YXRjaGVyID0gbmV3IFdhdGNoZXIodGhpcywgY2FsYywgZnVuY3Rpb24gKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdvYmplY3QnICYmIHZhbHVlID09PSBvbGRWYWx1ZSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGNhbGxiYWNrKHZhbHVlKVxuICB9KVxuXG4gIHJldHVybiB3YXRjaGVyLnZhbHVlXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2xpYi92bS9kaXJlY3RpdmUuanNcbiAqKi8iLCIvKipcbiAqIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxMy0yMDE1IFl1eGkgRXZhbiBZb3VcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICovXG5cbnZhciBfID0gcmVxdWlyZSgnLi91dGlsJylcbi8vIHZhciBjb25maWcgPSByZXF1aXJlKCcuL2NvbmZpZycpXG52YXIgT2JzZXJ2ZXIgPSByZXF1aXJlKCcuL29ic2VydmVyJylcbi8vIHZhciBleHBQYXJzZXIgPSByZXF1aXJlKCcuL3BhcnNlcnMvZXhwcmVzc2lvbicpXG4vLyB2YXIgYmF0Y2hlciA9IHJlcXVpcmUoJy4vYmF0Y2hlcicpXG52YXIgdWlkID0gMFxuXG4vKipcbiAqIEEgd2F0Y2hlciBwYXJzZXMgYW4gZXhwcmVzc2lvbiwgY29sbGVjdHMgZGVwZW5kZW5jaWVzLFxuICogYW5kIGZpcmVzIGNhbGxiYWNrIHdoZW4gdGhlIGV4cHJlc3Npb24gdmFsdWUgY2hhbmdlcy5cbiAqIFRoaXMgaXMgdXNlZCBmb3IgYm90aCB0aGUgJHdhdGNoKCkgYXBpIGFuZCBkaXJlY3RpdmVzLlxuICpcbiAqIEBwYXJhbSB7VnVlfSB2bVxuICogQHBhcmFtIHtTdHJpbmd9IGV4cHJlc3Npb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNiXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogICAgICAgICAgICAgICAgIC0ge0FycmF5fSBmaWx0ZXJzXG4gKiAgICAgICAgICAgICAgICAgLSB7Qm9vbGVhbn0gdHdvV2F5XG4gKiAgICAgICAgICAgICAgICAgLSB7Qm9vbGVhbn0gZGVlcFxuICogICAgICAgICAgICAgICAgIC0ge0Jvb2xlYW59IHVzZXJcbiAqICAgICAgICAgICAgICAgICAtIHtGdW5jdGlvbn0gW3ByZVByb2Nlc3NdXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuXG4vLyBmdW5jdGlvbiBXYXRjaGVyICh2bSwgZXhwcmVzc2lvbiwgY2IsIG9wdGlvbnMpIHtcbmZ1bmN0aW9uIFdhdGNoZXIgKHZtLCB1cGRhdGUsIGNiKSB7XG4gIHRoaXMudm0gPSB2bVxuICB2bS5fd2F0Y2hlcnMucHVzaCh0aGlzKVxuICAvLyB0aGlzLmV4cHJlc3Npb24gPSBleHByZXNzaW9uXG4gIHRoaXMuY2IgPSBjYlxuICB0aGlzLmlkID0gKyt1aWQgLy8gdWlkIGZvciBiYXRjaGluZ1xuICB0aGlzLmFjdGl2ZSA9IHRydWVcbiAgLy8gb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cbiAgLy8gdGhpcy5kZWVwID0gISFvcHRpb25zLmRlZXBcbiAgLy8gdGhpcy51c2VyID0gISFvcHRpb25zLnVzZXJcbiAgLy8gdGhpcy50d29XYXkgPSAhIW9wdGlvbnMudHdvV2F5XG4gIC8vIHRoaXMuZmlsdGVycyA9IG9wdGlvbnMuZmlsdGVyc1xuICAvLyB0aGlzLnByZVByb2Nlc3MgPSBvcHRpb25zLnByZVByb2Nlc3NcbiAgdGhpcy5kZXBzID0gW11cbiAgdGhpcy5uZXdEZXBzID0gW11cbiAgLy8gcGFyc2UgZXhwcmVzc2lvbiBmb3IgZ2V0dGVyL3NldHRlclxuICAvLyB2YXIgcmVzID0gZXhwUGFyc2VyLnBhcnNlKGV4cHJlc3Npb24sIG9wdGlvbnMudHdvV2F5KVxuICAvLyB0aGlzLmdldHRlciA9IHJlcy5nZXRcbiAgLy8gdGhpcy5zZXR0ZXIgPSByZXMuc2V0XG4gIHRoaXMuZ2V0dGVyID0gdXBkYXRlXG4gIHRoaXMudmFsdWUgPSB0aGlzLmdldCgpXG59XG5cbnZhciBwID0gV2F0Y2hlci5wcm90b3R5cGVcblxuLyoqXG4gKiBBZGQgYSBkZXBlbmRlbmN5IHRvIHRoaXMgZGlyZWN0aXZlLlxuICpcbiAqIEBwYXJhbSB7RGVwfSBkZXBcbiAqL1xuXG5wLmFkZERlcCA9IGZ1bmN0aW9uIChkZXApIHtcbiAgdmFyIG5ld0RlcHMgPSB0aGlzLm5ld0RlcHNcbiAgdmFyIG9sZCA9IHRoaXMuZGVwc1xuICBpZiAoXy5pbmRleE9mKG5ld0RlcHMsIGRlcCkgPCAwKSB7XG4gICAgbmV3RGVwcy5wdXNoKGRlcClcbiAgICB2YXIgaSA9IF8uaW5kZXhPZihvbGQsIGRlcClcbiAgICBpZiAoaSA8IDApIHtcbiAgICAgIGRlcC5hZGRTdWIodGhpcylcbiAgICB9IGVsc2Uge1xuICAgICAgb2xkW2ldID0gbnVsbFxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEV2YWx1YXRlIHRoZSBnZXR0ZXIsIGFuZCByZS1jb2xsZWN0IGRlcGVuZGVuY2llcy5cbiAqL1xuXG5wLmdldCA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5iZWZvcmVHZXQoKVxuICB2YXIgdm0gPSB0aGlzLnZtXG4gIHZhciB2YWx1ZVxuICB0cnkge1xuICAgIHZhbHVlID0gdGhpcy5nZXR0ZXIuY2FsbCh2bSwgdm0pXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICAvLyBpZiAoY29uZmlnLndhcm5FeHByZXNzaW9uRXJyb3JzKSB7XG4gICAgLy8gICBfLndhcm4oXG4gICAgLy8gICAgICdFcnJvciB3aGVuIGV2YWx1YXRpbmcgZXhwcmVzc2lvbiBcIicgK1xuICAgIC8vICAgICB0aGlzLmV4cHJlc3Npb24gKyAnXCI6XFxuICAgJyArIGVcbiAgICAvLyAgIClcbiAgICAvLyB9XG4gICAgXy53YXJuKCdFcnJvciB3aGVuIHVwZGF0ZVwiJylcbiAgfVxuICAvLyBcInRvdWNoXCIgZXZlcnkgcHJvcGVydHkgc28gdGhleSBhcmUgYWxsIHRyYWNrZWQgYXNcbiAgLy8gZGVwZW5kZW5jaWVzIGZvciBkZWVwIHdhdGNoaW5nXG4gIGlmICh0aGlzLmRlZXApIHtcbiAgICB0cmF2ZXJzZSh2YWx1ZSlcbiAgfVxuICBpZiAodGhpcy5wcmVQcm9jZXNzKSB7XG4gICAgdmFsdWUgPSB0aGlzLnByZVByb2Nlc3ModmFsdWUpXG4gIH1cbiAgaWYgKHRoaXMuZmlsdGVycykge1xuICAgIHZhbHVlID0gdm0uX2FwcGx5RmlsdGVycyh2YWx1ZSwgbnVsbCwgdGhpcy5maWx0ZXJzLCBmYWxzZSlcbiAgfVxuICB0aGlzLmFmdGVyR2V0KClcbiAgcmV0dXJuIHZhbHVlXG59XG5cbi8vIC8qKlxuLy8gICogU2V0IHRoZSBjb3JyZXNwb25kaW5nIHZhbHVlIHdpdGggdGhlIHNldHRlci5cbi8vICAqXG4vLyAgKiBAcGFyYW0geyp9IHZhbHVlXG4vLyAgKi9cblxuLy8gcC5zZXQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbi8vICAgdmFyIHZtID0gdGhpcy52bVxuLy8gICBpZiAodGhpcy5maWx0ZXJzKSB7XG4vLyAgICAgdmFsdWUgPSB2bS5fYXBwbHlGaWx0ZXJzKFxuLy8gICAgICAgdmFsdWUsIHRoaXMudmFsdWUsIHRoaXMuZmlsdGVycywgdHJ1ZSlcbi8vICAgfVxuLy8gICB0cnkge1xuLy8gICAgIHRoaXMuc2V0dGVyLmNhbGwodm0sIHZtLCB2YWx1ZSlcbi8vICAgfSBjYXRjaCAoZSkge1xuLy8gICAgIC8vIGlmIChjb25maWcud2FybkV4cHJlc3Npb25FcnJvcnMpIHtcbi8vICAgICAgIF8ud2Fybihcbi8vICAgICAgICAgJ0Vycm9yIHdoZW4gZXZhbHVhdGluZyBzZXR0ZXIgXCInICtcbi8vICAgICAgICAgdGhpcy5leHByZXNzaW9uICsgJ1wiOlxcbiAgICcgKyBlXG4vLyAgICAgICApXG4vLyAgICAgLy8gfVxuLy8gICB9XG4vLyB9XG5cbi8qKlxuICogUHJlcGFyZSBmb3IgZGVwZW5kZW5jeSBjb2xsZWN0aW9uLlxuICovXG5cbnAuYmVmb3JlR2V0ID0gZnVuY3Rpb24gKCkge1xuICBPYnNlcnZlci50YXJnZXQgPSB0aGlzXG59XG5cbi8qKlxuICogQ2xlYW4gdXAgZm9yIGRlcGVuZGVuY3kgY29sbGVjdGlvbi5cbiAqL1xuXG5wLmFmdGVyR2V0ID0gZnVuY3Rpb24gKCkge1xuICBPYnNlcnZlci50YXJnZXQgPSBudWxsXG4gIHZhciBpID0gdGhpcy5kZXBzLmxlbmd0aFxuICB3aGlsZSAoaS0tKSB7XG4gICAgdmFyIGRlcCA9IHRoaXMuZGVwc1tpXVxuICAgIGlmIChkZXApIHtcbiAgICAgIGRlcC5yZW1vdmVTdWIodGhpcylcbiAgICB9XG4gIH1cbiAgdGhpcy5kZXBzID0gdGhpcy5uZXdEZXBzXG4gIHRoaXMubmV3RGVwcyA9IFtdXG59XG5cbi8qKlxuICogU3Vic2NyaWJlciBpbnRlcmZhY2UuXG4gKiBXaWxsIGJlIGNhbGxlZCB3aGVuIGEgZGVwZW5kZW5jeSBjaGFuZ2VzLlxuICovXG5cbi8vIHAudXBkYXRlID0gZnVuY3Rpb24gKCkge1xuLy8gICBpZiAoIWNvbmZpZy5hc3luYyB8fCBjb25maWcuZGVidWcpIHtcbi8vICAgICB0aGlzLnJ1bigpXG4vLyAgIH0gZWxzZSB7XG4vLyAgICAgYmF0Y2hlci5wdXNoKHRoaXMpXG4vLyAgIH1cbi8vIH1cblxuLy8gLyoqXG4vLyAgKiBCYXRjaGVyIGpvYiBpbnRlcmZhY2UuXG4vLyAgKiBXaWxsIGJlIGNhbGxlZCBieSB0aGUgYmF0Y2hlci5cbi8vICAqL1xuXG4vLyBwLnJ1biA9IGZ1bmN0aW9uICgpIHtcbnAudXBkYXRlID0gZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy5hY3RpdmUpIHtcbiAgICB2YXIgdmFsdWUgPSB0aGlzLmdldCgpXG4gICAgaWYgKFxuICAgICAgdmFsdWUgIT09IHRoaXMudmFsdWUgfHxcbiAgICAgIEFycmF5LmlzQXJyYXkodmFsdWUpIHx8XG4gICAgICB0aGlzLmRlZXBcbiAgICApIHtcbiAgICAgIHZhciBvbGRWYWx1ZSA9IHRoaXMudmFsdWVcbiAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZVxuICAgICAgdGhpcy5jYih2YWx1ZSwgb2xkVmFsdWUpXG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogUmVtb3ZlIHNlbGYgZnJvbSBhbGwgZGVwZW5kZW5jaWVzJyBzdWJjcmliZXIgbGlzdC5cbiAqL1xuXG5wLnRlYXJkb3duID0gZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy5hY3RpdmUpIHtcbiAgICAvLyByZW1vdmUgc2VsZiBmcm9tIHZtJ3Mgd2F0Y2hlciBsaXN0XG4gICAgLy8gd2UgY2FuIHNraXAgdGhpcyBpZiB0aGUgdm0gaWYgYmVpbmcgZGVzdHJveWVkXG4gICAgLy8gd2hpY2ggY2FuIGltcHJvdmUgdGVhcmRvd24gcGVyZm9ybWFuY2UuXG4gICAgaWYgKCF0aGlzLnZtLl9pc0JlaW5nRGVzdHJveWVkKSB7XG4gICAgICB0aGlzLnZtLl93YXRjaGVycy4kcmVtb3ZlKHRoaXMpXG4gICAgfVxuICAgIHZhciBpID0gdGhpcy5kZXBzLmxlbmd0aFxuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIHRoaXMuZGVwc1tpXS5yZW1vdmVTdWIodGhpcylcbiAgICB9XG4gICAgdGhpcy5hY3RpdmUgPSBmYWxzZVxuICAgIHRoaXMudm0gPSB0aGlzLmNiID0gdGhpcy52YWx1ZSA9IG51bGxcbiAgfVxufVxuXG5cbi8qKlxuICogUmVjcnVzaXZlbHkgdHJhdmVyc2UgYW4gb2JqZWN0IHRvIGV2b2tlIGFsbCBjb252ZXJ0ZWRcbiAqIGdldHRlcnMsIHNvIHRoYXQgZXZlcnkgbmVzdGVkIHByb3BlcnR5IGluc2lkZSB0aGUgb2JqZWN0XG4gKiBpcyBjb2xsZWN0ZWQgYXMgYSBcImRlZXBcIiBkZXBlbmRlbmN5LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqL1xuXG5mdW5jdGlvbiB0cmF2ZXJzZSAob2JqKSB7XG4gIHZhciBrZXksIHZhbCwgaVxuICBmb3IgKGtleSBpbiBvYmopIHtcbiAgICB2YWwgPSBvYmpba2V5XVxuICAgIGlmIChfLmlzQXJyYXkodmFsKSkge1xuICAgICAgaSA9IHZhbC5sZW5ndGhcbiAgICAgIHdoaWxlIChpLS0pIHt0cmF2ZXJzZSh2YWxbaV0pfVxuICAgIH0gZWxzZSBpZiAoXy5pc09iamVjdCh2YWwpKSB7XG4gICAgICB0cmF2ZXJzZSh2YWwpXG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gV2F0Y2hlclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9saWIvdm0vd2F0Y2hlci5qc1xuICoqLyIsIi8qKlxuICogQGZpbGVPdmVydmlldyBEb2N1bWVudCAmIEVsZW1lbnQgSGVscGVycy5cbiAqXG4gKiByZXF1aXJlZDpcbiAqIERvY3VtZW50IzogY3JlYXRlRWxlbWVudCwgY3JlYXRlQ29tbWVudCwgZ2V0UmVmXG4gKiBFbGVtZW50IzogYXBwZW5kQ2hpbGQsIGluc2VydEJlZm9yZSwgcmVtb3ZlQ2hpbGQsIG5leHRTaWJsaW5nXG4gKi9cblxuLyoqXG4gKiBDcmVhdGUgYSBib2R5IGJ5IHR5cGVcbiAqIFVzaW5nIHRoaXMuX2FwcC5kb2NcbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHR5cGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9jcmVhdGVCb2R5KHR5cGUpIHtcbiAgY29uc3QgZG9jID0gdGhpcy5fYXBwLmRvY1xuICByZXR1cm4gZG9jLmNyZWF0ZUJvZHkodHlwZSlcbn1cblxuLyoqXG4gKiBDcmVhdGUgYW4gZWxlbWVudCBieSB0eXBlXG4gKiBVc2luZyB0aGlzLl9hcHAuZG9jXG4gKlxuICogQHBhcmFtICB7c3RyaW5nfSB0eXBlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfY3JlYXRlRWxlbWVudCh0eXBlKSB7XG4gIGNvbnN0IGRvYyA9IHRoaXMuX2FwcC5kb2NcbiAgcmV0dXJuIGRvYy5jcmVhdGVFbGVtZW50KHR5cGUpXG59XG5cbi8qKlxuICogQ3JlYXRlIGFuZCByZXR1cm4gYSBmcmFnIGJsb2NrIGZvciBhbiBlbGVtZW50LlxuICogVGhlIGZyYWcgYmxvY2sgaGFzIGEgc3RhcnRlciwgZW5kZXIgYW5kIHRoZSBlbGVtZW50IGl0c2VsZi5cbiAqXG4gKiBAcGFyYW0gIHtvYmplY3R9IGVsZW1lbnRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9jcmVhdGVCbG9jayhlbGVtZW50KSB7XG4gIGNvbnN0IHN0YXJ0ID0gdGhpcy5fY3JlYXRlQmxvY2tTdGFydCgpXG4gIGNvbnN0IGVuZCA9IHRoaXMuX2NyZWF0ZUJsb2NrRW5kKClcbiAgY29uc3QgYmxvY2tJZCA9IGxhc3Rlc3RCbG9ja0lkKytcbiAgaWYgKGVsZW1lbnQuZWxlbWVudCkge1xuICAgIGVsZW1lbnQuZWxlbWVudC5pbnNlcnRCZWZvcmUoc3RhcnQsIGVsZW1lbnQuZW5kKVxuICAgIGVsZW1lbnQuZWxlbWVudC5pbnNlcnRCZWZvcmUoZW5kLCBlbGVtZW50LmVuZClcbiAgICBlbGVtZW50ID0gZWxlbWVudC5lbGVtZW50XG4gIH1cbiAgZWxzZSB7XG4gICAgZWxlbWVudC5hcHBlbmRDaGlsZChzdGFydClcbiAgICBlbGVtZW50LmFwcGVuZENoaWxkKGVuZClcbiAgfVxuICByZXR1cm4ge3N0YXJ0LCBlbmQsIGVsZW1lbnQsIGJsb2NrSWR9XG59XG5cbmxldCBsYXN0ZXN0QmxvY2tJZCA9IDFcblxuLyoqXG4gKiBDcmVhdGUgYW5kIHJldHVybiBhIGJsb2NrIHN0YXJ0ZXIuXG4gKiBVc2luZyB0aGlzLl9hcHAuZG9jXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfY3JlYXRlQmxvY2tTdGFydCgpIHtcbiAgY29uc3QgZG9jID0gdGhpcy5fYXBwLmRvY1xuICBjb25zdCBhbmNob3IgPSBkb2MuY3JlYXRlQ29tbWVudCgnc3RhcnQnKVxuICByZXR1cm4gYW5jaG9yXG59XG5cbi8qKlxuICogQ3JlYXRlIGFuZCByZXR1cm4gYSBibG9jayBlbmRlci5cbiAqIFVzaW5nIHRoaXMuX2FwcC5kb2NcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9jcmVhdGVCbG9ja0VuZCgpIHtcbiAgY29uc3QgZG9jID0gdGhpcy5fYXBwLmRvY1xuICBjb25zdCBhbmNob3IgPSBkb2MuY3JlYXRlQ29tbWVudCgnZW5kJylcbiAgcmV0dXJuIGFuY2hvclxufVxuXG4vKipcbiAqIEF0dGFjaCB0YXJnZXQgdG8gYSBjZXJ0YWluIGRlc3QgdXNpbmcgYXBwZW5kQ2hpbGQgYnkgZGVmYXVsdC5cbiAqIElmIHRoZSBkZXN0IGlzIGEgZnJhZyBibG9jayB0aGVuIGluc2VydCBiZWZvcmUgdGhlIGVuZGVyLlxuICogSWYgdGhlIHRhcmdldCBpcyBhIGZyYWcgYmxvY2sgdGhlbiBhdHRhY2ggdGhlIHN0YXJ0ZXIgYW5kIGVuZGVyIGluIG9yZGVyLlxuICpcbiAqIEBwYXJhbSAge29iamVjdH0gdGFyZ2V0XG4gKiBAcGFyYW0gIHtvYmplY3R9IGRlc3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9hdHRhY2hUYXJnZXQodGFyZ2V0LCBkZXN0KSB7XG5cbiAgaWYgKGRlc3QuZWxlbWVudCkge1xuICAgIGNvbnN0IGJlZm9yZSA9IGRlc3QuZW5kXG4gICAgY29uc3QgYWZ0ZXIgPSBkZXN0LnVwZGF0ZU1hcmtcbiAgICAvLyBwdXNoIG5ldyB0YXJnZXQgZm9yIHdhdGNoIGxpc3QgdXBkYXRlIGxhdGVyXG4gICAgaWYgKGRlc3QuY2hpbGRyZW4pIHtcbiAgICAgIGRlc3QuY2hpbGRyZW4ucHVzaCh0YXJnZXQpXG4gICAgfVxuICAgIC8vIGZvciBjaGVjayByZXBlYXQgY2FzZVxuICAgIGlmIChhZnRlcikge1xuICAgICAgdGhpcy5fbW92ZVRhcmdldCh0YXJnZXQsIGFmdGVyKVxuICAgICAgZGVzdC51cGRhdGVNYXJrID0gdGFyZ2V0LmVsZW1lbnQgPyB0YXJnZXQuZW5kIDogdGFyZ2V0XG4gICAgfVxuICAgIGVsc2UgaWYgKHRhcmdldC5lbGVtZW50KSB7XG4gICAgICBkZXN0LmVsZW1lbnQuaW5zZXJ0QmVmb3JlKHRhcmdldC5zdGFydCwgYmVmb3JlKVxuICAgICAgZGVzdC5lbGVtZW50Lmluc2VydEJlZm9yZSh0YXJnZXQuZW5kLCBiZWZvcmUpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgZGVzdC5lbGVtZW50Lmluc2VydEJlZm9yZSh0YXJnZXQsIGJlZm9yZSlcbiAgICB9XG4gIH1cbiAgZWxzZSB7XG4gICAgaWYgKHRhcmdldC5lbGVtZW50KSB7XG4gICAgICBkZXN0LmFwcGVuZENoaWxkKHRhcmdldC5zdGFydClcbiAgICAgIGRlc3QuYXBwZW5kQ2hpbGQodGFyZ2V0LmVuZClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBkZXN0LmFwcGVuZENoaWxkKHRhcmdldClcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBNb3ZlIHRhcmdldCBiZWZvcmUgYSBjZXJ0YWluIGVsZW1lbnQuIFRoZSB0YXJnZXQgbWF5YmUgYmxvY2sgb3IgZWxlbWVudC5cbiAqXG4gKiBAcGFyYW0gIHtvYmplY3R9IHRhcmdldFxuICogQHBhcmFtICB7b2JqZWN0fSBiZWZvcmVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9tb3ZlVGFyZ2V0KHRhcmdldCwgYWZ0ZXIpIHtcbiAgaWYgKHRhcmdldC5lbGVtZW50KSB7XG4gICAgdGhpcy5fbW92ZUJsb2NrKHRhcmdldCwgYWZ0ZXIpXG4gIH1cbiAgZWxzZSB7XG4gICAgdGhpcy5fbW92ZUVsZW1lbnQodGFyZ2V0LCBhZnRlcilcbiAgfVxufVxuXG4vKipcbiAqIE1vdmUgZWxlbWVudCBiZWZvcmUgYSBjZXJ0YWluIGVsZW1lbnQuXG4gKlxuICogQHBhcmFtICB7b2JqZWN0fSBlbGVtZW50XG4gKiBAcGFyYW0gIHtvYmplY3R9IGJlZm9yZVxuICovXG5leHBvcnQgZnVuY3Rpb24gX21vdmVFbGVtZW50KGVsZW1lbnQsIGFmdGVyKSB7XG4gIGNvbnN0IGRvYyA9IHRoaXMuX2FwcC5kb2NcbiAgY29uc3QgcGFyZW50ID0gZG9jLmdldFJlZihhZnRlci5wYXJlbnRSZWYpXG5cbiAgaWYgKHBhcmVudCkge1xuICAgIHBhcmVudC5pbnNlcnRBZnRlcihlbGVtZW50LCBhZnRlcilcbiAgfVxufVxuXG4vKipcbiAqIE1vdmUgYWxsIGVsZW1lbnRzIG9mIHRoZSBibG9jayBiZWZvcmUgYSBjZXJ0YWluIGVsZW1lbnQuXG4gKlxuICogQHBhcmFtICB7b2JqZWN0fSBmcmFnQmxvY2tcbiAqIEBwYXJhbSAge29iamVjdH0gYmVmb3JlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfbW92ZUJsb2NrKGZyYWdCbG9jaywgYWZ0ZXIpIHtcbiAgY29uc3QgZG9jID0gdGhpcy5fYXBwLmRvY1xuICBjb25zdCBwYXJlbnQgPSBkb2MuZ2V0UmVmKGFmdGVyLnBhcmVudFJlZilcblxuICBpZiAocGFyZW50KSB7XG4gICAgbGV0IGVsID0gZnJhZ0Jsb2NrLnN0YXJ0XG4gICAgY29uc3QgZ3JvdXAgPSBbZWxdXG5cbiAgICB3aGlsZSAoZWwgJiYgZWwgIT09IGZyYWdCbG9jay5lbmQpIHtcbiAgICAgIGVsID0gZWwubmV4dCgpXG4gICAgICBncm91cC5wdXNoKGVsKVxuICAgIH1cblxuICAgIGxldCB0ZW1wID0gYWZ0ZXJcbiAgICBncm91cC5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgcGFyZW50Lmluc2VydEFmdGVyKGVsLCB0ZW1wKVxuICAgICAgdGVtcCA9IGVsXG4gICAgfSlcbiAgfVxufVxuXG4vKipcbiAqIFJlbW92ZSB0YXJnZXQgZnJvbSBET00gdHJlZS5cbiAqIElmIHRoZSB0YXJnZXQgaXMgYSBmcmFnIGJsb2NrIHRoZW4gY2FsbCBfcmVtb3ZlQmxvY2tcbiAqXG4gKiBAcGFyYW0gIHtvYmplY3R9IHRhcmdldFxuICovXG5leHBvcnQgZnVuY3Rpb24gX3JlbW92ZVRhcmdldCh0YXJnZXQpIHtcblxuICBpZiAodGFyZ2V0LmVsZW1lbnQpIHtcbiAgICB0aGlzLl9yZW1vdmVCbG9jayh0YXJnZXQpXG4gIH1cbiAgZWxzZSB7XG4gICAgdGhpcy5fcmVtb3ZlRWxlbWVudCh0YXJnZXQpXG4gIH1cbn1cblxuLyoqXG4gKiBSZW1vdmUgYSBjZXJ0YWluIGVsZW1lbnQuXG4gKiBVc2luZyB0aGlzLl9hcHAuZG9jXG4gKlxuICogQHBhcmFtICB7b2JqZWN0fSB0YXJnZXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9yZW1vdmVFbGVtZW50KHRhcmdldCkge1xuICBjb25zdCBkb2MgPSB0aGlzLl9hcHAuZG9jXG4gIGNvbnN0IHBhcmVudCA9IGRvYy5nZXRSZWYodGFyZ2V0LnBhcmVudFJlZilcblxuICBpZiAocGFyZW50KSB7XG4gICAgcGFyZW50LnJlbW92ZUNoaWxkKHRhcmdldClcbiAgfVxufVxuXG4vKipcbiAqIFJlbW92ZSBhIGZyYWcgYmxvY2suXG4gKiBUaGUgc2Vjb25kIHBhcmFtIGRlY2lkZXMgd2hldGhlciB0aGUgYmxvY2sgc2VsZiBzaG91bGQgYmUgcmVtb3ZlZCB0b28uXG4gKlxuICogQHBhcmFtICB7b2JqZWN0fSAgZnJhZ0Jsb2NrXG4gKiBAcGFyYW0gIHtCb29sZWFufSBwcmVzZXJ2ZUJsb2NrPWZhbHNlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfcmVtb3ZlQmxvY2soZnJhZ0Jsb2NrLCBwcmVzZXJ2ZUJsb2NrID0gZmFsc2UpIHtcbiAgY29uc3QgcmVzdWx0ID0gW11cbiAgbGV0IGVsID0gZnJhZ0Jsb2NrLnN0YXJ0Lm5leHQoKVxuXG4gIHdoaWxlIChlbCAmJiBlbCAhPT0gZnJhZ0Jsb2NrLmVuZCkge1xuICAgIHJlc3VsdC5wdXNoKGVsKVxuICAgIGVsID0gZWwubmV4dCgpXG4gIH1cblxuICBpZiAoIXByZXNlcnZlQmxvY2spIHtcbiAgICB0aGlzLl9yZW1vdmVFbGVtZW50KGZyYWdCbG9jay5zdGFydClcbiAgfVxuICByZXN1bHQuZm9yRWFjaCgoZWwpID0+IHtcbiAgICB0aGlzLl9yZW1vdmVFbGVtZW50KGVsKVxuICB9KVxuICBpZiAoIXByZXNlcnZlQmxvY2spIHtcbiAgICB0aGlzLl9yZW1vdmVFbGVtZW50KGZyYWdCbG9jay5lbmQpXG4gIH1cbn1cblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9saWIvdm0vZG9tLWhlbHBlci5qc1xuICoqLyIsImZ1bmN0aW9uIEV2dCh0eXBlLCBkZXRhaWwpIHtcbiAgaWYgKGRldGFpbCBpbnN0YW5jZW9mIEV2dCkge1xuICAgIHJldHVybiBkZXRhaWxcbiAgfVxuXG4gIHRoaXMudGltZXN0YW1wID0gRGF0ZS5ub3coKVxuICB0aGlzLmRldGFpbCA9IGRldGFpbFxuICB0aGlzLnR5cGUgPSB0eXBlXG5cbiAgbGV0IHNob3VsZFN0b3AgPSBmYWxzZVxuICB0aGlzLnN0b3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgc2hvdWxkU3RvcCA9IHRydWVcbiAgfVxuICB0aGlzLmhhc1N0b3BwZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHNob3VsZFN0b3BcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gJGVtaXQodHlwZSwgZGV0YWlsKSB7XG4gIGNvbnN0IGV2ZW50cyA9IHRoaXMuX3ZtRXZlbnRzXG4gIGNvbnN0IGhhbmRsZXJMaXN0ID0gZXZlbnRzW3R5cGVdXG4gIGlmIChoYW5kbGVyTGlzdCkge1xuICAgIGxldCBldnQgPSBuZXcgRXZ0KHR5cGUsIGRldGFpbClcbiAgICBoYW5kbGVyTGlzdC5mb3JFYWNoKChoYW5kbGVyKSA9PiB7XG4gICAgICBoYW5kbGVyLmNhbGwodGhpcywgZXZ0KVxuICAgIH0pXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uICRkaXNwYXRjaCh0eXBlLCBkZXRhaWwpIHtcbiAgY29uc3QgZXZ0ID0gbmV3IEV2dCh0eXBlLCBkZXRhaWwpXG4gIHRoaXMuJGVtaXQodHlwZSwgZXZ0KVxuXG4gIGlmICghZXZ0Lmhhc1N0b3BwZWQoKSAmJiB0aGlzLl9wYXJlbnQgJiYgdGhpcy5fcGFyZW50LiRkaXNwYXRjaCkge1xuICAgIHRoaXMuX3BhcmVudC4kZGlzcGF0Y2godHlwZSwgZXZ0KVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiAkYnJvYWRjYXN0KHR5cGUsIGRldGFpbCkge1xuICBjb25zdCBldnQgPSBuZXcgRXZ0KHR5cGUsIGRldGFpbClcbiAgdGhpcy4kZW1pdCh0eXBlLCBldnQpXG5cbiAgaWYgKCFldnQuaGFzU3RvcHBlZCgpICYmIHRoaXMuX2NoaWxkcmVuVm1zKSB7XG4gICAgdGhpcy5fY2hpbGRyZW5WbXMuZm9yRWFjaCgoc3ViVm0pID0+IHtcbiAgICAgIHN1YlZtLiRicm9hZGNhc3QodHlwZSwgZXZ0KVxuICAgIH0pXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uICRvbih0eXBlLCBoYW5kbGVyKSB7XG4gIGlmICghdHlwZSB8fCB0eXBlb2YgaGFuZGxlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVyblxuICB9XG4gIGNvbnN0IGV2ZW50cyA9IHRoaXMuX3ZtRXZlbnRzXG4gIGNvbnN0IGhhbmRsZXJMaXN0ID0gZXZlbnRzW3R5cGVdIHx8IFtdXG4gIGhhbmRsZXJMaXN0LnB1c2goaGFuZGxlcilcbiAgZXZlbnRzW3R5cGVdID0gaGFuZGxlckxpc3RcblxuICAvLyBmaXhlZCBvbGQgdmVyc2lvbiBsaWZlY3ljbGUgZGVzaWduXG4gIGlmICh0eXBlID09PSAnaG9vazpyZWFkeScgJiYgdGhpcy5fcmVhZHkpIHtcbiAgICB0aGlzLiRlbWl0KCdob29rOnJlYWR5JylcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gJG9mZih0eXBlLCBoYW5kbGVyKSB7XG4gIGlmICghdHlwZSkge1xuICAgIHJldHVyblxuICB9XG4gIGNvbnN0IGV2ZW50cyA9IHRoaXMuX3ZtRXZlbnRzXG4gIGlmICghaGFuZGxlcikge1xuICAgIGRlbGV0ZSBldmVudHNbdHlwZV1cbiAgICByZXR1cm5cbiAgfVxuICBjb25zdCBoYW5kbGVyTGlzdCA9IGV2ZW50c1t0eXBlXVxuICBpZiAoIWhhbmRsZXJMaXN0KSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgaGFuZGxlckxpc3QuJHJlbW92ZShoYW5kbGVyKVxufVxuXG5jb25zdCBMSUZFX0NZQ0xFX1RZUEVTID0gWydpbml0JywgJ2NyZWF0ZWQnLCAncmVhZHknXVxuXG5leHBvcnQgZnVuY3Rpb24gX2luaXRFdmVudHMoZXh0ZXJuYWxFdmVudHMpIHtcbiAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuX29wdGlvbnMgfHwge31cbiAgY29uc3QgZXZlbnRzID0gb3B0aW9ucy5ldmVudHMgfHwge31cbiAgZm9yIChjb25zdCB0eXBlMSBpbiBldmVudHMpIHtcbiAgICB0aGlzLiRvbih0eXBlMSwgZXZlbnRzW3R5cGUxXSlcbiAgfVxuICBmb3IgKGNvbnN0IHR5cGUyIGluIGV4dGVybmFsRXZlbnRzKSB7XG4gICAgdGhpcy4kb24odHlwZTIsIGV4dGVybmFsRXZlbnRzW3R5cGUyXSlcbiAgfVxuICBMSUZFX0NZQ0xFX1RZUEVTLmZvckVhY2goKHR5cGUpID0+IHtcbiAgICB0aGlzLiRvbihgaG9vazoke3R5cGV9YCwgb3B0aW9uc1t0eXBlXSlcbiAgfSlcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vbGliL3ZtL2V2ZW50cy5qc1xuICoqLyIsImxldCBuYXRpdmVNb2R1bGVzID0ge31cblxuZnVuY3Rpb24gYXNzaWduTW9kdWxlcyhtb2R1bGVzLCBpZlJlcGxhY2UpIHtcblxuICBmb3IgKGNvbnN0IG1vZHVsZU5hbWUgaW4gbW9kdWxlcykge1xuXG4gICAgLy8gaW5pdCBgbW9kdWxlc1ttb2R1bGVOYW1lXVtdYFxuICAgIGxldCBtZXRob2RzID0gbmF0aXZlTW9kdWxlc1ttb2R1bGVOYW1lXVxuICAgIGlmICghbWV0aG9kcykge1xuICAgICAgbWV0aG9kcyA9IHt9XG4gICAgICBuYXRpdmVNb2R1bGVzW21vZHVsZU5hbWVdID0gbWV0aG9kc1xuICAgIH1cblxuICAgIC8vIHB1c2ggZWFjaCBub24tZXhpc3RlZCBuZXcgbWV0aG9kXG4gICAgbW9kdWxlc1ttb2R1bGVOYW1lXS5mb3JFYWNoKGZ1bmN0aW9uIChtZXRob2QpIHtcbiAgICAgIGlmICh0eXBlb2YgbWV0aG9kID09PSAnc3RyaW5nJykge1xuICAgICAgICBtZXRob2QgPSB7XG4gICAgICAgICAgbmFtZTogbWV0aG9kXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCFtZXRob2RzW21ldGhvZC5uYW1lXSB8fCBpZlJlcGxhY2UpIHtcbiAgICAgICAgbWV0aG9kc1ttZXRob2QubmFtZV0gPSBtZXRob2RcbiAgICAgIH1cbiAgICB9KVxuICB9XG59XG5cbmZ1bmN0aW9uIGFzc2lnbkFwaXMoQ3RvciwgYXBpcykge1xuICBjb25zdCBwID0gQ3Rvci5wcm90b3R5cGVcblxuICBmb3IgKGNvbnN0IGFwaU5hbWUgaW4gYXBpcykge1xuICAgIGlmICghcC5oYXNPd25Qcm9wZXJ0eShhcGlOYW1lKSkge1xuICAgICAgcFthcGlOYW1lXSA9IGFwaXNbYXBpTmFtZV1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyTW9kdWxlcygpIHtcbiAgbmF0aXZlTW9kdWxlcyA9IHt9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRNb2R1bGUobW9kdWxlTmFtZSkge1xuICByZXR1cm4gbmF0aXZlTW9kdWxlc1ttb2R1bGVOYW1lXVxufVxuXG4vKipcbiAqIEBjb250ZXh0IGEgaW5zdGFuY2Ugb2YgQXBwSW5zdGFuY2VcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlcXVpcmVNb2R1bGUobW9kdWxlTmFtZSkge1xuICBjb25zdCBtZXRob2RzID0gbmF0aXZlTW9kdWxlc1ttb2R1bGVOYW1lXVxuICBjb25zdCB0YXJnZXQgPSB7fVxuXG4gIGZvciAoY29uc3QgbWV0aG9kTmFtZSBpbiBtZXRob2RzKSB7XG4gICAgdGFyZ2V0W21ldGhvZE5hbWVdID0gKC4uLmFyZ3MpID0+IHRoaXMuY2FsbFRhc2tzKHtcbiAgICAgIG1vZHVsZTogbW9kdWxlTmFtZSxcbiAgICAgIG1ldGhvZDogbWV0aG9kTmFtZSxcbiAgICAgIGFyZ3M6IGFyZ3NcbiAgICB9KVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldFxufVxuXG4vKipcbiAqIEBjb250ZXh0IFZtXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3Rlck1vZHVsZXMobW9kdWxlcywgaWZSZXBsYWNlKSB7XG4gIGFzc2lnbk1vZHVsZXMobW9kdWxlcywgaWZSZXBsYWNlKVxufVxuXG4vKipcbiAqIEBjb250ZXh0IFZtXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3Rlck1ldGhvZHMoYXBpcykge1xuICBhc3NpZ25BcGlzKHRoaXMsIGFwaXMpXG59XG5cbi8qKlxuICogQGNvbnRleHQgYSBpbnN0YW5jZSBvZiBBcHBJbnN0YW5jZVxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVxdWlyZUNvbXBvbmVudChuYW1lKSB7XG4gIGNvbnN0IHtjdXN0b21Db21wb25lbnRNYXB9ID0gdGhpc1xuICByZXR1cm4gY3VzdG9tQ29tcG9uZW50TWFwW25hbWVdXG59XG5cbi8qKlxuICogQGNvbnRleHQgYSBpbnN0YW5jZSBvZiBBcHBJbnN0YW5jZVxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJDb21wb25lbnQobmFtZSwgZXhwb3J0cykge1xuICBjb25zdCB7Y3VzdG9tQ29tcG9uZW50TWFwfSA9IHRoaXNcblxuICBpZiAoY3VzdG9tQ29tcG9uZW50TWFwW25hbWVdKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBkZWZpbmUgYSBjb21wb25lbnQoJHtuYW1lfSkgdGhhdCBhbHJlYWR5IGV4aXN0c2ApXG4gIH1cblxuICBjdXN0b21Db21wb25lbnRNYXBbbmFtZV0gPSBleHBvcnRzXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9saWIvYXBwL3JlZ2lzdGVyLmpzXG4gKiovIiwiaW1wb3J0IHNlbXZlciBmcm9tICdzZW12ZXInXG5pbXBvcnQge2V4dGVuZCwgaXNQbGFpbk9iamVjdCwgdHlwb2Z9ICBmcm9tICcuLi91dGlsJ1xuXG4vKipcbiAqIFtub3JtYWxpemVWZXJzaW9uIGRlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7U3RyaW5nfSBWZXJzaW9uLiBpZTogMSwgMS4wLCAxLjAuMFxuICogQHJldHVybiB7U3RyaW5nfSBWZXJzaW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVWZXJzaW9uICh2KSB7XG4gIGNvbnN0IGlzVmFsaWQgPSBzZW12ZXIudmFsaWQodikgPyB0cnVlIDogZmFsc2VcbiAgaWYgKGlzVmFsaWQpIHtcbiAgICByZXR1cm4gdlxuICB9XG5cbiAgdiA9IHR5cGVvZiAodikgPT09ICdzdHJpbmcnID8gdiA6ICcnXG4gIGNvbnN0IHNwbGl0ID0gdi5zcGxpdCgnLicpXG4gIGxldCBpID0gMFxuICBsZXQgcmVzdWx0ID0gW11cblxuICB3aGlsZSAoaSA8IDMpIHtcbiAgICBjb25zdCBzID0gdHlwZW9mIChzcGxpdFtpXSkgPT09ICdzdHJpbmcnICYmIHNwbGl0W2ldID8gc3BsaXRbaV0gOiAnMCdcbiAgICByZXN1bHQucHVzaChzKVxuICAgIGkrK1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdC5qb2luKCcuJylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEVycm9yIChrZXksIHZhbCwgY3JpdGVyaWEpIHtcbiAgbGV0IHJlc3VsdCA9IHtcbiAgICBpc0Rvd25ncmFkZTogdHJ1ZSxcbiAgICBlcnJvclR5cGU6IDEsXG4gICAgY29kZTogMTAwMFxuICB9XG4gIGxldCBnZXRNc2cgPSBmdW5jdGlvbiAoa2V5LCB2YWwsIGNyaXRlcmlhKSB7XG4gICAgcmV0dXJuICdEb3duZ3JhZGVbJyArIGtleSArICddIDo6IGRldmljZUluZm8gJ1xuICAgICAgKyB2YWwgKyAnIG1hdGNoZWQgY3JpdGVyaWEgJyArIGNyaXRlcmlhXG4gIH1cbiAgY29uc3QgX2tleSA9IGtleS50b0xvd2VyQ2FzZSgpXG5cbiAgcmVzdWx0LmVycm9yTWVzc2FnZSA9IGdldE1zZyhrZXksIHZhbCwgY3JpdGVyaWEpXG5cbiAgaWYgKF9rZXkuaW5kZXhPZignb3N2ZXJzaW9uJykgPj0gMCkge1xuICAgIHJlc3VsdC5jb2RlID0gMTAwMVxuICB9ZWxzZSBpZiAoX2tleS5pbmRleE9mKCdhcHB2ZXJzaW9uJykgPj0gMCkge1xuICAgIHJlc3VsdC5jb2RlID0gMTAwMlxuICB9ZWxzZSBpZiAoX2tleS5pbmRleE9mKCd3ZWV4dmVyc2lvbicpID49IDApIHtcbiAgICByZXN1bHQuY29kZSA9IDEwMDNcbiAgfWVsc2UgaWYgKF9rZXkuaW5kZXhPZignZGV2aWNlbW9kZWwnKSA+PSAwKSB7XG4gICAgcmVzdWx0LmNvZGUgPSAxMDA0XG4gIH1cblxuICByZXR1cm4gcmVzdWx0XG59XG5cbi8qKlxuICogV0VFWCBmcmFtZXdvcmsgaW5wdXQoZGV2aWNlSW5mbylcbiAqIHtcbiAqICAgcGxhdGZvcm06ICdpT1MnIG9yICdhbmRyb2lkJ1xuICogICBvc1ZlcnNpb246ICcxLjAuMCcgb3IgJzEuMCcgb3IgJzEnXG4gKiAgIGFwcFZlcnNpb246ICcxLjAuMCcgb3IgJzEuMCcgb3IgJzEnXG4gKiAgIHdlZXhWZXJzaW9uOiAnMS4wLjAnIG9yICcxLjAnIG9yICcxJ1xuICogICBkRGV2aWNlTW9kZWw6ICdNT0RFTF9OQU1FJ1xuICogfVxuICpcbiAqIGRvd25ncmFkZSBjb25maWcoY29uZmlnKVxuICoge1xuICogICBpb3M6IHtcbiAqICAgICBvc1ZlcnNpb246ICc+MS4wLjAnIG9yICc+PTEuMC4wJyBvciAnPDEuMC4wJyBvciAnPD0xLjAuMCcgb3IgJzEuMC4wJ1xuICogICAgIGFwcFZlcnNpb246ICc+MS4wLjAnIG9yICc+PTEuMC4wJyBvciAnPDEuMC4wJyBvciAnPD0xLjAuMCcgb3IgJzEuMC4wJ1xuICogICAgIHdlZXhWZXJzaW9uOiAnPjEuMC4wJyBvciAnPj0xLjAuMCcgb3IgJzwxLjAuMCcgb3IgJzw9MS4wLjAnIG9yICcxLjAuMCdcbiAqICAgICBkZXZpY2VNb2RlbDogWydtb2RlbEEnLCAnbW9kZWxCJywgLi4uXVxuICogICB9LFxuICogICBhbmRyb2lkOiB7XG4gKiAgICAgb3NWZXJzaW9uOiAnPjEuMC4wJyBvciAnPj0xLjAuMCcgb3IgJzwxLjAuMCcgb3IgJzw9MS4wLjAnIG9yICcxLjAuMCdcbiAqICAgICBhcHBWZXJzaW9uOiAnPjEuMC4wJyBvciAnPj0xLjAuMCcgb3IgJzwxLjAuMCcgb3IgJzw9MS4wLjAnIG9yICcxLjAuMCdcbiAqICAgICB3ZWV4VmVyc2lvbjogJz4xLjAuMCcgb3IgJz49MS4wLjAnIG9yICc8MS4wLjAnIG9yICc8PTEuMC4wJyBvciAnMS4wLjAnXG4gKiAgICAgZGV2aWNlTW9kZWw6IFsnbW9kZWxBJywgJ21vZGVsQicsIC4uLl1cbiAqICAgfVxuICogfVxuICpcbiAqXG4gKiBAcGFyYW0gIHtvYmplY3R9IGRldmljZUluZm8gV2VleCBTREsgZnJhbWV3b3JrIGlucHV0XG4gKiBAcGFyYW0gIHtvYmplY3R9IGNvbmZpZyAgICAgdXNlciBpbnB1dFxuICogQHJldHVybiB7T2JqZWN0fSAgICAgICAgICAgIHsgaXNEb3duZ3JhZGU6IHRydWUvZmFsc2UsIGVycm9yTWVzc2FnZS4uLiB9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjaGVjayAoY29uZmlnLCBkZXZpY2VJbmZvKSB7XG4gIGRldmljZUluZm8gPSBkZXZpY2VJbmZvIHx8IGdsb2JhbC5XWEVudmlyb25tZW50XG4gIGRldmljZUluZm8gPSBpc1BsYWluT2JqZWN0KGRldmljZUluZm8pID8gZGV2aWNlSW5mbyA6IHt9XG4gIGNvbmZpZyA9IGlzUGxhaW5PYmplY3QoY29uZmlnKSA/IGNvbmZpZyA6IHt9XG4gIGNvbnN0IHBsYXRmb3JtID0gZGV2aWNlSW5mby5wbGF0Zm9ybSB8fCAndW5rbm93J1xuICBjb25zdCBkUGxhdGZvcm0gPSBwbGF0Zm9ybS50b0xvd2VyQ2FzZSgpXG4gIGNvbnN0IGNPYmogPSBjb25maWdbZFBsYXRmb3JtXSB8fCB7fVxuXG4gIGxldCByZXN1bHQgPSB7XG4gICAgaXNEb3duZ3JhZGU6IGZhbHNlIC8vIGRlZmF1dGwgaXMgcGFzc1xuICB9XG5cbiAgZm9yIChsZXQgaSBpbiBkZXZpY2VJbmZvKSB7XG4gICAgY29uc3Qga2V5ID0gaVxuICAgIGNvbnN0IGtleUxvd2VyID0ga2V5LnRvTG93ZXJDYXNlKClcbiAgICBjb25zdCB2YWwgPSBkZXZpY2VJbmZvW2ldXG4gICAgY29uc3QgaXNWZXJzaW9uID0ga2V5TG93ZXIuaW5kZXhPZigndmVyc2lvbicpID49IDAgPyB0cnVlIDogZmFsc2VcbiAgICBjb25zdCBpc0RldmljZU1vZGVsID0ga2V5TG93ZXIuaW5kZXhPZignZGV2aWNlbW9kZWwnKSA+PSAwID8gdHJ1ZSA6IGZhbHNlXG4gICAgY29uc3QgY3JpdGVyaWEgPSBjT2JqW2ldXG5cbiAgICBpZiAoY3JpdGVyaWEgJiYgaXNWZXJzaW9uKSB7XG4gICAgICBjb25zdCBjID0gdGhpcy5ub3JtYWxpemVWZXJzaW9uKGNyaXRlcmlhKVxuICAgICAgY29uc3QgZCA9IHRoaXMubm9ybWFsaXplVmVyc2lvbihkZXZpY2VJbmZvW2ldKVxuXG4gICAgICBpZiAoc2VtdmVyLnNhdGlzZmllcyhkLCBjKSkge1xuICAgICAgICByZXN1bHQgPSBleHRlbmQodGhpcy5nZXRFcnJvcihrZXksIHZhbCwgY3JpdGVyaWEpKVxuICAgICAgICBicmVha1xuICAgICAgfVxuICAgIH1lbHNlIGlmIChpc0RldmljZU1vZGVsKSB7XG4gICAgICBjb25zdCBfY3JpdGVyaWEgPSB0eXBvZihjcml0ZXJpYSkgPT09ICdhcnJheScgPyBjcml0ZXJpYSA6IFtjcml0ZXJpYV1cbiAgICAgIGlmIChfY3JpdGVyaWEuaW5kZXhPZih2YWwpID49IDApIHtcbiAgICAgICAgcmVzdWx0ID0gZXh0ZW5kKHRoaXMuZ2V0RXJyb3Ioa2V5LCB2YWwsIGNyaXRlcmlhKSlcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0XG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9saWIvYXBwL2Rvd25ncmFkZS5qc1xuICoqLyIsIi8qKlxuICogQGZpbGVPdmVydmlld1xuICogaW5zdGFuY2UgY29udHJvbHMgZnJvbSBuYXRpdmVcbiAqXG4gKiAtIGluaXQgYnVuZGxlXG4gKiAtIGZpcmUgZXZlbnRcbiAqIC0gY2FsbGJhY2tcbiAqIC0gZGVzdHJveVxuICpcbiAqIGNvcnJlc3BvbmRlZCB3aXRoIHRoZSBBUEkgb2YgaW5zdGFuY2UgbWFuYWdlciAoZnJhbWV3b3JrLmpzKVxuICovXG5cbmltcG9ydCB7XG4gIGJpbmQsIGV4dGVuZFxufVxuZnJvbSAnLi4vdXRpbCdcbmltcG9ydCAqIGFzIHBlcmYgZnJvbSAnLi4vcGVyZidcbmltcG9ydCBMaXN0ZW5lciwge2NyZWF0ZUFjdGlvbn0gZnJvbSAnLi9kb20tbGlzdGVuZXInXG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0KGNvZGUsIGRhdGEpIHtcbiAgdmFyIHJlc3VsdFxuICAvLyBAc2VlOiBsaWIvYXBwL2J1bmRsZS5qc1xuICBjb25zdCBkZWZpbmUgPSBiaW5kKHRoaXMuZGVmaW5lLCB0aGlzKVxuICBjb25zdCBib290c3RyYXAgPSAobmFtZSwgY29uZmlnLCBfZGF0YSkgPT4ge1xuICAgIHJlc3VsdCA9IHRoaXMuYm9vdHN0cmFwKG5hbWUsIGNvbmZpZywgX2RhdGEgfHwgZGF0YSlcbiAgICB0aGlzLnVwZGF0ZUFjdGlvbnMoKVxuICAgIHRoaXMuZG9jLmxpc3RlbmVyLmNyZWF0ZUZpbmlzaCgpXG4gICAgdGhpcy5kb2MuY2xvc2UoKVxuICB9XG5cbiAgLy8gYmFja3dhcmQocmVnaXN0ZXIvcmVuZGVyKVxuICBjb25zdCByZWdpc3RlciA9IGJpbmQodGhpcy5yZWdpc3RlciwgdGhpcylcbiAgY29uc3QgcmVuZGVyID0gKG5hbWUsIF9kYXRhKSA9PiB7XG4gICAgcmVzdWx0ID0gdGhpcy5ib290c3RyYXAobmFtZSwge30sIF9kYXRhKVxuICB9XG5cbiAgY29uc3QgcmVxdWlyZSA9IG5hbWUgPT4gX2RhdGEgPT4ge1xuICAgIHJlc3VsdCA9IHRoaXMuYm9vdHN0cmFwKG5hbWUsIHt9LCBfZGF0YSlcbiAgfVxuXG4gIGNvbnN0IGRvY3VtZW50ID0gdGhpcy5kb2NcblxuICBwZXJmLnN0YXJ0KCdydW4gYnVuZGxlJywgdGhpcy5pZClcblxuICBsZXQgZnVuY3Rpb25Cb2R5XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICBpZiAodHlwZW9mIGNvZGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAvLyBgZnVuY3Rpb24gKCkgey4uLn1gIC0+IGB7Li4ufWBcbiAgICAvLyBub3QgdmVyeSBzdHJpY3RcbiAgICBmdW5jdGlvbkJvZHkgPSBjb2RlLnRvU3RyaW5nKCkuc3Vic3RyKDEyKVxuICB9IGVsc2UgaWYgKGNvZGUpIHtcbiAgICBmdW5jdGlvbkJvZHkgPSBjb2RlLnRvU3RyaW5nKClcbiAgfVxuXG4gIGxldCBmbiA9IG5ldyBGdW5jdGlvbihcbiAgICAnZGVmaW5lJyxcbiAgICAncmVxdWlyZScsXG4gICAgJ2RvY3VtZW50JyxcbiAgICAnYm9vdHN0cmFwJyxcbiAgICAncmVnaXN0ZXInLFxuICAgICdyZW5kZXInLFxuICAgICdfX3dlZXhfZGVmaW5lX18nLCAvLyBhbGlhcyBmb3IgZGVmaW5lXG4gICAgJ19fd2VleF9ib290c3RyYXBfXycsIC8vIGFsaWFzIGZvciBib290c3RyYXBcbiAgICBmdW5jdGlvbkJvZHlcbiAgKVxuXG4gIGZuKFxuICAgIGRlZmluZSxcbiAgICByZXF1aXJlLFxuICAgIGRvY3VtZW50LFxuICAgIGJvb3RzdHJhcCxcbiAgICByZWdpc3RlcixcbiAgICByZW5kZXIsXG4gICAgZGVmaW5lLFxuICAgIGJvb3RzdHJhcClcblxuICBwZXJmLmVuZCgncnVuIGJ1bmRsZScsIHRoaXMuaWQpXG4gIHJldHVybiByZXN1bHRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gIHRoaXMuaWQgPSAnJ1xuICB0aGlzLmV2ZW50TWFuYWdlciA9IG51bGxcbiAgdGhpcy5vcHRpb25zID0gbnVsbFxuICB0aGlzLmJsb2NrcyA9IG51bGxcbiAgdGhpcy52bSA9IG51bGxcbiAgdGhpcy5kb2MgPSBudWxsXG4gIHRoaXMuY3VzdG9tQ29tcG9uZW50TWFwID0gbnVsbFxuICB0aGlzLmNhbGxiYWNrcyA9IG51bGxcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFJvb3RFbGVtZW50KCkge1xuICBjb25zdCBkb2MgPSB0aGlzLmRvYyB8fCB7fVxuICBjb25zdCBib2R5ID0gZG9jLmJvZHkgfHwge31cbiAgcmV0dXJuIGJvZHkudG9KU09OID8gYm9keS50b0pTT04oKSA6IHt9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVBY3Rpb25zKGFkZG9uVGFza3MpIHtcbiAgdGhpcy5kaWZmZXIuZmx1c2goKVxuICBjb25zdCB0YXNrcyA9IFtdXG4gIGlmICh0aGlzLmxpc3RlbmVyICYmIHRoaXMubGlzdGVuZXIudXBkYXRlcy5sZW5ndGgpIHtcbiAgICB0YXNrcy5wdXNoKC4uLnRoaXMubGlzdGVuZXIudXBkYXRlcylcbiAgICB0aGlzLmxpc3RlbmVyLnVwZGF0ZXMgPSBbXVxuICB9XG4gIGlmIChhZGRvblRhc2tzICYmIGFkZG9uVGFza3MubGVuZ3RoKSB7XG4gICAgdGFza3MucHVzaCguLi5hZGRvblRhc2tzKVxuICB9XG4gIGlmICh0YXNrcy5sZW5ndGgpIHtcbiAgICB0aGlzLmNhbGxUYXNrcyh0YXNrcylcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZmlyZUV2ZW50KHJlZiwgdHlwZSwgZSwgZG9tQ2hhbmdlcykge1xuICBpZiAoQXJyYXkuaXNBcnJheShyZWYpKSB7XG4gICAgcmVmLnNvbWUoKHJlZikgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuZmlyZUV2ZW50KHJlZiwgdHlwZSwgZSkgIT09IGZhbHNlXG4gICAgfSlcbiAgICByZXR1cm5cbiAgfVxuXG4gIGNvbnN0IGVsID0gdGhpcy5kb2MuZ2V0UmVmKHJlZilcblxuICBpZiAoZWwpIHtcbiAgICBwZXJmLnN0YXJ0KCdtYW5hZ2UgZXZlbnQnLCByZWYgKyAnLScgKyB0eXBlKVxuICAgIGUgPSBlIHx8IHt9XG4gICAgZS50eXBlID0gdHlwZVxuICAgIGUudGFyZ2V0ID0gZWxcbiAgICBlLnRpbWVzdGFtcCA9IERhdGUubm93KClcbiAgICBpZiAoZG9tQ2hhbmdlcykge1xuICAgICAgdXBkYXRlRWxlbWVudChlbCwgZG9tQ2hhbmdlcylcbiAgICB9XG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy5ldmVudE1hbmFnZXIuZmlyZShlbCwgdHlwZSwgZSlcbiAgICBwZXJmLmVuZCgnbWFuYWdlIGV2ZW50JywgcmVmICsgJy0nICsgdHlwZSlcbiAgICB0aGlzLnVwZGF0ZUFjdGlvbnMoKVxuICAgIHJldHVybiByZXN1bHRcbiAgfVxuXG4gIHJldHVybiBuZXcgRXJyb3IoYGludmFsaWQgZWxlbWVudCByZWZlcmVuY2UgXCIke3JlZn1cImApXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjYWxsYmFjayhjYWxsYmFja0lkLCBkYXRhLCBpZktlZXBBbGl2ZSkge1xuICBjb25zdCBjYWxsYmFjayA9IHRoaXMuY2FsbGJhY2tzW2NhbGxiYWNrSWRdXG5cbiAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNhbGxiYWNrKGRhdGEpIC8vIGRhdGEgaXMgYWxyZWFkeSBhIG9iamVjdCwgQHNlZTogbGliL2ZyYW1ld29yay5qc1xuXG4gICAgaWYgKHR5cGVvZiBpZktlZXBBbGl2ZSA9PT0gJ3VuZGVmaW5lZCcgfHwgaWZLZWVwQWxpdmUgPT09IGZhbHNlKSB7XG4gICAgICB0aGlzLmNhbGxiYWNrc1tjYWxsYmFja0lkXSA9IHVuZGVmaW5lZFxuICAgIH1cblxuICAgIHRoaXMudXBkYXRlQWN0aW9ucygpXG4gICAgcmV0dXJuXG4gIH1cblxuICByZXR1cm4gbmV3IEVycm9yKGBpbnZhbGlkIGNhbGxiYWNrIGlkIFwiJHtjYWxsYmFja0lkfVwiYClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlZnJlc2hEYXRhKGRhdGEpIHtcbiAgY29uc3Qgdm0gPSB0aGlzLnZtXG5cbiAgaWYgKHZtICYmIGRhdGEpIHtcbiAgICBpZiAodHlwZW9mIHZtLnJlZnJlc2hEYXRhID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB2bS5yZWZyZXNoRGF0YShkYXRhKVxuICAgIH0gZWxzZSB7XG4gICAgICBleHRlbmQodm0sIGRhdGEpXG4gICAgfVxuICAgIHRoaXMudXBkYXRlQWN0aW9ucyhbY3JlYXRlQWN0aW9uKCdyZWZyZXNoRmluaXNoJywgW10pXSlcbiAgICByZXR1cm5cbiAgfVxuXG4gIHJldHVybiBuZXcgRXJyb3IoYGludmFsaWQgZGF0YSBcIiR7ZGF0YX1cImApXG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUVsZW1lbnQoZWwsIGNoYW5nZXMpIHtcbiAgY29uc3QgYXR0cnMgPSBjaGFuZ2VzLmF0dHJzIHx8IHt9XG4gIGZvciAoY29uc3QgbmFtZSBpbiBhdHRycykge1xuICAgIGVsLnNldEF0dHIobmFtZSwgYXR0cnMpXG4gIH1cbiAgY29uc3Qgc3R5bGUgPSBjaGFuZ2VzLnN0eWxlIHx8IHt9XG4gIGZvciAoY29uc3QgbmFtZSBpbiBzdHlsZSkge1xuICAgIGVsLnNldFN0eWxlKG5hbWUsIHN0eWxlW25hbWVdKVxuICB9XG59XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vbGliL2FwcC9jdHJsLmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTGlzdGVuZXIoaWQsIGhhbmRsZXIpIHtcbiAgdGhpcy5pZCA9IGlkXG4gIHRoaXMuYmF0Y2hlZCA9IGZhbHNlXG4gIHRoaXMudXBkYXRlcyA9IFtdXG4gIGlmICh0eXBlb2YgaGFuZGxlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHRoaXMuaGFuZGxlciA9IGhhbmRsZXJcbiAgfVxufVxuXG5MaXN0ZW5lci5wcm90b3R5cGUuY3JlYXRlRmluaXNoID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gIGNvbnN0IGhhbmRsZXIgPSB0aGlzLmhhbmRsZXJcbiAgaGFuZGxlcihbY3JlYXRlQWN0aW9uKCdjcmVhdGVGaW5pc2gnLCBbXSldLCBjYWxsYmFjaylcbn1cblxuTGlzdGVuZXIucHJvdG90eXBlLmNyZWF0ZUJvZHkgPSBmdW5jdGlvbiAoZWxlbWVudCwgcmVmKSB7XG4gIGNvbnN0IGFjdGlvbnMgPSBbY3JlYXRlQWN0aW9uKCdjcmVhdGVCb2R5JywgW2VsZW1lbnQudG9KU09OKCldKV1cbiAgdGhpcy5hZGRBY3Rpb25zKGFjdGlvbnMpXG59XG5cbkxpc3RlbmVyLnByb3RvdHlwZS5hZGRFbGVtZW50ID0gZnVuY3Rpb24gKGVsZW1lbnQsIHJlZiwgaW5kZXgpIHtcbiAgaWYgKCEoaW5kZXggPj0gMCkpIHtcbiAgICBpbmRleCA9IC0xXG4gIH1cbiAgdGhpcy5hZGRBY3Rpb25zKGNyZWF0ZUFjdGlvbignYWRkRWxlbWVudCcsIFtyZWYsIGVsZW1lbnQudG9KU09OKCksIGluZGV4XSkpXG59XG5cbkxpc3RlbmVyLnByb3RvdHlwZS5yZW1vdmVFbGVtZW50ID0gZnVuY3Rpb24gKHJlZikge1xuICBpZiAoQXJyYXkuaXNBcnJheShyZWYpKSB7XG4gICAgY29uc3QgYWN0aW9ucyA9IHJlZi5tYXAoKHIpID0+IGNyZWF0ZUFjdGlvbigncmVtb3ZlRWxlbWVudCcsIFtyXSkpXG4gICAgdGhpcy5hZGRBY3Rpb25zKGFjdGlvbnMpXG4gIH1cbiAgZWxzZSB7XG4gICAgdGhpcy5hZGRBY3Rpb25zKGNyZWF0ZUFjdGlvbigncmVtb3ZlRWxlbWVudCcsIFtyZWZdKSlcbiAgfVxufVxuXG5MaXN0ZW5lci5wcm90b3R5cGUubW92ZUVsZW1lbnQgPSBmdW5jdGlvbiAodGFyZ2V0UmVmLCBwYXJlbnRSZWYsIGluZGV4KSB7XG4gIHRoaXMuYWRkQWN0aW9ucyhjcmVhdGVBY3Rpb24oJ21vdmVFbGVtZW50JywgW3RhcmdldFJlZiwgcGFyZW50UmVmLCBpbmRleF0pKVxufVxuXG5MaXN0ZW5lci5wcm90b3R5cGUuc2V0QXR0ciA9IGZ1bmN0aW9uIChyZWYsIGtleSwgdmFsdWUpIHtcbiAgY29uc3QgcmVzdWx0ID0ge31cbiAgcmVzdWx0W2tleV0gPSB2YWx1ZVxuICB0aGlzLmFkZEFjdGlvbnMoY3JlYXRlQWN0aW9uKCd1cGRhdGVBdHRycycsIFtyZWYsIHJlc3VsdF0pKVxufVxuXG5MaXN0ZW5lci5wcm90b3R5cGUuc2V0U3R5bGUgPSBmdW5jdGlvbiAocmVmLCBrZXksIHZhbHVlKSB7XG4gIGNvbnN0IHJlc3VsdCA9IHt9XG4gIHJlc3VsdFtrZXldID0gdmFsdWVcbiAgdGhpcy5hZGRBY3Rpb25zKGNyZWF0ZUFjdGlvbigndXBkYXRlU3R5bGUnLCBbcmVmLCByZXN1bHRdKSlcbn1cblxuTGlzdGVuZXIucHJvdG90eXBlLnNldFN0eWxlcyA9IGZ1bmN0aW9uIChyZWYsIHN0eWxlKSB7XG4gIHRoaXMuYWRkQWN0aW9ucyhjcmVhdGVBY3Rpb24oJ3VwZGF0ZVN0eWxlJywgW3JlZiwgc3R5bGVdKSlcbn1cblxuTGlzdGVuZXIucHJvdG90eXBlLmFkZEV2ZW50ID0gZnVuY3Rpb24gKHJlZiwgdHlwZSkge1xuICB0aGlzLmFkZEFjdGlvbnMoY3JlYXRlQWN0aW9uKCdhZGRFdmVudCcsIFtyZWYsIHR5cGVdKSlcbn1cblxuTGlzdGVuZXIucHJvdG90eXBlLnJlbW92ZUV2ZW50ID0gZnVuY3Rpb24gKHJlZiwgdHlwZSkge1xuICB0aGlzLmFkZEFjdGlvbnMoY3JlYXRlQWN0aW9uKCdyZW1vdmVFdmVudCcsIFtyZWYsIHR5cGVdKSlcbn1cblxuTGlzdGVuZXIucHJvdG90eXBlLmhhbmRsZXIgPSBmdW5jdGlvbiAoYWN0aW9ucywgY2IpIHtcbiAgY2IgJiYgY2IoKVxufVxuXG5MaXN0ZW5lci5wcm90b3R5cGUuYWRkQWN0aW9ucyA9IGZ1bmN0aW9uIChhY3Rpb25zKSB7XG4gIGNvbnN0IHVwZGF0ZXMgPSB0aGlzLnVwZGF0ZXNcbiAgY29uc3QgaGFuZGxlciA9IHRoaXMuaGFuZGxlclxuXG4gIGlmICghQXJyYXkuaXNBcnJheShhY3Rpb25zKSkge1xuICAgIGFjdGlvbnMgPSBbYWN0aW9uc11cbiAgfVxuXG4gIGlmICh0aGlzLmJhdGNoZWQpIHtcbiAgICB1cGRhdGVzLnB1c2guYXBwbHkodXBkYXRlcywgYWN0aW9ucylcbiAgfVxuICBlbHNlIHtcbiAgICBoYW5kbGVyKGFjdGlvbnMpXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUFjdGlvbihuYW1lLCBhcmdzKSB7XG4gIHJldHVybiB7bW9kdWxlOiAnZG9tJywgbWV0aG9kOiBuYW1lLCBhcmdzOiBhcmdzfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9saWIvYXBwL2RvbS1saXN0ZW5lci5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIERpZmZlciB7XG4gIGNvbnN0cnVjdG9yIChpZCkge1xuICAgIHRoaXMuaWQgPSBpZFxuICAgIHRoaXMubWFwID0gW11cbiAgICB0aGlzLmhvb2tzID0gW11cbiAgfVxuICBpc0VtcHR5ICgpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAubGVuZ3RoID09PSAwXG4gIH1cbiAgYXBwZW5kICh0eXBlLCBkZXB0aCwgcmVmLCBoYW5kbGVyKSB7XG4gICAgY29uc3QgbWFwID0gdGhpcy5tYXBcbiAgICBpZiAoIW1hcFtkZXB0aF0pIHtcbiAgICAgIG1hcFtkZXB0aF0gPSB7fVxuICAgIH1cbiAgICBjb25zdCBncm91cCA9IG1hcFtkZXB0aF1cbiAgICBpZiAoIWdyb3VwW3R5cGVdKSB7XG4gICAgICBncm91cFt0eXBlXSA9IHt9XG4gICAgfVxuICAgIGlmICh0eXBlID09PSAnZWxlbWVudCcpIHtcbiAgICAgIGlmICghZ3JvdXBbdHlwZV1bcmVmXSkge1xuICAgICAgICBncm91cFt0eXBlXVtyZWZdID0gW11cbiAgICAgIH1cbiAgICAgIGdyb3VwW3R5cGVdW3JlZl0ucHVzaChoYW5kbGVyKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGdyb3VwW3R5cGVdW3JlZl0gPSBoYW5kbGVyXG4gICAgfVxuICB9XG4gIGZsdXNoICgpIHtcbiAgICBjb25zdCBtYXAgPSB0aGlzLm1hcC5zbGljZSgpXG4gICAgdGhpcy5tYXAubGVuZ3RoID0gMFxuICAgIG1hcC5mb3JFYWNoKChncm91cCkgPT4ge1xuICAgICAgY2FsbFR5cGVNYXAoZ3JvdXAsICdyZXBlYXQnKVxuICAgICAgY2FsbFR5cGVNYXAoZ3JvdXAsICdzaG93bicpXG4gICAgICBjYWxsVHlwZUxpc3QoZ3JvdXAsICdlbGVtZW50JylcbiAgICB9KVxuXG4gICAgY29uc3QgaG9va3MgPSB0aGlzLmhvb2tzLnNsaWNlKClcbiAgICB0aGlzLmhvb2tzLmxlbmd0aCA9IDBcbiAgICBob29rcy5mb3JFYWNoKChmbikgPT4ge1xuICAgICAgZm4oKVxuICAgIH0pXG5cbiAgICBpZiAoIXRoaXMuaXNFbXB0eSgpKSB7XG4gICAgICB0aGlzLmZsdXNoKClcbiAgICB9XG4gIH1cbiAgdGhlbiAoZm4pIHtcbiAgICB0aGlzLmhvb2tzLnB1c2goZm4pXG4gIH1cbn1cblxuZnVuY3Rpb24gY2FsbFR5cGVNYXAoZ3JvdXAsIHR5cGUpIHtcbiAgY29uc3QgbWFwID0gZ3JvdXBbdHlwZV1cbiAgZm9yIChjb25zdCByZWYgaW4gbWFwKSB7XG4gICAgbWFwW3JlZl0oKVxuICB9XG59XG5cbmZ1bmN0aW9uIGNhbGxUeXBlTGlzdChncm91cCwgdHlwZSkge1xuICBjb25zdCBtYXAgPSBncm91cFt0eXBlXVxuICBmb3IgKGNvbnN0IHJlZiBpbiBtYXApIHtcbiAgICBjb25zdCBsaXN0ID0gbWFwW3JlZl1cbiAgICBsaXN0LmZvckVhY2goKGhhbmRsZXIpID0+IHtoYW5kbGVyKCl9KVxuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2xpYi9hcHAvZGlmZmVyLmpzXG4gKiovIiwiLyoqXG4gKiBAZmlsZU92ZXJ2aWV3IGV2ZW50IG1hbmFnZXJcbiAqL1xuXG5pbXBvcnQgKiBhcyBfIGZyb20gJy4uL3V0aWwnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEV2ZW50TWFuYWdlcigpIHtcbiAgdGhpcy5lbHMgPSBbXVxuICB0aGlzLnRhcmdldHMgPSBbXVxufVxuXG5FdmVudE1hbmFnZXIucHJvdG90eXBlLl9nZXQgPSBmdW5jdGlvbiAoZWwsIGZvcmNlKSB7XG4gIHZhciBpbmRleCA9IF8uaW5kZXhPZih0aGlzLmVscywgZWwpXG4gIHZhciB0YXJnZXRcbiAgaWYgKGluZGV4ID49IDApIHtcbiAgICB0YXJnZXQgPSB0aGlzLnRhcmdldHNbaW5kZXhdXG4gIH1cbiAgZWxzZSBpZiAoZm9yY2UpIHtcbiAgICB0YXJnZXQgPSB7ZWw6IGVsLCBldmVudHM6IHt9fVxuICAgIHRoaXMuZWxzLnB1c2goZWwpXG4gICAgdGhpcy50YXJnZXRzLnB1c2godGFyZ2V0KVxuICB9XG4gIHJldHVybiB0YXJnZXRcbn1cblxuRXZlbnRNYW5hZ2VyLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoZWwsIHR5cGUsIGhhbmRsZXIpIHtcbiAgaWYgKHR5cGVvZiBlbCAhPT0gJ29iamVjdCcgfHwgIWVsIHx8XG4gICAgdHlwZW9mIHR5cGUgIT09ICdzdHJpbmcnIHx8ICF0eXBlIHx8XG4gICAgdHlwZW9mIGhhbmRsZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm5cbiAgfVxuICB2YXIgdGFyZ2V0ID0gdGhpcy5fZ2V0KGVsLCB0cnVlKVxuICB0YXJnZXQuZXZlbnRzW3R5cGVdID0gaGFuZGxlclxufVxuXG5FdmVudE1hbmFnZXIucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIChlbCwgdHlwZSkge1xuICBpZiAodHlwZW9mIGVsICE9PSAnb2JqZWN0JyB8fCAhZWwgfHxcbiAgICB0eXBlb2YgdHlwZSAhPT0gJ3N0cmluZycgfHwgIXR5cGUpIHtcbiAgICByZXR1cm5cbiAgfVxuICB2YXIgdGFyZ2V0ID0gdGhpcy5fZ2V0KGVsKVxuICBpZiAodGFyZ2V0KSB7XG4gICAgZGVsZXRlIHRhcmdldC5ldmVudHNbdHlwZV1cbiAgfVxufVxuXG5FdmVudE1hbmFnZXIucHJvdG90eXBlLmZpcmUgPSBmdW5jdGlvbiAoZWwsIHR5cGUsIGUpIHtcbiAgdmFyIHRhcmdldCA9IHRoaXMuX2dldChlbClcbiAgdmFyIGhhbmRsZXIsIGVsXG4gIGlmICh0YXJnZXQpIHtcbiAgICBlbCA9IHRhcmdldC5lbFxuICAgIGhhbmRsZXIgPSB0YXJnZXQuZXZlbnRzW3R5cGVdXG4gICAgaWYgKHR5cGVvZiBoYW5kbGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gaGFuZGxlci5jYWxsKGVsLCBlKVxuICAgIH1cbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9saWIvYXBwL2V2ZW50LmpzXG4gKiovIiwiLyoqXG4gKiBAZmlsZU92ZXJ2aWV3XG4gKiBBIHNpbXBsZSB2aXJ0dWFsIGRvbSBpbXBsZW1lbnRhdGlvblxuICovXG5cbmNvbnN0IERFRkFVTFRfVEFHX05BTUUgPSAnZGl2J1xuXG5leHBvcnQgY29uc3QgaW5zdGFuY2VNYXAgPSB7fVxuXG5leHBvcnQgZnVuY3Rpb24gRG9jdW1lbnQoaWQpIHtcbiAgaWQgPSBpZCA/IGlkLnRvU3RyaW5nKCkgOiAnJ1xuICB0aGlzLmlkID0gaWRcbiAgdGhpcy5uZXh0UmVmID0gMVxuICB0aGlzLm5vZGVNYXAgPSB7fVxuICB0aGlzLmxpc3RlbmVyID0gbnVsbFxuICB0aGlzLmV2ZW50TWFuYWdlciA9IG51bGxcbiAgdGhpcy5jbG9zZWQgPSBmYWxzZVxuICBpbnN0YW5jZU1hcFtpZF0gPSB0aGlzXG5cbiAgdGhpcy5jcmVhdGVEb2N1bWVudEVsZW1lbnQoKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVzdHJveURvY3VtZW50KGlkKSB7XG4gIGRlbGV0ZSBpbnN0YW5jZU1hcFtpZF1cbn1cblxuRG9jdW1lbnQucHJvdG90eXBlLm9wZW4gPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuY2xvc2VkID0gZmFsc2VcbiAgaWYgKHRoaXMubGlzdGVuZXIpIHtcbiAgICB0aGlzLmxpc3RlbmVyLmJhdGNoZWQgPSBmYWxzZVxuICB9XG59XG5Eb2N1bWVudC5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuY2xvc2VkID0gdHJ1ZVxuICBpZiAodGhpcy5saXN0ZW5lcikge1xuICAgIHRoaXMubGlzdGVuZXIuYmF0Y2hlZCA9IHRydWVcbiAgfVxufVxuXG5Eb2N1bWVudC5wcm90b3R5cGUuc2V0RXZlbnRNYW5hZ2VyID0gZnVuY3Rpb24gKGV2ZW50TWFuYWdlcikge1xuICB0aGlzLmV2ZW50TWFuYWdlciA9IGV2ZW50TWFuYWdlclxufVxuXG5Eb2N1bWVudC5wcm90b3R5cGUuc2V0TGlzdGVuZXIgPSBmdW5jdGlvbiAobGlzdGVuZXIpIHtcbiAgdGhpcy5saXN0ZW5lciA9IGxpc3RlbmVyXG4gIGxpc3RlbmVyLmJhdGNoZWQgPSAhIXRoaXMuY2xvc2VkXG59XG5cbkRvY3VtZW50LnByb3RvdHlwZS5hZGRSZWYgPSBmdW5jdGlvbiAoZWwpIHtcbiAgZWwucmVmID0gdGhpcy5uZXh0UmVmLnRvU3RyaW5nKClcbiAgdGhpcy5ub2RlTWFwW2VsLnJlZl0gPSBlbFxuICB0aGlzLm5leHRSZWYrK1xufVxuXG5Eb2N1bWVudC5wcm90b3R5cGUuZ2V0UmVmID0gZnVuY3Rpb24gKHJlZikge1xuICByZXR1cm4gdGhpcy5ub2RlTWFwW3JlZl1cbn1cblxuRG9jdW1lbnQucHJvdG90eXBlLnJlbW92ZVJlZiA9IGZ1bmN0aW9uIChyZWYpIHtcbiAgZGVsZXRlIHRoaXMubm9kZU1hcFtyZWZdXG59XG5cbkRvY3VtZW50LnByb3RvdHlwZS5jcmVhdGVEb2N1bWVudEVsZW1lbnQgPSBmdW5jdGlvbiAodHlwZSwgcHJvcHMpIHtcbiAgaWYgKCF0aGlzLmRvY3VtZW50RWxlbWVudCkge1xuICAgIHRoaXMuZG9jdW1lbnRFbGVtZW50ID0gbmV3IEVsZW1lbnQodHlwZSwgcHJvcHMsIHRoaXMpXG4gICAgdGhpcy5ub2RlTWFwLl9kb2N1bWVudEVsZW1lbnQgPSB0aGlzLmRvY3VtZW50RWxlbWVudFxuICAgIHRoaXMuZG9jdW1lbnRFbGVtZW50LnJlZiA9ICdfZG9jdW1lbnRFbGVtZW50J1xuICAgIHRoaXMuZG9jdW1lbnRFbGVtZW50LmF0dGFjaGVkID0gdHJ1ZVxuICB9XG5cbiAgcmV0dXJuIHRoaXMuZG9jdW1lbnRFbGVtZW50XG59XG5cbkRvY3VtZW50LnByb3RvdHlwZS5jcmVhdGVCb2R5ID0gZnVuY3Rpb24gKHR5cGUsIHByb3BzKSB7XG4gIGlmICghdGhpcy5ib2R5KSB7XG4gICAgdGhpcy5ib2R5ID0gbmV3IEVsZW1lbnQodHlwZSwgcHJvcHMsIHRoaXMpXG4gICAgdGhpcy5ub2RlTWFwLl9yb290ID0gdGhpcy5ib2R5XG4gICAgdGhpcy5ib2R5LnJlZiA9ICdfcm9vdCdcbiAgICB0aGlzLmJvZHkuZGVwdGggPSAxXG4gIH1cblxuICByZXR1cm4gdGhpcy5ib2R5XG59XG5cbkRvY3VtZW50LnByb3RvdHlwZS5jcmVhdGVFbGVtZW50ID0gZnVuY3Rpb24gKHRhZ05hbWUsIHByb3BzKSB7XG4gIHJldHVybiBuZXcgRWxlbWVudCh0YWdOYW1lLCBwcm9wcywgdGhpcylcbn1cblxuRG9jdW1lbnQucHJvdG90eXBlLmNyZWF0ZUNvbW1lbnQgPSBmdW5jdGlvbiAodGV4dCkge1xuICByZXR1cm4gbmV3IENvbW1lbnQodGV4dCwgdGhpcylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIE5vZGUoKSB7XG59XG5cbk5vZGUucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uIChpbnN0YW5jZUlkKSB7XG4gIHRoaXMucGFyZW50UmVmID0gbnVsbFxuICB0aGlzLmF0dGFjaGVkID0gZmFsc2VcbiAgaWYgKGluc3RhbmNlSWQpIHtcbiAgICB0aGlzLmluc3RhbmNlSWQgPSBpbnN0YW5jZUlkXG4gICAgY29uc3QgZG9jID0gaW5zdGFuY2VNYXBbaW5zdGFuY2VJZF1cbiAgICBkb2MuYWRkUmVmKHRoaXMpXG4gIH1cbn1cblxuTm9kZS5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgcmVmID0gdGhpcy5yZWZcbiAgY29uc3QgaW5zdGFuY2VJZCA9IHRoaXMuaW5zdGFuY2VJZFxuICBpZiAoaW5zdGFuY2VJZCkge1xuICAgIGNvbnN0IGRvYyA9IGluc3RhbmNlTWFwW2luc3RhbmNlSWRdXG4gICAgZG9jLnJlbW92ZVJlZihyZWYpXG4gIH1cblxuICBjb25zdCBjaGlsZHJlbiA9IHRoaXMuY2hpbGRyZW4gfHwgW11cbiAgY29uc3QgbGVuZ3RoID0gY2hpbGRyZW4ubGVuZ3RoXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBjaGlsZHJlbltpXS5kZXN0cm95KClcbiAgfVxufVxuXG5Ob2RlLnByb3RvdHlwZS5nZXRSZW5kZXJlciA9IGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgZG9jID0gaW5zdGFuY2VNYXBbdGhpcy5pbnN0YW5jZUlkXVxuICByZXR1cm4gZG9jLmxpc3RlbmVyXG59XG5cbk5vZGUucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IGluc3RhbmNlSWQgPSB0aGlzLmluc3RhbmNlSWRcbiAgY29uc3QgZG9jID0gaW5zdGFuY2VNYXBbaW5zdGFuY2VJZF1cbiAgY29uc3QgcGFyZW50ID0gZG9jLmdldFJlZih0aGlzLnBhcmVudFJlZilcbiAgaWYgKHBhcmVudCkge1xuICAgIHJldHVybiBwYXJlbnQuY2hpbGRyZW5bcGFyZW50LmNoaWxkcmVuLmluZGV4T2YodGhpcykgKyAxXVxuICB9XG59XG5cbk5vZGUucHJvdG90eXBlLnByZXYgPSBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IGluc3RhbmNlSWQgPSB0aGlzLmluc3RhbmNlSWRcbiAgY29uc3QgZG9jID0gaW5zdGFuY2VNYXBbaW5zdGFuY2VJZF1cbiAgY29uc3QgcGFyZW50ID0gZG9jLmdldFJlZih0aGlzLnBhcmVudFJlZilcbiAgaWYgKHBhcmVudCkge1xuICAgIHJldHVybiBwYXJlbnQuY2hpbGRyZW5bcGFyZW50LmNoaWxkcmVuLmluZGV4T2YodGhpcykgLSAxXVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBFbGVtZW50KHR5cGU9REVGQVVMVF9UQUdfTkFNRSwgcHJvcHMsIG93bmVyRG9jdW1lbnQpIHtcbiAgcHJvcHMgPSBwcm9wcyB8fCB7fVxuICB0aGlzLmNyZWF0ZShvd25lckRvY3VtZW50LmlkKVxuICB0aGlzLm93bmVyRG9jdW1lbnQgPSBvd25lckRvY3VtZW50XG4gIHRoaXMudHlwZSA9IHR5cGVcbiAgdGhpcy5hdHRyID0gcHJvcHMuYXR0ciB8fCB7fVxuICB0aGlzLmNsYXNzU3R5bGUgPSBwcm9wcy5jbGFzc1N0eWxlIHx8IHt9XG4gIHRoaXMuc3R5bGUgPSBwcm9wcy5zdHlsZSB8fCB7fVxuICB0aGlzLmV2ZW50ID0gW11cbiAgdGhpcy5jaGlsZHJlbiA9IFtdXG4gIHRoaXMucHVyZUNoaWxkcmVuID0gW11cbn1cblxuRWxlbWVudC5wcm90b3R5cGUgPSBuZXcgTm9kZSgpXG5cbkVsZW1lbnQucHJvdG90eXBlLmFwcGVuZENoaWxkID0gZnVuY3Rpb24gKG5vZGUpIHtcblxuICByZW1vdmVJZkV4aXN0ZWQobm9kZSlcbiAgbm9kZS5wYXJlbnRSZWYgPSB0aGlzLnJlZlxuICB0aGlzLmNoaWxkcmVuLnB1c2gobm9kZSlcblxuICBpZiAodGhpcy5hdHRhY2hlZCkge1xuICAgIHNldEF0dGFjaGVkKG5vZGUsIHRoaXMuZGVwdGgpXG4gIH1cbiAgZWxzZSB7XG4gICAgc2V0RGV0YWNoZWQobm9kZSlcbiAgfVxuXG4gIGlmIChub2RlIGluc3RhbmNlb2YgRWxlbWVudCkge1xuICAgIHRoaXMucHVyZUNoaWxkcmVuLnB1c2gobm9kZSlcblxuICAgIGlmICh0aGlzLmF0dGFjaGVkKSB7XG4gICAgICBjb25zdCByZW5kZXJlciA9IHRoaXMuZ2V0UmVuZGVyZXIoKVxuICAgICAgaWYgKHJlbmRlcmVyKSB7XG4gICAgICAgIGlmICh0aGlzLnJlZiA9PT0gJ19kb2N1bWVudEVsZW1lbnQnKSB7XG4gICAgICAgICAgLy8gaWYgaXRzIHBhcmVudCBpcyBkb2N1bWVudEVsZW1lbnQgdGhlbiBpdCdzIGEgYm9keVxuICAgICAgICAgIHJlbmRlcmVyLmNyZWF0ZUJvZHkobm9kZSwgdGhpcy5yZWYpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgcmVuZGVyZXIuYWRkRWxlbWVudChub2RlLCB0aGlzLnJlZilcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5FbGVtZW50LnByb3RvdHlwZS5pbnNlcnRCZWZvcmUgPSBmdW5jdGlvbiAobm9kZSwgYmVmb3JlKSB7XG5cbiAgaWYgKG5vZGUucGFyZW50UmVmID09PSB0aGlzLnJlZikge1xuICAgIG1vdmVCZWZvcmUobm9kZSwgYmVmb3JlLCB0aGlzLmNoaWxkcmVuKVxuICAgIGlmIChub2RlIGluc3RhbmNlb2YgRWxlbWVudCkge1xuICAgICAgY29uc3QgcHVyZUJlZm9yZUluZGV4ID0gbW92ZVB1cmVCZWZvcmUobm9kZSwgYmVmb3JlLCB0aGlzLnB1cmVDaGlsZHJlbilcbiAgICAgIGlmIChwdXJlQmVmb3JlSW5kZXggPj0gMCAmJiB0aGlzLmF0dGFjaGVkKSB7XG4gICAgICAgIGNvbnN0IHJlbmRlcmVyID0gdGhpcy5nZXRSZW5kZXJlcigpXG4gICAgICAgIGlmIChyZW5kZXJlcikge1xuICAgICAgICAgIHJlbmRlcmVyLm1vdmVFbGVtZW50KG5vZGUucmVmLCB0aGlzLnJlZiwgcHVyZUJlZm9yZUluZGV4KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVyblxuICB9XG5cbiAgcmVtb3ZlSWZFeGlzdGVkKG5vZGUpXG5cbiAgY29uc3QgY2hpbGRyZW4gPSB0aGlzLmNoaWxkcmVuXG4gIGNvbnN0IGluZGV4ID0gY2hpbGRyZW4uaW5kZXhPZihiZWZvcmUpXG5cbiAgbm9kZS5wYXJlbnRSZWYgPSB0aGlzLnJlZlxuICBpZiAodGhpcy5hdHRhY2hlZCkge1xuICAgIHNldEF0dGFjaGVkKG5vZGUsIHRoaXMuZGVwdGgpXG4gIH1cbiAgZWxzZSB7XG4gICAgc2V0RGV0YWNoZWQobm9kZSlcbiAgfVxuICBjaGlsZHJlbi5zcGxpY2UoaW5kZXgsIDAsIG5vZGUpXG5cbiAgaWYgKG5vZGUgaW5zdGFuY2VvZiBFbGVtZW50KSB7XG4gICAgY29uc3QgcHVyZUNoaWxkcmVuID0gdGhpcy5wdXJlQ2hpbGRyZW5cbiAgICBjb25zdCBwdXJlSW5kZXggPSBnZXRQdXJlQWZ0ZXIoYmVmb3JlLCBwdXJlQ2hpbGRyZW4pXG5cbiAgICBwdXJlQ2hpbGRyZW4uc3BsaWNlKHB1cmVJbmRleCwgMCwgbm9kZSlcblxuICAgIGlmICh0aGlzLmF0dGFjaGVkKSB7XG4gICAgICBjb25zdCByZW5kZXJlciA9IHRoaXMuZ2V0UmVuZGVyZXIoKVxuICAgICAgaWYgKHJlbmRlcmVyKSB7XG4gICAgICAgIHJlbmRlcmVyLmFkZEVsZW1lbnQobm9kZSwgdGhpcy5yZWYsIHB1cmVJbmRleClcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuRWxlbWVudC5wcm90b3R5cGUuaW5zZXJ0QWZ0ZXIgPSBmdW5jdGlvbiAobm9kZSwgYWZ0ZXIpIHtcblxuICBpZiAobm9kZS5wYXJlbnRSZWYgPT09IHRoaXMucmVmKSB7XG4gICAgbW92ZUFmdGVyKG5vZGUsIGFmdGVyLCB0aGlzLmNoaWxkcmVuKVxuICAgIGlmIChub2RlIGluc3RhbmNlb2YgRWxlbWVudCkge1xuICAgICAgY29uc3QgcHVyZUFmdGVySW5kZXggPSBtb3ZlUHVyZUFmdGVyKG5vZGUsIGFmdGVyLCB0aGlzLnB1cmVDaGlsZHJlbilcbiAgICAgIGlmIChwdXJlQWZ0ZXJJbmRleCA+PSAwICYmIHRoaXMuYXR0YWNoZWQpIHtcbiAgICAgICAgY29uc3QgcmVuZGVyZXIgPSB0aGlzLmdldFJlbmRlcmVyKClcbiAgICAgICAgaWYgKHJlbmRlcmVyKSB7XG4gICAgICAgICAgcmVuZGVyZXIubW92ZUVsZW1lbnQobm9kZS5yZWYsIHRoaXMucmVmLCBwdXJlQWZ0ZXJJbmRleClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm5cbiAgfVxuXG4gIHJlbW92ZUlmRXhpc3RlZChub2RlKVxuXG4gIGNvbnN0IGNoaWxkcmVuID0gdGhpcy5jaGlsZHJlblxuICBjb25zdCBpbmRleCA9IGNoaWxkcmVuLmluZGV4T2YoYWZ0ZXIpXG5cbiAgbm9kZS5wYXJlbnRSZWYgPSB0aGlzLnJlZlxuICBpZiAodGhpcy5hdHRhY2hlZCkge1xuICAgIHNldEF0dGFjaGVkKG5vZGUsIHRoaXMuZGVwdGgpXG4gIH1cbiAgZWxzZSB7XG4gICAgc2V0RGV0YWNoZWQobm9kZSlcbiAgfVxuICBjaGlsZHJlbi5zcGxpY2UoaW5kZXggKyAxLCAwLCBub2RlKVxuXG4gIGlmIChub2RlIGluc3RhbmNlb2YgRWxlbWVudCkge1xuICAgIGNvbnN0IHB1cmVDaGlsZHJlbiA9IHRoaXMucHVyZUNoaWxkcmVuXG4gICAgY29uc3QgcHVyZUluZGV4ID0gZ2V0UHVyZUJlZm9yZShhZnRlciwgcHVyZUNoaWxkcmVuKVxuXG4gICAgcHVyZUNoaWxkcmVuLnNwbGljZShwdXJlSW5kZXggKyAxLCAwLCBub2RlKVxuXG4gICAgaWYgKHRoaXMuYXR0YWNoZWQpIHtcbiAgICAgIGNvbnN0IHJlbmRlcmVyID0gdGhpcy5nZXRSZW5kZXJlcigpXG4gICAgICBpZiAocmVuZGVyZXIpIHtcbiAgICAgICAgcmVuZGVyZXIuYWRkRWxlbWVudChub2RlLCB0aGlzLnJlZiwgcHVyZUluZGV4ICsgMSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuRWxlbWVudC5wcm90b3R5cGUucmVtb3ZlQ2hpbGQgPSBmdW5jdGlvbiAobm9kZSwgcHJlc2VydmVkKSB7XG4gIGNvbnN0IGNoaWxkcmVuID0gdGhpcy5jaGlsZHJlblxuICBjb25zdCBpbmRleCA9IGNoaWxkcmVuLmluZGV4T2Yobm9kZSlcblxuICBzZXREZXRhY2hlZChub2RlKVxuXG4gIGlmIChpbmRleCA+PSAwKSB7XG4gICAgbm9kZS5wYXJlbnRSZWYgPSBudWxsXG4gICAgY2hpbGRyZW4uc3BsaWNlKGluZGV4LCAxKVxuICAgIGlmICghcHJlc2VydmVkKSB7XG4gICAgICBub2RlLmRlc3Ryb3koKVxuICAgIH1cbiAgfVxuXG4gIGlmIChub2RlIGluc3RhbmNlb2YgRWxlbWVudCkge1xuICAgIHRoaXMucHVyZUNoaWxkcmVuLiRyZW1vdmUobm9kZSlcbiAgICBpZiAodGhpcy5hdHRhY2hlZCkge1xuICAgICAgY29uc3QgcmVuZGVyZXIgPSB0aGlzLmdldFJlbmRlcmVyKClcbiAgICAgIGlmIChyZW5kZXJlcikge1xuICAgICAgICByZW5kZXJlci5yZW1vdmVFbGVtZW50KG5vZGUucmVmKVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5FbGVtZW50LnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgY2hpbGRyZW4gPSB0aGlzLmNoaWxkcmVuXG4gIGNvbnN0IGxlbmd0aCA9IGNoaWxkcmVuLmxlbmd0aFxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgY2hpbGQgPSBjaGlsZHJlbltpXVxuICAgIGNoaWxkLnBhcmVudFJlZiA9IG51bGxcbiAgICBzZXREZXRhY2hlZChjaGlsZClcbiAgICBjaGlsZC5kZXN0cm95KClcbiAgfVxuICBjaGlsZHJlbi5sZW5ndGggPSAwXG5cbiAgaWYgKHRoaXMuYXR0YWNoZWQpIHtcbiAgICBjb25zdCByZWZzID0gdGhpcy5wdXJlQ2hpbGRyZW4ubWFwKChjaGlsZCkgPT4gY2hpbGQucmVmKVxuICAgIHRoaXMucHVyZUNoaWxkcmVuLmxlbmd0aCA9IDBcbiAgICBjb25zdCByZW5kZXJlciA9IHRoaXMuZ2V0UmVuZGVyZXIoKVxuICAgIGlmIChyZW5kZXJlcikge1xuICAgICAgcmVuZGVyZXIucmVtb3ZlRWxlbWVudChyZWZzKVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBtb3ZlQmVmb3JlKG5vZGUsIGJlZm9yZSwgY2hpbGRyZW4pIHtcbiAgY29uc3QgdGFyZ2V0SW5kZXggPSBjaGlsZHJlbi5pbmRleE9mKG5vZGUpXG4gIGNvbnN0IGJlZm9yZUluZGV4ID0gY2hpbGRyZW4uaW5kZXhPZihiZWZvcmUpXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgaWYgKHRhcmdldEluZGV4ID09PSBiZWZvcmVJbmRleCB8fCB0YXJnZXRJbmRleCArIDEgPT09IGJlZm9yZUluZGV4KSB7XG4gICAgcmV0dXJuIC0xXG4gIH1cblxuICBjb25zdCBuZXdJbmRleCA9IHRhcmdldEluZGV4IDwgYmVmb3JlSW5kZXggPyBiZWZvcmVJbmRleCAtIDEgOiBiZWZvcmVJbmRleFxuICBjaGlsZHJlbi5zcGxpY2UodGFyZ2V0SW5kZXgsIDEpXG4gIGNoaWxkcmVuLnNwbGljZShuZXdJbmRleCwgMCwgbm9kZSlcblxuICByZXR1cm4gYmVmb3JlSW5kZXhcbn1cblxuZnVuY3Rpb24gbW92ZVB1cmVCZWZvcmUobm9kZSwgYmVmb3JlLCBwdXJlQ2hpbGRyZW4pIHtcbiAgY29uc3QgcHVyZVRhcmdldEluZGV4ID0gcHVyZUNoaWxkcmVuLmluZGV4T2Yobm9kZSlcbiAgY29uc3QgcHVyZUJlZm9yZUluZGV4ID0gZ2V0UHVyZUFmdGVyKGJlZm9yZSwgcHVyZUNoaWxkcmVuKVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIGlmIChwdXJlVGFyZ2V0SW5kZXggPT09IHB1cmVCZWZvcmVJbmRleCB8fFxuICAgIHB1cmVUYXJnZXRJbmRleCArIDEgPT09IHB1cmVCZWZvcmVJbmRleCkge1xuICAgIHJldHVybiAtMVxuICB9XG5cbiAgY29uc3QgcHVyZU5ld0luZGV4ID0gcHVyZVRhcmdldEluZGV4IDwgcHVyZUJlZm9yZUluZGV4XG4gICAgPyBwdXJlQmVmb3JlSW5kZXggLSAxXG4gICAgOiBwdXJlQmVmb3JlSW5kZXhcblxuICBwdXJlQ2hpbGRyZW4uc3BsaWNlKHB1cmVUYXJnZXRJbmRleCwgMSlcbiAgcHVyZUNoaWxkcmVuLnNwbGljZShwdXJlTmV3SW5kZXgsIDAsIG5vZGUpXG5cbiAgcmV0dXJuIHB1cmVCZWZvcmVJbmRleFxufVxuXG5mdW5jdGlvbiBnZXRQdXJlQWZ0ZXIobm9kZSwgcHVyZUNoaWxkcmVuKSB7XG4gIGxldCBwdXJlSW5kZXggPSBwdXJlQ2hpbGRyZW4uaW5kZXhPZihub2RlKVxuICB3aGlsZSAobm9kZSAmJiBwdXJlSW5kZXggPCAwKSB7XG4gICAgbm9kZSA9IG5vZGUubmV4dCgpXG4gICAgcHVyZUluZGV4ID0gcHVyZUNoaWxkcmVuLmluZGV4T2Yobm9kZSlcbiAgfVxuICBpZiAocHVyZUluZGV4IDwgMCkge1xuICAgIHB1cmVJbmRleCA9IHB1cmVDaGlsZHJlbi5sZW5ndGhcbiAgfVxuICByZXR1cm4gcHVyZUluZGV4XG59XG5cbmZ1bmN0aW9uIG1vdmVBZnRlcihub2RlLCBhZnRlciwgY2hpbGRyZW4pIHtcbiAgY29uc3QgdGFyZ2V0SW5kZXggPSBjaGlsZHJlbi5pbmRleE9mKG5vZGUpXG4gIGNvbnN0IGFmdGVySW5kZXggPSBjaGlsZHJlbi5pbmRleE9mKGFmdGVyKVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIGlmICh0YXJnZXRJbmRleCA9PT0gYWZ0ZXJJbmRleCB8fCB0YXJnZXRJbmRleCA9PT0gYWZ0ZXJJbmRleCArIDEpIHtcbiAgICByZXR1cm4gLTFcbiAgfVxuXG4gIGNvbnN0IG5ld0luZGV4ID0gdGFyZ2V0SW5kZXggPCBhZnRlckluZGV4ID8gYWZ0ZXJJbmRleCA6IGFmdGVySW5kZXggKyAxXG4gIGNoaWxkcmVuLnNwbGljZSh0YXJnZXRJbmRleCwgMSlcbiAgY2hpbGRyZW4uc3BsaWNlKG5ld0luZGV4LCAwLCBub2RlKVxuXG4gIHJldHVybiBhZnRlckluZGV4XG59XG5cbmZ1bmN0aW9uIG1vdmVQdXJlQWZ0ZXIobm9kZSwgYWZ0ZXIsIHB1cmVDaGlsZHJlbikge1xuICBjb25zdCBwdXJlVGFyZ2V0SW5kZXggPSBwdXJlQ2hpbGRyZW4uaW5kZXhPZihub2RlKVxuICBjb25zdCBwdXJlQWZ0ZXJJbmRleCA9IGdldFB1cmVCZWZvcmUoYWZ0ZXIsIHB1cmVDaGlsZHJlbilcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBpZiAocHVyZVRhcmdldEluZGV4ID09PSBwdXJlQWZ0ZXJJbmRleCB8fFxuICAgIHB1cmVUYXJnZXRJbmRleCA9PT0gcHVyZUFmdGVySW5kZXggKyAxKSB7XG4gICAgcmV0dXJuIC0xXG4gIH1cblxuICBjb25zdCBwdXJlTmV3SW5kZXggPSBwdXJlVGFyZ2V0SW5kZXggPCBwdXJlQWZ0ZXJJbmRleFxuICAgID8gcHVyZUFmdGVySW5kZXhcbiAgICA6IHB1cmVBZnRlckluZGV4ICsgMVxuXG4gIHB1cmVDaGlsZHJlbi5zcGxpY2UocHVyZVRhcmdldEluZGV4LCAxKVxuICBwdXJlQ2hpbGRyZW4uc3BsaWNlKHB1cmVOZXdJbmRleCwgMCwgbm9kZSlcblxuICByZXR1cm4gcHVyZUFmdGVySW5kZXggKyAxXG59XG5cbmZ1bmN0aW9uIGdldFB1cmVCZWZvcmUobm9kZSwgcHVyZUNoaWxkcmVuKSB7XG4gIGxldCBwdXJlSW5kZXggPSBwdXJlQ2hpbGRyZW4uaW5kZXhPZihub2RlKVxuICB3aGlsZSAobm9kZSAmJiBwdXJlSW5kZXggPCAwKSB7XG4gICAgbm9kZSA9IG5vZGUucHJldigpXG4gICAgcHVyZUluZGV4ID0gcHVyZUNoaWxkcmVuLmluZGV4T2Yobm9kZSlcbiAgfVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBpZiAocHVyZUluZGV4IDwgMCkge1xuICAgIHB1cmVJbmRleCA9IC0xXG4gIH1cbiAgcmV0dXJuIHB1cmVJbmRleFxufVxuXG5mdW5jdGlvbiBzZXRBdHRhY2hlZChub2RlLCBkZXB0aCkge1xuICBpZiAobm9kZS5yZWYgPT09ICdfcm9vdCcpIHtcbiAgICBkZXB0aCA9IDFcbiAgfVxuICBlbHNlIHtcbiAgICBkZXB0aCA9IGRlcHRoID4gMCA/IGRlcHRoICsgMSA6IDBcbiAgfVxuICBub2RlLmF0dGFjaGVkID0gdHJ1ZVxuICBub2RlLmRlcHRoID0gZGVwdGhcbiAgaWYgKG5vZGUuY2hpbGRyZW4pIHtcbiAgICBub2RlLmNoaWxkcmVuLmZvckVhY2goKHN1YikgPT4ge1xuICAgICAgc2V0QXR0YWNoZWQoc3ViLCBkZXB0aClcbiAgICB9KVxuICB9XG59XG5cbmZ1bmN0aW9uIHNldERldGFjaGVkKG5vZGUpIHtcbiAgbm9kZS5hdHRhY2hlZCA9IGZhbHNlXG4gIG5vZGUuZGVwdGggPSAwXG4gIGlmIChub2RlLmNoaWxkcmVuKSB7XG4gICAgbm9kZS5jaGlsZHJlbi5mb3JFYWNoKChzdWIpID0+IHtcbiAgICAgIHNldERldGFjaGVkKHN1YilcbiAgICB9KVxuICB9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUlmRXhpc3RlZChub2RlKSB7XG4gIGNvbnN0IGRvYyA9IGluc3RhbmNlTWFwW25vZGUuaW5zdGFuY2VJZF1cbiAgaWYgKGRvYykge1xuICAgIGNvbnN0IGV4aXN0ZWROb2RlID0gZG9jLmdldFJlZihub2RlLnJlZilcbiAgICBpZiAoZXhpc3RlZE5vZGUpIHtcbiAgICAgIGNvbnN0IGV4aXN0ZWRQYXJlbnQgPSBkb2MuZ2V0UmVmKGV4aXN0ZWROb2RlLnBhcmVudFJlZilcbiAgICAgIGlmIChleGlzdGVkUGFyZW50ICYmIGV4aXN0ZWRQYXJlbnQucmVtb3ZlQ2hpbGQpIHtcbiAgICAgICAgZXhpc3RlZFBhcmVudC5yZW1vdmVDaGlsZChleGlzdGVkTm9kZSwgdHJ1ZSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuRWxlbWVudC5wcm90b3R5cGUuc2V0QXR0ciA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gIGlmICh0aGlzLmF0dHJba2V5XSA9PT0gdmFsdWUpIHtcbiAgICByZXR1cm5cbiAgfVxuICB0aGlzLmF0dHJba2V5XSA9IHZhbHVlXG4gIGlmICh0aGlzLmF0dGFjaGVkKSB7XG4gICAgY29uc3QgcmVuZGVyZXIgPSB0aGlzLmdldFJlbmRlcmVyKClcbiAgICBpZiAocmVuZGVyZXIpIHtcbiAgICAgIHJlbmRlcmVyLnNldEF0dHIodGhpcy5yZWYsIGtleSwgdmFsdWUpXG4gICAgfVxuICB9XG59XG5cbkVsZW1lbnQucHJvdG90eXBlLnNldFN0eWxlID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgaWYgKHRoaXMuc3R5bGVba2V5XSA9PT0gdmFsdWUpIHtcbiAgICByZXR1cm5cbiAgfVxuICB0aGlzLnN0eWxlW2tleV0gPSB2YWx1ZVxuICBpZiAodGhpcy5hdHRhY2hlZCkge1xuICAgIGNvbnN0IHJlbmRlcmVyID0gdGhpcy5nZXRSZW5kZXJlcigpXG4gICAgaWYgKHJlbmRlcmVyKSB7XG4gICAgICByZW5kZXJlci5zZXRTdHlsZSh0aGlzLnJlZiwga2V5LCB2YWx1ZSlcbiAgICB9XG4gIH1cbn1cblxuRWxlbWVudC5wcm90b3R5cGUuc2V0Q2xhc3NTdHlsZSA9IGZ1bmN0aW9uIChjbGFzc1N0eWxlKSB7XG4gIHRoaXMuY2xhc3NTdHlsZSA9IGNsYXNzU3R5bGVcbiAgaWYgKHRoaXMuYXR0YWNoZWQpIHtcbiAgICBjb25zdCByZW5kZXJlciA9IHRoaXMuZ2V0UmVuZGVyZXIoKVxuICAgIGlmIChyZW5kZXJlcikge1xuICAgICAgcmVuZGVyZXIuc2V0U3R5bGVzKHRoaXMucmVmLCB0aGlzLnRvU3R5bGUoKSlcbiAgICB9XG4gIH1cbn1cblxuRWxlbWVudC5wcm90b3R5cGUuYWRkRXZlbnQgPSBmdW5jdGlvbiAodHlwZSwgaGFuZGxlcikge1xuICBjb25zdCBpbmRleCA9IHRoaXMuZXZlbnQuaW5kZXhPZih0eXBlKVxuXG4gIGlmIChpbmRleCA8IDApIHtcbiAgICB0aGlzLmV2ZW50LnB1c2godHlwZSlcbiAgICBsZXQgZXZlbnRNYW5hZ2VyID0gdGhpcy5vd25lckRvY3VtZW50LmV2ZW50TWFuYWdlclxuICAgIGV2ZW50TWFuYWdlci5hZGQodGhpcywgdHlwZSwgaGFuZGxlcilcblxuICAgIGlmICh0aGlzLmF0dGFjaGVkKSB7XG4gICAgICBjb25zdCByZW5kZXJlciA9IHRoaXMuZ2V0UmVuZGVyZXIoKVxuICAgICAgaWYgKHJlbmRlcmVyKSB7XG4gICAgICAgIHJlbmRlcmVyLmFkZEV2ZW50KHRoaXMucmVmLCB0eXBlKVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5FbGVtZW50LnByb3RvdHlwZS5yZW1vdmVFdmVudCA9IGZ1bmN0aW9uICh0eXBlKSB7XG4gIGNvbnN0IGluZGV4ID0gdGhpcy5ldmVudC5pbmRleE9mKHR5cGUpXG5cbiAgaWYgKGluZGV4ID49IDApIHtcbiAgICB0aGlzLmV2ZW50LnNwbGljZShpbmRleCwgMSlcbiAgICBsZXQgZXZlbnRNYW5hZ2VyID0gdGhpcy5vd25lckRvY3VtZW50LmV2ZW50TWFuYWdlclxuICAgIGV2ZW50TWFuYWdlci5yZW1vdmUodGhpcywgdHlwZSlcblxuICAgIGlmICh0aGlzLmF0dGFjaGVkKSB7XG4gICAgICBjb25zdCByZW5kZXJlciA9IHRoaXMuZ2V0UmVuZGVyZXIoKVxuICAgICAgaWYgKHJlbmRlcmVyKSB7XG4gICAgICAgIHJlbmRlcmVyLnJlbW92ZUV2ZW50KHRoaXMucmVmLCB0eXBlKVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5FbGVtZW50LnByb3RvdHlwZS50b1N0eWxlID0gZnVuY3Rpb24gKCkge1xuICBjb25zdCByZXN1bHQgPSB7fVxuICBjb25zdCBjbGFzc1N0eWxlID0gdGhpcy5jbGFzc1N0eWxlXG4gIGNvbnN0IHN0eWxlID0gdGhpcy5zdHlsZVxuICBmb3IgKGNvbnN0IG5hbWUgaW4gY2xhc3NTdHlsZSkge1xuICAgIHJlc3VsdFtuYW1lXSA9IGNsYXNzU3R5bGVbbmFtZV1cbiAgfVxuICBmb3IgKGNvbnN0IG5hbWUgaW4gc3R5bGUpIHtcbiAgICByZXN1bHRbbmFtZV0gPSBzdHlsZVtuYW1lXVxuICB9XG4gIHJldHVybiByZXN1bHRcbn1cblxuRWxlbWVudC5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gKCkge1xuICBjb25zdCByZXN1bHQgPSB7XG4gICAgcmVmOiB0aGlzLnJlZi50b1N0cmluZygpLFxuICAgIHR5cGU6IHRoaXMudHlwZSxcbiAgICBhdHRyOiB0aGlzLmF0dHIsXG4gICAgc3R5bGU6IHRoaXMudG9TdHlsZSgpXG4gIH1cblxuICBpZiAodGhpcy5ldmVudCAmJiB0aGlzLmV2ZW50Lmxlbmd0aCkge1xuICAgIHJlc3VsdC5ldmVudCA9IHRoaXMuZXZlbnRcbiAgfVxuICBpZiAodGhpcy5wdXJlQ2hpbGRyZW4gJiYgdGhpcy5wdXJlQ2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgcmVzdWx0LmNoaWxkcmVuID0gdGhpcy5wdXJlQ2hpbGRyZW4ubWFwKChjaGlsZCkgPT4gY2hpbGQudG9KU09OKCkpXG4gIH1cblxuICByZXR1cm4gcmVzdWx0XG59XG5cbkVsZW1lbnQucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gJzwnICsgdGhpcy50eXBlICtcbiAgICAnIGF0dHI9JyArIEpTT04uc3RyaW5naWZ5KHRoaXMuYXR0cikgK1xuICAgICcgc3R5bGU9JyArIEpTT04uc3RyaW5naWZ5KHRoaXMudG9TdHlsZSgpKSArICc+JyArXG4gICAgdGhpcy5wdXJlQ2hpbGRyZW4ubWFwKChjaGlsZCkgPT4gY2hpbGQudG9TdHJpbmcoKSkuam9pbignJykgK1xuICAgICc8LycgKyB0aGlzLnR5cGUgKyAnPidcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIENvbW1lbnQodmFsdWUsIG93bmVyRG9jdW1lbnQpIHtcbiAgdGhpcy5jcmVhdGUob3duZXJEb2N1bWVudC5pZClcbiAgdGhpcy50eXBlID0gJ2NvbW1lbnQnXG4gIHRoaXMudmFsdWUgPSB2YWx1ZVxufVxuXG5Db21tZW50LnByb3RvdHlwZSA9IG5ldyBOb2RlKClcblxuQ29tbWVudC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiAnPCEtLSAnICsgdGhpcy52YWx1ZSArICcgLS0+J1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9saWIvYXBwL2RvbS5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0ge1xuXHRcIm5hbWVcIjogXCJ3ZWV4LWpzZnJhbWV3b3JrXCIsXG5cdFwidmVyc2lvblwiOiBcIjAuMTMuOVwiLFxuXHRcImRlc2NyaXB0aW9uXCI6IFwiSlMgRnJhbWV3b3JrIGZvciBXZWV4IHNvbHV0aW9uIHdoaWNoIGlzIGEgZXh0ZW5kYWJsZSBjcm9zcy1wbGF0Zm9ybSBzb2x1dGlvbiBmb3IgZHluYW1pYyBwcm9ncmFtbWluZyBhbmQgcHVibGlzaGluZyBwcm9qZWN0c1wiLFxuXHRcIm1haW5cIjogXCJpbmRleC5qc1wiLFxuXHRcInNjcmlwdHNcIjoge1xuXHRcdFwiZGV2XCI6IFwid2VicGFjayAtLXdhdGNoIC0tY29uZmlnIC4vd2VicGFjay5jb25maWcuanNcIixcblx0XHRcImJ1aWxkXCI6IFwid2VicGFjayAtLWNvbmZpZyAuL3dlYnBhY2suY29uZmlnLmpzXCIsXG5cdFx0XCJjb21wcmVzc1wiOiBcInVnbGlmeWpzIGRpc3QvaW5kZXguanMgLW8gZGlzdC9pbmRleC5taW4uanNcIixcblx0XHRcImxpbnRcIjogXCJqc2NzIC0tY29uZmlnIC5qc2NzcmMgcG9seWZpbGwvKi5qcyBwb2x5ZmlsbC9fX3Rlc3RfXy8qLmpzIGxpYi8qLmpzIGxpYi9fX3Rlc3RfXy8qLmpzIGxpYi9hcHAvKi5qcyBsaWIvYXBwL19fdGVzdF9fLyouanMgbGliL3ZtLyouanMgbGliL3ZtL19fdGVzdF9fLyouanNcIixcblx0XHRcInRlc3RcIjogXCJtb2NoYSAtLWNvbXBpbGVycyBqczpiYWJlbC1jb3JlL3JlZ2lzdGVyIHBvbHlmaWxsL19fdGVzdF9fLyouanMgbGliL19fdGVzdF9fLyouanMgbGliLyoqL19fdGVzdF9fLyouanNcIixcblx0XHRcImNvdmVyXCI6IFwiYmFiZWwtbm9kZSBub2RlX21vZHVsZXMvaXNwYXJ0YS9iaW4vaXNwYXJ0YSBjb3ZlciAtLXJlcG9ydCB0ZXh0IG5vZGVfbW9kdWxlcy9tb2NoYS9iaW4vX21vY2hhIC0tIC0tcmVwb3J0ZXIgZG90IGxpYi9fX3Rlc3RfXy8qLmpzIGxpYi8qKi9fX3Rlc3RfXy8qLmpzXCIsXG5cdFx0XCJjaVwiOiBcIm5wbSBydW4gbGludCAmJiBucG0gcnVuIGNvdmVyXCJcblx0fSxcblx0XCJyZXBvc2l0b3J5XCI6IHtcblx0XHRcInR5cGVcIjogXCJnaXRcIixcblx0XHRcInVybFwiOiBcImdpdEBnaXRodWIuY29tOmFsaWJhYmEvd2VleC5naXRcIlxuXHR9LFxuXHRcImF1dGhvclwiOiBbXG5cdFx0e1xuXHRcdFx0XCJuYW1lXCI6IFwiamluamlhbmdcIixcblx0XHRcdFwiZW1haWxcIjogXCJ6aGFvamluamlhbmdAbWUuY29tXCJcblx0XHR9LFxuXHRcdHtcblx0XHRcdFwibmFtZVwiOiBcIlRlcnJ5IEtpbmdcIixcblx0XHRcdFwiZW1haWxcIjogXCJ0ZXJyeWtpbmdjaGFAZ21haWwuY29tXCJcblx0XHR9XG5cdF0sXG5cdFwiY29udHJpYnV0b3JzXCI6IFtcblx0XHR7XG5cdFx0XHRcIm5hbWVcIjogXCJwdXNoaW1pbmdcIixcblx0XHRcdFwiZW1haWxcIjogXCJwdXNoaW1pbmdAZ21haWwuY29tXCJcblx0XHR9LFxuXHRcdHtcblx0XHRcdFwibmFtZVwiOiBcImlza2VuaHVhbmdcIixcblx0XHRcdFwiZW1haWxcIjogXCJpc2tlbmh1YW5nQGdtYWlsLmNvbVwiXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRcIm5hbWVcIjogXCJ5dWFueWFuXCIsXG5cdFx0XHRcImVtYWlsXCI6IFwieXVhbnlhbi5jYW9AZ21haWwuY29tXCJcblx0XHR9XG5cdF0sXG5cdFwia2V5d29yZHNcIjogW1xuXHRcdFwid2VleFwiLFxuXHRcdFwibXZ2bVwiLFxuXHRcdFwiYnJvd3NlclwiLFxuXHRcdFwiaHlicmlkXCIsXG5cdFx0XCJmcmFtZXdvcmtcIlxuXHRdLFxuXHRcImxpY2Vuc2VcIjogXCJBcGFjaGUtMi4wXCIsXG5cdFwiZGVwZW5kZW5jaWVzXCI6IHtcblx0XHRcInNlbXZlclwiOiBcIn41LjEuMFwiLFxuXHRcdFwiY29yZS1qc1wiOiBcIn4yLjEuMVwiXG5cdH0sXG5cdFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcblx0XHRcImJhYmVsLWNsaVwiOiBcIn42LjQuNVwiLFxuXHRcdFwiYmFiZWwtY29yZVwiOiBcIn42LjQuNVwiLFxuXHRcdFwiYmFiZWwtbG9hZGVyXCI6IFwifjYuMi4xXCIsXG5cdFx0XCJiYWJlbC1wcmVzZXQtZXMyMDE1XCI6IFwifjYuMy4xM1wiLFxuXHRcdFwiY2hhaVwiOiBcIn4zLjIuMFwiLFxuXHRcdFwiaXNwYXJ0YVwiOiBcIn40LjAuMFwiLFxuXHRcdFwiaXN0YW5idWxcIjogXCJ+MC40LjJcIixcblx0XHRcImpzY3NcIjogXCJ+Mi45LjBcIixcblx0XHRcImpzb24tbG9hZGVyXCI6IFwiXjAuNS40XCIsXG5cdFx0XCJtb2NoYVwiOiBcIn4yLjMuNFwiLFxuXHRcdFwic2lub25cIjogXCJ+MS4xNy4yXCIsXG5cdFx0XCJzaW5vbi1jaGFpXCI6IFwifjIuOC4wXCIsXG5cdFx0XCJ1Z2xpZnktanNcIjogXCJeMi42LjJcIixcblx0XHRcIndhdGNoLWNsaVwiOiBcIn4wLjIuMVwiLFxuXHRcdFwid2VicGFja1wiOiBcIn4xLjEyLjEyXCJcblx0fSxcblx0XCJvcHRpb25hbERlcGVuZGVuY2llc1wiOiB7XG5cdFx0XCJ3ZWV4LXRyYW5zZm9ybWVyXCI6IFwiPj0wLjEuNSA8MC40XCJcblx0fVxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vcGFja2FnZS5qc29uXG4gKiogbW9kdWxlIGlkID0gMTA1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIEBmaWxlT3ZlcnZpZXcgVGhlIGFwaSBmb3IgaW52b2tpbmcgd2l0aCBcIiRcIiBwcmVmaXhcbiAqL1xuaW1wb3J0IHt0eXBvZiwgZXh0ZW5kfSBmcm9tICcuLi91dGlsJ1xuXG4vKipcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIGNvbW1vblxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICovXG5cbi8qKlxuICogQGRlcHJlY2F0ZWQgdXNlICR2bSBpbnN0ZWFkXG4gKiBmaW5kIHRoZSB2bSBieSBpZFxuICogTm90ZTogdGhlcmUgaXMgb25seSBvbmUgaWQgaW4gd2hvbGUgY29tcG9uZW50XG4gKiBAcGFyYW0gIHtzdHJpbmd9IGlkXG4gKiBAcmV0dXJuIHtWbX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uICQoaWQpIHtcbiAgbmF0aXZlTG9nKCdbV0FSTklOR10gdGhlIFZtIyQgYXBpIGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgVm0jJHZtIGluc3RlYWQnKVxuICBjb25zdCBpbmZvID0gdGhpcy5faWRzW2lkXVxuICBpZiAoaW5mbykge1xuICAgIHJldHVybiBpbmZvLnZtXG4gIH1cbn1cblxuLyoqXG4gKiBmaW5kIHRoZSBlbGVtZW50IGJ5IGlkXG4gKiBOb3RlOiB0aGVyZSBpcyBvbmx5IG9uZSBpZCBpbiB3aG9sZSBjb21wb25lbnRcbiAqIEBwYXJhbSAge3N0cmluZ30gaWRcbiAqIEByZXR1cm4ge0VsZW1lbnR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiAkZWwoaWQpIHtcbiAgY29uc3QgaW5mbyA9IHRoaXMuX2lkc1tpZF1cbiAgaWYgKGluZm8pIHtcbiAgICByZXR1cm4gaW5mby5lbFxuICB9XG59XG5cbi8qKlxuICogZmluZCB0aGUgdm0gb2YgdGhlIGN1c3RvbSBjb21wb25lbnQgYnkgaWRcbiAqIE5vdGU6IHRoZXJlIGlzIG9ubHkgb25lIGlkIGluIHdob2xlIGNvbXBvbmVudFxuICogQHBhcmFtICB7c3RyaW5nfSBpZFxuICogQHJldHVybiB7Vm19XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiAkdm0oaWQpIHtcbiAgY29uc3QgaW5mbyA9IHRoaXMuX2lkc1tpZF1cbiAgaWYgKGluZm8pIHtcbiAgICByZXR1cm4gaW5mby52bVxuICB9XG59XG5cbi8qKlxuICogRmlyZSB3aGVuIGRpZmZlciByZW5kZXJpbmcgZmluaXNoZWRcbiAqXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gZm5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uICRyZW5kZXJUaGVuKGZuKSB7XG4gIGNvbnN0IGFwcCA9IHRoaXMuX2FwcFxuICBjb25zdCBkaWZmZXIgPSBhcHAuZGlmZmVyXG4gIHJldHVybiBkaWZmZXIudGhlbigoKSA9PiB7XG4gICAgZm4oKVxuICB9KVxufVxuXG4vKipcbiAqIHNjcm9sbCBhbiBlbGVtZW50IHNwZWNpZmllZCBieSBpZCBpbnRvIHZpZXcsIFxuICogbW9yZW92ZXIgc3BlY2lmeSBhIG51bWJlciBvZiBvZmZzZXQgb3B0aW9uYWxseVxuICogQHBhcmFtICB7c3RyaW5nfSBpZFxuICogQHBhcmFtICB7bnVtYmVyfSBvZmZzZXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uICRzY3JvbGxUbyhpZCwgb2Zmc2V0KSB7XG4gIGNvbnN0IGVsID0gdGhpcy4kZWwoaWQpXG4gIGlmIChlbCkge1xuICAgIGNvbnN0IGRvbSA9IHRoaXMuX2FwcC5yZXF1aXJlTW9kdWxlKCdkb20nKVxuICAgIGRvbS5zY3JvbGxUb0VsZW1lbnQoZWwucmVmLCB7b2Zmc2V0OiBvZmZzZXR9KVxuICB9XG59XG5cbi8qKlxuICogcGVyZm9ybSB0cmFuc2l0aW9uIGFuaW1hdGlvbiBvbiBhbiBlbGVtZW50IHNwZWNpZmllZCBieSBpZFxuICogQHBhcmFtICB7c3RyaW5nfSAgIGlkXG4gKiBAcGFyYW0gIHtvYmplY3R9ICAgb3B0aW9uc1xuICogQHBhcmFtICB7b2JqZWN0fSAgIG9wdGlvbnMuc3R5bGVzXG4gKiBAcGFyYW0gIHtvYmplY3R9ICAgb3B0aW9ucy5kdXJhdGlvbihtcylcbiAqIEBwYXJhbSAge29iamVjdH0gICBbb3B0aW9ucy50aW1pbmdGdW5jdGlvbl1cbiAqIEBwYXJhbSAge29iamVjdH0gICBbb3B0aW9ucy5kZWxheT0wKG1zKV1cbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBjYWxsYmFja1xuICovXG5leHBvcnQgZnVuY3Rpb24gJHRyYW5zaXRpb24oaWQsIG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gIGNvbnN0IGVsID0gdGhpcy4kZWwoaWQpXG4gIGlmIChlbCAmJiBvcHRpb25zICYmIG9wdGlvbnMuc3R5bGVzKSB7XG4gICAgY29uc3QgYW5pbWF0aW9uID0gdGhpcy5fYXBwLnJlcXVpcmVNb2R1bGUoJ2FuaW1hdGlvbicpXG4gICAgYW5pbWF0aW9uLnRyYW5zaXRpb24oZWwucmVmLCBvcHRpb25zLCAoLi4uYXJncykgPT4ge1xuICAgICAgdGhpcy5fc2V0U3R5bGUoZWwsIG9wdGlvbnMuc3R5bGVzKVxuICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soLi4uYXJncylcbiAgICB9KVxuICB9XG59XG5cbi8qKlxuICogZ2V0IHNvbWUgY29uZmlnXG4gKiBAcmV0dXJuIHtvYmplY3R9IHNvbWUgY29uZmlnIGZvciBhcHAgaW5zdGFuY2VcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBidW5kbGVVcmxcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gZGVidWdcbiAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBlbnZcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBlbnYud2VleFZlcnNpb24oZXguIDEuMC4wKVxuICogQHByb3BlcnR5IHtzdHJpbmd9IGVudi5hcHBOYW1lKGV4LiBUQi9UTSlcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBlbnYuYXBwVmVyc2lvbihleC4gNS4wLjApXG4gKiBAcHJvcGVydHkge3N0cmluZ30gZW52LnBsYXRmb3JtKGV4LiBpT1MvQW5kcm9pZClcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBlbnYub3NWZXJzaW9uKGV4LiA3LjAuMClcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBlbnYuZGV2aWNlTW9kZWwgKipuYXRpdmUgb25seSoqXG4gKiBAcHJvcGVydHkge251bWJlcn0gZW52LltkZXZpY2VXaWR0aD03NTBdXG4gKiBAcHJvcGVydHkge251bWJlcn0gZW52LmRldmljZUhlaWdodFxuICovXG5leHBvcnQgZnVuY3Rpb24gJGdldENvbmZpZyhjYWxsYmFjaykge1xuICBjb25zdCBjb25maWcgPSBleHRlbmQoe1xuICAgIGVudjogZ2xvYmFsLldYRW52aXJvbm1lbnQgfHwge31cbiAgfSwgdGhpcy5fYXBwLm9wdGlvbnMpXG4gIGlmICh0eXBvZihjYWxsYmFjaykgPT09ICdmdW5jdGlvbicpIHtcbiAgICBuYXRpdmVMb2coJ1tXQVJOSU5HXSB0aGUgY2FsbGJhY2sgb2YgVm0jJGdldENvbmZpZyhjYWxsYmFjaykgaXMgZGVwcmVjYXRlZCwgJyArXG4gICAgICAndGhpcyBhcGkgbm93IGNhbiBkaXJlY3RseSBSRVRVUk4gY29uZmlnIGluZm8uJylcbiAgICBjYWxsYmFjayhjb25maWcpXG4gIH1cbiAgcmV0dXJuIGNvbmZpZ1xufVxuXG4vKipcbiAqIHJlcXVlc3QgbmV0d29yayB2aWEgaHR0cCBwcm90b2NvbFxuICogQHBhcmFtICB7b2JqZWN0fSAgIHBhcmFtc1xuICogQHBhcmFtICB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiAkc2VuZEh0dHAocGFyYW1zLCBjYWxsYmFjaykge1xuICBjb25zdCBzdHJlYW0gPSB0aGlzLl9hcHAucmVxdWlyZU1vZHVsZSgnc3RyZWFtJylcbiAgc3RyZWFtLnNlbmRIdHRwKHBhcmFtcywgY2FsbGJhY2spXG59XG5cbi8qKlxuICogb3BlbiBhIHVybFxuICogQHBhcmFtICB7c3RyaW5nfSB1cmxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uICRvcGVuVVJMKHVybCkge1xuICBjb25zdCBldmVudCA9IHRoaXMuX2FwcC5yZXF1aXJlTW9kdWxlKCdldmVudCcpXG4gIGV2ZW50Lm9wZW5VUkwodXJsKVxufVxuXG4vKipcbiAqIHNldCBhIHRpdGxlIGZvciBwYWdlXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHRpdGxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiAkc2V0VGl0bGUodGl0bGUpIHtcbiAgY29uc3QgcGFnZUluZm8gPSB0aGlzLl9hcHAucmVxdWlyZU1vZHVsZSgncGFnZUluZm8nKVxuICBwYWdlSW5mby5zZXRUaXRsZSh0aXRsZSlcbn1cblxuLyoqXG4gKiBpbnZva2UgYSBuYXRpdmUgbWV0aG9kIGJ5IHNwZWNpZmluZyB0aGUgbmFtZSBvZiBtb2R1bGUgYW5kIG1ldGhvZFxuICogQHBhcmFtICB7c3RyaW5nfSBtb2R1bGVOYW1lXG4gKiBAcGFyYW0gIHtzdHJpbmd9IG1ldGhvZE5hbWVcbiAqIEBwYXJhbSAgey4uLip9IHRoZSByZXN0IGFyZ3VtZW50c1xuICovXG5leHBvcnQgZnVuY3Rpb24gJGNhbGwobW9kdWxlTmFtZSwgbWV0aG9kTmFtZSwgLi4uYXJncykge1xuICBjb25zdCBtb2R1bGUgPSB0aGlzLl9hcHAucmVxdWlyZU1vZHVsZShtb2R1bGVOYW1lKVxuICBpZiAobW9kdWxlICYmIG1vZHVsZVttZXRob2ROYW1lXSkge1xuICAgIG1vZHVsZVttZXRob2ROYW1lXSguLi5hcmdzKVxuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2xpYi9hcGkvbWV0aG9kcy5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=