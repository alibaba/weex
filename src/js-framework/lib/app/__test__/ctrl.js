import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
const {expect} = chai
chai.use(sinonChai)

import * as _ from '../../util'
import * as ctrl from '../ctrl'
import Differ from '../differ'
import {Document} from '../dom'
import Listener from '../dom-listener'
import EventManager from '../event'
import pkg from '../../../package.json'

describe('the api of app', () => {
  let app
  let spy1
  let spy2

  function createApp() {
    const id = Date.now()

    var app = {
      id: id,
      customComponentMap: {},
      doc: new Document(id),
      eventManager: new EventManager(),
      define: sinon.spy(),
      bootstrap: sinon.stub(),
      callbacks: {
        1: spy2
      },
      vm: {},
      differ: new Differ(id),
      callTasks: function (tasks) {
        spy1(tasks)
      }
    }

    app.listener = new Listener(app.id, (tasks) => {
      app.callTasks(tasks)
    })
    app.doc.setListener(app.listener)
    app.doc.createBody('div')
    sinon.spy(app.eventManager, 'fire')
    app.bootstrap.returns()

    Object.assign(app, ctrl)

    return app
  }

  before(() => {
    spy1 = sinon.spy()
    spy2 = sinon.spy()
    app = createApp()
  })

  afterEach(() => {
    spy1.reset()
    // spy2.reset()
  })

  describe('init', () => {
    before(() => {
      global.needTransformerVersion = '0.1.3'
    })

    after(() => {
      global.needTransformerVersion = undefined
    })

    it('a simple bundle', () => {
      app.init(`
        define('main', {
          "type": "container",
          "children": [{
            "type": "text",
            "attr": {
                "value": "Hello World"
            }
          }]
        })

        bootstrap('main')
      `)

      expect(app.doc.closed).to.be.true

      expect(app.define.calledOnce).to.be.true
      expect(app.bootstrap.calledOnce).to.be.true

      const task = spy1.firstCall.args[0][0]
      expect(task.module).to.be.equal('dom')
      expect(task.method).to.be.equal('createFinish')
      expect(task.args.length).to.be.equal(0)
    })
  })

  describe('getRootElement', () => {
    it('from a simple', () => {
      const json = app.getRootElement()
      expect(json).to.deep.equal({
        ref: '_root',
        type: 'div',
        attr: {},
        style: {}
      })
    })
  })

  describe('fireEvent', () => {
    it('click on root', () => {
      app.fireEvent('_root', 'click')
      expect(app.eventManager.fire.calledOnce).to.be.true
      expect(app.eventManager.fire.args[0][1]).to.be.equal('click')

      const task = spy1.firstCall.args[0][0]
      expect(task.module).to.be.equal('dom')
      expect(task.method).to.be.equal('updateFinish')
      expect(task.args.length).to.be.equal(0)
    })

    it('error', () => {
      const data = null
      const result = app.fireEvent('_rootTest', 'click')
      expect(result).to.be.an.instanceof(Error)
    })
  })

  describe('callback', () => {
    it('with a simple data', () => {
      const data = {a: 'b'}
      app.callback('1', data, true)
      expect(spy2.calledOnce).to.be.true
      expect(spy2.args[0][0]).to.deep.equal(data)
      expect(app.callbacks[1]).to.be.a('function')

      const task = spy1.firstCall.args[0][0]
      expect(task.module).to.be.equal('dom')
      expect(task.method).to.be.equal('updateFinish')
      expect(task.args.length).to.be.equal(0)
    })

    it('multiple called', () => {
      const data = {a: 'b'}
      app.callback('1', data, true)
      expect(spy2.calledTwice).to.be.true
      expect(spy2.args[0][0]).to.deep.equal(data)
      expect(app.callbacks[1]).to.be.a('function')

      app.callback('1', data, false)
      expect(spy2.calledThrice).to.be.true
      expect(spy2.args[0][0]).to.deep.equal(data)
      expect(app.callbacks[1]).to.be.undefined
    })

    it('error', () => {
      const data = null
      const result = app.callback('1', data, true)
      expect(result).to.be.an.instanceof(Error)
    })
  })

  describe('refreshData', () => {
    it('a simple data', () => {
      const data = {b: 'c'}
      app.refreshData(data)
      expect(app.vm).to.deep.equal(data)

      const task = spy1.firstCall.args[0][0]
      expect(task.module).to.be.equal('dom')
      expect(task.method).to.be.equal('refreshFinish')
      expect(task.args.length).to.be.equal(0)
    })

    it('error', () => {
      const data = null
      const result = app.refreshData(data)
      expect(result).to.be.an.instanceof(Error)
    })
  })

  describe('destory', () => {
    it('the simple data', () => {
      app.destroy()
      expect(app.id).to.be.empty
      expect(app.eventManager).to.be.null
      expect(app.blocks).to.be.null
      expect(app.vm).to.be.null
      expect(app.doc).to.be.null
      expect(app.customComponentMap).to.be.null
      expect(app.callbacks).to.be.null
    })
  })
})
