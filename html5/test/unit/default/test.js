/*eslint no-eval: "off"*/

// document

function Document () {
  this.refs = {}
}

Document.prototype.createBody = function (config) {
  const doc = this
  const body = this.body = new Element(config)
  this.refs._root = this.body
  if (config.children) {
    config.children.forEach(function (child) {
      appendToDoc(doc, child, body.ref, -1)
    })
  }
}

Document.prototype.addElement = function (parentRef, config, index) {
  appendToDoc(this, config, parentRef, index)
}

function appendToDoc (doc, config, parentRef, index) {
  const parent = doc.refs[parentRef]

  const el = new Element(config)
  doc.refs[el.ref] = el
  el.parentRef = parentRef

  if (index < 0) {
    parent.children.push(el)
  }
  else {
    parent.children.splice(index, 0, el)
  }

  if (config.children) {
    config.children.forEach(function (child) {
      appendToDoc(doc, child, el.ref, -1)
    })
  }
}

Document.prototype.moveElement = function (ref, parentRef, index) {
  const el = this.refs[ref]
  const oldParent = this.refs[el.parentRef]
  const oldIndex = oldParent.children.indexOf(el)

  const parent = this.refs[parentRef]

  if (parent === oldParent && oldIndex <= index) {
    index = index - 1
  }

  oldParent.children.splice(oldIndex, 1)
  parent.children.splice(index, 0, el)
  el.parentRef = parentRef
}

Document.prototype.removeElement = function (ref) {
  removeEl(this, ref)
}

function removeEl (doc, ref) {
  const el = doc.refs[ref]
  const parent = doc.refs[el.parentRef]
  const index = parent.children.indexOf(el)
  const children = el.children || []
  parent.children.splice(index, 1)
  delete doc.refs[ref]
  children.forEach(function (child) {
    removeEl(doc, child.ref)
  })
}

Document.prototype.addEvent = function (ref, type) {
  const el = this.refs[ref]
  const index = el.event.indexOf(type)
  if (index < 0) {
    el.event.push(type)
  }
}

Document.prototype.removeEvent = function (ref, type) {
  const el = this.refs[ref]
  const index = el.event.indexOf(type)
  if (index >= 0) {
    el.event.splice(index, 1)
  }
}

Document.prototype.toJSON = function () {
  const body = this.refs._root
  if (body) {
    return body.toJSON()
  }
  return {}
}

function Element (config) {
  this.ref = config.ref
  this.parentRef = config.parentRef
  this.type = config.type
  this.attr = config.attr || {}
  this.style = config.style || {}
  this.event = config.event || []
  this.children = [] // todo children
}

Element.prototype.toJSON = function () {
  const result = { type: this.type }
  if (Object.keys(this.attr).length > 0) {
    result.attr = this.attr
  }
  if (Object.keys(this.style).length > 0) {
    result.style = this.style
  }
  if (this.event.length > 0) {
    result.event = this.event
  }
  if (this.children.length > 0) {
    result.children = this.children.map(function (child) {
      return child.toJSON()
    })
  }

  return result
}

exports.Document = Document

// fs

const fs = require('fs')
const path = require('path')

function readInput (name) {
  const readpath = path.join(__dirname, './assets', name + '.input')
  return fs.readFileSync(readpath, 'utf8')
}

function readOutput (name) {
  const readpath = path.join(__dirname, './assets', name + '.output')
  return fs.readFileSync(readpath, 'utf8')
}

// main
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')

import framework from '../../../runtime'
import { subversion } from '../../../../package.json'

Object.assign(global, framework, {
  frameworkVersion: subversion.native,
  needTransformerVersion: subversion.transformer
})

/**
 * register modules & methods
 */
const modules = require('../../../default/api/modules')
const methods = require('../../../default/api/methods')
framework.registerModules(modules)
framework.registerMethods(methods)

const expect = chai.expect
chai.use(sinonChai)

const allDocs = {}

const callNativeSpy = sinon.spy()
function _callNative (name, tasks, cbId) {
  callNativeSpy(tasks)

  const doc = allDocs[name]
  tasks.forEach(function (task) {
    if (task.module === 'dom') {
      if (doc[task.method]) {
        doc[task.method].apply(doc, task.args)
      }
    }
  })
  if (cbId >= 0) {
    setTimeout(() => {
      framework.callJS(name, [{ method: 'callback', args: [cbId, null, true] }])
    }, 16)
  }
}

global.callNative = function () {}

