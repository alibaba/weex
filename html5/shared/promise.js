const polyfillPromise = require('core-js/fn/promise')
const OriginPromise = global.Promise
                      || polyfillPromise
                      || function () {}
const MSG = 'Using "Promise" is unexpected'

let once = false

const UnexpectedPromise = function (...args) {
  if (!once) {
    console.warn(MSG)
    once = true
  }
  return new OriginPromise(...args)
}

const fn = ['all', 'race', 'resolve', 'reject']
fn.forEach(n => {
  UnexpectedPromise[n] = function (...args) {
    if (!once) {
      console.warn(MSG)
      once = true
    }
    return OriginPromise[n] && OriginPromise[n](...args)
  }
})

global.Promise = UnexpectedPromise
