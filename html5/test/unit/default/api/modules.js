import chai from 'chai'
const { expect } = chai

import * as modules from '../../../../frameworks/legacy/api/modules'
import { initModules, requireModule, clearModules } from '../../../../frameworks/legacy/app/register'

describe('built-in modules', () => {
  before(() => {
    clearModules()
  })

  after(() => {
    clearModules()
  })

  it('have keys', () => {
    const app = {}
    initModules(modules)
    expect(requireModule(app, 'dom')).to.have.all.keys('scrollToElement')
    expect(requireModule(app, 'stream')).to.have.all.keys('sendHttp')
    expect(requireModule(app, 'event')).to.have.all.keys('openURL')
    expect(requireModule(app, 'pageInfo')).to.have.all.keys('setTitle')
    expect(requireModule(app, 'animation')).to.have.all.keys('transition')
  })
})
