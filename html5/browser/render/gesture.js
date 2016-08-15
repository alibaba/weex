/* eslint-disable */

'use strict'

var isInitialized = false

// major events supported:
//   panstart
//   panmove
//   panend
//   swipe
//   longpress
// extra events supported:
//   dualtouchstart
//   dualtouch
//   dualtouchend
//   tap
//   doubletap
//   pressend

var doc = window.document
var docEl = doc.documentElement
var slice = Array.prototype.slice
var gestures = {}
var lastTap = null

/**
 * find the closest common ancestor
 * if there's no one, return null
 *
 * @param  {Element} el1 first element
 * @param  {Element} el2 second element
 * @return {Element}     common ancestor
 */
function getCommonAncestor(el1, el2) {
  var el = el1
  while (el) {
    if (el.contains(el2) || el == el2) {
      return el
    }
    el = el.parentNode
  }
  return null
}

/**
 * fire a HTMLEvent
 *
 * @param  {Element} element which element to fire a event on
 * @param  {string}  type    type of event
 * @param  {object}  extra   extra data for the event object
 */
function fireEvent(element, type, extra) {
  var event = doc.createEvent('HTMLEvents')
  event.initEvent(type, true, true)

  if (typeof extra === 'object') {
    for (var p in extra) {
      event[p] = extra[p]
    }
  }

  element.dispatchEvent(event)
}

/**
 * calc the transform
 * assume 4 points ABCD on the coordinate system
 * > rotate：angle rotating from AB to CD
 * > scale：scale ratio from AB to CD
 * > translate：translate shift from A to C
 *
 * @param  {number} x1 abscissa of A
 * @param  {number} y1 ordinate of A
 * @param  {number} x2 abscissa of B
 * @param  {number} y2 ordinate of B
 * @param  {number} x3 abscissa of C
 * @param  {number} y3 ordinate of C
 * @param  {number} x4 abscissa of D
 * @param  {number} y4 ordinate of D
 * @return {object}    transform object like
 *   {rotate, scale, translate[2], matrix[3][3]}
 */
function calc(x1, y1, x2, y2, x3, y3, x4, y4) {
  var rotate = Math.atan2(y4 - y3, x4 - x3) - Math.atan2(y2 - y1, x2 - x1)
  var scale = Math.sqrt((Math.pow(y4 - y3, 2)
    + Math.pow(x4 - x3, 2)) / (Math.pow(y2 - y1, 2)
    + Math.pow(x2 - x1, 2)))
  var translate = [
    x3
    - scale * x1 * Math.cos(rotate)
    + scale * y1 * Math.sin(rotate),
    y3
    - scale * y1 * Math.cos(rotate)
    - scale * x1 * Math.sin(rotate)]

  return {
    rotate: rotate,
    scale: scale,
    translate: translate,
    matrix: [
      [scale * Math.cos(rotate), -scale * Math.sin(rotate), translate[0]],
      [scale * Math.sin(rotate), scale * Math.cos(rotate), translate[1]],
      [0, 0, 1]
    ]
  }
}

/**
 * take over the touchstart events. Add new touches to the gestures.
 * If there is no previous records, then bind touchmove, tochend
 * and touchcancel events.
 * new touches initialized with state 'tapping', and within 500 milliseconds
 * if the state is still tapping, then trigger gesture 'press'.
 * If there are two touche points, then the 'dualtouchstart' is triggerd. The
 * node of the touch gesture is their cloest common ancestor.
 *
 * @event
 * @param  {event} event
 */
function touchstartHandler(event) {

  if (Object.keys(gestures).length === 0) {
    docEl.addEventListener('touchmove', touchmoveHandler, false)
    docEl.addEventListener('touchend', touchendHandler, false)
    docEl.addEventListener('touchcancel', touchcancelHandler, false)
  }

  // record every touch
  for (var i = 0; i < event.changedTouches.length; i++) {
    var touch = event.changedTouches[i]
    var touchRecord = {}

    for (var p in touch) {
      touchRecord[p] = touch[p]
    }

    var gesture = {
      startTouch: touchRecord,
      startTime: Date.now(),
      status: 'tapping',
      element: event.srcElement || event.target,
      pressingHandler: setTimeout(function (element, touch) {
        return function () {
          if (gesture.status === 'tapping') {
            gesture.status = 'pressing'

            fireEvent(element, 'longpress', {
              // add touch data for weex
              touch: touch,
              touches: event.touches,
              changedTouches: event.changedTouches,
              touchEvent: event
            })
          }

          clearTimeout(gesture.pressingHandler)
          gesture.pressingHandler = null
        }
      }(event.srcElement || event.target, event.changedTouches[i]), 500)
    }
    gestures[touch.identifier] = gesture
  }

  if (Object.keys(gestures).length == 2) {
    var elements = []

    for (var p in gestures) {
      elements.push(gestures[p].element)
    }

    fireEvent(getCommonAncestor(elements[0], elements[1]), 'dualtouchstart', {
      touches: slice.call(event.touches),
      touchEvent: event
    })
  }
}

