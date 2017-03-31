import { expect } from 'chai'
import * as check from '../../../../render/vue/validator/check'

describe('check', () => {
  const { flatten, checkSupported, isSupportedStyle, isSupportedProp } = check
  it('flatten', () => {
    expect(flatten([])).to.deep.equal([])
    expect(flatten(['a', 'b'])).to.deep.equal(['a', 'b'])
    expect(flatten([['a'], ['b']])).to.deep.equal(['a', 'b'])
    expect(flatten(['a', ['b'], 'c'])).to.deep.equal(['a', 'b', 'c'])
    expect(flatten([['a', 'b'], 'c', ['d', 'e', 'f']])).to.deep.equal(['a', 'b', 'c', 'd', 'e', 'f'])
    expect(flatten([['a', ['b']], 'c', [['d', ['e']], 'f']])).to.deep.equal(['a', 'b', 'c', 'd', 'e', 'f'])
  })

  it('checkSupported', () => {
    const list = {
      '@shared': ['a', 'b'],
      custom: ['@shared', 'c']
    }

    expect(checkSupported('custom', 'a', list)).to.be.true
    expect(checkSupported('custom', 'b', list)).to.be.true
    expect(checkSupported('custom', 'c', list)).to.be.true
    expect(checkSupported('custom', 'd', list)).to.be.false
    expect(checkSupported('unknown', 'a', list)).to.be.false
  })

  it('isSupportedStyle', () => {
    expect(isSupportedStyle('text', 'width')).to.be.true
    expect(isSupportedStyle('text', 'color')).to.be.true
    expect(isSupportedStyle('text', 'border')).to.be.false
  })

  it('isSupportedProp', () => {
    expect(isSupportedProp('text', 'width')).to.be.false
    expect(isSupportedProp('text', 'border')).to.be.false
  })
})
