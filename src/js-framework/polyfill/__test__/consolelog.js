import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import {printlog}  from '../consolelog'

const {
  expect
} = chai

describe('polyfill for printlog', () => {
  before(() => {
    global.WXEnvironment = {
      logLevel: 'all'
    }
    global.nativeLog = sinon.spy()
  })

  beforeEach(() => {
    global.nativeLog.reset()
  })

  after(() => {
    global.nativeLog = undefined
    global.WXEnvironment = undefined
  })

  it('a log message', () => {
    printlog('a log message', {msg: 'msg'}, '__VERBOSE')
    expect(global.nativeLog.callCount).to.be.equal(1)
    expect(global.nativeLog.firstCall.args).eql(
      ['a log message', '{"msg":"msg"}', '__VERBOSE']
    )
  })

  it('a debug message', () => {
    printlog('a debug message', '__DEBUG')
    expect(global.nativeLog.callCount).to.be.equal(1)
    expect(global.nativeLog.firstCall.args).eql(
      ['a debug message', '__DEBUG']
    )
  })

  it('a info message', () => {
    printlog('a info message', '__INFO')
    expect(global.nativeLog.callCount).to.be.equal(1)
    expect(global.nativeLog.firstCall.args).eql(
      ['a info message', '__INFO']
    )
  })

  it('a warn message', () => {
    printlog('a warn message', '__WARN')
    expect(global.nativeLog.callCount).to.be.equal(1)
    expect(global.nativeLog.firstCall.args).eql(
      ['a warn message', '__WARN']
    )
  })

  it('a error message', () => {
    printlog('a error message', '__ERROR')
    expect(global.nativeLog.callCount).to.be.equal(1)
    expect(global.nativeLog.firstCall.args).eql(
      ['a error message', '__ERROR']
    )
  })

  it('no message', () => {
    global.WXEnvironment = {
      logLevel: 'error'
    }

    printlog('a info message', '__INFO')
    expect(global.nativeLog.callCount).to.be.equal(0)
  })
})