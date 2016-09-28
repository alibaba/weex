import chai from 'chai'
const { expect } = chai

// remove original Array.from
// Array.from = null

import '../../../shared/arrayFrom'

/* eslint-disable */
describe('Array.from', () => {
  it('is a function', () => {
    expect(Array.from).is.an('function')
  })

  it('requires an array-like object', () => {
    expect(() => Array.from()).to.throw(TypeError)
    expect(() => Array.from(null)).to.throw(TypeError)
	})

  it('throws with invalid lengths', () => {
    expect(() => Array.from({ 'length': Infinity })).to.throw(RangeError)
    expect(() => Array.from({ 'length': Math.pow(2, 32) })).to.throw(RangeError)
	})

  it('swallows negative lengths', () => {
    expect(Array.from({ length: -1 }).length).to.equal(0)
    expect(Array.from({ length: -0 }).length).to.equal(0)
    expect(Array.from({ length: -Infinity }).length).to.equal(0)
	})

  it('works with primitives', () => {
    expect(Array.from(false)).to.deep.equal([])
    expect(Array.from(true)).to.deep.equal([])
    expect(Array.from(0)).to.deep.equal([])
    expect(Array.from(-0)).to.deep.equal([])
    expect(Array.from(1)).to.deep.equal([])
    expect(Array.from(-1)).to.deep.equal([])
    expect(Array.from(Infinity)).to.deep.equal([])
    expect(Array.from(-Infinity)).to.deep.equal([])
	})

  it('works with primitive strings', () => {
    expect(Array.from('')).to.deep.equal([])
    expect(Array.from('abc')).to.deep.equal(['a', 'b', 'c'])
    expect(Array.from('a\u5F20\u7FF0')).to.deep.equal(['a', '\u5F20', '\u7FF0'])
    expect(Array.from('x\uD834\uDF06Y')).to.deep.equal(['x', '\uD834\uDF06', 'Y'])
	})

  it.skip('works with emoji', () => {
    expect(Array.from('👨‍👩‍👧‍👦')).to.deep.equal(['👨', '‍', '👩', '‍', '👧', '‍', '👦'])
    expect(Array.from('🎅🏾')).to.deep.equal(['🎅', '🏾'])
	})

  it('works with objects', () => {
    expect(Array.from({})).to.deep.equal([])
    expect(Array.from({ name: 'abc' })).to.deep.equal([])
  })

  it('works with arrays', () => {
    expect(Array.from([])).to.deep.equal([])
    expect(Array.from(['a', 2, false, {}])).to.deep.equal(['a', 2, false, {}])
  })

  it('throws with an invalid mapping function', () => {
    expect(() => Array.from([], null)).to.throw(TypeError)
    expect(() => Array.from([], false)).to.throw(TypeError)
    expect(() => Array.from([], 'true')).to.throw(TypeError)
    expect(() => Array.from([], 42)).to.throw(TypeError)
    expect(() => Array.from([], {})).to.throw(TypeError)
    expect(() => Array.from([], [])).to.throw(TypeError)
	})

  it('works with mapping function', () => {
    expect(Array.from([1, 2, 3], n => n * n)).to.deep.equal([1, 4, 9])
    expect(Array.from('abc', x => x.toUpperCase())).to.deep.equal(['A', 'B', 'C'])
	})
})
