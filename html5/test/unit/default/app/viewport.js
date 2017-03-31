import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
const { expect } = chai
chai.use(sinonChai)

import * as viewport from '../../../../frameworks/legacy/app/viewport'

describe('viewport', function () {
  const originalCallNative = global.callNative
  const { setViewport, validateViewport } = viewport
  const mockApp = {
    id: 'mock',
    callTasks (...args) {
      global.callNative(...args)
    }
  }

  before(() => {
    sinon.stub(console, 'warn')
  })

  beforeEach(() => {
    global.callNative = sinon.spy()
  })
  afterEach(() => {
    global.callNative = originalCallNative
    console.warn.reset()
  })

  it('invalid setViewport', () => {
    setViewport()
    expect(global.callNative.callCount).to.be.equal(0)
    setViewport({})
    expect(global.callNative.callCount).to.be.equal(0)
  })

  it('setViewport', () => {
    setViewport(mockApp, {})
    expect(global.callNative.callCount).to.be.equal(1)
    setViewport(mockApp, { width: 640 })
    expect(global.callNative.callCount).to.be.equal(2)
    setViewport(mockApp, { width: 'device-width' })
    expect(global.callNative.callCount).to.be.equal(3)
  })

  it('validateViewport', () => {
    expect(validateViewport()).to.be.false
    expect(console.warn.callCount).to.be.equal(1)
    expect(validateViewport({})).to.be.false
    expect(console.warn.callCount).to.be.equal(2)

    expect(validateViewport({ width: 200 })).to.be.true
    expect(console.warn.callCount).to.be.equal(2)
    expect(validateViewport({ width: 'device-width' })).to.be.true
    expect(console.warn.callCount).to.be.equal(2)

    expect(validateViewport({ width: 'initial-width' })).to.be.false
    expect(console.warn.callCount).to.be.equal(3)
  })
})
