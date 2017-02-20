/**
 * @fileOverview
 * instance controls from native
 *
 * - fire event
 * - callback
 * - refresh
 * - destroy
 *
 * corresponded with the API of instance manager (framework.js)
 */
import { extend, typof } from '../../util/index'

/**
 * Refresh an app with data to its root component options.
 * @param  {object} app
 * @param  {any}    data
 */
export function refresh (app, data) {
  console.debug(`[JS Framework] Refresh with`, data,
            `in instance[${app.id}]`)
  const vm = app.vm
  if (vm && data) {
    if (typeof vm.refreshData === 'function') {
      vm.refreshData(data)
    }
    else {
      extend(vm, data)
    }
    app.differ.flush()
    app.doc.taskCenter.send('dom', { action: 'refreshFinish' }, [])
    return
  }
  return new Error(`invalid data "${data}"`)
}

/**
 * Destroy an app.
 * @param  {object} app
 */
export function destroy (app) {
  console.debug(`[JS Framework] Destory an instance(${app.id})`)

  if (app.vm) {
    destroyVm(app.vm)
  }

  app.id = ''
  app.options = null
  app.blocks = null
  app.vm = null
  app.doc.taskCenter.destroyCallback()
  app.doc.destroy()
  app.doc = null
  app.customComponentMap = null
  app.commonModules = null
}

/**
 * Destroy an Vm.
 * @param {object} vm
 */
export function destroyVm (vm) {
  delete vm._app
  delete vm._computed
  delete vm._css
  delete vm._data
  delete vm._ids
  delete vm._methods
  delete vm._options
  delete vm._parent
  delete vm._parentEl
  delete vm._rootEl

  // remove all watchers
  if (vm._watchers) {
    let watcherCount = vm._watchers.length
    while (watcherCount--) {
      vm._watchers[watcherCount].teardown()
    }
    delete vm._watchers
  }

  // destroy child vms recursively
  if (vm._childrenVms) {
    let vmCount = vm._childrenVms.length
    while (vmCount--) {
      destroyVm(vm._childrenVms[vmCount])
    }
    delete vm._childrenVms
  }

  console.debug(`[JS Framework] "destroyed" lifecycle in Vm(${vm._type})`)
  vm.$emit('hook:destroyed')

  delete vm._type
  delete vm._vmEvents
}

/**
 * Get a JSON object to describe the document body.
 * @param  {object} app
 * @return {object}
 */
export function getRootElement (app) {
  const doc = app.doc || {}
  const body = doc.body || {}
  return body.toJSON ? body.toJSON() : {}
}

/**
 * Fire an event from renderer. The event has type, an event object and an
 * element ref. If the event comes with some virtual-DOM changes, it should
 * have one more parameter to describe the changes.
 * @param  {object} app
 * @param  {string} ref
 * @param  {type}   type
 * @param  {object} e
 * @param  {object} domChanges
 */
export function fireEvent (app, ref, type, e, domChanges) {
  console.debug(`[JS Framework] Fire a "${type}" event on an element(${ref}) in instance(${app.id})`)
  if (Array.isArray(ref)) {
    ref.some((ref) => {
      return fireEvent(app, ref, type, e) !== false
    })
    return
  }
  const el = app.doc.getRef(ref)
  if (el) {
    const result = app.doc.fireEvent(el, type, e, domChanges)
    app.differ.flush()
    app.doc.taskCenter.send('dom', { action: 'updateFinish' }, [])
    return result
  }
  return new Error(`invalid element reference "${ref}"`)
}

/**
 * Make a callback for a certain app.
 * @param  {object}   app
 * @param  {number}   callbackId
 * @param  {any}      data
 * @param  {boolean}  ifKeepAlive
 */
export function callback (app, callbackId, data, ifKeepAlive) {
  console.debug(`[JS Framework] Invoke a callback(${callbackId}) with`, data,
            `in instance(${app.id})`)
  const result = app.doc.taskCenter.callback(callbackId, data, ifKeepAlive)
  updateActions(app)
  app.doc.taskCenter.send('dom', { action: 'updateFinish' }, [])
  return result
}

/**
 * Collect all virtual-DOM mutations together and send them to renderer.
 * @param  {object} app
 */
export function updateActions (app) {
  app.differ.flush()
}

/**
 * Call all tasks from an app to renderer (native).
 * @param  {object} app
 * @param  {array}  tasks
 */
export function callTasks (app, tasks) {
  let result

  /* istanbul ignore next */
  if (typof(tasks) !== 'array') {
    tasks = [tasks]
  }

  tasks.forEach(task => {
    result = app.doc.taskCenter.send(
      'module',
      {
        module: task.module,
        method: task.method
      },
      task.args
    )
  })

  return result
}
