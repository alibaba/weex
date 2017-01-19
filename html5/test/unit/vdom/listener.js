import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
const { expect } = chai
chai.use(sinonChai)

import { Document } from '../../../runtime/vdom'
import Listener from '../../../runtime/listener'

describe('dom listener basic', () => {
  it('works with no id', () => {
    const doc = new Document(null, null, null)
    doc.destroy()
  })

  it('works with no handler', () => {
    const oriCallNative = global.callNative
    const oriCallAddElement = global.callAddElement
    const oriDocumentHandler = Document.handler

    Document.handler = null
    global.callNative = function () { return -1 }
    global.callAddElement = function () { return -1 }

    const doc = new Document('foo1', null, null)
    doc.createBody('r')
    doc.documentElement.appendChild(doc.body)
    const el = doc.createElement('a')
    doc.body.appendChild(el)
    doc.destroy()

    global.callNative = oriCallNative
    global.callAddElement = oriCallAddElement
    Document.handler = oriDocumentHandler
  })

  it('works with an handler', () => {
    const doc = new Document('foo2', null, function () {})
    doc.createBody('r')
    doc.documentElement.appendChild(doc.body)
    doc.destroy()
  })

  it('works with an handler', () => {
    const doc = new Document('foo2', null, function () {})
    doc.createBody('r')
    doc.documentElement.appendChild(doc.body)
    doc.destroy()
  })
})

