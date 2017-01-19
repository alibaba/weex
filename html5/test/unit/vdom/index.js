import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
const { expect } = chai
chai.use(sinonChai)

import {
  Document,
  Element,
  Comment,
  elementTypes,
  registerElement,
  clearElementTypes
} from '../../../runtime/vdom'

describe('document constructor', () => {
  it('create & destroy document', () => {
    const doc = new Document('foo', 'http://path/to/url')
    expect(doc).is.an.object
    expect(doc.id).eql('foo')
    expect(doc.URL).eql('http://path/to/url')
    expect(doc.documentElement).is.an.object
    expect(doc.documentElement.role).equal('documentElement')
    doc.destroy()
  })
})

describe('component methods management', () => {
  before(() => {
    registerElement('x', ['foo', 'bar'])
    registerElement('y', [])
    registerElement('z')
  })

  after(() => {
    clearElementTypes()
  })

  it('has registered element types', () => {
    expect(Object.keys(elementTypes)).eql(['x'])
  })

  it('will call component method', () => {
    const spy = sinon.spy()
    const doc = new Document('test', '', spy)
    const x = new Element('x')
    const y = new Element('y')
    const z = new Element('z')
    const n = new Element('n')
    expect(x.foo).is.function
    expect(x.bar).is.function
    expect(x.baz).is.undefined
    expect(y.foo).is.undefined
    expect(z.foo).is.undefined
    expect(n.foo).is.undefined

    doc.createBody('r')
    doc.documentElement.appendChild(doc.body)
    doc.body.appendChild(x)
    doc.body.appendChild(y)
    doc.body.appendChild(z)
    doc.body.appendChild(n)
    expect(spy.args.length).eql(5)

    x.foo(1, 2, 3)
    expect(spy.args.length).eql(6)
    expect(spy.args[5]).eql([[{ component: 'x', method: 'foo', ref: x.ref, args: [1, 2, 3] }]])
  })
})

describe('document methods', () => {
  let doc

  beforeEach(() => {
    doc = new Document('foo', null, function () {})
  })

  afterEach(() => {
    doc.destroy()
  })

  it('open & close with a listener', () => {
    expect(doc.listener.batched).is.false
    doc.close()
    expect(doc.listener.batched).is.true
    doc.open()
    expect(doc.listener.batched).is.false
  })

  it('create body', () => {
    const ele = doc.createBody('container',
      { attr: { id: 'a' }, style: { fontSize: 16 }})
    expect(ele.role).equal('body')
    expect(ele.attr).to.have.a.property('id', 'a')
    expect(ele.style).to.have.a.property('fontSize', 16)
    expect(ele).have.a.property('ref')
    expect(ele).have.a.property('children')
    expect(ele).have.a.property('pureChildren')
    expect(ele).have.a.property('insertBefore')
    expect(ele).have.a.property('setStyle')

    const ref = ele.ref
    expect(doc.nodeMap[ref]).equal(ele)
  })

  it('create element', () => {
    const ele = doc.createElement('container',
      { attr: { id: 'a' }, style: { fontSize: 16 }})
    expect(ele.attr).to.have.a.property('id', 'a')
    expect(ele.style).to.have.a.property('fontSize', 16)
    expect(ele).have.a.property('ref')
    expect(ele).have.a.property('children')
    expect(ele).have.a.property('pureChildren')
    expect(ele).have.a.property('insertBefore')
    expect(ele).have.a.property('setStyle')

    expect(doc.nodeMap[ele.ref]).is.undefined
    doc.documentElement.appendChild(ele)
    expect(doc.nodeMap[ele.ref]).equal(ele)
  })

  it('create comment', () => {
    const comment = doc.createComment('start')
    expect(comment).have.a.property('ref')
    expect(comment).not.have.a.property('appendChild')
    expect(comment).have.a.property('value', 'start')
    expect(comment.toString()).eql('<!-- start -->')

    const ref = comment.ref
    expect(doc.nodeMap[ref]).is.undefined
    doc.documentElement.appendChild(comment)
    expect(doc.nodeMap[ref]).equal(comment)
  })
})

