import { expect } from 'chai'
import * as prop from '../../../../render/vue/validator/prop'

describe('check property value', () => {
  it('isString', () => {
    expect(prop.isString('#ABCDEFG')).to.be.true
    expect(prop.isString('#CIHDEGE')).to.be.true
    expect(prop.isString()).to.be.false
    expect(prop.isString(4)).to.be.false
    expect(prop.isString({})).to.be.false
    expect(prop.isString([])).to.be.false
    expect(prop.isString(null)).to.be.false
  })
})
