import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
const expect = chai.expect
chai.use(sinonChai)

import * as compiler from '../compiler.js'
import scope from '../instance/scope'

describe('generate workflow', () => {
  var contentIndex = 0
  var vm = {
    _generate: compiler._generate,
    _generateElement: compiler._generateElement,
    _setChildren: compiler._setChildren,
    _createBlock: function () {return {block: true}},
    _mergeContext: function () {return this},
    _createBody: type => {return {type}},
    _createElement: type => {return {type}},
    _attachTarget: (element, dest) => element,
    _bindElement: () => {},
    _setId: function () {},
    _bindSubVm: function () {},
    _bindSubVmAfterInitialized: function () {},
    _applyNaitveComponentOptions: function () {},
    _checkRepeat: function () {},
    _checkDisplay: function () {}
  }

  vm.constructor = function () {
    contentIndex++
    this._content = {index: contentIndex}
    this.$on = (type, cb) => {
      if (type === 'hook:ready') {
        cb()
      }
    }
  }

  beforeEach(() => {
    contentIndex = 0
    sinon.spy(vm, '_generate')
    sinon.spy(vm, '_generateElement')
    sinon.spy(vm, '_createBody')
    sinon.spy(vm, '_createElement')
    sinon.spy(vm, '_bindElement')
    sinon.spy(vm, '_attachTarget')
    sinon.spy(vm, '_createBlock')
    sinon.spy(vm, '_mergeContext')
    sinon.spy(vm, 'constructor')
  })

  afterEach(() => {
    vm._generate.restore()
    vm._generateElement.restore()
    vm._createBody.restore()
    vm._createElement.restore()
    vm._bindElement.restore()
    vm._attachTarget.restore()
    vm._createBlock.restore()
    vm._mergeContext.restore()
    vm.constructor.restore()
    contentIndex = 0
  })

  it('generate a body', (done) => {
    var template = {
      type: 'a'
    }
    var parentEl = {
      ref: '_documentElement'
    }
    var rootEl = {}

    function check() {
      expect(vm._generate).callCount(1)
      expect(vm._generate).calledWith(template, parentEl)
      expect(vm._createBody).callCount(1)
      expect(vm._bindElement).callCount(1)
      expect(vm._createElement).callCount(0)
      expect(vm._attachTarget).callCount(1)
      expect(vm._createBlock).callCount(0)
      expect(vm._mergeContext).callCount(0)
      expect(vm.constructor).callCount(0)
      done()
    }

    vm._generate(template, parentEl)
    check()
  })

  it('generate a single element', (done) => {
    var template = {
      type: 'a'
    }
    var parentEl = {}
    var rootEl = {}

    function check() {
      expect(vm._generate).callCount(1)
      expect(vm._generate).calledWith(template, parentEl)
      expect(vm._createBody).callCount(0)
      expect(vm._bindElement).callCount(1)
      expect(vm._createElement).callCount(1)
      expect(vm._attachTarget).callCount(1)
      expect(vm._createBlock).callCount(0)
      expect(vm._mergeContext).callCount(0)
      expect(vm.constructor).callCount(0)
      done()
    }

    vm._generate(template, parentEl)
    check()
  })

  it('generate some child nodes', (done) => {
    var template = [{
      type: 'a'
    }, {
      type: 'b'
    }]
    var parentEl = {}
    var rootEl = {}

    function check() {
      expect(vm._generate).callCount(3)
      expect(vm._generate.args[0]).eql(
        [template, parentEl])
      expect(vm._generate.args[1]).eql(
        [template[0], {block: true}, undefined])
      expect(vm._generate.args[2]).eql(
        [template[1], {block: true}, undefined])
      expect(vm._createBlock).callCount(1)
      expect(vm._mergeContext).callCount(0)
      expect(vm.constructor).callCount(0)
      done()
    }

    vm._generate(template, parentEl)
    check()
  })

  it('generate content holder', (done) => {
    var template = {
      type: 'a', children: [
        {type: 'b'},
        {type: 'content'},
        {type: 'c'}
      ]
    }
    var parentEl = {}
    var rootEl = {}

    function check() {
      expect(vm._generate).callCount(4)
      expect(vm._generate.args[0]).eql(
        [template, parentEl])
      expect(vm._generate.args[1]).eql(
        [template.children[0], {type: 'a'}])
      expect(vm._generate.args[2]).eql(
        [template.children[1], {type: 'a'}])
      expect(vm._generate.args[3]).eql(
        [template.children[2], {type: 'a'}])
      expect(vm._content).is.an.object
      expect(vm._content).eql({block: true})
      expect(vm._createBlock).callCount(1)
      expect(vm._mergeContext).callCount(0)
      expect(vm.constructor).callCount(0)
      done()
    }

    vm._generate(template, parentEl)
    check()
  })

  it('generate a repeat element', (done) => {
    var template = {
      type: 'a',
      repeat: () => [1, 2, 3]
    }
    var parentEl = {}
    var rootEl = {}
    var repeatVm = {
      block: true, children: [], data: [1, 2, 3]}

    function check() {
      expect(vm._generate).callCount(4)
      expect(vm._generate.args[0]).eql([template, parentEl])
      expect(vm._generate.args[1]).eql([template, repeatVm, {repeat: 1}])
      expect(vm._generate.args[2]).eql([template, repeatVm, {repeat: 2}])
      expect(vm._generate.args[3]).eql([template, repeatVm, {repeat: 3}])
      expect(vm._createBlock).callCount(1)
      expect(vm._mergeContext).callCount(3)
      expect(vm.constructor).callCount(0)
      done()
    }

    vm._generate(template, parentEl)
    check()
  })

  it('generate a shown element', (done) => {
    var template = {
      type: 'a',
      shown: () => true
    }
    var parentEl = {}
    var rootEl = {}

    function check() {
      expect(vm._generate).callCount(2)
      expect(vm._generate.args[0]).eql(
        [template, parentEl])
      expect(vm._generate.args[1]).eql(
        [template, {block: true, display: true}, {shown: true}])
      expect(vm._createBlock).callCount(1)
      expect(vm._mergeContext).callCount(0)
      expect(vm.constructor).callCount(0)
      done()
    }

    vm._generate(template, parentEl)
    check()
  })

  it('generate a repeat shown element', (done) => {
    var index = 0
    var template = {
      type: 'a',
      repeat: () => [1, 2, 3],
      shown: () => {
        index++
        return index % 2
      }
    }
    var parentEl = {}
    var rootEl = {}
    var repeatVm = {
      block: true, children: [], data: [1, 2, 3]}

    function check() {
      expect(vm._generate).callCount(6)
      expect(vm._generate.args[0]).eql([template, parentEl])
      expect(vm._generate.args[1]).eql([template, repeatVm, {repeat: 1}])
      expect(vm._generate.args[2]).eql(
        [template, {block: true, display: true}, {repeat: 1, shown: true}])
      expect(vm._generate.args[3]).eql([template, repeatVm, {repeat: 2}])
      expect(vm._generate.args[4]).eql([template, repeatVm, {repeat: 3}])
      expect(vm._generate.args[5]).eql(
        [template, {block: true, display: true}, {repeat: 3, shown: true}])
      expect(vm._createBlock).callCount(4)
      expect(vm._mergeContext).callCount(3)
      expect(vm.constructor).callCount(0)
      done()
    }

    vm._generate(template, parentEl)
    check()
  })

  it('generate an element with children', (done) => {
    var index = 0
    var template = {
      type: 'a',
      children: [{type: 'b'}, {type: 'c'}]
    }
    var parentEl = {}
    var rootEl = {}

    function check() {
      expect(vm._generate).callCount(3)
      expect(vm._generate.args[0]).eql([template, parentEl])
      expect(vm._generate.args[1]).eql([template.children[0], {type: 'a'}])
      expect(vm._generate.args[2]).eql([template.children[1], {type: 'a'}])
      expect(vm._createBlock).callCount(0)
      expect(vm._mergeContext).callCount(0)
      expect(vm.constructor).callCount(0)
      done()
    }

    vm._generate(template, parentEl)
    check()
  })

  it('generate an whole element with children', (done) => {
    var index = 0
    var template = {
      type: 'a',
      append: 'tree',
      children: [{type: 'b'}, {type: 'c'}]
    }
    var parentEl = {}
    var rootEl = {}

    function check() {
      expect(vm._generate).callCount(3)
      expect(vm._generate.args[0]).eql([template, parentEl])
      expect(vm._generate.args[1]).eql([template.children[0], {type: 'a'}])
      expect(vm._generate.args[2]).eql([template.children[1], {type: 'a'}])
      expect(vm._createBlock).callCount(0)
      expect(vm._mergeContext).callCount(0)
      expect(vm.constructor).callCount(0)
      done()
    }

    vm._generate(template, parentEl)
    check()
  })

  it('generate an element with repeat shown children', (done) => {
    var index = 0
    var template = {
      type: 'a',
      children: [
        {
          type: 'b',
          repeat: () => [1, 2, 3],
          shown: () => {
            index++
            return index % 2
          }
        },
        {type: 'c'}
      ]
    }
    var parentEl = {}
    var rootEl = {}
    var repeatVm = {
      block: true, children: [], data: [1, 2, 3]}

    function check() {
      expect(vm._generate).callCount(8)
      expect(vm._generate.args[0]).eql([template, parentEl])
      expect(vm._generate.args[1]).eql([template.children[0], {type: 'a'}])
      expect(vm._generate.args[2]).eql([template.children[0],
        repeatVm, {repeat: 1}])
      expect(vm._generate.args[3]).eql([template.children[0],
        {block: true, display: true}, {repeat: 1, shown: true}])
      expect(vm._generate.args[4]).eql([template.children[0],
        repeatVm, {repeat: 2}])
      expect(vm._generate.args[5]).eql([template.children[0],
        repeatVm, {repeat: 3}])
      expect(vm._generate.args[6]).eql([template.children[0],
        {block: true, display: true}, {repeat: 3, shown: true}])
      expect(vm._generate.args[7]).eql([template.children[1], {type: 'a'}])
      expect(vm._createBlock).callCount(4)
      expect(vm._mergeContext).callCount(3)
      expect(vm.constructor).callCount(0)
      done()
    }

    vm._generate(template, parentEl)
    check()
  })

  it('generate an element with repeat shown tree', (done) => {
    var index = 0
    var template = {
      type: 'a',
      children: [
        {
          type: 'b',
          children: [{type: 'c'}],
          repeat: () => [1, 2, 3],
          shown: function () {
            index++
            return index % 2
          }
        },
        {type: 'd'}
      ]
    }
    var parentEl = {}
    var rootEl = {}
    var repeatVm = {
      block: true, children: [], data: [1, 2, 3]}

    function check() {
      expect(vm._generate).callCount(10)
      expect(vm._generate.args[0]).eql([template, parentEl])
      expect(vm._generate.args[1]).eql([template.children[0], {type: 'a'}])
      expect(vm._generate.args[2]).eql([template.children[0],
        repeatVm, {repeat: 1}])
      expect(vm._generate.args[3]).eql([template.children[0],
        {block: true, display: true}, {repeat: 1, shown: true}])
      expect(vm._generate.args[4]).eql([template.children[0].children[0],
        {type: 'b'}])
      expect(vm._generate.args[5]).eql([template.children[0],
        repeatVm, {repeat: 2}])
      expect(vm._generate.args[6]).eql([template.children[0],
        repeatVm, {repeat: 3}])
      expect(vm._generate.args[7]).eql([template.children[0],
        {block: true, display: true}, {repeat: 3, shown: true}])
      expect(vm._generate.args[8]).eql([template.children[0].children[0],
        {type: 'b'}])
      expect(vm._generate.args[9]).eql([template.children[1], {type: 'a'}])
      expect(vm._createBlock).callCount(4)
      expect(vm._mergeContext).callCount(3)
      expect(vm.constructor).callCount(0)
      done()
    }

    vm._generate(template, parentEl)
    check()
  })

  it('generate an element with custom children', (done) => {
    var template = {
      type: 'a',
      children: [
        {type: 'b', component: true},
        {type: 'c'}
      ]
    }
    var parentEl = {}
    var rootEl = {}

    function check() {
      expect(vm._generate).callCount(3)
      expect(vm._generate.args[0]).eql([template, parentEl])
      expect(vm._generate.args[1]).eql([template.children[0], {type: 'a'}])
      expect(vm._generate.args[2]).eql([template.children[1], {type: 'a'}])
      expect(vm._createBlock).callCount(0)
      expect(vm._mergeContext).callCount(0)
      expect(vm.constructor).callCount(1)
      expect(vm.constructor.args[0][0]).eql('b')
      expect(vm.constructor.args[0][2]).eql({type: 'a'})
      done()
    }

    vm._generate(template, parentEl)
    check()
  })

  it('with custom repeat show children', (done) => {
    var index = 0
    var template = {
      type: 'a',
      children: [
        {
          type: 'b',
          component: true,
          repeat: () => [1, 2, 3],
          shown: function () {
            index++
            return index % 2
          }
        },
        {type: 'd'}
      ]
    }
    var parentEl = {}
    var rootEl = {}
    var repeatVm = {
      block: true, children: [], data: [1, 2, 3]}

    function check() {
      expect(vm._generate).callCount(8)
      expect(vm._generate.args[0]).eql([template, parentEl])
      expect(vm._generate.args[1]).eql([template.children[0], {type: 'a'}])
      expect(vm._generate.args[2]).eql([template.children[0],
        repeatVm, {repeat: 1}])
      expect(vm._generate.args[3]).eql([template.children[0],
        {block: true, display: true}, {repeat: 1, shown: true}])
      expect(vm._generate.args[4]).eql([template.children[0],
        repeatVm, {repeat: 2}])
      expect(vm._generate.args[5]).eql([template.children[0],
        repeatVm, {repeat: 3}])
      expect(vm._generate.args[6]).eql([template.children[0],
        {block: true, display: true}, {repeat: 3, shown: true}])
      expect(vm._generate.args[7]).eql([template.children[1], {type: 'a'}])
      expect(vm._createBlock).callCount(4)
      expect(vm._mergeContext).callCount(3)

      expect(vm.constructor).callCount(2)
      expect(vm.constructor.args[0][0]).eql('b')
      expect(vm.constructor.args[0][2]).eql({block: true, display: true})
      expect(vm.constructor.args[1][0]).eql('b')
      expect(vm.constructor.args[1][2]).eql({block: true, display: true})

      done()
    }

    vm._generate(template, parentEl)
    check()
  })
})

describe('merge context', () => {
  var vm

  beforeEach(() => {
    vm = {
      _data: {a: 1, b: 2},
      _mergeContext: compiler._mergeContext
    }
    Object.assign(vm, scope)
    vm._initScope()
  })

  afterEach(() => {
    vm = null
  })

  it('merge external data', () => {
    var context = vm._mergeContext({a: 3})
    expect(context).not.equal(vm)
    expect(context.a).eql(3)
    expect(context.b).eql(2)
  })

  it('react with changes, but not with internal for ext-key', () => {
    var context = vm._mergeContext({a: 3})
    vm.a = 4
    vm.b = 5
    expect(context.a).eql(3)
    expect(context.b).eql(5)
    context.a = 6
    expect(context.a).eql(6)
  })

  it('merge external data if key not bound', () => {
    var context = vm._mergeContext({c: 3})
    expect(context).not.equal(vm)
    expect(context.a).eql(1)
    expect(context.b).eql(2)
    expect(context.c).eql(3)
  })

  it('not react with changes for extra key', () => {
    var context = vm._mergeContext({c: 3})
    vm.c = 9
    expect(context.a).eql(1)
    expect(context.b).eql(2)
    expect(context.c).eql(3)
  })
})
