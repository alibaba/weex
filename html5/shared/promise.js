const OriginPromise = global.Promise ||
                        function () {}
const MSG = 'Using "Promise" is unexpected'

const _once = {
  promise: false
}

const UnexpectedPromise = function (...args) {
  if (!_once.promise) {
    console.warn(MSG)
    _once.promise = true
  }
  return new OriginPromise(...args)
}

const fn = ['all', 'race', 'resolve', 'reject']
fn.forEach(n => {
  _once[n] = false
  UnexpectedPromise[n] = function (...args) {
    if (!_once[n]) {
      console.warn(MSG)
      _once[n] = true
    }
    return OriginPromise[n] && OriginPromise[n](...args)
  }
})

global.Promise = UnexpectedPromise
