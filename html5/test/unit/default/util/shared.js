import { expect } from 'chai'

import * as utils from '../../../../frameworks/legacy/util/shared'

describe('test util functions', () => {
  it('extend', () => {
    expect(typeof utils.extend).to.be.equal('function')

    const a = { name: 'A', a: true, c: true }
    const b = { name: 'B', b: true }
    utils.extend(a, b, { c: false })
    expect(a).to.be.deep.equal({ name: 'B', a: true, b: true, c: false })
    expect(b).to.be.deep.equal({ name: 'B', b: true })
  })

  it('def', () => {
    expect(typeof utils.def).to.be.equal('function')
    const obj = { type: 'none' }
    utils.def(obj, 'count', 42, false)

    expect(obj.hasOwnProperty('count')).to.be.true
    expect(obj.propertyIsEnumerable('count')).to.be.false
    expect(obj.type).to.be.equal('none')
    expect(obj.count).to.be.equal(42)
    obj.count = 24
    expect(obj.count).to.be.equal(24)
  })

  it('remove', () => {
    expect(typeof utils.remove).to.be.equal('function')

    const arr = ['first', null, 42, null, 28]
    const obj = { 0: 'first', 1: null, 2: 42 }

    utils.remove(arr, null)
    expect(arr).to.deep.equal(['first', 42, null, 28])
    utils.remove(arr, null)
    expect(arr).to.deep.equal(['first', 42, 28])
    utils.remove(arr, null)
    expect(arr).to.deep.equal(['first', 42, 28])
    utils.remove(arr, 42)
    expect(arr).to.deep.equal(['first', 28])

    utils.remove(obj, 42)
    expect(obj).to.deep.equal(obj)
  })

  it('hasOwn', () => {
    expect(typeof utils.hasOwn).to.be.equal('function')

    function Point () {
      this.x = 0
    }
    Point.prototype.y = 1

    const p = new Point()
    expect(p.x).to.be.equal(0)
    expect(p.y).to.be.equal(1)

    expect(utils.hasOwn(p, 'x')).to.be.true
    expect(utils.hasOwn(p, 'y')).to.be.false
  })

  it('bind', () => {
    expect(typeof utils.bind).to.be.equal('function')

    function who () {
      return this.name
    }
    const obj = { name: 'fixed' }
    const ctx = { name: 'changed' }
    const askWho = utils.bind(who, obj)

    expect(who()).to.be.undefined
    expect(askWho()).to.be.equal('fixed')
    expect(askWho.call(ctx)).to.be.equal('fixed')
    expect(askWho.apply(ctx)).to.be.equal('fixed')
    expect(who.apply(ctx)).to.be.equal('changed')
  })

  it('toArray', () => {
    expect(typeof utils.toArray).to.be.equal('function')
    const obj = { length: 2 }
    const arr = utils.toArray(obj)

    expect(arr).to.deep.equal([undefined, undefined])
    expect(arr.hasOwnProperty('0')).to.be.true
    expect(arr.hasOwnProperty('1')).to.be.true
    expect(arr.hasOwnProperty('2')).to.be.false

    const arrayLike = {
      0: 'empty',
      1: 'first',
      2: 'second',
      length: 3
    }
    expect(utils.toArray(arrayLike, 1)).to.deep.equal(['first', 'second'])
  })

  it('isObject', () => {
    expect(typeof utils.isObject).to.be.equal('function')
    expect(utils.isObject({})).to.be.true
    expect(utils.isObject([])).to.be.true
    expect(utils.isObject(new Date())).to.be.true
    expect(utils.isObject()).to.be.false
    expect(utils.isObject('')).to.be.false
    expect(utils.isObject(42)).to.be.false
    expect(utils.isObject(NaN)).to.be.false
    expect(utils.isObject(null)).to.be.false
    expect(utils.isObject(undefined)).to.be.false
  })

  it('isPlainObject', () => {
    expect(typeof utils.isPlainObject).to.be.equal('function')
    expect(utils.isPlainObject({})).to.be.true
    expect(utils.isPlainObject([])).to.be.false
    expect(utils.isPlainObject(new Date())).to.be.false
    expect(utils.isPlainObject()).to.be.false
    expect(utils.isPlainObject('')).to.be.false
    expect(utils.isPlainObject(42)).to.be.false
    expect(utils.isPlainObject(NaN)).to.be.false
    expect(utils.isPlainObject(null)).to.be.false
    expect(utils.isPlainObject(undefined)).to.be.false
  })
})
