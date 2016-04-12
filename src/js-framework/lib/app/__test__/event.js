import {expect} from 'chai'
import EventManager from '../event'

// test cases

// targets[]
// targets[].el
// targets[].events{}
describe('create a new manager instance', function () {
  it('has targets', function () {
    var manager = new EventManager()
    expect(manager).an.instanceof(EventManager)
    expect(manager.targets).an('array')
    expect(manager.targets).empty
  })
  it('has different instance and targets in each instance', function () {
    var manager1 = new EventManager()
    var manager2 = new EventManager()
    expect(manager1.targets).an('array')
    expect(manager1.targets).empty
    expect(manager2.targets).an('array')
    expect(manager2.targets).empty
    expect(manager1).not.equal(manager2)
    expect(manager1.targets).not.equal(manager2.targets)
  })
})

// add(el, type, handler)
describe('add event handler', function () {
  var manager, el, handler
  var existedEl = {flag: 1}
  var existedHandler = function () {}
  beforeEach('create a manager instance', function () {
    manager = new EventManager()
    el = {flag: 2}
    handler = function () {}
    manager.add(existedEl, 'click', existedHandler)
  })
  afterEach(function () {
    manager = null
    el = null
    handler = null
  })
  // - add to a new target
  it('add to a new target', function () {
    var target
    manager.add(el, 'click', handler)
    expect(manager.targets.length).equal(2)
    target = manager.targets[1]
    expect(target).a('object')
    expect(target.el).equal(el)
    expect(target.events).a('object')
    expect(target.events.click).equal(handler)
  })
  // - cover exsited type
  it('add to an existed target', function () {
    var target
    manager.add(existedEl, 'click', handler)
    expect(manager.targets.length).equal(1)
    target = manager.targets[0]
    expect(target.el).equal(existedEl)
    expect(target.events.click).equal(handler)
  })
  // - add new type
  it('add new type', function () {
    var target
    manager.add(existedEl, 'scroll', handler)
    expect(manager.targets.length).equal(1)
    target = manager.targets[0]
    expect(target.el).equal(existedEl)
    expect(target.events.click).equal(existedHandler)
    expect(target.events.scroll).equal(handler)
  })
  // - error null el
  it('null el error', function () {
    var target, keys
    manager.add(null, 'scroll', handler)
    expect(manager.targets.length).equal(1)
    target = manager.targets[0]
    expect(target.el).equal(existedEl)
    expect(target.events.click).equal(existedHandler)
    keys = Object.keys(target.events)
    expect(keys.length).equal(1)
  })
  // - error null type
  it('null type error', function () {
    var target, keys
    manager.add(el, null, handler)
    expect(manager.targets.length).equal(1)
    target = manager.targets[0]
    expect(target.el).equal(existedEl)
    expect(target.events.click).equal(existedHandler)
    keys = Object.keys(target.events)
    expect(keys.length).equal(1)
  })
  // - error null handler
  it('null handler error', function () {
    var target, keys
    manager.add(el, 'scroll', null)
    expect(manager.targets.length).equal(1)
    target = manager.targets[0]
    expect(target.el).equal(existedEl)
    expect(target.events.click).equal(existedHandler)
    keys = Object.keys(target.events)
    expect(keys.length).equal(1)
  })
})

// remove(el, type)
describe('remove event handler', function () {
  var manager, el, handler
  var existedEl = {flag: 1}
  var existedHandler = function () {}
  beforeEach('create a manager instance', function () {
    manager = new EventManager()
    el = {flag: 2}
    handler = function () {}
    manager.add(existedEl, 'click', existedHandler)
  })
  afterEach(function () {
    manager = null
    el = null
    handler = null
  })
  it('remove nothing if no args', function () {
    var target, keys
    manager.remove()
    expect(manager.targets.length).equal(1)
    target = manager.targets[0]
    keys = Object.keys(target.events)
    expect(keys).eql(['click'])
  })
  // - remove from an existed target
  it('remove from an existed target', function () {
    var target, keys
    manager.remove(existedEl, 'click')
    expect(manager.targets.length).equal(1)
    target = manager.targets[0]
    keys = Object.keys(target.events)
    expect(keys.length).equal(0)
  })
  // - remove a non-existed type
  it('remove a non-existed type', function () {
    var target, keys
    manager.remove(existedEl, 'scroll')
    expect(manager.targets.length).equal(1)
    target = manager.targets[0]
    expect(target.events.click).equal(existedHandler)
    keys = Object.keys(target.events)
    expect(keys.length).equal(1)
  })
  // - remove from a non-existed target
  it('remove from a non-existed target', function () {
    var target, keys
    manager.remove(el, 'click')
    expect(manager.targets.length).equal(1)
    target = manager.targets[0]
    expect(target.events.click).equal(existedHandler)
    keys = Object.keys(target.events)
    expect(keys.length).equal(1)
  })
})

// fire(el, type, e)
describe('fire event', function () {
  var manager, counter, context, evt, receivedEvt, el, handler
  var existedEl = {flag: 1}
  var existedHandler = function (e) {
    counter++
    context = this
    receivedEvt = e
  }
  beforeEach('create a manager instance', function () {
    counter = 0
    context = null
    evt = {}
    manager = new EventManager()
    el = {flag: 2}
    handler = function () {}
    manager.add(existedEl, 'click', existedHandler)
  })
  afterEach(function () {
    counter = 0
    context = null
    evt = null
    manager = null
    el = null
    handler = null
  })
  // - fire an existed type for an existed target
  //   - handler was called
  //   - event argument was passed
  it('fire an existed type for an existed target', function () {
    manager.fire(existedEl, 'click', evt)
    expect(counter).equal(1)
    expect(receivedEvt).equal(evt)
  })
  // - fire a non-existed type for an existed target
  it('fire an existed type for an existed target', function () {
    manager.fire(existedEl, 'scroll', evt)
    expect(counter).equal(0)
  })
  // - fire for a non-existed target
  it('fire an existed type for an existed target', function () {
    manager.fire(el, 'click', evt)
    expect(counter).equal(0)
  })
})
