'use strict'

const utils = require('./utils')

const componentsInScroller = []
const componentsOutOfScroller = []
let listened = false
let direction = 'up'
let scrollY = 0

const AppearWatcher = {
  watchIfNeeded: function (component) {
    if (needWatch(component)) {
      if (component.isInScrollable()) {
        componentsInScroller.push(component)
      }
      else {
        componentsOutOfScroller.push(component)
      }
      if (!listened) {
        listened = true
        // const handler = throttle(onScroll, 25)
        const handler = throttle(onScroll, 100)
        window.addEventListener('scroll', handler, false)
      }
    }
  }
}

function needWatch (component) {
  const events = component.data.event
  if (events
      && (events.indexOf('appear') !== -1
        || events.indexOf('disappear') !== -1)) {
    return true
  }
  return false
}

function onScroll (e) {
  // If the scroll event is dispatched from a scrollable component
  // implemented through scrollerjs, then the appear/disappear events
  // should be treated specially by handleScrollerScroll.
  if (e.originalType === 'scrolling') {
    handleScrollerScroll(e)
  }
  else {
    handleWindowScroll()
  }
}

function handleScrollerScroll (e) {
  const cmps = componentsInScroller
  const len = cmps.length
  direction = e.direction
  for (let i = 0; i < len; i++) {
    const component = cmps[i]
    const appear = isComponentInScrollerAppear(component)
    if (appear && !component._appear) {
      component._appear = true
      fireEvent(component, 'appear')
    }
    else if (!appear && component._appear) {
      component._appear = false
      fireEvent(component, 'disappear')
    }
  }
}

function handleWindowScroll () {
  const y = window.scrollY
  direction = y >= scrollY ? 'up' : 'down'
  scrollY = y

  const len = componentsOutOfScroller.length
  if (len === 0) {
    return
  }
  for (let i = 0; i < len; i++) {
    const component = componentsOutOfScroller[i]
    const appear = isComponentInWindow(component)
    if (appear && !component._appear) {
      component._appear = true
      fireEvent(component, 'appear')
    }
    else if (!appear && component._appear) {
      component._appear = false
      fireEvent(component, 'disappear')
    }
  }
}

function isComponentInScrollerAppear (component) {
  let parentScroller = component._parentScroller
  const cmpRect = component.node.getBoundingClientRect()
  if (!isComponentInWindow(component)) {
    return false
  }
  while (parentScroller) {
    const parentRect = parentScroller.node.getBoundingClientRect()
    if (!(cmpRect.right > parentRect.left
        && cmpRect.left < parentRect.right
        && cmpRect.bottom > parentRect.top
        && cmpRect.top < parentRect.bottom)) {
      return false
    }
    parentScroller = parentScroller._parentScroller
  }
  return true
}

function isComponentInWindow (component) {
  const rect = component.node.getBoundingClientRect()
  return rect.right > 0 && rect.left < window.innerWidth &&
         rect.bottom > 0 && rect.top < window.innerHeight
}

function fireEvent (component, type) {
  const evt = document.createEvent('HTMLEvents')
  const data = { direction: direction }
  evt.initEvent(type, false, false)
  evt.data = data
  utils.extend(evt, data)
  component.node.dispatchEvent(evt)
}

function throttle (func, wait) {
  let context, args, result
  let timeout = null
  let previous = 0
  const later = function () {
    previous = Date.now()
    timeout = null
    result = func.apply(context, args)
  }
  return function () {
    const now = Date.now()
    const remaining = wait - (now - previous)
    context = this
    args = arguments
    if (remaining <= 0) {
      clearTimeout(timeout)
      timeout = null
      previous = now
      result = func.apply(context, args)
    }
    else if (!timeout) {
      timeout = setTimeout(later, remaining)
    }
    return result
  }
}

module.exports = AppearWatcher
