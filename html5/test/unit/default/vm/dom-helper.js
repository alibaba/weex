import chai from 'chai'
const { expect } = chai

global.callNative = function () {}

import * as domHelper from '../../../../default/vm/dom-helper'
import { Document } from '../../../../vdom'

describe('help create body', () => {
  let vm

  beforeEach(() => {
    vm = {
      _app: { doc: new Document('foo') }
    }
    Object.assign(vm, domHelper)
  })

  afterEach(() => {
    vm._app.doc.destroy()
    vm = null
  })

  it('create body with type', () => {
    const result = vm._createBody('bar')
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
      _app: { doc: new Document('foo') }
    }
    Object.assign(vm, domHelper)
  })

  afterEach(() => {
    vm._app.doc.destroy()
    vm = null
  })

  it('create element with type', () => {
    const result = vm._createElement('bar')
    expect(result).is.an.object
    expect(result.type).eql('bar')
    expect(result.docId).is.not.ok
  })
})

describe('help create block', () => {
  let vm

  beforeEach(() => {
    vm = {
      _app: { doc: new Document('foo') }
    }
    Object.assign(vm, domHelper)
  })

  afterEach(() => {
    vm._app.doc.destroy()
    vm = null
  })

  it('create block with element', () => {
    const element = vm._app.doc.createElement('bar')
    const result = vm._createBlock(element)
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
      _app: { doc: new Document('foo') }
    }
    Object.assign(vm, domHelper)
  })

  afterEach(() => {
    vm._app.doc.destroy()
    vm = null
  })

  it('attach body to documentElement', () => {
    const target = vm._createBody('bar')
    const dest = vm._app.doc.documentElement
    vm._attachTarget(target, dest)
    expect(dest.children).eql([target])
  })

  it('attach element to body', () => {
    const target = vm._createElement('bar')
    const dest = vm._createBody('baz')
    vm._attachTarget(target, dest)
    expect(dest.children).eql([target])
  })

  it('attach element to element', () => {
    const target = vm._createElement('bar')
    const dest = vm._createElement('baz')
    vm._attachTarget(target, dest)
    expect(dest.children).eql([target])
  })

  it('attach block to element', () => {
    const parent = vm._createElement('bar')
    const target = vm._createBlock(parent)
    const dest = vm._createElement('baz')
    vm._attachTarget(target, dest)
    // block can't attach to another element
    expect(dest.children).eql([])
    expect(parent.children).eql([target.start, target.end])
  })

  it('attach element to block', () => {
    const target = vm._createElement('bar')
    const parent = vm._createElement('baz')
    const dest = vm._createBlock(parent)
    vm._attachTarget(target, dest)
    expect(parent.children).eql([dest.start, target, dest.end])
  })

  it('attach block to block', () => {
    const element = vm._createElement('bar')
    const target = vm._createBlock(element)
    const parent = vm._createElement('baz')
    const dest = vm._createBlock(parent)
    vm._attachTarget(target, dest)
    // block can't attach to another element
    expect(parent.children).eql([dest.start, dest.end])
    expect(element.children).eql([target.start, target.end])
  })

  it('attach element to block with an update mark', () => {
    const target = vm._createElement('bar')
    const parent = vm._createElement('baz')
    const dest = vm._createBlock(parent)
    const mark = vm._createElement('qux')

    vm._attachTarget(target, dest)
    vm._attachTarget(mark, dest)
    expect(parent.children).eql([dest.start, target, mark, dest.end])

    dest.updateMark = mark
    vm._attachTarget(target, dest)
    expect(parent.children).eql([dest.start, mark, target, dest.end])
    expect(dest.updateMark).eql(target)
  })

  it('attach block to block with an update mark', () => {
    const element = vm._createElement('bar')
    const target = vm._createBlock(element)
    const parent = vm._createElement('baz')
    const dest = vm._createBlock(parent)
    const mark = vm._createElement('qux')

    vm._attachTarget(target, dest)
    vm._attachTarget(mark, dest)
    // block can't attach to another element
    expect(parent.children).eql([dest.start, mark, dest.end])
    expect(element.children).eql([target.start, target.end])

    dest.updateMark = mark
    vm._attachTarget(target, dest)
    // block can't attach to another element
    expect(parent.children).eql([dest.start, mark, dest.end])
    expect(element.children).eql([target.start, target.end])
  })
})

describe('help move target', () => {
  let vm, parent, dest, target1, block1, target2, block2, target3, block3

  beforeEach(() => {
    vm = {
      _app: { doc: new Document('foo') }
    }
    Object.assign(vm, domHelper)
    parent = vm._createElement('r')
    dest = vm._createBlock(parent)
    target1 = vm._createElement('t1')
    vm._attachTarget(target1, dest)
    block1 = vm._createBlock(dest)
    target2 = vm._createElement('t2')
    vm._attachTarget(target2, dest)
    block2 = vm._createBlock(dest)
    target3 = vm._createElement('t3')
    vm._attachTarget(target3, block2)
    block3 = vm._createBlock(block2)
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

    vm._moveTarget(target1, mark)

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

    vm._moveTarget(target1, mark)

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

    vm._moveTarget(block1, mark)

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

    vm._moveTarget(block1, mark)

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

    vm._moveTarget(block2, mark)

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
      _app: { doc: new Document('foo') }
    }
    Object.assign(vm, domHelper)
  })

  afterEach(() => {
    vm._app.doc.destroy()
    vm = null
  })

  it('remove body', () => {
    const parent = vm._app.doc.documentElement
    const element = vm._createBody('baz')
    parent.appendChild(element)
    expect(parent.children).eql([element])
    vm._removeTarget(element)
    expect(parent.children).eql([])
  })

  it('remove element', () => {
    const parent = vm._createElement('bar')
    const element = vm._createElement('baz')
    parent.appendChild(element)
    expect(parent.children).eql([element])
    vm._removeTarget(element)
    expect(parent.children).eql([])
  })

  it('remove block', () => {
    const element = vm._createElement('baz')
    const prevElement = vm._createElement('prev')
    const nextElement = vm._createElement('next')
    const parent = vm._createElement('bar')
    vm._attachTarget(prevElement, parent)
    const block = vm._createBlock(parent)
    vm._attachTarget(element, block)
    vm._attachTarget(nextElement, parent)

    expect(parent.children).eql([
      prevElement, block.start, element, block.end, nextElement])

    vm._removeTarget(block)
    expect(parent.children).eql([
      prevElement, nextElement])
  })

  it('remove block but preserved itself', () => {
    const element = vm._createElement('baz')
    const prevElement = vm._createElement('prev')
    const nextElement = vm._createElement('next')
    const parent = vm._createElement('bar')
    vm._attachTarget(prevElement, parent)
    const block = vm._createBlock(parent)
    vm._attachTarget(element, block)
    vm._attachTarget(nextElement, parent)

    expect(parent.children).eql([
      prevElement, block.start, element, block.end, nextElement])

    vm._removeBlock(block, true)
    expect(parent.children).eql([
      prevElement, block.start, block.end, nextElement])
  })
})
