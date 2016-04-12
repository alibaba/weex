import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import '../promise'

const {
  expect
} = chai

describe('promise polyfill', () => {
  it('has Promise constructor', (done) => {
    new Promise((resolve, reject) => {
      resolve(1)
    }).then(n => {
      expect(n).to.be.equal(1)
      done()
    }).catch(done)
  })
})