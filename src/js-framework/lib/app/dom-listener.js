export default function Listener(id, handler) {
  this.id = id
  this.batched = false
  this.updates = []
  if (typeof handler === 'function') {
    this.handler = handler
  }
}

Listener.prototype.createFinish = function (callback) {
  const handler = this.handler
  handler([createAction('createFinish', [])], callback)
}

Listener.prototype.createBody = function (element, ref) {
  const actions = [createAction('createBody', [element.toJSON()])]
  this.addActions(actions)
}

Listener.prototype.addElement = function (element, ref, index) {
  if (!(index >= 0)) {
    index = -1
  }
  this.addActions(createAction('addElement', [ref, element.toJSON(), index]))
}

Listener.prototype.removeElement = function (ref) {
  if (Array.isArray(ref)) {
    const actions = ref.map((r) => createAction('removeElement', [r]))
    this.addActions(actions)
  }
  else {
    this.addActions(createAction('removeElement', [ref]))
  }
}

Listener.prototype.moveElement = function (targetRef, parentRef, index) {
  this.addActions(createAction('moveElement', [targetRef, parentRef, index]))
}

Listener.prototype.setAttr = function (ref, key, value) {
  const result = {}
  result[key] = value
  this.addActions(createAction('updateAttrs', [ref, result]))
}

Listener.prototype.setStyle = function (ref, key, value) {
  const result = {}
  result[key] = value
  this.addActions(createAction('updateStyle', [ref, result]))
}

Listener.prototype.setStyles = function (ref, style) {
  this.addActions(createAction('updateStyle', [ref, style]))
}

Listener.prototype.addEvent = function (ref, type) {
  this.addActions(createAction('addEvent', [ref, type]))
}

Listener.prototype.removeEvent = function (ref, type) {
  this.addActions(createAction('removeEvent', [ref, type]))
}

Listener.prototype.handler = function (actions, cb) {
  cb && cb()
}

Listener.prototype.addActions = function (actions) {
  const updates = this.updates
  const handler = this.handler

  if (!Array.isArray(actions)) {
    actions = [actions]
  }

  if (this.batched) {
    updates.push.apply(updates, actions)
  }
  else {
    handler(actions)
  }
}

export function createAction(name, args) {
  return {module: 'dom', method: name, args: args}
}
