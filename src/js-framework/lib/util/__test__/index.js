import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
let expect = chai.expect
chai.use(sinonChai)

import * as util from '../index'

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
            let mockup = {
                '0': 1,
                '1': 2,
                '2': 3,
                length: 3
            }

            expect(util.toArray(mockup)).eql([1,2,3])
            expect(util.toArray(mockup, 2)).eql([3])
        })
    })

    describe('extend', () => {
        it('should be extend object', () => {
            let mockup = {
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

            expect(util.extend(mockup, { c: 5 }, {d: 6}, {e: 7})).eql({
                a: 1,
                b: 4,
                c: 5,
                d: 6,
                e: 7
            })
        })

        it('polyfill Object.assign', () => {
            let _assign = Object.assign
            Object.assign = undefined

            let mockup = {
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

            expect(util.extend(mockup, { c: 5 }, {d: 6}, {e: 7})).eql({
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
            expect(util.isObject(function(){})).eql(false)
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
            expect(util.isPlainObject(function(){})).eql(false)
            expect(util.isPlainObject(/\w*/)).eql(false)
            expect(util.isPlainObject(new Date())).eql(false)
        })
    })

    describe('isArray', () => {
        it('should be a array', () => {
            expect(util.isArray({})).eql(false)
            expect(util.isArray([])).eql(true)
            expect(util.isArray('a')).eql(false)
            expect(util.isArray(1)).eql(false)
            expect(util.isArray(true)).eql(false)
            expect(util.isArray(null)).eql(false)
            expect(util.isArray(undefined)).eql(false)
            expect(util.isArray(function(){})).eql(false)
            expect(util.isArray(/\w*/)).eql(false)
            expect(util.isArray(new Date())).eql(false)
        })
    })

    describe('stringify', () => {
        it('should be a string', () => {
            let date = new Date()

            expect(util.stringify({})).eql('{}')
            expect(util.stringify([])).eql('[]')
            expect(util.stringify('a')).eql('a')
            expect(util.stringify(1)).eql('1')
            expect(util.stringify(true)).eql('true')
            expect(util.stringify(null)).eql('')
            expect(util.stringify(undefined)).eql('')
            expect(util.stringify(function(){})).eql('')
            expect(util.stringify(/\w*/)).eql('/\\w*/')
            expect(util.stringify(date)).eql(date.toISOString())
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
            expect(util.typof(function(){})).eql('function')
            expect(util.typof(/\w*/)).eql('regexp')
            expect(util.typof(new Date())).eql('date')
        })
    })

    describe('normalize', () => {
        it('should be normalize', () => {
            let func = function() {}
            let date = new Date()

            expect(util.normalize({})).eql({})
            expect(util.normalize([])).eql([])
            expect(util.normalize('a')).eql('a')
            expect(util.normalize(1)).eql(1)
            expect(util.normalize(true)).eql(true)
            expect(util.normalize(null)).eql('')
            expect(util.normalize(undefined)).eql('')
            expect(util.normalize(func)).eql(func)
            expect(util.normalize(/\w*/)).eql('/\\w*/')
            expect(util.normalize(date)).eql(date.toISOString())
        })
    })

    describe('define', () => {
        it('should be define a non-enumerable property', () => {
            let obj = {}
            util.define(obj, 'a', 1, true)
            expect(obj).eql({a:1})

            util.define(obj, 'b', 1, false)
            expect(obj).eql({a:1})

            util.define(obj, 'c', 1, true)
            expect(obj).eql({a:1, c:1})

            util.define(obj, 'd', 1)
            expect(obj).eql({a:1, c:1})
        })
    })

    describe('indexOf', () => {
        it('should be manual indexOf because it\'s slightly faster than native', () => {
            let array = [1,2,3,4,5,6];
            expect(util.indexOf(array, 3)).eql(2)
        })
    })

    describe('log', () => {
        it('should be log a info prefix message', () => {
            let spy = sinon.spy(console.log)
            util.log('info message here')
            expect(spy.called).eql(false)

            let spy2 = sinon.spy(util, 'log')
            util.log('test')
            expect(spy2.called).eql(true)
        })
    })

    describe('warn', () => {
        it('should be log a warm prefix message', () => {
            let spy = sinon.stub(console, 'warn')
            util.warn('warn message')
            expect(spy.called).eql(true)
            expect(spy.firstCall.args).eql(['[warn]: ', 'warn message'])
        })
    })

    describe('stringify sth.', function () {
      it('convert string to string', function () {
        expect(util.stringify('abcd')).eql('abcd')
        expect(util.stringify('ab\ncd')).eql('ab\ncd')
        expect(util.stringify('ab\\ncd')).eql('ab\\ncd')
      })
      it('convert number to string', function () {
        expect(util.stringify(123)).eql('123')
        expect(util.stringify(-123)).eql('-123')
        expect(util.stringify(123.456)).eql('123.456')
      })
      it('convert boolean to string', function () {
        expect(util.stringify(true)).eql('true')
        expect(util.stringify('true')).eql('true')
        expect(util.stringify(false)).eql('false')
        expect(util.stringify('false')).eql('false')
      })
      it('convert undefined to string', function () {
        expect(util.stringify()).eql('')
        expect(util.stringify(undefined)).eql('')
      })
      it('convert null to string', function () {
        expect(util.stringify(null)).eql('')
      })
      it('convert object to string', function () {
        expect(util.stringify({})).eql('{}')
        expect(util.stringify({a: 1})).eql('{"a":1}')
        expect(util.stringify({a: [1, 2]})).eql('{"a":[1,2]}')
      })
      it('convert array to string', function () {
        expect(util.stringify(['a', 1, {b: 2}])).eql('["a",1,{"b":2}]')
      })
      it('convert regexp to string', function () {
        expect(util.stringify(/abcd/)).eql('/abcd/')
        expect(util.stringify(/^abcd$/)).eql('/^abcd$/')
        expect(util.stringify(/abcd/i)).eql('/abcd/i')
      })
      it('convert date to string', function () {
        var d
        d = new Date(2015, 1, 1)
        expect(util.stringify(d)).eql(d.toJSON())
        d = new Date()
        expect(util.stringify(d)).eql(d.toJSON())
      })
    })
})