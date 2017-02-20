import { expect } from 'chai'
import { multiDescribe } from '../helper'
import list from '../../../../render/vue/components/scrollable/list'

multiDescribe('<list> component', (Vue, helper) => {
  before(() => {
    helper.register('list', list)
  })

  after(() => {
    helper.reset()
  })

  it('create simple list component', () => {
    const vm = helper.compile(`<list><cell></cell></list>`)

    // console.log(vm.$el)
    expect(vm.$el.tagName).to.be.equal('MAIN')
    expect(vm.$el.className).to.be.equal('weex-list weex-list-wrapper')
  })
})
