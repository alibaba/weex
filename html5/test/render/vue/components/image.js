import { expect } from 'chai'
import { multiDescribe } from '../helper'
import image from '../../../../render/vue/components/image'

multiDescribe('<image> component', (Vue, helper) => {
  before(() => {
    helper.register('image', image)
  })

  after(() => {
    helper.reset()
  })

  it('simple <image> component', () => {
    const vm = helper.compile(`<image>abc</image>`)

    // console.log(vm.$el)
    expect(vm.$el.tagName).to.be.equal('FIGURE')
    expect(vm.$el.className).to.be.equal('weex-image')
    expect(vm.$el.innerHTML).to.be.equal('')
  })

  it('<image> with src', () => {
    const src = 'https://vuejs.org/images/logo.png'
    const vm = helper.compile(`<image src="${src}">`)

    expect(vm.$el.style.backgroundImage).match(new RegExp(`url\s*\\("?${src}"?\\)`), 'i')
  })

  it('<image> resize="cover"', () => {
    const vm = helper.compile(`<image resize="cover">`)
    expect(vm.$el.style.backgroundSize).to.be.equal('cover')
  })

  it('<image> resize="contain"', () => {
    const vm = helper.compile(`<image resize="contain">`)
    expect(vm.$el.style.backgroundSize).to.be.equal('contain')
  })

  it('<image> resize="stretch"', () => {
    const vm = helper.compile(`<image resize="stretch">`)
    expect(vm.$el.style.backgroundSize).to.be.equal('100%')
  })

  it('<image> unknown resize', () => {
    const vm = helper.compile(`<image resize="unknown">`)
    expect(vm.$el.style.backgroundSize).to.be.equal('')
  })
})
