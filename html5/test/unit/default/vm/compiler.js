import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
const { expect } = chai
chai.use(sinonChai)

import * as compiler from '../../../../frameworks/legacy/vm/compiler'
import * as directive from '../../../../frameworks/legacy/vm/directive'
import { initState } from '../../../../frameworks/legacy/core/state'

describe.skip('generate workflow', () => {
  let contentIndex = 0
  const vm = {}
  Object.assign(vm, compiler, directive, {
    _watchers: [],
    _createBlock: function () { return { element: {}} },
    _mergeContext: function () { return this },
    _createBody: type => { return { type } },
    _createElement: type => { return { type } },
    _attachTarget: (element, dest) => element,
    _bindElement: () => {},
    _setId: function () {},
    _bindSubVm: function () {},
    _bindSubVmAfterInitialized: function () {},
    _applyNaitveComponentOptions: function () {}
  })

  vm.constructor = function () {
    contentIndex++
    this._content = { index: contentIndex }
    this.$on = sinon.spy()
  }

  beforeEach(() => {
    contentIndex = 0
    sinon.spy(vm, '_compile')
    sinon.spy(vm, '_compileNativeComponent')
    sinon.spy(vm, '_createBody')
    sinon.spy(vm, '_createElement')
    sinon.spy(vm, '_bindElement')
    sinon.spy(vm, '_attachTarget')
    sinon.spy(vm, '_createBlock')
    sinon.spy(vm, '_mergeContext')
    sinon.spy(vm, 'constructor')
  })

  afterEach(() => {
    vm._compile.restore()
    vm._compileNativeComponent.restore()
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
    const target = {
      type: 'a'
    }
    const dest = {
      ref: '_documentElement'
    }

    function check () {
      expect(vm._compile).callCount(1)
      expect(vm._compile).calledWith(target, dest)
      expect(vm._createBody).callCount(1)
      expect(vm._bindElement).callCount(1)
      expect(vm._createElement).callCount(0)
      expect(vm._attachTarget).callCount(1)
      expect(vm._createBlock).callCount(0)
      expect(vm._mergeContext).callCount(0)
      expect(vm.constructor).callCount(0)
      done()
    }

    vm._compile(target, dest)
    check()
  })

  it('generate a single element', (done) => {
    const target = {
      type: 'a'
    }
    const dest = {}

    function check () {
      expect(vm._compile).callCount(1)
      expect(vm._compile).calledWith(target, dest)
      expect(vm._createBody).callCount(0)
      expect(vm._bindElement).callCount(1)
      expect(vm._createElement).callCount(1)
      expect(vm._attachTarget).callCount(1)
      expect(vm._createBlock).callCount(0)
      expect(vm._mergeContext).callCount(0)
      expect(vm.constructor).callCount(0)
      done()
    }

    vm._compile(target, dest)
    check()
  })

  it('generate some child nodes', (done) => {
    const target = [{
      type: 'a'
    }, {
      type: 'b'
    }]
    const dest = {}

    function check () {
      expect(vm._compile).callCount(3)
      expect(vm._compile.args[0]).eql(
        [target, dest])
      expect(vm._compile.args[1]).eql(
        [target[0], { element: {}}, undefined])
      expect(vm._compile.args[2]).eql(
        [target[1], { element: {}}, undefined])
      expect(vm._createBlock).callCount(1)
      expect(vm._mergeContext).callCount(0)
      expect(vm.constructor).callCount(0)
      done()
    }

    vm._compile(target, dest)
    check()
  })

  it('generate content holder', (done) => {
    const target = {
      type: 'a', children: [
        { type: 'b' },
        { type: 'content' },
        { type: 'c' }
      ]
    }
    const dest = {}

    function check () {
      expect(vm._compile).callCount(4)
      expect(vm._compile.args[0]).eql(
        [target, dest])
      expect(vm._compile.args[1]).eql(
        [target.children[0], { type: 'a' }])
      expect(vm._compile.args[2]).eql(
        [target.children[1], { type: 'a' }])
      expect(vm._compile.args[3]).eql(
        [target.children[2], { type: 'a' }])
      expect(vm._content).is.an.object
      expect(vm._content).eql({ element: {}})
      expect(vm._createBlock).callCount(1)
      expect(vm._mergeContext).callCount(0)
      expect(vm.constructor).callCount(0)
      done()
    }

    vm._compile(target, dest)
    check()
  })

  it('generate a repeat element', (done) => {
    const target = {
      type: 'a',
      repeat: () => [1, 2, 3]
    }
    const dest = {}

    function checkRepeatVm (args, target, meta) {
      expect(args[0]).eql(target)
      expect(args[2]).eql(meta)
      const vm = args[1]
      expect(vm.element).eql({})
      expect(vm.data).eql([1, 2, 3])
    }

    function check () {
      expect(vm._compile).callCount(4)
      expect(vm._compile.args[0]).eql([target, dest])
      checkRepeatVm(vm._compile.args[1], target, { repeat: 1 })
      checkRepeatVm(vm._compile.args[2], target, { repeat: 2 })
      checkRepeatVm(vm._compile.args[3], target, { repeat: 3 })
      expect(vm._createBlock).callCount(1)
      expect(vm._mergeContext).callCount(3)
      expect(vm.constructor).callCount(0)
      done()
    }

    vm._compile(target, dest)
    check()
  })

  it('can\'t not use repeat on root element', (done) => {
    const target = {
      type: 'a',
      repeat: () => [1, 2, 3]
    }
    const dest = {
      type: 'document'
    }

    function check () {
      expect(vm._compile).callCount(1)
      expect(vm._createBody).callCount(0)
      expect(vm._createBlock).callCount(0)
      expect(vm._mergeContext).callCount(0)
      expect(vm.constructor).callCount(0)
      done()
    }

    vm._compile(target, dest)
    check()
  })

  it('generate a shown element', (done) => {
    const target = {
      type: 'a',
      shown: () => true
    }
    const dest = {}

    function check () {
      expect(vm._compile).callCount(2)
      expect(vm._compile.args[0]).eql(
        [target, dest])
      expect(vm._compile.args[1][0]).eql(target)
      expect(vm._compile.args[1][1].display).eql(true)
      expect(vm._compile.args[1][2]).eql({ shown: true })
      expect(vm._createBlock).callCount(1)
      expect(vm._mergeContext).callCount(0)
      expect(vm.constructor).callCount(0)
      done()
    }

    vm._compile(target, dest)
    check()
  })

  it('can\'t not use shown on root element', (done) => {
    const target = {
      type: 'a',
      shown: () => true
    }
    const dest = {
      type: 'document'
    }

    function check () {
      expect(vm._compile).callCount(1)
      expect(vm._createBody).callCount(0)
      expect(vm._createBlock).callCount(0)
      expect(vm._mergeContext).callCount(0)
      expect(vm.constructor).callCount(0)
      done()
    }

    vm._compile(target, dest)
    check()
  })

  it('generate a repeat shown element', (done) => {
    let index = 0
    const target = {
      type: 'a',
      repeat: () => [1, 2, 3],
      shown: () => {
        index++
        return index % 2
      }
    }
    const dest = {}

    function checkRepeatVm (args, target, meta) {
      expect(args[0]).eql(target)
      expect(args[2]).eql(meta)
      const vm = args[1]
      expect(vm.element).eql({})
      expect(vm.data).eql([1, 2, 3])
    }

    function check () {
      expect(vm._compile).callCount(6)
      expect(vm._compile.args[0]).eql([target, dest])
      checkRepeatVm(vm._compile.args[1], target, { repeat: 1 })
      expect(vm._compile.args[2][0]).eql(target)
      expect(vm._compile.args[2][1].display).eql(true)
      expect(vm._compile.args[2][2]).eql({ repeat: 1, shown: true })
      checkRepeatVm(vm._compile.args[3], target, { repeat: 2 })
      checkRepeatVm(vm._compile.args[4], target, { repeat: 3 })
      expect(vm._compile.args[5][0]).eql(target)
      expect(vm._compile.args[5][1].display).eql(true)
      expect(vm._compile.args[5][2]).eql({ repeat: 3, shown: true })
      expect(vm._createBlock).callCount(4)
      expect(vm._mergeContext).callCount(3)
      expect(vm.constructor).callCount(0)
      done()
    }

    vm._compile(target, dest)
    check()
  })

  it('generate an element with children', (done) => {
    const target = {
      type: 'a',
      children: [{ type: 'b' }, { type: 'c' }]
    }
    const dest = {}

    function check () {
      expect(vm._compile).callCount(3)
      expect(vm._compile.args[0]).eql([target, dest])
      expect(vm._compile.args[1]).eql([target.children[0], { type: 'a' }])
      expect(vm._compile.args[2]).eql([target.children[1], { type: 'a' }])
      expect(vm._createBlock).callCount(0)
      expect(vm._mergeContext).callCount(0)
      expect(vm.constructor).callCount(0)
      done()
    }

    vm._compile(target, dest)
    check()
  })

  it('generate an whole element with children', (done) => {
    const target = {
      type: 'a',
      append: 'tree',
      children: [{ type: 'b' }, { type: 'c' }]
    }
    const dest = {}

    function check () {
      expect(vm._compile).callCount(3)
      expect(vm._compile.args[0]).eql([target, dest])
      expect(vm._compile.args[1]).eql([target.children[0], {
        attr: {
          append: 'tree'
        }, type: 'a' }])
      expect(vm._compile.args[2]).eql([target.children[1], {
        attr: {
          append: 'tree'
        }, type: 'a' }])
      expect(vm._createBlock).callCount(0)
      expect(vm._mergeContext).callCount(0)
      expect(vm.constructor).callCount(0)
      done()
    }

    vm._compile(target, dest)
    check()
  })

  it('generate an element with repeat shown children', (done) => {
    let index = 0
    const target = {
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
        { type: 'c' }
      ]
    }
    const dest = {}

    function checkRepeatVm (args, target, meta) {
      expect(args[0]).eql(target)
      expect(args[2]).eql(meta)
      const vm = args[1]
      expect(vm.element).eql({})
      expect(vm.data).eql([1, 2, 3])
    }

    function check () {
      expect(vm._compile).callCount(8)
      expect(vm._compile.args[0]).eql([target, dest])
      expect(vm._compile.args[1]).eql([target.children[0], { type: 'a' }])
      checkRepeatVm(vm._compile.args[2], target.children[0], { repeat: 1 })
      expect(vm._compile.args[3][0]).eql(target.children[0])
      expect(vm._compile.args[3][1].display).eql(true)
      expect(vm._compile.args[3][2]).eql({ repeat: 1, shown: true })
      checkRepeatVm(vm._compile.args[4], target.children[0], { repeat: 2 })
      checkRepeatVm(vm._compile.args[5], target.children[0], { repeat: 3 })
      expect(vm._compile.args[6][0]).eql(target.children[0])
      expect(vm._compile.args[6][1].display).eql(true)
      expect(vm._compile.args[6][2]).eql({ repeat: 3, shown: true })
      expect(vm._compile.args[7]).eql([target.children[1], { type: 'a' }])
      expect(vm._createBlock).callCount(4)
      expect(vm._mergeContext).callCount(3)
      expect(vm.constructor).callCount(0)
      done()
    }

    vm._compile(target, dest)
    check()
  })

  it('generate an element with repeat shown tree', (done) => {
    let index = 0
    const target = {
      type: 'a',
      children: [
        {
          type: 'b',
          children: [{ type: 'c' }],
          repeat: () => [1, 2, 3],
          shown: function () {
            index++
            return index % 2
          }
        },
        { type: 'd' }
      ]
    }
    const dest = {}

    function checkRepeatVm (args, target, meta) {
      expect(args[0]).eql(target)
      expect(args[2]).eql(meta)
      const vm = args[1]
      expect(vm.element).eql({})
      expect(vm.data).eql([1, 2, 3])
    }

    function check () {
      expect(vm._compile).callCount(10)
      expect(vm._compile.args[0]).eql([target, dest])
      expect(vm._compile.args[1]).eql([target.children[0], { type: 'a' }])
      checkRepeatVm(vm._compile.args[2], target.children[0], { repeat: 1 })
      expect(vm._compile.args[3][0]).eql(target.children[0])
      expect(vm._compile.args[3][1].display).eql(true)
      expect(vm._compile.args[3][2]).eql({ repeat: 1, shown: true })
      expect(vm._compile.args[4]).eql([target.children[0].children[0],
        { type: 'b' }])
      checkRepeatVm(vm._compile.args[5], target.children[0], { repeat: 2 })
      checkRepeatVm(vm._compile.args[6], target.children[0], { repeat: 3 })
      expect(vm._compile.args[7][0]).eql(target.children[0])
      expect(vm._compile.args[7][1].display).eql(true)
      expect(vm._compile.args[7][2]).eql({ repeat: 3, shown: true })
      expect(vm._compile.args[8]).eql([target.children[0].children[0],
        { type: 'b' }])
      expect(vm._compile.args[9]).eql([target.children[1], { type: 'a' }])
      expect(vm._createBlock).callCount(4)
      expect(vm._mergeContext).callCount(3)
      expect(vm.constructor).callCount(0)
      done()
    }

    vm._compile(target, dest)
    check()
  })

  it('generate an element with custom children', (done) => {
    const target = {
      type: 'a',
      children: [
        { type: 'b', component: true },
        { type: 'c' }
      ]
    }
    const dest = {}

    function check () {
      expect(vm._compile).callCount(3)
      expect(vm._compile.args[0]).eql([target, dest])
      expect(vm._compile.args[1]).eql([target.children[0], { type: 'a' }])
      expect(vm._compile.args[2]).eql([target.children[1], { type: 'a' }])
      expect(vm._createBlock).callCount(0)
      expect(vm._mergeContext).callCount(0)
      expect(vm.constructor).callCount(1)
      expect(vm.constructor.args[0][0]).eql('b')
      expect(vm.constructor.args[0][1]).eql({})
      expect(vm.constructor.args[0][3]).eql({ type: 'a' })
      done()
    }

    vm._compile(target, dest)
    check()
  })

  it('with custom repeat show children', (done) => {
    let index = 0
    const target = {
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
        { type: 'd' }
      ]
    }
    const dest = {}

    function checkRepeatVm (args, target, meta) {
      expect(args[0]).eql(target)
      expect(args[2]).eql(meta)
      const vm = args[1]
      expect(vm.element).eql({})
      expect(vm.data).eql([1, 2, 3])
    }

    function check () {
      expect(vm._compile).callCount(8)
      expect(vm._compile.args[0]).eql([target, dest])
      expect(vm._compile.args[1]).eql([target.children[0], { type: 'a' }])
      checkRepeatVm(vm._compile.args[2], target.children[0], { repeat: 1 })
      expect(vm._compile.args[3][0]).eql(target.children[0])
      expect(vm._compile.args[3][1].display).eql(true)
      expect(vm._compile.args[3][2]).eql({ repeat: 1, shown: true })
      checkRepeatVm(vm._compile.args[4], target.children[0], { repeat: 2 })
      checkRepeatVm(vm._compile.args[5], target.children[0], { repeat: 3 })
      expect(vm._compile.args[6][0]).eql(target.children[0])
      expect(vm._compile.args[6][1].display).eql(true)
      expect(vm._compile.args[6][2]).eql({ repeat: 3, shown: true })
      expect(vm._compile.args[7]).eql([target.children[1], { type: 'a' }])
      expect(vm._createBlock).callCount(4)
      expect(vm._mergeContext).callCount(3)

      expect(vm.constructor).callCount(2)
      expect(vm.constructor.args[0][0]).eql('b')
      expect(vm.constructor.args[0][3]).eql({ element: {}, display: true })
      expect(vm.constructor.args[1][0]).eql('b')
      expect(vm.constructor.args[1][3]).eql({ element: {}, display: true })

      done()
    }

    vm._compile(target, dest)
    check()
  })
})

describe.skip('merge context', () => {
  const { mergeContext } = compiler
  let vm

  beforeEach(() => {
    vm = {
      _data: { a: 1, b: 2 }
    }
    initState(vm)
  })

  afterEach(() => {
    vm = null
  })

  it('merge external data', () => {
    const context = mergeContext(vm, { a: 3 })
    expect(context).not.equal(vm)
    expect(context.a).eql(3)
    expect(context.b).eql(2)
  })

  it('react with changes, but not with internal for ext-key', () => {
    const context = mergeContext(vm, { a: 3 })
    vm.a = 4
    vm.b = 5
    expect(context.a).eql(3)
    expect(context.b).eql(5)
    context.a = 6
    expect(context.a).eql(6)
  })

  it('merge external data if key not bound', () => {
    const context = mergeContext(vm, { c: 3 })
    expect(context).not.equal(vm)
    expect(context.a).eql(1)
    expect(context.b).eql(2)
    expect(context.c).eql(3)
  })

  it('not react with changes for extra key', () => {
    const context = mergeContext(vm, { c: 3 })
    vm.c = 9
    expect(context.a).eql(1)
    expect(context.b).eql(2)
    expect(context.c).eql(3)
  })
})
