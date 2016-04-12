import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
const {
  expect
} = chai
chai.use(sinonChai)

import * as framework from '../framework'
import * as config from '../config'
import Vm from '../vm'

describe('framework entry', () => {
  const callNativeSpy = sinon.spy()
  const instanceId = Date.now() + ''

  before(() => {
    sinon.stub(Vm, 'registerModules')
    sinon.stub(Vm, 'registerMethods')

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
  })

  afterEach(() => {
    Vm.registerModules.reset()
    Vm.registerMethods.reset()
    callNativeSpy.reset()
  })

  after(() => {
    Vm.registerModules.restore()
    Vm.registerMethods.restore()
    global.callNative = undefined
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

      expect(callNativeSpy.callCount).to.be.equal(3)

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

      expect(callNativeSpy.secondCall.args[0]).to.be.equal(instanceId)
      expect(callNativeSpy.secondCall.args[1]).to.deep.equal([{
        module: 'dom',
        method: 'addElement',
        args: ['_root', {
            ref: '5',
            type: 'text',
            attr: {
              value: 'Hello World'
            },
            style: {}
          },
          0
        ]
      }])
      // expect(callNativeSpy.secondCall.args[2]).to.not.equal('-1')

      expect(callNativeSpy.thirdCall.args[0]).to.be.equal(instanceId)
      expect(callNativeSpy.thirdCall.args[1]).to.deep.equal([{
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
  })

  describe('getRoot', () => {
    it('with a exist instanceId', () => {
      const json = framework.getRoot(instanceId)
      const expectJSON = {
        ref: '_root',
        type: 'container',
        attr: {},
        style: {},
        children: [{
          ref: '5',
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
      expect(result[0]).to.be.an.instanceof(Error)
    })

    it('with a non-array tasks', () => {
      const result = framework.callJS(instanceId, {
        method: 'fireEvent',
        args: []
      })
      expect(result[0]).to.be.an.instanceof(Error)
    })
  })

  describe('refreshInstance', () => {
    it('modify showText to false', () => {
      framework.refreshInstance(instanceId, {showText: false})
      expect(callNativeSpy.callCount).to.be.equal(1)

      expect(callNativeSpy.firstCall.args[0]).to.be.equal(instanceId)
      expect(callNativeSpy.firstCall.args[1]).to.deep.equal([{
        module: 'dom',
        method: 'removeElement',
        args: ['5']
      }, {
        module: 'dom',
        method: 'refreshFinish',
        args: []
      }])
      expect(callNativeSpy.firstCall.args[2]).to.be.equal('-1')
    })

    it('with a non-exist instanceId', () => {
      const result = framework.refreshInstance('123', {})
      expect(result).to.be.an.instanceof(Error)
    })
  })

  describe('destroyInstance', () => {
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
      expect(config.nativeComponentMap).to.contain.keys('a', 'b', 'c')
    })

    it('with new format', () => {
      framework.registerComponents([{
        type: 'd',
        append: 'tree'
      }])
      expect(config.nativeComponentMap).to.contain.keys('d')
      expect(config.nativeComponentMap['d']).to.be.deep.equal({
        type: 'd',
        append: 'tree'
      })
    })

    it('with non-array', () => {
      framework.registerComponents({
        type: 'e'
      })
      expect(config.nativeComponentMap).not.contain.keys('e')
    })
  })

  describe('register modules', () => {
    it('with object of modules', () => {
      const modules = {
        a: [{
          name: 'b',
          args: ['string']
        }]
      }

      framework.registerModules(modules)
      expect(Vm.registerModules.firstCall.args[0]).to.be.deep.equal(modules)
    })

    it('with non-object', () => {
      framework.registerModules(1)
      expect(Vm.registerModules.callCount).to.be.equal(0)
    })
  })

  describe('register methods', () => {
    it('with object of methods', () => {
      const methods = {
        a: () => 'a'
      }

      framework.registerMethods(methods)
      expect(Vm.registerMethods.firstCall.args[0]).to.be.deep.equal(methods)
    })

    it('with non-object', () => {
      framework.registerMethods(1)
      expect(Vm.registerMethods.callCount).to.be.equal(0)
    })
  })
})
