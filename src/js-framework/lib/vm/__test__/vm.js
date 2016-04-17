import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
const expect = chai.expect
chai.use(sinonChai)

import Vm from '../'
import {Document, destroyDocument} from '../../app/dom'
import DomListener from '../../app/dom-listener'
import Differ from '../../app/differ'

describe('generate virtual dom for a single vm', () => {
  const spy = sinon.spy()
  var doc
  var customComponentMap
  var differ

  beforeEach(() => {
    differ = new Differ('test')
    doc = new Document('test')
    doc.setListener(new DomListener('test', function (actions) {
      actions.forEach((action) => {
        spy.apply(null, ['test', action.method].concat(action.args))
      })
    }))
    customComponentMap = {}
  })

  afterEach(() => {
    spy.reset()
    destroyDocument('test')
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

    var app = {doc, customComponentMap, differ}
    var vm = new Vm('foo', {_app: app})

    expect(vm._app).equal(app)
    expect(doc.body).is.an.object
    expect(doc.body.type).eql('container')
    expect(doc.body.attr).eql({a: 1, b: 2})
    expect(doc.body.style).eql({c: 3, d: 4})
    expect(doc.body.children).is.an.array
    expect(doc.body.children.length).eql(0)
  })

  it('generate an element tree', () => {

    customComponentMap.foo = {
      template: {
        type: 'container', attr: {a: 1, b: 2}, style: {c: 3, d: 4},
        children: [
          {type: 'image', attr: {src: '<some image url>'}},
          {type: 'text', attr: {value: '<some text content>'}}
        ]
      }
    }

    var app = {doc, customComponentMap, differ}
    var vm = new Vm('foo', {_app: app})

    expect(vm._app).equal(app)
    var el = doc.body
    expect(el.type).eql('container')
    expect(el.attr).eql({a: 1, b: 2})
    expect(el.style).eql({c: 3, d: 4})
    expect(el.children).is.an.array
    expect(el.children.length).eql(2)

    var image = el.children[0]
    var text = el.children[1]
    expect(image.type).eql('image')
    expect(image.attr).eql({src: '<some image url>'})
    expect(text.type).eql('text')
    expect(text.attr).eql({value: '<some text content>'})
  })

  it('generate an element tree with component options', () => {

    customComponentMap.foo = {
      template: {
        type: 'cell',
        children: [
          {type: 'text', attr: {value: '<some text content>'}}
        ]
      }
    }

    var app = {doc, customComponentMap, differ}
    var vm = new Vm('foo', {_app: app})

    expect(spy.firstCall.args[0]).to.be.equal('test')
    expect(spy.firstCall.args[1]).to.be.equal('createBody')
    expect(spy.firstCall.args[2]).to.deep.equal({
      ref: '_root',
      type: 'cell',
      attr: {},
      style: {},
      children: [{
        ref: '3',
        type: 'text',
        attr: {
          value: '<some text content>'
        },
        style: {}
      }]
    })

    expect(vm._app).equal(app)
    var el = doc.body
    expect(el.type).eql('cell')
    expect(el.children).is.an.array
    expect(el.children.length).eql(1)

    var text = el.children[0]
    expect(text.type).eql('text')
    expect(text.attr).eql({value: '<some text content>'})
  })

  it('generate an element tree with data binding', () => {

    customComponentMap.foo = {
      template: {
        type: 'container', attr: {a: 1, b: 2}, style: {c: 3, d: 4},
        children: [
          {type: 'image', attr: {src: function () {return this.x}}},
          {type: 'text', attr: {value: function () {return this.n}}},
          {type: 'text', attr: {value: function () {return this.m}}}
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

    var app = {doc, customComponentMap, differ}
    var vm = new Vm('foo', {_app: app})

    expect(vm._app).equal(app)
    expect(vm.x).eql('<some image url>')
    expect(vm.y).eql('<some text content>')
    expect(vm.n).eql('<SOME TEXT CONTENT>')
    expect(vm.m).eql('<SOME TEXT CONTENT>')

    var el = doc.body
    expect(el.type).eql('container')
    expect(el.attr).eql({a: 1, b: 2})
    expect(el.style).eql({c: 3, d: 4})
    expect(el.children).is.an.array
    expect(el.children.length).eql(3)

    var image = el.children[0]
    var text = el.children[1]
    var text2 = el.children[2]
    expect(image.type).eql('image')
    expect(image.attr).eql({src: '<some image url>'})
    expect(text.type).eql('text')
    expect(text.attr).eql({value: '<SOME TEXT CONTENT>'})
    expect(text2.type).eql('text')
    expect(text2.attr).eql({value: '<SOME TEXT CONTENT>'})

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
    expect(image.attr).eql({src: 'other string value'})

    vm.y = 'other string value'
    differ.flush()
    expect(el).equal(doc.body)
    expect(text).equal(el.children[1])
    expect(text.attr).eql({value: 'OTHER STRING VALUE'})
    expect(text2).equal(el.children[2])
    expect(text2.attr).eql({value: 'OTHER STRING VALUE'})

    vm.m = 'third string value'
    differ.flush()
    expect(vm.x).eql('other string value')
    expect(vm.y).eql('third string value')
    expect(vm.n).eql('THIRD STRING VALUE')
    expect(vm.m).eql('THIRD STRING VALUE')
    expect(el).equal(doc.body)
    expect(text).equal(el.children[1])
    expect(text.attr).eql({value: 'THIRD STRING VALUE'})
    expect(text2).equal(el.children[2])
    expect(text2.attr).eql({value: 'THIRD STRING VALUE'})
  })

  it('generate an element tree with shown', () => {

    customComponentMap.foo = {
      template: {
        type: 'container',
        children: [
          {type: 'prev'},
          {
            shown: function () {return this.y},
            type: 'image', attr: {src: function () {return this.x}}
          },
          {type: 'next'}
        ]
      },
      data: {
        x: '<some image url>', y: true
      }
    }

    var app = {doc, customComponentMap, differ}
    var vm = new Vm('foo', {_app: app})

    expect(vm._app).equal(app)
    expect(vm.x).eql('<some image url>')
    expect(vm.y).eql(true)

    var el = doc.body
    expect(el.type).eql('container')
    expect(el.children).is.an.array
    expect(el.children.length).eql(5)

    var prev = el.children[0]
    var starter = el.children[1]
    var image = el.children[2]
    var ender = el.children[3]
    var next = el.children[4]
    expect(prev.type).eql('prev')
    expect(starter.type).eql('comment')
    expect(ender.type).eql('comment')
    expect(next.type).eql('next')
    expect(image.type).eql('image')
    expect(image.attr).eql({src: '<some image url>'})

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
    image = el.children[2]
    expect(image.type).eql('image')
    expect(image.attr).eql({src: '<some image url>'})
    expect(ender).equal(el.children[3])
    expect(next).equal(el.children[4])
  })

  it('generate an element tree with repeat', () => {

    customComponentMap.foo = {
      template: {
        type: 'container',
        children: [
          {type: 'prev'},
          {
            repeat: function () {return this.list},
            type: 'image', attr: {src: function () {return this.x}}
          },
          {type: 'next'}
        ]
      },
      data: {
        x: '<some image url>',
        list: [
          {uid: 1, x: 1}, {uid: 2, x: 2}, {uid: 3}
        ]
      }
    }

    var app = {doc, customComponentMap, differ}
    var vm = new Vm('foo', {_app: app})

    expect(vm._app).equal(app)
    expect(vm.x).eql('<some image url>')
    expect(vm.list).eql([
      {uid: 1, x: 1, INDEX: 0},
      {uid: 2, x: 2, INDEX: 1},
      {uid: 3, INDEX: 2}])

    var el = doc.body
    expect(el.type).eql('container')
    expect(el.children).is.an.array
    expect(el.children.length).eql(7)

    var prev = el.children[0]
    var starter = el.children[1]
    var ender = el.children[5]
    var next = el.children[6]
    expect(prev.type).eql('prev')
    expect(starter.type).eql('comment')
    expect(ender.type).eql('comment')
    expect(next.type).eql('next')

    expect(el.children[2].type).eql('image')
    expect(el.children[2].attr).eql({src: 1})
    expect(el.children[3].type).eql('image')
    expect(el.children[3].attr).eql({src: 2})
    expect(el.children[4].type).eql('image')
    expect(el.children[4].attr).eql({src: '<some image url>'})

    vm.list[1].x = 3
    differ.flush()
    expect(el.children.length).eql(7)
    expect(el.children[2].attr).eql({src: 1})
    expect(el.children[3].attr).eql({src: 3})
    expect(el.children[4].attr).eql({src: '<some image url>'})

    vm.x = 'other string value'
    differ.flush()
    expect(el.children.length).eql(7)
    expect(el.children[2].attr).eql({src: 1})
    expect(el.children[3].attr).eql({src: 3})
    expect(el.children[4].attr).eql({src: 'other string value'})

    vm.list.push({uid: 4, x: 4})
    vm.list.push({uid: 5}, {uid: 6, x: 6})

    differ.flush()

    expect(el.children.length).eql(10)
    expect(el.children[2].attr).eql({src: 1})
    expect(el.children[3].attr).eql({src: 3})
    expect(el.children[4].attr).eql({src: 'other string value'})
    expect(el.children[5].attr).eql({src: 4})
    expect(el.children[6].attr).eql({src: 'other string value'})
    expect(el.children[7].attr).eql({src: 6})

    vm.list.splice(1, 2, {uid: 7, x: 7})
    differ.flush()

    expect(el.children.length).eql(9)
    expect(el.children[2].attr).eql({src: 1})
    expect(el.children[3].attr).eql({src: 7})
    expect(el.children[4].attr).eql({src: 4})
    expect(el.children[5].attr).eql({src: 'other string value'})
    expect(el.children[6].attr).eql({src: 6})
  })

  it('generate an element tree with shown and repeat', () => {

    customComponentMap.foo = {
      template: {
        type: 'container',
        children: [
          {type: 'prev'},
          {
            shown: function () {return this.x % 2 === 0},
            repeat: function () {return this.list},
            type: 'image', attr: {src: function () {return this.x}}
          },
          {type: 'next'}
        ]
      },
      data: {
        x: '<some image url>',
        list: [
          {uid: 1, x: 1}, {uid: 2, x: 2}, {uid: 3}
        ]
      }
    }

    var app = {doc, customComponentMap, differ}
    var vm = new Vm('foo', {_app: app})

    expect(vm._app).equal(app)
    expect(vm.x).eql('<some image url>')
    expect(vm.list).eql([
      {uid: 1, x: 1, INDEX: 0},
      {uid: 2, x: 2, INDEX: 1},
      {uid: 3, INDEX: 2}])

    var el = doc.body
    expect(el.type).eql('container')
    expect(el.children).is.an.array
    expect(el.children.length).eql(11)

    var prev = el.children[0]
    var next = el.children[10]
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
    expect(el.children[5].attr).eql({src: 2})
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
    expect(el.children[3].attr).eql({src: 4})
    expect(el.children[6].type).eql('image')
    expect(el.children[6].attr).eql({src: 2})
  })
})

describe('generate virtual dom for sub vm', () => {
  var doc
  var customComponentMap
  var differ

  beforeEach(() => {
    doc = new Document('test')
    customComponentMap = {}
    differ = new Differ('test')
  })

  afterEach(() => {
    destroyDocument('test')
  })

  it('generate sub elements', () => {
    customComponentMap.foo = {
      data: function () {
        return {
          showbar1: false,
          showbar2: false,
          bar2list: [{
            id: 'bar2-1'
          },{
            id: 'bar2-2'
          }]
        }
      },
      template: {
        type: 'container',
        children: [
          {type: 'bar', id: 'bar', component: true},
          {type: 'bar1',
            shown: function () {return this.showbar1},
            id: 'bar1', component: true
          },
          {type: 'bar2',
              shown: function () {return this.showbar2},
              repeat: function () {return this.bar2list},
              id: function () {return this.id},
              component: true
          }
        ]
      }
    }
    customComponentMap.bar = {
      template: {
        type: 'container',
        children: [{type: 'aaa'}, {type: 'bbb'}]
      }
    }
    customComponentMap.bar1 = {
      template: {
        type: 'container',
        children: [{type: 'aaaa'}, {type: 'bbbb'}]
      }
    }

    var app = {doc, customComponentMap, differ}
    var vm = new Vm('foo', {_app: app})


    expect(vm._app).equal(app)
    expect(vm._rootEl).to.deep.equal(vm._parentEl.children[0])

    expect(vm._childrenVms.length).to.be.equal(1)
    expect(vm._childrenVms[0]).to.deep.equal(vm._ids['bar'].vm)
    expect(vm._childrenVms[0]._rootEl).to.deep.equal(vm._ids['bar'].el)

    var el = doc.body
    expect(el.type).eql('container')
    expect(el.pureChildren).is.an.array
    expect(el.pureChildren.length).eql(1)

    var sub = el.children[0]
    expect(sub.type).eql('container')
    expect(sub.children).is.an.array
    expect(sub.children.length).eql(2)
    expect(sub.children[0].type).eql('aaa')
    expect(sub.children[1].type).eql('bbb')

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

  it('generate replaced sub element', () => {
    customComponentMap.foo = {
      template: {
        type: 'container',
        children: [{type: 'bar', component: true}]
      }
    }
    customComponentMap.bar = {
      replace: true,
      template: {
        type: 'container',
        children: [{type: 'aaa'}]
      }
    }

    var app = {doc, customComponentMap, differ}
    var vm = new Vm('foo', {_app: app})

    expect(vm._app).equal(app)
    var el = doc.body
    expect(el.type).eql('container')
    expect(el.children).is.an.array
    expect(el.children.length).eql(1)

    var aaa = el.children[0]
    expect(aaa.type).eql('aaa')
  })

  it('generate replaced sub elements', () => {
    customComponentMap.foo = {
      template: {
        type: 'container',
        children: [{type: 'bar', component: true}]
      }
    }
    customComponentMap.bar = {
      replace: true,
      template: {
        type: 'container',
        children: [{type: 'aaa'}, {type: 'bbb'}]
      }
    }

    var app = {doc, customComponentMap, differ}
    var vm = new Vm('foo', {_app: app})

    expect(vm._app).equal(app)
    var el = doc.body
    expect(el.type).eql('container')
    expect(el.children).is.an.array
    expect(el.children.length).eql(4)

    expect(el.children[0].type).eql('comment')
    var aaa = el.children[1]
    expect(aaa.type).eql('aaa')
    var bbb = el.children[2]
    expect(bbb.type).eql('bbb')
    expect(el.children[3].type).eql('comment')
  })

  it('generate sub elements with no props', () => {
    customComponentMap.foo = {
      template: {
        type: 'container',
        children: [{type: 'bar', component: true, attr: {x: 10, y: 20}}]
      }
    }
    customComponentMap.bar = {
      data: () => {
        return {x: 1, y: 2}
      },
      template: {
        type: 'container',
        children: [
          {type: 'aaa', attr: {a: function () {return this.x}}},
          {type: 'bbb', attr: {b: function () {return this.y}}}
        ]
      }
    }

    var app = {doc, customComponentMap, differ}
    var vm = new Vm('foo', {_app: app})

    expect(vm._app).equal(app)
    var el = doc.body
    expect(el.type).eql('container')
    expect(el.children).is.an.array
    expect(el.children.length).eql(1)

    var sub = el.children[0]
    var aaa = sub.children[0]
    expect(aaa.type).eql('aaa')
    expect(aaa.attr).eql({a: 10})
    var bbb = sub.children[1]
    expect(bbb.type).eql('bbb')
    expect(bbb.attr).eql({b: 20})
  })

  it('generate sub elements with array props', () => {
    customComponentMap.foo = {
      template: {
        type: 'container',
        children: [{type: 'bar', component: true, attr: {x: 10, y: 20}}]
      }
    }
    customComponentMap.bar = {
      props: ['x'],
      data: () => {
        return {x: 1, y: 2}
      },
      template: {
        type: 'container',
        children: [
          {type: 'aaa', attr: {a: function () {return this.x}}},
          {type: 'bbb', attr: {b: function () {return this.y}}}
        ]
      }
    }

    var app = {doc, customComponentMap, differ}
    var vm = new Vm('foo', {_app: app})

    expect(vm._app).equal(app)
    var el = doc.body
    expect(el.type).eql('container')
    expect(el.children).is.an.array
    expect(el.children.length).eql(1)

    var sub = el.children[0]
    var aaa = sub.children[0]
    expect(aaa.type).eql('aaa')
    expect(aaa.attr).eql({a: 10})
    var bbb = sub.children[1]
    expect(bbb.type).eql('bbb')
    expect(bbb.attr).eql({b: 2})
  })

  it('generate sub elements with props', () => {
    customComponentMap.foo = {
      template: {
        type: 'container',
        children: [{type: 'bar', component: true, attr: {x: 10, y: 20}}]
      }
    }
    customComponentMap.bar = {
      props: {x: Number},
      data: () => {
        return {x: 1, y: 2}
      },
      template: {
        type: 'container',
        children: [
          {type: 'aaa', attr: {a: function () {return this.x}}},
          {type: 'bbb', attr: {b: function () {return this.y}}}
        ]
      }
    }

    var app = {doc, customComponentMap, differ}
    var vm = new Vm('foo', {_app: app})

    expect(vm._app).equal(app)

    var el = doc.body
    expect(el.type).eql('container')
    expect(el.children).is.an.array
    expect(el.children.length).eql(1)

    var sub = el.children[0]
    var aaa = sub.children[0]
    expect(aaa.type).eql('aaa')
    expect(aaa.attr).eql({a: 10})
    var bbb = sub.children[1]
    expect(bbb.type).eql('bbb')
    expect(bbb.attr).eql({b: 2})
  })

  it('generate sub elements with data', () => {
    customComponentMap.foo = {
      data: () => {
        return {a: 10, b: 20}
      },
      template: {
        type: 'container',
        children: [{type: 'bar', component: true, attr: {
          x: function () {return this.a},
          y: function () {return this.b}
        }}]
      }
    }
    customComponentMap.bar = {
      props: {x: Number},
      data: () => {
        return {x: 1, y: 2}
      },
      template: {
        type: 'container',
        children: [
          {type: 'aaa', attr: {a: function () {return this.x}}},
          {type: 'bbb', attr: {b: function () {return this.y}}}
        ]
      }
    }

    var app = {doc, customComponentMap, differ}
    var vm = new Vm('foo', {_app: app})

    expect(vm._app).equal(app)

    var el = doc.body
    expect(el.type).eql('container')
    expect(el.children).is.an.array
    expect(el.children.length).eql(1)

    var sub = el.children[0]
    var aaa = sub.children[0]
    expect(aaa.type).eql('aaa')
    expect(aaa.attr).eql({a: 10})
    var bbb = sub.children[1]
    expect(bbb.type).eql('bbb')
    expect(bbb.attr).eql({b: 2})

    vm.a = 100
    vm.b = 200
    differ.flush()

    expect(el).equal(doc.body)
    expect(sub).equal(el.children[0])
    expect(aaa).equal(sub.children[0])
    expect(aaa.attr).eql({a: 100})
    expect(bbb).equal(sub.children[1])
    expect(bbb.attr).eql({b: 2})
  })

  it('generate sub elements with shown data', () => {
    customComponentMap.foo = {
      data: () => {
        return {a: 10, b: 20}
      },
      template: {
        type: 'container',
        children: [{type: 'bar', component: true, attr: {
          x: function () {return this.a},
          y: function () {return this.b}
        }, shown: function () {return this.a < 15}}]
      }
    }
    customComponentMap.bar = {
      props: {x: Number},
      data: () => {
        return {x: 1, y: 2}
      },
      template: {
        type: 'container',
        children: [
          {type: 'aaa', attr: {a: function () {return this.x}}},
          {type: 'bbb', attr: {b: function () {return this.y}}}
        ]
      }
    }

    var app = {doc, customComponentMap, differ}
    var vm = new Vm('foo', {_app: app})

    expect(vm._app).equal(app)

    var el = doc.body
    expect(el.type).eql('container')
    expect(el.children).is.an.array
    expect(el.children.length).eql(3)

    var sub = el.children[1]
    var aaa = sub.children[0]
    expect(aaa.type).eql('aaa')
    expect(aaa.attr).eql({a: 10})
    var bbb = sub.children[1]
    expect(bbb.type).eql('bbb')
    expect(bbb.attr).eql({b: 2})

    vm.a = 20
    differ.flush()

    expect(el).equal(doc.body)
    expect(el.children).is.an.array
    expect(el.children.length).eql(2)
  })

  it('generate sub elements with repeat data', () => {
    customComponentMap.foo = {
      data: () => {
        return {list: [{uid: 1, a: 1}, {uid: 2, a: 2}, {uid: 3, a: 3}]}
      },
      template: {
        type: 'container',
        children: [{type: 'bar', component: true, attr: {
          x: function () {return this.a},
          y: function () {return this.b}
        }, repeat: function () {return this.list}}]
      }
    }
    customComponentMap.bar = {
      props: {x: Number},
      data: () => {
        return {x: 1, y: 2}
      },
      template: {
        type: 'container',
        children: [
          {type: 'aaa', attr: {a: function () {return this.x}}},
          {type: 'bbb', attr: {b: function () {return this.y}}}
        ]
      }
    }

    var app = {doc, customComponentMap, differ}
    var vm = new Vm('foo', {_app: app})

    expect(vm._app).equal(app)

    var el = doc.body
    expect(el.type).eql('container')
    expect(el.children).is.an.array
    expect(el.children.length).eql(5)

    var sub1 = el.children[1]
    var aaa1 = sub1.children[0]
    expect(aaa1.type).eql('aaa')
    expect(aaa1.attr).eql({a: 1})
    var bbb1 = sub1.children[1]
    expect(bbb1.type).eql('bbb')
    expect(bbb1.attr).eql({b: 2})

    var sub2 = el.children[2]
    var aaa2 = sub2.children[0]
    expect(aaa2.type).eql('aaa')
    expect(aaa2.attr).eql({a: 2})
    var bbb2 = sub2.children[1]
    expect(bbb2.type).eql('bbb')
    expect(bbb2.attr).eql({b: 2})

    var sub3 = el.children[3]
    var aaa3 = sub3.children[0]
    expect(aaa3.type).eql('aaa')
    expect(aaa3.attr).eql({a: 3})
    var bbb3 = sub3.children[1]
    expect(bbb3.type).eql('bbb')
    expect(bbb3.attr).eql({b: 2})
  })

  it('generate sub elements with content', () => {
    customComponentMap.foo = {
      template: {
        type: 'container',
        children: [{type: 'bar', component: true, children: [
          {type: 'a'}, {type: 'b', attr: {bbb: function () {return this.x}}}
        ]}]
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
        children: [{type: 'aaa'}, {type: 'content'}, {type: 'bbb'}]
      }
    }

    var app = {doc, customComponentMap, differ}
    var vm = new Vm('foo', {_app: app})

    var el = doc.body

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
    expect(el.pureChildren[2].attr).eql({bbb: 1})
    expect(el.pureChildren[3].type).eql('bbb')

    vm.x = 10
    differ.flush()
    expect(el.pureChildren[2].attr).eql({bbb: 10})
  })

  it('generate sub elements with external data', () => {
    customComponentMap.foo = {
      data: () => {
        return {a: 10, b: 20}
      },
      template: {
        type: 'container',
        attr: {
          x: function () {return this.a},
          y: function () {return this.b}
        }
      }
    }

    var app = {doc, customComponentMap, differ}
    var vm = new Vm('foo', {_app: app}, null, {a: 1000})

    expect(vm._app).equal(app)

    var el = doc.body
    expect(el.type).eql('container')
    expect(el.attr).eql({x: 1000, y: 20})

    vm.a = 100
    vm.b = 200
    differ.flush()

    expect(el).equal(doc.body)
    expect(el.attr).eql({x: 100, y: 200})
  })
})

describe('generate dom actions', () => {
  var doc, app, listener, spy, customComponentMap, differ

  function checkReady(vm, handler) {
    if (vm._ready) {
      handler()
    }
    else {
      vm.$on('hook:ready', handler)
    }
  }

  beforeEach(() => {
    doc = new Document('foo')
    differ = new Differ('foo')
    spy = sinon.spy()
    listener = new DomListener('bar', function (actions) {
      actions.forEach((action) => {
        spy.apply(null, ['bar', action.method].concat(action.args))
      })
    })
    doc.setListener(listener)
    doc.setEventManager({
      add: sinon.spy()
    })
    customComponentMap = {}
    app = {doc, customComponentMap, differ}
  })

  afterEach(() => {
    app = doc = listener = spy = null
    customComponentMap = {}
    destroyDocument('test')
  })

  it('received create body and add element actions', () => {
    var handler = sinon.spy()

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
        events: {click: 'handleClick'}
      },
      style: {
        classA: {d: 5, e: 6}
      },
      methods: {
        handleClick: handler
      }
    }

    var vm = new Vm('foo', {_app: app})
    var el = {
      ref: '_root',
      type: 'container',
      attr: {a: 1, b: 2}, style: {c: 3, d: 4, e: 6},
      event: ['click']
    }

    expect(spy.args.length).eql(1)
    expect(spy.args[0]).eql(['bar', 'createBody', el])

    expect(doc.eventManager.add.args.length).eql(1)
    expect(doc.eventManager.add.args[0][0].ref).eql('_root')
    expect(doc.eventManager.add.args[0][1]).eql('click')
    expect(doc.eventManager.add.args[0][2]).is.a.function

    expect(handler.args.length).eql(0)
    doc.eventManager.add.args[0][2]()
    expect(handler.args.length).eql(1)
  })

  it('received actions for a template with if & repeat', () => {

    customComponentMap.foo = {
      template: {
        type: 'container',
        children: [
          {type: 'prev'},
          {
            shown: function () {return this.x % 2 === 0},
            repeat: function () {return this.list},
            type: 'image', attr: {src: function () {return this.x}}
          },
          {type: 'next'}
        ]
      },
      data: {
        x: '<some image url>',
        list: [
          {uid: 1, x: 1}, {uid: 2, x: 2}, {uid: 3}
        ]
      }
    }

    var vm = new Vm('foo', {_app: app})
    var el = {ref: '_root', type: 'container', attr: {}, style: {}}
    var prev = {ref: '3', type: 'prev', attr: {}, style: {}}
    var img = {ref: '10', type: 'image', attr: { src: 2 }, style: {}}
    var next = {ref: '13', type: 'next', attr: {}, style: {}}

    expect(spy.args.length).eql(4)
    expect(spy.args[0]).eql(['bar', 'createBody', el])
    expect(spy.args[1]).eql(['bar', 'addElement', '_root', prev, -1])
    expect(spy.args[2]).eql(['bar', 'addElement', '_root', img, 1])
    expect(spy.args[3]).eql(['bar', 'addElement', '_root',next,  -1])

    vm.list[1].x = 3
    differ.flush()

    // [1, 3, undefined]
    expect(spy.args.length).eql(5)
    expect(spy.args[4]).eql(['bar', 'removeElement', '10'])

    vm.list[1].x = 12
    differ.flush()

    // [1, !12, undefined]
    expect(spy.args.length).eql(6)
    img.ref = '14'
    img.attr.src = 12
    expect(spy.args[5]).eql(['bar', 'addElement', '_root', img, 1])

    vm.x = 'other string value'
    differ.flush()

    expect(spy.args.length).eql(6)

    vm.list.push({uid: 4, x: 4})
    vm.list.push({uid: 5}, {uid: 6, x: 6})
    differ.flush()

    // [1, !12, undefined, !4, undefined, !6]
    var img2 = {ref: '17', type: 'image', attr: { src: 4 }, style: {}}
    var img3 = {ref: '22', type: 'image', attr: { src: 6 }, style: {}}
    expect(spy.args.length).eql(8)
    expect(spy.args[6]).eql(['bar', 'addElement', '_root', img2, 2])
    expect(spy.args[7]).eql(['bar', 'addElement', '_root', img3, 3])

    var temp1 = vm.list[1] // 12
    var temp2 = vm.list[5] // 6
    // vm.list.splice(0, 6, temp2, {uid: 7, x: 7}, temp1)
    vm.list = []
    vm.list.push(temp2, {uid: 7, x: 7}, temp1)
    differ.flush()

    // [!6, 7, !12]
    expect(spy.args.length).eql(10)
    expect(spy.args[8]).eql(['bar', 'removeElement', '17'])
    expect(spy.args[9]).eql(['bar', 'moveElement', '22', '_root', 1])
  })

  it('received actions for element updates', () => {

    customComponentMap.foo = {
      template: {
        type: 'container', attr: {a: 1, b: 2}, style: {c: 3, d: 4},
        children: [
          {type: 'image', attr: {src: function () {return this.x}}},
          {type: 'text', attr: {value: function () {return this.y}}}
        ]
      },
      data: {
        x: '<some image url>', y: '<some text content>'
      }
    }

    var vm = new Vm('foo', {_app: app})
    var length = spy.args.length

    vm.x = '<some image url>'
    differ.flush()
    expect(spy.args.length - length).eql(0)

    vm.x = 'other string value'
    differ.flush()
    var change = ['bar', 'updateAttrs', '3', {src: 'other string value'}]
    expect(spy.args.length - length).eql(1)
    expect(spy.args[length]).eql(change)
  })

  it('received no action when no virtual dom different', () => {

    customComponentMap.foo = {
      template: {
        type: 'container', children: [
          {
            type: 'text',
            shown: function () {return this.name.length > 3},
            attr: {
              value: function () {return this.name.toUpperCase()}
            }
          }
        ]
      },
      data: {
        name: 'Mike'
      }
    }

    var vm = new Vm('foo', {_app: app})
    var length = spy.args.length

    expect(doc.body.pureChildren.length).eql(1)
    var text = doc.body.pureChildren[0]
    expect(text.attr.value).eql('MIKE')

    var initCalls = spy.args.length

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
      'bar', 'updateAttrs', text.ref, {value: 'STEVE'}])

    vm.name = 'Steve'
    differ.flush()

    expect(spy.args.length).eql(initCalls + 1)
  })

  it('received actions for components', () => {

    customComponentMap.foo = {
      template: {
        type: 'container',
        children: [{type: 'bar', component: true}]
      }
    }
    customComponentMap.bar = {
      template: {
        type: 'container',
        children: [{type: 'aaa'}, {type: 'bbb'}]
      }
    }

    var vm = new Vm('foo', {_app: app})
    expect(spy.args.length).eql(4)
    var el = {ref: '_root', type: 'container', attr: {}, style: {}}
    expect(spy.args[0]).eql(['bar', 'createBody', el])
    el = {ref: '3', type: 'container', attr: {}, style: {}}
    expect(spy.args[1]).eql(['bar', 'addElement', '_root', el, -1])
    el = {ref: '4', type: 'aaa', attr: {}, style: {}}
    expect(spy.args[2]).eql(['bar', 'addElement', '3', el, -1])
    el = {ref: '5', type: 'bbb', attr: {}, style: {}}
    expect(spy.args[3]).eql(['bar', 'addElement', '3', el, -1])
  })

  it('received actions for complicated components', () => {

    customComponentMap.foo = {
      data: () => {
        return {list: [{uid: 1, a: 1}, {uid: 2, a: 2}, {uid: 3, a: 3}]}
      },
      template: {
        type: 'container',
        children: [{type: 'bar', component: true, attr: {
          x: function () {return this.a},
          y: function () {return this.b}
        }, repeat: function () {return this.list}}]
      }
    }
    customComponentMap.bar = {
      props: {x: Number},
      data: () => {
        return {x: 1, y: 2}
      },
      template: {
        type: 'container',
        children: [
          {type: 'aaa', attr: {a: function () {return this.x}}},
          {type: 'bbb', attr: {b: function () {return this.y}}}
        ]
      }
    }

    var vm = new Vm('foo', {_app: app})

    // jscs:disable
    // expect(spy.args[0]).eql([ 'bar', 'createBody', 'container' ])
    expect(spy.args[0]).eql([ 'bar', 'createBody', { ref: '_root', type: 'container', attr: {}, style: {} }])
      expect(spy.args[1]).eql([ 'bar', 'addElement', '_root', { ref: '5', type: 'container', attr: {}, style: {} }, 0 ])
        expect(spy.args[2]).eql([ 'bar', 'addElement', '5', { ref: '6', type: 'aaa', attr: {a: 1}, style: {} }, -1 ])
        expect(spy.args[3]).eql([ 'bar', 'addElement', '5', { ref: '7', type: 'bbb', attr: {b: 2}, style: {} }, -1 ])
      expect(spy.args[4]).eql([ 'bar', 'addElement', '_root', { ref: '8', type: 'container', attr: {}, style: {} }, 1 ])
        expect(spy.args[5]).eql([ 'bar', 'addElement', '8', { ref: '9', type: 'aaa', attr: {a: 2}, style: {} }, -1 ])
        expect(spy.args[6]).eql([ 'bar', 'addElement', '8', { ref: '10', type: 'bbb', attr: {b: 2}, style: {} }, -1 ])
      expect(spy.args[7]).eql([ 'bar', 'addElement', '_root', { ref: '11', type: 'container', attr: {}, style: {} }, 2 ])
        expect(spy.args[8]).eql([ 'bar', 'addElement', '11', { ref: '12', type: 'aaa', attr: {a: 3}, style: {} }, -1 ])
        expect(spy.args[9]).eql([ 'bar', 'addElement', '11', { ref: '13', type: 'bbb', attr: {b: 2}, style: {} }, -1 ])
    // jscs:enable
  })

  it('received actions for add a tree element', () => {

    customComponentMap.foo = {
      template: {
        type: 'r',
        children: [
          {type: 'a'}, {type: 'b', children: [
            {type: 'd'}, {type: 'e', append: 'tree', children: [
              {type: 'g'}, {type: 'h'}, {type: 'i'}
            ]}, {type: 'f'}
          ]}, {type: 'c'}
        ]
      }
    }

    var vm = new Vm('foo', {_app: app})

    expect(spy.args.length).eql(7)
    // body, r, r.a, r.b, r.b.d, r.b.e(tree), r.b.f, r.c

    expect(spy.args[0][2].ref).eql('_root')
    expect(spy.args[0][2].type).eql('r')

    expect(spy.args[1][3].ref).eql('3')
    expect(spy.args[1][3].type).eql('a')
    expect(spy.args[1][2]).eql('_root')
    expect(spy.args[1][4]).eql(-1)

    expect(spy.args[2][3].ref).eql('4')
    expect(spy.args[2][3].type).eql('b')
    expect(spy.args[2][2]).eql('_root')
    expect(spy.args[2][4]).eql(-1)

    expect(spy.args[3][3].ref).eql('5')
    expect(spy.args[3][3].type).eql('d')
    expect(spy.args[3][2]).eql('4')
    expect(spy.args[3][4]).eql(-1)

    expect(spy.args[4][3].ref).eql('6')
    expect(spy.args[4][3].type).eql('e')
    expect(spy.args[4][2]).eql('4')
    expect(spy.args[4][4]).eql(-1)
    expect(spy.args[4][3].children).eql([
      {ref: '7', type: 'g', attr: {}, style: {}},
      {ref: '8', type: 'h', attr: {}, style: {}},
      {ref: '9', type: 'i', attr: {}, style: {}}])

    expect(spy.args[5][3].ref).eql('10')
    expect(spy.args[5][3].type).eql('f')
    expect(spy.args[5][2]).eql('4')
    expect(spy.args[5][4]).eql(-1)

    expect(spy.args[6][3].ref).eql('11')
    expect(spy.args[6][3].type).eql('c')
    expect(spy.args[6][2]).eql('_root')
    expect(spy.args[6][4]).eql(-1)
  })

  it.skip('connected with native callback when init', function (done) {
    this.timeout(5000)

    var lastTime = 0

    doc.listener = new DomListener('bar', function (actions, cb) {
      var now = Date.now()
      var timeDiff = now - lastTime
      actions.forEach((action) => {
        spy.apply(null, [timeDiff, action.method].concat(action.args))
      })
      lastTime = now
      setTimeout(cb, 300)
    })

    customComponentMap.foo = {
      template: {
        type: 'r',
        children: [
          {type: 'a'}, {type: 'b', children: [
            {type: 'd'}, {type: 'e', append: 'tree', children: [
              {type: 'g'}, {type: 'h'}, {type: 'i'}
            ]}, {type: 'f'}
          ]}, {type: 'c'}
        ]
      }
    }

    var vm = new Vm('foo', {_app: app})

    checkReady(vm, () => {
      expect(spy.args.length).eql(7)
      spy.args.slice(1).forEach((callArgs) => {
        expect(callArgs[0]).within(250, 400)
      })
      done()
    })
  })

  it.skip('connected with native callback after data changes', function (done) {
    this.timeout(5000)

    var lastTime = 0

    doc.listener = new DomListener('bar', function (actions, cb) {
      var now = Date.now()
      var timeDiff = now - lastTime
      actions.forEach((action) => {
        spy.apply(null, [timeDiff, action.method].concat(action.args))
      })
      lastTime = now
      setTimeout(cb, 300)
    })

    customComponentMap.foo = {
      template: {
        type: 'r',
        children: [
          {type: 'a', attr: {b: function () {return this.x}}}
        ]
      },
      data: () => {
        return {x: 1}
      }
    }

    var vm = new Vm('foo', {_app: app})

    checkReady(vm, () => {

      expect(spy.args.length).eql(2)
      doc.close()

      vm.x = 2

      expect(spy.args.length).eql(2)
      expect(doc.listener.updates.length).eql(1)
      expect(doc.listener.updates[0]).eql({
        module: 'dom',
        method: 'updateAttrs',
        args: ['3', {b: 2}]
      })

      done()
    })
  })
})
