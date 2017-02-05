import { expect } from 'chai'

import vanilla from '../../../frameworks/vanilla'
import runtime from '../../../runtime'

// clear ref property in vdom
function clearRefs (json) {
  delete json.ref
  if (json.children) {
    json.children.forEach(clearRefs)
  }
}

describe('vanilla test', () => {
  it('standard APIs', () => {
    expect(vanilla.init).to.be.a('function')
    expect(vanilla.registerComponents).to.be.a('function')
    expect(vanilla.registerModules).to.be.a('function')
    expect(vanilla.registerMethods).to.be.a('function')
    expect(vanilla.prepareInstance).to.be.a('function')
    expect(vanilla.createInstance).to.be.a('function')
    expect(vanilla.refreshInstance).to.be.a('function')
    expect(vanilla.destroyInstance).to.be.a('function')
    expect(vanilla.getRoot).to.be.a('function')
    expect(vanilla.receiveTasks).to.be.a('function')
  })

  it('empty functions', () => {
    expect(vanilla.registerComponents()).to.be.undefined
    expect(vanilla.registerModules()).to.be.undefined
    expect(vanilla.registerMethods()).to.be.undefined
    expect(vanilla.prepareInstance()).to.be.undefined
    expect(vanilla.refreshInstance()).to.be.undefined
  })

  it('create & destroy instance', () => {
    const id = 'basic-demo'
    vanilla.init(runtime.config)
    vanilla.createInstance(id, `
      var body = document.createBody()
      var div = document.createElement('div')
      body.appendChild(div)
    `, {})
    vanilla.destroyInstance(id)
  })

  it('getRoot', () => {
    const id = 'sample-demo'
    const code = `
      var body = document.createBody()
      var div = document.createElement('div')
      div.setStyle('color', 'red')
      var span = document.createElement('span')
      span.setAttr('value', 'text node')
      div.appendChild(span)
      body.appendChild(div)
    `
    vanilla.init(runtime.config)
    vanilla.createInstance(id, code, {})

    const vdom = vanilla.getRoot(id)
    clearRefs(vdom)
    expect(vdom).to.deep.equal({
      // ref: '_root',
      type: 'div',
      attr: {},
      style: {},
      children: [
        {
          // ref: '8',
          type: 'div',
          attr: {},
          style: {
            color: 'red'
          },
          children: [
            {
              // ref: '9',
              type: 'span',
              attr: {
                value: 'text node'
              },
              style: {}
            }
          ]
        }
      ]
    })

    vanilla.destroyInstance(id)
  })

  describe('receiveTasks', () => {
    const id = 'task-demo'

    before(() => {
      vanilla.init(runtime.config)
      vanilla.createInstance(id, `
        var body = document.createBody()
        body.addEvent('click', function() {
          this.setStyle('width', '200')
        })
        document.addCallback(function(message) {
          body.setAttr('from', message)
        })
        `, {})
    })

    after(() => {
      vanilla.destroyInstance(id)
    })

    it('initial state', () => {
      // initial style and attr in empty
      expect(vanilla.getRoot(id).style).to.deep.equal({})
      expect(vanilla.getRoot(id).attr).to.deep.equal({})

      // empty task
      vanilla.receiveTasks(id, [])
    })

    it('invalid tasks', () => {
      vanilla.receiveTasks('invalid id', [])
      vanilla.receiveTasks(id, {})
      vanilla.receiveTasks(id, [{
        method: 'whatever',
        args: []
      }])
    })

    it('fireEvent', () => {
      vanilla.receiveTasks(id, [{
        method: 'fireEvent',
        args: ['_root', 'click']
      }])
      expect(vanilla.getRoot(id).style).to.deep.equal({ width: '200' })
    })

    it('callback', () => {
      vanilla.receiveTasks(id, [{
        method: 'callback',
        args: ['1', 'callback']
      }])
      expect(vanilla.getRoot(id).attr).to.deep.equal({ from: 'callback' })

      // last callback
      vanilla.receiveTasks(id, [{
        method: 'callback',
        args: ['1', 'last message', true]
      }])
      expect(vanilla.getRoot(id).attr).to.deep.equal({ from: 'last message' })
    })
  })
})
