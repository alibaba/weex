/**
 * Webview module
 */

export default {
  goBack (vnode) {
    if (vnode && typeof vnode.goBack === 'function') {
      vnode.goBack()
    }
  },
  goForward (vnode) {
    if (vnode && typeof vnode.goForward === 'function') {
      vnode.goForward()
    }
  },
  reload (vnode) {
    if (vnode && typeof vnode.reload === 'function') {
      vnode.reload()
    }
  }
}