describe('Element in document methods', () => {
  let doc, el, el2, el3

  beforeEach(() => {
    doc = new Document('foo', null, function () {})
    el = new Element('bar', {
      attr: { a: 11, b: 12 },
      style: { c: 13, d: 14 },
      classStyle: { a: 211, c: 213 }
    })
    el2 = new Element('baz', {
      attr: { a: 21, b: 22 },
      style: { c: 23, d: 24 },
      classStyle: { a: 221, c: 223 }
    })
    el3 = new Element('qux', {
      attr: { a: 31, b: 32 },
      style: { c: 33, d: 34 },
      classStyle: { a: 231, c: 233 }
    })
  })

  afterEach(() => {
    doc.destroy()
  })

  it('init correctly', () => {
    expect(el).is.an.object
    expect(el.type).eql('bar')
    expect(el.attr).eql({ a: 11, b: 12 })
    expect(el.style).eql({ c: 13, d: 14 })
    expect(el.event).eql({})
    expect(el.children).eql([])
    expect(el.pureChildren).eql([])
    expect(doc.nodeMap).is.an.object
    expect(doc.documentElement).is.an.object
    expect(Object.keys(doc.nodeMap)).eql([doc.documentElement.ref])
    doc.documentElement.appendChild(el)
    doc.documentElement.appendChild(el2)
    el2.appendChild(el3)
    expect(Object.keys(doc.nodeMap)).eql([
      doc.documentElement.ref,
      el.ref
    ])
  })

  it('has correct exports', () => {
    const ref = el.ref
    const finalStyle = el.toStyle()
    expect(finalStyle).eql({ a: 211, c: 13, d: 14 })
    expect(el.toJSON()).eql({
      ref: ref, type: 'bar',
      attr: el.attr, style: finalStyle
    })
    expect(el.toString()).eql(
      '<bar attr={"a":11,"b":12} style={"a":211,"c":13,"d":14}></bar>')
  })

  it('createBody', () => {
    doc.createBody('r')
    doc.documentElement.appendChild(doc.body)
    expect(doc.body).is.an.object
    expect(doc.body.role).eql('body')
    expect(doc.body.type).eql('r')
    expect(doc.body.docId).eql('foo')
  })

  it('appendChild', () => {
    el.appendChild(el2)
    expect(el.children.length).eql(1)
    expect(el.children[0]).equal(el2)
    expect(el2.parentNode.ref).eql(el.ref)

    expect(el.docId).is.not.ok
    expect(el2.docId).is.not.ok

    doc.createBody('r')
    doc.documentElement.appendChild(doc.body)
    doc.body.appendChild(el)
    expect(doc.body.children.length).eql(1)
    expect(el.parentNode.ref).eql(doc.body.ref)
    expect(el.docId).is.ok
    expect(el2.docId).is.ok

    expect(el3.docId).is.not.ok
    el.appendChild(el3)
    expect(el.children.length).eql(2)
    expect(el.children[0]).equal(el2)
    expect(el.children[1]).equal(el3)
    expect(el3.parentNode.ref).eql(el.ref)
    expect(el3.docId).is.ok

    expect(el2.previousSibling).is.not.ok
    expect(el2.nextSibling).eql(el3)
    expect(el3.previousSibling).eql(el2)
    expect(el3.nextSibling).is.not.ok
  })

  it('insertBefore', () => {
    doc.createBody('r')
    doc.documentElement.appendChild(doc.body)
    doc.body.appendChild(el)
    expect(el.parentNode.ref).eql(doc.body.ref)

    el.appendChild(el2)
    expect(el2.parentNode.ref).eql(el.ref)
    expect(el.children.length).eql(1)
    expect(el.children[0]).equal(el2)

    el.insertBefore(el3, el2)
    expect(el.children.length).eql(2)
    expect(el.children[0]).equal(el3)
    expect(el.children[1]).equal(el2)
    expect(el3.parentNode.ref).eql(el.ref)

    expect(el.docId).eql('foo')
    expect(el2.docId).eql('foo')
    expect(el3.docId).eql('foo')

    expect(el3.previousSibling).is.not.ok
    expect(el3.nextSibling).eql(el2)
    expect(el2.previousSibling).eql(el3)
    expect(el2.nextSibling).is.not.ok

    el.insertBefore(el2, el3)
    expect(el.children.length).eql(2)
    expect(el.children[0]).equal(el2)
    expect(el.children[1]).equal(el3)

    expect(el.docId).eql('foo')
    expect(el2.docId).eql('foo')
    expect(el3.docId).eql('foo')

    expect(el2.previousSibling).is.not.ok
    expect(el2.nextSibling).eql(el3)
    expect(el3.previousSibling).eql(el2)
    expect(el3.nextSibling).is.not.ok
  })

  it('insertAfter', () => {
    doc.createBody('r')
    doc.documentElement.appendChild(doc.body)
    doc.body.appendChild(el)
    expect(el.parentNode.ref).eql(doc.body.ref)

    el.appendChild(el2)
    el.insertAfter(el3, el2)
    expect(el.children.length).eql(2)
    expect(el.children[0]).equal(el2)
    expect(el.children[1]).equal(el3)
    expect(el2.parentNode.ref).eql(el.ref)
    expect(el3.parentNode.ref).eql(el.ref)

    expect(el.docId).eql('foo')
    expect(el2.docId).eql('foo')
    expect(el3.docId).eql('foo')

    expect(el2.previousSibling).is.not.ok
    expect(el2.nextSibling).eql(el3)
    expect(el3.previousSibling).eql(el2)
    expect(el3.nextSibling).is.not.ok

    el.insertAfter(el2, el3, true)
    expect(el.children.length).eql(2)
    expect(el.children[0]).equal(el3)
    expect(el.children[1]).equal(el2)

    expect(el3.previousSibling).is.not.ok
    expect(el3.nextSibling).eql(el2)
    expect(el2.previousSibling).eql(el3)
    expect(el2.nextSibling).is.not.ok
  })

  it('removeChild', () => {
    doc.createBody('r')
    doc.documentElement.appendChild(doc.body)
    doc.body.appendChild(el)
    doc.body.appendChild(el2)
    el2.appendChild(el3)

    expect(el.docId).eql('foo')
    expect(el2.docId).eql('foo')
    expect(el3.docId).eql('foo')
    doc.body.removeChild(el)
    expect(doc.body.children.length).equal(1)
    expect(doc.body.children[0]).equal(el2)
    expect(el.docId).is.not.ok
    expect(el2.docId).eql('foo')
    expect(el3.docId).eql('foo')
    doc.body.removeChild(el2)
    expect(doc.body.children.length).equal(0)
    expect(el.docId).is.not.ok
    expect(el2.docId).is.not.ok
    expect(el3.docId).is.not.ok
  })

  it('clear', () => {
    doc.createBody('r')
    doc.documentElement.appendChild(doc.body)
    doc.body.appendChild(el)
    doc.body.appendChild(el2)
    doc.body.appendChild(el3)

    expect(el.docId).eql('foo')
    expect(el2.docId).eql('foo')
    expect(el3.docId).eql('foo')

    doc.body.clear()
    expect(doc.body.children.length).equal(0)
    expect(el.docId).is.not.ok
    expect(el2.docId).is.not.ok
    expect(el3.docId).is.not.ok
  })

  it('modify attr, style, event', () => {
    doc.createBody('r')
    doc.documentElement.appendChild(doc.body)
    doc.body.appendChild(el)

    el.setAttr('a', 21)
    expect(el.toJSON().attr).eql({ a: 21, b: 12 })
    el.setAttr('a', 22, true)
    expect(el.toJSON().attr).eql({ a: 22, b: 12 })
    el.setAttr('a', 23, false)
    expect(el.toJSON().attr).eql({ a: 23, b: 12 })

    el.setStyle('c', 21)
    expect(el.toJSON().style).eql({ a: 211, c: 21, d: 14 })
    el.setStyle('c', 22, true)
    expect(el.toJSON().style).eql({ a: 211, c: 22, d: 14 })
    el.setStyle('c', 23, false)
    expect(el.toJSON().style).eql({ a: 211, c: 23, d: 14 })

    el.setClassStyle({ a: 311, c: 313 })
    expect(el.toJSON().style).eql({ a: 311, c: 23, d: 14 })

    const handler = function () {}
    el.addEvent('click', handler)
    expect(el.toJSON().event).eql(['click'])
    expect(el.event.click).equal(handler)
    el.removeEvent('click')
    expect(el.event.click).is.undefined
  })
})

