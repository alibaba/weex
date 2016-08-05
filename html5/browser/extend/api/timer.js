// 'use strict'

// const funcIdToTimerIdMap = {}
// const funcIdToIntervalIdMap = {}

// const timer = {

//   setTimeout (funcId, delay) {
//     const sender = this.sender
//     delay < 0 && (delay = 0)
//     const timerId = setTimeout(function () {
//       delete funcIdToTimerIdMap[funcId]
//       sender.performCallback(funcId)
//     }, delay)
//     funcIdToTimerIdMap[funcId] = timerId
//     return funcId
//   },

//   clearTimeout (funcId) {
//     clearTimeout(funcIdToTimerIdMap[funcId])
//     delete funcIdToTimerIdMap[funcId]
//   },

//   setInterval (funcId, interval) {
//     const sender = this.sender
//     interval < 0 && (interval = 0)
//     const timerId = setInterval(function () {
//       delete funcIdToIntervalIdMap[funcId]
//       sender.performCallback(funcId, null, true)
//     })
//     funcIdToIntervalIdMap[funcId] = timerId
//     return funcId
//   },

//   clearInterval (funcId) {
//     clearInterval(funcIdToIntervalIdMap[funcId])
//     delete funcIdToIntervalIdMap[funcId]
//   }

// }

// const meta = {
//   timer: [{
//     name: 'setTimeout',
//     args: ['function', 'number']
//   }, {
//     name: 'clearTimeout',
//     args: ['number']
//   }, {
//     name: 'setInterval',
//     args: ['function', 'number']
//   }, {
//     name: 'clearInterval',
//     args: ['number']
//   }]
// }

// export default {
//   init: function (Weex) {
//     Weex.registerApiModule('timer', timer, meta)
//   }
// }
