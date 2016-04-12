import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
const {expect} = chai
chai.use(sinonChai)

import * as modules from '../modules'
import {registerModules, requireModule, clearModules} from '../../app/register'

describe('built-in modules', () => {
  let ctx

  before(() => {
    clearModules()
  })

  after(() => {
    clearModules()
  })

  it('have keys', () => {
    registerModules(modules)

    expect(requireModule('dom')).to.have.all.keys('scrollToElement')
    expect(requireModule('stream')).to.have.all.keys('sendHttp')
    expect(requireModule('event')).to.have.all.keys('openURL')
    expect(requireModule('pageInfo')).to.have.all.keys('setTitle')
    expect(requireModule('animation')).to.have.all.keys('transition')
  })
})