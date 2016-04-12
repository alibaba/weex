import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
const expect = chai.expect
chai.use(sinonChai)

import * as directive from '../directive.js'

import scope from '../instance/scope'
import EventManager from '../../app/event'

function extendVm(vm, methodNames) {
  Object.assign(vm, scope)
  methodNames.forEach((name) => {
    vm[name] = directive[name]
  })
  vm._initScope()
}

function initElement(el) {
  var eventManager = new EventManager()
  el.setAttr = function (k, v) {this.attr[k] = v}
  el.setStyle = function (k, v) {this.style[k] = v}
  el.setClassStyle = function (style) {this.classStyle = style}
  el.addEvent = function (t, h) {
    this.event.push(t)
    eventManager.add(this, t, h)
  }
  el.ownerDocument = {
    eventManager
  }
}

// exports._watch(calc, callback)
// exports._bindKey(obj, key, calc)
// exports._bindDir(el, name, data)
describe('watch key or props', () => {
  var vm, cb
  var update = function () {return this.a + this.b}
  var methodNames = ['_watch', '_bindKey', '_bindDir']
  beforeEach(() => {
    vm = {
      _data: {a: 1, b: 2},
      _methods: {},
      _watchers: [],
      _app: {}
    }
    extendVm(vm, methodNames)
    cb = sinon.spy()
  })
  afterEach(() => {
    vm = null
    cb = null
  })
  // - watch update when data source changed
  it('watch simple exp', () => {
    vm._watch(update, cb)
    var value = update.call(vm)
    expect(cb).not.called
    expect(value).equal(3)
    vm.a = 2
    expect(vm._data).eql({a: 2, b: 2})
    expect(cb).calledOnce
    expect(cb).calledOn(undefined)
    expect(cb).calledWith(4)
    vm.b = 3
    expect(vm._data).eql({a: 2, b: 3})
    expect(cb).calledTwice
    expect(cb).calledWith(5)
  })
  // - update object key-value when data source changed
  it('watch k-v pairs', () => {
    var el = {attr: {c: 3}}
    initElement(el)
    var attr = el.attr
    vm._bindKey = directive._bindKey
    vm._bindKey(el, 'attr', 'd', update)
    expect(attr.d).equal(3)
    vm.a = 2
    expect(vm._data).eql({a: 2, b: 2})
    expect(attr.d).equal(4)
    vm.b = 3
    expect(vm._data).eql({a: 2, b: 3})
    expect(attr.d).equal(5)
  })
  // - update prop value when data source changed
  it('watch element props', () => {
    var el = {attr: {c: 3}}
    initElement(el)
    vm._bindDir(el, 'attr', {d: 4, e: update})
    expect(el.attr).eql({c: 3, d: 4, e: 3})
    vm.a = 2
    expect(vm._data).eql({a: 2, b: 2})
    expect(el.attr).eql({c: 3, d: 4, e: 4})
    vm.b = 3
    expect(vm._data).eql({a: 2, b: 3})
    expect(el.attr).eql({c: 3, d: 4, e: 5})
  })
})

describe('apply component options', () => {
  var vm

  beforeEach(() => {
    vm = {
      _applyNaitveComponentOptions:
        directive._applyNaitveComponentOptions
    }
  })

  afterEach(() => {
    vm = null
  })

  it('apply "append tree" to slider', () => {
    const template = {
      type: 'slider'
    }
    vm._applyNaitveComponentOptions(template)
    expect(template.append).to.be.equal('tree')
  })

  it('apply "append tree" to cell', () => {
    const template = {
      type: 'cell'
    }
    vm._applyNaitveComponentOptions(template)
    expect(template.append).to.be.equal('tree')
  })
})