describe('test input and output', function () {
  const oriCallNative = global.callNative

  before(() => {
    sinon.stub(console, 'info')
    sinon.stub(console, 'warn')
    sinon.stub(console, 'error')
  })

  after(() => {
    console.info.restore()
    console.warn.restore()
    console.error.restore()
  })

  beforeEach(function () {
    callNativeSpy.reset()
    global.callNative = _callNative
  })

  afterEach(function () {
    global.callNative = oriCallNative
  })

  it('single case', function () {
    const name = 'foo'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('foo2 case', function () {
    const name = 'foo2'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('foo3 case', function () {
    const name = 'foo3'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('foo4 case', function () {
    const name = 'foo4'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('foo5 case', function () {
    const name = 'foo5'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('foo6 case', function () {
    const name = 'foo6'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('foo7 case', function () {
    const name = 'foo7'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('foo8 case', function () {
    const name = 'foo8'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('foo9 case', function () {
    const name = 'foo9'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('computed case', function () {
    const name = 'computed'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.refreshInstance(name, { x: 10 })
    expected.children[0].attr.value = 12
    expected.children[1].attr.value = 12
    expect(actual).eql(expected)

    framework.refreshInstance(name, { m: 10 })
    expected.children[0].attr.value = 20
    expected.children[1].attr.value = 20
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('computed in repeat case', function () {
    const name = 'computed-in-repeat'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('backward(register/render) case', function () {
    const name = 'backward1'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('backward(define/require) case', function () {
    const name = 'backward2'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('append case', function () {
    const name = 'append'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('append-root case', function () {
    const name = 'append-root'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('if case', function () {
    const name = 'if'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('repeat with index case', function () {
    const name = 'repeat-index'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('repeat with array no-kv case', function () {
    const name = 'repeat-array-no-kv'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('repeat with array v case', function () {
    const name = 'repeat-array-v'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('repeat with array kv case', function () {
    const name = 'repeat-array-kv'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('repeat with array track-by case', function () {
    const name = 'repeat-track-by'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    framework.refreshInstance(name, {
      titlelist: [
        { text: 'Hello World2' },
        { text: 'Hello World1' }
      ]
    })
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('repeat with array non-obj case', function () {
    const name = 'repeat-array-non-obj'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('repeat-watch case', function () {
    const name = 'repeat-watch'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('if-refresh case', function () {
    const name = 'if-refresh'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    framework.refreshInstance(name, { showTitle: false })
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('if-repeat case', function () {
    const name = 'if-repeat'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('if-repeat-refresh case', function () {
    const name = 'if-repeat-refresh'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    framework.refreshInstance(name, {
      titlelist: [
        { showTitle: false, title: 'Hello World1' },
        { showTitle: true, title: 'Hello World2' },
        { showTitle: true, title: 'Hello World3' }
      ]
    })
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('dynamic type case', function () {
    const name = 'dynamic-type'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('click case', function () {
    const name = 'click'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.callJS(name, [{
      method: 'fireEvent',
      args: [doc.body.children[0].ref, 'click', {}]
    }])

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('inline click case', function () {
    const name = 'inline-click'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()

    expect(actual).eql(expected)

    framework.callJS(name, [{
      method: 'fireEvent',
      args: [doc.body.children[0].ref, 'click', {}]
    }])

    expected.children[0].attr.value = 'Hello World2'
    expect(doc.toJSON()).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('bind subvm', function () {
    const name = 'subvm'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('components options', function () {
    const name = 'components'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('refresh twice', function () {
    const name = 'refresh2'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    let actual = doc.toJSON()
    expect(actual).eql({
      type: 'container'
    })

    framework.refreshInstance(name, { ext: { showbar1: false }})
    framework.refreshInstance(name, { ext: { showbar1: true }})
    const expected = eval('(' + outputCode + ')')
    actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('require 3rd', () => {
    const name = 'require'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('a correct transformer version', () => {
    const name = 'transformer1'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('a less wrong transformer version', () => {
    const name = 'transformer2'
    const inputCode = readInput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    const result = framework.createInstance(name, inputCode)
    expect(result).to.be.an.instanceof(Error)
    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('a bigger wrong transformer version', () => {
    const name = 'transformer3'
    const inputCode = readInput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    const result = framework.createInstance(name, inputCode)
    expect(result).to.be.an.instanceof(Error)
    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('change data when created', function () {
    const name = 'created'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('change data when ready', function () {
    const name = 'ready'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    const actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('input binding', function () {
    const name = 'input-binding'
    const inputCode = readInput(name)
    const outputCode = readOutput(name)
    const doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    const expected = eval('(' + outputCode + ')')
    let actual = doc.toJSON()
    expect(actual).eql(expected)

    expected.children[0].attr.value = 'abcdefg'
    framework.callJS(name, [{
      method: 'fireEvent',
      args: [
        doc.body.children[0].ref,
        'change',
        {},
        { attrs: { value: 'abcdefg' }}
      ]
    }])

    expected.children.push({ type: 'text', attr: { value: '1 - abcdefg' }})
    actual = doc.toJSON()
    expect(actual).eql(expected)

    expected.children[0].attr.value = '12345'
    framework.callJS(name, [{
      method: 'fireEvent',
      args: [
        doc.body.children[0].ref,
        'change',
        {},
        { attrs: { value: '12345' }}
      ]
    }])

    expected.children.push({ type: 'text', attr: { value: '2 - 12345' }})
    actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })
})
