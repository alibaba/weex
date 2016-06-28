'use strict'

const config = require('./config')
// const messageQueue = []

// function flushMessage () {
//   if (typeof callJS === 'function' && messageQueue.length > 0) {
//     callJS(config.instanceId, JSON.stringify(messageQueue))
//     messageQueue.length = 0
//   }
// }

// function push (msg) {
//   messageQueue.push(msg)
// }

/**
 * To fix the problem of callapp, the two-way time loop mechanism must
 * be replaced by directly procedure call except the situation of
 * page loading.
 * 2015-11-03
 */
function pushDirectly (msg) {
  callJS(config.instanceId, [msg])
}

module.exports = {
  push: pushDirectly
}
