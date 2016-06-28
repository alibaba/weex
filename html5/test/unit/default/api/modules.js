import chai from 'chai'
const { expect } = chai

import * as modules from '../../../../default/api/modules'
import { registerModules, requireModule, clearModules } from '../../../../default/app/register'

describe('built-in modules', () => {
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
