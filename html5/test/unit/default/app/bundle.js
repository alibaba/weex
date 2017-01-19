import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
const { expect } = chai
chai.use(sinonChai)

import * as bundle from '../../../../frameworks/legacy/app/bundle'
import * as register from '../../../../frameworks/legacy/app/register'
import { removeWeexPrefix } from '../../../../frameworks/legacy/util'
import { Document } from '../../../../runtime/vdom'
import Listener from '../../../../runtime/listener'

describe('parsing a bundle file', () => {
  const componentTemplate = {
    type: 'container',
    children: [{
      type: 'text',
      attr: {
        value: 'Hello World'
      }
    }]
  }

  before(() => {
    sinon.stub(console, 'info')
    sinon.stub(console, 'warn')
    sinon.stub(console, 'error')
    sinon.stub(console, 'debug')
  })

  after(() => {
    console.info.restore()
    console.warn.restore()
    console.error.restore()
    console.debug.restore()
  })

  describe('use define/bootstrap', () => {
    let app
    let callTasksSpy

    before(() => {
      const id = Date.now()
      callTasksSpy = sinon.spy()

      const doc = new Document(id, '', (tasks) => {
        app.callTasks(tasks)
      })

      app = {
        id, doc,
        customComponentMap: {},
        commonModules: {},
        callbacks: {},
        callTasks: callTasksSpy,
        requireModule: function (name) {
          return register.requireModule(this, name)
        }
      }
    })

    afterEach(() => {
      callTasksSpy.reset()
    })

    describe('define', () => {
      it('a weex component with factory and deps', () => {
        bundle.defineFn(app, '@weex-component/a', (require, exports, module) => {
          module.exports = {
            template: componentTemplate
          }
        })
        bundle.defineFn(app, '@weex-component/aa', [], (require, exports, module) => {
          module.exports = {
            template: componentTemplate
          }
        })

        expect(app.customComponentMap['a'].template).to.deep.equal(componentTemplate)
        expect(app.customComponentMap['aa'].template).to.deep.equal(componentTemplate)
      })

      it('a weex component with definition object and deps', () => {
        bundle.defineFn(app, '@weex-component/aaa', {
          template: componentTemplate
        })
        bundle.defineFn(app, '@weex-component/aaaa', [], {
          template: componentTemplate
        })

        expect(app.customComponentMap['aaa'].template).to.deep.equal(componentTemplate)
        expect(app.customComponentMap['aaaa'].template).to.deep.equal(componentTemplate)
      })

      it('a weex module', () => {
        const methods = [{
          name: 'createBody',
          args: []
        }]

        bundle.defineFn(app, '@weex-module/dom', (require, exports, module) => {
          module.exports = methods
        })
      })

      it('a normal module', () => {
        bundle.defineFn(app, './a', (require, exports, module) => {
          exports.version = '0.1'
        })
      })

      it('a npm module', () => {
        bundle.defineFn(app, 'lib-httpurl', (require, exports, module) => {
          exports.version = '0.2'
        })
      })

      it('a CMD module', () => {
        bundle.defineFn(app, 'kg/base', [], (require, exports, module) => {
          exports.version = '0.3'
        })
      })
    })

    describe('require', () => {
      it('a weex component', (done) => {
        bundle.defineFn(app, '@weex-component/b', (require, exports, module) => {
          const componentA = require('@weex-component/a')

          expect(componentA.template).to.be.equal(componentTemplate)
          done()
        })
      })

      it('a weex module', (done) => {
        // eslint-disable-next-line camelcase
        const __weex_require__ = name => register.requireModule(app, removeWeexPrefix(name))
        bundle.defineFn(app, '@weex-component/c', (require, exports, module) => {
          const dom = require('@weex-module/dom')
          expect(dom.createBody).to.be.a('function')
          const dom2 = __weex_require__('dom')
          expect(dom2.createBody).to.be.a('function')
          const dom3 = __weex_require__('@weex-module/dom')
          expect(dom3.createBody).to.be.a('function')
          done()
        })
      })

      it('a normal module', (done) => {
        bundle.defineFn(app, '@weex-component/d', (require, exports, module) => {
          const a = require('./a')

          expect(a.version).to.be.equal('0.1')
          done()
        })
      })

      it('a npm module', (done) => {
        bundle.defineFn(app, '@weex-component/e', (require, exports, module) => {
          const HttpUrl = require('lib-httpurl')

          expect(HttpUrl.version).to.be.equal('0.2')
          done()
        })
      })

      it('a CMD module', (done) => {
        bundle.defineFn(app, 'kg/sample', ['kg/base'], (require, exports, module) => {
          const base = require('kg/base')

          expect(base.version).to.be.equal('0.3')
          done()
        })
      })
    })

    describe('bootstrap', () => {
      const ready = sinon.spy()

      before(() => {
        global.transformerVersion = '>=0.1 <1.0'
        bundle.defineFn(app, '@weex-component/main', (require, exports, module) => {
          module.exports = {
            template: componentTemplate,
            ready: ready
          }
        })
      })

      after(() => {
        global.transformerVersion = undefined
      })

      it('not a weex component', () => {
        const result = bundle.bootstrap(app, '@weex-module/dom')
        expect(result).instanceof(Error)
      })

      it('a weex component', () => {
        const result = bundle.bootstrap(
          app,
          '@weex-component/main',
          { transformerVersion: '0.1.99' }
        )

        expect(result).not.instanceof(Error)
        expect(callTasksSpy.calledTwice).to.be.true

        expect(ready.calledOnce).to.be.true
        const task1 = callTasksSpy.firstCall.args[0][0]
        expect(task1.module).to.be.equal('dom')
        expect(task1.method).to.be.equal('createBody')
        expect(task1.args[0]).to.deep.equal({
          type: 'container',
          ref: '_root',
          attr: {},
          style: {}
        })

        const task2 = callTasksSpy.secondCall.args[0][0]
        expect(task2.module).to.be.equal('dom')
        expect(task2.method).to.be.equal('addElement')
        expect(task2.args[1]).to.deep.equal({
          type: 'text',
          ref: app.doc.body.children[0].ref,
          attr: {
            value: 'Hello World'
          },
          style: {}
        })
        expect(task2.args[0]).to.be.equal('_root')
        expect(task2.args[2]).to.be.equal(-1)
      })

      it('with a less wrong transformer version', () => {
        const result = bundle.bootstrap(
          app,
          '@weex-component/main',
          { transformerVersion: '0.0.1' }
        )
        expect(result).instanceof(Error)
      })

      it('with a bigger wrong transformer version', () => {
        const result = bundle.bootstrap(
          app,
          '@weex-component/main',
          { transformerVersion: '9.9.9' }
        )
        expect(result).instanceof(Error)
      })

      it('with viewport config', () => {
        bundle.bootstrap(
          app,
          '@weex-component/undefined',
          {
            viewport: { width: 640 }
          }
        )
        expect(callTasksSpy.callCount).to.be.equal(1)
        const tasks = callTasksSpy.lastCall.args[0]
        expect(tasks[0].module).to.be.equal('meta')
        expect(tasks[0].method).to.be.equal('setViewport')
        expect(tasks[0].args).to.deep.equal([{ width: 640 }])
      })
    })
  })

  describe('use regsiter/render(backward compatibility)', () => {
    let app
    let callTasksSpy
    let readySpy
    const template = {
      type: 'container',
      children: [{
        type: 'text',
        attr: {
          value: 'Hello World'
        }
      }, {
        type: 'custom'
      }]
    }

    before(() => {
      const id = Date.now()
      callTasksSpy = sinon.spy()
      readySpy = sinon.spy()

      const doc = new Document(id, '', (tasks, callback) => {
        app.callTasks(tasks, callback)
      }, Listener)

      app = {
        id, doc,
        customComponentMap: {},
        callbacks: {},
        callTasks: (tasks, callback) => {
          callTasksSpy(tasks)
          callback && callback()
        },
        requireModule: function (name) {
          return register.requireModule(this, name)
        }
      }

      Object.assign(app, bundle)
    })

    afterEach(() => {
      callTasksSpy.reset()
    })

    describe('register', () => {
      const readyfn = function () {
        readySpy(this)
      }

      it('a component', () => {
        bundle.register(app, 'custom', {
          template: componentTemplate,
          data: {
            b: 'c'
          },
          methods: {
            ready: readyfn
          }
        })

        bundle.register(app, 'main', {
          template: template,
          data: {
            a: 'b'
          },
          methods: {
            ready: readyfn
          }
        })

        expect(app.customComponentMap['custom'].template)
          .to.deep.equal(componentTemplate)
        expect(app.customComponentMap['main'].template)
          .to.deep.equal(template)
      })
    })

    describe.skip('render', () => {
      it('a component', () => {
        app.render('main')

        expect(callTasksSpy.callCount).to.be.equal(4)

        expect(readySpy.calledTwice).to.be.true
        expect(readySpy.firstCall.args[0].a).to.be.equal('b')
        expect(readySpy.secondCall.args[0].b).to.be.equal('c')

        const task1 = callTasksSpy.firstCall.args[0][0]
        expect(task1).to.deep.equal({
          module: 'dom',
          method: 'createBody',
          args: [{
            type: 'container',
            ref: '_root',
            attr: {},
            style: {}
          }]
        })

        const task2 = callTasksSpy.secondCall.args[0][0]
        expect(task2).to.deep.equal({
          module: 'dom',
          method: 'addElement',
          args: ['_root', {
            type: 'text',
            ref: app.doc.body.children[0].ref,
            attr: {
              value: 'Hello World'
            },
            style: {}
          }, -1]
        })

        const task3 = callTasksSpy.thirdCall.args[0][0]
        expect(task3).to.deep.equal({
          module: 'dom',
          method: 'addElement',
          args: ['_root', {
            type: 'container',
            ref: app.doc.body.children[1].ref,
            attr: {},
            style: {}
          }, -1]
        })

        const task4 = callTasksSpy.getCall(3).args[0][0]
        expect(task4).to.deep.equal({
          module: 'dom',
          method: 'addElement',
          args: [app.doc.body.children[1].ref, {
            type: 'text',
            ref: app.doc.body.children[1].children[0].ref,
            attr: {
              value: 'Hello World'
            },
            style: {}
          }, -1]
        })
      })
    })
  })

  describe('use define/require(backward compatibility)', () => {
    let app
    let callTasksSpy

    before(() => {
      const id = Date.now()
      callTasksSpy = sinon.spy()

      const doc = new Document(id, '', (tasks, callback) => {
        app.callTasks(tasks, callback)
      }, Listener)

      app = {
        id, doc,
        customComponentMap: {},
        callbacks: {},
        callTasks: (tasks, callback) => {
          callTasksSpy(tasks)
          callback && callback()
        },
        requireModule: function (name) {
          return register.requireModule(this, name)
        }
      }
    })

    afterEach(() => {
      callTasksSpy.reset()
    })

    describe('define(old)', () => {
      it('a component', () => {
        bundle.defineFn(app, 'main', (require, exports, module) => {
          module.exports = {
            template: componentTemplate
          }
        })
        expect(app.customComponentMap['main'].template)
          .to.deep.equal(componentTemplate)
      })
    })

    describe.skip('require(old)', () => {
      it('a component', () => {
        app.require('main')()

        expect(callTasksSpy.calledTwice).to.be.true

        const task1 = callTasksSpy.firstCall.args[0][0]
        expect(task1.module).to.be.equal('dom')
        expect(task1.method).to.be.equal('createBody')
        expect(task1.args[0]).to.deep.equal({
          type: 'container',
          ref: '_root',
          attr: {},
          style: {}
        })

        const task2 = callTasksSpy.secondCall.args[0][0]
        expect(task2.module).to.be.equal('dom')
        expect(task2.method).to.be.equal('addElement')
        expect(task2.args[1]).to.deep.equal({
          type: 'text',
          ref: app.doc.body.children[0].ref,
          attr: {
            value: 'Hello World'
          },
          style: {}
        })
        expect(task2.args[0]).to.be.equal('_root')
        expect(task2.args[2]).to.be.equal(-1)
      })
    })
  })
})
