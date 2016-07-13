import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
const { expect } = chai
chai.use(sinonChai)

import '../../../shared'

describe('a polyfill of', () => {
  it.skip('Promise', () => {
    sinon.spy(global, 'Promise')
    sinon.stub(console, 'warn')
    expect(typeof Promise).to.be.equal('function')
    new Promise(sinon.spy()).then(sinon.spy())
    Promise.all()
    Promise.race()
    Promise.resolve()
    Promise.reject()
    expect(global.Promise.callCount).to.be.equal(1)
    expect(console.warn.callCount).to.be.equal(5)
    console.warn.restore()
    global.Promise.restore()
  })

  it('Object.assign', () => {
    expect(typeof Object.assign).to.be.equal('function')
  })

  it('setTimeout', () => {
    expect(typeof setTimeout).to.be.equal('function')
  })

  it('console.log', () => {
    expect(typeof console.log).to.be.equal('function')
  })
})
