'use strict'

// track varies kinds of events and listeners.
const handlerTraker = {}

const globalEvent = {

  /**
   * addEventListener
   * @param {string} evt - the event name to add a listener on.
   */
  addEventListener (evt, callbackId) {
    const cb = e => this.sender.performCallback(callbackId, e, true)
    if (!handlerTraker[evt]) {
      handlerTraker[evt] = [cb]
    }
    else {
      handlerTraker[evt].push(cb)
    }
    document.addEventListener(evt, cb)
  },

  /**
   * removeEventListener
   * @param {string} evt - the event name to remove a listener from.
   */
  removeEventListener (evt) {
    handlerTraker[evt].forEach(cb => document.removeEventListener(evt, cb))
  }
}

const meta = {
  globalEvent: [{
    name: 'addEventListener',
    args: ['string', 'function']
  }, {
    name: 'removeEventListener',
    args: ['string']
  }]
}

export default {
  init (Weex) {
    Weex.registerApiModule('globalEvent', globalEvent, meta)
  }
}
