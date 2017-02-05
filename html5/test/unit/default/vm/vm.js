import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
const { expect } = chai
chai.use(sinonChai)

import Vm from '../../../../frameworks/legacy/vm'
import { Document } from '../../../../runtime/vdom'
import { init as resetTaskHandler } from '../../../../runtime/task-center'
import Differ from '../../../../frameworks/legacy/app/differ'

const oriCallNative = global.callNative

describe('generate virtual dom for a single vm', () => {
  const spy = sinon.spy()
  const spy1 = sinon.spy()
  let doc
  let customComponentMap
  let differ

  beforeEach(() => {
    differ = new Differ('test')
    doc = new Document('test', '', function (actions) {
      actions.forEach((action) => {
        spy.apply(null, ['test', action.method].concat(action.args))
      })
    })
    customComponentMap = {}
  })

  afterEach(() => {
    spy.reset()
    spy1.reset()
    doc.destroy()
  })

  it('$watch', () => {
    const data = {
      a: {
        b: 1
      }
    }

    customComponentMap.foo = {
      template: {
        type: 'container'
      },
      data: data
    }

    const app = { doc, customComponentMap, differ }
    const vm = new Vm('foo', customComponentMap.foo, { _app: app })

    expect(vm._app).equal(app)
    expect(doc.body).is.an.object

    vm.$watch(function () {
      return this.a.b
    }, (value) => {
      expect(value).eql(2)
    })

    data.a.b = 2
  })

  it('vm.data is not a object', () => {
    const data = 'hello'

    customComponentMap.foo = {
      template: {
        type: 'container'
      },
      data: data
    }

    const app = { doc, customComponentMap, differ }
    const vm = new Vm('foo', customComponentMap.foo, { _app: app })

    expect(vm._app).equal(app)
    expect(doc.body).is.an.object
  })

  it('no param parentVm', () => {
    customComponentMap.foo = {
      template: {
        type: 'container'
      }
    }

    const vm = new Vm('foo', customComponentMap.foo, null)

    expect(vm._app).is.an.object
    expect(doc.body).is.an.object
  })

  it('no param options', () => {
    const app = {}
    const vm = new Vm('foo', null, { _app: app })

    expect(vm._app).is.an.object
    expect(doc.body).is.an.object
  })

  it('old method.ready', () => {
    customComponentMap.foo = {
      template: {
        type: 'container'
      },
      methods: {
        ready: spy1
      }
    }

    const app = { doc, customComponentMap, differ }
    const vm = new Vm('foo', customComponentMap.foo, { _app: app })

    expect(vm._app).equal(app)
    expect(doc.body).is.an.object
    expect(doc.body.type).eql('container')
    expect(spy1).callCount(1)
  })

  it('generate an static element ', () => {
    customComponentMap.foo = {
      template: {
        type: 'container',
        attr: {
          a: 1,
          b: 2,
          static: ''
        },
        style: {
          c: 3,
          d: 4
        }
      }
    }

    const app = { doc, customComponentMap, differ }
    const vm = new Vm('foo', customComponentMap.foo, { _app: app })

    expect(vm._app).equal(app)
    expect(vm._static).eql(true)
    expect(doc.body).is.an.object
    expect(doc.body.type).eql('container')
    expect(doc.body.attr).eql({ a: 1, b: 2, static: '' })
    expect(doc.body.style).eql({ c: 3, d: 4 })
    expect(doc.body.children).is.an.array
    expect(doc.body.children.length).eql(0)
  })

  it('generate an single element', () => {
    customComponentMap.foo = {
      template: {
        type: 'container',
        attr: {
          a: 1,
          b: 2
        },
        style: {
          c: 3,
          d: 4
        }
      }
    }

    const app = { doc, customComponentMap, differ }
    const vm = new Vm('foo', customComponentMap.foo, { _app: app })

    expect(vm._app).equal(app)
    expect(doc.body).is.an.object
    expect(doc.body.type).eql('container')
    expect(doc.body.attr).eql({ a: 1, b: 2 })
    expect(doc.body.style).eql({ c: 3, d: 4 })
    expect(doc.body.children).is.an.array
    expect(doc.body.children.length).eql(0)
  })

  it('generate an element tree', () => {
    customComponentMap.foo = {
      template: {
        type: 'container', attr: { a: 1, b: 2 }, style: { c: 3, d: 4 },
        children: [
          { type: 'image', attr: { src: '<some image url>' }},
          { type: 'text', attr: { value: '<some text content>' }}
        ]
      }
    }

    const app = { doc, customComponentMap, differ }
    const vm = new Vm('foo', customComponentMap.foo, { _app: app })

    expect(vm._app).equal(app)
    const el = doc.body
    expect(el.type).eql('container')
    expect(el.attr).eql({ a: 1, b: 2 })
    expect(el.style).eql({ c: 3, d: 4 })
    expect(el.children).is.an.array
    expect(el.children.length).eql(2)

    const image = el.children[0]
    const text = el.children[1]
    expect(image.type).eql('image')
    expect(image.attr).eql({ src: '<some image url>' })
    expect(text.type).eql('text')
    expect(text.attr).eql({ value: '<some text content>' })
  })

  it('generate an element tree with component options', () => {
    customComponentMap.foo = {
      template: {
        type: 'cell',
        children: [
          { type: 'text', attr: { value: '<some text content>' }}
        ]
      }
    }

    const app = { doc, customComponentMap, differ }
    const vm = new Vm('foo', customComponentMap.foo, { _app: app })

    expect(spy.firstCall.args[0]).to.be.equal('test')
    expect(spy.firstCall.args[1]).to.be.equal('createBody')
    expect(spy.firstCall.args[2]).to.deep.equal({
      ref: '_root',
      type: 'cell',
      attr: {
        append: 'tree'
      },
      style: {}
    })
    expect(spy.secondCall.args[0]).to.be.equal('test')
    expect(spy.secondCall.args[1]).to.be.equal('addElement')
    expect(spy.secondCall.args[2]).to.be.equal('_root')
    expect(spy.secondCall.args[3]).to.deep.equal({
      ref: spy.secondCall.args[3].ref,
      type: 'text',
      attr: {
        value: '<some text content>'
      },
      style: {}
    })
    expect(spy.secondCall.args[4]).to.be.equal(-1)

    expect(vm._app).equal(app)
    const el = doc.body
    expect(el.type).eql('cell')
    expect(el.children).is.an.array
    expect(el.children.length).eql(1)

    const text = el.children[0]
    expect(text.type).eql('text')
    expect(text.attr).eql({ value: '<some text content>' })
  })

  it('generate an element tree with data binding', () => {
    customComponentMap.foo = {
      template: {
        type: 'container', attr: { a: 1, b: 2 }, style: { c: 3, d: 4 },
        children: [
          { type: 'image', attr: { src: function () { return this.x } }},
          { type: 'text', attr: { value: function () { return this.n } }},
          { type: 'text', attr: { value: function () { return this.m } }}
        ]
      },
      data: {
        x: '<some image url>', y: '<some text content>'
      },
      computed: {
        n: function () {
          return this.y.toUpperCase()
        },
        m: {
          get: function () {
            return this.y.toUpperCase()
          },
          set: function (v) {
            this.y = v
          }
        }
      }
    }

    const app = { doc, customComponentMap, differ }
    const vm = new Vm('foo', customComponentMap.foo, { _app: app })

    expect(vm._app).equal(app)
    expect(vm.x).eql('<some image url>')
    expect(vm.y).eql('<some text content>')
    expect(vm.n).eql('<SOME TEXT CONTENT>')
    expect(vm.m).eql('<SOME TEXT CONTENT>')

    const el = doc.body
    expect(el.type).eql('container')
    expect(el.attr).eql({ a: 1, b: 2 })
    expect(el.style).eql({ c: 3, d: 4 })
    expect(el.children).is.an.array
    expect(el.children.length).eql(3)

    const image = el.children[0]
    const text = el.children[1]
    const text2 = el.children[2]
    expect(image.type).eql('image')
    expect(image.attr).eql({ src: '<some image url>' })
    expect(text.type).eql('text')
    expect(text.attr).eql({ value: '<SOME TEXT CONTENT>' })
    expect(text2.type).eql('text')
    expect(text2.attr).eql({ value: '<SOME TEXT CONTENT>' })

    vm.x = '<some image url>'
    differ.flush()
    expect(el).equal(doc.body)
    expect(image).equal(el.children[0])
    expect(text).equal(el.children[1])
    expect(text2).equal(el.children[2])

    vm.x = 'other string value'
    differ.flush()
    expect(el).equal(doc.body)
    expect(image).equal(el.children[0])
    expect(image.attr).eql({ src: 'other string value' })

    vm.y = 'other string value'
    differ.flush()
    expect(el).equal(doc.body)
    expect(text).equal(el.children[1])
    expect(text.attr).eql({ value: 'OTHER STRING VALUE' })
    expect(text2).equal(el.children[2])
    expect(text2.attr).eql({ value: 'OTHER STRING VALUE' })

    vm.m = 'third string value'
    differ.flush()
    expect(vm.x).eql('other string value')
    expect(vm.y).eql('third string value')
    expect(vm.n).eql('THIRD STRING VALUE')
    expect(vm.m).eql('THIRD STRING VALUE')
    expect(el).equal(doc.body)
    expect(text).equal(el.children[1])
    expect(text.attr).eql({ value: 'THIRD STRING VALUE' })
    expect(text2).equal(el.children[2])
    expect(text2.attr).eql({ value: 'THIRD STRING VALUE' })
  })

  it('generate an element tree with shown', () => {
    customComponentMap.foo = {
      template: {
        type: 'container',
        children: [
          { type: 'prev' },
          {
            shown: function () { return this.y },
            type: 'image', attr: { src: function () { return this.x } }
          },
          { type: 'next' }
        ]
      },
      data: {
        x: '<some image url>', y: true
      }
    }

    const app = { doc, customComponentMap, differ }
    const vm = new Vm('foo', customComponentMap.foo, { _app: app })

    expect(vm._app).equal(app)
    expect(vm.x).eql('<some image url>')
    expect(vm.y).eql(true)

    const el = doc.body
    expect(el.type).eql('container')
    expect(el.children).is.an.array
    expect(el.children.length).eql(5)

    const prev = el.children[0]
    const starter = el.children[1]
    const image = el.children[2]
    const ender = el.children[3]
    const next = el.children[4]
    expect(prev.type).eql('prev')
    expect(starter.type).eql('comment')
    expect(ender.type).eql('comment')
    expect(next.type).eql('next')
    expect(image.type).eql('image')
    expect(image.attr).eql({ src: '<some image url>' })

    vm.y = false
    differ.flush()

    expect(el).equal(doc.body)
    expect(el.children).is.an.array
    expect(el.children.length).eql(4)
    expect(prev).equal(el.children[0])
    expect(starter).equal(el.children[1])
    expect(ender).equal(el.children[2])
    expect(next).equal(el.children[3])

    vm.y = true
    differ.flush()

    expect(el).equal(doc.body)
    expect(el.children).is.an.array
    expect(el.children.length).eql(5)
    expect(prev).equal(el.children[0])
    expect(starter).equal(el.children[1])

    const image2 = el.children[2]
    expect(image2.type).eql('image')
    expect(image2.attr).eql({ src: '<some image url>' })
    expect(ender).equal(el.children[3])
    expect(next).equal(el.children[4])
  })

  it('generate an element tree with repeat', () => {
    customComponentMap.foo = {
      template: {
        type: 'container',
        children: [
          { type: 'prev' },
          {
            repeat: function () { return this.list },
            type: 'image', attr: { src: function () { return this.x } }
          },
          { type: 'next' }
        ]
      },
      data: {
        x: '<some image url>',
        list: [
          { uid: 1, x: 1 }, { uid: 2, x: 2 }, { uid: 3 }
        ]
      }
    }

    const app = { doc, customComponentMap, differ }
    const vm = new Vm('foo', customComponentMap.foo, { _app: app })

    expect(vm._app).equal(app)
    expect(vm.x).eql('<some image url>')
    expect(vm.list).eql([
      { uid: 1, x: 1, $index: 0 },
      { uid: 2, x: 2, $index: 1 },
      { uid: 3, $index: 2 }])

    const el = doc.body
    expect(el.type).eql('container')
    expect(el.children).is.an.array
    expect(el.children.length).eql(7)

    const prev = el.children[0]
    const starter = el.children[1]
    const ender = el.children[5]
    const next = el.children[6]
    expect(prev.type).eql('prev')
    expect(starter.type).eql('comment')
    expect(ender.type).eql('comment')
    expect(next.type).eql('next')

    expect(el.children[2].type).eql('image')
    expect(el.children[2].attr).eql({ src: 1 })
    expect(el.children[3].type).eql('image')
    expect(el.children[3].attr).eql({ src: 2 })
    expect(el.children[4].type).eql('image')
    expect(el.children[4].attr).eql({ src: '<some image url>' })

    vm.list[1].x = 3
    differ.flush()
    expect(el.children.length).eql(7)
    expect(el.children[2].attr).eql({ src: 1 })
    expect(el.children[3].attr).eql({ src: 3 })
    expect(el.children[4].attr).eql({ src: '<some image url>' })

    vm.x = 'other string value'
    differ.flush()
    expect(el.children.length).eql(7)
    expect(el.children[2].attr).eql({ src: 1 })
    expect(el.children[3].attr).eql({ src: 3 })
    expect(el.children[4].attr).eql({ src: 'other string value' })

    vm.list.push({ uid: 4, x: 4 })
    vm.list.push({ uid: 5 }, { uid: 6, x: 6 })

    differ.flush()

    expect(el.children.length).eql(10)
    expect(el.children[2].attr).eql({ src: 1 })
    expect(el.children[3].attr).eql({ src: 3 })
    expect(el.children[4].attr).eql({ src: 'other string value' })
    expect(el.children[5].attr).eql({ src: 4 })
    expect(el.children[6].attr).eql({ src: 'other string value' })
    expect(el.children[7].attr).eql({ src: 6 })

    vm.list.splice(1, 2, { uid: 7, x: 7 })
    differ.flush()

    expect(el.children.length).eql(9)
    expect(el.children[2].attr).eql({ src: 1 })
    expect(el.children[3].attr).eql({ src: 7 })
    expect(el.children[4].attr).eql({ src: 4 })
    expect(el.children[5].attr).eql({ src: 'other string value' })
    expect(el.children[6].attr).eql({ src: 6 })

    vm.list.$set(0, { uid: 321, x: 32 })
    vm.list.$set(10, { uid: 8889, x: 8888 })
    differ.flush()

    expect(el.children.length).eql(10)
    expect(el.children[2].attr).eql({ src: 32 })
    expect(el.children[7].attr).eql({ src: 8888 })

    vm.list.unshift({ uid: 12345, x: 123456 })
    differ.flush()

    expect(el.children.length).eql(11)
    expect(el.children[2].attr).eql({ src: 123456 })
  })

  it('generate an static element tree with shown and repeat', () => {
    customComponentMap.foo = {
      template: {
        type: 'container',
        attr: {
          static: ''
        },
        children: [
          { type: 'prev' },
          {
            shown: function () { return this.x % 2 === 0 },
            repeat: function () { return this.list },
            type: 'image', attr: { src: function () { return this.x } }
          },
          { type: 'next' }
        ]
      },
      data: {
        x: '<some image url>',
        list: [
          { uid: 1, x: 1 }, { uid: 2, x: 2 }, { uid: 3 }
        ]
      }
    }

    const app = { doc, customComponentMap, differ }
    const vm = new Vm('foo', customComponentMap.foo, { _app: app })

    expect(vm._app).equal(app)
    expect(vm._static).equal(true)
    expect(vm.x).eql('<some image url>')
    expect(vm.list).eql([
      { uid: 1, x: 1, $index: 0 },
      { uid: 2, x: 2, $index: 1 },
      { uid: 3, $index: 2 }])

    const el = doc.body
    expect(el.type).eql('container')
    expect(el.children).is.an.array
    expect(el.children.length).eql(11)

    const prev = el.children[0]
    const next = el.children[10]
    expect(prev.type).eql('prev')
    expect(el.children[1].type).eql('comment')
    expect(el.children[1].value).eql('start')
    expect(el.children[9].type).eql('comment')
    expect(el.children[9].value).eql('end')

    expect(el.children[2].type).eql('comment')
    expect(el.children[2].value).eql('start')
    expect(el.children[3].type).eql('comment')
    expect(el.children[3].value).eql('end')

    expect(el.children[4].type).eql('comment')
    expect(el.children[4].value).eql('start')
    expect(el.children[5].type).eql('image')
    expect(el.children[5].attr).eql({ src: 2 })
    expect(el.children[6].type).eql('comment')
    expect(el.children[6].value).eql('end')

    expect(el.children[7].type).eql('comment')
    expect(el.children[7].value).eql('start')
    expect(el.children[8].type).eql('comment')
    expect(el.children[8].value).eql('end')
    expect(next.type).eql('next')

    vm.list[0].x = 4
    differ.flush()

    expect(el.children.length).eql(11)
    expect(el.children[5].type).eql('image')
    expect(el.children[5].attr).eql({ src: 2 })
  })

  it('generate an element tree which root element with shown', () => {
    customComponentMap.foo = {
      template: {
        type: 'container',
        shown: function () { return this.x % 2 === 0 }
      },
      data: {
        x: 2
      }
    }

    const app = { doc, customComponentMap, differ }
    const vm = new Vm('foo', customComponentMap.foo, { _app: app })

    expect(vm._app).equal(app)
    expect(vm.x).eql(2)
  })

  it('append tree', () => {
    customComponentMap.foo = {
      template: {
        type: 'container',
        attr: {
          append: 'tree'
        },
        children: [
          { type: 'a' },
          { repeat: {}}
        ]
      }
    }

    const app = { doc, customComponentMap, differ }
    const vm = new Vm('foo', customComponentMap.foo, { _app: app })

    expect(vm._app).equal(app)
  })

  it('repeat is not a function', () => {
    customComponentMap.foo = {
      template: {
        type: 'container',
        children: [
          { type: 'a' },
          { repeat: {}}
        ]
      }
    }

    const app = { doc, customComponentMap, differ }
    const vm = new Vm('foo', customComponentMap.foo, { _app: app })

    expect(vm._app).equal(app)
  })

  it('repeat oldStyle with item which not a object', () => {
    customComponentMap.foo = {
      template: {
        type: 'container',
        children: [
          { type: 'a' },
          { repeat: function () { return [1, 2, 3] } }
        ]
      }
    }

    const app = { doc, customComponentMap, differ }
    const vm = new Vm('foo', customComponentMap.foo, { _app: app })

    expect(vm._app).equal(app)
  })

  it('classList length is zero', () => {
    customComponentMap.foo = {
      template: {
        type: 'container',
        classList: []
      }
    }

    const app = { doc, customComponentMap, differ }
    const vm = new Vm('foo', customComponentMap.foo, { _app: app })

    expect(vm._app).equal(app)
  })

  it('classList is a function', () => {
    customComponentMap.foo = {
      template: {
        type: 'container',
        classList: function () { return [] }
      }
    }

    const app = { doc, customComponentMap, differ }
    const vm = new Vm('foo', customComponentMap.foo, { _app: app })

    expect(vm._app).equal(app)
  })

  it('generate an element tree which root element with repeat', () => {
    customComponentMap.foo = {
      template: {
        type: 'container',
        repeat: function () { return this.list }
      },
      data: {
        list: [
          { uid: 1, x: 1 }, { uid: 2, x: 2 }, { uid: 3 }
        ]
      }
    }

    const app = { doc, customComponentMap, differ }
    const vm = new Vm('foo', customComponentMap.foo, { _app: app })

    expect(vm._app).equal(app)
    expect(vm.list).eql([
      { uid: 1, x: 1 },
      { uid: 2, x: 2 },
      { uid: 3 }
    ])
  })

  it('generate an element tree with shown and repeat', () => {
    customComponentMap.foo = {
      template: {
        type: 'container',
        children: [
          { type: 'prev' },
          {
            shown: function () { return this.x % 2 === 0 },
            repeat: function () { return this.list },
            type: 'image', attr: { src: function () { return this.x } }
          },
          { type: 'next' }
        ]
      },
      data: {
        x: '<some image url>',
        list: [
          { uid: 1, x: 1 }, { uid: 2, x: 2 }, { uid: 3 }
        ]
      }
    }

    const app = { doc, customComponentMap, differ }
    const vm = new Vm('foo', customComponentMap.foo, { _app: app })

    expect(vm._app).equal(app)
    expect(vm.x).eql('<some image url>')
    expect(vm.list).eql([
      { uid: 1, x: 1, $index: 0 },
      { uid: 2, x: 2, $index: 1 },
      { uid: 3, $index: 2 }])

    const el = doc.body
    expect(el.type).eql('container')
    expect(el.children).is.an.array
    expect(el.children.length).eql(11)

    const prev = el.children[0]
    const next = el.children[10]
    expect(prev.type).eql('prev')
    expect(el.children[1].type).eql('comment')
    expect(el.children[1].value).eql('start')
    expect(el.children[9].type).eql('comment')
    expect(el.children[9].value).eql('end')

    expect(el.children[2].type).eql('comment')
    expect(el.children[2].value).eql('start')
    expect(el.children[3].type).eql('comment')
    expect(el.children[3].value).eql('end')

    expect(el.children[4].type).eql('comment')
    expect(el.children[4].value).eql('start')
    expect(el.children[5].type).eql('image')
    expect(el.children[5].attr).eql({ src: 2 })
    expect(el.children[6].type).eql('comment')
    expect(el.children[6].value).eql('end')

    expect(el.children[7].type).eql('comment')
    expect(el.children[7].value).eql('start')
    expect(el.children[8].type).eql('comment')
    expect(el.children[8].value).eql('end')
    expect(next.type).eql('next')

    vm.list[0].x = 4
    differ.flush()

    expect(el.children.length).eql(12)
    expect(el.children[3].type).eql('image')
    expect(el.children[3].attr).eql({ src: 4 })
    expect(el.children[6].type).eql('image')
    expect(el.children[6].attr).eql({ src: 2 })
  })

  it('generate more than one group of elements with the same repeat data', () => {
    customComponentMap.foo = {
      template: {
        type: 'container',
        children: [
          { type: 'begin' },
          {
            repeat: {
              expression: function () { return this.list },
              value: 'v1'
            },
            type: 'image', attr: { src: function () { return this.v1.x } }
          },
          { type: 'middle' },
          {
            repeat: {
              expression: function () { return this.list },
              value: 'v2'
            },
            type: 'text', attr: { value: function () { return this.v2.x } }
          },
          { type: 'end' }
        ]
      },
      data: {
        list: [
          { uid: 1, x: 1 }, { uid: 2, x: 2 }, { uid: 3 }
        ]
      }
    }

    const app = { doc, customComponentMap, differ }
    const vm = new Vm('foo', customComponentMap.foo, { _app: app })

    expect(vm._app).equal(app)
    expect(vm.list).eql([
      { uid: 1, x: 1 },
      { uid: 2, x: 2 },
      { uid: 3 }])

    const el = doc.body
    expect(el.type).eql('container')
    expect(el.children).is.an.array

    // [begin, comment, image x 3, comment, middle, comment, text x 3, comment, end]
    expect(el.children.length).eql(13)

    expect(el.children[0].type).eql('begin')
    expect(el.children[1].type).eql('comment')
    expect(el.children[1].value).eql('start')
    expect(el.children[2].type).eql('image')
    expect(el.children[2].attr).eql({ src: 1 })
    expect(el.children[3].type).eql('image')
    expect(el.children[3].attr).eql({ src: 2 })
    expect(el.children[4].type).eql('image')
    expect(el.children[4].attr).eql({})
    expect(el.children[5].type).eql('comment')
    expect(el.children[5].value).eql('end')
    expect(el.children[6].type).eql('middle')
    expect(el.children[7].type).eql('comment')
    expect(el.children[7].value).eql('start')
    expect(el.children[8].type).eql('text')
    expect(el.children[8].attr).eql({ value: 1 })
    expect(el.children[9].type).eql('text')
    expect(el.children[9].attr).eql({ value: 2 })
    expect(el.children[10].type).eql('text')
    expect(el.children[10].attr).eql({})
    expect(el.children[11].type).eql('comment')
    expect(el.children[11].value).eql('end')
    expect(el.children[12].type).eql('end')

    vm.list[0].x = 4
    differ.flush()

    expect(el.children.length).eql(13)
    expect(el.children[2].attr).eql({ src: 4 })
    expect(el.children[8].attr).eql({ value: 4 })

    // [begin, comment, image x 4, comment, middle, comment, text x 4, comment, end]
    vm.list.push({ uid: 10, x: 10 })
    differ.flush()

    expect(el.children.length).eql(15)
    expect(el.children[5].attr).eql({ src: 10 })
    expect(el.children[12].attr).eql({ value: 10 })

    // [begin, comment, image x 2, comment, middle, comment, text x 2, comment, end]
    vm.list = [
      { uid: 100, x: 100 }, { uid: 1, x: 1 }
    ]
    differ.flush()

    expect(el.children.length).eql(11)
    expect(el.children[2].attr).eql({ src: 100 })
    expect(el.children[3].attr).eql({ src: 1 })
    expect(el.children[7].attr).eql({ value: 100 })
    expect(el.children[8].attr).eql({ value: 1 })

    vm.list[0].x = 4
    differ.flush()

    expect(el.children.length).eql(11)
    expect(el.children[2].attr).eql({ src: 4 })
    expect(el.children[3].attr).eql({ src: 1 })
    expect(el.children[7].attr).eql({ value: 4 })
    expect(el.children[8].attr).eql({ value: 1 })

    vm.list[1].x = 5
    differ.flush()

    expect(el.children.length).eql(11)
    expect(el.children[2].attr).eql({ src: 4 })
    expect(el.children[3].attr).eql({ src: 5 })
    expect(el.children[7].attr).eql({ value: 4 })
    expect(el.children[8].attr).eql({ value: 5 })
  })

  it('generate an element with external data', () => {
    customComponentMap.foo = {
      data: () => {
        return { a: 10, b: 20 }
      },
      template: {
        type: 'container',
        attr: {
          x: function () { return this.a },
          y: function () { return this.b }
        }
      }
    }

    const app = { doc, customComponentMap, differ }
    const vm = new Vm('foo', customComponentMap.foo, { _app: app }, null, { a: 1000 })

    expect(vm._app).equal(app)

    const el = doc.body
    expect(el.type).eql('container')
    expect(el.attr).eql({ x: 1000, y: 20 })

    vm.a = 100
    vm.b = 200
    differ.flush()

    expect(el).equal(doc.body)
    expect(el.attr).eql({ x: 100, y: 200 })
  })
})

