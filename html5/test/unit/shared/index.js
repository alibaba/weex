import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
const { expect } = chai
chai.use(sinonChai)

import * as shared from '../../../shared'

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

describe('freeze the prototype of build-in objects', function () {
  before(() => {
    shared.freezePrototype()
  })

  it('Object & Object.prototype', () => {
    expect(Object).to.be.frozen
    expect(Object.prototype).to.be.frozen
  })
  it('Array & Array.prototype', () => {
    expect(Array).to.be.frozen
    expect(Array.prototype).to.be.frozen
  })

  it('String.prototype', () => { expect(String.prototype).to.be.frozen })
  it('Number.prototype', () => { expect(Number.prototype).to.be.frozen })
  it('Boolean.prototype', () => { expect(Boolean.prototype).to.be.frozen })
  it('Error.prototype', () => { expect(Error.prototype).to.be.frozen })
  it('Date.prototype', () => { expect(Date.prototype).to.be.frozen })
  it('Math.prototype', () => { expect(Math.prototype).to.be.frozen })
  it('RegExp.prototype', () => { expect(RegExp.prototype).to.be.frozen })
})
