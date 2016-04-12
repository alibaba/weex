import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import '../index'

const {
  expect
} = chai

describe('a polyfill of', () => {
  it('Promise', () => {
    expect(typeof Promise).to.be.equal('function')
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