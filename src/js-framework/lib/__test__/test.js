// document

function Document() {
  this.refs = {}
}

Document.prototype.createBody = function (config) {
  var doc = this
  var body = this.body = new Element(config)
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

function appendToDoc(doc, config, parentRef, index) {
  var parent = doc.refs[parentRef]

  var el = new Element(config)
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
  var el = this.refs[ref]
  var oldParent = this.refs[el.parentRef]
  var oldIndex = oldParent.children.indexOf(el)

  var parent = this.refs[parentRef]

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

function removeEl(doc, ref) {
  var el = doc.refs[ref]
  var parent = doc.refs[el.parentRef]
  var index = parent.children.indexOf(el)
  var children = el.children || []
  parent.children.splice(index, 1)
  delete doc.refs[ref]
  children.forEach(function (child) {
    removeEl(doc, child.ref)
  })
}

Document.prototype.addEvent = function (ref, type) {
  var el = this.refs[ref]
  var index = el.event.indexOf(type)
  if (index < 0) {
    el.event.push(type)
  }
}

Document.prototype.removeEvent = function (ref, type) {
  var el = this.refs[ref]
  var index = el.event.indexOf(type)
  if (index >= 0) {
    el.event.splice(index, 1)
  }
}

Document.prototype.toJSON = function () {
  var body = this.refs._root
  if (body) {
    return body.toJSON()
  }
  return {}
}

function Element(config) {
  this.ref = config.ref
  this.parentRef = config.parentRef
  this.type = config.type
  this.attr = config.attr || {}
  this.style = config.style || {}
  this.event = config.event || []
  this.children = [] // todo children
}

Element.prototype.toJSON = function () {
  var result = {type: this.type}
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

var fs = require('fs')
var path = require('path')

function readInput(name) {
  var readpath = path.join(__dirname, './assets', name + '.input')
  return fs.readFileSync(readpath, 'utf8')
}

function readOutput(name) {
  var readpath = path.join(__dirname, './assets', name + '.output')
  return fs.readFileSync(readpath, 'utf8')
}

// main
var chai = require('chai')
var sinon = require('sinon')
var sinonChai = require('sinon-chai')

var framework = require('../framework')
var pkg = require('../../package.json')

Object.assign(global, framework, {
  frameworkVersion: pkg.version,
  needTransformerVersion: pkg.optionalDependencies['weex-transformer']
})

/**
 * register modules & methods
 */
var modules = require('../api/modules')
var methods = require('../api/methods')
framework.registerModules(modules)
framework.registerMethods(methods)

var expect = chai.expect
chai.use(sinonChai)

var allDocs = {}

var callNativeSpy = sinon.spy()
function _callNative(name, tasks, cbId) {
  callNativeSpy(tasks)

  var doc = allDocs[name]
  tasks.forEach(function (task) {
    if (task.module === 'dom') {
      if (doc[task.method]) {
        doc[task.method].apply(doc, task.args)
      }
    }
  })
  if (cbId >= 0) {
    setTimeout(() => {
      framework.callJS(name, [{method: 'callback', args: [cbId, null, true]}])
    }, 16)
  }
}

describe('test input and output', function () {

  beforeEach(function () {
    callNativeSpy.reset()
    global.callNative = _callNative
  })

  afterEach(function () {
    delete global.callNative
  })

  it('single case', function () {
    var name = 'foo'
    var inputCode = readInput(name)
    var outputCode = readOutput(name)
    var doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    var expected = eval('(' + outputCode + ')')
    var actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('foo2 case', function () {
    var name = 'foo2'
    var inputCode = readInput(name)
    var outputCode = readOutput(name)
    var doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    var expected = eval('(' + outputCode + ')')
    var actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('foo3 case', function () {
    var name = 'foo3'
    var inputCode = readInput(name)
    var outputCode = readOutput(name)
    var doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    var expected = eval('(' + outputCode + ')')
    var actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('foo4 case', function () {
    var name = 'foo4'
    var inputCode = readInput(name)
    var outputCode = readOutput(name)
    var doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    var expected = eval('(' + outputCode + ')')
    var actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('foo5 case', function () {
    var name = 'foo5'
    var inputCode = readInput(name)
    var outputCode = readOutput(name)
    var doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    var expected = eval('(' + outputCode + ')')
    var actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('foo6 case', function () {
    var name = 'foo6'
    var inputCode = readInput(name)
    var outputCode = readOutput(name)
    var doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    var expected = eval('(' + outputCode + ')')
    var actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('foo7 case', function () {
    var name = 'foo7'
    var inputCode = readInput(name)
    var outputCode = readOutput(name)
    var doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    var expected = eval('(' + outputCode + ')')
    var actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('foo8 case', function () {
    var name = 'foo8'
    var inputCode = readInput(name)
    var outputCode = readOutput(name)
    var doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    var expected = eval('(' + outputCode + ')')
    var actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('foo9 case', function () {
    var name = 'foo9'
    var inputCode = readInput(name)
    var outputCode = readOutput(name)
    var doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    var expected = eval('(' + outputCode + ')')
    var actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('computed case', function () {
    var name = 'computed'
    var inputCode = readInput(name)
    var outputCode = readOutput(name)
    var doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    var expected = eval('(' + outputCode + ')')
    var actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.refreshInstance(name, {x: 10})
    expected.children[0].attr.value = 12
    expected.children[1].attr.value = 12
    expect(actual).eql(expected)

    framework.refreshInstance(name, {m: 10})
    expected.children[0].attr.value = 20
    expected.children[1].attr.value = 20
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('backward(register/render) case', function () {
    var name = 'backward1'
    var inputCode = readInput(name)
    var outputCode = readOutput(name)
    var doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    var expected = eval('(' + outputCode + ')')
    var actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('backward(define/require) case', function () {
    var name = 'backward2'
    var inputCode = readInput(name)
    var outputCode = readOutput(name)
    var doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    var expected = eval('(' + outputCode + ')')
    var actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('append case', function () {
    var name = 'append'
    var inputCode = readInput(name)
    var outputCode = readOutput(name)
    var doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    var expected = eval('(' + outputCode + ')')
    var actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('append-root case', function () {
    var name = 'append-root'
    var inputCode = readInput(name)
    var outputCode = readOutput(name)
    var doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    var expected = eval('(' + outputCode + ')')
    var actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('if case', function () {
    var name = 'if'
    var inputCode = readInput(name)
    var outputCode = readOutput(name)
    var doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    var expected = eval('(' + outputCode + ')')
    var actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('repeat with index case', function () {
    var name = 'repeat-index'
    var inputCode = readInput(name)
    var outputCode = readOutput(name)
    var doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    var expected = eval('(' + outputCode + ')')
    var actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('if-refresh case', function () {
    var name = 'if-refresh'
    var inputCode = readInput(name)
    var outputCode = readOutput(name)
    var doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    framework.refreshInstance(name, {showTitle: false})
    var expected = eval('(' + outputCode + ')')
    var actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('if-repeat case', function () {
    var name = 'if-repeat'
    var inputCode = readInput(name)
    var outputCode = readOutput(name)
    var doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    var expected = eval('(' + outputCode + ')')
    var actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('if-repeat-refresh case', function () {
    var name = 'if-repeat-refresh'
    var inputCode = readInput(name)
    var outputCode = readOutput(name)
    var doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    framework.refreshInstance(name, {
      titlelist: [
        {showTitle: false, title: 'Hello World1'},
        {showTitle: true, title: 'Hello World2'},
        {showTitle: true, title: 'Hello World3'}
      ]
    })
    var expected = eval('(' + outputCode + ')')
    var actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('dynamic type case', function () {
    var name = 'dynamic-type'
    var inputCode = readInput(name)
    var outputCode = readOutput(name)
    var doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    var expected = eval('(' + outputCode + ')')
    var actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('click case', function () {
    var name = 'click'
    var inputCode = readInput(name)
    var outputCode = readOutput(name)
    var doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    var expected = eval('(' + outputCode + ')')
    var actual = doc.toJSON()
    expect(actual).eql(expected)
    framework.callJS(name, [{
      method: 'fireEvent',
      args: [doc.body.children[0].ref, 'click', {}]
    }])

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('bind subvm', function () {
    var name = 'subvm'
    var inputCode = readInput(name)
    var outputCode = readOutput(name)
    var doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    var expected = eval('(' + outputCode + ')')
    var actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('refresh twice', function () {
    var name = 'refresh2'
    var inputCode = readInput(name)
    var outputCode = readOutput(name)
    var doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    var actual = doc.toJSON()
    expect(actual).eql({
      type: 'container'
    })

    framework.refreshInstance(name, {ext: {showbar1: false}})
    framework.refreshInstance(name, {ext: {showbar1: true}})
    var expected = eval('(' + outputCode + ')')
    var actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('require 3rd', () => {
    var name = 'require'
    var inputCode = readInput(name)
    var outputCode = readOutput(name)
    var doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    var expected = eval('(' + outputCode + ')')
    var actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('a correct transformer version', () => {
    var name = 'transformer1'
    var inputCode = readInput(name)
    var outputCode = readOutput(name)
    var doc = new Document(name)
    allDocs[name] = doc

    framework.createInstance(name, inputCode)
    var expected = eval('(' + outputCode + ')')
    var actual = doc.toJSON()
    expect(actual).eql(expected)

    framework.destroyInstance(name)
    delete allDocs[name]
  })

  it('a wrong transformer version', () => {
    var name = 'transformer2'
    var inputCode = readInput(name)
    var outputCode = readOutput(name)
    var doc = new Document(name)
    allDocs[name] = doc

    var result = framework.createInstance(name, inputCode)
    expect(result).to.be.an.instanceof(Error)
    framework.destroyInstance(name)
    delete allDocs[name]
  })
})