describe('Node', () => {
  let doc, el, el2, el3, c, c2, c3, spy

  beforeEach(() => {
    spy = sinon.spy()
    doc = new Document('foo', '', spy)
    doc.createBody('r')
    doc.documentElement.appendChild(doc.body)
    el = new Element('bar')
    el2 = new Element('baz')
    el3 = new Element('qux')
    c = new Comment('aaa')
    c2 = new Comment('bbb')
    c3 = new Comment('ccc')
  })

  afterEach(() => {
    doc.destroy()
  })

  it('prev and next', () => {
    expect(el.previousSibling).is.not.ok
    expect(el.nextSibling).is.not.ok

    doc.body.appendChild(el)
    doc.body.appendChild(el2)
    doc.body.appendChild(c)
    doc.body.appendChild(el3)
    doc.body.appendChild(c2)
    doc.body.appendChild(c3)

    expect(el.previousSibling).is.not.ok
    expect(el2.previousSibling).equal(el)
    expect(c.previousSibling).equal(el2)
    expect(el3.previousSibling).equal(c)
    expect(c2.previousSibling).equal(el3)
    expect(c3.previousSibling).equal(c2)

    expect(el.nextSibling).equal(el2)
    expect(el2.nextSibling).equal(c)
    expect(c.nextSibling).equal(el3)
    expect(el3.nextSibling).equal(c2)
    expect(c2.nextSibling).equal(c3)
    expect(c3.nextSibling).is.not.ok
  })

  it('tree operations with renderer', () => {
    doc.body.appendChild(el)
    el.appendChild(el2)
    el.appendChild(el3)

    expect(spy.args.length).eql(4)
    el.insertBefore(el3, el2) // [el3, el2]
    expect(spy.args.length).eql(5)
    expect(spy.args[4][0]).eql([{
      module: 'dom', method: 'moveElement',
      args: [el3.ref, el.ref, 0]
    }])
    el.insertAfter(el3, el2) // [el2, el3]
    expect(spy.args.length).eql(6)
    expect(spy.args[5][0]).eql([{
      module: 'dom', method: 'moveElement',
      args: [el3.ref, el.ref, 2]
    }])
    el.removeChild(el2) // [el3]
    expect(spy.args.length).eql(7)
    expect(spy.args[6][0]).eql([{
      module: 'dom', method: 'removeElement',
      args: [el2.ref]
    }])
    el.clear() // []
    expect(spy.args.length).eql(8)
    expect(spy.args[7][0]).eql([{
      module: 'dom', method: 'removeElement',
      args: [el3.ref]
    }])
  })
})

