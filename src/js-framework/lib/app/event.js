/**
 * @fileOverview event manager
 */

import * as _ from '../util'

export default function EventManager() {
  this.els = []
  this.targets = []
}

EventManager.prototype._get = function (el, force) {
  var index = _.indexOf(this.els, el)
  var target
  if (index >= 0) {
    target = this.targets[index]
  }
  else if (force) {
    target = {el: el, events: {}}
    this.els.push(el)
    this.targets.push(target)
  }
  return target
}

EventManager.prototype.add = function (el, type, handler) {
  if (typeof el !== 'object' || !el ||
    typeof type !== 'string' || !type ||
    typeof handler !== 'function') {
    return
  }
  var target = this._get(el, true)
  target.events[type] = handler
}

EventManager.prototype.remove = function (el, type) {
  if (typeof el !== 'object' || !el ||
    typeof type !== 'string' || !type) {
    return
  }
  var target = this._get(el)
  if (target) {
    delete target.events[type]
  }
}

EventManager.prototype.fire = function (el, type, e) {
  var target = this._get(el)
  var handler, el
  if (target) {
    el = target.el
    handler = target.events[type]
    if (typeof handler === 'function') {
      handler.call(el, e)
    }
  }
}