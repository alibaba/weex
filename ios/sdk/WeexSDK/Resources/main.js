 (this.nativeLog || function(s) {console.log(s)})('START JS FRAMEWORK: 0.13.13 Build 20160630');
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
                                       
                                       /**
                                        * register methods
                                        */
                                       var methods = __webpack_require__(71);
                                       var _global = global;
                                       var registerMethods = _global.registerMethods;
                                       
                                       registerMethods(methods);
                                       /* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))
           
/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {
           
           /* WEBPACK VAR INJECTION */(function(global) {'use strict';
                                       
                                       __webpack_require__(2);
                                       
                                       var _runtime = __webpack_require__(43);
                                       
                                       var _runtime2 = _interopRequireDefault(_runtime);
                                       
                                       var _package = __webpack_require__(69);
                                       
                                       function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
                                       
                                       var _loop = function _loop(methodName) {
                                       global[methodName] = function () {
                                       var ret = _runtime2.default[methodName].apply(_runtime2.default, arguments);
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
                                       
                                       for (var methodName in _runtime2.default) {
                                       _loop(methodName);
                                       }
                                       
                                       Object.assign(global, {
                                                     frameworkVersion: _package.version,
                                                     needTransformerVersion: _package.optionalDependencies['weex-transformer']
                                                     });
                                       
                                       /**
                                        * register methods
                                        */
                                       var methods = __webpack_require__(70);
                                       var _global = global;
                                       var registerMethods = _global.registerMethods;
                                       
                                       registerMethods(methods);
                                       /* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))
           
/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {
           
           'use strict';
           
           __webpack_require__(3);
           
           __webpack_require__(41);
           
           __webpack_require__(42);
           
/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {
           
           'use strict';
           
           __webpack_require__(4);
           
/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {
           
           'use strict';
           
           __webpack_require__(5);
           module.exports = __webpack_require__(8).Object.assign;
           
/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {
           
           'use strict';
           
           // 19.1.3.1 Object.assign(target, source)
           var $export = __webpack_require__(6);
           
           $export($export.S + $export.F, 'Object', { assign: __webpack_require__(24) });
           
/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {
           
           'use strict';
           
           var global = __webpack_require__(7),
           core = __webpack_require__(8),
           hide = __webpack_require__(9),
           redefine = __webpack_require__(19),
           ctx = __webpack_require__(22),
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
/* 7 */
/***/ function(module, exports) {
           
           'use strict';
           
           // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
           var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
           if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
           
/***/ },
/* 8 */
/***/ function(module, exports) {
           
           'use strict';
           
           var core = module.exports = { version: '2.1.5' };
           if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
           
/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {
           
           'use strict';
           
           var dP = __webpack_require__(10),
           createDesc = __webpack_require__(18);
           module.exports = __webpack_require__(14) ? function (object, key, value) {
           return dP.f(object, key, createDesc(1, value));
           } : function (object, key, value) {
           object[key] = value;
           return object;
           };
           
/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {
           
           'use strict';
           
           var anObject = __webpack_require__(11),
           IE8_DOM_DEFINE = __webpack_require__(13),
           toPrimitive = __webpack_require__(17),
           dP = Object.defineProperty;
           
           exports.f = __webpack_require__(14) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
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
/* 11 */
/***/ function(module, exports, __webpack_require__) {
           
           'use strict';
           
           var isObject = __webpack_require__(12);
           module.exports = function (it) {
           if (!isObject(it)) throw TypeError(it + ' is not an object!');
           return it;
           };
           
/***/ },
/* 12 */
/***/ function(module, exports) {
           
           'use strict';
           
           var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
           
           module.exports = function (it) {
           return (typeof it === 'undefined' ? 'undefined' : _typeof(it)) === 'object' ? it !== null : typeof it === 'function';
           };
           
/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {
           
           'use strict';
           
           module.exports = !__webpack_require__(14) && !__webpack_require__(15)(function () {
                                                                                 return Object.defineProperty(__webpack_require__(16)('div'), 'a', { get: function get() {
                                                                                                              return 7;
                                                                                                              } }).a != 7;
                                                                                 });
           
/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {
           
           'use strict';
           
           // Thank's IE8 for his funny defineProperty
           module.exports = !__webpack_require__(15)(function () {
                                                     return Object.defineProperty({}, 'a', { get: function get() {
                                                                                  return 7;
                                                                                  } }).a != 7;
                                                     });
           
/***/ },
/* 15 */
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
/* 16 */
/***/ function(module, exports, __webpack_require__) {
           
           'use strict';
           
           var isObject = __webpack_require__(12),
           document = __webpack_require__(7).document
           // in old IE typeof document.createElement is 'object'
           ,
           is = isObject(document) && isObject(document.createElement);
           module.exports = function (it) {
           return is ? document.createElement(it) : {};
           };
           
/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {
           
           'use strict';
           
           // 7.1.1 ToPrimitive(input [, PreferredType])
           var isObject = __webpack_require__(12);
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
/* 18 */
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
/* 19 */
/***/ function(module, exports, __webpack_require__) {
           
           'use strict';
           
           var global = __webpack_require__(7),
           hide = __webpack_require__(9),
           has = __webpack_require__(20),
           SRC = __webpack_require__(21)('src'),
           TO_STRING = 'toString',
           $toString = Function[TO_STRING],
           TPL = ('' + $toString).split(TO_STRING);
           
           __webpack_require__(8).inspectSource = function (it) {
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
/* 20 */
/***/ function(module, exports) {
           
           "use strict";
           
           var hasOwnProperty = {}.hasOwnProperty;
           module.exports = function (it, key) {
           return hasOwnProperty.call(it, key);
           };
           
/***/ },
/* 21 */
/***/ function(module, exports) {
           
           'use strict';
           
           var id = 0,
           px = Math.random();
           module.exports = function (key) {
           return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
           };
           
/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {
           
           'use strict';
           
           // optional / simple context binding
           var aFunction = __webpack_require__(23);
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
/* 23 */
/***/ function(module, exports) {
           
           'use strict';
           
           module.exports = function (it) {
           if (typeof it != 'function') throw TypeError(it + ' is not a function!');
           return it;
           };
           
/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {
           
           'use strict';
           // 19.1.2.1 Object.assign(target, source, ...)
           
           var getKeys = __webpack_require__(25),
           gOPS = __webpack_require__(38),
           pIE = __webpack_require__(39),
           toObject = __webpack_require__(40),
           IObject = __webpack_require__(28),
           $assign = Object.assign;
           
           // should work with symbols and should have deterministic property order (V8 bug)
           module.exports = !$assign || __webpack_require__(15)(function () {
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
/* 25 */
/***/ function(module, exports, __webpack_require__) {
           
           'use strict';
           
           // 19.1.2.14 / 15.2.3.14 Object.keys(O)
           var $keys = __webpack_require__(26),
           enumBugKeys = __webpack_require__(37);
           
           module.exports = Object.keys || function keys(O) {
           return $keys(O, enumBugKeys);
           };
           
/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {
           
           'use strict';
           
           var has = __webpack_require__(20),
           toIObject = __webpack_require__(27),
           arrayIndexOf = __webpack_require__(31)(false),
           IE_PROTO = __webpack_require__(35)('IE_PROTO');
           
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
/* 27 */
/***/ function(module, exports, __webpack_require__) {
           
           'use strict';
           
           // to indexed object, toObject with fallback for non-array-like ES3 strings
           var IObject = __webpack_require__(28),
           defined = __webpack_require__(30);
           module.exports = function (it) {
           return IObject(defined(it));
           };
           
/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {
           
           'use strict';
           
           // fallback for non-array-like ES3 and non-enumerable old V8 strings
           var cof = __webpack_require__(29);
           module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
           return cof(it) == 'String' ? it.split('') : Object(it);
           };
           
/***/ },
/* 29 */
/***/ function(module, exports) {
           
           "use strict";
           
           var toString = {}.toString;
           
           module.exports = function (it) {
           return toString.call(it).slice(8, -1);
           };
           
/***/ },
/* 30 */
/***/ function(module, exports) {
           
           "use strict";
           
           // 7.2.1 RequireObjectCoercible(argument)
           module.exports = function (it) {
           if (it == undefined) throw TypeError("Can't call method on  " + it);
           return it;
           };
           
/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {
           
           'use strict';
           
           // false -> Array#indexOf
           // true  -> Array#includes
           var toIObject = __webpack_require__(27),
           toLength = __webpack_require__(32),
           toIndex = __webpack_require__(34);
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
/* 32 */
/***/ function(module, exports, __webpack_require__) {
           
           'use strict';
           
           // 7.1.15 ToLength
           var toInteger = __webpack_require__(33),
           min = Math.min;
           module.exports = function (it) {
           return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
           };
           
/***/ },
/* 33 */
/***/ function(module, exports) {
           
           "use strict";
           
           // 7.1.4 ToInteger
           var ceil = Math.ceil,
           floor = Math.floor;
           module.exports = function (it) {
           return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
           };
           
/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {
           
           'use strict';
           
           var toInteger = __webpack_require__(33),
           max = Math.max,
           min = Math.min;
           module.exports = function (index, length) {
           index = toInteger(index);
           return index < 0 ? max(index + length, 0) : min(index, length);
           };
           
/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {
           
           'use strict';
           
           var shared = __webpack_require__(36)('keys'),
           uid = __webpack_require__(21);
           module.exports = function (key) {
           return shared[key] || (shared[key] = uid(key));
           };
           
/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {
           
           'use strict';
           
           var global = __webpack_require__(7),
           SHARED = '__core-js_shared__',
           store = global[SHARED] || (global[SHARED] = {});
           module.exports = function (key) {
           return store[key] || (store[key] = {});
           };
           
/***/ },
/* 37 */
/***/ function(module, exports) {
           
           'use strict';
           
           // IE 8- don't enum bug keys
           module.exports = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(',');
           
/***/ },
/* 38 */
/***/ function(module, exports) {
           
           "use strict";
           
           exports.f = Object.getOwnPropertySymbols;
           
/***/ },
/* 39 */
/***/ function(module, exports) {
           
           "use strict";
           
           exports.f = {}.propertyIsEnumerable;
           
/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {
           
           'use strict';
           
           // 7.1.13 ToObject(argument)
           var defined = __webpack_require__(30);
           module.exports = function (it) {
           return Object(defined(it));
           };
           
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
           
           'use strict';
           
           Object.defineProperty(exports, "__esModule", {
                                 value: true
                                 });
           exports.createInstance = createInstance;
           
           var _frameworks = __webpack_require__(44);
           
           var _frameworks2 = _interopRequireDefault(_frameworks);
           
           function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
           
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
           return _frameworks2.default[info.framework].createInstance(id, code, config, data);
           }
           return new Error('invalid instance id "' + id + '"');
           }
           
           var methods = {
           createInstance: createInstance
           };
           
           function genInit(methodName) {
           methods[methodName] = function () {
           for (var name in _frameworks2.default) {
           var framework = _frameworks2.default[name];
           if (framework && framework[methodName]) {
           framework[methodName].apply(framework, arguments);
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
           
/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {
           
           'use strict';
           
           Object.defineProperty(exports, "__esModule", {
                                 value: true
                                 });
           
           var _default = __webpack_require__(45);
           
           var _default2 = _interopRequireDefault(_default);
           
           function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
           
           exports.default = {
           Weex: _default2.default
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
           
           var _config = __webpack_require__(46);
           
           var config = _interopRequireWildcard(_config);
           
           var _app = __webpack_require__(47);
           
           var _app2 = _interopRequireDefault(_app);
           
           var _vm = __webpack_require__(52);
           
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
           var result;
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
           var result;
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
           var result;
           result = instance.fireEvent(ref, type, data, domChanges);
           return result;
           },
           
           callback: function callback(instanceId, funcId, data, ifLast) {
           var instance = instanceMap[instanceId];
           var result;
           result = instance.callback(funcId, data, ifLast);
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
           
           exports.default = {
           createInstance: createInstance,
           refreshInstance: refreshInstance,
           destroyInstance: destroyInstance,
           registerComponents: registerComponents,
           registerModules: registerModules,
           registerMethods: registerMethods,
           getRoot: getRoot,
           callJS: callJS
           };
           
/***/ },
/* 46 */
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
           
           var _differ = __webpack_require__(66);
           
           var _differ2 = _interopRequireDefault(_differ);
           
           var _event = __webpack_require__(67);
           
           var _event2 = _interopRequireDefault(_event);
           
           var _domListener = __webpack_require__(65);
           
           var _domListener2 = _interopRequireDefault(_domListener);
           
           var _dom = __webpack_require__(68);
           
           var _register = __webpack_require__(62);
           
           function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
           
           function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
           
           /**
            * @fileOverview
            * Weex instance constructor & definition
            */
           
           function AppInstance(instanceId, options) {
           var _this = this;
           
           this.id = instanceId;
           this.options = options || {};
           this.vm = null;
           this.doc = new _dom.Document(instanceId, this.options.bundleUrl);
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
                                       /// lang.js
                                       
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
                                       
                                       /// env.js
                                       
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
                                       
                                       /// shared
                                       
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
                                       
                                       /// other
                                       
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
                                       
                                       var _config = __webpack_require__(46);
                                       
                                       var config = _interopRequireWildcard(_config);
                                       
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
                                       return new Error('Downgrade: ' + config.downgrade);
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
           
           var _index = __webpack_require__(48);
           
           var _ = _interopRequireWildcard(_index);
           
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
           
           var _index = __webpack_require__(48);
           
           function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
           
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
           
           if (!(0, _index.isPlainObject)(data)) {
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
           def.get = userDef.get ? userDef.cache !== false ? makeComputedGetter(userDef.get, vm) : (0, _index.bind)(userDef.get, vm) : noop;
           def.set = userDef.set ? (0, _index.bind)(userDef.set, vm) : noop;
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
           vm[key] = (0, _index.bind)(methods[key], vm);
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
                                       
                                       var _index = __webpack_require__(48);
                                       
                                       function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
                                       
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
                                       (0, _index.extend)(this, options);
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
                                       this.depIds = new _index._Set();
                                       this.newDepIds = new _index._Set();
                                       // parse expression for getter
                                       if (isFn) {
                                       this.getter = expOrFn;
                                       } else {
                                       this.getter = (0, _index.parsePath)(expOrFn);
                                       if (!this.getter) {
                                       this.getter = function () {};
                                       process.env.NODE_ENV !== 'production' && (0, _index.warn)('Failed watching path: ' + expOrFn + 'Watcher only accepts simple dot-delimited paths. ' + 'For full control, use a function instead.', vm);
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
                                           ((0, _index.isObject)(value) || this.deep) && !this.shallow) {
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
                                       (0, _index.remove)(this.vm._watchers, this);
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
                                       
                                       var seenObjects = new _index._Set();
                                       function traverse(val, seen) {
                                       var i = void 0,
                                       keys = void 0,
                                       isA = void 0,
                                       isO = void 0;
                                       if (!seen) {
                                       seen = seenObjects;
                                       seen.clear();
                                       }
                                       isA = (0, _index.isArray)(val);
                                       isO = (0, _index.isObject)(val);
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
           
           var _index = __webpack_require__(48);
           
           var uid = 0;
           
           /**
            * A dep is an observable that can have multiple
            * directives subscribing to it.
            *
            * @constructor
            */
           
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
           (0, _index.remove)(this.subs, sub);
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
           
           var _index = __webpack_require__(48);
           
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
           
           function Observer(value) {
           this.value = value;
           this.dep = new _dep2.default();
           (0, _index.def)(value, '__ob__', this);
           if ((0, _index.isArray)(value)) {
           var augment = _index.hasProto ? protoAugment : copyAugment;
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
           (0, _index.remove)(this.vms, vm);
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
           (0, _index.def)(target, key, src[key]);
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
           if (!(0, _index.isObject)(value)) {
           return;
           }
           var ob = void 0;
           if ((0, _index.hasOwn)(value, '__ob__') && value.__ob__ instanceof Observer) {
           ob = value.__ob__;
           } else if (((0, _index.isArray)(value) || (0, _index.isPlainObject)(value)) && Object.isExtensible(value) && !value._isVue) {
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
                                 if ((0, _index.isArray)(value)) {
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
           if ((0, _index.isArray)(obj)) {
           return obj.splice(key, 1, val);
           }
           if ((0, _index.hasOwn)(obj, key)) {
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
           if (!(0, _index.hasOwn)(obj, key)) {
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
           if (KEY_WORDS.indexOf(key) > -1 || !(0, _index.isReserved)(key)) {
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
           if (!(0, _index.isReserved)(key)) {
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
           
           var _index = __webpack_require__(48);
           
           var arrayProto = Array.prototype;
           var arrayMethods = exports.arrayMethods = Object.create(arrayProto)
           
           /**
            * Intercept mutating methods and emit events
            */
           
           ;['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function (method) {
                                                                                     // cache original method
                                                                                     var original = arrayProto[method];
                                                                                     (0, _index.def)(arrayMethods, method, function mutator() {
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
           
           (0, _index.def)(arrayProto, '$set', function $set(index, val) {
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
           
           (0, _index.def)(arrayProto, '$remove', function $remove(index) {
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
           
           var _index = __webpack_require__(48);
           
           var _ = _interopRequireWildcard(_index);
           
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
           if (!treeMode) {
           _.debug('compile to append single node for', element);
           this._attachTarget(element, dest);
           }
           this._compileChildren(template, element);
           if (treeMode) {
           _.debug('compile to append whole tree for', element);
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
           
           var _index = __webpack_require__(48);
           
           var _ = _interopRequireWildcard(_index);
           
           var _watcher = __webpack_require__(54);
           
           var _watcher2 = _interopRequireDefault(_watcher);
           
           var _config = __webpack_require__(46);
           
           function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
           
           function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
           
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
/* 60 */
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
                                       
                                       var _domListener = __webpack_require__(65);
                                       
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
                                       
                                       function updateActions() {
                                       this.differ.flush();
                                       var tasks = [];
                                       if (this.listener && this.listener.updates.length) {
                                       tasks.push.apply(tasks, _toConsumableArray(this.listener.updates));
                                       this.listener.updates = [];
                                       }
                                       if (tasks.length) {
                                       this.callTasks(tasks);
                                       }
                                       }
                                       
                                       function init(code, data) {
                                       var _this = this;
                                       
                                       _.debug('Intialize an instance with:\n', code, data);
                                       
                                       var result;
                                       // @see: lib/app/bundle.js
                                       var define = _.bind(this.define, this);
                                       var bootstrap = function bootstrap(name, config, _data) {
                                       result = _this.bootstrap(name, config, _data || data);
                                       _this.updateActions();
                                       _this.doc.listener.createFinish();
                                       _this.doc.close();
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
                                       
                                       function fireEvent(ref, type, e, domChanges) {
                                       var _this2 = this;
                                       
                                       _.debug('Fire a "' + type + '" event on an element(' + ref + ')', 'in instance(' + this.id + ')');
                                       
                                       if (Array.isArray(ref)) {
                                       ref.some(function (ref) {
                                                return _this2.fireEvent(ref, type, e) !== false;
                                                });
                                       return;
                                       }
                                       
                                       var el = this.doc.getRef(ref);
                                       
                                       if (el) {
                                       e = e || {};
                                       e.type = type;
                                       e.target = el;
                                       e.timestamp = Date.now();
                                       if (domChanges) {
                                       updateElement(el, domChanges);
                                       }
                                       var result = this.eventManager.fire(el, type, e);
                                       this.updateActions();
                                       this.doc.listener.updateFinish();
                                       return result;
                                       }
                                       
                                       return new Error('invalid element reference "' + ref + '"');
                                       }
                                       
                                       function callback(callbackId, data, ifKeepAlive) {
                                       _.debug('Invoke a callback(' + callbackId + ') with', data, 'in instance(' + this.id + ')');
                                       
                                       var callback = this.callbacks[callbackId];
                                       
                                       if (typeof callback === 'function') {
                                       callback(data); // data is already a object, @see: lib/runtime/index.js
                                       
                                       if (typeof ifKeepAlive === 'undefined' || ifKeepAlive === false) {
                                       this.callbacks[callbackId] = undefined;
                                       }
                                       
                                       this.updateActions();
                                       this.doc.listener.updateFinish();
                                       return;
                                       }
                                       
                                       return new Error('invalid callback id "' + callbackId + '"');
                                       }
                                       
                                       function refreshData(data) {
                                       _.debug('Refresh with', data, 'in instance[' + this.id + ']');
                                       
                                       var vm = this.vm;
                                       
                                       if (vm && data) {
                                       if (typeof vm.refreshData === 'function') {
                                       vm.refreshData(data);
                                       } else {
                                       _.extend(vm, data);
                                       }
                                       this.updateActions();
                                       this.doc.listener.refreshFinish();
                                       return;
                                       }
                                       
                                       return new Error('invalid data "' + data + '"');
                                       }
                                       
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
                                       /* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))
           
/***/ },
/* 65 */
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
           
           Listener.prototype.updateFinish = function (callback) {
           var handler = this.handler;
           handler([createAction('updateFinish', [])], callback);
           };
           
           Listener.prototype.refreshFinish = function (callback) {
           var handler = this.handler;
           handler([createAction('refreshFinish', [])], callback);
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
/* 66 */
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
/* 67 */
/***/ function(module, exports, __webpack_require__) {
           
           'use strict';
           
           Object.defineProperty(exports, "__esModule", {
                                 value: true
                                 });
           
           var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                              * @fileOverview event manager
                                                                                                                                                                                                                                                              */
           
           exports.default = EventManager;
           
           var _util = __webpack_require__(48);
           
           var _ = _interopRequireWildcard(_util);
           
           function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
           
           function EventManager() {
           this.els = [];
           this.targets = [];
           }
           
           EventManager.prototype._get = function (el, force) {
           var index = this.els.indexOf(el);
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
/* 68 */
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
           
           function Document(id, url) {
           id = id ? id.toString() : '';
           this.id = id;
           this.URL = url;
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
           /* istanbul ignore next */
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
           
           Element.prototype.setAttr = function (key, value, silent) {
           if (this.attr[key] === value) {
           return;
           }
           this.attr[key] = value;
           if (!silent && this.attached) {
           var renderer = this.getRenderer();
           if (renderer) {
           renderer.setAttr(this.ref, key, value);
           }
           }
           };
           
           Element.prototype.setStyle = function (key, value, silent) {
           /* istanbul ignore if */
           if (this.style[key] === value) {
           return;
           }
           this.style[key] = value;
           if (!silent && this.attached) {
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
/* 69 */
/***/ function(module, exports) {
           
           module.exports = {
           "name": "weex-jsframework",
           "version": "0.13.11",
           "description": "JS Framework for Weex solution which is a extendable cross-platform solution for dynamic programming and publishing projects",
           "main": "index.js",
           "scripts": {
           "dev": "webpack --watch --config ./webpack.config.js",
           "build": "webpack --config ./webpack.config.js",
           "compress": "uglifyjs dist/index.js -o dist/index.min.js",
           "lint": "jscs --config .jscsrc polyfill/*.js polyfill/__test__/*.js lib/*.js lib/__test__/*.js lib/app/*.js lib/app/__test__/*.js lib/vm/*.js lib/vm/__test__/*.js",
           "test": "mocha --compilers js:babel-core/register polyfill/__test__/*.js lib/__test__/*.js lib/**/__test__/*.js",
           "cover": "babel-node node_modules/isparta/bin/isparta cover --report text node_modules/mocha/bin/_mocha -- --reporter dot polyfill/__test__/*.js lib/__test__/*.js lib/**/__test__/*.js",
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
/* 70 */
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
           
/***/ },
/* 71 */
/***/ function(module, exports) {
           
           'use strict';
           
           Object.defineProperty(exports, "__esModule", {
                                 value: true
                                 });
           exports.$userTrack = $userTrack;
           exports.$sendMtop = $sendMtop;
           exports.$callWindvane = $callWindvane;
           exports.$setSpm = $setSpm;
           exports.$getUserInfo = $getUserInfo;
           exports.$login = $login;
           exports.$logout = $logout;
           /**
            * @fileOverview The api for invoking with "$" prefix
            */
           
           /**
            * ==========================================================
            * private for ali
            * ==========================================================
            */
           
           /**
            * invoke user-track on Taobao Moblie
            * @param {string} type：enter, click, expose
            * @param {string} name
            * @param {string} comName
            * @param {object} param
            */
           function $userTrack(type, name, comName, param) {
           var userTrack = this._app.requireModule('userTrack');
           userTrack.commit(type, name, comName, param);
           }
           
           /**
            * request a restfull api via the mtop gateway
            * @param  {object}   params
            * @param  {Function} callback
            */
           function $sendMtop(params, callback) {
           /* istanbul ignore else */
           if (typeof window === 'undefined') {
           // in native，use windvane
           var windvane = this._app.requireModule('windvane');
           windvane.call({
                         class: 'MtopWVPlugin',
                         method: 'send',
                         data: params
                         }, callback);
           } else {
           // in web brwoser，use stream.sendMtop
           var stream = this._app.requireModule('stream');
           stream.sendMtop(params, callback);
           }
           }
           
           /**
            * request a native api via windvane protocol
            * @param  {object}   params
            * @param  {Function} callback
            */
           function $callWindvane(params, callback) {
           var windvane = this._app.requireModule('windvane');
           windvane.call(params, callback);
           }
           
           /**
            * set spm for the page
            * @param  {string} a
            * @param  {string} b
            */
           function $setSpm(a, b) {
           var pageInfo = this._app.requireModule('pageInfo');
           pageInfo.setSpm(a, b);
           }
           
           /**
            * get the information of the current logined user
            * @param  {Function} callback
            */
           function $getUserInfo(callback) {
           var user = this._app.requireModule('user');
           user.getUserInfo(callback);
           }
           
           /**
            * perform login
            * @param  {Function} callback
            */
           function $login(callback) {
           var user = this._app.requireModule('user');
           user.login(callback);
           }
           
           /**
            * perform logout
            * @param  {Function} callback
            */
           function $logout(callback) {
           var user = this._app.requireModule('user');
           user.logout(callback);
           }
           
/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMGJhYzNlOGEwYWY1YjBmNWYxZjAiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy96aGFvamluamlhbmcvU2l0ZXMvcHVibGljL3dlZXgvc3JjL2pzLWZyYW1ld29yay9pbmRleC5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL3poYW9qaW5qaWFuZy9TaXRlcy9wdWJsaWMvd2VleC9zcmMvanMtZnJhbWV3b3JrL3BvbHlmaWxsL2luZGV4LmpzIiwid2VicGFjazovLy8vVXNlcnMvemhhb2ppbmppYW5nL1NpdGVzL3B1YmxpYy93ZWV4L3NyYy9qcy1mcmFtZXdvcmsvcG9seWZpbGwvb2JqZWN0QXNzaWduLmpzIiwid2VicGFjazovLy8vVXNlcnMvemhhb2ppbmppYW5nL1NpdGVzL3B1YmxpYy93ZWV4L3NyYy9qcy1mcmFtZXdvcmsvfi8ubnBtaW5zdGFsbC9jb3JlLWpzLzIuMS41L2NvcmUtanMvZm4vb2JqZWN0L2Fzc2lnbi5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL3poYW9qaW5qaWFuZy9TaXRlcy9wdWJsaWMvd2VleC9zcmMvanMtZnJhbWV3b3JrL34vLm5wbWluc3RhbGwvY29yZS1qcy8yLjEuNS9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24uanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy96aGFvamluamlhbmcvU2l0ZXMvcHVibGljL3dlZXgvc3JjL2pzLWZyYW1ld29yay9+Ly5ucG1pbnN0YWxsL2NvcmUtanMvMi4xLjUvY29yZS1qcy9tb2R1bGVzL19leHBvcnQuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy96aGFvamluamlhbmcvU2l0ZXMvcHVibGljL3dlZXgvc3JjL2pzLWZyYW1ld29yay9+Ly5ucG1pbnN0YWxsL2NvcmUtanMvMi4xLjUvY29yZS1qcy9tb2R1bGVzL19nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy96aGFvamluamlhbmcvU2l0ZXMvcHVibGljL3dlZXgvc3JjL2pzLWZyYW1ld29yay9+Ly5ucG1pbnN0YWxsL2NvcmUtanMvMi4xLjUvY29yZS1qcy9tb2R1bGVzL19jb3JlLmpzIiwid2VicGFjazovLy8vVXNlcnMvemhhb2ppbmppYW5nL1NpdGVzL3B1YmxpYy93ZWV4L3NyYy9qcy1mcmFtZXdvcmsvfi8ubnBtaW5zdGFsbC9jb3JlLWpzLzIuMS41L2NvcmUtanMvbW9kdWxlcy9faGlkZS5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL3poYW9qaW5qaWFuZy9TaXRlcy9wdWJsaWMvd2VleC9zcmMvanMtZnJhbWV3b3JrL34vLm5wbWluc3RhbGwvY29yZS1qcy8yLjEuNS9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1kcC5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL3poYW9qaW5qaWFuZy9TaXRlcy9wdWJsaWMvd2VleC9zcmMvanMtZnJhbWV3b3JrL34vLm5wbWluc3RhbGwvY29yZS1qcy8yLjEuNS9jb3JlLWpzL21vZHVsZXMvX2FuLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL3poYW9qaW5qaWFuZy9TaXRlcy9wdWJsaWMvd2VleC9zcmMvanMtZnJhbWV3b3JrL34vLm5wbWluc3RhbGwvY29yZS1qcy8yLjEuNS9jb3JlLWpzL21vZHVsZXMvX2lzLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL3poYW9qaW5qaWFuZy9TaXRlcy9wdWJsaWMvd2VleC9zcmMvanMtZnJhbWV3b3JrL34vLm5wbWluc3RhbGwvY29yZS1qcy8yLjEuNS9jb3JlLWpzL21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzIiwid2VicGFjazovLy8vVXNlcnMvemhhb2ppbmppYW5nL1NpdGVzL3B1YmxpYy93ZWV4L3NyYy9qcy1mcmFtZXdvcmsvfi8ubnBtaW5zdGFsbC9jb3JlLWpzLzIuMS41L2NvcmUtanMvbW9kdWxlcy9fZGVzY3JpcHRvcnMuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy96aGFvamluamlhbmcvU2l0ZXMvcHVibGljL3dlZXgvc3JjL2pzLWZyYW1ld29yay9+Ly5ucG1pbnN0YWxsL2NvcmUtanMvMi4xLjUvY29yZS1qcy9tb2R1bGVzL19mYWlscy5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL3poYW9qaW5qaWFuZy9TaXRlcy9wdWJsaWMvd2VleC9zcmMvanMtZnJhbWV3b3JrL34vLm5wbWluc3RhbGwvY29yZS1qcy8yLjEuNS9jb3JlLWpzL21vZHVsZXMvX2RvbS1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy96aGFvamluamlhbmcvU2l0ZXMvcHVibGljL3dlZXgvc3JjL2pzLWZyYW1ld29yay9+Ly5ucG1pbnN0YWxsL2NvcmUtanMvMi4xLjUvY29yZS1qcy9tb2R1bGVzL190by1wcmltaXRpdmUuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy96aGFvamluamlhbmcvU2l0ZXMvcHVibGljL3dlZXgvc3JjL2pzLWZyYW1ld29yay9+Ly5ucG1pbnN0YWxsL2NvcmUtanMvMi4xLjUvY29yZS1qcy9tb2R1bGVzL19wcm9wZXJ0eS1kZXNjLmpzIiwid2VicGFjazovLy8vVXNlcnMvemhhb2ppbmppYW5nL1NpdGVzL3B1YmxpYy93ZWV4L3NyYy9qcy1mcmFtZXdvcmsvfi8ubnBtaW5zdGFsbC9jb3JlLWpzLzIuMS41L2NvcmUtanMvbW9kdWxlcy9fcmVkZWZpbmUuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy96aGFvamluamlhbmcvU2l0ZXMvcHVibGljL3dlZXgvc3JjL2pzLWZyYW1ld29yay9+Ly5ucG1pbnN0YWxsL2NvcmUtanMvMi4xLjUvY29yZS1qcy9tb2R1bGVzL19oYXMuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy96aGFvamluamlhbmcvU2l0ZXMvcHVibGljL3dlZXgvc3JjL2pzLWZyYW1ld29yay9+Ly5ucG1pbnN0YWxsL2NvcmUtanMvMi4xLjUvY29yZS1qcy9tb2R1bGVzL191aWQuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy96aGFvamluamlhbmcvU2l0ZXMvcHVibGljL3dlZXgvc3JjL2pzLWZyYW1ld29yay9+Ly5ucG1pbnN0YWxsL2NvcmUtanMvMi4xLjUvY29yZS1qcy9tb2R1bGVzL19jdHguanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy96aGFvamluamlhbmcvU2l0ZXMvcHVibGljL3dlZXgvc3JjL2pzLWZyYW1ld29yay9+Ly5ucG1pbnN0YWxsL2NvcmUtanMvMi4xLjUvY29yZS1qcy9tb2R1bGVzL19hLWZ1bmN0aW9uLmpzIiwid2VicGFjazovLy8vVXNlcnMvemhhb2ppbmppYW5nL1NpdGVzL3B1YmxpYy93ZWV4L3NyYy9qcy1mcmFtZXdvcmsvfi8ubnBtaW5zdGFsbC9jb3JlLWpzLzIuMS41L2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWFzc2lnbi5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL3poYW9qaW5qaWFuZy9TaXRlcy9wdWJsaWMvd2VleC9zcmMvanMtZnJhbWV3b3JrL34vLm5wbWluc3RhbGwvY29yZS1qcy8yLjEuNS9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1rZXlzLmpzIiwid2VicGFjazovLy8vVXNlcnMvemhhb2ppbmppYW5nL1NpdGVzL3B1YmxpYy93ZWV4L3NyYy9qcy1mcmFtZXdvcmsvfi8ubnBtaW5zdGFsbC9jb3JlLWpzLzIuMS41L2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWtleXMtaW50ZXJuYWwuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy96aGFvamluamlhbmcvU2l0ZXMvcHVibGljL3dlZXgvc3JjL2pzLWZyYW1ld29yay9+Ly5ucG1pbnN0YWxsL2NvcmUtanMvMi4xLjUvY29yZS1qcy9tb2R1bGVzL190by1pb2JqZWN0LmpzIiwid2VicGFjazovLy8vVXNlcnMvemhhb2ppbmppYW5nL1NpdGVzL3B1YmxpYy93ZWV4L3NyYy9qcy1mcmFtZXdvcmsvfi8ubnBtaW5zdGFsbC9jb3JlLWpzLzIuMS41L2NvcmUtanMvbW9kdWxlcy9faW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL3poYW9qaW5qaWFuZy9TaXRlcy9wdWJsaWMvd2VleC9zcmMvanMtZnJhbWV3b3JrL34vLm5wbWluc3RhbGwvY29yZS1qcy8yLjEuNS9jb3JlLWpzL21vZHVsZXMvX2NvZi5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL3poYW9qaW5qaWFuZy9TaXRlcy9wdWJsaWMvd2VleC9zcmMvanMtZnJhbWV3b3JrL34vLm5wbWluc3RhbGwvY29yZS1qcy8yLjEuNS9jb3JlLWpzL21vZHVsZXMvX2RlZmluZWQuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy96aGFvamluamlhbmcvU2l0ZXMvcHVibGljL3dlZXgvc3JjL2pzLWZyYW1ld29yay9+Ly5ucG1pbnN0YWxsL2NvcmUtanMvMi4xLjUvY29yZS1qcy9tb2R1bGVzL19hcnJheS1pbmNsdWRlcy5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL3poYW9qaW5qaWFuZy9TaXRlcy9wdWJsaWMvd2VleC9zcmMvanMtZnJhbWV3b3JrL34vLm5wbWluc3RhbGwvY29yZS1qcy8yLjEuNS9jb3JlLWpzL21vZHVsZXMvX3RvLWxlbmd0aC5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL3poYW9qaW5qaWFuZy9TaXRlcy9wdWJsaWMvd2VleC9zcmMvanMtZnJhbWV3b3JrL34vLm5wbWluc3RhbGwvY29yZS1qcy8yLjEuNS9jb3JlLWpzL21vZHVsZXMvX3RvLWludGVnZXIuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy96aGFvamluamlhbmcvU2l0ZXMvcHVibGljL3dlZXgvc3JjL2pzLWZyYW1ld29yay9+Ly5ucG1pbnN0YWxsL2NvcmUtanMvMi4xLjUvY29yZS1qcy9tb2R1bGVzL190by1pbmRleC5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL3poYW9qaW5qaWFuZy9TaXRlcy9wdWJsaWMvd2VleC9zcmMvanMtZnJhbWV3b3JrL34vLm5wbWluc3RhbGwvY29yZS1qcy8yLjEuNS9jb3JlLWpzL21vZHVsZXMvX3NoYXJlZC1rZXkuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy96aGFvamluamlhbmcvU2l0ZXMvcHVibGljL3dlZXgvc3JjL2pzLWZyYW1ld29yay9+Ly5ucG1pbnN0YWxsL2NvcmUtanMvMi4xLjUvY29yZS1qcy9tb2R1bGVzL19zaGFyZWQuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy96aGFvamluamlhbmcvU2l0ZXMvcHVibGljL3dlZXgvc3JjL2pzLWZyYW1ld29yay9+Ly5ucG1pbnN0YWxsL2NvcmUtanMvMi4xLjUvY29yZS1qcy9tb2R1bGVzL19lbnVtLWJ1Zy1rZXlzLmpzIiwid2VicGFjazovLy8vVXNlcnMvemhhb2ppbmppYW5nL1NpdGVzL3B1YmxpYy93ZWV4L3NyYy9qcy1mcmFtZXdvcmsvfi8ubnBtaW5zdGFsbC9jb3JlLWpzLzIuMS41L2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWdvcHMuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy96aGFvamluamlhbmcvU2l0ZXMvcHVibGljL3dlZXgvc3JjL2pzLWZyYW1ld29yay9+Ly5ucG1pbnN0YWxsL2NvcmUtanMvMi4xLjUvY29yZS1qcy9tb2R1bGVzL19vYmplY3QtcGllLmpzIiwid2VicGFjazovLy8vVXNlcnMvemhhb2ppbmppYW5nL1NpdGVzL3B1YmxpYy93ZWV4L3NyYy9qcy1mcmFtZXdvcmsvfi8ubnBtaW5zdGFsbC9jb3JlLWpzLzIuMS41L2NvcmUtanMvbW9kdWxlcy9fdG8tb2JqZWN0LmpzIiwid2VicGFjazovLy8vVXNlcnMvemhhb2ppbmppYW5nL1NpdGVzL3B1YmxpYy93ZWV4L3NyYy9qcy1mcmFtZXdvcmsvcG9seWZpbGwvcHJvbWlzZS5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL3poYW9qaW5qaWFuZy9TaXRlcy9wdWJsaWMvd2VleC9zcmMvanMtZnJhbWV3b3JrL3BvbHlmaWxsL2NvbnNvbGVsb2cuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy96aGFvamluamlhbmcvU2l0ZXMvcHVibGljL3dlZXgvc3JjL2pzLWZyYW1ld29yay9saWIvcnVudGltZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL3poYW9qaW5qaWFuZy9TaXRlcy9wdWJsaWMvd2VleC9zcmMvanMtZnJhbWV3b3JrL2xpYi9ydW50aW1lL2ZyYW1ld29ya3MuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy96aGFvamluamlhbmcvU2l0ZXMvcHVibGljL3dlZXgvc3JjL2pzLWZyYW1ld29yay9saWIvcnVudGltZS9kZWZhdWx0LmpzIiwid2VicGFjazovLy8vVXNlcnMvemhhb2ppbmppYW5nL1NpdGVzL3B1YmxpYy93ZWV4L3NyYy9qcy1mcmFtZXdvcmsvbGliL2NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL3poYW9qaW5qaWFuZy9TaXRlcy9wdWJsaWMvd2VleC9zcmMvanMtZnJhbWV3b3JrL2xpYi9hcHAvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy96aGFvamluamlhbmcvU2l0ZXMvcHVibGljL3dlZXgvc3JjL2pzLWZyYW1ld29yay9saWIvdXRpbC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL3poYW9qaW5qaWFuZy9TaXRlcy9wdWJsaWMvd2VleC9zcmMvanMtZnJhbWV3b3JrL2xpYi9hcHAvYnVuZGxlLmpzIiwid2VicGFjazovLy8vVXNlcnMvemhhb2ppbmppYW5nL1NpdGVzL3B1YmxpYy93ZWV4L3NyYy9qcy1mcmFtZXdvcmsvfi8ubnBtaW5zdGFsbC9zZW12ZXIvNS4xLjEvc2VtdmVyL3NlbXZlci5qcyIsIndlYnBhY2s6Ly8vLi9+Ly5ucG1pbnN0YWxsL3Byb2Nlc3MvMC4xMS41L3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL3poYW9qaW5qaWFuZy9TaXRlcy9wdWJsaWMvd2VleC9zcmMvanMtZnJhbWV3b3JrL2xpYi92bS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL3poYW9qaW5qaWFuZy9TaXRlcy9wdWJsaWMvd2VleC9zcmMvanMtZnJhbWV3b3JrL2xpYi92bS9jb3JlL3N0YXRlLmpzIiwid2VicGFjazovLy8vVXNlcnMvemhhb2ppbmppYW5nL1NpdGVzL3B1YmxpYy93ZWV4L3NyYy9qcy1mcmFtZXdvcmsvbGliL3ZtL2NvcmUvd2F0Y2hlci5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL3poYW9qaW5qaWFuZy9TaXRlcy9wdWJsaWMvd2VleC9zcmMvanMtZnJhbWV3b3JrL2xpYi92bS9jb3JlL2RlcC5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL3poYW9qaW5qaWFuZy9TaXRlcy9wdWJsaWMvd2VleC9zcmMvanMtZnJhbWV3b3JrL2xpYi92bS9jb3JlL29ic2VydmVyLmpzIiwid2VicGFjazovLy8vVXNlcnMvemhhb2ppbmppYW5nL1NpdGVzL3B1YmxpYy93ZWV4L3NyYy9qcy1mcmFtZXdvcmsvbGliL3ZtL2NvcmUvYXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy96aGFvamluamlhbmcvU2l0ZXMvcHVibGljL3dlZXgvc3JjL2pzLWZyYW1ld29yay9saWIvdm0vY29tcGlsZXIuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy96aGFvamluamlhbmcvU2l0ZXMvcHVibGljL3dlZXgvc3JjL2pzLWZyYW1ld29yay9saWIvdm0vZGlyZWN0aXZlLmpzIiwid2VicGFjazovLy8vVXNlcnMvemhhb2ppbmppYW5nL1NpdGVzL3B1YmxpYy93ZWV4L3NyYy9qcy1mcmFtZXdvcmsvbGliL3ZtL2RvbS1oZWxwZXIuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy96aGFvamluamlhbmcvU2l0ZXMvcHVibGljL3dlZXgvc3JjL2pzLWZyYW1ld29yay9saWIvdm0vZXZlbnRzLmpzIiwid2VicGFjazovLy8vVXNlcnMvemhhb2ppbmppYW5nL1NpdGVzL3B1YmxpYy93ZWV4L3NyYy9qcy1mcmFtZXdvcmsvbGliL2FwcC9yZWdpc3Rlci5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL3poYW9qaW5qaWFuZy9TaXRlcy9wdWJsaWMvd2VleC9zcmMvanMtZnJhbWV3b3JrL2xpYi9hcHAvZG93bmdyYWRlLmpzIiwid2VicGFjazovLy8vVXNlcnMvemhhb2ppbmppYW5nL1NpdGVzL3B1YmxpYy93ZWV4L3NyYy9qcy1mcmFtZXdvcmsvbGliL2FwcC9jdHJsLmpzIiwid2VicGFjazovLy8vVXNlcnMvemhhb2ppbmppYW5nL1NpdGVzL3B1YmxpYy93ZWV4L3NyYy9qcy1mcmFtZXdvcmsvbGliL2FwcC9kb20tbGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy96aGFvamluamlhbmcvU2l0ZXMvcHVibGljL3dlZXgvc3JjL2pzLWZyYW1ld29yay9saWIvYXBwL2RpZmZlci5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL3poYW9qaW5qaWFuZy9TaXRlcy9wdWJsaWMvd2VleC9zcmMvanMtZnJhbWV3b3JrL2xpYi9hcHAvZXZlbnQuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy96aGFvamluamlhbmcvU2l0ZXMvcHVibGljL3dlZXgvc3JjL2pzLWZyYW1ld29yay9saWIvYXBwL2RvbS5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL3poYW9qaW5qaWFuZy9TaXRlcy9wdWJsaWMvd2VleC9zcmMvanMtZnJhbWV3b3JrL3BhY2thZ2UuanNvbiIsIndlYnBhY2s6Ly8vL1VzZXJzL3poYW9qaW5qaWFuZy9TaXRlcy9wdWJsaWMvd2VleC9zcmMvanMtZnJhbWV3b3JrL2xpYi9hcGkvbWV0aG9kcy5qcyIsIndlYnBhY2s6Ly8vLi9saWIvYXBpL21ldGhvZHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7QUN0Q0E7Ozs7O0FBS0EsS0FBTSxVQUFVLG9CQUFRLEVBQVIsQ0FBaEI7ZUFDMEIsTTtLQUFuQixlLFdBQUEsZTs7QUFDUCxpQkFBZ0IsT0FBaEIsRTs7Ozs7Ozs7O0FDUEE7O0FBQ0E7Ozs7QUFDQTs7Ozs0QkFFUyxVO0FBQ0wsWUFBTyxVQUFQLElBQXFCLFlBQW1CO0FBQ3BDLGFBQU0sTUFBTSxrQkFBUSxVQUFSLHFDQUFaO0FBQ0EsYUFBSSxlQUFlLEtBQW5CLEVBQTBCO0FBQ3RCLHFCQUFRLEtBQVIsQ0FBYyxJ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TSxPQUFPLEtBQUssSUFBTCxDQUFVLGFBQVYsQ0FBd0IsTUFBeEIsQ0FBYjtBQUNBLFFBQUssS0FBTCxDQUFXLFFBQVg7QUFDRDs7Ozs7O0FBTU0sVUFBUyxPQUFULENBQWlCLFFBQWpCLEVBQTJCO0FBQ2hDLE9BQU0sT0FBTyxLQUFLLElBQUwsQ0FBVSxhQUFWLENBQXdCLE1BQXhCLENBQWI7QUFDQSxRQUFLLE1BQUwsQ0FBWSxRQUFaO0FBQ0QsRSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgMGJhYzNlOGEwYWY1YjBmNWYxZjBcbiAqKi8iLCJpbXBvcnQgJ3dlZXgtanNmcmFtZXdvcmsnXG5cbi8qKlxuICogcmVnaXN0ZXIgbWV0aG9kc1xuICovXG5jb25zdCBtZXRob2RzID0gcmVxdWlyZSgnLi9saWIvYXBpL21ldGhvZHMnKVxuY29uc3Qge3JlZ2lzdGVyTWV0aG9kc30gPSBnbG9iYWxcbnJlZ2lzdGVyTWV0aG9kcyhtZXRob2RzKVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9pbmRleC5qc1xuICoqLyIsImltcG9ydCAnLi9wb2x5ZmlsbCdcbmltcG9ydCBydW50aW1lIGZyb20gJy4vbGliL3J1bnRpbWUnXG5pbXBvcnQge3ZlcnNpb24sIG9wdGlvbmFsRGVwZW5kZW5jaWVzfSBmcm9tICcuL3BhY2thZ2UuanNvbidcblxuZm9yIChsZXQgbWV0aG9kTmFtZSBpbiBydW50aW1lKSB7XG4gICAgZ2xvYmFsW21ldGhvZE5hbWVdID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcbiAgICAgICAgY29uc3QgcmV0ID0gcnVudGltZVttZXRob2ROYW1lXSguLi5hcmdzKVxuICAgICAgICBpZiAocmV0IGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IocmV0LnRvU3RyaW5nKCkpXG4gICAgICAgIH0gZWxzZSBpZiAocmV0IGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIHJldC5mb3JFYWNoKHIgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihyLnRvU3RyaW5nKCkpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV0XG4gICAgfVxufVxuXG5PYmplY3QuYXNzaWduKGdsb2JhbCwge1xuICAgIGZyYW1ld29ya1ZlcnNpb246IHZlcnNpb24sXG4gICAgbmVlZFRyYW5zZm9ybWVyVmVyc2lvbjogb3B0aW9uYWxEZXBlbmRlbmNpZXNbJ3dlZXgtdHJhbnNmb3JtZXInXVxufSlcblxuLyoqXG4gKiByZWdpc3RlciBtZXRob2RzXG4gKi9cbmNvbnN0IG1ldGhvZHMgPSByZXF1aXJlKCcuL2xpYi9hcGkvbWV0aG9kcycpXG5jb25zdCB7cmVnaXN0ZXJNZXRob2RzfSA9IGdsb2JhbFxucmVnaXN0ZXJNZXRob2RzKG1ldGhvZHMpXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAvVXNlcnMvemhhb2ppbmppYW5nL1NpdGVzL3B1YmxpYy93ZWV4L3NyYy9qcy1mcmFtZXdvcmsvaW5kZXguanNcbiAqKi8iLCJpbXBvcnQgJy4vb2JqZWN0QXNzaWduJ1xuLy8gaW1wb3J0ICcuL3NldFRpbWVvdXQnXG5pbXBvcnQgJy4vcHJvbWlzZSdcbmltcG9ydCAnLi9jb25zb2xlbG9nJ1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogL1VzZXJzL3poYW9qaW5qaWFuZy9TaXRlcy9wdWJsaWMvd2VleC9zcmMvanMtZnJhbWV3b3JrL3BvbHlmaWxsL2luZGV4LmpzXG4gKiovIiwiaW1wb3J0ICdjb3JlLWpzL2ZuL29iamVjdC9hc3NpZ24nXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAvVXNlcnMvemhhb2ppbmppYW5nL1NpdGVzL3B1YmxpYy93ZWV4L3NyYy9qcy1mcmFtZXdvcmsvcG9seWZpbGwvb2JqZWN0QXNzaWduLmpzXG4gKiovIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0LmFzc2lnbjtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAvVXNlcnMvemhhb2ppbmppYW5nL1NpdGVzL3B1YmxpYy93ZWV4L3NyYy9qcy1mcmFtZXdvcmsvfi8ubnBtaW5zdGFsbC9jb3JlLWpzLzIuMS41L2NvcmUtanMvZm4vb2JqZWN0L2Fzc2lnbi5qc1xuICoqLyIsIi8vIDE5LjEuMy4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiwgJ09iamVjdCcsIHthc3NpZ246IHJlcXVpcmUoJy4vX29iamVjdC1hc3NpZ24nKX0pO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC9Vc2Vycy96aGFvamluamlhbmcvU2l0ZXMvcHVibGljL3dlZXgvc3JjL2pzLWZyYW1ld29yay9+Ly5ucG1pbnN0YWxsL2NvcmUtanMvMi4xLjUvY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduLmpzXG4gKiovIiwidmFyIGdsb2JhbCAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgY29yZSAgICAgID0gcmVxdWlyZSgnLi9fY29yZScpXG4gICwgaGlkZSAgICAgID0gcmVxdWlyZSgnLi9faGlkZScpXG4gICwgcmVkZWZpbmUgID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUnKVxuICAsIGN0eCAgICAgICA9IHJlcXVpcmUoJy4vX2N0eCcpXG4gICwgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG5cbnZhciAkZXhwb3J0ID0gZnVuY3Rpb24odHlwZSwgbmFtZSwgc291cmNlKXtcbiAgdmFyIElTX0ZPUkNFRCA9IHR5cGUgJiAkZXhwb3J0LkZcbiAgICAsIElTX0dMT0JBTCA9IHR5cGUgJiAkZXhwb3J0LkdcbiAgICAsIElTX1NUQVRJQyA9IHR5cGUgJiAkZXhwb3J0LlNcbiAgICAsIElTX1BST1RPICA9IHR5cGUgJiAkZXhwb3J0LlBcbiAgICAsIElTX0JJTkQgICA9IHR5cGUgJiAkZXhwb3J0LkJcbiAgICAsIHRhcmdldCAgICA9IElTX0dMT0JBTCA/IGdsb2JhbCA6IElTX1NUQVRJQyA/IGdsb2JhbFtuYW1lXSB8fCAoZ2xvYmFsW25hbWVdID0ge30pIDogKGdsb2JhbFtuYW1lXSB8fCB7fSlbUFJPVE9UWVBFXVxuICAgICwgZXhwb3J0cyAgID0gSVNfR0xPQkFMID8gY29yZSA6IGNvcmVbbmFtZV0gfHwgKGNvcmVbbmFtZV0gPSB7fSlcbiAgICAsIGV4cFByb3RvICA9IGV4cG9ydHNbUFJPVE9UWVBFXSB8fCAoZXhwb3J0c1tQUk9UT1RZUEVdID0ge30pXG4gICAgLCBrZXksIG93biwgb3V0LCBleHA7XG4gIGlmKElTX0dMT0JBTClzb3VyY2UgPSBuYW1lO1xuICBmb3Ioa2V5IGluIHNvdXJjZSl7XG4gICAgLy8gY29udGFpbnMgaW4gbmF0aXZlXG4gICAgb3duID0gIUlTX0ZPUkNFRCAmJiB0YXJnZXQgJiYgdGFyZ2V0W2tleV0gIT09IHVuZGVmaW5lZDtcbiAgICAvLyBleHBvcnQgbmF0aXZlIG9yIHBhc3NlZFxuICAgIG91dCA9IChvd24gPyB0YXJnZXQgOiBzb3VyY2UpW2tleV07XG4gICAgLy8gYmluZCB0aW1lcnMgdG8gZ2xvYmFsIGZvciBjYWxsIGZyb20gZXhwb3J0IGNvbnRleHRcbiAgICBleHAgPSBJU19CSU5EICYmIG93biA/IGN0eChvdXQsIGdsb2JhbCkgOiBJU19QUk9UTyAmJiB0eXBlb2Ygb3V0ID09ICdmdW5jdGlvbicgPyBjdHgoRnVuY3Rpb24uY2FsbCwgb3V0KSA6IG91dDtcbiAgICAvLyBleHRlbmQgZ2xvYmFsXG4gICAgaWYodGFyZ2V0KXJlZGVmaW5lKHRhcmdldCwga2V5LCBvdXQsIHR5cGUgJiAkZXhwb3J0LlUpO1xuICAgIC8vIGV4cG9ydFxuICAgIGlmKGV4cG9ydHNba2V5XSAhPSBvdXQpaGlkZShleHBvcnRzLCBrZXksIGV4cCk7XG4gICAgaWYoSVNfUFJPVE8gJiYgZXhwUHJvdG9ba2V5XSAhPSBvdXQpZXhwUHJvdG9ba2V5XSA9IG91dDtcbiAgfVxufTtcbmdsb2JhbC5jb3JlID0gY29yZTtcbi8vIHR5cGUgYml0bWFwXG4kZXhwb3J0LkYgPSAxOyAgIC8vIGZvcmNlZFxuJGV4cG9ydC5HID0gMjsgICAvLyBnbG9iYWxcbiRleHBvcnQuUyA9IDQ7ICAgLy8gc3RhdGljXG4kZXhwb3J0LlAgPSA4OyAgIC8vIHByb3RvXG4kZXhwb3J0LkIgPSAxNjsgIC8vIGJpbmRcbiRleHBvcnQuVyA9IDMyOyAgLy8gd3JhcFxuJGV4cG9ydC5VID0gNjQ7ICAvLyBzYWZlXG4kZXhwb3J0LlIgPSAxMjg7IC8vIHJlYWwgcHJvdG8gbWV0aG9kIGZvciBgbGlicmFyeWAgXG5tb2R1bGUuZXhwb3J0cyA9ICRleHBvcnQ7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogL1VzZXJzL3poYW9qaW5qaWFuZy9TaXRlcy9wdWJsaWMvd2VleC9zcmMvanMtZnJhbWV3b3JrL34vLm5wbWluc3RhbGwvY29yZS1qcy8yLjEuNS9jb3JlLWpzL21vZHVsZXMvX2V4cG9ydC5qc1xuICoqLyIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy84NiNpc3N1ZWNvbW1lbnQtMTE1NzU5MDI4XG52YXIgZ2xvYmFsID0gbW9kdWxlLmV4cG9ydHMgPSB0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnICYmIHdpbmRvdy5NYXRoID09IE1hdGhcbiAgPyB3aW5kb3cgOiB0eXBlb2Ygc2VsZiAhPSAndW5kZWZpbmVkJyAmJiBzZWxmLk1hdGggPT0gTWF0aCA/IHNlbGYgOiBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuaWYodHlwZW9mIF9fZyA9PSAnbnVtYmVyJylfX2cgPSBnbG9iYWw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAvVXNlcnMvemhhb2ppbmppYW5nL1NpdGVzL3B1YmxpYy93ZWV4L3NyYy9qcy1mcmFtZXdvcmsvfi8ubnBtaW5zdGFsbC9jb3JlLWpzLzIuMS41L2NvcmUtanMvbW9kdWxlcy9fZ2xvYmFsLmpzXG4gKiovIiwidmFyIGNvcmUgPSBtb2R1bGUuZXhwb3J0cyA9IHt2ZXJzaW9uOiAnMi4xLjUnfTtcbmlmKHR5cGVvZiBfX2UgPT0gJ251bWJlcicpX19lID0gY29yZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC9Vc2Vycy96aGFvamluamlhbmcvU2l0ZXMvcHVibGljL3dlZXgvc3JjL2pzLWZyYW1ld29yay9+Ly5ucG1pbnN0YWxsL2NvcmUtanMvMi4xLjUvY29yZS1qcy9tb2R1bGVzL19jb3JlLmpzXG4gKiovIiwidmFyIGRQICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKVxuICAsIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBmdW5jdGlvbihvYmplY3QsIGtleSwgdmFsdWUpe1xuICByZXR1cm4gZFAuZihvYmplY3QsIGtleSwgY3JlYXRlRGVzYygxLCB2YWx1ZSkpO1xufSA6IGZ1bmN0aW9uKG9iamVjdCwga2V5LCB2YWx1ZSl7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIHJldHVybiBvYmplY3Q7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC9Vc2Vycy96aGFvamluamlhbmcvU2l0ZXMvcHVibGljL3dlZXgvc3JjL2pzLWZyYW1ld29yay9+Ly5ucG1pbnN0YWxsL2NvcmUtanMvMi4xLjUvY29yZS1qcy9tb2R1bGVzL19oaWRlLmpzXG4gKiovIiwidmFyIGFuT2JqZWN0ICAgICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4vX2llOC1kb20tZGVmaW5lJylcbiAgLCB0b1ByaW1pdGl2ZSAgICA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpXG4gICwgZFAgICAgICAgICAgICAgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbmV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydHkgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKXtcbiAgYW5PYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgYW5PYmplY3QoQXR0cmlidXRlcyk7XG4gIGlmKElFOF9ET01fREVGSU5FKXRyeSB7XG4gICAgcmV0dXJuIGRQKE8sIFAsIEF0dHJpYnV0ZXMpO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG4gIGlmKCdnZXQnIGluIEF0dHJpYnV0ZXMgfHwgJ3NldCcgaW4gQXR0cmlidXRlcyl0aHJvdyBUeXBlRXJyb3IoJ0FjY2Vzc29ycyBub3Qgc3VwcG9ydGVkIScpO1xuICBpZigndmFsdWUnIGluIEF0dHJpYnV0ZXMpT1tQXSA9IEF0dHJpYnV0ZXMudmFsdWU7XG4gIHJldHVybiBPO1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAvVXNlcnMvemhhb2ppbmppYW5nL1NpdGVzL3B1YmxpYy93ZWV4L3NyYy9qcy1mcmFtZXdvcmsvfi8ubnBtaW5zdGFsbC9jb3JlLWpzLzIuMS41L2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWRwLmpzXG4gKiovIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoIWlzT2JqZWN0KGl0KSl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhbiBvYmplY3QhJyk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogL1VzZXJzL3poYW9qaW5qaWFuZy9TaXRlcy9wdWJsaWMvd2VleC9zcmMvanMtZnJhbWV3b3JrL34vLm5wbWluc3RhbGwvY29yZS1qcy8yLjEuNS9jb3JlLWpzL21vZHVsZXMvX2FuLW9iamVjdC5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gdHlwZW9mIGl0ID09PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogdHlwZW9mIGl0ID09PSAnZnVuY3Rpb24nO1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAvVXNlcnMvemhhb2ppbmppYW5nL1NpdGVzL3B1YmxpYy93ZWV4L3NyYy9qcy1mcmFtZXdvcmsvfi8ubnBtaW5zdGFsbC9jb3JlLWpzLzIuMS41L2NvcmUtanMvbW9kdWxlcy9faXMtb2JqZWN0LmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSAmJiAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xyXG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkocmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpKCdkaXYnKSwgJ2EnLCB7Z2V0OiBmdW5jdGlvbigpeyByZXR1cm4gNzsgfX0pLmEgIT0gNztcclxufSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogL1VzZXJzL3poYW9qaW5qaWFuZy9TaXRlcy9wdWJsaWMvd2VleC9zcmMvanMtZnJhbWV3b3JrL34vLm5wbWluc3RhbGwvY29yZS1qcy8yLjEuNS9jb3JlLWpzL21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzXG4gKiovIiwiLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAnYScsIHtnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiA3OyB9fSkuYSAhPSA3O1xufSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogL1VzZXJzL3poYW9qaW5qaWFuZy9TaXRlcy9wdWJsaWMvd2VleC9zcmMvanMtZnJhbWV3b3JrL34vLm5wbWluc3RhbGwvY29yZS1qcy8yLjEuNS9jb3JlLWpzL21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihleGVjKXtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFleGVjKCk7XG4gIH0gY2F0Y2goZSl7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogL1VzZXJzL3poYW9qaW5qaWFuZy9TaXRlcy9wdWJsaWMvd2VleC9zcmMvanMtZnJhbWV3b3JrL34vLm5wbWluc3RhbGwvY29yZS1qcy8yLjEuNS9jb3JlLWpzL21vZHVsZXMvX2ZhaWxzLmpzXG4gKiovIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0JylcbiAgLCBkb2N1bWVudCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmRvY3VtZW50XG4gIC8vIGluIG9sZCBJRSB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBpcyAnb2JqZWN0J1xuICAsIGlzID0gaXNPYmplY3QoZG9jdW1lbnQpICYmIGlzT2JqZWN0KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpcyA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXQpIDoge307XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC9Vc2Vycy96aGFvamluamlhbmcvU2l0ZXMvcHVibGljL3dlZXgvc3JjL2pzLWZyYW1ld29yay9+Ly5ucG1pbnN0YWxsL2NvcmUtanMvMi4xLjUvY29yZS1qcy9tb2R1bGVzL19kb20tY3JlYXRlLmpzXG4gKiovIiwiLy8gNy4xLjEgVG9QcmltaXRpdmUoaW5wdXQgWywgUHJlZmVycmVkVHlwZV0pXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbi8vIGluc3RlYWQgb2YgdGhlIEVTNiBzcGVjIHZlcnNpb24sIHdlIGRpZG4ndCBpbXBsZW1lbnQgQEB0b1ByaW1pdGl2ZSBjYXNlXG4vLyBhbmQgdGhlIHNlY29uZCBhcmd1bWVudCAtIGZsYWcgLSBwcmVmZXJyZWQgdHlwZSBpcyBhIHN0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwgUyl7XG4gIGlmKCFpc09iamVjdChpdCkpcmV0dXJuIGl0O1xuICB2YXIgZm4sIHZhbDtcbiAgaWYoUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSlyZXR1cm4gdmFsO1xuICBpZih0eXBlb2YgKGZuID0gaXQudmFsdWVPZikgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIGlmKCFTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZVwiKTtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogL1VzZXJzL3poYW9qaW5qaWFuZy9TaXRlcy9wdWJsaWMvd2VleC9zcmMvanMtZnJhbWV3b3JrL34vLm5wbWluc3RhbGwvY29yZS1qcy8yLjEuNS9jb3JlLWpzL21vZHVsZXMvX3RvLXByaW1pdGl2ZS5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYml0bWFwLCB2YWx1ZSl7XG4gIHJldHVybiB7XG4gICAgZW51bWVyYWJsZSAgOiAhKGJpdG1hcCAmIDEpLFxuICAgIGNvbmZpZ3VyYWJsZTogIShiaXRtYXAgJiAyKSxcbiAgICB3cml0YWJsZSAgICA6ICEoYml0bWFwICYgNCksXG4gICAgdmFsdWUgICAgICAgOiB2YWx1ZVxuICB9O1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAvVXNlcnMvemhhb2ppbmppYW5nL1NpdGVzL3B1YmxpYy93ZWV4L3NyYy9qcy1mcmFtZXdvcmsvfi8ubnBtaW5zdGFsbC9jb3JlLWpzLzIuMS41L2NvcmUtanMvbW9kdWxlcy9fcHJvcGVydHktZGVzYy5qc1xuICoqLyIsInZhciBnbG9iYWwgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIGhpZGUgICAgICA9IHJlcXVpcmUoJy4vX2hpZGUnKVxuICAsIGhhcyAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgU1JDICAgICAgID0gcmVxdWlyZSgnLi9fdWlkJykoJ3NyYycpXG4gICwgVE9fU1RSSU5HID0gJ3RvU3RyaW5nJ1xuICAsICR0b1N0cmluZyA9IEZ1bmN0aW9uW1RPX1NUUklOR11cbiAgLCBUUEwgICAgICAgPSAoJycgKyAkdG9TdHJpbmcpLnNwbGl0KFRPX1NUUklORyk7XG5cbnJlcXVpcmUoJy4vX2NvcmUnKS5pbnNwZWN0U291cmNlID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gJHRvU3RyaW5nLmNhbGwoaXQpO1xufTtcblxuKG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oTywga2V5LCB2YWwsIHNhZmUpe1xuICB2YXIgaXNGdW5jdGlvbiA9IHR5cGVvZiB2YWwgPT0gJ2Z1bmN0aW9uJztcbiAgaWYoaXNGdW5jdGlvbiloYXModmFsLCAnbmFtZScpIHx8IGhpZGUodmFsLCAnbmFtZScsIGtleSk7XG4gIGlmKE9ba2V5XSA9PT0gdmFsKXJldHVybjtcbiAgaWYoaXNGdW5jdGlvbiloYXModmFsLCBTUkMpIHx8IGhpZGUodmFsLCBTUkMsIE9ba2V5XSA/ICcnICsgT1trZXldIDogVFBMLmpvaW4oU3RyaW5nKGtleSkpKTtcbiAgaWYoTyA9PT0gZ2xvYmFsKXtcbiAgICBPW2tleV0gPSB2YWw7XG4gIH0gZWxzZSB7XG4gICAgaWYoIXNhZmUpe1xuICAgICAgZGVsZXRlIE9ba2V5XTtcbiAgICAgIGhpZGUoTywga2V5LCB2YWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZihPW2tleV0pT1trZXldID0gdmFsO1xuICAgICAgZWxzZSBoaWRlKE8sIGtleSwgdmFsKTtcbiAgICB9XG4gIH1cbi8vIGFkZCBmYWtlIEZ1bmN0aW9uI3RvU3RyaW5nIGZvciBjb3JyZWN0IHdvcmsgd3JhcHBlZCBtZXRob2RzIC8gY29uc3RydWN0b3JzIHdpdGggbWV0aG9kcyBsaWtlIExvRGFzaCBpc05hdGl2ZVxufSkoRnVuY3Rpb24ucHJvdG90eXBlLCBUT19TVFJJTkcsIGZ1bmN0aW9uIHRvU3RyaW5nKCl7XG4gIHJldHVybiB0eXBlb2YgdGhpcyA9PSAnZnVuY3Rpb24nICYmIHRoaXNbU1JDXSB8fCAkdG9TdHJpbmcuY2FsbCh0aGlzKTtcbn0pO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC9Vc2Vycy96aGFvamluamlhbmcvU2l0ZXMvcHVibGljL3dlZXgvc3JjL2pzLWZyYW1ld29yay9+Ly5ucG1pbnN0YWxsL2NvcmUtanMvMi4xLjUvY29yZS1qcy9tb2R1bGVzL19yZWRlZmluZS5qc1xuICoqLyIsInZhciBoYXNPd25Qcm9wZXJ0eSA9IHt9Lmhhc093blByb3BlcnR5O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwga2V5KXtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoaXQsIGtleSk7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC9Vc2Vycy96aGFvamluamlhbmcvU2l0ZXMvcHVibGljL3dlZXgvc3JjL2pzLWZyYW1ld29yay9+Ly5ucG1pbnN0YWxsL2NvcmUtanMvMi4xLjUvY29yZS1qcy9tb2R1bGVzL19oYXMuanNcbiAqKi8iLCJ2YXIgaWQgPSAwXG4gICwgcHggPSBNYXRoLnJhbmRvbSgpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gJ1N5bWJvbCgnLmNvbmNhdChrZXkgPT09IHVuZGVmaW5lZCA/ICcnIDoga2V5LCAnKV8nLCAoKytpZCArIHB4KS50b1N0cmluZygzNikpO1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAvVXNlcnMvemhhb2ppbmppYW5nL1NpdGVzL3B1YmxpYy93ZWV4L3NyYy9qcy1mcmFtZXdvcmsvfi8ubnBtaW5zdGFsbC9jb3JlLWpzLzIuMS41L2NvcmUtanMvbW9kdWxlcy9fdWlkLmpzXG4gKiovIiwiLy8gb3B0aW9uYWwgLyBzaW1wbGUgY29udGV4dCBiaW5kaW5nXG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihmbiwgdGhhdCwgbGVuZ3RoKXtcbiAgYUZ1bmN0aW9uKGZuKTtcbiAgaWYodGhhdCA9PT0gdW5kZWZpbmVkKXJldHVybiBmbjtcbiAgc3dpdGNoKGxlbmd0aCl7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24oYSl7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhKTtcbiAgICB9O1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmN0aW9uKGEsIGIpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYik7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbihhLCBiLCBjKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIsIGMpO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uKC8qIC4uLmFyZ3MgKi8pe1xuICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICB9O1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAvVXNlcnMvemhhb2ppbmppYW5nL1NpdGVzL3B1YmxpYy93ZWV4L3NyYy9qcy1mcmFtZXdvcmsvfi8ubnBtaW5zdGFsbC9jb3JlLWpzLzIuMS41L2NvcmUtanMvbW9kdWxlcy9fY3R4LmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKHR5cGVvZiBpdCAhPSAnZnVuY3Rpb24nKXRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGEgZnVuY3Rpb24hJyk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogL1VzZXJzL3poYW9qaW5qaWFuZy9TaXRlcy9wdWJsaWMvd2VleC9zcmMvanMtZnJhbWV3b3JrL34vLm5wbWluc3RhbGwvY29yZS1qcy8yLjEuNS9jb3JlLWpzL21vZHVsZXMvX2EtZnVuY3Rpb24uanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG4vLyAxOS4xLjIuMSBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlLCAuLi4pXG52YXIgZ2V0S2V5cyAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpXG4gICwgZ09QUyAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wcycpXG4gICwgcElFICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtcGllJylcbiAgLCB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpXG4gICwgSU9iamVjdCAgPSByZXF1aXJlKCcuL19pb2JqZWN0JylcbiAgLCAkYXNzaWduICA9IE9iamVjdC5hc3NpZ247XG5cbi8vIHNob3VsZCB3b3JrIHdpdGggc3ltYm9scyBhbmQgc2hvdWxkIGhhdmUgZGV0ZXJtaW5pc3RpYyBwcm9wZXJ0eSBvcmRlciAoVjggYnVnKVxubW9kdWxlLmV4cG9ydHMgPSAhJGFzc2lnbiB8fCByZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uKCl7XG4gIHZhciBBID0ge31cbiAgICAsIEIgPSB7fVxuICAgICwgUyA9IFN5bWJvbCgpXG4gICAgLCBLID0gJ2FiY2RlZmdoaWprbG1ub3BxcnN0JztcbiAgQVtTXSA9IDc7XG4gIEsuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24oayl7IEJba10gPSBrOyB9KTtcbiAgcmV0dXJuICRhc3NpZ24oe30sIEEpW1NdICE9IDcgfHwgT2JqZWN0LmtleXMoJGFzc2lnbih7fSwgQikpLmpvaW4oJycpICE9IEs7XG59KSA/IGZ1bmN0aW9uIGFzc2lnbih0YXJnZXQsIHNvdXJjZSl7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgdmFyIFQgICAgID0gdG9PYmplY3QodGFyZ2V0KVxuICAgICwgYUxlbiAgPSBhcmd1bWVudHMubGVuZ3RoXG4gICAgLCBpbmRleCA9IDFcbiAgICAsIGdldFN5bWJvbHMgPSBnT1BTLmZcbiAgICAsIGlzRW51bSAgICAgPSBwSUUuZjtcbiAgd2hpbGUoYUxlbiA+IGluZGV4KXtcbiAgICB2YXIgUyAgICAgID0gSU9iamVjdChhcmd1bWVudHNbaW5kZXgrK10pXG4gICAgICAsIGtleXMgICA9IGdldFN5bWJvbHMgPyBnZXRLZXlzKFMpLmNvbmNhdChnZXRTeW1ib2xzKFMpKSA6IGdldEtleXMoUylcbiAgICAgICwgbGVuZ3RoID0ga2V5cy5sZW5ndGhcbiAgICAgICwgaiAgICAgID0gMFxuICAgICAgLCBrZXk7XG4gICAgd2hpbGUobGVuZ3RoID4gailpZihpc0VudW0uY2FsbChTLCBrZXkgPSBrZXlzW2orK10pKVRba2V5XSA9IFNba2V5XTtcbiAgfSByZXR1cm4gVDtcbn0gOiAkYXNzaWduO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC9Vc2Vycy96aGFvamluamlhbmcvU2l0ZXMvcHVibGljL3dlZXgvc3JjL2pzLWZyYW1ld29yay9+Ly5ucG1pbnN0YWxsL2NvcmUtanMvMi4xLjUvY29yZS1qcy9tb2R1bGVzL19vYmplY3QtYXNzaWduLmpzXG4gKiovIiwiLy8gMTkuMS4yLjE0IC8gMTUuMi4zLjE0IE9iamVjdC5rZXlzKE8pXHJcbnZhciAka2V5cyAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzLWludGVybmFsJylcclxuICAsIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi9fZW51bS1idWcta2V5cycpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiBrZXlzKE8pe1xyXG4gIHJldHVybiAka2V5cyhPLCBlbnVtQnVnS2V5cyk7XHJcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogL1VzZXJzL3poYW9qaW5qaWFuZy9TaXRlcy9wdWJsaWMvd2VleC9zcmMvanMtZnJhbWV3b3JrL34vLm5wbWluc3RhbGwvY29yZS1qcy8yLjEuNS9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1rZXlzLmpzXG4gKiovIiwidmFyIGhhcyAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXHJcbiAgLCB0b0lPYmplY3QgICAgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcclxuICAsIGFycmF5SW5kZXhPZiA9IHJlcXVpcmUoJy4vX2FycmF5LWluY2x1ZGVzJykoZmFsc2UpXHJcbiAgLCBJRV9QUk9UTyAgICAgPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iamVjdCwgbmFtZXMpe1xyXG4gIHZhciBPICAgICAgPSB0b0lPYmplY3Qob2JqZWN0KVxyXG4gICAgLCBpICAgICAgPSAwXHJcbiAgICAsIHJlc3VsdCA9IFtdXHJcbiAgICAsIGtleTtcclxuICBmb3Ioa2V5IGluIE8paWYoa2V5ICE9IElFX1BST1RPKWhhcyhPLCBrZXkpICYmIHJlc3VsdC5wdXNoKGtleSk7XHJcbiAgLy8gRG9uJ3QgZW51bSBidWcgJiBoaWRkZW4ga2V5c1xyXG4gIHdoaWxlKG5hbWVzLmxlbmd0aCA+IGkpaWYoaGFzKE8sIGtleSA9IG5hbWVzW2krK10pKXtcclxuICAgIH5hcnJheUluZGV4T2YocmVzdWx0LCBrZXkpIHx8IHJlc3VsdC5wdXNoKGtleSk7XHJcbiAgfVxyXG4gIHJldHVybiByZXN1bHQ7XHJcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogL1VzZXJzL3poYW9qaW5qaWFuZy9TaXRlcy9wdWJsaWMvd2VleC9zcmMvanMtZnJhbWV3b3JrL34vLm5wbWluc3RhbGwvY29yZS1qcy8yLjEuNS9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1rZXlzLWludGVybmFsLmpzXG4gKiovIiwiLy8gdG8gaW5kZXhlZCBvYmplY3QsIHRvT2JqZWN0IHdpdGggZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBzdHJpbmdzXG52YXIgSU9iamVjdCA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKVxuICAsIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIElPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAvVXNlcnMvemhhb2ppbmppYW5nL1NpdGVzL3B1YmxpYy93ZWV4L3NyYy9qcy1mcmFtZXdvcmsvfi8ubnBtaW5zdGFsbC9jb3JlLWpzLzIuMS41L2NvcmUtanMvbW9kdWxlcy9fdG8taW9iamVjdC5qc1xuICoqLyIsIi8vIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgYW5kIG5vbi1lbnVtZXJhYmxlIG9sZCBWOCBzdHJpbmdzXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJyk7XG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdCgneicpLnByb3BlcnR5SXNFbnVtZXJhYmxlKDApID8gT2JqZWN0IDogZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gY29mKGl0KSA9PSAnU3RyaW5nJyA/IGl0LnNwbGl0KCcnKSA6IE9iamVjdChpdCk7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC9Vc2Vycy96aGFvamluamlhbmcvU2l0ZXMvcHVibGljL3dlZXgvc3JjL2pzLWZyYW1ld29yay9+Ly5ucG1pbnN0YWxsL2NvcmUtanMvMi4xLjUvY29yZS1qcy9tb2R1bGVzL19pb2JqZWN0LmpzXG4gKiovIiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChpdCkuc2xpY2UoOCwgLTEpO1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAvVXNlcnMvemhhb2ppbmppYW5nL1NpdGVzL3B1YmxpYy93ZWV4L3NyYy9qcy1mcmFtZXdvcmsvfi8ubnBtaW5zdGFsbC9jb3JlLWpzLzIuMS41L2NvcmUtanMvbW9kdWxlcy9fY29mLmpzXG4gKiovIiwiLy8gNy4yLjEgUmVxdWlyZU9iamVjdENvZXJjaWJsZShhcmd1bWVudClcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICBpZihpdCA9PSB1bmRlZmluZWQpdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gIFwiICsgaXQpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC9Vc2Vycy96aGFvamluamlhbmcvU2l0ZXMvcHVibGljL3dlZXgvc3JjL2pzLWZyYW1ld29yay9+Ly5ucG1pbnN0YWxsL2NvcmUtanMvMi4xLjUvY29yZS1qcy9tb2R1bGVzL19kZWZpbmVkLmpzXG4gKiovIiwiLy8gZmFsc2UgLT4gQXJyYXkjaW5kZXhPZlxuLy8gdHJ1ZSAgLT4gQXJyYXkjaW5jbHVkZXNcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcbiAgLCB0b0xlbmd0aCAgPSByZXF1aXJlKCcuL190by1sZW5ndGgnKVxuICAsIHRvSW5kZXggICA9IHJlcXVpcmUoJy4vX3RvLWluZGV4Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKElTX0lOQ0xVREVTKXtcbiAgcmV0dXJuIGZ1bmN0aW9uKCR0aGlzLCBlbCwgZnJvbUluZGV4KXtcbiAgICB2YXIgTyAgICAgID0gdG9JT2JqZWN0KCR0aGlzKVxuICAgICAgLCBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aClcbiAgICAgICwgaW5kZXggID0gdG9JbmRleChmcm9tSW5kZXgsIGxlbmd0aClcbiAgICAgICwgdmFsdWU7XG4gICAgLy8gQXJyYXkjaW5jbHVkZXMgdXNlcyBTYW1lVmFsdWVaZXJvIGVxdWFsaXR5IGFsZ29yaXRobVxuICAgIGlmKElTX0lOQ0xVREVTICYmIGVsICE9IGVsKXdoaWxlKGxlbmd0aCA+IGluZGV4KXtcbiAgICAgIHZhbHVlID0gT1tpbmRleCsrXTtcbiAgICAgIGlmKHZhbHVlICE9IHZhbHVlKXJldHVybiB0cnVlO1xuICAgIC8vIEFycmF5I3RvSW5kZXggaWdub3JlcyBob2xlcywgQXJyYXkjaW5jbHVkZXMgLSBub3RcbiAgICB9IGVsc2UgZm9yKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKylpZihJU19JTkNMVURFUyB8fCBpbmRleCBpbiBPKXtcbiAgICAgIGlmKE9baW5kZXhdID09PSBlbClyZXR1cm4gSVNfSU5DTFVERVMgfHwgaW5kZXg7XG4gICAgfSByZXR1cm4gIUlTX0lOQ0xVREVTICYmIC0xO1xuICB9O1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAvVXNlcnMvemhhb2ppbmppYW5nL1NpdGVzL3B1YmxpYy93ZWV4L3NyYy9qcy1mcmFtZXdvcmsvfi8ubnBtaW5zdGFsbC9jb3JlLWpzLzIuMS41L2NvcmUtanMvbW9kdWxlcy9fYXJyYXktaW5jbHVkZXMuanNcbiAqKi8iLCIvLyA3LjEuMTUgVG9MZW5ndGhcbnZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJylcbiAgLCBtaW4gICAgICAgPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXQgPiAwID8gbWluKHRvSW50ZWdlcihpdCksIDB4MWZmZmZmZmZmZmZmZmYpIDogMDsgLy8gcG93KDIsIDUzKSAtIDEgPT0gOTAwNzE5OTI1NDc0MDk5MVxufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAvVXNlcnMvemhhb2ppbmppYW5nL1NpdGVzL3B1YmxpYy93ZWV4L3NyYy9qcy1mcmFtZXdvcmsvfi8ubnBtaW5zdGFsbC9jb3JlLWpzLzIuMS41L2NvcmUtanMvbW9kdWxlcy9fdG8tbGVuZ3RoLmpzXG4gKiovIiwiLy8gNy4xLjQgVG9JbnRlZ2VyXG52YXIgY2VpbCAgPSBNYXRoLmNlaWxcbiAgLCBmbG9vciA9IE1hdGguZmxvb3I7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGlzTmFOKGl0ID0gK2l0KSA/IDAgOiAoaXQgPiAwID8gZmxvb3IgOiBjZWlsKShpdCk7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC9Vc2Vycy96aGFvamluamlhbmcvU2l0ZXMvcHVibGljL3dlZXgvc3JjL2pzLWZyYW1ld29yay9+Ly5ucG1pbnN0YWxsL2NvcmUtanMvMi4xLjUvY29yZS1qcy9tb2R1bGVzL190by1pbnRlZ2VyLmpzXG4gKiovIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKVxuICAsIG1heCAgICAgICA9IE1hdGgubWF4XG4gICwgbWluICAgICAgID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGluZGV4LCBsZW5ndGgpe1xuICBpbmRleCA9IHRvSW50ZWdlcihpbmRleCk7XG4gIHJldHVybiBpbmRleCA8IDAgPyBtYXgoaW5kZXggKyBsZW5ndGgsIDApIDogbWluKGluZGV4LCBsZW5ndGgpO1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAvVXNlcnMvemhhb2ppbmppYW5nL1NpdGVzL3B1YmxpYy93ZWV4L3NyYy9qcy1mcmFtZXdvcmsvfi8ubnBtaW5zdGFsbC9jb3JlLWpzLzIuMS41L2NvcmUtanMvbW9kdWxlcy9fdG8taW5kZXguanNcbiAqKi8iLCJ2YXIgc2hhcmVkID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ2tleXMnKVxyXG4gICwgdWlkICAgID0gcmVxdWlyZSgnLi9fdWlkJyk7XHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oa2V5KXtcclxuICByZXR1cm4gc2hhcmVkW2tleV0gfHwgKHNoYXJlZFtrZXldID0gdWlkKGtleSkpO1xyXG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC9Vc2Vycy96aGFvamluamlhbmcvU2l0ZXMvcHVibGljL3dlZXgvc3JjL2pzLWZyYW1ld29yay9+Ly5ucG1pbnN0YWxsL2NvcmUtanMvMi4xLjUvY29yZS1qcy9tb2R1bGVzL19zaGFyZWQta2V5LmpzXG4gKiovIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgU0hBUkVEID0gJ19fY29yZS1qc19zaGFyZWRfXydcbiAgLCBzdG9yZSAgPSBnbG9iYWxbU0hBUkVEXSB8fCAoZ2xvYmFsW1NIQVJFRF0gPSB7fSk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIHJldHVybiBzdG9yZVtrZXldIHx8IChzdG9yZVtrZXldID0ge30pO1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAvVXNlcnMvemhhb2ppbmppYW5nL1NpdGVzL3B1YmxpYy93ZWV4L3NyYy9qcy1mcmFtZXdvcmsvfi8ubnBtaW5zdGFsbC9jb3JlLWpzLzIuMS41L2NvcmUtanMvbW9kdWxlcy9fc2hhcmVkLmpzXG4gKiovIiwiLy8gSUUgOC0gZG9uJ3QgZW51bSBidWcga2V5c1xyXG5tb2R1bGUuZXhwb3J0cyA9IChcclxuICAnY29uc3RydWN0b3IsaGFzT3duUHJvcGVydHksaXNQcm90b3R5cGVPZixwcm9wZXJ0eUlzRW51bWVyYWJsZSx0b0xvY2FsZVN0cmluZyx0b1N0cmluZyx2YWx1ZU9mJ1xyXG4pLnNwbGl0KCcsJyk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogL1VzZXJzL3poYW9qaW5qaWFuZy9TaXRlcy9wdWJsaWMvd2VleC9zcmMvanMtZnJhbWV3b3JrL34vLm5wbWluc3RhbGwvY29yZS1qcy8yLjEuNS9jb3JlLWpzL21vZHVsZXMvX2VudW0tYnVnLWtleXMuanNcbiAqKi8iLCJleHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC9Vc2Vycy96aGFvamluamlhbmcvU2l0ZXMvcHVibGljL3dlZXgvc3JjL2pzLWZyYW1ld29yay9+Ly5ucG1pbnN0YWxsL2NvcmUtanMvMi4xLjUvY29yZS1qcy9tb2R1bGVzL19vYmplY3QtZ29wcy5qc1xuICoqLyIsImV4cG9ydHMuZiA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC9Vc2Vycy96aGFvamluamlhbmcvU2l0ZXMvcHVibGljL3dlZXgvc3JjL2pzLWZyYW1ld29yay9+Ly5ucG1pbnN0YWxsL2NvcmUtanMvMi4xLjUvY29yZS1qcy9tb2R1bGVzL19vYmplY3QtcGllLmpzXG4gKiovIiwiLy8gNy4xLjEzIFRvT2JqZWN0KGFyZ3VtZW50KVxudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIE9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC9Vc2Vycy96aGFvamluamlhbmcvU2l0ZXMvcHVibGljL3dlZXgvc3JjL2pzLWZyYW1ld29yay9+Ly5ucG1pbnN0YWxsL2NvcmUtanMvMi4xLjUvY29yZS1qcy9tb2R1bGVzL190by1vYmplY3QuanNcbiAqKi8iLCJjb25zdCBPcmlnaW5Qcm9taXNlID0gZ2xvYmFsLlByb21pc2UgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHt9XG5jb25zdCBNU0cgPSAnVXNpbmcgXCJQcm9taXNlXCIgaXMgdW5leHBlY3RlZCdcblxuY29uc3QgVW5leHBlY3RlZFByb21pc2UgPSBmdW5jdGlvbiAoLi4uYXJncykge1xuICBjb25zb2xlLndhcm4oTVNHKVxuICByZXR1cm4gbmV3IE9yaWdpblByb21pc2UoLi4uYXJncylcbn1cblxuY29uc3QgZm4gPSBbJ2FsbCcsICdyYWNlJywgJ3Jlc29sdmUnLCAncmVqZWN0J11cbmZuLmZvckVhY2gobiA9PiB7XG4gIFVuZXhwZWN0ZWRQcm9taXNlW25dID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcbiAgICBjb25zb2xlLndhcm4oTVNHKVxuICAgIHJldHVybiBPcmlnaW5Qcm9taXNlW25dICYmIE9yaWdpblByb21pc2Vbbl0oLi4uYXJncylcbiAgfVxufSlcblxuZ2xvYmFsLlByb21pc2UgPSBVbmV4cGVjdGVkUHJvbWlzZVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC9Vc2Vycy96aGFvamluamlhbmcvU2l0ZXMvcHVibGljL3dlZXgvc3JjL2pzLWZyYW1ld29yay9wb2x5ZmlsbC9wcm9taXNlLmpzXG4gKiovIiwiY29uc3QgeyBjb25zb2xlLCBuYXRpdmVMb2cgfSA9IGdsb2JhbFxuY29uc3QgTEVWRUxTID0gWydlcnJvcicsICd3YXJuJywgJ2luZm8nLCAnbG9nJywgJ2RlYnVnJ11cbmNvbnN0IGxldmVsTWFwID0ge31cblxuZ2VuZXJhdGVMZXZlbE1hcCgpXG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuaWYgKFxuICB0eXBlb2YgY29uc29sZSA9PT0gJ3VuZGVmaW5lZCcgfHwgLy8gQW5kcm9pZFxuICAoZ2xvYmFsLldYRW52aXJvbm1lbnQgJiYgZ2xvYmFsLldYRW52aXJvbm1lbnQucGxhdGZvcm0gPT09ICdpT1MnKSAvLyBpT1Ncbikge1xuICBnbG9iYWwuY29uc29sZSA9IHtcbiAgICBkZWJ1ZzogKC4uLmFyZ3MpID0+IHtcbiAgICAgIGlmIChjaGVja0xldmVsKCdkZWJ1ZycpKSB7IG5hdGl2ZUxvZyguLi5mb3JtYXQoYXJncyksICdfX0RFQlVHJykgfVxuICAgIH0sXG4gICAgbG9nOiAoLi4uYXJncykgPT4ge1xuICAgICAgaWYgKGNoZWNrTGV2ZWwoJ2xvZycpKSB7IG5hdGl2ZUxvZyguLi5mb3JtYXQoYXJncyksICdfX0xPRycpIH1cbiAgICB9LFxuICAgIGluZm86ICguLi5hcmdzKSA9PiB7XG4gICAgICBpZiAoY2hlY2tMZXZlbCgnaW5mbycpKSB7IG5hdGl2ZUxvZyguLi5mb3JtYXQoYXJncyksICdfX0lORk8nKSB9XG4gICAgfSxcbiAgICB3YXJuOiAoLi4uYXJncykgPT4ge1xuICAgICAgaWYgKGNoZWNrTGV2ZWwoJ3dhcm4nKSkgeyBuYXRpdmVMb2coLi4uZm9ybWF0KGFyZ3MpLCAnX19XQVJOJykgfVxuICAgIH0sXG4gICAgZXJyb3I6ICguLi5hcmdzKSA9PiB7XG4gICAgICBpZiAoY2hlY2tMZXZlbCgnZXJyb3InKSkgeyBuYXRpdmVMb2coLi4uZm9ybWF0KGFyZ3MpLCAnX19FUlJPUicpIH1cbiAgICB9XG4gIH1cbn1cbmVsc2UgeyAvLyBIVE1MNVxuICBjb25zdCB7IGRlYnVnLCBsb2csIGluZm8sIHdhcm4sIGVycm9yIH0gPSBjb25zb2xlXG4gIGNvbnNvbGUuX19vcmlfXyA9IHsgZGVidWcsIGxvZywgaW5mbywgd2FybiwgZXJyb3IgfVxuICBjb25zb2xlLmRlYnVnID0gKC4uLmFyZ3MpID0+IHtcbiAgICBpZiAoY2hlY2tMZXZlbCgnZGVidWcnKSkgeyBjb25zb2xlLl9fb3JpX18uZGVidWcuYXBwbHkoY29uc29sZSwgYXJncykgfVxuICB9XG4gIGNvbnNvbGUubG9nID0gKC4uLmFyZ3MpID0+IHtcbiAgICBpZiAoY2hlY2tMZXZlbCgnbG9nJykpIHsgY29uc29sZS5fX29yaV9fLmxvZy5hcHBseShjb25zb2xlLCBhcmdzKSB9XG4gIH1cbiAgY29uc29sZS5pbmZvID0gKC4uLmFyZ3MpID0+IHtcbiAgICBpZiAoY2hlY2tMZXZlbCgnaW5mbycpKSB7IGNvbnNvbGUuX19vcmlfXy5pbmZvLmFwcGx5KGNvbnNvbGUsIGFyZ3MpIH1cbiAgfVxuICBjb25zb2xlLndhcm4gPSAoLi4uYXJncykgPT4ge1xuICAgIGlmIChjaGVja0xldmVsKCd3YXJuJykpIHsgY29uc29sZS5fX29yaV9fLndhcm4uYXBwbHkoY29uc29sZSwgYXJncykgfVxuICB9XG4gIGNvbnNvbGUuZXJyb3IgPSAoLi4uYXJncykgPT4ge1xuICAgIGlmIChjaGVja0xldmVsKCdlcnJvcicpKSB7IGNvbnNvbGUuX19vcmlfXy5lcnJvci5hcHBseShjb25zb2xlLCBhcmdzKSB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVMZXZlbE1hcCAoKSB7XG4gIExFVkVMUy5mb3JFYWNoKGxldmVsID0+IHtcbiAgICBjb25zdCBsZXZlbEluZGV4ID0gTEVWRUxTLmluZGV4T2YobGV2ZWwpXG4gICAgbGV2ZWxNYXBbbGV2ZWxdID0ge31cbiAgICBMRVZFTFMuZm9yRWFjaCh0eXBlID0+IHtcbiAgICAgIGNvbnN0IHR5cGVJbmRleCA9IExFVkVMUy5pbmRleE9mKHR5cGUpXG4gICAgICBpZiAodHlwZUluZGV4IDw9IGxldmVsSW5kZXgpIHtcbiAgICAgICAgbGV2ZWxNYXBbbGV2ZWxdW3R5cGVdID0gdHJ1ZVxuICAgICAgfVxuICAgIH0pXG4gIH0pXG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZSAodikge1xuICBjb25zdCB0eXBlID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHYpXG4gIGlmICh0eXBlLnRvTG93ZXJDYXNlKCkgPT09ICdbb2JqZWN0IG9iamVjdF0nKSB7XG4gICAgdiA9IEpTT04uc3RyaW5naWZ5KHYpXG4gIH1cbiAgZWxzZSB7XG4gICAgdiA9IFN0cmluZyh2KVxuICB9XG4gIHJldHVybiB2XG59XG5cbmZ1bmN0aW9uIGNoZWNrTGV2ZWwgKHR5cGUpIHtcbiAgY29uc3QgbG9nTGV2ZWwgPSAoZ2xvYmFsLldYRW52aXJvbm1lbnQgJiYgZ2xvYmFsLldYRW52aXJvbm1lbnQubG9nTGV2ZWwpIHx8ICdsb2cnXG4gIHJldHVybiBsZXZlbE1hcFtsb2dMZXZlbF0gJiYgbGV2ZWxNYXBbbG9nTGV2ZWxdW3R5cGVdXG59XG5cbmZ1bmN0aW9uIGZvcm1hdCAoYXJncykge1xuICByZXR1cm4gYXJncy5tYXAodiA9PiBub3JtYWxpemUodikpXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAvVXNlcnMvemhhb2ppbmppYW5nL1NpdGVzL3B1YmxpYy93ZWV4L3NyYy9qcy1mcmFtZXdvcmsvcG9seWZpbGwvY29uc29sZWxvZy5qc1xuICoqLyIsImltcG9ydCBmcmFtZXdvcmtzIGZyb20gJy4vZnJhbWV3b3JrcydcblxuY29uc3QgdmVyc2lvblJlZ0V4cCA9IC9eXFwvXFwvICooXFx7W15cXH1dKlxcfSkgKlxccj9cXG4vXG5cbmZ1bmN0aW9uIGNoZWNrVmVyc2lvbiAoY29kZSkge1xuICBsZXQgaW5mb1xuICBjb25zdCByZXN1bHQgPSB2ZXJzaW9uUmVnRXhwLmV4ZWMoY29kZSlcbiAgaWYgKHJlc3VsdCkge1xuICAgIHRyeSB7XG4gICAgICBpbmZvID0gSlNPTi5wYXJzZShyZXN1bHRbMV0pXG4gICAgfSBjYXRjaCAoZSkge31cbiAgfVxuICByZXR1cm4gaW5mb1xufVxuXG5jb25zdCBpbnN0YW5jZU1hcCA9IHt9XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVJbnN0YW5jZSAoaWQsIGNvZGUsIGNvbmZpZywgZGF0YSkge1xuICBsZXQgaW5mbyA9IGluc3RhbmNlTWFwW2lkXVxuICBpZiAoIWluZm8pIHtcbiAgICBpbmZvID0gY2hlY2tWZXJzaW9uKGNvZGUpIHx8IHt9XG4gICAgaWYgKCFmcmFtZXdvcmtzW2luZm8uZnJhbWV3b3JrXSkge1xuICAgICAgaW5mby5mcmFtZXdvcmsgPSAnV2VleCdcbiAgICB9XG4gICAgaW5zdGFuY2VNYXBbaWRdID0gaW5mb1xuICAgIHJldHVybiBmcmFtZXdvcmtzW2luZm8uZnJhbWV3b3JrXS5jcmVhdGVJbnN0YW5jZShpZCwgY29kZSwgY29uZmlnLCBkYXRhKVxuICB9XG4gIHJldHVybiBuZXcgRXJyb3IoYGludmFsaWQgaW5zdGFuY2UgaWQgXCIke2lkfVwiYClcbn1cblxuY29uc3QgbWV0aG9kcyA9IHtcbiAgY3JlYXRlSW5zdGFuY2Vcbn1cblxuZnVuY3Rpb24gZ2VuSW5pdChtZXRob2ROYW1lKSB7XG4gIG1ldGhvZHNbbWV0aG9kTmFtZV0gPSBmdW5jdGlvbiAoLi4uYXJncykge1xuICAgIGZvciAoY29uc3QgbmFtZSBpbiBmcmFtZXdvcmtzKSB7XG4gICAgICBjb25zdCBmcmFtZXdvcmsgPSBmcmFtZXdvcmtzW25hbWVdXG4gICAgICBpZiAoZnJhbWV3b3JrICYmIGZyYW1ld29ya1ttZXRob2ROYW1lXSkge1xuICAgICAgICBmcmFtZXdvcmtbbWV0aG9kTmFtZV0oLi4uYXJncylcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuWydyZWdpc3RlckNvbXBvbmVudHMnLCAncmVnaXN0ZXJNb2R1bGVzJywgJ3JlZ2lzdGVyTWV0aG9kcyddLmZvckVhY2goZ2VuSW5pdClcblxuZnVuY3Rpb24gZ2VuSW5zdGFuY2UobWV0aG9kTmFtZSkge1xuICBtZXRob2RzW21ldGhvZE5hbWVdID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcbiAgICBjb25zdCBpZCA9IGFyZ3NbMF1cbiAgICBjb25zdCBpbmZvID0gaW5zdGFuY2VNYXBbaWRdXG4gICAgaWYgKGluZm8gJiYgZnJhbWV3b3Jrc1tpbmZvLmZyYW1ld29ya10pIHtcbiAgICAgIHJldHVybiBmcmFtZXdvcmtzW2luZm8uZnJhbWV3b3JrXVttZXRob2ROYW1lXSguLi5hcmdzKVxuICAgIH1cbiAgICByZXR1cm4gbmV3IEVycm9yKGBpbnZhbGlkIGluc3RhbmNlIGlkIFwiJHtpZH1cImApXG4gIH1cbn1cblxuWydkZXN0cm95SW5zdGFuY2UnLCAncmVmcmVzaEluc3RhbmNlJywgJ2NhbGxKUycsICdnZXRSb290J10uZm9yRWFjaChnZW5JbnN0YW5jZSlcblxubWV0aG9kcy5yZWNlaXZlVGFza3MgPSBtZXRob2RzLmNhbGxKU1xuXG5leHBvcnQgZGVmYXVsdCBtZXRob2RzXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAvVXNlcnMvemhhb2ppbmppYW5nL1NpdGVzL3B1YmxpYy93ZWV4L3NyYy9qcy1mcmFtZXdvcmsvbGliL3J1bnRpbWUvaW5kZXguanNcbiAqKi8iLCJpbXBvcnQgV2VleCBmcm9tICcuL2RlZmF1bHQnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgV2VleFxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogL1VzZXJzL3poYW9qaW5qaWFuZy9TaXRlcy9wdWJsaWMvd2VleC9zcmMvanMtZnJhbWV3b3JrL2xpYi9ydW50aW1lL2ZyYW1ld29ya3MuanNcbiAqKi8iLCIvKipcbiAqIEBmaWxlT3ZlcnZpZXcgTWFpbiBlbnRyeSwgaW5zdGFuY2UgbWFuYWdlclxuICpcbiAqIC0gY3JlYXRlSW5zdGFuY2UoaW5zdGFuY2VJZCwgY29kZSwgb3B0aW9ucywgZGF0YSlcbiAqIC0gcmVmcmVzaEluc3RhbmNlKGluc3RhbmNlSWQsIGRhdGEpXG4gKiAtIGRlc3Ryb3lJbnN0YW5jZShpbnN0YW5jZUlkKVxuICogLSByZWdpc3RlckNvbXBvbmVudHMoY29tcG9uZW50cylcbiAqIC0gcmVnaXN0ZXJNb2R1bGVzKG1vZHVsZXMpXG4gKiAtIGdldFJvb3QoaW5zdGFuY2VJZClcbiAqIC0gaW5zdGFuY2VNYXBcbiAqIC0gY2FsbEpTKGluc3RhbmNlSWQsIHRhc2tzKVxuICogICAtIGZpcmVFdmVudChyZWYsIHR5cGUsIGRhdGEpXG4gKiAgIC0gY2FsbGJhY2soZnVuY0lkLCBkYXRhKVxuICovXG5cbmltcG9ydCAqIGFzIGNvbmZpZyBmcm9tICcuLi9jb25maWcnXG5pbXBvcnQgQXBwSW5zdGFuY2UgZnJvbSAnLi4vYXBwJ1xuaW1wb3J0IFZtIGZyb20gJy4uL3ZtJ1xuXG52YXIge1xuICBuYXRpdmVDb21wb25lbnRNYXBcbn0gPSBjb25maWdcbnZhciBpbnN0YW5jZU1hcCA9IHt9XG5cbi8qKlxuICogY3JlYXRlIGEgV2VleCBpbnN0YW5jZVxuICpcbiAqIEBwYXJhbSAge3N0cmluZ30gaW5zdGFuY2VJZFxuICogQHBhcmFtICB7c3RyaW5nfSBjb2RlXG4gKiBAcGFyYW0gIHtvYmplY3R9IFtvcHRpb25zXSBvcHRpb24gYEhBU19MT0dgIGVuYWJsZSBwcmludCBsb2dcbiAqIEBwYXJhbSAge29iamVjdH0gW2RhdGFdXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlKGluc3RhbmNlSWQsIGNvZGUsIG9wdGlvbnMsIGRhdGEpIHtcbiAgdmFyIGluc3RhbmNlID0gaW5zdGFuY2VNYXBbaW5zdGFuY2VJZF1cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cblxuICBjb25maWcuZGVidWcgPSBvcHRpb25zLmRlYnVnXG5cbiAgdmFyIHJlc3VsdFxuICBpZiAoIWluc3RhbmNlKSB7XG4gICAgaW5zdGFuY2UgPSBuZXcgQXBwSW5zdGFuY2UoaW5zdGFuY2VJZCwgb3B0aW9ucylcbiAgICBpbnN0YW5jZU1hcFtpbnN0YW5jZUlkXSA9IGluc3RhbmNlXG4gICAgcmVzdWx0ID0gaW5zdGFuY2UuaW5pdChjb2RlLCBkYXRhKVxuICB9IGVsc2Uge1xuICAgIHJlc3VsdCA9IG5ldyBFcnJvcihgaW52YWxpZCBpbnN0YW5jZSBpZCBcIiR7aW5zdGFuY2VJZH1cImApXG4gIH1cblxuICByZXR1cm4gcmVzdWx0XG59XG5cbi8qKlxuICogcmVmcmVzaCBhIFdlZXggaW5zdGFuY2VcbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9IGluc3RhbmNlSWRcbiAqIEBwYXJhbSAge29iamVjdH0gZGF0YVxuICovXG5mdW5jdGlvbiByZWZyZXNoSW5zdGFuY2UoaW5zdGFuY2VJZCwgZGF0YSkge1xuICB2YXIgaW5zdGFuY2UgPSBpbnN0YW5jZU1hcFtpbnN0YW5jZUlkXVxuICB2YXIgcmVzdWx0XG4gIGlmIChpbnN0YW5jZSkge1xuICAgIHJlc3VsdCA9IGluc3RhbmNlLnJlZnJlc2hEYXRhKGRhdGEpXG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ID0gbmV3IEVycm9yKGBpbnZhbGlkIGluc3RhbmNlIGlkIFwiJHtpbnN0YW5jZUlkfVwiYClcbiAgfVxuICByZXR1cm4gcmVzdWx0XG59XG5cbi8qKlxuICogZGVzdHJveSBhIFdlZXggaW5zdGFuY2VcbiAqIEBwYXJhbSAge3N0cmluZ30gaW5zdGFuY2VJZFxuICovXG5mdW5jdGlvbiBkZXN0cm95SW5zdGFuY2UoaW5zdGFuY2VJZCkge1xuICB2YXIgaW5zdGFuY2UgPSBpbnN0YW5jZU1hcFtpbnN0YW5jZUlkXVxuICBpZiAoIWluc3RhbmNlKSB7XG4gICAgcmV0dXJuIG5ldyBFcnJvcihgaW52YWxpZCBpbnN0YW5jZSBpZCBcIiR7aW5zdGFuY2VJZH1cImApXG4gIH1cblxuICBpbnN0YW5jZS5kZXN0cm95KClcbiAgZGVsZXRlIGluc3RhbmNlTWFwW2luc3RhbmNlSWRdXG4gIHJldHVybiBpbnN0YW5jZU1hcFxufVxuXG4vKipcbiAqIHJlZ2lzdGVyIHRoZSBuYW1lIG9mIGVhY2ggbmF0aXZlIGNvbXBvbmVudFxuICogQHBhcmFtICB7YXJyYXl9IGNvbXBvbmVudHMgYXJyYXkgb2YgbmFtZVxuICovXG5mdW5jdGlvbiByZWdpc3RlckNvbXBvbmVudHMoY29tcG9uZW50cykge1xuICBpZiAoQXJyYXkuaXNBcnJheShjb21wb25lbnRzKSkge1xuICAgIGNvbXBvbmVudHMuZm9yRWFjaChmdW5jdGlvbiByZWdpc3RlcihuYW1lKSB7XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgIGlmICghbmFtZSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbmFtZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgbmF0aXZlQ29tcG9uZW50TWFwW25hbWVdID0gdHJ1ZVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgbmFtZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG5hbWUudHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgbmF0aXZlQ29tcG9uZW50TWFwW25hbWUudHlwZV0gPSBuYW1lXG4gICAgICB9XG4gICAgfSlcbiAgfVxufVxuXG4vKipcbiAqIHJlZ2lzdGVyIHRoZSBuYW1lIGFuZCBtZXRob2RzIG9mIGVhY2ggbW9kdWxlXG4gKiBAcGFyYW0gIHtvYmplY3R9IG1vZHVsZXMgYSBvYmplY3Qgb2YgbW9kdWxlc1xuICovXG5mdW5jdGlvbiByZWdpc3Rlck1vZHVsZXMobW9kdWxlcykge1xuICBpZiAodHlwZW9mIG1vZHVsZXMgPT09ICdvYmplY3QnKSB7XG4gICAgVm0ucmVnaXN0ZXJNb2R1bGVzKG1vZHVsZXMpXG4gIH1cbn1cblxuLyoqXG4gKiByZWdpc3RlciB0aGUgbmFtZSBhbmQgbWV0aG9kcyBvZiBlYWNoIGFwaVxuICogQHBhcmFtICB7b2JqZWN0fSBhcGlzIGEgb2JqZWN0IG9mIGFwaXNcbiAqL1xuZnVuY3Rpb24gcmVnaXN0ZXJNZXRob2RzKGFwaXMpIHtcbiAgaWYgKHR5cGVvZiBhcGlzID09PSAnb2JqZWN0Jykge1xuICAgIFZtLnJlZ2lzdGVyTWV0aG9kcyhhcGlzKVxuICB9XG59XG5cbi8qKlxuICogZ2V0IGEgd2hvbGUgZWxlbWVudCB0cmVlIG9mIGFuIGluc3RhbmNlXG4gKiBmb3IgZGVidWdnaW5nXG4gKiBAcGFyYW0gIHtzdHJpbmd9IGluc3RhbmNlSWRcbiAqIEByZXR1cm4ge29iamVjdH0gYSB2aXJ0dWFsIGRvbSB0cmVlXG4gKi9cbmZ1bmN0aW9uIGdldFJvb3QoaW5zdGFuY2VJZCkge1xuICB2YXIgaW5zdGFuY2UgPSBpbnN0YW5jZU1hcFtpbnN0YW5jZUlkXVxuICB2YXIgcmVzdWx0XG4gIGlmIChpbnN0YW5jZSkge1xuICAgIHJlc3VsdCA9IGluc3RhbmNlLmdldFJvb3RFbGVtZW50KClcbiAgfSBlbHNlIHtcbiAgICByZXN1bHQgPSBuZXcgRXJyb3IoYGludmFsaWQgaW5zdGFuY2UgaWQgXCIke2luc3RhbmNlSWR9XCJgKVxuICB9XG4gIHJldHVybiByZXN1bHRcbn1cblxudmFyIGpzSGFuZGxlcnMgPSB7XG4gIGZpcmVFdmVudDogZnVuY3Rpb24gZmlyZUV2ZW50KGluc3RhbmNlSWQsIHJlZiwgdHlwZSwgZGF0YSwgZG9tQ2hhbmdlcykge1xuICAgIHZhciBpbnN0YW5jZSA9IGluc3RhbmNlTWFwW2luc3RhbmNlSWRdXG4gICAgdmFyIHJlc3VsdFxuICAgIHJlc3VsdCA9IGluc3RhbmNlLmZpcmVFdmVudChyZWYsIHR5cGUsIGRhdGEsIGRvbUNoYW5nZXMpXG4gICAgcmV0dXJuIHJlc3VsdFxuICB9LFxuXG4gIGNhbGxiYWNrOiBmdW5jdGlvbiBjYWxsYmFjayhpbnN0YW5jZUlkLCBmdW5jSWQsIGRhdGEsIGlmTGFzdCkge1xuICAgIHZhciBpbnN0YW5jZSA9IGluc3RhbmNlTWFwW2luc3RhbmNlSWRdXG4gICAgdmFyIHJlc3VsdFxuICAgIHJlc3VsdCA9IGluc3RhbmNlLmNhbGxiYWNrKGZ1bmNJZCwgZGF0YSwgaWZMYXN0KVxuICAgIHJldHVybiByZXN1bHRcbiAgfVxufVxuXG4vKipcbiAqIGFjY2VwdCBjYWxscyBmcm9tIG5hdGl2ZSAoZXZlbnQgb3IgY2FsbGJhY2spXG4gKlxuICogQHBhcmFtICB7c3RyaW5nfSBpbnN0YW5jZUlkXG4gKiBAcGFyYW0gIHthcnJheX0gdGFza3MgbGlzdCB3aXRoIGBtZXRob2RgIGFuZCBgYXJnc2BcbiAqL1xuZnVuY3Rpb24gY2FsbEpTKGluc3RhbmNlSWQsIHRhc2tzKSB7XG4gIGNvbnN0IGluc3RhbmNlID0gaW5zdGFuY2VNYXBbaW5zdGFuY2VJZF1cbiAgaWYgKGluc3RhbmNlICYmIEFycmF5LmlzQXJyYXkodGFza3MpKSB7XG4gICAgY29uc3QgcmVzdWx0cyA9IFtdXG4gICAgdGFza3MuZm9yRWFjaCgodGFzaykgPT4ge1xuICAgICAgY29uc3QgaGFuZGxlciA9IGpzSGFuZGxlcnNbdGFzay5tZXRob2RdXG4gICAgICBjb25zdCBhcmdzID0gWy4uLnRhc2suYXJnc11cbiAgICAgIGlmICh0eXBlb2YgaGFuZGxlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBhcmdzLnVuc2hpZnQoaW5zdGFuY2VJZClcbiAgICAgICAgcmVzdWx0cy5wdXNoKGhhbmRsZXIoLi4uYXJncykpXG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gcmVzdWx0c1xuICB9XG4gIHJldHVybiBuZXcgRXJyb3IoYGludmFsaWQgaW5zdGFuY2UgaWQgXCIke2luc3RhbmNlSWR9XCIgb3IgdGFza3NgKVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNyZWF0ZUluc3RhbmNlLFxuICByZWZyZXNoSW5zdGFuY2UsXG4gIGRlc3Ryb3lJbnN0YW5jZSxcbiAgcmVnaXN0ZXJDb21wb25lbnRzLFxuICByZWdpc3Rlck1vZHVsZXMsXG4gIHJlZ2lzdGVyTWV0aG9kcyxcbiAgZ2V0Um9vdCxcbiAgY2FsbEpTXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAvVXNlcnMvemhhb2ppbmppYW5nL1NpdGVzL3B1YmxpYy93ZWV4L3NyYy9qcy1mcmFtZXdvcmsvbGliL3J1bnRpbWUvZGVmYXVsdC5qc1xuICoqLyIsImV4cG9ydCBjb25zdCBuYXRpdmVDb21wb25lbnRNYXAgPSB7XG4gIHRleHQ6IHRydWUsXG4gIGltYWdlOiB0cnVlLFxuICBjb250YWluZXI6IHRydWUsXG4gIHNsaWRlcjoge1xuICAgIHR5cGU6ICdzbGlkZXInLFxuICAgIGFwcGVuZDogJ3RyZWUnXG4gIH0sXG4gIGNlbGw6IHtcbiAgICB0eXBlOiAnY2VsbCcsXG4gICAgYXBwZW5kOiAndHJlZSdcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgY3VzdG9tQ29tcG9uZW50TWFwID0ge31cblxuZXhwb3J0IHZhciBkZWJ1ZyA9IGZhbHNlXG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC9Vc2Vycy96aGFvamluamlhbmcvU2l0ZXMvcHVibGljL3dlZXgvc3JjL2pzLWZyYW1ld29yay9saWIvY29uZmlnLmpzXG4gKiovIiwiLyoqXG4gKiBAZmlsZU92ZXJ2aWV3XG4gKiBXZWV4IGluc3RhbmNlIGNvbnN0cnVjdG9yICYgZGVmaW5pdGlvblxuICovXG5cbmltcG9ydCB7dHlwb2YsIGV4dGVuZH0gZnJvbSAnLi4vdXRpbCdcbmltcG9ydCAqIGFzIGJ1bmRsZSBmcm9tICcuL2J1bmRsZSdcbmltcG9ydCAqIGFzIGN0cmwgZnJvbSAnLi9jdHJsJ1xuaW1wb3J0IERpZmZlciBmcm9tICcuL2RpZmZlcidcblxuaW1wb3J0IEV2ZW50TWFuYWdlciBmcm9tICcuL2V2ZW50J1xuaW1wb3J0IExpc3RlbmVyIGZyb20gJy4vZG9tLWxpc3RlbmVyJ1xuaW1wb3J0IHtEb2N1bWVudCwgTm9kZX0gZnJvbSAnLi9kb20nXG5pbXBvcnQge3JlZ2lzdGVyQ29tcG9uZW50LCByZXF1aXJlQ29tcG9uZW50LCByZXF1aXJlTW9kdWxlfSBmcm9tICcuL3JlZ2lzdGVyJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBBcHBJbnN0YW5jZShpbnN0YW5jZUlkLCBvcHRpb25zKSB7XG4gIHRoaXMuaWQgPSBpbnN0YW5jZUlkXG4gIHRoaXMub3B0aW9ucyA9IG9wdGlvbnMgfHwge31cbiAgdGhpcy52bSA9IG51bGxcbiAgdGhpcy5kb2MgPSBuZXcgRG9jdW1lbnQoaW5zdGFuY2VJZCwgdGhpcy5vcHRpb25zLmJ1bmRsZVVybClcbiAgdGhpcy5jdXN0b21Db21wb25lbnRNYXAgPSB7fVxuICB0aGlzLmNhbGxiYWNrcyA9IHt9XG4gIHRoaXMuZGlmZmVyID0gbmV3IERpZmZlcihpbnN0YW5jZUlkKVxuICB0aGlzLnVpZCA9IDBcbiAgdGhpcy5yZW5kZXJlZCA9IGZhbHNlXG4gIHRoaXMuZXZlbnRNYW5hZ2VyID0gbmV3IEV2ZW50TWFuYWdlcigpXG4gIHRoaXMubGlzdGVuZXIgPSBuZXcgTGlzdGVuZXIodGhpcy5pZCwgKHRhc2tzKSA9PiB7XG4gICAgdGhpcy5jYWxsVGFza3ModGFza3MpXG4gIH0pXG4gIHRoaXMuZG9jLnNldEV2ZW50TWFuYWdlcih0aGlzLmV2ZW50TWFuYWdlcilcbiAgdGhpcy5kb2Muc2V0TGlzdGVuZXIodGhpcy5saXN0ZW5lcilcbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplKGFwcCwgdikge1xuICB2YXIgdHlwZSA9IHR5cG9mKHYpXG5cbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSAndW5kZWZpbmVkJzpcbiAgICBjYXNlICdudWxsJzpcbiAgICAgIHJldHVybiAnJ1xuICAgIGNhc2UgJ3JlZ2V4cCc6XG4gICAgICByZXR1cm4gdi50b1N0cmluZygpXG4gICAgY2FzZSAnZGF0ZSc6XG4gICAgICByZXR1cm4gdi50b0lTT1N0cmluZygpXG4gICAgY2FzZSAnbnVtYmVyJzpcbiAgICBjYXNlICdzdHJpbmcnOlxuICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgIGNhc2UgJ2FycmF5JzpcbiAgICBjYXNlICdvYmplY3QnOlxuICAgICAgaWYgKHYgaW5zdGFuY2VvZiBOb2RlKSB7XG4gICAgICAgIHJldHVybiB2LnJlZlxuICAgICAgfVxuICAgICAgcmV0dXJuIHZcbiAgICBjYXNlICdmdW5jdGlvbic6XG4gICAgICBhcHAuY2FsbGJhY2tzWysrYXBwLnVpZF0gPSB2XG4gICAgICByZXR1cm4gYXBwLnVpZC50b1N0cmluZygpXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh2KVxuICB9XG59XG5cbkFwcEluc3RhbmNlLnByb3RvdHlwZS5jYWxsVGFza3MgPSBmdW5jdGlvbiAodGFza3MpIHtcbiAgaWYgKHR5cG9mKHRhc2tzKSAhPT0gJ2FycmF5Jykge1xuICAgIHRhc2tzID0gW3Rhc2tzXVxuICB9XG5cbiAgdGFza3MuZm9yRWFjaCgodGFzaykgPT4ge1xuICAgIHRhc2suYXJncyA9IHRhc2suYXJncy5tYXAoYXJnID0+IG5vcm1hbGl6ZSh0aGlzLCBhcmcpKVxuICB9KVxuXG4gIGNhbGxOYXRpdmUodGhpcy5pZCwgdGFza3MsICctMScpXG59XG5cbmV4dGVuZChBcHBJbnN0YW5jZS5wcm90b3R5cGUsIGJ1bmRsZSwgY3RybCwge1xuICByZWdpc3RlckNvbXBvbmVudCxcbiAgcmVxdWlyZUNvbXBvbmVudCxcbiAgcmVxdWlyZU1vZHVsZVxufSlcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC9Vc2Vycy96aGFvamluamlhbmcvU2l0ZXMvcHVibGljL3dlZXgvc3JjL2pzLWZyYW1ld29yay9saWIvYXBwL2luZGV4LmpzXG4gKiovIiwiLy8vIGxhbmcuanNcblxuLyoqXG4gKiBDaGVjayBpZiBhIHN0cmluZyBzdGFydHMgd2l0aCAkIG9yIF9cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBpc1Jlc2VydmVkIChzdHIpIHtcbiAgY29uc3QgYyA9IChzdHIgKyAnJykuY2hhckNvZGVBdCgwKVxuICByZXR1cm4gYyA9PT0gMHgyNCB8fCBjID09PSAweDVGXG59XG5cbi8qKlxuICogRGVmaW5lIGEgcHJvcGVydHkuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICogQHBhcmFtIHsqfSB2YWxcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW2VudW1lcmFibGVdXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGRlZiAob2JqLCBrZXksIHZhbCwgZW51bWVyYWJsZSkge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICB2YWx1ZTogdmFsLFxuICAgIGVudW1lcmFibGU6ICEhZW51bWVyYWJsZSxcbiAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICBjb25maWd1cmFibGU6IHRydWVcbiAgfSlcbn1cblxuLy8vIGVudi5qc1xuXG4vLyBjYW4gd2UgdXNlIF9fcHJvdG9fXz9cbmV4cG9ydCBjb25zdCBoYXNQcm90byA9ICdfX3Byb3RvX18nIGluIHt9XG5cbi8vIEJyb3dzZXIgZW52aXJvbm1lbnQgc25pZmZpbmdcbmV4cG9ydCBjb25zdCBpbkJyb3dzZXIgPVxuICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJlxuICBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwod2luZG93KSAhPT0gJ1tvYmplY3QgT2JqZWN0XSdcblxuLy8gZGV0ZWN0IGRldnRvb2xzXG5leHBvcnQgY29uc3QgZGV2dG9vbHMgPSBpbkJyb3dzZXIgJiYgd2luZG93Ll9fVlVFX0RFVlRPT0xTX0dMT0JBTF9IT09LX19cblxuLy8gVUEgc25pZmZpbmcgZm9yIHdvcmtpbmcgYXJvdW5kIGJyb3dzZXItc3BlY2lmaWMgcXVpcmtzXG5jb25zdCBVQSA9IGluQnJvd3NlciAmJiB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpXG5jb25zdCBpc0lvcyA9IFVBICYmIC8oaXBob25lfGlwYWR8aXBvZHxpb3MpL2kudGVzdChVQSlcbmNvbnN0IGlzV2VjaGF0ID0gVUEgJiYgVUEuaW5kZXhPZignbWljcm9tZXNzZW5nZXInKSA+IDBcblxuLyoqXG4gKiBEZWZlciBhIHRhc2sgdG8gZXhlY3V0ZSBpdCBhc3luY2hyb25vdXNseS4gSWRlYWxseSB0aGlzXG4gKiBzaG91bGQgYmUgZXhlY3V0ZWQgYXMgYSBtaWNyb3Rhc2ssIHNvIHdlIGxldmVyYWdlXG4gKiBNdXRhdGlvbk9ic2VydmVyIGlmIGl0J3MgYXZhaWxhYmxlLCBhbmQgZmFsbGJhY2sgdG9cbiAqIHNldFRpbWVvdXQoMCkuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2JcbiAqIEBwYXJhbSB7T2JqZWN0fSBjdHhcbiAqL1xuXG5leHBvcnQgY29uc3QgbmV4dFRpY2sgPSAoZnVuY3Rpb24gKCkge1xuICBsZXQgY2FsbGJhY2tzID0gW11cbiAgbGV0IHBlbmRpbmcgPSBmYWxzZVxuICBsZXQgdGltZXJGdW5jXG4gIGZ1bmN0aW9uIG5leHRUaWNrSGFuZGxlciAoKSB7XG4gICAgcGVuZGluZyA9IGZhbHNlXG4gICAgY29uc3QgY29waWVzID0gY2FsbGJhY2tzLnNsaWNlKDApXG4gICAgY2FsbGJhY2tzID0gW11cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvcGllcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29waWVzW2ldKClcbiAgICB9XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgaWYgKHR5cGVvZiBNdXRhdGlvbk9ic2VydmVyICE9PSAndW5kZWZpbmVkJyAmJiAhKGlzV2VjaGF0ICYmIGlzSW9zKSkge1xuICAgIGxldCBjb3VudGVyID0gMVxuICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIobmV4dFRpY2tIYW5kbGVyKVxuICAgIGNvbnN0IHRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY291bnRlcilcbiAgICBvYnNlcnZlci5vYnNlcnZlKHRleHROb2RlLCB7XG4gICAgICBjaGFyYWN0ZXJEYXRhOiB0cnVlXG4gICAgfSlcbiAgICB0aW1lckZ1bmMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBjb3VudGVyID0gKGNvdW50ZXIgKyAxKSAlIDJcbiAgICAgIHRleHROb2RlLmRhdGEgPSBjb3VudGVyXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIHdlYnBhY2sgYXR0ZW1wdHMgdG8gaW5qZWN0IGEgc2hpbSBmb3Igc2V0SW1tZWRpYXRlXG4gICAgLy8gaWYgaXQgaXMgdXNlZCBhcyBhIGdsb2JhbCwgc28gd2UgaGF2ZSB0byB3b3JrIGFyb3VuZCB0aGF0IHRvXG4gICAgLy8gYXZvaWQgYnVuZGxpbmcgdW5uZWNlc3NhcnkgY29kZS5cbiAgICBjb25zdCBjb250ZXh0ID0gaW5Ccm93c2VyXG4gICAgICA/IHdpbmRvd1xuICAgICAgOiB0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbCA6IHt9XG4gICAgdGltZXJGdW5jID0gY29udGV4dC5zZXRJbW1lZGlhdGUgfHwgc2V0VGltZW91dFxuICB9XG4gIHJldHVybiBmdW5jdGlvbiAoY2IsIGN0eCkge1xuICAgIGNvbnN0IGZ1bmMgPSBjdHhcbiAgICAgID8gZnVuY3Rpb24gKCkgeyBjYi5jYWxsKGN0eCkgfVxuICAgICAgOiBjYlxuICAgIGNhbGxiYWNrcy5wdXNoKGZ1bmMpXG4gICAgaWYgKHBlbmRpbmcpIHJldHVyblxuICAgIHBlbmRpbmcgPSB0cnVlXG4gICAgdGltZXJGdW5jKG5leHRUaWNrSGFuZGxlciwgMClcbiAgfVxufSkoKVxuXG5sZXQgX1NldFxuLyogaXN0YW5idWwgaWdub3JlIGlmICovXG5pZiAodHlwZW9mIFNldCAhPT0gJ3VuZGVmaW5lZCcgJiYgU2V0LnRvU3RyaW5nKCkubWF0Y2goL25hdGl2ZSBjb2RlLykpIHtcbiAgLy8gdXNlIG5hdGl2ZSBTZXQgd2hlbiBhdmFpbGFibGUuXG4gIF9TZXQgPSBTZXRcbn0gZWxzZSB7XG4gIC8vIGEgbm9uLXN0YW5kYXJkIFNldCBwb2x5ZmlsbCB0aGF0IG9ubHkgd29ya3Mgd2l0aCBwcmltaXRpdmUga2V5cy5cbiAgX1NldCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnNldCA9IE9iamVjdC5jcmVhdGUobnVsbClcbiAgfVxuICBfU2V0LnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgcmV0dXJuIHRoaXMuc2V0W2tleV0gIT09IHVuZGVmaW5lZFxuICB9XG4gIF9TZXQucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICB0aGlzLnNldFtrZXldID0gMVxuICB9XG4gIF9TZXQucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc2V0ID0gT2JqZWN0LmNyZWF0ZShudWxsKVxuICB9XG59XG5cbmV4cG9ydCB7IF9TZXQgfVxuXG4vLy8gc2hhcmVkXG5cbi8qKlxuICogUmVtb3ZlIGFuIGl0ZW0gZnJvbSBhbiBhcnJheVxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxuICogQHBhcmFtIHsqfSBpdGVtXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZSAoYXJyLCBpdGVtKSB7XG4gIGlmIChhcnIubGVuZ3RoKSB7XG4gICAgY29uc3QgaW5kZXggPSBhcnIuaW5kZXhPZihpdGVtKVxuICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICByZXR1cm4gYXJyLnNwbGljZShpbmRleCwgMSlcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBDaGVjayB3aGV0aGVyIHRoZSBvYmplY3QgaGFzIHRoZSBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5jb25zdCBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHlcbmV4cG9ydCBmdW5jdGlvbiBoYXNPd24gKG9iaiwga2V5KSB7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KVxufVxuXG4vKipcbiAqIENyZWF0ZSBhIGNhY2hlZCB2ZXJzaW9uIG9mIGEgcHVyZSBmdW5jdGlvbi5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7RnVuY3Rpb259XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGNhY2hlZCAoZm4pIHtcbiAgY29uc3QgY2FjaGUgPSBPYmplY3QuY3JlYXRlKG51bGwpXG4gIHJldHVybiBmdW5jdGlvbiBjYWNoZWRGbiAoc3RyKSB7XG4gICAgY29uc3QgaGl0ID0gY2FjaGVbc3RyXVxuICAgIHJldHVybiBoaXQgfHwgKGNhY2hlW3N0cl0gPSBmbihzdHIpKVxuICB9XG59XG5cbi8qKlxuICogQ2FtZWxpemUgYSBoeXBoZW4tZGVsbWl0ZWQgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuXG5jb25zdCBjYW1lbGl6ZVJFID0gLy0oXFx3KS9nXG5leHBvcnQgY29uc3QgY2FtZWxpemUgPSBjYWNoZWQoc3RyID0+IHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKGNhbWVsaXplUkUsIHRvVXBwZXIpXG59KVxuXG5mdW5jdGlvbiB0b1VwcGVyIChfLCBjKSB7XG4gIHJldHVybiBjID8gYy50b1VwcGVyQ2FzZSgpIDogJydcbn1cblxuLyoqXG4gKiBIeXBoZW5hdGUgYSBjYW1lbENhc2Ugc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuXG5jb25zdCBoeXBoZW5hdGVSRSA9IC8oW2EtelxcZF0pKFtBLVpdKS9nXG5leHBvcnQgY29uc3QgaHlwaGVuYXRlID0gY2FjaGVkKHN0ciA9PiB7XG4gIHJldHVybiBzdHJcbiAgICAucmVwbGFjZShoeXBoZW5hdGVSRSwgJyQxLSQyJylcbiAgICAudG9Mb3dlckNhc2UoKVxufSlcblxuLyoqXG4gKiBTaW1wbGUgYmluZCwgZmFzdGVyIHRoYW4gbmF0aXZlXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjdHhcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBiaW5kIChmbiwgY3R4KSB7XG4gIHJldHVybiBmdW5jdGlvbiAoYSkge1xuICAgIGNvbnN0IGwgPSBhcmd1bWVudHMubGVuZ3RoXG4gICAgcmV0dXJuIGxcbiAgICAgID8gbCA+IDFcbiAgICAgICAgPyBmbi5hcHBseShjdHgsIGFyZ3VtZW50cylcbiAgICAgICAgOiBmbi5jYWxsKGN0eCwgYSlcbiAgICAgIDogZm4uY2FsbChjdHgpXG4gIH1cbn1cblxuLyoqXG4gKiBDb252ZXJ0IGFuIEFycmF5LWxpa2Ugb2JqZWN0IHRvIGEgcmVhbCBBcnJheS5cbiAqXG4gKiBAcGFyYW0ge0FycmF5LWxpa2V9IGxpc3RcbiAqIEBwYXJhbSB7TnVtYmVyfSBbc3RhcnRdIC0gc3RhcnQgaW5kZXhcbiAqIEByZXR1cm4ge0FycmF5fVxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiB0b0FycmF5IChsaXN0LCBzdGFydCkge1xuICBzdGFydCA9IHN0YXJ0IHx8IDBcbiAgbGV0IGkgPSBsaXN0Lmxlbmd0aCAtIHN0YXJ0XG4gIGNvbnN0IHJldCA9IG5ldyBBcnJheShpKVxuICB3aGlsZSAoaS0tKSB7XG4gICAgcmV0W2ldID0gbGlzdFtpICsgc3RhcnRdXG4gIH1cbiAgcmV0dXJuIHJldFxufVxuXG4vKipcbiAqIE1peCBwcm9wZXJ0aWVzIGludG8gdGFyZ2V0IG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdG9cbiAqIEBwYXJhbSB7T2JqZWN0fSBmcm9tXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGV4dGVuZCAodGFyZ2V0LCAuLi5zcmMpIHtcbiAgaWYgKHR5cGVvZiBPYmplY3QuYXNzaWduID09PSAnZnVuY3Rpb24nKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0YXJnZXQsIC4uLnNyYylcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBmaXJzdCA9IHNyYy5zaGlmdCgpXG4gICAgZm9yIChjb25zdCBrZXkgaW4gZmlyc3QpIHtcbiAgICAgIHRhcmdldFtrZXldID0gZmlyc3Rba2V5XVxuICAgIH1cbiAgICBpZiAoc3JjLmxlbmd0aCkge1xuICAgICAgZXh0ZW5kKHRhcmdldCwgLi4uc3JjKVxuICAgIH1cbiAgfVxuICByZXR1cm4gdGFyZ2V0XG59XG5cbi8qKlxuICogUXVpY2sgb2JqZWN0IGNoZWNrIC0gdGhpcyBpcyBwcmltYXJpbHkgdXNlZCB0byB0ZWxsXG4gKiBPYmplY3RzIGZyb20gcHJpbWl0aXZlIHZhbHVlcyB3aGVuIHdlIGtub3cgdGhlIHZhbHVlXG4gKiBpcyBhIEpTT04tY29tcGxpYW50IHR5cGUuXG4gKlxuICogQHBhcmFtIHsqfSBvYmpcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGlzT2JqZWN0IChvYmopIHtcbiAgcmV0dXJuIG9iaiAhPT0gbnVsbCAmJiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0J1xufVxuXG4vKipcbiAqIFN0cmljdCBvYmplY3QgdHlwZSBjaGVjay4gT25seSByZXR1cm5zIHRydWVcbiAqIGZvciBwbGFpbiBKYXZhU2NyaXB0IG9iamVjdHMuXG4gKlxuICogQHBhcmFtIHsqfSBvYmpcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cblxuY29uc3QgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nXG5jb25zdCBPQkpFQ1RfU1RSSU5HID0gJ1tvYmplY3QgT2JqZWN0XSdcbmV4cG9ydCBmdW5jdGlvbiBpc1BsYWluT2JqZWN0IChvYmopIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwob2JqKSA9PT0gT0JKRUNUX1NUUklOR1xufVxuXG4vKipcbiAqIEFycmF5IHR5cGUgY2hlY2suXG4gKlxuICogQHBhcmFtIHsqfSBvYmpcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cblxuZXhwb3J0IGNvbnN0IGlzQXJyYXkgPSBBcnJheS5pc0FycmF5XG5cbi8vLyBvdGhlclxuXG5leHBvcnQgZnVuY3Rpb24gc3RyaW5naWZ5ICh4KSB7XG4gIHJldHVybiB0eXBlb2YgeCA9PT0gJ3VuZGVmaW5lZCcgfHwgeCA9PT0gbnVsbCB8fCB0eXBlb2YoeCkgPT09ICdmdW5jdGlvbidcbiAgICA/ICcnXG4gICAgOiB0eXBlb2YgeCA9PT0gJ29iamVjdCdcbiAgICAgID8geCBpbnN0YW5jZW9mIFJlZ0V4cFxuICAgICAgICA/IHgudG9TdHJpbmcoKVxuICAgICAgICA6IHggaW5zdGFuY2VvZiBEYXRlXG4gICAgICAgICAgPyBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHgpKVxuICAgICAgICAgIDogSlNPTi5zdHJpbmdpZnkoeClcbiAgICAgIDogeC50b1N0cmluZygpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0eXBvZiAodikge1xuICBsZXQgcyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2KVxuICByZXR1cm4gcy5zdWJzdHJpbmcoOCwgcy5sZW5ndGggLSAxKS50b0xvd2VyQ2FzZSgpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemUgKHYpIHtcbiAgbGV0IHR5cGUgPSB0eXBvZih2KVxuXG4gIHN3aXRjaCh0eXBlKSB7XG4gICAgY2FzZSAndW5kZWZpbmVkJzpcbiAgICBjYXNlICdudWxsJzpcbiAgICAgIHJldHVybiAnJ1xuICAgIGNhc2UgJ3JlZ2V4cCc6XG4gICAgICByZXR1cm4gdi50b1N0cmluZygpXG4gICAgY2FzZSAnZGF0ZSc6XG4gICAgICByZXR1cm4gdi50b0lTT1N0cmluZygpXG4gICAgY2FzZSAnbnVtYmVyJzpcbiAgICBjYXNlICdzdHJpbmcnOlxuICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgIGNhc2UgJ2FycmF5JzpcbiAgICBjYXNlICdvYmplY3QnOlxuICAgIGNhc2UgJ2Z1bmN0aW9uJzpcbiAgICAgIHJldHVybiB2XG4gIH1cbn1cblxuY29uc3QgZW5hYmxlTG9nID0gdHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnICYmIGdsb2JhbC5JU19QUk9EVUNUICE9PSB0cnVlXG5cbi8qKlxuICogQHBhcmFtIHtTdHJpbmd9IG1zZ1xuICovXG5leHBvcnQgZnVuY3Rpb24gZXJyb3IgKC4uLmFyZ3MpIHtcbiAgZW5hYmxlTG9nICYmIGNvbnNvbGUuZXJyb3IgJiYgY29uc29sZS5lcnJvcignW0pTIEZyYW1ld29ya10nLCAuLi5hcmdzKVxufVxuXG4vKipcbiAqIEBwYXJhbSB7U3RyaW5nfSBtc2dcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHdhcm4gKC4uLmFyZ3MpIHtcbiAgZW5hYmxlTG9nICYmIGNvbnNvbGUud2FybiAmJiBjb25zb2xlLndhcm4oJ1tKUyBGcmFtZXdvcmtdJywgLi4uYXJncylcbn1cblxuLyoqXG4gKiBAcGFyYW0ge1N0cmluZ30gbXNnXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbmZvICguLi5hcmdzKSB7XG4gIGVuYWJsZUxvZyAmJiBjb25zb2xlLmluZm8gJiYgY29uc29sZS5pbmZvKCdbSlMgRnJhbWV3b3JrXScsIC4uLmFyZ3MpXG59XG5cbi8qKlxuICogQHBhcmFtIHtTdHJpbmd9IG1zZ1xuICovXG5leHBvcnQgZnVuY3Rpb24gZGVidWcgKC4uLmFyZ3MpIHtcbiAgZW5hYmxlTG9nICYmIGNvbnNvbGUuZGVidWcgJiYgY29uc29sZS5kZWJ1ZygnW0pTIEZyYW1ld29ya10nLCAuLi5hcmdzKVxufVxuXG4vKipcbiAqIEBwYXJhbSB7U3RyaW5nfSBtc2dcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxvZyAoLi4uYXJncykge1xuICBlbmFibGVMb2cgJiYgY29uc29sZS5sb2cgJiYgY29uc29sZS5sb2coJ1tKUyBGcmFtZXdvcmtdJywgLi4uYXJncylcbn1cblxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAvVXNlcnMvemhhb2ppbmppYW5nL1NpdGVzL3B1YmxpYy93ZWV4L3NyYy9qcy1mcmFtZXdvcmsvbGliL3V0aWwvaW5kZXguanNcbiAqKi8iLCIvKipcbiAqIEBmaWxlT3ZlcnZpZXdcbiAqIGFwaSB0aGF0IGludm9rZWQgYnkganMgYnVuZGxlIGNvZGVcbiAqXG4gKiAtIGRlZmluZShuYW1lLCBmYWN0b3J5KTogZGVmaW5lIGEgbmV3IGNvbXBvc2VkIGNvbXBvbmVudCB0eXBlXG4gKiAtIGJvb3RzdHJhcCh0eXBlLCBjb25maWcsIGRhdGEpOiByZXF1aXJlIGEgY2VydGFpbiB0eXBlICZcbiAqICAgICAgICAgcmVuZGVyIHdpdGggKG9wdGlvbmFsKSBkYXRhXG4gKlxuICogZGVwcmVjYXRlZDpcbiAqIC0gcmVnaXN0ZXIodHlwZSwgb3B0aW9ucyk6IHJlZ2lzdGVyIGEgbmV3IGNvbXBvc2VkIGNvbXBvbmVudCB0eXBlXG4gKiAtIHJlbmRlcih0eXBlLCBkYXRhKTogcmVuZGVyIGJ5IGEgY2VydGFpbiB0eXBlIHdpdGggKG9wdGlvbmFsKSBkYXRhXG4gKiAtIHJlcXVpcmUodHlwZSkoZGF0YSk6IHJlcXVpcmUgYSB0eXBlIHRoZW4gcmVuZGVyIHdpdGggZGF0YVxuICovXG5cbmltcG9ydCBzZW12ZXIgZnJvbSAnc2VtdmVyJ1xuaW1wb3J0ICogYXMgXyBmcm9tICcuLi91dGlsJ1xuaW1wb3J0ICogYXMgY29uZmlnIGZyb20gJy4uL2NvbmZpZydcbmltcG9ydCBWbSBmcm9tICcuLi92bSdcbmltcG9ydCAqIGFzIGRvd25ncmFkZSBmcm9tICcuL2Rvd25ncmFkZSdcblxuY29uc3QgV0VFWF9DT01QT05FTlRfUkVHID0gL15cXEB3ZWV4LWNvbXBvbmVudFxcLy9cbmNvbnN0IFdFRVhfTU9EVUxFX1JFRyA9IC9eXFxAd2VleC1tb2R1bGVcXC8vXG5jb25zdCBOT1JNQUxfTU9EVUxFX1JFRyA9IC9eXFwuezEsMn1cXC8vXG5jb25zdCBKU19TVVJGSVhfUkVHID0gL1xcLmpzJC9cblxuY29uc3QgaXNXZWV4Q29tcG9uZW50ID0gbmFtZSA9PiAhIW5hbWUubWF0Y2goV0VFWF9DT01QT05FTlRfUkVHKVxuY29uc3QgaXNXZWV4TW9kdWxlID0gbmFtZSA9PiAhIW5hbWUubWF0Y2goV0VFWF9NT0RVTEVfUkVHKVxuY29uc3QgaXNOb3JtYWxNb2R1bGUgPSBuYW1lID0+ICEhbmFtZS5tYXRjaChOT1JNQUxfTU9EVUxFX1JFRylcbmNvbnN0IGlzTnBtTW9kdWxlID0gbmFtZSA9PiAhaXNXZWV4Q29tcG9uZW50KG5hbWUpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAhaXNXZWV4TW9kdWxlKG5hbWUpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAhaXNOb3JtYWxNb2R1bGUobmFtZSlcblxuZnVuY3Rpb24gcmVtb3ZlV2VleFByZWZpeChzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKFdFRVhfQ09NUE9ORU5UX1JFRywgJycpXG4gICAgICAgICAgLnJlcGxhY2UoV0VFWF9NT0RVTEVfUkVHLCAnJylcbn1cblxuZnVuY3Rpb24gcmVtb3ZlSlNTdXJmaXgoc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZShKU19TVVJGSVhfUkVHLCAnJylcbn1cblxubGV0IGNvbW1vbk1vZHVsZXMgPSB7fVxuXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJDb21tb25Nb2R1bGVzKCkge1xuICBjb21tb25Nb2R1bGVzID0ge31cbn1cblxuLy8gZGVmaW5lKG5hbWUsIGZhY3RvcnkpIGZvciBwcmltYXJ5IHVzYWdlXG4vLyBvclxuLy8gZGVmaW5lKG5hbWUsIGRlcHMsIGZhY3RvcnkpIGZvciBjb21wYXRpYmlsaXR5XG4vLyBOb3RpY2U6IERPIE5PVCB1c2UgZnVuY3Rpb24gZGVmaW5lKCkge30sXG4vLyBpdCB3aWxsIGNhdXNlIGVycm9yIGFmdGVyIGJ1aWxkZWQgYnkgd2VicGFja1xuZXhwb3J0IHZhciBkZWZpbmUgPSBmdW5jdGlvbiAobmFtZSwgZGVwcywgZmFjdG9yeSkge1xuICBfLmRlYnVnKCdkZWZpbmUgYSBjb21wb25lbnQnLCBuYW1lKVxuXG4gIGlmIChfLnR5cG9mKGRlcHMpID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZmFjdG9yeSA9IGRlcHNcbiAgICBkZXBzID0gW11cbiAgfVxuXG4gIGxldCBfcmVxdWlyZSA9IChuYW1lKSA9PiB7XG4gICAgbGV0IGNsZWFuTmFtZVxuXG4gICAgaWYgKGlzV2VleENvbXBvbmVudChuYW1lKSkge1xuICAgICAgY2xlYW5OYW1lID0gcmVtb3ZlV2VleFByZWZpeChuYW1lKVxuICAgICAgcmV0dXJuIHRoaXMucmVxdWlyZUNvbXBvbmVudChjbGVhbk5hbWUpXG4gICAgfVxuICAgIGlmIChpc1dlZXhNb2R1bGUobmFtZSkpIHtcbiAgICAgIGNsZWFuTmFtZSA9IHJlbW92ZVdlZXhQcmVmaXgobmFtZSlcbiAgICAgIHJldHVybiB0aGlzLnJlcXVpcmVNb2R1bGUoY2xlYW5OYW1lKVxuICAgIH1cbiAgICBpZiAoaXNOb3JtYWxNb2R1bGUobmFtZSkpIHtcbiAgICAgIGNsZWFuTmFtZSA9IHJlbW92ZUpTU3VyZml4KG5hbWUpXG4gICAgICByZXR1cm4gY29tbW9uTW9kdWxlc1tuYW1lXVxuICAgIH1cbiAgICBpZiAoaXNOcG1Nb2R1bGUobmFtZSkpIHtcbiAgICAgIGNsZWFuTmFtZSA9IHJlbW92ZUpTU3VyZml4KG5hbWUpXG4gICAgICByZXR1cm4gY29tbW9uTW9kdWxlc1tuYW1lXVxuICAgIH1cbiAgfVxuICBsZXQgX21vZHVsZSA9IHtleHBvcnRzOiB7fX1cblxuICBsZXQgY2xlYW5OYW1lXG4gIGlmIChpc1dlZXhDb21wb25lbnQobmFtZSkpIHtcbiAgICBjbGVhbk5hbWUgPSByZW1vdmVXZWV4UHJlZml4KG5hbWUpXG5cbiAgICBmYWN0b3J5KF9yZXF1aXJlLCBfbW9kdWxlLmV4cG9ydHMsIF9tb2R1bGUpXG5cbiAgICB0aGlzLnJlZ2lzdGVyQ29tcG9uZW50KGNsZWFuTmFtZSwgX21vZHVsZS5leHBvcnRzKVxuICB9IGVsc2UgaWYgKGlzV2VleE1vZHVsZShuYW1lKSkge1xuICAgIGNsZWFuTmFtZSA9IHJlbW92ZVdlZXhQcmVmaXgobmFtZSlcblxuICAgIGZhY3RvcnkoX3JlcXVpcmUsIF9tb2R1bGUuZXhwb3J0cywgX21vZHVsZSlcblxuICAgIFZtLnJlZ2lzdGVyTW9kdWxlcyh7XG4gICAgICBbY2xlYW5OYW1lXTogX21vZHVsZS5leHBvcnRzXG4gICAgfSlcbiAgfSBlbHNlIGlmIChpc05vcm1hbE1vZHVsZShuYW1lKSkge1xuICAgIGNsZWFuTmFtZSA9IHJlbW92ZUpTU3VyZml4KG5hbWUpXG5cbiAgICBmYWN0b3J5KF9yZXF1aXJlLCBfbW9kdWxlLmV4cG9ydHMsIF9tb2R1bGUpXG5cbiAgICBjb21tb25Nb2R1bGVzW2NsZWFuTmFtZV0gPSBfbW9kdWxlLmV4cG9ydHNcbiAgfSBlbHNlIGlmIChpc05wbU1vZHVsZShuYW1lKSkge1xuICAgIGNsZWFuTmFtZSA9IHJlbW92ZUpTU3VyZml4KG5hbWUpXG5cbiAgICBmYWN0b3J5KF9yZXF1aXJlLCBfbW9kdWxlLmV4cG9ydHMsIF9tb2R1bGUpXG5cbiAgICBsZXQgZXhwb3J0cyA9IF9tb2R1bGUuZXhwb3J0c1xuICAgIGlmIChleHBvcnRzLnRlbXBsYXRlIHx8XG4gICAgICAgIGV4cG9ydHMuc3R5bGUgfHxcbiAgICAgICAgZXhwb3J0cy5tZXRob2RzKSB7XG4gICAgICAvLyBkb3duZ3JhZGUgdG8gb2xkIGRlZmluZSBtZXRob2QgKGRlZmluZSgnY29tcG9uZW50TmFtZScsIGZhY3RvcnkpKVxuICAgICAgLy8gdGhlIGV4cG9ydHMgY29udGFpbiBvbmUga2V5IG9mIHRlbXBsYXRlLCBzdHlsZSBvciBtZXRob2RzXG4gICAgICAvLyBidXQgaXQgaGFzIHJpc2shISFcbiAgICAgIHRoaXMucmVnaXN0ZXJDb21wb25lbnQoY2xlYW5OYW1lLCBleHBvcnRzKVxuICAgIH0gZWxzZSB7XG4gICAgICBjb21tb25Nb2R1bGVzW2NsZWFuTmFtZV0gPSBfbW9kdWxlLmV4cG9ydHNcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJvb3RzdHJhcChuYW1lLCBjb25maWcsIGRhdGEpIHtcbiAgXy5kZWJ1ZyhgYm9vdHN0cmFwIGZvciAke25hbWV9YClcblxuICBsZXQgY2xlYW5OYW1lXG5cbiAgaWYgKGlzV2VleENvbXBvbmVudChuYW1lKSkge1xuICAgIGNsZWFuTmFtZSA9IHJlbW92ZVdlZXhQcmVmaXgobmFtZSlcbiAgfSBlbHNlIGlmIChpc05wbU1vZHVsZShuYW1lKSkge1xuICAgIGNsZWFuTmFtZSA9IHJlbW92ZUpTU3VyZml4KG5hbWUpXG4gICAgLy8gY2hlY2sgaWYgZGVmaW5lIGJ5IG9sZCAnZGVmaW5lJyBtZXRob2RcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAoIXRoaXMuY3VzdG9tQ29tcG9uZW50TWFwW2NsZWFuTmFtZV0pIHtcbiAgICAgIHJldHVybiBuZXcgRXJyb3IoYEl0J3Mgbm90IGEgY29tcG9uZW50OiAke25hbWV9YClcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ldyBFcnJvcihgV3JvbmcgY29tcG9uZW50IG5hbWU6ICR7bmFtZX1gKVxuICB9XG5cbiAgY29uZmlnID0gXy5pc1BsYWluT2JqZWN0KGNvbmZpZykgPyBjb25maWcgOiB7fVxuXG4gIGlmICh0eXBlb2YgY29uZmlnLnRyYW5zZm9ybWVyVmVyc2lvbiA9PT0gJ3N0cmluZycgJiZcbiAgICB0eXBlb2YgZ2xvYmFsLm5lZWRUcmFuc2Zvcm1lclZlcnNpb24gPT09ICdzdHJpbmcnICYmXG4gICAgIXNlbXZlci5zYXRpc2ZpZXMoY29uZmlnLnRyYW5zZm9ybWVyVmVyc2lvbixcbiAgICAgIGdsb2JhbC5uZWVkVHJhbnNmb3JtZXJWZXJzaW9uKSkge1xuICAgIHJldHVybiBuZXcgRXJyb3IoYEpTIEJ1bmRsZSB2ZXJzaW9uOiAke2NvbmZpZy50cmFuc2Zvcm1lclZlcnNpb259IGAgK1xuICAgICAgYG5vdCBjb21wYXRpYmxlIHdpdGggJHtnbG9iYWwubmVlZFRyYW5zZm9ybWVyVmVyc2lvbn1gKVxuICB9XG5cbiAgbGV0IF9jaGVja0Rvd25ncmFkZSA9IGRvd25ncmFkZS5jaGVjayhjb25maWcuZG93bmdyYWRlKVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgaWYgKF9jaGVja0Rvd25ncmFkZS5pc0Rvd25ncmFkZSkge1xuICAgIHRoaXMuY2FsbFRhc2tzKFt7XG4gICAgICBtb2R1bGU6ICdpbnN0YW5jZVdyYXAnLFxuICAgICAgbWV0aG9kOiAnZXJyb3InLFxuICAgICAgYXJnczogW1xuICAgICAgICBfY2hlY2tEb3duZ3JhZGUuZXJyb3JUeXBlLFxuICAgICAgICBfY2hlY2tEb3duZ3JhZGUuY29kZSxcbiAgICAgICAgX2NoZWNrRG93bmdyYWRlLmVycm9yTWVzc2FnZVxuICAgICAgXVxuICAgIH1dKVxuICAgIHJldHVybiBuZXcgRXJyb3IoYERvd25ncmFkZTogJHtjb25maWcuZG93bmdyYWRlfWApXG4gIH1cblxuICB0aGlzLnZtID0gbmV3IFZtKGNsZWFuTmFtZSwgbnVsbCwge19hcHA6IHRoaXN9LCBudWxsLCBkYXRhKVxufVxuXG4vKipcbiAqIEBkZXByZWNhdGVkXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3Rlcih0eXBlLCBvcHRpb25zKSB7XG4gIF8ud2FybignUmVnaXN0ZXIgaXMgZGVwcmVjYXRlZCwgcGxlYXNlIGluc3RhbGwgbGFzdGVzdCB0cmFuc2Zvcm1lci4nKVxuICB0aGlzLnJlZ2lzdGVyQ29tcG9uZW50KHR5cGUsIG9wdGlvbnMpXG59XG5cbi8qKlxuICogQGRlcHJlY2F0ZWRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlcih0eXBlLCBkYXRhKSB7XG4gIF8ud2FybignUmVuZGVyIGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSBpbnN0YWxsIGxhc3Rlc3QgdHJhbnNmb3JtZXIuJylcbiAgcmV0dXJuIHRoaXMuYm9vdHN0cmFwKHR5cGUsIHt9LCBkYXRhKVxufVxuXG4vKipcbiAqIEBkZXByZWNhdGVkXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXF1aXJlKHR5cGUpIHtcbiAgXy53YXJuKCdSZXF1aXJlIGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSBpbnN0YWxsIGxhc3Rlc3QgdHJhbnNmb3JtZXIuJylcbiAgcmV0dXJuIChkYXRhKSA9PiB7XG4gICAgcmV0dXJuIHRoaXMuYm9vdHN0cmFwKHR5cGUsIHt9LCBkYXRhKVxuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAvVXNlcnMvemhhb2ppbmppYW5nL1NpdGVzL3B1YmxpYy93ZWV4L3NyYy9qcy1mcmFtZXdvcmsvbGliL2FwcC9idW5kbGUuanNcbiAqKi8iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBTZW1WZXI7XG5cbi8vIFRoZSBkZWJ1ZyBmdW5jdGlvbiBpcyBleGNsdWRlZCBlbnRpcmVseSBmcm9tIHRoZSBtaW5pZmllZCB2ZXJzaW9uLlxuLyogbm9taW4gKi8gdmFyIGRlYnVnO1xuLyogbm9taW4gKi8gaWYgKHR5cGVvZiBwcm9jZXNzID09PSAnb2JqZWN0JyAmJlxuICAgIC8qIG5vbWluICovIHByb2Nlc3MuZW52ICYmXG4gICAgLyogbm9taW4gKi8gcHJvY2Vzcy5lbnYuTk9ERV9ERUJVRyAmJlxuICAgIC8qIG5vbWluICovIC9cXGJzZW12ZXJcXGIvaS50ZXN0KHByb2Nlc3MuZW52Lk5PREVfREVCVUcpKVxuICAvKiBub21pbiAqLyBkZWJ1ZyA9IGZ1bmN0aW9uKCkge1xuICAgIC8qIG5vbWluICovIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcbiAgICAvKiBub21pbiAqLyBhcmdzLnVuc2hpZnQoJ1NFTVZFUicpO1xuICAgIC8qIG5vbWluICovIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIGFyZ3MpO1xuICAgIC8qIG5vbWluICovIH07XG4vKiBub21pbiAqLyBlbHNlXG4gIC8qIG5vbWluICovIGRlYnVnID0gZnVuY3Rpb24oKSB7fTtcblxuLy8gTm90ZTogdGhpcyBpcyB0aGUgc2VtdmVyLm9yZyB2ZXJzaW9uIG9mIHRoZSBzcGVjIHRoYXQgaXQgaW1wbGVtZW50c1xuLy8gTm90IG5lY2Vzc2FyaWx5IHRoZSBwYWNrYWdlIHZlcnNpb24gb2YgdGhpcyBjb2RlLlxuZXhwb3J0cy5TRU1WRVJfU1BFQ19WRVJTSU9OID0gJzIuMC4wJztcblxudmFyIE1BWF9MRU5HVEggPSAyNTY7XG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSIHx8IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8vIFRoZSBhY3R1YWwgcmVnZXhwcyBnbyBvbiBleHBvcnRzLnJlXG52YXIgcmUgPSBleHBvcnRzLnJlID0gW107XG52YXIgc3JjID0gZXhwb3J0cy5zcmMgPSBbXTtcbnZhciBSID0gMDtcblxuLy8gVGhlIGZvbGxvd2luZyBSZWd1bGFyIEV4cHJlc3Npb25zIGNhbiBiZSB1c2VkIGZvciB0b2tlbml6aW5nLFxuLy8gdmFsaWRhdGluZywgYW5kIHBhcnNpbmcgU2VtVmVyIHZlcnNpb24gc3RyaW5ncy5cblxuLy8gIyMgTnVtZXJpYyBJZGVudGlmaWVyXG4vLyBBIHNpbmdsZSBgMGAsIG9yIGEgbm9uLXplcm8gZGlnaXQgZm9sbG93ZWQgYnkgemVybyBvciBtb3JlIGRpZ2l0cy5cblxudmFyIE5VTUVSSUNJREVOVElGSUVSID0gUisrO1xuc3JjW05VTUVSSUNJREVOVElGSUVSXSA9ICcwfFsxLTldXFxcXGQqJztcbnZhciBOVU1FUklDSURFTlRJRklFUkxPT1NFID0gUisrO1xuc3JjW05VTUVSSUNJREVOVElGSUVSTE9PU0VdID0gJ1swLTldKyc7XG5cblxuLy8gIyMgTm9uLW51bWVyaWMgSWRlbnRpZmllclxuLy8gWmVybyBvciBtb3JlIGRpZ2l0cywgZm9sbG93ZWQgYnkgYSBsZXR0ZXIgb3IgaHlwaGVuLCBhbmQgdGhlbiB6ZXJvIG9yXG4vLyBtb3JlIGxldHRlcnMsIGRpZ2l0cywgb3IgaHlwaGVucy5cblxudmFyIE5PTk5VTUVSSUNJREVOVElGSUVSID0gUisrO1xuc3JjW05PTk5VTUVSSUNJREVOVElGSUVSXSA9ICdcXFxcZCpbYS16QS1aLV1bYS16QS1aMC05LV0qJztcblxuXG4vLyAjIyBNYWluIFZlcnNpb25cbi8vIFRocmVlIGRvdC1zZXBhcmF0ZWQgbnVtZXJpYyBpZGVudGlmaWVycy5cblxudmFyIE1BSU5WRVJTSU9OID0gUisrO1xuc3JjW01BSU5WRVJTSU9OXSA9ICcoJyArIHNyY1tOVU1FUklDSURFTlRJRklFUl0gKyAnKVxcXFwuJyArXG4gICAgICAgICAgICAgICAgICAgJygnICsgc3JjW05VTUVSSUNJREVOVElGSUVSXSArICcpXFxcXC4nICtcbiAgICAgICAgICAgICAgICAgICAnKCcgKyBzcmNbTlVNRVJJQ0lERU5USUZJRVJdICsgJyknO1xuXG52YXIgTUFJTlZFUlNJT05MT09TRSA9IFIrKztcbnNyY1tNQUlOVkVSU0lPTkxPT1NFXSA9ICcoJyArIHNyY1tOVU1FUklDSURFTlRJRklFUkxPT1NFXSArICcpXFxcXC4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICcoJyArIHNyY1tOVU1FUklDSURFTlRJRklFUkxPT1NFXSArICcpXFxcXC4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICcoJyArIHNyY1tOVU1FUklDSURFTlRJRklFUkxPT1NFXSArICcpJztcblxuLy8gIyMgUHJlLXJlbGVhc2UgVmVyc2lvbiBJZGVudGlmaWVyXG4vLyBBIG51bWVyaWMgaWRlbnRpZmllciwgb3IgYSBub24tbnVtZXJpYyBpZGVudGlmaWVyLlxuXG52YXIgUFJFUkVMRUFTRUlERU5USUZJRVIgPSBSKys7XG5zcmNbUFJFUkVMRUFTRUlERU5USUZJRVJdID0gJyg/OicgKyBzcmNbTlVNRVJJQ0lERU5USUZJRVJdICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnfCcgKyBzcmNbTk9OTlVNRVJJQ0lERU5USUZJRVJdICsgJyknO1xuXG52YXIgUFJFUkVMRUFTRUlERU5USUZJRVJMT09TRSA9IFIrKztcbnNyY1tQUkVSRUxFQVNFSURFTlRJRklFUkxPT1NFXSA9ICcoPzonICsgc3JjW05VTUVSSUNJREVOVElGSUVSTE9PU0VdICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd8JyArIHNyY1tOT05OVU1FUklDSURFTlRJRklFUl0gKyAnKSc7XG5cblxuLy8gIyMgUHJlLXJlbGVhc2UgVmVyc2lvblxuLy8gSHlwaGVuLCBmb2xsb3dlZCBieSBvbmUgb3IgbW9yZSBkb3Qtc2VwYXJhdGVkIHByZS1yZWxlYXNlIHZlcnNpb25cbi8vIGlkZW50aWZpZXJzLlxuXG52YXIgUFJFUkVMRUFTRSA9IFIrKztcbnNyY1tQUkVSRUxFQVNFXSA9ICcoPzotKCcgKyBzcmNbUFJFUkVMRUFTRUlERU5USUZJRVJdICtcbiAgICAgICAgICAgICAgICAgICcoPzpcXFxcLicgKyBzcmNbUFJFUkVMRUFTRUlERU5USUZJRVJdICsgJykqKSknO1xuXG52YXIgUFJFUkVMRUFTRUxPT1NFID0gUisrO1xuc3JjW1BSRVJFTEVBU0VMT09TRV0gPSAnKD86LT8oJyArIHNyY1tQUkVSRUxFQVNFSURFTlRJRklFUkxPT1NFXSArXG4gICAgICAgICAgICAgICAgICAgICAgICcoPzpcXFxcLicgKyBzcmNbUFJFUkVMRUFTRUlERU5USUZJRVJMT09TRV0gKyAnKSopKSc7XG5cbi8vICMjIEJ1aWxkIE1ldGFkYXRhIElkZW50aWZpZXJcbi8vIEFueSBjb21iaW5hdGlvbiBvZiBkaWdpdHMsIGxldHRlcnMsIG9yIGh5cGhlbnMuXG5cbnZhciBCVUlMRElERU5USUZJRVIgPSBSKys7XG5zcmNbQlVJTERJREVOVElGSUVSXSA9ICdbMC05QS1aYS16LV0rJztcblxuLy8gIyMgQnVpbGQgTWV0YWRhdGFcbi8vIFBsdXMgc2lnbiwgZm9sbG93ZWQgYnkgb25lIG9yIG1vcmUgcGVyaW9kLXNlcGFyYXRlZCBidWlsZCBtZXRhZGF0YVxuLy8gaWRlbnRpZmllcnMuXG5cbnZhciBCVUlMRCA9IFIrKztcbnNyY1tCVUlMRF0gPSAnKD86XFxcXCsoJyArIHNyY1tCVUlMRElERU5USUZJRVJdICtcbiAgICAgICAgICAgICAnKD86XFxcXC4nICsgc3JjW0JVSUxESURFTlRJRklFUl0gKyAnKSopKSc7XG5cblxuLy8gIyMgRnVsbCBWZXJzaW9uIFN0cmluZ1xuLy8gQSBtYWluIHZlcnNpb24sIGZvbGxvd2VkIG9wdGlvbmFsbHkgYnkgYSBwcmUtcmVsZWFzZSB2ZXJzaW9uIGFuZFxuLy8gYnVpbGQgbWV0YWRhdGEuXG5cbi8vIE5vdGUgdGhhdCB0aGUgb25seSBtYWpvciwgbWlub3IsIHBhdGNoLCBhbmQgcHJlLXJlbGVhc2Ugc2VjdGlvbnMgb2Zcbi8vIHRoZSB2ZXJzaW9uIHN0cmluZyBhcmUgY2FwdHVyaW5nIGdyb3Vwcy4gIFRoZSBidWlsZCBtZXRhZGF0YSBpcyBub3QgYVxuLy8gY2FwdHVyaW5nIGdyb3VwLCBiZWNhdXNlIGl0IHNob3VsZCBub3QgZXZlciBiZSB1c2VkIGluIHZlcnNpb25cbi8vIGNvbXBhcmlzb24uXG5cbnZhciBGVUxMID0gUisrO1xudmFyIEZVTExQTEFJTiA9ICd2PycgKyBzcmNbTUFJTlZFUlNJT05dICtcbiAgICAgICAgICAgICAgICBzcmNbUFJFUkVMRUFTRV0gKyAnPycgK1xuICAgICAgICAgICAgICAgIHNyY1tCVUlMRF0gKyAnPyc7XG5cbnNyY1tGVUxMXSA9ICdeJyArIEZVTExQTEFJTiArICckJztcblxuLy8gbGlrZSBmdWxsLCBidXQgYWxsb3dzIHYxLjIuMyBhbmQgPTEuMi4zLCB3aGljaCBwZW9wbGUgZG8gc29tZXRpbWVzLlxuLy8gYWxzbywgMS4wLjBhbHBoYTEgKHByZXJlbGVhc2Ugd2l0aG91dCB0aGUgaHlwaGVuKSB3aGljaCBpcyBwcmV0dHlcbi8vIGNvbW1vbiBpbiB0aGUgbnBtIHJlZ2lzdHJ5LlxudmFyIExPT1NFUExBSU4gPSAnW3Y9XFxcXHNdKicgKyBzcmNbTUFJTlZFUlNJT05MT09TRV0gK1xuICAgICAgICAgICAgICAgICBzcmNbUFJFUkVMRUFTRUxPT1NFXSArICc/JyArXG4gICAgICAgICAgICAgICAgIHNyY1tCVUlMRF0gKyAnPyc7XG5cbnZhciBMT09TRSA9IFIrKztcbnNyY1tMT09TRV0gPSAnXicgKyBMT09TRVBMQUlOICsgJyQnO1xuXG52YXIgR1RMVCA9IFIrKztcbnNyY1tHVExUXSA9ICcoKD86PHw+KT89PyknO1xuXG4vLyBTb21ldGhpbmcgbGlrZSBcIjIuKlwiIG9yIFwiMS4yLnhcIi5cbi8vIE5vdGUgdGhhdCBcIngueFwiIGlzIGEgdmFsaWQgeFJhbmdlIGlkZW50aWZlciwgbWVhbmluZyBcImFueSB2ZXJzaW9uXCJcbi8vIE9ubHkgdGhlIGZpcnN0IGl0ZW0gaXMgc3RyaWN0bHkgcmVxdWlyZWQuXG52YXIgWFJBTkdFSURFTlRJRklFUkxPT1NFID0gUisrO1xuc3JjW1hSQU5HRUlERU5USUZJRVJMT09TRV0gPSBzcmNbTlVNRVJJQ0lERU5USUZJRVJMT09TRV0gKyAnfHh8WHxcXFxcKic7XG52YXIgWFJBTkdFSURFTlRJRklFUiA9IFIrKztcbnNyY1tYUkFOR0VJREVOVElGSUVSXSA9IHNyY1tOVU1FUklDSURFTlRJRklFUl0gKyAnfHh8WHxcXFxcKic7XG5cbnZhciBYUkFOR0VQTEFJTiA9IFIrKztcbnNyY1tYUkFOR0VQTEFJTl0gPSAnW3Y9XFxcXHNdKignICsgc3JjW1hSQU5HRUlERU5USUZJRVJdICsgJyknICtcbiAgICAgICAgICAgICAgICAgICAnKD86XFxcXC4oJyArIHNyY1tYUkFOR0VJREVOVElGSUVSXSArICcpJyArXG4gICAgICAgICAgICAgICAgICAgJyg/OlxcXFwuKCcgKyBzcmNbWFJBTkdFSURFTlRJRklFUl0gKyAnKScgK1xuICAgICAgICAgICAgICAgICAgICcoPzonICsgc3JjW1BSRVJFTEVBU0VdICsgJyk/JyArXG4gICAgICAgICAgICAgICAgICAgc3JjW0JVSUxEXSArICc/JyArXG4gICAgICAgICAgICAgICAgICAgJyk/KT8nO1xuXG52YXIgWFJBTkdFUExBSU5MT09TRSA9IFIrKztcbnNyY1tYUkFOR0VQTEFJTkxPT1NFXSA9ICdbdj1cXFxcc10qKCcgKyBzcmNbWFJBTkdFSURFTlRJRklFUkxPT1NFXSArICcpJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnKD86XFxcXC4oJyArIHNyY1tYUkFOR0VJREVOVElGSUVSTE9PU0VdICsgJyknICtcbiAgICAgICAgICAgICAgICAgICAgICAgICcoPzpcXFxcLignICsgc3JjW1hSQU5HRUlERU5USUZJRVJMT09TRV0gKyAnKScgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJyg/OicgKyBzcmNbUFJFUkVMRUFTRUxPT1NFXSArICcpPycgK1xuICAgICAgICAgICAgICAgICAgICAgICAgc3JjW0JVSUxEXSArICc/JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnKT8pPyc7XG5cbnZhciBYUkFOR0UgPSBSKys7XG5zcmNbWFJBTkdFXSA9ICdeJyArIHNyY1tHVExUXSArICdcXFxccyonICsgc3JjW1hSQU5HRVBMQUlOXSArICckJztcbnZhciBYUkFOR0VMT09TRSA9IFIrKztcbnNyY1tYUkFOR0VMT09TRV0gPSAnXicgKyBzcmNbR1RMVF0gKyAnXFxcXHMqJyArIHNyY1tYUkFOR0VQTEFJTkxPT1NFXSArICckJztcblxuLy8gVGlsZGUgcmFuZ2VzLlxuLy8gTWVhbmluZyBpcyBcInJlYXNvbmFibHkgYXQgb3IgZ3JlYXRlciB0aGFuXCJcbnZhciBMT05FVElMREUgPSBSKys7XG5zcmNbTE9ORVRJTERFXSA9ICcoPzp+Pj8pJztcblxudmFyIFRJTERFVFJJTSA9IFIrKztcbnNyY1tUSUxERVRSSU1dID0gJyhcXFxccyopJyArIHNyY1tMT05FVElMREVdICsgJ1xcXFxzKyc7XG5yZVtUSUxERVRSSU1dID0gbmV3IFJlZ0V4cChzcmNbVElMREVUUklNXSwgJ2cnKTtcbnZhciB0aWxkZVRyaW1SZXBsYWNlID0gJyQxfic7XG5cbnZhciBUSUxERSA9IFIrKztcbnNyY1tUSUxERV0gPSAnXicgKyBzcmNbTE9ORVRJTERFXSArIHNyY1tYUkFOR0VQTEFJTl0gKyAnJCc7XG52YXIgVElMREVMT09TRSA9IFIrKztcbnNyY1tUSUxERUxPT1NFXSA9ICdeJyArIHNyY1tMT05FVElMREVdICsgc3JjW1hSQU5HRVBMQUlOTE9PU0VdICsgJyQnO1xuXG4vLyBDYXJldCByYW5nZXMuXG4vLyBNZWFuaW5nIGlzIFwiYXQgbGVhc3QgYW5kIGJhY2t3YXJkcyBjb21wYXRpYmxlIHdpdGhcIlxudmFyIExPTkVDQVJFVCA9IFIrKztcbnNyY1tMT05FQ0FSRVRdID0gJyg/OlxcXFxeKSc7XG5cbnZhciBDQVJFVFRSSU0gPSBSKys7XG5zcmNbQ0FSRVRUUklNXSA9ICcoXFxcXHMqKScgKyBzcmNbTE9ORUNBUkVUXSArICdcXFxccysnO1xucmVbQ0FSRVRUUklNXSA9IG5ldyBSZWdFeHAoc3JjW0NBUkVUVFJJTV0sICdnJyk7XG52YXIgY2FyZXRUcmltUmVwbGFjZSA9ICckMV4nO1xuXG52YXIgQ0FSRVQgPSBSKys7XG5zcmNbQ0FSRVRdID0gJ14nICsgc3JjW0xPTkVDQVJFVF0gKyBzcmNbWFJBTkdFUExBSU5dICsgJyQnO1xudmFyIENBUkVUTE9PU0UgPSBSKys7XG5zcmNbQ0FSRVRMT09TRV0gPSAnXicgKyBzcmNbTE9ORUNBUkVUXSArIHNyY1tYUkFOR0VQTEFJTkxPT1NFXSArICckJztcblxuLy8gQSBzaW1wbGUgZ3QvbHQvZXEgdGhpbmcsIG9yIGp1c3QgXCJcIiB0byBpbmRpY2F0ZSBcImFueSB2ZXJzaW9uXCJcbnZhciBDT01QQVJBVE9STE9PU0UgPSBSKys7XG5zcmNbQ09NUEFSQVRPUkxPT1NFXSA9ICdeJyArIHNyY1tHVExUXSArICdcXFxccyooJyArIExPT1NFUExBSU4gKyAnKSR8XiQnO1xudmFyIENPTVBBUkFUT1IgPSBSKys7XG5zcmNbQ09NUEFSQVRPUl0gPSAnXicgKyBzcmNbR1RMVF0gKyAnXFxcXHMqKCcgKyBGVUxMUExBSU4gKyAnKSR8XiQnO1xuXG5cbi8vIEFuIGV4cHJlc3Npb24gdG8gc3RyaXAgYW55IHdoaXRlc3BhY2UgYmV0d2VlbiB0aGUgZ3RsdCBhbmQgdGhlIHRoaW5nXG4vLyBpdCBtb2RpZmllcywgc28gdGhhdCBgPiAxLjIuM2AgPT0+IGA+MS4yLjNgXG52YXIgQ09NUEFSQVRPUlRSSU0gPSBSKys7XG5zcmNbQ09NUEFSQVRPUlRSSU1dID0gJyhcXFxccyopJyArIHNyY1tHVExUXSArXG4gICAgICAgICAgICAgICAgICAgICAgJ1xcXFxzKignICsgTE9PU0VQTEFJTiArICd8JyArIHNyY1tYUkFOR0VQTEFJTl0gKyAnKSc7XG5cbi8vIHRoaXMgb25lIGhhcyB0byB1c2UgdGhlIC9nIGZsYWdcbnJlW0NPTVBBUkFUT1JUUklNXSA9IG5ldyBSZWdFeHAoc3JjW0NPTVBBUkFUT1JUUklNXSwgJ2cnKTtcbnZhciBjb21wYXJhdG9yVHJpbVJlcGxhY2UgPSAnJDEkMiQzJztcblxuXG4vLyBTb21ldGhpbmcgbGlrZSBgMS4yLjMgLSAxLjIuNGBcbi8vIE5vdGUgdGhhdCB0aGVzZSBhbGwgdXNlIHRoZSBsb29zZSBmb3JtLCBiZWNhdXNlIHRoZXknbGwgYmVcbi8vIGNoZWNrZWQgYWdhaW5zdCBlaXRoZXIgdGhlIHN0cmljdCBvciBsb29zZSBjb21wYXJhdG9yIGZvcm1cbi8vIGxhdGVyLlxudmFyIEhZUEhFTlJBTkdFID0gUisrO1xuc3JjW0hZUEhFTlJBTkdFXSA9ICdeXFxcXHMqKCcgKyBzcmNbWFJBTkdFUExBSU5dICsgJyknICtcbiAgICAgICAgICAgICAgICAgICAnXFxcXHMrLVxcXFxzKycgK1xuICAgICAgICAgICAgICAgICAgICcoJyArIHNyY1tYUkFOR0VQTEFJTl0gKyAnKScgK1xuICAgICAgICAgICAgICAgICAgICdcXFxccyokJztcblxudmFyIEhZUEhFTlJBTkdFTE9PU0UgPSBSKys7XG5zcmNbSFlQSEVOUkFOR0VMT09TRV0gPSAnXlxcXFxzKignICsgc3JjW1hSQU5HRVBMQUlOTE9PU0VdICsgJyknICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdcXFxccystXFxcXHMrJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnKCcgKyBzcmNbWFJBTkdFUExBSU5MT09TRV0gKyAnKScgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ1xcXFxzKiQnO1xuXG4vLyBTdGFyIHJhbmdlcyBiYXNpY2FsbHkganVzdCBhbGxvdyBhbnl0aGluZyBhdCBhbGwuXG52YXIgU1RBUiA9IFIrKztcbnNyY1tTVEFSXSA9ICcoPHw+KT89P1xcXFxzKlxcXFwqJztcblxuLy8gQ29tcGlsZSB0byBhY3R1YWwgcmVnZXhwIG9iamVjdHMuXG4vLyBBbGwgYXJlIGZsYWctZnJlZSwgdW5sZXNzIHRoZXkgd2VyZSBjcmVhdGVkIGFib3ZlIHdpdGggYSBmbGFnLlxuZm9yICh2YXIgaSA9IDA7IGkgPCBSOyBpKyspIHtcbiAgZGVidWcoaSwgc3JjW2ldKTtcbiAgaWYgKCFyZVtpXSlcbiAgICByZVtpXSA9IG5ldyBSZWdFeHAoc3JjW2ldKTtcbn1cblxuZXhwb3J0cy5wYXJzZSA9IHBhcnNlO1xuZnVuY3Rpb24gcGFyc2UodmVyc2lvbiwgbG9vc2UpIHtcbiAgaWYgKHZlcnNpb24gaW5zdGFuY2VvZiBTZW1WZXIpXG4gICAgcmV0dXJuIHZlcnNpb247XG5cbiAgaWYgKHR5cGVvZiB2ZXJzaW9uICE9PSAnc3RyaW5nJylcbiAgICByZXR1cm4gbnVsbDtcblxuICBpZiAodmVyc2lvbi5sZW5ndGggPiBNQVhfTEVOR1RIKVxuICAgIHJldHVybiBudWxsO1xuXG4gIHZhciByID0gbG9vc2UgPyByZVtMT09TRV0gOiByZVtGVUxMXTtcbiAgaWYgKCFyLnRlc3QodmVyc2lvbikpXG4gICAgcmV0dXJuIG51bGw7XG5cbiAgdHJ5IHtcbiAgICByZXR1cm4gbmV3IFNlbVZlcih2ZXJzaW9uLCBsb29zZSk7XG4gIH0gY2F0Y2ggKGVyKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuZXhwb3J0cy52YWxpZCA9IHZhbGlkO1xuZnVuY3Rpb24gdmFsaWQodmVyc2lvbiwgbG9vc2UpIHtcbiAgdmFyIHYgPSBwYXJzZSh2ZXJzaW9uLCBsb29zZSk7XG4gIHJldHVybiB2ID8gdi52ZXJzaW9uIDogbnVsbDtcbn1cblxuXG5leHBvcnRzLmNsZWFuID0gY2xlYW47XG5mdW5jdGlvbiBjbGVhbih2ZXJzaW9uLCBsb29zZSkge1xuICB2YXIgcyA9IHBhcnNlKHZlcnNpb24udHJpbSgpLnJlcGxhY2UoL15bPXZdKy8sICcnKSwgbG9vc2UpO1xuICByZXR1cm4gcyA/IHMudmVyc2lvbiA6IG51bGw7XG59XG5cbmV4cG9ydHMuU2VtVmVyID0gU2VtVmVyO1xuXG5mdW5jdGlvbiBTZW1WZXIodmVyc2lvbiwgbG9vc2UpIHtcbiAgaWYgKHZlcnNpb24gaW5zdGFuY2VvZiBTZW1WZXIpIHtcbiAgICBpZiAodmVyc2lvbi5sb29zZSA9PT0gbG9vc2UpXG4gICAgICByZXR1cm4gdmVyc2lvbjtcbiAgICBlbHNlXG4gICAgICB2ZXJzaW9uID0gdmVyc2lvbi52ZXJzaW9uO1xuICB9IGVsc2UgaWYgKHR5cGVvZiB2ZXJzaW9uICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgVmVyc2lvbjogJyArIHZlcnNpb24pO1xuICB9XG5cbiAgaWYgKHZlcnNpb24ubGVuZ3RoID4gTUFYX0xFTkdUSClcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCd2ZXJzaW9uIGlzIGxvbmdlciB0aGFuICcgKyBNQVhfTEVOR1RIICsgJyBjaGFyYWN0ZXJzJylcblxuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgU2VtVmVyKSlcbiAgICByZXR1cm4gbmV3IFNlbVZlcih2ZXJzaW9uLCBsb29zZSk7XG5cbiAgZGVidWcoJ1NlbVZlcicsIHZlcnNpb24sIGxvb3NlKTtcbiAgdGhpcy5sb29zZSA9IGxvb3NlO1xuICB2YXIgbSA9IHZlcnNpb24udHJpbSgpLm1hdGNoKGxvb3NlID8gcmVbTE9PU0VdIDogcmVbRlVMTF0pO1xuXG4gIGlmICghbSlcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIFZlcnNpb246ICcgKyB2ZXJzaW9uKTtcblxuICB0aGlzLnJhdyA9IHZlcnNpb247XG5cbiAgLy8gdGhlc2UgYXJlIGFjdHVhbGx5IG51bWJlcnNcbiAgdGhpcy5tYWpvciA9ICttWzFdO1xuICB0aGlzLm1pbm9yID0gK21bMl07XG4gIHRoaXMucGF0Y2ggPSArbVszXTtcblxuICBpZiAodGhpcy5tYWpvciA+IE1BWF9TQUZFX0lOVEVHRVIgfHwgdGhpcy5tYWpvciA8IDApXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBtYWpvciB2ZXJzaW9uJylcblxuICBpZiAodGhpcy5taW5vciA+IE1BWF9TQUZFX0lOVEVHRVIgfHwgdGhpcy5taW5vciA8IDApXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBtaW5vciB2ZXJzaW9uJylcblxuICBpZiAodGhpcy5wYXRjaCA+IE1BWF9TQUZFX0lOVEVHRVIgfHwgdGhpcy5wYXRjaCA8IDApXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBwYXRjaCB2ZXJzaW9uJylcblxuICAvLyBudW1iZXJpZnkgYW55IHByZXJlbGVhc2UgbnVtZXJpYyBpZHNcbiAgaWYgKCFtWzRdKVxuICAgIHRoaXMucHJlcmVsZWFzZSA9IFtdO1xuICBlbHNlXG4gICAgdGhpcy5wcmVyZWxlYXNlID0gbVs0XS5zcGxpdCgnLicpLm1hcChmdW5jdGlvbihpZCkge1xuICAgICAgaWYgKC9eWzAtOV0rJC8udGVzdChpZCkpIHtcbiAgICAgICAgdmFyIG51bSA9ICtpZFxuICAgICAgICBpZiAobnVtID49IDAgJiYgbnVtIDwgTUFYX1NBRkVfSU5URUdFUilcbiAgICAgICAgICByZXR1cm4gbnVtXG4gICAgICB9XG4gICAgICByZXR1cm4gaWQ7XG4gICAgfSk7XG5cbiAgdGhpcy5idWlsZCA9IG1bNV0gPyBtWzVdLnNwbGl0KCcuJykgOiBbXTtcbiAgdGhpcy5mb3JtYXQoKTtcbn1cblxuU2VtVmVyLnByb3RvdHlwZS5mb3JtYXQgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy52ZXJzaW9uID0gdGhpcy5tYWpvciArICcuJyArIHRoaXMubWlub3IgKyAnLicgKyB0aGlzLnBhdGNoO1xuICBpZiAodGhpcy5wcmVyZWxlYXNlLmxlbmd0aClcbiAgICB0aGlzLnZlcnNpb24gKz0gJy0nICsgdGhpcy5wcmVyZWxlYXNlLmpvaW4oJy4nKTtcbiAgcmV0dXJuIHRoaXMudmVyc2lvbjtcbn07XG5cblNlbVZlci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMudmVyc2lvbjtcbn07XG5cblNlbVZlci5wcm90b3R5cGUuY29tcGFyZSA9IGZ1bmN0aW9uKG90aGVyKSB7XG4gIGRlYnVnKCdTZW1WZXIuY29tcGFyZScsIHRoaXMudmVyc2lvbiwgdGhpcy5sb29zZSwgb3RoZXIpO1xuICBpZiAoIShvdGhlciBpbnN0YW5jZW9mIFNlbVZlcikpXG4gICAgb3RoZXIgPSBuZXcgU2VtVmVyKG90aGVyLCB0aGlzLmxvb3NlKTtcblxuICByZXR1cm4gdGhpcy5jb21wYXJlTWFpbihvdGhlcikgfHwgdGhpcy5jb21wYXJlUHJlKG90aGVyKTtcbn07XG5cblNlbVZlci5wcm90b3R5cGUuY29tcGFyZU1haW4gPSBmdW5jdGlvbihvdGhlcikge1xuICBpZiAoIShvdGhlciBpbnN0YW5jZW9mIFNlbVZlcikpXG4gICAgb3RoZXIgPSBuZXcgU2VtVmVyKG90aGVyLCB0aGlzLmxvb3NlKTtcblxuICByZXR1cm4gY29tcGFyZUlkZW50aWZpZXJzKHRoaXMubWFqb3IsIG90aGVyLm1ham9yKSB8fFxuICAgICAgICAgY29tcGFyZUlkZW50aWZpZXJzKHRoaXMubWlub3IsIG90aGVyLm1pbm9yKSB8fFxuICAgICAgICAgY29tcGFyZUlkZW50aWZpZXJzKHRoaXMucGF0Y2gsIG90aGVyLnBhdGNoKTtcbn07XG5cblNlbVZlci5wcm90b3R5cGUuY29tcGFyZVByZSA9IGZ1bmN0aW9uKG90aGVyKSB7XG4gIGlmICghKG90aGVyIGluc3RhbmNlb2YgU2VtVmVyKSlcbiAgICBvdGhlciA9IG5ldyBTZW1WZXIob3RoZXIsIHRoaXMubG9vc2UpO1xuXG4gIC8vIE5PVCBoYXZpbmcgYSBwcmVyZWxlYXNlIGlzID4gaGF2aW5nIG9uZVxuICBpZiAodGhpcy5wcmVyZWxlYXNlLmxlbmd0aCAmJiAhb3RoZXIucHJlcmVsZWFzZS5sZW5ndGgpXG4gICAgcmV0dXJuIC0xO1xuICBlbHNlIGlmICghdGhpcy5wcmVyZWxlYXNlLmxlbmd0aCAmJiBvdGhlci5wcmVyZWxlYXNlLmxlbmd0aClcbiAgICByZXR1cm4gMTtcbiAgZWxzZSBpZiAoIXRoaXMucHJlcmVsZWFzZS5sZW5ndGggJiYgIW90aGVyLnByZXJlbGVhc2UubGVuZ3RoKVxuICAgIHJldHVybiAwO1xuXG4gIHZhciBpID0gMDtcbiAgZG8ge1xuICAgIHZhciBhID0gdGhpcy5wcmVyZWxlYXNlW2ldO1xuICAgIHZhciBiID0gb3RoZXIucHJlcmVsZWFzZVtpXTtcbiAgICBkZWJ1ZygncHJlcmVsZWFzZSBjb21wYXJlJywgaSwgYSwgYik7XG4gICAgaWYgKGEgPT09IHVuZGVmaW5lZCAmJiBiID09PSB1bmRlZmluZWQpXG4gICAgICByZXR1cm4gMDtcbiAgICBlbHNlIGlmIChiID09PSB1bmRlZmluZWQpXG4gICAgICByZXR1cm4gMTtcbiAgICBlbHNlIGlmIChhID09PSB1bmRlZmluZWQpXG4gICAgICByZXR1cm4gLTE7XG4gICAgZWxzZSBpZiAoYSA9PT0gYilcbiAgICAgIGNvbnRpbnVlO1xuICAgIGVsc2VcbiAgICAgIHJldHVybiBjb21wYXJlSWRlbnRpZmllcnMoYSwgYik7XG4gIH0gd2hpbGUgKCsraSk7XG59O1xuXG4vLyBwcmVtaW5vciB3aWxsIGJ1bXAgdGhlIHZlcnNpb24gdXAgdG8gdGhlIG5leHQgbWlub3IgcmVsZWFzZSwgYW5kIGltbWVkaWF0ZWx5XG4vLyBkb3duIHRvIHByZS1yZWxlYXNlLiBwcmVtYWpvciBhbmQgcHJlcGF0Y2ggd29yayB0aGUgc2FtZSB3YXkuXG5TZW1WZXIucHJvdG90eXBlLmluYyA9IGZ1bmN0aW9uKHJlbGVhc2UsIGlkZW50aWZpZXIpIHtcbiAgc3dpdGNoIChyZWxlYXNlKSB7XG4gICAgY2FzZSAncHJlbWFqb3InOlxuICAgICAgdGhpcy5wcmVyZWxlYXNlLmxlbmd0aCA9IDA7XG4gICAgICB0aGlzLnBhdGNoID0gMDtcbiAgICAgIHRoaXMubWlub3IgPSAwO1xuICAgICAgdGhpcy5tYWpvcisrO1xuICAgICAgdGhpcy5pbmMoJ3ByZScsIGlkZW50aWZpZXIpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAncHJlbWlub3InOlxuICAgICAgdGhpcy5wcmVyZWxlYXNlLmxlbmd0aCA9IDA7XG4gICAgICB0aGlzLnBhdGNoID0gMDtcbiAgICAgIHRoaXMubWlub3IrKztcbiAgICAgIHRoaXMuaW5jKCdwcmUnLCBpZGVudGlmaWVyKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3ByZXBhdGNoJzpcbiAgICAgIC8vIElmIHRoaXMgaXMgYWxyZWFkeSBhIHByZXJlbGVhc2UsIGl0IHdpbGwgYnVtcCB0byB0aGUgbmV4dCB2ZXJzaW9uXG4gICAgICAvLyBkcm9wIGFueSBwcmVyZWxlYXNlcyB0aGF0IG1pZ2h0IGFscmVhZHkgZXhpc3QsIHNpbmNlIHRoZXkgYXJlIG5vdFxuICAgICAgLy8gcmVsZXZhbnQgYXQgdGhpcyBwb2ludC5cbiAgICAgIHRoaXMucHJlcmVsZWFzZS5sZW5ndGggPSAwO1xuICAgICAgdGhpcy5pbmMoJ3BhdGNoJywgaWRlbnRpZmllcik7XG4gICAgICB0aGlzLmluYygncHJlJywgaWRlbnRpZmllcik7XG4gICAgICBicmVhaztcbiAgICAvLyBJZiB0aGUgaW5wdXQgaXMgYSBub24tcHJlcmVsZWFzZSB2ZXJzaW9uLCB0aGlzIGFjdHMgdGhlIHNhbWUgYXNcbiAgICAvLyBwcmVwYXRjaC5cbiAgICBjYXNlICdwcmVyZWxlYXNlJzpcbiAgICAgIGlmICh0aGlzLnByZXJlbGVhc2UubGVuZ3RoID09PSAwKVxuICAgICAgICB0aGlzLmluYygncGF0Y2gnLCBpZGVudGlmaWVyKTtcbiAgICAgIHRoaXMuaW5jKCdwcmUnLCBpZGVudGlmaWVyKTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAnbWFqb3InOlxuICAgICAgLy8gSWYgdGhpcyBpcyBhIHByZS1tYWpvciB2ZXJzaW9uLCBidW1wIHVwIHRvIHRoZSBzYW1lIG1ham9yIHZlcnNpb24uXG4gICAgICAvLyBPdGhlcndpc2UgaW5jcmVtZW50IG1ham9yLlxuICAgICAgLy8gMS4wLjAtNSBidW1wcyB0byAxLjAuMFxuICAgICAgLy8gMS4xLjAgYnVtcHMgdG8gMi4wLjBcbiAgICAgIGlmICh0aGlzLm1pbm9yICE9PSAwIHx8IHRoaXMucGF0Y2ggIT09IDAgfHwgdGhpcy5wcmVyZWxlYXNlLmxlbmd0aCA9PT0gMClcbiAgICAgICAgdGhpcy5tYWpvcisrO1xuICAgICAgdGhpcy5taW5vciA9IDA7XG4gICAgICB0aGlzLnBhdGNoID0gMDtcbiAgICAgIHRoaXMucHJlcmVsZWFzZSA9IFtdO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnbWlub3InOlxuICAgICAgLy8gSWYgdGhpcyBpcyBhIHByZS1taW5vciB2ZXJzaW9uLCBidW1wIHVwIHRvIHRoZSBzYW1lIG1pbm9yIHZlcnNpb24uXG4gICAgICAvLyBPdGhlcndpc2UgaW5jcmVtZW50IG1pbm9yLlxuICAgICAgLy8gMS4yLjAtNSBidW1wcyB0byAxLjIuMFxuICAgICAgLy8gMS4yLjEgYnVtcHMgdG8gMS4zLjBcbiAgICAgIGlmICh0aGlzLnBhdGNoICE9PSAwIHx8IHRoaXMucHJlcmVsZWFzZS5sZW5ndGggPT09IDApXG4gICAgICAgIHRoaXMubWlub3IrKztcbiAgICAgIHRoaXMucGF0Y2ggPSAwO1xuICAgICAgdGhpcy5wcmVyZWxlYXNlID0gW107XG4gICAgICBicmVhaztcbiAgICBjYXNlICdwYXRjaCc6XG4gICAgICAvLyBJZiB0aGlzIGlzIG5vdCBhIHByZS1yZWxlYXNlIHZlcnNpb24sIGl0IHdpbGwgaW5jcmVtZW50IHRoZSBwYXRjaC5cbiAgICAgIC8vIElmIGl0IGlzIGEgcHJlLXJlbGVhc2UgaXQgd2lsbCBidW1wIHVwIHRvIHRoZSBzYW1lIHBhdGNoIHZlcnNpb24uXG4gICAgICAvLyAxLjIuMC01IHBhdGNoZXMgdG8gMS4yLjBcbiAgICAgIC8vIDEuMi4wIHBhdGNoZXMgdG8gMS4yLjFcbiAgICAgIGlmICh0aGlzLnByZXJlbGVhc2UubGVuZ3RoID09PSAwKVxuICAgICAgICB0aGlzLnBhdGNoKys7XG4gICAgICB0aGlzLnByZXJlbGVhc2UgPSBbXTtcbiAgICAgIGJyZWFrO1xuICAgIC8vIFRoaXMgcHJvYmFibHkgc2hvdWxkbid0IGJlIHVzZWQgcHVibGljbHkuXG4gICAgLy8gMS4wLjAgXCJwcmVcIiB3b3VsZCBiZWNvbWUgMS4wLjAtMCB3aGljaCBpcyB0aGUgd3JvbmcgZGlyZWN0aW9uLlxuICAgIGNhc2UgJ3ByZSc6XG4gICAgICBpZiAodGhpcy5wcmVyZWxlYXNlLmxlbmd0aCA9PT0gMClcbiAgICAgICAgdGhpcy5wcmVyZWxlYXNlID0gWzBdO1xuICAgICAgZWxzZSB7XG4gICAgICAgIHZhciBpID0gdGhpcy5wcmVyZWxlYXNlLmxlbmd0aDtcbiAgICAgICAgd2hpbGUgKC0taSA+PSAwKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByZXJlbGVhc2VbaV0gPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICB0aGlzLnByZXJlbGVhc2VbaV0rKztcbiAgICAgICAgICAgIGkgPSAtMjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGkgPT09IC0xKSAvLyBkaWRuJ3QgaW5jcmVtZW50IGFueXRoaW5nXG4gICAgICAgICAgdGhpcy5wcmVyZWxlYXNlLnB1c2goMCk7XG4gICAgICB9XG4gICAgICBpZiAoaWRlbnRpZmllcikge1xuICAgICAgICAvLyAxLjIuMC1iZXRhLjEgYnVtcHMgdG8gMS4yLjAtYmV0YS4yLFxuICAgICAgICAvLyAxLjIuMC1iZXRhLmZvb2JseiBvciAxLjIuMC1iZXRhIGJ1bXBzIHRvIDEuMi4wLWJldGEuMFxuICAgICAgICBpZiAodGhpcy5wcmVyZWxlYXNlWzBdID09PSBpZGVudGlmaWVyKSB7XG4gICAgICAgICAgaWYgKGlzTmFOKHRoaXMucHJlcmVsZWFzZVsxXSkpXG4gICAgICAgICAgICB0aGlzLnByZXJlbGVhc2UgPSBbaWRlbnRpZmllciwgMF07XG4gICAgICAgIH0gZWxzZVxuICAgICAgICAgIHRoaXMucHJlcmVsZWFzZSA9IFtpZGVudGlmaWVyLCAwXTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBpbmNyZW1lbnQgYXJndW1lbnQ6ICcgKyByZWxlYXNlKTtcbiAgfVxuICB0aGlzLmZvcm1hdCgpO1xuICB0aGlzLnJhdyA9IHRoaXMudmVyc2lvbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5leHBvcnRzLmluYyA9IGluYztcbmZ1bmN0aW9uIGluYyh2ZXJzaW9uLCByZWxlYXNlLCBsb29zZSwgaWRlbnRpZmllcikge1xuICBpZiAodHlwZW9mKGxvb3NlKSA9PT0gJ3N0cmluZycpIHtcbiAgICBpZGVudGlmaWVyID0gbG9vc2U7XG4gICAgbG9vc2UgPSB1bmRlZmluZWQ7XG4gIH1cblxuICB0cnkge1xuICAgIHJldHVybiBuZXcgU2VtVmVyKHZlcnNpb24sIGxvb3NlKS5pbmMocmVsZWFzZSwgaWRlbnRpZmllcikudmVyc2lvbjtcbiAgfSBjYXRjaCAoZXIpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuXG5leHBvcnRzLmRpZmYgPSBkaWZmO1xuZnVuY3Rpb24gZGlmZih2ZXJzaW9uMSwgdmVyc2lvbjIpIHtcbiAgaWYgKGVxKHZlcnNpb24xLCB2ZXJzaW9uMikpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfSBlbHNlIHtcbiAgICB2YXIgdjEgPSBwYXJzZSh2ZXJzaW9uMSk7XG4gICAgdmFyIHYyID0gcGFyc2UodmVyc2lvbjIpO1xuICAgIGlmICh2MS5wcmVyZWxlYXNlLmxlbmd0aCB8fCB2Mi5wcmVyZWxlYXNlLmxlbmd0aCkge1xuICAgICAgZm9yICh2YXIga2V5IGluIHYxKSB7XG4gICAgICAgIGlmIChrZXkgPT09ICdtYWpvcicgfHwga2V5ID09PSAnbWlub3InIHx8IGtleSA9PT0gJ3BhdGNoJykge1xuICAgICAgICAgIGlmICh2MVtrZXldICE9PSB2MltrZXldKSB7XG4gICAgICAgICAgICByZXR1cm4gJ3ByZScra2V5O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuICdwcmVyZWxlYXNlJztcbiAgICB9XG4gICAgZm9yICh2YXIga2V5IGluIHYxKSB7XG4gICAgICBpZiAoa2V5ID09PSAnbWFqb3InIHx8IGtleSA9PT0gJ21pbm9yJyB8fCBrZXkgPT09ICdwYXRjaCcpIHtcbiAgICAgICAgaWYgKHYxW2tleV0gIT09IHYyW2tleV0pIHtcbiAgICAgICAgICByZXR1cm4ga2V5O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydHMuY29tcGFyZUlkZW50aWZpZXJzID0gY29tcGFyZUlkZW50aWZpZXJzO1xuXG52YXIgbnVtZXJpYyA9IC9eWzAtOV0rJC87XG5mdW5jdGlvbiBjb21wYXJlSWRlbnRpZmllcnMoYSwgYikge1xuICB2YXIgYW51bSA9IG51bWVyaWMudGVzdChhKTtcbiAgdmFyIGJudW0gPSBudW1lcmljLnRlc3QoYik7XG5cbiAgaWYgKGFudW0gJiYgYm51bSkge1xuICAgIGEgPSArYTtcbiAgICBiID0gK2I7XG4gIH1cblxuICByZXR1cm4gKGFudW0gJiYgIWJudW0pID8gLTEgOlxuICAgICAgICAgKGJudW0gJiYgIWFudW0pID8gMSA6XG4gICAgICAgICBhIDwgYiA/IC0xIDpcbiAgICAgICAgIGEgPiBiID8gMSA6XG4gICAgICAgICAwO1xufVxuXG5leHBvcnRzLnJjb21wYXJlSWRlbnRpZmllcnMgPSByY29tcGFyZUlkZW50aWZpZXJzO1xuZnVuY3Rpb24gcmNvbXBhcmVJZGVudGlmaWVycyhhLCBiKSB7XG4gIHJldHVybiBjb21wYXJlSWRlbnRpZmllcnMoYiwgYSk7XG59XG5cbmV4cG9ydHMubWFqb3IgPSBtYWpvcjtcbmZ1bmN0aW9uIG1ham9yKGEsIGxvb3NlKSB7XG4gIHJldHVybiBuZXcgU2VtVmVyKGEsIGxvb3NlKS5tYWpvcjtcbn1cblxuZXhwb3J0cy5taW5vciA9IG1pbm9yO1xuZnVuY3Rpb24gbWlub3IoYSwgbG9vc2UpIHtcbiAgcmV0dXJuIG5ldyBTZW1WZXIoYSwgbG9vc2UpLm1pbm9yO1xufVxuXG5leHBvcnRzLnBhdGNoID0gcGF0Y2g7XG5mdW5jdGlvbiBwYXRjaChhLCBsb29zZSkge1xuICByZXR1cm4gbmV3IFNlbVZlcihhLCBsb29zZSkucGF0Y2g7XG59XG5cbmV4cG9ydHMuY29tcGFyZSA9IGNvbXBhcmU7XG5mdW5jdGlvbiBjb21wYXJlKGEsIGIsIGxvb3NlKSB7XG4gIHJldHVybiBuZXcgU2VtVmVyKGEsIGxvb3NlKS5jb21wYXJlKGIpO1xufVxuXG5leHBvcnRzLmNvbXBhcmVMb29zZSA9IGNvbXBhcmVMb29zZTtcbmZ1bmN0aW9uIGNvbXBhcmVMb29zZShhLCBiKSB7XG4gIHJldHVybiBjb21wYXJlKGEsIGIsIHRydWUpO1xufVxuXG5leHBvcnRzLnJjb21wYXJlID0gcmNvbXBhcmU7XG5mdW5jdGlvbiByY29tcGFyZShhLCBiLCBsb29zZSkge1xuICByZXR1cm4gY29tcGFyZShiLCBhLCBsb29zZSk7XG59XG5cbmV4cG9ydHMuc29ydCA9IHNvcnQ7XG5mdW5jdGlvbiBzb3J0KGxpc3QsIGxvb3NlKSB7XG4gIHJldHVybiBsaXN0LnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgIHJldHVybiBleHBvcnRzLmNvbXBhcmUoYSwgYiwgbG9vc2UpO1xuICB9KTtcbn1cblxuZXhwb3J0cy5yc29ydCA9IHJzb3J0O1xuZnVuY3Rpb24gcnNvcnQobGlzdCwgbG9vc2UpIHtcbiAgcmV0dXJuIGxpc3Quc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgcmV0dXJuIGV4cG9ydHMucmNvbXBhcmUoYSwgYiwgbG9vc2UpO1xuICB9KTtcbn1cblxuZXhwb3J0cy5ndCA9IGd0O1xuZnVuY3Rpb24gZ3QoYSwgYiwgbG9vc2UpIHtcbiAgcmV0dXJuIGNvbXBhcmUoYSwgYiwgbG9vc2UpID4gMDtcbn1cblxuZXhwb3J0cy5sdCA9IGx0O1xuZnVuY3Rpb24gbHQoYSwgYiwgbG9vc2UpIHtcbiAgcmV0dXJuIGNvbXBhcmUoYSwgYiwgbG9vc2UpIDwgMDtcbn1cblxuZXhwb3J0cy5lcSA9IGVxO1xuZnVuY3Rpb24gZXEoYSwgYiwgbG9vc2UpIHtcbiAgcmV0dXJuIGNvbXBhcmUoYSwgYiwgbG9vc2UpID09PSAwO1xufVxuXG5leHBvcnRzLm5lcSA9IG5lcTtcbmZ1bmN0aW9uIG5lcShhLCBiLCBsb29zZSkge1xuICByZXR1cm4gY29tcGFyZShhLCBiLCBsb29zZSkgIT09IDA7XG59XG5cbmV4cG9ydHMuZ3RlID0gZ3RlO1xuZnVuY3Rpb24gZ3RlKGEsIGIsIGxvb3NlKSB7XG4gIHJldHVybiBjb21wYXJlKGEsIGIsIGxvb3NlKSA+PSAwO1xufVxuXG5leHBvcnRzLmx0ZSA9IGx0ZTtcbmZ1bmN0aW9uIGx0ZShhLCBiLCBsb29zZSkge1xuICByZXR1cm4gY29tcGFyZShhLCBiLCBsb29zZSkgPD0gMDtcbn1cblxuZXhwb3J0cy5jbXAgPSBjbXA7XG5mdW5jdGlvbiBjbXAoYSwgb3AsIGIsIGxvb3NlKSB7XG4gIHZhciByZXQ7XG4gIHN3aXRjaCAob3ApIHtcbiAgICBjYXNlICc9PT0nOlxuICAgICAgaWYgKHR5cGVvZiBhID09PSAnb2JqZWN0JykgYSA9IGEudmVyc2lvbjtcbiAgICAgIGlmICh0eXBlb2YgYiA9PT0gJ29iamVjdCcpIGIgPSBiLnZlcnNpb247XG4gICAgICByZXQgPSBhID09PSBiO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnIT09JzpcbiAgICAgIGlmICh0eXBlb2YgYSA9PT0gJ29iamVjdCcpIGEgPSBhLnZlcnNpb247XG4gICAgICBpZiAodHlwZW9mIGIgPT09ICdvYmplY3QnKSBiID0gYi52ZXJzaW9uO1xuICAgICAgcmV0ID0gYSAhPT0gYjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJyc6IGNhc2UgJz0nOiBjYXNlICc9PSc6IHJldCA9IGVxKGEsIGIsIGxvb3NlKTsgYnJlYWs7XG4gICAgY2FzZSAnIT0nOiByZXQgPSBuZXEoYSwgYiwgbG9vc2UpOyBicmVhaztcbiAgICBjYXNlICc+JzogcmV0ID0gZ3QoYSwgYiwgbG9vc2UpOyBicmVhaztcbiAgICBjYXNlICc+PSc6IHJldCA9IGd0ZShhLCBiLCBsb29zZSk7IGJyZWFrO1xuICAgIGNhc2UgJzwnOiByZXQgPSBsdChhLCBiLCBsb29zZSk7IGJyZWFrO1xuICAgIGNhc2UgJzw9JzogcmV0ID0gbHRlKGEsIGIsIGxvb3NlKTsgYnJlYWs7XG4gICAgZGVmYXVsdDogdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBvcGVyYXRvcjogJyArIG9wKTtcbiAgfVxuICByZXR1cm4gcmV0O1xufVxuXG5leHBvcnRzLkNvbXBhcmF0b3IgPSBDb21wYXJhdG9yO1xuZnVuY3Rpb24gQ29tcGFyYXRvcihjb21wLCBsb29zZSkge1xuICBpZiAoY29tcCBpbnN0YW5jZW9mIENvbXBhcmF0b3IpIHtcbiAgICBpZiAoY29tcC5sb29zZSA9PT0gbG9vc2UpXG4gICAgICByZXR1cm4gY29tcDtcbiAgICBlbHNlXG4gICAgICBjb21wID0gY29tcC52YWx1ZTtcbiAgfVxuXG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBDb21wYXJhdG9yKSlcbiAgICByZXR1cm4gbmV3IENvbXBhcmF0b3IoY29tcCwgbG9vc2UpO1xuXG4gIGRlYnVnKCdjb21wYXJhdG9yJywgY29tcCwgbG9vc2UpO1xuICB0aGlzLmxvb3NlID0gbG9vc2U7XG4gIHRoaXMucGFyc2UoY29tcCk7XG5cbiAgaWYgKHRoaXMuc2VtdmVyID09PSBBTlkpXG4gICAgdGhpcy52YWx1ZSA9ICcnO1xuICBlbHNlXG4gICAgdGhpcy52YWx1ZSA9IHRoaXMub3BlcmF0b3IgKyB0aGlzLnNlbXZlci52ZXJzaW9uO1xuXG4gIGRlYnVnKCdjb21wJywgdGhpcyk7XG59XG5cbnZhciBBTlkgPSB7fTtcbkNvbXBhcmF0b3IucHJvdG90eXBlLnBhcnNlID0gZnVuY3Rpb24oY29tcCkge1xuICB2YXIgciA9IHRoaXMubG9vc2UgPyByZVtDT01QQVJBVE9STE9PU0VdIDogcmVbQ09NUEFSQVRPUl07XG4gIHZhciBtID0gY29tcC5tYXRjaChyKTtcblxuICBpZiAoIW0pXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBjb21wYXJhdG9yOiAnICsgY29tcCk7XG5cbiAgdGhpcy5vcGVyYXRvciA9IG1bMV07XG4gIGlmICh0aGlzLm9wZXJhdG9yID09PSAnPScpXG4gICAgdGhpcy5vcGVyYXRvciA9ICcnO1xuXG4gIC8vIGlmIGl0IGxpdGVyYWxseSBpcyBqdXN0ICc+JyBvciAnJyB0aGVuIGFsbG93IGFueXRoaW5nLlxuICBpZiAoIW1bMl0pXG4gICAgdGhpcy5zZW12ZXIgPSBBTlk7XG4gIGVsc2VcbiAgICB0aGlzLnNlbXZlciA9IG5ldyBTZW1WZXIobVsyXSwgdGhpcy5sb29zZSk7XG59O1xuXG5Db21wYXJhdG9yLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy52YWx1ZTtcbn07XG5cbkNvbXBhcmF0b3IucHJvdG90eXBlLnRlc3QgPSBmdW5jdGlvbih2ZXJzaW9uKSB7XG4gIGRlYnVnKCdDb21wYXJhdG9yLnRlc3QnLCB2ZXJzaW9uLCB0aGlzLmxvb3NlKTtcblxuICBpZiAodGhpcy5zZW12ZXIgPT09IEFOWSlcbiAgICByZXR1cm4gdHJ1ZTtcblxuICBpZiAodHlwZW9mIHZlcnNpb24gPT09ICdzdHJpbmcnKVxuICAgIHZlcnNpb24gPSBuZXcgU2VtVmVyKHZlcnNpb24sIHRoaXMubG9vc2UpO1xuXG4gIHJldHVybiBjbXAodmVyc2lvbiwgdGhpcy5vcGVyYXRvciwgdGhpcy5zZW12ZXIsIHRoaXMubG9vc2UpO1xufTtcblxuXG5leHBvcnRzLlJhbmdlID0gUmFuZ2U7XG5mdW5jdGlvbiBSYW5nZShyYW5nZSwgbG9vc2UpIHtcbiAgaWYgKChyYW5nZSBpbnN0YW5jZW9mIFJhbmdlKSAmJiByYW5nZS5sb29zZSA9PT0gbG9vc2UpXG4gICAgcmV0dXJuIHJhbmdlO1xuXG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBSYW5nZSkpXG4gICAgcmV0dXJuIG5ldyBSYW5nZShyYW5nZSwgbG9vc2UpO1xuXG4gIHRoaXMubG9vc2UgPSBsb29zZTtcblxuICAvLyBGaXJzdCwgc3BsaXQgYmFzZWQgb24gYm9vbGVhbiBvciB8fFxuICB0aGlzLnJhdyA9IHJhbmdlO1xuICB0aGlzLnNldCA9IHJhbmdlLnNwbGl0KC9cXHMqXFx8XFx8XFxzKi8pLm1hcChmdW5jdGlvbihyYW5nZSkge1xuICAgIHJldHVybiB0aGlzLnBhcnNlUmFuZ2UocmFuZ2UudHJpbSgpKTtcbiAgfSwgdGhpcykuZmlsdGVyKGZ1bmN0aW9uKGMpIHtcbiAgICAvLyB0aHJvdyBvdXQgYW55IHRoYXQgYXJlIG5vdCByZWxldmFudCBmb3Igd2hhdGV2ZXIgcmVhc29uXG4gICAgcmV0dXJuIGMubGVuZ3RoO1xuICB9KTtcblxuICBpZiAoIXRoaXMuc2V0Lmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgU2VtVmVyIFJhbmdlOiAnICsgcmFuZ2UpO1xuICB9XG5cbiAgdGhpcy5mb3JtYXQoKTtcbn1cblxuUmFuZ2UucHJvdG90eXBlLmZvcm1hdCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnJhbmdlID0gdGhpcy5zZXQubWFwKGZ1bmN0aW9uKGNvbXBzKSB7XG4gICAgcmV0dXJuIGNvbXBzLmpvaW4oJyAnKS50cmltKCk7XG4gIH0pLmpvaW4oJ3x8JykudHJpbSgpO1xuICByZXR1cm4gdGhpcy5yYW5nZTtcbn07XG5cblJhbmdlLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5yYW5nZTtcbn07XG5cblJhbmdlLnByb3RvdHlwZS5wYXJzZVJhbmdlID0gZnVuY3Rpb24ocmFuZ2UpIHtcbiAgdmFyIGxvb3NlID0gdGhpcy5sb29zZTtcbiAgcmFuZ2UgPSByYW5nZS50cmltKCk7XG4gIGRlYnVnKCdyYW5nZScsIHJhbmdlLCBsb29zZSk7XG4gIC8vIGAxLjIuMyAtIDEuMi40YCA9PiBgPj0xLjIuMyA8PTEuMi40YFxuICB2YXIgaHIgPSBsb29zZSA/IHJlW0hZUEhFTlJBTkdFTE9PU0VdIDogcmVbSFlQSEVOUkFOR0VdO1xuICByYW5nZSA9IHJhbmdlLnJlcGxhY2UoaHIsIGh5cGhlblJlcGxhY2UpO1xuICBkZWJ1ZygnaHlwaGVuIHJlcGxhY2UnLCByYW5nZSk7XG4gIC8vIGA+IDEuMi4zIDwgMS4yLjVgID0+IGA+MS4yLjMgPDEuMi41YFxuICByYW5nZSA9IHJhbmdlLnJlcGxhY2UocmVbQ09NUEFSQVRPUlRSSU1dLCBjb21wYXJhdG9yVHJpbVJlcGxhY2UpO1xuICBkZWJ1ZygnY29tcGFyYXRvciB0cmltJywgcmFuZ2UsIHJlW0NPTVBBUkFUT1JUUklNXSk7XG5cbiAgLy8gYH4gMS4yLjNgID0+IGB+MS4yLjNgXG4gIHJhbmdlID0gcmFuZ2UucmVwbGFjZShyZVtUSUxERVRSSU1dLCB0aWxkZVRyaW1SZXBsYWNlKTtcblxuICAvLyBgXiAxLjIuM2AgPT4gYF4xLjIuM2BcbiAgcmFuZ2UgPSByYW5nZS5yZXBsYWNlKHJlW0NBUkVUVFJJTV0sIGNhcmV0VHJpbVJlcGxhY2UpO1xuXG4gIC8vIG5vcm1hbGl6ZSBzcGFjZXNcbiAgcmFuZ2UgPSByYW5nZS5zcGxpdCgvXFxzKy8pLmpvaW4oJyAnKTtcblxuICAvLyBBdCB0aGlzIHBvaW50LCB0aGUgcmFuZ2UgaXMgY29tcGxldGVseSB0cmltbWVkIGFuZFxuICAvLyByZWFkeSB0byBiZSBzcGxpdCBpbnRvIGNvbXBhcmF0b3JzLlxuXG4gIHZhciBjb21wUmUgPSBsb29zZSA/IHJlW0NPTVBBUkFUT1JMT09TRV0gOiByZVtDT01QQVJBVE9SXTtcbiAgdmFyIHNldCA9IHJhbmdlLnNwbGl0KCcgJykubWFwKGZ1bmN0aW9uKGNvbXApIHtcbiAgICByZXR1cm4gcGFyc2VDb21wYXJhdG9yKGNvbXAsIGxvb3NlKTtcbiAgfSkuam9pbignICcpLnNwbGl0KC9cXHMrLyk7XG4gIGlmICh0aGlzLmxvb3NlKSB7XG4gICAgLy8gaW4gbG9vc2UgbW9kZSwgdGhyb3cgb3V0IGFueSB0aGF0IGFyZSBub3QgdmFsaWQgY29tcGFyYXRvcnNcbiAgICBzZXQgPSBzZXQuZmlsdGVyKGZ1bmN0aW9uKGNvbXApIHtcbiAgICAgIHJldHVybiAhIWNvbXAubWF0Y2goY29tcFJlKTtcbiAgICB9KTtcbiAgfVxuICBzZXQgPSBzZXQubWFwKGZ1bmN0aW9uKGNvbXApIHtcbiAgICByZXR1cm4gbmV3IENvbXBhcmF0b3IoY29tcCwgbG9vc2UpO1xuICB9KTtcblxuICByZXR1cm4gc2V0O1xufTtcblxuLy8gTW9zdGx5IGp1c3QgZm9yIHRlc3RpbmcgYW5kIGxlZ2FjeSBBUEkgcmVhc29uc1xuZXhwb3J0cy50b0NvbXBhcmF0b3JzID0gdG9Db21wYXJhdG9ycztcbmZ1bmN0aW9uIHRvQ29tcGFyYXRvcnMocmFuZ2UsIGxvb3NlKSB7XG4gIHJldHVybiBuZXcgUmFuZ2UocmFuZ2UsIGxvb3NlKS5zZXQubWFwKGZ1bmN0aW9uKGNvbXApIHtcbiAgICByZXR1cm4gY29tcC5tYXAoZnVuY3Rpb24oYykge1xuICAgICAgcmV0dXJuIGMudmFsdWU7XG4gICAgfSkuam9pbignICcpLnRyaW0oKS5zcGxpdCgnICcpO1xuICB9KTtcbn1cblxuLy8gY29tcHJpc2VkIG9mIHhyYW5nZXMsIHRpbGRlcywgc3RhcnMsIGFuZCBndGx0J3MgYXQgdGhpcyBwb2ludC5cbi8vIGFscmVhZHkgcmVwbGFjZWQgdGhlIGh5cGhlbiByYW5nZXNcbi8vIHR1cm4gaW50byBhIHNldCBvZiBKVVNUIGNvbXBhcmF0b3JzLlxuZnVuY3Rpb24gcGFyc2VDb21wYXJhdG9yKGNvbXAsIGxvb3NlKSB7XG4gIGRlYnVnKCdjb21wJywgY29tcCk7XG4gIGNvbXAgPSByZXBsYWNlQ2FyZXRzKGNvbXAsIGxvb3NlKTtcbiAgZGVidWcoJ2NhcmV0JywgY29tcCk7XG4gIGNvbXAgPSByZXBsYWNlVGlsZGVzKGNvbXAsIGxvb3NlKTtcbiAgZGVidWcoJ3RpbGRlcycsIGNvbXApO1xuICBjb21wID0gcmVwbGFjZVhSYW5nZXMoY29tcCwgbG9vc2UpO1xuICBkZWJ1ZygneHJhbmdlJywgY29tcCk7XG4gIGNvbXAgPSByZXBsYWNlU3RhcnMoY29tcCwgbG9vc2UpO1xuICBkZWJ1Zygnc3RhcnMnLCBjb21wKTtcbiAgcmV0dXJuIGNvbXA7XG59XG5cbmZ1bmN0aW9uIGlzWChpZCkge1xuICByZXR1cm4gIWlkIHx8IGlkLnRvTG93ZXJDYXNlKCkgPT09ICd4JyB8fCBpZCA9PT0gJyonO1xufVxuXG4vLyB+LCB+PiAtLT4gKiAoYW55LCBraW5kYSBzaWxseSlcbi8vIH4yLCB+Mi54LCB+Mi54LngsIH4+Miwgfj4yLnggfj4yLngueCAtLT4gPj0yLjAuMCA8My4wLjBcbi8vIH4yLjAsIH4yLjAueCwgfj4yLjAsIH4+Mi4wLnggLS0+ID49Mi4wLjAgPDIuMS4wXG4vLyB+MS4yLCB+MS4yLngsIH4+MS4yLCB+PjEuMi54IC0tPiA+PTEuMi4wIDwxLjMuMFxuLy8gfjEuMi4zLCB+PjEuMi4zIC0tPiA+PTEuMi4zIDwxLjMuMFxuLy8gfjEuMi4wLCB+PjEuMi4wIC0tPiA+PTEuMi4wIDwxLjMuMFxuZnVuY3Rpb24gcmVwbGFjZVRpbGRlcyhjb21wLCBsb29zZSkge1xuICByZXR1cm4gY29tcC50cmltKCkuc3BsaXQoL1xccysvKS5tYXAoZnVuY3Rpb24oY29tcCkge1xuICAgIHJldHVybiByZXBsYWNlVGlsZGUoY29tcCwgbG9vc2UpO1xuICB9KS5qb2luKCcgJyk7XG59XG5cbmZ1bmN0aW9uIHJlcGxhY2VUaWxkZShjb21wLCBsb29zZSkge1xuICB2YXIgciA9IGxvb3NlID8gcmVbVElMREVMT09TRV0gOiByZVtUSUxERV07XG4gIHJldHVybiBjb21wLnJlcGxhY2UociwgZnVuY3Rpb24oXywgTSwgbSwgcCwgcHIpIHtcbiAgICBkZWJ1ZygndGlsZGUnLCBjb21wLCBfLCBNLCBtLCBwLCBwcik7XG4gICAgdmFyIHJldDtcblxuICAgIGlmIChpc1goTSkpXG4gICAgICByZXQgPSAnJztcbiAgICBlbHNlIGlmIChpc1gobSkpXG4gICAgICByZXQgPSAnPj0nICsgTSArICcuMC4wIDwnICsgKCtNICsgMSkgKyAnLjAuMCc7XG4gICAgZWxzZSBpZiAoaXNYKHApKVxuICAgICAgLy8gfjEuMiA9PSA+PTEuMi4wIDwxLjMuMFxuICAgICAgcmV0ID0gJz49JyArIE0gKyAnLicgKyBtICsgJy4wIDwnICsgTSArICcuJyArICgrbSArIDEpICsgJy4wJztcbiAgICBlbHNlIGlmIChwcikge1xuICAgICAgZGVidWcoJ3JlcGxhY2VUaWxkZSBwcicsIHByKTtcbiAgICAgIGlmIChwci5jaGFyQXQoMCkgIT09ICctJylcbiAgICAgICAgcHIgPSAnLScgKyBwcjtcbiAgICAgIHJldCA9ICc+PScgKyBNICsgJy4nICsgbSArICcuJyArIHAgKyBwciArXG4gICAgICAgICAgICAnIDwnICsgTSArICcuJyArICgrbSArIDEpICsgJy4wJztcbiAgICB9IGVsc2VcbiAgICAgIC8vIH4xLjIuMyA9PSA+PTEuMi4zIDwxLjMuMFxuICAgICAgcmV0ID0gJz49JyArIE0gKyAnLicgKyBtICsgJy4nICsgcCArXG4gICAgICAgICAgICAnIDwnICsgTSArICcuJyArICgrbSArIDEpICsgJy4wJztcblxuICAgIGRlYnVnKCd0aWxkZSByZXR1cm4nLCByZXQpO1xuICAgIHJldHVybiByZXQ7XG4gIH0pO1xufVxuXG4vLyBeIC0tPiAqIChhbnksIGtpbmRhIHNpbGx5KVxuLy8gXjIsIF4yLngsIF4yLngueCAtLT4gPj0yLjAuMCA8My4wLjBcbi8vIF4yLjAsIF4yLjAueCAtLT4gPj0yLjAuMCA8My4wLjBcbi8vIF4xLjIsIF4xLjIueCAtLT4gPj0xLjIuMCA8Mi4wLjBcbi8vIF4xLjIuMyAtLT4gPj0xLjIuMyA8Mi4wLjBcbi8vIF4xLjIuMCAtLT4gPj0xLjIuMCA8Mi4wLjBcbmZ1bmN0aW9uIHJlcGxhY2VDYXJldHMoY29tcCwgbG9vc2UpIHtcbiAgcmV0dXJuIGNvbXAudHJpbSgpLnNwbGl0KC9cXHMrLykubWFwKGZ1bmN0aW9uKGNvbXApIHtcbiAgICByZXR1cm4gcmVwbGFjZUNhcmV0KGNvbXAsIGxvb3NlKTtcbiAgfSkuam9pbignICcpO1xufVxuXG5mdW5jdGlvbiByZXBsYWNlQ2FyZXQoY29tcCwgbG9vc2UpIHtcbiAgZGVidWcoJ2NhcmV0JywgY29tcCwgbG9vc2UpO1xuICB2YXIgciA9IGxvb3NlID8gcmVbQ0FSRVRMT09TRV0gOiByZVtDQVJFVF07XG4gIHJldHVybiBjb21wLnJlcGxhY2UociwgZnVuY3Rpb24oXywgTSwgbSwgcCwgcHIpIHtcbiAgICBkZWJ1ZygnY2FyZXQnLCBjb21wLCBfLCBNLCBtLCBwLCBwcik7XG4gICAgdmFyIHJldDtcblxuICAgIGlmIChpc1goTSkpXG4gICAgICByZXQgPSAnJztcbiAgICBlbHNlIGlmIChpc1gobSkpXG4gICAgICByZXQgPSAnPj0nICsgTSArICcuMC4wIDwnICsgKCtNICsgMSkgKyAnLjAuMCc7XG4gICAgZWxzZSBpZiAoaXNYKHApKSB7XG4gICAgICBpZiAoTSA9PT0gJzAnKVxuICAgICAgICByZXQgPSAnPj0nICsgTSArICcuJyArIG0gKyAnLjAgPCcgKyBNICsgJy4nICsgKCttICsgMSkgKyAnLjAnO1xuICAgICAgZWxzZVxuICAgICAgICByZXQgPSAnPj0nICsgTSArICcuJyArIG0gKyAnLjAgPCcgKyAoK00gKyAxKSArICcuMC4wJztcbiAgICB9IGVsc2UgaWYgKHByKSB7XG4gICAgICBkZWJ1ZygncmVwbGFjZUNhcmV0IHByJywgcHIpO1xuICAgICAgaWYgKHByLmNoYXJBdCgwKSAhPT0gJy0nKVxuICAgICAgICBwciA9ICctJyArIHByO1xuICAgICAgaWYgKE0gPT09ICcwJykge1xuICAgICAgICBpZiAobSA9PT0gJzAnKVxuICAgICAgICAgIHJldCA9ICc+PScgKyBNICsgJy4nICsgbSArICcuJyArIHAgKyBwciArXG4gICAgICAgICAgICAgICAgJyA8JyArIE0gKyAnLicgKyBtICsgJy4nICsgKCtwICsgMSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICByZXQgPSAnPj0nICsgTSArICcuJyArIG0gKyAnLicgKyBwICsgcHIgK1xuICAgICAgICAgICAgICAgICcgPCcgKyBNICsgJy4nICsgKCttICsgMSkgKyAnLjAnO1xuICAgICAgfSBlbHNlXG4gICAgICAgIHJldCA9ICc+PScgKyBNICsgJy4nICsgbSArICcuJyArIHAgKyBwciArXG4gICAgICAgICAgICAgICcgPCcgKyAoK00gKyAxKSArICcuMC4wJztcbiAgICB9IGVsc2Uge1xuICAgICAgZGVidWcoJ25vIHByJyk7XG4gICAgICBpZiAoTSA9PT0gJzAnKSB7XG4gICAgICAgIGlmIChtID09PSAnMCcpXG4gICAgICAgICAgcmV0ID0gJz49JyArIE0gKyAnLicgKyBtICsgJy4nICsgcCArXG4gICAgICAgICAgICAgICAgJyA8JyArIE0gKyAnLicgKyBtICsgJy4nICsgKCtwICsgMSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICByZXQgPSAnPj0nICsgTSArICcuJyArIG0gKyAnLicgKyBwICtcbiAgICAgICAgICAgICAgICAnIDwnICsgTSArICcuJyArICgrbSArIDEpICsgJy4wJztcbiAgICAgIH0gZWxzZVxuICAgICAgICByZXQgPSAnPj0nICsgTSArICcuJyArIG0gKyAnLicgKyBwICtcbiAgICAgICAgICAgICAgJyA8JyArICgrTSArIDEpICsgJy4wLjAnO1xuICAgIH1cblxuICAgIGRlYnVnKCdjYXJldCByZXR1cm4nLCByZXQpO1xuICAgIHJldHVybiByZXQ7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiByZXBsYWNlWFJhbmdlcyhjb21wLCBsb29zZSkge1xuICBkZWJ1ZygncmVwbGFjZVhSYW5nZXMnLCBjb21wLCBsb29zZSk7XG4gIHJldHVybiBjb21wLnNwbGl0KC9cXHMrLykubWFwKGZ1bmN0aW9uKGNvbXApIHtcbiAgICByZXR1cm4gcmVwbGFjZVhSYW5nZShjb21wLCBsb29zZSk7XG4gIH0pLmpvaW4oJyAnKTtcbn1cblxuZnVuY3Rpb24gcmVwbGFjZVhSYW5nZShjb21wLCBsb29zZSkge1xuICBjb21wID0gY29tcC50cmltKCk7XG4gIHZhciByID0gbG9vc2UgPyByZVtYUkFOR0VMT09TRV0gOiByZVtYUkFOR0VdO1xuICByZXR1cm4gY29tcC5yZXBsYWNlKHIsIGZ1bmN0aW9uKHJldCwgZ3RsdCwgTSwgbSwgcCwgcHIpIHtcbiAgICBkZWJ1ZygneFJhbmdlJywgY29tcCwgcmV0LCBndGx0LCBNLCBtLCBwLCBwcik7XG4gICAgdmFyIHhNID0gaXNYKE0pO1xuICAgIHZhciB4bSA9IHhNIHx8IGlzWChtKTtcbiAgICB2YXIgeHAgPSB4bSB8fCBpc1gocCk7XG4gICAgdmFyIGFueVggPSB4cDtcblxuICAgIGlmIChndGx0ID09PSAnPScgJiYgYW55WClcbiAgICAgIGd0bHQgPSAnJztcblxuICAgIGlmICh4TSkge1xuICAgICAgaWYgKGd0bHQgPT09ICc+JyB8fCBndGx0ID09PSAnPCcpIHtcbiAgICAgICAgLy8gbm90aGluZyBpcyBhbGxvd2VkXG4gICAgICAgIHJldCA9ICc8MC4wLjAnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gbm90aGluZyBpcyBmb3JiaWRkZW5cbiAgICAgICAgcmV0ID0gJyonO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZ3RsdCAmJiBhbnlYKSB7XG4gICAgICAvLyByZXBsYWNlIFggd2l0aCAwXG4gICAgICBpZiAoeG0pXG4gICAgICAgIG0gPSAwO1xuICAgICAgaWYgKHhwKVxuICAgICAgICBwID0gMDtcblxuICAgICAgaWYgKGd0bHQgPT09ICc+Jykge1xuICAgICAgICAvLyA+MSA9PiA+PTIuMC4wXG4gICAgICAgIC8vID4xLjIgPT4gPj0xLjMuMFxuICAgICAgICAvLyA+MS4yLjMgPT4gPj0gMS4yLjRcbiAgICAgICAgZ3RsdCA9ICc+PSc7XG4gICAgICAgIGlmICh4bSkge1xuICAgICAgICAgIE0gPSArTSArIDE7XG4gICAgICAgICAgbSA9IDA7XG4gICAgICAgICAgcCA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAoeHApIHtcbiAgICAgICAgICBtID0gK20gKyAxO1xuICAgICAgICAgIHAgPSAwO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGd0bHQgPT09ICc8PScpIHtcbiAgICAgICAgLy8gPD0wLjcueCBpcyBhY3R1YWxseSA8MC44LjAsIHNpbmNlIGFueSAwLjcueCBzaG91bGRcbiAgICAgICAgLy8gcGFzcy4gIFNpbWlsYXJseSwgPD03LnggaXMgYWN0dWFsbHkgPDguMC4wLCBldGMuXG4gICAgICAgIGd0bHQgPSAnPCdcbiAgICAgICAgaWYgKHhtKVxuICAgICAgICAgIE0gPSArTSArIDFcbiAgICAgICAgZWxzZVxuICAgICAgICAgIG0gPSArbSArIDFcbiAgICAgIH1cblxuICAgICAgcmV0ID0gZ3RsdCArIE0gKyAnLicgKyBtICsgJy4nICsgcDtcbiAgICB9IGVsc2UgaWYgKHhtKSB7XG4gICAgICByZXQgPSAnPj0nICsgTSArICcuMC4wIDwnICsgKCtNICsgMSkgKyAnLjAuMCc7XG4gICAgfSBlbHNlIGlmICh4cCkge1xuICAgICAgcmV0ID0gJz49JyArIE0gKyAnLicgKyBtICsgJy4wIDwnICsgTSArICcuJyArICgrbSArIDEpICsgJy4wJztcbiAgICB9XG5cbiAgICBkZWJ1ZygneFJhbmdlIHJldHVybicsIHJldCk7XG5cbiAgICByZXR1cm4gcmV0O1xuICB9KTtcbn1cblxuLy8gQmVjYXVzZSAqIGlzIEFORC1lZCB3aXRoIGV2ZXJ5dGhpbmcgZWxzZSBpbiB0aGUgY29tcGFyYXRvcixcbi8vIGFuZCAnJyBtZWFucyBcImFueSB2ZXJzaW9uXCIsIGp1c3QgcmVtb3ZlIHRoZSAqcyBlbnRpcmVseS5cbmZ1bmN0aW9uIHJlcGxhY2VTdGFycyhjb21wLCBsb29zZSkge1xuICBkZWJ1ZygncmVwbGFjZVN0YXJzJywgY29tcCwgbG9vc2UpO1xuICAvLyBMb29zZW5lc3MgaXMgaWdub3JlZCBoZXJlLiAgc3RhciBpcyBhbHdheXMgYXMgbG9vc2UgYXMgaXQgZ2V0cyFcbiAgcmV0dXJuIGNvbXAudHJpbSgpLnJlcGxhY2UocmVbU1RBUl0sICcnKTtcbn1cblxuLy8gVGhpcyBmdW5jdGlvbiBpcyBwYXNzZWQgdG8gc3RyaW5nLnJlcGxhY2UocmVbSFlQSEVOUkFOR0VdKVxuLy8gTSwgbSwgcGF0Y2gsIHByZXJlbGVhc2UsIGJ1aWxkXG4vLyAxLjIgLSAzLjQuNSA9PiA+PTEuMi4wIDw9My40LjVcbi8vIDEuMi4zIC0gMy40ID0+ID49MS4yLjAgPDMuNS4wIEFueSAzLjQueCB3aWxsIGRvXG4vLyAxLjIgLSAzLjQgPT4gPj0xLjIuMCA8My41LjBcbmZ1bmN0aW9uIGh5cGhlblJlcGxhY2UoJDAsXG4gICAgICAgICAgICAgICAgICAgICAgIGZyb20sIGZNLCBmbSwgZnAsIGZwciwgZmIsXG4gICAgICAgICAgICAgICAgICAgICAgIHRvLCB0TSwgdG0sIHRwLCB0cHIsIHRiKSB7XG5cbiAgaWYgKGlzWChmTSkpXG4gICAgZnJvbSA9ICcnO1xuICBlbHNlIGlmIChpc1goZm0pKVxuICAgIGZyb20gPSAnPj0nICsgZk0gKyAnLjAuMCc7XG4gIGVsc2UgaWYgKGlzWChmcCkpXG4gICAgZnJvbSA9ICc+PScgKyBmTSArICcuJyArIGZtICsgJy4wJztcbiAgZWxzZVxuICAgIGZyb20gPSAnPj0nICsgZnJvbTtcblxuICBpZiAoaXNYKHRNKSlcbiAgICB0byA9ICcnO1xuICBlbHNlIGlmIChpc1godG0pKVxuICAgIHRvID0gJzwnICsgKCt0TSArIDEpICsgJy4wLjAnO1xuICBlbHNlIGlmIChpc1godHApKVxuICAgIHRvID0gJzwnICsgdE0gKyAnLicgKyAoK3RtICsgMSkgKyAnLjAnO1xuICBlbHNlIGlmICh0cHIpXG4gICAgdG8gPSAnPD0nICsgdE0gKyAnLicgKyB0bSArICcuJyArIHRwICsgJy0nICsgdHByO1xuICBlbHNlXG4gICAgdG8gPSAnPD0nICsgdG87XG5cbiAgcmV0dXJuIChmcm9tICsgJyAnICsgdG8pLnRyaW0oKTtcbn1cblxuXG4vLyBpZiBBTlkgb2YgdGhlIHNldHMgbWF0Y2ggQUxMIG9mIGl0cyBjb21wYXJhdG9ycywgdGhlbiBwYXNzXG5SYW5nZS5wcm90b3R5cGUudGVzdCA9IGZ1bmN0aW9uKHZlcnNpb24pIHtcbiAgaWYgKCF2ZXJzaW9uKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBpZiAodHlwZW9mIHZlcnNpb24gPT09ICdzdHJpbmcnKVxuICAgIHZlcnNpb24gPSBuZXcgU2VtVmVyKHZlcnNpb24sIHRoaXMubG9vc2UpO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zZXQubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAodGVzdFNldCh0aGlzLnNldFtpXSwgdmVyc2lvbikpXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuXG5mdW5jdGlvbiB0ZXN0U2V0KHNldCwgdmVyc2lvbikge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHNldC5sZW5ndGg7IGkrKykge1xuICAgIGlmICghc2V0W2ldLnRlc3QodmVyc2lvbikpXG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAodmVyc2lvbi5wcmVyZWxlYXNlLmxlbmd0aCkge1xuICAgIC8vIEZpbmQgdGhlIHNldCBvZiB2ZXJzaW9ucyB0aGF0IGFyZSBhbGxvd2VkIHRvIGhhdmUgcHJlcmVsZWFzZXNcbiAgICAvLyBGb3IgZXhhbXBsZSwgXjEuMi4zLXByLjEgZGVzdWdhcnMgdG8gPj0xLjIuMy1wci4xIDwyLjAuMFxuICAgIC8vIFRoYXQgc2hvdWxkIGFsbG93IGAxLjIuMy1wci4yYCB0byBwYXNzLlxuICAgIC8vIEhvd2V2ZXIsIGAxLjIuNC1hbHBoYS5ub3RyZWFkeWAgc2hvdWxkIE5PVCBiZSBhbGxvd2VkLFxuICAgIC8vIGV2ZW4gdGhvdWdoIGl0J3Mgd2l0aGluIHRoZSByYW5nZSBzZXQgYnkgdGhlIGNvbXBhcmF0b3JzLlxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2V0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBkZWJ1ZyhzZXRbaV0uc2VtdmVyKTtcbiAgICAgIGlmIChzZXRbaV0uc2VtdmVyID09PSBBTlkpXG4gICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICBpZiAoc2V0W2ldLnNlbXZlci5wcmVyZWxlYXNlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdmFyIGFsbG93ZWQgPSBzZXRbaV0uc2VtdmVyO1xuICAgICAgICBpZiAoYWxsb3dlZC5tYWpvciA9PT0gdmVyc2lvbi5tYWpvciAmJlxuICAgICAgICAgICAgYWxsb3dlZC5taW5vciA9PT0gdmVyc2lvbi5taW5vciAmJlxuICAgICAgICAgICAgYWxsb3dlZC5wYXRjaCA9PT0gdmVyc2lvbi5wYXRjaClcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBWZXJzaW9uIGhhcyBhIC1wcmUsIGJ1dCBpdCdzIG5vdCBvbmUgb2YgdGhlIG9uZXMgd2UgbGlrZS5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZXhwb3J0cy5zYXRpc2ZpZXMgPSBzYXRpc2ZpZXM7XG5mdW5jdGlvbiBzYXRpc2ZpZXModmVyc2lvbiwgcmFuZ2UsIGxvb3NlKSB7XG4gIHRyeSB7XG4gICAgcmFuZ2UgPSBuZXcgUmFuZ2UocmFuZ2UsIGxvb3NlKTtcbiAgfSBjYXRjaCAoZXIpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHJhbmdlLnRlc3QodmVyc2lvbik7XG59XG5cbmV4cG9ydHMubWF4U2F0aXNmeWluZyA9IG1heFNhdGlzZnlpbmc7XG5mdW5jdGlvbiBtYXhTYXRpc2Z5aW5nKHZlcnNpb25zLCByYW5nZSwgbG9vc2UpIHtcbiAgcmV0dXJuIHZlcnNpb25zLmZpbHRlcihmdW5jdGlvbih2ZXJzaW9uKSB7XG4gICAgcmV0dXJuIHNhdGlzZmllcyh2ZXJzaW9uLCByYW5nZSwgbG9vc2UpO1xuICB9KS5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gcmNvbXBhcmUoYSwgYiwgbG9vc2UpO1xuICB9KVswXSB8fCBudWxsO1xufVxuXG5leHBvcnRzLnZhbGlkUmFuZ2UgPSB2YWxpZFJhbmdlO1xuZnVuY3Rpb24gdmFsaWRSYW5nZShyYW5nZSwgbG9vc2UpIHtcbiAgdHJ5IHtcbiAgICAvLyBSZXR1cm4gJyonIGluc3RlYWQgb2YgJycgc28gdGhhdCB0cnV0aGluZXNzIHdvcmtzLlxuICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBpZiBpdCdzIGludmFsaWQgYW55d2F5XG4gICAgcmV0dXJuIG5ldyBSYW5nZShyYW5nZSwgbG9vc2UpLnJhbmdlIHx8ICcqJztcbiAgfSBjYXRjaCAoZXIpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuXG4vLyBEZXRlcm1pbmUgaWYgdmVyc2lvbiBpcyBsZXNzIHRoYW4gYWxsIHRoZSB2ZXJzaW9ucyBwb3NzaWJsZSBpbiB0aGUgcmFuZ2VcbmV4cG9ydHMubHRyID0gbHRyO1xuZnVuY3Rpb24gbHRyKHZlcnNpb24sIHJhbmdlLCBsb29zZSkge1xuICByZXR1cm4gb3V0c2lkZSh2ZXJzaW9uLCByYW5nZSwgJzwnLCBsb29zZSk7XG59XG5cbi8vIERldGVybWluZSBpZiB2ZXJzaW9uIGlzIGdyZWF0ZXIgdGhhbiBhbGwgdGhlIHZlcnNpb25zIHBvc3NpYmxlIGluIHRoZSByYW5nZS5cbmV4cG9ydHMuZ3RyID0gZ3RyO1xuZnVuY3Rpb24gZ3RyKHZlcnNpb24sIHJhbmdlLCBsb29zZSkge1xuICByZXR1cm4gb3V0c2lkZSh2ZXJzaW9uLCByYW5nZSwgJz4nLCBsb29zZSk7XG59XG5cbmV4cG9ydHMub3V0c2lkZSA9IG91dHNpZGU7XG5mdW5jdGlvbiBvdXRzaWRlKHZlcnNpb24sIHJhbmdlLCBoaWxvLCBsb29zZSkge1xuICB2ZXJzaW9uID0gbmV3IFNlbVZlcih2ZXJzaW9uLCBsb29zZSk7XG4gIHJhbmdlID0gbmV3IFJhbmdlKHJhbmdlLCBsb29zZSk7XG5cbiAgdmFyIGd0Zm4sIGx0ZWZuLCBsdGZuLCBjb21wLCBlY29tcDtcbiAgc3dpdGNoIChoaWxvKSB7XG4gICAgY2FzZSAnPic6XG4gICAgICBndGZuID0gZ3Q7XG4gICAgICBsdGVmbiA9IGx0ZTtcbiAgICAgIGx0Zm4gPSBsdDtcbiAgICAgIGNvbXAgPSAnPic7XG4gICAgICBlY29tcCA9ICc+PSc7XG4gICAgICBicmVhaztcbiAgICBjYXNlICc8JzpcbiAgICAgIGd0Zm4gPSBsdDtcbiAgICAgIGx0ZWZuID0gZ3RlO1xuICAgICAgbHRmbiA9IGd0O1xuICAgICAgY29tcCA9ICc8JztcbiAgICAgIGVjb21wID0gJzw9JztcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdNdXN0IHByb3ZpZGUgYSBoaWxvIHZhbCBvZiBcIjxcIiBvciBcIj5cIicpO1xuICB9XG5cbiAgLy8gSWYgaXQgc2F0aXNpZmVzIHRoZSByYW5nZSBpdCBpcyBub3Qgb3V0c2lkZVxuICBpZiAoc2F0aXNmaWVzKHZlcnNpb24sIHJhbmdlLCBsb29zZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvLyBGcm9tIG5vdyBvbiwgdmFyaWFibGUgdGVybXMgYXJlIGFzIGlmIHdlJ3JlIGluIFwiZ3RyXCIgbW9kZS5cbiAgLy8gYnV0IG5vdGUgdGhhdCBldmVyeXRoaW5nIGlzIGZsaXBwZWQgZm9yIHRoZSBcImx0clwiIGZ1bmN0aW9uLlxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcmFuZ2Uuc2V0Lmxlbmd0aDsgKytpKSB7XG4gICAgdmFyIGNvbXBhcmF0b3JzID0gcmFuZ2Uuc2V0W2ldO1xuXG4gICAgdmFyIGhpZ2ggPSBudWxsO1xuICAgIHZhciBsb3cgPSBudWxsO1xuXG4gICAgY29tcGFyYXRvcnMuZm9yRWFjaChmdW5jdGlvbihjb21wYXJhdG9yKSB7XG4gICAgICBpZiAoY29tcGFyYXRvci5zZW12ZXIgPT09IEFOWSkge1xuICAgICAgICBjb21wYXJhdG9yID0gbmV3IENvbXBhcmF0b3IoJz49MC4wLjAnKVxuICAgICAgfVxuICAgICAgaGlnaCA9IGhpZ2ggfHwgY29tcGFyYXRvcjtcbiAgICAgIGxvdyA9IGxvdyB8fCBjb21wYXJhdG9yO1xuICAgICAgaWYgKGd0Zm4oY29tcGFyYXRvci5zZW12ZXIsIGhpZ2guc2VtdmVyLCBsb29zZSkpIHtcbiAgICAgICAgaGlnaCA9IGNvbXBhcmF0b3I7XG4gICAgICB9IGVsc2UgaWYgKGx0Zm4oY29tcGFyYXRvci5zZW12ZXIsIGxvdy5zZW12ZXIsIGxvb3NlKSkge1xuICAgICAgICBsb3cgPSBjb21wYXJhdG9yO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gSWYgdGhlIGVkZ2UgdmVyc2lvbiBjb21wYXJhdG9yIGhhcyBhIG9wZXJhdG9yIHRoZW4gb3VyIHZlcnNpb25cbiAgICAvLyBpc24ndCBvdXRzaWRlIGl0XG4gICAgaWYgKGhpZ2gub3BlcmF0b3IgPT09IGNvbXAgfHwgaGlnaC5vcGVyYXRvciA9PT0gZWNvbXApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGUgbG93ZXN0IHZlcnNpb24gY29tcGFyYXRvciBoYXMgYW4gb3BlcmF0b3IgYW5kIG91ciB2ZXJzaW9uXG4gICAgLy8gaXMgbGVzcyB0aGFuIGl0IHRoZW4gaXQgaXNuJ3QgaGlnaGVyIHRoYW4gdGhlIHJhbmdlXG4gICAgaWYgKCghbG93Lm9wZXJhdG9yIHx8IGxvdy5vcGVyYXRvciA9PT0gY29tcCkgJiZcbiAgICAgICAgbHRlZm4odmVyc2lvbiwgbG93LnNlbXZlcikpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKGxvdy5vcGVyYXRvciA9PT0gZWNvbXAgJiYgbHRmbih2ZXJzaW9uLCBsb3cuc2VtdmVyKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC9Vc2Vycy96aGFvamluamlhbmcvU2l0ZXMvcHVibGljL3dlZXgvc3JjL2pzLWZyYW1ld29yay9+Ly5ucG1pbnN0YWxsL3NlbXZlci81LjEuMS9zZW12ZXIvc2VtdmVyLmpzXG4gKiovIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG5cbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuKGZ1bmN0aW9uICgpIHtcbiAgdHJ5IHtcbiAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNhY2hlZFNldFRpbWVvdXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaXMgbm90IGRlZmluZWQnKTtcbiAgICB9XG4gIH1cbiAgdHJ5IHtcbiAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBpcyBub3QgZGVmaW5lZCcpO1xuICAgIH1cbiAgfVxufSAoKSlcbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IGNhY2hlZFNldFRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGNhY2hlZENsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQoZHJhaW5RdWV1ZSwgMCk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vLm5wbWluc3RhbGwvcHJvY2Vzcy8wLjExLjUvcHJvY2Vzcy9icm93c2VyLmpzXG4gKiovIiwiLyoqXG4gKiBAZmlsZU92ZXJ2aWV3XG4gKiBWaWV3TW9kZWwgQ29uc3RydWN0b3IgJiBkZWZpbml0aW9uXG4gKi9cblxuaW1wb3J0ICogYXMgXyBmcm9tICcuLi91dGlsL2luZGV4J1xuaW1wb3J0ICogYXMgc3RhdGUgZnJvbSAnLi9jb3JlL3N0YXRlJ1xuaW1wb3J0ICogYXMgY29tcGlsZXIgZnJvbSAnLi9jb21waWxlcidcbmltcG9ydCAqIGFzIGRpcmVjdGl2ZSBmcm9tICcuL2RpcmVjdGl2ZSdcbmltcG9ydCAqIGFzIGRvbUhlbHBlciBmcm9tICcuL2RvbS1oZWxwZXInXG5pbXBvcnQgKiBhcyBldmVudHMgZnJvbSAnLi9ldmVudHMnXG5cbmltcG9ydCB7cmVnaXN0ZXJNb2R1bGVzLCByZWdpc3Rlck1ldGhvZHN9IGZyb20gJy4uL2FwcC9yZWdpc3RlcidcblxuZnVuY3Rpb24gY2FsbE9sZFJlYWR5RW50cnkodm0sIGNvbXBvbmVudCkge1xuICBpZiAoY29tcG9uZW50Lm1ldGhvZHMgJiZcbiAgICAgIGNvbXBvbmVudC5tZXRob2RzLnJlYWR5KSB7XG4gICAgXy53YXJuKCdcImV4cG9ydHMubWV0aG9kcy5yZWFkeVwiIGlzIGRlcHJlY2F0ZWQsICcgK1xuICAgICAgJ3BsZWFzZSB1c2UgXCJleHBvcnRzLmNyZWF0ZWRcIiBpbnN0ZWFkJylcbiAgICBjb21wb25lbnQubWV0aG9kcy5yZWFkeS5jYWxsKHZtKVxuICB9XG59XG5cbi8qKlxuICogVmlld01vZGVsIGNvbnN0cnVjdG9yXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zICAgIGNvbXBvbmVudCBvcHRpb25zXG4gKiBAcGFyYW0ge29iamVjdH0gcGFyZW50Vm0gICB3aGljaCBjb250YWlucyBfYXBwXG4gKiBAcGFyYW0ge29iamVjdH0gcGFyZW50RWwgICByb290IGVsZW1lbnQgb3IgZnJhZyBibG9ja1xuICogQHBhcmFtIHtvYmplY3R9IG1lcmdlZERhdGEgZXh0ZXJuYWwgZGF0YVxuICogQHBhcmFtIHtvYmplY3R9IGV4dGVybmFsRXZlbnRzIGV4dGVybmFsIGV2ZW50c1xuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBWbShcbiAgdHlwZSxcbiAgb3B0aW9ucyxcbiAgcGFyZW50Vm0sXG4gIHBhcmVudEVsLFxuICBtZXJnZWREYXRhLFxuICBleHRlcm5hbEV2ZW50c1xuKSB7XG4gIHRoaXMuX3BhcmVudCA9IHBhcmVudFZtLl9yZWFsUGFyZW50ID8gcGFyZW50Vm0uX3JlYWxQYXJlbnQgOiBwYXJlbnRWbVxuICB0aGlzLl9hcHAgPSBwYXJlbnRWbS5fYXBwXG4gIHBhcmVudFZtLl9jaGlsZHJlblZtcyAmJiBwYXJlbnRWbS5fY2hpbGRyZW5WbXMucHVzaCh0aGlzKVxuXG4gIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB0aGlzLl9hcHAuY3VzdG9tQ29tcG9uZW50TWFwW3R5cGVdIHx8IHt9XG4gIH1cbiAgY29uc3QgZGF0YSA9IG9wdGlvbnMuZGF0YSB8fCB7fVxuXG4gIHRoaXMuX29wdGlvbnMgPSBvcHRpb25zXG4gIHRoaXMuX21ldGhvZHMgPSBvcHRpb25zLm1ldGhvZHMgfHwge31cbiAgdGhpcy5fY29tcHV0ZWQgPSBvcHRpb25zLmNvbXB1dGVkIHx8IHt9XG4gIHRoaXMuX2NzcyA9IG9wdGlvbnMuc3R5bGUgfHwge31cbiAgdGhpcy5faWRzID0ge31cbiAgdGhpcy5fdm1FdmVudHMgPSB7fVxuICB0aGlzLl9jaGlsZHJlblZtcyA9IFtdXG4gIHRoaXMuX3R5cGUgPSB0eXBlXG5cbiAgLy8gYmluZCBldmVudHMgYW5kIGxpZmVjeWNsZXNcbiAgdGhpcy5faW5pdEV2ZW50cyhleHRlcm5hbEV2ZW50cylcblxuICBfLmRlYnVnKGBcImluaXRcIiBsaWZlY3ljbGUgaW4gVm0oJHt0aGlzLl90eXBlfSlgKVxuICB0aGlzLiRlbWl0KCdob29rOmluaXQnKVxuICB0aGlzLl9pbml0ZWQgPSB0cnVlXG4gIC8vIHByb3h5IGRhdGEgYW5kIG1ldGhvZHNcbiAgLy8gb2JzZXJ2ZSBkYXRhIGFuZCBhZGQgdGhpcyB0byB2bXNcbiAgdGhpcy5fZGF0YSA9IHR5cGVvZiBkYXRhID09PSAnZnVuY3Rpb24nID8gZGF0YSgpIDogZGF0YVxuICBpZiAobWVyZ2VkRGF0YSkge1xuICAgIF8uZXh0ZW5kKHRoaXMuX2RhdGEsIG1lcmdlZERhdGEpXG4gIH1cbiAgdGhpcy5faW5pdFN0YXRlKClcblxuICBfLmRlYnVnKGBcImNyZWF0ZWRcIiBsaWZlY3ljbGUgaW4gVm0oJHt0aGlzLl90eXBlfSlgKVxuICB0aGlzLiRlbWl0KCdob29rOmNyZWF0ZWQnKVxuICB0aGlzLl9jcmVhdGVkID0gdHJ1ZVxuICAvLyBiYWNrd2FyZCBvbGQgcmVhZHkgZW50cnlcbiAgY2FsbE9sZFJlYWR5RW50cnkodGhpcywgb3B0aW9ucylcblxuICAvLyBpZiBubyBwYXJlbnRFbGVtZW50IHRoZW4gc3BlY2lmeSB0aGUgZG9jdW1lbnRFbGVtZW50XG4gIHRoaXMuX3BhcmVudEVsID0gcGFyZW50RWwgfHwgdGhpcy5fYXBwLmRvYy5kb2N1bWVudEVsZW1lbnRcbiAgdGhpcy5fYnVpbGQoKVxufVxuXG5fLmV4dGVuZChWbS5wcm90b3R5cGUsIHN0YXRlLCBjb21waWxlciwgZGlyZWN0aXZlLCBkb21IZWxwZXIsIGV2ZW50cylcbl8uZXh0ZW5kKFZtLCB7XG4gIHJlZ2lzdGVyTW9kdWxlcyxcbiAgcmVnaXN0ZXJNZXRob2RzXG59KVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogL1VzZXJzL3poYW9qaW5qaWFuZy9TaXRlcy9wdWJsaWMvd2VleC9zcmMvanMtZnJhbWV3b3JrL2xpYi92bS9pbmRleC5qc1xuICoqLyIsImltcG9ydCBXYXRjaGVyIGZyb20gJy4vd2F0Y2hlcidcbmltcG9ydCBEZXAgZnJvbSAnLi9kZXAnXG5pbXBvcnQge1xuICBvYnNlcnZlLFxuICBwcm94eSxcbiAgdW5wcm94eVxufSBmcm9tICcuL29ic2VydmVyJ1xuaW1wb3J0IHtcbiAgaXNBcnJheSxcbiAgaXNQbGFpbk9iamVjdCxcbiAgYmluZFxufSBmcm9tICcuLi8uLi91dGlsL2luZGV4J1xuXG5leHBvcnQgZnVuY3Rpb24gX2luaXRTdGF0ZSAoKSB7XG4gIGNvbnN0IHZtID0gdGhpc1xuICB2bS5fd2F0Y2hlcnMgPSBbXVxuICB2bS5faW5pdERhdGEoKVxuICB2bS5faW5pdENvbXB1dGVkKClcbiAgdm0uX2luaXRNZXRob2RzKClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9pbml0RGF0YSAoKSB7XG4gIGNvbnN0IHZtID0gdGhpc1xuICBsZXQgZGF0YSA9IHZtLl9kYXRhXG5cbiAgaWYgKCFpc1BsYWluT2JqZWN0KGRhdGEpKSB7XG4gICAgZGF0YSA9IHt9XG4gIH1cbiAgLy8gcHJveHkgZGF0YSBvbiBpbnN0YW5jZVxuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoZGF0YSlcbiAgbGV0IGkgPSBrZXlzLmxlbmd0aFxuICB3aGlsZSAoaS0tKSB7XG4gICAgcHJveHkodm0sIGtleXNbaV0pXG4gIH1cbiAgLy8gb2JzZXJ2ZSBkYXRhXG4gIG9ic2VydmUoZGF0YSwgdm0pXG59XG5cbmZ1bmN0aW9uIG5vb3AgKCkge1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX2luaXRDb21wdXRlZCAoKSB7XG4gIGNvbnN0IHZtID0gdGhpc1xuICBjb25zdCBjb21wdXRlZCA9IHZtLl9jb21wdXRlZFxuICBpZiAoY29tcHV0ZWQpIHtcbiAgICBmb3IgKGxldCBrZXkgaW4gY29tcHV0ZWQpIHtcbiAgICAgIGNvbnN0IHVzZXJEZWYgPSBjb21wdXRlZFtrZXldXG4gICAgICBjb25zdCBkZWYgPSB7XG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiB1c2VyRGVmID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGRlZi5nZXQgPSBtYWtlQ29tcHV0ZWRHZXR0ZXIodXNlckRlZiwgdm0pXG4gICAgICAgIGRlZi5zZXQgPSBub29wXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWYuZ2V0ID0gdXNlckRlZi5nZXRcbiAgICAgICAgICA/IHVzZXJEZWYuY2FjaGUgIT09IGZhbHNlXG4gICAgICAgICAgICA/IG1ha2VDb21wdXRlZEdldHRlcih1c2VyRGVmLmdldCwgdm0pXG4gICAgICAgICAgICA6IGJpbmQodXNlckRlZi5nZXQsIHZtKVxuICAgICAgICAgIDogbm9vcFxuICAgICAgICBkZWYuc2V0ID0gdXNlckRlZi5zZXRcbiAgICAgICAgICA/IGJpbmQodXNlckRlZi5zZXQsIHZtKVxuICAgICAgICAgIDogbm9vcFxuICAgICAgfVxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHZtLCBrZXksIGRlZilcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gbWFrZUNvbXB1dGVkR2V0dGVyIChnZXR0ZXIsIG93bmVyKSB7XG4gIGNvbnN0IHdhdGNoZXIgPSBuZXcgV2F0Y2hlcihvd25lciwgZ2V0dGVyLCBudWxsLCB7XG4gICAgbGF6eTogdHJ1ZVxuICB9KVxuICByZXR1cm4gZnVuY3Rpb24gY29tcHV0ZWRHZXR0ZXIgKCkge1xuICAgIGlmICh3YXRjaGVyLmRpcnR5KSB7XG4gICAgICB3YXRjaGVyLmV2YWx1YXRlKClcbiAgICB9XG4gICAgaWYgKERlcC50YXJnZXQpIHtcbiAgICAgIHdhdGNoZXIuZGVwZW5kKClcbiAgICB9XG4gICAgcmV0dXJuIHdhdGNoZXIudmFsdWVcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gX2luaXRNZXRob2RzICgpIHtcbiAgY29uc3Qgdm0gPSB0aGlzXG4gIGNvbnN0IG1ldGhvZHMgPSB2bS5fbWV0aG9kc1xuICBpZiAobWV0aG9kcykge1xuICAgIGZvciAobGV0IGtleSBpbiBtZXRob2RzKSB7XG4gICAgICB2bVtrZXldID0gYmluZChtZXRob2RzW2tleV0sIHZtKVxuICAgIH1cbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogL1VzZXJzL3poYW9qaW5qaWFuZy9TaXRlcy9wdWJsaWMvd2VleC9zcmMvanMtZnJhbWV3b3JrL2xpYi92bS9jb3JlL3N0YXRlLmpzXG4gKiovIiwiaW1wb3J0IERlcCBmcm9tICcuL2RlcCdcbi8vIGltcG9ydCB7IHB1c2hXYXRjaGVyIH0gZnJvbSAnLi9iYXRjaGVyJ1xuaW1wb3J0IHtcbiAgd2FybixcbiAgcmVtb3ZlLFxuICBleHRlbmQsXG4gIGlzQXJyYXksXG4gIGlzT2JqZWN0LFxuICBwYXJzZVBhdGgsXG4gIF9TZXQgYXMgU2V0XG59IGZyb20gJy4uLy4uL3V0aWwvaW5kZXgnXG5cbmxldCB1aWQgPSAwXG5sZXQgcHJldlRhcmdldFxuXG4vKipcbiAqIEEgd2F0Y2hlciBwYXJzZXMgYW4gZXhwcmVzc2lvbiwgY29sbGVjdHMgZGVwZW5kZW5jaWVzLFxuICogYW5kIGZpcmVzIGNhbGxiYWNrIHdoZW4gdGhlIGV4cHJlc3Npb24gdmFsdWUgY2hhbmdlcy5cbiAqIFRoaXMgaXMgdXNlZCBmb3IgYm90aCB0aGUgJHdhdGNoKCkgYXBpIGFuZCBkaXJlY3RpdmVzLlxuICpcbiAqIEBwYXJhbSB7VnVlfSB2bVxuICogQHBhcmFtIHtTdHJpbmd8RnVuY3Rpb259IGV4cE9yRm5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNiXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogICAgICAgICAgICAgICAgIC0ge0FycmF5fSBmaWx0ZXJzXG4gKiAgICAgICAgICAgICAgICAgLSB7Qm9vbGVhbn0gdHdvV2F5XG4gKiAgICAgICAgICAgICAgICAgLSB7Qm9vbGVhbn0gZGVlcFxuICogICAgICAgICAgICAgICAgIC0ge0Jvb2xlYW59IHVzZXJcbiAqICAgICAgICAgICAgICAgICAtIHtCb29sZWFufSBzeW5jXG4gKiAgICAgICAgICAgICAgICAgLSB7Qm9vbGVhbn0gbGF6eVxuICogICAgICAgICAgICAgICAgIC0ge0Z1bmN0aW9ufSBbcHJlUHJvY2Vzc11cbiAqICAgICAgICAgICAgICAgICAtIHtGdW5jdGlvbn0gW3Bvc3RQcm9jZXNzXVxuICogQGNvbnN0cnVjdG9yXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gV2F0Y2hlciAodm0sIGV4cE9yRm4sIGNiLCBvcHRpb25zKSB7XG4gIC8vIG1peCBpbiBvcHRpb25zXG4gIGlmIChvcHRpb25zKSB7XG4gICAgZXh0ZW5kKHRoaXMsIG9wdGlvbnMpXG4gIH1cbiAgY29uc3QgaXNGbiA9IHR5cGVvZiBleHBPckZuID09PSAnZnVuY3Rpb24nXG4gIHRoaXMudm0gPSB2bVxuICB2bS5fd2F0Y2hlcnMucHVzaCh0aGlzKVxuICB0aGlzLmV4cHJlc3Npb24gPSBleHBPckZuXG4gIHRoaXMuY2IgPSBjYlxuICB0aGlzLmlkID0gKyt1aWQgLy8gdWlkIGZvciBiYXRjaGluZ1xuICB0aGlzLmFjdGl2ZSA9IHRydWVcbiAgdGhpcy5kaXJ0eSA9IHRoaXMubGF6eSAvLyBmb3IgbGF6eSB3YXRjaGVyc1xuICB0aGlzLmRlcHMgPSBbXVxuICB0aGlzLm5ld0RlcHMgPSBbXVxuICB0aGlzLmRlcElkcyA9IG5ldyBTZXQoKVxuICB0aGlzLm5ld0RlcElkcyA9IG5ldyBTZXQoKVxuICAvLyBwYXJzZSBleHByZXNzaW9uIGZvciBnZXR0ZXJcbiAgaWYgKGlzRm4pIHtcbiAgICB0aGlzLmdldHRlciA9IGV4cE9yRm5cbiAgfSBlbHNlIHtcbiAgICB0aGlzLmdldHRlciA9IHBhcnNlUGF0aChleHBPckZuKVxuICAgIGlmICghdGhpcy5nZXR0ZXIpIHtcbiAgICAgIHRoaXMuZ2V0dGVyID0gZnVuY3Rpb24gKCkge31cbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgd2FybihcbiAgICAgICAgJ0ZhaWxlZCB3YXRjaGluZyBwYXRoOiAnICsgZXhwT3JGbiArXG4gICAgICAgICdXYXRjaGVyIG9ubHkgYWNjZXB0cyBzaW1wbGUgZG90LWRlbGltaXRlZCBwYXRocy4gJyArXG4gICAgICAgICdGb3IgZnVsbCBjb250cm9sLCB1c2UgYSBmdW5jdGlvbiBpbnN0ZWFkLicsXG4gICAgICAgIHZtXG4gICAgICApXG4gICAgfVxuICB9XG4gIHRoaXMudmFsdWUgPSB0aGlzLmxhenlcbiAgICA/IHVuZGVmaW5lZFxuICAgIDogdGhpcy5nZXQoKVxuICAvLyBzdGF0ZSBmb3IgYXZvaWRpbmcgZmFsc2UgdHJpZ2dlcnMgZm9yIGRlZXAgYW5kIEFycmF5XG4gIC8vIHdhdGNoZXJzIGR1cmluZyB2bS5fZGlnZXN0KClcbiAgdGhpcy5xdWV1ZWQgPSB0aGlzLnNoYWxsb3cgPSBmYWxzZVxufVxuXG4vKipcbiAqIEV2YWx1YXRlIHRoZSBnZXR0ZXIsIGFuZCByZS1jb2xsZWN0IGRlcGVuZGVuY2llcy5cbiAqL1xuXG5XYXRjaGVyLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuYmVmb3JlR2V0KClcbiAgY29uc3QgdmFsdWUgPSB0aGlzLmdldHRlci5jYWxsKHRoaXMudm0sIHRoaXMudm0pXG4gIC8vIFwidG91Y2hcIiBldmVyeSBwcm9wZXJ0eSBzbyB0aGV5IGFyZSBhbGwgdHJhY2tlZCBhc1xuICAvLyBkZXBlbmRlbmNpZXMgZm9yIGRlZXAgd2F0Y2hpbmdcbiAgaWYgKHRoaXMuZGVlcCkge1xuICAgIHRyYXZlcnNlKHZhbHVlKVxuICB9XG4gIHRoaXMuYWZ0ZXJHZXQoKVxuICByZXR1cm4gdmFsdWVcbn1cblxuLyoqXG4gKiBQcmVwYXJlIGZvciBkZXBlbmRlbmN5IGNvbGxlY3Rpb24uXG4gKi9cblxuV2F0Y2hlci5wcm90b3R5cGUuYmVmb3JlR2V0ID0gZnVuY3Rpb24gKCkge1xuICBwcmV2VGFyZ2V0ID0gRGVwLnRhcmdldFxuICBEZXAudGFyZ2V0ID0gdGhpc1xufVxuXG4vKipcbiAqIEFkZCBhIGRlcGVuZGVuY3kgdG8gdGhpcyBkaXJlY3RpdmUuXG4gKlxuICogQHBhcmFtIHtEZXB9IGRlcFxuICovXG5cbldhdGNoZXIucHJvdG90eXBlLmFkZERlcCA9IGZ1bmN0aW9uIChkZXApIHtcbiAgY29uc3QgaWQgPSBkZXAuaWRcbiAgaWYgKCF0aGlzLm5ld0RlcElkcy5oYXMoaWQpKSB7XG4gICAgdGhpcy5uZXdEZXBJZHMuYWRkKGlkKVxuICAgIHRoaXMubmV3RGVwcy5wdXNoKGRlcClcbiAgICBpZiAoIXRoaXMuZGVwSWRzLmhhcyhpZCkpIHtcbiAgICAgIGRlcC5hZGRTdWIodGhpcylcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBDbGVhbiB1cCBmb3IgZGVwZW5kZW5jeSBjb2xsZWN0aW9uLlxuICovXG5cbldhdGNoZXIucHJvdG90eXBlLmFmdGVyR2V0ID0gZnVuY3Rpb24gKCkge1xuICBEZXAudGFyZ2V0ID0gcHJldlRhcmdldFxuICBsZXQgaSA9IHRoaXMuZGVwcy5sZW5ndGhcbiAgd2hpbGUgKGktLSkge1xuICAgIGNvbnN0IGRlcCA9IHRoaXMuZGVwc1tpXVxuICAgIGlmICghdGhpcy5uZXdEZXBJZHMuaGFzKGRlcC5pZCkpIHtcbiAgICAgIGRlcC5yZW1vdmVTdWIodGhpcylcbiAgICB9XG4gIH1cbiAgbGV0IHRtcCA9IHRoaXMuZGVwSWRzXG4gIHRoaXMuZGVwSWRzID0gdGhpcy5uZXdEZXBJZHNcbiAgdGhpcy5uZXdEZXBJZHMgPSB0bXBcbiAgdGhpcy5uZXdEZXBJZHMuY2xlYXIoKVxuICB0bXAgPSB0aGlzLmRlcHNcbiAgdGhpcy5kZXBzID0gdGhpcy5uZXdEZXBzXG4gIHRoaXMubmV3RGVwcyA9IHRtcFxuICB0aGlzLm5ld0RlcHMubGVuZ3RoID0gMFxufVxuXG4vKipcbiAqIFN1YnNjcmliZXIgaW50ZXJmYWNlLlxuICogV2lsbCBiZSBjYWxsZWQgd2hlbiBhIGRlcGVuZGVuY3kgY2hhbmdlcy5cbiAqXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHNoYWxsb3dcbiAqL1xuXG5XYXRjaGVyLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoc2hhbGxvdykge1xuICBpZiAodGhpcy5sYXp5KSB7XG4gICAgdGhpcy5kaXJ0eSA9IHRydWVcbiAgfSBlbHNlIHtcbiAgICB0aGlzLnJ1bigpXG4gIH1cbiAgLy8gfSBlbHNlIGlmICh0aGlzLnN5bmMpIHtcbiAgLy8gICB0aGlzLnJ1bigpXG4gIC8vIH0gZWxzZSB7XG4gIC8vICAgLy8gaWYgcXVldWVkLCBvbmx5IG92ZXJ3cml0ZSBzaGFsbG93IHdpdGggbm9uLXNoYWxsb3csXG4gIC8vICAgLy8gYnV0IG5vdCB0aGUgb3RoZXIgd2F5IGFyb3VuZC5cbiAgLy8gICB0aGlzLnNoYWxsb3cgPSB0aGlzLnF1ZXVlZFxuICAvLyAgICAgPyBzaGFsbG93XG4gIC8vICAgICAgID8gdGhpcy5zaGFsbG93XG4gIC8vICAgICAgIDogZmFsc2VcbiAgLy8gICAgIDogISFzaGFsbG93XG4gIC8vICAgdGhpcy5xdWV1ZWQgPSB0cnVlXG4gIC8vICAgcHVzaFdhdGNoZXIodGhpcylcbiAgLy8gfVxufVxuXG4vKipcbiAqIEJhdGNoZXIgam9iIGludGVyZmFjZS5cbiAqIFdpbGwgYmUgY2FsbGVkIGJ5IHRoZSBiYXRjaGVyLlxuICovXG5cbldhdGNoZXIucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMuYWN0aXZlKSB7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLmdldCgpXG4gICAgaWYgKFxuICAgICAgdmFsdWUgIT09IHRoaXMudmFsdWUgfHxcbiAgICAgIC8vIERlZXAgd2F0Y2hlcnMgYW5kIHdhdGNoZXJzIG9uIE9iamVjdC9BcnJheXMgc2hvdWxkIGZpcmUgZXZlblxuICAgICAgLy8gd2hlbiB0aGUgdmFsdWUgaXMgdGhlIHNhbWUsIGJlY2F1c2UgdGhlIHZhbHVlIG1heVxuICAgICAgLy8gaGF2ZSBtdXRhdGVkOyBidXQgb25seSBkbyBzbyBpZiB0aGlzIGlzIGFcbiAgICAgIC8vIG5vbi1zaGFsbG93IHVwZGF0ZSAoY2F1c2VkIGJ5IGEgdm0gZGlnZXN0KS5cbiAgICAgICgoaXNPYmplY3QodmFsdWUpIHx8IHRoaXMuZGVlcCkgJiYgIXRoaXMuc2hhbGxvdylcbiAgICApIHtcbiAgICAgIC8vIHNldCBuZXcgdmFsdWVcbiAgICAgIGNvbnN0IG9sZFZhbHVlID0gdGhpcy52YWx1ZVxuICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlXG4gICAgICB0aGlzLmNiLmNhbGwodGhpcy52bSwgdmFsdWUsIG9sZFZhbHVlKVxuICAgIH1cbiAgICB0aGlzLnF1ZXVlZCA9IHRoaXMuc2hhbGxvdyA9IGZhbHNlXG4gIH1cbn1cblxuLyoqXG4gKiBFdmFsdWF0ZSB0aGUgdmFsdWUgb2YgdGhlIHdhdGNoZXIuXG4gKiBUaGlzIG9ubHkgZ2V0cyBjYWxsZWQgZm9yIGxhenkgd2F0Y2hlcnMuXG4gKi9cblxuV2F0Y2hlci5wcm90b3R5cGUuZXZhbHVhdGUgPSBmdW5jdGlvbiAoKSB7XG4gIC8vIGF2b2lkIG92ZXJ3cml0aW5nIGFub3RoZXIgd2F0Y2hlciB0aGF0IGlzIGJlaW5nXG4gIC8vIGNvbGxlY3RlZC5cbiAgY29uc3QgY3VycmVudCA9IERlcC50YXJnZXRcbiAgdGhpcy52YWx1ZSA9IHRoaXMuZ2V0KClcbiAgdGhpcy5kaXJ0eSA9IGZhbHNlXG4gIERlcC50YXJnZXQgPSBjdXJyZW50XG59XG5cbi8qKlxuICogRGVwZW5kIG9uIGFsbCBkZXBzIGNvbGxlY3RlZCBieSB0aGlzIHdhdGNoZXIuXG4gKi9cblxuV2F0Y2hlci5wcm90b3R5cGUuZGVwZW5kID0gZnVuY3Rpb24gKCkge1xuICBsZXQgaSA9IHRoaXMuZGVwcy5sZW5ndGhcbiAgd2hpbGUgKGktLSkge1xuICAgIHRoaXMuZGVwc1tpXS5kZXBlbmQoKVxuICB9XG59XG5cbi8qKlxuICogUmVtb3ZlIHNlbGYgZnJvbSBhbGwgZGVwZW5kZW5jaWVzJyBzdWJjcmliZXIgbGlzdC5cbiAqL1xuXG5XYXRjaGVyLnByb3RvdHlwZS50ZWFyZG93biA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMuYWN0aXZlKSB7XG4gICAgLy8gcmVtb3ZlIHNlbGYgZnJvbSB2bSdzIHdhdGNoZXIgbGlzdFxuICAgIC8vIHRoaXMgaXMgYSBzb21ld2hhdCBleHBlbnNpdmUgb3BlcmF0aW9uIHNvIHdlIHNraXAgaXRcbiAgICAvLyBpZiB0aGUgdm0gaXMgYmVpbmcgZGVzdHJveWVkIG9yIGlzIHBlcmZvcm1pbmcgYSB2LWZvclxuICAgIC8vIHJlLXJlbmRlciAodGhlIHdhdGNoZXIgbGlzdCBpcyB0aGVuIGZpbHRlcmVkIGJ5IHYtZm9yKS5cbiAgICBpZiAoIXRoaXMudm0uX2lzQmVpbmdEZXN0cm95ZWQgJiYgIXRoaXMudm0uX3ZGb3JSZW1vdmluZykge1xuICAgICAgcmVtb3ZlKHRoaXMudm0uX3dhdGNoZXJzLCB0aGlzKVxuICAgIH1cbiAgICBsZXQgaSA9IHRoaXMuZGVwcy5sZW5ndGhcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICB0aGlzLmRlcHNbaV0ucmVtb3ZlU3ViKHRoaXMpXG4gICAgfVxuICAgIHRoaXMuYWN0aXZlID0gZmFsc2VcbiAgICB0aGlzLnZtID0gdGhpcy5jYiA9IHRoaXMudmFsdWUgPSBudWxsXG4gIH1cbn1cblxuLyoqXG4gKiBSZWNydXNpdmVseSB0cmF2ZXJzZSBhbiBvYmplY3QgdG8gZXZva2UgYWxsIGNvbnZlcnRlZFxuICogZ2V0dGVycywgc28gdGhhdCBldmVyeSBuZXN0ZWQgcHJvcGVydHkgaW5zaWRlIHRoZSBvYmplY3RcbiAqIGlzIGNvbGxlY3RlZCBhcyBhIFwiZGVlcFwiIGRlcGVuZGVuY3kuXG4gKlxuICogQHBhcmFtIHsqfSB2YWxcbiAqIEBwYXJhbSB7U2V0fSBzZWVuXG4gKi9cblxuY29uc3Qgc2Vlbk9iamVjdHMgPSBuZXcgU2V0KClcbmZ1bmN0aW9uIHRyYXZlcnNlICh2YWwsIHNlZW4pIHtcbiAgbGV0IGksIGtleXMsIGlzQSwgaXNPXG4gIGlmICghc2Vlbikge1xuICAgIHNlZW4gPSBzZWVuT2JqZWN0c1xuICAgIHNlZW4uY2xlYXIoKVxuICB9XG4gIGlzQSA9IGlzQXJyYXkodmFsKVxuICBpc08gPSBpc09iamVjdCh2YWwpXG4gIGlmIChpc0EgfHwgaXNPKSB7XG4gICAgaWYgKHZhbC5fX29iX18pIHtcbiAgICAgIGNvbnN0IGRlcElkID0gdmFsLl9fb2JfXy5kZXAuaWRcbiAgICAgIGlmIChzZWVuLmhhcyhkZXBJZCkpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZWVuLmFkZChkZXBJZClcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGlzQSkge1xuICAgICAgaSA9IHZhbC5sZW5ndGhcbiAgICAgIHdoaWxlIChpLS0pIHRyYXZlcnNlKHZhbFtpXSwgc2VlbilcbiAgICB9IGVsc2UgaWYgKGlzTykge1xuICAgICAga2V5cyA9IE9iamVjdC5rZXlzKHZhbClcbiAgICAgIGkgPSBrZXlzLmxlbmd0aFxuICAgICAgd2hpbGUgKGktLSkgdHJhdmVyc2UodmFsW2tleXNbaV1dLCBzZWVuKVxuICAgIH1cbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogL1VzZXJzL3poYW9qaW5qaWFuZy9TaXRlcy9wdWJsaWMvd2VleC9zcmMvanMtZnJhbWV3b3JrL2xpYi92bS9jb3JlL3dhdGNoZXIuanNcbiAqKi8iLCJpbXBvcnQgeyByZW1vdmUgfSBmcm9tICcuLi8uLi91dGlsL2luZGV4J1xuXG5sZXQgdWlkID0gMFxuXG4vKipcbiAqIEEgZGVwIGlzIGFuIG9ic2VydmFibGUgdGhhdCBjYW4gaGF2ZSBtdWx0aXBsZVxuICogZGlyZWN0aXZlcyBzdWJzY3JpYmluZyB0byBpdC5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBEZXAgKCkge1xuICB0aGlzLmlkID0gdWlkKytcbiAgdGhpcy5zdWJzID0gW11cbn1cblxuLy8gdGhlIGN1cnJlbnQgdGFyZ2V0IHdhdGNoZXIgYmVpbmcgZXZhbHVhdGVkLlxuLy8gdGhpcyBpcyBnbG9iYWxseSB1bmlxdWUgYmVjYXVzZSB0aGVyZSBjb3VsZCBiZSBvbmx5IG9uZVxuLy8gd2F0Y2hlciBiZWluZyBldmFsdWF0ZWQgYXQgYW55IHRpbWUuXG5EZXAudGFyZ2V0ID0gbnVsbFxuXG4vKipcbiAqIEFkZCBhIGRpcmVjdGl2ZSBzdWJzY3JpYmVyLlxuICpcbiAqIEBwYXJhbSB7RGlyZWN0aXZlfSBzdWJcbiAqL1xuXG5EZXAucHJvdG90eXBlLmFkZFN1YiA9IGZ1bmN0aW9uIChzdWIpIHtcbiAgdGhpcy5zdWJzLnB1c2goc3ViKVxufVxuXG4vKipcbiAqIFJlbW92ZSBhIGRpcmVjdGl2ZSBzdWJzY3JpYmVyLlxuICpcbiAqIEBwYXJhbSB7RGlyZWN0aXZlfSBzdWJcbiAqL1xuXG5EZXAucHJvdG90eXBlLnJlbW92ZVN1YiA9IGZ1bmN0aW9uIChzdWIpIHtcbiAgcmVtb3ZlKHRoaXMuc3Vicywgc3ViKVxufVxuXG4vKipcbiAqIEFkZCBzZWxmIGFzIGEgZGVwZW5kZW5jeSB0byB0aGUgdGFyZ2V0IHdhdGNoZXIuXG4gKi9cblxuRGVwLnByb3RvdHlwZS5kZXBlbmQgPSBmdW5jdGlvbiAoKSB7XG4gIERlcC50YXJnZXQuYWRkRGVwKHRoaXMpXG59XG5cbi8qKlxuICogTm90aWZ5IGFsbCBzdWJzY3JpYmVycyBvZiBhIG5ldyB2YWx1ZS5cbiAqL1xuXG5EZXAucHJvdG90eXBlLm5vdGlmeSA9IGZ1bmN0aW9uICgpIHtcbiAgLy8gc3RhYmxpemUgdGhlIHN1YnNjcmliZXIgbGlzdCBmaXJzdFxuICBjb25zdCBzdWJzID0gdGhpcy5zdWJzLnNsaWNlKClcbiAgZm9yIChsZXQgaSA9IDAsIGwgPSBzdWJzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIHN1YnNbaV0udXBkYXRlKClcbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogL1VzZXJzL3poYW9qaW5qaWFuZy9TaXRlcy9wdWJsaWMvd2VleC9zcmMvanMtZnJhbWV3b3JrL2xpYi92bS9jb3JlL2RlcC5qc1xuICoqLyIsImltcG9ydCBEZXAgZnJvbSAnLi9kZXAnXG5pbXBvcnQgeyBhcnJheU1ldGhvZHMgfSBmcm9tICcuL2FycmF5J1xuaW1wb3J0IHtcbiAgZGVmLFxuICByZW1vdmUsXG4gIGlzQXJyYXksXG4gIGlzT2JqZWN0LFxuICBpc1BsYWluT2JqZWN0LFxuICBoYXNQcm90byxcbiAgaGFzT3duLFxuICBpc1Jlc2VydmVkXG59IGZyb20gJy4uLy4uL3V0aWwvaW5kZXgnXG5cbmNvbnN0IGFycmF5S2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGFycmF5TWV0aG9kcylcblxuLyoqXG4gKiBPYnNlcnZlciBjbGFzcyB0aGF0IGFyZSBhdHRhY2hlZCB0byBlYWNoIG9ic2VydmVkXG4gKiBvYmplY3QuIE9uY2UgYXR0YWNoZWQsIHRoZSBvYnNlcnZlciBjb252ZXJ0cyB0YXJnZXRcbiAqIG9iamVjdCdzIHByb3BlcnR5IGtleXMgaW50byBnZXR0ZXIvc2V0dGVycyB0aGF0XG4gKiBjb2xsZWN0IGRlcGVuZGVuY2llcyBhbmQgZGlzcGF0Y2hlcyB1cGRhdGVzLlxuICpcbiAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSB2YWx1ZVxuICogQGNvbnN0cnVjdG9yXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIE9ic2VydmVyICh2YWx1ZSkge1xuICB0aGlzLnZhbHVlID0gdmFsdWVcbiAgdGhpcy5kZXAgPSBuZXcgRGVwKClcbiAgZGVmKHZhbHVlLCAnX19vYl9fJywgdGhpcylcbiAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgY29uc3QgYXVnbWVudCA9IGhhc1Byb3RvXG4gICAgICA/IHByb3RvQXVnbWVudFxuICAgICAgOiBjb3B5QXVnbWVudFxuICAgIGF1Z21lbnQodmFsdWUsIGFycmF5TWV0aG9kcywgYXJyYXlLZXlzKVxuICAgIHRoaXMub2JzZXJ2ZUFycmF5KHZhbHVlKVxuICB9IGVsc2Uge1xuICAgIHRoaXMud2Fsayh2YWx1ZSlcbiAgfVxufVxuXG4vLyBJbnN0YW5jZSBtZXRob2RzXG5cbi8qKlxuICogV2FsayB0aHJvdWdoIGVhY2ggcHJvcGVydHkgYW5kIGNvbnZlcnQgdGhlbSBpbnRvXG4gKiBnZXR0ZXIvc2V0dGVycy4gVGhpcyBtZXRob2Qgc2hvdWxkIG9ubHkgYmUgY2FsbGVkIHdoZW5cbiAqIHZhbHVlIHR5cGUgaXMgT2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqL1xuXG5PYnNlcnZlci5wcm90b3R5cGUud2FsayA9IGZ1bmN0aW9uIChvYmopIHtcbiAgZm9yIChsZXQga2V5IGluIG9iaikge1xuICAgIHRoaXMuY29udmVydChrZXksIG9ialtrZXldKVxuICB9XG59XG5cbi8qKlxuICogT2JzZXJ2ZSBhIGxpc3Qgb2YgQXJyYXkgaXRlbXMuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gaXRlbXNcbiAqL1xuXG5PYnNlcnZlci5wcm90b3R5cGUub2JzZXJ2ZUFycmF5ID0gZnVuY3Rpb24gKGl0ZW1zKSB7XG4gIGZvciAobGV0IGkgPSAwLCBsID0gaXRlbXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgb2JzZXJ2ZShpdGVtc1tpXSlcbiAgfVxufVxuXG4vKipcbiAqIENvbnZlcnQgYSBwcm9wZXJ0eSBpbnRvIGdldHRlci9zZXR0ZXIgc28gd2UgY2FuIGVtaXRcbiAqIHRoZSBldmVudHMgd2hlbiB0aGUgcHJvcGVydHkgaXMgYWNjZXNzZWQvY2hhbmdlZC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gKiBAcGFyYW0geyp9IHZhbFxuICovXG5cbk9ic2VydmVyLnByb3RvdHlwZS5jb252ZXJ0ID0gZnVuY3Rpb24gKGtleSwgdmFsKSB7XG4gIGRlZmluZVJlYWN0aXZlKHRoaXMudmFsdWUsIGtleSwgdmFsKVxufVxuXG4vKipcbiAqIEFkZCBhbiBvd25lciB2bSwgc28gdGhhdCB3aGVuICRzZXQvJGRlbGV0ZSBtdXRhdGlvbnNcbiAqIGhhcHBlbiB3ZSBjYW4gbm90aWZ5IG93bmVyIHZtcyB0byBwcm94eSB0aGUga2V5cyBhbmRcbiAqIGRpZ2VzdCB0aGUgd2F0Y2hlcnMuIFRoaXMgaXMgb25seSBjYWxsZWQgd2hlbiB0aGUgb2JqZWN0XG4gKiBpcyBvYnNlcnZlZCBhcyBhbiBpbnN0YW5jZSdzIHJvb3QgJGRhdGEuXG4gKlxuICogQHBhcmFtIHtWdWV9IHZtXG4gKi9cblxuT2JzZXJ2ZXIucHJvdG90eXBlLmFkZFZtID0gZnVuY3Rpb24gKHZtKSB7XG4gICh0aGlzLnZtcyB8fCAodGhpcy52bXMgPSBbXSkpLnB1c2godm0pXG59XG5cbi8qKlxuICogUmVtb3ZlIGFuIG93bmVyIHZtLiBUaGlzIGlzIGNhbGxlZCB3aGVuIHRoZSBvYmplY3QgaXNcbiAqIHN3YXBwZWQgb3V0IGFzIGFuIGluc3RhbmNlJ3MgJGRhdGEgb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7VnVlfSB2bVxuICovXG5cbk9ic2VydmVyLnByb3RvdHlwZS5yZW1vdmVWbSA9IGZ1bmN0aW9uICh2bSkge1xuICByZW1vdmUodGhpcy52bXMsIHZtKVxufVxuXG4vLyBoZWxwZXJzXG5cbi8qKlxuICogQXVnbWVudCBhbiB0YXJnZXQgT2JqZWN0IG9yIEFycmF5IGJ5IGludGVyY2VwdGluZ1xuICogdGhlIHByb3RvdHlwZSBjaGFpbiB1c2luZyBfX3Byb3RvX19cbiAqXG4gKiBAcGFyYW0ge09iamVjdHxBcnJheX0gdGFyZ2V0XG4gKiBAcGFyYW0ge09iamVjdH0gc3JjXG4gKi9cblxuZnVuY3Rpb24gcHJvdG9BdWdtZW50ICh0YXJnZXQsIHNyYykge1xuICAvKiBlc2xpbnQtZGlzYWJsZSBuby1wcm90byAqL1xuICB0YXJnZXQuX19wcm90b19fID0gc3JjXG4gIC8qIGVzbGludC1lbmFibGUgbm8tcHJvdG8gKi9cbn1cblxuLyoqXG4gKiBBdWdtZW50IGFuIHRhcmdldCBPYmplY3Qgb3IgQXJyYXkgYnkgZGVmaW5pbmdcbiAqIGhpZGRlbiBwcm9wZXJ0aWVzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fSB0YXJnZXRcbiAqIEBwYXJhbSB7T2JqZWN0fSBwcm90b1xuICovXG5cbmZ1bmN0aW9uIGNvcHlBdWdtZW50ICh0YXJnZXQsIHNyYywga2V5cykge1xuICBmb3IgKGxldCBpID0gMCwgbCA9IGtleXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgY29uc3Qga2V5ID0ga2V5c1tpXVxuICAgIGRlZih0YXJnZXQsIGtleSwgc3JjW2tleV0pXG4gIH1cbn1cblxuLyoqXG4gKiBBdHRlbXB0IHRvIGNyZWF0ZSBhbiBvYnNlcnZlciBpbnN0YW5jZSBmb3IgYSB2YWx1ZSxcbiAqIHJldHVybnMgdGhlIG5ldyBvYnNlcnZlciBpZiBzdWNjZXNzZnVsbHkgb2JzZXJ2ZWQsXG4gKiBvciB0aGUgZXhpc3Rpbmcgb2JzZXJ2ZXIgaWYgdGhlIHZhbHVlIGFscmVhZHkgaGFzIG9uZS5cbiAqXG4gKiBAcGFyYW0geyp9IHZhbHVlXG4gKiBAcGFyYW0ge1Z1ZX0gW3ZtXVxuICogQHJldHVybiB7T2JzZXJ2ZXJ8dW5kZWZpbmVkfVxuICogQHN0YXRpY1xuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBvYnNlcnZlICh2YWx1ZSwgdm0pIHtcbiAgaWYgKCFpc09iamVjdCh2YWx1ZSkpIHtcbiAgICByZXR1cm5cbiAgfVxuICBsZXQgb2JcbiAgaWYgKGhhc093bih2YWx1ZSwgJ19fb2JfXycpICYmIHZhbHVlLl9fb2JfXyBpbnN0YW5jZW9mIE9ic2VydmVyKSB7XG4gICAgb2IgPSB2YWx1ZS5fX29iX19cbiAgfSBlbHNlIGlmIChcbiAgICAoaXNBcnJheSh2YWx1ZSkgfHwgaXNQbGFpbk9iamVjdCh2YWx1ZSkpICYmXG4gICAgT2JqZWN0LmlzRXh0ZW5zaWJsZSh2YWx1ZSkgJiZcbiAgICAhdmFsdWUuX2lzVnVlXG4gICkge1xuICAgIG9iID0gbmV3IE9ic2VydmVyKHZhbHVlKVxuICB9XG4gIGlmIChvYiAmJiB2bSkge1xuICAgIG9iLmFkZFZtKHZtKVxuICB9XG4gIHJldHVybiBvYlxufVxuXG4vKipcbiAqIERlZmluZSBhIHJlYWN0aXZlIHByb3BlcnR5IG9uIGFuIE9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gKiBAcGFyYW0geyp9IHZhbFxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBkZWZpbmVSZWFjdGl2ZSAob2JqLCBrZXksIHZhbCkge1xuICBjb25zdCBkZXAgPSBuZXcgRGVwKClcblxuICBjb25zdCBwcm9wZXJ0eSA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrZXkpXG4gIGlmIChwcm9wZXJ0eSAmJiBwcm9wZXJ0eS5jb25maWd1cmFibGUgPT09IGZhbHNlKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICAvLyBjYXRlciBmb3IgcHJlLWRlZmluZWQgZ2V0dGVyL3NldHRlcnNcbiAgY29uc3QgZ2V0dGVyID0gcHJvcGVydHkgJiYgcHJvcGVydHkuZ2V0XG4gIGNvbnN0IHNldHRlciA9IHByb3BlcnR5ICYmIHByb3BlcnR5LnNldFxuXG4gIGxldCBjaGlsZE9iID0gb2JzZXJ2ZSh2YWwpXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24gcmVhY3RpdmVHZXR0ZXIgKCkge1xuICAgICAgY29uc3QgdmFsdWUgPSBnZXR0ZXIgPyBnZXR0ZXIuY2FsbChvYmopIDogdmFsXG4gICAgICBpZiAoRGVwLnRhcmdldCkge1xuICAgICAgICBkZXAuZGVwZW5kKClcbiAgICAgICAgaWYgKGNoaWxkT2IpIHtcbiAgICAgICAgICBjaGlsZE9iLmRlcC5kZXBlbmQoKVxuICAgICAgICB9XG4gICAgICAgIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgIGZvciAobGV0IGUsIGkgPSAwLCBsID0gdmFsdWUubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBlID0gdmFsdWVbaV1cbiAgICAgICAgICAgIGUgJiYgZS5fX29iX18gJiYgZS5fX29iX18uZGVwLmRlcGVuZCgpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdmFsdWVcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24gcmVhY3RpdmVTZXR0ZXIgKG5ld1ZhbCkge1xuICAgICAgY29uc3QgdmFsdWUgPSBnZXR0ZXIgPyBnZXR0ZXIuY2FsbChvYmopIDogdmFsXG4gICAgICBpZiAobmV3VmFsID09PSB2YWx1ZSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGlmIChzZXR0ZXIpIHtcbiAgICAgICAgc2V0dGVyLmNhbGwob2JqLCBuZXdWYWwpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWwgPSBuZXdWYWxcbiAgICAgIH1cbiAgICAgIGNoaWxkT2IgPSBvYnNlcnZlKG5ld1ZhbClcbiAgICAgIGRlcC5ub3RpZnkoKVxuICAgIH1cbiAgfSlcbn1cblxuLyoqXG4gKiBTZXQgYSBwcm9wZXJ0eSBvbiBhbiBvYmplY3QuIEFkZHMgdGhlIG5ldyBwcm9wZXJ0eSBhbmRcbiAqIHRyaWdnZXJzIGNoYW5nZSBub3RpZmljYXRpb24gaWYgdGhlIHByb3BlcnR5IGRvZXNuJ3RcbiAqIGFscmVhZHkgZXhpc3QuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICogQHBhcmFtIHsqfSB2YWxcbiAqIEBwdWJsaWNcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0IChvYmosIGtleSwgdmFsKSB7XG4gIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICByZXR1cm4gb2JqLnNwbGljZShrZXksIDEsIHZhbClcbiAgfVxuICBpZiAoaGFzT3duKG9iaiwga2V5KSkge1xuICAgIG9ialtrZXldID0gdmFsXG4gICAgcmV0dXJuXG4gIH1cbiAgaWYgKG9iai5faXNWdWUpIHtcbiAgICBzZXQob2JqLl9kYXRhLCBrZXksIHZhbClcbiAgICByZXR1cm5cbiAgfVxuICBjb25zdCBvYiA9IG9iai5fX29iX19cbiAgaWYgKCFvYikge1xuICAgIG9ialtrZXldID0gdmFsXG4gICAgcmV0dXJuXG4gIH1cbiAgb2IuY29udmVydChrZXksIHZhbClcbiAgb2IuZGVwLm5vdGlmeSgpXG4gIGlmIChvYi52bXMpIHtcbiAgICBsZXQgaSA9IG9iLnZtcy5sZW5ndGhcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICBjb25zdCB2bSA9IG9iLnZtc1tpXVxuICAgICAgcHJveHkodm0sIGtleSlcbiAgICAgIHZtLiRmb3JjZVVwZGF0ZSgpXG4gICAgfVxuICB9XG4gIHJldHVybiB2YWxcbn1cblxuLyoqXG4gKiBEZWxldGUgYSBwcm9wZXJ0eSBhbmQgdHJpZ2dlciBjaGFuZ2UgaWYgbmVjZXNzYXJ5LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZGVsIChvYmosIGtleSkge1xuICBpZiAoIWhhc093bihvYmosIGtleSkpIHtcbiAgICByZXR1cm5cbiAgfVxuICBkZWxldGUgb2JqW2tleV1cbiAgY29uc3Qgb2IgPSBvYmouX19vYl9fXG5cbiAgaWYgKCFvYikge1xuICAgIGlmIChvYmouX2lzVnVlKSB7XG4gICAgICBkZWxldGUgb2JqLl9kYXRhW2tleV1cbiAgICAgIG9iai4kZm9yY2VVcGRhdGUoKVxuICAgIH1cbiAgICByZXR1cm5cbiAgfVxuICBvYi5kZXAubm90aWZ5KClcbiAgaWYgKG9iLnZtcykge1xuICAgIGxldCBpID0gb2Iudm1zLmxlbmd0aFxuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIGNvbnN0IHZtID0gb2Iudm1zW2ldXG4gICAgICB1bnByb3h5KHZtLCBrZXkpXG4gICAgICB2bS4kZm9yY2VVcGRhdGUoKVxuICAgIH1cbiAgfVxufVxuXG5jb25zdCBLRVlfV09SRFMgPSBbJyRpbmRleCcsICckdmFsdWUnLCAnJGV2ZW50J11cbmV4cG9ydCBmdW5jdGlvbiBwcm94eSAodm0sIGtleSkge1xuICBpZiAoS0VZX1dPUkRTLmluZGV4T2Yoa2V5KSA+IC0xIHx8ICFpc1Jlc2VydmVkKGtleSkpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodm0sIGtleSwge1xuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGdldDogZnVuY3Rpb24gcHJveHlHZXR0ZXIgKCkge1xuICAgICAgICByZXR1cm4gdm0uX2RhdGFba2V5XVxuICAgICAgfSxcbiAgICAgIHNldDogZnVuY3Rpb24gcHJveHlTZXR0ZXIgKHZhbCkge1xuICAgICAgICB2bS5fZGF0YVtrZXldID0gdmFsXG4gICAgICB9XG4gICAgfSlcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdW5wcm94eSAodm0sIGtleSkge1xuICBpZiAoIWlzUmVzZXJ2ZWQoa2V5KSkge1xuICAgIGRlbGV0ZSB2bVtrZXldXG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC9Vc2Vycy96aGFvamluamlhbmcvU2l0ZXMvcHVibGljL3dlZXgvc3JjL2pzLWZyYW1ld29yay9saWIvdm0vY29yZS9vYnNlcnZlci5qc1xuICoqLyIsImltcG9ydCB7IGRlZiB9IGZyb20gJy4uLy4uL3V0aWwvaW5kZXgnXG5cbmNvbnN0IGFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGVcbmV4cG9ydCBjb25zdCBhcnJheU1ldGhvZHMgPSBPYmplY3QuY3JlYXRlKGFycmF5UHJvdG8pXG5cbi8qKlxuICogSW50ZXJjZXB0IG11dGF0aW5nIG1ldGhvZHMgYW5kIGVtaXQgZXZlbnRzXG4gKi9cblxuO1tcbiAgJ3B1c2gnLFxuICAncG9wJyxcbiAgJ3NoaWZ0JyxcbiAgJ3Vuc2hpZnQnLFxuICAnc3BsaWNlJyxcbiAgJ3NvcnQnLFxuICAncmV2ZXJzZSdcbl1cbi5mb3JFYWNoKGZ1bmN0aW9uIChtZXRob2QpIHtcbiAgLy8gY2FjaGUgb3JpZ2luYWwgbWV0aG9kXG4gIGNvbnN0IG9yaWdpbmFsID0gYXJyYXlQcm90b1ttZXRob2RdXG4gIGRlZihhcnJheU1ldGhvZHMsIG1ldGhvZCwgZnVuY3Rpb24gbXV0YXRvciAoKSB7XG4gICAgLy8gYXZvaWQgbGVha2luZyBhcmd1bWVudHM6XG4gICAgLy8gaHR0cDovL2pzcGVyZi5jb20vY2xvc3VyZS13aXRoLWFyZ3VtZW50c1xuICAgIGxldCBpID0gYXJndW1lbnRzLmxlbmd0aFxuICAgIGNvbnN0IGFyZ3MgPSBuZXcgQXJyYXkoaSlcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2ldXG4gICAgfVxuICAgIGNvbnN0IHJlc3VsdCA9IG9yaWdpbmFsLmFwcGx5KHRoaXMsIGFyZ3MpXG4gICAgY29uc3Qgb2IgPSB0aGlzLl9fb2JfX1xuICAgIGxldCBpbnNlcnRlZFxuICAgIHN3aXRjaCAobWV0aG9kKSB7XG4gICAgICBjYXNlICdwdXNoJzpcbiAgICAgICAgaW5zZXJ0ZWQgPSBhcmdzXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICd1bnNoaWZ0JzpcbiAgICAgICAgaW5zZXJ0ZWQgPSBhcmdzXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICdzcGxpY2UnOlxuICAgICAgICBpbnNlcnRlZCA9IGFyZ3Muc2xpY2UoMilcbiAgICAgICAgYnJlYWtcbiAgICB9XG4gICAgaWYgKGluc2VydGVkKSBvYi5vYnNlcnZlQXJyYXkoaW5zZXJ0ZWQpXG4gICAgLy8gbm90aWZ5IGNoYW5nZVxuICAgIG9iLmRlcC5ub3RpZnkoKVxuICAgIHJldHVybiByZXN1bHRcbiAgfSlcbn0pXG5cbi8qKlxuICogU3dhcCB0aGUgZWxlbWVudCBhdCB0aGUgZ2l2ZW4gaW5kZXggd2l0aCBhIG5ldyB2YWx1ZVxuICogYW5kIGVtaXRzIGNvcnJlc3BvbmRpbmcgZXZlbnQuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4XG4gKiBAcGFyYW0geyp9IHZhbFxuICogQHJldHVybiB7Kn0gLSByZXBsYWNlZCBlbGVtZW50XG4gKi9cblxuZGVmKFxuICBhcnJheVByb3RvLFxuICAnJHNldCcsXG4gIGZ1bmN0aW9uICRzZXQgKGluZGV4LCB2YWwpIHtcbiAgICBpZiAoaW5kZXggPj0gdGhpcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubGVuZ3RoID0gaW5kZXggKyAxXG4gICAgfVxuICAgIHJldHVybiB0aGlzLnNwbGljZShpbmRleCwgMSwgdmFsKVswXVxuICB9XG4pXG5cbi8qKlxuICogQ29udmVuaWVuY2UgbWV0aG9kIHRvIHJlbW92ZSB0aGUgZWxlbWVudCBhdCBnaXZlbiBpbmRleC5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gaW5kZXhcbiAqIEBwYXJhbSB7Kn0gdmFsXG4gKi9cblxuZGVmKFxuICBhcnJheVByb3RvLFxuICAnJHJlbW92ZScsXG4gIGZ1bmN0aW9uICRyZW1vdmUgKGluZGV4KSB7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKCF0aGlzLmxlbmd0aCkgcmV0dXJuXG4gICAgaWYgKHR5cGVvZiBpbmRleCAhPT0gJ251bWJlcicpIHtcbiAgICAgIGluZGV4ID0gdGhpcy5pbmRleE9mKGluZGV4KVxuICAgIH1cbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgdGhpcy5zcGxpY2UoaW5kZXgsIDEpXG4gICAgfVxuICB9XG4pXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAvVXNlcnMvemhhb2ppbmppYW5nL1NpdGVzL3B1YmxpYy93ZWV4L3NyYy9qcy1mcmFtZXdvcmsvbGliL3ZtL2NvcmUvYXJyYXkuanNcbiAqKi8iLCIvKipcbiAqIEBmaWxlT3ZlcnZpZXdcbiAqIFZpZXdNb2RlbCB0ZW1wbGF0ZSBwYXJzZXIgJiBkYXRhLWJpbmRpbmcgcHJvY2Vzc1xuICpcbiAqIHJlcXVpcmVkOlxuICogaW5kZXguanM6IFZtXG4gKiBkb20taGVscGVyLmpzOiBfY3JlYXRlRWxlbWVudCwgX2NyZWF0ZUJsb2NrXG4gKiBkb20taGVscGVyLmpzOiBfYXR0YWNoVGFyZ2V0LCBfbW92ZVRhcmdldCwgX3JlbW92ZVRhcmdldFxuICogZGlyZWN0aXZlLmpzOiBfYmluZEVsZW1lbnQsIF9iaW5kU3ViVm0sIF93YXRjaFxuICogZXZlbnRzLmpzOiAkb25cbiAqL1xuXG5pbXBvcnQgKiBhcyBfIGZyb20gJy4uL3V0aWwvaW5kZXgnXG5cbi8qKlxuICogYnVpbGQoZXh0ZXJuYWxEaXJzKVxuICogICBjcmVhdGVWbSgpXG4gKiAgIG1lcmdlKGV4dGVybmFsRGlycywgZGlycylcbiAqICAgY29tcGlsZSh0ZW1wbGF0ZSwgcGFyZW50Tm9kZSlcbiAqICAgICBpZiAodHlwZSBpcyBjb250ZW50KSBjcmVhdGUgY29udGVudE5vZGVcbiAqICAgICBlbHNlIGlmIChkaXJzIGhhdmUgdi1mb3IpIGZvcmVhY2ggLT4gY3JlYXRlIGNvbnRleHRcbiAqICAgICAgIC0+IGNvbXBpbGUodGVtcGxhdGVXaXRob3V0Rm9yLCBwYXJlbnROb2RlKTogZGlmZihsaXN0KSBvbmNoYW5nZVxuICogICAgIGVsc2UgaWYgKGRpcnMgaGF2ZSB2LWlmKSBhc3NlcnRcbiAqICAgICAgIC0+IGNvbXBpbGUodGVtcGxhdGVXaXRob3V0SWYsIHBhcmVudE5vZGUpOiB0b2dnbGUoc2hvd24pIG9uY2hhbmdlXG4gKiAgICAgZWxzZSBpZiAodHlwZSBpcyBuYXRpdmUpXG4gKiAgICAgICBzZXQoZGlycyk6IHVwZGF0ZShpZC9hdHRyL3N0eWxlL2NsYXNzKSBvbmNoYW5nZVxuICogICAgICAgYXBwZW5kKHRlbXBsYXRlLCBwYXJlbnROb2RlKVxuICogICAgICAgZm9yZWFjaCBjaGlsZE5vZGVzIC0+IGNvbXBpbGUoY2hpbGROb2RlLCB0ZW1wbGF0ZSlcbiAqICAgICBlbHNlIGlmICh0eXBlIGlzIGN1c3RvbSlcbiAqICAgICAgIGFkZENoaWxkVm0odm0sIHBhcmVudFZtKVxuICogICAgICAgYnVpbGQoZXh0ZXJuYWxEaXJzKVxuICogICAgICAgZm9yZWFjaCBjaGlsZE5vZGVzIC0+IGNvbXBpbGUoY2hpbGROb2RlLCB0ZW1wbGF0ZSlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9idWlsZCgpIHtcbiAgY29uc3Qgb3B0ID0gdGhpcy5fb3B0aW9ucyB8fCB7fVxuICBjb25zdCB0ZW1wbGF0ZSA9IG9wdC50ZW1wbGF0ZSB8fCB7fVxuXG4gIGlmIChvcHQucmVwbGFjZSkge1xuICAgIGlmICh0ZW1wbGF0ZS5jaGlsZHJlbiAmJiB0ZW1wbGF0ZS5jaGlsZHJlbi5sZW5ndGggPT09IDEpIHtcbiAgICAgIHRoaXMuX2NvbXBpbGUodGVtcGxhdGUuY2hpbGRyZW5bMF0sIHRoaXMuX3BhcmVudEVsKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuX2NvbXBpbGUodGVtcGxhdGUuY2hpbGRyZW4sIHRoaXMuX3BhcmVudEVsKVxuICAgIH1cbiAgfVxuICBlbHNlIHtcbiAgICB0aGlzLl9jb21waWxlKHRlbXBsYXRlLCB0aGlzLl9wYXJlbnRFbClcbiAgfVxuXG4gIF8uZGVidWcoYFwicmVhZHlcIiBsaWZlY3ljbGUgaW4gVm0oJHt0aGlzLl90eXBlfSlgKVxuICB0aGlzLiRlbWl0KCdob29rOnJlYWR5JylcbiAgdGhpcy5fcmVhZHkgPSB0cnVlXG59XG5cbi8qKlxuICogR2VuZXJhdGUgZWxlbWVudHMgYnkgY2hpbGQgb3IgY2hpbGRyZW4gYW5kIGFwcGVuZCB0byBwYXJlbnQgZWxlbWVudHMuXG4gKiBSb290IGVsZW1lbnQgaW5mbyB3b3VsZCBiZSBtZXJnZWQgaWYgaGFzLiBUaGUgZmlyc3QgYXJndW1lbnQgbWF5IGJlIGFuIGFycmF5XG4gKiBpZiB0aGUgcm9vdCBlbGVtZW50IHdpdGggb3B0aW9ucy5yZXBsYWNlIGhhcyBub3Qgb25seSBvbmUgY2hpbGQuXG4gKlxuICogQHBhcmFtIHtvYmplY3R8YXJyYXl9IHRhcmdldFxuICogQHBhcmFtIHtvYmplY3R9ICAgICAgIGRlc3RcbiAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICBtZXRhXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfY29tcGlsZSh0YXJnZXQsIGRlc3QsIG1ldGEpIHtcbiAgbGV0IGNvbnRleHQgPSB0aGlzXG4gIGlmIChjb250ZXh0Ll90YXJnZXRJc0ZyYWdtZW50KHRhcmdldCkpIHtcbiAgICBjb250ZXh0Ll9jb21waWxlRnJhZ21lbnQodGFyZ2V0LCBkZXN0LCBtZXRhKVxuICAgIHJldHVyblxuICB9XG4gIG1ldGEgPSBtZXRhIHx8IHt9XG4gIGlmIChjb250ZXh0Ll90YXJnZXRJc0NvbnRlbnQodGFyZ2V0KSkge1xuICAgIF8uZGVidWcoJ2NvbXBpbGUgXCJjb250ZW50XCIgYmxvY2sgYnknLCB0YXJnZXQpXG4gICAgY29udGV4dC5fY29udGVudCA9IGNvbnRleHQuX2NyZWF0ZUJsb2NrKGRlc3QpXG4gICAgcmV0dXJuXG4gIH1cblxuICBpZiAoY29udGV4dC5fdGFyZ2V0TmVlZENoZWNrUmVwZWF0KHRhcmdldCwgbWV0YSkpIHtcbiAgICBfLmRlYnVnKCdjb21waWxlIFwicmVwZWF0XCIgbG9naWMgYnknLCB0YXJnZXQpXG4gICAgY29udGV4dC5fY29tcGlsZVJlcGVhdCh0YXJnZXQsIGRlc3QpXG4gICAgcmV0dXJuXG4gIH1cbiAgaWYgKGNvbnRleHQuX3RhcmdldE5lZWRDaGVja1Nob3duKHRhcmdldCwgbWV0YSkpIHtcbiAgICBfLmRlYnVnKCdjb21waWxlIFwiaWZcIiBsb2dpYyBieScsIHRhcmdldClcbiAgICBjb250ZXh0Ll9jb21waWxlU2hvd24odGFyZ2V0LCBkZXN0LCBtZXRhKVxuICAgIHJldHVyblxuICB9XG4gIGNvbnN0IHR5cGVHZXR0ZXIgPSBtZXRhLnR5cGUgfHwgdGFyZ2V0LnR5cGVcbiAgaWYgKGNvbnRleHQuX3RhcmdldE5lZWRDaGVja1R5cGUodHlwZUdldHRlciwgbWV0YSkpIHtcbiAgICBjb250ZXh0Ll9jb21waWxlVHlwZSh0YXJnZXQsIGRlc3QsIHR5cGVHZXR0ZXIsIG1ldGEpXG4gICAgcmV0dXJuXG4gIH1cbiAgY29uc3QgdHlwZSA9IHR5cGVHZXR0ZXJcbiAgY29uc3QgY29tcG9uZW50ID0gY29udGV4dC5fdGFyZ2V0SXNDb21wb3NlZCh0YXJnZXQsIHR5cGUpXG4gIGlmIChjb21wb25lbnQpIHtcbiAgICBfLmRlYnVnKCdjb21waWxlIGNvbXBvc2VkIGNvbXBvbmVudCBieScsIHRhcmdldClcbiAgICBjb250ZXh0Ll9jb21waWxlQ3VzdG9tQ29tcG9uZW50KGNvbXBvbmVudCwgdGFyZ2V0LCBkZXN0LCB0eXBlLCBtZXRhKVxuICAgIHJldHVyblxuICB9XG4gIF8uZGVidWcoJ2NvbXBpbGUgbmF0aXZlIGNvbXBvbmVudCBieScsIHRhcmdldClcbiAgY29udGV4dC5fY29tcGlsZU5hdGl2ZUNvbXBvbmVudCh0YXJnZXQsIGRlc3QsIHR5cGUpXG59XG5cbi8qKlxuICogQ2hlY2sgaWYgdGFyZ2V0IGlzIGEgZnJhZ21lbnQgKGFuIGFycmF5KS5cbiAqXG4gKiBAcGFyYW0gIHtvYmplY3R9ICB0YXJnZXRcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfdGFyZ2V0SXNGcmFnbWVudCh0YXJnZXQpIHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkodGFyZ2V0KVxufVxuXG4vKipcbiAqIENoZWNrIGlmIHRhcmdldCB0eXBlIGlzIGNvbnRlbnQvc2xvdC5cbiAqXG4gKiBAcGFyYW0gIHtvYmplY3R9ICB0YXJnZXRcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfdGFyZ2V0SXNDb250ZW50KHRhcmdldCkge1xuICByZXR1cm4gdGFyZ2V0LnR5cGUgPT09ICdjb250ZW50JyB8fCB0YXJnZXQudHlwZSA9PT0gJ3Nsb3QnXG59XG5cbi8qKlxuICogQ2hlY2sgaWYgdGFyZ2V0IG5lZWQgdG8gY29tcGlsZSBieSBhIGxpc3QuXG4gKlxuICogQHBhcmFtICB7b2JqZWN0fSAgdGFyZ2V0XG4gKiBAcGFyYW0gIHtvYmplY3R9ICBtZXRhXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gX3RhcmdldE5lZWRDaGVja1JlcGVhdCh0YXJnZXQsIG1ldGEpIHtcbiAgcmV0dXJuICFtZXRhLmhhc093blByb3BlcnR5KCdyZXBlYXQnKSAmJiB0YXJnZXQucmVwZWF0XG59XG5cbi8qKlxuICogQ2hlY2sgaWYgdGFyZ2V0IG5lZWQgdG8gY29tcGlsZSBieSBhIGJvb2xlYW4gdmFsdWUuXG4gKlxuICogQHBhcmFtICB7b2JqZWN0fSAgdGFyZ2V0XG4gKiBAcGFyYW0gIHtvYmplY3R9ICBtZXRhXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gX3RhcmdldE5lZWRDaGVja1Nob3duKHRhcmdldCwgbWV0YSkge1xuICByZXR1cm4gIW1ldGEuaGFzT3duUHJvcGVydHkoJ3Nob3duJykgJiYgdGFyZ2V0LnNob3duXG59XG5cbi8qKlxuICogQ2hlY2sgaWYgdGFyZ2V0IG5lZWQgdG8gY29tcGlsZSBieSBhIGR5bmFtaWMgdHlwZS5cbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd8ZnVuY3Rpb259IHR5cGVHZXR0ZXJcbiAqIEBwYXJhbSAge29iamVjdH0gICAgICAgICAgbWV0YVxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF90YXJnZXROZWVkQ2hlY2tUeXBlKHR5cGVHZXR0ZXIsIG1ldGEpIHtcbiAgcmV0dXJuICh0eXBlb2YgdHlwZUdldHRlciA9PT0gJ2Z1bmN0aW9uJykgJiYgIW1ldGEuaGFzT3duUHJvcGVydHkoJ3R5cGUnKVxufVxuXG4vKipcbiAqIENoZWNrIGlmIHRoaXMga2luZCBvZiBjb21wb25lbnQgaXMgY29tcG9zZWQuXG4gKlxuICogQHBhcmFtICB7c3RyaW5nfSAgdHlwZVxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF90YXJnZXRJc0NvbXBvc2VkKHRhcmdldCwgdHlwZSkge1xuICBsZXQgY29tcG9uZW50XG4gIGlmICh0aGlzLl9hcHAgJiYgdGhpcy5fYXBwLmN1c3RvbUNvbXBvbmVudE1hcCkge1xuICAgIGNvbXBvbmVudCA9IHRoaXMuX2FwcC5jdXN0b21Db21wb25lbnRNYXBbdHlwZV1cbiAgfVxuICBpZiAodGhpcy5fb3B0aW9ucyAmJiB0aGlzLl9vcHRpb25zLmNvbXBvbmVudHMpIHtcbiAgICBjb21wb25lbnQgPSB0aGlzLl9vcHRpb25zLmNvbXBvbmVudHNbdHlwZV1cbiAgfVxuICBpZiAodGFyZ2V0LmNvbXBvbmVudCkge1xuICAgIGNvbXBvbmVudCA9IGNvbXBvbmVudCB8fCB7fVxuICB9XG4gIHJldHVybiBjb21wb25lbnRcbn1cblxuLyoqXG4gKiBDb21waWxlIGEgbGlzdCBvZiB0YXJnZXRzLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSB0YXJnZXRcbiAqIEBwYXJhbSB7b2JqZWN0fSBkZXN0XG4gKiBAcGFyYW0ge29iamVjdH0gbWV0YVxuICovXG5leHBvcnQgZnVuY3Rpb24gX2NvbXBpbGVGcmFnbWVudCh0YXJnZXQsIGRlc3QsIG1ldGEpIHtcbiAgY29uc3QgZnJhZ0Jsb2NrID0gdGhpcy5fY3JlYXRlQmxvY2soZGVzdClcbiAgdGFyZ2V0LmZvckVhY2goKGNoaWxkKSA9PiB7XG4gICAgdGhpcy5fY29tcGlsZShjaGlsZCwgZnJhZ0Jsb2NrLCBtZXRhKVxuICB9KVxufVxuXG4vKipcbiAqIENvbXBpbGUgYSB0YXJnZXQgd2l0aCByZXBlYXQgZGlyZWN0aXZlLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSB0YXJnZXRcbiAqIEBwYXJhbSB7b2JqZWN0fSBkZXN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfY29tcGlsZVJlcGVhdCh0YXJnZXQsIGRlc3QpIHtcbiAgY29uc3QgcmVwZWF0ID0gdGFyZ2V0LnJlcGVhdFxuICBjb25zdCBvbGRTdHlsZSA9IHR5cGVvZiByZXBlYXQgPT09ICdmdW5jdGlvbidcbiAgbGV0IGdldHRlciA9IHJlcGVhdC5nZXR0ZXIgfHwgcmVwZWF0LmV4cHJlc3Npb24gfHwgcmVwZWF0XG4gIGlmICh0eXBlb2YgZ2V0dGVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgZ2V0dGVyID0gZnVuY3Rpb24gKCkge3JldHVybiBbXX1cbiAgfVxuICBjb25zdCBrZXkgPSByZXBlYXQua2V5IHx8ICckaW5kZXgnXG4gIGNvbnN0IHZhbHVlID0gcmVwZWF0LnZhbHVlIHx8ICckdmFsdWUnXG4gIGNvbnN0IHRyYWNrQnkgPSByZXBlYXQudHJhY2tCeSB8fCB0YXJnZXQudHJhY2tCeSB8fFxuICAgICh0YXJnZXQuYXR0ciAmJiB0YXJnZXQuYXR0ci50cmFja0J5KVxuXG4gIGNvbnN0IGZyYWdCbG9jayA9IHRoaXMuX2NyZWF0ZUJsb2NrKGRlc3QpXG4gIGZyYWdCbG9jay5jaGlsZHJlbiA9IFtdXG4gIGZyYWdCbG9jay5kYXRhID0gW11cbiAgZnJhZ0Jsb2NrLnZtcyA9IFtdXG5cbiAgdGhpcy5fYmluZFJlcGVhdCh0YXJnZXQsIGZyYWdCbG9jaywge2dldHRlciwga2V5LCB2YWx1ZSwgdHJhY2tCeSwgb2xkU3R5bGV9KVxufVxuXG4vKipcbiAqIENvbXBpbGUgYSB0YXJnZXQgd2l0aCBpZiBkaXJlY3RpdmUuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHRhcmdldFxuICogQHBhcmFtIHtvYmplY3R9IGRlc3RcbiAqIEBwYXJhbSB7b2JqZWN0fSBtZXRhXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfY29tcGlsZVNob3duKHRhcmdldCwgZGVzdCwgbWV0YSkge1xuICBjb25zdCBuZXdNZXRhID0ge3Nob3duOiB0cnVlfVxuICBjb25zdCBmcmFnQmxvY2sgPSB0aGlzLl9jcmVhdGVCbG9jayhkZXN0KVxuXG4gIGlmIChkZXN0LmVsZW1lbnQgJiYgZGVzdC5jaGlsZHJlbikge1xuICAgIGRlc3QuY2hpbGRyZW4ucHVzaChmcmFnQmxvY2spXG4gIH1cblxuICBpZiAobWV0YS5yZXBlYXQpIHtcbiAgICBuZXdNZXRhLnJlcGVhdCA9IG1ldGEucmVwZWF0XG4gIH1cblxuICB0aGlzLl9iaW5kU2hvd24odGFyZ2V0LCBmcmFnQmxvY2ssIG5ld01ldGEpXG59XG5cbi8qKlxuICogQ29tcGlsZSBhIHRhcmdldCB3aXRoIGR5bmFtaWMgY29tcG9uZW50IHR5cGUuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9ICAgdGFyZ2V0XG4gKiBAcGFyYW0ge29iamVjdH0gICBkZXN0XG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSB0eXBlR2V0dGVyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfY29tcGlsZVR5cGUodGFyZ2V0LCBkZXN0LCB0eXBlR2V0dGVyLCBtZXRhKSB7XG4gIGNvbnN0IHR5cGUgPSB0eXBlR2V0dGVyLmNhbGwodGhpcylcbiAgY29uc3QgbmV3TWV0YSA9IE9iamVjdC5hc3NpZ24oe3R5cGV9LCBtZXRhKVxuICBjb25zdCBmcmFnQmxvY2sgPSB0aGlzLl9jcmVhdGVCbG9jayhkZXN0KVxuXG4gIGlmIChkZXN0LmVsZW1lbnQgJiYgZGVzdC5jaGlsZHJlbikge1xuICAgIGRlc3QuY2hpbGRyZW4ucHVzaChmcmFnQmxvY2spXG4gIH1cblxuICB0aGlzLl93YXRjaCh0eXBlR2V0dGVyLCAodmFsdWUpID0+IHtcbiAgICBjb25zdCBuZXdNZXRhID0gT2JqZWN0LmFzc2lnbih7dHlwZTogdmFsdWV9LCBtZXRhKVxuICAgIHRoaXMuX3JlbW92ZUJsb2NrKGZyYWdCbG9jaywgdHJ1ZSlcbiAgICB0aGlzLl9jb21waWxlKHRhcmdldCwgZnJhZ0Jsb2NrLCBuZXdNZXRhKVxuICB9KVxuXG4gIHRoaXMuX2NvbXBpbGUodGFyZ2V0LCBmcmFnQmxvY2ssIG5ld01ldGEpXG59XG5cbi8qKlxuICogQ29tcGlsZSBhIGNvbXBvc2VkIGNvbXBvbmVudC5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gdGFyZ2V0XG4gKiBAcGFyYW0ge29iamVjdH0gZGVzdFxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9jb21waWxlQ3VzdG9tQ29tcG9uZW50KGNvbXBvbmVudCwgdGFyZ2V0LCBkZXN0LCB0eXBlLCBtZXRhKSB7XG4gIGNvbnN0IFZtID0gdGhpcy5jb25zdHJ1Y3RvclxuICBjb25zdCBjb250ZXh0ID0gdGhpc1xuICBjb25zdCBzdWJWbSA9IG5ldyBWbSh0eXBlLCBjb21wb25lbnQsIGNvbnRleHQsIGRlc3QsIHVuZGVmaW5lZCwge1xuICAgICdob29rOmluaXQnOiBmdW5jdGlvbiAoKSB7XG4gICAgICBjb250ZXh0Ll9zZXRJZCh0YXJnZXQuaWQsIG51bGwsIHRoaXMpXG4gICAgICAvLyBiaW5kIHRlbXBsYXRlIGVhcmxpZXIgYmVjYXVzZSBvZiBsaWZlY3ljbGUgaXNzdWVzXG4gICAgICB0aGlzLl9leHRlcm5hbEJpbmRpbmcgPSB7XG4gICAgICAgIHBhcmVudDogY29udGV4dCxcbiAgICAgICAgdGVtcGxhdGU6IHRhcmdldFxuICAgICAgfVxuICAgIH0sXG4gICAgJ2hvb2s6Y3JlYXRlZCc6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnRleHQuX2JpbmRTdWJWbSh0aGlzLCB0YXJnZXQsIG1ldGEucmVwZWF0KVxuICAgIH0sXG4gICAgJ2hvb2s6cmVhZHknOiBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAodGhpcy5fY29udGVudCkge1xuICAgICAgICBjb250ZXh0Ll9jb21waWxlQ2hpbGRyZW4odGFyZ2V0LCB0aGlzLl9jb250ZW50KVxuICAgICAgfVxuICAgIH1cbiAgfSlcbiAgdGhpcy5fYmluZFN1YlZtQWZ0ZXJJbml0aWFsaXplZChzdWJWbSwgdGFyZ2V0KVxufVxuXG4vKipcbiAqIEdlbmVyYXRlIGVsZW1lbnQgZnJvbSB0ZW1wbGF0ZSBhbmQgYXR0YWNoIHRvIHRoZSBkZXN0IGlmIG5lZWRlZC5cbiAqIFRoZSB0aW1lIHRvIGF0dGFjaCBkZXBlbmRzIG9uIHdoZXRoZXIgdGhlIG1vZGUgc3RhdHVzIGlzIG5vZGUgb3IgdHJlZS5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gdGVtcGxhdGVcbiAqIEBwYXJhbSB7b2JqZWN0fSBkZXN0XG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICovXG5leHBvcnQgZnVuY3Rpb24gX2NvbXBpbGVOYXRpdmVDb21wb25lbnQodGVtcGxhdGUsIGRlc3QsIHR5cGUpIHtcblxuICB0aGlzLl9hcHBseU5haXR2ZUNvbXBvbmVudE9wdGlvbnModGVtcGxhdGUpXG5cbiAgbGV0IGVsZW1lbnRcbiAgaWYgKGRlc3QucmVmID09PSAnX2RvY3VtZW50RWxlbWVudCcpIHtcbiAgICAvLyBpZiBpdHMgcGFyZW50IGlzIGRvY3VtZW50RWxlbWVudCB0aGVuIGl0J3MgYSBib2R5XG4gICAgXy5kZWJ1ZygnY29tcGlsZSB0byBjcmVhdGUgYm9keSBmb3InLCB0eXBlKVxuICAgIGVsZW1lbnQgPSB0aGlzLl9jcmVhdGVCb2R5KHR5cGUpXG4gIH0gZWxzZSB7XG4gICAgXy5kZWJ1ZygnY29tcGlsZSB0byBjcmVhdGUgZWxlbWVudCBmb3InLCB0eXBlKVxuICAgIGVsZW1lbnQgPSB0aGlzLl9jcmVhdGVFbGVtZW50KHR5cGUpXG4gIH1cblxuICBpZiAoIXRoaXMuX3Jvb3RFbCkge1xuICAgIHRoaXMuX3Jvb3RFbCA9IGVsZW1lbnRcbiAgICAvLyBiaW5kIGV2ZW50IGVhcmxpZXIgYmVjYXVzZSBvZiBsaWZlY3ljbGUgaXNzdWVzXG4gICAgY29uc3QgYmluZGluZyA9IHRoaXMuX2V4dGVybmFsQmluZGluZyB8fCB7fVxuICAgIGNvbnN0IHRhcmdldCA9IGJpbmRpbmcudGVtcGxhdGVcbiAgICBjb25zdCB2bSA9IGJpbmRpbmcucGFyZW50XG4gICAgaWYgKHRhcmdldCAmJiB0YXJnZXQuZXZlbnRzICYmIHZtICYmIGVsZW1lbnQpIHtcbiAgICAgIGZvciAoY29uc3QgdHlwZSBpbiB0YXJnZXQuZXZlbnRzKSB7XG4gICAgICAgIGNvbnN0IGhhbmRsZXIgPSB2bVt0YXJnZXQuZXZlbnRzW3R5cGVdXVxuICAgICAgICBpZiAoaGFuZGxlcikge1xuICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnQodHlwZSwgXy5iaW5kKGhhbmRsZXIsIHZtKSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHRoaXMuX2JpbmRFbGVtZW50KGVsZW1lbnQsIHRlbXBsYXRlKVxuXG4gIGlmICh0ZW1wbGF0ZS5hdHRyICYmIHRlbXBsYXRlLmF0dHIuYXBwZW5kKSB7IC8vIGJhY2t3YXJkLCBhcHBlbmQgcHJvcCBpbiBhdHRyXG4gICAgdGVtcGxhdGUuYXBwZW5kID0gdGVtcGxhdGUuYXR0ci5hcHBlbmRcbiAgfVxuXG4gIGlmICh0ZW1wbGF0ZS5hcHBlbmQpIHsgLy8gZ2l2ZSB0aGUgYXBwZW5kIGF0dHJpYnV0ZSBmb3IgaW9zIGFkYXB0YXRpb25cbiAgICBlbGVtZW50LmF0dHIgPSBlbGVtZW50LmF0dHIgfHwge31cbiAgICBlbGVtZW50LmF0dHIuYXBwZW5kID0gdGVtcGxhdGUuYXBwZW5kXG4gIH1cblxuICBjb25zdCB0cmVlTW9kZSA9IHRlbXBsYXRlLmFwcGVuZCA9PT0gJ3RyZWUnXG4gIGlmICghdHJlZU1vZGUpIHtcbiAgICBfLmRlYnVnKCdjb21waWxlIHRvIGFwcGVuZCBzaW5nbGUgbm9kZSBmb3InLCBlbGVtZW50KVxuICAgIHRoaXMuX2F0dGFjaFRhcmdldChlbGVtZW50LCBkZXN0KVxuICB9XG4gIHRoaXMuX2NvbXBpbGVDaGlsZHJlbih0ZW1wbGF0ZSwgZWxlbWVudClcbiAgaWYgKHRyZWVNb2RlKSB7XG4gICAgXy5kZWJ1ZygnY29tcGlsZSB0byBhcHBlbmQgd2hvbGUgdHJlZSBmb3InLCBlbGVtZW50KVxuICAgIHRoaXMuX2F0dGFjaFRhcmdldChlbGVtZW50LCBkZXN0KVxuICB9XG59XG5cbi8qKlxuICogU2V0IGFsbCBjaGlsZHJlbiB0byBhIGNlcnRhaW4gcGFyZW50IGVsZW1lbnQuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHRlbXBsYXRlXG4gKiBAcGFyYW0ge29iamVjdH0gZGVzdFxuICovXG5leHBvcnQgZnVuY3Rpb24gX2NvbXBpbGVDaGlsZHJlbih0ZW1wbGF0ZSwgZGVzdCkge1xuICBjb25zdCBjaGlsZHJlbiA9IHRlbXBsYXRlLmNoaWxkcmVuXG4gIGlmIChjaGlsZHJlbiAmJiBjaGlsZHJlbi5sZW5ndGgpIHtcbiAgICBjaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgdGhpcy5fY29tcGlsZShjaGlsZCwgZGVzdClcbiAgICB9KVxuICB9XG59XG5cbi8qKlxuICogV2F0Y2ggdGhlIGxpc3QgdXBkYXRlIGFuZCByZWZyZXNoIHRoZSBjaGFuZ2VzLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSB0YXJnZXRcbiAqIEBwYXJhbSB7b2JqZWN0fSBmcmFnQmxvY2sge3ZtcywgZGF0YSwgY2hpbGRyZW59XG4gKiBAcGFyYW0ge29iamVjdH0gaW5mbyAgICAgIHtnZXR0ZXIsIGtleSwgdmFsdWUsIHRyYWNrQnksIG9sZFN0eWxlfVxuICovXG5leHBvcnQgZnVuY3Rpb24gX2JpbmRSZXBlYXQodGFyZ2V0LCBmcmFnQmxvY2ssIGluZm8pIHtcbiAgY29uc3Qgdm1zID0gZnJhZ0Jsb2NrLnZtc1xuICBjb25zdCBjaGlsZHJlbiA9IGZyYWdCbG9jay5jaGlsZHJlblxuICBjb25zdCB7Z2V0dGVyLCB0cmFja0J5LCBvbGRTdHlsZX0gPSBpbmZvXG4gIGNvbnN0IGtleU5hbWUgPSBpbmZvLmtleVxuICBjb25zdCB2YWx1ZU5hbWUgPSBpbmZvLnZhbHVlXG5cbiAgZnVuY3Rpb24gY29tcGlsZUl0ZW0oaXRlbSwgaW5kZXgsIGNvbnRleHQpIHtcbiAgICBsZXQgbWVyZ2VkRGF0YVxuICAgIGlmIChvbGRTdHlsZSkge1xuICAgICAgbWVyZ2VkRGF0YSA9IGl0ZW1cbiAgICAgIGlmICh0eXBlb2YgaXRlbSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgbWVyZ2VkRGF0YVtrZXlOYW1lXSA9IGluZGV4XG4gICAgICAgIGlmICghbWVyZ2VkRGF0YS5oYXNPd25Qcm9wZXJ0eSgnSU5ERVgnKSkge1xuICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtZXJnZWREYXRhLCAnSU5ERVgnLCB7XG4gICAgICAgICAgICB2YWx1ZTogKCkgPT4ge1xuICAgICAgICAgICAgICBfLndhcm4oJ1wiSU5ERVhcIiBpbiByZXBlYXQgaXMgZGVwcmVjYXRlZCwnICtcbiAgICAgICAgICAgICAgICAnIHBsZWFzZSB1c2UgXCIkaW5kZXhcIiBpbnN0ZWFkJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgbWVyZ2VkRGF0YSA9IHt9XG4gICAgICBtZXJnZWREYXRhW2tleU5hbWVdID0gaW5kZXhcbiAgICAgIG1lcmdlZERhdGFbdmFsdWVOYW1lXSA9IGl0ZW1cbiAgICB9XG4gICAgY29udGV4dCA9IGNvbnRleHQuX21lcmdlQ29udGV4dChtZXJnZWREYXRhKVxuICAgIHZtcy5wdXNoKGNvbnRleHQpXG4gICAgY29udGV4dC5fY29tcGlsZSh0YXJnZXQsIGZyYWdCbG9jaywge3JlcGVhdDogaXRlbX0pXG4gIH1cblxuICBjb25zdCBsaXN0ID0gdGhpcy5fd2F0Y2hCbG9jayhmcmFnQmxvY2ssIGdldHRlciwgJ3JlcGVhdCcsXG4gICAgKGRhdGEpID0+IHtcbiAgICAgIF8uZGVidWcoJ3RoZSBcInJlcGVhdFwiIGl0ZW0gaGFzIGNoYW5nZWQnLCBkYXRhKVxuICAgICAgaWYgKCFmcmFnQmxvY2spIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG9sZENoaWxkcmVuID0gY2hpbGRyZW4uc2xpY2UoKVxuICAgICAgY29uc3Qgb2xkVm1zID0gdm1zLnNsaWNlKClcbiAgICAgIGNvbnN0IG9sZERhdGEgPSBmcmFnQmxvY2suZGF0YS5zbGljZSgpXG4gICAgICAvLyAxLiBjb2xsZWN0IGFsbCBuZXcgcmVmcyB0cmFjayBieVxuICAgICAgY29uc3QgdHJhY2tNYXAgPSB7fVxuICAgICAgY29uc3QgcmV1c2VkTWFwID0ge31cbiAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgY29uc3Qga2V5ID0gdHJhY2tCeSA/IGl0ZW1bdHJhY2tCeV0gOiAob2xkU3R5bGUgPyBpdGVtW2tleU5hbWVdIDogaW5kZXgpXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICBpZiAoa2V5ID09IG51bGwgfHwga2V5ID09PSAnJykge1xuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIHRyYWNrTWFwW2tleV0gPSBpdGVtXG4gICAgICB9KVxuXG4gICAgICAvLyAyLiByZW1vdmUgdW51c2VkIGVsZW1lbnQgZm9yZWFjaCBvbGQgaXRlbVxuICAgICAgY29uc3QgcmV1c2VkTGlzdCA9IFtdXG4gICAgICBvbGREYXRhLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IGtleSA9IHRyYWNrQnkgPyBpdGVtW3RyYWNrQnldIDogKG9sZFN0eWxlID8gaXRlbVtrZXlOYW1lXSA6IGluZGV4KVxuICAgICAgICBpZiAodHJhY2tNYXAuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgIHJldXNlZE1hcFtrZXldID0ge1xuICAgICAgICAgICAgaXRlbSwgaW5kZXgsIGtleSxcbiAgICAgICAgICAgIHRhcmdldDogb2xkQ2hpbGRyZW5baW5kZXhdLFxuICAgICAgICAgICAgdm06IG9sZFZtc1tpbmRleF1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV1c2VkTGlzdC5wdXNoKGl0ZW0pXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdGhpcy5fcmVtb3ZlVGFyZ2V0KG9sZENoaWxkcmVuW2luZGV4XSlcbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgICAgLy8gMy4gY3JlYXRlIG5ldyBlbGVtZW50IGZvcmVhY2ggbmV3IGl0ZW1cbiAgICAgIGNoaWxkcmVuLmxlbmd0aCA9IDBcbiAgICAgIHZtcy5sZW5ndGggPSAwXG4gICAgICBmcmFnQmxvY2suZGF0YSA9IGRhdGEuc2xpY2UoKVxuICAgICAgZnJhZ0Jsb2NrLnVwZGF0ZU1hcmsgPSBmcmFnQmxvY2suc3RhcnRcblxuICAgICAgZGF0YS5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICBjb25zdCBrZXkgPSB0cmFja0J5ID8gaXRlbVt0cmFja0J5XSA6IChvbGRTdHlsZSA/IGl0ZW1ba2V5TmFtZV0gOiBpbmRleClcbiAgICAgICAgY29uc3QgcmV1c2VkID0gcmV1c2VkTWFwW2tleV1cbiAgICAgICAgaWYgKHJldXNlZCkge1xuICAgICAgICAgIGlmIChyZXVzZWQuaXRlbSA9PT0gcmV1c2VkTGlzdFswXSkge1xuICAgICAgICAgICAgcmV1c2VkTGlzdC5zaGlmdCgpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldXNlZExpc3QuJHJlbW92ZShyZXVzZWQuaXRlbSlcbiAgICAgICAgICAgIHRoaXMuX21vdmVUYXJnZXQocmV1c2VkLnRhcmdldCwgZnJhZ0Jsb2NrLnVwZGF0ZU1hcmssIHRydWUpXG4gICAgICAgICAgfVxuICAgICAgICAgIGNoaWxkcmVuLnB1c2gocmV1c2VkLnRhcmdldClcbiAgICAgICAgICB2bXMucHVzaChyZXVzZWQudm0pXG4gICAgICAgICAgcmV1c2VkLnZtW2tleU5hbWVdID0gaW5kZXhcbiAgICAgICAgICBmcmFnQmxvY2sudXBkYXRlTWFyayA9IHJldXNlZC50YXJnZXRcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBjb21waWxlSXRlbShpdGVtLCBpbmRleCwgdGhpcylcbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgICAgZGVsZXRlIGZyYWdCbG9jay51cGRhdGVNYXJrXG4gICAgfVxuICApXG5cbiAgZnJhZ0Jsb2NrLmRhdGEgPSBsaXN0LnNsaWNlKDApXG4gIGxpc3QuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICBjb21waWxlSXRlbShpdGVtLCBpbmRleCwgdGhpcylcbiAgfSlcbn1cblxuLyoqXG4gKiBXYXRjaCB0aGUgZGlzcGxheSB1cGRhdGUgYW5kIGFkZC9yZW1vdmUgdGhlIGVsZW1lbnQuXG4gKlxuICogQHBhcmFtICB7b2JqZWN0fSB0YXJnZXRcbiAqIEBwYXJhbSAge29iamVjdH0gZnJhZ0Jsb2NrXG4gKiBAcGFyYW0gIHtvYmplY3R9IGNvbnRleHRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9iaW5kU2hvd24odGFyZ2V0LCBmcmFnQmxvY2ssIG1ldGEpIHtcbiAgY29uc3QgZGlzcGxheSA9IHRoaXMuX3dhdGNoQmxvY2soZnJhZ0Jsb2NrLCB0YXJnZXQuc2hvd24sICdzaG93bicsXG4gICAgKGRpc3BsYXkpID0+IHtcbiAgICAgIF8uZGVidWcoJ3RoZSBcImlmXCIgaXRlbSB3YXMgY2hhbmdlZCcsIGRpc3BsYXkpXG5cbiAgICAgIGlmICghZnJhZ0Jsb2NrIHx8ICEhZnJhZ0Jsb2NrLmRpc3BsYXkgPT09ICEhZGlzcGxheSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGZyYWdCbG9jay5kaXNwbGF5ID0gISFkaXNwbGF5XG4gICAgICBpZiAoZGlzcGxheSkge1xuICAgICAgICB0aGlzLl9jb21waWxlKHRhcmdldCwgZnJhZ0Jsb2NrLCBtZXRhKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRoaXMuX3JlbW92ZUJsb2NrKGZyYWdCbG9jaywgdHJ1ZSlcbiAgICAgIH1cbiAgICB9XG4gIClcblxuICBmcmFnQmxvY2suZGlzcGxheSA9ICEhZGlzcGxheVxuICBpZiAoZGlzcGxheSkge1xuICAgIHRoaXMuX2NvbXBpbGUodGFyZ2V0LCBmcmFnQmxvY2ssIG1ldGEpXG4gIH1cbn1cblxuLyoqXG4gKiBXYXRjaCBjYWxjIHZhbHVlIGNoYW5nZXMgYW5kIGFwcGVuZCBjZXJ0YWluIHR5cGUgYWN0aW9uIHRvIGRpZmZlci5cbiAqIEl0IGlzIHVzZWQgZm9yIGlmIG9yIHJlcGVhdCBkYXRhLWJpbmRpbmcgZ2VuZXJhdG9yLlxuICpcbiAqIEBwYXJhbSAge29iamVjdH0gICBmcmFnQmxvY2tcbiAqIEBwYXJhbSAge2Z1bmN0aW9ufSBjYWxjXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICAgdHlwZVxuICogQHBhcmFtICB7ZnVuY3Rpb259IGhhbmRsZXJcbiAqIEByZXR1cm4ge2FueX0gICAgICBpbml0IHZhbHVlIG9mIGNhbGNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF93YXRjaEJsb2NrKGZyYWdCbG9jaywgY2FsYywgdHlwZSwgaGFuZGxlcikge1xuICBjb25zdCBkaWZmZXIgPSB0aGlzICYmIHRoaXMuX2FwcCAmJiB0aGlzLl9hcHAuZGlmZmVyXG4gIGNvbnN0IGNvbmZpZyA9IHt9XG4gIGNvbnN0IGRlcHRoID0gKGZyYWdCbG9jay5lbGVtZW50LmRlcHRoIHx8IDApICsgMVxuXG4gIHJldHVybiB0aGlzLl93YXRjaChjYWxjLCAodmFsdWUpID0+IHtcbiAgICBjb25maWcubGF0ZXN0VmFsdWUgPSB2YWx1ZVxuICAgIGlmIChkaWZmZXIgJiYgIWNvbmZpZy5yZWNvcmRlZCkge1xuICAgICAgZGlmZmVyLmFwcGVuZCh0eXBlLCBkZXB0aCwgZnJhZ0Jsb2NrLmJsb2NrSWQsICgpID0+IHtcbiAgICAgICAgY29uc3QgbGF0ZXN0VmFsdWUgPSBjb25maWcubGF0ZXN0VmFsdWVcbiAgICAgICAgaGFuZGxlcihsYXRlc3RWYWx1ZSlcbiAgICAgICAgY29uZmlnLnJlY29yZGVkID0gZmFsc2VcbiAgICAgICAgY29uZmlnLmxhdGVzdFZhbHVlID0gdW5kZWZpbmVkXG4gICAgICB9KVxuICAgIH1cbiAgICBjb25maWcucmVjb3JkZWQgPSB0cnVlXG4gIH0pXG59XG5cbi8qKlxuICogQ2xvbmUgYSBjb250ZXh0IGFuZCBtZXJnZSBjZXJ0YWluIGRhdGEuXG4gKlxuICogQHBhcmFtICB7b2JqZWN0fSBtZXJnZWREYXRhXG4gKiBAcmV0dXJuIHtvYmplY3R9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfbWVyZ2VDb250ZXh0KG1lcmdlZERhdGEpIHtcbiAgY29uc3QgY29udGV4dCA9IE9iamVjdC5jcmVhdGUodGhpcylcbiAgY29udGV4dC5fZGF0YSA9IG1lcmdlZERhdGFcbiAgY29udGV4dC5faW5pdERhdGEoKVxuICBjb250ZXh0Ll9pbml0Q29tcHV0ZWQoKVxuICBjb250ZXh0Ll9yZWFsUGFyZW50ID0gdGhpc1xuICByZXR1cm4gY29udGV4dFxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogL1VzZXJzL3poYW9qaW5qaWFuZy9TaXRlcy9wdWJsaWMvd2VleC9zcmMvanMtZnJhbWV3b3JrL2xpYi92bS9jb21waWxlci5qc1xuICoqLyIsIi8qKlxuICogQGZpbGVPdmVydmlld1xuICogRGlyZWN0aXZlIFBhcnNlclxuICovXG5cbmltcG9ydCAqIGFzIF8gZnJvbSAnLi4vdXRpbC9pbmRleCdcblxuaW1wb3J0IFdhdGNoZXIgZnJvbSAnLi9jb3JlL3dhdGNoZXInXG5pbXBvcnQge25hdGl2ZUNvbXBvbmVudE1hcH0gZnJvbSAnLi4vY29uZmlnJ1xuXG5jb25zdCBTRVRURVJTID0ge1xuICBhdHRyOiAnc2V0QXR0cicsXG4gIHN0eWxlOiAnc2V0U3R5bGUnLFxuICBldmVudDogJ2FkZEV2ZW50J1xufVxuXG4vKipcbiAqIGFwcGx5IHRoZSBuYXRpdmUgY29tcG9uZW50J3Mgb3B0aW9ucyhzcGVjaWZpZWQgYnkgdGVtcGxhdGUudHlwZSlcbiAqIHRvIHRoZSB0ZW1wbGF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gX2FwcGx5TmFpdHZlQ29tcG9uZW50T3B0aW9ucyh0ZW1wbGF0ZSkge1xuICBjb25zdCB7dHlwZX0gPSB0ZW1wbGF0ZVxuICBjb25zdCBvcHRpb25zID0gbmF0aXZlQ29tcG9uZW50TWFwW3R5cGVdXG5cbiAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnb2JqZWN0Jykge1xuICAgIGZvciAoY29uc3Qga2V5IGluIG9wdGlvbnMpIHtcbiAgICAgIGlmICh0ZW1wbGF0ZVtrZXldID09IG51bGwpIHtcbiAgICAgICAgdGVtcGxhdGVba2V5XSA9IG9wdGlvbnNba2V5XVxuICAgICAgfSBlbHNlIGlmIChfLnR5cG9mKHRlbXBsYXRlW2tleV0pID09PSAnb2JqZWN0JyAmJlxuICAgICAgICBfLnR5cG9mKG9wdGlvbnNba2V5XSkgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGZvciAoY29uc3Qgc3Via2V5IGluIG9wdGlvbnNba2V5XSkge1xuICAgICAgICAgIGlmICh0ZW1wbGF0ZVtrZXldW3N1YmtleV0gPT0gbnVsbCkge1xuICAgICAgICAgICAgdGVtcGxhdGVba2V5XVtzdWJrZXldID0gb3B0aW9uc1trZXldW3N1YmtleV1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBiaW5kIGFsbCBpZCwgYXR0ciwgY2xhc3NuYW1lcywgc3R5bGUsIGV2ZW50cyB0byBhbiBlbGVtZW50XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfYmluZEVsZW1lbnQoZWwsIHRlbXBsYXRlKSB7XG4gIHRoaXMuX3NldElkKHRlbXBsYXRlLmlkLCBlbCwgdGhpcylcbiAgdGhpcy5fc2V0QXR0cihlbCwgdGVtcGxhdGUuYXR0cilcbiAgdGhpcy5fc2V0Q2xhc3MoZWwsIHRlbXBsYXRlLmNsYXNzTGlzdClcbiAgdGhpcy5fc2V0U3R5bGUoZWwsIHRlbXBsYXRlLnN0eWxlKVxuICB0aGlzLl9iaW5kRXZlbnRzKGVsLCB0ZW1wbGF0ZS5ldmVudHMpXG59XG5cbi8qKlxuICogYmluZCBhbGwgcHJvcHMgdG8gc3ViIHZtIGFuZCBiaW5kIGFsbCBzdHlsZSwgZXZlbnRzIHRvIHRoZSByb290IGVsZW1lbnRcbiAqIG9mIHRoZSBzdWIgdm0gaWYgaXQgZG9lc24ndCBoYXZlIGEgcmVwbGFjZWQgbXVsdGktbm9kZSBmcmFnbWVudFxuICovXG5leHBvcnQgZnVuY3Rpb24gX2JpbmRTdWJWbShzdWJWbSwgdGVtcGxhdGUsIHJlcGVhdEl0ZW0pIHtcbiAgc3ViVm0gPSBzdWJWbSB8fCB7fVxuICB0ZW1wbGF0ZSA9IHRlbXBsYXRlIHx8IHt9XG5cbiAgY29uc3Qgb3B0aW9ucyA9IHN1YlZtLl9vcHRpb25zIHx8IHt9XG5cbiAgLy8gYmluZCBwcm9wc1xuICBsZXQgcHJvcHMgPSBvcHRpb25zLnByb3BzXG5cbiAgaWYgKEFycmF5LmlzQXJyYXkocHJvcHMpKSB7XG4gICAgcHJvcHMgPSBwcm9wcy5yZWR1Y2UoKHJlc3VsdCwgdmFsdWUpID0+IHtcbiAgICAgIHJlc3VsdFt2YWx1ZV0gPSB0cnVlXG4gICAgICByZXR1cm4gcmVzdWx0XG4gICAgfSwge30pXG4gIH1cblxuICBtZXJnZVByb3BzKHJlcGVhdEl0ZW0sIHByb3BzLCB0aGlzLCBzdWJWbSlcbiAgbWVyZ2VQcm9wcyh0ZW1wbGF0ZS5hdHRyLCBwcm9wcywgdGhpcywgc3ViVm0pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfYmluZFN1YlZtQWZ0ZXJJbml0aWFsaXplZChzdWJWbSwgdGVtcGxhdGUpIHtcbiAgbWVyZ2VDbGFzc1N0eWxlKHRlbXBsYXRlLmNsYXNzTGlzdCwgdGhpcywgc3ViVm0pXG4gIG1lcmdlU3R5bGUodGVtcGxhdGUuc3R5bGUsIHRoaXMsIHN1YlZtKVxufVxuXG5mdW5jdGlvbiBtZXJnZVByb3BzKHRhcmdldCwgcHJvcHMsIHZtLCBzdWJWbSkge1xuICBpZiAoIXRhcmdldCkge1xuICAgIHJldHVyblxuICB9XG4gIGZvciAoY29uc3Qga2V5IGluIHRhcmdldCkge1xuICAgIGlmICghcHJvcHMgfHwgcHJvcHNba2V5XSkge1xuICAgICAgY29uc3QgdmFsdWUgPSB0YXJnZXRba2V5XVxuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBjb25zdCByZXR1cm5WYWx1ZSA9IHZtLl93YXRjaCh2YWx1ZSwgZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICBzdWJWbVtrZXldID0gdlxuICAgICAgICB9KVxuICAgICAgICBzdWJWbVtrZXldID0gcmV0dXJuVmFsdWVcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBzdWJWbVtrZXldID0gdmFsdWVcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gbWVyZ2VTdHlsZSh0YXJnZXQsIHZtLCBzdWJWbSkge1xuICBmb3IgKGNvbnN0IGtleSBpbiB0YXJnZXQpIHtcbiAgICBjb25zdCB2YWx1ZSA9IHRhcmdldFtrZXldXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc3QgcmV0dXJuVmFsdWUgPSB2bS5fd2F0Y2godmFsdWUsIGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIGlmIChzdWJWbS5fcm9vdEVsKSB7XG4gICAgICAgICAgc3ViVm0uX3Jvb3RFbC5zZXRTdHlsZShrZXksIHYpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICBzdWJWbS5fcm9vdEVsLnNldFN0eWxlKGtleSwgcmV0dXJuVmFsdWUpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgaWYgKHN1YlZtLl9yb290RWwpIHtcbiAgICAgICAgc3ViVm0uX3Jvb3RFbC5zZXRTdHlsZShrZXksIHZhbHVlKVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBtZXJnZUNsYXNzU3R5bGUodGFyZ2V0LCB2bSwgc3ViVm0pIHtcbiAgdmFyIGNzcyA9IHZtLl9vcHRpb25zICYmIHZtLl9vcHRpb25zLnN0eWxlIHx8IHt9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gIGlmICghc3ViVm0uX3Jvb3RFbCkge1xuICAgIHJldHVyblxuICB9XG5cbiAgaWYgKHR5cGVvZiB0YXJnZXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjb25zdCB2YWx1ZSA9IHZtLl93YXRjaCh0YXJnZXQsICB2ID0+IHtcbiAgICAgIHNldENsYXNzU3R5bGUoc3ViVm0uX3Jvb3RFbCwgY3NzLCB2KVxuICAgIH0pXG4gICAgc2V0Q2xhc3NTdHlsZShzdWJWbS5fcm9vdEVsLCBjc3MsIHZhbHVlKVxuICB9IGVsc2UgaWYgKHRhcmdldCAhPSBudWxsKSB7XG4gICAgc2V0Q2xhc3NTdHlsZShzdWJWbS5fcm9vdEVsLCBjc3MsIHRhcmdldClcbiAgfVxufVxuXG4vKipcbiAqIGJpbmQgaWQgdG8gYW4gZWxlbWVudFxuICogZWFjaCBpZCBpcyB1bmlxdWUgaW4gYSB3aG9sZSB2bVxuICovXG5leHBvcnQgZnVuY3Rpb24gX3NldElkKGlkLCBlbCwgdm0pIHtcbiAgY29uc3QgbWFwID0gT2JqZWN0LmNyZWF0ZShudWxsKVxuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKG1hcCwge1xuICAgIHZtOiB7XG4gICAgICB2YWx1ZTogdm0sXG4gICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlXG4gICAgfSxcbiAgICBlbDoge1xuICAgICAgZ2V0OiAoKSA9PiBlbCB8fCB2bS5fcm9vdEVsLFxuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZVxuICAgIH1cbiAgfSlcblxuICBpZiAodHlwZW9mIGlkID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY29uc3QgaGFuZGxlciA9IGlkXG4gICAgaWQgPSBoYW5kbGVyLmNhbGwodGhpcylcbiAgICBpZiAoaWQpIHtcbiAgICAgIHRoaXMuX2lkc1tpZF0gPSBtYXBcbiAgICB9XG4gICAgdGhpcy5fd2F0Y2goaGFuZGxlciwgKG5ld0lkKSA9PiB7XG4gICAgICBpZiAobmV3SWQpIHtcbiAgICAgICAgdGhpcy5faWRzW25ld0lkXSA9IG1hcFxuICAgICAgfVxuICAgIH0pXG4gIH1cbiAgZWxzZSBpZiAoaWQgJiYgdHlwZW9mIGlkID09PSAnc3RyaW5nJykge1xuICAgIHRoaXMuX2lkc1tpZF0gPSBtYXBcbiAgfVxufVxuXG4vKipcbiAqIGJpbmQgYXR0ciB0byBhbiBlbGVtZW50XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfc2V0QXR0cihlbCwgYXR0cikge1xuICB0aGlzLl9iaW5kRGlyKGVsLCAnYXR0cicsIGF0dHIpXG59XG5cbmZ1bmN0aW9uIHNldENsYXNzU3R5bGUoZWwsIGNzcywgY2xhc3NMaXN0KSB7XG4gIGNvbnN0IGNsYXNzU3R5bGUgPSB7fVxuICBjb25zdCBsZW5ndGggPSBjbGFzc0xpc3QubGVuZ3RoXG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IHN0eWxlID0gY3NzW2NsYXNzTGlzdFtpXV1cbiAgICBpZiAoc3R5bGUpIHtcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIHN0eWxlKSB7XG4gICAgICAgIGNsYXNzU3R5bGVba2V5XSA9IHN0eWxlW2tleV1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgZWwuc2V0Q2xhc3NTdHlsZShjbGFzc1N0eWxlKVxufVxuXG4vKipcbiAqIGJpbmQgY2xhc3NuYW1lcyB0byBhbiBlbGVtZW50XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfc2V0Q2xhc3MoZWwsIGNsYXNzTGlzdCkge1xuXG4gIGlmICh0eXBlb2YgY2xhc3NMaXN0ICE9PSAnZnVuY3Rpb24nICYmICFBcnJheS5pc0FycmF5KGNsYXNzTGlzdCkpIHtcbiAgICByZXR1cm5cbiAgfVxuICBpZiAoQXJyYXkuaXNBcnJheShjbGFzc0xpc3QpICYmICFjbGFzc0xpc3QubGVuZ3RoKSB7XG4gICAgZWwuc2V0Q2xhc3NTdHlsZSh7fSlcbiAgICByZXR1cm5cbiAgfVxuXG4gIGNvbnN0IHN0eWxlID0gdGhpcy5fb3B0aW9ucyAmJiB0aGlzLl9vcHRpb25zLnN0eWxlIHx8IHt9XG4gIGlmICh0eXBlb2YgY2xhc3NMaXN0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLl93YXRjaChjbGFzc0xpc3QsICB2ID0+IHtcbiAgICAgIHNldENsYXNzU3R5bGUoZWwsIHN0eWxlLCB2KVxuICAgIH0pXG4gICAgc2V0Q2xhc3NTdHlsZShlbCwgc3R5bGUsIHZhbHVlKVxuICB9XG4gIGVsc2Uge1xuICAgIHNldENsYXNzU3R5bGUoZWwsIHN0eWxlLCBjbGFzc0xpc3QpXG4gIH1cbn1cblxuLyoqXG4gKiBiaW5kIHN0eWxlIHRvIGFuIGVsZW1lbnRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9zZXRTdHlsZShlbCwgc3R5bGUpIHtcbiAgdGhpcy5fYmluZERpcihlbCwgJ3N0eWxlJywgc3R5bGUpXG59XG5cbi8qKlxuICogYWRkIGFuIGV2ZW50IHR5cGUgYW5kIGhhbmRsZXIgdG8gYW4gZWxlbWVudCBhbmQgZ2VuZXJhdGUgYSBkb20gdXBkYXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfc2V0RXZlbnQoZWwsIHR5cGUsIGhhbmRsZXIpIHtcbiAgZWwuYWRkRXZlbnQodHlwZSwgXy5iaW5kKGhhbmRsZXIsIHRoaXMpKVxufVxuXG4vKipcbiAqIGFkZCBhbGwgZXZlbnRzIG9mIGFuIGVsZW1lbnRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9iaW5kRXZlbnRzKGVsLCBldmVudHMpIHtcbiAgaWYgKCFldmVudHMpIHtcbiAgICByZXR1cm5cbiAgfVxuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoZXZlbnRzKVxuICBsZXQgaSA9IGtleXMubGVuZ3RoXG4gIHdoaWxlIChpLS0pIHtcbiAgICBjb25zdCBrZXkgPSBrZXlzW2ldXG4gICAgbGV0IGhhbmRsZXIgPSBldmVudHNba2V5XVxuICAgIGlmICh0eXBlb2YgaGFuZGxlciA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGhhbmRsZXIgPSB0aGlzW2hhbmRsZXJdXG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgIGlmICghaGFuZGxlcikge1xuICAgICAgICBfLmVycm9yKGBUaGUgbWV0aG9kIFwiJHtoYW5kbGVyfVwiIGlzIG5vdCBkZWZpbmVkLmApXG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX3NldEV2ZW50KGVsLCBrZXksIGhhbmRsZXIpXG4gIH1cbn1cblxuLyoqXG4gKiBzZXQgYSBzZXJpZXMgb2YgbWVtYmVycyBhcyBhIGtpbmQgb2YgYW4gZWxlbWVudFxuICogZm9yIGV4YW1wbGU6IHN0eWxlLCBhdHRyLCAuLi5cbiAqIGlmIHRoZSB2YWx1ZSBpcyBhIGZ1bmN0aW9uIHRoZW4gYmluZCB0aGUgZGF0YSBjaGFuZ2VzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfYmluZERpcihlbCwgbmFtZSwgZGF0YSkge1xuICBpZiAoIWRhdGEpIHtcbiAgICByZXR1cm5cbiAgfVxuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoZGF0YSlcbiAgbGV0IGkgPSBrZXlzLmxlbmd0aFxuICB3aGlsZSAoaS0tKSB7XG4gICAgY29uc3Qga2V5ID0ga2V5c1tpXVxuICAgIGNvbnN0IHZhbHVlID0gZGF0YVtrZXldXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy5fYmluZEtleShlbCwgbmFtZSwga2V5LCB2YWx1ZSlcbiAgICB9IGVsc2Uge1xuICAgICAgZWxbU0VUVEVSU1tuYW1lXV0oa2V5LCB2YWx1ZSlcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBiaW5kIGRhdGEgY2hhbmdlcyB0byBhIGNlcnRhaW4ga2V5IHRvIGEgbmFtZSBzZXJpZXMgaW4gYW4gZWxlbWVudFxuICovXG5leHBvcnQgZnVuY3Rpb24gX2JpbmRLZXkoZWwsIG5hbWUsIGtleSwgY2FsYykge1xuICBjb25zdCBtZXRob2ROYW1lID0gU0VUVEVSU1tuYW1lXVxuICBjb25zdCBvYmogPSBlbFtuYW1lXVxuICAvLyB3YXRjaCB0aGUgY2FsYywgYW5kIHJldHVybnMgYSB2YWx1ZSBieSBjYWxjLmNhbGwoKVxuICBjb25zdCB2YWx1ZSA9IHRoaXMuX3dhdGNoKGNhbGMsICh2YWx1ZSkgPT4ge1xuICAgIGZ1bmN0aW9uIGhhbmRsZXIoKSB7XG4gICAgICBlbFttZXRob2ROYW1lXShrZXksIHZhbHVlKVxuICAgIH1cbiAgICBjb25zdCBkaWZmZXIgPSB0aGlzICYmIHRoaXMuX2FwcCAmJiB0aGlzLl9hcHAuZGlmZmVyXG4gICAgaWYgKGRpZmZlcikge1xuICAgICAgZGlmZmVyLmFwcGVuZCgnZWxlbWVudCcsIGVsLmRlcHRoLCBlbC5yZWYsIGhhbmRsZXIpXG4gICAgfSBlbHNlIHtcbiAgICAgIGhhbmRsZXIoKVxuICAgIH1cbiAgfSlcblxuICBlbFttZXRob2ROYW1lXShrZXksIHZhbHVlKVxufVxuXG4vKipcbiAqIHdhdGNoIGEgY2FsYyBmdW5jdGlvbiBhbmQgY2FsbGJhY2sgaWYgdGhlIGNhbGMgdmFsdWUgY2hhbmdlc1xuICovXG5leHBvcnQgZnVuY3Rpb24gX3dhdGNoKGNhbGMsIGNhbGxiYWNrKSB7XG4gIGNvbnN0IHdhdGNoZXIgPSBuZXcgV2F0Y2hlcih0aGlzLCBjYWxjLCBmdW5jdGlvbiAodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcgJiYgdmFsdWUgPT09IG9sZFZhbHVlKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgY2FsbGJhY2sodmFsdWUpXG4gIH0pXG5cbiAgcmV0dXJuIHdhdGNoZXIudmFsdWVcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC9Vc2Vycy96aGFvamluamlhbmcvU2l0ZXMvcHVibGljL3dlZXgvc3JjL2pzLWZyYW1ld29yay9saWIvdm0vZGlyZWN0aXZlLmpzXG4gKiovIiwiLyoqXG4gKiBAZmlsZU92ZXJ2aWV3IERvY3VtZW50ICYgRWxlbWVudCBIZWxwZXJzLlxuICpcbiAqIHJlcXVpcmVkOlxuICogRG9jdW1lbnQjOiBjcmVhdGVFbGVtZW50LCBjcmVhdGVDb21tZW50LCBnZXRSZWZcbiAqIEVsZW1lbnQjOiBhcHBlbmRDaGlsZCwgaW5zZXJ0QmVmb3JlLCByZW1vdmVDaGlsZCwgbmV4dFNpYmxpbmdcbiAqL1xuXG4vKipcbiAqIENyZWF0ZSBhIGJvZHkgYnkgdHlwZVxuICogVXNpbmcgdGhpcy5fYXBwLmRvY1xuICpcbiAqIEBwYXJhbSAge3N0cmluZ30gdHlwZVxuICovXG5leHBvcnQgZnVuY3Rpb24gX2NyZWF0ZUJvZHkodHlwZSkge1xuICBjb25zdCBkb2MgPSB0aGlzLl9hcHAuZG9jXG4gIHJldHVybiBkb2MuY3JlYXRlQm9keSh0eXBlKVxufVxuXG4vKipcbiAqIENyZWF0ZSBhbiBlbGVtZW50IGJ5IHR5cGVcbiAqIFVzaW5nIHRoaXMuX2FwcC5kb2NcbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHR5cGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9jcmVhdGVFbGVtZW50KHR5cGUpIHtcbiAgY29uc3QgZG9jID0gdGhpcy5fYXBwLmRvY1xuICByZXR1cm4gZG9jLmNyZWF0ZUVsZW1lbnQodHlwZSlcbn1cblxuLyoqXG4gKiBDcmVhdGUgYW5kIHJldHVybiBhIGZyYWcgYmxvY2sgZm9yIGFuIGVsZW1lbnQuXG4gKiBUaGUgZnJhZyBibG9jayBoYXMgYSBzdGFydGVyLCBlbmRlciBhbmQgdGhlIGVsZW1lbnQgaXRzZWxmLlxuICpcbiAqIEBwYXJhbSAge29iamVjdH0gZWxlbWVudFxuICovXG5leHBvcnQgZnVuY3Rpb24gX2NyZWF0ZUJsb2NrKGVsZW1lbnQpIHtcbiAgY29uc3Qgc3RhcnQgPSB0aGlzLl9jcmVhdGVCbG9ja1N0YXJ0KClcbiAgY29uc3QgZW5kID0gdGhpcy5fY3JlYXRlQmxvY2tFbmQoKVxuICBjb25zdCBibG9ja0lkID0gbGFzdGVzdEJsb2NrSWQrK1xuICBpZiAoZWxlbWVudC5lbGVtZW50KSB7XG4gICAgZWxlbWVudC5lbGVtZW50Lmluc2VydEJlZm9yZShzdGFydCwgZWxlbWVudC5lbmQpXG4gICAgZWxlbWVudC5lbGVtZW50Lmluc2VydEJlZm9yZShlbmQsIGVsZW1lbnQuZW5kKVxuICAgIGVsZW1lbnQgPSBlbGVtZW50LmVsZW1lbnRcbiAgfVxuICBlbHNlIHtcbiAgICBlbGVtZW50LmFwcGVuZENoaWxkKHN0YXJ0KVxuICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoZW5kKVxuICB9XG4gIHJldHVybiB7c3RhcnQsIGVuZCwgZWxlbWVudCwgYmxvY2tJZH1cbn1cblxubGV0IGxhc3Rlc3RCbG9ja0lkID0gMVxuXG4vKipcbiAqIENyZWF0ZSBhbmQgcmV0dXJuIGEgYmxvY2sgc3RhcnRlci5cbiAqIFVzaW5nIHRoaXMuX2FwcC5kb2NcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9jcmVhdGVCbG9ja1N0YXJ0KCkge1xuICBjb25zdCBkb2MgPSB0aGlzLl9hcHAuZG9jXG4gIGNvbnN0IGFuY2hvciA9IGRvYy5jcmVhdGVDb21tZW50KCdzdGFydCcpXG4gIHJldHVybiBhbmNob3Jcbn1cblxuLyoqXG4gKiBDcmVhdGUgYW5kIHJldHVybiBhIGJsb2NrIGVuZGVyLlxuICogVXNpbmcgdGhpcy5fYXBwLmRvY1xuICovXG5leHBvcnQgZnVuY3Rpb24gX2NyZWF0ZUJsb2NrRW5kKCkge1xuICBjb25zdCBkb2MgPSB0aGlzLl9hcHAuZG9jXG4gIGNvbnN0IGFuY2hvciA9IGRvYy5jcmVhdGVDb21tZW50KCdlbmQnKVxuICByZXR1cm4gYW5jaG9yXG59XG5cbi8qKlxuICogQXR0YWNoIHRhcmdldCB0byBhIGNlcnRhaW4gZGVzdCB1c2luZyBhcHBlbmRDaGlsZCBieSBkZWZhdWx0LlxuICogSWYgdGhlIGRlc3QgaXMgYSBmcmFnIGJsb2NrIHRoZW4gaW5zZXJ0IGJlZm9yZSB0aGUgZW5kZXIuXG4gKiBJZiB0aGUgdGFyZ2V0IGlzIGEgZnJhZyBibG9jayB0aGVuIGF0dGFjaCB0aGUgc3RhcnRlciBhbmQgZW5kZXIgaW4gb3JkZXIuXG4gKlxuICogQHBhcmFtICB7b2JqZWN0fSB0YXJnZXRcbiAqIEBwYXJhbSAge29iamVjdH0gZGVzdFxuICovXG5leHBvcnQgZnVuY3Rpb24gX2F0dGFjaFRhcmdldCh0YXJnZXQsIGRlc3QpIHtcblxuICBpZiAoZGVzdC5lbGVtZW50KSB7XG4gICAgY29uc3QgYmVmb3JlID0gZGVzdC5lbmRcbiAgICBjb25zdCBhZnRlciA9IGRlc3QudXBkYXRlTWFya1xuICAgIC8vIHB1c2ggbmV3IHRhcmdldCBmb3Igd2F0Y2ggbGlzdCB1cGRhdGUgbGF0ZXJcbiAgICBpZiAoZGVzdC5jaGlsZHJlbikge1xuICAgICAgZGVzdC5jaGlsZHJlbi5wdXNoKHRhcmdldClcbiAgICB9XG4gICAgLy8gZm9yIGNoZWNrIHJlcGVhdCBjYXNlXG4gICAgaWYgKGFmdGVyKSB7XG4gICAgICB0aGlzLl9tb3ZlVGFyZ2V0KHRhcmdldCwgYWZ0ZXIpXG4gICAgICBkZXN0LnVwZGF0ZU1hcmsgPSB0YXJnZXQuZWxlbWVudCA/IHRhcmdldC5lbmQgOiB0YXJnZXRcbiAgICB9XG4gICAgZWxzZSBpZiAodGFyZ2V0LmVsZW1lbnQpIHtcbiAgICAgIGRlc3QuZWxlbWVudC5pbnNlcnRCZWZvcmUodGFyZ2V0LnN0YXJ0LCBiZWZvcmUpXG4gICAgICBkZXN0LmVsZW1lbnQuaW5zZXJ0QmVmb3JlKHRhcmdldC5lbmQsIGJlZm9yZSlcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBkZXN0LmVsZW1lbnQuaW5zZXJ0QmVmb3JlKHRhcmdldCwgYmVmb3JlKVxuICAgIH1cbiAgfVxuICBlbHNlIHtcbiAgICBpZiAodGFyZ2V0LmVsZW1lbnQpIHtcbiAgICAgIGRlc3QuYXBwZW5kQ2hpbGQodGFyZ2V0LnN0YXJ0KVxuICAgICAgZGVzdC5hcHBlbmRDaGlsZCh0YXJnZXQuZW5kKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGRlc3QuYXBwZW5kQ2hpbGQodGFyZ2V0KVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIE1vdmUgdGFyZ2V0IGJlZm9yZSBhIGNlcnRhaW4gZWxlbWVudC4gVGhlIHRhcmdldCBtYXliZSBibG9jayBvciBlbGVtZW50LlxuICpcbiAqIEBwYXJhbSAge29iamVjdH0gdGFyZ2V0XG4gKiBAcGFyYW0gIHtvYmplY3R9IGJlZm9yZVxuICovXG5leHBvcnQgZnVuY3Rpb24gX21vdmVUYXJnZXQodGFyZ2V0LCBhZnRlcikge1xuICBpZiAodGFyZ2V0LmVsZW1lbnQpIHtcbiAgICB0aGlzLl9tb3ZlQmxvY2sodGFyZ2V0LCBhZnRlcilcbiAgfVxuICBlbHNlIHtcbiAgICB0aGlzLl9tb3ZlRWxlbWVudCh0YXJnZXQsIGFmdGVyKVxuICB9XG59XG5cbi8qKlxuICogTW92ZSBlbGVtZW50IGJlZm9yZSBhIGNlcnRhaW4gZWxlbWVudC5cbiAqXG4gKiBAcGFyYW0gIHtvYmplY3R9IGVsZW1lbnRcbiAqIEBwYXJhbSAge29iamVjdH0gYmVmb3JlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfbW92ZUVsZW1lbnQoZWxlbWVudCwgYWZ0ZXIpIHtcbiAgY29uc3QgZG9jID0gdGhpcy5fYXBwLmRvY1xuICBjb25zdCBwYXJlbnQgPSBkb2MuZ2V0UmVmKGFmdGVyLnBhcmVudFJlZilcblxuICBpZiAocGFyZW50KSB7XG4gICAgcGFyZW50Lmluc2VydEFmdGVyKGVsZW1lbnQsIGFmdGVyKVxuICB9XG59XG5cbi8qKlxuICogTW92ZSBhbGwgZWxlbWVudHMgb2YgdGhlIGJsb2NrIGJlZm9yZSBhIGNlcnRhaW4gZWxlbWVudC5cbiAqXG4gKiBAcGFyYW0gIHtvYmplY3R9IGZyYWdCbG9ja1xuICogQHBhcmFtICB7b2JqZWN0fSBiZWZvcmVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9tb3ZlQmxvY2soZnJhZ0Jsb2NrLCBhZnRlcikge1xuICBjb25zdCBkb2MgPSB0aGlzLl9hcHAuZG9jXG4gIGNvbnN0IHBhcmVudCA9IGRvYy5nZXRSZWYoYWZ0ZXIucGFyZW50UmVmKVxuXG4gIGlmIChwYXJlbnQpIHtcbiAgICBsZXQgZWwgPSBmcmFnQmxvY2suc3RhcnRcbiAgICBjb25zdCBncm91cCA9IFtlbF1cblxuICAgIHdoaWxlIChlbCAmJiBlbCAhPT0gZnJhZ0Jsb2NrLmVuZCkge1xuICAgICAgZWwgPSBlbC5uZXh0KClcbiAgICAgIGdyb3VwLnB1c2goZWwpXG4gICAgfVxuXG4gICAgbGV0IHRlbXAgPSBhZnRlclxuICAgIGdyb3VwLmZvckVhY2goKGVsKSA9PiB7XG4gICAgICBwYXJlbnQuaW5zZXJ0QWZ0ZXIoZWwsIHRlbXApXG4gICAgICB0ZW1wID0gZWxcbiAgICB9KVxuICB9XG59XG5cbi8qKlxuICogUmVtb3ZlIHRhcmdldCBmcm9tIERPTSB0cmVlLlxuICogSWYgdGhlIHRhcmdldCBpcyBhIGZyYWcgYmxvY2sgdGhlbiBjYWxsIF9yZW1vdmVCbG9ja1xuICpcbiAqIEBwYXJhbSAge29iamVjdH0gdGFyZ2V0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfcmVtb3ZlVGFyZ2V0KHRhcmdldCkge1xuXG4gIGlmICh0YXJnZXQuZWxlbWVudCkge1xuICAgIHRoaXMuX3JlbW92ZUJsb2NrKHRhcmdldClcbiAgfVxuICBlbHNlIHtcbiAgICB0aGlzLl9yZW1vdmVFbGVtZW50KHRhcmdldClcbiAgfVxufVxuXG4vKipcbiAqIFJlbW92ZSBhIGNlcnRhaW4gZWxlbWVudC5cbiAqIFVzaW5nIHRoaXMuX2FwcC5kb2NcbiAqXG4gKiBAcGFyYW0gIHtvYmplY3R9IHRhcmdldFxuICovXG5leHBvcnQgZnVuY3Rpb24gX3JlbW92ZUVsZW1lbnQodGFyZ2V0KSB7XG4gIGNvbnN0IGRvYyA9IHRoaXMuX2FwcC5kb2NcbiAgY29uc3QgcGFyZW50ID0gZG9jLmdldFJlZih0YXJnZXQucGFyZW50UmVmKVxuXG4gIGlmIChwYXJlbnQpIHtcbiAgICBwYXJlbnQucmVtb3ZlQ2hpbGQodGFyZ2V0KVxuICB9XG59XG5cbi8qKlxuICogUmVtb3ZlIGEgZnJhZyBibG9jay5cbiAqIFRoZSBzZWNvbmQgcGFyYW0gZGVjaWRlcyB3aGV0aGVyIHRoZSBibG9jayBzZWxmIHNob3VsZCBiZSByZW1vdmVkIHRvby5cbiAqXG4gKiBAcGFyYW0gIHtvYmplY3R9ICBmcmFnQmxvY2tcbiAqIEBwYXJhbSAge0Jvb2xlYW59IHByZXNlcnZlQmxvY2s9ZmFsc2VcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9yZW1vdmVCbG9jayhmcmFnQmxvY2ssIHByZXNlcnZlQmxvY2sgPSBmYWxzZSkge1xuICBjb25zdCByZXN1bHQgPSBbXVxuICBsZXQgZWwgPSBmcmFnQmxvY2suc3RhcnQubmV4dCgpXG5cbiAgd2hpbGUgKGVsICYmIGVsICE9PSBmcmFnQmxvY2suZW5kKSB7XG4gICAgcmVzdWx0LnB1c2goZWwpXG4gICAgZWwgPSBlbC5uZXh0KClcbiAgfVxuXG4gIGlmICghcHJlc2VydmVCbG9jaykge1xuICAgIHRoaXMuX3JlbW92ZUVsZW1lbnQoZnJhZ0Jsb2NrLnN0YXJ0KVxuICB9XG4gIHJlc3VsdC5mb3JFYWNoKChlbCkgPT4ge1xuICAgIHRoaXMuX3JlbW92ZUVsZW1lbnQoZWwpXG4gIH0pXG4gIGlmICghcHJlc2VydmVCbG9jaykge1xuICAgIHRoaXMuX3JlbW92ZUVsZW1lbnQoZnJhZ0Jsb2NrLmVuZClcbiAgfVxufVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAvVXNlcnMvemhhb2ppbmppYW5nL1NpdGVzL3B1YmxpYy93ZWV4L3NyYy9qcy1mcmFtZXdvcmsvbGliL3ZtL2RvbS1oZWxwZXIuanNcbiAqKi8iLCJmdW5jdGlvbiBFdnQodHlwZSwgZGV0YWlsKSB7XG4gIGlmIChkZXRhaWwgaW5zdGFuY2VvZiBFdnQpIHtcbiAgICByZXR1cm4gZGV0YWlsXG4gIH1cblxuICB0aGlzLnRpbWVzdGFtcCA9IERhdGUubm93KClcbiAgdGhpcy5kZXRhaWwgPSBkZXRhaWxcbiAgdGhpcy50eXBlID0gdHlwZVxuXG4gIGxldCBzaG91bGRTdG9wID0gZmFsc2VcbiAgdGhpcy5zdG9wID0gZnVuY3Rpb24gKCkge1xuICAgIHNob3VsZFN0b3AgPSB0cnVlXG4gIH1cbiAgdGhpcy5oYXNTdG9wcGVkID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBzaG91bGRTdG9wXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uICRlbWl0KHR5cGUsIGRldGFpbCkge1xuICBjb25zdCBldmVudHMgPSB0aGlzLl92bUV2ZW50c1xuICBjb25zdCBoYW5kbGVyTGlzdCA9IGV2ZW50c1t0eXBlXVxuICBpZiAoaGFuZGxlckxpc3QpIHtcbiAgICBsZXQgZXZ0ID0gbmV3IEV2dCh0eXBlLCBkZXRhaWwpXG4gICAgaGFuZGxlckxpc3QuZm9yRWFjaCgoaGFuZGxlcikgPT4ge1xuICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGV2dClcbiAgICB9KVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiAkZGlzcGF0Y2godHlwZSwgZGV0YWlsKSB7XG4gIGNvbnN0IGV2dCA9IG5ldyBFdnQodHlwZSwgZGV0YWlsKVxuICB0aGlzLiRlbWl0KHR5cGUsIGV2dClcblxuICBpZiAoIWV2dC5oYXNTdG9wcGVkKCkgJiYgdGhpcy5fcGFyZW50ICYmIHRoaXMuX3BhcmVudC4kZGlzcGF0Y2gpIHtcbiAgICB0aGlzLl9wYXJlbnQuJGRpc3BhdGNoKHR5cGUsIGV2dClcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gJGJyb2FkY2FzdCh0eXBlLCBkZXRhaWwpIHtcbiAgY29uc3QgZXZ0ID0gbmV3IEV2dCh0eXBlLCBkZXRhaWwpXG4gIHRoaXMuJGVtaXQodHlwZSwgZXZ0KVxuXG4gIGlmICghZXZ0Lmhhc1N0b3BwZWQoKSAmJiB0aGlzLl9jaGlsZHJlblZtcykge1xuICAgIHRoaXMuX2NoaWxkcmVuVm1zLmZvckVhY2goKHN1YlZtKSA9PiB7XG4gICAgICBzdWJWbS4kYnJvYWRjYXN0KHR5cGUsIGV2dClcbiAgICB9KVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiAkb24odHlwZSwgaGFuZGxlcikge1xuICBpZiAoIXR5cGUgfHwgdHlwZW9mIGhhbmRsZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm5cbiAgfVxuICBjb25zdCBldmVudHMgPSB0aGlzLl92bUV2ZW50c1xuICBjb25zdCBoYW5kbGVyTGlzdCA9IGV2ZW50c1t0eXBlXSB8fCBbXVxuICBoYW5kbGVyTGlzdC5wdXNoKGhhbmRsZXIpXG4gIGV2ZW50c1t0eXBlXSA9IGhhbmRsZXJMaXN0XG5cbiAgLy8gZml4ZWQgb2xkIHZlcnNpb24gbGlmZWN5Y2xlIGRlc2lnblxuICBpZiAodHlwZSA9PT0gJ2hvb2s6cmVhZHknICYmIHRoaXMuX3JlYWR5KSB7XG4gICAgdGhpcy4kZW1pdCgnaG9vazpyZWFkeScpXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uICRvZmYodHlwZSwgaGFuZGxlcikge1xuICBpZiAoIXR5cGUpIHtcbiAgICByZXR1cm5cbiAgfVxuICBjb25zdCBldmVudHMgPSB0aGlzLl92bUV2ZW50c1xuICBpZiAoIWhhbmRsZXIpIHtcbiAgICBkZWxldGUgZXZlbnRzW3R5cGVdXG4gICAgcmV0dXJuXG4gIH1cbiAgY29uc3QgaGFuZGxlckxpc3QgPSBldmVudHNbdHlwZV1cbiAgaWYgKCFoYW5kbGVyTGlzdCkge1xuICAgIHJldHVyblxuICB9XG4gIGhhbmRsZXJMaXN0LiRyZW1vdmUoaGFuZGxlcilcbn1cblxuY29uc3QgTElGRV9DWUNMRV9UWVBFUyA9IFsnaW5pdCcsICdjcmVhdGVkJywgJ3JlYWR5J11cblxuZXhwb3J0IGZ1bmN0aW9uIF9pbml0RXZlbnRzKGV4dGVybmFsRXZlbnRzKSB7XG4gIGNvbnN0IG9wdGlvbnMgPSB0aGlzLl9vcHRpb25zIHx8IHt9XG4gIGNvbnN0IGV2ZW50cyA9IG9wdGlvbnMuZXZlbnRzIHx8IHt9XG4gIGZvciAoY29uc3QgdHlwZTEgaW4gZXZlbnRzKSB7XG4gICAgdGhpcy4kb24odHlwZTEsIGV2ZW50c1t0eXBlMV0pXG4gIH1cbiAgZm9yIChjb25zdCB0eXBlMiBpbiBleHRlcm5hbEV2ZW50cykge1xuICAgIHRoaXMuJG9uKHR5cGUyLCBleHRlcm5hbEV2ZW50c1t0eXBlMl0pXG4gIH1cbiAgTElGRV9DWUNMRV9UWVBFUy5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgdGhpcy4kb24oYGhvb2s6JHt0eXBlfWAsIG9wdGlvbnNbdHlwZV0pXG4gIH0pXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAvVXNlcnMvemhhb2ppbmppYW5nL1NpdGVzL3B1YmxpYy93ZWV4L3NyYy9qcy1mcmFtZXdvcmsvbGliL3ZtL2V2ZW50cy5qc1xuICoqLyIsImxldCBuYXRpdmVNb2R1bGVzID0ge31cblxuZnVuY3Rpb24gYXNzaWduTW9kdWxlcyhtb2R1bGVzLCBpZlJlcGxhY2UpIHtcblxuICBmb3IgKGNvbnN0IG1vZHVsZU5hbWUgaW4gbW9kdWxlcykge1xuXG4gICAgLy8gaW5pdCBgbW9kdWxlc1ttb2R1bGVOYW1lXVtdYFxuICAgIGxldCBtZXRob2RzID0gbmF0aXZlTW9kdWxlc1ttb2R1bGVOYW1lXVxuICAgIGlmICghbWV0aG9kcykge1xuICAgICAgbWV0aG9kcyA9IHt9XG4gICAgICBuYXRpdmVNb2R1bGVzW21vZHVsZU5hbWVdID0gbWV0aG9kc1xuICAgIH1cblxuICAgIC8vIHB1c2ggZWFjaCBub24tZXhpc3RlZCBuZXcgbWV0aG9kXG4gICAgbW9kdWxlc1ttb2R1bGVOYW1lXS5mb3JFYWNoKGZ1bmN0aW9uIChtZXRob2QpIHtcbiAgICAgIGlmICh0eXBlb2YgbWV0aG9kID09PSAnc3RyaW5nJykge1xuICAgICAgICBtZXRob2QgPSB7XG4gICAgICAgICAgbmFtZTogbWV0aG9kXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCFtZXRob2RzW21ldGhvZC5uYW1lXSB8fCBpZlJlcGxhY2UpIHtcbiAgICAgICAgbWV0aG9kc1ttZXRob2QubmFtZV0gPSBtZXRob2RcbiAgICAgIH1cbiAgICB9KVxuICB9XG59XG5cbmZ1bmN0aW9uIGFzc2lnbkFwaXMoQ3RvciwgYXBpcykge1xuICBjb25zdCBwID0gQ3Rvci5wcm90b3R5cGVcblxuICBmb3IgKGNvbnN0IGFwaU5hbWUgaW4gYXBpcykge1xuICAgIGlmICghcC5oYXNPd25Qcm9wZXJ0eShhcGlOYW1lKSkge1xuICAgICAgcFthcGlOYW1lXSA9IGFwaXNbYXBpTmFtZV1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyTW9kdWxlcygpIHtcbiAgbmF0aXZlTW9kdWxlcyA9IHt9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRNb2R1bGUobW9kdWxlTmFtZSkge1xuICByZXR1cm4gbmF0aXZlTW9kdWxlc1ttb2R1bGVOYW1lXVxufVxuXG4vKipcbiAqIEBjb250ZXh0IGEgaW5zdGFuY2Ugb2YgQXBwSW5zdGFuY2VcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlcXVpcmVNb2R1bGUobW9kdWxlTmFtZSkge1xuICBjb25zdCBtZXRob2RzID0gbmF0aXZlTW9kdWxlc1ttb2R1bGVOYW1lXVxuICBjb25zdCB0YXJnZXQgPSB7fVxuXG4gIGZvciAoY29uc3QgbWV0aG9kTmFtZSBpbiBtZXRob2RzKSB7XG4gICAgdGFyZ2V0W21ldGhvZE5hbWVdID0gKC4uLmFyZ3MpID0+IHRoaXMuY2FsbFRhc2tzKHtcbiAgICAgIG1vZHVsZTogbW9kdWxlTmFtZSxcbiAgICAgIG1ldGhvZDogbWV0aG9kTmFtZSxcbiAgICAgIGFyZ3M6IGFyZ3NcbiAgICB9KVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldFxufVxuXG4vKipcbiAqIEBjb250ZXh0IFZtXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3Rlck1vZHVsZXMobW9kdWxlcywgaWZSZXBsYWNlKSB7XG4gIGFzc2lnbk1vZHVsZXMobW9kdWxlcywgaWZSZXBsYWNlKVxufVxuXG4vKipcbiAqIEBjb250ZXh0IFZtXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3Rlck1ldGhvZHMoYXBpcykge1xuICBhc3NpZ25BcGlzKHRoaXMsIGFwaXMpXG59XG5cbi8qKlxuICogQGNvbnRleHQgYSBpbnN0YW5jZSBvZiBBcHBJbnN0YW5jZVxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVxdWlyZUNvbXBvbmVudChuYW1lKSB7XG4gIGNvbnN0IHtjdXN0b21Db21wb25lbnRNYXB9ID0gdGhpc1xuICByZXR1cm4gY3VzdG9tQ29tcG9uZW50TWFwW25hbWVdXG59XG5cbi8qKlxuICogQGNvbnRleHQgYSBpbnN0YW5jZSBvZiBBcHBJbnN0YW5jZVxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJDb21wb25lbnQobmFtZSwgZXhwb3J0cykge1xuICBjb25zdCB7Y3VzdG9tQ29tcG9uZW50TWFwfSA9IHRoaXNcblxuICBpZiAoY3VzdG9tQ29tcG9uZW50TWFwW25hbWVdKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBkZWZpbmUgYSBjb21wb25lbnQoJHtuYW1lfSkgdGhhdCBhbHJlYWR5IGV4aXN0c2ApXG4gIH1cblxuICBjdXN0b21Db21wb25lbnRNYXBbbmFtZV0gPSBleHBvcnRzXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogL1VzZXJzL3poYW9qaW5qaWFuZy9TaXRlcy9wdWJsaWMvd2VleC9zcmMvanMtZnJhbWV3b3JrL2xpYi9hcHAvcmVnaXN0ZXIuanNcbiAqKi8iLCJpbXBvcnQgc2VtdmVyIGZyb20gJ3NlbXZlcidcbmltcG9ydCB7ZXh0ZW5kLCBpc1BsYWluT2JqZWN0LCB0eXBvZn0gIGZyb20gJy4uL3V0aWwnXG5cbi8qKlxuICogW25vcm1hbGl6ZVZlcnNpb24gZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtTdHJpbmd9IFZlcnNpb24uIGllOiAxLCAxLjAsIDEuMC4wXG4gKiBAcmV0dXJuIHtTdHJpbmd9IFZlcnNpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZVZlcnNpb24gKHYpIHtcbiAgY29uc3QgaXNWYWxpZCA9IHNlbXZlci52YWxpZCh2KSA/IHRydWUgOiBmYWxzZVxuICBpZiAoaXNWYWxpZCkge1xuICAgIHJldHVybiB2XG4gIH1cblxuICB2ID0gdHlwZW9mICh2KSA9PT0gJ3N0cmluZycgPyB2IDogJydcbiAgY29uc3Qgc3BsaXQgPSB2LnNwbGl0KCcuJylcbiAgbGV0IGkgPSAwXG4gIGxldCByZXN1bHQgPSBbXVxuXG4gIHdoaWxlIChpIDwgMykge1xuICAgIGNvbnN0IHMgPSB0eXBlb2YgKHNwbGl0W2ldKSA9PT0gJ3N0cmluZycgJiYgc3BsaXRbaV0gPyBzcGxpdFtpXSA6ICcwJ1xuICAgIHJlc3VsdC5wdXNoKHMpXG4gICAgaSsrXG4gIH1cblxuICByZXR1cm4gcmVzdWx0LmpvaW4oJy4nKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RXJyb3IgKGtleSwgdmFsLCBjcml0ZXJpYSkge1xuICBsZXQgcmVzdWx0ID0ge1xuICAgIGlzRG93bmdyYWRlOiB0cnVlLFxuICAgIGVycm9yVHlwZTogMSxcbiAgICBjb2RlOiAxMDAwXG4gIH1cbiAgbGV0IGdldE1zZyA9IGZ1bmN0aW9uIChrZXksIHZhbCwgY3JpdGVyaWEpIHtcbiAgICByZXR1cm4gJ0Rvd25ncmFkZVsnICsga2V5ICsgJ10gOjogZGV2aWNlSW5mbyAnXG4gICAgICArIHZhbCArICcgbWF0Y2hlZCBjcml0ZXJpYSAnICsgY3JpdGVyaWFcbiAgfVxuICBjb25zdCBfa2V5ID0ga2V5LnRvTG93ZXJDYXNlKClcblxuICByZXN1bHQuZXJyb3JNZXNzYWdlID0gZ2V0TXNnKGtleSwgdmFsLCBjcml0ZXJpYSlcblxuICBpZiAoX2tleS5pbmRleE9mKCdvc3ZlcnNpb24nKSA+PSAwKSB7XG4gICAgcmVzdWx0LmNvZGUgPSAxMDAxXG4gIH1lbHNlIGlmIChfa2V5LmluZGV4T2YoJ2FwcHZlcnNpb24nKSA+PSAwKSB7XG4gICAgcmVzdWx0LmNvZGUgPSAxMDAyXG4gIH1lbHNlIGlmIChfa2V5LmluZGV4T2YoJ3dlZXh2ZXJzaW9uJykgPj0gMCkge1xuICAgIHJlc3VsdC5jb2RlID0gMTAwM1xuICB9ZWxzZSBpZiAoX2tleS5pbmRleE9mKCdkZXZpY2Vtb2RlbCcpID49IDApIHtcbiAgICByZXN1bHQuY29kZSA9IDEwMDRcbiAgfVxuXG4gIHJldHVybiByZXN1bHRcbn1cblxuLyoqXG4gKiBXRUVYIGZyYW1ld29yayBpbnB1dChkZXZpY2VJbmZvKVxuICoge1xuICogICBwbGF0Zm9ybTogJ2lPUycgb3IgJ2FuZHJvaWQnXG4gKiAgIG9zVmVyc2lvbjogJzEuMC4wJyBvciAnMS4wJyBvciAnMSdcbiAqICAgYXBwVmVyc2lvbjogJzEuMC4wJyBvciAnMS4wJyBvciAnMSdcbiAqICAgd2VleFZlcnNpb246ICcxLjAuMCcgb3IgJzEuMCcgb3IgJzEnXG4gKiAgIGREZXZpY2VNb2RlbDogJ01PREVMX05BTUUnXG4gKiB9XG4gKlxuICogZG93bmdyYWRlIGNvbmZpZyhjb25maWcpXG4gKiB7XG4gKiAgIGlvczoge1xuICogICAgIG9zVmVyc2lvbjogJz4xLjAuMCcgb3IgJz49MS4wLjAnIG9yICc8MS4wLjAnIG9yICc8PTEuMC4wJyBvciAnMS4wLjAnXG4gKiAgICAgYXBwVmVyc2lvbjogJz4xLjAuMCcgb3IgJz49MS4wLjAnIG9yICc8MS4wLjAnIG9yICc8PTEuMC4wJyBvciAnMS4wLjAnXG4gKiAgICAgd2VleFZlcnNpb246ICc+MS4wLjAnIG9yICc+PTEuMC4wJyBvciAnPDEuMC4wJyBvciAnPD0xLjAuMCcgb3IgJzEuMC4wJ1xuICogICAgIGRldmljZU1vZGVsOiBbJ21vZGVsQScsICdtb2RlbEInLCAuLi5dXG4gKiAgIH0sXG4gKiAgIGFuZHJvaWQ6IHtcbiAqICAgICBvc1ZlcnNpb246ICc+MS4wLjAnIG9yICc+PTEuMC4wJyBvciAnPDEuMC4wJyBvciAnPD0xLjAuMCcgb3IgJzEuMC4wJ1xuICogICAgIGFwcFZlcnNpb246ICc+MS4wLjAnIG9yICc+PTEuMC4wJyBvciAnPDEuMC4wJyBvciAnPD0xLjAuMCcgb3IgJzEuMC4wJ1xuICogICAgIHdlZXhWZXJzaW9uOiAnPjEuMC4wJyBvciAnPj0xLjAuMCcgb3IgJzwxLjAuMCcgb3IgJzw9MS4wLjAnIG9yICcxLjAuMCdcbiAqICAgICBkZXZpY2VNb2RlbDogWydtb2RlbEEnLCAnbW9kZWxCJywgLi4uXVxuICogICB9XG4gKiB9XG4gKlxuICpcbiAqIEBwYXJhbSAge29iamVjdH0gZGV2aWNlSW5mbyBXZWV4IFNESyBmcmFtZXdvcmsgaW5wdXRcbiAqIEBwYXJhbSAge29iamVjdH0gY29uZmlnICAgICB1c2VyIGlucHV0XG4gKiBAcmV0dXJuIHtPYmplY3R9ICAgICAgICAgICAgeyBpc0Rvd25ncmFkZTogdHJ1ZS9mYWxzZSwgZXJyb3JNZXNzYWdlLi4uIH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrIChjb25maWcsIGRldmljZUluZm8pIHtcbiAgZGV2aWNlSW5mbyA9IGRldmljZUluZm8gfHwgZ2xvYmFsLldYRW52aXJvbm1lbnRcbiAgZGV2aWNlSW5mbyA9IGlzUGxhaW5PYmplY3QoZGV2aWNlSW5mbykgPyBkZXZpY2VJbmZvIDoge31cbiAgY29uZmlnID0gaXNQbGFpbk9iamVjdChjb25maWcpID8gY29uZmlnIDoge31cbiAgY29uc3QgcGxhdGZvcm0gPSBkZXZpY2VJbmZvLnBsYXRmb3JtIHx8ICd1bmtub3cnXG4gIGNvbnN0IGRQbGF0Zm9ybSA9IHBsYXRmb3JtLnRvTG93ZXJDYXNlKClcbiAgY29uc3QgY09iaiA9IGNvbmZpZ1tkUGxhdGZvcm1dIHx8IHt9XG5cbiAgbGV0IHJlc3VsdCA9IHtcbiAgICBpc0Rvd25ncmFkZTogZmFsc2UgLy8gZGVmYXV0bCBpcyBwYXNzXG4gIH1cblxuICBmb3IgKGxldCBpIGluIGRldmljZUluZm8pIHtcbiAgICBjb25zdCBrZXkgPSBpXG4gICAgY29uc3Qga2V5TG93ZXIgPSBrZXkudG9Mb3dlckNhc2UoKVxuICAgIGNvbnN0IHZhbCA9IGRldmljZUluZm9baV1cbiAgICBjb25zdCBpc1ZlcnNpb24gPSBrZXlMb3dlci5pbmRleE9mKCd2ZXJzaW9uJykgPj0gMCA/IHRydWUgOiBmYWxzZVxuICAgIGNvbnN0IGlzRGV2aWNlTW9kZWwgPSBrZXlMb3dlci5pbmRleE9mKCdkZXZpY2Vtb2RlbCcpID49IDAgPyB0cnVlIDogZmFsc2VcbiAgICBjb25zdCBjcml0ZXJpYSA9IGNPYmpbaV1cblxuICAgIGlmIChjcml0ZXJpYSAmJiBpc1ZlcnNpb24pIHtcbiAgICAgIGNvbnN0IGMgPSB0aGlzLm5vcm1hbGl6ZVZlcnNpb24oY3JpdGVyaWEpXG4gICAgICBjb25zdCBkID0gdGhpcy5ub3JtYWxpemVWZXJzaW9uKGRldmljZUluZm9baV0pXG5cbiAgICAgIGlmIChzZW12ZXIuc2F0aXNmaWVzKGQsIGMpKSB7XG4gICAgICAgIHJlc3VsdCA9IGV4dGVuZCh0aGlzLmdldEVycm9yKGtleSwgdmFsLCBjcml0ZXJpYSkpXG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgfWVsc2UgaWYgKGlzRGV2aWNlTW9kZWwpIHtcbiAgICAgIGNvbnN0IF9jcml0ZXJpYSA9IHR5cG9mKGNyaXRlcmlhKSA9PT0gJ2FycmF5JyA/IGNyaXRlcmlhIDogW2NyaXRlcmlhXVxuICAgICAgaWYgKF9jcml0ZXJpYS5pbmRleE9mKHZhbCkgPj0gMCkge1xuICAgICAgICByZXN1bHQgPSBleHRlbmQodGhpcy5nZXRFcnJvcihrZXksIHZhbCwgY3JpdGVyaWEpKVxuICAgICAgICBicmVha1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHRcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAvVXNlcnMvemhhb2ppbmppYW5nL1NpdGVzL3B1YmxpYy93ZWV4L3NyYy9qcy1mcmFtZXdvcmsvbGliL2FwcC9kb3duZ3JhZGUuanNcbiAqKi8iLCIvKipcbiAqIEBmaWxlT3ZlcnZpZXdcbiAqIGluc3RhbmNlIGNvbnRyb2xzIGZyb20gbmF0aXZlXG4gKlxuICogLSBpbml0IGJ1bmRsZVxuICogLSBmaXJlIGV2ZW50XG4gKiAtIGNhbGxiYWNrXG4gKiAtIGRlc3Ryb3lcbiAqXG4gKiBjb3JyZXNwb25kZWQgd2l0aCB0aGUgQVBJIG9mIGluc3RhbmNlIG1hbmFnZXIgKGZyYW1ld29yay5qcylcbiAqL1xuXG5pbXBvcnQgKiBhcyBfIGZyb20gJy4uL3V0aWwnXG5pbXBvcnQgTGlzdGVuZXIgZnJvbSAnLi9kb20tbGlzdGVuZXInXG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVBY3Rpb25zKCkge1xuICB0aGlzLmRpZmZlci5mbHVzaCgpXG4gIGNvbnN0IHRhc2tzID0gW11cbiAgaWYgKHRoaXMubGlzdGVuZXIgJiYgdGhpcy5saXN0ZW5lci51cGRhdGVzLmxlbmd0aCkge1xuICAgIHRhc2tzLnB1c2goLi4udGhpcy5saXN0ZW5lci51cGRhdGVzKVxuICAgIHRoaXMubGlzdGVuZXIudXBkYXRlcyA9IFtdXG4gIH1cbiAgaWYgKHRhc2tzLmxlbmd0aCkge1xuICAgIHRoaXMuY2FsbFRhc2tzKHRhc2tzKVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0KGNvZGUsIGRhdGEpIHtcbiAgXy5kZWJ1ZygnSW50aWFsaXplIGFuIGluc3RhbmNlIHdpdGg6XFxuJywgY29kZSwgZGF0YSlcblxuICB2YXIgcmVzdWx0XG4gIC8vIEBzZWU6IGxpYi9hcHAvYnVuZGxlLmpzXG4gIGNvbnN0IGRlZmluZSA9IF8uYmluZCh0aGlzLmRlZmluZSwgdGhpcylcbiAgY29uc3QgYm9vdHN0cmFwID0gKG5hbWUsIGNvbmZpZywgX2RhdGEpID0+IHtcbiAgICByZXN1bHQgPSB0aGlzLmJvb3RzdHJhcChuYW1lLCBjb25maWcsIF9kYXRhIHx8IGRhdGEpXG4gICAgdGhpcy51cGRhdGVBY3Rpb25zKClcbiAgICB0aGlzLmRvYy5saXN0ZW5lci5jcmVhdGVGaW5pc2goKVxuICAgIHRoaXMuZG9jLmNsb3NlKClcbiAgICBfLmRlYnVnKGBBZnRlciBpbnRpYWxpemVkIGFuIGluc3RhbmNlKCR7dGhpcy5pZH0pYClcbiAgfVxuXG4gIC8vIGJhY2t3YXJkKHJlZ2lzdGVyL3JlbmRlcilcbiAgY29uc3QgcmVnaXN0ZXIgPSBfLmJpbmQodGhpcy5yZWdpc3RlciwgdGhpcylcbiAgY29uc3QgcmVuZGVyID0gKG5hbWUsIF9kYXRhKSA9PiB7XG4gICAgcmVzdWx0ID0gdGhpcy5ib290c3RyYXAobmFtZSwge30sIF9kYXRhKVxuICB9XG5cbiAgY29uc3QgcmVxdWlyZSA9IG5hbWUgPT4gX2RhdGEgPT4ge1xuICAgIHJlc3VsdCA9IHRoaXMuYm9vdHN0cmFwKG5hbWUsIHt9LCBfZGF0YSlcbiAgfVxuXG4gIGNvbnN0IGRvY3VtZW50ID0gdGhpcy5kb2NcblxuICBsZXQgZnVuY3Rpb25Cb2R5XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICBpZiAodHlwZW9mIGNvZGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAvLyBgZnVuY3Rpb24gKCkgey4uLn1gIC0+IGB7Li4ufWBcbiAgICAvLyBub3QgdmVyeSBzdHJpY3RcbiAgICBmdW5jdGlvbkJvZHkgPSBjb2RlLnRvU3RyaW5nKCkuc3Vic3RyKDEyKVxuICB9IGVsc2UgaWYgKGNvZGUpIHtcbiAgICBmdW5jdGlvbkJvZHkgPSBjb2RlLnRvU3RyaW5nKClcbiAgfVxuXG4gIGNvbnN0IHsgV1hFbnZpcm9ubWVudCB9ID0gZ2xvYmFsXG4gIGlmIChXWEVudmlyb25tZW50ICYmIFdYRW52aXJvbm1lbnQucGxhdGZvcm0gIT09ICdXZWInKSB7XG4gICAgY29uc3QgdGltZXIgPSB0aGlzLnJlcXVpcmVNb2R1bGUoJ3RpbWVyJylcbiAgICBjb25zdCB0aW1lckFQSXMgPSB7XG4gICAgICBzZXRUaW1lb3V0OiAoLi4uYXJncykgPT4ge1xuICAgICAgICBjb25zdCBoYW5kbGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGFyZ3NbMF0oLi4uYXJncy5zbGljZSgyKSlcbiAgICAgICAgfVxuICAgICAgICB0aW1lci5zZXRUaW1lb3V0KGhhbmRsZXIsIGFyZ3NbMV0pXG4gICAgICAgIHJldHVybiB0aGlzLnVpZC50b1N0cmluZygpXG4gICAgICB9LFxuICAgICAgc2V0SW50ZXJ2YWw6ICguLi5hcmdzKSA9PiB7XG4gICAgICAgIGNvbnN0IGhhbmRsZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgYXJnc1swXSguLi5hcmdzLnNsaWNlKDIpKVxuICAgICAgICB9XG4gICAgICAgIHRpbWVyLnNldEludGVydmFsKGhhbmRsZXIsIGFyZ3NbMV0pXG4gICAgICAgIHJldHVybiB0aGlzLnVpZC50b1N0cmluZygpXG4gICAgICB9LFxuICAgICAgY2xlYXJUaW1lb3V0OiAobikgPT4ge1xuICAgICAgICB0aW1lci5jbGVhclRpbWVvdXQobilcbiAgICAgIH0sXG4gICAgICBjbGVhckludGVydmFsOiAobikgPT4ge1xuICAgICAgICB0aW1lci5jbGVhckludGVydmFsKG4pXG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgZm4gPSBuZXcgRnVuY3Rpb24oXG4gICAgICAnZGVmaW5lJyxcbiAgICAgICdyZXF1aXJlJyxcbiAgICAgICdkb2N1bWVudCcsXG4gICAgICAnYm9vdHN0cmFwJyxcbiAgICAgICdyZWdpc3RlcicsXG4gICAgICAncmVuZGVyJyxcbiAgICAgICdfX3dlZXhfZGVmaW5lX18nLCAvLyBhbGlhcyBmb3IgZGVmaW5lXG4gICAgICAnX193ZWV4X2Jvb3RzdHJhcF9fJywgLy8gYWxpYXMgZm9yIGJvb3RzdHJhcFxuICAgICAgJ3NldFRpbWVvdXQnLFxuICAgICAgJ3NldEludGVydmFsJyxcbiAgICAgICdjbGVhclRpbWVvdXQnLFxuICAgICAgJ2NsZWFySW50ZXJ2YWwnLFxuICAgICAgZnVuY3Rpb25Cb2R5XG4gICAgKVxuXG4gICAgZm4oXG4gICAgICBkZWZpbmUsXG4gICAgICByZXF1aXJlLFxuICAgICAgZG9jdW1lbnQsXG4gICAgICBib290c3RyYXAsXG4gICAgICByZWdpc3RlcixcbiAgICAgIHJlbmRlcixcbiAgICAgIGRlZmluZSxcbiAgICAgIGJvb3RzdHJhcCxcbiAgICAgIHRpbWVyQVBJcy5zZXRUaW1lb3V0LFxuICAgICAgdGltZXJBUElzLnNldEludGVydmFsLFxuICAgICAgdGltZXJBUElzLmNsZWFyVGltZW91dCxcbiAgICAgIHRpbWVyQVBJcy5jbGVhckludGVydmFsKVxuICB9XG4gIGVsc2Uge1xuICAgIGNvbnN0IGZuID0gbmV3IEZ1bmN0aW9uKFxuICAgICAgJ2RlZmluZScsXG4gICAgICAncmVxdWlyZScsXG4gICAgICAnZG9jdW1lbnQnLFxuICAgICAgJ2Jvb3RzdHJhcCcsXG4gICAgICAncmVnaXN0ZXInLFxuICAgICAgJ3JlbmRlcicsXG4gICAgICAnX193ZWV4X2RlZmluZV9fJywgLy8gYWxpYXMgZm9yIGRlZmluZVxuICAgICAgJ19fd2VleF9ib290c3RyYXBfXycsIC8vIGFsaWFzIGZvciBib290c3RyYXBcbiAgICAgIGZ1bmN0aW9uQm9keVxuICAgIClcblxuICAgIGZuKFxuICAgICAgZGVmaW5lLFxuICAgICAgcmVxdWlyZSxcbiAgICAgIGRvY3VtZW50LFxuICAgICAgYm9vdHN0cmFwLFxuICAgICAgcmVnaXN0ZXIsXG4gICAgICByZW5kZXIsXG4gICAgICBkZWZpbmUsXG4gICAgICBib290c3RyYXApXG4gIH1cblxuICByZXR1cm4gcmVzdWx0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXN0cm95KCkge1xuICBfLmRlYnVnKGBEZXN0b3J5IGFuIGluc3RhbmNlKCR7dGhpcy5pZH0pYClcblxuICB0aGlzLmlkID0gJydcbiAgdGhpcy5ldmVudE1hbmFnZXIgPSBudWxsXG4gIHRoaXMub3B0aW9ucyA9IG51bGxcbiAgdGhpcy5ibG9ja3MgPSBudWxsXG4gIHRoaXMudm0gPSBudWxsXG4gIHRoaXMuZG9jID0gbnVsbFxuICB0aGlzLmN1c3RvbUNvbXBvbmVudE1hcCA9IG51bGxcbiAgdGhpcy5jYWxsYmFja3MgPSBudWxsXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRSb290RWxlbWVudCgpIHtcbiAgY29uc3QgZG9jID0gdGhpcy5kb2MgfHwge31cbiAgY29uc3QgYm9keSA9IGRvYy5ib2R5IHx8IHt9XG4gIHJldHVybiBib2R5LnRvSlNPTiA/IGJvZHkudG9KU09OKCkgOiB7fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZmlyZUV2ZW50KHJlZiwgdHlwZSwgZSwgZG9tQ2hhbmdlcykge1xuICBfLmRlYnVnKGBGaXJlIGEgXCIke3R5cGV9XCIgZXZlbnQgb24gYW4gZWxlbWVudCgke3JlZn0pYCxcbiAgICAgICAgICAgIGBpbiBpbnN0YW5jZSgke3RoaXMuaWR9KWApXG5cbiAgaWYgKEFycmF5LmlzQXJyYXkocmVmKSkge1xuICAgIHJlZi5zb21lKChyZWYpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLmZpcmVFdmVudChyZWYsIHR5cGUsIGUpICE9PSBmYWxzZVxuICAgIH0pXG4gICAgcmV0dXJuXG4gIH1cblxuICBjb25zdCBlbCA9IHRoaXMuZG9jLmdldFJlZihyZWYpXG5cbiAgaWYgKGVsKSB7XG4gICAgZSA9IGUgfHwge31cbiAgICBlLnR5cGUgPSB0eXBlXG4gICAgZS50YXJnZXQgPSBlbFxuICAgIGUudGltZXN0YW1wID0gRGF0ZS5ub3coKVxuICAgIGlmIChkb21DaGFuZ2VzKSB7XG4gICAgICB1cGRhdGVFbGVtZW50KGVsLCBkb21DaGFuZ2VzKVxuICAgIH1cbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLmV2ZW50TWFuYWdlci5maXJlKGVsLCB0eXBlLCBlKVxuICAgIHRoaXMudXBkYXRlQWN0aW9ucygpXG4gICAgdGhpcy5kb2MubGlzdGVuZXIudXBkYXRlRmluaXNoKClcbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cblxuICByZXR1cm4gbmV3IEVycm9yKGBpbnZhbGlkIGVsZW1lbnQgcmVmZXJlbmNlIFwiJHtyZWZ9XCJgKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FsbGJhY2soY2FsbGJhY2tJZCwgZGF0YSwgaWZLZWVwQWxpdmUpIHtcbiAgXy5kZWJ1ZyhgSW52b2tlIGEgY2FsbGJhY2soJHtjYWxsYmFja0lkfSkgd2l0aGAsIGRhdGEsXG4gICAgICAgICAgICBgaW4gaW5zdGFuY2UoJHt0aGlzLmlkfSlgKVxuXG4gIGNvbnN0IGNhbGxiYWNrID0gdGhpcy5jYWxsYmFja3NbY2FsbGJhY2tJZF1cblxuICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY2FsbGJhY2soZGF0YSkgLy8gZGF0YSBpcyBhbHJlYWR5IGEgb2JqZWN0LCBAc2VlOiBsaWIvcnVudGltZS9pbmRleC5qc1xuXG4gICAgaWYgKHR5cGVvZiBpZktlZXBBbGl2ZSA9PT0gJ3VuZGVmaW5lZCcgfHwgaWZLZWVwQWxpdmUgPT09IGZhbHNlKSB7XG4gICAgICB0aGlzLmNhbGxiYWNrc1tjYWxsYmFja0lkXSA9IHVuZGVmaW5lZFxuICAgIH1cblxuICAgIHRoaXMudXBkYXRlQWN0aW9ucygpXG4gICAgdGhpcy5kb2MubGlzdGVuZXIudXBkYXRlRmluaXNoKClcbiAgICByZXR1cm5cbiAgfVxuXG4gIHJldHVybiBuZXcgRXJyb3IoYGludmFsaWQgY2FsbGJhY2sgaWQgXCIke2NhbGxiYWNrSWR9XCJgKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVmcmVzaERhdGEoZGF0YSkge1xuICBfLmRlYnVnKGBSZWZyZXNoIHdpdGhgLCBkYXRhLFxuICAgICAgICAgICAgYGluIGluc3RhbmNlWyR7dGhpcy5pZH1dYClcblxuICBjb25zdCB2bSA9IHRoaXMudm1cblxuICBpZiAodm0gJiYgZGF0YSkge1xuICAgIGlmICh0eXBlb2Ygdm0ucmVmcmVzaERhdGEgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHZtLnJlZnJlc2hEYXRhKGRhdGEpXG4gICAgfSBlbHNlIHtcbiAgICAgIF8uZXh0ZW5kKHZtLCBkYXRhKVxuICAgIH1cbiAgICB0aGlzLnVwZGF0ZUFjdGlvbnMoKVxuICAgIHRoaXMuZG9jLmxpc3RlbmVyLnJlZnJlc2hGaW5pc2goKVxuICAgIHJldHVyblxuICB9XG5cbiAgcmV0dXJuIG5ldyBFcnJvcihgaW52YWxpZCBkYXRhIFwiJHtkYXRhfVwiYClcbn1cblxuZnVuY3Rpb24gdXBkYXRlRWxlbWVudChlbCwgY2hhbmdlcykge1xuICBjb25zdCBhdHRycyA9IGNoYW5nZXMuYXR0cnMgfHwge31cbiAgZm9yIChjb25zdCBuYW1lIGluIGF0dHJzKSB7XG4gICAgZWwuc2V0QXR0cihuYW1lLCBhdHRyc1tuYW1lXSwgdHJ1ZSlcbiAgfVxuICBjb25zdCBzdHlsZSA9IGNoYW5nZXMuc3R5bGUgfHwge31cbiAgZm9yIChjb25zdCBuYW1lIGluIHN0eWxlKSB7XG4gICAgZWwuc2V0U3R5bGUobmFtZSwgc3R5bGVbbmFtZV0sIHRydWUpXG4gIH1cbn1cblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogL1VzZXJzL3poYW9qaW5qaWFuZy9TaXRlcy9wdWJsaWMvd2VleC9zcmMvanMtZnJhbWV3b3JrL2xpYi9hcHAvY3RybC5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIExpc3RlbmVyKGlkLCBoYW5kbGVyKSB7XG4gIHRoaXMuaWQgPSBpZFxuICB0aGlzLmJhdGNoZWQgPSBmYWxzZVxuICB0aGlzLnVwZGF0ZXMgPSBbXVxuICBpZiAodHlwZW9mIGhhbmRsZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICB0aGlzLmhhbmRsZXIgPSBoYW5kbGVyXG4gIH1cbn1cblxuTGlzdGVuZXIucHJvdG90eXBlLmNyZWF0ZUZpbmlzaCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICBjb25zdCBoYW5kbGVyID0gdGhpcy5oYW5kbGVyXG4gIGhhbmRsZXIoW2NyZWF0ZUFjdGlvbignY3JlYXRlRmluaXNoJywgW10pXSwgY2FsbGJhY2spXG59XG5cbkxpc3RlbmVyLnByb3RvdHlwZS51cGRhdGVGaW5pc2ggPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgY29uc3QgaGFuZGxlciA9IHRoaXMuaGFuZGxlclxuICBoYW5kbGVyKFtjcmVhdGVBY3Rpb24oJ3VwZGF0ZUZpbmlzaCcsIFtdKV0sIGNhbGxiYWNrKVxufVxuXG5MaXN0ZW5lci5wcm90b3R5cGUucmVmcmVzaEZpbmlzaCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICBjb25zdCBoYW5kbGVyID0gdGhpcy5oYW5kbGVyXG4gIGhhbmRsZXIoW2NyZWF0ZUFjdGlvbigncmVmcmVzaEZpbmlzaCcsIFtdKV0sIGNhbGxiYWNrKVxufVxuXG5MaXN0ZW5lci5wcm90b3R5cGUuY3JlYXRlQm9keSA9IGZ1bmN0aW9uIChlbGVtZW50LCByZWYpIHtcbiAgY29uc3QgYWN0aW9ucyA9IFtjcmVhdGVBY3Rpb24oJ2NyZWF0ZUJvZHknLCBbZWxlbWVudC50b0pTT04oKV0pXVxuICB0aGlzLmFkZEFjdGlvbnMoYWN0aW9ucylcbn1cblxuTGlzdGVuZXIucHJvdG90eXBlLmFkZEVsZW1lbnQgPSBmdW5jdGlvbiAoZWxlbWVudCwgcmVmLCBpbmRleCkge1xuICBpZiAoIShpbmRleCA+PSAwKSkge1xuICAgIGluZGV4ID0gLTFcbiAgfVxuICB0aGlzLmFkZEFjdGlvbnMoY3JlYXRlQWN0aW9uKCdhZGRFbGVtZW50JywgW3JlZiwgZWxlbWVudC50b0pTT04oKSwgaW5kZXhdKSlcbn1cblxuTGlzdGVuZXIucHJvdG90eXBlLnJlbW92ZUVsZW1lbnQgPSBmdW5jdGlvbiAocmVmKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHJlZikpIHtcbiAgICBjb25zdCBhY3Rpb25zID0gcmVmLm1hcCgocikgPT4gY3JlYXRlQWN0aW9uKCdyZW1vdmVFbGVtZW50JywgW3JdKSlcbiAgICB0aGlzLmFkZEFjdGlvbnMoYWN0aW9ucylcbiAgfVxuICBlbHNlIHtcbiAgICB0aGlzLmFkZEFjdGlvbnMoY3JlYXRlQWN0aW9uKCdyZW1vdmVFbGVtZW50JywgW3JlZl0pKVxuICB9XG59XG5cbkxpc3RlbmVyLnByb3RvdHlwZS5tb3ZlRWxlbWVudCA9IGZ1bmN0aW9uICh0YXJnZXRSZWYsIHBhcmVudFJlZiwgaW5kZXgpIHtcbiAgdGhpcy5hZGRBY3Rpb25zKGNyZWF0ZUFjdGlvbignbW92ZUVsZW1lbnQnLCBbdGFyZ2V0UmVmLCBwYXJlbnRSZWYsIGluZGV4XSkpXG59XG5cbkxpc3RlbmVyLnByb3RvdHlwZS5zZXRBdHRyID0gZnVuY3Rpb24gKHJlZiwga2V5LCB2YWx1ZSkge1xuICBjb25zdCByZXN1bHQgPSB7fVxuICByZXN1bHRba2V5XSA9IHZhbHVlXG4gIHRoaXMuYWRkQWN0aW9ucyhjcmVhdGVBY3Rpb24oJ3VwZGF0ZUF0dHJzJywgW3JlZiwgcmVzdWx0XSkpXG59XG5cbkxpc3RlbmVyLnByb3RvdHlwZS5zZXRTdHlsZSA9IGZ1bmN0aW9uIChyZWYsIGtleSwgdmFsdWUpIHtcbiAgY29uc3QgcmVzdWx0ID0ge31cbiAgcmVzdWx0W2tleV0gPSB2YWx1ZVxuICB0aGlzLmFkZEFjdGlvbnMoY3JlYXRlQWN0aW9uKCd1cGRhdGVTdHlsZScsIFtyZWYsIHJlc3VsdF0pKVxufVxuXG5MaXN0ZW5lci5wcm90b3R5cGUuc2V0U3R5bGVzID0gZnVuY3Rpb24gKHJlZiwgc3R5bGUpIHtcbiAgdGhpcy5hZGRBY3Rpb25zKGNyZWF0ZUFjdGlvbigndXBkYXRlU3R5bGUnLCBbcmVmLCBzdHlsZV0pKVxufVxuXG5MaXN0ZW5lci5wcm90b3R5cGUuYWRkRXZlbnQgPSBmdW5jdGlvbiAocmVmLCB0eXBlKSB7XG4gIHRoaXMuYWRkQWN0aW9ucyhjcmVhdGVBY3Rpb24oJ2FkZEV2ZW50JywgW3JlZiwgdHlwZV0pKVxufVxuXG5MaXN0ZW5lci5wcm90b3R5cGUucmVtb3ZlRXZlbnQgPSBmdW5jdGlvbiAocmVmLCB0eXBlKSB7XG4gIHRoaXMuYWRkQWN0aW9ucyhjcmVhdGVBY3Rpb24oJ3JlbW92ZUV2ZW50JywgW3JlZiwgdHlwZV0pKVxufVxuXG5MaXN0ZW5lci5wcm90b3R5cGUuaGFuZGxlciA9IGZ1bmN0aW9uIChhY3Rpb25zLCBjYikge1xuICBjYiAmJiBjYigpXG59XG5cbkxpc3RlbmVyLnByb3RvdHlwZS5hZGRBY3Rpb25zID0gZnVuY3Rpb24gKGFjdGlvbnMpIHtcbiAgY29uc3QgdXBkYXRlcyA9IHRoaXMudXBkYXRlc1xuICBjb25zdCBoYW5kbGVyID0gdGhpcy5oYW5kbGVyXG5cbiAgaWYgKCFBcnJheS5pc0FycmF5KGFjdGlvbnMpKSB7XG4gICAgYWN0aW9ucyA9IFthY3Rpb25zXVxuICB9XG5cbiAgaWYgKHRoaXMuYmF0Y2hlZCkge1xuICAgIHVwZGF0ZXMucHVzaC5hcHBseSh1cGRhdGVzLCBhY3Rpb25zKVxuICB9XG4gIGVsc2Uge1xuICAgIGhhbmRsZXIoYWN0aW9ucylcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQWN0aW9uKG5hbWUsIGFyZ3MpIHtcbiAgcmV0dXJuIHttb2R1bGU6ICdkb20nLCBtZXRob2Q6IG5hbWUsIGFyZ3M6IGFyZ3N9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAvVXNlcnMvemhhb2ppbmppYW5nL1NpdGVzL3B1YmxpYy93ZWV4L3NyYy9qcy1mcmFtZXdvcmsvbGliL2FwcC9kb20tbGlzdGVuZXIuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBEaWZmZXIge1xuICBjb25zdHJ1Y3RvciAoaWQpIHtcbiAgICB0aGlzLmlkID0gaWRcbiAgICB0aGlzLm1hcCA9IFtdXG4gICAgdGhpcy5ob29rcyA9IFtdXG4gIH1cbiAgaXNFbXB0eSAoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwLmxlbmd0aCA9PT0gMFxuICB9XG4gIGFwcGVuZCAodHlwZSwgZGVwdGgsIHJlZiwgaGFuZGxlcikge1xuICAgIGNvbnN0IG1hcCA9IHRoaXMubWFwXG4gICAgaWYgKCFtYXBbZGVwdGhdKSB7XG4gICAgICBtYXBbZGVwdGhdID0ge31cbiAgICB9XG4gICAgY29uc3QgZ3JvdXAgPSBtYXBbZGVwdGhdXG4gICAgaWYgKCFncm91cFt0eXBlXSkge1xuICAgICAgZ3JvdXBbdHlwZV0gPSB7fVxuICAgIH1cbiAgICBpZiAodHlwZSA9PT0gJ2VsZW1lbnQnKSB7XG4gICAgICBpZiAoIWdyb3VwW3R5cGVdW3JlZl0pIHtcbiAgICAgICAgZ3JvdXBbdHlwZV1bcmVmXSA9IFtdXG4gICAgICB9XG4gICAgICBncm91cFt0eXBlXVtyZWZdLnB1c2goaGFuZGxlcilcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBncm91cFt0eXBlXVtyZWZdID0gaGFuZGxlclxuICAgIH1cbiAgfVxuICBmbHVzaCAoKSB7XG4gICAgY29uc3QgbWFwID0gdGhpcy5tYXAuc2xpY2UoKVxuICAgIHRoaXMubWFwLmxlbmd0aCA9IDBcbiAgICBtYXAuZm9yRWFjaCgoZ3JvdXApID0+IHtcbiAgICAgIGNhbGxUeXBlTWFwKGdyb3VwLCAncmVwZWF0JylcbiAgICAgIGNhbGxUeXBlTWFwKGdyb3VwLCAnc2hvd24nKVxuICAgICAgY2FsbFR5cGVMaXN0KGdyb3VwLCAnZWxlbWVudCcpXG4gICAgfSlcblxuICAgIGNvbnN0IGhvb2tzID0gdGhpcy5ob29rcy5zbGljZSgpXG4gICAgdGhpcy5ob29rcy5sZW5ndGggPSAwXG4gICAgaG9va3MuZm9yRWFjaCgoZm4pID0+IHtcbiAgICAgIGZuKClcbiAgICB9KVxuXG4gICAgaWYgKCF0aGlzLmlzRW1wdHkoKSkge1xuICAgICAgdGhpcy5mbHVzaCgpXG4gICAgfVxuICB9XG4gIHRoZW4gKGZuKSB7XG4gICAgdGhpcy5ob29rcy5wdXNoKGZuKVxuICB9XG59XG5cbmZ1bmN0aW9uIGNhbGxUeXBlTWFwKGdyb3VwLCB0eXBlKSB7XG4gIGNvbnN0IG1hcCA9IGdyb3VwW3R5cGVdXG4gIGZvciAoY29uc3QgcmVmIGluIG1hcCkge1xuICAgIG1hcFtyZWZdKClcbiAgfVxufVxuXG5mdW5jdGlvbiBjYWxsVHlwZUxpc3QoZ3JvdXAsIHR5cGUpIHtcbiAgY29uc3QgbWFwID0gZ3JvdXBbdHlwZV1cbiAgZm9yIChjb25zdCByZWYgaW4gbWFwKSB7XG4gICAgY29uc3QgbGlzdCA9IG1hcFtyZWZdXG4gICAgbGlzdC5mb3JFYWNoKChoYW5kbGVyKSA9PiB7aGFuZGxlcigpfSlcbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogL1VzZXJzL3poYW9qaW5qaWFuZy9TaXRlcy9wdWJsaWMvd2VleC9zcmMvanMtZnJhbWV3b3JrL2xpYi9hcHAvZGlmZmVyLmpzXG4gKiovIiwiLyoqXG4gKiBAZmlsZU92ZXJ2aWV3IGV2ZW50IG1hbmFnZXJcbiAqL1xuXG5pbXBvcnQgKiBhcyBfIGZyb20gJy4uL3V0aWwnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEV2ZW50TWFuYWdlcigpIHtcbiAgdGhpcy5lbHMgPSBbXVxuICB0aGlzLnRhcmdldHMgPSBbXVxufVxuXG5FdmVudE1hbmFnZXIucHJvdG90eXBlLl9nZXQgPSBmdW5jdGlvbiAoZWwsIGZvcmNlKSB7XG4gIHZhciBpbmRleCA9IHRoaXMuZWxzLmluZGV4T2YoZWwpXG4gIHZhciB0YXJnZXRcbiAgaWYgKGluZGV4ID49IDApIHtcbiAgICB0YXJnZXQgPSB0aGlzLnRhcmdldHNbaW5kZXhdXG4gIH1cbiAgZWxzZSBpZiAoZm9yY2UpIHtcbiAgICB0YXJnZXQgPSB7ZWw6IGVsLCBldmVudHM6IHt9fVxuICAgIHRoaXMuZWxzLnB1c2goZWwpXG4gICAgdGhpcy50YXJnZXRzLnB1c2godGFyZ2V0KVxuICB9XG4gIHJldHVybiB0YXJnZXRcbn1cblxuRXZlbnRNYW5hZ2VyLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoZWwsIHR5cGUsIGhhbmRsZXIpIHtcbiAgaWYgKHR5cGVvZiBlbCAhPT0gJ29iamVjdCcgfHwgIWVsIHx8XG4gICAgdHlwZW9mIHR5cGUgIT09ICdzdHJpbmcnIHx8ICF0eXBlIHx8XG4gICAgdHlwZW9mIGhhbmRsZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm5cbiAgfVxuICB2YXIgdGFyZ2V0ID0gdGhpcy5fZ2V0KGVsLCB0cnVlKVxuICB0YXJnZXQuZXZlbnRzW3R5cGVdID0gaGFuZGxlclxufVxuXG5FdmVudE1hbmFnZXIucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIChlbCwgdHlwZSkge1xuICBpZiAodHlwZW9mIGVsICE9PSAnb2JqZWN0JyB8fCAhZWwgfHxcbiAgICB0eXBlb2YgdHlwZSAhPT0gJ3N0cmluZycgfHwgIXR5cGUpIHtcbiAgICByZXR1cm5cbiAgfVxuICB2YXIgdGFyZ2V0ID0gdGhpcy5fZ2V0KGVsKVxuICBpZiAodGFyZ2V0KSB7XG4gICAgZGVsZXRlIHRhcmdldC5ldmVudHNbdHlwZV1cbiAgfVxufVxuXG5FdmVudE1hbmFnZXIucHJvdG90eXBlLmZpcmUgPSBmdW5jdGlvbiAoZWwsIHR5cGUsIGUpIHtcbiAgdmFyIHRhcmdldCA9IHRoaXMuX2dldChlbClcbiAgdmFyIGhhbmRsZXIsIGVsXG4gIGlmICh0YXJnZXQpIHtcbiAgICBlbCA9IHRhcmdldC5lbFxuICAgIGhhbmRsZXIgPSB0YXJnZXQuZXZlbnRzW3R5cGVdXG4gICAgaWYgKHR5cGVvZiBoYW5kbGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gaGFuZGxlci5jYWxsKGVsLCBlKVxuICAgIH1cbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogL1VzZXJzL3poYW9qaW5qaWFuZy9TaXRlcy9wdWJsaWMvd2VleC9zcmMvanMtZnJhbWV3b3JrL2xpYi9hcHAvZXZlbnQuanNcbiAqKi8iLCIvKipcbiAqIEBmaWxlT3ZlcnZpZXdcbiAqIEEgc2ltcGxlIHZpcnR1YWwgZG9tIGltcGxlbWVudGF0aW9uXG4gKi9cblxuY29uc3QgREVGQVVMVF9UQUdfTkFNRSA9ICdkaXYnXG5cbmV4cG9ydCBjb25zdCBpbnN0YW5jZU1hcCA9IHt9XG5cbmV4cG9ydCBmdW5jdGlvbiBEb2N1bWVudChpZCwgdXJsKSB7XG4gIGlkID0gaWQgPyBpZC50b1N0cmluZygpIDogJydcbiAgdGhpcy5pZCA9IGlkXG4gIHRoaXMuVVJMID0gdXJsXG4gIHRoaXMubmV4dFJlZiA9IDFcbiAgdGhpcy5ub2RlTWFwID0ge31cbiAgdGhpcy5saXN0ZW5lciA9IG51bGxcbiAgdGhpcy5ldmVudE1hbmFnZXIgPSBudWxsXG4gIHRoaXMuY2xvc2VkID0gZmFsc2VcbiAgaW5zdGFuY2VNYXBbaWRdID0gdGhpc1xuXG4gIHRoaXMuY3JlYXRlRG9jdW1lbnRFbGVtZW50KClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlc3Ryb3lEb2N1bWVudChpZCkge1xuICBkZWxldGUgaW5zdGFuY2VNYXBbaWRdXG59XG5cbkRvY3VtZW50LnByb3RvdHlwZS5vcGVuID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmNsb3NlZCA9IGZhbHNlXG4gIGlmICh0aGlzLmxpc3RlbmVyKSB7XG4gICAgdGhpcy5saXN0ZW5lci5iYXRjaGVkID0gZmFsc2VcbiAgfVxufVxuRG9jdW1lbnQucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmNsb3NlZCA9IHRydWVcbiAgaWYgKHRoaXMubGlzdGVuZXIpIHtcbiAgICB0aGlzLmxpc3RlbmVyLmJhdGNoZWQgPSB0cnVlXG4gIH1cbn1cblxuRG9jdW1lbnQucHJvdG90eXBlLnNldEV2ZW50TWFuYWdlciA9IGZ1bmN0aW9uIChldmVudE1hbmFnZXIpIHtcbiAgdGhpcy5ldmVudE1hbmFnZXIgPSBldmVudE1hbmFnZXJcbn1cblxuRG9jdW1lbnQucHJvdG90eXBlLnNldExpc3RlbmVyID0gZnVuY3Rpb24gKGxpc3RlbmVyKSB7XG4gIHRoaXMubGlzdGVuZXIgPSBsaXN0ZW5lclxuICBsaXN0ZW5lci5iYXRjaGVkID0gISF0aGlzLmNsb3NlZFxufVxuXG5Eb2N1bWVudC5wcm90b3R5cGUuYWRkUmVmID0gZnVuY3Rpb24gKGVsKSB7XG4gIGVsLnJlZiA9IHRoaXMubmV4dFJlZi50b1N0cmluZygpXG4gIHRoaXMubm9kZU1hcFtlbC5yZWZdID0gZWxcbiAgdGhpcy5uZXh0UmVmKytcbn1cblxuRG9jdW1lbnQucHJvdG90eXBlLmdldFJlZiA9IGZ1bmN0aW9uIChyZWYpIHtcbiAgcmV0dXJuIHRoaXMubm9kZU1hcFtyZWZdXG59XG5cbkRvY3VtZW50LnByb3RvdHlwZS5yZW1vdmVSZWYgPSBmdW5jdGlvbiAocmVmKSB7XG4gIGRlbGV0ZSB0aGlzLm5vZGVNYXBbcmVmXVxufVxuXG5Eb2N1bWVudC5wcm90b3R5cGUuY3JlYXRlRG9jdW1lbnRFbGVtZW50ID0gZnVuY3Rpb24gKHR5cGUsIHByb3BzKSB7XG4gIGlmICghdGhpcy5kb2N1bWVudEVsZW1lbnQpIHtcbiAgICB0aGlzLmRvY3VtZW50RWxlbWVudCA9IG5ldyBFbGVtZW50KHR5cGUsIHByb3BzLCB0aGlzKVxuICAgIHRoaXMubm9kZU1hcC5fZG9jdW1lbnRFbGVtZW50ID0gdGhpcy5kb2N1bWVudEVsZW1lbnRcbiAgICB0aGlzLmRvY3VtZW50RWxlbWVudC5yZWYgPSAnX2RvY3VtZW50RWxlbWVudCdcbiAgICB0aGlzLmRvY3VtZW50RWxlbWVudC5hdHRhY2hlZCA9IHRydWVcbiAgfVxuXG4gIHJldHVybiB0aGlzLmRvY3VtZW50RWxlbWVudFxufVxuXG5Eb2N1bWVudC5wcm90b3R5cGUuY3JlYXRlQm9keSA9IGZ1bmN0aW9uICh0eXBlLCBwcm9wcykge1xuICBpZiAoIXRoaXMuYm9keSkge1xuICAgIHRoaXMuYm9keSA9IG5ldyBFbGVtZW50KHR5cGUsIHByb3BzLCB0aGlzKVxuICAgIHRoaXMubm9kZU1hcC5fcm9vdCA9IHRoaXMuYm9keVxuICAgIHRoaXMuYm9keS5yZWYgPSAnX3Jvb3QnXG4gICAgdGhpcy5ib2R5LmRlcHRoID0gMVxuICB9XG5cbiAgcmV0dXJuIHRoaXMuYm9keVxufVxuXG5Eb2N1bWVudC5wcm90b3R5cGUuY3JlYXRlRWxlbWVudCA9IGZ1bmN0aW9uICh0YWdOYW1lLCBwcm9wcykge1xuICByZXR1cm4gbmV3IEVsZW1lbnQodGFnTmFtZSwgcHJvcHMsIHRoaXMpXG59XG5cbkRvY3VtZW50LnByb3RvdHlwZS5jcmVhdGVDb21tZW50ID0gZnVuY3Rpb24gKHRleHQpIHtcbiAgcmV0dXJuIG5ldyBDb21tZW50KHRleHQsIHRoaXMpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBOb2RlKCkge1xufVxuXG5Ob2RlLnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbiAoaW5zdGFuY2VJZCkge1xuICB0aGlzLnBhcmVudFJlZiA9IG51bGxcbiAgdGhpcy5hdHRhY2hlZCA9IGZhbHNlXG4gIGlmIChpbnN0YW5jZUlkKSB7XG4gICAgdGhpcy5pbnN0YW5jZUlkID0gaW5zdGFuY2VJZFxuICAgIGNvbnN0IGRvYyA9IGluc3RhbmNlTWFwW2luc3RhbmNlSWRdXG4gICAgZG9jLmFkZFJlZih0aGlzKVxuICB9XG59XG5cbk5vZGUucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IHJlZiA9IHRoaXMucmVmXG4gIGNvbnN0IGluc3RhbmNlSWQgPSB0aGlzLmluc3RhbmNlSWRcbiAgaWYgKGluc3RhbmNlSWQpIHtcbiAgICBjb25zdCBkb2MgPSBpbnN0YW5jZU1hcFtpbnN0YW5jZUlkXVxuICAgIGRvYy5yZW1vdmVSZWYocmVmKVxuICB9XG5cbiAgY29uc3QgY2hpbGRyZW4gPSB0aGlzLmNoaWxkcmVuIHx8IFtdXG4gIGNvbnN0IGxlbmd0aCA9IGNoaWxkcmVuLmxlbmd0aFxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgY2hpbGRyZW5baV0uZGVzdHJveSgpXG4gIH1cbn1cblxuTm9kZS5wcm90b3R5cGUuZ2V0UmVuZGVyZXIgPSBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IGRvYyA9IGluc3RhbmNlTWFwW3RoaXMuaW5zdGFuY2VJZF1cbiAgcmV0dXJuIGRvYy5saXN0ZW5lclxufVxuXG5Ob2RlLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24gKCkge1xuICBjb25zdCBpbnN0YW5jZUlkID0gdGhpcy5pbnN0YW5jZUlkXG4gIGNvbnN0IGRvYyA9IGluc3RhbmNlTWFwW2luc3RhbmNlSWRdXG4gIGNvbnN0IHBhcmVudCA9IGRvYy5nZXRSZWYodGhpcy5wYXJlbnRSZWYpXG4gIGlmIChwYXJlbnQpIHtcbiAgICByZXR1cm4gcGFyZW50LmNoaWxkcmVuW3BhcmVudC5jaGlsZHJlbi5pbmRleE9mKHRoaXMpICsgMV1cbiAgfVxufVxuXG5Ob2RlLnByb3RvdHlwZS5wcmV2ID0gZnVuY3Rpb24gKCkge1xuICBjb25zdCBpbnN0YW5jZUlkID0gdGhpcy5pbnN0YW5jZUlkXG4gIGNvbnN0IGRvYyA9IGluc3RhbmNlTWFwW2luc3RhbmNlSWRdXG4gIGNvbnN0IHBhcmVudCA9IGRvYy5nZXRSZWYodGhpcy5wYXJlbnRSZWYpXG4gIGlmIChwYXJlbnQpIHtcbiAgICByZXR1cm4gcGFyZW50LmNoaWxkcmVuW3BhcmVudC5jaGlsZHJlbi5pbmRleE9mKHRoaXMpIC0gMV1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gRWxlbWVudCh0eXBlPURFRkFVTFRfVEFHX05BTUUsIHByb3BzLCBvd25lckRvY3VtZW50KSB7XG4gIHByb3BzID0gcHJvcHMgfHwge31cbiAgdGhpcy5jcmVhdGUob3duZXJEb2N1bWVudC5pZClcbiAgdGhpcy5vd25lckRvY3VtZW50ID0gb3duZXJEb2N1bWVudFxuICB0aGlzLnR5cGUgPSB0eXBlXG4gIHRoaXMuYXR0ciA9IHByb3BzLmF0dHIgfHwge31cbiAgdGhpcy5jbGFzc1N0eWxlID0gcHJvcHMuY2xhc3NTdHlsZSB8fCB7fVxuICB0aGlzLnN0eWxlID0gcHJvcHMuc3R5bGUgfHwge31cbiAgdGhpcy5ldmVudCA9IFtdXG4gIHRoaXMuY2hpbGRyZW4gPSBbXVxuICB0aGlzLnB1cmVDaGlsZHJlbiA9IFtdXG59XG5cbkVsZW1lbnQucHJvdG90eXBlID0gbmV3IE5vZGUoKVxuXG5FbGVtZW50LnByb3RvdHlwZS5hcHBlbmRDaGlsZCA9IGZ1bmN0aW9uIChub2RlKSB7XG5cbiAgcmVtb3ZlSWZFeGlzdGVkKG5vZGUpXG4gIG5vZGUucGFyZW50UmVmID0gdGhpcy5yZWZcbiAgdGhpcy5jaGlsZHJlbi5wdXNoKG5vZGUpXG5cbiAgaWYgKHRoaXMuYXR0YWNoZWQpIHtcbiAgICBzZXRBdHRhY2hlZChub2RlLCB0aGlzLmRlcHRoKVxuICB9XG4gIGVsc2Uge1xuICAgIHNldERldGFjaGVkKG5vZGUpXG4gIH1cblxuICBpZiAobm9kZSBpbnN0YW5jZW9mIEVsZW1lbnQpIHtcbiAgICB0aGlzLnB1cmVDaGlsZHJlbi5wdXNoKG5vZGUpXG5cbiAgICBpZiAodGhpcy5hdHRhY2hlZCkge1xuICAgICAgY29uc3QgcmVuZGVyZXIgPSB0aGlzLmdldFJlbmRlcmVyKClcbiAgICAgIGlmIChyZW5kZXJlcikge1xuICAgICAgICBpZiAodGhpcy5yZWYgPT09ICdfZG9jdW1lbnRFbGVtZW50Jykge1xuICAgICAgICAgIC8vIGlmIGl0cyBwYXJlbnQgaXMgZG9jdW1lbnRFbGVtZW50IHRoZW4gaXQncyBhIGJvZHlcbiAgICAgICAgICByZW5kZXJlci5jcmVhdGVCb2R5KG5vZGUsIHRoaXMucmVmKVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHJlbmRlcmVyLmFkZEVsZW1lbnQobm9kZSwgdGhpcy5yZWYpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuRWxlbWVudC5wcm90b3R5cGUuaW5zZXJ0QmVmb3JlID0gZnVuY3Rpb24gKG5vZGUsIGJlZm9yZSkge1xuXG4gIGlmIChub2RlLnBhcmVudFJlZiA9PT0gdGhpcy5yZWYpIHtcbiAgICBtb3ZlQmVmb3JlKG5vZGUsIGJlZm9yZSwgdGhpcy5jaGlsZHJlbilcbiAgICBpZiAobm9kZSBpbnN0YW5jZW9mIEVsZW1lbnQpIHtcbiAgICAgIGNvbnN0IHB1cmVCZWZvcmVJbmRleCA9IG1vdmVQdXJlQmVmb3JlKG5vZGUsIGJlZm9yZSwgdGhpcy5wdXJlQ2hpbGRyZW4pXG4gICAgICBpZiAocHVyZUJlZm9yZUluZGV4ID49IDAgJiYgdGhpcy5hdHRhY2hlZCkge1xuICAgICAgICBjb25zdCByZW5kZXJlciA9IHRoaXMuZ2V0UmVuZGVyZXIoKVxuICAgICAgICBpZiAocmVuZGVyZXIpIHtcbiAgICAgICAgICByZW5kZXJlci5tb3ZlRWxlbWVudChub2RlLnJlZiwgdGhpcy5yZWYsIHB1cmVCZWZvcmVJbmRleClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm5cbiAgfVxuXG4gIHJlbW92ZUlmRXhpc3RlZChub2RlKVxuXG4gIGNvbnN0IGNoaWxkcmVuID0gdGhpcy5jaGlsZHJlblxuICBjb25zdCBpbmRleCA9IGNoaWxkcmVuLmluZGV4T2YoYmVmb3JlKVxuXG4gIG5vZGUucGFyZW50UmVmID0gdGhpcy5yZWZcbiAgaWYgKHRoaXMuYXR0YWNoZWQpIHtcbiAgICBzZXRBdHRhY2hlZChub2RlLCB0aGlzLmRlcHRoKVxuICB9XG4gIGVsc2Uge1xuICAgIHNldERldGFjaGVkKG5vZGUpXG4gIH1cbiAgY2hpbGRyZW4uc3BsaWNlKGluZGV4LCAwLCBub2RlKVxuXG4gIGlmIChub2RlIGluc3RhbmNlb2YgRWxlbWVudCkge1xuICAgIGNvbnN0IHB1cmVDaGlsZHJlbiA9IHRoaXMucHVyZUNoaWxkcmVuXG4gICAgY29uc3QgcHVyZUluZGV4ID0gZ2V0UHVyZUFmdGVyKGJlZm9yZSwgcHVyZUNoaWxkcmVuKVxuXG4gICAgcHVyZUNoaWxkcmVuLnNwbGljZShwdXJlSW5kZXgsIDAsIG5vZGUpXG5cbiAgICBpZiAodGhpcy5hdHRhY2hlZCkge1xuICAgICAgY29uc3QgcmVuZGVyZXIgPSB0aGlzLmdldFJlbmRlcmVyKClcbiAgICAgIGlmIChyZW5kZXJlcikge1xuICAgICAgICByZW5kZXJlci5hZGRFbGVtZW50KG5vZGUsIHRoaXMucmVmLCBwdXJlSW5kZXgpXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbkVsZW1lbnQucHJvdG90eXBlLmluc2VydEFmdGVyID0gZnVuY3Rpb24gKG5vZGUsIGFmdGVyKSB7XG5cbiAgaWYgKG5vZGUucGFyZW50UmVmID09PSB0aGlzLnJlZikge1xuICAgIG1vdmVBZnRlcihub2RlLCBhZnRlciwgdGhpcy5jaGlsZHJlbilcbiAgICBpZiAobm9kZSBpbnN0YW5jZW9mIEVsZW1lbnQpIHtcbiAgICAgIGNvbnN0IHB1cmVBZnRlckluZGV4ID0gbW92ZVB1cmVBZnRlcihub2RlLCBhZnRlciwgdGhpcy5wdXJlQ2hpbGRyZW4pXG4gICAgICBpZiAocHVyZUFmdGVySW5kZXggPj0gMCAmJiB0aGlzLmF0dGFjaGVkKSB7XG4gICAgICAgIGNvbnN0IHJlbmRlcmVyID0gdGhpcy5nZXRSZW5kZXJlcigpXG4gICAgICAgIGlmIChyZW5kZXJlcikge1xuICAgICAgICAgIHJlbmRlcmVyLm1vdmVFbGVtZW50KG5vZGUucmVmLCB0aGlzLnJlZiwgcHVyZUFmdGVySW5kZXgpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuXG4gIH1cblxuICByZW1vdmVJZkV4aXN0ZWQobm9kZSlcblxuICBjb25zdCBjaGlsZHJlbiA9IHRoaXMuY2hpbGRyZW5cbiAgY29uc3QgaW5kZXggPSBjaGlsZHJlbi5pbmRleE9mKGFmdGVyKVxuXG4gIG5vZGUucGFyZW50UmVmID0gdGhpcy5yZWZcbiAgaWYgKHRoaXMuYXR0YWNoZWQpIHtcbiAgICBzZXRBdHRhY2hlZChub2RlLCB0aGlzLmRlcHRoKVxuICB9IGVsc2Uge1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgc2V0RGV0YWNoZWQobm9kZSlcbiAgfVxuICBjaGlsZHJlbi5zcGxpY2UoaW5kZXggKyAxLCAwLCBub2RlKVxuXG4gIGlmIChub2RlIGluc3RhbmNlb2YgRWxlbWVudCkge1xuICAgIGNvbnN0IHB1cmVDaGlsZHJlbiA9IHRoaXMucHVyZUNoaWxkcmVuXG4gICAgY29uc3QgcHVyZUluZGV4ID0gZ2V0UHVyZUJlZm9yZShhZnRlciwgcHVyZUNoaWxkcmVuKVxuXG4gICAgcHVyZUNoaWxkcmVuLnNwbGljZShwdXJlSW5kZXggKyAxLCAwLCBub2RlKVxuXG4gICAgaWYgKHRoaXMuYXR0YWNoZWQpIHtcbiAgICAgIGNvbnN0IHJlbmRlcmVyID0gdGhpcy5nZXRSZW5kZXJlcigpXG4gICAgICBpZiAocmVuZGVyZXIpIHtcbiAgICAgICAgcmVuZGVyZXIuYWRkRWxlbWVudChub2RlLCB0aGlzLnJlZiwgcHVyZUluZGV4ICsgMSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuRWxlbWVudC5wcm90b3R5cGUucmVtb3ZlQ2hpbGQgPSBmdW5jdGlvbiAobm9kZSwgcHJlc2VydmVkKSB7XG4gIGNvbnN0IGNoaWxkcmVuID0gdGhpcy5jaGlsZHJlblxuICBjb25zdCBpbmRleCA9IGNoaWxkcmVuLmluZGV4T2Yobm9kZSlcblxuICBzZXREZXRhY2hlZChub2RlKVxuXG4gIGlmIChpbmRleCA+PSAwKSB7XG4gICAgbm9kZS5wYXJlbnRSZWYgPSBudWxsXG4gICAgY2hpbGRyZW4uc3BsaWNlKGluZGV4LCAxKVxuICAgIGlmICghcHJlc2VydmVkKSB7XG4gICAgICBub2RlLmRlc3Ryb3koKVxuICAgIH1cbiAgfVxuXG4gIGlmIChub2RlIGluc3RhbmNlb2YgRWxlbWVudCkge1xuICAgIHRoaXMucHVyZUNoaWxkcmVuLiRyZW1vdmUobm9kZSlcbiAgICBpZiAodGhpcy5hdHRhY2hlZCkge1xuICAgICAgY29uc3QgcmVuZGVyZXIgPSB0aGlzLmdldFJlbmRlcmVyKClcbiAgICAgIGlmIChyZW5kZXJlcikge1xuICAgICAgICByZW5kZXJlci5yZW1vdmVFbGVtZW50KG5vZGUucmVmKVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5FbGVtZW50LnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgY2hpbGRyZW4gPSB0aGlzLmNoaWxkcmVuXG4gIGNvbnN0IGxlbmd0aCA9IGNoaWxkcmVuLmxlbmd0aFxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgY2hpbGQgPSBjaGlsZHJlbltpXVxuICAgIGNoaWxkLnBhcmVudFJlZiA9IG51bGxcbiAgICBzZXREZXRhY2hlZChjaGlsZClcbiAgICBjaGlsZC5kZXN0cm95KClcbiAgfVxuICBjaGlsZHJlbi5sZW5ndGggPSAwXG5cbiAgaWYgKHRoaXMuYXR0YWNoZWQpIHtcbiAgICBjb25zdCByZWZzID0gdGhpcy5wdXJlQ2hpbGRyZW4ubWFwKChjaGlsZCkgPT4gY2hpbGQucmVmKVxuICAgIHRoaXMucHVyZUNoaWxkcmVuLmxlbmd0aCA9IDBcbiAgICBjb25zdCByZW5kZXJlciA9IHRoaXMuZ2V0UmVuZGVyZXIoKVxuICAgIGlmIChyZW5kZXJlcikge1xuICAgICAgcmVuZGVyZXIucmVtb3ZlRWxlbWVudChyZWZzKVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBtb3ZlQmVmb3JlKG5vZGUsIGJlZm9yZSwgY2hpbGRyZW4pIHtcbiAgY29uc3QgdGFyZ2V0SW5kZXggPSBjaGlsZHJlbi5pbmRleE9mKG5vZGUpXG4gIGNvbnN0IGJlZm9yZUluZGV4ID0gY2hpbGRyZW4uaW5kZXhPZihiZWZvcmUpXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgaWYgKHRhcmdldEluZGV4ID09PSBiZWZvcmVJbmRleCB8fCB0YXJnZXRJbmRleCArIDEgPT09IGJlZm9yZUluZGV4KSB7XG4gICAgcmV0dXJuIC0xXG4gIH1cblxuICBjb25zdCBuZXdJbmRleCA9IHRhcmdldEluZGV4IDwgYmVmb3JlSW5kZXggPyBiZWZvcmVJbmRleCAtIDEgOiBiZWZvcmVJbmRleFxuICBjaGlsZHJlbi5zcGxpY2UodGFyZ2V0SW5kZXgsIDEpXG4gIGNoaWxkcmVuLnNwbGljZShuZXdJbmRleCwgMCwgbm9kZSlcblxuICByZXR1cm4gYmVmb3JlSW5kZXhcbn1cblxuZnVuY3Rpb24gbW92ZVB1cmVCZWZvcmUobm9kZSwgYmVmb3JlLCBwdXJlQ2hpbGRyZW4pIHtcbiAgY29uc3QgcHVyZVRhcmdldEluZGV4ID0gcHVyZUNoaWxkcmVuLmluZGV4T2Yobm9kZSlcbiAgY29uc3QgcHVyZUJlZm9yZUluZGV4ID0gZ2V0UHVyZUFmdGVyKGJlZm9yZSwgcHVyZUNoaWxkcmVuKVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIGlmIChwdXJlVGFyZ2V0SW5kZXggPT09IHB1cmVCZWZvcmVJbmRleCB8fFxuICAgIHB1cmVUYXJnZXRJbmRleCArIDEgPT09IHB1cmVCZWZvcmVJbmRleCkge1xuICAgIHJldHVybiAtMVxuICB9XG5cbiAgY29uc3QgcHVyZU5ld0luZGV4ID0gcHVyZVRhcmdldEluZGV4IDwgcHVyZUJlZm9yZUluZGV4XG4gICAgPyBwdXJlQmVmb3JlSW5kZXggLSAxXG4gICAgOiBwdXJlQmVmb3JlSW5kZXhcblxuICBwdXJlQ2hpbGRyZW4uc3BsaWNlKHB1cmVUYXJnZXRJbmRleCwgMSlcbiAgcHVyZUNoaWxkcmVuLnNwbGljZShwdXJlTmV3SW5kZXgsIDAsIG5vZGUpXG5cbiAgcmV0dXJuIHB1cmVCZWZvcmVJbmRleFxufVxuXG5mdW5jdGlvbiBnZXRQdXJlQWZ0ZXIobm9kZSwgcHVyZUNoaWxkcmVuKSB7XG4gIGxldCBwdXJlSW5kZXggPSBwdXJlQ2hpbGRyZW4uaW5kZXhPZihub2RlKVxuICB3aGlsZSAobm9kZSAmJiBwdXJlSW5kZXggPCAwKSB7XG4gICAgbm9kZSA9IG5vZGUubmV4dCgpXG4gICAgcHVyZUluZGV4ID0gcHVyZUNoaWxkcmVuLmluZGV4T2Yobm9kZSlcbiAgfVxuICBpZiAocHVyZUluZGV4IDwgMCkge1xuICAgIHB1cmVJbmRleCA9IHB1cmVDaGlsZHJlbi5sZW5ndGhcbiAgfVxuICByZXR1cm4gcHVyZUluZGV4XG59XG5cbmZ1bmN0aW9uIG1vdmVBZnRlcihub2RlLCBhZnRlciwgY2hpbGRyZW4pIHtcbiAgY29uc3QgdGFyZ2V0SW5kZXggPSBjaGlsZHJlbi5pbmRleE9mKG5vZGUpXG4gIGNvbnN0IGFmdGVySW5kZXggPSBjaGlsZHJlbi5pbmRleE9mKGFmdGVyKVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIGlmICh0YXJnZXRJbmRleCA9PT0gYWZ0ZXJJbmRleCB8fCB0YXJnZXRJbmRleCA9PT0gYWZ0ZXJJbmRleCArIDEpIHtcbiAgICByZXR1cm4gLTFcbiAgfVxuXG4gIGNvbnN0IG5ld0luZGV4ID0gdGFyZ2V0SW5kZXggPCBhZnRlckluZGV4ID8gYWZ0ZXJJbmRleCA6IGFmdGVySW5kZXggKyAxXG4gIGNoaWxkcmVuLnNwbGljZSh0YXJnZXRJbmRleCwgMSlcbiAgY2hpbGRyZW4uc3BsaWNlKG5ld0luZGV4LCAwLCBub2RlKVxuXG4gIHJldHVybiBhZnRlckluZGV4XG59XG5cbmZ1bmN0aW9uIG1vdmVQdXJlQWZ0ZXIobm9kZSwgYWZ0ZXIsIHB1cmVDaGlsZHJlbikge1xuICBjb25zdCBwdXJlVGFyZ2V0SW5kZXggPSBwdXJlQ2hpbGRyZW4uaW5kZXhPZihub2RlKVxuICBjb25zdCBwdXJlQWZ0ZXJJbmRleCA9IGdldFB1cmVCZWZvcmUoYWZ0ZXIsIHB1cmVDaGlsZHJlbilcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBpZiAocHVyZVRhcmdldEluZGV4ID09PSBwdXJlQWZ0ZXJJbmRleCB8fFxuICAgIHB1cmVUYXJnZXRJbmRleCA9PT0gcHVyZUFmdGVySW5kZXggKyAxKSB7XG4gICAgcmV0dXJuIC0xXG4gIH1cblxuICBjb25zdCBwdXJlTmV3SW5kZXggPSBwdXJlVGFyZ2V0SW5kZXggPCBwdXJlQWZ0ZXJJbmRleFxuICAgID8gcHVyZUFmdGVySW5kZXhcbiAgICA6IHB1cmVBZnRlckluZGV4ICsgMVxuXG4gIHB1cmVDaGlsZHJlbi5zcGxpY2UocHVyZVRhcmdldEluZGV4LCAxKVxuICBwdXJlQ2hpbGRyZW4uc3BsaWNlKHB1cmVOZXdJbmRleCwgMCwgbm9kZSlcblxuICByZXR1cm4gcHVyZUFmdGVySW5kZXggKyAxXG59XG5cbmZ1bmN0aW9uIGdldFB1cmVCZWZvcmUobm9kZSwgcHVyZUNoaWxkcmVuKSB7XG4gIGxldCBwdXJlSW5kZXggPSBwdXJlQ2hpbGRyZW4uaW5kZXhPZihub2RlKVxuICB3aGlsZSAobm9kZSAmJiBwdXJlSW5kZXggPCAwKSB7XG4gICAgbm9kZSA9IG5vZGUucHJldigpXG4gICAgcHVyZUluZGV4ID0gcHVyZUNoaWxkcmVuLmluZGV4T2Yobm9kZSlcbiAgfVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBpZiAocHVyZUluZGV4IDwgMCkge1xuICAgIHB1cmVJbmRleCA9IC0xXG4gIH1cbiAgcmV0dXJuIHB1cmVJbmRleFxufVxuXG5mdW5jdGlvbiBzZXRBdHRhY2hlZChub2RlLCBkZXB0aCkge1xuICBpZiAobm9kZS5yZWYgPT09ICdfcm9vdCcpIHtcbiAgICBkZXB0aCA9IDFcbiAgfVxuICBlbHNlIHtcbiAgICBkZXB0aCA9IGRlcHRoID4gMCA/IGRlcHRoICsgMSA6IDBcbiAgfVxuICBub2RlLmF0dGFjaGVkID0gdHJ1ZVxuICBub2RlLmRlcHRoID0gZGVwdGhcbiAgaWYgKG5vZGUuY2hpbGRyZW4pIHtcbiAgICBub2RlLmNoaWxkcmVuLmZvckVhY2goKHN1YikgPT4ge1xuICAgICAgc2V0QXR0YWNoZWQoc3ViLCBkZXB0aClcbiAgICB9KVxuICB9XG59XG5cbmZ1bmN0aW9uIHNldERldGFjaGVkKG5vZGUpIHtcbiAgbm9kZS5hdHRhY2hlZCA9IGZhbHNlXG4gIG5vZGUuZGVwdGggPSAwXG4gIGlmIChub2RlLmNoaWxkcmVuKSB7XG4gICAgbm9kZS5jaGlsZHJlbi5mb3JFYWNoKChzdWIpID0+IHtcbiAgICAgIHNldERldGFjaGVkKHN1YilcbiAgICB9KVxuICB9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUlmRXhpc3RlZChub2RlKSB7XG4gIGNvbnN0IGRvYyA9IGluc3RhbmNlTWFwW25vZGUuaW5zdGFuY2VJZF1cbiAgaWYgKGRvYykge1xuICAgIGNvbnN0IGV4aXN0ZWROb2RlID0gZG9jLmdldFJlZihub2RlLnJlZilcbiAgICBpZiAoZXhpc3RlZE5vZGUpIHtcbiAgICAgIGNvbnN0IGV4aXN0ZWRQYXJlbnQgPSBkb2MuZ2V0UmVmKGV4aXN0ZWROb2RlLnBhcmVudFJlZilcbiAgICAgIGlmIChleGlzdGVkUGFyZW50ICYmIGV4aXN0ZWRQYXJlbnQucmVtb3ZlQ2hpbGQpIHtcbiAgICAgICAgZXhpc3RlZFBhcmVudC5yZW1vdmVDaGlsZChleGlzdGVkTm9kZSwgdHJ1ZSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuRWxlbWVudC5wcm90b3R5cGUuc2V0QXR0ciA9IGZ1bmN0aW9uIChrZXksIHZhbHVlLCBzaWxlbnQpIHtcbiAgaWYgKHRoaXMuYXR0cltrZXldID09PSB2YWx1ZSkge1xuICAgIHJldHVyblxuICB9XG4gIHRoaXMuYXR0cltrZXldID0gdmFsdWVcbiAgaWYgKCFzaWxlbnQgJiYgdGhpcy5hdHRhY2hlZCkge1xuICAgIGNvbnN0IHJlbmRlcmVyID0gdGhpcy5nZXRSZW5kZXJlcigpXG4gICAgaWYgKHJlbmRlcmVyKSB7XG4gICAgICByZW5kZXJlci5zZXRBdHRyKHRoaXMucmVmLCBrZXksIHZhbHVlKVxuICAgIH1cbiAgfVxufVxuXG5FbGVtZW50LnByb3RvdHlwZS5zZXRTdHlsZSA9IGZ1bmN0aW9uIChrZXksIHZhbHVlLCBzaWxlbnQpIHtcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gIGlmICh0aGlzLnN0eWxlW2tleV0gPT09IHZhbHVlKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgdGhpcy5zdHlsZVtrZXldID0gdmFsdWVcbiAgaWYgKCFzaWxlbnQgJiYgdGhpcy5hdHRhY2hlZCkge1xuICAgIGNvbnN0IHJlbmRlcmVyID0gdGhpcy5nZXRSZW5kZXJlcigpXG4gICAgaWYgKHJlbmRlcmVyKSB7XG4gICAgICByZW5kZXJlci5zZXRTdHlsZSh0aGlzLnJlZiwga2V5LCB2YWx1ZSlcbiAgICB9XG4gIH1cbn1cblxuRWxlbWVudC5wcm90b3R5cGUuc2V0Q2xhc3NTdHlsZSA9IGZ1bmN0aW9uIChjbGFzc1N0eWxlKSB7XG4gIHRoaXMuY2xhc3NTdHlsZSA9IGNsYXNzU3R5bGVcbiAgaWYgKHRoaXMuYXR0YWNoZWQpIHtcbiAgICBjb25zdCByZW5kZXJlciA9IHRoaXMuZ2V0UmVuZGVyZXIoKVxuICAgIGlmIChyZW5kZXJlcikge1xuICAgICAgcmVuZGVyZXIuc2V0U3R5bGVzKHRoaXMucmVmLCB0aGlzLnRvU3R5bGUoKSlcbiAgICB9XG4gIH1cbn1cblxuRWxlbWVudC5wcm90b3R5cGUuYWRkRXZlbnQgPSBmdW5jdGlvbiAodHlwZSwgaGFuZGxlcikge1xuICBjb25zdCBpbmRleCA9IHRoaXMuZXZlbnQuaW5kZXhPZih0eXBlKVxuXG4gIGlmIChpbmRleCA8IDApIHtcbiAgICB0aGlzLmV2ZW50LnB1c2godHlwZSlcbiAgICBsZXQgZXZlbnRNYW5hZ2VyID0gdGhpcy5vd25lckRvY3VtZW50LmV2ZW50TWFuYWdlclxuICAgIGV2ZW50TWFuYWdlci5hZGQodGhpcywgdHlwZSwgaGFuZGxlcilcblxuICAgIGlmICh0aGlzLmF0dGFjaGVkKSB7XG4gICAgICBjb25zdCByZW5kZXJlciA9IHRoaXMuZ2V0UmVuZGVyZXIoKVxuICAgICAgaWYgKHJlbmRlcmVyKSB7XG4gICAgICAgIHJlbmRlcmVyLmFkZEV2ZW50KHRoaXMucmVmLCB0eXBlKVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5FbGVtZW50LnByb3RvdHlwZS5yZW1vdmVFdmVudCA9IGZ1bmN0aW9uICh0eXBlKSB7XG4gIGNvbnN0IGluZGV4ID0gdGhpcy5ldmVudC5pbmRleE9mKHR5cGUpXG5cbiAgaWYgKGluZGV4ID49IDApIHtcbiAgICB0aGlzLmV2ZW50LnNwbGljZShpbmRleCwgMSlcbiAgICBsZXQgZXZlbnRNYW5hZ2VyID0gdGhpcy5vd25lckRvY3VtZW50LmV2ZW50TWFuYWdlclxuICAgIGV2ZW50TWFuYWdlci5yZW1vdmUodGhpcywgdHlwZSlcblxuICAgIGlmICh0aGlzLmF0dGFjaGVkKSB7XG4gICAgICBjb25zdCByZW5kZXJlciA9IHRoaXMuZ2V0UmVuZGVyZXIoKVxuICAgICAgaWYgKHJlbmRlcmVyKSB7XG4gICAgICAgIHJlbmRlcmVyLnJlbW92ZUV2ZW50KHRoaXMucmVmLCB0eXBlKVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5FbGVtZW50LnByb3RvdHlwZS50b1N0eWxlID0gZnVuY3Rpb24gKCkge1xuICBjb25zdCByZXN1bHQgPSB7fVxuICBjb25zdCBjbGFzc1N0eWxlID0gdGhpcy5jbGFzc1N0eWxlXG4gIGNvbnN0IHN0eWxlID0gdGhpcy5zdHlsZVxuICBmb3IgKGNvbnN0IG5hbWUgaW4gY2xhc3NTdHlsZSkge1xuICAgIHJlc3VsdFtuYW1lXSA9IGNsYXNzU3R5bGVbbmFtZV1cbiAgfVxuICBmb3IgKGNvbnN0IG5hbWUgaW4gc3R5bGUpIHtcbiAgICByZXN1bHRbbmFtZV0gPSBzdHlsZVtuYW1lXVxuICB9XG4gIHJldHVybiByZXN1bHRcbn1cblxuRWxlbWVudC5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gKCkge1xuICBjb25zdCByZXN1bHQgPSB7XG4gICAgcmVmOiB0aGlzLnJlZi50b1N0cmluZygpLFxuICAgIHR5cGU6IHRoaXMudHlwZSxcbiAgICBhdHRyOiB0aGlzLmF0dHIsXG4gICAgc3R5bGU6IHRoaXMudG9TdHlsZSgpXG4gIH1cblxuICBpZiAodGhpcy5ldmVudCAmJiB0aGlzLmV2ZW50Lmxlbmd0aCkge1xuICAgIHJlc3VsdC5ldmVudCA9IHRoaXMuZXZlbnRcbiAgfVxuICBpZiAodGhpcy5wdXJlQ2hpbGRyZW4gJiYgdGhpcy5wdXJlQ2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgcmVzdWx0LmNoaWxkcmVuID0gdGhpcy5wdXJlQ2hpbGRyZW4ubWFwKChjaGlsZCkgPT4gY2hpbGQudG9KU09OKCkpXG4gIH1cblxuICByZXR1cm4gcmVzdWx0XG59XG5cbkVsZW1lbnQucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gJzwnICsgdGhpcy50eXBlICtcbiAgICAnIGF0dHI9JyArIEpTT04uc3RyaW5naWZ5KHRoaXMuYXR0cikgK1xuICAgICcgc3R5bGU9JyArIEpTT04uc3RyaW5naWZ5KHRoaXMudG9TdHlsZSgpKSArICc+JyArXG4gICAgdGhpcy5wdXJlQ2hpbGRyZW4ubWFwKChjaGlsZCkgPT4gY2hpbGQudG9TdHJpbmcoKSkuam9pbignJykgK1xuICAgICc8LycgKyB0aGlzLnR5cGUgKyAnPidcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIENvbW1lbnQodmFsdWUsIG93bmVyRG9jdW1lbnQpIHtcbiAgdGhpcy5jcmVhdGUob3duZXJEb2N1bWVudC5pZClcbiAgdGhpcy50eXBlID0gJ2NvbW1lbnQnXG4gIHRoaXMudmFsdWUgPSB2YWx1ZVxufVxuXG5Db21tZW50LnByb3RvdHlwZSA9IG5ldyBOb2RlKClcblxuQ29tbWVudC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiAnPCEtLSAnICsgdGhpcy52YWx1ZSArICcgLS0+J1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogL1VzZXJzL3poYW9qaW5qaWFuZy9TaXRlcy9wdWJsaWMvd2VleC9zcmMvanMtZnJhbWV3b3JrL2xpYi9hcHAvZG9tLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSB7XG5cdFwibmFtZVwiOiBcIndlZXgtanNmcmFtZXdvcmtcIixcblx0XCJ2ZXJzaW9uXCI6IFwiMC4xMy4xMVwiLFxuXHRcImRlc2NyaXB0aW9uXCI6IFwiSlMgRnJhbWV3b3JrIGZvciBXZWV4IHNvbHV0aW9uIHdoaWNoIGlzIGEgZXh0ZW5kYWJsZSBjcm9zcy1wbGF0Zm9ybSBzb2x1dGlvbiBmb3IgZHluYW1pYyBwcm9ncmFtbWluZyBhbmQgcHVibGlzaGluZyBwcm9qZWN0c1wiLFxuXHRcIm1haW5cIjogXCJpbmRleC5qc1wiLFxuXHRcInNjcmlwdHNcIjoge1xuXHRcdFwiZGV2XCI6IFwid2VicGFjayAtLXdhdGNoIC0tY29uZmlnIC4vd2VicGFjay5jb25maWcuanNcIixcblx0XHRcImJ1aWxkXCI6IFwid2VicGFjayAtLWNvbmZpZyAuL3dlYnBhY2suY29uZmlnLmpzXCIsXG5cdFx0XCJjb21wcmVzc1wiOiBcInVnbGlmeWpzIGRpc3QvaW5kZXguanMgLW8gZGlzdC9pbmRleC5taW4uanNcIixcblx0XHRcImxpbnRcIjogXCJqc2NzIC0tY29uZmlnIC5qc2NzcmMgcG9seWZpbGwvKi5qcyBwb2x5ZmlsbC9fX3Rlc3RfXy8qLmpzIGxpYi8qLmpzIGxpYi9fX3Rlc3RfXy8qLmpzIGxpYi9hcHAvKi5qcyBsaWIvYXBwL19fdGVzdF9fLyouanMgbGliL3ZtLyouanMgbGliL3ZtL19fdGVzdF9fLyouanNcIixcblx0XHRcInRlc3RcIjogXCJtb2NoYSAtLWNvbXBpbGVycyBqczpiYWJlbC1jb3JlL3JlZ2lzdGVyIHBvbHlmaWxsL19fdGVzdF9fLyouanMgbGliL19fdGVzdF9fLyouanMgbGliLyoqL19fdGVzdF9fLyouanNcIixcblx0XHRcImNvdmVyXCI6IFwiYmFiZWwtbm9kZSBub2RlX21vZHVsZXMvaXNwYXJ0YS9iaW4vaXNwYXJ0YSBjb3ZlciAtLXJlcG9ydCB0ZXh0IG5vZGVfbW9kdWxlcy9tb2NoYS9iaW4vX21vY2hhIC0tIC0tcmVwb3J0ZXIgZG90IHBvbHlmaWxsL19fdGVzdF9fLyouanMgbGliL19fdGVzdF9fLyouanMgbGliLyoqL19fdGVzdF9fLyouanNcIixcblx0XHRcImNpXCI6IFwibnBtIHJ1biBsaW50ICYmIG5wbSBydW4gY292ZXJcIlxuXHR9LFxuXHRcInJlcG9zaXRvcnlcIjoge1xuXHRcdFwidHlwZVwiOiBcImdpdFwiLFxuXHRcdFwidXJsXCI6IFwiZ2l0QGdpdGh1Yi5jb206YWxpYmFiYS93ZWV4LmdpdFwiXG5cdH0sXG5cdFwiYXV0aG9yXCI6IFtcblx0XHR7XG5cdFx0XHRcIm5hbWVcIjogXCJqaW5qaWFuZ1wiLFxuXHRcdFx0XCJlbWFpbFwiOiBcInpoYW9qaW5qaWFuZ0BtZS5jb21cIlxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0XCJuYW1lXCI6IFwiVGVycnkgS2luZ1wiLFxuXHRcdFx0XCJlbWFpbFwiOiBcInRlcnJ5a2luZ2NoYUBnbWFpbC5jb21cIlxuXHRcdH1cblx0XSxcblx0XCJjb250cmlidXRvcnNcIjogW1xuXHRcdHtcblx0XHRcdFwibmFtZVwiOiBcInB1c2hpbWluZ1wiLFxuXHRcdFx0XCJlbWFpbFwiOiBcInB1c2hpbWluZ0BnbWFpbC5jb21cIlxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0XCJuYW1lXCI6IFwiaXNrZW5odWFuZ1wiLFxuXHRcdFx0XCJlbWFpbFwiOiBcImlza2VuaHVhbmdAZ21haWwuY29tXCJcblx0XHR9LFxuXHRcdHtcblx0XHRcdFwibmFtZVwiOiBcInl1YW55YW5cIixcblx0XHRcdFwiZW1haWxcIjogXCJ5dWFueWFuLmNhb0BnbWFpbC5jb21cIlxuXHRcdH1cblx0XSxcblx0XCJrZXl3b3Jkc1wiOiBbXG5cdFx0XCJ3ZWV4XCIsXG5cdFx0XCJtdnZtXCIsXG5cdFx0XCJicm93c2VyXCIsXG5cdFx0XCJoeWJyaWRcIixcblx0XHRcImZyYW1ld29ya1wiXG5cdF0sXG5cdFwibGljZW5zZVwiOiBcIkFwYWNoZS0yLjBcIixcblx0XCJkZXBlbmRlbmNpZXNcIjoge1xuXHRcdFwic2VtdmVyXCI6IFwifjUuMS4wXCIsXG5cdFx0XCJjb3JlLWpzXCI6IFwifjIuMS4xXCJcblx0fSxcblx0XCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuXHRcdFwiYmFiZWwtY2xpXCI6IFwifjYuNC41XCIsXG5cdFx0XCJiYWJlbC1jb3JlXCI6IFwifjYuNC41XCIsXG5cdFx0XCJiYWJlbC1sb2FkZXJcIjogXCJ+Ni4yLjFcIixcblx0XHRcImJhYmVsLXByZXNldC1lczIwMTVcIjogXCJ+Ni4zLjEzXCIsXG5cdFx0XCJjaGFpXCI6IFwifjMuMi4wXCIsXG5cdFx0XCJpc3BhcnRhXCI6IFwifjQuMC4wXCIsXG5cdFx0XCJpc3RhbmJ1bFwiOiBcIn4wLjQuMlwiLFxuXHRcdFwianNjc1wiOiBcIn4yLjkuMFwiLFxuXHRcdFwianNvbi1sb2FkZXJcIjogXCJeMC41LjRcIixcblx0XHRcIm1vY2hhXCI6IFwifjIuMy40XCIsXG5cdFx0XCJzaW5vblwiOiBcIn4xLjE3LjJcIixcblx0XHRcInNpbm9uLWNoYWlcIjogXCJ+Mi44LjBcIixcblx0XHRcInVnbGlmeS1qc1wiOiBcIl4yLjYuMlwiLFxuXHRcdFwid2F0Y2gtY2xpXCI6IFwifjAuMi4xXCIsXG5cdFx0XCJ3ZWJwYWNrXCI6IFwifjEuMTIuMTJcIlxuXHR9LFxuXHRcIm9wdGlvbmFsRGVwZW5kZW5jaWVzXCI6IHtcblx0XHRcIndlZXgtdHJhbnNmb3JtZXJcIjogXCI+PTAuMS41IDwwLjRcIlxuXHR9XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogL1VzZXJzL3poYW9qaW5qaWFuZy9TaXRlcy9wdWJsaWMvd2VleC9zcmMvanMtZnJhbWV3b3JrL3BhY2thZ2UuanNvblxuICoqIG1vZHVsZSBpZCA9IDY5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIEBmaWxlT3ZlcnZpZXcgVGhlIGFwaSBmb3IgaW52b2tpbmcgd2l0aCBcIiRcIiBwcmVmaXhcbiAqL1xuaW1wb3J0ICogYXMgXyBmcm9tICcuLi91dGlsJ1xuXG4vKipcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIGNvbW1vblxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICovXG5cbi8qKlxuICogQGRlcHJlY2F0ZWQgdXNlICR2bSBpbnN0ZWFkXG4gKiBmaW5kIHRoZSB2bSBieSBpZFxuICogTm90ZTogdGhlcmUgaXMgb25seSBvbmUgaWQgaW4gd2hvbGUgY29tcG9uZW50XG4gKiBAcGFyYW0gIHtzdHJpbmd9IGlkXG4gKiBAcmV0dXJuIHtWbX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uICQoaWQpIHtcbiAgXy53YXJuKCdWbSMkIGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgVm0jJHZtIGluc3RlYWQnKVxuICBjb25zdCBpbmZvID0gdGhpcy5faWRzW2lkXVxuICBpZiAoaW5mbykge1xuICAgIHJldHVybiBpbmZvLnZtXG4gIH1cbn1cblxuLyoqXG4gKiBmaW5kIHRoZSBlbGVtZW50IGJ5IGlkXG4gKiBOb3RlOiB0aGVyZSBpcyBvbmx5IG9uZSBpZCBpbiB3aG9sZSBjb21wb25lbnRcbiAqIEBwYXJhbSAge3N0cmluZ30gaWRcbiAqIEByZXR1cm4ge0VsZW1lbnR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiAkZWwoaWQpIHtcbiAgY29uc3QgaW5mbyA9IHRoaXMuX2lkc1tpZF1cbiAgaWYgKGluZm8pIHtcbiAgICByZXR1cm4gaW5mby5lbFxuICB9XG59XG5cbi8qKlxuICogZmluZCB0aGUgdm0gb2YgdGhlIGN1c3RvbSBjb21wb25lbnQgYnkgaWRcbiAqIE5vdGU6IHRoZXJlIGlzIG9ubHkgb25lIGlkIGluIHdob2xlIGNvbXBvbmVudFxuICogQHBhcmFtICB7c3RyaW5nfSBpZFxuICogQHJldHVybiB7Vm19XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiAkdm0oaWQpIHtcbiAgY29uc3QgaW5mbyA9IHRoaXMuX2lkc1tpZF1cbiAgaWYgKGluZm8pIHtcbiAgICByZXR1cm4gaW5mby52bVxuICB9XG59XG5cbi8qKlxuICogRmlyZSB3aGVuIGRpZmZlciByZW5kZXJpbmcgZmluaXNoZWRcbiAqXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gZm5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uICRyZW5kZXJUaGVuKGZuKSB7XG4gIGNvbnN0IGFwcCA9IHRoaXMuX2FwcFxuICBjb25zdCBkaWZmZXIgPSBhcHAuZGlmZmVyXG4gIHJldHVybiBkaWZmZXIudGhlbigoKSA9PiB7XG4gICAgZm4oKVxuICB9KVxufVxuXG4vKipcbiAqIHNjcm9sbCBhbiBlbGVtZW50IHNwZWNpZmllZCBieSBpZCBpbnRvIHZpZXcsIFxuICogbW9yZW92ZXIgc3BlY2lmeSBhIG51bWJlciBvZiBvZmZzZXQgb3B0aW9uYWxseVxuICogQHBhcmFtICB7c3RyaW5nfSBpZFxuICogQHBhcmFtICB7bnVtYmVyfSBvZmZzZXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uICRzY3JvbGxUbyhpZCwgb2Zmc2V0KSB7XG4gIF8ud2FybignVm0jJHNjcm9sbFRvIGlzIGRlcHJlY2F0ZWQsICcrIFxuICAgICAgICAgICdwbGVhc2UgdXNlIFwicmVxdWlyZShcXCdAd2VleC1tb2R1bGUvZG9tXFwnKScgKyBcbiAgICAgICAgICAnLnNjcm9sbFRvKGVsLCBvcHRpb25zKVwiIGluc3RlYWQnKVxuICBjb25zdCBlbCA9IHRoaXMuJGVsKGlkKVxuICBpZiAoZWwpIHtcbiAgICBjb25zdCBkb20gPSB0aGlzLl9hcHAucmVxdWlyZU1vZHVsZSgnZG9tJylcbiAgICBkb20uc2Nyb2xsVG9FbGVtZW50KGVsLnJlZiwge29mZnNldDogb2Zmc2V0fSlcbiAgfVxufVxuXG4vKipcbiAqIHBlcmZvcm0gdHJhbnNpdGlvbiBhbmltYXRpb24gb24gYW4gZWxlbWVudCBzcGVjaWZpZWQgYnkgaWRcbiAqIEBwYXJhbSAge3N0cmluZ30gICBpZFxuICogQHBhcmFtICB7b2JqZWN0fSAgIG9wdGlvbnNcbiAqIEBwYXJhbSAge29iamVjdH0gICBvcHRpb25zLnN0eWxlc1xuICogQHBhcmFtICB7b2JqZWN0fSAgIG9wdGlvbnMuZHVyYXRpb24obXMpXG4gKiBAcGFyYW0gIHtvYmplY3R9ICAgW29wdGlvbnMudGltaW5nRnVuY3Rpb25dXG4gKiBAcGFyYW0gIHtvYmplY3R9ICAgW29wdGlvbnMuZGVsYXk9MChtcyldXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uICR0cmFuc2l0aW9uKGlkLCBvcHRpb25zLCBjYWxsYmFjaykge1xuICBjb25zdCBlbCA9IHRoaXMuJGVsKGlkKVxuICBpZiAoZWwgJiYgb3B0aW9ucyAmJiBvcHRpb25zLnN0eWxlcykge1xuICAgIGNvbnN0IGFuaW1hdGlvbiA9IHRoaXMuX2FwcC5yZXF1aXJlTW9kdWxlKCdhbmltYXRpb24nKVxuICAgIGFuaW1hdGlvbi50cmFuc2l0aW9uKGVsLnJlZiwgb3B0aW9ucywgKC4uLmFyZ3MpID0+IHtcbiAgICAgIHRoaXMuX3NldFN0eWxlKGVsLCBvcHRpb25zLnN0eWxlcylcbiAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKC4uLmFyZ3MpXG4gICAgfSlcbiAgfVxufVxuXG4vKipcbiAqIGdldCBzb21lIGNvbmZpZ1xuICogQHJldHVybiB7b2JqZWN0fSBzb21lIGNvbmZpZyBmb3IgYXBwIGluc3RhbmNlXG4gKiBAcHJvcGVydHkge3N0cmluZ30gYnVuZGxlVXJsXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGRlYnVnXG4gKiBAcHJvcGVydHkge29iamVjdH0gZW52XG4gKiBAcHJvcGVydHkge3N0cmluZ30gZW52LndlZXhWZXJzaW9uKGV4LiAxLjAuMClcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBlbnYuYXBwTmFtZShleC4gVEIvVE0pXG4gKiBAcHJvcGVydHkge3N0cmluZ30gZW52LmFwcFZlcnNpb24oZXguIDUuMC4wKVxuICogQHByb3BlcnR5IHtzdHJpbmd9IGVudi5wbGF0Zm9ybShleC4gaU9TL0FuZHJvaWQpXG4gKiBAcHJvcGVydHkge3N0cmluZ30gZW52Lm9zVmVyc2lvbihleC4gNy4wLjApXG4gKiBAcHJvcGVydHkge3N0cmluZ30gZW52LmRldmljZU1vZGVsICoqbmF0aXZlIG9ubHkqKlxuICogQHByb3BlcnR5IHtudW1iZXJ9IGVudi5bZGV2aWNlV2lkdGg9NzUwXVxuICogQHByb3BlcnR5IHtudW1iZXJ9IGVudi5kZXZpY2VIZWlnaHRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uICRnZXRDb25maWcoY2FsbGJhY2spIHtcbiAgY29uc3QgY29uZmlnID0gXy5leHRlbmQoe1xuICAgIGVudjogZ2xvYmFsLldYRW52aXJvbm1lbnQgfHwge31cbiAgfSwgdGhpcy5fYXBwLm9wdGlvbnMpXG4gIGlmIChfLnR5cG9mKGNhbGxiYWNrKSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIF8ud2FybigndGhlIGNhbGxiYWNrIG9mIFZtIyRnZXRDb25maWcoY2FsbGJhY2spIGlzIGRlcHJlY2F0ZWQsICcgK1xuICAgICAgJ3RoaXMgYXBpIG5vdyBjYW4gZGlyZWN0bHkgUkVUVVJOIGNvbmZpZyBpbmZvLicpXG4gICAgY2FsbGJhY2soY29uZmlnKVxuICB9XG4gIHJldHVybiBjb25maWdcbn1cblxuLyoqXG4gKiBAZGVwcmVjYXRlZFxuICogcmVxdWVzdCBuZXR3b3JrIHZpYSBodHRwIHByb3RvY29sXG4gKiBAcGFyYW0gIHtvYmplY3R9ICAgcGFyYW1zXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uICRzZW5kSHR0cChwYXJhbXMsIGNhbGxiYWNrKSB7XG4gIF8ud2FybignVm0jJHNlbmRIdHRwIGlzIGRlcHJlY2F0ZWQsICcrIFxuICAgICAgICAgICdwbGVhc2UgdXNlIFwicmVxdWlyZShcXCdAd2VleC1tb2R1bGUvc3RyZWFtXFwnKScgKyBcbiAgICAgICAgICAnLnNlbmRIdHRwKHBhcmFtcywgY2FsbGJhY2spXCIgaW5zdGVhZCcpXG4gIGNvbnN0IHN0cmVhbSA9IHRoaXMuX2FwcC5yZXF1aXJlTW9kdWxlKCdzdHJlYW0nKVxuICBzdHJlYW0uc2VuZEh0dHAocGFyYW1zLCBjYWxsYmFjaylcbn1cblxuLyoqXG4gKiBAZGVwcmVjYXRlZFxuICogb3BlbiBhIHVybFxuICogQHBhcmFtICB7c3RyaW5nfSB1cmxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uICRvcGVuVVJMKHVybCkge1xuICBfLndhcm4oJ1ZtIyRvcGVuVVJMIGlzIGRlcHJlY2F0ZWQsICcrIFxuICAgICAgICAgICdwbGVhc2UgdXNlIFwicmVxdWlyZShcXCdAd2VleC1tb2R1bGUvZXZlbnRcXCcpJyArIFxuICAgICAgICAgICcub3BlblVSTCh1cmwpXCIgaW5zdGVhZCcpXG4gIGNvbnN0IGV2ZW50ID0gdGhpcy5fYXBwLnJlcXVpcmVNb2R1bGUoJ2V2ZW50JylcbiAgZXZlbnQub3BlblVSTCh1cmwpXG59XG5cbi8qKlxuICogQGRlcHJlY2F0ZWQgXG4gKiBzZXQgYSB0aXRsZSBmb3IgcGFnZVxuICogQHBhcmFtICB7c3RyaW5nfSB0aXRsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gJHNldFRpdGxlKHRpdGxlKSB7XG4gIF8ud2FybignVm0jJHNldFRpdGxlIGlzIGRlcHJlY2F0ZWQsICcrIFxuICAgICAgICAgICdwbGVhc2UgdXNlIFwicmVxdWlyZShcXCdAd2VleC1tb2R1bGUvcGFnZUluZm9cXCcpJyArIFxuICAgICAgICAgICcuc2V0VGl0bGUodGl0bGUpXCIgaW5zdGVhZCcpXG4gIGNvbnN0IHBhZ2VJbmZvID0gdGhpcy5fYXBwLnJlcXVpcmVNb2R1bGUoJ3BhZ2VJbmZvJylcbiAgcGFnZUluZm8uc2V0VGl0bGUodGl0bGUpXG59XG5cbi8qKlxuICogQGRlcHJlY2F0ZWQgdXNlIFwicmVxdWlyZSgnQHdlZXgtbW9kdWxlL21vZHVsZU5hbWUnKSBpbnN0ZWFkXCJcbiAqIGludm9rZSBhIG5hdGl2ZSBtZXRob2QgYnkgc3BlY2lmaW5nIHRoZSBuYW1lIG9mIG1vZHVsZSBhbmQgbWV0aG9kXG4gKiBAcGFyYW0gIHtzdHJpbmd9IG1vZHVsZU5hbWVcbiAqIEBwYXJhbSAge3N0cmluZ30gbWV0aG9kTmFtZVxuICogQHBhcmFtICB7Li4uKn0gdGhlIHJlc3QgYXJndW1lbnRzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiAkY2FsbChtb2R1bGVOYW1lLCBtZXRob2ROYW1lLCAuLi5hcmdzKSB7XG4gIF8ud2FybignVm0jJGNhbGwgaXMgZGVwcmVjYXRlZCwgJyArIFxuICAgICdwbGVhc2UgdXNlIFwicmVxdWlyZShcXCdAd2VleC1tb2R1bGUvbW9kdWxlTmFtZVxcJylcIiBpbnN0ZWFkJylcbiAgY29uc3QgbW9kdWxlID0gdGhpcy5fYXBwLnJlcXVpcmVNb2R1bGUobW9kdWxlTmFtZSlcbiAgaWYgKG1vZHVsZSAmJiBtb2R1bGVbbWV0aG9kTmFtZV0pIHtcbiAgICBtb2R1bGVbbWV0aG9kTmFtZV0oLi4uYXJncylcbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogL1VzZXJzL3poYW9qaW5qaWFuZy9TaXRlcy9wdWJsaWMvd2VleC9zcmMvanMtZnJhbWV3b3JrL2xpYi9hcGkvbWV0aG9kcy5qc1xuICoqLyIsIi8qKlxuICogQGZpbGVPdmVydmlldyBUaGUgYXBpIGZvciBpbnZva2luZyB3aXRoIFwiJFwiIHByZWZpeFxuICovXG5cbi8qKlxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogcHJpdmF0ZSBmb3IgYWxpXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKi9cblxuLyoqXG4gKiBpbnZva2UgdXNlci10cmFjayBvbiBUYW9iYW8gTW9ibGllXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZe+8mmVudGVyLCBjbGljaywgZXhwb3NlXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtzdHJpbmd9IGNvbU5hbWVcbiAqIEBwYXJhbSB7b2JqZWN0fSBwYXJhbVxuKi9cbmV4cG9ydCBmdW5jdGlvbiAkdXNlclRyYWNrKHR5cGUsIG5hbWUsIGNvbU5hbWUsIHBhcmFtKSB7XG4gIGNvbnN0IHVzZXJUcmFjayA9IHRoaXMuX2FwcC5yZXF1aXJlTW9kdWxlKCd1c2VyVHJhY2snKVxuICB1c2VyVHJhY2suY29tbWl0KHR5cGUsIG5hbWUsIGNvbU5hbWUsIHBhcmFtKVxufVxuXG4vKipcbiAqIHJlcXVlc3QgYSByZXN0ZnVsbCBhcGkgdmlhIHRoZSBtdG9wIGdhdGV3YXlcbiAqIEBwYXJhbSAge29iamVjdH0gICBwYXJhbXNcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBjYWxsYmFja1xuICovXG5leHBvcnQgZnVuY3Rpb24gJHNlbmRNdG9wKHBhcmFtcywgY2FsbGJhY2spIHtcbiAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgLy8gaW4gbmF0aXZl77yMdXNlIHdpbmR2YW5lXG4gICAgY29uc3Qgd2luZHZhbmUgPSB0aGlzLl9hcHAucmVxdWlyZU1vZHVsZSgnd2luZHZhbmUnKVxuICAgIHdpbmR2YW5lLmNhbGwoe1xuICAgICAgY2xhc3M6ICdNdG9wV1ZQbHVnaW4nLFxuICAgICAgbWV0aG9kOiAnc2VuZCcsXG4gICAgICBkYXRhOiBwYXJhbXNcbiAgICB9LCBjYWxsYmFjaylcbiAgfSBlbHNlIHtcbiAgICAvLyBpbiB3ZWIgYnJ3b3Nlcu+8jHVzZSBzdHJlYW0uc2VuZE10b3BcbiAgICBjb25zdCBzdHJlYW0gPSB0aGlzLl9hcHAucmVxdWlyZU1vZHVsZSgnc3RyZWFtJylcbiAgICBzdHJlYW0uc2VuZE10b3AocGFyYW1zLCBjYWxsYmFjaylcbiAgfVxufVxuXG4vKipcbiAqIHJlcXVlc3QgYSBuYXRpdmUgYXBpIHZpYSB3aW5kdmFuZSBwcm90b2NvbFxuICogQHBhcmFtICB7b2JqZWN0fSAgIHBhcmFtc1xuICogQHBhcmFtICB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiAkY2FsbFdpbmR2YW5lKHBhcmFtcywgY2FsbGJhY2spIHtcbiAgY29uc3Qgd2luZHZhbmUgPSB0aGlzLl9hcHAucmVxdWlyZU1vZHVsZSgnd2luZHZhbmUnKVxuICB3aW5kdmFuZS5jYWxsKHBhcmFtcywgY2FsbGJhY2spXG59XG5cbi8qKlxuICogc2V0IHNwbSBmb3IgdGhlIHBhZ2VcbiAqIEBwYXJhbSAge3N0cmluZ30gYVxuICogQHBhcmFtICB7c3RyaW5nfSBiXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiAkc2V0U3BtKGEsIGIpIHtcbiAgY29uc3QgcGFnZUluZm8gPSB0aGlzLl9hcHAucmVxdWlyZU1vZHVsZSgncGFnZUluZm8nKVxuICBwYWdlSW5mby5zZXRTcG0oYSwgYilcbn1cblxuLyoqXG4gKiBnZXQgdGhlIGluZm9ybWF0aW9uIG9mIHRoZSBjdXJyZW50IGxvZ2luZWQgdXNlclxuICogQHBhcmFtICB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiAkZ2V0VXNlckluZm8oY2FsbGJhY2spIHtcbiAgY29uc3QgdXNlciA9IHRoaXMuX2FwcC5yZXF1aXJlTW9kdWxlKCd1c2VyJylcbiAgdXNlci5nZXRVc2VySW5mbyhjYWxsYmFjaylcbn1cblxuLyoqXG4gKiBwZXJmb3JtIGxvZ2luXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uICRsb2dpbihjYWxsYmFjaykge1xuICBjb25zdCB1c2VyID0gdGhpcy5fYXBwLnJlcXVpcmVNb2R1bGUoJ3VzZXInKVxuICB1c2VyLmxvZ2luKGNhbGxiYWNrKVxufVxuXG4vKipcbiAqIHBlcmZvcm0gbG9nb3V0XG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uICRsb2dvdXQoY2FsbGJhY2spIHtcbiAgY29uc3QgdXNlciA9IHRoaXMuX2FwcC5yZXF1aXJlTW9kdWxlKCd1c2VyJylcbiAgdXNlci5sb2dvdXQoY2FsbGJhY2spXG59XG5cblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9saWIvYXBpL21ldGhvZHMuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9
