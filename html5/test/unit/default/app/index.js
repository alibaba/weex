import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
const { expect } = chai
chai.use(sinonChai)

global.callNative = function () {}

import AppInstance from '../../../../default/app'
// import * as bundle from '../../../../default/app/bundle'
import * as ctrl from '../../../../default/app/ctrl'
import { Element } from '../../../../vdom'
import {
  registerComponent,
  requireComponent,
  requireModule
} from '../../../../default/app/register'

describe('App Instance', () => {
  const oriCallNative = global.callNative
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
    global.callNative = oriCallNative
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
      const proto = Object.getPrototypeOf(app)
      // expect(proto).to.contain.all.keys(bundle)
      expect(proto).to.contain.all.keys(ctrl)
      expect(proto).to.contain.all.keys({
        registerComponent,
        requireComponent,
        requireModule
      })
    })
  })

  describe('call tasks', () => {
    it('with no args & callback', () => {
      const tasks = [{
        module: 'dom',
        method: 'createBody',
        args: []
      }]

      app.callTasks(tasks)
      expect(callNativeSpy.lastCall.args[1]).to.deep.equal(tasks)
    })

    it('with callback', (done) => {
      const tasks = [{
        module: 'dom',
        method: 'createBody',
        args: []
      }]

      app.callTasks(tasks)
      expect(callNativeSpy.lastCall.args[1]).to.deep.equal(tasks)
      done()
    })

    it('with function arg', (done) => {
      const tasks = [{
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
      const node = new Element()
      node.ref = '1'

      const tasks = [{
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
      const tasks = [{
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

