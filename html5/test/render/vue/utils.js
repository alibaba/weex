import { expect } from 'chai'
import * as utils from '../../../render/vue/utils'

describe('utils', function () {
  it('cached', () => {
    expect(utils.cached).to.be.a('function')
  })

  it('camelize', () => {
    const { camelize } = utils
    expect(camelize).to.be.a('function')
    expect(camelize('')).to.be.equal('')
    expect(camelize('dispaly')).to.be.equal('dispaly')
    expect(camelize('-webkit-transform')).to.be.equal('WebkitTransform')
    expect(camelize('text-overflow')).to.be.equal('textOverflow')
    expect(camelize('a-b-c-d')).to.be.equal('aBCD')
  })

  it('capitalize', () => {
    const { capitalize } = utils
    expect(capitalize).to.be.a('function')
    expect(capitalize('')).to.be.equal('')
    expect(capitalize('string')).to.be.equal('String')
    expect(capitalize('string object')).to.be.equal('String object')
    expect(capitalize('[string object]')).to.be.equal('[string object]')
    expect(capitalize('I have an apple')).to.be.equal('I have an apple')
  })

  it('hyphenate', () => {
    const { hyphenate } = utils
    expect(hyphenate).to.be.a('function')
    expect(hyphenate('')).to.be.equal('')
    expect(hyphenate('dispaly')).to.be.equal('dispaly')
    expect(hyphenate('WebkitTransform')).to.be.equal('webkit-transform')
    expect(hyphenate('textOverflow')).to.be.equal('text-overflow')
    expect(hyphenate('aBCD')).to.be.equal('a-b-c-d')
  })

  it('extend', () => {
    const { extend } = utils
    expect(extend).to.be.a('function')

    const abc = { name: 'abc' }
    expect(extend(abc)).to.deep.equal(abc)
    expect(extend(abc, { name: 'x' }) === abc).to.be.true
    expect(abc).to.deep.equal({ name: 'x' })
  })
})
