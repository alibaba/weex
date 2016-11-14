import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
const { expect } = chai
chai.use(sinonChai)

global.callNative = function () {}
global.callAddElement = function () {}

import App from '../../../../frameworks/legacy/app'
import { Element } from '../../../../runtime/vdom'

describe('App Instance', () => {
  const oriCallNative = global.callNative
  const oriCallAddElement = global.callAddElement
  const callNativeSpy = sinon.spy()
  const callAddElementSpy = sinon.spy()
  let app

  before(() => {
    global.callNative = (id, tasks, callbackId) => {
      callNativeSpy(id, tasks, callbackId)
      /* istanbul ignore if */
      if (callbackId !== '-1') {
        app.callbacks[callbackId] && app.callbacks[callbackId]()
      }
    }
    global.callAddElement = (name, ref, json, index, callbackId) => {
      callAddElementSpy(name, ref, json, index, callbackId)
      /* istanbul ignore if */
      if (callbackId !== '-1') {
        app.callbacks[callbackId] && app.callbacks[callbackId]()
      }
    }
  })

  beforeEach(() => {
    app = new App(Date.now() + '')
  })

  after(() => {
    global.callNative = oriCallNative
    global.callAddElement = oriCallAddElement
  })

  describe('normal check', () => {
    it('is a class', () => {
      expect(App).to.be.an('function')
    })

    it('being created', () => {
      expect(app).to.be.an('object')
      expect(app).to.be.instanceof(App)
    })

    it('with some apis', () => {
      expect(app.requireModule).a.function
      expect(app.updateActions).a.function
      expect(app.callTasks).a.function
    })

    it('run apis', () => {
      expect(app.requireModule('stream')).to.deep.equal({})
      expect(app.updateActions()).to.be.undefined
      expect(app.callTasks([])).to.be.undefined
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
