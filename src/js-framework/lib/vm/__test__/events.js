import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
const expect = chai.expect
chai.use(sinonChai)

import Vm from '../'
import {Document, destroyDocument} from '../../app/dom.js'
import DomListener from '../../app/dom-listener.js'
import EventManager from '../../app/event'

describe('bind and fire events', () => {
  let doc, customComponentMap, eventManager, listener, spy

  function checkReady(vm, handler) {
    /* istanbul ignore else */
    if (vm._ready) {
      handler()
    }
    else {
      vm.$on('hook:ready', handler)
    }
  }

  beforeEach(() => {
    doc = new Document('test')
    eventManager = new EventManager()
    doc.setEventManager(eventManager)
    spy = sinon.spy()
    listener = new DomListener('test', (actions) => {
      spy(actions)
    })
    doc.setListener(listener)
    customComponentMap = {}
  })

  afterEach(() => {
    destroyDocument('test')
  })

  it('bind event and fire in a single dom', (done) => {

    customComponentMap.foo = {
      template: {
        type: 'container',
        attr: {
          a: function () {return this.x}
        },
        events: {click: 'handleClick'}
      },
      data: function () {
        return {x: 1}
      },
      methods: {
        handleClick: function () {
          this.x = 2
        }
      }
    }

    const app = {doc, customComponentMap, eventManager}
    const vm = new Vm('foo', {_app: app})

    checkReady(vm, function () {

      doc.close()

      expect(eventManager)
      expect(eventManager.targets.length).equal(1)

      const target = eventManager.targets[0]
      const el = doc.body
      expect(target).a('object')
      expect(target.el).equal(el)
      expect(target.events).a('object')
      expect(target.events.click).a('function')
      expect(el.event.length).equal(1)
      expect(el.event[0]).equal('click')

      expect(el.attr.a).eql(1)
      expect(spy.args.length).eql(1)
      expect(listener.updates.length).eql(0)

      eventManager.fire(el, 'click', {xxx: 1})

      expect(el.attr.a).eql(2)
      expect(spy.args.length).eql(1)
      expect(listener.updates).eql([
        {module: 'dom', method: 'updateAttrs', args: [el.ref, {a: 2}]}
      ])

      done()
    })
  })

  it('emit, broadcast and dispatch vm events', (done) => {

    customComponentMap.foo = {
      template: {
        type: 'aaa',
        children: [{type: 'bar', component: true}]
      }
    }
    customComponentMap.bar = {
      template: {
        type: 'bbb'
      }
    }

    const app = {doc, customComponentMap, eventManager}
    const vm = new Vm('foo', {_app: app})

    checkReady(vm, function () {

      doc.close()

      expect(vm._childrenVms.length).eql(1)

      let subVm = vm._childrenVms[0]
      expect(vm._type).eql('foo')
      expect(subVm._type).eql('bar')

      let spyA = sinon.spy()
      let spyB = sinon.spy()
      vm.$on('customTypeA', spyA)
      subVm.$on('customTypeA', spyB)

      let detail = {aaa: 111}
      vm.$emit('customTypeA', detail)
      expect(spyA.args.length).eql(1)
      expect(spyB.args.length).eql(0)

      detail = {aaa: 111}
      subVm.$emit('customTypeA', detail)
      expect(spyA.args.length).eql(1)
      expect(spyB.args.length).eql(1)

      detail = {aaa: 111}
      vm.$broadcast('customTypeA', detail)
      expect(spyA.args.length).eql(2)
      expect(spyB.args.length).eql(2)

      detail = {aaa: 111}
      subVm.$broadcast('customTypeA', detail)
      expect(spyA.args.length).eql(2)
      expect(spyB.args.length).eql(3)

      detail = {aaa: 111}
      vm.$dispatch('customTypeA', detail)
      expect(spyA.args.length).eql(3)
      expect(spyB.args.length).eql(3)

      detail = {aaa: 111}
      subVm.$dispatch('customTypeA', detail)
      expect(spyA.args.length).eql(4)
      expect(spyB.args.length).eql(4)

      vm.$off('customTypeA', spyA)
      subVm.$off('customTypeA')

      detail = {aaa: 111}
      vm.$emit('customTypeA', detail)
      detail = {aaa: 111}
      subVm.$emit('customTypeA', detail)
      detail = {aaa: 111}
      vm.$broadcast('customTypeA', detail)
      detail = {aaa: 111}
      subVm.$broadcast('customTypeA', detail)
      detail = {aaa: 111}
      vm.$dispatch('customTypeA', detail)
      detail = {aaa: 111}
      subVm.$dispatch('customTypeA', detail)

      expect(spyA.args.length).eql(4)
      expect(spyB.args.length).eql(4)

      let spyAA = function (e) {
        e.stop()
        spyA()
      }
      let spyBB = function (e) {
        e.stop()
        spyB()
      }

      vm.$on('customTypeA', spyAA)
      subVm.$on('customTypeA', spyBB)
      vm.$off()
      vm.$off('unknownTypeA', spyA)

      detail = {aaa: 111}
      vm.$emit('customTypeA', detail)
      expect(spyA.args.length).eql(5)
      expect(spyB.args.length).eql(4)
      detail = {aaa: 111}
      subVm.$emit('customTypeA', detail)
      expect(spyA.args.length).eql(5)
      expect(spyB.args.length).eql(5)
      detail = {aaa: 111}
      vm.$broadcast('customTypeA', detail)
      expect(spyA.args.length).eql(6)
      expect(spyB.args.length).eql(5)
      detail = {aaa: 111}
      subVm.$broadcast('customTypeA', detail)
      expect(spyA.args.length).eql(6)
      expect(spyB.args.length).eql(6)
      detail = {aaa: 111}
      vm.$dispatch('customTypeA', detail)
      expect(spyA.args.length).eql(7)
      expect(spyB.args.length).eql(6)
      detail = {aaa: 111}
      subVm.$dispatch('customTypeA', detail)
      expect(spyA.args.length).eql(7)
      expect(spyB.args.length).eql(7)

      done()
    })
  })

  it('broadcast for repeat vms', (done) => {
    const vmSpy = sinon.spy()
    const subVmSpy = sinon.spy()

    customComponentMap.foo = {
      data: function () {
        return {list: [{a: 1}, {a: 2}, {a: 3}]}
      },
      template: {
        type: 'container',
        children: [{
          type: 'bar', component: true,
          repeat: function () {return this.list}
        }]
      },
      events: {
        customTypeA: function (e) {
          vmSpy(this, e)
        }
      }
    }
    customComponentMap.bar = {
      template: {
        type: 'aaa'
      },
      events: {
        customTypeA: function (e) {
          subVmSpy(this, e)
        }
      }
    }

    const app = {doc, customComponentMap, eventManager}
    const vm = new Vm('foo', {_app: app})

    checkReady(vm, function () {
      doc.close()
      expect(vm._childrenVms.length).eql(3)

      let detail = {aaa: 111}
      vm.$emit('customTypeA', detail)
      expect(vmSpy.args.length).eql(1)
      expect(subVmSpy.args.length).eql(0)
      expect(vmSpy.args[0][0]).equal(vm)
      expect(vmSpy.args[0][1]).is.an.object
      expect(vmSpy.args[0][1].detail).equal(detail)

      detail = {aaa: 111}
      vm.$broadcast('customTypeA', detail)
      expect(vmSpy.args.length).eql(2)
      expect(subVmSpy.args.length).eql(3)
      expect(vmSpy.args[1][0]).equal(vm)
      expect(vmSpy.args[1][1]).is.an.object
      expect(vmSpy.args[1][1].detail).equal(detail)
      expect(subVmSpy.args[1][0]).equal(vm._childrenVms[1])
      expect(subVmSpy.args[1][1]).is.an.object
      expect(subVmSpy.args[1][1].detail).equal(detail)

      done()
    })
  })

  it('dispatch from repeat vms', (done) => {
    const vmSpy = sinon.spy()
    const subVmSpy = sinon.spy()

    customComponentMap.foo = {
      data: function () {
        return {list: [{a: 1}, {a: 2}, {a: 3}]}
      },
      template: {
        type: 'container',
        children: [{
          type: 'bar', component: true,
          repeat: function () {return this.list}
        }]
      },
      events: {
        customTypeA: function (e) {
          vmSpy(this, e)
        }
      }
    }
    customComponentMap.bar = {
      template: {
        type: 'aaa'
      },
      events: {
        customTypeA: function (e) {
          subVmSpy(this, e)
        }
      }
    }

    const app = {doc, customComponentMap, eventManager}
    const vm = new Vm('foo', {_app: app})

    checkReady(vm, function () {
      doc.close()
      expect(vm._childrenVms.length).eql(3)

      let detail = {aaa: 111}
      let subVm = vm._childrenVms[1]
      subVm.$emit('customTypeA', detail)
      expect(vmSpy.args.length).eql(0)
      expect(subVmSpy.args.length).eql(1)
      expect(subVmSpy.args[0][0]).equal(subVm)
      expect(subVmSpy.args[0][1]).is.an.object
      expect(subVmSpy.args[0][1].detail).equal(detail)

      detail = {aaa: 111}
      subVm.$dispatch('customTypeA', detail)
      expect(vmSpy.args.length).eql(1)
      expect(subVmSpy.args.length).eql(2)
      expect(vmSpy.args[0][0]).equal(vm)
      expect(vmSpy.args[0][1]).is.an.object
      expect(vmSpy.args[0][1].detail).equal(detail)
      expect(subVmSpy.args[1][0]).equal(subVm)
      expect(subVmSpy.args[1][1]).is.an.object
      expect(subVmSpy.args[1][1].detail).equal(detail)

      done()
    })
  })

  it('lifecycel events', (done) => {
    let vmSpy = sinon.spy()

    customComponentMap.foo = {
      template: {
        type: 'aaa',
        children: [{type: 'bar', component: true}]
      },
      data: function () {
        return {
          x: 1
        }
      },
      init: function (e) {
        vmSpy(this, e)
        expect(this._data).is.not.ok
        expect(this.x).is.not.ok
        expect(this._parentEl).is.not.ok
      },
      created: function (e) {
        vmSpy(this, e)
        expect(this._data).is.ok
        expect(this.x).is.ok
        expect(this._parentEl).is.not.ok
      },
      ready: function (e) {
        vmSpy(this, e)
        expect(this._data).is.ok
        expect(this.x).is.ok
        expect(this._parentEl).is.ok
        expect(this._parentEl.children.length).eql(1)
      }
    }
    customComponentMap.bar = {
      template: {
        type: 'bbb'
      },
      created: function (e) {
        vmSpy(this, e)
      }
    }

    const app = {doc, customComponentMap, eventManager}
    const evSpy = sinon.spy()
    const vm = new Vm('foo', {_app: app}, null, null,
      {
        'hook:init': () => evSpy('hook:init'),
        'hook:created': () => evSpy('hook:created'),
        'hook:ready': () => evSpy('hook:ready')
      }
    )

    checkReady(vm, function () {

      doc.close()

      expect(vmSpy.args.length).eql(4)

      const subVm = vm._childrenVms[0]
      const calls = vmSpy.args.map(args => [args[0], args[1].type])
      expect(calls).eql([
        [vm, 'hook:init'],
        [vm, 'hook:created'],
        [subVm, 'hook:created'],
        [vm, 'hook:ready']
      ])

      expect(evSpy.callCount).to.be.equal(3)
      expect(evSpy.args).to.deep.equal([
        ['hook:init'],
        ['hook:created'],
        ['hook:ready']
      ])

      done()
    })
  })
})