describe('dom listener details', () => {
  let doc, spy

  beforeEach(() => {
    spy = sinon.spy()
    doc = new Document('foo', '', spy, Listener)
  })

  afterEach(() => {
    doc.destroy()
  })

  it('create document again', (done) => {
    const documentElement = doc.createDocumentElement()

    expect(documentElement).eql(doc.documentElement)
    done()
  })

  it('create body', (done) => {
    const body = doc.createBody('r', {
      attr: { a: 1 }, style: { b: 2 }
    })

    doc.documentElement.appendChild(body)

    expect(spy.args.length).eql(1)
    expect(spy.args[0]).eql([[{
      module: 'dom', method: 'createBody',
      args: [{ type: 'r', ref: '_root', attr: { a: 1 }, style: { b: 2 }}]
    }], '-1'])
    done()
  })

  it('document appendChild', (done) => {
    const el = doc.createElement('father')
    const el2 = doc.createElement('child1')
    const el3 = doc.createElement('child2')

    el.appendChild(el2)
    el.appendChild(el3)

    doc.documentElement.appendChild(el)

    expect(doc.documentElement.children.length).eql(1)
    expect(doc.documentElement.children[0]).eql(el)

    done()
  })

  it('document insertBefore', (done) => {
    const body = doc.createBody('r', {
      attr: { a: 1 }, style: { b: 2 }
    })

    doc.documentElement.insertBefore(body)

    expect(spy.args.length).eql(1)
    expect(spy.args[0]).eql([[{
      module: 'dom', method: 'createBody',
      args: [{ type: 'r', ref: '_root', attr: { a: 1 }, style: { b: 2 }}]
    }], '-1'])
    done()
  })

  it('document insertBefore with comment', (done) => {
    const body = doc.createBody('r', {
      attr: { a: 1 }, style: { b: 2 }
    })
    const el = doc.createComment('asd')

    doc.documentElement.appendChild(el)
    doc.documentElement.insertBefore(body, el)

    expect(doc.documentElement.children.length).eql(2)
    expect(doc.documentElement.children[0]).eql(body)
    done()
  })

  it('document fireEvent with no element', (done) => {
    doc.fireEvent(null)
    done()
  })

  it('document fireEvent with domChanges', (done) => {
    const el = doc.createElement('el', {
      attr: { a: 1 }, style: { b: 2 }
    })

    doc.documentElement.appendChild(el)

    doc.fireEvent(el, null, null, {})

    expect(el.attr).eql({ a: 1 })
    expect(el.style).eql({ b: 2 })

    doc.fireEvent(el, null, null, {
      attrs: { a: 1 }, style: { b: 2 }
    })

    expect(el.attr).eql({ a: 1 })
    expect(el.style).eql({ b: 2 })

    doc.fireEvent(el, null, null, {
      attrs: { a: 2 }, style: { b: 3 }
    })

    expect(el.attr).eql({ a: 2 })
    expect(el.style).eql({ b: 3 })
    done()
  })

  it('toString has pureChildren', (done) => {
    const el = doc.createElement('el')
    const el1 = doc.createElement('el1')
    el.appendChild(el1)
    expect(el.toString()).eql('<el attr={} style={}><el1 attr={} style={}></el1></el>')

    done()
  })

  it('removeChild', (done) => {
    const el = doc.createElement('el')
    const el1 = doc.createElement('el1')

    el.removeChild(el1)
    el.removeChild(el1, true)

    done()
  })

  it('removeEvent', (done) => {
    const el = doc.createElement('el')
    el.removeEvent(null)
    done()
  })

  it('add element', (done) => {
    const body = doc.createBody('r')

    doc.documentElement.appendChild(body)

    expect(spy.args[0]).eql([[{
      module: 'dom', method: 'createBody',
      args: [body.toJSON()]
    }], '-1'])

    const el = doc.createElement('a')
    el.setAttr('x', 1)
    el.addEvent('click', () => {})
    doc.body.appendChild(el)

    expect(spy.args[1]).eql([[{
      module: 'dom', method: 'addElement',
      args: ['_root', el.toJSON(), -1]
    }], '-1'])

    const el2 = doc.createElement('b')
    doc.body.insertBefore(el2, el) // [el2, el]

    const el3 = doc.createElement('c')
    doc.body.insertAfter(el3, el) // [el2, el, el3]

    expect(spy.args.length).eql(4)
    expect(spy.args[2]).eql([[{
      module: 'dom', method: 'addElement',
      args: ['_root', el2.toJSON(), 0]
    }], '-1'])
    expect(spy.args[3]).eql([[{
      module: 'dom', method: 'addElement',
      args: ['_root', el3.toJSON(), 2]
    }], '-1'])

    done()
  })

  it.skip('batch when document closed', (done) => {
    const body = doc.createBody('r')

    doc.documentElement.appendChild(body)

    expect(spy.args[0]).eql([[{
      module: 'dom', method: 'createBody',
      args: [body.toJSON()]
    }]])

    const el = doc.createElement('a')
    el.setAttr('x', 1)
    el.addEvent('click', () => {})
    doc.body.appendChild(el)

    expect(spy.args[1]).eql([[{
      module: 'dom', method: 'addElement',
      args: ['_root', el.toJSON(), -1]
    }]])

    doc.close()

    const el2 = doc.createElement('b')
    doc.body.insertBefore(el2, el) // [el2, el]

    const el3 = doc.createElement('c')
    doc.body.insertAfter(el3, el) // [el2, el, el3]

    expect(spy.args.length).eql(2)
    expect(doc.listener.updates).eql([
      {
        module: 'dom', method: 'addElement',
        args: ['_root', el2.toJSON(), 0]
      },
      {
        module: 'dom', method: 'addElement',
        args: ['_root', el3.toJSON(), 2]
      }
    ])
    done()
  })

  it('bind listener for element props', () => {
    const el = doc.createElement('bar')
    doc.createBody('r')
    doc.documentElement.appendChild(doc.body)

    expect(spy.args.length).eql(1)
    expect(spy.args[0][0]).eql([{
      module: 'dom', method: 'createBody',
      args: [doc.body.toJSON()]
    }])

    el.setAttr('a', 1)
    el.setStyle('a', 2)
    el.setClassStyle({ a: 3, b: 4 })
    el.addEvent('click', () => {})
    el.addEvent('appear', () => {})
    el.removeEvent('appear')
    doc.body.appendChild(el)

    expect(spy.args.length).eql(2)
    expect(spy.args[1][0]).eql([{
      module: 'dom', method: 'addElement',
      args: ['_root', el.toJSON(), -1]
    }])

    el.setAttr('a', 11, true)
    expect(spy.args.length).eql(2)
    el.setAttr('a', 12)
    expect(spy.args.length).eql(3)
    expect(spy.args[2][0]).eql([{
      module: 'dom', method: 'updateAttrs',
      args: [el.ref, { a: 12 }]
    }])
    el.setAttr('a', 12, false)
    expect(spy.args.length).eql(4)
    expect(spy.args[3][0]).eql([{
      module: 'dom', method: 'updateAttrs',
      args: [el.ref, { a: 12 }]
    }])

    el.setStyle('a', 13, true)
    expect(spy.args.length).eql(4)
    el.setStyle('a', 14)
    expect(spy.args.length).eql(5)
    expect(spy.args[4][0]).eql([{
      module: 'dom', method: 'updateStyle',
      args: [el.ref, { a: 14 }]
    }])
    el.setStyle('a', 14, false)
    expect(spy.args.length).eql(6)
    expect(spy.args[5][0]).eql([{
      module: 'dom', method: 'updateStyle',
      args: [el.ref, { a: 14 }]
    }])

    el.setClassStyle({ a: 13, b: 14 })
    expect(spy.args[6][0]).eql([{
      module: 'dom', method: 'updateStyle',
      args: [el.ref, { a: 14, b: 14 }]
    }])
    expect(spy.args.length).eql(7)
    el.addEvent('click', () => {})
    expect(spy.args.length).eql(7)
    el.addEvent('appear', () => {})
    expect(spy.args.length).eql(8)
    expect(spy.args[7][0]).eql([{
      module: 'dom', method: 'addEvent',
      args: [el.ref, 'appear']
    }])

    el.removeEvent('click')
    expect(spy.args.length).eql(9)
    expect(spy.args[8][0]).eql([{
      module: 'dom', method: 'removeEvent',
      args: [el.ref, 'click']
    }])
    el.removeEvent('appear')
    expect(spy.args.length).eql(10)
    expect(spy.args[9][0]).eql([{
      module: 'dom', method: 'removeEvent',
      args: [el.ref, 'appear']
    }])

    el.setAttr('a', 1)
    el.setStyle('a', 2)
    el.setClassStyle({ a: 3, b: 4 })
    el.addEvent('click', () => {})
    el.addEvent('appear', () => {})
    el.removeEvent('appear')
    expect(spy.args.length).eql(16)
    expect(spy.args.slice(10).map(c => c[0][0])).eql([
      { module: 'dom', method: 'updateAttrs', args: [el.ref, { a: 1 }] },
      { module: 'dom', method: 'updateStyle', args: [el.ref, { a: 2 }] },
      { module: 'dom', method: 'updateStyle', args: [el.ref, { a: 2, b: 4 }] },
      { module: 'dom', method: 'addEvent', args: [el.ref, 'click'] },
      { module: 'dom', method: 'addEvent', args: [el.ref, 'appear'] },
      { module: 'dom', method: 'removeEvent', args: [el.ref, 'appear'] }
    ])
  })
})

describe('listener', () => {
  let spy, listener

  beforeEach(() => {
    spy = sinon.spy()
    listener = new Listener('1', spy)
  })

  it('removeElement many', () => {
    listener.removeElement(['1', '2', '3', '4'])

    expect(spy.args[0][0]).eql([
      { module: 'dom', method: 'removeElement', args: ['1'] },
      { module: 'dom', method: 'removeElement', args: ['2'] },
      { module: 'dom', method: 'removeElement', args: ['3'] },
      { module: 'dom', method: 'removeElement', args: ['4'] }
    ])

    listener = null
  })

  it('no-handler', () => {
    listener = new Listener('1')
    listener.handler(
      { module: 'dom', method: 'removeElement', args: ['1'] },
      spy
    )
    expect(spy).callCount(1)
  })

  afterEach(() => {
    spy = null
    listener = null
  })
})
