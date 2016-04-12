import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import '../objectAssign'

const {
  expect
} = chai

describe('object.assign', () => {
  it('is a function', () => {
    expect(Object.assign).is.an('function')
  })

  it('source to taget', () => {
    const target = {
      a: 'a',
      b: 'b'
    }
    const src1 = {
      b: 'bb',
      c: 'c'
    }
    const src2 = {
      d: 'd',
      a: 'aa'
    }
    Object.assign(target, src1, src2)
    expect(target).to.deep.equal({
      a: 'aa',
      b: 'bb',
      c: 'c',
      d: 'd'
    })
  })
})