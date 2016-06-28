const OriginPromise = global.Promise ||
                        function () {}
const MSG = 'Using "Promise" is unexpected'

const UnexpectedPromise = function (...args) {
  console.warn(MSG)
  return new OriginPromise(...args)
}

const fn = ['all', 'race', 'resolve', 'reject']
fn.forEach(n => {
  UnexpectedPromise[n] = function (...args) {
    console.warn(MSG)
    return OriginPromise[n] && OriginPromise[n](...args)
  }
})

global.Promise = UnexpectedPromise