describe('complicated situations', () => {
  let doc, el, el2, el3, c, c2, c3, spy

  beforeEach(() => {
    spy = sinon.spy()
    doc = new Document('foo', '', spy)
    doc.createBody('r')
    doc.documentElement.appendChild(doc.body)
    el = new Element('bar')
    el2 = new Element('baz')
    el3 = new Element('qux')
    c = new Comment('aaa')
    c2 = new Comment('bbb')
    c3 = new Comment('ccc')
  })

  afterEach(() => {
    doc.destroy()
  })

  it('move a node to its original position', () => {
    doc.body.appendChild(el)
    doc.body.appendChild(el2)
    doc.body.appendChild(el3)

    expect(spy.args.length).eql(4)
    expect(doc.body.children).eql([el, el2, el3])
    expect(doc.body.pureChildren).eql([el, el2, el3])

    doc.body.insertAfter(el2, el)
    expect(spy.args.length).eql(4)
    expect(doc.body.children).eql([el, el2, el3])
    expect(doc.body.pureChildren).eql([el, el2, el3])

    doc.body.insertAfter(el3, el2, true)
    expect(spy.args.length).eql(4)
    expect(doc.body.children).eql([el, el2, el3])
    expect(doc.body.pureChildren).eql([el, el2, el3])

    doc.body.insertBefore(el, el2)
    expect(spy.args.length).eql(4)
    expect(doc.body.children).eql([el, el2, el3])
    expect(doc.body.pureChildren).eql([el, el2, el3])

    doc.body.insertBefore(el2, el3, true)
    expect(spy.args.length).eql(4)
    expect(doc.body.children).eql([el, el2, el3])
    expect(doc.body.pureChildren).eql([el, el2, el3])

    doc.body.insertAfter(c, el)
    doc.body.insertAfter(c2, el2)
    doc.body.insertAfter(c3, el3)
    expect(spy.args.length).eql(4)
    expect(doc.body.children).eql([el, c, el2, c2, el3, c3])
    expect(doc.body.pureChildren).eql([el, el2, el3])

    doc.body.insertBefore(el, c)
    doc.body.insertBefore(el, c, true)
    doc.body.insertBefore(c, el2)
    doc.body.insertBefore(c, el2, true)
    doc.body.insertAfter(c, el)
    doc.body.insertAfter(c, el, true)
    doc.body.insertAfter(el2, c)
    doc.body.insertAfter(el2, c, true)
    expect(spy.args.length).eql(4)
    expect(doc.body.children).eql([el, c, el2, c2, el3, c3])
    expect(doc.body.pureChildren).eql([el, el2, el3])

    // move to another place that not change the pureChildren
    doc.body.insertBefore(el, el2)
    expect(spy.args.length).eql(4)
    expect(doc.body.children).eql([c, el, el2, c2, el3, c3])
    expect(doc.body.pureChildren).eql([el, el2, el3])

    doc.body.insertBefore(el, c)
    expect(spy.args.length).eql(4)
    expect(doc.body.children).eql([el, c, el2, c2, el3, c3])
    expect(doc.body.pureChildren).eql([el, el2, el3])

    doc.body.insertAfter(c, el2)
    expect(spy.args.length).eql(4)
    expect(doc.body.children).eql([el, el2, c, c2, el3, c3])
    expect(doc.body.pureChildren).eql([el, el2, el3])

    doc.body.insertBefore(c2, c)
    expect(spy.args.length).eql(4)
    expect(doc.body.children).eql([el, el2, c2, c, el3, c3])
    expect(doc.body.pureChildren).eql([el, el2, el3])
  })

  it.skip('move a node from another parent', () => {
    doc.body.appendChild(el)
    el.appendChild(el2)
    el.appendChild(el3)
    expect(doc.body.children).eql([el])
    expect(el.children).eql([el2, el3])

    doc.body.insertBefore(el2, el)
    expect(doc.body.children).eql([el2, el])
    expect(doc.body.pureChildren).eql([el2, el])
    expect(el.children).eql([el3])
    expect(el.pureChildren).eql([el3])

    doc.body.insertAfter(el3, el)
    expect(doc.body.children).eql([el2, el, el3])
    expect(doc.body.pureChildren).eql([el2, el, el3])
    expect(el.children).eql([])
    expect(el.pureChildren).eql([])
  })

  it('insert before a comment', () => {
    doc.body.appendChild(el)
    doc.body.appendChild(c)
    doc.body.appendChild(c2)
    doc.body.appendChild(el2)
    expect(spy.args.length).eql(3)
    expect(doc.body.children).eql([el, c, c2, el2])
    expect(doc.body.pureChildren).eql([el, el2])

    doc.body.insertBefore(el3, c)
    expect(spy.args.length).eql(4)
    expect(doc.body.children).eql([el, el3, c, c2, el2])
    expect(doc.body.pureChildren).eql([el, el3, el2])
    expect(spy.args[3][0]).eql([{
      module: 'dom', method: 'addElement',
      args: [doc.body.ref, el3.toJSON(), 1] }])
  })

  it('insert before a comment which has no more element after', () => {
    doc.body.appendChild(el)
    doc.body.appendChild(el2)
    doc.body.appendChild(c)
    doc.body.appendChild(c2)
    expect(spy.args.length).eql(3)
    expect(doc.body.children).eql([el, el2, c, c2])
    expect(doc.body.pureChildren).eql([el, el2])

    doc.body.insertBefore(el3, c)
    expect(spy.args.length).eql(4)
    expect(doc.body.children).eql([el, el2, el3, c, c2])
    expect(doc.body.pureChildren).eql([el, el2, el3])
    expect(spy.args[3][0]).eql([{
      module: 'dom', method: 'addElement',
      args: [doc.body.ref, el3.toJSON(), 2] }])
  })

  it('insert after a comment', () => {
    doc.body.appendChild(el)
    doc.body.appendChild(c)
    doc.body.appendChild(c2)
    doc.body.appendChild(el2)
    expect(spy.args.length).eql(3)
    expect(doc.body.children).eql([el, c, c2, el2])
    expect(doc.body.pureChildren).eql([el, el2])

    doc.body.insertAfter(el3, c2)
    expect(spy.args.length).eql(4)
    expect(doc.body.children).eql([el, c, c2, el3, el2])
    expect(doc.body.pureChildren).eql([el, el3, el2])
    expect(spy.args[3][0]).eql([{
      module: 'dom', method: 'addElement',
      args: [doc.body.ref, el3.toJSON(), 1] }])
  })

  it('insert after a comment which has no more element before', () => {
    doc.body.appendChild(c)
    doc.body.appendChild(c2)
    doc.body.appendChild(el)
    doc.body.appendChild(el2)
    expect(spy.args.length).eql(3)
    expect(doc.body.children).eql([c, c2, el, el2])
    expect(doc.body.pureChildren).eql([el, el2])

    doc.body.insertAfter(el3, c2)
    expect(spy.args.length).eql(4)
    expect(doc.body.children).eql([c, c2, el3, el, el2])
    expect(doc.body.pureChildren).eql([el3, el, el2])
    expect(spy.args[3][0]).eql([{
      module: 'dom', method: 'addElement',
      args: [doc.body.ref, el3.toJSON(), 0] }])
  })
})
