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

var _ = require('./util')
// var config = require('./config')
var Observer = require('./observer')
// var expParser = require('./parsers/expression')
// var batcher = require('./batcher')
var uid = 0

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
function Watcher (vm, update, cb) {
  this.vm = vm
  vm._watchers.push(this)
  // this.expression = expression
  this.cb = cb
  this.id = ++uid // uid for batching
  this.active = true
  // options = options || {}
  // this.deep = !!options.deep
  // this.user = !!options.user
  // this.twoWay = !!options.twoWay
  // this.filters = options.filters
  // this.preProcess = options.preProcess
  this.deps = []
  this.newDeps = []
  // parse expression for getter/setter
  // var res = expParser.parse(expression, options.twoWay)
  // this.getter = res.get
  // this.setter = res.set
  this.getter = update
  this.value = this.get()
}

var p = Watcher.prototype

/**
 * Add a dependency to this directive.
 *
 * @param {Dep} dep
 */

p.addDep = function (dep) {
  var newDeps = this.newDeps
  var old = this.deps
  if (_.indexOf(newDeps, dep) < 0) {
    newDeps.push(dep)
    var i = _.indexOf(old, dep)
    if (i < 0) {
      dep.addSub(this)
    } else {
      old[i] = null
    }
  }
}

/**
 * Evaluate the getter, and re-collect dependencies.
 */

p.get = function () {
  this.beforeGet()
  var vm = this.vm
  var value
  try {
    value = this.getter.call(vm, vm)
  } catch (e) {
    // if (config.warnExpressionErrors) {
    //   _.warn(
    //     'Error when evaluating expression "' +
    //     this.expression + '":\n   ' + e
    //   )
    // }
    _.warn('Error when update"')
  }
  // "touch" every property so they are all tracked as
  // dependencies for deep watching
  if (this.deep) {
    traverse(value)
  }
  if (this.preProcess) {
    value = this.preProcess(value)
  }
  if (this.filters) {
    value = vm._applyFilters(value, null, this.filters, false)
  }
  this.afterGet()
  return value
}

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
  Observer.target = this
}

/**
 * Clean up for dependency collection.
 */

p.afterGet = function () {
  Observer.target = null
  var i = this.deps.length
  while (i--) {
    var dep = this.deps[i]
    if (dep) {
      dep.removeSub(this)
    }
  }
  this.deps = this.newDeps
  this.newDeps = []
}

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
    var value = this.get()
    if (
      value !== this.value ||
      Array.isArray(value) ||
      this.deep
    ) {
      var oldValue = this.value
      this.value = value
      this.cb(value, oldValue)
    }
  }
}

/**
 * Remove self from all dependencies' subcriber list.
 */

p.teardown = function () {
  if (this.active) {
    // remove self from vm's watcher list
    // we can skip this if the vm if being destroyed
    // which can improve teardown performance.
    if (!this.vm._isBeingDestroyed) {
      this.vm._watchers.$remove(this)
    }
    var i = this.deps.length
    while (i--) {
      this.deps[i].removeSub(this)
    }
    this.active = false
    this.vm = this.cb = this.value = null
  }
}


/**
 * Recrusively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 *
 * @param {Object} obj
 */

function traverse (obj) {
  var key, val, i
  for (key in obj) {
    val = obj[key]
    if (_.isArray(val)) {
      i = val.length
      while (i--) {traverse(val[i])}
    } else if (_.isObject(val)) {
      traverse(val)
    }
  }
}

module.exports = Watcher
