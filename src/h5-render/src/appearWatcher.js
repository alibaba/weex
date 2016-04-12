'use strict'

var utils = require('./utils')

var watchComponents = []
var listened = false
var direction = 'up'
var scrollY = 0

var AppearWatcher = {
  watchIfNeeded: function (component) {
    if (needWatch(component)) {
      watchComponents.push(component)
      if (!listened) {
        listened = true
        var handler = throttle(onScroll, 100)
        window.addEventListener('scroll', handler, false)
      }
    }
  }
}

function needWatch (component) {
  var events = component.data.event
  if (events
      && (events.indexOf('appear') != -1
        || events.indexOf('disappear') != -1)) {
    return true
  }
  return false
}

function onScroll (e) {
  var y = window.scrollY
  direction = y >= scrollY ? 'up' : 'down'
  scrollY = y

  var len = watchComponents.length
  if (len === 0) {
    return
  }
  for (var i = 0; i < len; i++) {
    var component = watchComponents[i]
    var appear = isComponentInWindow(component)
    if (appear && !component._appear) {
      component._appear = true
      fireEvent(component, 'appear')
    } else if (!appear && component._appear) {
      component._appear = false
      fireEvent(component, 'disappear')
    }
  }
}

function isComponentInWindow (component) {
  var rect = component.node.getBoundingClientRect()
  return rect.right > 0 && rect.left < window.innerWidth &&
         rect.bottom > 0 && rect.top < window.innerHeight
}

function fireEvent (component, type) {
  var evt = document.createEvent('HTMLEvents')
  var data = { direction: direction }
  evt.initEvent(type, false, false)
  evt.data = data
  utils.extend(evt, data)
  component.node.dispatchEvent(evt)
}

function throttle (func, wait) {
  var context, args, result
  var timeout = null
  var previous = 0
  var later = function () {
    previous = Date.now()
    timeout = null
    result = func.apply(context, args)
  }
  return function () {
    var now = Date.now()
    var remaining = wait - (now - previous)
    context = this
    args = arguments
    if (remaining <= 0) {
      clearTimeout(timeout)
      timeout = null
      previous = now
      result = func.apply(context, args)
    } else if (!timeout) {
      timeout = setTimeout(later, remaining)
    }
    return result
  }
}

module.exports = AppearWatcher