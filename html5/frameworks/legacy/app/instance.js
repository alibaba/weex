/**
 * @fileOverview
 * Weex App constructor & definition
 */

import Differ from './differ'
import renderer from '../config'

/**
 * App constructor for Weex framework.
 * @param {string} id
 * @param {object} options
 */
export default function App (id, options) {
  this.id = id
  this.options = options || {}
  this.vm = null
  this.customComponentMap = {}
  this.commonModules = {}

  // document
  this.doc = new renderer.Document(
    id,
    this.options.bundleUrl,
    null,
    renderer.Listener
  )
  this.differ = new Differ(id)
}
