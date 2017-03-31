import chai from 'chai'
const { expect } = chai

import '../../../shared/objectSetPrototypeOf'

/* eslint-disable */
describe('Object.setPrototypeOf', () => {
  it('is a function', () => {
    expect(Object.setPrototypeOf).is.an('function')
  })

  it('be able to set prototype', () => {
    const JonSnow = { name: 'Jon Snow' }
    Object.setPrototypeOf(JonSnow, {
      know: function() { return 'nothing' }
    })

    expect(Object.hasOwnProperty.call(JonSnow, 'name')).to.be.true
    expect(Object.hasOwnProperty.call(JonSnow, 'know')).to.be.false

    expect(JonSnow.know()).to.equal('nothing')

  })
})
