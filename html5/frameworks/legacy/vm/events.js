/**
 * @fileOverview
 * Everything about component event which includes event object, event listener,
 * event emitter and lifecycle hooks.
 */

/**
 * Event object definition. An event object has `type`, `timestamp` and
 * `detail` from which a component emit. The event object could be dispatched to
 * parents or broadcasted to children except `this.stop()` is called.
 * @param {string} type
 * @param {any}    detail
 */
function Evt (type, detail) {
  if (detail instanceof Evt) {
    return detail
  }

  this.timestamp = Date.now()
  this.detail = detail
  this.type = type

  let shouldStop = false

  /**
   * stop dispatch and broadcast
   */
  this.stop = function () {
    shouldStop = true
  }

  /**
   * check if it can't be dispatched or broadcasted
   */
  this.hasStopped = function () {
    return shouldStop
  }
}

/**
 * Emit an event but not broadcast down or dispatch up.
 * @param  {string} type
 * @param  {any}    detail
 */
export function $emit (type, detail) {
  const events = this._vmEvents
  const handlerList = events[type]
  if (handlerList) {
    const evt = new Evt(type, detail)
    handlerList.forEach((handler) => {
      handler.call(this, evt)
    })
  }
}

/**
 * Emit an event and dispatch it up.
 * @param  {string} type
 * @param  {any}    detail
 */
export function $dispatch (type, detail) {
  const evt = new Evt(type, detail)
  this.$emit(type, evt)

  if (!evt.hasStopped() && this._parent && this._parent.$dispatch) {
    this._parent.$dispatch(type, evt)
  }
}

/**
 * Emit an event and broadcast it down.
 * @param  {string} type
 * @param  {any}    detail
 */
export function $broadcast (type, detail) {
  const evt = new Evt(type, detail)
  this.$emit(type, evt)

  if (!evt.hasStopped() && this._childrenVms) {
    this._childrenVms.forEach((subVm) => {
      subVm.$broadcast(type, evt)
    })
  }
}

/**
 * Add event listener.
 * @param  {string}   type
 * @param  {function} handler
 */
export function $on (type, handler) {
  if (!type || typeof handler !== 'function') {
    return
  }
  const events = this._vmEvents
  const handlerList = events[type] || []
  handlerList.push(handler)
  events[type] = handlerList

  // fixed old version lifecycle design
  /* istanbul ignore if */
  if (type === 'hook:ready' && this._ready) {
    this.$emit('hook:ready')
  }
}

/**
 * Remove event listener.
 * @param  {string}   type
 * @param  {function} handler
 */
export function $off (type, handler) {
  if (!type) {
    return
  }
  const events = this._vmEvents
  if (!handler) {
    delete events[type]
    return
  }
  const handlerList = events[type]
  if (!handlerList) {
    return
  }
  handlerList.$remove(handler)
}

const LIFE_CYCLE_TYPES = ['init', 'created', 'ready', 'destroyed']

/**
 * Init events:
 * 1. listen `events` in component options & `externalEvents`.
 * 2. bind lifecycle hooks.
 * @param  {Vm}     vm
 * @param  {object} externalEvents
 */
export function initEvents (vm, externalEvents) {
  const options = vm._options || {}
  const events = options.events || {}
  for (const type1 in events) {
    vm.$on(type1, events[type1])
  }
  for (const type2 in externalEvents) {
    vm.$on(type2, externalEvents[type2])
  }
  LIFE_CYCLE_TYPES.forEach((type) => {
    vm.$on(`hook:${type}`, options[type])
  })
}

/**
 * Bind event related methods to ViewModel instance.
 * @param  {Vm} vm
 */
export function mixinEvents (vm) {
  vm.$emit = $emit
  vm.$dispatch = $dispatch
  vm.$broadcast = $broadcast
  vm.$on = $on
  vm.$off = $off
}
