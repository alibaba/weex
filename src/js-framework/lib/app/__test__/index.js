import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
const {expect} = chai
chai.use(sinonChai)

import AppInstance from '../index'
import * as bundle from '../bundle'
import * as ctrl from '../ctrl'
import {Node} from '../dom'
import {
  registerComponent,
  requireComponent,
  requireModule
} from '../register'

describe('App Instance', () => {
  const callNativeSpy = sinon.spy()
  let app

  before(() => {
    global.callNative = (id, tasks, callbackId) => {
      callNativeSpy(id, tasks, callbackId)
      /* istanbul ignore if */
      if (callbackId !== '-1') {
        app.callbacks[callbackId] && app.callbacks[callbackId]()
      }
    }
  })

  beforeEach(() => {
    app = new AppInstance(Date.now() + '')
  })

  after(() => {
    global.callNative = undefined
  })

  describe('normal check', () => {
    it('is a class', () => {
      expect(AppInstance).to.be.an('function')
    })

    it('being created', () => {
      expect(app).to.be.an('object')
      expect(app).to.be.instanceof(AppInstance)
    })

    it('with some apis', () => {
      expect(app.__proto__).to.contain.all.keys(bundle)
      expect(app.__proto__).to.contain.all.keys(ctrl)
      expect(app.__proto__).to.contain.all.keys({
        registerComponent,
        requireComponent,
        requireModule
      })
    })
  })

  describe('call tasks', () => {
    it('with no args & callback', () => {
      var tasks = [{
        module: 'dom',
        method: 'createBody',
        args: []
      }]

      app.callTasks(tasks)
      expect(callNativeSpy.lastCall.args[1]).to.deep.equal(tasks)
    })

    it('with callback', (done) => {
      var tasks = [{
        module: 'dom',
        method: 'createBody',
        args: []
      }]

      app.callTasks(tasks)
      expect(callNativeSpy.lastCall.args[1]).to.deep.equal(tasks)
      done()
    })

    it('with function arg', (done) => {
      var tasks = [{
        module: 'dom',
        method: 'createBody',
        args: [() => {}]
      }]

      app.callTasks(tasks)
      expect(callNativeSpy.lastCall.args[1]).to.deep.equal(tasks)
      expect(callNativeSpy.lastCall.args[1][0].args[0]).to.be.a('string')
      done()
    })

    it('with node arg', (done) => {
      var node = new Node()
      node.ref = '1'

      var tasks = [{
        module: 'dom',
        method: 'createBody',
        args: [node]
      }]

      app.callTasks(tasks)
      expect(callNativeSpy.lastCall.args[1]).to.deep.equal(tasks)
      expect(callNativeSpy.lastCall.args[1][0].args[0]).to.be.equal('1')
      done()
    })

    it('with callback after close', (done) => {
      var tasks = [{
        module: 'dom',
        method: 'createBody',
        args: [() => {}]
      }]

      app.doc.close()

      app.callTasks(tasks)
      expect(callNativeSpy.lastCall.args[1]).to.deep.equal(tasks)
      expect(callNativeSpy.lastCall.args[1][0].args[0]).to.be.a('string')
      done()
    })
  })
})