describe('generate virtual dom for sub vm', () => {
  let doc
  let customComponentMap
  let differ

  beforeEach(() => {
    global.callNative = function () {}
    resetTaskHandler()
    doc = new Document('test', null, null)
    customComponentMap = {}
    differ = new Differ('test')
  })

  afterEach(() => {
    doc.destroy()
    global.callNative = oriCallNative
  })

  it('generate sub elements', () => {
    customComponentMap.foo = {
      data: function () {
        return {
          showbar1: false,
          showbar2: false,
          bar2list: [{
            id: 'bar2-1'
          }, {
            id: 'bar2-2'
          }]
        }
      },
      template: {
        type: 'div',
        children: [
          { type: 'bar', id: 'bar', component: true,
            events: { click: 'handleClick' }
          },
          { type: 'bar1',
            shown: function () { return this.showbar1 },
            id: 'bar1', component: true
          },
          { type: 'bar2',
              shown: function () { return this.showbar2 },
              repeat: function () { return this.bar2list },
              id: function () { return this.id },
              component: true
          }
        ]
      },
      methods: {
        handleClick: sinon.spy()
      }
    }
    customComponentMap.bar = {
      template: {
        type: 'container',
        children: [{ type: 'aaa' }, { type: 'bbb' }]
      }
    }
    customComponentMap.bar1 = {
      template: {
        type: 'container',
        children: [{ type: 'aaaa' }, { type: 'bbbb' }]
      }
    }

    const app = { doc, customComponentMap, differ }
    const vm = new Vm('foo', customComponentMap.foo, { _app: app })

    expect(vm._app).equal(app)
    expect(vm._rootEl).to.deep.equal(vm._parentEl.children[0])

    expect(vm._childrenVms.length).to.be.equal(1)
    expect(vm._childrenVms[0]).to.deep.equal(vm._ids['bar'].vm)
    expect(vm._childrenVms[0]._rootEl).to.deep.equal(vm._ids['bar'].el)

    const el = doc.body
    expect(el.type).eql('div')
    expect(el.pureChildren).is.an.array
    expect(el.pureChildren.length).eql(1)

    const sub = el.children[0]
    expect(sub.type).eql('container')
    expect(sub.children).is.an.array
    expect(sub.children.length).eql(2)
    expect(sub.children[0].type).eql('aaa')
    expect(sub.children[1].type).eql('bbb')
    expect(sub.event.click).is.a.function

    const spy = customComponentMap.foo.methods.handleClick
    sub.event.click(1, 2, 3)
    expect(spy.args.length).eql(1)
    expect(spy.args[0]).eql([1, 2, 3])

    vm.showbar1 = true
    differ.flush()

    expect(vm._childrenVms.length).to.be.equal(2)
    expect(vm._childrenVms[1]).to.deep.equal(vm._ids['bar1'].vm)
    expect(vm._childrenVms[1]._rootEl).to.deep.equal(vm._ids['bar1'].el)

    vm.showbar2 = true
    differ.flush()

    expect(vm._ids['bar2-1'].vm).to.be.not.undefined
    expect(vm._ids['bar2-1'].el).to.be.not.undefined
    expect(vm._ids['bar2-2'].vm).to.be.not.undefined
    expect(vm._ids['bar2-2'].el).to.be.not.undefined
  })

  it('generate sub element with static', () => {
    customComponentMap.foo = {
      template: {
        type: 'container',
        attr: {
          static: ''
        },
        children: [{ type: 'bar', component: true }]
      }
    }
    customComponentMap.bar = {
      replace: true,
      template: {
        type: 'container',
        children: [{ type: 'aaa' }]
      }
    }

    const app = { doc, customComponentMap, differ }
    const vm = new Vm('foo', customComponentMap.foo, { _app: app })

    expect(vm._app).equal(app)
    expect(vm._static).eql(true)
    const el = doc.body
    expect(el.type).eql('container')
    expect(el.children).is.an.array
    expect(el.children.length).eql(1)

    const aaa = el.children[0]
    expect(aaa.type).eql('aaa')
    expect(vm._childrenVms.length).to.be.equal(1)
    expect(vm._childrenVms[0]._static).eql(true)
  })

  it('generate replaced sub element', () => {
    customComponentMap.foo = {
      template: {
        type: 'container',
        children: [{ type: 'bar', component: true }]
      }
    }
    customComponentMap.bar = {
      replace: true,
      template: {
        type: 'container',
        children: [{ type: 'aaa' }]
      }
    }

    const app = { doc, customComponentMap, differ }
    const vm = new Vm('foo', customComponentMap.foo, { _app: app })

    expect(vm._app).equal(app)
    const el = doc.body
    expect(el.type).eql('container')
    expect(el.children).is.an.array
    expect(el.children.length).eql(1)

    const aaa = el.children[0]
    expect(aaa.type).eql('aaa')
  })

  it('generate replaced sub elements', () => {
    customComponentMap.foo = {
      template: {
        type: 'container',
        children: [{ type: 'bar', component: true }]
      }
    }
    customComponentMap.bar = {
      replace: true,
      template: {
        type: 'container',
        children: [{ type: 'aaa' }, { type: 'bbb' }]
      }
    }

    const app = { doc, customComponentMap, differ }
    const vm = new Vm('foo', customComponentMap.foo, { _app: app })

    expect(vm._app).equal(app)
    const el = doc.body
    expect(el.type).eql('container')
    expect(el.children).is.an.array
    expect(el.children.length).eql(4)

    expect(el.children[0].type).eql('comment')
    const aaa = el.children[1]
    expect(aaa.type).eql('aaa')
    const bbb = el.children[2]
    expect(bbb.type).eql('bbb')
    expect(el.children[3].type).eql('comment')
  })

  it('generate sub elements with no props', () => {
    customComponentMap.foo = {
      template: {
        type: 'container',
        children: [{ type: 'bar', component: true, attr: { x: 10, y: 20 }}]
      }
    }
    customComponentMap.bar = {
      data: () => {
        return { x: 1, y: 2 }
      },
      template: {
        type: 'container',
        children: [
          { type: 'aaa', attr: { a: function () { return this.x } }},
          { type: 'bbb', attr: { b: function () { return this.y } }}
        ]
      }
    }

    const app = { doc, customComponentMap, differ }
    const vm = new Vm('foo', customComponentMap.foo, { _app: app })

    expect(vm._app).equal(app)
    const el = doc.body
    expect(el.type).eql('container')
    expect(el.children).is.an.array
    expect(el.children.length).eql(1)

    const sub = el.children[0]
    const aaa = sub.children[0]
    expect(aaa.type).eql('aaa')
    expect(aaa.attr).eql({ a: 10 })
    const bbb = sub.children[1]
    expect(bbb.type).eql('bbb')
    expect(bbb.attr).eql({ b: 20 })
  })

  it('generate sub elements with array props', () => {
    customComponentMap.foo = {
      template: {
        type: 'container',
        children: [{ type: 'bar', component: true, attr: { x: 10, y: 20 }}]
      }
    }
    customComponentMap.bar = {
      props: ['x'],
      data: () => {
        return { x: 1, y: 2 }
      },
      template: {
        type: 'container',
        children: [
          { type: 'aaa', attr: { a: function () { return this.x } }},
          { type: 'bbb', attr: { b: function () { return this.y } }}
        ]
      }
    }

    const app = { doc, customComponentMap, differ }
    const vm = new Vm('foo', customComponentMap.foo, { _app: app })

    expect(vm._app).equal(app)
    const el = doc.body
    expect(el.type).eql('container')
    expect(el.children).is.an.array
    expect(el.children.length).eql(1)

    const sub = el.children[0]
    const aaa = sub.children[0]
    expect(aaa.type).eql('aaa')
    expect(aaa.attr).eql({ a: 10 })
    const bbb = sub.children[1]
    expect(bbb.type).eql('bbb')
    expect(bbb.attr).eql({ b: 2 })
  })

  it('generate sub elements with props', () => {
    customComponentMap.foo = {
      template: {
        type: 'container',
        children: [{ type: 'bar', component: true, attr: { x: 10, y: 20 }}]
      }
    }
    customComponentMap.bar = {
      props: { x: Number },
      data: () => {
        return { x: 1, y: 2 }
      },
      template: {
        type: 'container',
        children: [
          { type: 'aaa', attr: { a: function () { return this.x } }},
          { type: 'bbb', attr: { b: function () { return this.y } }}
        ]
      }
    }

    const app = { doc, customComponentMap, differ }
    const vm = new Vm('foo', customComponentMap.foo, { _app: app })

    expect(vm._app).equal(app)

    const el = doc.body
    expect(el.type).eql('container')
    expect(el.children).is.an.array
    expect(el.children.length).eql(1)

    const sub = el.children[0]
    const aaa = sub.children[0]
    expect(aaa.type).eql('aaa')
    expect(aaa.attr).eql({ a: 10 })
    const bbb = sub.children[1]
    expect(bbb.type).eql('bbb')
    expect(bbb.attr).eql({ b: 2 })
  })

  it('generate sub elements with data', () => {
    customComponentMap.foo = {
      data: () => {
        return { a: 10, b: 20 }
      },
      template: {
        type: 'container',
        children: [{ type: 'bar', component: true, attr: {
          x: function () { return this.a },
          y: function () { return this.b }
        }}]
      }
    }
    customComponentMap.bar = {
      props: { x: Number },
      data: () => {
        return { x: 1, y: 2 }
      },
      template: {
        type: 'container',
        children: [
          { type: 'aaa', attr: { a: function () { return this.x } }},
          { type: 'bbb', attr: { b: function () { return this.y } }}
        ]
      }
    }

    const app = { doc, customComponentMap, differ }
    const vm = new Vm('foo', customComponentMap.foo, { _app: app })

    expect(vm._app).equal(app)

    const el = doc.body
    expect(el.type).eql('container')
    expect(el.children).is.an.array
    expect(el.children.length).eql(1)

    const sub = el.children[0]
    const aaa = sub.children[0]
    expect(aaa.type).eql('aaa')
    expect(aaa.attr).eql({ a: 10 })
    const bbb = sub.children[1]
    expect(bbb.type).eql('bbb')
    expect(bbb.attr).eql({ b: 2 })

    vm.a = 100
    vm.b = 200
    differ.flush()

    expect(el).equal(doc.body)
    expect(sub).equal(el.children[0])
    expect(aaa).equal(sub.children[0])
    expect(aaa.attr).eql({ a: 100 })
    expect(bbb).equal(sub.children[1])
    expect(bbb.attr).eql({ b: 2 })
  })

  it('generate sub elements with shown data', () => {
    customComponentMap.foo = {
      data: () => {
        return { a: 10, b: 20 }
      },
      template: {
        type: 'container',
        children: [{ type: 'bar', component: true, attr: {
          x: function () { return this.a },
          y: function () { return this.b }
        }, shown: function () { return this.a < 15 } }]
      }
    }
    customComponentMap.bar = {
      props: { x: Number },
      data: () => {
        return { x: 1, y: 2 }
      },
      template: {
        type: 'container',
        children: [
          { type: 'aaa', attr: { a: function () { return this.x } }},
          { type: 'bbb', attr: { b: function () { return this.y } }}
        ]
      }
    }

    const app = { doc, customComponentMap, differ }
    const vm = new Vm('foo', customComponentMap.foo, { _app: app })

    expect(vm._app).equal(app)

    const el = doc.body
    expect(el.type).eql('container')
    expect(el.children).is.an.array
    expect(el.children.length).eql(3)

    const sub = el.children[1]
    const aaa = sub.children[0]
    expect(aaa.type).eql('aaa')
    expect(aaa.attr).eql({ a: 10 })
    const bbb = sub.children[1]
    expect(bbb.type).eql('bbb')
    expect(bbb.attr).eql({ b: 2 })

    vm.a = 20
    differ.flush()

    expect(el).equal(doc.body)
    expect(el.children).is.an.array
    expect(el.children.length).eql(2)
  })

  it('generate sub elements with repeat data', () => {
    customComponentMap.foo = {
      data: () => {
        return { list: [{ uid: 1, a: 1 }, { uid: 2, a: 2 }, { uid: 3, a: 3 }] }
      },
      template: {
        type: 'container',
        children: [{ type: 'bar', component: true, attr: {
          x: function () { return this.a },
          y: function () { return this.b }
        }, repeat: function () { return this.list } }]
      }
    }
    customComponentMap.bar = {
      props: { x: Number },
      data: () => {
        return { x: 1, y: 2 }
      },
      template: {
        type: 'container',
        children: [
          { type: 'aaa', attr: { a: function () { return this.x } }},
          { type: 'bbb', attr: { b: function () { return this.y } }}
        ]
      }
    }

    const app = { doc, customComponentMap, differ }
    const vm = new Vm('foo', customComponentMap.foo, { _app: app })

    expect(vm._app).equal(app)

    const el = doc.body
    expect(el.type).eql('container')
    expect(el.children).is.an.array
    expect(el.children.length).eql(5)

    const sub1 = el.children[1]
    const aaa1 = sub1.children[0]
    expect(aaa1.type).eql('aaa')
    expect(aaa1.attr).eql({ a: 1 })
    const bbb1 = sub1.children[1]
    expect(bbb1.type).eql('bbb')
    expect(bbb1.attr).eql({ b: 2 })

    const sub2 = el.children[2]
    const aaa2 = sub2.children[0]
    expect(aaa2.type).eql('aaa')
    expect(aaa2.attr).eql({ a: 2 })
    const bbb2 = sub2.children[1]
    expect(bbb2.type).eql('bbb')
    expect(bbb2.attr).eql({ b: 2 })

    const sub3 = el.children[3]
    const aaa3 = sub3.children[0]
    expect(aaa3.type).eql('aaa')
    expect(aaa3.attr).eql({ a: 3 })
    const bbb3 = sub3.children[1]
    expect(bbb3.type).eql('bbb')
    expect(bbb3.attr).eql({ b: 2 })
  })

  it('generate sub elements with content', () => {
    customComponentMap.foo = {
      template: {
        type: 'container',
        children: [{ type: 'bar', component: true, children: [
          { type: 'a' }, { type: 'b', attr: { bbb: function () { return this.x } }}
        ] }]
      },
      data: () => {
        return {
          x: 1, y: 2
        }
      }
    }
    customComponentMap.bar = {
      replace: true,
      template: {
        type: 'container',
        children: [{ type: 'aaa' }, { type: 'content' }, { type: 'bbb' }]
      }
    }

    const app = { doc, customComponentMap, differ }
    const vm = new Vm('foo', customComponentMap.foo, { _app: app })

    const el = doc.body

    expect(el.type).eql('container')
    // [comment, aaa, comment, a, b, comment, bbb, comment]
    expect(el.children.length).eql(8)
    expect(el.children[0].type).eql('comment')
    expect(el.children[2].type).eql('comment')
    expect(el.children[5].type).eql('comment')
    expect(el.children[7].type).eql('comment')

    expect(el.pureChildren.length).eql(4)
    expect(el.pureChildren[0].type).eql('aaa')
    expect(el.pureChildren[1].type).eql('a')
    expect(el.pureChildren[2].type).eql('b')
    expect(el.pureChildren[2].attr).eql({ bbb: 1 })
    expect(el.pureChildren[3].type).eql('bbb')

    vm.x = 10
    differ.flush()
    expect(el.pureChildren[2].attr).eql({ bbb: 10 })
  })

  it('generate sub elements with dynamic types', (done) => {
    customComponentMap.foo = {
      data: {
        x: 'bar',
        y: 'hello'
      },
      template: {
        type: 'div',
        children: [{
          type: function () { return this.x },
          attr: { value: function () { return this.y } }
        }]
      }
    }
    customComponentMap.bar = {
      template: {
        type: 'text',
        attr: { value: 'bar' }
      }
    }
    customComponentMap.baz = {
      data: function () {
        return {
          value: ''
        }
      },
      template: {
        type: 'text',
        attr: { value: function () { return this.value + ' baz' } }
      }
    }

    const app = { doc, customComponentMap, differ }
    const vm = new Vm('foo', customComponentMap.foo, { _app: app })

    expect(doc.body.pureChildren[0].type).eql('text')
    expect(doc.body.pureChildren[0].attr).eql({ value: 'bar' })

    vm.x = 'baz'
    expect(doc.body.pureChildren[0].type).eql('text')
    expect(doc.body.pureChildren[0].attr).eql({ value: 'hello baz' })

    vm.y = 'bye'
    setTimeout(() => {
      expect(doc.body.pureChildren[0].type).eql('text')
      expect(doc.body.pureChildren[0].attr).eql({ value: 'bye baz' })

      vm.x = 'text'
      expect(doc.body.pureChildren[0].type).eql('text')
      expect(doc.body.pureChildren[0].attr).eql({ value: 'bye' })

      done()
    })
  })

  it('generate sub elements with repeat dynamic types', (done) => {
    customComponentMap.foo = {
      data: {
        list: [
          { uid: 1, type: 'bar' },
          { uid: 2, type: 'baz' },
          { uid: 3, type: 'bar' },
          { uid: 4, type: 'baz' }
        ]
      },
      template: {
        type: 'div',
        children: [{
          type: function () { return this.v.type },
          repeat: {
            expression: function () { return this.list },
            trackBy: 'uid',
            value: 'v'
          }
        }]
      }
    }
    customComponentMap.bar = {
      template: {
        type: 'text',
        attr: { value: 'bar' }
      }
    }
    customComponentMap.baz = {
      template: {
        type: 'text',
        attr: { value: 'baz' }
      }
    }

    const app = { doc, customComponentMap, differ }
    const vm = new Vm('foo', customComponentMap.foo, { _app: app })

    expect(doc.body.pureChildren.length).eql(4)
    expect(doc.body.pureChildren.map(el => el.attr.value)).eql(['bar', 'baz', 'bar', 'baz'])

    vm.list.splice(2, 0, { uid: 5, type: 'baz' })
    setTimeout(() => {
      expect(doc.body.pureChildren.length).eql(5)
      expect(doc.body.pureChildren.map(el => el.attr.value)).eql(['bar', 'baz', 'baz', 'bar', 'baz'])

      done()
    })
  })
})

