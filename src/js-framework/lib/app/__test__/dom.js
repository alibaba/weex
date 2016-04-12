import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
const expect = chai.expect
chai.use(sinonChai)

import {
  instanceMap,
  Document, destroyDocument,
  Node, Element, Comment
} from '../dom'
import Listener from '../dom-listener'
import EventManager from '../event'

describe('document constructor', () => {

  it('create & destroy document', () => {
    const doc = new Document('foo')
    expect(doc).is.an.object
    expect(doc.id).eql('foo')
    expect(instanceMap.foo).equal(doc)
    expect(doc.documentElement).is.an.object
    expect(doc.documentElement.ref).is.be.equal('_documentElement')
    destroyDocument('foo')
    expect(instanceMap.foo).is.undefined
  })
})

describe('document methods', () => {
  let doc

  beforeEach(() => {
    doc = new Document('foo')
  })

  afterEach(() => {
    destroyDocument('foo')
  })

  it('open & close with a listener', () => {
    const listener = new Listener('bar')
    doc.setListener(listener)
    expect(listener.batched).is.false
    doc.close()
    expect(listener.batched).is.true
    doc.open()
    expect(listener.batched).is.false
  })

  it('create body', () => {
    const ele = doc.createBody('container',
      {attr: {id: 'a'}, style: {fontSize: 16}})
    expect(ele.attr).to.have.a.property('id', 'a')
    expect(ele.style).to.have.a.property('fontSize', 16)
    expect(ele).have.a.property('ref')
    expect(ele).have.a.property('parentRef')
    expect(ele).have.a.property('insertBefore')
    expect(ele).have.a.property('setStyle')

    const ref = ele.ref
    expect(doc.getRef(ref)).equal(ele)
  })

  it('create element', () => {
    const ele = doc.createElement('container',
      {attr: {id: 'a'}, style: {fontSize: 16}})
    expect(ele.attr).to.have.a.property('id', 'a')
    expect(ele.style).to.have.a.property('fontSize', 16)
    expect(ele).have.a.property('ref')
    expect(ele).have.a.property('parentRef')
    expect(ele).have.a.property('insertBefore')
    expect(ele).have.a.property('setStyle')

    const ref = ele.ref
    expect(doc.getRef(ref)).equal(ele)
  })

  it('create comment', () => {
    const comment = doc.createComment('start')
    expect(comment).have.a.property('ref')
    expect(comment).not.have.a.property('appendChild')
    expect(comment).have.a.property('value', 'start')
    expect(comment.toString()).eql('<!-- start -->')

    const ref = comment.ref
    expect(doc.getRef(ref)).equal(comment)
  })
})

