import { expect } from 'chai'
import { multiDescribe } from '../helper'
import web from '../../../../render/vue/components/web'

multiDescribe('<web> component', (Vue, helper) => {
  before(() => {
    helper.register('web', web)
  })

  after(() => {
    helper.reset()
  })

  it('simple <web> component', () => {
    const vm = helper.compile(`<web></web>`)

    // console.log(vm.$el)
    expect(vm.$el.tagName).to.be.equal('IFRAME')
    expect(vm.$el.className).to.be.equal('weex-web')
  })

  it('use src attribute', () => {
    const vm = helper.compile(`<web src="https://x.cn"></web>`)

    expect(vm.$el.tagName).to.be.equal('IFRAME')
    expect(vm.$el.getAttribute('src')).to.be.equal('https://x.cn')
    expect(vm.$el.className).to.be.equal('weex-web')
  })
})