describe('generate dom actions', () => {
  let doc, app, spy, customComponentMap, differ

  beforeEach(() => {
    spy = sinon.spy()
    doc = new Document('foo', '', function (actions) {
      actions.forEach((action) => {
        spy.apply(null, ['bar', action.method].concat(action.args))
      })
    })
    differ = new Differ('foo')
    customComponentMap = {}
    app = { doc, customComponentMap, differ }
  })

  afterEach(() => {
    customComponentMap = {}
    doc.destroy()
    app = doc = spy = null
  })

  it('received create body and add element actions', () => {
    const handler = sinon.spy()

    customComponentMap.foo = {
      template: {
        type: 'container',
        attr: {
          a: 1,
          b: 2
        },
        style: {
          c: 3,
          d: 4
        },
        classList: ['classA'],
        events: { click: 'handleClick' }
      },
      style: {
        classA: { d: 5, e: 6 }
      },
      methods: {
        handleClick: handler
      }
    }

    new Vm('foo', customComponentMap.foo, { _app: app })
    const el = {
      ref: '_root',
      type: 'container',
      attr: { a: 1, b: 2 }, style: { c: 3, d: 4, e: 6 },
      event: ['click']
    }

    expect(spy.args.length).eql(1)
    expect(spy.args[0]).eql(['bar', 'createBody', el])
    expect(doc.body.event.click).is.a.function
    expect(handler.args.length).eql(0)
    doc.body.fireEvent('click')
    expect(handler.args.length).eql(1)
  })

  it('received actions for a template with if & repeat', () => {
    customComponentMap.foo = {
      template: {
        type: 'container',
        children: [
          { type: 'prev' },
          {
            shown: function () { return this.x % 2 === 0 },
            repeat: function () { return this.list },
            trackBy: 'uid',
            type: 'image', attr: { src: function () { return this.x } }
          },
          { type: 'next' }
        ]
      },
      data: {
        x: '<some image url>',
        list: [
          { uid: 1, x: 1 }, { uid: 2, x: 2 }, { uid: 3 }
        ]
      }
    }

    const vm = new Vm('foo', customComponentMap.foo, { _app: app })

    const pureChildren = doc.body.pureChildren
    const el = { ref: '_root', type: 'container', attr: {}, style: {}}
    const prev = {
      ref: pureChildren[0].ref,
      type: 'prev', attr: {}, style: {}
    }
    const img = {
      ref: pureChildren[1].ref,
      type: 'image', attr: { src: 2 }, style: {}
    }
    const next = {
      ref: pureChildren[2].ref,
      type: 'next', attr: {}, style: {}
    }

    expect(spy.args.length).eql(4)
    expect(spy.args[0]).eql(['bar', 'createBody', el])
    expect(spy.args[1]).eql(['bar', 'addElement', '_root', prev, -1])
    expect(spy.args[2]).eql(['bar', 'addElement', '_root', img, 1])
    expect(spy.args[3]).eql(['bar', 'addElement', '_root', next, -1])

    vm.list[1].x = 3
    differ.flush()

    // [1, 3, undefined]
    expect(spy.args.length).eql(5)
    expect(spy.args[4]).eql(['bar', 'removeElement', img.ref])

    vm.list[1].x = 12
    differ.flush()

    // [1, !12, undefined]
    expect(spy.args.length).eql(6)
    img.ref = pureChildren[1].ref
    img.attr.src = 12
    expect(spy.args[5]).eql(['bar', 'addElement', '_root', img, 1])

    vm.x = 'other string value'
    differ.flush()

    expect(spy.args.length).eql(6)

    vm.list.push({ uid: 4, x: 4 })
    vm.list.push({ uid: 5 }, { uid: 6, x: 6 })
    differ.flush()

    // [1, !12, undefined, !4, undefined, !6]
    const img2 = {
      ref: pureChildren[2].ref,
      type: 'image', attr: { src: 4 }, style: {}
    }
    const img3 = {
      ref: pureChildren[3].ref,
      type: 'image', attr: { src: 6 }, style: {}
    }
    expect(spy.args.length).eql(8)
    expect(spy.args[6]).eql(['bar', 'addElement', '_root', img2, 2])
    expect(spy.args[7]).eql(['bar', 'addElement', '_root', img3, 3])

    const temp1 = vm.list[1] // 12
    const temp2 = vm.list[5] // 6
    // vm.list.splice(0, 6, temp2, {uid: 7, x: 7}, temp1)
    vm.list = []
    vm.list.push(temp2, { uid: 7, x: 7 }, temp1)
    differ.flush()

    // [!6, 7, !12]
    expect(spy.args.length).eql(10)
    expect(spy.args[8]).eql(['bar', 'removeElement', img2.ref])
    expect(spy.args[9]).eql(['bar', 'moveElement', img3.ref, '_root', 1])
  })

  it('received actions for element updates', () => {
    customComponentMap.foo = {
      template: {
        type: 'container', attr: { a: 1, b: 2 }, style: { c: 3, d: 4 },
        children: [
          { type: 'image', attr: { src: function () { return this.x } }},
          { type: 'text', attr: { value: function () { return this.y } }}
        ]
      },
      data: {
        x: '<some image url>', y: '<some text content>'
      }
    }

    const vm = new Vm('foo', customComponentMap.foo, { _app: app })
    const pureChildren = doc.body.pureChildren
    const length = spy.args.length

    vm.x = '<some image url>'
    differ.flush()
    expect(spy.args.length - length).eql(0)

    vm.x = 'other string value'
    differ.flush()
    const change = [
      'bar', 'updateAttrs',
      pureChildren[0].ref,
      { src: 'other string value' }
    ]
    expect(spy.args.length - length).eql(1)
    expect(spy.args[length]).eql(change)
  })

  it('received no action when no virtual dom different', () => {
    customComponentMap.foo = {
      template: {
        type: 'container', children: [
          {
            type: 'text',
            shown: function () { return this.name.length > 3 },
            attr: {
              value: function () { return this.name.toUpperCase() }
            }
          }
        ]
      },
      data: {
        name: 'Mike'
      }
    }

    const vm = new Vm('foo', customComponentMap.foo, { _app: app })

    expect(doc.body.pureChildren.length).eql(1)
    const text = doc.body.pureChildren[0]
    expect(text.attr.value).eql('MIKE')

    const initCalls = spy.args.length

    vm.name = 'MiKe'
    differ.flush()

    expect(spy.args.length).eql(initCalls)

    text.setAttr('value', 'MIKE')
    differ.flush()

    expect(spy.args.length).eql(initCalls)

    text.setAttr('value', 'STEVE')
    differ.flush()

    expect(spy.args.length).eql(initCalls + 1)
    expect(spy.args[initCalls]).eql([
      'bar', 'updateAttrs', text.ref, { value: 'STEVE' }])

    vm.name = 'Steve'
    differ.flush()

    expect(spy.args.length).eql(initCalls + 1)
  })

  it('received actions for components', () => {
    customComponentMap.foo = {
      template: {
        type: 'container',
        children: [{ type: 'bar', component: true }]
      }
    }
    customComponentMap.bar = {
      template: {
        type: 'container',
        children: [{ type: 'aaa' }, { type: 'bbb' }]
      }
    }

    new Vm('foo', customComponentMap.foo, { _app: app })
    const pureChildren = doc.body.pureChildren
    const first = pureChildren[0]
    const second = first.pureChildren[0]
    const third = first.pureChildren[1]
    expect(spy.args.length).eql(4)
    let el = { ref: '_root', type: 'container', attr: {}, style: {}}
    expect(spy.args[0]).eql(['bar', 'createBody', el])
    el = { ref: first.ref, type: 'container', attr: {}, style: {}}
    expect(spy.args[1]).eql(['bar', 'addElement', '_root', el, -1])
    el = { ref: second.ref, type: 'aaa', attr: {}, style: {}}
    expect(spy.args[2]).eql(['bar', 'addElement', first.ref, el, -1])
    el = { ref: third.ref, type: 'bbb', attr: {}, style: {}}
    expect(spy.args[3]).eql(['bar', 'addElement', first.ref, el, -1])
  })

  it('received actions for complicated components', () => {
    customComponentMap.foo = {
      data: () => {
        return { list: [{ uid: 1, a: 1 }, { uid: 2, a: 2 }, { uid: 3, a: 3 }] }
      },
      template: {
        type: 'container',
        children: [{ type: 'bar', component: true, attr: {
          x: function () { return this.a },
          y: function () { return this.b }
        }, repeat: function () { return this.list } }]
      }
    }
    customComponentMap.bar = {
      props: { x: Number },
      data: () => {
        return { x: 1, y: 2 }
      },
      template: {
        type: 'container',
        children: [
          { type: 'aaa', attr: { a: function () { return this.x } }},
          { type: 'bbb', attr: { b: function () { return this.y } }}
        ]
      }
    }

    new Vm('foo', customComponentMap.foo, { _app: app })
    const pureChildren = doc.body.pureChildren
    const first = pureChildren[0]
    const second = pureChildren[1]
    const third = pureChildren[2]

    /* eslint-disable indent */
    // expect(spy.args[0]).eql([ 'bar', 'createBody', 'container' ])
    expect(spy.args[0]).eql(['bar', 'createBody', { ref: '_root', type: 'container', attr: {}, style: {}}])
      expect(spy.args[1]).eql(['bar', 'addElement', '_root', { ref: first.ref, type: 'container', attr: {}, style: {}}, 0])
        expect(spy.args[2]).eql(['bar', 'addElement', first.ref, { ref: first.pureChildren[0].ref, type: 'aaa', attr: { a: 1 }, style: {}}, -1])
        expect(spy.args[3]).eql(['bar', 'addElement', first.ref, { ref: first.pureChildren[1].ref, type: 'bbb', attr: { b: 2 }, style: {}}, -1])
      expect(spy.args[4]).eql(['bar', 'addElement', '_root', { ref: second.ref, type: 'container', attr: {}, style: {}}, 1])
        expect(spy.args[5]).eql(['bar', 'addElement', second.ref, { ref: second.pureChildren[0].ref, type: 'aaa', attr: { a: 2 }, style: {}}, -1])
        expect(spy.args[6]).eql(['bar', 'addElement', second.ref, { ref: second.pureChildren[1].ref, type: 'bbb', attr: { b: 2 }, style: {}}, -1])
      expect(spy.args[7]).eql(['bar', 'addElement', '_root', { ref: third.ref, type: 'container', attr: {}, style: {}}, 2])
        expect(spy.args[8]).eql(['bar', 'addElement', third.ref, { ref: third.pureChildren[0].ref, type: 'aaa', attr: { a: 3 }, style: {}}, -1])
        expect(spy.args[9]).eql(['bar', 'addElement', third.ref, { ref: third.pureChildren[1].ref, type: 'bbb', attr: { b: 2 }, style: {}}, -1])
    /* eslint-enable indent */
  })

  it('received actions for add a tree element', () => {
    customComponentMap.foo = {
      template: {
        type: 'r',
        children: [
          { type: 'a' }, { type: 'b', children: [
            { type: 'd' }, { type: 'e', append: 'tree', children: [
              { type: 'g' }, { type: 'h' }, { type: 'i' }
            ] }, { type: 'f' }
          ] }, { type: 'c' }
        ]
      }
    }

    new Vm('foo', customComponentMap.foo, { _app: app })
    const pureChildren = doc.body.pureChildren

    expect(spy.args.length).eql(7)
    // body, r, r.a, r.b, r.b.d, r.b.e(tree), r.b.f, r.c

    expect(spy.args[0][2].ref).eql('_root')
    expect(spy.args[0][2].type).eql('r')

    expect(spy.args[1][3].ref).eql(pureChildren[0].ref)
    expect(spy.args[1][3].type).eql('a')
    expect(spy.args[1][2]).eql('_root')
    expect(spy.args[1][4]).eql(-1)

    expect(spy.args[2][3].ref).eql(pureChildren[1].ref)
    expect(spy.args[2][3].type).eql('b')
    expect(spy.args[2][2]).eql('_root')
    expect(spy.args[2][4]).eql(-1)

    expect(spy.args[3][3].ref).eql(pureChildren[1].pureChildren[0].ref)
    expect(spy.args[3][3].type).eql('d')
    expect(spy.args[3][2]).eql(pureChildren[1].ref)
    expect(spy.args[3][4]).eql(-1)

    const tree = pureChildren[1].pureChildren[1]
    expect(spy.args[4][3].ref).eql(tree.ref)
    expect(spy.args[4][3].type).eql('e')
    expect(spy.args[4][2]).eql(pureChildren[1].ref)
    expect(spy.args[4][4]).eql(-1)
    expect(spy.args[4][3].children).eql([
      { ref: tree.pureChildren[0].ref, type: 'g', attr: {}, style: {}},
      { ref: tree.pureChildren[1].ref, type: 'h', attr: {}, style: {}},
      { ref: tree.pureChildren[2].ref, type: 'i', attr: {}, style: {}}])

    expect(spy.args[5][3].ref).eql(pureChildren[1].pureChildren[2].ref)
    expect(spy.args[5][3].type).eql('f')
    expect(spy.args[5][2]).eql(pureChildren[1].ref)
    expect(spy.args[5][4]).eql(-1)

    expect(spy.args[6][3].ref).eql(pureChildren[2].ref)
    expect(spy.args[6][3].type).eql('c')
    expect(spy.args[6][2]).eql('_root')
    expect(spy.args[6][4]).eql(-1)
  })
})
