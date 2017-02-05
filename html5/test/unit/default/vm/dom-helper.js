import chai from 'chai'
const { expect } = chai

import {
  createElement,
  createBlock,
  createBody,
  attachTarget,
  moveTarget,
  removeTarget
} from '../../../../frameworks/legacy/vm/dom-helper'
import { Document } from '../../../../runtime/vdom'
import Listener from '../../../../runtime/listener'

describe('help create body', () => {
  let vm

  beforeEach(() => {
    vm = {
      _app: { doc: new Document('foo', null, null, Listener) }
    }
  })

  afterEach(() => {
    vm._app.doc.destroy()
    vm = null
  })

  it('create body with type', () => {
    const result = createBody(vm, 'bar')
    expect(result).is.an.object
    expect(result.type).eql('bar')
    expect(result.ref).eql('_root')
    expect(result.docId).is.not.ok
  })
})

describe('help create element', () => {
  let vm

  beforeEach(() => {
    vm = {
      _app: { doc: new Document('foo', null, null, Listener) }
    }
  })

  afterEach(() => {
    vm._app.doc.destroy()
    vm = null
  })

  it('create element with type', () => {
    const result = createElement(vm, 'bar')
    expect(result).is.an.object
    expect(result.type).eql('bar')
    expect(result.docId).is.not.ok
  })
})

describe('help create block', () => {
  let vm

  beforeEach(() => {
    vm = {
      _app: { doc: new Document('foo', null, null, Listener) }
    }
  })

  afterEach(() => {
    vm._app.doc.destroy()
    vm = null
  })

  it('create block with element', () => {
    const element = vm._app.doc.createElement('bar')
    const result = createBlock(vm, element)
    expect(result).is.an.object
    expect(result.start).is.an.object
    expect(result.end).is.an.object
    expect(result.start.type).eql('comment')
    expect(result.end.type).eql('comment')
    expect(result.start.value).eql('start')
    expect(result.end.value).eql('end')
    expect(result.element).equal(element)
    expect(result.element.children).eql([result.start, result.end])
  })
})

describe('help attach target', () => {
  let vm

  beforeEach(() => {
    vm = {
      _app: { doc: new Document('foo', null, null, Listener) }
    }
  })

  afterEach(() => {
    vm._app.doc.destroy()
    vm = null
  })

  it('attach body to documentElement', () => {
    const oriCallnative = global.callNative
    global.callNative = function () {}
    const target = createBody(vm, 'bar')
    const dest = vm._app.doc.documentElement
    attachTarget(vm, target, dest)
    expect(dest.children).eql([target])
    global.callNative = oriCallnative
  })

  it('attach element to body', () => {
    const target = createElement(vm, 'bar')
    const dest = createBody(vm, 'baz')
    attachTarget(vm, target, dest)
    expect(dest.children).eql([target])
  })

  it('attach element to element', () => {
    const target = createElement(vm, 'bar')
    const dest = createElement(vm, 'baz')
    attachTarget(vm, target, dest)
    expect(dest.children).eql([target])
  })

  it('attach block to element', () => {
    const parent = createElement(vm, 'bar')
    const target = createBlock(vm, parent)
    const dest = createElement(vm, 'baz')
    attachTarget(vm, target, dest)
    // block can't attach to another element
    expect(dest.children).eql([])
    expect(parent.children).eql([target.start, target.end])
  })

  it('attach element to block', () => {
    const target = createElement(vm, 'bar')
    const parent = createElement(vm, 'baz')
    const dest = createBlock(vm, parent)
    attachTarget(vm, target, dest)
    expect(parent.children).eql([dest.start, target, dest.end])
  })

  it('attach block to block', () => {
    const element = createElement(vm, 'bar')
    const target = createBlock(vm, element)
    const parent = createElement(vm, 'baz')
    const dest = createBlock(vm, parent)
    attachTarget(vm, target, dest)
    // block can't attach to another element
    expect(parent.children).eql([dest.start, dest.end])
    expect(element.children).eql([target.start, target.end])
  })

  it('attach element to block with an update mark', () => {
    const target = createElement(vm, 'bar')
    const parent = createElement(vm, 'baz')
    const dest = createBlock(vm, parent)
    const mark = createElement(vm, 'qux')

    attachTarget(vm, target, dest)
    attachTarget(vm, mark, dest)
    expect(parent.children).eql([dest.start, target, mark, dest.end])

    dest.updateMark = mark
    attachTarget(vm, target, dest)
    expect(parent.children).eql([dest.start, mark, target, dest.end])
    expect(dest.updateMark).eql(target)
  })

  it('attach block to block with an update mark', () => {
    const element = createElement(vm, 'bar')
    const target = createBlock(vm, element)
    const parent = createElement(vm, 'baz')
    const dest = createBlock(vm, parent)
    const mark = createElement(vm, 'qux')

    attachTarget(vm, target, dest)
    attachTarget(vm, mark, dest)
    // block can't attach to another element
    expect(parent.children).eql([dest.start, mark, dest.end])
    expect(element.children).eql([target.start, target.end])

    dest.updateMark = mark
    attachTarget(vm, target, dest)
    // block can't attach to another element
    expect(parent.children).eql([dest.start, mark, dest.end])
    expect(element.children).eql([target.start, target.end])
  })
})

