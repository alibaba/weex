import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
const { expect } = chai
chai.use(sinonChai)

import '../../../../shared/console'
import * as modules from '../../../../default/api/modules'
import * as methods from '../../../../default/api/methods'
import { registerModules, requireModule, clearModules, registerMethods } from '../../../../default/app/register'

function Vm () {
}

Object.assign(Vm, {
  registerMethods
})

describe('built-in', () => {
  let vm
  const requireSpy = sinon.spy()
  const moduleSpy = sinon.spy()

  before(() => {
    clearModules()

    registerModules(modules)
    Vm.registerMethods(methods)

    vm = new Vm()

    Object.assign(vm, {
      _app: {
        options: {
          debug: true,
          bundleUrl: 'path_to_bundleUrl'
        },
        requireModule: (name) => {
          requireSpy(name)

          const module = requireModule(name)
          for (const moduleName in module) {
            module[moduleName] = function (...args) {
              moduleSpy(...args)
              if (typeof args[args.length - 1] === 'function') {
                args[args.length - 1]()
              }
            }
          }
          return module
        }
      },
      _setStyle: function () {},
      _ids: {
        a: {
          vm: {},
          el: {
            ref: '_root'
          }
        }
      }
    })

    for (const apiName in vm) {
      if (apiName.indexOf('$') === 0) {
        vm[apiName] = sinon.spy(vm, apiName)
      }
    }
  })

  beforeEach(() => {
    requireSpy.reset()
    moduleSpy.reset()
  })

  after(() => {
    clearModules()
  })

  describe('common apis', () => {
    before(() => {
      sinon.stub(console, 'warn')
    })

    beforeEach(() => {
      console.warn.reset()
    })

    after(() => {
      console.warn.restore()
    })

    it('$', () => {
      expect(vm.$('a')).to.deep.equal(vm._ids.a.vm)
      expect(console.warn.callCount).to.be.equal(1)
    })

    it('$el', () => {
      expect(vm.$el('a')).to.deep.equal(vm._ids.a.el)
    })

    it('$vm', () => {
      expect(vm.$vm('a')).to.deep.equal(vm._ids.a.vm)
    })

    it('$scrollTo', () => {
      vm.$scrollTo('a', 100)
      expect(requireSpy.firstCall.args[0]).to.be.equal('dom')
      expect(moduleSpy.firstCall.args.length).to.be.equal(2)
    })

    it('$transition', () => {
      const callback = sinon.spy()
      vm.$transition('a', { styles: { color: '#FF0000' }}, callback)
      expect(requireSpy.firstCall.args[0]).eql('animation')
      expect(moduleSpy.firstCall.args.length).eql(3)
      expect(moduleSpy.firstCall.args[0]).eql('_root')
      expect(moduleSpy.firstCall.args[1]).eql({
        styles: { color: '#FF0000' }
      })
      expect(callback.callCount).eql(1)
    })

    it('$getConfig', () => {
      global.WXEnvironment = {
        a: 'b'
      }
      const config = vm.$getConfig()
      expect(config).eql({
        debug: true,
        bundleUrl: 'path_to_bundleUrl',
        env: {
          a: 'b'
        }
      })

      const configSpy = sinon.spy()
      vm.$getConfig(configSpy)
      expect(console.warn.callCount).to.be.equal(1)
      expect(configSpy.args.length).eql(1)
      expect(configSpy.args[0][0]).eql({
        debug: true,
        bundleUrl: 'path_to_bundleUrl',
        env: {
          a: 'b'
        }
      })
    })

    it('$sendHttp', () => {
      const callback = sinon.spy()
      vm.$sendHttp({ a: 1 }, callback)
      expect(requireSpy.firstCall.args[0]).eql('stream')
      expect(moduleSpy.firstCall.args.length).eql(2)
      expect(moduleSpy.firstCall.args).eql([{ a: 1 }, callback])
      expect(callback.callCount).eql(1)
    })

    it('$openURL', () => {
      vm.$openURL('url')
      expect(requireSpy.firstCall.args[0]).eql('event')
      expect(moduleSpy.firstCall.args.length).eql(1)
      expect(moduleSpy.firstCall.args).eql(['url'])
    })

    it('$setTitle', () => {
      vm.$setTitle('title')
      expect(requireSpy.firstCall.args[0]).eql('pageInfo')
      expect(moduleSpy.firstCall.args.length).eql(1)
      expect(moduleSpy.firstCall.args).eql(['title'])
    })

    it('$call', () => {
      vm.$call('event', 'openURL', 'url')
      expect(requireSpy.firstCall.args[0]).eql('event')
      expect(moduleSpy.firstCall.args.length).eql(1)
      expect(moduleSpy.firstCall.args[0]).eql('url')
    })
  })
})
