import chai from 'chai'
const { expect } = chai

const _ = require('../../../../default/util')

describe('stringify sth.', function () {
  it('convert string to string', function () {
    expect(_.stringify('abcd')).eql('abcd')
    expect(_.stringify('ab\ncd')).eql('ab\ncd')
    expect(_.stringify('ab\\ncd')).eql('ab\\ncd')
  })
  it('convert number to string', function () {
    expect(_.stringify(123)).eql('123')
    expect(_.stringify(-123)).eql('-123')
    expect(_.stringify(123.456)).eql('123.456')
  })
  it('convert boolean to string', function () {
    expect(_.stringify(true)).eql('true')
    expect(_.stringify('true')).eql('true')
    expect(_.stringify(false)).eql('false')
    expect(_.stringify('false')).eql('false')
  })
  it('convert undefined to string', function () {
    expect(_.stringify()).eql('')
    expect(_.stringify(undefined)).eql('')
  })
  it('convert null to string', function () {
    expect(_.stringify(null)).eql('')
  })
  it('convert object to string', function () {
    expect(_.stringify({})).eql('{}')
    expect(_.stringify({ a: 1 })).eql('{"a":1}')
    expect(_.stringify({ a: [1, 2] })).eql('{"a":[1,2]}')
  })
  it('convert array to string', function () {
    expect(_.stringify(['a', 1, { b: 2 }])).eql('["a",1,{"b":2}]')
  })
  it('convert regexp to string', function () {
    expect(_.stringify(/abcd/)).eql('/abcd/')
    expect(_.stringify(/^abcd$/)).eql('/^abcd$/')
    expect(_.stringify(/abcd/i)).eql('/abcd/i')
  })
  it('convert date to string', function () {
    let d
    d = new Date(2015, 1, 1)
    expect(_.stringify(d)).eql(d.toJSON())
    d = new Date()
    expect(_.stringify(d)).eql(d.toJSON())
  })
  it('convert function to string', function () {
    // // jscs:disable
    // expect(_.stringify(function () {})).eql('function () {}')
    // expect(_.stringify(function() {})).eql('function () {}')
    // expect(_.stringify(function foo(a) {return a+1})).
    //   eql('function foo(a) {return a+1}')
    // expect(_.stringify(function foo(a) {return a + 1})).
    //   eql('function foo(a) {return a + 1}')
    // expect(_.stringify(function foo(a) {return a + 1;})).
    //   eql('function foo(a) {return a + 1;}')
    // // jscs:enable
  })
})
