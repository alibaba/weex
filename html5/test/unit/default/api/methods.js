import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
const { expect } = chai
chai.use(sinonChai)

import '../../../../shared/console'
import * as modules from '../../../../frameworks/legacy/api/modules'
import * as methods from '../../../../frameworks/legacy/api/methods'
import Differ from '../../../../frameworks/legacy/app/differ'
import { initModules, requireModule, clearModules, initMethods } from '../../../../frameworks/legacy/app/register'

function Vm () {
}

describe('built-in methods', () => {
  let vm
  const requireSpy = sinon.spy()
  const moduleSpy = sinon.spy()

  before(() => {
    clearModules()

    initModules(modules)
    initMethods(Vm, methods)

    vm = new Vm()

    Object.assign(vm, {
      _app: {
        options: {
          debug: true,
          bundleUrl: 'path_to_bundleUrl'
        },
        differ: new Differ(),
        requireModule: (name) => {
          requireSpy(name)
          const module = requireModule(this, name)
          const mockModule = {}
          for (const moduleName in module) {
            mockModule[moduleName] = function (...args) {
              moduleSpy(...args)
              if (typeof args[args.length - 1] === 'function') {
                args[args.length - 1]()
              }
            }
          }
          return mockModule
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
    sinon.stub(console, 'warn')
  })

  beforeEach(() => {
    requireSpy.reset()
    moduleSpy.reset()
    console.warn.reset()
  })

  after(() => {
    clearModules()
    console.warn.restore()
  })

  it('$', () => {
    expect(vm.$('a')).to.deep.equal(vm._ids.a.vm)
    expect(vm.$('invalid')).to.be.undefined
    expect(console.warn.callCount).to.be.equal(2)
  })

  it('$el', () => {
    expect(vm.$el('a')).to.deep.equal(vm._ids.a.el)
    expect(vm.$el('invalid')).to.be.undefined
  })

  it('$vm', () => {
    expect(vm.$vm('a')).to.deep.equal(vm._ids.a.vm)
    expect(vm.$vm('invalid')).to.be.undefined
  })

  it('$renderThen', () => {
    const fnSpy = sinon.spy()
    vm.$renderThen(fnSpy)
    vm._app.differ.flush()
    expect(fnSpy.callCount).to.be.equal(1)
  })

  it('$scrollTo', () => {
    vm.$scrollTo('a', 100)
    expect(vm.$scrollTo('invalid', 100)).to.be.undefined
    expect(requireSpy.firstCall.args[0]).to.be.equal('dom')
    expect(moduleSpy.firstCall.args.length).to.be.equal(2)
  })

  it('$transition', () => {
    const callback = sinon.spy()
    vm.$transition('a', { styles: { color: '#FF0000' }}, callback)
    expect(vm.$transition('invalid', {})).to.be.undefined
    expect(requireSpy.firstCall.args[0]).eql('animation')
    expect(moduleSpy.firstCall.args.length).eql(3)
    expect(moduleSpy.firstCall.args[0]).eql('_root')
    expect(moduleSpy.firstCall.args[1]).eql({
      styles: { color: '#FF0000' }
    })
    expect(callback.callCount).eql(1)
  })

  it('$getConfig', () => {
    const config = vm.$getConfig()
    expect(config).eql({
      debug: true,
      bundleUrl: 'path_to_bundleUrl'
    })

    const configSpy = sinon.spy()
    vm.$getConfig(configSpy)
    expect(console.warn.callCount).to.be.equal(1)
    expect(configSpy.args.length).eql(1)
    expect(configSpy.args[0][0]).eql({
      debug: true,
      bundleUrl: 'path_to_bundleUrl'
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
    expect(vm.$call('invalid', 'module')).to.be.undefined
    expect(vm.$call('event', 'invalid')).to.be.undefined
    expect(requireSpy.firstCall.args[0]).eql('event')
    expect(moduleSpy.firstCall.args.length).eql(1)
    expect(moduleSpy.firstCall.args[0]).eql('url')
  })
})