/**
 * take over touchmove events, and handle pan and dual related gestures.
 *
 * 1. traverse every touch point：
 * > if 'tapping' and the shift is over 10 pixles, then it's a 'panning'.
 * 2. if there are two touch points, then calc the tranform and trigger
 *   'dualtouch'.
 *
 * @event
 * @param  {event} event
 */
function touchmoveHandler(event) {
  for (var i = 0; i < event.changedTouches.length; i++) {
    var touch = event.changedTouches[i]
    var gesture = gestures[touch.identifier]

    if (!gesture) {
      return
    }

    if (!gesture.lastTouch) {
      gesture.lastTouch = gesture.startTouch
    }
    if (!gesture.lastTime) {
      gesture.lastTime = gesture.startTime
    }
    if (!gesture.velocityX) {
      gesture.velocityX = 0
    }
    if (!gesture.velocityY) {
      gesture.velocityY = 0
    }
    if (!gesture.duration) {
      gesture.duration = 0
    }

    var time =  Date.now() - gesture.lastTime
    var vx = (touch.clientX - gesture.lastTouch.clientX) / time
    var vy = (touch.clientY - gesture.lastTouch.clientY) / time

    var RECORD_DURATION = 70
    if (time > RECORD_DURATION) {
      time = RECORD_DURATION
    }
    if (gesture.duration + time > RECORD_DURATION) {
      gesture.duration = RECORD_DURATION - time
    }

    gesture.velocityX = (gesture.velocityX * gesture.duration + vx * time)
      / (gesture.duration + time)
    gesture.velocityY = (gesture.velocityY * gesture.duration + vy * time)
      / (gesture.duration + time)
    gesture.duration += time

    gesture.lastTouch = {}

    for (var p in touch) {
      gesture.lastTouch[p] = touch[p]
    }
    gesture.lastTime = Date.now()

    var displacementX = touch.clientX - gesture.startTouch.clientX
    var displacementY = touch.clientY - gesture.startTouch.clientY
    var distance = Math.sqrt(Math.pow(displacementX, 2)
      + Math.pow(displacementY, 2))
    var isVertical = !(Math.abs(displacementX) > Math.abs(displacementY))
    var direction = isVertical
      ? displacementY >= 0 ? 'down' : 'up'
      : displacementX >= 0 ? 'right' : 'left'

    // magic number 10: moving 10px means pan, not tap
    if ((gesture.status === 'tapping' || gesture.status === 'pressing')
        && distance > 10) {
      gesture.status = 'panning'
      gesture.isVertical = isVertical
      gesture.direction = direction

      fireEvent(gesture.element, 'panstart', {
        touch: touch,
        touches: event.touches,
        changedTouches: event.changedTouches,
        touchEvent: event,
        isVertical: gesture.isVertical,
        direction: direction
      })
    }

    if (gesture.status === 'panning') {
      gesture.panTime = Date.now()

      fireEvent(gesture.element, 'panmove', {
        displacementX: displacementX,
        displacementY: displacementY,
        touch: touch,
        touches: event.touches,
        changedTouches: event.changedTouches,
        touchEvent: event,
        isVertical: gesture.isVertical,
        direction: direction
      })
    }
  }

  if (Object.keys(gestures).length == 2) {
    var position = []
    var current = []
    var elements = []
    var transform

    for (var i = 0; i < event.touches.length; i++) {
      var touch = event.touches[i]
      var gesture = gestures[touch.identifier]
      position.push([gesture.startTouch.clientX, gesture.startTouch.clientY])
      current.push([touch.clientX, touch.clientY])
    }

    for (var p in gestures) {
      elements.push(gestures[p].element)
    }

    transform = calc(
      position[0][0],
      position[0][1],
      position[1][0],
      position[1][1],
      current[0][0],
      current[0][1],
      current[1][0],
      current[1][1]
    )
    fireEvent(getCommonAncestor(elements[0], elements[1]), 'dualtouch', {
      transform: transform,
      touches: event.touches,
      touchEvent: event
    })
  }
}