describe('Element', () => {
  let doc, el, el2, el3

  beforeEach(() => {
    doc = new Document('foo')
    el = new Element('bar', {
      attr: {a: 11, b: 12},
      style: {c: 13, d: 14},
      classStyle: {a: 211, c: 213}
    }, doc)
    el2 = new Element('baz', {
      attr: {a: 21, b: 22},
      style: {c: 23, d: 24},
      classStyle: {a: 221, c: 223}
    }, doc)
    el3 = new Element('qux', {
      attr: {a: 31, b: 32},
      style: {c: 33, d: 34},
      classStyle: {a: 231, c: 233}
    }, doc)
  })

  afterEach(() => {
    destroyDocument('foo')
  })

  it('init correctly', () => {
    expect(el).is.an.object
    expect(el.type).eql('bar')
    expect(el.attr).eql({a: 11, b: 12})
    expect(el.style).eql({c: 13, d: 14})
    expect(el.event).eql([])
    expect(el.children).eql([])
    expect(el.pureChildren).eql([])
    expect(doc.nodeMap).is.an.object
    expect(Object.keys(doc.nodeMap)).is.an.array
    expect(Object.keys(doc.nodeMap)).is.contain
      .any.keys(['_documentElement', el.ref, el2.ref, el3.ref])
    expect(doc.documentElement).is.an.object
    expect(doc.documentElement.ref).to.be.equal('_documentElement')
  })

  it('has correct exports', () => {
    const ref = el.ref
    const finalStyle = el.toStyle()
    expect(finalStyle).eql({a: 211, c: 13, d: 14})
    expect(el.toJSON()).eql({
      ref: ref, type: 'bar',
      attr: el.attr, style: finalStyle
    })
    expect(el.toString()).eql(
      '<bar attr={"a":11,"b":12} style={"a":211,"c":13,"d":14}></bar>')
  })

  it('createBody', () => {
    doc.createBody('r')
    expect(doc.body).is.an.object
    expect(doc.body.ref).eql('_root')
    expect(doc.body.type).eql('r')
    expect(doc.body.attached).is.false
  })

  it('appendChild', () => {
    el.appendChild(el2)
    expect(el.children.length).eql(1)
    expect(el.children[0]).equal(el2)
    expect(el2.parentRef).eql(el.ref)

    expect(el.attached).is.false
    expect(el2.attached).is.false

    doc.createBody('r')
    doc.documentElement.appendChild(doc.body)
    doc.body.appendChild(el)
    expect(doc.body.children.length).eql(1)
    expect(el.parentRef).eql(doc.body.ref)
    expect(el.attached).is.true
    expect(el2.attached).is.true

    expect(el3.attached).is.false
    el.appendChild(el3)
    expect(el.children.length).eql(2)
    expect(el.children[0]).equal(el2)
    expect(el.children[1]).equal(el3)
    expect(el3.parentRef).eql(el.ref)
    expect(el3.attached).is.true

    expect(el2.prev()).is.not.ok
    expect(el2.next()).eql(el3)
    expect(el3.prev()).eql(el2)
    expect(el3.next()).is.not.ok
  })

  it('insertBefore', () => {
    doc.createBody('r')
    doc.documentElement.appendChild(doc.body)
    doc.body.appendChild(el)
    expect(el.parentRef).eql(doc.body.ref)

    el.appendChild(el2)
    expect(el2.parentRef).eql(el.ref)

    el.insertBefore(el3, el2)
    expect(el.children.length).eql(2)
    expect(el.children[0]).equal(el3)
    expect(el.children[1]).equal(el2)
    expect(el3.parentRef).eql(el.ref)

    expect(el.attached).is.true
    expect(el2.attached).is.true
    expect(el3.attached).is.true

    expect(el3.prev()).is.not.ok
    expect(el3.next()).eql(el2)
    expect(el2.prev()).eql(el3)
    expect(el2.next()).is.not.ok

    el.insertBefore(el2, el3, true)
    expect(el.children.length).eql(2)
    expect(el.children[0]).equal(el2)
    expect(el.children[1]).equal(el3)

    expect(el.attached).is.true
    expect(el2.attached).is.true
    expect(el3.attached).is.true

    expect(el2.prev()).is.not.ok
    expect(el2.next()).eql(el3)
    expect(el3.prev()).eql(el2)
    expect(el3.next()).is.not.ok
  })

  it('insertAfter', () => {
    doc.createBody('r')
    doc.documentElement.appendChild(doc.body)
    doc.body.appendChild(el)
    expect(el.parentRef).eql(doc.body.ref)

    el.appendChild(el2)
    el.insertAfter(el3, el2)
    expect(el.children.length).eql(2)
    expect(el.children[0]).equal(el2)
    expect(el.children[1]).equal(el3)
    expect(el2.parentRef).eql(el.ref)
    expect(el3.parentRef).eql(el.ref)

    expect(el.attached).is.true
    expect(el2.attached).is.true
    expect(el3.attached).is.true

    expect(el2.prev()).is.not.ok
    expect(el2.next()).eql(el3)
    expect(el3.prev()).eql(el2)
    expect(el3.next()).is.not.ok

    el.insertAfter(el2, el3, true)
    expect(el.children.length).eql(2)
    expect(el.children[0]).equal(el3)
    expect(el.children[1]).equal(el2)

    expect(el3.prev()).is.not.ok
    expect(el3.next()).eql(el2)
    expect(el2.prev()).eql(el3)
    expect(el2.next()).is.not.ok
  })

  it('removeChild', () => {
    doc.createBody('r')
    doc.documentElement.appendChild(doc.body)
    doc.body.appendChild(el)
    doc.body.appendChild(el2)
    el2.appendChild(el3)

    expect(el.attached).is.true
    expect(el2.attached).is.true
    expect(el3.attached).is.true

    doc.body.removeChild(el)
    expect(doc.body.children.length).equal(1)
    expect(doc.body.children[0]).equal(el2)
    expect(el.attached).is.false
    expect(el2.attached).is.true
    expect(el3.attached).is.true

    doc.body.removeChild(el2)
    expect(doc.body.children.length).equal(0)
    expect(el.attached).is.false
    expect(el2.attached).is.false
    expect(el3.attached).is.false
  })

  it('clear', () => {
    doc.createBody('r')
    doc.documentElement.appendChild(doc.body)
    doc.body.appendChild(el)
    doc.body.appendChild(el2)
    doc.body.appendChild(el3)

    expect(el.attached).is.true
    expect(el2.attached).is.true
    expect(el3.attached).is.true

    doc.body.clear()
    expect(doc.body.children.length).equal(0)
    expect(el.attached).is.false
    expect(el2.attached).is.false
    expect(el3.attached).is.false
  })
})

