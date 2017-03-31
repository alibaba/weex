import { expect } from 'chai'
import * as validator from '../../../../render/vue/validator'

describe('validator', function () {
  const { validateStyles, validateProps, configure } = validator
  const warn = function () {}

  before(() => {
    configure({ silent: false })
    configure({ silent: true, onfail: warn })
  })

  it('validateStyles', () => {
    const styles = {
      position: 'absolute',
      color: '#dddddd'
    }

    expect(validateStyles).to.be.a('function')
    expect(validateStyles('text', styles)).to.be.true
    expect(validateStyles('text', { opacity: 0.2 })).to.be.true
  })

  it('validateStyles (invalid)', () => {
    expect(validateStyles).to.be.a('function')
    expect(validateStyles('unknown', { color: 'blue' })).to.be.true
    expect(validateStyles('text', { unknown: 'nothing' })).to.be.false
    expect(validateStyles('text', { color: '#ABCC' })).to.be.false
    expect(validateStyles('text', { color: '#ABCC' })).to.be.false
  })

  it('validateProps', () => {
    const props = {
      isString: 'absolute',
      style: 'color: #dddddd'
    }

    expect(validateProps).to.be.a('function')
    expect(validateProps('unknown', { whatever: 'nothing' })).to.be.true
    expect(validateProps('unknown', props)).to.be.true
    expect(validateProps('unknown', { isString: false })).to.be.false
  })
})