/**
 * handle touchend event
 *
 * 1. if there are tow touch points, then trigger 'dualtouchend'如
 *
 * 2. traverse every touch piont：
 * > if tapping, then trigger 'tap'.
 * If there is a tap 300 milliseconds before, then it's a 'doubletap'.
 * > if padding, then decide to trigger 'panend' or 'swipe'
 * > if pressing, then trigger 'pressend'.
 *
 * 3. remove listeners.
 *
 * @event
 * @param  {event} event
 */
function touchendHandler(event) {

  if (Object.keys(gestures).length == 2) {
    var elements = []
    for (var p in gestures) {
      elements.push(gestures[p].element)
    }
    fireEvent(getCommonAncestor(elements[0], elements[1]), 'dualtouchend', {
      touches: slice.call(event.touches),
      touchEvent: event
    })
  }

  for (var i = 0; i < event.changedTouches.length; i++) {
    var touch = event.changedTouches[i]
    var id = touch.identifier
    var gesture = gestures[id]

    if (!gesture) {
      continue
    }

    if (gesture.pressingHandler) {
      clearTimeout(gesture.pressingHandler)
      gesture.pressingHandler = null
    }

    if (gesture.status === 'tapping') {
      gesture.timestamp = Date.now()
      fireEvent(gesture.element, 'tap', {
        touch: touch,
        touchEvent: event
      })

      if (lastTap && gesture.timestamp - lastTap.timestamp < 300) {
        fireEvent(gesture.element, 'doubletap', {
          touch: touch,
          touchEvent: event
        })
      }

      lastTap = gesture
    }

    if (gesture.status === 'panning') {
      var now = Date.now()
      var duration = now - gesture.startTime
      var displacementX = touch.clientX - gesture.startTouch.clientX
      var displacementY = touch.clientY - gesture.startTouch.clientY

      var velocity = Math.sqrt(gesture.velocityY * gesture.velocityY
        + gesture.velocityX * gesture.velocityX)
      var isSwipe = velocity > 0.5 && (now - gesture.lastTime) < 100
      var extra = {
        duration: duration,
        isSwipe: isSwipe,
        velocityX: gesture.velocityX,
        velocityY: gesture.velocityY,
        displacementX: displacementX,
        displacementY: displacementY,
        touch: touch,
        touches: event.touches,
        changedTouches: event.changedTouches,
        touchEvent: event,
        isVertical: gesture.isVertical,
        direction: gesture.direction
      }

      fireEvent(gesture.element, 'panend', extra)
      if (isSwipe) {
        fireEvent(gesture.element, 'swipe', extra)
      }
    }

    if (gesture.status === 'pressing') {
      fireEvent(gesture.element, 'pressend', {
        touch: touch,
        touchEvent: event
      })
    }

    delete gestures[id]
  }

  if (Object.keys(gestures).length === 0) {
    docEl.removeEventListener('touchmove', touchmoveHandler, false)
    docEl.removeEventListener('touchend', touchendHandler, false)
    docEl.removeEventListener('touchcancel', touchcancelHandler, false)
  }
}

/**
 * handle touchcancel
 *
 * 1. if there are two touch points, then trigger 'dualtouchend'
 *
 * 2. traverse everty touch point:
 * > if pannnig, then trigger 'panend'
 * > if pressing, then trigger 'pressend'
 *
 * 3. remove listeners
 *
 * @event
 * @param  {event} event
 */
function touchcancelHandler(event) {

  if (Object.keys(gestures).length == 2) {
    var elements = []
    for (var p in gestures) {
      elements.push(gestures[p].element)
    }
    fireEvent(getCommonAncestor(elements[0], elements[1]), 'dualtouchend', {
      touches: slice.call(event.touches),
      touchEvent: event
    })
  }

  for (var i = 0; i < event.changedTouches.length; i++) {
    var touch = event.changedTouches[i]
    var id = touch.identifier
    var gesture = gestures[id]

    if (!gesture) {
      continue
    }

    if (gesture.pressingHandler) {
      clearTimeout(gesture.pressingHandler)
      gesture.pressingHandler = null
    }

    if (gesture.status === 'panning') {
      fireEvent(gesture.element, 'panend', {
        touch: touch,
        touches: event.touches,
        changedTouches: event.changedTouches,
        touchEvent: event
      })
    }
    if (gesture.status === 'pressing') {
      fireEvent(gesture.element, 'pressend', {
        touch: touch,
        touchEvent: event
      })
    }
    delete gestures[id]
  }

  if (Object.keys(gestures).length === 0) {
    docEl.removeEventListener('touchmove', touchmoveHandler, false)
    docEl.removeEventListener('touchend', touchendHandler, false)
    docEl.removeEventListener('touchcancel', touchcancelHandler, false)
  }
}

if (!isInitialized) {
  docEl.addEventListener('touchstart', touchstartHandler, false)
  isInitialized = true
}

