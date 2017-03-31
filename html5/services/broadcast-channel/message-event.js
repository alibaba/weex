/**
 * Mock MessageEvent type
 * @param {string} type
 * @param {object} dict { data, origin, source, ports }
 *
 * This type has been simplified.
 * https://html.spec.whatwg.org/multipage/comms.html#messageevent
 * https://dom.spec.whatwg.org/#interface-event
 */
export function MessageEvent (type, dict = {}) {
  this.type = type || 'message'

  this.data = dict.data || null
  this.origin = dict.origin || ''
  this.source = dict.source || null
  this.ports = dict.ports || []

  // inherit properties
  this.target = null
  this.timeStamp = Date.now()
}