// exports._setId(id, el, vm) ?
// exports._setAttr(el, attr)
// exports._setClass(el, classList)
// exports._setStyle(el, style)
describe('set props', () => {
  var vm, el
  var update = function () {return this.a + this.b}
  var methodNames = [
    '_watch', '_bindKey', '_bindDir',
    '_setId', '_setAttr', '_setClass', '_setStyle',
    '_setEvent', '_bindEvents', '_bindElement']
  beforeEach(() => {
    el = {
      attr: {}, style: {}
    }
    initElement(el)
    vm = {
      _ids: {},
      _options: {
        style: {
          x: {e: 0, f: 5},
          y: {f: 6},
          z: {e: 10}
        }
      },
      _data: {a: 1, b: 2, classNameVar: 'x', idVar: 'n'},
      _methods: {},
      _watchers: [],
      _app: {}
    }
    extendVm(vm, methodNames)
  })
  afterEach(() => {
    el = null
    vm = null
  })
  // - set value to id
  it('set value to id', () => {
    var targetVm = {}
    vm._setId('m', el, targetVm)
    expect(vm._ids).a('object')
    expect(vm._ids.m).a('object')
    expect(vm._ids.m.el).equal(el)
    expect(vm._ids.m.vm).equal(targetVm)
  })
  // - set function to id
  it('set function to id', () => {
    var targetVm = {}
    vm._setId(function () {return this.idVar}, el, targetVm)
    expect(vm._ids.n).a('object')
    expect(vm._ids.n.el).equal(el)
    expect(vm._ids.n.vm).equal(targetVm)
    vm.idVar = 'l'
    expect(vm._ids.l).a('object')
    expect(vm._ids.l.el).equal(el)
    expect(vm._ids.l.vm).equal(targetVm)
  })
  // - set value to attr
  // - set function to attr
  it('set value to attr', () => {
    vm._setAttr(el, {c: 1, d: update})
    expect(el.attr).eql({c: 1, d: 3})
  })
  // - set value to class
  it('set value to classList', () => {
    vm._setClass(el, [])
    expect(el.classStyle).eql({})
    vm._setClass(el, ['x', 'y'])
    expect(el.classStyle).eql({e: 0, f: 6})
    vm._setClass(el, [])
    expect(el.classStyle).eql({})
  })
  // - set value to class with another class order
  it('set value to classList with another class order', () => {
    vm._setClass(el, ['y', 'x'])
    expect(el.classStyle).eql({e: 0, f: 5})
  })
  // - set a function to class
  it('set a function to classList', () => {
    vm._setClass(el, function () {
      return [this.classNameVar, 'y']
    })
    expect(el.classStyle).eql({e: 0, f: 6})
    vm.classNameVar = 'z'
    expect(el.classStyle).eql({e: 10, f: 6})
  })
  // - set value to style
  // - set function to style
  it('set value to style', () => {
    vm._setStyle(el, {c: 1, d: update})
    expect(el.style).eql({c: 1, d: 3})
  })

  it('bind elements', () => {
    // _data: a, b, classNameVar, idVar
    // _css: {
    //   x: {e: 0, f: 5},
    //   y: {f: 6},
    //   z: {e: 10}
    // },
    el.event = []
    var manager = el.ownerDocument.eventManager

    vm._bindElement(el, {
      id: 'abc',
      attr: {
        a: function () {return this.a},
        b: 456
      },
      style: {
        a: 123,
        b: function () {return this.b}
      },
      events: {click: 'foo'}
    })
    expect(vm._ids).a('object')
    expect(vm._ids.abc).a('object')
    expect(vm._ids.abc.el).equal(el)
    expect(vm._ids.abc.vm).equal(vm)
    expect(el.attr.a).eql(1)
    expect(el.attr.b).eql(456)
    expect(el.style.a).eql(123)
    expect(el.style.b).eql(2)

    expect(manager.targets.length).equal(1)
    var target = manager.targets[0]
    expect(target).a('object')
    expect(target.el).equal(el)
    expect(target.events).a('object')
    expect(target.events.click).a('function')
    expect(el.event.length).equal(1)
    expect(el.event[0]).equal('click')
  })
})

// exports._bindEvents(el, events)
describe('bind events', () => {
  var cb, manager, vm, el, manager
  var app = {}
  var methodNames = ['_setEvent', '_bindEvents']
  beforeEach(() => {

    cb = sinon.spy()
    el = {event: []}
    initElement(el)
    manager = el.ownerDocument.eventManager

    vm = {
      _data: {a: 1},
      _methods: {
        foo: cb
      },
      _app: app
    }

    extendVm(vm, methodNames)
  })
  afterEach(() => {
    vm = null
    el = null
    cb = null
    manager = null
  })
  // - bind method to eventManager
  it('add event to manager', () => {
    vm._bindEvents(el, {click: 'foo'})
    expect(manager.targets.length).equal(1)
    var target = manager.targets[0]
    expect(target).a('object')
    expect(target.el).equal(el)
    expect(target.events).a('object')
    expect(target.events.click).a('function')
    expect(el.event.length).equal(1)
    expect(el.event[0]).equal('click')
  })
  // - fireEvent to call method
  // - with right event info
  it('fire event from manager', () => {
    var e = {}
    vm._bindEvents(el, {click: 'foo'})
    manager.fire(el, 'click', e)
    expect(cb).calledOnce
    expect(cb).calledOn(vm)
    expect(cb).calledWith(e)
  })
})

// exports._bindSubVm(subVm, template)
describe('bind external infomations to sub vm', () => {
  var vm, subVm
  var methodNames = [
    '_watch', '_bindKey', '_bindDir',
    '_setId', '_setAttr', '_setClass', '_setStyle',
    '_setEvent', '_bindEvents', '_bindElement',
    '_bindSubVm', '_bindSubVmAfterInitialized']
  beforeEach(() => {
    vm = {
      _data: {a: 1, b: 2},
      _watchers: [],
      _app: {eventManager: {add: () => {}}}
    }
    extendVm(vm, methodNames)
    subVm = {
      _options: {
        props: {
          a: String,
          b: String
        }
      }
    }
  })

  it('bind to no-root-element sub vm', () => {
    vm._bindSubVm(subVm, {
      attr: {a: 3, c: 4},
      style: {a: 2},
      events: {click: 'foo'}
    })
    expect(subVm.a).eql(3)
    expect(subVm.c).is.undefined
    expect(subVm._rootEl).is.undefined
  })

  it('bind props with external data', () => {
    vm._bindSubVm(subVm, {
      attr: {a: function () {return this.b}}
    })
    expect(subVm.a).eql(2)
  })

  it('bind styles to a sub vm with root element', () => {
    subVm._rootEl = {
      attr: {},
      style: {},
      event: []
    }
    const template = {
      style: {aaa: 2, bbb: function () {return this.a}}
    }
    initElement(subVm._rootEl)
    vm._bindSubVm(subVm, template)
    vm._bindSubVmAfterInitialized(subVm, template)
    expect(subVm._rootEl.style.aaa).eql(2)
    expect(subVm._rootEl.style.bbb).eql(1)
    vm.a = 3
    expect(subVm._rootEl.style.bbb).eql(3)
  })

  it('bind events to a sub vm with root element', () => {
    subVm._rootEl = {
      attr: {},
      style: {},
      event: []
    }
    const template = {
      events: {click: 'foo'}
    }
    initElement(subVm._rootEl)
    vm._bindSubVm(subVm, template)
    vm._bindSubVmAfterInitialized(subVm, template)
    expect(subVm._rootEl.event).eql(['click'])
  })
})