describe('help move target', () => {
  let vm, parent, dest, target1, block1, target2, block2, target3, block3

  beforeEach(() => {
    vm = {
      _app: { doc: new Document('foo', null, null, Listener) }
    }
    parent = createElement(vm, 'r')
    dest = createBlock(vm, parent)
    target1 = createElement(vm, 't1')
    attachTarget(vm, target1, dest)
    block1 = createBlock(vm, dest)
    target2 = createElement(vm, 't2')
    attachTarget(vm, target2, dest)
    block2 = createBlock(vm, dest)
    target3 = createElement(vm, 't3')
    attachTarget(vm, target3, block2)
    block3 = createBlock(vm, block2)
  })

  afterEach(() => {
    vm._app.doc.destroy()
    vm = null
  })

  it('move an element to an element mark', () => {
    /* eslint-disable indent */
    expect(parent.children).eql([
      dest.start,
      target1, block1.start, block1.end,
      target2, block2.start,
        target3, block3.start, block3.end,
      block2.end,
      dest.end])
    /* eslint-enable indent */

    const mark = target2
    dest.updateMark = mark

    moveTarget(vm, target1, mark)

    /* eslint-disable indent */
    expect(parent.children).eql([
      dest.start,
      block1.start, block1.end,
      target2, target1, block2.start,
        target3, block3.start, block3.end,
      block2.end,
      dest.end])
    /* eslint-enable indent */
  })

  it('move an element to a block mark', () => {
    const mark = block2.end
    dest.updateMark = mark

    moveTarget(vm, target1, mark)

    /* eslint-disable indent */
    expect(parent.children).eql([
      dest.start,
      block1.start, block1.end,
      target2, block2.start,
        target3, block3.start, block3.end,
      block2.end, target1,
      dest.end])
    /* eslint-enable indent */
  })

  it('move a block to an element mark', () => {
    const mark = target2
    dest.updateMark = mark

    moveTarget(vm, block1, mark)

    /* eslint-disable indent */
    expect(parent.children).eql([
      dest.start,
      target1,
      target2, block1.start, block1.end,
      block2.start,
        target3, block3.start, block3.end,
      block2.end,
      dest.end])
    /* eslint-enable indent */
  })

  it('move a block to a block mark', () => {
    const mark = block2.end
    dest.updateMark = mark

    moveTarget(vm, block1, mark)

    /* eslint-disable indent */
    expect(parent.children).eql([
      dest.start,
      target1,
      target2,
      block2.start,
        target3, block3.start, block3.end,
      block2.end, block1.start, block1.end,
      dest.end])
    /* eslint-enable indent */
  })

  it('move a whole block to a block mark', () => {
    const mark = block1.end
    dest.updateMark = mark

    moveTarget(vm, block2, mark)

    /* eslint-disable indent */
    expect(parent.children).eql([
      dest.start,
      target1, block1.start, block1.end,
      block2.start,
        target3, block3.start, block3.end,
      block2.end,
      target2,
      dest.end])
    /* eslint-enable indent */
  })
})

describe('help remove target', () => {
  let vm

  beforeEach(() => {
    vm = {
      _app: { doc: new Document('foo', null, null, Listener) }
    }
  })

  afterEach(() => {
    vm._app.doc.destroy()
    vm = null
  })

  it('remove body', () => {
    const oriCallnative = global.callNative
    global.callNative = function () {}
    const parent = vm._app.doc.documentElement
    const element = createBody(vm, 'baz')
    parent.appendChild(element)
    expect(parent.children).eql([element])
    removeTarget(vm, element)
    expect(parent.children).eql([])
    global.callNative = oriCallnative
  })

  it('remove element', () => {
    const parent = createElement(vm, 'bar')
    const element = createElement(vm, 'baz')
    parent.appendChild(element)
    expect(parent.children).eql([element])
    removeTarget(vm, element)
    expect(parent.children).eql([])
  })

  it('remove block', () => {
    const element = createElement(vm, 'baz')
    const prevElement = createElement(vm, 'prev')
    const nextElement = createElement(vm, 'next')
    const parent = createElement(vm, 'bar')
    attachTarget(vm, prevElement, parent)
    const block = createBlock(vm, parent)
    attachTarget(vm, element, block)
    attachTarget(vm, nextElement, parent)

    expect(parent.children).eql([
      prevElement, block.start, element, block.end, nextElement])

    removeTarget(vm, block)
    expect(parent.children).eql([
      prevElement, nextElement])
  })

  it('remove block but preserved itself', () => {
    const element = createElement(vm, 'baz')
    const prevElement = createElement(vm, 'prev')
    const nextElement = createElement(vm, 'next')
    const parent = createElement(vm, 'bar')
    attachTarget(vm, prevElement, parent)
    const block = createBlock(vm, parent)
    attachTarget(vm, element, block)
    attachTarget(vm, nextElement, parent)

    expect(parent.children).eql([
      prevElement, block.start, element, block.end, nextElement])

    removeTarget(vm, block, true)
    expect(parent.children).eql([
      prevElement, block.start, block.end, nextElement])
  })
})
