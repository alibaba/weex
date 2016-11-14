import chai from 'chai'
const { expect } = chai

import * as util from '../../../../frameworks/legacy/util'

describe('Util', () => {
  describe('isReserved', () => {
    it('should be first char is $ or _', () => {
      expect(util.isReserved('$isReserved')).eql(true)
      expect(util.isReserved('_isReserved')).eql(true)
      expect(util.isReserved('isReserved$')).eql(false)
      expect(util.isReserved('is$Reserved')).eql(false)
      expect(util.isReserved('isReserved')).eql(false)
    })
  })

  describe('camelize', () => {
    it('should be camelize a hyphen-delmited string', () => {
      expect(util.camelize('mini-camelize')).eql('miniCamelize')
      expect(util.camelize('mini-camelize-test')).eql('miniCamelizeTest')
    })
  })

  describe('toArray', () => {
    it('should be convert an Array-like object to a real Array', () => {
      const mockup = {
        '0': 1,
        '1': 2,
        '2': 3,
        length: 3
      }

      expect(util.toArray(mockup)).eql([1, 2, 3])
      expect(util.toArray(mockup, 2)).eql([3])
    })
  })

  describe('extend', () => {
    it('should be extend object', () => {
      const mockup = {
        a: 1,
        b: 2
      }

      expect(util.extend(mockup, { b: 4, c: 5 })).eql({
        a: 1,
        b: 4,
        c: 5
      })

      expect(util.extend(mockup, { c: 5 })).eql({
        a: 1,
        b: 4,
        c: 5
      })

      expect(util.extend(mockup, { c: 5 }, { d: 6 }, { e: 7 })).eql({
        a: 1,
        b: 4,
        c: 5,
        d: 6,
        e: 7
      })
    })

    it('polyfill Object.assign', () => {
      const _assign = Object.assign
      Object.assign = undefined

      const mockup = {
        a: 1,
        b: 2
      }

      expect(util.extend(mockup, { b: 4, c: 5 })).eql({
        a: 1,
        b: 4,
        c: 5
      })

      expect(util.extend(mockup, { c: 5 })).eql({
        a: 1,
        b: 4,
        c: 5
      })

      expect(util.extend(mockup, { c: 5 }, { d: 6 }, { e: 7 })).eql({
        a: 1,
        b: 4,
        c: 5,
        d: 6,
        e: 7
      })

      Object.assign = _assign
    })
  })

  describe('isObject', () => {
    it('should be an array or object', () => {
      expect(util.isObject({})).eql(true)
      expect(util.isObject([])).eql(true)
      expect(util.isObject('a')).eql(false)
      expect(util.isObject(1)).eql(false)
      expect(util.isObject(true)).eql(false)
      expect(util.isObject(null)).eql(false)
      expect(util.isObject(undefined)).eql(false)
      expect(util.isObject(function () {})).eql(false)
      expect(util.isObject(/\w*/)).eql(true) // regexp is object
      expect(util.isObject(new Date())).eql(true)
    })
  })

  describe('isPlainObject', () => {
    it('should be an real object', () => {
      expect(util.isPlainObject({})).eql(true)
      expect(util.isPlainObject([])).eql(false)
      expect(util.isPlainObject('a')).eql(false)
      expect(util.isPlainObject(1)).eql(false)
      expect(util.isPlainObject(true)).eql(false)
      expect(util.isPlainObject(null)).eql(false)
      expect(util.isPlainObject(undefined)).eql(false)
      expect(util.isPlainObject(function () {})).eql(false)
      expect(util.isPlainObject(/\w*/)).eql(false)
      expect(util.isPlainObject(new Date())).eql(false)
    })
  })

  describe('typof', () => {
    it('should be real type', () => {
      expect(util.typof({})).eql('object')
      expect(util.typof([])).eql('array')
      expect(util.typof('a')).eql('string')
      expect(util.typof(1)).eql('number')
      expect(util.typof(true)).eql('boolean')
      expect(util.typof(null)).eql('null')
      expect(util.typof(undefined)).eql('undefined')
      expect(util.typof(function () {})).eql('function')
      expect(util.typof(/\w*/)).eql('regexp')
      expect(util.typof(new Date())).eql('date')
    })
  })

  describe('def', () => {
    it('should be define a non-enumerable property', () => {
      const obj = {}
      util.def(obj, 'a', 1, true)
      expect(obj).eql({ a: 1 })

      util.def(obj, 'b', 1, false)
      expect(obj).eql({ a: 1 })

      util.def(obj, 'c', 1, true)
      expect(obj).eql({ a: 1, c: 1 })

      util.def(obj, 'd', 1)
      expect(obj).eql({ a: 1, c: 1 })
    })
  })

  describe('hyphenate', () => {
    it('should hyphenate a camelCase string', () => {
      const str = 'helloWorldWeex'
      expect(util.hyphenate(str)).eql('hello-world-weex')
    })
  })
})
