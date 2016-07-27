function Evt (type, detail) {
  if (detail instanceof Evt) {
    return detail
  }

  this.timestamp = Date.now()
  this.detail = detail
  this.type = type

  let shouldStop = false
  this.stop = function () {
    shouldStop = true
  }
  this.hasStopped = function () {
    return shouldStop
  }
}

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

export function $dispatch (type, detail) {
  const evt = new Evt(type, detail)
  this.$emit(type, evt)

  if (!evt.hasStopped() && this._parent && this._parent.$dispatch) {
    this._parent.$dispatch(type, evt)
  }
}

export function $broadcast (type, detail) {
  const evt = new Evt(type, detail)
  this.$emit(type, evt)

  if (!evt.hasStopped() && this._childrenVms) {
    this._childrenVms.forEach((subVm) => {
      subVm.$broadcast(type, evt)
    })
  }
}

export function $on (type, handler) {
  if (!type || typeof handler !== 'function') {
    return
  }
  const events = this._vmEvents
  const handlerList = events[type] || []
  handlerList.push(handler)
  events[type] = handlerList

  // fixed old version lifecycle design
  if (type === 'hook:ready' && this._ready) {
    this.$emit('hook:ready')
  }
}

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

const LIFE_CYCLE_TYPES = ['init', 'created', 'ready']

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

export function mixinEvents (vm) {
  vm.$emit = $emit
  vm.$dispatch = $dispatch
  vm.$broadcast = $broadcast
  vm.$on = $on
  vm.$off = $off
}
