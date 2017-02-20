import { expect } from 'chai'
import semver from 'semver'
import { multiDescribe } from '../helper'
import text from '../../../../render/vue/components/text'

multiDescribe('<text> component', (Vue, helper) => {
  before(() => {
    helper.register('text', text)
  })

  after(() => {
    helper.reset()
  })

  it('create simple text component', () => {
    const vm = helper.compile(`<text>abc</text>`)

    expect(vm.$el.tagName).to.be.equal('P')
    expect(vm.$el.innerHTML).to.be.equal('abc')
  })

  it('empty text component', () => {
    const vm = helper.compile(`<text></text>`)

    expect(vm.$el.tagName).to.be.equal('P')
    expect(vm.$el.innerHTML).to.be.equal('')
  })

  it('lines property', () => {
    const vm = helper.compile(`<text lines="5">abc</text>`)

    if (semver.gt(Vue.version, '2.0.8')) {
      expect(vm.$el.style.overflow).to.be.equal('hidden')
      expect(vm.$el.style.textOverflow).to.be.equal('ellipsis')
      expect(vm.$el.style.webkitLineClamp).to.be.equal('5')
    }
  })

  it('inline styles', () => {
    const vm = helper.compile(`<text style="color:blue">abc</text>`)

    if (semver.gt(Vue.version, '2.0.8')) {
      expect(vm.$el.style.color).to.be.equal('blue')
    }
  })

  // Not sure about this feature.
  it('class property', () => {
    const vm = helper.compile(`<text class="title"></text>`)
    expect(vm.$el.className).to.be.equal('weex-text title')
  })

  it('value property', () => {
    const vm = helper.compile(`<text value="A"></text>`)
    expect(vm.$el.innerHTML).to.be.equal('A')
  })

  it('both have value and content', () => {
    const vm = helper.compile(`<text value="A">B</text>`)
    expect(vm.$el.innerHTML).to.be.equal('B')
  })

  describe.skip('error usage (on native)', () => {
    it('contain other tags', () => {
      const vm = helper.compile(`<text><b>abc</b></text>`)
      const span = vm.$el.children[0]

      expect(span.tagName).to.be.equal('SPAN')
      expect(span.innerHTML).to.be.equal('')
    })
  })
})
