import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
const { expect } = chai
chai.use(sinonChai)

global.callNative = function () {}

import { Document } from '../../../vdom'

global.callNative = function () {}

describe('dom listener basic', () => {
  it('works with no handler', () => {
    const doc = new Document('foo')
    doc.createBody('r')
    doc.documentElement.appendChild(doc.body)
    doc.destroy()
  })
})

describe('dom listener details', () => {
  let doc, spy

  beforeEach(() => {
    spy = sinon.spy()
    doc = new Document('foo', '', spy)
  })

  afterEach(() => {
    doc.destroy()
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
    }]])
    done()
  })

  it('add element', (done) => {
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

    const el2 = doc.createElement('b')
    doc.body.insertBefore(el2, el) // [el2, el]

    const el3 = doc.createElement('c')
    doc.body.insertAfter(el3, el) // [el2, el, el3]

    expect(spy.args.length).eql(4)
    expect(spy.args[2]).eql([[{
      module: 'dom', method: 'addElement',
      args: ['_root', el2.toJSON(), 0]
    }]])
    expect(spy.args[3]).eql([[{
      module: 'dom', method: 'addElement',
      args: ['_root', el3.toJSON(), 2]
    }]])

    done()
  })

  it('batch when document closed', (done) => {
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

    el.setAttr('a', 11)
    expect(spy.args.length).eql(3)
    expect(spy.args[2][0]).eql([{
      module: 'dom', method: 'updateAttrs',
      args: [el.ref, { a: 11 }]
    }])
    el.setStyle('a', 12)
    expect(spy.args.length).eql(4)
    expect(spy.args[3][0]).eql([{
      module: 'dom', method: 'updateStyle',
      args: [el.ref, { a: 12 }]
    }])
    el.setClassStyle({ a: 13, b: 14 })
    expect(spy.args[4][0]).eql([{
      module: 'dom', method: 'updateStyle',
      args: [el.ref, { a: 12, b: 14 }]
    }])
    expect(spy.args.length).eql(5)
    el.addEvent('click', () => {})
    expect(spy.args.length).eql(5)
    el.addEvent('appear', () => {})
    expect(spy.args.length).eql(6)
    expect(spy.args[5][0]).eql([{
      module: 'dom', method: 'addEvent',
      args: [el.ref, 'appear']
    }])
    el.removeEvent('click')
    expect(spy.args.length).eql(7)
    expect(spy.args[6][0]).eql([{
      module: 'dom', method: 'removeEvent',
      args: [el.ref, 'click']
    }])
    el.removeEvent('appear')
    expect(spy.args.length).eql(8)
    expect(spy.args[7][0]).eql([{
      module: 'dom', method: 'removeEvent',
      args: [el.ref, 'appear']
    }])

    doc.close()

    el.setAttr('a', 1)
    el.setStyle('a', 2)
    el.setClassStyle({ a: 3, b: 4 })
    el.addEvent('click', () => {})
    el.addEvent('appear', () => {})
    el.removeEvent('appear')
    expect(spy.args.length).eql(8)
    expect(doc.listener.updates).eql([
      { module: 'dom', method: 'updateAttrs', args: [el.ref, { a: 1 }] },
      { module: 'dom', method: 'updateStyle', args: [el.ref, { a: 2 }] },
      { module: 'dom', method: 'updateStyle', args: [el.ref, { a: 2, b: 4 }] },
      { module: 'dom', method: 'addEvent', args: [el.ref, 'click'] },
      { module: 'dom', method: 'addEvent', args: [el.ref, 'appear'] },
      { module: 'dom', method: 'removeEvent', args: [el.ref, 'appear'] }
    ])
  })
})
