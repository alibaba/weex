import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
const { expect } = chai
chai.use(sinonChai)

import '../../../shared/console'

describe('polyfill for console', () => {
  const oriEnv = global.WXEnvironment
  const originLog = console.__ori__.log
  const originWarn = console.__ori__.warn

  beforeEach(() => {
    global.WXEnvironment = { logLevel: 'log' }
    console.__ori__.log = sinon.spy()
    console.__ori__.warn = sinon.spy()
  })
  afterEach(() => {
    global.WXEnvironment = oriEnv
    console.__ori__.log = originLog
    console.__ori__.warn = originWarn
  })

  it('a log message', () => {
    console.log('a log message', { msg: 'msg' })
    expect(console.__ori__.log.callCount).to.be.equal(1)
    expect(console.__ori__.log.firstCall.args).eql(
      ['a log message', { msg: 'msg' }]
    )
  })

  it('a warn message', () => {
    console.warn('a warn message')
    expect(console.__ori__.warn.callCount).to.be.equal(1)
    expect(console.__ori__.warn.firstCall.args).eql(
      ['a warn message']
    )
  })

  it('change env', () => {
    global.WXEnvironment.logLevel = 'warn'
    console.log('a log message')
    expect(console.__ori__.log.callCount).to.be.equal(0)
    console.warn('a warn message')
    expect(console.__ori__.warn.callCount).to.be.equal(1)
    expect(console.__ori__.warn.firstCall.args).eql(
      ['a warn message']
    )
  })
})
