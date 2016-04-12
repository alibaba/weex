var chai = require('chai')
var sinon = require('sinon')
var sinonChai = require('sinon-chai')
var expect = chai.expect
chai.use(sinonChai)

var config = require('../config')
var perf = require('../perf')

describe('@perf.js:record perf logs', function () {
  before(() => {
    config.debug = true
    sinon.stub(console, 'log')
    perf.reset()
  })

  after(() => {
    config.debug = false
    console.log.restore()
  })

  it('record perf start/end logs in order', function (done) {
    var testData = [
      {time: 0, action: 'start', type: 'click', id: 1},
      {time: 1, action: 'start', type: 'click', id: 2},
      {time: 2, action: 'end'},
      {time: 3, action: 'end'},
      {time: 4, action: 'start', type: 'click', id: 3},
      {time: 5, action: 'end'}
    ]

    testData.forEach(function (item) {
      setTimeout(function () {
        perf[item.action](item.type, item.id)
      }, item.time * 100)
    })

    setTimeout(function () {
      var data = perf.toJSON()

      expect(data.type).eql('root')
      expect(data.children).is.a('array')
      expect(data.children.length).eql(2)

      var task1 = data.children[0]
      expect(task1.type).eql('click')
      expect(task1.id).eql(1)
      expect(task1.children).is.a('array')
      expect(task1.children.length).eql(1)
      expect(Math.round((task1.end - task1.start) / 100)).eql(3)

      var task11 = task1.children[0]
      expect(task11.type).eql('click')
      expect(task11.id).eql(2)
      expect(task11.children).is.a('array')
      expect(task11.children.length).eql(0)
      expect(Math.round((task11.end - task11.start) / 100)).eql(1)

      var task2 = data.children[1]
      expect(task2.type).eql('click')
      expect(task2.id).eql(3)
      expect(task2.children).is.a('array')
      expect(task2.children.length).eql(0)
      expect(Math.round((task2.end - task2.start) / 100)).eql(1)

      done()
    }, 1000)
  })
})
