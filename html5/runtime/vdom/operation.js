
const docMap = {}

/**
 * Add a document object into docMap.
 * @param {string} id
 * @param {object} document
 */
export function addDoc (id, doc) {
  if (id) {
    docMap[id] = doc
  }
}

/**
 * Get the document object by id.
 * @param {string} id
 */
export function getDoc (id) {
  return docMap[id]
}

/**
 * Remove the document from docMap by id.
 * @param {string} id
 */
export function removeDoc (id) {
  delete docMap[id]
}

/**
 * @deprecated
 * Get listener by document id.
 * @param {string} id
 * @return {object} listener
 */
export function getListener (id) {
  const doc = docMap[id]
  if (doc && doc.listener) {
    return doc.listener
  }
  return null
}

/**
 * Get TaskCenter instance by id.
 * @param {string} id
 * @return {object} TaskCenter
 */
export function getTaskCenter (id) {
  const doc = docMap[id]
  if (doc && doc.taskCenter) {
    return doc.taskCenter
  }
  return null
}

/**
 * Get a unique id.
 */
let nextNodeRef = 1
export function uniqueId () {
  return (nextNodeRef++).toString()
}

/**
 * Append body node to documentElement.
 * @param {object} document
 * @param {object} node
 * @param {object} before
 */
export function appendBody (doc, node, before) {
  const { documentElement } = doc

  if (documentElement.pureChildren.length > 0 || node.parentNode) {
    return
  }
  const children = documentElement.children
  const beforeIndex = children.indexOf(before)
  if (beforeIndex < 0) {
    children.push(node)
  }
  else {
    children.splice(beforeIndex, 0, node)
  }

  if (node.nodeType === 1) {
    if (node.role === 'body') {
      node.docId = doc.id
      node.ownerDocument = doc
      node.parentNode = documentElement
      linkParent(node, documentElement)
    }
    else {
      node.children.forEach(child => {
        child.parentNode = node
      })
      setBody(doc, node)
      node.docId = doc.id
      node.ownerDocument = doc
      linkParent(node, documentElement)
      delete doc.nodeMap[node.nodeId]
    }
    documentElement.pureChildren.push(node)
    sendBody(doc, node)
  }
  else {
    node.parentNode = documentElement
    doc.nodeMap[node.ref] = node
  }
}

function sendBody (doc, node) {
  const body = node.toJSON()
  const children = body.children
  delete body.children
  let result = doc.taskCenter.send('dom', { action: 'createBody' }, [body])
  if (children) {
    children.forEach(child => {
      result = doc.taskCenter.send('dom', { action: 'addElement' }, [body.ref, child, -1])
    })
  }
  return result
}

/**
 * Set up body node.
 * @param {object} document
 * @param {object} element
 */
export function setBody (doc, el) {
  el.role = 'body'
  el.depth = 1
  delete doc.nodeMap[el.nodeId]
  el.ref = '_root'
  doc.nodeMap._root = el
  doc.body = el
}

/**
 * Establish the connection between parent and child node.
 * @param {object} child node
 * @param {object} parent node
 */
export function linkParent (node, parent) {
  node.parentNode = parent
  if (parent.docId) {
    node.docId = parent.docId
    node.ownerDocument = parent.ownerDocument
    node.ownerDocument.nodeMap[node.nodeId] = node
    node.depth = parent.depth + 1
  }
  node.children.forEach(child => {
    linkParent(child, node)
  })
}

/**
 * Get the next sibling element.
 * @param {object} node
 */
export function nextElement (node) {
  while (node) {
    if (node.nodeType === 1) {
      return node
    }
    node = node.nextSibling
  }
}

/**
 * Get the previous sibling element.
 * @param {object} node
 */
export function previousElement (node) {
  while (node) {
    if (node.nodeType === 1) {
      return node
    }
    node = node.previousSibling
  }
}

/**
 * Insert a node into list at the specified index.
 * @param {object} target node
 * @param {array} list
 * @param {number} newIndex
 * @param {boolean} changeSibling
 * @return {number} newIndex
 */
export function insertIndex (target, list, newIndex, changeSibling) {
  /* istanbul ignore next */
  if (newIndex < 0) {
    newIndex = 0
  }
  const before = list[newIndex - 1]
  const after = list[newIndex]
  list.splice(newIndex, 0, target)
  if (changeSibling) {
    before && (before.nextSibling = target)
    target.previousSibling = before
    target.nextSibling = after
    after && (after.previousSibling = target)
  }
  return newIndex
}

/**
 * Move the node to a new index in list.
 * @param {object} target node
 * @param {array} list
 * @param {number} newIndex
 * @param {boolean} changeSibling
 * @return {number} newIndex
 */
export function moveIndex (target, list, newIndex, changeSibling) {
  const index = list.indexOf(target)
  /* istanbul ignore next */
  if (index < 0) {
    return -1
  }
  if (changeSibling) {
    const before = list[index - 1]
    const after = list[index + 1]
    before && (before.nextSibling = after)
    after && (after.previousSibling = before)
  }
  list.splice(index, 1)
  let newIndexAfter = newIndex
  if (index <= newIndex) {
    newIndexAfter = newIndex - 1
  }
  const beforeNew = list[newIndexAfter - 1]
  const afterNew = list[newIndexAfter]
  list.splice(newIndexAfter, 0, target)
  if (changeSibling) {
    beforeNew && (beforeNew.nextSibling = target)
    target.previousSibling = beforeNew
    target.nextSibling = afterNew
    afterNew && (afterNew.previousSibling = target)
  }
  if (index === newIndexAfter) {
    return -1
  }
  return newIndex
}

/**
 * Remove the node from list.
 * @param {object} target node
 * @param {array} list
 * @param {boolean} changeSibling
 */
export function removeIndex (target, list, changeSibling) {
  const index = list.indexOf(target)
  /* istanbul ignore next */
  if (index < 0) {
    return
  }
  if (changeSibling) {
    const before = list[index - 1]
    const after = list[index + 1]
    before && (before.nextSibling = after)
    after && (after.previousSibling = before)
  }
  list.splice(index, 1)
}
