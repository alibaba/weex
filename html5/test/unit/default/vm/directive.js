import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
const { expect } = chai
chai.use(sinonChai)

import {
  applyNaitveComponentOptions,
  bindSubVm,
  bindSubVmAfterInitialized
} from '../../../../frameworks/legacy/vm/directive'

import {
  initState
} from '../../../../frameworks/legacy/core/state'
import config from '../../../../frameworks/legacy/config'

const { nativeComponentMap } = config
const directive = {}

function extendVm (vm, methodNames) {
  methodNames.forEach((name) => {
    vm[name] = directive[name]
  })
  initState(vm)
}

function initElement (el) {
  el.setAttr = function (k, v) { this.attr[k] = v }
  el.setStyle = function (k, v) { this.style[k] = v }
  el.setClassStyle = function (style) { this.classStyle = style }
  el.addEvent = function (t, h) {
    this.event[t] = h
  }
}

// exports._watch(calc, callback)
// exports._bindKey(obj, key, calc)
// exports._bindDir(el, name, data)
describe.skip('watch key or props', () => {
  let vm, cb
  const update = function () { return this.a + this.b }
  const update2 = function () { return this.plus() }
  const callPlus = sinon.spy()
  const methodNames = ['_watch', '_bindKey', '_bindDir']
  beforeEach(() => {
    vm = {
      _data: { a: 1, b: 2 },
      _methods: {
        plus: function () {
          callPlus()
          return this.a + this.b
        }
      },
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
    const value = update.call(vm)
    expect(cb).not.called
    expect(value).equal(3)
    vm.a = 2
    expect(vm._data).eql({ a: 2, b: 2 })
    expect(cb).calledOnce
    expect(cb).calledOn(undefined)
    expect(cb).calledWith(4)
    vm.b = 3
    expect(vm._data).eql({ a: 2, b: 3 })
    expect(cb).calledTwice
    expect(cb).calledWith(5)
  })

  // - update object key-value when data source changed
  it('watch k-v pairs', () => {
    const el = { attr: { c: 3 }}
    initElement(el)
    const attr = el.attr
    vm._bindKey = directive._bindKey
    vm._bindKey(el, 'attr', 'd', update)
    expect(attr.d).equal(3)
    vm.a = 2
    expect(vm._data).eql({ a: 2, b: 2 })
    expect(attr.d).equal(4)
    vm.b = 3
    expect(vm._data).eql({ a: 2, b: 3 })
    expect(attr.d).equal(5)
  })
  // - update prop value when data source changed
  it('watch element props', () => {
    const el = { attr: { c: 3 }}
    initElement(el)
    vm._bindDir(el, 'attr', { d: 4, e: update, f: update2 })
    expect(el.attr).eql({ c: 3, d: 4, e: 3, f: 3 })
    expect(callPlus).calledOnce
    vm.a = 2
    expect(vm._data).eql({ a: 2, b: 2 })
    expect(el.attr).eql({ c: 3, d: 4, e: 4, f: 4 })
    expect(callPlus).calledTwice
    vm.b = 3
    expect(vm._data).eql({ a: 2, b: 3 })
    expect(el.attr).eql({ c: 3, d: 4, e: 5, f: 5 })
    expect(callPlus).calledThird
  })
})

describe('apply component options', () => {
  it('apply top prop', () => {
    nativeComponentMap['test-apply'] = {
      type: 'test-apply1',
      append: 'tree'
    }
    const template = {
      type: 'test-apply'
    }
    applyNaitveComponentOptions(template)
    expect(template.type).to.be.equal('test-apply')
    expect(template.append).to.be.equal('tree')

    delete nativeComponentMap['test-apply']
  })

  it('apply a object', () => {
    nativeComponentMap['test-apply'] = {
      classList: ['c'],
      attr: {
        a: 'a',
        b: 'b'
      }
    }
    const spy = sinon.spy()
    const template = {
      type: 'test-apply',
      classList: spy,
      attr: {
        b: '2'
      }
    }
    applyNaitveComponentOptions(template)

    expect(template).to.deep.equal({
      type: 'test-apply',
      classList: spy,
      attr: {
        a: 'a',
        b: '2'
      }
    })

    delete nativeComponentMap['test-apply']
  })
})

// exports._setId(id, el, vm) ?
// exports._setAttr(el, attr)
// exports._setClass(el, classList)
// exports._setStyle(el, style)
describe.skip('set props', () => {
  let vm, el
  const update = function () { return this.a + this.b }
  const methodNames = [
    '_watch', '_bindKey', '_bindDir',
    '_setId', '_setAttr', '_setClass', '_setStyle',
    '_setEvent', '_bindEvents', '_bindElement']

  before(() => {
    sinon.stub(console, 'info')
    sinon.stub(console, 'warn')
    sinon.stub(console, 'error')
  })

  after(() => {
    console.info.restore()
    console.warn.restore()
    console.error.restore()
  })

  beforeEach(() => {
    el = {
      attr: {}, style: {}
    }
    initElement(el)
    vm = {
      _ids: {},
      _options: {
        style: {
          x: { e: 0, f: 5 },
          y: { f: 6 },
          z: { e: 10 }
        }
      },
      _data: { a: 1, b: 2, classNameVar: 'x', idVar: 'n' },
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
    const targetVm = {}
    vm._setId('m', el, targetVm)
    expect(vm._ids).a('object')
    expect(vm._ids.m).a('object')
    expect(vm._ids.m.el).equal(el)
    expect(vm._ids.m.vm).equal(targetVm)
  })
  // - set function to id
  it('set function to id', () => {
    const targetVm = {}
    vm._setId(function () { return this.idVar }, el, targetVm)
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
    vm._setAttr(el, { c: 1, d: update })
    expect(el.attr).eql({ c: 1, d: 3 })
  })
  // - set value to class
  it('set value to classList', () => {
    vm._setClass(el, [])
    expect(el.classStyle).eql({})
    vm._setClass(el, ['x', 'y'])
    expect(el.classStyle).eql({ e: 0, f: 6 })
    vm._setClass(el, [])
    expect(el.classStyle).eql({})
  })
  // - set value to class with another class order
  it('set value to classList with another class order', () => {
    vm._setClass(el, ['y', 'x'])
    expect(el.classStyle).eql({ e: 0, f: 5 })
  })
  // - set a function to class
  it('set a function to classList', () => {
    vm._setClass(el, function () {
      return [this.classNameVar, 'y']
    })
    expect(el.classStyle).eql({ e: 0, f: 6 })
    vm.classNameVar = 'z'
    expect(el.classStyle).eql({ e: 10, f: 6 })
  })
  // - set value to style
  // - set function to style
  it('set value to style', () => {
    vm._setStyle(el, { c: 1, d: update })
    expect(el.style).eql({ c: 1, d: 3 })
  })

  it('bind elements', () => {
    // _data: a, b, classNameVar, idVar
    // _css: {
    //   x: {e: 0, f: 5},
    //   y: {f: 6},
    //   z: {e: 10}
    // },
    el.event = {}

    vm._bindElement(el, {
      id: 'abc',
      attr: {
        a: function () { return this.a },
        b: 456
      },
      style: {
        a: 123,
        b: function () { return this.b }
      },
      events: { click: 'foo' }
    })
    expect(vm._ids).a('object')
    expect(vm._ids.abc).a('object')
    expect(vm._ids.abc.el).equal(el)
    expect(vm._ids.abc.vm).equal(vm)
    expect(el.attr.a).eql(1)
    expect(el.attr.b).eql(456)
    expect(el.style.a).eql(123)
    expect(el.style.b).eql(2)
    expect(el.event.click).a('function')
  })
})

// exports._bindEvents(el, events)
describe.skip('bind events', () => {
  let vm, el, cb
  const app = {}
  const methodNames = ['_setEvent', '_bindEvents']

  beforeEach(() => {
    cb = sinon.spy()
    el = { event: {}}
    initElement(el)

    vm = {
      _data: { a: 1 },
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
  })

  // - bind method to eventManager
  it('add event to manager by type', () => {
    vm._bindEvents(el, { click: 'foo' })
    expect(el.event.click).a('function')
  })
  // - bind method to eventManager
  it('add event to manager by handler', () => {
    const cb2 = sinon.spy()
    vm._bindEvents(el, { click: cb2 })
    expect(el.event.click).a('function')
  })
  // - fireEvent to call method
  // - with right event info
  it('fire event from manager by type', () => {
    const e = {}
    vm._bindEvents(el, { click: 'foo' })
    el.event.click(e)
    expect(cb).calledOnce
    expect(cb).calledOn(vm)
    expect(cb).calledWith(e)
  })
  // - fireEvent to call method
  // - with right event info
  it('fire event from manager by handler', () => {
    const e = {}
    vm._bindEvents(el, { click: function ($event) {
      this.foo(this.a, $event)
    } })
    el.event.click(e)
    expect(cb).calledOnce
    expect(cb).calledOn(vm)
    expect(cb).calledWith(1, e)
  })
})

// exports._bindSubVm(subVm, template)
describe('bind external infomations to sub vm', () => {
  let vm, subVm
  // const methodNames = [
  //   '_watch', '_bindKey', '_bindDir',
  //   '_setId', '_setAttr', '_setClass', '_setStyle',
  //   '_setEvent', '_bindEvents', '_bindElement',
  //   '_bindSubVm', '_bindSubVmAfterInitialized']
  beforeEach(() => {
    vm = {
      _data: { a: 1, b: 2, c: 'class-style1' },
      _watchers: [],
      _app: { eventManager: { add: () => {} }},
      _options: {
        style: {
          'class-style1': {
            aaa: 1,
            bbb: 2
          },
          'class-style2': {
            aaa: 2,
            ccc: 3
          }
        }
      },
      foo: function () {}
    }
    extendVm(vm, [])
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
    bindSubVm(vm, subVm, {
      attr: { a: 3, c: 4 },
      style: { a: 2 },
      events: { click: 'foo' }
    })
    expect(subVm.a).eql(3)
    expect(subVm.c).is.undefined
    expect(subVm._rootEl).is.undefined
  })

  it('bind props with external data', () => {
    bindSubVm(vm, subVm, {
      attr: { a: function () { return this.b } }
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
      style: { aaa: 2, bbb: function () { return this.a } }
    }
    initElement(subVm._rootEl)
    bindSubVm(vm, subVm, template)
    bindSubVmAfterInitialized(vm, subVm, template)
    expect(subVm._rootEl.style.aaa).eql(2)
    expect(subVm._rootEl.style.bbb).eql(1)
    vm.a = 3
    expect(subVm._rootEl.style.bbb).eql(3)
  })

  it('bind simply classlist to a sub vm with root element', () => {
    subVm._rootEl = {
      attr: {},
      style: {},
      event: []
    }
    const template = {
      classList: ['class-style1']
    }
    initElement(subVm._rootEl)
    bindSubVm(vm, subVm, template)
    bindSubVmAfterInitialized(vm, subVm, template)
    expect(subVm._rootEl.classStyle.aaa).eql(1)
    expect(subVm._rootEl.classStyle.bbb).eql(2)
  })

  it('bind classlist to a sub vm with root element', () => {
    subVm._rootEl = {
      attr: {},
      style: {},
      event: []
    }
    const template = {
      classList: function () {
        return [this.c]
      }
    }
    initElement(subVm._rootEl)
    bindSubVm(vm, subVm, template)
    bindSubVmAfterInitialized(vm, subVm, template)
    expect(subVm._rootEl.classStyle.aaa).eql(1)
    expect(subVm._rootEl.classStyle.bbb).eql(2)
    vm.c = 'class-style2'
    expect(subVm._rootEl.classStyle.aaa).eql(2)
    expect(subVm._rootEl.classStyle.bbb).to.be.undefined
    expect(subVm._rootEl.classStyle.ccc).eql(3)
  })

  it('bind events to a sub vm with root element', () => {
    subVm._rootEl = {
      attr: {},
      style: {},
      event: {}
    }
    const template = {
      events: { click: 'foo' }
    }
    initElement(subVm._rootEl)
    bindSubVm(vm, subVm, template)
    bindSubVmAfterInitialized(vm, subVm, template)
    // expect(subVm._rootEl.event.click).a('function')
  })
})
