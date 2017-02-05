import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
const {
  expect
} = chai
chai.use(sinonChai)

import runtime from '../../../runtime'
import frameworks from '../../../frameworks'
import defaultConfig from '../../../frameworks/legacy/config'
import { init as resetTaskHandler } from '../../../runtime/task-center'

const { init, config } = runtime
config.frameworks = frameworks
runtime.setNativeConsole()

import Vm from '../../../frameworks/legacy/vm'
import { clearModules, getModule } from '../../../frameworks/legacy/app/register'

const framework = init(config)

function clearRefs (json) {
  delete json.ref
  if (json.children) {
    json.children.forEach(clearRefs)
  }
}

describe('framework entry', () => {
  const oriCallNative = global.callNative
  const oriCallAddElement = global.callAddElement
  const oriDocumentHandler = config.Document.handler
  const callNativeSpy = sinon.spy()
  const callAddElementSpy = sinon.spy()
  const documentHandlerSpy = sinon.spy()
  const instanceId = Date.now() + ''

  before(() => {
    global.callNative = (id, tasks, callbackId) => {
      callNativeSpy(id, tasks, callbackId)
      /* istanbul ignore if */
      if (callbackId !== '-1') {
        framework.callJS(id, [{
          method: 'callback',
          args: [callbackId, null, true]
        }])
      }
    }
    global.callAddElement = (name, id, ref, json, index, callbackId) => {
      callAddElementSpy(name, ref, json, index, callbackId)
      /* istanbul ignore if */
      if (callbackId !== '-1') {
        framework.callJS(id, [{
          method: 'callback',
          args: [callbackId, null, true]
        }])
      }
    }
    config.Document.handler = oriDocumentHandler
    resetTaskHandler()
  })

  afterEach(() => {
    callNativeSpy.reset()
    callAddElementSpy.reset()
    documentHandlerSpy.reset()
  })

  after(() => {
    config.Document.handler = oriDocumentHandler
    global.callNative = oriCallNative
    global.callAddElement = oriCallAddElement
  })

  describe('createInstance', () => {
    it('a simple bundle', () => {
      const code = `
        define('@weex-component/main',
          function(require, exports, module) {
            module.exports = {
              data: function() {
                return {
                  text: 'Hello World',
                  showText: true
                };
              }
            }

            ;module.exports.style = {}

            ;module.exports.template = {
              'type': 'container',
              'children': [{
                'type': 'text',
                'shown': function() {
                  return this.showText
                },
                'attr': {
                  'value': function() {
                    return this.text
                  }
                }
              }]
            }
          }
        )

        bootstrap('@weex-component/main')
      `
      framework.createInstance(instanceId, code)
      expect(callNativeSpy.callCount).to.be.equal(2)
      expect(callAddElementSpy.callCount).to.be.equal(1)

      expect(callNativeSpy.firstCall.args[0]).to.be.equal(instanceId)
      expect(callNativeSpy.firstCall.args[1]).to.deep.equal([{
        module: 'dom',
        method: 'createBody',
        args: [{
          ref: '_root',
          type: 'container',
          attr: {},
          style: {}
        }]
      }])
      // expect(callNativeSpy.firstCall.args[2]).to.not.equal('-1')

      expect(callAddElementSpy.firstCall.args[0]).to.be.equal(instanceId)
      delete callAddElementSpy.firstCall.args[1].ref
      expect(callAddElementSpy.firstCall.args[1]).to.deep.equal({
        type: 'text',
        attr: { value: 'Hello World' },
        style: {}
      })

      // expect(callNativeSpy.secondCall.args[2]).to.not.equal('-1')

      expect(callNativeSpy.secondCall.args[0]).to.be.equal(instanceId)
      expect(callNativeSpy.secondCall.args[1]).to.deep.equal([{
        module: 'dom',
        method: 'createFinish',
        args: []
      }])
      // expect(callNativeSpy.thirdCall.args[2]).to.not.equal('-1')
    })

    it('with a exist instanceId', () => {
      const code = ''
      const result = framework.createInstance(instanceId, code)
      expect(result).to.be.an.instanceof(Error)
    })

    it('js bundle format version checker', function () {
      const weexFramework = frameworks.Weex
      frameworks.Weex = {
        init: function () {},
        createInstance: sinon.spy()
      }
      frameworks.xxx = {
        init: function () {},
        createInstance: sinon.spy()
      }
      frameworks.yyy = {
        init: function () {},
        createInstance: sinon.spy()
      }

      // test framework xxx
      let code = `// {"framework":"xxx","version":"0.3.1"}
      'This is a piece of JavaScript from a third-party Framework...'`
      framework.createInstance(instanceId + '~', code)
      expect(frameworks.xxx.createInstance.callCount).equal(1)
      expect(frameworks.yyy.createInstance.callCount).equal(0)
      expect(frameworks.Weex.createInstance.callCount).equal(0)
      expect(frameworks.xxx.createInstance.firstCall.args.slice(0, 4)).eql([
        instanceId + '~',
        code,
        { bundleVersion: '0.3.1', env: {}},
        undefined
      ])

      // also support spaces in JSON string
      // also ignore spaces between double-slash and JSON string
      code = `//{ "framework":"xxx" }
      'This is a piece of JavaScript from a third-party Framework...'`
      framework.createInstance(instanceId + '~~', code)
      expect(frameworks.xxx.createInstance.callCount).equal(2)
      expect(frameworks.yyy.createInstance.callCount).equal(0)
      expect(frameworks.Weex.createInstance.callCount).equal(0)

      // also support non-strict JSON format
      code = `// {framework:"xxx",'version':"0.3.1"}
      'This is a piece of JavaScript from a third-party Framework...'`
      framework.createInstance(instanceId + '~~~', code)
      expect(frameworks.xxx.createInstance.callCount).equal(2)
      expect(frameworks.yyy.createInstance.callCount).equal(0)
      expect(frameworks.Weex.createInstance.callCount).equal(1)
      expect(frameworks.Weex.createInstance.firstCall.args.slice(0, 4)).eql([
        instanceId + '~~~',
        code,
        { bundleVersion: undefined, env: {}},
        undefined
      ])

      // test framework yyy
      /* eslint-disable */
      code = `



        // {"framework":"yyy"}

'JS Bundle with space and empty lines behind'` // modified from real generated code from tb
      /* eslint-enable */
      framework.createInstance(instanceId + '~~~~', code)
      expect(frameworks.xxx.createInstance.callCount).equal(2)
      expect(frameworks.yyy.createInstance.callCount).equal(1)
      expect(frameworks.Weex.createInstance.callCount).equal(1)
      expect(frameworks.yyy.createInstance.firstCall.args.slice(0, 4)).eql([
        instanceId + '~~~~',
        code,
        { bundleVersion: undefined, env: {}},
        undefined
      ])

      // test framework Weex (wrong format at the middle)
      code = `'Some JS bundle code here ... // {"framework":"xxx"}\n ... end.'`
      framework.createInstance(instanceId + '~~~~~', code)
      expect(frameworks.xxx.createInstance.callCount).equal(2)
      expect(frameworks.yyy.createInstance.callCount).equal(1)
      expect(frameworks.Weex.createInstance.callCount).equal(2)
      expect(frameworks.Weex.createInstance.secondCall.args.slice(0, 4)).eql([
        instanceId + '~~~~~',
        code,
        { bundleVersion: undefined, env: {}},
        undefined
      ])

      // test framework Weex (without any JSON string in comment)
      code = `'Some JS bundle code here'`
      framework.createInstance(instanceId + '~~~~~~', code)
      expect(frameworks.xxx.createInstance.callCount).equal(2)
      expect(frameworks.yyy.createInstance.callCount).equal(1)
      expect(frameworks.Weex.createInstance.callCount).equal(3)
      expect(frameworks.Weex.createInstance.thirdCall.args.slice(0, 4)).eql([
        instanceId + '~~~~~~',
        code,
        { bundleVersion: undefined, env: {}},
        undefined
      ])

      // revert frameworks
      delete frameworks.xxx
      delete frameworks.yyy
      frameworks.Weex = weexFramework
    })
  })

  describe('getRoot', () => {
    it('with a exist instanceId', () => {
      const json = framework.getRoot(instanceId)
      expect(json.ref).eql('_root')
      clearRefs(json)
      const expectJSON = {
        type: 'container',
        attr: {},
        style: {},
        children: [{
          type: 'text',
          attr: {
            value: 'Hello World'
          },
          style: {}
        }]
      }
      expect(json).to.be.deep.equal(expectJSON)
    })

    it('with a non-exist instanceId', () => {
      const result = framework.getRoot('123')
      expect(result).to.be.an.instanceof(Error)
    })
  })

  describe('callJS', () => {
    it('fireEvent with no params', () => {
      framework.callJS()
    })

    it('fireEvent with a exist instanceId', () => {
      framework.callJS(instanceId, [{
        method: 'fireEvent',
        args: []
      }])
    })

    it('callback with a exist instanceId', () => {
      framework.callJS(instanceId, [{
        method: 'callback',
        args: []
      }])
    })

    it('with a non-exist instanceId', () => {
      const result = framework.callJS('123', [{
        method: 'fireEvent',
        args: []
      }])
      expect(result).to.be.an.instanceof(Error)
    })

    it('with a non-array tasks', () => {
      const result = framework.callJS(instanceId, {
        method: 'fireEvent',
        args: []
      })
      expect(result).to.be.an.instanceof(Error)
    })
  })

  describe('refreshInstance', () => {
    it('modify showText to false', () => {
      const json = framework.getRoot(instanceId)
      const textRef = json.children[0].ref
      framework.refreshInstance(instanceId, { showText: false })
      expect(callNativeSpy.callCount).to.be.equal(2)
      expect(callNativeSpy.firstCall.args[0]).to.be.equal(instanceId)
      expect(callNativeSpy.firstCall.args[1]).to.deep.equal([{
        module: 'dom',
        method: 'removeElement',
        args: [textRef]
      }])
      // expect(callNativeSpy.firstCall.args[2]).to.be.equal('-1')

      expect(callNativeSpy.secondCall.args[0]).to.be.equal(instanceId)
      expect(callNativeSpy.secondCall.args[1]).to.deep.equal([{
        module: 'dom',
        method: 'refreshFinish',
        args: []
      }])
      // expect(callNativeSpy.secondCall.args[2]).to.be.equal('-1')
    })

    it('with a non-exist instanceId', () => {
      const result = framework.refreshInstance('123', {})
      expect(result).to.be.an.instanceof(Error)
    })
  })

  describe('destroyInstance', () => {
    it('with no params', () => {
      framework.destroyInstance()
    })

    it('with a exist instanceId', () => {
      const result = framework.destroyInstance(instanceId)
      expect(result[instanceId]).to.be.undefined
    })

    it('with a non-exist instanceId', () => {
      const result = framework.destroyInstance('123')
      expect(result).to.be.an.instanceof(Error)
    })
  })

  describe('registerComponents', () => {
    it('with old format', () => {
      framework.registerComponents(['a', 'b', 'c'])
      expect(defaultConfig.nativeComponentMap).to.contain.keys('a', 'b', 'c')
    })

    it('with new format', () => {
      framework.registerComponents([{
        type: 'd',
        append: 'tree'
      }])
      expect(defaultConfig.nativeComponentMap).to.contain.keys('d')
      expect(defaultConfig.nativeComponentMap['d']).to.be.deep.equal({
        type: 'd',
        append: 'tree'
      })
    })

    it('with non-array', () => {
      framework.registerComponents({
        type: 'e'
      })
      expect(defaultConfig.nativeComponentMap).not.contain.keys('e')
    })

    it('with methods', () => {
      const components = [{
        type: 'x',
        methods: ['foo', 'bar']
      }, {
        type: 'y',
        methods: []
      }, {
        type: 'z',
        methods: null
      }]
      framework.registerComponents(components)
      expect(defaultConfig.nativeComponentMap).to.contain.keys('x', 'y', 'z')
    })
  })

  describe('register modules', () => {
    it('with object of modules', () => {
      clearModules()
      const modules = {
        a: [{
          name: 'b',
          args: ['string']
        }]
      }

      framework.registerModules(modules)
      expect(getModule('b')).an.object
      clearModules()
    })
  })

  describe('register methods', () => {
    it('with object of methods', () => {
      const methods = {
        a: sinon.spy()
      }

      framework.registerMethods(methods)
      expect(Vm.prototype.a).a.function
      delete Vm.prototype.a
    })
  })
})

describe('config', () => {
  it('config is an object', () => {
    init({})
  })
})

describe.skip('freeze the prototypes of vdom', function () {
  const { Document, Element, Comment, Listener } = config

  before(() => {
    runtime.freezePrototype()
  })

  it('Document.prototype', () => {
    expect(Document.prototype).to.be.frozen
  })

  it('Element & Element.prototype', () => {
    expect(Element).to.be.frozen
    expect(Element.prototype).to.be.frozen
  })

  it('Comment & Comment.prototype', () => {
    expect(Comment).to.be.frozen
    expect(Comment.prototype).to.be.frozen
  })

  it('Listener & Listener.prototype', () => {
    expect(Listener).to.be.frozen
    expect(Listener.prototype).to.be.frozen
  })
})