describe('Node', () => {
  let doc, el, el2, el3, c, c2, c3

  beforeEach(() => {
    doc = new Document('foo')
    doc.createBody('r')
    doc.documentElement.appendChild(doc.body)
    el = new Element('bar', null, doc)
    el2 = new Element('baz', null, doc)
    el3 = new Element('qux', null, doc)
    c = new Comment('aaa', doc)
    c2 = new Comment('bbb', doc)
    c3 = new Comment('ccc', doc)
  })

  afterEach(() => {
    destroyDocument('foo')
  })

  it('prev and next', () => {
    expect(el.prev()).is.not.ok
    expect(el.next()).is.not.ok

    doc.body.appendChild(el)
    doc.body.appendChild(el2)
    doc.body.appendChild(c)
    doc.body.appendChild(el3)
    doc.body.appendChild(c2)
    doc.body.appendChild(c3)

    expect(el.prev()).is.not.ok
    expect(el2.prev()).equal(el)
    expect(c.prev()).equal(el2)
    expect(el3.prev()).equal(c)
    expect(c2.prev()).equal(el3)
    expect(c3.prev()).equal(c2)

    expect(el.next()).equal(el2)
    expect(el2.next()).equal(c)
    expect(c.next()).equal(el3)
    expect(el3.next()).equal(c2)
    expect(c2.next()).equal(c3)
    expect(c3.next()).is.not.ok
  })

  it('tree operations with renderer', () => {
    const spy = sinon.spy()
    const listener = new Listener('bar', spy)
    doc.setListener(listener)

    doc.body.appendChild(el)
    el.appendChild(el2)
    el.appendChild(el3)

    expect(spy.args.length).eql(3)
    el.insertBefore(el3, el2, true) // [el3, el2]
    expect(spy.args.length).eql(4)
    expect(spy.args[3][0]).eql([{
      module: 'dom', method: 'moveElement',
      args: [el3.ref, el.ref, 0]
    }])
    el.insertAfter(el3, el2, true) // [el2, el3]
    expect(spy.args.length).eql(5)
    expect(spy.args[4][0]).eql([{
      module: 'dom', method: 'moveElement',
      args: [el3.ref, el.ref, 2]
    }])
    el.removeChild(el2) // [el3]
    expect(spy.args.length).eql(6)
    expect(spy.args[5][0]).eql([{
      module: 'dom', method: 'removeElement',
      args: [el2.ref]
    }])
    el.clear() // []
    expect(spy.args.length).eql(7)
    expect(spy.args[6][0]).eql([{
      module: 'dom', method: 'removeElement',
      args: [el3.ref]
    }])
  })
})

