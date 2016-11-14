import chai from 'chai'
const { expect } = chai

import {
  Node
} from '../../../runtime/vdom'

describe('Node', () => {
  it('create node', () => {
    const node = new Node()
    expect(node).is.an.object
    expect(node.nodeId).to.be.a('string')
    expect(node.ref).eql(node.nodeId)
    expect(node.children).eql([])
    expect(node.pureChildren).eql([])
    expect(node.parentNode).to.be.null
    expect(node.nextSibling).to.be.null
    expect(node.previousSibling).to.be.null
    node.destroy()
  })
})
