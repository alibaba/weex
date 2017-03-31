/**
 * @fileOverview
 * The polyfill of BroadcastChannel API.
 * This api can be used to achieve inter-instance communications.
 *
 * https://html.spec.whatwg.org/multipage/comms.html#broadcasting-to-other-browsing-contexts
 */

import { MessageEvent } from './message-event'

const channels = {}
const instances = {}

/**
 * An empty constructor for BroadcastChannel polyfill.
 * The real constructor will be defined when a Weex instance created because
 * we need to track the channel by Weex instance id.
 */
function BroadcastChannel () {}

/**
 * Sends the given message to other BroadcastChannel objects set up for this channel.
 * @param {any} message
 */
BroadcastChannel.prototype.postMessage = function (message) {
  if (this._closed) {
    throw new Error(`BroadcastChannel "${this.name}" is closed.`)
  }

  const subscribers = channels[this.name]
  if (subscribers && subscribers.length) {
    for (let i = 0; i < subscribers.length; ++i) {
      const member = subscribers[i]

      if (member._closed || member === this) continue

      if (typeof member.onmessage === 'function') {
        member.onmessage(new MessageEvent('message', { data: message }))
      }
    }
  }
}

/**
 * Closes the BroadcastChannel object, opening it up to garbage collection.
 */
BroadcastChannel.prototype.close = function () {
  if (this._closed) {
    return
  }

  this._closed = true

  // remove itself from channels.
  if (channels[this.name]) {
    const subscribers = channels[this.name].filter(x => x !== this)
    if (subscribers.length) {
      channels[this.name] = subscribers
    }
    else {
      delete channels[this.name]
    }
  }
}

export default {
  create: (id, env, config) => {
    instances[id] = []
    if (typeof global.BroadcastChannel === 'function') {
      return {}
    }
    const serviceObject = {
      /**
       * Returns a new BroadcastChannel object via which messages for the given
       * channel name can be sent and received.
       * @param {string} name
       */
      BroadcastChannel: function (name) {
        // the name property is readonly
        Object.defineProperty(this, 'name', {
          configurable: false,
          enumerable: true,
          writable: false,
          value: String(name)
        })

        this._closed = false
        this.onmessage = null

        if (!channels[this.name]) {
          channels[this.name] = []
        }
        channels[this.name].push(this)
        instances[id].push(this)
      }
    }
    serviceObject.BroadcastChannel.prototype = BroadcastChannel.prototype
    return {
      instance: serviceObject
    }
  },
  destroy: (id, env) => {
    instances[id].forEach(channel => channel.close())
    delete instances[id]
  }
}