describe('complicated situations', () => {
  let doc, el, el2, el3, c, c2, c3, listener, spy

  beforeEach(() => {
    doc = new Document('foo')
    doc.createBody('r')
    doc.documentElement.appendChild(doc.body)
    el = new Element('bar', null, doc)
    el2 = new Element('baz', null, doc)
    el3 = new Element('qux', null, doc)
    c = new Comment('aaa', doc)
    c2 = new Comment('bbb', doc)
    c3 = new Comment('ccc', doc)
    spy = sinon.spy()
    listener = new Listener('bar', spy)
    doc.setListener(listener)
  })

  afterEach(() => {
    destroyDocument('foo')
  })

  it('move a node to its original position', () => {
    doc.body.appendChild(el)
    doc.body.appendChild(el2)
    doc.body.appendChild(el3)
    expect(spy.args.length).eql(3)
    expect(doc.body.children).eql([el, el2, el3])
    expect(doc.body.pureChildren).eql([el, el2, el3])

    doc.body.insertAfter(el2, el)
    expect(spy.args.length).eql(3)
    expect(doc.body.children).eql([el, el2, el3])
    expect(doc.body.pureChildren).eql([el, el2, el3])

    doc.body.insertAfter(el3, el2, true)
    expect(spy.args.length).eql(3)
    expect(doc.body.children).eql([el, el2, el3])
    expect(doc.body.pureChildren).eql([el, el2, el3])

    doc.body.insertBefore(el, el2)
    expect(spy.args.length).eql(3)
    expect(doc.body.children).eql([el, el2, el3])
    expect(doc.body.pureChildren).eql([el, el2, el3])

    doc.body.insertBefore(el2, el3, true)
    expect(spy.args.length).eql(3)
    expect(doc.body.children).eql([el, el2, el3])
    expect(doc.body.pureChildren).eql([el, el2, el3])

    doc.body.insertAfter(c, el)
    doc.body.insertAfter(c2, el2)
    doc.body.insertAfter(c3, el3)
    expect(spy.args.length).eql(3)
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
    expect(spy.args.length).eql(3)
    expect(doc.body.children).eql([el, c, el2, c2, el3, c3])
    expect(doc.body.pureChildren).eql([el, el2, el3])

    // move to another place that not change the pureChildren
    doc.body.insertBefore(el, el2)
    expect(spy.args.length).eql(3)
    expect(doc.body.children).eql([c, el, el2, c2, el3, c3])
    expect(doc.body.pureChildren).eql([el, el2, el3])

    doc.body.insertBefore(el, c)
    expect(spy.args.length).eql(3)
    expect(doc.body.children).eql([el, c, el2, c2, el3, c3])
    expect(doc.body.pureChildren).eql([el, el2, el3])

    doc.body.insertAfter(c, el2)
    expect(spy.args.length).eql(3)
    expect(doc.body.children).eql([el, el2, c, c2, el3, c3])
    expect(doc.body.pureChildren).eql([el, el2, el3])

    doc.body.insertBefore(c2, c)
    expect(spy.args.length).eql(3)
    expect(doc.body.children).eql([el, el2, c2, c, el3, c3])
    expect(doc.body.pureChildren).eql([el, el2, el3])
  })

  it('move a node from another parent', () => {
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
    expect(spy.args.length).eql(2)
    expect(doc.body.children).eql([el, c, c2, el2])
    expect(doc.body.pureChildren).eql([el, el2])

    doc.body.insertBefore(el3, c)
    expect(spy.args.length).eql(3)
    expect(doc.body.children).eql([el, el3, c, c2, el2])
    expect(doc.body.pureChildren).eql([el, el3, el2])
    expect(spy.args[2][0]).eql([{
      module: 'dom', method: 'addElement',
      args: ['_root', el3.toJSON(), 1]}])
  })

  it('insert before a comment which has no more element after', () => {
    doc.body.appendChild(el)
    doc.body.appendChild(el2)
    doc.body.appendChild(c)
    doc.body.appendChild(c2)
    expect(spy.args.length).eql(2)
    expect(doc.body.children).eql([el, el2, c, c2])
    expect(doc.body.pureChildren).eql([el, el2])

    doc.body.insertBefore(el3, c)
    expect(spy.args.length).eql(3)
    expect(doc.body.children).eql([el, el2, el3, c, c2])
    expect(doc.body.pureChildren).eql([el, el2, el3])
    expect(spy.args[2][0]).eql([{
      module: 'dom', method: 'addElement',
      args: ['_root', el3.toJSON(), 2]}])
  })

  it('insert after a comment', () => {
    doc.body.appendChild(el)
    doc.body.appendChild(c)
    doc.body.appendChild(c2)
    doc.body.appendChild(el2)
    expect(spy.args.length).eql(2)
    expect(doc.body.children).eql([el, c, c2, el2])
    expect(doc.body.pureChildren).eql([el, el2])

    doc.body.insertAfter(el3, c2)
    expect(spy.args.length).eql(3)
    expect(doc.body.children).eql([el, c, c2, el3, el2])
    expect(doc.body.pureChildren).eql([el, el3, el2])
    expect(spy.args[2][0]).eql([{
      module: 'dom', method: 'addElement',
      args: ['_root', el3.toJSON(), 1]}])
  })

  it('insert after a comment which has no more element before', () => {
    doc.body.appendChild(c)
    doc.body.appendChild(c2)
    doc.body.appendChild(el)
    doc.body.appendChild(el2)
    expect(spy.args.length).eql(2)
    expect(doc.body.children).eql([c, c2, el, el2])
    expect(doc.body.pureChildren).eql([el, el2])

    doc.body.insertAfter(el3, c2)
    expect(spy.args.length).eql(3)
    expect(doc.body.children).eql([c, c2, el3, el, el2])
    expect(doc.body.pureChildren).eql([el3, el, el2])
    expect(spy.args[2][0]).eql([{
      module: 'dom', method: 'addElement',
      args: ['_root', el3.toJSON(), 0]}])
  })
})
