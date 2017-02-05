/**
 * Freeze the prototype of javascript build-in objects.
 */
/* istanbul ignore next */
export function freezePrototype () {
  Object.freeze(Object)
  Object.freeze(Array)

  Object.freeze(Object.prototype)
  Object.freeze(Array.prototype)
  Object.freeze(String.prototype)
  Object.freeze(Number.prototype)
  Object.freeze(Boolean.prototype)

  Object.freeze(Error.prototype)
  Object.freeze(Date.prototype)
  Object.freeze(RegExp.prototype)
}
