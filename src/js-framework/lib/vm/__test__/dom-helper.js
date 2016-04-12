import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
const expect = chai.expect
chai.use(sinonChai)

import * as domHelper from '../dom-helper.js'
import {Document, destroyDocument} from '../../app/dom.js'

describe('help create body', () => {
  var vm

  beforeEach(() => {
    vm = {
      _app: {doc: new Document('foo')}
    }
    Object.assign(vm, domHelper)
  })

  afterEach(() => {
    vm = null
    destroyDocument('foo')
  })

  it('create body with type', () => {
    var result = vm._createBody('bar')
    expect(result).is.an.object
    expect(result.type).eql('bar')
    expect(result.ref).eql('_root')
    expect(result.instanceId).eql('foo')
  })
})

describe('help create element', () => {
  var vm

  beforeEach(() => {
    vm = {
      _app: {doc: new Document('foo')}
    }
    Object.assign(vm, domHelper)
  })

  afterEach(() => {
    vm = null
    destroyDocument('foo')
  })

  it('create element with type', () => {
    var result = vm._createElement('bar')
    expect(result).is.an.object
    expect(result.type).eql('bar')
    expect(result.instanceId).eql('foo')
  })
})

describe('help create block', () => {
  var vm

  beforeEach(() => {
    vm = {
      _app: {doc: new Document('foo')}
    }
    Object.assign(vm, domHelper)
  })

  afterEach(() => {
    vm = null
    destroyDocument('foo')
  })

  it('create block with element', () => {
    var element = vm._app.doc.createElement('bar')
    var result = vm._createBlock(element)
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
  var vm

  beforeEach(() => {
    vm = {
      _app: {doc: new Document('foo')}
    }
    Object.assign(vm, domHelper)
  })

  afterEach(() => {
    vm = null
    destroyDocument('foo')
  })

  it('attach body to documentElement', () => {
    var target = vm._createBody('bar')
    var dest = vm._app.doc.documentElement
    vm._attachTarget(target, dest)
    expect(dest.children).eql([target])
  })

  it('attach element to body', () => {
    var target = vm._createElement('bar')
    var dest = vm._createBody('baz')
    vm._attachTarget(target, dest)
    expect(dest.children).eql([target])
  })

  it('attach element to element', () => {
    var target = vm._createElement('bar')
    var dest = vm._createElement('baz')
    vm._attachTarget(target, dest)
    expect(dest.children).eql([target])
  })

  it('attach block to element', () => {
    var parent = vm._createElement('bar')
    var target = vm._createBlock(parent)
    var dest = vm._createElement('baz')
    vm._attachTarget(target, dest)
    expect(dest.children).eql([target.start, target.end])
  })

  it('attach element to block', () => {
    var target = vm._createElement('bar')
    var parent = vm._createElement('baz')
    var dest = vm._createBlock(parent)
    vm._attachTarget(target, dest)
    expect(parent.children).eql([dest.start, target, dest.end])
  })

  it('attach block to block', () => {
    var element = vm._createElement('bar')
    var target = vm._createBlock(element)
    var parent = vm._createElement('baz')
    var dest = vm._createBlock(parent)
    vm._attachTarget(target, dest)
    expect(parent.children).eql([
      dest.start, target.start, target.end, dest.end])
  })

  it('attach element to block with an update mark', () => {
    var target = vm._createElement('bar')
    var parent = vm._createElement('baz')
    var dest = vm._createBlock(parent)
    var mark = vm._createElement('qux')

    vm._attachTarget(target, dest)
    vm._attachTarget(mark, dest)
    expect(parent.children).eql([dest.start, target, mark, dest.end])

    dest.updateMark = mark
    vm._attachTarget(target, dest)
    expect(parent.children).eql([dest.start, mark, target, dest.end])
    expect(dest.updateMark).eql(target)
  })

  it('attach block to block with an update mark', () => {
    var element = vm._createElement('bar')
    var target = vm._createBlock(element)
    var parent = vm._createElement('baz')
    var dest = vm._createBlock(parent)
    var mark = vm._createElement('qux')

    vm._attachTarget(target, dest)
    vm._attachTarget(mark, dest)
    expect(parent.children).eql([
      dest.start, target.start, target.end, mark, dest.end])

    dest.updateMark = mark
    vm._attachTarget(target, dest)
    expect(parent.children).eql([
      dest.start, mark, target.start, target.end, dest.end])
    expect(dest.updateMark).eql(target.end)
  })
})

describe('help move target', () => {
  var vm, parent, dest, target1, block1, target2, block2, target3, block3

  beforeEach(() => {
    vm = {
      _app: {doc: new Document('foo')}
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
    vm = null
    destroyDocument('foo')
  })

  it('move an element to an element mark', () => {
    let mark

    expect(parent.children).eql([
      dest.start,
      target1, block1.start, block1.end,
      target2, block2.start,
        target3, block3.start, block3.end,
      block2.end,
      dest.end])

    mark = target2
    dest.updateMark = mark

    vm._moveTarget(target1, mark)

    expect(parent.children).eql([
      dest.start,
      block1.start, block1.end,
      target2, target1, block2.start,
        target3, block3.start, block3.end,
      block2.end,
      dest.end])
  })

  it('move an element to a block mark', () => {
    let mark = block2.end
    dest.updateMark = mark

    vm._moveTarget(target1, mark)

    expect(parent.children).eql([
      dest.start,
      block1.start, block1.end,
      target2, block2.start,
        target3, block3.start, block3.end,
      block2.end, target1,
      dest.end])
  })

  it('move a block to an element mark', () => {
    let mark = target2
    dest.updateMark = mark

    vm._moveTarget(block1, mark)

    expect(parent.children).eql([
      dest.start,
      target1,
      target2, block1.start, block1.end,
      block2.start,
        target3, block3.start, block3.end,
      block2.end,
      dest.end])
  })

  it('move a block to a block mark', () => {
    let mark = block2.end
    dest.updateMark = mark

    vm._moveTarget(block1, mark)

    expect(parent.children).eql([
      dest.start,
      target1,
      target2,
      block2.start,
        target3, block3.start, block3.end,
      block2.end, block1.start, block1.end,
      dest.end])
  })

  it('move a whole block to a block mark', () => {
    let mark = block1.end
    dest.updateMark = mark

    vm._moveTarget(block2, mark)

    expect(parent.children).eql([
      dest.start,
      target1, block1.start, block1.end,
      block2.start,
        target3, block3.start, block3.end,
      block2.end,
      target2,
      dest.end])
  })
})

describe('help remove target', () => {
  var vm

  beforeEach(() => {
    vm = {
      _app: {doc: new Document('foo')}
    }
    Object.assign(vm, domHelper)
  })

  afterEach(() => {
    vm = null
    destroyDocument('foo')
  })

  it('remove body', () => {
    var parent = vm._app.doc.documentElement
    var element = vm._createBody('baz')
    parent.appendChild(element)
    expect(parent.children).eql([element])
    vm._removeTarget(element)
    expect(parent.children).eql([])
  })

  it('remove element', () => {
    var parent = vm._createElement('bar')
    var element = vm._createElement('baz')
    parent.appendChild(element)
    expect(parent.children).eql([element])
    vm._removeTarget(element)
    expect(parent.children).eql([])
  })

  it('remove block', () => {
    var element = vm._createElement('baz')
    var prevElement = vm._createElement('prev')
    var nextElement = vm._createElement('next')
    var parent = vm._createElement('bar')
    vm._attachTarget(prevElement, parent)
    var block = vm._createBlock(parent)
    vm._attachTarget(element, block)
    vm._attachTarget(nextElement, parent)

    expect(parent.children).eql([
      prevElement, block.start, element, block.end, nextElement])

    vm._removeTarget(block)
    expect(parent.children).eql([
      prevElement, nextElement])
  })

  it('remove block but preserved itself', () => {
    var element = vm._createElement('baz')
    var prevElement = vm._createElement('prev')
    var nextElement = vm._createElement('next')
    var parent = vm._createElement('bar')
    vm._attachTarget(prevElement, parent)
    var block = vm._createBlock(parent)
    vm._attachTarget(element, block)
    vm._attachTarget(nextElement, parent)

    expect(parent.children).eql([
      prevElement, block.start, element, block.end, nextElement])

    vm._removeBlock(block, true)
    expect(parent.children).eql([
      prevElement, block.start, block.end, nextElement])
  })
})
