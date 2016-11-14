import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
const { expect } = chai
chai.use(sinonChai)

import { setNativeConsole, resetNativeConsole } from '../../../shared/console'

const oriEnv = global.WXEnvironment
const oriConsole = global.console

describe.skip('polyfill for console', () => {
  const scope = {}
  const nativeLogSpy = sinon.spy()

  before(() => {
    delete global.console
    global.nativeLog = function (...args) {
      nativeLogSpy(...args)
    }
    global.WXEnvironment = {
      platform: 'iOS',
      logLevel: 'log'
    }
    setNativeConsole()
    scope.console = global.console
    // global.console = oriConsole // no output for these test case
  })

  after(() => {
    global.WXEnvironment = oriEnv
    resetNativeConsole()
    expect(global.console).eql(oriConsole)
  })

  beforeEach(() => {
    nativeLogSpy.reset()
  })

  it('export apis', () => {
    expect(setNativeConsole).is.a('function')
    expect(resetNativeConsole).is.a('function')
  })

  it('nativeLog', () => {
    expect(global.nativeLog).is.a('function')
    global.nativeLog('whatever')
    expect(nativeLogSpy.callCount).to.be.equal(1)
  })

  it('console apis', () => {
    expect(scope.console).is.a('object')
    expect(scope.console.debug).is.a('function')
    expect(scope.console.log).is.a('function')
    expect(scope.console.info).is.a('function')
    expect(scope.console.warn).is.a('function')
    expect(scope.console.error).is.a('function')
  })

  it('no debug message', () => {
    scope.console.debug('a debug message')
    expect(nativeLogSpy.callCount).to.be.equal(0)
  })

  it('a log message', () => {
    scope.console.log('a log message')
    expect(nativeLogSpy.callCount).to.be.equal(1)
    expect(nativeLogSpy.firstCall.args).to.deep.equal(
      ['a log message', '__LOG']
    )
  })

  it('multi log message', () => {
    scope.console.log('A', 'B', 'C')
    scope.console.log('D', 'E')
    expect(nativeLogSpy.callCount).to.be.equal(2)
    expect(nativeLogSpy.firstCall.args).to.deep.equal(
      ['A', 'B', 'C', '__LOG']
    )
    expect(nativeLogSpy.lastCall.args).to.deep.equal(
      ['D', 'E', '__LOG']
    )
  })

  it('an info message', () => {
    scope.console.info('a info message')
    expect(nativeLogSpy.callCount).to.be.equal(1)
    expect(nativeLogSpy.firstCall.args).to.deep.equal(
      ['a info message', '__INFO']
    )
  })

  it('a warn message', () => {
    scope.console.warn('a warn message')
    expect(nativeLogSpy.callCount).to.be.equal(1)
    expect(nativeLogSpy.firstCall.args).eql(
      ['a warn message', '__WARN']
    )
  })

  it('a error message', () => {
    scope.console.error('a error message')
    expect(nativeLogSpy.callCount).to.be.equal(1)
    expect(nativeLogSpy.firstCall.args).eql(
      ['a error message', '__ERROR']
    )
  })

  it('debug logLevel', () => {
    global.WXEnvironment.logLevel = 'debug'
    scope.console.debug('whatever')
    expect(nativeLogSpy.callCount).to.be.equal(1)
    scope.console.log('whatever')
    expect(nativeLogSpy.callCount).to.be.equal(2)
    scope.console.info('whatever')
    expect(nativeLogSpy.callCount).to.be.equal(3)
    scope.console.warn('whatever')
    expect(nativeLogSpy.callCount).to.be.equal(4)
    scope.console.error('whatever')
    expect(nativeLogSpy.callCount).to.be.equal(5)
  })

  it('log logLevel', () => {
    global.WXEnvironment.logLevel = 'log'
    scope.console.debug('whatever')
    expect(nativeLogSpy.callCount).to.be.equal(0)
    scope.console.log('whatever')
    expect(nativeLogSpy.callCount).to.be.equal(1)
    scope.console.info('whatever')
    expect(nativeLogSpy.callCount).to.be.equal(2)
    scope.console.warn('whatever')
    expect(nativeLogSpy.callCount).to.be.equal(3)
    scope.console.error('whatever')
    expect(nativeLogSpy.callCount).to.be.equal(4)
  })

  it('info logLevel', () => {
    global.WXEnvironment.logLevel = 'info'
    scope.console.debug('whatever')
    expect(nativeLogSpy.callCount).to.be.equal(0)
    scope.console.log('whatever')
    expect(nativeLogSpy.callCount).to.be.equal(0)
    scope.console.info('whatever')
    expect(nativeLogSpy.callCount).to.be.equal(1)
    scope.console.warn('whatever')
    expect(nativeLogSpy.callCount).to.be.equal(2)
    scope.console.error('whatever')
    expect(nativeLogSpy.callCount).to.be.equal(3)
  })

  it('warn logLevel', () => {
    global.WXEnvironment.logLevel = 'warn'
    scope.console.debug('whatever')
    expect(nativeLogSpy.callCount).to.be.equal(0)
    scope.console.log('whatever')
    expect(nativeLogSpy.callCount).to.be.equal(0)
    scope.console.info('whatever')
    expect(nativeLogSpy.callCount).to.be.equal(0)
    scope.console.warn('whatever')
    expect(nativeLogSpy.callCount).to.be.equal(1)
    scope.console.error('whatever')
    expect(nativeLogSpy.callCount).to.be.equal(2)
  })

  it('error logLevel', () => {
    global.WXEnvironment.logLevel = 'error'
    scope.console.debug('whatever')
    expect(nativeLogSpy.callCount).to.be.equal(0)
    scope.console.log('whatever')
    expect(nativeLogSpy.callCount).to.be.equal(0)
    scope.console.info('whatever')
    expect(nativeLogSpy.callCount).to.be.equal(0)
    scope.console.warn('whatever')
    expect(nativeLogSpy.callCount).to.be.equal(0)
    scope.console.error('whatever')
    expect(nativeLogSpy.callCount).to.be.equal(1)
  })

  it('off logLevel', () => {
    global.WXEnvironment.logLevel = 'off'
    scope.console.debug('whatever')
    expect(nativeLogSpy.callCount).to.be.equal(0)
    scope.console.log('whatever')
    expect(nativeLogSpy.callCount).to.be.equal(0)
    scope.console.info('whatever')
    expect(nativeLogSpy.callCount).to.be.equal(0)
    scope.console.warn('whatever')
    expect(nativeLogSpy.callCount).to.be.equal(0)
    scope.console.error('whatever')
    expect(nativeLogSpy.callCount).to.be.equal(0)
  })

  it('unknown logLevel', () => {
    global.WXEnvironment.logLevel = 'log'
    scope.console.debug('whatever')
    expect(nativeLogSpy.callCount).to.be.equal(0)
    scope.console.log('whatever')
    expect(nativeLogSpy.callCount).to.be.equal(1)
    scope.console.info('whatever')
    expect(nativeLogSpy.callCount).to.be.equal(2)
    scope.console.warn('whatever')
    expect(nativeLogSpy.callCount).to.be.equal(3)
    scope.console.error('whatever')
    expect(nativeLogSpy.callCount).to.be.equal(4)
  })
})
