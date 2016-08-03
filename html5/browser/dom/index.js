/**
 * @fileOverview
 * A simple virtual dom implementation
 */
import ComponentManager from './componentManager'

import {
  Document as OriginalDocument,
  Element,
  Comment,
  instanceMap
} from '../../vdom'

function noop () {}

export function Document (id, url, handler) {
  OriginalDocument.call(this, arguments)
  this.listener = new ComponentManager(id, handler || noop)
}

Document.prototype = Object.create(OriginalDocument.prototype)

export { ComponentManager, Element, Comment, instanceMap }
